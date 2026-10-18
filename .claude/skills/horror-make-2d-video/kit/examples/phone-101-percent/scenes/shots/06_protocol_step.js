// shots/06_protocol_step.js — HORROR: protocol step one, instructional
import { E, V, registerShot, mood, layer, ease, fillRect, text, FONTS, glow } from '/engine/core.js';
import { drawFigure, POSES, posesAt, breathe } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { kitchen } from '../sets/kitchen.js';
import { YOU } from '../cast.js';

registerShot('s006', {
  draw(g, t, info) {
    const cam = { z: 1.1, x: -20 * ease.inOut(t / info.dur) };
    const { GY, M, phonePos } = kitchen(g, t, cam);

    layer(g, cam, 1, g => {
      // YOU standing back from phone, calm posture
      drawFigure(g, {
        x: E.W * 0.3, y: GY, s: 1.2, facing: 1,
        pose: breathe(posesAt(t, [[0, 'stand'], [0.5, 'crossArms']]), t, 0.3, 2),
        expr: 'calm_wrong',
        rim: { color: M.rim, dir: [0.2, -0.8], w: 5 }
      });

      // Phone glowing in distance on counter
      glow(g, phonePos.x, phonePos.y, 80, 'rgba(57,255,20,0.2)');
      fillRect(g, phonePos.x - 20, phonePos.y - 35, 40, 70, '#0a1a0a');
      g.strokeStyle = '#39ff14'; g.lineWidth = 1;
      g.strokeRect(phonePos.x - 20, phonePos.y - 35, 40, 70);
    });

    // Protocol step overlay
    layer(g, cam, 1, g => {
      g.fillStyle = 'rgba(0,0,0,0.7)';
      fillRect(g, 60, E.H - 160, E.W - 120, 100);

      // Step number
      g.fillStyle = '#c41e3a';
      g.font = `bold ${V(48, 64)}px Impact, Arial Black, sans-serif`;
      g.textAlign = 'left';
      g.fillText('STEP 1', 80, E.H - 100);

      // Instruction
      g.fillStyle = '#ffffff';
      g.font = `${V(20, 26)}px ${FONTS.ui}`;
      g.fillText('Remain calm. It feeds on your reaction.', 180, E.H - 110);
      g.fillStyle = '#888888';
      g.font = `${V(16, 20)}px ${FONTS.ui}`;
      g.fillText('If you panic — it wins.', 180, E.H - 80);
    });

    FX.dust(g, t, { count: 25, speed: 0.2, size: 1, color: 'rgba(255,255,255,0.04)' });
  }
});
