// SKOTOMA channel banner, rendered at 2560x1440 (logical 1920x1080).
// YouTube shows different crops: TV = everything, desktop = the full-width middle strip (logical y 381..699),
// phone = only the centre safe area (logical x 380..1540, y 381..699). Name, tagline and the passenger stay inside
// the safe area; the extra hand and the second passenger at the edges only appear on desktop and TV.
import { E, registerShot, radGrad, linGrad, circle, text, measure } from '/engine/core.js';
import { passengerHead, seatBack, hookHand, INK, YELLOW } from '/projects/skotoma-brand/scenes/brand.js';

const FONT = 'Montserrat';
for (const w of ['800', '900']) {
  try { const ff = new FontFace(FONT, `url(/project/assets/fonts/montserrat-latin-${w}-normal.woff2)`, { weight: w }); await ff.load(); document.fonts.add(ff); } catch (e) { console.log('font missing', FONT, w); }
}
const SAFE = { x0: 380, x1: 1540, y0: 381, y1: 699 }, SEAT = 642;

// draw a passenger part at (x, SEAT) and scale s (parts are built at avatar size around x = 0, seat top = 0)
function at(g, x, s, fn) { g.save(); g.translate(x, SEAT); g.scale(s, s); fn(); g.restore(); }

registerShot('banner', { draw(g) {
  g.fillStyle = YELLOW; g.fillRect(0, 0, E.W, E.H);
  g.fillStyle = radGrad(g, 1330, 540, 0, 560, ['rgba(255,247,214,0.55)', 'rgba(255,247,214,0)']); g.fillRect(0, 0, E.W, E.H);
  g.fillStyle = linGrad(g, 0, 0, 0, SAFE.y0, ['rgba(120,70,0,0.16)', 'rgba(120,70,0,0)']); g.fillRect(0, 0, E.W, SAFE.y0);

  // passengers behind the seat: the main one in the safe area, a second one half off the right edge (desktop/TV only)
  at(g, 1330, 0.5, () => passengerHead(g, 0, 0, true));
  at(g, 1915, 0.42, () => passengerHead(g, 0, 0, true));
  seatBack(g, -120, E.W + 120, SEAT, 520, true, [1060, 1600]);
  at(g, 1330, 0.5, () => { hookHand(g, -262, 0, -1); hookHand(g, 262, 0, 1); });
  at(g, 1915, 0.42, () => hookHand(g, -262, 0, -1));
  at(g, 205, 0.5, () => hookHand(g, -60, 0, 1));                       // a lone hand on the far left (desktop/TV only)

  // name sized to fit the space left of the passenger
  const x = 420, maxW = 680, size = Math.min(170, Math.floor(maxW / measure(g, 'SKOTOMA', 100, FONT, 900) * 100));
  text(g, 'SKOTOMA', x + 6, 508 + 8, { font: FONT, weight: 900, size, align: 'left', base: 'alphabetic', color: 'rgba(90,50,0,0.25)', spacing: 2 });
  text(g, 'SKOTOMA', x, 508, { font: FONT, weight: 900, size, align: 'left', base: 'alphabetic', color: INK, spacing: 2 });
  text(g, 'SURVIVAL RULES FOR THE THINGS', x + 4, 556, { font: FONT, weight: 800, size: 31, align: 'left', base: 'alphabetic', color: INK });
  text(g, 'YOU WERE NEVER SUPPOSED TO SEE.', x + 4, 594, { font: FONT, weight: 800, size: 31, align: 'left', base: 'alphabetic', color: INK });

  // on the seat back, like a dashboard readout
  circle(g, x + 12, 671, 8, '#ff3b30');
  text(g, 'NIGHT SUPPORT  //  NEW CALL EVERY WEEK', x + 32, 672, { font: FONT, weight: 800, size: 22, align: 'left', color: '#e9e9e9', spacing: 1 });
}});
