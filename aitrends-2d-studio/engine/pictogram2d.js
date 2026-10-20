// Original reusable drawings for minimal illustrated horror. Coordinates are logical pixels.
import {E,S,text,measure,seg,circle,rr,poly,alpha,clamp,lerp,prog,ease} from './core.js';
export const COLORS={white:'#edf0f3',outline:'#151a23',muted:'#737d8b',red:'#ef334e',yellow:'#f4d34e',green:'#50d78c',blue:'#1c2537'};
const C=COLORS,FONT='Montserrat';
function line(g,points,w=5,color=C.white){seg(g,points,w,color);}
function capsule(g,points,w=20,fill=C.white,edge=C.outline){line(g,points,w+7,edge);line(g,points,w,fill);}
function ellipse(g,x,y,rx,ry,color){g.fillStyle=color;g.beginPath();g.ellipse(x,y,Math.max(0,rx),Math.max(0,ry),0,0,Math.PI*2);g.fill();}
function pathFill(g,points,fill,edge=C.outline,width=4){poly(g,points,fill);g.strokeStyle=edge;g.lineWidth=width;g.lineJoin='round';g.stroke();}
export function background(g,t=0,{variant=E.styleId==='casefile'?'casefile':'archive'}={}){
  const gradient=g.createRadialGradient(E.W*.5,E.H*.4,30,E.W*.5,E.H*.4,E.W*.65);
  gradient.addColorStop(0,variant==='casefile'?'#202936':'#0b0c0e');gradient.addColorStop(1,variant==='casefile'?'#090e16':'#030404');
  g.fillStyle=gradient;g.fillRect(0,0,E.W,E.H);
  // Sparse deterministic flecks. No constant displacement or RGB split.
  g.save();g.fillStyle=C.white;g.globalAlpha=.045;
  for(let i=0;i<44;i++){const x=(i*433.19+Math.floor(t*2)*.7)%E.W,y=(i*191.37)%E.H;g.fillRect(x,y,2,2);}g.restore();
}
export const HUMAN_POSES={
  stand:{head:[0,-273],neck:[0,-232],hip:[0,-132],la:[[-17,-218],[-34,-168],[-31,-134]],ra:[[17,-218],[33,-171],[32,-136]],ll:[[-13,-130],[-17,-65],[-19,-8]],rl:[[13,-130],[18,-65],[20,-8]]},
  reach:{head:[8,-268],neck:[0,-228],hip:[-7,-131],la:[[-16,-211],[-29,-160],[-18,-127]],ra:[[17,-215],[75,-199],[122,-202]],ll:[[-18,-131],[-24,-65],[-29,-8]],rl:[[6,-131],[26,-65],[40,-8]]},
  crouch:{head:[50,-188],neck:[32,-153],hip:[-15,-91],la:[[18,-145],[55,-104],[93,-99]],ra:[[42,-148],[88,-122],[131,-108]],ll:[[-26,-91],[20,-49],[-11,-8]],rl:[[-4,-91],[59,-51],[79,-8]]},
  sit:{head:[0,-273],neck:[0,-232],hip:[0,-132],la:[[-17,-211],[4,-160],[57,-155]],ra:[[17,-211],[32,-165],[68,-155]],ll:[[-12,-131],[63,-124],[70,-8]],rl:[[12,-131],[88,-124],[95,-8]]},
  recoil:{head:[-36,-271],neck:[-23,-231],hip:[0,-130],la:[[-39,-216],[-67,-178],[-43,-148]],ra:[[-8,-216],[34,-214],[58,-245]],ll:[[-14,-130],[-33,-67],[-45,-8]],rl:[[13,-130],[38,-67],[52,-8]]}
};
export function poseBetween(a='stand',b='reach',amount=0){
  const A=typeof a==='string'?HUMAN_POSES[a]:a,B=typeof b==='string'?HUMAN_POSES[b]:b;
  if(!A||!B)throw new Error('Unknown pictogram pose');const k=clamp(amount),mix=(x,y)=>Array.isArray(x)?x.map((v,i)=>mix(v,y[i])):lerp(x,y,k);
  return Object.fromEntries(Object.keys(A).map(key=>[key,mix(A[key],B[key])]));
}
export function human(g,{x,y,s=1,facing=1,pose='stand',walk=0,phase=0,color=C.white,label='',look=0,opacity=1,wardrobe='plain'}={}){
  const p=structuredClone(typeof pose==='string'?HUMAN_POSES[pose]:pose);if(!p)throw new Error('Unknown pictogram pose');
  if(walk){const swing=Math.sin(phase)*33*walk;p.ll[1][0]-=swing*.6;p.ll[2][0]-=swing;p.rl[1][0]+=swing*.6;p.rl[2][0]+=swing;p.la[2][0]+=swing*.5;p.ra[2][0]-=swing*.5;}
  g.save();g.globalAlpha*=opacity;g.translate(x,y);g.scale(s*facing,s);
  capsule(g,p.ll,21,color);capsule(g,p.rl,21,color);capsule(g,p.la,17,color);capsule(g,[p.neck,p.hip],43,color);
  if(wardrobe==='coat')coat(g,{x:p.neck[0],y:p.neck[1],s:.72,fill:color});
  capsule(g,p.ra,17,color);
  circle(g,p.head[0],p.head[1],34,C.outline);circle(g,p.head[0],p.head[1],30,color);
  if(look)circle(g,p.head[0]+look*13,p.head[1]-1,3.2,C.outline);g.restore();
  if(label)text(g,label,x,y-326*s,{size:23,color:C.yellow,font:FONT,weight:800});
}
export function dog(g,{x,y,s=1,facing=1,pose='stand',phase=0,color=C.white,alert=0,opacity=1}={}){
  if(!['stand','sit','lie'].includes(pose))throw new Error('Unknown dog pose');
  g.save();g.globalAlpha*=opacity;g.translate(x,y);g.scale(s*facing,s);const sit=pose==='sit',lie=pose==='lie',bodyY=lie?-28:sit?-73:-91;
  for(const [xx,shift] of [[-64,0],[39,Math.sin(phase)*5]])capsule(g,[[xx,bodyY],[xx+(sit?-25:0),lie?-7:-9+shift]],19,color);
  capsule(g,[[-70,bodyY-15],[-114,bodyY-31],[-140,bodyY-26+Math.sin(phase)*7]],11,color);
  ellipse(g,-12,bodyY-15,83,34,C.outline);ellipse(g,-12,bodyY-15,79,30,color);
  const hx=67,hy=lie?-64:sit?-161:-134;
  capsule(g,[[48,bodyY-13],[hx-6,hy+12]],43,color);
  ellipse(g,hx,hy,34,32,C.outline);ellipse(g,hx,hy,30,28,color);
  ellipse(g,hx-21,hy+6,15,31,C.outline);ellipse(g,hx-21,hy+6,11,27,color);
  capsule(g,[[hx+14,hy+3],[hx+47,hy+8]],25,color);circle(g,hx+58,hy+7,7,C.outline);
  if(alert){circle(g,hx+13,hy-11,10,alpha(C.yellow,.4));circle(g,hx+13,hy-11,4,C.yellow);}else circle(g,hx+13,hy-11,4,C.outline);
  if(alert)for(let i=0;i<5;i++)line(g,[[hx-48-i*16,bodyY-45],[hx-44-i*16,bodyY-68]],4,C.white);
  g.restore();
}
export function portrait(g,{x=E.W/2,y=E.H*.43,r=156,kind='human',uncanny=0,anger=0,color=C.white}={}){
  g.save();g.translate(x,y);circle(g,0,0,r,color);
  if(kind==='dog'){ellipse(g,-r*.78,-r*.07,r*.25,r*.6,C.outline);ellipse(g,-r*.78,-r*.07,r*.2,r*.56,color);ellipse(g,r*.78,-r*.07,r*.25,r*.6,C.outline);ellipse(g,r*.78,-r*.07,r*.2,r*.56,color);}
  for(const sign of [-1,1]){const ex=sign*r*.33,ey=-r*.16;if(anger){g.shadowBlur=r*.2;g.shadowColor=C.yellow;circle(g,ex,ey,r*.14,C.yellow);g.shadowBlur=0;}circle(g,ex,ey,r*.055,C.outline);if(anger)line(g,[[ex-sign*r*.17,ey-r*.09],[ex+sign*r*.13,ey-r*.22]],r*.025,C.outline);}
  if(kind==='dog')ellipse(g,0,r*.1,r*.13,r*.085,C.outline);
  g.strokeStyle=C.outline;g.lineWidth=r*.024;g.beginPath();g.moveTo(-r*(.31+uncanny*.2),r*.29);g.quadraticCurveTo(0,r*(.46+uncanny*.1),r*(.31+uncanny*.2),r*.29);g.stroke();
  if(uncanny)for(let i=-3;i<=3;i++)line(g,[[i*r*.1,r*(.32+(.08-Math.abs(i)*.015)*uncanny)],[i*r*.1,r*.44]],r*.012,C.outline);
  g.restore();
}
export function coat(g,{x,y,s=1,breath=0,alpha:opacity=1,fill=C.white}={}){
  g.save();g.globalAlpha*=opacity;g.translate(x,y);g.scale(s,s);const b=breath*18;
  pathFill(g,[[-25,-8],[-66,7],[-94,85],[-68,96],[-45,48],[-48-b,176],[48+b,176],[45,48],[68,96],[94,85],[66,7],[25,-8],[0,9]],fill);
  line(g,[[0,12],[0,175]],4,C.outline);line(g,[[-25,3],[-12,34],[0,15],[12,34],[25,3]],4,C.outline);
  g.restore();
}
export function room(g,{t=0,light=1,doorOpen=0}={}){
  const floorY=E.H*.76;const col=alpha(C.white,.58);
  line(g,[[E.W*.06,floorY],[E.W*.94,floorY]],4,col);
  // Original layout: wide window on left, bench below, wall sconce, hook, closed exit on right.
  g.strokeStyle=col;g.lineWidth=4;g.strokeRect(E.W*.12,E.H*.25,E.W*.2,E.H*.22);
  line(g,[[E.W*.22,E.H*.25],[E.W*.22,E.H*.47]],3,col);
  line(g,[[E.W*.14,E.H*.62],[E.W*.32,E.H*.62]],12,alpha(C.white,.74));
  line(g,[[E.W*.16,E.H*.62],[E.W*.16,floorY]],5,col);line(g,[[E.W*.3,E.H*.62],[E.W*.3,floorY]],5,col);
  const dx=E.W*.81,dy=E.H*.3,dw=E.W*.105,dh=floorY-dy;
  g.strokeStyle=col;g.lineWidth=4;g.strokeRect(dx,dy,dw,dh);
  if(doorOpen){g.fillStyle=alpha('#a87e38',doorOpen*.65);g.fillRect(dx+3,dy+3,dw-6,dh-6);}circle(g,dx+dw*.8,dy+dh*.57,5,C.white);
  const lx=E.W*.58,ly=E.H*.22;line(g,[[lx,ly-37],[lx,ly+13]],9,C.white);
  if(light){const beam=g.createRadialGradient(lx,ly,1,lx,ly,E.H*.7);beam.addColorStop(0,alpha('#f2dfaa',.09*light));beam.addColorStop(1,alpha('#f2dfaa',0));g.fillStyle=beam;g.fillRect(0,0,E.W,E.H);ellipse(g,lx,ly+12,20,9,C.yellow);}
  const hookX=E.W*.67,hookY=E.H*.43;
  line(g,[[hookX-18,hookY-18],[hookX-18,hookY-35],[hookX+8,hookY-35],[hookX+15,hookY-25],[hookX,hookY-8]],5,C.muted);
  const switchX=E.W*.46,switchY=E.H*.58;g.strokeStyle=col;g.lineWidth=3;g.strokeRect(switchX-14,switchY-20,28,40);
  return {floorY,hookX,hookY,switchX,switchY};
}
export function stepRow(g,{count=4,active=1,x=E.W/2,y=E.H*.19,size=36,gap=12,color=C.white}={}){
  const start=x-(count*size+(count-1)*gap)/2;
  for(let i=0;i<count;i++){const xx=start+i*(size+gap),on=i+1===active;rr(g,xx,y,size,size,4);g.fillStyle=on?color:'rgba(0,0,0,0)';g.fill();g.strokeStyle=on?color:C.muted;g.lineWidth=2;g.stroke();text(g,String(i+1),xx+size/2,y+size/2,{size:size*.55,font:FONT,weight:800,color:on?C.outline:C.muted});}
}
export function hud(g,t,{title='SKOTOMA / ORIGINAL CASE',step=0,count=0,status='',statusColor=C.red}={}){
  text(g,title,E.W*.045,E.H*.045,{size:17,color:alpha(C.white,.27),align:'left',font:FONT,spacing:1});
  const sec=Math.floor(t);text(g,`${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`,E.W*.955,E.H*.045,{size:17,color:alpha(C.white,.27),align:'right',font:FONT});
  if(count)stepRow(g,{count,active:step,y:E.H*.034,size:17,gap:5});
  if(status){const w=measure(g,status,20,FONT,800)+26;rr(g,E.W*.955-w,E.H*.09,w,35,3);g.fillStyle=statusColor;g.fill();text(g,status,E.W*.955-w/2,E.H*.09+18,{size:20,font:FONT,weight:800,color:C.white});}
}
export function mark(g,x,y,{ok=true,size=23}={}){
  if(ok){circle(g,x,y,size,C.green);line(g,[[x-size*.52,y],[x-size*.1,y+size*.35],[x+size*.55,y-size*.42]],size*.15,C.white);}
  else {line(g,[[x-size*.65,y-size*.65],[x+size*.65,y+size*.65]],size*.22,C.red);line(g,[[x+size*.65,y-size*.65],[x-size*.65,y+size*.65]],size*.22,C.red);}
}
export function trajectory(g,{from,to,bend=-170,color=C.yellow,progress=1,dotted=true}={}){
  const control=[(from[0]+to[0])/2,Math.min(from[1],to[1])+bend],p=clamp(progress);
  g.save();g.strokeStyle=color;g.lineWidth=4;g.setLineDash(dotted?[3,12]:[]);g.beginPath();g.moveTo(...from);g.quadraticCurveTo(...control,...to);g.stroke();g.restore();
  return [lerp(lerp(from[0],control[0],p),lerp(control[0],to[0],p),p),lerp(lerp(from[1],control[1],p),lerp(control[1],to[1],p),p)];
}
export function ruleTitle(g,t,{number=1,total=4,title='KEEP THE LIGHT ON',label='RULE'}={}){
  const y=E.H*.41;const heading=`${label} ${number}`;
  text(g,heading,E.W/2,y,{size:108,color:C.white,font:FONT,weight:900});
  line(g,[[E.W*.36,y+78],[E.W*.64,y+78]],5,C.red);
  text(g,title,E.W/2,y+143,{size:40,color:C.white,font:FONT,weight:800});
  stepRow(g,{count:total,active:number,y:y+209,size:30,gap:11});
}
export function evidenceCard(g,{x,y,w=420,h=285,title='',subtitle='',status=null,draw}={}){
  g.save();g.translate(x,y);rr(g,-w/2,-h/2,w,h,14);g.strokeStyle=alpha(C.white,.78);g.lineWidth=4;g.stroke();
  if(title)text(g,title,0,-h*.34,{size:23,font:FONT,color:C.muted,weight:800});
  if(draw){g.save();draw(g);g.restore();}
  if(subtitle)text(g,subtitle,0,h*.34,{size:30,font:FONT,color:C.white,weight:800});
  if(status!==null)mark(g,w/2-5,-h/2+5,{ok:status});g.restore();
}
