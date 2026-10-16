// upgrades/rewards.js — source of truth.
function rewardRandom(){return rewardRolls.length?rewardRolls.shift():Math.random();}

function rollPerks(){let keys=Object.keys(PERKS);for(let i=keys.length-1;i>0;i--){let j=Math.floor(rewardRandom()*(i+1));[keys[i],keys[j]]=[keys[j],keys[i]];}return keys.slice(0,3);}

function openBossReward(){$('runSummary').style.display='none';if(state!=='won'||run.stage!==0||run.perk)return;if(!run.rewardOffers)run.rewardOffers=rollPerks();clearRewardNotice();state='perk';$('panel').style.display='grid';$('panelTitle').textContent='BOSS REWARD · CHOOSE ONE';$('panelName').textContent='Give this run a new twist';$('panelText').textContent='Three random perks. Pick one for the next arena. No rerolls.';$('panelButton').style.display='none';$('continue').style.display='none';$('back').style.display='none';$('upgradeChoices').innerHTML=run.rewardOffers.map((key,i)=>'<button class="upgradeCard perkCard" data-choice="'+i+'" style="--perk:'+PERKS[key].color+'"><span>BOSS PERK</span><b>'+PERKS[key].name+'</b><small>'+PERKS[key].text+'</small></button>').join('');$('upgradeChoices').style.display='grid';for(let i=0;i<3;i++)$('upgradeChoices').children[i].onclick=()=>chooseBossPerk(i);}

function chooseBossPerk(i){if(state!=='perk'||run.stage!==0||run.perk||!run.rewardOffers?.[i])return;run.perk=run.rewardOffers[i];run.vampBudget=2;run.lightningAt=-1;state='won';continueRun();}

function recoverHealth(amount,kind='normal'){let old=p.hp;p.hp=Math.min(stats().hp,p.hp+Math.max(0,amount)*healingFactor(kind==='blood'));let healed=p.hp-old;if(healed>.01){float(p.x,p.y-24,'+'+healed.toFixed(healed<1?1:0),'#bcf0a9');radialEffect(p.x,p.y,17,'#95ddb1');}return healed;}

function dropHeart(e){if(e.kind==='boss'||hearts.length>=6)return;let milestone=kills%12===0,low=p.hp/stats().hp<.45,chance=low?.28:.06;if(milestone||(time>=nextHeartAt&&rewardRandom()<chance)){let q=walkable(e.x,e.y,7);hearts.push({x:q.x,y:q.y,life:30,heal:Math.max(10,Math.round(stats().hp*.10))});nextHeartAt=time+2.5;}}

// Secondary perk damage scales once with Power; it still cannot proc itself.
function perkDamage(amount){return amount*(1+buildStats().power/100);}
function hitPerk(e,actual,source){if(!run.perk||actual<=0||source==='perk'||source==='status'||source==='charm'||source==='clone')return;
if(run.perk==='vampiric'){let amount=Math.min(actual*.04,(run.vampBudget||0)/Math.max(.01,healingFactor()));if(p.hp<stats().hp){let healed=recoverHealth(amount);run.vampBudget=Math.max(0,(run.vampBudget||0)-healed);}return;}
if(run.perk==='lightning'){if(time>=(run.lightningAt||-1)){let other=nearest(e,new Set([e.id]),120);if(other){run.lightningAt=time+.65;fx.push({x:e.x,y:e.y,vx:0,vy:0,life:.18,max:.18,arcX:other.x,arcY:other.y,color:'#f3e49b',r:0});damageEnemy(other,perkDamage(8),0,0,false,'perk');}}return;}
if(e.hp<=0)return;
if(run.perk==='fire'){e.burnUntil=time+2.4;if(!(e.burnNext>time))e.burnNext=time+.4;}
else if(run.perk==='ice'){e.frostUntil=time+1.2;e.slowUntil=Math.max(e.slowUntil||0,e.frostUntil);}
else if(run.perk==='wounding'){if(time>=(e.nextWound||0)){if(!(e.bleedUntil>time))e.bleedStacks=0;e.bleedStacks=Math.min(3,(e.bleedStacks||0)+1);e.nextWound=time+.2;}e.bleedUntil=time+3;if(!(e.bleedNext>time))e.bleedNext=time+.5;}}

function onDefeated(e){dropGold(e);heroicDefeated(e);charmOnKill(e);dropHeart(e);if(run.perk==='fire'&&e.burnUntil>time){let other=nearest(e,new Set([e.id]),65);if(other){other.burnUntil=Math.max(other.burnUntil||0,time+1.2);if(!(other.burnNext>time))other.burnNext=time+.4;radialEffect(other.x,other.y,13,'#efab64');}}}

