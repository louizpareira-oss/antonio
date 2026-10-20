// entry-v1: side cutaway of a dark apartment entry, the front-door wall and the lit hallway beyond.
// Every wide shot uses these coordinates (logical 1920x1080) so returns to the room stay continuous.
import {E,text,circle,ring,seg,poly,rr,alpha,clamp,lerp,ease,prog} from '/engine/core.js';
import * as P from '/engine/pictogram2d.js';
export const C=P.COLORS;
export const DOOR_FILL='#1e2738',WALL_FILL='#141b28',WARM='#f2dfaa',GLASS='#030406';
export const ENTRY={floorY:821,wallX:1420,wallW:36,doorTop:392,oldY:578,newY:486,handleY:690,
  lampX:1872,lampY:330,spotX:1012,standX:1230,peerX:1369,outsideX:1575,sitX:1395,tapeX:1350,s:.92};
// Eye pressed to the old peephole: head forward, right hand flat on the door.
export const PEER={head:[26,-266],neck:[12,-228],hip:[-4,-131],la:[[-14,-214],[-26,-163],[-20,-128]],
  ra:[[20,-214],[40,-185],[52,-170]],ll:[[-16,-131],[-22,-65],[-26,-8]],rl:[[8,-131],[22,-65],[30,-8]]};
// Sitting on the floor, back to the door (use facing:-1 so the back is on the door side).
export const SIT={head:[6,-178],neck:[0,-136],hip:[-4,-36],la:[[-12,-124],[14,-92],[44,-96]],
  ra:[[12,-124],[38,-98],[60,-98]],ll:[[-10,-34],[44,-96],[76,-8]],rl:[[6,-34],[62,-92],[96,-8]]};
const STAND_LEGS={ll:[[-13,-130],[-17,-65],[-19,-8]],rl:[[13,-130],[18,-65],[20,-8]]};
// Hands at the old (y 578) and new (y 486) peephole from x = ENTRY.tapeX.
export const REACH_MID={head:[4,-272],neck:[0,-232],hip:[0,-132],la:[[-17,-218],[-34,-168],[-31,-134]],ra:[[17,-218],[44,-242],[64,-264]],...STAND_LEGS};
export const REACH_UP={head:[-2,-273],neck:[0,-232],hip:[0,-132],la:[[-17,-218],[-34,-168],[-31,-134]],ra:[[17,-220],[38,-292],[52,-364]],...STAND_LEGS};
const LINE=()=>alpha(C.white,.58);

// Head centre of a pictogram human, for sight-lines that must land on the figure.
export function headOf(x,pose,{s=ENTRY.s,facing=1}={}){
  const p=typeof pose==='string'?P.HUMAN_POSES[pose]:pose;
  return [x+p.head[0]*s*facing,ENTRY.floorY+p.head[1]*s];
}

function hallway(g){
  const {wallX,wallW,floorY,lampX,lampY}=ENTRY,x0=wallX+wallW;
  g.save();g.beginPath();g.rect(x0,0,E.W-x0,E.H);g.clip();
  const wash=g.createRadialGradient(lampX,lampY,4,lampX,lampY,560);
  wash.addColorStop(0,alpha(WARM,.16));wash.addColorStop(1,alpha(WARM,0));g.fillStyle=wash;g.fillRect(x0,0,E.W-x0,E.H);
  g.restore();
  seg(g,[[x0,floorY],[E.W,floorY]],4,LINE());
  // Wall sconce on the far side of the hallway.
  seg(g,[[E.W,lampY-6],[lampX+18,lampY-6]],5,LINE());
  poly(g,[[lampX-20,lampY-34],[lampX+20,lampY-34],[lampX+28,lampY+4],[lampX-28,lampY+4]],alpha(C.white,.82));
  g.save();g.shadowBlur=26;g.shadowColor=C.yellow;circle(g,lampX,lampY+10,11,C.yellow);g.restore();
}

function interior(g,{pictureHole=0,pictureShake=0,t=0}={}){
  const {floorY}=ENTRY,col=LINE();
  seg(g,[[E.W*.06,floorY],[ENTRY.wallX,floorY]],4,col);
  // Console table with a key bowl.
  seg(g,[[300,690],[540,690]],12,alpha(C.white,.74));seg(g,[[322,690],[322,floorY]],5,col);seg(g,[[518,690],[518,floorY]],5,col);
  g.fillStyle=alpha(C.white,.5);g.beginPath();g.ellipse(470,684,30,14,0,Math.PI,0,true);g.fill();
  // Framed picture and an unlit pendant lamp.
  g.save();if(pictureShake)g.translate(Math.sin(t*61)*3*pictureShake,Math.cos(t*47)*2*pictureShake);
  g.strokeStyle=col;g.lineWidth=4;g.strokeRect(360,392,120,150);seg(g,[[376,500],[420,460],[446,482],[464,470]],3,alpha(C.white,.35));
  if(pictureHole>0)pictureEye(g,420,467,26,pictureHole);
  g.restore();
  seg(g,[[780,0],[780,188]],3,col);poly(g,[[752,188],[808,188],[830,226],[730,226]],alpha(C.white,.18));
  g.strokeStyle=col;g.lineWidth=3;g.beginPath();g.moveTo(752,188);g.lineTo(808,188);g.lineTo(830,226);g.lineTo(730,226);g.closePath();g.stroke();
}

