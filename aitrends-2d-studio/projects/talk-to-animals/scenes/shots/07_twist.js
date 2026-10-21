// 07_twist.js — s151–s163: 4:47 a.m., the garden is silent, Pickles stares at the sea, thousands of whales say
// "We hear you", Pickles: "They've been asking for you all night." Then the end screen.
import { E, registerShot, layer, blurLayer, ease, prog, clamp, lerp, rr, seg, circle, poly, alpha, glow, linGrad, text, FONTS, veil } from '/engine/core.js';
import { POSES } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { person, bigFaceV2, XP } from '../look.js';
import { YOU } from '../cast.js';
import { dog, cat, catBack, crow, pigeon, squirrel, prairieDog, whaleTail } from '../animals.js';
import { bedroom, gardenView, GY } from '../sets/house.js';
import { seaDawn } from '../sets/outside.js';
import { say, speak, nameTag, myth, wave, wt, GOLDC, CORALC, SKYC } from '../ui.js';
import { F, push } from '../common.js';

const DAWN_RIM = { color: '#ffc8a0', dir: [0.6, -0.6] };
const ZOOM = (g, t, dur, a, b, cx = 960, cy = 540) => { const z = lerp(a, b, ease.inOut(clamp(t / dur))); g.translate(cx, cy); g.scale(z, z); g.translate(-cx, -cy); };
// a window frame drawn over a full-frame view (you are inside looking out)
function windowBars(g) {
  g.fillStyle = '#efe4d2'; g.fillRect(-200, -200, E.W + 400, 140); g.fillRect(-200, E.H - 90, E.W + 400, 300); g.fillRect(-200, -200, 260, E.H + 400); g.fillRect(E.W - 60, -200, 300, E.H + 400);
  g.fillRect(E.W / 2 - 14, -60, 28, E.H); g.fillRect(-60, E.H * 0.48, E.W + 120, 24);
  g.fillStyle = alpha('#000000', 0.12); g.fillRect(60, -60, 14, E.H); g.fillRect(-60, E.H - 90, E.W + 120, 12);
}
// the sea at dawn drawn inside a rectangle (a window)
function seaIn(g, t, x, y, w, h, o) {
  g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip();
  const s = Math.max(w / E.W, h / E.H); g.translate(x + w / 2 - (E.W * s) / 2, y + h / 2 - (E.H * s) / 2); g.scale(s, s);
  seaDawn(g, t, { x: 0, y: 0, z: 1 }, o); g.restore();
}
// Pickles at the window, from behind
function picklesWindow(g, t, o = {}) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#3a3556', '#2a2640']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const X = 400, Y = 90, W = 1120, H = 680;
  seaIn(g, t, X, Y, W, H, { whales: o.whales || 0, ripple: o.ripple });
  g.fillStyle = '#efe4d2'; g.fillRect(X - 30, Y - 30, W + 60, 30); g.fillRect(X - 30, Y - 30, 30, H + 60); g.fillRect(X + W, Y - 30, 30, H + 60); g.fillRect(X + W / 2 - 12, Y, 24, H);
  rr(g, X - 70, Y + H, W + 140, 44, 8); g.fillStyle = '#f6eee0'; g.fill(); g.fillStyle = alpha('#000000', 0.2); g.fillRect(X - 70, Y + H + 44, W + 140, 14);
  glow(g, 960, Y + H * 0.6, 700, '#ffc8a0', 0.18);
  catBack(g, { x: 960, y: Y + H + 4, s: 2.7, flat: o.flat, rim: DAWN_RIM, shadow: false });
}

