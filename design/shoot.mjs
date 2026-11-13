import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const [url, name] = process.argv.slice(2);
if (!url || !name) {
  console.error("usage: node design/shoot.mjs <url> <name>");
  process.exit(1);
}
mkdirSync("design/screenshots", { recursive: true });
const sizes = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };
const browser = await chromium.launch();
try {
  for (const [label, viewport] of Object.entries(sizes)) {
    const page = await browser.newPage({ viewport });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.screenshot({ path: `design/screenshots/${name}-${label}.png`, fullPage: true });
    await page.close();
  }
} finally {
  await browser.close();
}
