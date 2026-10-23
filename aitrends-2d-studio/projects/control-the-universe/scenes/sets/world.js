// sets/world.js — the new locations for "Can One Person Really Control the Universe?" (v2 look: bright, flat, detailed).
// Each set draws its own parallax layers with the camera and returns { GY } (the floor line) plus anchor points.
// Rooms reused from video 5 (kitchen, bedroom, living room, street, school cafeteria) are imported from there.
import { E, layer, rr, seg, circle, poly, linGrad, radGrad, glow, alpha, shade, rng, text, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const WGY = () => E.H * 0.82;
const NIGHT = ['#0a0f2a', '#1c2556', '#3a3576'];

function starSky(g, bottom, o = {}) {
  g.fillStyle = linGrad(g, 0, -E.H * 0.3, 0, bottom, o.colors || NIGHT); g.fillRect(-E.W, -E.H, E.W * 3, bottom + E.H);
  FX.stars(g, o.t || 0, { count: 220, area: [-E.W * 0.5, -E.H * 0.3, E.W * 2, bottom + E.H * 0.2], seed: o.seed || 5 });
  g.save(); g.globalCompositeOperation = 'lighter'; g.translate(E.W * 0.5, bottom * 0.45); g.rotate(-0.35);               // the Milky Way band
  g.fillStyle = radGrad(g, 0, 0, 10, E.W * 0.7, [alpha('#b8b0ff', 0.16), alpha('#b8b0ff', 0)]); g.scale(1, 0.18); g.beginPath(); g.arc(0, 0, E.W * 0.7, 0, Math.PI * 2); g.fill(); g.restore();
}
// a star you can point at (Vega): a bright 4-point twinkle
export function brightStar(g, x, y, s = 1, col = '#e8f0ff') { FX.sparkle(g, x, y, 26 * s, col, 1); circle(g, x, y, 5 * s, '#ffffff'); }

// GRANDMA'S BACKYARD at night: her house (warm windows), fence, trees, her old telescope; o.crater = glowing stones in
// the grass; o.time 'night' | 'dusk'; returns { GY, crater: [x, y], scope: [x, y] }
export function backyard(g, t, cam, o = {}) {
  const gy = WGY(), crater = o.craterAt || [1080, gy + 40], dusk = o.time === 'dusk';
  layer(g, cam, 0.1, (g) => { starSky(g, gy, { t, colors: dusk ? ['#1c1f52', '#5a3a7a', '#e08a6a'] : NIGHT }); if (!dusk) FX.moon(g, E.W * 0.82, 150, 34); });
  layer(g, cam, 0.35, (g) => { FX.hills(g, { y: gy - 160, amp: 40, color: '#1a2040', seed: 4 }); for (let i = 0; i < 9; i++) FX.pine(g, -300 + i * 300 + (i % 2) * 90, gy - 120, 1.1 + (i % 3) * 0.2, '#141a36'); });
  layer(g, cam, 0.7, (g) => {
    const hx = -60, hy = gy - 40;                                                                 // the house, left
    g.fillStyle = '#5a4a6a'; g.fillRect(hx, hy - 420, 640, 420); poly(g, [[hx - 40, hy - 420], [hx + 320, hy - 600], [hx + 680, hy - 420]], '#3a2a3a');
    for (const [dx, dy] of [[70, 110], [380, 110], [70, 260]]) { rr(g, hx + dx, hy - 420 + dy, 140, 110, 6); g.fillStyle = '#ffcf7a'; g.fill(); g.fillStyle = '#5a4a6a'; g.fillRect(hx + dx + 66, hy - 420 + dy, 8, 110); glow(g, hx + dx + 70, hy - 420 + dy + 55, 160, '#ffcf7a', 0.25); }
    rr(g, hx + 400, hy - 220, 110, 220, 4); g.fillStyle = '#3a2a3a'; g.fill(); glow(g, hx + 455, hy - 240, 90, '#ffe2a8', 0.5); circle(g, hx + 455, hy - 240, 8, '#fff2d0');
    g.fillStyle = '#6a5a5a'; for (let x = 620; x < E.W + 300; x += 48) { rr(g, x, gy - 200, 36, 170, 4); g.fill(); } g.fillRect(600, gy - 160, E.W, 10);   // fence
  });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, gy - 40, 0, E.H * 1.4, dusk ? ['#3a5a3a', '#203424'] : ['#2a4a3e', '#16281f']); g.fillRect(-E.W, gy - 40, E.W * 3, E.H * 2);
    const r = rng(9); g.strokeStyle = alpha('#5a8a6a', 0.5); g.lineWidth = 3; for (let i = 0; i < 140; i++) { const x = -200 + r() * (E.W + 400), y = gy - 30 + r() * 220; g.beginPath(); g.moveTo(x, y); g.lineTo(x + 4, y - 14); g.stroke(); }
    const sx = o.scopeX ?? 1640, sy = gy + 20;                                                   // the telescope on its tripod
    for (const dx of [-60, 0, 60]) seg(g, [[sx, sy - 170], [sx + dx, sy]], 8, '#c8c8d0');
    g.save(); g.translate(sx, sy - 180); g.rotate(-0.6); rr(g, -40, -26, 230, 52, 20); g.fillStyle = '#f2f2f6'; g.fill(); rr(g, 170, -32, 40, 64, 10); g.fillStyle = '#c0504d'; g.fill(); g.restore();
    if (o.crater) { g.fillStyle = '#10201a'; g.beginPath(); g.ellipse(crater[0], crater[1], 230, 46, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#2e4a3e'; g.beginPath(); g.ellipse(crater[0], crater[1] - 8, 200, 34, 0, Math.PI, Math.PI * 2); g.fill(); glow(g, crater[0], crater[1] - 20, 320, '#bff6ff', 0.35 + 0.1 * Math.sin(t * 3)); }
  });
  return { GY: gy, crater, scope: [o.scopeX ?? 1640, gy - 160] };
}

