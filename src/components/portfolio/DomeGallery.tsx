"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useGesture } from "@use-gesture/react";

export type DomeGalleryImage = {
  src: string;
  alt?: string;
  label?: string;
  id?: string;
};

type DomeGalleryProps = {
  images?: DomeGalleryImage[];
  fit?: number;
  fitBasis?: "auto" | "min" | "max" | "width" | "height";
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
};

type DomeTile = {
  id: string;
  src: string;
  alt: string;
  label: string;
};

type LayoutItem = {
  key: string;
  tile: DomeTile;
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
};

const DEFAULT_IMAGES: DomeTile[] = [
  {
    id: "default-01",
    src: "https://images.unsplash.com/photo-1755331039789-7e5680e26e8f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Abstract art",
    label: "Abstract art",
  },
  {
    id: "default-02",
    src: "https://images.unsplash.com/photo-1755569309049-98410b94f66d?q=80&w=772&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Modern sculpture",
    label: "Modern sculpture",
  },
  {
    id: "default-03",
    src: "https://images.unsplash.com/photo-1755497595318-7e5e3523854f?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Digital artwork",
    label: "Digital artwork",
  },
  {
    id: "default-04",
    src: "https://images.unsplash.com/photo-1755353985163-c2a0fe5ac3d8?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Contemporary art",
    label: "Contemporary art",
  },
  {
    id: "default-05",
    src: "https://images.unsplash.com/photo-1745965976680-d00be7dc0377?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Geometric pattern",
    label: "Geometric pattern",
  },
  {
    id: "default-06",
    src: "https://images.unsplash.com/photo-1752588975228-21f44630bb3c?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Textured surface",
    label: "Textured surface",
  },
  {
    id: "default-07",
    src: "https://pbs.twimg.com/media/Gyla7NnXMAAXSo_?format=jpg&name=large",
    alt: "Social media image",
    label: "Social media image",
  },
];

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const normalizeAngle = (degrees: number) => ((degrees % 360) + 360) % 360;
const wrapAngleSigned = (degrees: number) => {
  const normalized = (((degrees + 180) % 360) + 360) % 360;
  return normalized - 180;
};
const AUTO_SPIN_DEG_PER_SECOND = 2.8;
const getDataNumber = (element: HTMLElement, name: string, fallback: number) => {
  const attr = element.dataset[name] ?? element.getAttribute(`data-${name}`);
  const numberValue = attr == null ? Number.NaN : Number.parseFloat(attr);
  return Number.isFinite(numberValue) ? numberValue : fallback;
};

function normalizeImages(pool: DomeGalleryImage[] | DomeTile[]): DomeTile[] {
  return pool.map((image, index) => {
    const fallbackLabel = `Gallery ${String(index + 1).padStart(2, "0")}`;
    return {
      id: image.id ?? `gallery-${String(index + 1).padStart(2, "0")}`,
      src: image.src,
      alt: image.alt ?? image.label ?? fallbackLabel,
      label: image.label ?? image.alt ?? fallbackLabel,
    };
  });
}

function buildItems(pool: DomeTile[], segmentCount: number): LayoutItem[] {
  const normalizedSegments = Math.max(1, Math.floor(segmentCount));
  const xCols = Array.from({ length: normalizedSegments }, (_, index) => -37 + index * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, columnIndex) => {
    const ys = columnIndex % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map((coord, index) => ({
      key: `empty-${index}`,
      tile: {
        id: `empty-${index}`,
        src: "",
        alt: "",
        label: "",
      },
      ...coord,
    }));
  }

  if (pool.length > totalSlots) {
    console.warn(
      `[DomeGallery] Provided image count (${pool.length}) exceeds available tiles (${totalSlots}). Some images will not be shown.`,
    );
  }

  const usedImages = Array.from({ length: totalSlots }, (_, index) => pool[index % pool.length]);

  for (let index = 1; index < usedImages.length; index += 1) {
    if (usedImages[index].src === usedImages[index - 1].src) {
      for (let swapIndex = index + 1; swapIndex < usedImages.length; swapIndex += 1) {
        if (usedImages[swapIndex].src !== usedImages[index].src) {
          const temp = usedImages[index];
          usedImages[index] = usedImages[swapIndex];
          usedImages[swapIndex] = temp;
          break;
        }
      }
    }
  }

  return coords.map((coord, index) => ({
    key: `${usedImages[index].id}-${index}`,
    tile: usedImages[index],
    ...coord,
  }));
}

