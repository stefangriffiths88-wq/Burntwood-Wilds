const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const source=fs.readFileSync('journey-v10/monster-town-test.cjs','utf8'),box={require,console};vm.createContext(box);vm.runInContext(source.slice(0,source.indexOf('const {t,c}=load();'))+'globalThis.fixture=load;',box);
function load(storage=new Map()){let h=box.fixture(storage);return {...h,storage,ev:s=>vm.runInContext(s,h.c)};}
function fresh(hero='jackson'){let h=load();h.ev(`progress.introComplete=progress.rugbyGuideComplete=true;progress.unlockedHeroes=HERO_IDS.filter(k=>k!=='mimi');selected='${hero}';reset();rosterTestAccess=false;enterHub();`);return h;}
for(let fps of [20,30,60,120])for(let kind of ['charge','shockwave','curse']){
 let h=fresh(),{t,ev}=h;ev("arenaKey='queen';state='playing';spawnQueen('boss',{x:450,y:400});p.x=450;p.y=600;p.inv=0");let hp=t.player.hp;
 ev(`boss.monsterCycle=${kind==='charge'?0:kind==='shockwave'?1:2};boss.monsterPlan=queenPlan(boss);boss.monsterState='warning';boss.timer=.5;stepQueen(boss,.01)`);assert.equal(t.player.hp,hp,'warning never deals damage');
 ev("boss.monsterState='attack';boss.timer=.45;boss.monsterFrom={x:boss.x,y:boss.y};boss.monsterHit=false;p.x=boss.monsterPlan.zones[0].kind==='lane'?boss.monsterPlan.zones[0].tx:boss.monsterPlan.zones[0].x;p.y=boss.monsterPlan.zones[0].kind==='lane'?boss.monsterPlan.zones[0].ty:boss.monsterPlan.zones[0].y");
 ev(`for(let i=0;i<${Math.ceil(fps*.45)};i++){boss.timer-=1/${fps};time+=1/${fps};stepQueen(boss,1/${fps});}`);assert(t.player.hp<hp,kind+' warning geometry matches hit at'+fps);let after=t.player.hp;ev('stepQueen(boss,.01)');assert.equal(t.player.hp,after,'one hit per attack');
}
console.log('PASS Queen warning/hit geometry and one-hit attack budget at20/30/60/120fps');
{
 let {t,ev}=fresh('harvey');ev("arenaKey='queen';state='playing';run.signature=true;run.visited=['rugby','chasewater','sankeys','quarry','park'];spawnQueen('boss',{x:450,y:500});boss.hp=1;harveyShot(450,500,0,99999);updateHarvey(.01)");assert.equal(t.state.state,'won');assert.equal(ev('signatureFX.patches.length'),0,'actual killing Harvey shot cannot create a frozen post-victory cloud');
 console.log('PASS actual Harvey killing shot leaves no post-victory signature cloud');
}
for(let [area,kind,worth]of [['park','pouncer',5],['chasewater','goose',3],['rugby','swarm',1]]){
 let {t,ev}=fresh();assert(t.enterArena(area));t.clear();t.spawn(kind,{...t.player});t.damageEnemy(t.enemies.at(-1),99999,0,0);assert.equal(ev('gems.at(-1).value'),worth);let e=t.spawnHeroic({...t.player});t.damageEnemy(e,99999,0,0);assert.equal(ev('gems.at(-1).value'),20);
}
console.log('PASS actual route kills award Park5/Chasewater3/Rugby1 XP, guards20; tutorial retains original XP');
{
 let h=fresh(),{t,ev}=h;ev("progress.queenVictories=1;storeProgress(progress);run.visited=['rugby','chasewater','sankeys','quarry','park'];enterHub()");assert(t.enterArena('queen'));h.els.panelButton.onclick();let original=h.c.localStorage.setItem;h.c.localStorage.setItem=(key,value)=>{if(key==='burntwood-wilds-progress-v2')throw Error('blocked');original(key,value);};t.damageEnemy(t.boss,999999,0,0);assert.equal(t.state.state,'won');assert.equal(t.run.lastQueenReward,5);assert.equal(t.run.pendingAwards.length,1);assert.equal(t.progress.essence,0);assert.equal(t.discardJourneyCheckpoint(),false);let r=load(h.storage);assert(r.t.resumeSavedJourney());assert.equal(r.t.progress.essence,5);assert.equal(r.t.progress.queenVictories,2,'repeat victory is committed exactly once');r.t.resumeRun();assert.equal(r.t.state.state,'won');assert.equal(r.t.progress.essence,5);r.t.returnAfterRun();assert(r.t.hub.finished);
 console.log('PASS repeat Queen reward5, failed final write/reload, protected pending reward and restored finished journey');
}
for(let hero of ['jackson','ava','stef','jodie','evie','zak','mimi','joseph','tom','havannah','immy','harvey','ricky']){
 let h=fresh(hero),{t,ev,els}=h;ev("tier=3;run.special=3;run.dodge=3;run.stats.power=20;run.level=14;hub.coins=120");
 assert(!ev("enterArena('queen')"));
 for(let area of ['rugby','chasewater','sankeys','quarry','park']){assert(t.enterArena(area));t.clear();ev('run.stagePicks=6');t.spawn('boss',{...t.player});t.damageEnemy(t.boss,999999,0,0);assert.equal(t.state.state,'cleared');assert(t.exitClearedArea());assert.equal(t.state.state,'areaVictory');els.panelButton.onclick();assert.equal(t.state.state,'hub');assert.equal(t.run.special,3);assert.equal(t.run.dodge,3);assert.equal(t.run.stats.power,20);}
 assert(!t.heroUnlocked('mimi'));assert.equal(t.progress.essence,10);assert(ev('queenReady()'));assert.equal(ev('recommendedStoryArea()'),'queen');assert.equal(t.townMapMarkers().find(m=>m.key==='queen').label,'♛');assert.doesNotThrow(()=>t.draw());assert(t.hubTap(790,870));assert.equal(t.state.state,'queenBriefing');els.panelButton.onclick();assert.equal(t.state.state,'hub');assert(t.hub.portals.some(p=>p.key==='queen'));assert(ev('openQueenGate()'));assert.equal(t.state.state,'queenBriefing');els.continue.onclick();assert.equal(t.state.state,'queenSpeech');assert.equal(t.run.level,14);assert.equal(t.run.special,3);let gold=t.hub.coins;els.panelButton.onclick();assert(t.boss.queen);assert.equal(t.hub.coins,gold);assert(t.savedJourney);assert.equal(t.savedJourney.arena,'queen');
 t.openPause();t.resumeRun();let b=t.boss;t.damageEnemy(b,b.maxHp*.36,0,0);t.step(.01);assert.equal(b.queenPhase,2);assert.equal(t.enemies.filter(e=>e.queenRoot).length,4);assert.equal(t.enemies.filter(e=>e.queenFollower).length,2);let root=t.enemies.find(e=>e.queenRoot);t.damageEnemy(root,99999,0,0);assert(b.exposedUntil>t.state.time);b.hp=b.maxHp*.2;t.step(.01);assert.equal(b.queenPhase,3);assert(t.enemies.filter(e=>e.queenFollower&&e.hp>0).length<=2);
 t.damageEnemy(b,999999,0,0);assert.equal(t.state.state,'won');assert(t.run.queenDefeated);assert.equal(t.progress.essence,20);assert.equal(t.progress.queenVictories,1);assert(t.progress.cursebreakers.includes(hero));assert(t.heroUnlocked('mimi'));assert.match(els.panelText.textContent,/Jodie/);assert.equal(t.enemies.length,0);assert.equal(t.run.pendingAwards.length,0);assert.equal(ev("queueJourneyAward('queen',10,['mimi'])"),0);assert.equal(t.progress.essence,20);t.returnAfterRun();assert(t.hub.finished);assert(!t.hub.portals.some(p=>p.key==='queen'));t.menu();ev(`selectCharacter('${hero}')`);assert.match(els.charName.textContent,/♛/);
 console.log('PASS five-area build carry, three phases, root weakness, capped followers, final reward/crown',hero);
}
{
 let {t,ev}=fresh();t.enterArena('sankeys');t.clear();ev('run.earned=999;time=0;showUpgrade()');t.choose(0);assert.equal(t.run.level,2);assert.equal(t.state.state,'playing');assert.equal(t.run.preferredPath,'weapon');ev('time=21.9;showUpgrade()');assert.equal(t.state.state,'playing');ev('time=22;showUpgrade()');assert.equal(t.state.state,'upgrade');assert(t.offers().some(o=>o.path==='weapon'));t.choose(t.offers().findIndex(o=>o.path==='weapon'));ev('time=44;showUpgrade()');t.choose(0);assert.equal(t.run.level,4);ev('time=100;showUpgrade()');assert.equal(t.state.state,'playing');assert.equal(t.run.stagePicks,3);
 ev('p.hp=20;run.stats.regen=1;run.recoveryCredit=0;stepBuildStats(30)');assert.equal(t.player.hp,20);ev('run.recoveryCredit=8;stepBuildStats(30)');assert.equal(t.player.hp,28);assert.equal(t.run.recoveryCredit,0);
 t.enterHub();ev("progress.firstBossDefeated=true;progress.unlockedHeroes.push('ava');hub.coins=100");t.openCharmShop(true);let essence=t.progress.essence;assert(t.requestShopReroll());assert(t.confirmShopReroll());assert.equal(t.hub.coins,80);assert.equal(t.progress.essence,essence);assert.equal(ev('shopRerollCost()'),35);
 console.log('PASS spaced three-pick first area, build-directed offers, finite earned recovery and gold-only rerolls');
}
{
 let h=fresh(),{t,ev}=h;t.enterArena('sankeys');t.clear();let original=h.c.localStorage.setItem;h.c.localStorage.setItem=(key,value)=>{if(key==='burntwood-wilds-progress-v2')throw Error('permanent write blocked');original(key,value);};t.spawn('boss',{...t.player});t.damageEnemy(t.boss,999999,0,0);assert.equal(t.progress.essence,0);assert.equal(t.run.pendingAwards.length,1);assert(t.saveJourneyCheckpoint('cleared'));let r=load(h.storage);assert(r.t.resumeSavedJourney());assert.equal(r.t.progress.essence,2);assert.equal(r.t.run.pendingAwards.length,0);r.t.resumeRun();assert.equal(r.ev('flushJourneyAwards()'),true);assert.equal(r.t.progress.essence,2);
 console.log('PASS failed permanent reward survives successful checkpoint/reload, committed exactly once');
}
{
 let h=fresh(),{t,ev}=h;ev("run.visited=['rugby','chasewater','sankeys','quarry','park'];run.special=4;run.level=19;hub.coins=88;enterHub()");assert(t.enterArena('queen'));h.els.panelButton.onclick();let r=load(h.storage);assert(r.t.resumeSavedJourney());assert.equal(r.t.state.state,'paused');assert.equal(r.t.run.special,4);assert.equal(r.t.run.level,19);assert.equal(r.t.hub.coins,88);r.t.resumeRun();assert.equal(r.t.state.state,'playing');assert(r.t.boss.queen);assert.equal(r.t.boss.hp,r.t.boss.maxHp);
 console.log('PASS interrupted Queen restarts at full boss health with entry build/gold and paused recovery');
}
{
 let {t,ev}=fresh();t.enterArena('sankeys');t.clear();t.spawn('boss',{x:500,y:400});let b=t.boss;b.monster=true;b.monsterCycle=1;b.monsterState='recover';b.timer=0;ev('stepUmbrella(boss)');assert.equal(b.monsterState,'umbrellaShield');b.aim=0;t.player.x=b.x+100;t.player.y=b.y;assert.equal(ev('umbrellaDamageFactor(boss)'),.3);t.player.x=b.x-100;assert.equal(ev('umbrellaDamageFactor(boss)'),1);b.monsterState='recover';b.monsterCycle=2;b.timer=0;b.hp=b.maxHp*.5;ev('stepUmbrella(boss)');assert.equal(b.monsterState,'umbrellaHeal');t.damageEnemy(b,b.maxHp*.02,0,0);assert.equal(b.monsterState,'recover');assert.equal(b.healUsed||0,0);
 console.log('PASS active Sankeys shield flanking and interruptible rubbish healing');
}
