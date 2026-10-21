// 01_hook.js — s001–s017: Biscuit talks, the bacon, Pickles, the birds, the title and the rules.
import { E, registerShot, layer, blurLayer, key, ease, prog, clamp, lerp, rr, seg, circle, poly, alpha, shade, glow, linGrad, radGrad, text, FONTS, rng } from '/engine/core.js';
import { POSES, breathe, posesAt } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { person, bigFaceV2, XP } from '../look.js';
import { YOU, MOM } from '../cast.js';
import { dog, cat, catWalk, bird, crow, pigeon, squirrel, prairieDog, animalHead, spermWhale } from '../animals.js';
import { kitchen, gardenView, GY } from '../sets/house.js';
import { say, speak, speech, counter, offSwitch, nameTag, wt } from '../ui.js';

const RIM = { color: '#ffd8a8', dir: [-0.7, -0.6] };
const F = (px, py, z) => ({ x: px - E.W / 2, y: py - E.H / 2, z });                       // camera centred on (px, py)
const push = (t, dur, a, b) => { const k = ease.inOut(clamp(t / dur)); return { x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), z: lerp(a.z, b.z, k) }; };
const drift = (t, dur, a = {}, b = {}) => { const k = ease.inOut(clamp(t / dur)); return { x: lerp(a.x || 0, b.x || 0, k), y: lerp(a.y || 0, b.y || 0, k), z: lerp(a.z || 1, b.z || 1, k) }; };
const bacon = (g, x, y, s = 1) => { g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = '#b8402c'; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(-50, 0); g.bezierCurveTo(-20, -18, 10, 18, 50, 0); g.stroke(); g.strokeStyle = '#f2c8a0'; g.lineWidth = 5; g.beginPath(); g.moveTo(-46, 0); g.bezierCurveTo(-18, -14, 10, 14, 46, 0); g.stroke(); g.restore(); };
const dogTalk = (info) => speech('BISCUIT', info.globalT, 0)?.talk || 0;

// s001 — "Bacon."  EXTREME CLOSE-UP, frame 1: Biscuit's face talking
registerShot('s001', { draw(g, t, info) {
  const cam = drift(t, info.dur, { z: 1.0 }, { z: 1.06 });
  blurLayer(g, 7, (g) => kitchen(g, t, { x: 0, y: 0, z: 1 }, {}), null);
  layer(g, cam, 1, (g) => dog(g, { x: 560, y: 1760, s: 9, facing: 1, t, talk: dogTalk(info), rim: { ...RIM, w: 9 }, shadow: false }));
  speak(g, 'BISCUIT', info, t, 1560, 230, 1300, 420, { size: 64 });
} });

// s002 — "Under the chair."  LOW ANGLE under the chair: the bacon glows
registerShot('s002', { draw(g, t, info) {
  const cam = drift(t, info.dur, { x: -20, z: 1.04 }, { x: 20, z: 1.1 });
  g.fillStyle = '#f2ece2'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  layer(g, cam, 0.6, (g) => { g.fillStyle = '#4a7ac0'; g.fillRect(-E.W, 300, E.W * 3, 520); g.fillStyle = '#e8e2d6'; g.fillRect(-E.W, 280, E.W * 3, 26); });
  layer(g, cam, 1, (g) => {
    g.fillStyle = linGrad(g, 0, 760, 0, E.H, ['#d8b088', '#b08860']); g.fillRect(-E.W, 760, E.W * 3, 600);
    rr(g, 380, -120, 900, 120, 10); g.fillStyle = '#8a5a3a'; g.fill();                                  // seat from below
    for (const x of [430, 1180]) { g.fillStyle = '#7a4a2a'; g.fillRect(x, 0, 46, 860); }               // chair legs
    glow(g, 620, 860, 220, '#ffd28a', 0.5); bacon(g, 620, 870, 1.9);
  });
  FX.dust(g, t, { count: 30, color: '#fff2d6' });
  speak(g, 'BISCUIT', info, t, 1500, 200, 1900, 500, { size: 54 });
} });

// s003 — "Left side."  Biscuit, a little nod toward the left
registerShot('s003', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1180, 780, 2.1), F(1180, 790, 2.2));
  layer(g, cam, 1, (g) => { kitchen(g, t, { x: 0, y: 0, z: 1 }, { table: true }); dog(g, { x: 1180, y: GY() + 70, s: 1.8, facing: -1, t, talk: dogTalk(info), rim: RIM }); });
  speak(g, 'BISCUIT', info, t, 1300, 250, 1150, 430, { size: 56 });
} });

