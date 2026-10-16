// shots/01_hook.js — cold open: the bike, "How did you know?", "You saw it ten seconds ago", the title.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, wordTime, talkAmount, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { street, CURB, LANE, rider } from '../sets/street.js';
import { YOU, MIA, CYCLIST } from '../cast.js';
import { BLUE, ghost, ghostFig, doubleWorld, hud, heroFace, miaFace, eyeGlow, dashFigure, chip, slashIcon, say, backView } from '../lib.js';

const HX = () => E.W / 2 - 150;              // hero's x on the street in the hook
const MX = () => E.W / 2 + 140;              // Mia's x
const rimOf = (M) => ({ color: M.rim, dir: [0.8, -0.5] });   // low sun from the right

// MIA looking at her phone, facing left (toward the hero)
const miaPhone = { ...POSES.phone, head: [8, -200] };

// s001 — "You step back from the curb."  the cyan ghost bike streaks through his spot; he steps back
registerShot('s001', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.32 + 0.05 * ease.inOut(k), x: -80 - 20 * k, y: 40 };
  const { M, GY } = street(g, t, cam, { mood: 'golden' }), C = CURB();
  const back = ease.inOut(prog(t, 0.65, 1.3)), hy = lerp(C + 14, GY, back), hx = HX() - 20 * back;
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: MX(), y: GY, s: 1.45, facing: -1, outfit: MIA, pose: breathe(miaPhone, t, 1, 2), expr: 'neutral', look: [0.2, 0.6], rim: rimOf(M), prop: { type: 'phone' }, blink: (t % 3.3) > 3.2 });
    const p = back > 0 && back < 1 ? { ...walkPose(back * Math.PI * 1.5), head: [6, -206] } : POSES.relaxed;
    drawFigure(g, { x: hx, y: hy, s: 1.45, facing: 1, outfit: YOU, pose: breathe(p, t, 1, 0), expr: back > 0.3 ? 'smirk' : 'neutral', look: [-0.6, 0], rim: rimOf(M) });
  });
  const gb = prog(t, 0.05, 0.75);                       // the vision: a bike passes through his spot
  if (gb > 0 && gb < 1) ghost(g, (x) => rider(x, lerp(-500, E.W + 500, gb), C + 46, 1.45, t * 18, { outfit: CYCLIST }), { cam, t, a: 0.5 });
  FX.dust(g, t, { count: 30, color: '#ffe7c7', a: 0.3, speed: 8 });
} });

