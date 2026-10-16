// shots/03_turn.js — act 2, what forgiveness is not: the closed door, the refused hand, the chain lock, the case file put down.
import { E, V, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, rng, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { apartment, aptDoor } from '../sets/apartment.js';
import { HERO, HIM } from '../cast.js';
import { hand } from '../lib.js';

// s12 — "That's what people get wrong about forgiveness."  slow push toward a closed door, warm light under it
registerShot('s12', { draw(g, t, info) {
  const D = aptDoor(), k = ease.inOut(t / info.dur), dcx = D.x + D.w / 2 - E.W / 2, dcy = (D.y - D.h / 2) - E.H / 2;
  const cam = { z: lerp(1.25, 1.9, k), x: dcx * 2 * lerp(0.6, 1, k), y: dcy * 2 * lerp(0.4, 0.9, k) };
  const { M } = apartment(g, t, cam, { mood: 'night', door: 0 });
  layer(g, cam, 0.5, (g) => { FX.dust(g, t, { count: 10, color: '#fff1d6', a: 0.18, area: [D.x - 40, D.y - 260, D.w + 80, 240], speed: 3 }); FX.pool(g, D.x + D.w / 2, D.y + 6, D.w * 0.9, 16, M.practical, 0.35); });
} });

// s13 — "It isn't saying it was okay."  just hands: his hand offered, HERO's hand stays back and turns away
registerShot('s13', { draw(g, t, info) {
  const M = mood('night');
  blurLayer(g, 18, (g) => apartment(g, t, { z: 1.9, x: 120, y: -200 }, { mood: 'night' })); veil(g, '#05060e', 0.5);
  const off = ease.out(prog(t, 0, 1.1)), refuse = ease.inOut(prog(t, 0.8, 1.6)), s = V(1.25, 1.35);
  const hx = lerp(E.W * 1.05, E.W * 0.64, off), hy = E.H * 0.47;
  hand(g, hx, hy, s, { from: [E.W + 400, hy + 240], sleeve: HIM.color, cuff: '#e8e2d4', open: 1, thumb: -1.2, rim: { color: shade(M.practical, 0.2), dir: [0, -1] } });
  const mx = lerp(E.W * 0.32, E.W * 0.2, refuse), my = lerp(E.H * 0.53, E.H * 0.6, refuse);
  hand(g, mx, my, s * 1.1, { from: [-400, my + 300], sleeve: HERO.color, open: lerp(0.9, 0.15, refuse), thumb: 1.2, rim: { color: M.key, dir: [0, -1] } });
  glow(g, E.W * 0.5, E.H * 0.47, V(260, 300), M.practical, 0.12 * (1 - refuse));
  FX.dust(g, t, { count: 22, color: '#c9d4ff', a: 0.2 });
} });

// s14 — "It isn't letting them back in."  inside the door: the chain slides into its track; warm light and a shadow at the gap
registerShot('s14', { draw(g, t, info) {
  const M = mood('night'), cam = { z: 1.62 + 0.08 * t / info.dur, x: 170 - 10 * t, y: -170 };
  const gapX = E.W * V(0.62, 0.64), gw = V(46, 52);
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, 0, gapX, 0, [shade(M.wall, -0.6), shade(M.wall, -0.35)]); g.fillRect(-E.W, -E.H, gapX + E.W, E.H * 3);     // door slab
    for (const y of [E.H * 0.12, E.H * 0.56]) { rr(g, E.W * 0.08, y, gapX - E.W * 0.16, E.H * 0.34, 12); g.strokeStyle = alpha(shade(M.wall, -0.75), 0.8); g.lineWidth = 8; g.stroke(); }
    g.fillStyle = linGrad(g, gapX, 0, gapX + gw, 0, [shade(M.practical, -0.1), '#fff0d0', shade(M.practical, -0.2)]); g.fillRect(gapX, -E.H, gw, E.H * 3);  // the gap
    const shadow = ease.inOut(prog(t, 1.3, 2.4)); g.fillStyle = `rgba(20,12,10,${0.75 * Math.sin(Math.PI * shadow)})`; g.fillRect(gapX, E.H * 0.25, gw, E.H * 0.6);  // someone passes outside
    g.fillStyle = linGrad(g, gapX + gw, 0, E.W, 0, [shade(M.wall, -0.45), shade(M.wall, -0.6)]); g.fillRect(gapX + gw, -E.H, E.W * 2, E.H * 3);   // frame + wall
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = linGrad(g, gapX - 200, 0, gapX + gw + 200, 0, [alpha(M.practical, 0), alpha(M.practical, 0.22), alpha(M.practical, 0)]); g.fillRect(gapX - 200, -E.H, gw + 400, E.H * 3); g.restore();
    // chain track on the frame, button on the door
    const ty = E.H * 0.42, trX = gapX + gw + V(30, 30); rr(g, trX, ty - 16, V(150, 140), 32, 8); g.fillStyle = '#8a8fa0'; g.fill(); g.fillStyle = '#2a2c36'; g.fillRect(trX + 10, ty - 4, V(126, 118), 8);
    const anchor = [gapX - V(60, 60), ty + 6]; rr(g, anchor[0] - 22, anchor[1] - 34, 44, 68, 8); g.fillStyle = '#8a8fa0'; g.fill();
    const slide = ease.inOut(prog(t, 0.25, 0.75)), knob = [lerp(gapX - V(150, 150), trX + V(120, 110), slide), lerp(ty + 160, ty, ease.out(prog(t, 0, 0.45)))];
    for (let i = 0; i <= 9; i++) { const u = i / 9, sag = Math.sin(Math.PI * u) * lerp(40, 6, slide); ring(g, lerp(anchor[0], knob[0], u), lerp(anchor[1], knob[1], u) + sag, 9, 4, '#b8bcc8'); }
    circle(g, knob[0], knob[1], 13, '#d0d4e0');
    hand(g, knob[0] + 10, knob[1] + 26, V(0.75, 0.8), { from: [knob[0] - 360, knob[1] + 520], sleeve: HERO.color, open: 0.35, thumb: -1.6, rim: { color: M.practical, dir: [1, -0.4] } });
    if (t > 0.72 && t < 1.2) FX.rings(g, trX + V(120, 110), ty, t - 0.72, { count: 2, r0: 10, r1: 60, color: '#ffffff', a: 0.5 * (1 - prog(t, 0.72, 1.2)) });
  });
  FX.dust(g, t, { count: 26, color: M.practical, a: 0.35, area: [gapX - 140, 0, gw + 280, E.H], speed: 9 });
} });

