// sets/house.js — the family's house by the sea (v2 look: bright, clean, lots of real detail, like the user's references).
import { E, layer, rr, seg, circle, poly, linGrad, radGrad, glow, alpha, shade, rng, text, FONTS } from '/engine/core.js';
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

// ---------- more rooms ----------
const WOOD = ['#c8935f', '#9a6a40'];
function floor(g, gy, cols = WOOD, rug = null) {
  g.fillStyle = linGrad(g, 0, gy - 8, 0, E.H * 1.6, cols); g.fillRect(-E.W, gy - 8, E.W * 3, E.H * 2);
  g.strokeStyle = 'rgba(0,0,0,.12)'; g.lineWidth = 2; for (let i = 0; i < 6; i++) { const y = gy + 14 + i * i * 9; g.beginPath(); g.moveTo(-E.W, y); g.lineTo(E.W * 2, y); g.stroke(); }
  if (rug) { g.fillStyle = rug[2]; g.beginPath(); g.ellipse(rug[0], gy + 60, rug[1], 56, 0, 0, Math.PI * 2); g.fill(); }
}
function wallFill(g, gy, wall, stripes = true) {
  g.fillStyle = linGrad(g, 0, -200, 0, gy, [shade(wall, -0.05), wall]); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H);
  if (stripes) { g.fillStyle = alpha(shade(wall, -0.05), 0.55); for (let x = -E.W; x < E.W * 2; x += 46) g.fillRect(x, -E.H, 3, gy + E.H); }
}
// a garden view (fence, tree, wires) drawn inside a window rect; o.time, o.birds (count on the wire), o.crows (on the fence), o.empty
export function gardenView(g, X, Y, W, H, t, o = {}) {
  const time = o.time || 'day';
  const sky = { day: ['#7ab8e8', '#bfe0f4', '#eef6fa'], dawn: ['#4a4f8a', '#c890a8', '#f8d0a8'], dusk: ['#5a4a8a', '#e8907a', '#f8c890'], night: ['#0b1028', '#1d2550', '#3a3570'], winter: ['#a8b8d0', '#d8e0ea', '#f0f2f6'] }[time];
  g.fillStyle = linGrad(g, 0, Y, 0, Y + H, sky); g.fillRect(X, Y, W, H);
  if (time === 'dawn') FX.sun(g, X + W * 0.2, Y + H * 0.72, 26, '#fff2d8', '#ffc890', 4);
  const gy = Y + H * 0.8;
  g.fillStyle = time === 'winter' ? '#e8eef4' : time === 'night' ? '#1a2a24' : '#7ab04a'; g.fillRect(X, gy, W, H);
  // tree
  const tx = X + W * 0.72; seg(g, [[tx, gy], [tx, gy - H * 0.4]], 14, '#6a4a30');
  for (const [dx, dy, r] of [[0, -0.5, 0.16], [-0.09, -0.4, 0.12], [0.09, -0.42, 0.12]]) circle(g, tx + dx * W, gy + dy * H, r * W, time === 'winter' ? '#c8d0d8' : time === 'night' ? '#1e3a2e' : '#4a9a4a');
  // wire
  g.strokeStyle = '#2a2a34'; g.lineWidth = 2.5; g.beginPath(); g.moveTo(X, Y + H * 0.28); g.quadraticCurveTo(X + W * 0.5, Y + H * 0.36, X + W, Y + H * 0.26); g.stroke();
  // fence
  const fy = gy - H * 0.14; g.fillStyle = time === 'night' ? '#5a5048' : '#e8dcc8';
  for (let x = X; x < X + W; x += W * 0.06) { rr(g, x, fy, W * 0.045, H * 0.16, 3); g.fill(); }
  g.fillRect(X, fy + H * 0.04, W, 6);
  return { gy, fy, wireY: (u) => Y + H * (0.28 + (0.36 - 0.28) * 4 * u * (1 - u) + (0.26 - 0.28) * u), tx };
}

