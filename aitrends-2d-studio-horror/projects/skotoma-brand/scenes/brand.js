// SKOTOMA channel avatars, viral-avatar layout: one bold white subject on a flat colour, readable at 40 px.
// Each is drawn in the centre 1080x1080 square of the 1920x1080 frame and cropped to 800x800 after render.
//   avatarEyeYellow: white eye on warning-sign yellow (a colour none of the big rule channels use)
//   avatarEye:       the eye on red; the pupil is a black blind spot and its "catchlight" is a tiny standing figure
//   avatarEyeBlack:  the eye on black with a red iris (pairs with thumbnail B)
import { E, registerShot, alpha, glow, radGrad, rr, circle } from '/engine/core.js';
const RED = '#ff2b2b', YELLOW = '#ffc21a', INK = '#0a0a0a', WHITE = '#ffffff', CX = 960, CY = 540;

// logos stay clean: keep the style's contrast LUT but drop grain, scanlines, vignette and bloom
E.style = { ...E.style, grade: { ...E.style.grade, grain: 0, scanlines: 0, vignette: 0, bloom: 0 } };

function redBg(g) {
  g.fillStyle = RED; g.fillRect(0, 0, E.W, E.H);
  g.fillStyle = radGrad(g, CX - 120, CY - 160, 0, 700, ['rgba(255,255,255,0.14)', 'rgba(255,255,255,0)']); g.fillRect(0, 0, E.W, E.H);
  g.fillStyle = radGrad(g, CX, CY, 380, 780, ['rgba(0,0,0,0)', 'rgba(0,0,0,0.22)']); g.fillRect(0, 0, E.W, E.H);
}
function outlined(g, path, fill, w = 26, stroke = INK) { path(g); g.lineJoin = 'round'; g.lineWidth = w; g.strokeStyle = stroke; g.stroke(); g.fillStyle = fill; g.fill(); }
function shadow(g, path, dx = 12, dy = 16, a = 0.28) { g.save(); g.translate(dx, dy); path(g); g.fillStyle = `rgba(0,0,0,${a})`; g.fill(); g.restore(); }

// a tiny pictogram person (same build as the in-video figures)
function figure(g, x, y, s, col) {
  g.fillStyle = col; circle(g, x, y - 52 * s, 14 * s, col);
  rr(g, x - 20 * s, y - 34 * s, 40 * s, 44 * s, 14 * s); g.fill();                                          // torso with shoulders
  for (const dx of [-11, 11]) { rr(g, x + dx * s - 7 * s, y, 14 * s, 42 * s, 6 * s); g.fill(); }             // legs
  for (const dx of [-25, 25]) { rr(g, x + dx * s - 5 * s, y - 28 * s, 10 * s, 38 * s, 5 * s); g.fill(); }    // arms hanging
}

const eyePath = (w, h) => g => { g.beginPath(); g.moveTo(CX - w, CY); g.quadraticCurveTo(CX, CY - h, CX + w, CY); g.quadraticCurveTo(CX, CY + h, CX - w, CY); g.closePath(); };

function eye(g, { stroke = INK, iris = INK, ring = null, shadowA = 0.28 }) {
  const shape = eyePath(400, 440);
  shadow(g, shape, 12, 16, shadowA);
  outlined(g, shape, WHITE, 28, stroke);
  g.save(); shape(g); g.clip();
  g.fillStyle = radGrad(g, CX, CY + 60, 120, 420, ['rgba(0,0,0,0)', 'rgba(0,0,0,0.12)']); g.fillRect(CX - 420, CY - 240, 840, 480);
  if (ring) { glow(g, CX, CY, 300, ring, 0.55); circle(g, CX, CY, 178, ring); }
  circle(g, CX, CY, ring ? 118 : 172, iris);
  // the blind spot's "catchlight" is someone standing in it
  figure(g, CX + 62, CY - 30, ring ? 0.85 : 1.05, WHITE);
  g.restore();
}

registerShot('avatarEye', { draw(g) { redBg(g); eye(g, {}); } });

registerShot('avatarEyeBlack', { draw(g) {
  g.fillStyle = '#060606'; g.fillRect(0, 0, E.W, E.H);
  g.fillStyle = radGrad(g, CX, CY, 0, 620, [alpha(RED, 0.16), alpha(RED, 0)]); g.fillRect(0, 0, E.W, E.H);
  eye(g, { stroke: '#060606', ring: RED, shadowA: 0 });
}});

registerShot('avatarEyeYellow', { draw(g) {
  g.fillStyle = YELLOW; g.fillRect(0, 0, E.W, E.H);
  g.fillStyle = radGrad(g, CX - 120, CY - 160, 0, 700, ['rgba(255,255,255,0.18)', 'rgba(255,255,255,0)']); g.fillRect(0, 0, E.W, E.H);
  g.fillStyle = radGrad(g, CX, CY, 380, 780, ['rgba(0,0,0,0)', 'rgba(60,30,0,0.18)']); g.fillRect(0, 0, E.W, E.H);
  eye(g, { shadowA: 0.22 });
}});
