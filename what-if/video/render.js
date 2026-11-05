// Renders anim.html frame by frame. Usage: node render.js [fps] [--test t1,t2,...]
const { chromium } = require('playwright');
const path = require('path'); const fs = require('fs');
(async () => {
  const fps = Number(process.argv[2] || 30), DURATION = 10;
  const testIdx = process.argv.indexOf('--test');
  const times = testIdx > -1 ? process.argv[testIdx+1].split(',').map(Number)
                             : Array.from({length: fps*DURATION}, (_, i) => i / fps);
  const outDir = path.join(__dirname, testIdx > -1 ? 'test' : 'frames');
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  page.on('pageerror', e => console.log('pageerror:', e.message));
  await page.goto('file://' + path.join(__dirname, 'anim.html'));
  await page.waitForFunction(() => window.__ready === true);
  await page.evaluate(() => document.fonts.ready);
  const t0 = Date.now();
  for (let i = 0; i < times.length; i++) {
    await page.evaluate(t => window.render(t), times[i]);
    const name = testIdx > -1 ? `t${times[i].toFixed(2)}.png` : `f${String(i).padStart(4,'0')}.png`;
    await page.screenshot({ path: path.join(outDir, name) });
    if (i % 30 === 0) console.log(`frame ${i}/${times.length}  ${((Date.now()-t0)/1000).toFixed(1)}s`);
  }
  await browser.close();
  console.log('done in', ((Date.now()-t0)/1000).toFixed(1), 's');
})();
