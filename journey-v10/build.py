from pathlib import Path
import json
r=Path(__file__).parent;root=r.parent
s=(root/'burntwood-rewards-v9.html').read_text();i=s.index('<script>const PORTRAITS=');e=s.index(';\n',i)+2;head=s[:e].replace('Rewards Test 9','Journey Test 10')
head=head.replace('<button id="pickChasewater">Chasewater</button>','<button id="pickChasewater">Chasewater</button><button id="pickSankeys">Sankey’s</button>')
head=head.replace('<div class="choose">CHOOSE YOUR CHARACTER</div>','<div class="choose">CHOOSE YOUR CHARACTER · BUILD 10.0.1</div>')
head=head.replace('<canvas id="game"></canvas>','<canvas id="game"></canvas><canvas id="hubMap" width="118" height="150" aria-label="Burntwood hub map"></canvas><button id="hubMenu">MENU · 10.0.1</button><button id="shrineUse">USE SHRINE</button><div id="blessingHud"></div>')
head=head.replace('</style>',(r/'menu.css').read_text()+'</style>')
manifest=json.loads((r/'manifest.json').read_text());code='\n'.join((r/f).read_text() for f in manifest)
(r/'game.js').write_text(code)
(root/'burntwood-journey-v10.html').write_text(head+code+'</script></html>')
print('Built Journey Test 10 from',len(manifest),'source files')
