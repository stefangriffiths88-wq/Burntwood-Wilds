// Pausing preserves every run object and timer; only a confirmed abandonment resets.
let pauseResume=null;
function openPause(){if(!['playing','hub','won','lost'].includes(state))return false;pauseResume=state;state='paused';stopMovement();$('pauseMenu').style.display='flex';$('abandonConfirm').style.display='none';$('pauseHeading').textContent=hub.finished?'JOURNEY COMPLETE':'RUN PAUSED';return true;}
function resumeRun(){if(state!=='paused')return false;state=pauseResume;pauseResume=null;$('pauseMenu').style.display='none';return true;}
function abandonRun(){if(state!=='paused')return false;hub.finished=true;pauseResume=null;$('pauseMenu').style.display='none';returnToMenu();return true;}
function stopMovement(){stick.x=stick.y=0;if(p)p.vx=p.vy=0;Object.keys(keys).forEach(k=>delete keys[k]);if(typeof pid!=='undefined')pid=null;$('joystick').style.opacity='0';$('nub').style.transform='';}
function updateHealthOrb(){let max=stats().hp,hp=clamp(p.hp,0,max),pct=max?hp/max*100:0;$('healthOrb').style.setProperty('--health',pct+'%');$('healthOrb').setAttribute?.('aria-label',Math.round(hp)+' of '+Math.round(max)+' health');$('orbValue').textContent=Math.round(hp);$('orbMax').textContent='/ '+Math.round(max);$('xpRailFill').style.height=(run.stagePicks>=UPGRADES_PER_ARENA?100:clamp(run.earned/nextXP()*100,0,100))+'%';}
