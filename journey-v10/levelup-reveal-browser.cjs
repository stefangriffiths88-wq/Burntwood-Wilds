const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 fs.mkdirSync('journey-v10/browser',{recursive:true});let browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
 let page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/burntwood-journey-v10.html');await page.waitForFunction(()=>window.__test);
 const trigger=async()=>page.evaluate(()=>{let t=__test;t.menu();t.select('jackson');t.startJourney();t.enterCombatArena('rugby');t.clear();t.player.attack=999;t.player.inv=999;t.run.earned=999;while(t.state.state==='playing'&&t.state.time<8.1)t.step(.01);return {time:t.state.time,level:t.run.level};});
 for(let height of [844,650]){
  await page.setViewportSize({width:390,height});await page.emulateMedia({reducedMotion:'no-preference'});
  let before=await trigger();assert.equal(await page.evaluate(()=>__test.state.state),'upgrade');
  assert(await page.evaluate(()=>!!__test.levelReveal));assert.equal(await page.locator('#panel .card').evaluate(el=>getComputedStyle(el).visibility),'hidden');
  await page.waitForTimeout(140);await page.screenshot({path:`journey-v10/browser/levelup-glow-${height}.png`});
  await page.locator('#panel .card').waitFor({state:'visible'});
  assert.equal(await page.evaluate(()=>__test.state.time),before.time);assert.equal(await page.evaluate(()=>__test.run.level),before.level);
  await page.screenshot({path:`journey-v10/browser/levelup-gold-building-${height}.png`});
  await page.waitForFunction(()=>parseFloat(getComputedStyle(document.querySelector('.goldRewardFrame rect')).strokeDashoffset)<.01);
  for(let card of await page.locator('.buildCard').all()){let b=await card.boundingBox();assert(b.y>=0&&b.y+b.height<=height);}
  await page.screenshot({path:`journey-v10/browser/levelup-ready-${height}.png`,animations:'disabled'});
  await page.locator('.buildCard').first().tap();assert.equal(await page.evaluate(()=>__test.run.history.length),0);await page.locator('#confirmUpgrade').tap();assert.equal(await page.evaluate(()=>__test.run.history.length),1);
  assert.equal(await page.evaluate(()=>__test.state.state),'playing');assert.equal(await page.evaluate(()=>__test.levelReveal),null);
  assert.equal(await page.locator('#panel').evaluate(el=>el.classList.contains('levelReward')),false);
 }
 await page.emulateMedia({reducedMotion:'reduce'});await trigger();assert.equal(await page.evaluate(()=>__test.levelReveal),null);
 assert.equal(await page.locator('#panel .card').evaluate(el=>getComputedStyle(el).visibility),'visible');
 await page.screenshot({path:'journey-v10/browser/levelup-reduced-motion.png',animations:'disabled'});
 await page.emulateMedia({reducedMotion:'no-preference'});await trigger();await page.evaluate(()=>__test.menu());await page.waitForTimeout(900);
 assert.equal(await page.evaluate(()=>__test.state.state),'menu');assert.equal(await page.locator('#panel').isVisible(),false);
 assert.deepEqual(errors,[]);await browser.close();console.log('PASS actual level-up glow then gold reveal, paused clock, phone fit, single choice, reduced motion and cancellation');
})();
