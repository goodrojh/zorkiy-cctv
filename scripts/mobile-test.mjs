import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.emulate({ viewport: { width: 375, height: 812, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1" });
const errors = [];
page.on("console", (m) => { if (m.type() === "error" || m.type() === "warning") errors.push(m.type() + ": " + m.text().slice(0, 200)); });
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
await page.goto("http://localhost:4173/", { waitUntil: "networkidle0" });
await new Promise(r => setTimeout(r, 800));
const r1 = await page.evaluate(() => ({ scrollY: window.scrollY, isMobileApplied: getComputedStyle(document.querySelector("nav > div")).backdropFilter, blurCount: [...document.querySelectorAll("*")].filter(e => getComputedStyle(e).backdropFilter !== "none").length }));
console.log("initial", r1);
// scroll step by step like a user and check that nothing in view stays hidden
const res = [];
const total = await page.evaluate(() => document.body.scrollHeight);
for (let y = 0; y < total; y += 500) {
  await page.evaluate((y) => window.scrollTo({ top: y, behavior: "instant" }), y);
  await new Promise(r => setTimeout(r, 120));
  const hidden = await page.evaluate(() => {
    const vh = innerHeight;
    return [...document.querySelectorAll("section *")].filter(e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.bottom > 0 && r.top < vh && e.style.opacity === "0"; }).map(e => e.tagName + "." + (e.className || "").toString().slice(0, 40));
  });
  if (hidden.length) res.push({ y, hidden: hidden.slice(0, 4), n: hidden.length });
}
console.log("hidden-in-view after 120ms per step:", JSON.stringify(res));
// counters
await page.evaluate(() => document.querySelector("#prevented").scrollIntoView());
await new Promise(r => setTimeout(r, 2200));
const counters = await page.evaluate(() => [...document.querySelectorAll("#prevented .tabular-nums span")].map(s => s.textContent));
console.log("counters", counters);
// videos playing?
const vids = await page.evaluate(() => [...document.querySelectorAll("video")].map(v => ({ src: v.currentSrc.split("/").pop(), paused: v.paused, muted: v.muted, t: v.currentTime.toFixed(1) })));
console.log("videos", vids);
// checklist heading lines
const h = await page.evaluate(() => { const h2=[...document.querySelectorAll('h2')].find(h=>h.textContent.includes('7 признаков')); return h2.innerText; });
console.log("checklist h2:", JSON.stringify(h));
// frame timing during scroll (rough jank measure)
const jank = await page.evaluate(async () => {
  window.scrollTo(0, 1500);
  const frames = [];
  let last = performance.now();
  await new Promise(res => { let n = 0; const step = (t) => { frames.push(t - last); last = t; window.scrollBy(0, 12); if (++n < 150) requestAnimationFrame(step); else res(); }; requestAnimationFrame(step); });
  const long = frames.filter(f => f > 34).length;
  return { frames: frames.length, over34ms: long, max: Math.round(Math.max(...frames)) };
});
console.log("scroll frames", jank);
console.log("console errors:", errors.length ? errors : "none");
await browser.close();
