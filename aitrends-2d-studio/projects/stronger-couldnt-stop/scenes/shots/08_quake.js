// shots/08_quake.js — the earthquake: your building is down, Lily is under a 400-tonne slab; you run back, lift it with
// one hand and pick her up like an egg; dad's hand on your shoulder — "Strong is easy, kiddo. Gentle is hard."
import { E, V, S, registerShot, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake, rng, talkAmount } from '/engine/core.js';
import { drawFigure, POSES, breathe, walkPose, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { van, mountain, steelRoom, cityQuake, rubble, slab, ambulance } from '../sets/atlas.js';
import { roadNight } from '../sets/hospital.js';
import { crib } from '../sets/home.js';
import { YOU, DAD, MOM, VOSS, FIRE, LILY_PINK } from '../cast.js';
import { heroFace, hand, chip, egg, impact, debris, cracks, dayBadge, wt, GOLD, CORAL, car, baby, tally, palmUp, fallingDust } from '../lib.js';

const DAD_LINE = [353.0, 357.48], WARM = '#ffd8a8';
const HOLD = { ...POSES.holdFront, hF: [34, -150], eF: [22, -132], hB: [26, -146], eB: [14, -128] };
const LIFT = { ...POSES.stand, eB: [-16, -232], hB: [-8, -300], head: [6, -206] };

// blanket over the shoulders (drawn on top of a standing figure at x,y scale s)
function blanket(g, x, y, s, col = '#c87a3a') { g.save(); g.translate(x, y); g.scale(s, s); g.globalAlpha *= 0.92; rr(g, -36, -188, 74, 100, 26); g.fillStyle = col; g.fill(); seg(g, [[-26, -170], [-30, -94]], 4, shade(col, -0.3)); seg(g, [[24, -172], [30, -94]], 4, shade(col, -0.3)); g.restore(); }
// emergency light wash over a whole frame
function siren(g, t, a = 0.12) { const ph = Math.sin(t * 7) > 0; g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = alpha(ph ? '#ff3a3a' : '#3a6aff', a); g.fillRect(0, 0, E.W, E.H); g.restore(); }
// a firefighter; o.torch = beam direction (radians)
function fireman(g, x, y, s, t, o = {}) {
  drawFigure(g, { x, y, s, facing: o.facing ?? 1, outfit: FIRE, pose: o.pose || breathe(POSES.stand, t, 1, x), expr: o.expr || 'worried', look: o.look, talk: o.talk || 0, rim: { color: '#ffe7c0', dir: [-0.6, -0.6] }, blink: (t % (2.7 + (x % 7) * 0.1)) > 2.55 });
  if (o.torch != null) FX.lightCone(g, x + (o.facing ?? 1) * 40 * s, y - 150 * s, { angle: o.torch, spread: 0.18, len: 700, color: '#fff6d8', a: 0.22 });
}
// the rubble pile with the big slab on top; lift 0..1 raises it (pivot at the left end)
function slabPile(g, R, lift = 0) { const { GY, CX } = R; slab(g, CX + 260, GY - 150 - lift * 330, 980, 170, -0.06 - lift * 0.05); }

// s119 — "Then the phone rings."  STEEL ROOM: the wall phone flashes red
registerShot('s119', { draw(g, t, info) {
  const k = t / info.dur, [sx, sy] = shake(t, 3, 20), cam = { z: 1.8 + 0.08 * k, x: -1150 + sx, y: -230 + sy };
  steelRoom(g, t, cam, { phone: 1 });
  FX.rings(g, E.W / 2, E.H / 2 - 60, t, { count: 3, r0: 140, r1: 420, color: '#ff5a4a', a: 0.35 });
  text(g, 'RING!', E.W * 0.72, E.H * 0.3, { size: 90, color: '#ffffff', font: FONTS.ui, weight: 900, stroke: 8, strokeColor: '#a01a1a', alpha: Math.sin(t * 20) > -0.3 ? 1 : 0.4 });
} });

// s120 — "An earthquake has hit your city."  CITY at night shaking, dust clouds, news ticker
registerShot('s120', { draw(g, t, info) {
  const k = t / info.dur, [sx, sy] = shake(t, 14, 18), cam = { z: 1.05 + 0.05 * k, x: sx, y: sy };
  cityQuake(g, t, cam, { q: 1 });
  rr(g, -10, E.H * 0.78, E.W + 20, 86, 0); g.fillStyle = '#c8241a'; g.fill(); rr(g, 30, E.H * 0.78 + 12, 280, 62, 8); g.fillStyle = '#ffffff'; g.fill();
  text(g, 'BREAKING', 170, E.H * 0.78 + 44, { size: 38, color: '#c8241a', font: FONTS.ui, weight: 900, spacing: 2 });
  g.save(); g.beginPath(); g.rect(330, E.H * 0.78, E.W, 86); g.clip(); text(g, 'MAGNITUDE 7.8 EARTHQUAKE HITS THE CITY  ·  BUILDINGS DOWN  ·  ', 360 + E.W * 0.3 - t * 260, E.H * 0.78 + 44, { size: 40, color: '#ffffff', font: FONTS.ui, weight: 900, align: 'left' }); g.restore();
} });

// s121 — "Your building is down."  WIDE: the collapsed building, floodlights, firefighters
registerShot('s121', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.02 + 0.05 * k, x: lerp(-40, 40, k), y: 20 }, R = rubble(g, t, cam);
  layer(g, cam, 1, (g) => { slabPile(g, R); g.save(); g.translate(R.CX - 420, R.GY - 60); g.rotate(0.5); rr(g, -50, -25, 100, 50, 8); g.fillStyle = '#f2ebe0'; g.fill(); text(g, '27', 0, 2, { size: 30, color: '#3a3040', font: FONTS.ui, weight: 900 }); g.restore();
    fireman(g, R.CX - 700, R.GY + 40, 1.0, t, { torch: -0.5 }); fireman(g, R.CX + 720, R.GY + 60, 1.0, t, { facing: -1, torch: Math.PI + 0.5 }); });
  siren(g, t, 0.06);
} });