// s002 — "One second later,"  insert at the curb: sneakers step back, a front wheel bursts into frame
registerShot('s002', { draw(g, t, info) {
  const M = mood('golden'), k = t / info.dur, [sx, sy] = shake(t, t > 0.65 ? 6 : 0, 9);
  g.save(); g.translate(sx, sy); g.translate(E.W / 2, E.H / 2); g.scale(1 + 0.05 * k, 1 + 0.05 * k); g.translate(-E.W / 2, -E.H / 2);
  const cy = E.H * 0.66;
  blurLayer(g, 16, (g) => { g.fillStyle = linGrad(g, 0, 0, 0, E.H * 0.45, [M.sky[2], shade(M.wall, -0.4)]); g.fillRect(0, 0, E.W, E.H * 0.46); for (let i = 0; i < 5; i++) { g.fillStyle = alpha(M.practical, 0.55); g.fillRect(100 + i * 420, E.H * 0.12, 220, 200); } glow(g, E.W * 0.85, E.H * 0.1, 500, M.key, 0.4); });
  g.fillStyle = linGrad(g, 0, E.H * 0.4, 0, cy, [shade(M.floor, -0.3), shade(M.floor, 0)]); g.fillRect(0, E.H * 0.4, E.W, cy - E.H * 0.4);
  g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 3; for (let x = -300; x < E.W + 300; x += 330) { g.beginPath(); g.moveTo(x, E.H * 0.4); g.lineTo(x - 180, cy); g.stroke(); }
  g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = linGrad(g, E.W, 0, 0, 0, [alpha(M.key, 0.16), alpha(M.key, 0)]); g.fillRect(0, E.H * 0.4, E.W, cy - E.H * 0.4); g.restore();
  g.fillStyle = shade(M.floor, 0.3); g.fillRect(0, cy - 14, E.W, 24); g.fillStyle = shade(M.dark, -0.2); g.fillRect(0, cy + 10, E.W, 90);
  g.fillStyle = linGrad(g, 0, cy + 100, 0, E.H, [shade(M.road, -0.1), shade(M.road, -0.4)]); g.fillRect(0, cy + 100, E.W, E.H);
  g.fillStyle = alpha('#e8e4dc', 0.5); g.fillRect(0, cy + 260, E.W, 14);
  for (const [i, dx] of [[0, -250], [1, 150]]) {             // sneakers: toes over the curb edge, then they step back
    const st = ease.inOut(prog(t, i * 0.1, 0.42 + i * 0.1)), x = E.W / 2 + dx - 30 * st, y = lerp(cy + 6, cy - 150, st) - Math.sin(st * Math.PI) * 70, s = lerp(1.9, 1.6, st);
    seg(g, [[x - 14 * s + 6, y - 300 * s - 6], [x + 6, y - 46 * s - 6]], 76 * s, M.rim);               // rim on the trouser leg
    seg(g, [[x - 14 * s, y - 300 * s], [x, y - 46 * s]], 70 * s, YOU.legs);
    rr(g, x - 64 * s + 4, y - 58 * s - 4, 200 * s, 64 * s, 28 * s); g.fillStyle = M.rim; g.fill();
    rr(g, x - 64 * s, y - 58 * s, 200 * s, 64 * s, 28 * s); g.fillStyle = S().ink; g.fill();
    rr(g, x - 66 * s, y - 8 * s, 204 * s, 18 * s, 9 * s); g.fillStyle = '#e9e6df'; g.fill();
    seg(g, [[x + 10 * s, y - 52 * s], [x + 70 * s, y - 40 * s]], 5 * s, alpha('#e9e6df', 0.7));
  }
  const wk = prog(t, 0.5, info.dur), wx = lerp(-460, E.W * 0.42, ease.out(wk));                 // the real front wheel
  if (wk > 0) { const R = 250, wy = cy + 360;
    g.strokeStyle = S().ink; g.lineWidth = 42; g.beginPath(); g.arc(wx, wy, R, 0, Math.PI * 2); g.stroke();
    g.strokeStyle = alpha(M.rim, 0.8); g.lineWidth = 6; g.beginPath(); g.arc(wx, wy, R + 22, Math.PI * 1.15, Math.PI * 1.75); g.stroke();
    for (let i = 0; i < 6; i++) { const a = t * 30 + i * Math.PI / 6; seg(g, [[wx - Math.cos(a) * R, wy - Math.sin(a) * R], [wx + Math.cos(a) * R, wy + Math.sin(a) * R]], 5, alpha(S().ink, 0.85)); }
    circle(g, wx, wy, 30, '#2a2a33'); FX.speedLines(g, t, { cx: wx, cy: wy, count: 50, color: '#fff1dc', a: 0.22, inner: R + 40, seed: 3 }); }
  g.restore();
  FX.dust(g, t, { count: 30, color: '#ffe7c7', a: 0.4, speed: 10 });
} });

// s003 — "a bike flies past,"  wide: the cyclist whips past between camera and hero
registerShot('s003', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.06, x: lerp(-60, 60, ease.inOut(k)), y: 30 };
  const { M, GY } = street(g, t, cam, { mood: 'golden' }), C = CURB();
  const flinch = ease.out(prog(t, 0.35, 0.6));
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: MX() - 20, y: GY, s: 1.15, facing: -1, outfit: MIA, pose: posesAt(t, [[0, miaPhone], [0.4, POSES.handsOnHead]], 0.25), expr: t > 0.4 ? 'shocked' : 'neutral', rim: rimOf(M), prop: t < 0.4 ? { type: 'phone' } : null });
    drawFigure(g, { x: HX() + 10, y: GY, s: 1.15, facing: 1, outfit: YOU, pose: breathe(POSES.relaxed, t), expr: 'smirk', look: [-0.8, 0.2], rim: rimOf(M) });
    const bx = lerp(-500, E.W + 600, ease.inOut(prog(t, 0.05, 1.25)));
    rider(g, bx, C + 120, 1.7, t * 22, { outfit: CYCLIST, rim: { color: M.rim, dir: [0.7, -0.6], w: 4 }, expr: 'surprised' });
    FX.speedLines(g, t, { cx: bx, cy: C - 120, count: 30, color: '#fff1dc', a: 0.12 * (1 - Math.abs(bx - E.W / 2) / E.W), inner: 360, seed: 9 });
  });
  FX.dust(g, t, { count: 30, color: '#ffe7c7', a: 0.3, speed: 8 });
  void flinch;
} });

