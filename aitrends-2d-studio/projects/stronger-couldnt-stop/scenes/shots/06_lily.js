// shots/06_lily.js — Lily is born; dad the mechanic; arm wrestling at six ("Strong is easy, kiddo. Gentle is hard.");
// everyone holds Lily — except you.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake, rng, talkAmount } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { street } from '/projects/see-10-seconds/scenes/sets/street.js';
import { kitchen } from '../sets/home.js';
import { hospital, hospitalExt, garage, roadNight } from '../sets/hospital.js';
import { YOU, KIDYOU, DAD, MOM, GRANDMA, NURSE, LILY_PINK } from '../cast.js';
import { heroFace, hand, dayBadge, impact, wt, GOLD, CORAL, chip, car, baby, tally } from '../lib.js';

const warm = (M) => ({ color: '#ffd28a', dir: [1, -0.3] });
const POCKETS = { ...POSES.stand, eF: [12, -140], hF: [10, -106], eB: [-8, -140], hB: [-6, -106], head: [6, -206] };
const HOLD = { ...POSES.holdFront, hF: [34, -150], eF: [22, -132], hB: [26, -146], eB: [14, -128] };
const sepia = (g) => { veil(g, 'rgba(120,70,20,.22)'); g.fillStyle = 'rgba(255,220,160,.06)'; g.fillRect(0, 0, E.W, E.H); };

// s068 — "Your baby sister, Lily,"  ESTABLISH: the hospital at night
registerShot('s068', { draw(g, t, info) { const k = t / info.dur; hospitalExt(g, t, { z: 1.0 + 0.05 * ease.inOut(k), y: lerp(40, 0, k) }); FX.dust(g, t, { count: 20, color: '#ffe7b0', a: 0.25, speed: 5 }); } });

// s069 — "is born on day nine."  INSERT: newborn in a pink blanket, name card LILY
registerShot('s069', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 14, (g) => hospital(g, t, { z: 1.4, x: 300, y: -60 })); veil(g, 'rgba(255,220,200,.08)');
  const cx = E.W * 0.5, cy = E.H * 0.6, s = 1.5 + 0.05 * k;
  rr(g, cx - 380, cy - 60, 760, 260, 30); g.fillStyle = alpha('#e8f6ff', 0.35); g.fill(); g.strokeStyle = alpha('#ffffff', 0.7); g.lineWidth = 6; g.stroke();
  baby(g, cx + 20, cy + 40, s, { expr: t > 1 ? 'smile' : 'sleep', rim: alpha('#ffe2b0', 0.8) });
  g.save(); g.translate(cx + 300, cy - 120); g.rotate(0.06); rr(g, -110, -50, 220, 100, 10); g.fillStyle = '#ffffff'; g.fill(); g.fillStyle = LILY_PINK; g.fillRect(-110, -50, 220, 22); text(g, 'LILY', 0, 16, { size: 50, color: '#c84a7a', font: FONTS.ui, weight: 900, spacing: 4 }); g.restore();
  for (let i = 0; i < 6; i++) FX.sparkle(g, cx - 300 + i * 120, cy - 160 + Math.sin(t * 2 + i) * 20, 12, '#ffd8e6', 0.6);
  dayBadge(g, { day: 9, k: prog(t, 0.1, 0.5) });
} });

// s070 — "Your dad drives everyone to the hospital."  NIGHT road: the family car, dad at the wheel
registerShot('s070', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.15, x: t * 120, y: 40 };
  const { GY, CX, LANE } = roadNight(g, t, cam);
  layer(g, cam, 1, (g) => { const x = CX - 300 + t * 520; car(g, x, LANE + 60, 1.25, { color: '#2E72D2', lights: true });
    circle(g, x + 1.25 * 60, LANE + 60 - 1.25 * 190, 26, S().ink); rr(g, x + 1.25 * 60 - 30, LANE + 60 - 1.25 * 222, 60, 22, 10); g.fillStyle = '#F2C21A'; g.fill();
    circle(g, x - 1.25 * 60, LANE + 60 - 1.25 * 190, 24, S().ink); circle(g, x - 1.25 * 60 - 6, LANE + 60 - 1.25 * 214, 12, S().ink);
    FX.speedLines(g, t, { cx: x - 300, cy: LANE - 60, count: 10, a: 0.1, inner: 200 }); });
} });

