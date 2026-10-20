// shots/06_river.js — day 10: you can't cross the bridge, so you walk under the river in a brass diving helmet; Grandpa on
// the far bank at sunrise, one meter apart, his line; the night launch, 3-2-1, eight minutes of push, the engines stop and
// you float, arms spread; Grandpa looks up; "is any of this real?"
import { E, V, S, registerShot, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, radGrad, text, FONTS, shake, rng, talkAmount } from '/engine/core.js';
import { drawFigure, POSES, breathe, walkPose, headPos, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { atlasLogo } from '/projects/stronger-couldnt-stop/scenes/lib.js';
import { river, underwater, house, pad, capsule, orbit } from '../sets/world.js';
import { YOU, KIDYOU, GRANDPA, ATLAS } from '../cast.js';
import { floatShot } from '../space.js';
import { heroFace, chip, bigNum, impact, wt, GOLD, CORAL, weightBadge, midnightClock, grandpa, grandpaFace, FLOORSIT, helmet, crossMark, checkMark, bp, label, arrow, BP, CREAM, limitSign } from '../lib.js';

const DAWN = '#ffe2b8', SUN = '#ffd08a', COLD = '#9fe0ff', LAMP = '#ffcf8a';
const GLINE = [325.24, 333.16];
// a figure wearing the diving helmet (helmet drawn over the head)
function diver(g, o) { drawFigure(g, o); const [hx, hy, r] = headPos({ ...o, outfit: YOU }); helmet(g, hx, hy, r, { facing: o.facing ?? 1, outfit: YOU, expr: o.expr, look: o.look }); return [hx, hy, r]; }
// close-up of the river at dawn: sky, far bank, Grandpa's house, the water surface at SY; inWater draws figures before the front water
function riverClose(g, t, cam, inWater, o = {}) {
  const SY = o.SY ?? E.H * 0.6;
  layer(g, cam, 0.1, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, SY, ['#6a7ab0', '#e8a0a0', '#ffe2b8']); g.fillRect(-E.W, -E.H, E.W * 3, SY + E.H); FX.sun(g, E.W * 0.78, SY - 160, 60, '#fff6e0', SUN, 5); });
  layer(g, cam, 0.3, (g) => { g.fillStyle = '#5a6a5a'; g.fillRect(-E.W, SY - 60, E.W * 3, 64); for (let i = 0; i < 14; i++) FX.tree(g, -E.W * 0.4 + i * 220, SY - 50, 0.6 + (i % 3) * 0.1, shade('#4a6a4a', -(i % 3) * 0.08)); house(g, E.W * 0.62, SY - 54, 0.3, 0.6); FX.fog(g, SY - 120, 160, '#ffe8f0', 0.4); });
  layer(g, cam, 0.7, (g) => { g.fillStyle = linGrad(g, 0, SY - 6, 0, E.H * 1.3, ['#d8b0b8', '#5a7aa0']); g.fillRect(-E.W, SY - 6, E.W * 3, E.H * 2); });
  layer(g, cam, 1, (g) => { inWater(g, SY);
    g.fillStyle = linGrad(g, 0, SY, 0, E.H * 1.3, [alpha('#b8a8c0', 0.7), alpha('#3a5a80', 0.92)]); g.fillRect(-E.W, SY, E.W * 3, E.H * 2);
    const r = rng(6); for (let i = 0; i < 40; i++) { const y = SY + 6 + r() * 400, x = ((r() * E.W * 2 + t * 30) % (E.W * 2.4)) - E.W * 0.2; g.fillStyle = alpha('#ffffff', 0.18 + r() * 0.2); g.fillRect(x, y, 40 + r() * 90, 3); }
    g.fillStyle = alpha('#fff2e0', 0.75); g.fillRect(-E.W, SY - 2, E.W * 3, 5); });
  return { SY };
}
// the Atlas boat (floating at y)
function boat(g, x, y, s = 1, t = 0) { g.save(); g.translate(x, y + 4 * Math.sin(t * 2)); g.scale(s, s); poly(g, [[-220, -40], [220, -40], [170, 30], [-190, 30]], '#f4f4f8'); g.fillStyle = ATLAS; g.fillRect(-210, -20, 420, 16); rr(g, -60, -130, 160, 90, 12); g.fillStyle = '#e8eaf0'; g.fill(); rr(g, -40, -115, 120, 40, 8); g.fillStyle = '#9fd8e8'; g.fill(); atlasLogo(g, -150, -70, 0.5, ATLAS); circle(g, 150, -60, 26, '#3a3a44'); g.restore(); }
// the hose: a sagging curve from a to b
function hose(g, a, b, sag = 120) { g.strokeStyle = '#2a2a30'; g.lineWidth = 12; g.lineCap = 'round'; g.beginPath(); g.moveTo(...a); g.quadraticCurveTo((a[0] + b[0]) / 2, Math.max(a[1], b[1]) + sag, ...b); g.stroke(); g.strokeStyle = alpha('#ffffff', 0.18); g.lineWidth = 3; g.stroke(); }
// the far bank at sunrise: the river on the left, Grandpa's house up the slope. Returns { GY, CX, EDGE }
function farBank(g, t, cam, o = {}) {
  const GY = E.H * 0.8, CX = E.W / 2, EDGE = CX - 380;
  layer(g, cam, 0.08, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, GY, ['#6a7ab0', '#e8a0a0', '#ffe2b8']); g.fillRect(-E.W, -E.H, E.W * 3, GY + E.H); FX.sun(g, CX + 240, GY - 300 - 20 * (t / 6), 80, '#fff6e0', SUN, 6); FX.clouds(g, { y: 80, h: 160, color: '#ffe8f0', a: 0.3, seed: 2 }); });
  layer(g, cam, 0.3, (g) => { poly(g, [[-E.W, GY - 120], [CX - 400, GY - 220], [CX + 300, GY - 160], [E.W * 2, GY - 240], [E.W * 2, GY], [-E.W, GY]], '#7a7aa0'); });
  layer(g, cam, 0.6, (g) => { g.fillStyle = '#6a8a5a'; g.fillRect(CX - 300, GY - 150, E.W * 2, 160); for (let i = 0; i < 8; i++) FX.tree(g, CX + 200 + i * 260, GY - 140, 1.1, shade('#3a6a3a', -(i % 3) * 0.08)); house(g, CX + 600, GY - 140, 0.75, 0.9); });
  layer(g, cam, 1, (g) => { g.fillStyle = linGrad(g, 0, GY - 40, 0, E.H * 1.3, ['#e0b0b0', '#5a7aa0']); g.fillRect(-E.W, GY - 60, EDGE + E.W + 200, E.H); const r = rng(4); for (let i = 0; i < 30; i++) { const y = GY - 50 + r() * 300, x = -E.W * 0.5 + ((r() * E.W + t * 25) % (EDGE + E.W * 0.5)); g.fillStyle = alpha('#ffffff', 0.2 + r() * 0.2); g.fillRect(x, y, 40 + r() * 80, 3); }
    g.fillStyle = linGrad(g, 0, GY - 60, 0, E.H * 1.3, ['#8aa85a', '#4a6a2a']); poly(g, [[EDGE - 60, E.H * 1.4], [EDGE + 60, GY - 30], [E.W * 2, GY - 70], [E.W * 2, E.H * 1.4]]); g.fillStyle = '#9a8060'; poly(g, [[EDGE - 60, E.H * 1.4], [EDGE + 60, GY - 30], [EDGE + 110, GY - 34], [EDGE + 10, E.H * 1.4]]); });
  return { GY, CX, EDGE };
}
const bankY = (R, x) => lerp(R.GY - 30, R.GY - 70, clamp((x - R.EDGE - 60) / (E.W * 2 - R.EDGE)));

