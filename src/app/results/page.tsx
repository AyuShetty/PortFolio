import type { Metadata } from "next";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { STATS, TESTIMONIALS } from "@/components/portfolio/experience-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Results",
  description: "Measured impact and recognition across product, governance, and community work.",
};

export default function ResultsPage() {
  return (
    <main className="content-layout">
      <PrimaryNav />

      <header className="content-hero">
        <h1>Results & Recognition</h1>
        <p>Measured impact and milestone recognition across product and community work.</p>
      </header>

      <section className="panel">
        <h2>Key Results</h2>
        <div className="stats-grid">
          {STATS.map((stat) => (
            <div key={stat.label} className="stat-card">
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {TESTIMONIALS.length > 0 && (
        <section className="panel">
          <h2>Testimonials</h2>
          <div className="testimonial-grid">
            {TESTIMONIALS.map((item) => (
              <figure key={item.author} className="testimonial-card">
                <blockquote>{item.quote}</blockquote>
                <figcaption>
                  <strong>{item.author}</strong>
                  <span>{item.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
