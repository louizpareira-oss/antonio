// shots/11_twist.js — day twenty: a million times stronger in a cracking steel room; mom calls — Lily pulled the bars off
// her crib, and this morning she was twice as strong as yesterday. End screen: the question, subscribe, Part 2.
import { E, V, S, registerShot, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake, rng, talkAmount } from '/engine/core.js';
import { drawFigure, POSES, breathe, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { steelRoom } from '../sets/atlas.js';
import { nursery, crib } from '../sets/home.js';
import { YOU, DAD, MOM, VOSS, FIRE, LILY_PINK, ATLAS } from '../cast.js';
import { heroFace, chip, dayBadge, wt, GOLD, CORAL, fmt, baby } from '../lib.js';

const COLD = '#d8ecff', MOM_LINE = [451.06, 454.9];
const SIT = { ...POSES.sit, hF: [40, -86], hB: [34, -84], head: [4, -180] };
// the steel room at night, walls cracked
function cell(g, t, cam, cr) { const R = steelRoom(g, t, cam, { bed: true, table: false, cracks: cr, wall: '#6e7890' }); veil(g, 'rgba(20,24,60,.18)'); return R; }
// a phone in a thick steel case, screen up; x,y centre; o.buzz shakes it
function steelPhone(g, x, y, s, t, o = {}) {
  const [bx, by] = o.buzz ? shake(t, 6, 40) : [0, 0]; g.save(); g.translate(x + bx, y + by); g.scale(s, s);
  rr(g, -150, -270, 300, 540, 46); g.fillStyle = '#5a606e'; g.fill(); g.strokeStyle = '#2a2e3a'; g.lineWidth = 8; g.stroke();
  for (const [cx, cy] of [[-118, -238], [118, -238], [-118, 238], [118, 238]]) { circle(g, cx, cy, 12, '#3a3e4a'); circle(g, cx - 3, cy - 3, 5, '#9aa2b0'); }
  rr(g, -116, -220, 232, 440, 22); g.fillStyle = '#10141e'; g.fill();
  if (o.screen) { g.save(); rr(g, -116, -220, 232, 440, 22); g.clip(); o.screen(g); g.restore(); }
  g.restore();
}
function callScreen(g, t) {
  g.fillStyle = linGrad(g, 0, -220, 0, 220, ['#2a6a4a', '#14301e']); g.fillRect(-116, -220, 232, 440);
  text(g, 'INCOMING CALL', 0, -170, { size: 18, color: alpha('#ffffff', 0.7), font: FONTS.ui, weight: 900, spacing: 2 });
  bigFace(g, 0, -60, 50, { outfit: MOM, expr: 'smile', rimColor: '#ffffff' }); text(g, 'MOM', 0, 40, { size: 48, color: '#ffffff', font: FONTS.ui, weight: 900 });
  for (const [cx, c] of [[-56, '#e04a3a'], [56, '#3fc16a']]) { circle(g, cx, 150, 30, c); if (c === '#3fc16a') ring(g, cx, 150, 30 + 16 * ((t * 1.5) % 1), 4, alpha(c, 1 - ((t * 1.5) % 1))); }
}

// s168 — "Day twenty."  STEEL ROOM night: you sit very still
registerShot('s168', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.45 + 0.05 * k, x: -440, y: 130 }, R = cell(g, t, cam, 0.5);
  layer(g, cam, 1, (g) => drawFigure(g, { x: R.CX - 600, y: R.GY + 12, s: 1.5, facing: 1, outfit: YOU, pose: SIT, expr: 'neutral', look: [1, 0], rim: { color: COLD, dir: [0.4, -1], w: 5 } }));
  dayBadge(g, { day: 20, k: prog(t, 0, 0.3), danger: true });
} });

// s169 — "You're a million times stronger than the day it started."  WIDE: the walls are covered in hairline cracks; ×1,048,576
registerShot('s169', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0 + 0.06 * ease.inOut(k), x: -120, y: 40 }, R = cell(g, t, cam, ease.out(prog(t, 0, 3)) * 0.5 + 0.5);
  layer(g, cam, 1, (g) => drawFigure(g, { x: R.CX - 600, y: R.GY + 12, s: 1.5, facing: 1, outfit: YOU, pose: SIT, expr: 'sad', look: [0.6, -0.3], rim: { color: COLD, dir: [0.4, -1], w: 5 } }));
  const n = Math.round(1048576 * ease.out(prog(t, 0.2, 2.6))); text(g, '×' + fmt(n), E.W * 0.56, E.H * 0.3, { size: 150, color: '#ffffff', font: FONTS.ui, weight: 900, stroke: 10, strokeColor: 'rgba(60,20,20,.85)', glow: 34, glowColor: alpha(CORAL(), 0.8) });
  dayBadge(g, { day: 20, k: 1, danger: true });
} });

