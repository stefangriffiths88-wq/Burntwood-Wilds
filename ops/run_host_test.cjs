const hostScript=require('node:fs').readFileSync('dist-run/assets/index-bU3QvW8L.js','utf8');require('node:assert/strict')(hostScript.includes('vote_clicked:"jam_vote_clicked"'));
const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const html=fs.readFileSync('dist-run/assets/burntwood.html','utf8');
const scripts=[...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(x=>x[1]).join('\n');
new vm.Script(scripts);
const read=fs.readFileSync;fs.readFileSync=function(p,...a){if(p==='journey-v10/game.js')return scripts;return read.call(this,p,...a)};
require('../journey-v10/town-arrow-boss-test.cjs');
const fixture=read('journey-v10/monster-town-test.cjs','utf8');let captured=[];let scope={require,console};vm.createContext(scope);vm.runInContext(fixture.slice(0,fixture.indexOf('const {t,c}=load();'))+'globalThis.fixture=load;',scope);let{t,c}=scope.fixture();c.parent={postMessage:v=>captured.push(v)};const ev=s=>vm.runInContext(s,c);
t.menu();t.select('jackson');t.startJourney();assert.equal(captured.filter(v=>v.bwEvent==='run_started').length,1);assert.equal(captured.filter(v=>v.bwEvent==='hero_chosen').length,1);
for(let area of ['rugby','chasewater','sankeys','quarry','park']){t.enterCombatArena(area);t.clear();t.spawn('boss',{x:500,y:500});t.damageEnemy(t.boss,999999,0,0);while(t.state.state==='charm')t.chooseCharm(0);}
assert.equal(captured.filter(v=>v.bwEvent==='boss_fight_started').length,5);assert.equal(captured.filter(v=>v.bwEvent==='boss_defeated').length,5);assert.equal(captured.filter(v=>v.bwEvent==='first_enemy_defeated').length,1);
ev("state='playing';finish(false)");assert(captured.some(v=>v.bwEvent==='run_ended'));
console.log('PASS packaged current game and preserved vote analytics, all5 arrow routes, stateless bosses and preserved RUN start/first-kill/boss/end tracking');
