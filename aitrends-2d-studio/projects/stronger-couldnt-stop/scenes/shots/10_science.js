// shots/10_science.js — "Is any of this real?" Blueprint section: the doubling isn't, but the body's brakes are —
// myostatin (Belgian Blue cattle, the 2004 baby in Germany), tendon sensors, and size (square-cube law: ant vs elephant).
import { E, V, S, registerShot, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, rng } from '/engine/core.js';
import { POSES } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { steelRoom } from '../sets/atlas.js';
import { YOU } from '../cast.js';
import { heroFace, chip, crossMark, checkMark, egg, realBox, bodyOutline, wt, GOLD, CORAL, baby, palmUp } from '../lib.js';

const BP = () => S().ui.blueprint, CREAM = () => S().ui.cream, LEAF = '#7ad07a';
function bp(g) { g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#22386a', '#1a2c58']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); glow(g, E.W * 0.5, E.H * 0.5, 1100, '#5a7ac0', 0.45);
  g.strokeStyle = alpha(BP(), 0.1); g.lineWidth = 1; for (let x = 0; x <= E.W; x += 60) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, E.H); g.stroke(); } for (let y = 0; y <= E.H; y += 60) { g.beginPath(); g.moveTo(0, y); g.lineTo(E.W, y); g.stroke(); } }
