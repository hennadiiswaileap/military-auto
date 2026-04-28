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

function FAQItem({ item, index, isOpen, onToggle }: {
  item: (typeof faqs)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      className="border-b border-[#2A2A2A] last:border-none"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left bg-transparent border-none cursor-pointer gap-4"
      >
        <span className="text-sm md:text-base font-medium text-white leading-snug pr-2">
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          className="flex-shrink-0 w-7 h-7 rounded-full border border-[#2A2A2A] flex items-center justify-center"
          style={{
            background: isOpen ? "rgba(124,181,24,0.1)" : "transparent",
            borderColor: isOpen ? "rgba(124,181,24,0.3)" : "#2A2A2A",
          }}
        >
          <span
            className="text-base font-bold leading-none"
            style={{ color: isOpen ? "#A4D620" : "#A0A0A0" }}
          >
            +
          </span>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p className="text-[#A0A0A0] text-sm md:text-base leading-relaxed pb-5 pr-10">
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Часті запитання
          </h2>
        </motion.div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "#111111", border: "1px solid #2A2A2A" }}
        >
          <div className="px-6 md:px-8">
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
      </div>
    </section>
  );
}
