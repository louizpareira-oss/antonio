// cabin-v1: reusable interior compositions. Each takes global time T for the sodium lamps and an options object.
import {E,text,circle,seg,poly,rr,alpha,clamp,lerp,ease,prog,glow} from '/engine/core.js';
import {K,line,FONT,lamp,limb,hand,head,torso,wheel,mirror,bag,screenMap,screenCall,pointer} from './car.js';
import {withView} from './dash.js';

export const outline=(g,pts,a=.25,w=2)=>{g.strokeStyle=line(a);g.lineWidth=w;g.beginPath();g.moveTo(...pts[0]);for(const p of pts.slice(1))g.lineTo(...p);g.closePath();g.stroke();};
export const shape=(g,pts,fill,a=.25)=>{poly(g,pts,fill);outline(g,pts,a);};
export const box=(g,x,y,w,h,r,fill,a=.25)=>{rr(g,x,y,w,h,r);g.fillStyle=fill;g.fill();g.strokeStyle=line(a);g.lineWidth=2;g.stroke();};
export const keyPt=(t,keys)=>{let p=keys[0][1];for(let i=1;i<keys.length;i++){const [t0,a]=keys[i-1],[t1,b]=keys[i];if(t>=t0){const k=ease.inOut(prog(t,t0,t1));p=[lerp(a[0],b[0],k),lerp(a[1],b[1],k)];}}return p;};
export const breath=T=>.5+.5*Math.sin(T*Math.PI*2/3.6);
const glassLit=(g,pts,k,a=.2)=>{if(k>0)poly(g,pts,alpha(K.sodium,a*k));};
const wash=(g,x,y,r,col,a)=>{if(a<=0)return;g.save();g.globalCompositeOperation='lighter';glow(g,x,y,r,col,a);g.restore();};
export const WARM='#ffc98a',SIGNAL_RED='#ff2a2a',SIGNAL_GREEN='#3be37a';