function label(g, str, x, y, o = {}) { text(g, str, x, y, { size: o.size || 44, color: o.color || CREAM(), font: FONTS.ui, weight: 900, spacing: o.spacing ?? 3, align: o.align || 'center', alpha: o.a ?? 1, glow: o.glow ? 14 : 0, glowColor: alpha(o.color || CREAM(), 0.5) }); }
// brake warning icon: ( ! )
function brakeIcon(g, x, y, r, k = 1, col = GOLD()) {
  if (k <= 0) return; const s = ease.outBack(clamp(k)); g.save(); g.translate(x, y); g.scale(s, s); glow(g, 0, 0, r * 2, col, 0.35);
  circle(g, 0, 0, r * 1.05, 'rgba(10,14,30,.85)'); ring(g, 0, 0, r * 0.72, r * 0.12, col);
  g.strokeStyle = col; g.lineWidth = r * 0.12; g.lineCap = 'round'; for (const sx of [-1, 1]) { g.beginPath(); g.arc(0, 0, r * 0.98, sx > 0 ? -0.7 : Math.PI - 0.7, sx > 0 ? 0.7 : Math.PI + 0.7); g.stroke(); }
  text(g, '!', 0, r * 0.04, { size: r * 0.9, color: col, font: FONTS.ui, weight: 900 }); g.restore();
}
// line-art four-legged animal (facing right); o.bulk = muscle, o.horns, o.ears
function quad(g, x, y, s, o = {}) {
  const b = o.bulk || 1, col = o.color || BP(), t = o.t || 0; g.save(); g.translate(x, y); g.scale(s, s); g.lineCap = 'round'; g.lineJoin = 'round';
  g.fillStyle = alpha(col, 0.14); g.strokeStyle = col; g.lineWidth = 5;
  for (const lx of [-120, -70, 90, 130]) { g.beginPath(); g.moveTo(lx, 20); g.lineTo(lx + (lx > 0 ? 6 : -6), 170); g.stroke(); }
  g.beginPath(); g.ellipse(0, 0, 180 * (0.9 + 0.1 * b), 80 * b, 0, 0, Math.PI * 2); g.fill(); g.stroke();
  if (b > 1.2) { g.fillStyle = alpha(GOLD(), 0.45); for (const [mx, my, rx, ry] of [[110, -10, 70, 66], [-110, -6, 76, 70], [0, -40, 70, 40]]) { g.beginPath(); g.ellipse(mx, my, rx * (b - 0.4), ry * (b - 0.4), 0, 0, Math.PI * 2); g.fill(); } g.fillStyle = alpha(col, 0.14); }
  g.beginPath(); g.ellipse(225, -60, 60, 46, -0.3, 0, Math.PI * 2); g.fill(); g.stroke(); circle(g, 245, -72, 6, col);
  if (o.horns) { g.beginPath(); g.moveTo(200, -100); g.quadraticCurveTo(190, -150, 160, -150); g.moveTo(240, -100); g.quadraticCurveTo(260, -150, 290, -146); g.stroke(); }
  if (o.ears) { g.beginPath(); g.ellipse(195, -100, 18, 34, -0.5, 0, Math.PI * 2); g.stroke(); }
  g.beginPath(); g.moveTo(-180, -20); g.quadraticCurveTo(-240, 0 + 10 * Math.sin(t * 3), -230, 70); g.stroke(); g.restore();
}
// isometric cube outline; p(x,y,z) in units of a; o.fill per face {top, left, right}
const iso = (cx, cy, a) => (x, y, z) => [cx + (x - z) * a * 0.866, cy + (x + z) * a * 0.5 - y * a];
function cube(g, cx, cy, a, o = {}) {
  const P = iso(cx, cy, a), col = o.color || BP(), f = o.fill || alpha(col, 0.12);
  const faces = { top: [[0, 1, 0], [1, 1, 0], [1, 1, 1], [0, 1, 1]], left: [[0, 0, 1], [1, 0, 1], [1, 1, 1], [0, 1, 1]], right: [[1, 0, 0], [1, 0, 1], [1, 1, 1], [1, 1, 0]] };
  for (const [k, v] of Object.entries(faces)) { poly(g, v.map(q => P(...q)), (o.faces && o.faces[k]) || f); }
  g.strokeStyle = col; g.lineWidth = o.w || 4; g.lineJoin = 'round';
  for (const v of Object.values(faces)) { g.beginPath(); v.map(q => P(...q)).forEach((p, i) => i ? g.lineTo(...p) : g.moveTo(...p)); g.closePath(); g.stroke(); }
}
function ant(g, x, y, s, t) {
  const col = BP(); g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = col; g.lineWidth = 5; g.lineCap = 'round';
  for (let i = 0; i < 3; i++) for (const side of [-1, 1]) { const ph = Math.sin(t * 12 + i * 2 + (side > 0 ? Math.PI : 0)) * 14, bx = -20 + i * 30; g.beginPath(); g.moveTo(bx, 0); g.lineTo(bx + ph + side * 6, -30); g.lineTo(bx + ph * 1.4 + (i - 1) * 30, 60); g.stroke(); }
  g.fillStyle = alpha(col, 0.25); for (const [ex, ey, rx, ry] of [[-90, -6, 54, 36], [0, -10, 36, 22], [64, -18, 28, 26]]) { g.beginPath(); g.ellipse(ex, ey, rx, ry, 0, 0, Math.PI * 2); g.fill(); g.stroke(); }
  g.beginPath(); g.moveTo(80, -38); g.quadraticCurveTo(100, -90, 130, -96); g.moveTo(70, -40); g.quadraticCurveTo(80, -100, 110, -110); g.stroke(); g.restore();
}
function elephant(g, x, y, s, squat = 0) {
  const col = BP(); g.save(); g.translate(x, y); g.scale(s, s * (1 - 0.06 * squat)); g.strokeStyle = col; g.lineWidth = 6; g.lineJoin = 'round'; g.lineCap = 'round'; g.fillStyle = alpha(col, 0.16);
  for (const lx of [-170, -90, 80, 160]) { rr(g, lx - 34, 40, 68, 200, 20); g.fill(); g.stroke(); }
  g.beginPath(); g.ellipse(0, 0, 260, 170, 0, 0, Math.PI * 2); g.fill(); g.stroke();
  g.beginPath(); g.ellipse(250, -90, 110, 100, 0, 0, Math.PI * 2); g.fill(); g.stroke(); g.beginPath(); g.ellipse(200, -70, 70, 110, 0.2, 0, Math.PI * 2); g.stroke();
  g.beginPath(); g.moveTo(330, -40); g.quadraticCurveTo(380, 80, 340, 200); g.stroke(); circle(g, 280, -120, 8, col);
  g.beginPath(); g.moveTo(-260, -20); g.lineTo(-300, 60); g.stroke(); g.restore();
}
// line-art arm, flexed: shoulder S, elbow L, hand H; o.bicep scale; o.tendon highlight
function arm(g, o = {}) {
  const Sx = E.W * 0.2, Sy = E.H * 0.34, Lx = E.W * 0.47, Ly = E.H * 0.7, Hx = E.W * 0.72, Hy = E.H * 0.32, col = BP(), b = o.bicep ?? 1;
  seg(g, [[Sx, Sy], [Lx, Ly], [Hx, Hy]], 130, alpha(col, 0.14)); g.strokeStyle = col; g.lineWidth = 4;
  for (const sgn of [-1, 1]) { g.beginPath(); g.moveTo(Sx, Sy + sgn * 65); g.lineTo(Lx + sgn * 40, Ly + sgn * 30); g.lineTo(Hx + sgn * 55, Hy - sgn * 20); g.stroke(); }
  circle(g, Hx + 30, Hy - 30, 70, alpha(col, 0.14)); ring(g, Hx + 30, Hy - 30, 70, 4, col);
  g.save(); g.translate(lerp(Sx, Lx, 0.5), lerp(Sy, Ly, 0.5) - 30); g.rotate(Math.atan2(Ly - Sy, Lx - Sx)); g.fillStyle = alpha(GOLD(), 0.55); g.beginPath(); g.ellipse(0, -10, 170, 70 * b, 0, 0, Math.PI * 2); g.fill(); g.restore();
  if (o.tendon) { const T = [[lerp(Sx, Lx, 0.82), lerp(Sy, Ly, 0.82) - 30], [Lx + 20, Ly - 40], [lerp(Lx, Hx, 0.15), lerp(Ly, Hy, 0.15) - 30]]; g.save(); g.globalAlpha *= o.tendon; seg(g, T, 14, '#ff9a5a'); glow(g, Lx, Ly - 40, 140, '#ff9a5a', 0.5); g.restore(); return T; }
  return null;
}

