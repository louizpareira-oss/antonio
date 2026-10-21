// 03_fun.js — s028–s048: the fun part (birthday couch, cups, pigeon directions, the squirrel, crow gifts, the zoo, viral).
import { E, registerShot, layer, blurLayer, ease, prog, clamp, lerp, rr, seg, circle, poly, alpha, shade, glow, linGrad, text, FONTS, rng } from '/engine/core.js';
import { POSES, breathe, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { person, bigFaceV2, XP } from '../look.js';
import { YOU, MOM, THEO } from '../cast.js';
import { dog, dogLie, cat, catWalk, crow, crowFly, pigeon, squirrel, prairieDog, animalHead } from '../animals.js';
import { kitchen, livingRoom, gardenView, GY } from '../sets/house.js';
import { street, zoo, OGY, parkTree } from '../sets/outside.js';
import { say, speak, speech, nameTag, counter, phone, realCard, wt } from '../ui.js';
import { RIM, F, push, KIDS, cup, peanut, key, sandwich, confetti, talkOf } from '../common.js';
import { couch } from '/projects/stronger-couldnt-stop/scenes/sets/home.js';

const SANDMAN = { top: 'sweater', color: '#d84a3a', legs: '#3a3a48', shoes: '#3a3a44', hair: 'cap', capColor: '#3a3a48' };
const GIRL = { top: 'tshirt', color: '#8a5ad6', legs: '#2a3140', shoes: '#f6f2ea', hair: 'bun' };

// s028 — "And at first, it's the best thing that has ever happened to you."
registerShot('s028', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#ffe9b8', '#ffc880']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  glow(g, 960, 520, 800, '#ffffff', 0.45); confetti(g, t);
  bigFaceV2(g, 960, 600, 300 * (1 + 0.03 * t), { outfit: YOU, expr: 'grin', look: [0, -0.2] });
  ['BEST.', 'DAY.', 'EVER.'].forEach((w, i) => say(g, w, 360 + i * 600, 180 + (i % 2) * 80, t, 1.2 + i * 0.6, null, null, { size: 56, shout: true }));
} });

// s029 — "You ask Biscuit what he wants for his birthday."  party hat, cake with a 14
registerShot('s029', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1080, 760, 1.7), F(1100, 760, 1.85));
  layer(g, cam, 1, (g) => {
    livingRoom(g, t, { x: 0, y: 0, z: 1 }, { time: 'day' });
    person(g, { x: 900, y: GY() + 60, s: 1.35, facing: 1, outfit: YOU, pose: XP.kneelTalk, expr: 'smile', talk: 0.3 + 0.3 * Math.sin(t * 10), look: [1, 0.1], rim: RIM });
    dog(g, { x: 1260, y: GY() + 60, s: 1.35, facing: -1, t, wag: 1, rim: RIM });
    const [hx, hy] = animalHead('dog', { x: 1260, y: GY() + 60, s: 1.35, facing: -1 }); poly(g, [[hx - 22, hy - 30], [hx + 22, hy - 30], [hx, hy - 96]], '#ff6f61'); circle(g, hx, hy - 98, 10, '#ffd47e');   // party hat
    rr(g, 1060, GY() - 10, 120, 70, 10); g.fillStyle = '#f6e2c8'; g.fill(); g.fillStyle = '#ff9ab0'; g.fillRect(1060, GY() - 10, 120, 18); text(g, '14', 1120, GY() - 40, { size: 40, font: FONTS.ui, weight: 900, color: '#3a7ad0' }); glow(g, 1120, GY() - 80, 40, '#ffd28a', 0.6); circle(g, 1120, GY() - 72, 6, '#ffb040');
  });
  say(g, 'What do you want\nfor your birthday?', 640, 230, t, 0.3, 760, 420, { size: 34 });
} });

