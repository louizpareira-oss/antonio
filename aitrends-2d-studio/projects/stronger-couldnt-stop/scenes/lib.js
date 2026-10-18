// lib.js — helpers shared by the shots of "What If You Got Stronger and Couldn't Stop?":
// the DAY / ×N badge, cracks and impact rings, eggs, baby Lily, the folding phone, +/− icons, REAL boxes, tally board.
import { E, V, S, clamp, lerp, prog, ease, rng, seg, circle, ring, rr, poly, alpha, shade, mix, linGrad, radGrad, glow, text, measure, FONTS, layer } from '/engine/core.js';
import { drawFigure, POSES, bigFace } from '/engine/rig2d.js';
export { heroFace, hand, say, chip, bigNum, checkMark, crossMark, backView, eyeGlow } from '/projects/see-10-seconds/scenes/lib.js';

export const GOLD = () => S().ui.gold;
export const CORAL = () => S().ui.accent;
// 1048576 -> "1,048,576"
export const fmt = (n) => Math.round(n).toLocaleString('en-US');
export const mult = (day) => 2 ** day;

// DAY / ×N badge, top-left. o.k = pop-in (0..1), o.flip = 0..1 moves from o.from to the day's value (odometer roll)
export function dayBadge(g, o = {}) {
  const { day = null, value = day != null ? mult(day) : 1, from = null, flip = 1, k = 1, danger = false, x = V(70, 50), y = V(118, 210), label = null } = o;
  if (k <= 0.01) return;
  const col = danger ? CORAL() : GOLD(), v = from != null ? lerp(from, value, ease.inOut(clamp(flip))) : value;
  const left = label ?? (day != null ? `DAY ${day}` : ''), right = '×' + fmt(v);
  const ls = 30, rs = 40, lw = left ? measure(g, left, ls, FONTS.ui, 900) : 0, rw = measure(g, right, rs, FONTS.ui, 900);
  const w = (left ? lw + 44 : 0) + rw + 48, h = 66, sc = 0.8 + 0.2 * ease.outBack(clamp(k));
  g.save(); g.globalAlpha *= clamp(k * 2); g.translate(x, y); g.scale(sc, sc);
  rr(g, 0, -h / 2, w, h, h / 2); g.fillStyle = 'rgba(10,12,24,.82)'; g.fill(); g.strokeStyle = alpha(col, 0.7); g.lineWidth = 2.5; g.stroke();
  let xx = 24;
  if (left) { text(g, left, xx, 2, { size: ls, color: S().ui.cream, font: FONTS.ui, weight: 900, align: 'left', spacing: 2 }); xx += lw + 20; seg(g, [[xx, -20], [xx, 20]], 2, alpha(col, 0.5)); xx += 24; }
  text(g, right, xx, 2, { size: rs, color: col, font: FONTS.ui, weight: 900, align: 'left', glow: 14, glowColor: alpha(col, 0.7) });
  g.restore();
}
// gold "+" (good side) / grey "−" (bad side) corner icon, like the reference channel
export function plusMinus(g, kind = '+', o = {}) {
  const { k = 1, x = kind === '+' ? V(64, 60) : E.W - V(64, 60), y = V(250, 330), r = 34 } = o; if (k <= 0) return;
  const col = kind === '+' ? GOLD() : '#9aa0b4', sc = 0.7 + 0.3 * ease.outBack(clamp(k));
  g.save(); g.globalAlpha *= clamp(k * 2); g.translate(x, y); g.scale(sc, sc);
  circle(g, 0, 0, r, 'rgba(10,12,24,.8)'); ring(g, 0, 0, r, 3, alpha(col, 0.8)); glow(g, 0, 0, r * 2, col, 0.25);
  seg(g, [[-r * 0.45, 0], [r * 0.45, 0]], r * 0.22, col); if (kind === '+') seg(g, [[0, -r * 0.45], [0, r * 0.45]], r * 0.22, col);
  g.restore();
}
// "REAL" fact box: tag + short line
export function realBox(g, str, x, y, o = {}) {
  const { k = 1, size = 28, w = null } = o; if (k <= 0) return;
  const tw = measure(g, str, size, FONTS.ui, 900), ww = w ?? tw + 150, h = size * 2.3, sc = 0.85 + 0.15 * ease.outBack(clamp(k));
  g.save(); g.globalAlpha *= clamp(k * 2); g.translate(x, y); g.scale(sc, sc);
  rr(g, -ww / 2, -h / 2, ww, h, 14); g.fillStyle = 'rgba(10,14,26,.9)'; g.fill(); g.strokeStyle = alpha(S().ui.good, 0.6); g.lineWidth = 2; g.stroke();
  rr(g, -ww / 2 + 14, -h / 2 + 12, 92, h - 24, 10); g.fillStyle = S().ui.good; g.fill();
  text(g, 'REAL', -ww / 2 + 60, 2, { size: size * 0.8, color: '#06140c', font: FONTS.ui, weight: 900, spacing: 2 });
  text(g, str, -ww / 2 + 124, 2, { size, color: S().ui.cream, font: FONTS.ui, weight: 900, align: 'left' });
  g.restore();
}