function computeItemBaseRotation(offsetX: number, offsetY: number, sizeX: number, sizeY: number, segmentCount: number) {
  const unit = 360 / segmentCount / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

export default function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.5,
  fitBasis = "auto",
  minRadius = 300,
  maxRadius = Infinity,
  padFactor = 0.25,
  overlayBlurColor = "#111112",
  maxVerticalRotationDeg = 0,
  dragSensitivity = 20,
  enlargeTransitionMs = 300,
  segments = 34,
  dragDampening = 2,
  openedImageWidth = "250px",
  openedImageHeight = "350px",
  imageBorderRadius = "30px",
  openedImageBorderRadius = "30px",
  grayscale = true,
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const sphereRef = useRef<HTMLDivElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const viewerRef = useRef<HTMLDivElement | null>(null);
  const scrimRef = useRef<HTMLDivElement | null>(null);
  const focusedElRef = useRef<HTMLDivElement | null>(null);
  const originalTilePositionRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const autoSpinRAF = useRef<number | null>(null);
  const autoSpinLastTimestampRef = useRef<number | null>(null);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);

  const scrollLockedRef = useRef(false);
  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    document.body.classList.add("dg-scroll-lock");
  }, []);
  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute("data-enlarging") === "true") return;
    scrollLockedRef.current = false;
    document.body.classList.remove("dg-scroll-lock");
  }, []);

  const normalizedImages = useMemo(() => {
    const base = images.length > 0 ? images : DEFAULT_IMAGES;
    return normalizeImages(base);
  }, [images]);

  const items = useMemo(() => buildItems(normalizedImages, segments), [normalizedImages, segments]);

  const [dragging, setDragging] = useState(false);
  const verticalLimit = Math.max(0, maxVerticalRotationDeg);
  const [rotation, setRotation] = useState(() => ({
    x: verticalLimit === 0 ? 0 : -Math.min(10, verticalLimit * 0.6),
    y: -18,
  }));

  useEffect(() => {
    rotationRef.current = rotation;
  }, [rotation]);

  const applyTransform = useCallback((xDeg: number, yDeg: number) => {
    const sphere = sphereRef.current;
    if (sphere) {
      sphere.style.transform = `translateY(var(--dome-offset-y)) translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  }, []);

  const lockedRadiusRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const resizeObserver = new ResizeObserver((entries) => {
      const contentRect = entries[0].contentRect;
      const width = Math.max(1, contentRect.width);
      const height = Math.max(1, contentRect.height);
      const minDim = Math.min(width, height);
      const maxDim = Math.max(width, height);
      const aspect = width / height;

      let basis: number;
      switch (fitBasis) {
        case "min":
          basis = minDim;
          break;
        case "max":
          basis = maxDim;
          break;
        case "width":
          basis = width;
          break;
        case "height":
          basis = height;
          break;
        default:
          // On wide displays, width-based sizing over-zooms the dome.
          basis = minDim;
      }

      let radius = basis * fit;
      const heightGuard = height * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty("--radius", `${lockedRadiusRef.current}px`);
      root.style.setProperty("--viewer-pad", `${viewerPad}px`);
      root.style.setProperty("--overlay-blur-color", overlayBlurColor);
      root.style.setProperty("--tile-radius", imageBorderRadius);
      root.style.setProperty("--enlarge-radius", openedImageBorderRadius);
      root.style.setProperty("--image-filter", grayscale ? "grayscale(1)" : "none");
      applyTransform(rotationRef.current.x, rotationRef.current.y);

      const enlargedOverlay = viewerRef.current?.querySelector<HTMLElement>(".enlarge");
      if (enlargedOverlay && frameRef.current && mainRef.current) {
        const frameRect = frameRef.current.getBoundingClientRect();
        const mainRect = mainRef.current.getBoundingClientRect();
        const hasCustomSize = openedImageWidth && openedImageHeight;

        if (hasCustomSize) {
          const tempDiv = document.createElement("div");
          tempDiv.style.cssText = `position: absolute; width: ${openedImageWidth}; height: ${openedImageHeight}; visibility: hidden;`;
          document.body.appendChild(tempDiv);
          const tempRect = tempDiv.getBoundingClientRect();
          document.body.removeChild(tempDiv);

          const centeredLeft = frameRect.left - mainRect.left + (frameRect.width - tempRect.width) / 2;
          const centeredTop = frameRect.top - mainRect.top + (frameRect.height - tempRect.height) / 2;

          enlargedOverlay.style.left = `${centeredLeft}px`;
          enlargedOverlay.style.top = `${centeredTop}px`;
        } else {
          enlargedOverlay.style.left = `${frameRect.left - mainRect.left}px`;
          enlargedOverlay.style.top = `${frameRect.top - mainRect.top}px`;
          enlargedOverlay.style.width = `${frameRect.width}px`;
          enlargedOverlay.style.height = `${frameRect.height}px`;
        }
      }
    });

    resizeObserver.observe(root);
    return () => resizeObserver.disconnect();
  }, [
    applyTransform,
    fit,
    fitBasis,
    grayscale,
    imageBorderRadius,
    maxRadius,
    minRadius,
    openedImageBorderRadius,
    openedImageHeight,
    openedImageWidth,
    overlayBlurColor,
    padFactor,
  ]);

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, [applyTransform]);

  useEffect(() => {
    const tick = (timestamp: number) => {
      const isPaused =
        draggingRef.current ||
        openingRef.current ||
        focusedElRef.current != null ||
        rootRef.current?.getAttribute("data-enlarging") === "true" ||
        inertiaRAF.current !== null;

      if (isPaused) {
        autoSpinLastTimestampRef.current = null;
        autoSpinRAF.current = requestAnimationFrame(tick);
        return;
      }

      const previousTimestamp = autoSpinLastTimestampRef.current;
      autoSpinLastTimestampRef.current = timestamp;

      if (previousTimestamp != null) {
        const deltaMs = timestamp - previousTimestamp;
        const nextY = wrapAngleSigned(rotationRef.current.y + (AUTO_SPIN_DEG_PER_SECOND * deltaMs) / 1000);
        if (rotationRef.current.y !== nextY) {
          rotationRef.current = { x: rotationRef.current.x, y: nextY };
          applyTransform(rotationRef.current.x, nextY);
        }
      }

      autoSpinRAF.current = requestAnimationFrame(tick);
    };

    autoSpinRAF.current = requestAnimationFrame(tick);

    return () => {
      if (autoSpinRAF.current) {
        cancelAnimationFrame(autoSpinRAF.current);
      }
      autoSpinRAF.current = null;
      autoSpinLastTimestampRef.current = null;
    };
  }, [applyTransform]);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      const maxVelocity = 1.4;
      let velocityX = clamp(vx, -maxVelocity, maxVelocity) * 80;
      let velocityY = clamp(vy, -maxVelocity, maxVelocity) * 80;
      let frames = 0;
      const dampening = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * dampening;
      const stopThreshold = 0.015 - 0.01 * dampening;
      const maxFrames = Math.round(90 + 270 * dampening);

      const step = () => {
        velocityX *= frictionMul;
        velocityY *= frictionMul;
        if (Math.abs(velocityX) < stopThreshold && Math.abs(velocityY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(rotationRef.current.x - velocityY / 200, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(rotationRef.current.y + velocityX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };

      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [applyTransform, dragDampening, maxVerticalRotationDeg, stopInertia],
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();
        const dragEvent = event as PointerEvent;
        draggingRef.current = true;
        setDragging(true);
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = { x: dragEvent.clientX, y: dragEvent.clientY };
      },
      onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement }) => {
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
        const dragEvent = event as PointerEvent;
        const dxTotal = dragEvent.clientX - startPosRef.current.x;
        const dyTotal = dragEvent.clientY - startPosRef.current.y;
        if (!movedRef.current) {
          const distanceSquared = dxTotal * dxTotal + dyTotal * dyTotal;
          if (distanceSquared > 16) movedRef.current = true;
        }
        const nextX = clamp(startRotRef.current.x - dyTotal / dragSensitivity, -maxVerticalRotationDeg, maxVerticalRotationDeg);
        const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity);
        if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }
        if (last) {
          draggingRef.current = false;
          setDragging(false);
          let [velocityMagnitudeX, velocityMagnitudeY] = velocity;
          const [directionX, directionY] = direction;
          let vx = velocityMagnitudeX * directionX;
          let vy = velocityMagnitudeY * directionY;
          if (Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [movementX, movementY] = movement;
            vx = clamp((movementX / dragSensitivity) * 0.02, -1.2, 1.2);
            vy = clamp((movementY / dragSensitivity) * 0.02, -1.2, 1.2);
          }
          if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) startInertia(vx, vy);
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
        }
      },
    },
    { target: mainRef, eventOptions: { passive: true } },
  );

  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;

    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return;
      const focusedElement = focusedElRef.current;
      if (!focusedElement) return;
      const parent = focusedElement.parentElement as HTMLDivElement | null;
      const overlay = viewerRef.current?.querySelector<HTMLElement>(".enlarge");
      if (!parent || !overlay) return;
      const referenceTile = parent.querySelector<HTMLElement>(".item__image--reference");
      const originalPos = originalTilePositionRef.current;
      if (!originalPos) {
        overlay.remove();
        referenceTile?.remove();
        parent.style.setProperty("--rot-y-delta", "0deg");
        parent.style.setProperty("--rot-x-delta", "0deg");
        focusedElement.style.visibility = "";
        focusedElement.style.zIndex = "0";
        focusedElRef.current = null;
        rootRef.current?.removeAttribute("data-enlarging");
        openingRef.current = false;
        unlockScroll();
        return;
      }
      const currentRect = overlay.getBoundingClientRect();
      const root = rootRef.current;
      if (!root) return;
      const rootRect = root.getBoundingClientRect();
      const originalPosRelativeToRoot = {
        left: originalPos.left - rootRect.left,
        top: originalPos.top - rootRect.top,
        width: originalPos.width,
        height: originalPos.height,
      };
      const overlayRelativeToRoot = {
        left: currentRect.left - rootRect.left,
        top: currentRect.top - rootRect.top,
        width: currentRect.width,
        height: currentRect.height,
      };
      const animatingOverlay = document.createElement("div");
      animatingOverlay.className = "enlarge-closing";
      animatingOverlay.style.cssText = `position:absolute;left:${overlayRelativeToRoot.left}px;top:${overlayRelativeToRoot.top}px;width:${overlayRelativeToRoot.width}px;height:${overlayRelativeToRoot.height}px;z-index:9999;border-radius: var(--enlarge-radius, 32px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.35);transition:all ${enlargeTransitionMs}ms ease-out;pointer-events:none;margin:0;transform:none;`;
      const originalImage = overlay.querySelector<HTMLImageElement>("img");
      if (originalImage) {
        const image = originalImage.cloneNode() as HTMLImageElement;
        image.style.cssText = "width:100%;height:100%;object-fit:cover;";
        animatingOverlay.appendChild(image);
      }
      overlay.remove();
      root.appendChild(animatingOverlay);
      void animatingOverlay.getBoundingClientRect();
      requestAnimationFrame(() => {
        animatingOverlay.style.left = `${originalPosRelativeToRoot.left}px`;
        animatingOverlay.style.top = `${originalPosRelativeToRoot.top}px`;
        animatingOverlay.style.width = `${originalPosRelativeToRoot.width}px`;
        animatingOverlay.style.height = `${originalPosRelativeToRoot.height}px`;
        animatingOverlay.style.opacity = "0";
      });
      const cleanup = () => {
        animatingOverlay.remove();
        originalTilePositionRef.current = null;
        referenceTile?.remove();
        parent.style.transition = "none";
        focusedElement.style.transition = "none";
        parent.style.setProperty("--rot-y-delta", "0deg");
        parent.style.setProperty("--rot-x-delta", "0deg");
        requestAnimationFrame(() => {
          focusedElement.style.visibility = "";
          focusedElement.style.opacity = "0";
          focusedElement.style.zIndex = "0";
          focusedElRef.current = null;
          root.removeAttribute("data-enlarging");
          requestAnimationFrame(() => {
            parent.style.transition = "";
            focusedElement.style.transition = "opacity 300ms ease-out";
            requestAnimationFrame(() => {
              focusedElement.style.opacity = "1";
              setTimeout(() => {
                focusedElement.style.transition = "";
                focusedElement.style.opacity = "";
                openingRef.current = false;
                if (!draggingRef.current && rootRef.current?.getAttribute("data-enlarging") !== "true") {
                  document.body.classList.remove("dg-scroll-lock");
                }
              }, 300);
            });
          });
        });
      };
      animatingOverlay.addEventListener("transitionend", cleanup, { once: true });
    };

    scrim.addEventListener("click", close);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      scrim.removeEventListener("click", close);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [enlargeTransitionMs, unlockScroll]);

  const openItemFromElement = useCallback(
    (element: HTMLDivElement) => {
      if (openingRef.current) return;
      openingRef.current = true;
      openStartedAtRef.current = performance.now();
      lockScroll();
      const parent = element.parentElement as HTMLDivElement | null;
      if (!parent) {
        openingRef.current = false;
        unlockScroll();
        return;
      }
      focusedElRef.current = element;
      element.setAttribute("data-focused", "true");
      const offsetX = getDataNumber(parent, "offsetX", 0);
      const offsetY = getDataNumber(parent, "offsetY", 0);
      const sizeX = getDataNumber(parent, "sizeX", 2);
      const sizeY = getDataNumber(parent, "sizeY", 2);
      const parentRotation = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);
      const parentY = normalizeAngle(parentRotation.rotateY);
      const globalY = normalizeAngle(rotationRef.current.y);
      let rotY = -(parentY + globalY) % 360;
      if (rotY < -180) rotY += 360;
      const rotX = -parentRotation.rotateX - rotationRef.current.x;
      parent.style.setProperty("--rot-y-delta", `${rotY}deg`);
      parent.style.setProperty("--rot-x-delta", `${rotX}deg`);
      const refDiv = document.createElement("div");
      refDiv.className = "item__image item__image--reference";
      refDiv.style.opacity = "0";
      refDiv.style.transform = `rotateX(${-parentRotation.rotateX}deg) rotateY(${-parentRotation.rotateY}deg)`;
      parent.appendChild(refDiv);

      void refDiv.offsetHeight;

      const tileRect = refDiv.getBoundingClientRect();
      const mainRect = mainRef.current?.getBoundingClientRect();
      const frameRect = frameRef.current?.getBoundingClientRect();

      if (!mainRect || !frameRect || tileRect.width <= 0 || tileRect.height <= 0) {
        openingRef.current = false;
        focusedElRef.current = null;
        parent.removeChild(refDiv);
        unlockScroll();
        return;
      }

      originalTilePositionRef.current = { left: tileRect.left, top: tileRect.top, width: tileRect.width, height: tileRect.height };
      element.style.visibility = "hidden";
      element.style.zIndex = "0";
      const overlay = document.createElement("div");
      overlay.className = "enlarge";
      overlay.style.position = "absolute";
      overlay.style.left = `${frameRect.left - mainRect.left}px`;
      overlay.style.top = `${frameRect.top - mainRect.top}px`;
      overlay.style.width = `${frameRect.width}px`;
      overlay.style.height = `${frameRect.height}px`;
      overlay.style.opacity = "0";
      overlay.style.zIndex = "30";
      overlay.style.willChange = "transform, opacity";
      overlay.style.transformOrigin = "top left";
      overlay.style.transition = `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`;
      const rawSrc = parent.dataset.src || element.querySelector<HTMLImageElement>("img")?.src || "";
      const image = document.createElement("img");
      image.src = rawSrc;
      overlay.appendChild(image);
      viewerRef.current?.appendChild(overlay);
      const tx0 = tileRect.left - frameRect.left;
      const ty0 = tileRect.top - frameRect.top;
      const sx0 = tileRect.width / frameRect.width;
      const sy0 = tileRect.height / frameRect.height;

      const validSx0 = Number.isFinite(sx0) && sx0 > 0 ? sx0 : 1;
      const validSy0 = Number.isFinite(sy0) && sy0 > 0 ? sy0 : 1;

      overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${validSx0}, ${validSy0})`;

      setTimeout(() => {
        if (!overlay.parentElement) return;
        overlay.style.opacity = "1";
        overlay.style.transform = "translate(0px, 0px) scale(1, 1)";
        rootRef.current?.setAttribute("data-enlarging", "true");
      }, 16);

      const wantsResize = openedImageWidth || openedImageHeight;
      if (wantsResize) {
        const onFirstEnd = (event: TransitionEvent) => {
          if (event.propertyName !== "transform") return;
          overlay.removeEventListener("transitionend", onFirstEnd);
          const previousTransition = overlay.style.transition;
          overlay.style.transition = "none";
          const tempWidth = openedImageWidth || `${frameRect.width}px`;
          const tempHeight = openedImageHeight || `${frameRect.height}px`;
          overlay.style.width = tempWidth;
          overlay.style.height = tempHeight;
          const newRect = overlay.getBoundingClientRect();
          overlay.style.width = `${frameRect.width}px`;
          overlay.style.height = `${frameRect.height}px`;
          void overlay.offsetWidth;
          overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;
          const centeredLeft = frameRect.left - mainRect.left + (frameRect.width - newRect.width) / 2;
          const centeredTop = frameRect.top - mainRect.top + (frameRect.height - newRect.height) / 2;
          requestAnimationFrame(() => {
            overlay.style.left = `${centeredLeft}px`;
            overlay.style.top = `${centeredTop}px`;
            overlay.style.width = tempWidth;
            overlay.style.height = tempHeight;
          });
          const cleanupSecond = () => {
            overlay.removeEventListener("transitionend", cleanupSecond);
            overlay.style.transition = previousTransition;
          };
          overlay.addEventListener("transitionend", cleanupSecond, { once: true });
        };
        overlay.addEventListener("transitionend", onFirstEnd);
      }
    },
    [enlargeTransitionMs, lockScroll, openedImageHeight, openedImageWidth, segments, unlockScroll],
  );

  const onTileClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      if (draggingRef.current) return;
      if (movedRef.current) return;
      if (performance.now() - lastDragEndAt.current < 80) return;
      if (openingRef.current) return;
      openItemFromElement(event.currentTarget);
    },
    [openItemFromElement],
  );

  const onTilePointerUp = useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "touch") return;
      if (draggingRef.current) return;
      if (movedRef.current) return;
      if (performance.now() - lastDragEndAt.current < 80) return;
      if (openingRef.current) return;
      openItemFromElement(event.currentTarget);
    },
    [openItemFromElement],
  );

  useEffect(() => {
    return () => {
      document.body.classList.remove("dg-scroll-lock");
    };
  }, []);

    return (
      <div
      ref={rootRef}
      className="sphere-root"
      style={{
        ["--segments-x" as string]: segments,
        ["--segments-y" as string]: segments,
        ["--overlay-blur-color" as string]: overlayBlurColor,
        ["--tile-radius" as string]: imageBorderRadius,
        ["--enlarge-radius" as string]: openedImageBorderRadius,
        ["--image-filter" as string]: grayscale ? "grayscale(1)" : "none",
      } as CSSProperties}
      >
        <main ref={mainRef} className="grid-inner">
          <div ref={sphereRef} className="sphere">
            {items.map((item, index) => (
              <div
                key={`${item.tile.id}-${index}`}
                className="item"
                data-src={item.tile.src}
                data-offset-x={item.x}
                data-offset-y={item.y}
                data-size-x={item.sizeX}
                data-size-y={item.sizeY}
                style={{
                  ["--offset-x" as string]: item.x,
                  ["--offset-y" as string]: item.y,
                  ["--item-size-x" as string]: item.sizeX,
                  ["--item-size-y" as string]: item.sizeY,
                } as CSSProperties}
              >
                <div
                  className="item__image"
                  role="button"
                  tabIndex={0}
                  aria-label={item.tile.label || "Open image"}
                  onClick={onTileClick}
                  onPointerUp={onTilePointerUp}
                >
                  <img src={item.tile.src} draggable={false} alt={item.tile.alt} />
                </div>
              </div>
            ))}
          </div>

        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />

        <div className="viewer" ref={viewerRef}>
          <div ref={scrimRef} className="scrim" />
          <div ref={frameRef} className="frame" />
        </div>
      </main>
    </div>
  );
}
