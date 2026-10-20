// arenas/chasewater.js — source of truth.
function chaseSpawn(kind,e){e.chase=true;e.kind=kind;e.attackCD=0;let spec={goose:[20,13,59],fox:[38,17,63],owl:[30,17,45],mud:[55,18,21],heavy:[110,25,27],boss:[1100,43,35]}[kind];e.hp=e.maxHp=spec[0]+(kind==='boss'?0:time*.10);e.r=spec[1];e.speed=spec[2];e.mode=kind==='owl'||kind==='boss'?'circle':'walk';e.timer=kind==='boss'?2.3:1.5+rand()*1.6;e.side=e.id%2?1:-1;e.sequence=0;e.tx=e.x;e.ty=e.y;let v=walkable(e.x,e.y,e.r);e.x=v.x;e.y=v.y;if(kind==='mud'&&!chaseRouteActive())e.x=shore(e.y)+42;if(kind==='boss'){boss=e;bossSpawned=true;float(p.x,p.y-65,'THE NIGHT OWL DESCENDS','#eddba0');}return e;}

function chaseWave(){if(chaseRouteActive())return chaseRouteWave();let pt=pressureTime(),roll=rand(),kind=pt>34&&roll>.84?'heavy':pt>24&&roll<.19?'mud':pt>14&&roll<.43?'owl':pt>7&&roll>.64?'fox':'goose';spawn(kind);if(pt>10&&rand()<.38)spawn('goose');nextSpawn=stageSpawnDelay(Math.max(.6,1.05-time*.0025));}

function shootMud(e){let a=Math.atan2(p.y-e.y,p.x-e.x);enemyShots.push({x:e.x,y:e.y-7,px:e.x,py:e.y-7,vx:Math.cos(a)*125,vy:Math.sin(a)*125,r:6,life:3.6,damage:6,damageScale:e.damageScale});if(enemyShots.length>60)enemyShots.shift();pop(e.x,e.y-8,'#b8a17c',4);}

function applyChaseContact(e){if(selected==='jackson'&&p.action==='dodge'&&!p.hitIds.has(e.id)&&dist(p,e)<e.r+p.r+7){p.hitIds.add(e.id);dodgeImpact(e);}if(p.action==='charge'&&!p.hitIds.has(e.id)&&dist(p,e)<e.r+p.r+(S(3)?24:12)){p.hitIds.add(e.id);chargeImpact(e);shake=3;}if(e.hp>0&&!(e.stunUntil>time)&&e.mode!=='circle'&&e.mode!=='recover'&&dist(p,e)<p.r+e.r&&e.attackCD<=0){hurt(e.kind==='boss'?16:e.kind==='heavy'?10:e.kind==='owl'?8:e.kind==='fox'?7:4,e);e.attackCD=.85;}}

