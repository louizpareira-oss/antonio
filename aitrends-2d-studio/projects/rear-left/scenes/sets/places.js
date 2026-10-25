// places-v1: exterior settings and small close-ups for Rear Left. White line art on black; light only from physical sources.
import {E,text,circle,seg,poly,rr,alpha,clamp,lerp,ease,prog,glow,noise,rng} from '/engine/core.js';
import {K,line,FONT,lamp,limb,hand,carSide,CAR,figure,screenMap,pointer} from './car.js';
import {shape,box,WARM,SIGNAL_RED,SIGNAL_GREEN} from './cabin.js';
import {cluster,CL} from './dash.js';
const wash=(g,x,y,r,col,a)=>{if(a<=0)return;g.save();g.globalCompositeOperation='lighter';glow(g,x,y,r,col,a);g.restore();};
const at=(g,tx,ty,s,fn)=>{g.save();g.translate(tx,ty);g.scale(s,s);fn();g.restore();};

// Highway side view (camera locked to the car). lamps: 'periodic' (every 3 s) or {x} for one lamp at a given x.
export function highway(g,T,t,o={}){
  const v=o.speed??1100,lx=o.lampX??(2480-v*(((T+(o.phase??0))%3+3)%3)),lit=clamp(1-Math.abs(lx-980)/420);
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  g.save();g.translate(noise(T*9,2)*1.2,noise(T*9,7)*1.2);
  g.fillStyle='#0b0e15';g.beginPath();g.moveTo(-20,760);for(let x=-20;x<=1960;x+=60)g.lineTo(x,700+noise((x+t*60)*.004,4)*26);g.lineTo(1960,800);g.lineTo(-20,800);g.closePath();g.fill();
  for(let i=0;i<9;i++){const x=((i*260-t*60)%2200+2200)%2200-140;circle(g,x,688+((i*37)%30),2.2,alpha(K.dash,.35));}
  seg(g,[[0,792],[1920,792]],3,line(.35));for(let i=0;i<12;i++){const x=((i*220-t*v*.8)%2640+2640)%2640-240;seg(g,[[x,792],[x,840]],3,line(.25));}
  seg(g,[[lx,840],[lx,170],[lx-60,150]],8,'#1a1d24');seg(g,[[lx,840],[lx,170],[lx-60,150]],2,line(.35));
  rr(g,lx-104,138,64,20,8);g.fillStyle='#ffd7a8';g.fill();glow(g,lx-72,152,80,K.sodium,.8);
  g.save();g.globalCompositeOperation='lighter';const cg=g.createLinearGradient(0,160,0,CAR.ground);cg.addColorStop(0,alpha(K.sodium,.22));cg.addColorStop(1,alpha(K.sodium,.06));
  g.fillStyle=cg;g.beginPath();g.moveTo(lx-96,158);g.lineTo(lx-48,158);g.lineTo(lx+330,CAR.ground);g.lineTo(lx-470,CAR.ground);g.closePath();g.fill();
  g.translate(lx-70,CAR.ground+14);g.scale(1,.09);glow(g,0,0,430,K.sodium,.5);g.restore();
  carSide(g,T,{lit,lampX:lx,speed:v,...(o.car||{})});
  seg(g,[[0,CAR.ground],[1920,CAR.ground]],3,line(.4));
  for(let i=0;i<8;i++){const x=((i*300-t*v)%2400+2400)%2400-300;seg(g,[[x,960],[x+120,960]],6,line(.5));}
  g.restore();
}

