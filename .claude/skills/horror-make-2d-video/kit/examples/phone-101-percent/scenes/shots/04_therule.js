// shots/04_therule.js — HORROR: THE RULE displayed in blood red ALL CAPS
import { E, V, registerShot, mood, layer, ease, fillRect, text, FONTS, glow } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

registerShot('s004', {
  draw(g, t, info) {
    const M = mood('abyss');
    const cam = { z: 1 };

    // Pure black background
    layer(g, cam, 1, g => {
      fillRect(g, 0, 0, E.W, E.H, '#000000');
    });

    // Glitch effect: horizontal displacement
    const glitchAmp = t < 0.3 ? 8 : (Math.sin(t * 15) > 0.95 ? 4 : 0);

    layer(g, cam, 1, g => {
      g.save();
      if (glitchAmp > 0) {
        // Split colour channels for RGB glitch
        g.globalCompositeOperation = 'lighter';
        g.fillStyle = 'rgba(255,0,0,0.4)';
        g.textAlign = 'center';
        g.font = `bold ${V(72, 96)}px Impact, Arial Black, sans-serif`;
        g.fillText('DO NOT UNPLUG IT', E.W / 2 + glitchAmp, E.H / 2);

        g.fillStyle = 'rgba(0,255,255,0.4)';
        g.fillText('DO NOT UNPLUG IT', E.W / 2 - glitchAmp, E.H / 2);
        g.globalCompositeOperation = 'source-over';
      }

      // Main text — BLOOD RED, glowing
      glow(g, E.W / 2, E.H / 2, 300, 'rgba(255,0,0,0.2)');
      g.fillStyle = '#ff0000';
      g.textAlign = 'center';
      g.font = `bold ${V(72, 96)}px Impact, Arial Black, sans-serif`;
      g.fillText('DO NOT UNPLUG IT', E.W / 2, E.H / 2);

      // Subtitle
      g.font = `${V(18, 24)}px ${FONTS.ui}`;
      g.fillStyle = '#888888';
      g.fillText('RULE NUMBER ONE', E.W / 2, E.H / 2 + V(60, 80));

      g.restore();
    });

    // Scan lines
    if (t > 0.2) {
      g.save();
      g.globalAlpha = 0.15;
      for (let y = 0; y < E.H; y += 3) {
        fillRect(g, 0, y, E.W, 1, '#ffffff');
      }
      g.restore();
    }

    // Static burst
    if (t < 0.5) {
      FX.dust(g, t, { count: 200, speed: 2, size: 2, color: 'rgba(255,255,255,0.3)' });
    }
  }
});
