// 06_biscuit.js — s109–s150: the whale recording (Project CETI), then Biscuit's last weeks, the flashback to the day you
// were born, the last night, and the weeks after.
import { E, registerShot, layer, blurLayer, ease, prog, clamp, lerp, rr, seg, circle, poly, alpha, shade, glow, linGrad, radGrad, text, FONTS, rng, veil } from '/engine/core.js';
import { POSES, breathe, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { person, bigFaceV2, XP } from '../look.js';
import { YOU, MOM } from '../cast.js';
import { dog, dogLie, dogStand, spermWhale } from '../animals.js';
import { livingRoom, bedroom, stairs, gardenView, GY } from '../sets/house.js';
import { park, vet, beach, ocean, OGY } from '../sets/outside.js';
import { say, speak, nameTag, wave, laptop, tv, calendarPage, offSwitch, wt, GOLDC, CORALC, MINT, SKYC } from '../ui.js';
import { RIM, NIGHT_RIM, F, push, talkOf, DAD, VET, SCI, babyBundle } from '../common.js';

const HOOD = { ...YOU, hood: true };
const MOON = { color: '#b8ccff', dir: [0.6, -0.6] };
const PUPO = { young: true, collar: false };
const bTalk = (info) => talkOf('BISCUIT', info);
const ZOOM = (g, t, dur, a, b, cx = 960, cy = 540) => { const z = lerp(a, b, ease.inOut(clamp(t / dur))); g.translate(cx, cy); g.scale(z, z); g.translate(-cx, -cy); };
const night = (g, a = 0.5) => veil(g, '#2a3466', a, 'multiply');
// warm old-photo look for the flashback (s134–s138)
function flashback(g) {
  veil(g, '#ffd2a0', 0.32, 'multiply');
  g.save(); g.fillStyle = radGrad(g, E.W / 2, E.H / 2, 420, 1150, [alpha('#3a2414', 0), alpha('#3a2414', 0.55)]); g.fillRect(0, 0, E.W, E.H); g.restore();
}
// the whale "name": a fixed click pattern (dots with gaps)
const NAME = [0, 1, 2, 4, 5];
function clickName(g, x, y, s, col, k = 1) { NAME.forEach((d, i) => { const a = clamp(k * NAME.length - i); if (a > 0) circle(g, x + d * 34 * s, y, 13 * s * ease.outBack(a), col); }); }
// a rounded bubble holding a drawn icon
function iconBubble(g, x, y, w, h, tx, ty, k, fn) {
  if (k <= 0) return; g.save(); g.translate(x, y); g.scale(k, k);
  g.fillStyle = '#fffaf0'; g.strokeStyle = alpha('#1a1420', 0.85); g.lineWidth = 4;
  const ang = Math.atan2(ty - y, tx - x), bx = Math.cos(ang) * w * 0.3, by = Math.sin(ang) * h * 0.35;
  g.beginPath(); g.moveTo(bx - Math.sin(ang) * 18, by + Math.cos(ang) * 18); g.lineTo((tx - x) * 0.8, (ty - y) * 0.8); g.lineTo(bx + Math.sin(ang) * 18, by - Math.cos(ang) * 18); g.closePath(); g.fill(); g.stroke();
  rr(g, -w / 2, -h / 2, w, h, 40); g.fill(); g.stroke();
  fn(g); g.restore();
}
function vacuum(g, x, y, s = 1) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -80, -110, 160, 110, 40); g.fillStyle = '#d64a33'; g.fill(); rr(g, -60, -96, 70, 30, 14); g.fillStyle = alpha('#ffffff', 0.35); g.fill();
  circle(g, -50, 0, 18, '#2a2a34'); circle(g, 50, 0, 18, '#2a2a34');
  g.strokeStyle = '#3a3a44'; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(70, -80); g.bezierCurveTo(160, -120, 160, -20, 150, -200); g.stroke();
  seg(g, [[150, -200], [240, 0]], 12, '#9aa4ae'); rr(g, 200, -8, 110, 22, 8); g.fillStyle = '#3a3a44'; g.fill();
  g.restore();
}

// ---------------- the whale recording ----------------
// s109 — "A week later, an email arrives. Project CETI has seen your video."
registerShot('s109', { draw(g, t, info) {
  blurLayer(g, 8, (g) => bedroom(g, t, { x: 0, y: 0, z: 1 }, { time: 'day', sea: true, clock: false }), null);
  const tE = wt('email', info, t, 1.3), tC = wt('ceti', info, t, 3.6), open = ease.out(prog(t, tC - 0.2, tC + 0.3));
  g.save(); ZOOM(g, t, info.dur, 1.0, 1.08, 900, 600);
  laptop(g, 880, 940, 1180, (g, x, y, w, h) => {
    g.fillStyle = '#2E72D2'; g.fillRect(x, y, w, 70); text(g, 'Inbox', x + 40, y + 37, { size: 34, font: FONTS.ui, weight: 900, color: '#ffffff', align: 'left' });
    g.fillStyle = '#eef2f6'; g.fillRect(x, y + 70, 250, h - 70);
    ['Inbox', 'Sent', 'Fan mail'].forEach((s, i) => text(g, s, x + 40, y + 120 + i * 58, { size: 28, font: FONTS.ui, weight: 800, color: i ? '#6a7480' : '#2E72D2', align: 'left' }));
    const rows = [['Grandma', 'Saw the pigeon video!'], ['School', 'Field trip form'], ['Pickles Fan Club', 'You are famous']];
    const nk = ease.outBack(prog(t, tE - 0.1, tE + 0.3)), all = nk > 0 ? [['Project CETI', 'We saw your video.']].concat(rows) : rows;
    all.forEach(([from, sub], i) => { const ry = y + 90 + i * 100 + (nk > 0 && i > 0 ? 0 : 0), first = nk > 0 && i === 0;
      g.save(); if (first) { g.translate(x + 250 + (w - 250) / 2, ry + 45); g.scale(1, nk); g.translate(-(x + 250 + (w - 250) / 2), -(ry + 45)); }
      rr(g, x + 270, ry, w - 290, 90, 14); g.fillStyle = first ? '#fff4d8' : '#ffffff'; g.fill(); g.strokeStyle = alpha('#2a3440', 0.1); g.lineWidth = 2; g.stroke();
      if (first) circle(g, x + 300, ry + 45, 10, '#2E72D2');
      text(g, from, x + 326, ry + 30, { size: 28, font: FONTS.ui, weight: 900, color: '#2a3440', align: 'left' }); text(g, sub, x + 326, ry + 64, { size: 24, font: FONTS.ui, weight: 700, color: '#6a7480', align: 'left' });
      if (first) { rr(g, x + w - 120, ry + 28, 80, 34, 17); g.fillStyle = CORALC; g.fill(); text(g, 'NEW', x + w - 80, ry + 46, { size: 20, font: FONTS.ui, weight: 900, color: '#ffffff' }); }
      g.restore(); });
    if (open > 0) { g.save(); g.globalAlpha *= open; g.translate(0, (1 - open) * 60); rr(g, x + 280, y + 100, w - 320, h - 130, 18); g.fillStyle = '#ffffff'; g.fill(); g.strokeStyle = alpha('#2a3440', 0.15); g.lineWidth = 3; g.stroke();
      text(g, 'From: Project CETI', x + 320, y + 160, { size: 30, font: FONTS.ui, weight: 900, color: '#2a3440', align: 'left' });
      text(g, 'We saw your video.', x + 320, y + 230, { size: 46, font: FONTS.ui, weight: 900, color: '#2E72D2', align: 'left' });
      ['We record sperm whales.', 'Could you listen to something for us?'].forEach((l, i) => text(g, l, x + 320, y + 300 + i * 46, { size: 28, font: FONTS.ui, weight: 700, color: '#4a5460', align: 'left' }));
      g.restore(); }
  });
  g.restore();
  bigFaceV2(g, 1700, 830, 200, { outfit: YOU, expr: open > 0.5 ? 'surprised' : 'neutral', look: [-0.9, 0.3] });
  if (t < tE) nameTag(g, 'A WEEK LATER', 300, 110, t, 0.1, { size: 40 });
} });

