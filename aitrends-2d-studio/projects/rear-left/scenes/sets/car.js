// car-v1: the Rear Left car. Driver rig (cobalt hoodie), cabin pieces, centre screen and the exterior side view.
// Colour only ever comes from a physical source: cluster backlight, sodium streetlamps, the centre screen, LEDs.
import {E,text,circle,seg,poly,rr,alpha,clamp,lerp,ease,prog,rng,glow} from '/engine/core.js';

export const K={bg:'#07080c',cabin:'#0b0d13',panel:'#0e1118',deep:'#05060a',glass:'#0a0e16',
  white:'#edf0f3',head:'#0a0a0f',cobalt:'#1e5eff',cobaltDark:'#1546c2',
  dash:'#e8eef6',sodium:'#ff9a3c',screen:'#9fc4ff',red:'#ff1e27',amber:'#ffb020',green:'#3be37a'};
export const line=(a=.55)=>alpha(K.white,a);
export const FONT='Montserrat';

// Secondary marker: channel name and rule, top corners, 0.45 opacity.
export function header(g,rule){
  text(g,'WRONG KNOCK',60,58,{size:28,font:FONT,weight:800,color:K.white,align:'left',alpha:.45,spacing:3});
  if(rule)text(g,rule,E.W-60,58,{size:28,font:FONT,weight:800,color:K.white,align:'right',alpha:.45,spacing:3});
}

// Sodium streetlamps pass overhead every 3 s at 60 mph. Returns 0..1 for the pool crossing, plus its progress.
export function lamp(T,phase=0,period=3,len=1.1){
  const u=((T+phase)%period+period)%period/len;
  return {k:u<1?Math.sin(Math.PI*u):0,u:clamp(u)};
}

// Two-bone arm: elbow position for shoulder s, hand h, segment lengths a/b, bend side ±1.
export function elbow(s,h,a,b,bend=1){
  const dx=h[0]-s[0],dy=h[1]-s[1],d=Math.min(Math.hypot(dx,dy),a+b-1e-3),ang=Math.atan2(dy,dx);
  const A=Math.acos(clamp((a*a+d*d-b*b)/(2*a*d),-1,1));
  return [s[0]+Math.cos(ang+bend*A)*a,s[1]+Math.sin(ang+bend*A)*a];
}
export function limb(g,pts,w){seg(g,pts,w,K.white);}
// A hand closed around something (wheel rim): rounded white mitt with one finger crease.
export function hand(g,x,y,r,rot=0){
  g.save();g.translate(x,y);g.rotate(rot);
  rr(g,-r,-r*.8,r*2,r*1.6,r*.75);g.fillStyle=K.white;g.fill();
  seg(g,[[-r*.55,-r*.05],[r*.55,-r*.05]],Math.max(1.5,r*.08),alpha(K.head,.35));
  g.restore();
}

// Light that falls on a shape: call inside a clip of that shape.
// under = cluster backlight from below; sodium = {k,y} orange band at height y; screen = {k,x,y} blue source.
function lightFill(g,bx,by,bw,bh,L){
  if(L.under>0){const gr=g.createLinearGradient(0,by+bh,0,by+bh*.35);gr.addColorStop(0,alpha(K.dash,.16*L.under));gr.addColorStop(1,alpha(K.dash,0));g.fillStyle=gr;g.fillRect(bx,by,bw,bh);}
  if(L.sodium&&L.sodium.k>0){const s=L.sodium,h=bh*.9,gr=g.createLinearGradient(0,s.y-h,0,s.y+h);
    gr.addColorStop(0,alpha(K.sodium,0));gr.addColorStop(.5,alpha(K.sodium,(L.sodiumA??.3)*s.k));gr.addColorStop(1,alpha(K.sodium,0));g.fillStyle=gr;g.fillRect(bx,by,bw,bh);}
  if(L.screen&&L.screen.k>0){const s=L.screen,gr=g.createRadialGradient(s.x,s.y,0,s.x,s.y,s.r||bw*1.5);
    gr.addColorStop(0,alpha(K.screen,Math.min(.34,.3*s.k)));gr.addColorStop(1,alpha(K.screen,0));g.fillStyle=gr;g.fillRect(bx,by,bw,bh);}
}
// Coloured edge light on an ellipse: arc from a0 to a1 (radians, 0 = right, clockwise in canvas space).
function edge(g,x,y,rx,ry,a0,a1,w,col){g.save();g.lineCap='round';g.strokeStyle=col;g.lineWidth=w;g.beginPath();g.ellipse(x,y,rx,ry,0,a0,a1);g.stroke();g.restore();}

