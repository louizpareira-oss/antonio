// scenes/ns.js — NIGHT SUPPORT look: the car's own sensor display. Cyan line art on near-black,
// red = danger, green = safe, amber = light. Every template is draw(g, t, p) in logical 1920×1080 units.
import { E, clamp, lerp, prog, ease, rng, noise, alpha, rr, circle, ring, radGrad, linGrad, glow, text } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const C = { bg: '#05070a', panel: '#0a1016', line: '#8fe3ff', dim: 'rgba(143,227,255,0.28)', faint: 'rgba(143,227,255,0.07)',
  white: '#e9f6ff', red: '#ff3b3b', green: '#39d98a', amber: '#ffb547', grey: '#5f7282', void: '#010203' };
export const MONO = 'JetBrains Mono', COND = 'Barlow Condensed';

for (const [fam, w, file] of [[MONO, '400', 'jetbrains-mono-latin-400-normal.woff2'], [MONO, '700', 'jetbrains-mono-latin-700-normal.woff2'],
  [COND, '600', 'barlow-condensed-latin-600-normal.woff2'], [COND, '800', 'barlow-condensed-latin-800-normal.woff2']]) {
  try { const ff = new FontFace(fam, `url(/project/assets/fonts/${file})`, { weight: w }); await ff.load(); document.fonts.add(ff); } catch (e) { console.log('font missing', fam, w); }
}

const RULE_STARTS = [53.36, 68.8, 83.6, 102.16, 122.88, 141.28, 178.88];
const CLOCK0 = 3 * 3600 + 7 * 60;                         // 03:07:00 AM at t=0 …
const CLOCK_RATE = (34 * 60) / 226;                        // … reaching 03:41 by the end

// ---------- primitives ----------
export const T = (g, str, x, y, o = {}) => text(g, str, x, y, { font: o.mono ? MONO : COND, weight: o.mono ? 700 : 800, color: C.white, ...o });
export function line(g, pts, w = 3, col = C.line, close = false, dash = null, off = 0) {
  g.save(); g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; if (dash) { g.setLineDash(dash); g.lineDashOffset = off; }
  g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); if (close) g.closePath(); g.stroke(); g.restore();
}
export function box(g, x, y, w, h, r, stroke = C.line, fill = null, lw = 3) { rr(g, x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; g.stroke(); } }
export function chip(g, x, y, str, col = C.line, o = {}) {
  const size = o.size || 24; g.save(); g.font = `700 ${size}px "${MONO}"`; const w = g.measureText(str).width + size * 1.4, h = size * 1.7; g.restore();
  const x0 = o.align === 'left' ? x : o.align === 'right' ? x - w : x - w / 2;
  box(g, x0, y - h / 2, w, h, h / 2, col, alpha(col, 0.12), 2); T(g, str, x0 + w / 2, y + 1, { mono: true, size, color: col });
  return w;
}
export function xMark(g, x, y, s, t, at = 0, col = C.red) {
  const k1 = ease.out(prog(t, at, at + 0.18)), k2 = ease.out(prog(t, at + 0.12, at + 0.3)); if (k1 <= 0) return;
  glow(g, x, y, s * 1.6, col, 0.25 * k1);
  line(g, [[x - s, y - s], [lerp(x - s, x + s, k1), lerp(y - s, y + s, k1)]], s * 0.28, col);
  if (k2 > 0) line(g, [[x + s, y - s], [lerp(x + s, x - s, k2), lerp(y - s, y + s, k2)]], s * 0.28, col);
}
export function check(g, x, y, s, t, at = 0, col = C.green) {
  const k = ease.out(prog(t, at, at + 0.3)); if (k <= 0) return;
  const pts = [[x - s, y], [x - s * 0.3, y + s * 0.7], [x + s, y - s * 0.8]];
  const a = clamp(k * 2), b = clamp(k * 2 - 1);
  line(g, [pts[0], [lerp(pts[0][0], pts[1][0], a), lerp(pts[0][1], pts[1][1], a)]], s * 0.26, col);
  if (b > 0) line(g, [pts[1], [lerp(pts[1][0], pts[2][0], b), lerp(pts[1][1], pts[2][1], b)]], s * 0.26, col);
}
export function seatbeltIcon(g, x, y, s, col) {          // the dashboard pictogram: seated person + diagonal belt
  g.save(); g.translate(x, y); g.scale(s, s);
  circle(g, 0, -34, 11, col);
  line(g, [[0, -18], [-4, 14], [22, 16], [26, 40]], 10, col);
  line(g, [[-2, -10], [16, 4]], 8, col);
  line(g, [[-16, -22], [14, 22]], 5, C.bg); line(g, [[-14, -24], [16, 20]], 3, col);
  g.restore();
}
export function beepRings(g, x, y, t, col = C.red, on = true) { if (on) FX.rings(g, x, y, t, { count: 3, r0: 30, r1: 120, speed: 1.2, color: col, a: 0.6, w: 3 }); }
const blink = (t, hz = 1.25) => (t * hz) % 1 < 0.55;

