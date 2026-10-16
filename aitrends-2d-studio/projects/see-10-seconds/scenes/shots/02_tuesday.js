// shots/02_tuesday.js — Tuesday: the first blink, two worlds, the phone that falls ten seconds late.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, wordTime, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { kitchen, kTable, phoneFlat } from '../sets/kitchen.js';
import { YOU } from '../cast.js';
import { BLUE, ghost, doubleWorld, hud, heroFace, eyeGlow, chip, bigNum, glitchBands, blueEdge } from '../lib.js';

const rimK = (M) => ({ color: M.rim, dir: [-0.9, -0.4] });           // window light from the left
const SX = () => E.W / 2 - 250;                                        // hero's chair
const TX = () => E.W / 2 + 40;                                         // table centre
const sitP = { ...POSES.sit, eF: [22, -112], hF: [44, -124], eB: [16, -114], hB: [40, -126] };          // forearms on the table
const eatP = { ...POSES.sit, eF: [26, -118], hF: [22, -166], eB: [16, -114], hB: [40, -126] };
const mugP = { ...POSES.sit, eB: [24, -122], hB: [20, -168], eF: [10, -112], hF: [-2, -96] };          // far hand: mug at the mouth; near hand low

// one helper for the seated hero at the table
function seated(g, M, t, o = {}) {
  const { s = 1.25, pose = sitP, expr = 'neutral', look = [0.4, 0.2], phone = true, phoneX = null } = o, GY = E.H * 0.8;
  FX.chair(g, SX() - 10 * s, GY, s, shade(M.dark, -0.2));
  drawFigure(g, { x: SX(), y: GY, s, facing: 1, outfit: YOU, pose: breathe(pose, t, 0.7, 1), expr, look, rim: rimK(M), blink: (t % 3.6) > 3.5, prop: o.prop });
  const ty = kTable(g, TX(), GY, { h: 108 * s, w: 520 * s / 1.25 });
  circle(g, TX() + 40, ty - 4, 0, '#000');
  rr(g, TX() + 10 * s, ty - 34 * s, 90 * s, 34 * s, 14 * s); g.fillStyle = '#e8e2d8'; g.fill(); g.fillStyle = '#c9a26a'; g.fillRect(TX() + 16 * s, ty - 34 * s, 78 * s, 6 * s);   // cereal bowl
  if (phone) phoneFlat(g, phoneX ?? TX() - 110, ty, s * 0.9);
  return { ty, GY };
}

// s012 — "It starts on a Tuesday."  morning kitchen, cereal, the calendar says TUE
registerShot('s012', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0 + 0.06 * ease.inOut(k), x: -40 + 30 * k, y: -20 };
  const { M } = kitchen(g, t, cam);
  layer(g, cam, 1, (g) => seated(g, M, t, { pose: posesAt(t % 1.6, [[0, sitP], [0.5, eatP], [1.1, sitP]], 0.3), look: [0.6, 0.3] }));
  const tt = (wordTime('Tuesday', 22) ?? 23.16) - info.shot.start;
  layer(g, cam, 0.6, (g) => { const a = ease.out(prog(t, tt - 0.1, tt + 0.3)); if (a > 0) { ring(g, E.W / 2 - 95, E.H * 0.8 - 555, 120 * (0.8 + 0.2 * a), 6, alpha(S().ui.gold, a)); chip(g, 'TUESDAY', E.W / 2 - 95, E.H * 0.8 - 720, { size: 30, k: a, color: S().ui.gold }); } });
  FX.dust(g, t, { count: 40, color: '#ffe7c7', a: 0.35, area: [0, 0, E.W * 0.6, E.H], speed: 6 });
} });

// s013 — "You blink,"  extreme close-up on the eyes, then a cyan flicker
registerShot('s013', { draw(g, t, info) {
  const M = mood('interiorWarm');
  blurLayer(g, 18, (g) => kitchen(g, t, { z: 1.8, x: -300, y: -200 })); veil(g, '#120a10', 0.4);
  const r = 760, cx = E.W / 2, cy = E.H * 0.5 + r * 0.16, fl = t > 0.42 ? 0.5 + 0.5 * Math.sin(t * 60) : 0;
  heroFace(g, cx, cy, r * (1 + 0.04 * t), { outfit: YOU, expr: 'neutral', blink: t > 0.18 && t < 0.36, rimColor: M.rim, rimSide: -1, eyeGlow: t > 0.42 ? 0.4 + 0.6 * fl : 0 });
  if (t > 0.42) glitchBands(g, t, 0.7);
} });

