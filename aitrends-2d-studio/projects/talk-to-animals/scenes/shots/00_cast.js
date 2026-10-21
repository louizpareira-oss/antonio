// cast — look test: the family and the animals lined up in the seaside living room (golden afternoon).
import { E, registerShot, mood, layer, rr, alpha, linGrad, glow, text, FONTS, measure } from '/engine/core.js';
import { POSES, breathe } from '/engine/rig2d.js';
import { person } from '../look.js';
import * as FX from '/engine/fx2d.js';
import { couch } from '/projects/stronger-couldnt-stop/scenes/sets/home.js';
import { livingRoom } from '../sets/house.js';
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
  const { GY } = livingRoom(g, t, cam, { time: 'golden', whale: true });
  const SUN = '#ffd59a', RIMC = '#ffcf8f';
  layer(g, cam, 0.9, (g) => { couch(g, 600, GY - 6, 0.62, { color: '#3d6aa8' }); });
  FX.dust(g, t, { count: 40, color: '#fff2d6' });

  const rim = { color: RIMC, dir: [0.7, -0.6] };                  // window light from upper right
  const P = (n, seed) => breathe(POSES[n], t, 1, seed);
  person(g, { x: 150, y: GY + 70, s: 1.3, facing: 1, outfit: THEO, pose: P('relaxed', 1), expr: 'smile', rim });
  person(g, { x: 370, y: GY + 70, s: 1.3, facing: 1, outfit: MOM, pose: P('relaxed', 2), expr: 'smile', rim });
  person(g, { x: 620, y: GY + 78, s: 1.4, facing: 1, outfit: YOU, pose: P('relaxed', 3), expr: 'smile', look: [1, 0.5], rim });
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
  text(g, 'WHAT IF YOU COULD TALK TO ANIMALS?  ·  THE CAST', 60, 64, { size: 30, font: FONTS.ui, weight: 900, color: '#3a2a2a', align: 'left', spacing: 3 });
  label(g, 'THE WHALES', 1000 + 640 * 0.24, GY - 690 + 430 * 0.64 + 66);
} });
