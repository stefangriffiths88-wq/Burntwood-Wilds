// Shared build stats, rarity and growth. Values are additive before documented caps.
const JOURNEY_AREAS=5,UPGRADES_PER_ARENA=6,HEROIC_TIME=45;
const RARITIES=[{name:'Common',color:'#b9c2bc',symbol:'Ⅰ'},{name:'Uncommon',color:'#8ed49e',symbol:'Ⅱ'},{name:'Rare',color:'#83baff',symbol:'Ⅲ'},{name:'Epic',color:'#cb9aef',symbol:'Ⅳ'},{name:'Legendary',color:'#f4ce70',symbol:'★'}];
const RARITY_ODDS=[[50,30,15,5,0],[35,32,23,9,1],[20,30,30,16,4],[10,23,34,25,8],[5,15,30,35,15]];
const STAT_TRACKS={
 health:{name:'Vitality',icon:'♥',unit:' health',gains:[8,12,18,25,35],cap:150},
 armour:{name:'Protection',icon:'⬡',unit:' armour',gains:[2,3,5,7,10],cap:40},
 regen:{name:'Recovery',icon:'✚',unit:' HP/s',gains:[.2,.35,.5,.75,1],cap:5},
 power:{name:'Power',icon:'✦',unit:'%',gains:[10,15,22,30,40],cap:150},
 tempo:{name:'Tempo',icon:'»',unit:'%',gains:[8,12,18,25,35],cap:100},
 precision:{name:'Precision',icon:'◎',unit:'%',gains:[8,12,16,22,30],cap:60},
 ferocity:{name:'Ferocity',icon:'ϟ',unit:'%',gains:[25,35,50,70,90],cap:150},
 agility:{name:'Agility',icon:'➤',unit:'%',gains:[5,7,10,13,16],cap:50},
 reflexes:{name:'Reflexes',icon:'↪',unit:'%',gains:[5,7,10,13,16],cap:40},
 focus:{name:'Focus',icon:'◷',unit:'%',gains:[5,7,10,13,16],cap:40},
 scavenging:{name:'Scavenging',icon:'◇',unit:'%',gains:[15,25,40,60,80],cap:100},
 restoration:{name:'Restoration',icon:'✿',unit:'%',gains:[10,15,22,30,40],cap:100}
};
const HERO_GROWTH={havannah:{health:.7,power:.55,tempo:.2},tom:{health:1.5,power:.6,armour:.1},joseph:{health:.65,power:.55,tempo:.3},jackson:{health:1.2,power:.6,armour:.08},ava:{health:.7,power:.6,tempo:.25},stef:{health:1.5,power:.5,armour:.12},jodie:{health:1,power:.6,restoration:.3},evie:{health:.8,power:.6,tempo:.25},zak:{health:1.3,power:.6,regen:.005},mimi:{health:.8,power:.6,precision:.08}};
function statValue(key){return run.stats?.[key]||0;}
function growthValue(key){return Math.max(0,(run.level||1)-1)*(HERO_GROWTH[selected]?.[key]||0);}
function rollRarity(min=0){let n=rewardRandom()*100,sum=0;for(let i=0;i<5;i++){sum+=RARITY_ODDS[Math.min(4,['hub','shop'].includes(state)?run.visited?.length||0:run.stage||0)][i];if(n<sum)return Math.max(min,i);}return 4;}
function statAvailable(key){return (run.statLegendary?.[key]||0)<5&&statValue(key)<STAT_TRACKS[key].cap;}
function statGain(key,rarity){return Math.min(STAT_TRACKS[key].gains[rarity],STAT_TRACKS[key].cap-statValue(key));}
function addStat(key,rarity,limit=Infinity){if(!statAvailable(key))return false;let gain=Math.min(statGain(key,rarity),limit);if(gain<=0)return false;run.stats[key]=statValue(key)+gain;if(rarity===4)run.statLegendary[key]=(run.statLegendary[key]||0)+1;run.stat.add(key);return true;}
function charmFlat(key){return charmPower(key);}
function buildStats(){let inMenu=state==='menu',level=inMenu?0:Math.max(0,(run.level||1)-1),v=k=>inMenu?0:statValue(k)+growthValue(k),c=k=>inMenu?0:charmPower(k),b=CHARACTERS[selected];return {
 health:(b.hp+activePermanentBonus('health')+v('health')+(run.shopBought?.includes('shield')&&!inMenu?20:0)+10*c('sturdy'))*(c('glass')?.8:1),
 power:v('power')+30*c('glass')+25*c('blunt')+(run.charmFX?.still>=1?25*c('still'):0)+(run.charmFX?.lanternUsed?25:0),
 armour:Math.min(60,v('armour')+3*c('iron')),
 regen:v('regen'),
 tempo:Math.max(-50,Math.min(150,v('tempo')+8*c('quick')-15*c('clockwork'))),
 critChance:c('blunt')?0:Math.min(75,v('precision')+8*c('keen')),
 critDamage:150+Math.min(250,v('ferocity')+25*c('heavy')),
 speed:Math.min(65,v('agility')+6*c('running')),
 dodge:Math.min(50,v('reflexes')),
 special:Math.min(70,v('focus')+15*c('watch')+30*c('clockwork')),
 pickup:Math.min(150,v('scavenging')+25*c('scavenger')),
 healing:v('restoration')+20*c('mender')+activePermanentBonus('healing'),level
};}
function attackSpeedFactor(){return 1+buildStats().tempo/100;}
function healingFactor(blood=false){return run.charmFX?.lanternUsed?0:(1+buildStats().healing/100)*(!blood&&charmRank('blood')?.7:1);}
function criticalMultiplier(e,source,forced=false){if(charmRank('blunt'))return 1;if(!['weapon','cat'].includes(source)){if(forced&&source==='special'){if(run.charmFX)run.charmFX.dryHits=0;float(e.x,e.y-e.r-12,'CRIT','#f4ce70');return 1.5;}return 1;}let f=run.charmFX;if(!f)return 1;let s=buildStats(),eligible=time>=(f.critAt||0),crit=forced||rand()*100<s.critChance;if(eligible){f.critAt=time+.12;if(charmRank('patient')&&f.dryHits>=6-charmRank('patient'))crit=true;if(!crit)f.dryHits=(f.dryHits||0)+1;}if(crit)f.dryHits=0;if(crit){float(e.x,e.y-e.r-12,'CRIT','#f4ce70');return s.critDamage/100;}return 1;}
function stepBuildStats(dt){let s=buildStats();if(s.regen>0&&!run.charmFX?.lanternUsed&&p.hp<stats().hp)p.hp=Math.min(stats().hp,p.hp+s.regen*healingFactor()*dt);}
