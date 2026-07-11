"use client";

import Link from "next/link";
import { useState } from "react";
import type { ProjectEntry, ProjectWorkEntry } from "@/components/portfolio/experience-data";

interface ProjectSpotlightProps {
  items: ProjectWorkEntry[];
  projects: ProjectEntry[];
}

export function ProjectSpotlight({ items, projects }: ProjectSpotlightProps) {
  const [hovered, setHovered] = useState<string | null>(null);
  const anyHovered = hovered !== null;

  return (
    <div className="spotlight-list" data-any-hovered={anyHovered}>
      {items.map((item, i) => {
        const matched = projects.find((p) => p.title === item.title);
        const isSolo = !matched || matched.role.startsWith("Solo");
        const isHovered = hovered === item.title;
        const num = String(i + 1).padStart(2, "0");

        return (
          <div
            key={item.title}
            className={`spotlight-row ${isHovered ? "is-lit" : ""} ${anyHovered && !isHovered ? "is-dim" : ""}`}
            onMouseEnter={() => setHovered(item.title)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Accent line — only visible when lit */}
            <div className="spotlight-row__accent" aria-hidden />

            {/* Always-visible header */}
            <div className="spotlight-row__header">
              <span className="spotlight-row__num">{num}</span>
              <h3 className="spotlight-row__title">{item.title}</h3>
              <div className="spotlight-row__meta">
                {matched?.year && (
                  <span className="spotlight-row__year">{matched.year}</span>
                )}
                <span className={`spotlight-row__badge ${isSolo ? "spotlight-row__badge--solo" : "spotlight-row__badge--team"}`}>
                  {isSolo ? "Solo" : "Team"}
                </span>
                <span className="spotlight-row__stack">
                  {matched?.tags.slice(1, 3).join(" · ")}
                </span>
              </div>
            </div>

            {/* Revealed on hover */}
            <div className="spotlight-row__body">
              <div className="spotlight-row__body-inner">
                <p className="spotlight-row__summary">{item.summary}</p>
                <ul className="spotlight-row__highlights">
                  {item.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <div className="spotlight-row__footer">
                  <div className="spotlight-row__tags">
                    {matched?.tags.slice(1).map((t) => (
                      <span key={t} className="spotlight-row__tag">{t}</span>
                    ))}
                  </div>
                  {matched && (
                    <Link href={matched.href} className="spotlight-row__link">
                      View Project <span className="spotlight-row__arrow">→</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
