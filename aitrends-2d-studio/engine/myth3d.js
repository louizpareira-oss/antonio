// engine/myth3d.js — Myth POV kit for 9:16 3D shots: mocap characters, camera recipes (shot library ids),
// light presets (style bible), sky, sets, props. Copied into aitrends-2d-studio/engine/ by install.sh / new_project.sh.
//   import * as M from '/engine/myth3d.js';
//   const hero = await M.loadCharacter('/project/assets/hero.glb');      // top-level await in the scene module
//   registerShot('s01', { kind: '3d',
//     init(T) { const s = M.world(T, 'day'); const h = M.spawn(s, hero, { clip: '07_01', at: [0, 0, 0] }); return { stage: s, h }; },
//     draw(st, t, info) { st.h.play(t); M.cam(st.stage.camera, t, info.dur, 'pushIn', { target: [0, 1.5, 0] }); } });
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import * as SkeletonUtils from 'three/addons/utils/SkeletonUtils.js';
import { ease, clamp, lerp, noise, rng } from './core.js';

// ---------- light presets (style-bible.md) ----------
export const LIGHTS = {
  day:      { sky: ['#6fb8e8', '#d8eef7'], key: ['#fff2d8', 2.6, [6, 12, -5]], hemi: ['#bfe0ff', '#4a6a3a', 0.9], env: 0.35, rim: ['#ffffff', 0.6], fog: ['#cfe6f2', 30, 120], bloom: [0.35, 0.9], exposure: 1.1 },
  dusk:     { sky: ['#3a2a5a', '#e66a8a', '#ffc08a'], key: ['#ffb27a', 2.0, [-8, 4, -6]], hemi: ['#b07aa0', '#2a1a2a', 0.6], env: 0.25, rim: ['#ffd0a0', 1.0], fog: ['#c87a8a', 15, 80], bloom: [0.6, 0.85], exposure: 1.05 },
  gold:     { sky: ['#ff8a3a', '#ffe08a'], key: ['#ffc070', 2.4, [-10, 2.5, -8]], hemi: ['#a06a40', '#2a160a', 0.5], env: 0.25, rim: ['#fff0c0', 1.2], fog: ['#e8a060', 20, 90], bloom: [0.7, 0.8], exposure: 1.05 },
  candle:   { sky: ['#050308'], key: null, practical: ['#ff9a40', 9, [1.2, 1.6, 0.8]], hemi: ['#40301c', '#000000', 0.12], env: 0.05, rim: null, fog: ['#120806', 4, 14], bloom: [0.9, 0.75], exposure: 1.15 },
  night:    { sky: ['#040a1e', '#12204a'], key: ['#b8c8ff', 0.9, [-6, 10, -8]], hemi: ['#2a3a6a', '#05070f', 0.35], env: 0.1, rim: ['#a0b8ff', 0.8], fog: ['#0a1530', 10, 60], bloom: [0.5, 0.85], exposure: 1.15, stars: true },
  dream:    { sky: ['#3a0006', '#000000'], key: null, practical: ['#ff2a20', 6, [0, 2.5, 1.5]], hemi: ['#300004', '#000000', 0.15], env: 0.02, rim: null, fog: ['#300004', 3, 18], bloom: [1.0, 0.7], exposure: 1.1 },
  under:    { sky: ['#020206'], key: null, practical: ['#4a7aff', 7, [0, 3, 1]], hemi: ['#101830', '#000000', 0.2], env: 0.08, rim: ['#6080ff', 0.6], fog: ['#04060c', 6, 30], bloom: [0.8, 0.75], exposure: 1.1 },
  showroom: { sky: ['#8ac8f0', '#ffffff'], key: ['#ffffff', 2.8, [5, 10, 4]], hemi: ['#ffffff', '#8a9a7a', 1.0], env: 0.5, rim: null, fog: null, bloom: [0.3, 0.95], exposure: 1.1 },
};
const gradTex = (stops) => { const c = document.createElement('canvas'); c.width = 4; c.height = 512; const g = c.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 512); stops.forEach((s, i) => gr.addColorStop(stops.length === 1 ? 0 : i / (stops.length - 1), s)); g.fillStyle = gr; g.fillRect(0, 0, 4, 512); const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t; };

