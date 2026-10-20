// engine/styles.js — colour moods + switchable visual styles.
// A MOOD is the lighting situation of a location (day, dusk, night, storm, interiors, void).
// A STYLE re-grades every mood (palette overrides + a lift/gamma/gain colour grade on the final frame + post settings).
// grade: contrast (around mid-grey), sat (saturation), lift/gamma/gain per RGB channel (lift tints shadows, gain tints highlights).
// Scenes must take colours from mood()/S() so a style switch re-themes the whole video.

export const BASE_MOODS = {
  day:          { sky: ['#8fb0d8', '#cfdcea', '#efe3d2'], ambient: '#6f7d96', key: '#fff3dc', rim: '#fff1d6', wall: '#8d8496', floor: '#5f5866', dark: '#2f2a36', practical: '#ffe2a8', grass: '#4f8a55', road: '#5d5a66', fog: '#dfe4f0' },
  golden:       { sky: ['#6b5a8e', '#e89a6a', '#f9d49c'], ambient: '#4a3a50', key: '#ffcf8f', rim: '#ffc68a', wall: '#5a3a34', floor: '#45302a', dark: '#2a1814', practical: '#ffe7b0', grass: '#4d6b3c', road: '#4a3c40', fog: '#f0c49a' },
  dusk:         { sky: ['#3d3360', '#8a5a86', '#e8956b', '#f7cf98'], ambient: '#3b2b3d', key: '#ffc68a', rim: '#ffc68a', wall: '#4a3646', floor: '#3d2c38', dark: '#231a27', practical: '#ffd59a', grass: '#3d5a48', road: '#3a3040', fog: '#c08a8a' },
  night:        { sky: ['#0b1028', '#1d2550', '#3a3570'], ambient: '#1e2444', key: '#c9d4ff', rim: '#a9b8ff', wall: '#262a46', floor: '#1b1e33', dark: '#0f1122', practical: '#ffb860', grass: '#22433a', road: '#24263a', fog: '#3a4270' },
  storm:        { sky: ['#141a33', '#2a3358', '#3d4670'], ambient: '#232a48', key: '#dfe6ff', rim: '#cfd9ff', wall: '#2b3150', floor: '#1c2238', dark: '#0d1020', practical: '#bcd0ff', grass: '#25483e', road: '#232838', fog: '#4a5580' },
  interiorWarm: { sky: ['#c98a74', '#f2b585', '#f7cf98'], ambient: '#4a3646', key: '#ffd59a', rim: '#ffcf8f', wall: '#4f3a40', floor: '#3a2a2e', dark: '#21171c', practical: '#ffd28a', grass: '#3d5a48', road: '#3a3040', fog: '#a87a70' },
  interiorCool: { sky: ['#2a3560', '#5a6aa0'], ambient: '#2a2c48', key: '#cbd6ff', rim: '#b8c6ff', wall: '#2e3150', floor: '#22243a', dark: '#121426', practical: '#9fe0ff', grass: '#22433a', road: '#24263a', fog: '#4a5080' },
  void:         { sky: ['#0a0e1a', '#121a2e'], ambient: '#151c30', key: '#ffffff', rim: '#8fb8e8', wall: '#121a2e', floor: '#0d1322', dark: '#070a12', practical: '#ffd47e', grass: '#1d3a33', road: '#151a28', fog: '#1d2740' },
  // HORROR MOODS
  abyss:        { sky: ['#000000', '#050508', '#0a0a10'], ambient: '#0a0a10', key: '#e8e8e8', rim: '#c41e3a', wall: '#141418', floor: '#0a0a0e', dark: '#020204', practical: '#39ff14', grass: '#0a1a10', road: '#0a0a10', fog: '#0a0a14' },
  bloodmoon:    { sky: ['#100000', '#2a0000', '#4a0000', '#6a0000'], ambient: '#1a0000', key: '#e8e0d0', rim: '#ffffff', wall: '#2a0a0a', floor: '#1a0505', dark: '#080000', practical: '#c41e3a', grass: '#1a0a0a', road: '#140808', fog: '#3a0a0a' },
};

