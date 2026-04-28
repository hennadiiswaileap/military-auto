"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/* ── SVG car silhouettes ── */
function SedanSVG() {
  return (
    <svg viewBox="0 0 380 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="bodyS" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a3a3a"/>
          <stop offset="100%" stopColor="#1a1a1a"/>
        </linearGradient>
        <linearGradient id="glowS" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#7CB518" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#7CB518" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="glassS" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a6a8a" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#2a4a6a" stopOpacity="0.3"/>
        </linearGradient>
        <linearGradient id="rimS" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#555"/>
          <stop offset="100%" stopColor="#222"/>
        </linearGradient>
        <filter id="shadowS">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.5"/>
        </filter>
      </defs>
      {/* Floor glow */}
      <ellipse cx="190" cy="118" rx="155" ry="12" fill="url(#glowS)"/>
      {/* Body */}
      <path d="M 28 98 L 28 82 C 50 68 80 58 110 52 L 148 40 L 232 40 L 270 52 C 300 58 330 72 352 82 L 352 98 Z"
        fill="url(#bodyS)" filter="url(#shadowS)"/>
      {/* Cabin */}
      <path d="M 120 82 L 145 48 L 235 48 L 260 82 Z" fill="#252525"/>
      {/* Windshield */}
      <path d="M 122 80 L 148 50 L 175 50 L 155 80 Z" fill="url(#glassS)" opacity="0.9"/>
      {/* Rear glass */}
      <path d="M 225 80 L 245 50 L 237 50 L 215 80 Z" fill="url(#glassS)" opacity="0.9"/>
      {/* Cabin glass */}
      <path d="M 157 80 L 177 50 L 233 50 L 213 80 Z" fill="url(#glassS)" opacity="0.75"/>
      {/* Roof highlight */}
      <path d="M 140 52 Q 190 42 240 52" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none"/>
      {/* Hood line */}
      <path d="M 110 82 L 100 70 L 50 74 L 30 82" stroke="rgba(255,255,255,0.06)" strokeWidth="1" fill="none"/>
      {/* Body highlight */}
      <path d="M 30 88 L 352 88" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      {/* Front wheel well */}
      <path d="M 55 98 Q 58 78 95 78 Q 130 78 133 98 Z" fill="#111"/>
      {/* Rear wheel well */}
      <path d="M 247 98 Q 250 78 287 78 Q 322 78 325 98 Z" fill="#111"/>
      {/* Front wheel */}
      <circle cx="94" cy="104" r="22" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="2"/>
      <circle cx="94" cy="104" r="14" fill="url(#rimS)" stroke="#444" strokeWidth="1"/>
      <circle cx="94" cy="104" r="5" fill="#555"/>
      <line x1="80" y1="104" x2="108" y2="104" stroke="#444" strokeWidth="1.5"/>
      <line x1="94" y1="90" x2="94" y2="118" stroke="#444" strokeWidth="1.5"/>
      {/* Rear wheel */}
      <circle cx="286" cy="104" r="22" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="2"/>
      <circle cx="286" cy="104" r="14" fill="url(#rimS)" stroke="#444" strokeWidth="1"/>
      <circle cx="286" cy="104" r="5" fill="#555"/>
      <line x1="272" y1="104" x2="300" y2="104" stroke="#444" strokeWidth="1.5"/>
      <line x1="286" y1="90" x2="286" y2="118" stroke="#444" strokeWidth="1.5"/>
      {/* Bumper details */}
      <rect x="28" y="90" width="8" height="4" rx="2" fill="#7CB518" opacity="0.6"/>
      <rect x="344" y="90" width="8" height="4" rx="2" fill="#c0392b" opacity="0.6"/>
      {/* Headlight */}
      <path d="M 30 78 L 30 88 L 52 88 L 52 80 Z" fill="rgba(200,220,255,0.15)" stroke="rgba(200,220,255,0.2)" strokeWidth="0.5"/>
    </svg>
  );
}

