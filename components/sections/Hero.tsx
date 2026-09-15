"use client";

import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Calculator, Star, ShieldCheck, Clock } from "lucide-react";
import { SITE, STATS, media } from "@/lib/site";
import { useLead } from "@/components/ui/LeadProvider";
import { useQuiz } from "@/components/ui/QuizModal";

const BRANDS = ["Hikvision", "Dahua", "HiWatch", "TRASSIR", "Uniview", "Axis", "Tantos", "RVi"];

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { openLead } = useLead();
  const { openQuiz } = useQuiz();

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 0.85;
  }, []);

  return (
    <section id="top" className="min-h-[100svh] md:min-h-[104vh] flex flex-col bg-ink relative w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster={media("hero-house.webp")}
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={media("hero-web.mp4")} type="video/mp4" media="(min-width: 768px)" />
        <source src={media("hero-mobile.mp4")} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/30 to-ink z-[1]" />
      <div className="absolute inset-0 scanlines z-[1] opacity-60" />

      {/* CCTV HUD corners */}
      <div className="absolute inset-x-4 md:inset-x-8 top-24 md:top-28 bottom-4 md:bottom-8 z-[2] pointer-events-none hidden sm:block">
        {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((c) => (
          <span key={c} className={"absolute w-6 h-6 border-white/30 " + c} />
        ))}
        <div className="absolute top-0 left-9 flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-white/60">
          <span className="w-2 h-2 rounded-full bg-alert rec-dot" /> REC · CAM 01 · МОСКВА
        </div>
        <LiveClock />
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-5 pt-[120px] md:pt-[150px] pb-14 z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-[13px] text-white/90 mb-6"
        >
          <Star className="w-3.5 h-3.5 text-accent fill-accent" />
          <b>4,9</b> · 1 180+ отзывов <span className="hidden sm:inline">· Яндекс, 2ГИС, Google</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="w-full font-display font-bold text-[36px] leading-[1.04] sm:text-[52px] lg:text-[68px] xl:text-[76px] tracking-[-0.02em] text-white max-w-5xl mb-5"
        >
          Видеонаблюдение под ключ
          <br />
          <span className="text-accent">за 1 день.</span> Гарантия 3 года.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full text-base md:text-lg text-white/85 max-w-[560px] leading-relaxed mb-8"
        >
          Бесплатный выезд инженера по Москве и области. Смета за 24 часа — и мы её не меняем.
          Оплата после установки, когда вы уже видите картинку в телефоне.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <button
            onClick={openQuiz}
            className="w-full sm:w-auto rounded-full px-8 py-4 text-base font-bold bg-accent text-ink hover:bg-accent-glow transition-all shadow-2xl shadow-accent/30 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <Calculator className="w-5 h-5" /> Рассчитать за 2 минуты
          </button>
          <button
            onClick={() =>
              openLead({
                source: "hero-engineer",
                title: "Бесплатный выезд инженера",
                subtitle: "Приедем, осмотрим объект, покажем картинку с камер на планшете и составим смету на месте.",
                cta: "Вызвать инженера бесплатно",
                fields: ["name", "phone", "object"],
                bonus: "Бонус: 3D-схема расположения камер в подарок.",
              })
            }
            className="w-full sm:w-auto rounded-full px-8 py-4 text-base font-semibold glass text-white hover:bg-white/15 transition-all hover:scale-105 active:scale-95"
          >
            Вызвать инженера бесплатно
          </button>
        </motion.div>
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          href={SITE.phoneHref}
          className="mt-4 text-white/70 text-sm flex items-center gap-2 hover:text-white"
        >
          <Phone className="w-4 h-4" /> или позвоните: <b className="text-white">{SITE.phone}</b>
        </motion.a>

        {/* trust chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-10 grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-[720px]"
        >
          {[
            { icon: ShieldCheck, v: STATS.objectsProtected.toLocaleString("ru-RU") + "+", l: "объектов под защитой" },
            { icon: Clock, v: "с " + SITE.since, l: "работаем в Москве и МО" },
            { icon: Star, v: STATS.intrusionsPrevented.toLocaleString("ru-RU"), l: "вторжений предотвращено" },
          ].map((c) => (
            <div key={c.l} className="glass rounded-2xl px-3 py-3 sm:px-4 sm:py-4 text-left">
              <c.icon className="w-4 h-4 text-accent mb-1.5" />
              <div className="font-display font-bold text-white text-lg sm:text-2xl leading-none">{c.v}</div>
              <div className="text-white/60 text-[11px] sm:text-xs mt-1 leading-tight">{c.l}</div>
            </div>
          ))}
        </motion.div>

        {/* Brands */}
        <motion.div
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.7 } } }}
          initial="hidden"
          animate="show"
          className="mt-12 md:mt-16 w-full max-w-4xl"
        >
          <p className="text-[11px] tracking-[0.25em] uppercase text-white/40 mb-4">Работаем с оборудованием</p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-3 opacity-50 hover:opacity-90 transition-opacity duration-500">
            {BRANDS.map((b) => (
              <motion.span
                key={b}
                variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                whileHover={{ scale: 1.08, opacity: 1 }}
                className="font-display font-bold text-white text-lg tracking-wide"
              >
                {b}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LiveClock() {
  const [t, setT] = React.useState("");
  useEffect(() => {
    const f = () => {
      const d = new Date();
      setT(
        d.toLocaleDateString("ru-RU") +
          " " +
          d.toLocaleTimeString("ru-RU", { hour12: false }),
      );
    };
    f();
    const i = setInterval(f, 1000);
    return () => clearInterval(i);
  }, []);
  return <div className="absolute top-0 right-9 font-mono text-[11px] tracking-[0.15em] text-white/60">{t}</div>;
}