// s004 — "You look."  you bend down and look under the chair
registerShot('s004', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1080, 720, 1.7), F(1060, 740, 1.8));
  layer(g, cam, 1, (g) => {
    kitchen(g, t, { x: 0, y: 0, z: 1 });
    const k = ease.inOut(prog(t, 0.1, 0.7));
    person(g, { x: 1000, y: GY() + 40, s: 1.5, facing: -1, outfit: YOU, pose: posesAt ? lerpPose(POSES.stand, POSES.crouch, k) : POSES.crouch, expr: 'surprised', look: [-0.6, 0.7], rim: RIM });
    dog(g, { x: 1320, y: GY() + 40, s: 1.3, facing: -1, t, rim: RIM });
  });
} });
function lerpPose(a, b, k) { const o = {}; for (const key2 in a) o[key2] = [lerp(a[key2][0], b[key2][0], k), lerp(a[key2][1], b[key2][1], k)]; return o; }

// s005 — "There's a piece of bacon under the chair. Left side."  POV under the chair, the bacon on the left
registerShot('s005', { draw(g, t, info) {
  const cam = drift(t, info.dur, { z: 1.0 }, { z: 1.12, x: -80 });
  g.fillStyle = '#f2ece2'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  layer(g, cam, 0.7, (g) => { g.fillStyle = '#4a7ac0'; g.fillRect(-E.W, 200, E.W * 3, 560); for (let x = -E.W; x < E.W * 2; x += 230) { rr(g, x + 10, 220, 210, 520, 6); g.fillStyle = '#5a8ad0'; g.fill(); } });
  layer(g, cam, 1, (g) => {
    g.fillStyle = linGrad(g, 0, 720, 0, E.H, ['#d8b088', '#b08860']); g.fillRect(-E.W, 720, E.W * 3, 600);
    for (const x of [300, 1500]) { g.fillStyle = '#7a4a2a'; g.fillRect(x, -100, 60, 900); }
    g.fillStyle = '#8a5a3a'; g.fillRect(240, -100, 1400, 70);
    const L = ease.out(prog(t, wt('left', info, t, 2.6) - 0.1, wt('left', info, t, 2.6) + 0.4));
    glow(g, 560, 860, 240, '#ffd28a', 0.4 + 0.3 * L); bacon(g, 560, 870, 2.2);
    if (L > 0) { g.save(); g.globalAlpha *= L; seg(g, [[900, 680], [700, 820]], 8, '#ff6f61'); poly(g, [[690, 830], [730, 790], [740, 832]], '#ff6f61'); text(g, 'LEFT SIDE', 1000, 650, { size: 56, font: FONTS.ui, weight: 900, color: '#ff6f61', stroke: 8, strokeColor: '#ffffff' }); g.restore(); }
  });
  // your face peeking in from the top right
  const k = ease.out(prog(t, 0.2, 0.9)); bigFaceV2(g, 1640, -120 + 260 * k, 230, { outfit: YOU, expr: 'surprised', look: [-0.8, 0.6], tilt: 0.5 });
} });

// s006 — "That's forty-one pieces this year."  Biscuit proud, counter 39→41
registerShot('s006', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1080, 800, 1.9), F(1090, 800, 2.0));
  layer(g, cam, 1, (g) => { kitchen(g, t, { x: 0, y: 0, z: 1 }); dog(g, { x: 1180, y: GY() + 70, s: 1.8, facing: -1, t, talk: dogTalk(info), wag: 1, rim: RIM }); });
  const n = 39 + Math.min(2, Math.floor(prog(t, 0.2, 1.4) * 3));
  counter(g, 420, 520, n, { size: 220, color: '#ffd47e', label: 'PIECES OF BACON', labelColor: '#ffffff' });
  speak(g, 'BISCUIT', info, t, 1250, 170, 1220, 330, { size: 48 });
} });