// world(T, preset, opts) -> stage with sky dome, lights, env map, fog, ground
export function world(T, preset = 'day', o = {}) {
  const L = { ...LIGHTS[preset], ...(o.light || {}) };
  const s = T.stage({ fov: o.fov || 45, fog: false, sky: '#000', bloom: L.bloom[0], bloomThreshold: L.bloom[1], ambient: 0, keyIntensity: 0 });
  const R = T.getRenderer(); R.toneMappingExposure = L.exposure;
  s.scene.background = null; s.hemi.intensity = 0; s.sun.intensity = 0;
  const dome = new THREE.Mesh(new THREE.SphereGeometry(400, 32, 16), new THREE.MeshBasicMaterial({ map: gradTex(L.sky), side: THREE.BackSide, fog: false, depthWrite: false }));
  s.add(dome);
  if (L.stars) { const r = rng(7), g = new THREE.BufferGeometry(), p = []; for (let i = 0; i < 1500; i++) { const a = r() * 6.283, z = r() * 0.9 + 0.1; p.push(Math.cos(a) * 380 * Math.sqrt(1 - z * z), z * 380, Math.sin(a) * 380 * Math.sqrt(1 - z * z)); } g.setAttribute('position', new THREE.Float32BufferAttribute(p, 3)); s.add(new THREE.Points(g, new THREE.PointsMaterial({ color: '#dfe8ff', size: 1.4, fog: false, sizeAttenuation: false }))); }
  const pm = new THREE.PMREMGenerator(R); s.scene.environment = pm.fromScene(new RoomEnvironment(), 0.04).texture; s.scene.environmentIntensity = L.env;
  const hemi = new THREE.HemisphereLight(L.hemi[0], L.hemi[1], L.hemi[2]); s.add(hemi);
  if (L.key) { s.sun.color.set(L.key[0]); s.sun.intensity = L.key[1]; s.sun.position.set(...L.key[2]); }
  if (L.rim) { const rim = new THREE.DirectionalLight(L.rim[0], L.rim[1]); rim.position.set(0, 4, -8); s.add(rim); s.rim = rim; }
  if (L.practical) { const pl = new THREE.PointLight(L.practical[0], L.practical[1], 12, 1.6); pl.position.set(...L.practical[2]); pl.castShadow = true; pl.shadow.mapSize.set(1024, 1024); s.add(pl); s.practical = pl;
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(L.practical[0]).multiplyScalar(4) })); bulb.position.copy(pl.position); s.add(bulb); s.bulb = bulb; }
  if (L.fog) s.scene.fog = new THREE.Fog(L.fog[0], L.fog[1], L.fog[2]);
  if (o.ground !== false) { const gm = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.MeshStandardMaterial({ color: o.groundColor || '#5a7a44', roughness: 0.95 })); gm.rotation.x = -Math.PI / 2; gm.receiveShadow = true; s.add(gm); s.ground = gm; }
  s.preset = preset; s.L = L; return s;
}
// candle/practical flicker (deterministic): call in draw()
export function flicker(s, t, amt = 0.08) { if (s.practical) s.practical.intensity = s.L.practical[1] * (1 + amt * noise(t * 9, 3)); }

// ---------- characters (glb from scripts/build_character.py) ----------
const cache = new Map();
export async function loadCharacter(url) { if (!cache.has(url)) cache.set(url, await new GLTFLoader().loadAsync(url)); return cache.get(url); }
// spawn(stage, gltf, { clip, at:[x,y,z], face: radians, scale, offset: seconds into the clip, inPlace: true })
export function spawn(s, gltf, o = {}) {
  const root = SkeletonUtils.clone(gltf.scene); root.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; m.frustumCulled = false; } });
  const holder = new THREE.Group(); holder.add(root); holder.position.set(...(o.at || [0, 0, 0])); holder.rotation.y = o.face || 0; if (o.scale) holder.scale.setScalar(o.scale); s.add(holder);
  const mixer = new THREE.AnimationMixer(root); const clips = Object.fromEntries(gltf.animations.map(a => [a.name, a]));
  const hips = root.getObjectByName('Hips'); const eyes = ['Pupil_L', 'Pupil_R'].map(n => root.getObjectByName(n)).filter(Boolean);
  let cur = null, curName = null; const base = hips ? hips.position.clone() : null;
  const api = { root: holder, mixer, clips, hips,
    // play(t, clipName?, {offset, loop, inPlace, from, blend:[otherClip, k]}) — deterministic: sets the pose for absolute time t
    play(t, name = o.clip || Object.keys(clips)[0], p = {}) {
      if (name !== curName) { mixer.stopAllAction(); cur = mixer.clipAction(clips[name]); cur.play(); curName = name; }
      const d = clips[name].duration; let tt = (p.offset ?? o.offset ?? 0) + t; tt = (p.loop ?? true) ? ((tt % d) + d) % d : Math.min(tt, d - 1e-3);
      mixer.setTime(tt);
      if ((p.inPlace ?? o.inPlace ?? false) && hips && base) { hips.position.x = base.x; hips.position.z = base.z; }
      return api;
    },
    look(dx = 0, dy = 0) { eyes.forEach(e => { e.userData.b ||= e.position.clone(); e.position.set(e.userData.b.x + dx * 0.01, e.userData.b.y + dy * 0.01, e.userData.b.z); }); return api; },
    worldHips() { const v = new THREE.Vector3(); (hips || holder).getWorldPosition(v); return v; },
  };
  return api;
}

