"use client";

import Link from "next/link";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { EVENTS } from "@/components/portfolio/experience-data";
import "./events.css";

export default function EventsPage() {
  return (
    <main className="events-page">
      <PrimaryNav />
      
      <div className="events-container">
        <section className="events-header">
          <h1>Events & Community</h1>
          <p>Hackathons, workshops, and ecosystem participation that shaped my journey</p>
        </section>

        <div className="events-grid">
          {EVENTS.map((event, index) => (
            <article key={event.id} className="event-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="event-date-badge">
                <span className="event-year">{event.year}</span>
                <span className="event-date">{event.date}</span>
              </div>

              <div className="event-content">
                <h2 className="event-title">{event.title}</h2>
                
                <div className="event-meta">
                  <span className="event-location">📍 {event.location}</span>
                  {event.role && <span className="event-role">👤 {event.role}</span>}
                </div>

                <p className="event-summary">{event.summary}</p>

                <p className="event-description">{event.description}</p>

                <div className="event-highlights">
                  <h3>Key Highlights:</h3>
                  <ul>
                    {event.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>

                <div className="event-tags">
                  {event.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                {event.website && (
                  <a href={event.website} target="_blank" rel="noopener noreferrer" className="event-link">
                    Learn More →
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <section className="events-cta">
          <h2>More Stories</h2>
          <p>Check out the full gallery to see photos and memories from these events</p>
          <Link href="/gallery" className="cta-button">
            View Gallery
          </Link>
        </section>
      </div>
    </main>
  );
}
