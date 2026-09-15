"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Phone, Check, ShieldCheck, Send, Loader2, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";
import PhoneInput, { formatRuPhone, isPhoneComplete } from "./PhoneInput";

export type LeadConfig = {
  /** уникальный идентификатор формы — попадает в заявку как источник */
  source: string;
  title: string;
  subtitle?: string;
  /** подпись на кнопке отправки */
  cta?: string;
  /** какие поля показывать */
  fields?: Array<"name" | "phone" | "object" | "comment" | "time">;
  /** что получит клиент после отправки */
  bonus?: string;
  /** дополнительные данные (тариф, результат квиза и т.п.) */
  extra?: Record<string, string | number>;
  /** акцентный цвет: green — обычная заявка, red — «срочно» */
  tone?: "green" | "red";
};

type Ctx = { openLead: (cfg: LeadConfig) => void; close: () => void };

const LeadCtx = createContext<Ctx | null>(null);

export function useLead() {
  const ctx = useContext(LeadCtx);
  if (!ctx) throw new Error("useLead must be used inside LeadProvider");
  return ctx;
}

const OBJECT_TYPES = [
  "Частный дом / дача",
  "Квартира / подъезд",
  "Офис",
  "Магазин / кафе",
  "Склад / производство",
  "Стройплощадка",
  "СНТ / КПП / парковка",
  "Другое",
];

const TIMES = ["Как можно скорее", "Сегодня до 14:00", "Сегодня после 14:00", "Завтра утром", "Завтра днём"];

export function LeadProvider({ children }: { children: React.ReactNode }) {
  const [cfg, setCfg] = useState<LeadConfig | null>(null);
  const openLead = useCallback((c: LeadConfig) => setCfg(c), []);
  const close = useCallback(() => setCfg(null), []);
  const value = useMemo(() => ({ openLead, close }), [openLead, close]);

  useEffect(() => {
    if (!cfg) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cfg, close]);

  return (
    <LeadCtx.Provider value={value}>
      {children}
      <AnimatePresence>{cfg && <LeadModal key={cfg.source} cfg={cfg} onClose={close} />}</AnimatePresence>
    </LeadCtx.Provider>
  );
}

