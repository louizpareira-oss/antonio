// props.js — small things the shots share: the frozen coffee, the mug, a big hand (palm toward camera), the 7:59 clock.
import { rr, seg, circle, poly, alpha, shade, glow, text, FONTS, lerp } from '/engine/core.js';

export const MOON = { color: '#b8ccff', dir: [0.6, -0.6] };
const BROWN = '#6a3a1a';
// the coffee frozen in mid-air: a curling tongue of coffee with droplets (o.hang = a floating blob instead)
export function coffee(g, x, y, s = 1, t = 0, hang = false) {
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = BROWN; g.beginPath();
  if (hang) { g.moveTo(-70, 0); g.bezierCurveTo(-80, -40, -30, -60, 0, -50); g.bezierCurveTo(40, -70, 90, -40, 70, 0); g.bezierCurveTo(60, 30, -60, 30, -70, 0); }
  else { g.moveTo(-120, -60); g.bezierCurveTo(-60, -120, 20, -110, 60, -60); g.bezierCurveTo(90, -20, 70, 30, 30, 40); g.bezierCurveTo(50, 0, 30, -40, -10, -50); g.bezierCurveTo(-50, -60, -90, -40, -120, -60); }
  g.fill();
  g.fillStyle = alpha('#ffffff', 0.35 + 0.1 * Math.sin(t * 3)); g.beginPath(); g.ellipse(hang ? -20 : -20, hang ? -38 : -88, 26, 7, -0.2, 0, Math.PI * 2); g.fill();
  for (const [dx, dy, r] of (hang ? [[-100, -40, 9], [95, -50, 7], [20, -95, 6], [-40, 40, 5]] : [[90, -110, 12], [120, -60, 8], [-60, -140, 9], [10, -150, 6], [80, 60, 7], [40, 90, 5]])) { circle(g, dx, dy, r, BROWN); circle(g, dx - r * 0.3, dy - r * 0.3, r * 0.3, alpha('#ffffff', 0.4)); }
  g.restore();
}
// a white mug (rot in radians around its middle)
export function mug(g, x, y, s = 1, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.strokeStyle = '#f6f2ea'; g.lineWidth = 14; g.beginPath(); g.arc(52, 0, 26, -1.3, 1.3); g.stroke();
  rr(g, -50, -60, 100, 120, 14); g.fillStyle = '#f6f2ea'; g.fill(); g.fillStyle = alpha('#000000', 0.08); g.fillRect(22, -56, 22, 112);
  rr(g, -50, -20, 100, 22, 4); g.fillStyle = '#d8343a'; g.fill();
  g.restore();
}
// a big hand toward the camera (palm up), with its sleeve; o.open 0 (fist) .. 1 (open), o.sleeve colour, o.glove colour
export function hand(g, x, y, s = 1, o = {}) {
  const k = o.open ?? 1, skin = o.glove || '#1d1b22';
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -80, 30, 160, 260, 40); g.fillStyle = o.sleeve || '#2E72D2'; g.fill(); rr(g, -84, 30, 168, 40, 16); g.fillStyle = shade(o.sleeve || '#2E72D2', -0.2); g.fill();
  if (o.cuff) { rr(g, -84, 20, 168, 26, 10); g.fillStyle = o.cuff; g.fill(); }
  g.fillStyle = skin; g.beginPath(); g.ellipse(0, -20, 78, 70, 0, 0, Math.PI * 2); g.fill();
  [[-54, -0.38], [-18, -0.12], [18, 0.1], [52, 0.34]].forEach(([dx, a]) => { const L = lerp(26, 92, k); g.save(); g.translate(dx, -60); g.rotate(a * k); rr(g, -15, -L, 30, L + 20, 15); g.fillStyle = skin; g.fill(); g.restore(); });
  g.save(); g.translate(-70, -10); g.rotate(-0.9 - 0.4 * k); rr(g, -15, -lerp(30, 70, k), 30, lerp(30, 70, k) + 20, 15); g.fillStyle = skin; g.fill(); g.restore();
  g.fillStyle = alpha('#ffffff', 0.08); g.beginPath(); g.ellipse(-20, -30, 40, 30, -0.4, 0, Math.PI * 2); g.fill();
  g.restore();
}
// the 7:59 bedside/kitchen clock card
export function clock759(g, x, y, s = 1, t = 0, str = '7:59') {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -150, -70, 300, 140, 26); g.fillStyle = '#16121a'; g.fill();
  text(g, str, 0, 4, { size: 100, font: FONTS.ui, weight: 900, color: '#ff5a4a', glow: 22, glowColor: 'rgba(255,90,70,.7)' });
  g.restore();
}
// a city bus (side view, facing right), wheels on y
export function bus(g, x, y, s = 1, col = '#2E9ad0') {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -330, -250, 660, 220, 28); g.fillStyle = col; g.fill(); g.fillStyle = shade(col, -0.2); g.fillRect(-330, -80, 660, 40);
  for (let i = 0; i < 6; i++) { rr(g, -300 + i * 100, -220, 84, 90, 10); g.fillStyle = '#cfeaf8'; g.fill(); }
  rr(g, 250, -220, 66, 170, 8); g.fillStyle = '#9ac8e0'; g.fill();
  for (const dx of [-210, 210]) { circle(g, dx, -30, 44, '#2a2a34'); circle(g, dx, -30, 18, '#9aa4ae'); }
  g.restore();
}
// a time-freeze ring rushing out from (x, y): k 0..1
export function freezeRing(g, x, y, k, col = '#9ad8ff') {
  if (k <= 0 || k >= 1) return; const r = 30 + k * 1600;
  g.strokeStyle = alpha(col, 0.8 * (1 - k)); g.lineWidth = 20 * (1 - k) + 4; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.stroke();
  glow(g, x, y, 200 * (1 - k), col, 0.8 * (1 - k));
}
