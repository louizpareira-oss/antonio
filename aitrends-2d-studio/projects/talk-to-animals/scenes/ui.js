// ui.js — speech bubbles, cards and screens for "What If You Could Talk to Animals?" (v2 look: clean, rounded, bright).
import { E, S, rr, seg, circle, poly, alpha, shade, clamp, ease, prog, text, measure, FONTS, linGrad, glow, lerp } from '/engine/core.js';
export { bp, label, arrow } from '/projects/heavier-every-day/scenes/lib.js';
export { wt } from '/projects/stronger-couldnt-stop/scenes/lib.js';

const INK = '#2a1e24', PAPER = '#fff8ee';
export const GOLDC = '#ffd47e', CORALC = '#ff6f61', MINT = '#5fd39a', SKYC = '#8fd0ff';

// speech bubble that pops in at `at` (s); tail points to [tx, ty]. o: { size, color, ink, shout, w }
export function say(g, str, x, y, t, at = 0, tx = null, ty = null, o = {}) {
  const k = ease.outBack(prog(t, at, at + 0.22)); if (k <= 0) return;
  const size = (o.size || 34) * (o.scale ?? 1.3), lines = String(str).split('\n'), wmax = Math.max(...lines.map(l => measure(g, l, size, FONTS.ui, 900)));
  const w = wmax + size * 1.4, h = lines.length * size * 1.18 + size * 0.9;
  g.save(); g.translate(x, y); g.scale(k, k);
  const col = o.color || PAPER;
  if (o.shout) { g.fillStyle = col; g.beginPath(); const n = 18; for (let i = 0; i <= n * 2; i++) { const a = (i / (n * 2)) * Math.PI * 2, rx = (w / 2) * (i % 2 ? 1.12 : 0.95), ry = (h / 2) * (i % 2 ? 1.25 : 1); i ? g.lineTo(Math.cos(a) * rx, Math.sin(a) * ry) : g.moveTo(Math.cos(a) * rx, Math.sin(a) * ry); } g.closePath(); g.fill(); g.strokeStyle = INK; g.lineWidth = 3; g.stroke(); }
  else { rr(g, -w / 2, -h / 2, w, h, Math.min(h / 2, 28)); g.fillStyle = col; g.fill(); g.strokeStyle = alpha(INK, 0.85); g.lineWidth = 3; g.stroke(); }
  if (tx != null) { const dx = (tx - x) / k, dy = (ty - y) / k, ang = Math.atan2(dy, dx), bx = Math.cos(ang) * w * 0.28, by = Math.sin(ang) * h * 0.4;
    g.fillStyle = col; g.beginPath(); g.moveTo(bx - Math.sin(ang) * 14, by + Math.cos(ang) * 14); g.lineTo(dx * 0.82, dy * 0.82); g.lineTo(bx + Math.sin(ang) * 14, by - Math.cos(ang) * 14); g.closePath(); g.fill();
    g.strokeStyle = alpha(INK, 0.85); g.lineWidth = 3; g.beginPath(); g.moveTo(bx - Math.sin(ang) * 14, by + Math.cos(ang) * 14); g.lineTo(dx * 0.82, dy * 0.82); g.lineTo(bx + Math.sin(ang) * 14, by - Math.cos(ang) * 14); g.stroke(); }
  lines.forEach((l, i) => text(g, l, 0, (i - (lines.length - 1) / 2) * size * 1.18 + 2, { size, font: FONTS.ui, weight: 900, color: o.ink || INK }));
  g.restore();
}

// a word-synced line: shows the words spoken so far (from timeline/words.json) — for animal lines that build up
export function sayWords(g, words, x, y, t, info, tx, ty, o = {}) {
  const start = info.globalT - t; let shown = '';
  for (const w of words) { if (w.t <= t) shown = w.s; }
  if (shown) say(g, shown, x, y, 1, 0, tx, ty, o);
}

// "REAL" fact card. o: { x, y, w, title, lines[], at, color }
export function realCard(g, t, o = {}) {
  const k = ease.out(prog(t, o.at || 0, (o.at || 0) + 0.35)); if (k <= 0) return;
  const x = o.x ?? 80, y = o.y ?? 80, w = o.w ?? 640, lines = o.lines || [], h = 124 + lines.length * 60;
  g.save(); g.globalAlpha *= k; g.translate(0, (1 - k) * 30);
  rr(g, x, y, w, h, 22); g.fillStyle = alpha('#16202e', 0.88); g.fill();
  rr(g, x + 24, y + 26, 124, 52, 26); g.fillStyle = MINT; g.fill(); text(g, 'REAL', x + 86, y + 53, { size: 30, font: FONTS.ui, weight: 900, color: '#0e2a1e', spacing: 3 });
  text(g, o.title || '', x + 168, y + 53, { size: 40, font: FONTS.ui, weight: 900, color: '#ffffff', align: 'left' });
  lines.forEach((l, i) => text(g, l, x + 28, y + 122 + i * 60, { size: 36, font: FONTS.ui, weight: 800, color: '#dfe8f2', align: 'left' }));
  g.restore();
}

