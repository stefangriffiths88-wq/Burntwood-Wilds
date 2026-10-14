import bpy, math, json
from mathutils import Vector
from pathlib import Path
bpy.ops.object.select_all(action='SELECT');bpy.ops.object.delete(use_global=False)
import struct
raw=Path('jackson-3d-test/model/jackson.glb').read_bytes()
n=struct.unpack_from('<I',raw,12)[0];g=json.loads(raw[20:20+n]);binary=raw[28+n:]
def accessor(idx):
 a=g['accessors'][idx];v=g['bufferViews'][a['bufferView']];count={'SCALAR':1,'VEC2':2,'VEC3':3}[a['type']];fmt={5126:'f',5125:'I',5123:'H'}[a['componentType']];size=struct.calcsize(fmt)*count;start=v.get('byteOffset',0)+a.get('byteOffset',0);stride=v.get('byteStride',size)
 return [struct.unpack_from('<'+fmt*count,binary,start+i*stride) for i in range(a['count'])]
for mesh in g['meshes']:
 for prim in mesh['primitives']:
  pos=accessor(prim['attributes']['POSITION']);uv=accessor(prim['attributes']['TEXCOORD_0']);ids=[x[0] for x in accessor(prim['indices'])]
  data=bpy.data.meshes.new('Jackson generated mesh');data.from_pydata([(x,-z,y) for x,y,z in pos],[],[ids[i:i+3] for i in range(0,len(ids),3)]);data.update()
  obj=bpy.data.objects.new('Jackson',data);bpy.context.collection.objects.link(obj)
  layer=data.uv_layers.new(name='UVMap')
  for loop in data.loops:layer.data[loop.index].uv=(uv[loop.vertex_index][0],1-uv[loop.vertex_index][1])
  for poly in data.polygons:poly.use_smooth=True
  im=g['images'][0];v=g['bufferViews'][im['bufferView']];start=v.get('byteOffset',0);path=Path('jackson-3d-test/model/jackson-texture.png');path.write_bytes(binary[start:start+v['byteLength']])
  mat=bpy.data.materials.new('Generated Jackson texture');mat.use_nodes=True;bsdf=mat.node_tree.nodes.get('Principled BSDF');tex=mat.node_tree.nodes.new('ShaderNodeTexImage');tex.image=bpy.data.images.load(str(path.resolve()));tex.image.pack();mat.node_tree.links.new(tex.outputs['Color'],bsdf.inputs['Base Color']);bsdf.inputs['Roughness'].default_value=.85;obj.data.materials.append(mat)

meshes=[o for o in bpy.context.scene.objects if o.type=='MESH']
points=[o.matrix_world@Vector(v) for o in meshes for v in o.bound_box]
lo=Vector(tuple(min(p[i] for p in points) for i in range(3)))
hi=Vector(tuple(max(p[i] for p in points) for i in range(3)))
center=(lo+hi)/2;span=max(hi-lo)
print('MODEL_INSPECTION',json.dumps({'meshes':len(meshes),'vertices':sum(len(o.data.vertices) for o in meshes),'triangles':sum(len(o.data.polygons) for o in meshes),'bounds':list(hi-lo),'armatures':len([o for o in bpy.context.scene.objects if o.type=='ARMATURE'])}))
scene=bpy.context.scene;scene.render.engine='CYCLES';scene.cycles.samples=48;scene.cycles.use_denoising=False
scene.render.threads_mode='FIXED';scene.render.threads=4
scene.render.resolution_x=768;scene.render.resolution_y=768;scene.render.resolution_percentage=100
scene.render.image_settings.file_format='PNG';scene.world.color=(.2,.2,.2)
scene.view_settings.view_transform='Standard'
for loc,energy in [((2,-3,4),350),((-3,-1,2),200),((1,3,3),300)]:
 bpy.ops.object.light_add(type='AREA',location=center+Vector(loc)*span)
 o=bpy.context.object;o.data.energy=energy*span*span;o.data.size=span*3;o.rotation_euler=(center-o.location).to_track_quat('-Z','Y').to_euler()
bpy.ops.object.camera_add();cam=bpy.context.object;cam.data.type='ORTHO';cam.data.ortho_scale=span*1.35;scene.camera=cam
out=Path('jackson-3d-test/model')
for name,angle in [('front',0),('quarter',.65),('back',math.pi)]:
 cam.location=center+Vector((math.sin(angle)*3,-math.cos(angle)*3,.35))*span
 cam.rotation_euler=(center-cam.location).to_track_quat('-Z','Y').to_euler()
 scene.render.filepath=str((out/('jackson-'+name+'.png')).resolve());bpy.ops.render.render(write_still=True)
bpy.ops.wm.save_as_mainfile(filepath=str((out/'jackson.blend').resolve()))
