"""Channel kit: the shared Blender building blocks for every engineering-channel video.

Brand environment (house, fence, low-poly trees, striped lawn, sky), the colour-coded
materials from docs/10-engineering-channel-format-bible.md section 2.3, cutaway layer
builder, arrows, cue lookup from the voiceover word timings, camera keys, and render setup.

Episode scripts (e.g. eng01_dam.py) import this module and only add their own build.
Units are metres. The cut plane is y = 0; the camera looks along +Y from negative y,
so "in front of the cut face" means slightly negative y.
"""

import json
import math
import os
import random

import bpy
from mathutils import Euler, Vector

FPS = 30


# ---------------------------------------------------------------- scene / timing

def reset_scene():
    """Start from an empty scene. In the Blender UI (Scripting tab) only the file's data is
    cleared, so the user's preferences and layout are left alone."""
    if bpy.app.background:
        bpy.ops.wm.read_factory_settings(use_empty=True)
    else:
        for coll in (bpy.data.objects, bpy.data.meshes, bpy.data.curves, bpy.data.materials,
                     bpy.data.lights, bpy.data.cameras, bpy.data.worlds, bpy.data.actions,
                     bpy.data.particles):
            for block in list(coll):
                coll.remove(block)
    scene = bpy.context.scene
    if scene.sequence_editor:
        scene.sequence_editor_clear()
    scene.render.fps = FPS
    return scene


def frame(t):
    """Seconds -> frame number (frame 1 is t = 0)."""
    return int(round(t * FPS)) + 1


class Cues:
    """Word start times from a voiceover words.json, looked up by word and occurrence."""

    def __init__(self, path):
        with open(path) as f:
            data = json.load(f)
        self.words = data["words"]
        self.duration = data.get("duration_secs", self.words[-1]["end"])

    @staticmethod
    def _norm(text):
        return "".join(c for c in text.lower() if c.isalnum() or c in "-'")

    def __call__(self, word, n=1):
        target, seen = self._norm(word), 0
        for w in self.words:
            if self._norm(w["text"]) == target:
                seen += 1
                if seen == n:
                    return w["start"]
        raise KeyError(f"cue word {word!r} occurrence {n} not in voiceover")

    def end(self, word, n=1):
        start = self(word, n)
        return next(w["end"] for w in self.words if w["start"] == start)


# ---------------------------------------------------------------- keyframes

def _set_interp(kind):
    bpy.context.preferences.edit.keyframe_new_interpolation_type = kind


def key(obj, path, t, value=None, interp="BEZIER", index=-1):
    """Insert a keyframe at time t (seconds), optionally setting the value first."""
    if value is not None:
        setattr(obj, path, value)
    _set_interp(interp)
    obj.keyframe_insert(data_path=path, frame=frame(t), index=index)
    _set_interp("BEZIER")


def pop(obj, t_in, t_full, t_out=None, t_gone=None, full=None):
    """Scale an object in from zero (t_in -> t_full) and optionally back out."""
    full = tuple(full or obj.scale)
    t_full = max(t_full, t_in + 2.0 / FPS)     # never two keys on one frame
    key(obj, "scale", t_in, (0.0, 0.0, 0.0))
    key(obj, "scale", t_full, full)
    if t_out is not None:
        t_gone = max(t_gone, t_out + 2.0 / FPS)
        key(obj, "scale", t_out, full)
        key(obj, "scale", t_gone, (0.0, 0.0, 0.0))


def grow(obj, axis, t0, t1, full=1.0, start=0.0):
    """Grow one scale axis (0=x, 1=y, 2=z) from start to full; origin sets the anchor.

    The object is fully hidden (scale 0) before t0, so a flattened copy never shows early.
    """
    s = list(obj.scale)
    key(obj, "scale", t0 - 2.0 / FPS, (0.0, 0.0, 0.0))
    s[axis] = start
    key(obj, "scale", t0, tuple(s))
    s[axis] = full
    key(obj, "scale", t1, tuple(s))


# ---------------------------------------------------------------- materials