// s149 — "So, is any of this real?"
registerShot('s149', { draw(g, t, info) {
  bp(g); UI.lineFigure(g, { x: E.W * 0.5, y: E.H * 0.86, s: 1.4, pose: POSES.think, color: alpha(BP(), 0.9) });
  UI.bigLine(g, t, { str: 'IS ANY OF THIS REAL?', dur: info.dur + 0.4, y: E.H * 0.36, size: 96 });
  for (let i = 0; i < 3; i++) label(g, '?', E.W * (0.3 + i * 0.2), E.H * 0.58 + 20 * Math.sin(t * 3 + i), { size: 70, color: GOLD(), a: ease.out(prog(t, 0.6 + i * 0.2, 1.0 + i * 0.2)) });
} });

// s150 — "Not the doubling."  the doubling curve gets crossed out
registerShot('s150', { draw(g, t, info) {
  bp(g); const x0 = E.W * 0.22, y0 = E.H * 0.8, W = E.W * 0.56, H = E.H * 0.56;
  g.strokeStyle = CORAL(); g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); for (let i = 0; i <= 50; i++) { const d = i / 50; g.lineTo(x0 + d * W, y0 - (Math.pow(2, d * 8) - 1) / 255 * H); } g.stroke();
  label(g, '×2 EVERY DAY', E.W * 0.5, E.H * 0.16, { size: 56, color: CORAL(), glow: true });
  crossMark(g, E.W * 0.5, E.H * 0.52, 5, CORAL(), ease.out(prog(t, 0.35, 0.8))); label(g, 'NOT REAL', E.W * 0.5, E.H * 0.9, { size: 52, a: ease.out(prog(t, 0.6, 0.9)) });
} });

