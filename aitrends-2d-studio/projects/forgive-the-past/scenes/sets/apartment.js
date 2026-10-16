// sets/apartment.js — the dark apartment: a doorway to a warm hallway (THE DOORWAY motif), a tall window with blinds
// and a cold streetlight outside, a lone wooden chair. apartment(g, t, cam, { mood, dawn, door, chain }) then draw characters at depth 1.
// Value structure: walls deep navy, the hallway is the warm accent, the window is the cold accent.
import { E, V, mood, layer, backdrop, rr, seg, circle, poly, linGrad, radGrad, glow, alpha, shade, mix, clamp } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';

export const aptGround = () => E.H * V(0.8, 0.68);
export const aptDoor = () => { const GY = aptGround(); return { x: E.W / 2 + V(200, 110), w: V(210, 220), h: V(430, 470), y: GY }; };
export const aptWindow = () => { const GY = aptGround(); return { x: E.W / 2 - V(620, 470), y: GY - V(560, 860), w: V(300, 250), h: V(380, 560) }; };

// hallway seen through the doorway (dawn 0..1 turns it into an open exterior door with morning light)
function hallway(g, D, M, t, dawn) {
  const { x, w, h, y } = D, top = y - h;
  const warm = M.practical, light = mix(warm, '#fff3dc', dawn);
  g.save(); g.beginPath(); g.rect(x, top, w, h); g.clip();
  g.fillStyle = linGrad(g, 0, top, 0, y, [shade(light, -0.15), light, shade(light, -0.35)]); g.fillRect(x, top, w, h);
  // receding corridor: side walls darker, far wall smaller
  const ix = x + w * 0.24, iw = w * 0.52, itop = top + h * 0.2, ibot = y - h * 0.18;
  poly(g, [[x, top], [ix, itop], [ix, ibot], [x, y]], alpha(shade(warm, -0.55), 0.85 - dawn * 0.4));
  poly(g, [[x + w, top], [ix + iw, itop], [ix + iw, ibot], [x + w, y]], alpha(shade(warm, -0.4), 0.8 - dawn * 0.4));
  poly(g, [[x, y], [ix, ibot], [ix + iw, ibot], [x + w, y]], alpha(shade(warm, -0.3), 0.7 - dawn * 0.3));
  if (dawn > 0) {          // far end opens to the outside: pale sky + sun
    g.fillStyle = linGrad(g, 0, itop, 0, ibot, ['#fff8ea', '#ffe2b0', '#f6b77e']); g.globalAlpha = dawn; g.fillRect(ix + iw * 0.12, itop + 6, iw * 0.76, ibot - itop - 6); g.globalAlpha = 1;
    glow(g, ix + iw / 2, itop + (ibot - itop) * 0.55, iw * 2.2, '#fff1d0', 0.9 * dawn);
  } else {
    rr(g, ix + iw * 0.3, itop + 10, iw * 0.4, ibot - itop - 10, 4); g.fillStyle = shade(warm, -0.62); g.fill();    // far closed door
    glow(g, x + w / 2, top + h * 0.1, w * 0.9, '#fff0d0', 0.7);                                                          // ceiling bulb
    circle(g, x + w / 2, top + h * 0.08, 7, '#fff6e0');
  }
  g.restore();
}

