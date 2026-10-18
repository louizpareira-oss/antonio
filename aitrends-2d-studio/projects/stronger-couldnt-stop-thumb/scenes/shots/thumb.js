// thumbnail concepts for "What If You Got Stronger and Couldn't Stop?" — the video's own stick-figure cast and sets,
// in the viral What-If thumbnail style: one big face, one strong prop, 2–3 heavy words in white + yellow.
import { E, S, registerShot, layer, blurLayer, veil, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, linGrad, radGrad, text, FONTS, rng } from '/engine/core.js';
import { drawFigure, POSES } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { hospital } from '/projects/stronger-couldnt-stop/scenes/sets/hospital.js';
import { nursery, crib } from '/projects/stronger-couldnt-stop/scenes/sets/home.js';
import { YOU, MOM } from '/projects/stronger-couldnt-stop/scenes/cast.js';
import { heroFace, hand, baby, cracks, GOLD } from '/projects/stronger-couldnt-stop/scenes/lib.js';

const YEL = '#FFD640', WARM = '#ffd28a';
const HOLD = { ...POSES.holdFront, hF: [34, -150], eF: [22, -132], hB: [26, -146], eB: [14, -128] };
// heavy thumbnail type: thick black outline + drop shadow
function bigText(g, str, x, y, size, color = '#ffffff', align = 'center') {
  text(g, str, x + size * 0.04, y + size * 0.06, { size, color: '#000', font: FONTS.title, weight: 700, align, stroke: size * 0.2, strokeColor: '#000' });
  text(g, str, x, y, { size, color, font: FONTS.title, weight: 700, align, stroke: size * 0.16, strokeColor: '#06050a' });
  text(g, str, x, y, { size, color, font: FONTS.title, weight: 700, align });
}
function tears(g, cx, cy, r) { for (const sx of [-1, 1]) { g.fillStyle = '#8fd8ff'; g.beginPath(); g.ellipse(cx + sx * r * 0.36, cy + r * 0.2, r * 0.07, r * 0.12, 0, 0, Math.PI * 2); g.fill(); seg(g, [[cx + sx * r * 0.34, cy - r * 0.02], [cx + sx * r * 0.36, cy + r * 0.2]], r * 0.05, '#8fd8ff'); circle(g, cx + sx * r * 0.33, cy + r * 0.15, r * 0.025, '#ffffff'); } }
function chips(g, x, y, n, spread, seed) { const r = rng(seed); for (let i = 0; i < n; i++) { g.save(); g.translate(x + (r() - 0.5) * spread, y + (r() - 0.5) * spread * 0.8); g.rotate(r() * 6); const s = 8 + r() * 14; poly(g, [[-s, -s * 0.6], [s, -s * 0.8], [s * 0.4, s]], '#b8aca0'); g.restore(); } }

// A — "I CAN'T HOLD HER.": you crying, your hands cracking with gold; mom holds Lily on the right
registerShot('thumbA', { draw(g) {
  g.fillStyle = linGrad(g, 0, 0, E.W, E.H, ['#0c1636', '#16305a', '#1c4a6a']); g.fillRect(0, 0, E.W, E.H); glow(g, E.W * 0.8, E.H * 0.72, 760, '#ffb860', 0.7); glow(g, E.W * 0.27, E.H * 0.45, 640, '#5aa8ff', 0.35);
  for (let i = 0; i < 40; i++) { const r = rng(i + 3); circle(g, r() * E.W, r() * E.H, 2 + r() * 4, alpha('#ffe2b0', 0.25 * r())); }
  drawFigure(g, { x: E.W * 0.8, y: E.H * 1.32, s: 3.3, facing: -1, outfit: MOM, pose: HOLD, expr: 'happy', look: [-0.3, 0.6], rim: { color: WARM, dir: [-1, -0.3], w: 8 } });
  baby(g, E.W * 0.8 - 3.3 * 30, E.H * 1.32 - 3.3 * 154, 1.3, { expr: 'smile', rot: 0.2, rim: alpha('#fff2f6', 0.95) });
  glow(g, E.W * 0.27, E.H * 0.5, 600, '#fff2d8', 0.35);
  const cx = E.W * 0.27, cy = E.H * 0.52, r = 300;
  heroFace(g, cx, cy, r, { outfit: YOU, expr: 'cry', look: [0.7, 0.3], rimColor: '#ffe2a8', rimSide: 1 }); tears(g, cx, cy, r);
  for (const [hx, fx] of [[E.W * 0.12, E.W * 0.02], [E.W * 0.43, E.W * 0.5]]) {
    glow(g, hx, E.H * 0.86, 220, GOLD(), 0.5); hand(g, hx, E.H * 0.86, 1.5, { from: [fx, E.H + 380], sleeve: YOU.color, open: 1, rim: { color: '#ffe2a8', dir: [0, -1] } });
    cracks(g, hx, E.H * 0.86 + 20, 70, 1, { seed: hx | 0, color: '#ffe066', w: 5, arms: 6, rings: 0, glowCol: GOLD() }); chips(g, hx, E.H * 0.74, 9, 260, hx | 0); }
} });