// s151 — "Then one morning, at four forty-seven, you wake up, and something's wrong."
registerShot('s151', { draw(g, t, info) {
  const tF = wt('four', info, t, 1.85) - 0.1, tW = wt('wake', info, t, 3.9) - 0.1, tR = wt('something', info, t, 5.3) - 0.1;
  if (t < tF) {
    const cam = push(t, tF, F(760, 640, 1.25), F(700, 660, 1.4));
    layer(g, cam, 1, (g) => { const R = bedroom(g, t, { x: 0, y: 0, z: 1 }, { time: 'dawn', clockStr: '4:47' }); circle(g, R.bedX - 240, GY() - 210, 34, '#16121a'); });
    nameTag(g, 'ONE MORNING', 300, 110, t, 0.15, { size: 40 });
  } else if (t < tW) {
    const u = t - tF;
    blurLayer(g, 10, (g) => bedroom(g, t, { x: 0, y: 0, z: 1 }, { time: 'dawn', clockStr: '4:47' }), null);
    g.save(); ZOOM(g, u, tW - tF, 1.0, 1.08);
    rr(g, 460, 300, 1000, 480, 60); g.fillStyle = '#16121a'; g.fill(); rr(g, 500, 340, 920, 400, 40); g.fillStyle = '#221a20'; g.fill();
    text(g, '4:47', 960, 552, { size: 330, font: FONTS.ui, weight: 900, color: '#ff5a4a', glow: 40, glowColor: 'rgba(255,90,70,.75)' });
    g.restore();
  } else if (t < tR) {
    const cam = push(t - tW, tR - tW, F(560, 700, 1.6), F(520, 700, 1.75));
    layer(g, cam, 1, (g) => { const R = bedroom(g, t, { x: 0, y: 0, z: 1 }, { time: 'dawn', clockStr: '4:47' }); person(g, { x: R.bedX - 200, y: GY() - 60, s: 1.1, facing: 1, outfit: YOU, pose: XP.sitBed, expr: 'neutral', look: [1, -0.3], rim: DAWN_RIM, shadow: false }); });
  } else {
    blurLayer(g, 10, (g) => bedroom(g, t, { x: 0, y: 0, z: 1 }, { time: 'dawn', clockStr: '4:47' }), null);
    bigFaceV2(g, 960, 640, 300 * (1 + 0.03 * (t - tR)), { outfit: YOU, expr: 'worried', look: [0.7, -0.2], rim: '#ffc8a0' });
  }
} });
// s152 — "It's quiet."
registerShot('s152', { draw(g, t, info) {
  g.save(); ZOOM(g, t, info.dur, 1.0, 1.04);
  gardenView(g, -100, -100, E.W + 200, E.H + 200, t, { time: 'dawn' });
  g.restore(); windowBars(g);
} });
// s153 — "No birds. No "my tree"."
registerShot('s153', { draw(g, t, info) {
  g.save(); ZOOM(g, t, info.dur, 1.25, 1.35, 1300, 520);
  const G = gardenView(g, -100, -100, E.W + 200, E.H + 200, t, { time: 'dawn' });
  const kb = ease.out(prog(t, 0, 0.3)) * (1 - ease.inOut(prog(t, 1.0, 1.6)));
  if (kb > 0) { g.setLineDash([10, 10]); g.strokeStyle = alpha('#ffffff', 0.6 * kb); g.lineWidth = 4; for (let i = 0; i < 7; i++) { const u = 0.45 + i * 0.07, x = -100 + (E.W + 200) * u, y = G.wireY(u); g.beginPath(); g.ellipse(x, y - 22, 20, 18, 0, 0, Math.PI * 2); g.stroke(); } g.setLineDash([]); }
  g.restore();
  const tt = wt('my', info, t, 2.2); if (t > tt - 0.1) { g.save(); g.globalAlpha *= 0.85; myth(g, '"MY TREE!"', 1300, 300, t, tt + 0.5, { size: 110, color: '#ffffff' }); g.restore(); }
} });
// s154 — "Not one crow on the fence."  only the blue glass the crow once gave you
registerShot('s154', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#4a4f8a', '#c890a8', '#f8d0a8']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  FX.sun(g, 400, 760, 50, '#fff2d8', '#ffc890', 4);
  const px = -t * 60;
  g.save(); g.translate(px, 0);
  for (let i = -1; i < 9; i++) { const x = i * 260; rr(g, x, 380, 170, 800, 10); g.fillStyle = '#e8dcc8'; g.fill(); poly(g, [[x, 380], [x + 85, 320], [x + 170, 380]], '#e8dcc8'); g.fillStyle = alpha('#000000', 0.08); g.fillRect(x + 130, 380, 40, 800); }
  g.fillStyle = '#d8ccb8'; g.fillRect(-400, 520, 2800, 46); g.fillRect(-400, 860, 2800, 46);
  const gx = 4 * 260 + 85; poly(g, [[gx - 30, 330], [gx + 10, 300], [gx + 34, 334], [gx + 4, 352]], '#3a8ad8'); poly(g, [[gx - 14, 326], [gx + 8, 310], [gx + 16, 330]], alpha('#bfe8ff', 0.9));
  FX.sparkle(g, gx + 6, 316, 30 + 10 * Math.sin(t * 5), '#ffffff', 0.9);
  g.restore();
} });
// s155 — "Pickles is sitting at the window, ears flat, staring toward the sea."
registerShot('s155', { draw(g, t, info) {
  g.save(); ZOOM(g, t, info.dur, 1.0, 1.1, 960, 640);
  picklesWindow(g, t, { whales: 0, flat: t > wt('flat', info, t, 2.6) - 0.3 });
  g.restore();
} });
// s156 — "Then you hear it. Not from the garden."
registerShot('s156', { draw(g, t, info) {
  blurLayer(g, 10, (g) => bedroom(g, t, { x: 0, y: 0, z: 1 }, { time: 'dawn', clockStr: '4:48' }), null);
  const tn = wt('not', info, t, 1.8), lx = t < tn ? -0.8 : lerp(-0.8, 0.9, ease.inOut(prog(t, tn, tn + 0.5)));
  for (let k = 0; k < 4; k++) { const r = 200 + ((t * 300 + k * 260) % 1000); g.strokeStyle = alpha('#8fd0ff', 0.5 * (1 - (r - 200) / 1000)); g.lineWidth = 10; g.beginPath(); g.arc(2300, 560, r, Math.PI * 0.75, Math.PI * 1.25); g.stroke(); }
  bigFaceV2(g, 900, 640, 300 * (1 + 0.02 * t), { outfit: YOU, expr: 'surprised', look: [lx, -0.1], rim: '#ffc8a0' });
} });
// s157 — "From very, very far away."
registerShot('s157', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 520, 1.0), F(960, 470, 1.25));
  layer(g, cam, 1, (g) => { const R = seaDawn(g, t, { x: 0, y: 0, z: 1 }, { whales: 0 }); g.save(); g.globalAlpha *= 0.5; wave(g, 200, R.H - 6, 1520, 8, t, { color: '#ffe8d0', freq: 10, speed: 2, lw: 3 }); g.restore(); });
} });
// s158 — "Deeper than any voice you've ever heard."
registerShot('s158', { draw(g, t, info) {
  const sh = Math.sin(t * 40) * 3, cam = push(t, info.dur, F(960 + sh, 470, 1.25), F(960 + sh, 480, 1.18));
  layer(g, cam, 1, (g) => seaDawn(g, t, { x: 0, y: 0, z: 1 }, { whales: 0.12 * prog(t, 0.3, info.dur), ripple: true }));
  g.save(); g.globalAlpha *= 0.65; for (let k = 0; k < 3; k++) wave(g, -100, 380 + k * 70, 2120, 50 - k * 12, t + k, { color: k ? '#bfe8ff' : '#8fd0ff', freq: 5 + k, speed: 1.6, lw: 12 - k * 3, env: () => 1 }); g.restore();
} });
// s159 — "Thousands of them. Saying the same three words."
registerShot('s159', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 480, 1.18), F(960, 540, 1.0));
  layer(g, cam, 1, (g) => seaDawn(g, t, { x: 0, y: 0, z: 1 }, { whales: 0.15 + 0.85 * ease.inOut(prog(t, 0, info.dur * 0.8)), ripple: true }));
  const tw = wt('three', info, t, 2.9); if (t > tw - 0.1) [0, 1, 2].forEach(i => { const k = ease.outBack(prog(t, tw + i * 0.15, tw + i * 0.15 + 0.25)); if (k > 0) { g.save(); g.translate(760 + i * 200, 200); g.scale(k, k); circle(g, 0, 0, 44, alpha('#1a2050', 0.85)); text(g, String(i + 1), 0, 4, { size: 54, font: FONTS.ui, weight: 900, color: '#e8f0ff' }); g.restore(); } });
} });
// s160 — "We hear you."
registerShot('s160', { draw(g, t, info) {
  const sh = Math.sin(t * 34) * 4 * (1 - prog(t, 0, info.dur)), cam = push(t, info.dur, F(960 + sh, 540, 1.0), F(960, 520, 1.08));
  layer(g, cam, 1, (g) => seaDawn(g, t, { x: 0, y: 0, z: 1 }, { whales: 1, ripple: true }));
  g.save(); g.globalAlpha *= 0.4; for (let k = 0; k < 2; k++) wave(g, -100, 700 + k * 60, 2120, 30, t + k, { color: '#bfe8ff', freq: 5, speed: 1.4, lw: 8, env: () => 1 }); g.restore();
  speak(g, 'WHALES', info, t, 960, 250, 960, 600, { size: 90, color: '#1a2050', ink: '#e8f0ff', tail: 0.6 });
} });
// s161 — "Pickles doesn't turn around."
registerShot('s161', { draw(g, t, info) {
  g.save(); ZOOM(g, t, info.dur, 1.25, 1.32, 960, 760);
  picklesWindow(g, t, { whales: 1, ripple: true, flat: true });
  g.restore();
} });
// s162 — "They've been asking for you all night."
registerShot('s162', { draw(g, t, info) {
  blurLayer(g, 7, (g) => seaIn(g, t, 0, 0, E.W, E.H, { whales: 1, ripple: true }), null);
  veil(g, '#2a2640', 0.25, 'multiply');
  const cam = push(t, info.dur, { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: 1.05 });
  layer(g, cam, 1, (g) => cat(g, { x: 560, y: 1420, s: 8.6, facing: 1, eyes: 'wide', rim: { ...DAWN_RIM, w: 9 }, shadow: false }));
  speak(g, 'PICKLES', info, t, 1340, 220, 980, 470, { size: 44, wrap: 22 });
} });

