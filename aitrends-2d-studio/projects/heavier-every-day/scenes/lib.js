// lib.js — helpers for "2x Heavier": the weight badge, midnight clock, Grandpa's face, the weight seesaw and its loads,
// the 10 t sign, footprints, and flat UI screens (phone, browser, email, medical chart, video call, tablet, mission HUD).
import { E, V, S, clamp, lerp, prog, ease, rng, seg, circle, ring, rr, poly, alpha, shade, mix, linGrad, radGrad, glow, text, measure, FONTS } from '/engine/core.js';
import { drawFigure, POSES, bigFace } from '/engine/rig2d.js';
import { GRANDPA } from './cast.js';
export { heroFace, hand, say, chip, bigNum, checkMark, crossMark, impact, debris, cracks, stamp, palmUp, fallingDust, wt, GOLD, CORAL, fmt, car, realBox, sunrise, bodyOutline, plusMinus } from '/projects/stronger-couldnt-stop/scenes/lib.js';
import { GOLD, CORAL, fmt, stamp } from '/projects/stronger-couldnt-stop/scenes/lib.js';

export const kg = (day) => 70 * 2 ** day;
// "560 kg", "8,960 kg", "35,840 kg", then tonnes from day 10: "72 t", "143 t", "73,400 t"
export const wStr = (day) => day < 10 ? fmt(kg(day)) + ' kg' : fmt(Math.round(kg(day) / 1000 / (day < 12 ? 1 : 100)) * (day < 12 ? 1 : 100)) + ' t';

// top-left badge: DAY n │ weight. flip 0..1 animates from day-1 to day (split-flap on the weight)
export function weightBadge(g, o = {}) {
  const { day = 1, k = 1, flip = 1, danger = false, x = V(70, 50), y = V(118, 210), label = null } = o; if (k <= 0.01) return;
  const col = danger ? CORAL() : GOLD(), left = label ?? `DAY ${day}`, q = clamp(flip), right = q < 0.5 && day > 0 ? wStr(day - 1) : wStr(day);
  const ls = 30, rs = 40, lw = measure(g, left, ls, FONTS.ui, 900), rw = measure(g, right, rs, FONTS.ui, 900), w = lw + rw + 92, h = 66, sc = 0.8 + 0.2 * ease.outBack(clamp(k));
  g.save(); g.globalAlpha *= clamp(k * 2); g.translate(x, y); g.scale(sc, sc);
  rr(g, 0, -h / 2, w, h, h / 2); g.fillStyle = 'rgba(10,12,24,.82)'; g.fill(); g.strokeStyle = alpha(col, 0.7); g.lineWidth = 2.5; g.stroke();
  text(g, left, 24, 2, { size: ls, color: S().ui.cream, font: FONTS.ui, weight: 900, align: 'left', spacing: 2 }); seg(g, [[lw + 44, -20], [lw + 44, 20]], 2, alpha(col, 0.5));
  g.save(); g.translate(lw + 68 + rw / 2, 2); g.scale(1, Math.max(0.05, Math.abs(1 - 2 * q))); text(g, right, 0, 0, { size: rs, color: col, font: FONTS.ui, weight: 900, glow: 14, glowColor: alpha(col, 0.7) }); g.restore();
  g.restore();
}
// analog wall clock; mins = minutes past 11 p.m. (0..60 → 12:00); stampAt = age of the ×2 stamp (s) or null
export function midnightClock(g, x, y, r, mins, o = {}) {
  const ink = S().ink; circle(g, x, y, r + 10, ink); circle(g, x, y, r, o.face || '#f4efe6'); ring(g, x, y, r + 4, 4, alpha('#ffe2a8', 0.7));
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; seg(g, [[x + Math.sin(a) * r * 0.82, y - Math.cos(a) * r * 0.82], [x + Math.sin(a) * r * 0.93, y - Math.cos(a) * r * 0.93]], i % 3 ? 3 : 7, ink); }
  const hA = (11 + mins / 60) / 12 * Math.PI * 2, mA = mins / 60 * Math.PI * 2;
  seg(g, [[x, y], [x + Math.sin(hA) * r * 0.5, y - Math.cos(hA) * r * 0.5]], 10, ink); seg(g, [[x, y], [x + Math.sin(mA) * r * 0.78, y - Math.cos(mA) * r * 0.78]], 6, ink); circle(g, x, y, 9, CORAL());
  if (o.stampAt != null) stamp(g, '×2', x + r * 0.9, y - r * 0.6, o.stampAt, { size: r * 0.42, color: CORAL(), rot: -0.2 });
}
// Grandpa's big face: white visor, white moustache and eyebrows
export function grandpaFace(g, cx, cy, r, o = {}) {
  bigFace(g, cx, cy, r, { ...o, outfit: GRANDPA });
  g.save(); g.translate(cx, cy); if (o.tilt) g.rotate(o.tilt);
  g.fillStyle = '#f4f2ee'; g.beginPath(); g.moveTo(-r * 0.36, r * 0.2); g.quadraticCurveTo(-r * 0.2, r * 0.02, 0, r * 0.12); g.quadraticCurveTo(r * 0.2, r * 0.02, r * 0.36, r * 0.2); g.quadraticCurveTo(r * 0.18, r * 0.2, 0, r * 0.18); g.quadraticCurveTo(-r * 0.18, r * 0.2, -r * 0.36, r * 0.2); g.fill();
  g.restore();
}
// moustache for a full figure (call after drawFigure with the same o): small white bar under the face
export function figMoustache(g, hx, hy, r, facing = 1) { g.fillStyle = '#f4f2ee'; rr(g, hx + facing * r * 0.2 - r * 0.32, hy + r * 0.18, r * 0.64, r * 0.16, r * 0.08); g.fill(); }

