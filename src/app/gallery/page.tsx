"use client";

import { useEffect, useState } from "react";
import DomeGallery, { type DomeGalleryImage } from "@/components/portfolio/DomeGallery";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";
import { EVENTS, POAPS } from "@/components/portfolio/experience-data";
import type { PoapEntry } from "@/components/portfolio/experience-data";
import "./gallery.css";

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<DomeGalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      try {
        const response = await fetch("/api/gallery");
        const data = await response.json();
        setGalleryImages(data.images || []);
      } catch (error) {
        console.error("Failed to load gallery images:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadImages();
  }, []);

  const getEventPoaps = (eventId: string): PoapEntry[] => {
    // Filter POAPs associated with this event
    return POAPS.filter((poap) => poap.event.toLowerCase().includes(eventId) || eventId.includes(poap.event.toLowerCase()));
  };

  return (
    <div className="gallery-page">
      {/* Dome Gallery Section */}
      <section className="gallery-dome-section">
        <header className="gallery-header">
          <PrimaryNav />
          <h1 className="gallery-title">Memories & Work</h1>
        </header>

        <div className="gallery-content">
          {isLoading ? (
            <div style={{ color: "#888", textAlign: "center" }}>
              <p>Loading gallery...</p>
            </div>
          ) : galleryImages.length > 0 ? (
            <DomeGallery
              images={galleryImages}
              fit={0.85}
              fitBasis="width"
              maxVerticalRotationDeg={35}
              dragSensitivity={1.2}
            />
          ) : (
            <div style={{ color: "#888", textAlign: "center" }}>
              <p>No images found in gallery</p>
            </div>
          )}
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section">
        <div className="events-container">
          <div className="events-header-content">
            <h2>Events & Milestones</h2>
            <p>Hackathons, workshops, and ecosystem participation</p>
          </div>

          <div className="events-grid">
            {EVENTS.map((event, index) => (
              <div key={event.id} className="event-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="event-date-badge">
                  <span className="event-year">{event.year}</span>
                  <span className="event-date">{event.date}</span>
                </div>

                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>

                  <div className="event-meta">
                    {event.location && <span className="event-location">📍 {event.location}</span>}
                    {event.role && <span className="event-role">👤 {event.role}</span>}
                  </div>

                  <p className="event-summary">{event.summary}</p>

                  <div className="event-highlights">
                    <h4>Highlights:</h4>
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

                  {/* POAPs Section */}
                  {getEventPoaps(event.id).length > 0 && (
                    <div className="event-poaps">
                      <h4>🏅 POAPs</h4>
                      <div className="poaps-list">
                        {getEventPoaps(event.id).map((poap) => (
                          <div key={poap.title} className="poap-item">
                            {poap.badgeUrl && (
                              <img src={poap.badgeUrl} alt={poap.title} className="poap-badge" />
                            )}
                            <div className="poap-info">
                              <p className="poap-title">{poap.title}</p>
                              {poap.summary && <p className="poap-summary">{poap.summary}</p>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
