// shots/02_math.js — it starts on a Monday; the doubling math (paper to the Moon); fridge, car, ship; bones/tendons/skin.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { street } from '/projects/see-10-seconds/scenes/sets/street.js';
import { kitchen, bedroom, bed, bathroom, table } from '../sets/home.js';
import { harbor, ship, space } from '../sets/places.js';
import { YOU, MOM } from '../cast.js';
import { heroFace, hand, dayBadge, impact, wt, GOLD, fmt, car, bodyOutline, stamp, glassify, sunrise, debris } from '../lib.js';

const rimL = (M) => ({ color: M.rim, dir: [-0.8, -0.4] });

// s013 — "It starts on a Monday."  sunny bedroom morning, the alarm rings, calendar MON, you sit up
registerShot('s013', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.12 + 0.05 * ease.inOut(k), x: -60, y: 40 };
  const { GY, CX, M } = bedroom(g, t, cam, { calendar: 'MON' });
  layer(g, cam, 1, (g) => {
    const top = bed(g, CX - 260, GY, 1.1);
    const up = ease.inOut(prog(t, 0.4, 1.2));
    drawFigure(g, { x: CX - 300 + 0 * up, y: top + 34 - 0 * up, s: 1.2, facing: 1, rot: lerp(-Math.PI / 2, 0, up) * 0.9, outfit: YOU, pose: up > 0.5 ? POSES.sit : POSES.lie, expr: up > 0.5 ? 'sleepy' : 'sleepy', rim: rimL(M), shadow: false });
    const [sx] = shake(t, 3, 30); FX.clock(g, CX + 470 + sx, GY - 290, 54, 7 + t * 0.01);
    for (let i = 0; i < 3; i++) FX.rings(g, CX + 470, GY - 290, t + i * 0.15, { count: 1, r0: 60, r1: 130, color: '#ffffff', a: 0.4 });
  });
} });

// s014 — "You wake up twice as strong as you were yesterday."  you stretch — the headboard snaps; DAY 1 ×2
registerShot('s014', { draw(g, t, info) {
  const k = t / info.dur, f = wt('twice', info, t, 1.2), cam = { z: 1.4 + 0.04 * k, x: -260, y: 120 };
  const { GY, CX, M } = bedroom(g, t, cam, { calendar: 'MON' });
  const snap = t - f - 0.2;
  layer(g, cam, 1, (g) => {
    const top = bed(g, CX - 260, GY, 1.1, { noHead: snap > 0 });
    const stretch = ease.inOut(prog(t, 0.1, 0.9));
    drawFigure(g, { x: CX - 420, y: top + 6, s: 1.3, facing: 1, outfit: YOU, pose: posesAt(t, [[0, POSES.sit], [0.5, { ...POSES.sit, hF: [-30, -290], eF: [-10, -240], hB: [-60, -280], eB: [-34, -232] }]]), expr: snap > 0 ? 'surprised' : 'sleepy', rim: rimL(M), shadow: false });
    if (snap > 0) { const p = clamp(snap * 1.5); g.save(); g.translate(CX - 640 - 200 * p, GY - 260 - 300 * p + 500 * p * p); g.rotate(-2 * p); g.fillStyle = '#6a4a36'; g.fillRect(-15, -130, 30, 260); g.restore(); debris(g, CX - 640, GY - 220, snap, { color: '#8a6a4a', n: 10, size: 16 }); impact(g, CX - 640, GY - 220, snap, { r: 140 }); }
    void stretch;
  });
  dayBadge(g, { day: 1, k: prog(t, f, f + 0.35) });
} });

