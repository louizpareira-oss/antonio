// Rear Left vertical slice: SC41-SC45, the midpoint audio breach. Times are global slice times (timeline/words.json).
import {E,registerShot,ease,prog,lerp,clamp,text,circle,seg,poly,rr,alpha,glow,noise} from '/engine/core.js';
import {K,line,FONT,header,lamp,limb,hand,head,torso,wheel,mirror,bag,screenMap,screenCall,screenStatic,carSide,CAR} from '../sets/car.js';

const CALL_ON=6.60,STATIC=[11.75,11.75+4/30];
// Slice-relative time: the approved slice was timed from SC41's start.
const rel=info=>info.globalT-E.shots.find(s=>s.id==='SC41').start;
const outline=(g,pts,a=.25,w=2)=>{g.strokeStyle=line(a);g.lineWidth=w;g.beginPath();g.moveTo(...pts[0]);for(const p of pts.slice(1))g.lineTo(...p);g.closePath();g.stroke();};
const shape=(g,pts,fill,a=.25)=>{poly(g,pts,fill);outline(g,pts,a);};
const box=(g,x,y,w,h,r,fill,a=.25)=>{rr(g,x,y,w,h,r);g.fillStyle=fill;g.fill();g.strokeStyle=line(a);g.lineWidth=2;g.stroke();};
const keyPt=(t,keys)=>{let p=keys[0][1];for(let i=1;i<keys.length;i++){const [t0,a]=keys[i-1],[t1,b]=keys[i];if(t>=t0){const k=ease.inOut(prog(t,t0,t1));p=[lerp(a[0],b[0],k),lerp(a[1],b[1],k)];}}return p;};
const breath=T=>.5+.5*Math.sin(T*Math.PI*2/3.6);
// Sodium pool seen on glass: an orange wash whose strength follows the lamp crossing.
const glassLit=(g,pts,k,a=.2)=>{if(k<=0)return;poly(g,pts,alpha(K.sodium,a*k));};

// SC41 — frontal close-up through the windshield. The right hand comes down from the mirror to the wheel.
registerShot('SC41',{draw(g,t,info){
  const T=rel(info),L1=lamp(T,1.9),sy=lerp(-260,1360,L1.u);
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  // Rear cabin: back glass, both rear side windows, the rear bench and its headrests (rear-left is right of YOU's head).
  const back=[[760,250],[1210,250],[1250,420],[720,420]],rl=[[1440,200],[1700,150],[1700,470],[1440,430]],rr_=[[480,200],[220,150],[220,470],[480,430]];
  for(const w of [back,rl,rr_]){shape(g,w,K.glass,.2);glassLit(g,w,L1.k*clamp(1-Math.abs(sy-320)/520),.22);}
  box(g,430,400,1120,280,40,'#0c0f15',.18);
  box(g,560,326,150,96,32,'#0d1017',.22);box(g,1268,326,150,96,32,'#0d1017',.22);
  // Front seats: passenger side (frame left) with the grocery bag; the driver's seat back and headrest behind YOU.
  box(g,250,430,380,700,60,K.panel,.3);box(g,330,288,220,140,44,K.panel,.3);bag(g,440,1000,.95);
  box(g,880,390,450,720,60,K.panel,.3);box(g,1000,252,210,140,44,K.panel,.3);
  const L={under:.85,sodium:{k:L1.k,y:sy}};
  torso(g,{x:1105,y:532,w:600,h:580,face:0,breath:breath(T),L:{...L,sodiumA:.14}});
  head(g,{x:1105,y:395,r:158,face:0,gaze:[0,.05],blink:clamp(1-Math.abs(T-3.0)/.07),L});
  // Wheel top arc; left hand (frame right) holds still, right hand lowers from beside the mirror and takes the rim.
  wheel(g,{x:1105,y:1110,rx:430,ry:430,w:36,a0:Math.PI*1.04,a1:Math.PI*1.96});
  limb(g,[[1360,640],[1560,900],[1434,836]],46);hand(g,1434,836,34,.5);
  const H=keyPt(T,[[0,[840,250]],[.9,[840,250]],[4.6,[776,836]]]),El=keyPt(T,[[0,[716,500]],[.9,[716,500]],[4.6,[640,900]]]);
  limb(g,[[850,640],El,H],46);hand(g,H[0],H[1],34,T>4.5?-.5:-.2);
  // Windshield frame, the mirror (still tilted up at the roof) and the dash top lit by the cluster.
  shape(g,[[0,0],[1920,0],[1920,70],[0,70]],K.deep,.2);
  shape(g,[[0,0],[200,0],[80,1080],[0,1080]],K.deep,.3);shape(g,[[1920,0],[1720,0],[1840,1080],[1920,1080]],K.deep,.3);
  mirror(g,820,112,{w:300,h:84,tilt:-.16});
  shape(g,[[0,990],[1920,990],[1920,1080],[0,1080]],K.deep,.32);glow(g,1105,996,260,K.dash,.16);
  for(const [x0,x1] of [[300,620],[1300,1560]]){seg(g,[[x0,80],[x1,620]],2,alpha(K.white,.04));}
  if(L1.k>0){g.save();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,sy-420,0,sy+420);gr.addColorStop(0,alpha(K.sodium,0));gr.addColorStop(.5,alpha(K.sodium,.07*L1.k));gr.addColorStop(1,alpha(K.sodium,0));g.fillStyle=gr;g.fillRect(0,0,E.W,E.H);g.restore();}
  header(g,'RULE 5');
}});

