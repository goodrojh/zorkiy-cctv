import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LeadProvider } from "@/components/ui/LeadProvider";
import ScrollTop from "@/components/ui/ScrollTop";

export const metadata: Metadata = {
  title: "ЗОРКИЙ — установка видеонаблюдения под ключ в Москве и Московской области",
  description:
    "Монтаж систем видеонаблюдения за 1 день. Бесплатный выезд инженера, смета за 24 часа, оплата после установки, гарантия 3 года. Москва и МО до 100 км от МКАД.",
  icons: { icon: (process.env.NEXT_PUBLIC_BASE_PATH || "") + "/favicon.svg" },
  openGraph: {
    title: "ЗОРКИЙ — видеонаблюдение под ключ за 1 день",
    description:
      "Камеры, которые действительно предотвращают кражи. 2 470+ объектов под защитой в Москве и области.",
    type: "website",
    locale: "ru_RU",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080B12",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@500;600;700&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LeadProvider>
          <ScrollTop />
          {children}
        </LeadProvider>
      </body>
    </html>
  );
}
