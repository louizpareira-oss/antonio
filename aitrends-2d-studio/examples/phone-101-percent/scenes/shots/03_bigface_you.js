// shots/03_bigface_you.js — HORROR: giant dead-eye close-up, realisation dawning
import { E, V, registerShot, mood, layer, blurLayer, veil, ease } from '/engine/core.js';
import { bigFace } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { kitchen } from '../sets/kitchen.js';
import { YOU } from '../cast.js';

registerShot('s003', {
  draw(g, t, info) {
    const cam = { z: 1 };
    const { M } = kitchen(g, t, cam);

    // Blur darken background
    blurLayer(g, 12, g => veil(g, '#000000', 0.6), cam, 1.0);

    layer(g, cam, 1, g => {
      const cx = E.W / 2, cy = E.H * 0.48;
      const r = V(300, 340);

      // Expression shifts from confused to terrified
      let expr = 'confused';
      if (t > info.dur * 0.5) expr = 'shocked';
      if (t > info.dur * 0.75) expr = 'scared';

      bigFace(g, cx, cy, r, {
        outfit: YOU,
        expr,
        rimColor: M.rim,
        rimSide: 1,
        blink: (t % 7) > 6.9, // RARE blinking — uncanny
        tilt: 0.02 * Math.sin(t * 1.5) // SLIGHT wrong tilt
      });
    });

    // Subtle heartbeat pulse on the rim
    FX.rings(g, E.W / 2, E.H * 0.48, t, { count: 2, speed: 0.8, maxR: V(380, 420), color: 'rgba(196,30,58,0.15)', width: 2 });
  }
});
