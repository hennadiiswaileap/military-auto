"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Eye, Truck, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Досвід",
    desc: "6 років на міжнародному ринку, понад 1000 авто доставлено в Європу",
  },
  {
    icon: Eye,
    title: "Прозорість",
    desc: "Чіткий розрахунок вартості без прихованих платежів. Гарантія ціни на автомобіль та логістику",
  },
  {
    icon: Truck,
    title: "Надійність",
    desc: "Налагоджена логістика та перевірені партнери. Працюємо з Copart, IAAI, Manheim",
  },
  {
    icon: ShieldCheck,
    title: "Безпека",
    desc: "Повна перевірка історії авто через CarFax. Тільки автомобілі з прозорою історією",
  },
];

function SpotlightCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const Icon = feature.icon;

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    card.style.setProperty("--x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.97 }}
      className="spotlight-card rounded-2xl p-6 md:p-8 cursor-default transition-all duration-300"
      style={{
        background: "#111111",
        border: `1px solid ${hovered ? "rgba(124,181,24,0.25)" : "#2A2A2A"}`,
        boxShadow: hovered ? "0 0 32px rgba(124,181,24,0.1)" : "none",
        transform: `translateY(${hovered ? -4 : 0}px)`,
      }}
    >
      {/* Spotlight gradient (mouse-position aware) */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(350px circle at ${spot.x}px ${spot.y}px, rgba(124,181,24,0.12), transparent 65%)`,
            zIndex: 0,
          }}
        />
      )}

      <div className="relative z-10">
        <motion.div
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.2 }}
          className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors duration-200"
          style={{
            background: hovered ? "rgba(124,181,24,0.14)" : "rgba(124,181,24,0.07)",
          }}
        >
          <Icon size={22} style={{ color: hovered ? "#A4D620" : "#7CB518" }} />
        </motion.div>
        <h3 className="text-lg font-semibold text-white mb-2 font-[family-name:var(--font-heading)]">
          {feature.title}
        </h3>
        <p className="text-[#A0A0A0] text-sm leading-relaxed">{feature.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="переваги" className="py-20 md:py-28 bg-[#0A0A0A] steel-texture" ref={ref}>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-widest text-[#7CB518] uppercase mb-3 block">
            Чому Military Auto
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-heading)]">
            Переваги роботи з нами
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((f, i) => (
            <SpotlightCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
