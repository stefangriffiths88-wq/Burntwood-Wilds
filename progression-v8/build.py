from pathlib import Path
root=Path('progression-v8');src=Path('burntwood-family-v7.html').read_text();i=src.index('<script>const PORTRAITS=');e=src.index(';\n',i)+2
head=src[:e].replace('Family Test 7','Progression Test 8')
a=head.index('<style>')+7;b=head.index('</style>',a);oldcss=head[a:b];oldcss=oldcss[:oldcss.index('/* Shared portrait')]
head=head[:a]+oldcss+'\n'+(root/'menu.css').read_text()+head[b:]
head=head.replace('<button id="panelButton">','<div id="upgradeChoices"></div><button id="continue" style="display:none"></button><button id="panelButton">')
Path('burntwood-progression-v8.html').write_text(head+(root/'game.js').read_text()+'</script></html>');print('Built progression v8')
