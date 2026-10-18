// sets/atlas.js — Project Atlas: the black van, your building at night, the mountain base (dusk / dawn), the steel test room
// with its observation glass, the visit room, the earthquake city, the rubble site (slab, ambulance).
import { E, V, S, mood, layer, backdrop, rng, rr, seg, circle, ring, poly, linGrad, radGrad, glow, alpha, shade, mix, text, FONTS, clamp, lerp } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import { drawFigure, POSES, breathe } from '/engine/rig2d.js';
import { room, table } from './home.js';
import { roadNight } from './hospital.js';
import { VOSS, ATLAS } from '../cast.js';
import { atlasLogo, cracks } from '../lib.js';

const GYP = () => E.H * 0.8;
const COLD = '#d8ecff';

// black van, side view, nose to the right; door 0..1 slides the side door open (cold light inside); y = ground
export function van(g, x, y, s = 1, o = {}) {
  const { door = 0, lights = true, inside = null } = o;
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = 'rgba(0,0,0,.4)'; g.beginPath(); g.ellipse(0, 4, 350, 18, 0, 0, Math.PI * 2); g.fill();
  if (lights) FX.lightCone(g, 318, -135, { angle: 0.08, spread: 0.32, len: 1000, color: '#fff2c8', a: 0.2 });
  poly(g, [[-320, -50], [-320, -330], [170, -330], [285, -200], [322, -180], [322, -50]], '#1c1f2a');
  g.fillStyle = 'rgba(210,225,255,.28)'; g.fillRect(-316, -330, 484, 6); g.fillRect(-316, -330, 6, 270);
  poly(g, [[182, -316], [272, -208], [182, -208]], '#3a4a66'); poly(g, [[196, -300], [222, -270], [196, -270]], alpha('#ffffff', 0.25));
  rr(g, -296, -300, 112, 80, 8); g.fillStyle = '#2a3346'; g.fill();
  const dx = -150, dw = 200;
  if (door > 0) { rr(g, dx, -305, dw, 250, 6); g.fillStyle = COLD; g.fill(); glow(g, dx + dw / 2, -180, 300, COLD, 0.55 * door); if (inside) inside(g, dx, -305, dw, 250); }
  g.save(); g.translate(-door * 170, 0); rr(g, dx, -305, dw, 250, 6); g.fillStyle = '#22252f'; g.fill(); g.strokeStyle = '#0c0d12'; g.lineWidth = 4; g.stroke();
  rr(g, dx + 12, -295, dw - 24, 76, 6); g.fillStyle = '#2a3346'; g.fill(); g.fillStyle = '#6a6f7e'; g.fillRect(dx + dw - 34, -170, 20, 8); g.restore();
  for (const wx of [-205, 205]) { circle(g, wx, -50, 54, '#0c0d12'); circle(g, wx, -50, 22, '#5a5f6e'); }
  rr(g, 306, -156, 18, 34, 5); g.fillStyle = '#fff6d0'; g.fill(); if (lights) glow(g, 318, -140, 160, '#fff2c8', 0.8);
  rr(g, -326, -170, 10, 44, 3); g.fillStyle = '#e04a3a'; g.fill(); if (lights) glow(g, -322, -148, 90, '#ff4a3a', 0.5);
  g.restore();
}
// your apartment building on the night street (door + steps at DOOR); returns roadNight's values + DOOR
export function aptNight(g, t, cam, o = {}) {
  const DOOR = E.W / 2 + (o.door ?? -260);
  const R = roadNight(g, t, cam, { building: (g, y) => {
    FX.facade(g, { x: DOOR - 620, y, w: 1240, h: 760, color: '#5a5070', win: '#ffcf8a', dark: '#262238', cols: 7, rows: 4, lit: 0.55, seed: 12 });
    rr(g, DOOR - 90, y - 250, 180, 250, 6); g.fillStyle = '#ffe2a8'; g.fill(); glow(g, DOOR, y - 140, 300, '#ffd28a', 0.45);
    for (let i = 0; i < 3; i++) { g.fillStyle = shade('#6a6070', -0.1 * i); g.fillRect(DOOR - 150 - i * 20, y - 30 + i * 12, 300 + i * 40, 14); }
    rr(g, DOOR - 50, y - 330, 100, 50, 8); g.fillStyle = '#f2ebe0'; g.fill(); text(g, '27', DOOR, y - 304, { size: 30, color: '#3a3040', font: FONTS.ui, weight: 900 });
  } });
  return { ...R, DOOR };
}
// mountain base at dusk (or dawn): huge rock face, the lit tunnel gate with the Atlas logo, the road in
export function mountain(g, t, cam, o = {}) {
  const GY = GYP(), CX = E.W / 2, dawn = !!o.dawn, TX = CX + (o.tunnel ?? 180);
  const sky = dawn ? ['#3a4a7a', '#c88a8a', '#f2b08a', '#ffe2b0'] : ['#2a2450', '#7a4a7a', '#d0786a', '#f2a46a'];
  layer(g, cam, 0.08, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, GY, sky); g.fillRect(-E.W * 2, -E.H * 2, E.W * 5, GY + E.H * 2);
    if (!dawn) FX.stars(g, t, { count: 50, area: [-E.W, -E.H, E.W * 3, E.H * 0.5] }); FX.sun(g, CX + (dawn ? -700 : 760), GY - 160, 60, '#fff2d8', '#ffc890', 5); });
  layer(g, cam, 0.2, (g) => { poly(g, [[-E.W, GY], [-200, GY - 380], [200, GY - 300], [700, GY - 420], [1300, GY - 280], [E.W * 2, GY - 360], [E.W * 2, GY]], dawn ? '#7a6a9a' : '#5a3e6e'); });
  layer(g, cam, 0.45, (g) => {
    poly(g, [[-E.W * 0.6, GY], [CX - 600, GY - 520], [CX - 320, GY - 620], [CX + 40, GY - 700], [CX + 420, GY - 580], [CX + 900, GY - 440], [E.W * 1.6, GY]], dawn ? '#5a5080' : '#4a3a62');
    poly(g, [[CX - 320, GY - 620], [CX + 40, GY - 700], [CX + 420, GY - 580], [CX + 230, GY - 600], [CX + 60, GY - 640], [CX - 130, GY - 590]], '#efe8f2');
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = linGrad(g, CX + 900, 0, CX - 200, 0, [alpha('#ffb070', 0.22), alpha('#ffb070', 0)]); g.fillRect(-E.W, GY - 1100, E.W * 3, 1100); g.restore();
    for (let i = 0; i < 14; i++) FX.pine(g, -E.W * 0.4 + i * 260 + (i % 3) * 40, GY - 20, 0.8 + (i % 4) * 0.15, '#241c34'); });
  layer(g, cam, 0.8, (g) => {
    poly(g, [[TX - 330, GY], [TX - 300, GY - 330], [TX + 300, GY - 330], [TX + 330, GY]], '#8a8698');
    g.fillStyle = '#6a6678'; g.fillRect(TX - 300, GY - 350, 600, 30);
    g.beginPath(); g.moveTo(TX - 220, GY); g.lineTo(TX - 220, GY - 170); g.arc(TX, GY - 170, 220, Math.PI, 0); g.lineTo(TX + 220, GY); g.closePath(); g.fillStyle = COLD; g.fill();
    glow(g, TX, GY - 160, 420, COLD, 0.55); FX.lightCone(g, TX, GY - 40, { angle: Math.PI / 2, spread: 1.0, len: 400, color: COLD, a: 0.14 });
    for (let i = 0; i < 6; i++) { g.fillStyle = alpha('#9ab0c8', 0.5 - i * 0.07); g.fillRect(TX - 200 + i * 28, GY - 300 + i * 40, 400 - i * 56, 4); }
    rr(g, TX - 120, GY - 440, 240, 76, 10); g.fillStyle = '#1c2230'; g.fill(); atlasLogo(g, TX - 72, GY - 402, 0.6, ATLAS); text(g, 'ATLAS', TX + 26, GY - 400, { size: 40, color: ATLAS, font: FONTS.ui, weight: 900, spacing: 3, glow: 12, glowColor: alpha(ATLAS, 0.6) });
    for (const sx of [-1, 1]) { seg(g, [[TX + sx * 460, GY], [TX + sx * 460, GY - 160]], 10, '#2a2a36'); circle(g, TX + sx * 460, GY - 166, 12, '#ff5a4a'); glow(g, TX + sx * 460, GY - 166, 70, '#ff5a4a', 0.5 + 0.4 * Math.sin(t * 4 + sx)); }
  });
  layer(g, cam, 1, (g) => { g.fillStyle = dawn ? '#5a5068' : '#3a3044'; g.fillRect(-E.W * 2, GY, E.W * 5, E.H);
    poly(g, [[TX - 220, GY], [TX + 220, GY], [TX + 900, E.H * 1.3], [TX - 900, E.H * 1.3]], dawn ? '#6a6070' : '#4a4252');
    for (let i = 0; i < 6; i++) { const y0 = GY + 30 + i * i * 14; g.fillStyle = alpha('#f2d27a', 0.6); g.fillRect(TX - 6 - i * 2, y0, 12 + i * 4, 12 + i * 6); } });
  return { GY, CX, TX };
}
// the steel test room: riveted steel walls, the observation glass (Voss behind it), a hard white spotlight over the table.
// o.voss = { expr, pose, look, k }  o.cracks 0..1 hairline cracks on the walls   o.phone = ring 0..1   o.bed = steel bed
export function steelRoom(g, t, cam, o = {}) {
  const R = room(g, t, cam, { night: true, wall: o.wall || '#8a93a4', floor: '#565c6a', window: false }), { GY, CX } = R;
  const GX = CX + (o.glassX ?? 330), GW = 600, GTop = GY - 760, GH = 360;
  layer(g, cam, 0.62, (g) => {
    for (let x = -E.W; x < E.W * 2.5; x += 240) { seg(g, [[x, R.CEIL], [x, GY - 34]], 3, 'rgba(20,24,34,.35)'); for (let y = R.CEIL + 60; y < GY - 60; y += 140) { circle(g, x + 16, y, 5, 'rgba(20,24,34,.35)'); circle(g, x - 16, y, 5, 'rgba(255,255,255,.18)'); } }
    g.fillStyle = 'rgba(255,255,255,.07)'; g.fillRect(-E.W, GY - 460, E.W * 4, 10);
    rr(g, GX - 24, GTop - 24, GW + 48, GH + 48, 10); g.fillStyle = '#3a404e'; g.fill();
    g.save(); rr(g, GX, GTop, GW, GH, 4); g.clip(); g.fillStyle = linGrad(g, 0, GTop, 0, GTop + GH, ['#1a2a3e', '#24384e']); g.fillRect(GX, GTop, GW, GH);
    for (let i = 0; i < 3; i++) { rr(g, GX + 40 + i * 190, GTop + 200, 120, 70, 4); g.fillStyle = alpha('#5fd3e0', 0.5); g.fill(); }
    if (o.voss) { const v = o.voss; drawFigure(g, { x: GX + GW * 0.5, y: GTop + GH + 120, s: 1.5, facing: -1, outfit: VOSS, pose: v.pose || breathe(POSES.holdFront, t), expr: v.expr || 'neutral', look: v.look || [-1, 0.2], rim: { color: '#9fe0ff', dir: [-1, -0.3] }, blink: (t % 3.3) > 3.15 });
      if (v.clip !== false) { rr(g, GX + GW * 0.5 - 90, GTop + GH + 120 - 1.5 * 175, 70, 96, 6); g.fillStyle = '#e8e0d0'; g.fill(); } }
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = linGrad(g, GX, GTop, GX + GW, GTop + GH, [alpha('#ffffff', 0.18), alpha('#ffffff', 0), alpha('#ffffff', 0.08), alpha('#ffffff', 0)]); g.fillRect(GX, GTop, GW, GH);
    seg(g, [[GX + 60, GTop + GH], [GX + 260, GTop]], 18, alpha('#ffffff', 0.08)); g.restore(); g.restore();
    if (o.cracks) for (let i = 0; i < 5; i++) cracks(g, CX - 900 + i * 430, GY - 300 - (i % 2) * 260, 260 + i * 30, o.cracks, { seed: 40 + i, color: 'rgba(30,30,40,.6)', w: 2.2, arms: 7, rings: 1 });
    const ph = o.phone || 0, px = CX - 720, py = GY - 470; rr(g, px - 50, py - 80, 100, 160, 10); g.fillStyle = '#2a2e3a'; g.fill(); rr(g, px - 30, py - 60, 60, 110, 20); g.fillStyle = '#4a4e5e'; g.fill();
    circle(g, px, py - 100, 14, ph > 0 && Math.sin(t * 20) > 0 ? '#ff3a2a' : '#5a1a1a'); if (ph > 0) glow(g, px, py - 100, 200, '#ff3a2a', ph * (0.5 + 0.5 * Math.sin(t * 20)));
  });
  let TY = GY - 190;
  layer(g, cam, 0.9, (g) => {
    if (o.bed) { const bx = CX + (o.bedX ?? -560); rr(g, bx - 300, GY - 100, 600, 30, 6); g.fillStyle = '#9aa2b0'; g.fill(); seg(g, [[bx - 280, GY - 74], [bx - 280, GY]], 14, '#6a7080'); seg(g, [[bx + 280, GY - 74], [bx + 280, GY]], 14, '#6a7080'); rr(g, bx - 290, GY - 124, 580, 28, 10); g.fillStyle = '#c8ccd4'; g.fill(); rr(g, bx + 160, GY - 150, 120, 30, 12); g.fillStyle = '#e8ecf2'; g.fill(); }
    if (o.table !== false) TY = table(g, CX + (o.tableX ?? -120), GY, { w: 600, h: 150, color: '#5a606e', top: '#a8b0bc' });
    FX.pool(g, CX + (o.tableX ?? -120), GY + 30, 520, 70, COLD, 0.28);
  });
  layer(g, cam, 0.95, (g) => { const lx = CX + (o.tableX ?? -120); rr(g, lx - 90, R.CEIL - 10, 180, 40, 6); g.fillStyle = '#2a2e3a'; g.fill(); glow(g, lx, R.CEIL + 30, 200, COLD, 0.8);
    FX.lightCone(g, lx, R.CEIL + 30, { angle: Math.PI / 2, spread: 0.42, len: 980, color: COLD, a: 0.2 }); });
  return { ...R, TY, TX: CX + (o.tableX ?? -120), GLASS: { x: GX, y: GTop, w: GW, h: GH } };
}
// visit room: pale walls, a thick glass wall at x = GL with a ledge on both sides; draw glassWall() after the people
export function visitRoom(g, t, cam, o = {}) {
  const R = room(g, t, cam, { wall: '#b8c4cc', floor: '#7a7e88', window: false, mood: 'day' }), { GY, CX } = R;
  layer(g, cam, 0.62, (g) => { g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = radGrad(g, CX, GY - 700, 40, 1100, [alpha('#fff2d8', 0.25), alpha('#fff2d8', 0)]); g.fillRect(-E.W, -E.H, E.W * 4, E.H * 3); g.restore();
    rr(g, CX + 420, GY - 700, 140, 90, 8); g.fillStyle = '#f2ebe0'; g.fill(); text(g, 'SUN', CX + 490, GY - 655, { size: 38, color: '#c8743a', font: FONTS.ui, weight: 900, spacing: 3 }); });
  return { ...R, GL: CX + (o.glass ?? 0) };
}
export function glassWall(g, cam, x, GY) {
  layer(g, cam, 0.92, (g) => { g.fillStyle = '#8a8e98'; g.fillRect(x - 320, GY - 300, 640, 22); g.fillStyle = '#6a6e78'; g.fillRect(x - 320, GY - 278, 640, 10);
    rr(g, x - 40, GY - 920, 80, 920, 4); g.fillStyle = alpha('#cfe8ff', 0.38); g.fill(); g.strokeStyle = '#e8f4ff'; g.lineWidth = 6; g.stroke();
    seg(g, [[x - 18, GY - 880], [x - 18, GY - 40]], 6, alpha('#ffffff', 0.6)); seg(g, [[x + 12, GY - 700], [x + 12, GY - 500]], 4, alpha('#ffffff', 0.45));
    g.fillStyle = '#5a5e68'; g.fillRect(x - 60, GY - 940, 120, 30); });
}
// earthquake city at night: shaking skyline, tilting towers, dust clouds, sirens. o.q = shake amount 0..1
export function cityQuake(g, t, cam, o = {}) {
  const GY = GYP(), CX = E.W / 2, q = o.q ?? 1, M = mood('night');
  layer(g, cam, 0.08, (g) => { backdrop(g, ['#1a1430', '#4a2440', '#a0503a']); glow(g, CX, GY, 900, '#ff7a3a', 0.35); });
  layer(g, cam, 0.3, (g) => { g.save(); g.translate(Math.sin(t * 31) * 8 * q, 0); FX.skyline(g, { x: -E.W, y: GY - 40, w: E.W * 3, minH: 220, maxH: 560, color: '#2a1e3a', windowColor: '#ffcf8a', lit: 0.25, seed: 51 }); g.restore(); });
  layer(g, cam, 0.6, (g) => { const r = rng(9);
    for (let i = 0; i < 7; i++) { const x = -200 + i * 360, h = 380 + r() * 360, tilt = (i % 3 === 1 ? 0.12 : 0.03) * q * Math.sin(t * 9 + i) + (i === 3 ? 0.16 * q : 0);
      g.save(); g.translate(x, GY); g.rotate(tilt); FX.facade(g, { x: -120, y: 0, w: 240, h, color: '#3a2e4a', win: '#ffcf8a', dark: '#1a1424', cols: 3, rows: Math.floor(h / 110), lit: 0.4, seed: 60 + i }); g.restore(); }
    for (let i = 0; i < 9; i++) { const rr2 = rng(70 + i), x = -300 + i * 300, y = GY - 60 - rr2() * 80, s = 120 + rr2() * 140 + 30 * Math.sin(t * 2 + i); circle(g, x + t * 20, y, s, alpha('#8a7a7a', 0.35 * q)); } });
  layer(g, cam, 1, (g) => { g.fillStyle = '#1e1a28'; g.fillRect(-E.W * 2, GY, E.W * 5, E.H); for (let i = 0; i < 4; i++) { const ph = Math.sin(t * 8 + i * 1.7) > 0; glow(g, CX - 700 + i * 470, GY + 20, 260, ph ? '#ff3a3a' : '#3a6aff', 0.5); } });
  return { GY, CX, M };
}
// a concrete slab: x,y = centre of its underside; rot tilts it; rebar sticks out of the ends
export function slab(g, x, y, w, h, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot);
  for (let i = 0; i < 6; i++) { seg(g, [[-w / 2 - 40 - (i % 3) * 16, -h * (0.2 + i * 0.12)], [-w / 2 + 10, -h * (0.2 + i * 0.12)]], 6, '#7a4a3a'); seg(g, [[w / 2 - 10, -h * (0.15 + i * 0.13)], [w / 2 + 30 + (i % 2) * 24, -h * (0.15 + i * 0.13) - 10]], 6, '#7a4a3a'); }
  g.fillStyle = linGrad(g, 0, -h, 0, 0, ['#a8a4a0', '#7e7a78']); g.fillRect(-w / 2, -h, w, h); g.fillStyle = 'rgba(255,255,255,.14)'; g.fillRect(-w / 2, -h, w, 8);
  const r = rng(13); g.fillStyle = 'rgba(40,36,40,.25)'; for (let i = 0; i < 40; i++) circle(g, -w / 2 + r() * w, -h + r() * h, 3 + r() * 6);
  g.strokeStyle = 'rgba(30,26,30,.5)'; g.lineWidth = 3; g.beginPath(); g.moveTo(-w * 0.2, -h); g.lineTo(-w * 0.15, -h * 0.5); g.lineTo(-w * 0.22, 0); g.stroke();
  g.restore();
}
// rubble site at night: emergency lights, broken building shell, debris pile; returns { GY, CX }
export function rubble(g, t, cam, o = {}) {
  const GY = GYP(), CX = E.W / 2;
  layer(g, cam, 0.08, (g) => { backdrop(g, o.dawn ? ['#4a5a8a', '#c88a8a', '#f2b08a', '#ffe2b0'] : ['#14122a', '#2e2244', '#6a3a4a']); if (o.dawn) FX.sun(g, CX + 600, GY - 260, 70, '#fff2d8', '#ffc890', 5); else FX.stars(g, t, { count: 60, area: [-E.W, -E.H, E.W * 3, E.H * 0.6] }); });
  layer(g, cam, 0.35, (g) => FX.skyline(g, { x: -E.W, y: GY - 40, w: E.W * 3, minH: 160, maxH: 380, color: '#1e1a30', windowColor: '#ffcf8a', lit: 0.12, seed: 77 }));
  layer(g, cam, 0.6, (g) => { poly(g, [[CX - 760, GY], [CX - 760, GY - 520], [CX - 560, GY - 600], [CX - 420, GY - 380], [CX - 200, GY - 460], [CX + 60, GY - 300], [CX + 300, GY - 420], [CX + 520, GY - 260], [CX + 760, GY - 340], [CX + 760, GY]], '#4a4250');
    const r = rng(17); for (let i = 0; i < 14; i++) { rr(g, CX - 700 + r() * 1400, GY - 420 + r() * 280, 50, 60, 3); g.fillStyle = r() < 0.3 ? '#ffcf8a' : '#241e2c'; g.fill(); }
    for (let i = 0; i < 4; i++) { const ph = Math.sin(t * 7 + i * 1.9) > 0; glow(g, CX - 900 + i * 600, GY - 200, 500, ph ? '#ff3a3a' : '#3a6aff', 0.35); }
    for (const sx of [-1, 1]) { const lx = CX + sx * 900, ly = GY - 640; seg(g, [[lx, GY], [lx, ly]], 12, '#2a2632'); rr(g, lx - 60, ly - 30, 120, 50, 8); g.fillStyle = '#fff6e0'; g.fill(); glow(g, lx, ly, 260, '#fff2d0', 0.8);
      FX.lightCone(g, lx, ly + 20, { angle: Math.PI / 2 - sx * 0.55, spread: 0.5, len: 1300, color: '#fff2d0', a: 0.16 }); }
    g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = radGrad(g, CX, GY - 300, 60, 900, [alpha('#ffe7c0', 0.22), alpha('#ffe7c0', 0)]); g.fillRect(-E.W, -E.H, E.W * 4, E.H * 3); g.restore(); });
  layer(g, cam, 0.85, (g) => { const r = rng(23); for (let i = 0; i < 30; i++) { const x = CX - 900 + r() * 1800, w = 60 + r() * 160; g.save(); g.translate(x, GY - r() * 140); g.rotate((r() - 0.5) * 1.2); g.fillStyle = shade('#8a8488', -r() * 0.4); g.fillRect(-w / 2, -30, w, 60); g.restore(); }
    FX.fog(g, GY - 200, 300, '#c8b8b0', 0.18); });
  layer(g, cam, 1, (g) => { g.fillStyle = '#2a2430'; g.fillRect(-E.W * 2, GY, E.W * 5, E.H); });
  FX.dust(g, t, { count: 40, color: '#e8d8c8', a: 0.35, speed: 8 });
  return { GY, CX };
}
// ambulance side view (nose right), flashing light bar; y = ground
export function ambulance(g, x, y, s = 1, t = 0) {
  g.save(); g.translate(x, y); g.scale(s, s);
  rr(g, -320, -320, 470, 270, 14); g.fillStyle = '#f2f0ea'; g.fill(); poly(g, [[150, -260], [260, -260], [320, -170], [320, -50], [150, -50]], '#f2f0ea');
  g.fillStyle = '#d63a2a'; g.fillRect(-320, -170, 640, 30); poly(g, [[170, -250], [250, -250], [300, -175], [170, -175]], '#3a4a66');
  const c = [[-260, -205], [-260, -245], [-220, -245], [-220, -285], [-180, -285], [-180, -245], [-140, -245], [-140, -205], [-180, -205], [-180, -165], [-220, -165], [-220, -205]]; poly(g, c.map(([a, b]) => [a + 60, b - 10]), '#d63a2a');
  for (const [lx, col] of [[-120, '#ff3a3a'], [-40, '#3a6aff']]) { rr(g, lx - 30, -340, 60, 22, 6); g.fillStyle = col; g.fill(); if (Math.sin(t * 9 + lx) > 0) glow(g, lx, -330, 260, col, 0.7); }
  for (const wx of [-200, 210]) { circle(g, wx, -50, 50, '#14161e'); circle(g, wx, -50, 20, '#8a8e98'); }
  g.restore();
}
