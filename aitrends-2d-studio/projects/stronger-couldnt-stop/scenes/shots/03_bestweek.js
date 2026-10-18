// shots/03_bestweek.js — "the best week of your life": groceries, pickle jar, the couch, the remote, the push-up.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake, rng } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { street } from '/projects/see-10-seconds/scenes/sets/street.js';
import { kitchen, living, couch } from '../sets/home.js';
import { YOU, MOM, DAD } from '../cast.js';
import { heroFace, hand, dayBadge, plusMinus, impact, debris, wt, GOLD, chip, car, cracks } from '../lib.js';

const rimR = (M) => ({ color: M.rim, dir: [0.8, -0.4] });
// push-up pose (use with rot ≈ -1.32 and facing -1: body along the floor, arms straight down)
const PUSH = (down) => ({ head: [3, -208], sh: [0, -174], hip: [0, -100], kF: [3, -50], fF: [2, 0], kB: [-3, -50], fB: [-4, 0], eF: [lerp(21, 12, down), -169], hF: [lerp(42, 30, down), -163], eB: [lerp(19, 10, down), -170], hB: [lerp(40, 28, down), -165] });

// push-up plank drawn directly: feet at (x, y) on the floor, head to the LEFT, face down; down = 0..1 lowers the chest
function plank(g, x, y, s, down, rim) {
  const ink = S().ink, sh = [x - 300 * s, y - lerp(150, 70, down) * s], hip = [x - 140 * s, y - lerp(80, 40, down) * s], head = [sh[0] - 50 * s, sh[1] - 24 * s];
  const draw = (dx, dy, c) => { seg(g, [[x + dx, y + dy], [hip[0] + dx, hip[1] + dy], [sh[0] + dx, sh[1] + dy]], 16 * s, c);
    seg(g, [[sh[0] + dx, sh[1] + dy], [sh[0] - 6 * s + dx, lerp(sh[1], y, 0.5) + dy - 10 * s * down], [sh[0] + dx, y + dy]], 12 * s, c); circle(g, head[0] + dx, head[1] + dy, 27 * s, c); };
  draw(4, -4, rim); draw(0, 0, ink); seg(g, [[hip[0] + 10 * s, hip[1] - 2 * s], [sh[0] + 6 * s, sh[1]]], 34 * s, YOU.color); seg(g, [[sh[0], sh[1]], [sh[0] - 4 * s, lerp(sh[1], y, 0.35)]], 18 * s, YOU.color);
  g.fillStyle = 'rgba(0,0,0,.25)'; g.beginPath(); g.ellipse(x - 150 * s, y + 4, 190 * s, 12 * s, 0, 0, Math.PI * 2); g.fill();
  g.fillStyle = S().feature; circle(g, head[0] - 10 * s, head[1] + 6 * s, 4 * s, S().feature);
}

// s029 — "At first, it's the best week of your life."  sunny street, you stroll with a huge grin; gold +
registerShot('s029', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.12, x: lerp(-60, 120, k), y: 30 };
  const { GY, CX, M } = street(g, t, cam, { mood: 'golden', seed: 61 });
  layer(g, cam, 1, (g) => { const x = CX - 300 + t * 150; drawFigure(g, { x, y: GY, s: 1.35, facing: 1, outfit: YOU, pose: { ...walkPose(t * Math.PI * 2 * 0.9), hB: [-30, -250], eB: [-24, -200] }, expr: 'joy', rim: rimR(M) });
    for (let i = 0; i < 6; i++) FX.sparkle(g, x + Math.cos(t * 2 + i) * 160, GY - 300 + Math.sin(t * 3 + i * 2) * 120, 14, GOLD(), 0.7); });
  plusMinus(g, '+', { k: prog(t, 0.2, 0.6), y: V(120, 200) });
  FX.dust(g, t, { count: 30, color: '#ffe7c7', a: 0.35, speed: 8 });
} });

