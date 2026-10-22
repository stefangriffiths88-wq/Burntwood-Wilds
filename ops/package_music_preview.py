"""Isolate the approved music playtest without replacing production or its saves."""
from pathlib import Path
import hashlib,json
root=Path(__file__).resolve().parent.parent
source=(root/'burntwood-journey-v10.html').read_text()
preview=source
for old,new in {
 "const SAVE_KEY='burntwood-wilds-progress-v2'":"const SAVE_KEY='burntwood-wilds-preview-music-progress'",
 "const JOURNEY_SAVE_KEY='burntwood-wilds-journey-v1';":"const JOURNEY_SAVE_KEY='burntwood-wilds-preview-music-journey';",
 "localStorage.getItem(SAVE_KEY)||localStorage.getItem('burntwood-wilds-progress-v1')":"localStorage.getItem(SAVE_KEY)",
 "const BUILD_ID='10.33.0'":"const BUILD_ID='10.34.0-music-test'",
 'MENU · 10.33.0':'MENU · MUSIC TEST'
}.items():
 assert preview.count(old)==1,(old,preview.count(old))
 preview=preview.replace(old,new,1)
path=root/'burntwood-preview-music.html'
path.write_text(preview)
record={'purpose':'Arena music playtest only; production/RUN remain10.33.0; vote preview remains separate','sha256':hashlib.sha256(preview.encode()).hexdigest(),'bytes':len(preview.encode())}
(root/'tests/music-preview.json').write_text(json.dumps(record,indent=2)+'\n')
print(record)
