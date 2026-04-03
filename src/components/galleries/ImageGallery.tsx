"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryImage } from "@/lib/gallery";

type ImageGalleryProps = {
  title: string;
  description: string;
  images: GalleryImage[];
  emptyState: string;
  enableFilters?: boolean;
  enableReorder?: boolean;
  showFeatured?: boolean;
  categories?: string[];
};

export function ImageGallery({
  title,
  description,
  images,
  emptyState,
  enableFilters = false,
  enableReorder = false,
  showFeatured = true,
  categories,
}: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState("all");
  const [orderedImages, setOrderedImages] = useState<GalleryImage[]>(images);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied">("idle");

  useEffect(() => {
    setOrderedImages(images);
  }, [images]);

  useEffect(() => {
    if (activeIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) => {
          if (current === null) return current;
          return (current + 1) % images.length;
        });
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => {
          if (current === null) return current;
          return (current - 1 + images.length) % images.length;
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, images.length]);

  const filterOptions = useMemo(() => {
    const set = new Set<string>();
    images.forEach((image) => {
      if (image.category) set.add(image.category);
    });
    (categories ?? []).forEach((cat) => set.add(cat));
    return ["all", ...Array.from(set)];
  }, [categories, images]);

  const featuredImages = useMemo(
    () => (showFeatured ? orderedImages.filter((image) => image.featured) : []),
    [orderedImages, showFeatured],
  );

  const visibleImages = filter === "all"
    ? orderedImages
    : orderedImages.filter((image) => image.category === filter);

  const handleDrop = (dropIndex: number) => {
    if (dragIndex === null || dragIndex === dropIndex) return;
    setOrderedImages((current) => {
      const next = [...current];
      const [moved] = next.splice(dragIndex, 1);
      next.splice(dropIndex, 0, moved);
      return next;
    });
  };

  const copyOrderJson = async () => {
    const payload = {
      items: orderedImages.map((image) => ({
        file: image.fileName,
        title: image.name,
        category: image.category,
        featured: image.featured,
      })),
    };
    await navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopyStatus("copied");
    window.setTimeout(() => setCopyStatus("idle"), 2000);
  };

  return (
    <section className="gallery-page">
      <header className="gallery-header">
        <h1>{title}</h1>
        <p>{description}</p>
      </header>

      {images.length === 0 ? (
        <div className="gallery-empty" role="status" aria-live="polite">
          <p>{emptyState}</p>
        </div>
      ) : (
        <>
          <div className="gallery-toolbar">
            {enableFilters && (
              <div className="gallery-filters">
                {filterOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    data-active={filter === option}
                    onClick={() => setFilter(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
            {enableReorder && (
              <div className="gallery-reorder">
                <span>Drag to reorder. Use this order for gallery.json.</span>
                <button type="button" onClick={copyOrderJson}>
                  {copyStatus === "copied" ? "Copied" : "Copy JSON"}
                </button>
              </div>
            )}
          </div>

          {featuredImages.length > 0 && (
            <div className="gallery-featured">
              {featuredImages.map((image) => (
                <motion.button
                  key={image.src}
                  type="button"
                  className="gallery-tile featured"
                  onClick={() => setActiveIndex(orderedImages.findIndex((item) => item.src === image.src))}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 100vw"
                    className="gallery-image"
                    placeholder={image.blurDataURL ? "blur" : "empty"}
                    blurDataURL={image.blurDataURL}
                  />
                  <span>{image.name}</span>
                </motion.button>
              ))}
            </div>
          )}

          <div className="gallery-grid">
            {visibleImages.map((image, index) => (
              <motion.button
                key={image.src}
                type="button"
                className="gallery-tile"
                onClick={() =>
                  setActiveIndex(orderedImages.findIndex((item) => item.src === image.src))
                }
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.2 }}
                draggable={enableReorder && filter === "all"}
                onDragStart={() => setDragIndex(index)}
                onDragOver={(event) => {
                  if (!enableReorder || filter !== "all") return;
                  event.preventDefault();
                }}
                onDrop={() => handleDrop(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="gallery-image"
                  placeholder={image.blurDataURL ? "blur" : "empty"}
                  blurDataURL={image.blurDataURL}
                />
                <span>{image.name}</span>
              </motion.button>
            ))}
          </div>
        </>
      )}

      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveIndex(null)}
          >
            <motion.div
              className="gallery-lightbox-card"
              initial={{ scale: 0.95, y: 12 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 8 }}
              transition={{ duration: 0.25 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button type="button" className="gallery-close" onClick={() => setActiveIndex(null)}>
                Close
              </button>
              <div className="gallery-lightbox-media">
                <Image
                  src={images[activeIndex].src}
                  alt={images[activeIndex].alt}
                  fill
                  sizes="100vw"
                  className="gallery-image"
                  priority
                />
              </div>
              <div className="gallery-lightbox-caption">
                <p>{images[activeIndex].name}</p>
                <div className="gallery-controls">
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((current) => {
                        if (current === null) return current;
                        return (current - 1 + images.length) % images.length;
                      })
                    }
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActiveIndex((current) => {
                        if (current === null) return current;
                        return (current + 1) % images.length;
                      })
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
