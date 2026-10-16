// shots/06_price.js — the price: jokes arrive twice, conversations are reruns, no more surprises, two movies, headaches.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, wordTime, rng, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, radGrad, text, FONTS, shake } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { street, bench } from '../sets/street.js';
import { restaurant, rTable } from '../sets/restaurant.js';
import { kitchen } from '../sets/kitchen.js';
import { bedroom, bedShape } from '../sets/bedroom.js';
import { YOU, FRIEND, FRIEND2, FRIEND3, MIA } from '../cast.js';
import { BLUE, ghost, ghostFig, ghostSay, doubleWorld, hud, heroFace, chip, say, glitchBands, blueEdge } from '../lib.js';

const crossS = { ...POSES.sit, eF: [16, -118], hF: [-8, -126], eB: [10, -120], hB: [14, -128] };
const sitT = { ...POSES.sit, eF: [22, -112], hF: [46, -126], eB: [16, -114], hB: [40, -128] };
const talkT = { ...POSES.sit, eF: [26, -128], hF: [50, -150], eB: [16, -114], hB: [40, -128] };
const laughT = { ...POSES.sit, head: [10, -186], sh: [4, -150], eF: [22, -128], hF: [30, -100], eB: [14, -126], hB: [22, -98] };

// lunch table: YOU left, the JOKER (cap) and a friend right
function lunch(g, t, cam, o = {}) {
  const { M, GY } = restaurant(g, t, cam, { day: true }), rim = { color: M.rim, dir: [0, -1] };
  const P = { you: [E.W / 2 - 300, GY], joker: [E.W / 2 + 290, GY], f2: [E.W / 2 + 560, GY] };
  layer(g, cam, 1, (g) => {
    const f2 = o.f2 || {}; drawFigure(g, { x: P.f2[0], y: GY, s: 1.35, facing: f2.facing ?? -1, outfit: FRIEND2, pose: breathe(f2.pose || sitT, t, 0.7, 4), expr: f2.expr || 'smile', look: f2.look, rim, blink: (t % 3.7) > 3.6 });
    const j = o.joker || {}; drawFigure(g, { x: P.joker[0], y: GY, s: 1.4, facing: j.facing ?? -1, outfit: FRIEND, pose: breathe(j.pose || talkT, t, 0.7, 2), expr: j.expr || 'happy', talk: j.talk || 0, look: j.look, rim, blink: (t % 3.2) > 3.1 });
    const y = o.you || {}; drawFigure(g, { x: P.you[0], y: GY + (y.dy || 0), s: 1.4, facing: 1, outfit: YOU, pose: breathe(y.pose || sitT, t, 0.7, 0), expr: y.expr || 'neutral', look: y.look, rim, blink: y.blink ?? (t % 3.5) > 3.4 });
    rTable(g, E.W / 2, GY, 1.0, { w: 560 });
  });
  return { M, GY, P };
}
const flap = (t, k = 1) => k * (0.3 + 0.7 * Math.abs(Math.sin(t * 15)) * (0.6 + 0.4 * Math.sin(t * 4.7)));

// s045 — "But living ten seconds ahead has a price."  dusk park bench, alone, a cyan flicker
registerShot('s045', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.3 + 0.07 * ease.inOut(k), x: 40, y: 60 };
  const { M, GY } = street(g, t, cam, { mood: 'dusk', seed: 55 }), rim = { color: M.rim, dir: [-0.9, -0.3] };
  layer(g, cam, 1, (g) => { bench(g, E.W / 2 + 40, GY, 1.2); drawFigure(g, { x: E.W / 2, y: GY, s: 1.45, facing: 1, outfit: YOU, pose: breathe({ ...POSES.sit, head: [14, -170], sh: [6, -140], hF: [36, -86], hB: [30, -84] }, t, 0.6), expr: 'sad', look: [0.4, 0.6], rim, blink: (t % 3.4) > 3.3 }); });
  ghost(g, (x) => drawFigure(x, { x: E.W / 2 + 60, y: GY, s: 1.45, facing: 1, outfit: YOU, pose: { ...POSES.sit, head: [20, -160], sh: [10, -134] }, expr: 'sad' }), { cam, t, a: 0.3, flicker: 0.7 });
  FX.dust(g, t, { count: 40, color: '#ffc9a8', a: 0.3, speed: 6 });
} });

