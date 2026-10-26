// engine/pro2d.js — "pro finish" kit: depth, two-tone figures, crowds, shaded portraits, HUD, cards, callouts, paper, particles.
// Everything is drawn in logical 1920x1080 pixels and is deterministic in time (no Math.random).
import {E,text,measure,seg,circle,rr,poly,alpha,clamp,lerp,prog,ease,rng,noise,mix,glow} from './core.js';

export const PRO={bg:'#060709',ink:'#ECEFF2',shade:'#AEB5BE',deep:'#5E656F',far:'#2B3038',red:'#E5242B',redGlow:'#FF2A33',
  cobalt:'#1E5EFF',obsidian:'#0A0A0F',paper:'#ECE8DF',font:'Montserrat'};
const P=PRO;
const lighter=(g,fn)=>{g.save();g.globalCompositeOperation='lighter';fn();g.restore();};

// ---------- camera ----------
// Smooth camera from keyframes [[t,{x,y,z}],...] with a slight handheld drift; use with core.layer(g,cam,depth,fn).
export function camAt(t,keys,drift=1){
  let c={...keys[0][1]};
  for(let i=1;i<keys.length;i++){const [t0,a]=keys[i-1],[t1,b]=keys[i];if(t>=t0){const k=ease.sine(prog(t,t0,t1));c={x:lerp(a.x??0,b.x??0,k),y:lerp(a.y??0,b.y??0,k),z:lerp(a.z??1,b.z??1,k)};}}
  return {x:(c.x??0)+noise(t*.35,11)*6*drift,y:(c.y??0)+noise(t*.3,23)*4*drift,z:c.z??1,r:noise(t*.2,5)*.002*drift};
}

// ---------- depth ----------
// Colour at depth z (0 = near, 1 = far): ink fades toward the background.
export const toneAt=(z,base=P.ink)=>mix(base,P.far,clamp(z)*.82);
// Perspective floor: lines converge to a vanishing point and fade into the dark.
export function floor(g,{horizon=520,vp=[960,520],lines=18,spread=3400,rows=10,a=.16,y1=1080}={}){
  g.save();
  for(let i=0;i<=lines;i++){const x=lerp(vp[0]-spread,vp[0]+spread,i/lines);const gr=g.createLinearGradient(0,y1,0,horizon);gr.addColorStop(0,alpha(P.ink,a));gr.addColorStop(1,alpha(P.ink,0));
    g.strokeStyle=gr;g.lineWidth=2;g.beginPath();g.moveTo(x,y1);g.lineTo(vp[0]+(x-vp[0])*.02,horizon);g.stroke();}
  for(let j=1;j<=rows;j++){const z=Math.pow(j/rows,2.2),y=lerp(horizon,y1,z);seg(g,[[0,y],[E.W,y]],1.5,alpha(P.ink,a*z));}
  g.restore();
}
// Soft contact shadow under a figure or object.
export function contact(g,x,y,w,a=.55){g.save();g.translate(x,y);g.scale(1,.18);const gr=g.createRadialGradient(0,0,0,0,0,w);gr.addColorStop(0,`rgba(0,0,0,${a})`);gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,w,0,Math.PI*2);g.fill();g.restore();}
// Zone ring on the floor, in perspective. k: draw-on 0..1; pulse: 0..1 expanding echo.
export function ring(g,x,y,r,{k=1,flat=.2,w=7,color=P.ink,glowA=.55,pulse=-1}={}){
  if(k<=0)return;g.save();g.lineCap='round';
  g.shadowColor=alpha(color,glowA);g.shadowBlur=22;g.strokeStyle=color;g.lineWidth=w;
  g.beginPath();g.ellipse(x,y,r,r*flat,0,Math.PI/2,Math.PI/2+Math.PI*2*clamp(k));g.stroke();g.restore();
  if(pulse>=0&&pulse<1){const q=ease.out(pulse);g.save();g.strokeStyle=alpha(color,.5*(1-q));g.lineWidth=w*.6;g.beginPath();g.ellipse(x,y,r*(1+.35*q),r*flat*(1+.35*q),0,0,Math.PI*2);g.stroke();g.restore();}
}

