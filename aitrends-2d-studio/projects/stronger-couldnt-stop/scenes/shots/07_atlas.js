// shots/07_atlas.js — the black van, Dr. Voss and Project Atlas; the steel room inside the mountain; the egg test
// (412 broken eggs, twice as careful every day) until you hold one for a whole minute.
import { E, V, S, registerShot, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake, rng, talkAmount } from '/engine/core.js';
import { drawFigure, POSES, breathe, walkPose, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { aptNight, van, mountain, steelRoom } from '../sets/atlas.js';
import { bed, crib } from '../sets/home.js';
import { YOU, VOSS, ATLAS } from '../cast.js';
import { heroFace, hand, chip, egg, carton, impact, dayBadge, wt, GOLD, CORAL, fmt, sunrise, atlasLogo, baby, cracks, palmUp } from '../lib.js';

const COLD = '#d8ecff', VOSS_LINE = [239.78, 245.14];

// your hand gripping an egg from the right; c 0..1 closes the fingers; s = 1 matches an egg drawn at scale 3.2
function grip(g, ex, ey, c, s = 1, o = {}) {
  const ink = S().ink, rimC = o.rim || COLD;
  g.save(); g.translate(ex, ey); g.scale(s * (o.flip ? -1 : 1), s);
  seg(g, [[250, 110], [760, 640]], 220, YOU.color); seg(g, [[250, 110], [300, 160]], 230, shade(YOU.color, -0.2));
  const parts = [[[[190, 30], [300, 150]], 160]];
  for (let i = 0; i < 4; i++) { const y0 = -96 + i * 56; parts.push([[[160, y0 + 14], [lerp(170, -40 + Math.abs(i - 1.5) * 22, c), y0]], 48]); }
  parts.push([[[160, 120], [lerp(175, 10, c), 152]], 54]);
  for (const [pts, w] of parts) seg(g, pts, w + 10, alpha(rimC, 0.85));
  for (const [pts, w] of parts) seg(g, pts, w, ink);
  g.restore();
}
// yolk + shell shrapnel flying out of a crushed egg
function splat(g, x, y, age, s = 1, seed = 1) {
  if (age < 0) return; const p = ease.out(clamp(age / 0.35)), r = rng(seed);
  for (let i = 0; i < 16; i++) { const a = r() * Math.PI * 2, d = (120 + r() * 420) * p * s, sz = (12 + r() * 28) * s;
    circle(g, x + Math.cos(a) * d, y + Math.sin(a) * d * 0.7 + 260 * age * age * s, sz * (1 - 0.3 * p), i % 4 ? '#f7c531' : '#ffb21a'); }
  for (let i = 0; i < 8; i++) { const a = r() * Math.PI * 2, d = (160 + r() * 360) * p * s; g.save(); g.translate(x + Math.cos(a) * d, y + Math.sin(a) * d * 0.7 + 300 * age * age * s); g.rotate(age * 8 + i);
    poly(g, [[-18 * s, -10 * s], [20 * s, -14 * s], [4 * s, 16 * s]], '#f3ead8'); g.restore(); }
}
// big framed counter
function counter(g, label, n, x, y, o = {}) {
  const col = o.color || CORAL(), w = o.w || 520; g.save(); g.globalAlpha *= clamp(o.k ?? 1);
  rr(g, x - w / 2, y - 74, w, 148, 26); g.fillStyle = 'rgba(10,12,24,.84)'; g.fill(); g.strokeStyle = alpha(col, 0.75); g.lineWidth = 3; g.stroke();
  text(g, label, x, y - 36, { size: 28, color: S().ui.cream, font: FONTS.ui, weight: 900, spacing: 3 });
  text(g, typeof n === 'number' ? fmt(n) : n, x, y + 22, { size: 76, color: col, font: FONTS.ui, weight: 900, glow: 16, glowColor: alpha(col, 0.6) });
  g.restore();
}
// close-up table top under the cold spotlight, steel room blurred behind
function insertBg(g, t, y = 0.66) {
  blurLayer(g, 16, (g) => steelRoom(g, t, { z: 1.6, x: -120, y: 200 }));
  const ty = E.H * y; g.fillStyle = linGrad(g, 0, ty, 0, E.H, ['#c4ccd6', '#7a828e']); g.fillRect(0, ty, E.W, E.H - ty);
  g.fillStyle = 'rgba(255,255,255,.4)'; g.fillRect(0, ty, E.W, 4); glow(g, E.W * 0.5, ty - 60, 760, COLD, 0.32);
}
// you on a stool at the steel table, hands resting on the top
function sitter(g, R, t, o = {}) {
  const x = R.TX - 300, s = 1.4, GY = R.GY;
  rr(g, x - 70, GY - 104, 130, 18, 6); g.fillStyle = '#5a606e'; g.fill(); seg(g, [[x - 50, GY - 90], [x - 58, GY]], 10, '#3a3e4a'); seg(g, [[x + 40, GY - 90], [x + 48, GY]], 10, '#3a3e4a');
  drawFigure(g, { x, y: GY, s, facing: 1, outfit: YOU, pose: { ...POSES.sit, eF: [40, -112], hF: [80, -110], eB: [34, -114], hB: [72, -112], ...(o.pose || {}) }, expr: o.expr || 'neutral', look: o.look || [1, 0.4], rim: { color: COLD, dir: [0.4, -1], w: 5 }, blink: (t % 2.9) > 2.76 });
}
// broken eggs lying on a surface
function shells(g, x0, x1, y, n, seed, s = 0.5) { const r = rng(seed); for (let i = 0; i < n; i++) egg(g, lerp(x0, x1, r()), y - r() * 10, s * (0.8 + r() * 0.4), { broken: 1 }); }
// a number that flips (split-flap) from a to b as p goes 0 → 1
function flipNum(g, a, b, x, y, p, o = {}) {
  const sz = o.size || 200, col = o.color || GOLD(), q = clamp(p), str = q < 0.5 ? a : b, sy = q < 0.5 ? 1 - q * 2 : q * 2 - 1;
  g.save(); g.translate(x, y); g.scale(1, Math.max(0.02, sy)); text(g, str, 0, 0, { size: sz, color: col, font: FONTS.ui, weight: 900, stroke: sz * 0.06, strokeColor: 'rgba(40,20,30,.85)', glow: 30, glowColor: alpha(GOLD(), 0.7) }); g.restore();
}

// s090 — "That night, a black van parks outside your building."  NIGHT street: the van rolls up, headlights
registerShot('s090', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.08 + 0.06 * ease.inOut(k), x: lerp(-40, 120, k), y: 60 };
  const { LANE, CX } = aptNight(g, t, cam);
  layer(g, cam, 1, (g) => van(g, lerp(CX - 1500, CX + 420, ease.out(prog(t, 0, 2.8))), LANE + 50, 1.15, { lights: true }));
  FX.dust(g, t, { count: 16, color: '#ffe7b0', a: 0.2, speed: 4 });
} });

