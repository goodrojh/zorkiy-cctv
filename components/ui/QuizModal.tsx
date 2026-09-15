"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowRight, ArrowLeft, Home, Building2, Store, Warehouse, HardHat, Fence, Moon, Cloud, Mic, Cpu } from "lucide-react";
import { useLead } from "./LeadProvider";

type Ctx = { openQuiz: () => void };
const QuizCtx = createContext<Ctx | null>(null);
export function useQuiz() {
  const c = useContext(QuizCtx);
  if (!c) throw new Error("useQuiz outside provider");
  return c;
}

const OBJECTS = [
  { id: "house", label: "Дом / дача", icon: Home, base: 4, k: 1 },
  { id: "flat", label: "Квартира / подъезд", icon: Building2, base: 2, k: 0.9 },
  { id: "office", label: "Офис", icon: Building2, base: 6, k: 1 },
  { id: "shop", label: "Магазин / кафе", icon: Store, base: 8, k: 1.05 },
  { id: "warehouse", label: "Склад / производство", icon: Warehouse, base: 12, k: 1.15 },
  { id: "build", label: "Стройплощадка", icon: HardHat, base: 4, k: 1.3 },
  { id: "snt", label: "СНТ / КПП / парковка", icon: Fence, base: 6, k: 1.2 },
];

const OPTIONS = [
  { id: "night", label: "Цветная ночная съёмка", icon: Moon, price: 2900, per: true },
  { id: "cloud", label: "Облачный архив 30 дней", icon: Cloud, price: 0, per: false },
  { id: "audio", label: "Микрофон / динамик", icon: Mic, price: 1900, per: true },
  { id: "ai", label: "AI-детекция людей и авто", icon: Cpu, price: 9900, per: false },
];

const CAM_PRICE = 8900; // камера + монтаж + кабель, средняя
const BASE = 12900; // регистратор, диск, коммутация, настройка

export function QuizProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const v = useMemo(() => ({ openQuiz: () => setOpen(true) }), []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);
  return (
    <QuizCtx.Provider value={v}>
      {children}
      <AnimatePresence>{open && <Quiz onClose={() => setOpen(false)} />}</AnimatePresence>
    </QuizCtx.Provider>
  );
}

