import type { Metadata } from "next";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { TOP_HIGHLIGHTS } from "@/components/portfolio/experience-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Highlights",
  description: "Key milestones across governance tooling, Web3 education, and leadership.",
};

export default function HighlightsPage() {
  return (
    <main className="content-layout">
      <PrimaryNav />

      <header className="content-hero">
        <h1>Top Highlights</h1>
        <p>Key milestones across governance tooling, Web3 education, and community leadership.</p>
      </header>

      <section className="panel">
        <h2>Highlights</h2>
        <div className="highlight-grid">
          {TOP_HIGHLIGHTS.map((item) => (
            <div key={item.title} className="panel-card">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              {item.details && (
                <ul className="detail-list">
                  {item.details.map((detail) => (
                    <li key={`${item.title}-${detail}`}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