// s071 — "You follow on foot,"  NIGHT road: you jog behind the car on the sidewalk
registerShot('s071', { draw(g, t, info) {
  const cam = { z: 1.3, x: t * 300, y: 80 }, { GY, CX, LANE } = roadNight(g, t, cam);
  layer(g, cam, 1, (g) => { car(g, CX + 700 + t * 600, LANE + 60, 1.25, { color: '#2E72D2', lights: true });
    drawFigure(g, { x: CX - 200 + t * 600, y: GY - 10, s: 1.35, facing: 1, outfit: YOU, pose: walkPose(t * Math.PI * 2 * 1.6, { run: true }), expr: 'determined', rim: { color: '#ffcf8a', dir: [0.6, -0.6] } }); });
} });

// s072 — "because the last time you closed a car door, it came off."  FLASHBACK: the door comes off in your hand
registerShot('s072', { draw(g, t, info) {
  const k = t / info.dur, f = wt('came', info, t, 2.8), cam = { z: 1.3, x: 0, y: 80 };
  const { GY, CX, M } = street(g, t, cam, { mood: 'day', seed: 71 });
  const off = ease.out(prog(t, f, f + 0.4));
  layer(g, cam, 1, (g) => {
    car(g, CX + 120, GY + 120, 1.3, { color: '#2E72D2', door: off });
    circle(g, CX + 120 + 1.3 * 60, GY + 120 - 1.3 * 190, 26, S().ink); rr(g, CX + 120 + 1.3 * 60 - 30, GY + 120 - 1.3 * 222, 60, 22, 10); g.fillStyle = '#F2C21A'; g.fill();
    drawFigure(g, { x: CX - 300, y: GY + 60, s: 1.35, facing: 1, outfit: YOU, pose: { ...POSES.reach, hF: [lerp(70, 40, off), -130] }, expr: off > 0.3 ? 'shocked' : 'smile', rim: { color: M.rim, dir: [0.8, -0.4] } });
    if (off > 0) { g.save(); g.translate(CX - 300 + 1.35 * 40 + 60, GY + 60 - 1.35 * 130); g.rotate(-0.3); rr(g, -90, -70, 180, 130, 14); g.fillStyle = '#3a82e2'; g.fill(); rr(g, -70, -60, 120, 50, 6); g.fillStyle = '#bfe0f0'; g.fill(); g.restore(); impact(g, CX - 150, GY - 60, t - f, { r: 200 }); }
  });
  sepia(g);
  chip(g, 'LAST MONTH', E.W * 0.16, E.H * 0.14, { size: 30, k: prog(t, 0, 0.3) });
} });

// s073 — "Your dad is a mechanic."  GARAGE: dad (yellow cap) over an engine, warm work lamp
registerShot('s073', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.25 + 0.04 * k, x: 60, y: 80 };
  const { GY, CX } = garage(g, t, cam);
  layer(g, cam, 1, (g) => { car(g, CX + 360, GY, 1.4, { color: '#c84a3a' }); g.save(); g.translate(CX + 360 + 1.4 * 150, GY - 1.4 * 150); g.rotate(-0.9); rr(g, -10, -170, 200, 20, 6); g.fillStyle = '#a8382c'; g.fill(); g.restore();
    drawFigure(g, { x: CX + 40, y: GY, s: 1.4, facing: 1, outfit: DAD, pose: { ...POSES.reach, hF: [70, -130], head: [22, -196] }, expr: 'smile', look: [0.6, 0.6], rim: warm() });
    seg(g, [[CX + 40 + 1.4 * 70, GY - 1.4 * 130], [CX + 40 + 1.4 * 110, GY - 1.4 * 110]], 10, '#9aa0aa'); });
} });

// s074 — "Big hands."  INSERT: dad's big hands around a wrench
registerShot('s074', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 14, (g) => garage(g, t, { z: 1.4, x: 100, y: -60 }));
  const s = 1.5 + 0.05 * k; g.save(); g.translate(E.W * 0.5, E.H * 0.55); g.rotate(-0.25); rr(g, -380, -24, 760, 48, 20); g.fillStyle = '#b8bec8'; g.fill(); ring(g, -380, 0, 50, 18, '#b8bec8'); ring(g, 380, 0, 44, 18, '#b8bec8'); g.restore();
  hand(g, E.W * 0.42, E.H * 0.6, s, { from: [E.W * 0.1, E.H + 300], sleeve: DAD.color, fist: true });
  hand(g, E.W * 0.62, E.H * 0.5, s, { from: [E.W * 0.95, E.H + 300], sleeve: DAD.color, fist: true });
  for (let i = 0; i < 6; i++) { const r = rng(i); circle(g, E.W * 0.38 + r() * 300, E.H * 0.52 + r() * 160, 8 + r() * 10, alpha('#1a140e', 0.6)); }
} });

