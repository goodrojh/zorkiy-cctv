"use client";

import React from "react";
import { motion } from "@/lib/motion";
import { Check, X, HelpCircle } from "lucide-react";
import { useLead } from "@/components/ui/LeadProvider";

const ROWS: Array<{ k: string; us: string; them: string; bad?: boolean }> = [
  { k: "Гарантия на работы", us: "3 года, письменно в договоре", them: "«полгода», устно" },
  { k: "Цена", us: "Фиксируем в смете до начала работ", them: "«ну, там посмотрим по факту»" },
  { k: "Оплата", us: "После установки и проверки картинки", them: "Предоплата 50–100%" },
  { k: "Кто делает", us: "Штатная бригада, электрики с допуском", them: "Субподряд «с Авито»" },
  { k: "Выезд и смета", us: "Бесплатно, инженер, 24 часа", them: "1 500–3 000 ₽ или менеджер по телефону" },
  { k: "Ложные тревоги", us: "AI-фильтр: только люди и авто", them: "Детектор движения — звонит на ветки" },
  { k: "Документы", us: "Договор, акт, чек, паспорт системы, схема", them: "Чек в WhatsApp, если повезёт" },
  { k: "Если камера «ослепла»", us: "Мы узнаем первыми и приедем", them: "Узнаете после кражи" },
  { k: "Сервис после", us: "Удалённая поддержка 24/7, выезд за 24 ч", them: "Телефон не отвечает" },
];

export default function Compare() {
  const { openLead } = useLead();
  return (
    <section id="compare" className="bg-night text-white py-20 md:py-24 px-5 md:px-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,214,143,0.14),transparent_55%)]" />
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-10 md:mb-14">
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent">Честно про рынок</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[48px] leading-[1.1] mt-3">
            Почему нас выбирают <br className="hidden sm:block" /> после «дешёвого монтажника»
          </h2>
          <p className="mt-4 text-white/60 max-w-xl mx-auto">
            Каждая третья заявка к нам — переделать систему, которую «уже поставили». Вот в чём разница.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.7 }}
          className="rounded-[24px] overflow-hidden border border-white/10 glass"
        >
          <div className="grid grid-cols-[1.1fr_1.3fr_1.1fr] md:grid-cols-[1fr_1.4fr_1.2fr] bg-white/5 text-[11px] md:text-sm font-bold">
            <div className="p-3 md:p-5 text-white/50">Критерий</div>
            <div className="p-3 md:p-5 bg-accent/15 text-accent font-display tracking-wider text-[13px] md:text-base">ЗОРКИЙ</div>
            <div className="p-3 md:p-5 text-white/50">Обычный сервис</div>
          </div>
          {ROWS.map((r, i) => (
            <motion.div
              key={r.k}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-[1.1fr_1.3fr_1.1fr] md:grid-cols-[1fr_1.4fr_1.2fr] border-t border-white/10 text-[12px] md:text-[15px]"
            >
              <div className="p-3 md:p-5 font-semibold text-white/90 leading-snug">{r.k}</div>
              <div className="p-3 md:p-5 bg-accent/10 flex items-start gap-2 leading-snug">
                <Check className="w-4 h-4 text-accent shrink-0 mt-0.5 stroke-[3]" />
                <span>{r.us}</span>
              </div>
              <div className="p-3 md:p-5 flex items-start gap-2 text-white/50 leading-snug">
                {i % 3 === 2 ? <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" /> : <X className="w-4 h-4 text-alert/80 shrink-0 mt-0.5" />}
                <span>{r.them}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() =>
              openLead({
                source: "compare-redo",
                title: "Уже есть камеры, но не работает как надо?",
                subtitle: "Бесплатный аудит существующей системы: скажем честно, что можно спасти, а что проще заменить.",
                cta: "Бесплатный аудит системы",
                fields: ["name", "phone", "comment"],
              })
            }
            className="w-full sm:w-auto rounded-full px-8 py-4 bg-accent text-ink font-bold hover:bg-accent-glow hover:scale-105 active:scale-95 transition shadow-xl shadow-accent/20"
          >
            Уже есть камеры — переделать
          </button>
          <button
            onClick={() =>
              openLead({
                source: "compare-contract",
                title: "Получить образец договора",
                subtitle: "Пришлём договор с гарантией 3 года и прайс на почту или в мессенджер, чтобы вы сравнили спокойно.",
                cta: "Прислать договор",
                fields: ["name", "phone"],
              })
            }
            className="w-full sm:w-auto rounded-full px-8 py-4 glass text-white font-semibold hover:bg-white/15 transition"
          >
            Показать договор
          </button>
        </div>
      </div>
    </section>
  );
}
