// dash-v1: the instrument cluster (tracker), the overhead console with the passenger-airbag lamp, and the cards.
// The cluster is drawn in its own 1920x1080 design space; a view {cx,cy,z} frames it for each ECU.
import {E,text,circle,seg,poly,rr,alpha,clamp,lerp,ease,prog,glow} from '/engine/core.js';
import {K,FONT,line} from './car.js';

export const CL={spd:[600,560],r:300,door:[1330,470],gear:[1470,780],lock:[1680,780]};
export const mphAng=v=>Math.PI*.75+clamp(v/140)*Math.PI*1.5;
const DOORS={fl:[[-92,-92],[-92,-2]],rl:[[-92,8],[-92,98]],fr:[[92,-92],[92,-2]],rr:[[92,8],[92,98]]};

export function withView(g,view,fn){
  g.save();g.translate(E.W/2,E.H/2);g.scale(view.z,view.z);g.translate(-view.cx,-view.cy);fn();g.restore();
}
// st: {mph, digits, doors:{fl,fr,rl,rr} 0..1, ajar:0..1 (RL panel drawn swung out), seat:0..1 (rear-left belt warning),
//      lock:0..1 (padlock shown), open:0..1 (padlock open), gear:'D', bright:1, sweep:{k,u}}
export function cluster(g,st={},view={cx:960,cy:540,z:1}){
  const b=st.bright??1,L=a=>alpha(K.white,a*b);
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  withView(g,view,()=>{
    rr(g,150,170,1620,760,130);g.fillStyle='#06070b';g.fill();g.strokeStyle=L(.35);g.lineWidth=3;g.stroke();
    glow(g,960,560,900,K.dash,.07*b);
    // Speedometer.
    const [sx,sy]=CL.spd,r=CL.r;
    g.lineCap='round';g.strokeStyle=L(.75);g.lineWidth=6;g.beginPath();g.arc(sx,sy,r,Math.PI*.75,Math.PI*2.25);g.stroke();
    for(let v=0;v<=140;v+=5){const a=mphAng(v),big=v%20===0,l=big?34:16;
      seg(g,[[sx+Math.cos(a)*(r-6),sy+Math.sin(a)*(r-6)],[sx+Math.cos(a)*(r-6-l),sy+Math.sin(a)*(r-6-l)]],big?5:3,L(big?.85:.45));
      if(big)text(g,String(v),sx+Math.cos(a)*(r-78),sy+Math.sin(a)*(r-78),{size:30,font:FONT,weight:800,color:L(.8)});}
    const mph=st.mph??0,a=mphAng(mph);
    g.save();g.shadowColor=alpha(K.dash,.8*b);g.shadowBlur=14;seg(g,[[sx-Math.cos(a)*30,sy-Math.sin(a)*30],[sx+Math.cos(a)*(r-24),sy+Math.sin(a)*(r-24)]],8,alpha('#f6f8fb',b));g.restore();
    circle(g,sx,sy,28,'#0d0f14');g.strokeStyle=L(.6);g.lineWidth=3;g.beginPath();g.arc(sx,sy,28,0,Math.PI*2);g.stroke();
    text(g,String(st.digits??Math.round(mph)),sx,sy+130,{size:64,font:FONT,weight:800,color:L(.95)});
    text(g,'mph',sx,sy+180,{size:30,font:FONT,weight:800,color:L(.6)});
    // Door + seat diagram: the car from above, nose up.
    const [dx,dy]=CL.door;g.save();g.translate(dx,dy);
    rr(g,-92,-200,184,400,64);g.strokeStyle=L(.75);g.lineWidth=4;g.stroke();
    seg(g,[[-70,-128],[70,-128]],3,L(.45));seg(g,[[-66,140],[66,140]],3,L(.45));
    const seat=(x,y,w,h,on)=>{rr(g,x-w/2,y-h/2,w,h,12);g.fillStyle=on>0?alpha(K.red,.85*on):'rgba(0,0,0,0)';g.fill();g.strokeStyle=on>0?alpha(K.red,on):L(.35);g.lineWidth=3;g.stroke();};
    seat(-42,-52,58,70,0);seat(42,-52,58,70,0);seat(0,64,44,58,0);seat(52,64,44,58,0);
    const so=st.seat??0;seat(-52,64,44,58,so);
    if(so>0){g.save();g.globalAlpha*=so;seg(g,[[-70,44],[-54,62]],5,K.white);seg(g,[[-48,70],[-34,86]],5,K.white);g.restore();glow(g,-52,64,60,K.red,.35*so);}
    for(const [k,[p0,p1]] of Object.entries(DOORS)){
      const on=st.doors?.[k]??0;let q1=p1;
      if(k==='rl'&&(st.ajar??0)>0){const ang=(st.ajar)*.32;q1=[p0[0]-Math.sin(ang)*90,p0[1]+Math.cos(ang)*90];}
      seg(g,[p0,q1],on>0?10:6,on>0?alpha(K.red,lerp(.35*b,1,on)):L(.3));
      if(on>0){g.save();g.globalCompositeOperation='lighter';glow(g,(p0[0]+q1[0])/2,(p0[1]+q1[1])/2,70,K.red,.45*on);g.restore();}
    }
    g.restore();
    // Gear readout and padlock, bottom right.
    const [gx,gy]=CL.gear;['P','R','N','D'].forEach((c,i)=>text(g,c,gx-96+i*48,gy,{size:34,font:FONT,weight:800,color:c===(st.gear||'D')?L(.95):L(.25)}));
    const lk=st.lock??1;if(lk>0){const [lx,ly]=CL.lock,op=st.open??0;g.save();g.globalAlpha*=lk;
      rr(g,lx-22,ly-8,44,34,7);g.fillStyle=L(.9);g.fill();g.strokeStyle=L(.9);g.lineWidth=6;g.beginPath();g.arc(lx+op*16,ly-12-op*10,15,Math.PI,op>.5?Math.PI*1.65:0);g.stroke();
      if(op<=.5)seg(g,[[lx-15,ly-12],[lx-15,ly-6]],6,L(.9));g.restore();}
    // Sodium lamps passing reflect as a diagonal sheen on the cluster glass.
    if(st.sweep&&st.sweep.k>0){g.save();g.globalCompositeOperation='lighter';const x=lerp(-200,2200,st.sweep.u);
      const gr=g.createLinearGradient(x-260,0,x+260,0);gr.addColorStop(0,alpha(K.sodium,0));gr.addColorStop(.5,alpha(K.sodium,.13*st.sweep.k));gr.addColorStop(1,alpha(K.sodium,0));
      g.fillStyle=gr;g.beginPath();g.moveTo(x-200,170);g.lineTo(x+60,170);g.lineTo(x-140,930);g.lineTo(x-400,930);g.closePath();g.fill();g.restore();}
  });
}

