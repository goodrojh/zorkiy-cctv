"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Wrench, Camera, CreditCard, Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import { useLead } from "@/components/ui/LeadProvider";

const faqData: Record<string, { q: string; a: string }[]> = {
  install: [
    { q: "Сколько занимает установка?", a: "Дом или офис до 8 камер — один рабочий день (4–8 часов). Магазин или склад до 32 камер — 2–3 дня. Работаем без выходных, при необходимости — ночью, чтобы не останавливать бизнес." },
    { q: "Выезд инженера действительно бесплатный?", a: "Да, по Москве и области до 100 км от МКАД. Инженер осматривает объект, показывает зоны обзора на планшете и составляет смету. Даже если вы откажетесь — ничего не должны." },
    { q: "Нужно ли готовить объект: штробить, тянуть электричество?", a: "Нет. Питание камер идёт по тому же кабелю (PoE), нужна одна розетка для регистратора. Кабель прокладываем в гофре, кабель-канале или за фасадом — без штробления и грязи." },
    { q: "Можно ли установить камеры на даче без интернета?", a: "Да. Ставим 4G-роутер с усиленной антенной и SIM с безлимитом на видео. Проверяем уровень сигнала на выезде. Если интернет отсутствует совсем — запись идёт локально, а вы смотрите её при подключении." },
    { q: "Что с гарантией, если камера сломается через два года?", a: "Гарантия на работы — 3 года, на оборудование — от 2 до 5 лет в зависимости от бренда. Приедем и заменим бесплатно. Если проблема в кабеле или монтаже — тоже за наш счёт." },
    { q: "Вы работаете с юрлицами и по 44-ФЗ?", a: "Да. Договор, счёт, акт, УПД, работа с НДС. Есть опыт участия в тендерах по 44-ФЗ и 223-ФЗ, проектирование по требованиям Постановления №969 для транспортной безопасности." },
  ],
  equipment: [
    { q: "Какие камеры вы ставите и почему?", a: "Основные бренды — Hikvision, HiWatch, Dahua, Uniview, TRASSIR. Это 80% рынка с сервисом и запчастями в России. Для задач с распознаванием — Axis и Hikvision серии DeepinView. Не ставим no-name с маркетплейсов: они «умирают» через зиму." },
    { q: "IP или аналог (AHD)? Что лучше?", a: "IP: выше качество (4–8 Мп), аналитика, питание по одному кабелю. AHD дешевле и подходит, если уже проложен коаксиал. Инженер предложит оптимум под ваш бюджет — иногда гибрид." },
    { q: "Как долго хранится архив?", a: "Стандартно 30 дней локально на диске регистратора. Дополнительно — облачная копия, которую нельзя унести вместе с регистратором. Для бизнеса делаем 60–90 дней на сервере." },
    { q: "Будет ли видно ночью?", a: "Да. ИК-подсветка даёт чёрно-белую картинку до 30–60 м. Камеры ColorVu / Full-Color с датчиком 0,0005 лк дают цветную ночью — читается цвет одежды и номер машины. Рекомендуем их на периметр." },
    { q: "Что такое AI-детекция и зачем она?", a: "Обычный детектор движения реагирует на ветки, кошек и дождь — 200 ложных тревог в день, и вы отключаете уведомления. AI-детекция определяет именно человека или автомобиль в заданной зоне. Тревоги становятся редкими и настоящими." },
  ],
  payment: [
    { q: "Как происходит оплата?", a: "После установки: вы проверяете картинку в телефоне, подписываете акт — и только потом платите. Для юрлиц — по счёту с отсрочкой. Аванс берём только на оборудование для крупных объектов от 30 камер." },
    { q: "Может ли цена вырасти по ходу работ?", a: "Нет. Цена из сметы фиксируется в договоре. Если по факту работ меньше (например, короче кабель) — счёт уменьшится. Больше — никогда, это наш риск." },
    { q: "Сколько стоит обслуживание после?", a: "Удалённая поддержка (настройки, приложение, вопросы) — бесплатно всегда. Плановый выезд (чистка камер, проверка дисков) — от 3 900 ₽ или бесплатно в тарифе «Бизнес». Облако — первый год в подарок, далее от 290 ₽/камера в месяц." },
    { q: "Какие документы я получу?", a: "Договор с гарантией, смету, акт, чек или УПД, паспорт системы с логинами и схемой расположения камер. Всё, что нужно для страховой, бухгалтерии или продажи объекта." },
  ],
};

export default function FAQ() {
  const { openLead } = useLead();
  const [tab, setTab] = useState("install");
  const [open, setOpen] = useState<number | null>(0);
  const tabs = [
    { id: "install", label: "Установка", icon: Wrench },
    { id: "equipment", label: "Оборудование", icon: Camera },
    { id: "payment", label: "Оплата и документы", icon: CreditCard },
  ];

  return (
    <section id="faq" className="bg-white py-20 px-5 md:px-[80px]">
      <div className="max-w-[780px] mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="font-display text-3xl sm:text-4xl md:text-[48px] font-bold text-night leading-tight mb-3">
            Вопросы, которые задают перед звонком
          </h2>
          <p className="text-[16px] text-gray-500">Если не нашли ответ — инженер ответит по телефону за 5 минут</p>
        </div>

        <div className="flex justify-start sm:justify-center gap-2 border-b border-[#EFEFEE] mb-6 overflow-x-auto no-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setOpen(0);
              }}
              className={
                "inline-flex items-center gap-2 px-4 md:px-5 py-2.5 text-[14px] md:text-[15px] transition-all border-b-2 whitespace-nowrap " +
                (tab === t.id ? "text-accent-dark font-semibold border-accent-dark" : "text-gray-500 font-medium border-transparent")
              }
            >
              <t.icon className="w-4 h-4" /> {t.label}
            </button>
          ))}
        </div>

        <div>
          {faqData[tab].map((item, i) => (
            <div key={item.q} className="border-b border-[#EFEFEE] py-4 md:py-5">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex justify-between items-center gap-4 text-left group">
                <span className="text-[15px] md:text-[16px] font-semibold text-night">{item.q}</span>
                <span className="text-gray-400 shrink-0">{open === i ? <X size={20} strokeWidth={1.5} /> : <Plus size={20} strokeWidth={1.5} />}</span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="pt-3 pb-1 text-[15px] text-gray-600 leading-[1.7]">{item.a}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#F6F8F7] rounded-[16px] p-5 md:p-8 flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-night flex items-center justify-center shrink-0">
              <Phone className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-[15px] text-night">Остались вопросы?</p>
              <p className="text-[14px] text-gray-500">Отвечает инженер, не колл-центр · {SITE.hours}</p>
            </div>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <a href={SITE.phoneHref} className="flex-1 md:flex-none text-center bg-white border border-gray-200 text-night rounded-[14px] px-5 py-3.5 text-[15px] font-semibold hover:border-gray-400 transition">
              Позвонить
            </a>
            <button
              onClick={() =>
                openLead({
                  source: "faq-question",
                  title: "Задать вопрос инженеру",
                  subtitle: "Напишите вопрос — ответим звонком или в мессенджере, как удобнее.",
                  cta: "Отправить вопрос",
                  fields: ["name", "phone", "comment"],
                })
              }
              className="flex-1 md:flex-none bg-night text-white rounded-[14px] px-5 py-3.5 text-[15px] font-semibold hover:bg-steel transition"
            >
              Задать вопрос
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
