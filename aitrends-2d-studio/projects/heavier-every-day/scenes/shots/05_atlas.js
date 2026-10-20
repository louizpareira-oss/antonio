// shots/05_atlas.js — Dr. Voss and Project Atlas: the forecast (rock, the 1 m pull, more than the planet), her line, the
// one rocket and its 100 t limit, launch tomorrow before midnight, never coming back; one day left; the photo; dawn, day 10.
import { E, V, S, registerShot, layer, blurLayer, veil, ease, prog, clamp, lerp, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, radGrad, text, FONTS, shake, rng, talkAmount } from '/engine/core.js';
import { drawFigure, POSES, breathe, walkPose, bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { garage } from '/projects/stronger-couldnt-stop/scenes/sets/hospital.js';
import { atlasLogo } from '/projects/stronger-couldnt-stop/scenes/lib.js';
import { lake, river } from '../sets/world.js';
import { ladder } from '../ladder.js';
import { YOU, VOSS, GRANDPA, KIDYOU, ATLAS } from '../cast.js';
import { heroFace, chip, impact, debris, cracks, wt, GOLD, CORAL, fmt, kg, wStr, weightBadge, midnightClock, grandpa, FLOORSIT, checkMark, crossMark, bp, label, arrow, BP, CREAM, card, uiText, UIS, UIT } from '../lib.js';

const COLD = '#9fe0ff', LAMP = '#ffcf8a', WARM = '#ffd8a8', SUNL = '#fff2c8';
// the garage seen from inside, facing the big door; open 0..1 raises it onto floodlights and a van. Returns { GY, CX, DY, DW }
function garageDoor(g, t, cam, open) {
  const GY = E.H * 0.8, CX = E.W / 2, DW = 1000, DH = 600, DX = CX - DW / 2, DY = GY - DH;
  layer(g, cam, 0.5, (g) => { g.fillStyle = linGrad(g, 0, DY - 300, 0, GY, ['#0e1430', '#24305e']); g.fillRect(DX - 400, DY - 400, DW + 800, DH + 500);
    rr(g, CX + 120, GY - 260, 420, 220, 20); g.fillStyle = '#1a2030'; g.fill(); rr(g, CX + 140, GY - 240, 120, 80, 8); g.fillStyle = alpha(COLD, 0.35); g.fill(); g.fillStyle = '#10141e'; g.fillRect(CX - 900, GY - 30, 1800, 40);
    for (const fx of [CX - 300, CX + 360]) { seg(g, [[fx, GY], [fx, GY - 420]], 10, '#1a1e2c'); glow(g, fx, GY - 430, 320, '#ffffff', 0.55 * open); circle(g, fx, GY - 430, 24, mix('#4a5068', '#ffffff', open)); } });
  layer(g, cam, 0.62, (g) => { g.fillStyle = '#5a4e46'; g.fillRect(-E.W, -E.H, E.W * 3, DY + E.H); g.fillRect(-E.W, DY, DX + E.W, GY - DY + 10); g.fillRect(DX + DW, DY, E.W * 2, GY - DY + 10);
    g.fillStyle = '#3a322c'; g.fillRect(DX - 30, DY - 30, DW + 60, 30); g.fillRect(DX - 30, DY, 30, DH); g.fillRect(DX + DW, DY, 30, DH);
    const bot = GY - DH * open; if (bot > DY) { g.fillStyle = '#8a8e98'; g.fillRect(DX, DY, DW, bot - DY); g.fillStyle = 'rgba(0,0,0,.2)'; for (let y = DY + 60; y < bot; y += 70) g.fillRect(DX, y, DW, 6); g.fillStyle = '#6a6e78'; g.fillRect(DX, bot - 14, DW, 14); }
    if (open > 0) { g.save(); g.globalCompositeOperation = 'lighter'; FX.lightCone(g, CX, DY + 40, { angle: Math.PI / 2, spread: 0.9, len: 900, color: '#dff4ff', a: 0.18 * open }); g.restore(); } });
  layer(g, cam, 1, (g) => { g.fillStyle = linGrad(g, 0, GY, 0, E.H * 1.4, ['#6a6460', '#3a3634']); g.fillRect(-E.W, GY, E.W * 3, E.H); g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = alpha('#dff4ff', 0.25 * open); poly(g, [[DX, GY], [DX + DW, GY], [DX + DW + 500, E.H * 1.3], [DX - 500, E.H * 1.3]]); g.restore(); });
  return { GY, CX, DY, DW };
}
// the photo of little you and Grandpa on the dock (centre cx, cy, width pw)
function lakePhoto(g, cx, cy, pw, rot = 0) {
  const ph = pw * 9 / 16; g.save(); g.translate(cx, cy); g.rotate(rot); rr(g, -pw / 2 - 22, -ph / 2 - 22, pw + 44, ph + 90, 6); g.fillStyle = '#f4ede0'; g.fill();
  g.save(); g.beginPath(); g.rect(-pw / 2, -ph / 2, pw, ph); g.clip(); g.translate(-pw / 2, -ph / 2); g.scale(pw / E.W, pw / E.W);
  const cam = { z: 2.2, x: -233, y: 20 }, L = lake(g, 0, cam, { noChair: true });
  layer(g, cam, 0.9, (g) => { const y = L.DOCK[2] - 22; grandpa(g, { x: 700, y, s: 1.5, facing: 1, outfit: GRANDPA, pose: POSES.stand, expr: 'happy', rim: { color: SUNL, dir: [0.6, -0.6] } }); drawFigure(g, { x: 800, y, s: 1.5, facing: -1, outfit: KIDYOU, pose: POSES.cheer, expr: 'joy', rim: { color: SUNL, dir: [0.6, -0.6] } }); });
  veil(g, '#ffe0b0', 0.18); g.restore(); rr(g, -60, -ph / 2 - 40, 120, 40, 4); g.fillStyle = alpha('#f2e6b0', 0.85); g.fill(); g.restore();
}
// ground cross-section: grass, soil, rock; SY = surface y. Returns SY
function groundCut(g, t, cam, o = {}) {
  const SY = o.SY ?? E.H * 0.45;
  layer(g, cam, 0.2, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, SY, ['#6a8ac8', '#cfe0f0']); g.fillRect(-E.W, -E.H, E.W * 3, SY + E.H); for (let i = 0; i < 9; i++) FX.tree(g, -200 + i * 300, SY - 6, 0.9, '#4a7a4a'); });
  layer(g, cam, 1, (g) => { g.fillStyle = '#6aa04a'; g.fillRect(-E.W, SY - 14, E.W * 3, 24); g.fillStyle = linGrad(g, 0, SY, 0, SY + 200, ['#8a6040', '#6a4a30']); g.fillRect(-E.W, SY + 10, E.W * 3, 200);
    g.fillStyle = linGrad(g, 0, SY + 200, 0, E.H * 1.5, ['#8a8a96', '#5a5a66']); g.fillRect(-E.W, SY + 200, E.W * 3, E.H * 2); const r = rng(5); for (let i = 0; i < 9; i++) { g.strokeStyle = alpha('#3a3a46', 0.4); g.lineWidth = 3; g.beginPath(); const y = SY + 240 + i * 60; g.moveTo(-E.W, y + r() * 20); for (let x = -E.W; x < E.W * 2; x += 200) g.lineTo(x, y + r() * 30); g.stroke(); }
    for (let i = 0; i < 30; i++) circle(g, r() * E.W * 1.4 - 100, SY + 40 + r() * 140, 6 + r() * 10, alpha('#5a3a24', 0.7));
    if (o.labels !== false) { text(g, 'SOIL', E.W * 0.86, SY + 110, { size: 36, color: alpha('#ffffff', 0.8), font: FONTS.ui, weight: 900, spacing: 6 }); text(g, 'SOLID ROCK', E.W * 0.86, SY + 330, { size: 36, color: alpha('#ffffff', 0.8), font: FONTS.ui, weight: 900, spacing: 6 }); } });
  return SY;
}
// horizontal payload meter: 0..160 t, red line at 100 t; v = value (t), k = fill progress
function payload(g, t, v, k, o = {}) {
  bp(g); const x0 = E.W * 0.12, x1 = E.W * 0.88, y = E.H * 0.56, h = 110, X = (u) => lerp(x0, x1, u / 160), over = v > 100, cur = v * ease.out(clamp(k)), [sx, sy] = shake(t, over && cur > 100 ? 8 : 0, 30);
  g.save(); g.translate(sx, sy); rr(g, x0, y - h / 2, x1 - x0, h, 20); g.fillStyle = 'rgba(10,16,34,.75)'; g.fill(); g.strokeStyle = alpha(BP(), 0.6); g.lineWidth = 4; g.stroke();
  const col = over && cur > 100 ? CORAL() : '#5fd38a'; rr(g, x0 + 8, y - h / 2 + 8, Math.max(0, X(cur) - x0 - 16), h - 16, 14); g.fillStyle = col; g.fill(); glow(g, X(cur), y, 200, col, 0.4);
  for (let u = 0; u <= 160; u += 20) { seg(g, [[X(u), y + h / 2 + 10], [X(u), y + h / 2 + 30]], 3, alpha(BP(), 0.7)); label(g, `${u}`, X(u), y + h / 2 + 60, { size: 28, color: alpha(CREAM(), 0.7), spacing: 0 }); }
  seg(g, [[X(100), y - h], [X(100), y + h]], 8, '#ff5a4a'); label(g, 'MAX 100 t', X(100), y - h - 30, { size: 40, color: '#ff8a7a' });
  if (o.str) label(g, o.str, x0, y - h - 120, { size: 64, align: 'left', a: ease.out(prog(t, 0.2, 0.5)) });
  if (k > 0.05) label(g, `${Math.round(cur)} t`, X(cur), y + 8, { size: 56, color: '#ffffff' });
  atlasLogo(g, E.W * 0.86, E.H * 0.2, 1.2, ATLAS); g.restore();
  if (o.mark === 'ok') checkMark(g, E.W * 0.5, E.H * 0.86, 2.2, '#5fd38a', prog(t, 1.4, 1.8)); if (o.mark === 'no') crossMark(g, E.W * 0.5, E.H * 0.86, 2.2, CORAL(), prog(t, 1.6, 2.0));
}

