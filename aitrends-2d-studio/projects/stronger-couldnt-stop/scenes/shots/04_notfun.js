// shots/04_notfun.js — it stops being fun: pencils, the crayon test, phones, door handles; strength vs could-push;
// a sneeze, a flinch, a bad dream; through the floor into Mr. Patel's flat; the teacup.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake, rng } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { living, bedroom, bed, classroom, desk, cutaway, armchair } from '../sets/home.js';
import { store, hall } from '../sets/places.js';
import { YOU, MOM, PATEL, TEACHER, CLERK } from '../cast.js';
import { heroFace, hand, dayBadge, plusMinus, impact, debris, wt, GOLD, CORAL, chip, phoneFold, cracks } from '../lib.js';

const pencil = (g, x, y, ang, len = 300, broken = 0) => {
  const half = (dir, off) => { g.save(); g.translate(x + Math.cos(ang) * off, y + Math.sin(ang) * off); g.rotate(ang + dir * broken * 0.9); g.fillStyle = '#f2c21a'; g.fillRect(dir > 0 ? 0 : -len / 2, -12, len / 2, 24); g.fillStyle = 'rgba(0,0,0,.15)'; g.fillRect(dir > 0 ? 0 : -len / 2, 4, len / 2, 8);
    if (dir > 0) { poly(g, [[len / 2, -12], [len / 2 + 40, 0], [len / 2, 12]], '#e8c890'); poly(g, [[len / 2 + 26, -5], [len / 2 + 40, 0], [len / 2 + 26, 5]], '#2a2a30'); } else { g.fillStyle = '#e88aa0'; g.fillRect(-len / 2 - 24, -12, 24, 24); g.fillStyle = '#c9c4c0'; g.fillRect(-len / 2 - 4, -13, 10, 26); } g.restore(); };
  half(-1, -broken * 20); half(1, broken * 20);
};

// s037 — "Then it stops being fun."  you lie in plaster dust under the hole; grey −; cooler light
registerShot('s037', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.3 + 0.04 * k, x: 200, y: 120 };
  const { GY, CX, M, CEIL } = living(g, t, cam);
  layer(g, cam, 0.65, (g) => cracks(g, CX + 300, CEIL + 4, 260, 1, { seed: 4, color: 'rgba(40,30,30,.8)', w: 5, arms: 10 }));
  layer(g, cam, 1, (g) => { drawFigure(g, { x: CX + 120, y: GY + 60, s: 1.3, facing: 1, rot: -Math.PI / 2, outfit: YOU, pose: POSES.lie, expr: 'sad', look: [0.6, -0.8], rim: { color: M.rim, dir: [0, -1] }, shadow: false });
    for (let i = 0; i < 14; i++) { const r = rng(i + 3); rr(g, CX - 200 + r() * 600, GY + 10 + r() * 60, 20 + r() * 30, 14, 4); g.fillStyle = '#efe6d6'; g.fill(); }
    FX.snow(g, t, { count: 50, color: '#f2ece0', speed: 60 }); });
  veil(g, `rgba(60,80,130,${0.18 * ease.inOut(clamp(t))})`);
  plusMinus(g, '−', { k: prog(t, 0.2, 0.6), y: V(120, 200) });
} });

// s038 — "Day five, pencils snap in your fingers."  INSERT: a pencil snaps; a pile of broken pencils
registerShot('s038', { draw(g, t, info) {
  const k = t / info.dur, sn = wt('snap', info, t, 1.4);
  blurLayer(g, 14, (g) => classroom(g, t, { z: 1.4, x: -200, y: -80 }));
  for (let i = 0; i < 14; i++) { const r = rng(i * 7 + 1); pencil(g, E.W * 0.25 + r() * E.W * 0.5, E.H * 0.85 + r() * 80, r() * 3, 200, 0.9); }
  hand(g, E.W * 0.5, E.H * 0.5, 1.0, { from: [E.W * 0.5 + 500, E.H + 300], sleeve: YOU.color, fist: true });
  pencil(g, E.W * 0.47, E.H * 0.45, -0.15, 360, ease.out(prog(t, sn, sn + 0.2)));
  if (t > sn) { impact(g, E.W * 0.47, E.H * 0.45, t - sn, { r: 140 }); debris(g, E.W * 0.47, E.H * 0.45, t - sn, { color: '#e8c890', n: 10, size: 10, speed: 400 }); text(g, 'SNAP!', E.W * 0.7, E.H * 0.25, { size: 90, color: '#ffffff', font: FONTS.title, stroke: 12, strokeColor: 'rgba(60,30,10,.8)', alpha: clamp(1.6 - (t - sn)) }); }
  dayBadge(g, { day: 5, k: prog(t, 0, 0.35) });
  plusMinus(g, '−', { y: V(250, 330) });
} });

