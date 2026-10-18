// thumbnails for NIGHT SUPPORT 001 (v2, after comparing with the top rule-video channels at phone size):
// one big subject, glowing eyes as the focal point, 2-3 words of huge text, almost no small UI.
//   thumbA: red half with huge white text + black line, curved arrow into the passenger's face filling the right side
//   thumbB: black, stacked text left, one glowing white pictogram right: an empty passenger seat whose belt is buckled
//           around someone you can't see, red eyes where the head would be
// The passenger is cartoon-outlined (white fill, thick black outline), unlike the in-video pictograms.
import { E, registerShot, alpha, glow, radGrad, rr, circle } from '/engine/core.js';
import * as NS from '/projects/ns001-empty-seat/scenes/ns.js';
const { C, T } = NS;
const RED = '#ff2b2b', INK = '#0a0a0a', OUT = 12;

// thumbnails stay crisp: keep the style's contrast LUT but drop grain, scanlines, vignette and bloom
E.style = { ...E.style, grade: { ...E.style.grade, grain: 0, scanlines: 0, vignette: 0, bloom: 0 } };

function outlined(g, path, fill, w = OUT) { path(g); g.lineJoin = 'round'; g.lineWidth = w; g.strokeStyle = INK; g.stroke(); g.fillStyle = fill; g.fill(); }
function bigText(g, str, x, y, size, col, shadow = true) {
  if (shadow) T(g, str, x + 9, y + 11, { size, align: 'left', color: 'rgba(0,0,0,0.55)' });
  T(g, str, x, y, { size, align: 'left', color: col, stroke: col === INK ? 0 : 14, strokeColor: INK });
}

// the passenger, close up: pale long head, hollow eyes with glowing red pupils, a too-wide grin, belted into a dark seat
const skin = (g, x, y, r) => radGrad(g, x, y, 0, r, [[0, '#f8f8f8'], [0.6, '#e0e0e0'], [1, '#a2a2a2']]);
function passengerClose(g, cx, cy) {
  outlined(g, g => rr(g, cx - 380, cy - 170, 1000, 1000, 130), '#2a2c31');                    // seat back
  outlined(g, g => rr(g, cx - 340, cy + 385, 760, 500, 220), '#d6d6d6');                      // shoulders
  g.save(); g.lineCap = 'butt'; g.strokeStyle = INK; g.lineWidth = 92; g.beginPath(); g.moveTo(cx - 330, cy + 420); g.lineTo(cx + 420, cy + 700); g.stroke();
  g.strokeStyle = '#55575e'; g.lineWidth = 64; g.stroke(); g.restore();                         // seat belt across the chest
  g.save(); g.translate(cx, cy + 400); g.rotate(-0.1); g.translate(-cx, -cy - 400);           // head tilted, just slightly wrong
  outlined(g, g => { g.beginPath(); g.ellipse(cx, cy, 300, 410, 0, 0, Math.PI * 2); }, skin(g, cx - 90, cy - 150, 520));
  for (const sx of [-1, 1]) {
    const ex = cx + sx * 125, ey = cy - 40;
    g.save(); g.translate(ex, ey); g.rotate(sx * 0.16);
    g.fillStyle = radGrad(g, 0, 0, 40, 120, ['rgba(40,40,50,0.6)', 'rgba(40,40,50,0)']); g.beginPath(); g.ellipse(0, 0, 120, 95, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = INK; g.beginPath(); g.ellipse(0, 0, 84, 64, 0, 0, Math.PI * 2); g.fill(); g.restore();
    glow(g, ex - sx * 12, ey + 4, 110, RED, 1); circle(g, ex - sx * 12, ey + 4, 21, RED); circle(g, ex - sx * 17, ey - 2, 6, '#ffe0e0');
  }
  g.save(); g.lineCap = 'round'; g.strokeStyle = INK; g.lineWidth = 11; const gy = cy + 175, gw = 185, gd = 62;
  g.beginPath(); g.moveTo(cx - gw, gy); g.quadraticCurveTo(cx, gy + gd * 2, cx + gw, gy); g.stroke();
  g.lineWidth = 7; for (let i = -6; i <= 6; i++) { const x = cx + i * 27, k = (x - cx) / gw, y = gy + gd * (1 - k * k); g.beginPath(); g.moveTo(x, y - 18); g.lineTo(x, y + 5); g.stroke(); }
  g.restore(); g.restore();
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
  passengerClose(g, 1500, 450);
  bigText(g, "DON'T", 70, 255, 250, '#ffffff');
  bigText(g, 'LOOK', 70, 495, 250, '#ffffff');
  T(g, 'AT THE SEAT', 82, 660, { size: 104, align: 'left', color: INK });
  arrow(g, [[300, 790], [600, 1010], [1150, 760]]);
}});

// side view of the passenger seat as a glowing white pictogram (black gaps instead of outlines, like the video)
registerShot('thumbB', { draw(g) {
  g.fillStyle = '#050505'; g.fillRect(0, 0, E.W, E.H);
  T(g, "DON'T", 90, 380, { size: 235, align: 'left', color: '#ffffff' });
  T(g, 'LOOK.', 90, 625, { size: 235, align: 'left', color: RED, glow: 34, glowColor: alpha(RED, 0.6) });
  T(g, 'AT THE SEAT', 100, 820, { size: 92, align: 'left', color: '#ffffff' });
  // the seat is drawn around a local origin (0, 0) at the back of the cushion, then placed and scaled
  g.save(); g.translate(1190, 905); g.scale(1.12, 1.12);
  const W = '#f2f2f2', bx = 0, by = 0;
  g.save(); g.shadowColor = 'rgba(255,255,255,0.45)'; g.shadowBlur = 45; g.fillStyle = W;
  rr(g, bx - 40, by - 70, 560, 120, 50); g.fill();                                              // cushion
  rr(g, bx + 30, by + 74, 420, 28, 14); g.fill();                                               // rail
  g.save(); g.translate(bx, by - 40); g.rotate(-0.17);
  rr(g, -70, -560, 140, 540, 60); g.fill();                                                     // seat back
  rr(g, -55, -720, 125, 130, 44); g.fill();                                                     // headrest
  g.restore(); g.restore();
  // the belt, buckled and bulging around a body that isn't there
  g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  const belt = g => { g.beginPath(); g.moveTo(bx - 30, by - 520); g.bezierCurveTo(bx + 230, by - 470, bx + 300, by - 200, bx + 70, by - 80); g.moveTo(bx + 70, by - 80); g.quadraticCurveTo(bx + 280, by - 150, bx + 470, by - 80); };
  belt(g); g.strokeStyle = '#050505'; g.lineWidth = 50; g.stroke();
  belt(g); g.strokeStyle = '#9a9a9a'; g.lineWidth = 26; g.stroke();
  rr(g, bx + 40, by - 108, 64, 56, 12); g.fillStyle = '#050505'; g.fill(); rr(g, bx + 50, by - 100, 44, 40, 8); g.fillStyle = W; g.fill();   // buckle
  g.restore();
  // where the head would be
  for (const ex of [bx + 100, bx + 245]) { glow(g, ex, by - 640, 85, RED, 1); circle(g, ex, by - 640, 21, RED); circle(g, ex - 5, by - 645, 6, '#ffe0e0'); }
  g.restore();
}});
