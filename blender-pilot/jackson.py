"""Burntwoods Wilds: editable Jackson model and sprite renderer.
Run: blender -b --python jackson.py -- --out ./renders
"""
import bpy, math, os, sys, argparse
from mathutils import Vector
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
p=argparse.ArgumentParser();p.add_argument('--out',default='renders');p.add_argument('--preview',action='store_true');p.add_argument('--states',default='');a=p.parse_args(args);os.makedirs(a.out,exist_ok=True)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
def mat(n,c):
 m=bpy.data.materials.new(n);m.diffuse_color=(*c,1);m.use_nodes=True;m.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value=(*c,1);m.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value=.65;return m
fur=mat('blue grey fur',(.16,.27,.37));cream=mat('cream muzzle',(.92,.83,.66));blue=mat('royal blue kit',(.025,.22,.55));pink=mat('pink ears and nose',(.82,.35,.45));white=mat('ivory',(.95,.94,.84));black=mat('pupil',(.018,.028,.04));iris=mat('blue eyes',(.06,.48,.83));leather=mat('rugby ball',(.48,.20,.075));sole=mat('boot sole',(.025,.065,.12))
root=bpy.data.objects.new('Jackson',None);bpy.context.collection.objects.link(root)
def ball(n,loc,scale,m,parent=root):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=24,ring_count=16,location=loc);o=bpy.context.object;o.name=n;o.scale=scale;o.data.materials.append(m);o.parent=parent
 for f in o.data.polygons:f.use_smooth=True
 return o
ball('shirt',(0,0,.82),(.30,.22,.36),blue);ball('shorts',(0,0,.50),(.27,.21,.15),sole)
head=ball('head',(0,0,1.37),(.42,.30,.37),fur)
for side in (-1,1):
 bpy.ops.mesh.primitive_cone_add(vertices=32,radius1=.145,radius2=.018,depth=.34,location=(side*.29,0,1.70));o=bpy.context.object;o.name='ear';o.scale.y=.65;o.rotation_euler.y=side*.23;o.data.materials.append(fur);o.parent=root
 ball('inner ear',(side*.29,-.071,1.73),(.073,.027,.10),pink)
 ball('cheek',(side*.105,-.265,1.26),(.13,.074,.105),cream)
 ball('eye white',(side*.165,-.268,1.42),(.108,.040,.125),white)
 ball('iris',(side*.165,-.304,1.42),(.063,.020,.084),iris)
 ball('pupil',(side*.165,-.324,1.42),(.025,.009,.065),black)
 ball('eye glint',(side*.165-.018,-.334,1.455),(.015,.008,.020),white)
ball('nose',(0,-.344,1.31),(.038,.025,.025),pink)
def rod(n,start,end,r,m,parent=root):
 d=Vector(end)-Vector(start);bpy.ops.mesh.primitive_cylinder_add(vertices=16,radius=r,depth=d.length,location=(Vector(start)+Vector(end))/2);o=bpy.context.object;o.name=n;o.rotation_euler=d.to_track_quat('Z','Y').to_euler();o.data.materials.append(m);o.parent=parent
 for f in o.data.polygons:f.use_smooth=True
 return o
for side in (-1,1):
 for k in range(3):rod('whisker',(side*.14,-.337,1.26-k*.017),(side*.40,-.32,1.27-k*.045),.006,cream)
rod('mouth left',(0,-.336,1.285),(-.05,-.334,1.25),.007,black)
rod('mouth right',(0,-.336,1.285),(.05,-.334,1.25),.007,black)
arm=[];leg=[]
for side in (-1,1):
 pivot=bpy.data.objects.new('arm pivot',None);bpy.context.collection.objects.link(pivot);pivot.parent=root;pivot.location=(side*.25,0,1.03)
 rod('sleeve',(side*.065,0,-.025),(side*.11,0,-.22),.09,blue,pivot);ball('paw',(side*.11,-.01,-.28),(.105,.09,.11),fur,pivot);arm.append(pivot)
 pivot=bpy.data.objects.new('leg pivot',None);bpy.context.collection.objects.link(pivot);pivot.parent=root;pivot.location=(side*.14,0,.50)
 rod('leg',(0,0,0),(0,0,-.24),.085,fur,pivot);ball('sock',(0,0,-.25),(.09,.09,.08),white,pivot);ball('boot',(0,-.065,-.36),(.12,.17,.09),blue,pivot);ball('sole',(0,-.065,-.405),(.125,.175,.025),sole,pivot);leg.append(pivot)
