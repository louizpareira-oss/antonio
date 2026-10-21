// sets/outside.js — every location outside the house (v2 look: bright, flat, detailed). Each set draws its own
// parallax layers with the camera and returns { GY } (the floor line) plus anything a shot needs to place things.
import { E, layer, rr, seg, circle, poly, linGrad, radGrad, glow, alpha, shade, rng, text, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const OGY = () => E.H * 0.82;
const SKY = { day: ['#6aaee8', '#a8d4f2', '#e6f2f8'], golden: ['#7a6aa0', '#f0a07a', '#ffd9a0'], dusk: ['#3a3a7a', '#a86a9a', '#f0a07a'],
  dawn: ['#3a3f7a', '#b88aa8', '#f8c8a0'], night: ['#0b1028', '#1d2550', '#3a3570'], overcast: ['#9aa8b8', '#c8d0d8', '#e0e4e8'] };
function sky(g, time = 'day', bottom = OGY()) { g.fillStyle = linGrad(g, 0, -E.H * 0.3, 0, bottom, SKY[time]); g.fillRect(-E.W, -E.H, E.W * 3, bottom + E.H); }
const tree = (g, x, y, s = 1, c = '#4a9a4a') => { seg(g, [[x, y], [x, y - 140 * s]], 16 * s, '#6a4a30'); for (const [dx, dy, r] of [[0, -190, 70], [-50, -150, 52], [50, -150, 52], [0, -130, 50]]) circle(g, x + dx * s, y + dy * s, r * s, c); circle(g, x - 20 * s, y - 210 * s, 30 * s, alpha('#ffffff', 0.12)); };
export { tree as parkTree };

function houseRow(g, y, o = {}) {
  const r = rng(o.seed || 3), cols = ['#f2d8b0', '#c8e0d8', '#f0c8b8', '#d8d0f0', '#f8e8b8'];
  for (let i = 0; i < (o.n || 7); i++) {
    const x = -300 + i * 360, w = 300, h = 300 + r() * 120, c = cols[i % cols.length];
    g.fillStyle = c; g.fillRect(x, y - h, w, h);
    poly(g, [[x - 20, y - h], [x + w / 2, y - h - 110], [x + w + 20, y - h]], ['#d8603a', '#8a4a3a', '#5a6a8a'][i % 3]);
    for (const [dx, dy] of [[50, 80], [190, 80]]) { rr(g, x + dx, y - h + dy, 70, 80, 4); g.fillStyle = '#9ac8e8'; g.fill(); g.fillStyle = '#ffffff'; g.fillRect(x + dx + 33, y - h + dy, 4, 80); }
    rr(g, x + 120, y - 130, 70, 130, 4); g.fillStyle = shade(c, -0.35); g.fill();
  }
}

// STREET: houses, a bakery corner (left), sidewalk, road, bench, lamp. o.time, o.bakery
export function street(g, t, cam, o = {}) {
  const gy = OGY(), time = o.time || 'day';
  layer(g, cam, 0.15, (g) => { sky(g, time, gy); FX.clouds(g, { y: 80, h: 140, color: '#ffffff', a: 0.5, seed: 4 }); });
  layer(g, cam, 0.45, (g) => {
    houseRow(g, gy - 140, { seed: o.seed || 3 });
    if (o.bakery !== false) { const x = o.bakeryX ?? 120; g.fillStyle = '#f6e2c8'; g.fillRect(x, gy - 600, 520, 460); rr(g, x + 30, gy - 420, 460, 230, 6); g.fillStyle = '#bfe0f2'; g.fill();
      for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? '#ffffff' : '#d84a3a'; g.fillRect(x + 20 + i * 60, gy - 470, 60, 50); }
      text(g, 'BAKERY', x + 260, gy - 530, { size: 54, font: FONTS.ui, weight: 900, color: '#8a4a2a', spacing: 6 });
      for (const dx of [80, 180, 300, 400]) { g.fillStyle = '#d8a050'; g.beginPath(); g.ellipse(x + dx, gy - 230, 34, 18, 0, 0, Math.PI * 2); g.fill(); } }
  });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = '#d8d0c4'; g.fillRect(-E.W, gy - 150, E.W * 3, 160);                              // sidewalk
    g.strokeStyle = alpha('#000000', 0.08); g.lineWidth = 3; for (let x = -E.W; x < E.W * 2; x += 140) { g.beginPath(); g.moveTo(x, gy - 150); g.lineTo(x - 40, gy + 10); g.stroke(); }
    g.fillStyle = '#5a5a66'; g.fillRect(-E.W, gy + 10, E.W * 3, E.H); g.fillStyle = '#f2e6c8'; for (let x = -E.W; x < E.W * 2; x += 220) g.fillRect(x, gy + 120, 120, 12);
    g.fillStyle = '#b8b0a4'; g.fillRect(-E.W, gy, E.W * 3, 14);
    if (o.lamp !== false) FX.lampPost(g, o.lampX ?? 1600, gy - 140, 420, { on: time === 'dusk' || time === 'night' });
    if (o.bench !== false) { const bx = o.benchX ?? 1100; rr(g, bx - 160, gy - 230, 320, 20, 6); g.fillStyle = '#8a5a3a'; g.fill(); rr(g, bx - 160, gy - 300, 320, 18, 6); g.fill(); for (const dx of [-140, 120]) { g.fillStyle = '#3a3a44'; g.fillRect(bx + dx, gy - 230, 14, 90); } }
    if (o.tree !== false) tree(g, o.treeX ?? 760, gy - 140, 1.1);
  });
  return { GY: gy - 140, ROAD: gy + 60 };
}