// s122 — "Your mom and dad got out."  MEDIUM: mom and dad in blankets by the ambulance, mom crying
registerShot('s122', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.55 + 0.04 * k, x: -300, y: 170 }, R = rubble(g, t, cam);
  layer(g, cam, 1, (g) => { ambulance(g, R.CX - 120, R.GY + 60, 1.1, t);
    drawFigure(g, { x: R.CX - 640, y: R.GY + 60, s: 1.35, facing: 1, outfit: MOM, pose: breathe(POSES.stand, t), expr: 'cry', rim: { color: WARM, dir: [0.8, -0.4] } }); blanket(g, R.CX - 640, R.GY + 60, 1.35, '#c87a3a');
    drawFigure(g, { x: R.CX - 420, y: R.GY + 60, s: 1.42, facing: -1, outfit: DAD, pose: { ...POSES.reach, hF: [60, -170], eF: [30, -150] }, expr: 'sad', look: [-1, 0.2], rim: { color: WARM, dir: [-0.8, -0.4] } }); blanket(g, R.CX - 420, R.GY + 60, 1.42, '#8a8a9a'); });
  siren(g, t, 0.07);
} });

// s123 — "Lily didn't."  CLOSE: the crib mobile hangs in the rubble, dust falling
registerShot('s123', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => rubble(g, t, { z: 1.6, x: 200, y: 100 })); veil(g, 'rgba(10,8,20,.35)');
  const z = 1 + 0.06 * k; g.save(); g.translate(E.W / 2, E.H / 2); g.scale(z, z); g.translate(-E.W / 2, -E.H / 2);
  const r = rng(4); for (let i = 0; i < 12; i++) { g.save(); g.translate(r() * E.W, E.H * 0.7 + r() * E.H * 0.35); g.rotate((r() - 0.5) * 0.8); g.fillStyle = shade('#8a8488', -0.2 - r() * 0.3); g.fillRect(-160, -60, 320, 120); g.restore(); }
  const ax = E.W * 0.55, ay = E.H * 0.18, sw = 0.12 * Math.sin(t * 1.6);
  seg(g, [[E.W * 0.9, E.H * 0.9], [ax, ay]], 14, '#c8936a'); g.save(); g.translate(ax, ay); g.rotate(sw);
  seg(g, [[-200, 0], [200, 0]], 6, '#f2ebe0'); for (const [dx, sh, c] of [[-180, 'star', '#ffe28a'], [-60, 'moon', '#ffd8e6'], [60, 'star', '#9fd8ff'], [180, 'moon', '#ffe28a']]) { const L = 160 + (dx % 120); seg(g, [[dx, 0], [dx, L]], 2, alpha('#ffffff', 0.7));
    if (sh === 'star') FX.sparkle(g, dx, L + 30, 40, c, 1); else { circle(g, dx, L + 30, 34, c); circle(g, dx + 16, L + 22, 30, '#2a2030'); } }
  g.restore(); glow(g, ax, ay + 200, 360, '#ffd8e6', 0.18);
  rr(g, E.W * 0.22, E.H * 0.8, 200, 60, 20); g.fillStyle = LILY_PINK; g.fill(); slab(g, E.W * 0.28, E.H * 0.82, 700, 150, -0.08);
  g.restore(); fallingDust(g, t, { count: 80, a: 0.55 });
} });