// s039 — "You write your history test with a crayon."  classroom: a fat crayon, the teacher frowns
registerShot('s039', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.25 + 0.04 * k, x: 40, y: 80 };
  const { GY, CX, M } = classroom(g, t, cam, { board: 'HISTORY TEST' });
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: CX + 380, y: GY, s: 1.3, facing: -1, outfit: TEACHER, pose: breathe(POSES.crossArms, t, 1, 4), expr: 'angry', rim: { color: M.rim, dir: [0.8, -0.4] } });
    const top = desk(g, CX - 160, GY, 1.2);
    drawFigure(g, { x: CX - 380, y: GY, s: 1.3, facing: 1, outfit: YOU, pose: { ...POSES.sit, hF: [56, -146 + Math.sin(t * 14) * 4], eF: [36, -124] }, expr: 'nervous', look: [0.5, 0.6], rim: { color: M.rim, dir: [0.8, -0.4] } });
    rr(g, CX - 270, top - 8, 200, 12, 3); g.fillStyle = '#fbf8f0'; g.fill();
    g.save(); g.translate(CX - 380 + 1.3 * 56, GY - 1.3 * 146); g.rotate(-0.6); rr(g, -12, -70, 24, 90, 8); g.fillStyle = '#e8892a'; g.fill(); g.restore();
  });
  // the paper, inset top-right
  g.save(); g.translate(E.W * 0.8, E.H * 0.3); g.rotate(0.05); rr(g, -170, -120, 340, 240, 8); g.fillStyle = '#fbf8f0'; g.fill();
  text(g, 'HISTORY', 0, -70, { size: 30, color: '#3a3440', font: FONTS.ui, weight: 900 });
  g.strokeStyle = '#e8892a'; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); for (let i = 0; i < Math.min(40, t * 18); i++) { const x = -140 + i * 7, y = -10 + Math.sin(i * 1.3) * 26 + (i > 20 ? 50 : 0); i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); g.restore();
} });

// s040 — "Day six, your phone folds in half."  INSERT: the phone folds again (from the side this time)
registerShot('s040', { draw(g, t, info) {
  const k = t / info.dur, f = wt('folds', info, t, 1.5), fold = ease.inOut(prog(t, f - 0.1, f + 0.4));
  blurLayer(g, 14, (g) => living(g, t, { z: 1.3, x: 200, y: -60 }));
  hand(g, E.W * 0.55, E.H * 0.62, 1.1, { from: [E.W, E.H + 300], sleeve: YOU.color, fist: true });
  phoneFold(g, E.W * 0.52, E.H * 0.5, 420, fold, { crackK: 0.4 + fold, tilt: 0.12 });
  impact(g, E.W * 0.52, E.H * 0.5, t - f - 0.25, { r: 220 });
  dayBadge(g, { day: 6, k: prog(t, 0, 0.35) });
} });

// s041 — "You buy a new one."  phone shop: the clerk hands you a new box
registerShot('s041', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.3 + 0.03 * k, x: 0, y: 80 };
  const { GY, CX, M } = store(g, t, cam);
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: CX + 260, y: GY - 260 + 260, s: 1.35, facing: -1, outfit: CLERK, pose: { ...POSES.holdFront, hF: [60, -150] }, expr: 'smile', rim: { color: '#ffffff', dir: [0, -1] } });
    drawFigure(g, { x: CX - 280, y: GY, s: 1.35, facing: 1, outfit: YOU, pose: { ...POSES.holdFront, hF: [lerp(30, 60, k), -150] }, expr: 'nervous', rim: { color: '#ffffff', dir: [0, -1] } });
    const bx = lerp(CX + 180, CX - 160, ease.inOut(prog(t, 0.1, 1.0))); rr(g, bx - 60, GY - 1.35 * 150 - 90, 120, 90, 8); g.fillStyle = '#f7f7f8'; g.fill(); g.fillStyle = '#2E72D2'; g.fillRect(bx - 60, GY - 1.35 * 150 - 60, 120, 16);
  });
} });

