// 04_curse.js — s049–s085: 4:47 a.m., the mosquito, the crow you called ugly, Squirrel Kid, the pet shop, Mom.
import { E, registerShot, layer, blurLayer, ease, prog, clamp, lerp, rr, seg, circle, poly, alpha, shade, glow, linGrad, radGrad, text, FONTS, rng } from '/engine/core.js';
import { POSES, breathe, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { person, bigFaceV2, XP } from '../look.js';
import { YOU, MOM } from '../cast.js';
import { dog, dogLie, cat, crow, crowFly, pigeon, bird, mosquito, rabbit, dogStand } from '../animals.js';
import { kitchen, bedroom, gardenView, stairs, GY } from '../sets/house.js';
import { street, park, school, petshop, petDoor, city, OGY } from '../sets/outside.js';
import { say, speak, speech, nameTag, counter, realCard, wave, wt, CORALC } from '../ui.js';
import { RIM, NIGHT_RIM, F, push, KIDS, SCI, sandwich, talkOf } from '../common.js';

const HOOD = { ...YOU, hood: true };
const DAWN_RIM = { color: '#ffc8a0', dir: [0.6, -0.6] };

// s049 — "Then, at four forty-seven in the morning, the birds wake you up."
registerShot('s049', { draw(g, t, info) {
  const cam = push(t, info.dur, F(560, 700, 1.6), F(520, 700, 1.75));
  layer(g, cam, 1, (g) => {
    const R = bedroom(g, t, { x: 0, y: 0, z: 1 }, { time: 'dawn', clockStr: '4:47' });
    const up = ease.out(prog(t, wt('wake', info, t, 4) - 0.2, wt('wake', info, t, 4) + 0.3));
    if (up <= 0) { circle(g, R.bedX - 240, GY() - 210, 34, '#16121a'); }
    else person(g, { x: R.bedX - 200, y: GY() - 60, s: 1.1, facing: 1, outfit: YOU, pose: XP.sitBed, expr: 'surprised', look: [1, -0.3], rim: DAWN_RIM, shadow: false });
  });
  const c = ease.out(prog(t, 0.3, 0.8)); if (c > 0) { g.save(); g.globalAlpha *= c; rr(g, 1380, 120, 420, 200, 30); g.fillStyle = '#16121a'; g.fill(); text(g, '4:47', 1590, 222, { size: 140, font: FONTS.ui, weight: 900, color: '#ff5a4a', glow: 26, glowColor: 'rgba(255,90,70,.7)' }); g.restore(); }
} });

// s050 — "My tree! My tree! MY TREE!"  the window at dawn, every bird screaming; pillow over your head
registerShot('s050', { draw(g, t, info) {
  const sh = Math.sin(t * 55) * 5, cam = { x: sh, y: 0, z: 1.02 };
  layer(g, cam, 1, (g) => {
    const G = gardenView(g, -100, -80, E.W + 200, 900, t, { time: 'dawn' });
    for (let i = 0; i < 9; i++) { const u = 0.08 + i * 0.1; bird(g, { x: -100 + (E.W + 200) * u, y: G.wireY(u) + 2, s: 1.8, facing: i % 2 ? 1 : -1, color: ['#e8743a', '#d8a040', '#c85a3a'][i % 3], open: 0.6 + 0.4 * Math.sin(t * 14 + i), rim: DAWN_RIM, shadow: false }); }
    for (let i = 0; i < 5; i++) bird(g, { x: G.tx - 160 + i * 80, y: 300 + (i % 2) * 40, s: 1.6, facing: -1, open: 0.6 + 0.4 * Math.sin(t * 12 + i), rim: DAWN_RIM, shadow: false });
    g.fillStyle = '#fbf6ec'; g.fillRect(-200, 800, E.W + 400, 400);
  });
  ['MY TREE!', 'MY TREE!', 'MY TREE!', 'MINE!', 'MY TREE!'].forEach((w, i) => say(g, w, 240 + i * 360, 170 + (i % 2) * 120, t, i * 0.35, 260 + i * 360, 420, { size: 50 + (i % 3) * 10, shout: true }));
  // your head under the pillow in the foreground
  bigFaceV2(g, 960, 1130, 240, { outfit: YOU, expr: 'angry', look: [0, -0.6] });
  g.save(); g.translate(960, 900); g.rotate(Math.sin(t * 30) * 0.02); rr(g, -330, -90, 660, 170, 80); g.fillStyle = '#ffffff'; g.fill(); g.fillStyle = alpha('#c8d0e0', 0.6); g.fillRect(-300, 30, 600, 16); g.restore();
  circle(g, 650, 930, 44, '#16121a'); circle(g, 1270, 930, 44, '#16121a');
} });

// s051 — "That's not a joke, by the way."  REAL: a robin singing
registerShot('s051', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1100, 560, 1.0), F(1100, 560, 1.06));
  layer(g, cam, 1, (g) => {
    g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#f8d0a8', '#c890a8']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
    g.strokeStyle = '#6a4a30'; g.lineWidth = 30; g.lineCap = 'round'; g.beginPath(); g.moveTo(700, 1200); g.quadraticCurveTo(1100, 760, 1700, 700); g.stroke();
    bird(g, { x: 1250, y: 770, s: 6, facing: -1, open: 0.5 + 0.5 * Math.sin(t * 10), rim: DAWN_RIM, shadow: false });
    for (let k = 0; k < 3; k++) { const r = ((t * 220 + k * 160) % 480); g.strokeStyle = alpha('#ffffff', 0.6 * (1 - r / 480)); g.lineWidth = 6; g.beginPath(); g.arc(1080, 560, r, Math.PI * 0.8, Math.PI * 1.3); g.stroke(); }
  });
  realCard(g, t, { x: 80, y: 80, w: 760, at: 0.2, title: 'Dawn chorus', lines: ['Birds sing hardest at dawn.'] });
} });

