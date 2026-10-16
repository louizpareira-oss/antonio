// shots/07_restaurant.js — seeing isn't stopping: the waiter, the glasses, the freeze, every accident becomes a question.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, wordTime, rng, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { restaurant, rTable, glassShape } from '../sets/restaurant.js';
import { street, CURB } from '../sets/street.js';
import { YOU, MIA, WAITER, KID } from '../cast.js';
import { BLUE, ghost, hud, heroFace, chip, checkMark, crossMark, glitchBands } from '../lib.js';

const rimR = (M) => ({ color: M.rim, dir: [0, -1] });
const sitT = { ...POSES.sit, eF: [22, -112], hF: [46, -126], eB: [16, -114], hB: [40, -128] };
// waiter walking with a tray of glasses held high (x,y ground; phase walk; trip 0..1 = falling)
function waiter(g, x, y, s, phase, trip = 0, o = {}) {
  const w = walkPose(phase), base = { ...w, eF: [22, -170], hF: [26, -208] };
  const pose = trip > 0 ? posesAt(trip, [[0, base], [0.3, POSES.fall]], 0.3) : base;
  drawFigure(g, { x, y, s, facing: 1, outfit: WAITER, pose, rot: trip * 0.9, expr: trip > 0 ? 'shocked' : 'neutral', rim: o.rim ?? false, shadow: o.shadow });
  if (trip < 0.25 && !o.noTray) { const hx = x + 26 * s, hy = y - 214 * s; rr(g, hx - 70 * s, hy - 6 * s, 140 * s, 10 * s, 5 * s); g.fillStyle = o.trayColor || '#c9c2b8'; g.fill(); for (const dx of [-40, 0, 40]) glassShape(g, hx + dx * s, hy - 6 * s, s * 0.9); }
}
// flying / shattered glass: k 0 = on the tray, 1 = shards on the floor
function shatter(g, x0, y0, floorY, k, s = 1, seed = 3, col = '#e8f4ff') {
  const r = rng(seed);
  for (let i = 0; i < 3; i++) { const dx = (i - 1) * 40 * s, fx = x0 + dx + 60 * s + r() * 60 * s, kk = clamp(k * 1.6); if (kk < 1) { const x = lerp(x0 + dx, fx, kk), y = lerp(y0, floorY, kk * kk) - Math.sin(kk * Math.PI) * 80 * s; glassShape(g, x, y, s * 0.9, kk * 4 + i, col); } }
  if (k > 0.6) { const a = prog(k, 0.6, 0.75); for (let i = 0; i < 26; i++) { const ang = r() * Math.PI, d = (30 + r() * 170) * s * ease.out(prog(k, 0.6, 1)); const x = x0 + 80 * s + Math.cos(ang) * d * (r() < 0.5 ? -1 : 1), y = floorY - Math.sin(ang) * d * 0.25 * (1 - prog(k, 0.75, 1)); g.save(); g.globalAlpha *= a; poly(g, [[x, y], [x + (6 + r() * 10) * s, y - 4 * s], [x + 3 * s, y + 5 * s]], alpha(col, 0.8)); g.restore(); } }
}

// s058 — "Then comes the part nobody warns you about."  the restaurant, you and Mia at a table
registerShot('s058', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0 + 0.08 * ease.inOut(k), x: -60, y: 0 };
  const { M, GY } = restaurant(g, t, cam);
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: E.W / 2 - 620, y: GY, s: 1.15, facing: 1, outfit: YOU, pose: breathe(sitT, t, 0.6), expr: 'neutral', look: [0.6, 0], rim: rimR(M) });
    drawFigure(g, { x: E.W / 2 - 220, y: GY, s: 1.15, facing: -1, outfit: MIA, pose: breathe(sitT, t, 0.6, 2), expr: 'smile', rim: rimR(M) });
    rTable(g, E.W / 2 - 420, GY, 0.85, { w: 520 });
    rTable(g, E.W / 2 + 320, GY, 0.85, { w: 400 });
    waiter(g, E.W / 2 + 200 + t * 120, GY - 20, 0.95, t * Math.PI * 2 * 0.9, 0, { rim: rimR(M) });
  });
  FX.dust(g, t, { count: 40, color: '#ffe0b0', a: 0.3, speed: 6 });
} });

