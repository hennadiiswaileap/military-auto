"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Як ми працюємо", href: "#how-it-works" },
  { label: "Приклади", href: "#examples" },
  { label: "Про нас", href: "#trust" },
  { label: "FAQ", href: "#faq" },
];

function Logo() {
  return (
    <a href="#" className="flex items-center gap-1 select-none">
      <span className="text-gradient-green font-bold text-lg md:text-xl">★</span>
      <span className="font-bold text-lg md:text-xl">
        <span className="text-gradient-silver">MILITARY</span>{" "}
        <span className="text-gradient-green">AUTO</span>
      </span>
    </a>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(10,10,10,0.92)"
          : "rgba(10,10,10,0.6)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled ? "1px solid #2A2A2A" : "1px solid transparent",
      }}
    >
      <div
        className="max-w-7xl mx-auto flex items-center justify-between transition-all duration-300"
        style={{ padding: scrolled ? "12px 24px" : "20px 24px" }}
      >
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="text-sm text-[#A0A0A0] hover:text-white transition-colors duration-200 cursor-pointer bg-transparent border-none"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <button
            onClick={() => handleNavClick("#contact")}
            className="btn-shimmer px-5 py-2.5 rounded-lg text-sm font-semibold text-white cursor-pointer border-none"
            style={{
              background: "linear-gradient(135deg, #7CB518, #A4D620)",
            }}
          >
            Розрахувати вартість
          </button>
        </div>

        {/* Burger */}
        <button
          className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Меню"
        >
          <motion.span
            className="block h-0.5 bg-white rounded-full"
            animate={menuOpen ? { rotate: 45, y: 8, width: 24 } : { rotate: 0, y: 0, width: 24 }}
            transition={{ duration: 0.25 }}
          />
          <motion.span
            className="block h-0.5 bg-white rounded-full"
            animate={menuOpen ? { opacity: 0, width: 0 } : { opacity: 1, width: 20 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block h-0.5 bg-white rounded-full"
            animate={menuOpen ? { rotate: -45, y: -8, width: 24 } : { rotate: 0, y: 0, width: 24 }}
            transition={{ duration: 0.25 }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden"
            style={{ background: "rgba(0,0,0,0.97)", backdropFilter: "blur(12px)" }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.07, duration: 0.3 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-3xl font-semibold text-white hover:text-[#A4D620] transition-colors bg-transparent border-none cursor-pointer"
                  >
                    {link.label}
                  </button>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.28, duration: 0.3 }}
                className="mt-4"
              >
                <button
                  onClick={() => handleNavClick("#contact")}
                  className="btn-shimmer px-8 py-4 rounded-xl text-xl font-bold text-white border-none cursor-pointer"
                  style={{ background: "linear-gradient(135deg, #7CB518, #A4D620)" }}
                >
                  Розрахувати вартість
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
