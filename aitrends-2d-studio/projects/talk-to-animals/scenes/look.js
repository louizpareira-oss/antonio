// look.js — the "v2" character look for this video, after the user's reference videos (Oct 21): characters wear real
// clothes (a filled hoodie / sweater / T-shirt with shoulders and sleeves, trousers, sneakers), have bigger eyes with
// pupils and acting eyelids, and hair or caps. Same pose rig as the engine (POSES, posesAt, breathe), same black head
// and rim light, so every engine pose still works: person(g, { x, y, s, facing, pose, outfit, expr, look, talk, blink, rim }).
import { S, seg, circle, rr, alpha, shade, lerp, clamp } from '/engine/core.js';
import { POSES } from '/engine/rig2d.js';

const sub = (a, b) => [a[0] - b[0], a[1] - b[1]], add = (a, b) => [a[0] + b[0], a[1] + b[1]], mul = (a, k) => [a[0] * k, a[1] * k];
const norm = (v) => { const l = Math.hypot(v[0], v[1]) || 1; return [v[0] / l, v[1] / l]; };
const at = (a, b, k) => [lerp(a[0], b[0], k), lerp(a[1], b[1], k)];
const WHITE = '#f6f2ea';
const HR = 27;

// lid: how much of the eye the upper lid covers; brows: 'sad' | 'up' | 'down'; pupil: size factor
export const EXPRS = {
  neutral: { lid: 0.18, mouth: 'flat' }, smile: { lid: 0.24, mouth: 'smile' }, grin: { lid: 0.3, mouth: 'grin' },
  unimpressed: { lid: 0.55, mouth: 'flat' }, worried: { lid: 0.08, mouth: 'wavy', brows: 'sad' },
  sad: { lid: 0.38, mouth: 'frown', brows: 'sad' }, surprised: { lid: 0, mouth: 'o', brows: 'up', pupil: 0.7 },
  angry: { lid: 0.34, mouth: 'flat', brows: 'down' },
};

export function person(g, o) {
  const p = o.pose || POSES.stand, s = o.s ?? 1, f = o.facing ?? 1, of = o.outfit || {}, ink = S().ink;
  const rim = o.rim === false ? null : { dir: [-0.8, -0.5], w: 4.5, color: '#ffc68a', ...(o.rim || {}) };
  g.save(); if (o.alpha != null) g.globalAlpha *= o.alpha;
  if (o.shadow !== false) { g.fillStyle = 'rgba(0,0,0,.26)'; g.beginPath(); g.ellipse(o.x, o.y + 2, 36 * s, 6 * s, 0, 0, Math.PI * 2); g.fill(); }
  if (rim) { g.save(); g.translate(o.x + rim.dir[0] * rim.w, o.y + rim.dir[1] * rim.w); g.scale(f * s, s); parts(g, p, of, ink, rim.color); g.restore(); }
  g.save(); g.translate(o.x, o.y); g.scale(f * s, s); parts(g, p, of, ink, null); faceV2(g, p.head[0], p.head[1], HR, o); g.restore();
  g.restore();
}

function parts(g, p, of, ink, sil) {
  const C = (c) => sil || c, top = of.color || '#2E72D2', legs = of.legs || '#2a3140', shoe = of.shoes || WHITE;
  leg(g, p.hip, p.kB, p.fB, C(shade(legs, -0.28)), C(shade(shoe, -0.22)), sil);
  arm(g, p.sh, p.eB, p.hB, C(shade(top, -0.24)), C(ink), sil, of);
  leg(g, p.hip, p.kF, p.fF, C(legs), C(shoe), sil);
  torso(g, p, of, C(top), sil);
  hairBack(g, p.head, of, C(ink), C(of.capColor || top));
  circle(g, p.head[0], p.head[1], HR, C(ink));
  hairFront(g, p.head, of, C(ink), C(of.capColor || top), sil);
  arm(g, p.sh, p.eF, p.hF, C(top), C(ink), sil, of);
}

function leg(g, hip, k, ft, col, shoeCol, sil) {
  seg(g, [hip, k, [ft[0], ft[1] - 9]], 15, col);
  rr(g, ft[0] - 10, ft[1] - 13, 33, 13, 6); g.fillStyle = shoeCol; g.fill();
  if (!sil) { g.fillStyle = 'rgba(0,0,0,.22)'; g.fillRect(ft[0] - 9, ft[1] - 4, 31, 4); }
}

