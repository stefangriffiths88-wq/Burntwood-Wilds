"""Package the tested game inside the preserved current RUN1.0.12 host wrapper."""
from pathlib import Path
import hashlib
import json
import re
import shutil
import sys

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT / 'journey-v10'))
from package_run import package
from run_art import optimise


def build():
    package()
    request = json.loads((ROOT / 'run-host/release-request.json').read_text())
    html = (ROOT / ('burntwood-run-' + request['gameVersion'] + '.html')).read_text()
    assert hashlib.sha256(html.encode()).hexdigest() == request['sourceSha256'], 'Tested game bytes changed'
    patches = [
        ("const BUILD_ID='" + request['gameVersion'] + "';", "const BUILD_ID='" + request['gameVersion'] + "';\nlet bwRunStart=0,bwFirstKill=false;\nfunction bwEv(n,d){try{parent.postMessage({bwEvent:n,data:d||{}},'*');}catch(e){}}", 1),
        ('kills++;score++;onDefeated(e);', "kills++;score++;if(!bwFirstKill){bwFirstKill=true;bwEv('first_enemy_defeated',{hero:selected,arena:arenaKey,seconds:Math.round((performance.now()-bwRunStart)/1000)});}onDefeated(e);", 1),
        ('if(e===boss){finish(true);}', "if(e===boss){bwEv('boss_defeated',{hero:selected,arena:arenaKey});finish(true);}", 1),
        ('boss=e;bossSpawned=true;float(', "boss=e;bossSpawned=true;bwEv('boss_fight_started',{hero:selected,arena:arenaKey});float(", 6),
        ('let o=run.offers[i],oldHP=stats().hp;', "let o=run.offers[i],oldHP=stats().hp;bwEv('upgrade_picked',{hero:selected,path:String(o.path),name:String(o.name||o.title||o.index||''),rarity:o.rarity===undefined?-1:o.rarity,level:run.level});", 1),
        ('let more=won&&run.visited.length<JOURNEY_AREAS;if(more', "let more=won&&run.visited.length<JOURNEY_AREAS;if(!more&&(!renderOnly||run.queenDefeated)&&!run.runEndTracked){run.runEndTracked=true;bwEv('run_ended',{hero:selected,result:won?'won':'lost',seconds:Math.round((performance.now()-bwRunStart)/1000),level:run.level,kills:kills});}if(more", 1),
        ("function startJourney(){if(!heroUnlocked(selected))selectCharacter('jackson');reset();", "function startJourney(){if(!heroUnlocked(selected))selectCharacter('jackson');bwRunStart=performance.now();bwFirstKill=false;bwEv('hero_chosen',{hero:selected});bwEv('run_started',{hero:selected});reset();", 1),
    ]
    for old, new, count in patches:
        assert html.count(old) == count, 'Tracking hook changed: ' + old
        html = html.replace(old, new)
    dest = ROOT / 'dist-run'
    if dest.exists():
        shutil.rmtree(dest)
    vendor = ROOT / 'run-host/vendor-1.0.12'
    provenance = json.loads((ROOT / 'run-host/vendor-manifest.json').read_text())
    for name, digest in provenance['files'].items():
        assert hashlib.sha256((vendor / name).read_bytes()).hexdigest() == digest, 'RUN wrapper changed: ' + name
    shutil.copytree(vendor, dest)
    approved_thumbnail = ROOT / 'run-host/artwork/thumbnail.jpg'
    if approved_thumbnail.exists():
        shutil.copyfile(approved_thumbnail, dest / 'thumbnail.jpg')
    html,art_report = optimise(html)
    (dest / 'assets/burntwood.html').write_text(html)
    (dest / 'art-report.json').write_text(json.dumps(art_report,indent=2)+'\n')
    files = {str(p.relative_to(dest)): hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(dest.rglob('*')) if p.is_file() and p.name != 'release-manifest.json'}
    receipt = {'gameVersion': request['gameVersion'], 'sourceSha256': request['sourceSha256'], 'hostBaseline': provenance['source'], 'files': files}
    (dest / 'release-manifest.json').write_text(json.dumps(receipt, indent=2) + '\n')
    print('RUN package:', request['gameVersion'], len(files), 'files; existing wrapper/tracking/thumbnail preserved')


if __name__ == '__main__':
    build()