// PARK: grass, trees, path, a bench and an iron gate (o.gate). o.time
export function park(g, t, cam, o = {}) {
  const gy = OGY(), time = o.time || 'day';
  layer(g, cam, 0.15, (g) => { sky(g, time, gy); FX.clouds(g, { y: 90, h: 140, color: '#ffffff', a: 0.5, seed: 7 }); });
  layer(g, cam, 0.4, (g) => { FX.hills(g, { y: gy - 220, amp: 60, color: '#8ac46a', seed: 3 }); for (let i = 0; i < 7; i++) tree(g, -200 + i * 360, gy - 200, 0.8, '#5aa85a'); });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, gy - 200, 0, E.H * 1.5, ['#8ac85a', '#5a9a3a']); g.fillRect(-E.W, gy - 200, E.W * 3, E.H * 2);
    g.fillStyle = '#e8d8b0'; g.beginPath(); g.moveTo(-E.W, gy + 60); g.quadraticCurveTo(E.W / 2, gy - 60, E.W * 2, gy + 40); g.lineTo(E.W * 2, gy + 140); g.quadraticCurveTo(E.W / 2, gy + 40, -E.W, gy + 160); g.fill();
    if (o.bench !== false) { const bx = o.benchX ?? 960; rr(g, bx - 180, gy - 60, 360, 22, 6); g.fillStyle = '#9a6a3a'; g.fill(); rr(g, bx - 180, gy - 140, 360, 20, 6); g.fill(); for (const dx of [-160, 140]) { g.fillStyle = '#3a3a44'; g.fillRect(bx + dx, gy - 60, 14, 80); } }
    if (o.gate) { const gx = o.gateX ?? 1300; g.strokeStyle = '#2a2a34'; g.lineWidth = 8; for (let i = 0; i < 9; i++) { g.beginPath(); g.moveTo(gx + i * 44, gy + 20); g.lineTo(gx + i * 44, gy - 340); g.stroke(); circle(g, gx + i * 44, gy - 350, 8, '#2a2a34'); } for (const y of [gy - 300, gy - 60]) { g.beginPath(); g.moveTo(gx - 10, y); g.lineTo(gx + 360, y); g.stroke(); }
      rr(g, gx - 60, gy - 420, 60, 440, 6); g.fillStyle = '#c8b8a0'; g.fill(); rr(g, gx + 360, gy - 420, 60, 440, 6); g.fill(); text(g, 'DOG PARK', gx + 175, gy - 390, { size: 40, font: FONTS.ui, weight: 900, color: '#2a2a34', spacing: 4 }); }
  });
  return { GY: gy };
}

