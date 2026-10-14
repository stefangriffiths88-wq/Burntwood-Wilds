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
