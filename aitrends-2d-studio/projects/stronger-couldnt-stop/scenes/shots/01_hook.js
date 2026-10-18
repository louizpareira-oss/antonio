// shots/01_hook.js — cold open: the phone folds, the high-five, the sneeze, "twice as strong tomorrow", the title.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose, blendPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { street } from '/projects/see-10-seconds/scenes/sets/street.js';
import { kitchen, table, bedroom, bed } from '../sets/home.js';
import { YOU, MOM, FRIEND } from '../cast.js';
import { heroFace, hand, dayBadge, phoneFold, impact, cracks, hedge, wt, GOLD } from '../lib.js';

const rimSun = (M) => ({ color: M.rim, dir: [-0.8, -0.4] });       // kitchen sun from the window, left

// a phone in a hand, front view (insert). fold 0..1
function phoneInHand(g, x, y, s, fold, o = {}) {
  hand(g, x + 40 * s, y + 160 * s, 1.1 * s, { from: [x + 640 * s, E.H + 260], sleeve: YOU.color, fist: true, rim: o.rim });
  phoneFold(g, x, y, 440 * s, fold, { crackK: o.crack || 0, tilt: -0.06 });
  if (fold < 0.5) hand(g, x - 60 * s, y - 150 * s * (1 - fold * 1.6), 0.95 * s, { from: [x - 520 * s, E.H + 260], sleeve: YOU.color, fist: true, thumb: 1.2 });
  else hand(g, x - 90 * s, y + 80 * s, 0.95 * s, { from: [x - 520 * s, E.H + 260], sleeve: YOU.color, fist: true, thumb: 1.2 });
}

// s001 — "Day six."  INSERT, first frame: the phone is already bending in the hand
registerShot('s001', { draw(g, t, info) {
  const k = t / info.dur;
  blurLayer(g, 14, (g) => kitchen(g, t, { z: 1.3, x: -260, y: -60 }));
  veil(g, 'rgba(255,220,180,0.06)');
  const s = 1.25 + 0.06 * k, [sx, sy] = shake(t, 3 + 6 * k, 14);
  g.save(); g.translate(sx, sy);
  phoneInHand(g, E.W * 0.52, E.H * 0.42, s, 0.12 + 0.16 * ease.in(k), { crack: 0.3 + 0.5 * k });
  for (let i = 0; i < 3; i++) FX.sparkle(g, E.W * 0.52 + (i - 1) * 90, E.H * 0.42 + 6, 26, '#ffffff', 0.7 * Math.abs(Math.sin(t * 9 + i)));
  g.restore();
  dayBadge(g, { day: 6, k: prog(t, 0.0, 0.35) });
  FX.dust(g, t, { count: 24, color: '#fff1d6', a: 0.35, speed: 8 });
} });

// s002 — "You pick up your phone,"  MEDIUM: bright kitchen, you lift the phone very carefully
registerShot('s002', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.42 + 0.05 * ease.inOut(k), x: 120, y: 80 };
  const { GY, CX, M } = kitchen(g, t, cam);
  layer(g, cam, 1, (g) => {
    const lift = ease.inOut(prog(t, 0.1, 1.0)), hx = CX - 120;
    const pose = { ...POSES.holdFront, hF: [46, lerp(-118, -150, lift)], eF: [30, -130], head: [8, -206] };
    drawFigure(g, { x: hx, y: GY, s: 1.5, facing: 1, outfit: YOU, pose: breathe(pose, t, 1, 1), expr: 'nervous', look: [0.4, 0.4], rim: rimSun(M), prop: { type: 'phone' } });
    table(g, CX + 230, GY);
  });
  dayBadge(g, { day: 6 });
} });

