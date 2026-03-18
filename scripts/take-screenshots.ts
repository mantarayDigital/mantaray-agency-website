import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const BASE_URL = 'http://localhost:3000';

const projects: Record<string, string[]> = {
  pulse: ['dashboard', 'reports', 'team', 'receipts'],
  bloom: ['home', 'products', 'detail', 'ar-view'],
  atlas: ['dashboard', 'contacts', 'pipeline', 'reports'],
  nomad: ['search', 'results', 'detail', 'booking'],
  volt: ['home', 'workout', 'exercise', 'progress'],
  medix: ['dashboard', 'booking', 'consultation', 'records'],
  barista: ['home', 'products', 'services', 'gallery'],
  luxe: ['home', 'products', 'cart', 'checkout'],
  bazaar: ['home', 'categories', 'products', 'branches'],
  haven: ['home', 'cabins', 'experience', 'booking'],
  alpine: ['home', 'cabins', 'gallery', 'contact'],
};

async function main() {
  const outputDir = path.join(process.cwd(), 'public', 'screenshots');

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });

  for (const [slug, variants] of Object.entries(projects)) {
    const projectDir = path.join(outputDir, slug);
    fs.mkdirSync(projectDir, { recursive: true });

    for (const variant of variants) {
      const page = await context.newPage();
      const url = `${BASE_URL}/screenshot/${slug}/${variant}`;
      console.log(`Capturing ${slug}/${variant}...`);

      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1500);

      await page.screenshot({
        path: path.join(projectDir, `${variant}.png`),
        type: 'png',
      });

      await page.close();
    }
  }

  await browser.close();
  console.log('All screenshots captured!');
}

main().catch(console.error);
