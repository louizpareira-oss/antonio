// shots/09_mountain.js — the price: tomorrow you'll be twice as strong again, so you hand Lily back and walk to the mountain.
// A steel room you can't break (yet); Sunday visits through thick glass.
import { E, V, S, registerShot, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS, shake, rng } from '/engine/core.js';
import { drawFigure, POSES, breathe, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { mountain, steelRoom, rubble, visitRoom, glassWall } from '../sets/atlas.js';
import { YOU, DAD, MOM, LILY_PINK } from '../cast.js';
import { hand, chip, dayBadge, wt, GOLD, CORAL, fmt, baby } from '../lib.js';

const WARM = '#ffd8a8', COLD = '#d8ecff';
const HOLD = { ...POSES.holdFront, hF: [34, -150], eF: [22, -132], hB: [26, -146], eB: [14, -128] };
const GIVE = { ...POSES.holdFront, hF: [62, -150], eF: [34, -140], hB: [56, -146], eB: [28, -136] };

function flipNum(g, a, b, x, y, p, o = {}) {
  const sz = o.size || 190, col = o.color || '#ffffff', q = clamp(p), str = q < 0.5 ? a : b, sy = q < 0.5 ? 1 - q * 2 : q * 2 - 1;
  g.save(); g.translate(x, y); g.scale(1, Math.max(0.02, sy)); text(g, str, 0, 0, { size: sz, color: col, font: FONTS.ui, weight: 900, stroke: sz * 0.06, strokeColor: 'rgba(40,20,30,.85)', glow: 30, glowColor: alpha(o.glow || CORAL(), 0.7) }); g.restore();
}
// an open hand pressed flat against glass, fingers up; x,y = palm centre
function flatHand(g, x, y, s, o = {}) {
  const ink = o.ink || S().ink, rim = o.rim || WARM;
  g.save(); g.translate(x, y); g.scale(s, s); if (o.sleeve) seg(g, [[0, 120], [o.sleeveTo || 60, 700]], 230, o.sleeve);
  for (const [w, c] of [[12, alpha(rim, 0.9)], [0, ink]]) { rr(g, -95 - w / 2, -90 - w / 2, 190 + w, 210 + w, 70); g.fillStyle = c; g.fill();
    [[-68, 150], [-24, 175], [22, 165], [64, 132]].forEach(([fx, L]) => seg(g, [[fx, -60], [fx * 1.08, -60 - L]], 42 + w, c)); seg(g, [[-80, 40], [-170, -40]], 46 + w, c); }
  g.restore();
}

// s141 — "But tomorrow, you'll be twice as strong."  your open hands glowing; ×8,192 flips to ×16,384
registerShot('s141', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => rubble(g, t, { z: 1.4, x: 200, y: -100 }, { dawn: true })); veil(g, 'rgba(30,20,40,.15)');
  const pulse = 0.5 + 0.5 * Math.sin(t * 5), f = wt('twice', info, t, 1.8);
  for (const sx of [-1, 1]) { const x = E.W * (0.5 + sx * 0.17), y = E.H * 0.7; glow(g, x, y - 40, 300, CORAL(), (0.25 + 0.25 * pulse) * (t > f ? 1.4 : 1));
    hand(g, x, y, 1.5, { from: [E.W * 0.5 + sx * 120, E.H + 340], sleeve: YOU.color, open: 1, rim: { color: WARM, dir: [0, -1] } }); }
  flipNum(g, '×8,192', '×16,384', E.W * 0.5, E.H * 0.3, prog(t, f - 0.1, f + 0.3), { size: 180 });
  text(g, t < f ? 'TODAY' : 'TOMORROW', E.W * 0.5, E.H * 0.14, { size: 50, color: '#ffffff', font: FONTS.ui, weight: 900, spacing: 6, stroke: 7, strokeColor: 'rgba(40,20,30,.8)' });
} });