// s110 — "They send you a recording."
registerShot('s110', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#f6f8fa', '#dfe6ee']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  g.save(); ZOOM(g, t, info.dur, 1.0, 1.06);
  const k = ease.outBack(prog(t, 0.05, 0.4)); g.translate(960, 540); g.scale(k, k); g.translate(-960, -540);
  rr(g, 330, 260, 1260, 560, 40); g.fillStyle = '#ffffff'; g.fill(); g.strokeStyle = alpha('#2a3440', 0.12); g.lineWidth = 4; g.stroke();
  rr(g, 380, 310, 130, 130, 24); g.fillStyle = '#2E72D2'; g.fill(); for (let i = 0; i < 5; i++) { const h = [30, 60, 90, 60, 30][i]; rr(g, 404 + i * 18, 375 - h / 2, 10, h, 5); g.fillStyle = '#ffffff'; g.fill(); }
  text(g, 'whale_recording.wav', 550, 350, { size: 52, font: FONTS.ui, weight: 900, color: '#2a3440', align: 'left' });
  text(g, 'From: Project CETI  ·  Dominica', 550, 410, { size: 30, font: FONTS.ui, weight: 700, color: '#6a7480', align: 'left' });
  const pk = prog(t, 0.4, info.dur);
  for (let i = 0; i < 64; i++) { const x = 400 + i * 17.5, h = 16 + Math.abs(Math.sin(i * 1.7) + Math.sin(i * 0.43)) * 70; rr(g, x, 600 - h / 2, 10, h, 5); g.fillStyle = i / 64 < pk ? '#2E72D2' : '#c8d0da'; g.fill(); }
  circle(g, 1480, 600, 60, '#2E72D2'); poly(g, [[1462, 570], [1462, 630], [1510, 600]], '#ffffff');
  text(g, 'Attachment · 47 min', 960, 750, { size: 28, font: FONTS.ui, weight: 800, color: '#8a94a0' });
  g.restore();
} });

// s111 — "You put on the headphones."
registerShot('s111', { draw(g, t, info) {
  blurLayer(g, 10, (g) => bedroom(g, t, { x: 0, y: 0, z: 1 }, { time: 'day', sea: true, clock: false }), null);
  const r = 290 * (1 + 0.03 * t), cx = 960, cy = 620, d = (1 - ease.outBack(prog(t, 0.2, 0.75))) * -700, on = d > -2;
  bigFaceV2(g, cx, cy, r, { outfit: YOU, expr: on ? 'smile' : 'neutral', look: on ? [0, -0.2] : [0, -0.8], blink: t > 1.2 && t < 1.32 });
  g.save(); g.translate(cx, cy + d); g.strokeStyle = '#2a2a34'; g.lineWidth = r * 0.12; g.beginPath(); g.arc(0, -r * 0.05, r * 1.08, Math.PI * 1.08, Math.PI * 1.92); g.stroke();
  for (const s of [-1, 1]) { rr(g, s * r * 1.02 - r * 0.16, -r * 0.2, r * 0.32, r * 0.5, r * 0.12); g.fillStyle = '#E8892A'; g.fill(); } g.restore();
  if (on) for (const s of [-1, 1]) for (let k = 0; k < 3; k++) { const rr2 = 40 + ((t * 120 + k * 40) % 120); g.strokeStyle = alpha('#8fd0ff', 0.7 * (1 - (rr2 - 40) / 120)); g.lineWidth = 6; g.beginPath(); g.arc(cx + s * r * 1.25, cy - r * 0.05, rr2, s > 0 ? -0.6 : Math.PI - 0.6, s > 0 ? 0.6 : Math.PI + 0.6); g.stroke(); }
} });

// s112 — "Clicks. Long, slow clicks."
registerShot('s112', { draw(g, t, info) {
  ocean(g, t, { x: 0, y: 0, z: 1 });
  g.save(); g.globalAlpha *= 0.35; spermWhale(g, 1300 - t * 30, 760, 2.4, { t }); g.restore();
  // timeline of clicks: a scrolling line with spikes, each spike = one click
  const x0 = 160, w = 1600, y = 470, slow = t > 1.3; seg(g, [[x0, y], [x0 + w, y]], 4, alpha('#dff4ff', 0.5));
  const clicks = []; for (let i = 0; i < 40; i++) { const at = i < 6 ? i * 0.22 : 1.3 + (i - 6) * 0.45; if (at <= t) clicks.push(at); }
  clicks.forEach((at) => { const x = x0 + w - (t - at) * 360; if (x < x0) return; const age = t - at, h = 150 * Math.exp(-age * 1.2) + 40; seg(g, [[x, y - h], [x, y + h]], 8, alpha('#ffffff', 0.9)); circle(g, x, y - h - 18, 10, GOLDC); });
  const last = clicks.length ? t - clicks[clicks.length - 1] : 9; glow(g, x0 + w, y, 160, '#bfe8ff', 0.6 * Math.exp(-last * 6));
  text(g, slow ? 'CLICK ...  CLICK ...  CLICK' : 'CLICK CLICK CLICK', 960, 800, { size: 64, font: FONTS.ui, weight: 900, color: '#ffffff', spacing: 6, glow: 18, glowColor: alpha('#8fd0ff', 0.7) });
} });

// s113 — "And under the clicks, words."
registerShot('s113', { draw(g, t, info) {
  ocean(g, t, { x: 0, y: 0, z: 1 });
  g.save(); ZOOM(g, t, info.dur, 1.0, 1.06);
  const groups = 4, tw = wt('words', info, t, 2);
  for (let i = 0; i < groups; i++) { const gx = 300 + i * 400; for (let j = 0; j < 5; j++) circle(g, gx + j * 50, 330, 14, alpha('#ffffff', 0.9)); }
  seg(g, [[160, 420], [1760, 420]], 3, alpha('#dff4ff', 0.4));
  ['COME', 'CLOSER', 'STAY', 'HERE'].forEach((w, i) => { const at = tw - 0.4 + i * 0.25, k = ease.outBack(prog(t, at, at + 0.3)); if (k <= 0) return; const gx = 400 + i * 400;
    g.save(); g.translate(gx, 560); g.scale(k, k); rr(g, -150, -55, 300, 110, 55); g.fillStyle = GOLDC; g.fill(); text(g, w, 0, 4, { size: 54, font: FONTS.ui, weight: 900, color: '#1a1420' }); g.restore();
    seg(g, [[gx, 360], [gx, 490]], 4, alpha(GOLDC, 0.6 * k)); });
  g.restore();
  nameTag(g, 'DECODING', 960, 900, t, 0.1, { size: 40, fill: alpha('#0e2a5a', 0.85) });
} });

// s114 — "A mother whale calling her calf."
registerShot('s114', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 560, 1.0), F(1000, 560, 1.08));
  layer(g, cam, 1, (g) => {
    ocean(g, t, { x: 0, y: 0, z: 1 });
    spermWhale(g, 620 + t * 20, 520, 2.6, { t });
    spermWhale(g, 1420 + t * 26, 760, 1.2, { t, calf: true });
    for (let k = 0; k < 3; k++) { const r = 60 + ((t * 260 + k * 160) % 480); g.strokeStyle = alpha('#ffe8b0', 0.8 * (1 - (r - 60) / 480)); g.lineWidth = 8; g.beginPath(); g.arc(1000 + t * 20, 500, r, -0.5, 0.7); g.stroke(); }
  });
  nameTag(g, 'MOTHER', 520, 300, t, wt('mother', info, t, 0.2), { size: 36 }); nameTag(g, 'CALF', 1500, 940, t, wt('calf', info, t, 1.4), { size: 36 });
} });

