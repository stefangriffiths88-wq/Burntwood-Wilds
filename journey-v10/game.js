const CHARACTERS={};let selected='jackson',pendingShots=[],glitterTime=0;const isAva=()=>selected==='ava',stats=()=>effectiveStats();
const canvas=document.getElementById('game'),ctx=canvas.getContext('2d'),$=id=>document.getElementById(id);let W=390,H=844,DPR=1,scale=.85,cam={x:450,y:650};const WORLD={w:900,h:1300},TAU=Math.PI*2;
let seed=98721;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),lerp=(a,b,t)=>a+(b-a)*t;
let state='menu',time=0,last=performance.now(),p,enemies=[],balls=[],gems=[],fx=[],warnings=[],id=0,kills=0,tier=0,xp=0,nextSpawn=0,bossSpawned=false,boss=null,shake=0,hitFlash=0,score=0;const stick={x:0,y:0},keys={},thresholds=[3,8,15,24,35],upgradeNames=['Rebound','Split Pass','Triple Pass','Heavy Hitters','Pinball Rugby'],upgradeText=['Your main ball bounces to a second enemy for 50% damage.','Its first hit also releases TWO smaller balls at 50% damage each.','Every split now releases THREE smaller balls.','Smaller balls now deal 75% damage each.','Each smaller ball can hit THREE different enemies in total.'];
const upgrades=['Main ball: 1 hit','Main ball: 2 hits','2 split balls · 50%','3 split balls · 50%','3 split balls · 75%','3 split balls · 75% · 3 hits each'];
addEventListener('resize',resize);resize();
const PROFILES={};
const maxTier=()=>isStef()||isEvie()?4:5;
const ARENAS={};let arenaKey='rugby',enemyShots=[];
const atChasewater=()=>arenaKey==='chasewater',arena=()=>ARENAS[arenaKey],shore=y=>177+Math.sin(y/155)*23;
// Jodie: readable forward claws and bounded autonomous companion attacks.
// Evie's bounded duck lifecycle: impact -> one ally smash -> optional egg defender.
// Run progression is separate from weapon tier: three cards, four independent paths.



const SPECIALS={};
const DODGES={};
const STAT_NAMES={};
// Boss perk rolls use independent randomness; combat's deterministic visual seed is untouched.


// Journey orchestration. Arena content and character implementations are split at build time.
const BUILD_ID='10.0.8';





// engine/core.js — source of truth.
function reset(){resetProgression();enemyShots=[];pendingShots=[];glitterTime=0;stick.x=stick.y=0;Object.keys(keys).forEach(k=>delete keys[k]);$('nub').style.transform='';seed=98721;time=0;enemies=[];balls=[];gems=[];fx=[];warnings=[];id=0;kills=tier=xp=0;bossSpawned=false;boss=null;shake=0;nextSpawn=.6;p={x:450,y:780,vx:0,vy:0,r:14,hp:stats().hp,inv:0,attack:.35,chargeCD:0,dodgeCD:0,action:null,actionT:0,dir:{x:0,y:-1},walk:0,throwT:0,hitIds:new Set()};cam={x:p.x,y:p.y};resetCats();resetDucks();resetZak();state='playing';$('charge').style.display='';$('charge').firstChild.textContent=isZak()?'EXPLODE':isEvie()?'ASSEMBLE':isJodie()?'KITTENS':isStef()?'BY ORDER!':isAva()?'GLITTER':'CHARGE';$('dodge').firstChild.textContent=isStef()?'PUSH':'DODGE';$('menu').style.display='none';$('panel').style.display='none';$('controls').style.display='block';$('hud').style.display='block';$('bossHud').style.display='none';$('arenaHud').textContent=arena().name.toUpperCase();$('bossHud').firstChild.textContent=arena().boss.toUpperCase();updateHud();}

function nearest(pos,exclude=new Set(),range=900){let best=null,d=range;for(let e of enemies){if(e.hp<=0||exclude.has(e.id))continue;let n=dist(pos,e);if(n<d){best=e;d=n;}}return best;}

function pop(x,y,color,n=9){for(let i=0;i<n;i++){let a=rand()*TAU,v=25+rand()*90;fx.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:.28+rand()*.2,max:.5,color,r:1.5+rand()*2});}if(fx.length>360)fx.splice(0,fx.length-360);}

function float(x,y,text,color='#fff1b6'){fx.push({x,y,vx:0,vy:-30,life:.6,max:.6,text,color,r:0});}

function damageEnemy(e,damage,dx,dy,strong=false,source='weapon'){if(e.hp<=0)return;if(shrineBuff?.kind==='critical'&&shrineBuff.left>0&&source!=='status'&&source!=='perk'&&rand()<.2){damage*=1.5;float(e.x,e.y-30,'CRIT!','#f8d787');}if(shrineBuff?.kind==='attack'&&shrineBuff.left>0&&source!=='status'&&source!=='perk')damage*=1.2;damage*=damageScale(source);let actual=Math.min(e.hp,Math.max(0,damage));e.hp-=damage;if(e===boss&&e.hp>0){let phase=Math.floor((1-e.hp/e.maxHp)*4);while((e.reinforcementPhase||0)<Math.min(3,phase)){e.reinforcementPhase=(e.reinforcementPhase||0)+1;let kind=arenaKey==='chasewater'?'owl':arenaKey==='sankeys'?'pigeon':'swarm',count=arenaKey==='rugby'?3:2;for(let i=0;i<count;i++)spawn(kind,{x:clamp(e.x+(i-(count-1)/2)*65,50,WORLD.w-50),y:clamp(e.y+75,75,WORLD.h-75)});}}hitPerk(e,actual,source);e.flash=.10;e.stagger=Math.max(e.stagger,strong?.24:.065);let resistance=e.kind==='heavy'||e.kind==='boss'?.25:1;e.kx+=dx*(strong?260:75)*resistance;e.ky+=dy*(strong?260:75)*resistance;float(e.x,e.y-e.r,Math.round(damage));pop(e.x,e.y,'#ffe0ae',strong?14:5);if(e.hp<=0){kills++;score++;onDefeated(e);let worth=e.kind==='heavy'||e.kind==='charger'?2:1;gems.push({x:e.x,y:e.y,value:worth,phase:rand()*TAU});pop(e.x,e.y,e.kind==='boss'?'#ffb650':'#c0d7ac',13);if(e===boss){finish(true);}}}

function hurt(amount,source){if(p.inv>0||state!=='playing')return;amount*=source?.damageScale||1;if(shrineBuff?.kind==='barrier'&&shrineBuff.shield>0){let absorbed=Math.min(amount,shrineBuff.shield);shrineBuff.shield-=absorbed;amount-=absorbed;radialEffect(p.x,p.y,26,'#9cdcf2');if(amount<=0){p.inv=.3;return;}}p.hp-=amount;p.inv=.95;shake=5;hitFlash=.15;pop(p.x,p.y,'#f58073',10);if(source){let dx=p.x-source.x,dy=p.y-source.y,d=Math.hypot(dx,dy)||1;p.x=clamp(p.x+dx/d*12,38,WORLD.w-38);p.y=clamp(p.y+dy/d*12,70,WORLD.h-70);}if(p.hp<=0)finish(false);}

function quickDodge(){if(state!=='playing'||p.action||p.dodgeCD>0)return;p.claws=null;p.action='dodge';p.actionT=0;p.dodgeCD=dodgeCooldown();p.inv=stats().dodgeTime+.03+((isAva()&&D(3))||(!isAva()&&D(2))?.12:0);beginDodgeBonuses();p.hitIds.clear();let d=Math.hypot(stick.x,stick.y);p.actionDir=d>.1?{x:stick.x/d,y:stick.y/d}:{...p.dir};}



function advance(dt){if(state==='hub'){stepHub(dt);return;}if(state!=='playing')return;time+=dt;glitterTime=Math.max(0,glitterTime-dt);progressStep();if(state!=='playing')return;p.inv=Math.max(0,p.inv-dt);p.chargeCD=Math.max(0,p.chargeCD-dt);p.dodgeCD=Math.max(0,p.dodgeCD-dt);p.throwT=Math.max(0,p.throwT-dt);shake=Math.max(0,shake-dt*25);hitFlash=Math.max(0,hitFlash-dt);
let dx=stick.x+(keys.d||keys.ArrowRight?1:0)-(keys.a||keys.ArrowLeft?1:0),dy=stick.y+(keys.s||keys.ArrowDown?1:0)-(keys.w||keys.ArrowUp?1:0),len=Math.hypot(dx,dy);if(len<.1)dx=dy=0;else if(len>1){dx/=len;dy/=len;}let tx=dx*stats().speed,ty=dy*stats().speed;if(isStef()&&p.frenzy>0){tx*=.7;ty*=.7;}
if(p.action){p.actionT+=dt;let speed=0;if(p.action==='dodge'){speed=stats().dodgeSpeed*(1-p.actionT/stats().dodgeTime);if(p.actionT>=stats().dodgeTime){p.action=null;endDodge();}}else if(p.action==='push'){speed=0;if(p.actionT>=.44)p.action=null;}else{speed=p.actionT<.12?0:590*(S(1)?1.2:1)*(1-Math.max(0,p.actionT-.55)/.2);if(p.actionT>.75){p.action=null;if(S(5)){p.aim=Math.atan2(p.actionDir.y,p.actionDir.x);forwardFinisher(30,76,'#e9c677');}}}if(p.action){tx=p.actionDir.x*Math.max(0,speed);ty=p.actionDir.y*Math.max(0,speed);if(rand()<.5)fx.push({x:p.x,y:p.y,vx:0,vy:0,life:.16,max:.16,color:'#dce9bf',r:p.action==='charge'?12:8,ghost:true});}}
let smooth=1-Math.exp(-dt*(p.action?32:15));p.vx=lerp(p.vx,tx,smooth);p.vy=lerp(p.vy,ty,smooth);p.x=clamp(p.x+p.vx*dt,36,WORLD.w-36);p.y=clamp(p.y+p.vy*dt,65,WORLD.h-65);p.walk+=Math.hypot(p.vx,p.vy)*dt*.065;if(!p.action&&len>.1)p.dir={x:dx/(Math.hypot(dx,dy)||1),y:dy/(Math.hypot(dx,dy)||1)};
p.attack-=dt;if(p.attack<=0&&!(p.frenzy>0)&&p.action!=='charge'&&p.action!=='push'){p.attack=CHARACTER_MODULES[selected].attack()?normalAttackInterval():.08;}

for(let i=pendingShots.length-1;i>=0;i--){pendingShots[i].delay-=dt;if(pendingShots[i].delay<=0){fireStar();pendingShots.splice(i,1);}}
nextSpawn-=dt;if(nextSpawn<=0&&enemies.length<90&&!bossSpawned){ARENA_MODULES[arenaKey].wave();}

if(!bossSpawned&&time>=BOSS_TIME){spawn('boss',{x:clamp(p.x,100,WORLD.w-100),y:clamp(p.y-330,100,WORLD.h-100)});}
for(let e of enemies){if(e.hp<=0)continue;e.age+=dt;e.flash=Math.max(0,e.flash-dt);e.stagger=Math.max(0,e.stagger-dt);e.attackCD=Math.max(0,e.attackCD-dt);e.timer-=dt;if(e.quarry){stepQuarryEnemy(e,dt);continue;}if(e.market){stepMarketEnemy(e,dt);continue;}if(e.chase){stepChaseEnemy(e,dt);continue;}let goal=enemyGoal(e),dx=goal.x-e.x,dy=goal.y-e.y,d=Math.hypot(dx,dy)||1,move=e.speed;
if(e.kind==='charger'||e.kind==='boss'){
if(e.mode==='walk'&&e.timer<=0){e.mode='wind';e.timer=e.kind==='boss'?.95:.70;e.dx=dx/d;e.dy=dy/d;}
else if(e.mode==='wind'){move=0;if(e.timer<=0){e.mode='rush';e.timer=e.kind==='boss'?1.0:.65;}}
else if(e.mode==='rush'){dx=e.dx;dy=e.dy;d=1;move=e.kind==='boss'?360:275;if(e.timer<=0||e.x<42||e.x>WORLD.w-42||e.y<68||e.y>WORLD.h-68){e.mode='recover';e.timer=e.kind==='boss'?1.55:1.15;}}
else if(e.mode==='recover'){move=0;if(e.timer<=0){e.mode='walk';e.timer=e.kind==='boss'?1.8:2.6;}}}
if(e.stunUntil>time)move=0;if(e.slowUntil>time)move*=.7;if(e.stagger>0)move*=.2;e.x=clamp(e.x+dx/d*move*dt+e.kx*dt,30,WORLD.w-30);e.y=clamp(e.y+dy/d*move*dt+e.ky*dt,55,WORLD.h-55);e.kx*=Math.exp(-dt*8);e.ky*=Math.exp(-dt*8);
if(selected==='jackson'&&p.action==='dodge'&&!p.hitIds.has(e.id)&&dist(p,e)<e.r+p.r+7){p.hitIds.add(e.id);dodgeImpact(e);}
if(p.action==='charge'&&!p.hitIds.has(e.id)&&dist(p,e)<e.r+p.r+(S(3)?24:12)){p.hitIds.add(e.id);chargeImpact(e);shake=3;}
if(e.hp>0&&!(e.stunUntil>time)&&dist(p,e)<p.r+e.r&&e.attackCD<=0){hurt(e.kind==='boss'?18:e.kind==='heavy'?8:e.mode==='rush'?10:4,e);e.attackCD=.8;}
}
CHARACTER_MODULES[selected].update(dt);bonusStep(dt);rewardStep(dt);stepShrine(dt);stepEnemyShots(dt);if(atChasewater()){let pos=walkable(p.x+(p.extX||0)*dt,p.y+(p.extY||0)*dt,p.r);p.x=pos.x;p.y=pos.y;p.extX=(p.extX||0)*Math.exp(-dt*7);p.extY=(p.extY||0)*Math.exp(-dt*7);}
// Light separation prevents enemies occupying exactly the same spot.
for(let i=0;i<enemies.length;i++){let a=enemies[i];if(a.hp<=0)continue;for(let j=i+1;j<enemies.length;j++){let b=enemies[j];if(b.hp<=0)continue;let dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy),min=(a.r+b.r)*.75;if(d>0&&d<min){let push=(min-d)*.5*dt*5;dx/=d;dy/=d;a.x-=dx*push;a.y-=dy*push;b.x+=dx*push;b.y+=dy*push;}}}
for(let i=balls.length-1;i>=0;i--){let b=balls[i];if(b.star){updateStar(b,dt);if(b.life<=0)balls.splice(i,1);continue;}b.life-=dt;b.px=b.x;b.py=b.y;b.x+=b.vx*dt;b.y+=b.vy*dt;b.spin+=dt*18;if(b.life<=0){balls.splice(i,1);continue;}
for(let e of enemies){if(e.hp<=0||b.hit.has(e.id))continue;let sx=b.x-b.px,sy=b.y-b.py,l=sx*sx+sy*sy,t=l?clamp(((e.x-b.px)*sx+(e.y-b.py)*sy)/l,0,1):0;if(Math.hypot(e.x-(b.px+sx*t),e.y-(b.py+sy*t))<e.r+b.r){b.hit.add(e.id);b.hitsMade=(b.hitsMade||0)+1;let v=Math.hypot(b.vx,b.vy)||1;damageEnemy(e,b.damage,b.vx/v,b.vy/v);if(b.main&&tier>=2&&!b.split){b.split=true;splitBall(b,e);}if(b.hitsMade>=b.maxHits){b.life=0;break;}let target=nearest(e,b.hit,330);if(!target){b.life=0;break;}let dx=target.x-e.x,dy=target.y-e.y,d=Math.hypot(dx,dy)||1;b.x=e.x+dx/d*(e.r+6);b.y=e.y+dy/d*(e.r+6);b.vx=dx/d*v;b.vy=dy/d*v;if(b.main)b.damage=13;pop(e.x,e.y,'#f9ce6c',5);break;}}
}
for(let i=gems.length-1;i>=0;i--){let g=gems[i],d=dist(p,g);let pickup=hasStat(3)?168.75:135;if(d<pickup){let v=(180+(pickup-d)*5)*dt;g.x+=(p.x-g.x)/(d||1)*Math.min(v,d);g.y+=(p.y-g.y)/(d||1)*Math.min(v,d);}if(d<20){run.earned+=g.value;gems.splice(i,1);showUpgrade();}}
for(let i=fx.length-1;i>=0;i--){let f=fx[i];f.life-=dt;f.x+=f.vx*dt;f.y+=f.vy*dt;if(f.life<=0)fx.splice(i,1);}enemies=enemies.filter(e=>e.hp>0);if(atChasewater())for(let e of enemies){let q=walkable(e.x,e.y,e.r);e.x=q.x;e.y=q.y;}cam.x=lerp(cam.x,p.x,1-Math.exp(-dt*8));cam.y=lerp(cam.y,p.y,1-Math.exp(-dt*8));updateHud();}

function ellipse(x,y,rx,ry,color){ctx.fillStyle=color;ctx.beginPath();ctx.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),0,0,TAU);ctx.fill();}

function line(points,color,width){ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();}

function drawRugbyHero(){let bob=Math.sin(p.walk*2)*Math.min(1,Math.hypot(p.vx,p.vy)/120)*.7;ctx.save();ctx.translate(p.x,p.y+bob);if(p.inv>0&&Math.floor(p.inv*22)%2===0)ctx.globalAlpha=.65;ctx.rotate(p.action==='charge'?p.dir.x*.25:p.dir.x*.05);drawHero(ctx,0,0,.95,isAva());ctx.restore();}



function draw(){if(state==='hub'){drawHub();return;}ctx.setTransform(DPR,0,0,DPR,0,0);ctx.fillStyle='#264a32';ctx.fillRect(0,0,W,H);if(!p)return;ctx.save();let sx=shake?(rand()-.5)*shake:0,sy=shake?(rand()-.5)*shake:0;ctx.translate(W/2-cam.x*scale+sx,H*.47-cam.y*scale+sy);ctx.scale(scale,scale);ground();drawStefGuide();drawZakClouds();drawChaseWarnings();drawMeteorGround();drawMarketWarnings();drawQuarryWarnings();drawShrine();
for(let e of enemies)if(!e.chase&&e.mode==='wind'&&e.hp>0){let len=e.kind==='boss'?440:230,width=e.kind==='boss'?e.r*1.5:22;ctx.save();ctx.translate(e.x,e.y);ctx.rotate(Math.atan2(e.dy,e.dx));ctx.fillStyle='#efb64d44';ctx.fillRect(0,-width/2,len,width);line([[0,-width/2],[len,-width/2]],'#ffcd71aa',2);line([[0,width/2],[len,width/2]],'#ffcd71aa',2);ctx.restore();}
for(let g of gems){let bob=Math.sin(time*4+g.phase)*2;ctx.fillStyle='#a5e1ab';ctx.beginPath();ctx.moveTo(g.x,g.y-5+bob);ctx.lineTo(g.x+4,g.y+bob);ctx.lineTo(g.x,g.y+5+bob);ctx.lineTo(g.x-4,g.y+bob);ctx.fill();}
for(let f of fx)if(f.ghost){ctx.globalAlpha=f.life/f.max*.3;ellipse(f.x,f.y,14,18,f.color);ctx.globalAlpha=1;}
let actors=[...enemies.filter(e=>e.hp>0),...cats.map(c=>({...c,isPet:true,source:c})),...ducks.filter(d=>d.life>0).map(d=>({...d,isDuck:true,source:d})),{...p,isPlayer:true}].sort((a,b)=>a.y-b.y);for(let e of actors)e.isPlayer?CHARACTER_MODULES[selected].draw():e.isPet?drawCat(e.source):e.isDuck?drawDuck(e.source):drawEnemy(e);
drawDuckExtras();drawBonuses();drawPlaytestExtras();for(let shot of enemyShots){line([[shot.px,shot.py],[shot.x,shot.y]],'#b4a18788',3);ellipse(shot.x,shot.y,6,5,'#8e7b5b');ellipse(shot.x-1,shot.y-1,2,2,'#c1b18b');}for(let b of balls){if(b.life<=0)continue;if(b.star){if(b.mode==='return')line([[b.px,b.py],[b.x,b.y]],'#ffd4ef99',3);starArt(b.x,b.y,6,b.spin);continue;}line([[b.px,b.py],[b.x-b.vx*.035,b.y-b.vy*.035]],b.main?'#fff4c999':'#f8d57088',b.main?3:2);ballArt(b.x,b.y,b.r,b.spin,!b.main);}
for(let f of fx)if(!f.ghost){ctx.globalAlpha=clamp(f.life/(f.max||.5),0,1);if(f.arcX!==undefined){let dx=f.arcX-f.x,dy=f.arcY-f.y;line([[f.x,f.y],[f.x+dx*.4+6,f.y+dy*.4-7],[f.x+dx*.65-5,f.y+dy*.65+6],[f.arcX,f.arcY]],'#f6e899',2);}else if(f.ring){ctx.globalAlpha*=.45;ctx.strokeStyle=f.color;ctx.lineWidth=2;ctx.beginPath();ctx.arc(f.x,f.y,f.r*(1-f.life/f.max*.35),0,TAU);ctx.stroke();}else if(f.text){ctx.font='bold 13px system-ui';ctx.textAlign='center';ctx.fillStyle=f.color;ctx.fillText(f.text,f.x,f.y);}else ellipse(f.x,f.y,f.r,f.r,f.color);}ctx.globalAlpha=1;ctx.restore();if(glitterTime>0){for(let i=0;i<45;i++){let x=(i*83.7)%W,y=((1-glitterTime/.8)*H+i*47)%H;starArt(x,y,2+(i%3),time+i);}}if(hitFlash>0){ctx.fillStyle='#d343341c';ctx.fillRect(0,0,W,H);}}

function resize(){W=innerWidth;H=innerHeight;DPR=Math.min(devicePixelRatio||1,2);canvas.width=W*DPR;canvas.height=H*DPR;canvas.style.width=W+'px';canvas.style.height=H+'px';scale=clamp(W/450,.7,1.1);}

function drawHero(c,x,y,s,ava){(ava?drawAvaSprite:drawJacksonSprite)(c,x,y,s,ava?0:2);}

function walkable(x,y,r=14){y=clamp(y,65,WORLD.h-65);return {x:clamp(x,atChasewater()?shore(y)+r+12:36,WORLD.w-36),y};}

function radialEffect(x,y,r,color){fx.push({x,y,vx:0,vy:0,r,life:.35,max:.35,color,ring:true});}

function forwardFinisher(amount,range,color){let aim=p.aim??Math.atan2(p.dir.y,p.dir.x),x=p.x+Math.cos(aim)*range*.5,y=p.y+Math.sin(aim)*range*.5;radialEffect(x,y,range*.55,color);p.finisherVisual=.25;p.finisherAim=aim;for(let e of enemies)if(e.hp>0&&angularContact(e,aim-.85,aim+.85,0,range))damageEnemy(e,amount,Math.cos(aim),Math.sin(aim),true,'special');}

function endDodge(){if(isAva()&&D(5)){radialEffect(p.x,p.y,58,'#e9b9ef');for(let e of enemies)if(dist(p,e)<58+e.r)e.slowUntil=Math.max(e.slowUntil||0,time+1.8);}if(isJodie()&&D(5)){radialEffect(p.x,p.y,50,'#eed4aa');for(let e of enemies)if(e.kind!=='boss'&&e.kind!=='heavy'&&dist(p,e)<50+e.r)e.stunUntil=time+.35;}}

function beginDodgeBonuses(){if(isJodie()&&D(3))for(let c of cats)if(!c.kitten)c.speedUntil=time+2;if(isEvie()&&D(3))for(let d of ducks)if(d.mode!=='thrown'&&dist(d,p)<180)d.speedUntil=time+2;if(isEvie()&&D(5)){decoy={x:p.x,y:p.y,r:9,until:time+1.5};radialEffect(p.x,p.y,22,'#c5a1df');}}

function bonusStep(dt){if(p.finisherVisual>0)p.finisherVisual-=dt;for(let task of scheduled){task.wait-=dt;if(task.wait<=0&&!task.done){task.done=true;if(task.kind==='meteor')meteorImpact(task);else glitterShower(.5);}}scheduled=scheduled.filter(t=>!t.done);for(let e of enemies){if(e.hp>0&&e.glitterUntil>time){e.glitterTick=(e.glitterTick||0)+dt;if(e.glitterTick>=.5){e.glitterTick-=.5;damageEnemy(e,1,0,0,false,'special');}}}
if(p.action==='dodge'&&isAva()&&D(2)){p.trailClock=(p.trailClock||0)-dt;if(p.trailClock<=0){p.trailClock=.06;hazards.push({x:p.x,y:p.y,until:time+1.2,r:16});}}
for(let h of hazards)for(let e of enemies)if(e.hp>0&&dist(h,e)<h.r+e.r)e.slowUntil=Math.max(e.slowUntil||0,time+.3);hazards=hazards.filter(h=>h.until>time).slice(-24);if(decoy&&decoy.until<=time)decoy=null;}