// s007 — "I've been counting."  INSERT: tally marks scratched on his bowl
registerShot('s007', { draw(g, t, info) {
  const cam = drift(t, info.dur, { z: 1.0 }, { z: 1.08 });
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#e8dcc8', '#d8b088']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  layer(g, cam, 1, (g) => {
    g.fillStyle = '#b8402c'; g.beginPath(); g.ellipse(960, 720, 640, 120, 0, 0, Math.PI * 2); g.fill();
    rr(g, 340, 380, 1240, 340, 40); g.fillStyle = '#D64A33'; g.fill(); g.fillStyle = alpha('#ffffff', 0.15); g.fillRect(360, 400, 1200, 30);
    text(g, 'BISCUIT', 960, 470, { size: 70, font: FONTS.ui, weight: 900, color: '#ffe8d8', spacing: 10 });
    const shown = Math.min(41, Math.floor(prog(t, 0, info.dur * 0.8) * 41) + 30);
    for (let i = 0; i < shown; i++) { const gidx = Math.floor(i / 5), j = i % 5, x = 440 + gidx * 130 + j * 22, y = 560;
      if (j < 4) seg(g, [[x, y], [x + 4, y + 100]], 7, '#fff1e6'); else seg(g, [[x - 92, y + 20], [x + 8, y + 80]], 7, '#fff1e6'); }
  });
  speak(g, 'BISCUIT', info, t, 1500, 200, 1900, 300, { size: 48 });
} });

// s008 — "The cat walks across the breakfast table."
registerShot('s008', { draw(g, t, info) {
  const cam = push(t, info.dur, F(700, 640, 1.8), F(840, 640, 1.85));
  layer(g, cam, 1, (g) => {
    kitchen(g, t, { x: 0, y: 0, z: 1 }, { tableX: 760 });
    const x = lerp(470, 1010, ease.inOut(clamp(t / info.dur)));
    catWalk(g, { x, y: GY() - 160, s: 1.6, facing: 1, t, rim: RIM });
    dog(g, { x: 1320, y: GY() + 50, s: 1.2, facing: -1, t, rim: RIM });
  });
} });

// s009 — "Ugh. You're awake."  CLOSE: Pickles, heavy lids
registerShot('s009', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1020, 650, 2.6), F(1020, 640, 2.75));
  layer(g, cam, 1, (g) => { kitchen(g, t, { x: 0, y: 0, z: 1 }, { tableX: 760 }); cat(g, { x: 980, y: GY() - 160, s: 1.6, facing: -1, rim: RIM }); });
  speak(g, 'PICKLES', info, t, 620, 300, 840, 470, { size: 60 });
} });

// s010 — "And outside, every bird on the street is screaming the same thing."  push toward the window
registerShot('s010', { draw(g, t, info) {
  const k = ease.inOut(clamp(t / info.dur)), cam = { x: lerp(0, -440, k), y: lerp(0, -120, k), z: lerp(1, 1.9, k) };
  layer(g, cam, 1, (g) => {
    const R = kitchen(g, t, { x: 0, y: 0, z: 1 }), w = R.win;
    g.save(); g.beginPath(); g.rect(w.x, w.y, w.w, w.h); g.clip();
    const G = gardenView(g, w.x, w.y, w.w, w.h, t, { time: 'day' });
    for (let i = 0; i < 7; i++) { const u = 0.1 + i * 0.13, bx = w.x + w.w * u; bird(g, { x: bx, y: G.wireY(u) + 2, s: 0.6, facing: i % 2 ? 1 : -1, color: ['#e8743a', '#d8a040', '#c85a3a'][i % 3], open: 0.5 + 0.5 * Math.sin(t * 9 + i), rim: false, shadow: false }); }
    for (let i = 0; i < 3; i++) bird(g, { x: G.tx - 40 + i * 40, y: w.y + w.h * 0.36 + (i % 2) * 18, s: 0.5, facing: -1, open: 0.5 + 0.5 * Math.sin(t * 11 + i), rim: false, shadow: false });
    g.restore();
  });
  const n = Math.floor(prog(t, 1.2, info.dur) * 7);
  for (let i = 0; i < n; i++) say(g, 'MY TREE!', 200 + ((i * 523) % 1500), 140 + ((i * 271) % 260), t, 1.2 + i * 0.55, null, null, { size: 26 + (i % 3) * 6 });
} });

