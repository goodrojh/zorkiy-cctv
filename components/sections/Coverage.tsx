"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Car } from "lucide-react";
import { useLead } from "@/components/ui/LeadProvider";

const CITIES = [
  "Химки", "Мытищи", "Балашиха", "Люберцы", "Подольск", "Королёв", "Одинцово", "Красногорск", "Домодедово", "Реутов",
  "Долгопрудный", "Щёлково", "Жуковский", "Раменское", "Пушкино", "Видное", "Истра", "Солнечногорск", "Ногинск", "Сергиев Посад",
  "Дмитров", "Клин", "Чехов", "Серпухов", "Наро-Фоминск", "Звенигород", "Дзержинский", "Лобня", "Электросталь", "Коломна",
];

export default function Coverage() {
  const { openLead } = useLead();
  return (
    <section id="coverage" className="bg-night text-white py-20 px-5 md:px-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_1.2fr] gap-10 items-center relative z-10">
        {/* Radar */}
        <div className="relative aspect-square max-w-[420px] w-full mx-auto">
          <div className="absolute inset-0 rounded-full border border-accent/20" />
          <div className="absolute inset-[16%] rounded-full border border-accent/25" />
          <div className="absolute inset-[33%] rounded-full border border-accent/30" />
          <div className="absolute inset-[45%] rounded-full bg-accent/10 border border-accent/40" />
          <div className="absolute inset-0 radar-sweep" style={{ background: "conic-gradient(from 0deg, rgba(0,214,143,0.35), transparent 60deg)", borderRadius: "50%" }} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
            <span className="w-3 h-3 rounded-full bg-accent shadow-[0_0_20px_#00D68F]" />
            <span className="mt-2 font-display font-bold text-sm tracking-wider">МКАД</span>
          </div>
          {[
            { l: "Химки", x: 42, y: 22 },
            { l: "Балашиха", x: 74, y: 44 },
            { l: "Подольск", x: 50, y: 80 },
            { l: "Одинцово", x: 18, y: 52 },
            { l: "Мытищи", x: 58, y: 26 },
            { l: "Домодедово", x: 62, y: 86 },
            { l: "Истра", x: 10, y: 30 },
            { l: "Раменское", x: 86, y: 68 },
          ].map((c, i) => (
            <motion.span
              key={c.l}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08 }}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] md:text-[11px] text-white/80 font-mono"
              style={{ left: c.x + "%", top: c.y + "%" }}
            >
              <span className="relative w-1.5 h-1.5 rounded-full bg-accent">
                <span className="absolute inset-0 rounded-full bg-accent pulse-ring" />
              </span>
              {c.l}
            </motion.span>
          ))}
          <span className="absolute bottom-2 right-2 font-mono text-[10px] text-white/40">R = 100 км</span>
        </div>

        <div>
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent">География</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[44px] leading-[1.1] mt-3">
            Москва и область — до 100 км от МКАД. Выезд бесплатный.
          </h2>
          <p className="mt-4 text-white/65 leading-relaxed">
            Пять бригад по секторам области: обычно приезжаем на следующий день, срочно — в течение 3 часов.
            Дальше 100 км — работаем, выезд считаем отдельно.
          </p>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {CITIES.map((c) => (
              <span key={c} className="px-2.5 py-1 rounded-full text-[12px] bg-white/5 border border-white/10 text-white/75">
                {c}
              </span>
            ))}
            <span className="px-2.5 py-1 rounded-full text-[12px] bg-accent/15 border border-accent/30 text-accent">+ все районы Москвы</span>
          </div>
          <div className="mt-7 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() =>
                openLead({
                  source: "coverage-check",
                  title: "Проверить, приедем ли к вам",
                  subtitle: "Напишите город или адрес — подтвердим бесплатный выезд и ближайшее окно бригады.",
                  cta: "Проверить адрес",
                  fields: ["name", "phone", "comment"],
                })
              }
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 bg-accent text-ink font-bold hover:bg-accent-glow transition hover:scale-105 active:scale-95"
            >
              <MapPin className="w-4 h-4" /> Проверить мой адрес
            </button>
            <button
              onClick={() =>
                openLead({
                  source: "coverage-urgent",
                  title: "Срочный выезд за 3 часа",
                  subtitle: "Взлом, авария, сорвали камеру, важное событие — приедем сегодня. Доплата за срочность 3 000 ₽.",
                  cta: "Нужно срочно",
                  fields: ["name", "phone", "comment"],
                  tone: "red",
                })
              }
              className="inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 glass text-white font-semibold hover:bg-white/15 transition"
            >
              <Car className="w-4 h-4" /> Нужно срочно сегодня
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
