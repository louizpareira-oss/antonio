// sets/pitch.js — football stadium at night: floodlights, packed stands, striped grass, the goal.
// View from behind the penalty spot: goal line at GL (far), spot near the bottom.
import { E, V, mood, layer, backdrop, rng, rr, seg, circle, poly, linGrad, glow, alpha, shade, mix, text, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const GL = () => E.H * 0.6;              // goal line y
export function pitch(g, t, cam, o = {}) {
  const M = mood('night'), CX = E.W / 2, gl = GL(), cheer = o.cheer || 0;
  layer(g, cam, 0.15, (g) => { backdrop(g, M.sky); FX.stars(g, t, { count: 60, area: [-E.W, -E.H, E.W * 3, E.H * 0.9] }); });
  layer(g, cam, 0.35, (g) => {
    // stands
    g.fillStyle = linGrad(g, 0, gl - 520, 0, gl - 60, [shade(M.wall, -0.55), shade(M.wall, -0.3)]); g.fillRect(-E.W * 2, gl - 520, E.W * 5, 470);
    FX.crowd(g, t, { x: -E.W, y: gl - 470, w: E.W * 3, rows: 14, rowH: 30, size: 1.05, colors: ['#2a2a48', '#3a3458', '#232340', '#4a3a5a', '#33335a'], cheer, wave: 0, flags: 0.03, seed: 14 });
    g.fillStyle = shade(M.wall, -0.6); g.fillRect(-E.W * 2, gl - 60, E.W * 5, 40);                       // ad boards
    for (let x = -E.W * 2; x < E.W * 3; x += 360) { g.fillStyle = alpha(['#3a7ae0', '#e04a3a', '#f2c21a'][Math.abs(Math.round(x / 360)) % 3], 0.55); g.fillRect(x + 20, gl - 54, 300, 28); }
    // floodlight towers
    for (const fx of [CX - 900, CX + 900]) {
      seg(g, [[fx, gl - 520], [fx, gl - 1000]], 14, '#0c0e1a');
      rr(g, fx - 110, gl - 1080, 220, 90, 10); g.fillStyle = '#121626'; g.fill();
      for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) { circle(g, fx - 80 + i * 54, gl - 1055 + j * 40, 14, '#fff8e8'); }
      glow(g, fx, gl - 1035, 420, '#e8f0ff', 0.55);
      FX.godRays(g, fx, gl - 1035, { angle: Math.PI / 2 + (fx < CX ? -0.35 : 0.35), spread: 0.6, len: 1500, color: '#e8f0ff', a: 0.05, t });
    }
  });
  layer(g, cam, 0.8, (g) => {
    g.fillStyle = linGrad(g, 0, gl - 30, 0, E.H * 1.6, [shade(M.grass, -0.15), shade(M.grass, -0.45)]); g.fillRect(-E.W * 2, gl - 30, E.W * 5, E.H * 2);
    for (let i = -10; i < 12; i++) { g.fillStyle = 'rgba(255,255,255,.035)'; poly(g, [[CX + i * 240, gl - 30], [CX + i * 240 + 120, gl - 30], [CX + (i * 240 + 120) * 2.4, E.H * 1.6], [CX + i * 240 * 2.4, E.H * 1.6]], 'rgba(255,255,255,.035)'); }
    g.strokeStyle = alpha('#eef2ff', 0.55); g.lineWidth = 5; g.beginPath(); g.moveTo(-E.W, gl); g.lineTo(E.W * 2, gl); g.stroke();       // goal line
    g.beginPath(); g.moveTo(CX - 700, gl); g.lineTo(CX - 1000, gl + 260); g.lineTo(CX + 1000, gl + 260); g.lineTo(CX + 700, gl); g.stroke();  // 6-yard box
    circle(g, CX, E.H * 0.9, 9, alpha('#eef2ff', 0.8));                                                      // penalty spot
    FX.pool(g, CX, gl + 120, 900, 140, '#e8f0ff', 0.1);
  });
  return { GL: gl, CX, M };
}
// goal frame (x = centre, y = goal line), w/h in pixels; drawn in two passes: back net, then posts
export function goal(g, x, y, w = 760, h = 270, o = {}) {
  const post = o.color || '#f2f0ea';
  g.strokeStyle = alpha('#dfe6f2', 0.22); g.lineWidth = 2;
  for (let i = 0; i <= 16; i++) { const xx = x - w / 2 + (w * i) / 16; g.beginPath(); g.moveTo(xx, y - h); g.lineTo(xx + (xx - x) * 0.08, y - 30); g.stroke(); }
  for (let j = 0; j <= 6; j++) { const yy = y - h + (h - 30) * j / 6; g.beginPath(); g.moveTo(x - w / 2, yy); g.lineTo(x + w / 2, yy); g.stroke(); }
  seg(g, [[x - w / 2, y], [x - w / 2, y - h], [x + w / 2, y - h], [x + w / 2, y]], 14, post);
  glow(g, x, y - h, w * 0.5, '#e8f0ff', 0.08);
}
