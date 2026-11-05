// Template shot: YOU in the day world, default push-in (R01). Copy this file per shot and change preset/recipe/clip.
import { registerShot } from '/engine/core.js';
import * as M from '/engine/myth3d.js';
const hero = await M.loadCharacter('/project/assets/hero.glb');
registerShot('s01', { kind: '3d',
  init(T) {
    const s = M.world(T, 'day', { groundColor: '#6a8a4a' });
    for (let i = 0; i < 14; i++) s.add(M.pine(-9 + (i % 7) * 3 + (i > 6 ? 1.5 : 0), -6 - (i > 6 ? 5 : 0) - (i % 3), 1.3 + (i % 3) * 0.3));
    s.add(M.longhouse(5, -14, 6, 12, 0.3), M.rock(-2.5, -2, 0.7), M.rock(2.8, -3, 1.0, '#7a7a82', 3));
    const h = M.spawn(s, hero, { clip: hero.animations[0].name, at: [0, 0, 0], inPlace: true });
    return { stage: s, h };
  },
  draw(st, t, info) { st.h.play(t); M.cam(st.stage.camera, t, info.dur, 'pushIn', { target: [0, 1.45, 0] }); } });
