// SKOTOMA channel avatars: one character, soft-shaded "sticker" look, readable at 40 px.
// Each is drawn in the centre 1080x1080 square of the 1920x1080 frame and cropped to 800x800 after render.
//   avatarPeeker / avatarPeekerYellow: the passenger: a pale face with hollow eyes peeking over a seat back, long fingers over the edge
//   avatarDontLookYellow: a character covering its eyes, one eye peeking between two fingers (rule 1: do not look)
import { E, registerShot, alpha, radGrad, linGrad, rr, circle } from '/engine/core.js';
export const INK = '#0a0a0a', YELLOW = '#ffc21a';
const CX = 960, CY = 540;

// logos stay clean: keep the style's contrast LUT but drop grain, scanlines, vignette and bloom
E.style = { ...E.style, grade: { ...E.style.grade, grain: 0, scanlines: 0, vignette: 0, bloom: 0 } };

const skin = (g, x, y, r) => radGrad(g, x, y, 0, r, [[0, '#ffffff'], [0.55, '#f6f6f6'], [1, '#cfcfcf']]);
// stroke every shape first, then fill them all: overlapping shapes merge into one outlined silhouette
function blob(g, shapes, fill, w = 24, stroke = INK) {
  g.save(); g.lineJoin = 'round'; g.lineCap = 'round'; g.strokeStyle = stroke; g.lineWidth = w;
  for (const s of shapes) { s(g); g.stroke(); }
  g.fillStyle = fill; for (const s of shapes) { s(g); g.fill(); }
  g.restore();
}
const ell = (x, y, rx, ry, a = 0) => g => { g.beginPath(); g.ellipse(x, y, rx, ry, a, 0, Math.PI * 2); };
const capsule = (x, y, ang, len, w) => g => { g.save(); g.translate(x, y); g.rotate(ang); rr(g, -w / 2, -len, w, len, w / 2); g.restore(); };
function dropShadow(g, shapes, dx = 10, dy = 16, a = 0.25) { g.save(); g.translate(dx, dy); g.fillStyle = `rgba(0,0,0,${a})`; for (const s of shapes) { s(g); g.fill(); } g.restore(); }

// ---------- "Don't Look" ----------
// one hand in local coords (x grows outward from the face, y up is negative); gap: open the two inner fingers
function hand(g, cx, cy, side, tilt, gap) {
  g.save(); g.translate(cx, cy); g.scale(side, 1); g.rotate(tilt);
  const fx = gap ? [-134, -10, 46, 100] : [-84, -28, 28, 84], len = [180, 210, 200, 165];
  const shapes = [ell(5, 50, 122, 92), capsule(96, 96, 2.35, 105, 54), ...fx.map((x, i) => capsule(x, 50, 0, len[i] + 20, 56))];
  dropShadow(g, shapes, 8 * side, 12, 0.18);
  blob(g, shapes, skin(g, -20, -60, 300));
  g.strokeStyle = INK; g.lineWidth = 9; g.lineCap = 'round';
  for (let i = gap ? 1 : 0; i < 3; i++) { const x = (fx[i] + fx[i + 1]) / 2, top = 50 - Math.min(len[i], len[i + 1]) - 20 + 34; g.beginPath(); g.moveTo(x, top); g.lineTo(x, 22); g.stroke(); }
  g.restore();
}
const toWorld = (cx, cy, side, tilt, lx, ly) => { const x = lx * side; return [cx + x * Math.cos(tilt * side) - ly * Math.sin(tilt * side), cy + x * Math.sin(tilt * side) + ly * Math.cos(tilt * side)]; };

function dontLook(g, { bg, glowCol, body }) {
  g.fillStyle = bg; g.fillRect(0, 0, E.W, E.H);
  g.fillStyle = radGrad(g, CX - 100, CY - 180, 0, 720, [alpha(glowCol, 0.35), alpha(glowCol, 0)]); g.fillRect(0, 0, E.W, E.H);
  const hx = CX, hy = CY - 40;
  // shoulders
  const torso = g => { g.beginPath(); g.moveTo(CX - 310, 1140); g.bezierCurveTo(CX - 300, CY + 330, CX - 200, CY + 255, CX, CY + 255); g.bezierCurveTo(CX + 200, CY + 255, CX + 300, CY + 330, CX + 310, 1140); g.closePath(); };
  blob(g, [torso], body);
  g.fillStyle = linGrad(g, 0, CY + 250, 0, 1080, ['rgba(255,255,255,0.08)', 'rgba(255,255,255,0)']); torso(g); g.fill();
  // head
  const head = ell(hx, hy, 290, 268);
  dropShadow(g, [head], 0, 22, 0.3);
  blob(g, [head], skin(g, hx - 100, hy - 120, 430), 26);
  // the one eye that peeks (drawn before the hands so it shows through the gap)
  const RH = [hx + 148, hy + 12, 1, -0.08];
  const [ex, ey] = toWorld(...RH, -72, -30);
  circle(g, ex, ey, 29, INK); circle(g, ex + 9, ey - 10, 9, '#ffffff'); circle(g, ex - 8, ey + 10, 3.5, '#ffffff');
  // nervous mouth + sweat drop
  g.save(); g.strokeStyle = INK; g.lineWidth = 12; g.lineCap = 'round'; g.lineJoin = 'round'; g.beginPath(); g.moveTo(hx - 54, hy + 196);
  for (let i = 1; i <= 6; i++) g.lineTo(hx - 54 + i * 18, hy + 196 + (i % 2 ? -11 : 0)); g.stroke(); g.restore();
  const dx = hx + 205, dy = hy - 205;
  const drop = g => { g.beginPath(); g.moveTo(dx, dy - 44); g.bezierCurveTo(dx + 10, dy - 20, dx + 30, dy - 4, dx + 26, dy + 12); g.arc(dx, dy + 10, 26, 0.1, Math.PI - 0.1); g.bezierCurveTo(dx - 30, dy - 4, dx - 10, dy - 20, dx, dy - 44); g.closePath(); };
  blob(g, [drop], '#d8f0ff', 9);
  circle(g, dx - 8, dy + 4, 7, '#ffffff');
  // hands over the eyes; the right hand leaves a gap
  hand(g, hx - 148, hy + 12, -1, -0.08, false);
  hand(g, ...RH, true);
}

