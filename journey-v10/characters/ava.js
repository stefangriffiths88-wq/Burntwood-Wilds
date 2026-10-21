// characters/ava.js — source of truth.
function fireStar(){let target=nearest(p,new Set(),300);if(!target)return;let d=dist(p,target)||1;balls.push({star:true,x:p.x,y:p.y-4,px:p.x,py:p.y-4,vx:(target.x-p.x)/d*360,vy:(target.y-p.y)/d*360,r:6,damage:18,life:4,mode:'out',hit:new Set(),spin:0});p.throwT=.2;}

function updateStar(b,dt){b.life-=dt;b.spin+=dt*10;b.px=b.x;b.py=b.y;
if(b.mode==='stuck'){b.wait-=dt;if(b.host&&b.host.hp>0){b.x=b.host.x+b.ox;b.y=b.host.y+b.oy;b.host.slowUntil=Math.max(b.host.slowUntil||0,time+.12);if((b.host.nextMagicTick||0)<=time){b.host.nextMagicTick=time+.5;damageEnemy(b.host,1.5,0,0);}}if(b.wait<=0){if(tier>=2){b.mode='return';b.hit=new Set();b.life=5;}else b.life=0;}return;}
if(b.mode==='return'){let d=dist(b,p);if(d<18){if(tier>=5&&b.origin)glitterBurst(b.origin.x,b.origin.y,b.damage*.5);b.life=0;return;}b.vx=(p.x-b.x)/d*470;b.vy=(p.y-b.y)/d*470;}
b.x+=b.vx*dt;b.y+=b.vy*dt;
for(let e of enemies){if(e.hp<=0||b.hit.has(e.id))continue;let sx=b.x-b.px,sy=b.y-b.py,l=sx*sx+sy*sy,t=l?clamp(((e.x-b.px)*sx+(e.y-b.py)*sy)/l,0,1):0;if(Math.hypot(e.x-b.px-sx*t,e.y-b.py-sy*t)>e.r+b.r)continue;b.hit.add(e.id);damageEnemy(e,b.damage,0,0);if(b.mode==='out'){if(signatureActive('ava')){let seen=new Set([e.id]);for(let i=0;i<2;i++){let other=nearest(e,seen,240);if(other){seen.add(other.id);signatureShot(e.x,e.y,Math.atan2(other.y-e.y,other.x-e.x),b.damage*.45*damageScale('weapon'),'star',.9,380,e.id);}}}if(tier>=1){b.mode='stuck';b.wait=2;b.life=3;b.host=e;b.ox=clamp(b.x-e.x,-e.r*.6,e.r*.6);b.oy=clamp(b.y-e.y,-e.r*.6,e.r*.6);b.x=e.x+b.ox;b.y=e.y+b.oy;b.origin={x:e.x,y:e.y};e.slowUntil=time+2;}else b.life=0;break;}}
}

function glitterBurst(x,y,damage){pop(x,y,'#f8bde7',18);fx.push({x,y,vx:0,vy:0,r:55,life:.24,max:.24,color:'#edabdd',ring:true});for(let e of enemies)if(e.hp>0&&Math.hypot(e.x-x,e.y-y)<=55+e.r){e.slowUntil=Math.max(e.slowUntil||0,time+1.5);damageEnemy(e,damage,0,0);}}

function starArt(x,y,r,angle=0){ctx.save();ctx.translate(x,y);ctx.rotate(angle);ctx.beginPath();for(let i=0;i<10;i++){let a=-Math.PI/2+i*Math.PI/5,v=i%2?r*.45:r;i?ctx.lineTo(Math.cos(a)*v,Math.sin(a)*v):ctx.moveTo(Math.cos(a)*v,Math.sin(a)*v);}ctx.closePath();ctx.fillStyle='#ffe6a0';ctx.fill();ctx.strokeStyle='#98714d';ctx.lineWidth=.7;ctx.stroke();ctx.restore();}

function drawAvaSprite(c,x,y,s,type){c.save();c.translate(x,y);c.scale(s*.73,s*.73);
 ellipse(0,23,12,3.2,'#18372855');catTail('#c8b192','#fff0d9',5);
 catShape('M -10 -5 Q 0 -10 10 -5 Q 8 6 13 17 Q 0 25 -13 17 Q -8 6 -10 -5 Z','#ba7899','#6b5052');
 catShape('M -11 11 Q 0 15 11 11 L 13 17 Q 0 25 -13 17 Z','#e2acbf','#8b607b');line([[-9,5],[9,5]],'#63506e',3);line([[-6,-5],[0,-1],[6,-5]],'#f7e9d9',2);for(let xx of [-6,0,6])starArt(xx,5,xx?2.3:3,0);
 for(let side of [-1,1])catOval(side*13,-12,4,12,'#926244','#6b5052');catFace({fur:'#e6d6bd',cream:'#fff0d9',eye:'#398b9c',ink:'#6b5052',wide:16});
 catShape('M -15 -22 Q -16 -34 -1 -31 Q 10 -33 15 -22 Q 5 -28 -3 -19 L -2 -25 Q -9 -20 -15 -22 Z','#926244','#6b5052');line([[-10,-27],[-3,-29],[5,-27]],'#c39870',1.2);
 catShape('M 9 -26 L 4 -30 L 4 -22 Z','#f5d7e5','#9c708a');catShape('M 9 -26 L 15 -30 L 15 -22 Z','#f5d7e5','#9c708a');ellipse(9,-26,1.6,1.7,'#e6a5c4');
 let sway=Math.sin((p?.walk||0)*2)*1.2,cast=p?.throwT>0?Math.sin(p.throwT/.2*Math.PI)*7:0;catPaw(-24,5+sway,5,'#fff0d9');catPaw(24,3-sway-cast,5,'#fff0d9');if(!cast)starArt(29,-4,5.5,.1);c.restore();}

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
