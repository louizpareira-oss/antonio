// thumbnail for NIGHT SUPPORT 001: the cockpit with the passenger seat lit up, one instruction.
import { E, registerShot, alpha, glow } from '/engine/core.js';
import * as NS from '/projects/ns001-empty-seat/scenes/ns.js';
const { C, T } = NS;

registerShot('thumb', { draw(g) {
  NS.bg(g, 0);
  g.save(); g.translate(330, 150); g.scale(0.9, 0.9); NS.cockpit(g, 1.2, { beep: true, heat: true, heatAmt: 1.4, lights: true }); g.restore();
  const gr = g.createLinearGradient(0, 0, 900, 0); gr.addColorStop(0, 'rgba(5,5,5,0.92)'); gr.addColorStop(0.75, 'rgba(5,5,5,0.6)'); gr.addColorStop(1, 'rgba(5,5,5,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 900, E.H);
  T(g, "DON'T", 80, 330, { size: 230, align: 'left' });
  T(g, 'LOOK.', 80, 560, { size: 250, align: 'left', color: C.red, glow: 50, glowColor: alpha(C.red, 0.7) });
  NS.pill(g, 86, 760, 'PASSENGER SEAT: OCCUPIED', C.red, { size: 34, align: 'left', solid: true });
  NS.seatbeltIcon(g, 170, 930, 2.2, C.red); glow(g, 170, 930, 170, C.red, 0.5);
}});