// s003 — "and it folds in half."  INSERT: the phone folds in half, glass sparks; your shocked face behind
registerShot('s003', { draw(g, t, info) {
  const k = t / info.dur, f = wt('folds', info, t, 0.3), fold = ease.inOut(prog(t, f - 0.05, f + 0.45));
  blurLayer(g, 10, (g) => { kitchen(g, t, { z: 1.2, x: -200 }); heroFace(g, E.W * 0.28, E.H * 0.6, 300, { outfit: YOU, expr: fold > 0.4 ? 'shocked' : 'worried', rimColor: '#ffcf8f', rimSide: -1 }); });
  const s = 1.2 + 0.08 * k, [sx, sy] = shake(t, fold > 0.2 && fold < 0.95 ? 7 : 1, 18);
  g.save(); g.translate(sx, sy);
  phoneInHand(g, E.W * 0.6, E.H * 0.42, s, fold, { crack: 0.5 + fold });
  if (fold > 0.1) for (let i = 0; i < 10; i++) { const a = i * 0.63 + t * 2, d = 60 + 260 * fold; FX.sparkle(g, E.W * 0.6 + Math.cos(a) * d, E.H * 0.42 + Math.sin(a) * d * 0.5, 16, '#e8f4ff', 0.8 * (1 - fold * 0.6)); }
  g.restore();
  impact(g, E.W * 0.6, E.H * 0.42, t - f - 0.25, { r: 220 });
  dayBadge(g, { day: 6 });
} });

// s004 — "Day seven."  WIDE: sunny street, your best friend jogs up with his hand raised
registerShot('s004', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.08 + 0.04 * ease.inOut(k), x: lerp(-40, 30, k), y: 20 };
  const { GY, CX, M } = street(g, t, cam, { mood: 'day', seed: 31 });
  layer(g, cam, 1, (g) => {
    const fx = lerp(CX + 560, CX + 200, ease.out(clamp(k * 1.1))), ph = t * Math.PI * 2 * 1.4;
    const run = k < 0.85 ? { ...walkPose(ph, { run: true }), hF: [40, -250], eF: [30, -200] } : POSES.wave;
    drawFigure(g, { x: fx, y: GY, s: 1.25, facing: -1, outfit: FRIEND, pose: run, expr: 'joy', rim: { color: M.rim, dir: [0.8, -0.5] } });
    drawFigure(g, { x: CX - 220, y: GY, s: 1.25, facing: 1, outfit: YOU, pose: posesAt(t, [[0, POSES.relaxed], [0.5, { ...POSES.wave, head: [6, -206] }]]), expr: 'happy', rim: { color: M.rim, dir: [0.8, -0.5] } });
  });
  dayBadge(g, { day: 7, k: prog(t, 0.05, 0.4) });
  FX.dust(g, t, { count: 20, color: '#ffffff', a: 0.25, speed: 6 });
} });

// s005 — "You high-five your best friend,"  MEDIUM: palms meet, gold impact rings
registerShot('s005', { draw(g, t, info) {
  const k = t / info.dur, hit = wt('high', info, t, 0.4) + 0.15, cam = { z: 1.5 + 0.03 * k, x: 30, y: 120 };
  const [sx, sy] = shake(t, t > hit && t < hit + 0.35 ? 10 : 0, 20); cam.x += sx; cam.y += sy;
  const { GY, CX, M } = street(g, t, cam, { mood: 'day', seed: 31 });
  const reach = ease.out(prog(t, 0, hit)), px = CX + 20;
  layer(g, cam, 1, (g) => {
    const up = { ...POSES.pointUp, hF: [lerp(20, 70, reach), -258], eF: [30, -205] };
    drawFigure(g, { x: CX - 120, y: GY, s: 1.6, facing: 1, outfit: YOU, pose: up, expr: t > hit ? 'surprised' : 'happy', rim: { color: M.rim, dir: [0.8, -0.5] } });
    const back = ease.out(prog(t, hit, hit + 0.3));
    drawFigure(g, { x: CX + 160 + back * 60, y: GY, s: 1.6, facing: -1, rot: back * 0.25, outfit: FRIEND, pose: { ...POSES.pointUp, hF: [lerp(20, 70, reach), -258] }, expr: t > hit ? 'shocked' : 'joy', rim: { color: M.rim, dir: [0.8, -0.5] } });
  });
  layer(g, cam, 1, (g) => impact(g, px, GY - 1.6 * 262, t - hit, { r: 240 }));
  if (t > hit && t < hit + 0.12) { g.fillStyle = 'rgba(255,248,230,.5)'; g.fillRect(0, 0, E.W, E.H); }
  dayBadge(g, { day: 7 });
} });