// s163 — end screen: "So, if you could talk to animals, who would you talk to first, and what would you ask?
// Tell me in the comments. And subscribe, because the whales aren't done talking."
registerShot('s163', { draw(g, t, info) {
  layer(g, { x: 0, y: 0, z: 1 }, 1, (g) => seaDawn(g, t, { x: 0, y: 0, z: 1 }, { whales: 0.5 }));
  veil(g, '#0e1030', 0.35);
  const a1 = ease.out(prog(t, 0.6, 1.2));
  text(g, 'Who would YOU talk to first?', 960, 140, { size: 84, font: FONTS.serif, weight: 900, italic: true, color: '#fff1dc', alpha: a1, glow: 20, glowColor: 'rgba(255,170,90,.5)' });
  const ta = wt('what', info, t, 5); text(g, 'And what would you ask?', 960, 232, { size: 52, font: FONTS.ui, weight: 900, color: GOLDC, alpha: ease.out(prog(t, ta, ta + 0.4)) });
  // comments + subscribe
  const tc = wt('comments', info, t, 7), kc = ease.outBack(prog(t, tc - 0.3, tc)); if (kc > 0) { g.save(); g.translate(700, 360); g.scale(kc * 1.4, kc * 1.4); rr(g, -60, -40, 120, 80, 24); g.fillStyle = '#ffffff'; g.fill(); poly(g, [[-30, 38], [-10, 38], [-34, 62]], '#ffffff'); for (const dx of [-28, 0, 28]) circle(g, dx, 0, 9, '#1a1420'); g.restore(); text(g, 'Comment', 700, 470, { size: 40, font: FONTS.ui, weight: 900, color: '#ffffff', alpha: clamp(kc) }); }
  const ts = wt('subscribe', info, t, 8.5), ks = ease.outBack(prog(t, ts - 0.2, ts + 0.15)); if (ks > 0) { g.save(); g.translate(1180, 380); g.scale(ks * 1.3, ks * 1.3); rr(g, -190, -46, 380, 92, 46); g.fillStyle = '#e0302a'; g.fill(); text(g, 'SUBSCRIBE', 0, 4, { size: 44, font: FONTS.ui, weight: 900, color: '#ffffff', spacing: 2 }); g.restore(); }
  // a whale tail rises: "the whales aren't done talking"
  const tw = wt('whales', info, t, 10), kw = ease.out(prog(t, tw - 0.2, tw + 0.8)); if (kw > 0) { whaleTail(g, 1700, 760 + (1 - kw) * 160, 3.2, '#1a1e3a'); }
  const td = wt('done', info, t, 11); nameTag(g, 'PART 2 SOON', 1700, 500, t, td, { size: 38, fill: alpha('#1a2050', 0.9), color: GOLDC });
  // the cast, curtain call
  const cast = [
    (x, y, o) => person(g, { x, y: y + 10, s: 1.85, facing: 1, outfit: YOU, pose: POSES.relaxed, expr: 'smile', look: [0.3, -0.2], ...o }),
    (x, y, o) => dog(g, { x, y, s: 1.75, facing: 1, t, wag: 1, eyes: 'happy', ...o }),
    (x, y, o) => cat(g, { x, y, s: 2.3, facing: -1, ...o }),
    (x, y, o) => crow(g, { x, y, s: 3.6, facing: -1, ...o }),
    (x, y, o) => pigeon(g, { x, y, s: 3.4, facing: -1, ...o }),
    (x, y, o) => squirrel(g, { x, y, s: 3.3, facing: -1, ...o }),
    (x, y, o) => prairieDog(g, { x, y, s: 3.2, facing: -1, ...o }),
  ];
  cast.forEach((fn, i) => { const k = ease.out(prog(t, 1.0 + i * 0.15, 1.5 + i * 0.15)); if (k <= 0) return; g.save(); g.globalAlpha *= k; fn(200 + i * 250, 1020 + (1 - k) * 40, { rim: { color: '#ffc8a0', dir: [0, -1] }, shadow: false }); g.restore(); });
} });
