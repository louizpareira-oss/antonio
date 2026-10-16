// thumbnail concepts for "What If You Could See 10 Seconds Into the Future?" — reuses the video's sets, cast and blue world.
import { E, S, registerShot, mood, layer, blurLayer, veil, ease, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, radGrad, text, measure, FONTS } from '/engine/core.js';
import { drawFigure, POSES, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { street, CURB, trafficLight } from '/projects/see-10-seconds/scenes/sets/street.js';
import { YOU, MIA } from '/projects/see-10-seconds/scenes/cast.js';
import { BLUE, ghost, heroFace, eyeGlow, hud } from '/projects/see-10-seconds/scenes/lib.js';

// thumbnail type: huge, heavy black outline, coloured glow
function bigText(g, str, x, y, size, o = {}) {
  const { color = '#ffffff', glowColor = BLUE, align = 'center', rot = 0, stroke = 0.16 } = o;
  g.save(); g.translate(x, y); g.rotate(rot);
  text(g, str, 0, 0, { size, color: '#000', font: FONTS.title, weight: 700, align, stroke: size * (stroke + 0.06), strokeColor: '#05060a' });
  text(g, str, 0, 0, { size, color, font: FONTS.title, weight: 700, align, stroke: size * stroke, strokeColor: '#05060a', glow: size * 0.35, glowColor: alpha(glowColor, 0.9) });
  text(g, str, 0, 0, { size, color, font: FONTS.title, weight: 700, align });
  g.restore();
}
// big front view of the truck (the climax), centred at x,y, scale z
function truckFront(g, x, y, z, col = '#2a2c36') {
  g.save(); g.translate(x, y); g.scale(z, z);
  rr(g, -560, -520, 1120, 620, 40); g.fillStyle = col; g.fill();
  rr(g, -440, -480, 880, 250, 26); g.fillStyle = '#9fb6d8'; g.fill();
  for (let i = 0; i < 7; i++) { rr(g, -360, -180 + i * 28, 720, 14, 6); g.fillStyle = '#16171e'; g.fill(); }
  for (const sx of [-1, 1]) { rr(g, sx * 450 - 70, -170, 140, 90, 20); g.fillStyle = '#fff6d8'; g.fill(); }
  g.fillStyle = '#0c0b10'; g.fillRect(-600, 60, 1200, 70); for (const sx of [-1, 1]) { rr(g, sx * 420 - 70, 100, 140, 160, 30); g.fill(); }
  g.restore();
}
function miaOnPhone(g, x, y, s, M) {
  const p = { ...POSES.phone, head: [8, -200] };
  rr(g, x - 26 * s, y - 180 * s, 44 * s, 76 * s, 12 * s); g.fillStyle = '#23263a'; g.fill();
  drawFigure(g, { x, y, s, facing: 1, outfit: MIA, pose: p, expr: 'neutral', look: [0.3, 0.8], rim: { color: M.rim, dir: [0.8, -0.5], w: 5 }, prop: { type: 'phone' } });
  circle(g, x + 4 * s, y - 194 * s, 5 * s, '#f4f2ee');
}

// neon hologram truck, front view (the blue world's version of the climax)
function holoTruck(g, x, y, z) {
  const C = BLUE;
  g.save(); g.translate(x, y); g.scale(z, z); g.lineJoin = 'round'; g.lineCap = 'round';
  g.shadowColor = C; g.shadowBlur = 22;
  const part = (fn, fill, w = 10, a = 1) => { fn(); g.fillStyle = fill; g.fill(); g.strokeStyle = alpha(C, a); g.lineWidth = w; g.stroke(); };
  for (const sx of [-1, 1]) { g.strokeStyle = C; g.lineWidth = 10; g.beginPath(); g.moveTo(sx * 560, -420); g.lineTo(sx * 650, -440); g.lineTo(sx * 650, -300); g.stroke(); part(() => rr(g, sx * 650 - 34, -460, 68, 150, 16), alpha('#062030', 0.8), 8); }   // mirrors
  part(() => rr(g, -560, -560, 1120, 660, 40), alpha(C, 0.16), 12);                                  // cab
  part(() => rr(g, -450, -500, 900, 260, 26), alpha('#04121c', 0.85), 9);                            // windshield (dark)
  g.save(); rr(g, -450, -500, 900, 260, 26); g.clip(); poly(g, [[-280, -500], [-170, -500], [-380, -240], [-490, -240]], alpha('#bff6ff', 0.22)); poly(g, [[-120, -500], [-70, -500], [-280, -240], [-330, -240]], alpha('#bff6ff', 0.14)); g.restore();
  for (let i = -2; i <= 2; i++) { circle(g, i * 90, -530, 12, '#ffb03a'); }                          // roof marker lights
  for (let i = 0; i < 6; i++) part(() => rr(g, -330, -190 + i * 32, 660, 16, 6), alpha('#04121c', 0.7), 5, 0.95);   // grille
  part(() => rr(g, -620, 60, 1240, 80, 18), alpha(C, 0.25), 9);                                     // bumper
  for (const sx of [-1, 1]) part(() => rr(g, sx * 430 - 80, 150, 160, 150, 34), alpha('#04121c', 0.85), 8);   // tyres
  g.shadowBlur = 0;
  g.save(); rr(g, -560, -560, 1120, 660, 40); g.clip(); g.fillStyle = alpha('#001018', 0.28); for (let yy = -560; yy < 100; yy += 12) g.fillRect(-600, yy, 1200, 4); g.restore();
  for (const sx of [-1, 1]) { rr(g, sx * 460 - 70, -190, 140, 90, 20); g.fillStyle = '#ffffff'; g.fill(); }
  g.restore();
  for (const sx of [-1, 1]) { glow(g, x + sx * 460 * z, y - 145 * z, 230 * z, '#e8fdff', 0.85); FX.lensStreak(g, x + sx * 460 * z, y - 145 * z, 520 * z, '#bff6ff', 0.4, 3); }
}
// red "danger" arrow from (x0,y0) curving to (x1,y1)
function arrow(g, x0, y0, x1, y1, bend = 120) {
  const mx = (x0 + x1) / 2 + bend, my = (y0 + y1) / 2 - bend * 0.4, ang = Math.atan2(y1 - my, x1 - mx);
  for (const [w, c] of [[44, '#05060a'], [28, '#ff2a2a']]) { g.strokeStyle = c; g.lineWidth = w; g.lineCap = 'round'; g.beginPath(); g.moveTo(x0, y0); g.quadraticCurveTo(mx, my, x1 - Math.cos(ang) * 40, y1 - Math.sin(ang) * 40); g.stroke();
    const hs = w * 2.4; poly(g, [[x1 + Math.cos(ang) * w * 0.3, y1 + Math.sin(ang) * w * 0.3], [x1 - Math.cos(ang - 0.55) * hs, y1 - Math.sin(ang - 0.55) * hs], [x1 - Math.cos(ang + 0.55) * hs, y1 - Math.sin(ang + 0.55) * hs]], c); }
}
// A — your giant face with glowing eyes; Mia on the crosswalk on her phone; the blue-world truck bearing down on her
function thumbA(g, line2, col2, glow2) {
  const M = mood('golden');
  blurLayer(g, 8, (g) => street(g, 1.5, { z: 1.1, x: 140, y: 260 }, { mood: 'golden', seed: 77, cross: E.W / 2 + 300 }));
  veil(g, '#07040f', 0.45);
  g.fillStyle = radGrad(g, E.W * 0.72, E.H * 0.5, 0, E.W * 0.7, ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,.55)']); g.fillRect(0, 0, E.W, E.H);
  holoTruck(g, E.W * 0.795, E.H * 0.58, 0.76);
  { const lx = E.W - 110, ly = 70; seg(g, [[lx, -20], [lx, ly]], 12, '#0c0b10'); rr(g, lx - 40, ly, 80, 220, 16); g.fillStyle = '#0c0b10'; g.fill(); ['#ff3a2a', '#3a2a10', '#10301a'].forEach((c, i) => circle(g, lx, ly + 42 + i * 68, 26, c)); glow(g, lx, ly + 42, 260, '#ff3a2a', 0.75); }
  miaOnPhone(g, E.W * 0.63, E.H * 0.99, 2.45, M);
  glow(g, E.W * 0.63 + 40, E.H * 0.99 - 480, 120, '#9fd8ff', 0.35);
  arrow(g, E.W * 0.5, E.H * 0.37, E.W * 0.595, E.H * 0.47, -60);
  const cx = E.W * 0.245, cy = E.H * 0.68, r = 400;
  glow(g, cx, cy, r * 1.8, BLUE, 0.3);
  heroFace(g, cx, cy, r, { outfit: YOU, expr: 'shocked', face: { eyes: 'ring', mouth: 'oBig', brows: 'raised' }, look: [0.8, -0.1], rimColor: BLUE, rimSide: 1, tilt: -0.06 });
  eyeGlow(g, cx, cy, r, 1.4, -0.06);
  bigText(g, '10 SECONDS', E.W * 0.47, E.H * 0.13, 200, { color: '#ffffff' });
  bigText(g, line2, E.W * 0.47 + (line2.length > 6 ? 40 : 160), E.H * 0.29, line2.length > 6 ? 120 : 150, { color: col2, glowColor: glow2, rot: -0.03 });
}
registerShot('thumbA', { draw(g, t, info) { thumbA(g, 'AHEAD', '#ffd23a', '#ff8a2a'); } });

// B — two worlds: warm real street (left) / cyan blue world (right), you in the middle with your ghost a step ahead
registerShot('thumbB', { draw(g, t, info) {
  const M = mood('golden'), cam = { z: 1.35, x: 80, y: 130 };
  street(g, 1.5, cam, { mood: 'golden', seed: 41 });
  const split = E.W * 0.5;
  g.save(); g.beginPath(); g.moveTo(split + 160, 0); g.lineTo(E.W, 0); g.lineTo(E.W, E.H); g.lineTo(split - 160, E.H); g.closePath(); g.clip();
  g.fillStyle = '#03101c'; g.fillRect(0, 0, E.W, E.H);
  g.restore();
  // re-draw the right half as a cyan copy of the street
  g.save(); g.beginPath(); g.moveTo(split + 160, 0); g.lineTo(E.W, 0); g.lineTo(E.W, E.H); g.lineTo(split - 160, E.H); g.closePath(); g.clip();
  const c = document.createElement('canvas'); c.width = Math.round(E.W * E.PX); c.height = Math.round(E.H * E.PX); const x = c.getContext('2d'); x.setTransform(E.PX, 0, 0, E.PX, 0, 0); street(x, 1.5, cam, { mood: 'golden', seed: 41 });
  x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'color'; x.fillStyle = BLUE; x.fillRect(0, 0, c.width, c.height); x.globalCompositeOperation = 'multiply'; x.fillStyle = '#9fe8ff'; x.fillRect(0, 0, c.width, c.height);
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(c, 0, 0); g.restore();
  g.fillStyle = 'rgba(0,30,60,.25)'; g.fillRect(0, 0, E.W, E.H);
  g.restore();
  g.save(); g.strokeStyle = BLUE; g.lineWidth = 10; g.beginPath(); g.moveTo(split + 160, 0); g.lineTo(split - 160, E.H); g.stroke(); g.restore(); glow(g, split, E.H / 2, 400, BLUE, 0.35);
  const GY = E.H * 0.8;
  layer(g, cam, 1, (g) => drawFigure(g, { x: E.W / 2 - 290, y: GY, s: 2.0, facing: 1, outfit: YOU, pose: walkPose(0.8), expr: 'surprised', look: [0.8, 0], rim: { color: M.rim, dir: [-0.8, -0.4], w: 6 } }));
  ghost(g, (x) => drawFigure(x, { x: E.W / 2 + 230, y: GY, s: 2.0, facing: 1, outfit: YOU, pose: walkPose(2.4), expr: 'smirk' }), { cam, t: 0.4, a: 0.85, glowA: 1.3 });
  bigText(g, 'NOW', E.W * 0.13, E.H * 0.14, 150, { color: '#ffd23a', glowColor: '#ff8a2a' });
  bigText(g, '+10 SEC', E.W * 0.76, E.H * 0.16, 170, { color: '#ffffff', glowColor: BLUE });
} });

// A2 — same picture, stakes in the text
registerShot('thumbC', { draw(g, t, info) { thumbA(g, 'TO SAVE HER', '#ff4a3a', '#ff2a2a'); } });

// ---------- round 2: the moment before impact ----------
// red countdown timer: dark disc, red ring almost empty, huge white number
function countdownTimer(g, x, y, r, n, frac) {
  glow(g, x, y, r * 2.2, '#ff2a2a', 0.55);
  circle(g, x, y, r * 1.1, '#05060a'); circle(g, x, y, r, '#2a0606');
  ring(g, x, y, r * 0.84, r * 0.17, alpha('#ff2a2a', 0.22));
  g.strokeStyle = '#ff3a2a'; g.lineWidth = r * 0.17; g.lineCap = 'round'; g.beginPath(); g.arc(x, y, r * 0.84, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * frac); g.stroke();
  text(g, String(n), x, y + r * 0.06, { size: r * 1.3, color: '#ffffff', font: FONTS.ui, weight: 900, glow: r * 0.35, glowColor: 'rgba(255,40,40,.95)' });
}
// cyan glow on the eyes of a 3/4-view rig figure
function figEyes(g, o, k = 1) {
  const p = o.pose, s = o.s, hx = o.x + p.head[0] * s, hy = o.y + p.head[1] * s, r = 26 * s;
  const fx = hx + r * 0.34, ey = hy - r * 0.16;
  for (const ex of [fx - r * 0.26, fx + r * 0.32]) { glow(g, ex, ey, r * 0.7, BLUE, 0.8 * k); ring(g, ex, ey, r * 0.2, r * 0.07, alpha(BLUE, 0.95 * k)); }
}
const lunge = { head: [50, -196], sh: [30, -166], hip: [0, -100], eF: [70, -180], hF: [110, -190], eB: [-8, -138], hB: [-42, -122], kF: [40, -58], fF: [62, -4], kB: [-28, -52], fB: [-72, -22] };

function thumbD(g, words) {
  const M = mood('golden');
  g.save(); g.translate(E.W / 2, E.H / 2); g.rotate(-0.035); g.scale(1.06, 1.06); g.translate(-E.W / 2, -E.H / 2);       // dutch angle
  blurLayer(g, 4, (g) => street(g, 1.5, { z: 1.15, x: 160, y: 250 }, { mood: 'golden', seed: 77, cross: E.W / 2 + 330 }));
  veil(g, '#0a0410', 0.1);
  // the real truck looming over her, dark and solid, headlights blazing; a thin cyan outline of its future position
  const tx = E.W * 0.69, ty = E.H * 0.63, tz = 0.66;
  glow(g, tx, ty - 180, 900, '#ffd59a', 0.3);
  for (let i = 3; i >= 1; i--) { g.save(); g.globalAlpha = 0.1; truckFront(g, tx + i * 46, ty, tz); g.restore(); }
  truckFront(g, tx, ty, tz, '#1c1e28');
  g.save(); g.translate(tx - 70, ty + 14); g.scale(tz * 1.07, tz * 1.07); g.strokeStyle = alpha(BLUE, 0.85); g.lineWidth = 7; g.shadowColor = BLUE; g.shadowBlur = 24; rr(g, -560, -520, 1120, 620, 40); g.stroke(); rr(g, -440, -480, 880, 250, 26); g.stroke(); g.restore();
  for (const sx of [-1, 1]) { glow(g, tx + sx * 450 * tz, ty - 125 * tz, 300, '#fff6d8', 0.95); glow(g, tx + sx * 450 * tz, ty - 125 * tz, 90, '#ffffff', 1.0); FX.lensStreak(g, tx + sx * 450 * tz, ty - 125 * tz, 1000, '#fff1c8', 0.5, 4); }
  FX.speedLines(g, 0.4, { cx: tx, cy: ty - 60, count: 70, color: '#fff1dc', a: 0.2, inner: 470, seed: 4 });
  // Mia, oblivious on her phone, right in its path
  miaOnPhone(g, E.W * 0.575, E.H * 0.985, 2.3, { ...M, rim: '#ffffff' });
  glow(g, E.W * 0.575 + 50, E.H * 0.985 - 450, 110, '#9fd8ff', 0.4);
  // you, lunging in from the foreground with a cyan speed trail
  const o = { x: E.W * 0.17, y: E.H * 1.22, s: 3.6, facing: 1, outfit: YOU, pose: lunge, expr: 'shocked', face: { mouth: 'oBig' }, rim: { color: '#fff1d6', dir: [0.9, -0.3], w: 8 }, shadow: false };
  ghost(g, (x) => { drawFigure(x, { ...o, x: o.x - 190, rim: false }); }, { t: 0.2, a: 0.22, glowA: 0.8 });
  ghost(g, (x) => { drawFigure(x, { ...o, x: o.x - 95, rim: false }); }, { t: 0.4, a: 0.38, glowA: 1.0 });
  drawFigure(g, o); figEyes(g, o, 1);
  g.restore();
  // big words + the countdown
  bigText(g, words[0], E.W * 0.3, E.H * 0.13, words[0].length > 8 ? 168 : 200, { color: words[2] || '#ffffff', glowColor: words[3] || BLUE });
  if (words[1]) bigText(g, words[1], E.W * 0.3, E.H * 0.3, 120, { color: '#ffd23a', glowColor: '#ff8a2a', rot: -0.03 });
  countdownTimer(g, E.W * 0.885, E.H * 0.2, 140, 1, 0.1);
  g.fillStyle = radGrad(g, E.W / 2, E.H / 2, E.H * 0.45, E.W * 0.62, ['rgba(0,0,0,0)', 'rgba(0,0,0,.35)']); g.fillRect(0, 0, E.W, E.H);
}
registerShot('thumbD', { draw(g, t, info) { thumbD(g, ['10 SECONDS', 'TO SAVE HER']); } });
registerShot('thumbE', { draw(g, t, info) { thumbD(g, ['TOO LATE?', null, '#ffd23a', '#ff6a2a']); } });
registerShot('thumbF', { draw(g, t, info) { thumbD(g, ['10 SECONDS', null]); } });
