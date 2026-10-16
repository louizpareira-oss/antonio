// shots/08_climax.js — Friday, 4:12 p.m.: earbuds, the crosswalk, the truck, the countdown 10 → 0, "How did you know?" / "I saw."
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, wordTime, talkAmount, rng, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, radGrad, text, FONTS, shake } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { street, CURB, truck, crosswalk, trafficLight } from '../sets/street.js';
import { YOU, MIA } from '../cast.js';
import { BLUE, ghost, hud, climaxHUD, countAt, bigNum, heroFace, miaFace, eyeGlow, chip, dashFigure, hand, notes, glitchBands, blueEdge } from '../lib.js';

const CRX = () => E.W / 2 + 300;                       // crosswalk centre
const MY = () => CURB() + 120;                          // Mia standing on the crosswalk
const TY = () => CURB() + 215;                          // the truck's wheels
const rimG = (M) => ({ color: M.rim, dir: [0.8, -0.5] });
const phoneP = { ...POSES.phone, head: [8, -200] };
// Friday street: crosswalk + traffic light (red for cars, walk for people)
function crossing(g, t, cam, o = {}) { return street(g, t, cam, { mood: 'golden', seed: 77, cross: CRX(), light: { x: CRX() - 250, state: o.state || 'red', ped: 'walk' } }); }
// Mia with her backpack (behind her) and earbuds; f = facing
function mia(g, o) {
  const s = o.s ?? 1.4, f = o.facing ?? 1, p = o.pose || POSES.stand;
  const bx = o.x + (p.sh[0] - 22) * f * s, by = o.y + (p.sh[1] + 30) * s;
  rr(g, bx - 22 * s, by - 34 * s, 44 * s, 76 * s, 12 * s); g.fillStyle = '#23263a'; g.fill();
  drawFigure(g, { outfit: MIA, ...o, s, facing: f });
  const hx = o.x + p.head[0] * f * s, hy = o.y + p.head[1] * s; circle(g, hx - 4 * f * s, hy + 6 * s, 5 * s, '#f4f2ee');
}
const persp = (y) => 1 + (y - E.H * 0.8) / 900;          // figures grow a little as they step into the road

// s070 — "Friday, four twelve p.m."  3D: the intersection at golden afternoon, crane down
registerShot('s070', {
  kind: '3d',
  init(T) {
    const M = mood('golden');
    const st = T.stage({ mood: 'golden', fov: 40, fog: [60, 200], fogColor: M.sky[1], keyPos: [-20, 14, 10], keyIntensity: 4.0, ambient: 3.0, bloom: 0.8 });
    st.add(T.ground(200, 200, shade(M.road, 0.25)));
    const walk = T.mat(shade(M.floor, 0.45));
    for (const z of [-7, 7]) st.add(T.box(200, 0.18, 5, walk, 0, 0.09, z));                                   // sidewalks
    for (const x of [-7, 7]) st.add(T.box(5, 0.18, 200, walk, x, 0.09, 0));
    const white = T.basic('#ece8e0');
    for (let i = -4; i <= 4; i++) { const m = T.plane(0.6, 3.6, white, i * 1.1, 0.02, -2.6); m.rotation.x = -Math.PI / 2; st.add(m); }        // crosswalk
    let seed = 3; for (const [bx, bz] of [[-20, -20], [20, -20], [-20, 20], [20, 20]]) for (let i = 0; i < 3; i++) { const h = 10 + ((seed * 37 + i * 13) % 14); seed++; const b = T.building(9, h, 9, { color: shade(M.wall, 0.15 - i * 0.05), win: M.practical, lit: 0.3, seed: seed }); b.position.set(bx + (bx > 0 ? i * 10 : -i * 10), h / 2, bz); st.add(b); }
    const pole = T.cyl(0.12, 0.14, 6, '#15121c', -4.6, 3, -4.6); st.add(pole);
    const head = T.box(0.6, 1.6, 0.5, '#15121c', -4.6, 6.4, -4.6); st.add(head);
    const red = T.sphere(0.2, T.basic('#ff4a3a'), -4.6, 6.9, -4.3); st.add(red);
    const rl = new T.THREE.PointLight(0xff4a3a, 18, 8, 1.6); rl.position.set(-4.6, 6.9, -4); st.add(rl);
    for (const [x, z] of [[-8, -12], [8, -12], [-8, 12], [8, 12]]) st.add(T.tree3D(x, z, 1.3, '#2a1f2a'));
    const you = T.figure3D(YOU, { rim: M.rim, pose: walkPose(0.4) }); you.position.set(-14, 0.18, -6.6); st.add(you);
    const m2 = T.figure3D(MIA, { rim: M.rim, pose: walkPose(2.0) }); m2.position.set(-12.2, 0.18, -6.8); st.add(m2);
    return { stage: st, you, m2 };
  },
  draw(s, t, info, T) {
    s.you.setPose(walkPose(t * Math.PI * 2 * 0.9)); s.m2.setPose(walkPose(t * Math.PI * 2 * 0.9 + 1.4));
    s.you.position.x = -14 + t * 1.1; s.m2.position.x = -12.2 + t * 1.1;
    T.dolly(s.stage.camera, t, [[0, { pos: [0, 9, 9], look: [-10, 1, -6] }], [info.dur, { pos: [-6, 2.4, 0.5], look: [-11.6, 1.3, -6.7] }]]);
  },
  overlay(g, t, info) {
    const a = prog(t, 0.4, 0.8); if (a <= 0) return;
    g.save(); g.globalAlpha *= a; rr(g, E.W - 520, 170, 430, 80, 40); g.fillStyle = 'rgba(8,12,22,.82)'; g.fill(); g.strokeStyle = alpha(S().ui.gold, 0.6); g.lineWidth = 2.5; g.stroke();
    FX.clock(g, E.W - 474, 210, 26, 16 * 3600 + 12 * 60, { face: '#f2efe8' }); text(g, 'FRIDAY  ·  4:12 PM', E.W - 432, 212, { size: 34, color: S().ui.gold, font: FONTS.ui, weight: 900, align: 'left' }); g.restore();
  },
});

