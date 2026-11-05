# Character render

Draws the hero (Mustard) and a test scene in 3D with three.js and saves two PNGs. Use it to
try new outfit colors before you change every prompt.

Run these from this folder:

```bash
npm init -y && npm install three@0.160.0
```

```bash
node shot.js
```

That writes `render-sheet.png` and `render-scene.png` here. Outfit colors are at the top of
`character.html` in the `P` object. Each person is made with `makePerson({hoodie, pants, hair,
beanie, mood})`, where `mood` is `'flat'` or `'happy'`. `shot.js` needs Playwright installed.
