const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const output=process.env.BW_ART_OUTPUT||'/workspace/scratch/df96eb431fdd';
const base=process.env.BW_ART_URL||'http://127.0.0.1:8877/Burntwood-loading-fix/';

(async()=>{
  const browser=await chromium.launch({executablePath:process.env.CHROME_BIN,args:['--no-sandbox']});
  const results=[];
  for(const variant of ['burntwood.html','separate-files/burntwood.html']){
    for(const [width,height] of [[390,844],[320,568],[844,390]]){
      const page=await browser.newPage({viewport:{width,height},isMobile:true,hasTouch:true});
      const errors=[],bad=[];
      page.on('pageerror',e=>errors.push(e.message));
      page.on('response',r=>{if(r.status()>=400)bad.push(r.url());});
      await page.goto(base+variant);
      await page.waitForFunction(()=>window.__test&&document.getElementById('portrait').naturalWidth>0);
      await page.locator('#start').tap();
      await page.waitForFunction(()=>__test.state.state!=='menu');
      const startState=await page.evaluate(()=>__test.state.state);
      const heroes=await page.evaluate(()=>Object.keys(PORTRAITS));
      for(const hero of heroes){
        await page.evaluate(hero=>{__test.menu();__test.select(hero);},hero);
        await page.waitForFunction(()=>{const p=document.getElementById('portrait');return p.complete&&p.naturalWidth>0;});
        const broken=await page.evaluate(()=>[...document.images].filter(i=>i.getAttribute('src')&&i.complete&&!i.naturalWidth).map(i=>i.id||i.src.slice(0,80)));
        assert.deepEqual(broken,[]);
      }
      if(variant==='burntwood.html'&&width===390){
        for(const hero of ['mimi','harvey','zak']){
          await page.evaluate(hero=>__test.select(hero),hero);
          await page.waitForFunction(()=>document.getElementById('portrait').complete);
          await page.screenshot({path:path.join(output,'loading-'+hero+'.png')});
        }
      }
      await page.reload();
      await page.waitForFunction(()=>window.__test&&document.getElementById('portrait').naturalWidth>0);
      assert.deepEqual(errors,[]);
      assert.deepEqual(bad,[]);
      results.push({variant,width,height,portraits:heroes.length,startState,reload:true,errors,bad});
      await page.close();
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(output,'loading-browser-results.json'),JSON.stringify(results,null,2)+'\n');
  console.log(JSON.stringify(results));
})().catch(e=>{console.error(e);process.exit(1);});