// ---------- figures ----------
// Joint sets (feet at 0,0; units at s = 1). Arms/legs are [shoulder|hip, elbow|knee, hand|foot].
export const POSE={
  stand:{h:[0,-292],sh:[0,-246],hip:[0,-138],la:[[-30,-238],[-40,-180],[-38,-128]],ra:[[30,-238],[40,-180],[38,-128]],ll:[[-15,-138],[-17,-70],[-19,0]],rl:[[15,-138],[17,-70],[19,0]]},
  hips:{h:[0,-292],sh:[0,-246],hip:[0,-138],la:[[-30,-238],[-72,-196],[-36,-150]],ra:[[30,-238],[72,-196],[36,-150]],ll:[[-15,-138],[-24,-70],[-30,0]],rl:[[15,-138],[24,-70],[30,0]]},
  point:{h:[4,-292],sh:[0,-246],hip:[0,-138],la:[[-30,-238],[-40,-180],[-38,-128]],ra:[[30,-238],[96,-238],[160,-246]],ll:[[-15,-138],[-17,-70],[-19,0]],rl:[[15,-138],[22,-70],[28,0]]},
  phone:{h:[6,-288],sh:[0,-246],hip:[0,-138],la:[[-30,-238],[-40,-180],[-38,-128]],ra:[[30,-238],[44,-186],[18,-226]],ll:[[-15,-138],[-17,-70],[-19,0]],rl:[[15,-138],[17,-70],[19,0]]},
  sit:{h:[0,-236],sh:[0,-190],hip:[0,-88],la:[[-30,-182],[-36,-130],[-10,-96]],ra:[[30,-182],[36,-130],[10,-96]],ll:[[-15,-88],[-18,-40],[-20,0]],rl:[[15,-88],[18,-40],[20,0]]},
};
export function poseMix(a,b,k){const A=typeof a==='string'?POSE[a]:a,B=typeof b==='string'?POSE[b]:b,m=(x,y)=>Array.isArray(x)?x.map((v,i)=>m(v,y[i])):lerp(x,y,k);return Object.fromEntries(Object.keys(A).map(key=>[key,m(A[key],B[key])]));}
// Two-tone pictogram: shade side then lit side offset toward the light. kind 'white' | 'cobalt' (the channel protagonist).
export function figure(g,{x,y,s=1,pose='stand',z=0,light=-1,kind='white',walk=0,phase=0,breath=0,eyes=0,eyeX=0,red=0,shadow=true,headTurn=0}={}){
  const p=structuredClone(typeof pose==='string'?POSE[pose]:pose);
  if(walk){const sw=Math.sin(phase*Math.PI*2)*28*walk;p.ll[1][0]-=sw*.6;p.ll[2][0]-=sw;p.rl[1][0]+=sw*.6;p.rl[2][0]+=sw;p.la[2][0]+=sw*.5;p.ra[2][0]-=sw*.5;}
  const base=toneAt(z,P.ink),shd=toneAt(z,P.shade),off=light*3.2;
  if(shadow)contact(g,x,y,90*s,.6*(1-z*.6));
  g.save();g.translate(x,y);g.scale(s,s*(1+.012*breath));
  const limb=(pts,w,col,d=0)=>{seg(g,pts.map(([a,b])=>[a+d,b]),w,col);};
  const body=kind==='cobalt'?P.cobalt:base,bodyS=kind==='cobalt'?'#1546c2':shd;
  for(const [pts,w] of [[p.ll,40],[p.rl,40]]){limb(pts,w,shd);limb(pts,w-8,base,off);}
  limb(p.la,32,shd);limb(p.la,25,base,off);
  rr(g,p.sh[0]-44,p.sh[1]-12,88,p.hip[1]-p.sh[1]+30,40);g.fillStyle=bodyS;g.fill();
  rr(g,p.sh[0]-44+off+4,p.sh[1]-10,80,p.hip[1]-p.sh[1]+24,38);g.fillStyle=body;g.fill();
  limb(p.ra,32,shd);limb(p.ra,25,base,off);
  const [hx,hy]=[p.h[0]+headTurn*6,p.h[1]];
  if(kind==='cobalt'){circle(g,hx,hy,34,P.obsidian);g.strokeStyle=P.ink;g.lineWidth=2.5/s;g.beginPath();g.arc(hx,hy,34,0,Math.PI*2);g.stroke();}
  else{circle(g,hx,hy,33,shd);circle(g,hx+off,hy-1,30,base);}
  if(eyes>0||red>0){const ec=red>0?P.redGlow:(kind==='cobalt'?P.ink:P.obsidian);g.save();g.globalAlpha*=Math.max(eyes,red);
    if(red>0){g.shadowColor=P.redGlow;g.shadowBlur=18;}for(const d of [-11,11])circle(g,hx+d+eyeX*8,hy-2,4.6,ec);g.restore();}
  g.restore();
}
// Seated figure seen from behind (crowds). turn 0..1 brings the face round; red lights the eyes.
export function seatedBack(g,{x,y,s=1,z=0,turn=0,red=0,light=-1}={}){
  const base=toneAt(z),shd=toneAt(z,P.shade),off=light*3;
  g.save();g.translate(x,y);g.scale(s,s);
  const back=d=>{g.beginPath();g.moveTo(-18+d,-158);g.quadraticCurveTo(-54+d,-156,-58+d,-122);g.lineTo(-54+d,-30);g.quadraticCurveTo(0+d,-18,54+d,-30);g.lineTo(58+d,-122);g.quadraticCurveTo(54+d,-156,18+d,-158);g.closePath();};
  back(0);g.fillStyle=shd;g.fill();g.save();g.translate(off,1);g.scale(.94,.97);back(0);g.fillStyle=base;g.fill();g.restore();
  for(const sx of [-1,1])seg(g,[[sx*44,-118],[sx*46,-46]],3,alpha(P.far,.35));
  rr(g,-13,-172,26,22,8);g.fillStyle=shd;g.fill();
  const tx=Math.sin(turn*Math.PI/2)*10;circle(g,tx,-190,33,shd);circle(g,tx+off,-191,30,base);
  if(turn>.45){const k=prog(turn,.45,.9);g.save();g.globalAlpha*=k;const ec=red>0?P.redGlow:P.obsidian;if(red>0){g.shadowColor=P.redGlow;g.shadowBlur=16;}
    for(const d of [-11,11])circle(g,tx+d*Math.sin(turn*Math.PI/2),-193,4.6,ec);g.restore();}
  g.restore();
}
// Rows of seated figures from behind, back row first. turnAt(i,row) -> 0..1, redSet: Set of 'row:col'.
export function crowd(g,{rows=5,cols=9,x0=960,yFront=980,yBack=560,wFront=1900,wBack=980,sFront=1.05,sBack=.42,seat=null,turnAt=()=>0,redSet=new Set(),light=-1}={}){
  for(let r=rows-1;r>=0;r--){const k=r/(rows-1||1),y=lerp(yFront,yBack,Math.pow(k,.8)),w=lerp(wFront,wBack,k),s=lerp(sFront,sBack,k),z=k*.9;
    for(let c=0;c<cols;c++){const x=x0-w/2+w*(c+.5)/cols;if(seat)seat(g,x,y,s,z,r,c);seatedBack(g,{x,y,s,z,turn:turnAt(c,r),red:redSet.has(`${r}:${c}`)?1:0,light});}}
}

