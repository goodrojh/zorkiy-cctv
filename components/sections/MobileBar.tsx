"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, Calculator } from "lucide-react";
import { SITE } from "@/lib/site";
import { MESSENGERS } from "@/components/ui/Messengers";
import { useQuiz } from "@/components/ui/QuizModal";
import { reachGoal } from "@/lib/lead";

/** Липкая панель действий на мобильных: звонок, расчёт и три мессенджера. */
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
      <div className="md:hidden h-[124px]" aria-hidden="true" />
      <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 120 }}
          animate={{ y: 0 }}
          exit={{ y: 120 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="md:hidden fixed bottom-0 inset-x-0 z-40 p-2 pb-[max(8px,env(safe-area-inset-bottom))]"
        >
          <div
            className="rounded-2xl p-1.5 flex flex-col gap-1.5 shadow-[0_-4px_30px_rgba(0,0,0,0.35)] border border-white/10"
            style={{ background: "#080B12" }}
          >
            <div className="grid grid-cols-2 gap-1.5">
              <a
                href={SITE.phoneHref}
                onClick={() => reachGoal("click_phone")}
                className="h-12 rounded-xl bg-white/15 border border-white/15 text-white flex items-center justify-center gap-2 text-[14px] font-semibold"
              >
                <Phone className="w-4 h-4" /> Позвонить
              </a>
              <button
                onClick={openQuiz}
                className="h-12 rounded-xl bg-accent text-ink flex items-center justify-center gap-2 text-[14px] font-bold"
              >
                <Calculator className="w-4 h-4" /> Рассчитать
              </button>
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {MESSENGERS.map((m) => (
                <a
                  key={m.id}
                  href={m.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => reachGoal("click_" + m.id)}
                  style={{ background: m.bg, color: m.fg }}
                  className="h-11 rounded-xl flex items-center justify-center gap-1.5 text-[13px] font-bold"
                >
                  <m.Icon className="w-4 h-4" /> {m.label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
