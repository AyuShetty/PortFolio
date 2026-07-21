"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export function useSmoothScroll() {
  useEffect(() => {
    // Small delay so Lenis doesn't conflict with intro overlay scroll lock
    const timer = setTimeout(() => {
      const lenis = new Lenis({
        lerp: 0.09,
        duration: 0.9,
        smoothWheel: true,
        wheelMultiplier: 1.0,
        touchMultiplier: 1.0,
        syncTouch: false,
        prevent: (node: Element) =>
          node.hasAttribute("data-lenis-prevent") ||
          node.closest("[data-lenis-prevent]") !== null,
      });

      let rafId = 0;
      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);

      const handleResize = () => {
        lenis.resize();
        if (typeof window !== "undefined" && "ScrollTrigger" in window) {
          // @ts-expect-error GSAP ScrollTrigger global fallback
          window.ScrollTrigger?.refresh?.();
        }
      };

      window.addEventListener("resize", handleResize);
      const observer = new ResizeObserver(handleResize);
      if (document.body) {
        observer.observe(document.body);
      }

      return () => {
        window.removeEventListener("resize", handleResize);
        observer.disconnect();
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);
}