// s151 — "But your body really does have brakes."  body outline with brake icons at the muscles
registerShot('s151', { draw(g, t, info) {
  bp(g); bodyOutline(g, E.W * 0.5, E.H * 0.6, 0.62, { muscle: 0.8 });
  const f = wt('brakes', info, t, 1.6); [[-0.11, 0.42], [0.11, 0.42], [-0.04, 0.82], [0.0, 0.48]].forEach(([dx, dy], i) => brakeIcon(g, E.W * (0.5 + dx) + (i === 3 ? 0 : 0), E.H * dy + (i === 3 ? -40 : 0), 46, prog(t, f - 0.2 + i * 0.12, f + 0.2 + i * 0.12)));
  label(g, 'BRAKES', E.W * 0.82, E.H * 0.2, { size: 60, color: GOLD(), glow: true, a: ease.out(prog(t, f, f + 0.3)) });
} });

// s152 — "One of them is a protein called myostatin."  a folded protein chain, MYOSTATIN
registerShot('s152', { draw(g, t, info) {
  bp(g); const r = rng(8), pts = []; let x = 0, y = 0, a = 0; for (let i = 0; i < 26; i++) { pts.push([x, y]); a += (r() - 0.5) * 1.8; x += Math.cos(a) * 46; y += Math.sin(a) * 46; }
  const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length, cy = pts.reduce((s, p) => s + p[1], 0) / pts.length, n = Math.ceil(pts.length * ease.out(prog(t, 0, 1.4)));
  g.save(); g.translate(E.W * 0.5, E.H * 0.48); g.rotate(t * 0.15); g.scale(1.5, 1.5); g.translate(-cx, -cy);
  seg(g, pts.slice(0, Math.max(2, n)), 8, alpha(BP(), 0.6)); pts.slice(0, n).forEach(([px, py], i) => { circle(g, px, py, 22, i % 3 ? alpha('#5fd3e0', 0.85) : alpha(GOLD(), 0.9)); ring(g, px, py, 22, 3, '#ffffff'); });
  g.restore(); glow(g, E.W * 0.5, E.H * 0.48, 420, '#5fd3e0', 0.2);
  label(g, 'MYOSTATIN', E.W * 0.5, E.H * 0.86, { size: 78, color: GOLD(), glow: true, a: ease.out(prog(t, 0.8, 1.2)) }); label(g, 'PROTEIN', E.W * 0.5, E.H * 0.13, { size: 36, a: ease.out(prog(t, 0.2, 0.6)) });
} });

// s153 — "It tells your muscles when to stop growing."  a muscle fibre grows into a STOP sign
registerShot('s153', { draw(g, t, info) {
  bp(g); const x0 = E.W * 0.12, y = E.H * 0.52, stopX = E.W * 0.7, grow = Math.min(stopX - 120 - x0, (E.W * 0.7) * ease.out(prog(t, 0, 1.6))), hit = grow >= stopX - 120 - x0 - 1;
  rr(g, x0, y - 90, grow, 180, 90); g.fillStyle = alpha('#e8806a', 0.85); g.fill(); g.save(); rr(g, x0, y - 90, grow, 180, 90); g.clip(); g.strokeStyle = alpha('#ffffff', 0.35); g.lineWidth = 6; for (let x = x0 + 30; x < x0 + grow; x += 40) { g.beginPath(); g.moveTo(x, y - 90); g.lineTo(x, y + 90); g.stroke(); } g.restore();
  label(g, 'MUSCLE', x0 + 40, y - 140, { size: 40, align: 'left' });
  const sx = stopX + (hit ? 6 * Math.sin(t * 30) * Math.exp(-(t - 1.4) * 4) : 0); g.save(); g.translate(sx, y); const oct = []; for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + i * Math.PI / 4; oct.push([Math.cos(a) * 150, Math.sin(a) * 150]); } poly(g, oct, '#d63a2a'); g.strokeStyle = '#ffffff'; g.lineWidth = 8; g.beginPath(); oct.map(p => p.map(v => v * 0.9)).forEach((p, i) => i ? g.lineTo(...p) : g.moveTo(...p)); g.closePath(); g.stroke();
  text(g, 'STOP', 0, 4, { size: 76, color: '#ffffff', font: FONTS.ui, weight: 900 }); g.restore(); seg(g, [[stopX, y + 150], [stopX, E.H * 0.95]], 12, alpha(BP(), 0.7));
} });