// Frontal view through the windshield: YOU in the driver's seat (frame right), passenger seat and bag (frame left).
// o: view, face, gaze, blink, eyeScale, sodium, keys[], dome, red, warmR (porch light through the driver window), rHand/rElbow, dent, bag
export function cabinFront(g,T,o={}){
  const L1=o.sodium===false?{k:0,u:0}:lamp(T,o.lampPhase??1.9),sy=lerp(-260,1360,L1.u),dent=o.dent??0,dome=o.dome??0,red=o.red??0,warmR=o.warmR??0;
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  withView(g,o.view||{cx:960,cy:540,z:1},()=>{
    const back=[[760,250],[1210,250],[1250,420],[720,420]],rl=[[1440,200],[1700,150],[1700,470],[1440,430]],rr_=[[480,200],[220,150],[220,470],[480,430]];
    for(const w of [back,rl,rr_]){shape(g,w,K.glass,.2);glassLit(g,w,L1.k*clamp(1-Math.abs(sy-320)/520),.22);}
    box(g,430,400,1120,280,40,'#0c0f15',.18);box(g,560,326,150,96,32,'#0d1017',.22);box(g,1268,326,150,96,32,'#0d1017',.22);
    // Passenger seat: backrest, headrest, cushion; a dent pressed into both when something heavy sits there.
    box(g,250,430,380,700,60,K.panel,.3);box(g,330,288,220,140,44,K.panel,.3);
    shape(g,[[220,870],[660,870],[690,1000],[200,1000]],'#10131b',.3);
    if(dent>0){rr(g,300,540,280,330,90);g.fillStyle=alpha('#020305',.6*dent);g.fill();
      g.beginPath();g.ellipse(440,915,170*dent+30,34*dent+4,0,0,Math.PI*2);g.fillStyle=alpha('#020305',.7*dent);g.fill();
      if(dome>0){g.strokeStyle=alpha(WARM,.8*dome*dent);g.lineWidth=3;g.beginPath();g.ellipse(440,915,170*dent+30,34*dent+4,0,Math.PI*1.05,Math.PI*1.95);g.stroke();
        g.beginPath();g.moveTo(310,560);g.quadraticCurveTo(440,520,570,560);g.stroke();}}
    if((o.bag??'seat')==='seat')bag(g,440,1000,.95);
    box(g,880,390,450,720,60,K.panel,.3);box(g,1000,252,210,140,44,K.panel,.3);
    const keys=[...(o.keys||[])];
    if(dome>0)keys.push({x:1000,y:-120,r:1100,col:WARM,k:dome,a:.42});
    if(red>0)keys.push({x:300,y:-100,r:1700,col:SIGNAL_RED,k:red,a:.38});
    if(warmR>0)keys.push({x:2000,y:420,r:1300,col:WARM,k:warmR,a:.4});
    const L={under:(o.under??.85)*(1-.5*dome),sodium:{k:L1.k,y:sy},keys};
    torso(g,{x:1105,y:532,w:600,h:580,face:o.face??0,breath:breath(T),L:{...L,sodiumA:.14}});
    head(g,{x:1105+(o.face??0)*14,y:395,r:158,face:o.face??0,gaze:o.gaze||[0,.05],blink:o.blink??0,L});
    if(o.eyeScale>1){/* eyes widen: redraw slightly larger dots over the head */
      const rx=158*.86,f=o.face??0,gz=o.gaze||[0,.05],cx=1105+f*14+f*rx*.42+gz[0]*rx*.12,cy=395-158*.06+gz[1]*15.8,sp=rx*.4*(1-Math.abs(f)*.5);
      for(const dx of [-sp/2,sp/2]){g.save();g.translate(cx+dx,cy);g.scale(o.eyeScale,o.eyeScale*1.25);circle(g,0,0,rx*.085,K.white);g.restore();}}
    wheel(g,{x:1105,y:1110,rx:430,ry:430,w:36,a0:Math.PI*1.04,a1:Math.PI*1.96});
    limb(g,[[1360,640],o.lElbow||[1560,900],o.lHand||[1434,836]],46);hand(g,...(o.lHand||[1434,836]),34,.5);
    const H=o.rHand||[776,836];limb(g,[[850,640],o.rElbow||[640,900],H],46);hand(g,H[0],H[1],34,o.rHandRot??-.5);
    shape(g,[[0,0],[1920,0],[1920,70],[0,70]],K.deep,.2);
    shape(g,[[0,0],[200,0],[80,1080],[0,1080]],K.deep,.3);shape(g,[[1920,0],[1720,0],[1840,1080],[1920,1080]],K.deep,.3);
    mirror(g,820,112,{w:300,h:84,tilt:-.16});
    shape(g,[[0,990],[1920,990],[1920,1400],[0,1400]],K.deep,.32);glow(g,1105,996,260,K.dash,.16*(1-.6*dome));
    for(const [x0,x1] of [[300,620],[1300,1560]])seg(g,[[x0,80],[x1,620]],2,alpha(K.white,.04));
  });
  if(L1.k>0){g.save();g.globalCompositeOperation='lighter';const gr=g.createLinearGradient(0,sy-420,0,sy+420);gr.addColorStop(0,alpha(K.sodium,0));gr.addColorStop(.5,alpha(K.sodium,.07*L1.k));gr.addColorStop(1,alpha(K.sodium,0));g.fillStyle=gr;g.fillRect(0,0,E.W,E.H);g.restore();}
  wash(g,960,-200,1300,WARM,.22*dome);wash(g,200,0,1500,SIGNAL_RED,.16*red);wash(g,1950,450,1100,WARM,.18*warmR);
}

