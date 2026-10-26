// Pro look test: eight shots in an original setting (a 24-hour laundromat) to prove the engine/pro2d.js finish.
import {E,registerShot,layer,blurLayer,ease,prog,lerp,clamp,alpha,seg,rr,circle,text,glow} from '/engine/core.js';
import {PRO,camAt,floor,ring,contact,figure,crowd,portrait,hud,chapterCard,bigType,markerCircle,stamp,bubble,paper,embers,shaft,toneAt,scrim} from '/engine/pro2d.js';
import {machine,machineRow,strip,bench} from '../sets/laundry.js';
const H=(g,t,c)=>{scrim(g);hud(g,t,{file:'WRONG KNOCK  //  CASE 03',chapters:7,current:c});};
const bg=g=>{g.fillStyle=PRO.bg;g.fillRect(0,0,E.W,E.H);};

// A — the floor: zone rings, figures at three depths, the cobalt protagonist's ring drawing on. Slow push-in.
registerShot('A',{draw(g,t,info){
  bg(g);const cam=camAt(t,[[0,{z:1}],[info.dur,{z:1.08,y:-10}]]);
  blurLayer(g,2.2,gg=>{for(const x of [380,960,1540])strip(gg,x,150,360,.9);machineRow(gg,{y:560,s:.42,z:.85,n:12,spinSet:new Set([2,7]),t});},cam,.55);
  layer(g,cam,.8,gg=>floor(gg,{horizon:560,vp:[960,560]}));
  layer(g,cam,1,gg=>{
    ring(gg,520,700,150,{k:1,w:5,glowA:.35});figure(gg,{x:520,y:700,s:.62,z:.45,pose:'phone'});
    ring(gg,1480,660,120,{k:1,w:4,glowA:.3});figure(gg,{x:1480,y:660,s:.5,z:.6,pose:'stand'});
    ring(gg,960,860,270,{k:ease.inOut(prog(t,.4,1.6)),pulse:prog(t,1.6,2.6)});figure(gg,{x:960,y:860,s:.95,pose:'hips',kind:'cobalt',breath:Math.sin(t*1.8)});
  });
  H(g,info.globalT,1);
}});
// B — the waiting rows: every head turns in a wave toward us; one pair of eyes is red; a marker circle finds it.
registerShot('B',{draw(g,t,info){
  bg(g);const cam=camAt(t,[[0,{z:1.02}],[info.dur,{z:1.1,x:30,y:20}]]);
  blurLayer(g,2.5,gg=>{machineRow(gg,{y:430,s:.5,z:.75,n:10,spinSet:new Set([1,4,8]),t});for(const x of [480,1440])strip(gg,x,150,400,.8);},cam,.6);
  layer(g,cam,1,gg=>crowd(gg,{rows:4,cols:8,yFront:1040,yBack:600,wFront:1900,wBack:1100,sFront:1.0,sBack:.5,
    seat:(g2,x,y,s,z)=>bench(g2,x,y,170*s,s,z),turnAt:(c,r)=>ease.inOut(prog(t,1.0+c*.09+r*.05,1.6+c*.09+r*.05)),redSet:new Set(['1:5'])}));
  layer(g,cam,1,gg=>markerCircle(gg,1266,775,100,135,prog(t,2.4,3.1)));
  H(g,info.globalT,2);
}});
// C — shaded portrait: the night attendant blinks, looks aside, then the grin arrives and the eyes go red.
registerShot('C',{draw(g,t,info){
  bg(g);const cam=camAt(t,[[0,{z:1}],[info.dur,{z:1.06}]]);
  layer(g,cam,.6,gg=>{blurLayer(gg,3,g3=>machineRow(g3,{y:820,s:.75,z:.7,n:6,spinSet:new Set([1,4]),t}));});
  layer(g,cam,1,gg=>{gg.save();gg.globalCompositeOperation='lighter';glow(gg,1500,300,700,'#9fc4ff',.12);gg.restore();
    const blink=clamp(1-Math.abs(t-.9)/.08),gx=t>1.5&&t<2.3?.7:0,grin=ease.inOut(prog(t,2.4,3.3));
    portrait(gg,{x:960,y:520,r:250,expr:grin>0?'grin':'neutral',grin,blink,gaze:[gx,0],red:ease.out(prog(t,3.3,3.6)),cap:'#2a2f37',light:1,rim:'#BFD6FF'});});
  H(g,info.globalT,3);
}});
// D — chapter card over a blurred, dimmed room.
registerShot('D',{draw(g,t,info){
  bg(g);blurLayer(g,6,gg=>machineRow(gg,{y:760,s:.9,z:.6,n:7,t}));g.fillStyle='rgba(6,7,9,.72)';g.fillRect(0,0,E.W,E.H);
  chapterCard(g,t,{n:'03',title:"DON'T OPEN MACHINE 6",sub:'EVEN IF IT FINISHES'});H(g,info.globalT,3);
}});
// E — the load ticket: handwriting reveals, a stamp lands, a marker circles the time.
registerShot('E',{draw(g,t,info){
  bg(g);const cam=camAt(t,[[0,{z:1.04,y:10}],[info.dur,{z:1.12,y:-10}]]);
  layer(g,cam,1,gg=>{paper(gg,{x:960,y:560,w:640,h:820,rot:-.035,title:'LOAD TICKET  —  MACHINE 6',lines:11,write:ease.inOut(prog(t,.1,1.5))});
    gg.save();gg.translate(960,560);gg.rotate(-.035);markerCircle(gg,-90,-120,200,46,prog(t,2.3,2.9),{w:8});gg.restore();
    stamp(gg,t-1.6,'UNCLAIMED',1080,760,{size:52});});
  H(g,info.globalT,4);
}});
// F — floor plan: a red dot moves machine to machine and stops on 6.
registerShot('F',{draw(g,t,info){
  bg(g);const cam=camAt(t,[[0,{z:1}],[info.dur,{z:1.05}]]);
  layer(g,cam,1,gg=>{gg.strokeStyle=alpha(PRO.ink,.12);gg.lineWidth=1;for(let x=0;x<=E.W;x+=60){gg.beginPath();gg.moveTo(x,0);gg.lineTo(x,E.H);gg.stroke();}for(let y=0;y<=E.H;y+=60){gg.beginPath();gg.moveTo(0,y);gg.lineTo(E.W,y);gg.stroke();}
    const pos=[];for(let r=0;r<2;r++)for(let c=0;c<6;c++){const x=520+c*176,y=360+r*360;pos.push([x,y]);rr(gg,x-62,y-62,124,124,10);gg.strokeStyle=alpha(PRO.ink,.8);gg.lineWidth=3;gg.stroke();
      text(gg,String(r*6+c+1),x,y,{size:34,font:PRO.font,weight:900,color:alpha(PRO.ink,.7)});}
    const path=[pos[0],pos[7],pos[2],pos[9],pos[11],pos[5]],u=ease.inOut(prog(t,.3,2.6))*(path.length-1),i=Math.min(path.length-2,Math.floor(u)),k=u-i;
    const dot=[lerp(path[i][0],path[i+1][0],k),lerp(path[i][1],path[i+1][1],k)];
    gg.setLineDash([10,12]);gg.strokeStyle=alpha(PRO.red,.7);gg.lineWidth=4;gg.beginPath();gg.moveTo(...path[0]);for(let j=1;j<=i;j++)gg.lineTo(...path[j]);gg.lineTo(...dot);gg.stroke();gg.setLineDash([]);
    gg.save();gg.shadowColor=PRO.redGlow;gg.shadowBlur=26;circle(gg,dot[0],dot[1],16,PRO.redGlow);gg.restore();
    if(t>2.6){rr(gg,pos[5][0]-74,pos[5][1]-74,148,148,14);gg.strokeStyle=PRO.red;gg.lineWidth=6;gg.stroke();bubble(gg,pos[5][0],pos[5][1]-150,'STILL RUNNING',{size:28,tx:pos[5][0],ty:pos[5][1]-80});}});
  H(g,info.globalT,5);
}});
// G — the porthole: the drum slows and stops; two red eyes open inside; embers rise.
registerShot('G',{draw(g,t,info){
  bg(g);const cam=camAt(t,[[0,{z:1.0}],[info.dur,{z:1.14}]]),spin=t<1.8?t*8-t*t*2:1.8*8-1.8*1.8*2;
  layer(g,cam,1,gg=>{gg.save();gg.translate(960,640+128*2.6-100);gg.scale(2.6,2.6);machine(gg,0,0,1,{glass:t<1.8?'spin':'dark',spin,eyes:ease.out(prog(t,2.2,2.8)),num:6});gg.restore();});
  embers(g,t,{count:30,area:[500,200,920,880],a:.7*prog(t,2.4,3)});
  H(g,info.globalT,6);
}});
// H — the closing line.
registerShot('H',{draw(g,t,info){bg(g);embers(g,t+3,{count:24,a:.4});bigType(g,t,'YOUR LOAD IS DONE.',{size:132});H(g,info.globalT,7);}});
