const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
  page.on('console', m => console.log('console:', m.type(), m.text()));
  page.on('pageerror', e => console.log('pageerror:', e.message));
  for (const mode of ['turnaround', 'scene']) {
    await page.goto('file://' + path.join(__dirname, 'sprout.html') + '?mode=' + mode);
    await page.waitForFunction(() => window.__done === true, null, { timeout: 60000 });
    await page.screenshot({ path: path.join(__dirname, `sprout-${mode}.png`) });
    console.log('saved', mode);
  }
  await browser.close();
})();
