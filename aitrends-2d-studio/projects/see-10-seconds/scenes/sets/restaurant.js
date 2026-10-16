// sets/restaurant.js — café / restaurant interior: tall windows on the back wall, pendant lamps (the key light),
// a bar counter and the kitchen's swing door. mood 'interiorWarm' (evening restaurant) or o.day (lunch café).
import { E, V, mood, layer, backdrop, rng, rr, seg, circle, poly, linGrad, glow, alpha, shade, mix, text, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const restGround = () => E.H * 0.8;
export function restaurant(g, t, cam, o = {}) {
  const M = mood('interiorWarm'), GY = restGround(), CX = E.W / 2, day = o.day;
  const wall = shade(M.wall, day ? -0.05 : -0.3), wallDark = shade(M.wall, -0.6), sky = day ? mood('day').sky : mood('night').sky;
  layer(g, cam, 0.55, (g) => {
    g.fillStyle = linGrad(g, 0, -E.H, 0, GY, [shade(wall, -0.3), wall, shade(wall, -0.15)]); g.fillRect(-E.W * 2, -E.H, E.W * 5, GY + E.H);
    g.fillStyle = shade(wall, -0.3); g.fillRect(-E.W * 2, GY - 240, E.W * 5, E.H);                         // wainscot
    for (let x = -E.W * 2; x < E.W * 3; x += 90) seg(g, [[x, GY - 236], [x, GY]], 3, alpha(shade(wall, -0.5), 0.6));
    for (let i = -3; i <= 3; i++) {                                                                     // tall windows
      const wx = CX + i * 520 - 170, wy = GY - 820, ww = 340, wh = 520;
      FX.windowFrame(g, { x: wx, y: wy, w: ww, h: wh, cols: 2, rows: 3, frame: wallDark, bar: 10, arch: true }, (g, x, y, w, h) => {
        g.fillStyle = linGrad(g, 0, y, 0, y + h, sky); g.fillRect(x, y, w, h);
        FX.skyline(g, { x: x - 20, y: y + h + 4, w: w + 40, minH: 80, maxH: 300, color: day ? shade(sky[1], -0.3) : '#141832', windowColor: day ? alpha('#fff', 0.3) : '#ffcf8a', lit: day ? 0.1 : 0.35, seed: 7 + i });
      });
    }
    // bar counter on the right, kitchen swing door on the left
    FX.counter(g, { x: CX + 560, y: GY, w: 900, h: 230, color: shade(wallDark, 0.1), top: shade(M.floor, 0.4), doors: 6 });
    for (let i = 0; i < 6; i++) { circle(g, CX + 640 + i * 70, GY - 270, 14, alpha('#e8f4ff', 0.25)); seg(g, [[CX + 640 + i * 70, GY - 256], [CX + 640 + i * 70, GY - 238]], 4, alpha('#e8f4ff', 0.25)); }
    const dx = CX - 1200; rr(g, dx, GY - 380, 200, 380, 6); g.fillStyle = shade(wallDark, 0.15); g.fill(); circle(g, dx + 100, GY - 270, 36, alpha(M.practical, 0.75)); glow(g, dx + 100, GY - 270, 120, M.practical, 0.3);
  });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, GY - 10, 0, E.H * 2, [shade(M.floor, -0.15), shade(M.floor, -0.6)]); g.fillRect(-E.W * 2, GY - 10, E.W * 5, E.H * 2);
    FX.floorLines(g, GY, E.H * 1.4, 'rgba(0,0,0,.22)', 0.09);
    for (let i = -2; i <= 2; i++) FX.pool(g, CX + i * 620, GY + 60, 300, 40, M.practical, day ? 0.08 : 0.16);
  });
  layer(g, cam, 0.95, (g) => {                                                                        // pendant lamps
    for (let i = -2; i <= 2; i++) { const lx = CX + i * 620, ly = GY - 600; seg(g, [[lx, -E.H], [lx, ly]], 3, shade(wallDark, -0.4));
      g.fillStyle = shade(wallDark, -0.2); g.beginPath(); g.arc(lx, ly + 40, 54, Math.PI, 0); g.fill();
      glow(g, lx, ly + 46, day ? 160 : 280, M.practical, day ? 0.3 : 0.6); if (!day) FX.lightCone(g, lx, ly + 44, { angle: Math.PI / 2, spread: 0.8, len: 640, color: M.practical, a: 0.1 }); }
  });
  return { GY, CX, M };
}
// bistro table (side view); returns the top y. Draw seated people BEFORE it.
export function rTable(g, x, GY, s = 1, o = {}) {
  const ty = GY - 150 * s, c = o.color || '#241820', hw = (o.w || 340) / 2;
  seg(g, [[x, ty], [x, GY - 6]], 12 * s, c); seg(g, [[x - 60 * s, GY - 4], [x + 60 * s, GY - 4]], 10 * s, c);
  rr(g, x - hw * s, ty - 14 * s, 2 * hw * s, 18 * s, 8 * s); g.fillStyle = c; g.fill(); g.fillStyle = 'rgba(255,210,150,.35)'; g.fillRect(x - (hw - 6) * s, ty - 14 * s, (2 * hw - 12) * s, 3 * s);
  if (o.glasses !== false) for (const dx of [-hw * 0.47, hw * 0.35]) { const gx = x + dx * s, gy = ty - 14 * s; g.fillStyle = alpha('#e8f4ff', 0.35); poly(g, [[gx - 14 * s, gy - 46 * s], [gx + 14 * s, gy - 46 * s], [gx + 10 * s, gy], [gx - 10 * s, gy]], alpha('#e8f4ff', 0.3)); g.fillStyle = alpha('#ffd59a', 0.5); g.fillRect(gx - 11 * s, gy - 22 * s, 22 * s, 20 * s); }
  return ty - 14 * s;
}
// wine/water glass (for the tray and the shatter)
export function glassShape(g, x, y, s = 1, rot = 0, col = '#e8f4ff') {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  poly(g, [[-16, -50], [16, -50], [10, -14], [-10, -14]], alpha(col, 0.45)); seg(g, [[0, -14], [0, 0]], 4, alpha(col, 0.6)); seg(g, [[-12, 0], [12, 0]], 4, alpha(col, 0.6));
  seg(g, [[-10, -44], [-6, -22]], 3, alpha('#ffffff', 0.6)); g.restore();
}
