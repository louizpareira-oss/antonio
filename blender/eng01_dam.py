"""ENG-01 — How a stream becomes a hydroelectric dam. Blender scene builder.

Builds the whole 44.5 s shot from scripts/eng-01-hydroelectric-dam.md: one continuous
camera, permanent cutaway, every event keyed to the voiceover's word timings
(voiceovers/eng-01-hydroelectric-dam.words.json), voiceover loaded in the sequencer.

Run (Blender 4.2+; built and tested on 5.2):
    blender --background --python blender/eng01_dam.py -- --save eng01_dam.blend
then open eng01_dam.blend and Render > Render Animation (EEVEE, 1080x1920, 30 fps, MP4 + audio).

Options after "--":
    --save PATH        write the .blend
    --sign TEXT        payoff sign text (default "YOUR CHANNEL DAM")
    --stills T,T,...   also render QC stills at these times (seconds) with Cycles CPU
    --stills-dir DIR   where QC stills go (default ./stills)
    --percent N        QC still resolution percent (default 25)
    --samples N        QC still Cycles samples (default 12)
    --preview DIR      also render a low-res Cycles CPU animation preview (PNG sequence) into DIR
    --step N           preview renders every Nth frame (default 2)
"""

import math
import os
import random
import sys

import bpy
from mathutils import Vector

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import channel_kit as kit  # noqa: E402
from channel_kit import box, key, pop, grow  # noqa: E402

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORDS = os.path.join(REPO, "voiceovers", "eng-01-hydroelectric-dam.words.json")
AUDIO = os.path.join(REPO, "voiceovers", "eng-01-hydroelectric-dam.mp3")

# Section geometry (metres). Stream runs along X, upstream on the left.
BED = -3.0          # gully floor at the cut face
CREST = 0.3         # dam crest
UP_X = -0.6         # upstream face of the dam
TOE_X = 2.4         # downstream toe of the dam
FOUND = -7.0        # top of bedrock = dam foundation level
GULLY_Y = 2.5       # flat gully floor half-width behind the cut
BANK_Y = 6.0        # where the bank slope reaches lawn level
X0, X1 = -420.0, 80.0
HOME = (0.6, -20.8, -1.0)
HOME_T = (0.6, 0.0, -1.0)


def face_x(z):
    """x of the sloped downstream face at height z."""
    return (CREST - z) * TOE_X / (CREST - BED)


