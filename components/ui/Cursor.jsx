"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";

/**
 * Global Apple Liquid Glass Cursor Component
 * 
 * - Full coverage across all layout components and page sections
 * - Liquid glass refraction with top specular highlight & bottom shadow
 * - High-speed, buttery-smooth spring physics
 * - Snaps magnetically to all interactive elements (buttons, links, pills, cards)
 * - Safe for mobile/touch screens (disabled on touch)
 * - Accessible (respects prefers-reduced-motion)
 */
export default function Cursor({ targetRef, mode = "replace" }) {
  const shouldReduceMotion = useReducedMotion();
  const [isPointerFine, setIsPointerFine] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isCaught, setIsCaught] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [borderRadius, setBorderRadius] = useState("9999px");

  // Motion values
  const targetX = useMotionValue(-100);
  const targetY = useMotionValue(-100);
  const targetWidth = useMotionValue(24);
  const targetHeight = useMotionValue(24);

  // High-speed, buttery-smooth spring physics
  const posSpring = { damping: 28, stiffness: 1250, mass: 0.035 };
  const sizeSpring = { damping: 24, stiffness: 950, mass: 0.035 };

  const cursorX = useSpring(targetX, posSpring);
  const cursorY = useSpring(targetY, posSpring);
  const cursorWidth = useSpring(targetWidth, sizeSpring);
  const cursorHeight = useSpring(targetHeight, sizeSpring);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsPointerFine(mediaQuery.matches);

    const handleMediaChange = (e) => setIsPointerFine(e.matches);
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    if (!isPointerFine || shouldReduceMotion) return;

    const scopedEl = targetRef?.current;
    let styleTag = null;
    let lastInteractiveEl = null;
    let lastRect = null;

    if (mode === "replace") {
      styleTag = document.createElement("style");
      styleTag.id = "global-liquid-cursor-style";
      if (scopedEl) {
        scopedEl.style.cursor = "none";
        styleTag.textContent = `
          @media (pointer: fine) {
            #hero, #hero *, #hero *::before, #hero *::after {
              cursor: none !important;
            }
          }
        `;
      } else {
        styleTag.textContent = `
          @media (pointer: fine) {
            *, *::before, *::after {
              cursor: none !important;
            }
            input, textarea, select, [contenteditable="true"] {
              cursor: text !important;
            }
          }
        `;
      }
      document.head.appendChild(styleTag);
    }

    const handlePointerMove = (e) => {
      // If scoped to a specific element, check its bounding rect
      if (scopedEl) {
        const rect = scopedEl.getBoundingClientRect();
        const inBounds =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;

        if (!inBounds) {
          setIsVisible(false);
          setIsCaught(false);
          lastInteractiveEl = null;
          lastRect = null;
          return;
        }
      } else {
        // Global bounds check
        const inWindow =
          e.clientX >= 0 &&
          e.clientX <= window.innerWidth &&
          e.clientY >= 0 &&
          e.clientY <= window.innerHeight;

        if (!inWindow) {
          setIsVisible(false);
          setIsCaught(false);
          lastInteractiveEl = null;
          lastRect = null;
          return;
        }
      }

      setIsVisible(true);

      // Check for interactive button, link, or clickable element
      const interactiveEl = e.target.closest(
        "a, button, [role='button'], .cursor-pointer, input[type='submit'], input[type='button']"
      );

      if (interactiveEl && (!scopedEl || scopedEl.contains(interactiveEl))) {
        // Cache computed styles & rect to prevent layout thrashing on high-frequency events
        if (interactiveEl !== lastInteractiveEl) {
          lastInteractiveEl = interactiveEl;
          lastRect = interactiveEl.getBoundingClientRect();
          const radius = window.getComputedStyle(interactiveEl).borderRadius;
          setBorderRadius(radius === "0px" ? "10px" : radius);
        }

        const elRect = lastRect || interactiveEl.getBoundingClientRect();
        // Dynamic magnetic pull: Snaps to element center with subtle reactive pointer influence
        const centerX = elRect.left + elRect.width / 2;
        const centerY = elRect.top + elRect.height / 2;
        const magneticX = centerX + (e.clientX - centerX) * 0.12;
        const magneticY = centerY + (e.clientY - centerY) * 0.12;

        targetX.set(magneticX);
        targetY.set(magneticY);
        targetWidth.set(elRect.width + 6);
        targetHeight.set(elRect.height + 4);
        setIsCaught(true);
      } else {
        if (lastInteractiveEl !== null) {
          lastInteractiveEl = null;
          lastRect = null;
          setBorderRadius("9999px");
        }
        targetX.set(e.clientX);
        targetY.set(e.clientY);
        targetWidth.set(24);
        targetHeight.set(24);
        setIsCaught(false);
      }
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
      setIsCaught(false);
      setIsPressed(false);
      lastInteractiveEl = null;
      lastRect = null;
    };

    const handleScrollOrResize = () => {
      lastInteractiveEl = null;
      lastRect = null;
    };

    const handlePointerDown = () => setIsPressed(true);
    const handlePointerUp = () => setIsPressed(false);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });
    document.documentElement.addEventListener("mouseleave", handlePointerLeave);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      if (scopedEl && mode === "replace") {
        scopedEl.style.cursor = "";
      }
      if (styleTag) {
        styleTag.remove();
      }
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
      document.documentElement.removeEventListener("mouseleave", handlePointerLeave);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isPointerFine, shouldReduceMotion, targetRef, mode, targetX, targetY, targetWidth, targetHeight]);

  if (!isPointerFine || shouldReduceMotion) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
          {/* Apple Liquid Glass Cursor Shell */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: 1,
              scale: isPressed ? (isCaught ? 0.96 : 0.86) : 1,
              borderRadius,
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.08 }}
            style={{
              x: cursorX,
              y: cursorY,
              width: cursorWidth,
              height: cursorHeight,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className={`absolute flex items-center justify-center will-change-transform transition-[background,border-color,box-shadow] duration-75 ${
              isCaught
                ? "bg-gradient-to-b from-white/[0.22] via-white/[0.08] to-transparent dark:from-white/[0.16] dark:via-white/[0.04] dark:to-transparent border border-white/35 dark:border-white/20 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.65),inset_0_-1px_1px_rgba(0,0,0,0.08),0_4px_16px_rgba(0,0,0,0.08)]"
                : "bg-gradient-to-b from-white/[0.38] via-white/[0.14] to-white/[0.04] dark:from-white/[0.25] dark:via-white/[0.08] dark:to-transparent border border-white/60 dark:border-white/25 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.85),inset_0_-1px_1px_rgba(0,0,0,0.12),0_3px_12px_rgba(0,0,0,0.12)]"
            }`}
          >
            {/* Liquid Core / Precision Center Dot */}
            <motion.div
              animate={{
                opacity: isCaught ? 0 : 1,
                scale: isCaught ? 0 : isPressed ? 0.7 : 1,
              }}
              transition={{ duration: 0.08 }}
              className="w-1.5 h-1.5 rounded-full bg-neutral-900/90 dark:bg-white shadow-[0_1px_2px_rgba(0,0,0,0.3)]"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