// s004 — "exactly where you were standing."  FREEZE: the bike frozen over a dotted outline of where he stood
registerShot('s004', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.25 + 0.08 * ease.inOut(k), x: -60 + 30 * k, y: 70, r: -0.01 };
  const { M, GY } = street(g, t * 0.05, cam, { mood: 'golden' }), C = CURB(), ox = E.W / 2 - 40;
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: ox + 330, y: GY - 10, s: 1.4, facing: -1, outfit: MIA, pose: POSES.handsOnHead, expr: 'shocked', rim: rimOf(M) });
    drawFigure(g, { x: ox - 330, y: GY - 14, s: 1.4, facing: 1, outfit: YOU, pose: POSES.relaxed, expr: 'smirk', look: [0.6, 0.4], rim: rimOf(M) });
    const da = ease.out(prog(t, 0.2, 0.7));
    dashFigure(g, { x: ox - 20, y: C + 20, s: 1.45, pose: POSES.relaxed, color: '#ffffff', a: 0.95 * da, w: 6 });
    rider(g, ox + 40, C + 74, 1.5, 3.2, { outfit: CYCLIST, rim: { color: M.rim, dir: [0.7, -0.6], w: 4 }, expr: 'surprised' });
    dashFigure(g, { x: ox - 20, y: C + 20, s: 1.45, pose: POSES.relaxed, color: '#ffffff', a: 0.55 * da, w: 6 });
    chip(g, 'YOU WERE HERE', ox - 20, C + 20 - 430, { size: 32, k: prog(t, 0.5, 0.9), line: alpha('#ffffff', 0.6) });
  });
  veil(g, '#9fc8ff', 0.12, 'soft-light');
  FX.drops(g, t, { count: 40, color: '#e8f0ff', rMin: 2, rMax: 7, drift: 2, seed: 4 });
  UI.badge(g, { str: 'FROZEN', x: E.W - 90, y: 200, color: '#bfe6ff', size: 30 });
} });

// s005 — "The rider shouts sorry."  he rides away, looking back, a hand up
registerShot('s005', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.15, x: lerp(40, 160, ease.inOut(k)), y: 20 };
  const { M, GY } = street(g, t, cam, { mood: 'golden' }), C = CURB();
  layer(g, cam, 1, (g) => {
    const bx = lerp(E.W * 0.38, E.W * 0.78, ease.out(k));
    rider(g, bx, C + 110, 1.5, t * 14, { outfit: CYCLIST, rim: { color: M.rim, dir: [0.7, -0.6], w: 4 }, wave: ease.out(prog(t, 0.3, 0.6)), expr: 'nervous', talk: talkAmount(info.globalT, 7.4, 7.9) > 0 ? 0.6 : 0 });
    if (t > 1.0) FX.rings(g, bx + 50, C + 110 - 380, t, { count: 2, r0: 30, r1: 110, color: '#fff1dc', a: 0.4 });
    say(g, bx - 60, C + 110 - 520, 'SORRY!', { size: 36, k: prog(info.globalT, 7.4, 7.75), tail: [bx + 30, C + 110 - 410] });
  });
  blurLayer(g, 10, (g) => { backView(g, { x: 560, y: GY + 420, s: 3.4, facing: 1, outfit: YOU, pose: POSES.relaxed, rim: { color: M.rim, dir: [0.8, -0.4], w: 5 }, shadow: false }); }, cam, 1.6);
  FX.dust(g, t, { count: 30, color: '#ffe7c7', a: 0.3, speed: 8 });
} });