// Three-quarter view from the passenger seat: YOU (frame centre), driver window and rear-left window behind, wheel and screen right.
// o: view, screen ('map'|'call'|'off'), on (0..1 call screen brightness), callT, Tg (global time for the waveform), gaze, rHand/rElbow, keys, pin
export const SCR=[[1580,650],[1920,610],[1920,940],[1600,975]];
export function cabin3q(g,T,o={}){
  const Lp=lamp(T,o.lampPhase??.6),lx=lerp(1240,-220,Lp.u),on=o.on??0,scr=o.screen||'map';
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  withView(g,o.view||{cx:960,cy:540,z:1},()=>{
    shape(g,[[-400,0],[2300,0],[2300,120],[-400,160]],K.cabin,.15);
    const dw=[[360,170],[1080,140],[1080,560],[360,590]],rw=[[-400,205],[300,175],[300,600],[-400,640]];
    for(const w of [dw,rw])shape(g,w,K.glass,.25);
    if(Lp.k>0){g.save();g.beginPath();for(const w of [dw,rw]){g.moveTo(...w[0]);for(const p of w.slice(1))g.lineTo(...p);g.closePath();}g.clip();glow(g,lx,260,240,K.sodium,.5*Lp.k);g.restore();}
    box(g,300,150,58,480,10,'#0c0f15',.15);
    shape(g,[[-400,640],[1080,580],[1080,1300],[-400,1300]],'#0d1017',.25);
    rr(g,470,690,130,22,11);g.fillStyle=alpha(K.white,.35);g.fill();
    if(o.pin!==false){rr(g,880,560,22,34-(o.pinDown??1)*12,6);g.fillStyle=alpha(K.white,.5);g.fill();}
    seg(g,[[-400,640],[300,612]],3,line(.3));
    if(o.doorLit>0){g.save();g.beginPath();g.moveTo(-400,640);g.lineTo(1080,580);g.lineTo(1080,1300);g.lineTo(-400,1300);g.clip();glow(g,lx,700,420,K.sodium,.35*o.doorLit*Lp.k);g.restore();}
    shape(g,[[1110,130],[2300,60],[2300,560],[1110,590]],'#090c13',.2);shape(g,[[1080,140],[1130,128],[1130,600],[1080,582]],K.deep,.2);
    shape(g,[[1080,600],[2300,550],[2300,1300],[1080,1300]],K.deep,.3);
    glow(g,1340,650,170,K.dash,.22);circle(g,1318,662,4,K.red);circle(g,1342,664,4,K.red);
    mirror(g,1500,74,{w:250,h:70,tilt:-.22,front:true});
    const L={under:.6,screen:{k:scr==='off'?0:scr==='call'?.2+1.1*on:.2,x:1700,y:760,r:1500},back:{k:Lp.k*clamp(1-Math.abs(lx-500)/700),a:Math.PI},keys:o.keys||[]};
    limb(g,[[900,700],[1060,720],o.lHand||[1218,580]],42);
    torso(g,{x:760,y:611,w:600,h:520,face:.55,breath:breath(T),L});
    head(g,{x:760,y:470,r:160,face:.55,gaze:o.gaze||[.55,.05],blink:o.blink??0,L});
    seg(g,[[1262,770],[1500,700]],40,'#0d0f14');seg(g,[[1262,750],[1500,682]],2,line(.3));
    wheel(g,{x:1250,y:770,rx:84,ry:250,rot:-.08,w:30});
    g.save();g.translate(1256,770);g.rotate(-.08);g.beginPath();g.ellipse(0,0,30,70,0,0,Math.PI*2);g.fillStyle='#0d0f14';g.fill();g.strokeStyle=line(.5);g.lineWidth=2;g.stroke();
    for(const a of [-.35,.35,Math.PI/2])seg(g,[[Math.cos(a)*26,Math.sin(a)*64],[Math.cos(a)*78,Math.sin(a)*238]],14,'#111319');g.restore();
    hand(g,...(o.lHand||[1218,580]),30,-.5);
    const H=o.rHand||[1316,780];limb(g,[[930,740],o.rElbow||[1000,920],H],46);hand(g,H[0],H[1],34,o.rHandRot??-.3);
    g.save();g.beginPath();g.moveTo(...SCR[0]);for(const p of SCR.slice(1))g.lineTo(...p);g.closePath();g.fillStyle='#030405';g.fill();g.clip();
    g.translate(1592,664);g.transform(1,-40/340,22/325,1,0,0);
    if(scr==='map')screenMap(g,0,0,360,300,T,{dim:.6,bar:false});else if(scr==='call')screenCall(g,0,0,360,300,o.callT??0,o.Tg??T,{bars:22,detail:false});
    g.restore();outline(g,SCR,.4,3);
    if(scr==='call'&&on>0){g.save();g.globalCompositeOperation='lighter';glow(g,1700,800,520,K.screen,.28*on);g.restore();}
  });
}

