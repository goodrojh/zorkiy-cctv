"use client";

import React, { useEffect, useRef } from "react";

type Props = React.VideoHTMLAttributes<HTMLVideoElement> & {
  /** источник для экранов ≥ 768px */
  srcDesktop: string;
  /** источник для телефонов */
  srcMobile: string;
  videoRef?: React.RefObject<HTMLVideoElement | null>;
  playbackRate?: number;
};

/**
 * Видео, которое гарантированно автоплеится на iOS/Android:
 * muted/playsInline ставим напрямую на DOM-элемент (React не рендерит атрибут muted),
 * источник выбираем по ширине экрана, play() вызываем при появлении во вьюпорте.
 */
export default function AutoVideo({ srcDesktop, srcMobile, videoRef, playbackRate = 1, className, poster, ...rest }: Props) {
  const innerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = innerRef.current;
    if (!v) return;
    if (videoRef) (videoRef as React.MutableRefObject<HTMLVideoElement | null>).current = v;

    v.muted = true;
    v.defaultMuted = true;
    v.playsInline = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");
    v.playbackRate = playbackRate;

    const src = window.innerWidth < 768 ? srcMobile : srcDesktop;
    if (v.getAttribute("src") !== src) {
      v.src = src;
      v.load();
    }

    const tryPlay = () => {
      const p = v.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) tryPlay();
          else v.pause();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(v);

    // iOS иногда требует повторный вызов после первого касания
    const onTouch = () => {
      if (v.paused) tryPlay();
    };
    window.addEventListener("touchstart", onTouch, { passive: true, once: true });

    return () => {
      io.disconnect();
      window.removeEventListener("touchstart", onTouch);
    };
  }, [srcDesktop, srcMobile, videoRef, playbackRate]);

  return (
    <video
      ref={innerRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      className={className}
      {...rest}
    />
  );
}
