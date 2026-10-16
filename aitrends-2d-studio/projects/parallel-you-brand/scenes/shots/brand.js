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