function stepChaseEnemy(e,dt){let goal=enemyGoal(e),dx=goal.x-e.x,dy=goal.y-e.y,d=Math.hypot(dx,dy)||1,mx=dx/d,my=dy/d,speed=e.speed,stunned=e.stunUntil>time;if(stunned){e.timer+=dt;let q=chaseEnemyPosition(e,e.x+e.kx*dt,e.y+e.ky*dt,e.r);e.x=q.x;e.y=q.y;e.kx*=Math.exp(-dt*8);e.ky*=Math.exp(-dt*8);applyChaseContact(e);return;}
if(e.kind==='boss'){
if(e.mode==='circle'){speed=27;mx=Math.cos(e.age*.6)*.7;my=Math.sin(e.age*.5)*.4;if(e.timer<=0){let a=e.sequence++%4;if(a===1){e.mode='gustWind';e.timer=1.15;e.aim=Math.atan2(dy,dx);}else{e.mode='owlWind';e.timer=1.05;let spot=chaseEnemyPosition(e,p.x,p.y,e.r);e.tx=spot.x;e.ty=spot.y;}}}
else if(e.mode==='owlWind'){speed=0;if(e.timer<=0){e.mode='owlDive';e.timer=.65;e.diveT=0;e.sx=e.x;e.sy=e.y;}}
else if(e.mode==='owlDive'){speed=0;if(!stunned){e.diveT+=dt*(e.slowUntil>time?.7:1);let u=clamp(e.diveT/.65,0,1);e.x=lerp(e.sx,e.tx,u);e.y=lerp(e.sy,e.ty,u);if(u>=1){e.mode='recover';e.timer=1.5;pop(e.x,e.y,'#ded7b1',16);}}}
else if(e.mode==='gustWind'){speed=0;if(e.timer<=0){e.mode='gust';e.timer=.4;let a=Math.atan2(dy,dx),delta=Math.atan2(Math.sin(a-e.aim),Math.cos(a-e.aim));if(d<300&&Math.abs(delta)<.9&&p.inv<=0){p.extX=(p.extX||0)+Math.cos(e.aim)*280;p.extY=(p.extY||0)+Math.sin(e.aim)*280;float(p.x,p.y-35,'WING GUST','#c9e5e5');}pop(e.x,e.y,'#b9d6db',15);}}
else if(e.mode==='summonWind'){speed=0;if(e.timer<=0){for(let side of [-1,1])spawn('owl',chaseEnemyPosition(e,e.x+side*70,e.y+50,17));e.mode='recover';e.timer=1.2;}}
else{speed=0;if(e.timer<=0){e.mode='circle';e.timer=e.hp<e.maxHp*.5?1.1:1.6;}}
}else if(e.kind==='owl'){
if(e.mode==='circle'){let a=Math.atan2(dy,dx)+e.side*.9;mx=Math.cos(a);my=Math.sin(a);if(d<95)speed=0;if(e.timer<=0){e.mode='owlWind';e.timer=.8;let spot=chaseEnemyPosition(e,p.x,p.y,17);e.tx=spot.x;e.ty=spot.y;}}
else if(e.mode==='owlWind'){speed=0;if(e.timer<=0){e.mode='owlDive';e.timer=.52;e.diveT=0;e.sx=e.x;e.sy=e.y;}}
else if(e.mode==='owlDive'){speed=0;if(!stunned){e.diveT+=dt*(e.slowUntil>time?.7:1);let u=clamp(e.diveT/.52,0,1);e.x=lerp(e.sx,e.tx,u);e.y=lerp(e.sy,e.ty,u);if(u>=1){e.mode='recover';e.timer=1.25;}}}
else{speed=0;if(e.timer<=0){e.mode='circle';e.timer=2.2;}}
}else if(e.kind==='mud'){
let goal=chaseRouteActive()?chaseRouteX(e.y)+100:shore(e.y)+45;if(e.mode==='mudWind'){speed=0;if(e.timer<=0){shootMud(e);e.mode='walk';e.timer=2.9;}}
else{mx=clamp((goal-e.x)/30,-1,1);my=dy/d*(d>210?1:d<140?-1:0);if(e.timer<=0&&d<430){e.mode='mudWind';e.timer=.8;}}
}else if(e.kind==='fox'){
if(e.mode==='walk'){let flank=Math.atan2(dy,dx)+e.side*.85;mx=Math.cos(flank);my=Math.sin(flank);if(e.timer<=0&&d<240){e.mode='foxWind';e.timer=.65;e.dx=dx/d;e.dy=dy/d;}}
else if(e.mode==='foxWind'){speed=0;if(e.timer<=0){e.mode='rush';e.timer=.42;}}
else if(e.mode==='rush'){mx=e.dx;my=e.dy;speed=315;if(e.timer<=0){e.mode='recover';e.timer=.75;}}
else{speed=0;if(e.timer<=0){e.mode='walk';e.timer=1.9;}}
}else if(e.kind==='heavy'){
if(e.mode==='walk'&&d<105&&e.timer<=0){e.mode='headWind';e.timer=.95;e.dx=dx/d;e.dy=dy/d;}
else if(e.mode==='headWind'){speed=0;if(e.timer<=0){e.mode='rush';e.timer=.3;}}
else if(e.mode==='rush'){mx=e.dx;my=e.dy;speed=165;if(e.timer<=0){e.mode='recover';e.timer=1.4;}}
else if(e.mode==='recover'){speed=0;if(e.timer<=0){e.mode='walk';e.timer=1.6;}}
}else{
let a=e.id*2.399;let gx=p.x+Math.cos(a)*28,gy=p.y+Math.sin(a)*28,gd=Math.hypot(gx-e.x,gy-e.y)||1;mx=(gx-e.x)/gd;my=(gy-e.y)/gd;
if(e.mode==='walk'&&d<88&&e.timer<=0){e.mode='gooseWind';e.timer=.4;e.dx=dx/d;e.dy=dy/d;}
else if(e.mode==='gooseWind'){speed=0;if(e.timer<=0){e.mode='rush';e.timer=.42;}}
else if(e.mode==='rush'){mx=e.dx;my=e.dy;speed=155;if(e.timer<=0){e.mode='recover';e.timer=.55;}}
else if(e.mode==='recover'){speed=0;if(e.timer<=0){e.mode='walk';e.timer=1.3;}}
}
if(stunned)speed=0;if(e.slowUntil>time)speed*=.7;if(e.charmFrostUntil>time)speed*=charmSlowFactor(e);if(e.stagger>0)speed*=.2;let pos=chaseEnemyPosition(e,e.x+mx*speed*dt+e.kx*dt,e.y+my*speed*dt+e.ky*dt,e.r);e.x=pos.x;e.y=pos.y;e.kx*=Math.exp(-dt*8);e.ky*=Math.exp(-dt*8);applyChaseContact(e);
}

