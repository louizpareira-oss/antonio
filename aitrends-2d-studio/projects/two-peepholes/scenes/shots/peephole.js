// Two Peepholes preview. Local cue times are derived from timeline/words.json (global word start - shot start).
import {E,registerShot,ease,prog,lerp,clamp,text,circle,ring,seg,rr,alpha,noise} from '/engine/core.js';
import * as P from '/engine/pictogram2d.js';
import * as FX from '/engine/fx2d.js';
import {C,ENTRY,PEER,DOOR_FILL,WARM,entry,lens,headOf} from '../sets/entry.js';
const S=ENTRY.s;
function base(g,globalT,status='',statusColor=C.red){P.background(g,globalT);P.hud(g,globalT,{title:'SKOTOMA / UNIT 4C — FRONT DOOR',step:1,count:4,status,statusColor});}
const person=(g,o)=>P.human(g,{y:ENTRY.floorY,s:S,look:1,...o});

// s01 — arrive, unlock, step in, door shuts, turn: a second peephole is there ("two" 3.96).
registerShot('s01',{draw(g,t,info){
  const reveal=4.15,turned=t>=4.08;
  base(g,info.globalT,t<reveal?'HOME':'PEEPHOLES: 2',t<reveal?C.green:C.red);
  const open=t>=2.85&&t<3.98;
  entry(g,t,{doorOpen:open?1:0,newHole:t>=reveal?ease.out(prog(t,reveal,reveal+.12)):0,pulse:t>=reveal?prog(t,reveal,reveal+.7):-1,labels:ease.inOut(prog(t,4.35,4.65))});
  const arrive=ease.out(prog(t,0,1.7)),enter=ease.inOut(prog(t,2.95,3.9));
  const x=t<2.95?lerp(2010,ENTRY.outsideX,arrive):lerp(ENTRY.outsideX,ENTRY.standX,enter);
  const moving=(t<1.65)||(t>2.95&&t<3.9);
  const unlock=ease.inOut(prog(t,2.15,2.6))*(1-ease.inOut(prog(t,2.85,3.15)));
  person(g,{x,facing:turned?1:-1,pose:P.poseBetween('stand','reach',unlock*.85),walk:moving?.9:0,phase:t*7.5,label:t<2.85||t>4.08?'YOU':''});
}});

// s02 — rule card on "don't".
registerShot('s02',{draw(g,t,info){base(g,info.globalT);P.ruleTitle(g,t,{number:1,total:4,title:"DON'T USE THE NEW ONE"});}});

// s03 — door-face insert: old lens passes light ("light" 1.46), new lens stays black ("dark" 3.22).
registerShot('s03',{draw(g,t,info){
  base(g,info.globalT);
  const z=1+.035*ease.inOut(t/info.dur),cx=960,cy=455;
  g.save();g.translate(cx,cy);g.scale(z,z);g.translate(-cx,-cy);
  // Door panel fades out above the caption band so no edge crosses the text.
  const fade=(a)=>{const gr=g.createLinearGradient(0,700,0,900);gr.addColorStop(0,a);gr.addColorStop(1,'rgba(0,0,0,0)');return gr;};
  g.fillStyle=fade(DOOR_FILL);g.fillRect(560,-40,800,1000);
  g.strokeStyle=fade(alpha(C.white,.6));g.lineWidth=4;g.beginPath();g.moveTo(560,960);g.lineTo(560,-40);g.moveTo(1360,-40);g.lineTo(1360,960);g.stroke();
  const oldLit=.45+.55*ease.out(prog(t,1.4,1.75)),newY=300,oldY=612;
  if(t>1.4){const k=ease.out(prog(t,1.4,1.9));g.save();g.globalAlpha=k*.55;for(let i=0;i<10;i++){const a=i/10*Math.PI*2+.3;seg(g,[[cx+Math.cos(a)*112,oldY+Math.sin(a)*112],[cx+Math.cos(a)*(132+18*k),oldY+Math.sin(a)*(132+18*k)]],4,WARM);}g.restore();}
  lens(g,cx,oldY,98,{lit:oldLit});
  lens(g,cx,newY,98,{brass:true});
  if(t>3.22){const k=prog(t,3.22,3.7);ring(g,cx,newY,104+30*ease.out(k),6*(1-k)+2,alpha(C.red,1-k*.6));}
  g.restore();
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
  P.hud(g,info.globalT,{title:'SKOTOMA / UNIT 4C — OLD PEEPHOLE',step:1,count:4,status:t>.65?'NO ONE OUTSIDE':'',statusColor:C.green});
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
