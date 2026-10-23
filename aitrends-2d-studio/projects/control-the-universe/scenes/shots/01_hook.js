// 01_hook.js — s001–s019: the frozen coffee, the title question, six lights in Grandma's backyard, the rule, Grandma Rosa.
import { E, registerShot, layer, blurLayer, ease, prog, clamp, lerp, rr, seg, circle, poly, alpha, glow, linGrad, text, FONTS } from '/engine/core.js';
import { POSES, breathe } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { person, bigFaceV2 } from '../look.js';
import { YOU, GRANDMA } from '../cast.js';
import { stone, streak, STONES } from '../stones.js';
import { backyard, brightStar, WGY } from '../sets/world.js';
import { kitchen, GY } from '/projects/talk-to-animals/scenes/sets/house.js';
import { say, speak, nameTag, bp, wt, GOLDC, CORALC, MINT } from '../ui.js';
import { RIM, F, push, talkOf } from '../common.js';
import { coffee, mug, hand, clock759, MOON } from '../props.js';

const C0 = { x: 0, y: 0, z: 1 };
const gTalk = (info) => talkOf('GRANDMA', info);

// s001 — "Can one person really control the universe?"  frame 1: the coffee frozen in mid-air, your eye behind it
registerShot('s001', { draw(g, t, info) {
  blurLayer(g, 9, (g) => kitchen(g, t, C0, { tableX: 700 }), null);
  const z = 1 + 0.05 * ease.inOut(prog(t, 0, info.dur)); g.save(); g.translate(960, 540); g.scale(z, z); g.translate(-960, -540);
  bigFaceV2(g, 1640, 560, 430, { outfit: YOU, expr: 'surprised', look: [-0.9, 0.1] });
  coffee(g, 760, 560, 2.6, t); mug(g, 470, 300, 2.2, -1.05);
  g.restore();
} });
// s002 — "Not in a movie. With real physics. Let's find out."  the title, six stones orbiting you
registerShot('s002', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#120f36', '#2a2060', '#5a3a7a']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  FX.stars(g, t, { count: 160, seed: 3 });
  const z = 1 + 0.04 * t / info.dur; g.save(); g.translate(960, 540); g.scale(z, z); g.translate(-960, -540);
  glow(g, 960, 640, 420, '#7a6aff', 0.35);
  person(g, { x: 960, y: 820, s: 1.7, facing: 1, outfit: YOU, pose: POSES.relaxed, expr: 'neutral', look: [0.3, -0.3], rim: { color: '#bfe8ff', dir: [0, -1] } });
  STONES.forEach(([, c], i) => { const a = t * 0.8 + i / 6 * Math.PI * 2, x = 960 + Math.cos(a) * 360, y = 600 + Math.sin(a) * 110, front = Math.sin(a) > 0;
    if (!front) stone(g, x, y, 0.9, c, { t }); });
  STONES.forEach(([, c], i) => { const a = t * 0.8 + i / 6 * Math.PI * 2; if (Math.sin(a) > 0) stone(g, 960 + Math.cos(a) * 360, 600 + Math.sin(a) * 110, 1.1, c, { t }); });
  g.restore();
  const k = ease.outBack(prog(t, 0.1, 0.5)); g.save(); g.translate(960, 150); g.scale(k, k);
  text(g, 'CAN ONE PERSON REALLY', 0, -40, { size: 66, font: FONTS.title, weight: 700, color: '#ffffff' });
  text(g, 'CONTROL THE UNIVERSE?', 0, 50, { size: 86, font: FONTS.title, weight: 700, color: GOLDC, glow: 24, glowColor: alpha(GOLDC, 0.6) }); g.restore();
} });
// s003 — "This morning, at seven fifty-nine..."  the kitchen, the clock, you reach for the mug
registerShot('s003', { draw(g, t, info) {
  const cam = push(t, info.dur, F(820, 640, 1.35), F(800, 650, 1.45));
  layer(g, cam, 1, (g) => { kitchen(g, t, C0, { tableX: 700, plates: false }); mug(g, 820, GY() - 186, 0.6, 0);
    person(g, { x: 560, y: GY() + 40, s: 1.45, facing: 1, outfit: YOU, pose: POSES.reach, expr: 'neutral', look: [1, 0.4], rim: RIM }); });
  clock759(g, 1600, 150, 1, t);
} });
// s004 — "...your coffee stopped falling."  the mug tips, the coffee stops in the air
registerShot('s004', { draw(g, t, info) {
  blurLayer(g, 6, (g) => kitchen(g, t, { x: -300, y: -200, z: 1.8 }, { tableX: 700, plates: false }), null);
  const k = ease.out(prog(t, 0, 0.5)), cam = push(t, info.dur, { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: 1.06 });
  layer(g, cam, 1, (g) => { rr(g, -100, 700, 1100, 60, 12); g.fillStyle = '#c8935f'; g.fill(); g.fillStyle = '#8a5a3a'; g.fillRect(-100, 760, 1100, 30);
    mug(g, 760 + 120 * k, 610 - 40 * k, 1.6, -1.2 * k); if (k > 0.6) coffee(g, 1180, 760, 2.0, t); });
  bigFaceV2(g, 1640, 760, 260, { outfit: YOU, expr: 'surprised', look: [-0.9, 0.3] });
} });
// s005 — "It's just hanging there. One inch from the floor."
registerShot('s005', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#f2eadc', '#e2d4bc']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const cam = push(t, info.dur, { x: 0, y: 0, z: 1.02 }, { x: 0, y: 30, z: 1.1 });
  layer(g, cam, 1, (g) => { g.fillStyle = linGrad(g, 0, 820, 0, 1200, ['#c8935f', '#9a6a40']); g.fillRect(-E.W, 820, E.W * 3, 600);
    g.fillStyle = 'rgba(0,0,0,.18)'; g.beginPath(); g.ellipse(960, 830, 300, 20, 0, 0, Math.PI * 2); g.fill();
    coffee(g, 960, 700, 3.2, t, true);
    seg(g, [[1330, 760], [1330, 822]], 6, CORALC); seg(g, [[1310, 760], [1350, 760]], 6, CORALC); seg(g, [[1310, 822], [1350, 822]], 6, CORALC); });
  nameTag(g, '1 INCH', 1500, 760, t, 0.4, { size: 40, fill: alpha(CORALC, 0.92), color: '#ffffff' });
} });
// s006 — "And there's a gold stone in your hand, humming like a phone on silent."
registerShot('s006', { draw(g, t, info) {
  blurLayer(g, 10, (g) => kitchen(g, t, C0, { tableX: 700 }), null);
  const open = ease.out(prog(t, 0.1, 0.7)), z = 1 + 0.05 * t / info.dur; g.save(); g.translate(960, 600); g.scale(z, z); g.translate(-960, -600);
  hand(g, 960, 860, 2.4, { open, sleeve: YOU.color });
  if (open > 0.3) { const hum = Math.sin(t * 40) * 3 * open; stone(g, 960 + hum, 640, 2.2 * open, STONES[0][1], { t });
    for (let k = 0; k < 3; k++) { const r = 120 + ((t * 160 + k * 70) % 210); g.strokeStyle = alpha(GOLDC, 0.6 * (1 - (r - 120) / 210)); g.lineWidth = 6; g.beginPath(); g.arc(960, 640, r, 0, Math.PI * 2); g.stroke(); } }
  g.restore();
} });
// s007 — "Last night, six lights fell into Grandma's backyard."
registerShot('s007', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 520, 1.0), F(1000, 560, 1.08));
  layer(g, cam, 1, (g) => { const R = backyard(g, t, C0, { crater: t > 2.2 });
    STONES.forEach(([, c], i) => streak(g, 200 + i * 230, -120, R.crater[0] - 120 + i * 50, R.crater[1] - 20, prog(t, 0.2 + i * 0.22, 1.6 + i * 0.22), c, 1.3)); });
} });
// s008 — "Six stones."  the crater, the six stones glowing in the grass
registerShot('s008', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1080, 840, 2.2), F(1080, 860, 2.4));
  layer(g, cam, 1, (g) => { const R = backyard(g, t, C0, { crater: true });
    STONES.forEach(([, c], i) => stone(g, R.crater[0] - 150 + i * 60, R.crater[1] - 30 - (i % 2) * 14, 0.6, c, { t: t + i, rot: (i - 2.5) * 0.12 })); });
} });
// s009 — "Time. Space. Energy. Mind. Matter. And life."
registerShot('s009', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#120f36', '#241c54']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); FX.stars(g, t, { count: 120, seed: 8 });
  STONES.forEach(([n, c], i) => { const at = wt(n.toLowerCase(), info, t, 0.2 + i * 0.5), k = ease.outBack(prog(t, at - 0.1, at + 0.25)), x = 260 + i * 280;
    stone(g, x, 480, 1.7 * Math.max(0.6, k), k > 0 ? c : '#3a3660', { t, glow: k > 0 ? 1 : 0 });
    if (k > 0) text(g, n, x, 640, { size: 46, font: FONTS.ui, weight: 900, color: '#ffffff', spacing: 4, alpha: clamp(k) }); });
} });
// s010 / s011 — "Here's the rule. Every stone gives you something. And every stone takes something back."
function rule(g, t, info, takes) {
  bp(g);
  stone(g, 520, 520, 2.4, STONES[0][1], { t });
  person(g, { x: 1400, y: 760, s: 1.9, facing: -1, outfit: YOU, pose: POSES.stand, expr: takes ? 'worried' : 'smile', look: [-1, 0], rim: false, shadow: false });
  const arrowAB = (y, a, b, col, k) => { const x = lerp(a, b, k); seg(g, [[a, y], [x, y]], 14, col); if (k > 0.05) poly(g, [[x + (b > a ? 30 : -30), y], [x, y - 24], [x, y + 24]], col); };
  const k1 = ease.out(prog(t, 0.2, 0.9)); arrowAB(430, 680, 1260, MINT, k1); if (k1 > 0.5) text(g, 'GIVES', 970, 380, { size: 52, font: FONTS.ui, weight: 900, color: MINT, spacing: 4 });
  if (takes) { const k2 = ease.out(prog(t, 0.3, 1.0)); arrowAB(620, 1260, 680, CORALC, k2); if (k2 > 0.5) text(g, 'TAKES', 970, 690, { size: 52, font: FONTS.ui, weight: 900, color: CORALC, spacing: 4 });
    const u = prog(t, 0.6, 1.8); if (u > 0 && u < 1) { glow(g, lerp(1300, 600, u), 620, 40, '#ffffff', 0.9); circle(g, lerp(1300, 600, u), 620, 10, '#ffffff'); } }
}
registerShot('s010', { draw(g, t, info) { rule(g, t, info, false); } });
registerShot('s011', { draw(g, t, info) { rule(g, t, info, true); } });
// s012 — "Remember that."
registerShot('s012', { draw(g, t, info) {
  blurLayer(g, 10, (g) => kitchen(g, t, C0, { tableX: 700 }), null);
  bigFaceV2(g, 960, 620, 300 * (1 + 0.03 * t), { outfit: YOU, expr: 'worried', look: [0.2, 0.4] });
  stone(g, 1500, 860, 1.2, STONES[0][1], { t });
} });
// s013 — "Grandma Rosa was an astronomer for forty years."
registerShot('s013', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1300, 640, 1.45), F(1340, 640, 1.55));
  layer(g, cam, 1, (g) => { const R = backyard(g, t, C0, { scopeX: 1500 });
    person(g, { x: 1330, y: R.GY + 40, s: 1.5, facing: 1, outfit: GRANDMA, pose: POSES.holdFront, expr: 'smile', look: [0.6, -0.6], rim: MOON });
    person(g, { x: 1060, y: R.GY + 50, s: 1.25, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t, 1, 3), expr: 'smile', look: [0.8, -0.3], rim: MOON }); });
  nameTag(g, 'GRANDMA ROSA · ASTRONOMER', 960, 120, t, 0.3, { size: 44 });
} });
// s014 / s015 — "That one's Vega. That one's a satellite. That one's... a plane. Never mind."
function vega(g, t, info, plane) {
  const cam = push(t, info.dur, F(1040, 560, 1.45), F(1040, 540, 1.52));
  layer(g, cam, 1, (g) => { const R = backyard(g, t, C0, { scopeX: 1500 });
    brightStar(g, 760, 140, 1.6 + 0.3 * Math.sin(t * 4));
    if (plane) { const x = lerp(1900, 300, prog(t, 0, info.dur)); circle(g, x, 230, 7, Math.sin(t * 12) > 0 ? '#ff4a4a' : '#ffffff'); circle(g, x + 24, 232, 5, '#5aff8a'); }
    person(g, { x: 1180, y: R.GY + 40, s: 1.6, facing: -1, outfit: GRANDMA, pose: POSES.pointUp, expr: plane ? 'unimpressed' : 'smile', talk: gTalk(info), look: [-0.6, -1], rim: MOON });
    person(g, { x: 900, y: R.GY + 50, s: 1.35, facing: 1, outfit: YOU, pose: POSES.stand, expr: plane ? 'grin' : 'smile', look: [-0.2, -1], rim: MOON }); });
  speak(g, 'GRANDMA', info, t, 1420, 240, 1250, 420, { size: 42 });
}
registerShot('s014', { draw(g, t, info) { vega(g, t, info, false); } });
registerShot('s015', { draw(g, t, info) { vega(g, t, info, true); } });
// s016 — "Lately, she forgets things. Her glasses."
registerShot('s016', { draw(g, t, info) {
  const cam = push(t, info.dur, F(900, 640, 1.4), F(940, 640, 1.5));
  layer(g, cam, 1, (g) => { kitchen(g, t, C0, { tableX: 700 });
    person(g, { x: 900, y: GY() + 40, s: 1.55, facing: Math.sin(t * 2.2) > 0 ? 1 : -1, outfit: GRANDMA, pose: POSES.shrug, expr: 'worried', look: [1, 0.3], rim: RIM }); });
  say(g, '?', 1120, 330, t, 0.4, null, null, { size: 60 });
} });
// s017 — "They're on her head."
registerShot('s017', { draw(g, t, info) {
  blurLayer(g, 10, (g) => kitchen(g, t, C0, { tableX: 700 }), null);
  bigFaceV2(g, 960, 660, 280, { outfit: GRANDMA, expr: 'worried', look: [0.8, -0.3] });
  const k = ease.outBack(prog(t, 0.2, 0.5)); if (k > 0) { g.save(); g.translate(1340, 240); g.scale(k, k); seg(g, [[0, 0], [-180, 70]], 12, GOLDC); poly(g, [[-200, 78], [-160, 46], [-150, 92]], GOLDC); g.restore(); }
} });
// s018 — "Sometimes, your name."
registerShot('s018', { draw(g, t, info) {
  blurLayer(g, 12, (g) => kitchen(g, t, C0, { tableX: 700 }), null);
  g.save(); g.globalAlpha *= 0.25; g.fillStyle = '#1a2050'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); g.restore();
  bigFaceV2(g, 820, 640, 300 * (1 + 0.02 * t), { outfit: GRANDMA, expr: 'neutral', look: [0.6, 0], blink: t > 1.6 && t < 1.75 });
  bigFaceV2(g, 1700, 900, 200, { outfit: YOU, expr: 'sad', look: [-1, -0.3] });
} });
// s019 — "But she never forgets a star."
registerShot('s019', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 540, 1.0), F(960, 520, 1.06));
  layer(g, cam, 1, (g) => {
    g.fillStyle = '#2a2448'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
    FX.windowFrame(g, { x: 560, y: 120, w: 800, h: 600, cols: 2, rows: 2, frame: '#efe4d2', bar: 16 }, (g, X, Y, W, H) => { g.fillStyle = linGrad(g, 0, Y, 0, Y + H, ['#0a0f2a', '#2a2f6a']); g.fillRect(X, Y, W, H); FX.stars(g, t, { count: 90, area: [X, Y, W, H], seed: 11 }); brightStar(g, X + W * 0.7, Y + H * 0.3, 1.3); });
    rr(g, 520, 720, 880, 30, 6); g.fillStyle = '#f6eee0'; g.fill();
    person(g, { x: 900, y: 1060, s: 1.9, facing: 1, outfit: GRANDMA, pose: POSES.stand, expr: 'smile', look: [0.7, -0.8], rim: MOON, shadow: false });
  });
} });
