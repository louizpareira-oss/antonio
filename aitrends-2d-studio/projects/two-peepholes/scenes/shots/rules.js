// Two Peepholes, rules 2-4. Beats use global word times (timeline/words.json): T = info.globalT; local t = T - shot start.
import {E,registerShot,ease,prog,lerp,clamp,text,circle,ring,seg,rr,poly,alpha} from '/engine/core.js';
import * as P from '/engine/pictogram2d.js';
import {C,CASE,ENTRY,SIT,SIT_RECOIL,DOOR_FILL,WARM,FACE,entry,lens,headOf,aim,sightLine,cones,blindSpot,lensAt,pictureEye,
  doorFace,tapeFace,arm,beam,withCam,hypo,presence} from '../sets/entry.js';
const S=ENTRY.s,NIGHT='#3a4352';
function base(g,globalT,step,status='',statusColor=C.red){P.background(g,globalT);P.hud(g,globalT,{title:CASE,step,count:4,status,statusColor});}
const person=(g,o)=>P.human(g,{y:ENTRY.floorY,s:S,look:1,...o});
const AFTER_S07=P.poseBetween('stand','recoil',.35);
const keyPt=(t,keys)=>{let p=keys[0][1];for(let i=1;i<keys.length;i++){const [t0,a]=keys[i-1],[t1,b]=keys[i];if(t>=t0){const k=ease.inOut(prog(t,t0,t1));p=[lerp(a[0],b[0],k),lerp(a[1],b[1],k)];}}return p;};
const sitting=(g,x=ENTRY.sitX,pose=SIT)=>{person(g,{x,facing:-1,pose});return headOf(x,pose,{facing:-1});};
const beamTo=(g,from,to,o={})=>beam(g,from,Math.atan2(to[1]-from[1],from[0]-to[0]),{len:Math.hypot(to[0]-from[0],to[1]-from[1]),...o});
// Seated variants: back pressed flat; near hand braced on the floor; head tucked under a passing beam.
const FLAT={...SIT,head:[-2,-182],neck:[-2,-138]};
const BRACE={...FLAT,ra:[[12,-124],[30,-70],[46,-12]]};
const TUCK={...BRACE,head:[6,-166],neck:[2,-130],la:[[-10,-118],[12,-90],[40,-94]]};
const CLOSE={fx:1320,fy:661,z:2};

const card=(n,title)=>({draw(g,t,info){base(g,info.globalT,n);P.ruleTitle(g,t,{number:n,total:4,title});}});
registerShot('s08',card(2,'SIT AGAINST THE DOOR'));
registerShot('s12',card(3,"DON'T COVER THEM"));
registerShot('s17',card(4,'WAIT FOR THE LIGHT'));

// s09a — insert: both lenses dark ("dark" 27.0).
registerShot('s09a',{draw(g,t,info){
  base(g,info.globalT,2,'BOTH DARK',C.red);
  doorFace(g,t,info.dur,{oldLit:0},gg=>{if(info.globalT>27.0){const k=prog(info.globalT,27.0,27.5);for(const y of [FACE.newY,FACE.oldY])ring(gg,FACE.cx,y,104+20*ease.out(k),4,alpha(C.red,.9-.5*k));}});
}});

// s09 — walk to the door ("sit" 27.8), turn, slide down (29.1-29.8). The red lock breaks below 41 degrees.
registerShot('s09',{draw(g,t,info){
  const T=info.globalT;
  base(g,T,2,T<29.88?'WATCHED':'BOTH DARK',C.red);
  entry(g,T,{newHole:1,oldLight:0});
  const walk=ease.inOut(prog(T,27.8,29.0)),turned=T>=29.02,down=ease.inOut(prog(T,29.1,29.8));
  const x=lerp(1060,ENTRY.sitX,walk);
  const pose=turned?P.poseBetween('stand',SIT,down):P.poseBetween(AFTER_S07,'stand',walk);
  person(g,{x,facing:turned?-1:1,pose,walk:walk>0&&walk<1?.8:0,phase:T*8});
  const from=lensAt(ENTRY.newY),hit=aim(from,headOf(x,pose,{facing:turned?-1:1}));
  if(hit.locked)sightLine(g,from,hit.pt,{color:C.red,width:7,t});
  else sightLine(g,from,hit.pt,{color:C.yellow,t,a:.85-.45*prog(T,29.2,31.4)});
}});