// s030 — "The couch. All of it. Forever."  Biscuit sprawled over the whole couch, crown on
registerShot('s030', { draw(g, t, info) {
  const cam = push(t, info.dur, F(820, 720, 1.5), F(820, 700, 1.65));
  layer(g, cam, 1, (g) => {
    livingRoom(g, t, { x: 0, y: 0, z: 1 }, { time: 'day' });
    const seat = couch(g, 820, GY() + 20, 1.0, { color: '#3d6aa8' });
    dogLie(g, { x: 820, y: seat + 30, s: 2.0, facing: 1, t, wag: 1, eyes: 'happy', talk: talkOf('BISCUIT', info), rim: RIM, shadow: false });
    poly(g, [[1000, seat - 140], [1010, seat - 190], [1030, seat - 160], [1050, seat - 200], [1070, seat - 160], [1090, seat - 190], [1100, seat - 140]], '#ffd23a');   // crown
  });
  speak(g, 'BISCUIT', info, t, 1350, 240, 1180, 420, { size: 56 });
  const k = ease.outBack(prog(t, wt('forever', info, t, 2.2) - 0.05, wt('forever', info, t, 2.2) + 0.3));
  if (k > 0) { g.save(); g.translate(560, 200); g.rotate(-0.08); g.scale(k, k); text(g, 'FOREVER.', 0, 0, { size: 110, font: FONTS.title, weight: 700, color: '#ffd23a', stroke: 14, strokeColor: '#3a2a4a' }); g.restore(); }
} });

// s031 — "You ask Pickles why she keeps pushing cups off the table."
registerShot('s031', { draw(g, t, info) {
  const cam = push(t, info.dur, F(820, 640, 1.9), F(860, 640, 2.0));
  layer(g, cam, 1, (g) => {
    kitchen(g, t, { x: 0, y: 0, z: 1 }, { tableX: 760, plates: false });
    cup(g, 880, GY() - 150, 1, 0, '#3fa06a');
    cat(g, { x: 760, y: GY() - 150, s: 1.6, facing: 1, rim: RIM });
    person(g, { x: 1180, y: GY() + 40, s: 1.4, facing: -1, outfit: YOU, pose: breathe(POSES.shrug, t, 1, 1), expr: 'neutral', talk: 0.3 + 0.2 * Math.sin(t * 9), look: [-1, 0.2], rim: RIM });
  });
  say(g, 'Why do you DO that?', 1260, 250, t, 0.8, 1130, 380, { size: 36 });
} });

// s032 — "To check if they still fall."  SLOW MOTION: the cup tips off; Pickles watches it fall
registerShot('s032', { draw(g, t, info) {
  const cam = push(t, info.dur, F(900, 640, 2.4), F(900, 700, 2.4));
  layer(g, cam, 1, (g) => {
    kitchen(g, t, { x: 0, y: 0, z: 1 }, { tableX: 760, plates: false });
    const k = prog(t, 0.4, info.dur), y = GY() - 150 + 420 * k * k, x = 990 + 40 * k, rot = k * 2.2;
    cup(g, x, y, 1, rot, '#3fa06a');
    cat(g, { x: 840, y: GY() - 150, s: 1.6, facing: 1, eyes: k > 0.1 ? 'wide' : 'lid', rim: RIM });
    for (let i = 1; i < 4; i++) { g.save(); g.globalAlpha *= 0.15 * (4 - i); cup(g, x, y - i * 26 * k, 1, rot - i * 0.12, '#3fa06a'); g.restore(); }
  });
  speak(g, 'PICKLES', info, t, 560, 250, 770, 420, { size: 56 });
  nameTag(g, 'SLOW MOTION', 1700, 90, 1, 0, { size: 30 });
} });

// s033 — "A pigeon gives you directions to school."
registerShot('s033', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1080, 640, 1.4), F(1100, 640, 1.5));
  layer(g, cam, 1, (g) => {
    const R = street(g, t, { x: 0, y: 0, z: 1 }, { benchX: 1200 });
    pigeon(g, { x: 1240, y: R.GY - 90, s: 2.6, facing: -1, rim: RIM });
    person(g, { x: 900, y: R.GY + 40, s: 1.4, facing: 1, outfit: YOU, pose: breathe(POSES.relaxed, t, 1, 2), expr: 'smile', look: [1, 0.3], rim: RIM });
    rr(g, 840, R.GY - 250, 60, 110, 14); g.fillStyle = '#f2c21a'; g.fill();                         // backpack
  });
} });

