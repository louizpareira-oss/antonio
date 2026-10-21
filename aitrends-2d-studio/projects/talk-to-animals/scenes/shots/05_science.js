// 05_science.js — s086–s108: "Is any of this real?" Prairie dogs, vervet monkeys, bees, elephant names, dog years,
// Project CETI and the whales. Blueprint look, with the colour animals on top.
import { E, registerShot, layer, ease, prog, clamp, lerp, rr, seg, circle, poly, alpha, shade, glow, linGrad, text, FONTS, rng } from '/engine/core.js';
import { POSES, breathe } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { person, bigFaceV2 } from '../look.js';
import { YOU } from '../cast.js';
import { dog, dogLie, cat, crow, pigeon, squirrel, prairieDog, monkey, bee, elephant, spermWhale, bird, iconEagle, iconSnake, iconLeopard } from '../animals.js';
import { livingRoom, GY } from '../sets/house.js';
import { savanna, desert, ocean, OGY } from '../sets/outside.js';
import { say, nameTag, counter, realCard, myth, wave, bp, wt, GOLDC, CORALC, MINT, SKYC } from '../ui.js';
import { RIM, F, push, SCI } from '../common.js';

const BPC = '#cfe0ff';
const head = (g, str, y = 110) => text(g, str, E.W / 2, y, { size: 58, font: FONTS.ui, weight: 900, color: '#ffffff', spacing: 4 });