// s124 — "You're there in four minutes."  ACTION: huge bounds over the traffic, speed lines, 4:00
registerShot('s124', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.25, x: t * 1400, y: -40 }, { GY, CX, LANE } = roadNight(g, t, cam);
  layer(g, cam, 1, (g) => { for (let i = 0; i < 5; i++) car(g, CX - 600 + i * 760, LANE + 60, 1.1, { color: ['#c84a3a', '#e8e4dc', '#2a6a8a', '#f2c21a', '#5a5a6a'][i], lights: true });
    const ph = (t * 1.1) % 1, x = CX + t * 1400 - 200, y = LANE - 40 - Math.sin(ph * Math.PI) * 300;
    drawFigure(g, { x, y, s: 1.5, facing: 1, outfit: YOU, pose: POSES.jump, rot: 0.25, expr: 'determined', rim: { color: '#ffcf8a', dir: [-0.6, -0.6], w: 6 } });
    if (ph < 0.12) impact(g, x, LANE - 30, ph * 2, { r: 220 }); });
  FX.speedLines(g, t, { cx: E.W * 0.5, cy: E.H * 0.45, count: 30, a: 0.18, inner: 260 });
  chip(g, '4:00', E.W * 0.86, E.H * 0.16, { size: 54, k: prog(t, 0.1, 0.4) });
} });

// s125 — "You didn't wait for the van."  MOUNTAIN gate: the van still parked, Voss shouting after a dust trail
registerShot('s125', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.35, x: 140, y: 120 }, { GY, TX } = mountain(g, t, cam);
  layer(g, cam, 1, (g) => { van(g, TX - 560, GY + 120, 0.75, { lights: true });
    drawFigure(g, { x: TX - 160, y: GY + 130, s: 1.3, facing: -1, outfit: VOSS, pose: { ...POSES.point, hF: [80, -200], eF: [40, -180] }, expr: 'shocked', talk: 0.6 + 0.4 * Math.sin(t * 14), rim: { color: '#d8ecff', dir: [1, -0.4] } });
    for (let i = 0; i < 14; i++) { const r = rng(i), x = TX - 1200 - r() * 600 - t * 300, y = GY + 100 - r() * 140; circle(g, x, y, 40 + r() * 70 + t * 30, alpha('#c8a888', 0.35 * (1 - t / 2))); } });
  FX.speedLines(g, t, { cx: E.W * 0.05, cy: E.H * 0.6, count: 12, a: 0.12, inner: 120 });
} });

// s126 — "You ran."  IMPACT: you land in a crouch, the asphalt cracks in a ring
registerShot('s126', { draw(g, t, info) {
  const hit = 0.22, age = t - hit, [sx, sy] = shake(t, age > 0 && age < 0.5 ? 20 : 2, 26), cam = { z: 1.4, x: sx, y: 140 + sy };
  const R = rubble(g, t, cam);
  layer(g, cam, 1, (g) => { const y = age < 0 ? lerp(R.GY - 900, R.GY + 80, t / hit) : R.GY + 80;
    if (age > 0) { g.save(); g.translate(R.CX, R.GY + 90); g.scale(1, 0.3); cracks(g, 0, 0, 520, ease.out(prog(age, 0, 0.4)), { seed: 9, color: 'rgba(20,16,20,.9)', w: 8, arms: 12, rings: 2, glowCol: '#ffcf8a' }); g.restore(); impact(g, R.CX, R.GY + 40, age, { r: 380, color: '#ffe0b0' }); debris(g, R.CX, R.GY + 60, age, { n: 18, color: '#8a8488', size: 18, speed: 900 }); }
    drawFigure(g, { x: R.CX, y, s: 1.6, facing: 1, outfit: YOU, pose: age < 0 ? POSES.jump : POSES.crouch, expr: 'determined', rim: { color: WARM, dir: [-0.6, -0.7], w: 6 } }); });
  siren(g, t, 0.06);
} });

