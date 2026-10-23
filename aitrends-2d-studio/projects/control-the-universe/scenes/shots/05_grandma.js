// 05_grandma.js — s062–s082: Grandma doesn't know you; the life stone; one perfect day; the memory it takes; 1969;
// six lights slowing down; the coffee stops again; the end screen.
import { E, registerShot, layer, blurLayer, ease, prog, clamp, lerp, rr, seg, circle, poly, alpha, glow, linGrad, radGrad, text, FONTS, veil, measure } from '/engine/core.js';
import { POSES, breathe } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { person, bigFaceV2 } from '../look.js';
import { YOU, HERO, GRANDMA, THEO } from '../cast.js';
import { stone, streak, STONES } from '../stones.js';
import { backyard, observatory, nasaRoom, space, brightStar } from '../sets/world.js';
import { livingRoom, kitchen, GY } from '/projects/talk-to-animals/scenes/sets/house.js';
import { say, speak, nameTag, bp, wt, GOLDC, CORALC, MINT } from '../ui.js';
import { RIM, F, push, talkOf } from '../common.js';
import { hand, coffee, mug, MOON } from '../props.js';

const C0 = { x: 0, y: 0, z: 1 };
const PINK = STONES[5][1];
const gTalk = (info) => talkOf('GRANDMA', info);
const night = (g, a = 0.5) => veil(g, '#2a3466', a, 'multiply');
const SUIT_GLOW = (g, x, y, a = 0.4) => glow(g, x, y, 260, '#bff6ff', a);
function sepia(g) { veil(g, '#ffd2a0', 0.35, 'multiply'); g.save(); g.fillStyle = radGrad(g, E.W / 2, E.H / 2, 420, 1150, [alpha('#3a2414', 0), alpha('#3a2414', 0.55)]); g.fillRect(0, 0, E.W, E.H); g.restore(); }

