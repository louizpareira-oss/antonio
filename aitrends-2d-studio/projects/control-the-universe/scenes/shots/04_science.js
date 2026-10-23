// 04_science.js — s050–s061: "Is any of this real?" GPS clocks, teleporting light to a satellite, a paperclip of
// energy, the immortal jellyfish. Every power is real, just never all in one hand.
import { E, registerShot, layer, blurLayer, ease, prog, clamp, lerp, rr, seg, circle, poly, alpha, glow, linGrad, text, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import { YOU, HERO } from '../cast.js';
import { stone, STONES } from '../stones.js';
import { space, gpsSat } from '../sets/world.js';
import { ocean } from '/projects/talk-to-animals/scenes/sets/outside.js';
import { nameTag, realCard, myth, phone, bp, wt, GOLDC, CORALC, MINT, SKYC } from '../ui.js';
import { F, push } from '../common.js';
import { hand } from '../props.js';

const C0 = { x: 0, y: 0, z: 1 };
const H = (g, str, y = 120, c = '#ffffff') => text(g, str, E.W / 2, y, { size: 56, font: FONTS.ui, weight: 900, color: c, spacing: 4 });
function jelly(g, x, y, s, t, k = 0) {   // k 0 = adult medusa .. 1 = baby polyp
  g.save(); g.translate(x, y); g.scale(s, s);
  if (k < 1) { g.save(); g.globalAlpha *= 1 - k; const sc = 1 - 0.6 * k; g.scale(sc, sc);
    for (let i = 0; i < 8; i++) { g.strokeStyle = alpha('#ffb0d8', 0.8); g.lineWidth = 4; g.beginPath(); g.moveTo(-60 + i * 17, 10); for (let j = 1; j <= 6; j++) g.lineTo(-60 + i * 17 + Math.sin(t * 3 + i + j) * 8, 10 + j * 24); g.stroke(); }
    g.fillStyle = alpha('#ffc8e8', 0.85); g.beginPath(); g.ellipse(0, 0, 80, 60, 0, Math.PI, Math.PI * 2); g.fill(); g.fillStyle = '#ff7ab0'; g.beginPath(); g.ellipse(0, -14, 26, 22, 0, 0, Math.PI * 2); g.fill(); g.restore(); }
  if (k > 0) { g.save(); g.globalAlpha *= k; rr(g, -40, 150, 80, 24, 10); g.fillStyle = '#8a6a5a'; g.fill(); seg(g, [[0, 150], [0, 60]], 12, '#ffc8e8');
    for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.35; seg(g, [[0, 60], [Math.cos(a) * 46, 60 + Math.sin(a) * 46]], 5, '#ffb0d8'); } circle(g, 0, 62, 14, '#ff7ab0'); g.restore(); }
  g.restore();
}

