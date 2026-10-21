// One saved signature per hero; character-owned triggers, bounded secondary damage.
const SIGNATURE_COST=10;
const SIGNATURES={
 jackson:{name:'Extra Bounce',text:'Every main rugby ball ricochets to one extra enemy. Stacks with journey upgrades.',glyph:'◎'},
 ava:{name:'Starburst',text:'Each main star impact fires two smaller stars at other nearby enemies for 45% star damage.',glyph:'✦'},
 jodie:{name:'Mimi’s Double',text:'A clone of companion Mimi joins every journey, sharing her companion upgrades. Tiny still joins separately.',glyph:'♙'},
 evie:{name:'Another Quack',text:'Every regular duck gets two allied smashes instead of one. Duckling limits stay unchanged.',glyph:'➤'},
 joseph:{name:'Hype Wave',text:'Each Overhype impact releases a 65-radius shockwave for 35% base punch damage.',glyph:'◉'},
 mimi:{name:'Shadow Slash',text:'Shadow Step leaves a sword shadow that sweeps nearby enemies for 80% base sword damage.',glyph:'⚔'},
 stef:{name:'Third Word',text:'Every third normal combination adds a broad two-paw strike for 80% base attack damage.',glyph:'✹'},
 tom:{name:'Groundbreaker',text:'Every third-hit smash sends a travelling groundwave through enemies for 70% base punch damage.',glyph:'➤'},
 zak:{name:'Gas Puddles',text:'Normal Gas Blast impacts leave 2-second poison puddles. Overlapping puddles do not stack.',glyph:'♨'},
 havannah:{name:'Double Attitude',text:'Every split-spark burst repeats once after 0.22 seconds. Repeated sparks cannot split again.',glyph:'✦'},
 immy:{name:'Living Roots',text:'Rootstep patches grow vines that strike nearby enemies three times for 35% base attack damage.',glyph:'♧'},
 harvey:{name:'Spore Garden',text:'Normal spore impacts leave 2-second damaging clouds. Overlapping clouds do not stack.',glyph:'♨'}
};
function signatureOwned(hero=selected){return progress.signatures?.includes(hero)||false;}
function signatureActive(hero=selected){return hero===selected&&run.signature===true;}
let signatureFX={shots:[],patches:[],tasks:[],swipes:[],hits:0};
function resetSignatures(){signatureFX={shots:[],patches:[],tasks:[],swipes:[],hits:0};}
function signaturePower(scale=1){return CHARACTERS[selected].damage*scale*(1+buildStats().power/100)*permanentWeaponScale('weapon');}
function signatureShot(x,y,angle,damage,kind='wave',life=.65,speed=320,exclude=null){if(signatureFX.shots.length>=32)return;signatureFX.shots.push({x,y,px:x,py:y,vx:Math.cos(angle)*speed,vy:Math.sin(angle)*speed,r:kind==='wave'?21:5,damage,kind,life,hit:new Set(exclude===null?[]:[exclude])});}
function signaturePatch(x,y,kind,damage){let patches=signatureFX.patches;patches.push({x,y,kind,damage,r:kind==='vine'?85:42,left:kind==='vine'?1.3:2,tick:0,pulses:0});if(patches.length>12)patches.shift();}
function signatureSweep(x,y,angle,damage,kind='claws'){signatureFX.swipes.push({x,y,angle,kind,left:.35});signatureFX.swipes=signatureFX.swipes.slice(-8);for(let e of enemies.slice())if(e.hp>0&&dist({x,y},e)<105+e.r){let a=Math.atan2(e.y-y,e.x-x),d=Math.atan2(Math.sin(a-angle),Math.cos(a-angle));if(Math.abs(d)<1.2)damageEnemy(e,damage,0,0,false,'signature');}}
function signatureBurst(x,y,r,damage){radialEffect(x,y,r,'#e9cb7e');for(let e of enemies.slice())if(e.hp>0&&dist({x,y},e)<r+e.r)damageEnemy(e,damage,0,0,false,'signature');}
function signatureNormal(){if(!signatureActive()||selected!=='stef')return;if(++signatureFX.hits%3===0)signatureFX.tasks.push({kind:'stef',wait:.3,x:p.x,y:p.y,angle:p.aim||0});}
function signatureDodge(){if(!signatureActive())return;if(selected==='mimi')signatureSweep(p.x,p.y,Math.atan2(p.dir.y,p.dir.x),signaturePower(.8),'shadow');if(selected==='immy')signaturePatch(p.x,p.y,'vine',signaturePower(.35));}
function stepSignatures(dt){let f=signatureFX;for(let task of f.tasks.slice()){task.wait-=dt;if(task.wait<=0){task.done=true;if(task.kind==='stef')signatureSweep(task.x,task.y,task.angle,signaturePower(.8));else if(task.kind==='hav')for(let i=0;i<task.count;i++)signatureShot(task.x,task.y,i*TAU/task.count,task.damage,'star',.65,280,task.exclude);}}f.tasks=f.tasks.filter(t=>!t.done).slice(-12);
 for(let q of f.shots.slice()){q.life-=dt;if(q.life<=0)continue;q.px=q.x;q.py=q.y;q.x+=q.vx*dt;q.y+=q.vy*dt;for(let e of enemies.slice())if(e.hp>0&&!q.hit.has(e.id)&&segmentHits(q.px,q.py,q.x,q.y,e,q.r)){q.hit.add(e.id);damageEnemy(e,q.damage,0,0,false,'signature');if(q.kind!=='wave'){q.life=0;break;}}}f.shots=f.shots.filter(q=>q.life>0);
 // One strongest overlapping puddle/cloud per target and tick; vines are discrete strikes.
 for(let q of f.patches){q.left-=dt;q.tick-=dt;q.due=q.tick<=0;if(q.due){q.tick=.5;q.pulses++;}}
 for(let e of enemies.slice()){if(e.hp<=0)continue;let hit=f.patches.filter(q=>q.left>0&&q.due&&q.pulses<=3+(q.kind==='vine'?0:1)&&dist(q,e)<q.r+e.r);if(hit.length&&time>=(e.signaturePatchNext||0)){e.signaturePatchNext=time+.48;let q=hit.reduce((a,b)=>a.damage>b.damage?a:b);damageEnemy(e,q.damage,0,0,false,'signature');if(q.kind==='vine')lineEffect(q,e,'#a4c977');}}
 f.patches=f.patches.filter(q=>q.left>0);for(let q of f.swipes)q.left-=dt;f.swipes=f.swipes.filter(q=>q.left>0);}