// s154 — "Some animals are born without that brake."  three animals, their brake icons crossed out
registerShot('s154', { draw(g, t, info) {
  bp(g); [[0.2, 0.55, 0.5, {}], [0.5, 0.58, 0.62, { horns: true }], [0.8, 0.56, 0.48, { ears: true }]].forEach(([x, y, s, o], i) => { const a = ease.out(prog(t, i * 0.2, 0.4 + i * 0.2)); g.save(); g.globalAlpha *= a; quad(g, E.W * x - 60, E.H * y, s, { ...o, t });
    brakeIcon(g, E.W * x, E.H * y - 200, 44, 1, CORAL()); crossMark(g, E.W * x, E.H * y - 200, 1.4, CORAL(), prog(t, 0.8 + i * 0.2, 1.2 + i * 0.2)); g.restore(); });
  label(g, 'NO BRAKE', E.W * 0.5, E.H * 0.15, { size: 56, color: CORAL(), glow: true, a: ease.out(prog(t, 1.2, 1.5)) });
} });

// s155 — "Belgian Blue cattle look like bodybuilders."  a huge, bulging bull; REAL
registerShot('s155', { draw(g, t, info) {
  bp(g); const k = t / info.dur; quad(g, E.W * 0.44, E.H * 0.56, 1.15 + 0.04 * k, { bulk: 1.0 + 0.6 * ease.out(prog(t, 0.2, 1.2)), horns: true, t });
  realBox(g, 'BELGIAN BLUE CATTLE', E.W * 0.5, E.H * 0.13, { k: prog(t, 0.6, 1.0), size: 40 });
} });

// s156 — "And in two thousand four, doctors in Germany described a baby boy with the same mutation."  FACT CARD
registerShot('s156', { draw(g, t, info) {
  bp(g); const a = ease.out(prog(t, 0, 0.4)), cw = 1300, ch = 640, cx = E.W / 2, cy = E.H * 0.52; g.save(); g.globalAlpha *= a;
  rr(g, cx - cw / 2, cy - ch / 2, cw, ch, 30); g.fillStyle = 'rgba(14,22,44,.92)'; g.fill(); g.strokeStyle = alpha(BP(), 0.5); g.lineWidth = 3; g.stroke();
  const f = wt('two', info, t, 0.6); text(g, '2004', cx - 300, cy - 120, { size: 170, color: GOLD(), font: FONTS.ui, weight: 900, glow: 24, glowColor: alpha(GOLD(), 0.5), alpha: ease.out(prog(t, f, f + 0.4)) });
  const gf = wt('Germany', info, t, 2.2), ga = ease.out(prog(t, gf - 0.1, gf + 0.3)); g.save(); g.globalAlpha *= ga; ['#1a1a1a', '#d63a2a', '#f2c21a'].forEach((c, i) => { g.fillStyle = c; g.fillRect(cx - 520, cy + 30 + i * 40, 160, 40); }); text(g, 'GERMANY', cx - 330, cy + 90, { size: 60, color: CREAM(), font: FONTS.ui, weight: 900, align: 'left', spacing: 3 }); g.restore();
  const bf = wt('baby', info, t, 3.6), ba = ease.outBack(prog(t, bf - 0.1, bf + 0.4)); if (ba > 0) { g.save(); g.translate(cx + 360, cy - 40); g.scale(ba, ba); glow(g, 0, 0, 260, '#9fd8ff', 0.3); baby(g, 0, 40, 1.1, { expr: 'smile', rim: alpha('#ffffff', 0.7) }); g.restore(); }
  g.restore(); realBox(g, 'BABY BOY · SAME MUTATION', cx, cy + ch / 2 + 70, { k: prog(t, 4.2, 4.6), size: 34 });
} });