// s071 — "You and Mia are walking home."
registerShot('s071', { draw(g, t, info) {
  const x = E.W / 2 - 300 + t * 160, cam = { z: 1.45, x: -200 + t * 160, y: 60 };
  const { M, GY } = crossing(g, t, cam, { state: 'green' });
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x, y: GY, s: 1.4, facing: 1, outfit: YOU, pose: walkPose(t * Math.PI * 2 * 0.9), expr: 'happy', look: [0.6, 0], rim: rimG(M) });
    mia(g, { x: x + 230, y: GY, s: 1.4, facing: 1, pose: walkPose(t * Math.PI * 2 * 0.9 + 1.4), expr: 'smile', rim: rimG(M) });
  });
  FX.dust(g, t, { count: 30, color: '#ffe7c7', a: 0.3, speed: 8 });
} });

// s072 — "She has her earbuds in."  close-up: earbuds, music notes, head bopping
registerShot('s072', { draw(g, t, info) {
  const M = mood('golden'), k = t / info.dur;
  blurLayer(g, 16, (g) => crossing(g, t, { z: 1.6, x: 300, y: -120 }, { state: 'green' })); veil(g, '#1a1020', 0.35);
  const r = 320 * (1 + 0.04 * k), cx = E.W / 2 + 60, cy = E.H * 0.6, tilt = Math.sin(t * 7) * 0.05;
  miaFace(g, cx, cy, r, { outfit: MIA, expr: 'happy', face: { eyes: 'closed', mouth: 'smallSmile' }, rimColor: M.rim, rimSide: 1, earbuds: true, tilt, sway: Math.sin(t * 7) * 0.06 });
  glow(g, cx - r * 1.0, cy + r * 0.05, 90, '#ffffff', 0.35);
  notes(g, cx - r * 1.35, cy - r * 0.3, t, { n: 3 }); notes(g, cx + r * 1.15, cy - r * 0.2, t + 0.4, { n: 3 });
} });

// s073 — "She's looking at her phone."
registerShot('s073', { draw(g, t, info) {
  const x = E.W / 2 - 40 + t * 120, cam = { z: 1.6, x: 60 + t * 120, y: 90 };
  const { M, GY } = crossing(g, t, cam, { state: 'green' });
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: x - 420, y: GY, s: 1.4, facing: 1, outfit: YOU, pose: walkPose(t * Math.PI * 2 * 0.7), expr: 'neutral', look: [0.6, 0], rim: rimG(M) });
    mia(g, { x, y: GY, s: 1.4, facing: 1, pose: { ...walkPose(t * Math.PI * 2 * 0.7 + 1.4), ...{ eF: [20, -138], hF: [28, -166], head: [8, -200] } }, expr: 'neutral', look: [0.3, 0.8], rim: rimG(M), prop: { type: 'phone' } });
  });
} });

// s074 — "She steps toward the crosswalk."  low angle: her sneakers step off the curb onto the stripes; the walk light glows
registerShot('s074', { draw(g, t, info) {
  const M = mood('golden'), k = t / info.dur, cy = E.H * 0.5;
  g.save(); g.translate(E.W / 2, E.H / 2); g.scale(1 + 0.05 * k, 1 + 0.05 * k); g.translate(-E.W / 2, -E.H / 2);
  blurLayer(g, 14, (g) => { g.fillStyle = linGrad(g, 0, 0, 0, cy, [M.sky[1], shade(M.wall, -0.4)]); g.fillRect(0, 0, E.W, cy); for (let i = 0; i < 5; i++) { g.fillStyle = alpha(M.practical, 0.5); g.fillRect(80 + i * 420, cy * 0.3, 220, 180); } trafficLight(g, E.W * 0.78, cy + 40, { state: 'red', ped: 'walk', h: 200 }, M, t); });
  g.fillStyle = shade(M.floor, -0.1); g.fillRect(0, cy - 20, E.W, 140); g.fillStyle = shade(M.floor, 0.3); g.fillRect(0, cy + 110, E.W, 22); g.fillStyle = shade(M.dark, -0.2); g.fillRect(0, cy + 130, E.W, 80);
  g.fillStyle = linGrad(g, 0, cy + 210, 0, E.H, [shade(M.road, -0.1), shade(M.road, -0.4)]); g.fillRect(0, cy + 210, E.W, E.H);
  for (let i = 0; i < 4; i++) { const y0 = cy + 240 + i * 110 + i * i * 12, h = 50 + i * 12, w = 900 + i * 160; g.fillStyle = alpha('#ece8e0', 0.65); g.fillRect(E.W / 2 - w / 2 + 120, y0, w, h); }
  for (const [i, dx] of [[0, -40], [1, 260]]) {
    const st = ease.inOut(prog(t, 0.2 + i * 0.35, 0.75 + i * 0.35)), x = E.W / 2 + dx + 60 * st, y = lerp(cy + 110, cy + 330, st) - Math.sin(st * Math.PI) * 90, s = lerp(1.5, 1.8, st);
    seg(g, [[x - 20 * s, y - 280 * s], [x, y - 46 * s]], 64 * s, MIA.legs);
    rr(g, x - 60 * s, y - 56 * s, 190 * s, 60 * s, 26 * s); g.fillStyle = '#f2efe8'; g.fill(); rr(g, x - 62 * s, y - 8 * s, 194 * s, 16 * s, 8 * s); g.fillStyle = '#E2684A'; g.fill();
  }
  g.restore();
  FX.dust(g, t, { count: 24, color: '#ffe7c7', a: 0.35, speed: 8 });
} });