// ---------- shaded portrait ----------
// Semi-realistic cartoon head. expr: 'neutral' | 'worried' | 'grin'; blink 0..1; gaze [-1..1,-1..1]; red 0..1 (uncanny eyes).
export function portrait(g,{x=960,y=520,r=240,skin='#C7CBD1',skinShade='#8F969F',hair='#2E3239',cloth='#1B1F26',expr='neutral',blink=0,gaze=[0,0],red=0,grin=0,rim='#D9E6FF',rimA=.8,light=-1,cap=null}={}){
  g.save();g.translate(x,y);
  // Shoulders and collar.
  g.beginPath();g.moveTo(-r*1.5,r*1.9);g.quadraticCurveTo(-r*1.35,r*.95,-r*.42,r*.86);g.lineTo(r*.42,r*.86);g.quadraticCurveTo(r*1.35,r*.95,r*1.5,r*1.9);g.closePath();g.fillStyle=cloth;g.fill();
  g.beginPath();g.moveTo(-r*.42,r*.86);g.lineTo(0,r*1.18);g.lineTo(r*.42,r*.86);g.strokeStyle=alpha('#000',.5);g.lineWidth=r*.03;g.stroke();
  rr(g,-r*.26,r*.45,r*.52,r*.5,r*.12);g.fillStyle=skinShade;g.fill();
  // Head silhouette.
  const head=()=>{g.beginPath();g.moveTo(0,-r);g.bezierCurveTo(r*.62,-r,r*.86,-r*.62,r*.84,-r*.12);g.bezierCurveTo(r*.83,r*.28,r*.66,r*.66,r*.32,r*.84);g.quadraticCurveTo(0,r*.98,-r*.32,r*.84);
    g.bezierCurveTo(-r*.66,r*.66,-r*.83,r*.28,-r*.84,-r*.12);g.bezierCurveTo(-r*.86,-r*.62,-r*.62,-r,0,-r);g.closePath();};
  for(const sx of [-1,1]){g.beginPath();g.ellipse(sx*r*.84,r*.02,r*.12,r*.19,0,0,Math.PI*2);g.fillStyle=sx===light?skin:skinShade;g.fill();}
  // Rim (lit edge) -> shadow crescent (far edge) -> lit skin, each a shifted copy of the head inside the head's clip.
  g.save();head();g.clip();head();g.fillStyle=alpha(rim,rimA);g.fill();
  g.save();g.translate(-light*r*.03,0);head();g.fillStyle=skinShade;g.fill();g.restore();
  g.save();g.translate(light*r*.12,0);g.scale(.97,1);head();const sk=g.createRadialGradient(light*r*.25,-r*.4,r*.1,light*r*.1,0,r*1.1);
  sk.addColorStop(0,mix(skin,'#ffffff',.14));sk.addColorStop(.72,skin);sk.addColorStop(1,mix(skin,skinShade,.45));g.fillStyle=sk;g.fill();g.restore();
  g.restore();
  // Hair cap with a parting.
  g.beginPath();g.moveTo(-r*.86,-r*.08);g.bezierCurveTo(-r*.95,-r*.8,-r*.45,-r*1.08,0,-r*1.06);g.bezierCurveTo(r*.55,-r*1.08,r*.96,-r*.78,r*.86,-r*.08);
  g.bezierCurveTo(r*.74,-r*.42,r*.42,-r*.66,r*.05,-r*.62);g.bezierCurveTo(-r*.3,-r*.7,-r*.62,-r*.5,-r*.86,-r*.08);g.closePath();g.fillStyle=hair;g.fill();
  if(cap){g.beginPath();g.moveTo(-r*.92,-r*.36);g.bezierCurveTo(-r*.9,-r*1.15,r*.9,-r*1.15,r*.92,-r*.36);g.closePath();g.fillStyle=cap;g.fill();
    g.beginPath();g.ellipse(r*.1,-r*.36,r*1.02,r*.12,0,0,Math.PI);g.fillStyle=mix(cap,'#000000',.35);g.fill();}
  // Brows.
  const browIn=expr==='worried'?-r*.1:expr==='grin'?r*.05:0;
  for(const sx of [-1,1]){g.beginPath();g.moveTo(sx*r*.13,-r*.3+browIn);g.quadraticCurveTo(sx*r*.33,-r*.42,sx*r*.55,-r*.33);g.strokeStyle=hair;g.lineWidth=r*.07;g.lineCap='round';g.stroke();}
  // Eyes: sclera, iris, pupil, lids. Red turns the irises into a glow.
  for(const sx of [-1,1]){const ex=sx*r*.33,ey=-r*.12,ew=r*.2,eh=r*.105*(1-clamp(blink));
    g.save();g.beginPath();g.moveTo(ex-ew,ey);g.quadraticCurveTo(ex,ey-eh*1.6,ex+ew,ey);g.quadraticCurveTo(ex,ey+eh*1.25,ex-ew,ey);g.closePath();
    g.fillStyle=red>0?'#F4ECEC':'#F2F4F6';g.fill();g.clip();
    const ix=ex+gaze[0]*ew*.45,iy=ey+gaze[1]*eh*.4;
    if(red>0){g.shadowColor=P.redGlow;g.shadowBlur=r*.12;circle(g,ix,iy,r*.085,P.redGlow);g.shadowBlur=0;circle(g,ix,iy,r*.02,'#1a0000');}
    else{circle(g,ix,iy,r*.085,'#4A525C');circle(g,ix,iy,r*.045,'#0B0D10');circle(g,ix+r*.03,iy-r*.03,r*.018,'#ffffff');}
    g.restore();
    g.beginPath();g.moveTo(ex-ew*1.08,ey+r*.005);g.quadraticCurveTo(ex,ey-eh*1.75,ex+ew*1.08,ey+r*.005);g.strokeStyle='#14171c';g.lineWidth=r*.035;g.stroke();
    g.beginPath();g.moveTo(ex-ew*.8,ey+eh*1.3+r*.04);g.quadraticCurveTo(ex,ey+eh*1.7+r*.05,ex+ew*.8,ey+eh*1.3+r*.04);g.strokeStyle=alpha(skinShade,.9);g.lineWidth=r*.018;g.stroke();}
  // Nose: a soft shadow plane and two nostrils.
  g.beginPath();g.moveTo(-light*r*.02,-r*.02);g.quadraticCurveTo(-light*r*.12,r*.18,-light*r*.02,r*.26);g.quadraticCurveTo(light*r*.06,r*.3,light*r*.12,r*.25);g.strokeStyle=alpha(skinShade,1);g.lineWidth=r*.03;g.stroke();
  // Mouth.
  const gk=clamp(grin);
  if(expr==='grin'||gk>0){const w=lerp(r*.22,r*.52,gk),up=lerp(0,r*.12,gk),h=lerp(r*.02,r*.16,gk);
    g.beginPath();g.moveTo(-w,r*.44-up);g.quadraticCurveTo(0,r*.44+h*2.2,w,r*.44-up);g.quadraticCurveTo(0,r*.44+h*.6,-w,r*.44-up);g.closePath();g.fillStyle='#14090b';g.fill();
    g.save();g.clip();g.fillStyle='#EDEDE6';g.fillRect(-w,r*.44-up-r*.02,w*2,h*1.15);for(let i=-6;i<=6;i++)seg(g,[[i*w/6.5,r*.4],[i*w/6.5,r*.44+h]],r*.008,alpha('#000',.35));g.restore();
    g.strokeStyle='#14171c';g.lineWidth=r*.022;g.beginPath();g.moveTo(-w*1.04,r*.44-up*1.05);g.quadraticCurveTo(0,r*.44+h*2.3,w*1.04,r*.44-up*1.05);g.stroke();}
  else if(expr==='worried'){g.beginPath();g.ellipse(0,r*.47,r*.09,r*.06,0,0,Math.PI*2);g.fillStyle='#1b1012';g.fill();}
  else{g.beginPath();g.moveTo(-r*.18,r*.46);g.quadraticCurveTo(0,r*.43,r*.18,r*.46);g.strokeStyle='#2a2d33';g.lineWidth=r*.025;g.stroke();}
  g.restore();
}

