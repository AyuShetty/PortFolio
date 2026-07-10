"use client";

import { useState } from "react";
import Image from "next/image";
import type { ContributionEntry } from "@/components/portfolio/experience-data";

const PROJECT_IMAGES: Record<string, string[]> = {
  "EIPsInsight": [
    "/projects/eipsinsight-1.png",
    "/projects/eipsinsight-2.png",
  ],
  "Eth.Ed": [
    "/projects/eth-ed-1.png",
    "/projects/eth-ed-2.png",
  ],
  "EtherWorld": [
    "/projects/etherworld-1.png",
    "/projects/etherworld-2.png",
  ],
};

export function ContributionCard({ item }: { item: ContributionEntry }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = PROJECT_IMAGES[item.title] || [];
  const hasMultipleImages = images.length > 1;

  const goToPrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="contribution-card">
      {hasMultipleImages && (
        <div className="contribution-image-carousel">
          <div className="contribution-carousel-container">
            {images.map((src, index) => (
              <div
                key={src}
                className={`contribution-carousel-slide ${index === currentIndex ? "active" : ""}`}
              >
                <Image
                  src={src}
                  alt={`${item.title} screenshot ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="contribution-carousel-image"
                />
              </div>
            ))}
          </div>
          <button
            className="contribution-carousel-btn contribution-carousel-btn--prev"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            className="contribution-carousel-btn contribution-carousel-btn--next"
            onClick={goToNext}
            aria-label="Next image"
          >
            →
          </button>
          {images.length > 1 && (
            <div className="contribution-carousel-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`contribution-carousel-indicator ${index === currentIndex ? "active" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <div className="contribution-header">
        <div className="contribution-logo" aria-hidden="true">
          {item.logoText}
        </div>
        <div>
          <h3>{item.title}</h3>
          <span>{item.subtitle}</span>
          {item.duration && <span className="contribution-duration">{item.duration}</span>}
        </div>
      </div>
      <ul>
        {item.highlights.map((highlight) => (
          <li key={`${item.title}-${highlight}`}>{highlight}</li>
        ))}
      </ul>
    </div>
  );
}