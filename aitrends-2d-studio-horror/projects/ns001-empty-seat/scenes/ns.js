// scenes/ns.js — NIGHT SUPPORT look (v2): bold solid-white pictograms on pure black, warm amber light,
// red = danger, green = safe, heavy Montserrat type, sentence captions. Every template is draw(g, t, p)
// in logical 1920×1080 units; shapes are separated by black gaps instead of outlines.
import { E, clamp, lerp, prog, ease, noise, alpha, rr, circle, ring, radGrad, glow, text } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const C = { bg: '#050505', white: '#f2f2f2', grey: '#2a2a2a', mid: '#5c5c5c', dark: '#151515', amber: '#ffc04d',
  red: '#ff3b30', green: '#34c759', void: '#000000' };
export const FONT = 'Montserrat';

for (const w of ['600', '700', '800', '900']) {
  try { const ff = new FontFace(FONT, `url(/project/assets/fonts/montserrat-latin-${w}-normal.woff2)`, { weight: w }); await ff.load(); document.fonts.add(ff); } catch (e) { console.log('font missing', FONT, w); }
}

const CLOCK0 = 3 * 3600 + 7 * 60, CLOCK_RATE = (34 * 60) / 226;    // 03:07 AM → 03:41 AM across the video

// ---------- primitives ----------
export const T = (g, str, x, y, o = {}) => text(g, str, x, y, { font: FONT, weight: 900, color: C.white, ...o });
export function line(g, pts, w = 6, col = C.white, close = false, dash = null, off = 0) {
  g.save(); g.strokeStyle = col; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round'; if (dash) { g.setLineDash(dash); g.lineDashOffset = off; }
  g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); if (close) g.closePath(); g.stroke(); g.restore();
}
export function fillPoly(g, pts, col) { g.fillStyle = col; g.beginPath(); g.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) g.lineTo(pts[i][0], pts[i][1]); g.closePath(); g.fill(); }
export function box(g, x, y, w, h, r, fill = C.white, stroke = null, lw = 4) { rr(g, x, y, w, h, r); if (fill) { g.fillStyle = fill; g.fill(); } if (stroke) { g.strokeStyle = stroke; g.lineWidth = lw; g.stroke(); } }
export function pill(g, x, y, str, col = C.white, o = {}) {
  const size = o.size || 24; g.save(); g.font = `800 ${size}px "${FONT}"`; const w = g.measureText(str).width + size * 1.6, h = size * 1.9; g.restore();
  const x0 = o.align === 'left' ? x : o.align === 'right' ? x - w : x - w / 2;
  if (o.solid) { box(g, x0, y - h / 2, w, h, h / 2, col); T(g, str, x0 + w / 2, y + 1, { size, weight: 800, color: C.bg }); }
  else { box(g, x0, y - h / 2, w, h, h / 2, alpha(col, 0.12), col, 3); T(g, str, x0 + w / 2, y + 1, { size, weight: 800, color: col }); }
  return w;
}
export const chip = pill;
export function amberGlow(g, x, y, r, a = 0.6) { glow(g, x, y, r, C.amber, a); }
export function xMark(g, x, y, s, t, at = 0, col = C.red) {
  const k1 = ease.out(prog(t, at, at + 0.16)), k2 = ease.out(prog(t, at + 0.1, at + 0.26)); if (k1 <= 0) return;
  glow(g, x, y, s * 1.8, col, 0.3 * k1);
  line(g, [[x - s, y - s], [lerp(x - s, x + s, k1), lerp(y - s, y + s, k1)]], s * 0.34, col);
  if (k2 > 0) line(g, [[x + s, y - s], [lerp(x + s, x - s, k2), lerp(y - s, y + s, k2)]], s * 0.34, col);
}
export function check(g, x, y, s, t, at = 0, col = C.green) {
  const k = ease.out(prog(t, at, at + 0.3)); if (k <= 0) return; circle(g, x, y, s * 1.35 * Math.min(1, k * 1.5), col);
  const a = clamp(k * 2 - 0.4), b = clamp(k * 2 - 1);
  if (a > 0) line(g, [[x - s * 0.55, y], [lerp(x - s * 0.55, x - s * 0.12, a), lerp(y, y + s * 0.45, a)]], s * 0.3, C.white);
  if (b > 0) line(g, [[x - s * 0.12, y + s * 0.45], [lerp(x - s * 0.12, x + s * 0.6, b), lerp(y + s * 0.45, y - s * 0.45, b)]], s * 0.3, C.white);
}
export function seatbeltIcon(g, x, y, s, col) {          // dashboard pictogram: seated figure + diagonal belt, solid
  g.save(); g.translate(x, y); g.scale(s, s);
  circle(g, 2, -38, 13, col);
  line(g, [[0, -18], [-2, 16], [24, 18], [28, 44]], 14, col);
  line(g, [[-2, -10], [18, 6]], 10, col);
  line(g, [[-18, -24], [16, 24]], 9, C.bg); line(g, [[-18, -24], [16, 24]], 4, col);
  g.restore();
}
const blink = (t, hz = 1.25) => (t * hz) % 1 < 0.55;
function person(g, x, y, s, col = C.white, pose = 'stand') {   // airport-sign figure, feet at (x, y)
  g.save(); g.translate(x, y); g.scale(s, s);
  circle(g, 0, -168, 22, col); box(g, -22, -138, 44, 76, 18, col);
  if (pose === 'walk') { line(g, [[-8, -66], [-26, -6]], 18, col); line(g, [[8, -66], [26, -6]], 18, col); line(g, [[-16, -126], [-34, -82]], 14, col); line(g, [[16, -126], [32, -86]], 14, col); }
  else { line(g, [[-10, -66], [-12, -6]], 18, col); line(g, [[10, -66], [12, -6]], 18, col); line(g, [[-24, -126], [-30, -76]], 14, col); line(g, [[24, -126], [30, -76]], 14, col); }
  g.restore();
}