// ZOO: prairie dog enclosure (sand mounds with burrows) behind a low wall, sign
export function zoo(g, t, cam, o = {}) {
  const gy = OGY();
  layer(g, cam, 0.15, (g) => sky(g, 'day', gy));
  layer(g, cam, 0.4, (g) => { for (let i = 0; i < 6; i++) tree(g, -100 + i * 420, gy - 260, 0.9, '#4a9a4a'); g.fillStyle = '#c8a878'; g.fillRect(-E.W, gy - 300, E.W * 3, 60); });
  layer(g, cam, 0.75, (g) => {
    g.fillStyle = linGrad(g, 0, gy - 260, 0, gy, ['#e8c890', '#d8b078']); g.fillRect(-E.W, gy - 260, E.W * 3, 280);
    for (const x of o.holes || [520, 900, 1280, 1620]) { g.fillStyle = '#c89a60'; g.beginPath(); g.ellipse(x, gy - 120, 120, 50, 0, Math.PI, Math.PI * 2); g.fill(); g.fillStyle = '#3a2a1a'; g.beginPath(); g.ellipse(x, gy - 122, 34, 12, 0, 0, Math.PI * 2); g.fill(); }
  });
  layer(g, cam, 0.95, (g) => {
    g.fillStyle = '#b8a890'; g.fillRect(-E.W, gy - 10, E.W * 3, 120); g.fillStyle = '#d8c8b0'; g.fillRect(-E.W, gy - 24, E.W * 3, 20);
    g.fillStyle = '#d8d0c4'; g.fillRect(-E.W, gy + 110, E.W * 3, E.H);
    if (o.sign !== false) { rr(g, 120, gy - 200, 300, 120, 10); g.fillStyle = '#3a6a3a'; g.fill(); text(g, 'PRAIRIE DOGS', 270, gy - 140, { size: 34, font: FONTS.ui, weight: 900, color: '#f2ead8', spacing: 3 }); seg(g, [[270, gy - 80], [270, gy - 10]], 10, '#5a4a3a'); }
  });
  return { GY: gy - 120, VIEW: gy + 110 };
}

// SCHOOL: o.room 'hall' (lockers) | 'cafe' (cafeteria tables)
export function school(g, t, cam, o = {}) {
  const gy = OGY();
  layer(g, cam, 0.6, (g) => {
    g.fillStyle = '#e8eef2'; g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H);
    g.fillStyle = '#c8d8e0'; g.fillRect(-E.W, gy - 300, E.W * 3, 300);
    if (o.room === 'cafe') {
      for (let i = 0; i < 3; i++) { const x = 300 + i * 600; rr(g, x, gy - 800, 380, 260, 8); g.fillStyle = '#bfe0f2'; g.fill(); g.fillStyle = '#ffffff'; g.fillRect(x + 186, gy - 800, 8, 260); }
      rr(g, 80, gy - 520, 500, 60, 6); g.fillStyle = '#e8892a'; g.fill(); text(g, 'CAFETERIA', 330, gy - 490, { size: 34, font: FONTS.ui, weight: 900, color: '#ffffff', spacing: 4 });
    } else {
      for (let x = -E.W; x < E.W * 2; x += 120) { rr(g, x, gy - 560, 110, 560, 4); g.fillStyle = '#3a8ac8'; g.fill(); for (let k = 0; k < 4; k++) { g.fillStyle = alpha('#000000', 0.18); g.fillRect(x + 20, gy - 540 + k * 10, 70, 4); } rr(g, x + 86, gy - 320, 10, 40, 4); g.fillStyle = '#e8e8f0'; g.fill(); }
    }
  });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, gy - 8, 0, E.H * 1.5, ['#e8e2d8', '#c8c0b4']); g.fillRect(-E.W, gy - 8, E.W * 3, E.H * 2);
    for (let x = -E.W; x < E.W * 2; x += 160) { g.fillStyle = alpha('#000000', 0.05); g.fillRect(x, gy - 8, 80, E.H); }
    if (o.room === 'cafe') for (const tx of o.tables || [400, 1500]) { rr(g, tx - 300, gy - 140, 600, 24, 8); g.fillStyle = '#f2f2f2'; g.fill(); g.fillStyle = '#9aa0aa'; g.fillRect(tx - 270, gy - 116, 12, 120); g.fillRect(tx + 258, gy - 116, 12, 120); rr(g, tx - 290, gy - 70, 580, 16, 6); g.fillStyle = '#3a8ac8'; g.fill(); }
  });
  return { GY: gy };
}

