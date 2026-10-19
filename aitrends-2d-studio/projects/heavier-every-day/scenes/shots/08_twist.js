// shots/08_twist.js — day 20 in orbit: heavier than the Titanic, floating like Grandpa taught you… then the pen drifts over
// and lands on your chest. It's falling toward you. Still circling the Earth every 92 minutes; by day 53 you'll pull on the
// oceans harder than the Moon. End screen + PART 2.
import { E, V, S, registerShot, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake, rng } from '/engine/core.js';
import { drawFigure, POSES } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { capsule, orbit } from '../sets/world.js';
import { floatShot } from '../space.js';
import { ladder } from '../ladder.js';
import { YOU, KIDYOU, MOM, VOSS, GRANDPA, FRIEND } from '../cast.js';
import { heroFace, chip, wt, GOLD, CORAL, weightBadge, arrow, label } from '../lib.js';

const COLD = '#cfe8ff';
const STAR = { ...POSES.relaxed, hF: [96, -200], eF: [50, -190], hB: [-96, -200], eB: [-50, -190], fF: [40, 0], fB: [-40, 0] };
// your chest while you float flat in the capsule (matches floatShot with float 1, lie 1)
const chestAt = (C, t) => [C.CX - 200 - 108, C.CY - 102 - 30 + 12 * Math.sin(t * 1.5)];
function pen(g, x, y, ang, s = 1) { g.save(); g.translate(x, y); g.rotate(ang); g.scale(s, s); glow(g, 0, 0, 90, '#fff2c8', 0.35); rr(g, -60, -8, 120, 16, 8); g.fillStyle = '#F2C21A'; g.fill(); g.strokeStyle = '#14161e'; g.lineWidth = 2; g.stroke(); poly(g, [[60, -8], [82, 0], [60, 8]], '#f2e6c8'); circle(g, 82, 0, 2.5, '#14161e'); g.fillStyle = '#c8ccd6'; g.fillRect(-60, -8, 18, 16); seg(g, [[-50, -8], [-10, -14]], 4, '#c8ccd6'); g.restore(); }
// drifting loose things in the capsule (cup, crumbs, sock) — p 0..1 pulls them toward (tx, ty)
function looseThings(g, t, tx, ty, p) {
  const items = [[1500, 200, 'cup'], [1300, 760, 'sock'], [1700, 520, 'crumb'], [1100, 140, 'crumb'], [1600, 880, 'crumb']];
  items.forEach(([x0, y0, kind], i) => { const x = lerp(x0, tx + 60 + i * 20, p * 0.55), y = lerp(y0, ty, p * 0.55) + 6 * Math.sin(t * 2 + i);
    if (kind === 'cup') { rr(g, x - 26, y - 34, 52, 64, 10); g.fillStyle = '#f4f2ee'; g.fill(); } else if (kind === 'sock') { rr(g, x - 20, y - 50, 40, 80, 16); g.fillStyle = '#D64A33'; g.fill(); } else circle(g, x, y, 9, '#c8a070');
    arrow(g, [x - 40, y], [x - 40 + (tx - x) * 0.18, y + (ty - y) * 0.18], GOLD(), 6, prog(t, 0.2 + i * 0.1, 0.6 + i * 0.1)); });
}

