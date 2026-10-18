// sets/places.js — small bright sets for the montages: harbour (+ cargo ship), railway (+ train), building site,
// gym, office, phone shop, hallway (bathroom door), space (Earth + Moon). Side views, floor at GY = 0.8·H.
import { E, V, mood, layer, backdrop, rng, rr, seg, circle, ring, poly, linGrad, radGrad, glow, alpha, shade, mix, text, FONTS, clamp } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import { room } from './home.js';

const GYP = () => E.H * 0.8;
function sky(g, t, cam, M, o = {}) {
  layer(g, cam, 0.1, (g) => { backdrop(g, M.sky); if (o.sun !== false) FX.sun(g, o.sunX ?? E.W * 0.78, o.sunY ?? E.H * 0.3, 70, '#fff6e0', M.key, 5); FX.clouds(g, { y: E.H * 0.12, h: 220, color: '#ffffff', a: 0.25, seed: o.seed || 3 }); });
}

// HARBOUR: sea, dock in front, distant cranes. Returns { GY, CX, M, SEA }
export function harbor(g, t, cam, o = {}) {
  const M = mood(o.mood || 'golden'), GY = GYP(), CX = E.W / 2, SEA = GY - 60;
  sky(g, t, cam, M, { sunX: E.W * 0.25, sunY: E.H * 0.42 });
  layer(g, cam, 0.3, (g) => { FX.skyline(g, { x: -E.W, y: SEA - 10, w: E.W * 3, minH: 60, maxH: 200, color: mix(M.sky[1], '#5a4a6a', 0.6), windowColor: alpha('#fff1d6', 0.3), lit: 0.1, seed: 4 });
    for (const x of [-300, 420, 1500]) { seg(g, [[x, SEA], [x, SEA - 380]], 14, '#6a4a5a'); seg(g, [[x - 60, SEA - 380], [x + 260, SEA - 380]], 12, '#6a4a5a'); seg(g, [[x + 200, SEA - 380], [x + 200, SEA - 260]], 3, '#6a4a5a'); } });
  layer(g, cam, 0.6, (g) => { g.fillStyle = linGrad(g, 0, SEA, 0, GY + 60, [mix(M.sky[2], '#4a8aa8', 0.5), '#2a5a7a']); g.fillRect(-E.W * 2, SEA, E.W * 5, 400);
    g.strokeStyle = alpha('#ffe7c7', 0.35); g.lineWidth = 3; for (let i = 0; i < 14; i++) { const y = SEA + 20 + i * 22, x0 = ((i * 337 + t * 40) % 600) - 600; for (let x = x0; x < E.W * 2; x += 600) { g.beginPath(); g.moveTo(x, y); g.lineTo(x + 120 + (i % 3) * 40, y); g.stroke(); } }
    FX.pool(g, E.W * 0.25, SEA + 60, 500, 40, '#ffcf8f', 0.3); });
  layer(g, cam, 1, (g) => { g.fillStyle = '#6a4a3a'; g.fillRect(-E.W * 2, GY, E.W * 5, E.H); g.fillStyle = '#8a6a52'; g.fillRect(-E.W * 2, GY - 8, E.W * 5, 16);
    for (let x = -E.W * 2; x < E.W * 3; x += 160) { g.fillStyle = 'rgba(0,0,0,.15)'; g.fillRect(x, GY, 4, E.H); } if (!o.noBollard) for (const x of [CX - 600, CX + 700]) { rr(g, x - 26, GY - 70, 52, 70, 14); g.fillStyle = '#2a2430'; g.fill(); } });
  return { GY, CX, M, SEA };
}
// cargo ship (side view), bow to the left; x = bow tip, y = waterline, s = scale (1 ≈ 1500 wide)
export function ship(g, x, y, s = 1, o = {}) {
  const { lift = 0, rot = 0 } = o; g.save(); g.translate(x, y - lift); g.rotate(rot); g.scale(s, s);
  poly(g, [[0, -160], [1500, -170], [1460, 60], [120, 60]], '#2a2e3a'); poly(g, [[0, -160], [1500, -170], [1495, -120], [10, -110]], '#b83a2c');
  g.fillStyle = 'rgba(255,255,255,.15)'; g.fillRect(40, -168, 1440, 8);
  const cols = ['#d64a33', '#2E72D2', '#3fb950', '#f2c21a', '#8a5ad6', '#e8892a'], r = rng(5);
  for (let i = 0; i < 14; i++) for (let j = 0; j < 3; j++) { if (r() < 0.15) continue; rr(g, 160 + i * 80, -230 - j * 60, 76, 56, 4); g.fillStyle = cols[Math.floor(r() * cols.length)]; g.fill(); g.fillStyle = 'rgba(0,0,0,.18)'; for (let k = 0; k < 4; k++) g.fillRect(170 + i * 80 + k * 16, -224 - j * 60, 4, 44); }
  rr(g, 1300, -420, 170, 250, 8); g.fillStyle = '#f2ebe0'; g.fill(); for (let k = 0; k < 4; k++) { g.fillStyle = '#5a7aa8'; g.fillRect(1316, -400 + k * 52, 138, 22); }
  g.fillStyle = '#2a2e3a'; g.fillRect(1360, -500, 40, 80);
  g.restore();
}
// RAILWAY: tracks running left-right, embankment, sky. Returns { GY, CX, M, RAIL }
export function rail(g, t, cam, o = {}) {
  const M = mood(o.mood || 'golden'), GY = GYP(), CX = E.W / 2, RAIL = GY - 20;
  sky(g, t, cam, M, { sunX: E.W * 0.8, sunY: E.H * 0.35 });
  layer(g, cam, 0.35, (g) => FX.hills(g, { y: GY - 200, amp: 70, color: mix(M.sky[1], '#5a6a4a', 0.6), seed: 6 }));
  layer(g, cam, 0.7, (g) => { g.fillStyle = shade(M.grass, 0.1); g.fillRect(-E.W * 2, GY - 140, E.W * 5, 140); for (let x = -1200; x < E.W + 1400; x += 520) FX.tree(g, x, GY - 120, 1.4, shade(M.grass, -0.35)); });
  layer(g, cam, 1, (g) => { g.fillStyle = '#7a6a62'; g.fillRect(-E.W * 2, RAIL - 10, E.W * 5, E.H); for (let x = -E.W * 2; x < E.W * 3; x += 70) { g.fillStyle = '#5a4234'; g.fillRect(x, RAIL + 10, 44, 18); }
    g.fillStyle = '#c9c4c0'; g.fillRect(-E.W * 2, RAIL, E.W * 5, 8); g.fillStyle = '#8a8480'; g.fillRect(-E.W * 2, RAIL + 8, E.W * 5, 4); });
  return { GY, CX, M, RAIL };
}
// train (side view) facing left; x = nose, y = rail. crush 0..1 crumples the nose
export function train(g, x, y, s = 1, o = {}) {
  const { crush = 0, cars = 3 } = o; g.save(); g.translate(x, y); g.scale(s, s);
  for (let c = 0; c < cars; c++) { const cx = 60 + c * 640 + (c === 0 ? 0 : 20); rr(g, cx + (c === 0 ? 40 * crush : 0), -330, 600 - (c === 0 ? 40 * crush : 0), 290, 30); g.fillStyle = '#e8e4dc'; g.fill(); g.fillStyle = '#d64a33'; g.fillRect(cx + (c === 0 ? 40 * crush : 0), -150, 600 - (c === 0 ? 40 * crush : 0), 36);
    for (let w = 0; w < 6; w++) { rr(g, cx + 60 + w * 90, -290, 64, 80, 8); g.fillStyle = '#5a7aa8'; g.fill(); }
    for (const wx of [cx + 110, cx + 490]) { circle(g, wx, -30, 34, '#2a2430'); circle(g, wx, -30, 12, '#6a6470'); } }
  const n = 40 * crush; poly(g, [[60 + n, -330], [60 + n, -40], [-60 + n * 1.6, -40], [-30 + n * 1.4, -230]], '#e8e4dc'); poly(g, [[-30 + n * 1.4, -230], [60 + n, -330], [60 + n, -230]], '#5a7aa8');
  if (crush > 0) { g.strokeStyle = '#6a6470'; g.lineWidth = 5; for (let i = 0; i < 5; i++) { g.beginPath(); g.moveTo(-40 + n * 1.5, -60 - i * 40); g.lineTo(0 + n * 1.3, -80 - i * 40 + (i % 2) * 20); g.lineTo(40 + n, -60 - i * 40); g.stroke(); } }
  glow(g, -40 + n * 1.5, -90, 120, '#fff6d0', 0.6);
  g.restore();
}
// BUILDING SITE: empty lot, sky (the house is drawn by the shot)
export function buildsite(g, t, cam, o = {}) {
  const M = mood('golden'), GY = GYP(), CX = E.W / 2;
  layer(g, cam, 0.1, (g) => { const k = o.dayK ?? 0.5; backdrop(g, [mix('#7aa0d0', '#e89a6a', Math.abs(k - 0.5) * 2), mix('#cfdcea', '#f9d49c', Math.abs(k - 0.5) * 2)]); FX.sun(g, lerp(-100, E.W + 100, k), E.H * 0.6 - Math.sin(k * Math.PI) * E.H * 0.45, 60, '#fff6e0', '#ffe2a8', 5); });
  layer(g, cam, 0.4, (g) => FX.skyline(g, { x: -E.W, y: GY - 60, w: E.W * 3, minH: 100, maxH: 300, color: '#8a7a8a', windowColor: alpha('#ffffff', 0.4), lit: 0.1, seed: 13 }));
  layer(g, cam, 1, (g) => { g.fillStyle = '#9a7a5a'; g.fillRect(-E.W * 2, GY - 10, E.W * 5, E.H); g.fillStyle = 'rgba(0,0,0,.08)'; for (let i = 0; i < 30; i++) circle(g, (i * 271) % (E.W * 2) - 200, GY + 40 + (i * 53) % 160, 10 + i % 7, 'rgba(0,0,0,.08)'); });
  return { GY, CX, M };
}
const lerp = (a, b, k) => a + (b - a) * k;
// GYM: rubber floor, mirrors, weight rack, light panels
export function gym(g, t, cam, o = {}) {
  const R = room(g, t, cam, { wall: '#9ab0c8', floor: '#3a3e4a', window: { x: E.W / 2 + 500, w: 600, h: 420, cols: 3, rows: 1 } }), { GY, CX } = R;
  layer(g, cam, 0.62, (g) => { rr(g, CX - 900, GY - 620, 900, 440, 6); g.fillStyle = linGrad(g, 0, GY - 620, 0, GY - 180, ['#dfe8f0', '#b8c8d8']); g.fill(); g.fillStyle = alpha('#ffffff', 0.35); poly(g, [[CX - 860, GY - 620], [CX - 760, GY - 620], [CX - 900, GY - 300], [CX - 900, GY - 520]], alpha('#ffffff', 0.3));
    text(g, 'GYM', CX - 450, GY - 700, { size: 64, color: '#f2c21a', font: FONTS.ui, weight: 900, spacing: 8 }); });
  layer(g, cam, 0.9, (g) => { for (let i = 0; i < 4; i++) { const x = CX + 300 + i * 70; seg(g, [[x, GY], [x, GY - 300]], 10, '#2a2e3a'); } for (let i = 0; i < 5; i++) { circle(g, CX + 330 + (i % 3) * 70, GY - 60 - Math.floor(i / 3) * 110, 40, '#1e2028'); circle(g, CX + 330 + (i % 3) * 70, GY - 60 - Math.floor(i / 3) * 110, 12, '#6a6e7a'); } });
  return R;
}
// OFFICE: glass desk, city window behind, plant
export function office(g, t, cam, o = {}) {
  const R = room(g, t, cam, { wall: o.wall || '#d8d0c4', floor: '#6a5a52', window: { x: E.W / 2 - 700, w: 1400, h: 600, cols: 4, rows: 1 } }), { GY, CX } = R;
  layer(g, cam, 0.92, (g) => { rr(g, CX - 420, GY - 230, 840, 24, 6); g.fillStyle = '#4a3a34'; g.fill(); g.fillStyle = '#3a2e2a'; g.fillRect(CX - 400, GY - 206, 30, 206); g.fillRect(CX + 370, GY - 206, 30, 206);
    for (const dx of [-760, 760]) { rr(g, CX + dx - 50, GY - 120, 100, 120, 12); g.fillStyle = '#b8563a'; g.fill(); for (let i = 0; i < 7; i++) { g.save(); g.translate(CX + dx, GY - 120); g.rotate(-1.2 + i * 0.4); g.fillStyle = '#3f8a4a'; g.beginPath(); g.ellipse(0, -90, 22, 90, 0, 0, Math.PI * 2); g.fill(); g.restore(); } } });
  return R;
}
// PHONE SHOP: bright white walls, counter, phones on display wall
export function store(g, t, cam, o = {}) {
  const R = room(g, t, cam, { wall: '#eef0f2', floor: '#c8c4c0', window: null }), { GY, CX } = R;
  layer(g, cam, 0.62, (g) => { text(g, 'PHONES', CX, GY - 780, { size: 70, color: '#2E72D2', font: FONTS.ui, weight: 900, spacing: 10 });
    for (let i = 0; i < 9; i++) for (let j = 0; j < 2; j++) { const x = CX - 640 + i * 160, y = GY - 650 + j * 190; rr(g, x, y, 70, 130, 10); g.fillStyle = '#1a1c22'; g.fill(); rr(g, x + 6, y + 6, 58, 118, 6); g.fillStyle = ['#6fb8ff', '#ffb86f', '#9be0a8'][(i + j) % 3]; g.fill(); }
    for (let i = 0; i < 4; i++) glow(g, CX - 600 + i * 400, GY - 820, 260, '#ffffff', 0.3); });
  layer(g, cam, 0.92, (g) => { rr(g, CX - 520, GY - 260, 1040, 260, 10); g.fillStyle = '#f7f7f8'; g.fill(); g.fillStyle = '#2E72D2'; g.fillRect(CX - 520, GY - 260, 1040, 20); });
  return R;
}
// HALLWAY: two doors (bathroom on the right), runner rug. o.handle = false removes the bathroom handle, o.sign shows KNOCK FIRST
export function hall(g, t, cam, o = {}) {
  const R = room(g, t, cam, { wall: '#d9c8a8', floor: '#8a6a4e', window: null }), { GY, CX } = R;
  layer(g, cam, 0.62, (g) => {
    for (const [dx, lab] of [[-560, null], [260, 'bath']]) {
      rr(g, CX + dx, GY - 560, 300, 560, 6); g.fillStyle = '#f2ebe0'; g.fill(); rr(g, CX + dx + 20, GY - 540, 260, 540, 4); g.fillStyle = '#e4d8c4'; g.fill();
      for (const yy of [GY - 500, GY - 260]) { g.strokeStyle = 'rgba(0,0,0,.08)'; g.lineWidth = 3; g.strokeRect(CX + dx + 50, yy, 200, 200); }
      const hx = CX + dx + 250, hy = GY - 290;
      if (lab === 'bath' && o.handle === false) { circle(g, hx, hy, 16, '#2a2018'); } else { circle(g, hx, hy, 12, '#c9a24a'); seg(g, [[hx, hy], [hx - 46, hy]], 10, '#c9a24a'); }
      if (lab === 'bath' && o.sign) { g.save(); g.translate(CX + dx + 150, GY - 400); g.rotate(-0.05); rr(g, -110, -50, 220, 100, 6); g.fillStyle = '#fffbe8'; g.fill(); text(g, 'KNOCK', 0, -16, { size: 34, color: '#c84a3a', font: FONTS.ui, weight: 900 }); text(g, 'FIRST!', 0, 22, { size: 34, color: '#c84a3a', font: FONTS.ui, weight: 900 }); g.restore(); }
      if (lab === 'bath') text(g, 'BATH', CX + dx + 150, GY - 620, { size: 28, color: '#6a5a4a', font: FONTS.ui, weight: 900, spacing: 4 });
    }
    if (o.hole) { circle(g, CX - 80, GY - 420, 70, '#2a2018'); for (let i = 0; i < 9; i++) { const a = i * 0.7; seg(g, [[CX - 80 + Math.cos(a) * 70, GY - 420 + Math.sin(a) * 70], [CX - 80 + Math.cos(a) * 130, GY - 420 + Math.sin(a) * 130]], 3, 'rgba(60,40,30,.6)'); } }
  });
  layer(g, cam, 0.9, (g) => { g.fillStyle = '#9a3a3a'; g.fillRect(-E.W * 2, GY + 40, E.W * 5, 70); g.fillStyle = alpha('#f2c21a', 0.5); g.fillRect(-E.W * 2, GY + 52, E.W * 5, 6); g.fillRect(-E.W * 2, GY + 92, E.W * 5, 6); });
  return R;
}
// SPACE: stars, Earth at the bottom, Moon at the top
export function space(g, t, cam, o = {}) {
  layer(g, cam, 0.1, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, E.H * 2, ['#05061a', '#0d1438', '#1a2a5a']); g.fillRect(-E.W, -E.H * 2, E.W * 3, E.H * 5); FX.stars(g, t, { count: 260, area: [-E.W, -E.H * 2, E.W * 3, E.H * 4], color: '#e8eeff' }); });
  layer(g, cam, 0.5, (g) => {
    const ex = E.W * 0.5, ey = E.H + 900; glow(g, ex, ey, 1400, '#6ab0ff', 0.45); circle(g, ex, ey, 1100, '#2a6ab8'); g.save(); g.beginPath(); g.arc(ex, ey, 1100, 0, Math.PI * 2); g.clip();
    for (let i = 0; i < 8; i++) { g.fillStyle = '#3f9a5a'; g.beginPath(); g.ellipse(ex - 900 + i * 260, ey - 1000 + (i % 3) * 120, 160, 70, i, 0, Math.PI * 2); g.fill(); } g.fillStyle = alpha('#ffffff', 0.3); for (let i = 0; i < 6; i++) { g.beginPath(); g.ellipse(ex - 800 + i * 330, ey - 1060 + (i % 2) * 60, 200, 26, 0.2, 0, Math.PI * 2); g.fill(); } g.restore();
    const mx = E.W * 0.5, my = -E.H * 1.4; glow(g, mx, my, 600, '#ffffff', 0.3); circle(g, mx, my, 240, '#e8e4dc'); for (const [dx, dy, r] of [[-80, -60, 40], [60, 30, 54], [-20, 110, 30], [100, -110, 26]]) circle(g, mx + dx, my + dy, r, '#c8c4bc');
  });
  return { CX: E.W / 2 };
}
