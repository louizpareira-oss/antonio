// 02_family.js — s018–s027: who Biscuit is (the gas station puppy, every day of your life), and today he talks back.
import { E, registerShot, layer, blurLayer, ease, prog, clamp, lerp, rr, seg, circle, poly, alpha, shade, glow, linGrad, text, FONTS } from '/engine/core.js';
import { POSES, breathe } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { person, bigFaceV2, XP } from '../look.js';
import { YOU, MOM } from '../cast.js';
import { dog, dogLie, dogStand, animalHead } from '../animals.js';
import { kitchen, livingRoom, bedroom, gardenView, GY } from '../sets/house.js';
import { gasStation, rainFX } from '../sets/outside.js';
import { say, speak, nameTag, wt } from '../ui.js';
import { RIM, NIGHT_RIM, F, push, KID, DAD, babyBundle, talkOf } from '../common.js';

// s018 — "Biscuit is fourteen."  his sunny spot; name tag
registerShot('s018', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1250, 700, 1.5), F(1300, 720, 1.6));
  layer(g, cam, 1, (g) => { livingRoom(g, t, { x: 0, y: 0, z: 1 }, { time: 'day', whale: true }); dogLie(g, { x: 1300, y: GY() + 70, s: 1.4, facing: -1, t, eyes: 'happy', wag: 0.4, rim: RIM }); });
  nameTag(g, 'BISCUIT · 14', 960, 220, t, wt('fourteen', info, t, 0.8) - 0.1, { size: 56 });
} });

// s019 — "He's a year older than you."  the height marks on the door frame
registerShot('s019', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 560, 1.0), F(960, 540, 1.06));
  g.fillStyle = '#f0e2c8'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  layer(g, cam, 1, (g) => {
    rr(g, 760, -100, 400, 1400, 0); g.fillStyle = '#fbf6ec'; g.fill(); g.fillStyle = '#e8dcc8'; g.fillRect(800, -100, 320, 1400);
    const marks = [['YOU · 1', 820], ['YOU · 5', 610], ['YOU · 9', 440], ['YOU · 13', 300]];
    marks.forEach(([s, y], i) => { const k = ease.out(prog(t, 0.2 + i * 0.25, 0.5 + i * 0.25)); if (k <= 0) return; seg(g, [[790, y], [790 + 330 * k, y]], 6, '#2E72D2'); text(g, s, 1180, y, { size: 32, font: FONTS.ui, weight: 900, color: '#2E72D2', align: 'left', alpha: k }); });
    const k2 = ease.out(prog(t, 1.2, 1.6)); if (k2 > 0) { seg(g, [[790, 760], [790 + 330 * k2, 760]], 6, '#D64A33'); text(g, 'BISCUIT · 14 (shoulder)', 740, 760, { size: 32, font: FONTS.ui, weight: 900, color: '#D64A33', align: 'right', alpha: k2 }); }
    dog(g, { x: 540, y: 1000, s: 1.5, facing: 1, t, wag: 1, rim: RIM });
  });
} });

// s020 — "Mom found him at a gas station in the rain, the winter before you were born."
registerShot('s020', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1000, 760, 1.25), F(1020, 800, 1.6));
  layer(g, cam, 1, (g) => {
    const { GY: gy } = gasStation(g, t, { x: 0, y: 0, z: 1 });
    const k = ease.inOut(prog(t, 0.4, 2.0));
    person(g, { x: lerp(1500, 1120, k), y: gy + 40, s: 1.3, facing: -1, outfit: { ...MOM, color: '#3FA06A' }, pose: k < 1 ? POSES.relaxed : breathe(POSES.crouch, t, 1, 2), expr: 'worried', look: [-0.6, 0.6], rim: { color: '#fff2d0', dir: [0.2, -1] } });
    dogStand(g, { x: 900, y: gy + 40, s: 0.62, facing: 1, t, young: true, pal: { base: '#b8955a', light: '#c8a870', dark: '#8a6a40' }, rim: { color: '#fff2d0', dir: [0.2, -1] }, collar: false });
    for (let i = 0; i < 6; i++) { const y = (t * 300 + i * 40) % 80; circle(g, 880 + i * 10, gy - 40 + y, 3, alpha('#cfe0ff', 0.7)); }   // drips
  });
  rainFX(g, t);
  nameTag(g, '14 YEARS AGO', 300, 120, 1, 0, { size: 44 });
} });