// s006 — "and he lands in a hedge."  WIDE: your friend arcs through the air into a hedge
registerShot('s006', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0 + 0.03 * k, x: lerp(0, 160, ease.inOut(k)), y: 10 };
  const { GY, CX, M } = street(g, t, cam, { mood: 'day', seed: 31 });
  const land = wt('hedge', info, t, 1.2), fly = clamp(t / land), hx = CX + 640;
  layer(g, cam, 0.98, (g) => hedge(g, hx - 220, GY + 4, 460, 190, { burst: t > land ? (t - land) * 1.6 : 0 }));
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: CX - 520, y: GY, s: 1.05, facing: 1, outfit: YOU, pose: posesAt(t, [[0, POSES.pointUp], [land, POSES.handsOnHead]]), expr: t > land ? 'worried' : 'shocked', rim: { color: M.rim, dir: [0.8, -0.5] } });
    if (t < land + 0.05) { const x = lerp(CX - 360, hx, fly), y = GY - 60 - Math.sin(fly * Math.PI) * 380 + fly * 40;
      drawFigure(g, { x, y, s: 1.05, facing: 1, rot: fly * 4.5, outfit: FRIEND, pose: POSES.fall, expr: 'shocked', rim: { color: M.rim, dir: [0.8, -0.5] }, shadow: false }); FX.speedLines(g, t, { cx: x, cy: y, count: 16, a: 0.15, inner: 120 }); }
    else { const kk = clamp((t - land) * 3); seg(g, [[hx - 40, GY - 150], [hx - 20 - 30 * kk, GY - 250 - 30 * kk]], 18, S().ink); seg(g, [[hx + 20, GY - 150], [hx + 50, GY - 260]], 18, S().ink); }
  });
  layer(g, cam, 1.02, (g) => hedge(g, hx - 260, GY + 40, 540, 120, { seed: 9 }));
} });

// s007 — "Day eight."  BIG FACE: your nose twitches, about to sneeze
registerShot('s007', { draw(g, t, info) {
  const k = t / info.dur;
  blurLayer(g, 12, (g) => kitchen(g, t, { z: 1.3, x: -100, y: -40 }));
  veil(g, 'rgba(40,20,10,0.12)');
  const build = ease.in(k), [sx, sy] = shake(t, 2 + 4 * build, 12);
  heroFace(g, E.W / 2 + sx, E.H * 0.6 + sy - 20 * build, 330 * (1 + 0.05 * k), { outfit: YOU, expr: k > 0.5 ? 'sleepy' : 'worried', tilt: -0.12 * build, look: [0, -0.4], rimColor: '#ffd59a', rimSide: -1, face: { mouth: 'oBig' } });
  for (let i = 0; i < 3; i++) FX.rings(g, E.W / 2, E.H * 0.6, t + i * 0.2, { count: 1, r0: 360, r1: 420, color: '#ffffff', a: 0.12 * build });
  dayBadge(g, { day: 8, k: prog(t, 0.05, 0.4) });
} });