// s011 — "My tree! My tree! MY TREE!"  CLOSE: robins on a branch screaming
registerShot('s011', { draw(g, t, info) {
  const sh = t > 1.4 ? FX && Math.sin(t * 60) * 6 : 0, cam = { x: sh, y: 0, z: 1.0 + 0.03 * t };
  layer(g, cam, 0.3, (g) => { g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#7ab8e8', '#bfe0f4']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); FX.clouds(g, { y: 120, h: 160, color: '#ffffff', a: 0.6, seed: 3 }); });
  layer(g, cam, 1, (g) => {
    g.strokeStyle = '#6a4a30'; g.lineWidth = 34; g.lineCap = 'round'; g.beginPath(); g.moveTo(-100, 820); g.quadraticCurveTo(900, 700, 2100, 760); g.stroke();
    for (const [x, y, r] of [[200, 640, 120], [1700, 600, 140], [1000, 560, 90]]) circle(g, x, y, r, '#4a9a4a');
    const cols = ['#e8743a', '#d8a040', '#c85a3a', '#e8743a', '#d88a3a'];
    for (let i = 0; i < 5; i++) { const x = 300 + i * 340, y = 790 - Math.sin((x + 100) / 2200 * Math.PI) * 60; bird(g, { x, y, s: 3.2, facing: i % 2 ? -1 : 1, color: cols[i], open: 0.6 + 0.4 * Math.sin(t * 14 + i * 2), rim: RIM, shadow: false }); }
  });
  const sp = speech('BIRDS', info.globalT, 0.4);
  if (sp) { const words = ['MY TREE!', 'MY TREE!', 'MY TREE!']; const n = Math.min(3, 1 + Math.floor((info.globalT - 23.6) / 0.6));
    for (let i = 0; i < n; i++) say(g, words[i], 380 + i * 560, 200 + (i % 2) * 90, t, (i * 0.6), 400 + i * 600, 560, { size: 56 + i * 16, shout: true }); }
} });

// s012 — "So..."  BIG FACE: you, eyes wide, bubbles all around
registerShot('s012', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#f8e8c8', '#f2c890']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  glow(g, 960, 520, 700, '#ffffff', 0.4);
  const s = 1 + 0.04 * t; bigFaceV2(g, 960, 600 - 10 * t, 300 * s, { outfit: YOU, expr: 'surprised', look: [Math.sin(t * 3) * 0.8, -0.2] });
  const B = ['WOOF', 'MEOW', 'MINE!', 'CAW', 'TWEET', 'BACON?'];
  B.forEach((b, i) => { const a = i / B.length * Math.PI * 2 + 0.3; say(g, b, 960 + Math.cos(a) * 640, 520 + Math.sin(a) * 340, t, 0.05 + i * 0.12, null, null, { size: 36 }); });
} });

// s013 — "what if you could talk to animals?"  TITLE
registerShot('s013', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#ffd9a0', '#f0a07a']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  glow(g, 960, 700, 900, '#fff2d0', 0.5);
  const gy = 960, cam = { x: 0, y: 0, z: 1 + 0.03 * t };
  layer(g, cam, 1, (g) => {
    g.fillStyle = '#e8b880'; g.fillRect(-E.W, gy, E.W * 3, 400);
    person(g, { x: 960, y: gy, s: 1.7, facing: 1, outfit: YOU, pose: breathe(POSES.cheer, t, 1, 2), expr: 'grin', rim: RIM });
    dog(g, { x: 640, y: gy, s: 1.5, facing: 1, t, wag: 1, talk: 0.3 + 0.3 * Math.sin(t * 8), rim: RIM });
    cat(g, { x: 1300, y: gy, s: 1.4, facing: -1, rim: RIM });
    squirrel(g, { x: 1500, y: gy, s: 2.0, facing: -1, rim: RIM }); prairieDog(g, { x: 400, y: gy, s: 2.2, facing: 1, rim: RIM });
    pigeon(g, { x: 1680, y: gy, s: 2.0, facing: -1, rim: RIM }); crow(g, { x: 230, y: gy, s: 2.0, facing: 1, rim: RIM });
    bird(g, { x: 1160, y: 420 + 10 * Math.sin(t * 4), s: 2, facing: -1, open: 0.5 + 0.5 * Math.sin(t * 10), rim: RIM, shadow: false });
  });
  const k = ease.outBack(prog(t, 0.15, 0.6)); g.save(); g.translate(960, 190); g.scale(k, k);
  text(g, 'WHAT IF YOU COULD', 0, -50, { size: 74, font: FONTS.title, weight: 700, color: '#ffffff', stroke: 12, strokeColor: '#3a2a4a' });
  text(g, 'TALK TO ANIMALS?', 0, 50, { size: 112, font: FONTS.title, weight: 700, color: '#ffd23a', stroke: 16, strokeColor: '#3a2a4a' });
  g.restore();
} });

