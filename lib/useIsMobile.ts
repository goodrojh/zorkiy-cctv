"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 767px)";
let mql: MediaQueryList | null = null;
const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  if (!mql) {
    mql = window.matchMedia(QUERY);
    mql.addEventListener("change", () => listeners.forEach((l) => l()));
  }
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}
const getSnapshot = () => (mql ?? window.matchMedia(QUERY)).matches;
const getServerSnapshot = () => false;

/**
 * true на экранах < 768px. Один matchMedia на всё приложение,
 * при гидратации — false (совпадает с SSR), затем мгновенно актуальное значение.
 */
export function useIsMobile() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