// s008 — "You sneeze,"  WIDE kitchen: ACHOO, shock-wave rings blast out
registerShot('s008', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.06, x: -40, y: 20 };
  const [sx, sy] = shake(t, t < 0.6 ? 14 * (1 - t / 0.6) : 0, 22); cam.x += sx; cam.y += sy;
  const { GY, CX, M } = kitchen(g, t, cam);
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: CX - 260, y: GY, s: 1.25, facing: 1, outfit: YOU, pose: { ...POSES.crouch, head: [30, -170] }, expr: 'sleepy', rim: rimSun(M), face: { mouth: 'oBig' } });
    drawFigure(g, { x: CX + 420, y: GY, s: 1.25, facing: -1, rot: -0.25 * ease.out(prog(t, 0.1, 0.4)), outfit: MOM, pose: POSES.handsOnHead, expr: 'shocked', rim: rimSun(M) });
    for (let i = 0; i < 4; i++) { const rr2 = 80 + (t * 1400 - i * 160); if (rr2 > 0) ring(g, CX - 200, GY - 250, rr2, 10 * Math.max(0, 1 - rr2 / 1600), alpha('#ffffff', 0.5 * Math.max(0, 1 - rr2 / 1600))); }
    for (let i = 0; i < 8; i++) { const a = i * 0.8, d = t * 900; g.save(); g.translate(CX - 200 + Math.cos(a) * d, GY - 260 + Math.sin(a) * d * 0.5 + d * d / 2000); g.rotate(t * 6 + i); g.fillStyle = '#f7f2e6'; g.fillRect(-26, -34, 52, 68); g.restore(); }
  });
  text(g, 'ACHOO!', E.W * 0.32, E.H * 0.28, { size: 120 * (0.8 + 0.2 * ease.outBack(clamp(t / 0.25))), color: '#ffffff', stroke: 12, strokeColor: 'rgba(60,30,10,.85)', font: FONTS.title, weight: 700, glow: 30, glowColor: 'rgba(255,200,120,.8)', alpha: clamp(1.5 - t * 1.2) });
  dayBadge(g, { day: 8 });
} });

// s009 — "and every window in the kitchen cracks."  CLOSE: the window panes crack one after another
registerShot('s009', { draw(g, t, info) {
  const k = t / info.dur, c0 = wt('every', info, t, 0.2), cam = { z: 1.9 + 0.05 * k, x: -720, y: -220 };
  const cr = [0, 1, 2].map(i => ease.out(prog(t, c0 + i * 0.45, c0 + i * 0.45 + 0.4)));
  const [sx, sy] = shake(t, 4, 20); cam.x += sx; cam.y += sy;
  kitchen(g, t, cam, { cracked: cr });
  layer(g, cam, 1, (g) => { const { GY, CX } = { GY: E.H * 0.8, CX: E.W / 2 }; for (let i = 0; i < 3; i++) if (cr[i] > 0.05) FX.sparkle(g, CX - 900 + 560 * (0.2 + i * 0.3), GY - 780 + 520 * (0.4 + (i % 2) * 0.2), 30, '#ffffff', 0.9 * (1 - cr[i])); });
  dayBadge(g, { day: 8 });
} });

// s010 — "And tomorrow,"  NIGHT bedroom: you lie awake staring at your hands
registerShot('s010', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.25 + 0.04 * k, x: -120, y: 60 };
  const { GY, CX, M } = bedroom(g, t, cam, { night: true, lamp: true });
  layer(g, cam, 1, (g) => {
    const top = bed(g, CX - 220, GY, 1.1, { sheet: '#3a4a8a' });
    drawFigure(g, { x: CX + 60, y: top + 66, s: 1.2, facing: 1, rot: -Math.PI / 2, outfit: YOU, pose: { ...POSES.lie, hF: [60, -230], eF: [40, -190] }, expr: 'worried', look: [0.6, -0.8], rim: { color: '#ffd28a', dir: [1, 0] }, shadow: false });
    FX.clock(g, CX + 520, GY - 300, 60, 23.98 + k * 0.01, { face: '#f2efe8' });
  });
  text(g, '11:59', E.W * 0.78, E.H * 0.25, { size: 64, color: '#ff6f61', font: FONTS.ui, weight: 900, glow: 18, glowColor: 'rgba(255,90,80,.8)' });
} });