// s075 — "Oil on everything."  dad wipes his hands on an oily rag, oil drips
registerShot('s075', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.7 + 0.04 * k, x: -40, y: 180 };
  const { GY, CX } = garage(g, t, cam);
  layer(g, cam, 1, (g) => { drawFigure(g, { x: CX - 40, y: GY, s: 1.5, facing: 1, outfit: DAD, pose: { ...POSES.holdFront, hF: [36, -146 + 6 * Math.sin(t * 10)], hB: [30, -142] }, expr: 'happy', rim: warm() });
    rr(g, CX - 40 + 1.5 * 20, GY - 1.5 * 160, 80, 60, 14); g.fillStyle = '#6a5a4a'; g.fill(); for (let i = 0; i < 5; i++) circle(g, CX + 10 + i * 12, GY - 1.5 * 150 + i * 6, 8, '#1a140e');
    const d = (t * 1.2) % 1; g.fillStyle = '#1a140e'; g.beginPath(); g.ellipse(CX + 40, GY - 1.5 * 140 + d * 200, 8, 12, 0, 0, Math.PI * 2); g.fill(); g.beginPath(); g.ellipse(CX + 40, GY + 6, 60, 10, 0, 0, Math.PI * 2); g.fill(); });
} });

// arm wrestling CLOSE-UP: kid (left) vs dad (right) across the kitchen table, elbows down, hands clasped in the middle.
// lean 0..1 = dad gently lays the kid's hand down to the left. o.z / o.fx / o.fy = slow push-in toward a point.
function armClose(g, t, lean, o = {}) {
  const ink = S().ink, warmC = '#ffd28a', z = o.z ?? 1, fx = o.fx ?? E.W / 2, fy = o.fy ?? E.H / 2;
  blurLayer(g, 12, (g) => kitchen(g, t, { z: 1.3, x: 120, y: -40 }, { night: true, lampOn: true }));
  g.save(); g.translate(fx, fy); g.scale(z, z); g.translate(-fx, -fy);
  const TY = E.H * 0.74, px = E.W * 0.5, L = 270, ang = lerp(0, -1.15, ease.inOut(clamp(lean))) + 0.04 * Math.sin(t * 9) * (1 - lean);
  const cx = px + Math.sin(ang) * L, cy = TY - 40 - Math.cos(ang) * L;
  heroFace(g, E.W * 0.2, E.H * 0.44, 150, { outfit: KIDYOU, expr: o.kidExpr || 'determined', rimColor: warmC, rimSide: 1, look: [0.5, 0.2], blink: (t % 2.7) > 2.58 });
  bigFace(g, E.W * 0.8, E.H * 0.36, 205, { outfit: DAD, expr: o.dadExpr || 'smile', talk: o.talk || 0, rimColor: warmC, rimSide: -1, look: [-0.5, 0.25], blink: (t % 3.1) > 2.96 });
  g.fillStyle = '#7a4a2a'; g.fillRect(-E.W, TY, E.W * 3, E.H); g.fillStyle = '#9a6238'; g.fillRect(-E.W, TY, E.W * 3, 22); g.fillStyle = alpha('#ffe0a8', 0.35); g.fillRect(-E.W, TY, E.W * 3, 4);
  const arm = (ex, w, sleeve, shX) => { seg(g, [[shX, E.H + 80], [ex, TY - 10]], w * 1.5, sleeve); seg(g, [[ex, TY - 10], [cx, cy]], w + 10, alpha(warmC, 0.85)); seg(g, [[ex, TY - 10], [cx, cy]], w, ink);
    g.save(); g.globalCompositeOperation = 'lighter'; seg(g, [[ex + (shX < ex ? 1 : -1) * w * 0.3, TY - 14], [cx, cy - w * 0.3]], 4, alpha(warmC, 0.5)); g.restore(); circle(g, ex, TY - 10, w * 0.55, ink); };
  arm(px - 150, 66, KIDYOU.color, E.W * 0.12); arm(px + 150, 108, DAD.color, E.W * 0.9);
  circle(g, cx, cy, 86, alpha(warmC, 0.85)); circle(g, cx, cy, 80, ink);
  rr(g, cx - 24, cy - 104, 48, 56, 22); g.fillStyle = ink; g.fill();                                // dad's thumb over the top
  g.restore();
  FX.dust(g, t, { count: 14, color: '#ffe7b0', a: 0.2, speed: 4 });
}