const UI = { card: 'rgba(18,28,48,.94)', cardLine: 'rgba(150,180,230,.25)', text: '#9fb6d8', sub: '#6f84a6', accent: '#ff6f61', gold: '#ffd47e', cream: '#fff1dc', blueprint: '#8fb8e8', bpBg: '#0b1324', good: '#5fd39a' };
// HORROR UI — warning text in blood red, sickly accents, high contrast
const HORROR_UI = { card: 'rgba(0,0,0,.96)', cardLine: 'rgba(196,30,58,.35)', text: '#e8e8e8', sub: '#888888', accent: '#c41e3a', warning: '#ff0000', gold: '#39ff14', cream: '#ffffff', blueprint: '#8fb8e8', bpBg: '#0a0e1a', good: '#39ff14' };

export const STYLES = {
  casefile: {
    name:'Skotoma Case File', desc:'Muted blue-charcoal diagrams, outlined white pictograms, yellow attention and selective red/green meaning.',
    ink:'#edf0f3',inkFar:'#bac1ca',feature:'#151a23',rimWidth:0,
    ui:{...HORROR_UI,card:'rgba(18,25,35,.94)',text:'#edf0f3',sub:'#737d8b',gold:'#f4d34e',good:'#50d78c',accent:'#ef334e',warning:'#ef334e',blueprint:'#bac1ca',bpBg:'#141c29'},
    grade:{contrast:1,sat:1,lift:[0,0,0],gamma:[1,1,1],gain:[1,1,1],vignette:.12,grain:.009,bloom:0},
    moods:{interiorCool:{sky:['#111824','#202936'],wall:'#1c2537',floor:'#0c111a',key:'#edf0f3',rim:'#edf0f3',practical:'#f4d34e'},void:{sky:['#101620','#1c2537'],wall:'#1c2537',rim:'#edf0f3'}}
  },
  archive: {
    name:'Skotoma Archive', desc:'Minimal black, white and red protocol graphics. Readable figures, diagram spaces, restrained texture.',
    ink:'#e9e9ed',inkFar:'#999aa6',feature:'#111116',rimWidth:2,
    ui:{...HORROR_UI,card:'rgba(12,12,16,.95)',gold:'#ee2538',blueprint:'#b5b7c2',bpBg:'#08080c'},
    grade:{contrast:1.03,sat:.85,lift:[0,0,0],gamma:[1,1,1],gain:[1,1,1],vignette:.2,grain:.018,bloom:.2},
    moods:{abyss:{key:'#e9e9ed',rim:'#ee2538',wall:'#111116',floor:'#09090d',practical:'#ece9d7'},void:{sky:['#050509','#09090d'],wall:'#101015',rim:'#ee2538'},night:{sky:['#040407','#09090d','#101016'],rim:'#ee2538',practical:'#e9e3c9'}}
  },
  dusk: {
    name: 'Cinematic Dusk', desc: 'Reference look: mauve-purple shadows, amber key light, cream rim light, soft grain, 2:1 letterbox.',
    ink: '#0e0b12', inkFar: '#2b2333', feature: '#f4efe6', rimWidth: 4, ui: UI,
    grade: { contrast: 1.0, sat: 1.0, lift: [0, 0, 0], gamma: [1, 1, 1], gain: [1, 1, 1], vignette: 0.55, grain: 0.055, bloom: 0.55 },
    moods: {},
  },
  midnight: {
    name: 'Midnight Blue', desc: 'Cold navy world, blue-white rim light, sodium-orange practical lights, rain-friendly, higher contrast.',
    ink: '#0a0c16', inkFar: '#232a40', feature: '#eef3ff', rimWidth: 4, ui: { ...UI, accent: '#ff8a5c', gold: '#ffc66e' },
    grade: { contrast: 1.06, sat: 0.8, lift: [0.0, 0.025, 0.09], gamma: [0.92, 0.98, 1.08], gain: [0.84, 0.95, 1.15], vignette: 0.65, grain: 0.06, bloom: 0.7 },
    moods: { dusk: { sky: ['#141a3a', '#2c3470', '#5a5aa0', '#c08aa0'], key: '#d8dcff', rim: '#b8c8ff', wall: '#2a2c4a', floor: '#1e2036' }, golden: { rim: '#ffd6a8' }, interiorWarm: { wall: '#3a3448', sky: ['#5a5a90', '#c09ab0'] } },
  },
  golden: {
    name: 'Golden Hour', desc: 'Warm orange-and-teal daylight, big sun glows, brighter mid-tones, warm cream rim light.',
    ink: '#120c0a', inkFar: '#3a2a26', feature: '#fff6e6', rimWidth: 4.5, ui: { ...UI, card: 'rgba(30,26,40,.92)', accent: '#ff7a4a' },
    grade: { contrast: 1.04, sat: 1.18, lift: [0.035, 0.015, 0.0], gamma: [1.1, 1.04, 0.94], gain: [1.12, 1.02, 0.8], vignette: 0.45, grain: 0.045, bloom: 0.75 },
    moods: { night: { sky: ['#14183a', '#2e2c5a', '#6a4a6a'], rim: '#ffcf9a' }, dusk: { sky: ['#4a3a6a', '#d0786a', '#f2a46a', '#fbd8a0'] } },
  },
  neon: {
    name: 'Neon Noir', desc: 'Deep blacks, magenta + teal two-tone rim lights, glowing signage, strong bloom, cool shadows.',
    ink: '#07060c', inkFar: '#1e1830', feature: '#f6f0ff', rimWidth: 4, ui: { ...UI, card: 'rgba(14,10,28,.94)', cardLine: 'rgba(200,120,255,.3)', text: '#c9a8ff', accent: '#ff4fa3', gold: '#5ff2e8', blueprint: '#7fe8ff' },
    grade: { contrast: 1.15, sat: 1.4, lift: [0.01, 0.0, 0.04], gamma: [1.0, 0.9, 1.06], gain: [1.12, 0.86, 1.18], vignette: 0.7, grain: 0.06, bloom: 0.9 },
    moods: { dusk: { sky: ['#120a2a', '#3a1a5a', '#a03a8a', '#ff7a9a'], rim: '#ff6ac8', key: '#ff8ad0', practical: '#5ff2e8' }, night: { sky: ['#06061a', '#140f3a', '#2a1a5a'], rim: '#5ff2e8', practical: '#ff4fa3' }, interiorWarm: { rim: '#ff7ab8', practical: '#5ff2e8', wall: '#2a1e3a' }, day: { rim: '#7ff0ff' } },
  },
  storybook: {
    name: 'Soft Storybook', desc: 'Lighter pastel palette, lower contrast, lavender shadows, gentle paper grain — friendlier, family tone.',
    ink: '#1a1622', inkFar: '#4a4258', feature: '#fffaf0', rimWidth: 5, ui: { ...UI, card: 'rgba(40,36,60,.9)', accent: '#ff8a7a', gold: '#ffd98a' },
    grade: { contrast: 0.92, sat: 0.92, lift: [0.07, 0.055, 0.085], gamma: [1.12, 1.1, 1.06], gain: [1.06, 1.03, 0.98], vignette: 0.3, grain: 0.07, bloom: 0.45 },
    moods: { night: { sky: ['#2a2f5a', '#4a4f80', '#6a6aa0'], wall: '#3e4266' }, dusk: { sky: ['#6a5a90', '#c08aa8', '#f2b0a0', '#fbe0b8'] } },
  },
  // ===== HORROR STYLES =====
  abyss: {
    name: 'Deep Abyss', desc: 'DEFAULT HORROR: pure black shadows, blood-red rim lights, sickly green practicals, crushed contrast, heavy vignette. Maximum dread.',
    ink: '#000000', inkFar: '#1a0a10', feature: '#e8e8e8', rimWidth: 5, ui: HORROR_UI,
    grade: { contrast: 1.25, sat: 0.5, lift: [0.0, 0.0, 0.0], gamma: [0.9, 0.92, 0.95], gain: [0.9, 0.85, 0.88], vignette: 0.8, grain: 0.08, bloom: 0.4 },
    moods: { abyss: {}, night: { rim: '#c41e3a', practical: '#39ff14', sky: ['#000000', '#050508', '#0a0a10'] }, dusk: { rim: '#c41e3a', key: '#888888' }, interiorCool: { rim: '#c41e3a', practical: '#39ff14' }, interiorWarm: { rim: '#c41e3a', wall: '#1a0a0a' }, void: { rim: '#c41e3a' } },
  },
  bloodmoon: {
    name: 'Blood Moon', desc: 'Deep crimson tint everywhere, black shadows, white rims, moon-glow practicals. For night encounters and animal uncanny.',
    ink: '#000000', inkFar: '#2a0000', feature: '#f0e8d8', rimWidth: 5, ui: { ...HORROR_UI, gold: '#ffffff' },
    grade: { contrast: 1.2, sat: 0.7, lift: [0.02, 0.0, 0.0], gamma: [1.0, 0.92, 0.88], gain: [1.15, 0.85, 0.8], vignette: 0.75, grain: 0.07, bloom: 0.5 },
    moods: { bloodmoon: {}, night: { sky: ['#100000', '#2a0000', '#4a0000'], rim: '#ffffff', practical: '#c41e3a' }, dusk: { sky: ['#2a0000', '#6a0000', '#a00000'], rim: '#ffffff' } },
  },
  // midnight already exists above (enhanced for horror use)
  neondread: {
    name: 'Neon Dread', desc: 'Deep blacks, magenta and sickly acid-green rims, strong bloom. Technology horror, phone/TV uncanny, digital wrongness.',
    ink: '#05040a', inkFar: '#1a0a20', feature: '#f0e8ff', rimWidth: 4, ui: { ...HORROR_UI, warning: '#ff4fa3', gold: '#39ff14' },
    grade: { contrast: 1.2, sat: 1.1, lift: [0.01, 0.0, 0.01], gamma: [0.95, 0.9, 0.95], gain: [1.0, 0.85, 1.0], vignette: 0.75, grain: 0.065, bloom: 0.95 },
    moods: { night: { sky: ['#050510', '#0a0a20', '#150a2a'], rim: '#39ff14', practical: '#ff4fa3' }, interiorCool: { rim: '#ff4fa3', practical: '#39ff14', wall: '#0a0518' }, abyss: { rim: '#39ff14', practical: '#ff4fa3' } },
  },
  vhsnightmare: {
    name: 'VHS Nightmare', desc: 'Analog horror: desaturated, crushed blacks, heavy grain, scan lines feel, slight colour bleed. Found footage aesthetic.',
    ink: '#000000', inkFar: '#1a1a1a', feature: '#d8d8d8', rimWidth: 3.5, ui: { ...HORROR_UI, warning: '#e02020', text: '#c8c8c8' },
    grade: { contrast: 1.35, sat: 0.3, lift: [0.0, 0.005, 0.0], gamma: [0.88, 0.9, 0.92], gain: [0.95, 0.92, 0.9], vignette: 0.65, grain: 0.06, bloom: 0.3, scanlines: 0.07, static: 0.035 },
    moods: { night: { sky: ['#000000', '#0a0a0a', '#141414'], rim: '#c8c8c8', practical: '#a00000' }, interiorCool: { rim: '#b0b0b0', practical: '#880000' }, abyss: { rim: '#a0a0a0' } },
  },
};
export const STYLE_IDS = Object.keys(STYLES);
