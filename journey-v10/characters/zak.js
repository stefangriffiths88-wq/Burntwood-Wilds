// Zak — Toxic Trickster, original purple cat.
const isZak=()=>selected==='zak';
let zakClouds=[],zakBurst=0,zakLaunch=0,zakLaughClouds=[],zakMood=0,zakGasTrail=[],zakShots=[];
function resetZak(){zakClouds=[];zakLaughClouds=[];zakGasTrail=[];zakShots=[];zakBurst=zakLaunch=zakMood=0;}
// Automatic ranged weapon. Target acquisition is independent of other characters.
function zakGasBlast(){if(!isZak()||!p)return false;let e=nearest(p,new Set(),340);if(!e)return false;let dx=e.x-p.x,dy=e.y-p.y,n=Math.hypot(dx,dy)||1,base=Math.atan2(dy,dx);let count=tier>=3?3:1;
for(let i=0;i<count;i++){let a=base+(i-(count-1)/2)*.19;zakShots.push({x:p.x+Math.cos(a)*17,y:p.y+Math.sin(a)*17,px:p.x,py:p.y,vx:Math.cos(a)*370,vy:Math.sin(a)*370,life:1.15,r:tier>=1?9:7,damage:(tier>=2?12:9)*(tier>=5?1.2:1),pierce:tier>=4?2:1,hit:new Set()});}
zakMood=.35;p.throwT=.18;pop(p.x+dx/n*19,p.y+dy/n*19,'#a8eb62',4);return true;}
function zakExplosion(){if(state!=='playing'||p.action||p.chargeCD>0)return;p.chargeCD=specialCooldown();zakBurst=.8;zakMood=1.15;let r=105+(S(2)?25:0),life=2.5+(S(1)?1.5:0);zakLaughClouds.push({x:p.x,y:p.y,r,life,max:life,age:0,tick:0,hit:new Set()});radialEffect(p.x,p.y,r,'#c4a3e7');pop(p.x,p.y,'#a3db5b',24);float(p.x,p.y-42,'TOXIC FART CLOUD!','#d8f68c');for(let e of enemies){if(e.hp<=0||dist(p,e)>r+e.r)continue;let dx=e.x-p.x,dy=e.y-p.y,n=Math.hypot(dx,dy)||1;damageEnemy(e,16*(S(3)?1.35:1),dx/n,dy/n,false,'special');zakMakeLaugh(e,life);}if(S(5))zakClouds.push({x:p.x,y:p.y,r:72,life:3,tick:0,age:0});}
function zakMakeLaugh(e,duration){if(e.hp<=0)return;let resist=e.kind==='boss'?.12:e.kind==='heavy'?.5:1;let until=time+Math.min(e.kind==='boss'?.35:2.2,duration*resist);e.zakLaughUntil=Math.max(e.zakLaughUntil||0,until);e.stunUntil=Math.max(e.stunUntil||0,until);e.zakLaughMark=time+.12;}
function zakDodge(){if(state!=='playing'||p.action||p.dodgeCD>0)return;quickDodge();if(p.action!=='dodge')return;zakLaunch=.5;zakMood=.8;radialEffect(p.x,p.y,33,'#b6e76e');pop(p.x,p.y,'#a5d96b',10);for(let e of enemies){if(e.hp<=0||dist(p,e)>(D(2)?52:37)+e.r)continue;let dx=e.x-p.x,dy=e.y-p.y,n=Math.hypot(dx,dy)||1;damageEnemy(e,D(3)?8:4,dx/n,dy/n,true,'special');}if(D(5))zakClouds.push({x:p.x,y:p.y,r:35,life:1.6,tick:0,age:0});}
function updateZak(dt){if(!isZak())return;zakBurst=Math.max(0,zakBurst-dt);zakLaunch=Math.max(0,zakLaunch-dt);zakMood=Math.max(0,zakMood-dt);
for(let shot of zakShots){shot.life-=dt;shot.px=shot.x;shot.py=shot.y;shot.x+=shot.vx*dt;shot.y+=shot.vy*dt;for(let e of enemies){if(e.hp<=0||shot.hit.has(e.id))continue;let sx=shot.x-shot.px,sy=shot.y-shot.py,ll=sx*sx+sy*sy,q=ll?clamp(((e.x-shot.px)*sx+(e.y-shot.py)*sy)/ll,0,1):0;if(Math.hypot(e.x-(shot.px+sx*q),e.y-(shot.py+sy*q))<e.r+shot.r){shot.hit.add(e.id);damageEnemy(e,shot.damage,shot.vx/370,shot.vy/370,false,'weapon');if(signatureActive('zak'))signaturePatch(e.x,e.y,'poison',signaturePower(.25));if(tier>=2)e.poisonUntil=Math.max(e.poisonUntil||0,time+1.5);pop(e.x,e.y,'#a8ef67',7);if(shot.hit.size>=shot.pierce){shot.life=0;break;}}}}zakShots=zakShots.filter(shot=>shot.life>0);
for(let e of enemies){if(e.hp>0&&e.poisonUntil>time){e.zakPoisonTick=(e.zakPoisonTick||0)-dt;if(e.zakPoisonTick<=0){e.zakPoisonTick=.6;damageEnemy(e,3,0,0,false,'status');}}if(e.hp>0&&e.zakLaughUntil>time&&time>=(e.zakLaughMark||0)){e.zakLaughMark=time+.65;pop(e.x,e.y-e.r,'#dfb8f1',2);}}
for(let c of zakClouds){c.life-=dt;c.age+=dt;c.tick-=dt;if(c.tick<=0){c.tick=.48;for(let e of enemies){if(e.hp<=0||dist(c,e)>c.r+e.r)continue;damageEnemy(e,(tier>=3?8:6)*(tier>=5?1.25:1),0,0,false,'special');e.poisonUntil=Math.max(e.poisonUntil||0,time+.8);}}}zakClouds=zakClouds.filter(c=>c.life>0);
for(let c of zakLaughClouds){c.life-=dt;c.age+=dt;c.tick-=dt;if(c.tick<=0){c.tick=.18;for(let e of enemies){if(e.hp<=0||dist(c,e)>c.r+e.r)continue;zakMakeLaugh(e,Math.min(c.life+.2,1.3));e.poisonUntil=Math.max(e.poisonUntil||0,time+1.2);if(!c.hit.has(e.id)){c.hit.add(e.id);damageEnemy(e,4,0,0,false,'special');}}}}zakLaughClouds=zakLaughClouds.filter(c=>c.life>0);
}
function drawZakClouds(){if(!isZak())return;for(let shot of zakShots){line([[shot.px,shot.py],[shot.x,shot.y]],'#d7fba5',3);ellipse(shot.x,shot.y,shot.r,shot.r*.85,'#9ae653');ellipse(shot.x-2,shot.y-2,shot.r*.35,shot.r*.35,'#e4ffb5');}for(let c of zakClouds){ctx.save();ctx.globalAlpha=Math.min(.43,c.life*.18);for(let i=0;i<7;i++){let a=i*TAU/7+c.age*.4,r=c.r*.48;ellipse(c.x+Math.cos(a)*r,c.y+Math.sin(a)*r,c.r*.47,c.r*.34,i%2?'#8ecb53':'#c1e776');}ctx.restore();}
for(let c of zakLaughClouds){ctx.save();ctx.globalAlpha=Math.min(.33,c.life*.19);for(let i=0;i<9;i++){let a=i*TAU/9+c.age*.35,r=c.r*(.3+.2*Math.sin(i*3));ellipse(c.x+Math.cos(a)*r,c.y+Math.sin(a)*r,c.r*.37,c.r*.30,i%2?'#a7dc81':'#cba7ed');}ctx.restore();radialDraw(c.x,c.y,c.r,'#b5a0e644');}
if(zakBurst>0)radialDraw(p.x,p.y,105*(1-zakBurst/.8),'#b3ed78');if(zakLaunch>0)radialDraw(p.x,p.y,40*(1-zakLaunch/.5),'#c5e982');}
// Street Zak (approved option A): flat game-scale silhouette, detached paws, no limbs.
function drawZak(){ctx.save();ctx.translate(p.x,p.y+Math.sin(p.walk*1.25)*1.3+(zakLaunch>0?-Math.sin((.5-zakLaunch)/.5*Math.PI)*8:0));ctx.scale(.9021,.8922);if(p.inv>0&&Math.floor(p.inv*22)%2===0)ctx.globalAlpha=.65;
ellipse(0,21,17,4,'#142e2a55');
// Long grey-purple tail, kept separate from the hoodie.
ctx.strokeStyle='#555267';ctx.lineWidth=8;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(11,11);ctx.bezierCurveTo(34,24,39,-5,27,-9);ctx.stroke();ellipse(27,-9,6,6,'#b9b4c3');
// Floating black hoodie, zipped front, purple hood and small waist pouch. No arms or legs.
ellipse(0,6,16,19,'#24232c');ellipse(0,8,13,16,'#33313d');
ellipse(0,-5,15,8,'#493d61');ellipse(0,2,11,13,'#292b33');
line([[-7,-4],[-4,7]],'#a187c5',1.3);line([[7,-4],[4,7]],'#a187c5',1.3);
line([[0,-1],[0,15]],'#b8aa95',1);ellipse(0,6,1.6,2,'#dfc17b');
ellipse(0,14,9,5,'#5b463b');ellipse(0,13,8,3,'#7b5b40');ellipse(0,12,2.8,2.8,'#e3b95c');
// Independent floating paws positioned well away from body, no connecting sleeves.
let swing=Math.sin(p.walk*2)*2.2,reach=p.throwT>0?5:0;
for(let side of [-1,1]){let hx=side*(27+reach),hy=-1-side*swing;ellipse(hx,hy,6.4,6.5,'#b8a8c2');ellipse(hx,hy+1,4.7,4.8,'#e1d7e0');ellipse(hx,hy+1,2.4,2.2,'#9e84b0');for(let k=-1;k<=1;k++)ellipse(hx+k*2.5,hy-3.4,1,1.2,'#a68ab4');}
// Teenage grey-purple cat face and untidy brown fringe.
ellipse(0,-15,17,15,'#8b8797');
ctx.fillStyle='#777283';ctx.beginPath();ctx.moveTo(-14,-19);ctx.lineTo(-13,-32);ctx.lineTo(-3,-25);ctx.lineTo(4,-25);ctx.lineTo(12,-32);ctx.lineTo(14,-19);ctx.fill();
ctx.fillStyle='#c6b1c5';ctx.beginPath();ctx.moveTo(-11,-26);ctx.lineTo(-11,-30);ctx.lineTo(-6,-25);ctx.moveTo(6,-25);ctx.lineTo(11,-30);ctx.lineTo(11,-26);ctx.fill();
if(heroBlink()){for(let side of [-1,1])line([[side*7-3,-12],[side*7,-11],[side*7+3,-12]],'#46394b',1.5);}else{ellipse(-7,-12,4.1,5,'#a9d581');ellipse(7,-12,4.1,5,'#a9d581');ellipse(-6,-12,1.6,3,'#263b29');ellipse(8,-12,1.6,3,'#263b29');ellipse(-7,-14,1,1,'#fff');ellipse(6,-14,1,1,'#fff');}
ellipse(0,-5,8,5,'#d9cbd6');ellipse(0,-7,2,1.4,'#a27886');line([[-4,-3],[0,-1],[4,-3]],'#604b60',1.4);
ctx.fillStyle='#755039';ctx.beginPath();ctx.moveTo(-15,-24);ctx.quadraticCurveTo(-8,-32,0,-29);ctx.quadraticCurveTo(11,-34,15,-23);ctx.quadraticCurveTo(6,-25,3,-22);ctx.quadraticCurveTo(-2,-20,-5,-23);ctx.quadraticCurveTo(-11,-21,-15,-24);ctx.fill();ellipse(-3,-27,8,2.8,'#8b6041');
// Sideways black cap with green paw emblem. Brim projects to Zak's left.
ctx.fillStyle='#1b2028';ctx.beginPath();ctx.moveTo(-15,-27);ctx.quadraticCurveTo(-14,-39,-1,-39);ctx.quadraticCurveTo(13,-40,16,-29);ctx.lineTo(15,-26);ctx.quadraticCurveTo(0,-31,-15,-27);ctx.fill();
ctx.fillStyle='#151b23';ctx.beginPath();ctx.moveTo(-8,-29);ctx.quadraticCurveTo(-21,-31,-25,-27);ctx.quadraticCurveTo(-24,-23,-11,-24);ctx.lineTo(2,-27);ctx.fill();
ellipse(-9,-33,2.5,2.2,'#8cd53f');for(let k=0;k<3;k++)ellipse(-12+k*2.4,-36,1,1,'#8cd53f');
if(zakMood>0)ellipse(0,-1,2.5,2.2,'#563b59');
if(p.throwT>0){ellipse(-17,12,9,5,'#b4e16a77');ellipse(-22,9,5,3,'#a9d76b99');}ctx.restore();}
CHARACTERS.zak={name:'Zak',hp:130,speed:145,damage:6,rate:1.20,dodgeSpeed:500,dodgeTime:.28,specialCD:12};
PROFILES.zak={role:'GENTLE GIANT',tag:'Big heart. Bigger farts.',attack:'Gas Blast',attackDesc:'Automatic ranged gas shots · targeted',special:'Toxic Fart Cloud',specialDesc:'Poisonous area burst · crowd control · 12s',dodge:'Gas-Powered Launch',dodgeDesc:'Explosive escape · backblast · 1.65s'};
SPECIALS.zak=[['Extra Nasty','Toxic cloud lasts 1.5 seconds longer.'],['Big Stink','Toxic cloud radius grows by 25 units.'],['Toxic Overload','Cloud burst impact damage increases 35%.'],['Rapid Recharge','Toxic Fart Cloud cooldown 12 → 9 seconds.'],['Lingering Blast','Toxic cloud also leaves a 3-second poisonous patch.']];
DODGES.zak=[['Long Launch','Travel 15% farther.'],['Big Backblast','Launch backblast radius increases.'],['Powerful Propulsion','Backblast damage doubles.'],['Quick Escape','Launch cooldown 1.65 → 1.25 seconds.'],['Stinky Landing','Leave a short toxic cloud at takeoff.']];
STAT_NAMES.zak=['Tough Stomach','Quick Feet','Rapid Gas','Cloud Collector','Noxious Strength'];
const zakNames=['Bigger Blast','Toxic Payload','Multi Blast','Piercing Gas','Maximum Stench'];
const zakText=['Gas Blast projectiles grow larger.','Gas Blast damage rises from 9 to 12 and poisons enemies.','Fire three gas projectiles in a spread.','Gas Blast pierces one extra enemy.','Gas Blast damage increases another 20%.'];