// s030 — "Day one, you carry every grocery bag in one trip."  a mountain of bags on your arms, mom amazed
registerShot('s030', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.2 + 0.03 * k, x: 80, y: 60 };
  const { GY, CX, M } = street(g, t, cam, { mood: 'day', seed: 31 });
  layer(g, cam, 1, (g) => {
    car(g, CX - 700, GY + 120, 1.0, { color: '#2E72D2' });
    drawFigure(g, { x: CX + 520, y: GY, s: 1.3, facing: -1, outfit: MOM, pose: posesAt(t, [[0, POSES.relaxed], [1.2, POSES.handsOnHead]]), expr: t > 1.2 ? 'awe' : 'surprised', rim: rimR(M) });
    const x = CX - 150 + t * 70, ph = t * Math.PI * 2 * 0.8;
    drawFigure(g, { x, y: GY, s: 1.3, facing: 1, outfit: YOU, pose: { ...walkPose(ph), eF: [40, -150], hF: [70, -150], eB: [36, -150], hB: [64, -150] }, expr: 'happy', rim: rimR(M) });
    const r = rng(4), cols = ['#d9b07a', '#e8c890', '#f2f2f2', '#c84a3a', '#3fb950'];
    for (let i = 0; i < 16; i++) { const side = i % 2 ? 1 : -1, col = (i >> 1) % 2, row = i >> 2, bx = x + side * (46 + col * 50), by = GY - 1.3 * 128 + row * 52 + Math.sin(ph + i) * 3;
      rr(g, bx - 24, by, 48, 60, 6); g.fillStyle = cols[Math.floor(r() * cols.length)]; g.fill(); g.strokeStyle = 'rgba(0,0,0,.3)'; g.lineWidth = 3; g.beginPath(); g.arc(bx, by, 13, Math.PI, 0); g.stroke(); circle(g, bx + 8, by - 8, 9, ['#3fb950', '#f2c21a', '#d64a33'][i % 3]); }
  });
  dayBadge(g, { day: 1, k: prog(t, 0, 0.35) });
  chip(g, '16 BAGS · 1 TRIP', E.W * 0.5, E.H * 0.16, { k: prog(t, 1.4, 1.8), size: 34 });
} });

// s031 — "Day two, you open the pickle jar"  INSERT: one finger flick pops the lid off
registerShot('s031', { draw(g, t, info) {
  const k = t / info.dur, pop = wt('open', info, t, 1.0) + 0.1;
  blurLayer(g, 14, (g) => kitchen(g, t, { z: 1.3, x: 200, y: -60 }));
  const jx = E.W * 0.5, jy = E.H * 0.6, lift = t > pop ? (t - pop) : 0;
  hand(g, jx + 40, jy + 140, 1.0, { from: [jx + 600, E.H + 300], sleeve: YOU.color, fist: true });
  rr(g, jx - 150, jy - 200, 300, 380, 50); g.fillStyle = alpha('#cfe8d0', 0.55); g.fill(); g.strokeStyle = alpha('#ffffff', 0.6); g.lineWidth = 6; g.stroke();
  for (let i = 0; i < 6; i++) { g.save(); g.translate(jx - 80 + (i % 3) * 80, jy - 120 + Math.floor(i / 3) * 150); g.rotate(0.3 * (i % 2 ? 1 : -1)); g.fillStyle = '#6a8a2a'; g.beginPath(); g.ellipse(0, 0, 30, 70, 0, 0, Math.PI * 2); g.fill(); g.restore(); }
  g.fillStyle = alpha('#ffffff', 0.35); g.fillRect(jx - 120, jy - 180, 26, 300);
  const lx = jx + lift * 300, ly = jy - 230 - lift * 900 + lift * lift * 1400; g.save(); g.translate(lx, ly); g.rotate(lift * 12); rr(g, -160, -30, 320, 60, 16); g.fillStyle = '#d64a33'; g.fill(); g.fillStyle = '#f2ebe0'; g.fillRect(-120, -8, 240, 8); g.restore();
  hand(g, jx - 210, jy - 250 + (t > pop - 0.1 ? -30 : 0), 0.8, { from: [-200, jy - 500], sleeve: YOU.color, open: 0.4 });
  impact(g, jx, jy - 230, t - pop, { r: 200 });
  if (t > pop) text(g, 'POP!', jx + 280, jy - 380, { size: 90, color: '#ffffff', font: FONTS.title, stroke: 12, strokeColor: 'rgba(60,30,10,.8)', alpha: clamp(1.5 - (t - pop)) });
  dayBadge(g, { day: 2, k: prog(t, 0, 0.35) });
} });

// s032 — "your dad gave up on."  BIG FACE: dad (yellow cap), red-faced, jaw dropped
registerShot('s032', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => kitchen(g, t, { z: 1.3, x: -260, y: -60 })); veil(g, 'rgba(60,20,10,.12)');
  const cx = E.W * 0.5, cy = E.H * 0.62, r = 320 * (1 + 0.04 * k);
  glow(g, cx - r * 0.45, cy + r * 0.15, r * 0.45, '#ff5a3a', 0.35); glow(g, cx + r * 0.45, cy + r * 0.15, r * 0.45, '#ff5a3a', 0.35);
  bigFace(g, cx, cy, r, { outfit: DAD, expr: 'shocked', rimColor: '#ffc68a', rimSide: -1, face: { brows: 'raised' } });
  FX.dust(g, t, { count: 20, color: '#ffd59a', a: 0.4, speed: 8 });
} });