// Profile from the driver's side: YOU faces frame left; the dented passenger seat and the empty passenger window behind.
export function cabinProfile(g,T,o={}){
  const Lp=lamp(T,o.lampPhase??.2),px=lerp(1000,2000,Lp.u);
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  const win=[[1060,150],[1860,130],[1860,560],[1080,580]];shape(g,win,K.glass,.3);
  if(Lp.k>0){g.save();g.beginPath();g.moveTo(...win[0]);for(const p of win.slice(1))g.lineTo(...p);g.closePath();g.clip();glow(g,px,300,300,K.sodium,.55*Lp.k);g.restore();}
  shape(g,[[1060,580],[1920,560],[1920,1080],[1040,1080]],'#0d1017',.25);box(g,1860,120,60,460,8,'#0c0f15',.2);
  // Passenger seat (behind YOU), pressed in.
  shape(g,[[1150,330],[1470,310],[1500,880],[1170,900]],K.panel,.35);box(g,1220,220,220,120,40,K.panel,.35);
  rr(g,1220,420,200,380,70);g.fillStyle=alpha('#020305',.55);g.fill();
  shape(g,[[1000,880],[1560,860],[1600,960],[980,980]],'#10131b',.3);g.beginPath();g.ellipse(1290,915,190,26,0,0,Math.PI*2);g.fillStyle=alpha('#020305',.65);g.fill();
  if(Lp.k>0){g.save();g.globalCompositeOperation='lighter';glow(g,px-300,700,380,K.sodium,.2*Lp.k);g.restore();}
  // Dash and wheel at frame left.
  shape(g,[[0,560],[520,600],[520,1080],[0,1080]],K.deep,.3);glow(g,420,640,200,K.dash,.2);
  const L={under:.7,keys:[{x:px-200,y:300,r:900,col:K.sodium,k:Lp.k*.8,a:.3}],back:{k:Lp.k*.8,a:0}};
  torso(g,{x:780,y:615,w:560,h:520,face:-.8,breath:breath(T),L});
  head(g,{x:760,y:472,r:156,face:-.8,gaze:o.gaze||[-.6,.05],blink:o.blink??0,L});
  wheel(g,{x:420,y:760,rx:70,ry:250,rot:.1,w:30});limb(g,[[700,720],[600,880],[452,800]],46);hand(g,452,800,34,.3);
}

