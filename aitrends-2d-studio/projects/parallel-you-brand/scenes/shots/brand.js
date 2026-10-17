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

// ---------- round 3: flat illustrated marks in the style of the examples (Ifverse / FunNotSoFun / Body Settings) ----------
const INK = '#0e0b12';
function stars(g, n, seed, area) { let s = seed; const r = () => ((s = (s * 9301 + 49297) % 233280) / 233280); for (let i = 0; i < n; i++) { const x = area[0] + r() * area[2], y = area[1] + r() * area[3], rad = 1.5 + r() * 3.5; circle(g, x, y, rad, alpha('#ffffff', 0.4 + r() * 0.6)); } }
function stickFig(g, x, y, s, pose, col, rim, facing = 1) {
  const draw = (dx, dy, c) => { g.save(); g.translate(x + dx, y + dy); g.scale(s * facing, s); g.strokeStyle = c; g.lineCap = 'round'; g.lineJoin = 'round';
    const L = (pts, w) => { g.lineWidth = w; g.beginPath(); g.moveTo(...pts[0]); pts.slice(1).forEach(q => g.lineTo(...q)); g.stroke(); };
    L([pose.hip, pose.kB, pose.fB], 13); L([pose.sh, pose.eB, pose.hB], 12); L([pose.sh, pose.hip], 16); L([pose.hip, pose.kF, pose.fF], 13); L([pose.sh, pose.eF, pose.hF], 12);
    g.fillStyle = c; g.beginPath(); g.arc(pose.head[0], pose.head[1], 27, 0, Math.PI * 2); g.fill(); g.restore(); };
  if (rim) draw(rim[0], rim[1], rim[2]); draw(0, 0, col);
}

// D — "The Mirror": you look into a mirror, and your reflection is living a different life (it waves, glowing cyan)
registerShot('avatarD', { draw(g) {
  const cx = E.W / 2, cy = E.H / 2;
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#1a1236', '#2c1f52', '#3d2a5c']); g.fillRect(0, 0, E.W, E.H);
  stars(g, 70, 7, [cx - 540, 0, 1080, 520]);
  const fy = cy + 250; g.fillStyle = linGrad(g, 0, fy, 0, E.H, ['#3a2436', '#1c1220']); g.fillRect(0, fy, E.W, E.H);
  // mirror
  const mx = cx + 120, mw = 360, mh = 600, my = fy - mh - 10;
  g.save(); g.globalCompositeOperation = 'lighter'; poly(g, [[mx - mw / 2, fy], [mx + mw / 2, fy], [mx + mw / 2 + 160, fy + 260], [mx - mw / 2 - 160, fy + 260]], linGrad(g, 0, fy, 0, fy + 260, [alpha('#58d6ff', 0.32), alpha('#58d6ff', 0)])); g.restore();
  glow(g, mx, my + mh / 2, 520, '#58d6ff', 0.35);
  rr(g, mx - mw / 2 - 26, my - 26, mw + 52, mh + 52, mw / 2 + 26); g.fillStyle = linGrad(g, 0, my, 0, my + mh, ['#ffd27a', '#c8873a']); g.fill();
  g.save(); rr(g, mx - mw / 2, my, mw, mh, mw / 2); g.clip();
  g.fillStyle = linGrad(g, 0, my, 0, my + mh, ['#062a44', '#0a4a6e', '#0e6f94']); g.fillRect(mx - mw, my, mw * 2, mh);
  stars(g, 25, 3, [mx - mw / 2, my, mw, mh * 0.5]);
  g.fillStyle = alpha('#7fe8ff', 0.55); for (let i = 0; i < 7; i++) { const bw = 40 + (i * 37) % 50, bh = 90 + (i * 53) % 160; g.fillRect(mx - mw / 2 + i * 56, my + mh - 120 - bh, bw, bh + 120); }
  g.fillStyle = 'rgba(0,20,40,.25)'; for (let y = my; y < my + mh; y += 10) g.fillRect(mx - mw / 2, y, mw, 3);
  g.shadowColor = '#bff6ff'; g.shadowBlur = 30; stickFig(g, mx - 10, my + mh - 40, 1.25, POSES.wave, '#bff6ff', null, -1); g.shadowBlur = 0;
  g.restore();
  // you, in front of the mirror (warm rim from the room)
  stickFig(g, cx - 210, fy + 30, 1.45, { ...POSES.stand, head: [6, -208] }, INK, [-5, -3, '#ffb070'], 1);
  g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.ellipse(cx - 210, fy + 34, 60, 10, 0, 0, Math.PI * 2); g.fill();
} });