// PET SHOP: shelves of glass tanks and cages, a counter, the door with a bell (left)
export function petshop(g, t, cam, o = {}) {
  const gy = OGY();
  layer(g, cam, 0.6, (g) => {
    g.fillStyle = '#f2ead8'; g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H);
    g.fillStyle = '#3fa06a'; g.fillRect(-E.W, -E.H, E.W * 3, 120 + E.H);
    text(g, 'HAPPY PAWS PET SHOP', E.W / 2, 60, { size: 46, font: FONTS.ui, weight: 900, color: '#ffffff', spacing: 6 });
    for (let row = 0; row < 3; row++) for (let i = 0; i < 9; i++) {
      const x = -260 + i * 280, y = gy - 760 + row * 240;
      rr(g, x, y, 250, 200, 8); g.fillStyle = '#c8e8f0'; g.fill(); g.strokeStyle = '#8a9aa8'; g.lineWidth = 6; g.stroke();
      g.fillStyle = '#e8d8b0'; g.fillRect(x + 6, y + 160, 238, 34);
      o.cells = o.cells || []; o.cells.push([x + 125, y + 160, row, i]);
    }
  });
  layer(g, cam, 0.9, (g) => { g.fillStyle = linGrad(g, 0, gy - 8, 0, E.H * 1.6, ['#d8c8a8', '#b8a888']); g.fillRect(-E.W, gy - 8, E.W * 3, E.H * 2); for (let x = -E.W; x < E.W * 2; x += 120) { g.fillStyle = alpha('#000000', 0.05); g.fillRect(x, gy - 8, 60, E.H); } });
  return { GY: gy, cells: o.cells };
}
export function petDoor(g, t, cam, o = {}) {           // the shop front, from the street
  const r = street(g, t, cam, { bakery: false, bench: false, tree: false, lamp: false, ...o });
  layer(g, cam, 0.45, (g) => {
    const x = 560, gy = OGY() - 140; g.fillStyle = '#3fa06a'; g.fillRect(x, gy - 620, 800, 620); rr(g, x + 60, gy - 420, 420, 300, 8); g.fillStyle = '#c8e8f0'; g.fill();
    rr(g, x + 540, gy - 360, 180, 360, 6); g.fillStyle = '#2a6a4a'; g.fill(); rr(g, x + 560, gy - 340, 140, 160, 6); g.fillStyle = '#c8e8f0'; g.fill();
    rr(g, x + 40, gy - 600, 720, 110, 10); g.fillStyle = '#f2ead8'; g.fill(); text(g, 'HAPPY PAWS', x + 400, gy - 545, { size: 64, font: FONTS.ui, weight: 900, color: '#3fa06a', spacing: 6 });
    for (let i = 0; i < 4; i++) circle(g, x + 140 + i * 90, gy - 220, 26, ['#e8bb70', '#f6f2ea', '#c4682e', '#8e97a8'][i]);
  });
  return r;
}

// GAS STATION at night in the rain (the flashback where Mom finds the puppy)
export function gasStation(g, t, cam, o = {}) {
  const gy = OGY();
  layer(g, cam, 0.15, (g) => { sky(g, 'night', gy); FX.skyline(g, { x: -E.W, y: gy - 260, w: E.W * 3, minH: 80, maxH: 260, color: '#151a3a', windowColor: '#ffcf8a', lit: 0.3, seed: 6 }); });
  layer(g, cam, 0.6, (g) => {
    g.fillStyle = '#e8e8f0'; g.fillRect(200, gy - 720, 1500, 90); g.fillStyle = '#d84a3a'; g.fillRect(200, gy - 650, 1500, 20);
    for (const x of [360, 1540]) { g.fillStyle = '#c8c8d0'; g.fillRect(x, gy - 630, 40, 630); }
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = linGrad(g, 0, gy - 630, 0, gy, [alpha('#fff2d0', 0.35), alpha('#fff2d0', 0.05)]); g.fillRect(200, gy - 630, 1500, 630); g.restore();
    rr(g, 820, gy - 300, 160, 300, 16); g.fillStyle = '#d84a3a'; g.fill(); rr(g, 845, gy - 270, 110, 80, 8); g.fillStyle = '#1a2a3a'; g.fill(); text(g, '$', 900, gy - 230, { size: 50, font: FONTS.ui, weight: 900, color: '#7af0a0' });
  });
  layer(g, cam, 0.9, (g) => { g.fillStyle = '#3a3a48'; g.fillRect(-E.W, gy - 8, E.W * 3, E.H * 2); g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = alpha('#fff2d0', 0.12); g.beginPath(); g.ellipse(950, gy + 60, 700, 70, 0, 0, Math.PI * 2); g.fill(); g.restore(); });
  return { GY: gy };
}
export function rainFX(g, t) { FX.rain(g, t, { count: 260, color: 'rgba(200,215,255,.45)', speed: 1800, angle: 0.12 }); }