// ---------- HUD & type ----------
const tc=t=>{const f=Math.floor((t%1)*30),s=Math.floor(t)%60,m=Math.floor(t/60)%60,h=Math.floor(t/3600);return [h,m,s,f].map(v=>String(v).padStart(2,'0')).join(':');};
// File label (top left), chapter boxes (top centre), running timecode (top right).
export function hud(g,t,{file='FILE 000',chapters=7,current=1,a=.55}={}){
  text(g,file,64,58,{size:24,font:P.font,weight:800,color:alpha(P.ink,a),align:'left',spacing:4});
  const bw=26,gap=8,x0=E.W/2-(chapters*bw+(chapters-1)*gap)/2;
  for(let i=0;i<chapters;i++){const x=x0+i*(bw+gap),on=i+1===current;rr(g,x,45,bw,26,4);g.fillStyle=on?alpha(P.ink,.9):'rgba(0,0,0,0)';g.fill();g.strokeStyle=alpha(P.ink,a);g.lineWidth=1.5;g.stroke();
    text(g,String(i+1),x+bw/2,59,{size:15,font:P.font,weight:900,color:on?'#000':alpha(P.ink,a)});}
  text(g,tc(t),E.W-64,58,{size:24,font:P.font,weight:800,color:alpha(P.ink,a),align:'right',spacing:2});
}
// Chapter card: small label, big numeral, the rule, a red bar that draws under it.
export function chapterCard(g,t,{n='01',rule='RULE',title='',sub='',a=1}={}){
  const k=ease.out(prog(t,0,.45)),bar=ease.inOut(prog(t,.25,.85));
  g.save();g.globalAlpha*=a;
  text(g,rule,E.W/2,E.H*.27,{size:28,font:P.font,weight:800,color:alpha(P.ink,.6*k),spacing:10});
  text(g,n,E.W/2,E.H*.42+(1-k)*40,{size:220,font:P.font,weight:900,color:alpha(P.ink,k),spacing:-6});
  text(g,title,E.W/2,E.H*.62,{size:64,font:P.font,weight:900,color:alpha(P.ink,k),spacing:2});
  const w=measure(g,title,64,P.font,900)*bar;rr(g,E.W/2-w/2,E.H*.62+46,w,8,4);g.fillStyle=P.red;g.fill();
  if(sub)text(g,sub,E.W/2,E.H*.62+100,{size:30,font:P.font,weight:800,color:alpha(P.ink,.7*k),spacing:3});
  g.restore();
}
// Ending / reveal line in big type, tracking in.
export function bigType(g,t,str,{color=P.red,size=150,y=E.H/2}={}){
  const k=ease.out(prog(t,0,.8));text(g,str,E.W/2,y,{size,font:P.font,weight:900,color:alpha(color,k),spacing:lerp(30,2,k)});
}