// E — "Split Face": one face, two worlds — warm on the left, glowing cyan on the right
registerShot('avatarE', { draw(g) {
  const cx = E.W / 2, cy = E.H / 2, R = 540;
  const split = (side) => { g.beginPath(); if (side < 0) { g.moveTo(cx + 90, cy - R); g.lineTo(cx - 90, cy + R); g.lineTo(cx - R - 50, cy + R); g.lineTo(cx - R - 50, cy - R); } else { g.moveTo(cx + 90, cy - R); g.lineTo(cx + R + 50, cy - R); g.lineTo(cx + R + 50, cy + R); g.lineTo(cx - 90, cy + R); } g.closePath(); };
  g.save(); split(-1); g.clip(); g.fillStyle = linGrad(g, cx - R, cy - R, cx, cy + R, ['#ffd25a', '#ff9a3a', '#ff6a3a']); g.fillRect(0, 0, E.W, E.H); g.restore();
  g.save(); split(1); g.clip(); g.fillStyle = linGrad(g, cx, cy - R, cx + R, cy + R, ['#0a1838', '#0c2a5a', '#071226']); g.fillRect(0, 0, E.W, E.H); g.fillStyle = 'rgba(127,232,255,.07)'; for (let y = 0; y < E.H; y += 14) g.fillRect(0, y, E.W, 5); glow(g, cx + 200, cy - 60, 420, '#58d6ff', 0.35); g.restore();
  const hr = 330, hy = cy + 30;
  // rims: warm on the left, cyan on the right
  g.save(); split(-1); g.clip(); circle(g, cx - 14, hy, hr + 14, '#fff3d6'); g.restore();
  g.save(); split(1); g.clip(); g.shadowColor = '#7fe8ff'; g.shadowBlur = 40; circle(g, cx + 14, hy, hr + 14, '#7fe8ff'); g.restore();
  circle(g, cx, hy, hr, INK);
  // face: left eye a plain white dot, right eye a glowing cyan ring; the smile crosses the split and changes colour
  circle(g, cx - 120, hy - 50, 46, '#ffffff');
  glow(g, cx + 120, hy - 50, 150, '#7fe8ff', 0.8); ring(g, cx + 120, hy - 50, 58, 22, '#7fe8ff'); circle(g, cx + 120, hy - 50, 22, '#e8fdff');
  g.save(); g.lineCap = 'round'; g.lineWidth = 30;
  g.save(); split(-1); g.clip(); g.strokeStyle = '#ffffff'; g.beginPath(); g.arc(cx, hy + 40, 150, 0.35, Math.PI - 0.35); g.stroke(); g.restore();
  g.save(); split(1); g.clip(); g.strokeStyle = '#7fe8ff'; g.shadowColor = '#7fe8ff'; g.shadowBlur = 24; g.beginPath(); g.arc(cx, hy + 40, 150, 0.35, Math.PI - 0.35); g.stroke(); g.restore();
  g.restore();
  g.save(); g.strokeStyle = '#ffffff'; g.lineWidth = 8; g.shadowColor = '#ffffff'; g.shadowBlur = 20; g.beginPath(); g.moveTo(cx + 90, cy - R); g.lineTo(cx - 90, cy + R); g.stroke(); g.restore();
} });

