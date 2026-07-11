import type { Metadata } from "next";
import Link from "next/link";
import { ResumeDownloadButton } from "@/components/ResumeDownloadButton";
import { MarqueeTicker } from "@/components/MarqueeTicker";
import { SERVICES, SKILL_GROUPS, TIMELINE, STATS } from "@/components/portfolio/experience-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "Software engineer and product developer. Full-stack developer with expertise in Web3, AI integration, and enterprise systems.",
};

export default function AboutPage() {
  return (
    <main className="content-layout">
      <header className="content-hero" data-label="ABOUT">
        <h1>About & Capabilities</h1>
        <p className="about-bio">
          I&apos;m a software engineer and product developer who builds full-stack applications, AI integrations, and scalable systems. I&apos;ve shipped governance analytics platforms, AI-powered education tools, and community infrastructure — leading teams, writing the code, and owning the product from concept to deployment.
        </p>
        <div style={{ marginTop: "1.5rem" }}>
          <ResumeDownloadButton />
        </div>
      </header>

      <MarqueeTicker />

      <section className="stats-bar" style={{ marginTop: "3rem" }}>
        {STATS.map((stat) => (
          <div key={stat.label} className="stat-item">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </section>

      <section className="panel">
        <h2>Skill Groups</h2>
        <div className="skills-layout">
          {SKILL_GROUPS.map((group) => (
            <div key={group.title} className="skill-group">
              <h3>{group.title}</h3>
              <ul className="skill-tags">
                {group.skills.map((skill) => (
                  <li key={skill} className="skill-tag">{skill}</li>
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

      <section className="page-cta">
        <h3>Let's build something together</h3>
        <p>Have a project in mind or want to collaborate?</p>
        <Link href="/projects" className="cta-button">View Projects</Link>
      </section>
    </main>
  );
}