// Gas station shop, seen from behind the counter: YOU at the till, the car at pump 6 through the window.
// o: dome (car dome light), gap (rear-left door gap px), focus (0..1 camera attention moves to the car)
export function shop(g,T,t,o={}){
  const f=ease.inOut(o.focus??0);
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  g.save();g.translate(E.W/2,E.H/2);g.scale(lerp(1,1.9,f),lerp(1,1.9,f));g.translate(-lerp(960,640,f),-lerp(540,520,f));
  // Window wall: the forecourt outside under the canopy.
  shape(g,[[140,110],[1780,110],[1780,770],[140,770]],'#05070b',.45);
  g.save();g.beginPath();g.rect(140,110,1640,660);g.clip();
  poly(g,[[140,110],[1780,110],[1780,210],[140,230]],'#151a24');for(let i=0;i<6;i++)seg(g,[[220+i*280,200],[360+i*280,198]],6,alpha(K.dash,.9));
  wash(g,960,260,1100,K.dash,.16);seg(g,[[140,700],[1780,690]],2,line(.3));
  shape(g,[[1180,520],[1300,520],[1300,700],[1180,700]],'#10141c',.5);rr(g,1205,545,70,50,6);g.fillStyle=alpha(K.screen,.6);g.fill();
  text(g,'6',1240,488,{size:32,font:FONT,weight:900,color:K.white});rr(g,1214,466,52,44,6);g.strokeStyle=line(.6);g.lineWidth=2;g.stroke();
  at(g,180,330,.42,()=>carSide(g,T,{driver:false,beam:false,dome:o.dome??0,top:.9,gap:o.gap??0}));
  g.restore();
  for(let i=0;i<3;i++)seg(g,[[140+i*547,110],[140+i*547,770]],6,'#0b0d12');
  // Shop interior: ceiling panel light, shelves at the sides.
  shape(g,[[0,0],[1920,0],[1920,110],[0,110]],'#0b0d13',.2);rr(g,700,30,520,40,8);g.fillStyle=alpha(K.dash,.85);g.fill();wash(g,960,60,900,K.dash,.14);
  for(const x of [0,1780])shape(g,[[x,110],[x+140,110],[x+140,1080],[x,1080]],'#0b0d13',.3);
  figure(g,{x:960,y:900,s:1.32,front:true});
  limb(g,[[1000,560],[1050,700],[1060,850]],24);hand(g,1060,852,20,0);
  wash(g,960,320,500,K.dash,.1);
  // Counter (foreground) with the till.
  shape(g,[[-40,850],[1960,850],[1960,1120],[-40,1120]],'#0e1118',.5);seg(g,[[-40,850],[1960,850]],4,alpha(K.dash,.45));
  shape(g,[[1300,700],[1560,700],[1600,850],[1260,850]],'#10141c',.5);rr(g,1330,720,200,90,8);g.fillStyle=alpha(K.screen,.35);g.fill();
  g.restore();
}

// Forecourt: YOU walks back from the shop with coffee and bag; the dome light inside the car is still fading.
export function forecourt(g,T,t,o={}){
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  poly(g,[[0,0],[1920,0],[1920,150],[0,170]],'#151a24');seg(g,[[0,170],[1920,150]],3,line(.5));
  for(let i=0;i<7;i++)seg(g,[[80+i*290,150],[230+i*290,148]],8,alpha(K.dash,.95));
  wash(g,960,200,1300,K.dash,.2);
  for(const x of [380,1500])shape(g,[[x-26,160],[x+26,160],[x+26,900],[x-26,900]],'#121620',.45);
  seg(g,[[0,900],[1920,900]],3,line(.45));poly(g,[[0,900],[1920,900],[1920,1080],[0,1080]],'#0a0c11');
  shape(g,[[1650,420],[1920,420],[1920,900],[1650,900]],'#141822',.4);rr(g,1680,460,240,300,6);g.fillStyle=alpha(K.dash,.22);g.fill();
  shape(g,[[1120,600],[1210,600],[1210,880],[1120,880]],'#10141c',.5);text(g,'6',1165,570,{size:32,font:FONT,weight:900,color:K.white});
  at(g,-40,330,.66,()=>carSide(g,T,{driver:false,beam:false,dome:o.dome??0,top:1}));
  const w=o.walk??0;figure(g,{x:lerp(1560,1010,ease.inOut(w)),y:900,s:1.05,facing:-1,walk:w<1?.9:0,phase:t*1.6,carry:true});
}

