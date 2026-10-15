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
for(let d of ducks){if(d.life<=0)continue;d.life-=dt;d.age+=dt;d.cool-=dt*attackSpeedFactor();d.px=d.x;d.py=d.y;if(!d.tiny){d.r=tier>=2?9:7;if(tier>=3&&!d.defender){d.defender=true;d.eggs=2;}}
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
