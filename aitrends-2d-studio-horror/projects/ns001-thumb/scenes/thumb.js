// thumbnails for NIGHT SUPPORT 001, viral rule-video layout:
//   thumbA: red half with huge white text + black line, curved arrow into a framed "cabin cam" panel
//   thumbB: black version, big text over the same panel (for YouTube's thumbnail A/B test)
// The subject is cartoon-outlined (white fill, thick black outline, glowing red eyes), unlike the in-video pictograms.
import { E, registerShot, alpha, glow, radGrad, rr, circle } from '/engine/core.js';
import * as NS from '/projects/ns001-empty-seat/scenes/ns.js';
const { C, T } = NS;
const RED = '#ff2b2b', INK = '#0a0a0a', OUT = 12;

function outlined(g, path, fill, w = OUT) { path(g); g.lineJoin = 'round'; g.lineWidth = w; g.strokeStyle = INK; g.stroke(); g.fillStyle = fill; g.fill(); }
function bigText(g, str, x, y, size, col, shadow = true) {
  if (shadow) T(g, str, x + 9, y + 11, { size, align: 'left', color: 'rgba(0,0,0,0.55)' });
  T(g, str, x, y, { size, align: 'left', color: col, stroke: col === INK ? 0 : 14, strokeColor: INK });
}

// the cabin-cam panel: passenger seat with something buckled in
function cabinCam(g, x, y, w, h) {
  rr(g, x - 10, y - 10, w + 20, h + 20, 50); g.fillStyle = INK; g.fill();
  rr(g, x, y, w, h, 42); g.fillStyle = '#f2f2f2'; g.fill();
  const ix = x + 22, iy = y + 22, iw = w - 44, ih = h - 44;
  g.save(); rr(g, ix, iy, iw, ih, 30); g.clip();
  g.fillStyle = '#0d0f12'; g.fillRect(ix, iy, iw, ih);
  g.fillStyle = radGrad(g, ix + iw * 0.85, iy + ih * 0.1, 0, iw * 0.7, [alpha(C.amber, 0.35), alpha(C.amber, 0)]); g.fillRect(ix, iy, iw, ih);
  const cx = ix + iw * 0.5, base = iy + ih;
  // seat back + headrest behind the figure
  outlined(g, g => { g.beginPath(); g.moveTo(cx - 230, base + 20); g.lineTo(cx - 205, iy + ih * 0.36); g.quadraticCurveTo(cx, iy + ih * 0.28, cx + 205, iy + ih * 0.36); g.lineTo(cx + 230, base + 20); g.closePath(); }, '#cfcfcf');
  outlined(g, g => rr(g, cx - 110, iy + ih * 0.12, 220, 130, 46), '#cfcfcf');
  // body: narrow shoulders, long arms resting on the lap
  const sy = iy + ih * 0.53, lap = iy + ih * 0.86;
  outlined(g, g => { g.beginPath(); g.moveTo(cx - 135, base + 20); g.lineTo(cx - 140, sy + 40); g.quadraticCurveTo(cx - 135, sy, cx - 80, sy - 6); g.lineTo(cx + 80, sy - 6); g.quadraticCurveTo(cx + 135, sy, cx + 140, sy + 40); g.lineTo(cx + 135, base + 20); g.closePath(); }, '#ffffff');
  // seat belt, already buckled
  g.save(); g.lineCap = 'round'; g.strokeStyle = INK; g.lineWidth = 44; g.beginPath(); g.moveTo(cx - 110, sy); g.lineTo(cx + 125, base); g.stroke(); g.strokeStyle = '#5a5a5a'; g.lineWidth = 28; g.stroke(); g.restore();
  for (const sx of [-1, 1]) { const arm = [[cx + sx * 150, sy + 40], [cx + sx * 160, lap - 20], [cx + sx * 50, lap]];
    for (const [col, w] of [[INK, 62], ['#ffffff', 40]]) { g.save(); g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = col; g.lineWidth = w; g.beginPath(); g.moveTo(...arm[0]); g.lineTo(...arm[1]); g.lineTo(...arm[2]); g.stroke(); g.restore(); } }
  // head: pale, long, thin grin, red eyes
  const hy = iy + ih * 0.3;
  outlined(g, g => { g.beginPath(); g.ellipse(cx, hy, 92, 118, 0, 0, Math.PI * 2); }, '#ffffff');
  for (const sx of [-1, 1]) { glow(g, cx + sx * 40, hy - 6, 90, RED, 0.9); circle(g, cx + sx * 40, hy - 6, 26, INK); circle(g, cx + sx * 40, hy - 6, 19, RED); circle(g, cx + sx * 40 - 6, hy - 13, 6, '#fff'); }
  g.save(); g.lineCap = 'round'; g.strokeStyle = INK; g.lineWidth = 7; g.beginPath(); g.moveTo(cx - 58, hy + 48); g.quadraticCurveTo(cx, hy + 86, cx + 58, hy + 48); g.stroke();
  for (let i = -3; i <= 3; i++) { const x = cx + i * 15, y = hy + 48 + 38 * (1 - (i / 4) ** 2) * 0.95 - 2; g.beginPath(); g.moveTo(x, y - 9); g.lineTo(x, y + 4); g.stroke(); } g.restore();
  // face-detection box + camera UI
  g.strokeStyle = '#ffffff'; g.lineWidth = 6; const bx = cx - 135, by = hy - 150, bw = 270, bh = 290, k = 46;
  for (const [px, py, dx, dy] of [[bx, by, 1, 1], [bx + bw, by, -1, 1], [bx, by + bh, 1, -1], [bx + bw, by + bh, -1, -1]]) { g.beginPath(); g.moveTo(px + dx * k, py); g.lineTo(px, py); g.lineTo(px, py + dy * k); g.stroke(); }
  NS.pill(g, cx, by - 36, 'OCCUPANT 68.4 KG', RED, { size: 26, solid: true });
  circle(g, ix + 46, iy + 46, 11, RED); T(g, 'REC', ix + 66, iy + 47, { size: 26, align: 'left' });
  T(g, 'CABIN CAM', ix + iw - 30, iy + 47, { size: 24, weight: 800, align: 'right' });
  T(g, '03:07:12 AM', ix + 30, iy + 88, { size: 22, weight: 800, align: 'left', color: '#bbbbbb' });
  NS.seatbeltIcon(g, ix + iw - 70, iy + ih - 70, 1.3, RED); glow(g, ix + iw - 70, iy + ih - 70, 110, RED, 0.6);
  g.restore();
}
function arrow(g, pts, w = 30) {
  const [a, b, c] = pts; const head = (col, s) => { const ang = Math.atan2(c[1] - b[1], c[0] - b[0]); g.save(); g.translate(c[0], c[1]); g.rotate(ang);
    g.beginPath(); g.moveTo(26 * s, 0); g.lineTo(-44 * s, -40 * s); g.lineTo(-44 * s, 40 * s); g.closePath(); g.fillStyle = col; g.fill(); g.restore(); };
  for (const [col, lw, s] of [[INK, w + 16, 1.25], ['#ffffff', w, 1]]) { g.save(); g.lineCap = 'round'; g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); g.moveTo(...a); g.quadraticCurveTo(...b, ...c); g.stroke(); g.restore(); head(col, s); }
}

