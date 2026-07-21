"use client";

import Link from "next/link";
import type { ProjectEntry } from "@/components/portfolio/experience-data";

export function ProjectTiltStack({ projects }: { projects: ProjectEntry[] }) {
  return (
    <div className="w-full space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="section-title" style={{ margin: 0 }}>
            Featured Projects
          </h2>
          <p className="section-intro" style={{ margin: "0.35rem 0 0", fontSize: "0.88rem" }}>
            Scroll horizontally to explore featured work
          </p>
        </div>
      </div>

      <div className="flex w-full overflow-x-auto snap-x snap-mandatory scrollbar-none gap-6 pb-6 pt-2">
        {projects.map((project, index) => {
          const isSolo = project.role.startsWith("Solo");
          return (
            <Link
              key={project.id}
              href={project.href}
              className="group relative flex flex-col justify-between shrink-0 snap-center w-[300px] sm:w-[360px] md:w-[400px] h-[340px] rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 transition-all duration-300 hover:bg-[var(--card-bg-hover)] hover:border-[var(--card-border-hover)] hover:shadow-xl hover:-translate-y-1 focus:outline-none"
            >
              {/* Header / Badges & Hover Indicator Pill */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-semibold opacity-60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[0.7rem] px-2 py-0.5 rounded-full font-medium tracking-wider uppercase ${
                      isSolo
                        ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                        : "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                    }`}
                  >
                    {isSolo ? "Solo" : "Team"}
                  </span>
                </div>
                {/* Minimal Hover Indicator Pill */}
                <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-accent)] px-3 py-1 text-xs font-semibold text-black opacity-0 scale-95 transition-all duration-200 group-hover:opacity-100 group-hover:scale-100">
                  View Project ↗
                </span>
              </div>

              {/* Title & Summary */}
              <div className="my-auto space-y-2">
                <h3 className="text-xl font-bold tracking-tight text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors">
                  {project.title}
                </h3>
                <p className="line-clamp-3 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Tags & Year */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--card-border)]">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-[0.7rem] px-2 py-0.5 rounded-md bg-[rgba(var(--color-surface-rgb),0.35)] text-[var(--color-text-secondary)] border border-[var(--card-border)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-mono text-[var(--color-text-muted)] shrink-0 ml-2">
                  {project.year}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