// s059 — "At a restaurant, you see a waiter across the room trip,"  his cyan ghost trips; the real one walks on
registerShot('s059', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.25 + 0.05 * k, x: 40, y: 40 };
  const { M, GY } = restaurant(g, t, cam), tt = (wordTime('trip', 132) ?? 133.23) - info.shot.start;
  layer(g, cam, 1, (g) => { waiter(g, E.W / 2 + t * 110, GY - 30, 1.0, t * Math.PI * 2 * 0.9, 0, { rim: rimR(M) }); });
  ghost(g, (x) => { const tr = prog(t, tt - 0.6, tt + 0.2); waiter(x, E.W / 2 + 380 + t * 110 * (1 - tr), GY - 30, 1.0, t * Math.PI * 2 * 0.9, tr); if (tr > 0.2) shatter(x, E.W / 2 + 420 + 26, GY - 250, GY - 20, prog(t, tt - 0.3, tt + 0.6), 1.0, 5, '#fff'); }, { cam, t, a: 0.55 });
  blurLayer(g, 8, (g) => { drawFigure(g, { x: 280, y: E.H * 0.8 + 360, s: 3.2, facing: 1, outfit: YOU, pose: sitT, expr: t > tt - 0.3 ? 'shocked' : 'neutral', look: [0.8, -0.2], rim: rimR(M), shadow: false }); }, cam, 1.5);
  hud(g, { label: '+10 s' });
} });

// s060 — "and a tray of glasses shatter."  floor level: the ghost glasses shatter; the real tray is still fine
registerShot('s060', { draw(g, t, info) {
  const M = mood('interiorWarm'), k = t / info.dur, cam = { z: 1.9, x: 120, y: 330 };
  const { GY } = restaurant(g, t, cam);
  layer(g, cam, 1, (g) => waiter(g, E.W / 2 - 200 + t * 90, GY, 1.0, t * Math.PI * 2 * 0.9, 0, { rim: rimR(M) }));
  ghost(g, (x) => shatter(x, E.W / 2 + 40, GY - 240, GY + 6, ease.in(prog(t, 0.1, 1.3)), 1.1, 7, '#fff'), { cam, t, a: 0.65 });
  FX.dust(g, t, { count: 30, color: '#ffe0b0', a: 0.3, speed: 6 });
  void k;
} });

// s061 — "You stand up."  fast, the chair skids back
registerShot('s061', { draw(g, t, info) {
  const cam = { z: 1.55, x: -320, y: 110 };
  const { M, GY } = restaurant(g, t, cam), up = ease.out(prog(t, 0.05, 0.4));
  layer(g, cam, 1, (g) => {
    FX.chair(g, E.W / 2 - 640 - 120 * up, GY, 1.3, shade(M.dark, -0.2));
    drawFigure(g, { x: E.W / 2 - 600, y: GY, s: 1.4, facing: 1, outfit: YOU, pose: posesAt(t, [[0, sitT], [0.05, POSES.ready], [0.45, POSES.stand]], 0.3), expr: 'determined', look: [1, 0], rim: rimR(M) });
    drawFigure(g, { x: E.W / 2 - 160, y: GY, s: 1.4, facing: -1, outfit: MIA, pose: breathe(sitT, t), expr: 'surprised', look: [0.4, -0.6], rim: rimR(M) });
    rTable(g, E.W / 2 - 380, GY, 0.95, { w: 480 });
  });
} });