// s156 — "Heavier than the Titanic."
registerShot('s156', { draw(g, t, info) { ladder(g, t, info, 20, 'titanic', { label: 'THE TITANIC', win: true, s: 0.75, L: 1700, z: 0.92, camY: -40 }); } });
// s157 — "You're floating, arms spread, just like Grandpa taught you."  floating flat, arms spread; the memory glows in
registerShot('s157', { draw(g, t, info) {
  floatShot(g, t, info, { float: 1, lie: 1, spread: 1, expr: 'smile', look: [0.4, -0.6] });
  const a = prog(t, 1.4, 2.2) * (1 - prog(t, 4.2, 5.0)); if (a > 0) { const cx = E.W * 0.76, cy = E.H * 0.7, r = 170 * ease.outBack(Math.min(1, a * 1.4)); g.save(); g.globalAlpha *= clamp(a * 2); g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.clip(); g.fillStyle = '#8ab8c8'; g.fillRect(cx - r, cy - r, r * 2, r * 2);
    drawFigure(g, { x: cx, y: cy + 100, s: 0.95, facing: 1, outfit: KIDYOU, pose: { ...STAR, kF: [24, -50], kB: [-24, -50] }, expr: 'joy', shadow: false }); veil(g, '#808080', 0.6, 'saturation'); veil(g, '#ffc88a', 0.4, 'multiply'); g.restore(); g.save(); g.globalAlpha *= clamp(a * 2); ring(g, cx, cy, r, 8, '#f4ede0'); g.restore(); }
  weightBadge(g, { day: 20, k: 1 });
} });
// s158 — "Then your pen drifts across the capsule…"
registerShot('s158', { draw(g, t, info) {
  const { C, cam } = floatShot(g, t, info, { float: 1, lie: 1, spread: 1, expr: 'smile', look: [1, -0.3] }), [cx, cy] = chestAt(C, t), p = ease.inOut(prog(t, 0, info.dur + 2.2));
  layer(g, cam, 0.9, (g) => pen(g, lerp(C.CX + 520, cx, p), lerp(C.CY - 330, cy - 10, p), -0.4 + t * 0.6, 1.3));
  weightBadge(g, { day: 20, k: 1 });
} });
// s159 — "…and stops on your chest."  CLOSE: the pen settles on your chest
registerShot('s159', { draw(g, t, info) {
  const cam = { z: 2.5 + 0.08 * t / info.dur, x: -420, y: -60 }, { C } = floatShot(g, t, info, { float: 1, lie: 1, spread: 1, expr: 'neutral', look: [0.6, 0.6], cam }), [cx, cy] = chestAt(C, t), p = ease.out(prog(t, 0, 1.2));
  layer(g, cam, 0.9, (g) => pen(g, lerp(cx + 200, cx, p), lerp(cy - 160, cy - 10, p) - (p >= 1 ? 6 * Math.abs(Math.sin((t - 1.2) * 12)) * Math.exp(-(t - 1.2) * 6) : 0), lerp(0.4, 0.05, p), 1.3));
} });
// s160 — "It isn't floating anymore."  BIG FACE: you stare down at the pen
registerShot('s160', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => capsule(g, t, { z: 1.5, x: 200, y: 0 }, {})); glow(g, E.W * 0.7, E.H * 0.3, 700, COLD, 0.35);
  heroFace(g, E.W * 0.5, E.H * 0.52, 290 * (1 + 0.05 * k), { outfit: YOU, expr: 'confused', look: [-0.3, 0.9], rimColor: COLD, rimSide: 1 }); pen(g, E.W * 0.47, E.H * 0.96, 0.08, 2.4);
} });
// s161 — "It's falling."  everything loose in the capsule drifts toward you
registerShot('s161', { draw(g, t, info) {
  const { C, cam } = floatShot(g, t, info, { float: 1, lie: 1, spread: 1, expr: 'surprised', look: [1, 0] }), [cx, cy] = chestAt(C, t);
  layer(g, cam, 0.9, (g) => { pen(g, cx, cy - 10, 0.05, 1.3); looseThings(g, t, cx, cy, prog(t, 0, info.dur)); });
  label(g, 'FALLING TOWARD YOU', E.W / 2, E.H * 0.17, { size: 52, color: GOLD(), a: prog(t, 0.3, 0.6) });
} });
// s162 — "Toward you."  BIG FACE: eyes wide
registerShot('s162', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => capsule(g, t, { z: 1.6, x: 260, y: 40 }, {})); glow(g, E.W * 0.7, E.H * 0.3, 700, COLD, 0.35);
  heroFace(g, E.W * 0.5, E.H * 0.55, 320 * (1 + 0.08 * k), { outfit: YOU, expr: 'shocked', look: [0, 0], rimColor: COLD, rimSide: 1 });
} });
// s163 — "You left the Earth to keep it safe."  ORBIT: the tiny capsule over the huge blue Earth
registerShot('s163', { draw(g, t, info) { orbit(g, t, { z: 1.0 + 0.03 * t, x: 0, y: 0 }, { cap: [E.W * 0.3 + 25 * t, E.H * 0.24], capS: 0.55, earthTop: 560 }); weightBadge(g, { day: 20, k: 1 }); } });
// s164 — "But you're still going around it, every ninety minutes."  ORBIT DIAGRAM: one lap = 92 min
registerShot('s164', { draw(g, t, info) {
  g.fillStyle = '#04060e'; g.fillRect(0, 0, E.W, E.H); FX.stars(g, t, { count: 200, area: [0, 0, E.W, E.H] }); const cx = E.W * 0.42, cy = E.H * 0.52, er = 280, or = 380, a = -Math.PI / 2 + t * 1.6;
  glow(g, cx, cy, er * 1.5, '#6ac8ff', 0.35); circle(g, cx, cy, er, '#2a6ad0'); g.save(); g.beginPath(); g.arc(cx, cy, er, 0, Math.PI * 2); g.clip(); g.fillStyle = '#4a9a4a'; for (const [x, y, rx, ry] of [[-90, -80, 110, 60], [70, 70, 90, 110], [-120, 110, 60, 40]]) { g.beginPath(); g.ellipse(cx + x, cy + y, rx, ry, 0.4, 0, Math.PI * 2); g.fill(); } g.restore();
  g.setLineDash([14, 12]); ring(g, cx, cy, or, 3, alpha('#ffffff', 0.6)); g.setLineDash([]); g.strokeStyle = GOLD(); g.lineWidth = 6; g.beginPath(); g.arc(cx, cy, or, -Math.PI / 2, a); g.stroke();
  glow(g, cx + Math.cos(a) * or, cy + Math.sin(a) * or, 50, '#ffffff', 0.6); circle(g, cx + Math.cos(a) * or, cy + Math.sin(a) * or, 14, '#ffffff');
  label(g, '1 LAP', E.W * 0.8, E.H * 0.38, { size: 64, a: prog(t, 0.4, 0.8) }); label(g, '= 92 MIN', E.W * 0.8, E.H * 0.5, { size: 90, color: GOLD(), glow: true, a: prog(t, wt('ninety', info, t, 2.6) - 0.2, wt('ninety', info, t, 2.6) + 0.2) });
} });
// s165 — "And on day fifty-three, you'll pull on its oceans harder than the Moon does."  the ocean bulges up toward you
registerShot('s165', { draw(g, t, info) {
  const k = t / info.dur, bulge = ease.inOut(prog(t, 1.4, 5.0)); orbit(g, t, { z: 1.0, x: 0, y: 0 }, { cap: [E.W * 0.42, E.H * 0.2], capS: 0.9, earthTop: 420 }); const lx = E.W * 0.42, ly = E.H - 420 + 4, bh = 30 + 150 * bulge;
  g.save(); g.fillStyle = linGrad(g, 0, ly - bh, 0, ly, [alpha('#7ad0ff', 0.95), alpha('#2a6ad0', 0.95)]); g.beginPath(); g.ellipse(lx, ly + 6, 460, bh, 0, Math.PI, Math.PI * 2); g.fill(); g.strokeStyle = alpha('#ffffff', 0.7); g.lineWidth = 4; g.beginPath(); g.ellipse(lx, ly + 6, 460, bh, 0, Math.PI * 1.15, Math.PI * 1.85); g.stroke(); g.restore();
  arrow(g, [lx, ly - bh - 20], [lx, E.H * 0.2 + 70], GOLD(), 8, prog(t, 1.2, 1.8)); label(g, 'OCEAN', lx - 300, ly - 40, { size: 30, a: prog(t, 1.6, 2.0) });
  FX.moon(g, E.W * 0.9, E.H * 0.16, 26); label(g, 'MOON', E.W * 0.9, E.H * 0.24, { size: 28, a: 0.8 });
  const bx = E.W * 0.6, by = E.H * 0.3, bw = 520; [['MOON', 0.5, '#cfd8e8'], ['YOU', 0.5 + 0.5 * bulge, GOLD()]].forEach(([n, v, c], i) => { const y = by + i * 70, a = prog(t, 0.6 + i * 0.3, 1.0 + i * 0.3); if (a <= 0) return; g.save(); g.globalAlpha *= a; text(g, n, bx - 20, y, { size: 32, color: c, font: FONTS.ui, weight: 900, align: 'right' }); rr(g, bx, y - 18, bw * v, 36, 18); g.fillStyle = c; g.fill(); g.restore(); });
  label(g, 'PULL ON THE OCEANS', bx + bw / 2, by - 70, { size: 34, a: prog(t, 0.6, 1.0) });
  weightBadge(g, { day: 53, k: 1, flip: prog(t, 0.2, 0.7), value: '631 TRILLION t' });
} });
// s166 — END SCREEN: "What would YOU do if you got two times heavier every day? Tell us in the comments. And subscribe, because Part 2 is coming."
registerShot('s166', { draw(g, t, info) {
  UI.endScreen(g, t, { question: 'What would YOU do if you got 2× heavier every day?', cast: [YOU, GRANDPA, MOM, VOSS, FRIEND], moodColors: ['#101632', '#1e2448', '#3a3058'], rim: '#cfe8ff' });
  const p = ease.outBack(prog(t, wt('Part', info, t, 6) - 0.3, wt('Part', info, t, 6) + 0.2)); if (p > 0) { g.save(); g.translate(E.W * 0.5, E.H * 0.5); g.scale(p, p);
    rr(g, -240, -70, 480, 140, 70); g.fillStyle = alpha(GOLD(), 0.15); g.fill(); g.strokeStyle = GOLD(); g.lineWidth = 4; g.stroke(); text(g, 'PART 2', 0, 4, { size: 86, color: GOLD(), font: FONTS.ui, weight: 900, glow: 24, glowColor: alpha(GOLD(), 0.7), spacing: 4 }); g.restore(); }
  const fx = E.W * 0.87, fy = E.H * 0.52; glow(g, fx, fy - 80, 220, '#9fd8ff', 0.35); drawFigure(g, { x: fx, y: fy + 40 + 10 * Math.sin(t * 1.4), s: 0.9, rot: -Math.PI / 2 + 0.1 * Math.sin(t * 0.8), facing: 1, outfit: YOU, pose: STAR, expr: 'smile', rim: { color: '#cfe8ff', dir: [0, -1] }, shadow: false });
  const pa = t * 1.2; pen(g, fx - 40 + Math.cos(pa) * 170, fy - 60 + Math.sin(pa) * 70, pa + Math.PI / 2, 0.8);
} });