// CLASSROOM: green board with "MATH TEST", a wall clock, sunny windows (right), rows of desks; o.clock = minutes past 7:00
// for the analog clock (59 = 7:59), o.frozen dims nothing (the shot freezes the motion itself); returns { GY, desks }
export function classroom(g, t, cam, o = {}) {
  const gy = WGY();
  layer(g, cam, 0.6, (g) => {
    g.fillStyle = linGrad(g, 0, -200, 0, gy, ['#f2e2c4', '#f8ecd4']); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H);
    g.fillStyle = '#d8c8a8'; g.fillRect(-E.W, gy - 200, E.W * 3, 200);
    rr(g, 180, gy - 700, 900, 400, 14); g.fillStyle = '#7a5a3a'; g.fill(); rr(g, 200, gy - 680, 860, 360, 8); g.fillStyle = '#2f5a48'; g.fill();
    text(g, 'MATH TEST', 630, gy - 600, { size: 64, font: FONTS.title, weight: 700, color: '#f2f2e6' });
    text(g, '4.  3x + 7 = 22', 630, gy - 480, { size: 48, font: FONTS.title, weight: 700, color: alpha('#f2f2e6', 0.9) });
    const cx = 1240, cy = gy - 620, m = (o.clock ?? 59) + (o.frozen ? 0 : t / 60);                     // wall clock
    circle(g, cx, cy, 70, '#3a3a44'); circle(g, cx, cy, 62, '#fbf6ec'); for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; seg(g, [[cx + Math.sin(a) * 50, cy - Math.cos(a) * 50], [cx + Math.sin(a) * 58, cy - Math.cos(a) * 58]], 4, '#3a3a44'); }
    const am = m / 60 * Math.PI * 2, ah = (7 + m / 60) / 12 * Math.PI * 2; seg(g, [[cx, cy], [cx + Math.sin(ah) * 30, cy - Math.cos(ah) * 30]], 7, '#2a2a34'); seg(g, [[cx, cy], [cx + Math.sin(am) * 46, cy - Math.cos(am) * 46]], 5, '#2a2a34'); circle(g, cx, cy, 6, '#d8343a');
    FX.windowFrame(g, { x: 1420, y: gy - 760, w: 560, h: 480, cols: 2, rows: 2, frame: '#fbf6ec', bar: 12 }, (g, X, Y, W, H) => { g.fillStyle = linGrad(g, 0, Y, 0, Y + H, ['#7ab8e8', '#cfe8f6']); g.fillRect(X, Y, W, H); g.fillStyle = '#7ab04a'; g.fillRect(X, Y + H * 0.72, W, H); circle(g, X + W * 0.3, Y + H * 0.6, 70, '#4a9a4a'); });
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = radGrad(g, 1700, gy - 500, 50, 900, [alpha('#fff2c8', 0.22), alpha('#fff2c8', 0)]); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); g.restore();
  });
  const desks = [300, 760, 1220, 1680];
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, gy - 8, 0, E.H * 1.6, ['#c8a07a', '#a07a58']); g.fillRect(-E.W, gy - 8, E.W * 3, E.H * 2);
    for (const x of desks) { rr(g, x - 130, gy - 150, 260, 22, 6); g.fillStyle = '#d8b088'; g.fill(); g.fillStyle = '#6a6a74'; g.fillRect(x - 110, gy - 128, 10, 130); g.fillRect(x + 100, gy - 128, 10, 130); rr(g, x - 40, gy - 162, 90, 12, 3); g.fillStyle = '#ffffff'; g.fill(); }
  });
  return { GY: gy, desks };
}