// s062 — "You start to move."  running between the tables
registerShot('s062', { draw(g, t, info) {
  const x = E.W / 2 - 500 + t * 420, cam = { z: 1.35, x: -200 + t * 380, y: 60 };
  const { M, GY } = restaurant(g, t, cam);
  layer(g, cam, 1, (g) => {
    rTable(g, E.W / 2 - 100, GY + 40, 0.9, { w: 360 });
    drawFigure(g, { x, y: GY, s: 1.35, facing: 1, outfit: YOU, pose: walkPose(t * Math.PI * 2 * 1.6, { run: true }), expr: 'determined', rim: rimR(M) });
    rTable(g, E.W / 2 + 500, GY + 60, 0.9, { w: 360 });
    waiter(g, E.W / 2 + 1150 + t * 100, GY - 30, 1.0, t * Math.PI * 2 * 0.9, 0, { rim: rimR(M) });
  });
  hud(g, { label: '+10 s', count: 4 });
} });

// freeze frame shared by s063 / s064: you mid-stride, the waiter starting to trip, far away
function freezeRest(g, t, info) {
  const k = t / info.dur, cam = { z: 1.05 + 0.03 * k, x: 60, y: 30 };
  const { M, GY } = restaurant(g, 0.5, cam);
  layer(g, cam, 1, (g) => {
    rTable(g, E.W / 2 - 360, GY + 40, 0.85, { w: 360 }); rTable(g, E.W / 2 + 260, GY + 40, 0.85, { w: 360 });
    drawFigure(g, { x: E.W / 2 - 560, y: GY, s: 1.2, facing: 1, outfit: YOU, pose: walkPose(1.1, { run: true }), expr: 'determined', rim: rimR(M) });
    waiter(g, E.W / 2 + 640, GY - 20, 1.0, 1.0, 0.12, { rim: rimR(M) });
  });
  veil(g, '#9fc8ff', 0.15, 'soft-light'); veil(g, '#060a16', 0.15);
  UI.dimension(g, t, { x1: E.W / 2 - 520, y1: E.H * 0.86, x2: E.W / 2 + 700, y2: E.H * 0.86, str: '8 m', start: 0.2 });
  UI.badge(g, { str: 'FROZEN', x: E.W - 90, y: 200, color: '#bfe6ff', size: 30 });
  return { M, GY };
}
function rule(g, y, label, k, ok) {
  if (k <= 0) return; g.save(); g.globalAlpha *= clamp(k * 2);
  rr(g, E.W / 2 - 330, y - 52, 660, 104, 52); g.fillStyle = 'rgba(6,12,24,.86)'; g.fill(); g.strokeStyle = alpha(ok ? S().ui.good : S().ui.accent, 0.7); g.lineWidth = 3; g.stroke();
  text(g, '10 s', E.W / 2 - 250, y + 2, { size: 40, color: BLUE, font: FONTS.ui, weight: 900 });
  text(g, label, E.W / 2 - 150, y + 2, { size: 44, color: S().ui.cream, font: FONTS.ui, weight: 900, align: 'left', spacing: 2 });
  (ok ? checkMark : crossMark)(g, E.W / 2 + 250, y, 1.1, ok ? S().ui.good : S().ui.accent, prog(k, 0.3, 1));
  g.restore();
}
// s063 — "Ten seconds is long enough to see it."
registerShot('s063', { draw(g, t, info) { freezeRest(g, t, info); rule(g, E.H * 0.3, 'SEE IT', prog(t, 0.6, 1.4), true); } });
// s064 — "It isn't always long enough to stop it."
registerShot('s064', { draw(g, t, info) { freezeRest(g, t + 2.4, info); rule(g, E.H * 0.3, 'SEE IT', 1, true); rule(g, E.H * 0.3 + 130, 'STOP IT', prog(t, 1.0, 1.8), false); } });