// s075 — "And in the blue world, ten seconds ahead,"  your eyes go cyan
registerShot('s075', { draw(g, t, info) {
  const M = mood('golden'), k = t / info.dur;
  blurLayer(g, 16, (g) => crossing(g, t, { z: 1.6, x: -240, y: -120 })); veil(g, '#06101e', 0.5);
  heroFace(g, E.W / 2, E.H * 0.58, 330 * (1 + 0.07 * ease.inOut(k)), { outfit: YOU, expr: 'surprised', rimColor: BLUE, rimSide: 1, eyeGlow: 0.6 + 0.4 * ease.out(prog(t, 0, 0.6)) });
  blueEdge(g, t, 0.8);
  hud(g, { label: '+10 s', pulse: Math.max(0, 1 - t) });
} });

// the blue-world truck run: ghost truck at x through the crosswalk (side view)
function ghostTruck(g, cam, t, x, a = 0.55, extra = null) {
  ghost(g, (gg) => { if (extra) extra(gg); truck(gg, x, TY(), 1.15, { lights: true }); }, { cam, t, a });
}
// s076 — "you see a truck run the red light."
registerShot('s076', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0 + 0.04 * k, x: 120, y: 240 };
  const { M, GY } = crossing(g, t, cam);
  layer(g, cam, 1, (g) => { drawFigure(g, { x: E.W / 2 - 520, y: GY, s: 1.2, facing: 1, outfit: YOU, pose: POSES.stand, expr: 'shocked', rim: rimG(M) }); mia(g, { x: CRX() - 60 + t * 40, y: lerp(GY, MY(), prog(t, 0, 1.6)), s: 1.2 * persp(lerp(GY, MY(), prog(t, 0, 1.6))), facing: 1, pose: { ...walkPose(t * 4), eF: [20, -138], hF: [28, -166], head: [8, -200] }, expr: 'neutral', look: [0.3, 0.8], rim: rimG(M), prop: { type: 'phone' } }); });
  ghostTruck(g, cam, t, lerp(-500, CRX() + 120, ease.in(prog(t, 0.2, info.dur))), 0.55, (gg) => mia(gg, { x: CRX() + 20, y: MY(), s: 1.2 * persp(MY()), facing: 1, pose: phoneP, expr: 'neutral' }));
  blueEdge(g, t, 0.5);
  climaxHUD(g, info.globalT, { big: false });
} });

// s077 — "Ten."  wide: Mia on the crosswalk, you far behind
function wideReal(g, t, info, o = {}) {
  const cam = o.cam || { z: 1.0, x: 120, y: 240 }, { M, GY } = crossing(g, t, cam), you = o.youX ?? E.W / 2 - 560;
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: you, y: GY, s: 1.2, facing: 1, outfit: YOU, pose: o.youPose || POSES.stand, expr: o.youExpr || 'shocked', rim: rimG(M), trail: o.trail });
    mia(g, { x: CRX() + 20, y: MY(), s: 1.2 * persp(MY()), facing: 1, pose: breathe(phoneP, t), expr: 'neutral', look: [0.3, 0.8], rim: rimG(M), prop: { type: 'phone' } });
    if (o.truckX != null) truck(g, o.truckX, TY(), 1.15 * (o.truckS || 1), { spin: t * 20 });
  });
  return { M, GY, cam };
}
registerShot('s077', { draw(g, t, info) { wideReal(g, t, info, { cam: { z: 1.0 + 0.03 * t, x: 120, y: 240 } }); climaxHUD(g, info.globalT); } });

// s078 — "You shout her name."
registerShot('s078', { draw(g, t, info) {
  const M = mood('golden'), k = t / info.dur, [sx, sy] = shake(t, 4, 10);
  blurLayer(g, 16, (g) => crossing(g, t, { z: 1.6, x: -300, y: -120 })); veil(g, '#1a1020', 0.35);
  const r = 330, cx = E.W * 0.42 + sx, cy = E.H * 0.6 + sy, open = 0.6 + 0.4 * Math.abs(Math.sin(t * 9));
  heroFace(g, cx, cy, r * (1 + 0.05 * k), { outfit: YOU, expr: 'shocked', talk: open, rimColor: M.rim, rimSide: 1 });
  FX.rings(g, cx + r * 1.2, cy, t, { count: 4, r0: 60, r1: 420, color: '#fff1dc', a: 0.5, speed: 2.2 });
  climaxHUD(g, info.globalT);
} });

// s079 — "She can't hear you."  earbuds in, eyes on the phone; your shout bounces off
registerShot('s079', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.9 + 0.05 * k, x: CRX() - E.W / 2 + 40, y: 230 };
  const { M } = crossing(g, t, cam);
  layer(g, cam, 1, (g) => { mia(g, { x: CRX() + 20, y: MY(), s: 1.3 * persp(MY()), facing: 1, pose: breathe(phoneP, t), expr: 'neutral', look: [0.3, 0.8], rim: rimG(M), prop: { type: 'phone' } }); notes(g, CRX() + 60, MY() - 420, t, { n: 3 }); });
  const rp = (t * 0.9) % 1; for (let i = 0; i < 3; i++) { const p = (rp + i * 0.33) % 1; g.strokeStyle = alpha('#fff1dc', 0.5 * (1 - p)); g.lineWidth = 4; g.beginPath(); g.arc(-200 + p * 900, E.H * 0.42, 140 + p * 60, -0.5, 0.5); g.stroke(); }
  climaxHUD(g, info.globalT);
} });

