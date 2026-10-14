// upgrades/progression.js — source of truth.
function statText(i){return [selected==='stef'?'+20 maximum health; heal those 20 points.':'+15 maximum health; heal those 15 points.','+5% movement speed.',isJodie()?'+15% Jodie claw damage.':'10% faster normal attacks.','+25% XP pickup reach.',isJodie()?'+10% permanent cat damage.':'+10% weapon damage.'][i];}

function effectiveStats(){let b=CHARACTERS[selected];if(state==='menu')return b;return {...b,hp:b.hp+(hasStat(0)?selected==='stef'?20:15:0),speed:b.speed*(hasStat(1)?1.05:1)*(shrineBuff?.kind==='speed'&&shrineBuff.left>0?1.15:1),rate:b.rate*normalRate(),dodgeSpeed:b.dodgeSpeed*(D(1)?selected==='jackson'?1.3:1.15:1)};}

function normalRate(){return !isJodie()&&hasStat(2)?.9:1;}

function damageScale(source){if(source==='cat')return hasStat(4)?1.1:1;if(source!=='weapon')return 1;return isJodie()?hasStat(2)?1.15:1:hasStat(4)?1.1:1;}

function specialCooldown(){let base=CHARACTERS[selected].specialCD;return S(4)?({jackson:7,ava:7,stef:8,jodie:9,evie:8}[selected]):base;}

function dodgeCooldown(){return isStef()?(D(4)?2.3:3):(D(4)?selected==='jackson'?1.05:1.25:1.65);}

function resetProgression(){shrine=null;shrineBuff=null;hearts=[];nextHeartAt=0;run={level:1,stage:0,stagePicks:0,special:0,dodge:0,stat:new Set(),earned:0,offers:[],history:[],firstArena:arenaKey,perk:null,rewardOffers:null};hazards=[];scheduled=[];decoy=null;}

function nextXP(){return 12+run.stagePicks*4;}

function weaponData(){return isEvie()?[evieNames,evieText]:isJodie()?[jodieNames,jodieText]:isStef()?[stefNames,stefText]:isAva()?[avaNames,avaText]:[upgradeNames,upgradeText];}

function buildOffers(){let candidates=[];if(tier<maxTier()){let [names,texts]=weaponData();candidates.push({path:'weapon',index:tier,name:names[tier],text:texts[tier],rank:tier+(isStef()||isEvie()?2:1)});}if(run.special<5){let [name,text]=SPECIALS[selected][run.special];candidates.push({path:'special',index:run.special,name,text,rank:run.special+1});}if(run.dodge<5){let [name,text]=DODGES[selected][run.dodge];candidates.push({path:'dodge',index:run.dodge,name,text,rank:run.dodge+1});}let stat=[0,1,2,3,4].filter(i=>!run.stat.has(i));if(stat.length){let index=stat[Math.floor(rewardRandom()*stat.length)];candidates.push({path:'stat',index,name:STAT_NAMES[selected][index],text:statText(index),rank:0});}
// Rotate the missing path deterministically; no duplicate paths in an offer.
if(candidates.length===4)candidates.splice(run.history.length%4,1);
// Fully finished paths leave the pool. Late-run spare slots are explicit recovery cards.
if(candidates.length<3)candidates.push({path:'recovery',name:'Field Recovery',text:'Restore 25% of maximum health.',rank:0});if(candidates.length<3)candidates.push({path:'refresh',name:'Catch Your Breath',text:'Fully recharge your special and dodge.',rank:0});if(candidates.length<3)candidates.push({path:'resupply',name:'Quick Resupply',text:'Restore 10% health and halve remaining special and dodge cooldowns.',rank:0});return candidates.slice(0,3);}

function showUpgrade(force=false){if(state!=='playing'||run.stagePicks>=8||run.earned<nextXP()||(!force&&time<(run.stagePicks===0?8:LEVEL_TIMES[run.stagePicks]-3)))return;state='upgrade';run.offers=buildOffers();$('panel').style.display='grid';$('panelTitle').textContent='LEVEL '+(run.level+1)+' · PICK ONE';$('panelName').textContent='Choose your upgrade';$('panelText').textContent='Weapon upgrades '+tier+'/'+maxTier()+' · Special '+run.special+'/5 · Dodge '+run.dodge+'/5 · Stats '+run.stat.size+'/5';$('panelButton').style.display='none';$('continue').style.display='none';$('back').style.display='none';$('upgradeChoices').innerHTML=run.offers.map((o,i)=>'<button class="upgradeCard" data-choice="'+i+'"><span>'+(o.path==='stat'?'STAT · ONE-OFF':o.path.toUpperCase()+(o.rank?' · '+o.rank+'/5':''))+'</span><b>'+o.name+'</b><small>'+o.text+'</small></button>').join('');$('upgradeChoices').style.display='grid';for(let i=0;i<run.offers.length;i++)$('upgradeChoices').children[i].onclick=()=>chooseUpgrade(i);}

function chooseUpgrade(i){if(state!=='upgrade'||!run.offers[i])return;let o=run.offers[i],oldHP=stats().hp;run.earned=Math.max(0,run.earned-nextXP());run.stagePicks++;run.level++;if(o.path==='weapon')tier++;else if(o.path==='special')run.special++;else if(o.path==='dodge')run.dodge++;else if(o.path==='stat')run.stat.add(o.index);else if(o.path==='recovery')p.hp=Math.min(stats().hp,p.hp+stats().hp*.25);else if(o.path==='refresh')p.chargeCD=p.dodgeCD=0;if(o.path==='resupply'){p.hp=Math.min(stats().hp,p.hp+stats().hp*.1);p.chargeCD*=.5;p.dodgeCD*=.5;}run.history.push({path:o.path,index:o.index,name:o.name});if(o.path==='stat'&&o.index===0)p.hp+=stats().hp-oldHP;syncCats();scaleLivingEnemies();state='playing';$('panel').style.display='none';$('upgradeChoices').style.display='none';pop(p.x,p.y,'#f7d88a',18);updateHud();showUpgrade();}

function progressStep(){if(run.stagePicks<8&&time>=LEVEL_TIMES[run.stagePicks])run.earned=Math.max(run.earned,nextXP());showUpgrade();}

function enemyScale(kind){return {hp:(1+.06*(run.level-1))*(Math.pow(kind==='boss'?1.5:1.35,run.stage)),damage:(1+.03*(run.level-1))*Math.pow(1.2,run.stage)};}

function applyEnemyScale(e){let f=enemyScale(e.kind),old=e.scaleHP||1;e.hp*=f.hp/old;e.maxHp*=f.hp/old;e.scaleHP=f.hp;e.damageScale=f.damage;}

function scaleLivingEnemies(){for(let e of enemies)if(e.hp>0)applyEnemyScale(e);}

function pressureTime(){return Math.max(time*.45,run.stagePicks*6+(run.stage?12:0));}

function stageSpawnDelay(base){return base/(1+.045*run.stagePicks+(run.stage?.12:0));}
const BOSS_TIME=105,LEVEL_TIMES=[8,19,31,43,56,69,83,98];
let run={level:1,stage:0,stagePicks:0,special:0,dodge:0,stat:new Set(),earned:0,offers:[],history:[],firstArena:'rugby',perk:null,rewardOffers:null},hazards=[],scheduled=[],decoy=null;
const S=n=>run.special>=n,D=n=>run.dodge>=n,hasStat=n=>run.stat.has(n);