// s065 — "The glasses break."  real: he trips, the tray flips, glass everywhere; you reach too late
registerShot('s065', { draw(g, t, info) {
  const [sx, sy] = shake(t, t > 0.2 && t < 0.7 ? 9 : 1, 11), cam = { z: 1.5, x: 300 + sx, y: 80 + sy };
  const { M, GY } = restaurant(g, t, cam), tr = prog(t, 0.0, 0.5);
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: E.W / 2 - 60, y: GY, s: 1.35, facing: 1, outfit: YOU, pose: POSES.reach, expr: 'shocked', rim: rimR(M) });
    waiter(g, E.W / 2 + 520, GY - 10, 1.2, 1.0, tr, { rim: rimR(M) });
    shatter(g, E.W / 2 + 560, GY - 260, GY + 4, ease.in(prog(t, 0.05, 0.9)), 1.2, 5);
  });
  FX.dust(g, t, { count: 30, color: '#ffe0b0', a: 0.35, speed: 10 });
} });

// s066 — "Exactly the way you saw them break."  top-down on the floor: the real shards land exactly on the ghost shards
function shardsTop(g, cx, cy, s, seed, col) {
  const r = rng(seed);
  for (let i = 0; i < 34; i++) { const a = r() * Math.PI * 2, d = Math.pow(r(), 0.7) * 330 * s, x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d * 0.8, sz = (14 + r() * 34) * s, rot = r() * 6.28;
    g.save(); g.translate(x, y); g.rotate(rot); poly(g, [[-sz * 0.6, -sz * 0.2], [sz * 0.7, -sz * 0.4], [sz * 0.1, sz * 0.5]], alpha(col, 0.75)); seg(g, [[-sz * 0.4, -sz * 0.18], [sz * 0.5, -sz * 0.34]], 2, alpha('#ffffff', 0.7)); g.restore(); }
  circle(g, cx + 40 * s, cy - 10 * s, 26 * s, alpha(col, 0.5));
}
registerShot('s066', { draw(g, t, info) {
  const M = mood('interiorWarm'), k = t / info.dur, z = 1 + 0.08 * ease.inOut(k);
  g.save(); g.translate(E.W / 2, E.H / 2); g.scale(z, z); g.rotate(0.03 * k); g.translate(-E.W / 2, -E.H / 2);
  g.fillStyle = shade(M.floor, -0.15); g.fillRect(-200, -200, E.W + 400, E.H + 400);
  for (let x = -200; x < E.W + 200; x += 150) { g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(x, -200, 4, E.H + 400); for (let y = ((x * 7) % 400) - 400; y < E.H + 200; y += 520) g.fillRect(x, y, 150, 3); }
  FX.pool(g, E.W / 2, E.H / 2, 700, 420, M.practical, 0.2);
  shardsTop(g, E.W / 2, E.H / 2, 1, 7, '#f2f6ff');
  g.restore();
  const m = ease.inOut(prog(t, 0.2, 1.4));
  ghost(g, (x) => { x.save(); x.translate(E.W / 2, E.H / 2); x.scale(z, z); x.rotate(0.03 * k); x.translate(-E.W / 2, -E.H / 2); shardsTop(x, E.W / 2 + 60 * (1 - m), E.H / 2 - 30 * (1 - m), 1, 7, '#ffffff'); x.restore(); }, { t, a: 0.6 });
  chip(g, '100% MATCH', E.W / 2, 220, { size: 32, color: BLUE, k: prog(t, 1.3, 1.7), line: alpha(BLUE, 0.6) });
} });

// a parked / moving car, side view (x,y = ground under the middle)
function car(g, x, y, s = 1, col = '#2a2c3a', dir = 1) {
  g.save(); g.translate(x, y); g.scale(dir * s, s);
  rr(g, -180, -90, 360, 64, 22); g.fillStyle = col; g.fill(); poly(g, [[-110, -90], [-60, -150], [70, -150], [120, -90]], col);
  poly(g, [[-92, -92], [-54, -138], [0, -138], [0, -92]], alpha('#9fb6d8', 0.5)); poly(g, [[10, -92], [10, -138], [64, -138], [100, -92]], alpha('#9fb6d8', 0.5));
  for (const wx of [-110, 110]) { circle(g, wx, -26, 30, '#0c0b10'); circle(g, wx, -26, 12, '#5a5c68'); }
  rr(g, 166, -78, 16, 14, 4); g.fillStyle = '#fff6d8'; g.fill(); g.restore();
}
// s067 — "And from that day on,"  night street, you walk home with your head down
registerShot('s067', { draw(g, t, info) {
  const x = E.W / 2 - 200 + t * 120, cam = { z: 1.5, x: -60 + t * 110, y: 80 };
  const { M, GY } = street(g, t, cam, { mood: 'night', seed: 61 });
  layer(g, cam, 1, (g) => drawFigure(g, { x, y: GY, s: 1.45, facing: 1, outfit: YOU, pose: { ...walkPose(t * Math.PI * 2 * 0.8), head: [10, -196] }, expr: 'sad', look: [0.4, 0.6], rim: { color: M.rim, dir: [0.6, -0.8] } }));
  FX.dust(g, t, { count: 30, color: '#c9d4ff', a: 0.25, speed: 6 });
} });