// Rear-left door seam, very close. gap px between the door's rear edge and the body; the canopy reflection slides back.
export function doorSeam(g,T,t,o={}){
  g.fillStyle='#0c0f15';g.fillRect(0,0,E.W,E.H);
  const gx=1000,gap=o.gap??22;
  g.save();g.beginPath();g.rect(0,0,E.W,E.H);g.clip();
  const off=t*(o.speed??140);
  for(const [y,h,a] of [[300,80,.5],[620,30,.25]]){const gr=g.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,alpha(K.dash,0));gr.addColorStop(.5,alpha(K.dash,a));gr.addColorStop(1,alpha(K.dash,0));g.fillStyle=gr;g.fillRect(-off%600-600,y,E.W+1200,h);}
  g.restore();
  poly(g,[[gx,0],[gx+gap,0],[gx+gap+10,E.H],[gx+10,E.H]],'#000');seg(g,[[gx,0],[gx+10,E.H]],3,line(.7));seg(g,[[gx+gap,0],[gx+gap+10,E.H]],3,line(.7));
  seg(g,[[0,860],[gx,860]],2,line(.25));seg(g,[[gx+gap,860],[1920,860]],2,line(.25));
  rr(g,520,470,260,60,30);g.fillStyle='#07090d';g.fill();g.strokeStyle=line(.6);g.lineWidth=3;g.stroke();
}

// Rear-left door handle at speed; a sodium highlight slides along the chrome. Nothing touches it.
export function handleECU(g,T,t,o={}){
  const Lp=lamp(T,o.phase??0,3,1.1);
  g.fillStyle='#0b0e14';g.fillRect(0,0,E.W,E.H);
  for(let i=0;i<14;i++){const x=((i*260-t*2400)%3640+3640)%3640-300,y=880+(i%4)*40;seg(g,[[x,y],[x+180,y]],2,alpha(K.white,.12));}
  rr(g,560,380,800,260,120);g.fillStyle='#05070a';g.fill();g.strokeStyle=line(.5);g.lineWidth=3;g.stroke();
  rr(g,640,450,640,100,50);g.fillStyle='#1a1e27';g.fill();g.strokeStyle=line(.85);g.lineWidth=4;g.stroke();
  if(Lp.k>0){g.save();rr(g,640,450,640,100,50);g.clip();const x=lerp(1500,500,Lp.u);const gr=g.createLinearGradient(x-120,0,x+120,0);gr.addColorStop(0,alpha(K.sodium,0));gr.addColorStop(.5,alpha(K.sodium,.9*Lp.k));gr.addColorStop(1,alpha(K.sodium,0));g.fillStyle=gr;g.fillRect(600,440,760,120);g.restore();
    wash(g,lerp(1500,500,Lp.u),400,700,K.sodium,.12*Lp.k);}
  seg(g,[[0,250],[1920,240]],3,line(.3));seg(g,[[0,780],[1920,780]],2,line(.2));
}

// Overhead sign EXIT 12 rushing toward the camera on the highway.
export function signScene(g,T,t,dur){
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  const vp=[960,470];poly(g,[[vp[0]-40,vp[1]],[vp[0]+40,vp[1]],[2200,1080],[-280,1080]],'#0a0c11');
  for(const s of [-1,1])seg(g,[[vp[0]+s*40,vp[1]],[vp[0]+s*1240,1080]],3,line(.4));
  for(let i=0;i<8;i++){const z=((i/8+t*.9)%1),y=lerp(vp[1],1080,z*z),w=lerp(2,26,z*z);seg(g,[[vp[0],y],[vp[0],y+lerp(4,90,z*z)]],w,line(.5*z+.1));}
  g.save();g.globalCompositeOperation='lighter';poly(g,[[700,1080],[1220,1080],[1000,600],[920,600]],alpha(K.dash,.08));g.restore();
  const z=ease.in(prog(t,0,dur*.95)),s=lerp(.18,2.6,z),cy=lerp(360,-80,z*z);
  g.save();g.translate(960,cy);g.scale(s,s);
  for(const x of [-380,380])seg(g,[[x,0],[x,500]],10,'#1a1d24');seg(g,[[-400,-60],[400,-60]],12,'#1a1d24');
  rr(g,-300,-40,600,200,16);g.fillStyle='#0f5a35';g.fill();g.strokeStyle=K.white;g.lineWidth=5;g.stroke();
  const flare=clamp((s-.9)/.6);
  text(g,'EXIT 12',0,60,{size:36*2.2,font:FONT,weight:900,color:K.white,glow:30*flare,glowColor:alpha(K.white,.9)});
  g.restore();
}