// s115 — "The same name, over and over."
registerShot('s115', { draw(g, t, info) {
  const cam = push(t, info.dur, F(760, 600, 1.5), F(820, 600, 1.6));
  layer(g, cam, 1, (g) => { ocean(g, t, { x: 0, y: 0, z: 1 }); spermWhale(g, 500, 640, 3.2, { t }); });
  for (let i = 0; i < 3; i++) { const at = wt('name', info, t, 0.6) - 0.5 + i * 1.0, k = ease.outBack(prog(t, at, at + 0.3)); if (k <= 0) continue;
    const bx = 1340 + (i % 2) * 140, by = 230 + i * 250;
    g.save(); g.translate(bx, by); g.scale(k, k); rr(g, -230, -70, 460, 140, 70); g.fillStyle = '#fffaf0'; g.fill(); g.strokeStyle = alpha('#1a1420', 0.85); g.lineWidth = 4; g.stroke(); clickName(g, -150, 0, 1.5, '#1a1420'); g.restore(); }
  const n = [0, 1, 2].filter(i => t >= wt('name', info, t, 0.6) - 0.5 + i * 1.0).length;
  if (n) text(g, '×' + n, 1760, 1000, { size: 90, font: FONTS.ui, weight: 900, color: GOLDC, stroke: 10, strokeColor: alpha('#1a1420', 0.8) });
} });

// s116 — "You write it down."
registerShot('s116', { draw(g, t, info) {
  g.fillStyle = '#c8935f'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  g.save(); ZOOM(g, t, info.dur, 1.0, 1.05); g.translate(960, 540); g.rotate(-0.04); g.translate(-960, -540);
  rr(g, 380, 120, 1160, 860, 20); g.fillStyle = '#fffdf6'; g.fill(); g.strokeStyle = alpha('#2E72D2', 0.25); g.lineWidth = 3; for (let y = 220; y < 960; y += 64) { g.beginPath(); g.moveTo(420, y); g.lineTo(1500, y); g.stroke(); }
  seg(g, [[520, 140], [520, 960]], 3, alpha(CORALC, 0.4));
  const k = prog(t, 0.1, 1.1); clickName(g, 620, 360, 2.0, '#1a1420', k);
  const k2 = ease.out(prog(t, 0.9, 1.4)); if (k2 > 0) text(g, '= her calf’s name?', 980, 520, { size: 64, font: FONTS.title, weight: 700, color: '#2E72D2', alpha: k2 });
  // pencil + hand (blue sleeve)
  const px = k2 > 0 ? lerp(1020, 1420, k2) : 620 + Math.min(1, k) * 400, py = k2 > 0 ? lerp(380, 640, k2) : 380;
  g.save(); g.translate(px, py); g.rotate(-0.7); rr(g, -12, -260, 24, 260, 6); g.fillStyle = '#f2c21a'; g.fill(); poly(g, [[-12, 0], [12, 0], [0, 34]], '#e8c890'); g.restore();
  g.strokeStyle = '#2E72D2'; g.lineWidth = 100; g.lineCap = 'round'; g.beginPath(); g.moveTo(px + 200, py - 120); g.lineTo(px + 800, py + 300); g.stroke(); circle(g, px + 150, py - 130, 62, '#1d1b22');
  g.restore();
} });

// s117 — "They don't believe you."  video call with three scientists
registerShot('s117', { draw(g, t, info) {
  g.fillStyle = '#1a2230'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  g.save(); ZOOM(g, t, info.dur, 1.0, 1.05);
  const tiles = [[60, 70, { ...SCI, color: '#e8e8f0', hair: 'bun' }, '#8ac0e0'], [980, 70, { ...SCI, color: '#3fa06a', hair: 'none' }, '#e0c890'], [60, 560, { ...SCI, color: '#8a5ad6', hair: 'spiky' }, '#c0d8c0'], [980, 560, YOU, '#cfe0ea']];
  tiles.forEach(([x, y, of, bg], i) => { g.save(); rr(g, x, y, 880, 450, 20); g.clip(); g.fillStyle = bg; g.fillRect(x, y, 880, 450);
    bigFaceV2(g, x + 440, y + 250, 140, { outfit: of, expr: i === 3 ? 'worried' : 'unimpressed', look: i === 3 ? [0, 0] : [0.2 * (i - 1), 0.1], talk: i === 3 ? 0.4 + 0.4 * Math.sin(t * 14) : 0 }); g.restore();
    rr(g, x + 20, y + 400, 220, 36, 10); g.fillStyle = alpha('#000000', 0.5); g.fill(); text(g, i === 3 ? 'You' : 'Project CETI', x + 130, y + 419, { size: 22, font: FONTS.ui, weight: 800, color: '#ffffff' }); });
  g.restore();
  say(g, 'Hmm.', 760, 150, t, wt('believe', info, t, 0.4), 620, 260, { size: 40 });
} });

// s118 — "Then they check their tapes."  old spectrograms, the same pattern found again and again
registerShot('s118', { draw(g, t, info) {
  g.fillStyle = '#0c1424'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  g.save(); ZOOM(g, t, info.dur, 1.0, 1.06);
  for (let row = 0; row < 3; row++) { const y = 200 + row * 260, sx = -((t * 420 + row * 300) % 400);
    rr(g, 100, y - 90, 1720, 180, 14); g.fillStyle = '#121e34'; g.fill();
    g.save(); g.beginPath(); g.rect(100, y - 90, 1720, 180); g.clip();
    const r = rng(row + 3); for (let i = 0; i < 70; i++) { const x = sx + 100 + i * 34, h = 20 + r() * 80; g.fillStyle = alpha('#5ac8ff', 0.25 + r() * 0.5); g.fillRect(x, y - h / 2, 10, h); }
    for (let m = 0; m < 4; m++) { const x = sx + 300 + m * 400; clickName(g, x, y, 0.9, GOLDC); g.strokeStyle = GOLDC; g.lineWidth = 4; g.strokeRect(x - 30, y - 50, 230, 100); }
    g.restore(); text(g, 'TAPE ' + (2019 + row * 2), 180, y - 110, { size: 26, font: FONTS.ui, weight: 900, color: '#8fd0ff', align: 'left' }); }
  g.restore();
} });

// s119 — "Every time she calls that name, the calf answers."
registerShot('s119', { draw(g, t, info) {
  g.fillStyle = '#0c1424'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  spermWhale(g, 330, 330, 0.75, { t }); spermWhale(g, 300, 700, 0.5, { t, calf: true });
  text(g, 'MOTHER', 260, 430, { size: 30, font: FONTS.ui, weight: 900, color: '#8fd0ff' }); text(g, 'CALF', 260, 790, { size: 30, font: FONTS.ui, weight: 900, color: '#8fd0ff' });
  for (let i = 0; i < 3; i++) { const at = 0.2 + i * 1.2, k = prog(t, at, at + 0.4), k2 = prog(t, at + 0.5, at + 0.9), x = 640 + i * 420;
    if (k > 0) clickName(g, x, 330, 1.2, GOLDC, k);
    if (k2 > 0) clickName(g, x + 60, 700, 1.0, MINT, k2);
    const m = ease.outBack(prog(t, at + 0.9, at + 1.15)); if (m > 0) { g.save(); g.translate(x + 120, 515); g.rotate(-0.12); g.scale(m, m); rr(g, -120, -40, 240, 80, 16); g.strokeStyle = MINT; g.lineWidth = 7; g.stroke(); text(g, 'MATCH', 0, 3, { size: 46, font: FONTS.ui, weight: 900, color: MINT }); g.restore(); } }
} });