// F — "The Mascot": the channel's own character — hood up in warm orange, one normal eye, one glowing cyan eye
registerShot('avatarF', { draw(g) {
  const cx = E.W / 2, cy = E.H / 2;
  g.fillStyle = radGrad(g, cx + 120, cy - 80, 40, 760, ['#123a66', '#0b1d3c', '#060b18']); g.fillRect(0, 0, E.W, E.H);
  glow(g, cx + 220, cy - 120, 480, '#58d6ff', 0.3);
  const hr = 250, hy = cy - 20;
  g.fillStyle = linGrad(g, 0, cy + 200, 0, E.H, ['#ff8a3a', '#e8562e']); g.beginPath(); g.ellipse(cx, cy + 540, 470, 360, 0, Math.PI, Math.PI * 2); g.fill();          // hoodie body
  for (const sx of [-1, 1]) { g.strokeStyle = '#fff3e6'; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx + sx * 70, cy + 250); g.lineTo(cx + sx * 80, cy + 400); g.stroke(); circle(g, cx + sx * 80, cy + 410, 14, '#fff3e6'); }
  g.fillStyle = linGrad(g, cx - 340, 0, cx + 340, 0, ['#ffa04a', '#ff7a3a', '#e8562e']); g.beginPath(); g.ellipse(cx, hy + 20, hr + 95, hr + 110, 0, 0, Math.PI * 2); g.fill();  // hood
  g.fillStyle = '#c8452a'; g.beginPath(); g.ellipse(cx, hy + 30, hr + 40, hr + 50, 0, 0, Math.PI * 2); g.fill();                                                      // hood opening shadow
  g.save(); g.beginPath(); g.ellipse(cx, hy + 20, hr + 95, hr + 110, 0, 0, Math.PI * 2); g.clip(); g.strokeStyle = alpha('#7fe8ff', 0.9); g.lineWidth = 10; g.shadowColor = '#7fe8ff'; g.shadowBlur = 20;
  g.beginPath(); g.moveTo(cx + 40, hy - hr - 120); g.lineTo(cx + 10, hy - hr - 40); g.lineTo(cx + 46, hy - hr - 10); g.lineTo(cx + 18, hy - hr + 40); g.stroke(); g.restore();                // glowing seam on the hood
  circle(g, cx + 10, hy, hr + 10, '#7fe8ff'); circle(g, cx, hy, hr, INK);                                                                                                // head + cyan rim
  circle(g, cx - 85, hy - 25, 34, '#ffffff');                                                                                                                             // normal eye
  glow(g, cx + 90, hy - 25, 120, '#7fe8ff', 0.85); ring(g, cx + 90, hy - 25, 44, 16, '#7fe8ff'); circle(g, cx + 90, hy - 25, 16, '#e8fdff');                               // future eye
  g.strokeStyle = '#ffffff'; g.lineWidth = 20; g.lineCap = 'round'; g.beginPath(); g.moveTo(cx - 70, hy + 95); g.quadraticCurveTo(cx + 10, hy + 135, cx + 90, hy + 75); g.stroke();  // smirk
} });