function drawBonuses(){for(let h of hazards){ctx.globalAlpha=.25;starArt(h.x,h.y,4,time);ctx.globalAlpha=1;}if(decoy)drawDuck({x:decoy.x,y:decoy.y,r:8,mode:'ally',age:time,t:0});if(p.finisherVisual>0){let a=p.finisherAim;for(let side of [-1,1])ellipse(p.x+Math.cos(a)*48-Math.sin(a)*side*9,p.y+Math.sin(a)*48+Math.cos(a)*side*9,9,8,'#f7e2bd');}}

function pushRadius(){return D(1)?100:82;}

function enemyGoal(e){return decoy&&decoy.until>time&&['swarm','goose','fox'].includes(e.kind)&&['walk','follow'].includes(e.mode)&&dist(e,decoy)<180?decoy:p;}

function radialDraw(x,y,r,color){ctx.strokeStyle=color;ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.stroke();}

// characters/jackson.js — source of truth.
function shoot(){if(isAva()){let count=tier>=4?3:tier>=3?2:1;if(!nearest(p,new Set(),300))return false;for(let i=0;i<count;i++)pendingShots.push({delay:i*.16});return true;}let target=nearest(p,new Set(),255);if(!target)return false;let dx=target.x-p.x,dy=target.y-p.y,d=Math.hypot(dx,dy)||1;let hand={x:p.x+dx/d*19,y:p.y-4+dy/d*12};balls.push({x:hand.x,y:hand.y,px:hand.x,py:hand.y,vx:dx/d*420,vy:dy/d*420,r:8,damage:26,main:true,hit:new Set(),maxHits:tier>=1?2:1,life:3,split:false,spin:0});p.throwT=.2;return true;}

function splitBall(b,e){let count=tier>=3?3:2,used=new Set([e.id]);for(let i=0;i<count;i++){let target=nearest(e,used,360),a=target?Math.atan2(target.y-e.y,target.x-e.x):Math.atan2(b.vy,b.vx)+(i-(count-1)/2)*.7;if(target)used.add(target.id);let dx=Math.cos(a),dy=Math.sin(a);balls.push({x:e.x+dx*(e.r+7),y:e.y+dy*(e.r+7),px:e.x,py:e.y,vx:dx*440,vy:dy*440,r:5.8,damage:26*(tier>=4?.75:.5),main:false,hit:new Set([e.id]),hitsMade:0,maxHits:tier>=5?3:1,life:2.8,split:true,spin:0});}pop(e.x,e.y,'#ffe4a0',10);}

function ballArt(x,y,r,angle=0,small=false){ctx.save();ctx.translate(x,y);ctx.rotate(angle);ellipse(1,3,r*.75,r*.48,'#203b3544');ellipse(0,0,r,r*.59,small?'#ffe4a0':'#fff3d6');line([[-r*.57,-r*.42],[-r*.75,0],[-r*.57,r*.42]],'#c5413c',r*.19);line([[r*.57,-r*.42],[r*.75,0],[r*.57,r*.42]],'#c5413c',r*.19);line([[-r*.22,0],[r*.22,0]],'#a08b68',1);ctx.restore();}

function drawJacksonSprite(ctx,x,y,s,type){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const ink='#304a43',fur='#9aa9ab',cream='#e2dfcf';function fill(path,color,stroke=true){ctx.fillStyle=color;ctx.fill(path);if(stroke){ctx.strokeStyle=ink;ctx.lineWidth=.65;ctx.stroke(path);}}function oval(x,y,rx,ry,color,stroke=true){let p=new Path2D();p.ellipse(x,y,rx,ry,0,0,Math.PI*2);fill(p,color,stroke);}function line(pts,color,w){ctx.strokeStyle=color;ctx.lineWidth=w;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();}
oval(0,19,12,3,'#1b412b55',false);ctx.strokeStyle='#7b8d92';ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(6,10);if(type===0)ctx.bezierCurveTo(20,23,24,5,17,4);else if(type===1)ctx.bezierCurveTo(25,19,24,-1,17,0);else ctx.bezierCurveTo(22,22,27,11,24,5);ctx.stroke();ctx.strokeStyle=cream;ctx.lineWidth=3.4;ctx.beginPath();if(type===0){ctx.moveTo(17,4);ctx.bezierCurveTo(14,3,13,6,15,8);}else if(type===1){ctx.moveTo(17,0);ctx.bezierCurveTo(14,0,14,3,16,4);}else{ctx.moveTo(24,5);ctx.quadraticCurveTo(23,2,20,3);}ctx.stroke();
let body=new Path2D();body.moveTo(-10,-6);body.quadraticCurveTo(0,-11,10,-6);body.lineTo(7,14);body.quadraticCurveTo(0,18,-7,14);body.closePath();fill(body,'#147f5e');ctx.save();ctx.clip(body);ctx.fillStyle='#c9483f';ctx.fillRect(-13,-4,26,4.5);ctx.fillRect(-13,4.5,26,4.5);ctx.fillRect(-13,13,26,4);ctx.restore();line([[-5,-7],[0,-4],[5,-7]],'#f0e9d3',1.1);
let hy=-13;for(let side of [-1,1]){let ear=new Path2D();ear.moveTo(side*3,hy-3);ear.lineTo(side*8,hy-8.6);ear.quadraticCurveTo(side*10,hy-5,side*6.5,hy-.6);ear.closePath();fill(ear,fur);let inner=new Path2D();inner.moveTo(side*4.7,hy-4);inner.lineTo(side*7,hy-6.9);inner.lineTo(side*7,hy-3);inner.closePath();fill(inner,'#c69696',false);}
oval(0,hy,7,6.5,fur);oval(0,hy+3,4.8,2.8,cream);oval(-2.5,hy,1.05,1.5,'#e8eee4',false);oval(2.5,hy,1.05,1.5,'#e8eee4',false);oval(-2.4,hy,.55,1.1,'#2e7586',false);oval(2.4,hy,.55,1.1,'#2e7586',false);oval(0,hy+3,1,.7,'#b07875',false);line([[-6.6,hy],[-5.1,hy+1]],'#526a70',.75);line([[6.6,hy],[5.1,hy+1]],'#526a70',.75);
// Short sides, a raised side part and asymmetric swept fringe, not a flat cap.
let h=new Path2D();if(type===0){h.moveTo(-6.8,hy-1.7);h.quadraticCurveTo(-7.2,hy-7,-2.8,hy-7.4);h.quadraticCurveTo(2.4,hy-8.2,6.6,hy-5.4);h.quadraticCurveTo(2.2,hy-5.5,-1.6,hy-1.7);h.lineTo(-1.0,hy-4.1);h.quadraticCurveTo(-4,hy-2.2,-6.8,hy-1.7);}else if(type===1){h.moveTo(-6.9,hy-2.7);h.quadraticCurveTo(-6.5,hy-7.2,-2,hy-7.2);h.quadraticCurveTo(2.8,hy-8.6,6.8,hy-4.4);h.quadraticCurveTo(2.2,hy-4.6,-.9,hy-.7);h.lineTo(-1.1,hy-3.3);h.quadraticCurveTo(-4.6,hy-2.2,-6.9,hy-2.7);}else{h.moveTo(-6.8,hy-1.8);h.quadraticCurveTo(-7.1,hy-6.8,-2.1,hy-7.3);h.quadraticCurveTo(2.4,hy-7.9,6.7,hy-4.4);h.quadraticCurveTo(1.5,hy-4,-2.7,hy-.5);h.lineTo(-1.8,hy-3.2);h.quadraticCurveTo(-4.5,hy-2,-6.8,hy-1.8);}h.closePath();fill(h,'#765139');ctx.strokeStyle='#aa7e55';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(-5.7,hy-4.8);ctx.quadraticCurveTo(-1.1,hy-7.1,3.8,hy-5.7);ctx.stroke();ctx.strokeStyle='#936949';ctx.beginPath();ctx.moveTo(-4.8,hy-3.7);ctx.quadraticCurveTo(-1.0,hy-5.7,2.5,hy-5.2);ctx.stroke();
// Two detached paws, with open space separating them from the jersey.
let rightY=1-(p?.throwT>0?Math.sin(p.throwT/.2*Math.PI)*5:0);oval(-14,5,3.5,4,cream);oval(14,rightY,3.5,4,cream);line([[-15.1,6],[-13.4,6]],'#abb3a5',.55);line([[12.9,rightY+1],[14.6,rightY+1]],'#abb3a5',.55);
// One small rugby ball beside the throwing hand; hands carry and release it.
ctx.save();if(p?.throwT>0)ctx.globalAlpha=0;ctx.translate(17,rightY-3);ctx.rotate(-.45);oval(0,0,3.8,5.6,'#f5eacb');line([[-3,-2.5],[3,-2.5]],'#bf493e',1);line([[-3,2.5],[3,2.5]],'#bf493e',1);line([[0,-1],[0,1]],'#9c8966',.55);ctx.restore();ctx.restore();}

function dodgeImpact(e){let damage=D(5)?26:D(2)?18:10;damageEnemy(e,damage,p.actionDir.x,p.actionDir.y,false,'dodge');radialEffect(e.x,e.y,17,'#e3d5a1');if(D(3)){e.stunUntil=time+(e.kind==='boss'?.05:e.kind==='heavy'?.12:.3);}if(D(3)){let m=e.kind==='boss'?.1:e.kind==='heavy'?(D(5)?.65:.25):1;e.kx+=p.actionDir.x*180*m;e.ky+=p.actionDir.y*180*m;}}

function chargeImpact(e){damageEnemy(e,S(2)?85:65,p.actionDir.x,p.actionDir.y,true,'special');if(S(4))e.stunUntil=time+(e.kind==='boss'?.12:.4);}

CHARACTERS.jackson={"name":"Jackson","hp":100,"speed":155,"damage":26,"rate":0.82,"dodgeSpeed":380,"dodgeTime":0.24,"specialCD":7};

PROFILES.jackson={"role":"RUGBY STRIKER","tag":"Quick feet. Big hits.","attack":"Ball Toss","attackDesc":"Automatic throws · bouncing upgrades","special":"Shoulder Charge","specialDesc":"65 damage · 7s cooldown","dodge":"Impact Dodge","dodgeDesc":"Short dash · 10 damage · 1.65s"};

SPECIALS.jackson=[["Driving Charge","Charge travels 20% farther."],["Heavy Shoulder","Charge damage 65 → 85."],["Broad Shoulders","Wider charge contact catches more enemies."],["Staggering Run","Charge briefly staggers struck enemies; bosses resist."],["Break the Line","Finish with a visible forward impact for 30 extra damage."]];

DODGES.jackson=[["Long Step","Impact dodge travels 30% farther."],["Impact Step","Dodge damage 10 → 18, plus a longer safe window."],["Shoulder Aside","Contact briefly stuns ordinary enemies and pushes harder. Bosses resist."],["Ready Feet","Dodge cooldown 1.65 → 1.05 seconds."],["Driving Step","Dodge hits deal 26 damage and push heavies farther."]];

STAT_NAMES.jackson=["Tough Kit","Quick Feet","Fast Pass","Safe Hands","Hard Hitter"];

function jacksonCharge(){if(state!=='playing'||p.action||p.chargeCD>0)return;p.action='charge';p.actionT=0;p.chargeCD=specialCooldown();p.inv=.9;p.hitIds.clear();let t=nearest(p,new Set(),450),d=Math.hypot(stick.x,stick.y);if(d>.15)p.actionDir={x:stick.x/d,y:stick.y/d};else if(t){let l=dist(p,t)||1;p.actionDir={x:(t.x-p.x)/l,y:(t.y-p.y)/l};}else p.actionDir={...p.dir};p.dir={...p.actionDir};}



// ui/menu.js — source of truth.
function selectCharacter(name){if(!CHARACTERS[name])return;selected=name;let st=stats(),pr=PROFILES[name];$('charName').textContent=st.name.toUpperCase();$('tagline').textContent=pr.tag;$('role').textContent=pr.role;$('portrait').src=PORTRAITS[name];$('ambient').style.backgroundImage='url('+PORTRAITS[name]+')';$('portrait').alt=st.name+' cat character artwork';$('profile').innerHTML='<div><span>ATTACK</span><b>'+pr.attack+'</b><small>'+pr.attackDesc+'</small></div><div><span>SPECIAL</span><b>'+pr.special+'</b><small>'+pr.specialDesc+'</small></div><div><span>DODGE</span><b>'+pr.dodge+'</b><small>'+pr.dodgeDesc+'</small></div>';$('stats').innerHTML='<div><span>HEALTH</span><b>'+st.hp+'</b></div><div><span>SPEED</span><b>'+st.speed+'</b></div><div><span>'+(isJodie()?'CLAW HIT':'HIT')+'</span><b>'+(isJodie()?'10 × 2':st.damage)+'</b></div><div><span>ATTACK</span><b>'+st.rate.toFixed(2)+'s</b></div>';for(let [key,id] of [['ava','pickAva'],['jackson','pickJackson'],['stef','pickStef'],['jodie','pickJodie'],['evie','pickEvie'],['zak','pickZak']]){$(id).className=name===key?'selected':'';$(id).setAttribute?.('aria-pressed',name===key?'true':'false');}}

function selectArena(key){if(!ARENAS[key]||state==='playing')return;arenaKey=key;$('pickRugby').className=key==='rugby'?'active':'';$('pickChasewater').className=key==='chasewater'?'active':'';$('start').textContent='EXPLORE BURNTWOOD';$('pickSankeys').className=key==='sankeys'?'active':'';$('pickQuarry').className=key==='quarry'?'active':'';}

function formatClock(seconds){let n=Math.max(0,Math.ceil(seconds));return Math.floor(n/60)+':'+String(n%60).padStart(2,'0');}

function actionButton(id,ready,label){let el=$(id),was=el.dataset?.ready;el.disabled=!ready;el.classList?.toggle('cooling',!ready);if(el.dataset)el.dataset.ready=ready?'1':'0';el.setAttribute?.('aria-disabled',ready?'false':'true');if(ready&&was==='0'){el.classList?.remove('readyFlash');void el.offsetWidth;el.classList?.add('readyFlash');}$(id==='charge'?'chargeSmall':'dodgeSmall').textContent=label;}

function updateHud(){$('hpFill').style.width=clamp(p.hp/stats().hp*100,0,100)+'%';$('hpText').textContent=Math.ceil(Math.max(0,p.hp))+' / '+stats().hp;$('timer').textContent=bossSpawned?arena().bossShort+'!':arena().bossShort+' · '+formatClock(BOSS_TIME-time);$('level').textContent='LV '+run.level+' · '+(run.stage+1)+'/3';$('build').textContent='W '+(isStef()||isEvie()?tier+1:tier)+'/5 · S '+run.special+'/5 · D '+run.dodge+'/5 · ST '+run.stat.size+'/5';$('xpFill').style.width=(run.stagePicks>=8?100:clamp(run.earned/nextXP()*100,0,100))+'%';let recallReady=!isEvie()||ducks.some(d=>d.life>0&&(d.smashes>0||d.eggs>0));actionButton('charge',p.chargeCD<=0&&recallReady,p.chargeCD>0?Math.ceil(p.chargeCD)+'s':recallReady?'READY':'NO DUCKS');actionButton('dodge',p.dodgeCD<=0,p.dodgeCD>0?p.dodgeCD.toFixed(1)+'s':'READY');$('perkHud').textContent=run.perk?'BOSS PERK · '+PERKS[run.perk].name.toUpperCase():'';$('perkHud').style.color=run.perk?PERKS[run.perk].color:'';if(boss){$('bossHud').firstChild.textContent=boss.quarry?'BIG BARRY · THE BADGER':boss.market?'THE TROLLEY KING':boss.chase?'CHASEWATER NIGHT OWL':'BRUCE · THE NETTED STAG';$('bossHud').style.display='block';$('bossFill').style.width=clamp(boss.hp/boss.maxHp*100,0,100)+'%';}}

function returnToMenu(){$('hubMenu').style.display='none';$('hubMap').style.display='none';$('shrineUse').style.display='none';$('blessingHud').textContent='';state='menu';$('hubShop').style.display='none';$('panel').style.display='none';$('menu').style.display='grid';$('controls').style.display=$('hud').style.display=$('bossHud').style.display='none';selectCharacter(selected);}

// characters/ava.js — source of truth.
function fireStar(){let target=nearest(p,new Set(),300);if(!target)return;let d=dist(p,target)||1;balls.push({star:true,x:p.x,y:p.y-4,px:p.x,py:p.y-4,vx:(target.x-p.x)/d*360,vy:(target.y-p.y)/d*360,r:6,damage:18,life:4,mode:'out',hit:new Set(),spin:0});p.throwT=.2;}

function updateStar(b,dt){b.life-=dt;b.spin+=dt*10;b.px=b.x;b.py=b.y;
if(b.mode==='stuck'){b.wait-=dt;if(b.host&&b.host.hp>0){b.x=b.host.x+b.ox;b.y=b.host.y+b.oy;b.host.slowUntil=Math.max(b.host.slowUntil||0,time+.12);if((b.host.nextMagicTick||0)<=time){b.host.nextMagicTick=time+.5;damageEnemy(b.host,1.5,0,0);}}if(b.wait<=0){if(tier>=2){b.mode='return';b.hit=new Set();b.life=5;}else b.life=0;}return;}
if(b.mode==='return'){let d=dist(b,p);if(d<18){if(tier>=5&&b.origin)glitterBurst(b.origin.x,b.origin.y,b.damage*.5);b.life=0;return;}b.vx=(p.x-b.x)/d*470;b.vy=(p.y-b.y)/d*470;}
b.x+=b.vx*dt;b.y+=b.vy*dt;
for(let e of enemies){if(e.hp<=0||b.hit.has(e.id))continue;let sx=b.x-b.px,sy=b.y-b.py,l=sx*sx+sy*sy,t=l?clamp(((e.x-b.px)*sx+(e.y-b.py)*sy)/l,0,1):0;if(Math.hypot(e.x-b.px-sx*t,e.y-b.py-sy*t)>e.r+b.r)continue;b.hit.add(e.id);damageEnemy(e,b.damage,0,0);if(b.mode==='out'){if(tier>=1){b.mode='stuck';b.wait=2;b.life=3;b.host=e;b.ox=clamp(b.x-e.x,-e.r*.6,e.r*.6);b.oy=clamp(b.y-e.y,-e.r*.6,e.r*.6);b.x=e.x+b.ox;b.y=e.y+b.oy;b.origin={x:e.x,y:e.y};e.slowUntil=time+2;}else b.life=0;break;}}
}

function glitterBurst(x,y,damage){pop(x,y,'#f8bde7',18);fx.push({x,y,vx:0,vy:0,r:55,life:.24,max:.24,color:'#edabdd',ring:true});for(let e of enemies)if(e.hp>0&&Math.hypot(e.x-x,e.y-y)<=55+e.r){e.slowUntil=Math.max(e.slowUntil||0,time+1.5);damageEnemy(e,damage,0,0);}}

function starArt(x,y,r,angle=0){ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.beginPath();for(let i=0;i<10;i++){let a=-Math.PI/2+i*Math.PI/5,v=i%2?r*.45:r;i?ctx.lineTo(Math.cos(a)*v,Math.sin(a)*v):ctx.moveTo(Math.cos(a)*v,Math.sin(a)*v);}ctx.closePath();ctx.fillStyle='#ffe6a0';ctx.fill();ctx.strokeStyle='#98714d';ctx.lineWidth=.7;ctx.stroke();ctx.restore();}

function drawAvaSprite(ctx,x,y,s,type){ctx.save();ctx.translate(x,y);ctx.scale(s*.86,s*.86);const ink=type===0?'#6b5052':type===1?'#775047':'#4d465b',fur=type===0?'#e6d6bd':type===1?'#cf997d':'#a699b5',cream=type===0?'#fff0d9':type===1?'#f8ddc8':'#e8dfe9';function fill(path,color,stroke=true){ctx.fillStyle=color;ctx.fill(path);if(stroke){ctx.strokeStyle=ink;ctx.lineWidth=.65;ctx.stroke(path);}}function oval(x,y,rx,ry,color,stroke=true){let p=new Path2D();p.ellipse(x,y,rx,ry,0,0,Math.PI*2);fill(p,color,stroke);}function line(pts,color,w){ctx.strokeStyle=color;ctx.lineWidth=w;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();}
oval(0,19,12,3,'#1b412b55',false);ctx.strokeStyle=type===0?'#ceb99b':type===1?'#b97960':'#867995';ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(6,10);ctx.bezierCurveTo(20,21,25,10,22,5);ctx.stroke();ctx.strokeStyle=cream;ctx.lineWidth=3.4;ctx.beginPath();ctx.moveTo(22,5);ctx.quadraticCurveTo(21,2,18,3);ctx.stroke();
let body=new Path2D();body.moveTo(-7,-6);body.quadraticCurveTo(0,-9.4,7,-6);body.quadraticCurveTo(5.1,1,5.6,5);body.lineTo(8,14);body.quadraticCurveTo(0,18,-8,14);body.lineTo(-5.6,5);body.quadraticCurveTo(-5.1,1,-7,-6);body.closePath();fill(body,type===0?'#bc7799':type===1?'#9b78b8':'#608caa');ctx.save();ctx.clip(body);ctx.fillStyle=type===0?'#dfadbf':type===1?'#c6a5da':'#9bbbcf';ctx.fillRect(-13,7,26,10);ctx.fillStyle='#4f4765';ctx.fillRect(-13,3.7,26,2.8);ctx.restore();line([[-5,-7],[0,-4],[5,-7]],'#f0e9d3',1.1);
let hy=-13;for(let side of [-1,1]){let ear=new Path2D();ear.moveTo(side*3,hy-3);ear.lineTo(side*8,hy-8.6);ear.quadraticCurveTo(side*10,hy-5,side*6.5,hy-.6);ear.closePath();fill(ear,fur);let inner=new Path2D();inner.moveTo(side*4.7,hy-4);inner.lineTo(side*7,hy-6.9);inner.lineTo(side*7,hy-3);inner.closePath();fill(inner,'#c69696',false);}
oval(0,hy,7,6.5,fur);oval(0,hy+3,4.8,2.8,cream);oval(-2.5,hy,1.05,1.5,'#e8eee4',false);oval(2.5,hy,1.05,1.5,'#e8eee4',false);oval(-2.4,hy,.55,1.1,'#2e7586',false);oval(2.4,hy,.55,1.1,'#2e7586',false);oval(0,hy+3,1,.7,'#b07875',false);line([[-6.6,hy],[-5.1,hy+1]],'#526a70',.75);line([[6.6,hy],[5.1,hy+1]],'#526a70',.75);
// Short sides, a raised side part and asymmetric swept fringe, not a flat cap.
// Simple feminine hairstyles, kept clear of the short cat ears.
// Same soft bob on every option, gently framing the cheeks.
const hairColor=type===0?'#926244':type===1?'#714734':'#655064';let h=new Path2D();h.moveTo(-6.8,hy-2);h.quadraticCurveTo(-7.1,hy-7,-1.2,hy-7.3);h.quadraticCurveTo(4,hy-7.6,6.8,hy-3);h.quadraticCurveTo(2.2,hy-5,-1.8,hy-.4);h.lineTo(-1,hy-3);h.quadraticCurveTo(-4,hy-1.9,-6.8,hy-2);h.closePath();fill(h,hairColor);
for(let side of [-1,1]){let lock=new Path2D();lock.moveTo(side*6.1,hy-4);lock.bezierCurveTo(side*10.2,hy,side*9.5,hy+8.8,side*5.6,hy+8.2);lock.quadraticCurveTo(side*7.5,hy+3,side*6.1,hy-4);fill(lock,hairColor);}
line([[-5,hy-5],[-1,hy-6.1],[3,hy-5.3]],type===2?'#a58a9a':'#ba946d',.65);
// Small bow clip, readable eye shape and subtle cheek colour.
let bow=new Path2D();bow.moveTo(5,hy-4.7);bow.lineTo(3.1,hy-6.1);bow.lineTo(3.1,hy-3.2);bow.closePath();fill(bow,'#eed4df');let bow2=new Path2D();bow2.moveTo(5,hy-4.7);bow2.lineTo(7.1,hy-6.1);bow2.lineTo(7.1,hy-3.2);bow2.closePath();fill(bow2,'#eed4df');oval(5,hy-4.7,.6,.7,'#e4abc4',false);
oval(-4.4,hy+1.4,1.25,.65,type===0?'#dcb6ad':type===1?'#d48e85':'#b590b2',false);oval(4.4,hy+1.4,1.25,.65,type===0?'#dcb6ad':type===1?'#d48e85':'#b590b2',false);
// Two tiny lash marks suggest Ava without exaggerated make-up.
line([[-3.4,hy-.8],[-4.3,hy-1.7]],ink,.65);line([[-3.3,hy-.3],[-4.5,hy-.5]],ink,.6);line([[3.4,hy-.8],[4.3,hy-1.7]],ink,.65);line([[3.3,hy-.3],[4.5,hy-.5]],ink,.6);
function star(x,y,r,color){let p=new Path2D();for(let i=0;i<10;i++){let a=-Math.PI/2+i*Math.PI/5,rr=i%2?r*.46:r;let xx=x+Math.cos(a)*rr,yy=y+Math.sin(a)*rr;i?p.lineTo(xx,yy):p.moveTo(xx,yy);}p.closePath();fill(p,color);}
star(-5,5.1,2.2,'#f6db82');star(0,5.1,2.6,'#ffe8a1');star(5,5.1,2.2,'#f6db82');
// Two detached paws, with open space separating them from the jersey.
let rightY=1-(p?.throwT>0?Math.sin(p.throwT/.2*Math.PI)*5:0);oval(-12,5,3,3.5,cream);oval(12,rightY,3,3.5,cream);line([[-13.1,6],[-11.4,6]],'#abb3a5',.55);line([[10.9,rightY+1],[12.6,rightY+1]],'#abb3a5',.55);
// Held throwing star, with no arm or weapon attached to the body.
star(15,rightY-4,5,'#ffe7a0');ctx.restore();}

