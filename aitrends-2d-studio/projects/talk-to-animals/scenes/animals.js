// animals.js — the talking animals for "What If You Could Talk to Animals?", in the studio look:
// black ink silhouettes with a rim light, white dot eyes, and ONE colour accent each
// (Biscuit: red collar + grey muzzle, Pickles: white bib and paws, crow: blue sheen, pigeon: green neck,
// squirrel: the lost key, prairie dog: sandy belly). All face right at facing = 1; y is the floor.
import { S, seg, circle, poly, alpha, clamp } from '/engine/core.js';

const RIM = { dir: [-0.8, -0.5], w: 4.5, color: '#ffc68a' };
const WHITE = '#f2efe8';

// shape(g, colour, pass) draws the silhouette (called for the rim pass, then the main pass); detail(g, ink) adds the
// eyes and the accent on top of the main pass.
function creature(g, o, shape, detail) {
  const { x, y, s = 1, facing: f = 1 } = o, ink = o.ink || S().ink, rim = o.rim === false ? null : { ...RIM, ...(o.rim || {}) };
  g.save(); if (o.alpha != null) g.globalAlpha *= o.alpha;
  if (o.shadow !== false) { g.fillStyle = 'rgba(0,0,0,.28)'; g.beginPath(); g.ellipse(x, y + 2, (o.shadowW || 40) * s, 6 * s, 0, 0, Math.PI * 2); g.fill(); }
  if (rim) { g.save(); g.translate(x + rim.dir[0] * rim.w, y + rim.dir[1] * rim.w); g.scale(f * s, s); shape(g, rim.color, 'sil'); g.restore(); }
  g.save(); g.translate(x, y); g.scale(f * s, s); shape(g, ink, 'main'); if (detail) detail(g, ink); g.restore();
  g.restore();
}
const ell = (g, x, y, rx, ry, rot, c) => { g.fillStyle = c; g.beginPath(); g.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2); g.fill(); };
// world position of an animal's head (for speech bubbles)
export function animalHead(kind, o) {
  const H = { dog: [44, -134], cat: [20, -88], crow: [20, -40], pigeon: [18, -38], squirrel: [12, -48], prairie: [3, -72] }[kind];
  const s = o.s ?? 1, f = o.facing ?? 1; return [o.x + H[0] * f * s, o.y + H[1] * s];
}

// BISCUIT — 14-year-old black Labrador mix, sitting. o: { t, talk 0..1, wag 0..1, eyes: 'dot'|'happy'|'closed', brows: 'sad'|'raised' }
export function dog(g, o = {}) {
  const { t = 0, talk = 0, wag = 0 } = o, jaw = clamp(talk) * 0.38;
  creature(g, { shadowW: 72, ...o }, (g, c, pass) => {
    g.save(); g.translate(-60, -16); g.rotate(Math.sin(t * 9) * 0.22 * wag); seg(g, [[0, 0], [-28, 8], [-56, 6]], 11, c); g.restore();   // tail on the floor
    ell(g, -30, -40, 44, 39, -0.2, c);                                    // haunch
    seg(g, [[-26, -52], [14, -94]], 52, c);                               // back
    circle(g, 22, -82, 27, c);                                            // chest
    ell(g, -2, -6, 23, 8, 0, c);                                          // hind foot
    seg(g, [[10, -72], [12, -5]], 13, c); seg(g, [[27, -72], [31, -5]], 14, c);   // front legs
    ell(g, 17, -5, 10, 6, 0, c); ell(g, 36, -5, 11, 6, 0, c);             // front paws
    seg(g, [[16, -90], [34, -126]], 32, c);                               // neck
    circle(g, 40, -134, 25, c);                                           // head
    if (pass === 'main' && jaw > 0.02) {                                  // mouth inside + tongue when talking
      poly(g, [[52, -122], [74, -124], [52 + Math.cos(jaw) * 22, -122 + Math.sin(jaw) * 22]], '#4a1820');
      ell(g, 60 + 5 * jaw, -120 + 8 * jaw, 8, 3.5, jaw, '#d86a7a');
    }
    seg(g, [[52, -134], [72, -129]], 23, c);                              // upper jaw (short, broad muzzle)
    g.save(); g.translate(52, -122); g.rotate(jaw); seg(g, [[0, 0], [19, 2]], 13, c); g.restore();   // lower jaw
    circle(g, 77, -132, 8, c);                                            // nose
    g.fillStyle = c; g.beginPath(); g.moveTo(30, -152); g.quadraticCurveTo(10, -142, 17, -106); g.quadraticCurveTo(31, -108, 39, -130); g.closePath(); g.fill();   // floppy ear
  }, (g, ink) => {
    const grey = '#a3a3ad';
    g.save(); g.globalAlpha *= 0.85; ell(g, 63, -125, 12, 6, 0.15, grey); ell(g, 59, -117 + 14 * jaw, 8, 4.5, jaw, grey); g.restore();   // grey lips and chin (he's old)
    g.strokeStyle = alpha('#3a3a46', 0.9); g.lineWidth = 2.2; g.beginPath(); g.moveTo(31, -151); g.quadraticCurveTo(11, -141, 18, -107); g.stroke();   // ear edge
    circle(g, 79, -135, 2.4, alpha('#ffffff', 0.5));                      // nose shine
    const ex = 47, ey = -140;
    if (o.eyes === 'happy') { g.strokeStyle = WHITE; g.lineWidth = 3.4; g.lineCap = 'round'; g.beginPath(); g.arc(ex, ey + 2, 5, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); }
    else if (o.eyes === 'closed') seg(g, [[ex - 5, ey], [ex + 5, ey]], 3, WHITE);
    else circle(g, ex, ey, 4.8, WHITE);
    if (o.brows === 'sad') seg(g, [[ex - 6, ey - 8], [ex + 6, ey - 12]], 3.4, grey);
    else seg(g, [[ex - 6, ey - 11], [ex + 6, ey - 10]], 3.4, grey);
    circle(g, ex - 1, ey + 9, 2.2, alpha(grey, 0.6));                     // grey under the eye
    seg(g, [[6, -110], [39, -94]], 8, '#D64A33');                         // red collar
    circle(g, 37, -88, 5.5, '#F2C21A'); circle(g, 37, -88, 2, '#b8901a'); // gold tag
  });
}

