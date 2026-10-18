// NIGHT SUPPORT 001, Short 1: the hook (0:00-0:35 of the long video), 1080x1920.
// The engine draws everything around the video: the hook on top and big word-by-word captions underneath.
// The band VIDEO.y0..y1 stays black; make_short.sh lays the long video in there at full width, cut off above its own small captions.
// Shorts UI covers roughly y < 200, y > 1500 and the right edge from y ~1000, so text stays clear of those.
import { E, registerShot, alpha, text, measure, ease, clamp } from '/engine/core.js';

const FONT = 'Montserrat', RED = '#ff3b30', AMBER = '#ffc04d', BG = '#050505';
for (const w of ['800', '900']) {
  try { const ff = new FontFace(FONT, `url(/project/assets/fonts/montserrat-latin-${w}-normal.woff2)`, { weight: w }); await ff.load(); document.fonts.add(ff); } catch (e) { console.log('font missing', FONT, w); }
}
E.style = { ...E.style, grade: { ...E.style.grade, grain: 0, scanlines: 0, vignette: 0, bloom: 0 } };
export const VIDEO = { y0: 640, y1: 1169 };

// caption chunks: up to 3 words, broken at punctuation or a pause; each stays up until the next one starts
const chunks = []; { let cur = [];
  E.words.forEach((w, i) => { cur.push(w); const nx = E.words[i + 1];
    if (!nx || /[.,!?;:]$/.test(w.word) || nx.start - w.end > 0.35 || cur.length === 3) { chunks.push(cur); cur = []; } });
  chunks.forEach((c, i) => { c.t0 = c[0].start; c.t1 = chunks[i + 1] ? chunks[i + 1][0].start : c[c.length - 1].end + 0.6; }); }

function captions(g, t) {
  const c = chunks.find(c => t >= c.t0 && t < c.t1); if (!c) return;
  const words = c.map(w => w.word.toUpperCase()), gap = 26;
  let size = 92; const widthAt = s => words.reduce((a, w) => a + measure(g, w, s, FONT, 900), 0) + gap * (words.length - 1);
  size = Math.min(size, Math.floor(size * 820 / widthAt(size)));
  const pop = 1 + 0.12 * (1 - ease.out(clamp((t - c.t0) / 0.12, 0, 1))), y = 1290;
  g.save(); g.translate(540, y); g.scale(pop, pop); g.translate(-540, -y);
  let x = 540 - widthAt(size) / 2;
  c.forEach((w, i) => {
    const on = t >= w.start, active = on && (t < w.end + 0.05 || i === c.length - 1 && t < c.t1);
    text(g, words[i], x, y, { font: FONT, weight: 900, size, align: 'left', color: active ? AMBER : '#ffffff', alpha: on ? 1 : 0.35, stroke: 14, strokeColor: '#000' });
    x += measure(g, words[i], size, FONT, 900) + gap;
  });
  g.restore();
}

registerShot('short', { draw(g, t) {
  g.fillStyle = BG; g.fillRect(0, 0, E.W, E.H);
  text(g, 'IF YOUR CAR EVER BEEPS', 540, 290, { font: FONT, weight: 900, size: 66, color: '#ffffff' });
  text(g, 'FOR THE EMPTY SEAT...', 540, 372, { font: FONT, weight: 900, size: 66, color: '#ffffff' });
  text(g, "DON'T LOOK.", 540, 492, { font: FONT, weight: 900, size: 124, color: RED, glow: 34, glowColor: alpha(RED, 0.6) });
  text(g, '7 RULES  ·  FULL VIDEO ON THE CHANNEL', 540, 588, { font: FONT, weight: 800, size: 27, color: '#8d8d8d', spacing: 1 });
  captions(g, t);
}});