// s086 — "So... could animals really talk?"  IS ANY OF THIS REAL?
registerShot('s086', { draw(g, t, info) {
  bp(g);
  const k = ease.outBack(prog(t, 0.3, 0.8)); g.save(); g.translate(960, 480); g.scale(k, k);
  text(g, 'IS ANY OF THIS', 0, -60, { size: 90, font: FONTS.title, weight: 700, color: '#ffffff' }); text(g, 'REAL?', 0, 60, { size: 150, font: FONTS.title, weight: 700, color: GOLDC, glow: 30, glowColor: alpha(GOLDC, 0.6) });
  g.restore();
  [['dog', 300], ['cat', 620], ['crow', 1300], ['prairie', 1620]].forEach(([k2, x], i) => { const a = ease.out(prog(t, 1.0 + i * 0.2, 1.4 + i * 0.2)); if (a <= 0) return; g.save(); g.globalAlpha *= a;
    const o = { x, y: 940, facing: x > 960 ? -1 : 1, rim: false, shadow: false, t }; if (k2 === 'dog') dog(g, { ...o, s: 1.0 }); if (k2 === 'cat') cat(g, { ...o, s: 1.3 }); if (k2 === 'crow') crow(g, { ...o, s: 2.4 }); if (k2 === 'prairie') prairieDog(g, { ...o, s: 2 }); g.restore(); });
} });
// s087 — "In a way, they already do."  animals with sound waves
registerShot('s087', { draw(g, t, info) {
  bp(g);
  [['prairie', 380], ['monkey', 960], ['bird', 1540]].forEach(([k2, x], i) => {
    const o = { x, y: 760, facing: 1, rim: false, shadow: false, t };
    if (k2 === 'prairie') prairieDog(g, { ...o, s: 3 }); if (k2 === 'monkey') monkey(g, { ...o, s: 3 }); if (k2 === 'bird') bird(g, { ...o, s: 6, open: 0.5 + 0.5 * Math.sin(t * 9) });
    wave(g, x - 180, 360, 360, 50, t + i, { color: [GOLDC, MINT, SKYC][i], freq: 30 + i * 10, seed: i });
  });
} });
// s088 — "Remember the prairie dogs? That's real."
registerShot('s088', { draw(g, t, info) {
  bp(g); prairieDog(g, { x: 960, y: 900, s: 6.5, facing: 1, rim: false, shadow: false });
  const k = ease.outBack(prog(t, wt('real', info, t, 2.6) - 0.05, wt('real', info, t, 2.6) + 0.3)); if (k > 0) { g.save(); g.translate(1420, 300); g.rotate(-0.12); g.scale(k, k); rr(g, -170, -70, 340, 140, 20); g.strokeStyle = MINT; g.lineWidth = 10; g.stroke(); text(g, 'REAL', 0, 4, { size: 90, font: FONTS.ui, weight: 900, color: MINT }); g.restore(); }
} });
// s089 — "A biologist in Arizona spent years recording their alarm calls."
registerShot('s089', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 640, 1.2), F(1000, 660, 1.3));
  layer(g, cam, 1, (g) => {
    const R = desert(g, t, { x: 0, y: 0, z: 1 });
    person(g, { x: 760, y: R.GY + 20, s: 1.4, facing: 1, outfit: { ...SCI, color: '#c8a070', hair: 'cap', capColor: '#8a6a40' }, pose: POSES.point, expr: 'smile', look: [1, 0.3], rim: RIM });
    seg(g, [[850, R.GY - 220], [990, R.GY - 260]], 6, '#3a3a44'); rr(g, 985, R.GY - 280, 40, 40, 10); g.fillStyle = '#5a5a66'; g.fill();
    [1180, 1400].forEach((x, i) => { g.fillStyle = '#c89a60'; g.beginPath(); g.ellipse(x, R.GY + 20, 90, 34, 0, Math.PI, Math.PI * 2); g.fill(); prairieDog(g, { x, y: R.GY + 10, s: 1.8, facing: -1, rim: RIM, shadow: false }); });
    wave(g, 1040, R.GY - 380, 360, 40, t, { color: '#ff6f61', freq: 50 });
  });
  realCard(g, t, { x: 80, y: 60, w: 840, at: 0.3, title: 'Arizona, USA', lines: ['A biologist recorded prairie dog', 'alarm calls for years.'] });
} });
// s090 — "They don't just shout "danger"."
registerShot('s090', { draw(g, t, info) {
  bp(g); prairieDog(g, { x: 420, y: 880, s: 4.5, facing: 1, rim: false, shadow: false });
  wave(g, 700, 500, 900, 80, t, { color: GOLDC, freq: 40 }); myth(g, '"DANGER!"', 1150, 760, t, 0.9, { size: 96 });
} });
// s091 — "They describe what's coming: a person, how tall, even the colour of their shirt."
registerShot('s091', { draw(g, t, info) {
  bp(g); const zk = 1 + 0.04 * ease.inOut(prog(t, 0, info.dur)); g.save(); g.translate(960, 540); g.scale(zk, zk); g.translate(-960, -540);
  prairieDog(g, { x: 250, y: 1000, s: 5.2, facing: 1, rim: false, shadow: false });
  const P = [['person', 2.9, '#2E72D2', 'TALL · BLUE SHIRT', 0, 1], ['tall', 2.0, '#f2c21a', 'SHORT · YELLOW SHIRT', 1, 3], ['colour', 2.6, '#d84a3a', 'RED SHIRT', 2, 4.5]];
  P.forEach(([w, s, c, lab, i, fb]) => { const at = wt(w, info, t, fb), k = ease.out(prog(t, at - 0.1, at + 0.3)); if (!(k > 0)) return; const x = 760 + i * 450;
    g.save(); g.globalAlpha *= k; person(g, { x, y: 960, s, facing: -1, outfit: { top: 'tshirt', color: c, legs: '#2a3140', shoes: '#f6f2ea', hair: 'none' }, pose: POSES.stand, expr: 'neutral', look: [-1, 0], rim: false, shadow: false });
    wave(g, x - 150, 120, 300, 30 + i * 8, t + i, { color: c === '#f2c21a' ? GOLDC : c === '#d84a3a' ? CORALC : SKYC, freq: 24 + i * 16, seed: i * 2, lw: 7 });
    nameTag(g, lab, x, 1010, t, at, { size: 34 }); g.restore(); });
  g.restore();
} });
// s092 — "Vervet monkeys have different alarms for a leopard, an eagle and a snake."
registerShot('s092', { draw(g, t, info) {
  bp(g);
  monkey(g, { x: 340, y: 1000, s: 5.0, facing: 1, rim: false, shadow: false });
  [['leopard', iconLeopard, 820], ['eagle', iconEagle, 1240], ['snake', iconSnake, 1660]].forEach(([w, ic, x], i) => { const at = wt(w, info, t, 3 + i), k = ease.outBack(prog(t, at - 0.1, at + 0.25)); if (!(k > 0)) return;
    const c = [CORALC, GOLDC, MINT][i];
    g.save(); g.translate(x, 400); g.scale(k, k); circle(g, 0, 0, 170, alpha(c, 0.22)); g.lineWidth = 8; g.strokeStyle = c; g.beginPath(); g.arc(0, 0, 170, 0, Math.PI * 2); g.stroke(); ic(g, 0, 0, 2.3, '#ffffff'); g.restore();
    g.save(); g.globalAlpha *= clamp(k); wave(g, x - 160, 690, 320, 46, t + i, { color: c, freq: 18 + i * 22, seed: i * 3, lw: 7 }); g.restore();
    nameTag(g, w.toUpperCase() + ' ALARM', x, 820, t, at, { size: 36 }); });
} });
// s093 / s094 — "Hear "eagle", and they look up." / "Hear "snake", and they look down."
function monkeys(g, t, up) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#8ac8f0', '#d8eef8']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  g.strokeStyle = '#6a4a30'; g.lineWidth = 40; g.lineCap = 'round'; g.beginPath(); g.moveTo(-100, 740); g.lineTo(2100, 700); g.stroke();
  for (const [x, y, r] of [[200, 400, 220], [1700, 380, 260]]) circle(g, x, y, r, '#5a9a4a');
  [560, 960, 1360].forEach((x, i) => monkey(g, { x, y: 728, s: 3.2, facing: i === 1 ? -1 : 1, look: t > 0.4 ? (up ? 'up' : 'down') : 'front', rim: RIM, shadow: false }));
  if (up) { const k = ease.out(prog(t, 0, 0.8)); g.save(); g.translate(lerp(2100, 1300, k), 160); g.fillStyle = '#4a3a2a'; g.beginPath(); g.moveTo(-160, 0); g.quadraticCurveTo(-60, -50, 0, 10); g.quadraticCurveTo(60, -50, 160, 0); g.quadraticCurveTo(60, 20, 0, 40); g.quadraticCurveTo(-60, 20, -160, 0); g.fill(); circle(g, 0, 10, 22, '#f6f2ea'); poly(g, [[-10, 24], [10, 24], [0, 40]], '#f2c21a'); g.restore(); }
  else { g.strokeStyle = '#4a7a3a'; g.lineWidth = 26; g.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30, x = 700 + u * 520, y = 980 + Math.sin(u * 9 + t * 4) * 26; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); circle(g, 1230, 980 + Math.sin(9 + t * 4) * 26, 26, '#4a7a3a'); g.fillStyle = '#7ab04a'; g.fillRect(-E.W, 1040, E.W * 3, 200); }
}
registerShot('s093', { draw(g, t, info) { monkeys(g, t, true); say(g, '"EAGLE!"', 360, 200, t, 0, 520, 560, { size: 56, shout: true }); } });
registerShot('s094', { draw(g, t, info) { monkeys(g, t, false); say(g, '"SNAKE!"', 360, 200, t, 0, 520, 560, { size: 56, shout: true }); } });