// PICKLES — the family cat, black and white, permanently unimpressed. o: { eyes: 'lid'|'wide' }
export function cat(g, o = {}) {
  creature(g, { shadowW: 40, ...o }, (g, c) => {
    g.strokeStyle = c; g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(-26, -12); g.quadraticCurveTo(-48, -2, -18, 2); g.quadraticCurveTo(12, 4, 32, -3); g.stroke();   // tail round the paws
    ell(g, -8, -27, 28, 27, 0, c);                                        // haunch
    ell(g, 10, -50, 17, 31, 0.15, c);                                     // chest
    seg(g, [[5, -38], [7, -5]], 7, c); seg(g, [[14, -38], [17, -5]], 8, c);   // front legs
    circle(g, 18, -88, 19, c);                                            // head
    poly(g, [[5, -99], [7, -124], [20, -104]], c); poly(g, [[18, -105], [30, -124], [34, -97]], c);   // ears
    circle(g, 31, -83, 9, c);                                             // muzzle
  }, (g, ink) => {
    ell(g, 20, -48, 8, 18, 0.15, WHITE);                                  // white bib
    ell(g, 19, -4, 6, 4, 0, WHITE); ell(g, 9, -4, 5, 3.5, 0, WHITE);      // white paws
    ell(g, 33, -80, 7, 6, 0, WHITE);                                      // white muzzle
    const ex = 25, ey = -92;
    circle(g, ex, ey, 5, WHITE);
    if (o.eyes !== 'wide') { g.fillStyle = ink; g.fillRect(ex - 6, ey - 6.5, 12, 6.2); seg(g, [[ex - 6, ey - 0.6], [ex + 6, ey - 0.6]], 1.6, ink); }   // heavy lid
    else circle(g, ex + 1, ey, 2.2, ink);
    circle(g, 39, -85, 2.6, '#e07a8a');                                   // nose
    g.strokeStyle = alpha('#e8e8f0', 0.55); g.lineWidth = 1.2; for (const dy of [-2, 3]) { g.beginPath(); g.moveTo(36, -80 + dy); g.lineTo(54, -82 + dy * 2); g.stroke(); }
  });
}

// CROW — glossy black, blue sheen; o.gift = a piece of blue glass in the beak
export function crow(g, o = {}) {
  creature(g, { shadowW: 22, ...o }, (g, c) => {
    poly(g, [[-14, -22], [-46, -13], [-42, -7], [-12, -14]], c);          // tail
    ell(g, 0, -25, 23, 14, -0.25, c);                                     // body
    circle(g, 20, -41, 10, c);                                            // head
    poly(g, [[26, -46], [45, -40], [26, -35]], c);                        // beak
    seg(g, [[-2, -13], [-3, 0]], 2.6, c); seg(g, [[6, -13], [7, 0]], 2.6, c);   // legs
  }, (g) => {
    g.strokeStyle = alpha('#6a7ae8', 0.55); g.lineWidth = 3; g.beginPath(); g.arc(-2, -25, 14, Math.PI * 1.02, Math.PI * 1.62); g.stroke();   // blue sheen
    circle(g, 23, -43, 2.6, WHITE);
    if (o.gift) poly(g, [[40, -42], [50, -46], [52, -38], [43, -36]], '#5ac8f0');
  });
}