// s091 — "Inside is a woman in a white coat."  the side door slides open: Dr. Voss in cold light
registerShot('s091', { draw(g, t, info) {
  const k = t / info.dur, d = ease.inOut(prog(t, 0.2, 1.1));
  blurLayer(g, 10, (g) => aptNight(g, t, { z: 1.4, x: 300, y: 60 }));
  van(g, E.W * 0.56, E.H * 0.98, 2.1 + 0.08 * k, { door: d, lights: false, inside: (g, x, y, w, h) =>
    drawFigure(g, { x: x + w * 0.5, y: y + h - 4, s: 1.0, facing: -1, outfit: VOSS, pose: breathe(POSES.holdFront, t), expr: 'neutral', look: [-1, 0.1], rim: { color: '#9fe0ff', dir: [-1, -0.3] }, blink: (t % 3) > 2.85 }) });
} });

// s092 — "Her badge says Project Atlas."  INSERT: the badge on her white coat
registerShot('s092', { draw(g, t, info) {
  const k = t / info.dur, z = 1 + 0.08 * ease.inOut(k);
  g.save(); g.translate(E.W / 2, E.H / 2); g.scale(z, z); g.translate(-E.W / 2, -E.H / 2);
  g.fillStyle = linGrad(g, 0, 0, E.W, E.H, ['#eef2f6', '#cdd6e0']); g.fillRect(-100, -100, E.W + 200, E.H + 200);
  poly(g, [[E.W * 0.08, -100], [E.W * 0.3, -100], [E.W * 0.2, E.H + 100], [E.W * 0.02, E.H + 100]], '#dfe6ee'); seg(g, [[E.W * 0.3, -100], [E.W * 0.2, E.H + 100]], 6, 'rgba(90,100,120,.25)');
  for (const lx of [E.W * 0.42, E.W * 0.58]) seg(g, [[lx, -100], [E.W * 0.5 + (lx - E.W / 2) * 0.2, E.H * 0.24]], 26, ATLAS);
  g.save(); g.translate(E.W * 0.5, E.H * 0.26); g.rotate(0.05 * Math.sin(t * 2.2));
  rr(g, -30, -20, 60, 50, 8); g.fillStyle = '#9aa0aa'; g.fill();
  rr(g, -320, 30, 640, 400, 26); g.fillStyle = '#ffffff'; g.fill(); g.strokeStyle = 'rgba(0,0,0,.12)'; g.lineWidth = 3; g.stroke();
  g.save(); rr(g, -320, 30, 640, 400, 26); g.clip(); g.fillStyle = ATLAS; g.fillRect(-320, 30, 640, 120); g.restore();
  atlasLogo(g, -230, 90, 0.9, '#ffffff'); text(g, 'PROJECT ATLAS', 40, 92, { size: 56, color: '#ffffff', font: FONTS.ui, weight: 900, spacing: 2 });
  rr(g, -280, 180, 170, 210, 12); g.fillStyle = '#cfe6ea'; g.fill(); bigFace(g, -195, 270, 62, { outfit: VOSS, expr: 'neutral', rimColor: '#ffffff' });
  text(g, 'DR. E. VOSS', -80, 220, { size: 44, color: '#1e2a36', font: FONTS.ui, weight: 900, align: 'left' }); text(g, 'DIRECTOR · LEVEL 5', -80, 272, { size: 28, color: '#5a6a7a', font: FONTS.ui, weight: 900, align: 'left', spacing: 1 });
  for (let i = 0; i < 26; i++) g.fillRect(-80 + i * 13, 320, i % 3 ? 5 : 9, 60);
  g.save(); g.globalCompositeOperation = 'lighter'; const sx = lerp(-700, 700, prog(t, 0.4, 2.2)); g.fillStyle = linGrad(g, sx - 120, 0, sx + 120, 0, [alpha('#ffffff', 0), alpha('#ffffff', 0.35), alpha('#ffffff', 0)]); g.beginPath(); rr(g, -320, 30, 640, 400, 26); g.clip(); g.fillRect(-320, 30, 640, 400); g.restore();
  g.restore(); g.restore();
  glow(g, E.W * 0.2, E.H * 0.1, 600, '#cfe8ff', 0.25);
} });