// s042 — "It folds too."  INSERT: the new phone folds; your deadpan face behind
registerShot('s042', { draw(g, t, info) {
  const k = t / info.dur, fold = ease.inOut(prog(t, 0.25, 0.7));
  blurLayer(g, 10, (g) => { store(g, t, { z: 1.2 }); heroFace(g, E.W * 0.3, E.H * 0.62, 300, { outfit: YOU, expr: 'neutral', face: { mouth: 'flat', brows: null } }); });
  hand(g, E.W * 0.62, E.H * 0.62, 1.05, { from: [E.W + 100, E.H + 300], sleeve: YOU.color, fist: true });
  phoneFold(g, E.W * 0.6, E.H * 0.48, 400, fold, { screen: '#ffb86f', crackK: fold, tilt: -0.1 });
  impact(g, E.W * 0.6, E.H * 0.48, t - 0.55, { r: 200 });
} });

// s043 — "Day seven, door handles come off in your hand."  a handle rips off with its screws; the box of handles
registerShot('s043', { draw(g, t, info) {
  const k = t / info.dur, f = wt('come', info, t, 1.4), cam = { z: 2.1 + 0.05 * k, x: 420, y: 160 };
  const { GY, CX } = hall(g, t, cam, { handle: t < f ? undefined : false });
  layer(g, cam, 1, (g) => {
    const hx = CX + 260 + 250, hy = GY - 290, off = t > f ? ease.out(clamp((t - f) * 2)) : 0;
    g.save(); g.translate(hx - 30 - 160 * off, hy + 10 * off); g.rotate(-0.4 * off); circle(g, 30, 0, 12, '#c9a24a'); seg(g, [[30, 0], [-16, 0]], 10, '#c9a24a'); for (const dy of [-10, 10]) seg(g, [[32, dy], [62, dy]], 3, '#9a9aa0'); g.restore();
    hand(g, hx - 40 - 160 * off, hy + 20 + 10 * off, 0.7, { from: [hx - 600, hy + 500], sleeve: YOU.color, fist: true });
    if (t > f) { debris(g, hx, hy, t - f, { color: '#e4d8c4', n: 8, size: 12, speed: 300 }); impact(g, hx, hy, t - f, { r: 120 }); }
    rr(g, CX - 200, GY - 120, 260, 120, 6); g.fillStyle = '#b88a5a'; g.fill(); for (let i = 0; i < 10; i++) { const r = rng(i + 50); seg(g, [[CX - 170 + r() * 200, GY - 110 - r() * 30], [CX - 150 + r() * 200, GY - 120 - r() * 40]], 10, '#c9a24a'); }
  });
  dayBadge(g, { day: 7, k: prog(t, 0, 0.35) });
  chip(g, 'HANDLES: 23', E.W * 0.3, E.H * 0.82, { k: prog(t, f + 0.6, f + 1.0), size: 32 });
} });

// s044 — "Your mom stops locking the bathroom."  KNOCK FIRST! sign, no handle; mom shrugs
registerShot('s044', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.25 + 0.03 * k, x: 160, y: 40 };
  const { GY, CX, M } = hall(g, t, cam, { handle: false, sign: true });
  layer(g, cam, 1, (g) => { drawFigure(g, { x: CX - 120, y: GY, s: 1.35, facing: 1, outfit: MOM, pose: breathe(POSES.shrug, t, 1, 3), expr: 'confused', rim: { color: '#fff1d6', dir: [-0.8, -0.4] } });
    g.fillStyle = '#f2f2f6'; rr(g, CX - 120 - 30, GY - 1.35 * 240, 70, 46, 20); g.fill(); });
} });

// s045 — "Here's what nobody tells you about super strength."  BIG FACE: serious, looking straight at us
registerShot('s045', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => bedroom(g, t, { z: 1.3, x: 100, y: -40 }, { night: true, lamp: true })); veil(g, 'rgba(10,10,30,.15)');
  heroFace(g, E.W * 0.5, E.H * 0.62, 340 * (1 + 0.05 * k), { outfit: YOU, expr: 'determined', look: [0, 0], rimColor: '#ffd28a', rimSide: 1 });
} });