// ---------- frame: background, HUD, captions ----------
export function bg(g, t) {
  g.fillStyle = C.bg; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  g.save(); g.strokeStyle = C.faint; g.lineWidth = 1; g.beginPath();
  for (let x = 0; x <= E.W; x += 64) { g.moveTo(x, 0); g.lineTo(x, E.H); } for (let y = 0; y <= E.H; y += 64) { g.moveTo(0, y); g.lineTo(E.W, y); }
  g.stroke(); g.restore();
}
export function hud(g, t, info) {
  const gt = info.globalT, p = info;
  if (blink(gt, 1)) circle(g, 62, 58, 9, C.red);
  T(g, 'NIGHT SUPPORT // CALL 001', 84, 59, { mono: true, size: 24, align: 'left', color: C.line });
  if (p.status) chip(g, 62, 112, p.status[0], p.status[1] || C.red, { size: 26, align: 'left' });
  const secs = Math.floor(CLOCK0 + gt * CLOCK_RATE), hh = Math.floor(secs / 3600), mm = Math.floor(secs / 60) % 60, ss = secs % 60;
  T(g, `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}:${String(ss).padStart(2, '0')} AM`, E.W - 62, 59, { mono: true, size: 28, align: 'right', color: C.white });
  let n = 0; RULE_STARTS.forEach((s, i) => { if (gt >= s - 0.3) n = i + 1; });
  if (n) {
    T(g, `RULE ${n}/7`, 62, E.H - 58, { mono: true, size: 20, align: 'left', color: C.line });
    for (let i = 0; i < 7; i++) box(g, 190 + i * 30, E.H - 66, 20, 16, 3, i < n ? C.line : C.dim, i < n ? alpha(C.line, i === n - 1 ? 0.9 : 0.35) : null, 2);
  }
  if (!p.noCaptions) captions(g, gt);
}
function captions(g, gt) {
  const W = E.words; if (!W.length) return;
  let i = -1; for (let k = W.length - 1; k >= 0; k--) if (gt >= W[k].start - 0.05) { if (gt <= W[k].end + 0.4) i = k; break; } if (i < 0) return;
  let a = i; while (a > 0 && i - a < 5 && !/[.?!…]$/.test(W[a - 1].word)) a--;          // phrase = up to 6 words, never across a sentence end
  const grp = W.slice(a, i + 1).map(w => w.word.replace(/["“”]/g, '').toUpperCase());
  const size = 34; g.save(); g.font = `700 ${size}px "${MONO}"`; const sp = g.measureText(' ').width;
  const ws = grp.map(s => g.measureText(s).width), tot = ws.reduce((x, y) => x + y, 0) + sp * (grp.length - 1); g.restore();
  const y = E.H - 118; box(g, E.W / 2 - tot / 2 - 22, y - 30, tot + 44, 60, 8, null, 'rgba(1,3,6,0.72)');
  let x = E.W / 2 - tot / 2; grp.forEach((s, k) => { T(g, s, x, y + 1, { mono: true, size, align: 'left', color: k === grp.length - 1 ? C.line : 'rgba(233,246,255,0.82)' }); x += ws[k] + sp; });
}
// big statement text: lines [{str, at, col, size}] stacked around y; each appears at its local time
export function say(g, t, lines = [], o = {}) {
  const y0 = o.y ?? E.H / 2, gap = o.gap ?? 1.15; const sizes = lines.map(l => l.size || o.size || 92);
  const total = sizes.reduce((a, b) => a + b * gap, 0); let y = y0 - total / 2;
  lines.forEach((l, k) => {
    const s = sizes[k]; y += s * gap / 2; const a = ease.out(prog(t, l.at || 0, (l.at || 0) + 0.25));
    if (a > 0) { const n = l.type ? Math.floor(l.str.length * clamp((t - (l.at || 0)) / Math.max(0.3, l.str.length * 0.035))) : l.str.length;
      T(g, l.str.slice(0, n), (o.x ?? E.W / 2) , y + (1 - a) * 18, { size: s, color: l.col || C.white, alpha: a, spacing: l.sp ?? 2, align: o.align || 'center', mono: !!l.mono, glow: l.col === C.red ? 24 : 0, glowColor: alpha(C.red, 0.6) }); }
    y += s * gap / 2;
  });
}

// ---------- 1. cockpit: seen from the back seat, both front seats in frame ----------
// p: passenger ('empty'|'heat'|'you'|'mind'), driver ('you'|'void'|'mind'), beep, glance (local t), mirror ('tilt'), road (speed), lights
export function cockpit(g, t, p = {}) {
  const hz = 410, vx = E.W / 2;
  // windshield + road
  g.save(); g.beginPath(); g.moveTo(330, 150); g.lineTo(1590, 150); g.lineTo(1700, 520); g.lineTo(220, 520); g.closePath(); g.clip();
  g.fillStyle = '#04080c'; g.fillRect(0, 0, E.W, E.H);
  g.fillStyle = radGrad(g, vx, hz, 0, 700, [alpha(C.line, 0.07), alpha(C.line, 0)]); g.fillRect(0, 0, E.W, E.H);
  roadLines(g, t, { hz, vx, w0: 30, w1: 1500, yb: 520, speed: p.speed ?? 1, lights: p.lights ?? true, period: p.period ?? 3.2 });
  g.restore();
  line(g, [[330, 150], [1590, 150], [1700, 520], [220, 520]], 4, C.dim, true);
  // dashboard
  g.fillStyle = C.panel; g.beginPath(); g.moveTo(140, 560); g.quadraticCurveTo(E.W / 2, 470, 1780, 560); g.lineTo(1780, 640); g.lineTo(140, 640); g.closePath(); g.fill();
  g.strokeStyle = C.dim; g.lineWidth = 3; g.stroke();
  // seatbelt warning light on the dash
  const on = p.beep && blink(t);
  seatbeltIcon(g, vx, 560, 0.85, on ? C.red : alpha(C.grey, 0.5)); if (on) glow(g, vx, 560, 70, C.red, 0.4);
  // rear-view mirror
  const tilt = p.mirror === 'tilt' ? Math.sin(clamp((t - (p.mirrorAt ?? 0)) * 2) * 1.2) * 0.25 : 0;
  g.save(); g.translate(vx, 110); g.rotate(tilt); line(g, [[0, -60], [0, -24]], 5, C.dim); box(g, -150, -26, 300, 64, 18, C.line, '#060b10', 3);
  line(g, [[-120, 24], [120, 24]], 2, C.faint); g.restore();
  if (p.mirror === 'tilt' && t > (p.mirrorAt ?? 0)) xMark(g, vx + 200, 110, 26, t, (p.mirrorAt ?? 0) + 0.5);
  // steering wheel (driver side, left)
  const dx = 640, px = 1280;
  ring(g, dx, 610, 120, 12, C.line); ring(g, dx, 610, 120, 4, C.bg);
  // seats
  seatBack(g, dx, p.driver === 'void' ? C.void : null); seatBack(g, px, null);
  if (p.passenger === 'heat' || p.heat) heatGlow(g, px, 760, t, p.heatAmt ?? 1);
  // occupants
  const mindK = p.mindAt != null ? ease.inOut(prog(t, p.mindAt, p.mindAt + 2.2)) : null;
  if (p.driver === 'void') voidHead(g, dx, t); else if (p.driver !== 'empty') head(g, dx, C.line, p.driver === 'mind' ? 1 - (mindK ?? 0) * 0.85 : 1);
  if (p.passenger === 'you') head(g, px, C.white, 1);
  if (mindK != null) { const x = lerp(dx, px, mindK); headOutline(g, x, 360 - Math.sin(mindK * Math.PI) * 60, t); }
  if (p.driver !== 'void' && p.driver !== 'empty') { line(g, [[dx - 70, 470], [dx - 105, 560]], 10, C.line); line(g, [[dx + 70, 470], [dx + 105, 560]], 10, C.line); }
  // glance: dashed sightline driver -> passenger seat, struck out
  if (p.glance != null && t > p.glance) {
    const k = ease.out(prog(t, p.glance, p.glance + 0.5));
    line(g, [[dx + 40, 360], [lerp(dx + 40, px - 60, k), lerp(360, 470, k)]], 4, C.red, false, [14, 12], -t * 40);
    xMark(g, (dx + px) / 2, 410, 34, t, p.glance + 0.5);
  }
  if (p.checks) p.checks.forEach(([str, at], i) => { if (t > at) { chip(g, 300, 780 + i * 70, str, C.green, { size: 26, align: 'left' }); check(g, 270, 780 + i * 70, 16, t, at); } });
}
function seatBack(g, x, fill) {
  const pts = [[x - 170, E.H + 20], [x - 160, 520], [x - 120, 470], [x + 120, 470], [x + 160, 520], [x + 170, E.H + 20]];
  g.fillStyle = fill || '#070c11'; g.beginPath(); g.moveTo(...pts[0]); pts.slice(1).forEach(q => g.lineTo(...q)); g.closePath(); g.fill();
  line(g, pts, 4, fill ? C.red : C.line);
  box(g, x - 80, 330, 160, 120, 40, fill ? C.red : C.line, fill || '#070c11', 4); line(g, [[x - 40, 450], [x - 40, 470]], 6, C.dim); line(g, [[x + 40, 450], [x + 40, 470]], 6, C.dim);
}
function head(g, x, col, a = 1) { g.save(); g.globalAlpha *= a; ring(g, x, 300, 62, 6, col); line(g, [[x - 120, 470], [x - 95, 395], [x + 95, 395], [x + 120, 470]], 6, col); g.restore(); }
function headOutline(g, x, y, t) { g.save(); g.setLineDash([10, 9]); g.lineDashOffset = -t * 30; g.strokeStyle = C.white; g.lineWidth = 4; g.beginPath(); g.arc(x, y, 62, 0, Math.PI * 2); g.stroke();
  g.beginPath(); g.moveTo(x - 120, y + 170); g.lineTo(x - 95, y + 95); g.lineTo(x + 95, y + 95); g.lineTo(x + 120, y + 170); g.stroke(); g.restore(); }
function voidHead(g, x, t) {
  const j = noise(t * 3, 7) * 3; circle(g, x + j, 300, 66, C.void); ring(g, x + j, 300, 66, 4, C.red);
  g.fillStyle = C.void; g.beginPath(); g.moveTo(x - 130, 472); g.lineTo(x - 100, 390); g.lineTo(x + 100, 390); g.lineTo(x + 130, 472); g.closePath(); g.fill(); line(g, [[x - 130, 472], [x - 100, 390], [x + 100, 390], [x + 130, 472]], 4, C.red);
  line(g, [[x - 75, 470], [x - 105, 560]], 12, C.void); line(g, [[x + 75, 470], [x + 105, 560]], 12, C.void);
}
function heatGlow(g, x, y, t, amt) {
  const pulse = 0.75 + 0.25 * Math.sin(t * 5);
  g.save(); g.globalCompositeOperation = 'lighter';
  for (const [dx, dy, r, c] of [[0, -120, 110, C.red], [0, 10, 150, C.red], [-60, 120, 80, C.amber], [60, 120, 80, C.amber]]) { g.fillStyle = radGrad(g, x + dx, y + dy, 0, r, [alpha(c, 0.5 * amt * pulse), alpha(c, 0)]); g.fillRect(x + dx - r, y + dy - r, r * 2, r * 2); }
  g.restore();
}
export function roadLines(g, t, o) {
  const { hz, vx, w0, w1, yb, speed = 1, lights = false, period = 2.2 } = o;
  const X = (u, y) => vx + u * lerp(w0, w1, (y - hz) / (yb - hz)) / 2;
  line(g, [[X(-1, hz), hz], [X(-1, yb), yb]], 3, C.dim); line(g, [[X(1, hz), hz], [X(1, yb), yb]], 3, C.dim);
  for (let k = 0; k < 14; k++) { const z = ((k / 14 + t * 0.35 * speed) % 1); const y1 = hz + (yb - hz) * z * z, y2 = hz + (yb - hz) * Math.min(1, (z + 0.03) ** 2); line(g, [[X(0, y1), y1], [X(0, y2), y2]], 2 + 6 * z, alpha(C.line, 0.25 + 0.6 * z)); }
  line(g, [[0, hz], [E.W, hz]], 2, C.faint);
  if (lights) for (let k = 0; k < 4; k++) { const z = ((k / 4 + t / (period * 4) * speed) % 1), y = hz + (yb - hz) * z * z, s = 0.2 + z;
    for (const side of [-1.25, 1.25]) { const x = X(side, y); line(g, [[x, y], [x, y - 220 * s]], 2 + 3 * s, alpha(C.line, 0.4)); glow(g, x - side * 20 * s, y - 220 * s, 90 * s, C.amber, 0.6); g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = radGrad(g, X(side * 0.6, y), y, 0, 260 * s, [alpha(C.amber, 0.22), alpha(C.amber, 0)]); g.fillRect(X(side * 0.6, y) - 300 * s, y - 300 * s, 600 * s, 600 * s); g.restore(); } }
}

// ---------- 2. top-down car (the app view) ----------
// p: passenger ('empty'|'bag'|'groceries'|'pizza'|'heat'|'you'), moving, lights, motion (rear sensor sweep, local t), toss (local t), vanish (local t), parked, weight
export function carTop(g, t, p = {}) {
  const cx = p.cx ?? E.W / 2, cy = p.cy ?? E.H / 2 + 20, s = p.s ?? 1.12;
  g.save(); g.translate(cx, cy); g.scale(s, s);
  if (p.moving) { for (const x of [-300, 300]) for (let k = 0; k < 8; k++) { const y = ((k * 140 + t * 420) % 1120) - 560; line(g, [[x, y], [x, y + 70]], 5, C.dim); }
    if (p.lights) for (let k = 0; k < 3; k++) { const y = ((k * 380 + t * 420) % 1140) - 570; for (const x of [-430, 430]) { g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = radGrad(g, x, y, 0, 260, [alpha(C.amber, 0.28), alpha(C.amber, 0)]); g.fillRect(x - 260, y - 260, 520, 520); g.restore(); circle(g, x, y, 10, C.amber); } } }
  // body
  box(g, -170, -330, 340, 660, 90, C.line, '#060b10', 4);
  line(g, [[-140, -200], [140, -200], [120, -130], [-120, -130]], 3, C.dim, true);       // windshield
  line(g, [[-130, 230], [130, 230], [115, 290], [-115, 290]], 3, C.dim, true);           // rear window
  ring(g, -70, -95, 34, 5, C.line);                                                       // steering wheel
  const seats = { fl: [-72, -20], fr: [72, -20], rl: [-72, 140], rr: [72, 140] };
  for (const [k, [x, y]] of Object.entries(seats)) box(g, x - 52, y - 50, 104, 104, 22, k === 'fr' && p.passenger !== 'empty' && p.passenger !== 'you' ? C.red : C.dim, '#081018', 3);
  // driver (top-down head + shoulders)
  circle(g, -72, -24, 26, C.line); line(g, [[-118, 6], [-26, 6]], 10, C.line);
  // passenger contents
  const [fx, fy] = seats.fr; const vk = p.vanish != null ? 1 - ease.in(prog(t, p.vanish, p.vanish + 0.8)) : 1;
  g.save(); g.globalAlpha *= vk;
  if (p.passenger === 'bag') { box(g, fx - 34, fy - 24, 68, 54, 8, C.white, null, 4); line(g, [[fx - 16, fy - 24], [fx - 10, fy - 40], [fx + 10, fy - 40], [fx + 16, fy - 24]], 4, C.white); }
  if (p.passenger === 'groceries') { box(g, fx - 36, fy - 30, 72, 64, 6, C.white, null, 4); circle(g, fx - 12, fy - 34, 13, C.green); circle(g, fx + 14, fy - 30, 11, C.amber); }
  if (p.passenger === 'pizza') { box(g, fx - 40, fy - 40, 80, 80, 4, C.white, null, 4); T(g, 'PIZZA', fx, fy, { mono: true, size: 16, color: C.white });
    if (p.belt) line(g, [[fx - 50, fy - 50], [fx + 50, fy + 50]], 7, C.red); }
  if (p.passenger === 'you') { circle(g, fx, fy - 4, 26, C.white); line(g, [[fx - 46, fy + 26], [fx + 46, fy + 26]], 10, C.white); }
  g.restore();
  if (p.passenger === 'heat') heatGlow(g, fx, fy, t, 0.8);
  if (p.toss != null) { const k = ease.inOut(prog(t, p.toss, p.toss + 0.9)); if (k > 0 && k < 1) { const x = lerp(-220, fx, k), y = lerp(-20, fy, k) - Math.sin(k * Math.PI) * 120; box(g, x - 30, y - 22, 60, 46, 8, C.white, null, 4); }
    if (t > p.toss + 0.3) xMark(g, fx, fy, 60, t, p.toss + 0.3); }
  if (p.motion != null && t > p.motion) { FX.rings(g, 0, 140, t, { count: 4, r0: 20, r1: 190, speed: 0.9, color: C.line, a: 0.7, w: 3 }); circle(g, 0, 140, 8, C.line); }
  if (p.shape != null) { const k = ease.inOut(prog(t, p.shape, p.shape + 1.4)); g.save(); g.globalAlpha *= k; circle(g, 40, 120, 40, C.void); ring(g, 40, 120, 40, 4, C.red); g.fillStyle = C.void; g.fillRect(-20, 150, 120, 60); line(g, [[-20, 150], [100, 150]], 4, C.red); g.restore(); }
  if (p.alarm != null && t > p.alarm) { const on = blink(t, 2.5); for (const [x, y] of [[-150, -320], [150, -320], [-150, 320], [150, 320]]) if (on) glow(g, x, y, 90, C.amber, 0.8); }
  if (p.lock != null && t > p.lock) lockIcon(g, 0, -420, t, p.lock);
  g.restore();
}
export function lockIcon(g, x, y, t, at = 0) { const k = ease.outBack(prog(t, at, at + 0.4)); if (k <= 0) return; g.save(); g.translate(x, y); g.scale(k, k); box(g, -30, -6, 60, 48, 8, C.green, alpha(C.green, 0.15), 4); g.beginPath(); g.arc(0, -6, 20, Math.PI, 0); g.strokeStyle = C.green; g.lineWidth = 5; g.stroke(); g.restore(); }

// ---------- 3. road POV with beep meter ----------
// p: lights, period, beepMode ('dark'|'none'), noneAt (local), meter (bool)
export function roadPOV(g, t, p = {}) {
  const hz = 430, yb = 900; const period = p.period ?? 2.4;
  g.fillStyle = '#04080c'; g.fillRect(0, 0, E.W, E.H);
  roadLines(g, t, { hz, vx: E.W / 2, w0: 24, w1: 2400, yb, speed: 1.2, lights: p.lights, period });
  g.fillStyle = C.panel; g.beginPath(); g.moveTo(0, 860); g.quadraticCurveTo(E.W / 2, 760, E.W, 860); g.lineTo(E.W, E.H); g.lineTo(0, E.H); g.closePath(); g.fill(); g.strokeStyle = C.dim; g.lineWidth = 3; g.stroke();
  const lit = p.lights ? underLight(t, period) : false;
  const beeping = p.beepMode === 'none' ? (p.noneAt == null || t < p.noneAt) && !lit : !lit;
  const on = beeping && blink(t);
  seatbeltIcon(g, E.W / 2, 850, 1, on ? C.red : alpha(C.grey, 0.5)); if (on) { glow(g, E.W / 2, 850, 90, C.red, 0.45); }
  if (p.meter) beepMeter(g, t, { period, lights: p.lights, beepMode: p.beepMode, noneAt: p.noneAt });
}
const underLight = (t, period) => ((t / period) % 1) < 0.32;
export function beepMeter(g, t, p) {
  const x0 = 260, x1 = E.W - 260, y = 230, span = 8;
  box(g, x0 - 30, y - 70, x1 - x0 + 60, 140, 12, C.dim, 'rgba(6,11,16,0.85)', 2);
  T(g, 'SEATBELT CHIME', x0, y - 44, { mono: true, size: 18, align: 'left', color: C.line });
  for (let k = 0; k <= 160; k++) { const tt = t - span + (k / 160) * span; if (tt < 0) continue; const x = lerp(x0, x1, k / 160);
    const lit = p.lights && underLight(tt, p.period ?? 2.4); if (lit) { g.fillStyle = alpha(C.amber, 0.25); g.fillRect(x, y - 30, (x1 - x0) / 160 + 1, 60); }
    const beeps = !lit && !(p.beepMode === 'none' && p.noneAt != null && tt >= p.noneAt); if (beeps && (tt * 1.25) % 1 < 0.08) line(g, [[x, y - 26], [x, y + 26]], 4, C.red); }
  line(g, [[x0, y + 36], [x1, y + 36]], 2, C.faint); line(g, [[x1, y - 40], [x1, y + 40]], 3, C.white);
}

// ---------- 4. weight sensor: seat cross-section + readout ----------
export function sensor(g, t, p = {}) {
  const x = 640, y = 760;
  line(g, [[x - 230, y], [x + 170, y], [x + 190, y - 70], [x - 210, y - 80]], 5, C.line, true);       // cushion
  line(g, [[x - 210, y - 80], [x - 260, y - 480], [x - 160, y - 490], [x - 120, y - 80]], 5, C.line);  // back
  box(g, x - 300, y - 600, 150, 100, 30, C.line, null, 5);                                             // headrest
  line(g, [[x - 120, y], [x - 140, y + 130]], 6, C.dim); line(g, [[x + 120, y], [x + 140, y + 130]], 6, C.dim);
  const k = ease.out(prog(t, p.padAt ?? 0.3, (p.padAt ?? 0.3) + 0.6));
  box(g, x - 200, y - 46, 360 * k + 1, 26, 6, C.amber, alpha(C.amber, 0.2), 3);
  if (k > 0.9) { T(g, 'WEIGHT SENSOR', x - 20, y + 60, { mono: true, size: 22, color: C.amber }); line(g, [[x - 20, y + 40], [x - 20, y - 20]], 2, C.amber, false, [6, 6]); }
  if (p.outline != null) { const a = ease.inOut(prog(t, p.outline, p.outline + 1.2)); g.save(); g.globalAlpha *= a; g.setLineDash([12, 10]); g.lineDashOffset = -t * 30; g.strokeStyle = p.outlineCol || C.white; g.lineWidth = 4;
    g.beginPath(); g.arc(x - 170, y - 560, 52, 0, Math.PI * 2); g.moveTo(x - 160, y - 500); g.lineTo(x - 120, y - 120); g.lineTo(x + 120, y - 110); g.lineTo(x + 170, y + 120); g.stroke(); g.restore(); }
  // readout panel
  const px = 1080, py = 300; box(g, px, py, 620, 470, 18, C.dim, 'rgba(6,11,16,0.9)', 3);
  T(g, 'PASSENGER SEAT', px + 40, py + 56, { mono: true, size: 24, align: 'left', color: C.line });
  T(g, 'OCCUPANT WEIGHT', px + 40, py + 130, { mono: true, size: 20, align: 'left', color: C.grey });
  const wv = p.weight == null ? 0 : p.weight * ease.out(prog(t, p.weighAt ?? 0.5, (p.weighAt ?? 0.5) + 2.2));
  T(g, `${wv.toFixed(1)} kg`, px + 40, py + 210, { size: 110, align: 'left', color: wv > 30 ? C.red : C.white });
  T(g, 'CLASS', px + 40, py + 300, { mono: true, size: 20, align: 'left', color: C.grey });
  const cls = wv > 30 ? (p.cls || 'ADULT') : wv > 1 ? 'OBJECT' : 'EMPTY';
  T(g, cls, px + 40, py + 345, { mono: true, size: 34, align: 'left', color: wv > 30 ? C.red : C.white });
  if (wv > 30) { seatbeltIcon(g, px + 520, py + 330, 1, blink(t) ? C.red : alpha(C.red, 0.3)); T(g, 'BUCKLE UP', px + 520, py + 420, { mono: true, size: 20, color: C.red }); }
}

// ---------- 5. rule card (push notification) ----------
export function ruleCard(g, t, p) {
  const k = ease.outBack(prog(t, 0, 0.45)), y = lerp(-260, E.H / 2 - 40, k), w = 1300, h = 360;
  box(g, E.W / 2 - w / 2, y - h / 2, w, h, 28, C.line, 'rgba(8,14,20,0.97)', 3);
  seatbeltIcon(g, E.W / 2 - w / 2 + 80, y - h / 2 + 70, 0.6, C.red);
  T(g, `NIGHT SUPPORT · RULE ${String(p.n).padStart(2, '0')} OF 07`, E.W / 2 - w / 2 + 130, y - h / 2 + 68, { mono: true, size: 24, align: 'left', color: C.line });
  T(g, 'now', E.W / 2 + w / 2 - 50, y - h / 2 + 68, { mono: true, size: 20, align: 'right', color: C.grey });
  const words = p.title, n = Math.floor(words.length * clamp((t - 0.35) / Math.max(0.4, words.length * 0.028)));
  const lines = wrap(words.slice(0, n), 26, words);
  const nl = wrap(words, 26, words).length; lines.forEach((s, i) => T(g, s, E.W / 2, y - 10 + i * 96 - (nl - 1) * 44, { size: 96, color: C.white, spacing: 3 }));
  line(g, [[E.W / 2 - 200, y + h / 2 - 70], [E.W / 2 + 200, y + h / 2 - 70]], 4, C.red);
  for (let i = 0; i < 7; i++) box(g, E.W / 2 - 3.5 * 46 + i * 46 + 6, y + h / 2 - 48, 34, 14, 4, i < p.n ? C.line : C.dim, i === p.n - 1 ? C.line : i < p.n ? alpha(C.line, 0.3) : null, 2);
}
function wrap(s, max, full = s) {                        // balanced two-line wrap, decided on the full title so typing does not reflow
  if (full.length <= max) return [s]; const ws = full.split(' '); let best = 1, bd = 1e9;
  for (let i = 1; i < ws.length; i++) { const d = Math.abs(ws.slice(0, i).join(' ').length - ws.slice(i).join(' ').length); if (d < bd) { bd = d; best = i; } }
  const l1 = ws.slice(0, best).join(' '); return s.length <= l1.length ? [s] : [l1, s.slice(l1.length + 1)];
}

// ---------- 6. seven-rule overview ----------
export function rules7(g, t, p) {
  const s = 150, gap = 40, x0 = E.W / 2 - (7 * s + 6 * gap) / 2, y = E.H / 2 - 40;
  for (let i = 0; i < 7; i++) { const a = ease.out(prog(t, i * 0.08, i * 0.08 + 0.3)); if (a <= 0) continue; const x = x0 + i * (s + gap);
    const seventh = i === 6, homeOn = !seventh && t > p.homeAt + i * 0.12, whoOn = seventh && t > p.whoAt;
    box(g, x, y - s / 2, s, s, 16, seventh ? (whoOn ? C.red : C.dim) : homeOn ? C.green : C.line, seventh && whoOn ? alpha(C.red, 0.12) : homeOn ? alpha(C.green, 0.1) : null, 4);
    T(g, String(i + 1), x + s / 2, y - (homeOn ? 20 : 0), { size: 80, color: seventh && whoOn ? C.red : C.white, alpha: a });
    if (homeOn) check(g, x + s / 2, y + 40, 18, t, p.homeAt + i * 0.12); if (whoOn) T(g, '?', x + s / 2, y + 44, { size: 50, color: C.red }); }
  if (t > p.homeAt) { line(g, [[x0, y + 120], [x0 + 6 * (s + gap) - gap, y + 120]], 3, C.green); T(g, 'GET YOU HOME', x0 + (6 * (s + gap) - gap) / 2, y + 160, { mono: true, size: 28, color: C.green }); }
  if (t > p.whoAt) T(g, 'WHO DROVE?', x0 + 6 * (s + gap) + s / 2, y + 160, { mono: true, size: 28, color: C.red });
}

// ---------- 7. infotainment radio ----------
// p: mode ('change'|'taste'|'volume'), stations [], at
export function radio(g, t, p = {}) {
  const x = E.W / 2 - 520, y = 230, w = 1040, h = 560;
  box(g, x, y, w, h, 26, C.line, 'rgba(6,11,16,0.95)', 3);
  T(g, 'AUDIO', x + 40, y + 50, { mono: true, size: 22, align: 'left', color: C.grey }); T(g, 'FM', x + w - 40, y + 50, { mono: true, size: 22, align: 'right', color: C.grey });
  const st = p.stations || ['88.1', '88.1', '93.7', '101.3', '66.0'];
  const idx = Math.min(st.length - 1, Math.max(0, Math.floor((t - (p.at ?? 0.6)) / 0.7) + 1));
  const sweeping = p.mode === 'change' && t > (p.at ?? 0.6) && idx < st.length - 1 && ((t - (p.at ?? 0.6)) % 0.7) < 0.25;
  T(g, sweeping ? '--.-' : (p.mode === 'change' ? st[idx] : st[st.length - 1]), x + w / 2, y + 210, { size: 200, color: C.white, spacing: 6 });
  if (p.mode === 'change' && t > (p.at ?? 0.6)) chip(g, x + w / 2, y + 340, 'SOURCE: PASSENGER SEAT', C.red, { size: 24 });
  if (p.mode === 'taste') { T(g, 'NOW PLAYING: ██████ — █████', x + w / 2, y + 330, { mono: true, size: 30, color: C.white });
    for (let i = 0; i < 5; i++) T(g, '★', x + w / 2 - 120 + i * 60, y + 410, { size: 50, color: i < 1 ? C.amber : C.dim }); if (t > (p.xAt ?? 1.2)) { chip(g, x + w / 2, y + 480, 'DO NOT SAY SO', C.red, { size: 24 }); } }
  // volume bar
  const vol = p.mode === 'volume' ? ease.inOut(prog(t, p.at ?? 0.5, (p.at ?? 0.5) + 2.5)) * 0.9 + 0.1 : 0.35;
  for (let i = 0; i < 24; i++) box(g, x + 60 + i * 38, y + h - 70, 26, 34, 4, null, i / 24 < vol ? (i > 18 ? C.red : C.line) : C.faint);
  if (p.mode === 'volume' && t > (p.hideAt ?? 3)) { const a = ease.out(prog(t, p.hideAt ?? 3, (p.hideAt ?? 3) + 0.8));
    for (let k = 0; k < 60; k++) { const xx = x + 80 + k * 15, hh = (Math.abs(noise(k * 0.7 + t * 6, 4)) * 40 + 4) * a; line(g, [[xx, y + 400 - hh], [xx, y + 400 + hh]], 4, alpha(C.red, 0.6)); }
    T(g, 'UNDERNEATH: KNOCKING', x + w / 2, y + 470, { mono: true, size: 22, color: alpha(C.red, a) }); }
}

// ---------- 8. icon list struck out one by one ----------
export function crossList(g, t, p) {
  const items = p.items, x0 = E.W / 2 - (items.length - 1) * 220;
  items.forEach(([lbl, at], i) => { const x = x0 + i * 440, y = E.H / 2 - 30, a = ease.out(prog(t, at - 0.2, at + 0.1)); if (a <= 0) return;
    g.save(); g.globalAlpha *= a; box(g, x - 150, y - 150, 300, 300, 30, C.line, 'rgba(6,11,16,0.9)', 4); icon(g, lbl, x, y - 20); T(g, lbl, x, y + 100, { mono: true, size: 30, color: C.white }); g.restore();
    xMark(g, x, y - 20, 90, t, at + 0.25); });
}
function icon(g, k, x, y) {
  if (k === 'GAS') { box(g, x - 45, y - 60, 70, 110, 8, C.line, null, 5); box(g, x - 32, y - 45, 44, 30, 4, C.line, null, 3); line(g, [[x + 25, y - 40], [x + 50, y - 20], [x + 50, y + 30]], 5, C.line); }
  if (k === 'FOOD') { line(g, [[x - 60, y - 10], [x + 60, y - 10]], 6, C.line); g.beginPath(); g.arc(x, y - 10, 60, Math.PI, 0); g.strokeStyle = C.line; g.lineWidth = 5; g.stroke(); box(g, x - 60, y + 6, 120, 34, 14, C.line, null, 5); }
  if (k === 'TIRES') { ring(g, x, y, 62, 10, C.line); ring(g, x, y, 24, 5, C.line); for (let i = 0; i < 6; i++) { const a = i * Math.PI / 3; line(g, [[x + Math.cos(a) * 26, y + Math.sin(a) * 26], [x + Math.cos(a) * 52, y + Math.sin(a) * 52]], 4, C.line); } }
}

// ---------- 9. red light / window tap (side view) ----------
export function redLight(g, t, p = {}) {
  const z = p.zoom ?? 1; g.save(); g.translate(E.W / 2, E.H / 2); g.scale(z, z); g.translate(-E.W / 2 + (p.panX ?? 0), -E.H / 2);
  line(g, [[0, 820], [E.W, 820]], 3, C.dim);
  // traffic light
  line(g, [[1560, 820], [1560, 330]], 6, C.dim); box(g, 1510, 150, 100, 250, 20, C.line, '#060b10', 4);
  circle(g, 1560, 205, 32, C.red); glow(g, 1560, 205, 140, C.red, 0.6); ring(g, 1560, 275, 32, 3, C.dim); ring(g, 1560, 345, 32, 3, C.dim);
  // car, side profile facing right (driver side toward us)
  const cx = 820; line(g, [[cx - 470, 760], [cx - 460, 640], [cx - 300, 620], [cx - 190, 500], [cx + 170, 495], [cx + 300, 610], [cx + 470, 640], [cx + 480, 760], [cx - 470, 760]], 5, C.line);
  ring(g, cx - 280, 770, 66, 6, C.line); ring(g, cx + 290, 770, 66, 6, C.line);
  line(g, [[cx - 170, 515], [cx - 20, 512], [cx - 20, 615], [cx - 280, 620]], 4, C.dim, true);                     // rear side window
  line(g, [[cx + 5, 512], [cx + 160, 510], [cx + 270, 610], [cx + 5, 615]], 4, C.line, true);                       // driver window
  // driver silhouette inside the front window
  ring(g, cx + 120, 560, 30, 5, C.line); line(g, [[cx + 90, 615], [cx + 120, 592], [cx + 165, 600]], 6, C.line);
  // taps: knuckle marks on the driver window, from outside
  (p.taps || []).forEach((at, i) => { if (t < at) return; const k = prog(t, at, at + 0.6), x = cx + 200 + i * 18, y = 545 + i * 14;
    ring(g, x, y, 10 + k * 46, 4 * (1 - k) + 1, alpha(C.red, 1 - k)); circle(g, x, y, 7, C.red); if (k < 0.5) T(g, 'TAP', x + 40, y - 30, { mono: true, size: 22, color: C.red, alpha: 1 - k * 2 }); });
  g.restore();
}

// ---------- 10. phone notification ----------
export function phone(g, t, p = {}) {
  const x = E.W / 2, y = E.H / 2 + 10, w = 420, h = 820; const buzz = t > (p.at ?? 0.6) && t < (p.at ?? 0.6) + 1.2 ? Math.sin(t * 90) * 6 : 0;
  g.save(); g.translate(buzz, 0); box(g, x - w / 2, y - h / 2, w, h, 56, C.line, '#05090d', 5); box(g, x - 60, y - h / 2 + 22, 120, 26, 13, null, '#000');
  T(g, '3:33', x, y - 230, { size: 120, color: C.white }); T(g, 'Sunday', x, y - 150, { mono: true, size: 22, color: C.grey });
  const k = ease.outBack(prog(t, p.at ?? 0.6, (p.at ?? 0.6) + 0.5));
  if (k > 0) { const ny = lerp(y - h / 2, y - 40, k); box(g, x - w / 2 + 20, ny - 70, w - 40, 150, 22, C.dim, 'rgba(20,30,40,0.97)', 2);
    box(g, x - w / 2 + 40, ny - 50, 46, 46, 10, null, C.red); T(g, '!', x - w / 2 + 63, ny - 26, { size: 36, color: C.white });
    T(g, 'VEHICLE ALERT', x - w / 2 + 100, ny - 28, { mono: true, size: 20, align: 'left', color: C.white });
    T(g, 'Movement detected', x - w / 2 + 40, ny + 20, { mono: true, size: 22, align: 'left', color: C.white });
    T(g, 'in rear seat.', x - w / 2 + 40, ny + 52, { mono: true, size: 22, align: 'left', color: C.white }); }
  if (buzz) for (const sd of [-1, 1]) for (let i = 0; i < 2; i++) line(g, [[x + sd * (w / 2 + 30 + i * 22), y - 60], [x + sd * (w / 2 + 30 + i * 22), y + 60]], 4, C.line);
  g.restore();
  if (p.noAt != null && t > p.noAt) { const a = ease.out(prog(t, p.noAt, p.noAt + 0.3)); T(g, 'DO NOT', 1500, 470, { size: 96, color: C.red, glow: 20, glowColor: alpha(C.red, 0.6), alpha: a }); T(g, 'GO BACK.', 1500, 580, { size: 96, color: C.red, glow: 20, glowColor: alpha(C.red, 0.6), alpha: a }); }
}

// ---------- 11. park & walk ----------
export function park(g, t, p = {}) {
  box(g, 1240, 260, 420, 520, 10, C.line, null, 4); T(g, 'HOME', 1450, 520, { mono: true, size: 34, color: C.line }); box(g, 1220, 470, 30, 110, 4, C.green, alpha(C.green, 0.2), 3);
  line(g, [[300, 900], [1240, 900]], 2, C.faint); line(g, [[300, 160], [1240, 160]], 2, C.faint);
  carTop(g, t, { cx: 620, cy: 530, s: 0.95, passenger: 'empty', lock: p.lockAt });
  const k = ease.inOut(prog(t, p.walkAt ?? 0.8, (p.walkAt ?? 0.8) + 2.2)); const wx = lerp(780, 1200, k), wy = lerp(470, 525, k);
  if (t > (p.walkAt ?? 0.8) - 0.3) { circle(g, wx, wy, 24, C.white); line(g, [[wx - 40, wy + 28], [wx + 40, wy + 28]], 10, C.white); for (let i = 1; i < 6; i++) if (k * 6 > i) circle(g, lerp(780, 1200, i / 6), lerp(470, 525, i / 6) + 50, 5, C.dim); }
}

// ---------- 12. route with no memory ----------
export function route(g, t, p = {}) {
  for (let i = 0; i < 9; i++) line(g, [[160, 180 + i * 90], [E.W - 160, 180 + i * 90]], 2, C.faint); for (let i = 0; i < 18; i++) line(g, [[160 + i * 94, 180], [160 + i * 94, 900]], 2, C.faint);
  const pts = [[260, 820], [260, 560], [640, 560], [640, 360], [1060, 360], [1060, 640], [1420, 640], [1420, 280], [1660, 280]];
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  const k = ease.inOut(prog(t, 0.2, p.drawDur ?? 2.5)); let left = k * tot; const drawn = [pts[0]];
  for (let i = 1; i < pts.length && left > 0; i++) { const f = Math.min(1, left / L[i - 1]); drawn.push([lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]); left -= L[i - 1]; }
  line(g, drawn, 8, C.line);
  chip(g, 260, 870, 'WORK', C.white, { size: 22 }); if (k > 0.98) chip(g, 1660, 230, 'HOME', C.green, { size: 22 });
  if (p.gapAt != null) { const a = ease.out(prog(t, p.gapAt, p.gapAt + 0.5)); g.save(); g.globalAlpha *= a; box(g, 420, 300, 1160, 400, 12, C.white, 'rgba(5,7,10,0.92)', 3); T(g, 'NO MEMORY OF THIS DRIVE', E.W / 2, 500, { mono: true, size: 52, color: C.white }); g.restore(); }
  (p.marks || []).forEach(([lbl, at], i) => { if (t > at) chip(g, 640 + i * 360, 790, lbl, C.amber, { size: 26 }); });
}

// ---------- 13. autopilot head ----------
export function autopilot(g, t, p = {}) {
  const x = 760, y = 520;
  g.save(); g.strokeStyle = C.line; g.lineWidth = 6; g.beginPath(); g.moveTo(x - 60, y + 260); g.lineTo(x - 60, y + 160); g.bezierCurveTo(x - 210, y + 120, x - 230, y - 60, x - 160, y - 160); g.bezierCurveTo(x - 60, y - 290, x + 170, y - 270, x + 210, y - 110);
  g.lineTo(x + 250, y - 10); g.lineTo(x + 210, y + 10); g.lineTo(x + 215, y + 80); g.bezierCurveTo(x + 180, y + 110, x + 120, y + 110, x + 90, y + 130); g.lineTo(x + 90, y + 260); g.stroke(); g.restore();
  box(g, x - 140, y - 170, 260, 170, 70, C.dim, alpha(C.line, 0.06), 3);
  chip(g, x - 10, y - 85, 'AUTOPILOT', C.line, { size: 26 });
  if (p.badgeAt != null && t > p.badgeAt) chip(g, x, y - 360, 'HIGHWAY HYPNOSIS  ·  REAL', C.amber, { size: 26 });
  if (p.mindAt != null) { const k = ease.inOut(prog(t, p.mindAt, p.mindAt + 3)); const mx = lerp(x - 10, 1420, k), my = lerp(y - 85, 380, k) - Math.sin(k * Math.PI) * 90;
    g.save(); g.setLineDash([10, 9]); g.lineDashOffset = -t * 30; g.strokeStyle = C.white; g.lineWidth = 4; g.beginPath(); g.arc(mx, my, 54, 0, Math.PI * 2); g.stroke(); g.restore();
    if (k > 0.2) T(g, 'YOUR MIND', mx, my + 90, { mono: true, size: 22, color: C.white }); }
}

// ---------- 14. checklist ----------
export function checklist(g, t, p) {
  (p.rows || []).forEach(([str, ok, at], i) => { if (t < at - 0.1) return; const y = E.H / 2 - (p.rows.length - 1) * 70 + i * 140, a = ease.out(prog(t, at - 0.1, at + 0.2));
    T(g, str, E.W / 2 - 330, y, { size: 84, align: 'left', color: ok ? C.white : C.red, alpha: a, spacing: 2 }); (ok ? check : xMark)(g, E.W / 2 - 410, y, 34, t, at); });
}

// ---------- 15. end card ----------
export function endCard(g, t, p = {}) {
  const a = ease.out(prog(t, 0, 0.6)); ring(g, E.W / 2, 330, 80, 6, alpha(C.line, a)); seatbeltIcon(g, E.W / 2, 334, 1.1, alpha(C.line, a));
  T(g, 'NIGHT SUPPORT', E.W / 2, 500, { size: 120, color: C.white, spacing: 14, alpha: a });
  T(g, 'CALL 001  ·  THE EMPTY PASSENGER SEAT', E.W / 2, 580, { mono: true, size: 26, color: C.line, alpha: a });
  (p.lines || []).forEach(([str, at, col], i) => { if (t > at) T(g, str, E.W / 2, 700 + i * 70, { mono: true, size: 34, color: col || C.white, alpha: ease.out(prog(t, at, at + 0.4)) }); });
}
