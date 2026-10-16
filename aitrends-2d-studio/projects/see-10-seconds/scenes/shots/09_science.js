// shots/09_science.js — "Is any of this real?": the brain runs ~0.1 s behind and predicts motion; the fastball; x100.
import { E, V, S, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, wordTime, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, radGrad, text, FONTS, shake } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { YOU, PITCHER } from '../cast.js';
import { BLUE, ghost, chip, crossMark, checkMark } from '../lib.js';

const bp = () => S().ui.blueprint, gold = () => S().ui.gold, cream = () => S().ui.cream;
function board(g, t, info, z0 = 1, z1 = 1.05) { UI.blueprint(g, { grid: 60, a: 0.07 }); const k = t / info.dur; g.save(); g.translate(E.W / 2, E.H / 2); const z = lerp(z0, z1, ease.inOut(k)); g.scale(z, z); g.translate(-E.W / 2, -E.H / 2); return () => g.restore(); }
const at = (w, after) => wordTime(w, after) ?? after;
// side-profile head in blueprint line art (facing right); brain inside
function profileHead(g, x, y, r, o = {}) {
  const c = o.color || '#e8f0ff', pulse = o.pulse || 0;
  g.save(); g.strokeStyle = c; g.lineWidth = 5; g.lineJoin = 'round'; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x - r * 0.15, y + r * 1.35); g.lineTo(x - r * 0.2, y + r * 0.85);
  g.bezierCurveTo(x - r * 1.05, y + r * 0.7, x - r * 1.15, y - r * 0.9, x - r * 0.1, y - r * 1.05);
  g.bezierCurveTo(x + r * 0.75, y - r * 1.1, x + r * 1.0, y - r * 0.45, x + r * 0.92, y - r * 0.05);
  g.lineTo(x + r * 1.12, y + r * 0.22); g.lineTo(x + r * 0.95, y + r * 0.3); g.lineTo(x + r * 0.98, y + r * 0.55);
  g.quadraticCurveTo(x + r * 0.95, y + r * 0.8, x + r * 0.55, y + r * 0.82); g.lineTo(x + r * 0.45, y + r * 1.35); g.stroke();
  circle(g, x + r * 0.55, y - r * 0.18, r * 0.07, c);
  const bx = x - r * 0.18, by = y - r * 0.45;
  g.strokeStyle = mix(gold(), '#ffffff', 0.2); g.lineWidth = 4;
  g.beginPath(); for (let i = 0; i <= 60; i++) { const a = (i / 60) * Math.PI * 2, rr2 = r * (0.48 + 0.04 * Math.sin(a * 9)); const px = bx + Math.cos(a) * rr2 * 1.25, py = by + Math.sin(a) * rr2 * 0.85; i ? g.lineTo(px, py) : g.moveTo(px, py); } g.closePath(); g.stroke();
  for (let i = 0; i < 5; i++) { g.beginPath(); g.arc(bx - r * 0.3 + i * r * 0.15, by + Math.sin(i) * r * 0.1, r * 0.12, 0.3, 2.6); g.stroke(); }
  glow(g, bx, by, r * (0.9 + 0.2 * pulse), gold(), 0.18 + 0.25 * pulse);
  g.restore();
  return [bx, by];
}

// s104 — "So, is any of this real?"
registerShot('s104', { draw(g, t, info) { const end = board(g, t, info, 1, 1.06); UI.bigLine(g, t, { str: 'IS ANY OF THIS REAL?', dur: info.dur + 0.6, y: E.H * 0.47, size: 104 }); end(); } });

// s105 — "Not the blue world."  the ghost figure gets crossed out
registerShot('s105', { draw(g, t, info) {
  const end = board(g, t, info);
  ghost(g, (x) => UI.lineFigure(x, { x: E.W / 2, y: E.H * 0.74, s: 1.7, pose: POSES.stand, color: '#fff' }), { t, a: 0.7 });
  crossMark(g, E.W / 2, E.H * 0.45, 3.2, S().ui.accent, prog(t, 0.3, 0.8));
  chip(g, 'THE BLUE WORLD', E.W / 2, E.H * 0.86, { size: 32, color: BLUE, k: prog(t, 0.05, 0.3), line: alpha(BLUE, 0.6) });
  end();
} });

// s106 — "But part of it is happening inside your head right now."
registerShot('s106', { draw(g, t, info) {
  const end = board(g, t, info, 1, 1.08);
  profileHead(g, E.W / 2 - 80, E.H * 0.52, 300, { pulse: 0.5 + 0.5 * Math.sin(t * 5) });
  chip(g, 'INSIDE YOUR HEAD', E.W / 2, E.H * 0.9, { size: 30, color: gold(), k: prog(t, 0.6, 1.0) });
  end();
} });

