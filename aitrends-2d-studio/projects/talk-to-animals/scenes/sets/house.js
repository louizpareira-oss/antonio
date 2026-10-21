// sets/house.js — the family's house by the sea (v2 look: bright, clean, lots of real detail, like the user's references).
import { E, layer, rr, seg, circle, poly, linGrad, radGrad, glow, alpha, shade, rng } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import { whaleTail } from '../animals.js';

export const GY = () => E.H * 0.82;

// sea view through a window: o.time 'golden' | 'day' | 'dawn' | 'night'; o.whale = draw a far whale tail
export function seaView(g, X, Y, W, H, t, o = {}) {
  const time = o.time || 'golden';
  const sky = { golden: ['#7a6aa0', '#f0a07a', '#ffd9a0'], day: ['#7ab8e8', '#bfe0f4', '#eef6fa'], dawn: ['#3a3d6a', '#b58aa0', '#f4c8a0'], night: ['#0b1028', '#1d2550', '#3a3570'] }[time];
  g.fillStyle = linGrad(g, 0, Y, 0, Y + H, sky); g.fillRect(X, Y, W, H);
  const sea = Y + H * 0.64;
  if (time === 'night') { FX.stars(g, t, { count: 30, area: [X, Y, W, H * 0.6] }); FX.moon(g, X + W * 0.7, Y + H * 0.25, 18); }
  else FX.sun(g, X + W * 0.62, Y + H * (time === 'day' ? 0.25 : 0.56), time === 'day' ? 26 : 34, '#fff6e0', '#ffd59a', 4);
  const seaC = { golden: ['#e0907a', '#5a5a8a', '#2e3560'], day: ['#5aa8d8', '#2e78b0', '#1e4a80'], dawn: ['#c08a9a', '#4a4a7a', '#262a50'], night: ['#1a2248', '#10163a', '#080c22'] }[time];
  g.fillStyle = linGrad(g, 0, sea, 0, Y + H, seaC); g.fillRect(X, sea, W, Y + H - sea);
  if (time !== 'night') { g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = alpha('#ffe2b0', 0.45); for (let i = 0; i < 6; i++) g.fillRect(X + W * 0.62 - 50 + i * 6 - i * i, sea + 6 + i * 11, 100 - i * 9, 3); g.restore(); }
  if (o.whale) { whaleTail(g, X + W * 0.24, sea + 16, 0.7, time === 'day' ? '#1e3a5a' : '#2a2a48'); g.fillStyle = alpha('#ffffff', 0.5); for (const dx of [-24, -11, 11, 24]) g.fillRect(X + W * 0.24 + dx - 5, sea + 14, 10, 2); }
}

