"""Rebuild the self-contained versioned page using its existing embedded portraits."""
from pathlib import Path
p=Path('burntwood-chasewater-v5.html')
h=p.read_text()
start=h.index('<script>const PORTRAITS=')
end=h.index(';\n',start)+2
p.write_text(h[:end]+Path('chasewater-v5/game.js').read_text()+'</script></html>')
print('Rebuilt',p)
