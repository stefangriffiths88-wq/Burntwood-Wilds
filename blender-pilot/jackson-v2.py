"""Burntwoods Wilds: editable Jackson model and sprite renderer.
Run: blender -b --python jackson.py -- --out ./renders
"""
import bpy, math, os, sys, argparse
from mathutils import Vector
args=sys.argv[sys.argv.index('--')+1:] if '--' in sys.argv else []
p=argparse.ArgumentParser();p.add_argument('--out',default='renders');p.add_argument('--preview',action='store_true');p.add_argument('--states',default='');p.add_argument('--portrait',action='store_true');a=p.parse_args(args);os.makedirs(a.out,exist_ok=True)
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
def mat(n,c):
 m=bpy.data.materials.new(n);m.diffuse_color=(*c,1);m.use_nodes=True;m.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value=(*c,1);m.node_tree.nodes['Principled BSDF'].inputs['Roughness'].default_value=.65;return m
fur=mat('blue grey fur',(.16,.27,.37));cream=mat('cream muzzle',(.92,.83,.66));blue=mat('royal blue kit',(.025,.22,.55));pink=mat('pink ears and nose',(.82,.35,.45));white=mat('ivory',(.95,.94,.84));black=mat('pupil',(.018,.028,.04));iris=mat('blue eyes',(.06,.48,.83));leather=mat('rugby ball',(.48,.20,.075));sole=mat('boot sole',(.025,.065,.12))
root=bpy.data.objects.new('Jackson',None);bpy.context.collection.objects.link(root)
def ball(n,loc,scale,m,parent=root):
 bpy.ops.mesh.primitive_uv_sphere_add(segments=24,ring_count=16,location=loc);o=bpy.context.object;o.name=n;o.scale=scale;o.data.materials.append(m);o.parent=parent
 for f in o.data.polygons:f.use_smooth=True
 return o
ball('shirt',(0,0,.82),(.245,.19,.36),blue);ball('shorts',(0,0,.50),(.235,.19,.15),sole)
head=ball('head',(0,0,1.37),(.34,.265,.34),fur)
for side in (-1,1):
 bpy.ops.mesh.primitive_cone_add(vertices=32,radius1=.145,radius2=.018,depth=.34,location=(side*.245,0,1.66));o=bpy.context.object;o.name='ear';o.scale.y=.65;o.rotation_euler.y=side*.23;o.data.materials.append(fur);o.parent=root
 ball('inner ear',(side*.245,-.071,1.69),(.073,.027,.10),pink)
 ball('cheek',(side*.105,-.265,1.26),(.13,.074,.105),cream)
 ball('eye white',(side*.14,-.268,1.42),(.096,.036,.11),white)
 ball('iris',(side*.14,-.304,1.42),(.057,.020,.076),iris)
 ball('pupil',(side*.14,-.324,1.42),(.025,.009,.065),black)
 ball('eye glint',(side*.14-.018,-.334,1.455),(.015,.008,.020),white)
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
 pivot=bpy.data.objects.new('arm pivot',None);bpy.context.collection.objects.link(pivot);pivot.parent=root;pivot.location=(side*.22,0,1.03)
 rod('sleeve',(side*.065,0,-.025),(side*.11,0,-.22),.08,blue,pivot);ball('paw',(side*.11,-.01,-.28),(.088,.08,.10),fur,pivot);arm.append(pivot)
 pivot=bpy.data.objects.new('leg pivot',None);bpy.context.collection.objects.link(pivot);pivot.parent=root;pivot.location=(side*.14,0,.50)
 rod('leg',(0,0,0),(0,0,-.24),.085,fur,pivot);ball('sock',(0,0,-.25),(.09,.09,.08),white,pivot);ball('boot',(0,-.065,-.36),(.12,.17,.09),blue,pivot);ball('sole',(0,-.065,-.405),(.125,.175,.025),sole,pivot);leg.append(pivot)
ballobj=ball('rugby ball',(.40,-.17,.76),(.11,.10,.18),leather)
for k in range(4):rod('ball stitch',(.37,-.273,.67+k*.05),(.43,-.273,.67+k*.05),.007,white)
for o in list(bpy.data.objects):
 if o.name=='rugby ball' or o.name.startswith('ball stitch'):
  o.parent=arm[1];o.location-=arm[1].location