// TOKYO RAMEN STALL at night: red lanterns, a cloth curtain, the counter with steaming bowls, "TOKYO" in plain text
// on a street sign; returns { GY, counter }
export function ramenStall(g, t, cam, o = {}) {
  const gy = WGY();
  layer(g, cam, 0.2, (g) => { g.fillStyle = linGrad(g, 0, -200, 0, gy, ['#1a1440', '#3a2060', '#6a3a6a']); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); FX.skyline(g, { x: -E.W, y: gy - 120, w: E.W * 3, minH: 260, maxH: 680, color: '#2a1e4a', windowColor: '#ff9ad8', lit: 0.3, seed: 12 }); });
  layer(g, cam, 0.5, (g) => { for (const [x, y, c] of [[160, 220, '#ff4a8a'], [1720, 260, '#3ad8ff'], [420, 120, '#ffd23a']]) { rr(g, x - 70, y - 160, 140, 320, 12); g.fillStyle = alpha(c, 0.85); g.fill(); glow(g, x, y, 220, c, 0.35); } rr(g, 1500, 80, 300, 90, 12); g.fillStyle = '#2a7a4a'; g.fill(); text(g, 'TOKYO', 1650, 126, { size: 54, font: FONTS.ui, weight: 900, color: '#ffffff', spacing: 6 }); });
  layer(g, cam, 0.85, (g) => {
    g.fillStyle = '#4a2a20'; g.fillRect(400, gy - 620, 1120, 40); poly(g, [[360, gy - 620], [1560, gy - 620], [1500, gy - 680], [420, gy - 680]], '#7a3a28');
    for (let i = 0; i < 6; i++) { rr(g, 440 + i * 176, gy - 580, 160, 220, 10); g.fillStyle = i % 2 ? '#2a3a6a' : '#24305a'; g.fill(); }            // the curtain
    for (const x of [470, 1450]) { g.fillStyle = '#d8343a'; g.beginPath(); g.ellipse(x, gy - 520, 48, 66, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#1a1420'; g.fillRect(x - 30, gy - 590, 60, 10); g.fillRect(x - 30, gy - 458, 60, 10); glow(g, x, gy - 520, 180, '#ff8a5a', 0.5); }
    g.fillStyle = '#3a2a2a'; g.fillRect(-E.W, gy - 8, E.W * 3, E.H);
    rr(g, 380, gy - 300, 1160, 46, 10); g.fillStyle = '#c8935f'; g.fill(); g.fillStyle = '#8a5a3a'; g.fillRect(400, gy - 254, 1120, 254);
    for (const x of [640, 960, 1280]) { g.fillStyle = '#f6f2ea'; g.beginPath(); g.ellipse(x, gy - 312, 90, 22, 0, 0, Math.PI); g.fill(); g.fillStyle = '#d8343a'; g.fillRect(x - 90, gy - 318, 180, 8); g.fillStyle = '#f2c86a'; g.beginPath(); g.ellipse(x, gy - 318, 80, 12, 0, 0, Math.PI * 2); g.fill();
      for (let k = 0; k < 3; k++) { const ph = t * 0.6 + k * 0.33 + x * 0.001, yy = gy - 340 - ((ph % 1) * 160); g.strokeStyle = alpha('#ffffff', 0.35 * (1 - (ph % 1))); g.lineWidth = 6; g.beginPath(); g.moveTo(x - 20 + k * 20, yy + 40); g.quadraticCurveTo(x - 40 + k * 20, yy + 20, x - 20 + k * 20, yy); g.stroke(); } }
    for (const x of [560, 960, 1360]) { rr(g, x - 34, gy - 160, 68, 16, 6); g.fillStyle = '#d8343a'; g.fill(); g.fillStyle = '#4a4a54'; g.fillRect(x - 6, gy - 144, 12, 144); }
  });
  return { GY: gy, counter: gy - 300 };
}

// STADIUM at night: stands full of people (tiny bright shirts), floodlights, the green field; returns { GY }
export function stadium(g, t, cam, o = {}) {
  const gy = WGY();
  layer(g, cam, 0.15, (g) => { g.fillStyle = linGrad(g, 0, -200, 0, gy, ['#0a0f2a', '#1a2250']); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H); for (const x of [-100, 2020]) { seg(g, [[x, 520], [x, 40]], 18, '#3a3a50'); rr(g, x - 110, 0, 220, 90, 10); g.fillStyle = '#f2f6ff'; g.fill(); glow(g, x, 45, 520, '#e8f0ff', 0.4); } });
  layer(g, cam, 0.5, (g) => {
    const r = rng(17), cols = ['#d8343a', '#2E72D2', '#f2c21a', '#ffffff', '#3fa06a', '#e8892a', '#8a5ad6'];
    for (let row = 0; row < 12; row++) { const y = 140 + row * 52, sh = row % 2 ? 22 : 0; g.fillStyle = shade('#3a3a5a', row * 0.02); g.fillRect(-E.W, y + 24, E.W * 3, 28);
      for (let x = -400 + sh; x < E.W + 400; x += 44) { const bob = Math.sin(t * 6 + x * 0.05 + row) * 3; circle(g, x, y + 4 + bob, 11, '#1d1b22'); rr(g, x - 12, y + 14 + bob, 24, 20, 6); g.fillStyle = cols[(r() * cols.length) | 0]; g.fill(); } }
  });
  layer(g, cam, 0.9, (g) => { g.fillStyle = linGrad(g, 0, gy - 120, 0, E.H * 1.4, ['#4aa04a', '#2a7a3a']); g.fillRect(-E.W, gy - 120, E.W * 3, E.H * 2); for (let x = -E.W; x < E.W * 2; x += 240) { g.fillStyle = alpha('#ffffff', 0.06); g.fillRect(x, gy - 120, 120, E.H); } seg(g, [[-E.W, gy - 60], [E.W * 2, gy - 60]], 6, alpha('#ffffff', 0.7)); g.fillStyle = '#2a2a40'; g.fillRect(-E.W, gy - 140, E.W * 3, 24); });
  return { GY: gy };
}