// s015 — "On Tuesday, twice that again."  bathroom mirror: the toothpaste tube explodes
registerShot('s015', { draw(g, t, info) {
  const k = t / info.dur, f = wt('twice', info, t, 1.0), cam = { z: 1.5 + 0.04 * k, x: -40, y: 160 };
  const { GY, CX, M } = bathroom(g, t, cam);
  const pop = t - f;
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: CX + 300, y: GY, s: 1.5, facing: -1, outfit: YOU, pose: { ...POSES.holdFront, hF: [44, -150] }, expr: pop > 0 ? 'shocked' : 'sleepy', rim: { color: M.rim, dir: [0.8, -0.4] } });
    const tx = CX + 300 - 1.5 * 44, ty = GY - 1.5 * 150;
    if (pop < 0) { rr(g, tx - 40, ty - 18, 80, 30, 10); g.fillStyle = '#f2f2f6'; g.fill(); g.fillStyle = '#2E72D2'; g.fillRect(tx - 40, ty - 18, 20, 30); }
    else { const p = clamp(pop * 2); for (let i = 0; i < 16; i++) { const a = Math.PI + (i / 15 - 0.5) * 1.6, d = 80 + 420 * p * (0.6 + (i % 4) * 0.15); circle(g, tx + Math.cos(a) * d, ty + Math.sin(a) * d * 0.6, 16 + (i % 3) * 8, '#f4fbff'); }
      g.fillStyle = '#f4fbff'; g.beginPath(); g.ellipse(CX - 60, GY - 620, 120 * p, 70 * p, 0.2, 0, Math.PI * 2); g.fill(); g.fillStyle = '#7fd0e8'; g.beginPath(); g.ellipse(CX - 40, GY - 610, 60 * p, 22 * p, 0.2, 0, Math.PI * 2); g.fill(); }
  });
  dayBadge(g, { day: 2, k: prog(t, f, f + 0.35) });
} });

// s016 — "Every single morning, your strength doubles."  DATA: sunrises flick past, the bars double
registerShot('s016', { draw(g, t, info) {
  const k = t / info.dur; sunrise(g, (t * 1.6) % 1);
  veil(g, 'rgba(12,10,30,0.45)');
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'], x0 = E.W * 0.22, w = 150, base = E.H * 0.82;
  days.forEach((d, i) => { const p = ease.outBack(prog(t, 0.2 + i * 0.5, 0.6 + i * 0.5)); if (p <= 0) return; const h = 18 * 2 ** (i + 1) * p;
    rr(g, x0 + i * 250, base - h, w, h, 12); g.fillStyle = linGrad(g, 0, base - h, 0, base, [GOLD(), shade(GOLD(), -0.4)]); g.fill(); glow(g, x0 + i * 250 + w / 2, base - h, 120, GOLD(), 0.3 * p);
    text(g, '×' + 2 ** (i + 1), x0 + i * 250 + w / 2, base - h - 40, { size: 48, color: GOLD(), font: FONTS.ui, weight: 900, glow: 14, glowColor: alpha(GOLD(), 0.6) });
    text(g, d, x0 + i * 250 + w / 2, base + 40, { size: 30, color: S().ui.cream, font: FONTS.ui, weight: 900, spacing: 3 }); });
  text(g, 'EVERY MORNING ×2', E.W / 2, E.H * 0.16, { size: 60, color: S().ui.cream, glow: 20, glowColor: 'rgba(255,140,60,.7)', spacing: 4, alpha: clamp(t * 3) });
} });

// s017 — "That doesn't sound scary until you do the math."  at your desk: 2×2×2… runs off the page
registerShot('s017', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.55 + 0.05 * k, x: 340, y: 150 }, m = wt('math', info, t, 2.6);
  const { GY, CX, M } = bedroom(g, t, cam, { calendar: 'TUE' });
  layer(g, cam, 1, (g) => drawFigure(g, { x: CX + 600, y: GY, s: 1.4, facing: 1, outfit: YOU, pose: { ...POSES.sit, hF: [52, -150], eF: [36, -126] }, expr: t > m ? 'worried' : 'smirk', look: [0.4, 0.5], rim: rimL(M) }));
  const n = Math.min(18, Math.floor(t * 6)), str = Array.from({ length: n }, () => '2').join('×');
  text(g, str, E.W * 0.12 + (t > m ? -(t - m) * 900 : 0), E.H * 0.3, { size: 64, color: '#2a2440', font: FONTS.ui, weight: 900, align: 'left', alpha: 0.9 });
  if (t > m) text(g, '= ' + fmt(2 ** n), E.W * 0.5, E.H * 0.44, { size: 90 * ease.outBack(clamp((t - m) * 3)), color: '#c84a3a', font: FONTS.ui, weight: 900, glow: 20, glowColor: 'rgba(255,90,60,.5)' });
} });

