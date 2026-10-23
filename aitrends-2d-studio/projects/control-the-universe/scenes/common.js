// common.js — camera and small helpers shared by the shot files.
import { E, ease, clamp, lerp, rr, seg, circle, poly, alpha, glow } from '/engine/core.js';
import { speech } from './ui.js';

export const RIM = { color: '#ffd8a8', dir: [-0.7, -0.6] };
export const NIGHT_RIM = { color: '#a8c0ff', dir: [0.6, -0.6] };
export const F = (px, py, z) => ({ x: px - E.W / 2, y: py - E.H / 2, z });                 // camera centred on (px, py)
export const push = (t, dur, a, b) => { const k = ease.inOut(clamp(t / dur)); return { x: lerp(a.x, b.x, k), y: lerp(a.y, b.y, k), z: lerp(a.z, b.z, k) }; };
export const lerpPose = (a, b, k) => { const o = {}; for (const n in a) o[n] = [lerp(a[n][0], b[n][0], k), lerp(a[n][1], b[n][1], k)]; return o; };
export const talkOf = (who, info) => speech(who, info.globalT, 0)?.talk || 0;
export const DAD = { top: 'tshirt', color: '#5C6370', legs: '#2a2f3a', shoes: '#3a3a44', hair: 'cap', capColor: '#F2C21A' };
export const KID = { top: 'tshirt', color: '#2E72D2', legs: '#2a3140', shoes: '#f6f2ea', hair: 'none' };
export const VET = { top: 'tshirt', color: '#2aa89a', legs: '#2aa89a', shoes: '#f6f2ea', hair: 'bun' };
export const SCI = { top: 'tshirt', color: '#e8e8f0', legs: '#3a3a48', shoes: '#3a3a44', hair: 'none' };
export const KIDS = ['#d84a3a', '#8a5ad6', '#3fa06a', '#f2c21a', '#e8892a', '#2a9ab0'].map((c, i) => ({ top: 'tshirt', color: c, legs: '#2a2f3a', shoes: '#f6f2ea', hair: ['none', 'bun', 'spiky', 'none', 'cap', 'bun'][i], capColor: '#3a3a44' }));

export function bacon(g, x, y, s = 1) { g.save(); g.translate(x, y); g.scale(s, s); g.strokeStyle = '#b8402c'; g.lineWidth = 16; g.lineCap = 'round'; g.beginPath(); g.moveTo(-50, 0); g.bezierCurveTo(-20, -18, 10, 18, 50, 0); g.stroke(); g.strokeStyle = '#f2c8a0'; g.lineWidth = 5; g.beginPath(); g.moveTo(-46, 0); g.bezierCurveTo(-18, -14, 10, 14, 46, 0); g.stroke(); g.restore(); }
export function peanut(g, x, y, s = 1, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.fillStyle = '#d8a860'; g.beginPath(); g.ellipse(-8, 0, 11, 9, 0, 0, Math.PI * 2); g.ellipse(8, 0, 11, 9, 0, 0, Math.PI * 2); g.fill(); g.fillStyle = '#c8985a'; g.fillRect(-2, -6, 4, 12); g.restore(); }
export function cup(g, x, y, s = 1, rot = 0, col = '#f2c21a') { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); rr(g, -26, -60, 52, 60, 8); g.fillStyle = col; g.fill(); g.strokeStyle = col; g.lineWidth = 8; g.beginPath(); g.arc(28, -32, 14, -1.2, 1.2); g.stroke(); g.restore(); }
export function sandwich(g, x, y, s = 1) { g.save(); g.translate(x, y); g.scale(s, s); poly(g, [[-40, 0], [40, 0], [0, -46]], '#e8c890'); g.fillStyle = '#6aa04a'; g.fillRect(-36, -8, 72, 6); g.fillStyle = '#d84a3a'; g.fillRect(-30, -14, 60, 5); g.restore(); }
export function key(g, x, y, s = 1, rot = 0) { g.save(); g.translate(x, y); g.rotate(rot); g.scale(s, s); g.strokeStyle = '#F2C21A'; g.lineWidth = 6; g.beginPath(); g.arc(0, 0, 12, 0, Math.PI * 2); g.stroke(); seg(g, [[12, 0], [52, 0]], 6, '#F2C21A'); seg(g, [[40, 0], [40, 12]], 5, '#F2C21A'); seg(g, [[50, 0], [50, 10]], 5, '#F2C21A'); g.restore(); }
export function babyBundle(g, x, y, s = 1, t = 0) { g.save(); g.translate(x, y); g.scale(s, s); g.fillStyle = '#9ac8f0'; g.beginPath(); g.ellipse(0, 0, 46, 30, -0.2, 0, Math.PI * 2); g.fill(); circle(g, 38, -14, 22, '#16121a'); circle(g, 44, -18, 4, '#f6f2ea'); circle(g, 52, -18, 4, '#f6f2ea'); g.strokeStyle = '#f6f2ea'; g.lineWidth = 3; g.beginPath(); g.arc(48, -8, 5 + Math.sin(t * 6), 0.2, Math.PI - 0.2); g.stroke(); g.restore(); }
export function confetti(g, t, seed = 3, n = 60) { for (let i = 0; i < n; i++) { const a = (i * 2.399) % (Math.PI * 2), r = ((i * 137) % 900) + t * 60, x = E.W / 2 + Math.cos(a) * r, y = E.H / 2 + Math.sin(a) * r * 0.6 + t * 80; g.save(); g.translate(x, y); g.rotate(t * 3 + i); g.fillStyle = ['#ff6f61', '#ffd47e', '#5fd39a', '#8fd0ff'][i % 4]; g.fillRect(-8, -4, 16, 8); g.restore(); } }
