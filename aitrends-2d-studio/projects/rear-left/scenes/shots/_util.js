// Shared helpers for the Rear Left shots (not a shot module: files starting with _ are not auto-loaded).
import {E,clamp,ease,prog,lerp} from '/engine/core.js';
import {header} from '../sets/car.js';

// Local start time of a spoken word in this shot (params.w from audio/build_timeline.py); n = which occurrence.
export function cue(info,word,n=0,fallback=0){
  const key=word.toLowerCase().replace(/[^a-z0-9']/g,'');let i=0;
  for(const [w,a] of info.w||[])if(w===key&&i++===n)return a;
  return fallback;
}
export const cueEnd=(info,word,n=0,fallback=0)=>{const key=word.toLowerCase().replace(/[^a-z0-9']/g,'');let i=0;for(const [w,,b] of info.w||[])if(w===key&&i++===n)return b;return fallback;};
const LABEL=[[4,'RULE 1'],[9,''],[10,'10 MIN EARLIER'],[15,'RULE 2'],[23,'RULE 3'],[30,'RULE 4'],[38,'RULE 5'],[47,'RULE 6'],[56,'RULE 7'],[65,'']];
export function hdr(g,info){const n=+info.shot.id.slice(2);let l='';for(const [k,v] of LABEL)if(n>=k)l=v;if(n!==9)header(g,l);}
export const ramp=(t,a,b)=>ease.inOut(prog(t,a,b));
// Piecewise keyframes on numbers: keys [[t,v],...]
export function keyV(t,keys){let v=keys[0][1];for(let i=1;i<keys.length;i++){const [t0,a]=keys[i-1],[t1,b]=keys[i];if(t>=t0)v=lerp(a,b,ease.inOut(prog(t,t0,t1)));}return v;}
export const memory=(g,fn)=>{g.save();g.filter='saturate(.45) brightness(.92)';fn();g.restore();};
