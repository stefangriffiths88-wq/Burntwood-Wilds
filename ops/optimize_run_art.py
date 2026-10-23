"""Prepare art-only Studio handoff files from an exact, already hosted game.

Does not build, upload, publish, or replace the RUN wrapper. Requires Pillow.
Retains original approved art in the repository and all non-image game bytes.
"""
import argparse
import base64
import hashlib
import io
import json
from pathlib import Path
import re
import zipfile

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
URI = re.compile(r'data:image/(?:png|webp);base64,[A-Za-z0-9+/=]+')


def sha(data):
    return hashlib.sha256(data).hexdigest()


def prepare(source, expected_sha, output):
    raw = source.read_bytes()
    assert sha(raw) == expected_sha, 'Input differs from the verified hosted game'
    html = raw.decode()
    assert not output.exists(), 'Use a new output directory; no existing files replaced'
    originals = {}
    for kind in ('portraits', 'icons'):
        for path in (ROOT / 'journey-v10/assets' / kind).glob('*'):
            if path.suffix in ('.png', '.webp'):
                originals[sha(path.read_bytes())] = (kind, path.stem)
    replacements, files, rows = {}, {}, []
    for uri in dict.fromkeys(URI.findall(html)):
        data = base64.b64decode(uri.split(',', 1)[1], validate=True)
        digest = sha(data)
        assert digest in originals, 'Unrecognised embedded art; review the newer source first'
        kind, hero = originals[digest]
        image = ImageOps.exif_transpose(Image.open(io.BytesIO(data)))
        before = image.size
        limit = 192 if kind == 'icons' else 1024
        image.thumbnail((limit, limit), Image.Resampling.LANCZOS)
        encoded = io.BytesIO()
        image.save(encoded, format='WEBP', quality=84, method=6)
        result = encoded.getvalue()
        # Already-efficient small WebPs need not be recompressed.
        if len(result) >= len(data) and before == image.size and uri.startswith('data:image/webp;'):
            result = data
        name = f'art/{kind}/{hero}.webp'
        files[name] = result
        replacements[uri] = (name, 'data:image/webp;base64,' + base64.b64encode(result).decode())
        rows.append(dict(hero=hero, kind=kind, originalBytes=len(data), bytes=len(result),
                         originalDimensions=before, dimensions=image.size,
                         sourceSha256=digest, sha256=sha(result)))
    assert len(rows) == 24 and len(files) == 24, 'Expected twelve complete portrait/icon pairs'
    standalone = URI.sub(lambda m: replacements[m[0]][1], html)
    separate = URI.sub(lambda m: replacements[m[0]][0], html)
    # Stronger than a gameplay smoke test: all code, tracking, styles, and text
    # are exactly unchanged once corresponding image references are normalised.
    normalised = URI.sub(lambda m: replacements[m[0]][0], html)
    assert URI.sub(lambda m: next(name for name, new in replacements.values() if new == m[0]), standalone) == normalised
    assert separate == normalised
    assert 'data:image/' not in separate, 'An image type was missed'
    output.mkdir(parents=True)
    (output / 'burntwood.html').write_text(standalone)
    split = output / 'separate-files'
    split.mkdir()
    (split / 'burntwood.html').write_text(separate)
    for name, data in files.items():
        target = split / name
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
    report = dict(sourceSha256=sha(raw), sourceBytes=len(raw),
                  standaloneBytes=len(standalone.encode()), standaloneSha256=sha(standalone.encode()),
                  separateHtmlBytes=len(separate.encode()),
                  separateTotalBytes=len(separate.encode()) + sum(map(len, files.values())),
                  nonImageContentUnchanged=True, images=rows)
    (output / 'report.json').write_text(json.dumps(report, indent=2) + '\n')
    (output / 'READ-ME.txt').write_text(
        'Burntwood Wilds 10.35 art-only loading candidate. NOT PUBLISHED.\n\n'
        'QUICKEST STUDIO OPTION: replace only the existing public game HTML with\n'
        'burntwood.html from this folder. Keep Studio App.tsx loading changes.\n'
        'This file is self-contained and keeps hosted gameplay/tracking intact.\n\n'
        'SEPARATE ASSET OPTION: upload separate-files/burntwood.html plus its art/\n'
        'folder together, preserving paths relative to the game HTML. The outer\n'
        'loading bar measures HTML only in this option, not image completion.\n'
        'Do not upload both options to the same path. Test in Studio preview first.\n'
        'Check Start/Resume, all portraits, music, touch buttons and a reload.\n'
        'Publish through Studio only after that preview passes.\n\n'
        'Source is the verified hosted 10.35 game. If Studio has since changed\n'
        'the inner game HTML, reapply this art-only conversion to that newer file\n'
        'rather than replace its code with this older snapshot. App.tsx is not\n'
        'included or replaced. Original approved artwork remains in the repo.\n'
        'This reduces download size; it does not prove all click issues fixed.\n')
    archive = output.parent / (output.name + '.zip')
    with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as z:
        for path in sorted(output.rglob('*')):
            if path.is_file():
                z.write(path, path.relative_to(output))
    print(json.dumps({k: v for k, v in report.items() if k != 'images'}, indent=2))
    return report


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path)
    parser.add_argument('--sha256', required=True)
    parser.add_argument('--output', required=True, type=Path)
    args = parser.parse_args()
    prepare(args.source, args.sha256, args.output)
