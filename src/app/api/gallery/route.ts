import { getGalleryImages } from "@/lib/gallery";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch images from all gallery sources
    const projectsImages = await getGalleryImages("projects");
    const eventsImages = await getGalleryImages("events");
    const galleryImagesFromFolder = await getGalleryImages("Gallery");

    // Combine all images
    const allImages = [...projectsImages, ...eventsImages, ...galleryImagesFromFolder];

    // Map to DomeGallery format
    const images = allImages.map((img) => ({
      id: img.fileName,
      src: img.src,
      alt: img.alt || img.name,
      label: img.name,
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Error loading gallery images:", error);
    return NextResponse.json({ images: [], error: "Failed to load images" }, { status: 500 });
  }
}