// s127 — "The firefighters say the slab on top of her room weighs four hundred tonnes."  WIDE: a firefighter points at the slab
registerShot('s127', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.12 + 0.06 * ease.inOut(k), x: 60, y: 30 }, R = rubble(g, t, cam);
  layer(g, cam, 1, (g) => { slabPile(g, R);
    fireman(g, R.CX - 520, R.GY + 70, 1.3, t, { pose: { ...POSES.point, hF: [86, -196], eF: [44, -184] }, expr: 'worried', talk: talkAmount(info.globalT, info.globalT - t + 0.2, info.globalT - t + 3.5) * 0.7 });
    drawFigure(g, { x: R.CX - 820, y: R.GY + 70, s: 1.35, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'scared', look: [1, -0.5], rim: { color: WARM, dir: [0.6, -0.6] } });
    const w = prog(t, wt('four', info, t, 2.2) - 0.1, wt('four', info, t, 2.2) + 0.4); if (w > 0) { g.save(); g.globalAlpha *= clamp(w * 2); UI.dimension(g, t, { x1: R.CX - 230, y1: R.GY - 380, x2: R.CX + 750, y2: R.GY - 420, str: '', color: CORAL(), start: wt('four', info, t, 2.2) }); g.restore(); } });
  const f = wt('four', info, t, 2.2); chip(g, '400 TONNES', E.W * 0.58, E.H * 0.2, { size: 60, k: prog(t, f, f + 0.3) });
  siren(g, t, 0.05);
} });

// s128 — "They need a crane."  MEDIUM: the firefighter on the radio
registerShot('s128', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.9 + 0.05 * k, x: -520, y: 210 }, R = rubble(g, t, cam);
  layer(g, cam, 1, (g) => { slabPile(g, R); fireman(g, R.CX - 520, R.GY + 70, 1.3, t, { pose: POSES.phone, expr: 'worried', talk: 0.5 + 0.5 * Math.sin(t * 12), look: [0.3, 0] }); });
  chip(g, 'CRANE NEEDED', E.W * 0.7, E.H * 0.2, { size: 52, k: prog(t, 0.3, 0.6) }); siren(g, t, 0.05);
} });

