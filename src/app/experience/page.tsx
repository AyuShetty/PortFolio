import type { Metadata } from "next";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";
import { EXPERIENCES } from "@/components/portfolio/experience-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience spanning software engineering, Web3, product development, technical marketing, and leadership across industry and university organizations.",
};

export default function ExperiencePage() {
  const professionalExperiences = EXPERIENCES.filter(e => e.category === "professional");
  const leadershipExperiences = EXPERIENCES.filter(e => e.category === "leadership");

  return (
    <main className="content-layout">
      <PrimaryNav />

      <header className="content-hero">
        <h1>Experience</h1>
        <p>Professional experience spanning software engineering, Web3, product development, technical marketing, and leadership across industry and university organizations.</p>
        <div style={{ marginTop: "1.5rem" }}>
          <ResumeDownloadButton />
        </div>
      </header>

      {/* Professional Experience Section */}
      <section className="panel" style={{ marginBottom: "4rem" }}>
        <h2>Professional Experience</h2>
        <div className="experience-grid">
          {professionalExperiences.map((item) => (
            <div key={`${item.title}-${item.role}-${item.period}`} className="experience-card">
              <div className="experience-header-container">
                <div className="experience-logo-placeholder">
                  {item.icon}
                </div>
                <div className="experience-header-text">
                  <div className="experience-title-row">
                    <h3>{item.title}</h3>
                    {item.period && <span className="experience-period">{item.period}</span>}
                  </div>
                  <div className="experience-role-row">
                    <span className="experience-role">{item.role}</span>
                    {item.location && <span className="experience-location">{item.location}</span>}
                  </div>
                </div>
              </div>
              <p className="experience-summary">{item.summary}</p>
              {item.highlights && item.highlights.length > 0 && (
                <ul className="detail-list">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              )}
              <div className="experience-skills">
                {item.skills.map((skill) => (
                  <span key={skill} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership Experience Section */}
      <section className="panel">
        <h2>Leadership & Organizations</h2>
        <div className="experience-grid">
          {leadershipExperiences.map((item) => (
            <div key={`${item.title}-${item.role}-${item.period || item.summary}`} className="experience-card">
              <div className="experience-header-container">
                <div className="experience-logo-placeholder">
                  {item.icon}
                </div>
                <div className="experience-header-text">
                  <div className="experience-title-row">
                    <h3>{item.title}</h3>
                    {item.period && <span className="experience-period">{item.period}</span>}
                  </div>
                  <div className="experience-role-row">
                    <span className="experience-role">
                      {item.role} {item.org ? `· ${item.org}` : ""}
                    </span>
                    {item.location && <span className="experience-location">{item.location}</span>}
                  </div>
                </div>
              </div>
              <p className="experience-summary">{item.summary}</p>
              {item.highlights && item.highlights.length > 0 && (
                <ul className="detail-list">
                  {item.highlights.map((highlight, idx) => (
                    <li key={idx}>{highlight}</li>
                  ))}
                </ul>
              )}
              <div className="experience-skills">
                {item.skills.map((skill) => (
                  <span key={skill} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

