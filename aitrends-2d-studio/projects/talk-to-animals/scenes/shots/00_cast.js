// cast — look test: the family and the animals lined up in the seaside living room (golden afternoon).
import { E, registerShot, mood, layer, rr, alpha, linGrad, glow, text, FONTS, measure } from '/engine/core.js';
import { drawFigure, POSES, breathe } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';
import { room, couch } from '/projects/stronger-couldnt-stop/scenes/sets/home.js';
import { YOU, MOM, THEO } from '../cast.js';
import { dog, cat, crow, pigeon, squirrel, prairieDog, whaleTail, animalHead } from '../animals.js';

function label(g, str, x, y) {
  const w = measure(g, str, 21, FONTS.ui, 900) + 30;
  rr(g, x - w / 2, y - 17, w, 34, 17); g.fillStyle = 'rgba(20,14,22,.72)'; g.fill();
  text(g, str, x, y + 1, { size: 21, font: FONTS.ui, weight: 900, color: '#fff1dc', spacing: 1.5 });
}
function say(g, str, x, y) {
  const w = measure(g, str, 26, FONTS.ui, 800) + 40;
  rr(g, x - w / 2, y - 26, w, 52, 26); g.fillStyle = '#fff6ea'; g.fill();
  g.beginPath(); g.moveTo(x - w * 0.18, y + 22); g.lineTo(x - w * 0.3, y + 44); g.lineTo(x - w * 0.02, y + 22); g.fill();
  text(g, str, x, y + 1, { size: 26, font: FONTS.ui, weight: 800, color: '#2a1e24' });
}

registerShot('cast', { draw(g, t) {
  const cam = { x: 0, y: 0, z: 1 };
  const R = room(g, t, cam, { window: false, wall: '#d9c3a4', floor: '#a57a5a' }), { GY } = R;
  const SUN = '#ffd59a', RIMC = '#ffcf8f';
  layer(g, cam, 0.6, (g) => {                                     // big window onto the sea at golden hour, a whale far out
    const x = 1010, y = GY - 700, w = 700, h = 440;
    FX.windowFrame(g, { x, y, w, h, cols: 3, rows: 1, frame: '#f2ebe0', bar: 12 }, (g, X, Y, W, H) => {
      g.fillStyle = linGrad(g, 0, Y, 0, Y + H, ['#7a6aa0', '#f0a07a', '#ffd9a0']); g.fillRect(X, Y, W, H);
      FX.sun(g, X + W * 0.62, Y + H * 0.56, 38, '#fff6e0', SUN, 4);
      const sea = Y + H * 0.64; g.fillStyle = linGrad(g, 0, sea, 0, Y + H, ['#e0907a', '#5a5a8a', '#2e3560']); g.fillRect(X, sea, W, H);
      g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = alpha('#ffd9a0', 0.5); for (let i = 0; i < 7; i++) g.fillRect(X + W * 0.62 - 60 + i * 8 - i * i, sea + 6 + i * 14, 120 - i * 10, 3); g.restore();
      whaleTail(g, X + W * 0.24, sea + 18, 0.9, '#2a2a48');
      g.fillStyle = alpha('#ffffff', 0.5); for (const dx of [-30, -14, 14, 30]) g.fillRect(X + W * 0.24 + dx - 6, sea + 16, 12, 2);
    });
    rr(g, x - 24, y + h, w + 48, 20, 6); g.fillStyle = '#f2ebe0'; g.fill();
    FX.godRays(g, x + w * 0.62, y + h * 0.56, { angle: Math.PI - 0.55, spread: 0.6, len: 1600, color: SUN, a: 0.07, t });
  });
  layer(g, cam, 0.9, (g) => {
    couch(g, 360, GY - 10, 0.75, { color: '#3d6aa8' });
    FX.pool(g, 1250, GY + 90, 900, 90, SUN, 0.22);
  });
  FX.dust(g, t, { count: 40, color: '#fff2d6' });

  const rim = { color: RIMC, dir: [0.7, -0.6] };                  // window light from upper right
  const P = (n, seed) => breathe(POSES[n], t, 1, seed);
  drawFigure(g, { x: 150, y: GY + 70, s: 1.3, facing: 1, outfit: THEO, pose: P('relaxed', 1), expr: 'smile', rim });
  drawFigure(g, { x: 370, y: GY + 70, s: 1.3, facing: 1, outfit: MOM, pose: P('relaxed', 2), expr: 'smile', rim });
  drawFigure(g, { x: 620, y: GY + 78, s: 1.4, facing: 1, outfit: YOU, pose: P('relaxed', 3), expr: 'smile', look: [1, 0.4], rim });
  const B = { x: 900, y: GY + 82, s: 1.5, facing: -1, t, talk: 0.55, wag: 1, eyes: 'dot', rim };
  dog(g, B);
  const C = { x: 1120, y: GY + 82, s: 1.2, facing: -1, rim };
  cat(g, C);
  squirrel(g, { x: 1290, y: GY + 82, s: 1.75, facing: -1, rim });
  prairieDog(g, { x: 1465, y: GY + 82, s: 1.8, facing: -1, rim });
  pigeon(g, { x: 1648, y: GY + 82, s: 1.8, facing: -1, rim });
  crow(g, { x: 1818, y: GY + 82, s: 1.8, facing: -1, gift: true, rim });

  const [bx, by] = animalHead('dog', B), [cx, cy] = animalHead('cat', C);
  say(g, 'Bacon. Under the chair.', bx + 120, by - 80);
  say(g, 'Ugh. You\'re awake.', cx + 95, cy - 70);
  const LY = GY + 150;
  [['THEO', 150], ['MOM', 370], ['YOU', 620], ['BISCUIT · 14', 900], ['PICKLES', 1120], ['SQUIRREL', 1290], ['PRAIRIE DOG', 1468], ['PIGEON', 1650], ['CROW', 1820]].forEach(([s, x]) => label(g, s, x, LY));
  text(g, 'WHAT IF YOU COULD TALK TO ANIMALS?  ·  THE CAST', 60, 70, { size: 30, font: FONTS.ui, weight: 900, color: '#3a2a2a', align: 'left', spacing: 3 });
  label(g, 'THE WHALES', 1010 + 700 * 0.24, GY - 700 + 440 * 0.64 + 70);
} });
