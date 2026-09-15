import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const page = await browser.newPage();
const check = () => page.evaluate(() => [...document.querySelectorAll("section *")].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.bottom > 0 && r.top < innerHeight && e.style.opacity === "0"; }).map(e => { const r=e.getBoundingClientRect(); return e.tagName + "." + (e.className||"").toString().slice(0, 40) + " top=" + Math.round(r.top) + " h=" + Math.round(r.height) + " transform=" + e.style.transform; }));
await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:4173/", { waitUntil: "networkidle0" });
for (const y of [1800, 3600, 12000]) { await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y); await new Promise(r => setTimeout(r, 1500)); console.log("desktop", y, await check()); }
await page.emulate({ viewport: { width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1" });
await page.goto("http://localhost:4173/", { waitUntil: "networkidle0" });
for (const y of [3500, 4000, 4500]) { await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y); await new Promise(r => setTimeout(r, 400)); console.log("mobile", y, await check()); }
await browser.close();
