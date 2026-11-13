import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
  args: ["--no-sandbox"],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 1600, deviceScaleFactor: 1 });
await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
await page.type("#trip-message", "Plan a weekend in Kyoto for two");
await page.click('button[type="submit"]');
await page.waitForSelector('[aria-label="Kyoto weekend recommendations"]');
await page.evaluate(() => {
  const shell = document.querySelector("main > section");
  const thread = document.querySelector("[aria-busy]");
  if (shell instanceof HTMLElement) shell.style.minHeight = "auto";
  if (thread instanceof HTMLElement) {
    thread.style.overflow = "visible";
    thread.style.flex = "none";
  }
});
await page.screenshot({ path: "public/kyoto-trip-planner.png", fullPage: true });

const errorPage = await browser.newPage();
await errorPage.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
await errorPage.goto("http://localhost:3000/?fail=once", { waitUntil: "networkidle0" });
await errorPage.type("#trip-message", "Plan a weekend in Kyoto for two");
await errorPage.click('button[type="submit"]');
await errorPage.waitForFunction(() =>
  document.body.textContent?.includes("Sorry, I couldn’t put your Kyoto weekend together just now."),
);
await errorPage.screenshot({ path: "public/kyoto-trip-planner-error.png", fullPage: true });

await browser.close();