// s052 — "Most birdsong at dawn really means: this is my patch, stay out."  map of territories
registerShot('s052', { draw(g, t, info) {
  g.fillStyle = '#e8eef0'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const cam = push(t, info.dur, F(960, 540, 1.0), F(960, 540, 1.08));
  layer(g, cam, 1, (g) => {
    g.fillStyle = '#9ad08a'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
    g.fillStyle = '#d8d0c4'; for (const y of [300, 760]) g.fillRect(-E.W, y, E.W * 3, 90); g.fillRect(900, -E.H, 90, E.H * 3);
    const r = rng(3); for (let i = 0; i < 10; i++) { const x = 160 + (i % 5) * 380, y = 160 + Math.floor(i / 5) * 470; rr(g, x, y, 170, 120, 8); g.fillStyle = ['#f2d8b0', '#c8e0d8', '#f0c8b8'][i % 3]; g.fill(); }
    const T = [[420, 520], [1300, 540], [760, 980], [1650, 200], [200, 140], [1600, 900]];
    T.forEach(([x, y], i) => { const k = ease.outBack(prog(t, 0.3 + i * 0.4, 0.7 + i * 0.4)); if (k <= 0) return; g.fillStyle = alpha(['#ff6f61', '#ffd47e', '#8fd0ff', '#c89af0', '#5fd39a', '#ff9a5a'][i], 0.35); g.beginPath(); g.arc(x, y, 230 * k, 0, Math.PI * 2); g.fill(); g.strokeStyle = alpha('#3a2a4a', 0.5); g.lineWidth = 5; g.setLineDash([16, 12]); g.stroke(); g.setLineDash([]);
      bird(g, { x, y: y + 30, s: 2.2, facing: 1, color: '#e8743a', open: 0.6, rim: false, shadow: false }); text(g, 'MINE', x, y - 80, { size: 44, font: FONTS.ui, weight: 900, color: '#3a2a4a' }); });
  });
  nameTag(g, 'THIS IS MY PATCH. STAY OUT.', 960, 1000, t, 2.6, { size: 44 });
} });

// s053 — "You can't sleep through it. You can't switch it off."
registerShot('s053', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#3a3f6a', '#6a5a8a']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  bigFaceV2(g, 960, 620, 290, { outfit: YOU, expr: 'neutral', look: [0, -0.3], blink: false, rim: '#ffc8a0' });
  g.save(); g.globalAlpha *= 0.5; for (const s of [-1, 1]) { g.strokeStyle = '#7a5a8a'; g.lineWidth = 10; g.beginPath(); g.arc(960 + s * 104, 600, 70, 0.3, Math.PI - 0.3); g.stroke(); } g.restore();   // dark circles
  ['tweet', 'MINE', 'chirp', 'MY TREE', 'caw'].forEach((w, i) => say(g, w, 300 + i * 340, 160 + (i % 2) * 90, t, 0.2 + i * 0.4, null, null, { size: 32 }));
} });

// s054 — "The mosquito in your room says nothing."
registerShot('s054', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 540, 1.0), F(960, 540, 1.1));
  blurLayer(g, 8, (g) => bedroom(g, t, { x: 0, y: 0, z: 1 }, { time: 'night', clockStr: '4:52' }));
  layer(g, cam, 1, (g) => mosquito(g, { x: 900 + Math.sin(t * 3) * 60, y: 560 + Math.sin(t * 5) * 30, s: 7, facing: 1, t }));
  say(g, '…', 1300, 300, t, 0.6, 1080, 460, { size: 70 });
} });

