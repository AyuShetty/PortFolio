"use client";

import { useEffect, useRef, useState } from "react";
import type { EventEntry } from "@/components/portfolio/experience-data";
import { groupEventsByYear } from "@/lib/journey-utils";
import { StoryCard } from "./StoryCard";

interface JourneyTimelineProps {
  events: EventEntry[];
  onViewStory: (id: string) => void;
}

function YearHeading({ year }: { year: string }) {
  return (
    <div className="timeline-year-heading" data-year={year} suppressHydrationWarning>
      <div className="timeline-year-line" aria-hidden="true" />
      <span className="timeline-year-label">{year}</span>
      <div className="timeline-year-line" aria-hidden="true" />
    </div>
  );
}

export function JourneyTimeline({ events, onViewStory }: JourneyTimelineProps) {
  const groups = groupEventsByYear(events);
  const totalEvents = events.length;
  const cardRefs = useRef<Map<number, HTMLElement>>(new Map());
  const [progressPercent, setProgressPercent] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const allCards = document.querySelectorAll<HTMLElement>(".story-card");
    allCards.forEach((card, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            cardRefs.current.set(index, card);
          } else if (entry.intersectionRect.height === 0) {
            cardRefs.current.delete(index);
          }
        },
        { threshold: 0.15 },
      );
      observer.observe(card);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const visibleCount = cardRefs.current.size;
      const pct = totalEvents > 0 ? Math.round((visibleCount / totalEvents) * 100) : 0;
      setProgressPercent(pct);
    }, 100);
    return () => clearInterval(interval);
  }, [totalEvents]);

  useEffect(() => {
    const event = new CustomEvent("journey-progress", { detail: progressPercent });
    window.dispatchEvent(event);
  }, [progressPercent]);

  return (
    <div className="journey-timeline">
      {groups.map((group, gi) => (
        <div key={group.year} className="timeline-year-group" data-year={group.year}>
          <YearHeading year={group.year} />

          <div className="timeline-cards-container">
            <div className="timeline-vertical-line" aria-hidden="true" />
            <div className="timeline-cards-grid">
              {group.events.map((event, ei) => {
                const cardIndex = events.findIndex((e) => e.id === event.id);
                return (
                  <StoryCard
                    key={event.id}
                    event={event}
                    index={cardIndex}
                    totalEvents={totalEvents}
                    onViewStory={onViewStory}
                  />
                );
              })}
            </div>
          </div>

          {/* Connector between year groups */}
          {gi < groups.length - 1 && (
            <div className="timeline-year-gap" aria-hidden="true" suppressHydrationWarning>
              <div className="timeline-year-gap-line" />
              <div className="timeline-year-gap-dot" />
              <div className="timeline-year-gap-line" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
