"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { Siren, ShieldAlert, Clock3, Database, ArrowRight, Lightbulb } from "lucide-react";
import { STATS, media } from "@/lib/site";
import { useLead } from "@/components/ui/LeadProvider";
import AutoVideo from "@/components/ui/AutoVideo";

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const [txt, setTxt] = useState("0");
  useEffect(() => {
    if (inView) animate(mv, value, { duration: 2.2, ease: "easeOut" });
  }, [inView, value, mv]);
  useEffect(() => spring.on("change", (v) => setTxt(Math.round(v).toLocaleString("ru-RU"))), [spring]);
  return (
    <span ref={ref}>
      {txt}
      {suffix}
    </span>
  );
}

type Tone = "amber" | "red" | "green";
type Ev = { t: number; label: string; tone: Tone };
type KF = [number, number, number, number, number]; // t, x%, y%, w%, h%

/** Ролик 1: обнаружение. Таймлайн событий и рамка синхронизированы с 8-секундным видео */
const EVENTS_DETECT: Ev[] = [
  { t: 0.0, label: "ДВИЖЕНИЕ · ЗОНА 2 (ЗАБОР)", tone: "amber" },
  { t: 1.8, label: "ЧЕЛОВЕК ОБНАРУЖЕН · 97%", tone: "red" },
  { t: 3.4, label: "PUSH → ВЛАДЕЛЕЦ · СИРЕНА ВКЛ", tone: "red" },
  { t: 5.0, label: "PTZ ПРИБЛИЖЕНИЕ · ЗАПИСЬ В ОБЛАКО", tone: "red" },
  { t: 6.6, label: "ГБР ВЫЗВАНА · 04:12 ДО ПРИБЫТИЯ", tone: "green" },
];
const KF_DETECT: KF[] = [
  [0, 18, 28, 12, 44], [1, 27, 30, 13, 40], [2, 23, 30, 11, 44], [3, 28, 28, 12, 50],
  [4, 33, 22, 12, 50], [5, 30, 22, 15, 62], [6, 28, 18, 22, 82], [7, 18, 8, 36, 92],
];

/** Ролик 2: реакция и побег */
const EVENTS_ESCAPE: Ev[] = [
  { t: 0.0, label: "ДВИЖЕНИЕ · ЗОНА 1 (ДВЕРЬ СКЛАДА)", tone: "amber" },
  { t: 1.2, label: "ЧЕЛОВЕК · ПОПЫТКА ВСКРЫТИЯ · 96%", tone: "red" },
  { t: 3.4, label: "ПРОЖЕКТОР ВКЛ · СИРЕНА 110 дБ · PUSH", tone: "red" },
  { t: 4.6, label: "НАРУШИТЕЛЬ ПОКИДАЕТ ТЕРРИТОРИЮ", tone: "amber" },
  { t: 7.0, label: "ПЕРИМЕТР ЧИСТ · КЛИП ОТПРАВЛЕН ВЛАДЕЛЬЦУ", tone: "green" },
];
const KF_ESCAPE: KF[] = [
  [0, 25, 44, 15, 54], [1, 25, 42, 16, 56], [3, 26, 42, 16, 56], [4, 38, 40, 12, 52], [5, 44, 26, 8, 26], [6, 46, 20, 5, 16],
];

function toneBorder(t: Tone) {
  return t === "green" ? "border-accent" : t === "amber" ? "border-amber-400" : "border-alert";
}
function toneBg(t: Tone) {
  return t === "green" ? "bg-accent" : t === "amber" ? "bg-amber-400" : "bg-alert";
}
function toneChip(t: Tone) {
  return t === "green"
    ? "bg-accent/20 border-accent/50 text-accent"
    : t === "amber"
      ? "bg-amber-400/20 border-amber-400/50 text-amber-300"
      : "bg-alert/20 border-alert/50 text-red-300";
}