// s102 — "You can't cross the bridge."  the bridge closed by an Atlas barrier; you stop in front of it
registerShot('s102', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.45 + 0.06 * k, x: -560, y: 140 }, R = river(g, t, cam, { time: 'dawn', noSign: true });
  layer(g, cam, 1, (g) => { const bx = R.CX - 640, by = R.GY - 40; for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? '#ffffff' : '#d63a2a'; g.fillRect(bx - 160 + i * 40, by - 120, 40, 30); } for (const sx of [-150, 150]) seg(g, [[bx + sx, by], [bx + sx, by - 120]], 10, '#3a3a44');
    rr(g, bx - 110, by - 210, 220, 70, 10); g.fillStyle = '#1c2230'; g.fill(); text(g, 'CLOSED · ATLAS', bx, by - 175, { size: 28, color: ATLAS, font: FONTS.ui, weight: 900 }); limitSign(g, bx + 260, by - 170, 0.55); });
  layer(g, cam, 1, (g) => drawFigure(g, { x: R.CX - 320, y: R.GY - 44, s: 1.4, facing: -1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'sad', look: [-1, -0.2], rim: { color: DAWN, dir: [-0.7, -0.5] } }));
  weightBadge(g, { day: 10, k: 1 });
} });
// s103 — "So you go under it."  you at the river's edge in a brass diving helmet, hose trailing
registerShot('s103', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 2.1 + 0.08 * k, x: -300, y: 200 }, R = river(g, t, cam, { time: 'dawn', noSign: true });
  layer(g, cam, 1, (g) => { const x = R.CX - 300, y = R.GY - 48, s = 1.3; hose(g, [x - 30, y - 220 * s], [x + 700, y - 40], 160);
    diver(g, { x, y, s, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'determined', look: [1, 0.2], rim: { color: DAWN, dir: [-0.7, -0.5] } }); });
  weightBadge(g, { day: 10, k: 1 });
} });
// s104 — "Atlas gives you a diving helmet and an air hose, and you walk into the river."  the boat, the hose; you wade in
registerShot('s104', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.1 + 0.05 * k, x: 0, y: 0 };
  riverClose(g, t, cam, (g, SY) => { const x = lerp(E.W * 0.18, E.W * 0.46, ease.inOut(k)), d = lerp(0, 330, ease.inOut(prog(t, 0.6, info.dur))), y = SY + 20 + d, s = 1.6;
    g.fillStyle = '#b8a080'; poly(g, [[-200, SY - 60], [E.W * 0.22, SY - 10], [E.W * 0.6, E.H * 1.2], [-200, E.H * 1.2]]);
    boat(g, E.W * 0.78, SY - 4, 1.1, t); const [hx, hy] = headPos({ x, y, s, facing: 1, pose: POSES.stand, outfit: YOU }); hose(g, [E.W * 0.78 + 160, SY - 60], [hx - 20, hy + 10], 60);
    diver(g, { x, y, s, facing: 1, outfit: YOU, pose: walkPose(t * 4), expr: 'determined', look: [1, 0.3], rim: { color: DAWN, dir: [-0.7, -0.5] } }); });
  weightBadge(g, { day: 10, k: 1 });
} });
// s105 — "Down, and down, and across the bottom."  UNDERWATER: you walk down the riverbed slope, the hose rising
registerShot('s105', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.05, x: 60 - 120 * k, y: 0 }, U = underwater(g, t, cam, { river: true, slope: true });
  layer(g, cam, 1, (g) => { const x = lerp(E.W * 0.78, E.W * 0.36, k), y = U.floor(x) + 10, s = 1.3, [hx, hy] = headPos({ x, y, s, facing: -1, pose: POSES.stand, outfit: YOU });
    hose(g, [hx + 20, hy - 30], [E.W + 300, -100], -200); diver(g, { x, y, s, facing: -1, outfit: YOU, pose: walkPose(t * 3), expr: 'determined', look: [-1, 0.3], rim: { color: '#e8fff8', dir: [0, -1] }, shadow: false });
    for (let i = 0; i < 6; i++) { const by = hy - 60 - ((t * 120 + i * 90) % 500); ring(g, hx + 10 + 8 * Math.sin(t * 3 + i), by, 6 + (i % 3) * 4, 3, alpha('#e8fff8', 0.8)); } });
  weightBadge(g, { day: 10, k: 1 });
} });
// s106 — "Fish slide past your helmet."  CLOSE: the helmet window, fish crossing
registerShot('s106', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => underwater(g, t, { z: 1.4, x: 0, y: 0 }, { river: true })); const cx = E.W * 0.5, cy = E.H * 0.55, r = 190 * (1 + 0.04 * k);
  for (let i = 0; i < 3; i++) { const fx = lerp(E.W + 200, -200, ((t * 0.35 + i * 0.33) % 1)), fy = cy - 260 + i * 210 + 20 * Math.sin(t * 3 + i); g.save(); g.translate(fx, fy); g.scale(-2.2, 2.2); g.fillStyle = ['#f2a23a', '#c8d8e0', '#e8c070'][i]; g.beginPath(); g.ellipse(0, 0, 26, 11, 0, 0, Math.PI * 2); g.fill(); poly(g, [[-22, 0], [-42, -12], [-42, 12]]); circle(g, 12, -2, 3, '#14161e'); g.restore(); if (i === 1) helmet(g, cx, cy, r, { facing: 1, outfit: YOU, expr: 'awe', look: [1, -0.2] }); }
  for (let i = 0; i < 8; i++) { const by = cy - r * 2 - ((t * 160 + i * 70) % 500); ring(g, cx + r * 1.5 + 10 * Math.sin(t * 4 + i), by + r, 8 + (i % 3) * 4, 3, alpha('#e8fff8', 0.8)); }
} });
// s107 — "Somewhere above you, the bridge you can't cross."  LOOKING UP: the bridge's dark underside through the water
registerShot('s107', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.12 - 0.08 * k, x: 0, y: 40 - 60 * k }; underwater(g, t, cam, { up: true, bridge: true, river: true });
  layer(g, cam, 1, (g) => { const x = E.W * 0.32, y = E.H * 0.86 + 10, s = 1.25, [hx, hy] = headPos({ x, y, s, facing: 1, pose: POSES.stand, outfit: YOU }); hose(g, [hx, hy - 40], [E.W * 0.75, -100], -300);
    diver(g, { x, y, s, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'sad', look: [0.3, -1], rim: { color: '#e8fff8', dir: [0.2, -1] }, shadow: false }); });
  chip(g, '10 t BRIDGE', E.W * 0.62, E.H * 0.2, { size: 42, k: prog(t, 1.0, 1.4) }); weightBadge(g, { day: 10, k: 1 });
} });
// s108 — "On the other side, your grandpa is waiting at the edge of the water."  SUNRISE: the far bank
registerShot('s108', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.1 + 0.08 * k, x: -60, y: 40 }, R = farBank(g, t, cam);
  layer(g, cam, 1, (g) => { const x = R.EDGE + 260; grandpa(g, { x, y: bankY(R, x), s: 1.5, facing: -1, outfit: GRANDPA, pose: breathe({ ...POSES.holdFront, hF: [30, -128], eF: [24, -120] }, t), expr: 'worried', look: [-1, 0.2], rim: { color: SUN, dir: [0.7, -0.5] }, prop: { type: 'cup' } }); });
} });
// s109 — "He's been there since sunrise."  Grandpa with his thermos cup, the sun behind him
registerShot('s109', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 2.0 + 0.08 * k, x: -50, y: 120 }, R = farBank(g, t, cam);
  layer(g, cam, 1, (g) => { const x = R.EDGE + 260, y = bankY(R, x), s = 1.5; grandpa(g, { x, y, s, facing: -1, outfit: GRANDPA, pose: breathe({ ...POSES.holdFront, hF: [30, -150], eF: [24, -130] }, t), expr: 'smallSmile', look: [-1, 0], rim: { color: SUN, dir: [0.7, -0.5] }, prop: { type: 'cup' } });
    for (let i = 0; i < 3; i++) { const sy = y - 170 * s - ((t * 40 + i * 30) % 90); g.strokeStyle = alpha('#ffffff', 0.5 * (1 - ((t * 40 + i * 30) % 90) / 90)); g.lineWidth = 4; g.beginPath(); g.moveTo(x - 30 * s + i * 8, sy); g.quadraticCurveTo(x - 20 * s + i * 8, sy - 20, x - 34 * s + i * 8, sy - 40); g.stroke(); } });
  chip(g, 'WAITING SINCE 5:48 AM', E.W / 2, E.H * 0.84, { size: 40, k: prog(t, 0.3, 0.7) });
} });
// s110 — "You can't hug him."  you come out of the river; Grandpa opens his arms; you raise a hand: stop
registerShot('s110', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.6, x: -170, y: 170 }, R = farBank(g, t, cam);
  layer(g, cam, 1, (g) => { const gx = R.EDGE + 330, yx = R.EDGE + 90; grandpa(g, { x: gx, y: bankY(R, gx), s: 1.5, facing: -1, outfit: GRANDPA, pose: { ...POSES.cheer, hF: [60, -170], hB: [-50, -170] }, expr: 'happy', rim: { color: SUN, dir: [0.7, -0.5] } });
    drawFigure(g, { x: yx, y: bankY(R, yx) + 6, s: 1.5, facing: 1, outfit: YOU, pose: { ...POSES.stand, eF: [34, -170], hF: [60, -190] }, expr: 'sad', look: [1, 0], rim: { color: SUN, dir: [0.7, -0.5] } });
    const ry = bankY(R, yx); for (let i = 0; i < 10; i++) { const r = rng(i + 3); circle(g, yx + (r() - 0.5) * 60, ry - r() * 300 + ((t * 300 + i * 40) % 300), 5, alpha('#cfefff', 0.8)); } });
} });
// s111 — "If you tripped, you'd crush him."  IMAGINED: you stumble, your shadow falls over Grandpa — ✗
registerShot('s111', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.6, x: -170, y: 170 }, R = farBank(g, t, cam), f = ease.in(prog(t, 0.2, 1.0));
  layer(g, cam, 1, (g) => { const gx = R.EDGE + 330, yx = R.EDGE + 90; g.fillStyle = alpha('#14101e', 0.45 * f); g.beginPath(); g.ellipse(gx - 40, bankY(R, gx), 220, 40, 0, 0, Math.PI * 2); g.fill();
    grandpa(g, { x: gx, y: bankY(R, gx), s: 1.5, facing: -1, outfit: GRANDPA, pose: POSES.handsOnHead, expr: 'scared', rim: { color: SUN, dir: [0.7, -0.5] } });
    drawFigure(g, { x: yx + 60 * f, y: bankY(R, yx), s: 1.5, facing: 1, rot: 0.9 * f, outfit: YOU, pose: POSES.fall, expr: 'shocked', rim: { color: SUN, dir: [0.7, -0.5] } }); });
  veil(g, '#808080', 0.6, 'saturation'); veil(g, '#c83a2a', 0.22); crossMark(g, E.W * 0.5, E.H * 0.42, 4, CORAL(), prog(t, 1.0, 1.4));
  label(g, 'IF YOU TRIPPED…', E.W * 0.5, E.H * 0.16, { size: 44, a: prog(t, 0.1, 0.4) });
} });
// s112 — "So you sit on the riverbank, one meter apart."
registerShot('s112', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.55 + 0.06 * k, x: -120, y: 170 }, R = farBank(g, t, cam);
  layer(g, cam, 1, (g) => { const yx = R.EDGE + 140, gx = R.EDGE + 420; drawFigure(g, { x: yx, y: bankY(R, yx), s: 1.4, facing: -1, outfit: YOU, pose: breathe(FLOORSIT, t), expr: 'smallSmile', look: [-1, 0], rim: { color: SUN, dir: [0.7, -0.5] } });
    grandpa(g, { x: gx, y: bankY(R, gx), s: 1.4, facing: -1, outfit: GRANDPA, pose: breathe(FLOORSIT, t), expr: 'smallSmile', look: [-1, 0], rim: { color: SUN, dir: [0.7, -0.5] } });
    UI.dimension(g, t, { x1: yx + 20, y1: bankY(R, yx) - 220, x2: gx - 90, y2: bankY(R, gx) - 220, str: '', start: 0.6 }); });
  chip(g, '1 METRE APART', E.W / 2, E.H * 0.2, { size: 44, k: prog(t, 0.8, 1.2) });
} });
// s113 — "And he tells you the same thing he told you when you were five."  Grandpa turns to you; the memory flickers
registerShot('s113', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 2.1 + 0.1 * k, x: -50, y: 230 }, R = farBank(g, t, cam), turn = t > 0.8;
  layer(g, cam, 1, (g) => { const yx = R.EDGE + 140, gx = R.EDGE + 420; drawFigure(g, { x: yx, y: bankY(R, yx), s: 1.4, facing: turn ? 1 : -1, outfit: YOU, pose: breathe(FLOORSIT, t), expr: 'smallSmile', look: [turn ? 1 : -1, 0], rim: { color: SUN, dir: [0.7, -0.5] } });
    grandpa(g, { x: gx, y: bankY(R, gx), s: 1.4, facing: -1, outfit: GRANDPA, pose: breathe(FLOORSIT, t), expr: 'smile', look: [-1, 0.1], rim: { color: SUN, dir: [0.7, -0.5] } }); });
  const a = prog(t, wt('five', info, t, 3.0) - 0.4, wt('five', info, t, 3.0)); if (a > 0) { const cx = E.W * 0.78, cy = E.H * 0.3, r = 190 * ease.outBack(a); g.save(); g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.clip(); g.fillStyle = '#8ab8c8'; g.fillRect(cx - r, cy - r, r * 2, r * 2);
    drawFigure(g, { x: cx, y: cy + 110, s: 1.0, facing: 1, outfit: KIDYOU, pose: { ...POSES.cheer, hF: [96, -200], eF: [50, -190], hB: [-96, -200], eB: [-50, -190], fF: [40, 0], fB: [-40, 0], kF: [24, -50], kB: [-24, -50] }, expr: 'joy', shadow: false }); veil(g, '#808080', 0.6, 'saturation'); veil(g, '#ffc88a', 0.4, 'multiply'); g.restore(); ring(g, cx, cy, r, 8, '#f4ede0'); }
} });
// s114 — "Lie back. Spread your arms. Trust it."  BIG FACE: Grandpa, tears, the sunrise on his cheek — his line
registerShot('s114', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => farBank(g, t, { z: 1.4, x: 300, y: 0 })); glow(g, E.W * 0.75, E.H * 0.3, 700, SUN, 0.5);
  grandpaFace(g, E.W * 0.46, E.H * 0.6, 310 * (1 + 0.05 * k), { expr: 'smile', face: { tears: true }, look: [-0.4, 0.1], talk: talkAmount(info.globalT, ...GLINE), rimColor: SUN, rimSide: 1 });
} });
// s115 — "Up there, everything floats."  Grandpa points at the sky; you look up
registerShot('s115', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.9 + 0.08 * k, x: -60, y: 180 }, R = farBank(g, t, cam);
  layer(g, cam, 1, (g) => { const yx = R.EDGE + 140, gx = R.EDGE + 420; drawFigure(g, { x: yx, y: bankY(R, yx), s: 1.4, facing: 1, outfit: YOU, pose: breathe(FLOORSIT, t), expr: 'awe', look: [0.4, -1], rim: { color: SUN, dir: [0.7, -0.5] } });
    grandpa(g, { x: gx, y: bankY(R, gx), s: 1.4, facing: -1, outfit: GRANDPA, pose: { ...FLOORSIT, eF: [16, -110], hF: [10, -160] }, expr: 'smile', look: [-0.3, -1], talk: talkAmount(info.globalT, ...GLINE), rim: { color: SUN, dir: [0.7, -0.5] } }); });
} });
// s116 — "That night, they lay you down at the top of the rocket."  NIGHT: the pad, floodlights, the rocket
registerShot('s116', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 0.74 + 0.06 * k, x: 0, y: -230 }, R = pad(g, t, cam);
  layer(g, cam, 0.9, (g) => { glow(g, R.RX, R.GY - 740, 120, '#9fe0ff', 0.6 + 0.2 * Math.sin(t * 3)); });
  chip(g, 'LAUNCH NIGHT · DAY 10', E.W / 2, E.H * 0.9, { size: 40, k: prog(t, 0.4, 0.8) }); weightBadge(g, { day: 10, k: 1 });
} });
// s117 — "Eleven p.m."  MISSION CONTROL: 23:00, payload 72 / 100 t, all GO
registerShot('s117', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#0a1020', '#14203a']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); glow(g, E.W / 2, E.H * 0.4, 900, ATLAS, 0.2);
  atlasLogo(g, E.W * 0.1, E.H * 0.14, 1, ATLAS); text(g, 'ATLAS MISSION CONTROL', E.W * 0.14, E.H * 0.14, { size: 40, color: ATLAS, font: FONTS.ui, weight: 900, spacing: 5, align: 'left' });
  text(g, '23:00', E.W * 0.32, E.H * 0.5, { size: 220, color: '#ffffff', font: FONTS.ui, weight: 900, glow: 20, glowColor: alpha(ATLAS, 0.6) });
  [['PAYLOAD', '72 t / 100 t'], ['WEATHER', 'GO'], ['CREW', '1 · GO'], ['MIDNIGHT IN', '60 min']].forEach(([a, b], i) => { const y = E.H * 0.32 + i * 120, al = ease.out(prog(t, 0.1 + i * 0.15, 0.4 + i * 0.15)); text(g, a, E.W * 0.6, y, { size: 38, color: alpha('#cfd8e8', al), font: FONTS.ui, weight: 900, align: 'left', spacing: 2 }); text(g, b, E.W * 0.92, y, { size: 44, color: alpha(i === 3 ? GOLD() : '#5fd38a', al), font: FONTS.ui, weight: 900, align: 'right' }); });
} });
// s118 — "One hour before midnight."  INSERT: the clock at 11:00
registerShot('s118', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 14, (g) => pad(g, t, { z: 1.4, x: 0, y: -200 })); glow(g, E.W / 2, E.H / 2, 700, '#ffcf8a', 0.25);
  midnightClock(g, E.W / 2, E.H * 0.5, 280 * (1 + 0.05 * k), 0 + t * 0.3); chip(g, '1 HOUR TO MIDNIGHT', E.W / 2, E.H * 0.88, { size: 44, k: prog(t, 0.3, 0.7) });
} });
// capsule close-up of you strapped into the seat (face r); o.squash = g-force, o.shake
function seatFace(g, t, o = {}) {
  capsule(g, t, { z: 1.6, x: -300, y: 60 }, { earth: false }); veil(g, '#0e1430', 0.15); const [sx, sy] = shake(t, o.shake || 0, 30), cx = E.W * 0.45 + sx, cy = E.H * 0.58 + sy, r = 260, q = o.squash || 0;
  rr(g, cx - r * 1.6, cy - r * 1.4, r * 0.5, r * 3.2, 40); g.fillStyle = '#5a6478'; g.fill();
  g.save(); g.translate(cx, cy); g.scale(1 + 0.08 * q, 1 - 0.12 * q); heroFace(g, 0, 0, r, { outfit: YOU, expr: o.expr || 'determined', look: o.look || [0.3, 0], rimColor: COLD, rimSide: 1 }); g.restore();
  for (const dx of [-0.55, 0.55]) seg(g, [[cx + dx * r, cy + r * 0.95], [cx + dx * r * 0.7, E.H + 40]], 34, '#2a3346');
}
// s119–s121 — "Three. Two. One."
registerShot('s119', { draw(g, t, info) { seatFace(g, t, { expr: 'nervous' }); bigNum(g, '3', E.W * 0.8, E.H * 0.45, t, { size: 300, hold: 1.0 }); } });
registerShot('s120', { draw(g, t, info) { const R = pad(g, t, { z: 1.6, x: -40, y: 160 }); layer(g, { z: 1.6, x: -40, y: 160 }, 0.9, (g) => { const r = rng(2); for (let i = 0; i < 14; i++) circle(g, R.RX + (r() - 0.5) * 500, R.GY - 40 - r() * 120 - t * 30, 60 + r() * 60, alpha('#f4efe6', 0.6)); }); bigNum(g, '2', E.W * 0.8, E.H * 0.45, t, { size: 300, hold: 0.9 }); } });
registerShot('s121', { draw(g, t, info) { pad(g, t, { z: 1.4, x: -40, y: 120 }, { ignite: ease.out(prog(t, 0.3, 1.2)) }); bigNum(g, '1', E.W * 0.8, E.H * 0.45, t, { size: 300, hold: 1.0 }); } });
// s122 — "The whole launch pad shakes."  LIFTOFF
registerShot('s122', { draw(g, t, info) {
  const [sx, sy] = shake(t, 16, 30), lift = 600 * ease.in(prog(t, 0.2, info.dur)), cam = { z: 1.0 + 0.04 * t, x: sx, y: -80 - lift * 0.6 + sy };
  pad(g, t, cam, { lift, ignite: 1 }); g.fillStyle = alpha('#fff2d0', 0.12 + 0.08 * Math.sin(t * 30)); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); weightBadge(g, { day: 10, k: 1 });
} });
// s123 — "For eight minutes, the rocket pushes you down harder than anything ever has."  your face pressed; g-meter, timer
registerShot('s123', { draw(g, t, info) {
  const k = t / info.dur; seatFace(g, t, { squash: 0.6 + 0.4 * Math.sin(Math.min(k, 1) * Math.PI), shake: 7, expr: 'determined' });
  const gx = E.W * 0.82, gy = E.H * 0.45, gr = 150, gv = 1 + 2.5 * Math.sin(Math.min(k, 1) * Math.PI * 0.9); g.save(); circle(g, gx, gy, gr + 14, 'rgba(8,12,24,.85)'); g.strokeStyle = alpha('#ffffff', 0.4); g.lineWidth = 6; g.beginPath(); g.arc(gx, gy, gr - 20, Math.PI * 0.8, Math.PI * 2.2); g.stroke();
  g.strokeStyle = CORAL(); g.beginPath(); g.arc(gx, gy, gr - 20, Math.PI * 1.8, Math.PI * 2.2); g.stroke(); const a = Math.PI * 0.8 + (gv / 4) * Math.PI * 1.4; seg(g, [[gx, gy], [gx + Math.cos(a) * (gr - 40), gy + Math.sin(a) * (gr - 40)]], 8, GOLD()); circle(g, gx, gy, 12, GOLD());
  text(g, `${gv.toFixed(1)} g`, gx, gy + 70, { size: 48, color: '#ffffff', font: FONTS.ui, weight: 900 }); g.restore();
  const secs = Math.floor(480 * k); text(g, `T+ 0${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`, gx, gy + gr + 70, { size: 46, color: GOLD(), font: FONTS.ui, weight: 900, stroke: 6, strokeColor: '#140c1e' });
} });
// s124 — "And then…"  the rocket in space, the first stage falls away
registerShot('s124', { draw(g, t, info) {
  orbit(g, t, { z: 1, x: 0, y: 0 }, { earthTop: 260 }); const sep = ease.out(prog(t, 0.2, 1.2)), x = E.W * 0.55 + 60 * t, y = E.H * 0.42 - 40 * t;
  g.save(); g.translate(x, y); g.rotate(0.5); rr(g, -26, -200, 52, 200, 16); g.fillStyle = '#e8eaf0'; g.fill(); poly(g, [[-26, -200], [26, -200], [0, -260]], '#e8eaf0'); circle(g, 0, -150, 10, '#9fe0ff');
  g.save(); g.translate(0, 40 + 120 * sep); g.rotate(0.6 * sep); rr(g, -30, 0, 60, 260, 12); g.fillStyle = '#c8ccd6'; g.fill(); g.fillStyle = '#1e2230'; g.fillRect(-30, 100, 60, 14); g.restore();
  if (sep > 0 && sep < 0.6) glow(g, 0, 30, 120, '#ffffff', 0.6 * (1 - sep / 0.6)); g.restore();
} });
// s125 — "…the engines stop."  silence in the capsule
registerShot('s125', { draw(g, t, info) { floatShot(g, t, info, { float: 0, expr: 'surprised', look: [0, -0.5] }); chip(g, 'ENGINES OFF', E.W / 2, E.H * 0.16, { size: 44, k: prog(t, 0.2, 0.5) }); } });
// s126 — "And you float."  you lift off the seat
registerShot('s126', { draw(g, t, info) { floatShot(g, t, info, { float: ease.inOut(prog(t, 0.1, info.dur)), expr: 'awe' }); } });
// s127 — "For the first time since day one, nothing has to hold you up."  floating, a smile
registerShot('s127', { draw(g, t, info) { floatShot(g, t, info, { float: 1, spread: 0.2, expr: 'joy' }); weightBadge(g, { day: 10, k: 1, value: 'FLOATING' }); } });
// s128 — "You lie back."
registerShot('s128', { draw(g, t, info) { floatShot(g, t, info, { float: 1, lie: ease.inOut(prog(t, 0, info.dur)), spread: 0.2, expr: 'smile' }); } });
// s129 — "You spread your arms."  arms spread, the Earth in the window
registerShot('s129', { draw(g, t, info) { floatShot(g, t, info, { float: 1, lie: 1, spread: ease.inOut(prog(t, 0, 1.2)), expr: 'joy', look: [1, -0.4] }); } });
// s130 — "Somewhere down there, your grandpa is looking up."  NIGHT: Grandpa on his porch; a moving star
registerShot('s130', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.25 + 0.06 * k, x: 120, y: 120 }; layer(g, cam, 0.1, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, E.H, ['#070a1e', '#141a3a', '#2a2a5a']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); FX.stars(g, t, { count: 200, area: [-E.W, -E.H, E.W * 3, E.H * 1.3] });
    const sx = lerp(-200, E.W * 1.1, k), sy = E.H * 0.18 - 60 * k; glow(g, sx, sy, 60, '#ffffff', 0.7); circle(g, sx, sy, 5, '#ffffff'); });
  layer(g, cam, 0.9, (g) => { g.fillStyle = '#1a2a24'; g.fillRect(-E.W, E.H * 0.8, E.W * 3, E.H); house(g, E.W * 0.55, E.H * 0.8, 1.3, 1); grandpa(g, { x: E.W * 0.55 + 240, y: E.H * 0.8 - 26, s: 1.3, facing: -1, outfit: GRANDPA, pose: breathe(POSES.stand, t), expr: 'smallSmile', look: [-0.4, -1], rim: { color: LAMP, dir: [-0.6, -0.6] } }); });
} });
// s131 — "So, is any of this real?"  BLUEPRINT title
registerShot('s131', { draw(g, t, info) {
  bp(g); const a = ease.outBack(prog(t, 0.1, 0.6)); g.save(); g.translate(E.W / 2, E.H * 0.48); g.scale(0.8 + 0.2 * a, 0.8 + 0.2 * a); label(g, 'IS ANY OF THIS', 0, -70, { size: 96, a: clamp(a) }); label(g, 'REAL?', 0, 60, { size: 150, color: GOLD(), glow: true, a: clamp(a) }); g.restore();
  for (let i = 0; i < 3; i++) ring(g, E.W / 2, E.H * 0.48, 420 + i * 60 + 20 * Math.sin(t * 2 + i), 2, alpha(BP(), 0.3));
} });
// s132 — "Not the doubling."  the doubling curve, crossed out
registerShot('s132', { draw(g, t, info) {
  bp(g); const x0 = E.W * 0.2, x1 = E.W * 0.8, y0 = E.H * 0.82, y1 = E.H * 0.18, p = ease.out(prog(t, 0, 0.6)); seg(g, [[x0, y1], [x0, y0], [x1, y0]], 4, alpha(BP(), 0.7));
  g.strokeStyle = GOLD(); g.lineWidth = 8; g.beginPath(); for (let i = 0; i <= 60 * p; i++) { const u = i / 60, x = lerp(x0, x1, u), y = lerp(y0, y1, (2 ** (u * 10) - 1) / 1023); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
  label(g, '×2 EVERY NIGHT', E.W * 0.38, E.H * 0.3, { size: 52 }); crossMark(g, E.W * 0.55, E.H * 0.5, 6, CORAL(), prog(t, 0.5, 0.9)); label(g, 'NOT REAL', E.W * 0.55, E.H * 0.9, { size: 60, color: CORAL(), a: prog(t, 0.7, 1.0) });
} });