function SuvSVG() {
  return (
    <svg viewBox="0 0 380 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="bodyU" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#363636"/>
          <stop offset="100%" stopColor="#181818"/>
        </linearGradient>
        <linearGradient id="glowU" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#7CB518" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#7CB518" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="glassU" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a6a8a" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#2a4a6a" stopOpacity="0.3"/>
        </linearGradient>
        <filter id="shadowU">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.5"/>
        </filter>
      </defs>
      {/* Floor glow */}
      <ellipse cx="190" cy="118" rx="155" ry="12" fill="url(#glowU)"/>
      {/* Body — taller, boxier */}
      <path d="M 25 98 L 25 60 C 35 52 60 44 90 42 L 130 38 L 250 38 L 290 42 C 320 44 345 52 355 60 L 355 98 Z"
        fill="url(#bodyU)" filter="url(#shadowU)"/>
      {/* Roof */}
      <rect x="115" y="38" width="150" height="4" rx="2" fill="#2a2a2a"/>
      {/* Windshield */}
      <path d="M 115 78 L 125 42 L 165 42 L 158 78 Z" fill="url(#glassU)" opacity="0.9"/>
      {/* Side glass 1 */}
      <rect x="160" y="42" width="50" height="36" rx="2" fill="url(#glassU)" opacity="0.75"/>
      {/* Side glass 2 */}
      <rect x="213" y="42" width="40" height="36" rx="2" fill="url(#glassU)" opacity="0.65"/>
      {/* Rear glass */}
      <path d="M 255 78 L 262 42 L 265 42 L 268 78 Z" fill="url(#glassU)" opacity="0.8"/>
      {/* Roof rack */}
      <rect x="130" y="36" width="120" height="3" rx="1.5" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
      <line x1="155" y1="36" x2="155" y2="39" stroke="#333" strokeWidth="1"/>
      <line x1="190" y1="36" x2="190" y2="39" stroke="#333" strokeWidth="1"/>
      <line x1="225" y1="36" x2="225" y2="39" stroke="#333" strokeWidth="1"/>
      {/* Body line */}
      <path d="M 27 72 L 353 72" stroke="rgba(255,255,255,0.05)" strokeWidth="1"/>
      {/* Wheel wells */}
      <path d="M 52 98 Q 55 74 97 74 Q 137 74 140 98 Z" fill="#111"/>
      <path d="M 240 98 Q 243 74 285 74 Q 325 74 328 98 Z" fill="#111"/>
      {/* Front wheel */}
      <circle cx="96" cy="105" r="23" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="2"/>
      <circle cx="96" cy="105" r="15" fill="#222" stroke="#444" strokeWidth="1"/>
      <circle cx="96" cy="105" r="5" fill="#555"/>
      <line x1="81" y1="105" x2="111" y2="105" stroke="#444" strokeWidth="1.5"/>
      <line x1="96" y1="90" x2="96" y2="120" stroke="#444" strokeWidth="1.5"/>
      <line x1="85" y1="94" x2="107" y2="116" stroke="#3a3a3a" strokeWidth="1"/>
      <line x1="107" y1="94" x2="85" y2="116" stroke="#3a3a3a" strokeWidth="1"/>
      {/* Rear wheel */}
      <circle cx="284" cy="105" r="23" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="2"/>
      <circle cx="284" cy="105" r="15" fill="#222" stroke="#444" strokeWidth="1"/>
      <circle cx="284" cy="105" r="5" fill="#555"/>
      <line x1="269" y1="105" x2="299" y2="105" stroke="#444" strokeWidth="1.5"/>
      <line x1="284" y1="90" x2="284" y2="120" stroke="#444" strokeWidth="1.5"/>
      <line x1="273" y1="94" x2="295" y2="116" stroke="#3a3a3a" strokeWidth="1"/>
      <line x1="295" y1="94" x2="273" y2="116" stroke="#3a3a3a" strokeWidth="1"/>
      {/* LED headlight strip */}
      <path d="M 27 62 L 27 58 L 60 56 L 62 60" stroke="rgba(200,220,255,0.5)" strokeWidth="1.5" fill="none"/>
      {/* Skid plate */}
      <rect x="25" y="90" width="14" height="8" rx="2" fill="#222" stroke="#333" strokeWidth="0.5"/>
      <rect x="341" y="90" width="14" height="8" rx="2" fill="#222" stroke="#333" strokeWidth="0.5"/>
    </svg>
  );
}