// s046 — "Every joke reaches you twice."  the same joke bubble arrives in cyan, then for real
registerShot('s046', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.35 + 0.04 * k, x: 20, y: 90 };
  const { P } = lunch(g, t, cam, { joker: { pose: posesAt(t, [[0, talkT], [0.9, sitT], [1.1, talkT]], 0.2), talk: flap(t, t > 0.9 ? 1 : 0.6), expr: 'happy' }, you: { expr: t > 0.5 ? 'smirk' : 'neutral', look: [0.7, -0.1] } });
  layer(g, cam, 1, (g) => say(g, P.joker[0] - 80, P.joker[1] - 440, 'SO A DUCK WALKS IN…', { size: 34, k: prog(t, 1.0, 1.3), tail: [P.joker[0] - 20, P.joker[1] - 330] }));
  ghostSay(g, P.joker[0] - 80, P.joker[1] - 440, 'SO A DUCK WALKS IN…', { size: 34, k: prog(t, 0.15, 0.45) }, { cam, t, a: 0.6 * (1 - prog(t, 0.8, 1.0)) });
  chip(g, '×2', E.W - 220, 220, { size: 44, color: S().ui.gold, k: prog(t, 1.2, 1.5) });
} });

// s047 — "First the punchline, then the setup."  two cards in the wrong order
registerShot('s047', { draw(g, t, info) {
  blurLayer(g, 16, (g) => lunch(g, t, { z: 1.4, x: 40, y: 80 })); veil(g, '#0a0812', 0.45);
  const tp = (wordTime('punchline', 99) ?? 99.54) - info.shot.start, ts = (wordTime('setup', 100) ?? 100.74) - info.shot.start;
  const cardF = (x, y, n, label, col, a) => { if (a <= 0) return; const s = 0.8 + 0.2 * ease.outBack(clamp(a)); g.save(); g.globalAlpha *= clamp(a * 2); g.translate(x, y); g.scale(s, s); g.rotate(n === 1 ? -0.04 : 0.04);
    rr(g, -250, -150, 500, 300, 26); g.fillStyle = 'rgba(10,16,30,.92)'; g.fill(); g.strokeStyle = col; g.lineWidth = 4; g.stroke();
    text(g, String(n), 0, -60, { size: 90, color: col, font: FONTS.ui, weight: 900, glow: 16, glowColor: alpha(col, 0.6) }); text(g, label, 0, 60, { size: 52, color: S().ui.cream, font: FONTS.ui, weight: 900, spacing: 3 }); g.restore(); };
  cardF(E.W / 2 - 300, E.H / 2, 1, 'PUNCHLINE', BLUE, prog(t, tp - 0.15, tp + 0.2));
  cardF(E.W / 2 + 300, E.H / 2, 2, 'SETUP', S().ui.gold, prog(t, ts - 0.15, ts + 0.2));
} });

// s048 — "You laugh at the wrong moment,"  you crack up; everyone else is silent mid-setup
registerShot('s048', { draw(g, t, info) {
  const cam = { z: 1.45, x: -120, y: 100 }, [sx] = shake(t, 3, 14);
  lunch(g, t, cam, { you: { pose: { ...laughT, head: [10 + sx, -186] }, expr: 'joy' }, joker: { pose: talkT, talk: flap(t, 0.8), expr: 'neutral' }, f2: { expr: 'confused' } });
  layer(g, cam, 1, (g) => FX.rings(g, E.W / 2 - 280, E.H * 0.8 - 270, t, { count: 3, r0: 40, r1: 150, color: S().ui.gold, a: 0.5 }));
  chip(g, 'HA HA HA!', E.W / 2 - 520, 230, { size: 34, color: S().ui.gold, k: prog(t, 0.1, 0.35) });
} });

