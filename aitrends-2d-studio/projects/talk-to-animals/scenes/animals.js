// animals.js — the talking animals for "What If You Could Talk to Animals?" (v2 look, Oct 21): flat natural colours
// with a darker shade and a light side, a rim light, and eyes with a glint (like the colour animals in the user's
// reference videos). All face right at facing = 1; y is the floor. Each shape(g, K, pass) asks K(name) for a colour:
// the rim pass gets the rim colour for everything, the main pass gets the animal's palette.
import { seg, circle, poly, alpha, clamp } from '/engine/core.js';

const RIM = { dir: [-0.8, -0.5], w: 4.5, color: '#ffc68a' };
const WHITE = '#f6f2ea';

function creature(g, o, pal, shape, detail) {
  const { x, y, s = 1, facing: f = 1 } = o, rim = o.rim === false ? null : { ...RIM, ...(o.rim || {}) };
  g.save(); if (o.alpha != null) g.globalAlpha *= o.alpha;
  if (o.shadow !== false) { g.fillStyle = 'rgba(0,0,0,.26)'; g.beginPath(); g.ellipse(x, y + 2, (o.shadowW || 40) * s, 6 * s, 0, 0, Math.PI * 2); g.fill(); }
  if (rim) { g.save(); g.translate(x + rim.dir[0] * rim.w, y + rim.dir[1] * rim.w); g.scale(f * s, s); shape(g, () => rim.color, 'sil'); g.restore(); }
  g.save(); g.translate(x, y); g.scale(f * s, s); shape(g, (k) => pal[k] || k, 'main'); if (detail) detail(g, (k) => pal[k] || k); g.restore();
  g.restore();
}
const ell = (g, x, y, rx, ry, rot, c) => { g.fillStyle = c; g.beginPath(); g.ellipse(x, y, rx, ry, rot, 0, Math.PI * 2); g.fill(); };
const eye = (g, x, y, r, iris = '#2a1a14') => { circle(g, x, y, r, iris); circle(g, x + r * 0.35, y - r * 0.35, r * 0.36, '#ffffff'); };
// world position of an animal's head (for speech bubbles)
export function animalHead(kind, o) {
  const H = { dog: [44, -134], cat: [20, -88], crow: [20, -40], pigeon: [18, -38], squirrel: [12, -48], prairie: [3, -72] }[kind];
  const s = o.s ?? 1, f = o.facing ?? 1; return [o.x + H[0] * f * s, o.y + H[1] * s];
}

// BISCUIT — 14-year-old yellow Labrador mix with a white old-dog face, red collar, gold tag. Sitting.
// o: { t, talk 0..1, wag 0..1, eyes: 'open'|'happy'|'closed'|'tired', brows: 'sad' }
const DOG = { base: '#d9a35a', dark: '#b07a3a', light: '#efc983', ear: '#bf8642', muzzle: '#f3e8d2', nose: '#2a1e1e', collar: '#D64A33', tag: '#F2C21A', mouth: '#4a1820', tongue: '#e07a8a' };
export function dog(g, o = {}) {
  const { t = 0, talk = 0, wag = 0 } = o, jaw = clamp(talk) * 0.38;
  creature(g, { shadowW: 72, ...o }, DOG, (g, K, pass) => {
    g.save(); g.translate(-60, -16); g.rotate(Math.sin(t * 9) * 0.22 * wag); seg(g, [[0, 0], [-28, 8], [-56, 6]], 12, K('dark')); g.restore();   // tail on the floor
    ell(g, -30, -40, 44, 39, -0.2, K('base'));                                    // haunch
    seg(g, [[-26, -52], [14, -94]], 52, K('base'));                               // back
    circle(g, 22, -82, 27, K('light'));                                           // chest
    if (pass === 'main') { ell(g, -34, -24, 30, 14, -0.1, K('dark')); ell(g, -40, -62, 18, 12, -0.4, K('light')); }   // haunch shade + highlight
    ell(g, -2, -6, 23, 8, 0, K('dark'));                                          // hind foot
    seg(g, [[10, -72], [12, -5]], 13, K('dark')); seg(g, [[27, -72], [31, -5]], 14, K('base'));   // front legs
    ell(g, 17, -5, 10, 6, 0, K('dark')); ell(g, 36, -5, 11, 6, 0, K('light'));    // paws
    seg(g, [[16, -90], [34, -126]], 32, K('base'));                               // neck
    circle(g, 40, -134, 25, K('base'));                                           // head
    if (pass === 'main' && jaw > 0.02) {
      g.fillStyle = K('mouth'); g.beginPath(); g.moveTo(52, -122); g.lineTo(74, -124); g.lineTo(52 + Math.cos(jaw) * 22, -122 + Math.sin(jaw) * 22); g.fill();
      ell(g, 60 + 5 * jaw, -120 + 8 * jaw, 8, 3.5, jaw, K('tongue'));
    }
    seg(g, [[52, -134], [72, -129]], 23, K('muzzle'));                            // white muzzle (old dog)
    g.save(); g.translate(52, -122); g.rotate(jaw); seg(g, [[0, 0], [19, 2]], 13, K('muzzle')); g.restore();   // chin
    circle(g, 77, -132, 8, K('nose'));
    g.fillStyle = K('ear'); g.beginPath(); g.moveTo(30, -152); g.quadraticCurveTo(10, -142, 17, -106); g.quadraticCurveTo(31, -108, 39, -130); g.closePath(); g.fill();   // floppy ear
  }, (g, K) => {
    circle(g, 79, -135, 2.4, alpha('#ffffff', 0.55));                             // nose shine
    const ex = 47, ey = -140;
    ell(g, ex, ey - 1, 8, 7, 0, K('muzzle'));                                     // white around the eye
    if (o.eyes === 'happy') { g.strokeStyle = '#2a1a14'; g.lineWidth = 3.2; g.lineCap = 'round'; g.beginPath(); g.arc(ex, ey + 2, 5, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); }
    else if (o.eyes === 'closed') seg(g, [[ex - 5, ey], [ex + 5, ey]], 3, '#2a1a14');
    else { eye(g, ex, ey, 5); if (o.eyes === 'tired') { g.fillStyle = K('muzzle'); g.fillRect(ex - 6, ey - 7, 12, 5); } }
    if (o.brows === 'sad') seg(g, [[ex - 6, ey - 9], [ex + 6, ey - 13]], 3.4, K('dark'));
    seg(g, [[6, -110], [39, -94]], 8, K('collar'));
    circle(g, 37, -88, 5.5, K('tag')); circle(g, 37, -88, 2, '#b8901a');
  });
}

