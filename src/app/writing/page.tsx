import type { Metadata } from "next";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { WRITING_HIGHLIGHTS } from "@/components/portfolio/experience-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Writing",
  description: "Ethereum research, governance explainers, and community-ready technical storytelling.",
};

export default function WritingPage() {
  return (
    <main className="content-layout">
      <PrimaryNav />

      <header className="content-hero">
        <h1>Writing</h1>
        <p>
          Deep-dive Ethereum research, governance explainers, and community-ready technical storytelling.
        </p>
      </header>

      <section className="panel">
        <h2>Writing Highlights</h2>
        <div className="highlight-grid">
          {WRITING_HIGHLIGHTS.map((item) => (
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