// s050 — "So. Is any of this real?"
registerShot('s050', { draw(g, t, info) {
  bp(g); const k = ease.outBack(prog(t, 0.1, 0.6)); g.save(); g.translate(960, 460); g.scale(k, k);
  text(g, 'IS ANY OF THIS', 0, -60, { size: 90, font: FONTS.title, weight: 700, color: '#ffffff' }); text(g, 'REAL?', 0, 70, { size: 160, font: FONTS.title, weight: 700, color: GOLDC, glow: 30, glowColor: alpha(GOLDC, 0.6) }); g.restore();
  STONES.forEach(([, c], i) => { const a = ease.out(prog(t, 0.6 + i * 0.1, 1.0 + i * 0.1)); if (a > 0) stone(g, 360 + i * 240, 880, 0.9 * a, c, { t }); });
} });
// s051 — "Time really does bend."  space-time dipping around the Earth
registerShot('s051', { draw(g, t, info) {
  bp(g); const k = ease.inOut(prog(t, 0.1, 1.4));
  g.strokeStyle = alpha('#cfe0ff', 0.6); g.lineWidth = 3;
  for (let i = 0; i <= 16; i++) { g.beginPath(); for (let j = 0; j <= 40; j++) { const x = 160 + j * 40, y0 = 300 + i * 40, d = Math.hypot(x - 960, (y0 - 620) * 2); const y = y0 + k * 260 * Math.exp(-(d * d) / 120000); j ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); }
  for (let j = 0; j <= 40; j++) { g.beginPath(); for (let i = 0; i <= 16; i++) { const x = 160 + j * 40, y0 = 300 + i * 40, d = Math.hypot(x - 960, (y0 - 620) * 2); const y = y0 + k * 260 * Math.exp(-(d * d) / 120000); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); }
  g.fillStyle = linGrad(g, 0, 640, 0, 940, ['#3a8ad8', '#1a4a9a']); circle(g, 960, 790 * k + 620 * (1 - k), 140, '#2a6ac0'); circle(g, 920, 760 * k + 600 * (1 - k), 40, alpha('#5ac86a', 0.9));
  H(g, 'TIME BENDS NEAR HEAVY THINGS', 140, '#ffffff');
} });
// s052 — "Clocks on GPS satellites run thirty-eight millionths of a second faster every day."
registerShot('s052', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 540, 1.0), F(1000, 520, 1.08));
  layer(g, cam, 1, (g) => { space(g, t, C0, {}); gpsSat(g, 1060, 360, 1.5, -0.12 + 0.03 * Math.sin(t)); });
  nameTag(g, '+38 MILLIONTHS OF A SECOND, EVERY DAY', 960, 920, t, wt('thirty', info, t, 1.2), { size: 44, fill: alpha('#16141f', 0.9), color: GOLDC });
} });
// s053 — "Without a fix, your map would be ten kilometres off by tonight."
registerShot('s053', { draw(g, t, info) {
  g.fillStyle = '#dfe6e0'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  for (let bx = 0; bx < 6; bx++) for (let by = 0; by < 4; by++) { rr(g, -80 + bx * 360, -60 + by * 300, 320, 260, 20); g.fillStyle = (bx + by) % 3 ? '#f4efe4' : '#cfe4c4'; g.fill(); }
  const k = ease.inOut(prog(t, 0.3, 2.0)); circle(g, 520, 560, 40, alpha('#2E72D2', 0.25)); circle(g, 520, 560, 18, '#2E72D2');
  const x2 = lerp(520, 1500, k); g.setLineDash([22, 16]); g.strokeStyle = CORALC; g.lineWidth = 8; g.beginPath(); g.moveTo(520, 560); g.lineTo(x2, 560 - 120 * k); g.stroke(); g.setLineDash([]);
  circle(g, x2, 560 - 120 * k, 22, CORALC); nameTag(g, '10 KM OFF', 1040, 420, t, 1.2, { size: 50, fill: alpha(CORALC, 0.92), color: '#ffffff' });
  nameTag(g, 'YOU', 520, 640, t, 0.2, { size: 34 });
} });
// s054 — "Teleporting people? No."
registerShot('s054', { draw(g, t, info) {
  bp(g); g.save(); g.setLineDash([14, 10]); g.strokeStyle = '#e8f0ff'; g.lineWidth = 6;
  rr(g, 760, 240, 400, 620, 40); g.stroke(); g.beginPath(); g.arc(960, 400, 60, 0, Math.PI * 2); g.stroke(); rr(g, 900, 470, 120, 260, 30); g.stroke(); g.restore();
  for (let i = 0; i < 6; i++) { const y = 260 + ((t * 300 + i * 100) % 580); seg(g, [[780, y], [1140, y]], 3, alpha(SKYC, 0.5)); }
  const k = ease.out(prog(t, wt('no', info, t, 0.9), wt('no', info, t, 0.9) + 0.3)); if (k > 0) { seg(g, [[700, 200], [700 + 520 * k, 200 + 700 * k]], 22, CORALC); seg(g, [[1220, 200], [1220 - 520 * k, 200 + 700 * k]], 22, CORALC); }
  H(g, 'TELEPORTING PEOPLE', 140);
} });
// s055 — "But in 2017, scientists teleported the state of a particle of light to a satellite more than a thousand kilometres up."
registerShot('s055', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 560, 1.0), F(960, 540, 1.05));
  layer(g, cam, 1, (g) => { space(g, t, C0, { earthDrop: 600 });
    g.fillStyle = '#e8eef4'; poly(g, [[180, 1080], [360, 830], [460, 900], [560, 800], [760, 1080]], '#c8d0dc'); rr(g, 420, 770, 80, 60, 10); g.fillStyle = '#f2f2f6'; g.fill();
    gpsSat(g, 1500, 220, 0.9, -0.3);
    const k = prog(t, 0.3, 2.0); const x = lerp(460, 1500, k), y = lerp(780, 240, k); g.save(); g.globalCompositeOperation = 'lighter'; g.strokeStyle = alpha('#5aff8a', 0.85); g.lineWidth = 8; g.beginPath(); g.moveTo(460, 780); g.lineTo(x, y); g.stroke(); g.restore(); glow(g, x, y, 60, '#5aff8a', 0.9); });
  realCard(g, t, { x: 70, y: 60, w: 820, at: 0.3, title: 'China, 2017', lines: ['Light teleported from a mountain', 'station to a satellite 1,400 km up.'] });
} });
// s056 — "Energy?"  one paperclip
registerShot('s056', { draw(g, t, info) {
  bp(g); const k = ease.outBack(prog(t, 0.05, 0.4)); g.save(); g.translate(960, 540); g.scale(2.6 * k, 2.6 * k); g.rotate(-0.4);
  g.strokeStyle = '#e8f0ff'; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(-60, 30); g.lineTo(80, 30); g.arc(80, 0, 30, Math.PI / 2, -Math.PI / 2, true); g.lineTo(-80, -30); g.arc(-80, 0, 30, -Math.PI / 2, Math.PI / 2, true); g.lineTo(60, 30 - 60 + 16); g.arc(60, -7, 7, Math.PI / 2, -Math.PI / 2, true); g.lineTo(-50, -14); g.stroke(); g.restore();
  nameTag(g, '1 PAPERCLIP = 1 GRAM', 960, 900, t, 0.3, { size: 44 });
} });
// s057 — "Turn one paperclip completely into energy, and you'd beat the bomb that hit Hiroshima."
registerShot('s057', { draw(g, t, info) {
  bp(g); H(g, 'E = mc²', 150, GOLDC);
  const a = ease.out(prog(t, 0.3, 1.3)), b = ease.out(prog(t, wt('hiroshima', info, t, 2.6) - 0.4, wt('hiroshima', info, t, 2.6) + 0.5));
  rr(g, 520, 860 - 560 * a, 260, 560 * a, 16); g.fillStyle = GOLDC; g.fill(); text(g, 'PAPERCLIP', 650, 920, { size: 40, font: FONTS.ui, weight: 900, color: '#ffffff' }); if (a > 0.9) text(g, '21 KT', 650, 260, { size: 60, font: FONTS.ui, weight: 900, color: GOLDC });
  rr(g, 1140, 860 - 400 * b, 260, 400 * b, 16); g.fillStyle = CORALC; g.fill(); text(g, 'HIROSHIMA', 1270, 920, { size: 40, font: FONTS.ui, weight: 900, color: '#ffffff' }); if (b > 0.9) text(g, '15 KT', 1270, 420, { size: 60, font: FONTS.ui, weight: 900, color: CORALC });
  seg(g, [[440, 862], [1480, 862]], 6, '#e8f0ff');
} });
// s058 — "And there's a jellyfish that can turn itself back into a baby."
registerShot('s058', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 540, 1.0), F(960, 600, 1.12));
  layer(g, cam, 1, (g) => { ocean(g, t, C0); jelly(g, 960, 440 + Math.sin(t * 1.5) * 20, 2.2, t, ease.inOut(prog(t, 1.0, 2.6)));
    const k = prog(t, 0.8, 2.6); if (k > 0 && k < 1) for (let i = 0; i < 3; i++) { const a = -t * 3 + i * 2.1; seg(g, [[960 + Math.cos(a) * 300, 560 + Math.sin(a) * 300], [960 + Math.cos(a + 0.4) * 300, 560 + Math.sin(a + 0.4) * 300]], 10, alpha('#ffffff', 0.6)); } });
} });
// s059 — "Scientists call it the immortal jellyfish."
registerShot('s059', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 560, 1.1), F(960, 560, 1.16));
  layer(g, cam, 1, (g) => { ocean(g, t, C0); jelly(g, 1250, 520 + Math.sin(t * 1.5) * 16, 2.6, t, 0); });
  realCard(g, t, { x: 70, y: 70, w: 760, at: 0.2, title: 'The immortal jellyfish', lines: ['Turritopsis dohrnii can turn back', 'into its baby stage, and grow again.'] });
} });
// s060 — "Every power is real."
registerShot('s060', { draw(g, t, info) {
  bp(g); H(g, 'EVERY POWER IS REAL', 140, MINT);
  const FACTS = ['GPS CLOCKS', 'LIGHT TO SPACE', 'E = mc²', 'BRAIN CHIPS', 'EMPTY ATOMS', 'THE JELLYFISH'];
  STONES.forEach(([n, c], i) => { const k = ease.outBack(prog(t, 0.1 + i * 0.12, 0.4 + i * 0.12)), x = 260 + i * 280; if (k <= 0) return;
    stone(g, x, 480, 1.3 * k, c, { t }); text(g, n, x, 620, { size: 38, font: FONTS.ui, weight: 900, color: '#ffffff', spacing: 3 }); text(g, FACTS[i], x, 680, { size: 26, font: FONTS.ui, weight: 800, color: alpha('#e8f0ff', 0.85) }); });
} });
// s061 — "Just never all in one hand."
registerShot('s061', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#120f36', '#2a2060']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const over = ease.in(prog(t, 0.6, info.dur)), sh = Math.sin(t * 50) * 6 * over;
  hand(g, 960 + sh, 980, 2.2, { open: 1, sleeve: HERO.color, glove: HERO.gloves, cuff: HERO.accent });
  STONES.forEach(([, c], i) => stone(g, 860 + (i % 3) * 100 + sh, 660 + Math.floor(i / 3) * 90, 0.9, c, { t: t + i }));
  glow(g, 960, 720, 400 + 600 * over, '#ffffff', 0.3 + 0.6 * over);
  if (over > 0.6) { g.fillStyle = alpha('#ffffff', (over - 0.6) * 1.6); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); }
} });
