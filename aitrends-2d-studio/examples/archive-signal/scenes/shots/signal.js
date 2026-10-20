import { E,S,registerShot,text,seg,rr,ease,prog,alpha,lerp } from '/engine/core.js';
import { drawFigure,POSES } from '/engine/rig2d.js';
import * as FX from '/engine/fx2d.js';

const RED='#ee2538',WHITE='#e9e9ed',GRAY='#595b67';
function label(g,str,y,color=WHITE,size=34){text(g,str,E.W/2,y,{size,color,font:'Nunito',weight:900});}
function base(g,caseLabel){
  g.fillStyle='#07070b';g.fillRect(0,0,E.W,E.H);
  text(g,'SKOTOMA / VISUAL CALIBRATION',E.W*.055,E.H*.055,{size:20,font:'Nunito',color:'#737580',align:'left',spacing:2});
  text(g,caseLabel,E.W*.945,E.H*.055,{size:20,font:'Nunito',color:'#737580',align:'right',spacing:2});
  FX.static(g,0,{count:80,a:.025,seed:71});
}
function counter(g,count,{x=E.W*.77,y=E.H*.18,w=E.W*.16,h=E.H*.16,danger=false}={}){
  g.fillStyle='#101016';rr(g,x,y,w,h,12);g.fill();g.strokeStyle=danger?RED:GRAY;g.lineWidth=3;g.stroke();
  text(g,'PEOPLE',x+w/2,y+h*.23,{size:23,color:'#999aa5',font:'Nunito',spacing:2});
  text(g,String(count),x+w/2,y+h*.65,{size:82,color:danger?RED:WHITE,font:'Nunito',weight:900});
}
function corridor(g){
  const x0=E.W*.19,x1=E.W*.69,y0=E.H*.17,y1=E.H*.8;
  const bx=E.W*.4,bw=E.W*.1,by=E.H*.37,bh=E.H*.18;
  g.strokeStyle=GRAY;g.lineWidth=3;g.strokeRect(x0,y0,x1-x0,y1-y0);g.strokeRect(bx,by,bw,bh);
  for(const [x,y,xx,yy] of [[x0,y0,bx,by],[x1,y0,bx+bw,by],[x0,y1,bx,by+bh],[x1,y1,bx+bw,by+bh]])seg(g,[[x,y],[xx,yy]],2,GRAY);
  for(let i=1;i<5;i++){
    const k=i/5,yy=lerp(by+bh,y1,k*k),l=lerp(bx,x0,k*k),r=lerp(bx+bw,x1,k*k);
    seg(g,[[l,yy],[r,yy]],1,alpha(GRAY,.5));
  }
  g.fillStyle='#d6d3bb';g.fillRect(E.W*.435,E.H*.39,E.W*.03,8);
}
function person(g,x,y,{threat=false,a=1,s=1.45}={}){
  drawFigure(g,{x,y,s,pose:POSES.stand,ink:threat?'#08080c':WHITE,inkFar:threat?'#161019':'#b8b8c2',expr:threat?'stare':'dead',alpha:a,shadow:false,rim:threat?{color:RED,dir:[-.7,-.4],w:3}:false});
}
function caption(g,str){label(g,str,E.H*.91,WHITE,35);}
registerShot('a001',{draw(g,t){base(g,'NORMAL → CONTRADICTION');corridor(g);person(g,E.W*.445,E.H*.77);counter(g,t<2?1:2,{danger:t>=2});
  if(t<2)caption(g,'ONE PERSON.');else caption(g,'THE SENSOR COUNTS TWO.');
  if(t>=2&&t<2.125)FX.glitch(g,t,{strength:5,bands:3});
}});
registerShot('a002',{draw(g,t){base(g,'AN UNSEEN APPROACH');counter(g,2,{x:E.W*.34,y:E.H*.17,w:E.W*.32,h:E.H*.29,danger:true});
  seg(g,[[E.W*.22,E.H*.7],[E.W*.78,E.H*.7]],2,GRAY);
  for(let i=0;i<4;i++){
    const x=E.W*(.35+i*.03);g.fillStyle=WHITE;rr(g,x,E.H*(.61+(i%2)*.055),14,26,7);g.fill();
  }
  const movement=ease.inOut(prog(t,.6,4));
  for(let i=0;i<4;i++){
    const x=E.W*(.74-i*.033-movement*.22);g.fillStyle=RED;rr(g,x,E.H*(.61+(i%2)*.055),14,26,7);g.fill();
  }
  caption(g,'YOU HAVE NOT MOVED.');
}});
registerShot('a003',{draw(g,t){base(g,'THE COUNT IS CORRECT');corridor(g);counter(g,2,{danger:true});
  person(g,E.W*.51,E.H*.72,{threat:true,a:ease.inOut(prog(t,.5,2.4)),s:1.9});person(g,E.W*.445,E.H*.77);
  caption(g,t<2?'KEEP FACING FORWARD.':'SOMEONE IS BEHIND YOU.');
}});
registerShot('a004',{draw(g,t){base(g,'SAME NUMBER. DIFFERENT PERSON.');corridor(g);person(g,E.W*.51,E.H*.72,{threat:true,s:1.9});
  const k=ease.inOut(prog(t,0,2.2));if(k<1)person(g,lerp(E.W*.445,E.W*.05,k),E.H*.77,{a:1-k*.5});
  counter(g,k<1?2:1,{danger:true});caption(g,k<1?'YOU LEAVE.':'ONE PERSON REMAINS.');
}});