// s011 — "you'll be twice as strong as you are today."  BIG FACE in gold light, a giant ×2 behind you
registerShot('s011', { draw(g, t, info) {
  const k = t / info.dur, f = wt('twice', info, t, 0.3);
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#2a1a2e', '#5a2e2a', '#c9763a']); g.fillRect(0, 0, E.W, E.H);
  const p = ease.outBack(prog(t, f, f + 0.5));
  if (p > 0) { text(g, '×2', E.W * 0.7, E.H * 0.45, { size: 420 * p, color: GOLD(), font: FONTS.ui, weight: 900, glow: 60, glowColor: 'rgba(255,170,60,.9)', alpha: 0.9 }); FX.godRays(g, E.W * 0.7, E.H * 0.45, { angle: 0, spread: Math.PI, len: 1600, color: '#ffcf8f', a: 0.08 * p, t }); }
  heroFace(g, E.W * 0.34, E.H * 0.62, 340 * (1 + 0.04 * k), { outfit: YOU, expr: 'determined', look: [0.6, -0.1], rimColor: '#ffc68a', rimSide: 1 });
  FX.dust(g, t, { count: 40, color: '#ffd59a', a: 0.5, speed: 12 });
  dayBadge(g, { day: 8, value: 512, from: 256, flip: prog(t, f + 0.2, f + 1.0), danger: k > 0.7 });
} });

// s012 — TITLE: you on a rooftop at golden hour, cracks spreading from your feet
registerShot('s012', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0 + 0.06 * ease.inOut(k), y: lerp(40, 0, k) }, M = mood('golden');
  layer(g, cam, 0.1, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, E.H, ['#4a3a6a', '#d0786a', '#f6b26b', '#fbd8a0']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 2.2); FX.sun(g, E.W * 0.72, E.H * 0.66, 90, '#fff3dc', '#ffcf8f', 6); FX.clouds(g, { y: E.H * 0.18, h: 220, color: '#ffe7c7', a: 0.18, seed: 7 }); });
  layer(g, cam, 0.35, (g) => FX.skyline(g, { x: -E.W, y: E.H * 0.86, w: E.W * 3, minH: 120, maxH: 480, color: '#6a3a4a', windowColor: alpha('#ffe7b0', 0.5), lit: 0.15, seed: 12, minW: 60, maxW: 160 }));
  layer(g, cam, 0.9, (g) => { g.fillStyle = '#3a2228'; g.fillRect(-E.W, E.H * 0.82, E.W * 3, E.H); g.fillStyle = '#5a3238'; g.fillRect(-E.W, E.H * 0.82, E.W * 3, 10);
    cracks(g, E.W * 0.32, E.H * 0.83, 520, ease.out(prog(t, 0.3, 3.5)), { seed: 9, color: 'rgba(255,200,120,.9)', glowCol: '#ffb060', w: 4, arms: 11 }); });
  layer(g, cam, 1, (g) => drawFigure(g, { x: E.W * 0.32, y: E.H * 0.83, s: 1.3, facing: 1, outfit: YOU, pose: breathe({ ...POSES.stand, hF: [22, -96], hB: [-18, -96] }, t), expr: 'determined', rim: { color: M.rim, dir: [1, -0.3], w: 5 } }));
  FX.lensStreak(g, E.W * 0.72, E.H * 0.66, E.W, '#ffe6cc', 0.3);
  g.fillStyle = linGrad(g, 0, 0, 0, E.H * 0.55, ['rgba(30,14,30,.75)', 'rgba(30,14,30,0)']); g.fillRect(0, 0, E.W, E.H * 0.55);
  const c2 = wt("couldn't", info, t, 2.6) - 0.3, a1 = clamp(t / 0.5) * clamp((info.dur - t) / 0.4), a2 = clamp((t - c2) / 0.4) * clamp((info.dur - t) / 0.4);
  text(g, 'WHAT IF YOU GOT STRONGER…', E.W / 2, E.H * 0.24, { size: 70, color: S().ui.cream, glow: 26, glowColor: 'rgba(255,120,40,.85)', spacing: 4, alpha: a1 });
  if (a2 > 0) { const s = 0.9 + 0.1 * ease.outBack(clamp((t - c2) / 0.4)); g.save(); g.translate(E.W / 2, E.H * 0.37); g.scale(s, s); text(g, "AND COULDN'T STOP?", 0, 0, { size: 104, color: GOLD(), glow: 36, glowColor: 'rgba(255,120,40,.9)', spacing: 3, alpha: a2 }); g.restore(); }
} });