// s170 — "Your phone rings."  INSERT: a steel-armoured phone buzzes on the steel table
registerShot('s170', { draw(g, t, info) {
  blurLayer(g, 16, (g) => cell(g, t, { z: 1.6, x: -300, y: 200 }, 0.8)); g.fillStyle = linGrad(g, 0, E.H * 0.7, 0, E.H, ['#a8b0bc', '#6a7280']); g.fillRect(0, E.H * 0.7, E.W, E.H * 0.3);
  glow(g, E.W * 0.5, E.H * 0.5, 500, '#5fd38a', 0.3 + 0.2 * Math.sin(t * 20));
  g.save(); g.translate(E.W * 0.5, E.H * 0.56); g.rotate(-0.2); steelPhone(g, 0, 0, 0.95, t, { buzz: true, screen: (g) => callScreen(g, t) }); g.restore();
  for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) { const x = E.W * 0.5 + sx * (230 + i * 40); seg(g, [[x, E.H * 0.36 + i * 12], [x + sx * 20, E.H * 0.44], [x, E.H * 0.52 - i * 12]], 6, alpha('#ffffff', 0.6 - i * 0.15)); }
} });

// s171 — "It's your mom."  INSERT: the screen — caller ID MOM
registerShot('s171', { draw(g, t, info) {
  const k = t / info.dur; g.fillStyle = '#10141e'; g.fillRect(0, 0, E.W, E.H); glow(g, E.W * 0.5, E.H * 0.5, 800, '#3fc16a', 0.25);
  g.save(); g.translate(E.W * 0.5, E.H * 0.52); const s = 2.1 + 0.08 * k; g.scale(s, s); rr(g, -116, -220, 232, 440, 22); g.clip(); callScreen(g, t); g.restore();
} });

// s172 — "Her voice is shaking."  BIG FACE: you listen, worried, the phone at your ear; a shaky voice wave
registerShot('s172', { draw(g, t, info) {
  const k = t / info.dur, cx = E.W * 0.44, cy = E.H * 0.6, r = 320 * (1 + 0.04 * k);
  blurLayer(g, 14, (g) => cell(g, t, { z: 1.4, x: -200, y: -40 }, 1)); glow(g, cx, cy - 200, 700, COLD, 0.25);
  heroFace(g, cx, cy, r, { outfit: YOU, expr: 'worried', look: [0.3, 0.3], rimColor: COLD, rimSide: 1 });
  g.save(); g.translate(cx + r * 1.02, cy - r * 0.05); g.rotate(0.15); rr(g, -50, -150, 100, 300, 24); g.fillStyle = '#5a606e'; g.fill(); g.restore(); circle(g, cx + r * 1.1, cy + r * 0.3, 70, S().ink);
  const wx = E.W * 0.8, wy = E.H * 0.26; g.strokeStyle = alpha('#9fe0ff', 0.9); g.lineWidth = 5; g.beginPath(); for (let i = 0; i <= 60; i++) { const x = wx - 220 + i * 7.5, a = Math.sin(i * 0.5 + t * 14) * Math.sin(i / 60 * Math.PI) * (40 + 30 * Math.sin(t * 23 + i)); g.lineTo(x, wy + a); } g.stroke();
  text(g, 'MOM', wx, wy - 90, { size: 40, color: '#9fe0ff', font: FONTS.ui, weight: 900, spacing: 3 });
} });

// s173 — MOM: "It's Lily. She pulled the bars off her crib."  NURSERY night: bars bent off, mom in the doorway on the phone
registerShot('s173', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.12 + 0.05 * k, x: lerp(40, -40, k), y: 40 }, { GY, CX } = nursery(g, t, cam, { night: true }), talk = talkAmount(info.globalT, ...MOM_LINE);
  layer(g, cam, 1, (g) => { const mt = crib(g, CX + 220, GY, 1.05, { bent: 1, t }); baby(g, CX + 220, mt - 6, 0.55, { expr: 'giggle', glint: 0.5 });
    for (let i = 0; i < 3; i++) { g.save(); g.translate(CX - 40 + i * 70, GY - 6); g.rotate(1.5 + i * 0.15); g.strokeStyle = '#f2ebe0'; g.lineWidth = 10; g.lineCap = 'round'; g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(40, -60, 10, -200); g.stroke(); g.restore(); }
    rr(g, CX - 860, GY - 640, 300, 640, 4); g.fillStyle = '#e8d8b0'; g.fill(); glow(g, CX - 710, GY - 320, 360, '#ffe2a8', 0.4);
    drawFigure(g, { x: CX - 700, y: GY, s: 1.35, facing: 1, outfit: MOM, pose: POSES.phone, expr: 'scared', talk, look: [1, 0.3], rim: { color: '#ffe2a8', dir: [1, -0.3], w: 5 } }); });
  FX.dust(g, t, { count: 14, color: '#ffe2ee', a: 0.2, speed: 4 });
} });

