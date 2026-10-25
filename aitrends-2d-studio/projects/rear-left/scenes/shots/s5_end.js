// Rear Left SC65-SC74: what the dashboard never told you.
import {E,registerShot,ease,prog,lerp,clamp,glow,rr,seg,poly,alpha} from '/engine/core.js';
import {K,line} from '../sets/car.js';
import {cluster,overhead} from '../sets/dash.js';
import {cabinFront,passengerSeat,lockAll,shape} from '../sets/cabin.js';
import {shop,garageInside,mediaGhost} from '../sets/places.js';
import {cue,hdr,keyV,memory} from './_util.js';
const wash=(g,x,y,r,col,a)=>{if(a<=0)return;g.save();g.globalCompositeOperation='lighter';glow(g,x,y,r,col,a);g.restore();};
const ACC={mph:0,doors:{},gear:'P',lock:1,open:1,bright:.22};

registerShot('SC65',{draw(g,t,info){cluster(g,ACC,{cx:1100,cy:540,z:1.3});hdr(g,info);}});
// SC66 (memory) — the needle creeps to 4 with the segment dark; at 5 it lights.
registerShot('SC66',{draw(g,t,info){
  const c=cue(info,'five',0,1.6),mph=t<c?4*ease.inOut(prog(t,.1,c-.1)):5;
  memory(g,()=>cluster(g,{mph,digits:Math.floor(mph),doors:{rl:mph>=5?1:0}},{cx:900,cy:600,z:1.6}));hdr(g,info);
}});
// SC67 (memory) — the camera looks past YOU at the till: the dome light on, the rear-left door swinging nearly shut.
registerShot('SC67',{draw(g,t,info){
  const c=cue(info,'paid.',0,3);memory(g,()=>shop(g,info.globalT,t,{dome:1,gap:lerp(60,8,ease.in(prog(t,c-.5,c))),focus:prog(t,0,1.4)}));hdr(g,info);
}});
// SC68 (memory) — LOCK ALL pressed; behind it, the rear-left pin drops while that door's edge stays open.
registerShot('SC68',{draw(g,t,info){
  const c=cue(info,'lock',0,.8);
  memory(g,()=>{lockAll(g,info.globalT,{press:t>c&&t<c+.3?1:0,lit:t>c?1:0,finger:t<c+.5?[870,t<c?lerp(300,520,prog(t,c-.6,c)):520]:null});
    g.save();g.beginPath();g.rect(1180,0,740,380);g.clip();g.fillStyle='#06080c';g.fillRect(1180,0,740,380);
    shape(g,[[1180,170],[1920,150],[1920,230],[1180,250]],'#141821',.6);const d=ease.out(prog(t,c+.6,c+.75));
    rr(g,1500,90+d*30,30,80-d*30,8);g.fillStyle='#c9ced6';g.fill();poly(g,[[1700,0],[1730,0],[1736,380],[1706,380]],'#000');seg(g,[[1730,0],[1736,380]],2.5,line(.6));
    g.restore();const v=g.createLinearGradient(1180,0,1380,0);v.addColorStop(0,K.bg);v.addColorStop(1,'rgba(7,8,12,0)');g.fillStyle=v;g.fillRect(1180,0,200,380);
    const h=g.createLinearGradient(0,380,0,300);h.addColorStop(0,K.bg);h.addColorStop(1,'rgba(7,8,12,0)');g.fillStyle=h;g.fillRect(1180,300,740,80);});
  hdr(g,info);
}});
// SC69 — back in the present: the opener bulb times out; only the cluster glow remains in the windshield.
registerShot('SC69',{draw(g,t,info){const c=cue(info,'garage.',0,5);const b=1-prog(t,c,c+.15);garageInside(g,info.globalT,t,{door:1,bulb:b,dashGlow:1-b*.6});hdr(g,info);}});
registerShot('SC70',{draw(g,t,info){mediaGhost(g,info.globalT,t,{ghost:1-prog(t,.3,info.dur)});hdr(g,info);}});
// SC71 — the dome light comes on by itself; YOU turns to the seat for the first time.
registerShot('SC71',{draw(g,t,info){
  const n=cue(info,'now',0,1.8),f=keyV(t,[[0,0],[n,0],[n+.6,-.45]]);
  cabinFront(g,info.globalT,{view:{cx:900,cy:600,z:.84},dome:ease.out(prog(t,.1,1)),sodium:false,under:.3,dent:1,bag:'footwell',face:f,gaze:[f*2,.2*(f<0?1:0)]});hdr(g,info);
}});
// SC72 — the belt pays out across the empty seat and latches on "Click."
registerShot('SC72',{draw(g,t,info){
  const c=cue(info,'click.',0,3);passengerSeat(g,info.globalT,{view:{cx:1000,cy:640,z:1.45},light:'dome',dent:1,tip:1,belt:prog(t,.25,c),pab:1});hdr(g,info);
}});
registerShot('SC73',{draw(g,t,info){
  cabinFront(g,info.globalT,{view:{cx:1060,cy:430,z:1.3},dome:1,sodium:false,under:.3,dent:1,bag:'footwell',face:-.45,gaze:[-.9,.2],eyeScale:1+.1*ease.out(prog(t,.2,.6))});hdr(g,info);
}});
// SC74 — the opening frame again: every door segment dark. Then up to the lamp under the mirror: PASSENGER AIRBAG ON.
registerShot('SC74',{draw(g,t,info){
  const c=cue(info,'passenger',0,info.dur-4)-.3,k=ease.inOut(prog(t,c,c+1.2));
  g.save();g.translate(0,k*E.H);cluster(g,ACC,{cx:900,cy:560,z:1.15});wash(g,960,-100,1200,'#ffc98a',.2*(1-prog(t,0,1.4)));g.restore();
  if(k>0){g.save();g.translate(0,(k-1)*E.H);overhead(g,{pab:1},{cx:860,cy:340,z:1.6});g.restore();}
  hdr(g,info);
}});
