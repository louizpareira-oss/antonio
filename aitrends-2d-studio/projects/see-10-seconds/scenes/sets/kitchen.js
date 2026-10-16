// sets/kitchen.js — the hero's apartment kitchen / living room. Morning: big window on the left (key light), warm walls.
// Night variant (o.dark 0..1) for the surprise party: lights off, moonlight from the window.
import { E, V, mood, layer, backdrop, rng, rr, seg, circle, poly, linGrad, glow, alpha, shade, mix, text, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const kitchenGround = () => E.H * 0.8;
export function kitchen(g, t, cam, o = {}) {
  const M = mood(o.mood || 'interiorWarm'), GY = kitchenGround(), CX = E.W / 2, night = o.night, win = o.nightWindow ?? night;
  const wall = shade(M.wall, night ? -0.55 : -0.12), wallDark = shade(M.wall, night ? -0.75 : -0.45), sky = win ? mood('night').sky : mood('golden').sky;
  layer(g, cam, 0.6, (g) => {
    g.fillStyle = linGrad(g, 0, -E.H, 0, GY, [shade(wall, -0.2), wall, shade(wall, -0.1)]); g.fillRect(-E.W * 2, -E.H, E.W * 5, GY + E.H);
    // big window, left
    const wx = CX - 980, wy = GY - 760, ww = 620, wh = 560;
    FX.windowFrame(g, { x: wx, y: wy, w: ww, h: wh, cols: 3, rows: 2, frame: wallDark, bar: 12 }, (g, x, y, w, h) => {
      g.fillStyle = linGrad(g, 0, y, 0, y + h, sky); g.fillRect(x, y, w, h);
      if (!win) FX.sun(g, x + w * 0.72, y + h * 0.42, 40, '#fff6e0', '#ffd59a', 4); else FX.moon(g, x + w * 0.7, y + h * 0.3, 26);
      FX.skyline(g, { x: x - 20, y: y + h + 4, w: w + 40, minH: 60, maxH: 240, color: win ? '#141832' : shade(sky[1], -0.45), windowColor: win ? '#ffcf8a' : alpha('#fff1d6', 0.4), lit: win ? 0.3 : 0.1, seed: 5 });
    });
    rr(g, wx - 30, wy + wh, ww + 60, 22, 6); g.fillStyle = wallDark; g.fill();
    if (!win) FX.godRays(g, wx + ww * 0.7, wy + wh * 0.4, { angle: 0.55, spread: 0.5, len: 1500, color: '#ffd59a', a: 0.07, t });
    // calendar
    const cx0 = CX - 170, cy0 = GY - 640; rr(g, cx0, cy0, 150, 170, 8); g.fillStyle = night ? shade('#e8e2d6', -0.6) : '#e8e2d6'; g.fill(); g.fillStyle = night ? '#4a1a1a' : '#c84a3a'; g.fillRect(cx0, cy0, 150, 42);
    text(g, o.calendar || 'TUE', cx0 + 75, cy0 + 22, { size: 26, color: '#fff', font: FONTS.ui, weight: 900 });
    for (let i = 0; i < 4; i++) for (let j = 0; j < 5; j++) { g.fillStyle = alpha('#3a3440', 0.35); g.fillRect(cx0 + 14 + j * 26, cy0 + 56 + i * 26, 16, 14); }
    // counter + cabinets + fridge on the right
    const kx = CX + 260; g.fillStyle = shade(wallDark, 0.1); g.fillRect(kx, GY - 820, 700, 250);
    g.strokeStyle = shade(wallDark, -0.3); g.lineWidth = 4; for (let i = 0; i <= 4; i++) { g.beginPath(); g.moveTo(kx + i * 175, GY - 820); g.lineTo(kx + i * 175, GY - 570); g.stroke(); }
    FX.counter(g, { x: kx, y: GY, w: 700, h: 300, color: shade(wallDark, 0.15), top: shade(M.floor, 0.35), doors: 4 });
    rr(g, kx + 740, GY - 720, 300, 720, 18); g.fillStyle = shade(wall, night ? -0.2 : 0.25); g.fill(); seg(g, [[kx + 760, GY - 470], [kx + 1020, GY - 470]], 4, shade(wall, -0.1)); seg(g, [[kx + 770, GY - 640], [kx + 770, GY - 520]], 8, shade(wall, -0.4));
    for (let i = 0; i < 3; i++) { rr(g, kx + 80 + i * 90, GY - 380, 50, 70, 8); g.fillStyle = shade(wallDark, 0.3 + i * 0.05); g.fill(); }
  });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, GY - 10, 0, E.H * 2, [shade(M.floor, night ? -0.5 : -0.05), shade(M.floor, night ? -0.8 : -0.5)]); g.fillRect(-E.W * 2, GY - 10, E.W * 5, E.H * 2);
    FX.floorLines(g, GY, E.H * 1.4, 'rgba(0,0,0,.2)', 0.09);
    if (!night) { FX.pool(g, CX - 380, GY + 90, 520, 70, '#ffd59a', 0.18); }
    else FX.pool(g, CX - 520, GY + 90, 380, 60, '#c9d4ff', 0.12);
  });
  // pendant lamp over the table
  layer(g, cam, 0.95, (g) => {
    const lx = CX - 20, ly = GY - 560; seg(g, [[lx, -E.H], [lx, ly]], 3, shade(wallDark, -0.4));
    poly(g, [[lx - 70, ly + 60], [lx + 70, ly + 60], [lx + 26, ly], [lx - 26, ly]], shade(wallDark, -0.3));
    if (!night || o.lampOn) { glow(g, lx, ly + 66, 260, M.practical, 0.55); FX.lightCone(g, lx, ly + 60, { angle: Math.PI / 2, spread: 0.9, len: 600, color: M.practical, a: 0.12 }); }
  });
  return { GY, CX, M };
}
// kitchen table (side view); returns the top surface y. Draw characters BEFORE it to sit behind it.
export function kTable(g, x, GY, o = {}) {
  const { w = 560, h = 190, color = '#2a1c20', top = '#4a3436' } = o, ty = GY - h;
  seg(g, [[x - w / 2 + 40, ty + 10], [x - w / 2 + 60, GY]], 14, color); seg(g, [[x + w / 2 - 40, ty + 10], [x + w / 2 - 60, GY]], 14, color);
  rr(g, x - w / 2, ty - 14, w, 22, 8); g.fillStyle = color; g.fill(); g.fillStyle = top; g.fillRect(x - w / 2 + 6, ty - 14, w - 12, 5);
  return ty - 14;
}
// smartphone lying flat on a table, side view (x = centre, y = table top); rot tilts it as it slides off
export function phoneFlat(g, x, y, s = 1, rot = 0, o = {}) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  rr(g, -46, -12, 92, 12, 4); g.fillStyle = o.ink || '#0c0b10'; g.fill(); g.fillStyle = o.glow || '#9fd8ff'; g.fillRect(-40, -13, 80, 3);
  g.restore();
}
