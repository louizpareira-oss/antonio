// Rear Left thumbnail in the owner's red flat-vector style: solid red ground, title left (white / black),
// flat illustration right: over the driver's shoulder, hands on the wheel, the rear-left door icon glowing on the dash.
//   node thumb_red.mjs <out-dir>      -> rear_left_thumb_A/B_1280x720.png/.jpg + 320x180 and 160x90 previews
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const OUT = path.resolve(process.argv[2] || '.');
const font = 'data:font/woff2;base64,' + fs.readFileSync(path.resolve('node_modules/@fontsource/montserrat/files/montserrat-latin-900-normal.woff2')).toString('base64');
const RED = '#E8191F', ICON = '#FF1E27', COBALT = '#1E5EFF', INK = '#0A0A0D', WHITE = '#FFFFFF';

function svg(eyes) {
  const ring = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#000" stroke-width="50"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${WHITE}" stroke-width="34"/>`;
  const hand = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-46" y="-40" width="92" height="80" rx="38" fill="${WHITE}" stroke="#000" stroke-width="8"/>
    <path d="M-20 -18 L-20 16 M2 -20 L2 18 M24 -18 L24 16" stroke="#000" stroke-width="5" stroke-linecap="round"/></g>`;
  const sleeve = (x0, y0, x1, y1) => `<path d="M${x0} ${y0} L${x1} ${y1}" stroke="#000" stroke-width="86" stroke-linecap="round"/><path d="M${x0} ${y0} L${x1} ${y1}" stroke="${COBALT}" stroke-width="70" stroke-linecap="round"/>`;
  // Speedometer arc 0-140 mph, needle at 60.
  const sx = 896, sy = 262, sr = 74, ang = v => (135 + v / 140 * 270) * Math.PI / 180;
  const p = (a, r) => `${sx + Math.cos(a) * r} ${sy + Math.sin(a) * r}`;
  let ticks = ''; for (let v = 0; v <= 140; v += 20) ticks += `<path d="M${p(ang(v), sr - 4)} L${p(ang(v), sr - 22)}" stroke="${WHITE}" stroke-width="6" stroke-linecap="round"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720" viewBox="0 0 1280 720">
  <defs><filter id="glow" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="9" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
  <rect width="1280" height="720" fill="${RED}"/>
  ${eyes ? `<path d="M1030 0 L1030 34" stroke="#000" stroke-width="14"/>
  <rect x="906" y="28" width="248" height="74" rx="34" fill="${INK}" stroke="#000" stroke-width="8"/><rect x="918" y="38" width="224" height="54" rx="26" fill="#000"/>
  <g filter="url(#glow)"><ellipse cx="1004" cy="65" rx="13" ry="9" fill="${ICON}"/><ellipse cx="1060" cy="65" rx="13" ry="9" fill="${ICON}"/></g>` : ''}
  <!-- Instrument cluster: black panel, speedometer, and the car-door diagram with ONLY the rear-left door lit -->
  <rect x="790" y="128" width="452" height="262" rx="48" fill="${INK}"/>
  <path d="M${p(ang(0), sr)} A ${sr} ${sr} 0 1 1 ${p(ang(140), sr)}" fill="none" stroke="${WHITE}" stroke-width="9" stroke-linecap="round"/>${ticks}
  <path d="M${sx} ${sy} L${p(ang(60), sr - 18)}" stroke="${WHITE}" stroke-width="9" stroke-linecap="round"/><circle cx="${sx}" cy="${sy}" r="11" fill="${WHITE}"/>
  <rect x="1096" y="150" width="112" height="216" rx="40" fill="none" stroke="${WHITE}" stroke-width="9"/>
  <path d="M1110 200 L1194 200 M1112 322 L1192 322" stroke="${WHITE}" stroke-width="7" stroke-linecap="round"/>
  <path d="M1096 214 L1096 258" stroke="${INK}" stroke-width="12"/><path d="M1096 268 L1096 314" stroke="${INK}" stroke-width="12"/>
  <path d="M1096 218 L1096 256 M1208 218 L1208 256 M1208 270 L1208 310" stroke="${WHITE}" stroke-width="9" stroke-linecap="round" opacity=".35"/>
  <path d="M1096 218 L1096 256" stroke="${WHITE}" stroke-width="9" stroke-linecap="round" opacity=".35"/>
  <g filter="url(#glow)"><path d="M1096 268 L1036 340" stroke="${ICON}" stroke-width="26" stroke-linecap="round"/></g>
  <!-- Steering wheel, sleeves and hands at ten and two -->
  ${ring(1030, 720, 278)}
  ${sleeve(846, 540, 900, 760)}${sleeve(1222, 540, 1168, 760)}
  ${hand(838, 532, -38)}${hand(1222, 532, 38)}
  <!-- The driver from behind: cobalt hoodie shoulders, obsidian head, one eye-dot catching the corner of the eye -->
  <path d="M800 760 C 820 690, 900 668, 960 664 L1100 664 C 1160 668, 1240 690, 1260 760 Z" fill="${COBALT}" stroke="#000" stroke-width="8"/>
  <path d="M940 676 C 980 700, 1080 700, 1120 676" fill="none" stroke="#1546c2" stroke-width="22" stroke-linecap="round"/>
  <ellipse cx="1030" cy="582" rx="112" ry="128" fill="${INK}" stroke="${WHITE}" stroke-width="7"/>
  <ellipse cx="1128" cy="560" rx="9" ry="13" fill="${WHITE}"/>
</svg>`;
}
const page = s => `<!doctype html><html><head><style>@font-face{font-family:M;font-weight:900;src:url(${font})}
html,body{margin:0;width:1280px;height:720px;overflow:hidden}
.t{position:absolute;left:52px;top:0;height:720px;display:flex;flex-direction:column;justify-content:center;font-family:M;font-weight:900;line-height:.92;letter-spacing:-2px}
.t div{width:max-content} .l1{color:${WHITE};text-shadow:0 5px 0 rgba(0,0,0,.18)} .l2{color:#000}
</style></head><body>${s}<div class="t"><div class="l1" id="a">DON’T</div><div class="l2" id="b">PULL OVER</div></div>
<script>
// Fit both title lines: line 2 to 720 px wide, line 1 a little larger but no wider than 560 px.
const fit=(el,w,max)=>{let s=max;el.style.fontSize=s+'px';while(el.scrollWidth>w&&s>40){s-=2;el.style.fontSize=s+'px';}return s;};
document.fonts.ready.then(()=>{const b=fit(document.getElementById('b'),720,170);fit(document.getElementById('a'),560,Math.round(b*1.32));window.DONE=true;});
</script></body></html>`;

const browser = await chromium.launch();
for (const [k, eyes] of [['A', false], ['B', true]]) {
  const pg = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await pg.setContent(page(svg(eyes)));
  await pg.waitForFunction('window.DONE===true');
  const base = path.join(OUT, `rear_left_thumb_${k}`);
  await pg.screenshot({ path: `${base}_1280x720.png` });
  await pg.screenshot({ path: `${base}_1280x720.jpg`, type: 'jpeg', quality: 92 });
  await pg.close();
  for (const [w, h] of [[320, 180], [160, 90]]) {
    const p2 = await browser.newPage({ viewport: { width: w, height: h } });
    await p2.setContent(`<body style="margin:0"><img src="data:image/png;base64,${fs.readFileSync(`${base}_1280x720.png`).toString('base64')}" width="${w}" height="${h}"></body>`);
    await p2.screenshot({ path: `${base}_${w}x${h}.png` }); await p2.close();
  }
}
await browser.close();
console.log('wrote A and B to', OUT);
