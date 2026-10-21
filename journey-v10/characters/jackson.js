// characters/jackson.js — source of truth.
function shoot(){if(isAva()){let count=tier>=4?3:tier>=3?2:1;if(!nearest(p,new Set(),300))return false;for(let i=0;i<count;i++)pendingShots.push({delay:i*.16});return true;}let target=nearest(p,new Set(),255);if(!target)return false;let dx=target.x-p.x,dy=target.y-p.y,d=Math.hypot(dx,dy)||1;let hand={x:p.x+dx/d*19,y:p.y-4+dy/d*12};balls.push({x:hand.x,y:hand.y,px:hand.x,py:hand.y,vx:dx/d*420,vy:dy/d*420,r:8,damage:26,main:true,hit:new Set(),maxHits:(tier>=1?2:1)+(signatureActive('jackson')?1:0),life:3,split:false,spin:0});p.throwT=.2;return true;}

function splitBall(b,e){let count=tier>=3?3:2,used=new Set([e.id]);for(let i=0;i<count;i++){let target=nearest(e,used,360),a=target?Math.atan2(target.y-e.y,target.x-e.x):Math.atan2(b.vy,b.vx)+(i-(count-1)/2)*.7;if(target)used.add(target.id);let dx=Math.cos(a),dy=Math.sin(a);balls.push({x:e.x+dx*(e.r+7),y:e.y+dy*(e.r+7),px:e.x,py:e.y,vx:dx*440,vy:dy*440,r:5.8,damage:26*(tier>=4?.75:.5),main:false,hit:new Set([e.id]),hitsMade:0,maxHits:tier>=5?3:1,life:2.8,split:true,spin:0});}pop(e.x,e.y,'#ffe4a0',10);}

function ballArt(x,y,r,angle=0,small=false){ctx.save();ctx.translate(x,y);ctx.rotate(angle);ellipse(1,3,r*.75,r*.48,'#203b3544');ellipse(0,0,r,r*.59,small?'#ffe4a0':'#fff3d6');line([[-r*.57,-r*.42],[-r*.75,0],[-r*.57,r*.42]],'#c5413c',r*.19);line([[r*.57,-r*.42],[r*.75,0],[r*.57,r*.42]],'#c5413c',r*.19);line([[-r*.22,0],[r*.22,0]],'#a08b68',1);ctx.restore();}

function drawJacksonSprite(c,x,y,s,type){c.save();c.translate(x,y);c.scale(s*.9272,s*.9272);
 ellipse(0,23,13,3.4,'#18372855');catTail('#83969b','#dfdfce',5.2);
 catShape('M -10 -5 Q 0 -10 10 -5 L 10 15 Q 0 24 -10 15 Z','#148461');
 ctx.save();let jersey=new Path2D('M -10 -5 Q 0 -10 10 -5 L 10 15 Q 0 24 -10 15 Z');ctx.clip(jersey);for(let y of [-1,8,17]){ctx.fillStyle='#bd493f';ctx.fillRect(-12,y,24,4.5);}line([[-8,4],[-8,14]],'#ffffff25',1.2);ctx.restore();
 line([[-7,-5],[0,-1],[7,-5]],'#f2e5cf',2);catShape('M 4 0 L 8 0 L 8 5 Q 6 7 4 5 Z','#e9d8b2',null);line([[6,1],[6,4]],'#55806c',.8);
 catFace({fur:'#98a9ac',cream:'#e8e3ce',eye:'#357e99',wide:15});
 catShape('M -14 -22 Q -13 -35 -3 -31 Q 6 -36 14 -24 Q 7 -27 0 -19 L 0 -25 Q -7 -20 -14 -22 Z','#765139');line([[-10,-27],[-4,-29],[5,-28]],'#b88a5d',1.2);
 let swing=Math.sin((p?.walk||0)*2)*1.3,throwing=p?.throwT>0?Math.sin(p.throwT/.2*Math.PI)*7:0;
 catPaw(-23,5+swing,4.8,'#e8e3ce');catPaw(23,3-swing-throwing,4.8,'#e8e3ce');if(!throwing)ballArt(27,-3,6,-.45);c.restore();}

