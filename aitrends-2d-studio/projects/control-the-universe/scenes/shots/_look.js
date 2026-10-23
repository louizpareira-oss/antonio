// look test (not part of the video): the superhero hoodie in 3 stages, a close-up, and the six stones.
import { E, registerShot, rr, alpha, linGrad, glow, text, FONTS, measure, circle } from '/engine/core.js';
import { POSES } from '/engine/rig2d.js';
import { person, bigFaceV2, STONES, emblem } from '../look.js';
import { YOU, YOU1, YOU3, HERO } from '../cast.js';

function label(g, str, x, y) { const w = measure(g, str, 24, FONTS.ui, 900) + 34; rr(g, x - w / 2, y - 21, w, 42, 21); g.fillStyle = alpha('#16141f', 0.85); g.fill(); text(g, str, x, y + 1, { size: 24, font: FONTS.ui, weight: 900, color: '#fff1dc', spacing: 2 }); }
function stone(g, x, y, s, col) {
  glow(g, x, y, 70 * s, col, 0.55);
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = col; g.beginPath(); g.moveTo(0, -34); g.lineTo(22, -14); g.lineTo(22, 16); g.lineTo(0, 34); g.lineTo(-22, 16); g.lineTo(-22, -14); g.closePath(); g.fill();
  g.fillStyle = alpha('#ffffff', 0.45); g.beginPath(); g.moveTo(0, -34); g.lineTo(22, -14); g.lineTo(0, -6); g.lineTo(-22, -14); g.closePath(); g.fill();
  g.strokeStyle = alpha('#16141f', 0.6); g.lineWidth = 3; g.beginPath(); g.moveTo(0, -34); g.lineTo(22, -14); g.lineTo(22, 16); g.lineTo(0, 34); g.lineTo(-22, 16); g.lineTo(-22, -14); g.closePath(); g.stroke(); g.restore();
}
registerShot('look', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#2a2456', '#5a3a7a', '#f0905a']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const gy = 860; g.fillStyle = '#2a2238'; g.fillRect(-E.W, gy, E.W * 3, E.H);
  glow(g, 1500, 520, 520, '#ffb070', 0.35);
  const RIM = { color: '#ffc68a', dir: [-0.8, -0.5] };
  [[YOU, 'NO STONES', 230], [YOU1, '1 STONE', 520], [YOU3, '3 STONES', 810], [HERO, 'ALL SIX', 1110]].forEach(([of, lab, x], i) => {
    person(g, { x, y: gy, s: 1.75, facing: 1, outfit: { ...of, wind: i === 3 ? 0.5 : 0 }, pose: i === 3 ? POSES.relaxed : POSES.stand, expr: i === 3 ? 'smile' : 'neutral', look: [0.6, 0], rim: RIM });
    label(g, lab, x + 10, gy + 70); });
  bigFaceV2(g, 1600, 440, 190, { outfit: HERO, expr: 'grin', look: [-0.4, 0], rim: '#ffc68a' });
  STONES.forEach(([n, col], i) => { const x = 330 + i * 230, y = 140; stone(g, x, y, 1.1, col); text(g, n, x, y + 70, { size: 26, font: FONTS.ui, weight: 900, color: '#ffffff', spacing: 3 }); });
} });
