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
const PUP = { base: '#e8bb70', dark: '#c99450', light: '#f6dca0', ear: '#d09a52', muzzle: '#e8bb70' };   // young Biscuit (no white face yet)
const DOG = { base: '#d9a35a', dark: '#b07a3a', light: '#efc983', ear: '#bf8642', muzzle: '#f3e8d2', nose: '#2a1e1e', collar: '#D64A33', tag: '#F2C21A', mouth: '#4a1820', tongue: '#e07a8a' };
export function dog(g, o = {}) {
  const { t = 0, talk = 0, wag = 0 } = o, jaw = clamp(talk) * 0.38;
  creature(g, { shadowW: 72, ...o }, { ...DOG, ...(o.young ? PUP : {}), ...(o.pal || {}) }, (g, K, pass) => {
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

// BISCUIT lying down (sphinx pose), head up or resting on the paws. o: { head: 'up'|'down', eyes, t, wag, talk, young, pal }
export function dogLie(g, o = {}) {
  const { t = 0, wag = 0, talk = 0 } = o, down = o.head === 'down', jaw = clamp(talk) * 0.3;
  creature(g, { shadowW: 90, ...o }, { ...DOG, ...(o.young ? PUP : {}), ...(o.pal || {}) }, (g, K, pass) => {
    g.save(); g.translate(-82, -14); g.rotate(Math.sin(t * 8) * 0.25 * wag); seg(g, [[0, 0], [-30, 6], [-58, 4]], 12, K('dark')); g.restore();
    ell(g, 0, -28, 88, 30, 0, K('base'));                                       // body
    ell(g, -52, -30, 36, 28, 0, K('base'));                                     // haunch
    if (pass === 'main') { ell(g, -50, -22, 26, 14, 0, K('dark')); ell(g, 10, -44, 54, 10, 0, K('light')); }
    seg(g, [[40, -16], [96, -6]], 14, K('base')); ell(g, 100, -6, 14, 7, 0, K('light'));   // front legs + paws
    seg(g, [[30, -18], [86, -4]], 13, K('dark')); ell(g, 88, -4, 13, 6, 0, K('dark'));
    const hx = down ? 92 : 78, hy = down ? -30 : -70;
    seg(g, [[50, -40], [hx - 12, hy + 10]], 30, K('base'));                    // neck
    circle(g, hx, hy, 24, K('base'));
    seg(g, [[hx + 10, hy + 2], [hx + 30, hy + 6]], 22, K('muzzle'));
    g.save(); g.translate(hx + 10, hy + 12); g.rotate(jaw); seg(g, [[0, 0], [18, 2]], 12, K('muzzle')); g.restore();
    circle(g, hx + 35, hy + 4, 7.5, K('nose'));
    g.fillStyle = K('ear'); g.beginPath(); g.moveTo(hx - 10, hy - 18); g.quadraticCurveTo(hx - 30, hy - 6, hx - 22, hy + 26); g.quadraticCurveTo(hx - 8, hy + 22, hx - 2, hy - 2); g.closePath(); g.fill();
  }, (g, K) => {
    const hx = down ? 92 : 78, hy = down ? -30 : -70, ex = hx + 7, ey = hy - 6;
    ell(g, ex, ey - 1, 7.5, 6.5, 0, K('muzzle'));
    if (o.eyes === 'closed') seg(g, [[ex - 5, ey], [ex + 5, ey + 1]], 3, '#2a1a14');
    else if (o.eyes === 'happy') { g.strokeStyle = '#2a1a14'; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath(); g.arc(ex, ey + 2, 4.5, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); }
    else { eye(g, ex, ey, 4.6); if (o.eyes === 'tired') { g.fillStyle = K('muzzle'); g.fillRect(ex - 6, ey - 7, 12, 5); } }
    circle(g, hx + 37, hy + 1, 2.2, alpha('#ffffff', 0.55));
    seg(g, [[hx - 22, hy + 16], [hx - 4, hy + 24]], 7, K('collar')); circle(g, hx - 6, hy + 30, 4.5, K('tag'));
  });
}

// a dog standing / walking (any palette): o: { t, walk 0..1, run, pal, young, eyes, talk, wag, tired }
export function dogStand(g, o = {}) {
  const { t = 0, walk = 0, wag = 0, talk = 0 } = o, ph = t * (o.run ? 14 : 8), sw = walk * (o.run ? 0.55 : 0.35), jaw = clamp(talk) * 0.35;
  creature(g, { shadowW: 70, ...o }, { ...DOG, ...(o.young ? PUP : {}), ...(o.pal || {}) }, (g, K, pass) => {
    const leg = (x, a, c) => { g.save(); g.translate(x, -46); g.rotate(a); seg(g, [[0, 0], [0, 26], [2, 44]], 12, c); ell(g, 5, 45, 9, 5, 0, c); g.restore(); };
    leg(-46, Math.sin(ph) * sw, K('dark')); leg(30, -Math.sin(ph) * sw, K('dark'));
    g.save(); g.translate(-62, -70); g.rotate(-0.6 + Math.sin(t * 9) * 0.3 * wag); seg(g, [[0, 0], [-22, -14], [-38, -16]], 10, K('base')); g.restore();
    ell(g, -8, -66, 62, 26, 0, K('base'));
    if (pass === 'main') { ell(g, -12, -52, 50, 10, 0, K('dark')); ell(g, -6, -80, 40, 8, 0, K('light')); }
    leg(-36, -Math.sin(ph) * sw, K('base')); leg(40, Math.sin(ph) * sw, K('base'));
    seg(g, [[38, -76], [60, -104]], 26, K('base'));
    circle(g, 66, -110, 21, K('base'));
    seg(g, [[74, -108], [94, -103]], 19, K('muzzle'));
    g.save(); g.translate(76, -98); g.rotate(jaw); seg(g, [[0, 0], [16, 2]], 11, K('muzzle')); g.restore();
    circle(g, 98, -106, 7, K('nose'));
    g.fillStyle = K('ear'); g.beginPath(); g.moveTo(58, -126); g.quadraticCurveTo(40, -116, 46, -86); g.quadraticCurveTo(58, -88, 64, -106); g.closePath(); g.fill();
  }, (g, K) => {
    const ex = 72, ey = -116;
    ell(g, ex, ey, 7, 6, 0, K('muzzle'));
    if (o.eyes === 'happy') { g.strokeStyle = '#2a1a14'; g.lineWidth = 3; g.lineCap = 'round'; g.beginPath(); g.arc(ex, ey + 2, 4.5, Math.PI * 1.1, Math.PI * 1.9); g.stroke(); }
    else eye(g, ex, ey, 4.4);
    if (o.collar !== false) seg(g, [[44, -100], [62, -88]], 7, K('collar'));
  });
}

// PICKLES from behind (sitting at a window): ears, back, tail curled
export function catBack(g, o = {}) {
  creature(g, { shadowW: 40, ...o }, CAT, (g, K) => {
    ell(g, 0, -30, 30, 30, 0, K('fur')); ell(g, 0, -62, 20, 24, 0, K('fur'));
    circle(g, 0, -92, 19, K('fur'));
    const ears = o.flat ? [[-20, -96], [20, -96]] : [[-12, -118], [12, -118]];
    poly(g, [[-16, -100], ears[0], [-4, -106]], K('fur')); poly(g, [[16, -100], ears[1], [4, -106]], K('fur'));
    g.strokeStyle = K('fur'); g.lineWidth = 9; g.lineCap = 'round'; g.beginPath(); g.moveTo(18, -6); g.quadraticCurveTo(46, -2, 40, -28); g.stroke();
  }, () => {});
}

// CROW flying: o: { t, flap speed }
export function crowFly(g, o = {}) {
  const { t = 0 } = o, w = Math.sin(t * (o.speed || 14));
  creature(g, { shadowW: 0, shadow: false, ...o }, CROW, (g, K) => {
    poly(g, [[-18, -2], [-44, -8], [-44, 4], [-18, 4]], K('body'));
    ell(g, 0, 0, 24, 10, 0, K('body'));
    circle(g, 22, -4, 9, K('body')); poly(g, [[28, -8], [44, -3], [28, 1]], K('beak'));
    g.fillStyle = K('body'); g.beginPath(); g.moveTo(-8, -4); g.quadraticCurveTo(0, -30 * w - 10, 14, -50 * w - 6); g.lineTo(10, -4); g.fill();
    g.beginPath(); g.moveTo(-10, -2); g.quadraticCurveTo(-4, -26 * w - 6, 4, -42 * w); g.lineTo(4, -2); g.fill();
  }, (g) => { if (o.sandwich) { rr(g, 32, 0, 26, 12, 4); g.fillStyle = '#e8c890'; g.fill(); g.fillStyle = '#6aa04a'; g.fillRect(32, 4, 26, 3); } eye(g, 24, -6, 2.4, '#3a2a20'); });
}

// small songbird (robin / sparrow): o: { color (breast), back, open 0..1 (beak), t }
export function bird(g, o = {}) {
  const P = { back: o.back || '#7a5a44', breast: o.color || '#e8743a', beak: '#3a2a20' }, open = clamp(o.open || 0);
  creature(g, { shadowW: 14, ...o }, P, (g, K) => {
    poly(g, [[-10, -14], [-28, -10], [-26, -5], [-8, -9]], K('back'));
    ell(g, 0, -16, 14, 11, -0.2, K('back'));
    circle(g, 12, -26, 8, K('back'));
    seg(g, [[-1, -6], [-2, 0]], 2, K('beak')); seg(g, [[4, -6], [5, 0]], 2, K('beak'));
  }, (g, K) => {
    ell(g, 5, -14, 8, 7, 0, K('breast'));
    g.fillStyle = K('beak'); g.beginPath(); g.moveTo(18, -28 - open * 3); g.lineTo(28, -27); g.lineTo(18, -25); g.fill(); g.beginPath(); g.moveTo(18, -25); g.lineTo(26, -23 + open * 4); g.lineTo(18, -22); g.fill();
    eye(g, 14, -28, 2, '#1a1410');
  });
}

// MOSQUITO (wings a blur)
export function mosquito(g, o = {}) {
  const { t = 0 } = o;
  creature(g, { shadow: false, rim: false, ...o }, { b: '#3a3238', l: '#2a2428' }, (g, K) => {
    for (const [dx, a] of [[-6, 0.5], [0, 0.2], [6, -0.1]]) { seg(g, [[dx, 0], [dx - 12, 22], [dx - 16, 44]], 2, K('l')); seg(g, [[dx, 0], [dx + 14, 20], [dx + 22, 40]], 2, K('l')); }
    ell(g, -22, -2, 22, 6, 0.15, K('b')); ell(g, 6, -4, 9, 7, 0, K('b')); circle(g, 18, -6, 6, K('b'));
    seg(g, [[22, -4], [46, 6]], 1.8, K('l'));
  }, (g) => {
    g.save(); g.globalAlpha *= 0.35; g.fillStyle = '#dfe8f0'; for (const k of [-1, 1]) { g.beginPath(); g.ellipse(2, -16 + Math.sin(t * 90) * 3, 22, 7, k * 0.5 - 0.3, 0, Math.PI * 2); g.fill(); } g.restore();
    circle(g, 21, -8, 2.5, '#c84a4a');
  });
}

// RABBIT sitting
export function rabbit(g, o = {}) {
  const P = { fur: o.color || '#d8c8b8', dark: '#b8a898', inner: '#e8a0a8' };
  creature(g, { shadowW: 28, ...o }, P, (g, K) => {
    ell(g, -6, -22, 26, 22, 0, K('fur')); circle(g, -30, -18, 8, '#f6f2ea');
    circle(g, 14, -42, 15, K('fur'));
    ell(g, 6, -72, 6, 20, -0.15, K('fur')); ell(g, 16, -72, 6, 20, 0.1, K('fur'));
    ell(g, 8, -4, 12, 5, 0, K('dark'));
  }, (g, K) => { ell(g, 6, -72, 3, 14, -0.15, K('inner')); eye(g, 20, -45, 3); circle(g, 28, -40, 2, '#c87080'); });
}

// VERVET MONKEY sitting; o.look: 'up' | 'down' | 'front'
export function monkey(g, o = {}) {
  const P = { fur: '#8a8a72', dark: '#6a6a58', face: '#2a2420', light: '#d8d4c4' }, up = o.look === 'up' ? -1 : o.look === 'down' ? 1 : 0;
  creature(g, { shadowW: 30, ...o }, P, (g, K) => {
    g.strokeStyle = K('dark'); g.lineWidth = 7; g.lineCap = 'round'; g.beginPath(); g.moveTo(-18, -8); g.quadraticCurveTo(-60, 0, -50, -50); g.stroke();
    ell(g, 0, -34, 22, 30, 0, K('fur'));
    seg(g, [[8, -40], [18, -10]], 8, K('dark')); seg(g, [[-6, -12], [12, -2]], 9, K('dark'));
    g.save(); g.translate(8, -72); g.rotate(up * 0.45); circle(g, 0, 0, 18, K('light')); ell(g, 6, 2, 11, 12, 0, K('face')); g.restore();
  }, (g) => { g.save(); g.translate(8, -72); g.rotate(up * 0.45); circle(g, 4, -2, 2.4, '#f2d080'); circle(g, 11, -2, 2.4, '#f2d080'); g.restore(); });
}

// HONEYBEE (wings a blur)
export function bee(g, x, y, s = 1, t = 0, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s);
  g.save(); g.globalAlpha *= 0.5; g.fillStyle = '#eaf4ff'; g.beginPath(); g.ellipse(-2, -12 + Math.sin(t * 80) * 2, 10, 6, -0.4, 0, Math.PI * 2); g.fill(); g.beginPath(); g.ellipse(4, -12, 9, 5, 0.4, 0, Math.PI * 2); g.fill(); g.restore();
  ell(g, 0, 0, 14, 9, 0, '#f2b81a'); for (const dx of [-5, 3]) { g.fillStyle = '#2a2018'; g.fillRect(dx, -8, 4, 16); }
  circle(g, 14, -1, 6, '#2a2018'); g.restore();
}

// ELEPHANT standing; o: { trunk 'down'|'up', t, ears 0..1 }
export function elephant(g, o = {}) {
  const P = { skin: o.color || '#9a948e', dark: '#7a746e', tusk: '#f2ead8' }, up = o.trunk === 'up';
  creature(g, { shadowW: 130, ...o }, P, (g, K, pass) => {
    for (const x of [-70, 40]) { rr(g, x - 16, -120, 34, 120, 14); g.fillStyle = K('dark'); g.fill(); }
    ell(g, -10, -160, 110, 72, 0, K('skin'));
    for (const x of [-50, 60]) { rr(g, x - 17, -120, 36, 120, 14); g.fillStyle = K('skin'); g.fill(); }
    circle(g, 100, -190, 52, K('skin'));
    g.strokeStyle = K('skin'); g.lineWidth = 26; g.lineCap = 'round'; g.beginPath(); g.moveTo(135, -175);
    if (up) g.quadraticCurveTo(190, -190, 175, -260); else g.quadraticCurveTo(160, -100, 150, -40); g.stroke();
    g.fillStyle = K('dark'); g.beginPath(); g.ellipse(66, -186, 38 + 6 * (o.ears || 0), 50, -0.2, 0, Math.PI * 2); g.fill();
    if (pass === 'main') { ell(g, -10, -110, 90, 18, 0, alpha('#000000', 0.08)); }
  }, (g, K) => { g.strokeStyle = K('tusk'); g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(128, -160); g.quadraticCurveTo(150, -130, 170, -138); g.stroke(); eye(g, 114, -204, 4); });
}

// SPERM WHALE (side view, swimming right); o.calf = smaller and lighter
export function spermWhale(g, x, y, s = 1, o = {}) {
  const c = o.color || (o.calf ? '#6a7a92' : '#4a5670'), t = o.t || 0;
  g.save(); g.translate(x, y); g.scale(s, s);
  g.fillStyle = c; g.beginPath(); g.moveTo(160, -40); g.lineTo(160, 30); g.quadraticCurveTo(80, 60, -60, 30); g.quadraticCurveTo(-160, 16, -220, 0);
  g.quadraticCurveTo(-160, -20, -60, -34); g.quadraticCurveTo(60, -56, 160, -40); g.closePath(); g.fill();
  g.save(); g.translate(-220, 0); g.rotate(Math.sin(t * 2) * 0.25); g.beginPath(); g.moveTo(0, 0); g.quadraticCurveTo(-30, -40, -60, -46); g.quadraticCurveTo(-36, -10, -40, 0); g.quadraticCurveTo(-36, 10, -60, 46); g.quadraticCurveTo(-30, 40, 0, 0); g.fill(); g.restore();
  g.fillStyle = shade(c, 0.25); g.beginPath(); g.ellipse(40, 24, 90, 10, 0.02, 0, Math.PI * 2); g.fill();
  seg(g, [[60, 40], [120, 34]], 6, shade(c, -0.2));
  circle(g, 110, 4, 4, '#101420'); circle(g, 111.5, 2.5, 1.4, '#ffffff');
  g.restore();
}

// simple line icons for the blueprint science section
export function iconEagle(g, x, y, s = 1, col = '#e8f0ff') { g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = col; g.lineWidth = 4; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-60, -10); g.quadraticCurveTo(-30, -30, -8, -4); g.lineTo(0, 6); g.lineTo(8, -4); g.quadraticCurveTo(30, -30, 60, -10); g.stroke(); circle(g, 0, -6, 6, col); g.restore(); }
export function iconSnake(g, x, y, s = 1, col = '#e8f0ff') { g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = col; g.lineWidth = 6; g.lineCap = 'round'; g.beginPath(); for (let i = 0; i <= 30; i++) { const u = i / 30; const px = -60 + u * 120, py = Math.sin(u * Math.PI * 3) * 12; i ? g.lineTo(px, py) : g.moveTo(px, py); } g.stroke(); circle(g, 62, 0, 7, col); g.restore(); }
export function iconLeopard(g, x, y, s = 1, col = '#e8f0ff') { g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = col; g.lineWidth = 4; g.lineJoin = 'round'; g.beginPath(); g.moveTo(-60, 0); g.quadraticCurveTo(-30, -24, 20, -20); g.lineTo(44, -30); g.lineTo(58, -18); g.lineTo(40, -6); g.quadraticCurveTo(10, 4, -40, 6); g.closePath(); g.stroke(); for (const [dx, dy] of [[-30, -8], [-12, -12], [6, -10]]) circle(g, dx, dy, 3, col); seg(g, [[-40, 6], [-44, 30]], 4, col); seg(g, [[30, -4], [34, 30]], 4, col); g.restore(); }
