import type { Metadata } from "next";
import Link from "next/link";
import { ImageGallery } from "@/components/galleries/ImageGallery";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { POAPS } from "@/components/portfolio/experience-data";
import { getGalleryImages } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events",
  description: "Launches, workshops, and community events documented in the gallery.",
};

export default async function EventsPage() {
  const images = await getGalleryImages("events");

  return (
    <main className="gallery-layout">
      <PrimaryNav />
      <section className="panel">
        <h2>Badges & POAPs</h2>
        <p>Event badges and POAPs collected across community milestones.</p>
        {POAPS.length > 0 ? (
          <div className="highlight-grid">
            {POAPS.slice(0, 3).map((poap) => (
              <div key={`${poap.title}-${poap.event}`} className="panel-card">
                <p className="meta">
                  {poap.year ? `${poap.year} · ${poap.event}` : poap.event}
                </p>
                <h3>{poap.title}</h3>
                {poap.summary && <p>{poap.summary}</p>}
              </div>
            ))}
          </div>
        ) : (
          <p>POAPs will be added after event uploads.</p>
        )}
        <div className="section-actions">
          <Link href="/poaps">View all POAPs</Link>
        </div>
      </section>
      <ImageGallery
        title="Event Gallery"
        description="Moments from launches, talks, workshops, and community events. Drop images into public/events and organize order, categories, and featured shots via public/events/gallery.json."
        images={images}
        emptyState="No event photos yet. Add files to public/events to populate this gallery."
        enableFilters
        enableReorder
        showFeatured
        categories={["conference", "workshop", "launch"]}
      />
    </main>
  );
}