// Side cross-section of the car (house-cutaway style): driver in front, the rear-left seat dented behind.
export function cutaway(g,T,o={}){
  const u=prog(o.t??0,o.lampAt??.6,(o.lampAt??.6)+1.1),k=u>0&&u<1?Math.sin(Math.PI*u):0,x=lerp(1700,250,u);
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  const body=[[220,820],[220,640],[300,600],[420,600],[600,330],[1360,330],[1540,600],[1700,640],[1720,700],[1720,820]];
  shape(g,body,'#090b10',.8);seg(g,[[0,900],[1920,900]],3,line(.35));
  for(const wx of [470,1480]){circle(g,wx,830,74,'#030405');g.strokeStyle=line(.8);g.lineWidth=3;g.beginPath();g.arc(wx,830,74,0,Math.PI*2);g.stroke();}
  // Seats in section: rear bench (left), driver's seat (right); wheel and dash at the nose.
  shape(g,[[560,520],[620,520],[640,760],[560,760]],K.panel,.45);shape(g,[[560,700],[860,700],[860,760],[560,760]],K.panel,.45);
  shape(g,[[980,500],[1040,500],[1060,760],[980,760]],K.panel,.45);shape(g,[[980,700],[1240,700],[1240,760],[980,760]],K.panel,.45);
  shape(g,[[1380,560],[1560,610],[1560,700],[1380,700]],K.deep,.45);wheel(g,{x:1330,y:560,rx:18,ry:70,rot:-.45,w:14});
  const dent=k>.05;if(dent){g.beginPath();g.ellipse(720,704,110,14,0,0,Math.PI*2);g.fillStyle=alpha('#020305',.95);g.fill();seg(g,[[610,700],[830,700]],3,alpha(K.sodium,.8*k));}
  else seg(g,[[560,700],[860,700]],2,line(.45));
  torso(g,{x:1110,y:520,w:170,h:200,face:.9,breath:0,L:{under:.5}});head(g,{x:1118,y:460,r:48,face:.9,gaze:[.6,0],L:{under:.5}});
  limb(g,[[1150,560],[1240,620],[1320,580]],16);hand(g,1320,580,12,0);
  if(k>0){g.save();g.beginPath();g.moveTo(...body[0]);for(const p of body.slice(1))g.lineTo(...p);g.closePath();g.clip();g.globalCompositeOperation='lighter';
    const gr=g.createLinearGradient(x-280,0,x+280,0);gr.addColorStop(0,alpha(K.sodium,0));gr.addColorStop(.5,alpha(K.sodium,.32*k));gr.addColorStop(1,alpha(K.sodium,0));g.fillStyle=gr;g.fillRect(200,300,1540,560);g.restore();}
  outline(g,body,.85,4);
}

// Passenger seat seen from the driver's side. o: light ('canopy'|'night'|'dome'), dent, tip (bag 0 seat -> 1 footwell), belt 0..1, pab 0/1, place (bag being set down 0..1)
export function passengerSeat(g,T,o={}){
  const Lp=lamp(T,o.lampPhase??1.1),d=o.dent??0,tip=ease.inOut(o.tip??0),lt=o.light||'night';
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  withView(g,o.view||{cx:960,cy:540,z:1},()=>{
    const win=[[1180,60],[1960,40],[1960,520],[1200,540]];shape(g,win,K.glass,.3);
    if(lt==='night'&&Lp.k>0){g.save();g.beginPath();g.moveTo(...win[0]);for(const p of win.slice(1))g.lineTo(...p);g.closePath();g.clip();glow(g,lerp(1100,2100,Lp.u),280,300,K.sodium,.55*Lp.k);g.restore();}
    if(lt==='canopy'){g.save();g.beginPath();g.moveTo(...win[0]);for(const p of win.slice(1))g.lineTo(...p);g.closePath();g.clip();g.fillStyle=alpha(K.dash,.12);g.fillRect(1100,0,900,600);g.restore();}
    shape(g,[[1180,540],[1960,520],[1960,1200],[1160,1200]],'#0d1017',.25);
    shape(g,[[-200,700],[700,760],[680,1200],[-200,1200]],'#0b0d13',.25);
    rr(g,676,770,48,82,10);g.fillStyle='#14171e';g.fill();g.strokeStyle=line(.5);g.lineWidth=2;g.stroke();rr(g,686,782,28,18,4);g.fillStyle=alpha(K.red,.85);g.fill();
    const sag=34*d;
    g.beginPath();g.moveTo(700,770);g.quadraticCurveTo(1090,760+sag*2,1470,745);g.lineTo(1520,900);g.lineTo(660,930);g.closePath();g.fillStyle='#121620';g.fill();g.strokeStyle=line(.6);g.lineWidth=3;g.stroke();
    shape(g,[[1010,170],[1380,150],[1460,770],[1040,790]],'#11141c',.6);box(g,1110,40,260,120,40,'#11141c',.6);
    seg(g,[[1040,780],[1460,762]],3,alpha(K.dash,.35));
    if(d>0){rr(g,1110,330,230,380,80);g.fillStyle=alpha('#020305',.5*d);g.fill();g.beginPath();g.ellipse(1090,808,230*d+20,30*d+4,0,0,Math.PI*2);g.fillStyle=alpha('#020305',.7*d);g.fill();}
    // The belt: retracted along the pillar, or paid out across the seat to the buckle.
    const path=[[1900,140],[1320,330],[920,640],[712,792]],bp=o.belt??0;
    if(bp<=0)seg(g,[[1905,120],[1905,560]],26,'#1b1f27');
    else{let rem=bp*3;const pts=[path[0]];for(let i=1;i<path.length&&rem>0;i++){const k=Math.min(1,rem);pts.push([lerp(path[i-1][0],path[i][0],k),lerp(path[i-1][1],path[i][1],k)]);rem-=1;}
      seg(g,pts,26,'#1b1f27');seg(g,pts,2,line(.45));const e=pts[pts.length-1];rr(g,e[0]-16,e[1]-12,32,24,5);g.fillStyle=alpha(K.white,.75);g.fill();}
    // The bag: set down (place), then tipped into the footwell.
    const pl=o.place??1;
    if(pl>0||tip>0){const bx=lerp(1120,1400,tip),by=lerp(770,1010,tip)+(1-ease.out(pl))*-90+sag*.6*(1-tip);g.save();g.translate(bx,by);g.rotate(1.45*tip);bag(g,0,0,.9);g.restore();}
    if(o.hand){const [hx,hy]=o.hand;limb(g,[[-120,400],[300,560],[hx,hy]],60);hand(g,hx,hy,42,.3);}
    // Passenger-airbag lamp at the top edge (overhead console).
    rr(g,640,-30,580,120,18);g.fillStyle='#07080c';g.fill();g.strokeStyle=line(.4);g.lineWidth=2;g.stroke();
    text(g,'PASSENGER AIRBAG',676,30,{size:28,font:FONT,weight:800,color:alpha(K.white,.5),align:'left'});
    const on=(o.pab??0)>.5;text(g,'ON',1010,30,{size:32,font:FONT,weight:800,color:on?K.amber:alpha(K.white,.16),align:'left'});text(g,'OFF',1080,30,{size:32,font:FONT,weight:800,color:on?alpha(K.white,.16):K.amber,align:'left'});
  });
  if(lt==='canopy')wash(g,900,-300,1300,K.dash,.16);
  if(lt==='dome')wash(g,1000,-300,1400,WARM,.3);
  if(lt==='night'&&Lp.k>0)wash(g,lerp(500,1700,Lp.u),400,700,K.sodium,.12*Lp.k);
  wash(g,200,1080,600,K.dash,.08);
}

