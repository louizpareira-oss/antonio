// sets/bedroom.js — HERO's bedroom, side elevation: bed under a window (cold streetlight), nightstand with a digital clock.
// bedroom(g, t, cam, { mood, grey }) -> { GY, CX, M, bed }. Draw characters at depth 1 on bed.top.
import { E, V, mood, layer, rr, seg, circle, poly, linGrad, glow, alpha, shade, mix, text, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const bedGround = () => E.H * V(0.8, 0.68);
export const bedGeom = (s = V(1.5, 1.6)) => { const GY = bedGround(); return { x: E.W / 2 - V(430, 400), w: V(780, 700), s, top: GY - 96 * s, GY }; };

// a bed scaled to the figures (head of the bed on the left)
export function bedShape(g, B, M, blanket = '#3a4470') {
  const { x, w, s, GY } = B;
  rr(g, x - 16 * s, GY - 190 * s, 26 * s, 190 * s, 8 * s); g.fillStyle = shade(M.wall, -0.6); g.fill();          // headboard
  g.fillStyle = shade(M.wall, -0.55); g.fillRect(x, GY - 70 * s, w, 70 * s);                                   // frame
  rr(g, x + 4 * s, GY - 98 * s, w - 4 * s, 34 * s, 12 * s); g.fillStyle = shade('#c8cde0', -0.55); g.fill();   // mattress
  rr(g, x + 14 * s, GY - 122 * s, 96 * s, 30 * s, 13 * s); g.fillStyle = shade('#e8e4f4', -0.35); g.fill();    // pillow
  return { blanket: (g2, from = 0.32) => { rr(g2, x + w * from, GY - 112 * s, w * (1 - from) + 6 * s, 56 * s, 18 * s); g2.fillStyle = linGrad(g2, 0, GY - 112 * s, 0, GY - 56 * s, [shade(blanket, 0.05), shade(blanket, -0.35)]); g2.fill(); } };
}

export function bedroom(g, t, cam, o = {}) {
  const M = mood(o.mood || 'night'), GY = bedGround(), CX = E.W / 2, B = bedGeom();
  layer(g, cam, 0.5, (g) => {
    g.fillStyle = linGrad(g, 0, GY - E.H, 0, GY, [shade(M.wall, -0.65), shade(M.wall, -0.2), shade(M.wall, -0.4)]); g.fillRect(-E.W, -E.H, E.W * 3, GY + E.H + 4);
    const wx = CX - V(260, 230), wy = GY - V(620, 900), ww = V(420, 380), wh = V(300, 400);
    FX.windowFrame(g, { x: wx, y: wy, w: ww, h: wh, cols: 2, rows: 2, frame: shade(M.wall, -0.6), bar: 10 }, (g, x, y, w, h) => {
      g.fillStyle = linGrad(g, 0, y, 0, y + h, M.sky); g.fillRect(x, y, w, h);
      if (!o.grey) FX.moon(g, x + w * 0.72, y + h * 0.3, 22, '#e8ecff');
      FX.skyline(g, { x, y: y + h, w, minH: h * 0.1, maxH: h * 0.45, color: shade(M.sky[0], -0.3), windowColor: alpha(M.practical, 0.7), lit: o.grey ? 0.05 : 0.25, seed: 14 });
    });
    for (let k = 0; k < wh; k += 32) { g.fillStyle = alpha(shade(M.wall, -0.6), 0.6); g.fillRect(wx, wy + k, ww, 9); }
    glow(g, wx + ww / 2, wy + wh / 2, ww * 0.9, M.key, o.grey ? 0.16 : 0.1);
  });
  layer(g, cam, 0.85, (g) => {
    g.fillStyle = linGrad(g, 0, GY, 0, GY + V(380, 620), [shade(M.floor, -0.1), shade(M.dark, -0.3)]); g.fillRect(-E.W, GY, E.W * 3, E.H * 2);
    FX.floorLines(g, GY, GY + 600, 'rgba(0,0,0,.25)', 0.07);
    FX.pool(g, CX - V(40, 60), GY + 40, V(500, 420), 60, M.key, o.grey ? 0.14 : 0.08);
  });
  return { GY, CX, M, B };
}

// nightstand with a digital clock (str like '3:00'); returns the top y
export function nightstand(g, x, GY, s, M, str = '3:00', glowA = 0.6) {
  const top = GY - 120 * s;
  rr(g, x - 60 * s, top, 120 * s, 120 * s, 6 * s); g.fillStyle = shade(M.wall, -0.55); g.fill();
  g.fillStyle = shade(M.wall, -0.7); g.fillRect(x - 54 * s, top + 52 * s, 108 * s, 4 * s);
  rr(g, x - 48 * s, top - 44 * s, 96 * s, 44 * s, 8 * s); g.fillStyle = '#0a0b12'; g.fill();
  text(g, str, x - 6 * s, top - 21 * s, { size: 30 * s, font: FONTS.ui, weight: 900, color: '#ff7a5a', glow: 14, glowColor: alpha('#ff5a3a', glowA) });
  text(g, 'AM', x + 32 * s, top - 30 * s, { size: 10 * s, font: FONTS.ui, weight: 900, color: '#ff7a5a' });
  glow(g, x, top - 22 * s, 120 * s, '#ff5a3a', 0.18 * glowA);
  return top;
}