// s107 — "Your brain is always about a tenth of a second behind reality."  two tracks, the brain's ball lags
registerShot('s107', { draw(g, t, info) {
  const end = board(g, t, info), x0 = E.W * 0.2, x1 = E.W * 0.85, y1 = E.H * 0.38, y2 = E.H * 0.62, u = (t * 0.32) % 1, lag = 0.09;
  for (const [y, lab, col] of [[y1, 'REALITY', cream()], [y2, 'YOUR BRAIN', gold()]]) { seg(g, [[x0, y], [x1, y]], 4, alpha(bp(), 0.5)); text(g, lab, x0 - 30, y, { size: 32, color: col, font: FONTS.ui, weight: 900, align: 'right', spacing: 2 }); }
  circle(g, lerp(x0, x1, u), y1 - 34, 30, cream()); circle(g, lerp(x0, x1, Math.max(0, u - lag)), y2 - 34, 30, gold());
  const xa = lerp(x0, x1, u), xb = lerp(x0, x1, Math.max(0, u - lag));
  g.setLineDash([10, 10]); seg(g, [[xa, y1 - 34], [xa, y2 - 34]], 3, alpha(cream(), 0.6)); g.setLineDash([]);
  const tt = at('tenth', 229) - info.shot.start; UI.readout(g, { label: 'DELAY', value: '0.1 s', x: E.W / 2, y: E.H * 0.83, align: 'center', size: 70, a: prog(t, tt, tt + 0.3) });
  void xb; end();
} });

