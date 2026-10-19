// shots/07_science.js — "Is any of this real?" Blueprint section: g-force and blacking out (fighter pilots, the heart can't
// lift blood at 8×), floor loads (200 kg per m², the bed ×5), buoyancy (air in the lungs; Archimedes), friction (the truck),
// gravity between objects (you and your phone; Cavendish 1798), and why astronauts float (Newton's cannon). Then day 20.
import { E, V, S, registerShot, layer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake, rng } from '/engine/core.js';
import { POSES } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { orbit } from '../sets/world.js';
import { floatShot } from '../space.js';
import { bodyOutline, realBox, crossMark, checkMark, stamp, wt, GOLD, CORAL, weightBadge, bp, label, arrow, BP, CREAM } from '../lib.js';

const INK = '#e8f0ff', BLOOD = '#ff6a7a', WATER = '#4aa8e8';
const lf = (g, x, y, s, pose = POSES.stand, o = {}) => UI.lineFigure(g, { x, y, s, pose, color: o.color || INK, facing: o.facing ?? 1 });
function heart(g, x, y, r, col = BLOOD) { g.save(); g.translate(x, y); g.beginPath(); g.moveTo(0, r * 0.9); g.bezierCurveTo(-r * 1.3, 0, -r * 0.6, -r * 1.0, 0, -r * 0.4); g.bezierCurveTo(r * 0.6, -r * 1.0, r * 1.3, 0, 0, r * 0.9); g.fillStyle = col; g.fill(); g.restore(); }
function strokeIn(g, w = 5, col = INK) { g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; }
// line-art fighter jet pointing along +x (centre x, y)
function jet(g, x, y, s, ang) { g.save(); g.translate(x, y); g.rotate(ang); g.scale(s, s); strokeIn(g, 4); g.fillStyle = alpha(INK, 0.12);
  g.beginPath(); g.moveTo(120, 0); g.lineTo(60, -14); g.lineTo(-90, -14); g.lineTo(-110, 0); g.lineTo(-90, 14); g.lineTo(60, 14); g.closePath(); g.fill(); g.stroke();
  g.beginPath(); g.moveTo(20, -12); g.lineTo(-40, -90); g.lineTo(-60, -90); g.lineTo(-30, -12); g.moveTo(20, 12); g.lineTo(-40, 90); g.lineTo(-60, 90); g.lineTo(-30, 12); g.moveTo(-80, -12); g.lineTo(-110, -46); g.lineTo(-104, -12); g.stroke(); g.restore(); }
// water tank (x, y = top-left, w, h); returns water surface y
function tank(g, x, y, w, h, level = 0.78) { const sy = y + h * (1 - level); g.fillStyle = alpha(WATER, 0.28); g.fillRect(x, sy, w, y + h - sy); strokeIn(g, 5); g.beginPath(); g.moveTo(x, y); g.lineTo(x, y + h); g.lineTo(x + w, y + h); g.lineTo(x + w, y); g.stroke(); seg(g, [[x, sy], [x + w, sy]], 3, alpha(WATER, 0.9)); return sy; }
// a lying line figure (head to the left) centred on (x, y), with lungs
function floater(g, x, y, s, lungs = 1) { g.save(); g.translate(x, y); g.rotate(-Math.PI / 2); lf(g, 0, 100 * s, s, POSES.stand); if (lungs) { g.fillStyle = alpha(GOLD(), 0.55 * lungs); for (const dx of [-9, 9]) { g.beginPath(); g.ellipse(dx * s, -40 * s + 100 * s - 100 * s, 8 * s, 16 * s, 0, 0, Math.PI * 2); g.fill(); } } g.restore(); }
// iso tile of 1 m² at centre (x, y), size u
function tile(g, x, y, u, col = INK) { strokeIn(g, 4, col); g.fillStyle = alpha(col, 0.08); g.beginPath(); g.moveTo(x - u, y); g.lineTo(x, y - u * 0.5); g.lineTo(x + u, y); g.lineTo(x, y + u * 0.5); g.closePath(); g.fill(); g.stroke(); }
// little line-art pickup facing right, wheels on y
function bpTruck(g, x, y, s) { g.save(); g.translate(x, y); g.scale(s, s); strokeIn(g, 4); g.fillStyle = alpha(INK, 0.1); g.beginPath(); g.moveTo(-170, -40); g.lineTo(-170, -100); g.lineTo(0, -100); g.lineTo(20, -160); g.lineTo(110, -160); g.lineTo(150, -100); g.lineTo(170, -96); g.lineTo(170, -40); g.closePath(); g.fill(); g.stroke(); for (const wx of [-110, 110]) { g.beginPath(); g.arc(wx, -34, 32, 0, Math.PI * 2); g.stroke(); } g.restore(); }

