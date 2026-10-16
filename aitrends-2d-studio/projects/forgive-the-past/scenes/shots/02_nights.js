// shots/02_nights.js — the 400 replays (bed, shower, bus, 3 AM), the imagined win, waking up, the grey replay of the doorway.
import { E, V, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, wordTime, rng, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { apartment, aptGround, aptChair } from '../sets/apartment.js';
import { bedroom, bedShape, nightstand } from '../sets/bedroom.js';
import { HERO, HIM } from '../cast.js';
import { heroFace, desaturate, replayGlitch, blindStripes } from '../lib.js';
import { doorway } from './01_replay.js';

const GOLD = () => '#ffd47e';
const popIn = (t, at, d = 0.35) => ease.outBack(prog(t, at, at + d));

// s04 — "I've had that conversation four hundred times since."  top-down: awake in bed, light sweeps, replay counter
registerShot('s04', { draw(g, t, info) {
  const M = mood('night'), k = ease.inOut(t / info.dur), T0 = info.globalT - t;
  const cam = { z: 1.2 + 0.12 * k, r: -0.06 + 0.07 * k, y: V(0, -60) };
  const bw = V(560, 600), bh = V(900, 1180), bx = E.W / 2 - bw / 2, by = E.H * V(0.08, 0.17), cx = E.W / 2, hy = by + V(150, 170), r = V(72, 84);
  layer(g, cam, 1, (g) => {
    g.fillStyle = shade(M.floor, -0.35); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
    for (let x = -E.W; x < E.W * 2; x += 96) seg(g, [[x, -E.H], [x, E.H * 2]], 3, 'rgba(0,0,0,.3)');
    rr(g, bx - 26, by - 40, bw + 52, bh + 66, 18); g.fillStyle = shade(M.wall, -0.6); g.fill();               // frame + headboard
    rr(g, bx, by, bw, bh, 22); g.fillStyle = shade('#c8cde0', -0.6); g.fill();                                 // sheet
    rr(g, cx - V(170, 180), by + 40, V(340, 360), V(150, 160), 50); g.fillStyle = shade('#e8e4f4', -0.45); g.fill(); // pillow
    heroFace(g, cx, hy, r, { outfit: HERO, expr: 'sad', look: [0, 0], rimColor: M.key, rimSide: -1, blink: (t % 3.6) > 3.5 });
    const blTop = hy + r * 1.7;                                                                                  // blanket
    rr(g, bx - 6, blTop, bw + 12, by + bh - blTop + 10, 26); g.fillStyle = linGrad(g, bx, 0, bx + bw, 0, ['#2e3866', '#3a4470', '#283058']); g.fill();
    seg(g, [[bx + 10, blTop + 30], [bx + bw - 10, blTop + 30]], 6, 'rgba(255,255,255,.08)');
    for (const sx of [-1, 1]) { seg(g, [[cx + sx * r * 0.95, hy + r * 1.3], [cx + sx * r * 1.3, blTop + 50], [cx + sx * r * 0.5, blTop + 95]], 30, HERO.color); circle(g, cx + sx * r * 0.5, blTop + 95, 21, S_ink()); }
    // passing headlights sweep across the bed through the blinds
    const sw = ((t * 0.42 + 0.15) % 1);
    blindStripes(g, lerp(-E.W * 0.9, E.W * 0.6, sw), by - 200, E.W * 0.7, bh + 400, { count: 9, slant: 0.35, color: M.key, a: 0.11 });
  });
  // rehearsal bubbles popping by the head
  const bub = [0.25, 0.95, 1.6, 2.2, 2.8, 3.3];
  bub.forEach((b, i) => { const a = clamp(Math.min(prog(t, b, b + 0.15), 1 - prog(t, b + 0.55, b + 0.85))); if (a <= 0) return;
    const s = popIn(t, b, 0.3), x = cx + (i % 2 ? 1 : -1) * V(220, 230), y = hy - V(10, 30) + (i % 3) * 40;
    g.save(); g.globalAlpha = a * 0.85; g.translate(x, y); g.scale(s, s); UI.bubble(g, 0, 0, { w: V(110, 130), h: V(62, 72), color: '#e6ebff' }); g.restore(); });
  // the counter: x1 ... x400 on "four hundred"
  const tf = wordTime('four', 12) ?? 13.55, n = Math.round(lerp(1, 400, ease.in(prog(info.globalT, tf - 0.1, tf + 0.75))));
  const ca = clamp(prog(t, 0.2, 0.5)) * (1 - prog(t, info.dur - 0.3, info.dur));
  UI.readout(g, { label: 'REPLAYS', value: `×${n}`, x: E.W / 2, y: E.H * V(0.86, 0.66), align: 'center', size: V(64, 92), a: ca, color: n >= 400 ? GOLD() : S_cream() });
  if (n >= 400) FX.rings(g, E.W / 2 + V(60, 70), E.H * V(0.86, 0.66), t, { count: 2, r0: 60, r1: 220, color: GOLD(), a: 0.4 * (1 - prog(info.globalT, tf + 0.75, tf + 1.6)) });
} });
const S_ink = () => '#0e0b12';
const S_cream = () => '#fff1dc';

// s05 — "In the shower."  water down cold tiles, his silhouette behind frosted glass
registerShot('s05', { draw(g, t, info) {
  const M = mood('night'), cam = { z: 1.04 + 0.06 * t / info.dur, x: -14 * t };
  layer(g, cam, 0.6, (g) => {
    g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#1c2a48', '#22355a', '#141e36']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
    for (let x = -E.W; x < E.W * 2; x += 120) seg(g, [[x, -E.H], [x, E.H * 2]], 4, 'rgba(0,0,0,.35)');
    for (let y = -E.H; y < E.H * 2; y += 120) seg(g, [[-E.W, y], [E.W * 2, y]], 4, 'rgba(0,0,0,.35)');
    glow(g, E.W * 0.55, E.H * 0.08, E.W * 0.7, M.key, 0.35);
  });
  blurLayer(g, 7, (g) => drawFigure(g, { x: E.W * 0.46, y: E.H * V(1.02, 0.98), s: V(2.8, 3.6), facing: 1, outfit: { ...HERO, head: 'none', top: 'none' }, pose: breathe(posesAt(t, [[0, 'talk'], [0.45, 'explain']], 0.25), t), expr: 'determined', rim: { color: M.key, dir: [0, -1] }, shadow: false }), cam, 1);
  g.fillStyle = 'rgba(210,225,255,.08)'; g.fillRect(0, 0, E.W, E.H);                                       // frosted glass
  FX.rain(g, t, { count: 220, angle: 0.02, speed: 1300, len: 70, color: '#dfe8ff', a: 0.4, seed: 4 });
  FX.drops(g, t, { count: 40, rMin: 2, rMax: 7, color: '#dfe8ff', drift: 1, seed: 6 });
  FX.fog(g, E.H * 0.1, E.H * 0.5, '#c8d4f0', 0.18);
} });

// s06 — "On the bus."  night bus window, rain, city lights sliding past, head against the glass
registerShot('s06', { draw(g, t, info) {
  const M = mood('night'), cam = { z: 1.05 + 0.04 * t, x: 10 * t };
  const wy0 = E.H * V(0.12, 0.2), wy1 = E.H * V(0.62, 0.6);
  blurLayer(g, 10, (g) => {
    g.fillStyle = linGrad(g, 0, wy0, 0, wy1, [M.sky[0], M.sky[1]]); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
    const cols = [M.practical, '#ff6a5a', '#9fd0ff', '#ffd59a', '#ff9a4a'], r = rng(21);
    for (let i = 0; i < 46; i++) { const sp = 600 + r() * 900, x = E.W + 200 - ((r() * (E.W + 400) + t * sp) % (E.W + 400)), y = wy0 + r() * (wy1 - wy0), rad = 16 + r() * 50, c = cols[i % cols.length];
      glow(g, x, y, rad * 2.2, c, 0.35); circle(g, x, y, rad * 0.5, alpha(c, 0.55)); }
  }, cam, 0.3);
  FX.rain(g, t, { count: 140, angle: 1.1, speed: 500, len: 30, color: '#b8c8ff', a: 0.35, area: [0, wy0, E.W, wy1 - wy0], seed: 7 });
  layer(g, cam, 1, (g) => {
    g.fillStyle = shade(M.wall, -0.55); g.fillRect(-E.W, -E.H, E.W * 3, wy0); g.fillRect(-E.W, wy1, E.W * 3, E.H * 2);    // bus body
    rr(g, -60, wy0 - 10, E.W + 120, wy1 - wy0 + 20, 40); g.strokeStyle = shade(M.wall, -0.35); g.lineWidth = 22; g.stroke();
    seg(g, [[E.W * 0.62, wy0], [E.W * 0.62, wy1]], 16, shade(M.wall, -0.4));
    rr(g, E.W * 0.12, wy1 - 40, V(340, 380), E.H * 0.5, 30); g.fillStyle = shade('#3a4470', -0.4); g.fill();               // seat back
    const flick = 0.6 + 0.4 * Math.abs(Math.sin(t * 7));
    drawFigure(g, { x: E.W * V(0.34, 0.36), y: wy1 + V(300, 420), s: V(2.3, 2.6), facing: 1, outfit: HERO, pose: breathe({ ...POSES.sit, head: [-14, -172], sh: [-6, -144], hF: [36, -82], hB: [28, -84] }, t, 0.4), expr: 'sad', look: [-0.4, 0], rim: { color: mix(M.key, M.practical, flick * 0.5), dir: [-0.6, -1] }, shadow: false });
  });
} });

// s07 — "At three in the morning."  sitting up in bed, the phone lights his face, the clock reads 3:00
registerShot('s07', { draw(g, t, info) {
  const k = ease.inOut(t / info.dur), cam = { z: 1.28 + 0.14 * k, x: V(60, 80) + 20 * k, y: V(120, 150) };
  const { GY, M, B } = bedroom(g, t, cam, { mood: 'night' });
  const s = B.s, hx = B.x + 120 * s, hy = B.top + 6 * s;
  const sitUp = { head: [14, -112], sh: [8, -80], hip: [0, -6], eF: [28, -46], hF: [44, -70], eB: [18, -44], hB: [36, -64], kF: [52, -12], fF: [104, -8], kB: [50, -14], fB: [100, -10] };
  layer(g, cam, 1, (g) => {
    const bed = bedShape(g, B, M);
    drawFigure(g, { x: hx, y: hy, s, facing: 1, outfit: HERO, pose: breathe(sitUp, t, 0.5), expr: 'worried', look: [0.4, 0.3], prop: { type: 'phone', glow: '#d8ecff' }, rim: { color: '#bfe0ff', dir: [1, -0.2], w: 4 }, shadow: false, blink: (t % 2.9) > 2.8 });
    bed.blanket(g, 0.24);
    const ph = [hx + 44 * s, hy - 70 * s]; glow(g, ph[0], ph[1], 260, '#bfe0ff', 0.45 * (0.85 + 0.15 * Math.sin(t * 9)));
    nightstand(g, B.x + B.w + V(70, 60), GY, V(1.5, 1.7), M, '3:00', 0.6 + 0.4 * Math.sin(t * 3));
  });
  FX.dust(g, t, { count: 24, color: '#bfe0ff', a: 0.25, speed: 6 });
} });

// s08 — "Every time, I win."  he stands and points at the empty chair; a ghost of HIM bows his head
registerShot('s08', { draw(g, t, info) {
  const k = ease.inOut(t / info.dur), cam = { z: 1.14 + 0.06 * k, x: 20 - 30 * k, y: 40 };
  const { M } = apartment(g, t, cam, { mood: 'night' }), GY = aptGround(), s = V(1.55, 1.65);
  const tw = (wordTime('win', 20.5) ?? 21.72) - (info.globalT - t);
  layer(g, cam, 1, (g) => {
    const cx = E.W / 2 + V(190, 175);
    aptChair(g, cx + 14 * s, GY, s, -1, shade(M.wall, -0.65));
    drawFigure(g, { x: cx, y: GY, s, facing: -1, outfit: HIM, pose: breathe({ ...POSES.sit, head: [16, -164], sh: [9, -138] }, t, 0.4, 3), expr: 'sad', look: [0, 0.6], alpha: 0.3, rim: { color: '#9fb8ff', dir: [0, -1] }, shadow: false });
    const hx = E.W / 2 - V(190, 170);
    const pose = posesAt(t, [[0, 'stand'], [0.25, 'point'], [tw, 'crossArms']], 0.3);
    drawFigure(g, { x: hx, y: GY, s, facing: 1, outfit: HERO, pose: breathe(pose, t), expr: t > tw ? 'smirk' : 'determined', rim: { color: M.key, dir: [-1, -0.3] }, blink: (t % 3.2) > 3.1 });
    if (t > tw) { const a = 1 - prog(t, tw + 0.6, info.dur); FX.sparkle(g, hx + 40, GY - 420 * s / 1.6, 30, GOLD(), 0.8 * a); FX.sparkle(g, hx - 50, GY - 330 * s / 1.6, 20, GOLD(), 0.7 * a); glow(g, hx, GY - 200 * s, 260, GOLD(), 0.18 * a); }
  });
  FX.dust(g, t, { count: 30, color: '#c9d4ff', a: 0.22, speed: 7 });
} });

// s09 — "Every time, I say the perfect thing."  smirking close-up, a glowing gold speech bubble blooms on "perfect"
registerShot('s09', { draw(g, t, info) {
  blurLayer(g, 16, (g) => apartment(g, t, { z: 1.8, x: 160, y: -140 }, { mood: 'night' })); veil(g, '#05060e', 0.4);
  const tp = (wordTime('perfect', 22.8) ?? 24.26) - (info.globalT - t), k = ease.inOut(t / info.dur);
  const r = V(270, 300) * (1 + 0.05 * k), cx = E.W * V(0.4, 0.4), cy = E.H * V(0.58, 0.56);
  const bx = E.W * V(0.72, 0.72), by = E.H * V(0.28, 0.3), bs = popIn(t, tp, 0.45), ba = clamp(prog(t, tp, tp + 0.2));
  glow(g, bx, by, V(500, 520), GOLD(), 0.25 * ba);
  heroFace(g, cx, cy, r, { outfit: HERO, expr: 'smirk', look: [0.45, -0.25], rimColor: mix('#c9d4ff', GOLD(), ba), rimSide: 1, blink: (t % 2.7) > 2.6 });
  [0.2, 0.75].forEach((b) => { const a = clamp(Math.min(prog(t, b, b + 0.12), 1 - prog(t, b + 0.45, b + 0.65))); if (a > 0) { g.save(); g.globalAlpha = a * 0.8; UI.bubble(g, bx - 40 + b * 60, by + 60, { w: 120, h: 68, color: '#e6ebff' }); g.restore(); } });
  if (bs > 0) {
    g.save(); g.translate(bx, by); g.scale(bs, bs); g.shadowColor = GOLD(); g.shadowBlur = 40;
    UI.bubble(g, 0, 0, { w: V(300, 330), h: V(170, 180), color: GOLD(), dots: false }); g.restore();
    FX.sparkle(g, bx, by, 46 * bs, '#ffffff', 0.95);
    for (let i = 0; i < 5; i++) { const a = t * 1.2 + i * 1.26; FX.sparkle(g, bx + Math.cos(a) * 230, by + Math.sin(a) * 140, 14, GOLD(), 0.8 * ba); }
  }
} });

// s10 — "And every time, I wake up,"  grey morning, face on the pillow, eyes open on "wake" — no relief
registerShot('s10', { draw(g, t, info) {
  blurLayer(g, 14, (g) => bedroom(g, t, { z: 1.7, x: -180, y: -260 }, { mood: 'interiorCool', grey: true })); veil(g, '#0a0c16', 0.3);
  const tw = (wordTime('wake', 26.4) ?? 27.38) - (info.globalT - t), k = ease.inOut(t / info.dur);
  const r = V(250, 280) * (1 + 0.04 * k), cx = E.W / 2 + V(40, 30), cy = E.H * V(0.5, 0.48);
  g.save(); g.translate(cx, cy); g.rotate(-0.3); rr(g, -r * 1.9, -r * 0.9, r * 3.8, r * 1.9, r * 0.8); g.fillStyle = '#9aa2b8'; g.fill(); g.restore();   // pillow
  heroFace(g, cx, cy, r, { outfit: HERO, tilt: -0.3, expr: t > tw ? 'sad' : 'sleepy', blink: t < tw, look: [0.3, -0.2], face: t > tw ? { mouth: 'flat' } : {}, rimColor: '#dfe6ff', rimSide: 1 });
  rr(g, -40, cy + r * 1.05, E.W + 80, E.H, 60); g.fillStyle = linGrad(g, 0, cy + r, 0, E.H, ['#4a5274', '#2a3050']); g.fill();  // blanket edge
  glow(g, E.W * 0.9, E.H * 0.1, E.W * 0.8, '#dfe6ff', 0.25);
  desaturate(g, 0.55, '#9fb0d0', 0.12);
  if (t > tw && t < tw + 0.5) FX.rings(g, cx, cy, t - tw, { count: 2, r0: r * 0.6, r1: r * 1.6, color: '#ffffff', a: 0.35 * (1 - prog(t, tw, tw + 0.5)) });
} });

// s11 — "and it still went the way it went."  THE DOORWAY replayed in grey: rewind, then he leaves again, exactly the same
registerShot('s11', { draw(g, t, info) {
  const rw = 0.75, leave = t < rw ? 1 - ease.inOut(t / rw) : ease.inOut(prog(t, rw, info.dur + 0.3));
  doorway(g, t, { leave, walkT: t < rw ? -t * 2.2 : t, z: 1.06, x: V(70, 60) });
  desaturate(g, 0.85, '#8fa0c0', 0.16);
  replayGlitch(g, t, t < rw + 0.1 ? 1 : 0.35);
  UI.readout(g, { label: 'REPLAY', value: '#401', x: V(120, 90), y: V(170, 300), size: V(46, 60), color: '#e8ecff' });
  if (t < rw) { const x = E.W - V(170, 150), y = V(170, 300); for (const dx of [0, 44]) { g.fillStyle = 'rgba(232,236,255,.85)'; g.beginPath(); g.moveTo(x + dx, y - 22); g.lineTo(x + dx - 40, y); g.lineTo(x + dx, y + 22); g.closePath(); g.fill(); } }
} });
