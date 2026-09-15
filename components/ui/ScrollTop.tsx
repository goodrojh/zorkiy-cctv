"use client";

import { useEffect } from "react";

/** Открывать сайт всегда с начала: отключаем восстановление позиции скролла браузером */
export default function ScrollTop() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      requestAnimationFrame(() => window.scrollTo(0, 0));
    }
  }, []);
  return null;
}
