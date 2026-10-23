// cast.js — outfits for "Can One Person Really Control the Universe?" (v2 look, scenes/look.js).
// The hero's hoodie turns into a two-tone superhero suit as he collects the stones: badge -> gloves + belt -> boots + cape.
const BASE = { top: 'hoodie', color: '#2E72D2', legs: '#2a3140', shoes: '#f6f2ea', hair: 'none' };
// the second colour of the suit (the user, Oct 23: "not blue only, mix it with another colour"); the user picked RED
export const SUITS = {
  red: { trim: '#d8343a', accent: '#ffc93a', gloves: '#d8343a', boots: '#d8343a', cape: '#d8343a', capeIn: '#ffc93a', belt: '#ffc93a', legs: '#24366e' },
  orange: { trim: '#ff7a1a', accent: '#24366e', gloves: '#ff7a1a', boots: '#ff7a1a', cape: '#ff7a1a', capeIn: '#24366e', belt: '#24366e', legs: '#24366e' },
};
const S = SUITS.red;
export const YOU = BASE;                                                                                     // before the stones
export const YOU1 = { ...BASE, emblem: 1 };                                                                  // 1 stone: the badge appears
export const YOU3 = { ...BASE, emblem: 3, trim: S.trim, accent: S.accent, gloves: S.gloves, belt: S.belt, legs: S.legs };   // 3 stones
export const HERO = { ...BASE, ...S, emblem: 6 };                                                            // all six
export const GRANDMA = { top: 'sweater', color: '#c0504d', legs: '#4a4250', shoes: '#c8a070', hair: 'bun' };  // retired astronomer, red cardigan
