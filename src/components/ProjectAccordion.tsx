"use client";

import { useState } from "react";
import type { ProjectEntry } from "@/components/portfolio/experience-data";
import type { ProjectWorkEntry } from "@/components/portfolio/experience-data";
import Link from "next/link";

interface ProjectAccordionProps {
  items: ProjectWorkEntry[];
  projects: ProjectEntry[];
}

export function ProjectAccordion({ items, projects }: ProjectAccordionProps) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="proj-accordion">
      {items.map((item, i) => {
        const matched = projects.find((p) => p.title === item.title);
        const isSolo = !matched || matched.role.startsWith("Solo");
        const isOpen = open === item.title;
        const num = String(i + 1).padStart(2, "0");

        return (
          <div
            key={item.title}
            className={`proj-accordion__row ${isOpen ? "is-open" : ""}`}
          >
            {/* Clickable header */}
            <button
              className="proj-accordion__trigger"
              onClick={() => setOpen(isOpen ? null : item.title)}
              aria-expanded={isOpen}
            >
              <span className="proj-accordion__num">{num}</span>
              <span className="proj-accordion__name">{item.title}</span>
              <div className="proj-accordion__meta">
                {matched?.year && (
                  <span className="proj-accordion__year">{matched.year}</span>
                )}
                <span className={`proj-accordion__badge ${isSolo ? "proj-accordion__badge--solo" : "proj-accordion__badge--team"}`}>
                  {isSolo ? "Solo" : "Team"}
                </span>
                <span className="proj-accordion__tags-inline">
                  {matched?.tags.slice(1, 3).join(" · ")}
                </span>
              </div>
              <span className="proj-accordion__icon" aria-hidden>
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {/* Expandable content */}
            <div className="proj-accordion__content">
              <div className="proj-accordion__body">
                <p className="proj-accordion__summary">{item.summary}</p>
                <ul className="proj-accordion__highlights">
                  {item.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                {matched?.tags.slice(1) && (
                  <div className="proj-accordion__all-tags">
                    {matched.tags.slice(1).map((t) => (
                      <span key={t} className="proj-card__tag">{t}</span>
                    ))}
                  </div>
                )}
                {matched && (
                  <Link href={matched.href} className="proj-accordion__link">
                    View Project →
                  </Link>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
