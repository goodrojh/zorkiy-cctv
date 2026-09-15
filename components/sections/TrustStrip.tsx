"use client";

import React from "react";
import { motion } from "@/lib/motion";
import { BadgeCheck, FileSignature, Wallet, ShieldCheck } from "lucide-react";

const ITEMS = [
  { icon: BadgeCheck, t: "Выезд инженера — 0 ₽", d: "по Москве и до 100 км от МКАД, даже если откажетесь" },
  { icon: FileSignature, t: "Смета за 24 часа", d: "цена фиксируется в договоре и не растёт" },
  { icon: Wallet, t: "Оплата после установки", d: "когда сами увидели картинку в телефоне" },
  { icon: ShieldCheck, t: "Гарантия 3 года", d: "на работы; на оборудование — до 5 лет" },
];

export default function TrustStrip() {
  return (
    <section className="bg-white px-5 md:px-10 -mt-10 relative z-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-px bg-gray-200 rounded-[24px] overflow-hidden border border-gray-200 shadow-xl shadow-ink/5"
      >
        {ITEMS.map((i) => (
          <div key={i.t} className="bg-white p-5 md:p-7 flex flex-col gap-3 hover:bg-[#F6F8F7] transition-colors">
            <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center">
              <i.icon className="w-5 h-5 text-accent-dark" />
            </div>
            <div className="font-display font-bold text-night text-[15px] md:text-lg leading-tight">{i.t}</div>
            <div className="text-[12px] md:text-[13px] text-gray-500 leading-snug">{i.d}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