// NASA CONTROL ROOM: rows of consoles, a big wall screen (map with a pulsing red dot = you); "NASA" as plain text, no
// logo; o.alert = red light; o.screen(g, x, y, w, h) draws the wall screen's content instead of the map; returns { GY, screen }
export function nasaRoom(g, t, cam, o = {}) {
  const gy = WGY(), S = { x: 360, y: 90, w: 1200, h: 520 };
  layer(g, cam, 0.5, (g) => {
    g.fillStyle = linGrad(g, 0, -200, 0, gy, ['#121a34', '#1e2a4e']); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H);
    text(g, 'NASA', 200, 140, { size: 60, font: FONTS.ui, weight: 900, color: alpha('#ffffff', 0.85), spacing: 10 });
    rr(g, S.x - 20, S.y - 20, S.w + 40, S.h + 40, 14); g.fillStyle = '#0a0e1c'; g.fill();
    g.save(); g.beginPath(); g.rect(S.x, S.y, S.w, S.h); g.clip();
    if (o.screen) o.screen(g, S.x, S.y, S.w, S.h);
    else { g.fillStyle = '#16304a'; g.fillRect(S.x, S.y, S.w, S.h); g.strokeStyle = alpha('#5ac8ff', 0.25); g.lineWidth = 2; for (let x = S.x; x < S.x + S.w; x += 60) { g.beginPath(); g.moveTo(x, S.y); g.lineTo(x, S.y + S.h); g.stroke(); } for (let y = S.y; y < S.y + S.h; y += 60) { g.beginPath(); g.moveTo(S.x, y); g.lineTo(S.x + S.w, y); g.stroke(); }
      g.fillStyle = '#2a5a4a'; g.beginPath(); g.ellipse(S.x + 420, S.y + 260, 300, 170, 0.2, 0, Math.PI * 2); g.fill(); g.beginPath(); g.ellipse(S.x + 900, S.y + 220, 220, 140, -0.3, 0, Math.PI * 2); g.fill();
      const px = S.x + 560, py = S.y + 250; for (let k = 0; k < 3; k++) { const rr2 = ((t * 120 + k * 60) % 180); g.strokeStyle = alpha('#ff4a4a', 1 - rr2 / 180); g.lineWidth = 6; g.beginPath(); g.arc(px, py, rr2, 0, Math.PI * 2); g.stroke(); } circle(g, px, py, 16, '#ff4a4a'); }
    g.restore();
    if (o.alert) { glow(g, E.W / 2, 0, 900, '#ff3a3a', 0.25 + 0.15 * Math.sin(t * 8)); }
  });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = '#0e1426'; g.fillRect(-E.W, gy - 8, E.W * 3, E.H);
    for (const [y, n, s] of [[gy - 40, 5, 1], [gy + 120, 4, 1.25]]) for (let i = 0; i < n; i++) { const x = (i + 0.5) * E.W / n - E.W * 0.02 * s; rr(g, x - 150 * s, y - 70 * s, 300 * s, 70 * s, 10); g.fillStyle = '#2a3450'; g.fill(); for (const dx of [-80, 30]) { rr(g, x + dx * s, y - 150 * s, 100 * s, 70 * s, 6); g.fillStyle = '#0a1a2a'; g.fill(); rr(g, x + dx * s + 6, y - 144 * s, 88 * s, 58 * s, 4); g.fillStyle = alpha(i % 2 ? '#5ac8ff' : '#7ae0a0', 0.75); g.fill(); } }
  });
  return { GY: gy, screen: S };
}

