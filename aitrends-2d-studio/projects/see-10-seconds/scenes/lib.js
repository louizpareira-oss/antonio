// lib.js — helpers shared by the shots of this video: the BLUE WORLD (cyan hologram of the future), HUD + countdown,
// front-view faces, hands, dotted "you were here" outlines, icons and speech bubbles.
import { E, V, S, clamp, lerp, prog, ease, rng, seg, circle, ring, rr, poly, alpha, shade, mix, linGrad, glow, text, measure, FONTS, layer } from '/engine/core.js';
import { drawFigure, headPos, bigFace, POSES } from '/engine/rig2d.js';

export const BLUE = '#7FE8FF';

// ---------- offscreen canvases (one per purpose, reused every frame) ----------
const _pool = {};
function canvas(id, w, h) {
  let c = _pool[id];
  if (!c) { c = _pool[id] = document.createElement('canvas'); }
  if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
  const x = c.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); x.globalAlpha = 1; x.globalCompositeOperation = 'source-over'; x.filter = 'none'; x.clearRect(0, 0, w, h);
  return [c, x];
}
const full = () => [Math.round(E.W * E.PX), Math.round(E.H * E.PX)];

// THE BLUE WORLD: draw anything as a cyan hologram (the same thing, ten seconds from now).
// fn(g) draws in logical units (optionally through cam/depth). a = strength, t drives the scan-line crawl.
export function ghost(g, fn, o = {}) {
  const { a = 0.45, color = BLUE, glowA = 1.1, scan = true, cam = null, depth = 1, t = 0, dx = 0, flicker = 0 } = o;
  if (a <= 0.003) return;
  const [W, H] = full(), [c, x] = canvas('ghost', W, H);
  x.setTransform(E.PX, 0, 0, E.PX, 0, 0);
  cam ? layer(x, cam, depth, fn) : fn(x);
  x.setTransform(1, 0, 0, 1, 0, 0);
  x.globalCompositeOperation = 'source-in'; x.fillStyle = color; x.fillRect(0, 0, W, H);
  if (scan) { x.globalCompositeOperation = 'destination-out'; x.fillStyle = 'rgba(0,0,0,.5)'; const step = Math.max(3, Math.round(6 * E.PX)), th = Math.max(1, Math.round(2 * E.PX)); for (let y = Math.floor((t * 30 * E.PX) % step); y < H; y += step) x.fillRect(0, y, W, th); }
  x.globalCompositeOperation = 'source-over';
  const sw = Math.max(8, Math.round(W / 4)), sh = Math.max(8, Math.round(H / 4)), [s, sx] = canvas('ghostGlow', sw, sh);
  sx.filter = `blur(${Math.max(1.5, 4 * E.PX / 1)}px)`; sx.drawImage(c, 0, 0, sw, sh); sx.filter = 'none';
  const fl = flicker ? 1 - flicker * (0.5 + 0.5 * Math.sin(t * 37)) * (0.5 + 0.5 * Math.sin(t * 13.3)) : 1;
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'lighter';
  g.globalAlpha = clamp(a * glowA * fl); g.drawImage(s, dx * E.PX, 0, W, H);
  g.globalAlpha = clamp(a * fl); g.drawImage(c, dx * E.PX, 0);
  g.restore();
}
// ghost of a figure (same args as drawFigure)
export const ghostFig = (g, o, go = {}) => ghost(g, (x) => drawFigure(x, { ...o, rim: false, shadow: false }), go);

