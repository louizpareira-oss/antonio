// shots/02_phone_closeup.js — HORROR: the uncanny phone shows 101%
import { E, V, registerShot, mood, layer, ease, shade, fillRect, glow, text, FONTS, measure } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import { kitchen } from '../sets/kitchen.js';

registerShot('s002', {
  draw(g, t, info) {
    const cam = { z: 1.4 + 0.1 * ease.inOut(t / info.dur), x: 80 };
    const { GY, M } = kitchen(g, t, cam);

    layer(g, cam, 1, g => {
      const px = E.W * 0.55, py = GY - 40;

      // Phone body
      fillRect(g, px - 50, py - 90, 100, 180, shade(M.dark, 0.3));
      g.strokeStyle = M.feature; g.lineWidth = 2;
      g.strokeRect(px - 50, py - 90, 100, 180);

      // Screen — WRONG GLOW, sickly green
      const glowIntensity = 0.6 + 0.1 * Math.sin(t * 3);
      glow(g, px, py - 10, 120, `rgba(57, 255, 20, ${glowIntensity * 0.3})`);
      fillRect(g, px - 42, py - 80, 84, 140, '#0a1a0a');

      // Battery icon with 101% — THE WRONGNESS
      const bx = px - 30, by = py - 60, bw = 60, bh = 28;
      g.strokeStyle = '#39ff14'; g.lineWidth = 2;
      g.strokeRect(bx, by, bw, bh);
      // Battery tip
      fillRect(g, bx + bw, by + 8, 4, 12, '#39ff14');
      // Battery fill (past 100% — overflowing!)
      fillRect(g, bx + 2, by + 2, bw - 2, bh - 4, '#39ff14');

      // 101% text
      g.font = `bold ${V(22, 28)}px ${FONTS.ui}`;
      g.fillStyle = '#39ff14';
      g.textAlign = 'center';
      g.fillText('101%', px, py + 5);

      // Glitch line across screen occasionally
      if (Math.sin(t * 8) > 0.92) {
        g.fillStyle = 'rgba(255,255,255,0.5)';
        fillRect(g, px - 42, py - 20 + Math.sin(t * 20) * 30, 84, 3);
      }
    });

    // Static particles
    FX.dust(g, t, { count: 50, speed: 0.4, size: 1.2, color: 'rgba(57,255,20,0.06)' });
  }
});