// Driver head. face: -1 facing left … 0 frontal … 1 facing right. gaze [-1..1, -1..1]. blink 0..1.
export function head(g,{x,y,r=150,face=0,gaze=[0,0],blink=0,L={}}){
  const rx=r*.86,ry=r;
  g.save();g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.fillStyle=K.head;g.fill();g.clip();
  lightFill(g,x-rx,y-ry,rx*2,ry*2,L);g.restore();
  g.lineWidth=2.5;g.strokeStyle=K.white;g.beginPath();g.ellipse(x,y,rx,ry,0,0,Math.PI*2);g.stroke();
  if(L.under>0)edge(g,x,y,rx-1,ry-1,Math.PI*.18,Math.PI*.82,4,alpha(K.dash,.75*L.under));
  if(L.sodium&&L.sodium.k>0){const s=L.sodium,top=clamp(1-Math.abs(s.y-(y-ry*.6))/(ry*1.4));edge(g,x,y,rx-1,ry-1,Math.PI*1.12,Math.PI*1.88,5,alpha(K.sodium,.9*s.k*top));}
  if(L.screen&&L.screen.k>0){const s=L.screen,a=Math.atan2(s.y-y,s.x-x);edge(g,x,y,rx-1.5,ry-1.5,a-.85,a+.85,6,alpha(K.screen,.95*s.k));}
  if(L.back&&L.back.k>0){const a=L.back.a??Math.PI;edge(g,x,y,rx-1.5,ry-1.5,a-.7,a+.7,5,alpha(L.back.col||K.sodium,.85*L.back.k));}
  // Eye-dots: shifted toward the facing side; the far eye shrinks as the head turns.
  const cx=x+face*rx*.42+gaze[0]*rx*.12,cy=y-ry*.06+gaze[1]*ry*.1,sp=rx*.4*(1-Math.abs(face)*.5);
  const er=rx*.085,sy=Math.max(.08,1-blink);
  for(const [dx,sc] of [[-sp/2,face>0?1:1-Math.abs(face)*.3],[sp/2,face<0?1:1-Math.abs(face)*.3]]){
    g.save();g.translate(cx+dx,cy);g.scale(sc,sc*sy*1.25);circle(g,0,0,er,K.white);g.restore();}
}

// Hoodie torso. Neck base at (x,y); w = shoulder width; face shifts the neck toward the facing side.
export function torso(g,{x,y,w=580,h=700,face=0,breath=0,L={}}){
  const b=1+.02*breath,hw=w/2*b,nx=x+face*w*.08,far=1-Math.abs(face)*.25;
  const lw=face>0?hw*far:hw,rw=face<0?hw*far:hw;
  g.save();g.beginPath();
  g.moveTo(nx-lw,y+h);g.lineTo(nx-lw,y+150);g.quadraticCurveTo(nx-lw,y+55,nx-lw+95,y+40);g.lineTo(nx-62,y+8);
  g.quadraticCurveTo(nx,y-12,nx+62,y+8);g.lineTo(nx+rw-95,y+40);g.quadraticCurveTo(nx+rw,y+55,nx+rw,y+150);g.lineTo(nx+rw,y+h);g.closePath();
  g.fillStyle=K.cobalt;g.fill();g.save();g.clip();
  const sh=g.createLinearGradient(0,y,0,y+h);sh.addColorStop(0,'rgba(0,0,0,.18)');sh.addColorStop(1,'rgba(0,0,0,.62)');g.fillStyle=sh;g.fillRect(nx-hw-10,y-20,hw*2+20,h+40);
  lightFill(g,nx-hw-10,y-20,hw*2+20,h+40,L);g.restore();
  g.lineWidth=2.5;g.strokeStyle=alpha(K.white,.55);g.stroke();g.restore();
  // Hood bunched behind the neck, then the two drawstrings.
  g.save();g.lineCap='round';g.strokeStyle=K.cobaltDark;g.lineWidth=44;g.beginPath();g.ellipse(nx,y+6,78,30,0,Math.PI*.05,Math.PI*.95);g.stroke();
  g.strokeStyle=alpha(K.white,.35);g.lineWidth=2;g.beginPath();g.ellipse(nx,y+6,100,48,0,Math.PI*.08,Math.PI*.92);g.stroke();g.restore();
  for(const dx of [-26,26]){const sx=nx+dx+face*14;seg(g,[[sx,y+34],[sx+dx*.1,y+150]],4,alpha(K.white,.85));circle(g,sx+dx*.1,y+154,6,K.white);}
}