// ---------- cracks & impacts ----------
// spiderweb crack centred at (x, y), radius r, grown by k (0..1)
export function cracks(g, x, y, r, k = 1, o = {}) {
  const { seed = 3, color = 'rgba(255,255,255,.85)', w = 3, arms = 9, rings = 3, glowCol = null } = o; if (k <= 0) return;
  const rnd = rng(seed), ang = [], len = [];
  for (let i = 0; i < arms; i++) { ang.push((i / arms) * Math.PI * 2 + (rnd() - 0.5) * 0.5); len.push(r * (0.6 + rnd() * 0.4)); }
  g.save(); g.strokeStyle = color; g.lineWidth = w; g.lineCap = 'round'; g.lineJoin = 'round';
  if (glowCol) { g.shadowColor = glowCol; g.shadowBlur = 14; }
  for (let i = 0; i < arms; i++) {                                      // radial arms, slightly zig-zag
    const L = len[i] * clamp(k * 1.3); let px = x, py = y; g.beginPath(); g.moveTo(px, py);
    for (let s = 1; s <= 5; s++) { const d = L * s / 5, a = ang[i] + (rnd() - 0.5) * 0.25; px = x + Math.cos(a) * d; py = y + Math.sin(a) * d; g.lineTo(px, py); }
    g.stroke();
  }
  for (let j = 1; j <= rings; j++) {                                    // concentric connecting rings
    const rk = clamp(k * 1.6 - j * 0.25); if (rk <= 0) continue; g.beginPath();
    for (let i = 0; i <= arms; i++) { const ii = i % arms, d = len[ii] * (j / (rings + 0.6)), a = ang[ii]; const px = x + Math.cos(a) * d, py = y + Math.sin(a) * d; i ? g.lineTo(px, py) : g.moveTo(px, py); if (i / arms > rk) break; }
    g.stroke();
  }
  g.restore();
}
// gold impact: rings + spark rays, age = seconds since the hit
export function impact(g, x, y, age, o = {}) {
  const { r = 160, color = GOLD(), n = 12, seed = 5 } = o; if (age < 0 || age > 0.9) return;
  const p = clamp(age / 0.9), a = 1 - p, rnd = rng(seed);
  glow(g, x, y, r * (0.6 + p), color, 0.6 * a);
  for (let i = 0; i < 3; i++) { const rr2 = r * (0.3 + p * (1 + i * 0.5)); ring(g, x, y, rr2, 6 * a, alpha(color, 0.7 * a)); }
  for (let i = 0; i < n; i++) { const an = rnd() * Math.PI * 2, d0 = r * (0.3 + p * 0.8), d1 = d0 + r * 0.35 * a; seg(g, [[x + Math.cos(an) * d0, y + Math.sin(an) * d0], [x + Math.cos(an) * d1, y + Math.sin(an) * d1]], 5 * a, alpha('#fff3d6', a)); }
}
// debris chunks flying out from (x, y)
export function debris(g, x, y, age, o = {}) {
  const { n = 14, color = '#e8dccb', size = 14, speed = 700, seed = 8, grav = 1800 } = o; if (age < 0) return; const rnd = rng(seed);
  for (let i = 0; i < n; i++) {
    const an = -Math.PI * (0.1 + rnd() * 0.8), v = speed * (0.4 + rnd() * 0.8), px = x + Math.cos(an) * v * age * (rnd() < 0.5 ? -1 : 1), py = y + Math.sin(an) * v * age + 0.5 * grav * age * age;
    const s = size * (0.5 + rnd()); g.save(); g.translate(px, py); g.rotate(age * 6 + i); g.fillStyle = shade(color, -rnd() * 0.3); g.fillRect(-s / 2, -s / 2, s, s * 0.7); g.restore();
  }
}