// Off-ramp from above: the car follows the curve; headlight cones sweep the guardrail reflectors.
export function rampScene(g,T,t,dur){
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  const cx=760,cy=1160,R=760;
  g.lineCap='butt';g.strokeStyle='#0d1017';g.lineWidth=220;g.beginPath();g.arc(cx,cy,R,Math.PI*1.02,Math.PI*1.98);g.stroke();
  for(const d of [-110,110]){g.strokeStyle=line(.55);g.lineWidth=3;g.beginPath();g.arc(cx,cy,R+d,Math.PI*1.02,Math.PI*1.98);g.stroke();}
  g.setLineDash([30,40]);g.strokeStyle=line(.3);g.lineWidth=3;g.beginPath();g.arc(cx,cy,R,Math.PI*1.02,Math.PI*1.98);g.stroke();g.setLineDash([]);
  wash(g,1210,360,260,K.sodium,.3);circle(g,1210,330,8,'#ffd7a8');
  const a=lerp(Math.PI*1.08,Math.PI*1.92,ease.sine(prog(t,0,dur))),px=cx+Math.cos(a)*R,py=cy+Math.sin(a)*R,hd=a+Math.PI/2;
  // Reflectors on the outer rail light when a headlight cone reaches them.
  for(let i=0;i<26;i++){const b=Math.PI*1.03+i*(Math.PI*.94/25),rx=cx+Math.cos(b)*(R+135),ry=cy+Math.sin(b)*(R+135);
    const dx=rx-px,dy=ry-py,dist=Math.hypot(dx,dy),ang=Math.atan2(dy,dx)-hd,da=Math.atan2(Math.sin(ang),Math.cos(ang));
    const on=dist<520&&Math.abs(da)<.6?1-dist/520:0;circle(g,rx,ry,5+5*on,on>0?alpha(K.amber,.4+.6*on):line(.25));}
  g.save();g.translate(px,py);g.rotate(hd);
  g.save();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,0,500,0);gr.addColorStop(0,alpha(K.dash,.28));gr.addColorStop(1,alpha(K.dash,0));g.fillStyle=gr;
  g.beginPath();g.moveTo(40,-30);g.lineTo(520,-200);g.lineTo(520,200);g.lineTo(40,30);g.closePath();g.fill();g.restore();
  rr(g,-80,-40,160,80,18);g.fillStyle=K.panel;g.fill();g.strokeStyle=K.white;g.lineWidth=3;g.stroke();
  rr(g,10,-30,30,60,6);g.fillStyle='#05070a';g.fill();rr(g,-60,-30,26,60,6);g.fill();
  g.restore();
}

// Empty avenue with a traffic signal over the stop line. o: sig ('green'|'yellow'|'red'), carX (front of the car), red tint
export function avenue(g,T,t,o={}){
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  const r=rng(31);for(let i=0;i<9;i++){const x=i*230-40,h=260+r()*260;shape(g,[[x,780-h],[x+200,780-h],[x+200,780],[x,780]],'#0b0e14',.2);
    for(let j=0;j<5;j++)if(r()<.25){rr(g,x+30+(j%2)*90,780-h+40+Math.floor(j/2)*70,50,36,3);g.fillStyle=alpha(WARM,.5);g.fill();}}
  seg(g,[[0,780],[1920,780]],2,line(.3));poly(g,[[0,862],[1920,862],[1920,1080],[0,1080]],'#0a0c11');seg(g,[[1452,866],[1452,890]],10,line(.8));
  for(let i=0;i<6;i++)seg(g,[[i*360-80,905],[i*360+60,905]],5,line(.4));
  const sig=o.sig||'red',col=sig==='red'?SIGNAL_RED:sig==='yellow'?K.amber:SIGNAL_GREEN;
  seg(g,[[1640,862],[1640,180],[1520,180]],12,'#1a1d24');seg(g,[[1640,862],[1640,180],[1520,180]],2,line(.35));
  rr(g,1470,180,100,250,20);g.fillStyle='#0b0d12';g.fill();g.strokeStyle=line(.5);g.lineWidth=2;g.stroke();
  [['red',230],['yellow',305],['green',380]].forEach(([c,y])=>{const lit=c===sig;circle(g,1520,y,28,lit?col:'#15181f');if(lit)wash(g,1520,y,140,col,.7);});
  rr(g,1660,520,190,52,8);g.fillStyle='#0f5a35';g.fill();text(g,'Harlan Av',1755,547,{size:30,font:FONT,weight:800,color:K.white});
  wash(g,1500,300,1400,col,.12);
  at(g,(o.carX??1440)-1442*.82,862-862*.82,.82,()=>carSide(g,T,{speed:o.speed??0,top:.5,topCol:col}));
  wash(g,(o.carX??1440)-300,700,700,col,.14);
}

