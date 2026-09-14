# 11. Animating a shot without wrecking it

Doc 10 keeps the character the same from shot to shot. This one keeps them the same
*within* a shot, once it starts moving — and stops the motion from becoming the thing that
makes the video look generated.

Motion is not optional here. Doc 03's auto-fail list includes *"slideshow of still images
with no motion"*. But the failure on the other side is just as expensive: a clip where
everything moves at once is unusable in the edit, and you paid for it.

---

## The animation prompt formula

```
Animate the existing scene while preserving the character's identity and appearance.
The [character] [specific action]. Its [head / eyes / body] move naturally as it reacts.
The camera [subtle camera movement]. Keep the environment stable.
Do not redesign the character or introduce new objects.
```

Four jobs, in order: **preserve → one action → one camera move → forbid drift.**

The last line is the one people leave out, and it is the one doing the most work. Left
unsaid, the model treats the scene as an invitation: a new lamp appears, the coat changes
length, a second figure walks in at second three. Say *do not redesign the character or
introduce new objects* every time.

---

## Specific and restrained beats cinematic and vague

This is the whole craft of animation prompting, and it is one comparison:

| Vague | Specific |
|---|---|
| *an exciting cinematic animation* | *turns its head, looks toward the other character, raises one wing, then reacts* |

The second one you can direct, judge and re-roll. The first one you can only accept or
throw away — you have no idea which word produced the result, so you cannot fix it.

**Name the body parts.** Head, eyes, shoulders, hands. "Reacts emotionally" is not a
direction; "eyes drop, head turns slightly away" is. This is the same move doc 07 makes for
stills — emotions are invisible, bodies are visible — applied to motion.

---

## Why restraint matters

AI animation gets messy when you ask for several things at once. The reliable unit is:

> **One clear character action + one controlled camera move.**

That clip is easy to cut, easy to trim, easy to loop, and easy to re-roll when it comes
out wrong. A clip where the character moves, the camera orbits, the light shifts and the
background animates is none of those things — even when it looks impressive, you cannot
place it, because nothing in it holds still long enough to cut against.

Restraint is also cheaper. Most of a re-roll budget is spent on clips that did four things
and got one of them wrong.

---

## Camera move vocabulary

Pick one per shot. These are the ones that survive generation:

| Move | Use it for | Note |
|---|---|---|
| **Static, internal motion only** | Close-ups, hands, faces | The safest. Motion comes from the subject, not the frame |
| **Slow push in** | Building pressure, a turn, a realization | The default for escalation beats |
| **Slow pull back** | A reveal of context — the whole floor was empty | Script 02's beat 13 |
| **Slow pan** | Following a body across a space | Keep it short; pans drift |
| **Gentle handheld drift** | Memory, unease | Easy to overdo. Barely perceptible is correct |

Avoid: orbits, crash zooms, drone moves, whip pans. They read as generated, they fight
your cut, and they are the first thing a viewer registers as AI.

**Matched shots need matched cameras.** Script 02's beats 1 and 22 are the same bench seen
twice. Same framing, same move, same duration, or the return does not land.

---

## Applying it to Script 02

The shots divide cleanly by type:

| Shot type | Beats | Animation direction |
|---|---|---|
| Face / close-up | 2, 10, 20, 21 | Static camera. Eyes and one small movement only |
| Hands / objects | 3, 4, 7, 11, 14, 16, 18 | Static camera. One action, completed — coins go down, bread tears |
| Wide / alone | 12, 13, 15, 19 | Slow pull back, or static. The emptiness is the subject |
| Bench (matched pair) | 1, 22 | Static, identical framing. Only the light and the second figure change |
| Arrivals | 17 | Static. Birds land; the camera does not follow them |

Beat 8 is worth calling out: *"I laughed. That was the mistake."* The direction is
shoulders rising and falling twice, seen from behind, and **nothing else** — no head, no
turn, no camera move. A single restrained action carries the most important turn in the
script. Ask for more and you will get a clip you cannot use.

---

## Checklist before you accept a generated clip

- [ ] The character is still the same character at the end of the clip as the start.
- [ ] Exactly one character action, and it completes inside the clip.
- [ ] Exactly one camera move, and it is slower than you would have guessed.
- [ ] Nothing new entered the frame.
- [ ] The environment did not change shape, colour or light partway through.
- [ ] Hands are intact for the whole clip, not just the first frame.
- [ ] There is a clean second I can cut on at both ends.

A clip that fails the last line is not usable however good it looks. You need handles.
