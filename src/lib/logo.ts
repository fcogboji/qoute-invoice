export async function fetchLogoAsBase64(
  url: string
): Promise<{ base64: string; format: "PNG" | "JPEG" } | null> {
  try {
    // Data URL (base64) – from file upload
    if (url.startsWith("data:image/")) {
      const match = url.match(/^data:image\/(\w+);base64,(.+)$/);
      if (!match) return null;
      const ext = (match[1] || "png").toLowerCase();
      const base64 = match[2];
      const format = ext.includes("jpeg") || ext.includes("jpg") ? "JPEG" : "PNG";
      return { base64, format };
    }
    const res = await fetch(url, {
      headers: { "User-Agent": "tradeinvoice-PDF-Export/1.0" },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const buf = await res.arrayBuffer();
    const base64 = Buffer.from(buf).toString("base64");
    const ct = res.headers.get("content-type") ?? "";
    const format = ct.includes("jpeg") || ct.includes("jpg") ? "JPEG" : "PNG";
    return { base64, format };
  } catch {
    return null;
  }
}