// s129 — "The crane is two hours away."  MAP: the route from a far-off crane to the pin, 2 HOURS
registerShot('s129', { draw(g, t, info) {
  UI.blueprint(g, { grid: 90, a: 0.1 }); const ui = S().ui, k = t / info.dur;
  g.strokeStyle = alpha(ui.blueprint, 0.35); g.lineWidth = 10; for (const [a, b] of [[[0, 300], [E.W, 260]], [[0, 700], [E.W, 760]], [[400, 0], [480, E.H]], [[1200, 0], [1100, E.H]], [[0, 1000], [E.W, 900]]]) { g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.stroke(); }
  const P = [[E.W * 0.82, E.H * 0.7], [E.W * 0.6, E.H * 0.66], [E.W * 0.58, E.H * 0.28], [E.W * 0.24, E.H * 0.3], [E.W * 0.2, E.H * 0.24]], p = ease.inOut(prog(t, 0.2, 1.8));
  g.save(); g.setLineDash([24, 18]); g.strokeStyle = CORAL(); g.lineWidth = 8; g.beginPath(); g.moveTo(...P[0]); const n = (P.length - 1) * p; for (let i = 1; i <= Math.ceil(n); i++) { const q = Math.min(1, n - (i - 1)); g.lineTo(lerp(P[i - 1][0], P[i][0], q), lerp(P[i - 1][1], P[i][1], q)); } g.stroke(); g.restore();
  const [cx, cy] = P[0]; seg(g, [[cx - 40, cy + 40], [cx - 40, cy - 120]], 12, GOLD()); seg(g, [[cx - 60, cy - 120], [cx + 120, cy - 120]], 10, GOLD()); seg(g, [[cx + 110, cy - 120], [cx + 110, cy - 50]], 4, GOLD()); rr(g, cx - 90, cy + 30, 100, 40, 6); g.fillStyle = GOLD(); g.fill();
  text(g, 'CRANE', cx + 20, cy + 110, { size: 34, color: GOLD(), font: FONTS.ui, weight: 900, spacing: 3 });
  const [lx, ly] = P[4]; circle(g, lx, ly - 30, 34, LILY_PINK); poly(g, [[lx - 28, ly - 14], [lx + 28, ly - 14], [lx, ly + 30]], LILY_PINK); circle(g, lx, ly - 30, 12, '#ffffff'); text(g, 'LILY', lx, ly + 70, { size: 34, color: LILY_PINK, font: FONTS.ui, weight: 900, spacing: 3 });
  text(g, '2 HOURS', E.W * 0.5, E.H * 0.52, { size: 120, color: CORAL(), font: FONTS.ui, weight: 900, glow: 24, glowColor: alpha(CORAL(), 0.6), alpha: ease.out(prog(t, 0.6, 1.0)) });
} });

// s130 — "You don't need a crane."  BIG FACE: determined, gold eyes, dust in the air
registerShot('s130', { draw(g, t, info) {
  const k = t / info.dur, cx = E.W * 0.5, cy = E.H * 0.6, r = 330 * (1 + 0.05 * k);
  blurLayer(g, 12, (g) => rubble(g, t, { z: 1.4, x: 200, y: -60 })); siren(g, t, 0.06);
  heroFace(g, cx, cy, r, { outfit: YOU, expr: 'determined', look: [0, 0], rimColor: WARM, rimSide: 1 });
  const e = ease.out(prog(t, 0.4, 1.0)); for (const sx of [-1, 1]) { glow(g, cx + sx * r * 0.34, cy - r * 0.16, r * 0.55, GOLD(), 0.6 * e); ring(g, cx + sx * r * 0.34, cy - r * 0.16, r * 0.2, r * 0.05, alpha(GOLD(), 0.85 * e)); }
  fallingDust(g, t, { count: 50, a: 0.45 });
} });

// s131 — "You lift four hundred tonnes of concrete with your left hand."  WIDE: the slab goes up on one hand, firefighters in awe
registerShot('s131', { draw(g, t, info) {
  const k = t / info.dur, lift = ease.inOut(prog(t, 0.5, 2.6)), [sx, sy] = shake(t, lift > 0 && lift < 1 ? 8 : 1, 22), cam = { z: 1.32 + 0.05 * k, x: 160 + sx, y: 10 + sy };
  const R = rubble(g, t, cam);
  layer(g, cam, 1, (g) => { const hx = R.CX + 240, s = 1.6, top = R.GY - 150 - lift * 330 + 6;
    if (lift > 0) poly(g, [[R.CX - 200, R.GY - 150], [R.CX + 740, R.GY - 190], [R.CX + 740, top - 40], [R.CX - 200, top + 10]], '#07060c');
    slabPile(g, R, lift);
    const fy = R.GY - 20, hy = Math.min(fy - 300 * s, top); drawFigure(g, { x: hx, y: fy, s, facing: 1, outfit: YOU, pose: { ...LIFT, hB: [-8, (hy - fy) / s], eB: [-16, (hy - fy) / s + 68] }, expr: 'determined', rim: { color: WARM, dir: [-0.6, -0.6], w: 6 } });
    g.save(); g.translate(hx, fy + 6); g.scale(1, 0.3); cracks(g, 0, 0, 300, lift, { seed: 5, color: 'rgba(20,16,20,.85)', w: 6, arms: 10, rings: 1 }); g.restore();
    for (let i = 0; i < 6; i++) { const r = rng(i + 50), d = ((t * 0.9 + r()) % 1); circle(g, R.CX - 200 + r() * 900, top - 100 + d * 300, 6 + r() * 6, alpha('#c8b8b0', 0.6 * (1 - d))); }
    fireman(g, R.CX - 220, R.GY + 70, 1.3, t, { expr: lift > 0.3 ? 'awe' : 'worried', look: [1, -0.6] }); fireman(g, R.CX - 430, R.GY + 80, 1.25, t, { expr: lift > 0.4 ? 'shocked' : 'worried', look: [1, -0.6] }); });
  chip(g, '400 TONNES', E.W * 0.74, E.H * 0.16, { size: 44, k: prog(t, 0.2, 0.5) }); siren(g, t, 0.05);
} });