// s093 — VOSS: "We can't stop the doubling. Nobody can."  BIG FACE, cool light from the van
registerShot('s093', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => aptNight(g, t, { z: 1.5, x: -200, y: 40 })); veil(g, 'rgba(20,40,70,.2)');
  glow(g, E.W * 0.5, E.H * 0.45, 760, COLD, 0.35);
  const r = 320 * (1 + 0.04 * k), talk = talkAmount(info.globalT, ...VOSS_LINE);
  bigFace(g, E.W * 0.5, E.H * 0.62, r, { outfit: VOSS, expr: 'neutral', talk, rimColor: '#9fe0ff', rimSide: 1, look: [-0.2, 0], blink: (t % 3.4) > 3.25 });
  for (const sx of [-1, 1]) seg(g, [[E.W * 0.5 + sx * r * 0.42, E.H * 0.62 + r * 0.92], [E.W * 0.5 + sx * r * 0.12, E.H + 40]], 22, ATLAS);
} });

// s094 — "But we can teach you control."  TWO-SHOT: Voss at the van offers her hand; you on the steps
registerShot('s094', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.32 + 0.04 * k, x: 140, y: 130 };
  const { GY, CX, LANE, DOOR } = aptNight(g, t, cam), talk = talkAmount(info.globalT, ...VOSS_LINE);
  layer(g, cam, 1, (g) => { van(g, CX + 620, LANE + 50, 1.15, { door: 1, lights: true });
    drawFigure(g, { x: CX + 400, y: LANE + 64, s: 1.35, facing: -1, outfit: VOSS, pose: { ...POSES.reach, hF: [72, -150], eF: [40, -152] }, expr: 'neutral', talk, rim: { color: '#9fe0ff', dir: [1, -0.3] } });
    drawFigure(g, { x: DOOR + 170, y: GY - 58, s: 1.3, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'nervous', look: [1, 0.2], rim: { color: '#ffd28a', dir: [-1, -0.3] }, blink: (t % 2.4) > 2.28 }); });
} });

// s095 — "So you go with them."  you climb into the van, the door slides shut
registerShot('s095', { draw(g, t, info) {
  const cam = { z: 1.5, x: 330, y: 170 }, { CX, LANE } = aptNight(g, t, cam), d = 1 - ease.inOut(prog(t, 0.75, 1.45));
  layer(g, cam, 1, (g) => van(g, CX + 620, LANE + 50, 1.15, { door: d, lights: true, inside: (g, x, y, w, h) => {
    drawFigure(g, { x: x + w * 0.88, y: y + h - 4, s: 0.95, facing: -1, outfit: VOSS, pose: POSES.stand, expr: 'neutral', rim: { color: '#9fe0ff', dir: [-1, -0.3] } });
    drawFigure(g, { x: x + w * lerp(0.15, 0.5, ease.out(prog(t, 0, 0.8))), y: y + h - 4, s: 0.95, facing: 1, outfit: YOU, pose: walkPose(t * 7), expr: 'sad', look: [-1, 0], rim: { color: '#9fe0ff', dir: [1, -0.3] } }); } }));
} });

// s096 — "Not because you want to."  BIG FACE through the van window, streetlights sliding over the glass
registerShot('s096', { draw(g, t, info) {
  const k = t / info.dur; g.fillStyle = '#1c1f2a'; g.fillRect(0, 0, E.W, E.H); g.fillStyle = 'rgba(210,225,255,.2)'; g.fillRect(0, E.H * 0.12, E.W, 6);
  const wx = E.W * 0.17, wy = E.H * 0.16, ww = E.W * 0.66, wh = E.H * 0.66;
  g.save(); rr(g, wx, wy, ww, wh, 34); g.clip(); g.fillStyle = linGrad(g, 0, wy, 0, wy + wh, ['#22324e', '#34486a']); g.fillRect(wx, wy, ww, wh); glow(g, E.W * 0.5, E.H * 0.3, 700, COLD, 0.25);
  heroFace(g, E.W * 0.53, E.H * 0.64, 300 * (1 + 0.03 * k), { outfit: YOU, expr: 'sad', look: [-1, 0.05], rimColor: '#ffd28a', rimSide: -1 });
  g.save(); g.globalCompositeOperation = 'lighter'; for (let i = 0; i < 3; i++) { const x = wx + ww + 300 - ((t * 700 + i * 520) % (ww + 800)); g.fillStyle = linGrad(g, x - 140, 0, x + 140, 0, [alpha('#ffcf8a', 0), alpha('#ffcf8a', 0.28), alpha('#ffcf8a', 0)]); g.beginPath(); g.moveTo(x - 80, wy); g.lineTo(x + 140, wy); g.lineTo(x - 20, wy + wh); g.lineTo(x - 240, wy + wh); g.fill(); } g.restore();
  g.restore(); rr(g, wx, wy, ww, wh, 34); g.strokeStyle = '#0c0d12'; g.lineWidth = 18; g.stroke(); g.strokeStyle = 'rgba(210,225,255,.35)'; g.lineWidth = 3; g.stroke();
} });