// s120 — "The news calls you the kid who talks to whales."
registerShot('s120', { draw(g, t, info) {
  g.fillStyle = '#2a2430'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  g.save(); ZOOM(g, t, info.dur, 1.0, 1.1);
  tv(g, 960, 520, 1500, (g, x, y, w, h) => {
    g.fillStyle = linGrad(g, 0, y, 0, y + h, ['#7ab8e8', '#cfe8f6']); g.fillRect(x, y, w, h);
    g.fillStyle = linGrad(g, 0, y + h * 0.5, 0, y + h, ['#3a88c0', '#1e4a80']); g.fillRect(x, y + h * 0.5, w, h * 0.5);
    g.fillStyle = '#f2d0a0'; g.fillRect(x, y + h * 0.7, w, h * 0.3);
    person(g, { x: x + w * 0.35, y: y + h * 0.82, s: 1.5, facing: 1, outfit: YOU, pose: POSES.talk, expr: 'grin', look: [1, -0.3], rim: RIM });
    const tx = x + w * 0.66, ty = y + h * 0.56; g.fillStyle = '#1e3a5a'; g.save(); g.translate(tx, ty); g.scale(1.6, 1.6); g.beginPath(); g.moveTo(-6, 0); g.quadraticCurveTo(-4, -30, -2, -46); g.quadraticCurveTo(-30, -52, -52, -70); g.quadraticCurveTo(-20, -74, 0, -58); g.quadraticCurveTo(20, -74, 52, -70); g.quadraticCurveTo(30, -52, 2, -46); g.quadraticCurveTo(4, -30, 6, 0); g.fill(); g.restore();
  }, { headline: 'THE KID WHO TALKS TO WHALES', ticker: 'PROJECT CETI: THE CALF ANSWERS TO ITS NAME  ·  PROJECT CETI: THE CALF ANSWERS TO ITS NAME' });
  g.restore();
} });

