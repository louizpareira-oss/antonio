// Template shot: candle interior (secret / deal), low hero angle (R02), flickering practical light.
import { registerShot } from '/engine/core.js';
import * as M from '/engine/myth3d.js';
const hero = await M.loadCharacter('/project/assets/hero.glb');
registerShot('s02', { kind: '3d',
  init(T) {
    const s = M.world(T, 'candle', { groundColor: '#2a1a12' });
    const wall = new M.THREE.Mesh(new M.THREE.BoxGeometry(12, 5, 0.3), new M.THREE.MeshStandardMaterial({ color: '#3a2618', roughness: 0.9 })); wall.position.set(0, 2.5, -2.5); wall.receiveShadow = true; s.add(wall);
    const h = M.spawn(s, hero, { clip: hero.animations[0].name, at: [0, 0, 0], inPlace: true, offset: 1.2 });
    return { stage: s, h };
  },
  draw(st, t, info) { st.h.play(t); M.flicker(st.stage, t); M.cam(st.stage.camera, t, info.dur, 'heroLow', { target: [0, 1.5, 0] }); } });