def build(sign_text):
    scene = kit.reset_scene()
    cue = kit.Cues(WORDS)
    end_t = cue.words[-1]["end"] + 1.0
    pal = kit.palette()
    rnd = random.Random(7)

    # ------------------------------------------------------------ environment kit
    sky = kit.world_sky(scene)
    sun = kit.sun()
    kit.clouds()
    kit.cutaway_layers(X0, X1, BED, [("topsoil", 0.8), ("subsoil", 1.4), ("clay", 1.4),
                                      ("groundwater", 0.4), ("bedrock", 40.0)], pal)
    grass = kit.stripe_mat("Lawn", (0.04, 0.22, 0.02), (0.15, 0.48, 0.07))
    bank_grass = kit.mat("BankGrass", (0.06, 0.24, 0.03), rough=0.9)
    box("BankBody", X0, X1, BANK_Y, 90.0, BED, -0.02, pal["topsoil"])
    box("Lawn", X0, X1, BANK_Y, 90.0, -0.02, 0.0, grass)
    kit.mesh_obj("BankSlope",
                 [(X0, GULLY_Y, BED), (X0, BANK_Y, BED), (X0, BANK_Y, 0.0),
                  (X1, GULLY_Y, BED), (X1, BANK_Y, BED), (X1, BANK_Y, 0.0)],
                 [(0, 1, 2), (3, 5, 4), (0, 3, 4, 1), (1, 4, 5, 2), (0, 2, 5, 3)], bank_grass)
    house_parts, window_glass = kit.house((4.5, 14.0, 0.0))
    kit.fence(-16.0, 16.0, 11.0)
    for i, (tx, ty, h) in enumerate([(-9, 10, 5.0), (-4.5, 17, 6.0), (10.5, 11.5, 4.5),
                                     (12.5, 18, 6.0), (-13, 21, 5.5), (1.0, 23, 6.5)]):
        kit.lowpoly_tree(f"Tree{i}", (tx, ty, 0.0), height=h, seed=i)

    # ------------------------------------------------------------ water bodies
    lake = box("Lake", X0, UP_X, 0.0, BANK_Y, BED, BED + 1.0, pal["water"], origin=(UP_X, 0.0, BED))
    tail = box("Tailwater", UP_X, X1, 0.0, BANK_Y, BED, BED + 1.0, pal["water"], origin=(UP_X, 0.0, BED))

    def lake_level(t, z, obj=lake):
        s = list(obj.scale)
        s[2] = max(z - BED, 0.001)
        key(obj, "scale", t, tuple(s))

    lake_level(0.0, -2.6)
    lake_level(0.0, -2.6, tail)

    # ------------------------------------------------------------ HOOK: rock pile
    rocks = []
    stone = kit.mat("RiverStone", (0.36, 0.36, 0.37), rough=0.25)
    i = 0
    for row, (count, z0, r) in enumerate([(9, BED + 0.3, 0.32), (6, BED + 0.85, 0.28), (3, BED + 1.3, 0.26)]):
        for k in range(count):
            x = -0.7 + 1.4 * (k % 3) / 2 + rnd.uniform(-0.1, 0.1) + 0.1 * row
            y = 0.35 + (k // 3) * 0.75 + rnd.uniform(-0.1, 0.1)
            rock = kit.ico(f"Rock{i}", r * rnd.uniform(0.9, 1.15), (x, y, z0), subdiv=2, material=stone)
            rock.scale = (1.15, 1.0, 0.85)
            t_land = 0.15 + i * 0.06
            key(rock, "location", t_land - 0.35, (x, y, z0 + 6.0))
            key(rock, "location", t_land, (x, y, z0))
            # FAIL 1: tumble downstream like bowling balls, then gone
            t_go = cue("washes") + rnd.uniform(-0.1, 0.25)
            key(rock, "location", t_go, (x, y, z0))
            key(rock, "rotation_euler", t_go, (0, 0, 0))
            key(rock, "location", t_go + 1.3, (x + rnd.uniform(6, 10), y, BED + r))
            key(rock, "rotation_euler", t_go + 1.3, (0, rnd.uniform(6, 12), 0))
            pop(rock, t_land - 0.42, t_land - 0.34, t_go + 1.4, t_go + 1.5)   # appear high, then drop
            rocks.append(rock)
            i += 1
    lake_level(cue("across"), -2.6)
    lake_level(cue("dam") + 0.4, -2.05)
    lake_level(cue("across"), -2.6, tail)
    lake_level(cue("dam") + 0.4, -2.75, tail)

    # FAIL 1: sprinkler jets through the gaps + seepage under the pile
    for j, jz in enumerate([-2.85, -2.6, -2.35, -2.15]):
        jlen = 1.2 + 0.25 * j
        jet = kit.arrow(f"Jet{j}", jlen, pal["water"], direction="+X", shaft=0.05, head=0.09, head_len=0.2)
        t0 = cue("slips") + 0.08 * j
        # tip moves out while the jet scales up, so it grows from the pile outward
        key(jet, "location", t0, (0.85, -0.15, jz))
        key(jet, "location", t0 + 0.35, (0.85 + jlen, -0.15, jz))
        pop(jet, t0, t0 + 0.35, cue("washes") + 0.3, cue("washes") + 0.6)
    pile_seep = []
    for j, pts in enumerate([[(-1.8, BED), (-1.0, BED - 0.45), (0.0, BED - 0.6), (1.0, BED - 0.45), (1.9, BED)],
                             [(-2.4, BED), (-1.3, BED - 0.7), (0.0, BED - 0.78), (1.4, BED - 0.65), (2.6, BED)]]):
        c = kit.poly_curve(f"PileSeep{j}", [(x, -0.09, z) for x, z in pts], 0.045, pal["seepage"])
        c.data.bevel_factor_end = 0.0
        c.data.keyframe_insert("bevel_factor_end", frame=kit.frame(cue("slips")))
        c.data.bevel_factor_end = 1.0
        c.data.keyframe_insert("bevel_factor_end", frame=kit.frame(cue("gaps") + 0.4))
        c.data.keyframe_insert("bevel_factor_end", frame=kit.frame(cue("away") + 0.3))
        c.data.bevel_factor_end = 0.0
        c.data.keyframe_insert("bevel_factor_end", frame=kit.frame(cue("so") + 0.1))
        pile_seep.append(c)
    lake_level(cue("washes"), -2.05)
    lake_level(cue("away") + 0.5, -2.6)
    lake_level(cue("washes"), -2.75, tail)
    lake_level(cue("away") + 0.2, -2.5, tail)
    lake_level(cue("so") + 0.6, -2.62, tail)

    # ------------------------------------------------------------ FIX 1: trench, rebar, wall
    t_so1 = cue("so")
    excavator_y = kit.mat("MachineYellow", (0.95, 0.66, 0.04), rough=0.5)
    bucket = box("Bucket", 0.2, 1.6, -0.6, 0.6, -0.6, 0.4, excavator_y, origin=(0.9, 0.0, -0.6))
    arm = box("Arm", 0.75, 1.05, -0.2, 0.2, 0.4, 9.0, excavator_y, origin=(0.9, 0.0, -0.6))
    kit.parent(arm, bucket)
    key(bucket, "location", t_so1 - 0.3, (0.9, 0.0, 14.0))
    key(bucket, "location", t_so1 + 0.35, (0.9, 0.0, FOUND + 0.4))
    key(bucket, "location", t_so1 + 0.75, (0.9, 0.0, 14.0))
    pop(bucket, t_so1 - 0.4, t_so1 - 0.32, t_so1 + 0.76, t_so1 + 0.84)
    trench = box("Trench", UP_X, TOE_X, -0.01, BANK_Y, FOUND, BED, pal["void"], origin=(0.9, -0.01, BED))
    grow(trench, 2, t_so1 + 0.05, t_so1 + 0.45)

    dam_rig = kit.empty("DamRig", (TOE_X, 0.0, FOUND))
    rebar = kit.empty("Rebar", (0.0, 0.0, FOUND))
    for k, bx in enumerate([-0.45, -0.15, 0.15, 0.45, 0.9, 1.4, 1.9, 2.25]):
        top = CREST - 0.12 if bx <= 0 else CREST - bx * (CREST - BED) / TOE_X - 0.12
        bar = box(f"RebarV{k}", bx - 0.035, bx + 0.035, -0.03, -0.012, FOUND + 0.1, top, pal["steel"])
        kit.parent(bar, rebar)
    for k, hz in enumerate([-6.6, -5.6, -4.6, -3.6, -2.6, -1.6, -0.6]):
        hx1 = min(2.3, face_x(hz) - 0.12) if hz > BED else 2.3
        bar = box(f"RebarH{k}", -0.5, hx1, -0.03, -0.012, hz - 0.035, hz + 0.035, pal["steel"])
        kit.parent(bar, rebar)
    grow(rebar, 2, cue("concrete") - 0.05, cue("concrete") + 0.4)

    slab = [(UP_X, FOUND), (0.0, FOUND), (0.0, BED), (0.0, CREST), (UP_X, CREST)]
    tri = [(UP_X, FOUND), (TOE_X, FOUND), (TOE_X, BED), (0.0, CREST), (UP_X, CREST)]
    dam = kit.prism("Dam", slab, -0.035, BANK_Y, pal["concrete"], origin=(UP_X, 0.0, FOUND))
    dam.shape_key_add(name="Basis")
    sk = dam.shape_key_add(name="Triangle")
    for idx, (x, z) in enumerate(tri):
        for off in (0, len(tri)):
            v = sk.data[idx + off].co
            sk.data[idx + off].co = (x - UP_X, v.y, z - FOUND)
    grow(dam, 2, cue("concrete") + 0.25, cue("wall") + 0.45)
    sk.value = 0.0
    sk.keyframe_insert("value", frame=kit.frame(cue("thick") - 0.05))
    sk.value = 1.0
    sk.keyframe_insert("value", frame=kit.frame(cue("bottom") + 0.35))
    kit.parent(dam, dam_rig)
    kit.parent(rebar, dam_rig)

    # water pushes harder the deeper it gets: lake refills, red arrows grow with depth
    lake_level(cue("where") - 0.1, -2.6)
    lake_level(cue("dam", 2) + 0.4, -0.4)
    pressure = kit.empty("PressureArrows", (UP_X - 0.05, -0.12, -0.4))
    for k, az in enumerate([-0.7, -1.2, -1.7, -2.2, -2.7]):
        a = kit.arrow(f"Pressure{k}", 1.1 * (-0.4 - az), pal["force_red"], direction="+X")
        a.location = (UP_X - 0.05, -0.12, az)
        kit.parent(a, pressure)
        t0 = cue("water", 2) + 0.12 * k     # "where WATER pushes hardest"
        pop(a, t0, t0 + 0.35)

    # ------------------------------------------------------------ NAME: gravity dam
    weight = kit.arrow("Weight", 4.0, pal["load_white"], direction="-Z", shaft=0.13, head=0.34, head_len=0.55)
    weight.location = (0.55, -0.14, -5.4)
    pop(weight, cue("gravity"), cue("gravity") + 0.35)
    kit.parent(weight, dam_rig)

    # ------------------------------------------------------------ FAIL 2: seepage uplift
    seep_paths = [
        [(-2.6, BED), (-2.0, -5.5), (-0.3, -7.55), (1.2, -7.7), (2.9, -7.3), (3.6, BED)],
        [(-4.0, BED), (-3.2, -6.4), (-0.3, -8.4), (1.4, -8.6), (3.3, -8.0), (4.4, BED)],
    ]
    seeps = []
    for j, pts in enumerate(seep_paths):
        c = kit.poly_curve(f"Seep{j}", [(x, -0.13, z) for x, z in pts], 0.05, pal["seepage"])
        c.data.bevel_factor_mapping_end = "SPLINE"
        c.data.bevel_factor_end = 0.0
        c.data.keyframe_insert("bevel_factor_end", frame=kit.frame(cue("seeps") + 0.1 * j))
        c.data.bevel_factor_end = 1.0
        c.data.keyframe_insert("bevel_factor_end", frame=kit.frame(cue("underneath") + 0.5))
        c.data.keyframe_insert("bevel_factor_end", frame=kit.frame(cue("grout") + 0.2))
        c.data.bevel_factor_end = 0.4   # stops dead at the grout curtain
        c.data.keyframe_insert("bevel_factor_end", frame=kit.frame(cue("rock") + 0.2))
        seeps.append(c)
    film = box("UpliftFilm", UP_X, TOE_X, -0.13, BANK_Y, FOUND - 0.07, FOUND, pal["seepage"],
               origin=(UP_X, -0.13, FOUND))
    key(film, "scale", cue("underneath") - 0.07, (0, 0, 0))
    key(film, "scale", cue("underneath"), (0, 1, 1))
    key(film, "scale", cue("lifts"), (1, 1, 1))
    key(film, "scale", cue("bleed"), (1, 1, 1))
    key(film, "scale", cue("pressure") + 0.4, (1, 1, 0))
    uplift = []
    for k, (ux, ul) in enumerate([(-0.3, 1.5), (0.6, 1.1), (1.5, 0.7)]):
        a = kit.arrow(f"Uplift{k}", ul, pal["force_red"], direction="+Z")
        a.location = (ux, -0.15, FOUND - 0.08)
        t0 = cue("lifts") + 0.1 * k
        pop(a, t0, t0 + 0.3, cue("bleed"), cue("bleed") + 0.45)
        uplift.append(a)
    key(weight, "scale", cue("lifts"), (1, 1, 1))
    key(weight, "scale", cue("lifts") + 0.5, (0.55, 0.55, 0.55))
    key(weight, "scale", cue("bleed"), (0.55, 0.55, 0.55))
    key(weight, "scale", cue("pressure") + 0.3, (1, 1, 1))
    # bob like a floating dock, then settle once the drains bleed the pressure
    deg = math.radians
    for t, a in [(cue("lifts"), 0), (cue("lifts") + 0.35, 2.4), (cue("lifts") + 0.65, 1.0),
                 (cue("lifts") + 0.95, 2.6), (cue("lifts") + 1.25, 1.3), (cue("lifts") + 1.55, 2.0),
                 (cue("bleed"), 2.0), (cue("bleed") + 0.45, -0.3), (cue("bleed") + 0.7, 0.15),
                 (cue("pressure") + 0.6, 0.0)]:
        key(dam_rig, "rotation_euler", t, (0, deg(a), 0))

    # ------------------------------------------------------------ FIX 2: grout curtain + drains
    t_so2 = cue("so", 2)
    tower = box("DrillTower", -0.5, -0.1, -0.2, 0.3, CREST, CREST + 2.4, excavator_y, origin=(-0.3, 0.0, CREST))
    pop(tower, t_so2 - 0.15, t_so2 + 0.15, cue("pressure") + 0.3, cue("pressure") + 0.6)
    drill = box("DrillString", -0.34, -0.26, -0.17, -0.09, -10.6, CREST, pal["steel"], origin=(-0.3, -0.13, CREST))
    grow(drill, 2, t_so2 + 0.1, cue("grout") + 0.25)
    key(drill, "scale", cue("drill"), (1, 1, 1))
    key(drill, "scale", cue("drill") + 0.3, (1, 1, 0))       # retracts up into the rig
    curtain = box("GroutCurtain", -0.5, -0.1, -0.11, BANK_Y, -10.6, FOUND, pal["concrete_light"],
                  origin=(-0.3, -0.11, FOUND))
    grow(curtain, 2, cue("grout"), cue("rock") + 0.25)
    for k, dx in enumerate([0.3, 0.7, 1.1]):
        d = box(f"Drain{k}", dx - 0.05, dx + 0.05, -0.12, BANK_Y, -9.6, FOUND, pal["seepage"], origin=(dx, -0.12, FOUND))
        grow(d, 2, cue("drill") + 0.1 * k, cue("drains") + 0.2 + 0.1 * k)

    # ------------------------------------------------------------ FAIL 3: storm, overtopping, scour
    t_storm = cue("storm")
    bg_color, bg_strength = sky.inputs["Color"], sky.inputs["Strength"]

    def sky_key(t, color, strength):
        bg_color.default_value = (*color, 1)
        bg_color.keyframe_insert("default_value", frame=kit.frame(t))
        bg_strength.default_value = strength
        bg_strength.keyframe_insert("default_value", frame=kit.frame(t))

    blue, grey = (0.42, 0.62, 0.95), (0.13, 0.14, 0.17)
    sky_key(cue("but", 3) - 0.1, blue, 1.0)                  # "But in a storm"
    sky_key(t_storm + 0.05, grey, 0.6)
    sky_key(t_storm + 0.12, grey, 6.0)     # lightning
    sky_key(t_storm + 0.2, grey, 0.6)
    sky_key(cue("fall") - 0.2, grey, 0.6)
    sky_key(cue("fall") + 0.8, blue, 1.0)
    sun.data.energy = 4.0
    sun.data.keyframe_insert("energy", frame=kit.frame(cue("but", 3) - 0.1))
    sun.data.energy = 0.8
    sun.data.keyframe_insert("energy", frame=kit.frame(t_storm + 0.3))
    sun.data.keyframe_insert("energy", frame=kit.frame(cue("fall") - 0.2))
    sun.data.energy = 4.0
    sun.data.keyframe_insert("energy", frame=kit.frame(cue("fall") + 0.8))

    drop = kit.cylinder("RainDrop", 0.012, 0.55, (0, 0, -500), material=kit.mat("Rain", (0.8, 0.88, 1.0), emit=0.8))
    emitter = kit.mesh_obj("RainEmitter", [(-20, -25, 25), (25, -25, 25), (25, 30, 25), (-20, 30, 25)],
                           [(0, 1, 2, 3)])
    mod = emitter.modifiers.new("Rain", "PARTICLE_SYSTEM")
    ps = mod.particle_system.settings
    ps.count = 4000
    ps.frame_start = kit.frame(t_storm - 0.9)
    ps.frame_end = kit.frame(cue("fall") + 0.3)
    ps.lifetime = 45
    ps.emit_from = "FACE"
    ps.normal_factor = -14.0
    ps.render_type = "OBJECT"
    ps.instance_object = drop
    ps.particle_size = 1.0
    ps.use_rotation_instance = True
    emitter.show_instancer_for_render = False

    lake_level(t_storm, -0.4)
    lake_level(cue("pours"), 0.5)
    lake_level(cue("fall"), 0.5)
    lake_level(cue("fall") + 0.8, 0.38)
    key(pressure, "scale", t_storm, (1, 1, 1))
    key(pressure, "scale", cue("pours"), (1.35, 1, 1))
    lake_level(t_storm, -2.62, tail)
    lake_level(cue("top"), -2.45, tail)

    crest_sheet = box("CrestSheet", UP_X, 0.05, -0.06, BANK_Y, CREST, CREST + 0.16, pal["water"], origin=(UP_X, 0, CREST))
    grow(crest_sheet, 0, cue("pours") - 0.2, cue("pours") + 0.1)
    slope_len = math.hypot(TOE_X, CREST - BED)
    sheet = box("SlopeSheet", 0.0, slope_len, -0.06, BANK_Y, 0.0, 0.14, pal["water"], origin=(0.0, 0.0, 0.0))
    sheet.location = (0.0, 0.0, CREST)
    sheet.rotation_euler = (0, math.atan2(CREST - BED, TOE_X), 0)
    grow(sheet, 0, cue("pours"), cue("top") + 0.3)
    key(crest_sheet, "scale", cue("add") - 0.1, (1, 1, 1))
    key(sheet, "scale", cue("add") - 0.1, (1, 1, 1))
    key(crest_sheet, "scale", cue("add") + 0.2, (0, 1, 1))
    key(sheet, "scale", cue("add") + 0.2, (0, 1, 1))

    scour_pts = [(3.2 + 1.0 * math.cos(math.radians(a)), 0.75 * math.sin(math.radians(a)))
                 for a in range(180, 361, 15)]
    scour = kit.mesh_obj("Scour", [(x - 3.2, 0.0, z) for x, z in scour_pts], [tuple(range(len(scour_pts)))],
                         pal["void"])
    scour.location = (3.2, -0.02, BED)
    pop(scour, cue("digs"), cue("base") + 0.4, cue("add"), cue("add") + 0.35)
    for k in range(8):
        bit = kit.ico(f"Debris{k}", 0.09, (3.2, -0.2, BED), subdiv=1, material=pal["topsoil"], smooth=False)
        t0 = cue("digs") + 0.06 * k
        ang = math.radians(rnd.uniform(35, 145))
        dist = rnd.uniform(1.0, 2.2)
        key(bit, "location", t0, (3.2, -0.2, BED))
        key(bit, "location", t0 + 0.4, (3.2 + dist * math.cos(ang), -0.2, BED + dist * math.sin(ang)))
        key(bit, "location", t0 + 0.75, (3.2 + 1.5 * dist * math.cos(ang), -0.2, BED - 0.2))
        pop(bit, t0, t0 + 0.05, t0 + 0.6, t0 + 0.75)
    key(dam_rig, "rotation_euler", cue("digs") + 0.2, (0, 0, 0))
    key(dam_rig, "rotation_euler", cue("base") + 0.3, (0, deg(3.2), 0))
    key(dam_rig, "rotation_euler", cue("add"), (0, deg(3.2), 0))
    key(dam_rig, "rotation_euler", cue("add") + 0.4, (0, 0, 0))

    # ------------------------------------------------------------ FIX 3: stepped spillway
    n_steps = 8
    step_h = (CREST - BED) / n_steps
    cascade = []
    for k in range(n_steps):
        z_bot, z_top = BED + k * step_h, BED + (k + 1) * step_h
        xa, xb = face_x(z_top), face_x(z_bot)
        st = box(f"Step{k}", xa, xb, -0.045, BANK_Y, z_bot, z_top, pal["concrete_light"], origin=(xa, -0.045, z_bot))
        t0 = cue("add") + 0.1 * k
        pop(st, t0, t0 + 0.22)
        tread = box(f"CascadeTread{k}", xa - 0.02, xb + 0.06, -0.07, BANK_Y, z_top, z_top + 0.1, pal["foam"],
                    origin=(xa, -0.07, z_top))
        riser = box(f"CascadeRiser{k}", xb, xb + 0.1, -0.07, BANK_Y, z_bot, z_top + 0.1, pal["foam"],
                    origin=(xb, -0.07, z_top))
        tf = cue("break") + 0.07 * (n_steps - 1 - k)
        pop(tread, tf, tf + 0.15)
        pop(riser, tf + 0.05, tf + 0.2)
        cascade += [tread, riser]
    basin = box("Basin", TOE_X, 4.0, -0.045, BANK_Y, BED - 0.8, BED, pal["concrete_light"], origin=(TOE_X, 0, BED))
    pop(basin, cue("add"), cue("add") + 0.4)
    key(crest_sheet, "scale", cue("break") - 0.1, (0, 1, 1))
    key(crest_sheet, "scale", cue("break") + 0.1, (1, 1, 0.6))
    lake_level(cue("break"), -2.45, tail)
    lake_level(cue("fall") + 0.4, -2.75, tail)

    # ------------------------------------------------------------ MYTH: depth, not size
    t_mile, t_foot, t_one = cue("mile-long"), cue("foot-long"), cue("one")
    squeeze = 0.3 / (UP_X - X0)
    key(lake, "scale", t_mile + 0.1, tuple(lake.scale))
    s_lake = tuple(lake.scale)
    key(lake, "scale", t_foot, (squeeze, s_lake[1], s_lake[2]))
    key(lake, "scale", t_one + 0.15, (squeeze, s_lake[1], s_lake[2]))
    key(lake, "scale", t_one + 1.0, s_lake)
    glass = box("GlassPane", UP_X - 0.34, UP_X - 0.3, -0.06, BANK_Y, BED, 0.45, pal["glass"],
                origin=(UP_X - 0.32, -0.06, BED))
    pop(glass, t_foot - 0.25, t_foot, t_one + 0.15, t_one + 0.4)

    # ------------------------------------------------------------ FINISH: penstock, turbine, power
    t_pipe = cue("pipe")
    a_in, a_out = Vector((UP_X - 0.15, 0.0, -1.9)), Vector((4.15, 0.0, -2.45))
    ang = math.atan2(a_in.z - a_out.z, a_out.x - a_in.x)
    plen = (a_out - a_in).length
    pen = box("PenstockSteel", a_in.x, a_in.x + plen, -0.08, -0.05, a_in.z - 0.3, a_in.z + 0.3, pal["steel"],
              origin=(a_in.x, -0.08, a_in.z))
    pen_w = box("PenstockWater", a_in.x, a_in.x + plen, -0.1, -0.08, a_in.z - 0.2, a_in.z + 0.2, pal["foam"],
                origin=(a_in.x, -0.1, a_in.z))
    for obj in (pen, pen_w):
        obj.rotation_euler = (0, ang, 0)
    grow(pen, 0, t_pipe, cue("turbine"))
    grow(pen_w, 0, t_pipe + 0.3, cue("turbine") + 0.2)

    ph_mat = pal["concrete_light"]
    roof_m = kit.mat("PowerhouseRoof", (0.25, 0.27, 0.3), rough=0.6)
    powerhouse = kit.empty("Powerhouse", (4.0, 0.0, BED))
    for nm, args in [("PH_Back", (4.0, 5.9, 2.6, 2.9, BED + 0.2, BED + 2.0, ph_mat)),
                     ("PH_Left", (4.0, 4.15, -0.03, 2.9, BED + 0.2, BED + 2.0, ph_mat)),
                     ("PH_Right", (5.75, 5.9, -0.03, 2.9, BED + 0.2, BED + 2.0, ph_mat)),
                     ("PH_Floor", (4.0, 5.9, -0.03, 2.9, BED, BED + 0.2, ph_mat)),
                     ("PH_Roof", (3.9, 6.0, -0.06, 3.0, BED + 2.0, BED + 2.2, roof_m))]:
        part = box(nm, *args)
        kit.parent(part, powerhouse)
    pop(powerhouse, t_pipe + 0.1, t_pipe + 0.45)
    runner = kit.empty("Runner", (4.95, -0.12, -2.45))
    runner.rotation_euler = (0, 0, 0)
    hub = kit.cylinder("RunnerHub", 0.07, 0.12, (4.95, -0.12, -2.45), rotation=(math.pi / 2, 0, 0), material=pal["steel"])
    kit.parent(hub, runner)
    ring = kit.cylinder("RunnerBand", 0.6, 0.05, (4.95, -0.08, -2.45), rotation=(math.pi / 2, 0, 0),
                        material=pal["steel"], verts=40)
    kit.parent(ring, runner)
    for b in range(10):
        blade = box(f"Blade{b}", 0.06, 0.58, -0.02, 0.02, -0.035, 0.035, pal["steel"], origin=(0, 0, 0))
        blade.location = (4.95, -0.14, -2.45)
        blade.rotation_euler = (0, math.radians(36 * b), 0)
        kit.parent(blade, runner)
    pop(runner, t_pipe + 0.3, t_pipe + 0.6)
    gen = box("Generator", 4.45, 5.45, -0.1, 1.2, -1.75, -1.25, roof_m)
    pop(gen, t_pipe + 0.35, t_pipe + 0.65)
    key(runner, "rotation_euler", cue("turbine"), (0, 0, 0), interp="LINEAR")
    key(runner, "rotation_euler", end_t, (0, -math.tau * 1.6 * (end_t - cue("turbine")), 0), interp="LINEAR")

    pole_m = kit.mat("Pole", (0.3, 0.2, 0.12), rough=0.9)
    kit.cylinder("Pole", 0.09, 3.6, (7.6, 7.2, 1.8), material=pole_m, verts=8)
    wire_pts = [(5.6, 1.6, BED + 2.25), (7.6, 7.2, 3.5), (6.9, 13.95, 2.9)]
    wire = kit.poly_curve("Wire", wire_pts, 0.03, pal["black"])
    wire.data.bevel_factor_end = 0.0
    wire.data.keyframe_insert("bevel_factor_end", frame=kit.frame(cue("run")))
    wire.data.bevel_factor_end = 1.0
    wire.data.keyframe_insert("bevel_factor_end", frame=kit.frame(cue("wires") + 0.25))
    bolt_shape = [(-0.05, 0.25), (0.12, 0.25), (0.02, 0.03), (0.14, 0.03), (-0.1, -0.28), (0.0, -0.05), (-0.13, -0.05)]
    for b in range(3):
        bolt = kit.mesh_obj(f"Bolt{b}", [(x * 3.2, 0.0, z * 3.2) for x, z in bolt_shape],
                            [tuple(range(len(bolt_shape)))], pal["bolt_yellow"])
        con = bolt.constraints.new("FOLLOW_PATH")
        con.target = wire
        con.use_fixed_location = True
        t = cue("wires") + 0.3 + 0.4 * b
        pop(bolt, t - 0.1, t)
        while t < end_t:
            kit._set_interp("LINEAR")
            con.offset_factor = 0.0
            con.keyframe_insert("offset_factor", frame=kit.frame(t))
            con.offset_factor = 1.0
            con.keyframe_insert("offset_factor", frame=kit.frame(t + 1.15))
            kit._set_interp("BEZIER")
            t += 1.2
    glass_p = next(n for n in window_glass.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
    glass_p.inputs["Emission Color"].default_value = (1.0, 0.72, 0.35, 1)
    em = glass_p.inputs["Emission Strength"]
    em.default_value = 0.0
    em.keyframe_insert("default_value", frame=kit.frame(cue("home") - 0.05))
    em.default_value = 6.0
    em.keyframe_insert("default_value", frame=kit.frame(cue("home") + 0.2))

    # ------------------------------------------------------------ FINISH: railings and lamps
    rails = kit.empty("Railings", (-0.3, 0.0, CREST))
    for side, rx in (("U", UP_X + 0.05), ("D", -0.05)):
        for k in range(9):
            py = 0.15 + k * 0.7
            p = box(f"Post{side}{k}", rx - 0.03, rx + 0.03, py - 0.03, py + 0.03, CREST, CREST + 0.9, pal["steel"])
            kit.parent(p, rails)
        r_ = box(f"Rail{side}", rx - 0.035, rx + 0.035, 0.12, 5.8, CREST + 0.84, CREST + 0.92, pal["steel"])
        kit.parent(r_, rails)
    grow(rails, 2, cue("railings") - 0.05, cue("railings") + 0.3)
    lamp_glow = kit.mat("LampGlow", (1.0, 0.85, 0.55), rough=0.3, emit=0.0, emit_color=(1.0, 0.8, 0.45))
    lamps = kit.empty("Lamps", (-0.3, 0.0, CREST))
    for k, ly in enumerate([0.1, 1.8, 3.5, 5.2]):
        post = box(f"LampPost{k}", -0.34, -0.26, ly - 0.04, ly + 0.04, CREST, CREST + 1.7, pal["steel"])
        head = kit.ico(f"LampHead{k}", 0.14, (-0.3, ly, CREST + 1.78), material=lamp_glow)
        kit.parent(post, lamps)
        kit.parent(head, lamps)
    grow(lamps, 2, cue("lamps") - 0.15, cue("lamps") + 0.15)
    lp = next(n for n in lamp_glow.node_tree.nodes if n.type == "BSDF_PRINCIPLED")
    lem = lp.inputs["Emission Strength"]
    lem.default_value = 0.0
    lem.keyframe_insert("default_value", frame=kit.frame(cue("lamps") + 0.15))
    lem.default_value = 12.0
    lem.keyframe_insert("default_value", frame=kit.frame(cue("lamps") + 0.35))

    # ------------------------------------------------------------ PAYOFF: hero pickup + sign
    truck = build_pickup(pal)
    t_c = cue("congratulations")
    key(truck, "location", t_c - 0.2, (-16.0, 8.6, 0.0))
    key(truck, "location", end_t, (15.0, 8.6, 0.0))
    pop(truck, t_c - 0.3, t_c - 0.2)                          # hidden until the payoff
    sign = kit.empty("Sign", (-2.9, 6.4, 0.0))
    post = kit.cylinder("SignPost", 0.07, 2.9, (-2.9, 6.45, 1.45), material=pal["steel"], verts=8)
    plate = box("SignPlate", -5.3, -0.5, 6.36, 6.42, 2.3, 3.2, pal["sign_green"])
    label = kit.text_obj("SignText", sign_text, 0.5, pal["sign_white"], (-2.9, 6.34, 2.75), extrude=0.005)
    for obj in (post, plate, label):
        kit.parent(obj, sign)
    pop(sign, cue("built") - 0.1, cue("built") + 0.25)

    # ------------------------------------------------------------ camera (bible section 3)
    cam = kit.CameraRig(scene)
    C = cam.key
    C(0.0, (0.4, -22.5, -1.0), (0.4, 0.0, -1.2))
    C(3.6, (0.2, -16.5, -1.8), (0.2, 0.0, -2.1))                      # hook push-in
    C(cue("slips"), (0.6, -8.0, -2.6), (0.7, 0.0, -2.8))              # macro into the gaps
    C(cue("washes"), (0.9, -8.5, -2.5), (1.0, 0.0, -2.7))
    C(cue("away") + 0.4, HOME, HOME_T)                                # pull back for the collapse
    C(t_so1, HOME, HOME_T)
    C(t_so1 + 0.6, (0.7, -15.0, -4.6), (0.8, 0.0, -4.9))              # tilt down with the bucket
    C(cue("concrete") + 0.4, (0.9, -9.0, -4.2), (0.9, 0.0, -4.4))     # macro: concrete around rebar
    C(cue("thick") + 0.3, HOME, HOME_T)                               # reveal the triangle
    C(cue("this"), HOME, HOME_T)
    C(cue("dam", 2) + 0.5, (0.6, -21.6, 0.2), (0.6, 0.0, -0.9))       # slight crane up
    C(cue("seeps"), (0.8, -12.0, -5.2), (0.8, 0.0, -6.4))
    C(cue("underneath") + 0.3, (0.9, -9.0, -6.6), (0.9, 0.0, -7.2))   # macro: base / bedrock joint
    C(cue("lifts"), (0.6, -21.0, -1.6), (0.6, 0.0, -1.9))             # snap back to watch it bob
    C(t_so2, (0.6, -20.0, -1.6), (0.6, 0.0, -1.9))
    C(t_so2 + 0.7, (0.2, -14.5, -4.5), (0.0, 0.0, -5.2))              # follow the drill down
    C(cue("rock"), (-0.1, -8.5, -8.0), (-0.2, 0.0, -8.3))             # macro: grout in the cracks
    C(cue("pressure") + 0.3, HOME, HOME_T)
    C(t_storm, HOME, HOME_T)
    C(cue("pours"), (1.4, -12.5, 0.6), (1.3, 0.0, -0.4))              # ride the falling water
    C(cue("top") + 0.4, (2.3, -10.5, -2.3), (2.3, 0.0, -2.8))
    C(cue("digs") + 0.3, (3.0, -7.8, -3.3), (3.1, 0.0, -3.6))         # macro: scour hole
    C(cue("add"), (1.6, -14.0, -1.4), (1.6, 0.0, -1.6))
    C(cue("spillway"), (1.2, -11.5, -0.2), (1.2, 0.0, -0.6))          # track down the steps
    C(cue("fall") + 0.3, (2.7, -11.5, -2.4), (2.7, 0.0, -2.8))
    C(cue("feels") - 0.6, (1.2, -18.0, -1.2), (1.0, 0.0, -1.4))
    C(cue("size"), (7.0, -26.0, 5.5), (-60.0, 4.0, -2.5))            # swing round: a mile of lake to the horizon
    C(t_mile, (7.0, -25.0, 5.0), (-55.0, 4.0, -2.5))
    C(t_foot, (2.5, -22.0, 1.5), (-1.5, 0.0, -1.6))                  # follow the squeeze back to the wall
    C(t_one + 0.9, (0.8, -22.0, -0.8), (0.8, 0.0, -1.1))              # settle back
    C(t_pipe, (1.6, -16.0, -1.4), (1.6, 0.0, -1.6))
    C(cue("turbine") + 0.2, (4.6, -8.0, -2.2), (4.7, 0.0, -2.4))      # macro: turbine spins up
    C(cue("run"), (4.6, -9.0, -1.8), (4.8, 0.0, -1.9))
    C(cue("home") + 0.2, (3.2, -17.0, 1.8), (5.0, 14.0, 2.6))         # ride the line to the house
    C(cue("add", 2), (1.4, -20.0, 0.4), (1.2, 0.0, -0.6))
    C(t_c, (0.8, -22.0, 0.4), (0.8, 0.0, -0.9))
    C(end_t, (0.8, -25.5, 0.9), (0.8, 0.0, -0.7))                     # slow push back, hold

    # myth-buster stat callout, locked to the camera (bible 4.2: yellow, caps, above captions)
    callout = kit.text_obj("Callout", "1 MILE = 1 FOOT", 0.25, pal["callout_yellow"], (0, 0.42, -5.0),
                           rotation=(0, 0, 0), extrude=0.01)
    outline = kit.text_obj("CalloutOutline", "1 MILE = 1 FOOT", 0.25, pal["black"], (0, 0.42, -5.01),
                           rotation=(0, 0, 0), extrude=0.0)
    outline.data.offset = 0.012
    for obj in (callout, outline):
        obj.parent = cam.obj
        pop(obj, t_mile - 0.05, t_mile + 0.15, t_one + 0.45, t_one + 0.6)

    kit.setup_render(scene, end_t, AUDIO)
    return scene, end_t


def build_pickup(pal):
    """The channel's hero vehicle: orange-red heavy-duty pickup, black grille (bible 2.2)."""
    body = kit.mat("TruckBody", (0.75, 0.2, 0.06), rough=0.35, metal=0.3)
    glass = kit.mat("TruckGlass", (0.05, 0.07, 0.09), rough=0.05)
    lights = kit.mat("Headlight", (1.0, 0.95, 0.8), emit=4.0)
    root = kit.empty("Pickup", (0, 0, 0))
    parts = [
        box("T_Chassis", -2.6, 2.6, -1.0, 1.0, 0.5, 1.15, body),
        box("T_Cab", -0.4, 1.4, -0.95, 0.95, 1.15, 2.0, body),
        box("T_WinSide", -0.25, 1.2, -0.97, 0.97, 1.3, 1.85, glass),
        box("T_Windshield", 1.38, 1.42, -0.85, 0.85, 1.3, 1.9, glass),
        box("T_Hood", 1.4, 2.6, -0.95, 0.95, 1.15, 1.42, body),
        box("T_Grille", 2.6, 2.66, -0.8, 0.8, 0.6, 1.35, pal["black"]),
        box("T_BedL", -2.6, -0.45, -1.0, -0.85, 1.15, 1.6, body),
        box("T_BedR", -2.6, -0.45, 0.85, 1.0, 1.15, 1.6, body),
        box("T_Tail", -2.65, -2.55, -1.0, 1.0, 1.15, 1.6, body),
        box("T_LightL", 2.62, 2.68, -0.85, -0.6, 1.05, 1.25, lights),
        box("T_LightR", 2.62, 2.68, 0.6, 0.85, 1.05, 1.25, lights),
    ]
    for wx in (-1.7, 1.7):
        for wy in (-1.0, 1.0):
            parts.append(kit.cylinder(f"T_Wheel{wx}{wy}", 0.45, 0.35, (wx, wy, 0.45),
                                      rotation=(math.pi / 2, 0, 0), material=pal["black"]))
    for p in parts:
        kit.parent(p, root)
    return root


def render_stills(scene, times, out_dir, percent, samples):
    os.makedirs(out_dir, exist_ok=True)
    kit.preview_cycles(scene, percent, samples)
    try:
        bpy.ops.ptcache.bake_all(bake=True)     # rain particles need simulating before jumping to a frame
    except RuntimeError as e:
        print("particle bake skipped:", e)
    for t in times:
        scene.frame_set(kit.frame(t))
        scene.render.filepath = os.path.join(out_dir, f"t{t:05.1f}.png")
        bpy.ops.render.render(write_still=True)


def render_preview(scene, out_dir, percent, samples, step):
    """Low-res Cycles CPU animation preview as a PNG sequence (every `step`-th frame)."""
    os.makedirs(out_dir, exist_ok=True)
    kit.preview_cycles(scene, percent, samples)
    scene.frame_step = step
    scene.render.filepath = os.path.join(out_dir, "f_")
    bpy.ops.render.render(animation=True)


def main():
    if not bpy.app.background and "--" not in sys.argv:   # run from the Scripting tab: just build
        build("YOUR CHANNEL DAM")
        return
    args = kit.cli_args(sys.argv)
    opts = {"--save": None, "--sign": "YOUR CHANNEL DAM", "--stills": "", "--stills-dir": "stills",
            "--percent": "25", "--samples": "12", "--preview": "", "--step": "2"}
    for i, a in enumerate(args):
        if a in opts and i + 1 < len(args):
            opts[a] = args[i + 1]
    scene, end_t = build(opts["--sign"])
    if opts["--save"]:
        bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(opts["--save"]))
        bpy.ops.file.make_paths_relative()      # voiceover path works wherever the repo is cloned
        bpy.ops.wm.save_mainfile()
    if opts["--stills"]:
        times = [float(t) for t in opts["--stills"].split(",")]
        render_stills(scene, times, opts["--stills-dir"], int(opts["--percent"]), int(opts["--samples"]))
    if opts["--preview"]:
        render_preview(scene, opts["--preview"], int(opts["--percent"]), int(opts["--samples"]), int(opts["--step"]))
    print(f"ENG-01 scene built: {scene.frame_end} frames ({end_t:.2f} s)")


if __name__ == "__main__":
    main()
