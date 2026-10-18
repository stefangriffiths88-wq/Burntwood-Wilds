// Deterministic reward contracts, not an assertion of human survival balance.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let s=fs.readFileSync('journey-v10/test.cjs','utf8');
let harness=s.slice(0,s.indexOf("reset('zak');t.startJourney()"))+'\nglobalThis.h={t,els,reset,target};';
let rewardSeed=314159,testMath=Object.create(Math);testMath.random=()=>{rewardSeed=(rewardSeed*1664525+1013904223)>>>0;return rewardSeed/4294967296;};
let context={require,console,Math:testMath};vm.createContext(context);vm.runInContext(harness,context);
const {t,els,reset,target}=context.h;
const heroes=['ava','jackson','stef','jodie','evie','zak','mimi','joseph','tom','havannah'];
{
 for(let hero of heroes){
  reset(hero);let e=target(),base=e.hp;t.damageEnemy(e,50,0,0);let before=base-e.hp;
  let hp=e.hp,max=e.maxHp,damage=e.damageScale,spawn=t.stageSpawnDelay(1),pressure=t.pressureTime();
  t.setRolls([(Object.keys(t.STAT_TRACKS).filter(k=>t.rewardStatAvailable(k)).indexOf('power')+.1)/Object.keys(t.STAT_TRACKS).filter(k=>t.rewardStatAvailable(k)).length,0]);t.setXP(999);let i=t.offers().findIndex(o=>o.path==='stat'&&o.index==='power');assert(i>=0);
  assert.equal(t.offers().filter(o=>o.total).length,2);t.choose(i);
  assert.equal(e.hp,hp,hero+' reward must not heal an enemy');assert.equal(e.maxHp,max);assert.equal(e.damageScale,damage);
  assert.equal(t.stageSpawnDelay(1),spawn);assert.equal(t.pressureTime(),pressure);
  base=e.hp;t.damageEnemy(e,50,0,0);let ratio=(base-e.hp)/before;
  assert(ratio>=1.10&&ratio<1.12,hero+' Common Power should give an actual 10%+ hit improvement');
  base=e.hp;t.damageEnemy(e,50,0,0,false,'cat');assert(Math.abs(base-e.hp-before*ratio)<1e-7);
  assert.match(els.rewardToast.firstChild.textContent,/POWER/);assert.match(els.rewardToastDetail.textContent,/Power/);
  t.menu();assert.equal(els.rewardToast.style.display,'none');
 }
 console.log('PASS all ten heroes: real Common Power selection improves normal/companion damage; no enemy HP/damage/spawn penalty; reward notice resets');

 for(let stage=0;stage<5;stage++)for(let pick=0;pick<6;pick++){
  reset();t.run.stage=stage;t.run.stagePicks=pick;t.setRolls([.25,0]);let offers=t.buildOffers();
  assert.equal(offers.length,3);assert.equal(new Set(offers.map(o=>o.path==='stat'?o.index:o.path)).size,3);
  let stat=offers.find(o=>o.path==='stat');assert(stat);
  assert.equal(stat.rarity,(pick+1)%3===0?(stage>=3?3:2):0);
  t.run.level=31;let scale=t.enemyScale('swarm');t.run.level=1;assert.deepEqual(scale,t.enemyScale('swarm'));
  let charms=t.rollCharmOffers();assert.equal(new Set(charms).size,3);assert(charms.some(k=>t.CHARMS[k].rarity>=(stage>=3?3:2)));
 }
 reset();assert(!t.rewardStatAvailable('ferocity'));t.addStat('precision',0);assert(t.rewardStatAvailable('ferocity'));
 reset();let statKeys=Object.keys(t.STAT_TRACKS).filter(k=>t.rewardStatAvailable(k));t.setRolls([(statKeys.indexOf('scavenging')+.1)/statKeys.length,0]);t.setXP(999);let scavenge=t.offers().findIndex(o=>o.index==='scavenging');assert(scavenge>=0);assert.match(t.offers()[scavenge].text,/5 gold now/);let gold=t.hub.coins;t.choose(scavenge);assert.equal(t.hub.coins,gold+5);
 reset();t.run.charms.push({key:'blunt',rank:1});assert(!t.rewardStatAvailable('precision'));assert(!t.rewardStatAvailable('ferocity'));
 t.run.charmFX.lanternUsed=true;assert(!t.rewardStatAvailable('regen'));assert(!t.rewardStatAvailable('restoration'));
 reset();t.run.charms.push({key:'clockwork',rank:3},{key:'watch',rank:3});assert(!t.rewardStatAvailable('focus'),'capped cooldown must not be offered');
 reset();t.run.charms.push({key:'keen',rank:3});t.run.stats.precision=59;assert(!t.rewardStatAvailable('precision'),'capped critical chance must not be offered');
 t.run.stats.precision=58;assert(t.rewardStatAvailable('precision'));let available=Object.keys(t.STAT_TRACKS).filter(k=>t.rewardStatAvailable(k));t.setRolls([(available.indexOf('precision')+.1)/available.length,0]);t.setXP(999);let at=t.offers().findIndex(o=>o.index==='precision');assert.match(t.offers()[at].text,/ \+1% · 58% → 59%/);t.choose(at);assert.equal(t.statValue('precision'),59);assert.equal(t.buildStats().critChance,75);
 assert.equal(t.rewardCardLabel({path:'weapon',rank:5,total:5}),'NORMAL ATTACK · STEP 5 OF 5 · FINAL UPGRADE');
 console.log('PASS milestone rarity, two distinct ability paths, useful stat filtering, honest ability labels and Rare+/Epic+ heroic rewards');

 for(let stage=0;stage<5;stage++)for(let coins of [0,30,55,95,150,220]){
  reset();t.startJourney();t.run.visited=Array(stage).fill('audit');t.hub.coins=coins;t.run.shopStock=null;
  t.ensureShopStock();let stock=t.run.shopStock;assert.equal(new Set(stock.map(o=>o.key)).size,3);
  assert(stock.every(o=>o.key!=='purse'));
  if(coins>=30)assert(stock.some(o=>t.CHARM_GOLD_PRICES[t.CHARMS[o.key].rarity]<=coins));
  let generation=t.run.shopGeneration;t.ensureShopStock();assert.equal(t.run.shopGeneration,generation,'reopening must not reroll stock');
 }
 reset();t.spawn('boss',{x:600,y:500});let boss=t.boss,coins=t.hub.coins;t.damageEnemy(boss,1e9,0,0);assert.equal(t.hub.coins,coins+35);
 reset();let elite=t.spawnHeroic();coins=t.hub.coins;t.damageEnemy(elite,1e9,0,0);assert.equal(t.hub.coins,coins+20);
 reset();assert.equal(t.perkDamage(8),8);t.addStat('power',4);assert.equal(t.perkDamage(8),11.2);
 console.log('PASS distinct affordable stock, no free shop refresh, exact boss/heroic gold and single Power scaling for damage perks');

 const report=[];
 for(let hero of heroes)for(let strategy of ['weapon','special','stat']){
  reset(hero);for(let stage=0;stage<5;stage++){t.run.stage=stage;t.run.stagePicks=0;
   for(let pick=0;pick<6;pick++){t.setXP(999);let offers=t.offers(),i=offers.findIndex(o=>o.path===strategy);t.choose(i<0?0:i);}
  }
  assert.equal(t.run.history.length,30);assert.equal(t.run.level,31);
  let stats=t.buildStats();assert(stats.tempo<=150&&stats.critChance<=75&&stats.special<=70&&stats.dodge<=50);
  assert(t.specialCooldown()>0&&t.dodgeCooldown()>0);assert(stats.health>0);
  report.push({hero,strategy,choices:t.run.history.length,health:+stats.health.toFixed(2),power:+stats.power.toFixed(2),tempo:+stats.tempo.toFixed(2)});
 }
 fs.writeFileSync('journey-v10/reward-balance-results.json',JSON.stringify({note:'Deterministic selection/cap audit, not a survival or fun score.',builds:report},null,2));
 console.log('PASS 30 ten-hero/three-strategy selection builds: 900 choices, finite stats/cooldowns and retained caps');
}
