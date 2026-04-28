"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const el = starRef.current;
    if (!el) return;
    el.style.display = "block";
    document.documentElement.style.cursor = "none";

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      if (el) {
        el.style.left = currentX + "px";
        el.style.top  = currentY + "px";
      }
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <div
      ref={starRef}
      className="pointer-events-none fixed z-[9999] hidden"
      style={{
        width: "28px",
        height: "28px",
        transform: "translate(-50%, -50%)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width="28"
        height="28"
        style={{ filter: "drop-shadow(0 0 5px rgba(124,181,24,0.7))" }}
      >
        <defs>
          <linearGradient id="starGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stopColor="#7CB518" />
            <stop offset="100%" stopColor="#A4D620" />
          </linearGradient>
        </defs>
        <polygon
          points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
          fill="url(#starGrad)"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="0.5"
        />
      </svg>
    </div>
  );
}