// VET clinic: light walls, an exam table, the X-ray light box
export function vet(g, t, cam, o = {}) {
  const gy = OGY();
  layer(g, cam, 0.6, (g) => {
    g.fillStyle = '#e2f0ee'; g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); g.fillStyle = '#c8e2de'; g.fillRect(-E.W, gy - 260, E.W * 3, 260);
    rr(g, 1300, gy - 760, 460, 340, 10); g.fillStyle = '#2a3440'; g.fill(); rr(g, 1320, gy - 740, 420, 300, 8); g.fillStyle = o.xray ? '#cfe8f8' : '#5a6a7a'; g.fill();
    for (const [x, y, c] of [[300, gy - 720, '#e8892a'], [560, gy - 700, '#3fa06a']]) { rr(g, x, y, 200, 150, 8); g.fillStyle = '#ffffff'; g.fill(); circle(g, x + 100, y + 75, 40, c); }
    text(g, 'CITY VET', 1530, gy - 820, { size: 40, font: FONTS.ui, weight: 900, color: '#3a8a7a', spacing: 6 });
  });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, gy - 8, 0, E.H * 1.6, ['#e0e4e8', '#c0c8d0']); g.fillRect(-E.W, gy - 8, E.W * 3, E.H * 2);
    rr(g, 600, gy - 300, 560, 30, 8); g.fillStyle = '#c8d0d8'; g.fill(); g.fillStyle = '#9aa4ae'; g.fillRect(860, gy - 270, 40, 270); rr(g, 760, gy - 30, 240, 30, 8); g.fill();
  });
  return { GY: gy, TABLE: gy - 300 };
}

// CITY at dusk: rooftops with water towers and antennas; returns roof lines for the crows
export function city(g, t, cam, o = {}) {
  const gy = OGY();
  layer(g, cam, 0.1, (g) => { sky(g, 'dusk', gy); FX.sun(g, E.W * 0.75, gy - 260, 70, '#fff2d0', '#ffb070', 5); });
  layer(g, cam, 0.35, (g) => FX.skyline(g, { x: -E.W, y: gy - 120, w: E.W * 3, minH: 200, maxH: 520, color: '#4a3a6a', windowColor: '#ffd28a', lit: 0.35, seed: 9 }));
  const roofs = [];
  layer(g, cam, 0.8, (g) => {
    const r = rng(12);
    for (let i = 0; i < 7; i++) { const x = -200 + i * 340, h = 220 + r() * 220; g.fillStyle = '#5a4a7a'; g.fillRect(x, gy - h, 320, h + 300); g.fillStyle = '#7a6a9a'; g.fillRect(x - 10, gy - h - 16, 340, 20); for (let wy = gy - h + 40; wy < gy + 200; wy += 90) for (let wx = x + 30; wx < x + 300; wx += 70) { g.fillStyle = (wx * 7 + wy) % 3 ? '#ffd28a' : '#3a3058'; g.fillRect(wx, wy, 34, 44); } roofs.push([x, gy - h - 16, 340]);
      if (i % 3 === 1) { rr(g, x + 200, gy - h - 140, 80, 100, 10); g.fillStyle = '#4a3a5a'; g.fill(); seg(g, [[x + 210, gy - h - 40], [x + 210, gy - h - 16]], 6, '#3a2a4a'); seg(g, [[x + 270, gy - h - 40], [x + 270, gy - h - 16]], 6, '#3a2a4a'); } }
  });
  return { GY: gy, roofs };
}

