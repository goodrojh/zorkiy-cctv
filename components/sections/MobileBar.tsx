"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Calculator } from "lucide-react";
import { SITE } from "@/lib/site";
import { MESSENGERS } from "@/components/ui/Messengers";
import { useQuiz } from "@/components/ui/QuizModal";
import { reachGoal } from "@/lib/lead";

/** Липкая панель на мобильных: пульсирующая трубка, мессенджеры логотипами, расчёт. */
export default function MobileBar() {
  const { openQuiz } = useQuiz();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 400);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      {/* отступ под липкую панель, чтобы она не перекрывала конец страницы */}
      <div className="md:hidden h-[72px]" aria-hidden="true" />
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ y: 90 }}
            animate={{ y: 0 }}
            exit={{ y: 90 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed bottom-0 inset-x-0 z-40 px-2 pt-2 pb-[max(8px,env(safe-area-inset-bottom))]"
          >
            <div
              className="rounded-2xl p-1.5 flex items-center gap-1.5 shadow-[0_-4px_30px_rgba(0,0,0,0.35)] border border-white/10"
              style={{ background: "#080B12" }}
            >
              {/* Трубка — пульсирует, чтобы притягивать взгляд */}
              <a
                href={SITE.phoneHref}
                onClick={() => reachGoal("click_phone")}
                aria-label={"Позвонить " + SITE.phone}
                className="phone-pulse relative w-11 h-11 shrink-0 rounded-full bg-accent text-ink flex items-center justify-center"
              >
                <Phone className="w-[19px] h-[19px] relative z-10" fill="currentColor" strokeWidth={0} />
              </a>

              {/* разделитель: слева — звонок, справа — переписка */}
              <span className="w-px h-7 bg-white/15 shrink-0" aria-hidden="true" />

              {MESSENGERS.map((m) => (
                <a
                  key={m.id}
                  href={m.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => reachGoal("click_" + m.id)}
                  aria-label={m.label}
                  style={m.raster ? undefined : { background: m.bg, color: m.fg }}
                  className={
                    "w-11 h-11 shrink-0 flex items-center justify-center active:scale-95 transition-transform " +
                    (m.raster ? "" : "rounded-full")
                  }
                >
                  <m.Icon className={m.raster ? "w-11 h-11" : "w-[22px] h-[22px]"} />
                </a>
              ))}

              <button
                onClick={openQuiz}
                className="flex-1 min-w-0 h-11 rounded-full bg-white text-ink flex items-center justify-center gap-1.5 text-[13px] font-bold active:scale-95 transition-transform"
              >
                <Calculator className="w-4 h-4 shrink-0" />
                <span className="truncate">Рассчитать</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
