// sets/home.js — the family apartment, built BRIGHT (CLAUDE.md: centre brightness ~85–100):
// lit warm walls, big windows with sun, light floors. Rooms: kitchen, living room (also Mr. Patel's), bedroom, bathroom, nursery.
// Every room takes o.night for the night version (moon window, lamp light).
import { E, V, mood, layer, rng, rr, seg, circle, poly, linGrad, radGrad, glow, alpha, shade, mix, text, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const GYH = () => E.H * 0.8;
const CEIL = () => GYH() - 900;

// generic room: back wall, ceiling band, one big window (left by default), floor with a light pool
export function room(g, t, cam, o = {}) {
  const night = !!o.night, M = mood(night ? 'night' : (o.mood || 'day')), GY = GYH(), CX = E.W / 2;
  const base = o.wall || (night ? '#3a3d66' : '#c9a98e'), wall = night ? shade(base, -0.15) : base, wallDark = shade(wall, night ? -0.45 : -0.35);
  const win = o.window ?? { x: CX - 900, w: 560, h: 520 }, light = night ? '#c9d4ff' : '#ffe2b0';
  layer(g, cam, 0.6, (g) => {
    g.fillStyle = linGrad(g, 0, CEIL(), 0, GY, [shade(wall, -0.12), wall, shade(wall, -0.08)]); g.fillRect(-E.W * 2, CEIL() - E.H, E.W * 5, GY - CEIL() + E.H);
    if (win) {                                                                                     // window light spill on the wall
      g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = radGrad(g, win.x + win.w / 2, GY - 520, 40, 1100, [alpha(light, night ? 0.08 : 0.15), alpha(light, 0)]); g.fillRect(-E.W, CEIL() - E.H, E.W * 4, GY + E.H); g.restore();
      const wy = GY - (win.y ?? 780), sky = night ? M.sky : (o.sky || mood('day').sky);
      FX.windowFrame(g, { x: win.x, y: wy, w: win.w, h: win.h, cols: win.cols || 2, rows: win.rows || 2, frame: night ? shade(wall, -0.5) : '#f2ebe0', bar: 12 }, (g, x, y, w, h) => {
        g.fillStyle = linGrad(g, 0, y, 0, y + h, sky); g.fillRect(x, y, w, h);
        if (night) { FX.stars(g, t, { count: 40, area: [x, y, w, h * 0.6], color: '#dfe6ff' }); FX.moon(g, x + w * 0.68, y + h * 0.3, 28); }
        else { FX.sun(g, x + w * 0.7, y + h * 0.36, 40, '#fffaf0', '#ffe2a8', 4); FX.clouds(g, { y: y + 30, h: 90, color: '#ffffff', a: 0.4, seed: 3 }); }
        FX.skyline(g, { x: x - 20, y: y + h + 4, w: w + 40, minH: 50, maxH: 200, color: night ? '#151a3a' : '#9aaccc', windowColor: night ? '#ffcf8a' : alpha('#ffffff', 0.5), lit: night ? 0.35 : 0.15, seed: 5 });
        if (o.cracked) for (let i = 0; i < 3; i++) { const k = o.cracked[i] ?? 0; if (k > 0) drawCrack(g, x + w * (0.2 + i * 0.3), y + h * (0.4 + (i % 2) * 0.2), w * 0.3, k, i + 2); }
      });
      if (!night) FX.godRays(g, win.x + win.w * 0.7, wy + win.h * 0.36, { angle: win.x < CX ? 0.6 : Math.PI - 0.6, spread: 0.55, len: 1500, color: '#ffe2a8', a: 0.08, t });
      rr(g, win.x - 24, wy + win.h, win.w + 48, 20, 6); g.fillStyle = '#f2ebe0'; g.fill();
    }
    g.fillStyle = shade(wall, 0.12); g.fillRect(-E.W * 2, CEIL() - 6, E.W * 5, 14);                // crown moulding
    g.fillStyle = shade(wall, -0.2); g.fillRect(-E.W * 2, CEIL() - E.H, E.W * 5, E.H - 6);         // ceiling
    g.fillStyle = wallDark; g.fillRect(-E.W * 2, GY - 34, E.W * 5, 34);                             // skirting
  });
  layer(g, cam, 0.9, (g) => {
    const fl = o.floor || (night ? '#2a2c4a' : '#a57a5a');
    g.fillStyle = linGrad(g, 0, GY - 10, 0, E.H * 1.6, [shade(fl, 0.05), shade(fl, -0.35)]); g.fillRect(-E.W * 2, GY - 10, E.W * 5, E.H * 2);
    FX.floorLines(g, GY, E.H * 1.4, 'rgba(0,0,0,.14)', 0.09);
    if (win) FX.pool(g, win.x + win.w * 0.6, GY + 100, 560, 80, light, night ? 0.12 : 0.24);
  });
  return { GY, CX, M, wall, wallDark, light, night, CEIL: CEIL() };
}
function drawCrack(g, x, y, r, k, seed) {
  const rnd = rng(seed); g.save(); g.strokeStyle = 'rgba(255,255,255,.9)'; g.lineWidth = 2.5; g.lineCap = 'round';
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + rnd() * 0.4, L = r * (0.5 + rnd() * 0.5) * Math.min(1, k * 1.4); g.beginPath(); g.moveTo(x, y); let px = x, py = y; for (let s = 1; s <= 4; s++) { px = x + Math.cos(a + (rnd() - 0.5) * 0.3) * L * s / 4; py = y + Math.sin(a + (rnd() - 0.5) * 0.3) * L * s / 4; g.lineTo(px, py); } g.stroke(); }
  if (k > 0.5) { g.beginPath(); for (let i = 0; i <= 8; i++) { const a = i / 8 * Math.PI * 2; g.lineTo(x + Math.cos(a) * r * 0.35, y + Math.sin(a) * r * 0.35); } g.stroke(); }
  g.restore();
}