// s080 — "Nine. Eight."  the ghost truck already at the intersection; the real road is still empty
registerShot('s080', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0, x: -120 + 60 * k, y: 240 };
  const { M } = crossing(g, t, cam);
  ghostTruck(g, cam, t, lerp(-200, E.W * 0.32, ease.inOut(k)), 0.55);
  climaxHUD(g, info.globalT);
  void M;
} });

// s081 — "You're thirty meters behind her."
registerShot('s081', { draw(g, t, info) {
  const { cam } = wideReal(g, t, info, { cam: { z: 1.0, x: 100, y: 240 }, youExpr: 'determined' });
  layer(g, cam, 1, (g) => UI.dimension(g, t, { x1: E.W / 2 - 540, y1: E.H * 0.8 + 70, x2: CRX() + 20, y2: E.H * 0.8 + 70, str: '30 m', start: 0.2 }));
  climaxHUD(g, info.globalT);
} });

// s082 — "You run."
registerShot('s082', { draw(g, t, info) {
  const x = E.W / 2 - 560 + t * 520, cam = { z: 1.4, x: -560 + t * 520 + 200, y: 70 };
  const { M, GY } = crossing(g, t, cam);
  layer(g, cam, 1, (g) => drawFigure(g, { x, y: GY, s: 1.4, facing: 1, outfit: YOU, pose: walkPose(t * Math.PI * 2 * 1.7, { run: true }), expr: 'determined', rim: rimG(M), trail: { count: 3, dx: -50, a: 0.18 } }));
  FX.speedLines(g, t, { cx: E.W / 2, cy: E.H / 2, count: 50, color: '#fff1dc', a: 0.12, inner: 420 });
  climaxHUD(g, info.globalT);
} });

// s083 — "Seven."  low angle, feet pounding the sidewalk
registerShot('s083', { draw(g, t, info) {
  const M = mood('golden'), [sx, sy] = shake(t, 5, 12), cy = E.H * 0.7;
  blurLayer(g, 12, (g) => { g.fillStyle = linGrad(g, 0, 0, 0, cy, [M.sky[2], shade(M.wall, -0.4)]); g.fillRect(0, 0, E.W, cy); for (let i = 0; i < 6; i++) { g.fillStyle = alpha(M.practical, 0.5); g.fillRect(((i * 380 - t * 2400) % (E.W + 400) + E.W + 400) % (E.W + 400) - 200, cy * 0.35, 220, 180); } });
  g.save(); g.translate(sx, sy);
  g.fillStyle = linGrad(g, 0, cy - 40, 0, E.H, [shade(M.floor, -0.1), shade(M.floor, -0.35)]); g.fillRect(0, cy - 40, E.W, E.H);
  for (let x = ((-t * 2400) % 300) - 300; x < E.W + 300; x += 300) seg(g, [[x, cy - 40], [x - 140, E.H]], 3, 'rgba(0,0,0,.25)');
  for (let i = 0; i < 2; i++) { const ph = t * 11 + i * Math.PI, x = E.W / 2 - 100 + Math.sin(ph) * 260, lift = Math.max(0, Math.cos(ph)) * 160, y = cy + 120 - lift, s = 1.7;
    seg(g, [[x - 60 * s - 100, y - 360 * s], [x, y - 46 * s]], 70 * s, YOU.legs); rr(g, x - 64 * s, y - 58 * s, 200 * s, 64 * s, 28 * s); g.fillStyle = S().ink; g.fill(); rr(g, x - 66 * s, y - 8 * s, 204 * s, 18 * s, 9 * s); g.fillStyle = '#e9e6df'; g.fill(); }
  g.restore();
  FX.speedLines(g, t, { cx: E.W / 2, cy: E.H / 2, count: 40, color: '#fff1dc', a: 0.14, inner: 380 });
  climaxHUD(g, info.globalT);
} });

// s084 — "And the blue world changes."  the ghost scene tears and re-renders
registerShot('s084', { draw(g, t, info) {
  const cam = { z: 1.0, x: 120, y: 240 }, { M, GY } = crossing(g, t, cam), jump = Math.floor(t * 6) % 2;
  ghost(g, (gg) => { truck(gg, lerp(E.W * 0.05, E.W * 0.15, t / info.dur) + jump * 60, TY(), 1.15); mia(gg, { x: CRX() + 20, y: MY(), s: 1.2 * persp(MY()), facing: 1, pose: phoneP }); drawFigure(gg, { x: lerp(E.W / 2 - 300, CRX() - 120, prog(t, 0.6, 1.8)), y: lerp(GY, MY(), prog(t, 0.6, 1.8)), s: 1.25, facing: 1, outfit: YOU, pose: walkPose(t * 9, { run: true }) }); }, { cam, t, a: 0.5, dx: jump * 30, flicker: 0.6 });
  glitchBands(g, t, 0.9);
  climaxHUD(g, info.globalT, { sub: 'RECALCULATING', big: false });
  void M;
} });

