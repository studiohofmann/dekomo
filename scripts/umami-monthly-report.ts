import puppeteer from "puppeteer";
import sgMail from "@sendgrid/mail";
import dotenv from "dotenv";
dotenv.config();

const UMAMI_DASHBOARD_URL =
  process.env.UMAMI_DASHBOARD_URL ??
  `https://cloud.umami.is/websites/${process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}`;
const UMAMI_EMAIL = process.env.UMAMI_EMAIL!;
const UMAMI_PASSWORD = process.env.UMAMI_PASSWORD!;
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY!;
const REPORT_TO = process.env.REPORT_TO!;
const REPORT_FROM = process.env.REPORT_FROM ?? "reports@example.com";

if (
  !UMAMI_DASHBOARD_URL ||
  !UMAMI_EMAIL ||
  !UMAMI_PASSWORD ||
  !SENDGRID_API_KEY ||
  !REPORT_TO
) {
  console.error("Missing required env vars.");
  process.exit(1);
}

sgMail.setApiKey(SENDGRID_API_KEY);

type Scraped = {
  visitors?: string | null;
  pageviews?: string | null;
  topPages: string[];
  rawTiles: string[];
};

(async () => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();

  await page.goto("https://cloud.umami.is/login", {
    waitUntil: "networkidle2",
  });
  await page.type('input[name="email"]', UMAMI_EMAIL, { delay: 20 });
  await page.type('input[name="password"]', UMAMI_PASSWORD, { delay: 20 });
  await Promise.all([
    page.click('button[type="submit"]'),
    page
      .waitForNavigation({ waitUntil: "networkidle2", timeout: 15000 })
      .catch(() => {}),
  ]);

  await page.goto(UMAMI_DASHBOARD_URL, { waitUntil: "networkidle2" });
  await page.waitForTimeout(1200);

  const data = await page.evaluate((): Scraped => {
    const pick = (sel: string) =>
      document.querySelector(sel)?.textContent?.trim() ?? null;
    const tiles = Array.from(document.querySelectorAll("h3, .value, .metric"))
      .slice(0, 6)
      .map((el) => el.textContent!.trim());
    const topPages = Array.from(
      document.querySelectorAll(".top-pages li, .top-pages .list-item")
    )
      .slice(0, 6)
      .map((el) => el.textContent!.trim());
    return {
      visitors: pick('[data-qa="visitors"]') ?? tiles[0] ?? null,
      pageviews: pick('[data-qa="pageviews"]') ?? tiles[1] ?? null,
      topPages,
      rawTiles: tiles,
    };
  });

  await browser.close();

  const html = `
    <h2>Umami monthly report</h2>
    <ul>
      <li><strong>Visitors:</strong> ${data.visitors ?? "n/a"}</li>
      <li><strong>Pageviews:</strong> ${data.pageviews ?? "n/a"}</li>
    </ul>
    <h3>Top pages</h3>
    <ol>${data.topPages.map((t) => `<li>${t}</li>`).join("")}</ol>
  `;

  await sgMail.send({
    to: REPORT_TO,
    from: REPORT_FROM,
    subject: `Umami monthly report — ${new Date().toLocaleDateString()}`,
    html,
  });
  console.log("Report sent");
  process.exit(0);
})();
