import { getGalleryImages } from "@/lib/gallery";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folder = searchParams.get("folder");

  if (!folder) {
    return NextResponse.json({ images: [], error: "Missing folder parameter" }, { status: 400 });
  }

  // Sanitize: only allow alphanumeric, hyphens, slashes (no ../)
  const sanitized = folder.replace(/\.\./g, "").replace(/[^a-zA-Z0-9/_-]/g, "");

  try {
    const images = await getGalleryImages(sanitized);
    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ images: [] });
  }
}
