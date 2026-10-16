const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs');
(async()=>{
 fs.mkdirSync('journey-v10/browser',{recursive:true});
 let browser=await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
 let page=await browser.newPage({viewport:{width:390,height:844},isMobile:true,hasTouch:true}),errors=[];
 await page.emulateMedia({reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8765/burntwood-journey-v10.html');await page.waitForFunction(()=>window.__test);
 for(let height of [844,650]){
  await page.setViewportSize({width:390,height});
  await page.evaluate(()=>{let t=__test;t.menu();t.select('evie');t.startJourney();t.enterArena('rugby');t.clear();t.run.stagePicks=2;t.setRolls([.30,0]);t.setXP(999);});
  assert.match(await page.locator('#panelTitle').innerText(),/BREAKTHROUGH/);
  assert.equal(await page.locator('.rewardHint').count(),2);
  for(let card of await page.locator('.buildCard').all()){let box=await card.boundingBox();assert(box.y>=0&&box.y+box.height<=height,'reward card fits phone');}
  assert((await page.locator('#upgradeChoices').innerText()).includes('RARE'));
  await page.screenshot({animations:'disabled',path:`journey-v10/browser/reward-milestone-${height}.png`});
  await page.locator('.buildCard').filter({hasText:'Power'}).tap();
  assert.equal(await page.evaluate(()=>__test.state.state),'playing');
  await page.waitForFunction(()=>Number(getComputedStyle(document.getElementById('rewardToast')).opacity)>.8);
  assert.equal(await page.locator('#rewardToast').evaluate(el=>getComputedStyle(el).pointerEvents),'none');
  assert.match(await page.locator('#rewardToastDetail').innerText(),/Power/);
  let freeze=await page.addStyleTag({content:'#rewardToast.rewardShow{animation:none;opacity:1;visibility:visible}'});
  await page.screenshot({path:`journey-v10/browser/reward-chosen-${height}.png`});await freeze.evaluate(el=>el.remove());
  await page.evaluate(()=>__test.menu());assert.equal(await page.locator('#rewardToast').isVisible(),false);
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 await page.evaluate(()=>{let t=__test;t.menu();t.select('jackson');t.startJourney();t.enterArena('park');t.clear();t.run.special=4;t.run.dodge=5;t.setTier(5);t.run.evolutions={weapon:'fire',dodge:'aegis'};t.setXP(999);});
 assert((await page.locator('#upgradeChoices').innerText()).includes('FINAL UPGRADE'));
 await page.screenshot({animations:'disabled',path:'journey-v10/browser/reward-final-ability.png'});
 await page.locator('.buildCard').filter({hasText:'Break the Line'}).tap();
 assert.equal(await page.evaluate(()=>__test.run.special),5);assert.match(await page.locator('#rewardToast').innerText(),/ABILITY MASTERED/);
 await page.evaluate(()=>{let t=__test;t.menu();t.select('mimi');t.startJourney();t.enterArena('rugby');t.clear();t.run.charmPending=true;t.openCharmReward();});
 assert.equal(await page.locator('.charmCard').count(),3);assert(await page.evaluate(()=>__test.run.charmOffers.some(key=>__test.CHARMS[key].rarity>=2)),'Heroic reward guarantees Rare or better');
 for(let card of await page.locator('.charmCard').all()){let box=await card.boundingBox();assert(box.y>=0&&box.y+box.height<=650);}
 await page.screenshot({animations:'disabled',path:'journey-v10/browser/reward-heroic.png'});
 await page.locator('.charmCard').first().tap();assert.equal(await page.evaluate(()=>__test.run.charms.length),1);
 await page.evaluate(()=>{let t=__test;t.menu();t.startJourney();t.hub.coins=55;t.openHubShop(true);t.ensureShopStock(true);renderHubShop();});
 assert(await page.locator('#shopCharmStock [data-stock]:not(:disabled)').count()>0);
 await page.screenshot({animations:'disabled',path:'journey-v10/browser/reward-affordable-shop.png'});
 assert.deepEqual(errors,[]);await browser.close();
 console.log('PASS phone reward choices/toast/mastery, Rare+ heroic, affordable shop, reduced motion and no runtime errors');
})();