// s018 — "Fold a sheet of paper in half"  INSERT: hands fold a sheet; fold counter
registerShot('s018', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 14, (g) => bedroom(g, t, { z: 1.4, x: 300, y: 120 }, { calendar: 'TUE' }));
  const folds = Math.min(3, Math.floor(t / 0.45)), ph = (t % 0.45) / 0.45, w = 720 / 2 ** (folds / 2), h = 520 / 2 ** ((folds + 1) / 2);
  const cx = E.W / 2, cy = E.H * 0.5; rr(g, cx - w / 2, cy - h / 2, w, h, 6); g.fillStyle = '#fbf8f0'; g.fill(); g.strokeStyle = 'rgba(0,0,0,.12)'; g.lineWidth = 3; g.stroke();
  for (let i = 1; i <= folds; i++) { g.strokeStyle = 'rgba(0,0,0,.1)'; g.beginPath(); g.moveTo(cx - w / 2, cy - h / 2 + h * i / (folds + 1)); g.lineTo(cx + w / 2, cy - h / 2 + h * i / (folds + 1)); g.stroke(); }
  const flap = Math.sin(ph * Math.PI) * h * 0.5; poly(g, [[cx - w / 2, cy], [cx + w / 2, cy], [cx + w / 2, cy - flap], [cx - w / 2, cy - flap]], alpha('#e8e2d4', 0.9));
  hand(g, cx - w / 2 - 20, cy + 40, 0.8, { from: [-200, E.H + 200], sleeve: YOU.color, fist: true });
  hand(g, cx + w / 2 + 20, cy - flap, 0.8, { from: [E.W + 200, E.H + 200], sleeve: YOU.color, fist: true });
  text(g, `FOLD ${folds + 1}`, E.W * 0.82, E.H * 0.2, { size: 70, color: GOLD(), font: FONTS.ui, weight: 900, stroke: 10, strokeColor: 'rgba(40,20,10,.8)' });
} });

// s019 — "forty-two times, and it would reach the Moon."  SPACE: the paper tower rises from Earth to the Moon
registerShot('s019', { draw(g, t, info) {
  const k = t / info.dur, rise = ease.inOut(prog(t, 0.1, info.dur - 0.4)), cam = { z: 0.62, y: lerp(260, -1700, rise) };
  space(g, t, cam);
  layer(g, cam, 0.5, (g) => { const x = E.W / 2, y0 = E.H - 190, top = lerp(y0, -E.H * 1.4 + 240, rise);
    g.fillStyle = linGrad(g, 0, top, 0, y0, ['#ffffff', '#e8e2d4']); g.fillRect(x - 26, top, 52, y0 - top); glow(g, x, top, 160, '#ffffff', 0.6);
    for (let y = y0; y > top; y -= 90) { g.fillStyle = 'rgba(0,0,0,.08)'; g.fillRect(x - 26, y, 52, 4); } });
  const n = Math.round(lerp(10, 42, ease.out(prog(t, 0, info.dur - 0.6))));
  text(g, `${n} FOLDS`, E.W * 0.78, E.H * 0.32, { size: 72, color: GOLD(), font: FONTS.ui, weight: 900, glow: 18, glowColor: alpha(GOLD(), 0.6) });
  text(g, '≈ ' + fmt(lerp(0.1, 440000, (2 ** n) / 2 ** 42)) + ' km', E.W * 0.78, E.H * 0.42, { size: 44, color: S().ui.cream, font: FONTS.ui, weight: 900 });
} });

// s020 — "That's what doubling does."  DATA: the doubling curve shoots straight up
registerShot('s020', { draw(g, t, info) {
  UI.blueprint(g); const ui = S().ui, p = ease.inOut(prog(t, 0.1, info.dur - 0.3)), x0 = E.W * 0.12, x1 = E.W * 0.88, y0 = E.H * 0.85;
  g.strokeStyle = alpha(ui.blueprint, 0.4); g.lineWidth = 3; seg(g, [[x0, y0], [x1, y0]], 3, alpha(ui.blueprint, 0.5)); seg(g, [[x0, y0], [x0, E.H * 0.1]], 3, alpha(ui.blueprint, 0.5));
  g.strokeStyle = GOLD(); g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); let hx = x0, hy = y0;
  for (let i = 0; i <= 200 * p; i++) { const u = i / 200, x = lerp(x0, x1, u), y = y0 - (2 ** (u * 20) / 2 ** 20) * E.H * 0.95; hx = x; hy = y; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
  glow(g, hx, Math.max(hy, -50), 90, GOLD(), 0.9);
  text(g, 'DOUBLING', E.W * 0.3, E.H * 0.25, { size: 70, color: ui.cream, glow: 18, glowColor: alpha(GOLD(), 0.5), spacing: 6, alpha: clamp(t * 3) });
  for (const [u, lab] of [[0.25, 'DAY 5'], [0.5, 'DAY 10'], [0.98, 'DAY 20']]) if (p > u) text(g, lab, lerp(x0, x1, u), y0 + 44, { size: 28, color: ui.text, font: FONTS.ui, weight: 900 });
} });

