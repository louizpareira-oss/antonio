# What If You Could See 10 Seconds Into the Future? — story bible

**Logline.** "You" can see a faint blue copy of the world running ten seconds ahead. It wins every game and dodges every
puddle, then costs you jokes, friends and sleep, and on a Friday at 4:12 p.m. it shows a truck running a red light at
your best friend. Tone: wonder → comedy → melancholy → suspense → tender → science → quiet ending.
Second person: "you" is the hero, YOU.

**Format.** 16:9 YouTube, 1920×1080, 24 fps, style `dusk`, letterbox `wide` by default, `scope` for the hook, title,
freezes and the climax, none for blueprint diagrams. No captions. 120 shots in 4:38 (median 2.3 s).

## Cast (`scenes/cast.js`)
| id | role | outfit | signature | expressions |
|---|---|---|---|---|
| YOU | hero, "you" | royal-blue hoodie `#2E72D2`, charcoal pants `#1F242D` | blue hoodie | smirk, determined, worried, joy |
| MIA | best friend | coral zip jacket `#E2684A` (navy trim), high ponytail with coral tie, white earbuds in the climax | coral jacket | surprised, shocked, scared, smile |
| extras | cyclist, teacher, kid, striker, friends, waiter, truck, pitcher | plain ink, no colour item (the striker wears a plain jersey, the waiter a white apron) | — | — |

## The blue world (signature motif)
- Colour `#7FE8FF`. Anything in the future is drawn as a **cyan hologram** (`ghost()` in `scenes/lib.js`): the drawing is
  recoloured cyan at ~38% with a soft glow and fine scan lines, so it reads as "the same thing, 10 s from now".
- Whole-scene double exposure (`doubleWorld()`) for "two worlds on top of each other".
- HUD pill (`hud()`): eye icon + `+10 s`, and a big countdown numeral in the climax (`count()`), synced to the spoken
  numbers. The countdown is the spine of the climax: 10 → 0.
- Callbacks: the dotted outline "where you were standing" in the hook (bike) returns as "where she was standing" (truck).

## Locations (`scenes/sets/`)
| set | mood | key light | signature props |
|---|---|---|---|
| street | golden (hook, Friday), dusk (bench), night (accidents) | low sun from the right / street lamps | facades with lit shop windows, curb, bike lane, crosswalk, traffic light, trees, lamp posts |
| kitchen | interiorWarm (morning), night (surprise party, lights off/on) | window left | table, phone, cereal bowl, calendar "TUE", fridge, pendant lamp |
| classroom | day | big windows left | chalkboard "7 × 8 = ?", desks, teacher |
| pitch (+ 3D stadium) | night | floodlights | goal, penalty spot, grass stripes, crowd stands |
| cafe (lunch) / restaurant | interiorWarm | pendant lamps | tables, glasses, tray, waiter, kitchen door |
| bedroom | night | moon through blinds | bed, blinds stripes, nightstand |
| blueprint (rules, brain, science) | void | — | navy grid, line figures, cyan ghost figures, gold numbers |

## Acts and music
| time | act | music |
|---|---|---|
| 0:00 | Hook: the bike, "How did you know?" | mystery 0.45 |
| 0:18 | Title, Tuesday, two worlds, the phone, the rules | wonder 0.45 |
| 0:56 | Small wins: puddle, glass door, 400 RPS wins, class | playful 0.55 |
| 1:18 | Penalty kicks (3D stadium, freeze save) | action 0.6 |
| 1:33 | The price: jokes, reruns, creepy, surprise party, headaches | sad 0.35 |
| 2:07 | Restaurant: seeing isn't stopping (freeze) | tension 0.5 |
| 2:36 | Friday 4:12 p.m.: the truck, countdown 10 → 0 | tension 0.65 → action 0.9 |
| 3:26 | "How did you know?" / "I didn't know. I saw." | hopeful 0.3 |
| 3:41 | Is any of this real? (blueprint science) | mystery 0.4 |
| 4:17 | Night: the blue world shows nothing | calm 0.2 |
| 4:30 | End screen | hopeful 0.5 |
