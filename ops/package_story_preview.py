"""Create the authorised 10.32 Pages-only playtest, with isolated saved progress.

The gameplay bytes are the existing build; only the two device storage keys
and the read-only initial progress fallback differ. No host/SDK/RUN writes.
"""
from pathlib import Path
import hashlib,json
root=Path(__file__).resolve().parent.parent
source=(root/'burntwood-journey-v10.32.0.html').read_text()
replacements={
 "const SAVE_KEY='burntwood-wilds-progress-v2'":"const SAVE_KEY='burntwood-wilds-preview-10-32-progress'",
 "const JOURNEY_SAVE_KEY='burntwood-wilds-journey-v1';":"const JOURNEY_SAVE_KEY='burntwood-wilds-preview-10-32-journey';",
 "localStorage.getItem(SAVE_KEY)||localStorage.getItem('burntwood-wilds-progress-v1')":"localStorage.getItem(SAVE_KEY)||localStorage.getItem('burntwood-wilds-progress-v2')||localStorage.getItem('burntwood-wilds-progress-v1')"
}
preview=source
for old,new in replacements.items():
 assert preview.count(old)==1,('Preview substitution must be exact',old)
 preview=preview.replace(old,new,1)
assert "const BUILD_ID='10.32.0'" in preview
path=root/'burntwood-preview-v10.32.0.html';path.write_text(preview)
record={'version':'10.32.0','purpose':'Pages-only test; RUN publication prohibited pending user test','path':path.name,'sourceSha256':hashlib.sha256(source.encode()).hexdigest(),'previewSha256':hashlib.sha256(preview.encode()).hexdigest(),'bytes':len(preview.encode()),'storage':'Separate journey/permanent keys; initial permanent progress read from current game if present; no writes to production keys'}
(root/'tests/curse-preview-10.32.json').write_text(json.dumps(record,indent=2)+'\n')
print('Built isolated10.32 Pages preview:',record['previewSha256'])