// Rear-view mirror close-up. o: tilt ('down'|'up'|'normal'), k (0..1 blend from down to normal for SC13), fingers, light ('canopy'|'night')
export function mirrorECU(g,T,o={}){
  const Lp=lamp(T,o.lampPhase??.8),lt=o.light||'night';
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  shape(g,[[0,0],[1920,0],[1920,140],[0,180]],K.cabin,.2);
  if(lt==='canopy')wash(g,960,-200,1200,K.dash,.14);
  seg(g,[[960,0],[960,320]],26,'#0b0d12');seg(g,[[960,0],[960,320]],2,line(.3));
  const ang=o.tilt==='up'?-.07:o.tilt==='down'?.07:0;
  g.save();g.translate(960,540);g.rotate(ang*(o.tilt==='down'?1-(o.k??0):1));
  rr(g,-620,-230,1240,460,170);g.fillStyle='#0b0d12';g.fill();g.strokeStyle=line(.6);g.lineWidth=4;g.stroke();
  rr(g,-584,-196,1168,392,140);g.save();g.clip();
  const show=o.tilt==='up'?'roof':o.tilt==='down'&&(o.k??0)<.5?'seat':'window';
  if(show==='roof'){g.fillStyle='#14171e';g.fillRect(-600,-220,1200,440);for(let i=-3;i<=3;i++)seg(g,[[i*170,-220],[i*170+40,220]],2,line(.12));rr(g,-120,-60,240,90,26);g.strokeStyle=line(.25);g.lineWidth=2;g.stroke();
    if(lt==='night'&&Lp.k>0)wash(g,lerp(-700,700,Lp.u),0,420,K.sodium,.35*Lp.k);}
  if(show==='seat'){g.fillStyle='#0d1017';g.fillRect(-600,-220,1200,440);
    // Rear bench reflected: the rear-left cushion (left) pressed in, nothing on it.
    for(const [x,w] of [[-520,470],[-30,470]]){rr(g,x,-60,w,250,40);g.fillStyle='#161a22';g.fill();g.strokeStyle=line(.35);g.lineWidth=2;g.stroke();}
    g.beginPath();g.ellipse(-285,40,170,46,0,0,Math.PI*2);g.fillStyle=alpha('#020305',.85);g.fill();g.strokeStyle=alpha(K.white,.25);g.lineWidth=2;g.beginPath();g.ellipse(-285,40,170,46,0,Math.PI*1.1,Math.PI*1.9);g.stroke();
    rr(g,-520,-200,980,120,40);g.fillStyle='#10131a';g.fill();}
  if(show==='window'){g.fillStyle='#0d1017';g.fillRect(-600,-220,1200,440);shape(g,[[-420,-170],[420,-170],[480,90],[-480,90]],'#1c2433',.4);
    if(lt==='canopy'){g.fillStyle=alpha(K.dash,.35);g.fillRect(-420,-170,840,90);}}
  const gl=g.createLinearGradient(-600,-220,600,220);gl.addColorStop(0,alpha(K.white,.08));gl.addColorStop(.5,alpha(K.white,0));gl.addColorStop(1,alpha(K.white,.05));g.fillStyle=gl;g.fillRect(-600,-220,1200,440);
  g.restore();g.restore();
  if(o.fingers){const k=o.fingers;limb(g,[[160,1180],[230,900],[396,722-30*k]],56);rr(g,360,688-30*k,92,72,30);g.fillStyle=K.white;g.fill();seg(g,[[372,716-30*k],[440,716-30*k]],3,alpha(K.head,.35));}
  if(o.handNear){const [hx,hy]=o.handNear;limb(g,[[1700,1200],[1600,980],[hx,hy]],56);hand(g,hx,hy,40,-.6);}
}

