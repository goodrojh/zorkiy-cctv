import puppeteer from "puppeteer-core";
const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
const page = await browser.newPage();
page.on("response", (r) => { if (r.status() >= 400) console.log(r.status(), r.url()); });
await page.goto("https://goodrojh.github.io/zorkiy-cctv/", { waitUntil: "networkidle0" });
await browser.close();