// s021 — "A wet, angry puppy who bit her sleeve and wouldn't let go."  CLOSE: puppy hanging off Mom's green sleeve
registerShot('s021', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 540, 1.0), F(960, 540, 1.06));
  blurLayer(g, 6, (g) => gasStation(g, t, { x: 0, y: 0, z: 1 }));
  layer(g, cam, 1, (g) => {
    seg(g, [[-100, 420], [900, 470]], 120, '#3FA06A'); seg(g, [[-100, 400], [900, 450]], 30, alpha('#ffffff', 0.12)); circle(g, 960, 478, 60, '#16121a');    // the arm
    const sw = Math.sin(t * 5) * 0.18;
    g.save(); g.translate(760, 520); g.rotate(-0.5 + sw); dogStand(g, { x: -40, y: 380, s: 1.6, facing: 1, t, young: true, run: false, walk: 1, pal: { base: '#b8955a', light: '#c8a870', dark: '#8a6a40' }, collar: false, shadow: false, rim: false }); g.restore();
  });
  rainFX(g, t);
  const k = ease.outBack(prog(t, wt('wouldn\'t', info, t, 3) - 0.1, wt('wouldn\'t', info, t, 3) + 0.3));
  if (k > 0) { g.save(); g.translate(1500, 300); g.scale(k, k); bigFaceV2(g, 0, 0, 170, { outfit: MOM, expr: 'grin', look: [-0.6, 0.4] }); g.restore(); }
  say(g, 'GRRR!', 1240, 760, t, 0.3, 980, 640, { size: 46, shout: true });
} });

// s022 — "He's been there for every day of your life."  photo wall
function photo(g, x, y, w, h, rot, t, draw) { g.save(); g.translate(x, y); g.rotate(rot); rr(g, -w / 2 - 14, -h / 2 - 14, w + 28, h + 28, 6); g.fillStyle = '#fbf6ec'; g.fill(); g.beginPath(); g.rect(-w / 2, -h / 2, w, h); g.clip(); draw(g, w, h); g.restore(); }
registerShot('s022', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 540, 1.0), F(960, 520, 1.1));
  g.fillStyle = '#f0e2c8'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  layer(g, cam, 1, (g) => {
    g.fillStyle = alpha('#d8c8b0', 0.5); for (let x = -E.W; x < E.W * 2; x += 46) g.fillRect(x, -E.H, 3, E.H * 3);
    photo(g, 520, 330, 520, 360, -0.05, t, (g, w, h) => { g.fillStyle = '#bfe0f2'; g.fillRect(-w / 2, -h / 2, w, h); g.fillStyle = '#e8c890'; g.fillRect(-w / 2, 60, w, 200); babyBundle(g, -60, 40, 1.8, t); dogLie(g, { x: 80, y: 120, s: 0.9, facing: -1, young: true, rim: false, shadow: false }); text(g, 'DAY 1', -w / 2 + 70, -h / 2 + 40, { size: 30, font: FONTS.ui, weight: 900, color: '#2a2a34' }); });
    photo(g, 1300, 300, 480, 340, 0.06, t, (g, w, h) => { g.fillStyle = '#f8d8a8'; g.fillRect(-w / 2, -h / 2, w, h); g.fillStyle = '#e8b880'; g.fillRect(-w / 2, 70, w, 200); person(g, { x: -60, y: 130, s: 0.75, facing: 1, outfit: KID, pose: POSES.cheer, expr: 'grin', rim: false, shadow: false }); dog(g, { x: 110, y: 130, s: 0.7, facing: -1, wag: 1, rim: false, shadow: false }); for (let i = 0; i < 5; i++) circle(g, -180 + i * 90, -110, 26, ['#ff6f61', '#ffd47e', '#5fd39a', '#8fd0ff', '#ff6f61'][i]); text(g, 'AGE 5', -w / 2 + 70, -h / 2 + 40, { size: 30, font: FONTS.ui, weight: 900, color: '#2a2a34' }); });
    photo(g, 820, 760, 500, 330, 0.03, t, (g, w, h) => { g.fillStyle = '#9ad0f0'; g.fillRect(-w / 2, -h / 2, w, h); g.fillStyle = '#f2d0a0'; g.fillRect(-w / 2, 50, w, 200); person(g, { x: -40, y: 130, s: 0.85, facing: 1, outfit: KID, pose: POSES.wave, expr: 'smile', rim: false, shadow: false }); dogStand(g, { x: 120, y: 130, s: 0.7, facing: -1, t, rim: false, shadow: false }); text(g, 'AGE 9', -w / 2 + 70, -h / 2 + 40, { size: 30, font: FONTS.ui, weight: 900, color: '#2a2a34' }); });
  });
} });

// s023 — "Every scraped knee."  FLASHBACK: Biscuit licks your face
registerShot('s023', { draw(g, t, info) {
  const cam = push(t, info.dur, F(980, 720, 1.7), F(980, 720, 1.8));
  g.fillStyle = '#7ab8e8'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  layer(g, cam, 1, (g) => {
    gardenView(g, -200, -200, E.W + 400, 1200, t, { time: 'day' }); const gy = 800;
    g.fillStyle = '#7ab04a'; g.fillRect(-E.W, gy, E.W * 3, E.H);
    person(g, { x: 900, y: gy + 30, s: 0.85, facing: 1, outfit: KID, pose: XP.floorSit, expr: 'sad', look: [0.5, 0], rim: RIM });
    rr(g, 935, gy - 30, 22, 12, 4); g.fillStyle = '#e8b880'; g.fill();                                   // band-aid on the knee
    dogStand(g, { x: 1100, y: gy + 30, s: 0.9, facing: -1, t, wag: 1, talk: 0.3 + 0.3 * Math.sin(t * 12), rim: RIM });
  });
  nameTag(g, 'AGE 6', 220, 120, 1, 0, { size: 44 });
} });