// the living room: big sea window with curtains, couch, bookshelf, photos, lamp, plant, Biscuit's bed and his sunny spot
export function livingRoom(g, t, cam, o = {}) {
  const gy = GY(), wall = o.wall || '#f0e2c8', time = o.time || 'golden';
  const win = { x: 1000, y: gy - 690, w: 640, h: 430 };
  layer(g, cam, 0.6, (g) => {
    g.fillStyle = linGrad(g, 0, -200, 0, gy, [shade(wall, -0.06), wall]); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H);
    g.fillStyle = alpha(shade(wall, -0.05), 0.6); for (let x = -E.W; x < E.W * 2; x += 46) g.fillRect(x, -E.H, 3, gy + E.H);   // faint wallpaper stripes
    g.fillStyle = shade(wall, -0.1); g.fillRect(-E.W, gy - 230, E.W * 3, 230); g.fillStyle = shade(wall, 0.06); g.fillRect(-E.W, gy - 236, E.W * 3, 8);   // wainscot + rail
    // window light on the wall
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = radGrad(g, win.x + win.w * 0.6, win.y + win.h * 0.6, 40, 1000, [alpha('#ffd9a0', 0.16), alpha('#ffd9a0', 0)]); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); g.restore();
    FX.windowFrame(g, { x: win.x, y: win.y, w: win.w, h: win.h, cols: 3, rows: 1, frame: '#fbf6ec', bar: 12 }, (g, X, Y, W, H) => seaView(g, X, Y, W, H, t, { time, whale: o.whale }));
    rr(g, win.x - 26, win.y + win.h, win.w + 52, 18, 5); g.fillStyle = '#fbf6ec'; g.fill();
    for (const [cx, dir] of [[win.x - 40, -1], [win.x + win.w + 40, 1]]) {                       // curtains with tie-backs
      g.fillStyle = '#d98a3a'; g.beginPath(); g.moveTo(cx - 50, win.y - 40); g.lineTo(cx + 50, win.y - 40); g.quadraticCurveTo(cx + 10 * dir, win.y + 200, cx + 34 * dir, gy - 250); g.lineTo(cx - 34 * dir, gy - 250); g.quadraticCurveTo(cx - 30 * dir, win.y + 200, cx - 50, win.y - 40); g.fill();
      g.fillStyle = alpha('#000000', 0.12); for (let i = -2; i <= 2; i++) g.fillRect(cx + i * 18, win.y - 40, 4, 200);
      rr(g, cx - 30, win.y + 190, 60, 10, 5); g.fillStyle = '#b8692a'; g.fill();
    }
    seg(g, [[win.x - 110, win.y - 46], [win.x + win.w + 110, win.y - 46]], 8, '#8a5a3a');           // curtain rod
    // bookshelf (left)
    const bx = 120, by = gy - 560; rr(g, bx, by, 300, 340, 6); g.fillStyle = '#8a5a3a'; g.fill(); g.fillStyle = '#6a4228';
    for (let i = 1; i < 4; i++) g.fillRect(bx + 10, by + i * 85, 280, 10);
    const r = rng(7), cols = ['#d64a33', '#2e72d2', '#3fa06a', '#e8892a', '#8a5ad6', '#f2c21a', '#e8e0d0'];
    for (let row = 0; row < 3; row++) { let x = bx + 18; while (x < bx + 270) { const w = 14 + r() * 16, h = 50 + r() * 26; if (r() < 0.12) { x += 24; continue; } g.fillStyle = cols[(r() * cols.length) | 0]; g.fillRect(x, by + (row + 1) * 85 - h, w, h); x += w + 3; } }
    circle(g, bx + 240, by + 335 - 85 * 3 - 10, 18, '#3fa06a'); rr(g, bx + 226, by + 335 - 85 * 3, 28, 22, 4); g.fillStyle = '#e8e0d0'; g.fill();   // little plant
    // framed photos: puppy Biscuit, the family
    rr(g, 520, gy - 600, 150, 120, 6); g.fillStyle = '#fbf6ec'; g.fill(); g.fillStyle = '#e8c890'; g.fillRect(532, gy - 588, 126, 96);
    circle(g, 595, gy - 525, 22, '#d9a35a'); circle(g, 612, gy - 540, 13, '#d9a35a'); ell2(g, 600, gy - 505, 30, 12, '#d9a35a');   // puppy photo
    rr(g, 700, gy - 560, 110, 140, 6); g.fillStyle = '#fbf6ec'; g.fill(); g.fillStyle = '#a8c8d8'; g.fillRect(712, gy - 548, 86, 116);
    for (const [dx, c] of [[735, '#3FA06A'], [760, '#2E72D2'], [782, '#5C6370']]) { circle(g, dx, gy - 500, 9, '#1d1b22'); g.fillStyle = c; g.fillRect(dx - 7, gy - 490, 14, 30); }
  });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, gy - 8, 0, E.H * 1.6, ['#c8935f', '#9a6a40']); g.fillRect(-E.W, gy - 8, E.W * 3, E.H * 2);   // wood floor
    g.strokeStyle = 'rgba(0,0,0,.12)'; g.lineWidth = 2; for (let i = 0; i < 6; i++) { const y = gy + 14 + i * i * 9; g.beginPath(); g.moveTo(-E.W, y); g.lineTo(E.W * 2, y); g.stroke(); }
    g.fillStyle = '#5a7ab0'; g.beginPath(); g.ellipse(980, gy + 70, 700, 62, 0, 0, Math.PI * 2); g.fill();                      // rug
    g.strokeStyle = alpha('#ffffff', 0.35); g.lineWidth = 4; g.beginPath(); g.ellipse(980, gy + 70, 640, 50, 0, 0, Math.PI * 2); g.stroke();
    g.save(); g.globalCompositeOperation = 'lighter'; g.translate(1330, gy + 66); g.scale(1, 0.18); g.fillStyle = radGrad(g, 0, 0, 20, 330, [alpha('#ffd9a0', 0.55), alpha('#ffd9a0', 0)]); g.beginPath(); g.arc(0, 0, 330, 0, Math.PI * 2); g.fill(); g.restore();   // the sunny spot
    // Biscuit's bed (red plaid) by the window
    g.fillStyle = '#b8402c'; g.beginPath(); g.ellipse(1690, gy + 20, 120, 34, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#d8604a'; g.beginPath(); g.ellipse(1690, gy + 14, 92, 20, 0, 0, Math.PI * 2); g.fill();
    g.strokeStyle = alpha('#f2e2c8', 0.4); g.lineWidth = 3; for (const dx of [-60, -20, 20, 60]) { g.beginPath(); g.moveTo(1690 + dx, gy - 10); g.lineTo(1690 + dx, gy + 48); g.stroke(); }
    // floor lamp + plant
    seg(g, [[1880, gy + 10], [1880, gy - 420]], 6, '#3a3040'); rr(g, 1850, gy, 60, 12, 6); g.fillStyle = '#3a3040'; g.fill(); poly(g, [[1830, gy - 420], [1930, gy - 420], [1905, gy - 500], [1855, gy - 500]], '#2a9ab0'); glow(g, 1880, gy - 440, 240, '#ffd28a', 0.3);
    rr(g, 30, gy - 70, 70, 80, 10); g.fillStyle = '#d98a3a'; g.fill();
    for (const [a, l] of [[-2.2, 110], [-1.8, 140], [-1.4, 120], [-1.0, 100], [-2.6, 90]]) { seg(g, [[65, gy - 70], [65 + Math.cos(a) * l * 0.6, gy - 70 + Math.sin(a) * l * 0.6]], 4, '#2a6a3a'); g.fillStyle = '#3fa06a'; g.beginPath(); g.ellipse(65 + Math.cos(a) * l, gy - 70 + Math.sin(a) * l, 26, 13, a, 0, Math.PI * 2); g.fill(); }
  });
  return { GY: gy, win };
}
function ell2(g, x, y, rx, ry, c) { g.fillStyle = c; g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); g.fill(); }