// A brass eye punched through the centre of a picture, with cracks in the glass/mat.
export function pictureEye(g,x,y,r,k){
  const pop=k<1?ease.outBack(clamp(k)):1;
  g.save();g.globalAlpha*=clamp(k*3);
  for(const [a,l] of [[.5,1.9],[2.2,1.6],[3.6,2.1],[5.1,1.7]]){const p=[[x,y]];let px=x,py=y;for(let i=1;i<=3;i++){px+=Math.cos(a+(i%2?.3:-.3))*r*l/3*1.2;py+=Math.sin(a+(i%2?.3:-.3))*r*l/3;p.push([px,py]);}seg(g,p,Math.max(1.5,r*.07),alpha(C.white,.55));}
  g.restore();
  if(pop>0){g.save();g.translate(x,y);g.scale(pop,pop);lens(g,0,0,r,{brass:true});g.restore();}
}

// One peephole seen edge-on: a short tube through the slab with a lens on the room side.
function peephole(g,y,{brass=false,lit=0}={}){
  const {wallX,wallW}=ENTRY;
  rr(g,wallX-10,y-11,wallW+20,22,4);g.fillStyle=brass?C.yellow:C.muted;g.fill();g.strokeStyle=C.outline;g.lineWidth=3;g.stroke();
  circle(g,wallX-11,y,10,C.outline);circle(g,wallX-11,y,7,lit>0?alpha(WARM,.35+.65*lit):GLASS);
}

// Light from the hallway lamp: through the old hole onto the room floor; stopped dead at the new hole.
function lightPaths(g,{oldLight=1,blocked=false,newHole=0,spotShadow=0,spotPulse=-1}){
  const {wallX,wallW,lampX,lampY,oldY,newY,floorY,spotX}=ENTRY,x1=wallX+wallW;
  g.save();g.setLineDash([3,11]);g.lineWidth=3;
  g.strokeStyle=alpha(WARM,.32);g.beginPath();g.moveTo(lampX-24,lampY+12);g.lineTo(x1+8,oldY);g.stroke();
  if(newHole>0){g.strokeStyle=alpha(WARM,.32*clamp(newHole));g.beginPath();g.moveTo(lampX-24,lampY+12);g.lineTo(x1+8,newY);g.stroke();}
  g.restore();
  const k=blocked?0:oldLight;if(k<=0)return;
  const beam=g.createLinearGradient(wallX,oldY,spotX,floorY);
  beam.addColorStop(0,alpha(WARM,.26*k));beam.addColorStop(1,alpha(WARM,.07*k));
  poly(g,[[wallX-11,oldY-4],[spotX-86,floorY],[spotX+86,floorY],[wallX-11,oldY+4]],beam);
  g.save();g.shadowBlur=22;g.shadowColor=alpha(WARM,.9*k);g.fillStyle=alpha(WARM,.72*k);
  g.beginPath();g.ellipse(spotX,floorY-2,84,10,0,0,Math.PI*2);g.fill();g.restore();
  if(spotPulse>=0&&spotPulse<1){const q=ease.out(spotPulse);g.strokeStyle=alpha(C.yellow,1-q);g.lineWidth=4;g.beginPath();g.ellipse(spotX,floorY-2,84+70*q,10+12*q,0,0,Math.PI*2);g.stroke();}
  if(spotShadow>0){
    // Something unseen stands in the beam: its feet cut the light and throw shadow away from the door.
    g.save();g.globalAlpha*=clamp(spotShadow);poly(g,[[1044,756],[1044,819],[918,819]],'#0b0f17');
    g.beginPath();g.rect(900,800,144,40);g.clip();g.fillStyle='#0b0f17';g.beginPath();g.ellipse(spotX,floorY-2,86,12,0,0,Math.PI*2);g.fill();g.restore();
    seg(g,[[spotX-90,floorY],[spotX+90,floorY]],4,LINE());
    for(const fx of [1010,1036]){rr(g,fx-13,808,24,11,5);g.fillStyle=alpha('#040507',clamp(spotShadow));g.fill();}
  }
}