// s132 — "And with your right hand, you reach into the dark..."  DARK GAP: a torch beam finds the crib
registerShot('s132', { draw(g, t, info) {
  const k = t / info.dur; g.fillStyle = '#07060c'; g.fillRect(0, 0, E.W, E.H);
  slab(g, E.W * 0.5, E.H * 0.2, E.W * 1.3, 300, 0.03); g.fillStyle = '#3a3438'; poly(g, [[0, E.H], [0, E.H * 0.82], [E.W * 0.3, E.H * 0.76], [E.W * 0.7, E.H * 0.8], [E.W, E.H * 0.74], [E.W, E.H]], '#3a3438');
  const bx = lerp(E.W * 0.95, E.W * 0.7, ease.inOut(prog(t, 0, 2))); FX.lightCone(g, E.W * 0.05, E.H * 0.3, { angle: Math.atan2(E.H * 0.42, bx - E.W * 0.05), spread: 0.14, len: 1800, color: '#fff2d0', a: 0.28 });
  glow(g, bx, E.H * 0.7, 300, '#fff2d0', 0.4); g.save(); g.beginPath(); g.arc(bx, E.H * 0.68, 260, 0, Math.PI * 2); g.clip(); crib(g, E.W * 0.76, E.H * 0.88, 0.8, { t }); rr(g, E.W * 0.7, E.H * 0.7, 160, 50, 20); g.fillStyle = LILY_PINK; g.fill(); g.restore();
  const p = ease.out(prog(t, 0.3, 3.0)); hand(g, lerp(E.W * 0.15, E.W * 0.58, p), E.H * 0.6, 1.3, { from: [-300, E.H * 0.45], sleeve: YOU.color, open: 1, rim: { color: '#fff2d0', dir: [0.4, -1] } });
  fallingDust(g, t, { count: 50, a: 0.4, speed: 60 });
} });

// s133 — "and pick up your sister."  CLOSE: your hand lifts Lily out into the light
registerShot('s133', { draw(g, t, info) {
  const k = t / info.dur, up = ease.out(prog(t, 0, 1.6)); blurLayer(g, 12, (g) => rubble(g, t, { z: 1.5, x: 300, y: -120 })); glow(g, E.W * 0.5, E.H * 0.4, 700, WARM, 0.35);
  const py = lerp(E.H * 0.95, E.H * 0.66, up); palmUp(g, E.W * 0.5, py, 1.05, { sleeve: YOU.color, rim: WARM });
  baby(g, E.W * 0.5 + 10, py - 90, 1.25, { expr: t > 1.2 ? 'smile' : 'sleep', rim: alpha(WARM, 0.8) });
  fallingDust(g, t, { count: 40, a: 0.35, speed: 50 });
} });

// s134 — "Like an egg."  MATCH CUT: the egg on your palm becomes Lily on your palm
registerShot('s134', { draw(g, t, info) {
  const sw = 0.7, k = t / info.dur, py = E.H * 0.66;
  if (t < sw) { blurLayer(g, 16, (g) => steelRoom(g, t, { z: 1.5, x: -100, y: 120 })); glow(g, E.W * 0.5, E.H * 0.42, 560, GOLD(), 0.35); palmUp(g, E.W * 0.5, py, 1.05, { sleeve: YOU.color }); egg(g, E.W * 0.5, py - 130, 2.4, { rim: alpha('#ffe2a8', 0.9), glowC: GOLD() }); }
  else { blurLayer(g, 12, (g) => rubble(g, t, { z: 1.5, x: 300, y: -120 })); glow(g, E.W * 0.5, E.H * 0.4, 700, WARM, 0.4); palmUp(g, E.W * 0.5, py, 1.05, { sleeve: YOU.color, rim: WARM }); baby(g, E.W * 0.5 + 10, py - 90, 1.25, { expr: 'smile', rim: alpha(WARM, 0.8) }); }
  const f = clamp(1 - Math.abs(t - sw) / 0.18); if (f > 0) { g.fillStyle = alpha('#ffffff', 0.7 * f); g.fillRect(0, 0, E.W, E.H); }
} });