registerShot('thumbA', { draw(g) {
  g.fillStyle = RED; g.fillRect(0, 0, E.W, E.H);
  g.fillStyle = radGrad(g, 520, 420, 0, 900, ['rgba(255,255,255,0.12)', 'rgba(255,255,255,0)']); g.fillRect(0, 0, E.W, E.H);
  g.fillStyle = radGrad(g, E.W / 2, E.H / 2, E.W * 0.45, E.W * 0.75, ['rgba(0,0,0,0)', 'rgba(0,0,0,0.25)']); g.fillRect(0, 0, E.W, E.H);
  cabinCam(g, 1010, 90, 840, 900);
  bigText(g, "DON'T", 70, 255, 250, '#ffffff');
  bigText(g, 'LOOK', 70, 495, 250, '#ffffff');
  T(g, 'AT THE SEAT', 82, 660, { size: 104, align: 'left', color: INK });
  arrow(g, [[300, 790], [520, 990], [930, 760]]);
}});

registerShot('thumbB', { draw(g) {
  g.fillStyle = '#060606'; g.fillRect(0, 0, E.W, E.H);
  cabinCam(g, 560, 250, 800, 800);
  g.save(); g.font = '900 210px "Montserrat"'; const w1 = g.measureText("DON'T ").width, w2 = g.measureText('LOOK').width; g.restore();
  const x0 = E.W / 2 - (w1 + w2) / 2;
  T(g, "DON'T", x0, 140, { size: 210, align: 'left', color: '#ffffff', stroke: 14, strokeColor: INK });
  T(g, 'LOOK', x0 + w1, 140, { size: 210, align: 'left', color: RED, stroke: 14, strokeColor: INK, glow: 30, glowColor: alpha(RED, 0.6) });
}});