// shared: the "you ↔ every animal" diagram (s014, s015)
function hub(g, t, back) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#fff6e6', '#f8e2c0']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const c = [960, 560], R = 400, A = [['dog', 0], ['cat', 1], ['crow', 2], ['pigeon', 3], ['squirrel', 4], ['prairie', 5]];
  bigFaceV2(g, c[0], c[1] - 20, 150, { outfit: YOU, expr: back ? 'surprised' : 'smile', look: [0, 0] });
  A.forEach(([kind, i]) => {
    const a = -Math.PI / 2 + i / A.length * Math.PI * 2, x = c[0] + Math.cos(a) * R * 1.45, y = c[1] + Math.sin(a) * R * 0.9;
    const k = ease.out(prog(t, 0.3 + i * 0.25, 0.8 + i * 0.25));
    const from = back ? [x, y] : c, to = back ? c : [x, y];
    if (k > 0) { const ex = lerp(from[0], to[0], 0.12 + 0.6 * k), ey = lerp(from[1], to[1], 0.12 + 0.6 * k), sx = lerp(from[0], to[0], 0.12), sy = lerp(from[1], to[1], 0.12); seg(g, [[sx, sy], [ex, ey]], 10, back ? '#ff7a4a' : '#4a8ad0'); const ang = Math.atan2(ey - sy, ex - sx); poly(g, [[ex + Math.cos(ang) * 22, ey + Math.sin(ang) * 22], [ex + Math.cos(ang + 2.4) * 22, ey + Math.sin(ang + 2.4) * 22], [ex + Math.cos(ang - 2.4) * 22, ey + Math.sin(ang - 2.4) * 22]], back ? '#ff7a4a' : '#4a8ad0'); }
    circle(g, x, y, 120, '#ffffff'); g.strokeStyle = alpha('#3a2a4a', 0.15); g.lineWidth = 6; g.beginPath(); g.arc(x, y, 120, 0, Math.PI * 2); g.stroke();
    const f = x > c[0] ? -1 : 1, o = { x, y: y + 70, facing: f, rim: false, shadow: false, t };
    if (kind === 'dog') dog(g, { ...o, s: 0.85, y: y + 100 }); if (kind === 'cat') cat(g, { ...o, s: 1.05 }); if (kind === 'crow') crow(g, { ...o, s: 2.1, y: y + 50 });
    if (kind === 'pigeon') pigeon(g, { ...o, s: 2.1, y: y + 50 }); if (kind === 'squirrel') squirrel(g, { ...o, s: 1.6 }); if (kind === 'prairie') prairieDog(g, { ...o, s: 1.4, y: y + 70 });
  });
}
registerShot('s014', { draw(g, t, info) { hub(g, t, false); } });
registerShot('s015', { draw(g, t, info) { hub(g, t, true); } });

// s016 — "There's no off switch. Not for a second."  the OFF switch doesn't work
registerShot('s016', { draw(g, t, info) {
  const cam = drift(t, info.dur, { z: 1.0 }, { z: 1.06 });
  g.fillStyle = '#f2ece2'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  layer(g, cam, 1, (g) => {
    g.fillStyle = alpha('#d8cfc0', 0.6); for (let x = -E.W; x < E.W * 2; x += 46) g.fillRect(x, -E.H, 3, E.H * 3);
    const flick = ease.inOut(prog(t, 0.7, 1.0));
    offSwitch(g, 960, 540, 1.3, { k: flick });
    const hy = lerp(-200, 380 + flick * 180, ease.out(prog(t, 0.2, 0.7))) - (t > 1.2 ? (t - 1.2) * 300 : 0);
    g.save(); g.translate(960, hy); seg(g, [[0, -700], [0, -60]], 70, '#2E72D2'); circle(g, 0, -10, 46, '#16121a'); g.restore();
  });
  const B = ['woof', 'MINE!', 'meow', 'caw caw', 'peanut?', 'HEY YOU'];
  B.forEach((b, i) => say(g, b, i % 2 ? 1500 : 420, 220 + Math.floor(i / 2) * 260, t, 1.3 + i * 0.32, null, null, { size: 38 }));
} });

// s017 — "That part matters later."  you, worried, bubbles orbit your head
registerShot('s017', { draw(g, t, info) {
  const cam = push(t, info.dur, F(900, 700, 1.75), F(900, 690, 1.9));
  layer(g, cam, 1, (g) => { kitchen(g, t, { x: 0, y: 0, z: 1 }); person(g, { x: 900, y: GY() + 40, s: 1.6, facing: 1, outfit: YOU, pose: breathe(POSES.think, t, 1, 4), expr: 'worried', look: [0.4, -0.5], rim: RIM }); });
  for (let i = 0; i < 5; i++) { const a = t * 1.2 + i * 1.26; say(g, ['…', 'mine', 'woof', 'hey', '!!'][i], 960 + Math.cos(a) * 520, 260 + Math.sin(a) * 130, 1, 0, null, null, { size: 30 }); }
} });