// s135 — "She grabs your finger and squeezes."  INSERT: Lily's tiny hand wraps around your finger
registerShot('s135', { draw(g, t, info) {
  const k = t / info.dur, sq = t > 1.2 ? 1 + 0.06 * Math.sin((t - 1.2) * 10) * Math.exp(-(t - 1.2) * 1.2) : 1, grab = ease.out(prog(t, 0.3, 0.9)), ink = S().ink;
  blurLayer(g, 14, (g) => rubble(g, t, { z: 1.6, x: 300, y: -80 })); glow(g, E.W * 0.5, E.H * 0.5, 700, WARM, 0.4);
  seg(g, [[E.W + 200, E.H * 0.62], [E.W * 0.7, E.H * 0.5]], 300, YOU.color);
  for (const [w, c] of [[12, alpha(WARM, 0.9)], [0, ink]]) { circle(g, E.W * 0.68, E.H * 0.5, 150 + w / 2, c); seg(g, [[E.W * 0.6, E.H * 0.46], [E.W * 0.3, E.H * 0.44]], 90 + w, c); }
  g.save(); g.translate(E.W * 0.42, E.H * 0.45 + 70); g.scale(sq, sq);
  for (const [w, c] of [[10, alpha(WARM, 0.95)], [0, ink]]) { seg(g, [[-140, 330], [-10, 60]], 150 + w, c === ink ? LILY_PINK : c); circle(g, 0, 30, 64 + w / 2, c);
    for (let i = 0; i < 4; i++) { const x = -48 + i * 32; seg(g, [[x, 0], [x + 4, lerp(-30, -120, grab)]], 24 + w, c); } seg(g, [[52, 30], [lerp(80, 50, grab), lerp(0, -110, grab)]], 26 + w, c); }
  g.restore();
  if (t > 1.2) FX.rings(g, E.W * 0.4, E.H * 0.45, t - 1.2, { count: 2, r0: 80, r1: 260, color: WARM, a: 0.35 });
} });

// s136 — "For the first time in thirteen days, something squeezes back."  BIG FACE: tears and a smile, warm light
registerShot('s136', { draw(g, t, info) {
  const k = t / info.dur, cx = E.W * 0.5, cy = E.H * 0.6, r = 330 * (1 + 0.05 * k);
  blurLayer(g, 12, (g) => rubble(g, t, { z: 1.4, x: -200, y: -60 })); glow(g, cx, cy - 200, 900, WARM, 0.35);
  heroFace(g, cx, cy, r, { outfit: YOU, expr: t > 0.8 ? 'happy' : 'sad', look: [0, 0.5], rimColor: WARM, rimSide: -1, blink: (t % 3) > 2.85 });
  for (const sx of [-1, 1]) { const d = (t * 0.35 + (sx > 0 ? 0.5 : 0)) % 1; g.fillStyle = alpha('#bfe6ff', 0.9); g.beginPath(); g.ellipse(cx + sx * r * 0.42, cy + r * 0.05 + d * r * 0.5, 14, 22, 0, 0, Math.PI * 2); g.fill(); seg(g, [[cx + sx * r * 0.4, cy - r * 0.02], [cx + sx * r * 0.42, cy + r * 0.05 + d * r * 0.5]], 6, alpha('#bfe6ff', 0.6)); }
  baby(g, E.W * 0.8, E.H * 0.86, 0.9, { expr: 'smile', rim: alpha(WARM, 0.8) });
} });

// s137 — "Your dad is crying."  BIG FACE: dad, tears
registerShot('s137', { draw(g, t, info) {
  const k = t / info.dur, cx = E.W * 0.5, cy = E.H * 0.62, r = 330 * (1 + 0.04 * k);
  blurLayer(g, 12, (g) => rubble(g, t, { z: 1.4, x: 300, y: -60 })); glow(g, cx, cy - 200, 800, WARM, 0.3); siren(g, t, 0.04);
  bigFace(g, cx, cy, r, { outfit: DAD, expr: 'cry', rimColor: WARM, rimSide: 1, blink: (t % 2.6) > 2.45 });
} });