// s006 — "Your best friend, Mia, stares at you."  two-shot, she lowers the phone and stares
registerShot('s006', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.5 + 0.06 * ease.inOut(k), x: 0, y: 60 };
  const { M, GY } = street(g, t, cam, { mood: 'golden' });
  const tm = (wordTime('Mia', 9) ?? 9.34) - info.shot.start;
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: E.W / 2 - 170, y: GY, s: 1.45, facing: 1, outfit: YOU, pose: breathe(POSES.relaxed, t, 1, 1), expr: 'neutral', look: [0.4, 0], rim: rimOf(M), blink: (t % 3.1) > 3.0 });
    const pose = posesAt(t, [[0, miaPhone], [tm + 0.3, { ...POSES.stand, head: [6, -210], hF: [16, -104] }]], 0.4);
    drawFigure(g, { x: E.W / 2 + 160, y: GY, s: 1.45, facing: -1, outfit: MIA, pose: breathe(pose, t, 1, 3), expr: t > tm + 0.3 ? 'shocked' : 'neutral', look: t > tm + 0.3 ? [0.6, 0] : [0.2, 0.6], rim: rimOf(M), prop: t < tm + 0.3 ? { type: 'phone' } : null });
  });
  chip(g, 'MIA', E.W / 2 + 150, E.H * 0.24, { size: 30, color: '#ffd9cc', k: prog(t, tm - 0.1, tm + 0.3), line: alpha('#E2684A', 0.8) });
  FX.dust(g, t, { count: 30, color: '#ffe7c7', a: 0.3, speed: 8 });
} });

// s007 — "How did you know?"  MIA close-up, talking
registerShot('s007', { draw(g, t, info) {
  const M = mood('golden'), k = t / info.dur;
  blurLayer(g, 16, (g) => street(g, t, { z: 1.6, x: 260, y: -120 }, { mood: 'golden' })); veil(g, '#1a1020', 0.35);
  const r = 330 * (1 + 0.05 * ease.inOut(k)), cx = E.W / 2 + 80 - 20 * k, cy = E.H * 0.56;
  miaFace(g, cx, cy, r, { outfit: MIA, expr: 'surprised', talk: talkAmount(info.globalT, 11.0, 12.2), look: [-0.3, 0], rimColor: M.rim, rimSide: 1, blink: t > 1.6 && t < 1.7 });
  glow(g, cx + r * 1.2, cy - r * 0.6, r, M.key, 0.12);
  FX.dust(g, t, { count: 24, color: '#ffe7c7', a: 0.3, speed: 6 });
} });

// s008 — "You didn't hear it."  hero close-up + a slashed ear
registerShot('s008', { draw(g, t, info) {
  const M = mood('golden'), k = t / info.dur;
  blurLayer(g, 16, (g) => street(g, t, { z: 1.6, x: -300, y: -120 }, { mood: 'golden' })); veil(g, '#1a1020', 0.35);
  const r = 320, cx = E.W * 0.38 + 16 * k, cy = E.H * 0.57;
  heroFace(g, cx, cy, r * (1 + 0.04 * k), { outfit: YOU, expr: 'neutral', face: { mouth: 'smallFlat' }, look: [0.4, 0], rimColor: M.rim, rimSide: 1 });
  slashIcon(g, E.W * 0.74, E.H * 0.42, 110, 'ear', prog(t, 0.1, 0.6));
} });

// s009 — "You didn't see it coming."  top-down map: his eyes face Mia; the bike came from behind, outside his view
registerShot('s009', { draw(g, t, info) {
  const M = mood('golden'), k = t / info.dur;
  g.save(); g.translate(E.W / 2, E.H / 2); g.rotate(-0.03 + 0.03 * k); g.scale(1.05 + 0.05 * k, 1.05 + 0.05 * k); g.translate(-E.W / 2, -E.H / 2);
  g.fillStyle = shade(M.road, -0.35); g.fillRect(-200, -200, E.W + 400, E.H + 400);                           // road
  g.fillStyle = shade(M.floor, -0.1); g.fillRect(-200, -200, E.W + 400, E.H * 0.52 + 200);                    // sidewalk
  g.fillStyle = shade(M.floor, 0.2); g.fillRect(-200, E.H * 0.52 - 6, E.W + 400, 12);
  for (let x = -200; x < E.W + 200; x += 150) { g.fillStyle = 'rgba(0,0,0,.2)'; g.fillRect(x, -200, 3, E.H * 0.52 + 200); }
  const hx = E.W * 0.45, hy = E.H * 0.47, mx = E.W * 0.62;
  FX.lightCone(g, hx, hy, { angle: 0, spread: 1.6, len: 520, color: BLUE, a: 0.3 });              // what he sees
  circle(g, mx, hy - 20, 34, '#E2684A'); circle(g, mx, hy - 20, 22, S().ink);                    // Mia from above
  circle(g, hx, hy, 40, YOU.color); circle(g, hx, hy, 26, S().ink);                              // you from above
  chip(g, 'YOU', hx, hy - 90, { size: 24, color: '#bcd6ff' }); chip(g, 'MIA', mx, hy - 110, { size: 24, color: '#ffd9cc' });
  const bp = ease.inOut(prog(t, 0.0, 1.3)), bx = lerp(-150, E.W * 0.7, bp), by = E.H * 0.56;
  seg(g, [[bx - 110, by], [bx + 110, by]], 14, '#0c0b10'); seg(g, [[bx + 70, by - 40], [bx + 70, by + 40]], 10, '#0c0b10'); g.fillStyle = '#16131c'; g.beginPath(); g.ellipse(bx - 10, by, 46, 30, 0, 0, Math.PI * 2); g.fill(); circle(g, bx + 18, by, 20, '#2a2733');
  chip(g, 'BIKE', bx, by + 80, { size: 24 });
  g.setLineDash([16, 14]); seg(g, [[-100, by], [bx - 100, by]], 4, alpha(S().ui.accent, 0.8)); g.setLineDash([]);
  g.restore();
  slashIcon(g, E.W * 0.82, E.H * 0.3, 100, 'eye', prog(t, 0.1, 0.6));
} });