// s09c — insert: the new lens searching ("everything" 32.52).
registerShot('s09c',{draw(g,t,info){
  base(g,info.globalT,2,'LOOKING',C.red);
  const z=1+.05*ease.inOut(t/info.dur),cx=960,cy=440;
  g.save();g.translate(cx,cy);g.scale(z,z);g.translate(-cx,-cy);g.fillStyle=DOOR_FILL;g.fillRect(-60,-60,E.W+120,E.H+120);
  const look=keyPt(t,[[0,[0,0]],[.25,[-1.1,0]],[.85,[-1.1,0]],[1.05,[1.1,.25]],[1.6,[1.1,.25]],[1.8,[-.4,.7]],[2.3,[-.4,.7]]]);
  lens(g,cx,cy,250,{brass:true,eye:1,look});g.restore();
}});

// s10 — the one diagram: view cones on "one way" (1.36), tilt "a little down" (2.4-3.6), blind spot (4.4 / 6.56).
registerShot('s10',{draw(g,t,info){
  base(g,info.globalT,2,'BOTH DARK',C.red);
  entry(g,t,{newHole:1,oldLight:0});
  cones(g,{k:ease.out(prog(t,1.2,1.6)),low:lerp(18,41,ease.inOut(prog(t,2.4,3.6)))});
  blindSpot(g,{k:ease.out(prog(t,4.4,5.0)),label:ease.out(prog(t,6.5,6.8))});
  const head=sitting(g);
  if(t>6.56)P.mark(g,head[0]-70,head[1]-70,{ok:true,size:26});
}});

// s11a — medium close: back pressed flat ("Back flat" 43.0), hand braced on the floor ("Don't get up" 44.68).
registerShot('s11a',{draw(g,t,info){
  const T=info.globalT;
  base(g,T,2,T<44.68?'BOTH DARK':'02:47 AM',T<44.68?C.red:NIGHT);
  withCam(g,CLOSE,()=>{
    entry(g,T,{newHole:1,oldLight:0});
    const flat=ease.inOut(prog(T,43.0,43.6)),brace=ease.inOut(prog(T,44.7,45.1));
    sitting(g,ENTRY.sitX+3*flat,P.poseBetween(P.poseBetween(SIT,FLAT,flat),BRACE,brace));
    if(T>43.6){const a=ease.out(prog(T,43.6,43.9))*(1-prog(T,44.6,45.2)*.6);for(const y of [668,712])seg(g,[[ENTRY.wallX-4,y],[ENTRY.wallX-20,y]],3,alpha(C.white,.7*a));}
    if(T>45.1){const k=prog(T,45.1,45.6),hx=ENTRY.sitX+3-46*S;for(const d of [-1,1])seg(g,[[hx+d*20,ENTRY.floorY-4],[hx+d*(26+12*k),ENTRY.floorY-10-4*k]],3,alpha(C.white,.7*(1-k)));}
  });
}});

