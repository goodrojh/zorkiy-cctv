"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Phone, MessageCircle, Calculator } from "lucide-react";
import { SITE } from "@/lib/site";
import { useQuiz } from "@/components/ui/QuizModal";

/** Липкая панель действий на мобильных: звонок, WhatsApp, расчёт. */
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
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          exit={{ y: 80 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="md:hidden fixed bottom-0 inset-x-0 z-40 p-2 pb-[max(8px,env(safe-area-inset-bottom))]"
        >
          <div className="rounded-2xl p-1.5 grid grid-cols-[1fr_1fr_1.4fr] gap-1.5 shadow-[0_-4px_30px_rgba(0,0,0,0.35)] border border-white/10" style={{ background: "rgba(8,11,18,0.96)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
            <a href={SITE.phoneHref} className="h-12 rounded-xl bg-white/15 border border-white/15 text-white flex items-center justify-center gap-1.5 text-[13px] font-semibold">
              <Phone className="w-4 h-4" /> Звонок
            </a>
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="h-12 rounded-xl bg-[#25D366] text-ink flex items-center justify-center gap-1.5 text-[13px] font-bold">
              <MessageCircle className="w-4 h-4" /> WhatsApp
            </a>
            <button onClick={openQuiz} className="h-12 rounded-xl bg-accent text-ink flex items-center justify-center gap-1.5 text-[13px] font-bold">
              <Calculator className="w-4 h-4" /> Рассчитать
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