// s133 — "And in real life, your body wouldn't keep up."  BLUEPRINT: the body outline, the heart beating hard
registerShot('s133', { draw(g, t, info) {
  bp(g); const x = E.W * 0.42, y = E.H * 0.56, s = 0.82, b = 1 + 0.12 * Math.abs(Math.sin(t * 7)); bodyOutline(g, x, y, s, {}, {}); glow(g, x - 22 * s, y - 250 * s, 160, BLOOD, 0.35); heart(g, x - 22 * s, y - 250 * s, 44 * b);
  label(g, 'IN REAL LIFE…', E.W * 0.74, E.H * 0.34, { size: 56, a: prog(t, 0.2, 0.6) }); label(g, 'THE BODY HAS LIMITS', E.W * 0.74, E.H * 0.44, { size: 40, color: GOLD(), a: prog(t, 0.8, 1.2) });
} });
// s134 — "Fighter pilots in tight turns can feel nine times their own weight,"  BLUEPRINT: a jet pulling a tight circle — 9 g
registerShot('s134', { draw(g, t, info) {
  bp(g); const cx = E.W * 0.42, cy = E.H * 0.52, R = 330, a = -Math.PI / 2 + t * 1.6; g.setLineDash([16, 14]); ring(g, cx, cy, R, 3, alpha(BP(), 0.7)); g.setLineDash([]);
  for (let i = 1; i < 10; i++) { const aa = a - i * 0.06; circle(g, cx + Math.cos(aa) * R, cy + Math.sin(aa) * R, 6 - i * 0.5, alpha(INK, 0.5 - i * 0.05)); }
  jet(g, cx + Math.cos(a) * R, cy + Math.sin(a) * R, 1.1, a + Math.PI / 2); arrow(g, [cx + Math.cos(a) * (R - 40), cy + Math.sin(a) * (R - 40)], [cx + Math.cos(a) * (R - 190), cy + Math.sin(a) * (R - 190)], GOLD(), 8, prog(t, 0.6, 1.2));
  label(g, '9 g', E.W * 0.78, E.H * 0.42, { size: 140, color: GOLD(), glow: true, a: prog(t, wt('nine', info, t, 2.0) - 0.2, wt('nine', info, t, 2.0) + 0.2) }); label(g, '= 9× YOUR WEIGHT', E.W * 0.78, E.H * 0.56, { size: 40, a: prog(t, 2.4, 2.8) });
} });
// s135 — "…and even they need special suits and training not to black out."  BLUEPRINT: the pilot in a G-suit
registerShot('s135', { draw(g, t, info) {
  bp(g); const x = E.W * 0.4, y = E.H * 0.88, s = 2.6, p = 0.5 + 0.5 * Math.sin(t * 4); lf(g, x, y, s, POSES.stand);
  g.fillStyle = alpha(GOLD(), 0.35 + 0.25 * p); for (const [dx, dy, w, h] of [[-20, -98, 16, 54], [4, -98, 16, 54], [-22, -132, 44, 28]]) { rr(g, x + dx * s, y + dy * s, w * s, h * s, 8); g.fill(); }
  ring(g, x + 3 * s, y - 208 * s, 32 * s, 6, GOLD()); UI.callout(g, t, { at: [x + 20 * s, y - 80 * s], to: [E.W * 0.7, E.H * 0.5], str: 'G-SUIT SQUEEZES THE LEGS', start: 0.4 }); UI.callout(g, t, { at: [x + 30 * s, y - 210 * s], to: [E.W * 0.7, E.H * 0.24], str: 'TRAINED BREATHING', start: 1.4 });
} });
// s136 — "At eight times your weight, on day three, your heart couldn't push blood up to your brain."
registerShot('s136', { draw(g, t, info) {
  bp(g); const x = E.W * 0.38, y = E.H * 0.56, s = 0.82, hx = x - 22 * s, hy = y - 250 * s, top = y - 440 * s; bodyOutline(g, x, y, s, {}, {}); heart(g, hx, hy, 44 * (1 + 0.1 * Math.abs(Math.sin(t * 8))));
  const up = ease.out(prog(t, 0.3, 1.6)) - 0.65 * ease.inOut(prog(t, 2.2, 3.6)), ly = lerp(hy - 40, top + 30, clamp(up)); seg(g, [[hx + 6, hy - 40], [hx + 6, ly]], 22, BLOOD); circle(g, hx + 6, ly, 11, BLOOD);
  for (const dx of [-140, 140]) arrow(g, [x + dx, y - 360 * s], [x + dx, y - 100 * s], GOLD(), 10, prog(t, 2.0, 2.6));
  label(g, '8× WEIGHT', E.W * 0.74, E.H * 0.3, { size: 80, color: GOLD(), glow: true, a: prog(t, 1.8, 2.2) }); label(g, 'DAY 3 · 560 kg', E.W * 0.74, E.H * 0.42, { size: 44, a: prog(t, 2.2, 2.6) });
  label(g, 'BLOOD CAN\'T REACH THE BRAIN', E.W * 0.74, E.H * 0.62, { size: 40, color: BLOOD, a: prog(t, 3.6, 4.0) }); crossMark(g, x + 2, top + 20, 1.6, CORAL(), prog(t, 3.8, 4.2));
} });
// s137 — "You'd faint."  the outline tips over, eyes ✗
registerShot('s137', { draw(g, t, info) {
  bp(g); const x = E.W * 0.5, y = E.H * 0.86, s = 2.6, r = 1.4 * ease.in(prog(t, 0.1, 0.9)); g.save(); g.translate(x, y); g.rotate(r); lf(g, 0, 0, s, POSES.stand); const hx = 3 * s, hy = -208 * s;
  for (const dx of [-12, 12]) { seg(g, [[hx + dx * s - 6, hy - 6], [hx + dx * s + 6, hy + 6]], 4, CORAL()); seg(g, [[hx + dx * s + 6, hy - 6], [hx + dx * s - 6, hy + 6]], 4, CORAL()); } g.restore();
  label(g, 'FAINT', E.W * 0.78, E.H * 0.3, { size: 90, color: CORAL(), glow: true, a: prog(t, 0.6, 1.0) });
} });
// s138 — "Floors have limits too."  BLUEPRINT: a floor section — boards on joists
registerShot('s138', { draw(g, t, info) {
  bp(g); const y = E.H * 0.5, x0 = E.W * 0.14, x1 = E.W * 0.86, p = ease.out(prog(t, 0.1, 0.9)); strokeIn(g, 5); g.fillStyle = alpha(INK, 0.1); g.fillRect(x0, y - 40, (x1 - x0) * p, 40); g.strokeRect(x0, y - 40, (x1 - x0) * p, 40);
  for (let i = 0; i < 7; i++) { const x = x0 + 40 + i * (x1 - x0 - 80) / 6; if (x > x0 + (x1 - x0) * p) break; g.fillRect(x - 24, y, 48, 200); g.strokeRect(x - 24, y, 48, 200); }
  label(g, 'FLOOR BOARDS', E.W / 2, y - 100, { size: 40, a: prog(t, 0.6, 1.0) }); label(g, 'JOISTS', E.W / 2, y + 270, { size: 40, color: GOLD(), a: prog(t, 0.9, 1.3) });
} });
// s139 — "A normal house floor is built for about two hundred kilos on every square meter."  1 m², 200 kg
registerShot('s139', { draw(g, t, info) {
  bp(g); const x = E.W * 0.42, y = E.H * 0.66, u = 300; tile(g, x, y, u); UI.dimension(g, t, { x1: x - u, y1: y + 30, x2: x, y2: y + u * 0.5 + 30, str: '1 m', start: 0.4 }); UI.dimension(g, t, { x1: x, y1: y + u * 0.5 + 30, x2: x + u, y2: y + 30, str: '1 m', start: 0.6 });
  const n = Math.floor(4 * ease.out(prog(t, wt('two', info, t, 1.6) - 0.2, wt('two', info, t, 1.6) + 1.2))); for (let i = 0; i < n; i++) { const wy = y - 30 - i * 64; g.fillStyle = alpha(INK, 0.15); strokeIn(g, 4); g.beginPath(); g.ellipse(x, wy, 120, 34, 0, 0, Math.PI * 2); g.fill(); g.stroke(); g.fillRect(x - 120, wy - 50, 240, 50); seg(g, [[x - 120, wy], [x - 120, wy - 50]], 4, INK); seg(g, [[x + 120, wy], [x + 120, wy - 50]], 4, INK); g.beginPath(); g.ellipse(x, wy - 50, 120, 34, 0, 0, Math.PI * 2); g.fillStyle = '#2a4478'; g.fill(); g.stroke(); label(g, '50 kg', x, wy - 50, { size: 28, color: GOLD() }); }
  label(g, '200 kg', E.W * 0.76, E.H * 0.4, { size: 110, color: GOLD(), glow: true, a: prog(t, 2.6, 3.0) }); label(g, 'PER SQUARE METRE', E.W * 0.76, E.H * 0.52, { size: 40, a: prog(t, 3.0, 3.4) }); checkMark(g, E.W * 0.76, E.H * 0.66, 2, '#5fd38a', prog(t, 3.4, 3.8));
} });
// s140 — "On day five, your bed puts five times that on it."  1,000 kg per m² — ×5 — the joist cracks
registerShot('s140', { draw(g, t, info) {
  bp(g); const x = E.W * 0.4, y = E.H * 0.7, u = 300, [sx, sy] = shake(t, t > 2 ? 6 : 0, 30); g.save(); g.translate(sx, sy); tile(g, x, y, u, t > 2 ? CORAL() : INK);
  strokeIn(g, 5); const by = y - 40, bu = u * 0.72; g.fillStyle = '#2a4478'; for (const [lx, ly] of [[-bu, 0], [bu, 0], [0, bu * 0.5]]) seg(g, [[x + lx, by + ly], [x + lx, by + ly + 40]], 5, INK);
  g.beginPath(); g.moveTo(x - bu, by); g.lineTo(x, by - bu * 0.5); g.lineTo(x + bu, by); g.lineTo(x, by + bu * 0.5); g.closePath(); g.fill(); g.stroke(); label(g, 'BED + YOU', x, by - 10, { size: 32 }); label(g, '2,240 kg', x, by + 34, { size: 32, color: GOLD() });
  for (let i = 0; i < 5; i++) arrow(g, [x - 200 + i * 100, by - 260], [x - 200 + i * 100, by - 120], GOLD(), 7, prog(t, 0.3 + i * 0.08, 0.7 + i * 0.08));
  if (t > 2) { strokeIn(g, 6, CORAL()); g.beginPath(); g.moveTo(x - 40, y + 140); g.lineTo(x, y + 180); g.lineTo(x - 30, y + 220); g.lineTo(x + 10, y + 270); g.stroke(); } g.restore();
  label(g, '× 5', E.W * 0.76, E.H * 0.3, { size: 120, color: CORAL(), glow: true, a: prog(t, wt('five', info, t, 1.0), wt('five', info, t, 1.0) + 0.3) }); label(g, '1,000 kg / m²', E.W * 0.76, E.H * 0.46, { size: 56, a: prog(t, 1.4, 1.8) });
  weightBadge(g, { day: 5, k: 1 });
} });
// s141 — "You float because, with air in your lungs, your body is a tiny bit lighter than the same amount of water."
registerShot('s141', { draw(g, t, info) {
  bp(g); const x = E.W * 0.12, y = E.H * 0.22, w = E.W * 0.5, h = E.H * 0.62, sy = tank(g, x, y, w, h), fy = sy + 4 * Math.sin(t * 2); floater(g, x + w / 2, fy, 1.8, prog(t, wt('lungs', info, t, 2.0) - 0.2, wt('lungs', info, t, 2.0) + 0.4));
  arrow(g, [x + w / 2 + 40, fy + 60], [x + w / 2 + 40, fy - 120], '#5fd38a', 9, prog(t, 0.6, 1.2)); arrow(g, [x + w / 2 - 40, fy - 60], [x + w / 2 - 40, fy + 100], GOLD(), 9, prog(t, 0.8, 1.4));
  label(g, 'WATER PUSHES UP', E.W * 0.8, E.H * 0.3, { size: 40, color: '#5fd38a', a: prog(t, 0.8, 1.2) }); label(g, 'YOUR WEIGHT', E.W * 0.8, E.H * 0.42, { size: 40, color: GOLD(), a: prog(t, 1.2, 1.6) });
  label(g, 'AIR IN YOUR LUNGS', E.W * 0.8, E.H * 0.6, { size: 40, a: prog(t, 2.2, 2.6) }); label(g, '→ A TINY BIT LIGHTER', E.W * 0.8, E.H * 0.7, { size: 40, color: '#5fd38a', a: prog(t, 4.0, 4.4) });
} });
// s142 — "Double your weight, and you sink like a stone."
registerShot('s142', { draw(g, t, info) {
  bp(g); const x = E.W * 0.12, y = E.H * 0.22, w = E.W * 0.5, h = E.H * 0.62, sy = tank(g, x, y, w, h), fy = lerp(sy, y + h - 60, ease.in(prog(t, 0.4, 1.6)));
  floater(g, x + w / 2, fy, 1.8, 0.5); for (let i = 0; i < 6; i++) { const by = fy - 60 - ((t * 200 + i * 60) % 300); if (by > sy) ring(g, x + w / 2 + 20 * Math.sin(i), by, 6, 2, alpha(INK, 0.7)); }
  arrow(g, [x + w / 2 - 40, fy - 80], [x + w / 2 - 40, fy + 200], GOLD(), 12, prog(t, 0.1, 0.4)); label(g, '× 2', E.W * 0.8, E.H * 0.34, { size: 120, color: GOLD(), glow: true }); label(g, 'SINKS', E.W * 0.8, E.H * 0.5, { size: 70, color: CORAL(), a: prog(t, 1.4, 1.8) });
} });
// s143 — "Archimedes figured that out more than two thousand years ago."  the bath, ~250 BC — REAL
registerShot('s143', { draw(g, t, info) {
  bp(g); const x = E.W * 0.38, y = E.H * 0.7; strokeIn(g, 6); g.fillStyle = alpha(WATER, 0.25); g.beginPath(); g.moveTo(x - 300, y - 160); g.lineTo(x - 260, y); g.lineTo(x + 260, y); g.lineTo(x + 300, y - 160); g.closePath(); g.fill(); g.stroke();
  lf(g, x - 60, y - 40, 1.6, POSES.sit); circle(g, x - 60 + 3 * 1.6, y - 40 - 180 * 1.6 + 30, 24, alpha(INK, 0.3)); for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.3, d = 80 + 120 * ((t * 0.8 + i * 0.13) % 1); circle(g, x + 180 + Math.cos(a) * d * 0.6, y - 170 + Math.sin(a) * d * 0.5, 9, alpha(WATER, 0.9)); }
  label(g, 'ARCHIMEDES', E.W * 0.76, E.H * 0.3, { size: 64, a: prog(t, 0.3, 0.7) }); label(g, '~250 BC', E.W * 0.76, E.H * 0.42, { size: 48, color: GOLD(), a: prog(t, 0.8, 1.2) }); realBox(g, 'BUOYANCY', E.W * 0.76, E.H * 0.62, { k: prog(t, 1.6, 2.0), size: 34 });
} });
// s144 — "The heavier something is, the harder it presses on the ground, and the harder it is to drag."
registerShot('s144', { draw(g, t, info) {
  bp(g); const x = E.W * 0.42, y = E.H * 0.66, wgt = 0.4 + 0.6 * ease.inOut(prog(t, 0.4, 2.6)); seg(g, [[E.W * 0.08, y], [E.W * 0.92, y]], 5, INK); for (let i = 0; i < 30; i++) seg(g, [[E.W * 0.08 + i * 54, y], [E.W * 0.08 + i * 54 - 26, y + 26]], 3, alpha(INK, 0.5));
  strokeIn(g, 5); g.fillStyle = alpha(INK, 0.12); g.fillRect(x - 160, y - 240, 320, 240); g.strokeRect(x - 160, y - 240, 320, 240); label(g, 'YOU', x, y - 120, { size: 56 });
  arrow(g, [x, y - 260], [x, y - 260 + 60 + 260 * wgt], GOLD(), 12, prog(t, 0.2, 0.6)); label(g, 'WEIGHT', x + 120, y - 320, { size: 36, color: GOLD() });
  seg(g, [[x + 160, y - 120], [E.W * 0.86, y - 120]], 5, '#c8a46a'); arrow(g, [E.W * 0.72, y - 170], [E.W * 0.86, y - 170], '#5fd38a', 9, prog(t, wt('drag', info, t, 4.5) - 0.4, wt('drag', info, t, 4.5)));
  arrow(g, [x - 170, y - 20], [x - 170 - 120 - 240 * wgt, y - 20], CORAL(), 12, prog(t, 3.0, 3.6)); label(g, 'GRIP', x - 330, y - 80, { size: 36, color: CORAL(), a: prog(t, 3.4, 3.8) });
} });
// s145 — "That's friction."  zoom on the two surfaces locking together
registerShot('s145', { draw(g, t, info) {
  bp(g); const cy = E.H * 0.52, a = ease.outBack(prog(t, 0, 0.5)); strokeIn(g, 6); g.fillStyle = alpha(INK, 0.12); g.beginPath(); g.moveTo(E.W * 0.15, cy - 200); g.lineTo(E.W * 0.85, cy - 200); for (let i = 0; i <= 28; i++) g.lineTo(E.W * 0.85 - i * E.W * 0.025, cy + (i % 2 ? 14 : -26)); g.closePath(); g.fill(); g.stroke();
  g.fillStyle = alpha(GOLD(), 0.15); strokeIn(g, 6, GOLD()); g.beginPath(); g.moveTo(E.W * 0.15, cy + 200); g.lineTo(E.W * 0.85, cy + 200); for (let i = 0; i <= 28; i++) g.lineTo(E.W * 0.85 - i * E.W * 0.025, cy + 22 + (i % 2 ? 14 : -26)); g.closePath(); g.fill(); g.stroke();
  g.save(); g.translate(E.W / 2, E.H * 0.18); g.scale(a, a); label(g, 'FRICTION', 0, 0, { size: 120, color: GOLD(), glow: true }); g.restore();
} });
// s146 — "It's why the truck couldn't move you."  the truck pulls; your grip wins
registerShot('s146', { draw(g, t, info) {
  bp(g); const y = E.H * 0.72; seg(g, [[0, y], [E.W, y]], 5, INK); lf(g, E.W * 0.26, y, 1.8, POSES.stand); bpTruck(g, E.W * 0.66 + 3 * Math.sin(t * 40), y, 1.4); seg(g, [[E.W * 0.26 + 20, y - 160], [E.W * 0.66 - 240, y - 110]], 5, '#c8a46a');
  arrow(g, [E.W * 0.7, y - 300], [E.W * 0.86, y - 300], '#5fd38a', 10, prog(t, 0.2, 0.6)); label(g, 'PULL', E.W * 0.78, y - 360, { size: 40, color: '#5fd38a' });
  arrow(g, [E.W * 0.24, y + 40], [E.W * 0.08, y + 40], CORAL(), 14, prog(t, 0.6, 1.0)); label(g, 'GRIP OF 4,480 kg', E.W * 0.2, y + 110, { size: 40, color: CORAL(), a: prog(t, 0.9, 1.3) }); label(g, 'MOVED: 0 cm', E.W * 0.26, E.H * 0.2, { size: 50, a: prog(t, 1.2, 1.6) });
} });
// s147 — "And every object pulls on every other object."  two balls tugging on each other
registerShot('s147', { draw(g, t, info) {
  bp(g); const cy = E.H * 0.52, d = 360 - 20 * Math.sin(t * 2); for (const sx of [-1, 1]) { strokeIn(g, 6); g.fillStyle = alpha(INK, 0.12); g.beginPath(); g.arc(E.W / 2 + sx * d, cy, 120, 0, Math.PI * 2); g.fill(); g.stroke(); arrow(g, [E.W / 2 + sx * (d - 130), cy], [E.W / 2 + sx * (d - 300), cy], GOLD(), 10, prog(t, 0.5, 1.1)); }
  label(g, 'EVERYTHING PULLS ON EVERYTHING', E.W / 2, E.H * 0.18, { size: 52, a: prog(t, 0.8, 1.3) }); label(g, 'GRAVITY', E.W / 2, E.H * 0.84, { size: 64, color: GOLD(), glow: true, a: prog(t, 1.6, 2.0) });
} });
// s148 — "Right now, you're pulling on your phone."  you and your phone, tiny arrows
registerShot('s148', { draw(g, t, info) {
  bp(g); const y = E.H * 0.82; lf(g, E.W * 0.32, y, 2.4, POSES.stand); strokeIn(g, 5); g.fillStyle = alpha(INK, 0.12); rr(g, E.W * 0.66 - 50, y - 420, 100, 190, 18); g.fill(); g.stroke();
  arrow(g, [E.W * 0.66 - 60, y - 320], [E.W * 0.66 - 100, y - 320], GOLD(), 3, prog(t, 0.6, 1.0)); arrow(g, [E.W * 0.32 + 60, y - 320], [E.W * 0.32 + 100, y - 320], GOLD(), 3, prog(t, 0.6, 1.0));
  label(g, 'YOU', E.W * 0.32, E.H * 0.16, { size: 48 }); label(g, 'YOUR PHONE', E.W * 0.66, E.H * 0.16, { size: 48 });
} });
// s149 — "Just very, very weakly."  a magnifier on the tiny arrow
registerShot('s149', { draw(g, t, info) {
  bp(g); const y = E.H * 0.82; lf(g, E.W * 0.32, y, 2.4, POSES.stand); strokeIn(g, 5); g.fillStyle = alpha(INK, 0.12); rr(g, E.W * 0.66 - 50, y - 420, 100, 190, 18); g.fill(); g.stroke(); arrow(g, [E.W * 0.66 - 60, y - 320], [E.W * 0.66 - 100, y - 320], GOLD(), 3, 1);
  const a = ease.outBack(prog(t, 0.2, 0.7)), mx = E.W * 0.6, my = E.H * 0.36, r = 190 * a; if (r > 1) { circle(g, mx, my, r, '#1a2c58'); g.save(); g.beginPath(); g.arc(mx, my, r, 0, Math.PI * 2); g.clip(); arrow(g, [mx + 90, my], [mx - 90, my], GOLD(), 14, 1); g.restore(); ring(g, mx, my, r, 12, INK); seg(g, [[mx + r * 0.7, my + r * 0.7], [mx + r * 1.3, my + r * 1.3]], 22, INK); }
  label(g, '≈ 0.000000004 N', E.W * 0.6, E.H * 0.66, { size: 52, color: GOLD(), a: prog(t, 1.0, 1.4) }); label(g, '≈ 1/6,000 OF A MOSQUITO\'S WEIGHT', E.W * 0.6, E.H * 0.74, { size: 34, a: prog(t, 1.8, 2.2) });
} });
// s150 — "In 1798, Henry Cavendish measured that pull between lead balls, in a shed."  the torsion balance — REAL
registerShot('s150', { draw(g, t, info) {
  bp(g); const cx = E.W * 0.34, cy = E.H * 0.56, sw = 0.12 * Math.sin(t * 1.2); strokeIn(g, 5); g.beginPath(); g.moveTo(cx - 460, E.H * 0.92); g.lineTo(cx - 460, E.H * 0.3); g.lineTo(cx, E.H * 0.1); g.lineTo(cx + 460, E.H * 0.3); g.lineTo(cx + 460, E.H * 0.92); g.stroke();
  seg(g, [[cx, E.H * 0.16], [cx, cy]], 2, INK); g.save(); g.translate(cx, cy); g.scale(1, 0.35); g.rotate(sw); seg(g, [[-280, 0], [280, 0]], 6, INK); circle(g, -280, 0, 24, INK); circle(g, 280, 0, 24, INK); g.restore();
  for (const sx of [-1, 1]) { strokeIn(g, 5); g.fillStyle = alpha(INK, 0.15); g.beginPath(); g.arc(cx + sx * 300, cy + sx * 70, 70, 0, Math.PI * 2); g.fill(); g.stroke(); arrow(g, [cx + sx * 280, cy + sx * 10], [cx + sx * 240, cy + sx * 40], GOLD(), 4, prog(t, 1.4, 2.0)); }
  label(g, 'LEAD BALLS', cx, E.H * 0.86, { size: 36, a: prog(t, 0.8, 1.2) }); label(g, 'HENRY CAVENDISH', E.W * 0.8, E.H * 0.3, { size: 48, a: prog(t, 1.0, 1.4) }); label(g, '1798', E.W * 0.8, E.H * 0.42, { size: 90, color: GOLD(), glow: true, a: prog(t, wt('1798', info, t, 0.2), wt('1798', info, t, 0.2) + 0.3) }); realBox(g, 'MEASURED IN A SHED', E.W * 0.8, E.H * 0.62, { k: prog(t, 3.0, 3.4), size: 30 });
} });
// s151 — "Make yourself heavy enough, and that tiny pull gets big."  the arrows grow huge
registerShot('s151', { draw(g, t, info) {
  bp(g); const cx = E.W * 0.5, cy = E.H * 0.56, g1 = ease.inOut(prog(t, 0.6, 3.0)); lf(g, cx, cy + 200, 2.0 + 0.4 * g1, POSES.stand); glow(g, cx, cy - 40, 300 + 300 * g1, GOLD(), 0.2 + 0.3 * g1);
  for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + 0.2, d0 = 480, len = lerp(30, 260, g1); arrow(g, [cx + Math.cos(a) * d0, cy + Math.sin(a) * d0 * 0.8], [cx + Math.cos(a) * (d0 - len), cy + Math.sin(a) * (d0 - len) * 0.8], GOLD(), lerp(3, 14, g1), 1); }
  label(g, 'HEAVY ENOUGH → A BIG PULL', E.W / 2, E.H * 0.12, { size: 48, a: prog(t, 1.6, 2.0) });
} });
// s152 — "And astronauts don't float because there's no gravity up there."  in orbit, the gravity arrow is still there
registerShot('s152', { draw(g, t, info) {
  bp(g); const ex = E.W / 2, ey = E.H + 1500, er = 1800; strokeIn(g, 6); g.fillStyle = alpha(WATER, 0.2); g.beginPath(); g.arc(ex, ey, er, 0, Math.PI * 2); g.fill(); g.stroke();
  const ax = E.W * 0.5, ay = E.H * 0.3; g.save(); g.translate(ax, ay); g.rotate(0.3 * Math.sin(t)); lf(g, 0, 100, 1.2, POSES.cheer); g.restore(); arrow(g, [ax, ay + 140], [ax, ay + 360], GOLD(), 12, prog(t, 0.6, 1.2));
  label(g, 'GRAVITY UP HERE: ~90%', E.W * 0.78, E.H * 0.4, { size: 44, color: GOLD(), a: prog(t, 1.4, 1.8) }); crossMark(g, E.W * 0.2, E.H * 0.3, 1.8, CORAL(), prog(t, 2.4, 2.8)); label(g, '"NO GRAVITY"', E.W * 0.2, E.H * 0.42, { size: 40, a: prog(t, 2.2, 2.6) });
} });
// s153 — "They float because they're falling around the Earth, all the time."  Newton's cannon
registerShot('s153', { draw(g, t, info) {
  bp(g); const ex = E.W * 0.5, ey = E.H * 0.58, er = 240, top = [ex, ey - er - 60]; strokeIn(g, 5); g.fillStyle = alpha(WATER, 0.2); g.beginPath(); g.arc(ex, ey, er, 0, Math.PI * 2); g.fill(); g.stroke(); poly(g, [[ex - 50, ey - er + 6], [ex + 50, ey - er + 6], [ex, ey - er - 60]], alpha(INK, 0.3)); rr(g, ex - 10, ey - er - 80, 60, 24, 6); g.fillStyle = INK; g.fill();
  const path = (v, n) => { const pts = []; let x = top[0], y = top[1], vx = v, vy = 0; for (let i = 0; i < n; i++) { const dx = x - ex, dy = y - ey, d = Math.hypot(dx, dy); if (d < er) break; const a = 9e5 / (d * d); vx -= a * dx / d * 0.02; vy -= a * dy / d * 0.02; x += vx * 0.02; y += vy * 0.02; pts.push([x, y]); } return pts; };
  [[0.55, '#8aa0d0'], [0.8, '#a8c0e8'], [1, GOLD()]].forEach(([f, c], j) => { const pts = path(f * Math.sqrt(9e5 / (er + 60)), 1900), p = ease.inOut(prog(t, 0.3 + j * 1.0, 1.3 + j * 1.0)), n = Math.floor(pts.length * p); if (n < 2) return; g.strokeStyle = c; g.lineWidth = j === 2 ? 6 : 4; g.setLineDash(j === 2 ? [] : [10, 10]); g.beginPath(); g.moveTo(...top); for (let i = 0; i < n; i++) g.lineTo(...pts[i]); g.stroke(); g.setLineDash([]); circle(g, pts[n - 1][0], pts[n - 1][1], 12, c); });
  label(g, 'ALWAYS FALLING…', E.W * 0.82, E.H * 0.3, { size: 44, a: prog(t, 3.2, 3.6) }); label(g, '…ALWAYS MISSING', E.W * 0.82, E.H * 0.4, { size: 44, color: GOLD(), a: prog(t, 3.8, 4.2) });
} });
// s154 — "Day twenty."  ORBIT: the capsule over the Earth
registerShot('s154', { draw(g, t, info) { orbit(g, t, { z: 1.05 + 0.05 * t, x: 0, y: 0 }, { cap: [E.W * 0.5 + 40 * t, E.H * 0.38], capS: 1.6 }); weightBadge(g, { day: 20, k: 1, flip: prog(t, 0.1, 0.6) }); } });
// s155 — "Seventy-three thousand tonnes."  CAPSULE: you float, the number stamps in
registerShot('s155', { draw(g, t, info) {
  floatShot(g, t, info, { float: 1, lie: 1, spread: 1, expr: 'smile', look: [1, -0.4] }); veil(g, '#0e1430', 0.2); stamp(g, '73,400 t', E.W * 0.5, E.H * 0.5, t - wt('Seventy-three', info, t, 0.15), { size: 150, color: GOLD(), rot: -0.08 });
  weightBadge(g, { day: 20, k: 1 });
} });
