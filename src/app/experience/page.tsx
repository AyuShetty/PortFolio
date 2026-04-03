import type { Metadata } from "next";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { EXPERIENCES } from "@/components/portfolio/experience-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional roles across Web3 education, product engineering, and community support.",
};

export default function ExperiencePage() {
  return (
    <main className="content-layout">
      <PrimaryNav />

      <header className="content-hero">
        <h1>Experience</h1>
        <p>Professional roles and internship work across Web3, product engineering, and community support.</p>
      </header>

      <section className="panel">
        <h2>Professional Experience</h2>
        <div className="experience-grid">
          {EXPERIENCES.map((item) => (
            <div key={`${item.title}-${item.role}-${item.period}`} className="experience-card">
              <div className="experience-header">
                <h3>{item.title}</h3>
                <span>{item.role}</span>
                {item.period && <span className="experience-period">{item.period}</span>}
              </div>
              <p>{item.summary}</p>
              <ul className="detail-list">
                {item.memories.map((memory) => (
                  <li key={`${item.title}-${memory.title}`}>
                    <strong>{memory.title}</strong> - {memory.detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