// Footwell: brake (left) and gas (right) pedals, YOU's right foot. o: foot ('gas'|'lift'|'hover'|'brake'), k blend, red
export function footwell(g,T,o={}){
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  shape(g,[[-20,820],[1940,770],[1940,1100],[-20,1100]],'#0b0d13',.3);
  for(let i=0;i<9;i++)seg(g,[[200+i*190,800-i*4],[160+i*190,1080]],2,line(.06));
  seg(g,[[760,-20],[780,420]],22,'#14171e');g.save();g.translate(780,500);g.rotate(-.08+(o.press??0)*.06);rr(g,-140,-70,280,140,24);g.fillStyle='#1a1e27';g.fill();g.strokeStyle=line(.55);g.lineWidth=3;g.stroke();
  for(let i=-2;i<=2;i++)seg(g,[[-110,i*22],[110,i*22]],2,line(.15));g.restore();
  seg(g,[[1250,-20],[1250,330]],18,'#14171e');rr(g,1190,330,120,330,30);g.fillStyle='#1a1e27';g.fill();g.strokeStyle=line(.55);g.lineWidth=3;g.stroke();
  glow(g,980,240,500,K.dash,.08);
  // Foot: heel planted on the mat, toe on the gas, lifted, swung over the brake, or pressing it.
  const heel=[1180,930],ang={gas:-1.47,lift:-1.38,hover:-2.0,brake:-2.06};
  const a0=ang[o.from||'gas'],a1=ang[o.foot||'gas'],a=lerp(a0,a1,ease.inOut(o.k??1)),len=o.foot==='brake'||o.foot==='hover'?440:420;
  const toe=[heel[0]+Math.cos(a)*len,heel[1]+Math.sin(a)*len];
  limb(g,[[1700,1240],[heel[0]+40,heel[1]+10]],150);seg(g,[heel,toe],110,K.white);circle(g,heel[0],heel[1],62,K.white);
  seg(g,[[heel[0]+Math.cos(a)*120,heel[1]+Math.sin(a)*120],[toe[0]-Math.cos(a)*40,toe[1]-Math.sin(a)*40]],3,alpha(K.head,.25));
  if(o.red>0)wash(g,600,-200,1500,SIGNAL_RED,.18*o.red);
}

