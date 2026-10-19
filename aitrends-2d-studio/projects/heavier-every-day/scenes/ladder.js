// ladder.js — the weight seesaw shot used across the video: you on the left, a load on the right.
import { E, layer, ease, prog, lerp, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, breathe } from '/engine/rig2d.js';
import { stage } from './sets/world.js';
import { YOU } from './cast.js';
import { seesaw, LOADS, weightBadge } from './lib.js';
const WARM = '#ffd8a8';
// the seesaw shot: you on the left, `load` on the right. It starts tipped toward the load (yesterday's you) and settles
// level ("as much as"); o.win tips it your way ("heavier than")
export function ladder(g, t, info, day, loadKey, o = {}) {
  const k = t / info.dur, z = o.z ?? 1, cam = { z: 1.0 * z + 0.03 * k, x: 0, y: o.camY ?? 0 }, R = stage(g, t, cam), q = prog(t, 0.25, 0.85), tilt = lerp(-0.2, o.win ? 0.22 : 0, ease.outBack(q)) + (o.win ? 0 : 0.03 * Math.sin(t * 9) * Math.exp(-3 * Math.max(0, t - 0.85)) * (q > 0 ? 1 : 0));
  layer(g, cam, 1, (g) => { seesaw(g, R.CX, R.GY - 150, o.L || 1500, tilt,
    (g) => drawFigure(g, { x: 0, y: 0, s: 1.3, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'smirk', look: [1, -0.2], rim: { color: WARM, dir: [0.6, -0.6] } }),
    (g) => { LOADS[loadKey](g, o.s || 0.9); }); });
  const lab = o.label || loadKey.toUpperCase(); text(g, `${o.win ? '>' : '='} ${lab}`, E.W * 0.74, E.H * 0.2, { size: 64, color: '#ffffff', font: FONTS.ui, weight: 900, stroke: 9, strokeColor: '#140c1e', alpha: ease.out(prog(t, 0.1, 0.4)) });
  weightBadge(g, { day, k: 1, flip: prog(t, 0, 0.3), value: o.value ?? null });
}