// Sight geometry: a peephole sees into the room from 3 degrees up to 41 degrees down.
export const SIGHT={high:-3*Math.PI/180,low:41*Math.PI/180};
export const lensAt=y=>[ENTRY.wallX-11,y];
export function aim(from,target){
  const dx=from[0]-target[0],dy=target[1]-from[1],ang=Math.atan2(dy,Math.max(dx,1e-3));
  if(dx>0&&ang<=SIGHT.low&&ang>=SIGHT.high)return {pt:target,locked:true};
  const a=clamp(ang,SIGHT.high,SIGHT.low),len=Math.max(120,Math.hypot(dx,dy));
  return {pt:[from[0]-Math.cos(a)*len,from[1]+Math.sin(a)*len],locked:false};
}
export function sightLine(g,from,to,{color=C.yellow,width=5,t=0,a=1}={}){
  if(a<=0)return;g.save();g.globalAlpha*=a;g.setLineDash([4,14]);g.lineDashOffset=-t*48;g.lineCap='round';
  g.strokeStyle=color;g.lineWidth=width;g.beginPath();g.moveTo(...from);g.lineTo(...to);g.stroke();g.restore();
}
function ray(from,a){const x=E.W*.06,d=from[0]-x,y=from[1]+Math.tan(a)*d;if(y<=ENTRY.floorY)return [x,y];return [from[0]-(ENTRY.floorY-from[1])/Math.tan(a),ENTRY.floorY];}
export function cones(g,{k=1,low=41}={}){
  if(k<=0)return;const lo=low*Math.PI/180;
  for(const y of [ENTRY.newY,ENTRY.oldY]){const o=lensAt(y),u=ray(o,SIGHT.high),l=ray(o,lo);
    const pts=[o,u,...(u[1]<ENTRY.floorY&&l[0]>E.W*.06?[[E.W*.06,ENTRY.floorY]]:[]),l];
    g.save();g.globalAlpha*=k;poly(g,pts,alpha(C.red,.07));g.setLineDash([3,10]);g.strokeStyle=alpha(C.red,.6);g.lineWidth=3;
    g.beginPath();g.moveTo(...u);g.lineTo(...o);g.lineTo(...l);g.stroke();g.restore();}
}
export function blindSpot(g,{k=1,label=0}={}){
  if(k<=0)return;const o=lensAt(ENTRY.oldY),hit=o[0]-(ENTRY.floorY-o[1])/Math.tan(SIGHT.low);
  g.save();g.globalAlpha*=k;poly(g,[[o[0]-2,o[1]+4],[o[0]-2,ENTRY.floorY],[hit,ENTRY.floorY]],alpha(C.green,.16));
  g.setLineDash([3,10]);g.strokeStyle=alpha(C.green,.8);g.lineWidth=3;g.beginPath();g.moveTo(o[0]-2,o[1]+4);g.lineTo(hit,ENTRY.floorY);g.stroke();g.restore();
  if(label>0)text(g,'BLIND SPOT',(hit+o[0])/2,ENTRY.floorY+34,{size:24,font:'Montserrat',weight:800,color:C.green,alpha:label});
}
export function tape(g,y,a=1){
  if(a<=0)return;const x=ENTRY.wallX;g.save();g.globalAlpha*=a;
  rr(g,x-17,y-28,14,56,2);g.fillStyle='#b9c0c9';g.fill();g.strokeStyle=C.outline;g.lineWidth=3;g.stroke();
  seg(g,[[x-17,y-12],[x-3,y-6]],2,alpha(C.outline,.5));seg(g,[[x-17,y+10],[x-3,y+16]],2,alpha(C.outline,.5));g.restore();
}

