"""Read-only RUN authentication check. Never print CLI authentication output."""
import os
import subprocess
import sys


def connect(cli='rundot', env=None, execute=subprocess.run):
    env = dict(os.environ if env is None else env)
    key = env.pop('RUNDOT_API_KEY', '').strip()
    game = env.get('RUNDOT_GAME_ID', '').strip()
    if not game or not key:
        raise ValueError('Add RUNDOT_API_KEY as an Actions secret and RUNDOT_GAME_ID as an Actions variable.')
    if not game.isalnum() or not key.startswith('rk_' + game + '_'):
        raise ValueError('Use a RUN deploy key for the configured game; playground keys are not supported.')
    commands = [([cli, 'login', '--api-key-stdin'], key + '\n'),
                ([cli, 'game', 'info', '--game-id', game], None)]
    for index, (args, stdin) in enumerate(commands):
        try:
            result = execute(args, input=stdin, text=True, capture_output=True, env=env, timeout=60)
        except (OSError, subprocess.TimeoutExpired):
            raise ValueError('RUN connection command failed or timed out; credentials and raw output were withheld.') from None
        if result.returncode:
            raise ValueError('RUN login failed.' if index == 0 else 'RUN did not allow access to the configured game.')
        if index == 1 and (game not in result.stdout or 'Burntwood Wilds' not in result.stdout):
            raise ValueError('RUN game information did not confirm the expected Burntwood Wilds identity.')
    print('RUN connection verified for the configured Burntwood Wilds game. No build uploaded or published.')


if __name__ == '__main__':
    try:
        connect(sys.argv[1] if len(sys.argv) > 1 else 'rundot')
    except ValueError as error:
        print(str(error), file=sys.stderr)
        sys.exit(1)