// s046 — "Strength isn't how hard you push."  BLUEPRINT: an arm pushes a box, small force arrow
registerShot('s046', { draw(g, t, info) {
  UI.blueprint(g); const ui = S().ui, p = ease.out(prog(t, 0.2, 1.0));
  UI.lineFigure(g, { x: E.W * 0.38, y: E.H * 0.78, s: 1.6, pose: { ...POSES.reach, hF: [70, -150], eF: [40, -150] }, color: ui.blueprint });
  g.strokeStyle = ui.blueprint; g.lineWidth = 4; g.strokeRect(E.W * 0.38 + 1.6 * 74, E.H * 0.78 - 260, 260, 260);
  const ax = E.W * 0.38 + 1.6 * 74 + 280; seg(g, [[ax, E.H * 0.78 - 130], [ax + 140 * p, E.H * 0.78 - 130]], 8, GOLD()); poly(g, [[ax + 140 * p, E.H * 0.78 - 150], [ax + 140 * p + 30, E.H * 0.78 - 130], [ax + 140 * p, E.H * 0.78 - 110]], GOLD());
  text(g, 'HOW HARD YOU PUSH', E.W * 0.5, E.H * 0.2, { size: 52, color: ui.cream, font: FONTS.ui, weight: 900, spacing: 3, alpha: p });
} });

// s047 — "It's how hard you could push."  BLUEPRINT: a giant ghost arrow of possible force, ×128, red
registerShot('s047', { draw(g, t, info) {
  UI.blueprint(g); const ui = S().ui, p = ease.out(prog(t, 0.1, 0.9)), y = E.H * 0.78 - 130;
  UI.lineFigure(g, { x: E.W * 0.22, y: E.H * 0.78, s: 1.6, pose: { ...POSES.reach, hF: [70, -150], eF: [40, -150] }, color: ui.blueprint });
  g.strokeStyle = ui.blueprint; g.lineWidth = 4; g.strokeRect(E.W * 0.22 + 1.6 * 74, E.H * 0.78 - 260, 260, 260);
  const ax = E.W * 0.22 + 1.6 * 74 + 280, L = 1000 * p; g.save(); g.globalAlpha *= 0.85; rr(g, ax, y - 60, L, 120, 20); g.fillStyle = alpha(CORAL(), 0.35); g.fill(); g.strokeStyle = CORAL(); g.lineWidth = 5; g.setLineDash([18, 12]); g.stroke(); g.restore();
  seg(g, [[ax, y], [ax + 140, y]], 8, GOLD());
  text(g, '×128', ax + L - 160, y - 120, { size: 90, color: CORAL(), font: FONTS.ui, weight: 900, glow: 24, glowColor: alpha(CORAL(), 0.7), alpha: p });
  text(g, 'HOW HARD YOU COULD PUSH', E.W * 0.5, E.H * 0.2, { size: 52, color: ui.cream, font: FONTS.ui, weight: 900, spacing: 3, alpha: p });
} });

// s048 — "And your body doesn't always ask permission."  BIG FACE: nervous, reflex twitch lines
registerShot('s048', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => living(g, t, { z: 1.3, x: -100, y: -40 })); veil(g, 'rgba(10,10,30,.12)');
  const [sx, sy] = shake(t, 3, 9); heroFace(g, E.W * 0.5 + sx, E.H * 0.62 + sy, 330, { outfit: YOU, expr: 'nervous', look: [-0.4, 0], rimColor: '#ffd59a', rimSide: -1 });
  for (let i = 0; i < 3; i++) { const a = -0.9 + i * 0.4, r = 400 + (t * 200 % 60); seg(g, [[E.W * 0.5 + Math.cos(a) * r, E.H * 0.62 + Math.sin(a) * r], [E.W * 0.5 + Math.cos(a) * (r + 60), E.H * 0.62 + Math.sin(a) * (r + 60)]], 6, '#ffffff'); seg(g, [[E.W * 0.5 - Math.cos(a) * r, E.H * 0.62 + Math.sin(a) * r], [E.W * 0.5 - Math.cos(a) * (r + 60), E.H * 0.62 + Math.sin(a) * (r + 60)]], 6, '#ffffff'); }
} });