// s11 — wide search beam from the new hole: table (47.96), picture (49.0), the old light spot (50.12). It never reaches the door.
registerShot('s11',{draw(g,t,info){
  base(g,info.globalT,2,'02:47 AM',NIGHT);
  const glow=(t0)=>t>t0?Math.max(0,1-(t-t0)/1.1):0;
  const hl=t>3.0?{name:'picture',k:glow(2.75)}:{name:'table',k:glow(1.71)};
  entry(g,t,{newHole:1,oldLight:0,highlight:hl});
  sitting(g,ENTRY.sitX+3,BRACE);
  if(t>3.75){const k=ease.out(prog(t,3.75,4.1));g.save();g.setLineDash([6,10]);g.strokeStyle=alpha(WARM,.6*k);g.lineWidth=4;g.beginPath();g.ellipse(ENTRY.spotX,ENTRY.floorY-2,84,10,0,0,Math.PI*2);g.stroke();g.restore();}
  const from=lensAt(ENTRY.newY),grow=ease.out(prog(t,.11,.65));
  const table=[430,686],pic=[420,467],spot=[ENTRY.spotX,ENTRY.floorY-6],idle=[from[0]-520,from[1]+160];
  const end=keyPt(t,[[.11,idle],[1.25,idle],[1.71,table],[2.3,table],[2.75,pic],[3.4,pic],[3.87,spot],[5.65,spot]]);
  if(grow>0)beamTo(g,from,[lerp(from[0],end[0],grow),lerp(from[1],end[1],grow)],{color:C.yellow,t,spread:.03});
}});

// s11c — medium close: "Let it look" (52.2). A beam from the old hole sweeps down to its limit and grazes past the tucked head.
registerShot('s11c',{draw(g,t,info){
  base(g,info.globalT,2,'02:47 AM',NIGHT);
  const sweep=ease.inOut(prog(t,.3,1.0))-ease.inOut(prog(t,1.55,2.0)),a=(12+29*sweep)*Math.PI/180;
  withCam(g,CLOSE,()=>{
    entry(g,info.globalT,{newHole:1,oldLight:0});
    sitting(g,ENTRY.sitX+3,P.poseBetween(BRACE,TUCK,ease.inOut(prog(t,.5,.8))));
    beam(g,lensAt(ENTRY.oldY),a,{len:Math.min(620,(ENTRY.floorY-4-ENTRY.oldY)/Math.sin(a+.035)),spread:.035,color:C.red,t,k:ease.out(prog(t,0,.2))});
  });
}});

// s13a — the hypothetical begins: banner + dashed frame; stand up to tape the holes.
registerShot('s13a',{draw(g,t,info){
  base(g,info.globalT,3);
  entry(g,t,{newHole:1,oldLight:0});
  person(g,{x:ENTRY.sitX,facing:-1,pose:P.poseBetween(SIT,'stand',ease.inOut(prog(t,.05,.6)))});
  hypo(g,ease.out(prog(t,0,.25)));
}});

// s13b — insert: a hand presses opaque tape over the old lens (contact .32) and then the new lens (contact 1.12). Both stay.
registerShot('s13b',{draw(g,t,info){
  base(g,info.globalT,3);
  const grip=[150,25];
  // Each strip enters from its own side so the second never crosses the first.
  const one=(t0,target,rot,off,root)=>{
    const contact=t0+.32,inK=ease.out(prog(t,t0,contact)),outK=ease.in(prog(t,contact+.13,contact+.4));
    const hand=t<contact?[lerp(off[0],target[0]+grip[0],inK),lerp(off[1],target[1]+grip[1],inK)]:[lerp(target[0]+grip[0],off[0],outK),lerp(target[1]+grip[1],off[1],outK)];
    const tc=t<contact?[hand[0]-grip[0],hand[1]-grip[1]]:target,squash=t>=contact?Math.max(0,1-(t-contact)/.12):0;
    return {hand,tc,squash,rot,root,show:t>=t0,armOn:t>=t0&&outK<1};
  };
  const a=one(0,[FACE.cx,FACE.oldY],-.12,[1760,1200],[2100,1300]),b=one(.8,[FACE.cx,FACE.newY],.08,[2080,330],[2300,620]);
  doorFace(g,t,info.dur,{oldLit:0},gg=>{
    for(const s of [a,b])if(s.show)tapeFace(gg,s.tc[0],s.tc[1],{w:330,h:236,rot:s.rot,squash:s.squash});
    for(const s of [a,b])if(s.armOn)arm(gg,s.root,s.hand);
  });
  hypo(g,1);
}});

