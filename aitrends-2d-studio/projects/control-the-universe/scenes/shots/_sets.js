// look test 3 (not part of the video): the main sets with the cast, one frame each (look1..look8).
import { E, registerShot, layer, blurLayer, rr, alpha, linGrad, glow, text, FONTS, circle, ease, prog } from '/engine/core.js';
import { POSES } from '/engine/rig2d.js';
import { person, bigFaceV2, XP } from '../look.js';
import { YOU, YOU1, YOU3, HERO, GRANDMA, THEO } from '../cast.js';
import { stone, streak, blink, STONES } from '../stones.js';
import { backyard, classroom, ramenStall, stadium, nasaRoom, observatory, space, gpsSat, brightStar } from '../sets/world.js';
import { kitchen } from '/projects/talk-to-animals/scenes/sets/house.js';
import { say, nameTag } from '/projects/talk-to-animals/scenes/ui.js';
const RIM = { color: '#ffc68a', dir: [-0.8, -0.5] }, MOON = { color: '#b8ccff', dir: [0.6, -0.6] };
const C0 = { x: 0, y: 0, z: 1 };
// 1 — the hook: the coffee frozen in mid-air, the gold stone in your hand
registerShot('look1', { draw(g, t) {
  blurLayer(g, 8, (g) => kitchen(g, t, C0, {}), null);
  bigFaceV2(g, 1260, 560, 260, { outfit: YOU, expr: 'surprised', look: [-0.8, 0.3] });
  rr(g, 380, 520, 150, 170, 20); g.fillStyle = '#f6f2ea'; g.fill(); g.strokeStyle = '#f6f2ea'; g.lineWidth = 18; g.beginPath(); g.arc(540, 600, 40, -1.2, 1.2); g.stroke();   // the mug, tipping
  g.fillStyle = '#6a3a1a'; g.beginPath(); g.moveTo(420, 520); g.bezierCurveTo(360, 420, 470, 380, 520, 300); g.bezierCurveTo(560, 380, 600, 440, 500, 530); g.closePath(); g.fill();   // coffee hanging in the air
  for (const [x, y, r] of [[560, 260, 16], [610, 320, 10], [470, 250, 12], [640, 230, 7], [520, 200, 9]]) circle(g, x, y, r, '#6a3a1a');
  circle(g, 880, 930, 120, '#1d1b22'); stone(g, 880, 820, 1.4, STONES[0][1], { t });
  rr(g, 80, 70, 250, 110, 20); g.fillStyle = '#16121a'; g.fill(); text(g, '7:59', 205, 127, { size: 80, font: FONTS.ui, weight: 900, color: '#ff5a4a', glow: 20, glowColor: 'rgba(255,90,70,.7)' });
} });
// 2 — Grandma's backyard: six lights falling
registerShot('look2', { draw(g, t) {
  layer(g, { x: 0, y: 40, z: 1.05 }, 1, (g) => { const R = backyard(g, t, C0, { crater: true });
    STONES.forEach(([, c], i) => streak(g, 300 + i * 160, -100, R.crater[0] - 100 + i * 40, R.crater[1] - 20, 0.55 + i * 0.08, c, 1.2));
    person(g, { x: 420, y: R.GY + 40, s: 1.5, facing: 1, outfit: GRANDMA, pose: POSES.point, expr: 'surprised', look: [0.6, -1], rim: MOON });
    person(g, { x: 620, y: R.GY + 50, s: 1.35, facing: 1, outfit: YOU, pose: POSES.stand, expr: 'surprised', look: [0.6, -1], rim: MOON }); });
} });
// 3 — the classroom at 7:59: you in the 3-stone suit
registerShot('look3', { draw(g, t) {
  layer(g, { x: 120, y: 80, z: 1.25 }, 1, (g) => { const R = classroom(g, t, C0, { clock: 59, frozen: true });
    person(g, { x: 760, y: R.GY + 30, s: 1.45, facing: 1, outfit: YOU3, pose: POSES.relaxed, expr: 'grin', look: [0.8, -0.2], rim: RIM });
    person(g, { x: 1220, y: R.GY + 30, s: 1.4, facing: -1, outfit: THEO, pose: POSES.stand, expr: 'surprised', look: [-1, 0], rim: RIM }); });
} });
// 4 — blink: Tokyo ramen
registerShot('look4', { draw(g, t) {
  layer(g, { x: 0, y: 60, z: 1.15 }, 1, (g) => { const R = ramenStall(g, t, C0); blink(g, 960, R.GY - 200, 0.35);
    person(g, { x: 960, y: R.GY + 40, s: 1.6, facing: 1, outfit: { ...HERO, wind: 0.5 }, pose: POSES.relaxed, expr: 'grin', look: [0.5, 0.2], rim: { color: '#ff9ad8', dir: [-0.8, -0.5] } }); });
} });
// 5 — the stadium: 40,000 thoughts
registerShot('look5', { draw(g, t) {
  blurLayer(g, 4, (g) => stadium(g, t, C0), null);
  ['I forgot the oven!', 'Is he cute?', 'GOAL GOAL GOAL', 'I hate this song', 'Did I lock the car?', 'Hot dogs...', 'Why is it so loud', 'She left me on read'].forEach((s, i) => say(g, s, 260 + (i % 4) * 470, 150 + Math.floor(i / 4) * 170 + (i % 2) * 40, 1, 0, null, null, { size: 30 }));
  bigFaceV2(g, 960, 820, 240, { outfit: HERO, expr: 'worried', look: [0, -0.6], rim: '#e8f0ff' });
} });
// 6 — NASA: the anomaly
registerShot('look6', { draw(g, t) { layer(g, { x: 0, y: 40, z: 1.05 }, 1, (g) => { nasaRoom(g, t, C0, { alert: true }); }); nameTag(g, 'ANOMALY', 1160, 380, 1, 0, { size: 40, fill: alpha('#d8343a', 0.9), color: '#ffffff' }); } });
// 7 — the old observatory with Grandma
registerShot('look7', { draw(g, t) {
  layer(g, { x: 0, y: 60, z: 1.1 }, 1, (g) => { const R = observatory(g, t, C0, { open: 1 });
    person(g, { x: 640, y: R.GY + 40, s: 1.5, facing: 1, outfit: GRANDMA, pose: POSES.point, expr: 'smile', look: [0.6, -1], rim: MOON });
    person(g, { x: 1320, y: R.GY + 40, s: 1.6, facing: -1, outfit: { ...HERO, wind: 0.2 }, pose: POSES.stand, expr: 'smile', look: [-0.6, -0.8], rim: MOON }); });
} });
// 8 — space: a GPS satellite over the Earth
registerShot('look8', { draw(g, t) { space(g, t, C0, {}); gpsSat(g, 1100, 380, 1.4, -0.15); nameTag(g, '+38 MILLIONTHS OF A SECOND A DAY', 960, 900, 1, 0, { size: 40 }); } });
