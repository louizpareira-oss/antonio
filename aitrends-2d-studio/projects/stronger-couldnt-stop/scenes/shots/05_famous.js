// shots/05_famous.js — day nine: the viral video, the bans, the offers, what you COULD do — and the pencil; the nursery.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake, rng } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { street } from '/projects/see-10-seconds/scenes/sets/street.js';
import { rider } from '/projects/see-10-seconds/scenes/sets/street.js';
import { harbor, ship, rail, train, buildsite, gym, office, store } from '../sets/places.js';
import { stadium, goal } from '../sets/hospital.js';
import { classroom, nursery, crib } from '../sets/home.js';
import { YOU, BOSS, GENERAL, FRIEND } from '../cast.js';
import { heroFace, hand, dayBadge, impact, debris, wt, GOLD, CORAL, fmt, car, chip, stamp } from '../lib.js';

// the viral clip, drawn inside a phone screen
function phoneUI(g, t, info, views) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#2a1e3a', '#4a2e4a']); g.fillRect(0, 0, E.W, E.H);
  for (let i = 0; i < 8; i++) glow(g, (i * 331) % E.W, (i * 173) % E.H, 300, ['#ff6a8a', '#6ab0ff', '#ffd47e'][i % 3], 0.12);
  const pw = 1180, ph = 680, px = E.W / 2 - pw / 2, py = E.H / 2 - ph / 2 - 20;
  rr(g, px - 26, py - 26, pw + 52, ph + 52, 50); g.fillStyle = '#0c0c12'; g.fill();
  g.save(); rr(g, px, py, pw, ph, 26); g.clip(); g.translate(px, py); g.scale(pw / E.W, ph / E.H);
  const cam = { z: 1.2, x: 0, y: 60 }; const { GY, CX, M } = street(g, t, cam, { mood: 'day', seed: 31 });
  layer(g, cam, 1, (g) => { const up = ease.out(clamp(t / 1.2)); drawFigure(g, { x: CX - 40, y: GY + 120, s: 1.3, facing: 1, outfit: YOU, pose: { ...POSES.cheer, hF: [20, -270], hB: [-20, -270] }, expr: 'determined', rim: { color: M.rim, dir: [0.8, -0.5] } });
    car(g, CX - 40, GY + 120 - 1.3 * 270 * up + 4, 1.0, { color: '#d64a33' }); rider(g, CX + 260, GY + 150, 1.2, 0, { outfit: FRIEND, expr: 'awe', rim: { color: M.rim, dir: [0.8, -0.5], w: 4 } }); });
  g.restore();
  rr(g, px + 30, py + ph - 40, pw - 60, 8, 4); g.fillStyle = alpha('#ffffff', 0.3); g.fill(); rr(g, px + 30, py + ph - 40, (pw - 60) * ((t * 0.12) % 1), 8, 4); g.fillStyle = '#ff3a3a'; g.fill();
  text(g, '▶', px + 60, py + 60, { size: 40, color: '#ffffff', font: FONTS.ui, weight: 900 });
  text(g, fmt(views) + ' views', E.W / 2 - 280, py + ph + 70, { size: 48, color: '#ffffff', font: FONTS.ui, weight: 900, align: 'left' });
  text(g, '♥ ' + fmt(views * 0.08), E.W / 2 + 380, py + ph + 70, { size: 40, color: '#ff6a8a', font: FONTS.ui, weight: 900 });
}

// s057 — "By day nine, a video of you lifting a car off a cyclist"  PHONE UI: the clip plays
registerShot('s057', { draw(g, t, info) { phoneUI(g, t, info, lerp(1200, 4800000, ease.in(t / info.dur))); dayBadge(g, { day: 9, k: prog(t, 0, 0.35) }); } });

// s058 — "has two hundred million views."  the counter rolls to 200,000,000
registerShot('s058', { draw(g, t, info) {
  const v = lerp(4800000, 200000000, ease.out(prog(t, 0.1, wt('views', info, t, 1.4) + 0.2)));
  phoneUI(g, t + 3.6, info, v);
  if (v > 1.99e8) { const p = ease.outBack(clamp((t - wt('views', info, t, 1.4) - 0.2) * 3)); text(g, '200,000,000', E.W / 2, E.H * 0.16, { size: 110 * p, color: GOLD(), font: FONTS.ui, weight: 900, glow: 30, glowColor: alpha(GOLD(), 0.8), stroke: 8, strokeColor: 'rgba(40,20,10,.6)' }); }
  dayBadge(g, { day: 9 });
} });