// s097 — "Because Lily sleeps on the other side of your bedroom wall."  CUTAWAY: your room | one thin wall | Lily's nursery
registerShot('s097', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0 + 0.1 * ease.inOut(k), x: 0, y: -20 }, GY = E.H * 0.82, CX = E.W / 2;
  layer(g, cam, 0.15, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, E.H, ['#141a3a', '#2a2c5a', '#4a3a6a']); g.fillRect(-E.W, -E.H * 2, E.W * 3, E.H * 4); FX.stars(g, t, { count: 80, area: [-E.W, -E.H, E.W * 3, E.H * 1.2] }); FX.moon(g, CX + 700, 160, 34); });
  layer(g, cam, 1, (g) => {
    poly(g, [[CX - 920, GY - 640], [CX, GY - 860], [CX + 920, GY - 640]], '#4a3a4e'); g.fillStyle = '#5a4a5e'; g.fillRect(CX - 900, GY - 650, 1800, 700);
    rr(g, CX - 860, GY - 610, 836, 610, 6); g.fillStyle = '#3e4072'; g.fill(); rr(g, CX + 24, GY - 610, 836, 610, 6); g.fillStyle = '#8a5a7a'; g.fill();
    glow(g, CX + 700, GY - 120, 360, '#ffb8d0', 0.55); circle(g, CX + 700, GY - 120, 24, '#ffd8e6'); glow(g, CX - 450, GY - 500, 360, '#9fb0ff', 0.25);
    g.fillStyle = '#2e2430'; g.fillRect(CX - 24, GY - 610, 48, 610);
    g.fillStyle = '#3a2e34'; g.fillRect(CX - 900, GY, 1800, 50);
    bed(g, CX - 380, GY, 0.95, { sheet: '#5a7ac8' }); cracks(g, CX - 40, GY - 240, 150, ease.out(prog(t, 1.2, 2.6)), { seed: 7, color: 'rgba(20,16,24,.85)', w: 3, arms: 6, rings: 1 });
    const mt = crib(g, CX + 380, GY, 0.9, { t }); baby(g, CX + 380, mt - 4, 0.5, { expr: 'sleep' });
    text(g, 'YOU', CX - 760, GY - 560, { size: 34, color: alpha('#ffffff', 0.7), font: FONTS.ui, weight: 900, spacing: 4, align: 'left' }); text(g, 'LILY', CX + 760, GY - 560, { size: 34, color: alpha('#ffe2ee', 0.85), font: FONTS.ui, weight: 900, spacing: 4, align: 'right' });
    UI.callout(g, t, { at: [CX, GY - 430], to: [CX + 260, GY - 720], str: 'ONE THIN WALL', start: 1.6, color: GOLD() });
  });
  FX.dust(g, t, { count: 14, color: '#ffe2ee', a: 0.2, speed: 4 });
} });

// s098 — "Atlas puts you in a steel room,"  ESTABLISH: the mountain at dusk, the van rolls toward the lit tunnel
registerShot('s098', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0 + 0.07 * ease.inOut(k), x: lerp(-60, 60, k), y: 0 };
  const { GY, TX } = mountain(g, t, cam);
  layer(g, cam, 1, (g) => van(g, lerp(TX - 980, TX - 300, ease.inOut(k)), GY + 110, 0.42, { lights: true }));
} });

// s099 — "deep inside a mountain."  STEEL ROOM wide: tilt down from the ceiling to the table under the spotlight
registerShot('s099', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.02 + 0.04 * k, x: 0, y: lerp(-170, 0, ease.inOut(k)) };
  const R = steelRoom(g, t, cam, { voss: { expr: 'neutral' } });
  layer(g, cam, 1, (g) => carton(g, R.TX + 40, R.TY - 30, 0.9, 6));
} });

// s100 — "On the table, there's a box of eggs."  MEDIUM: you sit at the table, the egg carton under the light
registerShot('s100', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.6 + 0.05 * k, x: -230, y: 140 };
  const R = steelRoom(g, t, cam, { voss: { expr: 'neutral' } });
  layer(g, cam, 1, (g) => { carton(g, R.TX + 60, R.TY - 30, 1.0, 6, { rim: alpha(COLD, 0.6) }); sitter(g, R, t, { expr: 'nervous', look: [1, 0.6] }); });
} });

