// sets/void.js — HORROR: field report / protocol explanation space
import { E, V, mood, layer, fillRect } from '/engine/core.js';

export function voidSet(g, t, cam) {
  const M = mood('void');
  const GY = E.H * V(0.8, 0.68);

  layer(g, cam, 1, g => {
    // Navy background
    fillRect(g, 0, 0, E.W, E.H, M.sky[0]);
    // Grid
    g.strokeStyle = 'rgba(143, 184, 232, 0.08)';
    g.lineWidth = 1;
    for (let x = 0; x < E.W; x += 40) {
      g.beginPath(); g.moveTo(x, 0); g.lineTo(x, E.H); g.stroke();
    }
    for (let y = 0; y < E.H; y += 40) {
      g.beginPath(); g.moveTo(0, y); g.lineTo(E.W, y); g.stroke();
    }
  });

  return { GY, M };
}
