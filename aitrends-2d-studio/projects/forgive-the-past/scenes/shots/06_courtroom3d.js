// shots/06_courtroom3d.js — s21: the empty courtroom in low-poly 3D, HERO the only one seated. Slow dolly in.
import { E, V, registerShot, mood, ease, prog, shade } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import { POSES } from '/engine/rig2d.js';
import { HERO } from '../cast.js';

export function buildCourtroom(T, M) {
  const st = T.stage({ mood: 'interiorCool', fov: V(36, 52), fog: [16, 52], keyPos: [-9, 9, 3], keyIntensity: 2.6, ambient: 1.5, sky: [shade(M.wall, -0.6), shade(M.wall, -0.7)] });
  const wood = shade(M.wall, 0.1), woodDark = shade(M.wall, -0.25), panel = shade(M.wall, -0.1);
  st.add(T.ground(40, 50, M.floor, T.planks(shade(M.floor, 0.05), 18, [6, 8])));
  st.add(T.box(22, 11, 0.4, panel, 0, 5.5, -12.5));                                  // back wall
  for (const sx of [-1, 1]) {
    st.add(T.box(0.4, 11, 30, panel, sx * 9, 5.5, -1));                               // side walls
    for (const z of [-8, -3, 2]) {
      const w = T.windowPane(2.2, 4.6, { glowColor: '#cfdcff', frame: shade(M.wall, -0.5), cols: 2, rows: 4, power: 1.05 });
      w.position.set(sx * 8.78, 5.2, z); w.rotation.y = -sx * Math.PI / 2; st.add(w);
      const s = T.shaft(2.4, 9, '#cfdcff', 0.07); s.position.set(sx * 6.2, 3.2, z); s.rotation.z = sx * 0.85; s.rotation.y = -sx * 0.25; st.add(s);
    }
  }
  st.add(T.box(22, 1.4, 0.15, woodDark, 0, 0.7, -12.3));                               // wainscot
  st.add(T.box(22, 11, 0.4, panel, 0, 5.5, 13.5));                                    // rear wall with the double doors
  for (const sx of [-1, 1]) st.add(T.box(1.3, 3.2, 0.1, shade(M.wall, -0.45), sx * 0.7, 1.6, 13.25));
  // judge's bench on a platform + the empty high-backed chair
  st.add(T.box(9, 0.6, 3.4, woodDark, 0, 0.3, -10.4), T.box(6.4, 1.9, 1.2, wood, 0, 1.55, -9.4), T.box(6.8, 0.12, 1.5, shade(wood, 0.15), 0, 2.55, -9.5));
  st.add(T.box(1.1, 3.4, 0.25, shade(M.wall, -0.4), 0, 2.3, -11.2), T.box(1.0, 0.15, 0.9, shade(M.wall, -0.4), 0, 1.3, -10.8));
  const seal = T.cyl(0.8, 0.8, 0.05, T.basic('#8a96b8'), 0, 5.6, -12.25, 40); seal.rotation.x = Math.PI / 2; seal.material.transparent = true; seal.material.opacity = 0.12; st.add(seal);
  const fill = new T.THREE.PointLight(0xb8c8ff, 30, 30, 1.6); fill.position.set(0, 7, -6); st.add(fill);
  const warm = new T.THREE.PointLight(0xffd59a, 10, 14, 1.8); warm.position.set(-3, 3, 3); st.add(warm);
  // the bar rail, counsel tables
  st.add(T.box(16, 0.08, 0.08, wood, 0, 1.0, -2.2));
  for (let x = -7.5; x <= 7.5; x += 0.5) if (Math.abs(x) > 0.9) st.add(T.box(0.05, 1.0, 0.05, wood, x, 0.5, -2.2));
  for (const sx of [-1, 1]) { st.add(T.box(2.6, 0.08, 1.1, wood, sx * 2.8, 0.8, -5)); for (const lx of [-1.2, 1.2]) st.add(T.box(0.07, 0.8, 0.07, woodDark, sx * 2.8 + lx, 0.4, -5)); }
  // gallery benches, aisle down the middle
  for (let row = 0; row < 6; row++) for (const sx of [-1, 1]) {
    const z = row * 1.7, x = sx * 4.6;
    st.add(T.box(6.2, 0.1, 0.5, wood, x, 0.45, z), T.box(6.2, 0.75, 0.08, woodDark, x, 0.86, z + 0.26));
    for (const lx of [-2.9, 2.9]) st.add(T.box(0.08, 0.45, 0.45, woodDark, x + lx, 0.22, z));
  }
  return st;
}

registerShot('s21', {
  kind: '3d',
  init(T) {
    const M = mood('interiorCool');
    const st = buildCourtroom(T, M);
    const hero = T.figure3D(HERO, { rim: M.rim, pose: { ...POSES.sit, head: [10, -174], sh: [5, -144] } });
    hero.position.set(-3.2, 0, 0.05); hero.rotation.y = Math.PI / 2; st.add(hero);
    const spot = new T.THREE.SpotLight(0xcfdcff, 160, 22, 0.32, 0.7, 1.4); spot.position.set(-7.5, 9.5, 1.5); spot.target.position.set(-3.2, 0.4, 0.2); st.add(spot, spot.target);
    const shaft = T.shaft(1.8, 12, '#cfdcff', 0.09); shaft.position.set(-5.3, 5, 0.9); shaft.rotation.z = -0.62; st.add(shaft);
    return { stage: st, hero };
  },
  draw(s, t, info, T) {
    const k = t / info.dur;
    T.dolly(s.stage.camera, t, [[0, { pos: [V(3.5, 2.6), V(4.6, 5.2), -4.8], look: [-3.0, 0.6, 2.2] }], [info.dur, { pos: [V(1.6, 0.9), V(3.2, 3.6), -3.4], look: [-3.2, 0.8, 1.2] }]]);
    s.stage.camera.rotation.z += 0.01 * Math.sin(k * 3);
  },
  overlay(g, t) {
    FX.dust(g, t, { count: 60, color: '#cfdcff', a: 0.3, area: [0, E.H * 0.1, E.W * 0.8, E.H * 0.6], speed: 6 });
  },
});
