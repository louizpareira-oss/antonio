// entry-v1: side cutaway of a dark apartment entry, the front-door wall and the lit hallway beyond.
// Every wide shot uses these coordinates (logical 1920x1080) so returns to the room stay continuous.
import {E,text,circle,ring,seg,poly,rr,alpha,clamp,lerp,ease,prog} from '/engine/core.js';
import * as P from '/engine/pictogram2d.js';
export const C=P.COLORS;
export const DOOR_FILL='#1e2738',WALL_FILL='#141b28',WARM='#f2dfaa',GLASS='#030406';
export const ENTRY={floorY:821,wallX:1420,wallW:36,doorTop:392,oldY:578,newY:486,handleY:690,
  lampX:1872,lampY:330,spotX:1012,standX:1230,peerX:1369,outsideX:1575,s:.92};
// Eye pressed to the old peephole: head forward, right hand flat on the door.
export const PEER={head:[26,-266],neck:[12,-228],hip:[-4,-131],la:[[-14,-214],[-26,-163],[-20,-128]],
  ra:[[20,-214],[40,-185],[52,-170]],ll:[[-16,-131],[-22,-65],[-26,-8]],rl:[[8,-131],[22,-65],[30,-8]]};
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

function interior(g){
  const {floorY}=ENTRY,col=LINE();
  seg(g,[[E.W*.06,floorY],[ENTRY.wallX,floorY]],4,col);
  // Console table with a key bowl.
  seg(g,[[300,690],[540,690]],12,alpha(C.white,.74));seg(g,[[322,690],[322,floorY]],5,col);seg(g,[[518,690],[518,floorY]],5,col);
  g.fillStyle=alpha(C.white,.5);g.beginPath();g.ellipse(470,684,30,14,0,Math.PI,0,true);g.fill();
  // Framed picture and an unlit pendant lamp.
  g.strokeStyle=col;g.lineWidth=4;g.strokeRect(360,392,120,150);seg(g,[[376,500],[420,460],[446,482],[464,470]],3,alpha(C.white,.35));
  seg(g,[[780,0],[780,188]],3,col);poly(g,[[752,188],[808,188],[830,226],[730,226]],alpha(C.white,.18));
  g.strokeStyle=col;g.lineWidth=3;g.beginPath();g.moveTo(752,188);g.lineTo(808,188);g.lineTo(830,226);g.lineTo(730,226);g.closePath();g.stroke();
}

// One peephole seen edge-on: a short tube through the slab with a lens on the room side.
function peephole(g,y,{brass=false,lit=0}={}){
  const {wallX,wallW}=ENTRY;
  rr(g,wallX-10,y-11,wallW+20,22,4);g.fillStyle=brass?C.yellow:C.muted;g.fill();g.strokeStyle=C.outline;g.lineWidth=3;g.stroke();
  circle(g,wallX-11,y,10,C.outline);circle(g,wallX-11,y,7,lit>0?alpha(WARM,.35+.65*lit):GLASS);
}

// Light from the hallway lamp: through the old hole onto the room floor; stopped dead at the new hole.
function lightPaths(g,{oldLight=1,blocked=false,newHole=false}){
  const {wallX,wallW,lampX,lampY,oldY,newY,floorY,spotX}=ENTRY,x1=wallX+wallW;
  g.save();g.setLineDash([3,11]);g.lineWidth=3;
  g.strokeStyle=alpha(WARM,.32);g.beginPath();g.moveTo(lampX-24,lampY+12);g.lineTo(x1+8,oldY);g.stroke();
  if(newHole){g.strokeStyle=alpha(WARM,.32);g.beginPath();g.moveTo(lampX-24,lampY+12);g.lineTo(x1+8,newY);g.stroke();}
  g.restore();
  const k=blocked?0:oldLight;if(k<=0)return;
  const beam=g.createLinearGradient(wallX,oldY,spotX,floorY);
  beam.addColorStop(0,alpha(WARM,.26*k));beam.addColorStop(1,alpha(WARM,.07*k));
  poly(g,[[wallX-11,oldY-4],[spotX-86,floorY],[spotX+86,floorY],[wallX-11,oldY+4]],beam);
  g.save();g.shadowBlur=22;g.shadowColor=alpha(WARM,.9*k);g.fillStyle=alpha(WARM,.72*k);
  g.beginPath();g.ellipse(spotX,floorY-2,84,10,0,0,Math.PI*2);g.fill();g.restore();
}

// doorOpen 0/1 hides the slab and floods the floor; newHole 0..1 reveals the second peephole.
export function entry(g,t,{doorOpen=0,oldLight=1,blocked=false,newHole=0,pulse=-1,pulseColor=C.yellow,labels=0}={}){
  const {wallX,wallW,doorTop,floorY,oldY,newY,handleY}=ENTRY,col=LINE();
  hallway(g);interior(g);
  if(!doorOpen)lightPaths(g,{oldLight,blocked,newHole:newHole>0});
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
