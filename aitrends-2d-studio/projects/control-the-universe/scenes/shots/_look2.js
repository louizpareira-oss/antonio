// look test 2 (not part of the video): the two-tone superhero suit, blue + red vs blue + orange.
import { E, registerShot, rr, alpha, linGrad, glow, text, FONTS, measure } from '/engine/core.js';
import { POSES } from '/engine/rig2d.js';
import { person, bigFaceV2 } from '../look.js';
import { SUITS } from '../cast.js';
const BASE = { top: 'hoodie', color: '#2E72D2', legs: '#2a3140', shoes: '#f6f2ea', hair: 'none' };
function label(g, str, x, y) { const w = measure(g, str, 30, FONTS.ui, 900) + 40; rr(g, x - w / 2, y - 25, w, 50, 25); g.fillStyle = alpha('#16141f', 0.85); g.fill(); text(g, str, x, y + 1, { size: 30, font: FONTS.ui, weight: 900, color: '#fff1dc', spacing: 3 }); }
registerShot('look', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#2a2456', '#5a3a7a', '#f0905a']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const gy = 900; g.fillStyle = '#2a2238'; g.fillRect(-E.W, gy, E.W * 3, E.H);
  const RIM = { color: '#ffc68a', dir: [-0.8, -0.5] };
  [['red', 'A · BLUE + RED', 0], ['orange', 'B · BLUE + ORANGE', 960]].forEach(([k, lab, X]) => {
    const of = { ...BASE, ...SUITS[k], emblem: 6 };
    glow(g, X + 480, 500, 420, k === 'red' ? '#ff6a5a' : '#ffb070', 0.25);
    person(g, { x: X + 250, y: gy, s: 2.6, facing: 1, outfit: { ...of, wind: 0.6 }, pose: POSES.relaxed, expr: 'smile', look: [0.6, 0], rim: RIM });
    bigFaceV2(g, X + 690, 430, 165, { outfit: of, expr: 'grin', look: [-0.4, 0], rim: '#ffc68a' });
    label(g, lab, X + 480, gy + 80);
  });
  g.fillStyle = alpha('#ffffff', 0.25); g.fillRect(958, 80, 4, 900);
} });