// ---------- the weight seesaw ----------
// plank pivot at (x, y), length L; tilt > 0 = left side down. left/right: (g, x, y) draw callbacks at each end (feet at y)
export function seesaw(g, x, y, L, tilt, left, right, o = {}) {
  const ink = S().ink; poly(g, [[x - 70, y + 150], [x + 70, y + 150], [x, y]], o.base || '#6a5a7a');
  g.save(); g.translate(x, y); g.rotate(-tilt); rr(g, -L / 2, -14, L, 28, 10); g.fillStyle = o.plank || '#c8935a'; g.fill(); g.strokeStyle = ink; g.lineWidth = 4; g.stroke();
  g.save(); g.translate(-L / 2 + 120, -14); g.rotate(tilt); left && left(g, 0, 0); g.restore();
  g.save(); g.translate(L / 2 - 160, -14); g.rotate(tilt); right && right(g, 0, 0); g.restore();
  g.restore();
}
// simple flat icons standing on (0,0), about s*300 px tall
export const LOADS = {
  gorilla(g, s = 1) { const c = '#3a3440'; g.save(); g.scale(s, s); circle(g, -40, -150, 90, c); circle(g, 30, -250, 55, c); rr(g, -120, -150, 60, 150, 26); g.fillStyle = c; g.fill(); rr(g, 30, -150, 60, 150, 26); g.fill(); circle(g, 40, -255, 26, '#6a5a6a'); circle(g, 34, -262, 5, '#fff'); circle(g, 52, -262, 5, '#fff'); g.restore(); },
  piano(g, s = 1) { g.save(); g.scale(s, s); rr(g, -150, -260, 300, 220, 14); g.fillStyle = '#1e1a22'; g.fill(); g.fillStyle = '#f4efe6'; g.fillRect(-140, -130, 280, 40); for (let i = 0; i < 12; i++) g.fillRect(-138 + i * 23, -130, 14, 22); g.fillStyle = '#1e1a22'; for (let i = 0; i < 12; i++) if (i % 7 !== 2 && i % 7 !== 6) g.fillRect(-124 + i * 23, -130, 10, 22); rr(g, -140, -40, 20, 40, 4); g.fill(); rr(g, 120, -40, 20, 40, 4); g.fill(); g.restore(); },
  horse(g, s = 1) { const c = '#8a5a3a'; g.save(); g.scale(s, s); rr(g, -150, -200, 260, 100, 50); g.fillStyle = c; g.fill(); for (const lx of [-130, -90, 50, 90]) { rr(g, lx - 12, -120, 24, 120, 10); g.fill(); } poly(g, [[90, -190], [150, -300], [200, -280], [140, -170]], c); rr(g, 150, -310, 80, 50, 22); g.fill(); seg(g, [[-150, -180], [-200, -100]], 18, '#4a2a1a'); poly(g, [[130, -290], [100, -240], [120, -200], [150, -270]], '#4a2a1a'); circle(g, 190, -295, 6, '#fff'); g.restore(); },
  car(g, s = 1) { g.save(); g.scale(s, s); rr(g, -180, -120, 360, 80, 24); g.fillStyle = '#d64a33'; g.fill(); poly(g, [[-100, -120], [-60, -190], [70, -190], [120, -120]], '#d64a33'); poly(g, [[-80, -125], [-50, -178], [0, -178], [0, -125]], '#bfe0f0'); poly(g, [[12, -125], [12, -178], [62, -178], [100, -125]], '#bfe0f0'); for (const wx of [-110, 110]) { circle(g, wx, -40, 40, '#16141c'); circle(g, wx, -40, 16, '#9aa0aa'); } g.restore(); },
  trex(g, s = 1) { const c = '#4f7a3a'; g.save(); g.scale(s, s); poly(g, [[-260, -150], [-60, -230], [60, -250], [80, -180], [20, -120], [-140, -120]], c); poly(g, [[40, -260], [140, -300], [220, -290], [230, -240], [120, -220], [70, -200]], c); poly(g, [[150, -250], [230, -245], [225, -225], [160, -230]], '#f4efe6'); circle(g, 160, -280, 7, '#fff'); for (const [lx, d] of [[-60, 0], [20, 10]]) poly(g, [[lx - 30, -150], [lx + 30, -150], [lx + 20 + d, 0], [lx - 10 + d, 0]], shade(c, -0.15)); seg(g, [[70, -200], [100, -170], [92, -150]], 10, shade(c, -0.15)); g.restore(); },
  elephant(g, s = 1) { const c = '#8a8a98'; g.save(); g.scale(s, s); rr(g, -170, -260, 300, 180, 80); g.fillStyle = c; g.fill(); for (const lx of [-140, -80, 50, 100]) { rr(g, lx - 24, -110, 48, 110, 14); g.fill(); } circle(g, 150, -220, 80, c); g.beginPath(); g.ellipse(110, -210, 50, 75, 0.2, 0, Math.PI * 2); g.fillStyle = shade(c, -0.12); g.fill(); seg(g, [[200, -190], [230, -120], [215, -60]], 30, c); circle(g, 165, -240, 7, '#fff'); poly(g, [[190, -175], [240, -160], [195, -160]], '#f4efe6'); g.restore(); },
  firetruck(g, s = 1) { g.save(); g.scale(s, s); rr(g, -260, -190, 520, 150, 16); g.fillStyle = '#c8241a'; g.fill(); rr(g, 120, -260, 140, 90, 12); g.fill(); rr(g, 150, -245, 90, 50, 8); g.fillStyle = '#bfe0f0'; g.fill(); seg(g, [[-240, -215], [90, -215]], 14, '#c8c8d0'); for (let i = 0; i < 9; i++) seg(g, [[-230 + i * 38, -225], [-230 + i * 38, -205]], 5, '#c8c8d0'); g.fillStyle = '#f2c21a'; g.fillRect(-260, -110, 520, 14); for (const wx of [-180, -90, 170]) { circle(g, wx, -40, 42, '#16141c'); circle(g, wx, -40, 16, '#9aa0aa'); } g.restore(); },
  semi(g, s = 1) { g.save(); g.scale(s, s); rr(g, -330, -300, 470, 240, 8); g.fillStyle = '#e8e4dc'; g.fill(); g.strokeStyle = '#9aa0aa'; g.lineWidth = 4; g.stroke(); rr(g, 150, -250, 150, 190, 16); g.fillStyle = '#2a6a8a'; g.fill(); rr(g, 190, -235, 90, 60, 8); g.fillStyle = '#bfe0f0'; g.fill(); for (const wx of [-280, -200, 120, 260]) { circle(g, wx, -40, 40, '#16141c'); circle(g, wx, -40, 15, '#9aa0aa'); } text(g, '36 t', -95, -180, { size: 70, color: '#9aa0aa', font: FONTS.ui, weight: 900 }); g.restore(); },
  titanic(g, s = 1) { g.save(); g.scale(s, s); poly(g, [[-420, -140], [420, -140], [380, 0], [-380, 0]], '#1e1a22'); g.fillStyle = '#f4efe6'; g.fillRect(-400, -200, 760, 60); g.fillStyle = '#c8241a'; g.fillRect(-420, -40, 800, 30); for (const fx of [-220, -80, 60, 200]) { rr(g, fx - 28, -330, 56, 130, 4); g.fillStyle = '#e8a43a'; g.fill(); g.fillStyle = '#1e1a22'; g.fillRect(fx - 28, -330, 56, 30); } g.fillStyle = '#ffd890'; for (let i = 0; i < 26; i++) circle(g, -370 + i * 29, -110, 6); g.restore(); },
};
// round weight-limit road sign
export function limitSign(g, x, y, s = 1, str = '10 t') {
  g.save(); g.translate(x, y); g.scale(s, s); seg(g, [[0, 0], [0, 260]], 16, '#6a6f7e'); circle(g, 0, 0, 118, '#ffffff'); ring(g, 0, 0, 100, 26, '#d63a2a'); ring(g, 0, 0, 118, 4, '#9aa0aa');
  text(g, str, 0, 6, { size: 74, color: '#14161e', font: FONTS.ui, weight: 900 }); g.restore();
}
// a footprint pressed into asphalt (top-down or side), depth 0..1
export function footprint(g, x, y, s = 1, depth = 1, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.fillStyle = alpha('#14121a', 0.5 + 0.4 * depth); g.beginPath(); g.ellipse(0, 0, 30, 70, 0, 0, Math.PI * 2); g.fill();
  g.strokeStyle = alpha('#c8b8a8', 0.6); g.lineWidth = 4; g.beginPath(); g.ellipse(0, 0, 36, 76, 0, Math.PI * 1.1, Math.PI * 1.9); g.stroke();
  for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; seg(g, [[Math.cos(a) * 40, Math.sin(a) * 80], [Math.cos(a) * 64, Math.sin(a) * 104]], 3, alpha('#14121a', 0.6 * depth)); }
  g.restore();
}