function dodgeImpact(e){let damage=D(5)?26:D(2)?18:10;damageEnemy(e,damage,p.actionDir.x,p.actionDir.y,false,'dodge');radialEffect(e.x,e.y,17,'#e3d5a1');if(D(3)){e.stunUntil=time+(e.kind==='boss'?.05:e.kind==='heavy'?.12:.3);}if(D(3)){let m=e.kind==='boss'?.1:e.kind==='heavy'?(D(5)?.65:.25):1;e.kx+=p.actionDir.x*180*m;e.ky+=p.actionDir.y*180*m;}}

function chargeImpact(e){let anchored=e.kind==='boss'||e.heroic;damageEnemy(e,S(2)?85:65,anchored?0:p.actionDir.x,anchored?0:p.actionDir.y,true,'special');if(S(4))e.stunUntil=time+(e.kind==='boss'?.12:.4);}

CHARACTERS.jackson={"name":"Jackson","hp":100,"speed":155,"damage":26,"rate":0.82,"dodgeSpeed":380,"dodgeTime":0.24,"specialCD":7};

PROFILES.jackson={"role":"RUGBY STRIKER","tag":"Quick feet. Big hits.","attack":"Ball Toss","attackDesc":"Automatic throws · bouncing upgrades","special":"Shoulder Charge","specialDesc":"65 damage · 7s cooldown","dodge":"Impact Dodge","dodgeDesc":"Short dash · 10 damage · 1.65s"};

SPECIALS.jackson=[["Driving Charge","Charge travels 20% farther."],["Heavy Shoulder","Charge damage 65 → 85."],["Broad Shoulders","Wider charge contact catches more enemies."],["Staggering Run","Charge briefly staggers struck enemies; bosses resist."],["Break the Line","Finish with a visible forward impact for 30 extra damage."]];

DODGES.jackson=[["Long Step","Impact dodge travels 30% farther."],["Impact Step","Dodge damage 10 → 18, plus a longer safe window."],["Shoulder Aside","Contact briefly stuns ordinary enemies and pushes harder. Bosses resist."],["Ready Feet","Dodge cooldown 1.65 → 1.05 seconds."],["Driving Step","Dodge hits deal 26 damage and push heavies farther."]];

STAT_NAMES.jackson=["Tough Kit","Quick Feet","Fast Pass","Safe Hands","Hard Hitter"];

function jacksonCharge(){if(state!=='playing'||p.action||p.chargeCD>0)return;p.action='charge';p.actionT=0;p.chargeCD=specialCooldown();p.inv=.9;p.hitIds.clear();let t=nearest(p,new Set(),450),d=Math.hypot(stick.x,stick.y);if(d>.15)p.actionDir={x:stick.x/d,y:stick.y/d};else if(t){let l=dist(p,t)||1;p.actionDir={x:(t.x-p.x)/l,y:(t.y-p.y)/l};}else p.actionDir={...p.dir};p.dir={...p.actionDir};}



// Bosses may move during this frame. Use relative swept contact; never add a
// second hit to the existing endpoint hit, and preserve boss knockback resistance.
function jacksonBossChargeContact(e,from,bossFrom){if(selected!=='jackson'||p.action!=='charge'||e.kind!=='boss'||e.hp<=0||p.hitIds.has(e.id))return false;let ax=from.x-bossFrom.x,ay=from.y-bossFrom.y,bx=p.x-e.x,by=p.y-e.y,dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy,u=l?clamp(-(ax*dx+ay*dy)/l,0,1):0,r=e.r+p.r+(S(3)?24:12);if(Math.hypot(ax+dx*u,ay+dy*u)>r)return false;p.hitIds.add(e.id);chargeImpact(e);radialEffect(e.x,e.y,e.r+8,'#f1d48b');shake=Math.max(shake,3);return true;}
