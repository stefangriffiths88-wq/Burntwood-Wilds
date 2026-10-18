// Reward presentation. The existing upgrade state owns the safe combat pause.
const LEVEL_REVEAL_MS=550;
let levelReveal=null;
function endLevelReward(){levelReveal=null;$('panel').classList.remove('levelReward','instantReveal');}
function beginLevelReward(instant=false){
 instant=instant||(typeof window.matchMedia==='function'&&window.matchMedia('(prefers-reduced-motion: reduce)').matches);
 let panel=$('panel');levelReveal=instant?null:{started:performance.now()};
 shake=hitFlash=0;void panel.offsetWidth;panel.classList.add('levelReward');if(instant)panel.classList.add('instantReveal');
}
function levelRewardProgress(now=performance.now()){return levelReveal?clamp((now-levelReveal.started)/LEVEL_REVEAL_MS,0,1):1;}
function drawRewardHero(){
 if(state!=='upgrade'||!levelReveal){CHARACTER_MODULES[selected].draw();return;}
 let u=levelRewardProgress(),fade=1-u*.7,x=p.x,y=p.y-9,r=35+u*20;
 ctx.save();let halo=ctx.createRadialGradient(x,y,5,x,y,r+14);halo.addColorStop(0,'#fff6bd77');halo.addColorStop(.55,'#f6c55b44');halo.addColorStop(1,'#edbd4b00');
 ctx.fillStyle=halo;ctx.beginPath();ctx.arc(x,y,r+14,0,TAU);ctx.fill();
 ctx.globalAlpha=fade;ctx.strokeStyle='#ffe4a1';ctx.lineWidth=2.3;ctx.beginPath();ctx.ellipse(x,y+9,r,r*.55,0,0,TAU);ctx.stroke();
 for(let i=0;i<10;i++){let a=i*TAU/10+u*.65,d=26+u*24;starArt(x+Math.cos(a)*d,y+Math.sin(a)*d,1.5+(i%3)*.6,a);}
 ctx.restore();ctx.save();ctx.shadowColor='#ffe6a0';ctx.shadowBlur=14*fade;CHARACTER_MODULES[selected].draw();ctx.restore();
}
function rewardCardLabel(offer){if(offer.path==='evolution')return 'MYTHIC · '+offer.ability.toUpperCase()+' LEVEL 6';
 if(offer.total)return ({weapon:'NORMAL ATTACK',special:'SPECIAL',dodge:'DEFENCE'}[offer.path]||offer.path.toUpperCase())+' · STEP '+offer.rank+' OF '+offer.total+(offer.rank===offer.total?' · FINAL UPGRADE':'');
 let rarity=RARITIES[offer.rarity];return rarity.symbol+' '+rarity.name.toUpperCase()+' · '+offer.path.toUpperCase();
}
function rewardCardHint(offer){
 if(!offer.total)return '';
 return '<em class="rewardHint">'+(offer.rank===offer.total?'COMPLETE THIS ABILITY':offer.total-offer.rank+' further steps to master')+'</em>';
}
function clearRewardNotice(){endLevelReward();endCharmChest();let el=$('rewardToast');el.classList.remove('rewardShow');el.style.display='none';}
function rewardNotice(title,detail,color){
 let el=$('rewardToast');el.style.setProperty('--reward-color',color);el.firstChild.textContent=title;
 // Separate text nodes keep all reward wording literal and accessible.
 $('rewardToastDetail').textContent=detail;el.style.display='block';el.classList.remove('rewardShow');void el.offsetWidth;el.classList.add('rewardShow');
 rewardChime(color===RARITIES[4].color);
}
function celebrateReward(offer){
 let title=offer.total?(offer.rank===offer.total?'ABILITY MASTERED':'ABILITY UPGRADED'):RARITIES[offer.rarity].name.toUpperCase()+' POWER';
 rewardNotice(title,offer.name+' · '+(offer.path==='stat'?offer.text:offer.total?'Step '+offer.rank+' of '+offer.total:offer.text),RARITIES[offer.rarity].color);
}
function charmRewardHint(key){
 let copies=[...run.charms,...run.charmBag].filter(c=>c.key===key&&c.rank===1).length;
 if(!run.legacyCombat)return copies||charmRank(key)?'MATCHING COPY · KEEP IN BAG':'EQUIP, SWAP OR KEEP IN BAG';
 if(copies)return 'MATCHING COPY · FUSE IN TOWN';
 if(charmRank(key))return 'BAG COPY · KEEP FOR FUSION';
 if(run.charms.length>=3)return 'BAG · EQUIP OR SWAP IN TOWN';
 if((key==='opportunist'&&charmRank('frost'))||(key==='frost'&&charmRank('opportunist'))||(key==='heavy'&&charmRank('keen'))||(key==='keen'&&charmRank('heavy')))return 'BUILD COMBO · EQUIPS NOW';
 return 'EQUIPS NOW';
}
function rewardChime(legendary=false){
 try{
  let Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;
  let audio=rewardChime.audio||(rewardChime.audio=new Audio());
  const play=()=>{if(audio.state!=='running')return;let at=audio.currentTime;for(let [i,note] of (legendary?[523,659,784,1047]:[440,554,659]).entries()){
   let tone=audio.createOscillator(),gain=audio.createGain(),start=at+i*.065;tone.type='sine';tone.frequency.value=note;
   gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(.025,start+.012);gain.gain.exponentialRampToValueAtTime(.001,start+.20);
   tone.connect(gain);gain.connect(audio.destination);tone.start(start);tone.stop(start+.21);
  }};
  if(audio.state==='suspended')audio.resume().then(play).catch(()=>{});else play();
 }catch{}
}