// s055 — "That whine is just its wings, beating hundreds of times a second."
registerShot('s055', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#1e2a4a', '#2a3a6a']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  mosquito(g, { x: 560, y: 520, s: 5, facing: 1, t });
  wave(g, 900, 540, 900, 160, t, { freq: 160, speed: 40, color: '#8fd0ff', lw: 3, env: () => 1 });
  counter(g, 1350, 840, '~500', { size: 130, color: '#ffd47e', label: 'WING BEATS A SECOND' });
  realCard(g, t, { x: 80, y: 60, w: 720, at: 0.2, title: 'The whine', lines: ['It\'s not a voice. It\'s the wings.'] });
} });

// s056 — "Somehow, that's worse."
registerShot('s056', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#3a3f6a', '#6a5a8a']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  bigFaceV2(g, 960, 620, 300, { outfit: YOU, expr: 'unimpressed', look: [0.5, -0.4], rim: '#ffc8a0' });
  mosquito(g, { x: 1350 + Math.sin(t * 4) * 40, y: 300 + Math.sin(t * 6) * 20, s: 2.6, facing: -1, t });
} });

// s057 — "Then you make a mistake."  park bench, sandwich, a crow watching
registerShot('s057', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1000, 700, 1.4), F(1020, 700, 1.5));
  layer(g, cam, 1, (g) => {
    const R = park(g, t, { x: 0, y: 0, z: 1 }, { benchX: 900 });
    person(g, { x: 860, y: R.GY + 10, s: 1.35, facing: 1, outfit: YOU, pose: XP.sitBed, expr: 'smile', look: [0.3, 0.3], rim: RIM, shadow: false });
    sandwich(g, 920, R.GY - 140, 1.2);
    crow(g, { x: 1200, y: R.GY - 60, s: 2.6, facing: -1, rim: RIM });
  });
} });
// s058 — "A crow steals your sandwich,"
registerShot('s058', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1000, 640, 1.4), F(1060, 600, 1.45));
  layer(g, cam, 1, (g) => {
    const R = park(g, t, { x: 0, y: 0, z: 1 }, { benchX: 900 });
    person(g, { x: 860, y: R.GY + 10, s: 1.35, facing: 1, outfit: YOU, pose: XP.sitBed, expr: 'surprised', look: [1, -0.4], rim: RIM, shadow: false });
    const k = ease.in(prog(t, 0.3, info.dur)); crowFly(g, { x: lerp(960, 1700, k), y: lerp(R.GY - 160, R.GY - 560, k), s: 2.6, facing: 1, t, sandwich: true, rim: RIM });
    FX.speedLines && null;
  });
} });
// s059 — "and you call him ugly."  you shout UGLY!; the crow turns, slowly
registerShot('s059', { draw(g, t, info) {
  g.save(); g.beginPath(); g.rect(0, 0, E.W / 2, E.H); g.clip(); g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#9ad0f0', '#c8e8a8']); g.fillRect(0, 0, E.W, E.H);
  bigFaceV2(g, E.W * 0.25, 640, 260, { outfit: YOU, expr: 'angry', talk: 0.7, look: [0.6, -0.4] }); say(g, 'UGLY!', 480, 220, t, 0.15, 380, 420, { size: 70, shout: true }); g.restore();
  g.save(); g.beginPath(); g.rect(E.W / 2, 0, E.W / 2, E.H); g.clip(); g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#7ab8e8', '#bfe0f4']); g.fillRect(E.W / 2, 0, E.W / 2, E.H);
  const turn = ease.inOut(prog(t, 0.6, 1.6)); g.strokeStyle = '#6a4a30'; g.lineWidth = 30; g.beginPath(); g.moveTo(E.W / 2, 900); g.lineTo(E.W, 860); g.stroke();
  crow(g, { x: 1440, y: 880, s: 9, facing: turn > 0.5 ? -1 : 1, rim: RIM, shadow: false }); g.restore();
  seg(g, [[E.W / 2, 0], [E.W / 2, E.H]], 10, '#ffffff');
} });

