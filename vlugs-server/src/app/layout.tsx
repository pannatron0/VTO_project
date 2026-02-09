import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VLUGS API",
  description: "AI image generation API for VLUGS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