// s085 — "Because you moved, the future moved too."  top-down: your dot moves, the impact zone moves with you
registerShot('s085', { draw(g, t, info) {
  const M = mood('golden'), k = t / info.dur;
  g.save(); g.translate(E.W / 2, E.H / 2); g.scale(1.05 + 0.04 * k, 1.05 + 0.04 * k); g.translate(-E.W / 2, -E.H / 2);
  g.fillStyle = shade(M.floor, -0.15); g.fillRect(-100, -100, E.W + 200, E.H * 0.42 + 100);
  g.fillStyle = shade(M.road, -0.3); g.fillRect(-100, E.H * 0.42, E.W + 200, E.H);
  g.fillStyle = shade(M.floor, 0.2); g.fillRect(-100, E.H * 0.42 - 6, E.W + 200, 12);
  for (let i = 0; i < 6; i++) { g.fillStyle = alpha('#ece8e0', 0.55); g.fillRect(E.W * 0.62 - 160, E.H * 0.47 + i * 80, 320, 40); }
  for (let x = -100; x < E.W + 100; x += 260) { g.fillStyle = alpha('#f2d27a', 0.5); g.fillRect(x, E.H * 0.8, 130, 10); }
  const mx = E.W * 0.62, my = E.H * 0.6, hx = lerp(E.W * 0.2, E.W * 0.55, ease.inOut(prog(t, 0.3, 2.4))), hy = lerp(E.H * 0.35, E.H * 0.55, ease.inOut(prog(t, 1.2, 2.4)));
  g.setLineDash([22, 16]); seg(g, [[-80, E.H * 0.62], [E.W + 80, E.H * 0.62]], 8, alpha(BLUE, 0.7)); g.setLineDash([]);
  poly(g, [[E.W - 40, E.H * 0.62], [E.W - 90, E.H * 0.58], [E.W - 90, E.H * 0.66]], BLUE);
  const zx = lerp(mx, (mx + hx) / 2, ease.inOut(prog(t, 1.2, 2.4))), zr = lerp(110, 110 + Math.abs(mx - hx) / 2 + 40, ease.inOut(prog(t, 1.2, 2.4)));
  ring(g, zx, E.H * 0.6, zr, 8, alpha(S().ui.accent, 0.8)); glow(g, zx, E.H * 0.6, zr * 1.4, S().ui.accent, 0.25);
  circle(g, mx, my, 34, '#E2684A'); circle(g, mx, my, 22, S().ink); chip(g, 'MIA', mx, my - 80, { size: 24, color: '#ffd9cc' });
  circle(g, hx, hy, 34, YOU.color); circle(g, hx, hy, 22, S().ink); chip(g, 'YOU', hx, hy - 80, { size: 24, color: '#bcd6ff' });
  circle(g, E.W * 0.06, E.H * 0.62, 50, alpha(BLUE, 0.5)); chip(g, 'TRUCK', E.W * 0.06 + 40, E.H * 0.62 + 90, { size: 24, color: BLUE });
  g.restore();
  climaxHUD(g, info.globalT, { big: false });
} });

// s086 — "Now the truck isn't just heading for Mia."
registerShot('s086', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.05, x: 160, y: 250 }, { M, GY } = crossing(g, t, cam);
  layer(g, cam, 1, (g) => drawFigure(g, { x: E.W / 2 - 300 + t * 140, y: GY, s: 1.25, facing: 1, outfit: YOU, pose: walkPose(t * 10, { run: true }), expr: 'determined', rim: rimG(M) }));
  ghostTruck(g, cam, t, lerp(-300, E.W * 0.38, ease.inOut(k)), 0.55, (gg) => mia(gg, { x: CRX() + 20, y: MY(), s: 1.2 * persp(MY()), facing: 1, pose: phoneP }));
  layer(g, cam, 1, (g) => { const a = prog(t, 0.4, 0.8); ring(g, CRX() + 20, MY() - 140, 190, 8, alpha(S().ui.accent, 0.8 * a)); glow(g, CRX() + 20, MY() - 140, 260, S().ui.accent, 0.2 * a); });
  climaxHUD(g, info.globalT, { big: false });
} });

// s087 — "It's heading for both of you."
registerShot('s087', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.05, x: 160, y: 250 }, { M, GY } = crossing(g, t, cam);
  ghostTruck(g, cam, t, lerp(E.W * 0.38, E.W * 0.48, ease.inOut(k)), 0.55, (gg) => { mia(gg, { x: CRX() + 20, y: MY(), s: 1.2 * persp(MY()), facing: 1, pose: phoneP }); drawFigure(gg, { x: CRX() - 170, y: MY() - 20, s: 1.2 * persp(MY()), facing: 1, outfit: YOU, pose: POSES.reach }); });
  layer(g, cam, 1, (g) => { const r = lerp(190, 330, ease.out(prog(t, 0.1, 0.6))); ring(g, CRX() - 70, MY() - 140, r, 9, alpha(S().ui.accent, 0.9)); glow(g, CRX() - 70, MY() - 140, r * 1.3, S().ui.accent, 0.25); });
  climaxHUD(g, info.globalT, { big: false });
  void M; void GY;
} });

// s088 — "Six. Five."  the REAL truck appears at the end of the street; the light is red
registerShot('s088', { draw(g, t, info) {
  const k = t / info.dur; wideReal(g, t, info, { cam: { z: 1.0, x: -100, y: 240 }, youX: E.W / 2 - 300 + t * 260, youPose: walkPose(t * 10, { run: true }), youExpr: 'determined', truckX: lerp(-420, -120, k), truckS: 1 });
  climaxHUD(g, info.globalT);
} });