// BEACH at sunset: sea, sun, sand
export function beach(g, t, cam, o = {}) {
  const gy = OGY();
  layer(g, cam, 0.1, (g) => { sky(g, o.time || 'golden', gy - 260); FX.sun(g, E.W * 0.62, gy - 330, 80, '#fff6e0', '#ffd59a', 5); });
  layer(g, cam, 0.3, (g) => { g.fillStyle = linGrad(g, 0, gy - 260, 0, gy, ['#e0907a', '#5a5a8a']); g.fillRect(-E.W, gy - 260, E.W * 3, 260); g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = alpha('#ffe2b0', 0.45); for (let i = 0; i < 8; i++) g.fillRect(E.W * 0.62 - 120 + i * 12, gy - 250 + i * 26, 240 - i * 26, 5); g.restore(); });
  layer(g, cam, 0.9, (g) => { g.fillStyle = linGrad(g, 0, gy - 40, 0, E.H * 1.4, ['#f2d0a0', '#d8a878']); g.beginPath(); g.moveTo(-E.W, gy - 20); g.quadraticCurveTo(E.W / 2, gy - 60, E.W * 2, gy - 10); g.lineTo(E.W * 2, E.H * 2); g.lineTo(-E.W, E.H * 2); g.fill(); g.strokeStyle = alpha('#ffffff', 0.7); g.lineWidth = 5; g.beginPath(); g.moveTo(-E.W, gy - 24); g.quadraticCurveTo(E.W / 2, gy - 64 + 6 * Math.sin(t * 1.5), E.W * 2, gy - 14); g.stroke(); });
  return { GY: gy };
}

// the SEA seen wide at dawn from the shore (the twist); o.whales = 0..1 how many backs and tails rise
export function seaDawn(g, t, cam, o = {}) {
  const gy = OGY(), H = gy - 330;
  layer(g, cam, 0.1, (g) => { sky(g, 'dawn', H); FX.sun(g, E.W * 0.3, H - 10, 40, '#fff2d8', '#ffc890', 5); FX.stars(g, t, { count: 40, area: [-E.W, -E.H, E.W * 3, E.H * 0.4] }); });
  layer(g, cam, 0.3, (g) => {
    g.fillStyle = linGrad(g, 0, H, 0, gy + 200, ['#c08a9a', '#4a4a7a', '#1e2650']); g.fillRect(-E.W, H, E.W * 3, gy + 400 - H);
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = alpha('#ffd8b0', 0.4); for (let i = 0; i < 8; i++) g.fillRect(E.W * 0.3 - 90 + i * 10, H + 8 + i * 22, 180 - i * 20, 4); g.restore();
    const n = Math.round((o.whales || 0) * 60), r = rng(21);
    for (let i = 0; i < n; i++) { const d = r(), x = -400 + r() * (E.W + 800), y = H + 6 + d * d * 300, s = 0.15 + d * d * 0.9, ph = r() * 6;
      if (i % 3) { g.fillStyle = alpha('#1a1e3a', 0.9); g.beginPath(); g.ellipse(x, y, 60 * s, 12 * s, 0, Math.PI, Math.PI * 2); g.fill(); }
      else { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = '#1a1e3a'; g.beginPath(); g.moveTo(-6, 0); g.quadraticCurveTo(-4, -30, -2, -46 - 6 * Math.sin(t + ph)); g.quadraticCurveTo(-30, -52, -52, -70); g.quadraticCurveTo(-20, -74, 0, -58); g.quadraticCurveTo(20, -74, 52, -70); g.quadraticCurveTo(30, -52, 2, -46); g.quadraticCurveTo(4, -30, 6, 0); g.fill(); g.restore(); } }
    if (o.ripple) { g.strokeStyle = alpha('#ffe8d0', 0.5); g.lineWidth = 3; for (let k = 0; k < 4; k++) { const rr2 = ((t * 160 + k * 220) % 900); g.beginPath(); g.ellipse(E.W * 0.5, H + 60, rr2 * 1.6, rr2 * 0.2, 0, 0, Math.PI); g.stroke(); } }
  });
  layer(g, cam, 0.9, (g) => { g.fillStyle = linGrad(g, 0, gy, 0, E.H * 1.5, ['#3a3448', '#26222f']); g.beginPath(); g.moveTo(-E.W, gy + 40); g.quadraticCurveTo(E.W / 2, gy - 10, E.W * 2, gy + 30); g.lineTo(E.W * 2, E.H * 2); g.lineTo(-E.W, E.H * 2); g.fill(); });
  return { GY: gy, H };
}