// ---------- callouts ----------
// Hand-drawn marker circle that draws on (k 0..1); slightly irregular so it reads as drawn.
export function markerCircle(g,x,y,rx,ry,k,{color=P.red,w=9,seed=3}={}){
  if(k<=0)return;const n=60,end=Math.floor(n*1.12*clamp(k));g.save();g.strokeStyle=color;g.lineWidth=w;g.lineCap='round';g.lineJoin='round';g.beginPath();
  for(let i=0;i<=end;i++){const a=-Math.PI*.6+i/n*Math.PI*2,j=1+noise(i*.3,seed)*.06+i/n*.05;const px=x+Math.cos(a)*rx*j,py=y+Math.sin(a)*ry*j;i?g.lineTo(px,py):g.moveTo(px,py);}
  g.stroke();g.restore();
}
// Outlined stamp box with text: lands with a small overshoot and a slight rotation.
export function stamp(g,t,str,x,y,{size=46,color=P.red,rot=-.06}={}){
  const k=prog(t,0,.35);if(k<=0)return;const s=lerp(1.6,1,ease.outBack(k));
  g.save();g.translate(x,y);g.rotate(rot);g.scale(s,s);g.globalAlpha*=clamp(k*2);
  const w=measure(g,str,size,P.font,900)+size*.9,h=size*1.55;rr(g,-w/2,-h/2,w,h,8);g.strokeStyle=color;g.lineWidth=size*.12;g.stroke();
  text(g,str,0,2,{size,font:P.font,weight:900,color,spacing:3});g.restore();
}
// Speech bubble with a tail toward (tx,ty).
export function bubble(g,x,y,str,{size=30,tx=null,ty=null}={}){
  const w=measure(g,str,size,P.font,800)+size*1.2,h=size*1.7;
  if(tx!=null){poly(g,[[x-w*.12,y+h/2-4],[x+w*.05,y+h/2-4],[tx,ty]],P.ink);}
  rr(g,x-w/2,y-h/2,w,h,h/2);g.fillStyle=P.ink;g.fill();text(g,str,x,y+2,{size,font:P.font,weight:800,color:'#0B0D10'});
}