// PICKLES — black-and-white tuxedo cat, green eyes, permanently unimpressed. o: { eyes: 'lid'|'wide' }
const CAT = { fur: '#1d1b22', white: WHITE, eye: '#9ad46a', nose: '#e07a8a' };
export function cat(g, o = {}) {
  creature(g, { shadowW: 40, ...o }, CAT, (g, K) => {
    g.strokeStyle = K('fur'); g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(-26, -12); g.quadraticCurveTo(-48, -2, -18, 2); g.quadraticCurveTo(12, 4, 32, -3); g.stroke();   // tail
    ell(g, -8, -27, 28, 27, 0, K('fur'));                                         // haunch
    ell(g, 10, -50, 17, 31, 0.15, K('fur'));                                      // chest
    seg(g, [[5, -38], [7, -5]], 7, K('fur')); seg(g, [[14, -38], [17, -5]], 8, K('fur'));
    circle(g, 18, -88, 19, K('fur'));
    poly(g, [[5, -99], [7, -124], [20, -104]], K('fur')); poly(g, [[18, -105], [30, -124], [34, -97]], K('fur'));
    circle(g, 31, -83, 9, K('fur'));
  }, (g, K) => {
    poly(g, [[9, -103], [10, -117], [17, -105]], '#5a3a44'); poly(g, [[21, -105], [28, -117], [30, -100]], '#5a3a44');   // inner ears
    ell(g, 20, -48, 8, 18, 0.15, K('white')); ell(g, 19, -4, 6, 4, 0, K('white')); ell(g, 9, -4, 5, 3.5, 0, K('white'));
    ell(g, 33, -80, 7, 6, 0, K('white'));
    const ex = 25, ey = -92;
    ell(g, ex, ey, 5.5, 5, 0, K('eye')); ell(g, ex + 1, ey, 1.4, 4, 0, '#101014');
    if (o.eyes !== 'wide') { g.fillStyle = K('fur'); g.fillRect(ex - 6.5, ey - 6.5, 13, 6.2); }   // heavy lid
    circle(g, 39, -85, 2.6, K('nose'));
    g.strokeStyle = alpha('#f0f0f6', 0.6); g.lineWidth = 1.2; for (const dy of [-2, 3]) { g.beginPath(); g.moveTo(36, -80 + dy); g.lineTo(54, -82 + dy * 2); g.stroke(); }
  });
}

// CROW — glossy black with a blue sheen; o.gift = a piece of blue glass in the beak
const CROW = { body: '#17171f', sheen: '#5a6ad8', beak: '#2c2c36' };
export function crow(g, o = {}) {
  creature(g, { shadowW: 22, ...o }, CROW, (g, K) => {
    poly(g, [[-14, -22], [-46, -13], [-42, -7], [-12, -14]], K('body'));
    ell(g, 0, -25, 23, 14, -0.25, K('body'));
    circle(g, 20, -41, 10, K('body'));
    poly(g, [[26, -46], [45, -40], [26, -35]], K('beak'));
    seg(g, [[-2, -13], [-3, 0]], 2.6, K('body')); seg(g, [[6, -13], [7, 0]], 2.6, K('body'));
  }, (g, K) => {
    g.strokeStyle = alpha(K('sheen'), 0.6); g.lineWidth = 3.2; g.beginPath(); g.arc(-2, -25, 14, Math.PI * 1.02, Math.PI * 1.62); g.stroke();
    eye(g, 23, -43, 2.8, '#3a2a20');
    if (o.gift) poly(g, [[40, -42], [50, -46], [52, -38], [43, -36]], '#5ac8f0');
  });
}

