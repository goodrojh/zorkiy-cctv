import puppeteer from "puppeteer-core";
const B = process.argv[2] || "http://localhost:4173";
const out = "C:/Users/93EA~1/AppData/Local/Temp/claude/D--games-Cloude-----------------------------------15-09/08ba0000-403c-450e-8ab8-70c5910ee6dc/scratchpad";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });

// Desktop: footer + FAQ
const d = await browser.newPage();
await d.setViewport({ width: 1440, height: 900 });
await d.goto(B + "/", { waitUntil: "networkidle0" });
await d.evaluate(() => document.querySelector("#faq").scrollIntoView({ block: "end" }));
await new Promise(r => setTimeout(r, 1200));
await d.screenshot({ path: out + "/d-faq.png" });
await d.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await new Promise(r => setTimeout(r, 1500));
await d.screenshot({ path: out + "/d-footer.png" });

// Mobile: bar + modal + legal
const m = await browser.newPage();
await m.emulate({ viewport: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148 Safari/604.1" });
await m.goto(B + "/", { waitUntil: "networkidle0" });
await m.evaluate(() => window.scrollTo(0, 2000));
await new Promise(r => setTimeout(r, 1200));
await m.screenshot({ path: out + "/m-bar.png" });
await m.evaluate(() => [...document.querySelectorAll("button")].find(b => b.textContent.includes("Вызвать инженера")).click());
await new Promise(r => setTimeout(r, 900));
await m.screenshot({ path: out + "/m-modal.png" });
await m.goto(B + "/privacy/", { waitUntil: "networkidle0" });
await new Promise(r => setTimeout(r, 500));
await m.screenshot({ path: out + "/m-privacy.png" });
console.log("shots ok");
await browser.close();
