// shots/01_replay.js — act 1: the face, the empty room, THE DOORWAY at 19, the 400 replays.
import { E, V, registerShot, mood, layer, blurLayer, veil, ease, prog, key, clamp, lerp, wordTime, circle, ring, rr, seg, glow, alpha, shade, mix, linGrad, radGrad, text, FONTS } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe, bigFace, headPos } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import * as UI from '/engine/ui2d.js';
import { apartment, aptGround, aptDoor, aptWindow, aptChair } from '../sets/apartment.js';
import { HERO, HIM } from '../cast.js';
import { backView, walkAway, heroFace } from '../lib.js';

// half the face in shadow: dark gradient over the far side, clipped to the head
function halfShadow(g, cx, cy, r, side = 1, a = 0.6) {
  g.save(); g.beginPath(); g.arc(cx, cy, r * 1.07, 0, Math.PI * 2); g.clip();
  g.fillStyle = linGrad(g, cx - side * r, 0, cx + side * r, 0, ['rgba(0,0,0,0)', 'rgba(0,0,0,0)', `rgba(4,5,12,${a})`]); g.fillRect(cx - r * 1.2, cy - r * 1.6, r * 2.4, r * 3.2);
  g.restore();
}

// s01 — "You're not still angry about what happened."  extreme close-up, jaw tight, half in shadow
registerShot('s01', { draw(g, t, info) {
  const M = mood('night');
  blurLayer(g, 16, (g) => apartment(g, t, { z: 1.7, x: -260, y: -120 }, { mood: 'night' })); veil(g, '#05060e', 0.45);
  const k = ease.inOut(t / info.dur), r = V(330, 430) * (1 + 0.07 * k);
  const cx = E.W / 2 + V(0, 10) - 14 * k, cy = E.H * V(0.56, 0.47);
  const lookAway = ease.inOut(prog(info.globalT, 1.4, 1.9));
  heroFace(g, cx, cy, r, { outfit: HERO, expr: 'determined', look: [-0.5 * lookAway, 0.15], rimColor: M.key, rimSide: -1, blink: t > 2.75 && t < 2.87 });
  halfShadow(g, cx, cy, r, 1, 0.62);
  glow(g, cx - r * 1.1, cy - r * 0.2, r * 0.9, M.key, 0.08);
  FX.dust(g, t, { count: 26, color: '#c9d4ff', a: 0.25, speed: 6 });
} });

// s02 — "You're angry that it didn't happen differently."  pull back: alone on a chair in the dark room
registerShot('s02', { draw(g, t, info) {
  const k = ease.out(prog(t, 0, info.dur)), GY = aptGround();
  const cam = { z: lerp(V(2.4, 2.8), 1.04, k), x: lerp(-V(150, 125), -10, k), y: lerp(V(40, 70), 0, k) };
  const { M, D, W } = apartment(g, t, cam, { mood: 'night' });
  const x = E.W / 2 - V(170, 140), s = V(1.5, 1.6), rim = { color: M.key, dir: [-1, -0.25] };
  layer(g, cam, 1, (g) => {
    aptChair(g, x - 14 * s, GY, s, 1, shade(M.wall, -0.65));
    const p = posesAt(t, [[0, { ...POSES.sit, head: [12, -172], sh: [6, -142], hF: [30, -86], hB: [24, -84] }], [2.2, { ...POSES.sit, head: [16, -168], sh: [8, -140], eF: [24, -112], hF: [30, -88] }]], 0.8);
    drawFigure(g, { x, y: GY, s, facing: 1, outfit: HERO, pose: breathe(p, t, 0.6), expr: t > 1.5 ? 'sad' : 'determined', look: [0.6, 0.3], rim, blink: (t % 3.4) > 3.3 });
  });
  layer(g, cam, 1, (g) => FX.dust(g, t, { count: 40, color: '#c9d4ff', a: 0.22, area: [W.x, W.y, W.w * 2.2, E.H * 0.5], speed: 8 }));
  FX.fog(g, GY - V(200, 260), V(260, 320), M.fog, 0.12);
} });

// THE DOORWAY: shared by s03 (night), s11 (grey replay) and s27 (dawn, empty). Same framing every time.
export function doorway(g, t, o = {}) {
  const cam = { z: o.z ?? 1.08, x: o.x ?? V(70, 60), y: o.y ?? -V(30, 60) };
  const { M, D, GY } = apartment(g, t, cam, { mood: o.mood || 'night', dawn: o.dawn || 0 });
  const p = o.leave ?? 0;                      // 0 = at the threshold, 1 = far down the hallway
  if (o.him !== false) {
    layer(g, cam, 0.5, (g) => {
      g.save(); g.beginPath(); g.rect(D.x, D.y - D.h, D.w, D.h); g.clip();
      const s = lerp(V(1.55, 1.7), V(0.62, 0.7), p), y = lerp(GY + 10, GY - D.h * 0.2, p), x = D.x + D.w / 2 + 6 * Math.sin(p * 3);
      backView(g, { x, y, s, facing: 1, outfit: HIM, pose: walkAway((o.walkT ?? t) * Math.PI * 2 * 0.9), rim: { color: shade(M.practical, 0.3), dir: [0, -1], w: 5 }, shadow: false, alpha: 1 - 0.5 * ease.in(prog(p, 0.6, 1)) });
      g.restore();
    });
  }
  if (o.watcher !== false) {                    // young HERO in the blurred foreground, watching him go
    blurLayer(g, 9, (g) => {
      backView(g, { x: E.W / 2 - V(330, 250), y: GY + V(520, 760), s: V(3.6, 3.9), facing: 1, outfit: HERO, pose: breathe(POSES.sad, t, 0.5), rim: { color: M.key, dir: [0.6, -1], w: 4 }, shadow: false });
    }, cam, 1.6);
  }
  layer(g, cam, 0.5, (g) => FX.dust(g, t, { count: 34, color: mix(M.practical, '#fff1d0', o.dawn || 0), a: 0.35 + (o.dawn || 0) * 0.3, area: [D.x - D.w * 1.5, D.y - D.h, D.w * 4, D.h * 1.6], speed: 10 }));
  return { M, D, GY, cam };
}

// s03 — "I was nineteen the last time I spoke to him."  he walks out; the door stays open
registerShot('s03', { draw(g, t, info) {
  const leave = ease.inOut(prog(t, 0.3, info.dur + 0.4));
  doorway(g, t, { leave, z: 1.06 + 0.04 * ease.inOut(t / info.dur), x: V(70, 60) - 20 * t / info.dur });
  const t19 = wordTime('nineteen', 8.2) ?? 8.6, a = ease.out(prog(info.globalT, t19, t19 + 0.35)) * (1 - prog(t, info.dur - 0.4, info.dur));
  UI.readout(g, { label: 'AGE', value: '19', x: V(120, 90), y: V(170, 300), a, size: V(46, 64) });
} });