function arm(g, sh, e, h, col, ink, sil, of) {
  const wrist = at(e, h, 0.82);
  if (of.top === 'tshirt') { seg(g, [sh, e, h], 10, ink); if (!sil) seg(g, [sh, at(sh, e, 0.55)], 20, shade(col, -0.32)); seg(g, [sh, at(sh, e, 0.55)], 16, sil ? col : shade(col, -0.07)); }
  else { if (!sil) seg(g, [sh, e, wrist], 19, shade(col, -0.32)); seg(g, [sh, e, wrist], 15, sil ? col : shade(col, -0.07)); if (!sil) seg(g, [at(e, wrist, 0.8), wrist], 15, shade(col, -0.2)); }
  circle(g, h[0], h[1], 7.5, ink);
}

function torso(g, p, of, col, sil) {
  const d = norm(sub(p.sh, p.hip)), n = [-d[1], d[0]];                     // d: up the spine, n: toward the front
  const top = add(p.sh, mul(d, -1)), bot = add(p.hip, mul(d, -14));
  const ws = 22, wh = 20, Q = (base, k) => add(base, mul(n, k));
  const fill = (pts, c) => { g.fillStyle = c; g.strokeStyle = c; g.lineWidth = 12; g.lineJoin = 'round'; g.beginPath(); pts.forEach((q, i) => (i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]))); g.closePath(); g.fill(); g.stroke(); };
  if (of.top === 'hoodie') { g.fillStyle = sil || shade(col, -0.2); g.beginPath(); const hb = add(Q(top, -13), mul(d, 5)); g.ellipse(hb[0], hb[1], 16, 12, Math.atan2(d[1], d[0]), 0, Math.PI * 2); g.fill(); }   // hood, down
  fill([Q(top, ws), Q(top, -ws), Q(bot, -wh), Q(bot, wh)], col);
  if (sil) return;
  fill([Q(top, -ws), Q(top, -ws + 8), Q(bot, -wh + 7), Q(bot, -wh)], shade(col, -0.16));   // back-side shade
  if (of.top === 'hoodie') {
    const pc = add(at(top, bot, 0.74), mul(n, 7)); rr(g, pc[0] - 15, pc[1] - 8, 30, 15, 6); g.fillStyle = shade(col, -0.12); g.fill();   // pocket
    for (const k of [9, 15]) seg(g, [add(Q(top, k), mul(d, -4)), add(Q(top, k), mul(d, -22))], 2.2, WHITE);   // drawstrings
  }
  if (of.top === 'sweater') seg(g, [Q(bot, -wh + 4), Q(bot, wh - 2)], 6, shade(col, -0.12));   // ribbed hem
  if (of.top === 'tshirt') seg(g, [Q(top, 4), Q(top, 16)], 3, shade(col, -0.25));             // collar
}

function hairBack(g, h, of, ink, capCol) {
  if (of.hair === 'bun') { circle(g, h[0] - HR * 0.62, h[1] - HR * 0.62, HR * 0.42, ink); circle(g, h[0] - HR * 0.75, h[1] - HR * 0.15, HR * 0.5, ink); }
  if (of.hair === 'spiky' || of.hair === 'capSpiky') for (let i = 0; i < 6; i++) { const a = Math.PI * (0.95 + i * 0.16); g.fillStyle = ink; g.beginPath(); g.moveTo(h[0] + Math.cos(a - 0.2) * HR * 0.9, h[1] + Math.sin(a - 0.2) * HR * 0.9); g.lineTo(h[0] + Math.cos(a) * HR * 1.45, h[1] + Math.sin(a) * HR * 1.45); g.lineTo(h[0] + Math.cos(a + 0.2) * HR * 0.9, h[1] + Math.sin(a + 0.2) * HR * 0.9); g.fill(); }
}
function hairFront(g, h, of, ink, capCol, sil) {
  if (of.hair === 'cap' || of.hair === 'capSpiky') {
    g.fillStyle = capCol; g.beginPath(); g.arc(h[0] + 2, h[1] - 4, HR * 1.04, Math.PI * 1.02, Math.PI * 1.98); g.closePath(); g.fill();
    rr(g, h[0] + HR * 0.55, h[1] - 9, HR * 0.95, 7, 3.5); g.fill();                                   // brim
    if (!sil) { g.fillStyle = alpha('#ffffff', 0.18); g.beginPath(); g.arc(h[0] + 2, h[1] - 4, HR * 1.04, Math.PI * 1.25, Math.PI * 1.55); g.lineTo(h[0] + 2, h[1] - 4); g.fill(); }
  }
}