// s059 — "Every football league bans you."  STADIUM: your kick blasts the ball through the net; BANNED
registerShot('s059', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.1, x: 60, y: 30 }, kick = 0.3;
  const { GY, CX, M } = stadium(g, t, cam);
  layer(g, cam, 1, (g) => {
    goal(g, CX + 560, GY - 60, 1.0, { hole: t > kick + 0.25 ? 1 : 0 });
    drawFigure(g, { x: CX - 420, y: GY - 60, s: 1.35, facing: 1, outfit: { ...YOU, top: 'jersey', number: '9' }, pose: t < kick ? POSES.ready : POSES.kick, expr: t > kick ? 'shocked' : 'determined', rim: { color: '#e8f0ff', dir: [0, -1] } });
    const bp = clamp((t - kick) / 0.25), bx = lerp(CX - 300, CX + 700, bp), by = lerp(GY - 70, GY - 220, bp);
    if (t < kick) circle(g, CX - 300, GY - 70, 26, '#f2f2f2'); else if (bp < 1) { circle(g, bx, by, 26, '#f2f2f2'); FX.speedLines(g, t, { cx: bx, cy: by, count: 20, a: 0.3, inner: 40 }); }
    if (t > kick + 0.25) { impact(g, CX + 620, GY - 210, t - kick - 0.25, { r: 300, color: '#ffffff' }); debris(g, CX + 700, GY - 300, t - kick - 0.25, { color: '#3a3a52', n: 18, size: 30 }); }
  });
  stamp(g, 'BANNED', E.W * 0.5, E.H * 0.4, t - 1.2, { size: 110, color: CORAL(), rot: -0.15 });
} });

// s060 — "Every gym, too."  GYM: a barbell bent into a U; BANNED on the door
registerShot('s060', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.25, x: -80, y: 60 };
  const { GY, CX, M } = gym(g, t, cam);
  layer(g, cam, 1, (g) => { drawFigure(g, { x: CX - 420, y: GY, s: 1.35, facing: 1, outfit: YOU, pose: POSES.shrug, expr: 'nervous', rim: { color: M.rim, dir: [0.8, -0.4] } });
    const bend = 0.9; g.strokeStyle = '#9aa0aa'; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(CX - 120, GY - 340); g.quadraticCurveTo(CX + 80, GY - 340 + 460 * bend, CX + 280, GY - 340); g.stroke();
    for (const x of [CX - 120, CX + 280]) { rr(g, x - 30, GY - 430, 60, 180, 14); g.fillStyle = '#1e2028'; g.fill(); } });
  stamp(g, 'BANNED', E.W * 0.68, E.H * 0.3, t - 0.35, { size: 90, color: CORAL(), rot: 0.1 });
} });

// s061 — "A construction company offers you a million dollars a day."  OFFICE: hard-hat boss, the contract
registerShot('s061', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.3 + 0.03 * k, x: 0, y: 80 };
  const { GY, CX, M } = office(g, t, cam);
  layer(g, cam, 1, (g) => { drawFigure(g, { x: CX + 320, y: GY, s: 1.4, facing: -1, outfit: BOSS, pose: { ...POSES.explain, hF: [60, -160] }, expr: 'joy', talk: 0.4 * Math.abs(Math.sin(t * 9)), rim: { color: M.rim, dir: [0, -1] } });
    drawFigure(g, { x: CX - 340, y: GY, s: 1.4, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'surprised', rim: { color: M.rim, dir: [0, -1] } }); });
  g.save(); g.translate(E.W * 0.5, E.H * 0.34); g.rotate(-0.04); const p = ease.outBack(prog(t, 0.3, 0.8)); g.scale(p, p);
  rr(g, -260, -150, 520, 300, 12); g.fillStyle = '#fbf8f0'; g.fill(); text(g, 'CONTRACT', 0, -100, { size: 34, color: '#3a3440', font: FONTS.ui, weight: 900, spacing: 4 });
  text(g, '$1,000,000', 0, -10, { size: 80, color: '#2a8a4a', font: FONTS.ui, weight: 900 }); text(g, 'PER DAY', 0, 60, { size: 40, color: '#3a3440', font: FONTS.ui, weight: 900, spacing: 6 }); g.restore();
} });

