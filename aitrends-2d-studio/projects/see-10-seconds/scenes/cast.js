// cast.js — one outfit per recurring character. Signature colour = identity; keep it identical in every shot.
export const YOU = { top: 'hoodie', color: '#2E72D2', legs: '#1F242D', head: 'none' };                       // "you": royal-blue hoodie
export const YOU_GK = { ...YOU, gloves: '#D29F34' };                                                         // in goal: gold gloves
export const MIA = { top: 'tracksuit', color: '#E2684A', color2: '#1e2540', legs: '#262a3e', head: 'ponytail', headColor: '#E2684A' }; // coral jacket
// extras: plain ink, no colour item
export const CYCLIST = { top: 'none', head: 'none' };
export const FRIEND = { top: 'none', head: 'cap', headColor: '#4a4e5e' };
export const FRIEND2 = { top: 'none', head: 'curly' };
export const FRIEND3 = { top: 'none', head: 'bun' };
export const TEACHER = { top: 'none', head: 'bun', face: 'glasses' };
export const KID = { top: 'none', head: 'spiky' };
export const STRIKER = { top: 'jersey', color: '#3a3e4c', color2: '#9aa0b4', number: '9', head: 'none' };
export const WAITER = { top: 'labcoat', head: 'none' };
export const PITCHER = { top: 'jersey', color: '#3a3e4c', color2: '#9aa0b4', number: '21', head: 'cap', headColor: '#3a3e4c' };
export const CAST = [YOU, MIA, STRIKER, TEACHER, WAITER, FRIEND];
