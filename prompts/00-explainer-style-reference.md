# Style reference — vibrant animated-explainer look

Measured from the reference "Lock In" video the owner supplied (69s, 16:9, 16 hard cuts).
**This replaces the dark, faceless, minimal style** in
[`00-vector-shorts-director.md`](00-vector-shorts-director.md) wherever the two disagree.
Generate original scenes in this style. Do not reuse frames or recreate the reference's
specific characters.

## What the reference does

| Element | Reference |
|---|---|
| Scenes | Full illustrated environments: a gym, a living room, a kitchen, an office, space, a city, a landscape at night. Every frame is full of props. |
| Characters | Cartoon people and creatures with simple, expressive faces (eyes, brows, mouths). Rounded bodies, big readable poses. |
| Color | Highly saturated. Electric purple and royal blue base, with teal, lime green, hot pink, orange and warm yellow. Bright backgrounds are fine: yellow, orange, mint. |
| Light | Soft gradient lighting, diagonal light beams, glows, star trails, hyperspace streaks. Flat shapes, but lit. |
| Shot length | About 4.3s average. Each shot holds while something *acts* inside it (a character moves, objects fly, a starfield turns). |
| Motion energy | Medium to high: explosions, flying papers, sparkle bursts, melting clocks, speed lines. Matches the urgency of the voice. |
| Camera | Mostly static framing. Motion comes from the animation, plus occasional drift or speed effects. |
| Text | **Every spoken word** gets its own card. Huge, bold, rounded geometric sans, dead center. Colors rotate (lime green, cream, yellow, coral, blue), often with a blend or knockout effect so the image shows through the letters. One word at a time, timed to the syllable. |

## Prompt template (keyframe image)

```
Vibrant 2D flat vector cartoon illustration in a polished modern animated-explainer
style, 9:16 vertical portrait. [CHARACTER with expressive cartoon face] [ACTION] in
[DETAILED ENVIRONMENT]. Highly saturated palette: [2-3 base colors] with [accents].
Rich background detail: [4-5 props]. Clean geometric shapes, smooth flat colors with
soft gradient lighting, [light effect]. Character in the lower half of the frame,
upper-middle area kept calm for a large caption. No text, no letters, no logos,
no photorealism, no 3D render.
```

## Prompt template (animate the keyframe)

```
2D flat vector cartoon animation, 9:16 vertical, static framing. [CHARACTER] [ONE
CLEAR ACTION, a full 2-4 seconds of acting]. [Secondary motion: background element
moving]. Smooth, lively, polished motion-graphics animation, flat colors preserved,
character face stays consistent. No camera zoom, no text, no 3D, no photorealism.
```

## Keep from the original brief

- 9:16 vertical, 1080x1920. Never ship horizontal (the reference is 16:9; ours is not).
- Kinetic text and SFX are added in the edit, never generated into the clip.
- Turn on TikTok's AI-generated content label.