// s062 — "An army general offers you a lot more."  the general slides over a blank check
registerShot('s062', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.3 + 0.03 * k, x: 0, y: 80 };
  const { GY, CX, M } = office(g, t, cam, { wall: '#b8b0a4' });
  layer(g, cam, 1, (g) => { drawFigure(g, { x: CX + 320, y: GY, s: 1.4, facing: -1, outfit: GENERAL, pose: { ...POSES.point, hF: [80, -150] }, expr: 'smirk', rim: { color: M.rim, dir: [0, -1] } });
    for (let i = 0; i < 3; i++) circle(g, CX + 320 - 20 + i * 14, GY - 1.4 * 150, 7, '#f2c21a');
    drawFigure(g, { x: CX - 340, y: GY, s: 1.4, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'shocked', rim: { color: M.rim, dir: [0, -1] } }); });
  const cx = lerp(E.W * 0.7, E.W * 0.5, ease.out(prog(t, 0.2, 0.9))); g.save(); g.translate(cx, E.H * 0.34);
  rr(g, -280, -110, 560, 220, 12); g.fillStyle = '#e8f2e4'; g.fill(); g.strokeStyle = '#6a8a6a'; g.lineWidth = 3; g.strokeRect(-260, -90, 520, 180);
  text(g, 'PAY TO: YOU', -230, -50, { size: 30, color: '#3a4a3a', font: FONTS.ui, weight: 900, align: 'left' }); text(g, '$ ? ? ? ? ? ?', 0, 30, { size: 70, color: '#2a6a3a', font: FONTS.ui, weight: 900 }); g.restore();
} });

// s063 — "You could build a house in an afternoon."  TIMELAPSE: the sun races, a house frame shoots up
registerShot('s063', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.05, x: 0, y: 20 };
  const { GY, CX, M } = buildsite(g, t, cam, { dayK: 0.2 + 0.7 * k });
  layer(g, cam, 1, (g) => {
    const p = ease.inOut(clamp(k * 1.1)), hx = CX + 100, w = 700, h = 520;
    const n = Math.floor(p * 12); for (let i = 0; i <= Math.min(n, 8); i++) seg(g, [[hx - w / 2 + i * w / 8, GY], [hx - w / 2 + i * w / 8, GY - h * Math.min(1, p * 1.6)]], 14, '#c8965a');
    if (p > 0.4) seg(g, [[hx - w / 2, GY - h], [hx + w / 2, GY - h]], 16, '#c8965a');
    if (p > 0.6) poly(g, [[hx - w / 2 - 40, GY - h], [hx, GY - h - 260 * clamp((p - 0.6) * 3)], [hx + w / 2 + 40, GY - h]], '#b84a3a');
    if (p > 0.75) { rr(g, hx - w / 2, GY - h, w, h, 4); g.fillStyle = alpha('#f2e2c8', clamp((p - 0.75) * 4)); g.fill(); rr(g, hx - 60, GY - 240, 120, 240, 6); g.fillStyle = alpha('#6a4a36', clamp((p - 0.75) * 4)); g.fill(); }
    const x = lerp(CX - 600, CX + 600, (t * 2.2) % 1); drawFigure(g, { x, y: GY, s: 1.0, facing: 1, outfit: YOU, pose: { ...walkPose(t * 18, { run: true }), hF: [30, -250], hB: [-20, -250] }, expr: 'determined', rim: { color: M.rim, dir: [0, -1] }, trail: { count: 3, dx: -40 } });
    seg(g, [[x - 120, GY - 330], [x + 120, GY - 330]], 14, '#c8965a');
  });
  FX.clock(g, E.W * 0.88, E.H * 0.2, 60, t * 4, { speed: 30 });
} });

