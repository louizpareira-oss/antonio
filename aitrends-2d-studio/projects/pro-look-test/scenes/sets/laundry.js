// laundry-v1: a 24-hour laundromat for the pro look test. Front-loading machines, benches, ceiling strips.
import {E,seg,circle,rr,poly,alpha,clamp,lerp,glow} from '/engine/core.js';
import {PRO,toneAt,contact} from '/engine/pro2d.js';

// Front-loading machine, feet at (x,y). glass: 'dark' | 'spin'; spin = rotation phase; eyes 0..1 (red, inside the drum).
export function machine(g,x,y,s=1,{z=0,glass='dark',spin=0,eyes=0,num=null,lit=1}={}){
  const body=toneAt(z,'#6A717B'),top=toneAt(z,'#8A919B'),dark=toneAt(z,'#2C3139');
  contact(g,x,y,150*s,.5*(1-z*.5));
  g.save();g.translate(x,y);g.scale(s,s);
  rr(g,-120,-300,240,300,14);g.fillStyle=body;g.fill();
  rr(g,-120,-300,240,56,14);g.fillStyle=top;g.fill();seg(g,[[-120,-244],[120,-244]],3,dark);
  rr(g,30,-286,70,28,5);g.fillStyle='#0b0d10';g.fill();
  if(num!=null){g.fillStyle=alpha(PRO.ink,.85*lit);g.font=`900 22px ${PRO.font}`;g.textAlign='center';g.textBaseline='middle';g.fillText(String(num),65,-271);}
  for(const dx of [-90,-60])circle(g,dx,-272,9,dark);
  circle(g,0,-128,92,toneAt(z,'#C9CED5'));circle(g,0,-128,74,'#07090c');
  g.save();g.beginPath();g.arc(0,-128,72,0,Math.PI*2);g.clip();
  if(glass==='spin'){g.strokeStyle=alpha(PRO.ink,.35);g.lineWidth=4;for(let i=0;i<5;i++){g.beginPath();g.arc(0,-128,20+i*11,spin+i*1.3,spin+i*1.3+1.6);g.stroke();}}
  if(eyes>0){g.globalAlpha*=eyes;g.shadowColor=PRO.redGlow;g.shadowBlur=20;circle(g,-16,-132,6,PRO.redGlow);circle(g,16,-132,6,PRO.redGlow);g.shadowBlur=0;}
  const gl=g.createLinearGradient(-60,-190,60,-70);gl.addColorStop(0,'rgba(255,255,255,.18)');gl.addColorStop(.4,'rgba(255,255,255,0)');g.fillStyle=gl;g.fillRect(-80,-210,160,160);
  g.restore();
  g.restore();
}
// A row of machines across the back wall at depth z.
export function machineRow(g,{y,s,z,n=8,x0=0,x1=E.W,spinSet=new Set(),eyesAt=-1,eyes=0,t=0}={}){
  for(let i=0;i<n;i++){const x=lerp(x0,x1,(i+.5)/n);machine(g,x,y,s,{z,glass:spinSet.has(i)?'spin':'dark',spin:t*6+i,eyes:i===eyesAt?eyes:0,num:i+1});}
}
// Fluorescent ceiling strip with a soft fall-off.
export function strip(g,x,y,w,a=1){rr(g,x-w/2,y-6,w,12,6);g.fillStyle=alpha('#F4F7FF',.95*a);g.fill();g.save();g.globalCompositeOperation='lighter';glow(g,x,y+40,w*.8,'#DDE6FF',.18*a);g.restore();}
// Bench seen from behind, at depth z.
export function bench(g,x,y,w,s,z){rr(g,x-w/2,y-60*s,w,22*s,6*s);g.fillStyle=toneAt(z,'#3A4049');g.fill();for(const d of [-.42,.42])seg(g,[[x+d*w,y-40*s],[x+d*w,y]],8*s,toneAt(z,'#2A2F36'));}