// ---------- final brand: the Split Face mark + matching banner ----------
// the face mark on its own (no background): head radius hr at (cx, cy); split line tilted like the avatar
function faceMark(g, cx, cy, hr) {
  const k = hr / 330, tilt = 90 / 540;            // same split angle as the avatar
  const half = (side) => { g.beginPath(); const T = hr * 1.6; if (side < 0) { g.moveTo(cx + T * tilt, cy - T); g.lineTo(cx - T * tilt, cy + T); g.lineTo(cx - T * 2, cy + T); g.lineTo(cx - T * 2, cy - T); } else { g.moveTo(cx + T * tilt, cy - T); g.lineTo(cx + T * 2, cy - T); g.lineTo(cx + T * 2, cy + T); g.lineTo(cx - T * tilt, cy + T); } g.closePath(); };
  g.save(); half(-1); g.clip(); circle(g, cx - 14 * k, cy, hr + 14 * k, '#fff3d6'); g.restore();
  g.save(); half(1); g.clip(); g.shadowColor = '#7fe8ff'; g.shadowBlur = 40 * k; circle(g, cx + 14 * k, cy, hr + 14 * k, '#7fe8ff'); g.restore();
  circle(g, cx, cy, hr, INK);
  circle(g, cx - 120 * k, cy - 80 * k, 46 * k, '#ffffff');
  glow(g, cx + 120 * k, cy - 80 * k, 150 * k, '#7fe8ff', 0.8); ring(g, cx + 120 * k, cy - 80 * k, 58 * k, 22 * k, '#7fe8ff'); circle(g, cx + 120 * k, cy - 80 * k, 22 * k, '#e8fdff');
  g.save(); g.lineCap = 'round'; g.lineWidth = 30 * k;
  g.save(); half(-1); g.clip(); g.strokeStyle = '#ffffff'; g.beginPath(); g.arc(cx, cy + 10 * k, 150 * k, 0.35, Math.PI - 0.35); g.stroke(); g.restore();
  g.save(); half(1); g.clip(); g.strokeStyle = '#7fe8ff'; g.shadowColor = '#7fe8ff'; g.shadowBlur = 24 * k; g.beginPath(); g.arc(cx, cy + 10 * k, 150 * k, 0.35, Math.PI - 0.35); g.stroke(); g.restore();
  g.restore();
}
registerShot('banner2', { draw(g) {
  const cx = E.W / 2, cy = E.H / 2, tilt = 90 / 540, T = 700;
  const side = (s) => { g.beginPath(); if (s < 0) { g.moveTo(cx + T * tilt, cy - T); g.lineTo(cx - T * tilt, cy + T); g.lineTo(-10, cy + T); g.lineTo(-10, cy - T); } else { g.moveTo(cx + T * tilt, cy - T); g.lineTo(E.W + 10, cy - T); g.lineTo(E.W + 10, cy + T); g.lineTo(cx - T * tilt, cy + T); } g.closePath(); };
  // warm world (left)
  g.save(); side(-1); g.clip(); g.fillStyle = linGrad(g, 0, 0, cx, E.H, ['#ffd25a', '#ffa03a', '#ff6a3a']); g.fillRect(0, 0, E.W, E.H);
  glow(g, cx * 0.35, cy * 0.6, 700, '#fff3c0', 0.35);
  for (let i = 0; i < 26; i++) { const x = (i * 211) % cx, y = (i * 137) % E.H, r = 6 + (i * 7) % 14; circle(g, x, y, r, alpha('#ffffff', 0.18)); }
  g.restore();
  // cyan world (right)
  g.save(); side(1); g.clip(); g.fillStyle = linGrad(g, cx, 0, E.W, E.H, ['#0a1838', '#0c2a5a', '#071226']); g.fillRect(0, 0, E.W, E.H);
  stars(g, 120, 11, [cx - 200, 0, E.W, E.H]); glow(g, cx + 420, cy, 800, '#58d6ff', 0.3);
  g.strokeStyle = 'rgba(127,232,255,.07)'; g.lineWidth = 2; for (let x = cx - 300; x < E.W; x += 80) { g.beginPath(); g.moveTo(x, 0); g.lineTo(x, E.H); g.stroke(); } for (let y = 0; y < E.H; y += 80) { g.beginPath(); g.moveTo(cx - 300, y); g.lineTo(E.W, y); g.stroke(); }
  g.fillStyle = 'rgba(127,232,255,.06)'; for (let y = 0; y < E.H; y += 14) g.fillRect(0, y, E.W, 5);
  g.restore();
  g.save(); g.strokeStyle = '#ffffff'; g.lineWidth = 8; g.shadowColor = '#ffffff'; g.shadowBlur = 20; g.beginPath(); g.moveTo(cx + T * tilt, cy - T); g.lineTo(cx - T * tilt, cy + T); g.stroke(); g.restore();
  // logo: PARALLEL [face] YOU  — all inside the 1160x317 safe area
  const fy = cy - 25, hr = 112;
  faceMark(g, cx, fy, hr);
  const size = 118;
  text(g, 'PARALLEL', cx - hr - 46, fy + 8, { size, color: INK, font: FONTS.title, weight: 700, align: 'right', spacing: 3, stroke: 10, strokeColor: '#fff3d6' });
  text(g, 'PARALLEL', cx - hr - 46, fy + 8, { size, color: INK, font: FONTS.title, weight: 700, align: 'right', spacing: 3 });
  text(g, 'YOU', cx + hr + 46, fy + 8, { size, color: '#bff6ff', font: FONTS.title, weight: 700, align: 'left', spacing: 3, glow: 40, glowColor: 'rgba(88,214,255,.95)' });
  text(g, 'EVERY WHAT IF, LIVED BY YOU', cx, fy + hr + 62, { size: 34, color: '#ffffff', font: FONTS.ui, weight: 900, spacing: 8, stroke: 9, strokeColor: 'rgba(8,10,24,.85)' });
} });

