"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

interface CardGlowWrapperProps {
  children: ReactNode;
  className?: string;
}

export function CardGlowWrapper({ children, className = "" }: CardGlowWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--glow-x", `${x}px`);
    card.style.setProperty("--glow-y", `${y}px`);
    card.style.setProperty("--glow-opacity", "1");
  }

  function handleMouseLeave() {
    const card = ref.current;
    if (!card) return;
    card.style.setProperty("--glow-opacity", "0");
  }

  return (
    <div
      ref={ref}
      className={`glow-card ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