// s049 — "A sneeze."  QUICK: a sneeze blasts the papers off every desk
registerShot('s049', { draw(g, t, info) {
  const cam = { z: 1.05, x: 0, y: 20 }, [sx, sy] = shake(t, 10 * (1 - t), 26); cam.x += sx; cam.y += sy;
  const { GY, CX, M } = classroom(g, t, cam, { board: 'MATH' });
  layer(g, cam, 1, (g) => { for (const dx of [-520, 0, 520]) desk(g, CX + dx, GY, 1.0);
    drawFigure(g, { x: CX - 120, y: GY, s: 1.2, facing: 1, outfit: YOU, pose: { ...POSES.crouch, head: [30, -170] }, expr: 'sleepy', face: { mouth: 'oBig' }, rim: { color: M.rim, dir: [0.8, -0.4] } });
    for (let i = 0; i < 16; i++) { const r = rng(i + 9), a = -Math.PI * r(), d = 200 + t * 1100 * (0.5 + r()); g.save(); g.translate(CX - 60 + Math.cos(a) * d, GY - 240 + Math.sin(a) * d * 0.5 + t * t * 400); g.rotate(t * 8 + i); g.fillStyle = '#fbf8f0'; g.fillRect(-28, -36, 56, 72); g.restore(); }
    for (let i = 0; i < 3; i++) ring(g, CX - 60, GY - 240, 100 + t * 1600 - i * 120, 8, alpha('#ffffff', 0.4)); });
} });

// s050 — "A flinch."  QUICK: a spider drops, you flinch, your fist goes through the wall
registerShot('s050', { draw(g, t, info) {
  const cam = { z: 1.5, x: -100, y: 100 }, hit = 0.45, [sx, sy] = shake(t, t > hit ? 12 * (1 - t) : 0, 30); cam.x += sx; cam.y += sy;
  const { GY, CX, M } = hall(g, t, cam, { hole: t > hit });
  layer(g, cam, 1, (g) => {
    const sy2 = GY - 640 + Math.min(t, 0.35) * 600; seg(g, [[CX - 300, GY - 900], [CX - 300, sy2]], 2, alpha('#ffffff', 0.6)); circle(g, CX - 300, sy2, 16, '#14111a'); for (let i = 0; i < 4; i++) { seg(g, [[CX - 300, sy2], [CX - 330, sy2 - 14 + i * 9]], 3, '#14111a'); seg(g, [[CX - 300, sy2], [CX - 270, sy2 - 14 + i * 9]], 3, '#14111a'); }
    drawFigure(g, { x: CX - 420, y: GY, s: 1.4, facing: 1, outfit: YOU, pose: t > hit ? { ...POSES.point, hF: [240 / 1.4, -300], eF: [80, -250] } : POSES.handsOnHead, expr: 'scared', rim: { color: M.rim, dir: [0.8, -0.4] } });
    if (t > hit) { impact(g, CX - 80, GY - 420, t - hit, { r: 200 }); debris(g, CX - 80, GY - 420, t - hit, { color: '#d9c8a8', n: 14, size: 18 }); }
  });
} });

// s051 — "A bad dream."  QUICK: asleep, twitching; the bed cracks under you
registerShot('s051', { draw(g, t, info) {
  const cam = { z: 1.3, x: -120, y: 80 }, crk = t > 0.9, [sx, sy] = shake(t, crk ? 8 : 2, 20); cam.x += sx; cam.y += sy;
  const { GY, CX, M } = bedroom(g, t, cam, { night: true });
  layer(g, cam, 1, (g) => { const top = bed(g, CX - 220, GY, 1.1, { sheet: '#3a4a8a', crack: crk });
    drawFigure(g, { x: CX + 60, y: top + 66, s: 1.2, facing: 1, rot: -Math.PI / 2 + 0.05 * Math.sin(t * 30), outfit: YOU, pose: { ...POSES.lie, hF: [40 + 20 * Math.sin(t * 25), -150] }, expr: 'scared', rim: { color: '#c9d4ff', dir: [-1, 0] }, shadow: false });
    if (crk) impact(g, CX - 220, GY - 60, t - 0.9, { r: 180, color: '#c9d4ff' }); });
} });

