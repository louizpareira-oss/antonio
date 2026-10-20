import {E,registerShot,ease,prog,lerp,text,circle,alpha,seg} from '/engine/core.js';
import * as P from '/engine/pictogram2d.js';
import * as FX from '/engine/fx2d.js';
const C=P.COLORS;
function base(g,globalT,status='',step=1){P.background(g,globalT);P.hud(g,globalT,{title:'SKOTOMA / COAT CHECK',step,count:3,status});}
function wide(g,t,{light=1,newPerson=false,coat=true,walkIn=false,exit=false,reach=0}={}){
  const R=P.room(g,{t,light});
  if(coat)P.coat(g,{x:R.hookX,y:R.hookY,s:1.32,breath:t>2.4?.5+.5*Math.sin((t-2.4)*Math.PI*1.4):0});
  const move=ease.inOut(prog(t,.1,2)),xx=exit?lerp(E.W*.4,E.W*.025,ease.inOut(prog(t,0,3.7))):walkIn?lerp(E.W*.075,E.W*.4,move):E.W*.4;
  P.human(g,{x:xx,y:R.floorY,s:.92,facing:exit?-1:1,pose:P.poseBetween('stand','reach',reach),walk:walkIn&&move<1||exit&&t<3.7?.9:0,phase:t*7,look:1});
  if(newPerson){const k=exit?ease.inOut(prog(t,.3,4)):0;P.human(g,{x:lerp(R.hookX,E.W*.4,k),y:R.floorY,s:.92,facing:-1,walk:exit&&k<1?.7:0,phase:t*7,look:1,wardrobe:'coat'});}
  return R;
}
registerShot('c001',{draw(g,t,info){base(g,info.globalT,t<2.4?'HOME':'MOVEMENT DETECTED');wide(g,t,{walkIn:true});}});
registerShot('c002',{draw(g,t,info){base(g,info.globalT,'NO ONE INSIDE');const x=E.W*.5,y=E.H*.26;
  seg(g,[[x-35,y-30],[x-35,y-66],[x+15,y-66],[x+25,y-46],[x,y-20]],8,C.muted);
  P.coat(g,{x,y,s:2.9,breath:.5+.5*Math.sin(t*Math.PI*1.4)});
  // Small directional fabric marks support the breathing action rather than a zoom-only hold.
  const a=.15+.35*(.5+.5*Math.sin(t*Math.PI*1.4));for(const sign of [-1,1])seg(g,[[x+sign*210,y+185],[x+sign*242,y+185]],5,alpha(C.yellow,a));
}});
registerShot('c003',{draw(g,t,info){base(g,info.globalT,'',1);P.ruleTitle(g,t,{number:1,total:3,title:'KEEP THE LIGHT ON'});}});
registerShot('c004',{draw(g,t,info){const changed=t>=2.2,light=t>=1.8&&t<2.2?.08:1;base(g,info.globalT,changed?'OCCUPIED':'DO NOT TOUCH THE SWITCH');
  wide(g,t+3,{light,newPerson:changed,coat:!changed,reach:ease.inOut(prog(t,.1,1.25))*(1-ease.inOut(prog(t,2.6,3.3)))});
  if(light<.1){g.fillStyle='rgba(0,0,0,.88)';g.fillRect(0,0,E.W,E.H);}
  if(t>=1.8&&t<1.884)FX.glitch(g,t,{strength:5,bands:3,a:.3});
}});
registerShot('c005',{draw(g,t,info){base(g,info.globalT,'COMPARE THE STATES',2);
  P.evidenceCard(g,{x:E.W*.29,y:E.H*.49,w:620,h:500,title:'LIGHT ON',subtitle:'THE HOOK',status:true,draw(gg){P.coat(gg,{x:0,y:-115,s:1.25});}});
  if(t>.6)P.evidenceCard(g,{x:E.W*.71,y:E.H*.49,w:620,h:500,title:'LIGHT OFF',subtitle:'THE FLOOR',status:false,draw(gg){P.human(gg,{x:0,y:135,s:.8,look:1,wardrobe:'coat'});}});
}});
registerShot('c006',{draw(g,t,info){base(g,info.globalT,'ONE OF YOU IS HOME',3);wide(g,t,{newPerson:true,coat:false,exit:true});}});
