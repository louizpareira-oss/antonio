// shots/04_wins.js — the good part: puddles, glass doors, 400 rock-paper-scissors wins, the classroom.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, wordTime, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { street, CURB } from '../sets/street.js';
import { classroom, desk } from '../sets/classroom.js';
import { YOU, FRIEND, FRIEND2, FRIEND3, KID, TEACHER } from '../cast.js';
import { BLUE, ghost, ghostFig, ghostSay, hud, heroFace, chip, say, rpsHand, crossMark, checkMark } from '../lib.js';

const rimS = (M) => ({ color: M.rim, dir: [0.8, -0.5] });
const rimC = (M) => ({ color: M.rim, dir: [0.9, -0.4] });     // classroom: windows on the right

// s027 — "At first, it's the best thing that has ever happened to you."  strolling, his ghost a few steps ahead
registerShot('s027', { draw(g, t, info) {
  const k = t / info.dur, x = E.W * 0.32 + t * 150, cam = { z: 1.3, x: t * 150 - 120, y: 50 };
  const { M, GY } = street(g, t, cam, { mood: 'golden', seed: 41 });
  layer(g, cam, 1, (g) => drawFigure(g, { x, y: GY, s: 1.45, facing: 1, outfit: YOU, pose: walkPose(t * Math.PI * 2 * 0.9), expr: 'happy', rim: rimS(M) }));
  ghost(g, (x2) => drawFigure(x2, { x: x + 330, y: GY, s: 1.45, facing: 1, outfit: YOU, pose: walkPose((t + 0.5) * Math.PI * 2 * 0.9), expr: 'happy' }), { cam, t, a: 0.42 });
  hud(g, { k: 1, label: '+10 s' });
  FX.dust(g, t, { count: 34, color: '#ffe7c7', a: 0.35, speed: 8 });
  void k;
} });

