// shots/03_rules.js — "The rules are simple": three blueprint cards (only your eyes, max +10 s, always on).
import { E, V, S, registerShot, ease, prog, clamp, lerp, wordTime, circle, ring, rr, seg, poly, glow, alpha, shade, mix, linGrad, text, FONTS } from '/engine/core.js';
import { POSES, walkPose } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { BLUE, ghost, chip, crossMark, checkMark, glitchBands } from '../lib.js';

function card(g, t, info, n) {
  const k = t / info.dur; UI.blueprint(g, { grid: 60, a: 0.07 });
  g.save(); g.translate(E.W / 2, E.H / 2); const z = 1 + 0.04 * ease.inOut(k); g.scale(z, z); g.translate(-E.W / 2, -E.H / 2);
  if (n) { text(g, `RULE ${n}`, 120, 120, { size: 34, color: alpha(S().ui.cream, 0.75), font: FONTS.ui, weight: 900, align: 'left', spacing: 4 }); for (let i = 1; i <= 3; i++) circle(g, 320 + i * 34, 120, 9, i <= n ? S().ui.gold : alpha(S().ui.blueprint, 0.3)); }
  return () => g.restore();
}

// s023 — "The rules are simple."
registerShot('s023', { draw(g, t, info) {
  const end = card(g, t, info, 0);
  UI.bigLine(g, t, { str: 'THE RULES', dur: info.dur + 1, y: E.H * 0.4, size: 110 });
  for (let i = 0; i < 3; i++) { const a = ease.outBack(prog(t, 0.4 + i * 0.18, 0.75 + i * 0.18)); if (a <= 0) continue; const x = E.W / 2 + (i - 1) * 180, y = E.H * 0.62;
    g.save(); g.translate(x, y); g.scale(a, a); ring(g, 0, 0, 56, 5, BLUE); glow(g, 0, 0, 120, BLUE, 0.2); text(g, String(i + 1), 0, 3, { size: 60, color: BLUE, font: FONTS.ui, weight: 900 }); g.restore(); }
  end();
} });

// s024 — "You only see what your own eyes are going to see."  a vision cone: only what's inside it glows
registerShot('s024', { draw(g, t, info) {
  const end = card(g, t, info, 1), bp = S().ui.blueprint, GY = E.H * 0.74, fx = E.W * 0.3;
  seg(g, [[100, GY], [E.W - 100, GY]], 3, alpha(bp, 0.5));
  UI.lineFigure(g, { x: fx, y: GY, s: 1.5, pose: POSES.stand, color: '#e8f0ff' });
  const hx = fx + 12, hy = GY - 208 * 1.5, open = ease.out(prog(t, 0.2, 0.8));
  FX.lightCone(g, hx, hy, { angle: 0.12, spread: 0.75 * open, len: 1100 * open, color: BLUE, a: 0.32 });
  const bx = lerp(E.W * 0.55, E.W * 0.8, (t * 0.35) % 1), by = GY - 40 - Math.abs(Math.sin(t * 3)) * 180;
  ghost(g, (x) => { circle(x, bx, by, 34, '#fff'); UI.lineFigure(x, { x: E.W * 0.68, y: GY, s: 1.2, pose: walkPose(t * 5), facing: -1 }); }, { t, a: 0.6 * open });
  g.save(); g.globalAlpha = 0.35; UI.lineFigure(g, { x: E.W * 0.1, y: GY, s: 1.1, pose: POSES.wave, color: alpha(bp, 0.6), facing: 1 }); g.restore();
  text(g, '?', E.W * 0.1 + 10, GY - 330, { size: 70, color: alpha(bp, 0.6), font: FONTS.ui, weight: 900 });
  chip(g, 'ONLY WHAT YOUR EYES WILL SEE', E.W / 2, E.H - 150, { size: 32, color: BLUE, k: prog(t, 0.6, 1.0), line: alpha(BLUE, 0.6) });
  end();
} });

// s025 — "Never more than ten seconds ahead."  a timeline: NOW → +10 s glows, beyond it is crossed out
registerShot('s025', { draw(g, t, info) {
  const end = card(g, t, info, 2), bp = S().ui.blueprint, y = E.H * 0.5, x0 = E.W * 0.16, x10 = E.W * 0.66, x1 = E.W * 0.86;
  seg(g, [[x0, y], [x1, y]], 4, alpha(bp, 0.4));
  for (let i = 0; i <= 13; i++) { const x = x0 + (x10 - x0) * i / 10; if (x > x1) break; seg(g, [[x, y - (i % 5 ? 12 : 22)], [x, y + (i % 5 ? 12 : 22)]], 3, alpha(bp, 0.6)); }
  const p = ease.inOut(prog(t, 0.2, 1.3)), xp = lerp(x0, x10, p);
  seg(g, [[x0, y], [xp, y]], 14, BLUE); glow(g, xp, y, 90, BLUE, 0.6);
  text(g, 'NOW', x0, y + 70, { size: 34, color: S().ui.cream, font: FONTS.ui, weight: 900 });
  text(g, '+10 s', x10, y + 70, { size: 40, color: BLUE, font: FONTS.ui, weight: 900, alpha: prog(t, 1.1, 1.4), glow: 14, glowColor: alpha(BLUE, 0.6) });
  g.setLineDash([14, 12]); seg(g, [[x10 + 20, y - 60], [x10 + 20, y + 40]], 3, alpha(BLUE, 0.6)); g.setLineDash([]);
  crossMark(g, (x10 + x1) / 2 + 40, y - 90, 1.1, S().ui.accent, prog(t, 1.4, 1.9));
  chip(g, 'MAX +10 s', E.W / 2, E.H - 150, { size: 34, color: BLUE, k: prog(t, 1.2, 1.6), line: alpha(BLUE, 0.6) });
  end();
} });

// s026 — "And it never switches off."  the switch is flicked OFF and snaps straight back ON
registerShot('s026', { draw(g, t, info) {
  const end = card(g, t, info, 3), cx = E.W / 2, cy = E.H * 0.47;
  const off = ease.inOut(prog(t, 0.45, 0.7)) * (1 - ease.outBack(prog(t, 0.9, 1.15))), on = 1 - off;
  rr(g, cx - 200, cy - 90, 400, 180, 90); g.fillStyle = mix('#1a2638', '#0f4a5c', on); g.fill(); g.strokeStyle = alpha(on > 0.5 ? BLUE : S().ui.blueprint, 0.8); g.lineWidth = 5; g.stroke();
  if (on > 0.5) glow(g, cx, cy, 380, BLUE, 0.25 * on);
  const kx = lerp(cx - 110, cx + 110, on); circle(g, kx, cy, 72, '#e8f0ff'); circle(g, kx, cy, 72 * 0.6, alpha(on > 0.5 ? BLUE : '#8a96a8', 0.5));
  text(g, on > 0.5 ? 'ON' : 'OFF', cx, cy + 160, { size: 52, color: on > 0.5 ? BLUE : '#8a96a8', font: FONTS.ui, weight: 900, glow: on > 0.5 ? 16 : 0, glowColor: alpha(BLUE, 0.6) });
  if (t > 0.9 && t < 1.3) glitchBands(g, t, 1 - prog(t, 0.9, 1.3));
  chip(g, 'ALWAYS ON', cx, E.H - 150, { size: 34, color: BLUE, k: prog(t, 1.1, 1.5), line: alpha(BLUE, 0.6) });
  void checkMark; end();
} });
