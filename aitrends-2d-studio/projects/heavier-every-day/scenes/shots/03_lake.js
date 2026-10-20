// shots/03_lake.js — the good days (nobody can push you, the tug of war), Grandpa and the lake (flashback: he taught you
// to float), day 3: you jump off the dock and sink, walk out along the bottom, the towel.
import { E, V, S, registerShot, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, radGrad, text, FONTS, shake, rng, talkAmount } from '/engine/core.js';
import { drawFigure, POSES, breathe, walkPose, headPos } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { room, bedroom } from '/projects/stronger-couldnt-stop/scenes/sets/home.js';
import { lake, underwater, schoolHall } from '../sets/world.js';
import { YOU, KIDYOU, GRANDPA, YGRANDPA, COACH, KIDS } from '../cast.js';
import { heroFace, hand, chip, impact, wt, CORAL, weightBadge, grandpaFace, grandpa, FLOORSIT } from '../lib.js';

const WARM = '#ffd8a8', SUNL = '#fff2c8';
// old-photo grade for the flashbacks: desaturate, warm, vignette
const sepia = (g) => { veil(g, '#808080', 0.55, 'saturation'); veil(g, '#ffc88a', 0.42, 'multiply'); veil(g, '#ffb060', 0.14, 'overlay'); veil(g, '#fff0d8', 0.1); g.fillStyle = radGrad(g, E.W / 2, E.H / 2, E.H * 0.35, E.W * 0.72, ['rgba(70,40,10,0)', 'rgba(70,40,10,.45)']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); };
// school gym: wood floor, a hoop, a banner
function schoolGym(g, t, cam) {
  const R = room(g, t, cam, { wall: '#d8c8a0', floor: '#c8935a', window: { x: E.W / 2 + 420, w: 700, h: 300, y: 900, cols: 4, rows: 1 } }), { GY, CX } = R;
  layer(g, cam, 0.62, (g) => { rr(g, CX - 760, GY - 820, 620, 110, 10); g.fillStyle = '#C8402C'; g.fill(); text(g, 'GO TIGERS!', CX - 450, GY - 764, { size: 60, color: '#ffffff', font: FONTS.ui, weight: 900, spacing: 6 });
    seg(g, [[CX - 40, GY - 900], [CX - 40, GY - 640]], 12, '#6a6f7e'); rr(g, CX - 160, GY - 700, 240, 150, 6); g.fillStyle = '#ffffff'; g.fill(); g.strokeStyle = '#C8402C'; g.lineWidth = 6; g.strokeRect(CX - 90, GY - 650, 100, 70); ring(g, CX - 40, GY - 560, 46, 7, '#E8892A');
    for (let i = 0; i < 4; i++) { g.fillStyle = shade('#8a6a4a', -i * 0.06); g.fillRect(CX + 200, GY - 120 - i * 70, 900, 70); } });
  layer(g, cam, 1, (g) => { g.strokeStyle = alpha('#ffffff', 0.7); g.lineWidth = 6; g.beginPath(); g.ellipse(CX, GY + 60, 260, 40, 0, 0, Math.PI * 2); g.stroke(); seg(g, [[CX, GY + 10], [CX, GY + 140]], 6, alpha('#ffffff', 0.7)); });
  return R;
}
// side-view sneaker, toe to the right (sole at y)
function sneaker(g, x, y, s = 1) {
  g.save(); g.translate(x, y); g.scale(s, s); rr(g, -120, -110, 260, 96, 44); g.fillStyle = '#f4f2ee'; g.fill(); g.strokeStyle = '#14161e'; g.lineWidth = 6; g.stroke();
  rr(g, -130, -30, 290, 34, 16); g.fillStyle = '#d63a2a'; g.fill(); g.fillStyle = YOU.color; poly(g, [[-60, -104], [40, -104], [96, -40], [-30, -40]]);
  seg(g, [[-70, -110], [-60, -320]], 70, '#1F242D'); for (let i = 0; i < 3; i++) seg(g, [[-6 + i * 26, -108], [18 + i * 26, -84]], 7, '#14161e'); g.restore();
}
// striped beach towel draped over the shoulders at (x, y); k 0..1 = how far it's wrapped
function towel(g, x, y, w, k = 1) {
  if (k <= 0) return; g.save(); g.translate(x, y); g.globalAlpha *= clamp(k * 3); const h = w * 0.55 * ease.out(clamp(k));
  g.beginPath(); g.moveTo(-w / 2, 0); g.quadraticCurveTo(0, -w * 0.18, w / 2, 0); g.lineTo(w / 2 - 10, h); g.quadraticCurveTo(0, h + w * 0.08, -w / 2 + 10, h); g.closePath(); g.save(); g.clip();
  for (let i = -6; i < 8; i++) { g.fillStyle = i % 2 ? '#ffffff' : '#D64A33'; g.fillRect(-w / 2 + i * w / 10, -w, w / 10, w * 2); } g.restore();
  g.strokeStyle = 'rgba(20,16,28,.6)'; g.lineWidth = Math.max(3, w * 0.02); g.stroke(); g.restore();
}
// a big thumbs-up from the lower right (fist at x, y)
function thumbsUp(g, x, y, s, o = {}) {
  const ink = S().ink, rim = o.rim || WARM, draw = (dx, dy, c, sl) => { seg(g, [[x + 40 * s + dx, y + 60 * s + dy], [x + 320 * s + dx, y + 440 * s + dy]], 120 * s, sl); rr(g, x - 76 * s + dx, y - 44 * s + dy, 156 * s, 136 * s, 44 * s); g.fillStyle = c; g.fill(); rr(g, x - 52 * s + dx, y - 170 * s + dy, 60 * s, 160 * s, 30 * s); g.fill(); };
  draw(-7, -7, rim, rim); draw(0, 0, ink, o.sleeve || YOU.color); g.strokeStyle = alpha('#ffffff', 0.22); g.lineWidth = 5 * s; for (let i = 0; i < 3; i++) { g.beginPath(); g.moveTo(x - 66 * s, y + (4 + i * 30) * s); g.lineTo(x + 50 * s, y + (4 + i * 30) * s); g.stroke(); }
}
// falling water drips around a figure (x = centre, y = feet, h = figure height)
function drips(g, t, x, y, h, n = 14, seed = 3) { const r = rng(seed); for (let i = 0; i < n; i++) { const px = x + (r() - 0.5) * h * 0.4, py0 = y - r() * h * 0.9, sp = 300 + r() * 300, py = py0 + ((t * sp + r() * 200) % (y - py0 + 40)); circle(g, px, py, 4 + r() * 4, alpha('#cfefff', 0.85)); } }
// close-up of the lake water (side view): sky, far pines, water surface at SY; inWater draws figures, then the front water
function waterClose(g, t, cam, inWater, o = {}) {
  const SY = o.SY ?? E.H * 0.62;
  layer(g, cam, 0.1, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, SY, ['#4a9ae0', '#8ec8f0', '#dff2ff']); g.fillRect(-E.W, -E.H, E.W * 3, SY + E.H); FX.sun(g, E.W * 0.82, E.H * 0.16, 60, '#fffbe8', '#fff2c0', 5); FX.clouds(g, { y: 60, h: 160, color: '#ffffff', a: 0.5, seed: 4 }); });
  layer(g, cam, 0.35, (g) => { for (let i = 0; i < 18; i++) FX.pine(g, -E.W * 0.5 + i * 170 + (i % 3) * 40, SY - 4, 0.6 + (i % 4) * 0.12, shade('#2f5a3a', -(i % 3) * 0.08)); });
  layer(g, cam, 0.7, (g) => { g.fillStyle = linGrad(g, 0, SY - 10, 0, E.H * 1.3, ['#8ad4ee', '#2a7ab0']); g.fillRect(-E.W, SY - 10, E.W * 3, E.H * 2); });
  layer(g, cam, 1, (g) => { inWater(g, SY);
    g.fillStyle = linGrad(g, 0, SY, 0, E.H * 1.3, [alpha('#6ac0e4', 0.72), alpha('#1a5a90', 0.92)]); g.fillRect(-E.W, SY, E.W * 3, E.H * 2);
    const r = rng(6); for (let i = 0; i < 40; i++) { const y = SY + 6 + r() * 400, x = ((r() * E.W * 2 + t * 30) % (E.W * 2.4)) - E.W * 0.2; g.fillStyle = alpha('#ffffff', 0.18 + r() * 0.2); g.fillRect(x, y, 40 + r() * 90, 3); }
    g.fillStyle = alpha('#ffffff', 0.7); g.fillRect(-E.W, SY - 2, E.W * 3, 5); });
  return { SY };
}

