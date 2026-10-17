// brand.js — "Parallel You" channel art, drawn with the same rig, sets and blue world as the videos.
// Logical stage 1920x1080 (rendered at 2560x1440). Banner safe area for every device: 1546x423 px -> logical 1160x317,
// centred (x 380..1540, y 381..698). The desktop band is the full width at that height. Avatar = centre square, cropped later.
import { E, S, registerShot, mood, layer, blurLayer, veil, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, radGrad, text, measure, FONTS } from '/engine/core.js';
import { drawFigure, POSES, walkPose, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { street } from '/projects/see-10-seconds/scenes/sets/street.js';
import { YOU, MIA, STRIKER, TEACHER, WAITER, FRIEND } from '/projects/see-10-seconds/scenes/cast.js';
import { BLUE, ghost, heroFace, eyeGlow } from '/projects/see-10-seconds/scenes/lib.js';

const SAFE = { x: 380, y: 381, w: 1160, h: 317 };

function bigText(g, str, x, y, size, o = {}) {
  const { color = '#ffffff', glowColor = BLUE, align = 'center', stroke = 0.14, spacing = 4 } = o;
  text(g, str, x, y, { size, color: '#000', font: FONTS.title, weight: 700, align, stroke: size * (stroke + 0.06), strokeColor: '#05060a', spacing });
  text(g, str, x, y, { size, color, font: FONTS.title, weight: 700, align, stroke: size * stroke, strokeColor: '#05060a', glow: size * 0.3, glowColor: alpha(glowColor, 0.85), spacing });
  text(g, str, x, y, { size, color, font: FONTS.title, weight: 700, align, spacing });
}
// the logo: PARALLEL in cream, YOU in white with its cyan copy one step ahead
function logo(g, cx, cy, size) {
  const a = 'PARALLEL ', b = 'YOU', wa = measure(g, a, size, FONTS.title, 700) + 4 * a.length, wb = measure(g, b, size, FONTS.title, 700) + 4 * b.length, x0 = cx - (wa + wb) / 2;
  ghost(g, (x) => text(x, b, x0 + wa + 26, cy - 14, { size, color: '#fff', font: FONTS.title, weight: 700, align: 'left', spacing: 4 }), { t: 0.3, a: 0.9, glowA: 1.3 });
  bigText(g, a, x0, cy, size, { color: '#ffe9c8', glowColor: '#ff9a4a', align: 'left' });
  bigText(g, b, x0 + wa, cy, size, { color: '#ffffff', glowColor: BLUE, align: 'left' });
}
// whole street recoloured into the blue world (for the right side of the split)
function blueStreet(g, cam) {
  const c = document.createElement('canvas'); c.width = Math.round(E.W * E.PX); c.height = Math.round(E.H * E.PX);
  const x = c.getContext('2d'); x.setTransform(E.PX, 0, 0, E.PX, 0, 0); street(x, 1.5, cam, { mood: 'dusk', seed: 33 });
  x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'color'; x.fillStyle = BLUE; x.fillRect(0, 0, c.width, c.height);
  x.globalCompositeOperation = 'multiply'; x.fillStyle = '#8fdcf0'; x.fillRect(0, 0, c.width, c.height);
  x.globalCompositeOperation = 'source-over'; x.fillStyle = 'rgba(0,0,0,.18)'; for (let y = 0; y < c.height; y += 8) x.fillRect(0, y, c.width, 3);
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.drawImage(c, 0, 0); g.restore();
}

registerShot('banner', { draw(g, t, info) {
  const GYs = 690, cam = { z: 1.0, x: 0, y: E.H * 0.8 - GYs };
  const { M } = street(g, 1.5, cam, { mood: 'dusk', seed: 33 });
  // the split: real world left, blue world right (diagonal through the middle)
  const top = E.W / 2 + 150, bot = E.W / 2 - 150;
  g.save(); g.beginPath(); g.moveTo(top, -10); g.lineTo(E.W + 10, -10); g.lineTo(E.W + 10, E.H + 10); g.lineTo(bot, E.H + 10); g.closePath(); g.clip(); blueStreet(g, cam); g.restore();
  g.save(); g.shadowColor = BLUE; g.shadowBlur = 30; seg(g, [[top, -10], [bot, E.H + 10]], 8, BLUE); g.restore();
  veil(g, '#05030c', 0.22);
  // keep the logo readable: a soft dark band behind the safe area
  g.fillStyle = radGrad(g, E.W / 2, SAFE.y + SAFE.h / 2, 60, 700, ['rgba(5,6,14,.7)', 'rgba(5,6,14,.35)', 'rgba(5,6,14,0)']); g.fillRect(0, 0, E.W, E.H);
  const rim = { color: M.rim, dir: [0.8, -0.5], w: 5 };
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: 200, y: E.H * 0.8, s: 1.05, facing: 1, outfit: MIA, pose: POSES.phone, expr: 'smile', look: [0.3, 0.7], rim, prop: { type: 'phone' } });
    drawFigure(g, { x: 70, y: E.H * 0.8, s: 1.05, facing: 1, outfit: TEACHER, pose: POSES.relaxed, expr: 'smile', rim });
    drawFigure(g, { x: 330, y: E.H * 0.8, s: 1.1, facing: 1, outfit: YOU, pose: walkPose(0.9), expr: 'happy', rim });
  });
  ghost(g, (x) => {
    drawFigure(x, { x: 1600, y: E.H * 0.8, s: 1.1, facing: 1, outfit: YOU, pose: walkPose(2.3), expr: 'happy' });
    drawFigure(x, { x: 1740, y: E.H * 0.8, s: 1.05, facing: -1, outfit: STRIKER, pose: POSES.cheer, expr: 'joy' });
    drawFigure(x, { x: 1870, y: E.H * 0.8, s: 1.05, facing: -1, outfit: WAITER, pose: POSES.wave, expr: 'smile' });
  }, { cam, t: 0.3, a: 0.8, glowA: 1.2 });
  logo(g, E.W / 2, SAFE.y + 128, 128);
  text(g, 'EVERY WHAT IF, LIVED BY YOU', E.W / 2, SAFE.y + 238, { size: 36, color: alpha('#fff1dc', 0.92), font: FONTS.ui, weight: 900, spacing: 7, stroke: 8, strokeColor: 'rgba(5,6,14,.8)' });
  FX.dust(g, 0.7, { count: 60, color: BLUE, a: 0.3, area: [E.W / 2, 0, E.W / 2, E.H], speed: 6 });
  FX.dust(g, 0.7, { count: 50, color: '#ffd59a', a: 0.3, area: [0, 0, E.W / 2, E.H], speed: 6 });
} });

