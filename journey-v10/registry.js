// Shared dispatch: the engine never changes arena balance to fix one character.
const CHARACTER_MODULES={
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
 quarry:{wave:quarryWave,spawn:spawnQuarry,ground:drawQuarry}
};
function spawn(kind,at){ARENA_MODULES[arenaKey].spawn(kind,at);}
function ground(){ARENA_MODULES[arenaKey].ground();}
function rugbyWave(){let pt=pressureTime(),roll=rand(),kind=pt>10&&roll<.19?'charger':pt>20&&roll>.83?'heavy':'swarm';spawn(kind);if(pt>20&&rand()<.45){spawn('swarm');spawn('swarm');}nextSpawn=stageSpawnDelay(Math.max(.42,.88-time*.0018));}

function normalAttackInterval(){return (CHARACTER_MODULES[selected].interval?.()??CHARACTERS[selected].rate)*normalRate();}

function charge(){CHARACTER_MODULES[selected].special();}
function dodge(){if(state==='hub')return;CHARACTER_MODULES[selected].dodge();}