// eyes with pupils and lids, white brows and mouth (the head faces +x; both eyes sit on the front half)
export function faceV2(g, hx, hy, r, o = {}) {
  const ex = { ...(EXPRS[o.expr] || EXPRS.neutral) }, ink = S().ink, look = o.look || [0.6, 0];
  const eyes = [[hx + r * 0.06, 0.86], [hx + r * 0.52, 1]], ey = hy - r * 0.12, lid = o.blink ? 1 : clamp(ex.lid);
  g.save(); g.lineCap = 'round';
  for (const [x, k] of eyes) {
    const rx = r * 0.2 * k, ry = r * 0.27 * k;
    g.save(); g.beginPath(); g.ellipse(x, ey, rx, ry, 0, 0, Math.PI * 2); g.clip();
    g.fillStyle = WHITE; g.fillRect(x - rx, ey - ry, rx * 2, ry * 2);
    circle(g, x + look[0] * rx * 0.45, ey + look[1] * ry * 0.4 + ry * 0.12, r * 0.095 * k * (ex.pupil || 1), ink);
    g.fillStyle = ink; g.fillRect(x - rx - 1, ey - ry - 1, rx * 2 + 2, ry * 2 * lid + 1);              // upper lid
    g.restore();
    const by = ey - ry - r * 0.12;
    if (ex.brows === 'sad') seg(g, [[x - rx, by + r * 0.02], [x + rx, by - r * 0.08]], r * 0.07, WHITE);
    if (ex.brows === 'down') seg(g, [[x - rx, by - r * 0.06], [x + rx, by + r * 0.05]], r * 0.07, WHITE);
    if (ex.brows === 'up') { g.strokeStyle = WHITE; g.lineWidth = r * 0.065; g.beginPath(); g.arc(x, by + r * 0.12, rx * 1.1, Math.PI * 1.2, Math.PI * 1.8); g.stroke(); }
  }
  const mx = hx + r * 0.32, my = hy + r * 0.42, talk = o.talk || 0, col = WHITE;
  if (talk > 0.05) { g.fillStyle = col; g.beginPath(); g.ellipse(mx, my, r * 0.15, r * (0.05 + 0.18 * talk), 0, 0, Math.PI * 2); g.fill(); }
  else switch (ex.mouth) {
    case 'smile': g.strokeStyle = col; g.lineWidth = r * 0.085; g.beginPath(); g.arc(mx, my - r * 0.16, r * 0.2, 0.45, Math.PI - 0.45); g.stroke(); break;
    case 'grin': g.fillStyle = col; g.beginPath(); g.moveTo(mx - r * 0.24, my - r * 0.05); g.quadraticCurveTo(mx, my + r * 0.34, mx + r * 0.24, my - r * 0.05); g.closePath(); g.fill(); break;
    case 'frown': g.strokeStyle = col; g.lineWidth = r * 0.08; g.beginPath(); g.arc(mx, my + r * 0.18, r * 0.18, Math.PI + 0.55, Math.PI * 2 - 0.55); g.stroke(); break;
    case 'o': g.fillStyle = col; g.beginPath(); g.ellipse(mx, my, r * 0.09, r * 0.13, 0, 0, Math.PI * 2); g.fill(); break;
    case 'wavy': { g.strokeStyle = col; g.lineWidth = r * 0.075; g.beginPath(); for (let i = 0; i <= 12; i++) { const u = i / 12; const x = mx - r * 0.2 + u * r * 0.4, y = my + Math.sin(u * Math.PI * 2) * r * 0.05; i ? g.lineTo(x, y) : g.moveTo(x, y); } g.stroke(); break; }
    default: seg(g, [[mx - r * 0.15, my], [mx + r * 0.15, my]], r * 0.08, col);
  }
  g.restore();
}