// s13 — back in the room with both holes taped: sit down ("It isn't" 59.39); pressure behind the tape ("looking" 62.24); the picture shakes ("closer" 63.8).
registerShot('s13',{draw(g,t,info){
  base(g,info.globalT,3);
  const bulge=Math.max(0,Math.sin(prog(t,2.8,3.5)*Math.PI));
  entry(g,t,{newHole:1,oldLight:0,tapeOld:1,tapeNew:1,pictureShake:ease.in(prog(t,4.1,5.6))});
  if(bulge>0)ring(g,ENTRY.wallX-12,ENTRY.newY,34+12*bulge,4,alpha(C.red,.7*bulge));
  const turned=t>=.05,x=lerp(ENTRY.tapeX,ENTRY.sitX,ease.inOut(prog(t,.05,.4)));
  const pose=t<.4?'stand':P.poseBetween('stand',SIT,ease.inOut(prog(t,.4,1.0)));
  person(g,{x,facing:turned?-1:1,pose,walk:t>.05&&t<.4?.6:0,phase:t*8});
  hypo(g,1);
}});

// s14 — picture insert. "does" (5.37): a brass eye punches through the picture.
registerShot('s14',{draw(g,t,info){
  base(g,info.globalT,3);
  const z=1+.05*ease.inOut(t/info.dur),cx=960,cy=440;
  g.save();g.translate(cx,cy);g.scale(z,z);g.translate(-cx,-cy);
  const w=520,h=650,x0=cx-w/2,y0=cy-h/2;
  rr(g,x0,y0,w,h,6);g.strokeStyle=alpha(C.white,.85);g.lineWidth=10;g.stroke();
  g.strokeStyle=alpha(C.white,.35);g.lineWidth=4;g.strokeRect(x0+40,y0+40,w-80,h-80);
  seg(g,[[cx-194,cy+145],[cx,cy-31],[cx+114,cy+66],[cx+194,cy+13]],12,alpha(C.white,.45));
  g.strokeStyle=alpha(C.white,.45);g.lineWidth=6;g.beginPath();g.arc(cx+110,cy-150,30,0,Math.PI*2);g.stroke();
  const k=prog(t,5.37,5.62);if(k>0)pictureEye(g,cx,cy,92,k);
  g.restore();
  if(t>5.37){const q=prog(t,5.37,6.1);ring(g,cx,cy,100+60*ease.out(q),6*(1-q)+1,alpha(C.red,1-q));}
  hypo(g,1);
}});

// s15 — the picture eye sees into the blind spot: line on "see" (1.2), lock on "exactly" (1.44), flinch on "sitting" (2.43).
const pictureLine=(g,t,head)=>{const from=[420,467],grow=ease.out(prog(t,.9,1.3));
  if(grow>0)sightLine(g,from,[lerp(from[0],head[0],grow),lerp(from[1],head[1],grow)],{color:C.red,width:6,t});
  if(t>1.44)ring(g,head[0],head[1],40+4*Math.sin(t*6),3,alpha(C.red,.85));};
registerShot('s15',{draw(g,t,info){
  base(g,info.globalT,3);
  entry(g,t,{newHole:1,oldLight:0,tapeOld:1,tapeNew:1,pictureHole:1});
  const flinch=t>2.43?Math.exp(-(t-2.43)*5)*.6:0;
  const head=sitting(g,ENTRY.sitX,P.poseBetween(SIT,{...SIT,head:[-8,-182],neck:[-6,-138]},flinch));
  pictureLine(g,t,head);
  hypo(g,1);
}});

