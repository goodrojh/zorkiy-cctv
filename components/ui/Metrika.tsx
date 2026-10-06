"use client";

import Script from "next/script";
import { SITE } from "@/lib/site";

/**
 * Яндекс.Метрика. Подключается только если задан NEXT_PUBLIC_YM_ID.
 * Загружается после интерактивности страницы, чтобы не тормозить первый экран.
 */
export default function Metrika() {
  const id = SITE.metrikaId;
  if (!id) return null;
  return (
    <>
      <Script id="ym" strategy="lazyOnload">
        {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}
k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
(window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
ym(${id},"init",{clickmap:true,trackLinks:true,accurateTrackBounce:true,webvisor:true});`}
      </Script>
      <noscript>
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`https://mc.yandex.ru/watch/${id}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
        </div>
      </noscript>
    </>
  );
}
