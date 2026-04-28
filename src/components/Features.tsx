"use client";

import { useRef, useState } from "react";
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

interface TiltCardProps {
  feature: (typeof features)[0];
  index: number;
}

function TiltCard({ feature, index }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const Icon = feature.icon;

  const isMobile = () =>
    typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile()) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const x = ((e.clientY - cy) / (rect.height / 2)) * 5;
    const y = -((e.clientX - cx) / (rect.width / 2)) * 5;
    setTilt({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
      whileTap={{ scale: 0.97 }}
      style={{
        transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(${hovered ? -4 : 0}px)`,
        transition: hovered ? "transform 0.1s ease" : "transform 0.4s ease",
        boxShadow: hovered ? "0 0 30px rgba(124,181,24,0.2)" : "none",
        background: hovered ? "#141414" : "#111111",
        border: `1px solid ${hovered ? "rgba(124,181,24,0.3)" : "#2A2A2A"}`,
      }}
      className="rounded-2xl p-6 md:p-8 cursor-default"
    >
      <motion.div
        animate={{ scale: hovered ? 1.1 : 1 }}
        transition={{ duration: 0.2 }}
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
        style={{
          background: hovered
            ? "rgba(124,181,24,0.15)"
            : "rgba(124,181,24,0.08)",
        }}
      >
        <Icon
          size={24}
          style={{ color: hovered ? "#A4D620" : "#7CB518" }}
        />
      </motion.div>
      <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
      <p className="text-[#A0A0A0] text-sm leading-relaxed">{feature.desc}</p>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 md:py-28 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-widest text-[#7CB518] uppercase mb-3 block">
            Чому Military Auto
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Переваги роботи з нами
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {features.map((f, i) => (
            <TiltCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
