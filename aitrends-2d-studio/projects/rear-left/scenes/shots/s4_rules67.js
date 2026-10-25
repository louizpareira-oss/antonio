// Rear Left SC47-SC64: Rule 6 (the weight moves to the seat beside you) and Rule 7 (into the closed garage).
import {E,registerShot,ease,prog,lerp,clamp,glow} from '/engine/core.js';
import {K,lamp} from '../sets/car.js';
import {cluster,overhead,ruleCard} from '../sets/dash.js';
import {cabinFront,cabinProfile,passengerSeat,gearSel,keyPt,WARM} from '../sets/cabin.js';
import {consoleLid,house,garageEntry,garageInside,sideMirrorECU,visorRemote,startBtn} from '../sets/places.js';
import {cue,hdr,keyV} from './_util.js';

// ---- Rule 6
registerShot('SC47',{draw(g,t,info){ruleCard(g,t,6,['PASSENGER AIRBAG LIGHT ON?','BOTH HANDS ON THE WHEEL.'],()=>passengerSeat(g,info.globalT,{pab:0}));hdr(g,info);}});
// SC48 — the rear-left seat warning goes dark before the line: the back seat has emptied.
registerShot('SC48',{draw(g,t,info){cluster(g,{mph:55,doors:{rl:1},seat:1-prog(t,.12,.2)},{cx:1300,cy:545,z:3.2});hdr(g,info);}});
// SC49 — the airbag lamp under the mirror: OFF, then ON, half a second before the word.
registerShot('SC49',{draw(g,t,info){const c=cue(info,'on.',0,3)-.5;overhead(g,{pab:t>c?1:0},{cx:860,cy:340,z:1.6});hdr(g,info);}});
// SC50 — the bag tips into the footwell; the seat sinks under nothing.
registerShot('SC50',{draw(g,t,info){
  const a=cue(info,'tips',0,3),b=cue(info,'sinks.',0,5);
  passengerSeat(g,info.globalT,{pab:1,tip:prog(t,a-.1,a+.6),dent:ease.out(prog(t,b-.3,b+.5)),lampPhase:.4});hdr(g,info);
}});
registerShot('SC51',{draw(g,t,info){consoleLid(g,info.globalT,t,{phase:1.4});hdr(g,info);}});
// SC52 — eyes flick to the seat beside YOU and back; nothing else moves.
registerShot('SC52',{draw(g,t,info){
  const gx=keyV(t,[[0,0],[.25,-.6],[.9,-.6],[1.15,0]]);
  cabinFront(g,info.globalT,{view:{cx:1060,cy:500,z:1.12},gaze:[gx,.1],dent:1,bag:'footwell',lampPhase:.9});hdr(g,info);
}});
// SC53 — the hand starts toward the seat, stops on "Don't.", and goes back to the wheel.
registerShot('SC53',{draw(g,t,info){
  const w=cue(info,'want',0,.3),d=cue(info,"don't.",0,3),b=cue(info,'both',0,4);
  const H=keyPt(t,[[0,[776,836]],[w,[776,836]],[w+.6,[650,700]],[d,[650,700]],[b,[776,836]]]),El=keyPt(t,[[0,[640,900]],[w,[640,900]],[w+.6,[600,860]],[d,[600,860]],[b,[640,900]]]);
  cabinFront(g,info.globalT,{view:{cx:900,cy:600,z:.84},dent:1,bag:'footwell',rHand:H,rElbow:El,lampPhase:.2});hdr(g,info);
}});
// SC54 — the rear-left segment goes dark: nothing is holding that door any more; it latches.
registerShot('SC54',{draw(g,t,info){cluster(g,{mph:55,doors:{rl:1-prog(t,.15,.2)}},{cx:1238,cy:520,z:3});hdr(g,info);}});
registerShot('SC55',{draw(g,t,info){cabinProfile(g,info.globalT,{lampPhase:.4});hdr(g,info);}});
// ---- Rule 7
registerShot('SC56',{draw(g,t,info){ruleCard(g,t,7,'CLOSE THE GARAGE BEFORE YOU OPEN YOUR DOOR',()=>house(g,info.globalT,t,{carX:-400}));hdr(g,info);}});
registerShot('SC57',{draw(g,t,info){
  const k=ease.out(prog(t,0,info.dur));house(g,info.globalT,t,{carX:lerp(-120,520,k),speed:(1-k)*500,blink:(t>.35&&t<.6)||(t>.85&&t<1.1)});hdr(g,info);
}});
// SC58 — YOU looks left at the porch, then turns back on "Don't."
registerShot('SC58',{draw(g,t,info){
  const w=cue(info,'stop',0,.8),d=cue(info,"don't.",0,4),f=keyV(t,[[0,0],[w,0],[w+.5,.38],[d,.38],[d+.4,0]]);
  cabinFront(g,info.globalT,{view:{cx:1105,cy:500,z:1.12},face:f,gaze:[f*1.6,.05],warmR:.4+.6*f/.38,sodium:false});hdr(g,info);
}});
registerShot('SC59',{draw(g,t,info){garageEntry(g,info.globalT,t,info.dur);hdr(g,info);}});
registerShot('SC60',{draw(g,t,info){
  const c=cue(info,'press',0,.2)+.35,th=keyPt(t,[[0,[700,1200]],[c-.3,[700,420]],[c,[700,410]],[c+.3,[700,420]]]);
  visorRemote(g,info.globalT,t,{thumb:th,press:t>c&&t<c+.3?1:0,led:t>c&&t<c+.5?1:0});hdr(g,info);
}});
registerShot('SC61',{draw(g,t,info){sideMirrorECU(g,info.globalT,t,{door:lerp(.05,.62,prog(t,0,info.dur))});hdr(g,info);}});
// SC62 — the door reaches the floor; the streetlight wedge thins to a line and is gone.
registerShot('SC62',{draw(g,t,info){const c=cue(info,'nothing.',0,2.5);garageInside(g,info.globalT,t,{door:lerp(.62,1,ease.in(prog(t,0,c)))});hdr(g,info);}});
registerShot('SC63',{draw(g,t,info){const c=cue(info,'shift',0,.6);gearSel(g,info.globalT,{pos:lerp(3,0,ease.inOut(prog(t,c,c+.9))),warm:1});hdr(g,info);}});
registerShot('SC64',{draw(g,t,info){
  const c=cue(info,'off.',0,.4),f=keyPt(t,[[0,[960,1150]],[Math.max(0,c-.35),[960,620]],[c,[960,600]],[c+.4,[960,640]]]);
  startBtn(g,info.globalT,t,{finger:f,press:t>c&&t<c+.3?1:0,dim:prog(t,c,c+.6),pab:true});hdr(g,info);
}});
