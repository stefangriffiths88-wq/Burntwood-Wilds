from pathlib import Path
import json
r=Path(__file__).parent;root=r.parent
s=(root/'burntwood-rewards-v9.html').read_text();i=s.index('<script>const PORTRAITS=');e=s.index(';\n',i)+2;head=s[:e].replace('Rewards Test 9','Journey Test 10')
# Character portraits are real, independently versioned image assets.
# No image data is embedded in build code; a missing asset fails the build.
portrait_dir=r/'assets'/'portraits'
portrait_names=('ava','jackson','stef','jodie','evie','zak','mimi','joseph','tom','havannah')
portraits={}
for name in portrait_names:
    matches=[p for ext in ('webp','png','jpg','svg') if (p:=portrait_dir/(name+'.'+ext)).is_file()]
    if len(matches)!=1:
        raise SystemExit(f'Expected exactly one artwork file for {name}, found {len(matches)}. Run assets/import_legacy_portraits.py for initial migration.')
    portraits[name]='journey-v10/assets/portraits/'+matches[0].name
head=s[:i].replace('Rewards Test 9','Journey Test 10')+ '<script>const PORTRAITS='+json.dumps(portraits,separators=(',',':'))+';\n'
head=head.replace('<button id="pickEvie">Evie</button>','<button id="pickEvie">Evie</button><button id="pickZak">Zak</button>')
head=head.replace('<button id="pickZak">Zak</button>','<button id="pickZak">Zak</button><button id="pickMimi">Mimi</button>')
head=head.replace('<button id="pickMimi">Mimi</button>','<button id="pickMimi">Mimi</button><button id="pickJoseph">Joseph</button><button id="pickTom">Tom</button><button id="pickHavannah">Havannah</button>')
head=head.replace('<button id="pickChasewater">Chasewater</button>','<button id="pickChasewater">Chasewater</button><button id="pickSankeys">Sankey’s</button>')
head=head.replace('<button id="pickSankeys">Sankey’s</button>','<button id="pickSankeys">Sankey’s</button><button id="pickQuarry">Quarry</button>')
head=head.replace('<button id="pickQuarry">Quarry</button>','<button id="pickQuarry">Quarry</button><button id="pickPark">Park</button>')
head=head.replace('<div class="choose">CHOOSE YOUR CHARACTER</div>','<div class="choose">CHOOSE YOUR CHARACTER · BUILD 10.13.0</div>')
# Native SVG frame draws around the reward panel; artwork assets remain separate.
head=head.replace('<div id="panel"><div class="card">','<div id="panel"><div class="card"><div id="chestReveal" aria-hidden="true" style="display:none"><span class="chestLid"></span><span class="chestBox">✦</span><small>TAP TO REVEAL ALL</small></div><svg class="goldRewardFrame" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><rect x="1" y="1" width="98" height="98" rx="4" pathLength="100"/></svg>')
head=head.replace('<canvas id="game"></canvas>','<canvas id="game"></canvas><div id="questHud"></div><canvas id="hubMap" width="118" height="150" aria-label="Burntwood hub map"></canvas><button id="hubMenu">MENU · 10.13.0</button><button id="shrineUse">USE SHRINE</button><div id="blessingHud"></div>')
head=head.replace('<div id="blessingHud"></div>','<div id="blessingHud"></div><div id="hubShop" role="dialog" aria-label="The Wilds Shop"><div id="shopPanel" class="shopPanel"><h2>THE WILDS SHOP</h2><p id="shopSpeaker"></p><p id="shopGreeting" aria-live="polite"></p><div id="shopCoins"></div><div id="shopItems"></div><div id="shopCharmStock"></div><button id="shopReroll"></button><div id="rerollConfirm" style="display:none"><p id="rerollConfirmText"></p><button id="confirmReroll">SPEND ESSENCE</button><button id="cancelReroll">CANCEL</button></div><div id="charmWorkshop"></div><button id="shopClose">BACK TO BURNTWOOD</button></div></div>')
head=head.replace('<div id="perkHud"></div>','<div id="perkHud"></div><div id="charmHud" aria-label="Equipped charms"></div><div id="charmBagCount"></div>')
head=head.replace('<script>const PORTRAITS=',(r/'ui/town-panels.html').read_text()+'<script>const PORTRAITS=')
head=head.replace('<div id="upgradeChoices"></div>','<div id="upgradeChoices"></div><div id="runSummary" style="display:none"></div>')
head=head.replace('</style>',(r/'menu.css').read_text()+'</style>')
manifest=json.loads((r/'manifest.json').read_text());code='\n'.join((r/f).read_text() for f in manifest)
(r/'game.js').write_text(code)
(root/'burntwood-journey-v10.html').write_text(head+code+'</script></html>')
(root/'burntwood-journey-v10.13.0.html').write_text(head+code+'</script></html>')
print('Built Journey Test 10 from',len(manifest),'source files')
