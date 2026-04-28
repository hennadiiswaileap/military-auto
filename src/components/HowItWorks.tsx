"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Консультація",
    desc: "Безкоштовна консультація, визначаємо ваші потреби та бюджет. Відповідаємо на всі питання щодо процесу пригону авто.",
  },
  {
    num: "02",
    title: "Підбір авто",
    desc: "Підбираємо автомобіль під ваш бюджет на аукціонах Copart, IAAI, Manheim. Перевіряємо історію через CarFax.",
  },
  {
    num: "03",
    title: "Викуп на аукціоні",
    desc: "Викуповуємо обраний автомобіль з повною перевіркою історії. Надаємо офіційні документи та квитанції.",
  },
  {
    num: "04",
    title: "Доставка та розмитнення",
    desc: "Контролюємо логістику та розмитнення авто в Україну. Супроводжуємо на кожному етапі до отримання ключів.",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#111111]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-widest text-[#7CB518] uppercase mb-3 block">
            Процес
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Як ми працюємо
          </h2>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block relative">
          <div
            className="absolute top-8 left-0 right-0 h-px"
            style={{ background: "linear-gradient(90deg, transparent, #2A2A2A 15%, #2A2A2A 85%, transparent)" }}
          />
          <div className="grid grid-cols-4 gap-6 relative">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="relative pt-2"
              >
                {/* Dot on line */}
                <div className="relative mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ delay: i * 0.15 + 0.2, duration: 0.35 }}
                    className="w-4 h-4 rounded-full border-2 border-[#7CB518] bg-[#0A0A0A] relative z-10"
                    style={{ boxShadow: "0 0 12px rgba(124,181,24,0.5)" }}
                  />
                </div>

                <span
                  className="text-4xl font-black mb-3 block"
                  style={{
                    background: "linear-gradient(135deg, #7CB518, #A4D620)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    opacity: 0.6,
                  }}
                >
                  {step.num}
                </span>
                <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden relative pl-8">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-[#2A2A2A]" />
          <div className="flex flex-col gap-10">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.45 }}
                className="relative"
              >
                <div
                  className="absolute -left-8 top-1 w-3 h-3 rounded-full border-2 border-[#7CB518] bg-[#111111]"
                  style={{ boxShadow: "0 0 10px rgba(124,181,24,0.4)" }}
                />
                <span
                  className="text-3xl font-black mb-1 block"
                  style={{
                    background: "linear-gradient(135deg, #7CB518, #A4D620)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    opacity: 0.6,
                  }}
                >
                  {step.num}
                </span>
                <h3 className="text-base font-semibold text-white mb-1.5">{step.title}</h3>
                <p className="text-[#A0A0A0] text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
