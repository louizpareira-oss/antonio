"""Build a Myth POV character on the CMU mocap skeleton and export a .glb with every clip as an animation.

  xvfb-run -a blender -b --python skills/myth-pov/scripts/build_character.py -- spec.json

spec.json:
{ "out": "aitrends-2d-studio/projects/tyr/assets/hero.glb",
  "clips": ["skills/myth-pov/mocap/07_01.bvh", "skills/myth-pov/mocap/86_02.bvh"],   # first clip defines the skeleton
  "height": 1.75,                       # metres, top of head
  "skin": [0.62, 0.58, 0.55],           # matte clay base (linear RGB 0-1)
  "cloth": [0.12, 0.22, 0.42], "cloth2": [0.35, 0.25, 0.18],
  "thread": true,                       # the Golden Thread (only for YOU)
  "glow": null,                         # god aura colour, e.g. [0.2, 1.0, 0.4] for Loki
  "helmet": "none" | "horns" | "laurel" | "nemes" | "circlet" | "hood",
  "cape": true }
Rigid skinning: each body part follows one bone, so any CMU clip plays without weight painting.
Eyes/brows are separate meshes named Eye_L/Eye_R/Pupil_L/Pupil_R/Brow_L/Brow_R parented to Head for animation in Three.js.
"""
import bpy, sys, json, math
from mathutils import Vector
spec = json.load(open(sys.argv[sys.argv.index('--') + 1]))
bpy.ops.wm.read_factory_settings(use_empty=True)
bpy.context.scene.render.fps = 30
clips = spec['clips']

def import_bvh(p, scale):
    bpy.ops.import_anim.bvh(filepath=p, global_scale=scale, rotate_mode='NATIVE', axis_forward='-Z', axis_up='Y',
                            use_fps_scale=True, update_scene_fps=False, update_scene_duration=True)
    return bpy.context.object

# 1) measure the skeleton, then re-import at the scale that gives the requested height
probe = import_bvh(clips[0], 1.0)
zs = [(probe.matrix_world @ b.tail_local).z for b in probe.data.bones] + [(probe.matrix_world @ b.head_local).z for b in probe.data.bones]
span = max(zs) - min(zs); bpy.data.objects.remove(probe)
for a in list(bpy.data.actions): bpy.data.actions.remove(a)
scale = spec.get('height', 1.75) / (span * 1.10)          # head bone tail sits ~10 % under the top of the skull
arm = import_bvh(clips[0], scale); arm.name = 'Rig'
name0 = clips[0].split('/')[-1].replace('.bvh', ''); arm.animation_data.action.name = name0
for p in clips[1:]:
    o = import_bvh(p, scale); act = o.animation_data.action; act.name = p.split('/')[-1].replace('.bvh', ''); act.use_fake_user = True
    bpy.data.objects.remove(o)
    trk = arm.animation_data.nla_tracks.new(); trk.name = act.name; trk.strips.new(act.name, 1, act); trk.mute = True

B = {b.name: (arm.matrix_world @ b.head_local, arm.matrix_world @ b.tail_local) for b in arm.data.bones}
def M(name, rgb, rough=0.62, emit=None, strength=0.0):
    m = bpy.data.materials.new(name); m.use_nodes = True; n = m.node_tree.nodes['Principled BSDF']
    n.inputs['Base Color'].default_value = (*rgb, 1); n.inputs['Roughness'].default_value = rough
    if emit: n.inputs['Emission Color'].default_value = (*emit, 1); n.inputs['Emission Strength'].default_value = strength
    return m
SKIN = M('clay', spec.get('skin', [0.62, 0.58, 0.55]))
CL = M('cloth', spec.get('cloth', [0.12, 0.22, 0.42]), 0.8)
CL2 = M('cloth2', spec.get('cloth2', [0.35, 0.25, 0.18]), 0.8)
WHITE = M('eye', [1, 1, 1], 0.3, [1, 1, 1], 1.5); DARK = M('pupil', [0.02, 0.02, 0.03], 0.3)
GOLD = M('thread', [1.0, 0.75, 0.25], 0.3, [1.0, 0.7, 0.2], 6.0)
parts = []
def tag(o, bone, mat):
    for f in o.data.polygons: f.use_smooth = True
    o.data.materials.append(mat); vg = o.vertex_groups.new(name=bone); vg.add(list(range(len(o.data.vertices))), 1.0, 'REPLACE'); parts.append(o)
def seg(bone, r0, r1, mat, ext=0.0):
    a, b = B[bone]; d = (b - a); L = d.length
    if L < 1e-4: return
    a2 = a - d.normalized() * ext; b2 = b + d.normalized() * ext; L2 = (b2 - a2).length
    bpy.ops.mesh.primitive_cone_add(vertices=14, radius1=r0, radius2=r1, depth=L2)
    o = bpy.context.object; o.rotation_mode = 'QUATERNION'; o.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(d.normalized()); o.location = (a2 + b2) / 2
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True); tag(o, bone, mat)
def ball(bone, r, mat, where=0.0, sc=(1, 1, 1), off=(0, 0, 0)):
    a, b = B[bone]; p = a.lerp(b, where) + Vector(off)
    bpy.ops.mesh.primitive_uv_sphere_add(segments=20, ring_count=12, radius=r, location=p); o = bpy.context.object
    o.scale = sc; bpy.ops.object.transform_apply(scale=True); tag(o, bone, mat); return o

