from pathlib import Path
import json,base64,io
from PIL import Image
root=Path('family-v7');old=Path('burntwood-family-v6.html').read_text();a=old.index('const PORTRAITS=')+len('const PORTRAITS=');b=old.index(';\n',a);portraits=json.loads(old[a:b])
current=Path('burntwood-family-v7.html')
if current.exists():
 page=current.read_text();aa=page.index('const PORTRAITS=')+len('const PORTRAITS=');bb=page.index(';\n',aa);portraits=json.loads(page[aa:bb])
for name in ['ava','jackson','stef','jodie','evie']:
 asset=root/'assets'/f'{name}.webp'
 if asset.exists():portraits[name]='data:image/webp;base64,'+base64.b64encode(asset.read_bytes()).decode()
# Reuse only the gameplay CSS, with a single new selection layout.
css=old[old.index('<style>')+7:old.index('</style>')];css=css[:css.index('/* Shared portrait')]
html=old[:old.index('<style>')].replace('Family Test 6','Family Test 7')+'<style>'+css+'\n'+(root/'menu.css').read_text()+'</style>'
body=old[old.index('<canvas'):old.index('<script>')];a=body.index('<div id="menu">');b=body.index('<div id="panel">',a)
menu='''<div id="menu"><div id="ambient"></div><div class="selectionShell"><header><div class="tag">BURNTWOOD WILDS</div><div class="choose">CHOOSE YOUR CHARACTER</div></header><div id="artStage"><img id="portrait" alt="Character artwork"></div><section id="characterInfo" aria-live="polite"><div id="role"></div><h1 id="charName"></h1><p id="tagline"></p><div id="stats"></div><div id="profile"></div></section><div id="arenaChoices" aria-label="Arena"><button id="pickRugby">Rugby Club</button><button id="pickChasewater">Chasewater</button></div><button id="start">PLAY</button><nav class="picks" aria-label="Characters"><button id="pickAva">Ava</button><button id="pickJackson">Jackson</button><button id="pickStef">Stefan</button><button id="pickJodie">Jodie</button><button id="pickEvie">Evie</button></nav></div></div>'''
body=body[:a]+menu+body[b:]
Path('burntwood-family-v7.html').write_text(html+body+'<script>const PORTRAITS='+json.dumps(portraits,separators=(',',':'))+';\n'+(root/'game.js').read_text()+'</script></html>')
print('Built family v7')
