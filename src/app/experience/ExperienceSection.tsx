"use client";

import { useState } from "react";
import { EXPERIENCES } from "@/components/portfolio/experience-data";

export function ExperienceSection({ title, category }: { title: string; category: "professional" | "leadership" }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const items = EXPERIENCES.filter(e => e.category === category);

  return (
    <section className="panel">
      <h2>{title}</h2>
      <div className="experience-accordion-list">
        {items.map((item) => (
          <ExperienceAccordion
            key={`${item.title}-${item.role}-${item.period || item.summary}`}
            item={item}
            isOpen={openId === `${item.title}-${item.role}`}
            onToggle={() => setOpenId(openId === `${item.title}-${item.role}` ? null : `${item.title}-${item.role}`)}
          />
        ))}
      </div>
    </section>
  );
}

function ExperienceAccordion({ item, isOpen, onToggle }: { item: typeof EXPERIENCES[0]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className={`experience-accordion ${isOpen ? "open" : ""}`}>
      <button className="experience-accordion-header" onClick={onToggle} aria-expanded={isOpen}>
        <div className="experience-accordion-header-content">
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
        <span className="experience-accordion-icon">{isOpen ? "−" : "+"}</span>
      </button>
      <div className="experience-accordion-content">
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
    </div>
  );
}