export function apartment(g, t, cam, o = {}) {
  const M = mood(o.mood || 'night'), GY = aptGround(), CX = E.W / 2, D = aptDoor(), W = aptWindow();
  const dawn = clamp(o.dawn || 0), door = o.door ?? 1;
  const wall = shade(M.wall, -0.2), wallDark = shade(M.wall, -0.55), trim = shade(M.wall, -0.05);
  layer(g, cam, 0.5, (g) => {
    g.fillStyle = linGrad(g, 0, GY - E.H, 0, GY, [shade(M.wall, -0.65), wall, shade(M.wall, -0.35)]);
    g.fillRect(-E.W, -E.H, E.W * 3, GY + E.H + 4);
    g.fillStyle = wallDark; g.fillRect(-E.W, GY - 22, E.W * 3, 22);
    // window: night (or dawn) outside, blinds half closed
    FX.windowFrame(g, { x: W.x, y: W.y, w: W.w, h: W.h, cols: 2, rows: 1, frame: wallDark, bar: 10 }, (g, x, y, w, h) => {
      const sky = dawn > 0 ? M.sky : M.sky; g.fillStyle = linGrad(g, 0, y, 0, y + h, sky); g.fillRect(x, y, w, h);
      if (!dawn) FX.stars(g, t, { count: 30, area: [x, y, w, h * 0.5], seed: 9 });
      FX.skyline(g, { x: x - 20, y: y + h, w: w + 40, minH: h * 0.15, maxH: h * 0.55, color: shade(M.sky[0], -0.35), windowColor: alpha(M.practical, 0.75), lit: dawn ? 0.05 : 0.3, seed: 5 });
      glow(g, x + w * 0.78, y + h * 0.62, w * 0.55, dawn ? '#ffe2b0' : M.practical, 0.55);           // streetlight / low sun
    });
    for (let k = 0; k < W.h; k += 30) { g.fillStyle = alpha(wallDark, 0.88); g.fillRect(W.x, W.y + k, W.w, 13); }   // blinds
    g.strokeStyle = trim; g.lineWidth = 6; g.strokeRect(W.x - 8, W.y - 8, W.w + 16, W.h + 16);
    rr(g, W.x - 22, W.y + W.h + 6, W.w + 44, 16, 4); g.fillStyle = trim; g.fill();                       // sill
    // a picture frame and a light switch beside the door
    rr(g, D.x - V(330, 300), GY - V(330, 380), V(120, 110), V(90, 140), 4); g.fillStyle = shade(M.wall, -0.45); g.fill();
    g.strokeStyle = shade(M.wall, 0.08); g.lineWidth = 5; g.stroke();
    rr(g, D.x - 34, GY - V(250, 270), 18, 28, 3); g.fillStyle = shade(M.wall, 0.12); g.fill();
    // the doorway
    hallway(g, D, M, t, dawn);
    if (door < 1) {            // door leaf closing over the opening (0 = shut)
      const lw = D.w * (1 - door); g.fillStyle = linGrad(g, D.x, 0, D.x + D.w, 0, [shade(M.wall, -0.45), shade(M.wall, -0.3)]); g.fillRect(D.x, D.y - D.h, lw, D.h);
      if (door === 0) { circle(g, D.x + D.w - 30, GY - D.h * 0.47, 8, shade(M.practical, -0.2)); }
    } else {                   // open leaf swung into the room
      poly(g, [[D.x, D.y - D.h], [D.x - D.w * 0.42, D.y - D.h - 26], [D.x - D.w * 0.42, D.y + 30], [D.x, D.y]], shade(M.wall, -0.5));
      circle(g, D.x - D.w * 0.34, GY - D.h * 0.45, 7, shade(M.wall, -0.2));
    }
    g.strokeStyle = trim; g.lineWidth = 14; g.strokeRect(D.x - 7, D.y - D.h - 7, D.w + 14, D.h + 7);
    if (door === 0) { g.save(); g.globalCompositeOperation = 'lighter'; g.fillStyle = alpha(M.practical, 0.85); g.fillRect(D.x + 4, GY - 6, D.w - 8, 5); g.restore(); glow(g, D.x + D.w / 2, GY, D.w * 0.7, M.practical, 0.25); }
    else glow(g, D.x + D.w / 2, D.y - D.h / 2, D.w * (1.4 + dawn * 1.6), mix(M.practical, '#fff1d0', dawn), 0.22 + dawn * 0.35);
  });
  layer(g, cam, 0.85, (g) => {
    g.fillStyle = linGrad(g, 0, GY, 0, GY + V(380, 640), [shade(M.floor, -0.15), shade(M.dark, -0.3)]); g.fillRect(-E.W, GY, E.W * 3, E.H * 2);
    FX.floorLines(g, GY, GY + V(600, 700), 'rgba(0,0,0,.28)', 0.07);
    // doorway spill on the floor (warm) and blind stripes from the window (cold)
    if (door > 0) {
      g.save(); g.globalCompositeOperation = 'lighter';
      const spill = mix(M.practical, '#fff1d0', dawn), sa = (0.16 + dawn * 0.3) * door;
      g.fillStyle = linGrad(g, 0, GY, 0, GY + V(420, 560), [alpha(spill, sa), alpha(spill, 0)]);
      poly(g, [[D.x, GY], [D.x + D.w, GY], [D.x + D.w + V(260, 300) * (1 + dawn), GY + V(420, 560)], [D.x - V(160, 220) * (1 + dawn), GY + V(420, 560)]], g.fillStyle);
      g.restore();
    }
    g.save(); g.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 5; i++) { const y0 = GY + 18 + i * 34; poly(g, [[W.x + 40 + i * 70, y0], [W.x + W.w + 40 + i * 70, y0], [W.x + W.w + 64 + i * 70, y0 + 18], [W.x + 64 + i * 70, y0 + 18]], alpha(dawn ? '#ffd9a0' : M.key, 0.07 - i * 0.008)); }
    g.restore();
  });
  return { GY, CX, M, D, W };
}

// wooden chair (side view) at depth 1; facing flips the backrest side
export function aptChair(g, x, GY, s = 1, facing = 1, color = '#1a1626') {
  g.save(); g.translate(x, 0); g.scale(facing, 1); FX.chair(g, 0, GY, s, color); g.restore();
}