// s101 — "The test is simple."  OTS: past your shoulder, Dr. Voss behind the observation glass with a clipboard
registerShot('s101', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.9 + 0.05 * k, x: 1000, y: -400 };
  steelRoom(g, t, cam, { voss: { expr: 'neutral', look: [-0.6, 0.5] } });
  g.fillStyle = shade(YOU.color, -0.45); g.beginPath(); g.ellipse(E.W * 0.16, E.H * 1.12, 420, 300, 0, Math.PI, Math.PI * 2); g.fill();
  circle(g, E.W * 0.17, E.H * 0.8, 190, shade(YOU.color, -0.35)); circle(g, E.W * 0.17, E.H * 0.81, 158, S().ink);
  g.strokeStyle = alpha(COLD, 0.8); g.lineWidth = 6; g.beginPath(); g.arc(E.W * 0.17, E.H * 0.8, 192, -1.2, 0.2); g.stroke();
} });

// s102 — "Pick one up."  INSERT: your hand reaches down for an egg
registerShot('s102', { draw(g, t, info) {
  insertBg(g, t); carton(g, E.W * 0.5, E.H * 0.8, 2.2, 6, { rim: alpha(COLD, 0.6) });
  const p = ease.inOut(prog(t, 0, 1.25));
  hand(g, lerp(E.W * 0.86, E.W * 0.58, p), lerp(E.H * 0.12, E.H * 0.5, p), 1.4, { from: [E.W + 200, -300], sleeve: YOU.color, open: 1, rim: { color: COLD, dir: [-1, -0.3] } });
} });

// s103 — "Don't break it."  INSERT: fingers close around the egg
registerShot('s103', { draw(g, t, info) {
  insertBg(g, t, 0.74); const ex = E.W * 0.47, ey = E.H * 0.54, c = ease.inOut(prog(t, 0.1, 0.9));
  egg(g, ex, ey, 3.2, { crack: prog(t, 1.15, 1.7) * 0.5, rim: alpha(COLD, 0.8) }); grip(g, ex, ey, c, 1);
  chip(g, "DON'T BREAK IT", E.W * 0.5, E.H * 0.17, { size: 46, k: prog(t, 0.15, 0.45) });
} });

// s104 — "You break the first one."  INSERT: SPLAT
registerShot('s104', { draw(g, t, info) {
  const f = wt('break', info, t, 0.6), age = t - f, [sx, sy] = shake(t, age > 0 && age < 0.45 ? 22 : 0, 30);
  g.save(); g.translate(sx, sy); insertBg(g, t, 0.74); const ex = E.W * 0.47, ey = E.H * 0.54;
  if (age < 0) { egg(g, ex, ey, 3.2, { crack: clamp(t / f), rim: alpha(COLD, 0.8) }); grip(g, ex, ey, 1, 1); }
  else { egg(g, ex, ey + 120, 3.2, { broken: prog(age, 0, 0.35) }); grip(g, ex + 40, ey, 1.25, 1); splat(g, ex, ey, age, 1.4, 3); impact(g, ex, ey, age, { r: 360, color: '#ffe08a' }); }
  g.restore(); counter(g, 'EGGS BROKEN', age > 0 ? 1 : 0, E.W * 0.82, E.H * 0.2, { w: 380, k: prog(t, 0.1, 0.4) });
} });

// s105 — "And the second."  INSERT, from the other side: SPLAT again
registerShot('s105', { draw(g, t, info) {
  const f = 0.45, age = t - f, [sx, sy] = shake(t, age > 0 && age < 0.45 ? 22 : 0, 30);
  g.save(); g.translate(sx, sy); insertBg(g, t, 0.72); const ex = E.W * 0.55, ey = E.H * 0.52;
  if (age < 0) { egg(g, ex, ey, 3.0, { crack: clamp(t / f), rim: alpha(COLD, 0.8) }); grip(g, ex, ey, 1, 0.95, { flip: true }); }
  else { egg(g, ex, ey + 110, 3.0, { broken: prog(age, 0, 0.35) }); grip(g, ex - 40, ey, 1.25, 0.95, { flip: true }); splat(g, ex, ey, age, 1.4, 8); impact(g, ex, ey, age, { r: 340, color: '#ffe08a' }); }
  g.restore(); counter(g, 'EGGS BROKEN', age > 0 ? 2 : 1, E.W * 0.18, E.H * 0.2, { w: 380 });
} });

// s106 — "By the end of day ten, you've broken four hundred and twelve eggs."  WIDE: yolk everywhere, the counter rolls to 412
registerShot('s106', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.15 + 0.06 * k, x: -120, y: 90 };
  const R = steelRoom(g, t, cam, { voss: { expr: 'worried', look: [-0.6, 0.6] } });
  layer(g, cam, 1, (g) => { shells(g, R.CX - 980, R.CX + 700, R.GY + 60, 18, 11, 0.6); shells(g, R.TX - 200, R.TX + 260, R.TY - 6, 7, 12, 0.45);
    sitter(g, R, t, { expr: 'angry', look: [0.6, 0.8], pose: { head: [10, -176] } });
    for (let i = 0; i < 5; i++) { const r = rng(30 + i); circle(g, R.TX - 300 + r() * 120 - 40, R.GY - 220 + r() * 60, 10 + r() * 8, '#f7c531'); } });
  counter(g, 'EGGS BROKEN', Math.round(412 * ease.out(prog(t, 0.2, 3.6))), E.W * 0.5, E.H * 0.2, { k: prog(t, 0, 0.3) });
  dayBadge(g, { day: 10, k: 1 });
} });

