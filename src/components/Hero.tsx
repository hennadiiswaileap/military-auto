"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const PARTICLE_COUNT = 18;

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: "circle" | "square" | "triangle";
}

function generateParticles(w: number, h: number): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    size: Math.random() * 40 + 10,
    speedX: (Math.random() - 0.5) * 0.3,
    speedY: (Math.random() - 0.5) * 0.2,
    opacity: Math.random() * 0.12 + 0.03,
    type: (["circle", "square", "triangle"] as const)[Math.floor(Math.random() * 3)],
  }));
}

function ParticleCanvas({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: mouseX, y: mouseY });

  useEffect(() => {
    mouseRef.current = { x: mouseX, y: mouseY };
  }, [mouseX, mouseY]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesRef.current = generateParticles(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isMobile = window.matchMedia("(hover: none)").matches;
      const mx = isMobile ? canvas.width / 2 : mouseRef.current.x;
      const my = isMobile ? canvas.height / 2 : mouseRef.current.y;

      particlesRef.current.forEach((p) => {
        const dx = mx - p.x;
        const dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 500);

        p.x += p.speedX + dx * influence * 0.0008;
        p.y += p.speedY + dy * influence * 0.0008;

        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = canvas.height + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;

        ctx.save();
        ctx.globalAlpha = p.opacity + influence * 0.08;
        ctx.translate(p.x, p.y);

        if (p.type === "circle") {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.strokeStyle = influence > 0.3 ? "#7CB518" : "#2A2A2A";
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (p.type === "square") {
          ctx.rotate(Math.PI / 6);
          ctx.strokeStyle = influence > 0.3 ? "#A4D620" : "#222222";
          ctx.lineWidth = 1;
          ctx.strokeRect(-p.size / 2, -p.size / 2, p.size, p.size);
        } else {
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
          ctx.closePath();
          ctx.strokeStyle = influence > 0.3 ? "#7CB518" : "#1A1A1A";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        ctx.restore();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

const words = ["Підбір", "та", "доставка", "авто", "зі", "США", "під", "ключ"];

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const isMobile = useRef(false);

  useEffect(() => {
    isMobile.current = window.matchMedia("(hover: none)").matches;
    if (isMobile.current) return;
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler, { passive: true });
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToHowItWorks = () => {
    document.querySelector("#how-it-works")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]">
      <ParticleCanvas mouseX={mousePos.x} mouseY={mousePos.y} />

      {/* Radial gradient center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(124,181,24,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2A2A2A] text-xs text-[#A0A0A0] mb-8"
          style={{ background: "rgba(124,181,24,0.06)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#7CB518] animate-pulse" />
          Пригон авто зі США в Україну · 6 років досвіду
        </motion.div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 20 }}
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
            onClick={scrollToContact}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-shimmer px-8 py-4 rounded-xl text-base font-bold text-white border-none cursor-pointer"
            style={{ background: "linear-gradient(135deg, #7CB518, #A4D620)" }}
          >
            Розрахувати вартість
          </motion.button>
          <motion.button
            onClick={scrollToHowItWorks}
            whileHover={{ scale: 1.04, borderColor: "#7CB518" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-xl text-base font-semibold text-white border border-[#2A2A2A] bg-transparent cursor-pointer transition-colors duration-200"
          >
            Як це працює
          </motion.button>
        </motion.div>

        {/* Stats row */}
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
              <div className="text-2xl font-bold text-gradient-green">{stat.value}</div>
              <div className="text-sm text-[#A0A0A0] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <div className="w-px h-12 bg-gradient-to-b from-[#7CB518] to-transparent" />
        <span className="text-[#A0A0A0] text-xs">scroll</span>
      </motion.div>
    </section>
  );
}
