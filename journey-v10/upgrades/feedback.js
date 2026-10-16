// Reward presentation only: no damage, enemy, input or save state lives here.
function rewardCardLabel(offer){
 if(offer.total)return offer.path.toUpperCase()+' · STEP '+offer.rank+' OF '+offer.total+(offer.rank===offer.total?' · FINAL UPGRADE':'');
 let rarity=RARITIES[offer.rarity];return rarity.symbol+' '+rarity.name.toUpperCase()+' · '+offer.path.toUpperCase();
}
function rewardCardHint(offer){
 if(!offer.total)return '';
 return '<em class="rewardHint">'+(offer.rank===offer.total?'COMPLETE THIS ABILITY':offer.total-offer.rank+' further steps to master')+'</em>';
}
function clearRewardNotice(){let el=$('rewardToast');el.classList.remove('rewardShow');el.style.display='none';}
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
