/**
 * Extract base64 + mime from data URL
 */
export function extractBase64AndMime(dataUrl: string): {
  mime: string;
  base64: string;
} {
  const matches = dataUrl.match(/^data:(image\/[a-zA-Z+.+-]*);base64,(.+)$/);

  if (!matches) {
    throw new Error("Invalid data URL format");
  }

  const mime = matches[1];
  const base64 = matches[2];

  // Validate base64 format
  if (!/^[A-Za-z0-9+/=]*$/.test(base64)) {
    throw new Error("Invalid base64 encoding in data URL");
  }

  // Check minimum size (at least 100 chars)
  if (base64.length < 100) {
    throw new Error("Image data too small - possibly corrupted");
  }

  console.log(`[Client] Extracted image - mime: ${mime}, size: ${base64.length} chars`);

  return {
    mime,
    base64,
  };
}

/**
 * ⚠️ โครงสร้างนี้ตั้งใจให้ map ตรงกับ wan2.6-image payload
 */
interface GenerateRequest {
  // image inputs (wan2.6 รองรับ 1–4 รูป)
  images: {
    mime: string;
    base64: string;
  }[];

  // text prompt (ต้องมี 1 อัน)
  prompt: string;

  // parameters (map ตรง)
  quality: "auto" | "2K";
  n?: number;
  promptExtend?: boolean;
}

interface GenerateResponse {
  resultUrl: string;
  raw?: any;
}

/**
 * Call /api/generate (wan2.6-image)
 */
export async function callGenerateAPI(
  baseImageDataUrl: string,
  strapImageDataUrl?: string,
  customPrompt?: string
): Promise<string> {
  console.log("[Client] Starting image extraction and validation...");
  
  const baseImage = extractBase64AndMime(baseImageDataUrl);
  let strapImage;

  if (strapImageDataUrl) {
    strapImage = extractBase64AndMime(strapImageDataUrl);
  }

  console.log("[Client] Images extracted successfully:", {
    baseImage: { mime: baseImage.mime, size: baseImage.base64.length },
    strapImage: strapImage ? { mime: strapImage.mime, size: strapImage.base64.length } : null,
  });

  const prompt =
    customPrompt ??
    `Attach a new watch strap to the existing watch case.

IMPORTANT RULES:
Do NOT change the watch case in any way (shape, size, bezel, crown, dial, hands, glass)
Do NOT change brand, logo, engravings, or proportions of the watch case
Do NOT include wrist, arm, or any human elements
Do NOT change camera angle, framing, or focal length
Do NOT change lighting direction or environment

The new watch strap must:
Match the provided reference strap exactly
crocodile leather watch strap
Natural crocodile scale pattern with irregular texture
Premium leather grain with subtle color variation
Clean, precise stitching along both edges
Correct thickness and taper toward the buckle
Correct lug width and perfect fit to the original watch case
Realistic connection at the lugs (no gaps, no floating)
Natural curvature where the strap meets the case
Accurate contact shadows between strap and watch case

Presentation style:
Watch case with attached strap only
No wrist, no arm
Studio-quality product photography
High realism, sharp focus
Natural highlights and shadows
No AI artifacts, no deformation

ONLY the watch strap is changed.ß
The watch case remains 100% identical to the original image.`;

  // 🔥 payload (wan2.6-image) - ensure we send only user-uploaded watch image as first input
  const images = [baseImage];
  if (strapImage) images.push(strapImage);

  const body: GenerateRequest = {
    images,
    prompt,
    quality: "auto",
    n: 1,
    promptExtend: true,
  };

  const res = await fetch("http://localhost:3000/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    console.error("[Client] API Error Response:", err);
    throw new Error(err.error || `Generate failed with status ${res.status}`);
  }

  const data: GenerateResponse = await res.json();

  if (!data.resultUrl) {
    throw new Error("No resultUrl returned");
  }

  return data.resultUrl;
}
