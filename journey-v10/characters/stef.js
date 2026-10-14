// characters/stef.js — source of truth.
function hookTiming(){if(p.frenzy>0)return {wind:.05,hit:.20,recover:.06};let h=tier<4?{wind:.06,hit:.11,recover:.16}:{wind:.13,hit:.30,recover:.17};let m=normalRate();return {wind:h.wind*m,hit:h.hit*m,recover:h.recover*m};}

function startSweep(){if(p.swing)return false;let t=nearest(p,new Set(),hookReach()+55);if(!t||dist(p,t)>hookReach()+t.r+9+t.speed*.2)return false;p.aim=Math.atan2(t.y-p.y,t.x-p.x);let h=hookTiming();p.swing={t:0,aim:p.aim,timing:h,hit:new Set(),prev:0,special:p.frenzy>0,delay:p.frenzy>0?.15:tier>=4?.28:0,duration:h.wind+h.hit+h.recover+(p.frenzy>0?.15:tier>=4?.28:0)};return true;}

function byOrder(){if(state!=='playing'||p.action||p.chargeCD>0)return;p.chargeCD=specialCooldown();p.frenzy=S(1)?2.6:2;p.frenzyDuration=p.frenzy;p.frenzyWait=.18;p.swing=null;p.attack=2;float(p.x,p.y-42,'BY ORDER!','#f4d28d');}

function push(){if(state!=='playing'||p.action||p.dodgeCD>0)return;p.action='push';p.actionT=0;p.actionDir={x:0,y:0};p.swing=null;p.frenzy=0;p.attack=Math.max(p.attack,.25);p.dodgeCD=dodgeCooldown();p.inv=D(3)?.65:.48;p.pushFired=false;}

function angularContact(e,start,end,offset,radius){let dx=e.x-p.x,dy=e.y-p.y,d=Math.hypot(dx,dy);if(d>radius+e.r+9)return false;let angle=Math.atan2(dy,dx),a=start+offset,b=end+offset,pad=Math.asin(Math.min(1,(e.r+9)/Math.max(1,d)));for(let i=-2;i<=2;i++){let q=angle+i*TAU;if(q>=a-pad&&q<=b+pad)return true;}return false;}

function hookAngle(s,hand,u){return !s.special&&tier<4?s.aim:s.aim+(hand?-1:1)*(1.10-2.20*u);}

function updateStef(dt){if(!isStef())return;if(p.frenzy>0){p.frenzy=Math.max(0,p.frenzy-dt);if(p.frenzy===0&&S(5))forwardFinisher(45,hookReach()+15,'#efd38d');p.frenzyWait-=dt;if(p.frenzyWait<=0&&!p.swing){startSweep();p.frenzyWait=.04;}}
if(p.action==='push'){if(p.actionT>=.15&&!p.pushFired){p.pushFired=true;fx.push({x:p.x,y:p.y,vx:0,vy:0,r:pushRadius(),life:.4,max:.4,color:'#85cbf1',ring:true});for(let e of enemies){if(e.hp<=0||dist(p,e)>pushRadius()+e.r)continue;let d=dist(p,e)||1,m=e.kind==='boss'?.02:e.kind==='heavy'?.24:e.kind==='charger'?.6:1;e.kx+=(e.x-p.x)/d*600*m*(D(2)?1.25:1);e.ky+=(e.y-p.y)/d*600*m*(D(2)?1.25:1);e.flash=.08;if(D(5))e.stunUntil=time+(e.kind==='boss'?.06:e.kind==='heavy'?.15:.45);if(e.kind!=='boss'){e.stagger=Math.max(e.stagger,.22*m);if(e.mode==='rush'){e.mode='recover';e.timer=.45;}}pop(e.x,e.y,'#a9d7e8',4);}}return;}
if(!p.swing){let t=nearest(p,new Set(),hookReach()+110);if(t)p.aim=Math.atan2(t.y-p.y,t.x-p.x);return;}
let s=p.swing,previous=s.t;s.t+=dt;for(let hand=0;hand<(s.special||tier>=4?2:1);hand++){let offset=hand*s.delay,from=previous-offset-s.timing.wind,to=s.t-offset-s.timing.wind;if(to<0||from>s.timing.hit)continue;let u0=clamp(from/s.timing.hit,0,1),u1=clamp(to/s.timing.hit,0,1),a0=hookAngle(s,hand,u0),a1=hookAngle(s,hand,u1);for(let e of enemies){let key=e.id+':'+hand;if(e.hp<=0||s.hit.has(key)||!angularContact(e,Math.min(a0,a1),Math.max(a0,a1),0,hookReach()))continue;s.hit.add(key);let d=dist(p,e)||1,dx=(e.x-p.x)/d,dy=(e.y-p.y)/d;damageEnemy(e,s.special&&S(3)?30:!s.special&&tier>=4?36:!s.special?16:23,dx,dy,false,s.special?'special':'weapon');let resist=e.kind==='heavy'||e.kind==='boss'?.25:1;e.kx+=dx*85*resist;e.ky+=dy*85*resist;if((s.special||tier>=3)&&time>=(e.stunImmuneUntil||0)){let duration=e.kind==='boss'?.12:.38;e.stunUntil=time+duration;e.stunImmuneUntil=time+duration+.9;pop(e.x,e.y,'#f8d685',5);}}}if(s.t>=s.duration)p.swing=null;
}

function stefHands(){if(p.frenzy>p.frenzyDuration-.18)return [{x:6,y:-21,moving:false,size:5,a:0},{x:-22,y:2,moving:false,size:3.8,a:0}];if(p.action==='push'){let u=clamp(p.actionT/.44,0,1),extension=Math.sin(Math.PI*u)*30;return [0,1].map(i=>({x:(i?-1:1)*(22+extension),y:-6,moving:true,push:true,size:6.8,a:0}));}let s=p.swing;return [0,1].map(i=>{if(!s||(i&&tier<4&&!s.special))return {x:i?-22:22,y:i?5:1,moving:false,size:3.8,a:0};let t=s.t-i*s.delay,h=s.timing;if(t<0)return {x:-22,y:5,moving:false,size:3.8,a:0};let u=clamp((t-h.wind)/h.hit,0,1),active=t>=h.wind&&t<=h.wind+h.hit,a=hookAngle(s,i,u),r=hookReach()*(!s.special&&tier<4?.3+.7*Math.sin(u*Math.PI):.88+.12*Math.sin(u*Math.PI));let phase=t<h.wind?clamp(t/h.wind,0,1):t>h.wind+h.hit?1-clamp((t-h.wind-h.hit)/h.recover,0,1):1;let nx=i?-22:22,ny=i?5:1;return {x:lerp(nx,Math.cos(a)*r,phase),y:lerp(ny,Math.sin(a)*r,phase),moving:active,size:lerp(3.8,s.special&&S(2)?10:8.5,phase),a,hand:i};});}

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
