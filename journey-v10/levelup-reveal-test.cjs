const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
let source=fs.readFileSync('journey-v10/test.cjs','utf8'),harness=source.slice(0,source.indexOf("reset('zak');t.startJourney()"))+'\nglobalThis.h={t,els,reset,target};';
let c={require,console};vm.createContext(c);vm.runInContext(harness,c);const {t,els,reset,target}=c.h;
for(let hero of ['ava','jackson','stef','jodie','evie','zak','mimi','joseph','tom','havannah']){
 reset(hero);t.run.earned=999;t.player.inv=999;let e=target(90);
 for(let i=0;i<1000&&t.state.state==='playing';i++)t.step(.01);
 assert.equal(t.state.state,'upgrade');assert(t.levelReveal,hero+' actual XP trigger starts anticipation');
 assert.equal(t.run.level,1);assert.equal(t.run.history.length,0);assert.equal(t.offers().length,3);
 let clock=t.state.time,hp=t.player.hp,position=[e.x,e.y],enemyHP=e.hp;
 assert.equal(t.levelRewardProgress(t.levelReveal.started+275),.5);t.draw();
 t.player.inv=0;t.hurt(999,e);t.step(2);
 assert.equal(t.player.hp,hp);assert.equal(t.state.time,clock);assert.equal(e.hp,enemyHP);assert.deepEqual([e.x,e.y],position);
 t.choose(0);assert.equal(t.levelReveal,null);assert.equal(t.state.state,'playing');assert.equal(t.run.history.length,1);assert(t.player.inv>=.35);
 assert.equal(t.run.stagePicks,1);t.menu();assert.equal(t.levelReveal,null);
}
// Cancelling during anticipation cannot leave a timer, border or future reward active.
reset();t.run.earned=999;while(t.state.time<8&&t.state.state==='playing')t.step(.01);assert(t.levelReveal);t.menu();t.step(1);assert.equal(t.state.state,'menu');assert.equal(t.levelReveal,null);
console.log('PASS all-ten natural XP glow, 550ms reveal progress, frozen combat/clock, single choice, safe resume and menu cancellation');
