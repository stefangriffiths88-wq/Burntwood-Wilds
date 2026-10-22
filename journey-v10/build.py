from pathlib import Path
import json
r=Path(__file__).parent;root=r.parent
s=(root/'burntwood-rewards-v9.html').read_text();i=s.index('<script>const PORTRAITS=');e=s.index(';\n',i)+2;head=s[:e].replace('Rewards Test 9','Journey Test 10')
# Character portraits are real, independently versioned image assets.
# No image data is embedded in build code; a missing asset fails the build.
portrait_dir=r/'assets'/'portraits'
portrait_names=('ava','jackson','stef','jodie','evie','zak','mimi','joseph','tom','havannah','immy','harvey')
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
head=head.replace('<div class="choose">CHOOSE YOUR CHARACTER</div>','<div class="choose">CHOOSE YOUR CHARACTER · BUILD 10.35.0</div><p class="rosterHint">Start as Jackson. Rescue Ava on the road, then save Joseph at the rugby club. Recruit friends as you break the curse. <button id="replayIntroduction" class="replayIntro">Replay introduction</button></p>')
head=head.replace('<button id="pickHavannah">Havannah</button>','<button id="pickHavannah">Havannah</button><button id="pickImmy">Immy</button>')
head=head.replace('<button id="pickImmy">Immy</button>','<button id="pickImmy">Immy</button><button id="pickHarvey">Harvey</button>')
# Native SVG frame draws around the reward panel; artwork assets remain separate.
head=head.replace('<div id="panel"><div class="card">','<div id="panel"><div class="card"><img id="victoryMimi" alt="Mimi" style="display:none"><div id="chestReveal" aria-hidden="true" style="display:none"><span class="chestLid"></span><span class="chestBox">✦</span><small>TAP TO REVEAL ALL</small></div><svg class="goldRewardFrame" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><rect x="1" y="1" width="98" height="98" rx="4" pathLength="100"/></svg>')
head=head.replace('<canvas id="game"></canvas>','<canvas id="game"></canvas><div id="questHud"></div><canvas id="hubMap" width="118" height="150" aria-label="Burntwood hub map"></canvas><button id="hubMenu">MENU · 10.35.0</button><button id="shrineUse">USE SHRINE</button><div id="blessingHud"></div>')
head=head.replace('<div id="blessingHud"></div>','<div id="blessingHud"></div><div id="hubShop" role="dialog" aria-label="The Wilds Shop"><div id="shopPanel" class="shopPanel"><h2>THE WILDS SHOP</h2><p id="shopSpeaker"></p><p id="shopGreeting" aria-live="polite"></p><div id="shopCoins"></div><div id="shopItems"></div><div id="shopCharmStock"></div><button id="shopReroll"></button><div id="rerollConfirm" style="display:none"><p id="rerollConfirmText"></p><button id="confirmReroll">SPEND ESSENCE</button><button id="cancelReroll">CANCEL</button></div><div id="charmWorkshop"></div><button id="shopClose">BACK TO SANKEYS</button></div></div>')
head=head.replace('<div id="perkHud"></div>','<div id="perkHud"></div><div id="charmHud" aria-label="Equipped charms"></div><div id="charmBagCount"></div>')
head=head.replace('<script>const PORTRAITS=',(r/'ui/town-panels.html').read_text()+'<script>const PORTRAITS=')
head=head.replace('<div id="upgradeChoices"></div>','<div id="upgradeChoices"></div><div id="runSummary" style="display:none"></div>')
# Starting charms belong with Ava, not the permanent character workshop.
a=head.index('<details><summary>STARTING CHARM UNLOCKS</summary>');b=head.index('</details>',a)+len('</details>');starter_panel=head[a:b];head=head[:a]+head[b:];head=head.replace('<button id="shopClose">', '<div id="shopStarters">'+starter_panel+'<div id="charmStarterConfirm" style="display:none"><p id="charmStarterConfirmText"></p><button id="confirmCharmStarter">UNLOCK STARTING CHARM</button><button id="cancelCharmStarter">CANCEL</button></div></div><button id="shopClose">');
head=head.replace('<div id="questHud"></div>','<div id="questHud"></div><aside id="journeyCoach" style="display:none" aria-live="polite"></aside><button id="introSkip" style="display:none">SKIP INTRODUCTION</button>')
head=head.replace('<button id="start">','<div id="recoverySlot"></div><button id="start">')
head=head.replace('<div id="runSummary" style="display:none"></div>','<div id="runSummary" style="display:none"></div><div id="jamVictorySlot" style="display:none"></div>')
head=head.replace('<button id="start">PLAY</button>','<div class="menuStartActions"><button id="start">PLAY</button><a id="voteMenu" href="https://run.world/jams/octoberjam?game=oeJYyzlGHanZwYoRldTS" target="_blank" rel="noopener noreferrer">★ Vote for us</a></div>')
head=head.replace('</style>',(r/'menu.css').read_text()+'</style>')
recovery_start=head.index('<section id="journeyRecovery"');recovery_end=head.index('</section>',recovery_start)+len('</section>');recovery_html=head[recovery_start:recovery_end];head=head[:recovery_start]+head[recovery_end:];head=head.replace('<div id="recoverySlot"></div>',recovery_html)
for required_id in ('replayIntroduction','introSkip','pauseSkipIntro','resumeJourney','confirmFreshJourney','healthOrb'):
    assert head.count('id="'+required_id+'"')==1, 'Missing/duplicate required control: '+required_id
manifest=json.loads((r/'manifest.json').read_text());code='\n'.join((r/f).read_text() for f in manifest)
(r/'game.js').write_text(code)
(root/'burntwood-journey-v10.html').write_text(head+code+'</script></html>')
(root/'burntwood-journey-v10.35.0.html').write_text(head+code+'</script></html>')
print('Built Journey Test 10 from',len(manifest),'source files')
