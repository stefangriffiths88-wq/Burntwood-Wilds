// Shared dispatch: the engine never changes arena balance to fix one character.
const CHARACTER_MODULES={
 harvey:{interval:()=>.68/(tier>=4?1.2:1)/(harvey.pickle>0?1.45:1),attack:harveyAttack,draw:drawHarvey,special:harveySpecial,dodge:harveyDodge,update:updateHarvey},
 immy:{interval:()=>.7/(tier>=4?1.2:1),attack:immyAttack,draw:drawImmy,special:immySpecial,dodge:immyDodge,update:updateImmy,motion:immyMotion,avoidHit:immyAvoidHit},
 havannah:{interval:()=>.55/(tier>=2?1.2:1),attack:havAttack,draw:drawHavannah,special:havSpecial,dodge:havDodge,update:updateHavannah,motion:havMotion,avoidHit:havAvoidHit,goal:havGoal},
 tom:{interval:()=>.9/(tier>=4?1.2:1),attack:tomAttack,draw:drawTom,special:tomSpecial,dodge:tomDodge,update:updateTom,motion:tomMotion,avoidHit:tomAvoidHit,enemyDraw:drawTomEnemy},
 joseph:{interval:()=>.29/(tier>=1?1.15:1),attack:josephAttack,draw:drawJoseph,special:josephSpecial,dodge:josephDodge,update:updateJoseph,motion:josephMotion,avoidHit:josephAvoidHit},
 mimi:{interval:()=>tier>=2?.44:.62,attack:mimiAttack,draw:drawMimi,special:mimiSpecial,dodge:mimiDodge,update:updateMimi},
 jackson:{attack:shoot,draw:drawRugbyHero,special:jacksonCharge,dodge:quickDodge,update(){}},
 ava:{attack:shoot,draw:drawRugbyHero,special:avaSpecial,dodge:quickDodge,update(){}},
 stef:{interval:()=>tier>=4?.76:tier>=2?.45:.60,attack:startSweep,draw:drawStef,special:byOrder,dodge:push,update:updateStef},
 jodie:{attack:startClaws,draw:drawJodie,special:kittenChaos,dodge:quickDodge,update:updateCats},
 evie:{attack:queueDucks,draw:drawEvie,special:ducksAssemble,dodge:quickDodge,update:updateDucks},
 zak:{attack:zakGasBlast,draw:drawZak,special:zakExplosion,dodge:zakDodge,update:updateZak}
};
const ARENA_MODULES={
 rugby:{wave:rugbyWave,spawn:spawnRugby,ground:drawRugbyGround},
 chasewater:{wave:chaseWave,spawn:spawnRugby,ground:drawChasewater},
 sankeys:{wave:sankeyWave,spawn:spawnMarket,ground:drawSankeys},
 park:{wave:parkWave,spawn:spawnPark,ground:drawParkGround},
 quarry:{wave:quarryWave,spawn:spawnQuarry,ground:drawQuarry}
};
function spawn(kind,at){ARENA_MODULES[arenaKey].spawn(kind,at);}
function ground(){if(introActive()){drawIntroduction();return;}ARENA_MODULES[arenaKey].ground();}
function rugbyWave(){if(rugbyRouteActive())return rugbyProgressWave();let pt=pressureTime(),roll=rand(),kind=pt>10&&roll<.19?'charger':pt>20&&roll>.83?'heavy':'swarm';spawn(kind);if(pt>20&&rand()<.45){spawn('swarm');spawn('swarm');}nextSpawn=stageSpawnDelay(Math.max(.42,.88-time*.0018));}

function normalAttack(){let f=run.charmFX,old=f?{attacks:f.attacks,echo:f.echo}:null;charmAttackStarted();let ok=CHARACTER_MODULES[selected].attack();if(!ok&&old){f.attacks=old.attacks;f.echo=old.echo;}else if(ok){signatureNormal();}if(ok&&f&&charmRank('echo')&&f.attacks%(charmRank('echo')===3?3:charmRank('echo')===2?4:5)===(charmRank('echo')===3?2:charmRank('echo')===2?3:4))float(p.x,p.y-38,'ECHO NEXT','#e6d596');return ok;}

function normalAttackInterval(){return (CHARACTER_MODULES[selected].interval?.()??CHARACTERS[selected].rate)*normalRate();}

function charge(){let before=p?.chargeCD||0;CHARACTER_MODULES[selected].special();if(p?.chargeCD>before)charmSpecialUsed();}
function dodge(){return activateDefence();}
