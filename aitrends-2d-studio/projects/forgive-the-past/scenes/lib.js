// lib.js — small helpers shared by the shots of this video (back views, hands, desaturation, replay glitch).
import { E, V, S, clamp, lerp, rng, seg, circle, rr, poly, alpha, shade, mix, linGrad, glow } from '/engine/core.js';
import { drawFigure, headPos, walkPose, bigFace } from '/engine/rig2d.js';

// a figure seen from behind: draw it, then cover the face with the head ink (rim stays visible)
export function backView(g, o) {
  drawFigure(g, o);
  const [hx, hy, r] = headPos(o);
  circle(g, hx, hy, r + 0.6, o.ink || S().ink);
}
// walking straight away from (or toward) the camera: feet lift in place, small arm swing
export const walkAway = (phase) => walkPose(phase, { stride: 5, lift: 12, bob: 3, arm: 6, lean: 0 });

// whole-frame desaturation (k = 0..1), then an optional cold tint
export function desaturate(g, k = 1, tint = null, ta = 0.12) {
  g.save(); g.setTransform(1, 0, 0, 1, 0, 0);
  g.globalCompositeOperation = 'saturation'; g.fillStyle = `rgba(128,128,128,${clamp(k)})`; g.fillRect(0, 0, g.canvas.width, g.canvas.height);
  if (tint) { g.globalCompositeOperation = 'soft-light'; g.fillStyle = alpha(tint, ta); g.fillRect(0, 0, g.canvas.width, g.canvas.height); }
  g.restore();
}
// VHS-style replay glitch: rolling scan lines + a few offset tear bands (amount 0..1)
export function replayGlitch(g, t, amount = 1, seed = 3) {
  if (amount <= 0) return;
  g.save();
  g.fillStyle = `rgba(0,0,0,${0.16 * amount})`;
  for (let y = (t * 140) % 6; y < E.H; y += 6) g.fillRect(0, y, E.W, 2);
  const r = rng(seed + Math.floor(t * 12));
  g.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 3; i++) { const y = r() * E.H, h = 8 + r() * 40; g.fillStyle = `rgba(200,220,255,${0.05 * amount})`; g.fillRect(0, y, E.W, h); }
  g.restore();
}

// stylised hand (insert close-ups): thick ink capsules + a sleeve coming in from `from` = [x, y]
export function hand(g, x, y, s, o = {}) {
  const { from = [E.W + 300, y + 300 * s], sleeve = '#2c2833', ink = S().ink, open = 1, rim = null, cuff = null } = o;
  const ang = Math.atan2(y - from[1], x - from[0]);
  const draw = (dx, dy, inkC, slvC) => {
    seg(g, [[x - Math.cos(ang) * 40 * s + dx, y - Math.sin(ang) * 40 * s + dy], [from[0] + dx, from[1] + dy]], 66 * s, inkC);
    seg(g, [[x - Math.cos(ang) * 150 * s + dx, y - Math.sin(ang) * 150 * s + dy], [from[0] + dx, from[1] + dy]], 92 * s, slvC);
    if (cuff && !rim) seg(g, [[x - Math.cos(ang) * 150 * s + dx, y - Math.sin(ang) * 150 * s + dy], [x - Math.cos(ang) * 158 * s + dx, y - Math.sin(ang) * 158 * s + dy]], 96 * s, cuff);
    circle(g, x + dx, y + dy, 44 * s, inkC);
    for (let i = 0; i < 4; i++) {
      const a = ang - 0.55 + i * 0.36, L = lerp(30, 100, open) * s;
      seg(g, [[x + dx, y + dy], [x + dx + Math.cos(a) * L, y + dy + Math.sin(a) * L]], 18 * s, inkC);
    }
    const ta = ang + (o.thumb ?? -1.3); seg(g, [[x + dx, y + dy], [x + dx + Math.cos(ta) * 70 * s, y + dy + Math.sin(ta) * 70 * s]], 19 * s, inkC);
  };
  if (rim) draw(rim.dir[0] * 5, rim.dir[1] * 5, rim.color, rim.color);
  draw(0, 0, ink, sleeve);
}
// soft light stripes through window blinds, projected onto a floor/wall as slanted bands
export function blindStripes(g, x, y, w, h, o = {}) {
  const { count = 6, slant = 0.6, color = '#c9d4ff', a = 0.08, gap = 0.45 } = o;
  g.save(); g.globalCompositeOperation = 'lighter';
  const bh = h / count;
  for (let i = 0; i < count; i++) {
    const y0 = y + i * bh, y1 = y0 + bh * (1 - gap);
    g.fillStyle = alpha(color, a * (1 - i / (count * 1.4)));
    poly(g, [[x + y0 * 0 + (y0 - y) * slant, y0], [x + w + (y0 - y) * slant, y0], [x + w + (y1 - y) * slant, y1], [x + (y1 - y) * slant, y1]], alpha(color, a * (1 - i / (count * 1.4))));
  }
  g.restore();
}

// close-up of HERO for bigFace shots: the rig's beanie sits over the eyes in a front view, so draw the head bare
// and put the beanie back above the brows. FRONT flips brow shapes (the rig's brows are drawn for a 3/4 view).
const FRONT = { angry: { brows: 'worried' }, determined: { brows: 'worried', mouth: 'smallFlat' }, sad: { brows: 'angry', mouth: 'frown' }, worried: { brows: 'angry' }, cry: { brows: 'angry' } };
export function heroFace(g, cx, cy, r, o = {}) {
  const of = o.outfit;
  bigFace(g, cx, cy, r, { ...o, outfit: { ...of, head: 'none' }, face: { ...(FRONT[o.expr] || {}), ...(o.face || {}) } });
  if (of.head !== 'beanie') return;
  const c = of.headColor, side = o.rimSide ?? -1;
  g.save(); g.translate(cx, cy); if (o.tilt) g.rotate(o.tilt);
  const dome = (dx, col) => { g.fillStyle = col; g.beginPath(); g.ellipse(dx, -r * 0.66, r * 1.0, r * 0.7, 0, Math.PI, Math.PI * 2); g.fill(); };
  if (o.rimColor) dome(side * r * 0.06, o.rimColor);
  dome(0, c);
  g.fillStyle = linGrad(g, -r, 0, r, 0, [shade(c, side < 0 ? 0.12 : -0.3), shade(c, side < 0 ? -0.3 : 0.12)]); g.globalAlpha = 0.45; dome(0, g.fillStyle); g.globalAlpha = 1;
  rr(g, -r * 1.02, -r * 0.86, r * 2.04, r * 0.28, r * 0.12); g.fillStyle = shade(c, -0.25); g.fill();
  for (let i = -6; i <= 6; i++) seg(g, [[i * r * 0.15, -r * 0.83], [i * r * 0.15, -r * 0.61]], r * 0.02, alpha(shade(c, -0.5), 0.5));
  circle(g, -r * 0.05, -r * 1.4, r * 0.24, shade(c, 0.28));
  g.restore();
}
