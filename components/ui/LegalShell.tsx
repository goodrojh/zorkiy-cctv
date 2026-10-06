import React from "react";
import { SITE, base, LEGAL_UPDATED } from "@/lib/site";

export default function LegalShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-white">
      <header className="bg-ink text-white px-5 md:px-10 pt-8 pb-10">
        <div className="max-w-3xl mx-auto">
          <a href={base("/")} className="inline-flex items-center gap-2.5 select-none">
            <span className="relative w-8 h-8 rounded-lg bg-accent flex items-center justify-center overflow-hidden">
              <span className="w-3.5 h-3.5 rounded-full border-[3px] border-ink" />
              <span className="absolute w-1 h-1 rounded-full bg-ink" />
            </span>
            <span className="font-display font-bold text-[20px] tracking-[0.12em] text-white">ЗОРКИЙ</span>
          </a>
          <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-[40px] leading-[1.15] mt-7">{title}</h1>
          <p className="mt-3 text-white/50 text-sm">
            Редакция от {LEGAL_UPDATED} · {SITE.legal.name}
          </p>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-5 md:px-10 py-10 md:py-14 text-[15px] leading-[1.75] text-gray-700 legal">
        {children}
      </article>

      <footer className="border-t border-gray-200 px-5 md:px-10 py-8">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 justify-between text-[13px] text-gray-500">
          <a href={base("/")} className="font-semibold text-night hover:text-accent-dark">
            ← Вернуться на сайт
          </a>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <a href={base("/privacy/")} className="hover:text-night">
              Политика обработки ПДн
            </a>
            <a href={base("/consent/")} className="hover:text-night">
              Согласие на обработку
            </a>
            <a href={"mailto:" + SITE.email} className="hover:text-night">
              {SITE.email}
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