// s060 / s061 — the fence: twenty crows, then a hundred
function fence(g, t, info, n0, n1) {
  const cam = push(t, info.dur, F(960, 560, 1.0), F(960, 560, 1.08));
  layer(g, cam, 1, (g) => {
    const G = gardenView(g, -200, -150, E.W + 400, 1000, t, { time: 'day' }); g.fillStyle = '#7ab04a'; g.fillRect(-E.W, G.gy, E.W * 3, E.H);
    const n = Math.round(lerp(n0, n1, ease.out(prog(t, 0.2, info.dur * 0.8)))), r = rng(8);
    for (let i = 0; i < n; i++) { const row = i % 3, x = -150 + r() * (E.W + 300), y = G.fy + 6 - row * 60 + (row ? -200 * r() : 0); crow(g, { x, y: row === 0 ? G.fy + 6 : y, s: 1.4 + r() * 0.6, facing: r() > 0.5 ? 1 : -1, rim: RIM, shadow: false }); }
    o.n = n;
  });
  counter(g, 1600, 240, o.n, { size: 170, color: '#ffffff', label: 'CROWS' });
}
const o = {};
registerShot('s060', { draw(g, t, info) { fence(g, t, info, 3, 20); nameTag(g, 'NEXT MORNING', 260, 100, 1, 0, { size: 40 }); } });
registerShot('s061', { draw(g, t, info) { fence(g, t, info, 20, 100); nameTag(g, 'THE MORNING AFTER', 320, 100, 1, 0, { size: 40 }); } });

// s062 — "They dive at your head all the way to school."
registerShot('s062', { draw(g, t, info) {
  const cam = push(t, info.dur, F(900, 600, 1.2), F(1100, 600, 1.25));
  layer(g, cam, 1, (g) => {
    const R = street(g, t, { x: 0, y: 0, z: 1 }, { bench: false });
    const x = lerp(600, 1400, clamp(t / info.dur));
    person(g, { x, y: R.GY + 40, s: 1.4, facing: 1, outfit: YOU, pose: walkPose(t * 2 * Math.PI * 1.6, { run: true }), expr: 'surprised', look: [0, -1], rim: RIM });
    rr(g, x - 60, R.GY - 330, 120, 60, 14); g.fillStyle = '#f2c21a'; g.fill();                       // bag over your head
    for (let i = 0; i < 7; i++) { const a = t * 2.4 + i * 0.9; crowFly(g, { x: x + Math.cos(a) * 260, y: R.GY - 400 + Math.sin(a * 1.3) * 120, s: 1.8, facing: Math.cos(a) > 0 ? -1 : 1, t: t + i, rim: RIM }); }
  });
} });

// s063 — "Crows remember faces for years."  CLOSE: a crow's eye with your face reflected
registerShot('s063', { draw(g, t, info) {
  g.fillStyle = '#16141c'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const z = 1 + 0.05 * t; g.save(); g.translate(960, 540); g.scale(z, z);
  g.fillStyle = '#1e1c26'; g.beginPath(); g.ellipse(0, 0, 900, 700, 0, 0, Math.PI * 2); g.fill();
  g.strokeStyle = alpha('#5a6ad8', 0.4); g.lineWidth = 30; g.beginPath(); g.arc(0, 0, 640, Math.PI * 1.1, Math.PI * 1.7); g.stroke();
  circle(g, 0, 0, 330, '#3a2a20'); circle(g, 0, 0, 300, '#0c0a10');
  g.save(); g.beginPath(); g.arc(0, 0, 280, 0, Math.PI * 2); g.clip(); g.globalAlpha *= 0.55; bigFaceV2(g, 0, 40, 150, { outfit: YOU, expr: 'surprised', look: [0, 0] }); g.restore();
  circle(g, 90, -110, 50, alpha('#ffffff', 0.7));
  g.restore();
} });