// s095 — "Honeybees dance to tell each other which way the flowers are, and how far."
registerShot('s095', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#f8d070', '#e8a830']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  for (let r = 0; r < 12; r++) for (let c = 0; c < 22; c++) { const x = c * 96 + (r % 2) * 48 - 40, y = r * 84; g.strokeStyle = alpha('#b87818', 0.5); g.lineWidth = 5; g.beginPath(); for (let k = 0; k < 6; k++) { const a = k / 6 * Math.PI * 2 + Math.PI / 6; g.lineTo(x + Math.cos(a) * 52, y + Math.sin(a) * 52); } g.closePath(); g.stroke(); }
  const ph = (t * 0.7) % 1, ang = -0.6, cx = 760, cy = 560, L = 260;
  let bx, by; if (ph < 0.5) { const u = ph / 0.5; bx = cx + Math.cos(ang) * (u - 0.5) * L; by = cy + Math.sin(ang) * (u - 0.5) * L + Math.sin(u * 60) * 10; } else { const u = (ph - 0.5) / 0.5, a2 = Math.PI * u; bx = cx + Math.cos(ang) * Math.cos(a2) * L * 0.5 + Math.sin(ang) * Math.sin(a2) * 140 * (Math.floor(t * 0.7) % 2 ? 1 : -1); by = cy + Math.sin(ang) * Math.cos(a2) * L * 0.5 - Math.cos(ang) * Math.sin(a2) * 140 * (Math.floor(t * 0.7) % 2 ? 1 : -1); }
  g.strokeStyle = alpha('#ffffff', 0.7); g.lineWidth = 6; g.setLineDash([14, 12]); g.beginPath(); g.ellipse(cx, cy, L * 0.5, 140, ang, 0, Math.PI * 2); g.stroke(); g.setLineDash([]);
  bee(g, bx, by, 3, t, ang + (ph < 0.5 ? 0 : Math.PI));
  [[420, 300], [1000, 760], [560, 820]].forEach(([x, y], i) => bee(g, x, y, 2.2, t + i, i));
  FX.sun(g, 1500, 200, 60, '#fffbe8', '#fff2c0', 3); seg(g, [[cx, cy], [cx + Math.cos(ang) * 600, cy + Math.sin(ang) * 600]], 6, alpha('#ffffff', 0.8));
  for (let i = 0; i < 5; i++) { const x = 1420 + i * 90, y = 900; seg(g, [[x, y + 100], [x, y]], 6, '#3a8a3a'); for (let k = 0; k < 6; k++) circle(g, x + Math.cos(k) * 22, y + Math.sin(k) * 22, 16, ['#ff6f61', '#c89af0', '#ffffff'][i % 3]); circle(g, x, y, 12, '#f2c21a'); }
  text(g, 'WHICH WAY  +  HOW FAR', 960, 1010, { size: 48, font: FONTS.ui, weight: 900, color: '#ffffff', stroke: 8, strokeColor: alpha('#6a4a10', 0.6) });
} });
// s096 — "That dance won a Nobel Prize in nineteen seventy-three."
registerShot('s096', { draw(g, t, info) {
  bp(g); const k = ease.outBack(prog(t, 0.2, 0.7));
  g.save(); g.translate(960, 500); g.scale(k, k); g.rotate(Math.sin(t) * 0.04);
  seg(g, [[-120, -400], [0, -200]], 30, '#3a6ad0'); seg(g, [[120, -400], [0, -200]], 30, '#d84a3a');
  circle(g, 0, 0, 230, '#c8901a'); circle(g, 0, 0, 205, '#f2c24a'); circle(g, -60, -60, 70, alpha('#ffffff', 0.25));
  text(g, 'NOBEL', 0, -40, { size: 64, font: FONTS.ui, weight: 900, color: '#8a5a10' }); text(g, '1973', 0, 50, { size: 90, font: FONTS.ui, weight: 900, color: '#8a5a10' });
  g.restore(); bee(g, 1400, 300, 4, t, -0.3);
  text(g, 'Karl von Frisch: the bee dance', 960, 960, { size: 42, font: FONTS.ui, weight: 800, color: '#ffffff', alpha: ease.out(prog(t, 0.8, 1.2)) });
} });

