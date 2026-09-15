"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Camera, Clock } from "lucide-react";
import { media } from "@/lib/site";
import { useLead } from "@/components/ui/LeadProvider";

const CASES = [
  {
    img: "warehouse.webp",
    tag: "Склад · Домодедово",
    title: "Склад 6 000 м²: 42 камеры, недостача упала с 1,8% до 0,2%",
    text: "Зоны приёмки и отгрузки с распознаванием номеров, стеллажи под 4 Мп, интеграция с 1С — спорные отгрузки находятся по номеру накладной за минуту.",
    cams: "42 камеры",
    time: "3 дня",
    result: "−1,6% недостачи = 2,3 млн ₽/год",
  },
  {
    img: "night-yard.webp",
    tag: "ЖК · Мытищи",
    title: "Двор ЖК на 340 квартир: 18 камер, 0 угонов за 2 года",
    text: "Периметр, шлагбаум с белым списком номеров, подъезды. Три попытки вскрытия машин пресечены по push охране до того, как открыли дверь.",
    cams: "18 камер",
    time: "2 дня",
    result: "3 предотвращённых кражи",
  },
  {
    img: "hero-house.webp",
    tag: "Дом · Новорижское ш.",
    title: "Дом 320 м² с участком 25 соток: 9 камер, ночь в цвете",
    text: "Владелец полгода в Дубае. Периметр с AI-детекцией, PTZ у ворот, сирена и прожектор. Нарушитель в феврале ушёл через 40 секунд после сирены — видео передали в полицию.",
    cams: "9 камер",
    time: "1 день",
    result: "1 вторжение остановлено",
  },
];

export default function Cases() {
  const { openLead } = useLead();
  return (
    <section id="cases" className="bg-[#F6F8F7] py-20 px-5 md:px-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
          <div className="max-w-2xl">
            <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent-dark">2 470+ объектов с 2014 года</span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[48px] text-night leading-[1.1] mt-3">
              Кейсы с цифрами, а не «фото камеры на стене»
            </h2>
          </div>
          <button
            onClick={() =>
              openLead({
                source: "cases-similar",
                title: "Показать похожий объект",
                subtitle: "Подберём 2–3 кейса из вашей ниши с фото, схемой и бюджетом — пришлём в мессенджер.",
                cta: "Прислать кейсы",
                fields: ["name", "phone", "object"],
              })
            }
            className="bg-night text-white rounded-[12px] px-6 py-3 text-[15px] font-semibold flex items-center gap-2 hover:bg-steel transition-colors"
          >
            Похожий объект <span className="text-[14px] leading-none">↳</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {CASES.map((c) => (
            <motion.article
              key={c.title}
              whileHover={{ y: -3 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-[#E6EAE8] rounded-[18px] p-4 md:p-5 flex flex-col transition-all duration-200 hover:shadow-[0_8px_32px_rgba(0,0,0,0.08)] group"
            >
              <div className="w-full h-[220px] rounded-[12px] overflow-hidden mb-4 relative">
                <img src={media(c.img)} alt={c.tag} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <span className="absolute top-3 left-3 bg-ink/70 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-accent" /> {c.tag}
                </span>
              </div>
              <h3 className="font-display font-bold text-[17px] text-night leading-[1.35] mb-2">{c.title}</h3>
              <p className="text-[14px] text-gray-500 leading-[1.6] mb-4">{c.text}</p>
              <div className="mt-auto flex items-center gap-3 text-[12px] text-gray-500 font-mono">
                <span className="flex items-center gap-1">
                  <Camera className="w-3.5 h-3.5" /> {c.cams}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {c.time}
                </span>
              </div>
              <div className="mt-3 rounded-xl bg-accent/10 border border-accent/20 px-3 py-2 text-[13px] font-bold text-accent-dark">
                Результат: {c.result}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
