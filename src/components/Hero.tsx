"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const words = ["Підбір", "та", "доставка", "авто", "зі", "США", "під", "ключ"];

function DotGrid({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base dot grid */}
      <div
        className="absolute inset-0 dot-grid"
        style={{ opacity: 0.5 }}
      />
      {/* Mouse-reactive radial mask that reveals dots brighter */}
      <div
        className="absolute inset-0 pointer-events-none transition-none"
        style={{
          background: `radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(124,181,24,0.08) 0%, transparent 65%)`,
        }}
      />
      {/* Green center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(124,181,24,0.055) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isMobileRef = useRef(false);

  useEffect(() => {
    isMobileRef.current = window.matchMedia("(hover: none)").matches;
    if (isMobileRef.current) return;
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A] steel-texture">
      <DotGrid mouseX={mousePos.x} mouseY={mousePos.y} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2A2A2A] text-xs text-[#A0A0A0] mb-8"
          style={{ background: "rgba(124,181,24,0.05)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#7CB518] animate-pulse" />
          Пригон авто зі США в Україну · 6 років досвіду
        </motion.div>

        {/* H1 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 font-[family-name:var(--font-heading)]">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.45 }}
              className="inline-block mr-3 last:mr-0"
            >
              {word === "США" ? (
                <span className="text-gradient-green">{word}</span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.5 }}
          className="text-[#A0A0A0] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Підбираємо, викуповуємо та доставляємо авто зі США.{" "}
          <span className="text-white font-medium">Економія до 20%</span> порівняно з
          локальним ринком. 6 років досвіду на міжнародному ринку.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={() => scrollTo("#контакти")}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-shimmer px-8 py-4 rounded-full text-base font-bold text-white border-none cursor-pointer font-[family-name:var(--font-body)]"
            style={{ background: "linear-gradient(135deg, #7CB518, #A4D620)" }}
          >
            Розрахувати вартість
          </motion.button>
          <motion.button
            onClick={() => scrollTo("#як-ми-працюємо")}
            whileHover={{ scale: 1.04, borderColor: "#7CB518" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full text-base font-semibold text-white border border-[#2A2A2A] bg-transparent cursor-pointer transition-colors duration-200 font-[family-name:var(--font-body)]"
          >
            Як це працює
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-8 mt-16 pt-10 border-t border-[#2A2A2A]"
        >
          {[
            { value: "1000+", label: "авто доставлено" },
            { value: "6 років", label: "на ринку" },
            { value: "20%", label: "середня економія" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-gradient-green font-[family-name:var(--font-heading)]">
                {stat.value}
              </div>
              <div className="text-sm text-[#A0A0A0] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