// s034–s036 — the pigeon's directions on a little map card over the street
function pigeonMap(g, t, info, step) {
  const cam = push(t, info.dur, F(960, 600, 1.0), F(980, 600, 1.05));
  layer(g, cam, 1, (g) => {
    const R = street(g, t, { x: 0, y: 0, z: 1 }, { bench: false, bakeryX: 120, treeX: 1500 });
    if (step >= 1) { person(g, { x: 1180, y: R.GY + 40, s: 1.3, facing: -1, outfit: SANDMAN, pose: walkPose(t * 6, {}), expr: 'smile', prop: null, rim: RIM }); sandwich(g, 1140, R.GY - 160, 0.9); }
    if (step === 2) for (let i = 0; i < 3; i++) pigeon(g, { x: 1320 + i * 90 + Math.sin(t * 6 + i) * 8, y: R.GY + 40, s: 1.6, facing: -1, rim: RIM });
    if (step === 0) { const k = ease.out(prog(t, 0.2, 0.7)); seg(g, [[1100, 820], [1100 - 500 * k, 820]], 22, '#ff6f61'); if (k > 0.9) poly(g, [[560, 820], [620, 780], [620, 860]], '#ff6f61'); text(g, 'LEFT', 860, 760, { size: 60, font: FONTS.ui, weight: 900, color: '#ff6f61', stroke: 8, strokeColor: '#ffffff' }); }
    if (step === 1) { const k = ease.out(prog(t, 0.2, 0.7)); seg(g, [[700, 860], [700 + 380 * k, 860]], 22, '#3fa06a'); if (k > 0.9) poly(g, [[1110, 860], [1050, 820], [1050, 900]], '#3fa06a'); text(g, 'RIGHT', 880, 800, { size: 60, font: FONTS.ui, weight: 900, color: '#3fa06a', stroke: 8, strokeColor: '#ffffff' }); }
  });
  pigeon(g, { x: 260, y: 1060, s: 4.2, facing: 1, rim: RIM, shadow: false });
  speak(g, 'PIGEON', info, t, 700, 180, 380, 860, { size: 46 });
}
registerShot('s034', { draw(g, t, info) { pigeonMap(g, t, info, 0); } });
registerShot('s035', { draw(g, t, info) { pigeonMap(g, t, info, 1); } });
registerShot('s036', { draw(g, t, info) { pigeonMap(g, t, info, 2); } });

// s037 — "A squirrel finds the house key you lost in May."
function garden(g, t, cam, o = {}) {
  layer(g, cam, 1, (g) => { const G = gardenView(g, -E.W * 0.5, -E.H * 0.3, E.W * 2, E.H * 1.3, t, { time: o.time || 'day' }); g.fillStyle = '#7ab04a'; g.fillRect(-E.W, G.gy, E.W * 3, E.H); for (const [x, r] of [[700, 150], [880, 120], [560, 110]]) circle(g, x, G.gy - 40, r, '#3f8a3f'); o.G = G; });
  return o.G;
}
registerShot('s037', { draw(g, t, info) {
  const cam = push(t, info.dur, F(780, 760, 1.5), F(780, 760, 1.6));
  const G = garden(g, t, cam);
  layer(g, cam, 1, (g) => { const k = ease.outBack(prog(t, 0.3, 0.8)); squirrel(g, { x: 800, y: G.gy + 10 - 0 * k, s: 3.2 * (0.3 + 0.7 * k), facing: -1, rim: RIM }); });
  nameTag(g, 'LOST SINCE MAY', 1500, 160, t, 1.2, { size: 40 });
} });
// s038 — "He wants a peanut."
registerShot('s038', { draw(g, t, info) {
  const cam = push(t, info.dur, F(820, 700, 2.4), F(820, 700, 2.55));
  const G = garden(g, t, cam);
  layer(g, cam, 1, (g) => squirrel(g, { x: 820, y: G.gy + 10, s: 3.2, facing: -1, rim: RIM }));
  say(g, 'One peanut.', 1300, 260, t, 0.2, 1060, 420, { size: 54 });
} });
// s039 — "Then he wants forty peanuts."  the pile grows
registerShot('s039', { draw(g, t, info) {
  const cam = push(t, info.dur, F(860, 700, 1.9), F(860, 700, 2.0));
  const G = garden(g, t, cam);
  const n = Math.floor(prog(t, 0.3, info.dur - 0.4) * 40);
  layer(g, cam, 1, (g) => { const r = rng(4); for (let i = 0; i < n; i++) peanut(g, 980 + (r() - 0.5) * 160 * (1 - i / 60), G.gy + 10 - i * 2.4 + r() * 6, 1.3, r() * 3); squirrel(g, { x: 800, y: G.gy + 10, s: 3.0, facing: 1, rim: RIM }); });
  counter(g, 1500, 400, n, { size: 170, color: '#ffd47e', label: 'PEANUTS' });
  say(g, 'FORTY.', 600, 240, t, 0.4, 760, 420, { size: 54, shout: true });
} });

