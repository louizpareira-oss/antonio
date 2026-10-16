// shots/05_penalty.js — penalty kicks: the 3D stadium, the striker, the rerun, the dive bottom left. Every. Single. Time.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, wordTime, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose, soccerBall } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { pitch, goal, GL } from '../sets/pitch.js';
import { YOU_GK, STRIKER } from '../cast.js';
import { BLUE, ghost, hud, chip, heroFace, hand, checkMark } from '../lib.js';

const rimP = () => ({ color: '#dfe8ff', dir: [0, -1], w: 4 });       // floodlights from above
const diveP = { ...POSES.dive, hF: [10, -262], hB: [-2, -258] };

// s036 — "And then there are penalty kicks."  3D stadium under floodlights, slow orbit
registerShot('s036', {
  kind: '3d',
  init(T) {
    const M = mood('night');
    const st = T.stage({ mood: 'night', fov: 40, fog: [40, 140], keyPos: [10, 26, 8], keyIntensity: 3.0, ambient: 2.4, sky: M.sky, bloom: 0.9 });
    const grass = T.canvasTex(512, 512, (g, w, h) => { for (let i = 0; i < 8; i++) { g.fillStyle = i % 2 ? shade(M.grass, -0.05) : shade(M.grass, -0.18); g.fillRect(0, (i * h) / 8, w, h / 8); } }, [6, 6]);
    st.add(T.ground(140, 140, '#ffffff', grass));
    const white = T.basic('#eef2ff');
    const line = (w, d, x, z) => { const m = T.plane(w, d, white, x, 0.02, z); m.rotation.x = -Math.PI / 2; st.add(m); };
    line(40, 0.12, 0, -10); line(0.12, 16, -10, -2); line(0.12, 16, 10, -2); line(20, 0.12, 0, 6);
    const spot = T.cyl(0.18, 0.18, 0.02, white, 0, 0.02, 1); st.add(spot);
    for (const x of [-3.66, 3.66]) st.add(T.cyl(0.07, 0.07, 2.44, white, x, 1.22, -10));                        // goal
    const bar = T.cyl(0.07, 0.07, 7.32, white, 0, 2.44, -10); bar.rotation.z = Math.PI / 2; st.add(bar);
    const net = T.box(7.32, 2.44, 1.6, T.basic('#cfd8ea', { transparent: true, opacity: 0.12 }), 0, 1.22, -10.9); st.add(net);
    // stands with crowds on three sides
    for (const [x, z, ry, w] of [[0, -30, 0, 90], [-44, 0, Math.PI / 2, 80], [44, 0, -Math.PI / 2, 80]]) {
      const grp = new T.THREE.Group(); grp.position.set(x, 0, z); grp.rotation.y = ry; st.add(grp);
      for (let r = 0; r < 10; r++) grp.add(T.box(w, 0.6, 1.2, shade(M.wall, 0.05 - r * 0.02), 0, 0.3 + r * 0.6, -r * 1.2));
      const c = T.crowd3D({ rows: 10, perRow: 110, width: w - 4, step: 1.2, rise: 0.6, colors: ['#6a6a98', '#7a74a8', '#8a6a9a', '#5a5a8a', '#9a8aaa', '#c06a5a', '#5a7ac0'], y0: 0.95, z0: 0 }); c.position.z = 0; grp.add(c);
    }
    // floodlight towers
    for (const [x, z] of [[-36, -26], [36, -26], [-36, 22], [36, 22]]) {
      st.add(T.cyl(0.4, 0.5, 26, '#0c0e1a', x, 13, z));
      const head = T.box(5, 2.4, 0.6, T.basic('#fffbe8'), x, 26.5, z); head.lookAt(0, 0, 0); st.add(head);
      const sh = T.shaft(5, 34, '#e8f0ff', 0.05); sh.position.set(x * 0.6, 14, z * 0.6); sh.lookAt(0, 0, 0); sh.rotateX(Math.PI / 2); st.add(sh);
      const pl = new T.THREE.PointLight(0xe8f0ff, 120, 80, 1.4); pl.position.set(x * 0.8, 22, z * 0.8); st.add(pl);
    }
    const keeper = T.figure3D(YOU_GK, { rim: '#dfe8ff', pose: POSES.ready }); keeper.position.set(0, 0, -9.6); keeper.rotation.y = Math.PI / 2; st.add(keeper);
    const striker = T.figure3D(STRIKER, { rim: '#dfe8ff', pose: POSES.stand }); striker.position.set(0.6, 0, 3.2); striker.rotation.y = Math.PI / 2; st.add(striker);
    const ball = T.sphere(0.12, T.mat('#f2efe8'), 0, 0.12, 1); st.add(ball);
    return { stage: st };
  },
  draw(s, t, info, T) {
    T.dolly(s.stage.camera, t, [[0, { pos: [12, 6, 12], look: [0, 3.5, -12] }], [info.dur, { pos: [5, 2.6, 8], look: [0, 2.2, -12] }]]);
  },
  overlay(g, t) { FX.dust(g, t, { count: 40, color: '#e8f0ff', a: 0.25, speed: 6 }); },
});