// ---------- frame: background, HUD, captions ----------
export function bg(g, t) {
  g.fillStyle = C.bg; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  g.fillStyle = radGrad(g, E.W / 2, E.H * 0.55, 0, E.W * 0.6, ['rgba(255,255,255,0.035)', 'rgba(255,255,255,0)']); g.fillRect(0, 0, E.W, E.H);
}
export function floorLine(g, y, a = 0.5) { const gr = g.createLinearGradient(0, 0, E.W, 0); gr.addColorStop(0, 'rgba(242,242,242,0)'); gr.addColorStop(0.5, `rgba(242,242,242,${a})`); gr.addColorStop(1, 'rgba(242,242,242,0)'); g.fillStyle = gr; g.fillRect(0, y, E.W, 4); }
export function hud(g, t, info) {
  const gt = info.globalT, p = info, dur = window.DURATION || 226;
  T(g, 'NIGHT SUPPORT  //  CALL 001', 60, 46, { size: 17, weight: 700, align: 'left', color: C.mid, spacing: 2 });
  const secs = Math.floor(CLOCK0 + gt * CLOCK_RATE), hh = Math.floor(secs / 3600), mm = Math.floor(secs / 60) % 60;
  T(g, `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')} AM`, E.W - 60, 46, { size: 17, weight: 700, align: 'right', color: C.mid, spacing: 2 });
  box(g, E.W / 2 - 160, 42, 320, 5, 2.5, '#262626'); box(g, E.W / 2 - 160, 42, 320 * clamp(gt / dur), 5, 2.5, C.mid);
  box(g, E.W / 2 - 160 + 320 * clamp(gt / dur) - 8, 38, 16, 13, 3, C.white);
  if (p.status) pill(g, 60, 104, p.status[0], p.status[1] || C.red, { size: 20, align: 'left' });
  if (!p.noCaptions) { const gr = g.createLinearGradient(0, E.H - 230, 0, E.H); gr.addColorStop(0, 'rgba(5,5,5,0)'); gr.addColorStop(0.55, 'rgba(5,5,5,0.82)'); gr.addColorStop(1, 'rgba(5,5,5,0.92)'); g.fillStyle = gr; g.fillRect(0, E.H - 230, E.W, 230); captions(g, gt); }
}
function captions(g, gt) {
  const W = E.words; if (!W.length) return;
  let i = -1; for (let k = W.length - 1; k >= 0; k--) if (gt >= W[k].start - 0.08) { if (gt <= W[k].end + 0.5) i = k; break; } if (i < 0) return;
  let a = i; while (a > 0 && !/[.?!…]["”]?$/.test(W[a - 1].word)) a--;               // sentence start
  let b = i; while (b < W.length - 1 && !/[.?!…]["”]?$/.test(W[b].word)) b++;           // sentence end
  const str = W.slice(a, b + 1).map(w => w.word.replace(/["“”]/g, '')).join(' ').toUpperCase();
  const size = 30; g.save(); g.font = `800 ${size}px "${FONT}"`;
  const lines = []; let cur = ''; for (const w of str.split(' ')) { const nxt = (cur + ' ' + w).trim(); if (g.measureText(nxt).width > E.W * 0.62 && cur) { lines.push(cur); cur = w; } else cur = nxt; } if (cur) lines.push(cur); g.restore();
  const y0 = E.H - 74 - (lines.length - 1) * 40;
  lines.forEach((s, k) => T(g, s, E.W / 2, y0 + k * 40, { size, weight: 800, color: C.white, stroke: 4, strokeColor: 'rgba(0,0,0,0.9)', spacing: 1 }));
}
// big statement text: lines [{str, at, col, size}] stacked around y; each appears at its local time
export function say(g, t, lines = [], o = {}) {
  const y0 = o.y ?? E.H / 2 - 20, gap = o.gap ?? 1.12; const sizes = lines.map(l => l.size || o.size || 104);
  const total = sizes.reduce((a, b) => a + b * gap, 0); let y = y0 - total / 2;
  lines.forEach((l, k) => {
    const s = sizes[k]; y += s * gap / 2; const a = ease.out(prog(t, l.at || 0, (l.at || 0) + 0.22));
    if (a > 0) T(g, l.str, o.x ?? E.W / 2, y + (1 - a) * 16, { size: s, weight: l.mono ? 800 : 900, color: l.col || C.white, alpha: a, spacing: 1, align: o.align || 'center',
      glow: l.col === C.red ? 30 : 0, glowColor: alpha(C.red, 0.55) });
    y += s * gap / 2;
  });
}

// ---------- 1. cockpit: from the back seat, both front seats in frame ----------
// p: passenger ('empty'|'you'), heat, driver ('you'|'void'|'mind'|'empty'), beep, glance, mirror ('tilt'), checks, mindAt
export function cockpit(g, t, p = {}) {
  const hz = 380, vx = E.W / 2;
  g.save(); g.beginPath(); g.moveTo(360, 170); g.lineTo(1560, 170); g.lineTo(1680, 540); g.lineTo(240, 540); g.closePath(); g.clip();
  g.fillStyle = '#0c0c0c'; g.fillRect(0, 0, E.W, E.H);
  roadLines(g, t, { hz, vx, w0: 40, w1: 1700, yb: 560, speed: p.speed ?? 1, lights: p.lights ?? true, period: p.period ?? 3.2 });
  g.restore();
  g.fillStyle = C.dark; g.beginPath(); g.moveTo(120, 600); g.quadraticCurveTo(E.W / 2, 500, E.W - 120, 600); g.lineTo(E.W - 120, 680); g.lineTo(120, 680); g.closePath(); g.fill();
  const on = p.beep && blink(t);
  seatbeltIcon(g, vx, 585, 0.9, on ? C.red : C.mid); if (on) glow(g, vx, 585, 90, C.red, 0.55);
  const tilt = p.mirror === 'tilt' ? Math.sin(clamp((t - (p.mirrorAt ?? 0)) * 2) * 1.2) * 0.25 : 0;
  line(g, [[vx, 70], [vx, 104]], 10, C.mid);
  g.save(); g.translate(vx, 130); g.rotate(tilt); box(g, -160, -32, 320, 70, 22, C.white); box(g, -140, -18, 280, 42, 14, '#111'); g.restore();
  if (p.mirror === 'tilt' && t > (p.mirrorAt ?? 0)) xMark(g, vx + 230, 130, 30, t, (p.mirrorAt ?? 0) + 0.5);
  const dx = 640, px = 1280;
  const mindK = p.mindAt != null ? ease.inOut(prog(t, p.mindAt, p.mindAt + 2.2)) : null;
  if (p.driver === 'void') voidHead(g, dx, t); else if (p.driver !== 'empty') { g.save(); g.globalAlpha *= p.driver === 'mind' ? 1 - (mindK ?? 0) * 0.8 : 1; head(g, dx); g.restore(); }
  if (p.passenger === 'you') head(g, px);
  ring(g, dx - 210, 650, 90, 22, C.white); ring(g, dx - 210, 650, 90, 6, C.bg);
  if (p.passenger === 'heat' || p.heat) heatGlow(g, px, 760, t, p.heatAmt ?? 1);
  seat(g, dx, p.driver === 'void'); seat(g, px, false, p.passenger === 'heat' || p.heat, t);
  if (mindK != null) headOutline(g, lerp(dx, px, mindK), 255 - Math.sin(mindK * Math.PI) * 70, t);
  if (p.glance != null && t > p.glance) {
    const k = ease.out(prog(t, p.glance, p.glance + 0.5));
    line(g, [[dx + 60, 300], [lerp(dx + 60, px - 70, k), lerp(300, 420, k)]], 7, C.red, false, [18, 14], -t * 50);
    xMark(g, (dx + px) / 2, 350, 40, t, p.glance + 0.5);
  }
  if (p.checks) p.checks.forEach(([str, at], i) => { if (t > at) { check(g, 150, 780 + i * 90, 22, t, at); T(g, str, 195, 782 + i * 90, { size: 40, align: 'left', alpha: ease.out(prog(t, at, at + 0.25)) }); } });
}
function seat(g, x, isVoid, hot = false, t = 0) {
  const col = isVoid ? '#0a0a0a' : hot ? '#ffd9d6' : C.white;
  const back = [[x - 175, E.H + 30], [x - 165, 500], [x - 125, 455], [x + 125, 455], [x + 165, 500], [x + 175, E.H + 30]];
  fillPoly(g, back, col); if (isVoid) line(g, back, 5, C.red, true);
  line(g, [[x - 45, 415], [x - 45, 460]], 14, isVoid ? '#0a0a0a' : C.mid); line(g, [[x + 45, 415], [x + 45, 460]], 14, isVoid ? '#0a0a0a' : C.mid);
  box(g, x - 95, 300, 190, 125, 48, col, isVoid ? C.red : C.bg, isVoid ? 5 : 10);
  line(g, [[x - 120, 560], [x + 120, 560]], 6, isVoid ? '#1a1a1a' : '#cfcfcf');
  if (hot) { const pulse = 0.5 + 0.5 * Math.sin(t * 5); g.save(); g.globalAlpha *= 0.35 + 0.25 * pulse; fillPoly(g, back, C.red); g.restore(); }
}
function head(g, x) { circle(g, x, 255, 74, C.white); }
function headOutline(g, x, y, t) { g.save(); g.setLineDash([16, 12]); g.lineDashOffset = -t * 40; g.strokeStyle = C.white; g.lineWidth = 7; g.beginPath(); g.arc(x, y, 74, 0, Math.PI * 2); g.stroke(); g.restore(); }
function voidHead(g, x, t) { const j = noise(t * 3, 7) * 3; glow(g, x + j, 255, 150, C.red, 0.4); circle(g, x + j, 255, 76, C.void); ring(g, x + j, 255, 76, 6, C.red); }
function heatGlow(g, x, y, t, amt) {
  const pulse = 0.75 + 0.25 * Math.sin(t * 5);
  g.save(); g.globalCompositeOperation = 'lighter';
  for (const [dx, dy, r, c] of [[0, -150, 180, C.red], [0, 0, 260, C.red], [0, 160, 170, C.amber]]) { g.fillStyle = radGrad(g, x + dx, y + dy, 0, r, [alpha(c, 0.5 * amt * pulse), alpha(c, 0)]); g.fillRect(x + dx - r, y + dy - r, r * 2, r * 2); }
  g.restore();
}
export function roadLines(g, t, o) {
  const { hz, vx, w0, w1, yb, speed = 1, lights = false, period = 2.2 } = o;
  const X = (u, y) => vx + u * lerp(w0, w1, (y - hz) / (yb - hz)) / 2;
  fillPoly(g, [[X(-1, hz), hz], [X(1, hz), hz], [X(1, yb), yb], [X(-1, yb), yb]], '#141414');
  line(g, [[X(-1, hz), hz], [X(-1, yb), yb]], 4, alpha(C.white, 0.5)); line(g, [[X(1, hz), hz], [X(1, yb), yb]], 4, alpha(C.white, 0.5));
  for (let k = 0; k < 14; k++) { const z = ((k / 14 + t * 0.35 * speed) % 1); const y1 = hz + (yb - hz) * z * z, y2 = hz + (yb - hz) * Math.min(1, (z + 0.03) ** 2); line(g, [[X(0, y1), y1], [X(0, y2), y2]], 3 + 9 * z, alpha(C.white, 0.35 + 0.6 * z)); }
  if (lights) for (let k = 0; k < 4; k++) { const z = ((k / 4 + t / (period * 4) * speed) % 1), y = hz + (yb - hz) * z * z, s = 0.25 + z;
    for (const side of [-1.3, 1.3]) { const x = X(side, y); line(g, [[x, y], [x, y - 230 * s]], 3 + 5 * s, alpha(C.white, 0.85)); circle(g, x - side * 14 * s, y - 230 * s, 9 * s, C.amber); amberGlow(g, x - side * 14 * s, y - 230 * s, 110 * s, 0.7);
      g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = radGrad(g, X(side * 0.6, y), y, 0, 280 * s, [alpha(C.amber, 0.25), alpha(C.amber, 0)]); g.fillRect(X(side * 0.6, y) - 300 * s, y - 300 * s, 600 * s, 600 * s); g.restore(); } }
}

// ---------- 2. top-down car (the app view) ----------
// p: passenger ('empty'|'bag'|'groceries'|'pizza'|'heat'|'you'), belt, moving, lights, motion, toss, vanish, shape, alarm, lock
export function carTop(g, t, p = {}) {
  const cx = p.cx ?? E.W / 2, cy = p.cy ?? E.H / 2 + 10, s = p.s ?? 1.12;
  g.save(); g.translate(cx, cy); g.scale(s, s);
  if (p.moving) { for (const x of [-320, 320]) for (let k = 0; k < 8; k++) { const y = ((k * 140 + t * 420) % 1120) - 560; box(g, x - 5, y, 10, 70, 5, alpha(C.white, 0.35)); }
    if (p.lights) for (let k = 0; k < 3; k++) { const y = ((k * 380 + t * 420) % 1140) - 570; for (const x of [-450, 450]) { amberGlow(g, x, y, 260, 0.35); circle(g, x, y, 14, C.amber); } } }
  if (p.alarm != null && t > p.alarm && blink(t, 2.5)) for (const [x, y] of [[-150, -330], [150, -330], [-150, 330], [150, 330]]) amberGlow(g, x, y, 130, 0.9);
  box(g, -180, -340, 360, 680, 100, C.white);
  fillPoly(g, [[-150, -215], [150, -215], [128, -140], [-128, -140]], C.bg);
  fillPoly(g, [[-138, 240], [138, 240], [122, 300], [-122, 300]], C.bg);
  const seats = { fl: [-74, -30], fr: [74, -30], rl: [-74, 140], rr: [74, 140] };
  for (const [, [x, y]] of Object.entries(seats)) box(g, x - 56, y - 54, 112, 112, 26, C.bg);
  ring(g, -74, -100, 30, 9, C.bg);
  circle(g, -74, -34, 28, C.white); box(g, -122, -6, 96, 26, 13, C.white);
  const [fx, fy] = seats.fr; const vk = p.vanish != null ? 1 - ease.in(prog(t, p.vanish, p.vanish + 0.8)) : 1;
  if (p.passenger === 'heat') heatGlow(g, fx, fy, t, 0.6);
  g.save(); g.globalAlpha *= vk;
  if (p.passenger === 'bag') { box(g, fx - 36, fy - 22, 72, 58, 10, C.white); line(g, [[fx - 18, fy - 22], [fx - 12, fy - 42], [fx + 12, fy - 42], [fx + 18, fy - 22]], 7, C.white); }
  if (p.passenger === 'groceries') { circle(g, fx - 14, fy - 36, 16, C.green); circle(g, fx + 16, fy - 32, 14, C.amber); box(g, fx - 38, fy - 30, 76, 68, 8, C.white); }
  if (p.passenger === 'pizza') { box(g, fx - 42, fy - 42, 84, 84, 6, C.white); T(g, 'PIZZA', fx, fy, { size: 17, weight: 900, color: C.bg }); if (p.belt) line(g, [[fx - 52, fy - 52], [fx + 52, fy + 52]], 10, C.red); }
  if (p.passenger === 'you') { circle(g, fx, fy - 4, 28, C.white); box(g, fx - 48, fy + 24, 96, 26, 13, C.white); }
  g.restore();
  if (p.toss != null) { const k = ease.inOut(prog(t, p.toss, p.toss + 0.9)); if (k > 0 && k < 1) { const x = lerp(-260, fx, k), y = lerp(-30, fy, k) - Math.sin(k * Math.PI) * 140; box(g, x - 32, y - 24, 64, 50, 10, C.white, C.bg, 6); }
    if (t > p.toss + 0.3) xMark(g, fx, fy, 64, t, p.toss + 0.3); }
  if (p.motion != null && t > p.motion) { FX.rings(g, 0, 140, t, { count: 4, r0: 20, r1: 200, speed: 0.9, color: C.white, a: 0.55, w: 5 }); circle(g, 0, 140, 10, C.white); }
  if (p.shape != null) { const k = ease.inOut(prog(t, p.shape, p.shape + 1.4)); g.save(); g.globalAlpha *= k; glow(g, 40, 120, 160, C.red, 0.5); circle(g, 40, 120, 42, C.void); ring(g, 40, 120, 42, 5, C.red); box(g, -18, 156, 116, 52, 24, C.void, C.red, 5); g.restore(); }
  if (p.lock != null && t > p.lock) lockIcon(g, 0, -440, t, p.lock);
  g.restore();
}
export function lockIcon(g, x, y, t, at = 0) { const k = ease.outBack(prog(t, at, at + 0.4)); if (k <= 0) return; g.save(); g.translate(x, y); g.scale(k, k);
  g.beginPath(); g.arc(0, -6, 24, Math.PI, 0); g.strokeStyle = C.green; g.lineWidth = 12; g.stroke(); box(g, -38, -8, 76, 58, 12, C.green); circle(g, 0, 18, 8, C.bg); g.restore(); }

// ---------- 3. road POV with beep meter ----------
export function roadPOV(g, t, p = {}) {
  const hz = 430, yb = 900, period = p.period ?? 2.4;
  roadLines(g, t, { hz, vx: E.W / 2, w0: 30, w1: 2500, yb, speed: 1.2, lights: p.lights, period });
  g.fillStyle = C.dark; g.beginPath(); g.moveTo(0, 860); g.quadraticCurveTo(E.W / 2, 770, E.W, 860); g.lineTo(E.W, E.H); g.lineTo(0, E.H); g.closePath(); g.fill();
  const lit = p.lights ? underLight(t, period) : false;
  const beeping = p.beepMode === 'none' ? (p.noneAt == null || t < p.noneAt) && !lit : !lit;
  const on = beeping && blink(t);
  seatbeltIcon(g, E.W / 2, 870, 1.15, on ? C.red : C.mid); if (on) glow(g, E.W / 2, 870, 110, C.red, 0.55);
  if (p.meter) beepMeter(g, t, { period, lights: p.lights, beepMode: p.beepMode, noneAt: p.noneAt });
}
const underLight = (t, period) => ((t / period) % 1) < 0.32;
export function beepMeter(g, t, p) {
  const x0 = 360, x1 = E.W - 360, y = 200, span = 8;
  T(g, 'SEATBELT CHIME', x0, y - 62, { size: 20, weight: 800, align: 'left', color: C.mid, spacing: 2 });
  box(g, x0, y - 34, x1 - x0, 68, 34, '#111');
  for (let k = 0; k <= 160; k++) { const tt = t - span + (k / 160) * span; if (tt < 0) continue; const x = lerp(x0 + 20, x1 - 20, k / 160);
    const lit = p.lights && underLight(tt, p.period ?? 2.4); if (lit) { g.fillStyle = alpha(C.amber, 0.35); g.fillRect(x, y - 22, (x1 - x0) / 160 + 1, 44); }
    const beeps = !lit && !(p.beepMode === 'none' && p.noneAt != null && tt >= p.noneAt); if (beeps && (tt * 1.25) % 1 < 0.08) line(g, [[x, y - 20], [x, y + 20]], 7, C.red); }
  circle(g, x1 - 20, y, 10, C.white);
}

// ---------- 4. weight sensor: seat side view + readout ----------
export function sensor(g, t, p = {}) {
  const x = 640, y = 770;
  floorLine(g, y + 150, 0.35);
  fillPoly(g, [[x - 240, y], [x + 180, y], [x + 200, y - 80], [x - 220, y - 92]], C.white);
  fillPoly(g, [[x - 226, y - 96], [x - 280, y - 500], [x - 170, y - 512], [x - 126, y - 96]], C.white);
  line(g, [[x - 226, y - 96], [x - 126, y - 96]], 10, C.bg);
  box(g, x - 320, y - 640, 170, 112, 36, C.white); line(g, [[x - 300, y - 528], [x - 170, y - 528]], 10, C.bg);
  line(g, [[x - 130, y + 6], [x - 150, y + 150]], 14, C.mid); line(g, [[x + 130, y + 6], [x + 150, y + 150]], 14, C.mid);
  const k = ease.out(prog(t, p.padAt ?? 0.3, (p.padAt ?? 0.3) + 0.6));
  if (k > 0) { box(g, x - 210, y - 52, 380 * k + 1, 30, 10, C.amber); amberGlow(g, x - 20, y - 37, 260 * k, 0.5); }
  if (k > 0.9) T(g, 'WEIGHT SENSOR', x - 20, y + 60, { size: 24, weight: 800, color: C.amber, spacing: 2 });
  if (p.outline != null) { const a = ease.inOut(prog(t, p.outline, p.outline + 1.2)); g.save(); g.globalAlpha *= a; g.setLineDash([16, 12]); g.lineDashOffset = -t * 40; g.strokeStyle = p.outlineCol || C.white; g.lineWidth = 7;
    g.beginPath(); g.arc(x - 180, y - 600, 58, 0, Math.PI * 2); g.moveTo(x - 168, y - 535); g.lineTo(x - 128, y - 130); g.lineTo(x + 130, y - 120); g.lineTo(x + 180, y + 140); g.stroke(); g.restore(); }
  const px = 1120, py = 290;
  T(g, 'PASSENGER SEAT', px, py, { size: 26, weight: 800, align: 'left', color: C.mid, spacing: 3 });
  const wv = p.weight == null ? 0 : p.weight * ease.out(prog(t, p.weighAt ?? 0.5, (p.weighAt ?? 0.5) + 2.2));
  T(g, `${wv.toFixed(1)}`, px - 6, py + 130, { size: 170, align: 'left', color: wv > 30 ? C.red : C.white, glow: wv > 30 ? 30 : 0, glowColor: alpha(C.red, 0.5) });
  g.save(); g.font = `900 170px "${FONT}"`; const nw = g.measureText(wv.toFixed(1)).width; g.restore();
  T(g, 'KG', px + nw + 20, py + 160, { size: 54, align: 'left', color: C.mid });
  const cls = wv > 30 ? (p.cls || 'ADULT') : wv > 1 ? 'OBJECT' : 'EMPTY';
  pill(g, px, py + 290, `CLASS: ${cls}`, wv > 30 ? C.red : C.white, { size: 30, align: 'left', solid: wv > 30 });
  if (wv > 30) { const on = blink(t); seatbeltIcon(g, px + 60, py + 440, 1.3, on ? C.red : C.grey); T(g, 'BUCKLE UP', px + 140, py + 440, { size: 44, align: 'left', color: on ? C.red : C.mid }); }
}

// ---------- 5. rule header (over a background scene) ----------
export function ruleCard(g, t, p) {
  const bgTpl = TEMPLATES[p.bgTpl]; if (bgTpl) { const [dx, dy, s] = p.bgShift || [0, 0, 1]; g.save(); g.translate(E.W / 2 + dx, E.H / 2 + dy); g.scale(s, s); g.translate(-E.W / 2, -E.H / 2); bgTpl(g, t, p.bgParams || {}); g.restore(); g.fillStyle = 'rgba(5,5,5,0.4)'; g.fillRect(0, 0, E.W, E.H); }
  const k = ease.out(prog(t, 0, 0.4)), x = lerp(-420, 110, k), y = 200;
  g.save(); g.font = `900 120px "${FONT}"`; const rw = g.measureText('RULE').width; g.restore();
  g.fillStyle = 'rgba(5,5,5,0.7)'; g.fillRect(0, y - 110, E.W * 0.62, 290);
  T(g, 'RULE', x, y, { size: 120, align: 'left' });
  box(g, x + rw + 24, y - 66, 120, 128, 16, C.white); T(g, String(p.n), x + rw + 84, y + 2, { size: 110, color: C.bg });
  const sub = p.title.toUpperCase(), n = Math.floor(sub.length * clamp((t - 0.35) / Math.max(0.4, sub.length * 0.03)));
  T(g, sub.slice(0, n), x + 4, y + 112, { size: 40, weight: 800, align: 'left', spacing: 2 });
  if (n >= sub.length) box(g, x + 4, y + 148, 220, 7, 3, C.red);
}

// ---------- 6. seven-rule overview ----------
export function rules7(g, t, p) {
  const s = 160, gap = 34, x0 = E.W / 2 - (7 * s + 6 * gap) / 2, y = E.H / 2 - 60;
  for (let i = 0; i < 7; i++) { const a = ease.outBack(prog(t, i * 0.08, i * 0.08 + 0.35)); if (a <= 0) continue; const x = x0 + i * (s + gap) + s / 2;
    const seventh = i === 6, homeOn = !seventh && t > p.homeAt + i * 0.12, whoOn = seventh && t > p.whoAt;
    if (whoOn) glow(g, x, y, 220, C.red, 0.4);
    g.save(); g.translate(x, y); g.scale(a, a);
    box(g, -s / 2, -s / 2, s, s, 26, seventh && whoOn ? C.red : C.white); T(g, seventh && whoOn ? '?' : String(i + 1), 0, 4, { size: 96, color: seventh && whoOn ? C.white : C.bg });
    g.restore(); if (homeOn) check(g, x + s / 2 - 10, y - s / 2 + 10, 20, t, p.homeAt + i * 0.12); }
  if (t > p.homeAt) T(g, 'GET YOU HOME', x0 + (6 * (s + gap) - gap) / 2, y + 150, { size: 40, weight: 800, color: C.green, spacing: 3 });
  if (t > p.whoAt) T(g, 'WHO DROVE?', x0 + 6 * (s + gap) + s / 2, y + 150, { size: 40, weight: 800, color: C.red, spacing: 2 });
}

// ---------- 7. dashboard radio ----------
export function radio(g, t, p = {}) {
  const x = E.W / 2 - 520, y = 220, w = 1040, h = 600;
  amberGlow(g, E.W / 2, y + h / 2, 700, 0.18);
  box(g, x, y, w, h, 60, C.white); box(g, x + 26, y + 26, w - 52, h - 52, 40, '#0b0b0b');
  T(g, 'FM RADIO', x + 80, y + 90, { size: 22, weight: 800, align: 'left', color: C.mid, spacing: 3 });
  const st = p.stations || ['88.1', '88.1', '93.7', '101.3', '66.0'];
  const idx = Math.min(st.length - 1, Math.max(0, Math.floor((t - (p.at ?? 0.6)) / 0.7) + 1));
  const sweeping = p.mode === 'change' && t > (p.at ?? 0.6) && idx < st.length - 1 && ((t - (p.at ?? 0.6)) % 0.7) < 0.25;
  T(g, sweeping ? '— —' : (p.mode === 'change' ? st[idx] : st[st.length - 1]), x + w / 2, y + 250, { size: 220, color: C.white, spacing: 4 });
  if (p.mode === 'change' && t > (p.at ?? 0.6)) pill(g, x + w / 2, y + 400, 'CHOSEN BY: PASSENGER SEAT', C.red, { size: 26 });
  if (p.mode === 'taste') { T(g, 'NOW PLAYING  ██████', x + w / 2, y + 390, { size: 30, weight: 800, color: C.white });
    for (let i = 0; i < 5; i++) T(g, '★', x + w / 2 - 120 + i * 60, y + 460, { size: 52, color: i < 1 ? C.amber : C.grey }); if (t > (p.xAt ?? 1.2)) pill(g, x + w / 2, y + 530, 'DO NOT SAY SO', C.red, { size: 24, solid: true }); }
  const vol = p.mode === 'volume' ? ease.inOut(prog(t, p.at ?? 0.5, (p.at ?? 0.5) + 2.5)) * 0.9 + 0.1 : 0.35;
  if (p.mode !== 'taste') for (let i = 0; i < 20; i++) box(g, x + 110 + i * 41, y + h - 120, 28, 50, 8, i / 20 < vol ? (i > 15 ? C.red : C.white) : '#222');
  if (p.mode === 'volume' && t > (p.hideAt ?? 3)) { const a = ease.out(prog(t, p.hideAt ?? 3, (p.hideAt ?? 3) + 0.8));
    for (let k = 0; k < 50; k++) { const xx = x + 120 + k * 16, hh = (Math.abs(noise(k * 0.7 + t * 6, 4)) * 36 + 4) * a; line(g, [[xx, y + 410 - hh], [xx, y + 410 + hh]], 6, alpha(C.red, 0.75)); } }
}

// ---------- 8. icons struck out one by one ----------
export function crossList(g, t, p) {
  const items = p.items, x0 = E.W / 2 - (items.length - 1) * 230;
  items.forEach(([lbl, at], i) => { const x = x0 + i * 460, y = E.H / 2 - 50, a = ease.outBack(prog(t, at - 0.2, at + 0.15)); if (a <= 0) return;
    g.save(); g.translate(x, y); g.scale(a, a); icon(g, lbl, 0, 0); g.restore(); T(g, lbl, x, y + 190, { size: 40, weight: 800, spacing: 3, alpha: clamp(a) }); xMark(g, x, y, 120, t, at + 0.25); });
}
function icon(g, k, x, y) {
  if (k === 'GAS') { box(g, x - 70, y - 100, 120, 200, 20, C.white); box(g, x - 48, y - 76, 76, 56, 8, C.bg); line(g, [[x + 50, y - 60], [x + 92, y - 26], [x + 92, y + 50]], 14, C.white); }
  if (k === 'FOOD') { g.fillStyle = C.white; g.beginPath(); g.arc(x, y - 10, 100, Math.PI, 0); g.fill(); box(g, x - 110, y + 6, 220, 30, 14, C.white); box(g, x - 100, y + 48, 200, 52, 22, C.white); }
  if (k === 'TIRES') { circle(g, x, y, 105, C.white); circle(g, x, y, 52, C.bg); circle(g, x, y, 24, C.white); }
}

// ---------- 9. red light / window tap (side view) ----------
export function redLight(g, t, p = {}) {
  const z = p.zoom ?? 1; g.save(); g.translate(E.W / 2, E.H / 2); g.scale(z, z); g.translate(-E.W / 2 + (p.panX ?? 0), -E.H / 2);
  floorLine(g, 846, 0.5);
  box(g, 1550, 330, 20, 516, 6, C.mid); box(g, 1500, 140, 120, 280, 30, C.white);
  circle(g, 1560, 200, 36, C.red); glow(g, 1560, 200, 220, C.red, 0.7); circle(g, 1560, 280, 32, '#222'); circle(g, 1560, 360, 32, '#222');
  const cx = 820;
  fillPoly(g, [[cx - 470, 770], [cx - 462, 650], [cx - 300, 628], [cx - 190, 500], [cx + 170, 494], [cx + 300, 618], [cx + 470, 648], [cx + 482, 770]], C.white);
  fillPoly(g, [[cx - 168, 520], [cx - 22, 516], [cx - 22, 612], [cx - 272, 618]], C.bg);
  fillPoly(g, [[cx + 4, 516], [cx + 160, 514], [cx + 266, 612], [cx + 4, 612]], '#0d0d0d');
  for (const wx of [cx - 280, cx + 290]) { circle(g, wx, 780, 74, C.bg); circle(g, wx, 780, 58, C.white); circle(g, wx, 780, 24, C.bg); }
  circle(g, cx + 120, 556, 30, C.white); box(g, cx + 88, 584, 64, 40, 18, C.white);
  glow(g, cx + 130, 560, 260, C.red, 0.18);
  (p.taps || []).forEach((at, i) => { if (t < at) return; const k = prog(t, at, at + 0.6), x = cx + 200 + i * 20, y = 548 + i * 14;
    ring(g, x, y, 12 + k * 54, 6 * (1 - k) + 1, alpha(C.red, 1 - k)); circle(g, x, y, 9, C.red); if (k < 0.5) T(g, 'TAP', x + 50, y - 36, { size: 26, weight: 900, color: C.red, alpha: 1 - k * 2 }); });
  g.restore();
}

// ---------- 10. phone notification ----------
export function phone(g, t, p = {}) {
  const x = E.W / 2, y = E.H / 2 + 10, w = 440, h = 820; const buzz = t > (p.at ?? 0.6) && t < (p.at ?? 0.6) + 1.2 ? Math.sin(t * 90) * 7 : 0;
  amberGlow(g, x, y - 100, 420, 0.25);
  g.save(); g.translate(buzz, 0); box(g, x - w / 2, y - h / 2, w, h, 70, C.white); box(g, x - w / 2 + 22, y - h / 2 + 22, w - 44, h - 44, 52, '#0b0b0b'); box(g, x - 62, y - h / 2 + 40, 124, 30, 15, C.white);
  T(g, '3:33', x, y - 220, { size: 130, color: C.white }); T(g, 'SUNDAY', x, y - 140, { size: 22, weight: 800, color: C.mid, spacing: 3 });
  const k = ease.outBack(prog(t, p.at ?? 0.6, (p.at ?? 0.6) + 0.5));
  if (k > 0) { const ny = lerp(y - h / 2, y - 20, k); box(g, x - w / 2 + 44, ny - 74, w - 88, 158, 30, '#262626');
    box(g, x - w / 2 + 66, ny - 54, 50, 50, 14, C.red); T(g, '!', x - w / 2 + 91, ny - 28, { size: 38 });
    T(g, 'VEHICLE ALERT', x - w / 2 + 130, ny - 28, { size: 20, weight: 900, align: 'left' });
    T(g, 'Movement detected', x - w / 2 + 66, ny + 22, { size: 24, weight: 700, align: 'left' }); T(g, 'in rear seat.', x - w / 2 + 66, ny + 54, { size: 24, weight: 700, align: 'left' }); }
  g.restore();
  if (buzz) for (const sd of [-1, 1]) for (let i = 0; i < 2; i++) line(g, [[x + sd * (w / 2 + 36 + i * 26), y - 70], [x + sd * (w / 2 + 36 + i * 26), y + 70]], 8, C.white);
  if (p.noAt != null && t > p.noAt) { const a = ease.out(prog(t, p.noAt, p.noAt + 0.3)); T(g, 'DO NOT', 1520, 470, { size: 104, color: C.red, glow: 24, glowColor: alpha(C.red, 0.55), alpha: a }); T(g, 'GO BACK.', 1520, 590, { size: 104, color: C.red, glow: 24, glowColor: alpha(C.red, 0.55), alpha: a }); }
}

// ---------- 11. park & walk ----------
export function park(g, t, p = {}) {
  fillPoly(g, [[1240, 420], [1450, 250], [1660, 420], [1660, 780], [1240, 780]], C.white);
  box(g, 1405, 600, 90, 180, 10, C.bg); box(g, 1290, 470, 90, 80, 8, '#111'); box(g, 1520, 470, 90, 80, 8, '#111'); amberGlow(g, 1335, 510, 120, 0.5); amberGlow(g, 1565, 510, 120, 0.5);
  carTop(g, t, { cx: 600, cy: 520, s: 0.95, passenger: 'empty', lock: p.lockAt });
  const k = ease.inOut(prog(t, p.walkAt ?? 0.8, (p.walkAt ?? 0.8) + 2.2)); const wx = lerp(820, 1450, k);
  for (let i = 1; i < 7; i++) if (k * 7 > i) circle(g, lerp(820, 1450, i / 7), 860, 7, C.mid);
  if (t > (p.walkAt ?? 0.8) - 0.3) person(g, wx, 840, 1.0, C.white, 'walk');
  floorLine(g, 846, 0.3);
}

// ---------- 12. route with no memory ----------
export function route(g, t, p = {}) {
  for (let i = 0; i < 9; i++) box(g, 160, 180 + i * 90, E.W - 320, 3, 1, '#1d1d1d'); for (let i = 0; i < 18; i++) box(g, 160 + i * 94, 180, 3, 720, 1, '#1d1d1d');
  const pts = [[260, 820], [260, 560], [640, 560], [640, 360], [1060, 360], [1060, 640], [1420, 640], [1420, 280], [1660, 280]];
  const L = []; let tot = 0; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); L.push(d); tot += d; }
  const k = ease.inOut(prog(t, 0.2, p.drawDur ?? 2.5)); let left = k * tot; const drawn = [pts[0]];
  for (let i = 1; i < pts.length && left > 0; i++) { const f = Math.min(1, left / L[i - 1]); drawn.push([lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)]); left -= L[i - 1]; }
  line(g, drawn, 16, C.white); const hd = drawn[drawn.length - 1]; amberGlow(g, hd[0], hd[1], 120, 0.7); circle(g, hd[0], hd[1], 16, C.amber);
  pill(g, 260, 875, 'WORK', C.white, { size: 24, solid: true }); if (k > 0.98) pill(g, 1660, 222, 'HOME', C.green, { size: 24, solid: true });
  (p.marks || []).forEach(([lbl, at], i) => { if (t > at) pill(g, 640 + i * 360, 790, lbl, C.amber, { size: 28, solid: true }); });
  if (p.gapAt != null) { const a = ease.out(prog(t, p.gapAt, p.gapAt + 0.5)); g.save(); g.globalAlpha *= a; box(g, 420, 320, 1080, 360, 40, '#0b0b0b', C.white, 6); T(g, 'NO MEMORY', E.W / 2, 470, { size: 120 }); T(g, 'OF THIS DRIVE', E.W / 2, 570, { size: 44, weight: 800, color: C.mid, spacing: 4 }); g.restore(); }
}

// ---------- 13. autopilot head ----------
export function autopilot(g, t, p = {}) {
  const x = 760, y = 560;
  g.fillStyle = C.white; g.beginPath(); g.moveTo(x - 60, y + 280); g.lineTo(x - 60, y + 160); g.bezierCurveTo(x - 220, y + 120, x - 240, y - 60, x - 160, y - 170); g.bezierCurveTo(x - 60, y - 300, x + 180, y - 280, x + 215, y - 110);
  g.lineTo(x + 255, y - 10); g.lineTo(x + 212, y + 12); g.lineTo(x + 218, y + 84); g.bezierCurveTo(x + 180, y + 116, x + 122, y + 112, x + 92, y + 132); g.lineTo(x + 92, y + 280); g.closePath(); g.fill();
  box(g, x - 150, y - 175, 280, 170, 80, C.bg); pill(g, x - 10, y - 90, 'AUTOPILOT', C.white, { size: 28, solid: true });
  if (p.badgeAt != null && t > p.badgeAt) pill(g, x, y - 380, 'HIGHWAY HYPNOSIS  ·  REAL', C.amber, { size: 28, solid: true });
  if (p.mindAt != null) { const k = ease.inOut(prog(t, p.mindAt, p.mindAt + 3)); const mx = lerp(x - 10, 1440, k), my = lerp(y - 90, 380, k) - Math.sin(k * Math.PI) * 100;
    g.save(); g.setLineDash([16, 12]); g.lineDashOffset = -t * 40; g.strokeStyle = C.white; g.lineWidth = 7; g.beginPath(); g.arc(mx, my, 60, 0, Math.PI * 2); g.stroke(); g.restore();
    if (k > 0.2) T(g, 'YOUR MIND', mx, my + 104, { size: 26, weight: 800, spacing: 3 }); }
}

// ---------- 14. checklist ----------
export function checklist(g, t, p) {
  (p.rows || []).forEach(([str, ok, at], i) => { if (t < at - 0.1) return; const y = E.H / 2 - 40 - (p.rows.length - 1) * 75 + i * 150, a = ease.out(prog(t, at - 0.1, at + 0.2));
    T(g, str, E.W / 2 - 300, y, { size: 104, align: 'left', color: ok ? C.white : C.red, alpha: a }); (ok ? check : xMark)(g, E.W / 2 - 400, y, ok ? 30 : 40, t, at); });
}

// ---------- 15. end card ----------
export function endCard(g, t, p = {}) {
  const a = ease.out(prog(t, 0, 0.6)); g.save(); g.globalAlpha *= a; circle(g, E.W / 2, 330, 96, C.white); seatbeltIcon(g, E.W / 2, 340, 1.4, C.bg); g.restore();
  T(g, 'NIGHT SUPPORT', E.W / 2, 520, { size: 120, spacing: 8, alpha: a });
  T(g, 'CALL 001  ·  THE EMPTY PASSENGER SEAT', E.W / 2, 600, { size: 26, weight: 800, color: C.mid, spacing: 4, alpha: a });
  (p.lines || []).forEach(([str, at, col], i) => { if (t > at) T(g, str, E.W / 2, 720 + i * 70, { size: 40, weight: 800, color: col || C.white, alpha: ease.out(prog(t, at, at + 0.4)) }); });
}

const TEMPLATES = { cockpit, carTop, road: roadPOV, sensor, radio, redLight, route };
