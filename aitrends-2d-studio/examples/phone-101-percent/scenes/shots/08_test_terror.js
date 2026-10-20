// shots/08_test_terror.js — HORROR: the phone fights back, shows a message, glitch terror peak
import { E, V, registerShot, mood, layer, ease, fillRect, glow, text, FONTS, shade } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import { kitchen } from '../sets/kitchen.js';

registerShot('s008', {
  draw(g, t, info) {
    const p = t / info.dur;
    const cam = {
      z: 1.5 + 0.3 * ease.inOut(p),
      x: 60,
      // Subtle wrong shake building up
      shake: p > 0.5 ? (p - 0.5) * 4 : 0
    };
    const { GY, M } = kitchen(g, t, cam);

    layer(g, cam, 1, g => {
      const px = E.W * 0.5, py = GY - 40;

      // Phone — LARGER, more intense glow
      const glowIntensity = 0.8 + 0.2 * Math.sin(t * 6 + p * 10);
      glow(g, px, py, 200, `rgba(255,80,80,${glowIntensity * 0.3})`); // Now RED glow = hostile

      fillRect(g, px - 70, py - 120, 140, 240, shade(M.dark, 0.2));
      g.strokeStyle = '#ff4040'; g.lineWidth = 2;
      g.strokeRect(px - 70, py - 120, 140, 240);

      // Screen — now showing distorted message
      fillRect(g, px - 60, py - 108, 120, 200, '#1a0505');

      // Distorted "message from loved one"
      g.fillStyle = '#ff8080';
      g.font = `${V(14, 18)}px ${FONTS.ui}`;
      g.textAlign = 'center';

      // Text flickers and glitches
      if (Math.sin(t * 12) > -0.3) {
        g.fillText('MOM', px, py - 70);
        g.fillStyle = '#ffaaaa';
        g.font = `${V(11, 14)}px ${FONTS.ui}`;
        g.fillText('I need you', px, py - 40);
        g.fillText('to come home', px, py - 20);
      }

      // Glitch artifacts
      if (Math.sin(t * 20) > 0.85) {
        g.fillStyle = 'rgba(255,255,255,0.6)';
        const glitchY = py - 80 + Math.sin(t * 30) * 60;
        fillRect(g, px - 60, glitchY, 120, 4);
      }

      // Static lines across screen
      g.strokeStyle = 'rgba(255,100,100,0.3)';
      g.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        const ly = py - 100 + i * 28 + Math.sin(t * 5 + i) * 3;
        g.beginPath(); g.moveTo(px - 58, ly); g.lineTo(px + 58, ly + 1); g.stroke();
      }
    });

    // Heavy static in air as terror builds
    const staticCount = Math.floor(50 + p * 150);
    FX.dust(g, t, { count: staticCount, speed: 1 + p * 2, size: 1.5, color: `rgba(255,${Math.floor(100 - p * 80)},${Math.floor(100 - p * 80)},${0.05 + p * 0.1})` });

    // Occasional full-frame glitch flash
    if (Math.sin(t * 4 + p * 8) > 0.97) {
      fillRect(g, 0, 0, E.W, E.H, 'rgba(255,0,0,0.08)');
    }
  }
});
