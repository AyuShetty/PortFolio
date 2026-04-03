import type { Metadata } from "next";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { POAPS } from "@/components/portfolio/experience-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "POAPs",
  description: "Badges and POAPs collected across events, launches, and community milestones.",
};

export default function PoapsPage() {
  return (
    <main className="content-layout">
      <PrimaryNav />

      <header className="content-hero">
        <h1>Badges & POAPs</h1>
        <p>Event badges and POAPs collected across community milestones.</p>
      </header>

      <section className="panel">
        <h2>POAP Collection</h2>
        {POAPS.length > 0 ? (
          <div className="highlight-grid">
            {POAPS.map((poap) => (
              <div key={`${poap.title}-${poap.event}`} className="panel-card">
                <p className="meta">
                  {poap.year ? `${poap.year} · ${poap.event}` : poap.event}
                </p>
                <h3>{poap.title}</h3>
                {poap.summary && <p>{poap.summary}</p>}
                {poap.badgeUrl && (
                  <div className="card-actions">
                    <a href={poap.badgeUrl} target="_blank" rel="noreferrer">
                      View badge
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>POAPs and badges will be listed here once they are added.</p>
        )}
      </section>
    </main>
  );
}