// s107 — "Here's the problem."  BIG FACE: yolk on your face, frustrated
registerShot('s107', { draw(g, t, info) {
  const k = t / info.dur, cx = E.W * 0.5, cy = E.H * 0.6, r = 330 * (1 + 0.04 * k);
  blurLayer(g, 14, (g) => steelRoom(g, t, { z: 1.4, x: 200, y: -60 })); glow(g, cx, cy - 300, 700, COLD, 0.25);
  heroFace(g, cx, cy, r, { outfit: YOU, expr: 'angry', look: [0, 0.2], rimColor: COLD, rimSide: -1 });
  for (const [dx, dy, s] of [[-0.42, -0.62, 0.2], [0.5, 0.18, 0.14], [0.1, -0.85, 0.12]]) { g.fillStyle = '#f7c531'; g.beginPath(); g.ellipse(cx + dx * r, cy + dy * r, s * r, s * r * 0.7, 0.3, 0, Math.PI * 2); g.fill(); circle(g, cx + dx * r - s * r * 0.3, cy + dy * r - s * r * 0.2, s * r * 0.25, alpha('#fff6d0', 0.8)); }
  const d = (t * 0.6) % 1; g.fillStyle = '#f7c531'; g.beginPath(); g.ellipse(cx + 0.5 * r, cy + 0.32 * r + d * 120, 12, 18, 0, 0, Math.PI * 2); g.fill();
  g.save(); g.translate(cx - 0.2 * r, cy - 0.95 * r); g.rotate(-0.4); poly(g, [[-40, 0], [40, -10], [10, 30]], '#f3ead8'); g.restore();
} });

// s108 — "Every morning, you're twice as strong."  DATA: sunrise over the mountain, ×1,024 flips to ×2,048
registerShot('s108', { draw(g, t, info) {
  const k = t / info.dur; sunrise(g, ease.inOut(clamp(k * 1.4)));
  poly(g, [[-100, E.H], [-100, E.H * 0.78], [E.W * 0.3, E.H * 0.5], [E.W * 0.55, E.H * 0.62], [E.W * 0.8, E.H * 0.46], [E.W + 100, E.H * 0.7], [E.W + 100, E.H]], '#2a2440');
  veil(g, 'rgba(30,20,40,.22)'); const f = wt('twice', info, t, 1.4); flipNum(g, '×1,024', '×2,048', E.W * 0.5, E.H * 0.45, prog(t, f - 0.1, f + 0.3), { size: 210, color: '#ffffff' });
  text(g, t < f ? 'DAY 10' : 'DAY 11', E.W * 0.5, E.H * 0.24, { size: 58, color: '#ffffff', font: FONTS.ui, weight: 900, spacing: 6, stroke: 8, strokeColor: 'rgba(40,20,30,.8)' });
} });

// s109 — "So every morning, you have to be twice as careful."  DATA: two meters — STRENGTH ×2 then CAREFUL ×2
registerShot('s109', { draw(g, t, info) {
  UI.blueprint(g); const ui = S().ui, base = E.H * 0.8, f = wt('careful', info, t, 2.2);
  for (const [i, lab, col, at] of [[0, 'STRENGTH', CORAL(), 0.1], [1, 'CAREFUL', ATLAS, f - 0.3]]) {
    const x = E.W * (0.35 + i * 0.3), a = ease.out(prog(t, at, at + 0.3)), grow = ease.out(prog(t, at + 0.2, at + 0.9)), h = 220 + 300 * grow;
    if (a <= 0) continue; g.save(); g.globalAlpha *= a;
    rr(g, x - 110, base - 560, 220, 560, 20); g.fillStyle = alpha(col, 0.1); g.fill(); g.strokeStyle = alpha(col, 0.5); g.lineWidth = 3; g.stroke();
    rr(g, x - 90, base - h, 180, h - 20, 14); g.fillStyle = col; g.fill(); seg(g, [[x - 110, base - 240], [x + 110, base - 240]], 3, alpha(ui.cream, 0.5));
    text(g, lab, x, base + 50, { size: 44, color: ui.cream, font: FONTS.ui, weight: 900, spacing: 3 });
    text(g, '×2', x, base - h - 60, { size: 90, color: col, font: FONTS.ui, weight: 900, glow: 18, glowColor: alpha(col, 0.6), alpha: grow });
    g.restore(); }
} });

// s110 — "Twice as slow."  INSERT: your hand creeps toward the egg, ghost trail of slow motion
registerShot('s110', { draw(g, t, info) {
  insertBg(g, t); carton(g, E.W * 0.5, E.H * 0.8, 2.2, 6, { rim: alpha(COLD, 0.6) });
  for (let i = 3; i >= 0; i--) { const p = ease.inOut(prog(t - i * 0.18, 0, 3.4)); g.save(); g.globalAlpha *= i ? 0.18 : 1;
    hand(g, lerp(E.W * 0.8, E.W * 0.6, p), lerp(E.H * 0.18, E.H * 0.44, p), 1.4, { from: [E.W + 200, -300], sleeve: YOU.color, open: 1, rim: i ? null : { color: COLD, dir: [-1, -0.3] } }); g.restore(); }
  UI.badge(g, { str: '½ SPEED', color: ATLAS, x: E.W - 80, y: E.H * 0.18 });
} });