// name tag (e.g. "BISCUIT · 14")
export function nameTag(g, str, x, y, t = 1, at = 0, o = {}) {
  const k = ease.outBack(prog(t, at, at + 0.3)); if (k <= 0) return;
  const size = o.size || 34, w = measure(g, str, size, FONTS.ui, 900) + 50;
  g.save(); g.translate(x, y); g.scale(k, k); rr(g, -w / 2, -size * 0.85, w, size * 1.7, size * 0.85); g.fillStyle = o.fill || alpha('#1a1420', 0.82); g.fill();
  text(g, str, 0, 2, { size, font: FONTS.ui, weight: 900, color: o.color || '#fff1dc', spacing: 2 }); g.restore();
}

// big counter (e.g. 39 → 41)
export function counter(g, x, y, value, o = {}) {
  const size = o.size || 120;
  text(g, o.prefix ? o.prefix + value : String(value), x, y, { size, font: FONTS.ui, weight: 900, color: o.color || '#ffffff', stroke: size * 0.12, strokeColor: alpha('#1a1420', 0.85), glow: o.glow ?? 0 });
  if (o.label) text(g, o.label, x, y + size * 0.72, { size: size * 0.3, font: FONTS.ui, weight: 900, color: o.labelColor || '#ffffff', stroke: size * 0.05, strokeColor: alpha('#1a1420', 0.8), spacing: 4 });
}

// a big wall switch: o.k 0..1 = flicked to OFF
export function offSwitch(g, x, y, s = 1, o = {}) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -150, -230, 300, 460, 40); g.fillStyle = o.dusty ? '#c8c0b0' : '#f6f2ea'; g.fill(); g.strokeStyle = alpha('#000000', 0.15); g.lineWidth = 6; g.stroke();
  rr(g, -70, -150, 140, 300, 30); g.fillStyle = '#d8d2c6'; g.fill();
  const k = clamp(o.k || 0); rr(g, -60, -140 + k * 140, 120, 140, 26); g.fillStyle = '#ffffff'; g.fill(); g.strokeStyle = alpha('#000000', 0.12); g.stroke();
  text(g, 'ON', 0, -190, { size: 34, font: FONTS.ui, weight: 900, color: '#3a8a5a' }); text(g, 'OFF', 0, 192, { size: 34, font: FONTS.ui, weight: 900, color: CORALC });
  if (o.dusty) { g.fillStyle = alpha('#8a8070', 0.25); for (let i = 0; i < 40; i++) circle(g, ((i * 73) % 280) - 140, ((i * 131) % 440) - 220, 3, alpha('#8a8070', 0.3)); }
  g.restore();
}

// phone frame with content drawn by fn(g, x, y, w, h)
export function phone(g, cx, cy, h, fn) {
  const w = h * 0.5; rr(g, cx - w / 2 - 14, cy - h / 2 - 14, w + 28, h + 28, 44); g.fillStyle = '#1a1a22'; g.fill();
  g.save(); rr(g, cx - w / 2, cy - h / 2, w, h, 32); g.clip(); g.fillStyle = '#ffffff'; g.fillRect(cx - w / 2, cy - h / 2, w, h); fn(g, cx - w / 2, cy - h / 2, w, h); g.restore();
  rr(g, cx - 50, cy - h / 2 + 8, 100, 18, 9); g.fillStyle = '#1a1a22'; g.fill();
}
// laptop with content
export function laptop(g, cx, cy, w, fn) {
  const h = w * 0.62; rr(g, cx - w / 2 - 16, cy - h - 16, w + 32, h + 32, 18); g.fillStyle = '#2a2a34'; g.fill();
  g.save(); g.beginPath(); g.rect(cx - w / 2, cy - h, w, h); g.clip(); g.fillStyle = '#f6f8fa'; g.fillRect(cx - w / 2, cy - h, w, h); fn(g, cx - w / 2, cy - h, w, h); g.restore();
  poly(g, [[cx - w / 2 - 60, cy + 16], [cx + w / 2 + 60, cy + 16], [cx + w / 2 + 100, cy + 50], [cx - w / 2 - 100, cy + 50]], '#c8ccd4');
}
// TV news frame
export function tv(g, cx, cy, w, fn, o = {}) {
  const h = w * 0.5625; rr(g, cx - w / 2 - 20, cy - h / 2 - 20, w + 40, h + 40, 16); g.fillStyle = '#1a1a22'; g.fill();
  g.save(); g.beginPath(); g.rect(cx - w / 2, cy - h / 2, w, h); g.clip(); fn(g, cx - w / 2, cy - h / 2, w, h);
  g.fillStyle = '#c8302a'; g.fillRect(cx - w / 2, cy + h / 2 - 120, w, 70); text(g, o.headline || '', cx - w / 2 + 30, cy + h / 2 - 85, { size: 40, font: FONTS.ui, weight: 900, color: '#ffffff', align: 'left' });
  g.fillStyle = '#1a2a4a'; g.fillRect(cx - w / 2, cy + h / 2 - 50, w, 50); text(g, o.ticker || '', cx - w / 2 + 30, cy + h / 2 - 25, { size: 26, font: FONTS.ui, weight: 800, color: '#ffffff', align: 'left' });
  rr(g, cx - w / 2 + 24, cy - h / 2 + 24, 110, 44, 8); g.fillStyle = '#c8302a'; g.fill(); text(g, 'LIVE', cx - w / 2 + 79, cy - h / 2 + 47, { size: 26, font: FONTS.ui, weight: 900, color: '#ffffff' });
  g.restore();
}

