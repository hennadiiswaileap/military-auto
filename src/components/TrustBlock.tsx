"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 1000, suffix: "+", label: "авто доставлено в Європу" },
  { value: 6, suffix: "", label: "років досвіду" },
  { value: 1000, suffix: "+", label: "задоволених клієнтів" },
];

const partners = [
  "Copart",
  "IAAI",
  "Manheim",
  "CarFax",
  "Copart",
  "IAAI",
  "Manheim",
  "CarFax",
];

function Counter({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const eased = 1 - Math.pow(1 - step / steps, 3);
      current = Math.round(value * eased);
      setCount(current);
      if (step >= steps) {
        setCount(value);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function TrustBlock() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="про-нас" className="py-20 md:py-28 bg-[#111111]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-semibold tracking-widest text-[#7CB518] uppercase mb-3 block">
            Цифри
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-heading)]">
            Нам довіряють
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              className="text-center"
            >
              <div
                className="text-5xl md:text-6xl font-black mb-2"
                style={{
                  background: "linear-gradient(135deg, #7CB518, #A4D620)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <Counter value={stat.value} suffix={stat.suffix} inView={inView} />
              </div>
              <p className="text-[#A0A0A0] text-sm md:text-base">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Partners marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <p className="text-center text-xs tracking-widest uppercase text-[#A0A0A0] mb-8">
            Наші партнери
          </p>
          <div className="overflow-hidden relative">
            <div className="absolute left-0 top-0 bottom-0 w-16 z-10"
              style={{ background: "linear-gradient(90deg, #111111, transparent)" }} />
            <div className="absolute right-0 top-0 bottom-0 w-16 z-10"
              style={{ background: "linear-gradient(270deg, #111111, transparent)" }} />
            <div className="flex animate-marquee whitespace-nowrap">
              {partners.map((p, i) => (
                <div
                  key={i}
                  className="mx-10 flex items-center"
                >
                  <span
                    className="text-2xl md:text-3xl font-black tracking-tight select-none"
                    style={{ color: "#2A2A2A", letterSpacing: "-0.02em" }}
                  >
                    {p}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