// ---------------- Biscuit ----------------
// s121 — "But that night, Biscuit doesn't come up the stairs."
registerShot('s121', { draw(g, t, info) {
  const cam = push(t, info.dur, F(480, 300, 1.2), F(460, 290, 1.28));
  layer(g, cam, 1, (g) => {
    const R = stairs(g, t, { x: 0, y: 0, z: 1 }, { night: true }), top = R.steps[8];
    glow(g, top[0] - 60, top[1] - 160, 320, '#ffd8a0', 0.35);
    person(g, { x: top[0] + 10, y: top[1], s: 1.6, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t, 1, 3), expr: 'worried', look: [1, 0.7], rim: { color: '#ffd8a0', dir: [-0.7, -0.6] } });
  });
  night(g, 0.25);
} });
// s122 — "You find him at the bottom, looking up at you."
registerShot('s122', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1180, 700, 1.9), F(1200, 720, 2.1));
  layer(g, cam, 1, (g) => { stairs(g, t, { x: 0, y: 0, z: 1 }, { night: true }); dog(g, { x: 1290, y: GY() + 30, s: 1.35, facing: -1, t, eyes: 'tired', brows: 'sad', rim: NIGHT_RIM }); });
  night(g, 0.2);
} });
// s123 — "It's my back legs. They do this now."
registerShot('s123', { draw(g, t, info) {
  blurLayer(g, 8, (g) => { stairs(g, t, { x: 0, y: 0, z: 1 }, { night: true }); night(g, 0.2); }, null);
  const cam = push(t, info.dur, { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: 1.05 });
  layer(g, cam, 1, (g) => dog(g, { x: 1400, y: 1700, s: 8.6, facing: -1, t, talk: bTalk(info), eyes: 'tired', brows: 'sad', rim: { ...NIGHT_RIM, w: 9 }, shadow: false }));
  speak(g, 'BISCUIT', info, t, 520, 220, 800, 420, { size: 52 });
} });
// s124 — "You carry him up. He's lighter than he used to be."
registerShot('s124', { draw(g, t, info) {
  const u = ease.inOut(prog(t, 0.2, info.dur - 0.2)), i = u * 7, gy = GY();
  const px = 1050 - i * 110, py = gy - 70 - i * 70 + Math.abs(Math.sin(u * Math.PI * 7)) * -8;
  const cam = push(t, info.dur, F(1000, 640, 1.6), F(px + 40, py - 140, 1.9));
  layer(g, cam, 1, (g) => {
    stairs(g, t, { x: 0, y: 0, z: 1 }, { night: true });
    person(g, { x: px, y: py, s: 1.3, facing: -1, outfit: YOU, pose: XP.carry, expr: t > wt('lighter', info, t, 2) ? 'sad' : 'worried', look: [-0.3, 0.5], rim: NIGHT_RIM });
    dogLie(g, { x: px - 30, y: py - 118, s: 0.74, facing: -1, t, head: 'up', eyes: 'tired', rim: NIGHT_RIM, shadow: false });
  });
  night(g, 0.2);
} });
// s125 — "Don't tell your mom. She'll worry."  on your bed, whispering
registerShot('s125', { draw(g, t, info) {
  const cam = push(t, info.dur, F(700, 640, 2.1), F(700, 640, 2.2));
  layer(g, cam, 1, (g) => { const R = bedroom(g, t, { x: 0, y: 0, z: 1 }, { time: 'night', clockStr: '11:42' }); dogLie(g, { x: R.bedX + 120, y: GY() - 175, s: 1.15, facing: -1, t, head: 'up', eyes: 'tired', talk: bTalk(info) * 0.6, rim: NIGHT_RIM, shadow: false }); });
  night(g, 0.3);
  bigFaceV2(g, 1640, 820, 240, { outfit: YOU, expr: 'worried', look: [-1, -0.2], rim: '#a8c0ff' });
  speak(g, 'BISCUIT', info, t, 560, 200, 760, 420, { size: 40, wrap: 26 });
} });
// s126 — "He's been hurting since the winter. He just couldn't tell anyone. Until now."
registerShot('s126', { draw(g, t, info) {
  const tU = wt('until', info, t, 4.8);
  if (t < tU - 0.1) {
    const u = prog(t, 0, tU), x = lerp(360, 1000, u), cam = { x: x + 60 - E.W / 2, y: 780 - E.H / 2, z: 1.45 };
    layer(g, cam, 1, (g) => {
      const G = gardenView(g, -100, -100, E.W + 200, E.H + 200, t, { time: 'winter' });
      const lim = Math.abs(Math.sin(t * 4)), y = G.gy + 40 + lim * 6;
      for (let k = 0; k < 8; k++) circle(g, x - 120 - k * 90, G.gy + 46 + (k % 2) * 10, 10, alpha('#c0c8d4', 0.8));         // paw prints
      g.save(); g.translate(x, y); g.rotate(-0.04 * lim); dogStand(g, { x: 0, y: 0, s: 1.7, facing: 1, t: t * 0.6, walk: 0.7, eyes: 'tired', rim: { color: '#ffffff', dir: [-0.6, -0.7] } }); g.restore();
      glow(g, x - 60, y - 90, 110, '#ff6f61', 0.35 + 0.25 * Math.sin(t * 5));
    });
    FX.snow(g, t, { count: 140, speed: 70 }); veil(g, '#cfe0ff', 0.12, 'multiply');
    nameTag(g, 'LAST WINTER', 320, 110, t, 0.15, { size: 40 });
  } else {
    blurLayer(g, 10, (g) => { bedroom(g, t, { x: 0, y: 0, z: 1 }, { time: 'night' }); night(g, 0.3); }, null);
    dog(g, { x: 1400 - (t - tU) * 20, y: 1700, s: 8.4, facing: -1, t, eyes: 'open', brows: 'sad', rim: { ...NIGHT_RIM, w: 9 }, shadow: false });
  }
} });
// s127 — "You tell Mom. The vet is kind."
registerShot('s127', { draw(g, t, info) {
  const kind = t > wt('vet', info, t, 1.8) - 0.2;
  const cam = kind ? push(t, info.dur, F(940, 560, 1.5), F(960, 545, 1.58)) : push(t, info.dur, F(720, 640, 1.7), F(720, 640, 1.75));
  layer(g, cam, 1, (g) => {
    const R = vet(g, t, { x: 0, y: 0, z: 1 });
    dog(g, { x: 900, y: R.TABLE, s: 1.05, facing: -1, t, eyes: 'tired', brows: 'sad', rim: RIM, shadow: false });
    person(g, { x: 1260, y: R.GY + 20, s: 1.45, facing: -1, outfit: VET, pose: breathe(POSES.talk, t, 1, 3), expr: 'smile', talk: kind ? 0.3 + 0.3 * Math.sin(t * 12) : 0, look: [-1, 0.4], rim: RIM });
    person(g, { x: 520, y: R.GY + 20, s: 1.45, facing: 1, outfit: MOM, pose: breathe(POSES.stand, t, 1, 3), expr: 'worried', look: [1, 0.2], rim: RIM });
    person(g, { x: 400, y: R.GY + 20, s: 1.1, facing: 1, outfit: YOU, pose: breathe(POSES.stand, t, 1, 3), expr: 'sad', look: [1, -0.2], rim: RIM });
  });
} });
// s128 — "His hips are worn out, and his heart is tired."  the X-ray
registerShot('s128', { draw(g, t, info) {
  g.fillStyle = '#0c1626'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); glow(g, 960, 540, 900, '#5a8ac0', 0.35);
  g.save(); ZOOM(g, t, info.dur, 1.0, 1.08, 900, 540);
  const B = '#e6f2ff'; g.strokeStyle = B; g.lineCap = 'round'; g.lineJoin = 'round';
  g.lineWidth = 16; g.beginPath(); g.moveTo(1250, 400); g.quadraticCurveTo(940, 360, 640, 430); g.stroke();                       // spine
  for (let i = 0; i < 16; i++) { const u = i / 15, x = lerp(1240, 650, u), y = 400 - Math.sin(u * Math.PI) * 30 + (u > 0.7 ? (u - 0.7) * 90 : 0); rr(g, x - 10, y - 20, 20, 40, 6); g.fillStyle = B; g.fill(); }
  g.lineWidth = 9; for (let i = 0; i < 8; i++) { const x = 1150 - i * 42; g.beginPath(); g.moveTo(x, 390); g.quadraticCurveTo(x - 60, 520, x - 10, 600 - i * 6); g.stroke(); }   // ribs
  g.fillStyle = B; g.beginPath(); g.ellipse(1340, 380, 100, 70, -0.15, 0, Math.PI * 2); g.fill(); rr(g, 1380, 360, 150, 60, 26); g.fill(); circle(g, 1340, 360, 24, '#0c1626');   // skull
  g.lineWidth = 14; for (const [a, b, c] of [[[1150, 520], [1170, 680], [1160, 820]], [[1100, 520], [1110, 690], [1090, 820]], [[640, 470], [580, 640], [660, 820]], [[690, 470], [640, 650], [720, 820]]]) { g.beginPath(); g.moveTo(...a); g.lineTo(...b); g.lineTo(...c); g.stroke(); }
  g.beginPath(); g.ellipse(650, 460, 70, 40, -0.4, 0, Math.PI * 2); g.fill();                                                          // pelvis
  g.lineWidth = 8; g.beginPath(); g.moveTo(600, 440); g.quadraticCurveTo(480, 460, 400, 560); g.stroke();                              // tail
  const th = wt('hips', info, t, 0.3), kh = ease.outBack(prog(t, th, th + 0.3));
  if (kh > 0) { g.strokeStyle = CORALC; g.lineWidth = 10; g.beginPath(); g.arc(640, 500, 150 * kh, 0, Math.PI * 2); g.stroke(); glow(g, 640, 500, 200, CORALC, 0.25 + 0.15 * Math.sin(t * 6)); }
  const tH = wt('heart', info, t, 1.8), kH = ease.out(prog(t, tH, tH + 0.3));
  if (kH > 0) { const beat = 1 + 0.08 * Math.max(0, Math.sin(t * 3.2)) ** 6; g.save(); g.translate(1060, 520); g.scale(beat * kH * 1.5, beat * kH * 1.5); g.fillStyle = CORALC; g.beginPath(); g.moveTo(0, 30); g.bezierCurveTo(-60, -10, -30, -60, 0, -30); g.bezierCurveTo(30, -60, 60, -10, 0, 30); g.fill(); g.restore(); glow(g, 1060, 510, 180, CORALC, 0.3 * kH); }
  g.restore();
  nameTag(g, 'HIPS', 560, 240, t, th, { size: 44, fill: alpha(CORALC, 0.9), color: '#ffffff' }); nameTag(g, 'HEART', 1160, 240, t, tH, { size: 44, fill: alpha(CORALC, 0.9), color: '#ffffff' });
} });
// s129 — "Weeks. Maybe less."  tear-off calendar pages
registerShot('s129', { draw(g, t, info) {
  blurLayer(g, 9, (g) => { livingRoom(g, t, { x: 0, y: 0, z: 1 }, { time: 'golden' }); dogLie(g, { x: 1300, y: GY() + 70, s: 1.4, facing: -1, t, head: 'down', eyes: 'closed', rim: RIM }); }, null);
  veil(g, '#1a1420', 0.25);
  const stop = wt('less', info, t, 1.8) + 0.3, tt = Math.min(t, stop), per = 0.42, n = Math.floor(tt / per), f = (tt % per) / per;
  calendarPage(g, 960, 560, 2.2, 'NOV', String(4 + n + 1), { color: CORALC });
  if (t < stop) { g.save(); g.globalAlpha *= 1 - f; calendarPage(g, 960 + f * 700, 560 - f * 380, 2.2, 'NOV', String(4 + n), { color: CORALC, rot: f * 1.2 }); g.restore(); }
} });
// s130 — "So you spend every one of them together."  sunset on the beach
registerShot('s130', { draw(g, t, info) {
  const cam = push(t, info.dur, F(780, 740, 1.9), F(760, 750, 2.0)), SUN = { color: '#ffd8a0', dir: [0.7, -0.6] };
  layer(g, cam, 1, (g) => {
    const R = beach(g, t, { x: 0, y: 0, z: 1 });
    person(g, { x: 640, y: R.GY + 40, s: 1.5, facing: 1, outfit: YOU, pose: XP.floorSit, expr: 'smile', look: [1, -0.2], rim: SUN });
    dog(g, { x: 830, y: R.GY + 50, s: 1.2, facing: 1, t, wag: 0.6, eyes: 'happy', rim: SUN });
  });
} });
// s131 — "He tells you he's hated the vacuum cleaner since day one."
registerShot('s131', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1180, 680, 1.6), F(1200, 680, 1.7));
  layer(g, cam, 1, (g) => {
    livingRoom(g, t, { x: 0, y: 0, z: 1 }, { time: 'day' }); const gy = GY();
    vacuum(g, 1560, gy + 30, 1.1);
    dog(g, { x: 1180, y: gy + 50, s: 1.4, facing: 1, t, talk: 0.3 + 0.3 * Math.sin(t * 13), brows: 'sad', rim: RIM });
    person(g, { x: 780, y: gy + 50, s: 1.4, facing: 1, outfit: YOU, pose: XP.floorSit, expr: 'grin', look: [1, -0.1], rim: RIM });
  });
  const k = ease.outBack(prog(t, wt('vacuum', info, t, 1.3) - 0.1, wt('vacuum', info, t, 1.3) + 0.25));
  iconBubble(g, 1380, 260, 360, 220, 1250, 470, k, (g) => { vacuum(g, -80, 60, 0.62); g.globalAlpha *= 0.85; seg(g, [[-130, -80], [130, 80]], 9, CORALC); seg(g, [[130, -80], [-130, 80]], 9, CORALC); });
  const k2 = ease.outBack(prog(t, wt('day', info, t, 2.5), wt('day', info, t, 2.5) + 0.25)); if (k2 > 0) nameTag(g, 'SINCE DAY ONE', 1380, 420, t, wt('day', info, t, 2.5), { size: 34 });
} });
// s132 — "That he can hear Mom's car two streets away."  the map
registerShot('s132', { draw(g, t, info) {
  g.fillStyle = '#dfe6e0'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  g.save(); ZOOM(g, t, info.dur, 1.0, 1.05);
  for (let bx = 0; bx < 5; bx++) for (let by = 0; by < 3; by++) { rr(g, -120 + bx * 460, -80 + by * 400, 400, 340, 24); g.fillStyle = (bx + by) % 3 ? '#f4efe4' : '#cfe4c4'; g.fill(); }
  const HX = 1530, HY = 330;
  poly(g, [[HX - 90, HY], [HX, HY - 80], [HX + 90, HY]], '#d64a33'); rr(g, HX - 70, HY, 140, 100, 6); g.fillStyle = '#fbf6ec'; g.fill(); rr(g, HX - 18, HY + 44, 36, 56, 4); g.fillStyle = '#8a5a3a'; g.fill();
  const u = ease.inOut(prog(t, 0, info.dur)), cx = lerp(-60, 540, u), cy = 690;
  rr(g, cx - 60, cy - 32, 120, 64, 18); g.fillStyle = MOM.color; g.fill(); rr(g, cx + 6, cy - 24, 40, 48, 8); g.fillStyle = alpha('#ffffff', 0.6); g.fill();
  for (let k = 0; k < 4; k++) { const r = (t * 380 + k * 260) % 1100; g.strokeStyle = alpha(GOLDC, 0.75 * (1 - r / 1100)); g.lineWidth = 7; g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke(); }
  g.setLineDash([24, 18]); g.strokeStyle = alpha('#1a1420', 0.6); g.lineWidth = 6; g.beginPath(); g.moveTo(cx + 70, cy - 20); g.quadraticCurveTo(1100, 620, HX - 80, HY + 60); g.stroke(); g.setLineDash([]);
  g.restore();
  nameTag(g, '2 STREETS AWAY', 1010, 560, t, wt('two', info, t, 1.5), { size: 40 });
  // Biscuit inset, ears up
  const k = ease.outBack(prog(t, wt('hear', info, t, 0.4), wt('hear', info, t, 0.4) + 0.3)); if (k > 0) { g.save(); g.translate(1640, 830); g.scale(k, k); circle(g, 0, 0, 210, '#ffffff'); g.beginPath(); g.arc(0, 0, 196, 0, Math.PI * 2); g.clip(); g.fillStyle = '#f0e2c8'; g.fillRect(-200, -200, 400, 400); dog(g, { x: -260, y: 980, s: 6.6, facing: 1, t, eyes: 'open', rim: false, shadow: false }); g.restore(); text(g, '!', 1800, 640, { size: 110, font: FONTS.ui, weight: 900, color: GOLDC, stroke: 10, strokeColor: '#1a1420' }); }
} });
// s133 — "That's why he's always at the door first."
registerShot('s133', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1380, 620, 1.55), F(1420, 620, 1.65)), op = ease.inOut(prog(t, 1.0, 1.7));
  layer(g, cam, 1, (g) => {
    const R = stairs(g, t, { x: 0, y: 0, z: 1 }, { night: false }), gy = R.GY;
    if (op > 0) { g.fillStyle = linGrad(g, 0, gy - 560, 0, gy, ['#9ad0f0', '#e8f4fa']); g.fillRect(1500, gy - 560, 220, 560); g.fillStyle = '#7ab04a'; g.fillRect(1500, gy - 120, 220, 120);
      person(g, { x: 1620, y: gy, s: 1.35, facing: -1, outfit: MOM, pose: POSES.relaxed, expr: 'smile', look: [-1, 0.5], rim: RIM, alpha: op });
      rr(g, 1500 + 220 * (1 - (1 - op * 0.82)), gy - 560, 220 * (1 - op * 0.82), 560, 4); g.fillStyle = '#a07850'; g.fill(); }
    dog(g, { x: 1380, y: gy + 30, s: 1.3, facing: 1, t, wag: 1, eyes: op > 0.5 ? 'happy' : 'open', rim: RIM });
    person(g, { x: 940 + ease.out(prog(t, 1.4, 2.4)) * 120, y: gy + 30, s: 1.25, facing: 1, outfit: YOU, pose: walkPose(t * 9, {}), expr: 'surprised', look: [1, 0], rim: RIM });
  });
} });