function rewardStep(dt){if(run.perk==='vampiric')run.vampBudget=Math.min(2,(run.vampBudget||0)+2*dt);
for(let e of enemies){if(e.hp<=0)continue;if(e.burnUntil>time&&time>=e.burnNext){e.burnNext=time+.4;damageEnemy(e,perkDamage(2),0,0,false,'perk');}if(e.hp>0&&e.bleedUntil>time&&time>=e.bleedNext){e.bleedNext=time+.5;damageEnemy(e,perkDamage(1.5*(e.bleedStacks||1)),0,0,false,'perk');}}
for(let i=hearts.length-1;i>=0;i--){let h=hearts[i];h.life-=dt;let d=dist(h,p);if(d<52){let move=Math.min(d,150*dt);h.x+=(p.x-h.x)/(d||1)*move;h.y+=(p.y-h.y)/(d||1)*move;}if(d<17&&p.hp<stats().hp){recoverHealth(h.heal);hearts.splice(i,1);}else if(h.life<=0)hearts.splice(i,1);}}

function drawHeart(h){ctx.save();ctx.translate(h.x,h.y+Math.sin(time*4)*1.5);ellipse(0,6,7,2.2,'#173b2955');ctx.fillStyle='#e59b98';ctx.strokeStyle='#ffe1be';ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(0,5);ctx.bezierCurveTo(-12,-2,-5,-10,0,-5);ctx.bezierCurveTo(5,-10,12,-2,0,5);ctx.fill();ctx.stroke();ctx.restore();}

function drawEnemyHealth(e){if(e.hp<=0||e.kind==='boss'||(e.hp>=e.maxHp&&e.kind!=='heavy'&&!e.heroic))return;let width=e.kind==='heavy'?29:21,y=e.y-e.r-18,ratio=clamp(e.hp/e.maxHp,0,1);ctx.fillStyle='#152b25dd';ctx.fillRect(e.x-width/2-1,y-1,width+2,5);ctx.fillStyle=ratio>.6?'#b6d997':ratio>.3?'#f1d17c':'#ee9380';ctx.fillRect(e.x-width/2,y,width*ratio,3);}

function drawStatus(e){if(e.hp<=0)return;if(e.burnUntil>time){ctx.strokeStyle='#efad68';ctx.lineWidth=1.3;ctx.beginPath();ctx.moveTo(e.x-5,e.y+3);ctx.lineTo(e.x-2,e.y-3);ctx.lineTo(e.x,e.y+2);ctx.lineTo(e.x+3,e.y-5);ctx.lineTo(e.x+5,e.y+3);ctx.stroke();}if(e.frostUntil>time){ctx.strokeStyle='#9bdcf2';ctx.lineWidth=1.4;ctx.beginPath();ctx.ellipse(e.x,e.y+e.r*.5,e.r+2,4,0,0,TAU);ctx.stroke();}if(e.bleedUntil>time){for(let i=0;i<(e.bleedStacks||1);i++)line([[e.x-5+i*4,e.y+1],[e.x-3+i*4,e.y+7]],'#df8293',1.5);}}

function drawPlaytestExtras(){for(let h of hearts)drawHeart(h);for(let e of enemies){drawEnemyHealth(e);drawStatus(e);}for(let t of scheduled)if(t.kind==='meteor'&&!t.done){let u=1-clamp(t.wait/t.fall,0,1),x=t.x+(1-u)*80,y=t.y-(1-u)*200;line([[x+23,y-55],[x,y]],'#efbeed88',9);line([[x+12,y-30],[x,y]],'#ffdfb9cc',4);starArt(x,y,13+u*4,time*4);}}
const PERKS={fire:{name:'Fire',color:'#f5a15a',text:'Hits burn enemies; fire damage grows with Power. Burning defeats spread fire to a nearby foe.'},ice:{name:'Ice',color:'#95dcf1',text:'Hits slow enemies by 30% for 1.2s. Refreshes rather than multiplying other slows.'},lightning:{name:'Lightning',color:'#e5d975',text:'Hits arc to a nearby foe: 8 base damage, growing with Power. At most once every 0.65s.'},vampiric:{name:'Vampiric',color:'#ba9ce5',text:'Steal 4% of actual hit damage as health, limited to 2 health/sec across all attacks and companions.'},wounding:{name:'Wounding',color:'#ee8c91',text:'Hits build up to three bleeds. Each stack starts at 3 damage/sec for 3s and grows with Power; stacks are rate-limited.'}};
let hearts=[],nextHeartAt=0,rewardRolls=[];