// s064 — "Pull a ship into port."  HARBOUR: you haul a giant ship to the dock with a rope
registerShot('s064', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0, x: 40, y: 0 };
  const { GY, CX, M, SEA } = harbor(g, t, cam);
  const bx = lerp(CX - 420, CX + 40, ease.inOut(k));                                               // ship flipped: bow (right end) comes toward you
  layer(g, cam, 0.9, (g) => { g.save(); g.translate(bx, 0); g.scale(-1, 1); ship(g, 0, SEA + 40, 0.85); g.restore(); });
  layer(g, cam, 1, (g) => { const hx = CX + 600; drawFigure(g, { x: hx, y: GY, s: 1.3, facing: -1, rot: -0.18, outfit: YOU, pose: { ...POSES.reach, hF: [70, -168], eF: [36, -164] }, expr: 'determined', rim: { color: M.rim, dir: [-0.8, -0.4] } });
    g.strokeStyle = '#d9c09a'; g.lineWidth = 9; g.beginPath(); g.moveTo(hx - 70, GY - 220); g.quadraticCurveTo((hx + bx) / 2, GY - 150 + 30 * Math.sin(t * 3), bx - 20, SEA - 70); g.stroke(); });
} });

// s065 — "Stop a train with one hand."  RAIL: one hand out, the nose crumples to a stop, sparks
registerShot('s065', { draw(g, t, info) {
  const k = t / info.dur, hit = 0.55, cam = { z: 1.1, x: 0, y: 20 }, [sx, sy] = shake(t, t > hit && t < hit + 0.6 ? 12 : 1, 24); cam.x += sx; cam.y += sy;
  const { GY, CX, M, RAIL } = rail(g, t, cam);
  layer(g, cam, 1, (g) => { const tx = t < hit ? lerp(CX + 1400, CX - 120, t / hit) : CX - 120 + 30 * (1 - Math.exp(-(t - hit) * 6));
    train(g, tx, RAIL, 0.9, { crush: ease.out(prog(t, hit, hit + 0.4)) });
    drawFigure(g, { x: CX - 300, y: RAIL, s: 1.3, facing: 1, outfit: YOU, pose: { ...POSES.point, hF: [80, -170], eF: [44, -165] }, expr: 'determined', rim: { color: M.rim, dir: [0.8, -0.4] } });
    if (t > hit) { impact(g, CX - 150, RAIL - 160, t - hit, { r: 260 }); for (let i = 0; i < 12; i++) { const r = rng(i), a = -Math.PI * (0.2 + r() * 0.6), d = (t - hit) * 900 * (0.4 + r()); FX.sparkle(g, CX - 120 + Math.cos(a) * d, RAIL - 30 + Math.sin(a) * d + 600 * (t - hit) ** 2, 14, '#ffd47e', clamp(1.2 - (t - hit))); } }
    if (t < hit) FX.speedLines(g, t, { cx: CX + 300, cy: RAIL - 180, count: 24, a: 0.15, inner: 300 }); });
} });

// s066 — "But you can't hold a pencil."  INSERT: the pencil snaps again
registerShot('s066', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 14, (g) => classroom(g, t, { z: 1.4, x: 200, y: -60 })); veil(g, 'rgba(30,40,80,.2)');
  hand(g, E.W * 0.5, E.H * 0.52, 1.0, { from: [E.W * 0.5 + 500, E.H + 300], sleeve: YOU.color, fist: true });
  const br = ease.out(prog(t, 0.7, 0.9)), x = E.W * 0.47, y = E.H * 0.47;
  for (const dir of [-1, 1]) { g.save(); g.translate(x + dir * br * 20, y); g.rotate(-0.15 + dir * br * 0.9); g.fillStyle = '#f2c21a'; g.fillRect(dir > 0 ? 0 : -180, -12, 180, 24); g.restore(); }
  impact(g, x, y, t - 0.75, { r: 140 });
} });

// s067 — "And there's one thing you want more than all of it."  DOORWAY: an empty crib in soft light
registerShot('s067', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.15 + 0.06 * ease.inOut(k), x: lerp(-60, 60, k), y: 40 };
  const { GY, CX } = nursery(g, t, cam, { night: false, wall: '#d9a8b8' });
  layer(g, cam, 1, (g) => { crib(g, CX + 240, GY, 1.0, { t, color: '#c8936a' }); glow(g, CX + 240, GY - 220, 360, '#ffe2f0', 0.16); });
  layer(g, cam, 1.6, (g) => { g.fillStyle = '#3a2a30'; g.fillRect(-E.W, -E.H, E.W * 0.06 + E.W, E.H * 3); g.fillRect(E.W * 0.9, -E.H, E.W, E.H * 3);
    drawFigure(g, { x: E.W * 0.24, y: GY + 300, s: 1.9, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'sad', look: [1, 0.1], rim: { color: '#ffd8e6', dir: [1, -0.2], w: 6 } }); });
} });
