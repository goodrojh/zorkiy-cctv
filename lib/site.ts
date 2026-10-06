/** Контакты и реквизиты. Правьте только здесь — подставятся по всему сайту. */
const PHONE_DIGITS = "79251279113";

export const SITE = {
  brand: "ЗОРКИЙ",
  tagline: "Видеонаблюдение под ключ в Москве и области",

  phone: "+7 (925) 127-91-13",
  phoneHref: "tel:+" + PHONE_DIGITS,

  // Мессенджеры на том же номере
  whatsapp: "https://wa.me/" + PHONE_DIGITS,
  telegram: "https://t.me/+" + PHONE_DIGITS,
  max: "https://max.ru/u/f9LHodD0cOIIimPBnPKCPGd1iCQVKtfDh_Bd2q1Zdn8K-CY4X-QP1C5V1wE",

  email: "info@vidzhio.ru",
  address: "Москва, ул. Складочная, 1с18",
  hours: "Ежедневно 8:00–22:00",
  since: 2014,

  /** Юрлицо-оператор персональных данных (для политики и футера) */
  legal: {
    name: "ООО «Зоркий»",
    inn: "7712345678",
    ogrn: "1147746000000",
    address: "127018, г. Москва, ул. Складочная, д. 1, стр. 18",
  },

  /**
   * Приём заявок: URL веб-приложения Google Apps Script.
   * Скрипт пишет заявку в Google-таблицу и дублирует письмом на SITE.email.
   * Исходник и инструкция — scripts/apps-script/Code.gs.
   */
  leadWebhook: process.env.NEXT_PUBLIC_LEAD_WEBHOOK || "",

  /** Номер счётчика Яндекс.Метрики (например, 99999999). Пусто — счётчик не подключается. */
  metrikaId: process.env.NEXT_PUBLIC_YM_ID || "",
};

export const LEGAL_UPDATED = "6 октября 2026 г.";

/** Живая статистика. Замените на реальные цифры из CRM. */
export const STATS = {
  intrusionsPrevented: 1214,
  theftsPrevented: 386,
  objectsProtected: 2470,
  camerasInstalled: 18930,
  avgReactionMin: 4,
  archiveHours: 97300,
};

export const base = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}${p}`;
export const media = (p: string) => base(`/media/${p}`);
