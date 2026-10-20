// Two Peepholes preview. Local cue times are derived from timeline/words.json (global word start - shot start).
import {E,registerShot,ease,prog,lerp,clamp,text,circle,ring,seg,rr,alpha,noise} from '/engine/core.js';
import * as P from '/engine/pictogram2d.js';
import * as FX from '/engine/fx2d.js';
import {C,CASE,ENTRY,PEER,DOOR_FILL,WARM,entry,lens,headOf,doorFront,doorFace,FACE} from '../sets/entry.js';
const S=ENTRY.s;
function base(g,globalT,status='',statusColor=C.red){P.background(g,globalT);P.hud(g,globalT,{title:CASE,step:1,count:4,status,statusColor});}
const person=(g,o)=>P.human(g,{y:ENTRY.floorY,s:S,look:1,...o});

// s01f — front view of the inner door face: one ordinary peephole, lit by the hallway ("one" 1.28).
registerShot('s01f',{draw(g,t,info){
  base(g,info.globalT,'HOME',C.green);
  doorFront(g,t,{oldLit:1,oldPulse:t>1.25?prog(t,1.25,2.05):-1});
}});

// s01 — side view, global-time beats: unlocking at the door, it opens on "come" (2.96), step in, door shuts (3.80), turn.
registerShot('s01',{draw(g,t,info){
  const T=info.globalT,open=T>=2.85&&T<3.80,turned=T>=3.86;
  base(g,T,'HOME',C.green);
  entry(g,T,{doorOpen:open?1:0,newHole:0});
  const enter=ease.inOut(prog(T,2.95,3.75)),x=lerp(ENTRY.outsideX,ENTRY.standX,enter);
  const unlock=.85*(1-ease.inOut(prog(T,2.85,3.1)));
  person(g,{x,facing:turned?1:-1,pose:P.poseBetween('stand','reach',unlock),walk:enter>0&&enter<1?.9:0,phase:T*7.5,label:'YOU'});
}});

// s01r — back to the front view after the door shuts: a second, brass lens opens above the old one ("two" 3.96).
registerShot('s01r',{draw(g,t,info){
  base(g,info.globalT);
  doorFront(g,t,{oldLit:1,shake:t<.15?1-t/.15:0,newHole:prog(t,.1,.42),newPulse:t>.12?prog(t,.12,.75):-1});
}});

// s02 — rule card on "don't".
registerShot('s02',{draw(g,t,info){base(g,info.globalT);P.ruleTitle(g,t,{number:1,total:4,title:"DON'T USE THE NEW ONE"});}});

// s03 — door-face insert: old lens passes light ("light" 1.46), new lens stays black ("dark" 3.22).
registerShot('s03',{draw(g,t,info){
  base(g,info.globalT);
  const cx=FACE.cx,newY=FACE.newY,oldY=FACE.oldY;
  doorFace(g,t,info.dur,{oldLit:.45+.55*ease.out(prog(t,1.4,1.75)),rays:t>1.4?ease.out(prog(t,1.4,1.9)):0},gg=>{
    if(t>3.22){const k=prog(t,3.22,3.7);ring(gg,cx,newY,104+30*ease.out(k),6*(1-k)+2,alpha(C.red,1-k*.6));}
  });
  const lab=(s,y,a,col)=>text(g,s,cx-150,y,{size:34,font:'Montserrat',weight:900,color:col,align:'right',alpha:a});
  lab('OLD',oldY,ease.out(prog(t,.3,.5)),C.muted);lab('NEW',newY,ease.out(prog(t,2.38,2.58)),C.yellow);
  if(t>1.46)P.mark(g,cx+170,oldY-70,{ok:true,size:30});
  if(t>3.22)P.mark(g,cx+170,newY-70,{ok:false,size:30});
}});

// s04 — walk to the door and put an eye to the OLD hole ("old" 0.56); the floor spot vanishes on contact.
registerShot('s04',{draw(g,t,info){
  base(g,info.globalT,'USE THE OLD ONE',C.green);
  const walk=ease.inOut(prog(t,0,.5)),lean=ease.inOut(prog(t,.45,.9));
  entry(g,t,{newHole:1,blocked:lean>.85});
  person(g,{x:lerp(ENTRY.standX,ENTRY.peerX,walk),pose:P.poseBetween('stand',PEER,lean),walk:walk<1?.8:0,phase:t*8});
}});