// s064 — "Scientists in Seattle once caught a few crows while wearing a caveman mask."
function cavemanMask(g, x, y, s = 1) { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = '#d8b088'; g.beginPath(); g.ellipse(0, 0, 34, 40, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#5a3a20'; g.beginPath(); g.ellipse(0, -30, 40, 18, 0, Math.PI, Math.PI * 2); g.fill(); g.fillRect(-36, 6, 72, 34); seg(g, [[-20, -12], [-6, -8]], 6, '#3a2a1a'); seg(g, [[20, -12], [6, -8]], 6, '#3a2a1a'); circle(g, -12, -2, 4, '#1a1410'); circle(g, 12, -2, 4, '#1a1410'); g.restore(); }
registerShot('s064', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1050, 700, 1.4), F(1050, 700, 1.5));
  layer(g, cam, 1, (g) => {
    const R = park(g, t, { x: 0, y: 0, z: 1 }, { bench: false });
    person(g, { x: 1000, y: R.GY + 20, s: 1.5, facing: 1, outfit: SCI, pose: POSES.holdFront, expr: 'neutral', rim: RIM });
    cavemanMask(g, 1006, R.GY + 20 - 1.5 * 208, 1.5);
    seg(g, [[1060, R.GY - 220], [1260, R.GY - 420]], 6, '#6a4a30'); g.strokeStyle = alpha('#ffffff', 0.7); g.lineWidth = 3; g.beginPath(); g.arc(1300, R.GY - 460, 70, 0, Math.PI * 2); g.stroke();
    crow(g, { x: 1300, y: R.GY - 420, s: 1.8, facing: -1, rim: RIM, shadow: false });
  });
  realCard(g, t, { x: 80, y: 60, w: 760, at: 0.3, title: 'Seattle, 2006', lines: ['Scientists caught crows wearing', 'one scary "caveman" mask.'] });
} });
// s065 — "Years later, crows that were never caught still screamed at that mask."
registerShot('s065', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1000, 600, 1.15), F(1000, 600, 1.22));
  layer(g, cam, 1, (g) => {
    const R = park(g, t, { x: 0, y: 0, z: 1 }, { bench: false });
    person(g, { x: 900, y: R.GY + 20, s: 1.4, facing: 1, outfit: SCI, pose: POSES.handsOnHead, expr: 'surprised', rim: RIM }); cavemanMask(g, 905, R.GY + 20 - 1.4 * 208, 1.4);
    for (let i = 0; i < 8; i++) { const a = t * 1.6 + i * 0.8; crowFly(g, { x: 900 + Math.cos(a) * 420, y: R.GY - 520 + Math.sin(a * 1.2) * 140, s: 1.6, facing: Math.cos(a) > 0 ? -1 : 1, t: t + i, rim: RIM }); }
  });
  ['CAW!', 'CAW!', 'HIM!', 'CAW!'].forEach((w, i) => say(g, w, 300 + i * 440, 150 + (i % 2) * 80, t, 0.4 + i * 0.35, null, null, { size: 48, shout: true }));
  nameTag(g, 'YEARS LATER', 1680, 1000, 1, 0, { size: 40 });
} });
// s066 — "The others had taught them."  an old crow teaching young crows
registerShot('s066', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 600, 1.2), F(960, 600, 1.28));
  layer(g, cam, 1, (g) => {
    g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#9ad0f0', '#e0f0f8']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
    g.strokeStyle = '#6a4a30'; g.lineWidth = 34; g.lineCap = 'round'; g.beginPath(); g.moveTo(-100, 760); g.lineTo(2100, 720); g.stroke();
    crow(g, { x: 560, y: 750, s: 4.2, facing: 1, rim: RIM, shadow: false });
    [1000, 1300, 1600].forEach((x, i) => crow(g, { x, y: 740, s: 2.6, facing: -1, rim: RIM, shadow: false }));
    rr(g, 300, 260, 520, 260, 20); g.fillStyle = '#ffffff'; g.fill(); g.strokeStyle = '#3a2a4a'; g.lineWidth = 4; g.stroke();
    cavemanMask(g, 460, 390, 2); text(g, '= DANGER', 650, 390, { size: 48, font: FONTS.ui, weight: 900, color: CORALC });
  });
} });

// s067 — "Now every crow in the city knows your face."
registerShot('s067', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 620, 1.25), F(960, 640, 1.4));
  layer(g, cam, 1, (g) => {
    const R = city(g, t, { x: 0, y: 0, z: 1 });
    const r = rng(6); R.roofs.forEach(([x, y, w]) => { for (let i = 0; i < 7; i++) crow(g, { x: x + 20 + r() * (w - 40), y: y + 4, s: 1.2, facing: (t > 1.2 + r()) ? -1 : 1, rim: { color: '#ffb070', dir: [0.6, -0.6] }, shadow: false }); });
  });
} });

// s068 — "So you keep your hood up. All the time."
registerShot('s068', { draw(g, t, info) {
  const cam = push(t, info.dur, F(900, 640, 1.5), F(1000, 640, 1.55));
  layer(g, cam, 1, (g) => {
    const R = street(g, t, { x: 0, y: 0, z: 1 }, { time: 'day', bench: false });
    const x = lerp(700, 1200, clamp(t / info.dur));
    person(g, { x, y: R.GY + 40, s: 1.45, facing: 1, outfit: HOOD, pose: walkPose(t * 2 * Math.PI * 0.9, {}), expr: 'sad', look: [0.4, 0.6], rim: RIM });
    crow(g, { x: 1500, y: R.GY - 250, s: 1.8, facing: -1, rim: RIM, shadow: false });
  });
} });