// s097 — "And in twenty twenty-four, scientists in Kenya found that wild elephants have names too."
registerShot('s097', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 600, 1.1), F(1000, 640, 1.2));
  layer(g, cam, 1, (g) => { const R = savanna(g, t, { x: 0, y: 0, z: 1 }); elephant(g, { x: 700, y: R.GY + 20, s: 1.6, facing: 1, rim: RIM }); elephant(g, { x: 1350, y: R.GY + 40, s: 1.2, facing: -1, color: '#a8a29c', rim: RIM }); });
  realCard(g, t, { x: 80, y: 60, w: 860, at: 0.3, title: 'Kenya, 2024', lines: ['Wild elephants call each other', 'by name.'] });
} });
// s098 — "Play an elephant a call meant for her, and she calls back."
registerShot('s098', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1000, 640, 1.35), F(1000, 640, 1.42));
  layer(g, cam, 1, (g) => { const R = savanna(g, t, { x: 0, y: 0, z: 1 }); const k = t > 1.6; elephant(g, { x: 1000, y: R.GY + 20, s: 1.6, facing: -1, trunk: k ? 'up' : 'down', ears: k ? 1 : 0, rim: RIM });
    rr(g, 360, R.GY - 300, 160, 120, 14); g.fillStyle = '#3a3a44'; g.fill(); circle(g, 440, R.GY - 240, 40, '#5a5a66'); circle(g, 440, R.GY - 240, 20, '#2a2a34'); });
  say(g, '"HER NAME"', 480, 260, t, 0.3, 470, 440, { size: 46 });
  if (t > 1.6) { say(g, 'BRRRAAA!', 1300, 200, t, 1.6, 1160, 380, { size: 56, shout: true }); nameTag(g, 'SHE ANSWERS', 960, 1000, t, 1.8, { size: 44, fill: alpha('#1e6a3a', 0.9) }); }
} });
// s099 — "Meant for someone else? She mostly ignores it."
registerShot('s099', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1000, 640, 1.35), F(1000, 640, 1.42));
  layer(g, cam, 1, (g) => { const R = savanna(g, t, { x: 0, y: 0, z: 1 }); elephant(g, { x: 1000, y: R.GY + 20, s: 1.6, facing: -1, trunk: 'down', rim: RIM });
    rr(g, 360, R.GY - 300, 160, 120, 14); g.fillStyle = '#3a3a44'; g.fill(); circle(g, 440, R.GY - 240, 40, '#5a5a66'); circle(g, 440, R.GY - 240, 20, '#2a2a34'); });
  say(g, '"SOMEONE ELSE"', 520, 260, t, 0.2, 470, 440, { size: 46 }); say(g, '…munch', 1350, 300, t, 1.5, 1180, 460, { size: 40 });
  nameTag(g, 'IGNORED', 960, 1000, t, 2.0, { size: 44, fill: alpha('#6a2a2a', 0.9) });
} });