def _principled(name):
    m = bpy.data.materials.new(name)
    try:
        m.use_nodes = True
    except AttributeError:
        pass
    nt = m.node_tree
    nt.nodes.clear()
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    p = nt.nodes.new("ShaderNodeBsdfPrincipled")
    nt.links.new(p.outputs["BSDF"], out.inputs["Surface"])
    return m, nt, p


def mat(name, color, rough=0.6, metal=0.0, emit=0.0, emit_color=None, transmission=0.0,
        ior=1.45, alpha=1.0):
    m, nt, p = _principled(name)
    p.inputs["Base Color"].default_value = (*color, 1.0)
    p.inputs["Roughness"].default_value = rough
    p.inputs["Metallic"].default_value = metal
    p.inputs["IOR"].default_value = ior
    p.inputs["Transmission Weight"].default_value = transmission
    if emit:
        p.inputs["Emission Color"].default_value = (*(emit_color or color), 1.0)
        p.inputs["Emission Strength"].default_value = emit
    if alpha < 1.0:
        p.inputs["Alpha"].default_value = alpha
        try:
            m.surface_render_method = "BLENDED"
        except AttributeError:
            pass
    return m


def soil_mat(name, dark, light, gouge=True, scale=5.0):
    """Sculpted dirt face: mottled colour plus vertical gouge bump (bible 2.1)."""
    m, nt, p = _principled(name)
    p.inputs["Roughness"].default_value = 0.95
    tc = nt.nodes.new("ShaderNodeTexCoord")
    noise = nt.nodes.new("ShaderNodeTexNoise")
    noise.inputs["Scale"].default_value = scale
    noise.inputs["Detail"].default_value = 10.0
    nt.links.new(tc.outputs["Object"], noise.inputs["Vector"])
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].position = 0.35
    ramp.color_ramp.elements[0].color = (*dark, 1)
    ramp.color_ramp.elements[1].position = 0.7
    ramp.color_ramp.elements[1].color = (*light, 1)
    nt.links.new(ramp.outputs["Color"], p.inputs["Base Color"])
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.9
    height = noise.outputs["Fac"]
    if gouge:
        # vertical gouge streaks, warped by noise, in both colour and relief
        wave = nt.nodes.new("ShaderNodeTexWave")
        wave.wave_type = "BANDS"
        wave.bands_direction = "X"
        wave.inputs["Scale"].default_value = 2.2
        wave.inputs["Distortion"].default_value = 8.0
        wave.inputs["Detail"].default_value = 4.0
        nt.links.new(tc.outputs["Object"], wave.inputs["Vector"])
        mix = nt.nodes.new("ShaderNodeMath")
        mix.operation = "MULTIPLY_ADD"          # noise * 0.6 + wave * 0.4 (wave pre-scaled below)
        mix.inputs[1].default_value = 0.6
        wscale = nt.nodes.new("ShaderNodeMath")
        wscale.operation = "MULTIPLY"
        wscale.inputs[1].default_value = 0.4
        nt.links.new(wave.outputs["Fac"], wscale.inputs[0])
        nt.links.new(noise.outputs["Fac"], mix.inputs[0])
        nt.links.new(wscale.outputs["Value"], mix.inputs[2])
        height = mix.outputs["Value"]
    nt.links.new(height, ramp.inputs["Fac"])
    nt.links.new(height, bump.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], p.inputs["Normal"])
    return m


