import type { Metadata } from "next";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { SERVICES, SKILL_GROUPS, TIMELINE } from "@/components/portfolio/experience-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "Capabilities, services, and timeline for Web3 and AI product engineering work.",
};

export default function AboutPage() {
  return (
    <main className="content-layout">
      <PrimaryNav />

      <header className="content-hero">
        <h1>About & Capabilities</h1>
        <p>System-minded product engineering with a focus on governance, education, and community tooling.</p>
      </header>

      <section className="panel">
        <h2>Skill Groups</h2>
        <div className="skills-layout">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="skill-group">
              <h3>{group.title}</h3>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Services</h2>
        <div className="services-layout">
          {SERVICES.map((service) => (
            <div key={service.title} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Timeline</h2>
        <div className="timeline-layout">
          {TIMELINE.map((entry) => (
            <div key={`${entry.year}-${entry.title}`} className="timeline-item">
              <p className="meta">{entry.year}</p>
              <h3>{entry.title}</h3>
              <p>{entry.summary}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
