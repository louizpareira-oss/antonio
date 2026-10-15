# 10. Reference teardown — @jabmaxapp

Two videos measured: *"Short doesn't lose to tall"* (footwork/angles) and *"You're not too weak.
You're too tense."* (heavy hands). These are the videos the master prompt in
[`prompts/master-boxing-explainer.md`](../prompts/master-boxing-explainer.md) is modeled on.

## Measurements

| | Video 1 (angles) | Video 2 (heavy hands) |
|---|---|---|
| Aspect | **9:16 vertical** | **9:16 vertical** |
| Length | **57.6s** (under the 60s Creator Rewards minimum) | 61.8s |
| Frame rate | 30 fps | 30 fps |
| Big visual changes | 6 | 7 |
| Headline changes | ~28 (one every ~2s) | ~30 (one every ~2s) |

The figures barely cut. One demonstrator and one opponent stay on screen and animate between poses
for the whole minute. **The headline text does the pacing.**

## The look

- Charcoal background with a faint floor grid. Cream mannequin demonstrator with red gloves and a
  dark-slate opponent. Soft 2.5D shading with a shadow under the feet, so it isn't pure flat vector.
- Side views alternate with **top-down diagrams** (the ring seen from above, footprints, arcs).
- **Color means something.** Red is the threat or the mistake. Green rings and arcs mark the correct move.
- Small diagram labels in monospace: `HIS REACH`, `LEAD FOOT`, `WHERE YOU WERE`.
- Text block at roughly 14–30% from the top:
  - kicker: a small red square + mono uppercase (`■ THE PROBLEM`, `■ THE STEP`, `■ THE PAYOFF`)
  - headline: bold condensed uppercase, two lines, second line usually red.

## The structure (both videos)

```
Contrarian hook (2 cards)       "Short doesn't lose to tall. / Standing in front of him does."
The problem                     why the obvious approach fails
Real proof                      a named fighter + real fight numbers
The step / numbered fixes       "1. Your arm is a rope. 2. Your fist is a stone. 3. Chest goes first."
The mistake                     "You think you got off the line."
App plug                        "It checks your feet. Waitlist in my bio."
Payoff                          what the fix does to the opponent
Chiasmus landing                "Don't beat him to the punch. / Beat him to the spot."
Comment question                "Shorter or taller fighter? Comment it."
```

## What to take, and what to leave

| Take (craft, not anyone's property) | Leave |
|---|---|
| Two-line headline card every ~2s, kicker above it | Their exact character design (cream mannequin + red gloves + slate opponent). It is their brand; copying it reads as a clone. |
| Color with a meaning: red = mistake, green/cyan = fix | Real boxers' names and fight stats (the master prompt bans them, and it removes likeness questions) |
| Top-down diagrams for anything about position or angle | "Link in bio" / app plugs. They sell an app. You are building a Creator Rewards account. |
| Chiasmus landing line | Videos under 60s. They don't need Creator Rewards; you do. |
| A comment *question* as the last card (not a link) | |

## The production gap (be honest about this)

@jabmaxapp is **motion graphics**: one rigged character animated in an animation tool. That is why
the same figure holds perfectly across 30 poses. AI image/video generation **cannot** hold one figure
that consistently across 20 separate clips.

That is the real reason the master prompt rotates cast types and palettes: it plays to what AI is good
at (a different striking image every 3–4 seconds) instead of fighting what it is bad at (continuity).
So a video built from the master prompt will look like a cousin of this channel, not a copy. For
originality, that's a good thing.

If you later want the exact JabMax-style consistency, that's a different pipeline (a 2D rig in an
animation tool), not more prompting.

→ First video built from this: [`scripts/02-you-cant-slip-what-you-see.md`](../scripts/02-you-cant-slip-what-you-see.md)
