"""Optimise only inline copies of approved art; retain production source assets."""
import base64,hashlib,io,json,re
from pathlib import Path
from PIL import Image,ImageOps
ROOT=Path(__file__).resolve().parents[1]
URI=re.compile(r'data:image/(?:png|webp);base64,[A-Za-z0-9+/=]+')
def optimise(html):
    known={hashlib.sha256(p.read_bytes()).hexdigest():(kind,p.stem) for kind in ('portraits','icons') for p in (ROOT/'journey-v10/assets'/kind).glob('*') if p.suffix in ('.png','.webp')}
    replacements={};rows=[]
    for uri in dict.fromkeys(URI.findall(html)):
        raw=base64.b64decode(uri.split(',',1)[1],validate=True)
        digest=hashlib.sha256(raw).hexdigest()
        assert digest in known,'Unknown inline artwork'
        kind,hero=known[digest];im=ImageOps.exif_transpose(Image.open(io.BytesIO(raw)));before=im.size
        limit=192 if kind=='icons' else 1024
        im.thumbnail((limit,limit),Image.Resampling.LANCZOS);out=io.BytesIO();im.save(out,format='WEBP',quality=84,method=6);small=out.getvalue()
        if before==im.size and len(small)>=len(raw) and uri.startswith('data:image/webp;'):small=raw
        replacements[uri]='data:image/webp;base64,'+base64.b64encode(small).decode()
        rows.append(dict(hero=hero,kind=kind,bytes=len(small),originalBytes=len(raw),dimensions=im.size,sourceSha256=digest,sha256=hashlib.sha256(small).hexdigest()))
    heroes={row['hero'] for row in rows}
    assert len(rows)==len(heroes)*2==26,'Expected thirteen complete approved portrait/icon pairs'
    result=URI.sub(lambda m:replacements[m[0]],html)
    assert URI.sub('ART',result)==URI.sub('ART',html),'Non-image content changed'
    return result,dict(sourceBytes=len(html.encode()),bytes=len(result.encode()),nonImageContentUnchanged=True,images=rows)