// Steering wheel rim as an ellipse (rx = ry when seen face-on). Draw before the hands.
export function wheel(g,{x,y,rx,ry,rot=0,w=32,a0=0,a1=Math.PI*2}){
  g.save();g.translate(x,y);g.rotate(rot);g.lineCap='round';
  g.strokeStyle='#111319';g.lineWidth=w;g.beginPath();g.ellipse(0,0,rx,ry,0,a0,a1);g.stroke();
  g.strokeStyle=alpha(K.white,.55);g.lineWidth=2;for(const d of [-w/2,w/2]){g.beginPath();g.ellipse(0,0,rx+d,ry+d*ry/rx,0,a0,a1);g.stroke();}
  g.restore();
}

// Rear-view mirror housing, tilted up at the roof (Rule 5 state after SC39).
export function mirror(g,x,y,{w=300,h=86,tilt=-.12,front=false}={}){
  seg(g,[[x,0],[x,y-h/2+8]],12,'#0b0d12');seg(g,[[x,0],[x,y-h/2+8]],2,alpha(K.white,.25));
  g.save();g.translate(x,y);g.rotate(tilt);rr(g,-w/2,-h/2,w,h,h*.42);g.fillStyle=front?'#141a24':'#0b0d12';g.fill();
  g.strokeStyle=alpha(K.white,.5);g.lineWidth=2.5;g.stroke();g.restore();
}

// Paper grocery bag (the bag on the passenger seat).
export function bag(g,x,y,s=1){
  g.save();g.translate(x,y);g.scale(s,s);
  poly(g,[[-110,0],[110,0],[96,-250],[-96,-250]],'#1d1a15');
  g.strokeStyle=alpha(K.white,.7);g.lineWidth=3;g.beginPath();g.moveTo(-110,0);g.lineTo(110,0);g.lineTo(96,-250);g.lineTo(-96,-250);g.closePath();g.stroke();
  seg(g,[[-96,-250],[-70,-282],[64,-286],[96,-250]],3,alpha(K.white,.55));seg(g,[[-60,-250],[-40,-205],[40,-205],[60,-250]],2,alpha(K.white,.3));
  g.restore();
}

// ---- centre screen contents (drawn inside a clip of the screen rect) ----
const ENV=await (await fetch('/project/timeline/hijack_env.json')).json();
export function envAt(T){const i=Math.round(T*ENV.rate);return ENV.env[Math.max(0,Math.min(ENV.env.length-1,i))]||0;}

export function screenMap(g,x,y,w,h,T,{dim=1,bar=true}={}){
  const gr=g.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,'#0a1428');gr.addColorStop(1,'#0d1a33');g.fillStyle=gr;g.fillRect(x,y,w,h);
  g.save();g.globalAlpha*=dim;g.beginPath();g.rect(x,y,w,h);g.clip();
  const off=(T*46)%420,cx=x+w*.5;
  // Side streets scroll down past the car arrow; the route runs straight up.
  for(let k=-1;k<4;k++){const yy=y+h-((k*420+off)%(h+420));seg(g,[[x-20,yy],[x+w+20,yy-60]],7,alpha('#8a96a8',.32));seg(g,[[x+w*.18,yy+120],[x+w*.32,yy-260]],5,alpha('#8a96a8',.22));}
  seg(g,[[x+w*.82,y-20],[x+w*.74,y+h+20]],6,alpha('#8a96a8',.22));
  seg(g,[[cx,y+h*.78],[cx,y-20]],16,alpha(K.screen,.85));
  poly(g,[[cx,y+h*.7],[cx+26,y+h*.82],[cx,y+h*.78],[cx-26,y+h*.82]],K.white);
  rr(g,cx+40,y+h*.42,170,46,23);g.fillStyle=alpha('#05070b',.8);g.fill();
  text(g,'Route 9',cx+125,y+h*.42+24,{size:28,font:FONT,weight:800,color:alpha(K.white,.9)});
  if(bar){rr(g,x,y,w,74,0);g.fillStyle=alpha('#05070b',.55);g.fill();
  text(g,'Home  ·  14 min',x+36,y+38,{size:32,font:FONT,weight:800,color:K.white,align:'left'});
  text(g,'11:42 PM',x+w-36,y+38,{size:30,font:FONT,weight:800,color:alpha(K.white,.75),align:'right'});}
  g.restore();
}

