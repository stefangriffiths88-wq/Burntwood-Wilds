// Isolated mechanics plus full actual-attack journeys. Invulnerable runs verify mechanics, not human balance.
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('journey-v10/test.cjs','utf8');let harness=source.slice(0,source.indexOf("reset('zak');t.startJourney()"));harness+='\nglobalThis.h={t,els,reset,steps,target,grant,heroes};';let context={require,console};vm.createContext(context);vm.runInContext(harness,context);const {t,els,reset,steps,target,grant,heroes}=context.h;
function settle(sec){for(let i=0;i<Math.ceil(sec*120);i++){t.player.inv=999;t.step(1/120);if(t.state.state==='upgrade')t.choose(0);if(t.state.state==='charm')t.chooseCharm(0);}}
function empty(){t.clear();t.player.attack=999;}
function c(key,rank=1){t.run.charms.push({key,rank});}

// Start with no charms: actual timer, ordinary upgrades, real hero attacks, all arenas.
// Invulnerability and positioning isolate reward mechanics from human survival skill.
for(let hero of heroes)for(let area of ['rugby','chasewater','sankeys','quarry','park']){
 reset(hero,area);t.player.attack=.02;assert.equal(t.run.charms.length,0);let found=false,got=false;
 for(let i=0;i<240*60&&!got;i++){
  if(t.state.state==='upgrade'){t.choose(0);continue;}
  if(t.state.state==='charm'){got=true;assert.equal(t.run.charmOffers.length,3);let clock=t.state.time;t.step(1);assert.equal(t.state.time,clock);assert(t.chooseCharm(0));assert.equal(t.run.charms.length,1);assert(!t.chooseCharm(0));break;}
  let mini=t.enemies.find(e=>e.heroic&&e.hp>0);if(mini){found=true;assert.equal(els.bossHud.style.display,'block');assert.match(els.bossHud.firstChild.textContent,/DEFEAT FOR A CHARM/);t.player.x=Math.max(80,mini.x-30);t.player.y=mini.y;}
  t.player.inv=999;t.step(1/60);if(i%120===0)t.charge();
 }
 assert(found&&got,hero+' '+area+' earns a first charm without seeded equipment');
}
console.log('PASS 35 fresh hero/arena runs: timed heroic, real attacks, first charm, paused choice, duplicate guard');
// Real charge contact in every arena, base and full special upgrades.
for(let area of ['rugby','chasewater','sankeys','quarry','park'])for(let rank of [0,5]){
 reset('jackson',area);grant('special',rank);t.spawn('boss',{x:t.player.x+40,y:t.player.y});let b=t.boss;b.speed=0;b.mode='recover';b.timer=999;b.hp=b.maxHp=10000;
 t.player.dir={x:1,y:0};let before=b.hp;t.charge();t.step(.01);assert.equal(before-b.hp,rank?85:65,area+' charge damages boss');assert.equal(b.kx,0);assert.equal(b.ky,0);
 let after=b.hp;t.step(.01);assert.equal(b.hp,after,'one contact per charge');
 if(rank){t.player.x=b.x-40;t.player.y=b.y;t.player.actionT=.75;t.step(.01);assert.equal(after-b.hp,30,'Break the Line adds damage');assert.equal(b.kx,0);assert.equal(b.ky,0);}
 reset('jackson',area);t.spawn('heavy',{x:t.player.x+30,y:t.player.y});let mob=t.enemies.at(-1);mob.speed=0;mob.timer=999;mob.hp=10000;t.charge();t.step(.01);assert(mob.hp<10000&&Math.hypot(mob.kx,mob.ky)>0,'ordinary crowd control preserved');
 reset('jackson',area);let mini=t.spawnHeroic();mini.x=t.player.x+30;mini.y=t.player.y;mini.speed=0;mini.heroTimer=999;before=mini.hp;t.charge();t.step(.01);assert.equal(before-mini.hp,65);assert.equal(mini.kx,0);assert.equal(mini.ky,0);
}
console.log('PASS Jackson base/upgraded charge and finisher: boss damage, zero boss knockback, ordinary crowd control');
// Encounter rewards must not depend on equipped charm effect state.
reset();let mini=t.spawnHeroic();t.run.charmFX=null;t.damageEnemy(mini,999999,0,0);assert(t.run.charmPending);t.step(.01);assert.equal(t.state.state,'charm');
console.log('PASS shared heroic reward lifecycle is independent of charm proc state');

// AoE/companion attacks can finish enemies in either order during one update.
for(let hero of heroes)for(let finalFirst of [true,false]){
 reset(hero);t.spawn('boss',{x:500,y:500});let final=t.boss,mini=t.spawnHeroic(),coins=t.hub.coins;
 for(let e of finalFirst?[final,mini]:[mini,final])t.damageEnemy(e,999999,0,0);
 assert.equal(t.state.state,'charm',hero+' simultaneous defeat order '+finalFirst);assert.equal(t.run.charmOffers.length,3);assert(t.chooseCharm(0));assert.equal(t.state.state,'won');assert.equal(t.run.charms.length,1);assert.equal(t.hub.coins,coins+55);
}
console.log('PASS all seven heroes: both simultaneous heroic/final defeat orders preserve reward and one victory payment');