for k in range(8):
 t=k/7;ball('tail',( .23+math.sin(t*1.9)*.29,.12+t*.13,.58+t*.36),(.058,.058,.068),fur)
ballobj=ball('rugby ball',(.40,-.17,.76),(.11,.10,.18),leather)
for k in range(4):rod('ball stitch',(.37,-.273,.67+k*.05),(.43,-.273,.67+k*.05),.007,white)
for o in list(bpy.data.objects):
 if o.name=='rugby ball' or o.name.startswith('ball stitch'):
  o.parent=arm[1];o.location-=arm[1].location
# Kit number is actual editable text geometry.
bpy.ops.object.text_add(location=(0,-.217,.81),rotation=(math.pi/2,0,0));text=bpy.context.object;text.name='number 11';text.data.body='11';text.data.align_x='CENTER';text.data.size=.19;text.data.extrude=.002;text.data.materials.append(white);text.parent=root
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=48;scene.cycles.use_denoising=False;scene.render.threads_mode='FIXED';scene.render.threads=4;scene.render.film_transparent=True;scene.render.resolution_x=224;scene.render.resolution_y=224;scene.render.resolution_percentage=100;scene.render.image_settings.file_format='PNG';scene.view_settings.view_transform='Standard';scene.view_settings.look='Medium High Contrast';scene.world.color=(.35,.35,.35)
for loc,energy,size in [((-3,-4,6),350,4),((3,1,4),200,3)]:
 bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.data.energy=energy;o.data.size=size;o.rotation_euler=(Vector((0,0,1))-o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add(location=(0,-5,3.55));cam=bpy.context.object;cam.rotation_euler=(Vector((0,0,.92))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=3.2;scene.camera=cam
bpy.ops.wm.save_as_mainfile(filepath=os.path.abspath(os.path.join(a.out,'jackson.blend')))
states=['idle','walk','throw','charge','hit','death','tell','stomp']
for state in (['idle'] if a.preview else (a.states.split(',') if a.states else states)):
 for direction in ( [2] if a.preview else range(8)):
  for frame in ( [0] if a.preview else range(6)):
   t=frame/6*math.tau;root.rotation_euler=(0,0,math.pi/2-direction*math.tau/8);root.location=(0,0,0)
   for i in range(2):leg[i].rotation_euler=(math.sin(t+i*math.pi)*(.55 if state in ['walk','charge'] else .04),0,0);arm[i].rotation_euler=(-math.sin(t+i*math.pi)*(.5 if state=='walk' else .04),0,0)
   if state=='throw':arm[1].rotation_euler.x=-1.3*math.sin(frame/5*math.pi);root.rotation_euler.z+=.12*math.sin(frame/5*math.pi)
   if state=='charge':root.location.z=.02*abs(math.sin(t));root.rotation_euler.x=.22;arm[1].rotation_euler.x=-.8;arm[0].rotation_euler.x=-.35
   if state=='hit':root.rotation_euler.x=-.22*math.sin(frame/5*math.pi)
   if state=='death':root.rotation_euler.y=frame/5*1.4;root.location.x=-frame/5*.65*math.cos(root.rotation_euler.z);root.location.y=-frame/5*.65*math.sin(root.rotation_euler.z);root.location.z=frame/5*.30
   if state in ['tell','stomp']:root.location.z=-.07*math.sin(frame/5*math.pi)
   scene.render.filepath=os.path.join(a.out,f'{state}-{direction}-{frame}.png');bpy.ops.render.render(write_still=True)