// s040 — "You start leaving peanuts out for the crows, and the crows start leaving you presents."  the windowsill
function sill(g, t, info, gifts) {
  const cam = gifts ? push(t, info.dur, F(1000, 700, 1.5), F(1000, 700, 1.6)) : push(t, info.dur, F(960, 560, 1.0), F(960, 560, 1.06));
  layer(g, cam, 0.5, (g) => gardenView(g, -200, -100, E.W + 400, 900, t, { time: 'day' }));
  layer(g, cam, 1, (g) => {
    g.fillStyle = '#fbf6ec'; g.fillRect(-E.W, 760, E.W * 3, 60); g.fillStyle = '#e8dcc8'; g.fillRect(-E.W, 820, E.W * 3, 400);
    g.fillStyle = '#fbf6ec'; g.fillRect(-E.W, -E.H, E.W + 120, E.H * 3); g.fillRect(E.W - 120, -E.H, E.W * 2, E.H * 3);  // window frame sides
    o(g, t, gifts);
  });
  function o(g, t, gifts) {
    if (!gifts) { const k = ease.out(prog(t, 0.2, 0.8)); for (let i = 0; i < 6; i++) peanut(g, 700 + i * 70, 750, 1.6, i); person(g, { x: 380, y: 1260, s: 2.4, facing: 1, outfit: YOU, pose: POSES.reach, expr: 'smile', rim: RIM, shadow: false });
      const a = ease.out(prog(t, 1.4, 2.6)); if (a > 0) { crow(g, { x: lerp(1900, 1250, a), y: 755, s: 3.6, facing: -1, rim: RIM, shadow: false }); } const b = ease.out(prog(t, 2.4, 3.6)); if (b > 0) crow(g, { x: lerp(2100, 1520, b), y: 755, s: 3.3, facing: -1, rim: RIM, shadow: false }); }
    else { crow(g, { x: 1450, y: 755, s: 4.0, facing: -1, gift: false, rim: RIM, shadow: false }); const items = [['button', 'a'], ['bottle', 'b'], ['little', 'c']];
      items.forEach(([w], i) => { const at = wt(w, info, t, 0.4 + i * 1.2), k = ease.outBack(prog(t, at - 0.05, at + 0.3)); if (k <= 0) return; const x = 640 + i * 240; g.save(); g.translate(x, 740); g.scale(k, k);
        if (i === 0) { circle(g, 0, 0, 40, '#d84a3a'); for (const [dx, dy] of [[-10, -10], [10, -10], [-10, 10], [10, 10]]) circle(g, dx, dy, 6, '#8a2a20'); }
        if (i === 1) { circle(g, 0, 0, 40, '#c8ccd4'); for (let j = 0; j < 16; j++) { const a2 = j / 16 * Math.PI * 2; circle(g, Math.cos(a2) * 40, Math.sin(a2) * 40, 6, '#a8acb4'); } circle(g, 0, 0, 26, '#e8303a'); }
        if (i === 2) { poly(g, [[-36, 10], [-10, -36], [34, -20], [26, 26]], '#5ac8f0'); poly(g, [[-20, 0], [-4, -24], [12, -18]], alpha('#ffffff', 0.6)); FX.sparkle(g, 20, -30, 24); }
        g.restore(); }); }
  }
}
registerShot('s040', { draw(g, t, info) { sill(g, t, info, false); } });
// s041 — "A button. A bottle cap. A little piece of blue glass."
registerShot('s041', { draw(g, t, info) { sill(g, t, info, true); } });