// s010 — "You saw it ten seconds ago."  close-up: his eyes turn cyan, the HUD switches on
registerShot('s010', { draw(g, t, info) {
  const M = mood('golden'), k = t / info.dur, gt = info.globalT;
  blurLayer(g, 16, (g) => street(g, t, { z: 1.6, x: -200, y: -120 }, { mood: 'golden' })); veil(g, '#0a1020', 0.45);
  const gb = prog(t, 0.2, 1.4); if (gb > 0 && gb < 1) ghost(g, (x) => rider(x, lerp(-300, E.W + 300, gb), E.H * 0.7, 1.2, t * 18, { outfit: CYCLIST }), { t, a: 0.35 });
  const r = 330 * (1 + 0.08 * ease.inOut(k)), cx = E.W / 2, cy = E.H * 0.58;
  const tt = (wordTime('ten', 16) ?? 16.31);
  heroFace(g, cx, cy, r, { outfit: YOU, expr: 'neutral', look: [0, -0.1], rimColor: mix(M.rim, BLUE, ease.inOut(prog(gt, tt - 0.4, tt + 0.6))), rimSide: 1, eyeGlow: ease.inOut(prog(gt, tt - 0.5, tt + 0.5)) });
  hud(g, { k: prog(gt, tt, tt + 0.35), label: '+10 s', pulse: Math.max(0, 1 - (gt - tt) * 1.5) });
  FX.dust(g, t, { count: 30, color: BLUE, a: 0.25, speed: 6 });
} });

// s011 — "What if you could see ten seconds into the future?"  title over the street + its cyan copy running ahead
registerShot('s011', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0 + 0.04 * ease.inOut(k), x: -20 + 40 * k, y: -10 };
  const scene = (gg, tt) => { const { M, GY } = street(gg, tt, cam, { mood: 'dusk', seed: 33 });
    layer(gg, cam, 1, (gg) => { const wx = 300 + tt * 150; drawFigure(gg, { x: wx, y: GY, s: 0.9, facing: 1, outfit: { top: 'none' }, pose: walkPose(tt * Math.PI * 2 * 0.9), rim: { color: M.rim, dir: [-0.8, -0.4] } });
      drawFigure(gg, { x: E.W / 2 + 40, y: GY, s: 0.95, facing: -1, outfit: YOU, pose: breathe(POSES.relaxed, tt), expr: 'neutral', rim: { color: M.rim, dir: [-0.8, -0.4] } }); }); return { M, GY };
  };
  scene(g, t);
  doubleWorld(g, (x) => scene(x, t + 2.2), { a: 0.32 + 0.08 * Math.sin(t * 2), dx: 26, t });
  veil(g, '#0a0614', 0.25);
  g.fillStyle = linGrad(g, 0, E.H * 0.22, 0, E.H * 0.6, ['rgba(8,5,16,0)', 'rgba(8,5,16,.55)', 'rgba(8,5,16,0)']); g.fillRect(0, E.H * 0.22, E.W, E.H * 0.38);
  UI.titleCard(g, t, { lines: ['WHAT IF YOU COULD SEE', '10 SECONDS INTO THE FUTURE?'], dur: info.dur, y: E.H * 0.4 });
  FX.dust(g, t, { count: 40, color: BLUE, a: 0.25, speed: 8 });
} });
