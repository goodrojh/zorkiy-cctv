"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ArrowUpRight } from "lucide-react";
import { media } from "@/lib/site";
import { useLead } from "@/components/ui/LeadProvider";

const plans = [
  {
    name: "Старт",
    tagline: "Дом, дача или небольшой офис.",
    price: "49 900",
    cams: "4 камеры 4 Мп",
    isPopular: false,
    features: ["4 камеры + кронштейны", "Регистратор + диск 1 ТБ (30 дней)", "Монтаж до 80 м кабеля", "Приложение на 3 телефона", "Гарантия 3 года", "Оплата после установки"],
  },
  {
    name: "Оптимум",
    tagline: "Периметр + двор + вход. Самый частый выбор.",
    price: "89 900",
    cams: "8 камер, цветная ночь",
    isPopular: true,
    features: ["8 камер ColorVu (цветная ночь)", "AI-детекция людей и авто", "Сирена + прожектор по тревоге", "Облачная копия 30 дней", "ИБП на 4 часа", "Всё из «Старт»"],
  },
  {
    name: "Бизнес",
    tagline: "Магазин, склад, производство.",
    price: "по проекту",
    cams: "от 16 камер",
    isPopular: false,
    features: ["Проект и ТЗ под требования", "Распознавание номеров и лиц", "Интеграция СКУД, 1С, кассы", "Серверное хранение 60–90 дней", "SLA: выезд за 4 часа", "Персональный инженер"],
  },
];

function DotGridIcon() {
  return (
    <div className="grid grid-cols-2 gap-1">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-white" />
      ))}
    </div>
  );
}

export default function Pricing() {
  const { openLead } = useLead();
  return (
    <section id="pricing" className="w-full px-0 py-16 md:py-20 bg-white overflow-hidden relative">
      <div className="text-center px-5 mb-10 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="font-display font-bold text-3xl sm:text-4xl md:text-[48px] text-night leading-[1.04] tracking-tight"
        >
          Прозрачные цены под ключ
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="mt-4 text-sm md:text-base text-gray-500 max-w-xl mx-auto"
        >
          В цену входит всё: оборудование, кабель, монтаж, настройка. Никаких «плюс расходники» после.
          Цена из сметы не меняется — это в договоре.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="mx-4 md:mx-10 lg:mx-auto max-w-[1440px] relative rounded-[20px] md:rounded-[24px] overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 z-0">
          <img src={media("cameras.webp")} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-ink/50" />
        </div>

        <div className="relative z-10 bg-white/85 backdrop-blur-xl m-3 md:m-[40px] rounded-[16px] overflow-hidden border border-white/40">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-black/10">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.25 + idx * 0.1 }}
                className={"flex flex-col px-6 md:px-8 py-8 md:py-10 " + (plan.isPopular ? "bg-white" : "")}
              >
                <div className="pb-7 border-b border-black/10">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-display font-bold text-2xl text-night">{plan.name}</h3>
                    {plan.isPopular && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.12em] uppercase bg-accent text-ink">
                        Популярный
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{plan.tagline}</p>

                  <div className="mt-7 flex items-baseline gap-1 flex-wrap">
                    <span className="font-display font-bold text-4xl md:text-5xl text-night leading-none">{plan.price}</span>
                    {plan.price !== "по проекту" && <span className="text-xl font-bold text-night">₽</span>}
                  </div>
                  <div className="mt-1.5 text-xs font-mono tracking-wider uppercase text-gray-500">{plan.cams}</div>

                  <button
                    onClick={() =>
                      openLead({
                        source: "pricing-" + plan.name.toLowerCase(),
                        title: `Тариф «${plan.name}»${plan.price !== "по проекту" ? " — " + plan.price + " ₽" : ""}`,
                        subtitle: "Зафиксируем цену тарифа на 14 дней. Инженер бесплатно проверит, подходит ли конфигурация вашему объекту.",
                        cta: "Зафиксировать цену",
                        fields: ["name", "phone", "object"],
                        extra: { Тариф: plan.name, Цена: plan.price },
                        bonus: "Скидка 5% при заявке с сайта.",
                      })
                    }
                    className={
                      "mt-6 w-full flex items-center justify-between rounded-full p-1.5 group transition-colors " +
                      (plan.isPopular ? "bg-accent text-ink hover:bg-accent-glow" : "bg-night text-white hover:bg-steel")
                    }
                  >
                    <span className="flex-1 px-5 py-3 text-sm font-bold text-left">Зафиксировать цену</span>
                    <span className={"w-10 h-10 rounded-full flex items-center justify-center shrink-0 " + (plan.isPopular ? "bg-ink" : "bg-white/15")}>
                      <DotGridIcon />
                    </span>
                  </button>
                </div>

                <div className="pt-7 flex flex-col gap-3">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-sm bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 text-accent-dark stroke-[3]" />
                      </div>
                      <span className="text-[12px] md:text-[13px] font-medium tracking-wide text-night">{f}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <div className="mt-8 md:mt-10 text-center px-5">
        <p className="text-sm text-gray-500">
          Рассрочка 0% на 6 месяцев от банка-партнёра · Для юрлиц — работаем с НДС и по 44-ФЗ
        </p>
        <button
          onClick={() =>
            openLead({
              source: "pricing-installment",
              title: "Рассрочка 0% на 6 месяцев",
              subtitle: "Одобрение за 5 минут онлайн, без первого взноса. Оставьте номер — расскажем условия.",
              cta: "Узнать условия",
              fields: ["name", "phone"],
            })
          }
          className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-night underline decoration-accent decoration-2 underline-offset-4 hover:text-accent-dark"
        >
          Узнать про рассрочку <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}