// UNDERWATER: deep blue with light rays and bubbles
export function ocean(g, t, cam, o = {}) {
  layer(g, cam, 0.15, (g) => { g.fillStyle = linGrad(g, 0, -200, 0, E.H, ['#2a7ab8', '#1a4a88', '#0e2a5a']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); FX.godRays(g, E.W * 0.4, -100, { angle: Math.PI / 2, spread: 0.7, len: 1500, color: '#bfe8ff', a: 0.12, t }); });
  layer(g, cam, 0.5, (g) => { const r = rng(5); g.fillStyle = alpha('#dff4ff', 0.35); for (let i = 0; i < 40; i++) { const x = r() * E.W * 1.4 - 100, y = ((r() * E.H - t * (30 + r() * 40)) % E.H + E.H) % E.H; circle(g, x, y, 2 + r() * 5, alpha('#dff4ff', 0.3)); } });
  return {};
}

// SAVANNA (Kenya): golden grass, acacia trees
export function savanna(g, t, cam, o = {}) {
  const gy = OGY();
  layer(g, cam, 0.1, (g) => { sky(g, 'day', gy); FX.sun(g, E.W * 0.82, 160, 50, '#fffbe8', '#fff2c0', 4); });
  layer(g, cam, 0.35, (g) => { FX.hills(g, { y: gy - 160, amp: 40, color: '#c8a868', seed: 5 }); for (const x of [200, 1500]) { seg(g, [[x, gy - 150], [x, gy - 300]], 14, '#5a4a3a'); g.fillStyle = '#5a7a3a'; g.beginPath(); g.ellipse(x, gy - 310, 170, 34, 0, 0, Math.PI * 2); g.fill(); } });
  layer(g, cam, 0.9, (g) => { g.fillStyle = linGrad(g, 0, gy - 150, 0, E.H * 1.4, ['#e8c878', '#c8a050']); g.fillRect(-E.W, gy - 150, E.W * 3, E.H * 2); const r = rng(4); g.strokeStyle = alpha('#a07830', 0.5); g.lineWidth = 3; for (let i = 0; i < 90; i++) { const x = r() * E.W * 1.4 - 200, y = gy - 120 + r() * 300; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 6, y - 24); g.stroke(); } });
  return { GY: gy };
}

// DESERT (Arizona): red rocks, cactus
export function desert(g, t, cam, o = {}) {
  const gy = OGY();
  layer(g, cam, 0.1, (g) => sky(g, 'day', gy));
  layer(g, cam, 0.35, (g) => { g.fillStyle = '#c86a4a'; for (const [x, w, h] of [[100, 420, 260], [1200, 520, 320]]) { g.fillRect(x, gy - 120 - h, w, h); g.fillStyle = '#b05a3a'; g.fillRect(x, gy - 120 - h, w, 30); g.fillStyle = '#c86a4a'; } });
  layer(g, cam, 0.9, (g) => { g.fillStyle = linGrad(g, 0, gy - 130, 0, E.H * 1.4, ['#e8b888', '#c89868']); g.fillRect(-E.W, gy - 130, E.W * 3, E.H * 2);
    for (const x of [380, 1700]) { seg(g, [[x, gy - 60], [x, gy - 300]], 34, '#4a8a4a'); seg(g, [[x, gy - 180], [x - 60, gy - 180], [x - 60, gy - 250]], 22, '#4a8a4a'); seg(g, [[x, gy - 220], [x + 50, gy - 220], [x + 50, gy - 280]], 20, '#4a8a4a'); } });
  return { GY: gy - 60 };
}
