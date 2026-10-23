// stones.js — the six stones (our own design: hexagonal crystals, not anyone else's gems) and their light effects.
import { glow, alpha, lerp, clamp, circle, seg } from '/engine/core.js';
export { STONES, emblem } from './look.js';

const FACE = (g) => { g.beginPath(); g.moveTo(0, -34); g.lineTo(22, -14); g.lineTo(22, 16); g.lineTo(0, 34); g.lineTo(-22, 16); g.lineTo(-22, -14); g.closePath(); };
// one crystal: o = { glow 0..1, rot, t (pulse) }
export function stone(g, x, y, s, col, o = {}) {
  const pulse = 1 + 0.06 * Math.sin((o.t || 0) * 4);
  if (o.glow !== 0) glow(g, x, y, 80 * s * pulse, col, 0.5 * (o.glow ?? 1));
  g.save(); g.translate(x, y); g.rotate(o.rot || 0); g.scale(s, s);
  g.fillStyle = col; FACE(g); g.fill();
  g.fillStyle = alpha('#000000', 0.18); g.beginPath(); g.moveTo(0, 34); g.lineTo(22, 16); g.lineTo(22, -14); g.lineTo(0, -6); g.closePath(); g.fill();   // shaded side
  g.fillStyle = alpha('#ffffff', 0.5); g.beginPath(); g.moveTo(0, -34); g.lineTo(22, -14); g.lineTo(0, -6); g.lineTo(-22, -14); g.closePath(); g.fill();   // top facet
  g.fillStyle = alpha('#ffffff', 0.8); g.beginPath(); g.moveTo(-14, -16); g.lineTo(-6, -22); g.lineTo(-10, 6); g.closePath(); g.fill();                  // glint
  g.strokeStyle = alpha('#16141f', 0.55); g.lineWidth = 3; FACE(g); g.stroke();
  g.restore();
}
// a falling light (the stones arriving): head at k (0..1) along the line, a fading tail behind it
export function streak(g, x0, y0, x1, y1, k, col, s = 1) {
  if (k <= 0) return; const kk = clamp(k), hx = lerp(x0, x1, kk), hy = lerp(y0, y1, kk), tk = Math.max(0, kk - 0.35), tx = lerp(x0, x1, tk), ty = lerp(y0, y1, tk);
  const gr = g.createLinearGradient(tx, ty, hx, hy); gr.addColorStop(0, alpha(col, 0)); gr.addColorStop(1, alpha(col, 0.9));
  g.save(); g.globalCompositeOperation = 'lighter'; g.strokeStyle = gr; g.lineCap = 'round'; g.lineWidth = 10 * s; g.beginPath(); g.moveTo(tx, ty); g.lineTo(hx, hy); g.stroke(); g.restore();
  glow(g, hx, hy, 60 * s, col, 0.8); circle(g, hx, hy, 7 * s, '#ffffff');
}
// a teleport blink: a puff of light rings at (x, y), k 0..1
export function blink(g, x, y, k, col = '#3ad8ff') {
  if (k <= 0 || k >= 1) return; glow(g, x, y, 220 * (1 - k * 0.5), col, 0.9 * (1 - k));
  for (let i = 0; i < 3; i++) { const r = 40 + k * 260 + i * 40; g.strokeStyle = alpha(col, 0.8 * (1 - k)); g.lineWidth = 8 - i * 2; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.stroke(); }
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2, r1 = 60 + k * 300; seg(g, [[x + Math.cos(a) * r1 * 0.6, y + Math.sin(a) * r1 * 0.6], [x + Math.cos(a) * r1, y + Math.sin(a) * r1]], 5, alpha('#ffffff', 0.8 * (1 - k))); }
}