h = spec.get('height', 1.75); k = h / 1.75
for s in ('Left', 'Right'):
    seg(f'{s}UpLeg', 0.085 * k, 0.065 * k, CL2, 0.03); seg(f'{s}Leg', 0.062 * k, 0.045 * k, CL2, 0.02); ball(f'{s}Leg', 0.068 * k, CL2)
    seg(f'{s}Foot', 0.05 * k, 0.045 * k, DARK); ball(f'{s}Foot', 0.052 * k, DARK); ball(f'{s}ToeBase', 0.045 * k, DARK)
    seg(f'{s}Arm', 0.058 * k, 0.046 * k, CL, 0.02); ball(f'{s}Arm', 0.07 * k, CL); seg(f'{s}ForeArm', 0.045 * k, 0.036 * k, SKIN)
    ball(f'{s}ForeArm', 0.048 * k, SKIN); ball(f'{s}Hand', 0.052 * k, SKIN, 0.3, (1, 1, 1.25))
seg('LowerBack', 0.15 * k, 0.16 * k, CL, 0.04); seg('Spine', 0.16 * k, 0.17 * k, CL, 0.03); seg('Spine1', 0.17 * k, 0.13 * k, CL, 0.02)
ball('Hips', 0.16 * k, CL2, 0, (1, 0.85, 1)); seg('Neck', 0.055 * k, 0.05 * k, SKIN, 0.03); seg('Neck1', 0.05 * k, 0.05 * k, SKIN, 0.02)
hb = 'Head'; ha, ht = B[hb]; hd = (ht - ha).normalized(); hc = ha.lerp(ht, 0.75)
head = ball(hb, 0.125 * k, SKIN, 0.75, (0.95, 1.0, 1.1))
fwd = Vector((0, -1, 0))                                     # CMU rest pose faces -Y after the axis conversion (Blender); glTF +Z
side = Vector((1, 0, 0))
for nm, sgn in (('L', 1), ('R', -1)):
    e = hc + fwd * 0.105 * k + side * sgn * 0.045 * k + hd * 0.015 * k
    bpy.ops.mesh.primitive_uv_sphere_add(segments=16, ring_count=10, radius=0.034 * k, location=e); o = bpy.context.object; o.name = f'Eye_{nm}'; o.scale = (1, 0.6, 1.25); bpy.ops.object.transform_apply(scale=True); tag(o, hb, WHITE)
    bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=8, radius=0.016 * k, location=e + fwd * 0.018 * k); o = bpy.context.object; o.name = f'Pupil_{nm}'; tag(o, hb, DARK)
    bpy.ops.mesh.primitive_cube_add(size=1, location=e + hd * 0.05 * k + fwd * 0.01 * k); o = bpy.context.object; o.name = f'Brow_{nm}'; o.scale = (0.045 * k, 0.012 * k, 0.012 * k); bpy.ops.object.transform_apply(scale=True); tag(o, hb, DARK)
if spec.get('thread', False):                                 # the Golden Thread: a diagonal glowing band across the chest
    a, b = B['Spine1']; c = a.lerp(b, 0.4)
    bpy.ops.mesh.primitive_torus_add(major_radius=0.175 * k, minor_radius=0.012 * k, location=c, rotation=(math.radians(90), math.radians(35), 0))
    tag(bpy.context.object, 'Spine1', GOLD)
helm = spec.get('helmet', 'none')
if helm == 'horns':
    for sgn in (1, -1):
        bpy.ops.mesh.primitive_cone_add(vertices=10, radius1=0.03 * k, depth=0.16 * k, location=hc + hd * 0.11 * k + side * sgn * 0.1 * k, rotation=(0, sgn * math.radians(-40), 0)); tag(bpy.context.object, hb, M('horn', [0.9, 0.85, 0.7], 0.5))
elif helm in ('circlet', 'laurel'):
    bpy.ops.mesh.primitive_torus_add(major_radius=0.13 * k, minor_radius=0.012 * k, location=hc + hd * 0.06 * k); tag(bpy.context.object, hb, GOLD if helm == 'circlet' else M('leaf', [0.2, 0.45, 0.15]))
elif helm == 'hood':
    ball(hb, 0.145 * k, CL, 0.72, (1.0, 1.05, 1.1), tuple(-fwd * 0.03 * k))
elif helm == 'nemes':
    ball(hb, 0.14 * k, M('nemes', [0.85, 0.7, 0.2], 0.5), 0.8, (1.1, 1.0, 1.05), tuple(-fwd * 0.02 * k))
if spec.get('glow'):
    for o in parts:
        for m in o.data.materials:
            if m.name.startswith('cloth'): n = m.node_tree.nodes['Principled BSDF']; n.inputs['Emission Color'].default_value = (*spec['glow'], 1); n.inputs['Emission Strength'].default_value = 0.6
bpy.ops.object.select_all(action='DESELECT')
for o in parts: o.select_set(True)
bpy.context.view_layer.objects.active = parts[0]; bpy.ops.object.join(); body = bpy.context.object; body.name = 'Body'
body.modifiers.new('Armature', 'ARMATURE').object = arm; body.parent = arm
bpy.ops.export_scene.gltf(filepath=spec['out'], export_format='GLB', export_animations=True, export_skins=True, export_yup=True,
                          export_animation_mode='ACTIONS', export_force_sampling=True, export_nla_strips=False)
print('EXPORTED', spec['out'], 'clips', [a.name for a in bpy.data.actions], 'scale', round(scale, 4))