function stepEnemyShots(dt){for(let i=enemyShots.length-1;i>=0;i--){let b=enemyShots[i];b.life-=dt;b.px=b.x;b.py=b.y;b.x+=b.vx*dt;b.y+=b.vy*dt;let sx=b.x-b.px,sy=b.y-b.py,l=sx*sx+sy*sy,u=l?clamp(((p.x-b.px)*sx+(p.y-b.py)*sy)/l,0,1):0;if(Math.hypot(p.x-b.px-sx*u,p.y-b.py-sy*u)<p.r+b.r){hurt(b.damage,b);b.life=0;pop(b.x,b.y,'#aa9070',4);}if(b.life<=0)enemyShots.splice(i,1);}}

function drawChaseWarnings(){for(let e of enemies){if(!e.chase||e.hp<=0)continue;if(e.mode==='owlWind'){ctx.fillStyle='#e8b94c22';ctx.strokeStyle='#f4cb6fcc';ctx.lineWidth=2;ctx.beginPath();ctx.arc(e.tx,e.ty,e.kind==='boss'?53:30,0,TAU);ctx.fill();ctx.stroke();line([[e.tx-9,e.ty],[e.tx+9,e.ty]],'#f5ce83',2);line([[e.tx,e.ty-9],[e.tx,e.ty+9]],'#f5ce83',2);}else if(['foxWind','headWind','gooseWind'].includes(e.mode)){let len=e.kind==='fox'?145:e.kind==='heavy'?70:75;ctx.save();ctx.translate(e.x,e.y);ctx.rotate(Math.atan2(e.dy,e.dx));ctx.fillStyle='#eab85d22';ctx.fillRect(0,-13,len,26);line([[0,-13],[len,-13],[len,13],[0,13]],'#f4cc8699',1.4);ctx.restore();}else if(e.mode==='gustWind'||e.mode==='gust'){ctx.save();ctx.translate(e.x,e.y);ctx.rotate(e.aim);ctx.fillStyle=e.mode==='gust'?'#b9dfe24a':'#b9dfe21c';ctx.strokeStyle='#bfdee699';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,300,-.9,.9);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();}else if(e.mode==='summonWind'){ctx.strokeStyle='#c3b6df99';ctx.lineWidth=2;ctx.beginPath();ctx.arc(e.x,e.y,70+Math.sin(time*7)*4,0,TAU);ctx.stroke();}}}

function drawChaseEnemy(e){drawWildEnemy(e,'chasewater');}

