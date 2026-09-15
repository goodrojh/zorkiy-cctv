"use client";

import React from "react";
import { motion } from "@/lib/motion";
import type { Variants } from "framer-motion";
import { Moon, Smartphone, Bell, Cloud, Check, Cpu, Siren, ShieldCheck, Eye } from "lucide-react";
import { media } from "@/lib/site";
import { useLead } from "@/components/ui/LeadProvider";
import { useIsMobile } from "@/lib/useIsMobile";

const containerVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const cardVariants: Variants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } } };

export default function Features() {
  const { openLead } = useLead();
  const isMobile = useIsMobile();
  return (
    <section id="features" className="w-full px-5 md:px-6 py-20 md:py-[120px] bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[100px] translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 mb-12 md:mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-night mb-5 leading-[1.1]"
        >
          Что вы получаете <br className="hidden sm:block" />
          на самом деле
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto"
        >
          Не «камеры», а спокойствие: вы видите объект из любой точки мира, а система сама поднимает тревогу.
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "0px 0px -40px 0px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-7xl mx-auto relative z-10"
      >
        {/* Card 1 — night vision, image bg */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white rounded-[28px] md:rounded-[32px] border border-gray-200 p-5 md:p-6 flex flex-col gap-8 group relative overflow-hidden min-h-[440px]"
        >
          <div className="absolute inset-0 z-0">
            <img
              src={media("night-yard.webp")}
              alt="Ночная съёмка двора"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/20 to-ink/70" />
          </div>
          <div className="relative z-10">
            <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-[1.1] tracking-tight drop-shadow-lg">
              Ночью видно <br />
              <span className="text-accent">как днём. В цвете.</span>
            </h3>
            <p className="text-sm md:text-base text-white/90 leading-relaxed max-w-[450px] mt-2 drop-shadow-md">
              Матрицы ColorVu / Full-Color: номер машины и цвет куртки читаются даже без фонарей во дворе.
            </p>
          </div>
          <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 relative z-10">
            {[
              { icon: Moon, t: "0.0005 лк", d: "Цветная картинка при свете луны, ИК-подсветка до 60 м." },
              { icon: Eye, t: "4–8 Мп", d: "Лицо на 15 м, номер на 25 м. Не «серые пиксели»." },
            ].map((f) => (
              <div key={f.t} className="flex flex-col gap-3 p-4 md:p-5 rounded-[20px] bg-white/10 md:backdrop-blur-xl border border-white/20 hover:bg-white/20 transition-colors group/item">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 shrink-0 transition-transform group-hover/item:scale-110">
                  <f.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white">{f.t}</span>
                  <p className="text-[12px] text-white/70 leading-relaxed mt-1">{f.d}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Card 2 — phone app */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white rounded-[28px] md:rounded-[32px] border border-gray-200 flex flex-col overflow-hidden relative min-h-[440px]"
        >
          <div className="relative h-64 md:h-72 overflow-hidden">
            <img src={media("phone-app.webp")} alt="Приложение видеонаблюдения на телефоне" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
            {/* floating push */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="absolute top-4 left-4 right-4 sm:right-auto sm:w-[300px] bg-white/90 backdrop-blur-xl rounded-2xl p-3 shadow-xl border border-white flex items-start gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-alert flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-bold text-night">ЗОРКИЙ · Двор</span>
                  <span className="text-[10px] text-gray-400 font-mono">сейчас</span>
                </div>
                <p className="text-[12px] text-gray-600 leading-snug">Обнаружен человек у ворот. Нажмите, чтобы смотреть live и включить сирену.</p>
              </div>
            </motion.div>
          </div>
          <div className="p-5 md:p-6 pt-2">
            <h3 className="font-display text-xl md:text-2xl font-bold text-night">Весь объект — в телефоне</h3>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed mt-2">
              Live-просмотр, архив за 30 дней, двусторонняя связь и кнопка «Сирена». Настроим приложение на всех
              телефонах семьи или сотрудников — покажем, пока не станет понятно.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["iOS", "Android", "Web", "Smart TV"].map((p) => (
                <span key={p} className="px-3 py-1 rounded-full bg-gray-100 text-[12px] font-semibold text-gray-700">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Card 3 — AI workflow */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white rounded-[28px] md:rounded-[32px] border border-gray-200 overflow-hidden flex flex-col"
        >
          <div className="bg-gray-50 min-h-[18rem] relative flex items-center justify-center overflow-hidden border-b border-gray-200 px-6 py-8 md:px-8 md:py-10">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-white to-sky-50" />
            <motion.div
              animate={isMobile ? undefined : { y: [0, -12, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/80 md:backdrop-blur-md border border-white shadow-lg flex items-center justify-center"
            >
              <Siren className="h-6 w-6 text-alert" />
            </motion.div>
            <motion.div
              animate={isMobile ? undefined : { y: [0, 12, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-6 left-6 md:bottom-8 md:left-8 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/80 md:backdrop-blur-md border border-white shadow-lg flex items-center justify-center"
            >
              <ShieldCheck className="h-6 w-6 text-accent-dark" />
            </motion.div>

            <div className="relative z-10 w-full max-w-[280px] flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-3.5 shadow-xl border border-accent/20 flex items-center gap-3 w-full mb-7 relative"
              >
                <div className="w-10 h-10 rounded-xl bg-night flex items-center justify-center shrink-0">
                  <Cpu className="h-5 w-5 text-accent" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-night">AI: человек в зоне «Периметр»</span>
                  <span className="text-[9px] text-gray-400">кошки, ветки и дождь — игнорируются</span>
                </div>
                <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-px h-7 bg-gradient-to-b from-accent/30 to-accent" />
              </motion.div>
              <div className="grid grid-cols-3 gap-2.5 w-full">
                {[
                  { icon: Bell, t: "Push вам" },
                  { icon: Siren, t: "Сирена + свет" },
                  { icon: Cloud, t: "Клип в облако" },
                ].map((a, i) => (
                  <motion.div
                    key={a.t}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="bg-white/90 rounded-xl p-2.5 shadow-lg border border-white flex flex-col gap-1.5 items-center text-center"
                  >
                    <div className="w-8 h-8 rounded-lg bg-accent/15 flex items-center justify-center">
                      <a.icon className="h-4 w-4 text-accent-dark" />
                    </div>
                    <span className="text-[10px] font-bold text-night leading-tight">{a.t}</span>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-6 bg-accent text-ink text-[10px] font-bold py-2 px-4 rounded-full shadow-lg shadow-accent/30 flex items-center gap-2"
              >
                <Check className="h-3 w-3 stroke-[3]" /> Нарушитель ушёл за 40 секунд
              </motion.div>
            </div>
          </div>
          <div className="p-5 md:p-6">
            <h3 className="font-display text-xl md:text-2xl font-bold text-night">Умная тревога вместо 200 ложных</h3>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed mt-2">
              Обычная «детекция движения» звонит на каждую птицу — и её отключают. Наша AI-аналитика реагирует
              только на людей и автомобили в заданных зонах и по расписанию.
            </p>
          </div>
        </motion.div>

        {/* Card 4 — archive / reliability */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          className="bg-white rounded-[28px] md:rounded-[32px] border border-gray-200 overflow-hidden flex flex-col"
        >
          <div className="bg-gray-50 h-72 relative flex flex-col items-center justify-center border-b border-gray-200 p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-white to-sky-50" />
            <div className="w-full h-full bg-white/85 md:backdrop-blur-xl rounded-2xl border border-white shadow-2xl p-5 flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center">
                    <Cloud className="h-5 w-5 text-accent-dark" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-night">Архив: 30 дней · 2 копии</div>
                    <div className="text-[9px] text-gray-400">локальный диск + облако</div>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-1.5 h-6 bg-accent/15 rounded-full overflow-hidden">
                      <motion.div
                        animate={isMobile ? { height: "60%" } : { height: ["20%", "90%", "20%"] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
                        className="w-full bg-accent"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 flex items-end gap-2 px-1">
                {[40, 70, 45, 90, 65, 80, 50, 60, 75, 55, 85, 70].map((h, i) => (
                  <div key={i} className="flex-1 bg-slate-100 rounded-t-md h-full flex flex-col justify-end">
                    <motion.div
                      initial={{ height: 0 }}
                      whileInView={{ height: h + "%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: i * 0.06, ease: "easeOut" }}
                      className="w-full bg-gradient-to-t from-accent/70 to-accent rounded-t-md"
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-black/5 text-[10px] font-mono text-gray-500">
                <span>01.09</span>
                <span className="text-accent-dark font-bold">● ONLINE 99,97%</span>
                <span>30.09</span>
              </div>
            </div>
          </div>
          <div className="p-5 md:p-6">
            <h3 className="font-display text-xl md:text-2xl font-bold text-night">Запись не пропадёт при отключении света</h3>
            <p className="text-sm md:text-base text-gray-500 leading-relaxed mt-2">
              ИБП на 4 часа, дублирование в облако, уведомление, если камера «ослепла» или оборвали кабель. Мониторим
              состояние систем клиентов 24/7.
            </p>
          </div>
        </motion.div>
      </motion.div>

      <div className="text-center mt-10 md:mt-12 relative z-10">
        <button
          onClick={() =>
            openLead({
              source: "features-consult",
              title: "Подобрать систему под задачу",
              subtitle: "Расскажите, что вас беспокоит — инженер за 10 минут по телефону подберёт конфигурацию и назовёт вилку цен.",
              cta: "Получить консультацию",
              fields: ["name", "phone", "comment"],
            })
          }
          className="inline-flex items-center gap-2 rounded-full px-8 py-4 bg-night text-white font-bold shadow-xl shadow-night/20 hover:scale-105 active:scale-95 transition"
        >
          Подобрать систему под мою задачу
        </button>
      </div>
    </section>
  );
}