function glitterShower(mult=1){let damage=(S(2)?10:6)*mult,duration=S(1)?4.5:3;glitterTime=.8;for(let e of enemies){if(e.hp<=0)continue;e.slowUntil=Math.max(e.slowUntil||0,time+duration);if(S(3))e.glitterUntil=time+3;damageEnemy(e,damage,0,0,false,'special');}}

function meteorTarget(){let best=null,score=-1;for(let e of enemies){if(e.hp<=0||dist(p,e)>360)continue;let n=e.kind==='heavy'||e.kind==='boss'?1:0;for(let other of enemies)if(other.hp>0&&dist(e,other)<100)n++;if(n>score){best=e;score=n;}}return best?{x:best.x,y:best.y}:{x:p.x,y:p.y-65};}

function queueMeteor(){let spot=meteorTarget();scheduled.push({kind:'meteor',x:spot.x,y:spot.y,r:150,wait:.75,fall:.75});}

function meteorImpact(task){radialEffect(task.x,task.y,task.r,'#f7c9ef');radialEffect(task.x,task.y,task.r*.65,'#f7d780');pop(task.x,task.y,'#f8d7ec',35);shake=Math.max(shake,4);glitterTime=.8;for(let e of enemies){let d=Math.hypot(e.x-task.x,e.y-task.y);if(e.hp<=0||d>task.r+e.r)continue;damageEnemy(e,80*(.6+.4*(1-clamp(d/task.r,0,1))),0,0,true,'special');e.slowUntil=Math.max(e.slowUntil||0,time+2);}}

function drawMeteorGround(){for(let t of scheduled)if(t.kind==='meteor'&&!t.done){ctx.fillStyle='#dca4e91b';ctx.strokeStyle='#efc7ee88';ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(t.x,t.y,t.r,0,TAU);ctx.fill();ctx.stroke();ctx.beginPath();ctx.arc(t.x,t.y,22+(1-clamp(t.wait/t.fall,0,1))*18,0,TAU);ctx.stroke();}}

CHARACTERS.ava={"name":"Ava","hp":85,"speed":165,"damage":18,"rate":0.95,"dodgeSpeed":620,"dodgeTime":0.28,"specialCD":9};

PROFILES.ava={"role":"STAR MAGE","tag":"Small paws. Big sparkle.","attack":"Star Toss","attackDesc":"Automatic stars · sticky magic upgrades","special":"Glitter Shower","specialDesc":"6 damage to all · 30% slow · 9s","dodge":"Long Dodge","dodgeDesc":"Long dash · no damage · 1.65s"};

SPECIALS.ava=[["Clinging Glitter","Shower slow lasts 4.5 seconds."],["Brighter Shower","Shower damage 6 → 10."],["Sparkling Sting","Shower glitter deals 2 damage/sec for 3 seconds."],["Quick Sparkle","Shower cooldown 9 → 7 seconds."],["Glitterstorm","A huge glitter meteor hits a marked 150-radius area after 0.75s, dealing 48–80 damage."]];

DODGES.ava=[["Farther Sparkle","Dash travels 15% farther."],["Glitter Trail","Leave a short trail that slows crossing enemies by 30%."],["Safe Sparkle","Gain 0.12 seconds more dodge protection."],["Quick Escape","Dodge cooldown 1.65 → 1.25 seconds."],["Sparkle Arrival","Landing creates a small slowing glitter burst."]];

STAT_NAMES.ava=["Magic Heart","Light Paws","Quick Casting","Star Collector","Bright Magic"];
const avaNames=['Sticky Stars','Star Recall','Double Star','Triple Star','Glitter Pop'];
const avaText=['Stars stick for 2 seconds, slowing enemies by 30% and dealing 3 magic damage each second. Slow and damage-over-time do not stack.','After 2 seconds, stars fly back to Ava, damaging each enemy they pass through once.','Throw TWO stars one after another. Both retain sticky magic and recall.','Throw THREE stars in quick succession.','When each star reaches Ava, its original impact point bursts with glitter: 50% star damage in a small area.'];
const avaBuild=['Star Toss','Sticky stars · 30% slow','Sticky stars · recall','2 stars · sticky · recall','3 stars · sticky · recall','3 stars · recall · glitter bursts'];

function avaSpecial(){if(state!=='playing'||p.action||p.chargeCD>0)return;p.chargeCD=specialCooldown();glitterShower();if(S(5))queueMeteor();pop(p.x,p.y,'#ffd4ee',25);}

// characters/stef.js — source of truth.
function hookTiming(){if(p.frenzy>0)return {wind:.05,hit:.20,recover:.06};let h=tier<4?{wind:.06,hit:.11,recover:.16}:{wind:.13,hit:.30,recover:.17};let m=normalRate();return {wind:h.wind*m,hit:h.hit*m,recover:h.recover*m};}

function startSweep(){if(p.swing)return false;let t=nearest(p,new Set(),hookReach()+55);if(!t||dist(p,t)>hookReach()+t.r+9+t.speed*.2)return false;p.aim=Math.atan2(t.y-p.y,t.x-p.x);let h=hookTiming();p.swing={t:0,aim:p.aim,timing:h,hit:new Set(),prev:0,special:p.frenzy>0,delay:p.frenzy>0?.15:tier>=4?.28:0,duration:h.wind+h.hit+h.recover+(p.frenzy>0?.15:tier>=4?.28:0)};return true;}

function byOrder(){if(state!=='playing'||p.action||p.chargeCD>0)return;p.chargeCD=specialCooldown();p.frenzy=S(1)?2.6:2;p.frenzyDuration=p.frenzy;p.frenzyWait=.18;p.swing=null;p.attack=2;float(p.x,p.y-42,'BY ORDER!','#f4d28d');}

function push(){if(state!=='playing'||p.action||p.dodgeCD>0)return;p.action='push';p.actionT=0;p.actionDir={x:0,y:0};p.swing=null;p.frenzy=0;p.attack=Math.max(p.attack,.25);p.dodgeCD=dodgeCooldown();p.inv=D(3)?.65:.48;p.pushFired=false;}

function angularContact(e,start,end,offset,radius){let dx=e.x-p.x,dy=e.y-p.y,d=Math.hypot(dx,dy);if(d>radius+e.r+9)return false;let angle=Math.atan2(dy,dx),a=start+offset,b=end+offset,pad=Math.asin(Math.min(1,(e.r+9)/Math.max(1,d)));for(let i=-2;i<=2;i++){let q=angle+i*TAU;if(q>=a-pad&&q<=b+pad)return true;}return false;}

function hookAngle(s,hand,u){return !s.special&&(tier<4||hand===0)?s.aim:s.aim+(hand?-1:1)*(1.10-2.20*u);}

function updateStef(dt){if(!isStef())return;if(p.frenzy>0){p.frenzy=Math.max(0,p.frenzy-dt);if(p.frenzy===0&&S(5))forwardFinisher(45,hookReach()+15,'#efd38d');p.frenzyWait-=dt;if(p.frenzyWait<=0&&!p.swing){startSweep();p.frenzyWait=.04;}}
if(p.action==='push'){if(p.actionT>=.15&&!p.pushFired){p.pushFired=true;fx.push({x:p.x,y:p.y,vx:0,vy:0,r:pushRadius(),life:.4,max:.4,color:'#85cbf1',ring:true});for(let e of enemies){if(e.hp<=0||dist(p,e)>pushRadius()+e.r)continue;let d=dist(p,e)||1,m=e.kind==='boss'?.02:e.kind==='heavy'?.24:e.kind==='charger'?.6:1;e.kx+=(e.x-p.x)/d*600*m*(D(2)?1.25:1);e.ky+=(e.y-p.y)/d*600*m*(D(2)?1.25:1);e.flash=.08;if(D(5))e.stunUntil=time+(e.kind==='boss'?.06:e.kind==='heavy'?.15:.45);if(e.kind!=='boss'){e.stagger=Math.max(e.stagger,.22*m);if(e.mode==='rush'){e.mode='recover';e.timer=.45;}}pop(e.x,e.y,'#a9d7e8',4);}}return;}
if(!p.swing){let t=nearest(p,new Set(),hookReach()+110);if(t)p.aim=Math.atan2(t.y-p.y,t.x-p.x);return;}
let s=p.swing,previous=s.t;s.t+=dt;for(let hand=0;hand<(s.special||tier>=4?2:1);hand++){let offset=hand*s.delay,from=previous-offset-s.timing.wind,to=s.t-offset-s.timing.wind;if(to<0||from>s.timing.hit)continue;let u0=clamp(from/s.timing.hit,0,1),u1=clamp(to/s.timing.hit,0,1),a0=hookAngle(s,hand,u0),a1=hookAngle(s,hand,u1);for(let e of enemies){let key=e.id+':'+hand;if(e.hp<=0||s.hit.has(key)||!angularContact(e,Math.min(a0,a1),Math.max(a0,a1),0,hookReach()))continue;s.hit.add(key);let d=dist(p,e)||1,dx=(e.x-p.x)/d,dy=(e.y-p.y)/d;damageEnemy(e,s.special&&S(3)?30:!s.special&&tier>=4&&hand===1?36:!s.special?16:23,dx,dy,false,s.special?'special':'weapon');let resist=e.kind==='heavy'||e.kind==='boss'?.25:1;e.kx+=dx*85*resist;e.ky+=dy*85*resist;if((s.special||tier>=3)&&time>=(e.stunImmuneUntil||0)){let duration=e.kind==='boss'?.12:.38;e.stunUntil=time+duration;e.stunImmuneUntil=time+duration+.9;pop(e.x,e.y,'#f8d685',5);}}}if(s.t>=s.duration)p.swing=null;
}

function stefHands(){if(p.frenzy>p.frenzyDuration-.18)return [{x:6,y:-21,moving:false,size:5,a:0},{x:-22,y:2,moving:false,size:3.8,a:0}];if(p.action==='push'){let u=clamp(p.actionT/.44,0,1),extension=Math.sin(Math.PI*u)*30;return [0,1].map(i=>({x:(i?-1:1)*(22+extension),y:-6,moving:true,push:true,size:6.8,a:0}));}let s=p.swing;return [0,1].map(i=>{if(!s||(i&&tier<4&&!s.special))return {x:i?-22:22,y:i?5:1,moving:false,size:3.8,a:0};let t=s.t-i*s.delay,h=s.timing;if(t<0)return {x:-22,y:5,moving:false,size:3.8,a:0};let u=clamp((t-h.wind)/h.hit,0,1),active=t>=h.wind&&t<=h.wind+h.hit,a=hookAngle(s,i,u),r=hookReach()*(!s.special&&(tier<4||i===0)?.3+.7*Math.sin(u*Math.PI):.88+.12*Math.sin(u*Math.PI));let phase=t<h.wind?clamp(t/h.wind,0,1):t>h.wind+h.hit?1-clamp((t-h.wind-h.hit)/h.recover,0,1):1;let nx=i?-22:22,ny=i?5:1;return {x:lerp(nx,Math.cos(a)*r,phase),y:lerp(ny,Math.sin(a)*r,phase),moving:active,size:lerp(3.8,s.special&&S(2)?10:8.5,phase),a,hand:i};});}

function drawStefGuide(){if(!isStef()||!p)return;let a=p.swing?.aim??p.aim??Math.atan2(p.dir.y,p.dir.x);ctx.strokeStyle='#eee2b63a';ctx.lineWidth=1.2;ctx.beginPath();ctx.arc(p.x,p.y,hookReach(),a-1.1,a+1.1);ctx.stroke();if(p.action==='push'){ctx.strokeStyle='#81c6ed99';ctx.lineWidth=1.4;ctx.beginPath();ctx.arc(p.x,p.y,pushRadius(),0,TAU);ctx.stroke();}}

function drawStef(){ctx.save();ctx.translate(p.x,p.y+Math.sin(p.walk*2)*.5);if(p.inv>0&&Math.floor(p.inv*22)%2===0)ctx.globalAlpha=.65;drawStefBody(ctx,0,0,1.18,0);for(let h of stefHands()){if(h.moving&&!h.push){ctx.strokeStyle='#f4d28d88';ctx.lineWidth=2;ctx.beginPath();let r=Math.hypot(h.x,h.y);ctx.arc(0,0,r,h.a-.18,h.a+.18);ctx.stroke();}if(h.push){ctx.strokeStyle='#8bcdf180';ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(h.x+(h.x>0?-9:9),h.y-4);ctx.lineTo(h.x+(h.x>0?-17:17),h.y-4);ctx.stroke();}ctx.fillStyle='#e2dfcf';ctx.strokeStyle='#304a43';ctx.lineWidth=.8;ctx.beginPath();ctx.ellipse(h.x,h.y,h.size,h.size*1.05,h.a,0,TAU);ctx.fill();ctx.stroke();}ctx.restore();}

function drawStefBody(ctx,x,y,s,type){ctx.save();ctx.translate(x,y);ctx.scale(s,s);const ink='#304a43',fur='#9aa9ab',cream='#e2dfcf';function fill(path,color,stroke=true){ctx.fillStyle=color;ctx.fill(path);if(stroke){ctx.strokeStyle=ink;ctx.lineWidth=.65;ctx.stroke(path);}}function oval(x,y,rx,ry,color,stroke=true){let p=new Path2D();p.ellipse(x,y,rx,ry,0,0,Math.PI*2);fill(p,color,stroke);}function line(pts,color,w){ctx.strokeStyle=color;ctx.lineWidth=w;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();pts.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.stroke();}
oval(0,19,11,3,'#1b412b55',false);ctx.strokeStyle='#7b8d92';ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(6,10);if(type===0)ctx.bezierCurveTo(20,23,24,5,17,4);else if(type===1)ctx.bezierCurveTo(25,19,24,-1,17,0);else ctx.bezierCurveTo(22,22,27,11,24,5);ctx.stroke();ctx.strokeStyle=cream;ctx.lineWidth=3.4;ctx.beginPath();if(type===0){ctx.moveTo(17,4);ctx.bezierCurveTo(14,3,13,6,15,8);}else if(type===1){ctx.moveTo(17,0);ctx.bezierCurveTo(14,0,14,3,16,4);}else{ctx.moveTo(24,5);ctx.quadraticCurveTo(23,2,20,3);}ctx.stroke();
const coats=['#3f4648','#5c4d40','#334a5b'],vests=['#7b817a','#a48b67','#817c6e'];
oval(0,12,5,4,cream);let body=new Path2D('M -7 -7 Q 0 -10 7 -7 L 7 22 L 3 21 L 2 8 L -2 8 L -3 21 L -7 22 Z');fill(body,coats[type]);fill(new Path2D('M -3 -7 L 0 -4 L 3 -7 L 2 11 L -2 11 Z'),vests[type]);fill(new Path2D('M -3 -7 L 0 -4 L 3 -7 L 2 -1 L -2 -1 Z'),'#e8e4d6');fill(new Path2D('M 0 -4 L -1 -1 L 0 5 L 1 -1 Z'),'#473a37');fill(new Path2D('M -7 -7 L -3 -8 L 0 0 L -4 -2 Z'),type===1?'#7c6b57':'#687473');fill(new Path2D('M 7 -7 L 3 -8 L 0 0 L 4 -2 Z'),type===1?'#7c6b57':'#687473');line([[-6,10],[-3,11]],'#9d9f8d',.6);line([[3,11],[6,10]],'#9d9f8d',.6);oval(1.4,6,.4,.4,'#d0bb85',false);oval(1.4,9,.4,.4,'#d0bb85',false);if(type===2){ctx.strokeStyle='#cfb574';ctx.lineWidth=.55;ctx.beginPath();ctx.moveTo(2,6);ctx.quadraticCurveTo(6,10,6,6);ctx.stroke();}
let hy=-13;for(let side of [-1,1]){let ear=new Path2D();ear.moveTo(side*3,hy-3);ear.lineTo(side*8,hy-8.6);ear.quadraticCurveTo(side*10,hy-5,side*6.5,hy-.6);ear.closePath();fill(ear,fur);let inner=new Path2D();inner.moveTo(side*4.7,hy-4);inner.lineTo(side*7,hy-6.9);inner.lineTo(side*7,hy-3);inner.closePath();fill(inner,'#c69696',false);}
oval(0,hy,7,6.5,fur);oval(0,hy+3,4.8,2.8,cream);oval(-2.5,hy,1.05,1.5,'#e8eee4',false);oval(2.5,hy,1.05,1.5,'#e8eee4',false);oval(-2.4,hy,.55,1.1,'#2e7586',false);oval(2.4,hy,.55,1.1,'#2e7586',false);oval(0,hy+3,1,.7,'#b07875',false);line([[-6.6,hy],[-5.1,hy+1]],'#526a70',.75);line([[6.6,hy],[5.1,hy+1]],'#526a70',.75);
line([[-6.2,hy-3],[-4.5,hy-5.2],[-1.5,hy-6]],'#765139',1.4);line([[6,hy-3],[4,hy-5]],'#765139',1.2);
const capColors=['#5d6462','#75634e','#485461'];
fill(new Path2D('M -7 -17 Q -6 -23 1 -22 Q 7 -22 8 -18 Q 2 -17 -7 -17 Z'),capColors[type]);
fill(new Path2D('M -7 -17 Q 1 -18 8 -18 L 9 -16.4 Q 3 -15.8 -7 -17 Z'),type===1?'#514739':'#384541');
line([[-4,-20],[1,-20.8],[6,-19]],type===1?'#a48d6b':'#8a9390',.5);
ctx.restore();}

CHARACTERS.stef={"name":"Stefan","hp":110,"speed":150,"damage":23,"rate":1.1,"dodgeSpeed":0,"dodgeTime":0.36,"specialCD":10};

PROFILES.stef={"role":"CROWD BRAWLER","tag":"Sharp style. Fast paws.","attack":"Left Jab","attackDesc":"Fast left jabs · heavy hook at weapon level 5","special":"By Order!","specialDesc":"2s punch flurry · 10s cooldown","dodge":"Push","dodgeDesc":"360° push · no damage · 3s"};

SPECIALS.stef=[["Long Combination","Flurry lasts 2.6 seconds."],["Long Arms","Special hooks reach 15 units farther with bigger paws."],["Heavy Combination","Flurry hits deal 30 instead of 23 damage."],["Back in Business","Flurry cooldown 10 → 8 seconds."],["Final Word","Finish with a heavy two-paw forward strike for 45 damage."]];

DODGES.stef=[["Wider Push","Push radius 82 → 100."],["Firm Hands","Push ordinary enemies 25% harder."],["Hold Your Ground","Push protection lasts 0.65 instead of 0.48 seconds."],["Quick Reset","Push cooldown 3 → 2.3 seconds."],["Clear Some Space","Push briefly stuns small enemies; bosses barely react."]];

STAT_NAMES.stef=["Old-School Toughness","Sharp Footwork","Fast Hands","Streetwise","Heavy Hands"];
const isStef=()=>selected==='stef';
const stefNames=['Long Reach','Fast Hands','Stunning Jabs','Heavy Hook'];
const oldStefText=['Your forward hook reaches farther, giving you more room to fight safely.','Quicker combinations, with a clear wind-up and a slower readable hook motion.','Hooks briefly stun enemies. Stun resistance prevents permanent stun locks; Bruce is only briefly interrupted.','Alternate right and left hooks in quick combinations, retaining extra reach, knockback and short stuns.'];
const stefBuild=['Right hook','Long-reach hook','Fast hook combinations','Hook · knockback · stun','Both paws · hook combo · stun'];
const hookReach=()=>(tier>=1?65:48)+(p?.frenzy>0&&S(2)?15:0);

const stefText=['Left jabs reach farther.','Faster straight jabs.','Jabs briefly stun enemies; bosses resist.','Add a heavy right hook for 36 damage after the left jab.'];

// arenas/chasewater.js — source of truth.
function chaseSpawn(kind,e){e.chase=true;e.kind=kind;e.attackCD=0;let spec={goose:[20,13,59],fox:[38,17,63],owl:[30,17,45],mud:[55,18,21],heavy:[110,25,27],boss:[1100,43,35]}[kind];e.hp=e.maxHp=spec[0]+(kind==='boss'?0:time*.10);e.r=spec[1];e.speed=spec[2];e.mode=kind==='owl'||kind==='boss'?'circle':'walk';e.timer=kind==='boss'?2.3:1.5+rand()*1.6;e.side=e.id%2?1:-1;e.sequence=0;e.tx=e.x;e.ty=e.y;let v=walkable(e.x,e.y,e.r);e.x=v.x;e.y=v.y;if(kind==='mud')e.x=shore(e.y)+42;if(kind==='boss'){boss=e;bossSpawned=true;float(p.x,p.y-65,'THE NIGHT OWL DESCENDS','#eddba0');}return e;}

function chaseWave(){let pt=pressureTime(),roll=rand(),kind=pt>34&&roll>.84?'heavy':pt>24&&roll<.19?'mud':pt>14&&roll<.43?'owl':pt>7&&roll>.64?'fox':'goose';spawn(kind);if(pt>10&&rand()<.38)spawn('goose');nextSpawn=stageSpawnDelay(Math.max(.6,1.05-time*.0025));}

function shootMud(e){let a=Math.atan2(p.y-e.y,p.x-e.x);enemyShots.push({x:e.x,y:e.y-7,px:e.x,py:e.y-7,vx:Math.cos(a)*125,vy:Math.sin(a)*125,r:6,life:3.6,damage:6,damageScale:e.damageScale});if(enemyShots.length>60)enemyShots.shift();pop(e.x,e.y-8,'#b8a17c',4);}

function applyChaseContact(e){if(selected==='jackson'&&p.action==='dodge'&&!p.hitIds.has(e.id)&&dist(p,e)<e.r+p.r+7){p.hitIds.add(e.id);dodgeImpact(e);}if(p.action==='charge'&&!p.hitIds.has(e.id)&&dist(p,e)<e.r+p.r+(S(3)?24:12)){p.hitIds.add(e.id);chargeImpact(e);shake=3;}if(e.hp>0&&!(e.stunUntil>time)&&e.mode!=='circle'&&e.mode!=='recover'&&dist(p,e)<p.r+e.r&&e.attackCD<=0){hurt(e.kind==='boss'?16:e.kind==='heavy'?10:e.kind==='owl'?8:e.kind==='fox'?7:4,e);e.attackCD=.85;}}