// s069 — "At school, people start calling you Squirrel Kid."
registerShot('s069', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1000, 640, 1.3), F(1000, 640, 1.38));
  layer(g, cam, 1, (g) => {
    const R = school(g, t, { x: 0, y: 0, z: 1 }, { room: 'hall' });
    rr(g, 700, R.GY - 520, 200, 140, 8); g.fillStyle = '#ffffff'; g.fill(); text(g, 'SQUIRREL', 800, R.GY - 480, { size: 34, font: FONTS.ui, weight: 900, color: CORALC }); text(g, 'KID', 800, R.GY - 430, { size: 34, font: FONTS.ui, weight: 900, color: CORALC });
    person(g, { x: 800, y: R.GY + 40, s: 1.45, facing: 1, outfit: HOOD, pose: breathe(POSES.sad, t, 1, 1), expr: 'sad', look: [0.6, 0.2], rim: RIM });
    [[1260, 0], [1420, 1], [1580, 2]].forEach(([x, i]) => person(g, { x, y: R.GY + 40, s: 1.4, facing: -1, outfit: KIDS[i], pose: breathe(i === 1 ? POSES.point : POSES.relaxed, t, 1, i), expr: 'grin', look: [-1, 0], rim: RIM }));
  });
  say(g, 'Squirrel Kid!', 1450, 240, t, 1.0, 1440, 420, { size: 40 });
} });

// s070 — "You sit alone at lunch, and a pigeon sits next to you."
registerShot('s070', { draw(g, t, info) {
  const cam = push(t, info.dur, F(500, 700, 1.5), F(520, 700, 1.55));
  layer(g, cam, 1, (g) => {
    const R = school(g, t, { x: 0, y: 0, z: 1 }, { room: 'cafe', tables: [500, 1600] });
    person(g, { x: 420, y: R.GY - 20, s: 1.3, facing: 1, outfit: HOOD, pose: XP.sitBed, expr: 'sad', look: [0.4, 0.4], rim: RIM, shadow: false });
    const k = ease.out(prog(t, wt('pigeon', info, t, 2.5) - 0.6, wt('pigeon', info, t, 2.5) + 0.2));
    pigeon(g, { x: lerp(900, 600, k), y: lerp(R.GY - 600, R.GY - 70, k), s: 2.0, facing: -1, rim: RIM, shadow: false });
    [1400, 1560, 1720].forEach((x, i) => person(g, { x, y: R.GY - 20, s: 1.25, facing: -1, outfit: KIDS[i + 1], pose: XP.sitBed, expr: 'smile', talk: 0.3 * Math.sin(t * 8 + i), rim: RIM, shadow: false }));
  });
} });
// s071 — "It's not the same."
registerShot('s071', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#e8eef2', '#c8d8e0']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  bigFaceV2(g, 820, 620, 280, { outfit: HOOD, expr: 'sad', look: [0.8, 0.2] });
  pigeon(g, { x: 1420, y: 980, s: 7, facing: -1, rim: RIM, shadow: false });
  say(g, 'coo.', 1500, 260, t, 0.8, 1430, 520, { size: 50 });
} });

// s072 — "And then there's the pet shop."
registerShot('s072', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 560, 1.0), F(960, 560, 1.08));
  layer(g, cam, 1, (g) => { const R = petDoor(g, t, { x: 0, y: 0, z: 1 }); person(g, { x: lerp(300, 520, clamp(t / info.dur)), y: R.GY + 40, s: 1.35, facing: 1, outfit: HOOD, pose: walkPose(t * 6, {}), expr: 'neutral', rim: RIM }); });
} });
// s073 — "You walk in for cat food,"
registerShot('s073', { draw(g, t, info) {
  const cam = push(t, info.dur, F(500, 600, 1.2), F(560, 600, 1.25));
  layer(g, cam, 1, (g) => { const R = petshop(g, t, { x: 0, y: 0, z: 1 }); person(g, { x: lerp(200, 520, clamp(t / info.dur)), y: R.GY + 40, s: 1.45, facing: 1, outfit: HOOD, pose: walkPose(t * 6, {}), expr: 'neutral', rim: RIM }); });
  const b = ease.outBack(prog(t, 0.1, 0.4)); if (b > 0) { g.save(); g.translate(300, 140); g.rotate(Math.sin(t * 20) * 0.2 * (1 - clamp(t))); g.scale(b, b); poly(g, [[-40, 40], [40, 40], [26, -20], [-26, -20]], '#ffd23a'); circle(g, 0, 46, 10, '#d8a020'); g.restore(); say(g, 'ding!', 470, 120, t, 0.15, null, null, { size: 34 }); }
} });

