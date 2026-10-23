// 03_curse.js — s035–s049: every stone takes something back. Frozen hours age you, teleports crack windows, 40,000
// thoughts at the game (and Theo's), six stones bend time, GPS breaks, NASA's anomaly. It's you.
import { E, registerShot, layer, blurLayer, ease, prog, clamp, lerp, rr, seg, circle, poly, alpha, glow, linGrad, text, FONTS, veil } from '/engine/core.js';
import { POSES, breathe } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { person, bigFaceV2, XP, emblem } from '../look.js';
import { YOU, HERO, THEO } from '../cast.js';
import { stone, blink, STONES } from '../stones.js';
import { classroom, stadium, nasaRoom } from '../sets/world.js';
import { bedroom } from '/projects/talk-to-animals/scenes/sets/house.js';
import { street, city } from '/projects/talk-to-animals/scenes/sets/outside.js';
import { say, speak, nameTag, counter, offSwitch, calendarPage, phone, bp, wt, GOLDC, CORALC, MINT, SKYC } from '../ui.js';
import { RIM, F, push, talkOf, KIDS } from '../common.js';

const C0 = { x: 0, y: 0, z: 1 };
const FROZEN = (g, k) => { if (k > 0) veil(g, '#8fb8ff', 0.28 * k, 'multiply'); };

