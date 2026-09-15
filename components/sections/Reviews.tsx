"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const PLATFORMS = [
  { name: "Яндекс Карты", rating: "4,9", count: "612" },
  { name: "2ГИС", rating: "4,8", count: "241" },
  { name: "Google", rating: "4,9", count: "178" },
  { name: "Авито", rating: "5,0", count: "149" },
];

const REVIEWS = [
  {
    name: "Дмитрий К.",
    obj: "Дом, Истра",
    text: "Ставили 8 камер. Понравилось, что инженер сразу на планшете показал, что будет видно с каждой точки — две камеры из моего «плана» оказались лишними, сэкономил 20 тысяч. Ночью реально цветная картинка, номер машины у ворот читается.",
    stars: 5,
  },
  {
    name: "Ольга М.",
    obj: "Магазин, Люберцы",
    text: "До этого стояли камеры «от знакомого», ничего не разобрать. Переделали за день, касса теперь пишется с чеками. Через две недели поймали по записи продавца — окупилось сразу.",
    stars: 5,
  },
  {
    name: "Сергей В.",
    obj: "Склад, Подольск",
    text: "42 камеры за 3 дня без остановки работы склада, монтировали ночью. Всё аккуратно, кабель в лотках, документы — договор, акт, паспорт системы. Для бухгалтерии без вопросов.",
    stars: 5,
  },
  {
    name: "Анна Р.",
    obj: "Дача, Солнечногорск",
    text: "Живу в Москве, дача 60 км. Зимой в феврале пришло уведомление «человек у калитки» — включила сирену из приложения, человек ушёл. Ради этого и ставила.",
    stars: 5,
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="bg-white py-20 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
          <div>
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent-dark">1 180+ отзывов</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[44px] text-night leading-[1.1] mt-3">
              Нас рекомендуют соседям. Это лучшая реклама.
            </h2>
            <p className="text-gray-500 mt-4 leading-relaxed">
              Отзывы собраны с независимых площадок — их нельзя удалить или отредактировать. Кликните, чтобы проверить.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {PLATFORMS.map((p) => (
                <div key={p.name} className="rounded-2xl border border-gray-200 p-4 hover:border-accent transition-colors">
                  <div className="flex items-center gap-1.5">
                    <span className="font-display font-bold text-2xl text-night">{p.rating}</span>
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <div className="text-[13px] font-semibold text-night mt-1">{p.name}</div>
                  <div className="text-[12px] text-gray-400">{p.count} отзывов</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {REVIEWS.map((r, i) => (
              <motion.figure
                key={r.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-[20px] bg-[#F6F8F7] border border-[#E6EAE8] p-5 md:p-6 flex flex-col"
              >
                <Quote className="w-6 h-6 text-accent mb-3" />
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: r.stars }).map((_, k) => (
                    <Star key={k} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="text-[14px] text-gray-700 leading-relaxed flex-1">{r.text}</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-night text-accent font-display font-bold flex items-center justify-center text-sm">
                    {r.name[0]}
                  </span>
                  <span>
                    <span className="block text-[13px] font-bold text-night">{r.name}</span>
                    <span className="block text-[12px] text-gray-400">{r.obj}</span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