// pet shop helpers: animals inside the shelf cells
function fillCells(g, t, cells, look) {
  cells.forEach(([x, y, row, i], k) => {
    const turn = look(k);
    if (row === 0) bird(g, { x, y: y - 4, s: 2.6, facing: turn, color: ['#5fd39a', '#ffd47e', '#8fd0ff'][k % 3], back: ['#3a8a5a', '#d8a020', '#3a7ab0'][k % 3], open: 0.3, rim: false, shadow: false });
    else if (row === 1) rabbit(g, { x, y: y - 4, s: 1.9, facing: turn, color: ['#f6f2ea', '#c8a888', '#8a8a8a'][k % 3], rim: false, shadow: false });
    else dogStand(g, { x, y: y - 4, s: 0.95, facing: turn, t, young: true, collar: false, pal: k % 2 ? { base: '#2a2224', dark: '#1a1416', light: '#4a4044', ear: '#1a1416', muzzle: '#4a4044' } : {}, rim: false, shadow: false });
    if (row === 2 || row === 1) { g.strokeStyle = alpha('#ffffff', 0.5); g.lineWidth = 3; g.strokeRect(x - 118, y - 154, 236, 186); }
  });
}
// s074 — "and the whole room turns to you at once."
registerShot('s074', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1000, 560, 1.05), F(1000, 560, 1.12));
  layer(g, cam, 1, (g) => { const R = petshop(g, t, { x: 0, y: 0, z: 1 }); const turn = t > 0.9; fillCells(g, t, R.cells, () => (turn ? -1 : 1)); person(g, { x: 400, y: R.GY + 40, s: 1.5, facing: 1, outfit: HOOD, pose: POSES.stand, expr: turn ? 'surprised' : 'neutral', rim: RIM }); });
  if (t > 0.9) FX.speedLines(g, t, { cx: 960, cy: 540, count: 40, color: '#ffffff', a: 0.15 });
} });
// s075–s077 — close-ups: puppies, rabbits, birds
function cellClose(g, t, row) {
  g.fillStyle = '#f2ead8'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const z = 1 + 0.06 * t; g.save(); g.translate(960, 540); g.scale(z, z); g.translate(-960, -540);
  for (let i = 0; i < 3; i++) { const x = 340 + i * 620; rr(g, x - 290, 150, 580, 760, 16); g.fillStyle = '#c8e8f0'; g.fill(); g.strokeStyle = '#8a9aa8'; g.lineWidth = 10; g.stroke(); g.fillStyle = '#e8d8b0'; g.fillRect(x - 280, 780, 560, 120);
    if (row === 2) dogStand(g, { x, y: 800, s: 2.6, facing: -1, t, young: true, collar: false, wag: 1, pal: i === 1 ? { base: '#2a2224', dark: '#1a1416', light: '#4a4044', ear: '#1a1416', muzzle: '#4a4044' } : i === 2 ? { base: '#f6f2ea', dark: '#d8d0c8', light: '#ffffff', ear: '#c8a888', muzzle: '#f6f2ea' } : {}, rim: false, shadow: false });
    if (row === 1) rabbit(g, { x, y: 800, s: 5, facing: -1, color: ['#f6f2ea', '#c8a888', '#8a8a8a'][i], rim: false, shadow: false });
    if (row === 0) { g.strokeStyle = '#c8a050'; g.lineWidth = 4; for (let k = 0; k < 9; k++) { g.beginPath(); g.moveTo(x - 260 + k * 65, 170); g.lineTo(x - 260 + k * 65, 780); g.stroke(); } bird(g, { x, y: 760, s: 7, facing: -1, color: ['#5fd39a', '#ffd47e', '#8fd0ff'][i], back: ['#3a8a5a', '#d8a020', '#3a7ab0'][i], open: 0.4 + 0.4 * Math.sin(t * 8 + i), rim: false, shadow: false }); }
    g.fillStyle = alpha('#ffffff', 0.25); g.fillRect(x - 260, 170, 60, 600); }
  g.restore();
}
registerShot('s075', { draw(g, t, info) { cellClose(g, t, 2); } });
registerShot('s076', { draw(g, t, info) { cellClose(g, t, 1); } });
registerShot('s077', { draw(g, t, info) { cellClose(g, t, 0); } });
// s078 — "Pick me. Pick me. Take me home."
registerShot('s078', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1000, 560, 1.12), F(1000, 560, 1.2));
  layer(g, cam, 1, (g) => { const R = petshop(g, t, { x: 0, y: 0, z: 1 }); fillCells(g, t, R.cells, () => -1); });
  const sp = speech('ANIMALS', info.globalT, 0.4);
  const n = sp ? 3 + Math.floor((info.globalT - 234.2) * 4) : 12;
  for (let i = 0; i < Math.min(14, n); i++) say(g, ['PICK ME!', 'PICK ME!', 'TAKE ME HOME!'][i % 3], 200 + ((i * 593) % 1560), 140 + ((i * 337) % 760), t, i * 0.22, null, null, { size: 34 + (i % 3) * 6 });
} });
// s079 — "You can't take them all."
registerShot('s079', { draw(g, t, info) {
  const cam = push(t, info.dur, F(760, 640, 1.5), F(760, 640, 1.6));
  layer(g, cam, 1, (g) => { const R = petshop(g, t, { x: 0, y: 0, z: 1 }); fillCells(g, t, R.cells, () => -1); person(g, { x: 760, y: R.GY + 40, s: 1.5, facing: 1, outfit: HOOD, pose: breathe(POSES.sad, t, 1, 2), expr: 'sad', look: [0.4, -0.4], rim: RIM }); });
} });
// s080 — "You can't even take one."
registerShot('s080', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#c8e8f0', '#e8d8b0']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  bigFaceV2(g, 960, 620, 300, { outfit: HOOD, expr: 'sad', look: [0, 0.2], tears: ease.out(prog(t, 0.6, 2)) });
} });
// s081 — "You walk out with a bag of cat food, and you don't look back."
registerShot('s081', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 560, 1.0), F(900, 560, 1.06));
  layer(g, cam, 1, (g) => {
    const R = petDoor(g, t, { x: 0, y: 0, z: 1 });
    const x = lerp(1100, 1800, clamp(t / info.dur));
    person(g, { x, y: R.GY + 40, s: 1.4, facing: 1, outfit: HOOD, pose: walkPose(t * 6, {}), expr: 'sad', look: [1, 0.4], rim: RIM });
    rr(g, x + 10, R.GY - 170, 60, 80, 8); g.fillStyle = '#ff9a5a'; g.fill();
    for (let i = 0; i < 4; i++) { circle(g, 720 + i * 90, R.GY - 360, 6, '#16121a'); circle(g, 740 + i * 90, R.GY - 360, 6, '#16121a'); }   // eyes in the window
  });
} });