function CctvClip({
  cam,
  srcDesktop,
  srcMobile,
  poster,
  events,
  keyframes,
  boxLabel,
  startClock,
  hideBoxAfter,
  delay = 0,
}: {
  cam: string;
  srcDesktop: string;
  srcMobile: string;
  poster: string;
  events: Ev[];
  keyframes: KF[];
  boxLabel: (tone: Tone, t: number) => string;
  startClock: number;
  /** секунда, после которой рамку прячем (нарушитель ушёл из кадра) */
  hideBoxAfter?: number;
  delay?: number;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [t, setT] = useState(0);
  const [box, setBox] = useState({ x: keyframes[0][1], y: keyframes[0][2], w: keyframes[0][3], h: keyframes[0][4] });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      const ct = v.currentTime;
      setT(ct);
      let k = keyframes[0];
      for (const f of keyframes) if (ct >= f[0]) k = f;
      setBox({ x: k[1], y: k[2], w: k[3], h: k[4] });
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, [keyframes]);

  const active = events.filter((e) => t >= e.t);
  const current = active[active.length - 1] ?? events[0];
  const hideBox = hideBoxAfter !== undefined && t > hideBoxAfter;
  const sec = Math.floor(startClock + t);
  const clock = `02:${String(14 + Math.floor(sec / 60)).padStart(2, "0")}:${String(sec % 60).padStart(2, "0")}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.7, delay }}
      className="relative rounded-[20px] md:rounded-[24px] overflow-hidden border border-white/10 bg-black aspect-video shadow-2xl shadow-black/60"
    >
      <AutoVideo videoRef={videoRef} srcDesktop={srcDesktop} srcMobile={srcMobile} poster={poster} className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 scanlines" />

      <div className="absolute top-3 left-3 md:top-4 md:left-4 flex items-center gap-2 font-mono text-[10px] md:text-xs tracking-[0.18em]">
        <span className="w-2 h-2 rounded-full bg-alert rec-dot" />
        <span className="text-white/90">REC</span>
        <span className="text-white/50">{cam}</span>
      </div>
      <div className="absolute top-3 right-3 md:top-4 md:right-4 font-mono text-[10px] md:text-xs text-white/60 tracking-wider">{clock}</div>

      {!hideBox && (
        <motion.div
          animate={{ left: box.x + "%", top: box.y + "%", width: box.w + "%", height: box.h + "%" }}
          transition={t < 0.35 ? { duration: 0 } : { type: "spring", stiffness: 60, damping: 18 }}
          className={"absolute border-2 " + toneBorder(current.tone)}
          style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.4)" }}
        >
          <span className={"absolute -top-5 left-0 font-mono text-[9px] md:text-[10px] px-1.5 py-0.5 text-ink whitespace-nowrap " + toneBg(current.tone)}>
            {boxLabel(current.tone, t)}
          </span>
        </motion.div>
      )}

      <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 flex flex-col gap-1 font-mono text-[10px] md:text-[11px]">
        {active.slice(-3).map((e) => (
          <motion.div key={e.label} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className={"self-start px-2 py-1 rounded backdrop-blur-md border " + toneChip(e.tone)}>
            {e.label}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Prevented() {
  const { openLead } = useLead();

  return (
    <section id="prevented" className="relative bg-ink text-white py-20 md:py-28 px-5 md:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,214,143,0.12),transparent_55%)]" />
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Заголовок на всю ширину */}
        <div className="max-w-3xl mb-10 md:mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-3xl sm:text-4xl lg:text-[52px] leading-[1.2] sm:leading-[1.15]"
          >
            Камера не просто пишет.
            <br />
            <span className="text-accent">Она останавливает.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
            className="mt-5 text-white/70 text-base md:text-lg leading-relaxed max-w-[640px]"
          >
            AI-детекция отличает человека от кошки и качающейся ветки. Через 2 секунды после пересечения периметра —
            push на ваш телефон, сирена и прожектор на объекте, а PTZ-камера берёт лицо крупным планом. В 9 из 10
            случаев нарушитель уходит, не дойдя до двери.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1.25fr_1fr] gap-8 lg:gap-12 items-start">
          {/* Два ролика: обнаружение → реакция и побег */}
          <div className="flex flex-col gap-5 md:gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2.5 font-mono text-[11px] tracking-[0.2em] uppercase text-white/50">
                <span className="w-5 h-5 rounded-full bg-alert/20 border border-alert/50 text-red-300 flex items-center justify-center text-[10px] font-bold">1</span>
                Обнаружение · 8 секунд
              </div>
              <CctvClip
                cam="CAM 03 · ДВОР · PTZ"
                srcDesktop={media("intruder-web.mp4")}
                srcMobile={media("intruder-mobile.mp4")}
                poster={media("intruder.webp")}
                events={EVENTS_DETECT}
                keyframes={KF_DETECT}
                boxLabel={(tone) => (tone === "amber" ? "ДВИЖЕНИЕ" : "ЧЕЛОВЕК 97%")}
                startClock={0}
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2.5 font-mono text-[11px] tracking-[0.2em] uppercase text-white/50">
                <span className="w-5 h-5 rounded-full bg-accent/20 border border-accent/50 text-accent flex items-center justify-center text-[10px] font-bold">2</span>
                Вскрытие и побег · склад, Домодедово · 10 секунд
              </div>
              <CctvClip
                cam="CAM 02 · СКЛАД · ЗАДНИЙ ДВОР"
                srcDesktop={media("escape-web.mp4")}
                srcMobile={media("escape-mobile.mp4")}
                poster={media("escape.webp")}
                events={EVENTS_ESCAPE}
                keyframes={KF_ESCAPE}
                boxLabel={(_tone, tt) => (tt < 1.2 ? "ДВИЖЕНИЕ" : tt < 3.4 ? "ЧЕЛОВЕК 96%" : tt < 4.6 ? "ТРЕВОГА" : "УХОДИТ")}
                startClock={0}
                hideBoxAfter={6.6}
                delay={0.15}
              />
            </div>
          </div>

          {/* Статистика и что происходит */}
          <div className="lg:sticky lg:top-28">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { icon: ShieldAlert, v: STATS.intrusionsPrevented, l: "вторжений на частную территорию предотвращено", tone: "text-alert" },
                { icon: Siren, v: STATS.theftsPrevented, l: "краж остановлено до потери имущества", tone: "text-amber-400" },
                { icon: Clock3, v: STATS.avgReactionMin, l: "мин — среднее время до реакции владельца или ГБР", tone: "text-accent" },
                { icon: Database, v: STATS.archiveHours, l: "часов видео передано клиентам и полиции", tone: "text-sky-400" },
              ].map((s) => (
                <motion.div key={s.l} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-4 md:p-5">
                  <s.icon className={"w-5 h-5 mb-2 " + s.tone} />
                  <div className="font-display font-bold text-3xl md:text-4xl leading-none">
                    <Counter value={s.v} />
                  </div>
                  <div className="mt-1.5 text-[12px] md:text-[13px] text-white/60 leading-snug">{s.l}</div>
                </motion.div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-white/35 font-mono">* по данным систем клиентов с 2014 г. Обновляется ежемесячно.</p>

            {/* Что срабатывает */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/50 mb-3">Что срабатывает автоматически</div>
              <ul className="flex flex-col gap-2.5 text-[14px] text-white/85">
                {[
                  { i: Siren, t: "Сирена 110 дБ и голосовое предупреждение через динамик камеры" },
                  { i: Lightbulb, t: "Прожектор — нарушитель видит, что его сняли в цвете" },
                  { i: ShieldAlert, t: "Push вам и, по желанию, сигнал на пульт ГБР" },
                  { i: Database, t: "Клип в облако — его нельзя унести вместе с регистратором" },
                ].map((r) => (
                  <li key={r.t} className="flex items-start gap-3">
                    <span className="mt-0.5 w-6 h-6 rounded-lg bg-accent/15 flex items-center justify-center shrink-0">
                      <r.i className="w-3.5 h-3.5 text-accent" />
                    </span>
                    <span className="leading-snug">{r.t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() =>
                openLead({
                  source: "prevented-demo",
                  title: "Показать, как это сработает у вас",
                  subtitle: "Инженер приедет с тестовой камерой и покажет детекцию людей вживую на вашем участке. Бесплатно.",
                  cta: "Хочу живую демонстрацию",
                  fields: ["name", "phone", "object"],
                  tone: "red",
                })
              }
              className="mt-6 w-full lg:w-auto inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 bg-alert text-white font-bold shadow-xl shadow-alert/30 hover:brightness-110 hover:scale-105 active:scale-95 transition"
            >
              Показать на моём объекте <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
