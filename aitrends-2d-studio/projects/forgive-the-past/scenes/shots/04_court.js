// shots/04_court.js — act 3: the lawyer in the empty courtroom, the evidence wall, the cobwebbed gavel, HIM moving on and
// sleeping fine, the judge's bench with the gift, HERO looking up at the empty chair.
import { E, V, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, rng, wordTime, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { courtroom, courtGround, benchGeom, counselTable, pew } from '../sets/courtroom.js';
import { HERO, HIM } from '../cast.js';
import { backView } from '../lib.js';

// s16 — "Because you've been a lawyer for years now —"  establishing: alone at the prosecution table
registerShot('s16', { draw(g, t, info) {
  const k = ease.inOut(t / info.dur), cam = { z: 1.02 + 0.06 * k, y: V(-20, 40) - 20 * k };
  const { GY, M } = courtroom(g, t, cam);
  const s = V(1.25, 1.35), tx = E.W / 2 + V(120, 90);
  layer(g, cam, 1, (g) => {
    counselTable(g, tx, GY + V(90, 120), s, M, 5);
    drawFigure(g, { x: tx - V(170, 150), y: GY + V(90, 120), s, facing: 1, outfit: HERO, pose: breathe(posesAt(t, [[0, 'holdFront'], [0.9, { ...POSES.holdFront, hF: [44, -150], hB: [36, -146] }], [1.5, 'holdFront']], 0.3), t), prop: { type: 'paper', hand: 'F' }, expr: 'determined', rim: { color: M.rim, dir: [-0.4, -1] } });
  });
  blurLayer(g, 10, (g) => { pew(g, -60, GY + V(520, 720), E.W * 0.55, V(2.4, 2.6), M); pew(g, E.W * 0.62, GY + V(520, 720), E.W * 0.6, V(2.4, 2.6), M); }, cam, 1.6);
  FX.dust(g, t, { count: 50, color: '#dfe6ff', a: 0.3, speed: 6 });
} });

// s17 — "collecting evidence for a trial"  the evidence wall: photos, papers, red string; he pins one more
function evidenceWall(g, t, M) {
  const r = rng(31);
  g.fillStyle = linGrad(g, 0, -E.H, 0, E.H * 2, [shade('#5a4636', -0.5), shade('#4a3a2c', -0.45)]); g.fillRect(-E.W, -E.H, E.W * 3, E.H * 3);   // cork
  const items = [];
  for (let i = 0; i < 46; i++) items.push({ x: -E.W * 0.2 + r() * E.W * 1.4, y: -E.H * 0.35 + r() * E.H * 1.3, w: 70 + r() * 90, h: 60 + r() * 100, rot: (r() - 0.5) * 0.25, kind: r() < 0.55 ? 'photo' : 'paper' });
  for (let i = 0; i < 26; i++) { const a = items[i], b = items[(i * 7 + 3) % items.length]; seg(g, [[a.x, a.y], [b.x, b.y]], 3, alpha('#c8323a', 0.85)); }
  for (const it of items) {
    g.save(); g.translate(it.x, it.y); g.rotate(it.rot);
    g.fillStyle = it.kind === 'photo' ? '#e8e2d4' : '#d8d0b8'; g.fillRect(-it.w / 2, -it.h / 2, it.w, it.h);
    if (it.kind === 'photo') { g.fillStyle = '#2a2a38'; g.fillRect(-it.w / 2 + 7, -it.h / 2 + 7, it.w - 14, it.h - 24); circle(g, 0, -it.h * 0.12, Math.min(it.w, it.h) * 0.16, '#5a5a70'); g.fillStyle = '#5a5a70'; g.fillRect(-it.w * 0.18, it.h * 0.02, it.w * 0.36, it.h * 0.2); }
    else for (let l = 0; l < 5; l++) { g.fillStyle = 'rgba(40,30,20,.35)'; g.fillRect(-it.w / 2 + 8, -it.h / 2 + 10 + l * 12, it.w - 16, 3); }
    circle(g, 0, -it.h / 2 + 6, 6, '#c8323a'); g.restore();
  }
}
registerShot('s17', { draw(g, t, info) {
  const M = mood('interiorCool'), k = ease.inOut(t / info.dur), cam = { z: 1.08, y: lerp(160, -120, k), x: -20 * k };
  layer(g, cam, 0.7, (g) => { evidenceWall(g, t, M); glow(g, E.W * 0.35, E.H * 0.3, E.W * 0.7, '#dfe6ff', 0.18); });
  const pin = ease.out(prog(t, 0.2, 0.6)), px = E.W * 0.58, py = E.H * 0.42;
  layer(g, cam, 0.7, (g) => { g.save(); g.translate(px, lerp(py + 90, py, pin)); g.rotate(-0.06); g.fillStyle = '#efe9da'; g.fillRect(-70, -60, 140, 120); g.fillStyle = '#2a2a38'; g.fillRect(-60, -50, 120, 90); circle(g, 0, -14, 20, '#7a6a5a'); g.restore(); if (t > 0.55) { circle(g, px, py - 54, 8, '#c8323a'); seg(g, [[px, py - 54], [px - 380, py + 260]], 3, alpha('#c8323a', 0.9 * prog(t, 0.6, 0.9))); } });
  layer(g, cam, 1, (g) => drawFigure(g, { x: E.W * V(0.86, 0.9), y: E.H * V(1.15, 1.0), s: V(2.6, 2.7), facing: -1, outfit: HERO, pose: posesAt(t, [[0, 'reach'], [0.6, 'point']], 0.25), expr: 'determined', rim: { color: '#dfe6ff', dir: [-1, -0.4] }, shadow: false }));
  FX.dust(g, t, { count: 30, color: '#dfe6ff', a: 0.25, speed: 8 });
} });

// s18 — "that is never going to happen."  the gavel lies on a dusty block, a cobweb strung from it
registerShot('s18', { draw(g, t, info) {
  const M = mood('interiorCool'), k = ease.inOut(t / info.dur);
  blurLayer(g, 16, (g) => courtroom(g, t, { z: 1.8, y: -380, x: 120 })); veil(g, '#05060e', 0.35);
  const cam = { z: 1.0 + 0.12 * k, x: 20 * k };
  layer(g, cam, 1, (g) => {
    const ty = E.H * V(0.62, 0.62);
    g.fillStyle = linGrad(g, 0, ty, 0, E.H, [shade(M.wall, 0.1), shade(M.wall, -0.5)]); g.fillRect(-E.W, ty, E.W * 3, E.H);       // bench top
    g.fillStyle = alpha('#dfe6ff', 0.14); g.fillRect(-E.W, ty, E.W * 3, 4);
    const bx = E.W * 0.5, by = ty - 6;
    rr(g, bx - 120, by - 44, 240, 50, 14); g.fillStyle = shade(M.wall, -0.4); g.fill();                                              // sound block
    g.save(); g.translate(bx + 10, by - 70); g.rotate(-0.12);
    rr(g, -20, -16, 340, 32, 14); g.fillStyle = shade('#6a4a34', -0.25); g.fill();                                                  // handle
    rr(g, -130, -54, 130, 108, 20); g.fillStyle = shade('#6a4a34', -0.1); g.fill(); g.fillStyle = shade('#6a4a34', -0.35); g.fillRect(-120, -54, 14, 108); g.fillRect(-26, -54, 14, 108);
    g.restore();
    // dust layer + cobweb from the gavel head to the bench edge and up into the air
    g.fillStyle = 'rgba(220,226,240,.08)'; g.fillRect(-E.W, ty, E.W * 3, 10);
    const cx = bx - 80, cy = by - 120, sway = Math.sin(t * 1.3) * 4;
    const anchors = [[cx - 300, ty + 4], [cx - 240, cy - 220], [cx + 40, cy - 300], [cx - 60, ty - 4]];
    g.strokeStyle = 'rgba(230,236,255,.35)'; g.lineWidth = 1.6;
    for (const [ax, ay] of anchors) { g.beginPath(); g.moveTo(cx, cy); g.quadraticCurveTo((cx + ax) / 2 + sway, (cy + ay) / 2 + 20, ax, ay); g.stroke(); }
    for (let ring2 = 1; ring2 <= 5; ring2++) { g.beginPath(); anchors.forEach(([ax, ay], i) => { const u = ring2 / 6, x = lerp(cx, ax, u) + sway * u, y = lerp(cy, ay, u) + 10 * u; i ? g.lineTo(x, y) : g.moveTo(x, y); }); g.stroke(); }
    FX.godRays(g, E.W * 0.95, -100, { angle: Math.PI / 2 + 0.5, spread: 0.25, len: E.H * 1.2, color: '#dfe6ff', a: 0.08, count: 4, t });
  });
  FX.dust(g, t, { count: 60, color: '#dfe6ff', a: 0.4, speed: 4 });
} });

// s19 — "They moved on."  golden street: HIM walks on, easy stride
registerShot('s19', { draw(g, t, info) {
  const M = mood('golden'), GY = E.H * V(0.8, 0.68), x = E.W * 0.42 + t * 60, cam = { x: t * 50, z: 1.06 };
  layer(g, cam, 0.15, (g) => { g.fillStyle = linGrad(g, 0, -E.H, 0, GY, M.sky); g.fillRect(-E.W, -E.H, E.W * 3, GY + E.H); FX.sun(g, E.W * 0.78, GY - V(420, 640), 60, '#fff3dc', M.key, 5); });
  layer(g, cam, 0.4, (g) => { for (let i = 0; i < 7; i++) FX.facade(g, { x: -400 + i * 330, y: GY, w: 300, h: V(420, 700) + (i % 3) * 120, color: mix(M.wall, M.sky[0], 0.3), win: M.practical, lit: 0.35, seed: 40 + i, cols: 3, rows: 5 }); });
  layer(g, cam, 0.85, (g) => { g.fillStyle = linGrad(g, 0, GY, 0, E.H, [shade(M.road, 0.1), shade(M.dark, -0.2)]); g.fillRect(-E.W, GY, E.W * 3, E.H); for (const tx of [-320, 980, 1700]) FX.tree(g, tx, GY, V(1.4, 1.7), shade(M.wall, -0.5)); FX.pool(g, E.W * 0.5, GY + 30, 600, 40, M.key, 0.2); });
  layer(g, cam, 1, (g) => drawFigure(g, { x, y: GY, s: V(1.6, 1.8), facing: 1, outfit: HIM, pose: walkPose(t * Math.PI * 2 * 0.9), expr: 'neutral', rim: { color: M.rim, dir: [1, -0.3] } }));
  FX.lensStreak(g, E.W * 0.78, GY - V(420, 640), E.W * 1.4, '#ffe0b0', 0.25);
  FX.dust(g, t, { count: 30, color: '#ffe2bd', a: 0.35 });
} });

// s20 — "They sleep fine."  another city, warm lamp: HIM asleep, peaceful
registerShot('s20', { draw(g, t, info) {
  const M = mood('interiorWarm'), GY = E.H * V(0.8, 0.68), k = ease.inOut(t / info.dur), cam = { z: 1.15 + 0.06 * k, x: -30 * k, y: 20 };
  layer(g, cam, 0.5, (g) => {
    g.fillStyle = linGrad(g, 0, -E.H, 0, GY, [shade(M.wall, -0.4), M.wall, shade(M.wall, -0.2)]); g.fillRect(-E.W, -E.H, E.W * 3, GY + E.H);
    const wx = E.W / 2 - V(180, 170), wy = GY - V(560, 820), ww = V(360, 340), wh = V(260, 340);
    FX.windowFrame(g, { x: wx, y: wy, w: ww, h: wh, cols: 2, rows: 1, frame: shade(M.wall, -0.5), bar: 10 }, (gg, x, y, w, h) => { gg.fillStyle = linGrad(gg, 0, y, 0, y + h, ['#1d2550', '#3a3570', '#6a4a6a']); gg.fillRect(x, y, w, h); FX.skyline(gg, { x, y: y + h, w, maxH: h * 0.6, color: '#1a1830', windowColor: '#ffd28a', lit: 0.4, seed: 51 }); });
  });
  layer(g, cam, 0.85, (g) => { g.fillStyle = linGrad(g, 0, GY, 0, E.H, [M.floor, M.dark]); g.fillRect(-E.W, GY, E.W * 3, E.H); });
  layer(g, cam, 1, (g) => {
    const s = V(1.5, 1.6), bx = E.W / 2 - V(380, 370), bw = V(700, 640), top = GY - 96 * s;
    rr(g, bx - 16 * s, GY - 190 * s, 26 * s, 190 * s, 8 * s); g.fillStyle = shade(M.wall, -0.55); g.fill(); g.fillStyle = shade(M.wall, -0.5); g.fillRect(bx, GY - 70 * s, bw, 70 * s);
    rr(g, bx + 14 * s, GY - 124 * s, 100 * s, 32 * s, 13 * s); g.fillStyle = '#efe6dc'; g.fill();
    rr(g, bx + 4 * s, GY - 98 * s, bw - 4 * s, 34 * s, 12 * s); g.fillStyle = '#d8c8b8'; g.fill();                       // mattress
    const hx = bx + 66 * s, hy = GY - 146 * s, hr = 26 * s, br = Math.sin(t * 2.4);
    g.save(); g.translate(hx, hy); g.rotate(-1.35); circle(g, 4, 0, hr + 4, alpha(M.rim, 0.8)); circle(g, 0, 0, hr, '#0e0b12'); g.restore();
    g.strokeStyle = '#f4efe6'; g.lineWidth = 4; g.lineCap = 'round'; for (const dy of [-6, 8]) { g.beginPath(); g.arc(hx + 8 * s, hy + dy * s - 6, 6 * s, 0.2, Math.PI - 0.2); g.stroke(); }   // closed eyes
    g.beginPath(); g.arc(hx + 16 * s, hy - 2, 9 * s, -0.6, 0.6); g.stroke();                                                    // calm smile
    const bt = GY - 128 * s - br * 3 * s;
    g.fillStyle = linGrad(g, 0, bt, 0, GY - 60 * s, ['#d07050', '#8a4030']); g.beginPath(); g.moveTo(bx + 96 * s, GY - 64 * s); g.lineTo(bx + 96 * s, bt + 18 * s);
    g.quadraticCurveTo(bx + 130 * s, bt - 4 * s, bx + 260 * s, bt + 2 * s); g.quadraticCurveTo(bx + 420 * s, bt + 20 * s, bx + bw, bt + 26 * s); g.lineTo(bx + bw + 6 * s, GY - 64 * s); g.closePath(); g.fill();
    g.fillStyle = alpha('#ffd28a', 0.25); g.fillRect(bx + 120 * s, bt + 2 * s, bw - 140 * s, 3 * s);
    seg(g, [[bx + 120 * s, bt + 16 * s], [bx + 210 * s, bt + 26 * s], [bx + 250 * s, bt + 10 * s]], 14 * s, HIM.color);           // arm over the blanket
    const lx = bx + bw + V(110, 110); rr(g, lx - 60, GY - 150, 120, 150, 8); g.fillStyle = shade(M.wall, -0.5); g.fill();
    poly(g, [[lx - 46, GY - 300], [lx + 46, GY - 300], [lx + 60, GY - 230], [lx - 60, GY - 230]], '#ffd28a'); seg(g, [[lx, GY - 230], [lx, GY - 150]], 8, shade(M.wall, -0.6));
    glow(g, lx, GY - 260, 380, '#ffd28a', 0.55); FX.pool(g, lx - 200, GY - 60, 420, 60, '#ffd28a', 0.25);
  });
  FX.dust(g, t, { count: 24, color: '#ffe2bd', a: 0.3, speed: 4 });
} });

// s22 — "Forgiving the past is not a gift you give them."  the empty judge's bench looms; a small gift before it, ribbon slipping
registerShot('s22', { draw(g, t, info) {
  const k = ease.inOut(t / info.dur), B = benchGeom(), cam = { z: lerp(1.2, 1.12, k), y: lerp(70, 100, k) };
  const { GY, M } = courtroom(g, t, cam);
  layer(g, cam, 1, (g) => {
    const gx = E.W / 2, gy = GY + V(120, 140), gs = V(1.3, 1.6), un = ease.inOut(prog(t, 1.4, 3.2));
    FX.pool(g, gx, gy, 220 * gs, 40 * gs, '#dfe6ff', 0.3);
    rr(g, gx - 80 * gs, gy - 120 * gs, 160 * gs, 120 * gs, 8 * gs); g.fillStyle = '#7a2a34'; g.fill();
    rr(g, gx - 88 * gs, gy - 150 * gs, 176 * gs, 36 * gs, 8 * gs); g.fillStyle = '#8a3440'; g.fill();
    g.fillStyle = '#e0b04a'; g.fillRect(gx - 9 * gs, gy - 150 * gs, 18 * gs, 150 * gs); g.fillRect(gx - 88 * gs, gy - 82 * gs, 176 * gs, 14 * gs);
    const lp = lerp(1, 0.15, un);
    g.strokeStyle = '#e0b04a'; g.lineWidth = 10 * gs; for (const sx of [-1, 1]) { g.beginPath(); g.ellipse(gx + sx * 34 * gs * lp, gy - 168 * gs, 34 * gs * lp + 4, 20 * gs * lp + 4, sx * 0.4, 0, Math.PI * 2); g.stroke(); }
    seg(g, [[gx, gy - 150 * gs], [gx + 60 * gs + un * 120 * gs, gy - 110 * gs + un * 100 * gs]], 9 * gs, '#e0b04a');
    g.fillStyle = 'rgba(220,226,240,.12)'; g.fillRect(gx - 88 * gs, gy - 150 * gs, 176 * gs, 5);
  });
  FX.dust(g, t, { count: 50, color: '#dfe6ff', a: 0.32, speed: 5 });
} });

// s25 — "You were never the judge."  from behind: HERO small at the bottom, looking up at the empty chair
registerShot('s25', { draw(g, t, info) {
  const k = ease.inOut(t / info.dur), cam = { z: lerp(1.28, 1.42, k), y: lerp(-40, -80, k) };
  const { GY, M } = courtroom(g, t, cam);
  const B = benchGeom(); layer(g, cam, 0.62, (g) => glow(g, E.W / 2, B.chairTop + 120, 260, '#dfe6ff', 0.2 + 0.15 * k));
  layer(g, cam, 1, (g) => backView(g, { x: E.W / 2 - 20, y: GY + V(120, 140), s: V(1.8, 2.0), facing: 1, outfit: HERO, pose: breathe({ ...POSES.stand, head: [-2, -212] }, t, 0.4), rim: { color: '#dfe6ff', dir: [0, -1], w: 5 } }));
  FX.dust(g, t, { count: 60, color: '#dfe6ff', a: 0.35, speed: 4 });
} });