// SC42 — three-quarter from the passenger seat. The centre screen switches to a call; blue light rises on YOU; eyes flick to it.
const SCR=[[1580,650],[1920,610],[1920,940],[1600,975]];
registerShot('SC42',{draw(g,t,info){
  const T=rel(info),on=ease.out(prog(T,CALL_ON,CALL_ON+.25)),Lp=lamp(T,.6);
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  shape(g,[[0,0],[1920,0],[1920,120],[0,150]],K.cabin,.15);
  const dw=[[360,170],[1080,140],[1080,560],[360,590]],rw=[[0,190],[300,175],[300,600],[0,620]];
  for(const w of [dw,rw])shape(g,w,K.glass,.25);
  // Lamps outside slide past the side glass from the front of the car to the back.
  if(Lp.k>0){const lx=lerp(1240,-220,Lp.u);g.save();g.beginPath();for(const w of [dw,rw]){g.moveTo(...w[0]);for(const p of w.slice(1))g.lineTo(...p);g.closePath();}g.clip();glow(g,lx,260,240,K.sodium,.5*Lp.k);g.restore();}
  box(g,300,150,58,480,10,'#0c0f15',.15);
  shape(g,[[0,620],[1080,580],[1080,1080],[0,1080]],'#0d1017',.25);rr(g,470,690,130,22,11);g.fillStyle=alpha(K.white,.35);g.fill();
  shape(g,[[1110,130],[1920,70],[1920,560],[1110,590]],'#090c13',.2);shape(g,[[1080,140],[1130,128],[1130,600],[1080,582]],K.deep,.2);
  shape(g,[[1080,600],[1920,560],[1920,1080],[1080,1080]],K.deep,.3);
  glow(g,1340,650,170,K.dash,.22);circle(g,1318,662,4,K.red);circle(g,1342,664,4,K.red);
  mirror(g,1500,74,{w:250,h:70,tilt:-.22,front:true});
  const L={under:.6,screen:{k:.2+1.1*on,x:1700,y:760,r:1500},back:{k:Lp.k*clamp(1-Math.abs(lerp(1240,-220,Lp.u)-500)/700),a:Math.PI}};
  limb(g,[[900,700],[1060,720],[1218,580]],42);
  torso(g,{x:760,y:611,w:600,h:520,face:.55,breath:breath(T),L});
  const look=ease.out(prog(T,6.90,7.05));
  head(g,{x:760,y:470,r:160,face:.55,gaze:[lerp(.55,1,look),lerp(.05,.5,look)],L});
  seg(g,[[1262,770],[1500,700]],40,'#0d0f14');seg(g,[[1262,750],[1500,682]],2,line(.3));
  wheel(g,{x:1250,y:770,rx:84,ry:250,rot:-.08,w:30});
  g.save();g.translate(1256,770);g.rotate(-.08);g.beginPath();g.ellipse(0,0,30,70,0,0,Math.PI*2);g.fillStyle='#0d0f14';g.fill();g.strokeStyle=line(.5);g.lineWidth=2;g.stroke();
  for(const a of [-.35,.35,Math.PI/2])seg(g,[[Math.cos(a)*26,Math.sin(a)*64],[Math.cos(a)*78,Math.sin(a)*238]],14,'#111319');g.restore();
  hand(g,1218,580,30,-.5);
  limb(g,[[930,740],[1000,920],[1316,780]],46);hand(g,1316,780,34,-.3);
  // Centre screen in the foreground: dim map, then the call screen.
  g.save();g.beginPath();g.moveTo(...SCR[0]);for(const p of SCR.slice(1))g.lineTo(...p);g.closePath();g.fillStyle='#030405';g.fill();g.clip();
  g.translate(1592,664);g.transform(1,-40/340,22/325,1,0,0);
  if(T<CALL_ON)screenMap(g,0,0,360,300,T,{dim:.6,bar:false});else screenCall(g,0,0,360,300,T-CALL_ON,info.globalT,{bars:22,detail:false});
  g.restore();outline(g,SCR,.4,3);
  if(on>0){g.save();g.globalCompositeOperation='lighter';glow(g,1700,800,520,K.screen,.28*on);g.restore();}
  header(g,'RULE 5');
}});

