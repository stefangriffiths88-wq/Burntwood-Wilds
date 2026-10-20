"""Build a portable, relative-path HTML5 distribution; never publish it."""
from pathlib import Path
import base64,hashlib,json,re,shutil,zipfile

ROOT=Path(__file__).resolve().parent.parent
DEST=ROOT/'dist'

def package():
    html=(ROOT/'burntwood-journey-v10.html').read_text()
    version=re.search(r"const BUILD_ID='([^']+)'",html).group(1)
    portraits=json.loads(re.search(r'const PORTRAITS=(\{[^;]+\});',html).group(1))
    paths=list(portraits.values())+['journey-v10/assets/icons/'+hero+'.webp' for hero in portraits]
    assert len(paths)==24 and len(set(paths))==24,'Expected twelve complete portrait/icon pairs'
    # Only our dedicated output directory is replaced; source assets are untouched.
    if DEST.exists():shutil.rmtree(DEST)
    DEST.mkdir()
    (DEST/'index.html').write_text(html)
    for name in paths:
        source=ROOT/name
        assert source.is_file() and source.stat().st_size>1000,'Missing or placeholder artwork: '+name
        dest=DEST/name;dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(source,dest)
    files={str(p.relative_to(DEST)):{'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()} for p in sorted(DEST.rglob('*')) if p.is_file()}
    (DEST/'release.json').write_text(json.dumps({'version':version,'entry':'index.html','storage':'device-local; no cross-device/cloud promise','files':files},indent=2)+'\n')
    out=ROOT/('burntwood-run-'+version+'.zip')
    with zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED) as archive:
        for p in sorted(DEST.rglob('*')):
            if p.is_file():archive.write(p,str(p.relative_to(DEST)))
    with zipfile.ZipFile(out) as archive:
        assert 'index.html' in archive.namelist()
        for name,info in files.items():assert hashlib.sha256(archive.read(name)).hexdigest()==info['sha256']
    # Studio's public-folder uploader accepts individual files. Preserve the
    # established /burntwood.html iframe workflow without external art requests.
    def image_uri(name):
        mime='image/png' if name.endswith('.png') else 'image/webp'
        return 'data:'+mime+';base64,'+base64.b64encode((ROOT/name).read_bytes()).decode()
    icons={hero:image_uri('journey-v10/assets/icons/'+hero+'.webp') for hero in portraits}
    single=html
    for variable in ('key','hero'):
        single=single.replace("journey-v10/assets/icons/'+"+variable+"+'.webp", "'+INLINE_ICONS["+variable+"]+'")
    for name in paths:single=single.replace(name,image_uri(name))
    single=single.replace('const PORTRAITS=', 'const INLINE_ICONS='+json.dumps(icons,separators=(',',':'))+';\nconst PORTRAITS=',1)
    assert 'journey-v10/assets/' not in single,'A standalone art dependency was missed'
    (ROOT/('burntwood-run-'+version+'.html')).write_text(single)
    print('Portable RUN candidate:',out.name,';',len(files),'game/art files;',out.stat().st_size,'bytes; no upload performed')
    return out

if __name__=='__main__':package()