// whole-scene double exposure: the scene recoloured cyan and screened on top, shifted by dx (the "copy running ahead")
export function doubleWorld(g, fn, o = {}) {
  const { a = 0.4, dx = 0, dy = 0, color = BLUE, scan = true, t = 0 } = o;
  if (a <= 0.003) return;
  const [W, H] = full(), [c, x] = canvas('double', W, H);
  x.setTransform(E.PX, 0, 0, E.PX, 0, 0); fn(x); x.setTransform(1, 0, 0, 1, 0, 0);
  x.globalCompositeOperation = 'color'; x.fillStyle = color; x.fillRect(0, 0, W, H);
  x.globalCompositeOperation = 'multiply'; x.fillStyle = mix(color, '#ffffff', 0.35); x.fillRect(0, 0, W, H);
  if (scan) { x.globalCompositeOperation = 'source-over'; x.fillStyle = 'rgba(0,0,0,.22)'; const step = Math.max(3, Math.round(6 * E.PX)); for (let y = Math.floor((t * 30 * E.PX) % step); y < H; y += step) x.fillRect(0, y, W, Math.max(1, Math.round(2 * E.PX))); }
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'screen'; g.globalAlpha = clamp(a); g.drawImage(c, dx * E.PX, dy * E.PX); g.restore();
}
// cyan edge glow + faint scan lines over the whole frame while the blue world is "loud"
export function blueEdge(g, t, k = 1) {
  if (k <= 0) return;
  g.save(); g.globalCompositeOperation = 'lighter';
  const r = Math.max(E.W, E.H);
  const gr = g.createRadialGradient(E.W / 2, E.H / 2, r * 0.35, E.W / 2, E.H / 2, r * 0.72);
  gr.addColorStop(0, alpha(BLUE, 0)); gr.addColorStop(1, alpha(BLUE, 0.22 * k)); g.fillStyle = gr; g.fillRect(0, 0, E.W, E.H);
  g.fillStyle = alpha(BLUE, 0.035 * k); for (let y = (t * 40) % 8; y < E.H; y += 8) g.fillRect(0, y, E.W, 2);
  g.restore();
}
// horizontal glitch tear bands (the blue world re-rendering)
export function glitchBands(g, t, k = 1, seed = 7) {
  if (k <= 0) return;
  const r = rng(seed + Math.floor(t * 14));
  g.save(); g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 6; i++) { const y = r() * E.H, h = 6 + r() * 46, dx = (r() - 0.5) * 120 * k; g.fillStyle = alpha(BLUE, (0.06 + r() * 0.12) * k); g.fillRect(dx, y, E.W, h); }
  g.restore();
}

// ---------- HUD ----------
function eyeIcon(g, x, y, s, col) {
  g.save(); g.strokeStyle = col; g.lineWidth = 3 * s; g.beginPath(); g.moveTo(x - 18 * s, y); g.quadraticCurveTo(x, y - 15 * s, x + 18 * s, y); g.quadraticCurveTo(x, y + 15 * s, x - 18 * s, y); g.closePath(); g.stroke(); circle(g, x, y, 5.5 * s, col); g.restore();
}
// HUD pill (top-left): eye icon + "+10 s" (+ optional label / countdown "T-7"). k = 0..1 appear.
export function hud(g, o = {}) {
  const { k = 1, x = V(80, 60), y = V(200, 230), label = '+10 s', sub = null, count = null, pulse = 0, color = BLUE } = o;
  if (k <= 0.01) return;
  const sc = 0.85 + 0.15 * ease.outBack(clamp(k)), lw = measure(g, label, 30, FONTS.ui, 900), sw = sub ? measure(g, sub, 18, FONTS.ui, 900) + 22 : 0;
  const cw = count != null ? 120 : 0, w = 84 + lw + sw + cw, h = 60;
  g.save(); g.globalAlpha *= clamp(k); g.translate(x, y); g.scale(sc, sc);
  rr(g, 0, -h / 2, w, h, h / 2); g.fillStyle = 'rgba(6,14,26,.82)'; g.fill(); g.strokeStyle = alpha(color, 0.55 + 0.35 * pulse); g.lineWidth = 2.5; g.stroke();
  glow(g, 40, 0, 60, color, 0.25 + 0.3 * pulse);
  eyeIcon(g, 40, 0, 1, color);
  text(g, label, 70, 2, { size: 30, color, font: FONTS.ui, weight: 900, align: 'left', glow: 10, glowColor: alpha(color, 0.6) });
  if (sub) text(g, sub, 70 + lw + 18, 2, { size: 18, color: alpha(S().ui.cream, 0.8), font: FONTS.ui, weight: 900, align: 'left', spacing: 2 });
  if (count != null) { const cx = 70 + lw + sw + 16; seg(g, [[cx, -18], [cx, 18]], 2, alpha(color, 0.4)); text(g, `T−${count}`, cx + 18, 2, { size: 32, color: S().ui.gold, font: FONTS.ui, weight: 900, align: 'left', glow: 12, glowColor: alpha(S().ui.gold, 0.6) }); }
  g.restore();
}
// big pop numeral (countdowns, "7 8 9")
export function bigNum(g, str, x, y, age, o = {}) {
  const { size = V(220, 240), color = S().ui.gold, hold = 0.55, out = 0.25 } = o;
  if (age < 0 || age > hold + out) return;
  const a = age < hold ? 1 : 1 - (age - hold) / out, s = 0.7 + 0.3 * ease.outBack(clamp(age / 0.18)) + 0.06 * age;
  g.save(); g.translate(x, y); g.scale(s, s);
  text(g, str, 0, 0, { size, color, font: FONTS.ui, weight: 900, glow: 40, glowColor: alpha(color, 0.7), alpha: a, stroke: size * 0.04, strokeColor: 'rgba(0,0,0,.35)' });
  g.restore();
}
// the climax countdown, read from the real word timings: [[time, value], ...]
const NUMS = { ten: 10, nine: 9, eight: 8, seven: 7, six: 6, five: 5, four: 4, three: 3, two: 2, one: 1, zero: 0 };
let _cd = null;
export function countdown(from = 169, to = 207.5) {
  if (_cd && _cd.from === from) return _cd.list;
  const list = E.words.filter(w => w.start >= from && w.start <= to && /^[A-Za-z]+\.$/.test(w.word.trim()) && NUMS[w.word.trim().slice(0, -1).toLowerCase()] != null)
    .map(w => [w.start, NUMS[w.word.trim().slice(0, -1).toLowerCase()]]);
  _cd = { from, list }; return list;
}
// current count at globalT -> { n, age } (n = null before the first number)
export function countAt(gt) { let cur = { n: null, age: 0 }; for (const [ts, n] of countdown()) if (gt >= ts - 0.04) cur = { n, age: gt - ts }; return cur; }
// HUD + big numeral for every climax shot
export function climaxHUD(g, gt, o = {}) {
  const { n, age } = countAt(gt);
  hud(g, { k: o.k ?? 1, count: n ?? 10, pulse: n != null ? Math.max(0, 1 - age * 2) : 0, sub: o.sub ?? null, y: o.y });
  if (n != null && o.big !== false) bigNum(g, String(n), o.x ?? E.W - V(260, 200), o.ny ?? E.H * 0.42, age, { color: n <= 3 ? S().ui.accent : S().ui.gold, size: o.size });
}