// s024 — "Every bad dream."  night: little you in bed, Biscuit at the end of the bed
registerShot('s024', { draw(g, t, info) {
  const cam = push(t, info.dur, F(760, 700, 1.4), F(760, 700, 1.5));
  layer(g, cam, 1, (g) => {
    const R = bedroom(g, t, { x: 0, y: 0, z: 1 }, { time: 'night', clockStr: '2:13' });
    g.fillStyle = '#16121a'; circle(g, R.bedX - 240, GY() - 210, 34, '#16121a'); circle(g, R.bedX - 228, GY() - 216, 6, '#f6f2ea'); circle(g, R.bedX - 214, GY() - 216, 6, '#f6f2ea');
    dogLie(g, { x: R.bedX + 140, y: GY() - 190, s: 1.1, facing: -1, head: 'down', eyes: 'closed', rim: NIGHT_RIM, shadow: false });
  });
  for (let i = 0; i < 3; i++) say(g, 'z', 1000 + i * 70, 420 - i * 60 - (t * 20 % 30), 1, 0, null, null, { size: 26 + i * 6, color: alpha('#fff8ee', 0.85) });
} });

// s025 — "You've talked to him every single day."  you grow up; he listens
registerShot('s025', { draw(g, t, info) {
  const k = clamp(t / info.dur), cam = push(t, info.dur, F(1060, 780, 1.9), F(1060, 780, 1.95));
  layer(g, cam, 1, (g) => {
    livingRoom(g, t, { x: 0, y: 0, z: 1 }, { time: 'golden', whale: false });
    const s = lerp(0.75, 1.35, k);
    person(g, { x: 880, y: GY() + 70, s, facing: 1, outfit: k < 0.5 ? KID : YOU, pose: XP.floorSit, expr: 'smile', talk: 0.3 + 0.3 * Math.sin(t * 9), look: [0.6, 0.2], rim: RIM });
    dogLie(g, { x: 1250, y: GY() + 70, s: 1.2, facing: -1, t, eyes: 'open', young: k < 0.3, rim: RIM });
  });
  nameTag(g, `AGE ${Math.round(lerp(5, 13, k))}`, 230, 120, 1, 0, { size: 50 });
  say(g, ['good boy!', 'guess what…', 'I got an A', 'I miss Grandpa', 'love you'][Math.floor(k * 4.99)], 760, 280, 0.3, 0, 860, 470, { size: 34 });
} });

// s026 — "Today, for the first time,"  KITCHEN today: face to face
registerShot('s026', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1050, 760, 1.7), F(1080, 760, 2.0));
  layer(g, cam, 1, (g) => {
    kitchen(g, t, { x: 0, y: 0, z: 1 });
    person(g, { x: 920, y: GY() + 50, s: 1.35, facing: 1, outfit: YOU, pose: XP.kneelTalk, expr: 'smile', talk: 0.25 + 0.3 * Math.sin(t * 10), look: [1, 0.2], rim: RIM });
    dog(g, { x: 1230, y: GY() + 50, s: 1.35, facing: -1, t, rim: RIM });
  });
} });

// s027 — "he talks back."  split: Biscuit's mouth opens / your face
registerShot('s027', { draw(g, t, info) {
  const k = ease.out(prog(t, 0.0, 0.35));
  g.save(); g.beginPath(); g.rect(0, 0, E.W / 2, E.H); g.clip();
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#f2ece2', '#4a7ac0']); g.fillRect(0, 0, E.W, E.H);
  dog(g, { x: 260, y: 1500, s: 7.5, facing: 1, t, talk: 0.5 + 0.5 * Math.sin(t * 9), rim: { ...RIM, w: 8 }, shadow: false });
  say(g, '…hi.', 600, 220, t, 0.25, 520, 400, { size: 60 });
  g.restore();
  g.save(); g.beginPath(); g.rect(E.W / 2, 0, E.W / 2, E.H); g.clip();
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#ffe2b0', '#f2b880']); g.fillRect(E.W / 2, 0, E.W / 2, E.H);
  bigFaceV2(g, E.W * 0.75, 600, 280 * (0.9 + 0.1 * k), { outfit: YOU, expr: 'surprised', look: [-0.8, 0] });
  g.restore();
  seg(g, [[E.W / 2, 0], [E.W / 2, E.H]], 10, '#ffffff');
} });
