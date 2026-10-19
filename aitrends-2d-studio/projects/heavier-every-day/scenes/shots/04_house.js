// shots/04_house.js — days 4–9: the stairs give way, the bed falls into the kitchen, the garage; the pickup tug of war and
// the viral video; footprints in the road, cars and buses can't carry you, steel plates; school says stay home; the river,
// the 10 t bridge, Grandpa's nightly video call.
import { E, V, S, registerShot, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, radGrad, text, measure, FONTS, shake, rng, talkAmount } from '/engine/core.js';
import { drawFigure, POSES, breathe, walkPose, headPos, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { street } from '/projects/see-10-seconds/scenes/sets/street.js';
import { bedroom, bed, classroom, desk } from '/projects/stronger-couldnt-stop/scenes/sets/home.js';
import { garage } from '/projects/stronger-couldnt-stop/scenes/sets/hospital.js';
import { stairs, houseCut, river, house } from '../sets/world.js';
import { ladder } from '../ladder.js';
import { YOU, MOM, GRANDPA, FRIEND, FDAD, WORKER, KIDS } from '../cast.js';
import { heroFace, chip, impact, debris, cracks, stamp, car, wt, GOLD, CORAL, fmt, weightBadge, midnightClock, grandpaFace, grandpa, FLOORSIT, sleeper, limitSign, footprint, phoneFrame, browserFrame, card, uiText, UIS, UIT } from '../lib.js';

const WARM = '#ffd8a8', MOON = '#cfe0ff', LAMP = '#ffcf8a';
const HOOD = { ...YOU, head: 'hood', headColor: YOU.color };
// the friend's dad's pickup, side view facing right, wheels on y. o.spin (rad), o.rot, o.face = driver expr
function pickup(g, x, y, s = 1, o = {}) {
  const c = o.color || '#4a7a5a'; g.save(); g.translate(x, y); g.scale(s, s); if (o.rot) { g.translate(-220, -60); g.rotate(o.rot); g.translate(220, 60); }
  rr(g, -392, -114, 56, 18, 4); g.fillStyle = '#3a3a44'; g.fill(); circle(g, -394, -112, 12, '#9aa0aa');                   // hitch
  rr(g, -340, -200, 680, 120, 18); g.fillStyle = c; g.fill(); rr(g, -340, -236, 340, 46, 8); g.fillStyle = shade(c, -0.15); g.fill();
  poly(g, [[-10, -196], [24, -340], [212, -340], [300, -206], [340, -196]], c);
  g.save(); g.beginPath(); g.moveTo(36, -210); g.lineTo(56, -322); g.lineTo(196, -322); g.lineTo(274, -210); g.closePath(); g.fillStyle = '#bfe0f0'; g.fill(); g.clip();
  bigFace(g, 150, -260, 40, { outfit: FDAD, expr: o.face || 'determined', look: [1, 0], rimColor: WARM }); g.fillStyle = alpha('#ffffff', 0.3); poly(g, [[60, -322], [110, -322], [60, -230]]); g.restore();
  g.fillStyle = alpha('#ffffff', 0.22); g.fillRect(-330, -184, 660, 8); circle(g, 332, -160, 13, '#fff6d0'); circle(g, -336, -172, 11, '#ff4a3a');
  for (const wx of [-220, 200]) { circle(g, wx, -60, 64, '#16141c'); circle(g, wx, -60, 28, '#9aa0aa'); for (let i = 0; i < 5; i++) { const a = (o.spin || 0) + i * 1.2566; seg(g, [[wx, -60], [wx + Math.cos(a) * 26, -60 + Math.sin(a) * 26]], 6, '#5a5e68'); } }
  g.restore();
}
const hitchAt = (x, y, s) => [x - 394 * s, y - 112 * s];
// rope from a to b; sag 0 = taut
function rope(g, a, b, sag = 0, w = 12) { g.strokeStyle = '#c8a46a'; g.lineWidth = w; g.lineCap = 'round'; g.beginPath(); g.moveTo(...a); g.quadraticCurveTo((a[0] + b[0]) / 2, (a[1] + b[1]) / 2 + sag, ...b); g.stroke(); }
// soft smoke puffs streaming left from (x, y)
function smoke(g, t, x, y, k = 1, o = {}) {
  const r = rng(o.seed || 4), n = o.n || 26; for (let i = 0; i < n; i++) { const life = ((t * 0.9 + r()) % 1), d = life * (o.len || 700), px = x - d + 20 * Math.sin(t * 3 + i), py = y - life * 160 - r() * 60, rad = (40 + r() * 50) * (0.5 + life * 1.6) * (o.s || 1);
    circle(g, px, py, rad, alpha(mix('#f4f2f6', '#b8b4c0', r()), 0.5 * k * (1 - life))); }
}
// city bus, side view, front at the left; wheels on y. o.tilt dips the front; o.shakeHead = driver head shake
function bus(g, x, y, s = 1, o = {}) {
  const c = '#e8b04a'; g.save(); g.translate(x, y); g.scale(s, s); if (o.tilt) { g.translate(380, -50); g.rotate(-o.tilt); g.translate(-380, 50); }
  rr(g, -470, -360, 940, 310, 34); g.fillStyle = c; g.fill(); g.fillStyle = '#2a6a8a'; g.fillRect(-470, -150, 940, 22);
  rr(g, -462, -330, 76, 190, 14); g.fillStyle = '#bfe0f0'; g.fill();
  g.save(); rr(g, -462, -330, 76, 190, 14); g.clip(); bigFace(g, -420 + (o.shakeHead || 0), -270, 34, { outfit: { top: 'suit', color: '#2a4a6a', head: 'cap', headColor: '#2a4a6a' }, expr: o.face || 'nervous', look: [1, 0], rimColor: WARM }); g.restore();
  rr(g, -372, -320, 92, 270, 8); g.fillStyle = o.door ? '#2a2a34' : '#9ab8c8'; g.fill();
  for (let i = 0; i < 6; i++) { rr(g, -250 + i * 118, -330, 100, 110, 10); g.fillStyle = '#9ab8c8'; g.fill(); }
  rr(g, -440, -356, 220, 30, 6); g.fillStyle = '#1a1c24'; g.fill(); text(g, '42  CITY', -330, -340, { size: 22, color: '#ffb84a', font: FONTS.ui, weight: 900 });
  for (const wx of [-300, 300]) { circle(g, wx, -50, 54, '#16141c'); circle(g, wx, -50, 22, '#9aa0aa'); }
  g.restore();
}
// steel plate lying on the sidewalk (top edge at y)
function plate(g, x, y, w = 250) { rr(g, x, y - 16, w, 20, 3); g.fillStyle = '#7a808c'; g.fill(); g.fillStyle = '#a8aeb8'; g.fillRect(x + 4, y - 16, w - 8, 5); for (let i = 0; i < 4; i++) circle(g, x + 20 + i * (w - 40) / 3, y - 6, 3, '#4a4e58'); }
// tiny thumbnail picture of the tug of war (screen space, inside a w × h box at x, y)
function tugThumb(g, x, y, w, h, t = 0) {
  g.save(); g.beginPath(); g.rect(x, y, w, h); g.clip(); g.fillStyle = linGrad(g, 0, y, 0, y + h, ['#f2b880', '#f9d49c']); g.fillRect(x, y, w, h); g.fillStyle = '#4a4650'; g.fillRect(x, y + h * 0.72, w, h * 0.3);
  g.translate(x, y); g.scale(w / 1000, w / 1000); pickup(g, 620, 520, 0.8, { spin: t * 30 }); rope(g, [240, 400], hitchAt(620, 520, 0.8), 0, 8);
  drawFigure(g, { x: 220, y: 520, s: 1.1, facing: 1, outfit: YOU, pose: POSES.stand, expr: 'smirk', rim: false }); smoke(g, t, 380, 470, 0.8, { len: 260, s: 0.5, n: 10 }); g.restore();
}

// s053 — "Day four, the stairs give way under your feet."  the step snaps
registerShot('s053', { draw(g, t, info) {
  const f = wt('give', info, t, 2.07), b = t - f, p = 4 * ease.inOut(prog(t, 0, f)), drop = b > 0 ? ease.in(clamp(b / 0.4)) : 0;
  const cam0 = { z: 1.3, x: -245 + 110 * p, y: 216 - 62 * p + 60 * drop }, [sx, sy] = shake(t, b > 0.3 && b < 0.7 ? 12 : 0, 24), cam = { ...cam0, x: cam0.x + sx, y: cam0.y + sy };
  const R = stairs(g, t, cam, { broken: 4, breakK: b > 0 ? ease.out(clamp(b / 0.35)) : 0 });
  layer(g, cam, 1, (g) => { const [x0, y0] = R.step(0), x = x0 + p * 110 + 55, y = y0 - (p + 1) * 62 + drop * 170;
    drawFigure(g, { x, y, s: 1.35, facing: 1, outfit: YOU, pose: b > 0 ? (drop < 1 ? POSES.fall : POSES.crouch) : walkPose(t * 7), expr: b > 0 ? 'shocked' : 'neutral', look: [1, -0.3], rim: { color: WARM, dir: [-0.6, -0.6] } });
    if (b > 0.3) { debris(g, x, y - 20, b - 0.3, { n: 16, color: '#b07848', size: 16 }); impact(g, x, y - 10, b - 0.35, { r: 190 }); } });
  weightBadge(g, { day: 4, k: 1, flip: prog(t, 0.2, 0.6) });
} });
// s054 — "Day five, at two in the morning…"  NIGHT bedroom: 2:00, you asleep, the bed frame creaks
registerShot('s054', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.2 + 0.06 * k, x: -260, y: 60 }, R = bedroom(g, t, cam, { night: true }), [sx] = shake(t, 2, 18);
  layer(g, cam, 1, (g) => { g.save(); g.translate(sx, 0); sleeper(g, R.CX - 380, R.GY, 1.0, 1.4, { outfit: YOU, bed: { crack: true }, rim: { color: MOON, dir: [0, -1] } }); g.restore(); });
  midnightClock(g, E.W * 0.74, E.H * 0.42, 170, 180); chip(g, '2:00 AM', E.W * 0.74, E.H * 0.72, { size: 44, k: prog(t, 0.3, 0.6) });
  weightBadge(g, { day: 5, k: 1, flip: prog(t, 0.2, 0.6) });
} });
// s055 — "…your bed goes through the floor and lands in the kitchen."  CUT-AWAY of the house
registerShot('s055', { draw(g, t, info) {
  const f = wt('through', info, t, 0.86), l = wt('lands', info, t, 1.77), fall = ease.in(prog(t, f, l)), a = t - l, [sx, sy] = shake(t, a > 0 && a < 0.4 ? 14 : 0, 26);
  const cam = { z: 1.3 + 0.05 * (t / info.dur), x: -250 + sx, y: lerp(-130, 230, ease.inOut(prog(t, f, l + 0.3))) + sy }, R = houseCut(g, t, cam, { hole: ease.out(prog(t, f - 0.15, f + 0.2)) });
  layer(g, cam, 1, (g) => { const bx = R.CX - 270, bs = 0.66, by = lerp(R.MID - 40, R.MID + 430, fall); sleeper(g, bx, by, bs, 0.95, { outfit: YOU, expr: t > f ? 'shocked' : 'sleepy', rim: { color: MOON, dir: [0, -1] } });
    if (t > f - 0.1) debris(g, bx, R.MID, t - f + 0.1, { n: 20, color: '#c8b8a0', size: 14, grav: 1400 });
    if (a > 0) { debris(g, bx, R.MID + 420, a, { n: 18, color: '#e8e0d0', size: 12, speed: 500, seed: 3 }); impact(g, bx, R.MID + 400, a, { r: 220 }); } });
  weightBadge(g, { day: 5, k: 1 });
} });
// s056 — "You move into the garage."  you carry a box in; a mattress on the concrete, the work lamp
registerShot('s056', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.3 + 0.05 * k, x: 40, y: 120 }, R = garage(g, t, cam), x = lerp(R.CX + 560, R.CX + 260, ease.out(k));
  layer(g, cam, 1, (g) => { rr(g, R.CX - 420, R.GY - 50, 520, 50, 14); g.fillStyle = '#5a7ac8'; g.fill(); rr(g, R.CX - 400, R.GY - 76, 130, 34, 14); g.fillStyle = '#f2ecf6'; g.fill();
    drawFigure(g, { x, y: R.GY, s: 1.35, facing: -1, outfit: YOU, pose: k < 0.95 ? { ...walkPose(t * 7), hF: [34, -150], eF: [24, -130], hB: [28, -150], eB: [20, -130] } : POSES.holdFront, expr: 'sad', look: [-1, 0.3], rim: { color: LAMP, dir: [-0.6, -0.6] } });
    rr(g, x - 110, R.GY - 290, 150, 110, 6); g.fillStyle = '#c8a070'; g.fill(); text(g, 'MY STUFF', x - 35, R.GY - 235, { size: 22, color: '#5a3a20', font: FONTS.ui, weight: 900 }); });
  chip(g, 'NEW BEDROOM', E.W * 0.5, E.H * 0.2, { size: 40, k: prog(t, 0.4, 0.8) }); weightBadge(g, { day: 5, k: 1 });
} });
// s057 — "It's the only floor in the house made of concrete."  Mom in the doorway with a plate; CONCRETE ✓
registerShot('s057', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.25 + 0.05 * k, x: 80, y: 120 }, R = garage(g, t, cam);
  layer(g, cam, 0.62, (g) => { rr(g, R.CX + 420, R.GY - 470, 230, 470, 4); g.fillStyle = '#ffe2b0'; g.fill(); glow(g, R.CX + 535, R.GY - 250, 420, '#ffd28a', 0.55); });
  layer(g, cam, 1, (g) => { FX.pool(g, R.CX + 480, R.GY + 30, 300, 40, '#ffd28a', 0.35); rr(g, R.CX - 420, R.GY - 50, 520, 50, 14); g.fillStyle = '#5a7ac8'; g.fill();
    drawFigure(g, { x: R.CX - 260, y: R.GY - 40, s: 1.35, facing: 1, outfit: YOU, pose: breathe(FLOORSIT, t), expr: 'smallSmile', look: [1, -0.3], rim: { color: LAMP, dir: [0.6, -0.6] } });
    drawFigure(g, { x: R.CX + 500, y: R.GY, s: 1.35, facing: -1, outfit: MOM, pose: breathe(POSES.holdFront, t), expr: 'smile', look: [-1, 0.4], rim: { color: '#ffe2b0', dir: [0.8, -0.4] } });
    g.fillStyle = '#f4f2ee'; g.beginPath(); g.ellipse(R.CX + 500 - 46 * 1.35, R.GY - 152 * 1.35, 54, 14, 0, 0, Math.PI * 2); g.fill(); circle(g, R.CX + 500 - 56 * 1.35, R.GY - 160 * 1.35, 14, '#c8642a'); circle(g, R.CX + 500 - 36 * 1.35, R.GY - 158 * 1.35, 10, '#5fae4a'); });
  UI.callout(g, t, { at: [E.W * 0.44, E.H * 0.9], to: [E.W * 0.46, E.H * 0.7], str: 'CONCRETE ✓', start: wt('concrete', info, t, 2.6) - 0.3, size: 40 });
  weightBadge(g, { day: 5, k: 1 });
} });
// s058 — "Day six, you're as heavy as an elephant."
registerShot('s058', { draw(g, t, info) { ladder(g, t, info, 6, 'elephant', { label: 'AN ELEPHANT', s: 0.8 }); } });
// s059 — "Your best friend ties a rope from you to his dad's pickup truck…"  STREET: the rope, the truck
registerShot('s059', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.12, x: -60 + 60 * k, y: 150 }, R = street(g, t, cam, { mood: 'golden', seed: 12 }), y = R.LANE, px = R.CX + 300, ps = 0.95, tie = ease.inOut(prog(t, 0.3, 2.4));
  layer(g, cam, 1, (g) => { const yx = R.CX - 560, h = hitchAt(px, y, ps);
    pickup(g, px, y, ps, { face: 'smirk' }); rope(g, [yx + 14, y - 130], h, 120 * (1 - 0.3 * tie));
    drawFigure(g, { x: yx, y, s: 1.4, facing: 1, outfit: YOU, pose: breathe(POSES.crossArms, t), expr: 'smirk', look: [1, 0.2], rim: { color: WARM, dir: [0.6, -0.6] } });
    drawFigure(g, { x: h[0] - 90, y, s: 1.35, facing: 1, outfit: FRIEND, pose: t < 2.6 ? { ...POSES.kneel, hF: [62 + 8 * Math.sin(t * 14), -64], hB: [56, -60] } : POSES.cheer, expr: 'joy', look: [1, 0], rim: { color: WARM, dir: [0.6, -0.6] } }); });
  weightBadge(g, { day: 6, k: 1 });
} });
// s060 — "…and floors it."  the pickup lurches, the rope snaps taut, exhaust
registerShot('s060', { draw(g, t, info) {
  const lur = ease.out(prog(t, 0.1, 0.4)), back = ease.inOut(prog(t, 0.4, 0.8)), [sx, sy] = shake(t, t > 0.35 ? 9 : 0, 26), cam = { z: 1.12 + 0.08 * (t / info.dur), x: sx, y: 150 + sy }, R = street(g, t, cam, { mood: 'golden', seed: 12 }), y = R.LANE, ps = 0.95;
  const px = R.CX + 300 + 70 * lur - 20 * back;
  layer(g, cam, 1, (g) => { const yx = R.CX - 560, h = hitchAt(px, y, ps); smoke(g, t, px - 360 * ps, y - 50, prog(t, 0.1, 0.4), { len: 500 });
    pickup(g, px, y, ps, { rot: -0.03 * lur, spin: t * 40, face: 'determined' }); rope(g, [yx + 14, y - 130], h, 120 * (1 - lur));
    drawFigure(g, { x: yx, y, s: 1.4, facing: 1, outfit: YOU, pose: breathe(POSES.crossArms, t), expr: 'smirk', look: [1, 0.2], rim: { color: WARM, dir: [0.6, -0.6] } });
    drawFigure(g, { x: R.CX - 120 - 160 * lur, y: R.GY, s: 1.35, facing: 1, outfit: FRIEND, pose: POSES.handsOnHead, expr: 'shocked', rim: { color: WARM, dir: [0.6, -0.6] } }); });
  weightBadge(g, { day: 6, k: 1 });
} });
// s061 — "The tires scream."  CLOSE: the rear tire spins, smoke pours out
registerShot('s061', { draw(g, t, info) {
  const k = t / info.dur, z = 1 + 0.06 * k; blurLayer(g, 14, (g) => street(g, t, { z: 1.6, x: 300, y: 260 }, { mood: 'golden', seed: 12 }));
  g.save(); g.translate(E.W / 2, E.H / 2); g.scale(z, z); g.translate(-E.W / 2, -E.H / 2); const [sx, sy] = shake(t, 6, 30), gy = E.H * 0.8, wx = E.W * 0.58 + sx, wy = gy - 280 + sy;
  g.fillStyle = linGrad(g, 0, gy, 0, E.H, ['#4a4650', '#2a2830']); g.fillRect(-100, gy, E.W + 200, E.H); g.fillStyle = 'rgba(10,8,12,.8)'; g.fillRect(-100, gy, wx + 100, 26);
  smoke(g, t, wx - 120, gy - 40, 1, { len: 1300, s: 2.2, n: 34, seed: 7 });
  g.beginPath(); g.arc(wx, wy, 380, Math.PI, Math.PI * 2); g.lineTo(wx + 380, wy - 120); g.fillStyle = '#4a7a5a'; g.fill(); g.fillStyle = '#3a5a46'; g.fillRect(wx - 600, wy - 420, 1200, 120);
  circle(g, wx, wy, 290, '#16141c'); circle(g, wx, wy, 130, '#9aa0aa'); circle(g, wx, wy, 40, '#5a5e68');
  for (let j = 0; j < 4; j++) { const a0 = t * 40 - j * 0.12; for (let i = 0; i < 5; i++) { const a = a0 + i * 1.2566; seg(g, [[wx, wy], [wx + Math.cos(a) * 124, wy + Math.sin(a) * 124]], 22, alpha('#5a5e68', 1 - j * 0.28)); } }
  g.strokeStyle = alpha('#ffffff', 0.25); g.lineWidth = 6; for (let i = 0; i < 4; i++) { g.beginPath(); g.arc(wx, wy, 210 + i * 18, t * 30 + i, t * 30 + i + 1.4); g.stroke(); }
  smoke(g, t + 0.4, wx - 220, gy - 10, 0.8, { len: 900, s: 1.4, n: 18, seed: 9 }); g.restore();
} });
// s062 — "The truck shakes."  the truck strains and shudders, the rope dead straight
registerShot('s062', { draw(g, t, info) {
  const cam = { z: 1.5, x: 140, y: 250 }, R = street(g, t, cam, { mood: 'golden', seed: 12 }), y = R.LANE, ps = 0.95, [tx, ty] = shake(t, 10, 40);
  layer(g, cam, 1, (g) => { const px = R.CX + 370 + tx, h = hitchAt(px, y + ty, ps); smoke(g, t, px - 160 * ps, y - 30, 1, { len: 900, s: 1.3 });
    pickup(g, px, y + ty, ps, { rot: -0.02 + 0.015 * Math.sin(t * 40), spin: t * 40, face: 'angry' }); const v = 3 * Math.sin(t * 70); rope(g, [R.CX - 700, y - 128 + v], h, 0); });
  weightBadge(g, { day: 6, k: 1 });
} });
// s063 — "You don't move."  you, calm, sipping a juice box; the rope at your waist
registerShot('s063', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 2.0 + 0.08 * k, x: -540, y: 220 }, R = street(g, t, cam, { mood: 'golden', seed: 12 }), y = R.LANE, yx = R.CX - 560, s = 1.4;
  layer(g, cam, 1, (g) => { drawFigure(g, { x: R.CX - 160, y: R.GY, s: 1.35, facing: -1, outfit: FRIEND, pose: POSES.handsOnHead, expr: 'shocked', rim: { color: WARM, dir: [0.6, -0.6] } });
    smoke(g, t, R.CX + 200, y - 60, 0.7, { len: 800, s: 1.2, n: 16 }); rope(g, [yx + 14, y - 130 + 2 * Math.sin(t * 60)], [R.CX + 600, y - 120], 0);
    const pose = { ...POSES.stand, eF: [34, -140], hF: [40, -168] }; drawFigure(g, { x: yx, y, s, facing: 1, outfit: YOU, pose: breathe(pose, t), expr: 'neutral', look: [1, -0.1], blink: t > 1.0 && t < 1.12, rim: { color: WARM, dir: [0.6, -0.6] } });
    const hx = yx + 44 * s, hy = y - 166 * s; rr(g, hx - 16, hy - 34, 32, 46, 5); g.fillStyle = '#f2c21a'; g.fill(); g.fillStyle = '#e8562a'; g.fillRect(hx - 16, hy - 16, 32, 12); seg(g, [[hx - 4, hy - 34], [yx + 22 * s, y - 192 * s]], 4, '#f4f2ee'); });
} });
// s064 — "Ten million people watch the video."  PHONE: the video, views rolling up to 10,000,000
registerShot('s064', { draw(g, t, info) {
  const k = t / info.dur, v = Math.round(1e7 * ease.inOut(prog(t, 0.1, info.dur - 0.3)) / 1000) * 1000; blurLayer(g, 16, (g) => street(g, t, { z: 1.3, x: 0, y: 150 }, { mood: 'golden', seed: 12 })); veil(g, '#1a1030', 0.25);
  const cx = E.W * 0.32, cy = E.H * 0.52, sc = 1 + 0.03 * k; g.save(); g.translate(cx, cy); g.scale(sc, sc); g.rotate(-0.04); g.translate(-cx, -cy);
  phoneFrame(g, cx, cy, 860, (g, x, y, w, h) => { tugThumb(g, x, y + 60, w, w * 9 / 16, t); g.fillStyle = '#e8462a'; g.fillRect(x, y + 60 + w * 9 / 16 - 6, w * 0.7, 6);
    uiText(g, 'KID vs. PICKUP TRUCK', x + 24, y + 60 + w * 9 / 16 + 50, 30, { weight: 900 }); uiText(g, `${fmt(v)} views`, x + 24, y + 60 + w * 9 / 16 + 96, 26, { color: UIS });
    for (let i = 0; i < 3; i++) { card(g, x + 20, y + 380 + i * 130, w - 40, 110, { r: 16, fill: '#eef1f6' }); uiText(g, ['so strong!!', 'how is this real', 'IMMOVABLE'][i], x + 44, y + 435 + i * 130, 24, { color: UIT }); } });
  g.restore();
  text(g, fmt(v), E.W * 0.7, E.H * 0.46, { size: 130, color: '#ffffff', font: FONTS.ui, weight: 900, stroke: 12, strokeColor: '#140c1e' }); text(g, 'VIEWS', E.W * 0.7, E.H * 0.6, { size: 60, color: GOLD(), font: FONTS.ui, weight: 900, spacing: 8, stroke: 8, strokeColor: '#140c1e' });
  const r = rng(3); for (let i = 0; i < 10; i++) { const life = (t * 0.6 + r()) % 1; text(g, '♥', E.W * 0.5 + r() * 140, E.H * 0.8 - life * 500, { size: 40 + r() * 30, color: alpha('#ff5a7a', 1 - life), font: FONTS.ui, weight: 900 }); }
} });
// s065 — "They call you the Immovable Kid."  NEWS SITE
registerShot('s065', { draw(g, t, info) {
  const k = t / info.dur; g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#dfe6ee', '#b8c4d4']); g.fillRect(0, 0, E.W, E.H);
  const s = 1 + 0.04 * k; g.save(); g.translate(E.W / 2, E.H / 2); g.scale(s, s); g.translate(-E.W / 2, -E.H / 2);
  browserFrame(g, E.W * 0.1, E.H * 0.1, E.W * 0.8, E.H * 0.82, 'citytimes · local news', (g, x, y, w, h) => {
    g.fillStyle = '#1e2433'; g.fillRect(x, y, w, 90); uiText(g, 'THE CITY TIMES', x + 40, y + 46, 40, { color: '#ffffff', weight: 900, spacing: 4 }); uiText(g, 'LOCAL · SCIENCE · VIRAL', x + w - 420, y + 46, 22, { color: '#9aa4b8' });
    uiText(g, 'VIRAL', x + 40, y + 150, 24, { color: CORAL(), weight: 900, spacing: 3 });
    const hk = ease.outBack(prog(t, wt('immovable', info, t, 0.4) - 0.1, wt('immovable', info, t, 0.4) + 0.3)); g.save(); g.globalAlpha *= clamp(hk * 2); uiText(g, 'THE IMMOVABLE KID', x + 40, y + 230, 92, { weight: 900 }); g.restore();
    uiText(g, 'A pickup truck tried to drag a 15-year-old down the street. It failed.', x + 40, y + 320, 30, { color: UIS, weight: 700 });
    tugThumb(g, x + 40, y + 370, 640, 360, t); uiText(g, 'As heavy as an elephant. And growing?', x + 720, y + 420, 30, { color: UIT, weight: 800 });
    for (let i = 0; i < 6; i++) { rr(g, x + 720, y + 470 + i * 44, (w - 800) * (i % 3 === 2 ? 0.6 : 1), 18, 9); g.fillStyle = '#d8dee8'; g.fill(); } });
  g.restore();
} });
// s066 — "Day seven, every step leaves a footprint in the road."  TOP VIEW: deep footprints across the asphalt
registerShot('s066', { draw(g, t, info) {
  const k = t / info.dur, walk = 3 + t * 2, step = 120, oy = walk * step - E.H * 0.6, n = 16;
  g.fillStyle = linGrad(g, 0, 0, E.W, 0, ['#5a5660', '#4a4650', '#545058']); g.fillRect(0, 0, E.W, E.H); const r = rng(8); for (let i = 0; i < 300; i++) circle(g, r() * E.W, ((r() * E.H * 2 + oy) % (E.H + 20) + E.H + 20) % (E.H + 20), 2 + r() * 3, alpha(r() < 0.5 ? '#6e6a74' : '#2e2c34', 0.6));
  g.fillStyle = '#b8b0a4'; g.fillRect(0, 0, E.W * 0.16, E.H); g.fillStyle = '#d8d0c4'; g.fillRect(E.W * 0.16, 0, 24, E.H);
  for (let i = -1; i < 8; i++) { g.fillStyle = alpha('#f2d27a', 0.8); g.fillRect(E.W * 0.7, (((i * 260 + oy) % (E.H + 260)) + E.H + 260) % (E.H + 260) - 130, 18, 130); }
  for (let i = 0; i < n; i++) { if (i > walk) break; const age = (walk - i) / 2, x = E.W * 0.42 + (i % 2 ? 50 : -50), y = E.H * 0.95 - i * step + oy;
    if (y < -150 || y > E.H + 150) continue; cracks(g, x, y, 130, clamp(age * 3), { seed: i + 2, color: 'rgba(20,18,24,.8)', w: 4, arms: 8, rings: 1 }); footprint(g, x, y, 1.15, clamp(age * 4)); if (age < 0.5) FX.rings(g, x, y, age, { count: 2, r0: 60, r1: 200, color: '#fff2c8', a: 0.6 * (1 - age * 2), w: 4 }); }
  const hx = E.W * 0.42 + 50 * Math.sin(walk * Math.PI), hy = E.H * 0.95 - walk * step + oy - 40;
  g.fillStyle = YOU.color; g.beginPath(); g.ellipse(hx, hy + 10, 110, 50, 0, 0, Math.PI * 2); g.fill(); circle(g, hx - 120, hy + 20 + 30 * Math.sin(walk * Math.PI), 26, S().ink); circle(g, hx + 120, hy + 20 - 30 * Math.sin(walk * Math.PI), 26, S().ink);
  circle(g, hx, hy - 4, 56, '#ffd8a8'); circle(g, hx, hy, 54, S().ink);
  weightBadge(g, { day: 7, k: 1, flip: prog(t, 0.2, 0.6) });
} });
// s067 — "Cars can't carry you."  a car squashes flat as you sit in it
registerShot('s067', { draw(g, t, info) {
  const k = t / info.dur, sq = ease.outBack(prog(t, 0.45, 0.8)), [sx, sy] = shake(t, t > 0.45 && t < 0.8 ? 10 : 0, 26), cam = { z: 1.5, x: 200 + sx, y: 260 + sy }, R = street(g, t, cam, { mood: 'golden', seed: 23 });
  layer(g, cam, 1, (g) => { const cx = R.CX + 200, y = R.LANE; g.save(); g.translate(cx, y); g.scale(1 + 0.08 * sq, 1 - 0.32 * sq); car(g, 0, 0, 1.1, { color: '#3a8ac0' });
    g.save(); g.beginPath(); g.moveTo(-143, -172); g.lineTo(-101, -249); g.lineTo(0, -249); g.lineTo(0, -172); g.closePath(); g.clip(); bigFace(g, -50, -215, 34, { outfit: YOU, expr: sq > 0.2 ? 'shocked' : 'smile', look: [-1, 0], rimColor: WARM }); g.restore(); g.restore();
    if (t > 0.5) { impact(g, cx - 180, y - 10, t - 0.5, { r: 140, color: '#ffe2a8' }); impact(g, cx + 180, y - 10, t - 0.52, { r: 140, color: '#ffe2a8' }); } });
  weightBadge(g, { day: 7, k: 1 });
} });
// s068 — "Buses can't carry you."  you step on, the bus dips, the driver shakes his head
registerShot('s068', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.3, x: 120, y: 220 }, R = street(g, t, cam, { mood: 'golden', seed: 31 }), on = ease.inOut(prog(t, 0.2, 0.6)), off = ease.inOut(prog(t, 1.3, 1.8));
  layer(g, cam, 1, (g) => { const bx = R.CX + 420, y = R.LANE; bus(g, bx, y, 1.0, { tilt: 0.06 * on * (1 - off), door: true, face: on > 0.5 ? 'angry' : 'neutral', shakeHead: on > 0.5 ? 8 * Math.sin(t * 16) : 0 });
    drawFigure(g, { x: bx - 320 - 140 * off + 20 * on, y: y - 30 * on * (1 - off), s: 1.35, facing: off > 0.1 ? -1 : 1, outfit: YOU, pose: on < 1 || off > 0 ? walkPose(t * 6) : POSES.stand, expr: 'sad', look: [1, -0.2], rim: { color: WARM, dir: [0.6, -0.6] } }); });
  weightBadge(g, { day: 7, k: 1 });
} });
// s069 — "The city lays steel plates on the sidewalk, just for you."  workers lay plates; you walk on them
registerShot('s069', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.32, x: -60 + 120 * k, y: 170 }, R = street(g, t, cam, { mood: 'golden', seed: 44 }), y = R.GY + 6, low = ease.inOut(prog(t, 0.5, 2.6));
  layer(g, cam, 1, (g) => { for (let i = 0; i < 6; i++) plate(g, R.CX - 980 + i * 260, y);
    const wx = R.CX + 460; plate(g, wx - 150, y - 150 * (1 - low) - 4); for (const [dx, f] of [[-220, 1], [190, -1]]) drawFigure(g, { x: wx + dx, y: R.GY, s: 1.3, facing: f, outfit: WORKER, pose: low < 1 ? { ...POSES.holdFront, hF: [42, -130 + 110 * low], hB: [36, -126 + 110 * low] } : POSES.crossArms, expr: 'determined', rim: { color: WARM, dir: [0.6, -0.6] } });
    for (let i = 0; i < 3; i++) { const cx = R.CX - 900 + i * 700; poly(g, [[cx - 22, R.GY + 40], [cx + 22, R.GY + 40], [cx, R.GY - 30]], '#ff7a2a'); g.fillStyle = '#ffffff'; g.fillRect(cx - 12, R.GY, 24, 8); }
    const sx0 = R.CX - 560; seg(g, [[sx0, R.GY - 120], [sx0, R.GY]], 8, '#3a3a44'); rr(g, sx0 - 120, R.GY - 250, 240, 130, 8); g.fillStyle = '#f2c21a'; g.fill(); text(g, 'STEEL PATH', sx0, R.GY - 208, { size: 28, color: '#1e1a14', font: FONTS.ui, weight: 900 }); text(g, '1 PERSON', sx0, R.GY - 164, { size: 28, color: '#1e1a14', font: FONTS.ui, weight: 900 });
    const x = lerp(R.CX - 700, R.CX + 60, k); drawFigure(g, { x, y: y - 16, s: 1.35, facing: 1, outfit: YOU, pose: walkPose(t * 6), expr: 'sad', look: [1, 0.4], rim: { color: WARM, dir: [0.6, -0.6] } }); });
  weightBadge(g, { day: 7, k: 1 });
} });
// s070 — "Day eight, you're as heavy as a fire truck."
registerShot('s070', { draw(g, t, info) { ladder(g, t, info, 8, 'firetruck', { label: 'A FIRE TRUCK', s: 0.68, L: 1700 }); } });
// s071 — "Your school asks you to stay home."  EMAIL
registerShot('s071', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 14, (g) => garage(g, t, { z: 1.3, x: 0, y: 100 })); veil(g, '#1a1030', 0.2);
  const s = 1 + 0.04 * k; g.save(); g.translate(E.W / 2, E.H / 2); g.scale(s, s); g.translate(-E.W / 2, -E.H / 2);
  browserFrame(g, E.W * 0.14, E.H * 0.12, E.W * 0.72, E.H * 0.78, 'school mail · inbox', (g, x, y, w, h) => {
    g.fillStyle = '#e8ecf2'; g.fillRect(x, y, 300, h); uiText(g, 'Inbox', x + 40, y + 60, 30, { weight: 900 }); rr(g, x + 210, y + 42, 50, 36, 18); g.fillStyle = CORAL(); g.fill(); uiText(g, '1', x + 228, y + 61, 24, { color: '#ffffff', weight: 900 });
    for (let i = 0; i < 4; i++) uiText(g, ['Sent', 'Drafts', 'Homework', 'Clubs'][i], x + 40, y + 130 + i * 60, 26, { color: UIS, weight: 700 });
    const X = x + 340; circle(g, X + 40, y + 70, 36, '#2a6a8a'); uiText(g, 'RH', X + 22, y + 72, 28, { color: '#ffffff', weight: 900 }); uiText(g, 'Riverside High School', X + 100, y + 56, 30, { weight: 900 }); uiText(g, 'to: you · 7:02 AM', X + 100, y + 94, 22, { color: UIS, weight: 700 });
    const sk = ease.out(prog(t, 0.3, 0.7)); uiText(g, 'Please stay home', X, y + 200, 64, { weight: 900, a: sk }); rr(g, X, y + 240, 520 * sk, 8, 4); g.fillStyle = CORAL(); g.fill();
    ['Dear student,', 'For everyone\'s safety, please learn from home', 'until further notice.', 'Our floors are rated for 200 kg per square metre.'].forEach((l, i) => uiText(g, l, X, y + 320 + i * 52, 30, { color: i === 3 ? CORAL() : UIT, weight: 700, a: ease.out(prog(t, 0.6 + i * 0.2, 0.9 + i * 0.2)) })); });
  g.restore();
} });
// s072 — "The floors were built for students."  CLASSROOM: students at desks, the floor-load sign
registerShot('s072', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.15 + 0.25 * ease.inOut(k), x: 250 * ease.inOut(k), y: 40 - 60 * ease.inOut(k) }, R = classroom(g, t, cam, { board: 'SCIENCE' });
  layer(g, cam, 0.62, (g) => { rr(g, R.CX + 330, R.GY - 640, 300, 210, 10); g.fillStyle = '#f2c21a'; g.fill(); g.strokeStyle = '#1e1a14'; g.lineWidth = 6; g.strokeRect(R.CX + 344, R.GY - 626, 272, 182);
    text(g, 'MAX FLOOR LOAD', R.CX + 480, R.GY - 590, { size: 26, color: '#1e1a14', font: FONTS.ui, weight: 900 }); text(g, '200 kg/m²', R.CX + 480, R.GY - 520, { size: 52, color: '#1e1a14', font: FONTS.ui, weight: 900 }); });
  layer(g, cam, 1, (g) => { for (let i = 0; i < 4; i++) { const x = R.CX - 600 + i * 380; drawFigure(g, { x: x - 30, y: R.GY, s: 1.15, facing: 1, outfit: KIDS[i], pose: POSES.sit, expr: 'neutral', look: [1, -0.2], rim: { color: WARM, dir: [0.6, -0.6] } }); desk(g, x + 80, R.GY, 0.75); } });
} });
// s073 — "Not for you."  BIG FACE: hood up, the garage
registerShot('s073', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => garage(g, t, { z: 1.4, x: -200, y: 60 })); glow(g, E.W * 0.6, E.H * 0.3, 700, LAMP, 0.3);
  heroFace(g, E.W * 0.5, E.H * 0.6, 290 * (1 + 0.05 * k), { outfit: HOOD, expr: 'sad', look: [-0.3, 0.5], rimColor: LAMP, rimSide: 1 });
  weightBadge(g, { day: 8, k: 1 });
} });
// s074 — "And day nine…"  DUSK at the river; you on the near bank
registerShot('s074', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0 + 0.04 * k, x: -60, y: 0 }, R = river(g, t, cam, { time: 'dusk' });
  layer(g, cam, 1, (g) => drawFigure(g, { x: R.CX - 520, y: R.GY - 44, s: 1.3, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'worried', look: [1, -0.2], rim: { color: '#ffb880', dir: [0.7, -0.5] } }));
  weightBadge(g, { day: 9, k: 1, flip: prog(t, 0.3, 0.7) });
} });
// s075 — "…the bridge."  long lens on the old truss bridge
registerShot('s075', { draw(g, t, info) {
  const k = t / info.dur; river(g, t, { z: 1.8 + 0.12 * k, x: -520, y: 110 }, { time: 'dusk' }); weightBadge(g, { day: 9, k: 1 });
} });
// s076 — "Your grandpa lives on the other side of the river."  his house, porch light on; Grandpa waves
registerShot('s076', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 3.2 + 0.15 * k, x: 1030, y: -150 }, R = river(g, t, cam, { time: 'dusk', noSign: true });
  layer(g, cam, 0.5, (g) => grandpa(g, { x: R.HOUSE[0] + 90, y: R.HOUSE[1] - 2, s: 0.34, facing: -1, outfit: GRANDPA, pose: POSES.wave, expr: 'smile', rim: { color: LAMP, dir: [-0.6, -0.6] } }));
  chip(g, "GRANDPA'S HOUSE", E.W / 2, E.H * 0.82, { size: 40, k: prog(t, 0.4, 0.8) }); weightBadge(g, { day: 9, k: 1 });
} });
// s077 — "The sign says ten tonnes."  INSERT: the 10 t sign
registerShot('s077', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 14, (g) => river(g, t, { z: 1.5, x: -300, y: 60 }, { time: 'dusk', noSign: true })); glow(g, E.W / 2, E.H * 0.42, 700, '#ffb880', 0.35);
  const p = ease.outBack(prog(t, wt('ten', info, t, 1.0) - 0.1, wt('ten', info, t, 1.0) + 0.2)); limitSign(g, E.W / 2, E.H * 0.42, 2.3 + 0.1 * k + 0.12 * p, '10 t');
  text(g, 'MAX WEIGHT', E.W / 2, E.H * 0.82, { size: 52, color: '#ffffff', font: FONTS.ui, weight: 900, spacing: 6, stroke: 8, strokeColor: '#140c1e', alpha: ease.out(prog(t, 0.3, 0.7)) });
  weightBadge(g, { day: 9, k: 1, danger: true });
} });
// s078 — "You weigh thirty-six, as much as a fully loaded eighteen-wheeler."
registerShot('s078', { draw(g, t, info) { ladder(g, t, info, 9, 'semi', { label: 'AN 18-WHEELER', s: 0.62, L: 1700 }); text(g, '36 t  >  10 t', E.W * 0.74, E.H * 0.3, { size: 54, color: CORAL(), font: FONTS.ui, weight: 900, stroke: 8, strokeColor: '#140c1e', alpha: ease.out(prog(t, 2.0, 2.4)) }); } });
// video call screen: Grandpa on his porch, you in the corner tile; z = zoom on Grandpa's face, talk = mouth
function videoCall(g, t, o = {}) {
  const x = E.W * 0.18, y = E.H * 0.08, w = E.W * 0.64, h = E.H * 0.84, z = o.z || 1;
  g.save(); g.translate(E.W / 2, E.H * 0.5); g.scale(z, z); g.translate(-E.W / 2, -E.H * 0.5);
  rr(g, x - 16, y - 16, w + 32, h + 32, 54); g.fillStyle = '#14161e'; g.fill(); g.save(); rr(g, x, y, w, h, 40); g.clip();
  g.fillStyle = linGrad(g, 0, y, 0, y + h, ['#e8d0a8', '#c8a880']); g.fillRect(x, y, w, h); g.fillStyle = '#8a6a4a'; for (let i = 0; i < 8; i++) g.fillRect(x, y + 40 + i * 110, w, 6);
  rr(g, x + w * 0.66, y + 90, 220, 180, 8); g.fillStyle = '#ffd890'; g.fill(); circle(g, x + 120, y + 120, 18, '#fff2c8'); glow(g, x + 120, y + 120, 300, LAMP, 0.6);
  grandpaFace(g, x + w / 2, y + h * 0.62, 250, { expr: o.expr || 'smile', talk: o.talk || 0, look: [0, 0.2], rimColor: LAMP, rimSide: -1 });
  g.fillStyle = 'rgba(10,12,20,.55)'; g.fillRect(x, y, w, 90); uiText(g, 'GRANDPA', x + 50, y + 46, 34, { color: '#ffffff', weight: 900, spacing: 3 }); uiText(g, `00:${String(Math.floor(3 + t)).padStart(2, '0')}`, x + 260, y + 46, 30, { color: '#cfd8e8', weight: 700 });
  const tx = x + w - 250, ty = y + 120; rr(g, tx, ty, 210, 280, 22); g.fillStyle = '#3a3346'; g.fill(); g.save(); rr(g, tx, ty, 210, 280, 22); g.clip(); glow(g, tx + 105, ty + 100, 200, '#9fd8ff', 0.4); heroFace(g, tx + 105, ty + 160, 64, { outfit: HOOD, expr: o.youExpr || 'smallSmile', look: [0, 0], rimColor: '#9fd8ff' }); g.restore(); g.strokeStyle = '#ffffff'; g.lineWidth = 4; rr(g, tx, ty, 210, 280, 22); g.stroke();
  for (const [i, c] of [[-1, '#5a6070'], [0, '#e8462a'], [1, '#5a6070']]) circle(g, x + w / 2 + i * 140, y + h - 90, 46, c); g.save(); g.translate(x + w / 2, y + h - 90); g.rotate(2.36); rr(g, -28, -9, 56, 18, 9); g.fillStyle = '#ffffff'; g.fill(); g.restore();
  g.restore(); g.restore();
}
// s079 — "So he calls you every night."  VIDEO CALL: Grandpa on the porch, you small in the corner
registerShot('s079', { draw(g, t, info) {
  blurLayer(g, 14, (g) => garage(g, t, { z: 1.3, x: 0, y: 100 })); veil(g, '#0e0a1e', 0.3); videoCall(g, t, { z: 1 + 0.03 * t / info.dur });
} });
// s080 — "And every night, he asks the same thing."  GARAGE night: you on the mattress, phone glow, tally marks
registerShot('s080', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.45 + 0.08 * k, x: -140, y: 160 }, R = garage(g, t, cam);
  layer(g, cam, 0.62, (g) => { for (let i = 0; i < 6; i++) { const x = R.CX + 120 + i * 30; seg(g, [[x, R.GY - 520], [x + 4, R.GY - 420]], 6, alpha('#f4efe6', 0.8)); } seg(g, [[R.CX + 105, R.GY - 440], [R.CX + 280, R.GY - 500]], 6, alpha('#f4efe6', 0.8)); text(g, 'NIGHTS', R.CX + 190, R.GY - 560, { size: 26, color: alpha('#f4efe6', 0.8), font: FONTS.ui, weight: 900, spacing: 4 }); });
  layer(g, cam, 1, (g) => { rr(g, R.CX - 520, R.GY - 50, 560, 50, 14); g.fillStyle = '#5a7ac8'; g.fill(); const x = R.CX - 300, y = R.GY - 40, s = 1.4;
    drawFigure(g, { x, y, s, facing: 1, outfit: HOOD, pose: breathe({ ...FLOORSIT, eF: [30, -60], hF: [40, -96] }, t), expr: 'smallSmile', look: [1, 0.3], rim: { color: '#9fd8ff', dir: [1, -0.2] } });
    const px = x + 40 * s, py = y - 96 * s; rr(g, px - 10, py - 40, 22, 40, 4); g.fillStyle = '#14161e'; g.fill(); g.fillStyle = '#9fd8ff'; g.fillRect(px - 6, py - 36, 14, 32); glow(g, px, py - 20, 260, '#9fd8ff', 0.55); });
  weightBadge(g, { day: 9, k: 1 });
} });
// s081 — "You still floating, kiddo?"  VIDEO CALL close: Grandpa's big face, smiling — his line
registerShot('s081', { draw(g, t, info) {
  blurLayer(g, 14, (g) => garage(g, t, { z: 1.3, x: 0, y: 100 })); veil(g, '#0e0a1e', 0.3); const [sx, sy] = shake(t, 4, 1.2);
  g.save(); g.translate(sx, sy); videoCall(g, t, { z: 1.55 + 0.06 * t / info.dur, talk: talkAmount(info.globalT, 219.47, 221.55), expr: 'smile' }); g.restore();
} });