# Organic fur, swept brown hair and the Burntwood kit.
import random
random.seed(11)
green=mat('Burntwood emerald',(.012,.34,.14));red=mat('Burntwood red',(.62,.018,.025));brown=mat('Jackson brown hair',(.20,.085,.032));hairlight=mat('hair highlights',(.34,.17,.065));stripe=mat('tabby markings',(.075,.10,.14))
def curve(n,points,r,m,parent=root):
 data=bpy.data.curves.new(n,'CURVE');data.dimensions='3D';data.resolution_u=10;data.bevel_depth=r;data.bevel_resolution=2
 spline=data.splines.new('BEZIER');spline.bezier_points.add(len(points)-1)
 for i,(point,b) in enumerate(zip(points,spline.bezier_points)):
  b.co=point;b.handle_left_type='AUTO';b.handle_right_type='AUTO';b.radius=max(.08,1-i/(len(points)-.3))
 o=bpy.data.objects.new(n,data);bpy.context.collection.objects.link(o);o.data.materials.append(m);o.parent=parent;return o
# Fur microtexture uses object coordinates so every rendered direction is consistent.
for m in [fur,cream]:
 nodes=m.node_tree.nodes;links=m.node_tree.links;noise=nodes.new('ShaderNodeTexNoise');noise.inputs['Scale'].default_value=110;noise.inputs['Detail'].default_value=2
 bump=nodes.new('ShaderNodeBump');bump.inputs['Strength'].default_value=.22;bump.inputs['Distance'].default_value=.012
 links.new(noise.outputs['Fac'],bump.inputs['Height']);links.new(bump.outputs['Normal'],nodes['Principled BSDF'].inputs['Normal'])
# Horizontal hoops are material bands on the existing smooth shirt mesh.
shirt=bpy.data.objects['shirt'];shirt.data.materials.clear();shirt.data.materials.append(green);shirt.data.materials.append(red)
for face in shirt.data.polygons:
 z=sum(shirt.data.vertices[i].co.z for i in face.vertices)/len(face.vertices)
 face.material_index=1 if int((z+1)*4.1)%2 else 0
for o in bpy.data.objects:
 if o.name.startswith('sleeve'):o.data.materials[0]=green
 if o.name.startswith('sock'):o.data.materials[0]=green
 if o.name.startswith('boot'):o.data.materials[0]=sole
# Tail is one continuous tapering sweep rather than a chain of balls.
curve('flowing tail',[(.20,.12,.63),(.38,.20,.66),(.48,.28,.83),(.40,.32,1.01),(.32,.31,1.05)],.075,fur)
for side in [-1,1]:
 # Collar panels and white shoulder piping.
 curve('collar',[(side*.01,-.16,1.13),(side*.09,-.205,1.04),(side*.15,-.145,1.09)],.025,green)
 curve('white piping',[(side*.10,-.12,1.11),(side*.18,-.16,1.02),(side*.23,-.18,.94)],.010,white)
 curve('kind eyebrow',[(side*.06,-.248,1.54),(side*.13,-.265,1.565),(side*.22,-.22,1.535)],.014,brown)
 for k in range(3):
  curve('cheek tabby stripe',[(side*.28,-.14,1.47-k*.065),(side*.28,-.20,1.43-k*.065),(side*.23,-.245,1.41-k*.065)],.012,stripe)
 # Silhouette tufts: controlled clumps, each tapering to a soft tip.
 for k in range(14):
  z=1.20+k*.015;x=side*(.28+random.uniform(-.012,.008));y=-.10+random.random()*.05
  curve('cheek fur tuft',[(x,y,z),(x+side*.035,y-.012,z-.018),(x+side*.064,y-.009,z-.035)],.008,fur if k%3 else cream)
for k in range(12):
 x=-.23+k*.039;y=-.035+random.random()*.045;z=1.64+.09*math.sqrt(max(0,1-(x/.27)**2))
 curve('swept brown hair',[(x,y,z),(x+.065,y-.09,z+.045),(x+.13,y-.20,z+.02),(min(.27,x+.17),-.25,1.57+random.random()*.04)],.032,brown if k%4 else hairlight)
# Fine fur lines catch highlights without expensive hair simulation.
for k in range(70):
 angle=random.uniform(0,math.tau);z=random.uniform(1.19,1.59);r=math.sqrt(max(0,1-((z-1.37)/.34)**2))
 x=.34*r*math.cos(angle);y=.265*r*math.sin(angle)
 if y<-.16 and abs(x)<.23:continue
 curve('head fur',[(x,y,z),(x*1.025,y*1.025,z-.014),(x*1.04,y*1.04,z-.03)],.0035,fur)
# Small editable sponsor and back number.
def label(body,loc,size,rotation,m):
 bpy.ops.object.text_add(location=loc,rotation=rotation);o=bpy.context.object;o.data.body=body;o.data.align_x='CENTER';o.data.size=size;o.data.extrude=.0007;o.data.materials.append(m);o.parent=root