// s082 — "Hey. What's wrong?"  KITCHEN: Mom, worried
registerShot('s082', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1150, 700, 1.7), F(1150, 700, 1.8));
  layer(g, cam, 1, (g) => { kitchen(g, t, { x: 0, y: 0, z: 1 }, { time: 'dusk' }); person(g, { x: 1200, y: GY() + 40, s: 1.45, facing: -1, outfit: MOM, pose: breathe(POSES.talk, t, 1, 3), expr: 'worried', talk: talkOf('MOM', info), look: [-1, 0], rim: RIM }); });
  speak(g, 'MOM', info, t, 1400, 270, 1260, 420, { size: 52 });
} });
// s083 — "You say nothing."
registerShot('s083', { draw(g, t, info) {
  const cam = push(t, info.dur, F(760, 700, 1.7), F(760, 700, 1.8));
  layer(g, cam, 1, (g) => { kitchen(g, t, { x: 0, y: 0, z: 1 }, { tableX: 760 }); person(g, { x: 560, y: GY() + 40, s: 1.4, facing: 1, outfit: HOOD, pose: XP.sitBed, expr: 'sad', look: [0.2, 0.5], rim: RIM, shadow: false }); rr(g, 760, GY() - 190, 70, 90, 8); g.fillStyle = '#ff9a5a'; g.fill(); dog(g, { x: 1000, y: GY() + 50, s: 1.35, facing: -1, t, brows: 'sad', rim: RIM }); });
} });
// s084 — "Biscuit doesn't either."
registerShot('s084', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1040, 760, 2.4), F(1040, 760, 2.55));
  layer(g, cam, 1, (g) => { kitchen(g, t, { x: 0, y: 0, z: 1 }, { tableX: 760 }); dog(g, { x: 1000, y: GY() + 50, s: 1.35, facing: -1, t, brows: 'sad', eyes: 'tired', rim: RIM }); });
} });
// s085 — "But that night, he sleeps across your doorway."
registerShot('s085', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 680, 1.25), F(960, 700, 1.4));
  g.fillStyle = '#2a2e4a'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  layer(g, cam, 1, (g) => {
    const gy = GY();
    g.fillStyle = '#3a3e60'; g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H);
    rr(g, 640, gy - 640, 640, 640, 6); g.fillStyle = '#5a6090'; g.fill();                               // doorway (your room, lamp light)
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = radGrad(g, 960, gy - 300, 40, 500, [alpha('#ffd8a0', 0.35), alpha('#ffd8a0', 0)]); g.fillRect(640, gy - 640, 640, 640); g.restore();
    bedroom && null;
    g.fillStyle = '#4a4268'; g.fillRect(-E.W, gy - 8, E.W * 3, E.H);
    dogLie(g, { x: 960, y: gy + 40, s: 1.6, facing: 1, head: 'down', eyes: 'closed', rim: { color: '#ffd8a0', dir: [0, -1] } });
  });
} });