// ---------------- the flashback: the day you were born (young Biscuit) ----------------
// s134 — "The day you were born, everybody left in a hurry."
registerShot('s134', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1250, 600, 1.35), F(1300, 600, 1.45)), gy = GY();
  layer(g, cam, 1, (g) => {
    stairs(g, t, { x: 0, y: 0, z: 1 }, { night: false });
    g.fillStyle = linGrad(g, 0, gy - 560, 0, gy, ['#9ad0f0', '#e8f4fa']); g.fillRect(1500, gy - 560, 220, 560);
    const u = prog(t, 0.6, info.dur);
    person(g, { x: lerp(1300, 1760, u), y: gy, s: 1.4, facing: 1, outfit: DAD, pose: walkPose(t * 14, { run: true }), expr: 'surprised', look: [1, 0], rim: RIM });
    rr(g, lerp(1300, 1760, u) + 30, gy - 170, 70, 60, 10); g.fillStyle = '#8a5a3a'; g.fill();
    person(g, { x: lerp(1500, 1900, u), y: gy, s: 1.35, facing: 1, outfit: MOM, pose: walkPose(t * 12, {}), expr: 'worried', look: [1, 0], rim: RIM });
    dog(g, { x: 1060, y: gy + 30, s: 0.95, facing: 1, t, ...PUPO, eyes: 'open', rim: RIM, talk: bTalk(info) });
    FX.speedLines(g, t, { cx: 1900, cy: 560, count: 30, a: 0.12 });
  });
  flashback(g);
  if (t < 1.4) nameTag(g, '14 YEARS AGO', 300, 110, t, 0.1, { size: 40 });
  speak(g, 'BISCUIT', info, t, 760, 220, 640, 420, { size: 38, wrap: 26 });
} });
// s135 — "I waited by the door for two days."
registerShot('s135', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1400, 760, 2.4), F(1400, 770, 2.55)), gy = GY();
  layer(g, cam, 1, (g) => { stairs(g, t, { x: 0, y: 0, z: 1 }, { night: false }); dogLie(g, { x: 1330, y: gy + 40, s: 1.0, facing: 1, t, ...PUPO, head: Math.sin(t * 2.2) > 0 ? 'up' : 'down', eyes: 'open', rim: RIM }); });
  const d = 0.5 - 0.5 * Math.cos(t / info.dur * Math.PI * 4); veil(g, '#1a2050', 0.55 * d, 'multiply');
  nameTag(g, t < info.dur / 2 ? 'DAY 1' : 'DAY 2', 1600, 120, t, 0.1, { size: 40 });
  flashback(g);
  speak(g, 'BISCUIT', info, t, 760, 220, 1000, 520, { size: 40 });
} });
// s136 — "Then they came back with you."
registerShot('s136', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1440, 620, 1.5), F(1460, 620, 1.6)), gy = GY();
  layer(g, cam, 1, (g) => {
    stairs(g, t, { x: 0, y: 0, z: 1 }, { night: false });
    g.fillStyle = linGrad(g, 0, gy - 560, 0, gy, ['#9ad0f0', '#e8f4fa']); g.fillRect(1500, gy - 560, 220, 560);
    person(g, { x: 1700, y: gy, s: 1.4, facing: -1, outfit: DAD, pose: POSES.relaxed, expr: 'grin', look: [-1, 0.4], rim: RIM });
    person(g, { x: 1560, y: gy, s: 1.4, facing: -1, outfit: MOM, pose: XP.carry, expr: 'smile', look: [-0.5, 0.6], rim: RIM });
    babyBundle(g, 1490, gy - 200, 1.2, t);
    dogStand(g, { x: 1250, y: gy + 30, s: 0.95, facing: 1, t, ...PUPO, wag: 1, eyes: 'happy', rim: RIM });
  });
  flashback(g);
  speak(g, 'BISCUIT', info, t, 760, 220, 1000, 520, { size: 40 });
} });
// s137 — "You were very small and very loud."  nose to nose
registerShot('s137', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#f6e2d0', '#e8c8a8']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const cam = push(t, info.dur, { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: 1.06 });
  layer(g, cam, 1, (g) => {
    rr(g, 200, 760, 1520, 400, 60); g.fillStyle = '#9ac8f0'; g.fill();
    babyBundle(g, 720, 640, 4.6, t);
    const sn = Math.sin(t * 10) * 6; dog(g, { x: 1580 + sn, y: 1540, s: 7, facing: -1, t, ...PUPO, eyes: 'open', rim: { ...RIM, w: 8 }, shadow: false });
  });
  const tl = wt('loud', info, t, 2.2); if (t > tl - 0.1) { for (let k = 0; k < 6; k++) { const a = -2.4 + k * 0.32; seg(g, [[880 + Math.cos(a) * 200, 470 + Math.sin(a) * 200], [880 + Math.cos(a) * 260, 470 + Math.sin(a) * 260]], 8, alpha('#1a1420', 0.7)); } say(g, 'WAAAH!', 520, 200, t, tl, 700, 380, { size: 54, shout: true }); }
  flashback(g);
  speak(g, 'BISCUIT', info, t, 1300, 160, 1250, 330, { size: 38 });
} });
// s138 — "I liked you right away."  by the crib
registerShot('s138', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#f6e2d0', '#ecd4bc']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  const cam = push(t, info.dur, F(1000, 660, 1.5), F(1020, 680, 1.6)), gy = GY();
  layer(g, cam, 1, (g) => {
    for (let i = 0; i < 18; i++) { const x = (i * 211) % 1900, y = 80 + ((i * 137) % 560); poly(g, [[x, y - 14], [x + 4, y - 4], [x + 14, y], [x + 4, y + 4], [x, y + 14], [x - 4, y + 4], [x - 14, y], [x - 4, y - 4]], alpha('#e8a050', 0.5)); }
    g.fillStyle = '#c8935f'; g.fillRect(-E.W, gy, E.W * 3, E.H);
    rr(g, 640, gy - 480, 640, 360, 20); g.fillStyle = '#fbf6ec'; g.fill(); babyBundle(g, 960, gy - 200, 2.0, t);
    for (let i = 0; i <= 12; i++) seg(g, [[650 + i * 52, gy - 480], [650 + i * 52, gy - 120]], 10, '#fbf6ec');
    rr(g, 620, gy - 500, 680, 30, 12); g.fillStyle = '#e8dcc8'; g.fill(); rr(g, 620, gy - 140, 680, 30, 12); g.fill();
    for (const x of [640, 1260]) { g.fillStyle = '#e8dcc8'; g.fillRect(x, gy - 500, 24, 500); }
    dogLie(g, { x: 1230, y: gy + 50, s: 1.1, facing: -1, t, ...PUPO, head: 'up', eyes: 'happy', wag: 1, rim: RIM });
    const hk = ease.outBack(prog(t, wt('liked', info, t, 0.3), wt('liked', info, t, 0.3) + 0.3)); if (hk > 0) { g.save(); g.translate(1100, gy - 160 - t * 20); g.scale(hk * 1.4, hk * 1.4); g.fillStyle = CORALC; g.beginPath(); g.moveTo(0, 20); g.bezierCurveTo(-40, -6, -20, -40, 0, -20); g.bezierCurveTo(20, -40, 40, -6, 0, 20); g.fill(); g.restore(); }
  });
  flashback(g);
  speak(g, 'BISCUIT', info, t, 1400, 200, 1250, 520, { size: 40 });
} });

