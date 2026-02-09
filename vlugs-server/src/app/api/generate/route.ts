// app/api/generate/route.ts
import { NextRequest, NextResponse } from "next/server";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    /**
     * Expect request body from FE (wan2.6 aligned)
     */
    const {
      images,          // [{ mime, base64 }, ...] 1–4 images
      prompt,          // required text
      quality = "auto",
      n = 1,
      promptExtend = true,
    } = await req.json();

    if (!prompt || !images || !Array.isArray(images) || images.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: prompt and images are required" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    if (images.length > 4) {
      return NextResponse.json(
        { error: "wan2.6-image supports up to 4 images" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const apiKey = process.env.DASHSCOPE_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing DASHSCOPE_API_KEY in environment variables" },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    // ✅ map quality → wan2.6-image size
    const size = quality === "2K" ? "960*1280" : "1024*1024";

    const url =
      "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation";

    /**
     * Build wan2.6-image message content
     * spec: content = [{ text }, { image }, { image }, ...]
     */
    
    // 🔍 Debug: Log image validation
    console.log("[DEBUG] Received images count:", images.length);
    images.forEach((img, idx) => {
      const b64Length = img.base64?.length || 0;
      const isValidBase64 = /^[A-Za-z0-9+/=]*$/.test(img.base64 || "");
      console.log(`[DEBUG] Image ${idx}: mime=${img.mime}, base64Length=${b64Length}, validBase64=${isValidBase64}`);
    });

    const content = [
      { text: prompt },
      ...images.map((img: { mime: string; base64: string }) => {
        const dataUri = `data:${img.mime};base64,${img.base64}`;
        console.log(`[DEBUG] DataURI length: ${dataUri.length}, first 100 chars: ${dataUri.substring(0, 100)}...`);
        return { image: dataUri };
      }),
    ];

    // ✅ wan2.6-image payload (edit mode)
    const payload = {
      model: "wan2.6-image",
      input: {
        messages: [
          {
            role: "user",
            content,
          },
        ],
      },
      parameters: {
        enable_interleave: false,
        size,
        n,
        watermark: false,
        prompt_extend: promptExtend,
      },
    };

    // 🔍 Debug: Log payload size
    const payloadStr = JSON.stringify(payload);
    console.log(`[DEBUG] Sending payload size: ${payloadStr.length} bytes`);
    console.log(`[DEBUG] Images in payload: ${content.filter(c => 'image' in c).length}`);

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: payloadStr,
    });

    if (!res.ok) {
      let errorMessage = `DashScope API error: ${res.status}`;
      try {
        const errorJson = await res.json();
        errorMessage =
          errorJson.message ||
          errorJson.error?.message ||
          errorMessage;
      } catch {
        const errorText = await res.text();
        errorMessage = errorText || errorMessage;
      }

      console.error("DashScope API Error:", errorMessage);
      const fullErrorText = await res.text().catch(() => "(unable to read)");
      console.error("[DEBUG] Full error response:", fullErrorText);
      return NextResponse.json(
        { error: errorMessage },
        { status: res.status, headers: CORS_HEADERS }
      );
    }

    const data = await res.json();

    /**
     * Extract image result
     * output.choices[0].message.content[].image
     */
    const resultUrl =
      data?.output?.choices?.[0]?.message?.content?.find(
        (c: any) => c?.type === "image" || c?.image
      )?.image;

    if (!resultUrl) {
      return NextResponse.json(
        { error: "No image URL found in DashScope response", raw: data },
        { status: 500, headers: CORS_HEADERS }
      );
    }

    // ✅ Return clean response to FE
    return NextResponse.json(
      {
        resultUrl,
        raw: data,
      },
      { headers: CORS_HEADERS }
    );
  } catch (error: any) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
