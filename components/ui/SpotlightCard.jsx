"use client";

import { useRef } from "react";

const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.25)",
}) => {
  const divRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty("--mouse-x", `${x}px`);
    divRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      style={{
        "--spotlight-color": spotlightColor,
      }}
      className={`group/spotlight relative overflow-hidden [clip-path:inset(0_round_inherit)] ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 group-hover/spotlight:opacity-70 group-focus-within/spotlight:opacity-70 transition-opacity duration-500 ease-out z-[1]"
        style={{
          background:
            "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), var(--spotlight-color), transparent 80%)",
        }}
      />
      <div className="relative z-10 w-full h-full rounded-[inherit]">
        {children}
      </div>
    </div>
  );
};

export default SpotlightCard;