// Overhead console: dome lamp, dome switch, the passenger-airbag status lamp and the mirror stem.
// st: {pab:0 (OFF) .. 1 (ON), dome:0..1, thumb:[x,y]|null}
export function overhead(g,st={},view={cx:960,cy:420,z:1}){
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  withView(g,view,()=>{
    poly(g,[[0,0],[1920,0],[1920,520],[0,560]],K.cabin);seg(g,[[0,560],[1920,520]],2,line(.2));
    rr(g,560,90,800,360,60);g.fillStyle='#0b0d13';g.fill();g.strokeStyle=line(.4);g.lineWidth=3;g.stroke();
    const dm=st.dome??0;rr(g,780,130,360,120,30);g.fillStyle=dm>0?alpha('#ffe2b8',.25+.7*dm):'#121520';g.fill();g.strokeStyle=line(.45);g.lineWidth=2;g.stroke();
    if(dm>0){g.save();g.globalCompositeOperation='lighter';glow(g,960,190,700,'#ffc98a',.45*dm);g.restore();}
    // Dome switch (rocker) right of the lamp.
    rr(g,1190,290,110,80,16);g.fillStyle='#10131a';g.fill();g.strokeStyle=line(.55);g.lineWidth=2.5;g.stroke();seg(g,[[1215,330],[1275,330]],3,line(.35));
    // Passenger-airbag status lamp: OFF lit amber, or ON lit amber.
    const pab=st.pab??0;rr(g,600,280,520,120,18);g.fillStyle='#07080c';g.fill();g.strokeStyle=line(.4);g.lineWidth=2;g.stroke();
    circle(g,648,318,12,alpha(K.white,.55));seg(g,[[640,334],[634,372],[662,372]],9,alpha(K.white,.55));circle(g,676,326,16,'rgba(0,0,0,0)');g.strokeStyle=alpha(K.white,.55);g.lineWidth=3;g.beginPath();g.arc(672,330,18,-1,1);g.stroke();
    text(g,'PASSENGER AIRBAG',715,316,{size:28,font:FONT,weight:800,color:alpha(K.white,.55),align:'left'});
    const lamp=(str,x,on)=>{text(g,str,x,366,{size:32,font:FONT,weight:800,color:on?K.amber:alpha(K.white,.18),align:'left'});if(on){g.save();g.globalCompositeOperation='lighter';glow(g,x+28,366,60,K.amber,.5);g.restore();}};
    lamp('ON',720,pab>.5);lamp('OFF',800,pab<=.5);
    // Mirror stem down to the mirror (tilted up at the roof since SC39).
    seg(g,[[960,450],[960,560]],16,'#0b0d12');seg(g,[[960,450],[960,560]],2,line(.3));
    g.save();g.translate(960,620);g.rotate(-.1);rr(g,-230,-62,460,124,52);g.fillStyle='#0b0d12';g.fill();g.strokeStyle=line(.5);g.lineWidth=3;g.stroke();g.restore();
    if(st.thumb){const [x,y]=st.thumb;seg(g,[[x+40,1150],[x,y+40]],60,K.white);rr(g,x-30,y-36,60,90,30);g.fillStyle=K.white;g.fill();}
  });
}