def rock_mat(name, base=(0.33, 0.33, 0.35)):
    """Mottled grey bedrock with a few thin dark cracks."""
    m, nt, p = _principled(name)
    p.inputs["Roughness"].default_value = 0.85
    tc = nt.nodes.new("ShaderNodeTexCoord")
    noise = nt.nodes.new("ShaderNodeTexNoise")
    noise.inputs["Scale"].default_value = 2.5
    noise.inputs["Detail"].default_value = 8.0
    nt.links.new(tc.outputs["Object"], noise.inputs["Vector"])
    tone = nt.nodes.new("ShaderNodeValToRGB")
    tone.color_ramp.elements[0].position = 0.3
    tone.color_ramp.elements[0].color = (*(c * 0.75 for c in base), 1)
    tone.color_ramp.elements[1].position = 0.7
    tone.color_ramp.elements[1].color = (*(c * 1.2 for c in base), 1)
    nt.links.new(noise.outputs["Fac"], tone.inputs["Fac"])
    vor = nt.nodes.new("ShaderNodeTexVoronoi")
    vor.feature = "DISTANCE_TO_EDGE"
    vor.inputs["Scale"].default_value = 0.45
    vor.inputs["Randomness"].default_value = 1.0
    nt.links.new(tc.outputs["Object"], vor.inputs["Vector"])
    crack = nt.nodes.new("ShaderNodeValToRGB")
    crack.color_ramp.elements[0].position = 0.0
    crack.color_ramp.elements[0].color = (0.2, 0.2, 0.2, 1)
    crack.color_ramp.elements[1].position = 0.012
    crack.color_ramp.elements[1].color = (1, 1, 1, 1)
    nt.links.new(vor.outputs["Distance"], crack.inputs["Fac"])
    mul = nt.nodes.new("ShaderNodeVectorMath")
    mul.operation = "MULTIPLY"
    nt.links.new(tone.outputs["Color"], mul.inputs[0])
    nt.links.new(crack.outputs["Color"], mul.inputs[1])
    nt.links.new(mul.outputs["Vector"], p.inputs["Base Color"])
    bump = nt.nodes.new("ShaderNodeBump")
    bump.inputs["Strength"].default_value = 0.4
    nt.links.new(noise.outputs["Fac"], bump.inputs["Height"])
    nt.links.new(bump.outputs["Normal"], p.inputs["Normal"])
    return m


def stripe_mat(name, a, b, width=1.2):
    """Striped mowing pattern, stripes running along Y (toward the camera)."""
    m, nt, p = _principled(name)
    p.inputs["Roughness"].default_value = 0.8
    tc = nt.nodes.new("ShaderNodeTexCoord")
    sep = nt.nodes.new("ShaderNodeSeparateXYZ")
    nt.links.new(tc.outputs["Object"], sep.inputs["Vector"])
    div = nt.nodes.new("ShaderNodeMath")
    div.operation = "DIVIDE"
    div.inputs[1].default_value = width * 2
    nt.links.new(sep.outputs["X"], div.inputs[0])
    fr = nt.nodes.new("ShaderNodeMath")
    fr.operation = "FRACT"
    nt.links.new(div.outputs["Value"], fr.inputs[0])
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.interpolation = "CONSTANT"
    ramp.color_ramp.elements[0].color = (*a, 1)
    ramp.color_ramp.elements[1].position = 0.5
    ramp.color_ramp.elements[1].color = (*b, 1)
    nt.links.new(fr.outputs["Value"], ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], p.inputs["Base Color"])
    return m


def foam_water_mat(name):
    """Blue water broken up with white foam (spillway cascades)."""
    m, nt, p = _principled(name)
    p.inputs["Roughness"].default_value = 0.2
    tc = nt.nodes.new("ShaderNodeTexCoord")
    noise = nt.nodes.new("ShaderNodeTexNoise")
    noise.inputs["Scale"].default_value = 9.0
    noise.inputs["Detail"].default_value = 6.0
    nt.links.new(tc.outputs["Object"], noise.inputs["Vector"])
    ramp = nt.nodes.new("ShaderNodeValToRGB")
    ramp.color_ramp.elements[0].position = 0.45
    ramp.color_ramp.elements[0].color = (0.12, 0.45, 0.9, 1)
    ramp.color_ramp.elements[1].position = 0.6
    ramp.color_ramp.elements[1].color = (0.95, 0.97, 1.0, 1)
    nt.links.new(noise.outputs["Fac"], ramp.inputs["Fac"])
    nt.links.new(ramp.outputs["Color"], p.inputs["Base Color"])
    nt.links.new(ramp.outputs["Color"], p.inputs["Emission Color"])
    p.inputs["Emission Strength"].default_value = 0.25
    return m