// profile picture: your head, and its cyan copy one step ahead (drawn in the centre 1080x1080 square)
registerShot('avatar', { draw(g, t, info) {
  const cx = E.W / 2;
  g.fillStyle = radGrad(g, cx + 80, E.H * 0.42, 40, 760, ['#1f5d8c', '#123058', '#070d1e']); g.fillRect(0, 0, E.W, E.H);
  g.fillStyle = 'rgba(127,232,255,.05)'; for (let y = 0; y < E.H; y += 14) g.fillRect(0, y, E.W, 4);
  glow(g, cx + 150, E.H * 0.4, 520, BLUE, 0.45); glow(g, cx - 220, E.H * 0.62, 460, '#ff9a4a', 0.22);
  const r = 300, hx = cx - 70, hy = E.H * 0.53;
  ghost(g, (x) => { bigFace(x, hx + 190, hy - 110, r, { outfit: { ...YOU, head: 'none' }, expr: 'smile', rimColor: '#fff', rimSide: 1 }); }, { t: 0.2, a: 0.5, glowA: 0.9 });
  for (const sx of [-1, 1]) { glow(g, hx + 190 + sx * r * 0.34, hy - 110 - r * 0.16, r * 0.35, '#e8fdff', 0.5); ring(g, hx + 190 + sx * r * 0.34, hy - 110 - r * 0.16, r * 0.17, r * 0.05, alpha('#e8fdff', 0.8)); }
  heroFace(g, hx, hy, r, { outfit: YOU, expr: 'smirk', look: [0.35, -0.1], rimColor: '#ffc68a', rimSide: -1 });
  eyeGlow(g, hx, hy, r, 0.55);
} });

// ---------- original logo marks (not from any video) — drawn in the centre 1080x1080 square ----------
const WARM = ['#ffc15a', '#ff7a3a', '#e8453a'], COOL = ['#bff6ff', '#58d6ff', '#2e7dff'];
function logoBg(g) {
  const cx = E.W / 2;
  g.fillStyle = radGrad(g, cx, E.H / 2, 40, 760, ['#18224a', '#0b1030', '#05070f']); g.fillRect(0, 0, E.W, E.H);
  glow(g, cx - 300, E.H * 0.62, 520, '#ff7a3a', 0.22); glow(g, cx + 300, E.H * 0.38, 520, '#58d6ff', 0.25);
}
const vgrad = (g, y0, y1, cols) => linGrad(g, 0, y0, 0, y1, cols);
function scan(g, x, y, w, h, a = 0.18) { g.fillStyle = `rgba(4,10,30,${a})`; for (let yy = y; yy < y + h; yy += 14) g.fillRect(x, yy, w, 5); }
// head + shoulders silhouette path (centre cx, neck at cy)
function bustPath(g, cx, cy, s) {
  g.beginPath(); g.arc(cx, cy - 175 * s, 165 * s, 0, Math.PI * 2);
  g.moveTo(cx - 340 * s, cy + 330 * s); g.bezierCurveTo(cx - 340 * s, cy + 70 * s, cx - 190 * s, cy + 20 * s, cx, cy + 20 * s);
  g.bezierCurveTo(cx + 190 * s, cy + 20 * s, cx + 340 * s, cy + 70 * s, cx + 340 * s, cy + 330 * s); g.closePath();
}