// s076 — "When you were six, you tried to beat him at arm wrestling every single night."  CLOSE: straining with everything
registerShot('s076', { draw(g, t, info) {
  const k = t / info.dur; armClose(g, t, 0.12 + 0.08 * Math.sin(t * 2.4), { kidExpr: 'angry', dadExpr: 'smile', z: 1 + 0.05 * k });
  sepia(g);
  chip(g, 'AGE 6', E.W * 0.12, E.H * 0.14, { size: 34, k: prog(t, 0.1, 0.5) });
} });

// s077 — "You never won."  CLOSE: dad gently lays your little hand down, grinning
registerShot('s077', { draw(g, t, info) {
  const k = t / info.dur; armClose(g, t, ease.inOut(prog(t, 0.15, 1.1)), { kidExpr: 'sad', dadExpr: 'happy', z: 1.12 + 0.05 * k, fx: E.W * 0.5, fy: E.H * 0.62 });
  sepia(g);
} });

// s078 — "Not once."  INSERT: the tally board — DAD … YOU 0
registerShot('s078', { draw(g, t, info) {
  blurLayer(g, 12, (g) => kitchen(g, t, { z: 1.3, x: 400, y: -60 }, { night: true, lampOn: true }));
  tally(g, E.W / 2, E.H * 0.52, 1.5 + 0.04 * t, { you: 0, k: 1 }); sepia(g);
} });

// s079 — "And every night, he said the same thing."  push in on dad, the kid's hand down on the table
registerShot('s079', { draw(g, t, info) {
  const k = t / info.dur; armClose(g, t, 1, { kidExpr: 'sad', dadExpr: 'smile', z: 1.15 + 0.12 * ease.inOut(k), fx: E.W * 0.78, fy: E.H * 0.4 });
  sepia(g);
} });

// s080 — DAD: "Strong is easy, kiddo. Gentle is hard."  BIG FACE, warm lamp light
registerShot('s080', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => kitchen(g, t, { z: 1.3, x: -100, y: -40 }, { night: true, lampOn: true }));
  const talk = talkAmount(info.globalT, 199.8, 203.8);
  bigFace(g, E.W * 0.5, E.H * 0.62, 330 * (1 + 0.04 * k), { outfit: DAD, expr: 'smile', talk, rimColor: '#ffd28a', rimSide: -1, blink: (t % 3.2) > 3.05 });
  for (let i = 0; i < 2; i++) FX.rings(g, E.W * 0.5, E.H * 0.62, t + i * 0.4, { count: 1, r0: 360, r1: 440, color: '#ffe2b0', a: 0.15 * (talk > 0 ? 1 : 0) });
  sepia(g);
} });

// hospital room with the family; who = the one holding Lily
function family(g, t, cam, who, o = {}) {
  const { GY, CX } = hospital(g, t, cam);
  layer(g, cam, 1, (g) => {
    const ppl = [[MOM, CX + 380, 'mom'], [DAD, CX - 40, 'dad'], [GRANDMA, CX - 330, 'grandma'], [NURSE, CX + 720, 'nurse']];
    for (const [of, x, id] of ppl) { const h = id === who; drawFigure(g, { x, y: GY, s: 1.3, facing: id === 'nurse' ? -1 : 1, outfit: of, pose: h ? breathe(HOLD, t, 1, x) : breathe(POSES.relaxed, t, 1, x), expr: h ? (id === 'nurse' ? 'nervous' : 'smile') : 'happy', look: id === 'nurse' && h ? [-1, 0] : [0.3, 0.4], rim: warm(), blink: (t % (2.6 + x % 1)) > 2.45 });
      if (h) baby(g, x + (id === 'nurse' ? -1 : 1) * 1.3 * 30, GY - 1.3 * 156, 0.42, { expr: 'sleep', rot: id === 'nurse' ? 0.3 : -0.3 }); }
  });
  return { GY, CX };
}

// s081 — "At the hospital, everyone takes turns holding Lily."  HOSPITAL ROOM: the family, Lily passed around
registerShot('s081', { draw(g, t, info) { const k = t / info.dur; family(g, t, { z: 1.0 + 0.04 * k, x: lerp(-40, 40, k), y: 20 }, k < 0.5 ? 'mom' : 'dad'); } });
// s082–s085 — "Your mom." / "Your dad." / "Grandma." / "Even the nurse who's scared of you."
for (const [id, who, x] of [['s082', 'mom', 380], ['s083', 'dad', -40], ['s084', 'grandma', -330], ['s085', 'nurse', 720]])
  registerShot(id, { draw(g, t, info) { const k = t / info.dur; family(g, t, { z: 1.75 + 0.05 * k, x: x + 40, y: 200 }, who); if (who === 'nurse') { const p = ease.out(prog(t, 1.2, 1.6)); if (p > 0) { glow(g, E.W * 0.3, E.H * 0.4, 120, '#ffffff', 0.3 * p); } } } });

