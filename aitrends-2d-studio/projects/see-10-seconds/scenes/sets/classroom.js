// sets/classroom.js — school classroom by day: chalkboard on the back wall, tall windows on the right (key light).
import { E, V, mood, layer, backdrop, rng, rr, seg, circle, poly, linGrad, glow, alpha, shade, mix, text, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const classGround = () => E.H * 0.8;
export function classroom(g, t, cam, o = {}) {
  const M = mood(o.mood || 'day'), GY = classGround(), CX = E.W / 2;
  const wall = shade(M.wall, -0.45), wallDark = shade(M.wall, -0.7), sky = mood('day').sky;
  layer(g, cam, 0.6, (g) => {
    g.fillStyle = linGrad(g, 0, -E.H, 0, GY, [shade(wall, -0.25), wall, shade(wall, -0.15)]); g.fillRect(-E.W * 2, -E.H, E.W * 5, GY + E.H);
    g.fillStyle = shade(wall, -0.25); g.fillRect(-E.W * 2, GY - 170, E.W * 5, 12);                         // chair rail
    // chalkboard
    const bx = CX - 620, by = GY - 700, bw = 1000, bh = 400;
    rr(g, bx - 22, by - 22, bw + 44, bh + 44, 10); g.fillStyle = shade(wallDark, -0.3); g.fill();
    g.fillStyle = linGrad(g, bx, by, bx + bw, by + bh, ['#24423a', '#1c352f']); g.fillRect(bx, by, bw, bh);
    g.fillStyle = 'rgba(255,255,255,.04)'; for (let i = 0; i < 6; i++) g.fillRect(bx + 60 + i * 150, by + 40 + (i % 3) * 90, 120, 6);
    if (o.board) text(g, o.board, bx + bw / 2, by + bh * 0.45, { size: 110, color: '#ecebe4', font: FONTS.title, weight: 600, alpha: 0.92 });
    g.fillStyle = shade(wallDark, -0.2); g.fillRect(bx - 10, by + bh + 22, bw + 20, 14);
    // clock + posters
    FX.clock(g, CX + 520, GY - 760, 48, 36000 + t * 30, { face: '#e8e4da' });
    for (const [px, c] of [[CX - 900, '#3a6a8a'], [CX + 480, '#8a5a3a']]) { rr(g, px, GY - 600, 150, 200, 6); g.fillStyle = shade(c, -0.35); g.fill(); g.fillStyle = alpha('#fff', 0.15); g.fillRect(px + 20, GY - 570, 110, 12); g.fillRect(px + 20, GY - 540, 80, 12); }
    // windows on the right
    for (let i = 0; i < 2; i++) {
      const wx = CX + 700 + i * 380, wy = GY - 760, ww = 300, wh = 560;
      FX.windowFrame(g, { x: wx, y: wy, w: ww, h: wh, cols: 2, rows: 3, frame: wallDark, bar: 10 }, (g, x, y, w, h) => {
        g.fillStyle = linGrad(g, 0, y, 0, y + h, sky); g.fillRect(x, y, w, h); FX.tree(g, x + w * 0.4, y + h + 60, 2.2, '#3a5a48');
      });
      FX.godRays(g, wx + 150, wy + 200, { angle: Math.PI * 0.8, spread: 0.5, len: 1600, color: M.key, a: 0.06, t });
    }
  });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, GY - 10, 0, E.H * 2, [shade(M.floor, -0.35), shade(M.floor, -0.7)]); g.fillRect(-E.W * 2, GY - 10, E.W * 5, E.H * 2);
    FX.floorLines(g, GY, E.H * 1.4, 'rgba(0,0,0,.2)', 0.09);
    FX.pool(g, CX + 700, GY + 70, 520, 60, M.key, 0.14);
  });
  return { GY, CX, M };
}
// student desk (side view): top at GY - 112*s; draw the seated student BEFORE it
export function desk(g, x, GY, s = 1, color = '#2a2430') {
  const ty = GY - 112 * s;
  rr(g, x - 70 * s, ty - 10 * s, 140 * s, 14 * s, 4 * s); g.fillStyle = color; g.fill();
  seg(g, [[x - 56 * s, ty], [x - 56 * s, GY]], 7 * s, color); seg(g, [[x + 56 * s, ty], [x + 56 * s, GY]], 7 * s, color);
  g.fillStyle = shade(color, -0.2); g.fillRect(x - 60 * s, ty + 6 * s, 120 * s, 26 * s);
  return ty - 10 * s;
}