// ---------- faces ----------
// bigFace front view: the rig's brows are drawn for a 3/4 view, so flip them for front-facing close-ups
const FRONT = { angry: { brows: 'worried' }, determined: { brows: 'worried', mouth: 'smallFlat' }, sad: { brows: 'angry', mouth: 'frown' }, worried: { brows: 'angry' }, cry: { brows: 'angry' }, scared: { brows: 'angry' }, nervous: { brows: 'angry' } };
export function heroFace(g, cx, cy, r, o = {}) {
  bigFace(g, cx, cy, r, { ...o, face: { ...(FRONT[o.expr] || {}), ...(o.face || {}) } });
  if (o.eyeGlow) eyeGlow(g, cx, cy, r, o.eyeGlow, o.tilt);
}
export function eyeGlow(g, cx, cy, r, k = 1, tilt = 0) {
  g.save(); g.translate(cx, cy); if (tilt) g.rotate(tilt);
  for (const sx of [-1, 1]) { glow(g, sx * r * 0.34, -r * 0.16, r * 0.5, BLUE, 0.55 * k); ring(g, sx * r * 0.34, -r * 0.16, r * 0.2, r * 0.05, alpha(BLUE, 0.8 * k)); }
  g.restore();
}
// MIA close-up: high ponytail behind the head (the rig only draws it in 3/4 view), coral tie, optional earbuds
export function miaFace(g, cx, cy, r, o = {}) {
  const of = o.outfit, ink = S().ink, side = o.rimSide ?? -1, rc = o.rimColor || '#ffc68a', sway = o.sway || 0;
  g.save(); g.translate(cx, cy); if (o.tilt) g.rotate(o.tilt);
  const tail = (w, col) => { g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.beginPath(); g.moveTo(r * 0.2, -r * 0.9); g.quadraticCurveTo(r * (1.75 + sway), -r * 1.25, r * (1.32 + sway * 1.4), r * 0.62); g.stroke(); };
  tail(r * 0.6, rc); tail(r * 0.5, ink);
  g.restore();
  bigFace(g, cx, cy, r, { ...o, outfit: { ...of, head: 'none' }, face: { ...(FRONT[o.expr] || {}), ...(o.face || {}) } });
  g.save(); g.translate(cx, cy); if (o.tilt) g.rotate(o.tilt);
  circle(g, r * 0.18, -r * 0.98, r * 0.3, ink);                                   // the bun of the ponytail on top
  g.save(); g.translate(r * 0.3, -r * 1.0); g.rotate(0.5); rr(g, -r * 0.1, -r * 0.2, r * 0.2, r * 0.4, r * 0.08); g.fillStyle = of.headColor || '#E2684A'; g.fill(); g.restore();
  if (o.earbuds) for (const sx of [-1, 1]) { circle(g, sx * r * 1.0, r * 0.05, r * 0.11, '#f4f2ee'); circle(g, sx * r * 1.0, r * 0.05, r * 0.05, '#c9c6c0'); }
  g.restore();
  if (o.eyeGlow) eyeGlow(g, cx, cy, r, o.eyeGlow, o.tilt);
}

