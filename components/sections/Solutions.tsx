"use client";

import React from "react";
import { motion } from "framer-motion";
import { Home, Building2, Briefcase, Store, Warehouse, HardHat, Fence, Car, UtensilsCrossed, School, ArrowUpRight } from "lucide-react";
import { useLead } from "@/components/ui/LeadProvider";

type Sol = { id: string; name: string; from: string; cams: string; desc: string; icon: React.ElementType; hot?: boolean };

const SOLUTIONS: Sol[] = [
  { id: "house", name: "Частный дом", from: "49 900", cams: "4–8 камер", desc: "Периметр, въезд, крыльцо. Цветная ночь, сирена, push на семью.", icon: Home, hot: true },
  { id: "dacha", name: "Дача / СНТ", from: "39 900", cams: "2–4 камеры", desc: "Автономно: 4G-роутер, ИБП. Видите участок зимой из Москвы.", icon: Fence },
  { id: "flat", name: "Квартира / подъезд", from: "24 900", cams: "1–3 камеры", desc: "Дверь, лестница, домофон. Согласуем с УК и соседями.", icon: Building2 },
  { id: "office", name: "Офис", from: "69 900", cams: "6–12 камер", desc: "Ресепшн, опенспейс, серверная. Учёт рабочего времени.", icon: Briefcase },
  { id: "shop", name: "Магазин", from: "79 900", cams: "8–16 камер", desc: "Касса с записью чеков, торговый зал, склад. Антишоплифтинг.", icon: Store, hot: true },
  { id: "cafe", name: "Кафе / ресторан", from: "74 900", cams: "6–12 камер", desc: "Зал, кухня, бар. Контроль качества и споров с гостями.", icon: UtensilsCrossed },
  { id: "warehouse", name: "Склад / производство", from: "149 900", cams: "16–64 камеры", desc: "Зоны приёмки, стеллажи, ворота. Интеграция с СКУД и 1С.", icon: Warehouse },
  { id: "build", name: "Стройплощадка", from: "59 900", cams: "4–8 камер", desc: "Мачты, 4G, таймлапс стройки для заказчика. Переносим по этапам.", icon: HardHat },
  { id: "parking", name: "Парковка / КПП", from: "89 900", cams: "4–12 камер", desc: "Распознавание номеров, шлагбаум по белому списку.", icon: Car },
  { id: "school", name: "Школа / садик", from: "по проекту", cams: "16+ камер", desc: "Соответствие требованиям, доступ родителям, архив 30 дней.", icon: School },
];

export default function Solutions() {
  const { openLead } = useLead();
  return (
    <section id="solutions" className="bg-white py-20 px-0 md:px-6">
      <div className="max-w-7xl mx-auto px-5 md:px-0">
        <div className="mb-8 md:mb-10">
          <div className="flex-1">
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[42px] text-night mb-2 leading-tight">
              Решения под ваш объект
            </h2>
            <p className="text-[15px] text-gray-500">Цены «под ключ» с оборудованием и монтажом. Уточним на бесплатном выезде.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {SOLUTIONS.map((s) => (
          <motion.button
            key={s.id}
            whileHover={{ y: -4 }}
            onClick={() =>
              openLead({
                source: "solution-" + s.id,
                title: `${s.name}: смета от ${s.from} ₽`,
                subtitle: `Типовая конфигурация — ${s.cams}. Инженер бесплатно уточнит на месте и зафиксирует цену в смете.`,
                cta: "Получить смету",
                fields: ["name", "phone", "comment"],
                extra: { Решение: s.name },
              })
            }
            className="text-left bg-[#F6F8F7] border border-[#E6EAE8] rounded-[18px] p-5 md:p-6 flex flex-col gap-3 transition-[background-color,box-shadow] duration-200 hover:bg-white hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] relative min-h-[220px]"
          >
            {s.hot && (
              <span className="absolute top-4 right-4 text-[10px] font-bold tracking-wider uppercase bg-alert text-white px-2 py-0.5 rounded-full">
                Хит
              </span>
            )}
            <div className="w-11 h-11 rounded-xl bg-night flex items-center justify-center">
              <s.icon className="w-5 h-5 text-accent" />
            </div>
            <h3 className="font-display font-bold text-[18px] text-night leading-tight">{s.name}</h3>
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-bold text-night text-[15px]">
                {s.from === "по проекту" ? "по проекту" : "от " + s.from + " ₽"}
              </span>
              <span className="text-[12px] text-gray-400">· {s.cams}</span>
            </div>
            <p className="text-[13px] text-gray-500 leading-[1.5]">{s.desc}</p>
            <span className="mt-auto pt-1 text-[13px] font-semibold text-night flex items-center gap-1">
              Получить смету <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </motion.button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-0 mt-8 md:mt-10">
        <div className="rounded-[20px] border border-dashed border-gray-300 bg-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="font-display font-bold text-xl text-night">Тут нет моего объекта</div>
            <p className="text-[14px] text-gray-500 mt-1">
              Гостиница, автосервис, ферма, коттеджный посёлок, храм — делали и такое. Опишите задачу, подготовим решение и смету за 24 часа.
            </p>
          </div>
          <button
            onClick={() =>
              openLead({
                source: "solutions-custom",
                title: "Нестандартный объект?",
                subtitle: "Опишите задачу — подготовим индивидуальное решение и смету за 24 часа.",
                cta: "Получить решение",
                fields: ["name", "phone", "comment"],
              })
            }
            className="shrink-0 rounded-full px-6 py-3 text-sm font-bold text-ink bg-accent hover:bg-accent-glow transition-colors"
          >
            Тут нет моего объекта
          </button>
        </div>
      </div>
    </section>
  );
}