def palette():
    """Bible 2.3 colour codes as named materials."""
    return {
        "topsoil": soil_mat("Topsoil", (0.20, 0.10, 0.04), (0.38, 0.20, 0.09)),
        "subsoil": soil_mat("Subsoil", (0.36, 0.22, 0.11), (0.55, 0.36, 0.19)),
        "clay": soil_mat("Clay", (0.13, 0.06, 0.03), (0.24, 0.12, 0.06), scale=8.0),
        "groundwater": mat("Groundwater", (0.06, 0.24, 0.6), rough=0.3, emit=0.12),
        "bedrock": rock_mat("Bedrock", base=(0.3, 0.29, 0.28)),
        "void": mat("Void", (0.035, 0.02, 0.012), rough=1.0),
        "concrete": soil_mat("Concrete", (0.15, 0.15, 0.15), (0.21, 0.21, 0.2), gouge=False, scale=14.0),
        "concrete_light": soil_mat("ConcreteLight", (0.23, 0.23, 0.22), (0.3, 0.3, 0.28), gouge=False, scale=14.0),
        "steel": mat("Steel", (0.55, 0.57, 0.6), rough=0.35, metal=1.0),
        "asphalt": mat("Asphalt", (0.03, 0.03, 0.035), rough=0.9),
        "water": mat("Water", (0.10, 0.42, 0.88), rough=0.04, transmission=0.85, ior=1.33,
                     emit=0.35, emit_color=(0.05, 0.3, 0.8)),
        "seepage": mat("Seepage", (0.1, 0.45, 1.0), rough=0.2, emit=0.9),
        "foam": foam_water_mat("FoamWater"),
        "force_red": mat("ForceRed", (0.9, 0.04, 0.02), rough=0.4, emit=0.9),
        "load_white": mat("LoadWhite", (1.0, 1.0, 1.0), rough=0.4, emit=1.0),
        "heat_orange": mat("HeatOrange", (1.0, 0.45, 0.05), rough=0.4, emit=1.2),
        "bolt_yellow": mat("BoltYellow", (1.0, 0.85, 0.05), rough=0.4, emit=1.5),
        "glass": mat("Glass", (0.9, 0.97, 1.0), rough=0.0, transmission=1.0, ior=1.5),
        "callout_yellow": mat("CalloutYellow", (1.0, 0.78, 0.1), rough=0.5, emit=1.2),
        "sign_green": mat("SignGreen", (0.02, 0.35, 0.15), rough=0.5),
        "sign_white": mat("SignWhite", (0.95, 0.95, 0.95), rough=0.5, emit=0.3),
        "black": mat("Black", (0.02, 0.02, 0.02), rough=0.6),
    }


# ---------------------------------------------------------------- geometry helpers

def _link(obj, collection=None):
    (collection or bpy.context.scene.collection).objects.link(obj)
    return obj


def mesh_obj(name, verts, faces, material=None, collection=None, smooth=False):
    me = bpy.data.meshes.new(name)
    me.from_pydata(verts, [], faces)
    me.update()
    if smooth:
        for poly in me.polygons:
            poly.use_smooth = True
    obj = bpy.data.objects.new(name, me)
    if material:
        me.materials.append(material)
    return _link(obj, collection)


