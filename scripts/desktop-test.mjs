import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
const errors = [];
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(m.type() + ": " + m.text().slice(0, 200)); });
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
await page.goto("http://localhost:4173/", { waitUntil: "networkidle0" });
const total = await page.evaluate(() => document.body.scrollHeight);
const res = [];
for (let y = 0; y < total; y += 600) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
  await new Promise(r => setTimeout(r, 1200));
  const hidden = await page.evaluate(() => [...document.querySelectorAll("section *")].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.bottom > 0 && r.top < innerHeight && e.style.opacity === "0"; }).length);
  if (hidden) res.push({ y, hidden });
}
const nav = await page.evaluate(() => getComputedStyle(document.querySelector("nav > div")).backdropFilter);
console.log("desktop nav blur:", nav, "| still-hidden after 1.2s:", JSON.stringify(res), "| errors:", errors.length ? errors : "none");
await browser.close();
