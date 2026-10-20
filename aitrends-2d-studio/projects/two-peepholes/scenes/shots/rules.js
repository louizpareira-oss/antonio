// Two Peepholes, rules 2-4. Local cue times = global word start (timeline/words.json) - shot start.
import {E,registerShot,ease,prog,lerp,clamp,text,circle,ring,seg,rr,poly,alpha} from '/engine/core.js';
import * as P from '/engine/pictogram2d.js';
import {C,ENTRY,SIT,REACH_MID,REACH_UP,DOOR_FILL,WARM,entry,lens,headOf,aim,sightLine,cones,blindSpot,lensAt,pictureEye,tape} from '../sets/entry.js';
const S=ENTRY.s,NIGHT='#3a4352';
function base(g,globalT,step,status='',statusColor=C.red){P.background(g,globalT);P.hud(g,globalT,{title:'SKOTOMA / UNIT 4C — FRONT DOOR',step,count:4,status,statusColor});}
const person=(g,o)=>P.human(g,{y:ENTRY.floorY,s:S,look:1,...o});
const AFTER_S07=P.poseBetween('stand','recoil',.35);
const keyPt=(t,keys)=>{let p=keys[0][1];for(let i=1;i<keys.length;i++){const [t0,a]=keys[i-1],[t1,b]=keys[i];if(t>=t0){const k=ease.inOut(prog(t,t0,t1));p=[lerp(a[0],b[0],k),lerp(a[1],b[1],k)];}}return p;};
// Searching sight-line endpoint that sweeps the room inside the peephole's view.
const sweep=(t,from,len=760)=>{const a=(.2+.45*(.5+.5*Math.sin(t*.9)))*0.72;return [from[0]-Math.cos(a)*len,from[1]+Math.sin(a)*len];};
const sitting=(g,x=ENTRY.sitX,pose=SIT)=>{person(g,{x,facing:-1,pose});return headOf(x,pose,{facing:-1});};

const card=(n,title)=>({draw(g,t,info){base(g,info.globalT,n);P.ruleTitle(g,t,{number:n,total:4,title});}});
registerShot('s08',card(2,'SIT AGAINST THE DOOR'));
registerShot('s12',card(3,"DON'T COVER THEM"));
registerShot('s17',card(4,'WAIT FOR THE LIGHT'));

// s09 — "sit" 1.5: walk to the door, turn, slide down. The sight-line loses its lock below 41 degrees.
registerShot('s09',{draw(g,t,info){
  base(g,info.globalT,2,t<3.58?'WATCHED':'BOTH DARK',C.red);
  entry(g,t,{newHole:1,oldLight:0});
  const walk=ease.inOut(prog(t,1.3,2.6)),turned=t>=2.62,down=ease.inOut(prog(t,2.7,3.4));
  const x=lerp(1060,ENTRY.sitX,walk);
  const pose=turned?P.poseBetween('stand',SIT,down):P.poseBetween(AFTER_S07,'stand',walk);
  person(g,{x,facing:turned?-1:1,pose,walk:walk>0&&walk<1?.8:0,phase:t*8});
  const from=lensAt(ENTRY.newY),head=headOf(x,pose,{facing:turned?-1:1}),hit=aim(from,head);
  if(hit.locked)sightLine(g,from,hit.pt,{color:C.red,width:7,t});
  else sightLine(g,from,t<5.3?hit.pt:sweep(t-5.3,from),{color:C.yellow,t,a:.85-.25*prog(t,2.2,5.3)});
}});

// s10 — diagram on the held room: view cones on "one way" (1.36), tilt "a little down" (2.4-3.6), blind spot (4.4 / 6.56).
registerShot('s10',{draw(g,t,info){
  base(g,info.globalT,2,'BOTH DARK',C.red);
  entry(g,t,{newHole:1,oldLight:0});
  cones(g,{k:ease.out(prog(t,1.2,1.6)),low:lerp(18,41,ease.inOut(prog(t,2.4,3.6)))});
  blindSpot(g,{k:ease.out(prog(t,4.4,5.0)),label:ease.out(prog(t,6.5,6.8))});
  const head=sitting(g);
  if(t>6.56)P.mark(g,head[0]-70,head[1]-70,{ok:true,size:26});
}});

