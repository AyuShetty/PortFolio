"use client";

import { useEffect, useState } from "react";
import DomeGallery, { type DomeGalleryImage } from "@/components/portfolio/DomeGallery";
import { EVENTS } from "@/components/portfolio/experience-data";
import { JourneyTimeline } from "@/components/journey/JourneyTimeline";
import { StoryModal } from "@/components/journey/StoryModal";
import "./journey.css";

export default function JourneyPage() {
  const [galleryImages, setGalleryImages] = useState<DomeGalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeEventId, setActiveEventId] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => setGalleryImages(data.images ?? []))
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (typeof detail === "number") setProgressPercent(detail);
    };
    window.addEventListener("journey-progress", handler);
    return () => window.removeEventListener("journey-progress", handler);
  }, []);

  return (
    <div className="journey-page">
      {/* ── Progress bar ── */}
      {progressPercent > 0 && (
        <div className="journey-progress-bar">
          <div className="journey-progress-fill" style={{ width: `${progressPercent}%` }}>
            <span className="journey-progress-text">{progressPercent}%</span>
          </div>
        </div>
      )}

      {/* ── Dome hero section ── */}
      <section className="journey-dome-section">
        <header className="journey-header">
          <div className="journey-header-text">
            <h1 className="journey-title">Journey</h1>
            <p className="journey-subtitle">
              The experiences, people, projects, and milestones that have shaped my journey as an engineer, leader, and lifelong learner.
            </p>
          </div>
        </header>

        <div className="journey-dome-content">
          {isLoading ? (
            <div className="journey-dome-loading"><p>Loading…</p></div>
          ) : galleryImages.length > 0 ? (
            <DomeGallery
              images={galleryImages}
              fit={0.85}
              fitBasis="width"
              maxVerticalRotationDeg={35}
              dragSensitivity={1.2}
            />
          ) : (
            <div className="journey-dome-loading"><p>No images found</p></div>
          )}
        </div>
      </section>

      {/* ── Timeline section ── */}
      <section className="journey-timeline-section">
        <div className="journey-timeline-container">
          <div className="journey-timeline-header">
            <h2 className="journey-timeline-heading">Events &amp; Milestones</h2>
            <p className="journey-timeline-sub">A chronological look at the events that shaped who I am.</p>
          </div>
          <JourneyTimeline events={EVENTS} onViewStory={setActiveEventId} />
        </div>
      </section>

      {/* ── Story modal ── */}
      <StoryModal
        events={EVENTS}
        activeId={activeEventId}
        onClose={() => setActiveEventId(null)}
        onNavigate={setActiveEventId}
      />
    </div>
  );
}