// s086 — "You stand in the doorway with your hands in your pockets."  WIDE from inside: you in the doorway
registerShot('s086', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0 + 0.03 * k, x: 0, y: 20 };
  const { GY, CX } = hospital(g, t, cam, { noBed: true });
  layer(g, cam, 0.95, (g) => { rr(g, CX - 760, GY - 640, 340, 640, 4); g.fillStyle = '#2a3a40'; g.fill(); glow(g, CX - 590, GY - 300, 380, '#cfe8ff', 0.25);
    drawFigure(g, { x: CX - 590, y: GY, s: 1.35, facing: 1, outfit: YOU, pose: breathe(POCKETS, t, 0.6, 3), expr: 'sad', look: [1, 0.3], rim: { color: '#cfe8ff', dir: [-1, -0.2], w: 6 } }); });
  layer(g, cam, 1, (g) => { for (const [of, x, h] of [[MOM, CX + 240, 1], [DAD, CX + 520, 0], [GRANDMA, CX - 20, 0]]) { drawFigure(g, { x, y: GY, s: 1.3, facing: -1, outfit: of, pose: h ? HOLD : POSES.relaxed, expr: 'happy', rim: warm() }); if (h) baby(g, x - 1.3 * 30, GY - 1.3 * 156, 0.42, { expr: 'sleep', rot: 0.3 }); } });
} });

// s087 — "Because today, you're five hundred times stronger"  BIG FACE: sad, looking down at your hidden hands
registerShot('s087', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => hospital(g, t, { z: 1.3, x: 300, y: -40 })); veil(g, 'rgba(20,30,50,.18)');
  heroFace(g, E.W * 0.5, E.H * 0.64, 330 * (1 + 0.04 * k), { outfit: YOU, expr: 'sad', look: [0, 0.7], rimColor: '#ffd28a', rimSide: 1 });
  dayBadge(g, { day: 9, k: 1, danger: true });
} });

// s088 — "than you were last week."  DATA: LAST WEEK ×4 vs TODAY ×512
registerShot('s088', { draw(g, t, info) {
  UI.blueprint(g); const ui = S().ui, x0 = E.W * 0.22, w = E.W * 0.6;
  for (const [i, lab, v, c] of [[0, 'LAST WEEK', 4, ui.blueprint], [1, 'TODAY', 512, CORAL()]]) { const p = ease.out(prog(t, 0.1 + i * 0.4, 0.8 + i * 0.4)), y = E.H * (0.4 + i * 0.2);
    text(g, lab, x0 - 30, y, { size: 40, color: ui.cream, font: FONTS.ui, weight: 900, align: 'right', spacing: 2 }); rr(g, x0, y - 30, Math.max(14, w * (v / 512) * p), 60, 30); g.fillStyle = c; g.fill();
    text(g, '×' + Math.round(v * p), x0 + Math.max(14, w * (v / 512) * p) + 30, y, { size: 52, color: c, font: FONTS.ui, weight: 900, align: 'left', glow: 14, glowColor: alpha(c, 0.5) }); }
} });

// s089 — "One flinch, and you could crush her."  INSERT: your fist hovers near Lily's tiny hand, red danger glow
registerShot('s089', { draw(g, t, info) {
  const k = t / info.dur, pulse = 0.5 + 0.5 * Math.sin(t * 6);
  blurLayer(g, 12, (g) => hospital(g, t, { z: 1.5, x: 400, y: -80 }));
  veil(g, `rgba(120,20,20,${0.12 + 0.1 * pulse})`);
  baby(g, E.W * 0.36, E.H * 0.72, 2.2, { expr: 'sleep', hand: -0.6 });
  const fx = lerp(E.W * 0.78, E.W * 0.62, ease.inOut(k)), fy = E.H * 0.42; glow(g, fx, fy, 260, CORAL(), 0.4 * pulse);
  hand(g, fx, fy, 1.6, { from: [E.W + 300, E.H * 0.1], sleeve: YOU.color, fist: true, rim: { color: CORAL(), dir: [-1, 0.2] } });
  text(g, '×512', E.W * 0.82, E.H * 0.2, { size: 70, color: CORAL(), font: FONTS.ui, weight: 900, glow: 20, glowColor: alpha(CORAL(), 0.7) });
} });
