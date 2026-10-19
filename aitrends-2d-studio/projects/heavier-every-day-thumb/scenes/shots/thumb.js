// thumbnail concepts for "What If You Got 2x Heavier Every Single Day?" — the video's own stick-figure hero and sets, in
// the viral What-If style: one big face, one strong contrasting prop; the 2-line text is added by finish.py.
import { E, S, registerShot, layer, blurLayer, veil, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, linGrad, text, FONTS, rng } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import { underwater, river } from '/projects/heavier-every-day/scenes/sets/world.js';
import { YOU } from '/projects/heavier-every-day/scenes/cast.js';
import { heroFace, hand, limitSign, cracks, CORAL } from '/projects/heavier-every-day/scenes/lib.js';

// lifeguard ring (red/white), seen from below at the surface
function lifeRing(g, x, y, r) { g.save(); g.translate(x, y); g.scale(1, 0.45); for (let i = 0; i < 8; i++) { g.strokeStyle = i % 2 ? '#ffffff' : '#e8341f'; g.lineWidth = r * 0.42; g.beginPath(); g.arc(0, 0, r, i * Math.PI / 4, (i + 1) * Math.PI / 4); g.stroke(); } g.restore(); glow(g, x, y, r * 2, '#ffffff', 0.25); }

// A — "I CAN'T FLOAT.": you sinking, scared, reaching up; the lifeguard ring far above at the bright surface
registerShot('thumbA', { draw(g) {
  underwater(g, 0, { z: 1.0, x: 0, y: 120 }, {}); g.fillStyle = linGrad(g, 0, 0, 0, E.H * 0.3, [alpha('#e8fbff', 0.85), alpha('#a8e4f0', 0)]); g.fillRect(0, 0, E.W, E.H * 0.3);
  FX.godRays(g, E.W * 0.7, -100, { angle: Math.PI / 2 + 0.1, spread: 0.7, len: 1600, color: '#ffffff', a: 0.22, t: 0 }); lifeRing(g, E.W * 0.74, E.H * 0.07, 120);
  const cx = E.W * 0.66, cy = E.H * 0.62, r = 270; glow(g, cx, cy, 600, '#e8fff8', 0.35);
  hand(g, E.W * 0.9, E.H * 0.3, 1.5, { from: [E.W * 0.86, E.H + 300], sleeve: YOU.color, open: 1, rim: { color: '#e8fff8', dir: [0, -1] } });
  heroFace(g, cx, cy, r, { outfit: YOU, expr: 'scared', look: [0.5, -0.8], rimColor: '#e8fff8', rimSide: 1 });
  const rr2 = rng(4); for (let i = 0; i < 26; i++) { const bx = cx - 40 + (rr2() - 0.5) * 260, by = cy - r - 40 - rr2() * 560, br = 8 + rr2() * 24; ring(g, bx, by, br, 4, alpha('#ffffff', 0.85)); circle(g, bx - br * 0.3, by - br * 0.3, br * 0.25, alpha('#ffffff', 0.9)); }
} });

// B — "TOO HEAVY.": your worried face; the 10 t bridge sign, the deck cracking under a 36 t badge
registerShot('thumbB', { draw(g) {
  blurLayer(g, 6, (g) => river(g, 0, { z: 1.5, x: -300, y: 80 }, { time: 'dusk', noSign: true })); veil(g, 'rgba(30,10,30,.2)'); glow(g, E.W * 0.7, E.H * 0.4, 800, '#ffb880', 0.45);
  g.fillStyle = '#5a5048'; poly(g, [[E.W * 0.3, E.H * 0.98], [E.W * 1.1, E.H * 0.7], [E.W * 1.1, E.H * 0.78], [E.W * 0.3, E.H * 1.1]]); cracks(g, E.W * 0.62, E.H * 0.86, 260, 1, { seed: 7, color: '#14101a', w: 9, arms: 9, rings: 1 });
  limitSign(g, E.W * 0.76, E.H * 0.64, 1.6, '10 t'); seg(g, [[E.W * 0.66, E.H * 0.42], [E.W * 0.86, E.H * 0.86]], 26, CORAL()); seg(g, [[E.W * 0.66, E.H * 0.42], [E.W * 0.86, E.H * 0.86]], 10, '#ffffff');
  const cx = E.W * 0.3, cy = E.H * 0.6, r = 280; glow(g, cx, cy, 560, '#fff2d8', 0.35);
  heroFace(g, cx, cy, r, { outfit: YOU, expr: 'worried', look: [0.7, -0.1], rimColor: '#ffd8a8', rimSide: 1 });
  for (const [dx, dy] of [[-0.75, -0.55], [0.8, -0.4]]) { g.fillStyle = '#8fd8ff'; g.beginPath(); g.ellipse(cx + dx * r, cy + dy * r, 16, 24, 0, 0, Math.PI * 2); g.fill(); }
  rr(g, cx + r * 0.6, cy + r * 0.55, 330, 140, 70); g.fillStyle = 'rgba(10,12,24,.9)'; g.fill(); g.strokeStyle = CORAL(); g.lineWidth = 6; g.stroke(); text(g, '36 t', cx + r * 0.6 + 165, cy + r * 0.55 + 74, { size: 100, color: CORAL(), font: FONTS.ui, weight: 900 });
} });