// s037 — "The striker runs up."  wide from behind: run-up, you in goal ready
registerShot('s037', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.05 + 0.06 * ease.inOut(k), x: 0, y: -20 };
  const { M } = pitch(g, t, cam), gl = GL();
  layer(g, cam, 0.85, (g) => { goal(g, E.W / 2, gl, 640, 230); drawFigure(g, { x: E.W / 2, y: gl, s: 0.8, facing: 1, outfit: YOU_GK, pose: breathe(POSES.ready, t * 2, 1.5), expr: 'determined', rim: rimP() }); });
  layer(g, cam, 1, (g) => {
    soccerBall(g, E.W / 2, E.H * 0.9 - 14, 16, 0);
    const x = lerp(E.W / 2 - 520, E.W / 2 - 110, ease.inOut(prog(t, 0, info.dur))), y = lerp(E.H * 1.02, E.H * 0.93, prog(t, 0, info.dur));
    drawFigure(g, { x, y, s: 1.6, facing: 1, outfit: STRIKER, pose: walkPose(t * Math.PI * 2 * 1.4, { run: true }), expr: 'determined', rim: rimP() });
  });
  FX.dust(g, t, { count: 40, color: '#e8f0ff', a: 0.25, speed: 6 });
} });

// s038 — "To everyone else, it's a guess."  a question mark over each corner
registerShot('s038', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.5 + 0.05 * k, x: 0, y: -170 };
  const { M } = pitch(g, t, cam, { cheer: 0.3 }), gl = GL();
  layer(g, cam, 0.85, (g) => {
    goal(g, E.W / 2, gl, 640, 230);
    drawFigure(g, { x: E.W / 2, y: gl, s: 0.8, facing: 1, outfit: YOU_GK, pose: breathe(POSES.ready, t * 2, 1.5), expr: 'determined', rim: rimP() });
    for (const [dx, d] of [[-220, 0.2], [220, 0.45]]) { const a = ease.outBack(prog(t, d, d + 0.3)); if (a > 0) { g.save(); g.translate(E.W / 2 + dx, gl - 120); g.scale(a, a); text(g, '?', 0, 0, { size: 120, color: S().ui.gold, font: FONTS.ui, weight: 900, glow: 20, glowColor: alpha(S().ui.gold, 0.6) }); g.restore(); } }
  });
  blurLayer(g, 10, (g) => backViewStriker(g), cam, 1.5);
} });
function backViewStriker(g) { drawFigure(g, { x: E.W / 2 - 520, y: E.H * 1.04, s: 3.6, facing: 1, outfit: STRIKER, pose: POSES.stand, rim: rimP(), shadow: false }); circle(g, E.W / 2 - 520 + 3 * 3.6, E.H * 1.04 - 208 * 3.6, 26 * 3.6, S().ink); }