// the kitchen + seated hero as a reusable picture (used for the double exposure)
function kitchenScene(g, t, cam, future = false) {
  const { M } = kitchen(g, t, cam);
  layer(g, cam, 1, (g) => {
    if (!future) seated(g, M, t, { expr: 'confused', look: [Math.sin(t * 1.4) * 0.8, 0] });
    else { const GY = E.H * 0.8; FX.chair(g, SX() - 12, GY, 1.25, shade(M.dark, -0.2)); const ty = kTable(g, TX(), GY, { h: 135 }); phoneFlat(g, TX() - 330, GY - 6, 1.1, 0.1);
      drawFigure(g, { x: SX() - 120, y: GY, s: 1.25, facing: 1, outfit: YOU, pose: POSES.relaxed, expr: 'neutral', rim: rimK(M) }); void ty; }
  });
}
// s014 — "and for a moment there are two worlds on top of each other."
registerShot('s014', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.15 + 0.05 * ease.inOut(k), x: -60, y: 10 };
  kitchenScene(g, t, cam);
  const a = ease.inOut(prog(t, 0.1, 1.2)) * (0.75 + 0.25 * Math.sin(t * 3));
  doubleWorld(g, (x) => kitchenScene(x, t + 10, cam, true), { a: 0.75 * a, dx: 40 + 70 * ease.inOut(k), t });
  ghost(g, (x) => { drawFigure(x, { x: SX() - 120, y: E.H * 0.8, s: 1.25, facing: 1, outfit: YOU, pose: POSES.relaxed, expr: 'neutral' }); phoneFlat(x, TX() - 330, E.H * 0.8 - 6, 1.1, 0.1); }, { cam, t, a: 0.55 * a, dx: 40 + 70 * ease.inOut(k) });
  blueEdge(g, t, 0.6 * a);
  FX.dust(g, t, { count: 40, color: BLUE, a: 0.25, speed: 6 });
} });

// s015 — "The real one..."
registerShot('s015', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.08 + 0.03 * k, x: -20 - 30 * k, y: 0 };
  kitchenScene(g, t, cam);
  chip(g, 'REAL', 200, 200, { size: 32, k: prog(t, 0.05, 0.4), color: S().ui.gold, line: alpha(S().ui.gold, 0.6) });
  FX.dust(g, t, { count: 40, color: '#ffe7c7', a: 0.3, speed: 6 });
} });

// s016 — "and a faint blue copy, running ten seconds ahead."  split screen: the right half is the blue world
registerShot('s016', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.08 + 0.03 * k, x: -50 - 20 * k, y: 0 };
  kitchenScene(g, t, cam);
  const split = lerp(E.W + 20, E.W * 0.5, ease.inOut(prog(t, 0.1, 0.9)));
  g.save(); g.beginPath(); g.rect(split, 0, E.W, E.H); g.clip();
  g.fillStyle = '#03101c'; g.fillRect(0, 0, E.W, E.H);
  doubleWorld(g, (x) => kitchenScene(x, t + 10, cam, true), { a: 1, t });
  g.restore();
  seg(g, [[split, 0], [split, E.H]], 4, BLUE); glow(g, split, E.H / 2, 300, BLUE, 0.3);
  chip(g, 'REAL', 200, 200, { size: 32, color: S().ui.gold, line: alpha(S().ui.gold, 0.6) });
  chip(g, '+10 s', E.W - 220, 200, { size: 32, k: prog(t, 0.9, 1.3), color: BLUE, line: alpha(BLUE, 0.7) });
  hud(g, { k: prog(info.globalT, wordTime('blue', 30) ?? 30.5, (wordTime('blue', 30) ?? 30.5) + 0.4), label: 'BLUE WORLD', sub: '+10 s', y: E.H - 170 });
} });

