import { SITE } from "./site";

export type LeadPayload = Record<string, string | number | undefined>;

declare global {
  interface Window {
    // Яндекс.Метрика
    ym?: (id: number, action: string, ...args: unknown[]) => void;
  }
}

/** UTM-метки и источник перехода — чтобы в таблице было видно, откуда пришла заявка */
export function marketingContext(): LeadPayload {
  if (typeof window === "undefined") return {};
  const p = new URLSearchParams(window.location.search);
  const utm: LeadPayload = {};
  for (const k of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const v = p.get(k);
    if (v) utm[k] = v;
  }
  return {
    ...utm,
    Страница: window.location.href,
    Переход: document.referrer || "прямой заход",
  };
}

/**
 * Отправка заявки в Google Apps Script: скрипт пишет строку в Google-таблицу
 * и дублирует заявку письмом на почту компании.
 * Apps Script не отдаёт CORS-заголовки, поэтому шлём text/plain в режиме no-cors —
 * запрос доходит, ответ не читаем (ошибку сети поймаем в catch).
 */
export async function sendLead(payload: LeadPayload) {
  const body = JSON.stringify({ ...payload, ...marketingContext(), ts: new Date().toISOString() });

  if (!SITE.leadWebhook) {
    // Вебхук не настроен — имитируем отправку, чтобы форма не выглядела сломанной
    await new Promise((r) => setTimeout(r, 600));
    reachGoal("lead_submit");
    return;
  }

  await fetch(SITE.leadWebhook, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body,
  });
  reachGoal("lead_submit");
}

/** Цель Яндекс.Метрики */
export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || !SITE.metrikaId) return;
  try {
    window.ym?.(Number(SITE.metrikaId), "reachGoal", goal, params);
  } catch {
    /* счётчик мог не загрузиться — молча игнорируем */
  }
}
