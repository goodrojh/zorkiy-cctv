"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { useLead } from "@/components/ui/LeadProvider";

const LINKS = [
  { label: "Решения", href: "#solutions" },
  { label: "Как работаем", href: "#how" },
  { label: "Цены", href: "#pricing" },
  { label: "Кейсы", href: "#cases" },
  { label: "Вопросы", href: "#faq" },
];

export function Logo({ light = true }: { light?: boolean }) {
  return (
    <a href="#top" className="flex items-center gap-2.5 select-none">
      <span className="relative w-8 h-8 rounded-lg bg-accent flex items-center justify-center overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
        <span className="w-3.5 h-3.5 rounded-full border-[3px] border-ink" />
        <span className="absolute w-1 h-1 rounded-full bg-ink" />
      </span>
      <span className={"font-display font-bold text-[20px] tracking-[0.12em] " + (light ? "text-white" : "text-night")}>
        ЗОРКИЙ
      </span>
    </a>
  );
}

export default function Nav() {
  const { openLead } = useLead();
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 inset-x-0 z-50 px-4 md:px-8 pt-4 md:pt-6 pointer-events-none"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between p-[8px] pl-4 rounded-full bg-ink/40 backdrop-blur-xl border border-white/10 pointer-events-auto">
        <Logo />

        <div className="hidden lg:flex items-center gap-7">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[14px] font-medium text-white/70 hover:text-white transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href={SITE.phoneHref}
            className="hidden xl:flex items-center gap-2 text-[14px] font-semibold text-white px-3 py-2 hover:text-accent transition-colors"
          >
            <Phone className="w-4 h-4" /> {SITE.phone}
          </a>
          <button
            onClick={() =>
              openLead({
                source: "nav-call",
                title: "Заказать звонок инженера",
                subtitle: "Перезвоним за 15 минут, ответим на вопросы и назовём ориентировочную цену по телефону.",
                cta: "Жду звонка",
                fields: ["name", "phone", "time"],
              })
            }
            className="hidden sm:inline-flex rounded-full px-4 md:px-5 py-2.5 text-[14px] font-semibold bg-accent text-ink hover:bg-accent-glow transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Заказать звонок
          </button>
          <a href={SITE.phoneHref} aria-label="Позвонить" className="sm:hidden w-10 h-10 rounded-full bg-accent text-ink flex items-center justify-center">
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={() => setOpen(true)}
            aria-label="Меню"
            className="lg:hidden w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-ink/95 backdrop-blur-xl pointer-events-auto flex flex-col p-6"
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button onClick={() => setOpen(false)} aria-label="Закрыть" className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="mt-12 flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="font-display text-3xl font-bold text-white py-3 border-b border-white/10"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>
            <div className="mt-auto flex flex-col gap-3">
              <a href={SITE.phoneHref} className="h-14 rounded-full bg-white text-ink font-bold flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" /> {SITE.phone}
              </a>
              <p className="text-center text-white/50 text-sm">{SITE.hours} · Москва и МО</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