// Gear selector: P R N D gate with the knob at a position (0 = P … 3 = D); YOU's hand on the knob.
export function gearSel(g,T,o={}){
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  shape(g,[[300,-20],[1620,-20],[1720,1100],[200,1100]],'#0b0d13',.3);
  rr(g,880,240,80,560,40);g.fillStyle='#05060a';g.fill();g.strokeStyle=line(.4);g.lineWidth=2;g.stroke();
  const ys=[300,430,560,690],pos=o.pos??3;['P','R','N','D'].forEach((c,i)=>text(g,c,1040,ys[i],{size:34,font:FONT,weight:800,color:Math.round(pos)===i?K.white:alpha(K.white,.3)}));
  const ky=lerp(ys[0],ys[3],pos/3);seg(g,[[920,ky+40],[920,ky-10]],30,'#14171e');rr(g,840,ky-120,160,140,60);g.fillStyle='#181c25';g.fill();g.strokeStyle=line(.55);g.lineWidth=3;g.stroke();
  limb(g,[[1700,1200],[1400,820],[1000,ky-70]],70);rr(g,850,ky-150,190,110,50);g.fillStyle=K.white;g.fill();
  seg(g,[[880,ky-100],[1010,ky-100]],3,alpha(K.head,.3));circle(g,1010,ky-40+(o.thumb??0)*4,24,K.white);
  if(o.red>0)wash(g,500,-200,1500,SIGNAL_RED,.2*o.red);
  if(o.warm>0)wash(g,960,-300,1400,WARM,.22*o.warm);
  glow(g,960,40,400,K.dash,.08);
}

// Centre console: the LOCK ALL button and the coffee in its holder. o: press 0..1, lit (green padlock), finger
export function lockAll(g,T,o={}){
  const Lp=lamp(T,o.lampPhase??.3);
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  shape(g,[[-20,-20],[1940,-20],[1940,1100],[-20,1100]],'#0b0d13',.0);
  rr(g,560,380,620,330,40);g.fillStyle='#0d1017';g.fill();g.strokeStyle=line(.3);g.lineWidth=2;g.stroke();
  const pr=o.press??0;rr(g,640,440+pr*8,460,210,30);g.fillStyle='#151922';g.fill();g.strokeStyle=line(.6);g.lineWidth=3;g.stroke();
  const lit=o.lit??0,col=lit>0?K.green:alpha(K.white,.55);
  g.strokeStyle=col;g.lineWidth=10;g.beginPath();g.arc(870,520+pr*8,34,Math.PI,0);g.stroke();rr(g,826,516+pr*8,88,66,10);g.fillStyle=col;g.fill();
  if(lit>0)wash(g,870,550,160,K.green,.4*lit);
  text(g,'LOCK ALL',870,620+pr*8,{size:30,font:FONT,weight:800,color:alpha(K.white,.55)});
  circle(g,1500,620,190,'#090b10');g.strokeStyle=line(.35);g.lineWidth=3;g.beginPath();g.arc(1500,620,190,0,Math.PI*2);g.stroke();
  circle(g,1500,620,150,'#17140f');g.strokeStyle=line(.55);g.beginPath();g.arc(1500,620,150,0,Math.PI*2);g.stroke();
  rr(g,1440,600,120,22,11);g.fillStyle='#0b0907';g.fill();seg(g,[[1400,570],[1580,560]],3,alpha(K.dash,.35));
  if(o.finger)pointer(g,o.finger,-2.3);
  glow(g,960,1100,700,K.dash,.08);
  if(Lp.k>0)wash(g,lerp(-200,2100,Lp.u),300,600,K.sodium,.12*Lp.k);
}