// s049 — "and people stop telling you jokes."  they turn away; the joker zips it; your laugh dies
registerShot('s049', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.35 + 0.04 * k, x: 20, y: 90 }, turn = t > 0.6;
  lunch(g, t, cam, { you: { expr: t > 1.0 ? 'nervous' : 'smile', pose: sitT, look: [0.8, 0] }, joker: { facing: turn ? 1 : -1, pose: turn ? crossS : talkT, expr: 'neutral' }, f2: { facing: turn ? 1 : -1, expr: 'neutral' } });
} });

// s050 — "Conversations feel like reruns."  his ghost already finished the sentence; you're bored
registerShot('s050', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.6 + 0.05 * k, x: -60, y: 130 };
  const { P } = lunch(g, t, cam, { joker: { pose: talkT, talk: flap(t), expr: 'happy' }, you: { expr: 'sleepy', pose: { ...POSES.sit, head: [12, -176], eF: [22, -128], hF: [16, -168], eB: [16, -114], hB: [40, -128] } } });
  ghost(g, (x) => drawFigure(x, { x: P.joker[0] + 40, y: P.joker[1], s: 1.4, facing: -1, outfit: FRIEND, pose: crossS, expr: 'smile' }), { cam, t, a: 0.4 });
  chip(g, '▶ RERUN', E.W - 240, 220, { size: 32, color: BLUE, k: prog(t, 0.2, 0.5), line: alpha(BLUE, 0.6) });
} });

// s051 — "You answer questions nobody has asked yet,"  you answer "FRIDAY!"; his question is still only a ghost
registerShot('s051', { draw(g, t, info) {
  const cam = { z: 1.45, x: 0, y: 100 };
  const { P } = lunch(g, t, cam, { you: { pose: talkT, expr: 'happy', look: [0.6, -0.2] }, joker: { pose: talkT, talk: t < 0.4 ? flap(t) : 0.25, expr: 'confused' } });
  layer(g, cam, 1, (g) => say(g, P.you[0] + 60, P.you[1] - 440, 'FRIDAY!', { size: 40, k: prog(t, 0.3, 0.6), tail: [P.you[0] + 30, P.you[1] - 330] }));
  ghostSay(g, P.joker[0] - 20, P.joker[1] - 440, "WHEN'S THE PARTY?", { size: 34, k: prog(t, 0.6, 0.9) }, { cam, t, a: 0.6 });
} });

// s052 — "and your friends start to find it creepy."  two friends whisper, side-eyeing you
registerShot('s052', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.75 + 0.05 * k, x: 320, y: 150 };
  lunch(g, t, cam, { joker: { pose: { ...sitT, head: [18, -176], sh: [8, -146] }, facing: 1, expr: 'worried', look: [-1, 0] }, f2: { pose: { ...POSES.sit, head: [-14, -176], eF: [-6, -140], hF: [-14, -170] }, facing: -1, expr: 'nervous', look: [-0.8, 0] }, you: { expr: 'neutral' } });
  veil(g, '#2a3a6a', 0.25, 'soft-light'); veil(g, '#05060e', 0.15);
} });

