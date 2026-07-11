"use client";

import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import type { ProjectEntry } from "@/components/portfolio/experience-data";

const PIXELS_PER_STEP = 70;

interface TiltCardProps {
  project: ProjectEntry;
  index: number;
  active: number;
  total: number;
  velocity: number; // spread fan more when moving fast
}

function TiltCard({ project, index, active, total, velocity }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });
  const isSolo = project.role.startsWith("Solo");
  const isActive = index === active;
  const offset = index - active;

  // Velocity spreads the fan more dramatically while moving
  const spread = 1 + Math.abs(velocity) * 0.012;
  const fanAngle = offset * 9 * spread;
  const fanX = offset * 30 * spread;
  const fanY = Math.abs(offset) * 12 * spread;
  const scale = isActive ? 1 : Math.max(0.72, 1 - Math.abs(offset) * 0.07);
  const zIndex = total - Math.abs(offset);
  // Cards further from active fade out more
  const opacity = isActive ? 1 : Math.max(0.35, 1 - Math.abs(offset) * 0.18);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -14, y: (x - 0.5) * 14 });
    setGlowPos({ x: x * 100, y: y * 100 });
  }, [isActive]);

  const handleMouseLeave = useCallback(() => setTilt({ x: 0, y: 0 }), []);

  return (
    <div
      ref={cardRef}
      className={`tilt-card ${isActive ? "tilt-card--active" : ""}`}
      style={{
        "--fan-rotate": `${fanAngle}deg`,
        "--fan-x": `${fanX}px`,
        "--fan-y": `${fanY}px`,
        "--tilt-x": `${tilt.x}deg`,
        "--tilt-y": `${tilt.y}deg`,
        "--glow-x": `${glowPos.x}%`,
        "--glow-y": `${glowPos.y}%`,
        "--card-scale": scale,
        "--card-opacity": opacity,
        zIndex,
      } as React.CSSProperties}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Radial glow overlay */}
      <div className="tilt-card__glow" />

      {/* Giant watermark number */}
      <span className="tilt-card__watermark" aria-hidden>
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="tilt-card__inner">
        <div className="tilt-card__top">
          <span className="tilt-card__num">{String(index + 1).padStart(2, "0")}</span>
          <span className={`tilt-card__badge ${isSolo ? "tilt-card__badge--solo" : "tilt-card__badge--team"}`}>
            {isSolo ? "Solo" : "Team"}
          </span>
        </div>

        <div className="tilt-card__body">
          <h3 className="tilt-card__title">{project.title}</h3>
          {isActive && (
            <p className="tilt-card__summary">{project.summary}</p>
          )}
        </div>

        <div className="tilt-card__footer">
          <div className="tilt-card__bottom-row">
            <div className="tilt-card__tags">
              {project.tags.slice(1, 4).map((t) => (
                <span key={t} className="tilt-card__tag">{t}</span>
              ))}
            </div>
            <span className="tilt-card__year">{project.year}</span>
          </div>
          {isActive && (
            <Link
              href={project.href}
              className="tilt-card__link"
              onClick={(e) => e.stopPropagation()}
            >
              <span>View Project</span>
              <span className="tilt-card__link-arrow">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export function ProjectTiltStack({ projects }: { projects: ProjectEntry[] }) {
  const [active, setActive] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const accumulated = useRef(0);
  const lastX = useRef<number | null>(null);
  const velTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (lastX.current === null) {
      lastX.current = e.clientX;
      return;
    }

    const delta = e.clientX - lastX.current;
    lastX.current = e.clientX;

    // Velocity for visual feedback
    setVelocity(delta);
    if (velTimeout.current) clearTimeout(velTimeout.current);
    velTimeout.current = setTimeout(() => setVelocity(0), 120);

    accumulated.current += delta;
    const steps = Math.trunc(accumulated.current / PIXELS_PER_STEP);
    if (steps !== 0) {
      accumulated.current -= steps * PIXELS_PER_STEP;
      setActive((a) => Math.min(projects.length - 1, Math.max(0, a + steps)));
    }
  }, [projects.length]);

  const handleMouseLeave = useCallback(() => {
    lastX.current = null;
    accumulated.current = 0;
    setVelocity(0);
  }, []);

  const progress = (active / (projects.length - 1)) * 100;

  return (
    <div className="tilt-stack-section">
      <div className="tilt-stack-header">
        <div>
          <h2 className="section-title" style={{ margin: 0 }}>Featured Projects</h2>
          <p className="section-intro" style={{ margin: "0.35rem 0 0", fontSize: "0.88rem" }}>
            Slide cursor left or right to browse
          </p>
        </div>
        <span className="tilt-stack-counter">
          {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      {/* Progress bar */}
      <div className="tilt-stack-progress">
        <div className="tilt-stack-progress__fill" style={{ width: `${progress}%` }} />
      </div>

      <div
        className="tilt-stack-zone"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: "ew-resize" }}
        aria-label="Project showcase — slide cursor to browse"
      >
        <div className="tilt-zone-hint tilt-zone-hint--left" aria-hidden>‹</div>
        <div className="tilt-zone-hint tilt-zone-hint--right" aria-hidden>›</div>

        <div className="tilt-stack-fan">
          {projects.map((p, i) => (
            <TiltCard
              key={p.id}
              project={p}
              index={i}
              active={active}
              total={projects.length}
              velocity={velocity}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
