// sets/cell.js — a prison cell: stone-block wall, a small high barred window with a cold moonlight shaft, a cot.
// cell(g, t, cam, o) -> { GY, CX, M, win }. cellBars(...) draws the iron bars (use at depth 1 or as a blurred foreground).
import { E, V, mood, layer, rr, seg, circle, poly, linGrad, glow, alpha, shade, mix, rng } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const cellGround = () => E.H * V(0.8, 0.68);

export function stoneWall(g, x, y, w, h, M, seed = 3) {
  const r = rng(seed), base = shade(M.wall, -0.15);
  g.fillStyle = linGrad(g, 0, y, 0, y + h, [shade(base, -0.35), base, shade(base, -0.25)]); g.fillRect(x, y, w, h);
  const bh = 70;
  for (let row = 0, yy = y; yy < y + h; row++, yy += bh) {
    for (let xx = x - (row % 2) * 70; xx < x + w; xx += 140) {
      rr(g, xx + 4, yy + 4, 132, bh - 8, 6); g.fillStyle = shade(base, (r() - 0.5) * 0.12); g.fill();
    }
  }
}

export function cell(g, t, cam, o = {}) {
  const M = mood(o.mood || 'night'), GY = cellGround(), CX = E.W / 2;
  const win = { x: CX + V(180, 120), y: GY - V(720, 1060), w: V(150, 170), h: V(110, 130) };
  layer(g, cam, 0.5, (g) => {
    stoneWall(g, -E.W, -E.H, E.W * 3, GY + E.H, M);
    FX.windowFrame(g, { x: win.x, y: win.y, w: win.w, h: win.h, cols: 4, rows: 1, frame: shade(M.wall, -0.7), bar: 10 }, (g, x, y, w, h) => {
      g.fillStyle = linGrad(g, 0, y, 0, y + h, M.sky); g.fillRect(x, y, w, h); FX.moon(g, x + w * 0.6, y + h * 0.4, 14, '#e8ecff');
    });
    glow(g, win.x + win.w / 2, win.y + win.h / 2, win.w * 1.6, M.key, 0.3);
    FX.godRays(g, win.x + win.w / 2, win.y + win.h, { angle: Math.PI / 2 + 0.45, spread: 0.3, len: V(1100, 1300), color: M.key, a: 0.09, count: 4, t });
  });
  layer(g, cam, 0.85, (g) => {
    g.fillStyle = linGrad(g, 0, GY, 0, GY + V(400, 640), [shade(M.floor, -0.05), shade(M.dark, -0.3)]); g.fillRect(-E.W, GY, E.W * 3, E.H * 2);
    FX.pool(g, CX - V(140, 160), GY + V(120, 160), V(260, 240), 50, M.key, 0.16);
    if (o.cot !== false) { rr(g, CX - V(560, 470), GY - 110, V(360, 300), 26, 8); g.fillStyle = shade(M.wall, -0.5); g.fill(); g.fillStyle = shade(M.wall, -0.6); g.fillRect(CX - V(550, 460), GY - 86, 14, 86); g.fillRect(CX - V(220, 190), GY - 86, 14, 86); }
  });
  return { GY, CX, M, win };
}

// vertical iron bars between x0..x1, with two cross bars; rim = cold edge highlight
export function cellBars(g, x0, x1, top, bottom, M, o = {}) {
  const { gap = V(110, 120), w = V(20, 22), color = '#141622', rim = M.rim } = o;
  for (let x = x0; x <= x1; x += gap) {
    g.fillStyle = color; g.fillRect(x - w / 2, top, w, bottom - top);
    g.fillStyle = alpha(rim, 0.35); g.fillRect(x - w / 2, top, 3, bottom - top);
  }
  for (const y of [top + (bottom - top) * 0.12, top + (bottom - top) * 0.78]) { g.fillStyle = color; g.fillRect(x0 - w, y, x1 - x0 + w * 2, w * 0.9); g.fillStyle = alpha(rim, 0.3); g.fillRect(x0 - w, y, x1 - x0 + w * 2, 3); }
}
