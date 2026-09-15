"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Check, AlertTriangle } from "lucide-react";
import { useLead } from "@/components/ui/LeadProvider";

const ITEMS = [
  "Объект часто пустует: вы в отъезде, дача зимой, склад ночью",
  "Уже были кражи, попытки взлома или «странные люди» у забора",
  "Есть сотрудники, касса, товар — и споры «кто виноват»",
  "Соседи, УК или посторонние заходят на территорию",
  "Стоят старые камеры: ночью не видно, архив 3 дня, приложение не работает",
  "Дети, пожилые родители или животные остаются одни",
  "Страховая просит видеонаблюдение для скидки или выплаты",
];

export default function Checklist() {
  const { openLead } = useLead();
  const [checked, setChecked] = useState<number[]>([]);
  const toggle = (i: number) => setChecked((c) => (c.includes(i) ? c.filter((x) => x !== i) : [...c, i]));
  const n = checked.length;

  const verdict =
    n === 0
      ? { t: "Отметьте, что про вас", d: "Честный тест на 20 секунд.", tone: "gray" }
      : n <= 2
        ? { t: "Базовая система закроет вопрос", d: "2–4 камеры и приложение — обычно тариф «Старт».", tone: "green" }
        : n <= 4
          ? { t: "Нужна система с умной тревогой", d: "AI-детекция + сирена, чтобы реагировать до того, как что-то случится.", tone: "amber" }
          : { t: "Риски высокие — не откладывайте", d: "Выезд инженера сегодня. Каждая неделя без камер — лотерея.", tone: "red" };

  return (
    <section id="checklist" className="bg-[#F6F8F7] py-20 px-5 md:px-10">
      <div className="max-w-5xl mx-auto grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-12 items-start">
        <div>
          <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-accent-dark">Самодиагностика</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-[44px] text-night leading-[1.1] mt-3 mb-6">
            Нужно ли вам видеонаблюдение? 7 признаков
          </h2>
          <div className="flex flex-col gap-2.5">
            {ITEMS.map((it, i) => {
              const on = checked.includes(i);
              return (
                <button
                  key={it}
                  onClick={() => toggle(i)}
                  className={
                    "flex items-start gap-3 text-left p-4 rounded-2xl border transition " +
                    (on ? "bg-white border-accent shadow-sm" : "bg-white/60 border-[#E6EAE8] hover:border-gray-400")
                  }
                >
                  <span className={"mt-0.5 w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 transition " + (on ? "bg-accent border-accent" : "border-gray-300")}>
                    {on && <Check className="w-4 h-4 text-ink stroke-[3]" />}
                  </span>
                  <span className={"text-[15px] leading-snug " + (on ? "text-night font-medium" : "text-gray-600")}>{it}</span>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          layout
          className={
            "lg:sticky lg:top-28 rounded-[24px] p-6 md:p-8 text-white overflow-hidden relative " +
            (verdict.tone === "red" ? "bg-[#3A0F0C]" : verdict.tone === "amber" ? "bg-[#3A2A0C]" : "bg-night")
          }
        >
          <div className={"absolute -top-16 -right-16 w-48 h-48 rounded-full blur-[60px] opacity-40 " + (verdict.tone === "red" ? "bg-alert" : verdict.tone === "amber" ? "bg-amber-400" : "bg-accent")} />
          <div className="relative">
            <div className="flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase text-white/60">
              {verdict.tone === "red" && <AlertTriangle className="w-4 h-4 text-alert" />}
              Отмечено: {n} из {ITEMS.length}
            </div>
            <div className="mt-4 flex gap-1">
              {ITEMS.map((_, i) => (
                <div key={i} className={"h-1.5 flex-1 rounded-full " + (i < n ? (verdict.tone === "red" ? "bg-alert" : verdict.tone === "amber" ? "bg-amber-400" : "bg-accent") : "bg-white/15")} />
              ))}
            </div>
            <h3 className="font-display font-bold text-2xl md:text-3xl mt-5 leading-tight">{verdict.t}</h3>
            <p className="text-white/70 mt-2 leading-relaxed">{verdict.d}</p>
            <button
              onClick={() =>
                openLead({
                  source: "checklist-" + n,
                  title: n >= 5 ? "Срочный выезд инженера" : "Подобрать систему по результату теста",
                  subtitle: `Вы отметили ${n} из 7 признаков. Инженер учтёт это при подборе и приедет бесплатно.`,
                  cta: n >= 5 ? "Приехать как можно скорее" : "Подобрать систему",
                  fields: ["name", "phone", "object"],
                  tone: n >= 5 ? "red" : "green",
                  extra: { "Признаков отмечено": n },
                })
              }
              className={
                "mt-6 w-full h-14 rounded-full font-bold text-[15px] flex items-center justify-center transition hover:scale-[1.02] active:scale-95 " +
                (verdict.tone === "red" ? "bg-alert text-white" : "bg-accent text-ink")
              }
            >
              {n >= 5 ? "Вызвать инженера сегодня" : "Подобрать систему бесплатно"}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
