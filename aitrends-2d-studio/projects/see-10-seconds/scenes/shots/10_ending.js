// shots/10_ending.js — that night the blue world shows nothing; ten seconds of black; "What would YOU do?"
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, wordTime, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, breathe } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { bedroom, bedShape } from '../sets/bedroom.js';
import { YOU, MIA, STRIKER, TEACHER, WAITER, FRIEND, CAST } from '../cast.js';
import { BLUE, ghost, doubleWorld, hud, heroFace, blueEdge, glitchBands } from '../lib.js';

const lieP = { ...POSES.lie, hF: [10, -120], eF: [12, -150], hB: [-4, -124], eB: [-6, -150] };
// hero asleep in bed: the lie pose is the stand pose rotated about the hip, so lift the root to the mattress
function inBed(g, M, light, GY, t, o = {}) {
  const top = bedShape(g, E.W / 2 + 120, GY, 1.1);
  drawFigure(g, { x: E.W / 2 - 150 + 96 * 1.3, y: top + 30 + 100 * 1.3 - 100 * 1.3, s: 1.3, facing: -1, outfit: YOU, pose: lieP, rot: Math.PI / 2, expr: o.expr || 'neutral', blink: o.closed, face: o.closed ? { eyes: 'closed' } : null, rim: { color: light, dir: [0, -1] }, shadow: false });
  g.fillStyle = '#4a4e86'; rr(g, E.W / 2 - 60, top - 30, 520, 70, 26); g.fill();                         // blanket
  g.fillStyle = alpha('#c9d4ff', 0.12); g.fillRect(E.W / 2 - 60, top - 30, 520, 8);
}

// s116 — "That night, you lie in bed and close your eyes."
registerShot('s116', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.15 + 0.08 * ease.inOut(k), x: 60, y: 40 }, tc = (wordTime('close', 259) ?? 259.36) - info.shot.start;
  const { M, GY, light } = bedroom(g, t, cam);
  layer(g, cam, 1, (g) => inBed(g, M, light, GY, t, { closed: t > tc + 0.2, expr: 'neutral' }));
  FX.dust(g, t, { count: 30, color: '#c9d4ff', a: 0.25, area: [0, 0, E.W * 0.6, E.H], speed: 4 });
  hud(g, { label: '+10 s', k: 1 - prog(t, info.dur - 0.5, info.dur) * 0.3 });
} });

// s117 — "And for the first time in your life, the blue world shows you..."  eyes closed; the cyan dims
registerShot('s117', { draw(g, t, info) {
  const M = mood('night'), k = t / info.dur, dim = ease.inOut(prog(t, 1.5, info.dur));
  blurLayer(g, 16, (g) => bedroom(g, t, { z: 1.8, x: -200, y: -150 })); veil(g, '#04050c', 0.45 + 0.3 * dim);
  heroFace(g, E.W / 2, E.H * 0.6, 330 * (1 + 0.05 * ease.inOut(k)), { outfit: YOU, expr: 'neutral', face: { eyes: 'closed', mouth: 'smallSmile' }, rimColor: mix(BLUE, '#5a6aa0', dim), rimSide: -1, tilt: -0.08 });
  glow(g, E.W / 2, E.H * 0.5, 600, BLUE, 0.18 * (1 - dim));
  hud(g, { label: '+10 s', k: 1, pulse: (1 - dim) * Math.max(0, Math.sin(t * 6)) });
} });

// s118 — "nothing."  the cyan copy vanishes; the HUD has nothing to show
registerShot('s118', { draw(g, t, info) {
  const M = mood('night'), k = t / info.dur;
  blurLayer(g, 16, (g) => bedroom(g, t, { z: 1.8, x: -200, y: -150 })); veil(g, '#020308', 0.8 + 0.1 * k);
  heroFace(g, E.W / 2, E.H * 0.6, 345 * (1 + 0.02 * k), { outfit: YOU, expr: 'neutral', face: { eyes: 'closed', mouth: 'smallSmile' }, rimColor: '#3a4470', rimSide: -1, tilt: -0.08 });
  if (t < 0.35) glitchBands(g, t, 1 - t / 0.35);
  hud(g, { label: '— —', k: 1, color: '#5a6a8a' });
} });

// s119 — "The next ten seconds are completely black."  black; a dim countdown ticks, then even that goes
registerShot('s119', { draw(g, t, info) {
  g.fillStyle = '#000'; g.fillRect(0, 0, E.W, E.H);
  const n = Math.max(0, 10 - Math.floor(t * 2.5)), a = 0.5 * (1 - prog(t, 2.2, 3.0));
  if (a > 0) text(g, `T−${n}`, E.W / 2, E.H / 2, { size: 64, color: alpha('#5a6a8a', a), font: FONTS.ui, weight: 900, spacing: 4 });
} });

// s120 — "What would YOU do with ten seconds of the future? Tell us in the comments."
registerShot('s120', { draw(g, t, info) {
  UI.endScreen(g, t, { question: 'What would YOU do with 10 seconds of the future?', cast: [YOU, MIA, STRIKER, TEACHER, WAITER, FRIEND], moodColors: ['#0a1022', '#121a36', '#1a2448'], rim: '#9fd8ff' });
  const n = 6, gap = Math.min(150, (E.W * 0.85) / n), y0 = E.H - 170;
  ghost(g, (x) => { for (let i = 0; i < n; i++) { const kk = ease.out(prog(t, 0.3 + i * 0.08, 0.7 + i * 0.08)); drawFigure(x, { x: E.W / 2 + (i - (n - 1) / 2) * gap + 40, y: y0 + (1 - kk) * 40, s: 0.9, facing: 1, outfit: [YOU, MIA, STRIKER, TEACHER, WAITER, FRIEND][i], pose: POSES.wave, alpha: kk }); } }, { t, a: 0.25 * prog(t, 1.2, 2.0) });
  text(g, 'Tell us in the comments', E.W / 2, 420, { size: 34, color: alpha(S().ui.cream, 0.75), font: FONTS.ui, weight: 900, alpha: prog(t, 3.2, 3.7), spacing: 2 });
} });
