// shots/01_hook.js — Day 7: your shoe sinks into the road; day 8: the car roof caves in; day 9: the 10 t bridge; midnight;
// title card.
import { E, V, S, registerShot, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake, rng } from '/engine/core.js';
import { drawFigure, POSES, breathe, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { street } from '/projects/see-10-seconds/scenes/sets/street.js';
import { bedroom } from '/projects/stronger-couldnt-stop/scenes/sets/home.js';
import { river, house } from '../sets/world.js';
import { YOU, MOM } from '../cast.js';
import { heroFace, weightBadge, midnightClock, limitSign, footprint, cracks, impact, debris, car, wt, GOLD, CORAL } from '../lib.js';

const WARM = '#ffd8a8';
// big side-view sneaker (toe to the right), sole at y
function shoe(g, x, y, s = 1) {
  g.save(); g.translate(x, y); g.scale(s, s);
  seg(g, [[-60, -160], [-40, -460]], 80, '#3a4a6a'); seg(g, [[-60, -160], [-55, -230]], 96, '#2a3550');
  rr(g, -150, -150, 330, 120, 50); g.fillStyle = '#f4f2ee'; g.fill(); g.strokeStyle = '#14161e'; g.lineWidth = 6; g.stroke();
  rr(g, -160, -50, 360, 52, 22); g.fillStyle = '#d63a2a'; g.fill(); g.fillStyle = YOU.color; poly(g, [[-80, -140], [60, -140], [120, -60], [-40, -60]]);
  for (let i = 0; i < 4; i++) seg(g, [[-10 + i * 30, -150], [20 + i * 30, -120]], 8, '#14161e'); g.restore();
}
// asphalt close-up with a shoe sunk by d (px); returns ground y
function asphaltClose(g, t, d, o = {}) {
  blurLayer(g, 14, (g) => street(g, t, { z: 1.4, x: 0, y: 140 }, { mood: 'golden', seed: 41 })); glow(g, E.W * 0.5, E.H * 0.3, 900, '#ffe2b0', 0.45);
  const gy = E.H * 0.7; g.fillStyle = linGrad(g, 0, gy, 0, E.H, ['#4a4650', '#2a2830']); g.fillRect(0, gy, E.W, E.H - gy);
  const r = rng(3); for (let i = 0; i < 160; i++) circle(g, r() * E.W, gy + r() * (E.H - gy), 2 + r() * 3, alpha(r() < 0.5 ? '#6a6670' : '#1e1c24', 0.6));
  g.fillStyle = 'rgba(255,240,210,.35)'; g.fillRect(0, gy, E.W, 3);
  const cx = E.W * 0.5 + (o.dx || 0); poly(g, [[cx - 330 - d * 0.6, gy], [cx - 220, gy - 20 - d * 0.18], [cx + 260, gy - 20 - d * 0.18], [cx + 380 + d * 0.6, gy]], '#5a5660');
  shoe(g, cx, gy + d, 1.2);
  g.fillStyle = '#3a3640'; poly(g, [[cx - 260 - d * 0.5, gy], [cx - 200, gy - 6 - d * 0.1], [cx + 230, gy - 6 - d * 0.1], [cx + 330 + d * 0.5, gy], [cx + 330 + d * 0.5, gy + 300], [cx - 260 - d * 0.5, gy + 300]]);
  cracks(g, cx, gy + 4, 220 + d, clamp(d / 120), { seed: 5, color: 'rgba(20,18,24,.9)', w: 5, arms: 10, rings: 1 });
  return gy;
}

// s001 — "Day seven."  FRAME 1: a sneaker already sinking into the asphalt
registerShot('s001', { draw(g, t, info) {
  const d = 10 + 50 * ease.out(prog(t, 0, 1.4)); asphaltClose(g, t, d); weightBadge(g, { day: 7, k: prog(t, 0.05, 0.3) });
} });
// s002 — "You take one step..."  LOW ANGLE: your foot comes down and the road dents
registerShot('s002', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.5, x: -120, y: 260 }, { GY, CX } = street(g, t, cam, { mood: 'golden', seed: 41 }), step = prog(t, 0.2, 1.2);
  layer(g, cam, 1, (g) => { for (let i = 0; i < 3; i++) footprint(g, CX - 620 + i * 190, GY + 40, 0.6, 1, Math.PI / 2);
    const x = CX - 120 + 90 * ease.inOut(step); if (step >= 1) { g.fillStyle = 'rgba(20,18,24,.7)'; g.beginPath(); g.ellipse(x + 40, GY + 36, 70, 14, 0, 0, Math.PI * 2); g.fill(); FX.dust(g, t, { count: 10, color: '#d8c8b0', a: 0.4, speed: 6 }); }
    drawFigure(g, { x, y: GY + 30 + (step >= 1 ? 26 : 0), s: 1.6, facing: 1, outfit: YOU, pose: walkPose(Math.PI * 0.5 + step * Math.PI), expr: 'nervous', look: [0.3, 1], rim: { color: WARM, dir: [-0.6, -0.6], w: 6 } }); });
  weightBadge(g, { day: 7, k: 1 });
} });
// s003 — "and your shoe sinks into the road"  CLOSE: ankle-deep
registerShot('s003', { draw(g, t, info) { const d = 40 + 90 * ease.out(prog(t, 0, 1.6)), [sx, sy] = shake(t, t < 1.6 ? 3 : 0, 20); g.save(); g.translate(sx, sy); asphaltClose(g, t, d, { dx: 40 }); g.restore(); weightBadge(g, { day: 7, k: 1 }); } });
// s004 — "like it's wet sand."  WIDE: a trail of deep footprints; neighbours staring
registerShot('s004', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.15 + 0.04 * k, x: 0, y: 80 }, { GY, CX, M } = street(g, t, cam, { mood: 'golden', seed: 41 });
  layer(g, cam, 1, (g) => { for (let i = 0; i < 6; i++) footprint(g, CX - 900 + i * 170, GY + 50 + (i % 2) * 24, 0.55, 1, Math.PI / 2 + (i % 2 ? 0.1 : -0.1));
    drawFigure(g, { x: CX + 160, y: GY + 70, s: 1.4, facing: -1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'worried', look: [-0.8, 0.8], rim: { color: WARM, dir: [0.6, -0.6] } });
    g.fillStyle = 'rgba(20,18,24,.7)'; g.beginPath(); g.ellipse(CX + 160, GY + 74, 60, 12, 0, 0, Math.PI * 2); g.fill();
    drawFigure(g, { x: CX + 620, y: GY - 10, s: 1.2, facing: -1, outfit: MOM, pose: POSES.handsOnHead, expr: 'shocked', rim: { color: WARM, dir: [0.6, -0.6] } });
    drawFigure(g, { x: CX - 620, y: GY - 10, s: 1.15, facing: 1, outfit: { top: 'tshirt', color: '#8a5ad6', head: 'curly', headColor: '#2a2a30' }, pose: POSES.point, expr: 'surprised', rim: { color: WARM, dir: [-0.6, -0.6] } }); });
  weightBadge(g, { day: 7, k: 1 });
} });
// s005 — "Day eight."  DRIVEWAY: Mom's car in front of the house
function driveway(g, t, cam, crush = 0, o = {}) {
  const R = street(g, t, cam, { mood: 'golden', seed: 52 }), { GY, CX } = R;
  layer(g, cam, 0.95, (g) => { house(g, CX - 520, GY - 30, 1.1, 0, { wall: '#e8c8a0', roof: '#8a4a3a' }); });
  layer(g, cam, 1, (g) => { const x = CX + 260, y = GY + 70, s = 1.4; car(g, x, y, s, { color: '#3FA06A' });
    if (crush > 0) { poly(g, [[x - 150 * s, y - 175 * s], [x - 40 * s, y - 175 * s + 70 * s * crush], [x + 60 * s, y - 175 * s + 80 * s * crush], [x + 160 * s, y - 175 * s]], shade('#3FA06A', -0.35)); seg(g, [[x - 150 * s, y - 175 * s], [x - 40 * s, y - 175 * s + 70 * s * crush], [x + 60 * s, y - 175 * s + 80 * s * crush], [x + 160 * s, y - 175 * s]], 6, '#14161e'); }
    o.after && o.after(g, R, x, y, s); });
  return R;
}
registerShot('s005', { draw(g, t, info) { const k = t / info.dur; driveway(g, t, { z: 1.05 + 0.04 * k, x: 60, y: 40 }); weightBadge(g, { day: 8, k: prog(t, 0, 0.3), flip: prog(t, 0.1, 0.5) }); } });
// s006 — "You lean on your mom's car..."  MEDIUM: your hand on the roof
registerShot('s006', { draw(g, t, info) {
  const k = t / info.dur; driveway(g, t, { z: 1.55 + 0.04 * k, x: 260, y: 170 }, 0, { after: (g, R, x, y, s) => {
    drawFigure(g, { x: x - 430, y: R.GY + 60, s: 1.5, facing: 1, outfit: YOU, pose: { ...POSES.reach, hF: [150, -196], eF: [80, -200], head: [10, -206] }, expr: 'smile', look: [1, 0.2], rim: { color: WARM, dir: [-0.6, -0.6] } }); } });
  weightBadge(g, { day: 8, k: 1 });
} });
// s007 — "and the roof caves in."  the roof crumples, glass pops; Mom at the door
registerShot('s007', { draw(g, t, info) {
  const c = ease.out(prog(t, 0.1, 0.4)), [sx, sy] = shake(t, t > 0.1 && t < 0.6 ? 14 : 0, 26);
  driveway(g, t, { z: 1.4 + sx * 0.001, x: 200 + sx, y: 150 + sy }, c, { after: (g, R, x, y, s) => {
    drawFigure(g, { x: x - 420, y: R.GY + 60, s: 1.5, facing: 1, outfit: YOU, pose: { ...POSES.reach, hF: [150, -196 + 40 * c], eF: [80, -190], head: [10, -206] }, expr: c > 0.5 ? 'shocked' : 'smile', look: [1, 0.4], rim: { color: WARM, dir: [-0.6, -0.6] } });
    impact(g, x - 40 * s, y - 150 * s, t - 0.12, { r: 260 }); debris(g, x, y - 150 * s, t - 0.12, { n: 12, color: '#bfe0f0', size: 12, speed: 700 });
    drawFigure(g, { x: R.CX - 520, y: R.GY - 30, s: 1.2, facing: 1, outfit: MOM, pose: POSES.handsOnHead, expr: 'shocked', rim: { color: WARM, dir: [0.6, -0.6] } }); } });
  weightBadge(g, { day: 8, k: 1 });
} });
// s008 — "Day nine."  the river at golden hour
registerShot('s008', { draw(g, t, info) { const k = t / info.dur; river(g, t, { z: 1.0 + 0.05 * k, x: lerp(-40, 40, k), y: 0 }); weightBadge(g, { day: 9, k: prog(t, 0, 0.3), flip: prog(t, 0.1, 0.5) }); } });
// s009 — "The bridge to your grandpa's house has a sign."  WIDE: you at the near end of the bridge
registerShot('s009', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.1 + 0.05 * k, x: -120, y: 40 }, R = river(g, t, cam);
  layer(g, cam, 1, (g) => drawFigure(g, { x: R.SIGN[0] + 220, y: R.GY - 10, s: 1.3, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'sad', look: [1, -0.4], rim: { color: WARM, dir: [0.6, -0.6] } }));
  weightBadge(g, { day: 9, k: 1 });
} });
// s010 — "Ten tonnes, maximum."  INSERT: the sign
registerShot('s010', { draw(g, t, info) { const k = t / info.dur; blurLayer(g, 14, (g) => river(g, t, { z: 1.4, x: -500, y: -60 }, { noSign: true })); limitSign(g, E.W * 0.5, E.H * 0.45, 2.3 + 0.12 * k); weightBadge(g, { day: 9, k: 1 }); } });
// s011 — "You weigh thirty-six."  BIG FACE: you stare at the sign
registerShot('s011', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 14, (g) => river(g, t, { z: 1.5, x: -300, y: -100 })); glow(g, E.W * 0.5, E.H * 0.4, 700, '#ffe2b0', 0.3);
  heroFace(g, E.W * 0.5, E.H * 0.62, 320 * (1 + 0.04 * k), { outfit: YOU, expr: 'worried', look: [0.6, -0.4], rimColor: WARM, rimSide: 1 });
  weightBadge(g, { day: 9, k: 1, danger: true });
} });
// s012 — "And tonight, at midnight, you'll weigh twice as much."  the clock strikes 12, ×2
registerShot('s012', { draw(g, t, info) {
  const k = t / info.dur, f = wt('twice', info, t, 2.5); blurLayer(g, 12, (g) => bedroom(g, t, { z: 1.3, x: 200, y: -60 }, { night: true })); veil(g, 'rgba(10,12,40,.3)');
  midnightClock(g, E.W * 0.5, E.H * 0.5, 280 * (1 + 0.04 * k), lerp(59, 60, ease.inOut(prog(t, 0.2, f))), { stampAt: t - f });
  weightBadge(g, { day: 9, k: 1, danger: true });
} });
// s013 — TITLE: you stand in a cracked dip in the road at golden hour
registerShot('s013', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0 + 0.04 * k, x: 0, y: 40 }, { GY, CX } = street(g, t, cam, { mood: 'golden', seed: 41 });
  layer(g, cam, 1, (g) => { g.fillStyle = 'rgba(20,16,24,.55)'; g.beginPath(); g.ellipse(CX, GY + 70, 420, 60, 0, 0, Math.PI * 2); g.fill(); g.save(); g.translate(CX, GY + 70); g.scale(1, 0.18); cracks(g, 0, 0, 900, ease.out(prog(t, 0, 2)), { seed: 9, color: 'rgba(20,16,24,.85)', w: 10, arms: 12, rings: 2, glowCol: '#ffcf8a' }); g.restore();
    drawFigure(g, { x: CX, y: GY + 86, s: 1.6, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'determined', look: [0, 0.2], rim: { color: WARM, dir: [-0.6, -0.6], w: 6 } }); });
  g.fillStyle = linGrad(g, 0, 0, 0, E.H * 0.6, ['rgba(20,12,30,.75)', 'rgba(20,12,30,0)']); g.fillRect(0, 0, E.W, E.H * 0.6);
  const a = ease.out(prog(t, 0.2, 0.8));
  text(g, 'WHAT IF YOU GOT', E.W / 2, E.H * 0.2, { size: 64, color: '#ffffff', font: FONTS.title, weight: 700, alpha: a, stroke: 10, strokeColor: '#140c1e' });
  text(g, '2× HEAVIER', E.W / 2, E.H * 0.32, { size: 130, color: GOLD(), font: FONTS.title, weight: 700, alpha: a, stroke: 14, strokeColor: '#140c1e', glow: 30, glowColor: alpha(GOLD(), 0.6) });
  text(g, 'EVERY SINGLE DAY?', E.W / 2, E.H * 0.43, { size: 64, color: '#ffffff', font: FONTS.title, weight: 700, alpha: ease.out(prog(t, 0.6, 1.2)), stroke: 10, strokeColor: '#140c1e' });
} });