// ---------- paper ----------
// Paper sheet with a soft drop shadow, ruled lines and handwritten strokes. write 0..1 reveals the handwriting.
export function paper(g,{x,y,w=620,h=800,rot=0,title='',lines=12,write=1,seed=5}={}){
  g.save();g.translate(x,y);g.rotate(rot);
  g.save();g.shadowColor='rgba(0,0,0,.6)';g.shadowBlur=40;g.shadowOffsetY=18;rr(g,-w/2,-h/2,w,h,6);g.fillStyle=P.paper;g.fill();g.restore();
  const gr=g.createLinearGradient(-w/2,-h/2,w/2,h/2);gr.addColorStop(0,'rgba(255,255,255,.08)');gr.addColorStop(1,'rgba(0,0,0,.12)');rr(g,-w/2,-h/2,w,h,6);g.fillStyle=gr;g.fill();
  if(title)text(g,title,-w/2+46,-h/2+70,{size:30,font:P.font,weight:900,color:'#2A2C30',align:'left',spacing:2});
  const top=-h/2+130,step=(h-180)/lines,r=rng(seed);
  for(let i=0;i<lines;i++){const yy=top+i*step;seg(g,[[-w/2+40,yy],[w/2-40,yy]],1.5,'rgba(90,120,160,.35)');
    const len=(w-120)*(.45+r()*.5),reveal=clamp(write*lines-i);if(reveal>0){g.strokeStyle='rgba(30,34,44,.85)';g.lineWidth=3;g.lineCap='round';g.beginPath();
      for(let s=0;s<=40*reveal;s++){const px=-w/2+60+len*s/40,py=yy-12+Math.sin(s*1.7+i)*4+noise(s*.4,i)*3;s?g.lineTo(px,py):g.moveTo(px,py);}g.stroke();}}
  g.restore();
}