// s033 — "Day three, you move the couch with one hand,"  WIDE living room: the couch over your head, one hand
registerShot('s033', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.05 + 0.04 * k, x: -60, y: 20 };
  const { GY, CX, M } = living(g, t, cam);
  const up = ease.outBack(prog(t, 0.3, 1.1));
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: CX - 200, y: GY, s: 1.25, facing: 1, outfit: YOU, pose: { ...POSES.pointUp, hF: [6, -268], eF: [10, -232] }, expr: 'smirk', rim: { color: M.rim, dir: [1, -0.3] } });
    couch(g, CX - 200, GY, 0.7, { lift: up * (1.25 * 268 + 10), rot: 0.04 * Math.sin(t * 2) });
    if (up < 0.2) couch(g, CX - 200, GY, 0.7);
  });
  dayBadge(g, { day: 3, k: prog(t, 0, 0.35) });
} });

// s034 — "and your mom finds the remote she lost two years ago."  mom pulls a dusty remote from the couch spot
registerShot('s034', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.35 + 0.04 * k, x: -120, y: 120 }, f = wt('remote', info, t, 1.0);
  const { GY, CX, M } = living(g, t, cam);
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: CX - 520, y: GY, s: 1.35, facing: 1, outfit: YOU, pose: { ...POSES.pointUp, hF: [6, -268] }, expr: 'smile', rim: { color: M.rim, dir: [1, -0.3] } });
    couch(g, CX - 520, GY, 0.7, { lift: 1.35 * 268 + 10 });
    const up = ease.out(prog(t, f, f + 0.6));
    drawFigure(g, { x: CX - 40, y: GY, s: 1.35, facing: -1, outfit: MOM, pose: up > 0.5 ? { ...POSES.cheer, hF: [20, -270] } : POSES.kneel, expr: up > 0.5 ? 'joy' : 'surprised', rim: { color: M.rim, dir: [1, -0.3] } });
    const rx = CX - 40 - 1.35 * (up > 0.5 ? 20 : 38), ry = GY - 1.35 * (up > 0.5 ? 270 : 76); rr(g, rx - 22, ry - 60, 44, 120, 12); g.fillStyle = '#2a2a30'; g.fill(); circle(g, rx, ry - 34, 8, '#d64a33');
    for (let i = 0; i < 6; i++) FX.sparkle(g, rx + Math.cos(i + t * 3) * 60, ry + Math.sin(i * 2 + t * 3) * 60, 12, GOLD(), 0.7 * up);
    g.fillStyle = alpha('#c8c0b0', 0.5 * (1 - up)); for (let i = 0; i < 12; i++) circle(g, CX - 160 + i * 30, GY + 20 + (i % 3) * 8, 10, alpha('#c8c0b0', 0.4));
  });
  chip(g, 'LOST: 2 YEARS', E.W * 0.68, E.H * 0.2, { k: prog(t, f + 0.3, f + 0.7), size: 36 });
} });

// s035 — "Day four, you do one push-up..."  SIDE: you on the rug, one slow push-up
registerShot('s035', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.5 + 0.04 * k, x: 0, y: 220 };
  const { GY, CX, M } = living(g, t, cam);
  const down = 0.5 - 0.5 * Math.cos(Math.min(1, t / 1.6) * Math.PI * 2);
  layer(g, cam, 1, (g) => plank(g, CX + 120, GY + 40, 1.3, down, M.rim));
  dayBadge(g, { day: 4, k: prog(t, 0, 0.35) });
} });

// s036 — "and you hit the ceiling."  you launch up and slam into the ceiling; plaster rains down
registerShot('s036', { draw(g, t, info) {
  const k = t / info.dur, hit = wt('ceiling', info, t, 0.9), cam = { z: 1.0, x: 0, y: -60 };
  const [sx, sy] = shake(t, t > hit && t < hit + 0.5 ? 14 : 0, 24); cam.x += sx; cam.y += sy;
  const { GY, CX, M, CEIL } = living(g, t, cam);
  const fly = ease.in(prog(t, 0, hit)), y = lerp(GY, CEIL + 1.2 * 230, fly), fall = t > hit ? ease.in(prog(t, hit + 0.25, hit + 0.9)) : 0;
  layer(g, cam, 0.65, (g) => { if (t > hit) { cracks(g, CX + 300, CEIL + 4, 260, prog(t, hit, hit + 0.3), { seed: 4, color: 'rgba(40,30,30,.8)', w: 5, arms: 10 }); impact(g, CX + 300, CEIL + 10, t - hit, { r: 260, color: '#fff3d6' }); } });
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: CX + 300, y: lerp(y, GY, fall), s: 1.2, facing: -1, rot: fall > 0 ? -Math.PI / 2 * fall : 0, outfit: YOU, pose: t > hit ? POSES.fall : { ...POSES.stand, hF: [6, -60], hB: [-6, -60] }, expr: t > hit ? 'shocked' : 'surprised', rim: { color: M.rim, dir: [0.6, -0.8] }, shadow: fall > 0.9 });
    if (t > hit) debris(g, CX + 300, CEIL + 30, t - hit, { color: '#efe6d6', n: 22, size: 26, speed: 300, grav: 1600 });
    if (t < hit) FX.speedLines(g, t, { cx: CX + 300, cy: y - 150, count: 20, a: 0.2, inner: 200 });
  });
} });
