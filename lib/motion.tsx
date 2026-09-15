"use client";

import React, { forwardRef } from "react";
import { motion as fm } from "framer-motion";
import { useIsMobile } from "./useIsMobile";

/**
 * Обёртка над framer-motion для декоративных анимаций секций.
 * На десктопе — обычный motion. На телефонах все анимации появления становятся мгновенными,
 * элементы показываются за 300px до входа в экран, hover-эффекты и бесконечные циклы отключаются.
 * Так на слабых телефонах нет «догрузки» контента при скролле и лишней работы GPU.
 */
const INSTANT = { duration: 0, delay: 0, staggerChildren: 0, delayChildren: 0 };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function stripVariants(v: any) {
  if (!v) return v;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const out: Record<string, any> = {};
  for (const k in v) out[k] = { ...v[k], transition: INSTANT };
  return out;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cache = new Map<string, any>();

export const motion: typeof fm = new Proxy(fm, {
  get(target, key) {
    if (typeof key !== "string") return Reflect.get(target, key);
    if (cache.has(key)) return cache.get(key);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Comp = (target as any)[key];
    if (!Comp) return Comp;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Wrapped = forwardRef<any, any>(function MobileAwareMotion(props, ref) {
      const isMobile = useIsMobile();
      if (!isMobile) return <Comp ref={ref} {...props} />;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { whileHover, whileTap, variants, viewport, whileInView, ...rest } = props;
      return (
        <Comp
          ref={ref}
          {...rest}
          whileInView={whileInView}
          variants={stripVariants(variants)}
          transition={INSTANT}
          viewport={whileInView ? { ...(viewport || {}), once: true, amount: 0, margin: "300px 0px 300px 0px" } : viewport}
        />
      );
    });
    Wrapped.displayName = `m.${key}`;
    cache.set(key, Wrapped);
    return Wrapped;
  },
}) as unknown as typeof fm;
