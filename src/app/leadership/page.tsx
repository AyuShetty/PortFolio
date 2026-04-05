import type { Metadata } from "next";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import {
  LEADERSHIP_POSITIONS,
  NOTABLE_WINS,
} from "@/components/portfolio/experience-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Leadership",
  description: "Leadership roles and community initiatives across mental health and Web3 ecosystems.",
};

export default function LeadershipPage() {
  return (
    <main className="content-layout">
      <PrimaryNav />

      <header className="content-hero">
        <h1>Leadership & Community</h1>
        <p>
          Positions, initiatives, and community impact across mental health advocacy and Web3 ecosystems.
        </p>
      </header>

      <section className="panel">
        <h2>Positions & Leadership</h2>
        <div className="highlight-grid">
          {LEADERSHIP_POSITIONS.map((item) => (
            <div key={`${item.title}-${item.period}`} className="panel-card">
              {item.period && <p className="meta">{item.period}</p>}
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

      <section className="panel">
        <h2>Other Notable Wins</h2>
        <div className="highlight-grid">
          {NOTABLE_WINS.map((item) => (
            <div key={item.title} className="panel-card">
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