// s082 — "That night, a woman in a white coat walks into your garage."  the door rises on floodlights; Voss walks in
registerShot('s082', { draw(g, t, info) {
  const k = t / info.dur, open = ease.inOut(prog(t, 0.3, 2.0)), cam = { z: 1.05 + 0.08 * k, x: 0, y: 40 }, R = garageDoor(g, t, cam, open), w = ease.out(prog(t, 1.7, 4.6));
  layer(g, cam, 0.62, (g) => { if (t > 1.5) drawFigure(g, { x: R.CX + 80 - 60 * w, y: R.GY + 40 * w, s: 1.35 + 0.25 * w, facing: -1, outfit: VOSS, pose: w < 1 ? walkPose(t * 5) : POSES.stand, expr: 'neutral', look: [-1, 0.2], rim: { color: '#ffffff', dir: [0.2, -1], w: 6 } }); });
  layer(g, cam, 1, (g) => { rr(g, R.CX - 900, R.GY + 150, 560, 50, 14); g.fillStyle = '#5a7ac8'; g.fill(); drawFigure(g, { x: R.CX - 720, y: R.GY + 160, s: 1.6, facing: 1, outfit: YOU, pose: breathe(FLOORSIT, t), expr: open > 0.3 ? 'surprised' : 'sad', look: [1, -0.2], rim: { color: '#dff4ff', dir: [1, -0.2] } }); });
  weightBadge(g, { day: 9, k: 1 });
} });
// s083 — "Her badge says Project Atlas."  INSERT: the ID badge on its lanyard
registerShot('s083', { draw(g, t, info) {
  blurLayer(g, 14, (g) => garageDoor(g, t, { z: 1.5, x: 0, y: -40 }, 1)); veil(g, '#0e1430', 0.15);
  const s = 1.15 + 0.05 * t / info.dur; g.save(); g.translate(E.W / 2, E.H / 2); g.scale(s, s); g.translate(-E.W / 2, -E.H / 2);
  for (const lx of [E.W * 0.42, E.W * 0.58]) seg(g, [[lx, -100], [E.W * 0.5 + (lx - E.W / 2) * 0.2, E.H * 0.24]], 26, ATLAS);
  g.save(); g.translate(E.W * 0.5, E.H * 0.26); g.rotate(0.05 * Math.sin(t * 2.2)); rr(g, -30, -20, 60, 50, 8); g.fillStyle = '#9aa0aa'; g.fill();
  rr(g, -320, 30, 640, 400, 26); g.fillStyle = '#ffffff'; g.fill(); g.save(); rr(g, -320, 30, 640, 400, 26); g.clip(); g.fillStyle = ATLAS; g.fillRect(-320, 30, 640, 120); g.restore();
  atlasLogo(g, -230, 90, 0.9, '#ffffff'); text(g, 'PROJECT ATLAS', 40, 92, { size: 56, color: '#ffffff', font: FONTS.ui, weight: 900, spacing: 2 });
  rr(g, -280, 180, 170, 210, 12); g.fillStyle = '#cfe6ea'; g.fill(); bigFace(g, -195, 270, 62, { outfit: VOSS, expr: 'neutral', rimColor: '#ffffff' });
  text(g, 'DR. E. VOSS', -80, 220, { size: 44, color: '#1e2a36', font: FONTS.ui, weight: 900, align: 'left' }); text(g, 'DIRECTOR · LEVEL 5', -80, 272, { size: 28, color: '#5a6a7a', font: FONTS.ui, weight: 900, align: 'left', spacing: 1 });
  g.fillStyle = '#1e2a36'; for (let i = 0; i < 26; i++) g.fillRect(-80 + i * 13, 320, i % 3 ? 5 : 9, 60);
  g.save(); g.globalCompositeOperation = 'lighter'; const sx = lerp(-700, 700, prog(t, 0.4, 2.2)); rr(g, -320, 30, 640, 400, 26); g.clip(); g.fillStyle = linGrad(g, sx - 120, 0, sx + 120, 0, [alpha('#ffffff', 0), alpha('#ffffff', 0.35), alpha('#ffffff', 0)]); g.fillRect(-320, 30, 640, 400); g.restore();
  g.restore(); g.restore();
} });
// s084 — "She shows you what happens next."  ATLAS TABLET: the forecast, weight by day (log scale)
registerShot('s084', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 14, (g) => garageDoor(g, t, { z: 1.3, x: 0, y: 0 }, 1)); veil(g, '#0e1430', 0.25);
  const s = 1 + 0.04 * k, x = E.W * 0.17, y = E.H * 0.12, w = E.W * 0.66, h = E.H * 0.76; g.save(); g.translate(E.W / 2, E.H / 2); g.scale(s, s); g.translate(-E.W / 2, -E.H / 2);
  rr(g, x - 26, y - 26, w + 52, h + 52, 44); g.fillStyle = '#14161e'; g.fill(); rr(g, x, y, w, h, 24); g.fillStyle = linGrad(g, 0, y, 0, y + h, ['#1e3458', '#14243e']); g.fill(); glow(g, x + w / 2, y + h / 2, 700, ATLAS, 0.12);
  atlasLogo(g, x + 60, y + 58, 0.7, ATLAS); uiText(g, 'FORECAST · SUBJECT: YOU', x + 110, y + 58, 34, { color: '#ffffff', weight: 900, spacing: 2 }); uiText(g, 'WEIGHT BY DAY', x + w - 300, y + 58, 26, { color: ATLAS, weight: 900 });
  const cx0 = x + 120, cx1 = x + w - 60, cy0 = y + h - 90, cy1 = y + 140, X = (d) => lerp(cx0, cx1, d / 80), Y = (d) => lerp(cy0, cy1, (Math.log10(kg(d)) - 2) / 23.5);
  seg(g, [[cx0, cy1], [cx0, cy0], [cx1, cy0]], 3, alpha('#ffffff', 0.5)); for (const d of [0, 20, 40, 60, 80]) uiText(g, `${d}`, X(d) - 10, cy0 + 36, 22, { color: alpha('#ffffff', 0.6) }); uiText(g, 'DAY', cx1 - 50, cy0 + 70, 22, { color: alpha('#ffffff', 0.6) });
  const p = ease.inOut(prog(t, 0.1, 1.9)); g.strokeStyle = CORAL(); g.lineWidth = 7; g.beginPath(); for (let d = 0; d <= 80 * p; d += 1) d ? g.lineTo(X(d), Y(d)) : g.moveTo(X(d), Y(d)); g.stroke();
  for (const [d, str] of [[14, 'ROCK GIVES WAY'], [31, 'PULLS LIKE A PLANET'], [77, 'HEAVIER THAN EARTH']]) { const a = prog(t, 0.1 + 1.8 * d / 80, 0.3 + 1.8 * d / 80); if (a <= 0) continue; circle(g, X(d), Y(d), 14 * ease.outBack(a), GOLD()); uiText(g, `DAY ${d} · ${str}`, X(d) + (d > 60 ? -480 : 24), Y(d) + (d > 60 ? 50 : 8), 26, { color: '#ffffff', weight: 900, a }); }
  g.restore();
} });
// s085 — "Day fourteen, even solid rock can't hold you."  CUT-AWAY: you sunk into the bedrock
registerShot('s085', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.15 + 0.08 * k, x: 0, y: 120 }, SY = groundCut(g, t, cam), sink = 260 + 60 * ease.out(prog(t, 0.2, 3.5)), [sx] = shake(t, 3, 14);
  layer(g, cam, 1, (g) => { const x = E.W * 0.45 + sx, y = SY + sink; g.fillStyle = '#2a2420'; poly(g, [[x - 70, SY - 10], [x + 70, SY - 10], [x + 54, y], [x - 54, y]]);
    drawFigure(g, { x, y, s: 1.6, facing: 1, outfit: YOU, pose: breathe(POSES.sad, t), expr: 'worried', look: [0.2, 0.6], rim: { color: WARM, dir: [-0.6, -0.6] } });
    cracks(g, x, y - 10, 300, ease.out(prog(t, 0.2, 2)), { seed: 6, color: 'rgba(30,26,30,.9)', w: 5, arms: 10, rings: 1 }); debris(g, x, SY, (t % 1.2), { n: 8, color: '#8a6040', size: 10, speed: 200, seed: Math.floor(t / 1.2) }); });
  weightBadge(g, { day: 14, k: 1, flip: prog(t, 0.2, 0.6) });
} });
// s086 — "You'll sink into the ground with every step."  side cut: each step punches a hole; you knee-deep
registerShot('s086', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.2, x: -100 + 200 * k, y: 60 }, SY = groundCut(g, t, cam, { labels: false });
  layer(g, cam, 1, (g) => { const x = lerp(E.W * 0.25, E.W * 0.7, k), y = SY + 120;
    for (let i = 0; i < 12; i++) { const hx = E.W * 0.02 + i * 150 + (i % 2) * 30, w = 34 + (i % 3) * 6; if (hx > x - 90) break; g.fillStyle = '#7a5434'; for (const sx of [-1, 1]) { g.beginPath(); g.ellipse(hx + sx * (w + 22), SY - 8, 30, 16, 0, Math.PI, Math.PI * 2); g.fill(); }
      g.fillStyle = '#1e1814'; g.beginPath(); g.moveTo(hx - w, SY - 12); g.lineTo(hx + w, SY - 12); g.lineTo(hx + w * 0.8, SY + 110); g.quadraticCurveTo(hx, SY + 150, hx - w * 0.8, SY + 110); g.closePath(); g.fill(); }
    drawFigure(g, { x, y, s: 1.5, facing: 1, outfit: YOU, pose: walkPose(t * 5), expr: 'determined', look: [1, 0.3], rim: { color: WARM, dir: [-0.6, -0.6] } });
    g.fillStyle = linGrad(g, 0, SY, 0, SY + 200, ['#8a6040', '#6a4a30']); g.fillRect(x - 30, SY + 10, 400, 110); g.fillStyle = '#6aa04a'; g.fillRect(x - 30, SY - 14, 400, 24);
    const ph = (t * 5) % Math.PI; if (ph < 0.4) debris(g, x + 30, SY, ph, { n: 10, color: '#8a6040', size: 12, speed: 400, seed: Math.floor(t * 5 / Math.PI) }); });
  weightBadge(g, { day: 14, k: 1 });
} });
// s087 — "Day thirty-one, you'll pull on anything a meter away as hard as the whole Earth does."  BLUEPRINT
registerShot('s087', { draw(g, t, info) {
  bp(g); const cx = E.W * 0.4, cy = E.H * 0.6, R = 380, p = ease.out(prog(t, 2.2, 4.2));
  UI.lineFigure(g, { x: cx, y: cy + 190, s: 2.0, pose: POSES.stand, color: '#e8f0ff' }); glow(g, cx, cy - 20, 300, GOLD(), 0.25 + 0.15 * Math.sin(t * 4));
  ring(g, cx, cy - 40, R, 3, alpha(BP(), 0.5)); UI.dimension(g, t, { x1: cx, y1: cy + 210, x2: cx + R, y2: cy + 210, str: '1 m', start: 0.5 });
  const items = [[-0.6, 'pebble'], [0.2, 'ball'], [2.4, 'can'], [3.4, 'pebble'], [4.4, 'phone']];
  items.forEach(([a, kind], i) => { const d = R * (1 - 0.55 * p), ix = cx + Math.cos(a) * d, iy = cy - 40 + Math.sin(a) * d; g.save(); g.translate(ix, iy); g.scale(1.6, 1.6); g.translate(-ix, -iy); g.strokeStyle = '#e8f0ff'; g.lineWidth = 3; g.fillStyle = alpha('#e8f0ff', 0.15);
    if (kind === 'ball') { g.beginPath(); g.arc(ix, iy, 30, 0, Math.PI * 2); g.fill(); g.stroke(); } else if (kind === 'phone') { rr(g, ix - 20, iy - 36, 40, 72, 8); g.fill(); g.stroke(); } else if (kind === 'can') { rr(g, ix - 22, iy - 32, 44, 64, 6); g.fill(); g.stroke(); } else { g.beginPath(); g.ellipse(ix, iy, 26, 18, a, 0, Math.PI * 2); g.fill(); g.stroke(); } g.restore();
    arrow(g, [ix - Math.cos(a) * 64, iy - Math.sin(a) * 64], [ix - Math.cos(a) * 170, iy - Math.sin(a) * 170], GOLD(), 6, prog(t, 1.2 + i * 0.15, 1.8 + i * 0.15)); });
  label(g, 'PULL AT 1 m', E.W * 0.78, E.H * 0.3, { size: 46, a: prog(t, 1.4, 1.8) }); label(g, '= THE WHOLE EARTH', E.W * 0.78, E.H * 0.38, { size: 46, color: GOLD(), a: prog(t, wt('earth', info, t, 4.0) - 0.2, wt('earth', info, t, 4.0) + 0.2) });
  UI.badge(g, { str: '1 g', x: E.W * 0.78, y: E.H * 0.52, size: 60 });
  weightBadge(g, { day: 31, k: 1, flip: prog(t, 0.1, 0.5) });
} });
// s088 — "The ground will start falling in on you."  CUT-AWAY: the rock caves in around you
registerShot('s088', { draw(g, t, info) {
  const k = t / info.dur, [sx, sy] = shake(t, 9, 22), cam = { z: 1.3 + 0.06 * k, x: sx, y: 140 + sy }, SY = groundCut(g, t, cam, { labels: false }), cave = ease.in(prog(t, 0.2, 2.6));
  layer(g, cam, 1, (g) => { const x = E.W / 2, y = SY + 420; g.fillStyle = '#2a2420'; poly(g, [[x - 420, SY - 10], [x + 420, SY - 10], [x + 120, y], [x - 120, y]]);
    drawFigure(g, { x, y, s: 1.4, facing: 1, outfit: YOU, pose: POSES.handsOnHead, expr: 'scared', look: [0, -1], rim: { color: WARM, dir: [-0.6, -0.6] } });
    const r = rng(4); for (let i = 0; i < 14; i++) { const sd = i % 2 ? 1 : -1, d0 = 380 - (i >> 1) * 40, fx = x + sd * lerp(d0, 120 + (i >> 1) * 8, cave * (0.6 + r() * 0.4)), fy = lerp(SY + 20 + (i >> 1) * 50, y - 60 + r() * 40, cave * (0.5 + r() * 0.5));
      g.save(); g.translate(fx, fy); g.rotate(sd * cave * 1.5 * r()); rr(g, -40 - r() * 30, -26, 80 + r() * 40, 52, 10); g.fillStyle = shade('#7a7a86', -r() * 0.2); g.fill(); g.restore(); }
    debris(g, x, SY, t % 1, { n: 12, color: '#8a6040', size: 12, speed: 300, seed: Math.floor(t) }); FX.dust(g, t, { count: 40, color: '#c8b090', area: [x - 500, SY - 100, 1000, 500], a: 0.5 }); });
  weightBadge(g, { day: 31, k: 1, value: '150,000,000 t' });
} });
// s089 — "Day seventy-seven, you'll weigh more than the planet."  the seesaw: you vs the Earth — the Earth goes up
registerShot('s089', { draw(g, t, info) { ladder(g, t, info, 77, 'earth', { label: 'THE EARTH', win: true, s: 0.8, value: 'MORE THAN EARTH' }); } });
// s090 — VOSS: "You can't stay on Earth. And after tomorrow, no rocket can lift you."  BIG FACE, cold floodlight
registerShot('s090', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => garageDoor(g, t, { z: 1.5, x: 0, y: -60 }, 1)); veil(g, 'rgba(20,40,70,.2)'); glow(g, E.W * 0.5, E.H * 0.45, 760, COLD, 0.35);
  const r = 320 * (1 + 0.04 * k), talk = talkAmount(info.globalT, 253.09, 258.13);
  bigFace(g, E.W * 0.5, E.H * 0.62, r, { outfit: VOSS, expr: 'neutral', talk, rimColor: COLD, rimSide: 1, look: [-0.2, 0], blink: (t % 3.4) > 3.25 });
  for (const sx of [-1, 1]) seg(g, [[E.W * 0.5 + sx * r * 0.42, E.H * 0.62 + r * 0.92], [E.W * 0.5 + sx * r * 0.12, E.H + 40]], 22, ATLAS);
} });
// s091 — "Atlas has one rocket big enough."  BLUEPRINT: the Atlas Heavy
registerShot('s091', { draw(g, t, info) {
  bp(g); const k = t / info.dur, cx = E.W * 0.45, top = E.H * 0.1, bot = E.H * 0.9, p = ease.inOut(prog(t, 0.1, 1.6)); g.save(); g.lineCap = 'round'; g.lineJoin = 'round';
  g.strokeStyle = '#e8f0ff'; g.lineWidth = 5; g.fillStyle = alpha('#e8f0ff', 0.12); g.beginPath(); g.moveTo(cx - 70, bot); g.lineTo(cx - 70, top + 180); g.quadraticCurveTo(cx - 70, top + 40, cx, top); g.quadraticCurveTo(cx + 70, top + 40, cx + 70, top + 180); g.lineTo(cx + 70, bot); g.closePath(); g.fill();
  g.setLineDash([2400 * p, 3000]); g.stroke(); g.setLineDash([]); for (const sx of [-1, 1]) { g.beginPath(); g.moveTo(cx + sx * 70, bot - 160); g.lineTo(cx + sx * 150, bot); g.lineTo(cx + sx * 70, bot); g.stroke(); }
  for (const y of [top + 300, top + 560]) seg(g, [[cx - 70, y], [cx + 70, y]], 3, alpha('#e8f0ff', 0.6)); rr(g, cx - 40, top + 150, 80, 90, 14); g.strokeStyle = GOLD(); g.lineWidth = 4; g.stroke(); g.restore();
  UI.callout(g, t, { at: [cx + 40, top + 195], to: [cx + 360, top + 120], str: 'CAPSULE', start: 0.8 }); UI.callout(g, t, { at: [cx + 70, bot - 300], to: [cx + 360, bot - 380], str: 'ATLAS HEAVY', start: 1.1 });
  UI.dimension(g, t, { x1: cx - 220, y1: top, x2: cx - 220, y2: bot, str: '110 m', start: 0.6 }); atlasLogo(g, E.W * 0.82, E.H * 0.2, 1.3, ATLAS);
} });
// s092–s094 — the payload meter: 100 t limit; 72 t fits; 143 t does not
registerShot('s092', { draw(g, t, info) { payload(g, t, 0, 0, { str: 'ONE ROCKET · ONE LIMIT' }); } });
registerShot('s093', { draw(g, t, info) { payload(g, t, 72, prog(t, 0.2, 1.4), { str: 'TOMORROW · DAY 10', mark: 'ok' }); } });
registerShot('s094', { draw(g, t, info) { payload(g, t, 143, prog(t, 0.3, 1.8), { str: 'DAY AFTER · DAY 11', mark: 'no' }); } });
// s095 — "So if you go, you go tomorrow night."  ATLAS SCREEN: launch tomorrow 23:00, T-minus ticking
registerShot('s095', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 14, (g) => garageDoor(g, t, { z: 1.3, x: 0, y: 0 }, 1)); veil(g, '#0e1430', 0.3);
  const x = E.W * 0.16, y = E.H * 0.16, w = E.W * 0.68, h = E.H * 0.68, s = 1 + 0.04 * k; g.save(); g.translate(E.W / 2, E.H / 2); g.scale(s, s); g.translate(-E.W / 2, -E.H / 2);
  rr(g, x, y, w, h, 30); g.fillStyle = 'rgba(8,14,28,.92)'; g.fill(); g.strokeStyle = ATLAS; g.lineWidth = 4; g.stroke(); atlasLogo(g, x + 80, y + 80, 0.9, ATLAS);
  text(g, 'LAUNCH WINDOW', x + 150, y + 82, { size: 44, color: ATLAS, font: FONTS.ui, weight: 900, spacing: 6, align: 'left' });
  text(g, 'TOMORROW · 23:00', E.W / 2, y + h * 0.45, { size: 110, color: '#ffffff', font: FONTS.ui, weight: 900, glow: 16, glowColor: alpha(ATLAS, 0.6) });
  const secs = 26 * 3600 + 12 * 60 + 7 - Math.floor(t), hh = Math.floor(secs / 3600), mm = Math.floor(secs / 60) % 60, ss = secs % 60, pad = (n) => String(n).padStart(2, '0');
  text(g, `T– ${pad(hh)}:${pad(mm)}:${pad(ss)}`, E.W / 2, y + h * 0.75, { size: 80, color: GOLD(), font: FONTS.ui, weight: 900, spacing: 4 });
  g.restore();
} });
// s096 — "Before midnight."  INSERT: the midnight clock, red
registerShot('s096', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 14, (g) => garage(g, t, { z: 1.3, x: 0, y: 100 })); veil(g, '#5a0a10', 0.35); glow(g, E.W / 2, E.H / 2, 700, '#ff3a2a', 0.35 + 0.15 * Math.sin(t * 8));
  midnightClock(g, E.W / 2, E.H * 0.52, 300 * (1 + 0.06 * k), lerp(57, 59.5, k), { face: '#ffe8e0' });
} });
// s097 — "And you can never come back."  BIG FACE: you in the floodlight
registerShot('s097', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 12, (g) => garageDoor(g, t, { z: 1.4, x: 200, y: -40 }, 1)); glow(g, E.W * 0.75, E.H * 0.35, 800, '#dff4ff', 0.45);
  heroFace(g, E.W * 0.46, E.H * 0.6, 300 * (1 + 0.05 * k), { outfit: YOU, expr: 'sad', look: [0.4, 0.2], rimColor: '#dff4ff', rimSide: 1 });
} });
// s098 — "By day twenty, coming home would mean hitting the ground like an asteroid."  a fireball over a small town
registerShot('s098', { draw(g, t, info) {
  const k = t / info.dur, p = ease.in(prog(t, 0.2, info.dur - 0.4)), hx = lerp(E.W * 1.05, E.W * 0.38, p), hy = lerp(-80, E.H * 0.7, p);
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#0e1430', '#2a2a5a', '#6a3a5a']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); FX.stars(g, t, { count: 120, area: [0, 0, E.W, E.H * 0.6] }); glow(g, hx, hy, 900 * (0.4 + p), '#ff8a3a', 0.35 + 0.4 * p);
  FX.skyline(g, { x: -100, y: E.H * 0.86, w: E.W + 200, minH: 60, maxH: 180, color: '#14102a', windowColor: '#ffcf8a', lit: 0.4, seed: 9 }); g.fillStyle = '#100c20'; g.fillRect(0, E.H * 0.86, E.W, E.H);
  for (let i = 18; i >= 0; i--) { const q = Math.max(0, p - i * 0.025), tx = lerp(E.W * 1.05, E.W * 0.38, q), ty = lerp(-80, E.H * 0.7, q); circle(g, tx, ty, (60 - i * 2.4) * (0.6 + p), alpha(mix('#fff2c8', '#ff5a1a', i / 18), 0.8 * (1 - i / 19))); }
  circle(g, hx, hy, 40 * (0.6 + p), '#ffffff'); if (t > info.dur - 0.4) { const f = (t - info.dur + 0.4) / 0.4; g.fillStyle = alpha('#fff2d0', f * 0.8); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); }
  chip(g, 'DAY 20 = AN ASTEROID', E.W / 2, E.H * 0.2, { size: 48, k: prog(t, 0.4, 0.8) }); weightBadge(g, { day: 20, k: 1, danger: true });
} });
// s099 — "You have one day left on Earth."  GARAGE: you on the floor, alone
registerShot('s099', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.1 + 0.08 * k, x: -120, y: 80 }, R = garage(g, t, cam);
  layer(g, cam, 1, (g) => { rr(g, R.CX - 520, R.GY - 50, 560, 50, 14); g.fillStyle = '#5a7ac8'; g.fill(); drawFigure(g, { x: R.CX - 300, y: R.GY - 40, s: 1.4, facing: 1, outfit: YOU, pose: breathe({ ...FLOORSIT, hF: [60, -56], eF: [40, -60], hB: [54, -50], eB: [30, -56] }, t), expr: 'sad', look: [1, 0.5], rim: { color: LAMP, dir: [0.6, -0.6] } }); });
  chip(g, '1 DAY LEFT ON EARTH', E.W / 2, E.H * 0.2, { size: 46, k: prog(t, 0.4, 0.8) }); weightBadge(g, { day: 9, k: 1 });
} });
// s100 — "And there's one person you need to see."  INSERT: the photo taped to the garage wall
registerShot('s100', { draw(g, t, info) {
  const k = t / info.dur; blurLayer(g, 14, (g) => garage(g, t, { z: 1.6, x: -400, y: -80 })); glow(g, E.W * 0.5, E.H * 0.3, 700, LAMP, 0.35);
  const s = 1 + 0.08 * ease.inOut(k); g.save(); g.translate(E.W / 2, E.H / 2); g.scale(s, s); g.translate(-E.W / 2, -E.H / 2); lakePhoto(g, E.W / 2, E.H * 0.5, 1000, 0.03); g.restore();
} });
// s101 — "Day ten. Seventy-two tonnes."  DAWN at the river, mist; you walk the near bank
registerShot('s101', { draw(g, t, info) {
  const k = t / info.dur, cam = { z: 1.05 + 0.05 * k, x: -100, y: 0 }, R = river(g, t, cam, { time: 'dawn' });
  layer(g, cam, 1, (g) => drawFigure(g, { x: lerp(R.CX - 860, R.CX - 600, k), y: R.GY - 40, s: 1.3, facing: 1, outfit: YOU, pose: walkPose(t * 5), expr: 'determined', look: [1, -0.2], rim: { color: '#ffe2b8', dir: [-0.7, -0.5] } }));
  weightBadge(g, { day: 10, k: 1, flip: prog(t, 0.3, 0.8) });
} });