// The car from behind: back glass with a palm-sized patch of fog on the inside.
export function rearWindow(g,T,t,o={}){
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  poly(g,[[860,560],[1060,560],[1700,1080],[220,1080]],'#0a0c11');for(let i=0;i<5;i++){const z=((i/5+t*.8)%1);seg(g,[[960,lerp(570,1080,z*z)],[960,lerp(570,1080,z*z)+lerp(6,80,z*z)]],lerp(2,18,z*z),line(.45));}
  shape(g,[[420,300],[1500,300],[1640,520],[1640,820],[280,820],[280,520]],'#0d1017',.75);
  const glass=[[520,330],[1400,330],[1520,520],[400,520]];shape(g,glass,'#05070b',.6);
  wash(g,960,1100,900,K.dash,.1);
  const fk=o.fog??0;if(fk>0){g.save();g.beginPath();g.moveTo(...glass[0]);for(const p of glass.slice(1))g.lineTo(...p);g.closePath();g.clip();
    g.beginPath();g.ellipse(700,440,110,70,-.1,0,Math.PI*2);g.fillStyle=alpha('#b9c0cb',.35*fk);g.filter='blur(8px)';g.fill();g.filter='none';g.restore();}
  for(const [x0,x1] of [[560,700],[1120,1260]])seg(g,[[x0,340],[x1,510]],3,alpha(K.white,.12));
  for(const x of [330,1590]){rr(g,x-50,580,100,60,10);g.fillStyle=K.red;g.fill();wash(g,x,610,150,K.red,.45);}
  rr(g,860,700,200,70,6);g.fillStyle='#e6e8ec';g.fill();
  seg(g,[[280,820],[1640,820]],3,line(.6));
}

// House 41 at night: porch light, attached garage, a streetlamp; the car's headlights arriving from the left.
export function house(g,T,t,o={}){
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  seg(g,[[0,860],[1920,860]],3,line(.4));poly(g,[[0,860],[1920,860],[1920,1080],[0,1080]],'#0a0c11');
  seg(g,[[160,860],[160,260],[230,240]],8,'#1a1d24');rr(g,200,232,60,18,7);g.fillStyle='#ffd7a8';g.fill();glow(g,230,246,70,K.sodium,.7);
  g.save();g.globalCompositeOperation='lighter';poly(g,[[208,250],[252,250],[420,860],[40,860]],alpha(K.sodium,.08));g.restore();
  shape(g,[[520,860],[520,470],[820,270],[1120,470],[1120,860]],'#0c0f15',.75);
  for(const [x,y] of [[600,540],[920,540],[600,700]]){rr(g,x,y,110,90,4);g.fillStyle='#05070b';g.fill();g.strokeStyle=line(.5);g.lineWidth=2;g.stroke();}
  rr(g,880,690,110,170,4);g.fillStyle='#0a0c11';g.fill();g.strokeStyle=line(.65);g.lineWidth=3;g.stroke();
  circle(g,860,660,10,'#ffe2b8');wash(g,860,700,320,WARM,.55);
  g.save();g.globalCompositeOperation='lighter';g.translate(900,870);g.scale(1,.14);glow(g,0,0,300,WARM,.45);g.restore();
  text(g,'41',1040,640,{size:32,font:FONT,weight:900,color:K.white});
  shape(g,[[1120,860],[1120,560],[1700,560],[1700,860]],'#0c0f15',.75);
  const dr=o.doorOpen??0;rr(g,1180,600+0*dr,460,260,4);g.fillStyle='#090b10';g.fill();g.strokeStyle=line(.6);g.lineWidth=3;g.stroke();
  for(let i=1;i<4;i++)seg(g,[[1180,600+i*65],[1640,600+i*65]],2,line(.3));
  const cx=o.carX??-200;at(g,cx-1442*.5,862-862*.5,.5,()=>carSide(g,T,{speed:o.speed??200}));
  if(o.blink){circle(g,cx-10,862-120*.5*1.1,7,K.amber);wash(g,cx-10,800,60,K.amber,.6);}
}

