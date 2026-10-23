// Town-only presentation. Reuses approved hero renderers without running combat AI.
const TOWN_RESIDENTS=[
 {key:'ricky',x:725,y:690,place:'Brickwork corner'},
 {key:'harvey',x:600,y:780,place:'Park path'},
 {key:'immy',x:300,y:720,place:'Woodland path'},
 {key:'mimi',x:400,y:330,place:'Shopping centre'},
 {key:'havannah',x:630,y:505,place:'Town garden'},
 {key:'tom',x:677,y:590,place:'Town green'},
 {key:'joseph',x:540,y:827,place:'Rugby Club'},
 {key:'jackson',x:365,y:816,place:'Rugby Club'},
 {key:'ava',x:490,y:571,place:'Town garden'},
 {key:'stef',x:334,y:548,place:'Workshop corner'},
 {key:'jodie',x:222,y:549,place:'Cottage lane'},
 {key:'evie',x:278,y:831,place:'Chasewater path'},
 {key:'zak',x:615,y:296,place:'Sankey’s Corner'}
];
function townResidents(){let shop=serviceOpen('mimi')?shopkeeperKey():null,host=serviceOpen('stef')?workshopKeeperKey():null;return TOWN_RESIDENTS.filter(n=>(heroUnlocked(n.key)||['mimi','stef'].includes(n.key))&&n.key!==selected&&n.key!==shop&&!(n.key==='stef'&&!serviceOpen('stef'))).map(n=>serviceOpen('ava')&&n.key===charmShopKeeper()?{...n,x:CHARM_SHOP.x,y:CHARM_SHOP.y}:n.key===host?{...n,x:WORKSHOP.x,y:WORKSHOP.y}:n);}
// Shared visual sizing lives in the character renderers, identical in town and combat.
const TOWN_DRAW_SCALE={havannah:1,tom:1,joseph:1,jackson:1,ava:1,stef:1,jodie:1,evie:1,zak:1,mimi:1};
function drawTownHero(key,x,y,phase=0){let player=p,hero=selected;ctx.save();try{ctx.translate(x,y);let size=TOWN_DRAW_SCALE[key]||1;ctx.scale(size,size);if(key==='ricky'){drawRickyBody(0,0,phase,{dir:{x:0,y:1}});return;}if(key==='harvey'){drawHarveyBody(0,0,phase,{dir:{x:0,y:1}});return;}if(key==='immy'){drawImmyBody(0,0,phase,{dir:{x:0,y:1}});return;}if(key==='havannah'){drawHavannahBody(0,0,phase,{dir:{x:0,y:1}});return;}if(key==='tom'){drawTomBody(0,0,phase,{dir:{x:0,y:1}});return;}if(key==='joseph'){drawJosephBody(0,0,phase,{dir:{x:0,y:1}});return;}if(key==='mimi'){drawMimiBody(0,Math.sin(phase*2),1,0,0);return;}p={x:0,y:0,vx:0,vy:0,r:14,walk:phase,inv:0,throwT:0,action:null,actionT:0,dir:{x:0,y:1},swing:null,claws:null,frenzy:0,kittenCall:0};selected=key;CHARACTER_MODULES[key].draw();}finally{p=player;selected=hero;ctx.restore();}}
function drawHubPlayer(){ctx.save();ctx.translate(p.x,p.y);let size=TOWN_DRAW_SCALE[selected]||1;ctx.scale(size,size);ctx.translate(-p.x,-p.y);CHARACTER_MODULES[selected].draw();ctx.restore();}
function townName(x,y,name,color='#fff0bd'){ctx.font='bold 10px system-ui';ctx.textAlign='center';ctx.fillStyle='#173c2dcc';ctx.fillRect(x-39,y-57,78,17);ctx.fillStyle=color;ctx.fillText(name,x,y-45);}
function drawTownResidents(list=townResidents()){for(let n of list){drawTownHero(n.key,n.x,n.y,hub.time*.5+n.x);if(dist(p,n)<125){townName(n.x,n.y,CHARACTERS[n.key].name);if(dist(p,n)<65)drawTalkBubble(n.x,n.y);}if(n.key==='jackson'){ballArt(n.x+22,n.y+17-Math.abs(Math.sin(hub.time*2))*9,5,hub.time,false);}if(n.key==='ava')starArt(n.x+24,n.y-18+Math.sin(hub.time*2)*4,4,hub.time);if(n.key==='evie')drawDuck({x:n.x+22,y:n.y+10,r:6,mode:'ally',age:hub.time,t:0});}}
function townBossPreview(g){return {id:-1,kind:'boss',x:g.x,y:g.y,r:42,hp:1,maxHp:1,age:run.visited?.includes(g.key)?0:hub.time,flash:0,stunUntil:0,slowUntil:0,wounded:!!run.visited?.includes(g.key),mode:'walk',park:g.key==='park',move:'umbrella',market:g.key==='sankeys',chase:g.key==='chasewater',quarry:g.key==='quarry'};}
function drawTownBosses(list=hub.portals){for(let g of list)drawTownEntrance(g);}
function hubTap(worldX,worldY){if(state!=='hub')return false;let point={x:worldX,y:worldY};if(dist(point,SHOPKEEPER)<38||dist(point,hub.shop)<38)return interactShopkeeper(true);if(dist(point,CHARM_SHOP)<42)return interactCharmShop(true);if(dist(point,WORKSHOP)<42)return interactWorkshop(true);let resident=townResidents().find(n=>dist(point,n)<28);if(resident)return openConversation(resident.key);let g=hub.portals.find(g=>dist(point,g)<58);if(g&&!run.visited?.includes(g.key))return enterArena(g.key);return false;}
function hubScreenPoint(x,y){let box=canvas.getBoundingClientRect();return {x:cam.x+(x-box.left-W/2)/scale,y:cam.y+(y-box.top-H*.47)/scale};}
let hubPointer=null;
function beginHubPointer(e){if(state!=='hub'||e.isPrimary===false)return;hubPointer={id:e.pointerId,x:e.clientX,y:e.clientY};}
function endHubPointer(e){let start=hubPointer;hubPointer=null;if(!start||start.id!==e.pointerId||state!=='hub'||Math.hypot(e.clientX-start.x,e.clientY-start.y)>12)return;let q=hubScreenPoint(e.clientX,e.clientY);hubTap(q.x,q.y);}