// A — "Split Self": a person split in two; the right half has already slipped into another world
registerShot('avatarA', { draw(g) {
  logoBg(g); const cx = E.W / 2, cy = E.H * 0.6, s = 1.0, sh = 44;
  g.save(); g.beginPath(); g.rect(0, 0, cx - 8, E.H); g.clip(); bustPath(g, cx, cy, s); g.fillStyle = vgrad(g, cy - 360, cy + 340, WARM); g.shadowColor = '#ff7a3a'; g.shadowBlur = 46; g.fill(); g.restore();
  g.save(); g.beginPath(); g.rect(cx + 8 + sh, 0, E.W, E.H); g.clip(); g.translate(sh, -sh); bustPath(g, cx, cy, s); g.fillStyle = vgrad(g, cy - 360, cy + 340, COOL); g.shadowColor = '#58d6ff'; g.shadowBlur = 56; g.fill();
  bustPath(g, cx, cy, s); g.clip(); scan(g, cx, 0, 600, E.H, 0.16); g.restore();
  // the seam between the two worlds
  g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = linGrad(g, 0, cy - 420, 0, cy + 360, ['rgba(255,255,255,0)', 'rgba(230,250,255,.95)', 'rgba(255,255,255,0)']); g.fillRect(cx + sh / 2 - 3, cy - 430, 6, 800); g.restore();
  glow(g, cx + sh / 2, cy - 180, 260, '#e8fdff', 0.35);
  // a few specks drifting from the warm world into the cool one
  for (const [dx, dy, r, c] of [[70, -330, 9, '#bff6ff'], [130, -250, 6, '#bff6ff'], [95, -120, 7, '#bff6ff'], [-60, -300, 7, '#ffc15a'], [-110, -200, 5, '#ffc15a']]) { circle(g, cx + dx + (dx > 0 ? sh : 0), cy + dy, r, c); glow(g, cx + dx + (dx > 0 ? sh : 0), cy + dy, r * 5, c, 0.5); }
} });

// B — "Parallel": two slanted figures like the ∥ symbol, warm and cool, one a step ahead, inside a portal ring
function capsuleFigure(g, x, y, h, w, r, fill, slant) {
  g.save(); g.translate(x, y); g.transform(1, 0, -slant, 1, 0, 0);
  rr(g, -w / 2, -h, w, h, w / 2); g.fillStyle = fill; g.fill(); g.beginPath(); g.arc(0, -h - r * 1.45, r, 0, Math.PI * 2); g.fill(); g.restore();
}
registerShot('avatarB', { draw(g) {
  logoBg(g); const cx = E.W / 2, cy = E.H / 2;
  g.save(); g.lineWidth = 34; g.strokeStyle = linGrad(g, cx - 430, 0, cx + 430, 0, ['#ff7a3a', '#ffc15a', '#bff6ff', '#58d6ff']); g.shadowColor = '#7fe8ff'; g.shadowBlur = 30; g.beginPath(); g.arc(cx, cy, 430, 0, Math.PI * 2); g.stroke(); g.restore();
  g.save(); g.shadowColor = '#ff7a3a'; g.shadowBlur = 50; capsuleFigure(g, cx - 120, cy + 290, 400, 140, 82, vgrad(g, cy - 330, cy + 290, WARM), 0.2); g.restore();
  g.save(); g.shadowColor = '#58d6ff'; g.shadowBlur = 60; capsuleFigure(g, cx + 150, cy + 220, 400, 140, 82, vgrad(g, cy - 400, cy + 220, COOL), 0.2); g.restore();
  g.save(); g.beginPath(); g.rect(cx + 20, 0, 600, E.H); g.clip(); g.globalCompositeOperation = 'source-atop'; scan(g, cx + 20, 0, 600, E.H, 0.16); g.restore();
} });

// C — "PY" monogram: P in the warm world, Y in the cool one, overlapping like two versions of the same thing
registerShot('avatarC', { draw(g) {
  logoBg(g); const cx = E.W / 2, cy = E.H / 2 + 40, size = 600;
  g.save(); g.lineWidth = 26; g.strokeStyle = alpha('#ffffff', 0.12); g.beginPath(); g.arc(cx, cy - 40, 440, 0, Math.PI * 2); g.stroke(); g.restore();
  const letter = (ch, x, y, cols, glowC) => { g.save(); g.font = `700 ${size}px "${FONTS.title}"`; g.textAlign = 'center'; g.textBaseline = 'middle'; g.shadowColor = glowC; g.shadowBlur = 50; g.fillStyle = vgrad(g, y - size * 0.45, y + size * 0.45, cols); g.fillText(ch, x, y); g.restore(); };
  letter('P', cx - 125, cy, WARM, '#ff7a3a');
  g.save(); g.globalAlpha = 0.95; letter('Y', cx + 140, cy - 60, COOL, '#58d6ff'); g.restore();
  g.save(); g.beginPath(); g.rect(cx + 10, 0, 700, E.H); g.clip(); scan(g, cx + 10, cy - 360, 400, 600, 0.12); g.restore();
} });
