// 02_fun.js — s020–s034: day one. Freeze time, rewind a test, blink to the lunch line and Tokyo, charge every phone,
// broccoli into fries, and the suit builds up stone by stone until the cape shows up.
import { E, registerShot, layer, blurLayer, ease, prog, clamp, lerp, rr, seg, circle, poly, alpha, glow, linGrad, text, FONTS, veil } from '/engine/core.js';
import { POSES, breathe, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { person, bigFaceV2, XP, emblem } from '../look.js';
import { YOU, YOU1, YOU3, HERO, THEO } from '../cast.js';
import { stone, blink, STONES } from '../stones.js';
import { classroom, ramenStall } from '../sets/world.js';
import { bedroom, GY } from '/projects/talk-to-animals/scenes/sets/house.js';
import { street, school } from '/projects/talk-to-animals/scenes/sets/outside.js';
import { say, nameTag, phone, wt, GOLDC, CORALC, MINT, SKYC } from '../ui.js';
import { RIM, F, push, KIDS } from '../common.js';
import { bus, freezeRing, hand } from '../props.js';

const C0 = { x: 0, y: 0, z: 1 };
const FROZEN = (g, k) => { if (k > 0) veil(g, '#8fb8ff', 0.28 * k, 'multiply'); };
const TEACHER = { top: 'sweater', color: '#8a5ad6', legs: '#3a3340', shoes: '#3a3a44', hair: 'bun' };

// s020 — "Day one. You're late."
registerShot('s020', { draw(g, t, info) {
  const cam = push(t, info.dur, F(600, 680, 1.55), F(560, 690, 1.7)), up = ease.outBack(prog(t, 0.3, 0.8));
  layer(g, cam, 1, (g) => { const R = bedroom(g, t, C0, { time: 'day', clockStr: '7:59' });
    person(g, { x: R.bedX - 160 + 220 * up, y: GY() - 60 + 100 * up, s: 1.15, facing: 1, outfit: YOU, pose: up > 0.5 ? POSES.jump : XP.sitBed, expr: 'surprised', look: [1, 0], rim: RIM, shadow: false }); });
  nameTag(g, 'DAY ONE', 300, 110, t, 0.1, { size: 44 });
} });
// s021 — "You freeze time,"  you snap; a ring rushes out and the street stops
registerShot('s021', { draw(g, t, info) {
  const ts = Math.max(0.15, wt('freeze', info, t, 0.3)), fk = ease.out(prog(t, ts, ts + 0.6));
  const cam = push(t, info.dur, F(900, 620, 1.3), F(900, 620, 1.36));
  layer(g, cam, 1, (g) => { const R = street(g, t * (1 - fk), C0, { bench: false });
    for (const [x, c] of [[1260, KIDS[0]], [1500, KIDS[3]]]) person(g, { x, y: R.GY + 20, s: 1.2, facing: -1, outfit: c, pose: walkPose(3 + (fk < 1 ? t * 8 : ts * 8), {}), expr: 'neutral', look: [-1, 0], rim: RIM });
    person(g, { x: 820, y: R.GY + 30, s: 1.45, facing: 1, outfit: YOU, pose: POSES.point, expr: 'grin', look: [1, -0.2], rim: RIM });
    FROZEN(g, fk); freezeRing(g, 900, R.GY - 200, prog(t, ts, ts + 1.2)); });
} });
// s022 — "...walk past the frozen bus,"
registerShot('s022', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 600, 1.2), F(1040, 600, 1.25));
  layer(g, cam, 1, (g) => { const R = street(g, 0, C0, { bench: false }); bus(g, 1200, R.ROAD + 30, 1.0);
    person(g, { x: 1600, y: R.GY + 20, s: 1.2, facing: -1, outfit: KIDS[1], pose: walkPose(2.2, {}), expr: 'neutral', look: [-1, 0], rim: RIM });
    FROZEN(g, 1);
    person(g, { x: lerp(500, 1000, prog(t, 0, info.dur)), y: R.GY + 30, s: 1.45, facing: 1, outfit: YOU, pose: walkPose(t * 7, {}), expr: 'grin', look: [1, 0], rim: RIM }); });
} });
// s023 — "...and sit down early."
registerShot('s023', { draw(g, t, info) {
  const cam = push(t, info.dur, F(980, 600, 1.15), F(980, 610, 1.22));
  layer(g, cam, 1, (g) => { const R = classroom(g, t, C0, { clock: 59, frozen: true });
    person(g, { x: 1640, y: R.GY + 20, s: 1.5, facing: -1, outfit: TEACHER, pose: POSES.talk, expr: t > 0.8 ? 'surprised' : 'neutral', look: [-1, 0.2], rim: RIM });
    FX.chair(g, 740, R.GY + 20, 1.5, '#8a5a3a'); person(g, { x: 760, y: R.GY + 20, s: 1.35, facing: 1, outfit: YOU, pose: POSES.sit, expr: 'smile', look: [1, 0], rim: RIM, shadow: false }); });
} });
// s024 / s025 — "Math test. Wrong answer." / "You rewind ten seconds."  the test, the answer un-writes
function test(g, t, info, rewind) {
  g.fillStyle = '#c8a07a'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  g.save(); const z = 1 + 0.04 * t / info.dur; g.translate(960, 540); g.scale(z, z); g.rotate(-0.03); g.translate(-960, -540);
  rr(g, 360, 80, 1200, 960, 16); g.fillStyle = '#fffdf6'; g.fill(); text(g, 'MATH TEST', 960, 170, { size: 56, font: FONTS.title, weight: 700, color: '#2a2a34' });
  ['1.  2x = 8          x = 4', '2.  x + 5 = 9       x = 4', '3.  10 − x = 3     x = 7'].forEach((l, i) => { text(g, l, 460, 290 + i * 110, { size: 50, font: FONTS.title, weight: 700, color: '#2a2a34', align: 'left' }); text(g, '✓', 1380, 290 + i * 110, { size: 56, font: FONTS.title, weight: 700, color: '#3fa06a' }); });
  text(g, '4.  3x + 7 = 22', 460, 620, { size: 50, font: FONTS.title, weight: 700, color: '#2a2a34', align: 'left' });
  const u = rewind ? prog(t, 0.2, 1.2) : 0, w = rewind ? prog(t, 1.4, 2.2) : 0;
  if (u < 1) { g.save(); g.globalAlpha *= 1 - u; text(g, 'x = 6', 1020, 620, { size: 50, font: FONTS.title, weight: 700, color: '#2a2a34', align: 'left' }); seg(g, [[1300, 580], [1400, 660]], 10, CORALC); seg(g, [[1400, 580], [1300, 660]], 10, CORALC); g.restore(); }
  if (w > 0) { g.save(); g.beginPath(); g.rect(1000, 560, 260 * w, 100); g.clip(); text(g, 'x = 5', 1020, 620, { size: 50, font: FONTS.title, weight: 700, color: '#2E72D2', align: 'left' }); g.restore(); if (w >= 1) text(g, '✓', 1380, 620, { size: 56, font: FONTS.title, weight: 700, color: '#3fa06a' }); }
  g.restore();
  if (rewind && t < 1.4) { veil(g, '#5a8ad8', 0.18); for (let y = (t * 900) % 60; y < E.H; y += 60) { g.fillStyle = alpha('#ffffff', 0.08); g.fillRect(0, y, E.W, 6); }
    g.save(); g.translate(260, 200); poly(g, [[0, 0], [60, -40], [60, 40]], '#ffffff'); poly(g, [[-60, 0], [0, -40], [0, 40]], '#ffffff'); g.restore(); text(g, '−10 s', 260, 300, { size: 64, font: FONTS.ui, weight: 900, color: '#ffffff', stroke: 10, strokeColor: alpha('#1a1420', 0.8) }); }
}
registerShot('s024', { draw(g, t, info) { test(g, t, info, false); } });
registerShot('s025', { draw(g, t, info) { test(g, t, info, true); } });
// s026 — "Blink. You're first in the lunch line."
registerShot('s026', { draw(g, t, info) {
  const cam = push(t, info.dur, F(800, 620, 1.25), F(780, 620, 1.3)), b = prog(t, 0.05, 0.7);
  layer(g, cam, 1, (g) => { const R = school(g, t, C0, { room: 'cafe', tables: [] });
    rr(g, 200, R.GY - 260, 900, 120, 10); g.fillStyle = '#c8ccd4'; g.fill(); for (let i = 0; i < 4; i++) { rr(g, 240 + i * 210, R.GY - 300, 170, 50, 8); g.fillStyle = ['#f2c21a', '#3fa06a', '#e8892a', '#d84a3a'][i]; g.fill(); }
    [1240, 1440, 1640, 1840].forEach((x, i) => person(g, { x, y: R.GY + 30, s: 1.3, facing: -1, outfit: KIDS[i + 1], pose: POSES.stand, expr: i === 0 ? 'surprised' : 'neutral', look: [-1, 0], rim: RIM }));
    if (b > 0.25) person(g, { x: 1000, y: R.GY + 30, s: 1.35, facing: 1, outfit: YOU1, pose: POSES.holdFront, expr: 'grin', look: [-0.6, 0], rim: RIM });
    blink(g, 1000, R.GY - 140, b); });
} });
// s027 — "Blink. Ramen in Tokyo."
registerShot('s027', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 640, 1.25), F(960, 650, 1.32)), b = prog(t, 0.05, 0.7);
  layer(g, cam, 1, (g) => { const R = ramenStall(g, t, C0);
    if (b > 0.25) person(g, { x: 960, y: R.GY + 20, s: 1.4, facing: 1, outfit: YOU1, pose: POSES.sit, expr: 'grin', look: [0.4, 0.5], rim: { color: '#ff9ad8', dir: [-0.8, -0.5] }, shadow: false });
    blink(g, 960, R.GY - 200, b); });
} });
// s028 — "Blink. Back before the bell."
registerShot('s028', { draw(g, t, info) {
  const cam = push(t, info.dur, F(900, 600, 1.2), F(900, 610, 1.26)), b = prog(t, 0.05, 0.7);
  layer(g, cam, 1, (g) => { const R = classroom(g, t, C0, { clock: 60 });
    FX.chair(g, 740, R.GY + 20, 1.5, '#8a5a3a'); if (b > 0.25) person(g, { x: 760, y: R.GY + 20, s: 1.35, facing: 1, outfit: YOU1, pose: POSES.sit, expr: 'smile', look: [1, 0], rim: RIM, shadow: false });
    blink(g, 760, R.GY - 180, b);
    const sh = Math.sin(t * 60) * 6; g.save(); g.translate(1240 + sh, 200); poly(g, [[-60, 40], [60, 40], [40, -30], [-40, -30]], GOLDC); circle(g, 0, -40, 40, GOLDC); circle(g, 0, 50, 12, '#8a5a1a'); g.restore();
    for (let k = 0; k < 3; k++) { const r = 70 + ((t * 200 + k * 40) % 120); g.strokeStyle = alpha(GOLDC, 1 - (r - 70) / 120); g.lineWidth = 6; g.beginPath(); g.arc(1240, 200, r, -0.6, 0.6); g.stroke(); g.beginPath(); g.arc(1240, 200, r, Math.PI - 0.6, Math.PI + 0.6); g.stroke(); } });
} });
// s029 — "Every dead phone in class charges in your hand."
registerShot('s029', { draw(g, t, info) {
  blurLayer(g, 8, (g) => classroom(g, t, C0, { clock: 61 }), null);
  [[620, -0.15], [960, 0], [1300, 0.15]].forEach(([x, rot], i) => { const k = clamp(prog(t, 0.3 + i * 0.25, 1.6 + i * 0.25));
    g.save(); g.translate(x, 470); g.rotate(rot); phone(g, 0, 0, 440, (g, X, Y, W, H) => {
      g.fillStyle = '#1a2030'; g.fillRect(X, Y, W, H); rr(g, X + W * 0.2, Y + H * 0.36, W * 0.6, H * 0.22, 14); g.strokeStyle = '#ffffff'; g.lineWidth = 6; g.stroke();
      rr(g, X + W * 0.2 + 8, Y + H * 0.36 + 8, (W * 0.6 - 16) * k, H * 0.22 - 16, 8); g.fillStyle = k < 0.2 ? CORALC : MINT; g.fill();
      text(g, Math.round(k * 100) + ' %', X + W / 2, Y + H * 0.7, { size: 46, font: FONTS.ui, weight: 900, color: '#ffffff' }); }); g.restore(); });
  glow(g, 960, 980, 260, STONES[2][1], 0.5); hand(g, 960, 1100, 1.6, { sleeve: YOU.color });
} });
// s030 — "Broccoli turns into fries."
registerShot('s030', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#e8eef2', '#c8d8e0']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const k = ease.inOut(prog(t, 0.3, 0.9)), z = 1 + 0.05 * t / info.dur; g.save(); g.translate(960, 560); g.scale(z, z); g.translate(-960, -560);
  g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(960, 640, 460, 150, 0, 0, Math.PI * 2); g.fill(); g.strokeStyle = alpha('#000000', 0.08); g.lineWidth = 6; g.stroke();
  for (let i = 0; i < 7; i++) { const x = 760 + i * 66, y = 600 + (i % 2) * 30;
    if (k < 1) { g.save(); g.globalAlpha *= 1 - k; seg(g, [[x, y + 40], [x, y]], 18, '#5a9a3a'); for (const [dx, dy] of [[-22, -10], [22, -10], [0, -28]]) circle(g, x + dx, y + dy, 26, '#3f8a2a'); g.restore(); }
    if (k > 0) { g.save(); g.globalAlpha *= k; g.translate(x, y + 20); g.rotate((i - 3) * 0.15); rr(g, -12, -80, 24, 110, 6); g.fillStyle = '#f2c23a'; g.fill(); g.fillStyle = alpha('#ffffff', 0.35); g.fillRect(-8, -76, 6, 100); g.restore(); } }
  if (k > 0 && k < 1) for (let i = 0; i < 10; i++) FX.sparkle(g, 760 + i * 50, 520 + (i % 3) * 40, 26, STONES[4][1], 1 - Math.abs(k - 0.5) * 2);
  g.restore();
} });
// s031 — "And every stone you touch snaps onto your hoodie."  the badge filling up
registerShot('s031', { draw(g, t, info) {
  g.fillStyle = YOU.color; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); g.fillStyle = alpha('#000000', 0.12); g.fillRect(0, 0, E.W, 120);
  for (const dx of [-260, 260]) seg(g, [[960 + dx, -40], [960 + dx * 1.1, 300]], 22, '#f6f2ea');
  const n = Math.min(6, Math.floor(prog(t, 0.2, info.dur - 0.3) * 6) + 1), z = 1 + 0.04 * t / info.dur;
  g.save(); g.translate(960, 600); g.scale(z, z); emblem(g, [0, 0], 220, n); g.restore();
  const i = n - 1, a = -Math.PI / 2 + i * Math.PI / 3, u = ((prog(t, 0.2, info.dur - 0.3) * 6) % 1);
  if (n <= 6 && u < 0.6) stone(g, lerp(960 + Math.cos(a) * 900, 960 + Math.cos(a) * 150, u / 0.6), lerp(600 + Math.sin(a) * 700, 600 + Math.sin(a) * 150, u / 0.6), 0.9, STONES[i][1], { t });
} });
// s032 — "By Friday, you have gloves. Boots."
registerShot('s032', { draw(g, t, info) {
  const tg = wt('gloves', info, t, 0.8), tb = wt('boots', info, t, 1.6), boots = t > tb;
  const cam = push(t, info.dur, F(900, 600, 1.45), F(900, 640, 1.55));
  const of = t < tg ? YOU1 : boots ? { ...YOU3, boots: HERO.boots } : YOU3;
  layer(g, cam, 1, (g) => { const R = street(g, t, C0, { bench: false });
    person(g, { x: 900, y: R.GY + 30, s: 1.7, facing: 1, outfit: of, pose: POSES.cheer, expr: 'grin', look: [0.4, -0.3], rim: RIM });
    for (const [at, y] of [[tg, R.GY - 260], [tb, R.GY]]) { const k = prog(t, at, at + 0.5); if (k > 0 && k < 1) for (let i = 0; i < 8; i++) FX.sparkle(g, 900 + Math.cos(i) * 90 * k * 2, y + Math.sin(i * 1.7) * 60 * k, 24, GOLDC, 1 - k); } });
  nameTag(g, 'GLOVES', 1380, 380, t, tg, { size: 40 }); nameTag(g, 'BOOTS', 1380, 470, t, tb, { size: 40 });
} });
// s033 — "And a cape."
registerShot('s033', { draw(g, t, info) {
  const k = ease.out(prog(t, 0.1, 0.6)), cam = push(t, info.dur, F(900, 600, 1.4), F(900, 600, 1.5));
  layer(g, cam, 1, (g) => { const R = street(g, t, C0, { bench: false });
    person(g, { x: 900, y: R.GY + 30, s: 1.7, facing: 1, outfit: k > 0 ? { ...HERO, wind: 1 - 0.5 * k } : { ...YOU3, boots: HERO.boots }, pose: POSES.cheer, expr: 'surprised', look: [-0.6, -0.3], rim: RIM });
    if (k > 0 && k < 1) for (let i = 0; i < 14; i++) FX.sparkle(g, 820 - i * 30 * k, R.GY - 280 + Math.sin(i * 2.1) * 120 * k, 26, '#ff6a5a', 1 - k); });
  nameTag(g, 'CAPE', 1380, 380, t, 0.2, { size: 44, fill: alpha('#d8343a', 0.92), color: '#ffffff' });
} });
// s034 — "You didn't ask for the cape."
registerShot('s034', { draw(g, t, info) {
  blurLayer(g, 9, (g) => street(g, t, C0, { bench: false }), null);
  g.save(); g.translate(260 + Math.sin(t * 6) * 20, 0); g.fillStyle = HERO.cape; g.beginPath(); g.moveTo(-200, 1100); g.quadraticCurveTo(120, 700 + Math.sin(t * 5) * 40, 40, 300); g.quadraticCurveTo(260, 640, 300, 1100); g.closePath(); g.fill(); g.restore();
  bigFaceV2(g, 1060, 640, 290, { outfit: HERO, expr: 'unimpressed', look: [-0.7, 0.1] });
} });