// PIGEON — blue-grey, dark wing bars, green-purple neck, orange eye, pink feet
const PIGEON = { body: '#8e97a8', wing: '#7a8396', bar: '#454b5a', head: '#7c8597', beak: '#d8cfc4', feet: '#d8707a' };
export function pigeon(g, o = {}) {
  creature(g, { shadowW: 22, ...o }, PIGEON, (g, K) => {
    poly(g, [[-14, -20], [-38, -16], [-36, -10], [-12, -14]], K('bar'));
    ell(g, 0, -23, 22, 16, -0.15, K('body'));
    seg(g, [[10, -30], [17, -38]], 13, K('head'));
    circle(g, 19, -41, 8, K('head'));
  }, (g, K) => {
    ell(g, -5, -25, 15, 9, -0.2, K('wing')); seg(g, [[-14, -22], [2, -27]], 2.6, K('bar')); seg(g, [[-12, -17], [4, -22]], 2.6, K('bar'));
    seg(g, [[9, -30], [15, -37]], 7, alpha('#3fa07a', 0.85)); seg(g, [[8, -27], [12, -31]], 6, alpha('#8a5ad6', 0.7));
    poly(g, [[25, -43], [32, -40], [25, -38]], K('beak'));
    eye(g, 21, -43, 2.4, '#e8892a');
    seg(g, [[-1, -9], [-2, 0]], 2.4, K('feet')); seg(g, [[6, -9], [7, 0]], 2.4, K('feet'));
  });
}

// SQUIRREL — red squirrel, cream belly, ear tufts, holding your lost house key
const SQ = { fur: '#c4682e', dark: '#9a4a1e', belly: '#f0dcc0', key: '#F2C21A' };
export function squirrel(g, o = {}) {
  creature(g, { shadowW: 22, ...o }, SQ, (g, K) => {
    for (const [x, y, r] of [[-12, -10, 9], [-20, -24, 12], [-24, -42, 14], [-20, -60, 14], [-10, -72, 12], [-2, -78, 9]]) circle(g, x, y, r, K('dark'));   // tail
    ell(g, 4, -24, 13, 21, 0.15, K('fur'));
    circle(g, 13, -50, 10, K('fur'));
    poly(g, [[8, -57], [9, -70], [15, -58]], K('fur'));
    ell(g, 21, -48, 6, 4.5, 0, K('fur'));
    seg(g, [[10, -36], [19, -36]], 5, K('fur'));
    ell(g, 8, -3, 11, 4, 0, K('dark'));
  }, (g, K) => {
    for (const [x, y, r] of [[-24, -42, 8], [-20, -60, 8]]) circle(g, x - 3, y, r, alpha('#e08a50', 0.6));   // tail highlight
    ell(g, 8, -22, 7, 14, 0.15, K('belly'));
    eye(g, 16, -52, 2.4);
    circle(g, 26, -48, 1.8, '#3a2018');
    g.strokeStyle = K('key'); g.lineWidth = 2.2; g.beginPath(); g.arc(23, -40, 4, 0, Math.PI * 2); g.stroke(); seg(g, [[23, -36], [24, -24]], 2.4, K('key')); seg(g, [[24, -28], [27, -28]], 2, K('key'));
  });
}

// PRAIRIE DOG — sandy, standing up on lookout, paws held in front
const PD = { fur: '#c99a5e', belly: '#ead2a4', tip: '#2a2018' };
export function prairieDog(g, o = {}) {
  creature(g, { shadowW: 18, ...o }, PD, (g, K) => {
    seg(g, [[-12, -8], [-23, -4]], 6, K('tip'));
    ell(g, 0, -20, 19, 19, 0, K('fur')); ell(g, 1, -42, 14, 26, 0.05, K('fur'));
    circle(g, 3, -72, 11, K('fur')); circle(g, -3, -81, 3.5, K('fur'));
    ell(g, 12, -70, 5.5, 4.5, 0, K('fur'));
    seg(g, [[6, -54], [13, -46]], 5, K('fur')); seg(g, [[2, -54], [9, -45]], 4.5, K('fur'));
    ell(g, 4, -3, 11, 4, 0, K('fur'));
  }, (g, K) => {
    ell(g, 6, -30, 8, 17, 0, K('belly'));
    eye(g, 7, -75, 2.3);
    circle(g, 16, -71, 1.6, '#3a2018');
  });
}

// WHALE — a sperm whale's tail fluke rising out of the sea (seen far away through a window)
export function whaleTail(g, x, y, s = 1, color = '#2a2a48') {
  g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = color;
  g.beginPath(); g.moveTo(-6, 0); g.quadraticCurveTo(-4, -30, -2, -46); g.quadraticCurveTo(-30, -52, -52, -70); g.quadraticCurveTo(-20, -74, 0, -58);
  g.quadraticCurveTo(20, -74, 52, -70); g.quadraticCurveTo(30, -52, 2, -46); g.quadraticCurveTo(4, -30, 6, 0); g.closePath(); g.fill();
  g.restore();
}