// s16 — back to reality: a wipe from the door to the left erases the tape, the picture eye and the frame (0.03-0.75). Check on "safer" (1.46).
registerShot('s16',{draw(g,t,info){
  const wx=lerp(E.W+40,-60,ease.inOut(prog(t,.03,.75)));
  base(g,info.globalT,3,wx<E.W/2?'02:47 AM':'',NIGHT);
  entry(g,t,{newHole:1,oldLight:0});
  // Left of the wipe is still the hypothetical frame: redraw it whole (background first, so nothing doubles).
  g.save();g.beginPath();g.rect(0,0,Math.max(0,wx),E.H);g.clip();P.background(g,info.globalT);
  entry(g,t,{newHole:1,oldLight:0,tapeOld:1,tapeNew:1,pictureHole:1});
  g.restore();
  const head=sitting(g);
  g.save();g.beginPath();g.rect(0,0,Math.max(0,wx),E.H);g.clip();pictureLine(g,t+3.2,head);hypo(g,1);g.restore();
  if(wx>-50&&wx<E.W){g.save();g.shadowBlur=26;g.shadowColor=C.white;seg(g,[[wx,0],[wx,E.H]],6,alpha(C.white,.75));g.restore();}
  if(t>1.46)P.mark(g,ENTRY.wallX-70,(ENTRY.newY+ENTRY.oldY)/2,{ok:true,size:30});
}});

// s18a — insert: the old lens fills with hallway light again ("old one" 84.28).
registerShot('s18a',{draw(g,t,info){
  const T=info.globalT;
  base(g,T,4,'04:51 AM',NIGHT);
  doorFace(g,t,info.dur,{oldLit:ease.out(prog(T,84.2,84.7)),rays:T>84.25?ease.out(prog(T,84.25,84.8)):0});
}});

// s18b — wide: the beam draws down to the floor and the spot returns to its old place ("floor" 86.04); pulse on "always" (87.08).
registerShot('s18b',{draw(g,t,info){
  const T=info.globalT;
  base(g,T,4,'04:51 AM',NIGHT);
  entry(g,T,{newHole:1,oldLight:1,beamGrow:ease.inOut(prog(T,85.25,85.9)),spotPulse:T>87.08?prog(T,87.08,87.9):-1});
  sitting(g,ENTRY.sitX+3,BRACE);
}});

// s18c — insert: the brass lens closes up and the door surface heals over it ("gone" 89.08).
registerShot('s18c',{draw(g,t,info){
  const T=info.globalT,k=ease.in(prog(T,89.0,89.45));
  base(g,T,4,T<89.5?'04:51 AM':'ONE PEEPHOLE',T<89.5?NIGHT:C.green);
  doorFace(g,t,info.dur,{oldLit:1,rays:1,newScale:1-k},gg=>{
    if(T>89.3){const q=prog(T,89.3,90.0);ring(gg,FACE.cx,FACE.newY,30+60*(1-q),3,alpha(C.white,.35*(1-q)));}
  });
}});

// s18 — wide: one peephole, the light where it always was; lean toward it on "Before you get up" (92.36).
registerShot('s18',{draw(g,t,info){
  const T=info.globalT;
  base(g,T,4,'ONE PEEPHOLE',C.green);
  entry(g,T,{newHole:0,oldLight:1});
  sitting(g,ENTRY.sitX,P.poseBetween(BRACE,{...SIT,head:[22,-172],neck:[10,-134]},ease.inOut(prog(T,92.36,93.0))));
}});