// s039 — "To you, it's a rerun."  your view from the goal: his cyan ghost has already shot
registerShot('s039', { draw(g, t, info) {
  const M = mood('night'), k = t / info.dur, cam = { z: 1.1 + 0.05 * k, x: 0, y: 0 };
  layer(g, cam, 0.3, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, E.H * 0.62, M.sky); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 1.62); FX.crowd(g, t, { x: -E.W, y: E.H * 0.28, w: E.W * 3, rows: 12, rowH: 26, colors: ['#2a2a48', '#3a3458', '#4a3a5a'], seed: 21 }); });
  layer(g, cam, 0.8, (g) => { g.fillStyle = linGrad(g, 0, E.H * 0.6, 0, E.H * 1.4, [shade(M.grass, -0.2), shade(M.grass, -0.45)]); g.fillRect(-E.W, E.H * 0.6, E.W * 3, E.H); FX.pool(g, E.W / 2, E.H * 0.8, 700, 90, '#e8f0ff', 0.1); });
  layer(g, cam, 1, (g) => { drawFigure(g, { x: E.W / 2 + 20, y: E.H * 0.82, s: 1.3, facing: -1, outfit: STRIKER, pose: breathe(POSES.ready, t), expr: 'determined', rim: rimP() }); soccerBall(g, E.W / 2 - 70, E.H * 0.82 - 14, 16); });
  ghost(g, (x) => { drawFigure(x, { x: E.W / 2 + 20, y: E.H * 0.82, s: 1.3, facing: -1, outfit: STRIKER, pose: { ...POSES.kick, fF: [70, -60] } }); const bp = (t * 0.8) % 1; circle(x, lerp(E.W / 2 - 70, E.W * 0.12, bp), lerp(E.H * 0.8, E.H * 0.9, bp), 16 + bp * 40, '#fff'); }, { cam, t, a: 0.5 });
  // goal frame from inside: posts at the frame edges
  blurLayer(g, 6, (g) => { seg(g, [[60, E.H + 40], [60, -40]], 40, '#e8e6e0'); seg(g, [[E.W - 60, E.H + 40], [E.W - 60, -40]], 40, '#e8e6e0'); seg(g, [[0, 70], [E.W, 70]], 40, '#e8e6e0'); });
  chip(g, '▶ REPLAY', E.W - 240, 200, { size: 32, color: BLUE, k: prog(t, 0.2, 0.5), line: alpha(BLUE, 0.6) });
  hud(g, { label: '+10 s' });
} });

// s040 — "You already watched the ball go bottom left."  the ghost ball curls into the bottom-left corner
registerShot('s040', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.5 + 0.05 * k, x: 0, y: -170 };
  const { M } = pitch(g, t, cam), gl = GL();
  layer(g, cam, 0.85, (g) => { goal(g, E.W / 2, gl, 640, 230); drawFigure(g, { x: E.W / 2, y: gl, s: 0.8, facing: 1, outfit: YOU_GK, pose: breathe(POSES.ready, t * 2, 1.5), expr: 'determined', rim: rimP() }); });
  const p = ease.inOut(prog(t, 0.6, 1.5)), bez = (u) => { const a = [E.W / 2, E.H * 0.98], b = [E.W / 2 - 120, gl - 160], c = [E.W / 2 - 290, gl - 20]; return [lerp(lerp(a[0], b[0], u), lerp(b[0], c[0], u), u), lerp(lerp(a[1], b[1], u), lerp(b[1], c[1], u), u)]; };
  ghost(g, (x) => { x.setLineDash([14, 14]); x.strokeStyle = '#fff'; x.lineWidth = 5; x.beginPath(); for (let i = 0; i <= 40; i++) { const [bx, by] = bez((i / 40) * p); i ? x.lineTo(bx, by) : x.moveTo(bx, by); } x.stroke(); x.setLineDash([]); const [bx, by] = bez(p); circle(x, bx, by, lerp(30, 12, p), '#fff'); }, { cam: { ...cam }, depth: 0.85, t, a: 0.65 });
  if (p > 0.95) UI.callout(g, t - 1.6, { at: [E.W / 2 - 290 * 1.4, E.H * 0.62], to: [E.W / 2 - 600, E.H * 0.35], str: 'BOTTOM LEFT', color: BLUE });
  blurLayer(g, 10, (g) => backViewStriker(g), cam, 1.5);
  hud(g, { label: '+10 s' });
} });

// s041 — "You dive bottom left."  FREEZE mid-dive, gloves on the real ball
registerShot('s041', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.9 + 0.08 * ease.inOut(k), x: -282, y: 40, r: 0.02 };
  const { M } = pitch(g, t * 0.1, cam), gl = GL();
  layer(g, cam, 0.85, (g) => {
    goal(g, E.W / 2, gl, 640, 230);
    drawFigure(g, { x: E.W / 2 - 150, y: gl - 30, s: 0.85, facing: -1, outfit: YOU_GK, pose: diveP, rot: 1.25, expr: 'determined', rim: rimP() });
    soccerBall(g, E.W / 2 - 330, gl - 50, 15, 0.4);
    FX.drops(g, t, { count: 22, area: [E.W / 2 - 400, gl - 140, 300, 130], rMin: 2, rMax: 5, color: '#cfe8c0', drift: 1, seed: 8 });
  });
  veil(g, '#9fc8ff', 0.12, 'soft-light');
  UI.badge(g, { str: 'FROZEN', x: E.W - 90, y: 200, color: '#bfe6ff', size: 30 });
} });

