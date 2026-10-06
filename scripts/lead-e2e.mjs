import puppeteer from "puppeteer-core";

const WEBHOOK =
  "https://script.google.com/macros/s/AKfycbwWA1c_i0-qcENOQ_moYeYC7aYOWXKWpLYnM0MwxGYUrXCwg0cwg8ZDIPtJEvshmj_g/exec";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true,
});
const page = await browser.newPage();
const calls = [];
page.on("console", (m) => {
  if (m.type() === "error") console.log("console:", m.text().slice(0, 160));
});
page.on("requestfailed", (r) => {
  if (r.url().includes("script.google")) console.log("REQUEST FAILED:", r.failure()?.errorText);
});
page.on("request", (r) => {
  if (r.url().includes("script.google.com")) calls.push(r.method() + " → Apps Script");
});
page.on("response", async (r) => {
  if (!r.url().includes("script.googleusercontent")) return;
  try {
    const t = await r.text();
    console.log("ОТВЕТ СКРИПТА:", r.status(), t.slice(0, 300));
  } catch (e) {
    console.log("ответ:", r.status(), "(тело недоступно)");
  }
});

await page.goto("https://goodrojh.github.io/zorkiy-cctv/", { waitUntil: "networkidle0" });
await page.evaluate(() =>
  [...document.querySelectorAll("button")].find((b) => b.textContent.includes("Вызвать инженера")).click(),
);
await new Promise((r) => setTimeout(r, 800));
await page.evaluate(() => {
  const d = document.querySelector("[role=dialog]");
  const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set;
  const name = d.querySelector('input[placeholder="Имя"]');
  set.call(name, "ТЕСТ сайта — строку можно удалить");
  name.dispatchEvent(new Event("input", { bubbles: true }));
  const tel = d.querySelector("input[type=tel]");
  set.call(tel, "+7 (925) 127-91-13");
  tel.dispatchEvent(new Event("input", { bubbles: true }));
  d.querySelector("input[type=checkbox]").click();
});
await new Promise((r) => setTimeout(r, 300));
await page.evaluate(() => document.querySelector("[role=dialog] button[type=submit]").click());
await new Promise((r) => setTimeout(r, 4000));

const state = await page.evaluate(() => {
  const t = document.querySelector("[role=dialog]").innerText;
  return t.includes("Заявка принята") ? "ОК: показан экран «Заявка принята»" : "НЕ ОК: " + t.slice(-200).split("\n").join(" | ");
});
const direct = await page.evaluate(async (u) => {
  try {
    const r = await fetch(u, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ping: 1 }),
    });
    return "fetch выполнен, type=" + r.type;
  } catch (e) {
    return "fetch ОШИБКА: " + e.message;
  }
}, WEBHOOK);

console.log("запросы:", calls.length ? calls : "НЕТ ЗАПРОСА");
console.log("форма:", state);
console.log("прямой fetch:", direct);
await browser.close();