// s108 — "That's how long it takes to process what your eyes see."  eye -> nerve -> brain
registerShot('s108', { draw(g, t, info) {
  const end = board(g, t, info), ex = E.W * 0.2, ey = E.H * 0.5, bx = E.W * 0.74, by = E.H * 0.46;
  g.save(); g.strokeStyle = '#e8f0ff'; g.lineWidth = 6; g.beginPath(); g.moveTo(ex - 120, ey); g.quadraticCurveTo(ex, ey - 110, ex + 120, ey); g.quadraticCurveTo(ex, ey + 110, ex - 120, ey); g.stroke(); circle(g, ex + 10, ey, 40, BLUE); circle(g, ex + 10, ey, 16, S().ui.bpBg); g.restore();
  const path = (u) => [lerp(ex + 130, bx - 200, u), ey + Math.sin(u * Math.PI * 2) * 60 * (1 - u) - u * 20];
  g.strokeStyle = alpha(bp(), 0.6); g.lineWidth = 5; g.beginPath(); for (let i = 0; i <= 50; i++) { const [px, py] = path(i / 50); i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke();
  const p = (t * 0.6) % 1, [px, py] = path(p); glow(g, px, py, 60, gold(), 0.9); circle(g, px, py, 12, '#fff');
  g.save(); g.strokeStyle = mix(gold(), '#fff', 0.2); g.lineWidth = 5; g.beginPath(); for (let i = 0; i <= 60; i++) { const a = (i / 60) * Math.PI * 2, r = 150 * (1 + 0.06 * Math.sin(a * 9)); i ? g.lineTo(bx + Math.cos(a) * r * 1.2, by + Math.sin(a) * r * 0.8) : g.moveTo(bx + Math.cos(a) * r * 1.2, by + Math.sin(a) * r * 0.8); } g.closePath(); g.stroke(); g.restore();
  glow(g, bx, by, 240, gold(), 0.15 + 0.2 * (p > 0.9 ? 1 : 0));
  text(g, 'PROCESSING', bx, by + 220, { size: 34, color: cream(), font: FONTS.ui, weight: 900, spacing: 3 });
  rr(g, bx - 150, by + 260, 300, 18, 9); g.fillStyle = alpha(bp(), 0.25); g.fill(); rr(g, bx - 150, by + 260, 300 * p, 18, 9); g.fillStyle = gold(); g.fill();
  end();
} });

// s109 / s110 — "To hide that delay, your brain quietly predicts where moving things are about to be."
function ballLane(g, t, info, predict) {
  const end = board(g, t, info), y = E.H * 0.5, u = ((t * 0.3) % 1), x = lerp(E.W * 0.12, E.W * 0.88, u), lagX = x - 150, aheadX = x + 150;
  seg(g, [[E.W * 0.08, y + 60], [E.W * 0.92, y + 60]], 3, alpha(bp(), 0.4));
  circle(g, x, y, 40, cream()); text(g, 'REAL', x, y - 80, { size: 26, color: cream(), font: FONTS.ui, weight: 900 });
  if (!predict) { g.save(); g.globalAlpha = 0.55; circle(g, lagX, y, 40, gold()); g.restore(); text(g, 'WHAT YOU SEE', lagX, y + 110, { size: 26, color: gold(), font: FONTS.ui, weight: 900 }); UI.dimension(g, t, { x1: lagX, y1: y - 150, x2: x, y2: y - 150, str: '0.1 s', start: 0.2 }); }
  else { const k = ease.out(prog(t, 0.6, 1.4)); g.setLineDash([12, 10]); ring(g, lerp(lagX, aheadX, k), y, 40, 5, gold()); g.setLineDash([]); glow(g, lerp(lagX, aheadX, k), y, 120, gold(), 0.35); text(g, 'PREDICTED', lerp(lagX, aheadX, k), y + 110, { size: 28, color: gold(), font: FONTS.ui, weight: 900, alpha: k }); }
  end();
}
registerShot('s109', { draw(g, t, info) { ballLane(g, t, info, false); } });
registerShot('s110', { draw(g, t, info) { ballLane(g, t + 1.28, info, true); chip(g, 'YOUR BRAIN PREDICTS', E.W / 2, E.H * 0.86, { size: 30, color: gold(), k: prog(t, 0.3, 0.7) }); } });

// s111 — "A fastball reaches the batter in about four tenths of a second."  night ballpark, you at bat
registerShot('s111', { draw(g, t, info) {
  const M = mood('night'), k = t / info.dur, cam = { z: 1.15 + 0.05 * k, x: 0, y: 40 }, GY = E.H * 0.78;
  layer(g, cam, 0.2, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, GY, M.sky); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 2); FX.crowd(g, t, { x: -E.W, y: GY - 360, w: E.W * 3, rows: 10, rowH: 26, colors: ['#2a2a48', '#3a3458', '#4a3a5a'], seed: 41 }); for (const fx of [E.W * 0.1, E.W * 0.9]) { glow(g, fx, GY - 700, 380, '#e8f0ff', 0.5); seg(g, [[fx, GY - 380], [fx, GY - 680]], 12, '#0c0e1a'); } });
  layer(g, cam, 0.8, (g) => { g.fillStyle = linGrad(g, 0, GY - 20, 0, E.H * 1.5, [shade(M.grass, -0.15), shade(M.grass, -0.45)]); g.fillRect(-E.W, GY - 20, E.W * 3, E.H); g.fillStyle = '#5a3e30'; g.beginPath(); g.ellipse(E.W * 0.22, GY + 10, 220, 40, 0, 0, Math.PI * 2); g.fill(); g.beginPath(); g.ellipse(E.W * 0.8, GY + 20, 240, 50, 0, 0, Math.PI * 2); g.fill(); FX.pool(g, E.W / 2, GY + 30, 800, 80, '#e8f0ff', 0.1); });
  const rim = { color: '#dfe8ff', dir: [0, -1] }, throwT = 0.5, flight = prog(t, throwT, throwT + 0.4);
  layer(g, cam, 1, (g) => {
    drawFigure(g, { x: E.W * 0.22, y: GY, s: 1.25, facing: 1, outfit: PITCHER, pose: posesAt(t, [[0, POSES.ready], [throwT - 0.2, { ...POSES.point, hF: [-50, -220], eF: [-20, -200] }], [throwT, POSES.point]], 0.18), expr: 'determined', rim });
    drawFigure(g, { x: E.W * 0.8, y: GY, s: 1.3, facing: -1, outfit: YOU, pose: { ...POSES.ready, hF: [10, -200], hB: [4, -196] }, expr: 'determined', rim });
    seg(g, [[E.W * 0.8 - 14, GY - 262], [E.W * 0.8 + 70, GY - 360]], 12, '#c9a26a');
    if (flight > 0 && flight < 1) { const bx = lerp(E.W * 0.27, E.W * 0.76, flight), by = GY - 230 - Math.sin(flight * Math.PI) * 20; for (let i = 0; i < 6; i++) circle(g, bx - i * 26, by, 13 - i, alpha('#ffffff', 1 - i * 0.16)); }
  });
  const tt = at('four', 241) - info.shot.start; UI.readout(g, { label: 'MOUND → PLATE', value: '0.4 s', x: E.W / 2, y: 220, align: 'center', size: 80, a: prog(t, tt, tt + 0.3) });
} });