// THE OLD OBSERVATORY: inside the dome; o.open 0..1 slides the slit open onto the stars; the big white telescope;
// returns { GY, slit: [x, y] }
export function observatory(g, t, cam, o = {}) {
  const gy = WGY(), k = o.open ?? 1;
  layer(g, cam, 0.5, (g) => {
    g.fillStyle = '#2a2448'; g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H);
    g.save(); g.beginPath(); g.ellipse(E.W / 2, gy, 1100, 1000, 0, Math.PI, Math.PI * 2); g.clip();
    g.fillStyle = linGrad(g, 0, -200, 0, gy, ['#3a3266', '#5a4a7a']); g.fillRect(-E.W, -E.H, E.W * 3, gy + E.H);
    for (let i = -6; i <= 6; i++) { g.strokeStyle = alpha('#000000', 0.18); g.lineWidth = 6; g.beginPath(); g.moveTo(E.W / 2 + i * 160, gy); g.quadraticCurveTo(E.W / 2 + i * 110, gy - 600, E.W / 2, -120); g.stroke(); }
    const sw = 280 * k; g.save(); g.beginPath(); g.moveTo(E.W / 2 - sw / 2, gy - 120); g.lineTo(E.W / 2 + sw / 2, gy - 120); g.lineTo(E.W / 2 + sw / 2, -200); g.lineTo(E.W / 2 - sw / 2, -200); g.closePath(); g.clip();
    starSky(g, gy, { t, seed: 9 }); brightStar(g, E.W / 2 + 40, 160, 1.4, '#cfe0ff'); g.restore();
    g.restore();
  });
  layer(g, cam, 0.9, (g) => {
    g.fillStyle = linGrad(g, 0, gy - 8, 0, E.H * 1.4, ['#5a4a5a', '#3a2e3e']); g.fillRect(-E.W, gy - 8, E.W * 3, E.H * 2);
    rr(g, E.W / 2 - 90, gy - 260, 180, 260, 20); g.fillStyle = '#c8c8d4'; g.fill();                                        // the mount
    g.save(); g.translate(E.W / 2, gy - 300); g.rotate(-1.05); rr(g, -120, -70, 640, 140, 60); g.fillStyle = '#f2f2f6'; g.fill(); rr(g, 480, -80, 60, 160, 20); g.fillStyle = '#2a2a34'; g.fill(); g.fillStyle = alpha('#000000', 0.12); g.fillRect(-100, 20, 600, 40); g.restore();
    circle(g, E.W / 2, gy - 300, 60, '#9a9aa8');
  });
  return { GY: gy, slit: [E.W / 2, 200] };
}

