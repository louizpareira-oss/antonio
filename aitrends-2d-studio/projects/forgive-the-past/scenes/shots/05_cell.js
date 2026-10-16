// shots/05_cell.js — act 4: hands letting go of the bars, the tally wall, the reveal (he was the one in the cell), dawn at the doorway.
import { E, V, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, rng, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad } from '/engine/core.js';
import { drawFigure, POSES, breathe } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { cell, cellGround, cellBars, stoneWall } from '../sets/cell.js';
import { courtroom } from '../sets/courtroom.js';
import { HERO } from '../cast.js';
import { hand } from '../lib.js';
import { doorway } from './01_replay.js';

// s23 — "It's you deciding you've served enough time —"  hands on the bars, fingers loosening, letting go
registerShot('s23', { draw(g, t, info) {
  const M = mood('night'), k = ease.inOut(t / info.dur);
  blurLayer(g, 14, (g) => cell(g, t, { z: 1.4, y: -200 })); veil(g, '#05060e', 0.35);
  const cam = { z: 1.04 + 0.05 * k };
  layer(g, cam, 1, (g) => {
    cellBars(g, E.W * 0.5 - V(330, 360), E.W * 0.5 + V(330, 360), -100, E.H + 100, M, { gap: V(220, 240), w: V(34, 38) });
    const open = ease.inOut(prog(t, 0.6, 1.6)), drop = ease.in(prog(t, 1.5, 2.3));
    for (const sx of [-1, 1]) {
      const bx = E.W * 0.5 + sx * V(110, 120), hy = E.H * 0.46 + drop * 380;
      hand(g, bx + sx * 6, hy, V(0.9, 0.95), { from: [bx + sx * 320, hy + 560], sleeve: HERO.color, open: lerp(0.08, 0.95, open), thumb: sx * 1.5, rim: { color: M.key, dir: [0, -1] } });
    }
  });
  FX.dust(g, t, { count: 30, color: '#c9d4ff', a: 0.25, speed: 5 });
} });

// s24 — "for something you didn't even do."  the tally wall, years of marks; more appear as the camera drifts
registerShot('s24', { draw(g, t, info) {
  const M = mood('night'), k = ease.inOut(t / info.dur), cam = { z: 1.1, x: lerp(-120, 140, k), y: -20 };
  layer(g, cam, 1, (g) => {
    stoneWall(g, -E.W, -E.H, E.W * 3, E.H * 3, M, 7);
    glow(g, E.W * 0.7, E.H * 0.2, E.W * 0.8, M.key, 0.18);
    const r = rng(17), col = alpha('#e8e2d4', 0.75), gw = 120, gh = 110, cols = 11, rows = 13;
    const shown = Math.floor(lerp(cols * rows - 8, cols * rows, prog(t, 0.3, 2.2)));
    let n = 0;
    for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++, n++) {
      if (n >= shown) continue;
      const x0 = -E.W * 0.15 + i * gw + (r() - 0.5) * 10, y0 = E.H * 0.06 + j * gh + (r() - 0.5) * 8;
      for (let m = 0; m < 4; m++) seg(g, [[x0 + m * 16, y0], [x0 + m * 16 + (r() - 0.5) * 4, y0 + 66]], 4, col);
      seg(g, [[x0 - 8, y0 + 50], [x0 + 64, y0 + 10]], 4, col);
    }
  });
  FX.dust(g, t, { count: 40, color: '#c9d4ff', a: 0.3, speed: 5 });
  FX.godRays(g, E.W * 0.9, -80, { angle: Math.PI / 2 + 0.45, spread: 0.3, len: E.H * 1.3, color: M.key, a: 0.06, count: 4, t });
} });

// s26 — "You were the one in the cell."  REVEAL freeze: pull back through the bars — he is inside the cell, in the courtroom
registerShot('s26', { draw(g, t, info) {
  const M = mood('night'), k = ease.out(prog(t, 0, info.dur)), GY = cellGround();
  const cam = { z: lerp(2.0, 1.05, k), y: lerp(-260, 0, k), r: 0.02 * k };
  blurLayer(g, 6, (g) => courtroom(g, 0, { z: 1.1, y: -60 }), null);
  veil(g, '#05060e', 0.45);
  layer(g, cam, 0.9, (g) => { g.fillStyle = linGrad(g, 0, GY, 0, E.H, [shade(M.floor, -0.1), M.dark]); g.fillRect(-E.W, GY, E.W * 3, E.H); FX.pool(g, E.W / 2, GY + 10, 300, 50, M.key, 0.3); });
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: E.W / 2, y: GY, s: V(1.6, 1.7), facing: 1, outfit: HERO, pose: { ...POSES.sad, head: [10, -196] }, expr: 'awe', look: [0.2, -0.5], rim: { color: M.key, dir: [0, -1], w: 5 } });
    cellBars(g, E.W / 2 - V(330, 300), E.W / 2 + V(330, 300), GY - V(620, 700), GY + 6, M, { gap: V(110, 100), w: V(16, 18) });
    g.fillStyle = '#141622'; g.fillRect(E.W / 2 - V(350, 320), GY - V(640, 720), V(700, 640), 24);
  });
  FX.drops(g, 0, { count: 70, rMin: 1.5, rMax: 5, color: '#dfe6ff', drift: 0, seed: 9 });                  // dust frozen in the air
  FX.rings(g, E.W / 2, GY - V(320, 340), t, { count: 3, r0: 120, r1: 620, speed: 0.4, color: '#e8f0ff', a: 0.3 });
  g.save(); g.globalCompositeOperation = 'soft-light'; g.fillStyle = 'rgba(80,120,255,.35)'; g.fillRect(0, 0, E.W, E.H); g.restore();
} });

// s27 — (silence)  THE DOORWAY again, same frame as s03: empty, door open, dawn light pours in and fills the room
registerShot('s27', { draw(g, t, info) {
  const dawn = ease.inOut(prog(t, 0, info.dur * 0.8));
  const { D } = doorway(g, t, { mood: 'golden', dawn, him: false, watcher: false, z: 1.06 + 0.03 * t / info.dur });
  FX.godRays(g, D.x + D.w / 2 + V(60, 60), D.y - D.h * 0.55, { angle: Math.PI / 2 + 0.55, spread: 0.6, len: E.H * 1.1, color: '#fff1d0', a: 0.1 * dawn, count: 7, t });
  glow(g, D.x + D.w / 2, D.y - D.h / 2, E.W * 0.9, '#fff1d0', 0.25 * dawn);
} });