// s042 — "That really happens. A girl in Seattle got crow presents for years."
registerShot('s042', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1150, 700, 1.4), F(1150, 700, 1.5));
  layer(g, cam, 1, (g) => {
    gardenView(g, -E.W * 0.3, -E.H * 0.2, E.W * 1.6, E.H * 1.2, t, { time: 'day' }); const gy = GY() + 40;
    g.fillStyle = '#7ab04a'; g.fillRect(-E.W, gy - 20, E.W * 3, E.H);
    person(g, { x: 1060, y: gy, s: 1.4, facing: 1, outfit: GIRL, pose: POSES.holdFront, expr: 'grin', look: [0.5, 0.5], rim: RIM });
    rr(g, 1110, gy - 210, 150, 70, 10); g.fillStyle = '#c8a070'; g.fill(); const r = rng(9);
    for (let i = 0; i < 9; i++) circle(g, 1125 + r() * 120, gy - 210 + r() * 14, 9, ['#5ac8f0', '#d84a3a', '#c8ccd4', '#f2c21a', '#ffffff'][i % 5]);
    crow(g, { x: 1430, y: gy, s: 2.4, facing: -1, gift: true, rim: RIM });
  });
  realCard(g, t, { x: 80, y: 80, w: 760, at: 0.2, title: 'Seattle, USA', lines: ['A girl fed the crows in her garden.', 'For years they brought her gifts:', 'buttons, beads, bits of glass.'] });
} });

// s043 — "On the school trip to the zoo, the prairie dogs see you coming."
registerShot('s043', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 600, 1.0), F(1000, 640, 1.15));
  layer(g, cam, 1, (g) => {
    const R = zoo(g, t, { x: 0, y: 0, z: 1 });
    [520, 900, 1280, 1620].forEach((x, i) => { const k = ease.outBack(prog(t, 1.5 + i * 0.3, 1.9 + i * 0.3)); if (k > 0) prairieDog(g, { x, y: R.GY - 4, s: 1.8 * k, facing: -1, rim: RIM, shadow: false }); });
    KIDS.slice(0, 4).forEach((of, i) => person(g, { x: 300 + i * 200, y: R.VIEW + 120, s: 1.4, facing: 1, outfit: of, pose: breathe(POSES.relaxed, t, 1, i), expr: 'smile', look: [0.5, -0.3], rim: RIM }));
    person(g, { x: 1180, y: R.VIEW + 120, s: 1.45, facing: 1, outfit: YOU, pose: breathe(POSES.relaxed, t, 1, 7), expr: 'smile', look: [0.5, -0.4], rim: RIM });
  });
} });
// s044 — "Tall one. Blue top. Walks funny."
registerShot('s044', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1000, 520, 1.8), F(1000, 520, 1.9));
  layer(g, cam, 1, (g) => { const R = zoo(g, t, { x: 0, y: 0, z: 1 }, { sign: false }); [700, 1000, 1300].forEach((x, i) => prairieDog(g, { x, y: R.GY - 4, s: 2.6, facing: i === 1 ? -1 : 1, rim: RIM, shadow: false })); });
  [['tall', 'Tall one.', 520], ['blue', 'Blue top.', 960], ['walks', 'Walks funny.', 1420]].forEach(([w, s2, x], i) => say(g, s2, x, 230 + (i % 2) * 70, t, wt(w, info, t, 0.2 + i * 0.6) - 0.05, x + (i - 1) * 40, 420, { size: 50 }));
} });

// s045 — "Theo films you talking to a pigeon."
registerShot('s045', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1000, 660, 1.5), F(1000, 660, 1.6));
  layer(g, cam, 1, (g) => {
    const R = street(g, t, { x: 0, y: 0, z: 1 }, { benchX: 900 });
    person(g, { x: 780, y: R.GY + 30, s: 1.35, facing: 1, outfit: YOU, pose: breathe(POSES.explain, t, 1, 3), expr: 'smile', talk: 0.3 + 0.3 * Math.sin(t * 10), look: [1, 0.3], rim: RIM });
    pigeon(g, { x: 980, y: R.GY - 80, s: 2.4, facing: -1, rim: RIM });
    person(g, { x: 1380, y: R.GY + 40, s: 1.4, facing: -1, outfit: THEO, pose: POSES.phone, expr: 'grin', look: [-1, 0], rim: RIM });
    rr(g, 1300, R.GY - 290, 30, 50, 6); g.fillStyle = '#1a1a22'; g.fill(); circle(g, 1300, R.GY - 280, 6, '#ff4040');
  });
  nameTag(g, '● REC', 1700, 100, 1, 0, { size: 36, color: '#ff6f61' });
} });