// s053 — "Surprise parties don't exist for you anymore."  lights snap on: SURPRISE! — you're already facing them, deadpan
registerShot('s053', { draw(g, t, info) {
  const on = t > 0.25, k = t / info.dur, cam = { z: 1.15 + 0.04 * k, x: 60, y: 30 };
  const { M, GY } = kitchen(g, t, cam, { night: !on, nightWindow: true, lampOn: on, calendar: 'FRI' }), rim = { color: on ? M.rim : '#c9d4ff', dir: [-0.8, -0.5] };
  layer(g, cam, 1, (g) => {
    const jump = (d) => on ? Math.abs(Math.sin((t - 0.25) * 6 + d)) * 30 : 0;
    [[FRIEND, 160, 0], [MIA, 330, 1], [FRIEND2, 500, 2], [FRIEND3, 650, 0.5]].forEach(([of, dx, d]) => drawFigure(g, { x: E.W / 2 + dx, y: GY - jump(d), s: 1.2, facing: -1, outfit: of, pose: on ? POSES.cheer : POSES.crouch, expr: on ? 'joy' : 'smirk', rim }));
    drawFigure(g, { x: E.W / 2 - 330, y: GY, s: 1.25, facing: 1, outfit: YOU, pose: breathe(POSES.crossArms, t), expr: 'neutral', face: { mouth: 'flat' }, rim });
    if (on) { const bw = 760, bx = E.W / 2 + 40, by = GY - 610; for (let i = 0; i < 9; i++) { const x = bx + i * bw / 9; poly(g, [[x, by], [x + bw / 9, by], [x + bw / 18, by + 60]], ['#e04a3a', '#f2c21a', '#3a7ae0'][i % 3]); } chip(g, 'SURPRISE!', bx + bw / 2, by - 50, { size: 44, color: S().ui.gold, k: prog(t, 0.3, 0.6) }); }
  });
  if (on) { const r = rng(5); for (let i = 0; i < 70; i++) { const x = r() * E.W, y0 = -50 - r() * 400, y = y0 + (t - 0.25) * (300 + r() * 200), c = ['#e04a3a', '#f2c21a', '#3a7ae0', '#5fd39a', '#ff9ac0'][i % 5]; g.save(); g.translate(x + Math.sin(t * 3 + i) * 20, y); g.rotate(t * 4 + i); g.fillStyle = c; g.fillRect(-6, -3, 12, 6); g.restore(); } }
  if (!on) veil(g, '#000', 0.35);
  if (t > 0.25 && t < 0.4) veil(g, '#fff', 0.5 * (1 - prog(t, 0.25, 0.4)));
} });

// s054 — "And your brain is running two movies at the same time."  a head with two film strips feeding the brain
function filmStrip(g, x0, y0, x1, y1, t, col, label, dir = 1) {
  const len = Math.hypot(x1 - x0, y1 - y0), ang = Math.atan2(y1 - y0, x1 - x0);
  g.save(); g.translate(x0, y0); g.rotate(ang);
  g.fillStyle = alpha(shade(col, -0.75), 0.95); g.fillRect(0, -70, len, 140);
  for (let x = (-t * 220 * dir) % 60; x < len; x += 60) { if (x < 0) continue; g.fillStyle = alpha('#000', 0.8); g.fillRect(x + 10, -62, 26, 16); g.fillRect(x + 10, 46, 26, 16); }
  for (let x = (-t * 220 * dir) % 180; x < len; x += 180) { if (x < 0) continue; rr(g, x + 8, -40, 160, 80, 6); g.fillStyle = alpha(col, 0.55); g.fill(); g.fillStyle = alpha('#000', 0.5); circle(g, x + 60, 6, 12, alpha('#000', 0.6)); g.fillRect(x + 54, 16, 12, 22); }
  g.restore();
  text(g, label, x0 + Math.cos(ang) * len * 0.62, y0 + Math.sin(ang) * len * 0.62 - 120, { size: 46, color: col, font: FONTS.ui, weight: 900, glow: 12, glowColor: alpha(col, 0.6) });
}
registerShot('s054', { draw(g, t, info) {
  const M = mood('void'), k = t / info.dur, gold = S().ui.gold;
  g.fillStyle = radGrad(g, E.W / 2, E.H / 2, 0, E.W * 0.7, ['#141a30', '#070a14']); g.fillRect(0, 0, E.W, E.H);
  g.save(); g.translate(E.W / 2, E.H / 2); g.scale(1 + 0.05 * k, 1 + 0.05 * k); g.translate(-E.W / 2, -E.H / 2);
  const hx = E.W * 0.36, hy = E.H * 0.52;
  filmStrip(g, E.W + 60, E.H * 0.18, hx + 120, hy - 60, t, '#ffcf8a', 'REAL', 1);
  filmStrip(g, E.W + 60, E.H * 0.86, hx + 120, hy + 60, t * 1.3, BLUE, '+10 s', 1);
  circle(g, hx + 8, hy, 300, '#dfe8ff'); circle(g, hx, hy, 296, S().ink);                     // the head (rim on the right)
  const over = prog(t, 2.0, info.dur);
  g.strokeStyle = mix('#ff9aa8', '#ff5a5a', over); g.lineWidth = 7; for (let i = 0; i < 9; i++) { g.beginPath(); g.ellipse(hx - 20 + Math.cos(i * 0.7) * 90, hy - 50 + Math.sin(i * 1.3) * 60, 70, 46, i * 0.4, 0, Math.PI * 2); g.stroke(); }
  glow(g, hx - 20, hy - 50, 260 + over * 80, over > 0 ? '#ff5a5a' : '#ff9aa8', 0.25 + over * 0.4);
  if (over > 0) { const r = rng(Math.floor(t * 12)); for (let i = 0; i < 6; i++) { const a = r() * 6.28, d = 200 + r() * 80; seg(g, [[hx - 20 + Math.cos(a) * d, hy - 50 + Math.sin(a) * d], [hx - 20 + Math.cos(a) * (d + 60), hy - 50 + Math.sin(a) * (d + 60)]], 6, alpha(gold, 0.8 * over)); } }
  g.restore();
  if (over > 0) glitchBands(g, t, over * 0.8);
} });