// s062 — "One night, Grandma doesn't know you."
registerShot('s062', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 640, 1.25), F(980, 640, 1.32));
  layer(g, cam, 1, (g) => { livingRoom(g, t, C0, { time: 'night' }); night(g, 0.45);
    person(g, { x: 1240, y: GY() + 50, s: 1.5, facing: -1, outfit: GRANDMA, pose: POSES.stand, expr: 'neutral', look: [-1, 0], rim: MOON });
    SUIT_GLOW(g, 640, GY() - 160, 0.3); person(g, { x: 640, y: GY() + 50, s: 1.55, facing: 1, outfit: HERO, pose: POSES.relaxed, expr: 'smile', look: [1, 0], rim: MOON }); });
} });
// s063 — "She sees the cape, and she steps back."
registerShot('s063', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1000, 640, 1.35), F(1040, 640, 1.42)), k = ease.out(prog(t, 0.6, 1.4));
  layer(g, cam, 1, (g) => { livingRoom(g, t, C0, { time: 'night' }); night(g, 0.45);
    person(g, { x: 1240 + 160 * k, y: GY() + 50, s: 1.5, facing: -1, outfit: GRANDMA, pose: k > 0.3 ? POSES.handsOnHead : POSES.stand, expr: 'surprised', look: [-1, 0], rim: MOON });
    SUIT_GLOW(g, 700, GY() - 160, 0.45); person(g, { x: 700, y: GY() + 50, s: 1.55, facing: 1, outfit: { ...HERO, wind: 0.3 }, pose: POSES.stand, expr: 'worried', look: [1, 0], rim: MOON }); });
} });
// s064 — GRANDMA: "Who are you? Where's my grandson?"
registerShot('s064', { draw(g, t, info) {
  blurLayer(g, 10, (g) => { livingRoom(g, t, C0, { time: 'night' }); night(g, 0.45); }, null);
  bigFaceV2(g, 1180, 650, 300, { outfit: GRANDMA, expr: 'surprised', look: [-0.8, 0], talk: gTalk(info), rim: '#b8ccff' });
  speak(g, 'GRANDMA', info, t, 540, 230, 880, 420, { size: 46 });
} });
// s065 — "The life stone fixes what's broken."
registerShot('s065', { draw(g, t, info) {
  blurLayer(g, 10, (g) => { livingRoom(g, t, C0, { time: 'night' }); night(g, 0.5); }, null);
  const z = 1 + 0.05 * t / info.dur; g.save(); g.translate(960, 640); g.scale(z, z); g.translate(-960, -640);
  hand(g, 960, 900, 2.2, { open: 1, sleeve: HERO.color, glove: HERO.gloves, cuff: HERO.accent }); stone(g, 960, 690, 2.2, PINK, { t });
  for (let k = 0; k < 3; k++) { const r = 130 + ((t * 120 + k * 70) % 210); g.strokeStyle = alpha(PINK, 0.6 * (1 - (r - 130) / 210)); g.lineWidth = 6; g.beginPath(); g.arc(960, 690, r, 0, Math.PI * 2); g.stroke(); }
  g.restore();
} });
// s066 — "And it takes something back. A memory, for a memory."
registerShot('s066', { draw(g, t, info) {
  bp(g);
  bigFaceV2(g, 480, 640, 170, { outfit: HERO, expr: 'worried', look: [1, 0] }); bigFaceV2(g, 1440, 640, 170, { outfit: GRANDMA, expr: 'neutral', look: [-1, 0] });
  stone(g, 960, 560, 1.5, PINK, { t });
  const memo = (x, y, a, scene) => { g.save(); g.globalAlpha *= a; rr(g, x - 120, y - 80, 240, 160, 18); g.fillStyle = '#16204a'; g.fill(); g.strokeStyle = '#ffffff'; g.lineWidth = 6; g.stroke(); FX.stars(g, 0, { count: 14, area: [x - 110, y - 70, 220, 90], seed: 3 }); if (scene) { brightStar(g, x + 40, y - 30, 0.6); seg(g, [[x - 60, y + 60], [x - 10, y + 10]], 8, '#f2f2f6'); } g.restore(); };
  const u = ease.inOut(prog(t, 0.4, 2.0)); memo(lerp(480, 900, u), lerp(380, 520, u), 1 - u * 0.6, true);
  const v = ease.inOut(prog(t, 1.2, 2.8)); if (v > 0) memo(lerp(1020, 1440, v), lerp(520, 380, v), v, false);
  nameTag(g, 'A MEMORY FOR A MEMORY', 960, 960, t, wt('memory', info, t, 1.5), { size: 44, fill: alpha('#16141f', 0.9), color: GOLDC });
} });
// s067 — "You press it into her hand."
registerShot('s067', { draw(g, t, info) {
  blurLayer(g, 10, (g) => { livingRoom(g, t, C0, { time: 'night' }); night(g, 0.5); }, null);
  const k = ease.inOut(prog(t, 0.1, 1.0)); glow(g, 960, 600, 360, PINK, 0.5 + 0.3 * k);
  g.save(); g.translate(1240, 760); g.rotate(-0.5); hand(g, 0, 0, 1.8, { open: 1, sleeve: GRANDMA.color }); g.restore();
  g.save(); g.translate(lerp(560, 760, k), lerp(560, 600, k)); g.rotate(2.4); hand(g, 0, 0, 1.8, { open: 0.5, sleeve: HERO.color, glove: HERO.gloves, cuff: HERO.accent }); g.restore();
  stone(g, lerp(820, 1100, k), lerp(600, 650, k), 1.3, PINK, { t });
} });
// s068 — "She blinks. She smiles."
registerShot('s068', { draw(g, t, info) {
  blurLayer(g, 10, (g) => { livingRoom(g, t, C0, { time: 'night' }); night(g, 0.35); }, null);
  glow(g, 960, 700, 500, PINK, 0.25);
  const tb = wt('blinks', info, t, 0.3), ts = wt('smiles', info, t, 1.0);
  bigFaceV2(g, 960, 640, 300 * (1 + 0.02 * t), { outfit: GRANDMA, expr: t > ts ? 'smile' : 'neutral', look: [0, 0], blink: t > tb && t < tb + 0.18, rim: '#ffd0e8' });
} });
// s069 — GRANDMA: "There you are. You got tall."
registerShot('s069', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 520, 1.9), F(960, 520, 2.0));
  layer(g, cam, 1, (g) => { livingRoom(g, t, C0, { time: 'night' }); night(g, 0.35); glow(g, 960, GY() - 220, 300, PINK, 0.3);
    person(g, { x: 1060, y: GY() + 50, s: 1.45, facing: -1, outfit: GRANDMA, pose: POSES.reach, expr: 'smile', talk: gTalk(info), look: [-1, -0.6], rim: { color: '#ffd0e8', dir: [-0.6, -0.6] } });
    person(g, { x: 860, y: GY() + 50, s: 1.65, facing: 1, outfit: HERO, pose: POSES.stand, expr: 'smile', look: [1, 0.5], tears: 0.6, rim: MOON }); });
  speak(g, 'GRANDMA', info, t, 1340, 200, 1060, 330, { size: 46 });
} });
// s070 — "You get one perfect day at the old observatory."
registerShot('s070', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 600, 1.0), F(960, 560, 1.1));
  layer(g, cam, 1, (g) => { const R = observatory(g, t, C0, { open: ease.inOut(prog(t, 0.2, 2.2)) });
    person(g, { x: 640, y: R.GY + 40, s: 1.6, facing: 1, outfit: GRANDMA, pose: POSES.pointUp, expr: 'grin', look: [0.6, -1], rim: MOON });
    person(g, { x: 1300, y: R.GY + 40, s: 1.7, facing: -1, outfit: { ...HERO, wind: 0.2 }, pose: POSES.stand, expr: 'smile', look: [-0.5, -0.9], rim: MOON }); });
} });
// s071 — "And you realise you can't remember the first night she showed you the stars."
registerShot('s071', { draw(g, t, info) {
  blurLayer(g, 9, (g) => observatory(g, t, C0, { open: 1 }), null);
  bigFaceV2(g, 960, 760, 260, { outfit: HERO, expr: 'worried', look: [0, -0.8] });
  const k = ease.out(prog(t, 0.2, 0.6)); g.save(); g.translate(960, 260); g.scale(k, k); rr(g, -220, -140, 440, 280, 20); g.fillStyle = '#16204a'; g.fill(); g.strokeStyle = '#ffffff'; g.lineWidth = 8; g.stroke();
  for (let i = 0; i < 40; i++) { const x = ((i * 97 + Math.floor(t * 12) * 31) % 420) - 210, y = ((i * 53 + Math.floor(t * 12) * 17) % 260) - 130; g.fillStyle = alpha('#ffffff', 0.25); g.fillRect(x, y, 12, 3); }
  text(g, '?', 0, 6, { size: 160, font: FONTS.title, weight: 700, color: '#ffffff' }); g.restore();
} });
// s072 — "That's what the stone took."
registerShot('s072', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#16123a', '#2a2050']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const d = ease.inOut(prog(t, 0.3, info.dur)); hand(g, 960, 980, 2.2, { open: 1, sleeve: GRANDMA.color });
  stone(g, 960, 760, 2.0, d > 0.6 ? '#7a5a6a' : PINK, { t, glow: 1 - d });
} });
// s073 — GRANDMA: "You were six. You asked me if the stars could see us back."  the flashback
registerShot('s073', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1300, 640, 1.5), F(1320, 640, 1.58));
  layer(g, cam, 1, (g) => { const R = backyard(g, t, C0, { scopeX: 1560 });
    person(g, { x: 1400, y: R.GY + 40, s: 1.5, facing: 1, outfit: { ...GRANDMA, hairColor: '#6a6a74' }, pose: POSES.talk, expr: 'smile', talk: gTalk(info), look: [-0.6, 0.6], rim: MOON });
    rr(g, 1180, R.GY - 170, 120, 170, 30); g.fillStyle = '#8a6a4a'; g.fill();
    person(g, { x: 1240, y: R.GY + 40, s: 0.9, facing: 1, outfit: { top: 'tshirt', color: '#9ac8f0', legs: '#9ac8f0', shoes: '#f6f2ea', hair: 'none' }, pose: POSES.pointUp, expr: 'surprised', look: [0.5, -1], rim: MOON }); });
  sepia(g);
  nameTag(g, 'AGE 6', 300, 110, t, 0.2, { size: 40 });
  speak(g, 'GRANDMA', info, t, 700, 220, 1100, 420, { size: 40, wrap: 26 });
} });
// s074 — "I said yes."  the stars look back
registerShot('s074', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#0a0f2a', '#2a2f6a']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); FX.stars(g, t, { count: 260, seed: 12 });
  const z = 1 + 0.06 * t / info.dur; g.save(); g.translate(960, 540); g.scale(z, z); g.translate(-960, -540);
  [[860, 420], [1060, 420]].forEach(([x, y], i) => brightStar(g, x, y, 1.6 + 0.4 * Math.sin(t * 5 + i)));
  g.restore();
  speak(g, 'GRANDMA', info, t, 960, 840, 960, 700, { size: 46 });
} });
// s075 — "Then she goes quiet."
registerShot('s075', { draw(g, t, info) {
  blurLayer(g, 8, (g) => observatory(g, t, C0, { open: 1 }), null);
  bigFaceV2(g, 700, 660, 280, { outfit: GRANDMA, expr: 'neutral', look: [1, 0.6], rim: MOON });
  g.save(); g.translate(1520, 820); const s = 1.4; g.scale(s, s); g.fillStyle = HERO.color; g.beginPath(); g.ellipse(0, 200, 300, 300, 0, Math.PI, Math.PI * 2); g.fill(); g.restore();
  glow(g, 1520, 820, 200, '#bff6ff', 0.5);
  STONES.forEach(([, c], i) => { const a = -Math.PI / 2 + i * Math.PI / 3; circle(g, 1520 + Math.cos(a) * 60, 820 + Math.sin(a) * 60, 20, c); });
} });
// s076 / s077 — GRANDMA: "I've seen these stones before. Nineteen sixty-nine. Six lights. Same backyard."
registerShot('s076', { draw(g, t, info) {
  const cam = push(t, info.dur, F(900, 520, 1.1), F(940, 540, 1.18));
  layer(g, cam, 1, (g) => { const R = backyard(g, t, C0, { time: 'dusk', crater: t > 2.4, scopeX: 1700 });
    STONES.forEach(([, c], i) => streak(g, 260 + i * 220, -100, R.crater[0] - 120 + i * 50, R.crater[1] - 20, prog(t, 0.3 + i * 0.2, 1.8 + i * 0.2), c, 1.2));
    person(g, { x: 600, y: R.GY + 40, s: 1.5, facing: 1, outfit: { ...GRANDMA, hairColor: null, glasses: false, color: '#d86a5a' }, pose: POSES.pointUp, expr: 'surprised', look: [0.6, -1], rim: { color: '#ffd8a0', dir: [0.6, -0.6] } }); });
  sepia(g);
  nameTag(g, '1969', 300, 110, t, 0.2, { size: 54 });
  speak(g, 'GRANDMA', info, t, 1300, 200, 1000, 400, { size: 40, wrap: 26 });
} });
registerShot('s077', { draw(g, t, info) {
  g.save(); g.beginPath(); g.rect(0, 0, E.W / 2, E.H); g.clip(); layer(g, F(560, 520, 1.15), 1, (g) => backyard(g, t, C0, { time: 'dusk' })); sepia(g); g.restore();
  g.save(); g.beginPath(); g.rect(E.W / 2, 0, E.W / 2, E.H); g.clip(); g.translate(E.W / 2, 0); layer(g, F(560, 520, 1.15), 1, (g) => backyard(g, t, C0, { crater: true })); g.restore();
  seg(g, [[E.W / 2, 0], [E.W / 2, E.H]], 8, '#ffffff');
  nameTag(g, '1969', 480, 110, t, 0, { size: 50 }); nameTag(g, 'TODAY', 1440, 110, t, 0.2, { size: 50 });
  speak(g, 'GRANDMA', info, t, 960, 900, 960, 760, { size: 40, wrap: 26 });
} });
// s078 — "That night, NASA picks up six new lights."
registerShot('s078', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 460, 1.1), F(960, 400, 1.25));
  layer(g, cam, 1, (g) => nasaRoom(g, t, C0, { alert: true, screen: (g, X, Y, W, H) => {
    g.fillStyle = '#0a1a14'; g.fillRect(X, Y, W, H); const cx = X + W / 2, cy = Y + H / 2;
    for (let r = 60; r < 300; r += 60) { g.strokeStyle = alpha('#5aff8a', 0.35); g.lineWidth = 3; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
    const a = t * 2; g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = alpha('#5aff8a', 0.25); g.beginPath(); g.moveTo(cx, cy); g.arc(cx, cy, 280, a, a + 0.5); g.closePath(); g.fill(); g.restore();
    STONES.forEach(([, c], i) => { const k = ease.out(prog(t, 0.3 + i * 0.15, 0.6 + i * 0.15)); if (k > 0) { circle(g, cx + 180 + i * 18, cy - 200 + i * 24, 12 * k, c); glow(g, cx + 180 + i * 18, cy - 200 + i * 24, 30, c, 0.8); } });
    circle(g, cx, cy, 14, '#5ac8ff'); } }));
  nameTag(g, '6 NEW OBJECTS', 1200, 300, t, 1.2, { size: 46, fill: alpha('#d8343a', 0.92), color: '#ffffff' });
} });
// s079 — "They're not falling. They're slowing down."
registerShot('s079', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 540, 1.0), F(960, 540, 1.06));
  layer(g, cam, 1, (g) => { space(g, t, C0, { earthDrop: 800 });
    STONES.forEach(([, c], i) => { const ph = clamp(1 - Math.exp(-t * 0.9)), x = lerp(1900 + i * 60, 1100 + i * 90, ph), y = lerp(-80 + i * 40, 200 + (i % 3) * 90 + i * 20, ph);
      const tail = 260 * (1 - ph) + 20; g.save(); g.globalCompositeOperation = 'lighter'; g.strokeStyle = alpha(c, 0.7); g.lineWidth = 10; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); g.lineTo(x + tail * 0.9, y - tail * 0.35); g.stroke(); g.restore();
      glow(g, x, y, 60, c, 0.9); circle(g, x, y, 9, '#ffffff');
      if (t > wt('slowing', info, t, 1.5)) for (let k = 0; k < 2; k++) { const r = 20 + ((t * 80 + k * 40) % 80); g.strokeStyle = alpha(c, 0.8 * (1 - r / 100)); g.lineWidth = 4; g.beginPath(); g.arc(x, y, r, 0, Math.PI * 2); g.stroke(); } }); });
} });
// s080 — "They're not coming back for the stones. They're coming back for whoever could hold them."
registerShot('s080', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#0a0f2a', '#2a2456']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); FX.stars(g, t, { count: 160, seed: 4 });
  STONES.forEach(([, c], i) => { const x = 300 + i * 260, y = 120 + (i % 2) * 40; glow(g, x, y, 50, c, 0.9); circle(g, x, y, 7, '#ffffff'); });
  glow(g, 960, 0, 700, '#bff6ff', 0.25 + 0.1 * Math.sin(t * 3));
  bigFaceV2(g, 960, 700, 300 * (1 + 0.03 * t), { outfit: HERO, expr: 'surprised', look: [0, -1], rim: '#bff6ff' });
} });
// s081 — "Your coffee stops falling."
registerShot('s081', { draw(g, t, info) {
  blurLayer(g, 9, (g) => kitchen(g, t, C0, { tableX: 700 }), null);
  const z = 1 + 0.06 * ease.inOut(prog(t, 0, info.dur)); g.save(); g.translate(960, 540); g.scale(z, z); g.translate(-960, -540);
  coffee(g, 700, 520, 2.4, 0); mug(g, 420, 300, 2.0, -1.05);
  hand(g, 1350, 1050, 1.6, { open: 1, sleeve: YOU.color }); hand(g, 1650, 1080, 1.6, { open: 1, sleeve: YOU.color });
  g.restore();
  if (t < 0.4) veil(g, '#ffffff', 0.6 * (1 - t / 0.4), 'lighter');
} });
// s082 — END: "If you could keep only one stone, which one would you keep? Tell me in the comments. And subscribe..."
registerShot('s082', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#120f36', '#2a2060', '#5a3a7a']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); FX.stars(g, t, { count: 140, seed: 6 });
  const a1 = ease.out(prog(t, 0.3, 0.9));
  text(g, 'Which stone would YOU keep?', 960, 130, { size: 84, font: FONTS.serif, weight: 900, italic: true, color: '#fff1dc', alpha: a1, glow: 20, glowColor: 'rgba(255,170,90,.5)' });
  STONES.forEach(([n, c], i) => { const k = ease.outBack(prog(t, 0.6 + i * 0.12, 1.0 + i * 0.12)), x = 360 + i * 240; if (k <= 0) return; stone(g, x, 330, 1.0 * k, c, { t }); text(g, n, x, 420, { size: 30, font: FONTS.ui, weight: 900, color: '#ffffff', spacing: 3, alpha: clamp(k) }); });
  const tc = wt('comments', info, t, 3.0), kc = ease.outBack(prog(t, tc - 0.3, tc)); if (kc > 0) { g.save(); g.translate(520, 560); g.scale(kc * 1.4, kc * 1.4); rr(g, -60, -40, 120, 80, 24); g.fillStyle = '#ffffff'; g.fill(); poly(g, [[-30, 38], [-10, 38], [-34, 62]], '#ffffff'); for (const dx of [-28, 0, 28]) circle(g, dx, 0, 9, '#1a1420'); g.restore(); text(g, 'Comment', 520, 670, { size: 40, font: FONTS.ui, weight: 900, color: '#ffffff', alpha: clamp(kc) }); }
  const ts = wt('subscribe', info, t, 4.5), ks = ease.outBack(prog(t, ts - 0.2, ts + 0.15)); if (ks > 0) { g.save(); g.translate(900, 570); g.scale(ks * 1.3, ks * 1.3); rr(g, -190, -46, 380, 92, 46); g.fillStyle = '#e0302a'; g.fill(); text(g, 'SUBSCRIBE', 0, 4, { size: 44, font: FONTS.ui, weight: 900, color: '#ffffff', spacing: 2 }); g.restore(); }
  nameTag(g, 'PART 2 SOON', 1550, 600, t, wt('almost', info, t, 6.0), { size: 38, fill: alpha('#16141f', 0.9), color: GOLDC });
  const cast = [[GRANDMA, POSES.wave, 'smile'], [{ ...HERO, wind: 0.4 }, POSES.cheer, 'grin'], [THEO, POSES.wave, 'smile']];
  cast.forEach(([of, pose, expr], i) => { const k = ease.out(prog(t, 0.8 + i * 0.15, 1.3 + i * 0.15)); if (k <= 0) return; g.save(); g.globalAlpha *= k; person(g, { x: 1320 + i * 230, y: 1060 + (1 - k) * 40, s: 1.6, facing: 1, outfit: of, pose, expr, look: [0.2, -0.2], rim: { color: '#ffc8a0', dir: [0, -1] }, shadow: false }); g.restore(); });
} });