// ---------- figures ----------
// a figure seen from behind: draw it, then cover the face with the head ink (rim stays visible)
export function backView(g, o) { drawFigure(g, o); const [hx, hy, r] = headPos(o); circle(g, hx, hy, r + 0.6, o.ink || S().ink); }
// dashed outline of a figure ("you were standing here")
export function dashFigure(g, o) {
  const { x, y, s = 1, pose = POSES.stand, color = '#ffffff', facing = 1, a = 0.9, w = 5 } = o, p = pose;
  g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(s * facing, s); g.setLineDash([12, 10]); g.strokeStyle = color; g.lineWidth = w / s * 1.2; g.lineCap = 'round'; g.lineJoin = 'round';
  const L = (pts) => { g.beginPath(); g.moveTo(...pts[0]); pts.slice(1).forEach(q => g.lineTo(...q)); g.stroke(); };
  L([p.sh, p.hip]); L([p.hip, p.kF, p.fF]); L([p.hip, p.kB, p.fB]); L([p.sh, p.eF, p.hF]); L([p.sh, p.eB, p.hB]);
  g.beginPath(); g.arc(p.head[0], p.head[1], 26, 0, Math.PI * 2); g.stroke();
  g.setLineDash([]); g.restore();
}
// stylised hand for inserts: thick ink capsules + a sleeve from `from`
export function hand(g, x, y, s, o = {}) {
  const { from = [E.W + 300, y + 300 * s], sleeve = '#2E72D2', ink = S().ink, open = 1, rim = null, cuff = null, fist = false } = o;
  const ang = Math.atan2(y - from[1], x - from[0]);
  const draw = (dx, dy, inkC, slvC) => {
    seg(g, [[x - Math.cos(ang) * 40 * s + dx, y - Math.sin(ang) * 40 * s + dy], [from[0] + dx, from[1] + dy]], 66 * s, inkC);
    seg(g, [[x - Math.cos(ang) * 150 * s + dx, y - Math.sin(ang) * 150 * s + dy], [from[0] + dx, from[1] + dy]], 92 * s, slvC);
    if (cuff && !rim) seg(g, [[x - Math.cos(ang) * 150 * s + dx, y - Math.sin(ang) * 150 * s + dy], [x - Math.cos(ang) * 160 * s + dx, y - Math.sin(ang) * 160 * s + dy]], 96 * s, cuff);
    circle(g, x + dx, y + dy, (fist ? 52 : 44) * s, inkC);
    if (!fist) for (let i = 0; i < 4; i++) { const a = ang - 0.55 + i * 0.36, L = lerp(30, 100, open) * s; seg(g, [[x + dx, y + dy], [x + dx + Math.cos(a) * L, y + dy + Math.sin(a) * L]], 18 * s, inkC); }
    else for (let i = 0; i < 4; i++) { const a = ang - 0.5 + i * 0.33; circle(g, x + dx + Math.cos(a) * 40 * s, y + dy + Math.sin(a) * 40 * s, 15 * s, inkC); }
    const ta = ang + (o.thumb ?? -1.3); seg(g, [[x + dx, y + dy], [x + dx + Math.cos(ta) * (fist ? 44 : 70) * s, y + dy + Math.sin(ta) * (fist ? 44 : 70) * s]], 19 * s, inkC);
  };
  if (rim) draw(rim.dir[0] * 5, rim.dir[1] * 5, rim.color, rim.color);
  draw(0, 0, ink, sleeve);
}
// rock / paper / scissors hand shapes (insert scale), pointing along ang
export function rpsHand(g, x, y, s, kind, o = {}) {
  const { ang = 0, sleeve = '#555a6a', ink = S().ink, rim = null } = o;
  const back = [x - Math.cos(ang) * 420 * s, y - Math.sin(ang) * 420 * s];
  const draw = (dx, dy, inkC, slvC) => {
    seg(g, [[x - Math.cos(ang) * 60 * s + dx, y - Math.sin(ang) * 60 * s + dy], [back[0] + dx, back[1] + dy]], 70 * s, inkC);
    seg(g, [[x - Math.cos(ang) * 170 * s + dx, y - Math.sin(ang) * 170 * s + dy], [back[0] + dx, back[1] + dy]], 96 * s, slvC);
    circle(g, x + dx, y + dy, 56 * s, inkC);
    const n = Math.cos(ang + Math.PI / 2), m = Math.sin(ang + Math.PI / 2);
    const finger = (off, len, w = 22) => { const bx = x + dx + n * off * s, by = y + dy + m * off * s; seg(g, [[bx, by], [bx + Math.cos(ang) * len * s, by + Math.sin(ang) * len * s]], w * s, inkC); };
    if (kind === 'paper') { for (const off of [-36, -12, 12, 36]) finger(off, 110); finger(-58, 60, 22); }
    else if (kind === 'scissors') { const a1 = ang - 0.32, a2 = ang + 0.32; for (const a of [a1, a2]) seg(g, [[x + dx, y + dy], [x + dx + Math.cos(a) * 120 * s, y + dy + Math.sin(a) * 120 * s]], 22 * s, inkC); }
    else for (const off of [-30, -10, 10, 30]) circle(g, x + dx + Math.cos(ang) * 46 * s + n * off * s, y + dy + Math.sin(ang) * 46 * s + m * off * s, 17 * s, inkC);
  };
  if (rim) draw(rim.dir[0] * 5, rim.dir[1] * 5, rim.color, rim.color);
  draw(0, 0, ink, sleeve);
}