// s19 — top-down insert of the floor spot. Check on "only" (1.62); feet and body shadow in the light on "standing" (5.18); a foot steps (6.6).
registerShot('s19',{draw(g,t,info){
  const occ=ease.out(prog(t,5.18,5.7));
  base(g,info.globalT,4,occ>0?'NOT ONLY LIGHT':'',C.red);
  g.fillStyle='#10151e';g.fillRect(0,0,E.W,E.H);
  for(let y=60;y<E.H;y+=92){seg(g,[[0,y],[E.W,y]],2,alpha(C.white,.06));for(let x=((y/92)%2)*260;x<E.W;x+=520)seg(g,[[x,y],[x,y+92]],2,alpha(C.white,.05));}
  const cx=860,cy=440,rx=390,ry=205;
  rr(g,1700,-20,48,E.H+40,4);g.fillStyle=DOOR_FILL;g.fill();g.strokeStyle=alpha(C.white,.7);g.lineWidth=4;g.stroke();
  const bm=g.createLinearGradient(1700,0,cx,0);bm.addColorStop(0,alpha(WARM,.12));bm.addColorStop(1,alpha(WARM,.02));poly(g,[[1700,410],[1700,450],[cx,cy+ry*.9],[cx,cy-ry*.9]],bm);
  g.save();const sp=g.createRadialGradient(cx,cy,10,cx,cy,rx);sp.addColorStop(0,alpha('#fff3cf',.95));sp.addColorStop(.7,alpha(WARM,.7));sp.addColorStop(1,alpha(WARM,0));
  g.fillStyle=sp;g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,Math.PI*2);g.fill();g.restore();
  if(occ>0){
    // A standing body's shadow thrown away from the door: feet in the light, legs, torso and arms running off into the dark.
    const step=ease.inOut(prog(t,6.6,7.0))*46,sway=Math.sin(t*1.3)*4,fx=cx+170,sh='#0b0f17';
    g.save();g.beginPath();g.ellipse(cx,cy,rx,ry,0,0,Math.PI*2);g.clip();g.globalAlpha*=occ;
    seg(g,[[fx,cy-30],[cx-30+sway,cy-24]],46,sh);seg(g,[[fx+step,cy+34],[cx-30+sway,cy+22]],46,sh);
    poly(g,[[cx-10+sway,cy-62],[cx-10+sway,cy+62],[cx-330+sway,cy+86],[cx-330+sway,cy-86]],sh);
    seg(g,[[cx-300+sway,cy-80],[cx-60+sway,cy-118]],30,sh);seg(g,[[cx-300+sway,cy+80],[cx-60+sway,cy+118]],30,sh);
    circle(g,cx-430+sway,cy,70,sh);
    g.fillStyle='#04060a';g.beginPath();g.ellipse(fx+18,cy-30,48,24,0,0,Math.PI*2);g.fill();
    g.beginPath();g.ellipse(fx+18+step,cy+34,48,24,0,0,Math.PI*2);g.fill();g.restore();
  }
  if(t>1.62&&occ<1){g.save();g.globalAlpha*=1-occ;P.mark(g,cx+rx-20,cy-ry-10,{ok:true,size:34});g.restore();}
}});

// s20 — final wide. Lit feet in the beam from the start; the full silhouette resolves on "came" (2.26), taller than the door;
// the person recoils on "IN" (2.74). One deliberate step toward them (4.4-5.2), its shadow sliding across the light; hold.
registerShot('s20',{draw(g,t,info){
  base(g,info.globalT,4,t<2.74?'ONE PEEPHOLE':'IT CAME IN',t<2.74?C.green:C.red);
  const step=ease.inOut(prog(t,4.4,5.2)),x=lerp(1012,1072,step);
  entry(g,t,{newHole:0,oldLight:1,spotShadow:1,occX:x,feet:false});
  const reveal=lerp(.26,1,ease.inOut(prog(t,2.26,2.75)));
  const eye=presence(g,{x,reveal,walk:step>0&&step<1?.5:0,phase:Math.PI*step,head:[4*step,3*step],glint:ease.out(prog(t,2.6,2.9))});
  const recoil=ease.out(prog(t,2.74,3.0));
  const head=sitting(g,ENTRY.sitX,P.poseBetween({...SIT,head:[22,-172],neck:[10,-134]},SIT_RECOIL,recoil));
  if(t>2.9){const a=ease.out(prog(t,2.9,3.3))*.75;sightLine(g,eye,head,{color:C.red,width:4,t,a});}
}});
