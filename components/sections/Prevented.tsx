"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { Siren, ShieldAlert, Clock3, Database, ArrowRight } from "lucide-react";
import { STATS, media } from "@/lib/site";
import { useLead } from "@/components/ui/LeadProvider";

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

/** Таймлайн детекции синхронизирован с 8-секундным видео */
const EVENTS = [
  { t: 0.0, label: "ДВИЖЕНИЕ · ЗОНА 2 (ЗАБОР)", tone: "amber" },
  { t: 1.8, label: "ЧЕЛОВЕК ОБНАРУЖЕН · 97%", tone: "red" },
  { t: 3.4, label: "PUSH → ВЛАДЕЛЕЦ · СИРЕНА ВКЛ", tone: "red" },
  { t: 5.0, label: "PTZ ПРИБЛИЖЕНИЕ · ЗАПИСЬ В ОБЛАКО", tone: "red" },
  { t: 6.6, label: "ГБР ВЫЗВАНА · 04:12 ДО ПРИБЫТИЯ", tone: "green" },
];

export default function Prevented() {
  const { openLead } = useLead();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [t, setT] = useState(0);
  const [box, setBox] = useState({ x: 17, y: 22, w: 9, h: 30 });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      const ct = v.currentTime;
      setT(ct);
      // Рамка следует за нарушителем (ключевые кадры по секундам видео)
      const KF = [
        [0, 18, 28, 12, 44], [1, 27, 30, 13, 40], [2, 23, 30, 11, 44], [3, 28, 28, 12, 50],
        [4, 33, 22, 12, 50], [5, 30, 22, 15, 62], [6, 28, 18, 22, 82], [7, 18, 8, 36, 92],
      ];
      let k = KF[0];
      for (const f of KF) if (ct >= f[0]) k = f;
      setBox({ x: k[1], y: k[2], w: k[3], h: k[4] });
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  const active = EVENTS.filter((e) => t >= e.t);
  const current = active[active.length - 1] ?? EVENTS[0];
  const boxColor = current.tone === "green" ? "border-accent" : current.tone === "amber" ? "border-amber-400" : "border-alert";

  return (
    <section id="prevented" className="relative bg-ink text-white py-20 md:py-28 px-5 md:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,214,143,0.12),transparent_55%)]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-[1.15fr_1fr] gap-10 lg:gap-14 items-center">
          {/* VIDEO */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="relative rounded-[24px] overflow-hidden border border-white/10 bg-black aspect-video shadow-2xl shadow-black/60"
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              poster={media("intruder.webp")}
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={media("intruder-web.mp4")} type="video/mp4" media="(min-width: 768px)" />
              <source src={media("intruder-mobile.mp4")} type="video/mp4" />
            </video>
            <div className="absolute inset-0 scanlines" />

            {/* HUD */}
            <div className="absolute top-3 left-3 md:top-4 md:left-4 flex items-center gap-2 font-mono text-[10px] md:text-xs tracking-[0.18em]">
              <span className="w-2 h-2 rounded-full bg-alert rec-dot" />
              <span className="text-white/90">REC</span>
              <span className="text-white/50">CAM 03 · ДВОР · PTZ</span>
            </div>
            <div className="absolute top-3 right-3 md:top-4 md:right-4 font-mono text-[10px] md:text-xs text-white/60 tracking-wider">
              02:{String(Math.floor(14 + t)).padStart(2, "0")}:{String(Math.floor((t * 100) % 100)).padStart(2, "0")}
            </div>

            {/* tracking box */}
            <motion.div
              animate={{ left: box.x + "%", top: box.y + "%", width: box.w + "%", height: box.h + "%" }}
              transition={{ type: "spring", stiffness: 60, damping: 18 }}
              className={"absolute border-2 " + boxColor}
              style={{ boxShadow: "0 0 0 1px rgba(0,0,0,.4)" }}
            >
              <span className={"absolute -top-5 left-0 font-mono text-[9px] md:text-[10px] px-1.5 py-0.5 text-ink whitespace-nowrap " + (current.tone === "green" ? "bg-accent" : current.tone === "amber" ? "bg-amber-400" : "bg-alert")}>
                {current.tone === "amber" ? "ДВИЖЕНИЕ" : "ЧЕЛОВЕК 97%"}
              </span>
            </motion.div>

            {/* event log */}
            <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 flex flex-col gap-1 font-mono text-[10px] md:text-[11px]">
              {active.slice(-3).map((e) => (
                <motion.div
                  key={e.label}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={
                    "self-start px-2 py-1 rounded backdrop-blur-md border " +
                    (e.tone === "green"
                      ? "bg-accent/20 border-accent/50 text-accent"
                      : e.tone === "amber"
                        ? "bg-amber-400/20 border-amber-400/50 text-amber-300"
                        : "bg-alert/20 border-alert/50 text-red-300")
                  }
                >
                  {e.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* TEXT */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-alert/40 bg-alert/10 px-3 py-1.5 text-[12px] font-semibold text-red-300 mb-5"
            >
              <Siren className="w-3.5 h-3.5" /> Реальный сценарий: ночь, забор, 8 секунд
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="font-display font-bold text-3xl sm:text-4xl lg:text-[52px] leading-[1.05]"
            >
              Камера не просто пишет.
              <br />
              <span className="text-accent">Она останавливает.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-5 text-white/70 text-base md:text-lg leading-relaxed max-w-[520px]"
            >
              AI-детекция отличает человека от кошки и качающейся ветки. Через 2 секунды после пересечения
              периметра — push на ваш телефон, сирена и прожектор на объекте, а PTZ-камера берёт лицо
              крупным планом. В 9 из 10 случаев нарушитель уходит, не дойдя до двери.
            </motion.p>

            <div className="mt-8 grid grid-cols-2 gap-3 md:gap-4">
              {[
                { icon: ShieldAlert, v: STATS.intrusionsPrevented, l: "вторжений на частную территорию предотвращено", tone: "text-alert" },
                { icon: Siren, v: STATS.theftsPrevented, l: "краж остановлено до потери имущества", tone: "text-amber-400" },
                { icon: Clock3, v: STATS.avgReactionMin, l: "мин — среднее время до реакции владельца или ГБР", tone: "text-accent", suffix: "" },
                { icon: Database, v: STATS.archiveHours, l: "часов видео передано клиентам и полиции", tone: "text-sky-400" },
              ].map((s) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass rounded-2xl p-4 md:p-5"
                >
                  <s.icon className={"w-5 h-5 mb-2 " + s.tone} />
                  <div className="font-display font-bold text-3xl md:text-4xl leading-none">
                    <Counter value={s.v} suffix={s.suffix} />
                  </div>
                  <div className="mt-1.5 text-[12px] md:text-[13px] text-white/60 leading-snug">{s.l}</div>
                </motion.div>
              ))}
            </div>
            <p className="mt-3 text-[11px] text-white/35 font-mono">* по данным систем клиентов с 2014 г. Обновляется ежемесячно.</p>

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
              className="mt-7 inline-flex items-center gap-2 rounded-full px-7 py-4 bg-alert text-white font-bold shadow-xl shadow-alert/30 hover:brightness-110 hover:scale-105 active:scale-95 transition"
            >
              Показать на моём объекте <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