// s11 — "It will look for you" 4.96; table 6.56, picture 7.6, spot 8.72; "Let it look" 10.8.
registerShot('s11',{draw(g,t,info){
  base(g,info.globalT,2,t<3.28?'BOTH DARK':'02:47 AM',t<3.28?C.red:NIGHT);
  entry(g,t,{newHole:1,oldLight:0});
  const fade=1-ease.inOut(prog(t,0,.6));cones(g,{k:fade});blindSpot(g,{k:1-ease.inOut(prog(t,1.2,2.8))});
  const back=ease.inOut(prog(t,1.6,2.0))*3;sitting(g,ENTRY.sitX+back);
  if(t>8.6){const k=ease.out(prog(t,8.6,9.0));g.save();g.setLineDash([6,10]);g.strokeStyle=alpha(WARM,.5*k);g.lineWidth=3;g.beginPath();g.ellipse(ENTRY.spotX,ENTRY.floorY-2,84,10,0,0,Math.PI*2);g.stroke();g.restore();}
  const from=lensAt(ENTRY.newY),grow=ease.out(prog(t,4.96,5.5));
  if(grow>0){
    const table=[430,686],pic=[420,467],spot=[ENTRY.spotX,ENTRY.floorY-6],idle=[from[0]-520,from[1]+160];
    let end=keyPt(t,[[4.96,idle],[6.1,idle],[6.56,table],[7.15,table],[7.6,pic],[8.25,pic],[8.72,spot],[10.6,spot]]);
    if(t>10.6){const k=.5+.5*Math.sin((t-10.6)*1.4-Math.PI/2);end=[lerp(spot[0],pic[0],k*.6),lerp(spot[1],pic[1],k*.6)];}
    sightLine(g,from,[lerp(from[0],end[0],grow),lerp(from[1],end[1],grow)],{color:C.yellow,t});
    if(t>6.56)ring(g,end[0],end[1],14,3,alpha(C.yellow,.7));
  }
}});

// s13 — hypothetical: stand, tape the old hole (1.4) and the new hole (1.85), sit back down; the picture starts to shake on "closer" (7.25).
registerShot('s13',{draw(g,t,info){
  base(g,info.globalT,3,'IF YOU COVER THEM',C.red);
  const bulge=Math.max(0,Math.sin(prog(t,5.6,6.3)*Math.PI));
  entry(g,t,{newHole:1,oldLight:0,tapeOld:ease.out(prog(t,1.4,1.5)),tapeNew:ease.out(prog(t,1.85,1.95)),pictureShake:ease.in(prog(t,6.9,8.3))});
  if(bulge>0)ring(g,ENTRY.wallX-10,ENTRY.newY,30+10*bulge,3,alpha(C.red,.6*bulge));
  let x=ENTRY.sitX,facing=-1,pose=SIT,walk=0;
  if(t<.8)pose=P.poseBetween(SIT,'stand',ease.inOut(prog(t,.15,.75)));
  else if(t<2.3){facing=1;x=lerp(ENTRY.sitX,ENTRY.tapeX,ease.inOut(prog(t,.8,1.1)));
    pose=t<1.5?P.poseBetween('stand',REACH_MID,ease.inOut(prog(t,1.1,1.4))):t<1.95?P.poseBetween(REACH_MID,REACH_UP,ease.inOut(prog(t,1.5,1.85))):P.poseBetween(REACH_UP,'stand',ease.inOut(prog(t,1.95,2.25)));}
  else{x=lerp(ENTRY.tapeX,ENTRY.sitX,ease.inOut(prog(t,2.3,2.6)));pose=P.poseBetween('stand',SIT,ease.inOut(prog(t,2.6,3.2)));walk=t<2.6?.6:0;}
  person(g,{x,facing,pose,walk,phase:t*8});
}});

// s14 — picture insert. "years" hold, then "does" (5.37): a brass eye punches through the picture.
registerShot('s14',{draw(g,t,info){
  base(g,info.globalT,3,'IF YOU COVER THEM',C.red);
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
}});

// s15 — the picture eye sees the blind spot: red line on "see" (1.2), lock on "exactly" (1.44), flinch on "sitting" (2.43).
registerShot('s15',{draw(g,t,info){
  base(g,info.globalT,3,'IF YOU COVER THEM',C.red);
  entry(g,t,{newHole:1,oldLight:0,tapeOld:1,tapeNew:1,pictureHole:1});
  const flinch=Math.exp(-Math.max(0,t-2.43)*5)*(t>2.43?1:0)*.6;
  const pose=P.poseBetween(SIT,{...SIT,head:[-8,-182],neck:[-6,-138]},flinch);
  const head=sitting(g,ENTRY.sitX,pose),from=[420,467],grow=ease.out(prog(t,.9,1.3));
  if(grow>0)sightLine(g,from,[lerp(from[0],head[0],grow),lerp(from[1],head[1],grow)],{color:C.red,width:6,t});
  if(t>1.44)ring(g,head[0],head[1],40+4*Math.sin(t*6),3,alpha(C.red,.85));
}});