// s100 — "And here's one the internet gets wrong: one dog year isn't seven human years."
registerShot('s100', { draw(g, t, info) {
  bp(g); dog(g, { x: 320, y: 960, s: 2.0, facing: 1, rim: false, shadow: false });
  myth(g, '1 DOG YEAR = 7 HUMAN YEARS', 1080, 520, t, wt('isn\'t', info, t, 3.5), { size: 74 });
} });
// s101 — "A twenty twenty study of Labradors' DNA worked out that a fourteen-year-old dog is about seventy-three."
registerShot('s101', { draw(g, t, info) {
  bp(g);
  // DNA helix (left)
  for (let i = 0; i < 26; i++) { const y = 140 + i * 32, a = i * 0.5 + t * 1.5, x1 = 300 + Math.sin(a) * 110, x2 = 300 - Math.sin(a) * 110; seg(g, [[x1, y], [x2, y]], 4, alpha('#ffffff', 0.35)); circle(g, x1, y, 10, SKYC); circle(g, x2, y, 10, GOLDC); }
  // chart: dog age (x) vs human age (y), curve 16 ln(age) + 31
  const X0 = 700, Y0 = 900, W = 1000, H = 640, k = ease.inOut(prog(t, 0.6, 3.5));
  seg(g, [[X0, Y0], [X0 + W, Y0]], 4, BPC); seg(g, [[X0, Y0], [X0, Y0 - H]], 4, BPC);
  text(g, 'DOG AGE', X0 + W / 2, Y0 + 60, { size: 32, font: FONTS.ui, weight: 900, color: BPC }); text(g, 'HUMAN AGE', X0 - 40, Y0 - H - 30, { size: 32, font: FONTS.ui, weight: 900, color: BPC, align: 'left' });
  g.strokeStyle = GOLDC; g.lineWidth = 8; g.beginPath(); for (let i = 1; i <= 100 * k; i++) { const a = i / 100 * 16, h = 16 * Math.log(a) + 31, x = X0 + a / 16 * W, y = Y0 - Math.max(0, h) / 90 * H; i > 1 ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke();
  const p = ease.outBack(prog(t, wt('seventy-three', info, t, 6) - 0.3, wt('seventy-three', info, t, 6))); if (p > 0) { const x = X0 + 14 / 16 * W, y = Y0 - (16 * Math.log(14) + 31) / 90 * H; circle(g, x, y, 18 * p, CORALC); seg(g, [[x, Y0], [x, y]], 3, alpha(CORALC, 0.7)); seg(g, [[X0, y], [x, y]], 3, alpha(CORALC, 0.7)); text(g, '14', x, Y0 + 30, { size: 34, font: FONTS.ui, weight: 900, color: CORALC }); text(g, '73', X0 - 40, y, { size: 44, font: FONTS.ui, weight: 900, color: CORALC }); }
  text(g, 'LABRADOR DNA · 2020', X0 + W / 2, 130, { size: 44, font: FONTS.ui, weight: 900, color: '#ffffff' });
} });
// s102 — "Biscuit is seventy-three."
registerShot('s102', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1300, 760, 2.2), F(1300, 760, 2.35));
  layer(g, cam, 1, (g) => { livingRoom(g, t, { x: 0, y: 0, z: 1 }, { time: 'golden' }); dogLie(g, { x: 1300, y: GY() + 70, s: 1.4, facing: -1, t, eyes: 'tired', rim: RIM }); });
  nameTag(g, 'BISCUIT · 73', 960, 200, t, 0.3, { size: 64 });
} });

