import type { Metadata } from "next";
import { ImageGallery } from "@/components/galleries/ImageGallery";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { CONTRIBUTIONS, PROJECT_WORK } from "@/components/portfolio/experience-data";
import { getGalleryImages } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description: "Case studies, project highlights, and galleries across Web3, AI, and governance tooling.",
};

export default async function ProjectsPage() {
  const images = await getGalleryImages("projects");

  return (
    <main className="gallery-layout">
      <PrimaryNav />
      <section className="panel">
        <h2>Projects & Work</h2>
        <p>Product builds across Web3 education, AI agent tooling, and governance analytics.</p>
        <div className="highlight-grid">
          {PROJECT_WORK.map((item) => (
            <div key={item.title} className="panel-card">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <ul className="detail-list">
                {item.details.map((detail) => (
                  <li key={`${item.title}-${detail}`}>{detail}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <section className="panel">
        <h2>Major Products & Contributions</h2>
        <p>Selected platforms and initiatives where I shipped core UI, research, and platform tooling.</p>
        <div className="contributions-grid">
          {CONTRIBUTIONS.map((item) => (
            <div key={item.title} className="contribution-card">
              <div className="contribution-header">
                <div className="contribution-logo" aria-hidden="true">
                  {item.logoText}
                </div>
                <div>
                  <h3>{item.title}</h3>
                  <span>{item.subtitle}</span>
                  {item.duration && <span className="contribution-duration">{item.duration}</span>}
                </div>
              </div>
              <ul>
                {item.highlights.map((highlight) => (
                  <li key={`${item.title}-${highlight}`}>{highlight}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <ImageGallery
        title="Project Gallery"
        description="Interactive captures from shipped products and prototype explorations. Drop images into public/projects and manage ordering/featured shots via public/projects/gallery.json."
        images={images}
        emptyState="No project images yet. Add files to public/projects to populate this gallery."
        enableReorder
        showFeatured
      />
    </main>
  );
}
