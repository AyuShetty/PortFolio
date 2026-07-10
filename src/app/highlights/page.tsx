import type { Metadata } from "next";
import Link from "next/link";
import { TOP_HIGHLIGHTS, STATS } from "@/components/portfolio/experience-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Highlights",
  description: "Key milestones across governance tooling, Web3 education, and leadership.",
};

export default function HighlightsPage() {
  return (
    <main className="content-layout">
      <header className="content-hero">
        <h1>Top Highlights</h1>
        <p>Key milestones across governance tooling, Web3 education, and community leadership.</p>
      </header>

      <section className="stats-bar stats-bar--compact">
        {STATS.map((stat) => (
          <div key={stat.label} className="stat-item">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

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

      <section className="page-cta">
        <h3>Explore the full journey</h3>
        <p>See all experiences and projects</p>
        <div className="cta-group">
          <Link href="/experience" className="cta-button">Experience</Link>
          <Link href="/projects" className="cta-button cta-button--secondary">Projects</Link>
        </div>
      </section>
    </main>
  );
}
