// Rear Left SC15-SC40 and SC46: Rules 2-5 (the breach itself is in breach.js).
import {E,registerShot,ease,prog,lerp,clamp,glow} from '/engine/core.js';
import {K,lamp} from '../sets/car.js';
import {cluster,overhead,ruleCard,CL} from '../sets/dash.js';
import {cabinFront,cabin3q,mirrorECU,footwell,gearSel,cutaway,keyPt,SIGNAL_RED} from '../sets/cabin.js';
import {handleECU,signScene,rampScene,avenue,rearWindow} from '../sets/places.js';
import {cue,hdr,keyV} from './_util.js';
const wash=(g,x,y,r,col,a)=>{if(a<=0)return;g.save();g.globalCompositeOperation='lighter';glow(g,x,y,r,col,a);g.restore();};

// ---- Rule 2: keep the needle above twenty
registerShot('SC15',{draw(g,t,info){ruleCard(g,t,2,'KEEP THE NEEDLE ABOVE 20',()=>cluster(g,{mph:60,doors:{rl:1}},{cx:600,cy:560,z:1.3}));hdr(g,info);}});
registerShot('SC16',{draw(g,t,info){
  cluster(g,{mph:60,doors:{rl:1},ajar:ease.out(prog(t,.2,.8)),lock:1,sweep:lamp(info.globalT,1.2)},{cx:1450,cy:600,z:1.6});hdr(g,info);
}});
registerShot('SC17',{draw(g,t,info){handleECU(g,info.globalT,t,{phase:.5});hdr(g,info);}});
registerShot('SC18',{draw(g,t,info){signScene(g,info.globalT,t,info.dur);hdr(g,info);}});
// SC19 — the foot lifts off the gas, swings to hover over the brake, and goes back without pressing.
registerShot('SC19',{draw(g,t,info){
  const b=cue(info,'brake',0,1),l=cue(info,'lift',0,3.5);
  const st=t<b?{from:'gas',foot:'lift',k:prog(t,.2,.6)}:t<l?{from:'lift',foot:'hover',k:prog(t,b,b+.5)}:{from:'hover',foot:'lift',k:prog(t,l,l+.5)};
  footwell(g,info.globalT,st);hdr(g,info);
}});
// SC20 — forty, thirty, twenty-two: the door segment flickers just before the word.
registerShot('SC20',{draw(g,t,info){
  const a=cue(info,'forty.'),b=cue(info,'thirty.'),c=cue(info,'twentytwo.'),f=cue(info,'flickers.');
  const mph=keyV(t,[[0,46],[a,40],[b,30],[c,22]]),fl=t>f-.5&&((t<f-.43)||(t>f-.3&&t<f-.23)||(t>f+.1&&t<f+.17));
  cluster(g,{mph,doors:{rl:fl?0:1}},{cx:900,cy:540,z:1.3});hdr(g,info);
}});
registerShot('SC21',{draw(g,t,info){rampScene(g,info.globalT,t,info.dur);hdr(g,info);}});
registerShot('SC22',{draw(g,t,info){cluster(g,{mph:30,doors:{rl:1}},{cx:1238,cy:523,z:4.2});hdr(g,info);}});
// ---- Rule 3: the dome light
registerShot('SC23',{draw(g,t,info){ruleCard(g,t,3,"DON'T TURN ON THE DOME LIGHT",()=>overhead(g,{pab:0},{cx:960,cy:420,z:1}));hdr(g,info);}});
registerShot('SC24',{draw(g,t,info){overhead(g,{pab:0,thumb:[1245,lerp(980,480,ease.out(prog(t,.15,1.2)))]},{cx:1000,cy:420,z:1.25});hdr(g,info);}});
// SC25 — eyes up at the switch, arm still raised; on "Don't." the eyes drop back to the road.
registerShot('SC25',{draw(g,t,info){
  const d=cue(info,"don't.",0,3),gy=keyV(t,[[0,-.9],[d,-.9],[d+.2,.05]]);
  cabinFront(g,info.globalT,{view:{cx:1060,cy:470,z:1.08},gaze:[-.15,gy],rHand:[905,140],rElbow:[700,430],rHandRot:-1.4});hdr(g,info);
}});
// SC26 — reaching was enough: the warning jumps from rear-left to the driver's own door.
registerShot('SC26',{draw(g,t,info){
  const j=cue(info,'look.',0,2.5)-.5;cluster(g,{mph:44,doors:t<j?{rl:1}:{fl:1}},{cx:1330,cy:470,z:2.4});hdr(g,info);
}});
// SC27 — hand back on the wheel; the driver's door panel and handle in the passing light.
registerShot('SC27',{draw(g,t,info){
  const H=keyPt(t,[[0,[1250,330]],[.2,[1250,330]],[.9,[1316,780]]]),El=keyPt(t,[[0,[1080,560]],[.2,[1080,560]],[.9,[1000,920]]]);
  cabin3q(g,info.globalT,{view:{cx:640,cy:600,z:1.05},rHand:H,rElbow:El,doorLit:1,lampPhase:1.6});hdr(g,info);
}});
registerShot('SC28',{draw(g,t,info){cluster(g,{mph:44,doors:t<.3?{fl:1}:{rl:1}},{cx:960,cy:540,z:1.1});hdr(g,info);}});
registerShot('SC29',{draw(g,t,info){cutaway(g,info.globalT,{t,lampAt:.55});hdr(g,info);}});
// ---- Rule 4: the red light
registerShot('SC30',{draw(g,t,info){ruleCard(g,t,4,'AT A RED LIGHT, NEVER SHIFT INTO PARK',()=>avenue(g,info.globalT,t,{sig:'red',carX:1440}));hdr(g,info);}});
registerShot('SC31',{draw(g,t,info){
  const r=cue(info,'red.',0,2)-.5,s=cue(info,'stop',0,4)+.3,k=ease.out(prog(t,0,s));
  avenue(g,info.globalT,t,{sig:t<r?'yellow':'red',carX:lerp(760,1440,k),speed:(1-k)*700});hdr(g,info);
}});
registerShot('SC32',{draw(g,t,info){const c=cue(info,'shift',0,.8);gearSel(g,info.globalT,{pos:3,thumb:ease.out(prog(t,c,c+.25)),red:1});hdr(g,info);}});
registerShot('SC33',{draw(g,t,info){cluster(g,{mph:0,doors:{rl:1},gear:'D',lock:1},{cx:1560,cy:830,z:2.6});wash(g,600,0,1400,SIGNAL_RED,.08);hdr(g,info);}});
registerShot('SC34',{draw(g,t,info){footwell(g,info.globalT,{from:'brake',foot:'brake',k:1,press:.6,red:1});hdr(g,info);}});
// SC35 — at zero: the rear-left seat warning lights before the narrator names it.
registerShot('SC35',{draw(g,t,info){
  const c=cue(info,'chime.',0,1.5)-.3;cluster(g,{mph:0,doors:{rl:1},seat:ease.out(prog(t,c,c+.08))},{cx:1330,cy:560,z:2.6});wash(g,600,0,1400,SIGNAL_RED,.1);hdr(g,info);
}});
registerShot('SC36',{draw(g,t,info){cabinFront(g,info.globalT,{view:{cx:1105,cy:500,z:1.12},red:1,blink:.22,gaze:[0,.1],sodium:false});hdr(g,info);}});
registerShot('SC37',{draw(g,t,info){
  const k=ease.in(prog(t,.6,info.dur));avenue(g,info.globalT,t,{sig:t<.12?'red':'green',carX:1440+k*1100,speed:k*1200});hdr(g,info);
}});
// ---- Rule 5: the mirror (SC41-SC45 in breach.js)
registerShot('SC38',{draw(g,t,info){ruleCard(g,t,5,"DON'T TOUCH THE MIRROR",()=>mirrorECU(g,info.globalT,{tilt:'up'}));hdr(g,info);}});
registerShot('SC39',{draw(g,t,info){mirrorECU(g,info.globalT,{tilt:'up',lampPhase:1.7});hdr(g,info);}});
// SC40 — the right hand rises toward the mirror and stops short of it.
registerShot('SC40',{draw(g,t,info){
  const c=cue(info,'want',0,.4),H=keyPt(t,[[0,[1316,780]],[c,[1316,780]],[c+.5,[1440,190]]]),El=keyPt(t,[[0,[1000,920]],[c,[1000,920]],[c+.5,[1150,560]]]);
  cabin3q(g,info.globalT,{view:{cx:1080,cy:470,z:.95},rHand:H,rElbow:El,rHandRot:-1.2});hdr(g,info);
}});
// SC46 — a palm-sized patch of fog blooms on the inside of the back glass.
registerShot('SC46',{draw(g,t,info){rearWindow(g,info.globalT,t,{fog:keyV(t,[[0,0],[.5,0],[1.4,1],[3.2,1],[info.dur,.2]])});hdr(g,info);}});