// ---------- camera recipes (shot-library.md ids) ----------
// cam(camera, t, dur, name, { target:[x,y,z], k: strength, roll, fov, from, to }) — all positions relative to target
const V3 = (a) => new THREE.Vector3(...a);
export const RECIPES = {
  pushIn:     { from: [0, 0.05, 4.2], to: [0, 0.05, 3.7], fov: 45, e: 'linear' },               // R01
  heroLow:    { from: [0.3, -1.05, 2.6], to: [0.2, -1.1, 2.2], fov: 50, e: 'out', look: [0, 0.1, 0] }, // R02
  crashIn:    { from: [0, 0.1, 6], to: [0, 0.1, 0.9], fov: 45, e: 'in' },                         // R03
  pullOut:    { from: [0, 0.1, 1.2], to: [0, 2.0, 9], fov: 45, e: 'inOut' },                      // R04
  crane:      { from: [0, -0.7, 5], to: [0, 4.5, 8], fov: 50, e: 'out', look: [0, -0.5, 0] },      // R05
  truck:      { from: [-2, 0, 4], to: [2, 0, 4], fov: 45, e: 'linear', track: true },             // R06
  orbit:      { orbit: [3.5, 0.1, -0.6, 0.4], fov: 45, e: 'inOut' },                              // R07
  topDown:    { from: [0, 9, 0.01], to: [0, 7, 0.01], fov: 55, e: 'linear', roll: [0, 8] },       // R09
  ots:        { from: [0.45, 0.15, -0.6], to: [0.4, 0.15, -0.35], fov: 40, e: 'linear', look: [0, 0, 2.5] }, // R10 (target = speaker's position)
  mcuAddress: { from: [0, 0.05, 1.6], to: [0, 0.05, 1.5], fov: 40, e: 'linear' },                 // R11
  macro:      { from: [0.08, 0.05, 0.45], to: [-0.08, 0.05, 0.38], fov: 30, e: 'inOut' },         // R12 (target = prop)
  pov:        { from: [0, 0.1, 0], to: [0, 0.1, -0.3], fov: 70, e: 'linear', hand: true },        // R13 (target = eye point; looks -Z)
  silhouette: { from: [0, -1.2, 5], to: [0, -1.2, 4.6], fov: 50, e: 'linear' },                   // R14
  stillBeat:  { from: [0, 0.05, 2.4], to: [0, 0.05, 2.4], fov: 40, e: 'linear' },                 // R16
  chase:      { from: [0, -0.1, -3], to: [0, -0.1, -3], fov: 60, e: 'linear', shake: 0.04 },      // R17 (target moves)
  godReveal:  { from: [0, -0.9, 2.2], to: [0, -0.6, 4.5], fov: 45, e: 'out' },                    // R19
};
const EASE = { linear: ease.linear, in: ease.in, out: ease.out, inOut: ease.inOut };
export function cam(camera, t, dur, name, o = {}) {
  const R = { ...RECIPES[name], ...o }, k = (EASE[R.e] || ease.linear)(clamp(t / dur)), T = V3(o.target || [0, 1.5, 0]);
  if (R.orbit) { const [rad, h, a0, a1] = R.orbit, a = lerp(a0, a1, k); camera.position.set(T.x + Math.sin(a) * rad, T.y + h, T.z + Math.cos(a) * rad); }
  else { const p = V3(R.from).lerp(V3(R.to), k); camera.position.copy(T).add(p); }
  if (R.shake || o.handheld) { const a = R.shake || o.handheld; camera.position.x += noise(t * 1.7, 1) * a; camera.position.y += noise(t * 1.9, 2) * a; }
  const look = R.pov ? T.clone().add(new THREE.Vector3(0, -0.15, -2)) : T.clone().add(V3(R.look || [0, 0, 0]));
  if (name === 'pov') look.copy(T).add(new THREE.Vector3(0, -0.25, -2));
  if (R.track) look.x = camera.position.x * 0.6 + T.x * 0.4;
  camera.up.set(0, 1, 0); camera.lookAt(look);
  const roll = Array.isArray(R.roll) ? lerp(R.roll[0], R.roll[1], k) : (R.roll || 0); if (roll) camera.rotateZ(THREE.MathUtils.degToRad(roll));
  if (camera.fov !== R.fov) { camera.fov = R.fov; camera.updateProjectionMatrix(); }
}
// whipList(camera, t, items:[ [x,y,z], ...], hold=0.45, whip=0.17): hold on each object, whip to the next (R08)
export function whipList(camera, t, items, hold = 0.45, whip = 0.17, dist = 2.2) {
  const per = hold + whip, i = Math.min(items.length - 1, Math.floor(t / per)), lt = t - i * per;
  const a = V3(items[i]), b = V3(items[Math.min(items.length - 1, i + 1)]), k = lt < hold ? 0 : ease.inOut((lt - hold) / whip);
  const tgt = a.clone().lerp(b, k); camera.position.set(tgt.x, tgt.y + 0.3, tgt.z + dist); camera.lookAt(tgt); camera.fov = 45; camera.updateProjectionMatrix();
}

