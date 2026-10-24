// brand.js — "Unreal Science" channel art: the hero of "Can One Person Really Control the Universe?" in his suit,
// the six stones and a cosmic burst (the GOD MODE thumbnail look).
// Logical stage 1920x1080 (rendered at 2560x1440). Banner safe area for every device: 1546x423 px -> logical 1160x317,
// centred (x 380..1540, y 381..698). Avatar = centre 1080x1080 square, cropped later and shown as a circle.
import { E, registerShot, circle, alpha, glow, linGrad, radGrad, text, FONTS } from '/engine/core.js';
import { POSES } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { person, bigFaceV2 } from '/projects/control-the-universe/scenes/look.js';
import { YOU, HERO } from '/projects/control-the-universe/scenes/cast.js';
import { stone, STONES } from '/projects/control-the-universe/scenes/stones.js';

const SAFE = { x: 380, y: 381, w: 1160, h: 317 };
const YELLOW = '#ffd23a', INK = '#0b0820';

// deep space lit by a radial burst of purple / magenta / white rays from (cx, cy)
function burst(g, cx, cy, R, o = {}) {
  const { rays = 36, seed = 1 } = o;
  g.fillStyle = radGrad(g, cx, cy, 0, R, ['#fff4fb', '#ff8ad8', '#b04be0', '#4a1f9a', '#140a3a']); g.fillRect(0, 0, E.W, E.H);
  g.save(); g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2 + ((i * 7 + seed) % 5) * 0.02, w = 0.035 + ((i * 13 + seed) % 7) * 0.006, L = R * (1.1 + ((i * 11) % 6) * 0.12);
    g.fillStyle = radGrad(g, cx, cy, 0, L, [alpha('#ffffff', 0.55), alpha('#ffb8ff', 0.22), alpha('#ffb8ff', 0)]);
    g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, L, a - w, a + w); g.closePath(); g.fill();
  }
  g.restore();
}
// a small flat planet with a ring
function planet(g, x, y, r, col, ring) {
  glow(g, x, y, r * 2.4, col, 0.35);
  if (ring) { g.save(); g.strokeStyle = alpha(ring, 0.9); g.lineWidth = r * 0.16; g.beginPath(); g.ellipse(x, y, r * 1.8, r * 0.5, -0.35, Math.PI, Math.PI * 2); g.stroke(); g.restore(); }
  g.save(); g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.clip();
  g.fillStyle = linGrad(g, x - r, y - r, x + r, y + r, [col, alpha(INK, 0.9)]); g.fillRect(x - r, y - r, r * 2, r * 2);
  g.fillStyle = alpha('#ffffff', 0.18); for (let i = -2; i <= 2; i++) g.fillRect(x - r, y + i * r * 0.36, r * 2, r * 0.1);
  g.restore();
  g.strokeStyle = INK; g.lineWidth = r * 0.08; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.stroke();
  if (ring) { g.save(); g.strokeStyle = alpha(ring, 0.9); g.lineWidth = r * 0.16; g.beginPath(); g.ellipse(x, y, r * 1.8, r * 0.5, -0.35, 0, Math.PI); g.stroke(); g.restore(); }
}
// the six stones on an orbit around (cx, cy): front half drawn after the hero
function orbit(g, cx, cy, rx, ry, s, half) {
  g.save(); g.strokeStyle = alpha('#ffffff', 0.45); g.lineWidth = 4; g.beginPath(); g.ellipse(cx, cy, rx, ry, -0.18, half > 0 ? 0 : Math.PI, half > 0 ? Math.PI : Math.PI * 2); g.stroke(); g.restore();
  STONES.forEach(([, col], i) => {
    const a = -Math.PI / 2 + 0.5 + i * Math.PI / 3, front = Math.sin(a) > 0;
    if ((half > 0) !== front) return;
    const x = cx + Math.cos(a) * rx, y = cy + Math.sin(a) * ry + Math.cos(a) * rx * -0.18;
    stone(g, x, y, s * (front ? 1.1 : 0.85), col, { rot: a * 0.3, glow: 1 });
  });
}
function bigWord(g, str, x, y, size, color, glowColor, align = 'left') {
  text(g, str, x, y, { size, color: INK, font: FONTS.title, weight: 700, align, spacing: 4, stroke: size * 0.2, strokeColor: INK });
  text(g, str, x, y, { size, color, font: FONTS.title, weight: 700, align, spacing: 4, glow: size * 0.3, glowColor });
}

