"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const faqs = [
  {
    q: "Як ви перевіряєте авто перед покупкою?",
    a: "Ми перевіряємо кожен автомобіль через CarFax — це повний звіт про історію авто: ДТП, сервісне обслуговування, кількість власників, пробіг. Ми працюємо тільки з автомобілями, які мають прозору історію.",
  },
  {
    q: "Скільки часу займає доставка?",
    a: "Весь процес від підбору до отримання авто в Україні займає орієнтовно 45–60 днів. Це включає викуп на аукціоні, доставку в порт, морське перевезення та розмитнення.",
  },
  {
    q: "Які гарантії ви даєте?",
    a: "Ми укладаємо офіційний договір та гарантуємо фіксовану вартість. Оплата поетапна — ви контролюєте кожен крок. Автомобіль застрахований на весь час транспортування.",
  },
  {
    q: "Як відбувається розмитнення?",
    a: "Ми повністю беремо на себе процес розмитнення. Розраховуємо всі податки та збори заздалегідь, щоб ви знали точну суму. Ніяких прихованих платежів.",
  },
  {
    q: "З якими аукціонами ви працюєте?",
    a: "Ми працюємо з трьома найбільшими аукціонами США: Copart, IAAI та Manheim. Це дає доступ до сотень тисяч автомобілів на будь-який бюджет.",
  },
  {
    q: "Які документи я отримаю?",
    a: "Ви отримаєте повний пакет документів: договір купівлі-продажу, інвойс з аукціону, документи на розмитнення, свідоцтво про реєстрацію транспортного засобу.",
  },
  {
    q: "Чи можна підібрати авто під конкретний бюджет?",
    a: "Так, ми працюємо з бюджетами від $10 000 до $30 000. На безкоштовній консультації ми обговорюємо ваші побажання та підбираємо оптимальні варіанти під ваш бюджет.",
  },
];

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="rounded-2xl overflow-hidden mb-3 last:mb-0"
      style={{
        background: isOpen
          ? "rgba(255,255,255,0.05)"
          : "rgba(255,255,255,0.025)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: isOpen
          ? "1px solid rgba(124,181,24,0.2)"
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: isOpen
          ? "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.07)"
          : "0 2px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
        transition: "all 0.3s ease",
      }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-transparent border-none cursor-pointer gap-4"
      >
        <span
          className="text-sm md:text-base font-medium text-white leading-snug pr-4"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {item.q}
        </span>

        {/* Perfectly centered icon */}
        <div
          className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen
              ? "rgba(124,181,24,0.15)"
              : "rgba(255,255,255,0.06)",
            border: isOpen
              ? "1px solid rgba(124,181,24,0.3)"
              : "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <motion.svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            animate={{ rotate: isOpen ? 45 : 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            <line x1="6" y1="0" x2="6" y2="12" stroke={isOpen ? "#A4D620" : "#A0A0A0"} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="0" y1="6" x2="12" y2="6" stroke={isOpen ? "#A4D620" : "#A0A0A0"} strokeWidth="1.5" strokeLinecap="round"/>
          </motion.svg>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p
              className="text-[#A0A0A0] text-sm md:text-base leading-relaxed px-6 pb-5 pr-16"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#0A0A0A]" ref={ref}>
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold tracking-widest text-[#7CB518] uppercase mb-3 block">
            Питання
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-heading)]">
            Часті запитання
          </h2>
        </motion.div>

        <div>
          {faqs.map((item, i) => (
            <FAQItem
              key={i}
              item={item}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
