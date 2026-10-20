import {E,registerShot,circle,text} from '/engine/core.js';
import * as P from '/engine/pictogram2d.js';
import {phraseCaptions} from '/engine/ui2d.js';
registerShot('p001',{draw(g,t){P.background(g,t);P.hud(g,t,{title:'ORIGINAL ASSET CHECK'});
 if(t<1){['stand','reach','crouch','sit','recoil'].forEach((pose,i)=>P.human(g,{x:230+i*360,y:480,s:1,pose,label:pose.toUpperCase()}));['stand','sit','lie'].forEach((pose,i)=>P.dog(g,{x:390+i*570,y:890,s:1.1,pose,alert:i===0?1:0}));}
 else if(t<2){P.portrait(g,{x:360,y:490});P.portrait(g,{x:960,y:490,uncanny:.9});P.portrait(g,{x:1560,y:490,kind:'dog',anger:1});}
 else if(t<3){P.evidenceCard(g,{x:480,y:500,title:'BEFORE',subtitle:'STATIONARY',status:true,draw(gg){P.dog(gg,{x:0,y:70,s:.8});}});P.evidenceCard(g,{x:1440,y:500,title:'AFTER',subtitle:'MOVEMENT',status:false,draw(gg){P.human(gg,{x:0,y:65,s:.48,wardrobe:'coat'});}});const pos=P.trajectory(g,{from:[750,570],to:[1170,570],progress:t-2});circle(g,...pos,14,P.COLORS.yellow);}
 else if(t<4)P.ruleTitle(g,t-3,{number:2,total:5,title:'DO NOT TURN AROUND'});
 else{P.human(g,{x:960,y:790,pose:P.poseBetween('stand','reach',(t-4)),s:1.2});const old=E.phrases;E.phrases=[{start:4,end:5,text:'A LONGER PHRASE STILL FITS ON TWO READABLE LINES.',highlight:['READABLE'],highlightColor:P.COLORS.yellow}];phraseCaptions(g,t,{size:50,width:.7});E.phrases=old;}
}});
