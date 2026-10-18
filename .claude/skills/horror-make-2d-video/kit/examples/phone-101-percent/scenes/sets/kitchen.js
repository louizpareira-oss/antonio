// sets/kitchen.js — HORROR: domestic kitchen made slightly wrong
import { E, V, mood, layer, blurLayer, ease, shade, linGrad, glow, fillRect } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export function kitchen(g, t, cam) {
  const M = mood('abyss');
  const GY = E.H * V(0.8, 0.68);
  const CX = E.W / 2;

  // Sky through window — PURE BLACK (wrong)
  layer(g, cam, 0.15, g => {
    fillRect(g, 0, 0, E.W, E.H, '#000000');
  });

  // Back wall
  layer(g, cam, 0.55, g => {
    fillRect(g, 0, 0, E.W, GY - 20, shade(M.wall, -0.3));
    // WRONG ELEMENT: window showing pure black, frame slightly too large
    const wx = CX - 180, wy = 80, ww = 360, wh = 220;
    fillRect(g, wx, wy, ww, wh, '#000000');
    // Window frame
    g.strokeStyle = shade(M.wall, 0.1); g.lineWidth = 6;
    g.strokeRect(wx, wy, ww, wh);
    // Mullions
    g.beginPath(); g.moveTo(wx + ww/2, wy); g.lineTo(wx + ww/2, wy + wh); g.stroke();
    g.beginPath(); g.moveTo(wx, wy + wh/2); g.lineTo(wx + ww, wy + wh/2); g.stroke();

    // WRONG ELEMENT: electrical outlet to the left of window where it shouldn't be
    const ox = wx - 80, oy = wy + wh - 60;
    fillRect(g, ox, oy, 40, 50, shade(M.dark, 0.2));
    g.fillStyle = M.dark;
    fillRect(g, ox + 8, oy + 10, 10, 12, M.dark);
    fillRect(g, ox + 22, oy + 10, 10, 12, M.dark);
    fillRect(g, ox + 14, oy + 28, 12, 14, M.dark);
  });

  // Counter / floor
  layer(g, cam, 0.85, g => {
    fillRect(g, 0, GY - 60, E.W, 60, shade(M.floor, 0.1)); // counter
    fillRect(g, 0, GY, E.W, E.H - GY, M.floor); // floor
    // Floor lines
    g.strokeStyle = shade(M.floor, 0.2); g.lineWidth = 1;
    for (let i = 0; i < 8; i++) {
      g.beginPath(); g.moveTo(0, GY + 30 + i * 40); g.lineTo(E.W, GY + 30 + i * 40); g.stroke();
    }
  });

  // WRONG ELEMENT: clock on wall running COUNTER-CLOCKWISE
  layer(g, cam, 0.55, g => {
    const cx = 120, cy = 140, r = 45;
    g.fillStyle = shade(M.wall, 0.2);
    g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.fill();
    g.strokeStyle = M.rim; g.lineWidth = 2;
    g.beginPath(); g.arc(cx, cy, r, 0, Math.PI * 2); g.stroke();
    // Hour hand — moving wrong direction
    const angle = -t * 0.3;
    g.strokeStyle = M.feature; g.lineWidth = 3; g.lineCap = 'round';
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(angle) * r * 0.5, cy + Math.sin(angle) * r * 0.5); g.stroke();
    // Minute hand
    const angle2 = -t * 1.2;
    g.lineWidth = 2;
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(angle2) * r * 0.7, cy + Math.sin(angle2) * r * 0.7); g.stroke();
  });

  // Atmosphere: fine static particles
  FX.dust(g, t, { count: 40, speed: 0.3, size: 1.5, color: 'rgba(255,255,255,0.08)' });

  return { GY, M, CX, phonePos: { x: CX + 100, y: GY - 60 } };
}
