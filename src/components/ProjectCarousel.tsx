"use client";

import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import type { ProjectEntry } from "@/components/portfolio/experience-data";

export function ProjectCarousel({ projects }: { projects: ProjectEntry[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const scrollStart = useRef(0);

  // Sync active dot with scroll position
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const cardWidth = track.scrollWidth / projects.length;
      setActive(Math.round(track.scrollLeft / cardWidth));
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, [projects.length]);

  const scrollTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.scrollWidth / projects.length;
    track.scrollTo({ left: i * cardWidth, behavior: "smooth" });
    setActive(i);
  };

  // Mouse drag to scroll
  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = e.clientX;
    scrollStart.current = trackRef.current?.scrollLeft ?? 0;
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    trackRef.current.scrollLeft = scrollStart.current - (e.clientX - dragStart.current);
  };
  const onMouseUp = () => setIsDragging(false);

  return (
    <div className="proj-carousel">
      {/* Header row */}
      <div className="proj-carousel__header">
        <div>
          <h2 className="section-title" style={{ margin: 0 }}>Featured Projects</h2>
          <p className="section-intro" style={{ margin: "0.4rem 0 0", fontSize: "0.9rem" }}>
            Products built solo and with teams — from hackathon wins to production platforms.
          </p>
        </div>
        <div className="proj-carousel__controls">
          <button
            className="proj-carousel__arrow"
            onClick={() => scrollTo(Math.max(0, active - 1))}
            aria-label="Previous"
            disabled={active === 0}
          >←</button>
          <button
            className="proj-carousel__arrow"
            onClick={() => scrollTo(Math.min(projects.length - 1, active + 1))}
            aria-label="Next"
            disabled={active === projects.length - 1}
          >→</button>
        </div>
      </div>

      {/* Scrollable track */}
      <div
        ref={trackRef}
        className={`proj-carousel__track${isDragging ? " is-dragging" : ""}`}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {projects.map((p, i) => {
          const isSolo = p.role.startsWith("Solo");
          return (
            <div key={p.id} className={`proj-card${i === active ? " is-active" : ""}`}>
              <div className="proj-card__top">
                <span className="proj-card__year">{p.year}</span>
                <span className={`proj-card__badge ${isSolo ? "proj-card__badge--solo" : "proj-card__badge--team"}`}>
                  {isSolo ? "Solo" : "Team"}
                </span>
              </div>
              <h3 className="proj-card__title">{p.title}</h3>
              <p className="proj-card__summary">{p.summary}</p>
              <p className="proj-card__impact">{p.impact}</p>
              <div className="proj-card__tags">
                {p.tags.slice(1).map((t) => (
                  <span key={t} className="proj-card__tag">{t}</span>
                ))}
              </div>
              <Link href={p.href} className="proj-card__link">View →</Link>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="proj-carousel__dots">
        {projects.map((_, i) => (
          <button
            key={i}
            className={`proj-carousel__dot${i === active ? " is-active" : ""}`}
            onClick={() => scrollTo(i)}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