// s021 — "Day five, you're thirty-two times stronger."  you lift the fridge with one arm
registerShot('s021', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.15 + 0.04 * k, x: 220, y: 40 };
  const { GY, CX, M } = kitchen(g, t, cam, { fridgeGone: true });
  const up = ease.inOut(prog(t, 0.3, 1.4));
  layer(g, cam, 1, (g) => {
    const hx = CX + 740, fy = GY - 1.35 * 270 * up;
    drawFigure(g, { x: hx, y: GY, s: 1.35, facing: -1, outfit: YOU, pose: { ...POSES.pointUp, hF: [8, lerp(-150, -268, up)], eF: [14, lerp(-150, -230, up)] }, expr: 'smirk', rim: rimL(M) });
    g.save(); g.translate(hx - 10, fy); g.rotate(-0.05 * up); rr(g, -150, -700 * 0.82, 300, 700 * 0.82, 20); g.fillStyle = '#f7f4ee'; g.fill(); seg(g, [[-130, -370], [130, -370]], 4, '#d8d2c8'); seg(g, [[-110, -520], [-110, -420]], 8, '#9aa0aa'); g.restore();
  });
  const n = wt('thirty', info, t, 1.9); if (t > n) { const p = ease.outBack(clamp((t - n) * 3)); text(g, '×32', E.W * 0.3, E.H * 0.34, { size: 200 * p, color: GOLD(), font: FONTS.ui, weight: 900, glow: 40, glowColor: alpha(GOLD(), 0.7), stroke: 8, strokeColor: 'rgba(60,30,10,.5)' }); }
  dayBadge(g, { day: 5, k: prog(t, 0, 0.3) });
} });

// s022 — "Day ten, a thousand."  WIDE street: you hold a car over your head
registerShot('s022', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.1 + 0.05 * k, x: 0, y: 40 };
  const { GY, CX, M } = street(g, t, cam, { mood: 'day', seed: 44 });
  const up = ease.outBack(prog(t, 0.2, 1.0));
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: CX, y: GY, s: 1.3, facing: 1, outfit: YOU, pose: { ...POSES.cheer, hF: [24, -270], hB: [-24, -270] }, expr: 'joy', rim: { color: M.rim, dir: [0.8, -0.5] } });
    car(g, CX, GY - 1.3 * 270 * up + 6, 1.1, { color: '#3fb950', rot: 0.04 * Math.sin(t * 3) });
  });
  text(g, '×1,024', E.W * 0.78, E.H * 0.2, { size: 130 * ease.outBack(prog(t, 0.4, 0.8)), color: GOLD(), font: FONTS.ui, weight: 900, glow: 30, glowColor: alpha(GOLD(), 0.7), stroke: 8, strokeColor: 'rgba(60,30,10,.5)' });
  dayBadge(g, { day: 10 });
} });

// s023 — "Day twenty, a million."  WIDE harbour: tiny you holds up a giant ship
registerShot('s023', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 0.92 + 0.06 * ease.inOut(k), y: -60 };
  const { GY, CX, M, SEA } = harbor(g, t, cam, { noBollard: true });
  const up = ease.inOut(prog(t, 0.1, 1.4));
  layer(g, cam, 1, (g) => {
    ship(g, CX - 600, lerp(SEA + 40, GY - 1.1 * 290 - 52, up), 0.8, { rot: -0.02 * up });
    if (up < 0.9) { g.fillStyle = alpha('#bfe8ff', 0.6 * (1 - up)); for (let i = 0; i < 30; i++) circle(g, CX - 700 + i * 50, SEA + 10 + (i % 3) * 6 - up * 80, 14, alpha('#e8f8ff', 0.6)); }
    drawFigure(g, { x: CX, y: GY, s: 1.1, facing: 1, outfit: YOU, pose: { ...POSES.cheer, hF: [20, -268], hB: [-20, -268] }, expr: 'determined', rim: { color: M.rim, dir: [-0.8, -0.5] } });
  });
  text(g, '×' + fmt(1048576 * clamp(t / 1.2)), E.W / 2, E.H * 0.2, { size: 110, color: GOLD(), font: FONTS.ui, weight: 900, glow: 30, glowColor: alpha(GOLD(), 0.8), stroke: 8, strokeColor: 'rgba(60,30,10,.5)' });
  dayBadge(g, { day: 20 });
} });

