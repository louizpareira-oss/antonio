// shots/02_rules.js — Monday: the scale says 140 kg; a new scale agrees; the medical chart says you're normal… except the
// weight; you can still jump; every midnight your weight doubles; the weight seesaw from a gorilla to the Titanic.
import { E, V, S, registerShot, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake, rng } from '/engine/core.js';
import { drawFigure, POSES, breathe, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { bathroom, living, bedroom, bed } from '/projects/stronger-couldnt-stop/scenes/sets/home.js';
import { stage } from '../sets/world.js';
import { ladder } from '../ladder.js';
import { YOU, MOM } from '../cast.js';
import { heroFace, hand, weightBadge, midnightClock, seesaw, LOADS, cracks, impact, wt, GOLD, CORAL, card, uiText, UIBG, UIT, UIS, checkMark, crossMark, kg, wStr, sleeper } from '../lib.js';

const WARM = '#ffd8a8';
// digital bathroom scale, top view, centred; str = the LCD reading
function scale(g, x, y, s, str, o = {}) {
  g.save(); g.translate(x, y); g.scale(s, s); rr(g, -260, -200, 520, 400, 60); g.fillStyle = o.color || '#e8ecf2'; g.fill(); g.strokeStyle = 'rgba(0,0,0,.15)'; g.lineWidth = 6; g.stroke();
  rr(g, -150, -150, 300, 110, 16); g.fillStyle = '#1a2a24'; g.fill(); text(g, str, 0, -94, { size: 80, color: o.lcd || '#7affb0', font: FONTS.ui, weight: 900, glow: 18, glowColor: alpha(o.lcd || '#7affb0', 0.6) });
  if (o.feet) for (const sx of [-1, 1]) { g.save(); g.translate(sx * 110, 80); g.fillStyle = '#2a2f3a'; g.beginPath(); g.ellipse(0, 0, 60, 110, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#f4f2ee'; g.beginPath(); g.ellipse(0, 0, 66, 116, 0, Math.PI * 0.15, Math.PI * 0.85); g.fill(); g.restore(); }
  g.restore();
}
// bathroom wide with a scale on the floor; returns { GY, CX, SX }
function bath(g, t, cam) { const R = bathroom(g, t, cam), SX = R.CX - 80; layer(g, cam, 1, (g) => { rr(g, SX - 110, R.GY - 18, 220, 22, 8); g.fillStyle = '#e8ecf2'; g.fill(); }); return { ...R, SX }; }

// s014 — "It starts on a Monday."  bathroom morning, you step onto the scale
registerShot('s014', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.2 + 0.04 * k, x: -60, y: 60 }, R = bath(g, t, cam), st = ease.inOut(prog(t, 0.2, 1.1));
  layer(g, cam, 1, (g) => drawFigure(g, { x: R.SX - 160 + 160 * st, y: R.GY - 18 * st, s: 1.45, facing: 1, outfit: YOU, pose: st < 1 ? walkPose(st * Math.PI * 2) : breathe(POSES.stand, t), expr: 'sleepy', look: [0, 1], rim: { color: WARM, dir: [-0.6, -0.6] } }));
  rr(g, E.W * 0.8, E.H * 0.18, 150, 150, 10); g.fillStyle = '#ffffff'; g.fill(); g.fillStyle = '#d63a2a'; g.fillRect(E.W * 0.8, E.H * 0.18, 150, 44); text(g, 'MON', E.W * 0.8 + 75, E.H * 0.18 + 24, { size: 30, color: '#fff', font: FONTS.ui, weight: 900 }); text(g, '1', E.W * 0.8 + 75, E.H * 0.18 + 100, { size: 64, color: '#1e2433', font: FONTS.ui, weight: 900 });
} });
// s015 — "…it says one hundred and forty kilos."  INSERT: the digits roll up
registerShot('s015', { draw(g, t, info) {
  blurLayer(g, 14, (g) => bathroom(g, t, { z: 1.4, x: 0, y: 200 })); const v = Math.round(lerp(0, 140, ease.out(prog(t, 0.2, 2.6))));
  scale(g, E.W / 2, E.H * 0.55, 1.5, v.toFixed(1), { feet: true }); weightBadge(g, { day: 1, k: prog(t, 2.4, 2.8) });
} });
// s016 — "Yesterday, it said seventy."  INSERT: ghost 70 kg, crossed out; SUN
registerShot('s016', { draw(g, t, info) {
  blurLayer(g, 14, (g) => bathroom(g, t, { z: 1.4, x: 0, y: 200 })); veil(g, 'rgba(30,30,60,.25)'); g.save(); g.globalAlpha *= 0.85; scale(g, E.W / 2, E.H * 0.55, 1.5, '70.0', { lcd: '#cfe8ff' }); g.restore();
  crossMark(g, E.W / 2, E.H * 0.43, 3, CORAL(), prog(t, 0.6, 1.0)); text(g, 'SUNDAY', E.W / 2, E.H * 0.16, { size: 56, color: '#ffffff', font: FONTS.ui, weight: 900, spacing: 6, stroke: 8, strokeColor: '#14101c' });
} });
// s017 — "Your mom says the scale is broken."  Mom taps the scale, shrugs
registerShot('s017', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.5 + 0.04 * k, x: 0, y: 140 }, R = bath(g, t, cam);
  layer(g, cam, 1, (g) => { drawFigure(g, { x: R.SX - 260, y: R.GY, s: 1.45, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'confused', look: [1, 0.6], rim: { color: WARM, dir: [-0.6, -0.6] } });
    drawFigure(g, { x: R.SX + 190, y: R.GY, s: 1.4, facing: -1, outfit: MOM, pose: t < 1 ? { ...POSES.crouch, hF: [60, -20 + 10 * Math.sin(t * 20)] } : POSES.shrug, expr: 'smirk', talk: 0.5 + 0.5 * Math.sin(t * 12), rim: { color: WARM, dir: [0.6, -0.6] } }); });
} });
// s018 — "So you buy a new one."  INSERT: the new box opens
registerShot('s018', { draw(g, t, info) {
  blurLayer(g, 14, (g) => living(g, t, { z: 1.3, x: 0, y: 100 })); const o = ease.outBack(prog(t, 0.1, 0.7)), cx = E.W / 2, cy = E.H * 0.62;
  rr(g, cx - 330, cy - 220, 660, 380, 10); g.fillStyle = '#c8a070'; g.fill(); g.fillStyle = '#ffffff'; g.fillRect(cx - 250, cy - 120, 500, 160); text(g, 'NEW SCALE', cx, cy - 40, { size: 64, color: '#1e2433', font: FONTS.ui, weight: 900 });
  for (const sx of [-1, 1]) { g.save(); g.translate(cx + sx * 330, cy - 220); g.rotate(-sx * 2.2 * o); rr(g, sx < 0 ? 0 : -330, -16, 330, 32, 6); g.fillStyle = '#b08a5a'; g.fill(); g.restore(); }
} });
// s019 — "It says the same thing."  INSERT: the new scale reads 140 too
registerShot('s019', { draw(g, t, info) { blurLayer(g, 14, (g) => bathroom(g, t, { z: 1.4, x: 0, y: 200 })); scale(g, E.W / 2, E.H * 0.55, 1.5 + 0.05 * t, '140.0', { feet: true, color: '#f4e6d8' }); weightBadge(g, { day: 1, k: 1 }); } });
// s020 — "You look exactly the same."  BIG FACE in the mirror
registerShot('s020', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => bathroom(g, t, { z: 1.4, x: 300, y: -100 }));
  const mx = E.W * 0.5, my = E.H * 0.5; rr(g, mx - 470, my - 400, 940, 800, 40); g.fillStyle = '#d8dee6'; g.fill(); g.save(); rr(g, mx - 440, my - 370, 880, 740, 30); g.clip(); g.fillStyle = linGrad(g, 0, my - 370, 0, my + 370, ['#c8d8e0', '#9ab0c0']); g.fillRect(mx - 440, my - 370, 880, 740);
  heroFace(g, mx, my + 120, 300 * (1 + 0.03 * k), { outfit: YOU, expr: 'confused', look: [0, 0], rimColor: WARM, rimSide: 1 });
  g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = alpha('#ffffff', 0.12); poly(g, [[mx - 440, my - 370], [mx - 200, my - 370], [mx - 440, my + 60]]); g.restore(); g.restore();
} });
// medical chart card: rows [label, value, ok]
function chart(g, t, rows, hiRow = -1) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#dfeaf2', '#b8cad8']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const x = E.W * 0.14, y = E.H * 0.13, w = E.W * 0.72, h = E.H * 0.74; card(g, x, y, w, h, { r: 30 });
  g.fillStyle = '#3a8ac0'; rr(g, x, y, w, 110, 30); g.fill(); g.fillRect(x, y + 70, w, 40); uiText(g, '+ CITY CLINIC · CHECK-UP', x + 50, y + 56, 48, { color: '#ffffff', weight: 900 });
  uiText(g, 'PATIENT: YOU · AGE 15', x + 50, y + 175, 40, { color: UIS });
  rows.forEach(([lab, val, ok], i) => { const yy = y + 290 + i * 160, hi = i === hiRow, a = ease.out(prog(t, 0.15 + i * 0.25, 0.45 + i * 0.25)); if (a <= 0) return;
    g.save(); g.globalAlpha *= a; if (hi) { rr(g, x + 30, yy - 70, w - 60, 140, 16); g.fillStyle = alpha(CORAL(), 0.15 + 0.1 * Math.sin(t * 8)); g.fill(); }
    uiText(g, lab, x + 60, yy, 64, { color: UIT, weight: 900 }); uiText(g, val, x + w * 0.42, yy, 70, { color: hi ? CORAL() : UIT, weight: 900 });
    if (ok) checkMark(g, x + w - 120, yy - 14, 2, '#3fb950', 1); else { text(g, '?!', x + w - 120, yy, { size: 100, color: CORAL(), font: FONTS.ui, weight: 900 }); } g.restore(); });
}
// s021 — "Same size."  MEDICAL CHART: height ✓, X-ray ✓
registerShot('s021', { draw(g, t, info) { chart(g, t, [['HEIGHT', '172 cm', true], ['X-RAY', 'normal', true], ['HEART', 'normal', true]]); } });
// s022 — "Same face."  MEDICAL CHART: weight 140 kg ?!
registerShot('s022', { draw(g, t, info) { chart(g, t + 2, [['HEIGHT', '172 cm', true], ['X-RAY', 'normal', true], ['WEIGHT', '140 kg', false]], 2); } });
// s023 — "You can still walk, run and jump like always."  LIVING ROOM: a jump, the landing cracks the tiles
registerShot('s023', { draw(g, t, info) {
  const cam = { z: 1.55, x: -150, y: 170 }, R = living(g, t, cam), j = prog(t, 0.6, 1.9), land = t - 1.9, [sx, sy] = shake(t, land > 0 && land < 0.4 ? 10 : 0, 24);
  layer(g, { ...cam, x: sx, y: 60 + sy }, 1, (g) => { const x = lerp(R.CX - 600, R.CX + 100, prog(t, 0, 1.9)), y = R.GY - Math.sin(Math.PI * j) * 260;
    if (land > 0) { g.save(); g.translate(R.CX + 100, R.GY + 6); g.scale(1, 0.25); cracks(g, 0, 0, 300, ease.out(clamp(land / 0.3)), { seed: 4, color: 'rgba(30,20,20,.85)', w: 6, arms: 9, rings: 1 }); g.restore(); impact(g, R.CX + 100, R.GY - 10, land, { r: 200 }); }
    drawFigure(g, { x, y, s: 1.45, facing: 1, outfit: YOU, pose: j > 0 && j < 1 ? POSES.jump : t < 0.6 ? walkPose(t * 9, { run: true }) : POSES.crouch, expr: 'joy', rim: { color: WARM, dir: [-0.6, -0.6] } }); });
  weightBadge(g, { day: 2, k: 1 });
} });
// s024 — "Your body keeps up."  BIG FACE: grin + a flex
registerShot('s024', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => living(g, t, { z: 1.3, x: 200, y: -60 })); glow(g, E.W * 0.45, E.H * 0.45, 700, '#ffe2b0', 0.3);
  heroFace(g, E.W * 0.42, E.H * 0.6, 300 * (1 + 0.04 * k), { outfit: YOU, expr: 'joy', look: [0.4, 0], rimColor: WARM, rimSide: 1 });
  hand(g, E.W * 0.74, E.H * 0.42 - 20 * Math.sin(t * 4), 1.4, { from: [E.W * 0.9, E.H + 200], sleeve: YOU.color, fist: true, rim: { color: WARM, dir: [-1, -0.3] } });
} });
// s025 — "Everything else doesn't."  a chair splits under you
registerShot('s025', { draw(g, t, info) {
  const cam = { z: 1.7, x: 120, y: 200 }, R = living(g, t, cam), br = ease.in(prog(t, 0.35, 0.65)), cx = R.CX + 120, GY = R.GY;
  layer(g, cam, 1, (g) => { const legs = [[-70, -1], [70, 1]]; for (const [dx, sx] of legs) { g.save(); g.translate(cx + dx, GY); g.rotate(sx * 0.9 * br); seg(g, [[0, 0], [0, -110]], 14, '#8a5a38'); g.restore(); }
    rr(g, cx - 90, GY - 120 + 100 * br, 180, 22, 6); g.fillStyle = '#b07848'; g.fill(); seg(g, [[cx - 80, GY - 120 + 100 * br], [cx - 90, GY - 300 + 110 * br]], 14, '#8a5a38');
    drawFigure(g, { x: cx - 10, y: GY - 16 + 110 * br, s: 1.45, facing: 1, outfit: YOU, pose: POSES.sit, expr: br > 0.3 ? 'shocked' : 'smile', rim: { color: WARM, dir: [-0.6, -0.6] } });
    if (br > 0) impact(g, cx, GY - 20, t - 0.6, { r: 180 }); });
  weightBadge(g, { day: 2, k: 1 });
} });
// s026 — "Because every night, at the stroke of midnight, your weight doubles."  NIGHT bedroom, the clock, ×2
registerShot('s026', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.15 + 0.05 * k, x: -260, y: 60 }, R = bedroom(g, t, cam, { night: true }), f = wt('doubles', info, t, 4.2);
  layer(g, cam, 1, (g) => { sleeper(g, R.CX - 380, R.GY, 1.0, 1.4, { outfit: YOU, rim: { color: '#cfe0ff', dir: [0, -1] } }); });
  midnightClock(g, E.W * 0.74, E.H * 0.4, 190, lerp(58, 60, ease.inOut(prog(t, 0.3, f))), { stampAt: t - f });
  if (t > f) { const a = clamp(1 - (t - f) * 2); g.fillStyle = alpha('#ffe2b0', 0.4 * a); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); }
} });
// s027–s032 — the weight ladder
registerShot('s027', { draw(g, t, info) { ladder(g, t, info, 1, 'gorilla', { label: 'A GORILLA' }); } });
registerShot('s028', { draw(g, t, info) { ladder(g, t, info, 2, 'piano', { label: 'A PIANO' }); } });
registerShot('s029', { draw(g, t, info) { ladder(g, t, info, 3, 'horse', { label: 'A HORSE', s: 0.8 }); } });
registerShot('s030', { draw(g, t, info) { ladder(g, t, info, 4, 'car', { label: 'A CAR' }); } });
registerShot('s031', { draw(g, t, info) { ladder(g, t, info, 7, 'trex', { label: 'A T. REX', s: 0.85 }); } });
registerShot('s032', { draw(g, t, info) { ladder(g, t, info, 20, 'titanic', { label: 'THE TITANIC', win: true, s: 0.75, L: 1700, z: 0.92, camY: -40 }); } });