// Inside the garage, side view: the door (left) comes down; the streetlight wedge on the floor narrows to a line.
export function garageInside(g,T,t,o={}){
  const door=clamp(o.door??0),bulb=o.bulb??1;
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  seg(g,[[120,880],[1860,880]],3,line(.45));seg(g,[[120,120],[1860,120]],3,line(.3));seg(g,[[1860,120],[1860,880]],3,line(.35));
  seg(g,[[300,150],[1500,150]],8,'#1a1d24');rr(g,1060,140,120,50,10);g.fillStyle='#1a1d24';g.fill();
  circle(g,1120,200,14,bulb>0?'#ffe2b8':'#2a2d33');
  const gapTop=lerp(120,880,door);
  poly(g,[[60,120],[150,120],[150,gapTop],[60,gapTop]],'#0e1118');for(let y=120+60;y<gapTop;y+=110)seg(g,[[60,y],[150,y]],2,line(.35));
  outline2(g,[[60,120],[150,120],[150,gapTop],[60,gapTop]]);
  if(door<1){g.save();g.globalCompositeOperation='lighter';const h=880-gapTop,wedge=Math.max(2,h*1.9);
    const gr=g.createLinearGradient(150,0,150+wedge*2.6,0);gr.addColorStop(0,alpha(K.sodium,.45));gr.addColorStop(1,alpha(K.sodium,0));g.fillStyle=gr;
    g.beginPath();g.moveTo(150,gapTop);g.lineTo(150,880);g.lineTo(150+wedge*2.6,880);g.closePath();g.fill();
    poly(g,[[150,872],[150+wedge*2.6,876],[150+wedge*2.6,884],[150,888]],alpha(K.sodium,.5));g.restore();}
  at(g,1840-1442*.86,880-862*.86,.86,()=>carSide(g,T,{speed:0,beam:o.beam??false,driver:true,top:.6*bulb,topCol:WARM,dash:o.dash}));
  if(bulb>0){wash(g,1120,200,900,WARM,.32*bulb);}
  if(o.dashGlow>0)wash(g,1600,640,140,K.dash,.5*o.dashGlow);
}
function outline2(g,pts){g.strokeStyle=line(.55);g.lineWidth=2;g.beginPath();g.moveTo(...pts[0]);for(const p of pts.slice(1))g.lineTo(...p);g.closePath();g.stroke();}

// Driving into the open garage: opener bulb inside, headlights shrinking on the back wall.
export function garageEntry(g,T,t,dur,o={}){
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  shape(g,[[300,880],[300,260],[1820,260],[1820,880]],'#0c0f15',.7);
  poly(g,[[420,880],[420,330],[1700,330],[1700,880]],'#07080c');seg(g,[[1620,330],[1620,880]],2,line(.25));
  circle(g,1060,370,12,'#ffe2b8');wash(g,1060,380,900,WARM,.3);
  seg(g,[[0,880],[1920,880]],3,line(.45));poly(g,[[0,880],[1920,880],[1920,1080],[0,1080]],'#0a0c11');
  const k=ease.out(prog(t,0,dur*.85)),front=lerp(300,1560,k);
  const spot=lerp(1,.25,k);wash(g,1650,640,lerp(380,120,k),K.dash,.5*spot);
  at(g,front-1442*.72,880-862*.72,.72,()=>carSide(g,T,{speed:lerp(500,0,k),top:.5,topCol:WARM}));
  seg(g,[[420,330],[420,880]],4,line(.6));
}