// big crossed-out statement (myth)
export function myth(g, str, x, y, t, crossAt, o = {}) {
  const size = o.size || 64; text(g, str, x, y, { size, font: FONTS.ui, weight: 900, color: o.color || '#e8f0ff' });
  const k = ease.out(prog(t, crossAt, crossAt + 0.35)); if (k <= 0) return; const w = measure(g, str, size, FONTS.ui, 900);
  seg(g, [[x - w / 2 - 20, y + 10], [x - w / 2 - 20 + (w + 40) * k, y - 10]], 12, CORALC);
}

// a calendar page (tear-off)
export function calendarPage(g, x, y, s, top, big, o = {}) {
  g.save(); g.translate(x, y); g.rotate(o.rot || 0); g.scale(s, s);
  rr(g, -120, -140, 240, 280, 16); g.fillStyle = '#ffffff'; g.fill(); rr(g, -120, -140, 240, 70, 16); g.fillStyle = o.color || CORALC; g.fill(); g.fillRect(-120, -100, 240, 30);
  text(g, top, 0, -100, { size: 38, font: FONTS.ui, weight: 900, color: '#ffffff', spacing: 3 }); text(g, big, 0, 20, { size: 110, font: FONTS.ui, weight: 900, color: '#2a2a34' });
  g.restore();
}

// waveform (for audio, alarms, clicks)
export function wave(g, x, y, w, h, t, o = {}) {
  g.strokeStyle = o.color || SKYC; g.lineWidth = o.lw || 4; g.lineJoin = 'round'; g.beginPath();
  for (let i = 0; i <= 120; i++) { const u = i / 120, px = x + u * w, env = o.env ? o.env(u) : Math.sin(u * Math.PI); const py = y + Math.sin(u * (o.freq || 40) + t * (o.speed || 8)) * h * env * (0.6 + 0.4 * Math.sin(u * 7 + (o.seed || 0)));
    i ? g.lineTo(px, py) : g.moveTo(px, py); }
  g.stroke();
}

// ---------- who is speaking right now (from scenes/slots.js + the word timings) ----------
import { E as _E, talkAmount } from '/engine/core.js';
import { SLOTS } from './slots.js';
// the sentence a character is saying at global time gT: { text, age, talk } or null. tail = how long it stays up after
export function speech(who, gT, tail = 0.5) {
  const sl = SLOTS.find(s => s.who === who && gT >= s.start - 0.05 && gT <= s.end + tail); if (!sl) return null;
  const nm = (x) => x.toLowerCase().replace(/[^a-z']/g, ''), inLine = new Set(sl.line.split(/\s+/).map(nm));
  const ws = _E.words.filter(w => w.start >= sl.start - 0.8 && w.start <= sl.end + 0.05 && inLine.has(nm(w.word)));
  const sents = []; let cur = [];
  for (const w of ws) { cur.push(w); if (/[.?!]["”]?$/.test(w.word)) { sents.push(cur); cur = []; } }
  if (cur.length) sents.push(cur);
  let pick = null; for (const s of sents) if (s[0].start <= gT + 0.05) pick = s;
  if (!pick) return null;
  return { text: pick.map(w => w.word).join(' '), age: Math.max(0.05, gT - Math.max(pick[0].start, sl.start - 0.05)), talk: gT <= sl.end ? talkAmount(gT, sl.start, sl.end) : 0 };
}
// draw that sentence as a bubble near the speaker
export function speak(g, who, info, t, x, y, tx, ty, o = {}) {
  const sp = speech(who, info.globalT, o.tail ?? 0.5); if (!sp) return 0;
  let str = o.upper ? sp.text.toUpperCase() : sp.text;
  if (o.wrap && str.length > o.wrap) { const mid = str.length / 2; let best = -1; for (let i = 0; i < str.length; i++) if (str[i] === ' ' && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i; if (best > 0) str = str.slice(0, best) + '\n' + str.slice(best + 1); }   // o.wrap: split a long line in two
  say(g, str, x, y, sp.age, 0, tx, ty, o);
  return sp.talk;
}