// ---------- final brand: "The Mirror" banner, matching the Mirror profile picture ----------
// the gold mirror with the glowing cyan world inside; bottom centre at (mx, fy), inner size mw x mh
function mirror(g, mx, fy, mw, mh) {
  const k = mw / 360, my = fy - mh - 10 * k, fr = 26 * k;
  glow(g, mx, my + mh / 2, 520 * k, '#58d6ff', 0.4);
  rr(g, mx - mw / 2 - fr, my - fr, mw + fr * 2, mh + fr * 2, mw / 2 + fr); g.fillStyle = linGrad(g, 0, my, 0, my + mh, ['#ffd27a', '#c8873a']); g.fill();
  g.save(); rr(g, mx - mw / 2, my, mw, mh, mw / 2); g.clip();
  g.fillStyle = linGrad(g, 0, my, 0, my + mh, ['#062a44', '#0a4a6e', '#0e6f94']); g.fillRect(mx - mw, my, mw * 2, mh);
  stars(g, 18, 3, [mx - mw / 2, my, mw, mh * 0.5]);
  g.fillStyle = alpha('#7fe8ff', 0.55); for (let i = 0; i < 7; i++) { const bw = (40 + (i * 37) % 50) * k, bh = (90 + (i * 53) % 160) * k; g.fillRect(mx - mw / 2 + i * 56 * k, my + mh - 120 * k - bh, bw, bh + 120 * k); }
  g.fillStyle = 'rgba(0,20,40,.25)'; for (let y = my; y < my + mh; y += 10 * k) g.fillRect(mx - mw / 2, y, mw, 3 * k);
  g.shadowColor = '#bff6ff'; g.shadowBlur = 30 * k; stickFig(g, mx - 10 * k, my + mh - 40 * k, 1.25 * k, POSES.wave, '#bff6ff', null, -1); g.shadowBlur = 0;
  g.restore();
}
registerShot('banner3', { draw(g) {
  const fy = 668;                                           // floor line, inside the safe area
  g.fillStyle = linGrad(g, 0, 0, 0, fy, ['#140e2c', '#2c1f52', '#3d2a5c']); g.fillRect(0, 0, E.W, fy);
  stars(g, 260, 7, [0, 0, E.W, fy - 40]);
  // a warm moon far left (seen on desktop and TV, not on phones)
  glow(g, 186, 478, 260, '#ffe2a8', 0.3);
  g.save(); g.beginPath(); g.arc(200, 470, 58, 0, Math.PI * 2); g.clip(); g.beginPath(); g.rect(0, 0, E.W, E.H); g.arc(226, 452, 52, 0, Math.PI * 2); g.fillStyle = '#fff1cf'; g.fill('evenodd'); g.restore();
  g.fillStyle = linGrad(g, 0, fy, 0, E.H, ['#3a2436', '#1c1220']); g.fillRect(0, fy, E.W, E.H - fy);
  // the mirror stands on the right; its cyan light spills across the floor towards you
  const mx = 1420, mw = 150, mh = 250;
  g.save(); g.globalCompositeOperation = 'lighter';
  poly(g, [[mx - mw / 2, fy], [mx + mw / 2, fy], [mx + 240, E.H], [mx - 560, E.H]], linGrad(g, 0, fy, 0, E.H, [alpha('#58d6ff', 0.24), alpha('#58d6ff', 0)]));
  g.restore();
  mirror(g, mx, fy, mw, mh);
  // you, on the left, looking at your reflection: warm rim from behind, cyan light on the front
  const yx = 520, s = 0.92, P = { ...POSES.stand, head: [6, -208] };
  g.fillStyle = 'rgba(0,0,0,.35)'; g.beginPath(); g.ellipse(yx, fy + 3, 42, 7, 0, 0, Math.PI * 2); g.fill();
  stickFig(g, yx + 4, fy - 2, s, P, '#7fe8ff', null, 1);
  stickFig(g, yx, fy, s, P, INK, [-4, -2, '#ffb070'], 1);
  // the name in the middle: PARALLEL in mirror-gold, YOU glowing like the reflection
  const cx = 965;
  text(g, 'PARALLEL', cx, 470, { size: 112, color: '#ffd27a', font: FONTS.title, weight: 700, spacing: 4, stroke: 10, strokeColor: '#140e2c' });
  text(g, 'PARALLEL', cx, 470, { size: 112, color: '#ffd27a', font: FONTS.title, weight: 700, spacing: 4 });
  text(g, 'YOU', cx, 578, { size: 138, color: '#bff6ff', font: FONTS.title, weight: 700, spacing: 8, glow: 44, glowColor: 'rgba(88,214,255,.95)' });
  text(g, 'EVERY WHAT IF, LIVED BY YOU', cx, 662, { size: 30, color: '#ffffff', font: FONTS.ui, weight: 900, spacing: 8, stroke: 8, strokeColor: 'rgba(14,10,30,.9)' });
} });
