// Rear Left SC01-SC14: cold open, Rule 1, title, and the pump-six flashback. Local time t; word cues from params.w.
import {E,registerShot,ease,prog,lerp,clamp,glow} from '/engine/core.js';
import {K,lamp} from '../sets/car.js';
import {cluster,ruleCard,titleCard} from '../sets/dash.js';
import {cabinFront,cabin3q,passengerSeat,mirrorECU,lockAll,keyPt} from '../sets/cabin.js';
import {highway,shop,forecourt,doorSeam,doorSill} from '../sets/places.js';
import {cue,hdr,keyV} from './_util.js';
const wash=(g,x,y,r,col,a)=>{if(a<=0)return;g.save();g.globalCompositeOperation='lighter';glow(g,x,y,r,col,a);g.restore();};

// SC01 — pulling away from pump six: the needle reaches 5 and the rear-left door segment lights.
registerShot('SC01',{draw(g,t,info){
  const mph=t<.55?5*ease.inOut(t/.55):5+(t-.55)*2.4;
  cluster(g,{mph,digits:Math.floor(mph),doors:{rl:mph>=5?1:0}},{cx:900,cy:560,z:1.15});
  wash(g,160,60,1000,K.dash,.22*(1-prog(t,1.2,5.5)));hdr(g,info);
}});
// SC02 — ten minutes later: the passenger-side medium, the rear-left door behind YOU's shoulder.
registerShot('SC02',{draw(g,t,info){
  cabin3q(g,info.globalT,{view:{cx:700,cy:560,z:.8},screen:'map'});hdr(g,info);
}});
// SC03 — eyes flick toward the shoulder and back; hands stay on the wheel.
registerShot('SC03',{draw(g,t,info){
  const c=cue(info,'pull'),gx=keyV(t,[[0,0],[c,0],[c+.3,-.85],[c+.75,-.85],[c+1.05,0]]);
  cabinFront(g,info.globalT,{view:{cx:1105,cy:520,z:1.12},face:.12,gaze:[gx,.08]});hdr(g,info);
}});
registerShot('SC04',{draw(g,t,info){
  ruleCard(g,t,1,["DON'T PULL OVER.","LOCK ALL DOORS."],()=>cluster(g,{mph:60,doors:{rl:1}},{cx:960,cy:540,z:1}));hdr(g,info);
}});
// SC05 — a road seam shakes the needle; the door segment does not flicker.
registerShot('SC05',{draw(g,t,info){
  const c=cue(info,'flickers'),sh=t>c&&t<c+.35?Math.sin((t-c)*60)*(1-(t-c)/.35):0;
  cluster(g,{mph:60+sh,digits:60,doors:{rl:1},sweep:lamp(info.globalT,.3)},{cx:1000,cy:520,z:1.55});hdr(g,info);
}});
registerShot('SC06',{draw(g,t,info){highway(g,info.globalT,t,{phase:.7});hdr(g,info);}});
// SC07 — the finger comes in and presses LOCK ALL on "Once."
registerShot('SC07',{draw(g,t,info){
  const c=cue(info,'once.',0,1.4),f=keyPt(t,[[0,[640,120]],[.3,[640,120]],[c-.15,[860,470]],[c,[870,520]],[c+.35,[870,520]],[c+.8,[700,260]]]);
  lockAll(g,info.globalT,{finger:f,press:t>c&&t<c+.35?1:0,lit:t>c?1:0});hdr(g,info);
}});
// SC08 — four clicks: the driver's pin drops first; the padlock appears in the cluster's corner.
registerShot('SC08',{draw(g,t,info){
  doorSill(g,info.globalT,t,{drop:ease.out(prog(t,.3,.42)),lock:ease.out(prog(t,.75,1.0))});hdr(g,info);
}});
registerShot('SC09',{draw(g,t,info){titleCard(g,t);}});
// SC10 — back at pump six: YOU pays; through the window the car's dome light is already on (a door opened).
registerShot('SC10',{draw(g,t,info){shop(g,info.globalT,t,{dome:1,gap:4});hdr(g,info);}});
// SC11 — YOU walks back; the dome light fades out just before YOU reaches the car.
registerShot('SC11',{draw(g,t,info){
  const d=info.dur;forecourt(g,info.globalT,t,{walk:prog(t,0,d*.85),dome:1-prog(t,d*.42,d*.42+1.5)});hdr(g,info);
}});
// SC12 — the bag goes onto the passenger seat; the airbag lamp reads OFF.
registerShot('SC12',{draw(g,t,info){
  const h=keyPt(t,[[0,[980,420]],[.9,[1120,560]],[1.4,[1120,560]],[2.2,[700,300]]]);
  passengerSeat(g,info.globalT,{light:'canopy',place:prog(t,.1,.9),hand:t<2.2?h:null,pab:0});hdr(g,info);
}});
// SC13 — the mirror was tilted down at the dented rear-left cushion; YOU's fingers tilt it back without looking.
registerShot('SC13',{draw(g,t,info){
  const c=cue(info,'fixed',0,1.6);
  mirrorECU(g,info.globalT,{tilt:'down',k:ease.inOut(prog(t,c,c+.35)),fingers:t>c-.7&&t<c+.9?ease.out(prog(t,c-.7,c-.3)):0,light:'canopy'});hdr(g,info);
}});
// SC14 — as the car rolls out, a 1 cm gap along the rear-left door edge.
registerShot('SC14',{draw(g,t,info){doorSeam(g,info.globalT,t,{gap:22,speed:140});hdr(g,info);}});