// s089 — "For the first time, your power isn't telling you what will happen."  running close-up
registerShot('s089', { draw(g, t, info) {
  const M = mood('golden'), k = t / info.dur, bob = Math.abs(Math.sin(t * 10)) * 14;
  blurLayer(g, 18, (g) => crossing(g, t, { z: 1.6, x: -200 + t * 400, y: -120 })); veil(g, '#1a1020', 0.35);
  heroFace(g, E.W / 2 - 40, E.H * 0.6 - bob, 330 * (1 + 0.04 * k), { outfit: YOU, expr: 'determined', rimColor: M.rim, rimSide: 1, eyeGlow: 0.3 + 0.3 * (Math.sin(t * 8) > 0.5 ? 1 : 0), tilt: 0.04 });
  FX.speedLines(g, t, { cx: E.W / 2, cy: E.H / 2, count: 40, color: '#fff1dc', a: 0.08, inner: 520 });
  climaxHUD(g, info.globalT);
} });

// s090 — "It's asking you what you're willing to do."  slow motion, the HUD asks "?"
registerShot('s090', { draw(g, t, info) {
  const x = E.W / 2 - 200 + t * 60, cam = { z: 1.6, x: -200 + t * 60, y: 90 };
  blurLayer(g, 6, (g) => { const { GY } = crossing(g, t * 0.2, cam); void GY; });
  const M = mood('golden'), GY = E.H * 0.8;
  layer(g, cam, 1, (g) => drawFigure(g, { x, y: GY, s: 1.45, facing: 1, outfit: YOU, pose: walkPose(1.0 + t * 0.6, { run: true }), expr: 'determined', rim: rimG(M), trail: { count: 4, dx: -30, a: 0.14 } }));
  veil(g, '#0a0614', 0.2);
  hud(g, { label: '?', sub: 'WHAT WILL YOU DO', pulse: Math.max(0, Math.sin(t * 4)) });
} });

// s091 — "Four. Three."  the real truck, big, headlights blazing; Mia still on her phone
registerShot('s091', { draw(g, t, info) {
  const k = t / info.dur, [sx, sy] = shake(t, 5, 10);
  wideReal(g, t, info, { cam: { z: 1.05 + 0.05 * k, x: 80 + sx, y: 250 + sy }, youX: E.W / 2 - 60 + t * 200, youPose: walkPose(t * 10, { run: true }), youExpr: 'determined', truckX: lerp(E.W * 0.02, E.W * 0.2, k), truckS: 1 });
  climaxHUD(g, info.globalT);
} });

// s092 — "You don't stop."
registerShot('s092', { draw(g, t, info) {
  const M = mood('golden'), bob = Math.abs(Math.sin(t * 11)) * 16;
  blurLayer(g, 18, (g) => crossing(g, t, { z: 1.7, x: 100 + t * 500, y: -120 })); veil(g, '#1a1020', 0.4);
  heroFace(g, E.W / 2 + 40, E.H * 0.6 - bob, 350, { outfit: YOU, expr: 'angry', rimColor: M.rim, rimSide: 1, tilt: 0.06 });
  climaxHUD(g, info.globalT);
} });

// s093 — "Two."  low angle: the truck's grille fills the frame
registerShot('s093', { draw(g, t, info) {
  const M = mood('golden'), k = t / info.dur, [sx, sy] = shake(t, 8, 12), z = 0.8 + 0.6 * ease.in(k);
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, [M.sky[1], M.sky[3] || M.sky[2]]); g.fillRect(0, 0, E.W, E.H);
  g.save(); g.translate(E.W / 2 + sx, E.H * 0.62 + sy); g.scale(z, z);
  rr(g, -560, -520, 1120, 620, 40); g.fillStyle = '#2a2c36'; g.fill();
  rr(g, -440, -480, 880, 250, 26); g.fillStyle = mix(M.sky[1], '#9fb6d8', 0.4); g.fill();
  for (let i = 0; i < 7; i++) { rr(g, -360, -180 + i * 28, 720, 14, 6); g.fillStyle = '#16171e'; g.fill(); }
  for (const sx2 of [-1, 1]) { rr(g, sx2 * 450 - 70, -170, 140, 90, 20); g.fillStyle = '#fff6d8'; g.fill(); glow(g, sx2 * 450, -125, 420, '#fff1c8', 0.9); }
  g.fillStyle = '#0c0b10'; g.fillRect(-600, 60, 1200, 70);
  g.restore();
  FX.speedLines(g, t, { cx: E.W / 2, cy: E.H * 0.55, count: 60, color: '#fff1dc', a: 0.2, inner: 300 });
  climaxHUD(g, info.globalT);
} });

// s094 — "You grab her backpack and pull."  insert: your hand closes on the strap and yanks
registerShot('s094', { draw(g, t, info) {
  const M = mood('golden'), grab = prog(t, 0.12, 0.3), pull = ease.out(prog(t, 0.35, 0.9)), [sx, sy] = shake(t, t > 0.35 && t < 0.8 ? 7 : 1, 12);
  blurLayer(g, 16, (g) => crossing(g, t, { z: 1.8, x: 300, y: 80 })); veil(g, '#1a1020', 0.3);
  g.save(); g.translate(sx - pull * 260, sy);
  rr(g, E.W / 2 - 40, E.H * 0.18, 420, 560, 70); g.fillStyle = '#E2684A'; g.fill();                         // her jacket (back)
  rr(g, E.W / 2 - 140, E.H * 0.26, 330, 470, 60); g.fillStyle = '#23263a'; g.fill();                          // backpack
  rr(g, E.W / 2 - 100, E.H * 0.46, 250, 150, 40); g.fillStyle = shade('#23263a', 0.12); g.fill();
  seg(g, [[E.W / 2 - 100, E.H * 0.28], [E.W / 2 - 160, E.H * 0.2]], 34, '#191b2a');                            // top handle
  g.restore();
  hand(g, lerp(E.W / 2 - 380, E.W / 2 - 170, ease.out(grab)) - pull * 260 + sx, E.H * 0.46 + sy, 2.0, { from: [-200 - pull * 200, E.H + 200], sleeve: YOU.color, open: 1 - grab, rim: { color: M.rim, dir: [0.7, -0.7] } });
  if (pull > 0) FX.speedLines(g, t, { cx: E.W * 0.8, cy: E.H / 2, count: 30, color: '#fff1dc', a: 0.15 * (1 - pull), inner: 300 });
  climaxHUD(g, info.globalT, { big: false });
} });

