from pathlib import Path
root=Path('rewards-v9');src=Path('burntwood-progression-v8.html').read_text();i=src.index('<script>const PORTRAITS=');e=src.index(';\n',i)+2
head=src[:e].replace('Progression Test 8','Rewards Test 9')
a=head.index('<style>')+7;b=head.index('</style>',a);css=head[a:b];css=css[:css.index('/* Shared portrait')]
head=head[:a]+css+'\n'+(root/'menu.css').read_text()+head[b:]
head=head.replace('<small id="level">','<small id="level">')
head=head.replace('<div id="bossHud">','<div id="perkHud"></div><div id="bossHud">')
Path('burntwood-rewards-v9.html').write_text(head+(root/'game.js').read_text()+'</script></html>');print('Built rewards v9')