// s068 — "every accident you see in the blue world feels like a question."  ghost accidents all around you
registerShot('s068', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0 + 0.05 * k, x: 0, y: 20 };
  const { M, GY } = street(g, t, cam, { mood: 'night', seed: 61 }), C = CURB();
  layer(g, cam, 1, (g) => drawFigure(g, { x: E.W / 2, y: GY, s: 1.15, facing: Math.sin(t * 1.6) > 0 ? 1 : -1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'worried', look: [0.6, -0.2], rim: { color: M.rim, dir: [0.6, -0.8] } }));
  ghost(g, (x) => {
    const a1 = prog(t, 0.2, 1.4); if (a1 > 0 && a1 < 1) car(x, lerp(-300, E.W * 0.45, ease.out(a1)), C + 190 - Math.sin(a1 * 3) * 40, 1.3, '#fff', 1);
    const a2 = prog(t, 1.2, 2.2); if (a2 > 0) { const py = lerp(GY - 700, GY - 10, ease.in(Math.min(1, a2))); rr(x, E.W * 0.72 - 30, py - 60, 60, 60, 8); x.fillStyle = '#fff'; x.fill(); circle(x, E.W * 0.72, py - 80, 40, '#fff'); }
    const a3 = prog(t, 2.3, 3.6); if (a3 > 0) drawFigure(x, { x: lerp(E.W * 0.12, E.W * 0.32, a3), y: GY, s: 0.9, facing: 1, outfit: KID, pose: a3 > 0.5 ? POSES.fall : POSES.ready, rot: a3 > 0.5 ? (a3 - 0.5) * 1.8 : 0 });
  }, { cam, t, a: 0.5 });
  for (const [ts, x, y] of [[0.5, E.W * 0.4, E.H * 0.62], [1.6, E.W * 0.72, E.H * 0.25], [2.8, E.W * 0.22, E.H * 0.42]]) {
    const a = ease.outBack(prog(t, ts, ts + 0.3)); if (a <= 0) continue; g.save(); g.translate(x, y); g.scale(a, a); text(g, '?', 0, 0, { size: 110, color: S().ui.gold, font: FONTS.ui, weight: 900, glow: 20, glowColor: alpha(S().ui.gold, 0.6) }); g.restore();
  }
} });

// s069 — "Are you fast enough?"  close-up, cyan flickers in the eyes, heartbeat
registerShot('s069', { draw(g, t, info) {
  const M = mood('night'), k = t / info.dur, beat = Math.max(0, Math.sin(t * 7.5)) ** 8;
  blurLayer(g, 16, (g) => street(g, t, { z: 1.7, x: -200, y: -150 }, { mood: 'night', seed: 61 })); veil(g, '#04060e', 0.45);
  heroFace(g, E.W / 2 + 20, E.H * 0.58, 330 * (1 + 0.06 * ease.inOut(k) + 0.012 * beat), { outfit: YOU, expr: 'worried', look: [0, 0], rimColor: M.rim, rimSide: 1, eyeGlow: 0.25 + 0.35 * (Math.sin(t * 9) > 0.7 ? 1 : 0) });
  hud(g, { label: '+10 s', pulse: beat });
} });