function LeadModal({ cfg, onClose }: { cfg: LeadConfig; onClose: () => void }) {
  const fields = cfg.fields ?? ["name", "phone", "object"];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [object, setObject] = useState(OBJECT_TYPES[0]);
  const [time, setTime] = useState(TIMES[0]);
  const [comment, setComment] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  const tone = cfg.tone === "red" ? "bg-alert" : "bg-accent";
  const toneText = cfg.tone === "red" ? "text-alert" : "text-accent";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneComplete(phone)) {
      setErr("Введите номер полностью — мы перезвоним на него");
      return;
    }
    setErr("");
    setState("sending");
    const payload = {
      source: cfg.source,
      title: cfg.title,
      name,
      phone: formatRuPhone(phone),
      object: fields.includes("object") ? object : undefined,
      time: fields.includes("time") ? time : undefined,
      comment: fields.includes("comment") ? comment : undefined,
      ...cfg.extra,
      page: typeof window !== "undefined" ? window.location.href : "",
      ts: new Date().toISOString(),
    };
    try {
      if (SITE.leadWebhook) {
        await fetch(SITE.leadWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await new Promise((r) => setTimeout(r, 700));
      }
      setState("done");
    } catch {
      setState("error");
    }
  };

  const waText = encodeURIComponent(
    `Здравствуйте! Заявка с сайта (${cfg.title}).\nИмя: ${name || "—"}\nТелефон: ${phone ? formatRuPhone(phone) : "—"}\nОбъект: ${object}` +
      (cfg.extra ? "\n" + Object.entries(cfg.extra).map(([k, v]) => `${k}: ${v}`).join("\n") : ""),
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-ink/80 backdrop-blur-sm" />
      <motion.div
        initial={{ y: 40, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 320, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={cfg.title}
        className="relative w-full sm:max-w-[520px] max-h-[92vh] overflow-y-auto bg-white rounded-t-[28px] sm:rounded-[28px] shadow-2xl"
      >
        {/* header */}
        <div className="relative px-6 pt-6 pb-5 bg-night text-white rounded-t-[28px] overflow-hidden">
          <div className={"absolute -top-20 -right-20 w-56 h-56 rounded-full blur-[70px] opacity-40 " + tone} />
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2 mb-3">
            <span className={"w-2 h-2 rounded-full rec-dot " + tone} />
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-white/60">{cfg.source}</span>
          </div>
          <h3 className="font-display text-2xl font-bold leading-tight pr-10">{cfg.title}</h3>
          {cfg.subtitle && <p className="mt-2 text-sm text-white/70 leading-relaxed">{cfg.subtitle}</p>}
        </div>

        {state === "done" ? (
          <div className="px-6 py-10 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mb-4">
              <Check className="w-8 h-8 text-accent-dark stroke-[3]" />
            </div>
            <h4 className="font-display text-2xl font-bold">Заявка принята</h4>
            <p className="mt-2 text-gray-500 text-sm leading-relaxed">
              Инженер перезвонит в течение <b className="text-night">15 минут</b> в рабочее время ({SITE.hours}).
              {cfg.bonus && (
                <>
                  <br />
                  <span className={toneText + " font-semibold"}>{cfg.bonus}</span>
                </>
              )}
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <a
                href={SITE.whatsapp + "?text=" + waText}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 bg-[#25D366] text-white font-semibold text-sm hover:brightness-95"
              >
                <MessageCircle className="w-4 h-4" /> Продублировать в WhatsApp
              </a>
              <button onClick={onClose} className="text-sm text-gray-500 hover:text-night py-2">
                Закрыть
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submit} className="px-6 py-6 flex flex-col gap-4">
            {fields.includes("name") && (
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Как к вам обращаться</span>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Имя"
                  autoComplete="name"
                  className="h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition"
                />
              </label>
            )}
            {fields.includes("phone") && (
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Телефон *</span>
                <PhoneInput
                  value={phone}
                  onChange={setPhone}
                  required
                  className="h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition font-mono"
                />
              </label>
            )}
            {fields.includes("object") && (
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Тип объекта</span>
                <div className="flex flex-wrap gap-2">
                  {OBJECT_TYPES.map((o) => (
                    <button
                      type="button"
                      key={o}
                      onClick={() => setObject(o)}
                      className={
                        "px-3 py-1.5 rounded-full text-[13px] border transition " +
                        (object === o
                          ? "bg-night text-white border-night"
                          : "bg-white text-gray-700 border-gray-200 hover:border-gray-400")
                      }
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </label>
            )}
            {fields.includes("time") && (
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Когда позвонить</span>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="h-12 rounded-xl border border-gray-200 px-4 outline-none focus:border-accent bg-white"
                >
                  {TIMES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
            )}
            {fields.includes("comment") && (
              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Комментарий</span>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder="Адрес, количество камер, что важно"
                  className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-accent focus:ring-4 focus:ring-accent/15 transition resize-none"
                />
              </label>
            )}

            {err && <p className="text-sm text-alert -mt-1">{err}</p>}
            {state === "error" && (
              <p className="text-sm text-alert">Не удалось отправить. Позвоните нам: {SITE.phone}</p>
            )}

            <button
              type="submit"
              disabled={state === "sending"}
              className={
                "mt-1 h-14 rounded-full font-bold text-[15px] text-white flex items-center justify-center gap-2 transition hover:brightness-110 active:scale-[0.98] disabled:opacity-70 " +
                (cfg.tone === "red" ? "bg-alert shadow-lg shadow-alert/30" : "bg-night shadow-lg shadow-night/30")
              }
            >
              {state === "sending" ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-4 h-4" />}
              {cfg.cta ?? "Отправить заявку"}
            </button>

            <div className="flex items-center justify-between gap-3 text-[12px] text-gray-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-accent-dark" /> Без спама. Только один звонок инженера.
              </span>
              <a href={SITE.phoneHref} className="flex items-center gap-1 font-semibold text-night whitespace-nowrap">
                <Phone className="w-3.5 h-3.5" /> Позвонить
              </a>
            </div>
          </form>
        )}
      </motion.div>
    </motion.div>
  );
}
