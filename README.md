# ЗОРКИЙ — сайт компании по установке видеонаблюдения (Москва и МО)

Next.js 15 (App Router, static export) + Tailwind CSS + framer-motion + lucide-react.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # статика в /out
```

## Что настроить перед запуском

- `lib/site.ts` — телефон, WhatsApp, Telegram, email, адрес, часы работы, реквизиты.
- `lib/site.ts` → `STATS` — цифры «предотвращено вторжений / краж» и т.д. (сейчас демо-значения).
- `NEXT_PUBLIC_LEAD_WEBHOOK` — URL, куда POST-ом уходят заявки (JSON). Пока не задан — после отправки
  клиенту предлагается продублировать заявку в WhatsApp.
- Фото/видео в `public/media` сгенерированы (Nano Banana Pro + Kling 3.0) — замените на реальные объекты по мере появления.

## Деплой

GitHub Pages из ветки `gh-pages`:

```bash
GH_REPO=zorkiy-cctv NEXT_PUBLIC_BASE_PATH=/zorkiy-cctv npm run build
npx gh-pages -d out -t
```

## Формы

Каждая кнопка открывает собственную модалку с уникальным `source` (см. `components/ui/LeadProvider.tsx`),
поэтому в CRM видно, из какого блока пришла заявка. Калькулятор — `components/ui/QuizModal.tsx`.