function Quiz({ onClose }: { onClose: () => void }) {
  const { openLead } = useLead();
  const [step, setStep] = useState(0);
  const [obj, setObj] = useState(OBJECTS[0]);
  const [cams, setCams] = useState(4);
  const [opts, setOpts] = useState<string[]>(["cloud"]);

  const toggle = (id: string) => setOpts((o) => (o.includes(id) ? o.filter((x) => x !== id) : [...o, id]));

  const price = useMemo(() => {
    let p = BASE + cams * CAM_PRICE;
    for (const o of OPTIONS) if (opts.includes(o.id)) p += o.per ? o.price * cams : o.price;
    p *= obj.k;
    const lo = Math.round((p * 0.92) / 100) * 100;
    const hi = Math.round((p * 1.12) / 100) * 100;
    return { lo, hi };
  }, [cams, opts, obj]);

  const fmt = (n: number) => n.toLocaleString("ru-RU") + " ₽";

  const finish = () => {
    onClose();
    openLead({
      source: "quiz-result",
      title: `Зафиксировать цену ${fmt(price.lo)} – ${fmt(price.hi)}`,
      subtitle: `${obj.label}, ${cams} кам. Инженер уточнит детали и пришлёт точную смету за 24 часа. Цена из сметы не меняется.`,
      cta: "Получить точную смету",
      fields: ["name", "phone", "comment"],
      bonus: "Скидка 5% при заявке с калькулятора.",
      extra: { Объект: obj.label, Камер: cams, Опции: opts.join(", ") || "—", Расчёт: `${price.lo}–${price.hi}` },
    });
  };

  const steps = ["Объект", "Камеры", "Опции", "Результат"];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        className="relative w-full sm:max-w-[600px] max-h-[92vh] overflow-y-auto bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl"
      >
        <div className="px-6 pt-6 pb-4 bg-night text-white rounded-t-[28px] relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full bg-accent blur-[70px] opacity-40" />
          <button onClick={onClose} aria-label="Закрыть" className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center">
            <X className="w-4 h-4" />
          </button>
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/60 mb-2">Калькулятор · шаг {step + 1} из 4</div>
          <h3 className="font-display text-2xl font-bold">
            {step === 0 && "Что защищаем?"}
            {step === 1 && "Сколько камер нужно?"}
            {step === 2 && "Что важно?"}
            {step === 3 && "Ваш расчёт"}
          </h3>
          <div className="mt-4 flex gap-1.5">
            {steps.map((s, i) => (
              <div key={s} className={"h-1 flex-1 rounded-full " + (i <= step ? "bg-accent" : "bg-white/15")} />
            ))}
          </div>
        </div>

        <div className="px-6 py-6">
          {step === 0 && (
            <div className="grid grid-cols-2 gap-3">
              {OBJECTS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setObj(o);
                    setCams(o.base);
                    setStep(1);
                  }}
                  className={
                    "flex flex-col items-start gap-3 p-4 rounded-2xl border text-left transition hover:-translate-y-0.5 " +
                    (obj.id === o.id ? "border-accent bg-accent/5" : "border-gray-200 hover:border-gray-400")
                  }
                >
                  <o.icon className="w-6 h-6 text-accent-dark" />
                  <span className="font-semibold text-[14px] leading-tight">{o.label}</span>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="text-center">
                <div className="font-display font-bold text-7xl text-night">{cams}</div>
                <div className="text-gray-500 text-sm mt-1">камер · рекомендуем для «{obj.label}»: {obj.base}</div>
              </div>
              <input
                type="range"
                min={1}
                max={32}
                value={cams}
                onChange={(e) => setCams(+e.target.value)}
                className="w-full mt-6 accent-accent"
              />
              <div className="flex justify-between text-xs text-gray-400 font-mono">
                <span>1</span>
                <span>8</span>
                <span>16</span>
                <span>32+</span>
              </div>
              <p className="mt-5 text-sm text-gray-500 leading-relaxed bg-gray-50 rounded-xl p-4">
                Не уверены? Инженер на бесплатном выезде покажет зоны обзора каждой камеры на планшете — обычно
                хватает на 1–2 камеры меньше, чем кажется.
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-2.5">
              {OPTIONS.map((o) => {
                const on = opts.includes(o.id);
                return (
                  <button
                    key={o.id}
                    onClick={() => toggle(o.id)}
                    className={
                      "flex items-center gap-4 p-4 rounded-2xl border text-left transition " +
                      (on ? "border-accent bg-accent/5" : "border-gray-200 hover:border-gray-400")
                    }
                  >
                    <span className={"w-10 h-10 rounded-xl flex items-center justify-center " + (on ? "bg-accent text-ink" : "bg-gray-100 text-gray-500")}>
                      <o.icon className="w-5 h-5" />
                    </span>
                    <span className="flex-1">
                      <span className="block font-semibold text-[15px]">{o.label}</span>
                      <span className="block text-xs text-gray-500">
                        {o.price === 0 ? "бесплатно первый год" : "+" + o.price.toLocaleString("ru-RU") + " ₽" + (o.per ? " / камера" : "")}
                      </span>
                    </span>
                    <span className={"w-6 h-6 rounded-full border-2 flex items-center justify-center " + (on ? "border-accent bg-accent" : "border-gray-300")}>
                      {on && <span className="w-2 h-2 rounded-full bg-ink" />}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="rounded-2xl bg-night text-white p-6 relative overflow-hidden">
                <div className="absolute -bottom-16 -right-10 w-48 h-48 rounded-full bg-accent blur-[60px] opacity-30" />
                <div className="text-white/60 text-xs uppercase tracking-wider">Ориентировочно под ключ</div>
                <div className="font-display font-bold text-3xl sm:text-4xl mt-2 leading-none">
                  {fmt(price.lo)} – {fmt(price.hi)}
                </div>
                <div className="mt-3 text-sm text-white/70">
                  {obj.label} · {cams} кам. · {opts.length ? OPTIONS.filter((o) => opts.includes(o.id)).map((o) => o.label).join(", ") : "базовая комплектация"}
                </div>
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[13px] text-white/85">
                  {["Камеры 4 Мп + кронштейны", "Регистратор и диск", "Кабель, монтаж, коммутация", "Настройка телефона", "Гарантия 3 года", "Оплата после установки"].map((t) => (
                    <li key={t} className="flex items-start gap-1.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mt-4 text-sm text-gray-500 leading-relaxed">
                Точную цену назовём после бесплатного выезда — и <b className="text-night">зафиксируем в смете</b>. Если по факту
                работ окажется меньше, счёт уменьшится. Больше — никогда.
              </p>
            </div>
          )}
        </div>

        <div className="px-6 pb-6 flex items-center gap-3">
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} className="h-12 px-4 rounded-full border border-gray-200 text-gray-600 flex items-center gap-1 hover:border-gray-400">
              <ArrowLeft className="w-4 h-4" /> Назад
            </button>
          )}
          {step > 0 && step < 3 && (
            <button onClick={() => setStep(step + 1)} className="flex-1 h-12 rounded-full bg-night text-white font-bold flex items-center justify-center gap-2 hover:brightness-110">
              Дальше <ArrowRight className="w-4 h-4" />
            </button>
          )}
          {step === 3 && (
            <button onClick={finish} className="flex-1 h-12 rounded-full bg-accent text-ink font-bold flex items-center justify-center gap-2 hover:bg-accent-glow shadow-lg shadow-accent/30">
              Зафиксировать цену −5% <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