// s035 — "But every stone takes something back."  the badge flickers, the light goes cold
registerShot('s035', { draw(g, t, info) {
  g.fillStyle = HERO.color; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const fl = Math.sin(t * 23) > 0.2 ? 6 : 4; g.save(); g.translate(960, 560); const z = 1 + 0.05 * t / info.dur; g.scale(z, z); emblem(g, [0, 0], 230, fl); g.restore();
  veil(g, '#1a2050', 0.15 + 0.35 * prog(t, 0, info.dur), 'multiply');
} });
// s036 — "When you freeze time, you keep living."  the world stuck at 7:59, your own clock running
registerShot('s036', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 600, 1.2), F(960, 600, 1.28));
  layer(g, cam, 1, (g) => { const R = street(g, 0, C0, { bench: true, benchX: 960 });
    person(g, { x: 1500, y: R.GY + 20, s: 1.2, facing: -1, outfit: KIDS[2], pose: POSES.reach, expr: 'neutral', look: [-1, 0], rim: RIM }); FROZEN(g, 1);
    const ang = t * 0.9; g.save(); g.globalAlpha *= 0.35; g.fillStyle = '#1a2050'; g.beginPath(); g.moveTo(960, R.GY + 30); g.lineTo(960 + Math.cos(ang) * 500, R.GY + 30 + 40); g.lineTo(960 + Math.cos(ang + 0.2) * 500, R.GY + 50); g.closePath(); g.fill(); g.restore();
    person(g, { x: 960, y: R.GY - 40, s: 1.4, facing: 1, outfit: HERO, pose: POSES.sit, expr: 'sad', look: [0.6, 0.4], rim: RIM, shadow: false }); });
  nameTag(g, 'THE WORLD: 7:59', 420, 110, t, 0.1, { size: 40 });
  const h = Math.floor(prog(t, 0, info.dur) * 9 * 24); nameTag(g, `YOU: +${h} HOURS`, 1500, 110, t, 0.3, { size: 40, fill: alpha(CORALC, 0.92), color: '#ffffff' });
} });
// s037 — "By Sunday, you're nine days older than your birthday."
registerShot('s037', { draw(g, t, info) {
  blurLayer(g, 9, (g) => bedroom(g, t, C0, { time: 'day', clock: false }), null);
  calendarPage(g, 520, 540, 2.4, 'SUNDAY', '+9', { color: CORALC, rot: -0.06 });
  text(g, 'DAYS OLDER', 520, 900, { size: 54, font: FONTS.ui, weight: 900, color: '#ffffff', stroke: 10, strokeColor: alpha('#1a1420', 0.8) });
  bigFaceV2(g, 1400, 620, 280, { outfit: HERO, expr: 'unimpressed', look: [-0.4, 0.3] });
  for (const dx of [-0.36, 0.36]) { g.strokeStyle = alpha('#6a5a8a', 0.8); g.lineWidth = 10; g.beginPath(); g.arc(1400 + dx * 280, 620 - 0.1 * 280 + 70, 60, 0.4, Math.PI - 0.4); g.stroke(); }   // dark circles
} });
// s038 — "Every teleport leaves a hole in the air, and the air slams back in."
registerShot('s038', { draw(g, t, info) {
  bp(g);
  const k = prog(t, 0.2, info.dur * 0.85); g.save(); g.setLineDash([16, 12]); g.strokeStyle = '#e8f0ff'; g.lineWidth = 6;
  g.beginPath(); g.arc(960, 330, 60, 0, Math.PI * 2); g.stroke(); rr(g, 900, 400, 120, 260, 30); g.stroke(); g.restore();
  for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2, r0 = 520 - 360 * k, x = 960 + Math.cos(a) * r0, y = 500 + Math.sin(a) * r0 * 0.7, x2 = 960 + Math.cos(a) * (r0 - 120), y2 = 500 + Math.sin(a) * (r0 - 120) * 0.7;
    seg(g, [[x, y], [x2, y2]], 12, SKYC); poly(g, [[x2 - Math.cos(a) * 30, y2 - Math.sin(a) * 21], [x2 + Math.sin(a) * 18, y2 - Math.cos(a) * 18], [x2 - Math.sin(a) * 18, y2 + Math.cos(a) * 18]], SKYC); }
  text(g, 'AIR', 1500, 200, { size: 60, font: FONTS.ui, weight: 900, color: SKYC, spacing: 6 });
  if (k >= 1) { const q = prog(t, info.dur * 0.85, info.dur); FX.sparkle(g, 960, 500, 200 * (1 - q), '#ffffff', 1 - q); }
} });
// s039 — "Boom. The school windows crack."
registerShot('s039', { draw(g, t, info) {
  const sh = Math.max(0, 1 - t * 2) * Math.sin(t * 70) * 14, cam = push(t, info.dur, F(1500 + sh, 500, 1.4), F(1500, 520, 1.5));
  layer(g, cam, 1, (g) => { const R = classroom(g, t, C0, { clock: 62 });
    const k = ease.out(prog(t, 0.05, 0.4)); if (k > 0) { g.strokeStyle = '#ffffff'; g.lineWidth = 4; for (const [cx, cy] of [[1560, R.GY - 640], [1820, R.GY - 420]]) for (let i = 0; i < 9; i++) { const a = i / 9 * Math.PI * 2 + 0.3; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(a) * 140 * k, cy + Math.sin(a) * 140 * k); g.lineTo(cx + Math.cos(a + 0.2) * 220 * k, cy + Math.sin(a + 0.2) * 210 * k); g.stroke(); } }
    for (let j = 0; j < 3; j++) { const r = prog(t, j * 0.08, 0.9 + j * 0.08) * 1400; if (r > 0 && r < 1400) { g.strokeStyle = alpha('#ffffff', 0.7 * (1 - r / 1400)); g.lineWidth = 16; g.beginPath(); g.arc(1300, R.GY - 300, r, 0, Math.PI * 2); g.stroke(); } }
    blink(g, 1300, R.GY - 200, prog(t, 0, 0.6)); });
  if (t < 0.6) veil(g, '#ffffff', 0.5 * (1 - t / 0.6), 'lighter');
  say(g, 'BOOM!', 520, 260, t, 0, null, null, { size: 90, shout: true });
} });
// s040 — "The mind stone has no off switch."
registerShot('s040', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#2a2050', '#3a2a6a']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  glow(g, 1400, 540, 420, STONES[3][1], 0.45); stone(g, 1400, 540, 2.6, STONES[3][1], { t });
  const tries = Math.max(0, Math.sin(t * 6)) * ease.out(prog(t, 0.4, 0.8)); offSwitch(g, 640, 560, 1.6, { k: 0.06 * tries });
  nameTag(g, 'STILL ON', 640, 980, t, 0.8, { size: 44, fill: alpha(CORALC, 0.92), color: '#ffffff' });
} });
// s041 — "At the football game, you hear forty thousand thoughts at once."
const THOUGHTS = ['I forgot the oven!', 'Is that guy cute?', 'GOAL GOAL GOAL', 'I hate this song', 'Did I lock the car?', 'Hot dogs...', 'Why is it so loud', 'She left me on read', 'Pick up the milk', 'Is my zipper down?'];
registerShot('s041', { draw(g, t, info) {
  blurLayer(g, 4, (g) => stadium(g, t, C0), null);
  THOUGHTS.forEach((s, i) => say(g, s, 230 + (i % 4) * 480 + (Math.floor(i / 4) % 2) * 200, 150 + Math.floor(i / 4) * 160, t, 0.1 + i * 0.12, null, null, { size: 30 }));
  bigFaceV2(g, 960, 860, 250, { outfit: HERO, expr: 'worried', look: [0, -0.7], rim: '#e8f0ff' });
  counter(g, 1650, 960, Math.round(40000 * clamp(prog(t, 0, info.dur * 0.8))).toLocaleString('en-US'), { size: 70, label: 'THOUGHTS' });
} });
// s042 — "One of them is your best friend's."
registerShot('s042', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 640, 1.0), F(960, 660, 1.08));
  layer(g, cam, 1, (g) => { stadium(g, t, C0); g.fillStyle = '#3a3a5a'; g.fillRect(-E.W, 860, E.W * 3, 300);
    person(g, { x: 760, y: 1000, s: 2.1, facing: 1, outfit: HERO, pose: POSES.sit, expr: 'worried', look: [1, 0], rim: { color: '#e8f0ff', dir: [0, -1] }, shadow: false });
    person(g, { x: 1180, y: 1000, s: 2.1, facing: -1, outfit: THEO, pose: POSES.sit, expr: 'unimpressed', look: [-1, 0], rim: { color: '#e8f0ff', dir: [0, -1] }, shadow: false }); });
} });
// s043 — THEO (thought): "I liked him better before."
registerShot('s043', { draw(g, t, info) {
  blurLayer(g, 8, (g) => stadium(g, t, C0), null);
  bigFaceV2(g, 1260, 640, 290, { outfit: { ...THEO, hair: 'spiky' }, expr: 'unimpressed', look: [-0.8, 0.2] });
  bigFaceV2(g, 380, 900, 200, { outfit: HERO, expr: 'sad', look: [1, -0.4], tears: ease.out(prog(t, 0.8, 1.8)) });
  speak(g, 'THEO', info, t, 1100, 200, 1180, 360, { size: 46, tail: 0.8 });
} });
// s044 — "And six stones together bend time around you."  space bends around you
registerShot('s044', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 600, 1.15), F(960, 600, 1.25));
  layer(g, cam, 1, (g) => { const R = street(g, t, C0, { bench: false }); const cx = 960, cy = R.GY - 200, k = ease.inOut(prog(t, 0.2, 1.6));
    veil(g, '#1a2050', 0.35 * k, 'multiply'); g.strokeStyle = alpha('#bff6ff', 0.75); g.lineWidth = 4;
    for (let i = -10; i <= 10; i++) { g.beginPath(); for (let j = -20; j <= 20; j++) { let x = cx + j * 50, y = cy + i * 50; const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy) + 1, pull = 9000 * k / (d + 120); x -= dx / d * pull; y -= dy / d * pull; j === -20 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke(); }
    for (let j = -20; j <= 20; j++) { g.beginPath(); for (let i = -10; i <= 10; i++) { let x = cx + j * 50, y = cy + i * 50; const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy) + 1, pull = 9000 * k / (d + 120); x -= dx / d * pull; y -= dy / d * pull; i === -10 ? g.moveTo(x, y) : g.lineTo(x, y); } g.stroke(); }
    glow(g, cx, cy, 300, '#bff6ff', 0.4 * k);
    person(g, { x: cx, y: R.GY + 30, s: 1.7, facing: 1, outfit: { ...HERO, wind: 0.4 }, pose: POSES.stand, expr: 'worried', look: [0.3, -0.3], rim: RIM }); });
} });
// s045 — "Just a few billionths of a second."
registerShot('s045', { draw(g, t, info) {
  bp(g); const k = ease.out(prog(t, 0.1, 0.5));
  text(g, '0.000000003 s', 960, 520, { size: 150 * (0.8 + 0.2 * k), font: FONTS.ui, weight: 900, color: GOLDC, glow: 24, glowColor: alpha(GOLDC, 0.5), alpha: k });
  text(g, 'A FEW BILLIONTHS OF A SECOND', 960, 680, { size: 44, font: FONTS.ui, weight: 900, color: '#e8f0ff', spacing: 4, alpha: k });
} });
// s046 — "That's enough. Every GPS near you is wrong."  the map dot jumping
registerShot('s046', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#e8eef2', '#c8d8e0']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  g.save(); const z = 1 + 0.04 * t / info.dur; g.translate(960, 540); g.scale(z, z); g.translate(-960, -540);
  phone(g, 960, 540, 900, (g, X, Y, W, H) => {
    g.fillStyle = '#e8eee0'; g.fillRect(X, Y, W, H); g.strokeStyle = '#ffffff'; g.lineWidth = 26; for (const yy of [0.3, 0.6]) { g.beginPath(); g.moveTo(X, Y + H * yy); g.lineTo(X + W, Y + H * yy + 40); g.stroke(); } g.beginPath(); g.moveTo(X + W * 0.4, Y); g.lineTo(X + W * 0.5, Y + H); g.stroke();
    g.fillStyle = '#9ad0f0'; g.beginPath(); g.moveTo(X, Y + H * 0.8); g.quadraticCurveTo(X + W * 0.5, Y + H * 0.72, X + W, Y + H * 0.84); g.lineTo(X + W, Y + H); g.lineTo(X, Y + H); g.fill();
    const j = Math.floor(t * 3); const px = X + W * (0.2 + ((j * 37) % 60) / 100), py = Y + H * (0.15 + ((j * 53) % 60) / 100); circle(g, px, py, 34, alpha('#2E72D2', 0.25)); circle(g, px, py, 16, '#2E72D2'); circle(g, px, py, 16, alpha('#ffffff', 0));
    rr(g, X + 20, Y + 50, W - 40, 80, 16); g.fillStyle = CORALC; g.fill(); text(g, 'RECALCULATING…', X + W / 2, Y + 92, { size: 34, font: FONTS.ui, weight: 900, color: '#ffffff' }); });
  g.restore();
} });
// s047 — "Map apps send cars into the river."
registerShot('s047', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#8ac8f0', '#d8eef8']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const cam = push(t, info.dur, F(960, 560, 1.05), F(1000, 580, 1.12));
  layer(g, cam, 1, (g) => {
    g.fillStyle = '#5a9a4a'; g.fillRect(-E.W, 560, E.W * 3, 600); g.fillStyle = '#3a88c0'; g.beginPath(); g.moveTo(1100, 560); g.quadraticCurveTo(1300, 700, 1200, 1200); g.lineTo(2600, 1200); g.lineTo(2600, 560); g.fill();
    g.fillStyle = '#6a6a74'; g.beginPath(); g.moveTo(-200, 820); g.lineTo(1180, 700); g.lineTo(1180, 780); g.lineTo(-200, 960); g.fill(); seg(g, [[-200, 890], [1180, 740]], 6, '#f2f2f2');
    rr(g, 900, 420, 260, 110, 10); g.fillStyle = '#2a7a4a'; g.fill(); text(g, 'GPS: TURN RIGHT', 1030, 476, { size: 28, font: FONTS.ui, weight: 900, color: '#ffffff' }); seg(g, [[1030, 530], [1030, 720]], 10, '#8a8a94');
    [[0, '#d84a3a'], [1.0, '#f2c21a'], [2.0, '#3fa06a']].forEach(([d, c]) => { const u = prog(t, 0.1 + d * 0.5, 1.4 + d * 0.5); if (u <= 0) return; const x = lerp(200, 1320, Math.min(u * 1.3, 1)), y = u < 0.77 ? lerp(860, 720, u / 0.77) : 720 + (u - 0.77) * 900, rot = u < 0.77 ? -0.1 : (u - 0.77) * 3;
      g.save(); g.translate(x, y); g.rotate(rot); rr(g, -90, -60, 180, 60, 18); g.fillStyle = c; g.fill(); rr(g, -50, -100, 100, 44, 12); g.fill(); g.fillStyle = '#cfeaf8'; g.fillRect(-40, -94, 34, 32); g.fillRect(6, -94, 34, 32); circle(g, -50, 0, 22, '#2a2a34'); circle(g, 50, 0, 22, '#2a2a34'); g.restore();
      if (u > 0.85) { const q = prog(u, 0.85, 1); for (let i = 0; i < 8; i++) circle(g, x + Math.cos(i) * 80 * q, 820 - Math.abs(Math.sin(i * 1.7)) * 160 * q, 16 * (1 - q) + 4, '#e8f6ff'); } });
  });
} });
// s048 — "NASA calls it the anomaly."
registerShot('s048', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 480, 1.1), F(960, 420, 1.25));
  layer(g, cam, 1, (g) => nasaRoom(g, t, C0, { alert: true }));
  nameTag(g, 'ANOMALY', 1180, 330, t, wt('anomaly', info, t, 1.0), { size: 50, fill: alpha('#d8343a', 0.92), color: '#ffffff' });
} });
// s049 — "It's you."  the red dot zooms down to you on a rooftop
registerShot('s049', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1100, 330, 1.5), F(1100, 360, 1.9));
  layer(g, cam, 1, (g) => { const R = city(g, t, C0); const roof = R.roofs[3], x = roof[0] + 160, y = roof[1];
    person(g, { x, y, s: 1.2, facing: -1, outfit: { ...HERO, wind: 0.6 }, pose: POSES.stand, expr: 'worried', look: [-0.3, -1], rim: { color: '#ffb070', dir: [0.6, -0.6] } });
    for (let k = 0; k < 3; k++) { const r = 40 + ((t * 160 + k * 60) % 180); g.strokeStyle = alpha('#ff3a3a', 1 - (r - 40) / 180); g.lineWidth = 6; g.beginPath(); g.ellipse(x, y, r * 1.4, r * 0.45, 0, 0, Math.PI * 2); g.stroke(); } });
} });