// s042 — "Every."  glove insert: the ball smacks into gold gloves
registerShot('s042', { draw(g, t, info) {
  const M = mood('night'), [sx, sy] = shake(t, t < 0.25 ? 10 : 2, 12);
  blurLayer(g, 16, (g) => pitch(g, t, { z: 2, x: 0, y: -260 })); veil(g, '#060814', 0.3);
  g.save(); g.translate(sx, sy);
  soccerBall(g, E.W / 2 + 20, E.H * 0.5, 150, t * 0.5);
  for (const sgn of [-1, 1]) { hand(g, E.W / 2 + sgn * 170, E.H * 0.5 + 40, 1.2, { from: [E.W / 2 + sgn * 700, E.H + 300], sleeve: YOU_GK.color, ink: '#D29F34', open: 0.8, rim: { color: '#dfe8ff', dir: [0, -1] } }); }
  g.restore();
  FX.rings(g, E.W / 2, E.H * 0.5, t, { count: 2, r0: 160, r1: 420, color: S().ui.gold, a: 0.5 });
  checkMark(g, E.W - 200, 220, 1.4, S().ui.good, prog(t, 0.1, 0.4));
} });

// s043 — "Single."  another save, side angle along the goal line
registerShot('s043', { draw(g, t, info) {
  const M = mood('night'), k = t / info.dur, cam = { z: 1.2, x: 0, y: 0 };
  layer(g, cam, 0.3, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, E.H * 0.7, M.sky); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 1.7); FX.crowd(g, t, { x: -E.W, y: E.H * 0.4, w: E.W * 3, rows: 10, rowH: 28, colors: ['#2a2a48', '#3a3458', '#4a3a5a'], cheer: 1, seed: 31 }); });
  layer(g, cam, 0.8, (g) => { g.fillStyle = linGrad(g, 0, E.H * 0.7, 0, E.H * 1.4, [shade(M.grass, -0.2), shade(M.grass, -0.45)]); g.fillRect(-E.W, E.H * 0.7, E.W * 3, E.H); });
  layer(g, cam, 1, (g) => {
    seg(g, [[E.W * 0.82, E.H * 0.82], [E.W * 0.82, E.H * 0.3]], 18, '#f2f0ea');
    const x = lerp(E.W * 0.55, E.W * 0.3, ease.out(prog(t, 0, 0.5))), y = E.H * 0.8;
    drawFigure(g, { x, y: y - 40, s: 1.4, facing: -1, outfit: YOU_GK, pose: diveP, rot: 1.3, expr: 'determined', rim: rimP() });
    soccerBall(g, x - 240, y - 70, 20, t * 3);
  });
  checkMark(g, E.W - 200, 220, 1.4, S().ui.good, prog(t, 0.1, 0.4)); checkMark(g, E.W - 320, 220, 1.4, S().ui.good, 1);
  void k;
} });

// s044 — "Time."  ball under the arm; the striker on his knees; the crowd up
registerShot('s044', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.55 + 0.05 * k, x: 0, y: -160 };
  const { M } = pitch(g, t, cam, { cheer: 1 }), gl = GL();
  layer(g, cam, 0.85, (g) => {
    goal(g, E.W / 2, gl, 640, 230);
    drawFigure(g, { x: E.W / 2 + 40, y: gl, s: 0.85, facing: -1, outfit: YOU_GK, pose: breathe(POSES.holdFront, t), expr: 'smirk', rim: rimP(), prop: { type: 'ball' } });
  });
  layer(g, cam, 1, (g) => drawFigure(g, { x: E.W / 2 - 330, y: E.H * 0.65, s: 1.5, facing: 1, outfit: STRIKER, pose: { ...POSES.kneel, hF: [30, -200], eF: [34, -160] }, expr: 'sad', rim: rimP() }));
  for (let i = 0; i < 3; i++) checkMark(g, E.W - 200 - i * 120, 220, 1.4, S().ui.good, 1);
  FX.dust(g, t, { count: 40, color: '#e8f0ff', a: 0.3, speed: 6 });
} });