// s033 — "At first, it's kind of awesome."  BIG FACE: grinning, thumbs up
registerShot('s033', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => schoolHall(g, t, { z: 1.3, x: 160, y: -60 })); glow(g, E.W * 0.42, E.H * 0.42, 800, '#fff2d0', 0.35);
  heroFace(g, E.W * 0.4, E.H * 0.6, 300 * (1 + 0.04 * k), { outfit: YOU, expr: 'joy', look: [0.3, 0], rimColor: WARM, rimSide: 1 });
  thumbsUp(g, E.W * 0.76, E.H * 0.58 + 300 * (1 - ease.outBack(prog(t, 0.15, 0.55))), 1.5);
  weightBadge(g, { day: 2, k: 1 });
} });
// s034 — "Nobody can push you over."  SCHOOL HALL: a big kid shoves you and bounces off
registerShot('s034', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.35 + 0.05 * k, x: 60, y: 120 }, R = schoolHall(g, t, cam), hit = 0.6, a = t - hit, [sx, sy] = shake(t, a > 0 && a < 0.3 ? 8 : 0, 24);
  layer(g, { ...cam, x: cam.x + sx, y: cam.y + sy }, 1, (g) => {
    drawFigure(g, { x: R.CX - 160, y: R.GY, s: 1.4, facing: 1, outfit: YOU, pose: breathe(a > 0.25 ? POSES.crossArms : POSES.stand, t), expr: a > 0.25 ? 'smirk' : 'neutral', look: [1, 0], rim: { color: WARM, dir: [-0.6, -0.6] } });
    let x, y = R.GY, pose;
    if (a < 0) { x = lerp(R.CX + 760, R.CX + 10, ease.in(prog(t, 0, hit))); pose = walkPose(t * 11, { run: true }); }
    else { const b = clamp(a / 0.5); x = R.CX + 10 + 460 * ease.out(b); y = R.GY - Math.sin(Math.PI * b) * 130 + (b >= 1 ? 66 * 1.6 : 0); pose = b < 1 ? POSES.fall : FLOORSIT; }
    drawFigure(g, { x, y, s: 1.6, facing: -1, outfit: KIDS[3], pose, expr: a > 0 ? 'shocked' : 'angry', rim: { color: WARM, dir: [0.6, -0.6] } });
    impact(g, R.CX - 20, R.GY - 250, a, { r: 170 }); });
  weightBadge(g, { day: 2, k: 1 });
} });
// s035 — "In gym class, the whole team pulls on the other end of the rope…"  GYM: tug of war, 1 vs the class
registerShot('s035', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.05 + 0.06 * k, x: 80, y: 80 }, R = schoolGym(g, t, cam), RY = R.GY - 150, pull = 0.5 + 0.5 * Math.sin(t * 9);
  layer(g, cam, 1, (g) => {
    const yx = R.CX - 640; seg(g, [[yx + 40, RY], [R.CX + 980, RY - 6]], 12, '#c8a46a'); for (let i = 0; i < 24; i++) seg(g, [[yx + 60 + i * 64, RY - 5], [yx + 80 + i * 64, RY + 5]], 3, '#8a6a3a');
    poly(g, [[R.CX - 20, RY], [R.CX + 20, RY], [R.CX, RY + 70]], CORAL());
    drawFigure(g, { x: yx, y: R.GY, s: 1.35, facing: 1, outfit: YOU, pose: breathe(POSES.holdFront, t), expr: 'smirk', look: [1, 0], rim: { color: WARM, dir: [-0.6, -0.6] } });
    for (let i = 0; i < 6; i++) { const x = R.CX + 260 + i * 120 + 3 * Math.sin(t * 20 + i); drawFigure(g, { x, y: R.GY, s: 1.25, facing: -1, rot: 0.32 + 0.04 * pull, outfit: KIDS[i], pose: POSES.holdFront, expr: i % 2 ? 'angry' : 'nervous', rim: { color: WARM, dir: [0.6, -0.6] } }); }
    drawFigure(g, { x: R.CX - 120, y: R.GY + 120, s: 1.3, facing: 1, outfit: COACH, pose: POSES.crossArms, expr: 'neutral', look: [1, -0.3], rim: { color: WARM, dir: [-0.6, -0.6] } }); });
  chip(g, '1  vs.  THE WHOLE CLASS', E.W / 2, E.H * 0.84, { size: 40, k: prog(t, 0.3, 0.7) });
  weightBadge(g, { day: 2, k: 1 });
} });
// s036 — "…and you don't move an inch."  CLOSE: your sneakers on the centre line; the coach's whistle drops
registerShot('s036', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0 + 0.04 * k, x: 0, y: 0 }, f = wt('inch', info, t, 1.2);
  blurLayer(g, 10, (g) => schoolGym(g, t, { z: 1.8, x: 200, y: 260 })); glow(g, E.W * 0.5, E.H * 0.3, 900, '#fff2d0', 0.3);
  const gy = E.H * 0.78; g.fillStyle = linGrad(g, 0, gy - 40, 0, E.H, ['#d8a066', '#9a6a3a']); g.fillRect(0, gy - 40, E.W, E.H); for (let i = 0; i < 12; i++) seg(g, [[i * 180 - 40, gy - 40], [i * 180 - 160, E.H]], 3, 'rgba(0,0,0,.12)');
  g.fillStyle = alpha('#ffffff', 0.85); poly(g, [[E.W * 0.47, gy - 40], [E.W * 0.53, gy - 40], [E.W * 0.57, E.H], [E.W * 0.43, E.H]]);
  sneaker(g, E.W * 0.36, gy + 40, 1.3); sneaker(g, E.W * 0.22, gy + 10, 1.15);
  seg(g, [[E.W * 0.2, gy - 520], [E.W + 100, gy - 540 + 4 * Math.sin(t * 30)]], 26, '#c8a46a');
  const wa = t - f; if (wa > -0.4) { const p = clamp((wa + 0.4) / 0.5), wx = E.W * 0.74, wy = lerp(-60, gy - 10, ease.in(p)) - (p >= 1 ? Math.abs(Math.sin(wa * 9)) * 50 * Math.exp(-wa * 4) : 0);
    g.save(); g.translate(wx, wy); g.rotate(p * 2.4); rr(g, -46, -22, 92, 44, 20); g.fillStyle = '#c8ccd6'; g.fill(); circle(g, 26, 0, 10, '#6a6f7e'); seg(g, [[-46, 0], [-140, -60]], 4, '#C8402C'); g.restore(); }
  chip(g, 'MOVED: 0 cm', E.W * 0.36, E.H * 0.2, { size: 44, k: prog(t, 0.2, 0.5) });
} });
// s037 — "But there's one person you really want to show."  you pick up a framed photo
registerShot('s037', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.45 + 0.12 * ease.inOut(k), x: -40, y: 150 }, R = bedroom(g, t, cam, { calendar: 'WED' }), lift = ease.inOut(prog(t, 0.2, 1.2));
  layer(g, cam, 1, (g) => { const x = R.CX - 120, s = 1.45; rr(g, x + 90, R.GY - 200, 260, 200, 8); g.fillStyle = '#8a5a3a'; g.fill();
    const pose = lift < 1 ? { ...POSES.reach, hF: [lerp(70, 40, lift), lerp(-80, -160, lift)], eF: [40, -130] } : POSES.holdFront;
    drawFigure(g, { x, y: R.GY, s, facing: 1, outfit: YOU, pose: breathe(pose, t), expr: lift > 0.8 ? 'smile' : 'neutral', look: [1, 0.5], rim: { color: WARM, dir: [-0.6, -0.6] } });
    const fx = x + lerp(160, 52, lift) * s, fy = lerp(R.GY - 240, R.GY - 175 * s, lift); g.save(); g.translate(fx, fy); g.rotate(-0.1 * lift); rr(g, -50, -64, 100, 80, 6); g.fillStyle = '#6a4a30'; g.fill(); g.fillStyle = '#8ad4ee'; g.fillRect(-40, -54, 80, 60); g.fillStyle = GRANDPA.color; g.fillRect(-20, -30, 14, 36); g.fillStyle = YOU.color; g.fillRect(6, -18, 10, 24); g.restore(); });
} });
// s038 — "Your grandpa."  INSERT: the photo — you and Grandpa on the dock, his red lifeguard jacket
registerShot('s038', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 14, (g) => bedroom(g, t, { z: 1.6, x: 0, y: 160 })); glow(g, E.W / 2, E.H / 2, 900, '#fff2d0', 0.3);
  const pw = 1180, ph = pw * 9 / 16, sc = 1.0 + 0.05 * k; g.save(); g.translate(E.W / 2, E.H * 0.52); g.rotate(-0.03); g.scale(sc, sc);
  rr(g, -pw / 2 - 50, -ph / 2 - 50, pw + 100, ph + 100, 14); g.fillStyle = '#6a4a30'; g.fill(); g.strokeStyle = '#4a3020'; g.lineWidth = 8; g.stroke(); g.fillStyle = '#f4ede0'; g.fillRect(-pw / 2 - 14, -ph / 2 - 14, pw + 28, ph + 28);
  g.save(); g.beginPath(); g.rect(-pw / 2, -ph / 2, pw, ph); g.clip(); g.translate(-pw / 2, -ph / 2); g.scale(pw / E.W, pw / E.W);
  const cam = { z: 2.2, x: -233, y: 20 }, L = lake(g, 0, cam, { noChair: true });
  layer(g, cam, 0.9, (g) => { const y = L.DOCK[2] - 22; grandpa(g, { x: 700, y, s: 1.5, facing: 1, outfit: GRANDPA, pose: { ...POSES.stand, hB: [30, -170], eB: [20, -150] }, expr: 'happy', rim: { color: SUNL, dir: [0.6, -0.6] } });
    drawFigure(g, { x: 800, y, s: 1.5, facing: -1, outfit: KIDYOU, pose: POSES.cheer, expr: 'joy', rim: { color: SUNL, dir: [0.6, -0.6] } }); });
  veil(g, '#ffe0b0', 0.15); g.restore();
  g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = alpha('#ffffff', 0.12); poly(g, [[-pw / 2, -ph / 2], [-pw / 2 + 300, -ph / 2], [-pw / 2, ph / 2 - 100]]); g.restore(); g.restore();
  chip(g, 'GRANDPA', E.W / 2, E.H * 0.9, { size: 44, k: prog(t, wt('grandpa', info, t, 0.2), wt('grandpa', info, t, 0.2) + 0.3) });
} });
// s039 — "Every summer since you were five, he's taken you to the lake."  SEPIA: little you and Grandpa walk the dock
registerShot('s039', { draw(g, t, info) {
  const k = t / info.dur, x = 160 + 260 * k, cam = { z: 1.4, x: (x + 120 - E.W / 2) / 0.9, y: 120 }, L = lake(g, t, cam, {});
  layer(g, cam, 0.9, (g) => { const y = L.DOCK[2] - 22; grandpa(g, { x, y, s: 1.4, facing: 1, outfit: GRANDPA, pose: walkPose(t * 6), expr: 'smile', look: [0.4, 0.4], rim: { color: SUNL, dir: [0.6, -0.6] } });
    drawFigure(g, { x: x + 120, y, s: 1.4, facing: 1, outfit: KIDYOU, pose: walkPose(t * 8 + 1, { run: true }), expr: 'joy', rim: { color: SUNL, dir: [0.6, -0.6] } }); });
  sepia(g); chip(g, 'EVERY SUMMER · AGE 5', E.W / 2, E.H * 0.84, { size: 40, k: prog(t, 0.3, 0.7) });
} });
// s040 — "He used to be a lifeguard."  SEPIA: young Grandpa on the tall lifeguard chair, whistle
registerShot('s040', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.3, x: -100, y: 40 }; lake(g, t, cam, { noChair: true });
  const cx = E.W * 0.5 + 30 * k, sy = E.H * 0.68, gs = 2.5, gy = sy + 72 * gs - 10;
  seg(g, [[cx - 170, sy - 600], [cx - 170, sy]], 14, '#8a8a92'); g.fillStyle = '#d63a2a'; poly(g, [[cx - 560, sy - 500], [cx - 170, sy - 640], [cx + 220, sy - 500]]); g.fillStyle = '#ffffff'; poly(g, [[cx - 300, sy - 545], [cx - 170, sy - 640], [cx - 40, sy - 545]]);
  for (const sx of [-1, 1]) seg(g, [[cx + sx * 240, E.H + 60], [cx + sx * 150, sy]], 26, '#f4efe6'); for (let i = 1; i < 3; i++) seg(g, [[cx - 230 + i * 30, sy + 380 - i * 130], [cx + 230 - i * 30, sy + 380 - i * 130]], 16, '#f4efe6');
  rr(g, cx - 150, sy - 330, 36, 330, 8); g.fillStyle = '#e8e2d6'; g.fill(); rr(g, cx - 180, sy - 16, 360, 32, 8); g.fill();
  const pose = { ...POSES.sit, eF: [24, -150], hF: [16, -172] }, go = { x: cx - 60, y: gy, s: gs, facing: 1, pose };
  grandpa(g, { ...go, outfit: YGRANDPA, pose: breathe(pose, t), expr: 'smile', look: [1, 0.2], young: true, rim: { color: SUNL, dir: [0.6, -0.6] } });
  const [hx, hy, hr] = headPos({ ...go, outfit: YGRANDPA }); rr(g, hx + hr * 0.55, hy + hr * 0.25, 54, 26, 10); g.fillStyle = '#c8ccd6'; g.fill(); seg(g, [[hx + hr * 0.6, hy + hr * 0.4], [hx - hr * 0.2, hy + hr * 1.6]], 4, '#2a6ab0');
  rr(g, cx - 160, sy + 60, 320, 70, 10); g.fillStyle = '#d63a2a'; g.fill(); text(g, 'LIFEGUARD', cx, sy + 96, { size: 44, color: '#ffffff', font: FONTS.ui, weight: 900, spacing: 3 });
  sepia(g);
} });
// s041 — "He's the one who taught you to float."  SEPIA: Grandpa waist-deep, little you lying back on his hands
registerShot('s041', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.45 + 0.06 * k, x: -20, y: 40 };
  waterClose(g, t, cam, (g, SY) => { const bob = 6 * Math.sin(t * 2), gx = E.W * 0.52;
    grandpa(g, { x: gx, y: SY + 230, s: 1.9, facing: -1, outfit: GRANDPA, pose: { ...POSES.holdFront, hF: [48, -122], hB: [40, -118] }, expr: 'smile', look: [-0.5, 0.6], rim: { color: SUNL, dir: [0.6, -0.6] } });
    drawFigure(g, { x: gx - 120, y: SY + 4 + bob + 52 * 1.7, s: 1.7, rot: -Math.PI / 2, facing: 1, outfit: KIDYOU, pose: POSES.lie, expr: 'nervous', rim: { color: SUNL, dir: [0, -1] }, shadow: false }); });
  sepia(g);
} });
// s042 — "Lie back. Spread your arms."  SEPIA BIG FACE: Grandpa, warm sun — his line
registerShot('s042', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => lake(g, t, { z: 1.3, x: 200, y: 0 }, { noChair: true })); glow(g, E.W * 0.7, E.H * 0.25, 700, '#fff2c8', 0.5);
  grandpaFace(g, E.W * 0.46, E.H * 0.6, 300 * (1 + 0.04 * k), { expr: 'smile', look: [-0.3, 0.4], talk: talkAmount(info.globalT, 112.08, 118.0), rimColor: SUNL, rimSide: 1 });
  sepia(g);
} });
// s043 — "Trust the water. It'll hold you up."  SEPIA TOP VIEW: little you floats like a star, Grandpa's hands let go
registerShot('s043', { draw(g, t, info) {
  const k = t / info.dur, go = ease.inOut(prog(t, wt('hold', info, t, 1.8) - 0.6, wt('hold', info, t, 1.8) + 0.6));
  g.save(); g.translate(E.W / 2, E.H / 2); g.scale(1.05 + 0.05 * k, 1.05 + 0.05 * k); g.translate(-E.W / 2, -E.H / 2);
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#7ac8e8', '#3a9ac8']); g.fillRect(-100, -100, E.W + 200, E.H + 200);
  const r = rng(5); for (let i = 0; i < 70; i++) { const x = (r() * E.W * 1.2 + t * 14) % (E.W + 200) - 100, y = r() * E.H; g.fillStyle = alpha('#ffffff', 0.12 + r() * 0.25); g.beginPath(); g.ellipse(x, y, 40 + r() * 80, 4, 0, 0, Math.PI * 2); g.fill(); }
  for (let i = 0; i < 3; i++) { const rr2 = ((t * 120 + i * 160) % 480) + 200; ring(g, E.W / 2, E.H * 0.55, rr2, 4, alpha('#ffffff', 0.35 * (1 - rr2 / 680))); }
  const pose = { ...POSES.cheer, hF: [96, -200], eF: [50, -190], hB: [-96, -200], eB: [-50, -190], fF: [40, 0], fB: [-40, 0], kF: [24, -50], kB: [-24, -50] };
  drawFigure(g, { x: E.W / 2, y: E.H * 0.5 + 200 + 4 * Math.sin(t * 2), s: 2.4, facing: 1, outfit: KIDYOU, pose, expr: go > 0.5 ? 'joy' : 'nervous', rim: { color: SUNL, dir: [0.4, -0.8] }, shadow: false });
  for (const sx of [-1, 1]) hand(g, E.W / 2 + sx * (130 + 650 * go), E.H * 0.42, 1.2, { from: [E.W / 2 + sx * (900 + 650 * go), E.H * 0.7], sleeve: GRANDPA.color, open: 1, rim: { color: SUNL, dir: [0, -1] } });
  g.restore(); sepia(g);
} });
// s044 — "So on day three, you run to the end of the dock…"  PRESENT: you sprint down the dock; Grandpa on the shore
registerShot('s044', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.05, x: -80 + 120 * k, y: 40 }, L = lake(g, t, cam, {}), x = lerp(-60, 1160, ease.inOut(k));
  layer(g, cam, 0.9, (g) => drawFigure(g, { x, y: L.DOCK[2] - 22, s: 1.05, facing: 1, outfit: YOU, pose: walkPose(t * 12, { run: true }), expr: 'joy', rim: { color: SUNL, dir: [0.6, -0.6] } }));
  layer(g, cam, 1, (g) => grandpa(g, { x: 60, y: L.GY + 40, s: 1.45, facing: 1, outfit: GRANDPA, pose: breathe(POSES.crossArms, t), expr: 'smile', look: [1, -0.3], rim: { color: SUNL, dir: [0.6, -0.6] } }));
  weightBadge(g, { day: 3, k: 1, flip: prog(t, 0.2, 0.6) });
} });
// s045 — "…and you jump."  you mid-air off the end of the dock
registerShot('s045', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.6, x: (1300 - E.W / 2) / 0.9 + 40 * k, y: 10 }, L = lake(g, t, cam, {}), j = ease.out(prog(t, 0, 1.6)), y0 = L.DOCK[2] - 22;
  layer(g, cam, 0.9, (g) => { const x = lerp(1180, 1560, j), y = y0 - Math.sin(Math.PI * j * 0.85) * 200 + j * 60;
    drawFigure(g, { x, y, s: 1.05, facing: 1, outfit: YOU, pose: POSES.jump, expr: 'joy', rim: { color: SUNL, dir: [0.6, -0.6] }, shadow: false });
    for (let i = 0; i < 8; i++) circle(g, 1180 - 10 * i, y0 + 10, 3, alpha('#cfefff', 0.6)); });
  weightBadge(g, { day: 3, k: 1 });
} });
// s046 — "And you sink."  UNDERWATER: you plunge like a stone, a column of bubbles
registerShot('s046', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.15, x: 0, y: -60 + 120 * k }; underwater(g, t, cam, {});
  layer(g, cam, 1, (g) => { const y = lerp(-100, E.H * 0.74, ease.out(prog(t, 0, info.dur * 0.95))), x = E.W * 0.5;
    const r = rng(7); for (let i = 0; i < 46; i++) { const by = y - 200 - r() * 900 - ((t * 260) % 80), bx = x + (r() - 0.5) * 140 + 14 * Math.sin(t * 6 + i); if (by < y - 140) ring(g, bx, by, 6 + r() * 18, 3, alpha('#e8fff8', 0.7)); }
    for (let i = 0; i < 6; i++) seg(g, [[x - 160 + i * 64, y - 600], [x - 160 + i * 64, y - 320]], 3, alpha('#ffffff', 0.3));
    drawFigure(g, { x, y, s: 1.4, facing: 1, outfit: YOU, pose: POSES.cheer, expr: 'shocked', rim: { color: '#e8fff8', dir: [0, -1] }, shadow: false }); });
  weightBadge(g, { day: 3, k: 1 });
} });
// s047 — "Straight to the bottom."  THUD onto the lakebed, a sand cloud
registerShot('s047', { draw(g, t, info) {
  const land = 0.45, a = t - land, [sx, sy] = shake(t, a > 0 && a < 0.35 ? 14 : 0, 26), cam = { z: 1.25, x: sx, y: 80 + sy }, U = underwater(g, t, cam, {});
  layer(g, cam, 1, (g) => { const x = E.W * 0.5, fy = U.floor(x) + 10, y = a < 0 ? lerp(-200, fy, ease.in(prog(t, 0, land))) : fy;
    drawFigure(g, { x, y, s: 1.4, facing: 1, outfit: YOU, pose: a < 0 ? POSES.cheer : a < 0.3 ? POSES.crouch : breathe(POSES.stand, t), expr: a < 0.3 ? 'shocked' : 'sad', look: [0, -1], rim: { color: '#e8fff8', dir: [0, -1] }, shadow: false });
    if (a > 0) { const r = rng(9); for (let i = 0; i < 22; i++) { const ang = Math.PI + r() * Math.PI, d = (120 + r() * 380) * ease.out(clamp(a / 1.2)), rad = (40 + r() * 70) * (0.6 + 0.4 * clamp(a)); circle(g, x + Math.cos(ang) * d * 1.4, fy + Math.sin(ang) * d * 0.35 - 20, rad, alpha('#d8c090', 0.4 * clamp(1.6 - a))); } }
    impact(g, x, fy - 10, a, { r: 200, color: '#fff2c8' }); });
  chip(g, '560 kg', E.W * 0.5, V(150, 260), { size: 44, k: prog(t, 0.6, 0.9) }); weightBadge(g, { day: 3, k: 1 });
} });
// s048 — "Five meters down, you look up at the light…"  LOOKING UP from the bottom: bright surface, light rays
registerShot('s048', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.12 - 0.08 * k, x: 0, y: 40 - 60 * k }; underwater(g, t, cam, { up: true });
  layer(g, cam, 0.15, (g) => { g.fillStyle = alpha('#203040', 0.6); g.fillRect(-200, 90, 1100, 46); for (let i = 0; i < 5; i++) g.fillRect(-100 + i * 220, 130, 36, 260); });
  layer(g, cam, 1, (g) => { const x = E.W * 0.38, y = E.H * 0.86 + 10;
    drawFigure(g, { x, y, s: 1.35, facing: 1, outfit: YOU, pose: breathe({ ...POSES.stand, head: [8, -212] }, t), expr: 'awe', look: [0.3, -1], rim: { color: '#e8fff8', dir: [0.2, -1] }, shadow: false });
    for (let i = 0; i < 6; i++) { const by = y - 330 - ((t * 140 + i * 120) % 700); ring(g, x + 30 + 10 * Math.sin(t * 4 + i), by, 6 + (i % 3) * 4, 3, alpha('#e8fff8', 0.8)); }
    UI.dimension(g, t, { x1: E.W * 0.62, y1: 150, x2: E.W * 0.62, y2: y, str: '5 m', start: 0.3 }); });
  chip(g, '5 m DOWN', E.W * 0.74, E.H * 0.5, { size: 48, k: prog(t, 0.6, 1.0) });
  weightBadge(g, { day: 3, k: 1 });
} });
// s049 — "…and then you walk out of the lake, along the bottom."  CUT-AWAY: you walk up the slope under the water
registerShot('s049', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0, x: -40 + 80 * k, y: 0 }, SY = E.H * 0.34; underwater(g, t, cam, {});
  const slope = (x) => x < E.W * 0.3 ? E.H * 0.92 : x < E.W * 0.86 ? lerp(E.H * 0.92, SY + 30, ease.inOut((x - E.W * 0.3) / (E.W * 0.56))) : SY + 30 - (x - E.W * 0.86) * 0.1;
  layer(g, cam, 1, (g) => {
    g.fillStyle = linGrad(g, 0, -E.H, 0, SY, ['#4a9ae0', '#8ec8f0', '#dff2ff']); g.fillRect(-E.W, -E.H, E.W * 3, SY + E.H); FX.sun(g, E.W * 0.8, SY - 220, 50, '#fffbe8', '#fff2c0', 4);
    for (let i = 0; i < 16; i++) FX.pine(g, -400 + i * 170, SY - 2, 0.55 + (i % 3) * 0.1, shade('#2f5a3a', -(i % 3) * 0.08));
    g.fillStyle = alpha('#ffffff', 0.85); g.fillRect(-E.W, SY - 3, E.W * 3, 6);
    g.fillStyle = linGrad(g, 0, SY, 0, E.H, ['#e8d0a0', '#a08060']); g.beginPath(); g.moveTo(-E.W, E.H * 2); for (let x = -E.W; x <= E.W * 2; x += 30) g.lineTo(x, slope(x)); g.lineTo(E.W * 2, E.H * 2); g.fill();
    const x = lerp(E.W * 0.12, E.W * 0.8, k), y = slope(x); for (let i = 1; i < 8; i++) { const fx = x - i * 90; if (fx > E.W * 0.05) { g.fillStyle = alpha('#6a5040', 0.5); g.beginPath(); g.ellipse(fx, slope(fx) + 4, 22, 7, 0, 0, Math.PI * 2); g.fill(); } }
    drawFigure(g, { x, y: y + 6, s: 1.2, facing: 1, outfit: YOU, pose: walkPose(t * 4), expr: 'determined', rim: { color: '#e8fff8', dir: [0, -1] }, shadow: false });
    for (let i = 0; i < 5; i++) { const by = y - 260 - ((t * 120 + i * 90) % 400); if (by > SY) ring(g, x + 20, by, 5 + i % 3 * 3, 2.5, alpha('#e8fff8', 0.8)); } });
  weightBadge(g, { day: 3, k: 1 });
} });
// s050 — "Grandpa doesn't say a word."  SHORE: you come out dripping; Grandpa frozen
registerShot('s050', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.55, x: -700 + 30 * k, y: 300 }, L = lake(g, t, cam, {}), x = lerp(560, 420, ease.out(k)), y = L.GY + 50;
  layer(g, cam, 1, (g) => { grandpa(g, { x: 40, y: L.GY + 30, s: 1.3, facing: 1, outfit: GRANDPA, pose: breathe(POSES.stand, t, 0.3), expr: 'worried', look: [1, 0.1], rim: { color: SUNL, dir: [0.6, -0.6] } });
    drawFigure(g, { x, y, s: 1.3, facing: -1, outfit: YOU, pose: walkPose(t * 3), expr: 'sad', look: [-1, 0.3], rim: { color: SUNL, dir: [0.6, -0.6] } }); drips(g, t, x, y, 300, 14, 3);
    g.fillStyle = alpha('#2a7ab0', 0.35); g.beginPath(); g.ellipse(x + 30, y + 6, 90, 14, 0, 0, Math.PI * 2); g.fill(); });
} });
// s051 — "He just wraps a towel around your shoulders."
registerShot('s051', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.75 + 0.08 * k, x: -720, y: 220 }, L = lake(g, t, cam, {}), w = ease.inOut(prog(t, 0.3, 1.8)), s = 1.3;
  layer(g, cam, 1, (g) => { const yx = 330, y = L.GY + 40;
    grandpa(g, { x: 150, y: L.GY + 30, s, facing: 1, outfit: GRANDPA, pose: breathe(w < 1 ? { ...POSES.holdFront, hF: [lerp(36, 110, w), lerp(-152, -176, w)], hB: [lerp(30, 104, w), lerp(-154, -172, w)] } : POSES.sad, t, 0.4), expr: 'sad', look: [1, 0.2], rim: { color: SUNL, dir: [0.6, -0.6] } });
    drawFigure(g, { x: yx, y, s, facing: -1, outfit: YOU, pose: breathe(POSES.sad, t), expr: 'sad', look: [-0.6, 0.6], rim: { color: SUNL, dir: [0.6, -0.6] } }); drips(g, t, yx, y, 300, 8, 4);
    towel(g, lerp(150 + 60 * s, yx - 4 * s, w), lerp(L.GY - 150 * s, y - 166 * s, w), 112 * s, 0.3 + 0.7 * w); });
} });
// s052 — "The water doesn't hold you up anymore."  BIG FACE: wet, sad, the towel
registerShot('s052', { draw(g, t, info) {
  const k = t / info.dur, r = 300 * (1 + 0.04 * k), cx = E.W * 0.5, cy = E.H * 0.6; blurLayer(g, 14, (g) => lake(g, t, { z: 1.4, x: 300, y: 100 }, {})); veil(g, '#3a5a80', 0.18);
  heroFace(g, cx, cy, r, { outfit: YOU, expr: 'sad', look: [0, 0.5], rimColor: '#cfefff', rimSide: -1 });
  towel(g, cx, cy + r * 1.05, r * 2.6, 1);
  const rr2 = rng(2); for (let i = 0; i < 5; i++) { const dx = (rr2() - 0.5) * r * 1.2, dy = -r * 0.7 + ((t * 70 + rr2() * 200) % (r * 1.1)); circle(g, cx + dx, cy + dy, 9, alpha('#e8fbff', 0.8)); }
} });