// s095 — "You both fall hard onto the sidewalk."
registerShot('s095', { draw(g, t, info) {
  const [sx, sy] = shake(t, t > 0.6 && t < 1.1 ? 10 : 1, 12), cam = { z: 1.45, x: CRX() - E.W / 2 - 160 + sx, y: 250 + sy };
  const { M, GY } = crossing(g, t, cam), f = ease.in(prog(t, 0.0, 0.65)), land = prog(t, 0.6, 0.9);
  layer(g, cam, 1, (g) => {
    const yx = CRX() - 260 - 80 * f, my = lerp(MY(), GY + 30, f) + 85 * 1.3 * f, mx = CRX() - 60 * f;
    drawFigure(g, { x: yx, y: GY + 10 + 85 * 1.3 * f, s: 1.3, facing: 1, outfit: YOU, pose: f < 1 ? POSES.fall : POSES.lie, rot: -lerp(0.2, 1.45, f), expr: 'shocked', rim: rimG(M) });
    mia(g, { x: mx, y: my, s: 1.3, facing: 1, pose: f < 1 ? POSES.fall : POSES.lie, rot: -lerp(0.3, 1.4, f), expr: 'shocked', rim: rimG(M) });
    if (land > 0) FX.dust(g, t, { count: 30, color: '#d8c0a0', a: 0.5 * (1 - land), area: [CRX() - 500, GY - 140, 600, 160], speed: 30, size: 6 });
  });
  climaxHUD(g, info.globalT, { big: false });
} });

// s096 — "One."  ground level: the truck's shadow sweeps over the crosswalk
registerShot('s096', { draw(g, t, info) {
  const cam = { z: 1.9, x: CRX() - E.W / 2 + 40, y: 330 }, { M } = crossing(g, t, cam), sh = ease.in(prog(t, 0, info.dur));
  layer(g, cam, 1, (g) => { dashFigure(g, { x: CRX() + 20, y: MY(), s: 1.3 * persp(MY()), pose: phoneP, color: '#ffffff', a: 0.8 }); g.fillStyle = linGrad(g, CRX() - 900 + sh * 700, 0, CRX() - 300 + sh * 700, 0, ['rgba(0,0,0,.75)', 'rgba(0,0,0,0)']); g.fillRect(-E.W, CURB(), E.W * 3, E.H); });
  glow(g, -100 + sh * 500, E.H * 0.7, 700, '#fff1c8', 0.4 + 0.4 * sh);
  climaxHUD(g, info.globalT);
  void M;
} });

// s097 — "The truck roars through the space where she was standing."  over the dotted outline
registerShot('s097', { draw(g, t, info) {
  const [sx, sy] = shake(t, t < 1.4 ? 9 : 2, 14), cam = { z: 1.25, x: 160 + sx, y: 290 + sy };
  const { M, GY } = crossing(g, t, cam), tx = lerp(-700, E.W + 900, ease.inOut(prog(t, 0.0, 1.5)));
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: CRX() - 380, y: GY + 20 + 85 * 1.25, s: 1.25, facing: 1, outfit: YOU, pose: POSES.lie, rot: -1.45, expr: 'shocked', rim: rimG(M) });
    mia(g, { x: CRX() - 140, y: GY + 30 + 85 * 1.25, s: 1.25, facing: 1, pose: POSES.lie, rot: -1.4, expr: 'shocked', rim: rimG(M) });
    dashFigure(g, { x: CRX() + 20, y: MY(), s: 1.25 * persp(MY()), pose: phoneP, color: '#ffffff', a: 0.4 + 0.5 * prog(t, 1.4, 1.8) });
    for (let i = 3; i >= 0; i--) { g.save(); g.globalAlpha = i ? 0.15 : 1; truck(g, tx - i * 90, TY(), 1.3, { spin: t * 30 }); g.restore(); }
  });
  FX.speedLines(g, t, { cx: E.W / 2, cy: E.H * 0.7, count: 50, color: '#fff1dc', a: 0.15 * (1 - prog(t, 1.2, 1.6)), inner: 400 });
  if (t > 1.6) chip(g, 'SHE WAS HERE', E.W / 2 + 120, E.H * 0.28, { size: 30, k: prog(t, 1.7, 2.1), line: alpha('#ffffff', 0.5) });
  climaxHUD(g, info.globalT, { big: false });
} });

