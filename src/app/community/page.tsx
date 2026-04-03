import type { Metadata } from "next";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { COMMUNITY_IMPACT, NOTABLE_WINS } from "@/components/portfolio/experience-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Community",
  description: "Mentorship, advocacy, and ecosystem contributions across Web3 and education.",
};

export default function CommunityPage() {
  return (
    <main className="content-layout">
      <PrimaryNav />

      <header className="content-hero">
        <h1>Community & Impact</h1>
        <p>Mentorship, advocacy, and ecosystem contributions.</p>
      </header>

      <section className="panel">
        <h2>Community Impact</h2>
        <div className="highlight-grid">
          {COMMUNITY_IMPACT.map((item) => (
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