// s157 — "He had about twice the muscle of other babies his age."  compare bars 1× vs 2×
registerShot('s157', { draw(g, t, info) {
  bp(g); const x0 = E.W * 0.3, w = E.W * 0.5;
  for (const [i, lab, v, c] of [[0, 'OTHER BABIES', 1, BP()], [1, 'HIM', 2, GOLD()]]) { const p = ease.out(prog(t, 0.1 + i * 0.5, 0.9 + i * 0.5)), y = E.H * (0.4 + i * 0.2), bw = Math.max(14, w * (v / 2) * p);
    label(g, lab, x0 - 30, y, { size: 40, align: 'right' }); rr(g, x0, y - 34, bw, 68, 34); g.fillStyle = c; g.fill();
    text(g, '×' + (v === 1 ? '1' : (1 + p).toFixed(1).replace('.0', '')), x0 + bw + 30, y, { size: 58, color: c, font: FONTS.ui, weight: 900, align: 'left', glow: 14, glowColor: alpha(c, 0.5) }); }
  label(g, 'MUSCLE', E.W * 0.5, E.H * 0.17, { size: 54, color: GOLD(), glow: true });
} });

// s158 — "Your tendons have a brake too:"  arm with the tendon highlighted
registerShot('s158', { draw(g, t, info) {
  bp(g); const T = arm(g, { tendon: ease.out(prog(t, 0.3, 0.9)) }); if (T) UI.callout(g, t, { at: T[1], to: [T[1][0] + 260, T[1][1] + 120], str: 'TENDON', start: 0.6, color: '#ffb07a' });
  brakeIcon(g, E.W * 0.86, E.H * 0.2, 54, prog(t, 1.2, 1.6));
} });

// s159 — "tiny sensors that tell a muscle to ease off before it tears."  sensors pulse a signal up to the muscle: EASE OFF
registerShot('s159', { draw(g, t, info) {
  bp(g); const sig = prog(t, 1.0, 2.4), relax = ease.inOut(prog(t, 2.4, 3.2)), T = arm(g, { tendon: 1, bicep: 1 - 0.2 * relax });
  for (let i = 0; i < 3; i++) { const q = 0.3 + i * 0.2, x = lerp(T[0][0], T[1][0], q), y = lerp(T[0][1], T[1][1], q), p = 0.5 + 0.5 * Math.sin(t * 8 + i); glow(g, x, y, 60, '#5fd3e0', 0.6 * p); circle(g, x, y, 12, '#5fd3e0'); }
  const M = [E.W * 0.32, E.H * 0.38]; g.save(); g.setLineDash([14, 12]); g.strokeStyle = alpha('#5fd3e0', 0.7); g.lineWidth = 4; g.beginPath(); g.moveTo(...T[0]); g.quadraticCurveTo(E.W * 0.42, E.H * 0.3, ...M); g.stroke(); g.restore();
  if (sig > 0 && sig < 1) { const u = sig, ax = (1 - u) * (1 - u) * T[0][0] + 2 * u * (1 - u) * E.W * 0.42 + u * u * M[0], ay = (1 - u) * (1 - u) * T[0][1] + 2 * u * (1 - u) * E.H * 0.3 + u * u * M[1]; glow(g, ax, ay, 90, '#5fd3e0', 0.8); circle(g, ax, ay, 16, '#ffffff'); }
  label(g, 'SENSORS', E.W * 0.6, E.H * 0.86, { size: 40, color: '#5fd3e0', a: ease.out(prog(t, 0.2, 0.6)) });
  if (relax > 0) chip(g, 'EASE OFF', M[0], M[1] - 160, { size: 52, k: relax });
} });

// s160 — "And size is a brake."  a small cube
registerShot('s160', { draw(g, t, info) { bp(g); const a = 150 * ease.outBack(prog(t, 0, 0.5)); cube(g, E.W * 0.5, E.H * 0.6, a); label(g, 'SIZE', E.W * 0.5, E.H * 0.16, { size: 64, color: GOLD(), glow: true }); label(g, '1×', E.W * 0.5, E.H * 0.82, { size: 50 }); brakeIcon(g, E.W * 0.82, E.H * 0.2, 50, prog(t, 0.8, 1.2)); } });