// s052 — "Day eight, you have a nightmare..."  NIGHT bedroom: you thrash in your sleep; DAY 8
registerShot('s052', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.15 + 0.05 * k, x: -100, y: 60 };
  const { GY, CX, M } = bedroom(g, t, cam, { night: true });
  layer(g, cam, 1, (g) => { const top = bed(g, CX - 220, GY, 1.1, { sheet: '#3a4a8a' });
    drawFigure(g, { x: CX + 60, y: top + 66 - Math.abs(Math.sin(t * 9)) * 30, s: 1.2, facing: 1, rot: -Math.PI / 2 + 0.12 * Math.sin(t * 12), outfit: YOU, pose: { ...POSES.lie, hF: [60, -120 + 60 * Math.sin(t * 11)], hB: [-50, -150 + 50 * Math.sin(t * 9)] }, expr: 'scared', rim: { color: '#c9d4ff', dir: [-1, 0] }, shadow: false });
    for (let i = 0; i < 3; i++) FX.rings(g, CX - 100, top - 40, t + i * 0.3, { count: 1, r0: 80, r1: 260, color: '#c9d4ff', a: 0.25 }); });
  dayBadge(g, { day: 8, k: prog(t, 0, 0.35), danger: true });
} });

// s053 — "and you wake up in the apartment below yours."  CUTAWAY: your bed crashes through the floor
registerShot('s053', { draw(g, t, info) {
  const k = t / info.dur, f = wt('wake', info, t, 0.4), cam = { z: 0.95, x: 0, y: -40 }, [sx, sy] = shake(t, t > f && t < f + 0.6 ? 12 : 0, 24); cam.x += sx; cam.y += sy;
  const fall = ease.in(prog(t, f, f + 0.5));
  const { GY, MID, CX } = cutaway(g, t, cam, { hole: fall > 0 ? 1 : 0 });
  layer(g, cam, 1, (g) => {
    armchair(g, CX + 380, GY - 6, 0.9, '#6a4a3a'); drawFigure(g, { x: CX + 380, y: GY - 10, s: 1.0, facing: -1, outfit: PATEL, pose: POSES.sit, expr: t > f + 0.5 ? 'surprised' : 'neutral', rim: { color: '#ffd28a', dir: [1, -0.3] } });
    FX.screen(g, { x: CX - 620, y: GY - 260, w: 200, h: 130, glowC: '#8fd0ff', a: 0.3 });
    const by = lerp(MID - 50, GY - 10, fall), top = by - 130;
    g.fillStyle = '#6a4a36'; g.fillRect(CX - 300, by - 90, 600, 90); rr(g, CX - 292, top, 584, 46, 18); g.fillStyle = '#3a4a8a'; g.fill();
    drawFigure(g, { x: CX + 100, y: top + 60, s: 1.0, facing: 1, rot: -Math.PI / 2, outfit: YOU, pose: POSES.lie, expr: fall > 0.9 ? 'surprised' : 'sleepy', rim: { color: '#ffd28a', dir: [0, -1] }, shadow: false });
    if (t > f) debris(g, CX, MID, t - f, { color: '#8a7a7a', n: 24, size: 22, speed: 350 });
    if (t > f + 0.5) { impact(g, CX, GY - 20, t - f - 0.5, { r: 300, color: '#fff3d6' }); FX.snow(g, t, { count: 60, color: '#d8d0c8', speed: 90 }); }
  });
} });

// s054 — "Mr. Patel is very calm about it."  his armchair, the TV, dust settling; you in your bed in the rubble
registerShot('s054', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.3 + 0.04 * k, x: 120, y: 100 };
  const { GY, CX, M } = living(g, t, cam, { patel: true, night: true, lampOn: true });
  layer(g, cam, 1, (g) => {
    armchair(g, CX + 120, GY, 1.2, '#6a4a3a'); drawFigure(g, { x: CX + 120, y: GY - 6, s: 1.35, facing: -1, outfit: PATEL, pose: breathe({ ...POSES.sit, hF: [40, -140] }, t, 1, 2), expr: 'neutral', look: [-0.6, 0], blink: (t % 2.4) > 2.2, rim: { color: '#ffd28a', dir: [1, -0.3] } });
    for (let i = 0; i < 18; i++) { const r = rng(i + 30); rr(g, CX - 720 + r() * 420, GY - 40 + r() * 50, 30 + r() * 40, 24, 6); g.fillStyle = shade('#8a7a7a', r() * 0.3); g.fill(); }
    g.fillStyle = '#6a4a36'; g.fillRect(CX - 760, GY - 80, 460, 80); rr(g, CX - 754, GY - 130, 448, 46, 18); g.fillStyle = '#3a4a8a'; g.fill();
    drawFigure(g, { x: CX - 380, y: GY - 58, s: 1.0, facing: 1, rot: -Math.PI / 2, outfit: YOU, pose: POSES.lie, expr: 'nervous', look: [1, 0.2], rim: { color: '#ffd28a', dir: [0, -1] }, shadow: false });
    FX.snow(g, t, { count: 40, color: '#d8d0c8', speed: 40 });
  });
} });

