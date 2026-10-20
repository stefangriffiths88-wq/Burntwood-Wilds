"""Verify failure paths do not disclose keys or call write commands."""
import contextlib
import io
from types import SimpleNamespace
from run_connection import connect

key = 'rk_TestGame_0123456789abcdef'
calls = []
def fake(args, **kw):
    calls.append((args, kw))
    assert 'RUNDOT_API_KEY' not in kw['env']
    return SimpleNamespace(returncode=0, stdout='TestGame Burntwood Wilds', stderr=key)

out = io.StringIO()
with contextlib.redirect_stdout(out):
    connect('rundot', {'RUNDOT_API_KEY': key, 'RUNDOT_GAME_ID': 'TestGame'}, fake)
assert key not in out.getvalue()
assert calls[0][0] == ['rundot', 'login', '--api-key-stdin']
assert calls[0][1]['input'] == key + '\n'
assert calls[1][0] == ['rundot', 'game', 'info', '--game-id', 'TestGame']
assert len(calls) == 2
for bad in ['', 'pk_TestGame_other', 'rk_OtherGame_other']:
    try:
        connect('rundot', {'RUNDOT_API_KEY': bad, 'RUNDOT_GAME_ID': 'TestGame'}, fake)
        raise AssertionError('invalid credential accepted')
    except ValueError:
        pass
assert len(calls) == 2
def fail(args, **kw):
    return SimpleNamespace(returncode=1, stdout=key, stderr=key)
try:
    connect('rundot', {'RUNDOT_API_KEY': key, 'RUNDOT_GAME_ID': 'TestGame'}, fail)
    raise AssertionError('failed login accepted')
except ValueError as error:
    assert key not in str(error)
print('PASS: correct read-only commands, stdin-only key, no inherited secret, invalid-key rejection and redacted failures')
