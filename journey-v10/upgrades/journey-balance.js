// New journeys use the revised balance; interrupted older journeys keep their contract.
const JOURNEY_CHALLENGE=[{hp:1,damage:1},{hp:1.25,damage:1.18},{hp:1.55,damage:1.36},{hp:1.9,damage:1.55},{hp:2.3,damage:1.75}];
function modernJourney(){return run.balanceVersion===1038&&!run.legacyCombat&&!introActive();}
function upgradeLimit(){return modernJourney()?(arenaKey==='queen'?0:run.stage===0?3:4):UPGRADES_PER_ARENA;}
function combatRecovery(amount){let credit=run.recoveryCredit||0;if(!credit||healingFactor()<=0)return 0;let healed=recoverHealth(Math.min(amount,credit/Math.max(.01,healingFactor())));run.recoveryCredit=Math.max(0,credit-healed);return healed;}
function josephRecovery(amount){return modernJourney()?combatRecovery(amount):recoverHealth(amount);}
function shopRerollCost(){return modernJourney()?20+15*(run.shopRerolls||0):2+2*(run.shopRerolls||0);}
function rerollBalance(){return modernJourney()?hub.coins:progress.essence;}

// Route encounter density varies; XP follows the finite encounter budget.
function enemyExperience(e){if(!modernJourney())return e.kind==='heavy'||e.kind==='charger'?2:1;if(arenaKey==='queen'||e.kind==='boss')return 0;if(e.heroic)return 20;if(e.curseAnchor)return 3;return parkRouteActive()?5:chaseRouteActive()?3:e.kind==='heavy'||e.kind==='charger'?2:1;}