// Call screen: the audio breach. callT = seconds since the screen switched; T = global time for the waveform.
export function screenCall(g,x,y,w,h,callT,T,{bars=72,detail=true}={}){
  const gr=g.createRadialGradient(x+w/2,y+h*.55,0,x+w/2,y+h*.55,w*.7);gr.addColorStop(0,'#1d4a96');gr.addColorStop(1,'#0b1e3f');g.fillStyle=gr;g.fillRect(x,y,w,h);
  if(detail){
    const ix=x+80,iy=y+86;poly(g,[[ix-14,iy-12],[ix,iy-12],[ix+18,iy-28],[ix+18,iy+28],[ix,iy+12],[ix-14,iy+12]],K.white);
    for(const r of [30,44])if(Math.sin(callT*6-r*.1)>-.2){g.strokeStyle=alpha(K.white,.8);g.lineWidth=4;g.beginPath();g.arc(ix+18,iy,r,-.7,.7);g.stroke();}
    text(g,'Incoming audio',x+150,y+70,{size:36,font:FONT,weight:800,color:K.white,align:'left'});
    text(g,'Unknown device',x+150,y+116,{size:32,font:FONT,weight:800,color:alpha(K.screen,.9),align:'left'});
    const s=Math.max(0,Math.floor(callT));text(g,`00:${String(s).padStart(2,'0')}`,x+w-60,y+86,{size:32,font:FONT,weight:800,color:alpha(K.white,.8),align:'right'});
    text(g,'Phone not connected',x+w/2,y+h-52,{size:28,font:FONT,weight:800,color:alpha(K.white,.5)});
  }
  const cy=y+h*.56,x0=x+w*.08,x1=x+w*.92,bw=(x1-x0)/bars;
  for(let i=0;i<bars;i++){const e=envAt(T-(bars-1-i)/24),hh=6+e*h*.26;rr(g,x0+i*bw+bw*.2,cy-hh,bw*.6,hh*2,bw*.3);g.fillStyle=alpha('#dce9ff',.35+.65*e);g.fill();}
}

// Diegetic signal failure: noise and torn bands filling the screen for a few frames.
export function screenStatic(g,x,y,w,h,T){
  const r=rng(901+Math.floor(T*E.fps));g.fillStyle='#8c9097';g.fillRect(x,y,w,h);
  for(let i=0;i<900;i++){const v=Math.floor(r()*255);g.fillStyle=`rgb(${v},${v},${v})`;g.fillRect(x+r()*w,y+r()*h,3+r()*16,2+r()*5);}
  for(let i=0;i<6;i++){g.fillStyle=alpha(r()<.5?'#ffffff':'#000000',.35+r()*.4);g.fillRect(x,y+r()*h,w,8+r()*40);}
}

