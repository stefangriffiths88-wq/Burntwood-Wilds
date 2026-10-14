from pathlib import Path
import json
from urllib.parse import quote
r=Path(__file__).parent;root=r.parent
s=(root/'burntwood-rewards-v9.html').read_text();i=s.index('<script>const PORTRAITS=');e=s.index(';\n',i)+2;head=s[:e].replace('Rewards Test 9','Journey Test 10')
zak_svg='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 450 600"><rect width="450" height="600" fill="#173c2b"/><circle cx="225" cy="320" r="190" fill="#314a3d"/><path d="M265 430Q420 490 365 280" fill="none" stroke="#8c6cbe" stroke-width="40" stroke-linecap="round"/><ellipse cx="225" cy="420" rx="110" ry="130" fill="#74559f"/><path d="M95 220L85 45 185 130 265 130 365 45 355 220" fill="#8c6cbe" stroke="#51396e" stroke-width="10"/><path d="M110 160L108 80 175 151M277 151L342 80 340 160" fill="#c4a4eb"/><ellipse cx="225" cy="240" rx="140" ry="125" fill="#8c6cbe"/><ellipse cx="173" cy="225" rx="32" ry="40" fill="#e5ff83"/><ellipse cx="280" cy="225" rx="32" ry="40" fill="#e5ff83"/><ellipse cx="181" cy="225" rx="12" ry="26" fill="#273627"/><ellipse cx="289" cy="225" rx="12" ry="26" fill="#273627"/><ellipse cx="225" cy="290" rx="50" ry="35" fill="#c4a4eb"/><path d="M212 286L225 298 238 286M225 298Q208 320 187 300M225 298Q248 320 268 300" stroke="#51396e" stroke-width="6" fill="none"/><text x="225" y="565" font-size="34" text-anchor="middle" fill="#e5ff83" font-family="sans-serif" font-weight="bold">TOXIC TRICKSTER</text></svg>'''
head=head.replace('const PORTRAITS={', 'const PORTRAITS={"zak":"data:image/svg+xml,'+quote(zak_svg,safe='')+'",')
head=head.replace('<button id="pickEvie">Evie</button>','<button id="pickEvie">Evie</button><button id="pickZak">Zak</button>')
head=head.replace('<button id="pickChasewater">Chasewater</button>','<button id="pickChasewater">Chasewater</button><button id="pickSankeys">Sankey’s</button>')
head=head.replace('<div class="choose">CHOOSE YOUR CHARACTER</div>','<div class="choose">CHOOSE YOUR CHARACTER · BUILD 10.0.2</div>')
head=head.replace('<canvas id="game"></canvas>','<canvas id="game"></canvas><canvas id="hubMap" width="118" height="150" aria-label="Burntwood hub map"></canvas><button id="hubMenu">MENU · 10.0.3</button><button id="shrineUse">USE SHRINE</button><div id="blessingHud"></div>')
head=head.replace('</style>',(r/'menu.css').read_text()+'</style>')
manifest=json.loads((r/'manifest.json').read_text());code='\n'.join((r/f).read_text() for f in manifest)
(r/'game.js').write_text(code)
(root/'burntwood-journey-v10.html').write_text(head+code+'</script></html>')
print('Built Journey Test 10 from',len(manifest),'source files')
