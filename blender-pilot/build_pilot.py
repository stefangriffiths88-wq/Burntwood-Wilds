"""Pack rendered Jackson frames into the next versioned game."""
from PIL import Image
from pathlib import Path
import io,base64
states=['idle','walk','throw','charge','hit','death','tell','stomp']
atlas=Image.new('RGBA',(1024,6144))
for i,state in enumerate(states):
 for d in range(8):
  for frame in range(6):
   im=Image.open(f'blender-pilot/renders/{state}-{d}-{frame}.png').convert('RGBA').resize((128,128),Image.Resampling.LANCZOS)
   atlas.paste(im,(d*128,(i*6+frame)*128))
f=io.BytesIO();atlas.save(f,format='WEBP',quality=75,method=6);Path('blender-pilot/jackson-atlas.webp').write_bytes(f.getvalue())
s=Path('wilds-v9-0-burntwood.html').read_text()
code="""
// Blender-rendered Jackson: one shared atlas, no per-frame Canvas allocations.
const jacksonAtlasStates=['idle','walk','throw','charge','hit','death','tell','stomp'];
let jacksonAtlasReady=false;const jacksonAtlas=new Image();jacksonAtlas.onload=()=>{jacksonAtlasReady=true;};
jacksonAtlas.src='data:image/webp;base64,ATLAS';
function drawCharacterFrame(cv){if(cv.blenderFrame)ctx.drawImage(jacksonAtlas,cv.dir*128,(cv.state*6+cv.pose)*128,128,128,-112,-173,224,224);else ctx.drawImage(cv,-112,-173);}
""".replace('ATLAS',base64.b64encode(f.getvalue()).decode())
s=s.replace('function animatedSprite(kind,state,pose,dir){',"function animatedSprite(kind,state,pose,dir){if(kind==='jackson'&&jacksonAtlasReady)return {blenderFrame:true,dir,state:Math.max(0,jacksonAtlasStates.indexOf(state)),pose:Math.max(0,Math.min(5,pose))};")
s=s.replace('ctx.drawImage(cv,-112,-173);','drawCharacterFrame(cv);')
s=s.replace("ctx.drawImage(animatedSprite(p.kind,'charge',2,p.dir),-112,-173);","drawCharacterFrame(animatedSprite(p.kind,'charge',2,p.dir));")
s=s.replace('function animatedSprite(kind,state,pose,dir){',code+'\nfunction animatedSprite(kind,state,pose,dir){',1)
s=s.replace('<title>','<title>Blender Pilot • ',1)
Path('wilds-v9-1-blender-pilot.html').write_text(s)
print('Atlas bytes',len(f.getvalue()),'HTML bytes',len(s.encode()))
