# Sprout render

Draws Sprout and the Toy Box test scene in 3D with three.js and saves two PNGs. Use it to try a
new hoodie color, body shape or palette before you change every prompt.

Run these from this folder:

```bash
npm init -y && npm install three@0.160.0
```

```bash
node shot.js
```

That writes `sprout-turnaround.png` and `sprout-scene.png` here. Colors are set in
`makeBean()` in `sprout.html`: `body`, `hoodie`, `hair` and `cap`. `shot.js` needs Playwright
installed.