function drawChasewater(){if(chaseRouteActive())return drawChaseRouteGround();return drawLegacyChasewater();}
function drawLegacyChasewater(){ctx.fillStyle='#48684b';ctx.fillRect(0,0,WORLD.w,WORLD.h);const vis=(x,y,r=90)=>Math.abs(x-cam.x)<W/scale/2+r&&Math.abs(y-cam.y)<H/scale/2+r;let path=new Path2D();path.moveTo(0,0);for(let y=0;y<=WORLD.h;y+=20)path.lineTo(shore(y),y);path.lineTo(0,WORLD.h);path.closePath();let water=ctx.createLinearGradient(0,0,220,0);water.addColorStop(0,'#28586c');water.addColorStop(1,'#538983');ctx.fillStyle=water;ctx.fill(path);ctx.strokeStyle='#a8b48c';ctx.lineWidth=15;ctx.beginPath();for(let y=0;y<=WORLD.h;y+=20)y?ctx.lineTo(shore(y)+5,y):ctx.moveTo(shore(y)+5,y);ctx.stroke();
for(let y=60;y<WORLD.h;y+=75){if(!vis(80,y))continue;for(let i=0;i<3;i++){let x=25+i*43;line([[x,y+Math.sin(time+i+y)*2],[x+19,y+Math.sin(time+i+y)*2]],'#a4cbc14d',1);}}
ctx.strokeStyle='#61724c';ctx.lineWidth=92;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(480,45);ctx.bezierCurveTo(620,390,355,790,510,1255);ctx.stroke();ctx.strokeStyle='#9b9b70';ctx.lineWidth=70;ctx.stroke();ctx.strokeStyle='#b5af7e66';ctx.lineWidth=2;for(let y=105;y<1250;y+=115){let x=475+Math.sin(y*.005)*18;line([[x-15,y],[x+12,y+15]],'#c1b88b55',1);}
for(let y of [420,1000]){ctx.strokeStyle='#a0a277';ctx.lineWidth=38;ctx.beginPath();ctx.moveTo(215,y);ctx.quadraticCurveTo(340,y-25,470,y);ctx.stroke();}
for(let i=0;i<190;i++){let x=220+(i*137.37)%620,y=70+(i*89.17)%1160;if(!vis(x,y,20)||Math.abs(x-(480+Math.sin(y*.005)*20))<55)continue;line([[x,y],[x-2,y-5]],i%3?'#66834e':'#7e9159',1);if(i%13===0){ellipse(x+2,y-4,2,2,i%2?'#d2c984':'#a998b4');}}
for(let y=85;y<1250;y+=53){if(!vis(shore(y),y))continue;let x=shore(y)+12;for(let i=0;i<3;i++){line([[x+i*5,y+8],[x+i*5-2,y-10-i%2*6]],'#506d3f',2);if(i===1)line([[x+3,y-10],[x+3,y-17]],'#8c7754',3);}}
function tree(x,y,s=1){if(!vis(x,y,60))return;ctx.save();ctx.translate(x,y);ctx.scale(s,s);ellipse(5,13,30,13,'#233f3244');line([[0,10],[0,-22]],'#66543d',9);ellipse(-12,-28,23,24,'#294d3c');ellipse(14,-31,25,26,'#315b42');ellipse(0,-43,25,27,'#3b6646');ellipse(-6,-52,16,17,'#50794d');ctx.restore();}
for(let y=90;y<1270;y+=85){tree(850+(Math.sin(y)*12),y,1.1);if(y<240||y>1100)tree(300,y,.9);}for(let [x,y,s] of [[680,200,1.1],[735,330,.85],[310,650,.9],[710,1040,1.2],[650,1170,.9],[310,160,.8]])tree(x,y,s);
function bench(x,y){if(!vis(x,y))return;ellipse(x+2,y+10,28,10,'#294a3344');for(let dy of [-9,-3,3])line([[x-21,y+dy],[x+21,y+dy]],'#927851',5);line([[x-16,y+4],[x-16,y+13]],'#424e40',3);line([[x+16,y+4],[x+16,y+13]],'#424e40',3);}bench(645,440);bench(620,925);bench(735,690);line([[700,1110],[744,1127],[766,1120]],'#796a4b',7);line([[722,1119],[730,1106]],'#796a4b',3);
if(vis(440,80)){line([[400,83],[400,110]],'#66583f',6);ctx.fillStyle='#334e3b';ctx.beginPath();ctx.roundRect(320,50,260,40,7);ctx.fill();ctx.strokeStyle='#a9ad7e';ctx.lineWidth=2;ctx.stroke();ctx.fillStyle='#e6dcac';ctx.font='bold 15px system-ui';ctx.textAlign='center';ctx.fillText('CHASEWATER COUNTRY PARK',450,75);}ctx.strokeStyle='#d6d2a233';ctx.lineWidth=2;ctx.strokeRect(shore(650)+22,55,655,1190);
}

ARENAS.chasewater={name:'Chasewater Country Park',short:'Chasewater',boss:'Chasewater Night Owl',bossShort:'NIGHT OWL'};
