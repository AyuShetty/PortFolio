"use client";

export type EventPhoto = { src: string; alt: string };

interface PhotoLightboxProps {
  photos: EventPhoto[];
  activeIndex: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (i: number) => void;
}

export function PhotoLightbox({ photos, activeIndex, onPrev, onNext, onGoTo }: PhotoLightboxProps) {
  if (photos.length === 0) return null;
  const photo = photos[activeIndex];

  return (
    <div className="photo-lightbox">
      <div className="photo-lightbox-main">
        {photos.length > 1 && (
          <button className="photo-lb-nav photo-lb-nav--prev" onClick={onPrev} aria-label="Previous photo">‹</button>
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.alt}
          className="photo-lb-img"
          loading="lazy"
          decoding="async"
        />
        {photos.length > 1 && (
          <button className="photo-lb-nav photo-lb-nav--next" onClick={onNext} aria-label="Next photo">›</button>
        )}
        <span className="photo-lb-counter">{activeIndex + 1} / {photos.length}</span>
      </div>

      {photos.length > 1 && (
        <div className="photo-lb-strip">
          {photos.map((p, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              className={`photo-lb-thumb${i === activeIndex ? " active" : ""}`}
              onClick={() => onGoTo(i)}
              onKeyDown={(e) => e.key === "Enter" && onGoTo(i)}
              role="button"
              tabIndex={0}
              aria-label={`View photo ${i + 1}`}
              loading="lazy"
              decoding="async"
            />
          ))}
        </div>
      )}
    </div>
  );
}
