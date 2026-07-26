"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Download } from "lucide-react";

const DESCRIPTION =
  "Professional experience spanning software engineering, full-stack development, AI integration, and leadership across industry and university organizations.";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay },
  }),
};

type DownloadActionProps = {
  href: string;
  label: string;
  caption: string;
  ariaLabel: string;
  variant: "primary" | "secondary";
};

function DownloadAction({ href, label, caption, ariaLabel, variant }: DownloadActionProps) {
  return (
    <div className="experience-hero__download-item">
      <a
        href={href}
        download
        className={`experience-hero__btn experience-hero__btn--${variant}`}
        aria-label={ariaLabel}
        title={caption}
      >
        <Download size={16} strokeWidth={2} aria-hidden="true" />
        {label}
      </a>
      <span className="experience-hero__caption">{caption}</span>
    </div>
  );
}

export function ExperienceHero() {
  const shouldReduceMotion = useReducedMotion();
  const motionProps = shouldReduceMotion
    ? {}
    : { initial: "hidden" as const, animate: "visible" as const };

  return (
    <header className="content-hero content-hero--experience" data-label="EXPERIENCE">
      <motion.h1 {...motionProps} custom={0} variants={fadeUp}>
        Experience
      </motion.h1>
      <motion.p {...motionProps} custom={0.1} variants={fadeUp}>
        {DESCRIPTION}
      </motion.p>
      <motion.div
        className="experience-hero__downloads"
        {...motionProps}
        custom={0.2}
        variants={fadeUp}
      >
        <DownloadAction
          href="/Ayush N shetty.pdf"
          label="Download Resume"
          caption="1-page summary"
          ariaLabel="Download resume as PDF, one-page summary"
          variant="primary"
        />
        <DownloadAction
          href="/Ayush N shetty_CV.pdf"
          label="Download CV"
          caption="Full academic history"
          ariaLabel="Download full CV as PDF, complete academic history"
          variant="secondary"
        />
      </motion.div>
    </header>
  );
}
