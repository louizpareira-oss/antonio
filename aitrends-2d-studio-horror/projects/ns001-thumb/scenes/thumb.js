// thumbnail for NIGHT SUPPORT 001: the cockpit with the passenger seat lit up, one instruction.
import { E, registerShot, alpha, glow } from '/engine/core.js';
import * as NS from '/projects/ns001-empty-seat/scenes/ns.js';
const { C, T } = NS;

registerShot('thumb', { draw(g) {
  NS.bg(g, 0);
  g.save(); g.translate(260, 120); g.scale(0.92, 0.92); NS.cockpit(g, 1.2, { beep: true, heat: true, heatAmt: 1.6, lights: true }); g.restore();
  glow(g, 1440, 820, 420, C.red, 0.35);
  g.fillStyle = 'rgba(5,7,10,0.55)'; g.fillRect(0, 0, 760, E.H);
  T(g, "DON'T", 70, 330, { size: 250, align: 'left', color: C.white, spacing: 4 });
  T(g, 'LOOK', 70, 560, { size: 300, align: 'left', color: C.red, spacing: 6, glow: 40, glowColor: alpha(C.red, 0.8) });
  NS.chip(g, 70, 760, 'PASSENGER SEAT: OCCUPIED', C.red, { size: 34, align: 'left' });
  NS.seatbeltIcon(g, 150, 920, 2.0, C.red); glow(g, 150, 920, 160, C.red, 0.5);
  T(g, '03:07 AM', E.W - 60, 70, { mono: true, size: 44, align: 'right', color: C.white });
}});