// s055 — "By evening, the headaches are so bad that you sit in a dark room"
registerShot('s055', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.25 + 0.06 * ease.inOut(k), x: 120, y: 50 };
  const { M, GY, light } = bedroom(g, t, cam, { evening: true }), pulse = 0.5 + 0.5 * Math.sin(t * 6.5);
  layer(g, cam, 1, (g) => {
    bedShape(g, E.W / 2 + 120, GY, 1.1);
    drawFigure(g, { x: E.W / 2 - 60, y: GY, s: 1.45, facing: 1, outfit: YOU, pose: breathe({ ...POSES.sit, head: [14, -170], sh: [6, -142], eF: [34, -178], hF: [16, -200], eB: [-14, -176], hB: [-6, -204] }, t, 0.5), expr: 'sad', face: { eyes: 'closed' }, rim: { color: light, dir: [-0.9, -0.3] } });
    FX.rings(g, E.W / 2 - 50, GY - 320, t, { count: 3, r0: 30, r1: 120, color: '#ff7a7a', a: 0.35 * pulse });
  });
  ghost(g, (x) => drawFigure(x, { x: E.W / 2 - 20, y: GY, s: 1.45, facing: 1, outfit: YOU, pose: { ...POSES.sit, head: [20, -160], sh: [10, -134] }, expr: 'sad' }), { cam, t, a: 0.25 * (Math.sin(t * 9) > 0.3 ? 1 : 0.2), flicker: 0.5 });
  veil(g, '#05030a', 0.2);
} });

// s056 — "with your eyes closed,"  close-up in near darkness
registerShot('s056', { draw(g, t, info) {
  const M = mood('night'), k = t / info.dur;
  blurLayer(g, 16, (g) => bedroom(g, t, { z: 1.8, x: -260, y: -200 }, { evening: true })); veil(g, '#030208', 0.6);
  heroFace(g, E.W / 2, E.H * 0.6, 340 * (1 + 0.05 * k), { outfit: YOU, expr: 'sad', face: { eyes: 'closed', mouth: 'flat' }, rimColor: '#c9a8e8', rimSide: -1, tilt: -0.05 });
  if (Math.sin(t * 11) > 0.6) glitchBands(g, t, 0.35);
} });

// s057 — "just to make one of the worlds go away."  the cyan copy of the room fades out
registerShot('s057', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.3, x: 120 - 40 * k, y: 50 };
  const scene = (gg, tt) => { const { GY, light } = bedroom(gg, tt, cam, { evening: true }); layer(gg, cam, 1, (gg) => { bedShape(gg, E.W / 2 + 120, GY, 1.1); drawFigure(gg, { x: E.W / 2 - 60, y: GY, s: 1.45, facing: 1, outfit: YOU, pose: breathe({ ...POSES.sit, head: [12, -174], sh: [6, -144], hF: [36, -86], hB: [30, -84] }, tt, 0.4), expr: k > 0.6 ? 'neutral' : 'sad', face: { eyes: 'closed' }, rim: { color: light, dir: [-0.9, -0.3] } }); }); };
  scene(g, t);
  const fade = 1 - ease.inOut(prog(t, 0.6, info.dur - 0.4));
  doubleWorld(g, (x) => scene(x, t + 3), { a: 0.55 * fade, dx: 50, t });
  blueEdge(g, t, 0.5 * fade);
  veil(g, '#05030a', 0.2);
} });
