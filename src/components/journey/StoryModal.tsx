"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { EventEntry } from "@/components/portfolio/experience-data";
import { getAdjacentEvents } from "@/lib/journey-utils";
import { PhotoLightbox, type EventPhoto } from "./PhotoLightbox";

interface StoryModalProps {
  events: EventEntry[];
  activeId: string | null;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export function StoryModal({ events, activeId, onClose, onNavigate }: StoryModalProps) {
  const [photos, setPhotos] = useState<EventPhoto[]>([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fetchedForRef = useRef<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const event = events.find((e) => e.id === activeId) ?? null;
  const { prevId, nextId } = activeId ? getAdjacentEvents(events, activeId) : { prevId: null, nextId: null };

  // Mount portal target
  useEffect(() => { setMounted(true); }, []);

  // Animate in
  useEffect(() => {
    if (activeId) {
      setVisible(false);
      const t = setTimeout(() => setVisible(true), 20);
      return () => clearTimeout(t);
    }
    setVisible(false);
  }, [activeId]);

  // Body scroll lock
  useEffect(() => {
    if (activeId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [activeId]);

  // Fetch photos when event changes
  useEffect(() => {
    if (!event?.photoFolder || fetchedForRef.current === event.id) return;
    fetchedForRef.current = event.id;
    setPhotos([]);
    setPhotoIndex(0);

    fetch(`/api/event-photos?folder=${encodeURIComponent(event.photoFolder)}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.images)) {
          setPhotos(data.images.map((img: { src: string; alt?: string; name?: string }) => ({
            src: img.src,
            alt: img.alt ?? img.name ?? event.title,
          })));
        }
      })
      .catch(() => {});
  }, [event]);

  // Reset photo index on navigation
  useEffect(() => { setPhotoIndex(0); }, [activeId]);

  // Parallax hero on modal scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${el.scrollTop * 0.3}px)`;
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [visible]);

  // Keyboard
  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft" && prevId) onNavigate(prevId);
    if (e.key === "ArrowRight" && nextId) onNavigate(nextId);
  }, [onClose, prevId, nextId, onNavigate]);

  useEffect(() => {
    if (!activeId) return;
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeId, handleKey]);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!mounted || !activeId || !event) return null;

  const heroSrc = photos[0]?.src;

  return createPortal(
    <div
      className={`story-modal-backdrop${visible ? " is-visible" : ""}`}
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label={event.title}
    >
      <div className={`story-modal-panel${visible ? " is-visible" : ""}`} ref={panelRef}>
        {/* Close */}
        <button className="story-modal-close" onClick={onClose} aria-label="Close story">✕</button>

        {/* Scrollable content */}
        <div className="story-modal-scroll" ref={scrollRef}>

          {/* Hero */}
          <div className="story-modal-hero">
            <div className="story-modal-hero-inner" ref={heroRef}>
              {heroSrc ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={heroSrc} alt={event.title} className="story-modal-hero-img" />
              ) : (
                <div className="story-modal-hero-placeholder" />
              )}
            </div>
            <div className="story-modal-hero-overlay">
              <span className="story-modal-year-badge">{event.month ? `${event.month} ${event.year}` : event.date}</span>
              <h2 className="story-modal-title">{event.title}</h2>
              <p className="story-modal-location">📍 {event.location}</p>
            </div>
          </div>

          {/* Body */}
          <div className="story-modal-body">

            {/* Overview row */}
            <div className="story-modal-overview">
              {event.role && (
                <div className="story-modal-meta-item">
                  <span className="story-modal-meta-label">Role</span>
                  <span className="story-modal-meta-value">{event.role}</span>
                </div>
              )}
              <div className="story-modal-meta-item">
                <span className="story-modal-meta-label">Year</span>
                <span className="story-modal-meta-value">{event.date}</span>
              </div>
              <div className="story-modal-meta-item">
                <span className="story-modal-meta-label">Location</span>
                <span className="story-modal-meta-value">{event.location}</span>
              </div>
            </div>

            {/* Story */}
            <section className="story-modal-section story-modal-story">
              <h3 className="story-modal-section-title">The Story</h3>
              <p className="story-modal-description">{event.description}</p>
            </section>

            {/* Optional quote */}
            {event.quote && (
              <blockquote className="story-modal-quote">
                <span className="story-modal-quote-mark">"</span>
                {event.quote}
              </blockquote>
            )}

            {/* Highlights */}
            <section className="story-modal-section">
              <h3 className="story-modal-section-title">Key Highlights</h3>
              <ul className="story-modal-list">
                {event.highlights.map((h, i) => <li key={i}>{h}</li>)}
              </ul>
            </section>

            {/* Lessons learned */}
            {event.lessonsLearned && event.lessonsLearned.length > 0 && (
              <section className="story-modal-section">
                <h3 className="story-modal-section-title">Lessons Learned</h3>
                <ul className="story-modal-list story-modal-list--lessons">
                  {event.lessonsLearned.map((l, i) => <li key={i}>{l}</li>)}
                </ul>
              </section>
            )}

            {/* Estimated impact */}
            {event.estimatedImpact && (
              <div className="story-modal-impact">
                <span className="story-modal-impact-label">Estimated Impact</span>
                <p className="story-modal-impact-text">{event.estimatedImpact}</p>
              </div>
            )}

            {/* Photo gallery */}
            {photos.length > 0 && (
              <section className="story-modal-section story-modal-gallery-section">
                <h3 className="story-modal-section-title">
                  Photos
                  <span className="story-modal-photo-count">{photos.length} photo{photos.length !== 1 ? "s" : ""}</span>
                </h3>
                <PhotoLightbox
                  photos={photos}
                  activeIndex={photoIndex}
                  onPrev={() => setPhotoIndex((i) => (i - 1 + photos.length) % photos.length)}
                  onNext={() => setPhotoIndex((i) => (i + 1) % photos.length)}
                  onGoTo={setPhotoIndex}
                />
              </section>
            )}

            {/* Technologies */}
            {event.technologies && event.technologies.length > 0 && (
              <section className="story-modal-section">
                <h3 className="story-modal-section-title">Technologies</h3>
                <div className="story-modal-tech-grid">
                  {event.technologies.map((t) => (
                    <span key={t} className="story-modal-tech-badge">{t}</span>
                  ))}
                </div>
              </section>
            )}

            {/* Tags */}
            <div className="story-modal-tags">
              {event.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>

            {/* Prev / Next navigation */}
            <div className="story-modal-nav">
              {prevId ? (
                <button
                  className="story-modal-nav-btn story-modal-nav-btn--prev"
                  onClick={() => onNavigate(prevId)}
                  aria-label="Previous event"
                >
                  <span className="story-modal-nav-arrow">←</span>
                  <span className="story-modal-nav-label">
                    <span className="story-modal-nav-hint">Previous</span>
                    <span className="story-modal-nav-name">{events.find((e) => e.id === prevId)?.title}</span>
                  </span>
                </button>
              ) : <span />}

              {nextId ? (
                <button
                  className="story-modal-nav-btn story-modal-nav-btn--next"
                  onClick={() => onNavigate(nextId)}
                  aria-label="Next event"
                >
                  <span className="story-modal-nav-label">
                    <span className="story-modal-nav-hint">Next</span>
                    <span className="story-modal-nav-name">{events.find((e) => e.id === nextId)?.title}</span>
                  </span>
                  <span className="story-modal-nav-arrow">→</span>
                </button>
              ) : <span />}
            </div>

          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