// SPACE: stars, the curve of the Earth at the bottom; returns { horizon }
export function space(g, t, cam, o = {}) {
  layer(g, cam, 0.05, (g) => { g.fillStyle = '#05071a'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); FX.stars(g, t, { count: 260, area: [-E.W * 0.5, -E.H * 0.5, E.W * 2, E.H * 2], seed: 21 }); });
  const cy = E.H + (o.earthDrop ?? 900);
  layer(g, cam, 0.3, (g) => {
    glow(g, E.W / 2, cy - 1500, 1700, '#5ac8ff', 0.25);
    g.fillStyle = linGrad(g, 0, cy - 1700, 0, cy, ['#3a8ad8', '#1a4a9a']); g.beginPath(); g.arc(E.W / 2, cy, 1700, 0, Math.PI * 2); g.fill();
    g.save(); g.beginPath(); g.arc(E.W / 2, cy, 1700, 0, Math.PI * 2); g.clip(); const r = rng(3);
    for (let i = 0; i < 14; i++) { g.fillStyle = alpha('#ffffff', 0.55); g.beginPath(); g.ellipse(-200 + r() * 2400 + t * 6, cy - 1690 + r() * 500, 120 + r() * 160, 18 + r() * 20, 0.1, 0, Math.PI * 2); g.fill(); }
    g.fillStyle = '#3a9a5a'; g.beginPath(); g.ellipse(600, cy - 1620, 380, 90, 0.05, 0, Math.PI * 2); g.fill(); g.restore();
    g.strokeStyle = alpha('#9ad8ff', 0.7); g.lineWidth = 14; g.beginPath(); g.arc(E.W / 2, cy, 1706, Math.PI * 1.15, Math.PI * 1.85); g.stroke();
  });
  return { horizon: cy - 1700 };
}
// a GPS satellite (gold body, two blue solar panels)
export function gpsSat(g, x, y, s = 1, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  for (const d of [-1, 1]) { rr(g, d > 0 ? 60 : -260, -50, 200, 100, 6); g.fillStyle = '#2a4a9a'; g.fill(); g.strokeStyle = '#9ac0ff'; g.lineWidth = 3; for (let i = 1; i < 5; i++) { const xx = (d > 0 ? 60 : -260) + i * 40; g.beginPath(); g.moveTo(xx, -50); g.lineTo(xx, 50); g.stroke(); } seg(g, [[d * 40, 0], [d * 60, 0]], 8, '#c8c8d0'); }
  rr(g, -50, -60, 100, 120, 10); g.fillStyle = '#e8b84a'; g.fill(); g.fillStyle = alpha('#ffffff', 0.3); g.fillRect(-44, -54, 30, 108);
  seg(g, [[0, 60], [0, 100]], 6, '#c8c8d0'); circle(g, 0, 104, 14, '#f2f2f6');
  g.restore();
}