// s017 — "In the blue world, your phone slides off the table."  the ghost phone slides and falls; his eyes follow it
registerShot('s017', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.55 + 0.05 * ease.inOut(k), x: -130, y: 120 };
  const { M } = kitchen(g, t, cam), GY = E.H * 0.8;
  const ts = (wordTime('slides', 34) ?? 35.25) - info.shot.start, p = prog(t, ts - 0.3, ts + 0.6), fall = prog(t, ts + 0.6, ts + 1.1);
  const tyRef = { v: 0 };
  layer(g, cam, 1, (g) => { const { ty } = seated(g, M, t, { look: [lerp(0.3, -0.2, p), lerp(0.4, 1, fall)], expr: 'thinking' }); tyRef.v = ty; });
  const px0 = TX() - 110, edge = TX() - 260;
  ghost(g, (x) => { const px = lerp(px0, edge - 10, ease.in(p)), py = tyRef.v + fall * fall * (GY - tyRef.v + 4), rot = -fall * 1.9; phoneFlat(x, px - fall * 40, py, 1.4, rot); }, { cam, t, a: 0.6 });
  hud(g, { k: prog(t, 0.1, 0.5), label: '+10 s' });
  FX.dust(g, t, { count: 30, color: '#ffe7c7', a: 0.3, speed: 6 });
} });

// table-edge insert used by s018, s020 and s021: table top on the right, the floor below on the left
function edgeInsert(g, t, o = {}) {
  const M = mood('interiorWarm'), z = o.z ?? 1;
  blurLayer(g, 16, (g) => kitchen(g, t, { z: 2.2, x: -360, y: 80 })); veil(g, '#120a10', 0.3);
  g.save(); g.translate(E.W / 2, E.H / 2); g.scale(z, z); g.translate(-E.W / 2, -E.H / 2);
  const ex = E.W * 0.36, ty = E.H * 0.52;
  g.fillStyle = linGrad(g, 0, E.H * 0.82, 0, E.H * 1.2, [shade(M.floor, -0.2), shade(M.floor, -0.55)]); g.fillRect(-200, E.H * 0.82, E.W + 400, E.H);
  rr(g, ex, ty, E.W, 60, 10); g.fillStyle = '#2a1c20'; g.fill(); g.fillStyle = '#5a4042'; g.fillRect(ex + 6, ty, E.W, 10);
  g.fillStyle = 'rgba(0,0,0,.3)'; g.fillRect(ex + 30, ty + 60, E.W, 40);
  g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = linGrad(g, 0, 0, E.W, 0, [alpha(M.key, 0.25), alpha(M.key, 0)]); g.fillRect(ex, ty, E.W, 10); g.restore();
  g.restore();
  return { ex, ty, z };
}
// s018 — "In the real world, it hasn't moved yet."  the real phone at the edge; its ghost already on the floor
registerShot('s018', { draw(g, t, info) {
  const k = t / info.dur, z = 1 + 0.05 * ease.inOut(k), { ex, ty } = edgeInsert(g, t, { z });
  const tr = (x, y) => [E.W / 2 + (x - E.W / 2) * z, E.H / 2 + (y - E.H / 2) * z];
  const [px, py] = tr(ex + 230, ty); phoneFlat(g, px, py, 3.6 * z);
  ghost(g, (x) => { const [gx, gy] = tr(ex - 260, E.H * 0.9); phoneFlat(x, gx, gy, 3.6 * z, -0.25); }, { t, a: 0.55 });
  chip(g, 'REAL', px, py - 120, { size: 28, k: prog(t, 0.6, 1.0), color: S().ui.gold });
  hud(g, { label: '+10 s' });
} });

// s019 — "You wait."  calm close-up, eyes on the phone
registerShot('s019', { draw(g, t, info) {
  const M = mood('interiorWarm'), k = t / info.dur;
  blurLayer(g, 16, (g) => kitchen(g, t, { z: 1.8, x: -340, y: -160 })); veil(g, '#120a10', 0.35);
  heroFace(g, E.W / 2 - 40, E.H * 0.58, 320 * (1 + 0.04 * k), { outfit: YOU, expr: 'neutral', face: { mouth: 'smallFlat' }, look: [-0.5, 0.6], rimColor: M.rim, rimSide: -1 });
  hud(g, { label: '+10 s' });
  FX.dust(g, t, { count: 24, color: '#ffe7c7', a: 0.3, speed: 6 });
} });