// ---- exterior: the car in side view, facing right ----
export const CAR={x0:520,x1:1440,ground:862,roof:560,wheelR:62,wheels:[690,1270]};
export function carSide(g,T,{lit=0,lampX=-999,speed=1100}={}){
  const {ground,roof,wheelR}=CAR,body=[[525,830],[525,722],[560,700],[612,700],[712,572],[1250,572],[1352,700],[1418,712],[1442,742],[1442,830]];
  const path=()=>{g.beginPath();g.moveTo(...body[0]);for(const p of body.slice(1))g.lineTo(...p);g.closePath();};
  // Headlight beam forward along the road.
  g.save();g.globalCompositeOperation='lighter';const hb=g.createLinearGradient(1440,0,E.W,0);hb.addColorStop(0,alpha(K.dash,.22));hb.addColorStop(1,alpha(K.dash,0));
  g.fillStyle=hb;g.beginPath();g.moveTo(1440,728);g.lineTo(E.W,660);g.lineTo(E.W,ground+8);g.lineTo(1440,752);g.closePath();g.fill();g.restore();
  path();g.fillStyle=K.panel;g.fill();
  if(lit>0){g.save();path();g.clip();const gr=g.createRadialGradient(lampX,roof-160,20,lampX,roof-160,700);gr.addColorStop(0,alpha(K.sodium,.55*lit));gr.addColorStop(1,alpha(K.sodium,0));g.fillStyle=gr;g.fillRect(500,roof-20,980,320);g.restore();}
  path();g.strokeStyle=alpha(K.white,.85);g.lineWidth=4;g.lineJoin='round';g.stroke();
  const rearWin=[[714,584],[965,584],[965,694],[628,694]],frontWin=[[985,584],[1244,584],[1334,694],[985,694]];
  for(const w of [rearWin,frontWin]){poly(g,w,K.deep);g.strokeStyle=alpha(K.white,.6);g.lineWidth=2.5;g.beginPath();g.moveTo(...w[0]);for(const p of w.slice(1))g.lineTo(...p);g.closePath();g.stroke();}
  // Driver visible through the front window; the rear-left window stays empty.
  g.save();g.beginPath();g.moveTo(...frontWin[0]);for(const p of frontWin.slice(1))g.lineTo(...p);g.closePath();g.clip();
  poly(g,[[1060,694],[1068,660],[1150,654],[1176,694]],K.cobalt);
  g.beginPath();g.ellipse(1118,628,24,28,0,0,Math.PI*2);g.fillStyle=K.head;g.fill();g.strokeStyle=K.white;g.lineWidth=2.5;g.stroke();
  circle(g,1130,624,3,K.white);circle(g,1140,624,2.4,K.white);
  if(lit>0){g.fillStyle=alpha(K.sodium,.18*lit);g.fillRect(985,584,360,110);}
  g.restore();
  if(lit>0){g.save();g.beginPath();g.moveTo(...rearWin[0]);for(const p of rearWin.slice(1))g.lineTo(...p);g.closePath();g.clip();g.fillStyle=alpha(K.sodium,.12*lit);g.fillRect(620,584,350,110);g.restore();}
  seg(g,[[975,584],[975,830]],3,alpha(K.white,.55));seg(g,[[712,700],[712,830]],2.5,alpha(K.white,.4));seg(g,[[1244,700],[1258,830]],2.5,alpha(K.white,.4));
  seg(g,[[530,760],[1440,760]],2,alpha(K.white,.18));
  for(const hx of [880,1150]){rr(g,hx,728,44,10,5);g.fillStyle=alpha(K.white,.75);g.fill();}
  circle(g,1428,735,9,K.white);glow(g,1430,735,40,K.dash,.5);
  rr(g,522,716,14,28,4);g.fillStyle=K.red;g.fill();glow(g,526,730,36,K.red,.45);
  const rot=T*speed/wheelR;
  const wy=ground-wheelR;
  for(const wx of CAR.wheels){circle(g,wx,wy,wheelR+8,K.deep);circle(g,wx,wy,wheelR,'#030405');g.strokeStyle=alpha(K.white,.8);g.lineWidth=3;g.beginPath();g.arc(wx,wy,wheelR,0,Math.PI*2);g.stroke();
    g.beginPath();g.arc(wx,wy,wheelR*.52,0,Math.PI*2);g.stroke();
    for(let k=0;k<5;k++){const a=rot+k*Math.PI*2/5;seg(g,[[wx+Math.cos(a)*wheelR*.16,wy+Math.sin(a)*wheelR*.16],[wx+Math.cos(a)*wheelR*.5,wy+Math.sin(a)*wheelR*.5]],3,alpha(K.white,.6));}}
}
