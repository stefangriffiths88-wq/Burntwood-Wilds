// Town-only presentation. Reuses approved hero renderers without running combat AI.
const TOWN_RESIDENTS=[
 {key:'jackson',x:365,y:816,place:'Rugby Club'},
 {key:'ava',x:490,y:571,place:'Town garden'},
 {key:'stef',x:334,y:548,place:'Workshop corner'},
 {key:'jodie',x:222,y:549,place:'Cottage lane'},
 {key:'evie',x:278,y:831,place:'Chasewater path'},
 {key:'zak',x:615,y:296,place:'Sankey’s Corner'}
];
function townResidents(){let shop=shopkeeperKey();return TOWN_RESIDENTS.filter(n=>n.key!==selected&&n.key!==shop);}
function drawTownHero(key,x,y,phase=0){if(key==='mimi'){drawMimiBody(x,y+Math.sin(phase*2),1,0,0);return;}let player=p,hero=selected;try{p={x,y,vx:0,vy:0,r:14,walk:phase,inv:0,throwT:0,action:null,actionT:0,dir:{x:0,y:1},swing:null,claws:null,frenzy:0,kittenCall:0};selected=key;CHARACTER_MODULES[key].draw();}finally{p=player;selected=hero;}}
function townName(x,y,name,color='#fff0bd'){ctx.font='bold 10px system-ui';ctx.textAlign='center';ctx.fillStyle='#173c2dcc';ctx.fillRect(x-39,y-57,78,17);ctx.fillStyle=color;ctx.fillText(name,x,y-45);}
function drawTownResidents(){for(let n of townResidents()){drawTownHero(n.key,n.x,n.y,hub.time*.5+n.x);townName(n.x,n.y,CHARACTERS[n.key].name);if(n.key==='jackson'){ballArt(n.x+22,n.y+17-Math.abs(Math.sin(hub.time*2))*9,5,hub.time,false);}if(n.key==='ava')starArt(n.x+24,n.y-18+Math.sin(hub.time*2)*4,4,hub.time);if(n.key==='evie')drawDuck({x:n.x+22,y:n.y+10,r:6,mode:'ally',age:hub.time,t:0});}}
function townBossPreview(g){return {id:-1,kind:'boss',x:g.x,y:g.y,r:42,hp:1,maxHp:1,age:hub.time,flash:0,stunUntil:0,slowUntil:0,mode:'walk',market:g.key==='sankeys',chase:g.key==='chasewater',quarry:g.key==='quarry'};}
function drawTownBosses(){for(let g of hub.portals){let done=run.visited?.includes(g.key);ctx.save();if(done)ctx.globalAlpha=.42;drawEnemy(townBossPreview(g));ctx.restore();townName(g.x,g.y-24,ARENAS[g.key].bossShort.toUpperCase(),done?'#bfd0b1':'#f8d491');ctx.fillStyle='#f9e7b6';ctx.font='bold 9px system-ui';ctx.textAlign='center';ctx.fillText(done?'CLEARED':'TAP TO CHALLENGE',g.x,g.y+55);}}
function hubTap(worldX,worldY){if(state!=='hub')return false;let point={x:worldX,y:worldY};if(dist(point,SHOPKEEPER)<52||dist(point,hub.shop)<48)return interactShopkeeper(true);let g=hub.portals.find(g=>dist(point,g)<58);if(g&&!run.visited?.includes(g.key))return enterArena(g.key);return false;}
function hubScreenPoint(x,y){let box=canvas.getBoundingClientRect();return {x:cam.x+(x-box.left-W/2)/scale,y:cam.y+(y-box.top-H*.47)/scale};}
let hubPointer=null;
function beginHubPointer(e){if(state!=='hub'||e.isPrimary===false)return;hubPointer={id:e.pointerId,x:e.clientX,y:e.clientY};}
function endHubPointer(e){let start=hubPointer;hubPointer=null;if(!start||start.id!==e.pointerId||state!=='hub'||Math.hypot(e.clientX-start.x,e.clientY-start.y)>12)return;let q=hubScreenPoint(e.clientX,e.clientY);hubTap(q.x,q.y);}