// s142 — "And the day after that, twice again."  DATA: the doubling curve shoots off the chart, ×32,768
registerShot('s142', { draw(g, t, info) {
  UI.blueprint(g); glow(g, E.W * 0.5, E.H * 0.5, 900, '#3a5a9a', 0.35); const ui = S().ui, x0 = E.W * 0.16, y0 = E.H * 0.84, W = E.W * 0.7, H = E.H * 0.62;
  seg(g, [[x0, y0], [x0 + W, y0]], 4, alpha(ui.blueprint, 0.8)); seg(g, [[x0, y0], [x0, y0 - H]], 4, alpha(ui.blueprint, 0.8));
  text(g, 'DAYS', x0 + W, y0 + 40, { size: 30, color: ui.blueprint, font: FONTS.ui, weight: 900, align: 'right', spacing: 3 });
  const p = ease.inOut(prog(t, 0, 2.6)), n = 60; g.strokeStyle = CORAL(); g.lineWidth = 9; g.lineCap = 'round'; g.beginPath();
  let lx = x0, ly = y0; for (let i = 0; i <= n * p; i++) { const d = i / n, v = (Math.pow(2, d * 12) - 1) / (Math.pow(2, 10) - 1); lx = x0 + d * W; ly = y0 - v * H; g.lineTo(lx, ly); } g.stroke();
  glow(g, lx, Math.max(ly, -40), 120, CORAL(), 0.7); circle(g, lx, Math.max(ly, 20), 14, '#ffffff');
  const f = wt('twice', info, t, 1.8); flipNum(g, '×16,384', '×32,768', E.W * 0.36, E.H * 0.3, prog(t, f - 0.1, f + 0.3), { size: 130 });
} });

// s143 — "So you give Lily back to your mom."  MEDIUM, dawn: you pass Lily to mom, gently
registerShot('s143', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.75 + 0.04 * k, x: -180, y: 200 }, R = rubble(g, t, cam, { dawn: true });
  layer(g, cam, 1, (g) => { const yx = R.CX - 40, mx = R.CX - 330, s = 1.4, p = ease.inOut(prog(t, 0.3, 1.7));
    drawFigure(g, { x: yx, y: R.GY + 60, s, facing: -1, outfit: YOU, pose: p < 1 ? GIVE : breathe(POSES.stand, t), expr: 'sad', look: [-1, 0.5], rim: { color: WARM, dir: [0.6, -0.6] } });
    drawFigure(g, { x: mx, y: R.GY + 60, s: 1.35, facing: 1, outfit: MOM, pose: p > 0.5 ? HOLD : GIVE, expr: 'cry', look: [1, 0.3], rim: { color: WARM, dir: [-0.6, -0.6] } });
    const bx = lerp(yx - s * 62, mx + 1.35 * 30, p), by = R.GY + 60 - s * 150; baby(g, bx, by, 0.42, { expr: 'sleep', rot: lerp(0.3, -0.3, p) }); });
} });

// s144 — "And you walk back to the mountain."  WIDE, dawn: you walk alone up the road to the tunnel
registerShot('s144', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.0 + 0.04 * k, x: -60, y: 0 }, { GY, TX } = mountain(g, t, cam, { dawn: true });
  layer(g, cam, 1, (g) => { const x = lerp(TX - 900, TX - 720, k); g.fillStyle = 'rgba(20,10,30,.35)'; g.beginPath(); g.ellipse(x - 110, GY + 72, 140, 12, 0, 0, Math.PI * 2); g.fill();
    drawFigure(g, { x, y: GY + 70, s: 0.85, facing: 1, outfit: YOU, pose: walkPose(t * 4.2), expr: 'sad', rim: { color: '#ffe2b0', dir: [-0.8, -0.4], w: 4 } }); });
} });

// s145 — "You live in a steel room you can't break."  STEEL ROOM: you sit alone on a steel bed
registerShot('s145', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.35 + 0.05 * k, x: -420, y: 120 }, R = steelRoom(g, t, cam, { bed: true, table: false });
  layer(g, cam, 1, (g) => drawFigure(g, { x: R.CX - 600, y: R.GY + 12, s: 1.5, facing: 1, outfit: YOU, pose: { ...POSES.sit, hF: [40, -86], hB: [34, -84], head: [8, -176] }, expr: 'sad', look: [0.4, 0.8], rim: { color: COLD, dir: [0.4, -1], w: 5 }, blink: (t % 3) > 2.85 }));
  dayBadge(g, { day: 14, k: 1 });
} });

