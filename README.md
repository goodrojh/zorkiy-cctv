# ЗОРКИЙ — сайт компании по установке видеонаблюдения (Москва и МО)

Next.js 15 (App Router, static export) + Tailwind CSS + framer-motion + lucide-react.

## Запуск

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # статика в /out
```

## Приём заявок: Google-таблица + почта

Сайт статический, поэтому заявки принимает Google Apps Script — он пишет строку в Google-таблицу
и дублирует заявку письмом на `info@vidzhio.ru`.

1. Создайте Google-таблицу, лист назовите «Заявки».
2. Расширения → Apps Script → вставьте `scripts/apps-script/Code.gs`.
3. Развернуть → Веб-приложение → запуск от своего имени, доступ «У всех» → скопируйте URL `.../exec`.
4. Положите URL в `NEXT_PUBLIC_LEAD_WEBHOOK` (см. `.env.example`) и пересоберите сайт.

Проверка: в редакторе Apps Script запустите функцию `testLead` — должна появиться строка в таблице и письмо.
Пока переменная пустая, форма работает, но заявка никуда не уходит.

## Яндекс.Метрика

Положите номер счётчика в `NEXT_PUBLIC_YM_ID`. Подключается с вебвизором и картой кликов.
Цели, которые отправляет сайт: `lead_submit` (отправлена заявка), `click_phone`,
`click_whatsapp`, `click_telegram`, `click_max`.

## Юридические страницы

`/privacy/` — политика обработки ПДн, `/consent/` — текст согласия. Перед запуском проверьте
реквизиты юрлица в `lib/site.ts` → `SITE.legal` (сейчас там заглушки ИНН/ОГРН).

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
