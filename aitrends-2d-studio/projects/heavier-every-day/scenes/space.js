// space.js — the capsule interior shot with you strapped in or floating (used by the launch and by the twist).
import { E, layer, ease, prog, lerp, seg, alpha } from '/engine/core.js';
import { drawFigure, POSES } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { capsule } from './sets/world.js';
import { YOU } from './cast.js';

// capsule interior with you; o.float 0..1 lifts you off the seat, o.lie rotates you flat, o.spread opens your arms
export function floatShot(g, t, info, o = {}) {
  const k = t / info.dur, cam = o.cam || { z: 1.3 + 0.05 * k, x: -120, y: 40 }, C = capsule(g, t, cam, { earth: o.earth ?? true, rise: 80 * k });
  layer(g, cam, 0.9, (g) => { if (o.under) o.under(g, C); const f = o.float || 0, x = C.CX - 260 + 60 * f, y = C.CY + 160 + 72 * 1.5 - 220 * f + 12 * Math.sin(t * 1.5) * f, sp = o.spread || 0;
    const pose = f > 0.3 ? { ...POSES.relaxed, hF: [lerp(20, 96, sp), lerp(-110, -200, sp)], eF: [lerp(16, 50, sp), lerp(-140, -190, sp)], hB: [lerp(-14, -96, sp), lerp(-110, -200, sp)], eB: [lerp(-10, -50, sp), lerp(-140, -190, sp)], fF: [lerp(10, 40, sp), 0], fB: [lerp(-10, -40, sp), 0] } : POSES.sit;
    drawFigure(g, { x, y, s: 1.5, facing: 1, rot: -(o.lie || 0) * Math.PI / 2 + 0.12 * f * Math.sin(t * 0.9), outfit: YOU, pose, expr: o.expr || 'smile', look: o.look || [0.6, -0.2], rim: { color: '#cfe8ff', dir: [1, -0.4] }, shadow: false });
    if (f < 0.5) for (const dy of [-60, -120]) seg(g, [[x - 40, y + dy * 1.5 + 220 * f], [x + 50, y + dy * 1.5 + 220 * f + 30]], 10, alpha('#2a3346', 1 - f * 2)); });
  FX.dust(g, t, { count: 40, color: '#ffffff', a: 0.4, speed: 4 });
  return { C, cam };
}
