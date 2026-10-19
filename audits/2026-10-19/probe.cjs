const fs=require('fs'),vm=require('vm');
const src=fs.readFileSync('journey-v10/monster-town-test.cjs','utf8');
let box={require,console};vm.createContext(box);vm.runInContext(src.slice(0,src.indexOf('const {t,c}=load();'))+'globalThis.auditLoad=load',box);
let {t,c}=box.auditLoad();const ev=s=>vm.runInContext(s,c);
t.select('jackson');t.startJourney();t.enterArena('park',true);t.clear();t.spawn('boss',{x:450,y:500});ev('p.inv=999;p.attack=999;nextSpawn=Infinity;boss.hp=boss.maxHp*.6;boss.sequence=1;boss.timer=0');
let modes=new Set();for(let i=0;i<1800;i++){t.step(1/60);modes.add(t.boss.mode)}
console.log('PRODUCTION_PARK_BOSS',JSON.stringify({modes:[...modes],healUsed:t.boss.healUsed,piles:t.parkPiles.map(x=>x.charge),hp:t.boss.hp,maxHp:t.boss.maxHp}));
// Positive control: the park-specific AI still contains working healing logic, but shared dispatch bypasses it.
t.menu();t.select('jackson');t.startJourney();t.enterArena('park',true);t.clear();t.spawn('boss',{x:165,y:280});ev('p.inv=999;p.attack=999;boss.hp=boss.maxHp*.6;boss.sequence=1;boss.timer=0;p.x=180;p.y=340');modes=new Set();for(let i=0;i<300;i++){ev('time+=1/60;boss.timer-=1/60;stepParkEnemy(boss,1/60)');modes.add(t.boss.mode)}console.log('PARK_SPECIFIC_AI_CONTROL',JSON.stringify({modes:[...modes],healUsed:t.boss.healUsed}));
// Exact progression economy and movement-only lower bound; no human pacing claim.
console.log('ECONOMY',JSON.stringify(ev('({bossEssence:2,costs:ESSENCE_COSTS,upgrades:PERMANENT_UPGRADES,rerollFirst:2,starterCosts:STARTER_COSTS})')));
let full=ev('ESSENCE_COSTS.reduce((a,b)=>a+b,0)*Object.keys(PERMANENT_UPGRADES).length');console.log('MAX_ONE_HERO',JSON.stringify({essence:full,bosses:full/2,perfectFiveBossJourneys:full/10}));
// Demonstrate interrupted play saves permanent progress only in released 10.23.
let st=new Map();let a=box.auditLoad(st);a.t.select('jackson');a.t.startJourney();a.t.enterArena('quarry',true);a.t.grantGold(77);a.t.grant('weapon');a.t.step(.01);let reload=box.auditLoad(st);console.log('RELOAD',JSON.stringify({savedKeys:[...st.keys()],before:{gold:a.t.hub.coins,tier:a.t.state.tier,state:a.t.state.state},after:{gold:reload.t.hub.coins,tier:reload.t.state.tier,state:reload.t.state.state}}));