// KITCHEN: blue cabinets, white tiles, window to the garden (left), table + chairs, Biscuit's bowl. o.time
export function kitchen(g, t, cam, o = {}) {
  const gy = GY(), time = o.time || 'day', night = time === 'night';
  const win = { x: 260, y: gy - 640, w: 520, h: 360 };
  layer(g, cam, 0.6, (g) => {
    wallFill(g, gy, night ? '#5a6080' : '#f2ece2', false);
    g.fillStyle = night ? '#6a7090' : '#ffffff'; g.fillRect(-E.W, gy - 420, E.W * 3, 170);           // tiles band
    g.strokeStyle = alpha('#000000', 0.06); g.lineWidth = 2; for (let x = -E.W; x < E.W * 2; x += 60) { g.beginPath(); g.moveTo(x, gy - 420); g.lineTo(x, gy - 250); g.stroke(); } for (const y of [gy - 360, gy - 300]) { g.beginPath(); g.moveTo(-E.W, y); g.lineTo(E.W * 2, y); g.stroke(); }
    FX.windowFrame(g, { x: win.x, y: win.y, w: win.w, h: win.h, cols: 2, rows: 1, frame: '#fbf6ec', bar: 12 }, (g, X, Y, W, H) => gardenView(g, X, Y, W, H, t, { time }));
    g.fillStyle = '#e8892a'; for (const dx of [-36, win.w + 6]) rr(g, win.x + dx, win.y - 20, 30, win.h + 40, 8), g.fill();       // curtains
    // upper cabinets
    for (let i = 0; i < 4; i++) { const x = 900 + i * 230; rr(g, x, gy - 820, 210, 260, 8); g.fillStyle = night ? '#3a5a8a' : '#4a7ac0'; g.fill(); rr(g, x + 14, gy - 806, 182, 232, 6); g.fillStyle = night ? '#4a6a9a' : '#5a8ad0'; g.fill(); rr(g, x + 92, gy - 610, 26, 8, 4); g.fillStyle = '#e8e0d0'; g.fill(); }
    // counter + lower cabinets
    g.fillStyle = night ? '#3a5a8a' : '#4a7ac0'; g.fillRect(-E.W, gy - 230, E.W * 3, 230); g.fillStyle = '#e8e2d6'; g.fillRect(-E.W, gy - 250, E.W * 3, 24);
    for (let x = -E.W; x < E.W * 2; x += 230) { rr(g, x + 10, gy - 214, 210, 200, 6); g.fillStyle = night ? '#4a6a9a' : '#5a8ad0'; g.fill(); }
    // toaster + kettle + fridge
    rr(g, 1000, gy - 330, 110, 80, 14); g.fillStyle = '#d84a3a'; g.fill(); rr(g, 1020, gy - 345, 70, 18, 4); g.fillStyle = '#3a2a2a'; g.fill();
    rr(g, 1200, gy - 340, 80, 90, 20); g.fillStyle = '#e8e2d6'; g.fill();
    rr(g, 1760, gy - 900, 260, 900, 18); g.fillStyle = '#eef0f2'; g.fill(); g.fillStyle = '#c8ccd4'; g.fillRect(1760, gy - 560, 260, 6); rr(g, 1780, gy - 640, 10, 70, 5); g.fillStyle = '#9aa0aa'; g.fill();
    // magnets/drawings on the fridge
    for (const [dx, dy, c] of [[60, 140, '#f2c21a'], [150, 200, '#3fa06a'], [90, 280, '#e8892a']]) { rr(g, 1760 + dx, gy - 900 + dy, 60, 44, 4); g.fillStyle = c; g.fill(); }
  });
  layer(g, cam, 0.9, (g) => {
    floor(g, gy, night ? ['#6a5a52', '#4a3e38'] : ['#d8b088', '#b08860']);
    // table + chairs
    if (o.table !== false) {
      const tx = o.tableX ?? 700;
      FX.chair(g, tx - 240, gy + 30, 1.6, '#8a5a3a'); FX.chair(g, tx + 250, gy + 30, 1.6, '#8a5a3a');
      rr(g, tx - 220, gy - 150, 440, 26, 8); g.fillStyle = '#b07a4a'; g.fill();
      for (const dx of [-190, 180]) { g.fillStyle = '#8a5a3a'; g.fillRect(tx + dx, gy - 126, 14, 150); }
      if (o.plates !== false) { for (const dx of [-130, 60]) { g.fillStyle = '#ffffff'; g.beginPath(); g.ellipse(tx + dx, gy - 156, 46, 9, 0, 0, Math.PI * 2); g.fill(); } rr(g, tx + 150, gy - 200, 34, 48, 6); g.fillStyle = '#f2c21a'; g.fill(); }
    }
    // Biscuit's bowl
    if (o.bowl !== false) { g.fillStyle = '#D64A33'; g.beginPath(); g.ellipse(o.bowlX ?? 1450, gy + 40, 50, 16, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#b8402c'; g.fillRect((o.bowlX ?? 1450) - 46, gy + 26, 92, 14); }
  });
  return { GY: gy, win };
}

// BEDROOM: bed with a blue duvet, window (garden or sea), desk + laptop, alarm clock; o.time: day|dawn|night
export function bedroom(g, t, cam, o = {}) {
  const gy = GY(), time = o.time || 'day', dark = time === 'night' || time === 'dawn';
  const win = { x: 1180, y: gy - 700, w: 520, h: 420 };
  layer(g, cam, 0.6, (g) => {
    wallFill(g, gy, dark ? '#4a5078' : '#cfe0ea');
    FX.windowFrame(g, { x: win.x, y: win.y, w: win.w, h: win.h, cols: 2, rows: 2, frame: '#fbf6ec', bar: 12 }, (g, X, Y, W, H) => (o.sea ? seaView(g, X, Y, W, H, t, { time: time === 'dawn' ? 'dawn' : time === 'night' ? 'night' : 'day', whale: o.whale }) : gardenView(g, X, Y, W, H, t, { time, ...(o.garden || {}) })));
    if (dark) { g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = radGrad(g, win.x + win.w / 2, win.y + win.h / 2, 20, 900, [alpha(time === 'dawn' ? '#f8c8a0' : '#a0b4ff', 0.18), alpha('#a0b4ff', 0)]); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); g.restore(); }
    // posters
    rr(g, 200, gy - 720, 200, 260, 6); g.fillStyle = '#fbf6ec'; g.fill(); g.fillStyle = '#2a4a8a'; g.fillRect(212, gy - 708, 176, 236); circle(g, 300, gy - 600, 60, '#f2c21a'); circle(g, 330, gy - 620, 16, '#2a4a8a');
    rr(g, 450, gy - 680, 150, 190, 6); g.fillStyle = '#fbf6ec'; g.fill(); g.fillStyle = '#3fa06a'; g.fillRect(462, gy - 668, 126, 166);
    // desk
    rr(g, 1760, gy - 300, 320, 24, 6); g.fillStyle = '#c8a070'; g.fill(); g.fillStyle = '#a07850'; g.fillRect(1780, gy - 276, 16, 280); g.fillRect(2040, gy - 276, 16, 280);
  });
  layer(g, cam, 0.9, (g) => {
    floor(g, gy, dark ? ['#5a5070', '#3a3450'] : ['#c8a07a', '#a07a58'], [700, 420, dark ? '#4a4a7a' : '#e8a050']);
    // bed
    const bx = o.bedX ?? 560;
    rr(g, bx - 380, gy - 330, 50, 330, 10); g.fillStyle = '#8a5a3a'; g.fill();                     // headboard
    rr(g, bx - 340, gy - 170, 720, 120, 14); g.fillStyle = '#f2ece2'; g.fill();                     // mattress
    rr(g, bx - 320, gy - 210, 160, 60, 24); g.fillStyle = '#ffffff'; g.fill();                       // pillow
    if (o.duvet !== false) { rr(g, bx - 180, gy - 200, 560, 140, 30); g.fillStyle = dark ? '#3a5aa0' : '#4a7ad0'; g.fill(); g.fillStyle = alpha('#ffffff', 0.15); g.fillRect(bx - 160, gy - 160, 520, 10); }
    g.fillStyle = '#8a5a3a'; g.fillRect(bx - 340, gy - 50, 720, 30); g.fillRect(bx + 360, gy - 200, 30, 200);
    // bedside table + clock
    rr(g, bx - 520, gy - 170, 110, 170, 8); g.fillStyle = '#a07850'; g.fill();
    if (o.clock !== false) { rr(g, bx - 510, gy - 236, 92, 60, 10); g.fillStyle = '#2a2a34'; g.fill(); text(g, o.clockStr || '7:30', bx - 464, gy - 205, { size: 32, font: FONTS.ui, weight: 900, color: '#ff5a4a', glow: 10, glowColor: 'rgba(255,90,70,.7)' }); }
  });
  return { GY: gy, win, bedX: o.bedX ?? 560 };
}

// STAIRS: hallway at night with a staircase going up to the left; returns step positions
export function stairs(g, t, cam, o = {}) {
  const gy = GY(), night = o.night !== false;
  layer(g, cam, 0.6, (g) => {
    wallFill(g, gy, night ? '#4a4e74' : '#e8dcc8');
    rr(g, 1500, gy - 560, 220, 560, 6); g.fillStyle = night ? '#3a3050' : '#a07850'; g.fill();          // front door
    circle(g, 1680, gy - 280, 10, '#f2c21a');
    if (night) { glow(g, 1000, gy - 700, 300, '#ffd28a', 0.35); seg(g, [[1000, gy - 900], [1000, gy - 740]], 4, '#2a2a34'); circle(g, 1000, gy - 720, 26, '#ffe2b0'); }
  });
  layer(g, cam, 0.85, (g) => {
    floor(g, gy, night ? ['#6a5a52', '#4a3e38'] : WOOD);
    const steps = [];
    for (let i = 0; i < 9; i++) { const x = 1100 - i * 110, y = gy - i * 70; rr(g, x - 110, y - 70, 120, 70 + i * 70, 2); g.fillStyle = shade(night ? '#8a6a52' : '#b8875a', -i * 0.02); g.fill(); g.fillStyle = night ? '#a07a5a' : '#d8a878'; g.fillRect(x - 110, y - 70, 120, 12); steps.push([x - 50, y - 70]); }
    g.strokeStyle = '#6a4a30'; g.lineWidth = 10; g.beginPath(); g.moveTo(1100, gy - 160); g.lineTo(1100 - 9 * 110, gy - 160 - 9 * 70); g.stroke();
    for (let i = 0; i < 9; i++) seg(g, [[1050 - i * 110, gy - 70 * i - 70], [1050 - i * 110, gy - 70 * i - 200]], 5, '#6a4a30');
    o.steps = steps;
  });
  return { GY: gy, steps: o.steps };
}
