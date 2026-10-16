// sets/street.js — the city street: facades with lit shop windows, sidewalk, curb, bike lane, road, optional crosswalk
// and traffic light. Moods: golden (hook + Friday 4:12 p.m.), dusk (park bench), night (accidents).
// Side view: characters stand on the sidewalk (feet at GY); the road runs left-right in front of them, down to the frame bottom.
import { E, V, mood, layer, backdrop, rng, rr, seg, circle, poly, linGrad, radGrad, glow, alpha, shade, mix, text, FONTS } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import { drawFigure } from '/engine/rig2d.js';

export const streetGround = () => E.H * 0.8;
export const CURB = () => E.H * 0.8 + 40;            // front edge of the sidewalk
export const LANE = () => E.H * 0.8 + 150;           // where bikes / cars run (y of their wheels)

function building(g, x, w, base, h, M, r, o) {
  const night = o.night, wall = shade(M.wall, -0.18 - r() * 0.22), dark = shade(M.wall, -0.62);
  g.fillStyle = linGrad(g, 0, base - h, 0, base, [shade(wall, 0.05), wall, shade(wall, -0.25)]); g.fillRect(x, base - h, w, h + 2);
  g.fillStyle = shade(wall, -0.35); g.fillRect(x - 6, base - h - 14, w + 12, 16);                    // cornice
  // upper windows
  const cols = Math.max(2, Math.round(w / 120)), cw = w / cols, lit = night ? 0.55 : o.mood === 'golden' ? 0.25 : 0.4;
  for (let j = 0; j < 6; j++) for (let i = 0; i < cols; i++) {
    const wx = x + i * cw + cw * 0.22, wy = base - 330 - j * 150, ww = cw * 0.56, wh = 96; if (wy < base - h + 30) continue;
    const on = r() < lit; g.fillStyle = on ? mix(M.practical, '#fff3d6', 0.2) : shade(M.sky[M.sky.length - 1], -0.55); g.fillRect(wx, wy, ww, wh);
    if (!on && o.mood === 'golden') { g.fillStyle = alpha(M.sky[2] || M.key, 0.25); g.fillRect(wx, wy, ww * 0.4, wh); }
    g.fillStyle = dark; g.fillRect(wx + ww / 2 - 3, wy, 6, wh); g.fillRect(wx - 6, wy + wh, ww + 12, 8);
    if (on) glow(g, wx + ww / 2, wy + wh / 2, cw * 0.8, M.practical, 0.12);
  }
  // shop front
  const sh = 230, sy = base - sh, sw = w * 0.62, sx = x + w * 0.08;
  g.fillStyle = dark; g.fillRect(x, sy - 34, w, 34);                                                   // sign band
  if (o.signs) { g.fillStyle = alpha(M.practical, 0.85); g.font = '800 22px Nunito'; g.textAlign = 'center'; g.textBaseline = 'middle'; g.fillText(o.signs[Math.floor(r() * o.signs.length)], x + w / 2, sy - 17); }
  g.fillStyle = linGrad(g, 0, sy, 0, base, [mix(M.practical, '#fff1d6', 0.15), shade(M.practical, -0.35), shade(M.practical, -0.7)]); g.fillRect(sx, sy + 10, sw, sh - 30);
  g.fillStyle = alpha(dark, 0.85); for (let k = 0; k < 5; k++) g.fillRect(sx + 20 + k * (sw - 40) / 5, sy + sh - 70 - (k % 2) * 30, 26, 50 + (k % 2) * 30);  // goods / shelves
  g.fillStyle = dark; g.fillRect(sx + sw / 2 - 4, sy + 10, 8, sh - 30); g.lineWidth = 10; g.strokeStyle = dark; g.strokeRect(sx, sy + 10, sw, sh - 30);
  glow(g, sx + sw / 2, sy + sh / 2, sw * 0.8, M.practical, night ? 0.22 : 0.14);
  const dx = sx + sw + w * 0.08, dw = w * 0.16; g.fillStyle = shade(dark, 0.08); g.fillRect(dx, sy + 30, dw, sh - 30); glow(g, dx + dw / 2, sy + 80, 60, M.practical, 0.2);
  if (r() < 0.6) { const aw = sw + 40; for (let k = 0; k < aw; k += 40) { g.fillStyle = (k / 40) % 2 ? shade(M.wall, 0.25) : shade(o.awning || '#7a3a3a', -0.1); g.fillRect(sx - 20 + k, sy - 2, 40, 34); } g.fillStyle = 'rgba(0,0,0,.3)'; g.fillRect(sx - 20, sy + 28, aw, 10); }
}

