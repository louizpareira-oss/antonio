// sets/courtroom.js — the empty courtroom (2D): tall arched windows with cold light shafts, wood panelling, a raised judge's
// bench with an empty high-backed chair, polished floor. courtroom(g, t, cam, o) -> { GY, CX, M, bench }.
import { E, V, mood, layer, rr, seg, circle, ring, poly, linGrad, glow, alpha, shade, mix, text, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const courtGround = () => E.H * V(0.8, 0.68);
export const benchGeom = () => { const GY = courtGround(); return { x: E.W / 2, w: V(820, 700), top: GY - V(330, 380), chairTop: GY - V(640, 760) }; };

export function courtroom(g, t, cam, o = {}) {
  const M = mood(o.mood || 'interiorCool'), GY = courtGround(), CX = E.W / 2, B = benchGeom();
  const wood = shade(M.wall, 0.12), woodDark = shade(M.wall, -0.3), plaster = shade(M.wall, -0.05);
  layer(g, cam, 0.45, (g) => {
    g.fillStyle = linGrad(g, 0, -E.H, 0, GY, [shade(M.wall, -0.7), plaster, shade(M.wall, -0.2)]); g.fillRect(-E.W, -E.H, E.W * 3, GY + E.H);
    const ww = V(220, 200), wh = V(560, 720), wy = GY - V(980, 1340);
    for (const sx of [-1, 1]) {
      const wx = CX + sx * V(560, 330) - ww / 2;
      FX.windowFrame(g, { x: wx, y: wy, w: ww, h: wh, cols: 2, rows: 4, frame: shade(M.wall, -0.55), bar: 9, arch: true }, (g, x, y, w, h) => {
        g.fillStyle = linGrad(g, 0, y, 0, y + h, ['#e8eeff', '#b8c6ea', '#8f9ccc']); g.fillRect(x, y, w, h);
      });
      glow(g, wx + ww / 2, wy + wh / 2, ww * 1.8, '#dfe6ff', 0.22);
      FX.godRays(g, wx + ww / 2, wy + wh * 0.6, { angle: Math.PI / 2 - sx * 0.42, spread: 0.35, len: V(1300, 1700), color: '#dfe6ff', a: 0.07, count: 5, t });
    }
    const py = GY - V(360, 520);                                                    // wainscot panelling
    g.fillStyle = linGrad(g, 0, py, 0, GY, [wood, woodDark]); g.fillRect(-E.W, py, E.W * 3, GY - py);
    g.fillStyle = shade(wood, 0.15); g.fillRect(-E.W, py - 10, E.W * 3, 12);
    for (let x = -E.W; x < E.W * 2; x += 150) { rr(g, x + 14, py + 24, 122, GY - py - 48, 6); g.strokeStyle = alpha(shade(woodDark, -0.4), 0.6); g.lineWidth = 4; g.stroke(); }
    ring(g, CX, B.chairTop - V(150, 200), V(80, 90), 6, alpha('#c8d2f0', 0.25));     // seal (blank)
    ring(g, CX, B.chairTop - V(150, 200), V(62, 70), 3, alpha('#c8d2f0', 0.18));
  });
  layer(g, cam, 0.62, (g) => {
    rr(g, CX - V(70, 64), B.chairTop, V(140, 128), B.top - B.chairTop + 40, 26); g.fillStyle = shade(M.wall, -0.62); g.fill();   // empty high-backed chair
    seg(g, [[CX - V(52, 46), B.chairTop + 30], [CX - V(52, 46), B.top]], 4, alpha(M.rim, 0.25));
    g.fillStyle = linGrad(g, 0, B.top, 0, GY, [shade(wood, 0.05), woodDark]); g.fillRect(CX - B.w / 2, B.top, B.w, GY - B.top);      // bench front
    rr(g, CX - B.w / 2 - 24, B.top - 18, B.w + 48, 26, 6); g.fillStyle = shade(wood, 0.2); g.fill();
    for (let i = 0; i < 4; i++) { const pw = B.w / 4; rr(g, CX - B.w / 2 + i * pw + 18, B.top + 34, pw - 36, GY - B.top - 70, 8); g.strokeStyle = alpha(shade(woodDark, -0.4), 0.7); g.lineWidth = 5; g.stroke(); }
    g.fillStyle = alpha(M.rim, 0.18); g.fillRect(CX - B.w / 2 - 24, B.top - 18, B.w + 48, 3);
  });
  layer(g, cam, 0.85, (g) => {
    g.fillStyle = linGrad(g, 0, GY, 0, GY + V(400, 640), [shade(M.floor, 0.05), shade(M.dark, -0.3)]); g.fillRect(-E.W, GY, E.W * 3, E.H * 2);
    FX.floorLines(g, GY, GY + 700, 'rgba(0,0,0,.25)', 0.06);
    for (const sx of [-1, 1]) FX.pool(g, CX + sx * V(380, 220), GY + V(140, 200), V(300, 260), 50, '#dfe6ff', 0.12);
  });
  return { GY, CX, M, B };
}

// counsel table with stacked papers (side view), x = centre
export function counselTable(g, x, GY, s, M, papers = 3) {
  const top = GY - 112 * s, w = 260 * s, c = shade(M.wall, -0.4);
  seg(g, [[x - w * 0.4, top], [x - w * 0.4, GY]], 9 * s, c); seg(g, [[x + w * 0.4, top], [x + w * 0.4, GY]], 9 * s, c);
  rr(g, x - w / 2, top - 12 * s, w, 16 * s, 5 * s); g.fillStyle = shade(M.wall, -0.2); g.fill();
  for (let i = 0; i < papers; i++) { g.fillStyle = i % 2 ? '#d8d2c0' : '#ebe5d2'; g.fillRect(x - 60 * s + i * 22 * s, top - 18 * s - i * 5 * s, 70 * s, 6 * s); }
  return top - 12 * s;
}
// a wooden gallery bench seen from the side (foreground / background rows)
export function pew(g, x, GY, w, s, M) {
  const c = shade(M.wall, -0.35);
  rr(g, x, GY - 52 * s, w, 12 * s, 4 * s); g.fillStyle = c; g.fill();
  rr(g, x, GY - 120 * s, w, 46 * s, 6 * s); g.fillStyle = shade(c, -0.15); g.fill();
  for (const lx of [x + 12 * s, x + w - 24 * s]) { g.fillStyle = shade(c, -0.3); g.fillRect(lx, GY - 52 * s, 12 * s, 52 * s); }
}