// s174 — "Lily is eleven days old."  CLOSE: Lily grips a bent crib bar; 11 DAYS OLD
registerShot('s174', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 14, (g) => nursery(g, t, { z: 1.5, x: 300, y: 60 }, { night: true })); glow(g, E.W * 0.5, E.H * 0.5, 700, '#ffb8d0', 0.3);
  const s = 2.3 + 0.08 * k, bx = E.W * 0.55, by = E.H * 0.62; g.save(); g.translate(bx + (-18 - 2) * s, by + (-96) * s); g.rotate(-0.3); g.strokeStyle = '#f2ebe0'; g.lineWidth = 26; g.lineCap = 'round'; g.beginPath(); g.moveTo(-260, 120); g.quadraticCurveTo(0, -60, 60, -320); g.stroke(); g.strokeStyle = alpha('#ffffff', 0.6); g.lineWidth = 6; g.beginPath(); g.moveTo(-250, 106); g.quadraticCurveTo(-6, -60, 48, -310); g.stroke(); g.restore();
  baby(g, bx, by, s, { expr: 'smile', hand: -1.2, rim: alpha('#ffe2ee', 0.8) });
  chip(g, '11 DAYS OLD', E.W * 0.5, E.H * 0.16, { size: 50, k: prog(t, 0.3, 0.6) });
} });

// s175 — "And this morning, she was twice as strong as yesterday."  CLOSE: Lily giggles, gold glint in her eyes; LILY ×2
registerShot('s175', { draw(g, t, info) {
  const k = t / info.dur, f = wt('twice', info, t, 2.8); blurLayer(g, 14, (g) => nursery(g, t, { z: 1.5, x: 300, y: 60 }, { night: true })); glow(g, E.W * 0.45, E.H * 0.5, 800, GOLD(), 0.15 + 0.2 * ease.out(prog(t, f, f + 0.6)));
  const s = 2.8 + 0.25 * ease.inOut(k); baby(g, E.W * 0.55, E.H * 0.62, s, { expr: 'giggle', glint: ease.out(prog(t, f, f + 0.5)), rim: alpha('#ffe2a8', 0.85) });
  dayBadge(g, { label: 'LILY', value: t > f ? 2 : 1, k: prog(t, 0.2, 0.5), danger: true });
  if (t > f) FX.rings(g, E.W * 0.55 - 92 * s * 0.6, E.H * 0.62 - 28 * s, t - f, { count: 2, r0: 60, r1: 260, color: GOLD(), a: 0.4 });
} });

// s176 — END SCREEN: "What would YOU do if your strength doubled every day? Tell us in the comments. And subscribe, because Part 2 is coming."
registerShot('s176', { draw(g, t, info) {
  UI.endScreen(g, t, { question: 'What would YOU do if your strength doubled every day?', cast: [YOU, MOM, DAD, VOSS, FIRE], moodColors: ['#1a1430', '#2e2048', '#5a3050'], rim: '#ffd28a' });
  const p = ease.outBack(prog(t, wt('Part', info, t, 9) - 0.3, wt('Part', info, t, 9) + 0.2)); if (p > 0) { g.save(); g.translate(E.W * 0.5, E.H * 0.5); g.scale(p, p);
    rr(g, -240, -70, 480, 140, 70); g.fillStyle = alpha(GOLD(), 0.15); g.fill(); g.strokeStyle = GOLD(); g.lineWidth = 4; g.stroke(); text(g, 'PART 2', 0, 4, { size: 86, color: GOLD(), font: FONTS.ui, weight: 900, glow: 24, glowColor: alpha(GOLD(), 0.7), spacing: 4 }); g.restore(); }
  baby(g, E.W * 0.86, E.H * 0.5, 0.9, { expr: 'giggle', glint: 0.6 + 0.3 * Math.sin(t * 3), rim: alpha('#ffe2a8', 0.8) });
} });