// s020 — "Seven. Eight. Nine."  the insert pushes in, the seconds pop
registerShot('s020', { draw(g, t, info) {
  const k = t / info.dur, z = 1.06 + 0.12 * ease.inOut(k), { ex, ty } = edgeInsert(g, t, { z }), gt = info.globalT;
  const tr = (x, y) => [E.W / 2 + (x - E.W / 2) * z, E.H / 2 + (y - E.H / 2) * z];
  const [px, py] = tr(ex + 230, ty); phoneFlat(g, px, py, 3.6 * z);
  ghost(g, (x) => { const [gx, gy] = tr(ex - 260, E.H * 0.9); phoneFlat(x, gx, gy, 3.6 * z, -0.25); }, { t, a: 0.45, flicker: 0.3 });
  for (const [w, n, after] of [['Seven', 7, 40], ['Eight', 8, 41], ['Nine', 9, 42]]) { const ts = wordTime(w, after) ?? 0; bigNum(g, String(n), E.W * 0.72, E.H * 0.34, gt - ts, { hold: 0.6, size: 230 }); }
  hud(g, { label: '+10 s' });
} });

// s021 — "It slides."  the real phone slides off the edge, exactly like its ghost
registerShot('s021', { draw(g, t, info) {
  const z = 1.18, { ex, ty } = edgeInsert(g, t, { z }), [sx, sy] = [0, 0];
  const tr = (x, y) => [E.W / 2 + (x - E.W / 2) * z, E.H / 2 + (y - E.H / 2) * z];
  const p = ease.in(prog(t, 0.05, 0.5)), fall = prog(t, 0.5, 0.95);
  for (let i = 3; i >= 0; i--) {                                              // a little motion smear
    const tt = Math.max(0, t - i * 0.03), pp = ease.in(prog(tt, 0.05, 0.5)), ff = prog(tt, 0.5, 0.95);
    const [px, py] = tr(lerp(ex + 230, ex - 30, pp) - ff * 120, ty + ff * ff * (E.H * 0.9 - ty)); g.save(); g.globalAlpha = i ? 0.18 : 1; phoneFlat(g, px, py, 3.6 * z, -ff * 1.7); g.restore();
  }
  ghost(g, (x) => { const [gx, gy] = tr(ex - 260, E.H * 0.9); phoneFlat(x, gx, gy, 3.6 * z, -0.25); }, { t, a: 0.4 * (1 - fall) });
  void p; void sx; void sy;
} });

// s022 — "You catch it without looking."  eyes closed, sipping, the near hand drops and catches it
registerShot('s022', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.5 + 0.04 * ease.inOut(k), x: -170, y: 110 };
  const { M } = kitchen(g, t, cam), GY = E.H * 0.8, tc = (wordTime('catch', 44) ?? 44.64) - info.shot.start;
  const catchP = { ...mugP, eF: [26, -96], hF: [40, -82] };
  layer(g, cam, 1, (g) => {
    const { ty } = seated(g, M, t, { pose: posesAt(t, [[0, mugP], [tc - 0.15, catchP]], 0.15), expr: 'smirk', look: [0.3, -0.6], phone: false, prop: { type: 'cup', hand: 'B' } });
    const fall = clamp(prog(t, 0, tc) * 1.0), hx = SX() + 40 * 1.25, hy = GY - 82 * 1.25;
    if (t < tc) phoneFlat(g, lerp(TX() - 270, hx + 10, fall), lerp(ty, hy - 10, fall * fall), 1.15, -fall * 1.4);
    else { g.save(); g.translate(hx + 6, hy - 14); g.rotate(-1.2); rr(g, -12, -40, 24, 60, 5); g.fillStyle = '#0c0b10'; g.fill(); g.fillStyle = '#9fd8ff'; g.fillRect(-8, -34, 16, 46); g.restore(); }
  });
  layer(g, cam, 1, (g) => { if (t > tc) { const a = 1 - prog(t, tc, tc + 0.6); FX.rings(g, SX() + 50, GY - 110, t - tc, { count: 2, r0: 20, r1: 90, color: S().ui.gold, a: 0.6 * a }); } });
  FX.dust(g, t, { count: 30, color: '#ffe7c7', a: 0.3, speed: 6 });
} });