function MuscleCarSVG() {
  return (
    <svg viewBox="0 0 380 130" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="bodyM" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3d3d3d"/>
          <stop offset="100%" stopColor="#1a1a1a"/>
        </linearGradient>
        <linearGradient id="glowM" x1="50%" y1="100%" x2="50%" y2="0%">
          <stop offset="0%" stopColor="#7CB518" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#7CB518" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="glassM" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4a6a8a" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#2a4a6a" stopOpacity="0.3"/>
        </linearGradient>
        <filter id="shadowM">
          <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.5"/>
        </filter>
      </defs>
      {/* Floor glow */}
      <ellipse cx="190" cy="118" rx="155" ry="12" fill="url(#glowM)"/>
      {/* Body — long hood, fastback */}
      <path d="M 18 98 L 18 80 L 30 74 L 100 72 L 130 50 L 220 45 L 270 52 C 310 60 345 72 362 84 L 362 98 Z"
        fill="url(#bodyM)" filter="url(#shadowM)"/>
      {/* Fastback roofline */}
      <path d="M 130 80 L 145 50 L 220 46 L 268 80 Z" fill="#252525"/>
      {/* Windshield */}
      <path d="M 132 78 L 148 52 L 178 52 L 160 78 Z" fill="url(#glassM)" opacity="0.9"/>
      {/* Rear fastback glass */}
      <path d="M 228 78 L 265 52 L 220 46 L 215 78 Z" fill="url(#glassM)" opacity="0.7"/>
      {/* Cabin glass */}
      <path d="M 162 78 L 180 52 L 224 52 L 212 78 Z" fill="url(#glassM)" opacity="0.75"/>
      {/* Long hood line */}
      <path d="M 20 82 L 128 78" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" fill="none"/>
      {/* Hood scoop */}
      <path d="M 55 74 L 60 68 L 90 68 L 95 74" fill="#1a1a1a" stroke="#333" strokeWidth="0.5"/>
      {/* Body muscle line */}
      <path d="M 20 88 L 362 88" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
      <path d="M 20 80 L 128 78" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
      {/* Wheel wells — wider */}
      <path d="M 42 98 Q 45 74 90 74 Q 135 74 138 98 Z" fill="#111"/>
      <path d="M 242 98 Q 245 74 290 74 Q 335 74 338 98 Z" fill="#111"/>
      {/* Front wheel — bigger */}
      <circle cx="90" cy="105" r="25" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="2"/>
      <circle cx="90" cy="105" r="17" fill="#1e1e1e" stroke="#444" strokeWidth="1"/>
      <circle cx="90" cy="105" r="5" fill="#666"/>
      <line x1="73" y1="105" x2="107" y2="105" stroke="#555" strokeWidth="2"/>
      <line x1="90" y1="88" x2="90" y2="122" stroke="#555" strokeWidth="2"/>
      <line x1="79" y1="94" x2="101" y2="116" stroke="#444" strokeWidth="1.5"/>
      <line x1="101" y1="94" x2="79" y2="116" stroke="#444" strokeWidth="1.5"/>
      {/* Rear wheel — bigger */}
      <circle cx="290" cy="105" r="25" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="2"/>
      <circle cx="290" cy="105" r="17" fill="#1e1e1e" stroke="#444" strokeWidth="1"/>
      <circle cx="290" cy="105" r="5" fill="#666"/>
      <line x1="273" y1="105" x2="307" y2="105" stroke="#555" strokeWidth="2"/>
      <line x1="290" y1="88" x2="290" y2="122" stroke="#555" strokeWidth="2"/>
      <line x1="279" y1="94" x2="301" y2="116" stroke="#444" strokeWidth="1.5"/>
      <line x1="301" y1="94" x2="279" y2="116" stroke="#444" strokeWidth="1.5"/>
      {/* Headlight */}
      <path d="M 20 78 L 20 88 L 38 88 L 40 80 Z" fill="rgba(200,220,255,0.12)" stroke="rgba(200,220,255,0.15)" strokeWidth="0.5"/>
      {/* Exhaust */}
      <circle cx="350" cy="96" r="3" fill="#111" stroke="#333" strokeWidth="1"/>
      <circle cx="358" cy="96" r="3" fill="#111" stroke="#333" strokeWidth="1"/>
    </svg>
  );
}

const cars = [
  { make: "Toyota", model: "Camry",    year: 2021, type: "sedan" },
  { make: "BMW",    model: "X3",       year: 2022, type: "suv"   },
  { make: "Hyundai",model: "Tucson",   year: 2023, type: "suv"   },
  { make: "Ford",   model: "Mustang",  year: 2021, type: "muscle"},
  { make: "Mercedes", model: "GLC",   year: 2022, type: "suv"   },
  { make: "Volkswagen", model: "ID.4", year: 2023, type: "suv"   },
];

function CarSVG({ type }: { type: string }) {
  if (type === "sedan")  return <SedanSVG />;
  if (type === "muscle") return <MuscleCarSVG />;
  return <SuvSVG />;
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
        boxShadow: hovered ? "0 20px 50px rgba(0,0,0,0.5), 0 0 25px rgba(124,181,24,0.08)" : "0 4px 20px rgba(0,0,0,0.3)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Spotlight */}
      {hovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(300px circle at ${spot.x}px ${spot.y}px, rgba(124,181,24,0.1), transparent 65%)`,
          }}
        />
      )}

      {/* Car image area */}
      <div
        className="relative flex items-end justify-center px-4 pt-8 pb-2 overflow-hidden"
        style={{
          height: "170px",
          background: hovered
            ? "radial-gradient(ellipse 85% 70% at 50% 60%, rgba(124,181,24,0.08) 0%, #111111 75%)"
            : "radial-gradient(ellipse 70% 60% at 50% 60%, rgba(255,255,255,0.02) 0%, #111111 80%)",
          transition: "background 0.4s ease",
        }}
      >
        <div className="w-full max-w-[300px]">
          <CarSVG type={car.type} />
        </div>
      </div>

      {/* Info */}
      <div className="px-5 pb-5 pt-3" style={{ borderTop: "1px solid #1a1a1a" }}>
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-xs text-[#A0A0A0] font-medium">{car.make}</span>
            <h3 className="text-lg font-bold text-white leading-tight font-[family-name:var(--font-heading)]">
              {car.model}
            </h3>
          </div>
          <span
            className="text-xs px-2.5 py-1 rounded-full font-medium"
            style={{ background: "rgba(124,181,24,0.12)", color: "#A4D620" }}
          >
            {car.year}
          </span>
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
            Підбираємо авто під будь-який бюджет та побажання
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
          <p className="text-[#A0A0A0] mb-5">Хочете дізнатися вартість конкретного авто?</p>
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