registerShot('avatarDontLookYellow', { draw(g) { dontLook(g, { bg: YELLOW, glowCol: '#fff3c4', body: '#141414' }); } });

// ---------- the passenger ----------
// the passenger's parts take the seat top as y = top and its centre as x = cx; the banner reuses them scaled
export function passengerHead(g, cx, top, outline) {
  const head = g => { g.beginPath(); g.ellipse(cx, top + 60, 300, 450, 0, 0, Math.PI * 2); };
  // pale head behind the seat back, lit by the dashboard from the right
  if (outline) { g.save(); head(g); g.lineWidth = 26; g.strokeStyle = INK; g.stroke(); g.restore(); }
  head(g); g.fillStyle = radGrad(g, cx - 80, top - 300, 0, 560, [[0, '#f6f6f6'], [0.55, '#dedede'], [1, '#8a8a8a']]); g.fill();
  g.save(); head(g); g.clip(); g.fillStyle = radGrad(g, cx + 330, top - 120, 60, 330, [alpha('#ffc04d', 0.28), alpha('#ffc04d', 0)]); g.fillRect(cx, top - 420, 340, 420); g.restore();
  // hollow eyes, pinpoint pupils looking at you
  for (const sx of [-1, 1]) {
    g.save(); g.translate(cx + sx * 108, top - 165); g.rotate(sx * 0.16);
    g.fillStyle = radGrad(g, 0, 0, 30, 100, ['rgba(50,50,60,0.6)', 'rgba(50,50,60,0)']); g.beginPath(); g.ellipse(0, 0, 100, 80, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = INK; g.beginPath(); g.ellipse(0, 0, 68, 53, 0, 0, Math.PI * 2); g.fill(); g.restore();
    circle(g, cx + sx * 108 - sx * 16, top - 160, 10, '#ffffff');
  }
}
// seat back with stitching
export function seatBack(g, x0, x1, top, h, outline, seams = []) {
  if (outline) { rr(g, x0 - 12, top - 12, x1 - x0 + 24, h + 40, 100); g.fillStyle = INK; g.fill(); }
  rr(g, x0, top, x1 - x0, h, 90); g.fillStyle = linGrad(g, 0, top, 0, top + 320, ['#2c2d33', '#141518']); g.fill();
  g.strokeStyle = 'rgba(255,255,255,0.16)'; g.lineWidth = 6; g.beginPath(); g.moveTo(x0 + 80, top + 5); g.lineTo(x1 - 80, top + 5); g.stroke();
  g.setLineDash([16, 14]); g.strokeStyle = 'rgba(255,255,255,0.12)'; g.lineWidth = 4;
  for (const x of seams) { g.beginPath(); g.moveTo(x, top + 70); g.lineTo(x, top + h); g.stroke(); } g.setLineDash([]);
}
// four long jointed fingers hooked over the edge, starting at x and spreading outward in direction sx
export function hookHand(g, x0, top, sx) {
  for (let i = 0; i < 4; i++) {
    const x = x0 + sx * i * 44, len = [165, 195, 185, 140][i], y0 = top - 34;
    g.save(); g.translate(x, y0 + 20); g.rotate(sx * (i - 1.5) * 0.035); g.translate(-x, -y0 - 20);
    g.fillStyle = 'rgba(0,0,0,0.4)'; rr(g, x - 15, y0 + 22, 34, len + 10, 17); g.fill();
    rr(g, x - 17, y0, 34, len, 17); g.fillStyle = linGrad(g, 0, y0, 0, y0 + len, ['#f4f4f4', '#c4c4c4']); g.fill();
    g.strokeStyle = INK; g.lineWidth = 6; g.stroke();
    g.strokeStyle = 'rgba(0,0,0,0.3)'; g.lineWidth = 4; g.lineCap = 'round'; for (const k of [0.4, 0.66]) { g.beginPath(); g.moveTo(x - 7, y0 + len * k); g.quadraticCurveTo(x, y0 + len * k + 4, x + 7, y0 + len * k); g.stroke(); }
    rr(g, x - 10, y0 + len - 36, 20, 26, 9); g.fillStyle = '#9a9aa2'; g.fill(); g.strokeStyle = 'rgba(0,0,0,0.45)'; g.lineWidth = 3; g.stroke();
    g.restore();
  }
}
function peeker(g, { bg, glowCol, outline }) {
  g.fillStyle = bg; g.fillRect(0, 0, E.W, E.H);
  g.fillStyle = radGrad(g, CX, CY - 120, 0, 650, [alpha(glowCol, 0.3), alpha(glowCol, 0)]); g.fillRect(0, 0, E.W, E.H);
  const top = CY + 235;
  passengerHead(g, CX, top, outline);
  seatBack(g, CX - 640, CX + 640, top, 600, outline, [CX - 210, CX + 210]);
  hookHand(g, CX - 262, top, -1); hookHand(g, CX + 262, top, 1);
}
registerShot('avatarPeeker', { draw(g) { peeker(g, { bg: '#060607', glowCol: '#78829a' }); } });
registerShot('avatarPeekerYellow', { draw(g) { peeker(g, { bg: YELLOW, glowCol: '#fff3c4', outline: true }); } });