// ---------- set pieces (low-poly, lit) ----------
const std = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85, flatShading: true, ...o });
const sh = (m) => { m.castShadow = true; m.receiveShadow = true; return m; };
export function pine(x, z, s = 1, snow = false) { const g = new THREE.Group(); g.add(sh(new THREE.Mesh(new THREE.CylinderGeometry(0.08 * s, 0.12 * s, 0.8 * s, 6), std('#4a3020')))); g.children[0].position.y = 0.4 * s;
  for (let i = 0; i < 3; i++) { const c = sh(new THREE.Mesh(new THREE.ConeGeometry((1.0 - i * 0.25) * s, 1.4 * s, 7), std(snow && i === 2 ? '#e8eef5' : '#1f4a32'))); c.position.y = (1.2 + i * 0.7) * s; g.add(c); } g.position.set(x, 0, z); return g; }
export function rock(x, z, s = 1, color = '#8a8a90', seed = 1) { const geo = new THREE.IcosahedronGeometry(s, 0); const p = geo.attributes.position; for (let i = 0; i < p.count; i++) p.setXYZ(i, p.getX(i) * (1 + 0.25 * noise(i * 1.3, seed)), p.getY(i) * 0.7 * (1 + 0.25 * noise(i * 2.1, seed + 1)), p.getZ(i) * (1 + 0.25 * noise(i * 3.7, seed + 2))); geo.computeVertexNormals(); const m = sh(new THREE.Mesh(geo, std(color))); m.position.set(x, s * 0.35, z); return m; }
export function longhouse(x, z, w = 6, d = 12, rot = 0) { const g = new THREE.Group(); const wall = sh(new THREE.Mesh(new THREE.BoxGeometry(w, 2.2, d), std('#6a4a30'))); wall.position.y = 1.1; const roof = sh(new THREE.Mesh(new THREE.CylinderGeometry(0.01, w * 0.75, 2.6, 4, 1), std('#3a2a1e'))); roof.rotation.y = Math.PI / 4; roof.scale.z = d / (w * 1.06); roof.position.y = 3.4; g.add(wall, roof); g.position.set(x, 0, z); g.rotation.y = rot; return g; }
export function pillar(x, z, h = 6, r = 0.45, color = '#e8e2d4') { const m = sh(new THREE.Mesh(new THREE.CylinderGeometry(r, r * 1.08, h, 12), std(color, { flatShading: false, roughness: 0.6 }))); m.position.set(x, h / 2, z); return m; }
export function fire(s, x, z, size = 1) { const g = new THREE.Group(); for (let i = 0; i < 5; i++) { const f = new THREE.Mesh(new THREE.ConeGeometry(0.18 * size, 0.7 * size, 6), new THREE.MeshBasicMaterial({ color: new THREE.Color(i % 2 ? '#ffb040' : '#ff6a20').multiplyScalar(3), transparent: true, opacity: 0.85 })); f.position.set(Math.sin(i * 2.4) * 0.12 * size, 0.35 * size, Math.cos(i * 2.4) * 0.12 * size); g.add(f); } const pl = new THREE.PointLight('#ff8a30', 6 * size, 10 * size, 1.6); pl.position.y = 0.6 * size; pl.castShadow = true; g.add(pl); g.position.set(x, 0, z); g.userData.light = pl; s.add(g); return g; }
export function animateFire(g, t) { g.children.forEach((f, i) => { if (f.isMesh) { f.scale.y = 1 + 0.35 * noise(t * 6 + i, i); f.rotation.y = t * (1 + i * 0.2); } }); if (g.userData.light) g.userData.light.intensity *= 1; }
// glowing aura for gods (additive sprite behind the character)
export function aura(color = '#7cff9a', size = 2.2) { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'); const gr = x.createRadialGradient(64, 64, 4, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = gr; x.fillRect(0, 0, 128, 128);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), color: new THREE.Color(color).multiplyScalar(1.5), blending: THREE.AdditiveBlending, depthWrite: false, transparent: true, opacity: 0.6 })); s.scale.set(size, size * 1.3, 1); s.position.y = 1.1; return s; }
export { THREE };
