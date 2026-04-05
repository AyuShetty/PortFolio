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
        <div style={{ marginTop: "1.5rem" }}>
          <a 
            href="/Ayush N shetty.pdf" 
            download 
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#1f7a63",
              color: "#f5f5f5",
              borderRadius: "0.5rem",
              textDecoration: "none",
              fontWeight: "600",
              transition: "background-color 0.3s ease"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0b3d2e")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1f7a63")}
          >
            📄 Download Resume
          </a>
        </div>
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