// s028 — "You never step in a puddle again."  the ghost foot splashes, the real one steps over
registerShot('s028', { draw(g, t, info) {
  const cam = { z: 1.45, x: -40 + t * 40, y: 120 };
  const { M, GY } = street(g, t, cam, { mood: 'golden', seed: 41 }), px = E.W / 2 + 40;
  layer(g, cam, 1, (g) => {
    g.fillStyle = shade(M.road, -0.2); g.beginPath(); g.ellipse(px, GY + 6, 150, 20, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = linGrad(g, px - 150, 0, px + 150, 0, [alpha(M.sky[1], 0.5), alpha(M.key, 0.6), alpha(M.sky[1], 0.4)]); g.beginPath(); g.ellipse(px, GY + 6, 140, 15, 0, 0, Math.PI * 2); g.fill();
    const hop = prog(t, 0.55, 1.35), x = lerp(E.W / 2 - 260, E.W / 2 + 300, ease.inOut(prog(t, 0, info.dur)));
    const pose = hop > 0 && hop < 1 ? POSES.jump : walkPose(t * Math.PI * 2 * 0.9);
    drawFigure(g, { x, y: GY - Math.sin(hop * Math.PI) * 40, s: 1.45, facing: 1, outfit: YOU, pose, expr: 'smirk', rim: rimS(M) });
  });
  const sp = prog(t, 0.25, 0.8);
  ghost(g, (x) => { drawFigure(x, { x: px - 30, y: GY, s: 1.45, facing: 1, outfit: YOU, pose: walkPose(1.2), expr: 'shocked' }); if (sp > 0) FX.drops(x, t, { count: 18, area: [px - 160, GY - 120 * sp, 320, 120 * sp], rMin: 3, rMax: 9, seed: 6 }); }, { cam, t, a: 0.45 * (1 - prog(t, 1.2, 1.8)) });
  FX.dust(g, t, { count: 24, color: '#ffe7c7', a: 0.3, speed: 8 });
} });

// s029 — "You never walk into a glass door."  his ghost bonks into the glass; the real him pulls the handle
registerShot('s029', { draw(g, t, info) {
  const cam = { z: 1.6, x: 60, y: 140 };
  const { M, GY } = street(g, t, cam, { mood: 'golden', seed: 41 }), dx = E.W / 2 + 120;
  const open = ease.inOut(prog(t, 1.35, 1.9));
  layer(g, cam, 1, (g) => {
    const x = lerp(E.W / 2 - 600, dx - 150, ease.out(prog(t, 0, 1.3)));
    drawFigure(g, { x, y: GY, s: 1.45, facing: 1, outfit: YOU, pose: t < 1.3 ? walkPose(t * Math.PI * 2 * 0.9) : posesAt(t, [[1.3, POSES.stand], [1.4, POSES.reach]], 0.15), expr: 'smirk', rim: rimS(M) });
    // the glass door in its frame (hinged on the right, swings toward us)
    const fx = dx, fy = GY, w = 170, h = 380, ww = w * (1 - 0.7 * open);
    g.fillStyle = shade(M.dark, -0.3); g.fillRect(fx - 12, fy - h - 12, w + 24, 12); g.fillRect(fx + w, fy - h - 12, 12, h + 12);
    g.fillStyle = alpha('#bfe2ff', 0.18); g.fillRect(fx + w - ww, fy - h, ww, h); g.strokeStyle = alpha('#e8f4ff', 0.6); g.lineWidth = 5; g.strokeRect(fx + w - ww, fy - h, ww, h);
    for (let i = 0; i < 3; i++) seg(g, [[fx + w - ww + 20 + i * 24 * (ww / w), fy - h + 40], [fx + w - ww + 60 + i * 24 * (ww / w), fy - h + 120]], 4, alpha('#ffffff', 0.3));
    seg(g, [[fx + w - ww + 20, fy - 210], [fx + w - ww + 20, fy - 150]], 8, '#cfc6b8');
  });
  const bonk = prog(t, 0.55, 0.75), recoil = ease.out(prog(t, 0.75, 1.2));
  ghost(g, (x) => {
    const gx = t < 0.75 ? lerp(E.W / 2 - 100, dx - 40, ease.in(prog(t, 0, 0.75))) : dx - 40 - 60 * recoil;
    drawFigure(x, { x: gx, y: GY, s: 1.45, facing: 1, outfit: YOU, pose: t < 0.75 ? walkPose(t * 8) : POSES.fall, expr: t < 0.75 ? 'happy' : 'shocked', rot: -0.25 * recoil });
    if (t > 0.75) for (let i = 0; i < 3; i++) { const a = t * 5 + i * 2.1; circle(x, gx + 30 + Math.cos(a) * 50, GY - 380 + Math.sin(a) * 14, 8, '#fff'); }
  }, { cam, t, a: 0.5 * (1 - prog(t, 1.5, 2.2)) });
  void bonk;
  FX.dust(g, t, { count: 24, color: '#ffe7c7', a: 0.3, speed: 8 });
} });

// s030 — "Rock, paper, scissors?"  two fists; the ghost shows his scissors first; you throw rock
registerShot('s030', { draw(g, t, info) {
  const M = mood('day');
  blurLayer(g, 16, (g) => classroom(g, t, { z: 1.7, x: 0, y: -100 })); veil(g, '#0e0a14', 0.35);
  const sh = (tt) => Math.abs(Math.sin(Math.min(tt, 1.35) / 1.35 * Math.PI * 3)) * 70, y = E.H * 0.52 - sh(t);
  const thrown = t > 1.4, oppK = thrown ? 'scissors' : 'rock', youK = thrown ? 'rock' : 'rock';
  rpsHand(g, E.W / 2 - 260, y + 40, 1.7, youK, { ang: -0.3, sleeve: YOU.color, rim: { color: M.rim, dir: [-0.6, -0.8] } });
  rpsHand(g, E.W / 2 + 260, y + 40, 1.7, oppK, { ang: Math.PI + 0.3, sleeve: '#4a4e5e', rim: { color: M.rim, dir: [0.6, -0.8] } });
  if (t > 0.5 && !thrown) ghost(g, (x) => rpsHand(x, E.W / 2 + 260, E.H * 0.52 + 40, 1.7, 'scissors', { ang: Math.PI + 0.3, sleeve: '#fff' }), { t, a: 0.5, flicker: 0.3 });
  for (const [w, i] of [['Rock', 0], ['paper', 1], ['scissors', 2]]) { const ts = wordTime(w, 63.5) ?? 0; chip(g, w.toUpperCase(), E.W / 2, 190, { size: 34, k: prog(info.globalT, ts, ts + 0.15) * (1 - prog(info.globalT, ts + 0.45, ts + 0.5)), color: S().ui.cream }); void i; }
  if (thrown) FX.rings(g, E.W / 2, y, t - 1.4, { count: 2, r0: 40, r1: 200, color: S().ui.gold, a: 0.5 });
} });

// s031 — "You've won four hundred games in a row."  opponents cycle, the counter rolls to 400
registerShot('s031', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.45, x: 0, y: 110 };
  const { M, GY } = classroom(g, t, cam);
  const n = Math.floor(t / 0.3), opp = [FRIEND, FRIEND2, KID, FRIEND3, FRIEND][n % 5];
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: E.W / 2 - 200, y: GY, s: 1.4, facing: 1, outfit: YOU, pose: posesAt(t % 0.3, [[0, POSES.ready], [0.15, POSES.point]], 0.08), expr: 'smirk', rim: rimC(M) });
    drawFigure(g, { x: E.W / 2 + 200, y: GY, s: 1.4 * (opp === KID ? 1.15 : 1), facing: -1, outfit: opp, pose: (t % 0.3) > 0.15 ? POSES.sad : POSES.ready, expr: (t % 0.3) > 0.15 ? 'sad' : 'determined', rim: rimC(M) });
  });
  const tH = (wordTime('hundred', 66) ?? 66.77) - info.shot.start, v = Math.round(400 * ease.out(prog(t, 0.1, tH + 0.2)));
  UI.readout(g, { label: 'WINS IN A ROW', value: String(v), x: E.W / 2, y: 230, align: 'center', size: 96 });
  void k;
} });