// ---------------- the last night ----------------
function moonRoom(g, t, cam) {
  layer(g, cam, 1, (g) => {
    const R = livingRoom(g, t, { x: 0, y: 0, z: 1 }, { time: 'night' });
    night(g, 0.55);
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = alpha('#9ab4ff', 0.16); g.beginPath(); g.moveTo(R.win.x + 60, R.win.y + R.win.h); g.lineTo(R.win.x + R.win.w - 40, R.win.y + R.win.h); g.lineTo(1600, GY() + 110); g.lineTo(1060, GY() + 110); g.closePath(); g.fill(); g.restore();
    FX.pool(g, 1330, GY() + 70, 300, 50, '#9ab4ff', 0.35);
  });
}
// s139 — "On the last night, he lies in his sunny spot, even though it's dark."
registerShot('s139', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1150, 620, 1.1), F(1300, 760, 1.6));
  moonRoom(g, t, cam);
  layer(g, cam, 1, (g) => dogLie(g, { x: 1330, y: GY() + 72, s: 1.35, facing: -1, t, head: t > 3 ? 'down' : 'up', eyes: 'tired', rim: MOON }));
} });
// s140 — "You talked to me every day of your life. I always understood."
registerShot('s140', { draw(g, t, info) {
  blurLayer(g, 9, (g) => moonRoom(g, t, { x: -300, y: 120, z: 1.5 }), null);
  const cam = push(t, info.dur, { x: 0, y: 0, z: 1 }, { x: 20, y: 0, z: 1.05 });
  layer(g, cam, 1, (g) => dogLie(g, { x: 1520, y: 1010, s: 6, facing: -1, t, head: 'up', eyes: 'tired', talk: bTalk(info), rim: { ...MOON, w: 8 }, shadow: false }));
  speak(g, 'BISCUIT', info, t, 600, 220, 880, 480, { size: 42, wrap: 24 });
} });
// s141 — "This year, you understood me back. Best year."
registerShot('s141', { draw(g, t, info) {
  blurLayer(g, 9, (g) => moonRoom(g, t, { x: -200, y: 160, z: 1.6 }), null);
  const cam = push(t, info.dur, { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: 1.05 });
  layer(g, cam, 1, (g) => {
    dogLie(g, { x: 1720, y: 1000, s: 4.2, facing: -1, t, head: 'up', eyes: t > wt('best', info, t, 2.8) ? 'happy' : 'tired', talk: bTalk(info), rim: { ...MOON, w: 7 }, shadow: false });
    bigFaceV2(g, 560, 700, 240, { outfit: YOU, expr: 'sad', look: [1, -0.1], tears: ease.out(prog(t, 0.5, 2.5)), rim: '#b8ccff', tilt: -0.2 });
  });
  speak(g, 'BISCUIT', info, t, 1180, 190, 1300, 420, { size: 40, wrap: 24 });
} });
// s142 — "Don't be sad for too long. Okay?"
registerShot('s142', { draw(g, t, info) {
  blurLayer(g, 9, (g) => moonRoom(g, t, { x: -300, y: 120, z: 1.5 }), null);
  const cam = push(t, info.dur, { x: 0, y: 0, z: 1.02 }, { x: 0, y: 0, z: 1.08 });
  layer(g, cam, 1, (g) => dogLie(g, { x: 1600, y: 1180, s: 7.5, facing: -1, t, head: 'up', eyes: 'tired', brows: 'sad', talk: bTalk(info), rim: { ...MOON, w: 9 }, shadow: false }));
  speak(g, 'BISCUIT', info, t, 560, 220, 820, 440, { size: 44 });
} });
// s143 — "You say okay."
registerShot('s143', { draw(g, t, info) {
  blurLayer(g, 10, (g) => moonRoom(g, t, { x: 300, y: 120, z: 1.5 }), null);
  const to = wt('okay', info, t, 1.4), tk = t > to && t < to + 0.5 ? 0.5 + 0.4 * Math.sin(t * 18) : 0;
  bigFaceV2(g, 960, 620 + (t > to ? Math.sin((t - to) * 6) * 10 : 0), 300 * (1 + 0.02 * t), { outfit: YOU, expr: 'sad', look: [0.3, 0.3], talk: tk, tears: clamp(0.6 + t * 0.2), rim: '#b8ccff' });
  say(g, 'Okay.', 1450, 260, t, to, 1200, 420, { size: 44 });
} });
// s144 — "It's the first time you ever lied to him."  wide and quiet
registerShot('s144', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1250, 740, 1.6), F(1100, 640, 1.15));
  moonRoom(g, t, cam);
  layer(g, cam, 1, (g) => { person(g, { x: 1080, y: GY() + 70, s: 1.2, facing: 1, outfit: YOU, pose: XP.floorSit, expr: 'sad', look: [1, 0.4], rim: MOON }); dogLie(g, { x: 1360, y: GY() + 76, s: 1.3, facing: -1, t, head: 'down', eyes: 'tired', rim: MOON }); });
} });
// s145 — "He falls asleep with his head on your foot."
function footShot(g, t, info, eyes, fade) {
  blurLayer(g, 6, (g) => moonRoom(g, t, { x: 200, y: 360, z: 2.2 }), null);
  const cam = push(t, info.dur, { x: 0, y: 0, z: 1 }, { x: 0, y: 0, z: 1.04 });
  layer(g, cam, 1, (g) => {
    g.strokeStyle = '#2a3140'; g.lineWidth = 150; g.lineCap = 'round'; g.beginPath(); g.moveTo(-100, 520); g.lineTo(820, 840); g.stroke();
    rr(g, 740, 770, 120, 110, 40); g.fillStyle = '#e8e4dc'; g.fill();                                                       // sock
    rr(g, 760, 790, 470, 150, 70); g.fillStyle = '#f6f2ea'; g.fill(); rr(g, 750, 900, 490, 46, 22); g.fillStyle = '#d8d2c6'; g.fill();
    g.strokeStyle = '#2E72D2'; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(880, 900); g.quadraticCurveTo(1000, 850, 1120, 880); g.stroke();   // blue stripe
    for (let i = 0; i < 4; i++) seg(g, [[880 + i * 34, 806 + i * 4], [900 + i * 34, 830 + i * 4]], 7, '#c8c0b0');                                  // laces
    dogLie(g, { x: 1720, y: 1010, s: 5.2, facing: -1, t: t * (fade ? 0 : 1), head: 'down', eyes, rim: { ...MOON, w: 7 }, shadow: false });
  });
  if (fade) veil(g, '#05070f', 0.6 * ease.inOut(prog(t, 0.4, info.dur)));
}
registerShot('s145', { draw(g, t, info) { footShot(g, t, info, t > wt('asleep', info, t, 0.6) + 0.3 ? 'closed' : 'tired', false); } });
// s146 — "And he doesn't wake up."
registerShot('s146', { draw(g, t, info) { footShot(g, t, info, 'closed', true); } });

