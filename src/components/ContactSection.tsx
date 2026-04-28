"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Phone, Mail, MapPin, Check } from "lucide-react";

const IgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);
const FbIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);
const TgIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-17.5 7.463c-1.418.6-1.394 1.854-.254 2.232l4.493 1.403 1.725 5.261c.221.664.66.888 1.146.888.485 0 .698-.22 1.017-.52l2.524-2.454 4.969 3.673c.928.511 1.587.246 1.818-.859l3.288-15.46c.332-1.337-.505-1.942-1.204-1.842z"/>
  </svg>
);
const TkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.16 8.16 0 0 0 4.77 1.52V6.76a4.85 4.85 0 0 1-1-.07z"/>
  </svg>
);

const socials = [
  { icon: IgIcon, label: "Instagram", href: "#" },
  { icon: FbIcon, label: "Facebook",  href: "#" },
  { icon: TgIcon, label: "Telegram",  href: "#" },
  { icon: TkIcon, label: "TikTok",    href: "#" },
];

function GlassInput({
  label, name, type = "text", placeholder, value, onChange, required,
}: {
  label: string; name: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-xs font-medium text-[#A0A0A0] mb-1.5 uppercase tracking-wider">
        {label}{required && <span style={{ color: "#7CB518" }}> *</span>}
      </label>
      <input
        type={type} name={name} placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        required={required}
        className="w-full px-4 py-3 rounded-xl text-white placeholder-[#444] text-sm outline-none transition-all duration-250"
        style={{
          background: focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: focused ? "1px solid rgba(124,181,24,0.45)" : "1px solid rgba(255,255,255,0.08)",
          boxShadow: focused ? "0 0 0 3px rgba(124,181,24,0.07), inset 0 1px 0 rgba(255,255,255,0.06)" : "inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      />
    </div>
  );
}

function GlassTextarea({
  label, placeholder, value, onChange,
}: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label className="block text-xs font-medium text-[#A0A0A0] mb-1.5 uppercase tracking-wider">
        {label}
      </label>
      <textarea
        placeholder={placeholder} value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        rows={4}
        className="w-full px-4 py-3 rounded-xl text-white placeholder-[#444] text-sm outline-none resize-none transition-all duration-250"
        style={{
          background: focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.04)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: focused ? "1px solid rgba(124,181,24,0.45)" : "1px solid rgba(255,255,255,0.08)",
          boxShadow: focused ? "0 0 0 3px rgba(124,181,24,0.07), inset 0 1px 0 rgba(255,255,255,0.06)" : "inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      />
    </div>
  );
}

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) { setError("Заповніть обов\'язкові поля"); return; }
    setError(""); setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#111111] steel-texture" ref={ref}>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="text-xs font-semibold tracking-widest text-[#7CB518] uppercase mb-3 block">
            Зв&apos;яжіться з нами
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-heading)]">
            Безкоштовна консультація
          </h2>
          <p className="text-[#A0A0A0] mt-3 text-sm md:text-base max-w-lg mx-auto">
            Залиште заявку і ми зв&apos;яжемося з вами протягом 30 хвилин
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Form — Liquid Glass */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl p-6 md:p-8 flex flex-col gap-5 liquid-glass"
            >
              <GlassInput label="Ім'я" name="name" placeholder="Ваше ім'я"
                value={form.name} onChange={(v) => setForm((f) => ({ ...f, name: v }))} required />
              <GlassInput label="Телефон" name="phone" type="tel" placeholder="+380 XX XXX XX XX"
                value={form.phone} onChange={(v) => setForm((f) => ({ ...f, phone: v }))} required />
              <GlassTextarea label="Повідомлення" placeholder="Розкажіть про ваші побажання щодо авто..."
                value={form.message} onChange={(v) => setForm((f) => ({ ...f, message: v }))} />

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <motion.button
                type="submit"
                disabled={status === "loading" || status === "success"}
                whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
                whileTap={{ scale: 0.98 }}
                className="btn-shimmer w-full py-4 rounded-xl font-bold text-white border-none cursor-pointer text-base font-[family-name:var(--font-body)]"
                style={{
                  background: status === "success"
                    ? "linear-gradient(135deg, #2A6A00, #4A9A00)"
                    : "linear-gradient(135deg, #7CB518, #A4D620)",
                  opacity: status === "loading" ? 0.8 : 1,
                }}
              >
                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.span key="s" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center justify-center gap-2">
                      <Check size={18} /> Заявку відправлено!
                    </motion.span>
                  ) : status === "loading" ? (
                    <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Відправляємо...</motion.span>
                  ) : (
                    <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Безкоштовна консультація</motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {status === "error" && (
                <p className="text-red-400 text-sm text-center">Помилка. Спробуйте ще раз або напишіть нам напряму.</p>
              )}
              <p className="text-[#444] text-xs text-center">
                Натискаючи кнопку, ви погоджуєтеся з обробкою персональних даних
              </p>
            </form>
          </motion.div>

          {/* Contacts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col justify-center gap-8"
          >
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 font-[family-name:var(--font-heading)]">Контакти</h3>
              <div className="flex flex-col gap-5">
                {[
                  { href: "tel:+380000000000", icon: Phone, label: "Телефон", value: "+380 XX XXX XX XX" },
                  { href: "mailto:info@militaryauto.ua", icon: Mail, label: "Email", value: "info@militaryauto.ua" },
                ].map(({ href, icon: Icon, label, value }) => (
                  <a key={label} href={href}
                    className="flex items-center gap-4 text-[#A0A0A0] hover:text-white transition-colors group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200"
                      style={{ background: "rgba(124,181,24,0.08)" }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(124,181,24,0.15)"}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "rgba(124,181,24,0.08)"}>
                      <Icon size={18} color="#7CB518" />
                    </div>
                    <div>
                      <div className="text-xs text-[#555] mb-0.5 uppercase tracking-wider">{label}</div>
                      <div className="text-white font-medium">{value}</div>
                    </div>
                  </a>
                ))}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(124,181,24,0.08)" }}>
                    <MapPin size={18} color="#7CB518" />
                  </div>
                  <div>
                    <div className="text-xs text-[#555] mb-0.5 uppercase tracking-wider">Адреса</div>
                    <div className="text-white font-medium">Київ, Україна</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#A0A0A0] uppercase tracking-wider mb-4">Соціальні мережі</h3>
              <div className="flex gap-3">
                {socials.map(({ icon: Icon, label, href }) => (
                  <a key={label} href={href} aria-label={label}
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 text-[#A0A0A0] hover:text-white liquid-glass"
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,181,24,0.3)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"}>
                    <Icon />
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-5 liquid-glass-green">
              <p className="text-white font-semibold mb-1 font-[family-name:var(--font-heading)]">Відповідаємо швидко</p>
              <p className="text-[#A0A0A0] text-sm">
                Середній час відповіді — 30 хвилин у робочий час (Пн–Сб, 9:00–20:00)
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
