"use client";

import { useEffect, useRef, useState } from "react";

const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

interface PixelTextProps {
  text: string;
  className?: string;
  tag?: "h1" | "h2" | "h3" | "span" | "p";
  scramble?: boolean;
}

export function PixelText({ text, className = "", tag: Tag = "span", scramble = true }: PixelTextProps) {
  const [displayed, setDisplayed] = useState(scramble ? "" : text);
  const ref = useRef<HTMLElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (!scramble) return;

    const el = ref.current;
    if (!el) return;

    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started) {
          started = true;
          observer.disconnect();
          runScramble();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, scramble]);

  function runScramble() {
    const chars = text.split("");
    let frame = 0;
    const totalFrames = chars.length * 3;

    function tick() {
      const progress = frame / totalFrames;
      const revealedCount = Math.floor(progress * chars.length);

      const result = chars
        .map((char, i) => {
          if (char === " ") return " ";
          if (i < revealedCount) return char;
          if (i === revealedCount) return CHARSET[Math.floor(Math.random() * CHARSET.length)];
          return CHARSET[Math.floor(Math.random() * CHARSET.length)];
        })
        .join("");

      setDisplayed(result);
      frame++;

      if (frame <= totalFrames + 4) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplayed(text);
      }
    }

    tick();
  }

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={`pixel-text ${className}`}>
      {displayed || "\u00A0"}
    </Tag>
  );
}
