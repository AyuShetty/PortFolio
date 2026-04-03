"use client";

import Image from "next/image";
import { LayoutGroup, motion } from "framer-motion";
import { useCallback, useEffect, useLayoutEffect, useState, type SVGProps } from "react";

type OverlayState = "collapsed" | "expanded" | "closing" | "hidden";
type ExitTarget = "about" | null;

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

const NAME = "Ayush Shetty";
const AVATAR_SRC = "/ayush-portrait.jpeg";
const INTRO_COPY =
  "Product engineer focused on Web3, AI, and Ethereum governance tooling. This intro sits on top of the site and only appears on first visit.";

function TwitterIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M5 5h3.05l3.96 5.17L16.83 5H19l-5.45 6.34L20 19h-3.05l-4.24-5.54L7 19H4.83l5.98-6.96L5 5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.88 7.5A1.72 1.72 0 1 1 3.44 7.5a1.72 1.72 0 0 1 3.44 0ZM4.1 9.5H9V20H4.1V9.5Zm7.3 0h4.61v1.42h.06c.64-1.03 2.01-1.66 3.8-1.66 4.06 0 4.83 2.67 4.83 6.13V20h-4.89v-4.11c0-.98-.02-2.24-1.38-2.24-1.38 0-1.6 1.08-1.6 2.18V20h-4.43V9.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.3" cy="6.7" r="1.15" fill="currentColor" />
    </svg>
  );
}

function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2C6.48 2 2 6.58 2 12.23c0 4.52 2.86 8.35 6.84 9.7.5.1.68-.22.68-.48 0-.24-.01-.88-.01-1.73-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.13-1.52-1.13-1.52-.92-.65.07-.63.07-.63 1.02.07 1.56 1.07 1.56 1.07.9 1.59 2.36 1.13 2.93.87.09-.67.35-1.13.63-1.39-2.22-.26-4.56-1.13-4.56-5.01 0-1.11.39-2.02 1.03-2.73-.1-.26-.45-1.32.1-2.76 0 0 .84-.28 2.75 1.05a9.13 9.13 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.44.2 2.5.1 2.76.64.71 1.03 1.62 1.03 2.73 0 3.89-2.34 4.75-4.57 5 .36.32.67.94.67 1.89 0 1.36-.01 2.45-.01 2.78 0 .26.18.58.69.48A10.24 10.24 0 0 0 22 12.23C22 6.58 17.52 2 12 2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20.8 4.4 3.7 11.1c-1 .39-.98 1.87.03 2.24l4.37 1.58 1.68 5.02c.23.69 1.1.93 1.66.47l2.44-2.03 4.17 3.07c.65.48 1.58.15 1.8-.63l2.63-15.83c.18-1.07-.87-1.96-1.68-1.6Zm-3.29 3.1-7.98 6.95-.33 3.17-.98-2.93-3.06-1.1 13.35-5.1-1 9.01-3.97-2.92-2.05 1.71.4-2.77 6.62-6.88Z"
        fill="currentColor"
      />
    </svg>
  );
}

const shellSpring = {
  type: "spring" as const,
  stiffness: 120,
  damping: 20,
  mass: 0.95,
};

const textContainerVariants = {
  collapsed: { opacity: 0, y: 10 },
  expanded: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
  closing: { opacity: 1, y: 0, transition: { staggerChildren: 0.05, staggerDirection: -1 } },
};

const textItemVariants = {
  collapsed: { opacity: 0, y: 8 },
  expanded: { opacity: 1, y: 0 },
  closing: { opacity: 0.94, y: 0 },
};

