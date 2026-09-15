"use client";

import React, { useCallback, useLayoutEffect, useRef } from "react";

/**
 * Поле телефона с жёсткой маской «+7 (___) ___-__-__».
 * Хранит только 10 цифр национального номера (value), принимает исключительно цифры.
 * Ведущие «8» или «7» (если человек по привычке набирает 8 999… или +7 999…) отбрасываются.
 */
export function formatRuPhone(national: string) {
  const d = national.slice(0, 10);
  let out = "+7 ";
  if (d.length === 0) return out;
  out += "(" + d.slice(0, 3);
  if (d.length >= 3) out += ")";
  if (d.length > 3) out += " " + d.slice(3, 6);
  if (d.length > 6) out += "-" + d.slice(6, 8);
  if (d.length > 8) out += "-" + d.slice(8, 10);
  return out;
}

/** Из любого ввода получить национальную часть (до 10 цифр) */
export function toNational(raw: string) {
  let d = raw.replace(/\D/g, "");
  // Российские номера после «+7» не начинаются ни с 7, ни с 8:
  // «+7 …» из маски, привычная «8 …» и вставки вида «+7 8 999…» — всё отбрасываем
  let guard = 0;
  while ((d.startsWith("7") || d.startsWith("8")) && guard++ < 4) d = d.slice(1);
  return d.slice(0, 10);
}

export const isPhoneComplete = (national: string) => national.length === 10;

type Props = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type"> & {
  /** 10 цифр национального номера */
  value: string;
  onChange: (national: string) => void;
};

export default function PhoneInput({ value, onChange, className, onFocus, ...rest }: Props) {
  const ref = useRef<HTMLInputElement>(null);
  const display = formatRuPhone(value);

  // Каретка всегда в конце — так маска ведёт себя предсказуемо на телефонах
  useLayoutEffect(() => {
    const el = ref.current;
    if (el && document.activeElement === el) {
      const end = el.value.length;
      el.setSelectionRange(end, end);
    }
  }, [display]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      // Пользователь стёр всё, включая «+7» — оставляем пустой номер, префикс вернётся сам
      if (raw.replace(/\D/g, "").length === 0) {
        onChange("");
        return;
      }
      // Если стирают Backspace-ом символ маски (скобку, дефис) — снимаем ещё и цифру
      if (raw.length < display.length && toNational(raw) === value) {
        onChange(value.slice(0, -1));
        return;
      }
      onChange(toNational(raw));
    },
    [onChange, display.length, value],
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const allowed = ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight", "Home", "End", "Enter", "Escape"];
    if (allowed.includes(e.key)) return;
    if (!/^\d$/.test(e.key)) e.preventDefault();
  }, []);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      onChange(toNational(e.clipboardData.getData("text")));
    },
    [onChange],
  );

  return (
    <input
      ref={ref}
      type="tel"
      inputMode="numeric"
      autoComplete="tel-national"
      value={display}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      onPaste={handlePaste}
      onFocus={(e) => {
        const end = e.target.value.length;
        requestAnimationFrame(() => e.target.setSelectionRange(end, end));
        onFocus?.(e);
      }}
      maxLength={18}
      className={className}
      {...rest}
    />
  );
}
