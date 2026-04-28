"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

const cars = [
  { make: "Toyota",     model: "Camry",  year: 2021, priceUS: 15200, priceUA: 19000, saving: 3800, photo: "/cars/camry.jpg"          },
  { make: "BMW",        model: "X3",     year: 2022, priceUS: 26500, priceUA: 33000, saving: 6500, photo: "/cars/bmw-x3.jpg"         },
  { make: "Hyundai",    model: "Tucson", year: 2023, priceUS: 19800, priceUA: 24500, saving: 4700, photo: "/cars/hyundai-tucson.avif" },
  { make: "Ford",       model: "Mustang",year: 2021, priceUS: 22000, priceUA: 27500, saving: 5500, photo: "/cars/ford-mustang.webp"  },
  { make: "Mercedes",   model: "GLC",    year: 2022, priceUS: 28900, priceUA: 36000, saving: 7100, photo: "/cars/mercedes-glc.avif"  },
  { make: "Volkswagen", model: "ID.4",   year: 2023, priceUS: 18500, priceUA: 23000, saving: 4500, photo: "/cars/vw-id4.avif"        },
];

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function CarCard({ car, index }: { car: (typeof cars)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [spot, setSpot] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.45 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.98 }}
      className="relative rounded-2xl overflow-hidden cursor-default"
      style={{
        background: "#111111",
        border: `1px solid ${hovered ? "rgba(124,181,24,0.22)" : "#2A2A2A"}`,
        transform: `translateY(${hovered ? -5 : 0}px)`,
        boxShadow: hovered
          ? "0 20px 50px rgba(0,0,0,0.5), 0 0 25px rgba(124,181,24,0.08)"
          : "0 4px 20px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Spotlight glow */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(300px circle at ${spot.x}px ${spot.y}px, rgba(124,181,24,0.1), transparent 65%)`,
          }}
        />
      )}

      {/* Savings badge */}
      <div className="absolute top-3 right-3 z-20">
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ background: "rgba(124,181,24,0.18)", color: "#A4D620", backdropFilter: "blur(8px)" }}
        >
          Економія {fmt(car.saving)}
        </span>
      </div>

      {/* Car photo */}
      <div className="relative w-full overflow-hidden" style={{ height: "185px" }}>
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: hovered
              ? "linear-gradient(to bottom, rgba(17,17,17,0) 30%, rgba(17,17,17,0.85) 100%)"
              : "linear-gradient(to bottom, rgba(17,17,17,0) 20%, rgba(17,17,17,0.9) 100%)",
            transition: "background 0.4s ease",
          }}
        />
        <Image
          src={car.photo}
          alt={`${car.make} ${car.model} ${car.year}`}
          fill
          className="object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Info */}
      <div className="px-5 pt-4 pb-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="text-xs text-[#A0A0A0]">{car.make}</span>
            <h3 className="text-lg font-bold text-white leading-tight font-[family-name:var(--font-heading)]">
              {car.model}
            </h3>
          </div>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium mt-0.5"
            style={{ background: "rgba(255,255,255,0.06)", color: "#A0A0A0" }}
          >
            {car.year}
          </span>
        </div>

        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid #1a1a1a" }}
        >
          <div>
            <div className="text-xs text-[#555] mb-0.5">Ціна в США</div>
            <div className="text-lg font-bold" style={{ color: "#A4D620" }}>
              {fmt(car.priceUS)}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-[#555] mb-0.5">В Україні</div>
            <div className="text-sm text-[#A0A0A0] line-through">{fmt(car.priceUA)}</div>
          </div>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-heading)]">
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
            className="btn-shimmer px-8 py-4 rounded-xl text-base font-bold text-white border-none cursor-pointer font-[family-name:var(--font-body)]"
            style={{ background: "linear-gradient(135deg, #7CB518, #A4D620)" }}
          >
            Розрахувати вартість
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
