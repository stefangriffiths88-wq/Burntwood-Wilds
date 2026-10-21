"""Upload only an explicit main-branch release request; keep credentials out of output."""
from pathlib import Path
import hashlib
import json
import os
import subprocess
import shutil
import sys
from run_connection import connect

root = Path(__file__).resolve().parent.parent
request = json.loads((root / 'run-host/release-request.json').read_text())
assert request['action'] == 'publish'
game = request['gameId']
key = os.environ.get('RUNDOT_API_KEY', '').strip()
assert key.startswith('rk_' + game + '_'), 'Deploy key must match the verified existing game'
cli = sys.argv[1]
env = dict(os.environ, RUNDOT_GAME_ID=game)
connect(cli, env)
env.pop('RUNDOT_API_KEY', None)
# A committed receipt prevents accidental repeated uploads of this request.
saved = root / 'run-host/releases' / (request['gameVersion'] + '.json')
if saved.exists():
    old = json.loads(saved.read_text())
    assert old['sourceSha256'] == request['sourceSha256']
    print('Existing upload receipt: ' + old['shareUrl'])
    sys.exit(0)
manifest = json.loads((root / 'dist-run/release-manifest.json').read_text())
for name, digest in manifest['files'].items():
    assert hashlib.sha256((root / 'dist-run' / name).read_bytes()).hexdigest() == digest
# The official CLI reads listing artwork from public/thumbnail.jpg.
# It is the same hash-checked file already included in the prepared build.
public = root / 'public'
public.mkdir(exist_ok=True)
shutil.copyfile(root / 'dist-run/thumbnail.jpg', public / 'thumbnail.jpg')
config = {'gameId': game, 'relativePathToDistFolder': './dist-run', 'usesPreloader': False, 'orientation': 'portrait', 'fullscreenEnabled': True}
(root / 'game.config.prod.json').write_text(json.dumps(config))
args = [cli, 'deploy', '--game-id', game, '--build-path', './dist-run', '--bump', 'patch', '--public', '--json', '--changelog-file', 'run-host/CHANGELOG.md']
result = subprocess.run(args, text=True, capture_output=True, timeout=240, env=env, cwd=root)
output = (result.stdout + '\n' + result.stderr).replace(key, '[REDACTED]')
output = __import__('re').sub(r'rk_[A-Za-z0-9]+_[^\s"\x27]+', '[REDACTED]', output)
print(output)
assert result.returncode == 0, 'RUN deploy failed; inspect the sanitized result before retrying'
responses = []
for line in result.stdout.splitlines():
    try:
        value = json.loads(line)
        if isinstance(value, dict) and value.get('success') and value.get('shareUrl'):
            responses.append(value)
    except ValueError:
        pass
assert responses, 'RUN did not return a successful version/share URL; inspect remote versions before retrying'
receipt = responses[-1]
assert receipt['gameId'] == game
receipt.update({'gameVersion': request['gameVersion'], 'sourceSha256': request['sourceSha256'], 'commit': os.environ.get('GITHUB_SHA', '')})
saved.parent.mkdir(parents=True, exist_ok=True)
saved.write_text(json.dumps(receipt, indent=2) + '\n')
print('Uploaded RUN version ' + receipt['version'] + ': ' + receipt['shareUrl'])
