// shots/01_kitchen_wide.js — HORROR: empty kitchen establishing shot, wrong clock, wrong window
import { E, V, registerShot, mood, layer, ease, shade, fillRect, glow, circle, seg } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { kitchen } from '../sets/kitchen.js';
import { YOU } from '../cast.js';

registerShot('s001', {
  draw(g, t, info) {
    const cam = { z: 1 + 0.03 * ease.inOut(t / info.dur), x: -10 * ease.inOut(t / info.dur) };
    const { GY, M } = kitchen(g, t, cam);

    // You enter from left, slightly stiff, wrong posture
    layer(g, cam, 1, g => {
      const x = E.W * 0.2 + t * 30;
      drawFigure(g, {
        x, y: GY, s: 1.1, facing: 1,
        pose: breathe(posesAt(t, [[0, 'stand'], [0.5, 'think']]), t, 0.4, 1),
        expr: 'confused',
        rim: { color: M.rim, dir: [0.3, -0.8], w: 5 }
      });
    });

    // Subtle vignette already from style, add heavy atmosphere
    FX.dust(g, t, { count: 30, speed: 0.15, size: 1, color: 'rgba(255,255,255,0.05)' });
  }
});