// s138 — "He puts his big hand on your shoulder."  TWO-SHOT: dad's hand on your shoulder, Lily in your arm
registerShot('s138', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.75 + 0.04 * k, x: -120, y: 200 }, R = rubble(g, t, cam);
  layer(g, cam, 1, (g) => { const yx = R.CX - 60, dx = R.CX - 330, s = 1.4, put = ease.inOut(prog(t, 0.2, 1.0));
    drawFigure(g, { x: yx, y: R.GY + 60, s, facing: -1, outfit: YOU, pose: breathe(HOLD, t), expr: 'happy', look: [-1, 0.5], rim: { color: WARM, dir: [0.6, -0.6] } }); baby(g, yx - s * 30, R.GY + 60 - s * 156, 0.42, { expr: 'smile', rot: 0.3 });
    const hf = [lerp(40, (yx + 10 - dx) / 1.45, put), lerp(-120, -172, put)];
    drawFigure(g, { x: dx, y: R.GY + 60, s: 1.45, facing: 1, outfit: DAD, pose: { ...POSES.reach, hF: hf, eF: [hf[0] * 0.55, -170] }, expr: 'cry', look: [1, 0.2], rim: { color: WARM, dir: [-0.6, -0.6] } });
    circle(g, dx + hf[0] * 1.45, R.GY + 60 + hf[1] * 1.45, 26, S().ink); });
  siren(g, t, 0.04);
} });

// s139 — DAD: "Strong is easy, kiddo. Gentle is hard."  BIG FACE: crying and proud
registerShot('s139', { draw(g, t, info) {
  const k = t / info.dur, cx = E.W * 0.5, cy = E.H * 0.62, r = 340 * (1 + 0.05 * k), talk = talkAmount(info.globalT, ...DAD_LINE);
  blurLayer(g, 12, (g) => rubble(g, t, { z: 1.4, x: 300, y: -60 })); glow(g, cx, cy - 200, 900, WARM, 0.4);
  bigFace(g, cx, cy, r, { outfit: DAD, expr: 'smile', talk, rimColor: WARM, rimSide: 1, blink: (t % 3) > 2.86 });
  for (const sx of [-1, 1]) { const d = (t * 0.3 + (sx > 0 ? 0.4 : 0)) % 1; g.fillStyle = alpha('#bfe6ff', 0.9); g.beginPath(); g.ellipse(cx + sx * r * 0.4, cy + d * r * 0.5, 14, 22, 0, 0, Math.PI * 2); g.fill(); }
} });

// s140 — "And for the first time in your life, you beat him."  MEDIUM: you and dad grin; the tally flips to YOU 1
registerShot('s140', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.6 + 0.05 * k, x: -180, y: 190 }, R = rubble(g, t, cam);
  layer(g, cam, 1, (g) => { drawFigure(g, { x: R.CX - 60, y: R.GY + 60, s: 1.4, facing: -1, outfit: YOU, pose: breathe(HOLD, t), expr: 'joy', look: [-1, -0.2], rim: { color: WARM, dir: [0.6, -0.6] } }); baby(g, R.CX - 60 - 1.4 * 30, R.GY + 60 - 1.4 * 156, 0.42, { expr: 'giggle', rot: 0.3 });
    drawFigure(g, { x: R.CX - 330, y: R.GY + 60, s: 1.45, facing: 1, outfit: DAD, pose: breathe(POSES.stand, t), expr: 'joy', look: [1, -0.2], rim: { color: WARM, dir: [-0.6, -0.6] } }); });
  const f = wt('beat', info, t, 3.2), a = ease.outBack(prog(t, f - 0.4, f)); if (a > 0) { g.save(); g.translate(E.W * 0.78, E.H * 0.3); g.scale(a, a); tally(g, 0, 0, 0.75, { you: t > f ? 1 : 0, k: 1, flash: clamp(1 - (t - f) * 2) }); g.restore(); }
} });
