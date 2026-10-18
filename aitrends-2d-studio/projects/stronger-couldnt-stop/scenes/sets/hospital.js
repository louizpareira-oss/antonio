// sets/hospital.js — hospital room (warm lamp, night window), hospital exterior at night, dad's garage (warm work lamp),
// night road (the family car), stadium (bright floodlit pitch).
import { E, V, mood, layer, backdrop, rng, rr, seg, circle, ring, poly, linGrad, radGrad, glow, alpha, shade, mix, text, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import { room } from './home.js';

const GYP = () => E.H * 0.8;

// hospital room: pale mint walls, big night window left, warm bedside lamp, monitor, the bed (side view) on the right
export function hospital(g, t, cam, o = {}) {
  const R = room(g, t, cam, { night: true, wall: '#8ab8b0', floor: '#5a6a72', window: { x: E.W / 2 - 900, w: 560, h: 520 } }), { GY, CX } = R;
  layer(g, cam, 0.62, (g) => { g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = radGrad(g, CX + 520, GY - 420, 40, 900, [alpha('#ffd28a', 0.3), alpha('#ffd28a', 0)]); g.fillRect(-E.W, -E.H, E.W * 4, E.H * 3); g.restore();
    FX.screen(g, { x: CX + 700, y: GY - 640, w: 180, h: 120, glowC: '#5fd39a', a: 0.3 }, (g, x, y, w, h) => { g.strokeStyle = '#5fd39a'; g.lineWidth = 3; g.beginPath(); for (let i = 0; i <= 40; i++) { const xx = x + i * w / 40, ph = (i / 40 + t * 0.6) % 1; g.lineTo(xx, y + h / 2 - (ph > 0.45 && ph < 0.5 ? 40 : ph > 0.5 && ph < 0.53 ? -20 : 0)); } g.stroke(); });
    rr(g, CX - 120, GY - 660, 140, 100, 6); g.fillStyle = '#f2ebe0'; g.fill(); text(g, 'ROOM 9', CX - 50, GY - 610, { size: 26, color: '#3a5a5a', font: FONTS.ui, weight: 900 }); });
  layer(g, cam, 0.9, (g) => { if (!o.noBed) { const bx = CX + 560; g.fillStyle = '#c9ccd2'; g.fillRect(bx - 320, GY - 220, 640, 40); seg(g, [[bx - 300, GY - 180], [bx - 300, GY]], 10, '#9aa0aa'); seg(g, [[bx + 300, GY - 180], [bx + 300, GY]], 10, '#9aa0aa'); rr(g, bx - 330, GY - 270, 660, 60, 20); g.fillStyle = '#e8eef2'; g.fill(); seg(g, [[bx + 320, GY - 360], [bx + 320, GY - 220]], 12, '#9aa0aa'); }
    seg(g, [[CX + 140, GY], [CX + 140, GY - 420]], 6, '#2a2430'); poly(g, [[CX + 90, GY - 420], [CX + 190, GY - 420], [CX + 165, GY - 480], [CX + 115, GY - 480]], '#f2e2c8'); glow(g, CX + 140, GY - 440, 300, '#ffd28a', 0.45); });
  return R;
}
// hospital exterior at night: lit facade with a red cross sign
export function hospitalExt(g, t, cam, o = {}) {
  const M = mood('night'), GY = GYP(), CX = E.W / 2;
  layer(g, cam, 0.1, (g) => { backdrop(g, M.sky); FX.stars(g, t, { count: 120, area: [-E.W, -E.H, E.W * 3, E.H * 1.2] }); FX.moon(g, CX + 700, GY - 760, 34); });
  layer(g, cam, 0.35, (g) => FX.skyline(g, { x: -E.W, y: GY - 80, w: E.W * 3, minH: 200, maxH: 500, color: '#1e2244', windowColor: '#ffcf8a', lit: 0.3, seed: 21 }));
  layer(g, cam, 0.7, (g) => { FX.facade(g, { x: CX - 760, y: GY, w: 1520, h: 560, color: '#7d8a9c', win: '#ffd890', dark: '#2e3a4a', cols: 9, rows: 3, lit: 0.6, seed: 4, door: true });
    rr(g, CX - 150, GY - 660, 300, 90, 12); g.fillStyle = '#f2f2f6'; g.fill(); text(g, 'HOSPITAL', CX + 30, GY - 615, { size: 44, color: '#c84a3a', font: FONTS.ui, weight: 900, spacing: 3 }); poly(g, [[CX - 120, GY - 630], [CX - 100, GY - 630], [CX - 100, GY - 650], [CX - 80, GY - 650], [CX - 80, GY - 630], [CX - 60, GY - 630], [CX - 60, GY - 610], [CX - 80, GY - 610], [CX - 80, GY - 590], [CX - 100, GY - 590], [CX - 100, GY - 610], [CX - 120, GY - 610]], '#e04a3a'); glow(g, CX, GY - 615, 300, '#ff6a5a', 0.3); });
  layer(g, cam, 1, (g) => { g.fillStyle = '#2a2e44'; g.fillRect(-E.W * 2, GY, E.W * 5, E.H); FX.pool(g, CX, GY + 30, 600, 50, '#ffe7b0', 0.25); });
  return { GY, CX, M };
}
// dad's garage: warm work lamp, tool wall, a car with its hood up
export function garage(g, t, cam, o = {}) {
  const R = room(g, t, cam, { night: true, wall: '#6a5a4e', floor: '#4a4448', window: null }), { GY, CX } = R;
  layer(g, cam, 0.62, (g) => { rr(g, CX - 900, GY - 700, 700, 380, 6); g.fillStyle = '#8a6a4a'; g.fill(); for (let i = 0; i < 12; i++) for (let j = 0; j < 4; j++) circle(g, CX - 860 + i * 56, GY - 670 + j * 90, 4, '#3a2a20');
    for (let i = 0; i < 8; i++) { const x = CX - 840 + i * 80; seg(g, [[x, GY - 660], [x, GY - 560 - (i % 3) * 30]], 10, ['#c84a3a', '#9aa0aa', '#f2c21a', '#9aa0aa'][i % 4]); }
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = radGrad(g, CX + 100, GY - 600, 30, 900, [alpha('#ffb860', 0.35), alpha('#ffb860', 0)]); g.fillRect(-E.W, -E.H, E.W * 4, E.H * 3); g.restore(); });
  layer(g, cam, 0.95, (g) => { const lx = CX + 100, ly = GY - 640; seg(g, [[lx, R.CEIL], [lx, ly]], 3, '#2a2420'); poly(g, [[lx - 80, ly + 50], [lx + 80, ly + 50], [lx + 30, ly], [lx - 30, ly]], '#3a5a3a'); glow(g, lx, ly + 56, 320, '#ffcf8a', 0.7); FX.lightCone(g, lx, ly + 50, { angle: Math.PI / 2, spread: 0.8, len: 700, color: '#ffcf8a', a: 0.18 }); });
  return R;
}
// night road: street lamps, dark houses with lit windows, road in front
export function roadNight(g, t, cam, o = {}) {
  const M = mood('night'), GY = GYP(), CX = E.W / 2;
  layer(g, cam, 0.1, (g) => { backdrop(g, M.sky); FX.stars(g, t, { count: 140, area: [-E.W, -E.H, E.W * 3, E.H * 1.2] }); FX.moon(g, CX - 600, GY - 740, 30); });
  layer(g, cam, 0.4, (g) => FX.skyline(g, { x: -E.W * 2, y: GY - 60, w: E.W * 5, minH: 160, maxH: 420, color: '#1a1e3c', windowColor: '#ffcf8a', lit: 0.35, seed: 31 }));
  if (o.building) layer(g, cam, 0.8, (g) => o.building(g, GY - 60));                               // optional foreground building on the sidewalk
  layer(g, cam, 0.8, (g) => { g.fillStyle = '#2a2e48'; g.fillRect(-E.W * 3, GY - 60, E.W * 7, 70); for (let x = -E.W * 2; x < E.W * 3; x += 640) FX.lampPost(g, x, GY - 56, 420, { color: '#14121c', light: '#ffcf8a', on: true, a: 0.2 }); });
  layer(g, cam, 1, (g) => { g.fillStyle = '#24263a'; g.fillRect(-E.W * 3, GY, E.W * 7, E.H); for (let x = -E.W * 3; x < E.W * 4; x += 260) { g.fillStyle = alpha('#f2d27a', 0.6); g.fillRect(x, GY + 180, 130, 9); } for (let x = -E.W * 2; x < E.W * 3; x += 640) FX.pool(g, x + 40, GY + 20, 220, 30, '#ffcf8a', 0.18); });
  return { GY, CX, M, LANE: GY + 120 };
}
// stadium: floodlights, tiered crowd, bright green pitch, goal on the right
export function stadium(g, t, cam, o = {}) {
  const M = mood('day'), GY = GYP(), CX = E.W / 2;
  layer(g, cam, 0.1, (g) => { backdrop(g, ['#1a2a5a', '#3a5a9a']); });
  layer(g, cam, 0.4, (g) => { g.fillStyle = '#3a3a52'; g.fillRect(-E.W * 2, GY - 560, E.W * 5, 420); FX.crowd(g, t, { y: GY - 520, rows: 11, rowH: 34, size: 2.2, w: E.W * 3, x: -E.W, colors: ['#d64a33', '#2E72D2', '#f2c21a', '#e8e4dc', '#3a3a52', '#8a5ad6'], flags: 0.04, cheer: 1, seed: 3 });
    for (const x of [CX - 800, CX + 800]) { seg(g, [[x, GY - 560], [x, GY - 900]], 14, '#2a2a3a'); rr(g, x - 120, GY - 980, 240, 90, 8); g.fillStyle = '#e8eef8'; g.fill(); glow(g, x, GY - 935, 600, '#e8f0ff', 0.6); } });
  layer(g, cam, 1, (g) => { g.fillStyle = linGrad(g, 0, GY - 140, 0, E.H * 1.4, ['#4aa04a', '#2a7a3a']); g.fillRect(-E.W * 2, GY - 140, E.W * 5, E.H * 2); for (let x = -E.W * 2; x < E.W * 3; x += 240) { g.fillStyle = 'rgba(255,255,255,.05)'; g.fillRect(x, GY - 140, 120, E.H * 2); } g.fillStyle = alpha('#ffffff', 0.7); g.fillRect(-E.W * 2, GY - 60, E.W * 5, 6); });
  return { GY, CX, M };
}
export function goal(g, x, y, s = 1, o = {}) {
  const { hole = 0 } = o; g.save(); g.translate(x, y); g.scale(s, s);
  g.strokeStyle = alpha('#ffffff', 0.5); g.lineWidth = 2; for (let i = 0; i < 12; i++) { g.beginPath(); g.moveTo(-200 + i * 40, -300); g.lineTo(-160 + i * 40, 0); g.stroke(); } for (let j = 0; j < 8; j++) { g.beginPath(); g.moveTo(-200, -300 + j * 40); g.lineTo(260, -290 + j * 40); g.stroke(); }
  if (hole) { circle(g, 60, -150, 80 * hole, '#2a7a3a'); }
  g.strokeStyle = '#ffffff'; g.lineWidth = 14; g.beginPath(); g.moveTo(-200, 0); g.lineTo(-200, -300); g.lineTo(260, -300); g.lineTo(260, 0); g.stroke();
  g.restore();
}