// ---------- flat UI screens (all in screen space, centred at cx, cy) ----------
const UIBG = '#f4f6fa', UIT = '#1e2433', UIS = '#6a7488';
export function phoneFrame(g, cx, cy, h, draw) {
  const w = h * 0.5; rr(g, cx - w / 2 - 14, cy - h / 2 - 14, w + 28, h + 28, 48); g.fillStyle = '#14161e'; g.fill();
  g.save(); rr(g, cx - w / 2, cy - h / 2, w, h, 36); g.clip(); g.fillStyle = UIBG; g.fillRect(cx - w / 2, cy - h / 2, w, h); draw(g, cx - w / 2, cy - h / 2, w, h); g.restore();
  rr(g, cx - 60, cy - h / 2 + 8, 120, 22, 11); g.fillStyle = '#14161e'; g.fill();
}
export function browserFrame(g, x, y, w, h, url, draw) {
  rr(g, x, y, w, h, 18); g.fillStyle = UIBG; g.fill(); g.save(); rr(g, x, y, w, h, 18); g.clip();
  g.fillStyle = '#dde2ea'; g.fillRect(x, y, w, 64); for (const [i, c] of [[0, '#ff5f57'], [1, '#febc2e'], [2, '#28c840']]) circle(g, x + 34 + i * 30, y + 32, 10, c);
  rr(g, x + 140, y + 14, w - 180, 36, 18); g.fillStyle = '#ffffff'; g.fill(); text(g, url, x + 166, y + 33, { size: 22, color: UIS, font: FONTS.ui, weight: 700, align: 'left' });
  draw(g, x, y + 64, w, h - 64); g.restore();
  rr(g, x, y, w, h, 18); g.strokeStyle = 'rgba(0,0,0,.25)'; g.lineWidth = 3; g.stroke();
}
export function card(g, x, y, w, h, o = {}) { rr(g, x, y, w, h, o.r ?? 24); g.fillStyle = o.fill || '#ffffff'; g.fill(); if (o.line !== false) { g.strokeStyle = o.line || 'rgba(30,36,51,.12)'; g.lineWidth = 3; g.stroke(); } }
export function uiText(g, str, x, y, size, o = {}) { text(g, str, x, y, { size, color: o.color || UIT, font: FONTS.ui, weight: o.weight || 800, align: o.align || 'left', spacing: o.spacing || 0, alpha: o.a ?? 1 }); }
export { UIBG, UIT, UIS };
