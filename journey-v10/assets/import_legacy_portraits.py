"""One-time, repeatable extraction of the five approved legacy portrait images.
Never overwrites an existing asset. New approved art is added as a separate file.
"""
from pathlib import Path
import base64,json,re
root=Path(__file__).resolve().parent.parent
assets=root/'journey-v10'/'assets'/'portraits'
assets.mkdir(parents=True,exist_ok=True)
legacy=(root/'burntwood-rewards-v9.html').read_text()
m=re.search(r'const PORTRAITS=(\{.*?\});',legacy,re.S)
if not m: raise SystemExit('Cannot find legacy portrait registry')
portraits=json.loads(m.group(1))
for name,uri in portraits.items():
    if name not in {'ava','jackson','stef','jodie','evie'}: continue
    match=re.fullmatch(r'data:image/(webp|png|jpeg);base64,(.*)',uri,re.S)
    if not match: raise SystemExit(f'Unsupported portrait format: {name}')
    ext={'jpeg':'jpg'}.get(match.group(1),match.group(1))
    dest=assets/f'{name}.{ext}'
    if not dest.exists():
        dest.write_bytes(base64.b64decode(match.group(2),validate=True))
        print('Recovered approved portrait:',dest.relative_to(root))