// B — "SHE'S STRONGER.": your shocked face; baby Lily with gold eyes, giggling, holding a bent crib bar
registerShot('thumbB', { draw(g) {
  blurLayer(g, 12, (g) => nursery(g, 0, { z: 1.3, x: 300, y: 60 }, { night: true })); veil(g, 'rgba(14,8,30,.4)'); glow(g, E.W * 0.66, E.H * 0.6, 760, GOLD(), 0.45);
  const bx = E.W * 0.68, by = E.H * 0.74, s = 2.8;
  const bar = (pts, w = 30) => { g.lineCap = 'round'; g.lineJoin = 'round'; for (const [lw, c] of [[w + 16, '#000'], [w, '#efe6d6']]) { g.strokeStyle = c; g.lineWidth = lw; g.beginPath(); g.moveTo(...pts[0]); g.quadraticCurveTo(...pts[1], ...pts[2]); g.stroke(); } };
  g.fillStyle = '#000'; g.fillRect(E.W * 0.38, by + 40, E.W * 0.7, 40); g.fillStyle = '#efe6d6'; g.fillRect(E.W * 0.38, by + 48, E.W * 0.7, 24);
  bar([[E.W * 0.44, by + 60], [E.W * 0.42, by - 200], [E.W * 0.47, by - 520]]); bar([[E.W * 0.96, by + 60], [E.W * 0.98, by - 260], [E.W * 0.9, by - 560]]);
  bar([[E.W * 0.52, by + 60], [E.W * 0.36, by - 120], [E.W * 0.34, by - 330]]); bar([[E.W * 0.88, by + 60], [E.W * 1.04, by - 140], [E.W * 1.06, by - 360]]);
  glow(g, bx - 60, by - 320, 300, '#fff2d0', 0.5); bar([[bx - 18 * s - 160, by - 96 * s + 160], [bx - 18 * s, by - 96 * s - 60], [bx - 18 * s + 120, by - 96 * s - 260]], 34);
  baby(g, bx, by, s, { expr: 'giggle', glint: 1, hand: -1.2, rim: alpha('#ffe2a8', 0.95) });
  for (let i = 0; i < 6; i++) FX.sparkle(g, bx - 520 + i * 160, by - 360 + (i % 2) * 60, 26, '#ffe066', 0.9);
  const cx = E.W * 0.2, cy = E.H * 0.72, r = 250; glow(g, cx, cy, 500, '#fff2d8', 0.3);
  heroFace(g, cx, cy, r, { outfit: YOU, expr: 'shocked', look: [0.8, 0], rimColor: '#ffe2a8', rimSide: 1 });
  for (const [dx, dy] of [[-0.75, -0.55], [0.8, -0.4]]) { g.fillStyle = '#8fd8ff'; g.beginPath(); g.ellipse(cx + dx * r, cy + dy * r, 14, 22, 0, 0, Math.PI * 2); g.fill(); }
} });
