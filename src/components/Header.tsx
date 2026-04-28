"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const navLinks = [
  { label: "Як ми працюємо", href: "#how-it-works" },
  { label: "Приклади", href: "#examples" },
  { label: "Про нас", href: "#trust" },
  { label: "FAQ", href: "#faq" },
];

function scrollTo(href: string, onDone?: () => void) {
  if (onDone) onDone();
  setTimeout(() => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, 320);
}

function Logo({ size = "md" }: { size?: "sm" | "md" }) {
  const h = size === "sm" ? 32 : 40;
  const w = size === "sm" ? 120 : 150;
  return (
    <a href="#" className="flex items-center select-none">
      <Image src="/logo.svg" alt="Military Auto" width={w} height={h} priority />
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(10,10,10,0.94)" : "rgba(10,10,10,0.55)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: scrolled ? "1px solid #2A2A2A" : "1px solid transparent",
        }}
      >
        <div
          className="max-w-7xl mx-auto flex items-center justify-between px-6 transition-all duration-300"
          style={{ height: scrolled ? "60px" : "72px" }}
        >
          <Logo size={scrolled ? "sm" : "md"} />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm text-[#A0A0A0] hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none font-[family-name:var(--font-body)]"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <button
                onClick={() => scrollTo("#contact")}
                className="btn-shimmer px-5 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer border-none font-[family-name:var(--font-body)]"
                style={{ background: "linear-gradient(135deg, #7CB518, #A4D620)" }}
              >
                Розрахувати вартість
              </button>
            </div>

            {/* Burger */}
            <button
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-[5px] bg-transparent border-none cursor-pointer"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Меню"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[2px] bg-white origin-center"
                transition={{ duration: 0.25 }}
              />
              <motion.span
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                className="block w-4 h-[2px] bg-white"
                transition={{ duration: 0.2 }}
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                className="block w-6 h-[2px] bg-white origin-center"
                transition={{ duration: 0.25 }}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile slide panel — CutLog style */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={close}
              className="fixed inset-0 z-40 md:hidden"
              style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)" }}
            />

            {/* Slide panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[85%] max-w-sm md:hidden flex flex-col"
              style={{ background: "#0D0D0D", borderLeft: "1px solid #2A2A2A" }}
            >
              {/* Panel header */}
              <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: "1px solid #1A1A1A" }}>
                <Logo size="sm" />
                <button
                  onClick={close}
                  className="w-8 h-8 flex items-center justify-center text-[#A0A0A0] hover:text-white transition-colors bg-transparent border-none cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="4" y1="4" x2="16" y2="16" />
                    <line x1="16" y1="4" x2="4" y2="16" />
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <div className="flex-1 px-6 py-8 overflow-y-auto">
                <p className="text-xs text-[#555] mb-6 uppercase tracking-widest">Навігація</p>
                <div className="flex flex-col">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <button
                        onClick={() => scrollTo(link.href, close)}
                        className="group w-full flex items-center justify-between py-4 bg-transparent border-none cursor-pointer text-left"
                        style={{ borderBottom: "1px solid #1A1A1A" }}
                      >
                        <span className="text-xl font-semibold text-white group-hover:text-[#A4D620] transition-colors font-[family-name:var(--font-heading)]">
                          {link.label}
                        </span>
                        <ArrowRight size={16} className="text-[#555] group-hover:text-[#A4D620] group-hover:translate-x-1 transition-all" />
                      </button>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + navLinks.length * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-8"
                  >
                    <button
                      onClick={() => scrollTo("#contact", close)}
                      className="btn-shimmer w-full py-4 rounded-xl text-base font-bold text-white border-none cursor-pointer font-[family-name:var(--font-body)]"
                      style={{ background: "linear-gradient(135deg, #7CB518, #A4D620)" }}
                    >
                      Розрахувати вартість
                    </button>
                  </motion.div>
                </div>
              </div>

              {/* Panel footer */}
              <div className="px-6 py-5" style={{ borderTop: "1px solid #1A1A1A" }}>
                <p className="text-xs text-[#555]">Пригон авто зі США в Україну</p>
                <p className="text-xs text-[#333] mt-0.5">Київ, Україна</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
