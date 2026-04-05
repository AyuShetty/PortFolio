"use client";

import { useEffect, useState } from "react";
import DomeGallery, { type DomeGalleryImage } from "@/components/portfolio/DomeGallery";
import { PrimaryNav } from "@/components/navigation/PrimaryNav";

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

  return (
    <div className="gallery-page">
      <style jsx>{`
        .gallery-page {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background: #0a0a1e;
          overflow: hidden;
        }

        .gallery-header {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 10;
          padding: 1.5rem 2rem;
          background: linear-gradient(to bottom, rgba(10, 10, 30, 0.8), transparent);
          backdrop-filter: blur(8px);
        }

        .gallery-content {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        @media (max-width: 768px) {
          .gallery-header {
            padding: 1rem;
          }
        }
      `}</style>

      <header className="gallery-header">
        <PrimaryNav />
        <h1 style={{ margin: "0.5rem 0 0 0", fontSize: "1.25rem", color: "#e0e0e0" }}>
          Memories & Work
        </h1>
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
    </div>
  );
}
