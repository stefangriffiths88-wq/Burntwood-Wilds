const{chromium}=require('playwright'),fs=require('node:fs'),assert=require('node:assert/strict');
(async()=>{
 let browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome',args:['--no-sandbox']});
 let evidence={viewports:[],renders:[]};
 for(let [width,height]of [[390,844],[320,568],[844,390]]){
  let page=await browser.newPage({viewport:{width,height},hasTouch:true,isMobile:true}),errors=[];
  page.on('pageerror',e=>errors.push(e.message));await page.goto('http://127.0.0.1:8765/burntwood-journey-v10.html');await page.waitForFunction(()=>window.__test);
  assert.equal(await page.evaluate(()=>localStorage.getItem('burntwood-wilds-progress-v2')),null);
  await page.locator('#start').tap();await page.waitForFunction(()=>gameAudio?.state==='running');
  await page.evaluate(()=>{progress.introComplete=progress.rugbyGuideComplete=true;__test.enterHub();stepMusic();});
  assert.equal(await page.evaluate(()=>audioMood),'town');
  for(let key of ['rugby','chasewater','quarry','park','sankeys']){
   await page.evaluate(key=>{__test.enterCombatArena(key);__test.clear();run.stagePicks=6;nextSpawn=Infinity;p.inv=p.attack=999;stepMusic();},key);
   assert.equal(await page.evaluate(()=>audioMood),'route:'+key);
   await page.evaluate(()=>{__test.spawn('boss',{x:p.x+100,y:p.y});stepMusic();});
   await page.waitForFunction(()=>audioTempo>=ARENA_SCORES[arenaKey].bpm*1.199);
   assert.equal(await page.evaluate(()=>audioMood),'boss:'+key);
   await page.evaluate(()=>{run.legacyCombat=false;__test.damageEnemy(boss,999999,0,0);stepMusic();});
   assert.equal(await page.evaluate(()=>state),'cleared');assert.equal(await page.evaluate(()=>audioMood),'cleared');
   await page.evaluate(()=>{openPause();stepMusic();});assert.equal(await page.evaluate(()=>audioPhrase),null);
   await page.locator('#audiomusic').focus();await page.locator('#audiomusic').press('Home');
   await page.evaluate(()=>{resumeRun();stepMusic();});assert.equal(await page.evaluate(()=>audioTarget),0);
   await page.evaluate(()=>{setAudioVolume('music',28);stepMusic();(arenaKey==='rugby'&&run.curse&&!run.curse.rescued&&(Object.assign(p,CURSE_STORIES.rugby.at),interactRescueActor(nearbyRescueActor())),exitClearedArea());stepMusic();});
   assert.equal(await page.evaluate(()=>audioMood),'cleared');
   await page.evaluate(()=>{hideRecruitHome();state='hub';stepMusic();});assert.equal(await page.evaluate(()=>audioMood),'town');
  }
  assert.deepEqual(errors,[]);evidence.viewports.push({width,height,result:'pass'});
  if(width===390){
   // Render the real synthesis graph, not a mocked API, at normal and boss pace.
   evidence.renders=await page.evaluate(async()=>{
    let original=gameAudio,phrase=audioPhrase,results=[];
    for(let key of Object.keys(ARENA_SCORES))for(let bossFight of [false,true]){
     const offline=new OfflineAudioContext(1,44100*6,44100);
     const a={state:'running',currentTime:0,sampleRate:44100,createGain:()=>offline.createGain(),createOscillator:()=>offline.createOscillator(),createBiquadFilter:()=>offline.createBiquadFilter(),createBufferSource:()=>offline.createBufferSource(),createBuffer:(...args)=>offline.createBuffer(...args)};
     a.music=offline.createGain();a.music.gain.value=.28;a.music.connect(offline.destination);gameAudio=a;audioPhrase=null;newMusicPhrase();
     let theme=ARENA_SCORES[key],eighth=30/(theme.bpm*(bossFight?1.2:1));
     for(let step=0;step*eighth<6;step++)scoreCombatStep(theme,step,step*eighth,eighth,bossFight);
     let buffer=await offline.startRendering(),data=buffer.getChannelData(0),peak=0,sum=0,hash=0;
     for(let i=0;i<data.length;i++){let v=data[i];if(!Number.isFinite(v))throw Error('Nonfinite sample');peak=Math.max(peak,Math.abs(v));sum+=v*v;if(i%103===0)hash=(Math.imul(hash,31)+Math.round(v*1000000))|0;}
     results.push({key,bossFight,peak,rms:Math.sqrt(sum/data.length),fingerprint:hash});
    }
    gameAudio=original;audioPhrase=phrase;return results;
   });
   for(let r of evidence.renders){assert(r.peak>.01&&r.peak<.98,JSON.stringify(r));assert(r.rms>.005,JSON.stringify(r));}
   assert.equal(new Set(evidence.renders.map(r=>r.fingerprint)).size,10);
  }
  await page.close();
 }
 fs.mkdirSync('tests',{recursive:true});fs.writeFileSync('tests/arena-music-browser.json',JSON.stringify(evidence,null,2)+'\n');
 await browser.close();console.log('PASS actual Web Audio: five areas, faster real bosses, real defeat/cleared/pause/return and sliders at three phone sizes; ten distinct unclipped offline renders');
})().catch(e=>{console.error(e);process.exit(1)});