// s024 — "And it's not just your muscles."  BLUEPRINT: your body, the muscles light up gold
registerShot('s024', { draw(g, t, info) {
  UI.blueprint(g); const p = ease.out(prog(t, 0.2, 1.0));
  bodyOutline(g, E.W * 0.5, E.H * 0.6, 0.95 + 0.03 * t, { muscle: p });
  text(g, 'MUSCLES', E.W * 0.76, E.H * 0.36, { size: 50, color: GOLD(), font: FONTS.ui, weight: 900, alpha: p, spacing: 4 });
  seg(g, [[E.W * 0.62, E.H * 0.38], [E.W * 0.55, E.H * 0.45]], 3, alpha(GOLD(), p));
} });

// s025 — "Your bones, your tendons, your skin,"  BLUEPRINT: each lights up on its word
registerShot('s025', { draw(g, t, info) {
  UI.blueprint(g); const b = ease.out(prog(t, wt('bones', info, t, 0.3), wt('bones', info, t, 0.3) + 0.4)), te = ease.out(prog(t, wt('tendons', info, t, 1.2), wt('tendons', info, t, 1.2) + 0.4)), sk = ease.out(prog(t, wt('skin', info, t, 2.2), wt('skin', info, t, 2.2) + 0.4));
  bodyOutline(g, E.W * 0.42, E.H * 0.6, 0.95, { muscle: 0.25, bone: b, tendon: te, skin: sk });
  const lab = (s2, y, a, c) => { if (a <= 0) return; text(g, s2, E.W * 0.68, y, { size: 52, color: c, font: FONTS.ui, weight: 900, align: 'left', alpha: a, spacing: 4 }); seg(g, [[E.W * 0.66, y], [E.W * 0.5, y + 40]], 3, alpha(c, a)); };
  lab('BONES', E.H * 0.3, b, '#f4f8ff'); lab('TENDONS', E.H * 0.47, te, '#ffb07a'); lab('SKIN', E.H * 0.64, sk, '#ffb6a0');
} });

// s026 — "they all double too."  BLUEPRINT: ×2 stamps on bones, tendons, skin
registerShot('s026', { draw(g, t, info) {
  UI.blueprint(g); bodyOutline(g, E.W * 0.42, E.H * 0.6, 0.95, { muscle: 0.25, bone: 1, tendon: 1, skin: 1 });
  for (const [s2, y, c] of [['BONES', 0.3, '#f4f8ff'], ['TENDONS', 0.47, '#ffb07a'], ['SKIN', 0.64, '#ffb6a0']]) text(g, s2, E.W * 0.68, E.H * y, { size: 52, color: c, font: FONTS.ui, weight: 900, align: 'left', spacing: 4 });
  [0.3, 0.47, 0.64].forEach((y, i) => stamp(g, '×2', E.W * 0.9, E.H * y, t - 0.15 - i * 0.35, { size: 56 }));
} });

// s027 — "Everything about you gets stronger."  BIG FACE, determined, gold rim
registerShot('s027', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => street(g, t, { z: 1.3, x: 200, y: -40 }, { mood: 'golden', seed: 44 }));
  veil(g, 'rgba(40,20,10,0.15)');
  heroFace(g, E.W * 0.5, E.H * 0.62, 340 * (1 + 0.04 * k), { outfit: YOU, expr: 'determined', look: [0, 0], rimColor: '#ffc68a', rimSide: 1 });
  FX.dust(g, t, { count: 30, color: '#ffd59a', a: 0.5, speed: 10 });
} });

// s028 — "Everything around you stays the same."  the street turns glassy — only you stay solid
registerShot('s028', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.05 + 0.04 * k, x: lerp(-30, 30, k) };
  const { GY, CX, M } = street(g, t, cam, { mood: 'day', seed: 52 });
  const gl = ease.inOut(prog(t, 0.3, 1.4));
  veil(g, `rgba(190,225,255,${0.22 * gl})`);
  glassify(g, 0, 0, E.W, E.H, gl, 11);
  layer(g, cam, 1, (g) => {
    car(g, CX + 520, GY + 140, 1.0, { color: '#d64a33' }); glassify(g, CX + 250, GY - 120, 540, 260, gl, 3);
    drawFigure(g, { x: CX - 200, y: GY, s: 1.35, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'worried', look: [0.6, 0.2], rim: { color: '#ffd59a', dir: [0.8, -0.5], w: 6 } });
  });
} });