// kitchen: window left, counter + cabinets + fridge right, pendant lamp; returns room info + table helper
export function kitchen(g, t, cam, o = {}) {
  const R = room(g, t, cam, { ...o, wall: o.wall || (o.night ? '#4a3a52' : '#d2a985') }), { GY, CX } = R, night = R.night;
  layer(g, cam, 0.6, (g) => {
    const kx = CX + 240, cab = night ? '#3a2e3e' : '#f1e6d4', cabDark = shade(cab, -0.18);
    g.fillStyle = cab; g.fillRect(kx, GY - 830, 720, 250); g.strokeStyle = cabDark; g.lineWidth = 4; for (let i = 0; i <= 4; i++) { g.beginPath(); g.moveTo(kx + i * 180, GY - 830); g.lineTo(kx + i * 180, GY - 580); g.stroke(); }
    g.fillStyle = night ? '#2f3a4a' : '#bfe0e0'; g.fillRect(kx, GY - 580, 720, 250);                    // tiled splash
    g.strokeStyle = alpha('#ffffff', night ? 0.06 : 0.35); g.lineWidth = 2; for (let y = GY - 580; y < GY - 330; y += 40) { g.beginPath(); g.moveTo(kx, y); g.lineTo(kx + 720, y); g.stroke(); }
    FX.counter(g, { x: kx, y: GY, w: 720, h: 330, color: cab, top: night ? '#5a4a5a' : '#8a6a52', doors: 4 });
    rr(g, kx + 760, GY - 760, 300, 760, 20); g.fillStyle = night ? '#4a4a5e' : '#f7f4ee'; g.fill(); seg(g, [[kx + 780, GY - 500], [kx + 1040, GY - 500]], 4, shade(night ? '#4a4a5e' : '#f7f4ee', -0.15));
    seg(g, [[kx + 790, GY - 680], [kx + 790, GY - 560]], 8, '#9aa0aa'); seg(g, [[kx + 790, GY - 440], [kx + 790, GY - 340]], 8, '#9aa0aa');
    if (o.fridgeGone) { rr(g, kx + 760, GY - 760, 300, 760, 20); g.fillStyle = shade(R.wall, -0.15); g.fill(); }
    for (let i = 0; i < 3; i++) { rr(g, kx + 70 + i * 90, GY - 400, 50, 66, 8); g.fillStyle = ['#e8892a', '#3FA06A', '#2E72D2'][i]; g.fill(); }   // jars
  });
  layer(g, cam, 0.95, (g) => {
    const lx = CX - 30, ly = GY - 600; seg(g, [[lx, R.CEIL], [lx, ly]], 3, '#3a3036');
    poly(g, [[lx - 70, ly + 56], [lx + 70, ly + 56], [lx + 26, ly], [lx - 26, ly]], night ? '#2a2430' : '#2f5a5a');
    if (!night || o.lampOn) { glow(g, lx, ly + 62, 300, '#ffd28a', night ? 0.6 : 0.35); FX.lightCone(g, lx, ly + 56, { angle: Math.PI / 2, spread: 0.9, len: 620, color: '#ffd28a', a: night ? 0.16 : 0.08 }); }
  });
  return R;
}
// side-view table; returns the top y
export function table(g, x, GY, o = {}) {
  const { w = 560, h = 190, color = '#7a5236', top = '#9a6a46' } = o, ty = GY - h;
  seg(g, [[x - w / 2 + 40, ty + 10], [x - w / 2 + 56, GY]], 14, shade(color, -0.2)); seg(g, [[x + w / 2 - 40, ty + 10], [x + w / 2 - 56, GY]], 14, shade(color, -0.2));
  rr(g, x - w / 2, ty - 14, w, 24, 8); g.fillStyle = color; g.fill(); g.fillStyle = top; g.fillRect(x - w / 2 + 6, ty - 14, w - 12, 6);
  return ty - 14;
}
// living room: big window right, couch, rug, TV, floor lamp. o.patel = Mr. Patel's darker, cosier version
export function living(g, t, cam, o = {}) {
  const R = room(g, t, cam, { ...o, wall: o.wall || (o.patel ? '#8a6a5e' : (o.night ? '#3e4066' : '#d9c3a4')), window: o.window ?? { x: E.W / 2 + 420, w: 520, h: 520 } }), { GY, CX } = R;
  layer(g, cam, 0.62, (g) => {                                                                       // pictures on the wall
    for (const [dx, w, h, c] of [[-640, 180, 130, '#e8a87c'], [-420, 120, 160, '#7ab0c8']]) { rr(g, CX + dx, GY - 640, w, h, 6); g.fillStyle = '#f2ebe0'; g.fill(); g.fillStyle = c; g.fillRect(CX + dx + 12, GY - 628, w - 24, h - 24); }
  });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = o.patel ? '#9a3a3a' : '#c9563a'; g.beginPath(); g.ellipse(CX - 60, GY + 70, 620, 70, 0, 0, Math.PI * 2); g.fill();   // rug
    g.fillStyle = alpha('#ffffff', 0.12); g.beginPath(); g.ellipse(CX - 60, GY + 70, 520, 50, 0, 0, Math.PI * 2); g.fill();
    if (!o.noTV) { rr(g, CX + 120, GY - 150, 300, 150, 8); g.fillStyle = '#5a3e2e'; g.fill(); FX.screen(g, { x: CX + 140, y: GY - 360, w: 260, h: 160, glowC: '#8fd0ff', a: 0.3 }); }
    seg(g, [[CX - 900, GY], [CX - 900, GY - 460]], 6, '#2a2430'); poly(g, [[CX - 960, GY - 460], [CX - 840, GY - 460], [CX - 870, GY - 540], [CX - 930, GY - 540]], '#f2e2c8'); glow(g, CX - 900, GY - 480, 260, '#ffd28a', 0.35);
  });
  return R;
}
// couch (side view, back to the wall); returns seat y. o.lift = how high it is lifted, o.rot
export function couch(g, x, y, s = 1, o = {}) {
  const { color = '#3d6aa8', lift = 0, rot = 0 } = o;
  g.save(); g.translate(x, y - lift); g.rotate(rot); g.scale(s, s);
  rr(g, -330, -250, 660, 150, 40); g.fillStyle = shade(color, -0.1); g.fill();                          // back
  rr(g, -360, -150, 720, 120, 30); g.fillStyle = color; g.fill();                                       // seat
  for (const dx of [-360, 300]) { rr(g, dx, -210, 60, 180, 28); g.fillStyle = shade(color, -0.2); g.fill(); }  // arms
  g.fillStyle = alpha('#ffffff', 0.12); g.fillRect(-330, -146, 660, 10);
  for (const dx of [-300, 280]) { g.fillStyle = '#2a1e18'; g.fillRect(dx, -30, 20, 30); }
  g.restore();
  return y - lift - 150 * s;
}
export function armchair(g, x, y, s = 1, color = '#6a4a3a') {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -150, -300, 300, 200, 50); g.fillStyle = shade(color, -0.15); g.fill(); rr(g, -170, -150, 340, 120, 30); g.fillStyle = color; g.fill();
  for (const dx of [-190, 130]) { rr(g, dx, -210, 60, 180, 26); g.fillStyle = shade(color, -0.25); g.fill(); }
  g.restore();
}
// bedroom: window left (sun or moon), desk + lamp right
export function bedroom(g, t, cam, o = {}) {
  const R = room(g, t, cam, { ...o, wall: o.wall || (o.night ? '#33365e' : '#a9c4d8'), window: o.window ?? { x: E.W / 2 - 900, w: 460, h: 480 } }), { GY, CX } = R;
  layer(g, cam, 0.62, (g) => {
    rr(g, CX + 520, GY - 660, 190, 250, 6); g.fillStyle = R.night ? '#2a2a4a' : '#f2ebe0'; g.fill(); g.fillStyle = R.night ? '#4a3a6a' : '#e8892a'; g.fillRect(CX + 540, GY - 640, 150, 120);  // poster
    g.fillStyle = R.night ? '#5a4a3a' : '#f2ebe0'; rr(g, CX + 120, GY - 700, 150, 170, 8); g.fill();                                                      // calendar
    g.fillStyle = '#c84a3a'; g.fillRect(CX + 120, GY - 700, 150, 44); text(g, o.calendar || 'MON', CX + 195, GY - 678, { size: 28, color: '#fff', font: FONTS.ui, weight: 900 });
    for (let i = 0; i < 3; i++) for (let j = 0; j < 5; j++) { g.fillStyle = alpha('#3a3440', 0.35); g.fillRect(CX + 134 + j * 26, GY - 640 + i * 28, 16, 14); }
  });
  layer(g, cam, 0.9, (g) => {
    rr(g, CX + 420, GY - 230, 360, 22, 6); g.fillStyle = '#7a5236'; g.fill(); seg(g, [[CX + 440, GY - 210], [CX + 440, GY]], 12, '#5a3a26'); seg(g, [[CX + 760, GY - 210], [CX + 760, GY]], 12, '#5a3a26');
    seg(g, [[CX + 700, GY - 232], [CX + 690, GY - 360], [CX + 640, GY - 400]], 6, '#2a2430'); poly(g, [[CX + 600, GY - 380], [CX + 660, GY - 430], [CX + 680, GY - 400], [CX + 620, GY - 350]], '#e8892a');
    if (R.night && o.lamp) glow(g, CX + 630, GY - 380, 300, '#ffd28a', 0.5);
  });
  return R;
}
// bed (side view), head at the left; returns mattress top y. o.crack draws a split frame
export function bed(g, x, GY, s = 1, o = {}) {
  const w = 700 * s, top = GY - 130 * s, frame = o.frame || '#6a4a36', sheet = o.sheet || '#5a7ac8';
  g.fillStyle = frame; g.fillRect(x - w / 2, GY - 90 * s, w, 90 * s); if (!o.noHead) g.fillRect(x - w / 2 - 14 * s, GY - 260 * s, 30 * s, 260 * s); g.fillRect(x + w / 2 - 12 * s, GY - 150 * s, 24 * s, 150 * s);
  rr(g, x - w / 2 + 8 * s, top, w - 16 * s, 46 * s, 18 * s); g.fillStyle = sheet; g.fill();
  rr(g, x - w / 2 + 22 * s, top - 30 * s, 150 * s, 40 * s, 16 * s); g.fillStyle = '#f2ecf6'; g.fill();
  if (o.crack) { g.strokeStyle = 'rgba(0,0,0,.7)'; g.lineWidth = 6 * s; g.beginPath(); g.moveTo(x - 40 * s, GY - 90 * s); g.lineTo(x - 10 * s, GY - 50 * s); g.lineTo(x - 50 * s, GY); g.stroke(); }
  return top;
}
// bathroom: tiles, mirror, sink
export function bathroom(g, t, cam, o = {}) {
  const R = room(g, t, cam, { ...o, wall: '#cfe6ea', window: o.window ?? { x: E.W / 2 + 560, w: 260, h: 300, y: 820, cols: 1, rows: 2 } }), { GY, CX } = R;
  layer(g, cam, 0.62, (g) => {
    g.strokeStyle = alpha('#ffffff', 0.5); g.lineWidth = 2; for (let y = GY - 420; y < GY; y += 60) { g.beginPath(); g.moveTo(-E.W, y); g.lineTo(E.W * 2, y); g.stroke(); } for (let x = -E.W; x < E.W * 2; x += 60) { g.beginPath(); g.moveTo(x, GY - 420); g.lineTo(x, GY); g.stroke(); }
    rr(g, CX - 260, GY - 760, 420, 300, 16); g.fillStyle = '#e8eef0'; g.fill(); rr(g, CX - 244, GY - 744, 388, 268, 10); g.fillStyle = linGrad(g, 0, GY - 744, 0, GY - 476, ['#bfe0f0', '#8ab8d0']); g.fill();
    g.fillStyle = alpha('#ffffff', 0.4); poly(g, [[CX - 200, GY - 744], [CX - 140, GY - 744], [CX - 230, GY - 476], [CX - 244, GY - 476], [CX - 244, GY - 700]], alpha('#ffffff', 0.35));
  });
  layer(g, cam, 0.9, (g) => { rr(g, CX - 230, GY - 330, 360, 60, 24); g.fillStyle = '#f7f7f4'; g.fill(); g.fillStyle = '#d8dcdc'; g.fillRect(CX - 70, GY - 270, 40, 270); seg(g, [[CX - 50, GY - 330], [CX - 50, GY - 380], [CX - 10, GY - 380]], 8, '#b8c0c4'); });
  return R;
}
// nursery: night, moon window, crib with bars, mobile. o.bent = 0..1 bars torn off
export function nursery(g, t, cam, o = {}) {
  const R = room(g, t, cam, { ...o, night: o.night ?? true, wall: o.wall || (o.night === false ? '#f2d2dc' : '#4a3f6e'), window: o.window ?? { x: E.W / 2 - 860, w: 420, h: 460 } }), { GY, CX } = R;
  layer(g, cam, 0.62, (g) => {                                                                     // stars painted on the wall + night light
    for (let i = 0; i < 14; i++) { const r2 = rng(30 + i); FX.sparkle(g, CX - 300 + r2() * 900, GY - 780 + r2() * 400, 10, '#fff1c8', 0.35); }
    glow(g, CX + 560, GY - 120, 260, '#ffb8d0', R.night ? 0.45 : 0.2); circle(g, CX + 560, GY - 120, 26, '#ffd8e6');
  });
  return R;
}
// crib (side view) at x, floor GY; returns mattress top y. o.bent 0..1 = bars bent / torn off
export function crib(g, x, GY, s = 1, o = {}) {
  const { bent = 0, color = '#f2ebe0', t = 0 } = o, w = 520 * s, h = 380 * s, top = GY - h, mat = GY - 160 * s;
  g.fillStyle = shade(color, -0.1); g.fillRect(x - w / 2, mat, w, 30 * s);
  for (const dx of [-w / 2, w / 2 - 22 * s]) { g.fillStyle = color; g.fillRect(x + dx, top - 20 * s, 22 * s, h + 20 * s); }
  rr(g, x - w / 2, top - 10 * s, w, 20 * s, 8 * s); g.fillStyle = color; g.fill(); g.fillRect(x - w / 2, mat - 10 * s, w, 14 * s);
  const n = 11; for (let i = 1; i < n; i++) {
    const bx = x - w / 2 + i * w / n, gone = bent > 0 && i >= 4 && i <= 7;
    if (gone) { const k = clamp01(bent), ang = (i - 5.5) * 0.5 * k; g.save(); g.translate(bx, mat); g.rotate(ang); g.strokeStyle = color; g.lineWidth = 10 * s; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(30 * k * s * (i < 6 ? -1 : 1), -(h - 170 * s) * 0.6, 60 * k * s * (i < 6 ? -1 : 1), -(h - 170 * s) * (1 - 0.4 * k)); g.stroke(); g.restore(); }
    else seg(g, [[bx, top], [bx, mat]], 10 * s, color);
  }
  if (o.mobile !== false) { const mx = x + w * 0.2; seg(g, [[x + w / 2 - 11 * s, top - 20 * s], [x + w / 2 - 11 * s, top - 160 * s], [mx, top - 160 * s]], 6 * s, color);
    for (let i = 0; i < 4; i++) { const a = t * 0.6 + i * Math.PI / 2, ox = mx + Math.cos(a) * 60 * s; seg(g, [[mx, top - 160 * s], [ox, top - 110 * s]], 2 * s, alpha(color, 0.7)); FX.sparkle(g, ox, top - 100 * s, 14 * s, ['#ffd47e', '#F29AC0', '#8fd0ff', '#5fd39a'][i], 0.9); } }
  return mat;
}
const clamp01 = (v) => Math.max(0, Math.min(1, v));