export function street(g, t, cam, o = {}) {
  const md = o.mood || 'golden', M = mood(md), GY = streetGround(), CX = E.W / 2, C = CURB(), night = md === 'night';
  const r = rng(o.seed || 21);
  layer(g, cam, 0.1, (g) => {                                         // sky
    backdrop(g, M.sky);
    if (md === 'golden') { FX.sun(g, CX + 760, GY - 560, 70, '#fff3dc', M.key, 6); FX.clouds(g, { y: GY - 900, h: 260, color: '#ffe7c7', a: 0.14, seed: 4 }); }
    if (md === 'dusk') { glow(g, CX - 500, GY - 420, 900, '#ff9a6a', 0.35); FX.clouds(g, { y: GY - 860, h: 200, color: '#ffc9a8', a: 0.12, seed: 6 }); }
    if (night) { FX.stars(g, t, { count: 120, area: [-E.W, -E.H, E.W * 3, E.H * 1.4], color: '#dfe6ff' }); FX.moon(g, CX - 640, GY - 760, 34); }
  });
  layer(g, cam, 0.3, (g) => FX.skyline(g, { x: -E.W, y: GY - 120, w: E.W * 3.2, minH: 260, maxH: 620, color: mix(M.sky[1], shade(M.wall, -0.6), 0.7), windowColor: alpha(M.practical, night ? 0.7 : 0.35), lit: night ? 0.3 : 0.12, seed: 9, minW: 70, maxW: 180 }));
  layer(g, cam, 0.55, (g) => {                                        // building row
    let x = -1500; const rr2 = rng(o.seed || 21);
    while (x < E.W + 1500) { const w = 380 + rr2() * 220, h = 470 + rr2() * 360; building(g, x, w, GY - 70, h, M, rr2, { night, mood: md, signs: o.signs || ['CAFÉ', 'BOOKS', 'BAKERY', 'PHONES', 'FLOWERS', 'PIZZA'], awning: rr2() < 0.5 ? '#7a3a3a' : '#2f4f6a' }); x += w + 8; }
    if (md === 'golden') FX.godRays(g, CX + 760 - (cam.x || 0) * 0.45, GY - 560, { angle: Math.PI * 0.86, spread: 0.7, len: 2200, color: M.key, a: 0.06, t });
  });
  layer(g, cam, 0.8, (g) => {                                         // sidewalk back + trees + lamps
    g.fillStyle = shade(M.floor, -0.15); g.fillRect(-E.W * 2, GY - 72, E.W * 5, 80);
    for (let x = -1200; x < E.W + 1400; x += 760) {
      FX.tree(g, x + 120, GY - 64, 1.9, shade(M.dark, night ? -0.2 : 0));
      FX.lampPost(g, x + 480, GY - 66, 420, { color: shade(M.dark, -0.3), light: M.practical, on: md !== 'golden', a: night ? 0.18 : 0.12 });
    }
  });
  layer(g, cam, 1, (g) => {                                           // sidewalk, curb, road
    g.fillStyle = linGrad(g, 0, GY - 10, 0, C, [shade(M.floor, -0.05), shade(M.floor, -0.2)]); g.fillRect(-E.W * 2, GY - 10, E.W * 5, C - GY + 10);
    g.strokeStyle = 'rgba(0,0,0,.22)'; g.lineWidth = 2; for (let x = -E.W * 2; x < E.W * 3; x += 140) { g.beginPath(); g.moveTo(x, GY - 8); g.lineTo(x - 30, C); g.stroke(); }
    g.fillStyle = shade(M.floor, 0.18); g.fillRect(-E.W * 2, C - 6, E.W * 5, 10);                          // curb lip catches light
    g.fillStyle = shade(M.dark, -0.1); g.fillRect(-E.W * 2, C + 4, E.W * 5, 18);                            // curb face
    g.fillStyle = linGrad(g, 0, C + 20, 0, E.H + 400, [shade(M.road, -0.1), shade(M.road, -0.35)]); g.fillRect(-E.W * 2, C + 20, E.W * 5, E.H * 2);
    g.fillStyle = alpha('#e8e4dc', 0.55); g.fillRect(-E.W * 2, C + 92, E.W * 5, 6);                          // bike-lane line
    for (let x = -E.W * 2; x < E.W * 3; x += 260) { g.fillStyle = alpha('#f2d27a', 0.6); g.fillRect(x, C + 270, 130, 9); }   // centre dashes
    if (o.cross != null) crosswalk(g, o.cross, C, M);
    if (md !== 'golden') for (let x = -1200; x < E.W + 1400; x += 760) FX.pool(g, x + 520, GY + 10, 240, 26, M.practical, night ? 0.16 : 0.1);
    if (md === 'golden') { g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = linGrad(g, 0, GY - 10, 0, C + 260, [alpha(M.key, 0.08), alpha(M.key, 0)]); g.fillRect(-E.W * 2, GY - 10, E.W * 5, 300); g.restore(); }
    if (o.light) trafficLight(g, o.light.x, C - 2, o.light, M, t);
  });
  return { GY, C, CX, M, LANE: LANE() };
}
// zebra crossing running from the curb toward the camera, centred on x
export function crosswalk(g, x, C, M) {
  for (let i = 0; i < 7; i++) {
    const y0 = C + 30 + i * 70 + i * i * 6, h = 34 + i * 6, w0 = 300 + i * 26;
    g.fillStyle = alpha('#ece8e0', 0.62); g.fillRect(x - w0 / 2, y0, w0, h);
  }
}
// traffic light on a pole at the curb (state: red | yellow | green) + pedestrian signal (ped: walk | stop)
export function trafficLight(g, x, y, o, M, t = 0) {
  const ink = shade(M.dark, -0.4), h = o.h || 470;
  seg(g, [[x, y], [x, y - h]], 12, ink);
  rr(g, x - 30, y - h - 170, 60, 170, 12); g.fillStyle = ink; g.fill();
  const cols = { red: '#ff4a3a', yellow: '#ffbf3a', green: '#4aff8a' };
  ['red', 'yellow', 'green'].forEach((c, i) => { const on = o.state === c, cy = y - h - 140 + i * 52; circle(g, x, cy, 19, on ? cols[c] : shade(cols[c], -0.75)); if (on) glow(g, x, cy, 120, cols[c], 0.55); });
  if (o.ped) { rr(g, x + 14, y - 300, 46, 56, 6); g.fillStyle = ink; g.fill(); const pc = o.ped === 'walk' ? '#e8f2ff' : '#ff6a3a'; g.fillStyle = pc;
    if (o.ped === 'walk') { circle(g, x + 37, y - 288, 5, pc); seg(g, [[x + 37, y - 282], [x + 35, y - 268], [x + 30, y - 254]], 4, pc); seg(g, [[x + 35, y - 268], [x + 42, y - 254]], 4, pc); }
    else { rr(g, x + 28, y - 290, 18, 30, 5); g.fill(); }
    glow(g, x + 37, y - 272, 40, pc, 0.35); }
}
// bench for the dusk park scene
export function bench(g, x, y, s = 1, color = '#1c1620') {
  rr(g, x - 150 * s, y - 70 * s, 300 * s, 14 * s, 5 * s); g.fillStyle = color; g.fill();
  rr(g, x - 150 * s, y - 140 * s, 300 * s, 12 * s, 5 * s); g.fill(); rr(g, x - 150 * s, y - 112 * s, 300 * s, 12 * s, 5 * s); g.fill();
  for (const dx of [-120, 120]) { seg(g, [[x + dx * s, y], [x + dx * s, y - 70 * s]], 9 * s, color); seg(g, [[x + dx * s + 6 * s, y - 70 * s], [x + dx * s + 14 * s, y - 145 * s]], 8 * s, color); }
}
// bicycle with rider space; x,y = ground under the middle; phase spins the wheels
export function bike(g, x, y, s = 1, phase = 0, color = '#14111a', o = {}) {
  const R = 54 * s, wb = 108 * s, fx = x + wb, bx = x - wb, wy = y - R, ink = color, rim = o.rim;
  const wheel = (cx) => { g.strokeStyle = ink; g.lineWidth = 9 * s; g.beginPath(); g.arc(cx, wy, R, 0, Math.PI * 2); g.stroke(); for (let k = 0; k < 4; k++) { const a = phase + k * Math.PI / 4; seg(g, [[cx - Math.cos(a) * R, wy - Math.sin(a) * R], [cx + Math.cos(a) * R, wy + Math.sin(a) * R]], 2 * s, alpha(ink, 0.8)); } if (rim) { g.strokeStyle = alpha(rim, 0.8); g.lineWidth = 3 * s; g.beginPath(); g.arc(cx, wy, R + 5 * s, Math.PI * 1.05, Math.PI * 1.6); g.stroke(); } };
  wheel(bx); wheel(fx);
  const seat = [x - 20 * s, y - 150 * s], bar = [x + 72 * s, y - 165 * s], crank = [x, wy];
  seg(g, [[bx, wy], crank, seat, [bx, wy]], 8 * s, ink); seg(g, [crank, bar, seat], 8 * s, ink); seg(g, [bar, [fx, wy]], 8 * s, ink);
  seg(g, [bar, [x + 90 * s, y - 190 * s], [x + 110 * s, y - 188 * s]], 7 * s, ink); seg(g, [[seat[0] - 18 * s, seat[1]], [seat[0] + 18 * s, seat[1]]], 9 * s, ink);
  return { seat, bar, crank };
}
// delivery truck, side view, facing +x (or -x with dir -1); x,y = ground under the middle
export function truck(g, x, y, s = 1, o = {}) {
  const { dir = 1, color = '#3c3f4c', cab = '#2a2c36', lights = true, M = mood('golden'), spin = 0 } = o;
  g.save(); g.translate(x, y); g.scale(dir * s, s);
  rr(g, -360, -330, 470, 280, 10); g.fillStyle = color; g.fill();                                   // box
  g.fillStyle = shade(color, 0.12); g.fillRect(-350, -320, 450, 12); g.fillStyle = shade(color, -0.25); g.fillRect(-360, -70, 470, 22);
  rr(g, 120, -270, 190, 220, 18); g.fillStyle = cab; g.fill();                                     // cab
  rr(g, 200, -255, 92, 90, 10); g.fillStyle = mix(M.sky[1], '#9fb6d8', 0.4); g.fill(); g.fillStyle = 'rgba(255,255,255,.25)'; g.fillRect(212, -248, 20, 70);
  g.fillStyle = shade(cab, -0.3); g.fillRect(118, -60, 200, 26);
  if (lights) { rr(g, 292, -110, 22, 28, 6); g.fillStyle = '#fff6d8'; g.fill(); glow(g, 312, -96, 160, '#fff1c8', 0.8); }
  for (const wx of [-260, -150, 230]) { circle(g, wx, -40, 46, '#0c0b10'); circle(g, wx, -40, 20, '#5a5c68'); seg(g, [[wx - Math.cos(spin) * 18, -40 - Math.sin(spin) * 18], [wx + Math.cos(spin) * 18, -40 + Math.sin(spin) * 18]], 4, '#2a2a33'); }
  g.restore();
}
// cyclist pose for the rig (ground under the bike's middle = figure origin); phase turns the pedals
function ik2(a, b, L1, L2) {
  const dx = b[0] - a[0], dy = b[1] - a[1]; let d = Math.hypot(dx, dy); d = Math.min(d, L1 + L2 - 0.01);
  const ang = Math.atan2(dy, dx) - Math.acos(Math.max(-1, Math.min(1, (L1 * L1 + d * d - L2 * L2) / (2 * L1 * d))));
  return [a[0] + Math.cos(ang) * L1, a[1] + Math.sin(ang) * L1];
}
export function riderPose(phase, o = {}) {
  const hip = [-20, -160], sh = [20, -222], head = [38, -252], wave = o.wave || 0;
  const pF = [Math.cos(phase) * 30, -54 + Math.sin(phase) * 30], pB = [Math.cos(phase + Math.PI) * 30, -54 + Math.sin(phase + Math.PI) * 30];
  const kF = ik2(hip, pF, 54, 54), kB = ik2(hip, pB, 54, 54);
  const hF = wave ? [8 - 30 * wave, -300] : [90, -190], eF = wave ? [24, -268] : [56, -198];
  return { head: o.lookBack ? [30, -254] : head, sh, hip, eF, hF, eB: [52, -201], hB: [86, -192], kF, fF: [pF[0] - 6, pF[1]], kB, fB: [pB[0] - 6, pB[1]] };
}
// bike + rider in one call
export function rider(g, x, y, s, phase, o = {}) {
  bike(g, x, y, s, phase * 2, o.bikeColor || '#14111a', { rim: o.rim?.color });
  drawFigure(g, { x, y, s, facing: 1, outfit: o.outfit || { top: 'none', head: 'none' }, pose: riderPose(phase, o), expr: o.expr || 'neutral', rim: o.rim ?? false, shadow: false, talk: o.talk, look: o.look });
}
