// Thumbnail for Two Peepholes, drawn with the episode's own lens and door language.
import {E,registerShot,text,measure,seg,poly,circle,ring,rr,alpha} from '/engine/core.js';
import * as P from '/engine/pictogram2d.js';
import {C,DOOR_FILL,WARM,lens} from '/projects/two-peepholes/scenes/sets/entry.js';
const INK='#0b0f17',FONT='Montserrat';

function door(g){
  // Cropped above and below so only the two lenses remain: no handle, no floor.
  const x0=1080,w=700;
  g.strokeStyle=alpha(C.white,.45);g.lineWidth=8;g.beginPath();g.moveTo(x0-40,-20);g.lineTo(x0-40,E.H+20);g.moveTo(x0+w+40,-20);g.lineTo(x0+w+40,E.H+20);g.stroke();
  rr(g,x0,-30,w,E.H+60,6);g.fillStyle=DOOR_FILL;g.fill();g.strokeStyle=alpha(C.white,.82);g.lineWidth=7;g.stroke();
  return x0+w/2;
}

function arrow(g,pts,head){
  // Thick flat red arrow with a dark keyline so it separates from both text and door.
  const draw=(w,c)=>{g.strokeStyle=c;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.beginPath();g.moveTo(...pts[0]);g.bezierCurveTo(...pts[1],...pts[2],...pts[3]);g.stroke();};
  draw(42,INK);draw(26,C.red);
  const [x,y]=pts[3],a=Math.atan2(pts[3][1]-pts[2][1],pts[3][0]-pts[2][0]),L=head,W=head*.62;
  const tri=[[x+Math.cos(a)*L*.55,y+Math.sin(a)*L*.55],[x-Math.cos(a)*L*.45+Math.cos(a+Math.PI/2)*W,y-Math.sin(a)*L*.45+Math.sin(a+Math.PI/2)*W],[x-Math.cos(a)*L*.45-Math.cos(a+Math.PI/2)*W,y-Math.sin(a)*L*.45-Math.sin(a+Math.PI/2)*W]];
  g.strokeStyle=INK;g.lineWidth=14;g.lineJoin='round';g.beginPath();g.moveTo(...tri[0]);g.lineTo(...tri[1]);g.lineTo(...tri[2]);g.closePath();g.stroke();poly(g,tri,C.red);
}

registerShot('thumb',{draw(g,t,info){
  P.background(g,0,{variant:'casefile'});
  const cx=door(g),newY=300,oldY=760,r=158;

  // Original lens: full of warm hallway light.
  g.save();const halo=g.createRadialGradient(cx,oldY,r*.4,cx,oldY,r*2.1);halo.addColorStop(0,alpha(WARM,.35));halo.addColorStop(1,alpha(WARM,0));g.fillStyle=halo;g.fillRect(cx-r*2.2,oldY-r*2.2,r*4.4,r*4.4);g.restore();
  for(let i=0;i<12;i++){const a=i/12*Math.PI*2+.26;seg(g,[[cx+Math.cos(a)*(r+22),oldY+Math.sin(a)*(r+22)],[cx+Math.cos(a)*(r+58),oldY+Math.sin(a)*(r+58)]],8,alpha(WARM,.75));}
  lens(g,cx,oldY,r,{lit:1});

  // New lens: brass, dark, with a faint iris and a catchlight turned toward the viewer.
  g.save();g.shadowBlur=70;g.shadowColor=alpha(C.red,.9);ring(g,cx,newY,r+16,14,alpha(C.red,.55));g.restore();
  ring(g,cx,newY,r+16,6,alpha(C.red,.9));
  lens(g,cx,newY,r,{brass:true,eye:.7,look:[-.55,.2]});

  // DON'T / LOOK, sized to fill the left side.
  const words=['DON’T','LOOK'],base=200,wmax=Math.max(...words.map(s=>measure(g,s,base,FONT,900)));
  const size=Math.min(320,base*860/wmax),x=64;
  for(const [s,y,col] of [[words[0],345,'#f4f1ea'],[words[1],690,C.red]])
    text(g,s,x,y,{size,font:FONT,weight:900,color:col,align:'left',stroke:22,strokeColor:INK});

  const tx=x+measure(g,words[0],size,FONT,900);
  // One clean arc from beside DON'T up into the brass lens.
  arrow(g,[[tx+20,430],[tx+150,470],[cx-r-170,newY+120],[cx-r-34,newY+18]],84);
}});