// s161 — "Make an animal twice as big,"  the cube doubles in size
registerShot('s161', { draw(g, t, info) {
  bp(g); const p = ease.inOut(prog(t, 0.2, 1.3)), a = lerp(150, 300, p); cube(g, E.W * 0.5, E.H * 0.72 - (a - 150) * 0.25, a);
  UI.dimension(g, t, { x1: E.W * 0.5 + a * 0.866 + 60, y1: E.H * 0.72 - (a - 150) * 0.25 + a * 0.5, x2: E.W * 0.5 + a * 0.866 + 60, y2: E.H * 0.72 - (a - 150) * 0.25 + a * 0.5 - a, str: '', color: GOLD(), start: 0.3 });
  label(g, p > 0.5 ? '2× BIGGER' : '1×', E.W * 0.5, E.H * 0.14, { size: 64, color: GOLD(), glow: true });
} });

// s162 — "and its muscles get four times stronger,"  the cross-section lights up 2×2 = ×4 STRENGTH
registerShot('s162', { draw(g, t, info) {
  bp(g); const a = 300, cx = E.W * 0.42, cy = E.H * 0.72 - 37, P = iso(cx, cy, a); cube(g, cx, cy, a);
  for (let i = 0; i < 4; i++) { const u = (i % 2) * 0.5, v = Math.floor(i / 2) * 0.5, k = ease.out(prog(t, 0.4 + i * 0.25, 0.7 + i * 0.25)); if (k <= 0) continue;
    poly(g, [P(1, v, u), P(1, v, u + 0.5), P(1, v + 0.5, u + 0.5), P(1, v + 0.5, u)], alpha(CORAL(), 0.75 * k)); }
  g.strokeStyle = '#ffffff'; g.lineWidth = 3; g.beginPath(); g.moveTo(...P(1, 0.5, 0)); g.lineTo(...P(1, 0.5, 1)); g.moveTo(...P(1, 0, 0.5)); g.lineTo(...P(1, 1, 0.5)); g.stroke();
  label(g, '×4 STRENGTH', E.W * 0.76, E.H * 0.42, { size: 66, color: CORAL(), glow: true, a: ease.out(prog(t, 1.2, 1.6)) }); label(g, 'MUSCLE CROSS-SECTION', E.W * 0.76, E.H * 0.52, { size: 30, a: ease.out(prog(t, 1.4, 1.8)) });
} });

// s163 — "but its body gets eight times heavier."  the volume fills with 8 cubes: ×8 WEIGHT
registerShot('s163', { draw(g, t, info) {
  bp(g); const a = 300, cx = E.W * 0.42, cy = E.H * 0.72 - 37; cube(g, cx, cy, a, { fill: alpha(BP(), 0.05) });
  const cells = []; for (let x = 0; x < 2; x++) for (let y = 0; y < 2; y++) for (let z = 0; z < 2; z++) cells.push([x, y, z]); cells.sort((p, q) => (p[0] + p[2]) - (q[0] + q[2]) || p[1] - q[1]);
  const P = iso(cx, cy, a); cells.forEach(([x, y, z], i) => { const k = ease.outBack(prog(t, 0.3 + i * 0.18, 0.55 + i * 0.18)); if (k <= 0) return; const [px, py] = P(x * 0.5, y * 0.5, z * 0.5); cube(g, px, py, a * 0.5 * Math.min(1, k), { color: GOLD(), w: 3, faces: { top: alpha(GOLD(), 0.55), left: alpha(GOLD(), 0.35), right: alpha(GOLD(), 0.45) } }); });
  label(g, '×8 WEIGHT', E.W * 0.76, E.H * 0.42, { size: 66, color: GOLD(), glow: true, a: ease.out(prog(t, 1.8, 2.2)) });
} });

// s164 — "That's why an ant can carry many times its own weight,"  an ant marches under a giant leaf
registerShot('s164', { draw(g, t, info) {
  bp(g); const x = lerp(E.W * 0.3, E.W * 0.6, t / info.dur), y = E.H * 0.7; seg(g, [[-100, y + 64], [E.W + 100, y + 64]], 4, alpha(BP(), 0.6));
  ant(g, x, y, 1.6, t); g.save(); g.translate(x + 10, y - 230 + 6 * Math.sin(t * 6)); g.rotate(-0.1); g.fillStyle = alpha(LEAF, 0.7); g.beginPath(); g.ellipse(0, 0, 300, 110, 0, 0, Math.PI * 2); g.fill(); g.strokeStyle = LEAF; g.lineWidth = 5; g.stroke();
  seg(g, [[-290, 0], [290, 0]], 4, '#e8ffe8'); for (let i = -4; i <= 4; i++) seg(g, [[i * 60, 0], [i * 60 + 40, -70 + Math.abs(i) * 8]], 3, alpha('#e8ffe8', 0.8)); g.restore();
  label(g, 'STRONG FOR ITS SIZE', E.W * 0.5, E.H * 0.14, { size: 56, color: GOLD(), glow: true, a: ease.out(prog(t, 0.4, 0.8)) });
} });