// s055 — "He hands you a cup of tea."  TWO-SHOT: Patel offers a teacup; you sit up in the rubble
registerShot('s055', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.55 + 0.04 * k, x: -240, y: 160 };
  const { GY, CX, M } = living(g, t, cam, { patel: true, night: true, lampOn: true });
  const give = ease.inOut(prog(t, 0.2, 1.2));
  layer(g, cam, 1, (g) => {
    g.fillStyle = '#6a4a36'; g.fillRect(CX - 900, GY - 80, 460, 80); rr(g, CX - 894, GY - 130, 448, 46, 18); g.fillStyle = '#3a4a8a'; g.fill();
    drawFigure(g, { x: CX - 620, y: GY - 120, s: 1.35, facing: 1, outfit: YOU, pose: { ...POSES.sit, hF: [lerp(30, 60, give), -140] }, expr: 'nervous', rim: { color: '#ffd28a', dir: [1, -0.3] }, shadow: false });
    drawFigure(g, { x: CX - 200, y: GY, s: 1.35, facing: -1, outfit: PATEL, pose: { ...POSES.holdFront, hF: [lerp(40, 110, give), -150] }, expr: 'smile', rim: { color: '#ffd28a', dir: [1, -0.3] } });
    const cx = CX - 200 - 1.35 * lerp(40, 110, give) - 10, cy = GY - 1.35 * 150 - 30; rr(g, cx - 34, cy - 30, 68, 56, 14); g.fillStyle = '#f7f2ea'; g.fill(); ring(g, cx + 40, cy - 2, 16, 6, '#f7f2ea'); g.fillStyle = '#b8743a'; g.fillRect(cx - 28, cy - 28, 56, 10);
    for (let i = 0; i < 3; i++) { const ph = (t * 0.7 + i / 3) % 1; g.strokeStyle = alpha('#ffffff', 0.5 * (1 - ph)); g.lineWidth = 4; g.beginPath(); g.moveTo(cx - 14 + i * 14, cy - 40 - ph * 70); g.quadraticCurveTo(cx - 4 + i * 14, cy - 60 - ph * 70, cx - 14 + i * 14, cy - 80 - ph * 70); g.stroke(); }
  });
} });

// s056 — "It explodes."  FREEZE insert: the cup bursts in your hand, tea droplets hang in the air
registerShot('s056', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 14, (g) => living(g, t, { z: 1.3, x: -200 }, { patel: true, night: true, lampOn: true })); veil(g, 'rgba(20,30,60,.25)');
  const cx = E.W * 0.52, cy = E.H * 0.5, p = 0.25 + 0.06 * t;
  hand(g, cx + 30, cy + 90, 1.1, { from: [cx + 600, E.H + 300], sleeve: YOU.color, fist: true });
  for (let i = 0; i < 9; i++) { const a = i * 0.7, d = 100 + 300 * p; g.save(); g.translate(cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.7 - 40); g.rotate(a + t * 0.3); poly(g, [[-30, -20], [26, -14], [10, 24]], '#f7f2ea'); g.restore(); }
  for (let i = 0; i < 40; i++) { const r = rng(i + 70), a = r() * Math.PI * 2, d = 60 + r() * 420 * p * 2; circle(g, cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.6 - 30, 6 + r() * 14, alpha('#c8843a', 0.85)); glow(g, cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.6 - 30, 14, '#ffd8a0', 0.3); }
  impact(g, cx, cy - 30, 0.35, { r: 260 });
  FX.drops(g, t, { count: 40 });
  text(g, '×256', E.W * 0.82, E.H * 0.22, { size: 64, color: CORAL(), font: FONTS.ui, weight: 900, glow: 18, glowColor: alpha(CORAL(), 0.7) });
} });