function lineEffect(from,to,color,echo=false){fx.push({x:from.x,y:from.y,arcX:to.x,arcY:to.y,vx:0,vy:0,life:.24,max:.24,color,r:0,echoAttack:echo?selected:null});}
function drawSignatures(){for(let q of signatureFX.patches){ctx.save();ctx.globalAlpha=Math.min(.5,q.left);ellipse(q.x,q.y,q.r,q.r*.6,q.kind==='vine'?'#769c55':'#8cc75c');for(let i=0;i<4;i++){let a=i*TAU/4+time;ellipse(q.x+Math.cos(a)*q.r*.5,q.y+Math.sin(a)*q.r*.3,3,4,'#c6e98c');}if(q.kind==='vine')for(let i=0;i<4;i++){let a=i*TAU/4;line([[q.x,q.y],[q.x+Math.cos(a+.3)*35,q.y+Math.sin(a+.3)*35],[q.x+Math.cos(a)*65,q.y+Math.sin(a)*65]],'#c3dc8b',3);}ctx.restore();}for(let q of signatureFX.shots){if(q.kind==='star')starArt(q.x,q.y,6,time*10);else{let a=Math.atan2(q.vy,q.vx);ctx.save();ctx.translate(q.x,q.y);ctx.rotate(a);line([[-12,-20],[0,-10],[5,0],[0,10],[-12,20]],'#e5c282',4);ctx.restore();}}for(let q of signatureFX.swipes){ctx.save();ctx.translate(q.x,q.y);ctx.rotate(q.angle);ctx.globalAlpha=q.left/.35;if(q.kind==='shadow'){ctx.save();ctx.rotate(-q.angle);ctx.scale(.7,.7);drawTownHero('mimi',0,0);ctx.restore();}for(let i=0;i<3;i++){ctx.strokeStyle=q.kind==='shadow'?'#ccb5ef':'#ffe1ae';ctx.lineWidth=3;ctx.beginPath();ctx.arc(0,0,65+i*9,-1.05,.85);ctx.stroke();}ctx.restore();}}