// Driver's side mirror close-up: the garage door descending in the glass.
export function sideMirrorECU(g,T,t,o={}){
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  shape(g,[[0,0],[700,0],[620,1080],[0,1080]],'#0b0d13',.25);
  g.save();g.translate(1080,520);rr(g,-560,-330,1120,660,170);g.fillStyle='#0b0d12';g.fill();g.strokeStyle=line(.55);g.lineWidth=4;g.stroke();
  rr(g,-520,-290,1040,580,140);g.save();g.clip();g.fillStyle='#0a0c11';g.fillRect(-540,-300,1080,600);
  // In the glass: the garage opening, the street outside, and the door panels coming down.
  poly(g,[[-300,-200],[300,-200],[300,240],[-300,240]],'#06080d');
  wash(g,150,-60,320,K.sodium,.5);circle(g,150,-120,8,'#ffd7a8');seg(g,[[-300,180],[300,180]],2,line(.3));
  const d=clamp(o.door??0),h=440*d;poly(g,[[-300,-200],[300,-200],[300,-200+h],[-300,-200+h]],'#141821');
  for(let y=-200+55;y<-200+h;y+=110)seg(g,[[-300,y],[300,y]],2,line(.35));seg(g,[[-300,-200+h],[300,-200+h]],3,line(.6));
  wash(g,-100,0,500,WARM,.15);
  g.restore();g.restore();
}

// Driver door: window above, the sill, and the lock pin; the cluster's corner (padlock) at bottom right.
export function doorSill(g,T,t,o={}){
  const Lp=lamp(T,o.phase??.4);
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  const win=[[0,0],[1920,0],[1920,520],[0,560]];shape(g,win,K.glass,.0);if(Lp.k>0)wash(g,lerp(2100,-200,Lp.u),260,420,K.sodium,.4*Lp.k);
  for(const [x0,x1] of [[300,560],[1100,1400]])seg(g,[[x0,40],[x1,480]],3,alpha(K.white,.07));
  shape(g,[[0,560],[1920,520],[1920,660],[0,710]],'#161b25',.8);seg(g,[[0,566],[1920,526]],3,alpha(K.dash,.35));
  shape(g,[[0,710],[1920,660],[1920,1080],[0,1080]],'#0d1017',.35);rr(g,300,800,520,40,20);g.fillStyle='#07090d';g.fill();g.strokeStyle=line(.5);g.lineWidth=2;g.stroke();
  const drop=o.drop??0,ph=150-drop*60;rr(g,890,548-ph,64,ph+8,24);g.fillStyle='#c9ced6';g.fill();g.strokeStyle=K.white;g.lineWidth=3;g.stroke();
  g.beginPath();g.ellipse(922,548,58,16,0,0,Math.PI*2);g.fillStyle='#05070a';g.fill();g.strokeStyle=line(.6);g.lineWidth=2;g.stroke();rr(g,890,548-ph,64,ph-6,24);g.fillStyle='#c9ced6';g.fill();g.strokeStyle=K.white;g.stroke();
  if((o.lock??0)>0){g.save();g.beginPath();g.ellipse(1900,1090,380,260,0,0,Math.PI*2);g.fillStyle='#06070b';g.fill();g.strokeStyle=line(.35);g.lineWidth=3;g.stroke();g.clip();
    g.globalAlpha*=o.lock;rr(g,1700,940,44,34,7);g.fillStyle=alpha(K.white,.9);g.fill();g.strokeStyle=alpha(K.white,.9);g.lineWidth=6;g.beginPath();g.arc(1722,936,15,Math.PI,0);g.stroke();g.restore();}
}