// s103 — "Right now, a team called Project CETI is using AI to decode the clicks of sperm whales."
registerShot('s103', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 540, 1.0), F(1020, 540, 1.1));
  layer(g, cam, 1, (g) => { ocean(g, t, { x: 0, y: 0, z: 1 }); spermWhale(g, 900 + t * 20, 560, 2.6, { t });
    for (let i = 0; i < 10; i++) { const x = ((t * 400 + i * 160) % 1600) + 1300, k = 1 - (x - 1300) / 1600; circle(g, x - 600, 540 + Math.sin(i) * 8, 12 * k + 4, alpha('#ffffff', 0.8 * k)); } });
  nameTag(g, 'PROJECT CETI', 960, 140, t, 0.8, { size: 60 });
  const k = ease.out(prog(t, 3.5, 4.2)); if (k > 0) { g.save(); g.globalAlpha *= k; rr(g, 1300, 700, 520, 300, 18); g.fillStyle = alpha('#0b1324', 0.85); g.fill(); text(g, 'AI', 1560, 760, { size: 40, font: FONTS.ui, weight: 900, color: MINT }); for (let r2 = 0; r2 < 4; r2++) for (let c = 0; c < 10; c++) circle(g, 1350 + c * 44, 820 + r2 * 40, (r2 * c + c) % 3 ? 8 : 12, ((r2 + c) % 4) ? alpha(SKYC, 0.8) : GOLDC); g.restore(); }
} });
// s104 — "They've already found patterns in them, like an alphabet."
registerShot('s104', { draw(g, t, info) {
  bp(g); text(g, 'SPERM WHALE CLICKS', 960, 120, { size: 52, font: FONTS.ui, weight: 900, color: '#ffffff' });
  const L = 'ABCDEFGHIJKL'.split('');
  L.forEach((ch, i) => { const k = ease.outBack(prog(t, 0.2 + i * 0.15, 0.5 + i * 0.15)); if (k <= 0) return; const x = 260 + (i % 4) * 470, y = 300 + Math.floor(i / 4) * 230, r = rng(i + 3);
    g.save(); g.translate(x, y); g.scale(k, k); rr(g, -200, -80, 400, 160, 20); g.fillStyle = alpha('#ffffff', 0.08); g.fill(); text(g, ch, -150, 0, { size: 60, font: FONTS.ui, weight: 900, color: GOLDC });
    let cx = -90; for (let j = 0; j < 3 + (i % 4); j++) { circle(g, cx, 0, 12, SKYC); cx += 22 + r() * 40; } g.restore(); });
} });
// s105 / s106 — "None of these animals talk the way we do." / "But every one of them is saying something."
function lineup(g, t, bubbles) {
  bp(g); const y = 820, items = [['dog', 260], ['cat', 520], ['crow', 760], ['prairie', 980], ['monkey', 1200], ['elephant', 1560]];
  items.forEach(([k2, x], i) => { const o = { x, y, facing: 1, rim: false, shadow: false, t };
    if (k2 === 'dog') dog(g, { ...o, s: 1.3 }); if (k2 === 'cat') cat(g, { ...o, s: 1.6 }); if (k2 === 'crow') crow(g, { ...o, s: 3 }); if (k2 === 'prairie') prairieDog(g, { ...o, s: 2.6 }); if (k2 === 'monkey') monkey(g, { ...o, s: 2.4 }); if (k2 === 'elephant') elephant(g, { ...o, s: 0.95 });
    if (bubbles) say(g, ['woof', 'mrrp', 'caw', 'chk-chk', 'hoo!', 'BRAA'][i], x, 330 + (i % 2) * 60, t, 0.2 + i * 0.3, x, 600, { size: 36 }); });
}
registerShot('s105', { draw(g, t, info) { lineup(g, t, false); } });
registerShot('s106', { draw(g, t, info) { lineup(g, t, true); } });
// s107 — "We just never learned how to listen."
registerShot('s107', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#ffe9c8', '#f8c890']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  bigFaceV2(g, 960, 620, 290, { outfit: YOU, expr: 'neutral', look: [-0.6, 0], blink: t > 1.4 && t < 1.6 });
  for (let k = 0; k < 4; k++) { const r = ((t * 140 + k * 120) % 480); g.strokeStyle = alpha('#ffffff', 0.7 * (1 - r / 480)); g.lineWidth = 7; g.beginPath(); g.arc(560, 560, 80 + r, Math.PI * 0.75, Math.PI * 1.25); g.stroke(); }
} });
// s108 — "Remember the whales. You're going to hear them again."
registerShot('s108', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 540, 1.0), F(960, 540, 1.15));
  layer(g, cam, 1, (g) => { ocean(g, t, { x: 0, y: 0, z: 1 }); glow(g, 960, 560, 700, '#bfe8ff', 0.25 + 0.15 * Math.sin(t * 2)); spermWhale(g, 1060, 560, 3.2, { t }); spermWhale(g, 760, 700, 1.4, { t, calf: true }); });
} });