// s05 — fisheye view through the old peephole: the hallway is empty ("empty" 0.65).
registerShot('s05',{draw(g,t,info){
  g.fillStyle='#05070b';g.fillRect(0,0,E.W,E.H);
  const cx=960+noise(t*.8,3)*4,cy=440+noise(t*.8,9)*3,r=372;
  g.save();g.beginPath();g.arc(cx,cy,r,0,Math.PI*2);g.clip();
  g.fillStyle='#2a303c';g.fillRect(cx-r,cy-r,2*r,2*r);
  const wash=g.createRadialGradient(cx+170,cy-120,4,cx+170,cy-120,420);wash.addColorStop(0,alpha(WARM,.32));wash.addColorStop(1,alpha(WARM,0));g.fillStyle=wash;g.fillRect(cx-r,cy-r,2*r,2*r);
  const col=alpha(C.white,.62),bow=(x0,x1,y,b)=>{g.beginPath();g.moveTo(x0,y);g.quadraticCurveTo(cx,y+b,x1,y);g.stroke();};
  g.strokeStyle=col;g.lineWidth=5;bow(cx-r,cx+r,cy+175,70);bow(cx-r,cx+r,cy-215,-60);
  g.fillStyle='#1b2029';g.beginPath();g.moveTo(cx-r,cy+175);g.quadraticCurveTo(cx,cy+245,cx+r,cy+175);g.lineTo(cx+r,cy+r);g.lineTo(cx-r,cy+r);g.closePath();g.fill();
  // Neighbour door 4D, slightly bowed by the lens.
  g.strokeStyle=alpha(C.white,.78);g.lineWidth=5;g.beginPath();g.moveTo(cx-120,cy+205);g.quadraticCurveTo(cx-132,cy-30,cx-118,cy-185);g.lineTo(cx+60,cy-188);g.quadraticCurveTo(cx+72,cy-30,cx+62,cy+210);g.stroke();
  circle(g,cx+30,cy+30,8,C.white);rr(g,cx-58,cy-140,56,32,4);g.strokeStyle=alpha(C.white,.6);g.lineWidth=3;g.stroke();
  text(g,'4D',cx-30,cy-123,{size:20,font:'Montserrat',weight:800,color:alpha(C.white,.8)});
  g.save();g.shadowBlur=30;g.shadowColor=C.yellow;circle(g,cx+190,cy-110,14,C.yellow);g.restore();
  rr(g,cx+168,cy-150,44,26,4);g.fillStyle=alpha(C.white,.82);g.fill();
  const v=g.createRadialGradient(cx,cy,r*.45,cx,cy,r);v.addColorStop(0,'rgba(0,0,0,0)');v.addColorStop(1,'rgba(0,0,0,.85)');g.fillStyle=v;g.fillRect(cx-r,cy-r,2*r,2*r);
  g.restore();
  ring(g,cx,cy,r+14,28,'#10141c');ring(g,cx,cy,r+1,4,alpha(C.white,.35));
  P.hud(g,info.globalT,{title:'WRONG KNOCK / UNIT 4C — OLD PEEPHOLE',step:1,count:4,status:t>.65?'NO ONE OUTSIDE':'',statusColor:C.green});
  if(t>.65)P.mark(g,cx+r*.74,cy-r*.74,{ok:true,size:34});
}});

// s06 — the new lens, close. Question ends at 2.24; in the pause the black glass blinks (2.65).
registerShot('s06',{draw(g,t,info){
  const b0=2.65,after=t>b0+.3;
  base(g,info.globalT,after?'NOT A LENS':'NO LIGHT',C.red);
  const z=1+.07*ease.inOut(t/info.dur),cx=960,cy=440;
  g.save();g.translate(cx,cy);g.scale(z,z);g.translate(-cx,-cy);
  g.fillStyle=DOOR_FILL;g.fillRect(-60,-60,E.W+120,E.H+120);
  const lid=t<b0?0:t<b0+.11?ease.in(prog(t,b0,b0+.11)):t<b0+.22?1:1-ease.inOut(prog(t,b0+.22,b0+.44));
  lens(g,cx,cy,250,{brass:true,lid,eye:after?ease.out(prog(t,b0+.3,b0+.6)):0});
  g.restore();
}});

// s07 — back away; a sight-line from the NEW hole follows the head ("look" 1.08), turns red on "IN" (3.56).
// Final beat 5.6: the old hole's floor light goes out too.
registerShot('s07',{draw(g,t,info){
  const locked=t>=3.56;
  base(g,info.globalT,locked?'WATCHED':'',C.red);
  const pull=ease.out(prog(t,.05,.45)),back=ease.inOut(prog(t,.45,2.2)),relax=ease.inOut(prog(t,.6,1.6));
  const pose=P.poseBetween(P.poseBetween(PEER,'recoil',pull),P.poseBetween('stand','recoil',.35),relax);
  const x=lerp(ENTRY.peerX-14*pull,1060,back),flinch=locked?Math.exp(-(t-3.56)*6)*.5:0;
  const oldLight=1-ease.inOut(prog(t,5.6,5.9));
  entry(g,t,{newHole:1,blocked:pull<.35,oldLight,pulse:locked?prog(t,3.56,4.3):-1,pulseColor:C.red});
  const finalPose=flinch?P.poseBetween(pose,'recoil',flinch):pose;
  person(g,{x,pose:finalPose,walk:back>0&&back<1?.6:0,phase:-t*7});
  const [hx,hy]=headOf(x,finalPose),grow=ease.out(prog(t,.95,1.3));
  if(grow>0){
    const sx=ENTRY.wallX-10,sy=ENTRY.newY,ex=lerp(sx,hx+20,grow),ey=lerp(sy,hy-6,grow);
    g.save();g.setLineDash([4,14]);g.lineDashOffset=-t*48;g.lineCap='round';
    g.strokeStyle=locked?C.red:C.yellow;g.lineWidth=locked?7:5;g.beginPath();g.moveTo(sx,sy);g.lineTo(ex,ey);g.stroke();g.restore();
    if(locked)ring(g,hx,hy,44+4*Math.sin(t*6),3,alpha(C.red,.8));
  }
  if(t>5.6&&t<5.66)FX.glitch(g,t,{strength:4,bands:2,a:.25});
}});
