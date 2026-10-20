// shots/05_fieldreport.js — HORROR: field report, subject who broke the rule
import { E, V, registerShot, mood, layer, ease, fillRect, text, FONTS, shade } from '/engine/core.js';
import { drawFigure, POSES, posesAt } from '/engine/rig2d.js';
import * as UI from '/engine/ui2d.js';
import { voidSet } from '../sets/void.js';
import { SUBJECT } from '../cast.js';

registerShot('s005', {
  draw(g, t, info) {
    const cam = { z: 1 + 0.02 * ease.inOut(t / info.dur) };
    const { GY, M } = voidSet(g, t, cam);

    // "FIELD REPORT" header
    layer(g, cam, 1, g => {
      g.fillStyle = '#8fb8e8';
      g.font = `${V(16, 20)}px ${FONTS.ui}`;
      g.textAlign = 'left';
      g.fillText('FIELD REPORT — SUBJECT A', 80, 60);
      g.fillStyle = 'rgba(143,184,232,0.3)';
      fillRect(g, 80, 70, E.W - 160, 1, 'rgba(143,184,232,0.3)');

      // Subject figure — FADED, WRONG posture
      const sx = E.W * 0.3;
      g.globalAlpha = 0.5;
      drawFigure(g, {
        x: sx, y: GY, s: 1.2, facing: 1,
        pose: posesAt(t, [[0, 'stand'], [0.3, 'handsOnHead'], [0.7, 'sad']]),
        expr: 'terrified',
        rim: { color: '#c41e3a', dir: [0, -1], w: 3 }
      });
      g.globalAlpha = 1;

      // Data readouts
      UI.readout(g, E.W * 0.55, 120, { label: 'INCIDENT', value: '04:00:12', color: '#c41e3a' });
      UI.readout(g, E.W * 0.55, 180, { label: 'STATUS', value: 'TERMINAL', color: '#ff0000' });
      UI.readout(g, E.W * 0.55, 240, { label: 'DURATION', value: '∞', color: '#8fb8e8' });

      // Diagram line
      g.strokeStyle = 'rgba(143,184,232,0.4)';
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(sx + 40, GY - 100);
      g.lineTo(E.W * 0.55, 130);
      g.stroke();
    });
  }
});
