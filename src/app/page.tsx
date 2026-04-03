import { PortfolioExperience } from "@/components/portfolio/PortfolioExperience";
import { getGalleryImages } from "@/lib/gallery";

export default async function Home() {
  const projectsImages = await getGalleryImages("projects");
  const eventsImages = await getGalleryImages("events");
  const galleryImagesFromFolder = await getGalleryImages("Gallery");
  const allImages = [...projectsImages, ...eventsImages, ...galleryImagesFromFolder];
  const galleryImages = allImages.map((img) => ({
    id: img.fileName,
    src: img.src,
    alt: img.alt,
    label: img.name,
  }));

  return <PortfolioExperience galleryImages={galleryImages} />;
}
