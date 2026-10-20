// shots/07_3d_orbit.js — HORROR: 3D slow orbit of empty kitchen, phone glowing alone
import { E, V, registerShot, mood } from '/engine/core.js';

registerShot('s007', {
  kind: '3d',
  init(T, info) {
    const st = T.stage({ mood: 'abyss', fov: 50, fog: [2, 12], bloom: 0.4 });

    // Floor
    const floor = T.ground(12, 12, '#0a0a0e'); st.add(floor);

    // Back wall
    const wall = T.box(12, 3, 0.2, '#141418');
    wall.position.set(0, 1.5, -5);
    st.add(wall);

    // Window frame on wall (shows pure black = wrong)
    const winFrame = T.box(3, 2, 0.1, '#1a1a20');
    winFrame.position.set(0, 1.8, -4.88);
    st.add(winFrame);
    const winGlass = T.windowPane(2.6, 1.6, { glowColor: '#000000', cols: 2, rows: 2, power: 0.0, interior: '#000000' });
    winGlass.position.set(0, 1.8, -4.85);
    st.add(winGlass);

    // Counter
    const counter = T.box(6, 0.3, 1.2, '#0a0a0e');
    counter.position.set(0, 0.85, -2);
    st.add(counter);
    const counterFront = T.box(6, 0.85, 0.1, '#141418');
    counterFront.position.set(0, 0.425, -1.4);
    st.add(counterFront);

    // THE PHONE — glowing wrong on counter
    const phoneBody = T.box(0.12, 0.24, 0.02, '#1a1a1a');
    phoneBody.position.set(0.6, 1.02, -1.95);
    phoneBody.rotation.x = -0.3;
    st.add(phoneBody);

    // Phone screen glow — sickly green
    const screen = T.plane(0.1, 0.18, T.basic('#39ff14'));
    screen.position.set(0.6, 1.03, -1.938);
    screen.rotation.x = -0.3;
    st.add(screen);

    // Add point light at phone position
    const phoneLight = new T.THREE.PointLight('#39ff14', 0.8, 3);
    phoneLight.position.set(0.6, 1.05, -1.9);
    st.scene.add(phoneLight);

    return { stage: st };
  },
  draw(s, t, info, T) {
    // Slow, CREEPING orbit — very slow, unsettling
    T.orbit(s.stage.camera, t, {
      target: [0.6, 1.0, -1.9],
      radius: 3.5,
      height: 0.8,
      from: -0.6,
      to: 0.6,
      dur: info.dur
    });
  }
});