registerShot('banner', { draw(g) {
  const hx = 600, feet = 676;                                   // the hero floats on the left of the safe area
  burst(g, hx, 520, 1250, { rays: 44 });
  FX.stars(g, 0, { seed: 9, count: 260, area: [0, 0, E.W, E.H] });
  // darker band behind the name so it reads on every device
  g.fillStyle = radGrad(g, 1150, 540, 40, 620, ['rgba(14,8,40,.72)', 'rgba(14,8,40,.4)', 'rgba(14,8,40,0)']); g.fillRect(0, 0, E.W, E.H);
  // planets in the desktop / TV strips only (phones see just the safe area)
  planet(g, 1740, 330, 70, '#3ad8ff', '#ffd23a');
  planet(g, 190, 780, 46, '#ff7a3a', null);
  planet(g, 1650, 820, 30, '#4fe08a', null);
  planet(g, 250, 250, 26, '#ffd23a', null);
  // the hero, arms up, the stones circling him
  glow(g, hx, 470, 330, '#ffffff', 0.55);
  orbit(g, hx, 560, 220, 70, 0.62, -1);
  person(g, { x: hx, y: feet, s: 1.32, facing: 1, outfit: HERO, pose: POSES.cheer, expr: 'grin', look: [0.4, -0.3], rim: { color: '#ffffff', w: 6 }, shadow: false });
  orbit(g, hx, 560, 220, 70, 0.62, 1);
  // the name
  const tx = 860;
  bigWord(g, 'UNREAL', tx, 470, 168, '#ffffff', 'rgba(255,140,230,.9)');
  bigWord(g, 'SCIENCE', tx, 612, 168, YELLOW, 'rgba(255,170,40,.9)');
  text(g, 'IMPOSSIBLE IDEAS. REAL SCIENCE.', tx + 6, 686, { size: 34, color: '#ffffff', font: FONTS.ui, weight: 900, align: 'left', spacing: 6, stroke: 9, strokeColor: 'rgba(11,8,32,.9)' });
} });

// a swept-up quiff (in head radii): rim = the white outline drawn behind the head, else the hair itself + two sheen strands
const QUIFF = [[-0.98, -0.3], [-1.08, -0.78], [-0.82, -0.98], [-0.7, -1.3], [-0.36, -1.14], [-0.1, -1.46], [0.18, -1.2], [0.56, -1.42], [0.62, -1.08], [1.04, -1.06], [0.92, -0.72], [1.0, -0.36],
  [0.74, -0.5], [0.5, -0.64], [0.3, -0.46], [0.06, -0.62], [-0.2, -0.46], [-0.46, -0.62], [-0.72, -0.46]];
function hair(g, cx, cy, r, rim) {
  const P = QUIFF.map(([x, y]) => [cx + x * r, cy + y * r]);
  g.save(); g.beginPath(); g.moveTo(...P[0]); for (let i = 1; i <= P.length; i++) { const a = P[i % P.length], b = P[(i + 1) % P.length]; g.quadraticCurveTo(a[0], a[1], (a[0] + b[0]) / 2, (a[1] + b[1]) / 2); } g.closePath();
  g.lineJoin = 'round';
  if (rim) { g.strokeStyle = '#ffffff'; g.lineWidth = r * 0.1; g.stroke(); g.restore(); return; }
  g.fillStyle = INK; g.fill();
  g.strokeStyle = '#3a3650'; g.lineWidth = r * 0.045; g.lineCap = 'round';
  for (const [x0, y0, x1, y1, x2, y2] of [[-0.6, -0.62, -0.5, -0.95, -0.2, -1.15], [0.0, -0.66, 0.15, -0.95, 0.45, -1.15]]) { g.beginPath(); g.moveTo(cx + x0 * r, cy + y0 * r); g.quadraticCurveTo(cx + x1 * r, cy + y1 * r, cx + x2 * r, cy + y2 * r); g.stroke(); }
  g.restore();
}
registerShot('avatar', { draw(g) {
  // just the character from the video (blue hoodie, no suit) with spiky hair, on a warm sunburst (the user, Oct 24)
  const cx = E.W / 2, hy = 560, r = 270;
  g.fillStyle = radGrad(g, cx, hy - 40, 0, 760, ['#fff6c8', '#ffd23a', '#ff9a2a', '#f0602a']); g.fillRect(0, 0, E.W, E.H);
  g.save(); g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 28; i++) { const a = (i / 28) * Math.PI * 2, w = 0.05; g.fillStyle = radGrad(g, cx, hy - 40, 0, 900, [alpha('#ffffff', 0.35), alpha('#ffffff', 0.12), alpha('#ffffff', 0)]);
    g.beginPath(); g.moveTo(cx, hy - 40); g.arc(cx, hy - 40, 900, a - w, a + w); g.closePath(); g.fill(); }
  g.restore();
  glow(g, cx, hy - 20, r * 1.8, '#ffffff', 0.45);
  hair(g, cx, hy, r, true);                                       // white rim of the hair, behind the head
  bigFaceV2(g, cx, hy, r, { outfit: YOU, expr: 'grin', look: [0, -0.1], rim: '#ffffff' });
  hair(g, cx, hy, r, false);
} });
