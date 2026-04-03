import type { Metadata } from "next";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { ACHIEVEMENTS } from "@/components/portfolio/experience-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Governance milestones, research output, and hackathon wins.",
};

export default function AchievementsPage() {
  return (
    <main className="content-layout">
      <PrimaryNav />

      <header className="content-hero">
        <h1>Major Achievements</h1>
        <p>Governance milestones, research output, and hackathon wins.</p>
      </header>

      <section className="panel">
        <h2>Achievements</h2>
        <div className="achievement-grid">
          {ACHIEVEMENTS.map((item) => (
            <div key={item.title} className="achievement-card">
              <div className="experience-header">
                <h3>{item.title}</h3>
                <span className="experience-period">{item.year}</span>
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