// PIGEON — plump, green-purple neck
export function pigeon(g, o = {}) {
  creature(g, { shadowW: 22, ...o }, (g, c) => {
    poly(g, [[-14, -20], [-38, -16], [-36, -10], [-12, -14]], c);         // tail
    ell(g, 0, -23, 22, 16, -0.15, c);                                     // body
    seg(g, [[10, -30], [17, -38]], 13, c);                                // neck
    circle(g, 19, -41, 8, c);                                             // head
  }, (g) => {
    seg(g, [[9, -30], [15, -37]], 7, alpha('#3fa07a', 0.75)); seg(g, [[8, -27], [12, -31]], 6, alpha('#8a5ad6', 0.6));   // neck sheen
    poly(g, [[25, -43], [32, -40], [25, -38]], '#c8b8a8');                // beak
    circle(g, 21, -43, 2.2, WHITE);
    seg(g, [[-1, -9], [-2, 0]], 2.4, '#c86a6a'); seg(g, [[6, -9], [7, 0]], 2.4, '#c86a6a');   // pink legs
  });
}

// SQUIRREL — sitting up, bushy tail, holding your lost house key
export function squirrel(g, o = {}) {
  creature(g, { shadowW: 22, ...o }, (g, c) => {
    for (const [x, y, r] of [[-12, -10, 9], [-20, -24, 12], [-24, -42, 14], [-20, -60, 14], [-10, -72, 12], [-2, -78, 9]]) circle(g, x, y, r, c);   // tail
    ell(g, 4, -24, 13, 21, 0.15, c);                                      // body
    circle(g, 13, -50, 10, c);                                            // head
    poly(g, [[8, -57], [10, -67], [15, -58]], c);                         // ear
    ell(g, 21, -48, 6, 4.5, 0, c);                                        // snout
    seg(g, [[10, -36], [19, -36]], 5, c);                                 // arms
    ell(g, 8, -3, 11, 4, 0, c);                                           // feet
  }, (g) => {
    circle(g, 16, -52, 2.2, WHITE);
    g.strokeStyle = '#F2C21A'; g.lineWidth = 2.2; g.beginPath(); g.arc(23, -40, 4, 0, Math.PI * 2); g.stroke(); seg(g, [[23, -36], [24, -24]], 2.4, '#F2C21A'); seg(g, [[24, -28], [27, -28]], 2, '#F2C21A');   // key
  });
}

// PRAIRIE DOG — standing up on its hind legs, on lookout
export function prairieDog(g, o = {}) {
  creature(g, { shadowW: 18, ...o }, (g, c) => {
    seg(g, [[-12, -8], [-23, -4]], 6, c);                                 // tail
    ell(g, 0, -20, 19, 19, 0, c); ell(g, 1, -42, 14, 26, 0.05, c);        // pear-shaped body
    circle(g, 3, -72, 11, c); circle(g, -3, -81, 3.5, c);                 // head, round ear
    ell(g, 12, -70, 5.5, 4.5, 0, c);                                      // snout
    seg(g, [[6, -54], [13, -46]], 5, c); seg(g, [[2, -54], [9, -45]], 4.5, c);   // paws held in front
    ell(g, 4, -3, 11, 4, 0, c);                                           // feet
  }, (g) => {
    ell(g, 6, -30, 8, 17, 0, alpha('#c8a070', 0.5));                      // sandy belly
    circle(g, 7, -75, 2.2, WHITE);
  });
}

// WHALE — a sperm whale's tail fluke rising out of the sea (seen far away through a window)
export function whaleTail(g, x, y, s = 1, color = '#1a2238') {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.moveTo(-6, 0); g.quadraticCurveTo(-4, -30, -2, -46); g.quadraticCurveTo(-30, -52, -52, -70); g.quadraticCurveTo(-20, -74, 0, -58);
  g.quadraticCurveTo(20, -74, 52, -70); g.quadraticCurveTo(30, -52, 2, -46); g.quadraticCurveTo(4, -30, 6, 0); g.closePath(); g.fill();
  g.restore();
}
