import { E,registerShot,text } from '/engine/core.js';
import { bigFace } from '/engine/rig2d.js';
import * as UI from '/engine/ui2d.js';
import * as FX from '/engine/fx2d.js';
registerShot('test001',{draw(g,t){
 g.fillStyle='#08080c';g.fillRect(0,0,E.W,E.H);
 if(t<1){
  ['dead','empty','stare','too_wide_smile','frown','slight_smile','terrified','calm_wrong','no_face','blank'].forEach((expr,i)=>{
   const x=E.W*(.1+(i%5)*.2),y=E.H*(i<5?.24:.65);
   bigFace(g,x,y,78,{expr,rimColor:'#ee2538'});
   text(g,expr,x,y+150,{size:26,font:'Nunito',color:'#ffffff'});
  });
 }else if(t<2)UI.warningCard(g,t-1,{str:'DO NOT LOOK',label:'ENGINE CHECK',dur:1});
 else if(t<3)UI.protocolStep(g,t-2,{number:3,str:'KEEP THE LIGHT ON',dur:1});
 else if(t<4)UI.fieldReport(g,t-3,{title:'SIGNAL REPORT',lines:['VISIBLE PEOPLE: 1','SENSOR COUNT: 2'],dur:1});
 else{
  UI.glitchText(g,t-4,{str:'COUNT MISMATCH',dur:1});
  FX.static(g,t,{count:300,a:.15});FX.scanlines(g,t,{a:.08});FX.glitch(g,t,{strength:15,bands:10});
 }
}});