function stepChaseEnemy(e,dt){let goal=enemyGoal(e),dx=goal.x-e.x,dy=goal.y-e.y,d=Math.hypot(dx,dy)||1,mx=dx/d,my=dy/d,speed=e.speed,stunned=e.stunUntil>time;if(stunned){e.timer+=dt;let q=walkable(e.x+e.kx*dt,e.y+e.ky*dt,e.r);e.x=q.x;e.y=q.y;e.kx*=Math.exp(-dt*8);e.ky*=Math.exp(-dt*8);applyChaseContact(e);return;}
if(e.kind==='boss'){
if(e.mode==='circle'){speed=27;mx=Math.cos(e.age*.6)*.7;my=Math.sin(e.age*.5)*.4;if(e.timer<=0){let a=e.sequence++%4;if(a===1){e.mode='gustWind';e.timer=1.15;e.aim=Math.atan2(dy,dx);}else{e.mode='owlWind';e.timer=1.05;let spot=walkable(p.x,p.y,e.r);e.tx=spot.x;e.ty=spot.y;}}}
else if(e.mode==='owlWind'){speed=0;if(e.timer<=0){e.mode='owlDive';e.timer=.65;e.diveT=0;e.sx=e.x;e.sy=e.y;}}
else if(e.mode==='owlDive'){speed=0;if(!stunned){e.diveT+=dt*(e.slowUntil>time?.7:1);let u=clamp(e.diveT/.65,0,1);e.x=lerp(e.sx,e.tx,u);e.y=lerp(e.sy,e.ty,u);if(u>=1){e.mode='recover';e.timer=1.5;pop(e.x,e.y,'#ded7b1',16);}}}
else if(e.mode==='gustWind'){speed=0;if(e.timer<=0){e.mode='gust';e.timer=.4;let a=Math.atan2(dy,dx),delta=Math.atan2(Math.sin(a-e.aim),Math.cos(a-e.aim));if(d<300&&Math.abs(delta)<.9&&p.inv<=0){p.extX=(p.extX||0)+Math.cos(e.aim)*280;p.extY=(p.extY||0)+Math.sin(e.aim)*280;float(p.x,p.y-35,'WING GUST','#c9e5e5');}pop(e.x,e.y,'#b9d6db',15);}}
else if(e.mode==='summonWind'){speed=0;if(e.timer<=0){for(let side of [-1,1])spawn('owl',walkable(e.x+side*70,e.y+50,17));e.mode='recover';e.timer=1.2;}}
else{speed=0;if(e.timer<=0){e.mode='circle';e.timer=e.hp<e.maxHp*.5?1.1:1.6;}}
}else if(e.kind==='owl'){
if(e.mode==='circle'){let a=Math.atan2(dy,dx)+e.side*.9;mx=Math.cos(a);my=Math.sin(a);if(d<95)speed=0;if(e.timer<=0){e.mode='owlWind';e.timer=.8;let spot=walkable(p.x,p.y,17);e.tx=spot.x;e.ty=spot.y;}}
else if(e.mode==='owlWind'){speed=0;if(e.timer<=0){e.mode='owlDive';e.timer=.52;e.diveT=0;e.sx=e.x;e.sy=e.y;}}
else if(e.mode==='owlDive'){speed=0;if(!stunned){e.diveT+=dt*(e.slowUntil>time?.7:1);let u=clamp(e.diveT/.52,0,1);e.x=lerp(e.sx,e.tx,u);e.y=lerp(e.sy,e.ty,u);if(u>=1){e.mode='recover';e.timer=1.25;}}}
else{speed=0;if(e.timer<=0){e.mode='circle';e.timer=2.2;}}
}else if(e.kind==='mud'){
let goal=shore(e.y)+45;if(e.mode==='mudWind'){speed=0;if(e.timer<=0){shootMud(e);e.mode='walk';e.timer=2.9;}}
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
if(stunned)speed=0;if(e.slowUntil>time)speed*=.7;if(e.stagger>0)speed*=.2;let pos=walkable(e.x+mx*speed*dt+e.kx*dt,e.y+my*speed*dt+e.ky*dt,e.r);e.x=pos.x;e.y=pos.y;e.kx*=Math.exp(-dt*8);e.ky*=Math.exp(-dt*8);applyChaseContact(e);
}

function stepEnemyShots(dt){for(let i=enemyShots.length-1;i>=0;i--){let b=enemyShots[i];b.life-=dt;b.px=b.x;b.py=b.y;b.x+=b.vx*dt;b.y+=b.vy*dt;let sx=b.x-b.px,sy=b.y-b.py,l=sx*sx+sy*sy,u=l?clamp(((p.x-b.px)*sx+(p.y-b.py)*sy)/l,0,1):0;if(Math.hypot(p.x-b.px-sx*u,p.y-b.py-sy*u)<p.r+b.r){hurt(b.damage,b);b.life=0;pop(b.x,b.y,'#aa9070',4);}if(b.life<=0)enemyShots.splice(i,1);}}

function drawChaseWarnings(){for(let e of enemies){if(!e.chase||e.hp<=0)continue;if(e.mode==='owlWind'){ctx.fillStyle='#e8b94c22';ctx.strokeStyle='#f4cb6fcc';ctx.lineWidth=2;ctx.beginPath();ctx.arc(e.tx,e.ty,e.kind==='boss'?53:30,0,TAU);ctx.fill();ctx.stroke();line([[e.tx-9,e.ty],[e.tx+9,e.ty]],'#f5ce83',2);line([[e.tx,e.ty-9],[e.tx,e.ty+9]],'#f5ce83',2);}else if(['foxWind','headWind','gooseWind'].includes(e.mode)){let len=e.kind==='fox'?145:e.kind==='heavy'?70:75;ctx.save();ctx.translate(e.x,e.y);ctx.rotate(Math.atan2(e.dy,e.dx));ctx.fillStyle='#eab85d22';ctx.fillRect(0,-13,len,26);line([[0,-13],[len,-13],[len,13],[0,13]],'#f4cc8699',1.4);ctx.restore();}else if(e.mode==='gustWind'||e.mode==='gust'){ctx.save();ctx.translate(e.x,e.y);ctx.rotate(e.aim);ctx.fillStyle=e.mode==='gust'?'#b9dfe24a':'#b9dfe21c';ctx.strokeStyle='#bfdee699';ctx.lineWidth=1.4;ctx.beginPath();ctx.moveTo(0,0);ctx.arc(0,0,300,-.9,.9);ctx.closePath();ctx.fill();ctx.stroke();ctx.restore();}else if(e.mode==='summonWind'){ctx.strokeStyle='#c3b6df99';ctx.lineWidth=2;ctx.beginPath();ctx.arc(e.x,e.y,70+Math.sin(time*7)*4,0,TAU);ctx.stroke();}}}

function drawChaseEnemy(e){ctx.save();ctx.translate(e.x,e.y);let bossy=e.kind==='boss',s=bossy?2.35:e.kind==='heavy'?1.35:1;ctx.scale(s,s);let bounce=Math.sin(e.age*10)*1.1;ellipse(0,12,13,5,'#17392d66');ctx.translate(0,bounce);const flash=e.flash>0;
if(e.kind==='goose'){let neck=e.mode==='gooseWind'?-6:0;ellipse(0,4,11,10,flash?'#fff4c8':'#ecebd9');ellipse(-3,4,6,7,'#c7d1c7');line([[4,1],[5,-12+neck]],'#e9ead8',6);ellipse(6,-13+neck,5,5,'#f3f0db');line([[10,-12+neck],[15,-11+neck]],'#e4a34d',3);ellipse(7,-14+neck,1,1,'#293b31');line([[-4,12],[-6,16]],'#d39a45',2);line([[5,12],[8,15]],'#d39a45',2);}
else if(e.kind==='fox'){let crouch=e.mode==='foxWind'?3:0;ctx.translate(0,crouch);ctx.save();ctx.rotate(Math.sin(e.age*4)*.12);ellipse(-12,7,9,5,'#bd713d');ellipse(-18,7,4,4,'#e4d8ba');ctx.restore();ellipse(0,4,10,13,flash?'#fff4c8':'#ba713e');ellipse(0,-10,9,8,'#ce8246');for(let side of [-1,1]){ctx.fillStyle='#b56a36';ctx.beginPath();ctx.moveTo(side*3,-15);ctx.lineTo(side*8,-23);ctx.lineTo(side*10,-11);ctx.fill();ellipse(side*3.5,-10,1.3,1.4,'#26392f');}ellipse(0,-5,5,4,'#eee0c1');ellipse(0,-6,1.5,1,'#29382d');line([[-5,13],[-5,17]],'#4e4938',3);line([[5,13],[5,17]],'#4e4938',3);}
else if(e.kind==='owl'||bossy){let wings=e.mode==='recover'?.35:e.mode==='gustWind'||e.mode==='gust'?1.25:.7+Math.sin(e.age*6)*.3;for(let side of [-1,1]){ctx.save();ctx.rotate(side*wings*.16);ellipse(side*(12+wings*5),0,6+wings*6,7,flash?'#fff4c8':bossy?'#535e65':'#8d8b76');line([[side*13,-2],[side*(19+wings*5),2]],'#c0b99c',1.2);ctx.restore();}ellipse(0,3,12,15,flash?'#fff4c8':bossy?'#59626a':'#8d8b76');ellipse(0,5,8,10,bossy?'#b4b49a':'#c5bca0');ellipse(0,-9,13,11,bossy?'#727b7b':'#a49a80');for(let side of [-1,1]){ellipse(side*5,-10,5,5,'#d8ceb0');ellipse(side*5,-10,2.1,2.8,bossy?'#e7bc5d':'#e0cd79');ellipse(side*5,-10,1,2.1,'#203438');line([[side*8,-17],[side*11,-23]],bossy?'#647079':'#8d8b76',3);}ctx.fillStyle='#d4ad55';ctx.beginPath();ctx.moveTo(-2,-6);ctx.lineTo(2,-6);ctx.lineTo(0,-2);ctx.fill();for(let y of [4,9])line([[-3,y],[0,y+2],[3,y]],'#8a8b7b',1);}
else if(e.kind==='mud'){ellipse(0,5,14,10,flash?'#fff4c8':'#657f6a');ellipse(-5,-3,5,6,'#8b9e77');ellipse(5,-3,5,6,'#8b9e77');ellipse(-5,-5,2,2,'#dfdab0');ellipse(5,-5,2,2,'#dfdab0');ellipse(-5,-5,1,1,'#203c31');ellipse(5,-5,1,1,'#203c31');ellipse(0,5,e.mode==='mudWind'?7:4,3,'#435c4c');ellipse(-12,9,5,3,'#8b9e77');ellipse(12,9,5,3,'#8b9e77');}
else{ellipse(0,4,13,16,flash?'#fff4c8':'#806a4d');ellipse(0,-10,10,11,'#9d8058');ellipse(0,-4,6,4,'#d0bd91');for(let side of [-1,1]){ellipse(side*6,17+Math.sin(e.age*7+side)*2,3,6,'#4c4637');line([[side*5,-17],[side*13,-26],[side*16,-34]],'#c8bf92',3);line([[side*12,-26],[side*6,-30]],'#c8bf92',2);ellipse(side*4,-11,1.4,1.7,'#263b31');}ellipse(0,-5,2,1.4,'#313d2e');}
if(e.stunUntil>time){starArt(-5,-28,3,time*4);starArt(5,-29,2.5,-time*4);}if(e.slowUntil>time){ellipse(0,13,14,3,'#d8a9dd77');starArt(-8,2,2,time);starArt(8,5,2,-time);}if(['foxWind','headWind','gooseWind','mudWind'].includes(e.mode)){ctx.fillStyle='#ffe0a0';ctx.font='bold 16px system-ui';ctx.textAlign='center';ctx.fillText('!',0,-30);}ctx.restore();}

function drawChasewater(){ctx.fillStyle='#48684b';ctx.fillRect(0,0,WORLD.w,WORLD.h);const vis=(x,y,r=90)=>Math.abs(x-cam.x)<W/scale/2+r&&Math.abs(y-cam.y)<H/scale/2+r;let path=new Path2D();path.moveTo(0,0);for(let y=0;y<=WORLD.h;y+=20)path.lineTo(shore(y),y);path.lineTo(0,WORLD.h);path.closePath();let water=ctx.createLinearGradient(0,0,220,0);water.addColorStop(0,'#28586c');water.addColorStop(1,'#538983');ctx.fillStyle=water;ctx.fill(path);ctx.strokeStyle='#a8b48c';ctx.lineWidth=15;ctx.beginPath();for(let y=0;y<=WORLD.h;y+=20)y?ctx.lineTo(shore(y)+5,y):ctx.moveTo(shore(y)+5,y);ctx.stroke();
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

// characters/jodie.js — source of truth.
function makeCat(kitten=false,index=0){let a=index*TAU/(kitten&&S(5)?8:6);return {name:kitten?'Kitten':index===3?'Tiny':'Mimi',x:p.x+Math.cos(a)*25,y:p.y+Math.sin(a)*25,r:kitten?6:index===3?9:8,kitten,slot:index,mode:'follow',cool:kitten?index*.09:.3,life:kitten?(S(1)?11:9):Infinity,attempts:0,t:0,revenge:false,revengeTarget:null,knockX:0,knockY:0};}

function resetCats(){cats=isJodie()?[makeCat()]:[];}

function syncCats(){if(isJodie()&&p&&tier>=5&&!cats.some(c=>c.name==='Tiny')){cats.push(makeCat(false,3));float(p.x,p.y-36,'TINY JOINS IN!','#9cccef');}}

function kittenChaos(){if(state!=='playing'||p.action||p.chargeCD>0)return;p.chargeCD=specialCooldown();p.kittenCall=.8;radialEffect(p.x,p.y,75,'#eeb6b0');cats=cats.filter(c=>!c.kitten);for(let i=0;i<(S(5)?8:6);i++)cats.push(makeCat(true,i));float(p.x,p.y-38,'KITTEN CHAOS!','#eeb6b0');pop(p.x,p.y,'#d7c086',18);}

function startClaws(){if(p.claws)return false;let e=nearest(p,new Set(),clawReach()+50);if(!e||dist(p,e)>clawReach()+e.r+8)return false;p.claws={t:0,aim:Math.atan2(e.y-p.y,e.x-p.x),wind:.14,hit:.28,gap:.34,count:2,seen:new Set(),target:e,duration:.86};p.catTarget=e;return true;}

function clawHands(){let s=p.claws;return [0,1].map(i=>{let h={x:i?-19:19,y:2,size:3.8,moving:false,open:false};if(!s)return h;let local=s.t-s.wind-i*s.gap;if(local<-.14||local>s.hit+.1)return h;let u=clamp(local/s.hit,0,1),a=s.aim+(i?-1:1)*(1.0-2.0*u),w=local<0?1+local/.14:local>s.hit?1-(local-s.hit)/.1:1;return {x:lerp(h.x,Math.cos(a)*clawReach(),w),y:lerp(2,Math.sin(a)*clawReach(),w),size:lerp(3.8,6,w),moving:local>=0&&local<=s.hit,open:w>.15,a};});}

function updateClaws(dt){let s=p.claws;if(!s)return;let before=s.t;s.t+=dt;for(let n=0;n<2;n++){let start=s.wind+n*s.gap,from=before-start,to=s.t-start;if(to<0||from>s.hit)continue;let sign=n%2?-1:1,a=s.aim+sign*(1-2*clamp(from/s.hit,0,1)),b=s.aim+sign*(1-2*clamp(to/s.hit,0,1));for(let e of enemies){let key=n+':'+e.id;if(e.hp<=0||s.seen.has(key)||!angularContact(e,Math.min(a,b),Math.max(a,b),0,clawReach()))continue;s.seen.add(key);let d=dist(p,e)||1;damageEnemy(e,10,(e.x-p.x)/d,(e.y-p.y)/d);}}if(s.t>=s.duration)p.claws=null;}

function drawOpenClaw(h){if(h.moving){ctx.strokeStyle='#ffedcf66';ctx.lineWidth=1.1;for(let n=-1;n<=1;n++){ctx.beginPath();ctx.arc(0,0,Math.hypot(h.x,h.y)+n*3,h.a-.24,h.a+.08);ctx.stroke();}}ctx.save();ctx.translate(h.x,h.y);ctx.rotate(h.a||0);ellipse(0,0,h.size,h.size*.85,'#ffead0');if(h.open){for(let n=-1;n<=1;n++){ellipse(h.size*.7,n*3.4,3.2,1.8,'#ffead0');ctx.fillStyle='#fffdf2';ctx.beginPath();ctx.moveTo(h.size+1,n*3.4-1.3);ctx.lineTo(h.size+5,n*3.4-.5);ctx.lineTo(h.size+1,n*3.4+1);ctx.fill();}ellipse(-.4,0,2.2,2.4,'#daaaa1');}ctx.restore();}

function catDamage(){return tier>=1?11:8;}

function chooseCatTarget(c){let claims=new Set(cats.filter(o=>o!==c&&o.target?.hp>0&&o.mode!=='follow').map(o=>o.target.id));let alternative=nearest(c,claims,c.kitten?220:260);let marked=p.catTarget;if(marked?.hp>0&&!claims.has(marked.id)&&dist(c,marked)<260&&dist(p,marked)<320)return marked;let ranged=null;for(let e of enemies)if(e.hp>0&&e.kind==='mud'&&!claims.has(e.id)&&dist(p,e)<300&&(!ranged||dist(c,e)<dist(c,ranged)))ranged=e;return ranged||alternative||nearest(c,new Set(),260);}

function beginPounce(c,e){c.mode='wind';c.t=0;c.target=e;c.sx=c.x;c.sy=c.y;c.tx=e.x;c.ty=e.y;c.hit=false;let max=c.kitten?(S(2)?135:95):tier>=3?150:48,d=dist(c,e)||1;if(d>max){c.tx=c.x+(e.x-c.x)/d*max;c.ty=c.y+(e.y-c.y)/d*max;}c.attempts++;}

function updateCats(dt){if(!isJodie())return;p.kittenCall=Math.max(0,(p.kittenCall||0)-dt);syncCats();updateClaws(dt);for(let c of cats){c.life-=dt;c.cool-=dt;if(c.kitten&&!c.revenge&&c.mode!=='knockback'){let attacker=enemies.find(e=>e.hp>0&&dist(c,e)<e.r+c.r+5);if(attacker){let dx=c.x-attacker.x,dy=c.y-attacker.y,d=Math.hypot(dx,dy)||1;c.revenge=true;c.revengeTarget=attacker;c.mode='knockback';c.t=0;c.knockX=dx/d;c.knockY=dy/d;c.life=Math.max(c.life,1.1);pop(c.x,c.y,'#f4d9a3',5);}}if(c.mode==='knockback'){c.t+=dt;let v=390*Math.max(0,1-c.t/.30),q=walkable(c.x+c.knockX*v*dt,c.y+c.knockY*v*dt,c.r);c.x=q.x;c.y=q.y;if(c.t>=.30){let target=c.revengeTarget?.hp>0?c.revengeTarget:nearest(c,new Set(),350);if(target){beginPounce(c,target);c.life=Math.max(c.life,.65);}else{c.mode='vanish';c.life=0;}}continue;}if(c.mode==='vanish')continue;if(c.mode==='follow'){let e=chooseCatTarget(c),leash=dist(c,p)>300;if(!leash&&e&&c.cool<=0&&dist(c,e)<(c.kitten?(S(2)?135:95):tier>=3?150:48)+e.r)beginPounce(c,e);else{let a=c.slot*TAU/(c.kitten&&S(5)?8:6)+time*.2,goal=(!leash&&e&&c.cool<=0)?e:{x:p.x+Math.cos(a)*(c.kitten?36:30),y:p.y+14+Math.sin(a)*18},d=dist(c,goal)||1,speed=(c.kitten?190:175)*(c.speedUntil>time?1.4:1),move=Math.min(Math.max(0,d-13),speed*dt);c.x+=(goal.x-c.x)/d*move;c.y+=(goal.y-c.y)/d*move;}}
else{c.t+=dt;if(c.mode==='wind'&&c.t>=.12){c.mode='pounce';c.t=0;}else if(c.mode==='pounce'){let u=clamp(c.t/.20,0,1);c.x=lerp(c.sx,c.tx,u);c.y=lerp(c.sy,c.ty,u);if(u>=1){let e=c.target;if(e?.hp>0&&dist(c,e)<e.r+c.r+(c.kitten?12:c.name==='Mimi'?24:12)){let damage=c.kitten?6:catDamage();if(c.kitten&&e.kind==='boss')damage*=.65;if(c.kitten&&c.revenge)damage*=1.8;damageEnemy(e,damage,0,0,false,c.kitten?'special':'cat');if(!c.kitten&&c.name==='Mimi')for(let other of enemies){if(other===e||other.hp<=0||dist(c,other)>other.r+24)continue;damageEnemy(other,damage*.65,0,0,false,'cat');}pop(c.x,c.y,'#e9ceb2',4);c.hit=true;}if(c.kitten&&c.revenge){pop(c.x,c.y,'#f5d5a4',9);c.mode='vanish';c.life=0;}else c.mode=!c.kitten&&tier>=4&&c.hit?'scratch':'recover';c.t=0;c.scratchDone=false;c.cool=c.kitten?.5:tier>=2?.55:.9;}}else if(c.mode==='scratch'){if(c.t>=.14&&!c.scratchDone){c.scratchDone=true;let e=c.target;if(e?.hp>0&&dist(c,e)<e.r+c.r+14)damageEnemy(e,6,0,0,false,'cat');}if(c.t>=.28){c.mode='recover';c.t=0;}}else if(c.mode==='recover'&&c.t>=.22)c.mode='follow';}
let q=walkable(c.x,c.y,c.r);c.x=q.x;c.y=q.y;}
for(let i=0;i<cats.length;i++)for(let j=i+1;j<cats.length;j++){let a=cats[i],b=cats[j];if(a.mode==='pounce'||b.mode==='pounce')continue;let dx=b.x-a.x,dy=b.y-a.y,d=Math.hypot(dx,dy);if(d<.01){dx=Math.cos(a.slot+1);dy=Math.sin(a.slot+1);d=1;}let min=a.r+b.r+4;if(d<min){let n=(min-d)*Math.min(1,dt*12)*.5;a.x-=dx/d*n;a.y-=dy/d*n;b.x+=dx/d*n;b.y+=dy/d*n;}}
cats=cats.filter(c=>!c.kitten||(c.revenge?(c.mode!=='vanish'&&c.mode!=='follow'&&c.life>0):(c.life>0&&(c.attempts<(S(3)?6:5)||c.mode!=='follow'))));}

function drawCat(c){if(c.speedUntil>time)radialDraw(c.x,c.y,12,'#a9dcbe');ctx.save();ctx.translate(c.x,c.y);let jumping=c.mode==='knockback'?Math.sin(clamp(c.t/.30,0,1)*Math.PI)*16:c.mode==='pounce'?Math.sin(clamp(c.t/.2,0,1)*Math.PI)*9:0,s=c.kitten?.65:c.name==='Tiny'?.96:.86;ellipse(0,5,9*s,3*s,'#16352855');ctx.translate(0,-jumping);ctx.scale(s,s);if(c.kitten)ctx.globalAlpha=Math.min(1,c.life*2);let fur=c.kitten?['#c99162','#d9cbb5','#85888c'][c.slot%3]:'#20292c',bounce=c.mode==='follow'?Math.sin(time*18+c.slot)*.6:0;ctx.translate(0,bounce);ctx.strokeStyle=fur;ctx.lineWidth=3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-5,3);ctx.bezierCurveTo(-15,0,-13,-9,-9,-7);ctx.stroke();ellipse(0,2,c.mode==='pounce'?11:c.name==='Tiny'?9:8,6,fur);ellipse(2,-4,6,6,fur);ctx.fillStyle=fur;ctx.beginPath();ctx.moveTo(-3,-6);ctx.lineTo(-3,-13);ctx.lineTo(1,-9);ctx.lineTo(6,-13);ctx.lineTo(8,-5);ctx.fill();ellipse(0,-5,1.3,1.8,'#e7d16e');ellipse(5,-5,1.3,1.8,'#e7d16e');ellipse(2.5,-2,.8,.6,'#d89789');line([[-3,1],[6,1]],c.name==='Tiny'?'#78b6dc':'#bd8c4b',1.7);ellipse(2,2,1.3,1.3,c.name==='Tiny'?'#b8dcf4':'#f8d47b');if(c.mode==='pounce')line([[-8,3],[-15,3]],'#e6c59a77',1);if(c.mode==='scratch'||(c.mode==='pounce'&&tier>=1&&!c.kitten&&c.t>.15)){for(let n=-1;n<=1;n++)line([[7+n*3,-4],[10+n*3,5]],'#fff0cecc',1.1);}ctx.restore();}

function drawJodie(){if(p.kittenCall>0)radialDraw(p.x,p.y,30+(1-p.kittenCall/.8)*50,'#eeb6b0');ctx.save();ctx.translate(p.x,p.y+Math.sin(p.walk*2)*.5);if(p.inv>0&&Math.floor(p.inv*22)%2===0)ctx.globalAlpha=.65;ellipse(0,19,12,3,'#16352855');ctx.strokeStyle='#c38a51';ctx.lineWidth=4;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(7,11);ctx.bezierCurveTo(25,25,27,4,18,5);ctx.stroke();line([[18,5],[16,7]],'#f3d7aa',3.3);
// Compact fitted teal torso, scarf and single cat charm.
ctx.fillStyle='#257b79';ctx.strokeStyle='#274d49';ctx.lineWidth=.7;let body=new Path2D('M -9 -6 Q 0 -10 9 -6 L 8 13 Q 0 17 -8 13 Z');ctx.fill(body);ctx.stroke(body);line([[0,-5],[0,13]],'#d9c28a',.8);line([[-7,6],[7,6]],'#956a45',2);ellipse(0,7,2.7,2.5,'#f6d3a1');ellipse(-1,6,.6,1,'#3c4138');ellipse(1,6,.6,1,'#3c4138');line([[-7,-6],[0,-2],[7,-6]],'#cf8c91',4);line([[3,-3],[4,2]],'#cf8c91',2.5);
// Ginger locks behind a cream face; pointed ears stay clear of hair.
ellipse(-7,-9,3,8,'#9f512d');ellipse(7,-9,3,8,'#9f512d');ellipse(0,-13,7.3,7,'#e5bb87');for(let side of [-1,1]){ctx.fillStyle='#d49a62';ctx.beginPath();ctx.moveTo(side*3,-18);ctx.lineTo(side*8,-23);ctx.lineTo(side*8,-14);ctx.fill();line([[side*5,-18],[side*7,-21]],'#d59088',1.6);}ellipse(0,-10,4.8,3,'#ffedd2');ellipse(-2.7,-13,1.1,1.6,'#eaf0db');ellipse(2.7,-13,1.1,1.6,'#eaf0db');ellipse(-2.7,-13,.65,1.2,'#486b42');ellipse(2.7,-13,.65,1.2,'#486b42');ellipse(0,-9.8,.9,.65,'#c68c8b');ellipse(1,-23,4,3.4,'#a6552e');ctx.fillStyle='#b86433';let hair=new Path2D('M -7 -16 Q -9 -22 0 -21 Q 6 -22 7 -17 Q 3 -19 -3 -13 L -2 -17 Q -5 -14 -7 -16 Z');ctx.fill(hair);line([[-5,-19],[0,-20],[4,-18]],'#df9855',.7);
for(let h of clawHands())drawOpenClaw(h);ctx.restore();}

CHARACTERS.jodie={"name":"Jodie","hp":95,"speed":158,"damage":20,"rate":1.05,"dodgeSpeed":490,"dodgeTime":0.25,"specialCD":12};

PROFILES.jodie={"role":"CAT KEEPER","tag":"Sharp claws. Loyal company.","attack":"Open Claws + Mimi","attackDesc":"Forward swipes · upgrades grow your cat team","special":"Kitten Chaos","specialDesc":"6 kittens · up to 9s / 5 pounces · 12s","dodge":"Catstep","dodgeDesc":"Quick dash · no damage · 1.65s"};

SPECIALS.jodie=[["Stay and Play","Kittens last up to 11 seconds."],["Leaping Kittens","Kittens pounce farther."],["One More Pounce","Each kitten gets a sixth pounce."],["Cat Call","Kitten cooldown 12 → 9 seconds."],["Full House","Summon eight kittens instead of six."]];

DODGES.jodie=[["Long Catstep","Dash travels 15% farther."],["Safe Paws","Gain 0.12 seconds more dodge protection."],["Follow Mum","Mimi and Tiny gain 40% movement speed for 2 seconds after a dash."],["Quick Catstep","Dodge cooldown 1.65 → 1.25 seconds."],["Safe Landing","Landing briefly staggers nearby small enemies."]];

STAT_NAMES.jodie=["Nine Lives","Light Steps","Sharp Claws","Cat Collector","Cat Keeper"];
const isJodie=()=>selected==='jodie';
let cats=[];
const jodieNames=['Sharp Claws','Quick Paws','Hunting Leap','Double Scratch','Tiny Joins In'];
const jodieText=['Mimi deals more damage. Her pounces leave visible claw marks.','Mimi recovers faster between attacks.','Mimi gains a longer hunting pounce.','After a successful pounce, Mimi follows with a second visible scratch.','Tiny joins Mimi as a second permanent black cat. Different targets where possible, with all companion upgrades retained.'];
const jodieBuild=['Open claws · Mimi','Mimi · sharper claws','Mimi · quick paws','Mimi · hunting leap','Mimi · double scratch','Mimi + Tiny · double scratches'];
const clawReach=()=>55;

// characters/evie.js — source of truth.
function resetDucks(){ducks=[];eggs=[];duckQueue=[];duckSignal=0;}

function regularDuckCount(){return ducks.filter(d=>!d.tiny&&d.life>0).length;}

function queueDucks(){if(regularDuckCount()+duckQueue.length>=6||!nearest(p,new Set(),300))return false;let n=Math.min(tier>=1?2:1,6-regularDuckCount()-duckQueue.length);for(let i=0;i<n;i++)duckQueue.push({delay:i*.17});return true;}

function duckTarget(d,range=260){let claimed=new Set(ducks.filter(o=>o!==d&&o.target?.hp>0&&o.mode!=='thrown').map(o=>o.target.id));return nearest(d,claimed,range)||nearest(d,new Set(),range);}

function launchDuck(){if(regularDuckCount()>=6)return;let target=nearest(p,new Set(),300);if(!target)return;let dx=target.x-p.x,dy=target.y-p.y,n=Math.hypot(dx,dy)||1;ducks.push({id:++id,x:p.x+dx/n*19,y:p.y-4+dy/n*12,px:p.x,py:p.y,vx:dx/n*205,vy:dy/n*205,r:tier>=2?9:7,mode:'thrown',life:6,flight:2.8,smashes:1,eggs:tier>=3?2:0,defender:tier>=3,tiny:false,target,age:0,slot:id%6,cool:.5,t:0});p.throwT=.22;}

function segmentHits(x0,y0,x1,y1,e,r){let dx=x1-x0,dy=y1-y0,n=dx*dx+dy*dy,u=n?clamp(((e.x-x0)*dx+(e.y-y0)*dy)/n,0,1):0;return Math.hypot(e.x-x0-dx*u,e.y-y0-dy*u)<e.r+r;}

function hatchDuck(x,y){if(ducks.filter(d=>d.tiny&&d.life>0).length>=8)return;let q=walkable(x,y,4);ducks.push({id:++id,x:q.x,y:q.y,px:q.x,py:q.y,r:4,tiny:true,mode:'ally',life:3,smashes:2,eggs:0,defender:false,age:0,cool:.12,slot:id%8,t:0});}

function ducksAssemble(){if(state!=='playing'||p.action||p.chargeCD>0)return;duckSignal=.65;let active=ducks.filter(d=>d.life>0&&(d.smashes>0||d.eggs>0));if(!active.length){float(p.x,p.y-40,'NO DUCKS TO RECALL','#d2a8ed');return;}p.chargeCD=specialCooldown();for(let d of active){d.mode='recall';d.recallHits=new Set();d.recallSplash=false;d.t=0;}float(p.x,p.y-40,'DUCKS, ASSEMBLE!','#dfc5f2');}

function duckFinishedSmash(d){if(d.smashes>0){d.mode='ally';d.cool=.30;}else if(d.defender&&d.eggs>0){d.mode='defender';d.cool=.5;}else d.life=0;}

function updateDucks(dt){if(!isEvie())return;duckSignal=Math.max(0,duckSignal-dt);for(let i=duckQueue.length-1;i>=0;i--){duckQueue[i].delay-=dt;if(duckQueue[i].delay<=0){launchDuck();duckQueue.splice(i,1);}}
for(let d of ducks){if(d.life<=0)continue;d.life-=dt;d.age+=dt;d.cool-=dt;d.px=d.x;d.py=d.y;if(!d.tiny){d.r=tier>=2?9:7;if(tier>=3&&!d.defender){d.defender=true;d.eggs=2;}}
if(d.mode==='thrown'){d.flight-=dt;d.x+=d.vx*dt;d.y+=d.vy*dt;for(let e of enemies){if(e.hp<=0||!segmentHits(d.px,d.py,d.x,d.y,e,d.r))continue;damageEnemy(e,duckPower(),d.vx/205,d.vy/205);d.mode='ally';d.cool=.7;d.x=e.x;d.y=e.y;pop(d.x,d.y,'#ffe56c',tier>=2?10:5);break;}if(d.flight<=0)d.life=0;}
else if(d.mode==='recall'){d.t+=dt;let goal={x:p.x+Math.cos(d.slot*TAU/(d.tiny?8:6))*(d.tiny?22:35),y:p.y+Math.sin(d.slot*TAU/(d.tiny?8:6))*25},n=dist(d,goal)||1,m=Math.min(n,480*(S(1)?1.25:1)*(d.speedUntil>time?1.35:1)*dt);d.x+=(goal.x-d.x)/n*m;d.y+=(goal.y-d.y)/n*m;for(let e of enemies){if(e.hp<=0||d.recallHits.has(e.id)||!segmentHits(d.px,d.py,d.x,d.y,e,d.r+(S(2)?5:0)))continue;d.recallHits.add(e.id);damageEnemy(e,(d.tiny?3:duckSmash())*(S(3)?1.5:1),0,0,false,'special');}if(n<6||d.t>1.4){if(S(5)&&!d.tiny&&!d.recallSplash){d.recallSplash=true;radialEffect(d.x,d.y,30,'#efcf75');for(let e of enemies)if(e.hp>0&&dist(d,e)<30+e.r)damageEnemy(e,6,0,0,false,'special');}d.mode=d.smashes>0?'ally':'defender';d.cool=.3;if(d.smashes<=0&&d.eggs<=0)d.life=0;}}
else if(d.mode==='ally'){let e=duckTarget(d,d.tiny?180:260),leash=dist(d,p)>280;if(e&&!leash&&d.cool<=0&&dist(d,e)<(d.tiny?43:65)+e.r){d.target=e;d.mode='wind';d.t=0;d.sx=d.x;d.sy=d.y;d.tx=e.x;d.ty=e.y;}else{let goal=e&&!leash?e:{x:p.x+Math.cos(d.slot)*30,y:p.y+Math.sin(d.slot)*25},n=dist(d,goal)||1,m=Math.min(Math.max(0,n-18),(d.tiny?185:150)*(d.speedUntil>time?1.35:1)*dt);d.x+=(goal.x-d.x)/n*m;d.y+=(goal.y-d.y)/n*m;}}
else if(d.mode==='wind'){d.t+=dt;if(d.t>=.12){d.mode='smash';d.t=0;}}
else if(d.mode==='smash'){d.t+=dt;let u=clamp(d.t/.22,0,1);d.x=lerp(d.sx,d.tx,u);d.y=lerp(d.sy,d.ty,u);if(u>=1){let e=d.target;if(e?.hp>0&&dist(d,e)<e.r+d.r+12){damageEnemy(e,d.tiny?(e.kind==='boss'?2:3):duckSmash(),0,0);pop(d.x,d.y,'#fff09d',4);}d.smashes--;d.mode='recover';d.t=0;}}
else if(d.mode==='recover'){d.t+=dt;if(d.t>=.15)duckFinishedSmash(d);}
else if(d.mode==='defender'){let a=d.slot*TAU/6+Math.sin(time*.7)*.2,goal={x:p.x+Math.cos(a)*42,y:p.y+Math.sin(a)*32},n=dist(d,goal)||1,m=Math.min(n,210*(d.speedUntil>time?1.35:1)*dt);d.x+=(goal.x-d.x)/n*m;d.y+=(goal.y-d.y)/n*m;let e=duckTarget(d,280);if(e&&d.cool<=0&&d.eggs>0&&eggs.length<18){let dx=e.x-d.x,dy=e.y-d.y,l=Math.hypot(dx,dy)||1;eggs.push({x:d.x,y:d.y,px:d.x,py:d.y,vx:dx/l*265,vy:dy/l*265,r:3,life:2.5});d.eggs--;d.cool=1.2;d.tilt=.18;}if(d.eggs<=0)d.life=Math.min(d.life,.25);}
if(d.mode!=='thrown'){let q=walkable(d.x,d.y,d.r);d.x=q.x;d.y=q.y;}}
for(let i=eggs.length-1;i>=0;i--){let b=eggs[i];b.life-=dt;b.px=b.x;b.py=b.y;b.x+=b.vx*dt;b.y+=b.vy*dt;for(let e of enemies){if(e.hp<=0||!segmentHits(b.px,b.py,b.x,b.y,e,b.r))continue;damageEnemy(e,6,0,0);pop(b.x,b.y,'#fff4cf',4);if(tier>=4)hatchDuck(b.x,b.y);b.life=0;break;}if(b.life<=0)eggs.splice(i,1);}
for(let i=0;i<ducks.length;i++)for(let j=i+1;j<ducks.length;j++){let a=ducks[i],b=ducks[j];if(a.mode==='thrown'||b.mode==='thrown'||a.mode==='smash'||b.mode==='smash'||a.mode==='recall'||b.mode==='recall')continue;let dx=b.x-a.x,dy=b.y-a.y,n=Math.hypot(dx,dy);if(n<.01){dx=Math.cos(a.id);dy=Math.sin(a.id);n=1;}let gap=a.r+b.r+3;if(n<gap){let m=(gap-n)*Math.min(1,dt*9)*.5;a.x-=dx/n*m;a.y-=dy/n*m;b.x+=dx/n*m;b.y+=dy/n*m;}}
ducks=ducks.filter(d=>d.life>0);}

function drawDuck(d){ctx.save();ctx.translate(d.x,d.y);let s=d.r/7,jump=d.mode==='smash'?Math.sin(clamp(d.t/.22,0,1)*Math.PI)*9:0;ellipse(0,5,8*s,3*s,'#173a2944');if(d.mode==='recall')line([[d.px-d.x,d.py-d.y],[0,0]],'#c598e1bb',3);ctx.translate(0,-jump);ctx.scale(s,s);let bounce=d.mode==='thrown'?Math.sin(d.age*12)*.8:Math.sin(d.age*8)*.5;ctx.translate(0,bounce);if(d.mode==='wind')ctx.scale(1.12,.85);ctx.rotate(d.mode==='defender'&&d.cool>1.05?.13:0);ellipse(0,1,7,5,'#ffd83d');ellipse(-1,1,3.7,2.8,'#ffe66d');ellipse(3,-4,4.8,5,'#ffe151');ellipse(6.6,-3,3.1,1.65,'#f28c28');ellipse(4.1,-5.1,.85,1.15,'#28252a');ellipse(4.3,-5.5,.28,.35,'#fff');ctx.fillStyle='#ffd83d';ctx.beginPath();ctx.moveTo(-5,1);ctx.lineTo(-10,-2);ctx.lineTo(-7,4);ctx.fill();ctx.restore();}

function drawDuckExtras(){for(let e of eggs){line([[e.px,e.py],[e.x,e.y]],'#fff1cc77',1.5);ellipse(e.x,e.y,2.6,3.6,'#fff0d4');}if(duckSignal>0){ctx.strokeStyle='#bb82e5';ctx.lineWidth=2;ctx.beginPath();ctx.arc(p.x,p.y-38,8+(1-duckSignal/.65)*10,0,TAU);ctx.stroke();starArt(p.x,p.y-38,4,time*3);}}

function drawEvie(){ctx.save();ctx.translate(p.x,p.y+Math.sin(p.walk*2)*.6);ctx.scale(1.04,1.04);ctx.rotate(p.dir.x*.04);if(p.inv>0&&Math.floor(p.inv*22)%2===0)ctx.globalAlpha=.65;ellipse(0,20,12,3,'#183b2955');ctx.strokeStyle='#a9a4ad';ctx.lineWidth=4.3;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(7,12);ctx.bezierCurveTo(25,25,28,3,19,4);ctx.stroke();line([[19,4],[17,6]],'#f5e9d8',3.5);
// Long blonde silhouette, ponytail and purple bow are readable at game scale.
ellipse(3,-23,5,6,'#f5d995');ellipse(-7,-7,3.7,11,'#ead092');ellipse(7,-7,3.7,11,'#ead092');let body=new Path2D('M -9 -6 Q 0 -11 9 -6 L 8 14 L 2 13 L 0 9 L -2 13 L -8 14 Z');ctx.fillStyle='#392447';ctx.strokeStyle='#201e29';ctx.lineWidth=.8;ctx.fill(body);ctx.stroke(body);line([[-6,-5],[-2,6],[-5,12]],'#78469b',1.2);line([[6,-5],[2,6],[5,12]],'#78469b',1.2);line([[-7,5],[7,5]],'#a17a44',1.7);ellipse(0,5,1.8,1.5,'#e7bf72');line([[-7,-7],[0,-3],[7,-7]],'#78469b',4);
ellipse(0,-13,7.3,7,'#f5e9d8');ellipse(-5.6,-12,2.2,4,'#c7c0c7');ellipse(0,-9,4.5,3,'#fff0de');for(let side of [-1,1]){ctx.fillStyle='#a9a4ad';ctx.beginPath();ctx.moveTo(side*3,-17);ctx.lineTo(side*8,-23);ctx.lineTo(side*8,-14);ctx.fill();line([[side*5,-18],[side*7,-21]],'#d9adbb',1.7);}ellipse(-2.6,-13,1.2,1.7,'#f2eef0');ellipse(2.6,-13,1.2,1.7,'#f2eef0');ellipse(-2.6,-13,.7,1.3,'#613570');ellipse(2.6,-13,.7,1.3,'#613570');ellipse(0,-9.5,.9,.6,'#c98a98');ctx.fillStyle='#f5d995';ctx.fill(new Path2D('M -7 -16 Q -8 -22 0 -21 Q 6 -22 7 -17 Q 3 -18 -3 -13 L -2 -17 Q -5 -14 -7 -16 Z'));line([[-5,-19],[0,-20],[4,-18]],'#fff0c5',.8);
ctx.fillStyle='#392447';ctx.fill(new Path2D('M 1 -23 L -4 -27 L -4 -21 Z'));ctx.fill(new Path2D('M 1 -23 L 6 -27 L 6 -21 Z'));ellipse(1,-23,1.3,1.3,'#c6a8ce');for(let side of [-1,1]){let y=side===1&&p.throwT>0?2-Math.sin(p.throwT/.22*Math.PI)*7:2;ellipse(side*19,y,3.8,4,'#f5e9d8');ellipse(side*19,y+.5,1.8,1.5,'#a17caf');}ctx.restore();}

CHARACTERS.evie={"name":"Evie","hp":90,"speed":158,"damage":12,"rate":1.15,"dodgeSpeed":410,"dodgeTime":0.24,"specialCD":10};

PROFILES.evie={"role":"DUCK COMMANDER","tag":"Small ducks. Big trouble.","attack":"Duck Attack","attackDesc":"Throw impact + one allied smash","special":"Ducks, Assemble!","specialDesc":"Allies rush back · path damage · 10s","dodge":"Quick Dash","dodgeDesc":"Short dash · no damage · 1.65s"};

SPECIALS.evie=[["Quick Recall","Returning ducks move 25% faster."],["Wide Formation","Recall contact radius grows by 5 units."],["Heavy Recall","Recall path damage increases by 50%."],["Command Again","Recall cooldown 10 → 8 seconds."],["Royal Recall","Each regular duck makes one small 6-damage landing splash."]];

DODGES.evie=[["Long Dash","Dash travels 15% farther."],["Safe Landing","Gain 0.12 seconds more dodge protection."],["Follow the Leader","Nearby allied ducks move 35% faster for 2 seconds."],["Quick Retreat","Dodge cooldown 1.65 → 1.25 seconds."],["Quack Back","Leave a 1.5-second duck decoy that nearby ordinary walkers pursue."]];

STAT_NAMES.evie=["Lucky Duck","Commander’s Pace","Rapid Quack","Duck Collector","Mighty Flock"];
const isEvie=()=>selected==='evie';
let ducks=[],eggs=[],duckQueue=[],duckSignal=0;
const evieNames=['Double Trouble','Mighty Ducks','Egg Defenders','Duckling Mayhem'];
const evieText=['Throw two rubber ducks in quick succession. Each becomes an ally for one additional smash.','Bigger ducks, stronger impact and allied smashes.','After its allied smash, each duck guards Evie and fires up to two eggs before leaving. Six regular ducks maximum, six-second total lifetime.','Egg impacts create a tiny duck with two small smashes. Eight ducklings maximum; ducklings never produce more eggs or ducks.'];
const evieBuild=['Duck impact · one ally smash','Two ducks · one ally smash each','Two mighty ducks · stronger smashes','Mighty ducks · two eggs each','Eggs hatch ducklings · two tiny smashes'];
const duckPower=()=>tier>=2?18:12,duckSmash=()=>tier>=2?12:8;

// Zak — Toxic Trickster, original purple cat.
const isZak=()=>selected==='zak';
let zakClouds=[],zakBurst=0,zakLaunch=0,zakLaughClouds=[],zakMood=0,zakGasTrail=[];
function resetZak(){zakClouds=[];zakLaughClouds=[];zakGasTrail=[];zakBurst=zakLaunch=zakMood=0;}
function zakFart(){if(!isZak()||!p)return false;let life=tier>=1?3.3:2.3;let facing=p.dir||{x:1,y:0};zakClouds.push({x:p.x-facing.x*17,y:p.y-facing.y*17,r:57+(tier>=2?12:0)+(tier>=4?13:0),life,tick:0,age:0});zakMood=.65;if(zakClouds.length>7)zakClouds.shift();p.throwT=.18;pop(p.x,p.y,'#a6dd70',5);return true;}
function zakExplosion(){if(state!=='playing'||p.action||p.chargeCD>0)return;p.chargeCD=specialCooldown();zakBurst=.8;zakMood=1.15;let r=105+(S(2)?25:0),life=2.5+(S(1)?1.5:0);zakLaughClouds.push({x:p.x,y:p.y,r,life,max:life,age:0,tick:0,hit:new Set()});radialEffect(p.x,p.y,r,'#c4a3e7');pop(p.x,p.y,'#a3db5b',24);float(p.x,p.y-42,'LAUGHING GAS!','#d8f68c');for(let e of enemies){if(e.hp<=0||dist(p,e)>r+e.r)continue;let dx=e.x-p.x,dy=e.y-p.y,n=Math.hypot(dx,dy)||1;damageEnemy(e,16*(S(3)?1.35:1),dx/n,dy/n,false,'special');zakMakeLaugh(e,life);}if(S(5))zakClouds.push({x:p.x,y:p.y,r:72,life:3,tick:0,age:0});}
function zakMakeLaugh(e,duration){if(e.hp<=0)return;let resist=e.kind==='boss'?.12:e.kind==='heavy'?.5:1;let until=time+Math.min(e.kind==='boss'?.35:2.2,duration*resist);e.zakLaughUntil=Math.max(e.zakLaughUntil||0,until);e.stunUntil=Math.max(e.stunUntil||0,until);e.zakLaughMark=time+.12;}
function zakDodge(){if(state!=='playing'||p.action||p.dodgeCD>0)return;quickDodge();if(p.action!=='dodge')return;zakLaunch=.5;zakMood=.8;radialEffect(p.x,p.y,33,'#b6e76e');pop(p.x,p.y,'#a5d96b',10);for(let e of enemies){if(e.hp<=0||dist(p,e)>(D(2)?52:37)+e.r)continue;let dx=e.x-p.x,dy=e.y-p.y,n=Math.hypot(dx,dy)||1;damageEnemy(e,D(3)?8:4,dx/n,dy/n,true,'special');}if(D(5))zakClouds.push({x:p.x,y:p.y,r:35,life:1.6,tick:0,age:0});}
function updateZak(dt){if(!isZak())return;zakBurst=Math.max(0,zakBurst-dt);zakLaunch=Math.max(0,zakLaunch-dt);zakMood=Math.max(0,zakMood-dt);
for(let e of enemies){if(e.hp>0&&e.poisonUntil>time){e.zakPoisonTick=(e.zakPoisonTick||0)-dt;if(e.zakPoisonTick<=0){e.zakPoisonTick=.6;damageEnemy(e,3,0,0,false,'status');}}if(e.hp>0&&e.zakLaughUntil>time&&time>=(e.zakLaughMark||0)){e.zakLaughMark=time+.65;pop(e.x,e.y-e.r,'#dfb8f1',2);}}
for(let c of zakClouds){c.life-=dt;c.age+=dt;c.tick-=dt;if(c.tick<=0){c.tick=.48;for(let e of enemies){if(e.hp<=0||dist(c,e)>c.r+e.r)continue;damageEnemy(e,(tier>=3?8:6)*(tier>=5?1.25:1),0,0,false,'special');e.poisonUntil=Math.max(e.poisonUntil||0,time+.8);}}}zakClouds=zakClouds.filter(c=>c.life>0);
for(let c of zakLaughClouds){c.life-=dt;c.age+=dt;c.tick-=dt;if(c.tick<=0){c.tick=.18;for(let e of enemies){if(e.hp<=0||dist(c,e)>c.r+e.r)continue;zakMakeLaugh(e,Math.min(c.life+.2,1.3));if(!c.hit.has(e.id)){c.hit.add(e.id);damageEnemy(e,4,0,0,false,'special');}}}}zakLaughClouds=zakLaughClouds.filter(c=>c.life>0);
}
function drawZakClouds(){if(!isZak())return;for(let c of zakClouds){ctx.save();ctx.globalAlpha=Math.min(.43,c.life*.18);for(let i=0;i<7;i++){let a=i*TAU/7+c.age*.4,r=c.r*.48;ellipse(c.x+Math.cos(a)*r,c.y+Math.sin(a)*r,c.r*.47,c.r*.34,i%2?'#8ecb53':'#c1e776');}ctx.restore();}
for(let c of zakLaughClouds){ctx.save();ctx.globalAlpha=Math.min(.33,c.life*.19);for(let i=0;i<9;i++){let a=i*TAU/9+c.age*.35,r=c.r*(.3+.2*Math.sin(i*3));ellipse(c.x+Math.cos(a)*r,c.y+Math.sin(a)*r,c.r*.37,c.r*.30,i%2?'#a7dc81':'#cba7ed');}ctx.restore();radialDraw(c.x,c.y,c.r,'#b5a0e644');}
if(zakBurst>0)radialDraw(p.x,p.y,105*(1-zakBurst/.8),'#b3ed78');if(zakLaunch>0)radialDraw(p.x,p.y,40*(1-zakLaunch/.5),'#c5e982');}
function drawZak(){ctx.save();ctx.translate(p.x,p.y+Math.sin(p.walk*1.25)*1.3+(zakLaunch>0?-Math.sin((.5-zakLaunch)/.5*Math.PI)*8:0));ctx.scale(1.08,1.1);if(p.inv>0&&Math.floor(p.inv*22)%2===0)ctx.globalAlpha=.65;
ellipse(0,21,15,4,'#142e2a55');
// Tail, detached paws and floating hoodie body: the shared family silhouette.
ctx.strokeStyle='#735b91';ctx.lineWidth=6;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(11,9);ctx.bezierCurveTo(31,20,34,-3,20,-2);ctx.stroke();ellipse(22,-3,5,4,'#9b83b5');
ellipse(0,6,15,18,'#26232d');ellipse(0,7,12,15,'#38313f');ellipse(0,-3,13,7,'#45404c');
line([[-5,-5],[-4,5]],'#a98ab9',1.1);line([[5,-5],[4,5]],'#a98ab9',1.1);
ellipse(0,13,7,4,'#49414c');line([[-7,16],[7,16]],'#201d29',1);
// Distinct, independently bobbing floating paws, no arms or feet.
let swing=Math.sin(p.walk*2)*2.2,reach=p.throwT>0?5:0;
ellipse(-24-reach,-1+swing,7,7,'#9b83b5');ellipse(24+reach,-1-swing,7,7,'#9b83b5');
ellipse(-25-reach,-3+swing,4,3,'#b69fc9');ellipse(23+reach,-3-swing,4,3,'#b69fc9');
// Rounded teenage cat face with soft cheeks and a brown near-bowl-cut fringe.
ellipse(0,-14,17,15,'#8d76ac');
ctx.fillStyle='#8d76ac';ctx.beginPath();ctx.moveTo(-14,-19);ctx.lineTo(-12,-33);ctx.lineTo(-3,-24);ctx.lineTo(4,-24);ctx.lineTo(12,-33);ctx.lineTo(14,-19);ctx.fill();
ctx.fillStyle='#c6a6d3';ctx.beginPath();ctx.moveTo(-11,-25);ctx.lineTo(-11,-30);ctx.lineTo(-6,-24);ctx.moveTo(6,-24);ctx.lineTo(11,-30);ctx.lineTo(11,-25);ctx.fill();
ellipse(-7,-12,4.3,5,'#d9efad');ellipse(7,-12,4.3,5,'#d9efad');ellipse(-6,-12,1.7,3,'#29352a');ellipse(8,-12,1.7,3,'#29352a');ellipse(-7,-14,1,1,'#ffffff');ellipse(6,-14,1,1,'#ffffff');
ellipse(0,-4,7,4.7,'#c7b0d0');ellipse(0,-6,2,1.4,'#6b5169');line([[-4,-3],[0,-1],[4,-3]],'#5a425b',1.4);
ctx.fillStyle='#654532';ctx.beginPath();ctx.moveTo(-14,-23);ctx.quadraticCurveTo(-9,-34,0,-30);ctx.quadraticCurveTo(10,-34,15,-23);ctx.quadraticCurveTo(6,-26,3,-24);ctx.quadraticCurveTo(-2,-21,-5,-24);ctx.quadraticCurveTo(-11,-22,-14,-23);ctx.fill();ellipse(-4,-27,9,3,'#7b573c');
if(zakMood>0)ellipse(0,-1,2.5,2.2,'#563b59');
if(p.throwT>0){ellipse(-15,12,9,5,'#b4e16a77');ellipse(-21,9,5,3,'#a9d76b99');}ctx.restore();}
CHARACTERS.zak={name:'Zak',hp:130,speed:145,damage:6,rate:1.20,dodgeSpeed:500,dodgeTime:.28,specialCD:12};
PROFILES.zak={role:'GENTLE GIANT',tag:'Big heart. Bigger farts.',attack:'Toxic Farts',attackDesc:'Lingering poisonous clouds · automatic',special:'Laughing Gas',specialDesc:'Laughing enemies · crowd control · 12s',dodge:'Gas-Powered Launch',dodgeDesc:'Explosive escape · backblast · 1.65s'};
SPECIALS.zak=[['Extra Nasty','Laughing gas lasts 1.5 seconds longer.'],['Big Stink','Laughing gas radius grows by 25 units.'],['Toxic Overload','Laughing gas impact damage increases 35%.'],['Rapid Recharge','Laughing Gas cooldown 12 → 9 seconds.'],['Lingering Blast','Laughing gas also leaves a 3-second toxic cloud.']];
DODGES.zak=[['Long Launch','Travel 15% farther.'],['Big Backblast','Launch backblast radius increases.'],['Powerful Propulsion','Backblast damage doubles.'],['Quick Escape','Launch cooldown 1.65 → 1.25 seconds.'],['Stinky Landing','Leave a short toxic cloud at takeoff.']];
STAT_NAMES.zak=['Tough Stomach','Quick Feet','Rapid Gas','Cloud Collector','Noxious Strength'];
const zakNames=['Lasting Stink','Wide Cloud','Extra Toxic','Mega Cloud','Maximum Stench'];
const zakText=['Clouds linger an extra second.','Fart Cloud radius grows by 12 units.','Cloud tick damage increases from 6 to 8.','Cloud radius grows another 13 units.','Cloud damage increases another 25%.'];

// upgrades/progression.js — source of truth.
function statText(i){return [selected==='stef'?'+20 maximum health; heal those 20 points.':'+15 maximum health; heal those 15 points.','+5% movement speed.',isJodie()?'+15% Jodie claw damage.':'10% faster normal attacks.','+25% XP pickup reach.',isJodie()?'+10% permanent cat damage.':'+10% weapon damage.'][i];}

function effectiveStats(){let b=CHARACTERS[selected];if(state==='menu')return b;return {...b,hp:b.hp+(hasStat(0)?selected==='stef'?20:15:0)+(run.shopBought?.includes('shield')?20:0),speed:b.speed*(hasStat(1)?1.05:1)*(run.shopBought?.includes('speed')?1.05:1)*(shrineBuff?.kind==='speed'&&shrineBuff.left>0?1.15:1),rate:b.rate*normalRate(),dodgeSpeed:b.dodgeSpeed*(D(1)?selected==='jackson'?1.3:1.15:1)};}

function normalRate(){return !isJodie()&&hasStat(2)?.9:1;}

function damageScale(source){if(source==='cat')return hasStat(4)?1.1:1;if(source!=='weapon')return 1;return (run.shopBought?.includes('power')?1.1:1)*(isJodie()?(hasStat(2)?1.15:1):(hasStat(4)?1.1:1));}

function specialCooldown(){let base=CHARACTERS[selected].specialCD;return S(4)?({jackson:7,ava:7,stef:8,jodie:9,evie:8,zak:9}[selected]):base;}

function dodgeCooldown(){return isStef()?(D(4)?2.3:3):(D(4)?selected==='jackson'?1.05:1.25:1.65);}

function resetProgression(){shrine=null;shrineBuff=null;hearts=[];nextHeartAt=0;run={level:1,stage:0,stagePicks:0,special:0,dodge:0,stat:new Set(),earned:0,offers:[],history:[],firstArena:arenaKey,perk:null,rewardOffers:null,shopBought:[]};hazards=[];scheduled=[];decoy=null;}

function nextXP(){return 12+run.stagePicks*4;}

function weaponData(){return isZak()?[zakNames,zakText]:isEvie()?[evieNames,evieText]:isJodie()?[jodieNames,jodieText]:isStef()?[stefNames,stefText]:isAva()?[avaNames,avaText]:[upgradeNames,upgradeText];}

function buildOffers(){let candidates=[];if(tier<maxTier()){let [names,texts]=weaponData();candidates.push({path:'weapon',index:tier,name:names[tier],text:texts[tier],rank:tier+(isStef()||isEvie()?2:1)});}if(run.special<5){let [name,text]=SPECIALS[selected][run.special];candidates.push({path:'special',index:run.special,name,text,rank:run.special+1});}if(run.dodge<5){let [name,text]=DODGES[selected][run.dodge];candidates.push({path:'dodge',index:run.dodge,name,text,rank:run.dodge+1});}let stat=[0,1,2,3,4].filter(i=>!run.stat.has(i));if(stat.length){let index=stat[Math.floor(rewardRandom()*stat.length)];candidates.push({path:'stat',index,name:STAT_NAMES[selected][index],text:statText(index),rank:0});}
// Rotate the missing path deterministically; no duplicate paths in an offer.
if(candidates.length===4)candidates.splice(run.history.length%4,1);
// Fully finished paths leave the pool. Late-run spare slots are explicit recovery cards.
if(candidates.length<3)candidates.push({path:'recovery',name:'Field Recovery',text:'Restore 25% of maximum health.',rank:0});if(candidates.length<3)candidates.push({path:'refresh',name:'Catch Your Breath',text:'Fully recharge your special and dodge.',rank:0});if(candidates.length<3)candidates.push({path:'resupply',name:'Quick Resupply',text:'Restore 10% health and halve remaining special and dodge cooldowns.',rank:0});return candidates.slice(0,3);}

function showUpgrade(force=false){if(state!=='playing'||run.stagePicks>=8||run.earned<nextXP()||(!force&&time<(run.stagePicks===0?8:LEVEL_TIMES[run.stagePicks]-3)))return;state='upgrade';run.offers=buildOffers();$('panel').style.display='grid';$('panelTitle').textContent='LEVEL '+(run.level+1)+' · PICK ONE';$('panelName').textContent='Choose your upgrade';$('panelText').textContent='Weapon upgrades '+tier+'/'+maxTier()+' · Special '+run.special+'/5 · Dodge '+run.dodge+'/5 · Stats '+run.stat.size+'/5';$('panelButton').style.display='none';$('continue').style.display='none';$('back').style.display='none';$('upgradeChoices').innerHTML=run.offers.map((o,i)=>'<button class="upgradeCard" data-choice="'+i+'"><span>'+(o.path==='stat'?'STAT · ONE-OFF':o.path.toUpperCase()+(o.rank?' · '+o.rank+'/5':''))+'</span><b>'+o.name+'</b><small>'+o.text+'</small></button>').join('');$('upgradeChoices').style.display='grid';for(let i=0;i<run.offers.length;i++)$('upgradeChoices').children[i].onclick=()=>chooseUpgrade(i);}

function chooseUpgrade(i){if(state!=='upgrade'||!run.offers[i])return;let o=run.offers[i],oldHP=stats().hp;run.earned=Math.max(0,run.earned-nextXP());run.stagePicks++;run.level++;if(o.path==='weapon')tier++;else if(o.path==='special')run.special++;else if(o.path==='dodge')run.dodge++;else if(o.path==='stat')run.stat.add(o.index);else if(o.path==='recovery')p.hp=Math.min(stats().hp,p.hp+stats().hp*.25);else if(o.path==='refresh')p.chargeCD=p.dodgeCD=0;if(o.path==='resupply'){p.hp=Math.min(stats().hp,p.hp+stats().hp*.1);p.chargeCD*=.5;p.dodgeCD*=.5;}run.history.push({path:o.path,index:o.index,name:o.name});if(o.path==='stat'&&o.index===0)p.hp+=stats().hp-oldHP;syncCats();scaleLivingEnemies();state='playing';$('panel').style.display='none';$('upgradeChoices').style.display='none';pop(p.x,p.y,'#f7d88a',18);updateHud();showUpgrade();}

function progressStep(){if(run.stagePicks<8&&time>=LEVEL_TIMES[run.stagePicks])run.earned=Math.max(run.earned,nextXP());showUpgrade();}

function enemyScale(kind){return {hp:(1+.06*(run.level-1))*(Math.pow(kind==='boss'?1.5:1.35,run.stage)),damage:(1+.03*(run.level-1))*Math.pow(1.2,run.stage)};}

function applyEnemyScale(e){let f=enemyScale(e.kind),old=e.scaleHP||1;e.hp*=f.hp/old;e.maxHp*=f.hp/old;e.scaleHP=f.hp;e.damageScale=f.damage;}

function scaleLivingEnemies(){for(let e of enemies)if(e.hp>0)applyEnemyScale(e);}

function pressureTime(){return Math.max(time*.45,run.stagePicks*6+(run.stage?12:0));}

function stageSpawnDelay(base){return base/(1+.045*run.stagePicks+(run.stage?.12:0));}
const BOSS_TIME=105,LEVEL_TIMES=[8,19,31,43,56,69,83,98];
let run={level:1,stage:0,stagePicks:0,special:0,dodge:0,stat:new Set(),earned:0,offers:[],history:[],firstArena:'rugby',perk:null,rewardOffers:null,shopBought:[]},hazards=[],scheduled=[],decoy=null;
const S=n=>run.special>=n,D=n=>run.dodge>=n,hasStat=n=>run.stat.has(n);

// upgrades/rewards.js — source of truth.
function rewardRandom(){return rewardRolls.length?rewardRolls.shift():Math.random();}

function rollPerks(){let keys=Object.keys(PERKS);for(let i=keys.length-1;i>0;i--){let j=Math.floor(rewardRandom()*(i+1));[keys[i],keys[j]]=[keys[j],keys[i]];}return keys.slice(0,3);}

function openBossReward(){if(state!=='won'||run.stage!==0||run.perk)return;if(!run.rewardOffers)run.rewardOffers=rollPerks();state='perk';$('panel').style.display='grid';$('panelTitle').textContent='BOSS REWARD · CHOOSE ONE';$('panelName').textContent='Give this run a new twist';$('panelText').textContent='Three random perks. Pick one for the next arena. No rerolls.';$('panelButton').style.display='none';$('continue').style.display='none';$('back').style.display='none';$('upgradeChoices').innerHTML=run.rewardOffers.map((key,i)=>'<button class="upgradeCard perkCard" data-choice="'+i+'" style="--perk:'+PERKS[key].color+'"><span>BOSS PERK</span><b>'+PERKS[key].name+'</b><small>'+PERKS[key].text+'</small></button>').join('');$('upgradeChoices').style.display='grid';for(let i=0;i<3;i++)$('upgradeChoices').children[i].onclick=()=>chooseBossPerk(i);}

function chooseBossPerk(i){if(state!=='perk'||run.stage!==0||run.perk||!run.rewardOffers?.[i])return;run.perk=run.rewardOffers[i];run.vampBudget=2;run.lightningAt=-1;state='won';continueRun();}

function recoverHealth(amount){let old=p.hp;p.hp=Math.min(stats().hp,p.hp+Math.max(0,amount));let healed=p.hp-old;if(healed>.01){float(p.x,p.y-24,'+'+healed.toFixed(healed<1?1:0),'#bcf0a9');radialEffect(p.x,p.y,17,'#95ddb1');}return healed;}

function dropHeart(e){if(e.kind==='boss'||hearts.length>=6)return;let milestone=kills%12===0,low=p.hp/stats().hp<.45,chance=low?.28:.06;if(milestone||(time>=nextHeartAt&&rewardRandom()<chance)){let q=walkable(e.x,e.y,7);hearts.push({x:q.x,y:q.y,life:30,heal:Math.max(10,Math.round(stats().hp*.10))});nextHeartAt=time+2.5;}}

function hitPerk(e,actual,source){if(!run.perk||actual<=0||source==='perk'||source==='status')return;
if(run.perk==='vampiric'){let amount=Math.min(actual*.04,run.vampBudget||0);if(p.hp<stats().hp){let healed=recoverHealth(amount);run.vampBudget=Math.max(0,(run.vampBudget||0)-healed);}return;}
if(run.perk==='lightning'){if(time>=(run.lightningAt||-1)){let other=nearest(e,new Set([e.id]),120);if(other){run.lightningAt=time+.65;fx.push({x:e.x,y:e.y,vx:0,vy:0,life:.18,max:.18,arcX:other.x,arcY:other.y,color:'#f3e49b',r:0});damageEnemy(other,8,0,0,false,'perk');}}return;}
if(e.hp<=0)return;
if(run.perk==='fire'){e.burnUntil=time+2.4;if(!(e.burnNext>time))e.burnNext=time+.4;}
else if(run.perk==='ice'){e.frostUntil=time+1.2;e.slowUntil=Math.max(e.slowUntil||0,e.frostUntil);}
else if(run.perk==='wounding'){if(time>=(e.nextWound||0)){if(!(e.bleedUntil>time))e.bleedStacks=0;e.bleedStacks=Math.min(3,(e.bleedStacks||0)+1);e.nextWound=time+.2;}e.bleedUntil=time+3;if(!(e.bleedNext>time))e.bleedNext=time+.5;}}

function onDefeated(e){dropHeart(e);if(run.perk==='fire'&&e.burnUntil>time){let other=nearest(e,new Set([e.id]),65);if(other){other.burnUntil=Math.max(other.burnUntil||0,time+1.2);if(!(other.burnNext>time))other.burnNext=time+.4;radialEffect(other.x,other.y,13,'#efab64');}}}

function rewardStep(dt){if(run.perk==='vampiric')run.vampBudget=Math.min(2,(run.vampBudget||0)+2*dt);
for(let e of enemies){if(e.hp<=0)continue;if(e.burnUntil>time&&time>=e.burnNext){e.burnNext=time+.4;damageEnemy(e,2,0,0,false,'perk');}if(e.hp>0&&e.bleedUntil>time&&time>=e.bleedNext){e.bleedNext=time+.5;damageEnemy(e,1.5*(e.bleedStacks||1),0,0,false,'perk');}}
for(let i=hearts.length-1;i>=0;i--){let h=hearts[i];h.life-=dt;let d=dist(h,p);if(d<52){let move=Math.min(d,150*dt);h.x+=(p.x-h.x)/(d||1)*move;h.y+=(p.y-h.y)/(d||1)*move;}if(d<17&&p.hp<stats().hp){recoverHealth(h.heal);hearts.splice(i,1);}else if(h.life<=0)hearts.splice(i,1);}}

function drawHeart(h){ctx.save();ctx.translate(h.x,h.y+Math.sin(time*4)*1.5);ellipse(0,6,7,2.2,'#173b2955');ctx.fillStyle='#e59b98';ctx.strokeStyle='#ffe1be';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(0,5);ctx.bezierCurveTo(-12,-2,-5,-10,0,-5);ctx.bezierCurveTo(5,-10,12,-2,0,5);ctx.fill();ctx.stroke();ctx.restore();}

function drawEnemyHealth(e){if(e.hp<=0||e.kind==='boss'||(e.hp>=e.maxHp&&e.kind!=='heavy'))return;let width=e.kind==='heavy'?29:21,y=e.y-e.r-18,ratio=clamp(e.hp/e.maxHp,0,1);ctx.fillStyle='#152b25dd';ctx.fillRect(e.x-width/2-1,y-1,width+2,5);ctx.fillStyle=ratio>.6?'#b6d997':ratio>.3?'#f1d17c':'#ee9380';ctx.fillRect(e.x-width/2,y,width*ratio,3);}

function drawStatus(e){if(e.hp<=0)return;if(e.burnUntil>time){ctx.strokeStyle='#efad68';ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(e.x-5,e.y+3);ctx.lineTo(e.x-2,e.y-3);ctx.lineTo(e.x,e.y+2);ctx.lineTo(e.x+3,e.y-5);ctx.lineTo(e.x+5,e.y+3);ctx.stroke();}if(e.frostUntil>time){ctx.strokeStyle='#9bdcf2';ctx.lineWidth=1.4;ctx.beginPath();ctx.ellipse(e.x,e.y+e.r*.5,e.r+2,4,0,0,TAU);ctx.stroke();}if(e.bleedUntil>time){for(let i=0;i<(e.bleedStacks||1);i++)line([[e.x-5+i*4,e.y+1],[e.x-3+i*4,e.y+7]],'#df8293',1.5);}}

function drawPlaytestExtras(){for(let h of hearts)drawHeart(h);for(let e of enemies){drawEnemyHealth(e);drawStatus(e);}for(let t of scheduled)if(t.kind==='meteor'&&!t.done){let u=1-clamp(t.wait/t.fall,0,1),x=t.x+(1-u)*80,y=t.y-(1-u)*200;line([[x+23,y-55],[x,y]],'#efbeed88',9);line([[x+12,y-30],[x,y]],'#ffdfb9cc',4);starArt(x,y,13+u*4,time*4);}}
const PERKS={fire:{name:'Fire',color:'#f5a15a',text:'Hits burn enemies. Burning defeats spread a shorter burn to one nearby foe.'},ice:{name:'Ice',color:'#95dcf1',text:'Hits slow enemies by 30% for 1.2s. Refreshes rather than multiplying other slows.'},lightning:{name:'Lightning',color:'#e5d975',text:'A hit arcs for 8 damage to another enemy within 120 reach, at most once every 0.65s.'},vampiric:{name:'Vampiric',color:'#ba9ce5',text:'Steal 4% of actual hit damage as health, limited to 2 health/sec across all attacks and companions.'},wounding:{name:'Wounding',color:'#ee8c91',text:'Hits build up to three bleeds. Each stack deals 3 damage/sec for 3s; stacking is rate-limited.'}};
let hearts=[],nextHeartAt=0,rewardRolls=[];

// world/hub.js — source of truth.
function finish(won){if(state!=='playing')return;state=won?'won':'lost';if(won){hub.coins+=60;run.visited=run.visited||[];if(!run.visited.includes(arenaKey))run.visited.push(arenaKey);}let more=won&&run.visited.length<3;$('panel').style.display='grid';$('upgradeChoices').style.display='none';$('back').style.display='block';$('panelButton').style.display='block';$('panelTitle').textContent=won?arena().short.toUpperCase()+' CLEARED':'GOOD RUN, '+stats().name.toUpperCase();$('panelName').textContent=won?arena().bossShort+' DEFEATED':'Have another go';$('panelText').textContent='Level '+run.level+' · '+run.history.length+' upgrades · '+kills+' enemies beaten';$('continue').style.display=more?'block':'none';$('continue').textContent=run.perk?'RETURN TO BURNTWOOD':'CHOOSE PERK · RETURN TO BURNTWOOD';$('continue').onclick=()=>run.perk?continueRun():openBossReward();$('panelButton').textContent=won?'FINISH RUN':'NEW RUN';$('panelButton').onclick=won?returnToMenu:startJourney;}

function continueRun(){if(state!=='won'||(run.visited||[]).length>=3)return;if(!run.perk){openBossReward();return;}recoverHealth(stats().hp*.2);enterHub(false);}

function startJourney(){reset();run.visited=[];hub.coins=120;enterHub(true);}

function enterHub(first=false){state='hub';enemies=[];balls=[];enemyShots=[];pendingShots=[];gems=[];fx=[];warnings=[];hazards=[];scheduled=[];hearts=[];shrine=null;shrineBuff=null;boss=null;bossSpawned=false;p.action=null;p.swing=p.claws=null;p.frenzy=0;p.vx=p.vy=0;stick.x=stick.y=0;p.x=450;p.y=first?620:690;p.chargeCD=p.dodgeCD=0;resetCats();syncCats();resetDucks();cam={x:p.x,y:p.y};hub.animals=Array.from({length:24},(_,i)=>({x:70+rand()*760,y:110+rand()*1080,a:rand()*TAU,t:rand()*3,kind:i%3}));$('panel').style.display='none';$('bossHud').style.display='none';$('hubMap').style.display='block';$('hubMenu').style.display='block';$('shrineUse').style.display='none';$('hubShop').style.display='none';$('charge').firstChild.textContent='ENTER';$('dodge').firstChild.textContent='DODGE';updateHubHud();}

function hubPosition(x,y,r=14){x=clamp(x,35,865);y=clamp(y,65,1235);for(let b of hub.solids){let qx=clamp(x,b.x,b.x+b.w),qy=clamp(y,b.y,b.y+b.h),dx=x-qx,dy=y-qy,d=Math.hypot(dx,dy);if(d<r){if(d>.001){x=qx+dx/d*r;y=qy+dy/d*r;}else{let options=[{n:Math.abs(x-b.x),x:b.x-r,y},{n:Math.abs(x-b.x-b.w),x:b.x+b.w+r,y},{n:Math.abs(y-b.y),x,y:b.y-r},{n:Math.abs(y-b.y-b.h),x,y:b.y+b.h+r}].sort((a,b)=>a.n-b.n);x=options[0].x;y=options[0].y;}}}return{x,y};}

function stepHub(dt){hub.time+=dt;let dx=stick.x+(keys.d||keys.ArrowRight?1:0)-(keys.a||keys.ArrowLeft?1:0),dy=stick.y+(keys.s||keys.ArrowDown?1:0)-(keys.w||keys.ArrowUp?1:0),n=Math.hypot(dx,dy);if(n>1){dx/=n;dy/=n;}let sm=1-Math.exp(-dt*15);p.vx=lerp(p.vx,dx*stats().speed,sm);p.vy=lerp(p.vy,dy*stats().speed,sm);let q=hubPosition(p.x+p.vx*dt,p.y+p.vy*dt);p.x=q.x;p.y=q.y;p.walk+=Math.hypot(p.vx,p.vy)*dt*.065;if(n>.1)p.dir={x:dx/(n>1?1:n),y:dy/(n>1?1:n)};for(let c of cats){let a=c.slot*1.7,goal={x:p.x+Math.cos(a)*28,y:p.y+18+Math.sin(a)*12},d=dist(c,goal)||1,m=Math.min(d,175*dt);c.x+=(goal.x-c.x)/d*m;c.y+=(goal.y-c.y)/d*m;}for(let a of hub.animals){a.t-=dt;if(a.t<=0){a.a=rand()*TAU;a.t=1+rand()*4;}let q=hubPosition(a.x+Math.cos(a.a)*18*dt,a.y+Math.sin(a.a)*18*dt,5);a.x=q.x;a.y=q.y;}cam.x=lerp(cam.x,p.x,1-Math.exp(-dt*8));cam.y=lerp(cam.y,p.y,1-Math.exp(-dt*8));updateHubHud();}

function updateHubHud(){hub.near=hub.portals.find(a=>dist(p,a)<75&&!run.visited?.includes(a.key))||null;hub.nearShop=dist(p,hub.shop)<85;$('arenaHud').textContent='BURNTWOOD · WALK TO AN ARENA';$('timer').textContent=(run.visited?.length||0)+'/3 CLEARED';$('hpText').textContent=Math.ceil(p.hp)+' / '+stats().hp;$('hpFill').style.width=p.hp/stats().hp*100+'%';$('level').textContent='LV '+run.level;$('build').textContent=hub.near?'ENTER '+ARENAS[hub.near.key].short.toUpperCase():hub.nearShop?'VISIT WILDS SHOP':'Explore the real Burntwood landmarks';actionButton('charge',!!(hub.near||hub.nearShop),hub.near?'ENTER':hub.nearShop?'SHOP':'FIND GATE');actionButton('dodge',false,'SAFE HUB');$('perkHud').textContent='BUILD '+BUILD_ID+' · Progression pauses here';}

function enterNearby(){if(state==='hub'&&hub.nearShop)return openHubShop();if(state==='hub'&&hub.near)enterArena(hub.near.key);}

function enterArena(key){if(state!=='hub'||!ARENAS[key]||run.visited?.includes(key))return false;arenaKey=key;run.stage=run.visited?.length||0;run.stagePicks=0;run.earned=0;run.offers=[];time=0;enemies=[];balls=[];enemyShots=[];pendingShots=[];gems=[];fx=[];warnings=[];hazards=[];scheduled=[];decoy=null;hearts=[];nextHeartAt=0;boss=null;bossSpawned=false;nextSpawn=.8;p.x=450;p.y=780;p.vx=p.vy=0;p.extX=p.extY=0;p.action=null;p.swing=p.claws=null;p.frenzy=0;p.catTarget=null;p.hitIds.clear();p.inv=1.5;p.attack=.4;p.chargeCD=p.dodgeCD=0;resetCats();syncCats();resetDucks();cam={x:p.x,y:p.y};state='playing';$('hubMap').style.display='none';$('hubMenu').style.display='block';$('charge').firstChild.textContent=isEvie()?'ASSEMBLE':isJodie()?'KITTENS':isStef()?'BY ORDER!':isAva()?'GLITTER':'CHARGE';$('dodge').firstChild.textContent=isStef()?'PUSH':'DODGE';$('arenaHud').textContent=arena().name.toUpperCase();$('bossHud').style.display='none';$('panel').style.display='none';shrineBuff=null;shrine=rewardRandom()<.2?{x:arenaKey==='chasewater'?380:180,y:600,used:false}:null;updateHud();return true;}

function drawBuilding(b,i){ctx.fillStyle='#233e3444';ctx.fillRect(b.x+8,b.y+10,b.w,b.h);ctx.fillStyle=['#ad9a7a','#a88c76','#9c9c85'][i%3];ctx.fillRect(b.x,b.y,b.w,b.h);ctx.fillStyle='#66574f';ctx.beginPath();ctx.moveTo(b.x-6,b.y+12);ctx.lineTo(b.x+b.w/2,b.y-24);ctx.lineTo(b.x+b.w+6,b.y+12);ctx.closePath();ctx.fill();for(let x=b.x+18;x<b.x+b.w-15;x+=32){ctx.fillStyle='#b8d7cc';ctx.fillRect(x,b.y+32,16,18);line([[x+8,b.y+32],[x+8,b.y+50]],'#6f7466',1);}ctx.fillStyle='#504a40';ctx.fillRect(b.x+b.w/2-10,b.y+b.h-27,20,27);}


function mapTree(x,y,r){ellipse(x+3,y+6,r,r*.6,'#294c34');ellipse(x-4,y-5,r*.82,r*.75,'#48754a');ellipse(x+4,y-9,r*.5,r*.5,'#6c9759');}
function mapLabel(x,y,name){ctx.fillStyle='#493c2c';ctx.fillRect(x-59,y-29,118,27);ctx.strokeStyle='#d4b475';ctx.lineWidth=2;ctx.strokeRect(x-59,y-29,118,27);ctx.textAlign='center';ctx.fillStyle='#ffebbb';ctx.font='bold 12px Georgia';ctx.fillText(name,x,y-11);}
function drawHubScenery(){
 ctx.fillStyle='#718d60';ctx.fillRect(0,0,900,1300);
 // Local geography: Sankey's Corner northeast; Chasewater southwest; rugby immediately east.
 ctx.fillStyle='#477e8d';ctx.beginPath();ctx.moveTo(0,800);ctx.bezierCurveTo(150,720,280,790,290,920);ctx.bezierCurveTo(340,1110,120,1190,0,1110);ctx.closePath();ctx.fill();ctx.strokeStyle='#b1d9d0';ctx.lineWidth=8;ctx.stroke();
 for(let i=0;i<16;i++){let y=800+i*20;line([[28+i%3*30,y],[56+i%3*30,y-3]],'#9fd0ca',2);}
 // The quarry is a fictionalised arena, so its exact placement is illustrative.
 for(let k=0;k<5;k++){ellipse(755,1060,130-k*16,120-k*17,['#a38b6c','#b7a17e','#c6b08b','#d4c19d','#e1cba6'][k]);}ellipse(755,1060,55,33,'#588a94');
 ctx.fillStyle='#e9bb61';ctx.fillRect(793,1008,26,15);line([[803,1012],[791,981],[774,1002]],'#e6b961',7);
 // Streets and footpaths linking the four locations.
 const roads=[[[455,620],[520,430],[680,225]],[[455,620],[290,750],[205,850]],[[455,620],[445,940]],[[455,620],[650,825],[745,1050]],[[205,850],[445,940],[745,1050]]];
 for(let a of roads)line(a,'#56724f',84);for(let a of roads)line(a,'#c5b18b',52);
 // Rugby pitch and iconic uprights east of Chasewater.
 ctx.fillStyle='#63914f';ctx.fillRect(360,862,170,165);ctx.strokeStyle='#e1e9c8';ctx.lineWidth=3;ctx.strokeRect(372,875,146,140);line([[445,875],[445,1015]],'#e2e7c3',2);line([[419,885],[419,841]],'#f4e4bd',5);line([[467,885],[467,841]],'#f4e4bd',5);line([[419,850],[467,850]],'#f4e4bd',5);
 // Chasewater heritage railway.
 line([[301,781],[328,914],[355,1112]],'#56534a',10);line([[316,781],[343,914],[370,1112]],'#56534a',10);for(let k=0;k<21;k++){let y=790+k*15,x=310+(y-790)*.17;line([[x-8,y],[x+24,y]],'#a79b7a',3);}
 // Sankey's Corner town square, recognisable shopping frontage and library.
 ctx.fillStyle='#b3a48b';ctx.fillRect(562,96,286,240);
 for(let k=0;k<4;k++){drawBuilding({x:580+k*65,y:134,w:61,h:100},k);ctx.fillStyle=k%2?'#a25549':'#3d765c';ctx.fillRect(580+k*65,198,61,13);}
 ctx.fillStyle='#285641';ctx.fillRect(579,218,132,24);ctx.fillStyle='#f8e2a3';ctx.font='bold 13px Georgia';ctx.fillText('SANKEY’S CORNER',645,235);
 ctx.fillStyle='#c5ad88';ctx.fillRect(530,352,60,61);ctx.fillStyle='#765f46';ctx.fillRect(521,343,77,15);mapLabel(550,339,'LEISURE CENTRE');
 ctx.fillStyle='#b9a280';ctx.fillRect(370,482,95,62);ctx.fillStyle='#6d5945';ctx.fillRect(361,468,113,19);mapLabel(415,459,'CHASE TERRACE');
 for(let k=0;k<130;k++){let x=26+(k*137+Math.floor(k/11)*19)%842,y=30+(k*233+Math.floor(k/7)*27)%1220;if((x>550&&x<850&&y<350)||(x<320&&y>790&&y<1150)||(x>355&&x<540&&y>860&&y<1030)||(x>625&&y>960))continue;mapTree(x,y,9+k%12);}
 // Shop beside Sankey's Corner: visible keeper, striped awning and bottles.
 let q=hub.shop;ctx.fillStyle='#614533';ctx.fillRect(q.x-42,q.y-18,84,46);ctx.fillStyle='#e7c78a';ctx.fillRect(q.x-50,q.y-32,100,18);for(let k=0;k<5;k++){ctx.fillStyle=k%2?'#e4bf85':'#a75850';ctx.fillRect(q.x-50+k*20,q.y-32,20,18);}ellipse(q.x+12,q.y-6,10,10,'#c4b29a');ellipse(q.x+10,q.y-15,11,7,'#594939');for(let k=0;k<3;k++){ctx.fillStyle=['#b95251','#609cc1','#87b866'][k];ctx.fillRect(q.x-33+k*18,q.y+6,9,13);}mapLabel(q.x,q.y-43,'WILDS SHOP');
 mapLabel(205,754,'CHASEWATER');mapLabel(445,1083,'RUGBY CLUB');mapLabel(745,1193,'BURNTWOOD QUARRY');mapLabel(682,100,'SANKEY’S CORNER');
 for(let a of hub.animals){ellipse(a.x,a.y,5,4,['#c9ae89','#dfdbbd','#b88353'][a.kind]);}
}
function drawHub(){ctx.setTransform(DPR,0,0,DPR,0,0);ctx.fillStyle='#34533b';ctx.fillRect(0,0,W,H);ctx.save();ctx.translate(W/2-cam.x*scale,H*.47-cam.y*scale);ctx.scale(scale,scale);drawHubScenery();for(let g of hub.portals){let done=run.visited?.includes(g.key);radialDraw(g.x,g.y,37,done?'#92b38b':'#e8c27d');ctx.fillStyle=done?'#91b38a':'#c9a365';ctx.fillRect(g.x-25,g.y-12,6,36);ctx.fillRect(g.x+19,g.y-12,6,36);line([[g.x-25,g.y-12],[g.x+25,g.y-12]],'#f7db9d',5);ctx.font='bold 12px system-ui';ctx.fillStyle='#fff3cc';ctx.textAlign='center';ctx.fillText(ARENAS[g.key].short.toUpperCase(),g.x,g.y-39);ctx.font='10px system-ui';ctx.fillText(done?'CLEARED':'ENTER',g.x,g.y+44);}for(let c of cats)drawCat(c);CHARACTER_MODULES[selected].draw();ctx.restore();drawHubMap();}
function drawHubMap(){let c=$('hubMap').getContext('2d');c.clearRect(0,0,118,150);c.fillStyle='#254f3e';c.fillRect(0,0,118,150);c.fillStyle='#5b8f9a';c.beginPath();c.ellipse(24,110,21,24,0,0,TAU);c.fill();c.strokeStyle='#c4ad85';c.lineWidth=5;c.beginPath();c.moveTo(60,75);c.lineTo(86,30);c.moveTo(60,75);c.lineTo(28,103);c.moveTo(60,75);c.lineTo(90,120);c.stroke();for(let g of hub.portals){let x=g.x/900*110+4,y=g.y/1300*140+5;c.fillStyle=run.visited?.includes(g.key)?'#83b18b':'#f2cb7d';c.fillRect(x-4,y-4,8,8);c.fillStyle='#fff7d6';c.font='bold 9px system-ui';c.textAlign='center';c.fillText({rugby:'R',chasewater:'C',sankeys:'S',quarry:'Q'}[g.key],x,y-7);}c.fillStyle='#f6e8c4';c.beginPath();c.arc(p.x/900*110+4,p.y/1300*140+5,4,0,TAU);c.fill();}

function interactWorld(){if(state==='hub')enterNearby();else if(state==='playing'&&shrine&&!shrine.used&&dist(p,shrine)<70)openShrine();}
const hub={time:0,near:null,nearShop:false,coins:0,animals:[],shop:{x:750,y:378},solids:[],portals:[{key:'sankeys',x:680,y:225},{key:'chasewater',x:205,y:850},{key:'rugby',x:445,y:940},{key:'quarry',x:745,y:1050}]};

const HUB_SHOP_ITEMS=[{id:'heal',name:'Healing Potion',detail:'Restore 50 health',cost:30},{id:'full',name:'Full Recovery',detail:'Restore all health',cost:75},{id:'speed',name:'Swift Boots',detail:'+5% movement speed this run',cost:50},{id:'power',name:'Stronger Paws',detail:'+10% weapon damage this run',cost:50},{id:'shield',name:'Protective Charm',detail:'+20 maximum health this run',cost:75}];
function openHubShop(){if(state!=='hub'||!hub.nearShop)return false;state='shop';$('hubShop').style.display='flex';renderHubShop();return true;}
function closeHubShop(){if(state!=='shop')return;state='hub';$('hubShop').style.display='none';updateHubHud();}
function renderHubShop(){$('shopCoins').textContent=hub.coins+' coins';$('shopItems').innerHTML=HUB_SHOP_ITEMS.map(a=>{let owned=run.shopBought?.includes(a.id),disabled=owned||hub.coins<a.cost||((a.id==='heal'||a.id==='full')&&p.hp>=stats().hp);return '<button class="shopItem" data-item="'+a.id+'" '+(disabled?'disabled':'')+'><b>'+a.name+'</b><small>'+a.detail+'</small><span>'+a.cost+' coins'+(owned?' · OWNED':'')+'</span></button>';}).join('');for(let b of $('shopItems').children)b.onclick=()=>buyHubItem(b.dataset.item);}
function buyHubItem(id){if(state!=='shop')return false;let a=HUB_SHOP_ITEMS.find(x=>x.id===id);if(!a||hub.coins<a.cost||run.shopBought?.includes(id))return false;if((id==='heal'||id==='full')&&p.hp>=stats().hp)return false;hub.coins-=a.cost;if(id==='heal')recoverHealth(50);else if(id==='full')recoverHealth(stats().hp);else{run.shopBought=run.shopBought||[];run.shopBought.push(id);if(id==='shield')p.hp+=20;}renderHubShop();return true;}

// world/shrines.js — source of truth.
function openShrine(){if(state!=='playing'||!shrine||shrine.used||dist(p,shrine)>=70)return;shrine.used=true;recoverHealth(stats().hp*.2);let keys=Object.keys(BLESSINGS);for(let i=keys.length-1;i>0;i--){let j=Math.floor(rewardRandom()*(i+1));[keys[i],keys[j]]=[keys[j],keys[i]];}shrine.offers=keys.slice(0,3);state='shrine';$('panel').style.display='grid';$('panelTitle').textContent='WAYSIDE SHRINE';$('panelName').textContent='A little help from Burntwood';$('panelText').textContent='20% health restored. Choose one 30-second blessing.';for(let id of ['continue','panelButton','back'])$(id).style.display='none';$('upgradeChoices').style.display='grid';$('upgradeChoices').innerHTML=shrine.offers.map((k,i)=>'<button class="upgradeCard" data-choice="'+i+'"><span>30 SECOND BLESSING</span><b>'+BLESSINGS[k][0]+'</b><small>'+BLESSINGS[k][1]+'</small></button>').join('');for(let i=0;i<3;i++)$('upgradeChoices').children[i].onclick=()=>chooseShrine(i);}

function chooseShrine(i){if(state!=='shrine'||!shrine.offers[i])return;shrineBuff={kind:shrine.offers[i],left:30,shield:stats().hp*.2};state='playing';$('panel').style.display='none';$('shrineUse').style.display='none';}

function stepShrine(dt){if(shrineBuff){shrineBuff.left-=dt;if(shrineBuff.left<=0)shrineBuff=null;else if(shrineBuff.kind==='regeneration')p.hp=Math.min(stats().hp,p.hp+stats().hp*.01*dt);}let ready=shrine&&!shrine.used&&dist(p,shrine)<70;$('shrineUse').style.display=ready?'block':'none';$('blessingHud').textContent=shrineBuff?BLESSINGS[shrineBuff.kind][0]+' · '+Math.ceil(shrineBuff.left)+'s':'';}

function drawShrine(){if(shrine){ellipse(shrine.x,shrine.y+9,17,6,'#243f3055');ctx.fillStyle=shrine.used?'#7d8b72':'#b3b99a';ctx.fillRect(shrine.x-11,shrine.y-24,22,33);ellipse(shrine.x,shrine.y-24,16,5,'#d1cbb0');starArt(shrine.x,shrine.y-31,7,0);if(!shrine.used)radialDraw(shrine.x,shrine.y,26+Math.sin(time*3)*2,'#e6d591');}if(shrineBuff?.kind==='barrier'&&shrineBuff.shield>0)radialDraw(p.x,p.y,27,'#9cdcf2');}
let shrine=null,shrineBuff=null;
const BLESSINGS={barrier:['Barrier','Absorb 20% max-health damage for up to 30 seconds.'],regeneration:['Regeneration','Restore 1% max health each second for 30 seconds.'],attack:['Attack Boost','20% extra damage for 30 seconds.'],speed:['Speed Boost','15% faster movement for 30 seconds.'],critical:['Lucky Paws','20% chance of a 1.5× critical hit for 30 seconds.']};

// arenas/sankeys.js — source of truth.
function sankeyWave(){let pt=pressureTime(),r=rand(),k=pt>28&&r>.84?'heavy':pt>15&&r<.22?'trader':pt>7&&r>.6?'courier':'pigeon';spawn(k);if(pt>15&&rand()<.4)spawn('pigeon');nextSpawn=stageSpawnDelay(Math.max(.62,1.05-time*.002));}

function spawnMarket(kind,at){kind=kind==='swarm'?'pigeon':kind==='charger'?'courier':kind;let spec={pigeon:[19,12,54],courier:[36,16,65],trader:[52,17,26],heavy:[100,23,30],boss:[1200,42,34]}[kind]||[19,12,54],a=rand()*TAU,r=310,q=walkable(at?.x??p.x+Math.cos(a)*r,at?.y??p.y+Math.sin(a)*r,spec[1]);let e={id:++id,kind,market:true,x:q.x,y:q.y,r:spec[1],hp:spec[0],maxHp:spec[0],speed:spec[2],kx:0,ky:0,flash:0,stagger:0,age:rand()*5,mode:'walk',timer:1.5+rand(),attackCD:0,dx:0,dy:1,sequence:0};applyEnemyScale(e);enemies.push(e);if(kind==='boss'){boss=e;bossSpawned=true;float(p.x,p.y-60,'MAKE WAY FOR THE TROLLEY KING!','#f3d38d');}}

function stepMarketEnemy(e,dt){let dx=p.x-e.x,dy=p.y-e.y,d=Math.hypot(dx,dy)||1,mx=dx/d,my=dy/d,speed=e.speed;if(e.stunUntil>time){e.timer+=dt;speed=0;}else if(e.kind==='trader'){if(e.mode==='wind'){speed=0;if(e.timer<=0){shootMud(e);e.mode='walk';e.timer=2.8;}}else{if(d<180){mx=-mx;my=-my;}else if(d<260)speed=0;if(e.timer<=0){e.mode='wind';e.timer=.85;e.dx=dx/d;e.dy=dy/d;}}}else if(['courier','heavy','boss'].includes(e.kind)){if(e.mode==='walk'&&e.timer<=0){e.mode=e.kind==='boss'&&e.sequence++%2===1?'basketWind':'wind';e.timer=e.kind==='boss'?1.05:.7;e.dx=dx/d;e.dy=dy/d;}else if(e.mode==='basketWind'){speed=0;if(e.timer<=0){let count=e.hp<e.maxHp*.5?5:3,a=Math.atan2(e.dy,e.dx);for(let i=0;i<count&&enemyShots.length<60;i++){let angle=a+(i-(count-1)/2)*.22;enemyShots.push({x:e.x,y:e.y,px:e.x,py:e.y,vx:Math.cos(angle)*145,vy:Math.sin(angle)*145,r:6,life:3.5,damage:7,damageScale:e.damageScale});}e.mode='recover';e.timer=1.5;pop(e.x,e.y,'#e6be7c',12);}}else if(e.mode==='wind'){speed=0;if(e.timer<=0){e.mode='rush';e.timer=e.kind==='boss'?.9:.48;}}else if(e.mode==='rush'){mx=e.dx;my=e.dy;speed=e.kind==='boss'?330:e.kind==='courier'?250:195;if(e.timer<=0||e.x<45||e.x>855||e.y<70||e.y>1230){e.mode='recover';e.timer=e.kind==='boss'?1.65:1.1;}}else if(e.mode==='recover'){speed=0;if(e.timer<=0){e.mode='walk';e.timer=e.kind==='boss'?1.1:2.1;}}}else{let a=e.id*2.4;mx=(p.x+Math.cos(a)*25-e.x)/d;my=(p.y+Math.sin(a)*25-e.y)/d;}if(e.slowUntil>time)speed*=.7;if(e.stagger>0)speed*=.2;let q=walkable(e.x+mx*speed*dt+e.kx*dt,e.y+my*speed*dt+e.ky*dt,e.r);e.x=q.x;e.y=q.y;e.kx*=Math.exp(-dt*8);e.ky*=Math.exp(-dt*8);applyChaseContact(e);}

function drawMarketWarnings(){for(let e of enemies)if(e.market&&e.hp>0&&['wind','basketWind'].includes(e.mode)){ctx.save();ctx.translate(e.x,e.y);ctx.rotate(Math.atan2(e.dy,e.dx));ctx.fillStyle='#edb75b33';ctx.fillRect(0,-e.r,e.kind==='boss'?340:170,e.r*2);line([[0,-e.r],[e.kind==='boss'?340:170,-e.r]],'#f8d48d',2);ctx.restore();}}

function drawMarketEnemy(e){ctx.save();ctx.translate(e.x,e.y);let big=e.kind==='boss',s=big?2:1;ctx.scale(s,s);ellipse(0,13,14,5,'#253e3944');let bounce=Math.sin(e.age*10)*(e.mode==='wind'?0:1.2);ctx.translate(0,bounce);let color=e.flash>0?'#fff1cf':e.kind==='courier'?'#be7855':e.kind==='trader'?'#728da5':'#899394';if(e.kind==='pigeon'){ellipse(0,2,9,10,color);ellipse(-4,2,5,7,'#6b7d7a');ellipse(2,-8,6,6,color);ellipse(2,-5,5,2,'#87a6a0');ellipse(4,-9,1,1,'#202d2b');line([[7,-7],[11,-6]],'#d5ad77',2);line([[-3,12],[-4,15]],'#d4a178',1);line([[3,12],[4,15]],'#d4a178',1);}else{ellipse(0,-9,8,8,'#dec4a0');ellipse(-3,-10,1,1.5,'#24352d');ellipse(3,-10,1,1.5,'#24352d');ctx.fillStyle=color;ctx.fillRect(-10,-2,20,20);ellipse(-5,19+Math.sin(e.age*10)*2,4,3,'#333e35');ellipse(5,19-Math.sin(e.age*10)*2,4,3,'#333e35');if(e.kind==='courier'){ctx.fillStyle='#d8b17e';ctx.fillRect(-15,0,10,14);line([[-8,-16],[8,-16]],'#695244',4);}if(e.kind==='trader'){line([[-11,-16],[11,-16]],'#c3a77c',4);ellipse(13,4,5,4,'#e1ba76');}if(e.kind==='heavy'||big){ctx.strokeStyle='#b8c9c0';ctx.lineWidth=2;ctx.strokeRect(-15,3,30,21);line([[-15,3],[15,3]],'#d6dfc8',3);for(let x of [-9,0,9])line([[x,5],[x,22]],'#a9b7a7',1);ellipse(-11,27,3,3,'#293b35');ellipse(11,27,3,3,'#293b35');ellipse(0,13,5,5,'#ce8b62');if(big){ctx.fillStyle='#efc663';ctx.beginPath();ctx.moveTo(-9,-17);ctx.lineTo(-10,-25);ctx.lineTo(-3,-21);ctx.lineTo(0,-27);ctx.lineTo(4,-21);ctx.lineTo(10,-25);ctx.lineTo(9,-17);ctx.fill();}}}ctx.restore();}

function drawSankeys(){ctx.fillStyle='#a4a18b';ctx.fillRect(0,0,900,1300);ctx.fillStyle='#777f73';ctx.fillRect(340,0,220,1300);for(let y=70;y<1300;y+=100)line([[450,y],[450,y+42]],'#ded6b0',4);for(let i=0;i<6;i++){let y=120+i*195;for(let x of [130,620]){ctx.fillStyle=i%2?'#85715e':'#8a8973';ctx.fillRect(x,y,150,105);ctx.fillStyle=['#9e685f','#628d7c','#c2a66e'][i%3];ctx.fillRect(x-5,y+10,160,22);for(let k=0;k<5;k++){ctx.fillStyle=k%2?'#e3d8b0':'#fff0c7';ctx.fillRect(x+k*30,y+10,15,22);}ctx.fillStyle='#40554c';ctx.fillRect(x+12,y+45,120,38);ctx.fillStyle='#eee0bc';ctx.font='bold 10px system-ui';ctx.textAlign='center';ctx.fillText(['CORNER SHOP','BAKERY','TAKEAWAY'][i%3],x+75,y+59);}}for(let y of [400,850])for(let x=360;x<550;x+=35){ctx.fillStyle='#e3ddbd';ctx.fillRect(x,y,20,65);}ctx.fillStyle='#eee0b8';ctx.font='bold 23px system-ui';ctx.textAlign='center';ctx.fillText('SANKEY’S CORNER',450,75);}
ARENAS.sankeys={name:"Sankey’s Corner",short:"Sankey’s Corner",boss:'The Trolley King',bossShort:'TROLLEY KING'};

// The Burntwood Quarry — local wildlife, separate arena module.
ARENAS.quarry={name:'The Burntwood Quarry',short:'Quarry',boss:'Big Barry · The Badger',bossShort:'BIG BARRY'};
function quarryWave(){let t=pressureTime(),r=rand(),kind=t>31&&r>.82?'badger':t>17&&r<.3?'crow':t>9&&r>.62?'mole':'rabbit';spawn(kind);if(t>18&&rand()<.35)spawn('rabbit');nextSpawn=stageSpawnDelay(Math.max(.65,1.08-time*.002));}
function spawnQuarry(kind,at){kind=kind==='swarm'?'rabbit':kind==='charger'?'badger':kind;let spec={rabbit:[20,12,66],mole:[34,15,45],crow:[36,16,48],badger:[105,24,34],boss:[1350,47,36]}[kind]||[20,12,66],a=rand()*TAU,r=305,x=at?.x??p.x+Math.cos(a)*r,y=at?.y??p.y+Math.sin(a)*r,q=walkable(x,y,spec[1]);let e={id:++id,kind,quarry:true,x:q.x,y:q.y,r:spec[1],hp:spec[0],maxHp:spec[0],speed:spec[2],kx:0,ky:0,flash:0,stagger:0,age:rand()*6,mode:'walk',timer:1.2+rand(),attackCD:0,dx:0,dy:1,sequence:0};applyEnemyScale(e);enemies.push(e);if(kind==='boss'){boss=e;bossSpawned=true;float(p.x,p.y-65,'BIG BARRY IS NOT HAPPY!','#f1d58c');}}
function stepQuarryEnemy(e,dt){let dx=p.x-e.x,dy=p.y-e.y,d=Math.hypot(dx,dy)||1,mx=dx/d,my=dy/d,speed=e.speed;
if(e.stunUntil>time){e.timer+=dt;speed=0;}
else if(e.kind==='mole'){if(e.mode==='walk'&&d<230&&e.timer<=0){e.mode='burrow';e.timer=.85;e.tx=clamp(p.x+rand()*65-32,45,855);e.ty=clamp(p.y+rand()*65-32,70,1230);}else if(e.mode==='burrow'){speed=0;if(e.timer<=0){e.x=e.tx;e.y=e.ty;e.mode='emerge';e.timer=.55;pop(e.x,e.y,'#a18c6d',8);}}else if(e.mode==='emerge'){speed=0;if(e.timer<=0){e.mode='walk';e.timer=2;}}}
else if(e.kind==='crow'){if(d<180){mx=-mx;my=-my;}else if(d<280)speed=0;if(e.mode==='wind'){speed=0;if(e.timer<=0){shootMud(e);e.mode='walk';e.timer=2.5;}}else if(e.timer<=0&&d<420){e.mode='wind';e.timer=.9;}}
else if(e.kind==='badger'||e.kind==='boss'){if(e.mode==='walk'&&e.timer<=0&&d<390){e.mode='wind';e.timer=e.kind==='boss'?1.1:.8;e.dx=mx;e.dy=my;}else if(e.mode==='wind'){speed=0;if(e.timer<=0){e.mode='rush';e.timer=e.kind==='boss'?.8:.5;}}else if(e.mode==='rush'){mx=e.dx;my=e.dy;speed=e.kind==='boss'?310:235;if(e.timer<=0){e.mode='recover';e.timer=e.kind==='boss'?1.2:1;pop(e.x,e.y,'#a68c69',6);}}else if(e.mode==='recover'){speed=0;if(e.timer<=0){e.mode='walk';e.timer=e.kind==='boss'?.9:1.8;}}}
else{let a=e.id*2.4;mx=(p.x+Math.cos(a)*28-e.x)/d;my=(p.y+Math.sin(a)*28-e.y)/d;}
if(e.slowUntil>time)speed*=.7;if(e.stagger>0)speed*=.2;let q=walkable(e.x+mx*speed*dt+e.kx*dt,e.y+my*speed*dt+e.ky*dt,e.r);e.x=q.x;e.y=q.y;e.kx*=Math.exp(-dt*8);e.ky*=Math.exp(-dt*8);if(e.mode!=='burrow')applyChaseContact(e,dt);}
function drawQuarryWarnings(){for(let e of enemies)if(e.quarry&&e.hp>0){if(e.mode==='burrow'){ellipse(e.tx,e.ty,19,8,'#a9834e88');ellipse(e.tx,e.ty,11,5,'#d7b37599');}else if(e.mode==='wind'){ctx.save();ctx.translate(e.x,e.y);ctx.rotate(Math.atan2(e.dy,e.dx));ctx.fillStyle='#f0bc6833';ctx.fillRect(0,-e.r,e.kind==='crow'?0:230,e.r*2);ctx.restore();}}}
function drawQuarryEnemy(e){ctx.save();ctx.translate(e.x,e.y);let big=e.kind==='boss',s=big?2.25:1;ctx.scale(s,s);ellipse(0,13,14,5,'#302a2544');ctx.translate(0,Math.sin(e.age*9)*1.1);let flash=e.flash>0,color=flash?'#fff0d2':e.kind==='badger'||big?'#5a5c56':e.kind==='crow'?'#343c45':e.kind==='mole'?'#715d58':'#bd9b75';
if(e.kind==='mole'&&e.mode==='burrow'){ellipse(0,9,14,5,'#947a58');ctx.restore();return;}
if(e.kind==='crow'){ellipse(0,3,10,12,color);ellipse(-10,3,9,4,'#505961');ellipse(10,3,9,4,'#505961');ellipse(2,-10,7,7,color);ellipse(4,-11,2,2,'#e9d9ad');ellipse(4,-11,1,1,'#283331');line([[7,-7],[15,-6]],'#d4a35f',3);}
else if(e.kind==='mole'){ellipse(0,4,14,12,color);ellipse(-8,-9,7,6,color);ellipse(8,-9,7,6,color);ellipse(0,-5,12,9,color);ellipse(-5,-7,2,2,'#211f23');ellipse(5,-7,2,2,'#211f23');ellipse(0,-1,5,3,'#dca5a0');ellipse(-15,8,6,4,'#d9ae9a');ellipse(15,8,6,4,'#d9ae9a');}
else if(e.kind==='rabbit'){ellipse(0,5,11,12,color);ellipse(-6,-16,4,13,color);ellipse(6,-16,4,13,color);ellipse(-6,-16,2,9,'#e4adad');ellipse(6,-16,2,9,'#e4adad');ellipse(0,-7,10,9,color);ellipse(-4,-9,2,2,'#2a2926');ellipse(4,-9,2,2,'#2a2926');ellipse(0,-3,2,2,'#e4b0ac');ellipse(12,8,5,5,'#e6d4b8');}
else{ellipse(0,4,15,15,color);ellipse(0,-9,14,11,color);for(let side of [-1,1]){ellipse(side*9,-13,5,5,color);ellipse(side*5,-9,5,8,'#e9e6d8');ellipse(side*5,-10,2,2,'#222b2a');ellipse(side*9,17,6,5,'#343735');}ellipse(0,-3,7,5,'#ddd3c5');ellipse(0,-5,3,2,'#2d2e2b');if(big){ellipse(-13,7,6,8,'#4d514d');ellipse(13,7,6,8,'#4d514d');}}
if(e.stunUntil>time){starArt(-5,-27,3,time*4);starArt(5,-27,3,-time*4);}if(e.mode==='wind')starArt(0,-31,4,time);ctx.restore();}
function drawQuarry(){ctx.fillStyle='#887a61';ctx.fillRect(0,0,WORLD.w,WORLD.h);for(let i=0;i<22;i++){let x=(i*173+61)%900,y=(i*241+95)%1300;ellipse(x,y,95,45,i%2?'#a19172':'#948369');}for(let i=0;i<55;i++){let x=(i*197+43)%900,y=(i*311+51)%1300;ellipse(x,y,5+i%4*3,3+i%3*2,i%2?'#b4a17f':'#756b5b');}for(let side of [0,1]){let x=side?870:30;for(let y=20;y<1300;y+=80){ellipse(x,y,75,49,'#6d6557');ellipse(x+(side?-19:19),y-15,48,23,'#96866b');ellipse(x,y-28,32,12,'#526b4c');}}for(let y of [210,1040]){ctx.fillStyle='#615d50';ctx.fillRect(270,y,170,14);for(let i=0;i<5;i++)line([[280+i*35,y-7],[280+i*35,y+21]],'#a28b67',5);}ctx.fillStyle='#d7c59b';ctx.font='bold 22px system-ui';ctx.textAlign='center';ctx.fillText('BURNTWOOD QUARRY',450,77);}

// Rugby arena content.
ARENAS.rugby={name:'Burntwood Rugby Club',short:'Rugby Club',boss:'Bruce · The Netted Stag',bossShort:'BRUCE'};

function spawnRugby(kind,at){let a=rand()*TAU,r=285+rand()*70,x=at?.x??clamp(p.x+Math.cos(a)*r,45,WORLD.w-45),y=at?.y??clamp(p.y+Math.sin(a)*r,65,WORLD.h-65);let hp=kind==='heavy'?75+time*.12:kind==='charger'?32+time*.10:17+time*.09;let e={id:++id,x,y,r:kind==='heavy'?22:kind==='charger'?19:13,hp,maxHp:hp,kind,speed:kind==='heavy'?31:kind==='charger'?49:57,kx:0,ky:0,flash:0,stagger:0,age:rand()*6,mode:'walk',timer:1.8+rand()*2,dx:0,dy:1,attackCD:0};if(atChasewater()&&['goose','fox','owl','mud','heavy','boss'].includes(kind)){chaseSpawn(kind,e);applyEnemyScale(e);enemies.push(e);return;}if(kind==='boss'){Object.assign(e,{r:49,hp:1000,maxHp:1000,speed:45,timer:2.5});boss=e;bossSpawned=true;float(p.x,p.y-70,'BRUCE HAS ARRIVED','#ffd884');}applyEnemyScale(e);enemies.push(e);}

function drawRugbyGround(){ctx.fillStyle='#497347';ctx.fillRect(0,0,WORLD.w,WORLD.h);for(let y=0;y<WORLD.h;y+=150){ctx.fillStyle=(y/150)%2?'#4f7949':'#456e43';ctx.fillRect(0,y,WORLD.w,150);}ctx.strokeStyle='#e5e3c3aa';ctx.lineWidth=3;ctx.strokeRect(65,110,WORLD.w-130,WORLD.h-220);for(let y of [260,650,1040])line([[65,y],[WORLD.w-65,y]],'#e5e3c399',2);line([[450,110],[450,1190]],'#e5e3c344',1);for(let y of [120,1180]){line([[350,y],[350,y-45]],'#f0e8d5',6);line([[550,y],[550,y-45]],'#f0e8d5',6);line([[350,y-25],[550,y-25]],'#f0e8d5',5);}for(let x=10;x<WORLD.w;x+=65){ellipse(x,25,28,24,'#294e35');ellipse(x+6,15,21,20,'#365d39');ellipse(x,WORLD.h-20,30,25,'#294e35');}for(let y=70;y<WORLD.h-50;y+=70){ellipse(10,y,25,27,'#284e35');ellipse(WORLD.w-10,y,25,27,'#284e35');}ctx.fillStyle='#ecdfaa';ctx.font='bold 20px system-ui';ctx.textAlign='center';ctx.fillText('BURNTWOOD RUGBY CLUB',450,75);}

function drawEnemy(e){if(e.quarry){drawQuarryEnemy(e);return;}if(e.market){drawMarketEnemy(e);return;}if(e.chase){drawChaseEnemy(e);return;}ctx.save();ctx.translate(e.x,e.y);let isBoss=e.kind==='boss',heavy=e.kind==='heavy',buck=e.kind==='charger',s=isBoss?2.5:heavy?1.25:1;ctx.scale(s,s);ellipse(0,9,12,6,'#15372955');let bounce=Math.sin(e.age*(heavy?7:11))*1.4;ctx.translate(0,bounce);let color=e.flash>0?'#fff4cf':heavy?'#744b36':buck||isBoss?'#96704a':'#ad8258';ellipse(0,3,heavy?13:10,13,color);ellipse(-5,14+Math.sin(e.age*10)*2,3,5,'#493b30');ellipse(5,14-Math.sin(e.age*10)*2,3,5,'#493b30');ellipse(-7,-14,3,7,color);ellipse(7,-14,3,7,color);ellipse(0,-8,9,10,color);ellipse(0,-3,5,4,'#dac29a');ellipse(-3.5,-9,1.3,1.7,'#192c2b');ellipse(3.5,-9,1.3,1.7,'#192c2b');ellipse(0,-4,2,1.2,'#39362b');if(heavy){ellipse(0,1,13,5,'#204c39');line([[-10,-1],[10,-1]],'#d35b48',3);}
if(buck||isBoss){for(let side of [-1,1]){line([[side*5,-14],[side*12,-23],[side*15,-34]],'#d5bd8b',3);line([[side*12,-23],[side*6,-27]],'#d5bd8b',2);line([[side*14,-30],[side*20,-31]],'#d5bd8b',2);}}
if(isBoss){ctx.strokeStyle='#e8812f';ctx.lineWidth=1.7;for(let i=0;i<5;i++){line([[-21+i*9,-36],[-15+i*8,-20]],'#ec8734',1.5);line([[-22,-34+i*4],[22,-30+i*4]],'#ec8734',1.3);}ellipse(0,0,12,4,'#dd6c2d');}
if(e.stunUntil>time){starArt(-5,-25,3,time*4);starArt(5,-27,2.5,-time*4);}if(e.slowUntil>time){ellipse(0,10,14,4,'#dcabec77');for(let i=0;i<3;i++)starArt(-8+i*8,5+Math.sin(e.age*3+i)*5,2.3,e.age);}
if(e.mode==='wind'){ctx.strokeStyle='#ffd66e';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(-5,-39);ctx.lineTo(0,-47);ctx.lineTo(5,-39);ctx.stroke();}ctx.restore();}



// Shared dispatch: the engine never changes arena balance to fix one character.
const CHARACTER_MODULES={
 jackson:{attack:shoot,draw:drawRugbyHero,special:jacksonCharge,dodge:quickDodge,update(){}},
 ava:{attack:shoot,draw:drawRugbyHero,special:avaSpecial,dodge:quickDodge,update(){}},
 stef:{interval:()=>tier>=4?.76:tier>=2?.45:.60,attack:startSweep,draw:drawStef,special:byOrder,dodge:push,update:updateStef},
 jodie:{attack:startClaws,draw:drawJodie,special:kittenChaos,dodge:quickDodge,update:updateCats},
 evie:{attack:queueDucks,draw:drawEvie,special:ducksAssemble,dodge:quickDodge,update:updateDucks},
 zak:{attack:zakFart,draw:drawZak,special:zakExplosion,dodge:zakDodge,update:updateZak}
};
const ARENA_MODULES={
 rugby:{wave:rugbyWave,spawn:spawnRugby,ground:drawRugbyGround},
 chasewater:{wave:chaseWave,spawn:spawnRugby,ground:drawChasewater},
 sankeys:{wave:sankeyWave,spawn:spawnMarket,ground:drawSankeys},
 quarry:{wave:quarryWave,spawn:spawnQuarry,ground:drawQuarry}
};
function spawn(kind,at){ARENA_MODULES[arenaKey].spawn(kind,at);}
function ground(){ARENA_MODULES[arenaKey].ground();}
function rugbyWave(){let pt=pressureTime(),roll=rand(),kind=pt>10&&roll<.19?'charger':pt>20&&roll>.83?'heavy':'swarm';spawn(kind);if(pt>20&&rand()<.45){spawn('swarm');spawn('swarm');}nextSpawn=stageSpawnDelay(Math.max(.42,.88-time*.0018));}

function normalAttackInterval(){return (CHARACTER_MODULES[selected].interval?.()??CHARACTERS[selected].rate)*normalRate();}

function charge(){CHARACTER_MODULES[selected].special();}
function dodge(){if(state==='hub')return;CHARACTER_MODULES[selected].dodge();}

// Pointer controls already handle movement/actions. Cancel native touch zoom separately,
// forwarding exactly one click for ordinary menu/upgrade buttons.
const tapStarts=new Map();
addEventListener('touchstart',e=>{for(let t of Array.from(e.changedTouches||[]))tapStarts.set(t.identifier,{x:t.clientX,y:t.clientY,button:t.target?.closest?.('button')});if(e.touches?.length>1&&state!=='menu')e.preventDefault();},{passive:false});
addEventListener('touchend',e=>{let target=e.target,button=target?.closest?.('button'),gameplay=target?.closest?.('#game,#controls,#hud');if(button||gameplay){if(e.cancelable)e.preventDefault();if(button&&button.id!=='charge'&&button.id!=='dodge'&&!button.disabled){let t=e.changedTouches?.[0],start=t&&tapStarts.get(t.identifier);if(start&&start.button===button&&Math.hypot(t.clientX-start.x,t.clientY-start.y)<14)button.click();}}for(let t of Array.from(e.changedTouches||[]))tapStarts.delete(t.identifier);},{passive:false});
addEventListener('touchcancel',e=>{for(let t of Array.from(e.changedTouches||[]))tapStarts.delete(t.identifier);},{passive:true});
addEventListener('dblclick',e=>{if(e.target?.closest?.('#game,#controls,#menu,#panel'))e.preventDefault();},{passive:false});
addEventListener('gesturestart',e=>{if(state!=='menu')e.preventDefault();},{passive:false});


$('shrineUse').onclick=interactWorld;$('shopClose').onclick=closeHubShop;
$('hubMenu').onclick=returnToMenu;
$('pickSankeys').onclick=()=>selectArena('sankeys');$('pickQuarry').onclick=()=>selectArena('quarry');

$('start').onclick=startJourney;$('pickJackson').onclick=()=>selectCharacter('jackson');$('pickAva').onclick=()=>selectCharacter('ava');$('pickStef').onclick=()=>selectCharacter('stef');$('pickJodie').onclick=()=>selectCharacter('jodie');$('pickEvie').onclick=()=>selectCharacter('evie');$('pickZak').onclick=()=>selectCharacter('zak');$('back').onclick=returnToMenu;selectCharacter('evie');selectArena('chasewater');$('pickRugby').onclick=()=>selectArena('rugby');$('pickChasewater').onclick=()=>selectArena('chasewater');$('dodge').onpointerdown=e=>{e.preventDefault();dodge();};$('charge').onpointerdown=e=>{e.preventDefault();if(state==='hub')enterNearby();else charge();};let pid=null,joy=$('joystick');function move(e){let r=joy.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/43,y=(e.clientY-r.top-r.height/2)/43,d=Math.hypot(x,y);if(d>1){x/=d;y/=d;}stick.x=x;stick.y=y;$('nub').style.transform='translate('+x*33+'px,'+y*33+'px)';}joy.onpointerdown=e=>{e.preventDefault();pid=e.pointerId;joy.setPointerCapture(pid);move(e);};joy.onpointermove=e=>{if(e.pointerId===pid){e.preventDefault();move(e);}};joy.onpointerup=joy.onpointercancel=()=>{pid=null;stick.x=stick.y=0;$('nub').style.transform='';};addEventListener('keydown',e=>{keys[e.key]=true;if(e.code==='Space'){e.preventDefault();dodge();}if(e.key==='Shift'){if(state==='hub')enterNearby();else charge();}if(e.key==='e'||e.key==='E')interactWorld();});addEventListener('keyup',e=>keys[e.key]=false);addEventListener('blur',()=>{Object.keys(keys).forEach(k=>delete keys[k]);stick.x=stick.y=0;});addEventListener('selectstart',e=>e.preventDefault());addEventListener('contextmenu',e=>e.preventDefault());function frame(now){let rest=Math.min(.1,(now-last)/1000);last=now;while(rest>0){let dt=Math.min(rest,1/60);advance(dt);rest-=dt;}draw();requestAnimationFrame(frame);}requestAnimationFrame(frame);
window.__test={startJourney,enterHub,enterArena,enterNearby,interactWorld,openShrine,chooseShrine,get shrine(){return shrine;},get shrineBuff(){return shrineBuff;},get hub(){return hub;},openHubShop,closeHubShop,buyHubItem,stepHub,get visited(){return run.visited;},choosePerk:chooseBossPerk,openReward:openBossReward,rollPerks,rewardRandom,setRolls(a){rewardRolls=Array.from(a);},get hearts(){return hearts;},dropHeart,recoverHealth,rewardStep,queueMeteor,meteorImpact,get scheduled(){return scheduled;},menu(){returnToMenu();},arena:selectArena,select:selectCharacter,reset,step:advance,dodge,charge,spawn,shoot:()=>CHARACTER_MODULES[selected].attack(),splitBall,damageEnemy,nearest,upgrade(index=0){chooseUpgrade(index);},choose:chooseUpgrade,offers:()=>run.offers,continue:continueRun,get run(){return run;},grant(path,index){if(path==='weapon')tier=Math.min(maxTier(),tier+1);else if(path==='special')run.special=Math.min(5,run.special+1);else if(path==='dodge')run.dodge=Math.min(5,run.dodge+1);else if(path==='stat')run.stat.add(index);syncCats();},effectiveStats,damageScale,specialCooldown,dodgeCooldown,enemyScale,buildOffers,showUpgrade,bonusStep,endDodge,beginDodgeBonuses,get hazards(){return hazards;},get decoy(){return decoy;},get state(){return {arena:arenaKey,selected,state,time,tier,xp,kills,hp:p?.hp,balls:balls.map(b=>({main:b.main,maxHits:b.maxHits,damage:b.damage,hits:b.hitsMade||0})),enemyCount:enemies.length,chargeCD:p?.chargeCD,dodgeCD:p?.dodgeCD};},setTier(t){tier=t;syncCats();},setXP(n){run.earned=n;showUpgrade(true);},clear(){enemies=[];balls=[];gems=[];enemyShots=[];},get ducks(){return ducks;},get eggs(){return eggs;},get duckQueue(){return duckQueue;},hatchDuck,get cats(){return cats;},get zakClouds(){return zakClouds;},get zakLaughClouds(){return zakLaughClouds;},get claws(){return p?.claws;},get player(){return p;},get enemies(){return enemies;},get balls(){return balls;},get pending(){return pendingShots;},get shots(){return enemyShots;},get boss(){return boss;},shore,walkable,push,startSweep,get hands(){return isStef()?stefHands():[];},get reach(){return isStef()?hookReach():0;},draw};

