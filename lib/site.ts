export const SITE = {
  brand: "ЗОРКИЙ",
  tagline: "Видеонаблюдение под ключ в Москве и области",
  phone: "+7 (495) 120-45-45",
  phoneHref: "tel:+74951204545",
  whatsapp: "https://wa.me/79991204545",
  telegram: "https://t.me/zorkiy_msk",
  email: "hello@zorkiy.pro",
  address: "Москва, ул. Складочная, 1с18",
  hours: "Ежедневно 8:00–22:00",
  since: 2014,
  // Куда отправлять заявки (Telegram-бот / CRM). Пусто — заявка уйдёт в WhatsApp.
  leadWebhook: process.env.NEXT_PUBLIC_LEAD_WEBHOOK || "",
};

/** Живая статистика. Замените на реальные цифры из CRM. */
export const STATS = {
  intrusionsPrevented: 1214,
  theftsPrevented: 386,
  objectsProtected: 2470,
  camerasInstalled: 18930,
  avgReactionMin: 4,
  archiveHours: 97300,
};

export const media = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/media/${p}`;
