# Bible — "Can One Person Really Control the Universe?" (video 6)

Script: `scripts/06-control-the-universe.md` (approved Oct 23, 4-minute version, ~576 words).
Look: v2 look (`scenes/look.js`) + the **blue + red superhero suit** (the user's pick, Oct 23; `SUITS.red` in
`scenes/cast.js`). Grade: `clean` (as video 5). 16:9, 1080p, 24 fps.

## Logline
Six stones fall into Grandma Rosa's backyard: time, space, energy, mind, matter, life. Each gives you something and
takes something back. The last one gives Grandma one perfect day and takes your first memory of the stars. Then six
new lights start slowing down over Earth.

## Cast (one signature colour each)
| Who | Outfit (`scenes/cast.js`) | Notes |
|---|---|---|
| YOU | `YOU` (blue hoodie) → `YOU1` (badge) → `YOU3` (red yoke, sleeves, gloves, gold belt) → `HERO` (red boots + red cape, gold lining) | the suit grows with each stone |
| GRANDMA ROSA | `GRANDMA`: red cardigan, grey bun, glasses pushed up on her head | retired astronomer; forgets things, never a star |
| THEO | `THEO`: orange T-shirt + cap | best friend; one thought line |
| NASA | plain text, no logo | screens only |

## Props
`scenes/stones.js`: `stone()` (hexagonal crystal, our own design), `streak()` (a falling light), `blink()` (teleport
puff); `STONES` = TIME gold, SPACE cyan, ENERGY orange-red, MIND violet, MATTER green, LIFE pink; `emblem()` = the chest
badge with up to 6 sockets lit.

## Sets
| Set | Where | Used in |
|---|---|---|
| Kitchen (morning, 7:59, the frozen coffee) | `/projects/talk-to-animals/scenes/sets/house.js` `kitchen` | hook, last shot |
| Grandma's backyard (night; crater; telescope) | `sets/world.js` `backyard` | the lights, 1969 flashback (`time: 'dusk'` + sepia) |
| Classroom (MATH TEST, wall clock) | `sets/world.js` `classroom` | fun part |
| Street with frozen bus, cafeteria | talk-to-animals `outside.js` `street`, `school({ room: 'cafe' })` | fun part |
| Tokyo ramen stall ("TOKYO" plain text) | `sets/world.js` `ramenStall` | fun part |
| Stadium at night | `sets/world.js` `stadium` | the mind-stone curse |
| NASA control room (map, red dot, "ANOMALY") | `sets/world.js` `nasaRoom` | curse, twist |
| Space + GPS satellite | `sets/world.js` `space`, `gpsSat` | science, twist |
| The old observatory (dome slit, Vega) | `sets/world.js` `observatory` | Grandma's perfect day |
Look test of all sets: `scenes/shots/_sets.js` (copy to `sets.js`, render `--stills 0.5,...,7.5`, delete the copy).

## Music plan (moods)
hook mystery → rules wonder → Grandma calm → fun playful/triumph → curse tension/action → science wonder →
Grandma sad → perfect day hopeful → twist mystery/epic → end hopeful.

## Voices (the user, Oct 23: reuse + one new voice)
| Role | Voice | voice_id |
|---|---|---|
| Narrator | What-If Narrator (relaxed) | `tU5OsKP4quMjdJ22MRVH` |
| Grandma Rosa | **new**: design with the ElevenLabs connector. Proposed description: "A warm, gentle woman in her seventies, a retired astronomer; soft and a little raspy, amused, calm storytelling pace, American accent." Test line: her "There you are. You got tall." + "You were six…" lines. | — |
| Theo (thought line) | Charlie - Deep, Confident, Energetic (premade), light echo | `IKne3meq5aSn9XLyUdCD` |
Recording as in video 5 (`projects/talk-to-animals/input/voices.md`): eleven_v4, 4 variations per call, pick with a
recognition score, tempo 0.93 and +0.22 s on pauses, word timings with `tools/align_offline.py`.

## Status / next steps
1. Done (Oct 23): script approved, suit colour, cast, look, props, sets + look test.
2. **Blocked:** the ElevenLabs connector was disconnected in the Oct 23 session. Reconnect it, start a new session,
   then: design Grandma's voice → record → assemble `input/voiceover.mp3` → timings → `story/plan.py` + shots.json
   (replace the 8 `look*` placeholder shots) → shots → sound → render in 40-s segments → thumbnail + upload kits.