// Rule card: boxed numeral, RULE heading (96 px) and one command line (44 px), over the scene behind it.
export function ruleCard(g,t,n,cmd,bg){
  if(bg)bg();
  g.fillStyle='rgba(4,5,8,.78)';g.fillRect(0,0,E.W,E.H);
  const k=ease.out(prog(t,0,.35)),y=E.H*.44+(1-k)*24;
  g.save();g.globalAlpha*=k;
  text(g,'RULE',E.W/2-70,y,{size:96,font:FONT,weight:900,color:K.white,spacing:6});
  rr(g,E.W/2+120,y-62,124,124,14);g.strokeStyle=K.white;g.lineWidth=6;g.stroke();
  text(g,String(n),E.W/2+182,y+4,{size:96,font:FONT,weight:900,color:K.white});
  const lines=Array.isArray(cmd)?cmd:[cmd];lines.forEach((l,i)=>text(g,l,E.W/2,y+128+i*58,{size:44,font:FONT,weight:800,color:alpha(K.white,.9),spacing:2}));
  g.restore();
}
export function titleCard(g,t){
  g.fillStyle=K.bg;g.fillRect(0,0,E.W,E.H);
  const k=ease.out(prog(t,.5,1.1));if(k<=0)return;
  g.save();g.globalAlpha*=k;
  text(g,'WRONG KNOCK',E.W/2,E.H*.33,{size:34,font:FONT,weight:800,color:alpha(K.white,.45),spacing:8});
  text(g,'IF YOUR CAR SAYS THE DOOR',E.W/2,E.H*.47,{size:84,font:FONT,weight:900,color:K.white,spacing:2});
  text(g,'BEHIND YOU IS OPEN',E.W/2,E.H*.47+100,{size:84,font:FONT,weight:900,color:K.white,spacing:2});
  g.restore();
}