// ---------- objects ----------
// egg (side view). o.broken 0..1 → shell halves + yolk splat. o.crack 0..1 → hairline crack
export function egg(g, x, y, s = 1, o = {}) {
  const { broken = 0, crack = 0, rot = 0, rim = null, shell = '#f3ead8', glowC = null } = o;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  if (broken > 0) {
    const p = ease.out(clamp(broken));
    g.fillStyle = '#f7c531'; g.beginPath(); g.ellipse(0, 40, 40 + 110 * p, 12 + 26 * p, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = alpha('#fff6e0', 0.7); g.beginPath(); g.ellipse(0, 36, 60 + 150 * p, 18 + 30 * p, 0, 0, Math.PI * 2); g.fill();
    circle(g, 0, 36, 26 + 6 * p, '#ffb21a'); circle(g, -8, 30, 8, alpha('#fff', 0.6));
    for (const sx of [-1, 1]) { g.save(); g.translate(sx * (30 + 90 * p), -10 + 40 * p); g.rotate(sx * (0.6 + 1.6 * p)); g.fillStyle = shell; g.beginPath(); g.ellipse(0, 0, 34, 44, 0, Math.PI * (sx < 0 ? 0.5 : -0.5), Math.PI * (sx < 0 ? 1.5 : 0.5)); g.fill();
      g.strokeStyle = shade(shell, -0.3); g.lineWidth = 3; g.beginPath(); for (let i = 0; i <= 6; i++) g.lineTo(sx * (i % 2 ? 6 : -4) * 0, -44 + i * 14.6); g.stroke(); g.restore(); }
    for (let i = 0; i < 9; i++) { const a = -Math.PI + i * 0.4, d = 70 + 140 * p; circle(g, Math.cos(a) * d, 20 + Math.sin(a) * d * 0.6 + 80 * p * p, 6 + (i % 3) * 3, alpha('#f7c531', 1 - p * 0.3)); }
  } else {
    if (glowC) glow(g, 0, 0, 120, glowC, 0.5);
    if (rim) { g.fillStyle = rim; g.beginPath(); g.ellipse(-4, -4, 46, 60, 0, 0, Math.PI * 2); g.fill(); }
    g.fillStyle = linGrad(g, -40, -60, 40, 60, [shell, shade(shell, -0.12), shade(shell, -0.28)]); g.beginPath(); g.ellipse(0, 0, 44, 58, 0, 0, Math.PI * 2); g.fill();
    g.fillStyle = alpha('#ffffff', 0.55); g.beginPath(); g.ellipse(-14, -22, 10, 18, -0.3, 0, Math.PI * 2); g.fill();
    if (crack > 0) { g.strokeStyle = shade(shell, -0.55); g.lineWidth = 2.5; g.beginPath(); const n = Math.ceil(7 * crack); for (let i = 0; i <= n; i++) g.lineTo(-40 + i * 12, -6 + (i % 2 ? -8 : 6)); g.stroke(); }
  }
  g.restore();
}
// egg carton (side-ish view): n eggs showing
export function carton(g, x, y, s = 1, n = 6, o = {}) {
  g.save(); g.translate(x, y); g.scale(s, s);
  for (let i = 0; i < n; i++) egg(g, -150 + i * 60, -36, 0.55, o);
  rr(g, -190, -30, 380, 60, 12); g.fillStyle = '#c9b48f'; g.fill(); g.fillStyle = shade('#c9b48f', -0.2); for (let i = 0; i < 6; i++) { g.beginPath(); g.arc(-150 + i * 60, -30, 26, 0, Math.PI); g.fill(); }
  g.restore();
}
// baby LILY swaddled in a pink blanket (lying, facing up-left). o.awake, o.expr ('sleep'|'smile'|'giggle'|'cry'), o.hand = reaching hand angle
export function baby(g, x, y, s = 1, o = {}) {
  const { blanket = '#F29AC0', expr = 'sleep', rot = 0, rim = null, hand = null, glint = 0 } = o, ink = S().ink;
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  if (rim) { g.fillStyle = rim; g.beginPath(); g.ellipse(18, -4, 128, 66, 0, 0, Math.PI * 2); g.fill(); circle(g, -92, -18, 62, rim); }
  g.fillStyle = linGrad(g, -80, -60, 120, 60, [mix(blanket, '#ffffff', 0.3), blanket, shade(blanket, -0.25)]); g.beginPath(); g.ellipse(22, 0, 124, 62, 0, 0, Math.PI * 2); g.fill();
  g.strokeStyle = alpha(shade(blanket, -0.35), 0.6); g.lineWidth = 5; for (const dx of [10, 60]) { g.beginPath(); g.moveTo(dx - 40, -50); g.quadraticCurveTo(dx, 0, dx - 30, 52); g.stroke(); }
  circle(g, -92, -16, 58, ink);                                                    // head
  g.fillStyle = mix(blanket, '#ffffff', 0.45); g.beginPath(); g.arc(-92, -16, 66, Math.PI * 0.5, Math.PI * 1.25); g.lineTo(-60, -10); g.closePath(); g.fill();  // hood fold
  const F = S().feature;
  if (expr === 'sleep') { for (const dx of [-112, -76]) { g.strokeStyle = F; g.lineWidth = 5; g.beginPath(); g.arc(dx, -28, 9, 0.2, Math.PI - 0.2); g.stroke(); } }
  else { for (const dx of [-112, -76]) circle(g, dx, -28, 8, F); if (glint > 0) for (const dx of [-112, -76]) glow(g, dx, -28, 26, GOLD(), glint); }
  if (expr === 'smile' || expr === 'giggle') { g.strokeStyle = F; g.lineWidth = 5; g.beginPath(); g.arc(-94, -6, expr === 'giggle' ? 14 : 10, 0.2, Math.PI - 0.2); g.stroke(); }
  else if (expr === 'cry') { g.fillStyle = F; g.beginPath(); g.ellipse(-94, 2, 10, 12, 0, 0, Math.PI * 2); g.fill(); }
  else circle(g, -94, 0, 4, F);
  if (hand != null) { const hx = -40 + Math.cos(hand) * 60, hy = -40 + Math.sin(hand) * 60; seg(g, [[-30, -30], [hx, hy]], 18, ink); circle(g, hx, hy, 14, ink); }
  g.restore();
}
// smartphone held upright (front view) at (x, y) with height h; fold 0..1 bends it in half toward the camera
export function phoneFold(g, x, y, h, fold = 0, o = {}) {
  const { screen = '#6fb8ff', crackK = 0, seed = 2, tilt = 0 } = o, w = h * 0.48, ink = S().ink;
  g.save(); g.translate(x, y); g.rotate(tilt);
  const f = ease.inOut(clamp(fold)), c = Math.cos(f * Math.PI * 0.94), topH = h / 2 * c;   // top half swings toward us, then down over the bottom half
  const face = (yy, hh, dark) => { rr(g, -w / 2, yy, w, hh, 14); g.fillStyle = ink; g.fill(); if (hh > 18) { rr(g, -w / 2 + 8, yy + 8, w - 16, hh - 16, 8);
    g.fillStyle = linGrad(g, 0, yy, 0, yy + hh, [mix(screen, '#ffffff', 0.25), screen, shade(screen, -0.35 - dark * 0.4)]); g.fill(); } };
  face(0, h / 2, 0);                                                                // bottom half stays in the hand
  if (crackK > 0) cracks(g, 0, h * 0.2, w * 0.6, crackK, { seed, w: 2, arms: 7, rings: 2, color: 'rgba(255,255,255,.85)' });
  if (topH >= 0) face(-topH, topH, f);
  else {                                                                            // past 90°: we see the BACK of the top half, folded down
    const bh = -topH; rr(g, -w / 2 - 2, 0, w + 4, bh, 14); g.fillStyle = linGrad(g, 0, 0, 0, bh, ['#3a3f4c', '#22262f']); g.fill();
    rr(g, -w / 2 + 14, bh - 70, 64, 56, 14); g.fillStyle = '#14161c'; g.fill(); circle(g, -w / 2 + 34, bh - 54, 11, '#4a5060'); circle(g, -w / 2 + 58, bh - 30, 11, '#4a5060');
    g.fillStyle = alpha('#ffffff', 0.18); g.fillRect(-w / 2 + 6, 6, w - 12, 6);
  }
  if (f > 0.05) { seg(g, [[-w / 2 - 8, 0], [w / 2 + 8, 0]], 12 + 10 * f, shade(ink, 0.3)); for (let i = 0; i < 6; i++) FX_spark(g, (i - 2.5) * w / 6, 0, 22, f); }
  g.restore();
}
function FX_spark(g, x, y, s, f) { const a = 0.9 * Math.sin(Math.min(1, f) * Math.PI); if (a <= 0.02) return; g.save(); g.globalCompositeOperation = 'lighter'; glow(g, x, y, s * 1.6, '#ffffff', a * 0.6); seg(g, [[x - s, y], [x + s, y]], 3, alpha('#ffffff', a)); seg(g, [[x, y - s], [x, y + s]], 3, alpha('#ffffff', a)); g.restore(); }
// Project Atlas logo: a mountain inside a ring
export function atlasLogo(g, x, y, s = 1, col = '#3FC1C9') {
  g.save(); g.translate(x, y); g.scale(s, s);
  ring(g, 0, 0, 40, 5, col); poly(g, [[-26, 18], [-4, -20], [6, -4], [12, -12], [28, 18]], col); poly(g, [[-10, -10], [-4, -20], [2, -10]], '#ffffff');
  g.restore();
}
// chalk tally board: "DAD" tallies vs "YOU" count
export function tally(g, x, y, s = 1, o = {}) {
  const { you = 0, k = 1, flash = 0 } = o; g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -260, -170, 520, 340, 18); g.fillStyle = '#6b4a2e'; g.fill(); rr(g, -240, -150, 480, 300, 10); g.fillStyle = '#1f3a30'; g.fill();
  const ch = 'rgba(240,240,230,.9)';
  text(g, 'DAD', -150, -100, { size: 40, color: ch, font: FONTS.ui, weight: 900 }); text(g, 'YOU', 130, -100, { size: 40, color: ch, font: FONTS.ui, weight: 900 });
  seg(g, [[0, -130], [0, 130]], 4, alpha(ch, 0.5));
  const n = Math.floor(40 * clamp(k)); for (let i = 0; i < n; i++) { const gx = -215 + (i % 8) * 24 + Math.floor((i % 40) / 5) * 0, gy = -50 + Math.floor(i / 8) * 34, grp = i % 5; if (grp === 4) seg(g, [[gx - 96, gy + 12], [gx + 4, gy - 12]], 3, ch); else seg(g, [[gx, gy - 14], [gx + 2, gy + 14]], 3, ch); }
  text(g, String(you), 130, 30, { size: 110, color: you > 0 ? GOLD() : ch, font: FONTS.ui, weight: 900, glow: you > 0 ? 30 * (0.5 + flash) : 0, glowColor: alpha(GOLD(), 0.8) });
  g.restore();
}
// world-is-fragile look: draw thin glassy crack lines over a region
export function glassify(g, x, y, w, h, k = 1, seed = 4) {
  if (k <= 0) return; const rnd = rng(seed);
  g.save(); g.globalAlpha *= k; g.strokeStyle = 'rgba(220,240,255,.55)'; g.lineWidth = 1.6;
  for (let i = 0; i < 26; i++) { let px = x + rnd() * w, py = y + rnd() * h; g.beginPath(); g.moveTo(px, py); for (let j = 0; j < 4; j++) { px += (rnd() - 0.5) * 120; py += (rnd() - 0.5) * 120; g.lineTo(px, py); } g.stroke(); }
  g.restore();
}
// a simple sun-up time-lapse sky band used by data shots
export function sunrise(g, k, o = {}) {
  const { y0 = 0, h = E.H } = o, c0 = mix('#1d2550', '#f2a46a', k), c1 = mix('#3a3570', '#ffe2a8', k);
  g.fillStyle = linGrad(g, 0, y0, 0, y0 + h, [c0, c1]); g.fillRect(-E.W, y0, E.W * 3, h);
  glow(g, E.W * 0.5, y0 + h * (1 - 0.6 * k), 500, '#ffd59a', 0.5 * k);
}
// local time (seconds into the shot) when `word` is spoken, searching from the shot start; fallback if not found
import { wordTime } from '/engine/core.js';
export function wt(word, info, t, fallback = 0) { const s0 = info.globalT - t, w = wordTime(word, s0); return w == null ? fallback : w - s0; }
// a hedge: rounded green bush row (front edge at y)
export function hedge(g, x, y, w, h, o = {}) {
  const { color = '#3f7a3a', burst = 0, seed = 6 } = o, r = rng(seed);
  for (let i = 0; i < Math.ceil(w / 90); i++) { const bx = x + i * 90 + 45, br = 70 + r() * 30; circle(g, bx, y - h + br * 0.6, br, shade(color, -0.1 + r() * 0.15)); }
  rr(g, x, y - h + 40, w, h - 40, 20); g.fillStyle = shade(color, -0.15); g.fill();
  for (let i = 0; i < 40; i++) { const lx = x + r() * w, ly = y - h + r() * h; circle(g, lx, ly, 10 + r() * 8, alpha(shade(color, 0.25), 0.6)); }
  if (burst > 0 && burst < 1.4) { for (let i = 0; i < 26; i++) { const a = -Math.PI * r(), d = 80 + 380 * burst * (0.5 + r()), lx = x + w / 2 + Math.cos(a) * d * (r() < 0.5 ? -1 : 1), ly = y - h + Math.sin(a) * d + 300 * burst * burst; g.save(); g.translate(lx, ly); g.rotate(burst * 8 + i); g.fillStyle = alpha(shade(color, 0.2 + r() * 0.2), clamp(1.3 - burst)); g.beginPath(); g.ellipse(0, 0, 14, 7, 0, 0, Math.PI * 2); g.fill(); g.restore(); } }
}
// small car (side view) facing right; x = centre, y = ground. o.door 0..1 opens / rips the near door
export function car(g, x, y, s = 1, o = {}) {
  const { color = '#d64a33', rot = 0, lift = 0, door = 0, lights = false } = o, ink = S().ink;
  g.save(); g.translate(x, y - lift); g.rotate(rot); g.scale(s, s);
  for (const wx of [-150, 150]) { circle(g, wx, -40, 48, '#1a1820'); circle(g, wx, -40, 20, '#8a8a92'); }
  rr(g, -260, -150, 520, 100, 36); g.fillStyle = color; g.fill();
  poly(g, [[-150, -150], [-100, -240], [120, -240], [190, -150]], shade(color, -0.08));
  poly(g, [[-130, -156], [-92, -226], [0, -226], [0, -156]], '#bfe0f0'); poly(g, [[14, -156], [14, -226], [112, -226], [168, -156]], '#bfe0f0');
  g.fillStyle = alpha('#ffffff', 0.25); g.fillRect(-250, -140, 500, 8);
  if (lights) { glow(g, 255, -110, 160, '#fff6d0', 0.7); circle(g, 252, -112, 12, '#fff6d0'); circle(g, -254, -112, 10, '#ff4a3a'); }
  if (door > 0) { g.save(); g.translate(0 + door * 80, -60 + door * 30); g.rotate(door * 0.6); rr(g, -120, -96, 150, 96, 12); g.fillStyle = shade(color, 0.1); g.fill(); g.restore(); g.fillStyle = shade(color, -0.5); g.fillRect(-110, -150, 130, 96); }
  g.restore();
}
// front-view body outline for blueprints; hl = { muscle, bone, tendon, skin } each 0..1
export function bodyOutline(g, x, y, s = 1, hl = {}, o = {}) {
  const ui = S().ui, col = o.color || ui.blueprint, gold = ui.gold;
  g.save(); g.translate(x, y); g.scale(s, s); g.lineCap = 'round'; g.lineJoin = 'round';
  const limbs = [[[-70, -330], [-150, -170], [-170, -20]], [[70, -330], [150, -170], [170, -20]], [[-45, -40], [-60, 200], [-70, 420]], [[45, -40], [60, 200], [70, 420]]];
  const L = (pts, w, c) => { g.strokeStyle = c; g.lineWidth = w; g.beginPath(); g.moveTo(...pts[0]); pts.slice(1).forEach(p => g.lineTo(...p)); g.stroke(); };
  for (const l of limbs) L(l, 60, alpha(col, 0.12)); g.fillStyle = alpha(col, 0.12); rr(g, -85, -350, 170, 330, 60); g.fill(); circle(g, 0, -440, 70, alpha(col, 0.12));
  if (hl.skin) { g.save(); g.shadowColor = '#ffb6a0'; g.shadowBlur = 20 * hl.skin; for (const l of limbs) L(l, 64, alpha('#ffb6a0', 0.5 * hl.skin)); g.strokeStyle = alpha('#ffb6a0', 0.7 * hl.skin); g.lineWidth = 6; rr(g, -88, -353, 176, 336, 62); g.stroke(); g.beginPath(); g.arc(0, -440, 73, 0, Math.PI * 2); g.stroke(); g.restore(); }
  if (hl.muscle) { g.save(); g.globalAlpha *= hl.muscle; for (const l of limbs) { L([l[0], l[1]], 46, alpha(gold, 0.7)); L([l[1], l[2]], 36, alpha(gold, 0.55)); } g.fillStyle = alpha(gold, 0.5); g.beginPath(); g.ellipse(-40, -270, 40, 50, 0, 0, Math.PI * 2); g.ellipse(40, -270, 40, 50, 0, 0, Math.PI * 2); g.fill(); g.restore(); }
  if (hl.bone) { g.save(); g.globalAlpha *= hl.bone; for (const l of limbs) L(l, 12, '#f4f8ff'); L([[0, -380], [0, -40]], 12, '#f4f8ff'); for (let i = 0; i < 5; i++) L([[-60, -330 + i * 40], [60, -330 + i * 40]], 6, alpha('#f4f8ff', 0.7)); circle(g, 0, -440, 56, alpha('#f4f8ff', 0.5)); g.restore(); }
  if (hl.tendon) { g.save(); g.globalAlpha *= hl.tendon; for (const l of limbs) for (const p of [l[1], l[2]]) { glow(g, p[0], p[1], 50, '#ff9a5a', 0.6); circle(g, p[0], p[1], 14, '#ffb07a'); } g.restore(); }
  g.strokeStyle = col; g.lineWidth = 3; for (const l of limbs) { L(l, 3, col); } rr(g, -85, -350, 170, 330, 60); g.stroke(); g.beginPath(); g.arc(0, -440, 70, 0, Math.PI * 2); g.stroke();
  g.restore();
}
// stamped label ("×2") that thumps in at age (s)
export function stamp(g, str, x, y, age, o = {}) {
  const { size = 64, color = GOLD(), rot = -0.12 } = o; if (age < 0) return; const k = clamp(age / 0.18), sc = lerp(2.2, 1, ease.out(k));
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(sc, sc); g.globalAlpha *= k;
  const bw = Math.max(size * 2.0, str.length * size * 0.72 + size * 0.6);
  rr(g, -bw / 2, -size * 0.7, bw, size * 1.4, 12); g.fillStyle = alpha('#14101c', 0.78); g.fill(); g.strokeStyle = color; g.lineWidth = 6; g.stroke();
  text(g, str, 0, 3, { size, color, font: FONTS.ui, weight: 900, glow: 16, glowColor: alpha(color, 0.6) });
  g.restore();
}
