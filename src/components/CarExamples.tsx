"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Car } from "lucide-react";

const cars = [
  {
    make: "Toyota",
    model: "Camry",
    year: 2021,
    priceUS: 15200,
    priceUA: 19000,
    saving: 3800,
  },
  {
    make: "BMW",
    model: "X3",
    year: 2022,
    priceUS: 26500,
    priceUA: 33000,
    saving: 6500,
  },
  {
    make: "Hyundai",
    model: "Tucson",
    year: 2023,
    priceUS: 19800,
    priceUA: 24500,
    saving: 4700,
  },
  {
    make: "Ford",
    model: "Mustang",
    year: 2021,
    priceUS: 22000,
    priceUA: 27500,
    saving: 5500,
  },
  {
    make: "Mercedes",
    model: "GLC",
    year: 2022,
    priceUS: 28900,
    priceUA: 36000,
    saving: 7100,
  },
  {
    make: "Volkswagen",
    model: "ID.4",
    year: 2023,
    priceUS: 18500,
    priceUA: 23000,
    saving: 4500,
  },
];

function formatPrice(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function CarCard({ car, index }: { car: (typeof cars)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.98 }}
      style={{
        background: hovered ? "#141414" : "#111111",
        border: `1px solid ${hovered ? "rgba(124,181,24,0.25)" : "#2A2A2A"}`,
        boxShadow: hovered ? "0 0 25px rgba(124,181,24,0.12)" : "none",
        transform: `translateY(${hovered ? -4 : 0}px)`,
        transition: "all 0.25s ease",
      }}
      className="rounded-2xl overflow-hidden"
    >
      {/* Placeholder image */}
      <div
        className="relative h-44 flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #161616 0%, #111111 50%, #1A1A1A 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(124,181,24,0.07) 0%, transparent 70%)",
          }}
        />
        <Car size={64} color="#2A2A2A" />
        <div className="absolute top-3 right-3">
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(124,181,24,0.15)", color: "#A4D620" }}
          >
            Економія {formatPrice(car.saving)}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-baseline justify-between mb-1">
          <h3 className="text-lg font-bold text-white">
            {car.make} {car.model}
          </h3>
          <span className="text-sm text-[#A0A0A0]">{car.year}</span>
        </div>

        <div className="flex items-baseline gap-3 mt-3">
          <span
            className="text-xl font-bold"
            style={{ color: "#A4D620" }}
          >
            {formatPrice(car.priceUS)}
          </span>
          <span className="text-[11px] text-[#A0A0A0]">в США</span>
        </div>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-[#A0A0A0] line-through">
            {formatPrice(car.priceUA)}
          </span>
          <span className="text-xs text-[#A0A0A0]">в Україні</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function CarExamples() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="examples" className="py-20 md:py-28 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-widest text-[#7CB518] uppercase mb-3 block">
            Реальні приклади
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Приклади пригнаних авто
          </h2>
          <p className="text-[#A0A0A0] mt-3 text-sm md:text-base max-w-xl mx-auto">
            Актуальні ціни з аукціонів США порівняно з локальним ринком
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cars.map((car, i) => (
            <CarCard key={`${car.make}-${car.model}`} car={car} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-[#A0A0A0] mb-5">
            Хочете дізнатися вартість конкретного авто?
          </p>
          <motion.button
            onClick={scrollToContact}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="btn-shimmer px-8 py-4 rounded-xl text-base font-bold text-white border-none cursor-pointer"
            style={{ background: "linear-gradient(135deg, #7CB518, #A4D620)" }}
          >
            Розрахувати вартість
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