label('J&M',(0,-.194,.85),.095,(math.pi/2,0,0),white)
label('11',(0,.198,.83),.18,(math.pi/2,0,math.pi),white)
curve('club crest',[(.12,-.175,.98),(.14,-.176,1.00),(.16,-.172,.98),(.14,-.178,.94),(.12,-.175,.98)],.004,white)

# V2 proportion and expression pass.
face_names=('head','ear','inner ear','cheek','eye','iris','pupil','nose','mouth','whisker','kind eyebrow','swept brown','head fur')
kit_names=('shirt','collar','white piping','club crest')
for o in list(bpy.data.objects):
 if o.parent==root and o.name.startswith(face_names):o.location.z+=.50
 elif o.parent==root and (o.name.startswith(kit_names) or o.type=='FONT'):o.location.z+=.34
 if o.name.startswith('eye white'):o.scale.x*=.87;o.scale.z*=.85
 if o.name.startswith('iris') or o.name.startswith('pupil') or o.name.startswith('eye glint'):o.scale.x*=.86;o.scale.z*=.84
 if o.name.startswith('whisker'):o.hide_render=True
 if o.name.startswith('cheek fur tuft'):o.data.bevel_depth=.003
 if o.name.startswith('mouth'):o.hide_render=True
 if o.name.startswith('shorts'):o.location.z+=.34;o.data.materials[0]=black
ball('neck',(0,0,1.54),(.11,.11,.17),cream)
for side in [-1,1]:
 curve('friendly smile',[(0,-.34,1.79),(side*.035,-.34,1.775),(side*.065,-.33,1.80)],.003,black)
 for k in range(3):
  curve('fine whisker',[(side*.12,-.34,1.76-k*.02),(side*.25,-.35,1.78-k*.025),(side*.38,-.32,1.80-k*.035)],.002,cream)
for pivot in arm:pivot.location.z+=.34
for pivot in leg:pivot.location.z+=.34
for o in list(bpy.data.objects):
 if o.parent in arm and o.name.startswith('sleeve'):o.scale.z*=1.5;o.location.z-=.07
 if o.parent in arm and o.name.startswith('paw'):o.location.z-=.14
 if o.parent in leg:
  if o.name.startswith('leg'):o.scale.z*=2.3;o.location.z-=.16
  elif o.name.startswith('sock'):o.location.z-=.34;o.scale.z*=3.0
  else:o.location.z-=.34
# Sculpted wedge ears with softened edges replace circular cones.
for o in list(bpy.data.objects):
 if o.name.startswith('ear') or o.name.startswith('inner ear'):o.hide_render=True
for side in [-1,1]:
 verts=[(side*.15,-.05,2.11),(side*.36,-.035,2.12),(side*.29,.01,2.42),(side*.15,.08,2.11),(side*.36,.08,2.12),(side*.29,.07,2.42)]
 mesh=bpy.data.meshes.new('cat ear');mesh.from_pydata(verts,[],[(0,1,2),(3,5,4),(0,3,4,1),(1,4,5,2),(2,5,3,0)]);mesh.update()
 o=bpy.data.objects.new('sculpted ear',mesh);bpy.context.collection.objects.link(o);o.parent=root;o.data.materials.append(fur)
 bevel=o.modifiers.new('soft ear edges','BEVEL');bevel.width=.025;bevel.segments=3;o.modifiers.new('ear normals','WEIGHTED_NORMAL')
 ball('pink ear inset',(side*.265,-.043,2.22),(.062,.017,.10),pink)

scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=48;scene.cycles.use_denoising=False;scene.render.threads_mode='FIXED';scene.render.threads=4;scene.render.film_transparent=True;scene.render.resolution_x=224;scene.render.resolution_y=224;scene.render.resolution_percentage=100;scene.render.image_settings.file_format='PNG';scene.view_settings.view_transform='Standard';scene.view_settings.look='Medium High Contrast';scene.world.color=(.35,.35,.35)
for loc,energy,size in [((-3,-4,6),350,4),((3,1,4),200,3)]:
 bpy.ops.object.light_add(type='AREA',location=loc);o=bpy.context.object;o.data.energy=energy;o.data.size=size;o.rotation_euler=(Vector((0,0,1))-o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add(location=(0,-5,3.55));cam=bpy.context.object;cam.rotation_euler=(Vector((0,0,1.15))-cam.location).to_track_quat('-Z','Y').to_euler();cam.data.type='ORTHO';cam.data.ortho_scale=3.8;scene.camera=cam
if a.portrait:
 scene.render.resolution_x=768;scene.render.resolution_y=768;scene.cycles.samples=128;cam.data.ortho_scale=3.0
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
