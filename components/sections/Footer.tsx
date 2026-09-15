"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, Check } from "lucide-react";
import { SITE, media } from "@/lib/site";
import { Logo } from "./Nav";
import { useLead } from "@/components/ui/LeadProvider";

export default function Footer() {
  const { openLead } = useLead();
  const [phone, setPhone] = useState("");

  const quick = (e: React.FormEvent) => {
    e.preventDefault();
    openLead({
      source: "footer-quick",
      title: "Смета за 24 часа",
      subtitle: "Уточним пару деталей — и инженер пришлёт расчёт в мессенджер уже завтра.",
      cta: "Получить смету",
      fields: ["name", "phone", "object"],
      extra: phone ? { "Телефон из футера": phone } : undefined,
    });
  };

  return (
    <section className="w-full">
      <div className="m-2 rounded-[20px] overflow-hidden relative min-h-[90vh] flex flex-col">
        <div className="absolute inset-0 z-0">
          <img src={media("monitoring.webp")} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-ink/70" />
        </div>

        {/* Row 1 — CTA */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 md:px-20 pt-20 pb-10 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-[40px] sm:text-[56px] md:text-[80px] font-bold text-white leading-[0.98] tracking-[-0.02em]"
          >
            Спокойно спать <br /> <span className="text-accent">можно уже завтра.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-5 text-white/70 max-w-lg"
          >
            Оставьте номер — инженер перезвонит за 15 минут, приедет бесплатно и пришлёт смету за 24 часа.
          </motion.p>

          <motion.form
            onSubmit={quick}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-8 w-full max-w-[560px] h-16 glass rounded-full flex overflow-hidden p-1.5"
          >
            <input
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+7 (___) ___-__-__"
              className="flex-1 min-w-0 bg-transparent px-5 text-[15px] text-white placeholder:text-white/50 outline-none border-none font-mono"
            />
            <button type="submit" className="h-full px-5 sm:px-8 bg-accent text-ink rounded-full text-[13px] font-bold tracking-[0.08em] hover:bg-accent-glow transition-colors whitespace-nowrap flex items-center gap-2">
              <Send className="w-4 h-4" /> <span className="hidden sm:inline">ПОЛУЧИТЬ СМЕТУ</span><span className="sm:hidden">СМЕТА</span>
            </button>
          </motion.form>
          <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-1 text-[12px] text-white/50">
            {["Без предоплаты", "Гарантия 3 года", "Цена не меняется"].map((t) => (
              <span key={t} className="flex items-center gap-1">
                <Check className="w-3 h-3 text-accent" /> {t}
              </span>
            ))}
          </div>
        </div>

        {/* Row 2 — footer bar */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 glass rounded-[24px] mx-3 mb-3 md:mx-5 md:mb-5 p-6 md:p-10 shadow-2xl"
        >
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
            <div>
              <Logo />
              <p className="mt-3 text-white/55 text-[13px] leading-relaxed max-w-[280px]">
                Установка и обслуживание систем видеонаблюдения в Москве и Московской области с {SITE.since} года. Своя
                монтажная служба, гарантия 3 года.
              </p>
              <p className="mt-3 text-white/35 text-[11px]">ООО «Зоркий» · ИНН 7712345678 · ОГРН 1147746000000</p>
            </div>
            <div>
              <h4 className="text-white text-[13px] font-semibold mb-3">Услуги</h4>
              <ul className="space-y-2">
                {[
                  ["Видеонаблюдение для дома", "#solutions"],
                  ["Для магазина и офиса", "#solutions"],
                  ["Для склада и производства", "#solutions"],
                  ["Распознавание номеров", "#features"],
                  ["Обслуживание и ремонт", "#compare"],
                ].map(([l, h]) => (
                  <li key={l}>
                    <a href={h} className="text-white/60 text-[13px] hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[13px] font-semibold mb-3">Компания</h4>
              <ul className="space-y-2">
                {[
                  ["Кейсы", "#cases"],
                  ["Отзывы", "#reviews"],
                  ["Цены", "#pricing"],
                  ["Вопросы", "#faq"],
                  ["География", "#coverage"],
                ].map(([l, h]) => (
                  <li key={l}>
                    <a href={h} className="text-white/60 text-[13px] hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white text-[13px] font-semibold mb-3">Контакты</h4>
              <ul className="space-y-2.5 text-[13px]">
                <li>
                  <a href={SITE.phoneHref} className="flex items-center gap-2 text-white font-semibold hover:text-accent">
                    <Phone className="w-4 h-4 text-accent" /> {SITE.phone}
                  </a>
                </li>
                <li>
                  <a href={"mailto:" + SITE.email} className="flex items-center gap-2 text-white/70 hover:text-white">
                    <Mail className="w-4 h-4 text-accent" /> {SITE.email}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-white/70">
                  <MapPin className="w-4 h-4 text-accent" /> {SITE.address}
                </li>
                <li className="flex items-center gap-2 text-white/70">
                  <Clock className="w-4 h-4 text-accent" /> {SITE.hours}
                </li>
              </ul>
              <div className="mt-4 flex gap-2">
                <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 text-[12px] text-white font-semibold hover:bg-[#25D366]/30">
                  WhatsApp
                </a>
                <a href={SITE.telegram} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-[12px] text-white font-semibold hover:bg-sky-500/30">
                  Telegram
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-[12px] text-white/40">
            <span>© {new Date().getFullYear()} ЗОРКИЙ. Видеонаблюдение под ключ в Москве и МО.</span>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1">
              <a href="#" className="hover:text-white">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white">Договор-оферта</a>
            </div>
            <a
              href="https://odinpotok.ru"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 hover:text-white transition-colors"
            >
              Сайт разработан компанией{" "}
              <span className="font-semibold text-white/70 group-hover:text-accent underline decoration-white/20 underline-offset-4 group-hover:decoration-accent transition-colors">
                Один поток
              </span>
              <span className="text-[10px] transition-transform group-hover:translate-x-0.5">↗</span>
            </a>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