// s111 — "Twice as gentle."  INSERT: a feather balanced on your fingertip
registerShot('s111', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 16, (g) => steelRoom(g, t, { z: 1.5, x: 300, y: -100 })); glow(g, E.W * 0.5, E.H * 0.35, 600, '#fff2d8', 0.35);
  const fx = E.W * 0.5, fy = E.H * 0.47, ink = S().ink;
  seg(g, [[fx + 60, fy + 260], [fx + 200, E.H + 120]], 200, YOU.color);
  for (const [w, c] of [[10, alpha(COLD, 0.85)], [0, ink]]) { circle(g, fx + 40, fy + 220, 110 + w / 2, c); seg(g, [[fx + 10, fy + 150], [fx, fy]], 44 + w, c); seg(g, [[fx + 120, fy + 190], [fx + 40, fy + 120]], 46 + w, c); }
  const a = 0.08 * Math.sin(t * 2.3); g.save(); g.translate(fx, fy - 30); g.rotate(a);
  seg(g, [[-280, 10], [280, -10]], 6, '#e8dcc8'); for (let i = 0; i < 26; i++) { const x = -260 + i * 20, L = 70 * Math.sin(Math.PI * (i + 1) / 27); seg(g, [[x, 0], [x + 26, -L]], 5, alpha('#fff6ea', 0.9)); seg(g, [[x, 0], [x + 26, L * 0.8]], 5, alpha('#f2e6d6', 0.85)); }
  g.restore(); glow(g, fx, fy - 30, 260, '#fff6ea', 0.3 + 0.1 * Math.sin(t * 3));
  chip(g, 'GENTLE ×2', E.W * 0.5, E.H * 0.16, { size: 40, k: prog(t, 0.2, 0.5) });
} });

// s112 — "Just to stay where you are."  METAPHOR: you sprint on a treadmill labelled ×2 / DAY and don't move
registerShot('s112', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 10, (g) => steelRoom(g, t, { z: 1.2, x: 0, y: 0 }, { table: false })); veil(g, 'rgba(20,24,40,.15)');
  const cx = E.W * 0.47, base = E.H * 0.8, ink = S().ink;
  g.fillStyle = 'rgba(0,0,0,.3)'; g.beginPath(); g.ellipse(cx, base + 20, 520, 30, 0, 0, Math.PI * 2); g.fill();
  rr(g, cx - 460, base - 60, 920, 70, 30); g.fillStyle = '#2a2e3a'; g.fill();
  g.save(); rr(g, cx - 440, base - 62, 880, 22, 10); g.clip(); g.fillStyle = '#4a4e5e'; g.fillRect(cx - 440, base - 62, 880, 22); for (let i = 0; i < 16; i++) { const x = cx - 440 + (((i * 70 - t * 1600) % 1120) + 1120) % 1120; g.fillStyle = '#6a7080'; g.fillRect(x, base - 62, 12, 22); } g.restore();
  seg(g, [[cx + 420, base - 50], [cx + 360, base - 430]], 22, '#3a3e4a'); rr(g, cx + 240, base - 520, 260, 120, 16); g.fillStyle = '#1a1e2a'; g.fill();
  text(g, '×2 / DAY', cx + 370, base - 460, { size: 46, color: CORAL(), font: FONTS.ui, weight: 900, glow: 16, glowColor: alpha(CORAL(), 0.6) });
  FX.speedLines(g, t, { cx: cx - 600, cy: base - 220, count: 14, a: 0.12, inner: 200 });
  drawFigure(g, { x: cx - 60, y: base - 62, s: 2.0, facing: 1, outfit: YOU, pose: walkPose(t * Math.PI * 2 * 2.2, { run: true }), expr: 'determined', rim: { color: COLD, dir: [-0.6, -0.6], w: 6 } });
} });

// s113 — "Day eleven, you break ninety eggs."  MEDIUM: fewer shells on the table
registerShot('s113', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.65 + 0.05 * k, x: -200, y: 150 };
  const R = steelRoom(g, t, cam, { voss: { expr: 'neutral' } });
  layer(g, cam, 1, (g) => { shells(g, R.TX - 200, R.TX + 260, R.TY - 6, 9, 21, 0.45); carton(g, R.TX + 160, R.TY - 30, 0.9, 4); sitter(g, R, t, { expr: 'determined', look: [1, 0.6] }); });
  counter(g, 'EGGS BROKEN', 90, E.W * 0.5, E.H * 0.18, { k: prog(t, 0.6, 0.9) }); dayBadge(g, { day: 11, k: prog(t, 0, 0.3) });
} });

// s114 — "Day twelve, nine."  MEDIUM: only a few shells
registerShot('s114', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.75 + 0.05 * k, x: -140, y: 160 };
  const R = steelRoom(g, t, cam, { voss: { expr: 'happy' } });
  layer(g, cam, 1, (g) => { shells(g, R.TX - 120, R.TX + 120, R.TY - 6, 2, 31, 0.45); carton(g, R.TX + 160, R.TY - 30, 0.9, 5); sitter(g, R, t, { expr: 'determined', look: [1, 0.7], pose: { hF: [96, -112], eF: [52, -114] } }); });
  counter(g, 'EGGS BROKEN', 9, E.W * 0.5, E.H * 0.18, { k: prog(t, 0.6, 0.9), color: GOLD() }); dayBadge(g, { day: 12, k: prog(t, 0, 0.3) });
} });