// s046 — "The video gets two million views."
registerShot('s046', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#ffe2b0', '#f8b878']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); glow(g, 960, 540, 700, '#ffffff', 0.35);
  const v = Math.round(2000000 * ease.out(prog(t, 0.2, info.dur - 0.3)));
  phone(g, 760, 560, 860, (g, x, y, w, h) => {
    g.fillStyle = '#7ab8e8'; g.fillRect(x, y, w, h * 0.55); street(g, t, { x: 0, y: 0, z: 1 }, {}); g.fillStyle = '#ffffff'; g.fillRect(x, y + h * 0.55, w, h);
    pigeon(g, { x: x + w * 0.65, y: y + h * 0.45, s: 1.6, facing: -1, rim: false }); person(g, { x: x + w * 0.35, y: y + h * 0.5, s: 0.9, facing: 1, outfit: YOU, pose: POSES.explain, expr: 'smile', rim: false });
    text(g, 'kid talks to pigeon ??', x + 24, y + h * 0.6, { size: 26, font: FONTS.ui, weight: 900, color: '#1a1a22', align: 'left' });
    text(g, v.toLocaleString('en-US') + ' views', x + 24, y + h * 0.66, { size: 24, font: FONTS.ui, weight: 800, color: '#6a6a7a', align: 'left' });
  });
  counter(g, 1420, 520, v.toLocaleString('en-US'), { size: 120, color: '#ffffff', label: 'VIEWS' });
} });

// s047 — "The comments are full of people asking what their cat really thinks of them."
registerShot('s047', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#e8f0f8', '#c8d8e8']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const C = ['what does my cat REALLY think of me?', 'ask my cat why she stares at the wall', 'does my cat love me?? pls', 'my cat bit me. why', 'ASK MY CAT IF SHE MISSES ME'];
  const off = t * 70;
  C.forEach((c, i) => { const y = 140 + i * 190 - off, k = ease.out(prog(t, i * 0.45, i * 0.45 + 0.3)); if (k <= 0) return; g.save(); g.globalAlpha *= k;
    rr(g, 200, y, 1520, 150, 26); g.fillStyle = '#ffffff'; g.fill(); circle(g, 290, y + 75, 46, ['#ff6f61', '#5fd39a', '#8fd0ff', '#ffd47e', '#c89af0'][i]);
    text(g, '@user' + (1000 + i * 37), 360, y + 46, { size: 30, font: FONTS.ui, weight: 900, color: '#6a6a7a', align: 'left' }); text(g, c, 360, y + 102, { size: 46, font: FONTS.ui, weight: 800, color: '#1a1a22', align: 'left' }); g.restore(); });
} });

// s048 — "You know. You're not telling them."  Pickles glares; you zip your lips
registerShot('s048', { draw(g, t, info) {
  g.save(); g.beginPath(); g.rect(0, 0, E.W / 2, E.H); g.clip();
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#f2ece2', '#4a7ac0']); g.fillRect(0, 0, E.W, E.H);
  cat(g, { x: 560, y: 1260, s: 7, facing: -1, rim: { ...RIM, w: 8 }, shadow: false });
  g.restore();
  g.save(); g.beginPath(); g.rect(E.W / 2, 0, E.W / 2, E.H); g.clip();
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#ffe2b0', '#f2b880']); g.fillRect(E.W / 2, 0, E.W / 2, E.H);
  bigFaceV2(g, E.W * 0.75, 600, 270, { outfit: YOU, expr: 'neutral', look: [-0.6, 0] });
  const k = ease.inOut(prog(t, wt('not', info, t, 1.4) - 0.2, wt('not', info, t, 1.4) + 0.4));
  if (k > 0) { seg(g, [[E.W * 0.75 - 90, 720], [E.W * 0.75 - 90 + 180 * k, 720]], 10, '#ffd23a'); for (let i = 0; i < 8 * k; i++) seg(g, [[E.W * 0.75 - 84 + i * 22, 708], [E.W * 0.75 - 84 + i * 22, 732]], 4, '#ffd23a'); }
  g.restore(); seg(g, [[E.W / 2, 0], [E.W / 2, E.H]], 10, '#ffffff');
} });
