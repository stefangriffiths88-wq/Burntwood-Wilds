const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
let source=fs.readFileSync('journey-v10/monster-town-test.cjs','utf8'),sandbox={require,console};vm.createContext(sandbox);vm.runInContext(source.slice(0,source.indexOf('const {t,c}=load();'))+'globalThis.h=load();',sandbox);const {t,c}=sandbox.h,ev=code=>vm.runInContext(code,c);
for(let hero of Object.keys(ev('CHARACTER_MODULES'))){
 t.menu();t.select(hero);t.startJourney();t.enterArena('rugby');t.run.stagePicks=6;t.player.inv=999;t.player.attack=999;
 for(let car of ev('RUGBY_PARKED_CARS')){let q=ev(`rugbyParkedCarPosition(${JSON.stringify(car)})`),r=t.rugbyRoutePosition(q.x,q.y,14,false);assert(Math.abs(r.x-q.x)>=41.9||Math.abs(r.y-q.y)>=65.9,'car body is solid');if(car.lane){assert(q.x<ev(`rugbyLaneX(${car.y})`),'park on right when walking south');assert(Math.abs(q.x-ev(`rugbyLaneX(${car.y})`))<130,'cars visible beside playable lane');}}
 // Every normal centreline sample remains passable, including railway-end entrance.
 for(let n=0;n<=10600;n+=20){let q=ev(`rugbyPointAt(${n})`),r=t.rugbyRoutePosition(q.x,q.y,14,false);assert(Math.hypot(q.x-r.x,q.y-r.y)<.01,'cars/walls leave full guided centreline open');}
 for(let b of ev('RUGBY_ENTRANCE_WALLS')){let q=t.rugbyRoutePosition(b.x+b.w/2,b.y+b.h/2,14,false);assert(!(q.x>b.x-14&&q.x<b.x+b.w+14&&q.y>b.y-14&&q.y<b.y+b.h+14),'brick entrance remains solid');}
 t.enterHub();let before=JSON.stringify(t.state),player=JSON.stringify(t.player);
 ev("drawEnemy=()=>{throw Error('No monster model should render in town')};drawTownScene()");assert.equal(JSON.stringify(t.state),before);assert.equal(JSON.stringify(t.player),player);
}
ev('run.visited=[]');assert.equal(ev('townRestorationLevel()'),0);ev("run.visited=['rugby','chasewater']");assert.equal(ev('townRestorationLevel()'),2);
ev('progress.firstBossDefeated=false;rosterTestAccess=false');assert.equal(ev('townUpgradeAvailable()'),false,'no upgrade advert before service opens');ev("progress.firstBossDefeated=true;progress.essence=2;progress.heroes[selected]={};progress.jacksonGiftClaimed=true");assert.equal(ev('townUpgradeAvailable()'),true);ev('progress.essence=0');assert.equal(ev('townUpgradeAvailable()'),false);ev("progress.essence=100;progress.heroes[selected]={health:5,damage:5,speed:5,cooldown:5,healing:5}");assert.equal(ev('townUpgradeAvailable()'),false,'no advert when all ranks capped');
console.log('PASS twelve heroes: visible lane cars, solid parked cars/brickwork, open complete centreline, town without monster models, stateless rendering, victory restoration and truthful essence affordability');