// s098 — "Zero."  silence; the two worlds line up
registerShot('s098', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.15 + 0.05 * ease.inOut(k), x: 60, y: 60 };
  const { M, GY } = crossing(g, t, cam), sit1 = { ...POSES.sit, head: [8, -176], hF: [-30, -40], hB: [-36, -38], eF: [-10, -100], eB: [-14, -100] };
  const scene = (gg, ghostPass) => { drawFigure(gg, { x: CRX() - 400, y: GY + 20, s: 1.25, facing: 1, outfit: YOU, pose: sit1, expr: 'shocked', rim: ghostPass ? false : rimG(M) }); mia(gg, { x: CRX() - 150, y: GY + 30, s: 1.25, facing: -1, pose: sit1, expr: 'shocked', rim: ghostPass ? false : rimG(M) }); };
  layer(g, cam, 1, (g) => scene(g, false));
  ghost(g, (x) => scene(x, true), { cam, t, a: 0.5 * (1 - ease.inOut(prog(t, 0.2, 1.8))), dx: 40 * (1 - ease.inOut(prog(t, 0.2, 1.8))) });
  FX.dust(g, t, { count: 50, color: '#d8c0a0', a: 0.4, speed: 8, size: 3 });
  const { n, age } = countAt(info.globalT);
  hud(g, { count: n ?? 0, pulse: Math.max(0, 1 - age * 2), color: S().ui.good });
  bigNum(g, '0', E.W - 260, E.H * 0.42, age, { color: S().ui.good, hold: 1.2 });
} });

// s099 — "Mia stares at you, shaking."
registerShot('s099', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.7 + 0.05 * k, x: CRX() - E.W / 2 - 300, y: 150 }, [sx, sy] = shake(t, 3, 20);
  const { M, GY } = crossing(g, t, cam), sit1 = { ...POSES.sit, head: [8, -176], hF: [-30, -40], hB: [-36, -38], eF: [-10, -100], eB: [-14, -100] };
  layer(g, cam, 1, (g) => { drawFigure(g, { x: CRX() - 420, y: GY + 20, s: 1.3, facing: 1, outfit: YOU, pose: breathe(sit1, t), expr: 'worried', look: [0.6, 0], rim: rimG(M) }); mia(g, { x: CRX() - 150 + sx, y: GY + 30 + sy * 0.3, s: 1.3, facing: -1, pose: { ...sit1, head: [8 + sx * 0.5, -176] }, expr: 'scared', look: [0.6, 0], rim: rimG(M) }); });
} });

// s100 — "How did you know?"  Mia close-up, scared, talking
registerShot('s100', { draw(g, t, info) {
  const M = mood('golden'), k = t / info.dur, [sx, sy] = shake(t, 3, 18);
  blurLayer(g, 16, (g) => crossing(g, t, { z: 1.6, x: 360, y: -100 })); veil(g, '#1a1020', 0.35);
  miaFace(g, E.W / 2 + 80 + sx, E.H * 0.6 + sy, 330 * (1 + 0.05 * k), { outfit: MIA, expr: 'scared', talk: talkAmount(info.globalT, 211.55, 213.3), look: [-0.3, 0], rimColor: M.rim, rimSide: 1, face: { tears: true } });
} });

// s101 — "And for once, you tell her the truth."  two-shot on the curb, warm light
registerShot('s101', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.75 + 0.06 * ease.inOut(k), x: CRX() - E.W / 2 - 290, y: 160 };
  const { M, GY } = crossing(g, t, cam), sit1 = { ...POSES.sit, head: [8, -176], hF: [30, -84], hB: [24, -82] };
  layer(g, cam, 1, (g) => { drawFigure(g, { x: CRX() - 420, y: GY + 20, s: 1.3, facing: 1, outfit: YOU, pose: breathe(sit1, t), expr: 'smile', look: [0.6, 0], rim: rimG(M) }); mia(g, { x: CRX() - 150, y: GY + 30, s: 1.3, facing: -1, pose: breathe(sit1, t, 1, 2), expr: 'worried', look: [0.6, 0], rim: rimG(M) }); });
  glow(g, E.W * 0.85, E.H * 0.2, 600, M.key, 0.2);
} });

// s102 / s103 — "I didn't know." / "I saw."  your close-up; on "saw" your eyes glow softly
registerShot('s102', { draw(g, t, info) {
  const M = mood('golden'), k = t / info.dur;
  blurLayer(g, 16, (g) => crossing(g, t, { z: 1.6, x: -100, y: -100 })); veil(g, '#1a1020', 0.35);
  heroFace(g, E.W / 2 - 60, E.H * 0.6, 330 * (1 + 0.04 * k), { outfit: YOU, expr: 'sad', face: { mouth: 'smallFlat', brows: null }, talk: talkAmount(info.globalT, 217.2, 218.0), look: [0.5, 0], rimColor: M.rim, rimSide: 1 });
} });
registerShot('s103', { draw(g, t, info) {
  const M = mood('golden'), k = t / info.dur, gt = info.globalT, ts = wordTime('saw', 218.3) ?? 218.63;
  blurLayer(g, 16, (g) => crossing(g, t, { z: 1.6, x: -100, y: -100 })); veil(g, '#1a1020', 0.4);
  heroFace(g, E.W / 2 - 60, E.H * 0.6, 330 * (1.04 + 0.05 * ease.inOut(k)), { outfit: YOU, expr: gt > ts + 0.8 ? 'smile' : 'neutral', talk: talkAmount(gt, 218.5, 219.2), look: [0.5, 0], rimColor: mix(M.rim, BLUE, prog(gt, ts, ts + 0.8)), rimSide: 1, eyeGlow: 0.6 * ease.inOut(prog(gt, ts, ts + 0.6)) });
  FX.dust(g, t, { count: 30, color: BLUE, a: 0.25 * prog(gt, ts, ts + 0.6), speed: 6 });
} });
