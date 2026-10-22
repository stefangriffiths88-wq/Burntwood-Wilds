from pathlib import Path
import base64,json
here=Path(__file__).parent
game=here.parent.parent/'burntwood-music-10-34'/'journey-v10'
core=(game/'engine/core.js').read_text()
helpers='\n'.join(s for s in core.splitlines() if s.startswith(('function ellipse(','function line(')))
cat=(game/'visuals/cat-art.js').read_text()
jackson=(game/'characters/jackson.js').read_text()
helpers+='\n'+cat+'\n'+jackson[jackson.index('function ballArt('):jackson.index('function dodgeImpact(')]
urls={n:'data:image/webp;base64,'+base64.b64encode((here/(n+'.webp')).read_bytes()).decode() for n in ['guardian','playful','relaxed']}
fragment=(here/'preview-shell.html').read_text().replace('/*ASSET_DATA*/',json.dumps(urls)).replace('/*SIMULATION*/',(here/'simulation.js').read_text()).replace('/*JACKSON_DRAWING*/',helpers)
assert len(fragment.encode())<1000000
Path('/workspace/loki-action-test.html').write_text(fragment)
(here/'preview.html').write_text(fragment)
print('Built isolated action test:',len(fragment.encode()),'bytes')
