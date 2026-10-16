// sets/bedroom.js — the hero's bedroom at night: blinds on the window (moonlight), stripes on the wall, the bed.
// o.evening gives a dim purple dusk instead of moonlight (the headaches scene).
import { E, V, mood, layer, backdrop, rng, rr, seg, circle, poly, linGrad, glow, alpha, shade, mix } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const bedGround = () => E.H * 0.8;
export function bedroom(g, t, cam, o = {}) {
  const M = mood('night'), GY = bedGround(), CX = E.W / 2, ev = o.evening, light = ev ? '#c9a8e8' : '#c9d4ff', dim = o.dim ?? 0;
  const wall = shade(M.wall, ev ? -0.25 : -0.15);
  layer(g, cam, 0.6, (g) => {
    g.fillStyle = linGrad(g, 0, -E.H, 0, GY, [shade(wall, -0.3), wall, shade(wall, -0.2)]); g.fillRect(-E.W * 2, -E.H, E.W * 5, GY + E.H);
    const wx = CX - 760, wy = GY - 760, ww = 420, wh = 470;
    FX.windowFrame(g, { x: wx, y: wy, w: ww, h: wh, cols: 2, rows: 1, frame: shade(wall, -0.5), bar: 12, blinds: 0 }, (g, x, y, w, h) => {
      g.fillStyle = linGrad(g, 0, y, 0, y + h, ev ? mood('dusk').sky.slice(0, 3) : M.sky); g.fillRect(x, y, w, h);
      if (!ev) FX.moon(g, x + w * 0.65, y + h * 0.3, 30);
      FX.skyline(g, { x: x - 10, y: y + h + 2, w: w + 20, minH: 40, maxH: 200, color: '#0e1028', windowColor: '#ffcf8a', lit: 0.3, seed: 3 });
      for (let i = 0; i < 16; i++) { g.fillStyle = alpha(shade(wall, -0.6), 0.75); g.fillRect(x, y + 10 + i * 29, w, 17); }
    });
    // blind stripes thrown on the wall
    g.save(); g.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 9; i++) { const y0 = GY - 640 + i * 40; poly(g, [[CX - 280, y0], [CX + 260, y0 + 120], [CX + 260, y0 + 136], [CX - 280, y0 + 16]], alpha(light, 0.05 * (1 - dim))); }
    g.restore();
    rr(g, CX + 520, GY - 640, 170, 230, 6); g.fillStyle = shade(wall, -0.35); g.fill(); g.fillStyle = alpha('#8a6aa8', 0.25); g.fillRect(CX + 540, GY - 610, 130, 90);   // poster
  });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, GY - 10, 0, E.H * 2, [shade(M.floor, -0.2), shade(M.floor, -0.7)]); g.fillRect(-E.W * 2, GY - 10, E.W * 5, E.H * 2);
    FX.floorLines(g, GY, E.H * 1.4, 'rgba(0,0,0,.25)', 0.09);
    FX.pool(g, CX - 380, GY + 70, 420, 60, light, 0.12 * (1 - dim));
    // nightstand + lamp (off)
    g.fillStyle = shade(M.dark, -0.2); g.fillRect(CX + 330, GY - 150, 130, 150); rr(g, CX + 370, GY - 230, 50, 80, 10); g.fill();
  });
  return { GY, CX, M, light };
}
// the bed (side view), head at the left; returns the mattress top y
export function bedShape(g, x, GY, s = 1, o = {}) {
  const w = 700 * s, top = GY - 130 * s, frame = o.frame || '#1a1830', sheet = o.sheet || '#3a3e6a';
  g.fillStyle = frame; g.fillRect(x - w / 2, GY - 90 * s, w, 90 * s); g.fillRect(x - w / 2 - 14 * s, GY - 250 * s, 26 * s, 250 * s); g.fillRect(x + w / 2 - 12 * s, GY - 150 * s, 22 * s, 150 * s);
  rr(g, x - w / 2 + 8 * s, top, w - 16 * s, 46 * s, 18 * s); g.fillStyle = sheet; g.fill();
  rr(g, x - w / 2 + 20 * s, top - 30 * s, 150 * s, 40 * s, 16 * s); g.fillStyle = shade(sheet, 0.5); g.fill();
  return top;
}
