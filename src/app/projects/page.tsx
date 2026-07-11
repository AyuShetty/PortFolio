import type { Metadata } from "next";
import { ImageGallery } from "@/components/galleries/ImageGallery";
import { ProjectSpotlight } from "@/components/ProjectSpotlight";
import { PROJECTS, PROJECT_WORK } from "@/components/portfolio/experience-data";
import { getGalleryImages } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description: "Software engineering projects spanning AI systems, IoT, computer vision, Web3, and mobile.",
};

export default async function ProjectsPage() {
  const images = await getGalleryImages("projects");

  return (
    <main className="gallery-layout">
      <header className="content-hero" data-label="WORK">
        <h1>Projects</h1>
        <p>Software engineering projects spanning AI infrastructure, IoT, computer vision, Web3, and mobile — mostly built solo.</p>
      </header>

      <section className="panel">
        <h2>All Projects</h2>
        <p>Hover a row to spotlight it.</p>
        <ProjectSpotlight items={PROJECT_WORK} projects={PROJECTS} />
      </section>

      <ImageGallery
        title="Project Gallery"
        description="Interactive captures from shipped products and prototype explorations."
        images={images}
        emptyState="No project images yet. Add files to public/projects to populate this gallery."
        enableReorder
        showFeatured
      />
    </main>
  );
}
