"use client";

import { useEffect, useRef, useState } from "react";
import type { EventEntry } from "@/components/portfolio/experience-data";

interface StoryCardProps {
  event: EventEntry;
  index: number;
  totalEvents: number;
  onViewStory: (id: string) => void;
}

export function StoryCard({ event, index, totalEvents, onViewStory }: StoryCardProps) {
  const [coverSrc, setCoverSrc] = useState<string | null>(null);
  const [photoCount, setPhotoCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const fetchedRef = useRef(false);

  // Lazy fetch cover photo
  useEffect(() => {
    if (!event.photoFolder || fetchedRef.current) return;
    fetchedRef.current = true;
    fetch(`/api/event-photos?folder=${encodeURIComponent(event.photoFolder)}`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.images) && data.images.length > 0) {
          setCoverSrc(data.images[0].src);
          setPhotoCount(data.images.length);
        }
      })
      .catch(() => {});
  }, [event.photoFolder]);

  // IntersectionObserver scroll-reveal
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`story-card${isVisible ? " is-visible" : ""}`}
      data-card-index={index}
      data-total-cards={totalEvents}
    >
      {/* Timeline marker dot */}
      <div className="story-card-dot" aria-hidden="true" />

      <div className="story-card-wrapper">
        {/* Cover image */}
        <div className="story-card-cover">
          {coverSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={coverSrc}
              alt={event.title}
              className="story-card-cover-img"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="story-card-cover-placeholder" />
          )}
          {photoCount > 0 && (
            <span className="story-card-photo-count">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              {photoCount}
            </span>
          )}
        </div>

        {/* Card body */}
        <div className="story-card-body">
          {/* Year / month badge */}
          <div className="story-card-date-badge">
            <span className="story-card-year">{event.year}</span>
            {event.month && <span className="story-card-month">{event.month}</span>}
          </div>

          <div className="story-card-content">
            <h3 className="story-card-title">{event.title}</h3>

            <div className="story-card-meta">
              {event.location && (
                <span className="story-card-location">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {event.location}
                </span>
              )}
              {event.role && (
                <span className="story-card-role">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {event.role}
                </span>
              )}
            </div>

            <p className="story-card-summary">{event.summary}</p>

            <div className="story-card-tags">
              {event.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="tag"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <button
              className="story-card-btn"
              onClick={() => onViewStory(event.id)}
              aria-label={`View story: ${event.title}`}
            >
              View Story
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
