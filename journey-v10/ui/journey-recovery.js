// Save safe boundaries, never a partial combat simulation. An interrupted attempt
// restarts with its entry equipment/health/gold, so its drops cannot be farmed.
const JOURNEY_SAVE_KEY='burntwood-wilds-journey-v1';
const JOURNEY_FIELDS=['visited','level','stage','stagePicks','special','dodge','stats','statLegendary','earned','history','firstArena','perk','shopBought','shopRerolls','shopStock','shopStockStage','shopGeneration','goldEarned','permanent','journeyId','essenceAwards','essenceEarned','started','charms','charmBag','evolutions','startingCharm','purseGranted','firstMission','shopGuide','totalTime','heroicRewarded','heroicSpawned','lastEssenceSaved'];
let savedJourney=null,journeySaveNotice='',journeyRecoveryBlocked=false,restoringJourney=false,journeySaveClock=0,newJourneyReplay=false;
function journeyClone(value){return JSON.parse(JSON.stringify(value));}
function validJourneySave(value){
 if(!value||value.schema!==1||!['hub','area','intro','cleared'].includes(value.mode)||!HERO_IDS.includes(value.hero)||!ARENAS[value.arena])throw Error('Unknown journey checkpoint.');
 let r=value.run;if(!r||Object.keys(r).some(k=>!JOURNEY_FIELDS.includes(k)))throw Error('Unknown saved journey fields.');let num=(n,max)=>Number.isFinite(n)&&n>=0&&n<=max,integer=(n,max)=>Number.isInteger(n)&&num(n,max);
 if(!r||!integer(r.level,100)||r.level<1||!integer(r.stage,5)||!integer(r.stagePicks,6)||!integer(r.special,5)||!integer(r.dodge,5)||!integer(value.tier,5)||!num(value.hp,10000)||!integer(value.gold,10000000)||!num(value.time,100000)||!integer(value.kills,10000000)||!integer(value.seed,4294967295))throw Error('Invalid journey values.');
 if(!Array.isArray(r.visited)||r.visited.length>5||new Set(r.visited).size!==r.visited.length||r.visited.some(k=>!ARENAS[k])||!Array.isArray(r.essenceAwards)||r.essenceAwards.some(k=>!ARENAS[k])||typeof r.journeyId!=='string'||r.journeyId.length>100)throw Error('Invalid journey progress.');
 if(!Array.isArray(r.history)||r.history.length>100||r.history.some(h=>!h||typeof h.name!=='string'||h.name.length>200||/[<>]/.test(h.name)))throw Error('Invalid upgrade history.');
 for(let field of ['stats','statLegendary'])if(!r[field]||Object.entries(r[field]).some(([k,n])=>!STAT_TRACKS[k]||!num(n,field==='stats'?STAT_TRACKS[k].cap:5)))throw Error('Invalid journey stats.');
 if(!r.permanent||Object.entries(r.permanent).some(([k,n])=>!PERMANENT_UPGRADES[k]||!integer(n,5)))throw Error('Invalid journey ranks.');
 for(let field of ['charms','charmBag'])if(!Array.isArray(r[field])||r[field].length>(field==='charms'?3:1000)||r[field].some(c=>!c||!CHARMS[c.key]||!integer(c.rank,3)||c.rank<1))throw Error('Invalid journey charms.');
 if(new Set(r.charms.map(c=>c.key)).size!==r.charms.length)throw Error('Duplicate equipped charm.');
 if(r.evolutions&&Object.entries(r.evolutions).some(([k,v])=>!EVOLUTION_CHOICES[k]?.includes(v)))throw Error('Invalid journey evolution.');
 if(!Array.isArray(r.shopBought)||r.shopBought.some(k=>!HUB_SHOP_ITEMS.some(item=>item.id===k))||r.shopStock&&(!Array.isArray(r.shopStock)||r.shopStock.length>3||r.shopStock.some(s=>!CHARMS[s.key]||typeof s.bought!=='boolean')))throw Error('Invalid journey shop.');
 if(!num(r.earned,100000)||!num(r.goldEarned,10000000)||!num(r.essenceEarned,100000)||!integer(r.shopRerolls,100000))throw Error('Invalid journey counters.');
 if(r.perk!==null&&!PERKS[r.perk]||r.startingCharm&&!CHARMS[r.startingCharm])throw Error('Invalid journey bonus.');
 if(value.mode==='area'&&r.visited.includes(value.arena)||value.mode==='cleared'&&!r.visited.includes(value.arena))throw Error('Invalid area checkpoint.');
 if(value.mode==='cleared'){
  if(!Array.isArray(value.chests)||value.chests.length>2||value.chests.some(c=>!num(c.x,10000)||!num(c.y,10000)||!['boss','heroic'].includes(c.tag)||typeof c.claimed!=='boolean'||c.offers&&(!Array.isArray(c.offers)||c.offers.length!==3||c.offers.some(k=>!CHARMS[k]))))throw Error('Invalid saved treasure.');
  if(!value.exit||!num(value.exit.x,10000)||!num(value.exit.y,10000)||!Array.isArray(value.goldDrops)||value.goldDrops.length>80||value.goldDrops.some(g=>!num(g.x,10000)||!num(g.y,10000)||!integer(g.value,1000)))throw Error('Invalid cleared area.');
 }
 return journeyClone(value);
}
function loadJourneyCheckpoint(){let raw;try{raw=localStorage.getItem(JOURNEY_SAVE_KEY);}catch(e){journeySaveNotice='Journey saving is unavailable here. You can still play while this game stays open.';renderJourneyRecovery();return;}try{if(raw){if(raw.length>500000)throw Error('Checkpoint is too large.');savedJourney=validJourneySave(JSON.parse(raw));}}catch(e){journeyRecoveryBlocked=true;journeySaveNotice='The unfinished journey could not be loaded. Permanent progress is untouched.';}renderJourneyRecovery();}
function saveJourneyCheckpoint(mode){
 if(restoringJourney||rosterTestAccess||run.legacyCombat||hub.finished||!p)return false;
 if(journeyRecoveryBlocked)return false;
 if(!mode){let base=state==='paused'?pauseResume:state==='inventory'?inventoryResume:state;mode=base==='cleared'||['charm','charmEquip'].includes(base)&&run.rewardResume==='cleared'?'cleared':['hub','shop','workshop','dialogue','areaVictory'].includes(base)?'hub':null;}
 if(!mode)return false;
 let data={};for(let key of JOURNEY_FIELDS)if(run[key]!==undefined)data[key]=run[key];
 let value={schema:1,mode,hero:selected,arena:arenaKey,run:data,tier,hp:p.hp,gold:hub.coins,time,kills,seed};
 if(mode==='cleared'){value.chests=(run.rewardChests||[]).map(c=>({...c,opened:false}));value.exit=run.areaExit;value.goldDrops=goldDrops;}
 try{let checked=validJourneySave(journeyClone(value)),raw=JSON.stringify(checked);localStorage.setItem(JOURNEY_SAVE_KEY,raw);savedJourney=checked;journeySaveNotice='';return true;}catch(e){journeySaveNotice='This journey could not be saved on this device. Keep the game open to continue.';return false;}
}
function stepJourneyRecovery(dt){journeySaveClock+=dt;if(journeySaveClock>=2){journeySaveClock=0;saveJourneyCheckpoint();}}
function discardJourneyCheckpoint(){if(!savedJourney&&!journeyRecoveryBlocked){journeySaveNotice='';renderJourneyRecovery();return true;}try{localStorage.removeItem(JOURNEY_SAVE_KEY);savedJourney=null;journeyRecoveryBlocked=false;journeySaveNotice='';renderJourneyRecovery();return true;}catch(e){journeySaveNotice='The saved journey could not be removed. Try again before starting a new one.';renderJourneyRecovery();return false;}}
function renderJourneyRecovery(){let has=!!savedJourney||journeyRecoveryBlocked;$('journeyRecovery').style.display=has||journeySaveNotice?'block':'none';$('resumeJourney').style.display=savedJourney?'block':'none';$('resumeJourney').disabled=!savedJourney;$('journeyRecoveryText').textContent=savedJourney?CHARACTERS[savedJourney.hero].name+' · '+savedJourney.run.visited.length+'/5 areas saved. '+(savedJourney.mode==='area'?'Resume restarts '+ARENAS[savedJourney.arena].short+' from its entrance. This attempt’s loot and upgrades reset.':savedJourney.mode==='intro'?'Resume restarts the introduction.':'Your completed-area rewards and journey are saved.'):(journeySaveNotice||'');$('journeySaveWarning').textContent=journeySaveNotice;}
function requestFreshJourney(replay=false){if(state!=='menu')return false;if(savedJourney||journeyRecoveryBlocked){newJourneyReplay=replay;$('discardJourneyConfirm').style.display='block';return false;}return beginFirstJourney(replay);}
function confirmFreshJourney(){if(state!=='menu'||!discardJourneyCheckpoint())return false;$('discardJourneyConfirm').style.display='none';return beginFirstJourney(newJourneyReplay);}
function resumeSavedJourney(){
 if(state!=='menu'||!savedJourney)return false;let c;try{c=validJourneySave(savedJourney);}catch(e){journeySaveNotice='This journey could not be restored.';renderJourneyRecovery();return false;}
 restoringJourney=true;
 try{
  rosterTestAccess=false;selected=c.hero;reset();Object.assign(run,journeyClone(c.run));run.stat=new Set();tier=c.tier;hub.coins=c.gold;p.hp=c.hp;kills=c.kills;seed=c.seed;hub.finished=false;enterHub(true);
  if(c.mode==='area'||c.mode==='cleared'){
   run.visited=run.visited.filter(k=>k!==c.arena);enterArena(c.arena,true);let route=run.rugby;Object.assign(run,journeyClone(c.run));run.stat=new Set();run.rugby=route;tier=c.tier;hub.coins=c.gold;p.hp=Math.min(c.hp,stats().hp);kills=c.kills;seed=c.seed;
   if(c.mode==='cleared'){time=c.time;state='cleared';run.areaCleared=true;run.areaExit=journeyClone(c.exit);run.rewardChests=journeyClone(c.chests);goldDrops=journeyClone(c.goldDrops);enemies=[];enemyShots=[];boss=null;p.x=c.exit.x;p.y=c.exit.y+100;}
  }else if(c.mode==='intro')startIntroduction(false);
  p.hp=Math.min(c.hp,stats().hp);cam={x:p.x,y:p.y};stopMovement();updateHud();updateGuidance();openPause();$('pauseHeading').textContent='JOURNEY RESTORED';$('recoveryPauseText').textContent=c.mode==='area'?'Your interrupted area starts again from its entrance.':'Your saved journey is ready.';return true;
 }finally{restoringJourney=false;}
}
function updateRecoveryWarning(){renderJourneyRecovery();$('recoveryPauseText').textContent=journeySaveNotice||'Closing the game saves your journey. An unfinished area restarts from its entrance.';}
$('resumeJourney').onclick=resumeSavedJourney;$('confirmFreshJourney').onclick=confirmFreshJourney;$('cancelFreshJourney').onclick=()=>{$('discardJourneyConfirm').style.display='none';};
loadJourneyCheckpoint();
