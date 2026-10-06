"use client";

import React from "react";
import { SITE } from "@/lib/site";

export function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.09 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.8h-.02a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.71.97.99-3.62-.23-.37a9.78 9.78 0 0 1-1.5-5.22c0-5.4 4.4-9.8 9.82-9.8 2.62 0 5.08 1.03 6.93 2.88a9.74 9.74 0 0 1 2.87 6.93c0 5.4-4.4 9.81-9.8 9.81M20.52 3.45A11.7 11.7 0 0 0 12.05 0C5.56 0 .28 5.28.28 11.76c0 2.07.54 4.1 1.57 5.88L.18 24l6.5-1.7a11.73 11.73 0 0 0 5.37 1.36h.01c6.48 0 11.76-5.28 11.76-11.76 0-3.14-1.22-6.1-3.44-8.32" />
    </svg>
  );
}

export function TelegramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M11.99 0C5.37 0 0 5.37 0 12s5.37 12 11.99 12C18.62 24 24 18.63 24 12S18.62 0 11.99 0m5.56 8.22-1.86 8.76c-.14.62-.51.78-1.03.48l-2.85-2.1-1.37 1.32c-.15.15-.28.28-.58.28l.21-2.92 5.32-4.8c.23-.21-.05-.32-.36-.12L8.46 12.3l-2.83-.89c-.62-.19-.63-.62.13-.92l11.04-4.26c.51-.19.96.12.75.99" />
    </svg>
  );
}

/** Логотип МАКС — упрощённый знак «M» в скруглённом квадрате */
export function MaxIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 18V7.2c0-.9 1.1-1.3 1.7-.6L12 13.2l6.3-6.6c.6-.7 1.7-.3 1.7.6V18"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export const MESSENGERS = [
  { id: "whatsapp", label: "WhatsApp", href: SITE.whatsapp, Icon: WhatsAppIcon, bg: "#25D366", fg: "#08140C" },
  { id: "telegram", label: "Telegram", href: SITE.telegram, Icon: TelegramIcon, bg: "#2AABEE", fg: "#04202E" },
  { id: "max", label: "МАКС", href: SITE.max, Icon: MaxIcon, bg: "#7C5CFF", fg: "#120A2E" },
] as const;

/** Ряд кнопок мессенджеров. tone: light — на тёмном фоне, brand — в фирменных цветах */
export default function Messengers({
  tone = "brand",
  size = "md",
  className = "",
  prefix,
}: {
  tone?: "brand" | "light";
  size?: "sm" | "md";
  className?: string;
  /** текст, который подставится в сообщение (для WhatsApp) */
  prefix?: string;
}) {
  return (
    <div className={"flex flex-wrap gap-2 " + className}>
      {MESSENGERS.map((m) => (
        <a
          key={m.id}
          href={m.id === "whatsapp" && prefix ? m.href + "?text=" + encodeURIComponent(prefix) : m.href}
          target="_blank"
          rel="noreferrer"
          aria-label={m.label}
          style={tone === "brand" ? { background: m.bg, color: m.fg } : undefined}
          className={
            "inline-flex items-center gap-2 rounded-full font-bold transition hover:brightness-105 active:scale-95 " +
            (size === "sm" ? "px-3 py-1.5 text-[12px]" : "px-4 py-2.5 text-[14px]") +
            (tone === "light" ? " bg-white/10 border border-white/20 text-white hover:bg-white/20" : "")
          }
        >
          <m.Icon className={size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4"} />
          {m.label}
        </a>
      ))}
    </div>
  );
}