// ---------------- after ----------------
// s147 — "For weeks, you can't go to the park."
registerShot('s147', { draw(g, t, info) {
  const cam = push(t, info.dur, F(1040, 640, 1.6), F(1060, 640, 1.7));
  layer(g, cam, 1, (g) => { const R = park(g, t, { x: 0, y: 0, z: 1 }, { gate: true, gateX: 1180, bench: false, time: 'dusk' }); person(g, { x: 860, y: R.GY + 30, s: 1.45, facing: 1, outfit: HOOD, pose: POSES.stand, expr: 'sad', look: [1, 0.3], rim: RIM }); });
  veil(g, '#8890a8', 0.3, 'multiply');
} });
// s148 — "Every dog there says hello."
registerShot('s148', { draw(g, t, info) {
  const cam = push(t, info.dur, F(960, 600, 1.05), F(960, 620, 1.12)), PALS = [{}, { base: '#2a2224', dark: '#1a1416', light: '#4a4044', ear: '#1a1416', muzzle: '#4a4044' }, { base: '#f2ece2', dark: '#c8c0b0', light: '#ffffff', ear: '#d8cbb8', muzzle: '#f2ece2' }, { base: '#8a5a3a', dark: '#6a4228', light: '#a87850', ear: '#6a4228', muzzle: '#a87850' }, { base: '#c8a070', dark: '#a07850', light: '#e0c090', ear: '#8a5a3a', muzzle: '#e0c090' }];
  layer(g, cam, 1, (g) => {
    const R = park(g, t, { x: 0, y: 0, z: 1 }, { bench: false, time: 'dusk' });
    [[300, 1.3], [700, 1.6], [1080, 1.2], [1440, 1.5], [1760, 1.3]].forEach(([x, s], i) => dogStand(g, { x: x + Math.sin(t * 6 + i) * 10, y: R.GY + 40 + (i % 2) * 40, s, facing: i % 2 ? -1 : 1, t: t + i, young: true, collar: i % 2 === 0, wag: 1, walk: 0.4, talk: 0.4 + 0.4 * Math.sin(t * 12 + i), eyes: 'happy', pal: PALS[i], rim: RIM }));
    g.strokeStyle = '#2a2a34'; g.lineWidth = 12; for (let x = -60; x < 2000; x += 90) { g.beginPath(); g.moveTo(x, 1100); g.lineTo(x, 640); g.stroke(); } seg(g, [[-60, 700], [2000, 700]], 12, '#2a2a34');
  });
  veil(g, '#8890a8', 0.2, 'multiply');
  ['HI!', 'HELLO!', 'HEY!', 'HI HI HI!', 'HELLO!'].forEach((w, i) => say(g, w, 300 + i * 360, 200 + (i % 2) * 110, t, 0.1 + i * 0.25, 300 + i * 360, 420, { size: 46, shout: i === 3 }));
} });
// s149 — "None of them sound like him."
registerShot('s149', { draw(g, t, info) {
  blurLayer(g, 10, (g) => { park(g, t, { x: 0, y: 0, z: 1 }, { bench: false, time: 'dusk' }); veil(g, '#8890a8', 0.3, 'multiply'); }, null);
  bigFaceV2(g, 960, 640, 300 * (1 + 0.02 * t), { outfit: HOOD, expr: 'sad', look: [0.2, 0.7], tears: 0.5 });
} });
// s150 — "And there's still no off switch."
registerShot('s150', { draw(g, t, info) {
  g.fillStyle = linGrad(g, 0, 0, 0, E.H, ['#c8d0dc', '#aab4c4']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
  g.save(); ZOOM(g, t, info.dur, 1.0, 1.06);
  const push2 = Math.max(0, Math.sin(t * 7)) * ease.out(prog(t, 0.6, 1.0)) * (t < info.dur - 0.6 ? 1 : 0);
  offSwitch(g, 900, 540, 1.6, { k: 0.04 * push2, dusty: true });
  const hx = 920 + 40, hy = 700 + 20 * (1 - push2);
  g.strokeStyle = '#2E72D2'; g.lineWidth = 150; g.lineCap = 'round'; g.beginPath(); g.moveTo(hx + 300, hy + 500); g.lineTo(hx + 80, hy + 110); g.stroke(); circle(g, hx + 30, hy + 50, 72, '#1d1b22');
  g.restore();
  nameTag(g, 'STILL ON', 1500, 240, t, wt('switch', info, t, 1.4), { size: 44, fill: alpha(CORALC, 0.9), color: '#ffffff' });
} });