// SC43/SC44 — extreme close-up of the centre screen above the console.
function consoleECU(g,T,{spill=1,grey=0}={}){
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  shape(g,[[0,870],[1920,850],[1920,1080],[0,1080]],K.cabin,.25);
  box(g,300,120,1320,720,34,'#030405',.25);
  // Console buttons: hazard (red outline triangle) and LOCK ALL (green padlock lit since SC07).
  box(g,700,862,160,62,16,'#0d1017',.3);poly(g,[[780,872],[806,912],[754,912]],alpha(K.red,.85));poly(g,[[780,884],[796,906],[764,906]],'#0d1017');
  box(g,890,862,170,62,16,'#0d1017',.3);
  g.strokeStyle=K.green;g.lineWidth=5;g.beginPath();g.arc(975,886,13,Math.PI,0);g.stroke();rr(g,958,884,34,26,5);g.fillStyle=K.green;g.fill();glow(g,975,894,56,K.green,.35);
  // Coffee in the holder (frame right).
  g.beginPath();g.ellipse(1560,1046,130,44,0,0,Math.PI*2);g.fillStyle='#0b0d13';g.fill();g.strokeStyle=line(.35);g.lineWidth=2;g.stroke();
  g.beginPath();g.ellipse(1560,1040,96,30,0,0,Math.PI*2);g.fillStyle='#16130f';g.fill();g.strokeStyle=line(.55);g.stroke();seg(g,[[1500,1032],[1590,1026]],2,alpha(K.dash,.4));
  if(spill>0){g.save();g.globalCompositeOperation='lighter';glow(g,960,880,760,K.screen,.16*spill);g.restore();}
  if(grey>0){g.fillStyle=alpha('#9ca1a8',.3*grey);g.fillRect(0,840,E.W,240);}
}
registerShot('SC43',{draw(g,t,info){
  const T=rel(info);consoleECU(g,T,{spill:1});
  g.save();g.beginPath();g.rect(330,150,1260,660);g.clip();screenCall(g,330,150,1260,660,T-CALL_ON,info.globalT);g.restore();
  header(g,'RULE 5');
}});
registerShot('SC44',{draw(g,t,info){
  const T=rel(info),st=T<STATIC[1];
  consoleECU(g,T,{spill:st?.6:.35,grey:st?1:0});
  g.save();g.beginPath();g.rect(330,150,1260,660);g.clip();
  if(st)screenStatic(g,330,150,1260,660,T);else screenMap(g,330,150,1260,660,T);
  g.restore();
  header(g,'RULE 5');
}});

// SC45 — wide exterior side view: one tall streetlamp; the car passes through its pool without slowing.
registerShot('SC45',{draw(g,t,info){
  const T=rel(info),v=1100,lx=2480-v*t,lit=clamp(1-Math.abs(lx-980)/420);
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  g.save();const sh=[noise(T*9,2)*1.2,noise(T*9,7)*1.2];g.translate(...sh);
  // Far hills (slow) and a few distant lights.
  g.fillStyle='#0b0e15';g.beginPath();g.moveTo(-20,760);for(let x=-20;x<=1960;x+=60)g.lineTo(x,700+noise((x+t*60)*.004,4)*26);g.lineTo(1960,800);g.lineTo(-20,800);g.closePath();g.fill();
  for(let i=0;i<9;i++){const x=((i*260-t*60)%2200+2200)%2200-140;circle(g,x,688+((i*37)%30),2.2,alpha(K.dash,.35));}
  // Guardrail behind the car, posts sliding back.
  seg(g,[[0,792],[1920,792]],3,line(.35));for(let i=0;i<12;i++){const x=((i*220-t*v*.8)%2640+2640)%2640-240;seg(g,[[x,792],[x,840]],3,line(.25));}
  // The streetlamp: pole, head, a cone of sodium light and the pool it leaves on the road.
  seg(g,[[lx,840],[lx,170],[lx-60,150]],8,'#1a1d24');seg(g,[[lx,840],[lx,170],[lx-60,150]],2,line(.35));
  rr(g,lx-104,138,64,20,8);g.fillStyle='#ffd7a8';g.fill();glow(g,lx-72,152,80,K.sodium,.8);
  g.save();g.globalCompositeOperation='lighter';const cg=g.createLinearGradient(0,160,0,CAR.ground);cg.addColorStop(0,alpha(K.sodium,.22));cg.addColorStop(1,alpha(K.sodium,.06));
  g.fillStyle=cg;g.beginPath();g.moveTo(lx-96,158);g.lineTo(lx-48,158);g.lineTo(lx+330,CAR.ground);g.lineTo(lx-470,CAR.ground);g.closePath();g.fill();
  g.translate(lx-70,CAR.ground+14);g.scale(1,.09);glow(g,0,0,430,K.sodium,.5);g.restore();
  carSide(g,T,{lit,lampX:lx,speed:v});
  // Road: ground line, dark asphalt, lane dashes rushing back.
  seg(g,[[0,CAR.ground],[1920,CAR.ground]],3,line(.4));
  for(let i=0;i<8;i++){const x=((i*300-t*v)%2400+2400)%2400-300;seg(g,[[x,960],[x+120,960]],6,line(.5));}
  g.restore();
  header(g,'RULE 5');
}});
