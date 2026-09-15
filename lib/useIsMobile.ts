"use client";

import { useEffect, useState } from "react";

/** true на экранах < 768px — используется, чтобы отключать тяжёлые бесконечные анимации на телефонах */
export function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return mobile;
}
