"""Build the voting-button playtest with separate device-local saves."""
from pathlib import Path
import hashlib,json
root=Path(__file__).resolve().parent.parent
source=(root/'burntwood-journey-v10.33.1.html').read_text()
preview=source
for old,new in {
 "const SAVE_KEY='burntwood-wilds-progress-v2'":"const SAVE_KEY='burntwood-wilds-preview-jam-vote-progress'",
 "const JOURNEY_SAVE_KEY='burntwood-wilds-journey-v1';":"const JOURNEY_SAVE_KEY='burntwood-wilds-preview-jam-vote-journey';",
 "localStorage.getItem(SAVE_KEY)||localStorage.getItem('burntwood-wilds-progress-v1')":"localStorage.getItem(SAVE_KEY)"
}.items():
 assert preview.count(old)==1,old
 preview=preview.replace(old,new,1)
path=root/'burntwood-preview-v10.33.1.html'
path.write_text(preview)
record={'version':'10.33.1','purpose':'Jam voting button playtest; production/RUN remains10.33.0','sourceSha256':hashlib.sha256(source.encode()).hexdigest(),'previewSha256':hashlib.sha256(preview.encode()).hexdigest(),'bytes':len(preview.encode())}
(root/'tests/jam-vote-preview.json').write_text(json.dumps(record,indent=2)+'\n')
print('Built voting preview:',record['previewSha256'])