// s112 / s113 — "Batters don't swing at where the ball is. They swing at where their brain predicts it will be."
function swing(g, t, info, hit) {
  const end = board(g, t, info), y = E.H * 0.52, bx = E.W * 0.7, u = clamp(t / 2.0), ballX = lerp(E.W * 0.1, E.W * 0.6, u), predX = bx;
  UI.lineFigure(g, { x: E.W * 0.82, y: E.H * 0.82, s: 1.5, pose: { ...POSES.ready, hF: [10, -200], hB: [4, -196] }, color: '#e8f0ff', facing: -1 });
  const sw = hit ? ease.out(prog(t, 0.9, 1.3)) : 0.3, ang = lerp(-2.2, -0.2, sw);
  seg(g, [[E.W * 0.8, E.H * 0.82 - 300], [E.W * 0.8 + Math.cos(ang + Math.PI) * 240, E.H * 0.82 - 300 + Math.sin(ang + Math.PI) * 240]], 12, gold());
  circle(g, ballX, y, 26, cream()); text(g, 'WHERE IT IS', ballX, y + 70, { size: 26, color: cream(), font: FONTS.ui, weight: 900 });
  g.setLineDash([12, 10]); ring(g, predX, y, 26, 5, gold()); g.setLineDash([]); text(g, 'WHERE IT WILL BE', predX, y - 70, { size: 26, color: gold(), font: FONTS.ui, weight: 900, alpha: hit ? 1 : 0.5 });
  if (hit && t > 1.3) { glow(g, predX, y, 260, gold(), 0.6 * (1 - prog(t, 1.3, 2.2))); FX.rings(g, predX, y, t - 1.3, { count: 2, r0: 30, r1: 220, color: gold(), a: 0.6 }); }
  end();
}
registerShot('s112', { draw(g, t, info) { swing(g, t, info, false); } });
registerShot('s113', { draw(g, t, info) { swing(g, t, info, true); } });

// s114 — "So in a tiny way, you already live a little bit in the future."  a tiny cyan ghost 0.1 s ahead
registerShot('s114', { draw(g, t, info) {
  const end = board(g, t, info), x = E.W * 0.35 + t * 60, y = E.H * 0.78;
  seg(g, [[E.W * 0.08, y], [E.W * 0.92, y]], 3, alpha(bp(), 0.4));
  UI.lineFigure(g, { x, y, s: 1.6, pose: walkPose(t * 5.5), color: '#e8f0ff' });
  ghost(g, (gg) => UI.lineFigure(gg, { x: x + 24, y, s: 1.6, pose: walkPose(t * 5.5 + 0.5), color: '#fff' }), { t, a: 0.65 });
  const tt = 1.6; chip(g, '+0.1 s', x + 30, y - 470, { size: 36, color: BLUE, k: prog(t, tt, tt + 0.3), line: alpha(BLUE, 0.6) });
  end();
} });

// s115 — "You'd just be living there a hundred times further ahead."  the ghost slides out to +10 s, x100
registerShot('s115', { draw(g, t, info) {
  const end = board(g, t, info, 1.05, 0.95), x = E.W * 0.22 + t * 40, y = E.H * 0.78, th = at('hundred', 253) - info.shot.start, far = ease.inOut(prog(t, th - 0.5, th + 0.6));
  seg(g, [[E.W * 0.05, y], [E.W * 0.95, y]], 3, alpha(bp(), 0.4));
  UI.lineFigure(g, { x, y, s: 1.4, pose: walkPose(t * 5.5), color: '#e8f0ff' });
  const gx = x + lerp(22, E.W * 0.55, far);
  ghost(g, (gg) => UI.lineFigure(gg, { x: gx, y, s: 1.4, pose: walkPose(t * 5.5 + 0.5), color: '#fff' }), { t, a: 0.7 });
  UI.dimension(g, t, { x1: x, y1: y + 70, x2: gx, y2: y + 70, str: far > 0.9 ? '+10 s' : '+0.1 s', start: 0, color: BLUE });
  const a = ease.outBack(prog(t, th + 0.2, th + 0.6)); if (a > 0) { g.save(); g.translate(E.W / 2, E.H * 0.3); g.scale(a, a); text(g, '×100', 0, 0, { size: 170, color: gold(), font: FONTS.ui, weight: 900, glow: 30, glowColor: alpha(gold(), 0.6) }); g.restore(); }
  end();
} });