// s146 — "Yet."  INSERT: a hairline crack creeps across the steel wall
registerShot('s146', { draw(g, t, info) {
  const k = t / info.dur, z = 1 + 0.08 * k; g.save(); g.translate(E.W / 2, E.H / 2); g.scale(z, z); g.translate(-E.W / 2, -E.H / 2);
  g.fillStyle = linGrad(g, 0, 0, E.W, E.H, ['#a8b0bc', '#7a828e']); g.fillRect(-100, -100, E.W + 200, E.H + 200);
  for (const x of [E.W * 0.12, E.W * 0.62]) { seg(g, [[x, -100], [x, E.H + 100]], 6, 'rgba(30,34,44,.4)'); for (let y = 80; y < E.H; y += 200) { circle(g, x + 30, y, 12, 'rgba(30,34,44,.45)'); circle(g, x + 26, y - 4, 10, 'rgba(255,255,255,.3)'); circle(g, x - 30, y, 12, 'rgba(30,34,44,.45)'); } }
  glow(g, E.W * 0.4, E.H * 0.2, 700, COLD, 0.3);
  const p = ease.out(prog(t, 0.05, 1.2)), r = rng(12), pts = []; let x = E.W * 0.05, y = E.H * 0.42; for (let i = 0; i < 28; i++) { pts.push([x, y]); x += E.W * 0.033; y += (r() - 0.5) * 60; }
  const m = Math.max(2, Math.ceil(pts.length * p)); seg(g, pts.slice(0, m), 9, 'rgba(255,255,255,.35)'); seg(g, pts.slice(0, m), 5, '#14161e');
  for (let i = 4; i < m; i += 6) { const [bx, by] = pts[i]; seg(g, [[bx, by], [bx + 40, by + (i % 12 ? 50 : -50)]], 3, '#14161e'); }
  const [tx, ty] = pts[m - 1]; FX.sparkle(g, tx, ty, 26, '#ffffff', 0.9); g.restore();
} });

// s147 — "Your family visits every Sunday."  VISIT ROOM: mom, dad and Lily behind thick glass
registerShot('s147', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.15 + 0.04 * k, x: 0, y: 40 }, R = visitRoom(g, t, cam);
  layer(g, cam, 1, (g) => { drawFigure(g, { x: R.GL - 380, y: R.GY, s: 1.35, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t), expr: 'smile', look: [1, 0], rim: { color: WARM, dir: [1, -0.4] } });
    drawFigure(g, { x: R.GL + 330, y: R.GY, s: 1.3, facing: -1, outfit: MOM, pose: breathe(HOLD, t), expr: 'smile', look: [-1, 0.2], rim: { color: WARM, dir: [-1, -0.4] } }); baby(g, R.GL + 330 - 1.3 * 30, R.GY - 1.3 * 156, 0.42, { expr: 'giggle', rot: 0.3 });
    drawFigure(g, { x: R.GL + 600, y: R.GY, s: 1.4, facing: -1, outfit: DAD, pose: breathe(POSES.wave, t), expr: 'happy', rim: { color: WARM, dir: [-1, -0.4] } }); });
  glassWall(g, cam, R.GL, R.GY);
} });

// s148 — "You wave through the glass."  CLOSE: your big palm on the glass, Lily's tiny palm on the other side
registerShot('s148', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 14, (g) => visitRoom(g, t, { z: 1.5, x: 300, y: -60 })); glow(g, E.W * 0.55, E.H * 0.45, 700, '#fff2d8', 0.3);
  const lp = ease.out(prog(t, 0.6, 1.3)); flatHand(g, E.W * 0.61, lerp(E.H * 0.8, E.H * 0.5, lp), 0.36, { sleeve: LILY_PINK, sleeveTo: -80 });
  g.fillStyle = alpha('#cfe8ff', 0.2); g.fillRect(0, 0, E.W, E.H);
  g.save(); g.globalCompositeOperation = 'lighter'; for (const [x, w] of [[E.W * 0.15, 90], [E.W * 0.22, 30], [E.W * 0.8, 60]]) { g.fillStyle = alpha('#ffffff', 0.1); g.beginPath(); g.moveTo(x, 0); g.lineTo(x + w, 0); g.lineTo(x + w - 300, E.H); g.lineTo(x - 300, E.H); g.fill(); } g.restore();
  flatHand(g, E.W * 0.4, E.H * 0.5, 1.15 + 0.02 * k, { sleeve: YOU.color, sleeveTo: -40 });
} });