// s15 — "It's putting down the case you've been building."  a thick CASE FILE is set down; hands let go; dust puffs
registerShot('s15', { draw(g, t, info) {
  const M = mood('night'), k = ease.inOut(t / info.dur);
  blurLayer(g, 14, (g) => apartment(g, t, { z: 1.6, x: -200, y: -260 }, { mood: 'night' })); veil(g, '#05060e', 0.35);
  const cam = { z: 1.02 + 0.06 * k, y: 10 * k };
  const tableY = E.H * V(0.66, 0.64), land = 1.05, dn = ease.in(prog(t, 0.2, land)), lift = ease.out(prog(t, land + 0.35, land + 1.1));
  layer(g, cam, 1, (g) => {
    g.fillStyle = linGrad(g, 0, tableY, 0, E.H, [shade('#5a3a2c', -0.35), shade('#3a2418', -0.6)]); g.fillRect(-E.W, tableY, E.W * 3, E.H);     // table top
    g.fillStyle = alpha('#ffd59a', 0.12); g.fillRect(-E.W, tableY, E.W * 3, 4);
    FX.pool(g, E.W / 2, tableY + 40, V(420, 380), 60, M.practical, 0.25);
    const fw = V(460, 520), fh = V(130, 150), fx = E.W / 2 - fw / 2, fy = lerp(E.H * 0.32, tableY - fh, dn) + (t > land ? Math.sin((t - land) * 40) * 4 * Math.exp(-(t - land) * 8) : 0);
    rr(g, fx, fy, fw, fh, 10); g.fillStyle = '#8a6a44'; g.fill();                                                 // folder
    for (let i = 0; i < 7; i++) { g.fillStyle = i % 2 ? '#e8e2d0' : '#d4ccb6'; g.fillRect(fx + 12 + (i % 3) * 6, fy + 14 + i * (fh - 28) / 7, fw - 30, 7); }
    rr(g, fx, fy, fw, 26, 8); g.fillStyle = '#9a7a52'; g.fill(); g.fillStyle = '#b8924a'; g.fillRect(fx + fw * 0.7, fy - 14, 80, 18);
    text(g, 'CASE FILE', fx + fw * 0.3, fy + fh * 0.6, { size: V(34, 40), font: FONTS.ui, weight: 900, color: alpha('#2a1a10', 0.75), spacing: 3 });
    g.fillStyle = '#b8323a'; g.fillRect(fx + fw * 0.62, fy + 30, 6, fh - 36);                                     // red string tie
    const hy = fy + fh * 0.4 - lift * 240;
    hand(g, fx - 10 - lift * 120, hy, V(1.0, 1.05), { from: [fx - 500, hy + 380], sleeve: HERO.color, open: lerp(0.45, 1, prog(t, land, land + 0.3)), thumb: -1.4, rim: { color: M.practical, dir: [0, -1] } });
    hand(g, fx + fw + 10 + lift * 120, hy, V(1.0, 1.05), { from: [fx + fw + 500, hy + 380], sleeve: HERO.color, open: lerp(0.45, 1, prog(t, land, land + 0.3)), thumb: 1.4, rim: { color: M.practical, dir: [0, -1] } });
    if (t > land) { const p = prog(t, land, land + 1.4); const r = rng(5); for (let i = 0; i < 40; i++) { const a = r() * Math.PI, d = 40 + p * (120 + r() * 260); circle(g, E.W / 2 + Math.cos(a) * d * (r() > 0.5 ? 1 : -1) * 1.6, tableY - 6 - Math.sin(a) * d * 0.4, 2 + r() * 4, alpha('#e8d8c0', 0.5 * (1 - p))); } }
  });
  FX.dust(g, t, { count: 30, color: '#ffe2bd', a: 0.3, speed: 6 });
} });