// ---------- particles ----------
// Drifting embers (red by default) that rise and flicker.
export function embers(g,t,{count=40,color=P.redGlow,area=[0,0,E.W,E.H],seed=9,a=.8,size=4}={}){
  const r=rng(seed);lighter(g,()=>{for(let i=0;i<count;i++){const sp=10+r()*40,x0=area[0]+r()*area[2],y0=area[1]+r()*area[3],ph=r()*10;
    const y=area[1]+((y0-area[1]-t*sp)%area[3]+area[3])%area[3],x=x0+Math.sin(t*.8+ph)*14,f=.5+.5*Math.sin(t*3+ph*7);
    g.fillStyle=alpha(color,a*f);g.beginPath();g.arc(x,y,size*(.6+r()*.8),0,Math.PI*2);g.fill();}});
}
// Light shaft with dust motes.
export function shaft(g,x,y,len,spread,{color=P.ink,a=.12,t=0,motes=24,seed=4}={}){
  lighter(g,()=>{const gr=g.createLinearGradient(x,y,x,y+len);gr.addColorStop(0,alpha(color,a));gr.addColorStop(1,alpha(color,0));g.fillStyle=gr;
    g.beginPath();g.moveTo(x-spread*.08,y);g.lineTo(x+spread*.08,y);g.lineTo(x+spread/2,y+len);g.lineTo(x-spread/2,y+len);g.closePath();g.fill();
    const r=rng(seed);for(let i=0;i<motes;i++){const v=r(),py=y+((r()*len+t*12*(0.5+v))%len),px=x+(r()-.5)*spread*(py-y)/len;g.fillStyle=alpha(color,.35*(1-(py-y)/len));g.fillRect(px,py,2,2);}});
}

// Caption scrim: a soft dark band at the bottom so captions stay readable over bright figures.
export function scrim(g,{h=330,a=.72}={}){const gr=g.createLinearGradient(0,E.H-h,0,E.H);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(1,`rgba(0,0,0,${a})`);g.fillStyle=gr;g.fillRect(0,E.H-h,E.W,h);}