export function IntroOverlay() {
  const [state, setState] = useState<OverlayState>("collapsed");
  const [exitTarget, setExitTarget] = useState<ExitTarget>(null);
  const [shouldFadeOut, setShouldFadeOut] = useState(false);

  useIsomorphicLayoutEffect(() => {
    try {
      const visited = window.localStorage.getItem("visited") === "true";
      document.documentElement.dataset.introVisited = visited ? "true" : "false";
      document.documentElement.dataset.introState = visited ? "entered" : "intro";
      if (visited) {
        setState("hidden");
      }
    } catch {
      document.documentElement.dataset.introVisited = "false";
      document.documentElement.dataset.introState = "intro";
    }
  }, []);

  const isVisible = state !== "hidden";

  useEffect(() => {
    document.body.classList.toggle("intro-scroll-lock", isVisible);
    return () => {
      document.body.classList.remove("intro-scroll-lock");
    };
  }, [isVisible]);

  useEffect(() => {
    if (state !== "hidden" || exitTarget !== "about") return;

    const rafId = window.requestAnimationFrame(() => {
      if (exitTarget === "about") {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });

    return () => window.cancelAnimationFrame(rafId);
  }, [exitTarget, state]);

  useEffect(() => {
    document.documentElement.dataset.introState = state === "closing" ? "transitioning" : state === "hidden" ? "entered" : "intro";
  }, [state]);

  const openExpanded = useCallback(() => {
    setState("expanded");
  }, []);

  const startExit = useCallback(() => {
    try {
      window.localStorage.setItem("visited", "true");
      document.documentElement.dataset.introVisited = "true";
      document.documentElement.dataset.introState = "transitioning";
    } catch {
      // Ignore storage failures and continue the transition.
    }

    setExitTarget(null);
    setShouldFadeOut(true);
    setState("closing");
  }, []);

  const shellRadius = state === "collapsed" ? 9999 : state === "expanded" ? 32 : 0;

  const cardClassName =
    state === "collapsed"
      ? "relative flex h-20 w-full max-w-[32rem] cursor-pointer items-center gap-4 overflow-hidden rounded-full border border-white/10 bg-black/95 px-3 py-2 shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
      : state === "expanded"
        ? "relative w-full max-w-2xl cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-black/95 px-6 py-6 shadow-[0_40px_150px_rgba(0,0,0,0.72)] sm:px-8 sm:py-8 md:px-10 md:py-10"
        : "relative flex h-[100dvh] w-full max-w-none overflow-hidden rounded-none border border-white/10 bg-black/95 px-6 py-6 shadow-none sm:px-10 sm:py-10";

  return (
    <LayoutGroup id="intro-overlay">
      <motion.div
        className="intro-overlay fixed inset-0 z-[9999] flex items-center justify-center bg-[#050505] px-4"
        role="dialog"
        aria-modal="true"
        aria-label="Intro overlay"
        initial={false}
        animate={{ opacity: shouldFadeOut ? 0 : 1, scale: shouldFadeOut ? 1.05 : 1 }}
        transition={{ duration: 0.72, ease: "easeInOut" }}
        style={{ pointerEvents: state === "closing" ? "none" : "auto" }}
        onAnimationComplete={() => {
          if (shouldFadeOut) {
            setState("hidden");
          }
        }}
      >
        {state !== "hidden" && (
          <motion.div
            layoutId="intro-shell"
            layout
            initial={false}
            animate={{ borderRadius: shellRadius }}
            transition={shellSpring}
            className={cardClassName}
            onClick={state === "collapsed" ? openExpanded : state === "expanded" ? () => setState("collapsed") : undefined}
            role={state === "collapsed" || state === "expanded" ? "button" : undefined}
            aria-expanded={state !== "collapsed"}
            tabIndex={state === "collapsed" || state === "expanded" ? 0 : -1}
            onKeyDown={
              state === "collapsed"
                ? (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      openExpanded();
                    }
                  }
                : state === "expanded"
                  ? (event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        setState("collapsed");
                      }
                    }
                : undefined
            }
          >
            <div className={state === "collapsed" ? "flex w-full items-center gap-3" : "flex w-full flex-col gap-6 sm:gap-7"}>
              <div className={state === "collapsed" ? "flex min-w-0 flex-1 items-center gap-3" : "flex items-start gap-4 sm:gap-5"}>
                <motion.div
                  layoutId="intro-avatar"
                  layout
                  className={
                    state === "collapsed"
                      ? "relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5"
                      : "relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-full border border-white/10 bg-white/5 sm:h-20 sm:w-20"
                  }
                >
                  <Image
                    src={AVATAR_SRC}
                    alt="Ayush Shetty portrait"
                    fill
                    priority
                    sizes={state === "collapsed" ? "56px" : "80px"}
                    className="object-cover"
                  />
                </motion.div>

                <div className={state === "collapsed" ? "min-w-0 flex-1 pt-0.5" : "pt-1"}>
                  <p
                    className={
                      state === "collapsed"
                        ? "text-[0.64rem] font-medium uppercase tracking-[0.38em] text-white/42"
                        : "text-sm font-medium uppercase tracking-[0.34em] text-white/48"
                    }
                  >
                    Hello, I&apos;m
                  </p>
                  <h2
                    className={
                      state === "collapsed"
                        ? "mt-1 truncate text-xl font-semibold tracking-tight text-white sm:text-2xl"
                        : "mt-1 text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
                    }
                    style={{ fontFamily: "var(--font-display-family)" }}
                  >
                    {NAME}
                  </h2>
                </div>
              </div>

              {state === "collapsed" ? (
                <motion.button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    openExpanded();
                  }}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#1fbf5d] text-3xl leading-none text-black shadow-[0_16px_45px_rgba(31,191,93,0.35)] transition-shadow duration-200 hover:shadow-[0_18px_55px_rgba(31,191,93,0.45)]"
                  aria-label="Open introduction"
                >
                  +
                </motion.button>
              ) : (
                <motion.div
                  className="flex flex-col gap-6"
                  variants={textContainerVariants}
                  initial="collapsed"
                  animate="expanded"
                >
                  <motion.p variants={textItemVariants} className="max-w-2xl text-[15px] leading-7 text-white/62 sm:text-lg">
                    {INTRO_COPY}
                  </motion.p>

                  <motion.div variants={textItemVariants} className="flex flex-wrap gap-3">
                    <motion.button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        startExit();
                      }}
                      whileHover={{ scale: 1.04, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      className="rounded-full bg-[#0ea5e9] px-5 py-3 text-sm font-semibold text-white transition-shadow duration-200 hover:shadow-[0_12px_28px_rgba(14,165,233,0.24)]"
                    >
                      Visit Website
                    </motion.button>
                    <div className="flex items-center gap-2 sm:gap-2.5">
                      <motion.a
                        href="https://x.com/ayushettyeth"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                        title="Twitter"
                        onClick={(event) => event.stopPropagation()}
                        whileHover={{ scale: 1.06, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.07] text-white/80 transition-colors duration-200 hover:bg-white/[0.12] hover:text-white"
                      >
                        <TwitterIcon className="h-[18px] w-[18px]" />
                      </motion.a>
                      <motion.a
                        href="https://github.com/ayushetty"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        title="GitHub"
                        onClick={(event) => event.stopPropagation()}
                        whileHover={{ scale: 1.06, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.07] text-white/80 transition-colors duration-200 hover:bg-white/[0.12] hover:text-white"
                      >
                        <GithubIcon className="h-[18px] w-[18px]" />
                      </motion.a>
                      <motion.a
                        href="https://www.linkedin.com/in/ayushetty/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        title="LinkedIn"
                        onClick={(event) => event.stopPropagation()}
                        whileHover={{ scale: 1.06, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.07] text-white/80 transition-colors duration-200 hover:bg-white/[0.12] hover:text-white"
                      >
                        <LinkedInIcon className="h-[18px] w-[18px]" />
                      </motion.a>
                      <motion.a
                        href="https://instagram.com/ayushetty.eth"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram"
                        title="Instagram"
                        onClick={(event) => event.stopPropagation()}
                        whileHover={{ scale: 1.06, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.07] text-white/80 transition-colors duration-200 hover:bg-white/[0.12] hover:text-white"
                      >
                        <InstagramIcon className="h-[18px] w-[18px]" />
                      </motion.a>
                      <motion.a
                        href="https://t.me/ayushetty"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Telegram"
                        title="Telegram"
                        onClick={(event) => event.stopPropagation()}
                        whileHover={{ scale: 1.06, y: -1 }}
                        whileTap={{ scale: 0.96 }}
                        className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.07] text-white/80 transition-colors duration-200 hover:bg-white/[0.12] hover:text-white"
                      >
                        <TelegramIcon className="h-[18px] w-[18px]" />
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </LayoutGroup>
  );
}