// s16 — evidence: uncovered pair (check on "safer" 1.46) vs covered + picture eye (cross on "don't" 2.38).
function miniDoor(g,{taped=false}={}){
  rr(g,-70,-120,140,240,6);g.fillStyle=DOOR_FILL;g.fill();g.strokeStyle=alpha(C.white,.75);g.lineWidth=4;g.stroke();
  lens(g,0,-62,17,{brass:true});lens(g,0,-12,17,{});circle(g,48,30,6,C.white);
  if(taped)for(const y of [-62,-12]){g.save();g.translate(0,y);g.rotate(-.5);rr(g,-30,-10,60,20,3);g.fillStyle='#b9c0c9';g.fill();g.strokeStyle=C.outline;g.lineWidth=2;g.stroke();g.restore();}
}
registerShot('s16',{draw(g,t,info){
  base(g,info.globalT,3);
  P.evidenceCard(g,{x:E.W*.29,y:E.H*.47,w:600,h:520,title:'UNCOVERED',subtitle:'TWO YOU KNOW',status:t>1.46?true:null,draw(gg){gg.scale(1.15,1.15);miniDoor(gg);}});
  if(t>2.0){const a=ease.out(prog(t,2.0,2.25));g.save();g.globalAlpha*=a;
    P.evidenceCard(g,{x:E.W*.71,y:E.H*.47,w:600,h:520,title:'COVERED',subtitle:"ONE YOU DON'T",status:t>2.38?false:null,draw(gg){
      gg.translate(62,0);gg.scale(1.15,1.15);miniDoor(gg,{taped:true});gg.strokeStyle=alpha(C.white,.7);gg.lineWidth=4;gg.strokeRect(-188,-80,84,108);pictureEye(gg,-146,-26,19,1);}});
    g.restore();}
}});

// s18 — morning: old light returns ("old one" 3.18), pulse on "always" (5.98), new hole gone (7.98), lean on "Before you get up" (11.26).
registerShot('s18',{draw(g,t,info){
  base(g,info.globalT,4,t<9.02?'04:51 AM':'ONE PEEPHOLE',t<9.02?NIGHT:C.green);
  entry(g,t,{newHole:1-ease.inOut(prog(t,7.98,8.5)),oldLight:ease.inOut(prog(t,3.0,3.6)),spotPulse:t>5.98?prog(t,5.98,6.8):-1});
  const lean=ease.inOut(prog(t,11.26,11.9));
  sitting(g,ENTRY.sitX,P.poseBetween(SIT,{...SIT,head:[22,-172],neck:[10,-134]},lean));
}});

// s19 — top-down insert of the floor spot. Check on "only" (1.62); feet in the light on "standing" (5.18); a foot shifts in the pause (6.6).
registerShot('s19',{draw(g,t,info){
  const occ=ease.out(prog(t,5.18,5.7));
  base(g,info.globalT,4,occ>0?'NOT ONLY LIGHT':'',C.red);
  g.fillStyle='#10151e';g.fillRect(0,0,E.W,E.H);
  for(let y=60;y<E.H;y+=92){seg(g,[[0,y],[E.W,y]],2,alpha(C.white,.06));for(let x=((y/92)%2)*260;x<E.W;x+=520)seg(g,[[x,y],[x,y+92]],2,alpha(C.white,.05));}
  const cx=860,cy=440,rx=390,ry=205;
  rr(g,1700,-20,48,E.H+40,4);g.fillStyle=DOOR_FILL;g.fill();g.strokeStyle=alpha(C.white,.7);g.lineWidth=4;g.stroke();
  const beam=g.createLinearGradient(1700,0,cx,0);beam.addColorStop(0,alpha(WARM,.12));beam.addColorStop(1,alpha(WARM,.02));poly(g,[[1700,410],[1700,450],[cx,cy+ry*.9],[cx,cy-ry*.9]],beam);
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

// s20 — final wide: something stands in the beam. A red sight-line from above the spot, higher than the door, on "came" (2.26); lock on "IN" (2.74); it blinks (5.0).
registerShot('s20',{draw(g,t,info){
  base(g,info.globalT,4,t<2.74?'ONE PEEPHOLE':'IT CAME IN',t<2.74?C.green:C.red);
  entry(g,t,{newHole:0,oldLight:1,spotShadow:1});
  const head=sitting(g,ENTRY.sitX,{...SIT,head:[22,-172],neck:[10,-134]});
  const eye=[ENTRY.spotX,296],grow=ease.out(prog(t,2.26,2.7));
  if(t>2.1){const k=ease.out(prog(t,2.1,2.4)),blink=1-Math.sin(prog(t,5.0,5.3)*Math.PI);
    g.save();g.translate(...eye);g.scale(1,Math.max(.08,blink));g.shadowBlur=24;g.shadowColor=C.yellow;circle(g,0,0,7*k,C.yellow);g.restore();}
  if(grow>0)sightLine(g,eye,[lerp(eye[0],head[0],grow),lerp(eye[1],head[1],grow)],{color:C.red,width:6,t});
  if(t>2.74)ring(g,head[0],head[1],40+4*Math.sin(t*6),3,alpha(C.red,.85));
}});
