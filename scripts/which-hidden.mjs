import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const page = await browser.newPage(); await page.setViewport({ width: 1440, height: 900 });
await page.goto("http://localhost:4173/", { waitUntil: "networkidle0" });
for (const y of [1200, 3600, 12000]) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
  await new Promise(r => setTimeout(r, 1500));
  console.log(y, await page.evaluate(() => [...document.querySelectorAll("section *")].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.bottom > 0 && r.top < innerHeight && e.style.opacity === "0"; }).map(e => { const r=e.getBoundingClientRect(); return e.tagName + "." + (e.className||"").toString().slice(0, 50) + " top=" + Math.round(r.top) + " h=" + Math.round(r.height); })));
}
await browser.close();
