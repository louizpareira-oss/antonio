// scenes/shots.js — every shot in story/shots.json names a template from ns.js in params.tpl;
// timing for in-shot events (params.*At, say[].at, glitch) is in seconds from the shot start.
import { E, registerShot, ease } from '/engine/core.js';
import * as FX from '/engine/fx2d.js';
import * as NS from './ns.js';

const TPL = { cockpit: NS.cockpit, carTop: NS.carTop, road: NS.roadPOV, sensor: NS.sensor, rule: NS.ruleCard, rules7: NS.rules7,
  radio: NS.radio, cross: NS.crossList, redLight: NS.redLight, phone: NS.phone, park: NS.park, route: NS.route,
  autopilot: NS.autopilot, checklist: NS.checklist, end: NS.endCard, text: () => {} };

for (const shot of E.shots) {
  const p = shot.params || {};
  registerShot(shot.id, {
    draw(g, t, info) {
      NS.bg(g, t);
      const z = 1 + (p.push ?? 0.04) * ease.inOut(t / info.dur);
      g.save(); g.translate(E.W / 2, E.H / 2); g.scale(z, z); g.translate(-E.W / 2, -E.H / 2);
      const tpl = TPL[p.tpl]; if (!tpl) throw new Error(`unknown template ${p.tpl}`);
      tpl(g, t, p);
      if (p.say) NS.say(g, t, p.say, p.sayOpts || {});
      g.restore();
      FX.static(g, t, { a: p.static ?? 0.035 });
      NS.hud(g, t, info);
      (p.glitch || []).forEach(([a, b, amt]) => { if (t >= a && t <= b) FX.glitch(g, t, { amount: amt ?? 0.8, rate: 0.7 }); });
    },
  });
}