// s165 — "and an elephant can't jump."  the elephant crouches to jump and stays on the ground
registerShot('s165', { draw(g, t, info) {
  bp(g); const sq = Math.max(0, Math.sin(Math.min(1, t / 1.4) * Math.PI)), y = E.H * 0.6; seg(g, [[-100, y + 240], [E.W + 100, y + 240]], 4, alpha(BP(), 0.6)); elephant(g, E.W * 0.42, y, 0.9, sq);
  if (t > 1.3) for (let i = 0; i < 6; i++) { const d = t - 1.3; circle(g, E.W * 0.42 - 250 + i * 100, y + 230 - d * 40, 20 + d * 30, alpha(BP(), 0.3 * Math.max(0, 1 - d))); }
  g.save(); g.setLineDash([16, 12]); g.strokeStyle = GOLD(); g.lineWidth = 6; g.beginPath(); g.moveTo(E.W * 0.78, E.H * 0.7); g.lineTo(E.W * 0.78, E.H * 0.3); g.stroke(); g.restore(); poly(g, [[E.W * 0.78 - 26, E.H * 0.32], [E.W * 0.78 + 26, E.H * 0.32], [E.W * 0.78, E.H * 0.26]], GOLD());
  crossMark(g, E.W * 0.78, E.H * 0.48, 2.2, CORAL(), prog(t, 1.2, 1.7)); label(g, 'TOO HEAVY TO JUMP', E.W * 0.5, E.H * 0.13, { size: 54, color: CORAL(), glow: true, a: ease.out(prog(t, 1.4, 1.8)) });
} });

// s166 — "So the real superpower isn't strength."  BIG FACE: thoughtful, the egg in your fingers
registerShot('s166', { draw(g, t, info) {
  const k = t / info.dur, cx = E.W * 0.4, cy = E.H * 0.58, r = 310 * (1 + 0.04 * k);
  blurLayer(g, 14, (g) => steelRoom(g, t, { z: 1.4, x: -200, y: -40 })); glow(g, cx, cy - 240, 700, '#fff2d8', 0.3);
  heroFace(g, cx, cy, r, { outfit: YOU, expr: 'thinking', look: [0.7, 0.4], rimColor: '#ffe2a8', rimSide: 1, blink: (t % 2.8) > 2.66 });
  glow(g, E.W * 0.75, E.H * 0.58, 240, GOLD(), 0.3); egg(g, E.W * 0.75, E.H * 0.58, 1.6, { rim: alpha('#ffe2a8', 0.9) });
} });

// s167 — "It's the brakes."  INSERT: the egg resting whole in your gentle palm, gold glow, the brake icon
registerShot('s167', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 16, (g) => steelRoom(g, t, { z: 1.5, x: -100, y: 120 })); glow(g, E.W * 0.5, E.H * 0.42, 600, GOLD(), 0.4 + 0.1 * Math.sin(t * 3));
  palmUp(g, E.W * 0.5, E.H * 0.66, 1.05, { sleeve: YOU.color }); egg(g, E.W * 0.5, E.H * 0.53, 2.4, { rim: alpha('#ffe2a8', 0.9), glowC: GOLD() });
  brakeIcon(g, E.W * 0.5, E.H * 0.2, 62, prog(t, 0.2, 0.6)); label(g, 'THE BRAKES', E.W * 0.5, E.H * 0.9, { size: 52, color: GOLD(), glow: true, a: ease.out(prog(t, 0.5, 0.9)) });
} });