// ---------- graphics ----------
// speech bubble with text, auto width; tail points to (tx, ty)
export function say(g, x, y, str, o = {}) {
  const { size = 40, color = '#f4efe6', ink = S().ink, a = 1, tail = null, k = 1, cut = false } = o;
  if (a <= 0 || k <= 0) return;
  const w = measure(g, str, size, FONTS.ui, 900) + size * 1.2, h = size * 1.7, sc = 0.6 + 0.4 * ease.outBack(clamp(k));
  g.save(); g.globalAlpha *= a; g.translate(x, y); g.scale(sc, sc);
  if (tail) poly(g, [[-w * 0.12, h * 0.3], [tail[0] - x, tail[1] - y], [w * 0.12, h * 0.3]], color);
  rr(g, -w / 2, -h / 2, w, h, h / 2); g.fillStyle = color; g.fill();
  if (cut) g.globalCompositeOperation = 'destination-out';            // for ghost bubbles: punch the text out
  text(g, str, 0, 2, { size, color: cut ? '#000' : ink, font: FONTS.ui, weight: 900 });
  g.restore();
}
// label chip (dark rounded pill + caps text)
export function chip(g, str, x, y, o = {}) {
  const { size = 30, color = S().ui.cream, bg = 'rgba(8,12,22,.8)', a = 1, k = 1, line = null } = o;
  if (a <= 0 || k <= 0) return;
  const w = measure(g, str, size, FONTS.ui, 900) + size * 1.4, h = size * 1.7, sc = 0.7 + 0.3 * ease.outBack(clamp(k));
  g.save(); g.globalAlpha *= a * clamp(k * 3); g.translate(x, y); g.scale(sc, sc);
  rr(g, -w / 2, -h / 2, w, h, h / 2); g.fillStyle = bg; g.fill(); if (line) { g.strokeStyle = line; g.lineWidth = 2.5; g.stroke(); }
  text(g, str, 0, 2, { size, color, font: FONTS.ui, weight: 900, spacing: 2 });
  g.restore();
}
export function checkMark(g, x, y, s, col = S().ui.good, k = 1) { if (k <= 0) return; g.save(); g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = col; g.lineWidth = 12 * s; g.beginPath(); const p = clamp(k); g.moveTo(x - 30 * s, y); g.lineTo(x - 30 * s + 22 * s * Math.min(1, p * 2), y + 22 * s * Math.min(1, p * 2)); if (p > 0.5) g.lineTo(x - 8 * s + 46 * s * (p - 0.5) * 2, y + 22 * s - 52 * s * (p - 0.5) * 2); g.stroke(); g.restore(); }
export function crossMark(g, x, y, s, col = S().ui.accent, k = 1) { if (k <= 0) return; const p = clamp(k); g.save(); g.lineCap = 'round'; g.strokeStyle = col; g.lineWidth = 12 * s; const d = 30 * s; g.beginPath(); g.moveTo(x - d, y - d); g.lineTo(x - d + 2 * d * Math.min(1, p * 2), y - d + 2 * d * Math.min(1, p * 2)); if (p > 0.5) { g.moveTo(x + d, y - d); g.lineTo(x + d - 2 * d * (p - 0.5) * 2, y - d + 2 * d * (p - 0.5) * 2); } g.stroke(); g.restore(); }
// circular icon with a slash (no sound / didn't see)
export function slashIcon(g, x, y, r, kind, k = 1) {
  if (k <= 0) return; const ui = S().ui, sc = 0.7 + 0.3 * ease.outBack(clamp(k));
  g.save(); g.globalAlpha *= clamp(k * 2); g.translate(x, y); g.scale(sc, sc);
  circle(g, 0, 0, r, 'rgba(8,12,22,.75)'); ring(g, 0, 0, r, r * 0.08, ui.cream);
  g.strokeStyle = ui.cream; g.lineWidth = r * 0.1; g.lineCap = 'round';
  if (kind === 'ear') { g.beginPath(); g.arc(0, -r * 0.1, r * 0.38, Math.PI * 1.05, Math.PI * 2.25); g.quadraticCurveTo(r * 0.1, r * 0.35, -r * 0.05, r * 0.5); g.stroke(); g.beginPath(); g.arc(-r * 0.02, -r * 0.1, r * 0.15, Math.PI * 1.1, Math.PI * 2.1); g.stroke(); }
  else { g.beginPath(); g.moveTo(-r * 0.55, 0); g.quadraticCurveTo(0, -r * 0.45, r * 0.55, 0); g.quadraticCurveTo(0, r * 0.45, -r * 0.55, 0); g.stroke(); circle(g, 0, 0, r * 0.15, ui.cream); }
  const p = clamp((k - 0.3) / 0.7); if (p > 0) seg(g, [[-r * 0.62, -r * 0.62], [-r * 0.62 + r * 1.24 * p, -r * 0.62 + r * 1.24 * p]], r * 0.12, ui.accent);
  g.restore();
}
// floating music notes (earbuds)
export function notes(g, x, y, t, o = {}) {
  const { color = '#f4efe6', a = 0.8, n = 3 } = o;
  for (let i = 0; i < n; i++) {
    const ph = ((t * 0.6 + i / n) % 1), nx = x + Math.sin(ph * 6 + i) * 18 + i * 22, ny = y - ph * 120, al = a * Math.sin(ph * Math.PI);
    g.save(); g.globalAlpha *= al; circle(g, nx, ny, 9, color); seg(g, [[nx + 8, ny], [nx + 8, ny - 34], [nx + 22, ny - 28]], 4, color); g.restore();
  }
}
// a speech bubble from the blue world: dark backing + cyan hologram bubble with the text punched out
export function ghostSay(g, x, y, str, o = {}, go = {}) {
  const { size = 40, k = 1 } = o; if (k <= 0) return;
  const w = measure(g, str, size, FONTS.ui, 900) + size * 1.2, h = size * 1.7, sc = 0.6 + 0.4 * ease.outBack(clamp(k)), cam = go.cam;
  const back = (gg) => { gg.save(); gg.translate(x, y); gg.scale(sc, sc); rr(gg, -w / 2 - 6, -h / 2 - 6, w + 12, h + 12, h / 2 + 6); gg.fillStyle = `rgba(4,10,20,${0.6 * (go.a ?? 0.55) / 0.55})`; gg.fill(); gg.restore(); };
  if (cam) layer(g, cam, go.depth ?? 1, back); else back(g);
  ghost(g, (xx) => say(xx, x, y, str, { ...o, cut: true }), go);
}