// Start button: ENGINE START STOP; the cluster glow at the top edge dims to accessory mode.
export function startBtn(g,T,t,o={}){
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  const dim=o.dim??0;wash(g,700,-120,900,K.dash,lerp(.22,.05,dim));
  shape(g,[[-20,180],[1940,140],[1940,1100],[-20,1100]],'#0b0d13',.25);
  circle(g,960,600,230,'#0d1017');g.strokeStyle=line(.6);g.lineWidth=6;g.beginPath();g.arc(960,600,230,0,Math.PI*2);g.stroke();
  const p=o.press??0;circle(g,960,600,190-p*6,'#151922');g.strokeStyle=line(.4);g.lineWidth=3;g.beginPath();g.arc(960,600,190-p*6,0,Math.PI*2);g.stroke();
  text(g,'ENGINE',960,560,{size:34,font:FONT,weight:900,color:alpha(K.white,.8)});text(g,'START  STOP',960,612,{size:30,font:FONT,weight:800,color:alpha(K.white,.6)});
  circle(g,960,680,8,dim>.5?alpha(K.amber,.9):alpha(K.green,.8));
  if(o.finger)pointer(g,o.finger,.7);
  if(o.pab)wash(g,1700,60,200,K.amber,.25);
}

// Visor remote: three buttons on the sun visor; the LED blinks red on the press.
export function visorRemote(g,T,t,o={}){
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  shape(g,[[-20,-20],[1940,-20],[1940,760],[-20,820]],'#141821',.3);g.setLineDash([10,12]);seg(g,[[60,60],[1860,60]],2,line(.25));g.setLineDash([]);
  rr(g,560,260,800,300,40);g.fillStyle='#0b0d12';g.fill();g.strokeStyle=line(.6);g.lineWidth=3;g.stroke();
  const p=o.press??0;[700,960,1220].forEach((x,i)=>{rr(g,x-90,330+(i===0?p*6:0),180,150,24);g.fillStyle='#1a1e27';g.fill();g.strokeStyle=line(.5);g.lineWidth=2;g.stroke();});
  const led=o.led??0;circle(g,960,290,9,led>0?K.red:'#3a1418');if(led>0)wash(g,960,290,90,K.red,.7*led);
  wash(g,1060,1100,700,WARM,.12);
  if(o.thumb){const f=o.thumb;limb(g,[[300,1200],[480,900],[f[0]-10,f[1]+60]],70);rr(g,f[0]-50,f[1]-30,100,110,46);g.fillStyle=K.white;g.fill();}
}

// Closed armrest lid and the coffee in its holder, seen from above.
export function consoleLid(g,T,t,o={}){
  const Lp=lamp(T,o.phase??.9);
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  shape(g,[[300,-20],[1620,-20],[1700,1100],[220,1100]],'#0b0d13',.25);
  rr(g,820,120,560,820,90);g.fillStyle='#141821';g.fill();g.strokeStyle=line(.55);g.lineWidth=3;g.stroke();seg(g,[[860,520],[1340,520]],3,line(.3));rr(g,1060,900,80,24,8);g.fillStyle='#0b0d12';g.fill();
  circle(g,560,520,170,'#090b10');g.strokeStyle=line(.35);g.lineWidth=3;g.beginPath();g.arc(560,520,170,0,Math.PI*2);g.stroke();
  circle(g,560,520,135,'#17140f');g.strokeStyle=line(.6);g.beginPath();g.arc(560,520,135,0,Math.PI*2);g.stroke();
  rr(g,500,500,120,22,11);g.fillStyle='#0b0907';g.fill();seg(g,[[470,470],[640,460]],3,alpha(K.dash,.4));
  wash(g,960,1150,800,K.dash,.1);if(Lp.k>0)wash(g,lerp(2100,-200,Lp.u),300,600,K.sodium,.14*Lp.k);
}

// Centre screen off, with the call's ghost text fading from the panel.
export function mediaGhost(g,T,t,o={}){
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  shape(g,[[0,870],[1920,850],[1920,1080],[0,1080]],K.cabin,.25);
  box(g,300,120,1320,720,34,'#030405',.25);
  g.fillStyle='#05070c';g.fillRect(330,150,1260,660);
  const k=o.ghost??0;text(g,'Unknown device',960,480,{size:64,font:FONT,weight:800,color:alpha(K.screen,.3*k)});
  wash(g,960,480,400,K.screen,.04*k);
  box(g,890,862,170,62,16,'#0d1017',.3);
}
