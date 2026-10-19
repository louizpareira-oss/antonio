// sets/world.js — "2x Heavier" sets: the river and the old bridge to Grandpa's house, the lake and dock, underwater,
// the seesaw stage, a school hallway, the stairs, the house cut-away, the launch pad, the capsule interior and orbit.
import { E, V, S, mood, layer, backdrop, rng, rr, seg, circle, ring, poly, linGrad, radGrad, glow, alpha, shade, mix, text, FONTS, clamp, lerp, ease } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import { room, table } from '/projects/stronger-couldnt-stop/scenes/sets/home.js';
import { atlasLogo } from '/projects/stronger-couldnt-stop/scenes/lib.js';
import { limitSign } from '../lib.js';

const GYP = () => E.H * 0.8;
const SKIES = {
  golden: ['#5a4a8a', '#e8906a', '#f9d49c'], dusk: ['#3a3366', '#a05a7a', '#f2a46a'], dawn: ['#6a7ab0', '#e8a0a0', '#ffe2b8'],
  night: ['#0e1430', '#1e2650', '#3a3a6a'], noon: ['#4a9ae0', '#8ec8f0', '#dff2ff'],
};
// Grandpa's little house with a porch; lit = porch light 0..1
export function house(g, x, y, s = 1, lit = 0.6, o = {}) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -220, -260, 440, 260, 6); g.fillStyle = o.wall || '#e8d8b8'; g.fill(); poly(g, [[-250, -250], [0, -400], [250, -250]], o.roof || '#a0463a');
  rr(g, -170, -190, 110, 90, 6); g.fillStyle = mix('#3a3a4a', '#ffd890', lit); g.fill(); rr(g, 60, -190, 110, 90, 6); g.fill(); rr(g, -40, -150, 80, 150, 6); g.fillStyle = '#6a4a3a'; g.fill();
  g.fillStyle = '#8a6a4a'; g.fillRect(-260, -20, 520, 20); for (const px of [-240, 240]) seg(g, [[px, 0], [px, -200]], 10, '#8a6a4a'); g.fillRect(-260, -210, 520, 14);
  if (lit > 0) { circle(g, -70, -170, 10, '#fff2c8'); glow(g, -70, -170, 220 * s, '#ffcf8a', 0.55 * lit); }
  g.restore();
}
// THE RIVER: far bank with Grandpa's house, the river across the middle, the old truss bridge running from the near-left bank
// to the far bank. o.time: golden|dusk|dawn|night. Returns { GY, CX, WT, BR0, BR1, HOUSE, SIGN }
export function river(g, t, cam, o = {}) {
  const time = o.time || 'golden', night = time === 'night', GY = GYP(), CX = E.W / 2, WT = GY - 290, BR0 = [CX - 1000, GY + 60], BR1 = [CX + 120, WT + 6];
  const HOUSE = [CX + 520, WT - 6], SIGN = [CX - 760, GY - 150];
  layer(g, cam, 0.08, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, WT, SKIES[time]); g.fillRect(-E.W * 2, -E.H * 2, E.W * 5, WT + E.H * 2);
    if (night) FX.stars(g, t, { count: 120, area: [-E.W, -E.H, E.W * 3, E.H * 0.8] }); else FX.sun(g, CX + (time === 'dawn' ? -650 : 760), WT - (time === 'golden' ? 180 : 60), 70, '#fff6e0', '#ffd59a', 5);
    if (!night) FX.clouds(g, { y: 60, h: 160, color: '#ffffff', a: 0.25, seed: 7 }); });
  layer(g, cam, 0.3, (g) => { poly(g, [[-E.W, WT], [-300, WT - 160], [300, WT - 90], [900, WT - 200], [1500, WT - 110], [E.W * 2, WT - 180], [E.W * 2, WT]], night ? '#141a30' : time === 'dawn' ? '#7a7aa0' : '#6a5a7a'); });
  layer(g, cam, 0.5, (g) => { g.fillStyle = night ? '#1a2a24' : '#4d7a4a'; g.fillRect(-E.W * 2, WT - 40, E.W * 5, 46);
    for (let i = 0; i < 16; i++) FX.tree(g, -E.W * 0.6 + i * 230 + (i % 3) * 50, WT - 10, 0.7 + (i % 4) * 0.12, night ? '#0e1a18' : shade('#3a6a3a', -(i % 3) * 0.08));
    house(g, HOUSE[0], HOUSE[1], 0.55, night ? 1 : time === 'dusk' ? 0.8 : 0.2); });
  layer(g, cam, 0.75, (g) => { g.fillStyle = linGrad(g, 0, WT, 0, GY + 40, night ? ['#1a2244', '#0e1430'] : time === 'dawn' ? ['#c8a0b0', '#6a7ab0'] : ['#e8b080', '#4a6a9a']); g.fillRect(-E.W * 2, WT, E.W * 5, GY + 40 - WT);
    const r = rng(3); for (let i = 0; i < 40; i++) { const y = WT + 10 + r() * (GY - WT), x = ((r() * E.W * 2 + t * (20 + r() * 30)) % (E.W * 2.4)) - E.W * 0.2; g.fillStyle = alpha('#ffffff', 0.12 + r() * 0.15); g.fillRect(x, y, 40 + r() * 120, 3); }
    if (night) glow(g, HOUSE[0], WT + 60, 300, '#ffcf8a', 0.25);
    if (time === 'dawn') FX.fog(g, WT - 40, 200, '#ffe8f0', 0.35); });
  layer(g, cam, 0.85, (g) => {                                                                     // the bridge: deck + truss
    const [x0, y0] = BR0, [x1, y1] = BR1, w0 = 120, w1 = 36, lerpP = (k, side) => [lerp(x0, x1, k), lerp(y0, y1, k) - side * lerp(w0, w1, k)];
    poly(g, [[x0, y0], [x1, y1], [x1, y1 - w1 * 0.3], [x0, y0 - w0 * 0.3]], '#5a5048'); poly(g, [[x0, y0 + 16], [x1, y1 + 5], [x1, y1], [x0, y0]], '#3a322c');
    for (let i = 0; i <= 12; i++) { const k = i / 12, [bx, by] = lerpP(k, 0), h = lerp(170, 50, k); seg(g, [[bx, by], [bx, by - h]], lerp(10, 4, k), '#7a6a5a'); if (i < 12) { const [nx, ny] = lerpP((i + 1) / 12, 0), nh = lerp(170, 50, (i + 1) / 12); seg(g, [[bx, by - h], [nx, ny]], lerp(8, 3, k), '#7a6a5a'); } }
    seg(g, [[x0, y0 - 170], [x1, y1 - 50]], 12, '#8a7a6a');
    for (let i = 0; i < 5; i++) { const k = (i + 0.5) / 5, [px, py] = lerpP(k, 0); seg(g, [[px, py + 10], [px, py + lerp(260, 300, k)]], lerp(30, 10, k), '#4a4038'); }
    if (o.barrier) { const bx = x0 + 160, by = y0 - 20; for (let i = 0; i < 6; i++) { g.fillStyle = i % 2 ? '#ffffff' : '#d63a2a'; g.fillRect(bx - 120 + i * 40, by - 90, 40, 26); } seg(g, [[bx - 110, by], [bx - 110, by - 90]], 8, '#3a3a44'); seg(g, [[bx + 110, by], [bx + 110, by - 90]], 8, '#3a3a44'); rr(g, bx - 70, by - 150, 140, 50, 8); g.fillStyle = '#1c2230'; g.fill(); text(g, 'ATLAS', bx, by - 125, { size: 30, color: '#3FC1C9', font: FONTS.ui, weight: 900 }); } });
  layer(g, cam, 1, (g) => { g.fillStyle = linGrad(g, 0, GY - 40, 0, E.H * 1.3, night ? ['#1a2a24', '#0e1612'] : ['#7aa04a', '#4a6a2a']); poly(g, [[-E.W * 2, GY - 30], [CX - 300, GY - 50], [CX + 400, GY + 10], [E.W * 3, GY + 30], [E.W * 3, E.H * 2], [-E.W * 2, E.H * 2]], night ? '#1a2a24' : '#6a944a');
    g.fillStyle = night ? alpha('#2a3a34', 0.6) : alpha('#c8b080', 0.7); poly(g, [[-E.W * 2, GY - 30], [CX - 300, GY - 50], [CX + 400, GY + 10], [E.W * 3, GY + 30], [E.W * 3, GY + 60], [CX + 400, GY + 44], [CX - 300, GY - 18], [-E.W * 2, GY]]);
    if (!o.noSign) limitSign(g, SIGN[0], SIGN[1], 0.6); });
  return { GY, CX, WT, BR0, BR1, HOUSE, SIGN, night };
}
// THE LAKE: far tree line, bright water, a wooden dock from the left, sandy shore with a lifeguard chair.
// Returns { GY, CX, WY (water surface), DOCK: [x0, x1, y] }
export function lake(g, t, cam, o = {}) {
  const GY = GYP(), CX = E.W / 2, WY = GY - 120, DOCK = [CX - 1100, CX + 260, WY - 40];
  layer(g, cam, 0.08, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, WY - 200, SKIES.noon); g.fillRect(-E.W * 2, -E.H * 2, E.W * 5, WY + E.H * 2); FX.sun(g, CX + 650, 160, 70, '#fffbe8', '#fff2c0', 5); FX.clouds(g, { y: 80, h: 180, color: '#ffffff', a: 0.55, seed: 3 }); });
  layer(g, cam, 0.35, (g) => { for (let i = 0; i < 22; i++) FX.pine(g, -E.W * 0.8 + i * 180 + (i % 3) * 40, WY - 200, 0.7 + (i % 4) * 0.15, shade('#2f5a3a', -(i % 3) * 0.08)); g.fillStyle = '#3f6a3a'; g.fillRect(-E.W * 2, WY - 210, E.W * 5, 14); });
  layer(g, cam, 0.7, (g) => { g.fillStyle = linGrad(g, 0, WY - 200, 0, GY + 200, ['#7ac8e8', '#2a7ab0']); g.fillRect(-E.W * 2, WY - 200, E.W * 5, GY + 400 - WY);
    const r = rng(9); for (let i = 0; i < 50; i++) { const y = WY - 190 + r() * (GY + 160 - WY), x = ((r() * E.W * 2 + t * 25) % (E.W * 2.4)) - E.W * 0.2; g.fillStyle = alpha('#ffffff', 0.15 + r() * 0.2); g.fillRect(x, y, 30 + r() * 100, 3); } });
  layer(g, cam, 0.9, (g) => { const [x0, x1, y] = DOCK; for (let x = x0; x < x1; x += 130) seg(g, [[x + 60, y], [x + 60, y + 220]], 16, '#5a4030'); rr(g, x0, y - 22, x1 - x0, 26, 6); g.fillStyle = '#b08058'; g.fill(); g.fillStyle = 'rgba(0,0,0,.18)'; for (let x = x0; x < x1; x += 46) g.fillRect(x, y - 22, 3, 26);
    if (!o.noChair) { const cx = CX - 800, cy = WY + 40; poly(g, [[cx - 80, cy], [cx - 40, cy - 330], [cx + 40, cy - 330], [cx + 80, cy]], 'rgba(0,0,0,0)'); for (const sx of [-1, 1]) seg(g, [[cx + sx * 80, cy + 60], [cx + sx * 40, cy - 330]], 12, '#f4efe6'); for (let i = 0; i < 4; i++) seg(g, [[cx - 72 + i * 6, cy - i * 90], [cx + 72 - i * 6, cy - i * 90]], 8, '#f4efe6'); rr(g, cx - 60, cy - 360, 120, 34, 6); g.fillStyle = '#d63a2a'; g.fill(); text(g, '+', cx, cy - 343, { size: 34, color: '#ffffff', font: FONTS.ui, weight: 900 }); } });
  layer(g, cam, 1, (g) => { poly(g, [[-E.W * 2, GY + 40], [CX - 700, GY + 10], [CX - 300, GY + 120], [CX + 400, E.H * 1.3], [-E.W * 2, E.H * 2]], '#e8d0a0'); });
  return { GY, CX, WY, DOCK };
}
// UNDERWATER: teal water lit from above, light rays, a sandy floor (o.slope rises to the right), weeds, fish, bubbles.
// o.up = looking up at the surface (o.bridge draws the bridge's dark underside through it). Returns { floor(x) }
export function underwater(g, t, cam, o = {}) {
  const top = o.up ? E.H * 0.55 : 0, floor = (x) => o.slope ? lerp(E.H * 0.9, E.H * 0.45, clamp((x + 200) / (E.W + 400))) : E.H * 0.86;
  layer(g, cam, 0.1, (g) => { g.fillStyle = linGrad(g, 0, -E.H * 0.5, 0, E.H * 1.4, o.river ? ['#8ad0c0', '#2a7a7a', '#0e3a44'] : ['#a8e4f0', '#3a9ab8', '#0e4a6a']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
    if (o.up) { g.fillStyle = alpha('#ffffff', 0.5); for (let i = 0; i < 14; i++) { const x = i * 160 + 40 * Math.sin(t * 1.3 + i); g.beginPath(); g.ellipse(x, 120 + 20 * Math.sin(i), 90, 14, 0, 0, Math.PI * 2); g.fill(); } glow(g, E.W * 0.6, 60, 600, '#fffbe8', 0.7);
      if (o.bridge) { g.fillStyle = alpha('#14202a', 0.75); poly(g, [[-100, 70], [E.W + 100, 30], [E.W + 100, 140], [-100, 190]]); for (let i = 0; i < 4; i++) { g.fillRect(200 + i * 480, 150 - i * 10, 60, 500); } } }
    FX.godRays(g, E.W * 0.6, -80, { angle: Math.PI / 2 + 0.15, spread: 0.6, len: 1500, color: '#e8fff8', a: 0.14, t }); });
  layer(g, cam, 0.6, (g) => { const r = rng(4); for (let i = 0; i < 8; i++) { const fx = ((t * (40 + i * 9) + i * 330) % (E.W + 400)) - 200, fy = 200 + r() * 500 + 20 * Math.sin(t * 2 + i); g.save(); g.translate(fx, fy); g.fillStyle = alpha(i % 3 ? '#f2a23a' : '#c8d8e0', 0.85); g.beginPath(); g.ellipse(0, 0, 26, 11, 0, 0, Math.PI * 2); g.fill(); poly(g, [[-22, 0], [-42, -12], [-42, 12]]); circle(g, 12, -2, 3, '#14161e'); g.restore(); } });
  layer(g, cam, 0.9, (g) => { g.fillStyle = linGrad(g, 0, E.H * 0.4, 0, E.H, ['#d8c090', '#8a7050']); g.beginPath(); g.moveTo(-E.W, E.H * 2); for (let x = -E.W; x <= E.W * 2; x += 40) g.lineTo(x, floor(x) + 8 * Math.sin(x * 0.02)); g.lineTo(E.W * 2, E.H * 2); g.fill();
    for (let i = 0; i < 18; i++) { const x = i * 120 + 30, y = floor(x); g.strokeStyle = alpha('#3a7a4a', 0.8); g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + 20 * Math.sin(t * 1.5 + i), y - 60, x + 10 * Math.sin(t + i), y - 110 - (i % 3) * 30); g.stroke(); }
    for (let i = 0; i < 6; i++) circle(g, i * 330 + 60, floor(i * 330 + 60) + 4, 24 + (i % 2) * 14, '#9a8a7a'); });
  return { floor };
}
// seesaw stage: warm spotlit backdrop and floor. Returns { GY, CX }
export function stage(g, t, cam, o = {}) {
  const GY = E.H * 0.84, CX = E.W / 2;
  layer(g, cam, 0.2, (g) => { g.fillStyle = linGrad(g, 0, 0, 0, GY, o.cool ? ['#2a3a6a', '#4a6aa0'] : ['#6a3a5a', '#d0786a']); g.fillRect(-E.W, -E.H, E.W * 3, GY + E.H); glow(g, CX, GY - 200, 900, '#ffe2b0', 0.45);
    for (let i = 0; i < 9; i++) { const x = CX - 1000 + i * 250; g.fillStyle = alpha('#ffffff', 0.05); g.fillRect(x, -E.H, 120, GY + E.H); } });
  layer(g, cam, 1, (g) => { g.fillStyle = linGrad(g, 0, GY, 0, E.H * 1.3, ['#8a5a4a', '#4a2a2a']); g.fillRect(-E.W * 2, GY, E.W * 5, E.H); FX.pool(g, CX, GY + 40, 700, 70, '#ffe2b0', 0.35); });
  return { GY, CX };
}
// school hallway with lockers. Returns room values
export function schoolHall(g, t, cam, o = {}) {
  const R = room(g, t, cam, { wall: '#c8d8e0', floor: '#8a8a90', window: false, mood: 'day' }), { GY, CX } = R;
  layer(g, cam, 0.62, (g) => { for (let i = -10; i < 12; i++) { const x = CX + i * 110; rr(g, x, GY - 420, 100, 390, 6); g.fillStyle = ['#3a7ab0', '#3a8ac0'][(i + 20) % 2]; g.fill(); for (let j = 0; j < 4; j++) { g.fillStyle = 'rgba(0,0,0,.25)'; g.fillRect(x + 20, GY - 400 + j * 10, 60, 4); } circle(g, x + 84, GY - 230, 6, '#d8e0e8'); }
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = radGrad(g, CX, GY - 600, 40, 1200, [alpha('#fff8e8', 0.3), alpha('#fff8e8', 0)]); g.fillRect(-E.W, -E.H, E.W * 4, E.H * 3); g.restore(); });
  return R;
}
// the staircase set: a hallway with stairs rising to the right. step(i) = [x, y] of the i-th tread's front edge
export function stairs(g, t, cam, o = {}) {
  const R = room(g, t, cam, { wall: '#e0c8a8', floor: '#a57a5a', window: false }), { GY, CX } = R, n = 9, sw = 110, sh = 62, x0 = CX - 300;
  const step = (i) => [x0 + i * sw, GY - i * sh];
  layer(g, cam, 0.9, (g) => { for (let i = 0; i < n; i++) { const [x, y] = step(i), broken = o.broken && Math.abs(i - o.broken) < 1;
    g.save(); if (broken) { g.translate(x + sw / 2, y - sh); g.rotate(0.5 * (o.breakK || 1)); g.translate(-(x + sw / 2), -(y - sh)); }
    rr(g, x, y - sh, sw + 4, 22, 4); g.fillStyle = '#b07848'; g.fill(); g.fillStyle = '#8a5a38'; g.fillRect(x, y - sh + 22, sw, sh - 22); g.restore(); }
    seg(g, [[x0 - 20, GY - 140], [x0 + n * sw, GY - n * sh - 140]], 10, '#6a4a30'); for (let i = 0; i < n; i += 2) seg(g, [[x0 + i * sw + 40, GY - i * sh - 60], [x0 + i * sw + 40, GY - i * sh - 140]], 6, '#6a4a30'); });
  return { ...R, step };
}
// house cut-away: bedroom upstairs (left), kitchen downstairs; o.hole 0..1 opens the floor under the bed. Returns { GY, MID, CX }
export function houseCut(g, t, cam, o = {}) {
  const GY = GYP() + 100, MID = GY - 430, CX = E.W / 2, night = o.night ?? true;
  layer(g, cam, 0.15, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, E.H, night ? SKIES.night : SKIES.noon); g.fillRect(-E.W, -E.H * 2, E.W * 3, E.H * 4); if (night) { FX.stars(g, t, { count: 80, area: [-E.W, -E.H, E.W * 3, E.H * 1.2] }); FX.moon(g, CX + 760, 140, 30); } });
  layer(g, cam, 1, (g) => {
    poly(g, [[CX - 820, MID - 470], [CX, MID - 700], [CX + 820, MID - 470]], '#8a4a3a'); g.fillStyle = '#7a6a6a'; g.fillRect(CX - 780, MID - 480, 1560, GY - MID + 520);
    rr(g, CX - 740, MID - 440, 1480, 400, 6); g.fillStyle = night ? '#4a4a7a' : '#a9c4d8'; g.fill(); rr(g, CX - 740, MID + 40, 1480, 400, 6); g.fillStyle = night ? '#6a5a4a' : '#e8d0a8'; g.fill();
    glow(g, CX + 380, MID + 200, 400, '#ffd28a', night ? 0.35 : 0.15); g.fillStyle = '#5a4a3e'; g.fillRect(CX - 760, MID - 40, 1520, 80);
    for (let i = 0; i < 4; i++) { rr(g, CX + 120 + i * 140, MID + 240, 120, 200, 6); g.fillStyle = '#c8b8a0'; g.fill(); } rr(g, CX + 100, MID + 220, 600, 26, 4); g.fillStyle = '#e8e0d0'; g.fill();
    if (o.hole) { const k = o.hole; g.fillStyle = night ? '#4a4a7a' : '#a9c4d8'; poly(g, [[CX - 420 - 120 * k, MID - 40], [CX - 120 + 120 * k, MID - 40], [CX - 160 + 100 * k, MID + 40], [CX - 380 - 100 * k, MID + 40]]); }
    text(g, 'BEDROOM', CX - 620, MID - 400, { size: 30, color: alpha('#ffffff', 0.7), font: FONTS.ui, weight: 900, spacing: 4, align: 'left' }); text(g, 'KITCHEN', CX - 620, MID + 80, { size: 30, color: alpha('#ffffff', 0.7), font: FONTS.ui, weight: 900, spacing: 4, align: 'left' });
  });
  return { GY, MID, CX };
}
// LAUNCH PAD at night: floodlights, launch tower, the white Atlas rocket. o.lift (px up), o.ignite 0..1. Returns { GY, CX, RX }
export function pad(g, t, cam, o = {}) {
  const GY = GYP(), CX = E.W / 2, RX = CX - 40, lift = o.lift || 0, ig = o.ignite || 0;
  layer(g, cam, 0.08, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, GY, ['#070a1e', '#141a3a', '#2a2a5a']); g.fillRect(-E.W * 2, -E.H * 2, E.W * 5, GY + E.H * 2); FX.stars(g, t, { count: 160, area: [-E.W, -E.H, E.W * 3, E.H * 0.9] }); FX.moon(g, CX + 700, 150, 34); });
  layer(g, cam, 0.4, (g) => { g.fillStyle = '#0e1226'; g.fillRect(-E.W * 2, GY - 60, E.W * 5, 70); for (let i = 0; i < 7; i++) { const x = -400 + i * 480; seg(g, [[x, GY - 50], [x, GY - 330]], 8, '#1a1e34'); glow(g, x, GY - 340, 140, '#fff2d0', 0.6); FX.lightCone(g, x, GY - 330, { angle: Math.atan2(-80, RX - x) + Math.PI / 2 + (x < RX ? -1.2 : 1.2) * 0.3 + Math.PI, spread: 0.18, len: 900, color: '#fff2d0', a: 0.1 }); } });
  layer(g, cam, 0.8, (g) => { const tx = RX + 230; for (let i = 0; i < 14; i++) { seg(g, [[tx - 60, GY - i * 60], [tx + 60, GY - i * 60 - 60]], 6, '#c84a3a'); seg(g, [[tx + 60, GY - i * 60], [tx - 60, GY - i * 60 - 60]], 6, '#c84a3a'); } seg(g, [[tx - 60, GY], [tx - 60, GY - 860]], 12, '#a83a2a'); seg(g, [[tx + 60, GY], [tx + 60, GY - 860]], 12, '#a83a2a'); circle(g, tx, GY - 880, 12, '#ff3a2a'); glow(g, tx, GY - 880, 120, '#ff3a2a', 0.5 + 0.4 * Math.sin(t * 3));
    if (lift < 20) seg(g, [[tx - 60, GY - 700], [RX + 40, GY - 700]], 14, '#8a3a2a');
    g.fillStyle = '#3a3a4a'; g.fillRect(RX - 260, GY - 40, 520, 50); });
  layer(g, cam, 0.9, (g) => { g.save(); g.translate(RX, GY - 40 - lift);
    if (ig > 0) { const fl = 1 + 0.15 * Math.sin(t * 40); glow(g, 0, 60, 500 * ig, '#ffb04a', 0.8 * ig); poly(g, [[-55, 0], [55, 0], [0, 320 * ig * fl]], alpha('#fff2a0', 0.95)); poly(g, [[-35, 0], [35, 0], [0, 200 * ig * fl]], '#ffffff'); }
    rr(g, -70, -820, 140, 820, 30); g.fillStyle = linGrad(g, -70, 0, 70, 0, ['#c8ccd6', '#ffffff', '#b8bcc6']); g.fill(); g.fillStyle = '#1e2230'; g.fillRect(-70, -560, 140, 34); g.fillRect(-70, -260, 140, 34);
    poly(g, [[-70, -820], [70, -820], [0, -980]], '#e8eaf0'); poly(g, [[-70, -120], [-140, 0], [-70, 0]], '#1e2230'); poly(g, [[70, -120], [140, 0], [70, 0]], '#1e2230');
    circle(g, 0, -700, 26, '#1e2230'); circle(g, 0, -700, 16, '#9fe0ff'); atlasLogo(g, 0, -400, 0.8, '#3FC1C9'); g.restore();
    if (ig > 0) { const r = rng(5); for (let i = 0; i < 26; i++) { const a = r() * Math.PI, d = (200 + r() * 700) * ig, x = RX + Math.cos(a) * d * (r() < 0.5 ? -1 : 1), y = GY - 10 - r() * 160 * ig; circle(g, x, y, (60 + r() * 120) * ig, alpha(mix('#f4efe6', '#c8b8b0', r()), 0.85)); } } });
  layer(g, cam, 1, (g) => { g.fillStyle = '#1a1c2a'; g.fillRect(-E.W * 2, GY, E.W * 5, E.H); FX.pool(g, RX, GY + 20, 600, 60, '#fff2d0', 0.25 + 0.5 * ig); });
  return { GY, CX, RX };
}
// CAPSULE interior: soft white walls, a round window with the Earth (o.earth true), panels; returns { CX, CY, WIN }
export function capsule(g, t, cam, o = {}) {
  const CX = E.W / 2, CY = E.H / 2, WIN = [CX + 520, CY - 140, 190];
  layer(g, cam, 0.5, (g) => { g.fillStyle = linGrad(g, 0, -E.H * 0.2, 0, E.H * 1.2, ['#dfe6ee', '#a8b4c4']); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);
    for (let i = -6; i < 8; i++) seg(g, [[CX + i * 200, -E.H], [CX + i * 200, E.H * 2]], 3, 'rgba(40,50,70,.12)');
    for (let i = 0; i < 3; i++) { rr(g, CX - 860 + i * 230, CY - 330, 200, 130, 12); g.fillStyle = '#2a3346'; g.fill(); for (let j = 0; j < 6; j++) circle(g, CX - 820 + i * 230 + (j % 3) * 50, CY - 290 + Math.floor(j / 3) * 50, 8, ['#5fd38a', '#f2c21a', '#ff5a4a', '#9fe0ff'][(i + j) % 4]); }
    const [wx, wy, wr] = WIN; circle(g, wx, wy, wr + 26, '#8a96a8'); circle(g, wx, wy, wr, '#05070f'); g.save(); g.beginPath(); g.arc(wx, wy, wr, 0, Math.PI * 2); g.clip();
    FX.stars(g, t, { count: 40, area: [wx - wr, wy - wr, wr * 2, wr * 2] });
    if (o.earth !== false) { g.fillStyle = linGrad(g, 0, wy, 0, wy + wr, ['#3a8ae0', '#1a4a9a']); g.beginPath(); g.arc(wx - 60, wy + 900 - (o.rise || 0), 960, 0, Math.PI * 2); g.fill(); glow(g, wx - 60, wy - 60 - (o.rise || 0) + 900 - 960, 240, '#9fd8ff', 0.6); g.fillStyle = alpha('#ffffff', 0.5); for (let i = 0; i < 5; i++) { g.beginPath(); g.ellipse(wx - 150 + i * 70 - t * 6 % 70, wy + 80 - (o.rise || 0) + i * 10, 60, 12, 0, 0, Math.PI * 2); g.fill(); } }
    g.restore(); glow(g, wx, wy, wr * 1.6, '#cfe8ff', 0.25); });
  layer(g, cam, 0.9, (g) => { if (o.seat !== false) { rr(g, CX - 520, CY + 160, 700, 70, 30); g.fillStyle = '#5a6478'; g.fill(); rr(g, CX - 560, CY - 40, 80, 270, 30); g.fill(); } });
  return { CX, CY, WIN };
}
// ORBIT: black space, the big Earth curving across the bottom, atmosphere glow, clouds; o.cap = [x, y] tiny capsule
export function orbit(g, t, cam, o = {}) {
  const ER = 2600, EX = E.W * 0.5, EY = E.H + ER - (o.earthTop ?? 380);
  layer(g, cam, 0.1, (g) => { g.fillStyle = '#04060e'; g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3); FX.stars(g, t, { count: 260, area: [-E.W, -E.H, E.W * 3, E.H * 2] }); FX.sun(g, E.W * 0.92, E.H * 0.18, 50, '#ffffff', '#fff2d0', 6); });
  layer(g, cam, 0.3, (g) => { glow(g, EX, EY - ER, 900, '#6ac8ff', 0.5); circle(g, EX, EY, ER + 30, alpha('#8fd8ff', 0.35));
    g.fillStyle = linGrad(g, 0, EY - ER, 0, EY - ER + 900, ['#4aa0f0', '#1a5ab0', '#0e2a6a']); g.beginPath(); g.arc(EX, EY, ER, 0, Math.PI * 2); g.fill();
    g.save(); g.beginPath(); g.arc(EX, EY, ER, 0, Math.PI * 2); g.clip(); const r = rng(8);
    for (let i = 0; i < 9; i++) { const x = ((i * 420 + t * 12) % (E.W + 800)) - 400, y = EY - ER + 60 + r() * 500; g.fillStyle = '#4a8a4a'; g.beginPath(); g.ellipse(x, y, 160 + r() * 200, 50 + r() * 60, r() - 0.5, 0, Math.PI * 2); g.fill(); }
    for (let i = 0; i < 16; i++) { const x = ((i * 260 + t * 18) % (E.W + 600)) - 300, y = EY - ER + 30 + r() * 600; g.fillStyle = alpha('#ffffff', 0.55); g.beginPath(); g.ellipse(x, y, 120 + r() * 160, 18 + r() * 20, 0, 0, Math.PI * 2); g.fill(); }
    if (o.bulge) { g.fillStyle = alpha('#9fe0ff', 0.6 * o.bulge); g.beginPath(); g.ellipse(o.cap ? o.cap[0] : EX, EY - ER, 520, 120 * o.bulge, 0, Math.PI, Math.PI * 2); g.fill(); }
    g.restore(); });
  if (o.cap) layer(g, cam, 0.8, (g) => { const [x, y] = o.cap, s = o.capS || 1; g.save(); g.translate(x, y); g.scale(s, s); poly(g, [[-40, 30], [40, 30], [24, -36], [-24, -36]], '#e8eaf0'); rr(g, -46, 30, 92, 14, 4); g.fillStyle = '#5a6478'; g.fill(); circle(g, 0, -4, 9, '#9fe0ff'); for (const sx of [-1, 1]) { rr(g, sx * 50 - (sx < 0 ? 90 : 0), -10, 90, 24, 3); g.fillStyle = '#2a4a8a'; g.fill(); } glow(g, 0, 0, 60, '#ffffff', 0.3); g.restore(); });
  return { EX, EY, ER };
}