// s115 — "Day thirteen, you pick one up..."  CLOSE: slow, tense lift, a trembling hand
registerShot('s115', { draw(g, t, info) {
  const k = t / info.dur, up = ease.inOut(prog(t, 0.4, 3.0)), [jx, jy] = shake(t, 3, 14);
  insertBg(g, t, 0.76); const ex = E.W * 0.47 + jx, ey = lerp(E.H * 0.62, E.H * 0.46, up) + jy;
  egg(g, ex, ey, 3.0, { rim: alpha(COLD, 0.8) }); grip(g, ex, ey, 0.82, 0.94);
  for (let i = 0; i < 2; i++) { const d = ((t * 0.5 + i * 0.5) % 1); g.fillStyle = alpha('#cfe8ff', 0.85 * (1 - d)); g.beginPath(); g.ellipse(ex + 220 + i * 50, ey - 40 + d * 160, 9, 14, 0, 0, Math.PI * 2); g.fill(); }
  dayBadge(g, { day: 13, k: prog(t, 0, 0.3) });
} });

// s116 — "and you hold it."  INSERT: the egg resting whole on your open palm, gold glow
registerShot('s116', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 16, (g) => steelRoom(g, t, { z: 1.5, x: -100, y: 120 })); glow(g, E.W * 0.5, E.H * 0.42, 560, GOLD(), 0.35 + 0.1 * Math.sin(t * 3));
  palmUp(g, E.W * 0.5, E.H * 0.6, 1, { sleeve: YOU.color });
  egg(g, E.W * 0.5, E.H * 0.45 + 4 * Math.sin(t * 2), 2.4, { rim: alpha('#ffe2a8', 0.9), glowC: GOLD() });
  for (let i = 0; i < 5; i++) FX.sparkle(g, E.W * 0.36 + i * 70, E.H * 0.28 + 30 * Math.sin(t * 2 + i), 14, '#ffe2a8', 0.6);
} });

// s117 — "For one whole minute."  the stopwatch sweeps to 1:00; Voss raises her eyebrows behind the glass
registerShot('s117', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.8 + 0.05 * k, x: 1000, y: -380 };
  steelRoom(g, t, cam, { voss: { expr: t > 1.4 ? 'surprised' : 'neutral', look: [-0.6, 0.4] } });
  const s = Math.round(60 * ease.inOut(prog(t, 0.05, 1.7))), cx = E.W * 0.2, cy = E.H * 0.52;
  circle(g, cx, cy, 190, 'rgba(10,12,24,.85)'); ring(g, cx, cy, 190, 8, GOLD()); g.save(); g.lineCap = 'round'; g.strokeStyle = GOLD(); g.lineWidth = 16; g.beginPath(); g.arc(cx, cy, 160, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * s / 60); g.stroke(); g.restore();
  seg(g, [[cx, cy], [cx + Math.sin(Math.PI * 2 * s / 60) * 130, cy - Math.cos(Math.PI * 2 * s / 60) * 130]], 8, S().ui.cream);
  text(g, `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`, cx, cy + 260, { size: 70, color: GOLD(), font: FONTS.ui, weight: 900, glow: 16, glowColor: alpha(GOLD(), 0.6) });
} });

// s118 — "It's the hardest thing you've ever done."  BIG FACE: sweat, a small relieved smile, the egg safe in your fingers
registerShot('s118', { draw(g, t, info) {
  const k = t / info.dur, cx = E.W * 0.42, cy = E.H * 0.58, r = 300 * (1 + 0.04 * k);
  blurLayer(g, 14, (g) => steelRoom(g, t, { z: 1.4, x: -200, y: -40 })); glow(g, cx, cy - 260, 700, COLD, 0.25);
  heroFace(g, cx, cy, r, { outfit: YOU, expr: t > 1.2 ? 'smile' : 'worried', look: [0.6, 0.3], rimColor: '#ffe2a8', rimSide: 1, blink: (t % 2.6) > 2.48 });
  for (const [dx, dy, ph] of [[-0.62, -0.5, 0], [0.66, -0.36, 0.4], [-0.2, -0.82, 0.7]]) { const d = (t * 0.4 + ph) % 1; g.fillStyle = alpha('#d8f0ff', 0.9 * (1 - d * 0.6)); g.beginPath(); g.ellipse(cx + dx * r, cy + dy * r + d * 60, 10, 16, 0, 0, Math.PI * 2); g.fill(); }
  glow(g, E.W * 0.76, E.H * 0.6, 260, GOLD(), 0.35); egg(g, E.W * 0.76, E.H * 0.6, 1.7, { rim: alpha('#ffe2a8', 0.9) }); grip(g, E.W * 0.76, E.H * 0.6, 0.8, 0.53, { rim: '#ffe2a8' });
  dayBadge(g, { day: 13, k: 1 });
} });