// doorOpen 0/1 hides the slab and floods the floor; newHole 0..1 reveals the second peephole.
export function entry(g,t,{doorOpen=0,oldLight=1,blocked=false,newHole=0,pulse=-1,pulseColor=C.yellow,labels=0,
  tapeOld=0,tapeNew=0,pictureHole=0,pictureShake=0,spotShadow=0,spotPulse=-1}={}){
  const {wallX,wallW,doorTop,floorY,oldY,newY,handleY}=ENTRY,col=LINE();
  hallway(g);interior(g,{pictureHole,pictureShake,t});
  if(!doorOpen)lightPaths(g,{oldLight,blocked,newHole,spotShadow,spotPulse});
  // Wall band above the door (lintel) running to the top of frame.
  g.fillStyle=WALL_FILL;g.fillRect(wallX,0,wallW,doorTop-4);g.strokeStyle=col;g.lineWidth=4;
  g.beginPath();g.moveTo(wallX,0);g.lineTo(wallX,doorTop-4);g.lineTo(wallX+wallW,doorTop-4);g.lineTo(wallX+wallW,0);g.stroke();
  if(doorOpen){
    const wedge=g.createLinearGradient(wallX,0,wallX-620,0);wedge.addColorStop(0,alpha(WARM,.2));wedge.addColorStop(1,alpha(WARM,0));
    poly(g,[[wallX,doorTop],[wallX,floorY],[wallX-640,floorY]],wedge);
    g.save();g.setLineDash([8,10]);g.strokeStyle=alpha(C.white,.25);g.lineWidth=3;g.strokeRect(wallX,doorTop,wallW,floorY-doorTop);g.restore();
    return;
  }
  rr(g,wallX,doorTop,wallW,floorY-doorTop,3);g.fillStyle=DOOR_FILL;g.fill();g.strokeStyle=alpha(C.white,.78);g.lineWidth=4;g.stroke();
  seg(g,[[wallX-2,handleY],[wallX-30,handleY]],8,C.white);rr(g,wallX-6,handleY-15,6,30,2);g.fillStyle=C.white;g.fill();
  peephole(g,oldY,{lit:oldLight*(blocked?0:1)});
  if(newHole>0){g.save();g.globalAlpha*=clamp(newHole);peephole(g,newY,{brass:true});g.restore();}
  tape(g,oldY,tapeOld);tape(g,newY,tapeNew*clamp(newHole));
  if(pulse>=0&&pulse<1){const k=ease.out(pulse);ring(g,wallX+wallW/2,newY,16+70*k,5*(1-k)+1,alpha(pulseColor,1-k));}
  if(labels>0){
    text(g,'NEW',wallX-30,newY,{size:28,font:'Montserrat',weight:800,color:C.yellow,align:'right',alpha:labels});
    text(g,'OLD',wallX-30,oldY,{size:28,font:'Montserrat',weight:800,color:C.muted,align:'right',alpha:labels});
  }
}

// Frontal close-up of a peephole lens on the inner door face (inserts).
export function lens(g,x,y,r,{brass=false,lit=0,lid=0,eye=0}={}){
  circle(g,x,y,r+5,C.outline);circle(g,x,y,r,brass?C.yellow:C.muted);
  g.strokeStyle=alpha(C.white,brass?.75:.35);g.lineWidth=r*.07;g.lineCap='round';g.beginPath();g.arc(x,y,r*.84,Math.PI*1.08,Math.PI*1.42);g.stroke();
  circle(g,x,y,r*.74,brass?'#a07f2b':'#4a525e');circle(g,x,y,r*.6,C.outline);
  const gr=r*.56;
  if(lit>0){g.save();g.shadowBlur=r*.9*lit;g.shadowColor=alpha(WARM,.9);circle(g,x,y,gr,alpha(WARM,.25+.75*lit));g.restore();
    circle(g,x,y,gr*.55,alpha('#fffaf0',.5+.5*lit));}
  else circle(g,x,y,gr,GLASS);
  if(!lit){
    if(eye>0){ring(g,x,y,gr*.62,gr*.05,alpha(C.muted,.35*eye));circle(g,x-gr*.32,y-gr*.32,gr*.1,alpha(C.white,.85*eye));}
    else{g.strokeStyle=alpha(C.white,.22);g.lineWidth=gr*.06;g.beginPath();g.arc(x,y,gr*.7,Math.PI*1.15,Math.PI*1.45);g.stroke();}
  }
  if(lid>0){
    // Upper and lower lids meet on a lash line across the middle: the lens blinks like an eye.
    g.save();g.beginPath();g.arc(x,y,gr,0,Math.PI*2);g.clip();
    const up=y-gr*1.25+lid*gr*1.25,low=y+gr*1.25-lid*gr*1.25,sag=gr*.32,lw=gr*.07;
    g.fillStyle='#d9dde3';g.beginPath();g.moveTo(x-gr-4,y-gr-4);g.lineTo(x+gr+4,y-gr-4);g.lineTo(x+gr+4,up-sag);g.quadraticCurveTo(x,up+sag,x-gr-4,up-sag);g.closePath();g.fill();
    g.beginPath();g.moveTo(x-gr-4,y+gr+4);g.lineTo(x+gr+4,y+gr+4);g.lineTo(x+gr+4,low-sag);g.quadraticCurveTo(x,low+sag,x-gr-4,low-sag);g.closePath();g.fill();
    g.strokeStyle=C.outline;g.lineWidth=lw;g.lineCap='round';
    g.beginPath();g.moveTo(x+gr+4,up-sag);g.quadraticCurveTo(x,up+sag,x-gr-4,up-sag);g.stroke();
    g.beginPath();g.moveTo(x+gr+4,low-sag);g.quadraticCurveTo(x,low+sag,x-gr-4,low-sag);g.stroke();
    if(lid>.9)for(const k of [-.5,-.17,.17,.5])seg(g,[[x+k*gr,y+sag*.5],[x+k*gr*1.15,y+sag*.5+gr*.16]],lw*.8,C.outline);
    g.restore();
  }
}
