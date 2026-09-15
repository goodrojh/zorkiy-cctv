"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { MapPin, FileCheck2, Wrench, Smartphone, CheckCircle2 } from "lucide-react";
import { media } from "@/lib/site";
import { useLead } from "@/components/ui/LeadProvider";
import { useQuiz } from "@/components/ui/QuizModal";

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
const stepVariants: Variants = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } } };

const STEPS = [
  {
    n: "01",
    time: "день 0 · 40 минут",
    title: "Бесплатный выезд и аудит",
    text: "Инженер (не менеджер) осматривает объект, показывает зоны обзора на планшете, находит слепые места. Смета — на месте или в течение 24 часов.",
    img: "hero-house-sm.webp",
    alt: "Осмотр дома инженером",
    chips: [
      { icon: MapPin, t: "Слепые зоны", d: "разметим на схеме" },
      { icon: FileCheck2, t: "Смета с фикс-ценой", d: "не меняется после" },
    ],
  },
  {
    n: "02",
    time: "день 1 · 4–8 часов",
    title: "Монтаж за один день",
    text: "Своя бригада, аккуратно: кабель в гофре или за фасадом, без «соплей». Убираем за собой. Работаем и ночью, если объекту нельзя останавливаться.",
    img: "installer-sm.webp",
    alt: "Монтаж камеры",
    chips: [
      { icon: Wrench, t: "Штатные монтажники", d: "не субподряд" },
      { icon: CheckCircle2, t: "Акт + чек + гарантия", d: "все документы" },
    ],
  },
  {
    n: "03",
    time: "день 1 · 30 минут",
    title: "Настройка и обучение",
    text: "Ставим приложение на все телефоны, настраиваем зоны тревоги и push, показываем архив. Платите только когда сами всё увидели и проверили.",
    img: "phone-app-sm.webp",
    alt: "Настройка приложения",
    chips: [
      { icon: Smartphone, t: "Приложение на всех", d: "iOS / Android" },
      { icon: CheckCircle2, t: "Оплата после", d: "по факту работы" },
    ],
  },
];

export default function HowItWorks() {
  const { openLead } = useLead();
  const { openQuiz } = useQuiz();
  return (
    <section id="how" className="w-full px-5 md:px-12 lg:px-20 py-20 md:py-24 bg-[#F6F8F7] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-14 md:mb-20 flex flex-col items-center gap-4 relative z-10"
      >
        <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent-dark">От звонка до картинки в телефоне</span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[48px] leading-[1.1] max-w-2xl text-night">
          Три шага — и объект под защитой уже завтра
        </h2>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 mb-14 max-w-7xl mx-auto relative z-10"
      >
        {STEPS.map((s) => (
          <motion.div key={s.n} variants={stepVariants} className="flex flex-col gap-5 group">
            <div className="rounded-2xl overflow-hidden relative aspect-[4/3] w-full shadow-lg">
              <img src={media(s.img)} alt={s.alt} className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <div className="absolute top-4 left-4 font-display font-bold text-white/90 text-5xl leading-none drop-shadow">{s.n}</div>
              <div className="absolute inset-x-4 bottom-4 flex flex-col gap-2">
                {s.chips.map((c) => (
                  <div key={c.t} className="bg-white/85 backdrop-blur-md rounded-xl px-3 py-2 flex items-center gap-2.5 shadow-lg">
                    <div className="w-7 h-7 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                      <c.icon className="h-3.5 w-3.5 text-accent-dark" />
                    </div>
                    <div className="flex flex-col leading-none">
                      <span className="text-[12px] font-bold text-night">{c.t}</span>
                      <span className="text-[10px] text-gray-500 mt-0.5">{c.d}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              <span className="inline-flex w-fit rounded-full text-accent-dark text-[11px] font-bold px-3 py-1 border border-accent-dark font-mono tracking-wider">
                {s.time}
              </span>
              <h3 className="font-display text-2xl font-bold leading-tight text-night">{s.title}</h3>
              <p className="text-[15px] text-gray-500 leading-relaxed">{s.text}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 relative z-10"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() =>
            openLead({
              source: "how-visit",
              title: "Записаться на выезд инженера",
              subtitle: "Выберите удобное время — приедем в течение 24 часов по Москве и до 100 км от МКАД. Бесплатно и без обязательств.",
              cta: "Записаться на выезд",
              fields: ["name", "phone", "object", "time"],
            })
          }
          className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-accent text-ink shadow-xl shadow-accent/20 hover:shadow-2xl transition-all"
        >
          Записаться на выезд
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={openQuiz}
          className="w-full sm:w-auto rounded-full px-10 py-4 text-sm font-bold tracking-widest uppercase bg-white text-night border border-gray-200 shadow-lg hover:shadow-xl transition-all"
        >
          Сначала посчитать
        </motion.button>
      </motion.div>
    </section>
  );
}