// s032 — "Nobody plays with you anymore."  alone with a fist out; classmates walk away
registerShot('s032', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.2 + 0.05 * k, x: -60, y: 60 };
  const { M, GY } = classroom(g, t, cam);
  layer(g, cam, 1, (g) => {
    [[FRIEND, 0], [FRIEND2, 0.25], [KID, 0.5], [FRIEND3, 0.15]].forEach(([of, d], i) => drawFigure(g, { x: E.W / 2 + 80 + i * 170 + (t + d) * 210, y: GY, s: 1.2 * (of === KID ? 1.15 : 1), facing: 1, outfit: of, pose: walkPose((t + d) * Math.PI * 2 * 0.9), expr: 'neutral', rim: rimC(M) }));
    drawFigure(g, { x: E.W / 2 - 260, y: GY, s: 1.35, facing: 1, outfit: YOU, pose: breathe({ ...POSES.reach, hF: [60, -168] }, t), expr: 'sad', look: [0.8, 0], rim: rimC(M) });
  });
  FX.dust(g, t, { count: 30, color: '#fff3dc', a: 0.3, speed: 6 });
} });

// a row of desks with seated students; returns nothing (used by s033 / s035)
function classRow(g, M, GY, t, o = {}) {
  const seats = o.seats || [];
  for (const sx of seats) {
    const of = sx.of, x = sx.x, s = sx.s || 1.25;
    drawFigure(g, { x, y: GY, s: s * (of === KID ? 1.15 : 1), facing: 1, outfit: of, pose: breathe(sx.pose || POSES.sit, t, 0.6, x), expr: sx.expr || 'neutral', look: sx.look || [0.5, 0], rim: rimC(M), blink: ((t + x) % 3.3) > 3.2 });
    desk(g, x + 70 * s, GY, s);
  }
}
// s033 — "In class, you know the answer before the teacher finishes the question,"
registerShot('s033', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.05 + 0.08 * ease.inOut(k), x: -40, y: 20 };
  const { M, GY } = classroom(g, t, cam, { board: '7 × 8 = ?' });
  const tu = (wordTime('answer', 71) ?? 71.8) - info.shot.start, up = ease.outBack(prog(t, tu - 0.1, tu + 0.25));
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: E.W / 2 + 420, y: GY, s: 1.3, facing: -1, outfit: TEACHER, pose: posesAt(t, [[0, POSES.point], [1.4, POSES.explain], [2.6, POSES.point]], 0.4), expr: 'neutral', rim: rimC(M) });
    classRow(g, M, GY, t, { seats: [{ x: E.W / 2 - 640, of: FRIEND2 }, { x: E.W / 2 - 360, of: YOU, pose: up > 0 ? { ...POSES.sit, eF: [20, -200], hF: [26, -250] } : POSES.sit, expr: up > 0 ? 'smirk' : 'neutral' }, { x: E.W / 2 - 80, of: KID }] });
  });
  FX.dust(g, t, { count: 36, color: '#fff3dc', a: 0.3, area: [E.W * 0.4, 0, E.W * 0.6, E.H], speed: 6 });
} });

// s034 — "because you already heard it..."  close-up with a cyan ghost bubble "56!"
registerShot('s034', { draw(g, t, info) {
  const M = mood('day'), k = t / info.dur;
  blurLayer(g, 16, (g) => classroom(g, t, { z: 1.7, x: -200, y: -150 }, { board: '7 × 8 = ?' })); veil(g, '#0e0a14', 0.35);
  heroFace(g, E.W * 0.38, E.H * 0.58, 320 * (1 + 0.04 * k), { outfit: YOU, expr: 'smirk', look: [0.6, -0.2], rimColor: M.rim, rimSide: 1 });
  ghostSay(g, E.W * 0.74, E.H * 0.34, '56!', { size: 80, k: prog(t, 0.15, 0.5), tail: [E.W * 0.56, E.H * 0.48] }, { t, a: 0.6 });
  hud(g, { label: '+10 s' });
} });

// s035 — "from the kid who's about to get it wrong."  the kid says "54?" — a cyan cross already hangs over him
registerShot('s035', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.5 + 0.05 * k, x: -170, y: 110 };
  const { M, GY } = classroom(g, t, cam, { board: '7 × 8 = ?' });
  layer(g, cam, 1, (g) => {
    classRow(g, M, GY, t, { seats: [{ x: E.W / 2 - 500, of: YOU, expr: 'smirk', look: [0.8, -0.2] }, { x: E.W / 2 - 120, of: KID, pose: { ...POSES.sit, eF: [20, -200], hF: [26, -250] }, expr: 'happy' }] });
    say(g, E.W / 2 + 60, GY - 470, '54?', { size: 46, k: prog(t, 0.3, 0.6), tail: [E.W / 2 - 60, GY - 330] });
  });
  ghost(g, (x) => crossMark(x, E.W / 2 - 80, GY - 470, 2.2, '#ffffff', prog(t, 0.6, 1.1)), { cam, t, a: 0.65 });
  FX.dust(g, t, { count: 30, color: '#fff3dc', a: 0.3, speed: 6 });
} });