def box(name, x0, x1, y0, y1, z0, z1, material=None, origin=None, collection=None):
    """Axis-aligned box from min/max corners. origin = (x, y, z) pivot, default centre."""
    ox, oy, oz = origin or ((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2)
    v = [(x - ox, y - oy, z - oz) for x in (x0, x1) for y in (y0, y1) for z in (z0, z1)]
    faces = [(0, 1, 3, 2), (4, 6, 7, 5), (0, 4, 5, 1), (2, 3, 7, 6), (0, 2, 6, 4), (1, 5, 7, 3)]
    obj = mesh_obj(name, v, faces, material, collection)
    obj.location = (ox, oy, oz)
    return obj


def prism(name, profile_xz, y0, y1, material=None, origin=(0, 0, 0), collection=None):
    """Extrude a convex X-Z polygon along Y. Returns the object (vertex order kept for shape keys)."""
    ox, oy, oz = origin
    n = len(profile_xz)
    v = [(x - ox, y0 - oy, z - oz) for x, z in profile_xz] + [(x - ox, y1 - oy, z - oz) for x, z in profile_xz]
    faces = [tuple(range(n))[::-1], tuple(range(n, 2 * n))]
    faces += [(i, (i + 1) % n, n + (i + 1) % n, n + i) for i in range(n)]
    obj = mesh_obj(name, v, faces, material, collection)
    obj.location = origin
    return obj


def cylinder(name, radius, depth, location, rotation=(0, 0, 0), material=None, verts=24):
    bpy.ops.mesh.primitive_cylinder_add(radius=radius, depth=depth, vertices=verts,
                                        location=location, rotation=rotation)
    obj = bpy.context.active_object
    obj.name = name
    if material:
        obj.data.materials.append(material)
    return obj


def ico(name, radius, location, subdiv=2, material=None, smooth=True):
    bpy.ops.mesh.primitive_ico_sphere_add(radius=radius, subdivisions=subdiv, location=location)
    obj = bpy.context.active_object
    obj.name = name
    if material:
        obj.data.materials.append(material)
    if smooth:
        for poly in obj.data.polygons:
            poly.use_smooth = True
    return obj


def arrow(name, length, material, direction="+X", shaft=0.09, head=0.24, head_len=0.38):
    """Arrow mesh with its TIP at the object origin, so scaling grows it back from the tip.

    direction is where the arrow points: +X, -X, +Z, -Z.
    """
    segs = 16
    verts, faces = [], []
    head_len = min(head_len, length * 0.6)

    def ring(r, a):  # circle in the plane orthogonal to the axis, at axis distance a (behind tip)
        return [(-a, r * math.cos(2 * math.pi * i / segs), r * math.sin(2 * math.pi * i / segs))
                for i in range(segs)]

    verts += ring(shaft, length)            # 0..15 shaft back
    verts += ring(shaft, head_len)          # 16..31 shaft front
    verts += ring(head, head_len)           # 32..47 head base
    verts.append((0.0, 0.0, 0.0))           # 48 tip
    verts.append((-length, 0.0, 0.0))       # 49 back cap centre
    for i in range(segs):
        j = (i + 1) % segs
        faces.append((i, j, 16 + j, 16 + i))
        faces.append((16 + i, 16 + j, 32 + j, 32 + i))
        faces.append((32 + i, 32 + j, 48))
        faces.append((49, j, i))
    obj = mesh_obj(name, verts, faces, material, smooth=False)
    rot = {"+X": (0, 0, 0), "-X": (0, 0, math.pi), "+Z": (0, -math.pi / 2, 0), "-Z": (0, math.pi / 2, 0)}
    obj.rotation_euler = rot[direction]
    return obj


def poly_curve(name, points, bevel, material, collection=None):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = bevel
    cu.bevel_resolution = 3
    cu.use_fill_caps = True
    sp = cu.splines.new("POLY")
    sp.points.add(len(points) - 1)
    for p, co in zip(sp.points, points):
        p.co = (*co, 1.0)
    obj = bpy.data.objects.new(name, cu)
    cu.materials.append(material)
    return _link(obj, collection)


def text_obj(name, body, size, material, location, rotation=(math.pi / 2, 0, 0), extrude=0.02,
             align="CENTER"):
    cu = bpy.data.curves.new(name, "FONT")
    cu.body = body
    cu.size = size
    cu.extrude = extrude
    cu.align_x = align
    cu.align_y = "CENTER"
    obj = bpy.data.objects.new(name, cu)
    cu.materials.append(material)
    obj.location = location
    obj.rotation_euler = rotation
    return _link(obj)


def empty(name, location=(0, 0, 0)):
    e = bpy.data.objects.new(name, None)
    e.location = location
    return _link(e)


def parent(child, par):
    bpy.context.view_layer.update()        # matrix_world is stale until the depsgraph updates
    m = child.matrix_world.copy()
    child.parent = par
    child.matrix_parent_inverse = par.matrix_world.inverted()
    child.matrix_world = m


# ---------------------------------------------------------------- brand environment

def world_sky(scene, color=(0.42, 0.62, 0.95), strength=1.0):
    w = bpy.data.worlds.new("Sky")
    scene.world = w
    try:
        w.use_nodes = True
    except AttributeError:
        pass
    bg = next(n for n in w.node_tree.nodes if n.type == "BACKGROUND")
    bg.inputs["Color"].default_value = (*color, 1)
    bg.inputs["Strength"].default_value = strength
    return bg


def sun(strength=4.0, rotation=(math.radians(50), math.radians(12), math.radians(-28))):
    data = bpy.data.lights.new("Sun", "SUN")
    data.energy = strength
    data.angle = math.radians(3)
    obj = bpy.data.objects.new("Sun", data)
    obj.rotation_euler = rotation
    return _link(obj)


def lowpoly_tree(name, location, height=4.0, seed=0):
    rnd = random.Random(seed)
    x, y, z = location
    trunk_mat = bpy.data.materials.get("TreeTrunk") or mat("TreeTrunk", (0.25, 0.14, 0.07), rough=0.9)
    leaf_mat = bpy.data.materials.get("TreeLeaf") or mat("TreeLeaf", (0.16, 0.42, 0.12), rough=0.85)
    trunk = cylinder(f"{name}_trunk", 0.18, height * 0.45, (x, y, z + height * 0.225), material=trunk_mat, verts=6)
    blobs = [trunk]
    for i in range(3):
        r = height * rnd.uniform(0.22, 0.3)
        blobs.append(ico(f"{name}_leaf{i}", r, (x + rnd.uniform(-0.5, 0.5), y + rnd.uniform(-0.4, 0.4),
                                                  z + height * (0.55 + 0.17 * i)),
                         subdiv=1, material=leaf_mat, smooth=False))
    return blobs


def house(location, width=8.0, depth=6.0, height=3.6):
    """Brand house: white siding, red-brown roof, blue window frames (bible 2.2)."""
    x, y, z = location
    siding = mat("Siding", (0.9, 0.9, 0.88), rough=0.7)
    roof_m = mat("Roof", (0.42, 0.13, 0.07), rough=0.8)
    frame_m = mat("WindowFrame", (0.08, 0.28, 0.75), rough=0.5)
    glass_m = mat("WindowGlass", (0.12, 0.16, 0.2), rough=0.1, emit=0.0, emit_color=(1.0, 0.75, 0.4))
    parts = [box("House", x - width / 2, x + width / 2, y, y + depth, z, z + height, siding)]
    ridge = height + 2.2
    roof = prism("Roof", [(x - width / 2 - 0.4, z + height - 0.05), (x + width / 2 + 0.4, z + height - 0.05),
                          (x, z + ridge)], y - 0.4, y + depth + 0.4, roof_m)
    parts.append(roof)
    windows = []
    for wx in (x - width * 0.3, x + width * 0.3):
        for wz in (z + 1.0,):
            parts.append(box("WinFrame", wx - 0.75, wx + 0.75, y - 0.06, y, wz, wz + 1.4, frame_m))
            g = box("WinGlass", wx - 0.6, wx + 0.6, y - 0.08, y - 0.02, wz + 0.15, wz + 1.25, glass_m)
            windows.append(g)
    door = box("Door", x - 0.5, x + 0.5, y - 0.05, y, z, z + 2.1, frame_m)
    parts.append(door)
    return parts, glass_m


def fence(x0, x1, y, z=0.0, height=1.0, spacing=0.5):
    white = bpy.data.materials.get("FenceWhite") or mat("FenceWhite", (0.95, 0.95, 0.93), rough=0.6)
    n = int((x1 - x0) / spacing) + 1
    for i in range(n):
        px = x0 + i * spacing
        box(f"Picket{i}", px - 0.05, px + 0.05, y - 0.03, y + 0.03, z, z + height, white)
    box("RailTop", x0, x1, y - 0.02, y + 0.06, z + height * 0.75, z + height * 0.82, white)
    box("RailLow", x0, x1, y - 0.02, y + 0.06, z + height * 0.3, z + height * 0.37, white)


def clouds(seed=1):
    white = mat("Cloud", (1, 1, 1), rough=1.0, emit=0.6)
    rnd = random.Random(seed)
    for i in range(6):
        c = ico(f"Cloud{i}", rnd.uniform(4, 7), (rnd.uniform(-60, 60), rnd.uniform(140, 200), rnd.uniform(30, 55)),
                subdiv=2, material=white)
        c.scale = (rnd.uniform(1.8, 2.6), 1.0, rnd.uniform(0.45, 0.6))


def cutaway_layers(x0, x1, top, layers, pal, depth_y=40.0):
    """Stack of earth layers under z = top, cut face at y = 0. layers = [(material_key, thickness)]."""
    objs, z = [], top
    for key_name, thick in layers:
        objs.append(box(f"Layer_{key_name}", x0, x1, 0.0, depth_y, z - thick, z, pal[key_name]))
        z -= thick
    return objs


# ---------------------------------------------------------------- camera

class CameraRig:
    def __init__(self, scene, lens=35.0, fstop=4.0):
        data = bpy.data.cameras.new("Cam")
        data.lens = lens
        data.sensor_fit = "VERTICAL"
        data.sensor_height = 36.0
        data.clip_end = 2000.0
        data.dof.use_dof = True
        data.dof.aperture_fstop = fstop
        self.obj = _link(bpy.data.objects.new("Cam", data))
        scene.camera = self.obj

    def key(self, t, location, target, focus=None):
        loc, tgt = Vector(location), Vector(target)
        self.obj.location = loc
        self.obj.rotation_euler = (tgt - loc).to_track_quat("-Z", "Y").to_euler()
        key(self.obj, "location", t)
        key(self.obj, "rotation_euler", t)
        self.obj.data.dof.focus_distance = focus or (tgt - loc).length
        self.obj.data.dof.keyframe_insert("focus_distance", frame=frame(t))


# ---------------------------------------------------------------- render setup

def setup_render(scene, end_t, audio_path=None, width=1080, height=1920):
    r = scene.render
    r.resolution_x, r.resolution_y, r.resolution_percentage = width, height, 100
    r.fps = FPS
    scene.frame_start, scene.frame_end = 1, frame(end_t)
    try:
        r.engine = "BLENDER_EEVEE"
    except TypeError:                      # Blender 4.2-4.x name
        r.engine = "BLENDER_EEVEE_NEXT"
    try:
        scene.eevee.taa_render_samples = 64
        scene.eevee.use_raytracing = True
    except AttributeError:
        pass
    scene.view_settings.view_transform = "Standard"
    scene.view_settings.look = "None"
    try:
        r.image_settings.media_type = "VIDEO"
    except (AttributeError, TypeError):
        pass
    r.image_settings.file_format = "FFMPEG"
    r.ffmpeg.format = "MPEG4"
    r.ffmpeg.codec = "H264"
    r.ffmpeg.constant_rate_factor = "HIGH"
    r.ffmpeg.audio_codec = "AAC"
    r.ffmpeg.audio_bitrate = 192
    r.filepath = "//renders/"              # next to the .blend
    if audio_path and os.path.exists(audio_path):
        ed = scene.sequence_editor_create()
        strips = ed.strips if hasattr(ed, "strips") else ed.sequences   # 4.4+ / older
        strips.new_sound("Voiceover", audio_path, channel=1, frame_start=1)


def preview_cycles(scene, percent=25, samples=12):
    """Cheap CPU stills for QC (EEVEE needs a GPU)."""
    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = samples
    try:
        scene.cycles.use_denoising = True
    except AttributeError:
        pass
    scene.render.resolution_percentage = percent
    try:
        scene.render.image_settings.media_type = "IMAGE"   # Blender 5: formats are grouped by media type
    except (AttributeError, TypeError):
        pass
    scene.render.image_settings.file_format = "PNG"


def cli_args(argv):
    return argv[argv.index("--") + 1:] if "--" in argv else argv[1:]
