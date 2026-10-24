// Original procedural score. No downloads, subscriptions or third-party recordings.
let gameAudio=null,audioSettings={music:.28,effects:.7},audioStep=0,audioAt=0,audioMood='',audioTarget=null,audioPhrase=null,audioClearAt=0,audioTempo=0;
try{let saved=JSON.parse(localStorage.getItem('burntwood-audio')||'null');if(saved)for(let key of ['music','effects'])if(Number.isFinite(saved[key]))audioSettings[key]=clamp(saved[key],0,1);}catch{}
function initGameAudio(){try{let Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return null;if(!gameAudio){gameAudio=new Audio();gameAudio.music=gameAudio.createGain();gameAudio.effects=gameAudio.createGain();gameAudio.music.connect(gameAudio.destination);gameAudio.effects.connect(gameAudio.destination);applyAudioSettings();}if(!document.hidden)gameAudio.resume?.().catch?.(()=>{});return gameAudio;}catch{return null;}}
function applyAudioSettings(){if(gameAudio){let now=gameAudio.currentTime;gameAudio.music.gain.setTargetAtTime(audioSettings.music,now,.2);gameAudio.effects.gain.setTargetAtTime(audioSettings.effects,now,.02);}for(let key of ['music','effects']){let input=$('audio'+key);if(input)input.value=Math.round(audioSettings[key]*100);}}
function setAudioVolume(key,value){if(!['music','effects'].includes(key))return;audioSettings[key]=clamp(Number(value)/100,0,1);try{localStorage.setItem('burntwood-audio',JSON.stringify(audioSettings));}catch{}applyAudioSettings();}
// Arena-owned musical identities. Notes are semitone offsets; the boss speeds
// the score up without pitching recordings or altering the simulation clock.
const ARENA_SCORES={
 queen:{name:'The Last Thorn',bpm:154,root:43,roots:[0,-2,0,3,-4,0,-2,5],melody:[0,7,3,10,12,7,5,3],voice:'sawtooth',kicks:[0,2,3,4,6],chords:[0,3,6]},
 rugby:{name:'Rugby Rush',bpm:144,root:48,roots:[0,0,-4,-2,0,3,-4,-2],melody:[0,7,12,10,7,3,5,7],voice:'square',kicks:[0,2,4,6],chords:[0,3,6]},
 chasewater:{name:'Waterline Chase',bpm:136,root:50,roots:[0,-2,-5,-2,0,3,-5,-2],melody:[12,7,3,7,10,7,5,3],voice:'triangle',kicks:[0,3,4],chords:[0,4]},
 quarry:{name:'Stonebreaker',bpm:132,root:50,roots:[0,-4,3,-2,0,-4,-7,-5],melody:[0,3,7,12,10,7,5,3],voice:'sawtooth',kicks:[0,3,5],chords:[0,4]},
 park:{name:'Curse Breaker',bpm:152,root:48,roots:[0,0,-4,-2,0,3,-4,-2],melody:[0,0,7,10,12,10,7,3],voice:'triangle',kicks:[0,3,4,5.5],chords:[0,3,6]},
 sankeys:{name:'Midnight Mayhem',bpm:148,root:45,roots:[0,3,-2,5,0,7,3,-2],melody:[7,12,7,3,10,7,5,0],voice:'square',kicks:[0,2,4,6],chords:[0,3,5]}
};
function musicSituation(){
 if(state==='cleared'||state==='won'||run.areaCleared||state==='areaVictory'||state==='recruitReveal')return 'cleared';
 if(!['playing','upgrade','charm','charmEquip','evolution'].includes(state))return 'town';
 if(boss?.hp>0)return 'boss';
 return curseQuiet()?'suspense':'route';
}
function retireMusicPhrase(){
 let bus=audioPhrase;if(!bus)return;audioPhrase=null;bus.retired=true;
 let now=gameAudio.currentTime;bus.gain.cancelScheduledValues(now);bus.gain.setTargetAtTime(0,now,.065);
 // Stop both sounding and already queued voices; no JS timers survive a pause.
 for(let voice of bus.voices)try{voice.stop(now+.32);}catch{}
 if(!bus.voices.size)bus.disconnect();
}
function newMusicPhrase(){let a=gameAudio;retireMusicPhrase();let bus=a.createGain();bus.voices=new Set();bus.retired=false;bus.gain.setValueAtTime(0,a.currentTime);bus.gain.linearRampToValueAtTime(1,a.currentTime+.14);bus.connect(a.music);audioPhrase=bus;}
function connectScoreVoice(source,envelope,filter=null){
 let bus=audioPhrase||gameAudio.music;
 source.connect(filter||envelope);if(filter)filter.connect(envelope);envelope.connect(bus);
 bus.voices?.add(source);source.onended=()=>{source.disconnect();filter?.disconnect();envelope.disconnect();bus.voices?.delete(source);if(bus.retired&&!bus.voices.size)bus.disconnect();};
}
function scoreNote(freq,at,length,volume,type='triangle',cutoff=0){
 let a=gameAudio;if(!a||a.state!=='running')return;
 let o=a.createOscillator(),g=a.createGain(),f=cutoff?a.createBiquadFilter():null;
 o.type=type;o.frequency.value=freq;if(f){f.type='lowpass';f.frequency.value=cutoff;f.Q.value=.6;}
 g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(volume,at+.012);g.gain.exponentialRampToValueAtTime(.0001,at+length);
 connectScoreVoice(o,g,f);o.start(at);o.stop(at+length+.02);
}
function scoreDrum(kind,at,volume){
 let a=gameAudio;if(!a||a.state!=='running')return;
 let g=a.createGain(),o,f=null,length=kind==='hat'?.065:kind==='snare'?.18:.28;
 if(kind==='kick'||kind==='tom'){
  o=a.createOscillator();o.frequency.setValueAtTime(kind==='kick'?145:190,at);o.frequency.exponentialRampToValueAtTime(kind==='kick'?46:85,at+.1);
 }else{
  if(!a.scoreNoise){
   // Private deterministic noise never consumes the combat RNG.
   a.scoreNoise=a.createBuffer(1,a.sampleRate,a.sampleRate);let data=a.scoreNoise.getChannelData(0),seed=640;
   for(let i=0;i<data.length;i++){seed=(Math.imul(seed,1664525)+1013904223)>>>0;data[i]=seed/2147483648-1;}
  }
  o=a.createBufferSource();o.buffer=a.scoreNoise;f=a.createBiquadFilter();f.type='highpass';f.frequency.value=kind==='hat'?7000:1500;
 }
 g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(volume,at+.002);g.gain.exponentialRampToValueAtTime(.0001,at+length);
 connectScoreVoice(o,g,f);o.start(at);o.stop(at+length+.01);
}
function scorePitch(midi){return 440*2**((midi-69)/12);}
function scoreCombatStep(theme,step,at,eighth,bossFight){
 let s=step%8,bar=Math.floor(step/8),root=theme.root+theme.roots[bar%theme.roots.length];
 scoreNote(scorePitch(root-12+([3,7].includes(s)?12:0)),at,eighth*.86,.11,'triangle',1100);
 let melody=root+12+theme.melody[s]+(bar%8>=4&&s===7?5:0);
 scoreNote(scorePitch(melody),at,eighth*(theme===ARENA_SCORES.quarry?1.5:.85),theme.voice==='sawtooth'?.023:theme.voice==='square'?.023:.065,theme.voice,theme.voice==='sawtooth'?2400:3200);
 // Quieter delayed answer gives depth without a permanent feedback/delay graph.
 scoreNote(scorePitch(melody),at+eighth*1.5,eighth*.65,.012,'triangle',2000);
 if(theme.chords.includes(s))for(let n of [0,3,7])scoreNote(scorePitch(root+n),at,eighth*1.3,.023,'triangle',1800);
 if(theme.kicks.includes(s))scoreDrum('kick',at,.2);
 if(s===2||s===6)scoreDrum('snare',at,.12);
 scoreDrum('hat',at,s%2?.025:.04);
 if(theme===ARENA_SCORES.park)scoreNote(scorePitch(root+24+[0,7,12,7][s%4]),at+eighth*.5,eighth*.4,.018,'square',1900);
 if((bar%4===3||bossFight)&&s>=6)scoreDrum('tom',at+eighth*.5,.075);
 if(bossFight)scoreDrum('hat',at+eighth*.5,.02);
}
function stepMusic(){
 let a=gameAudio;if(!a||a.state!=='running')return;
 let active=!document.hidden&&!['paused','menu','lost'].includes(state),target=active?audioSettings.music:0;
 if(target!==audioTarget){audioTarget=target;a.music.gain.cancelScheduledValues(a.currentTime);a.music.gain.setTargetAtTime(target,a.currentTime,.18);}
 if(!active||!target){retireMusicPhrase();audioAt=0;audioMood='';return;}
 let situation=musicSituation(),theme=ARENA_SCORES[arenaKey]||ARENA_SCORES.rugby;
 let mood=situation==='route'||situation==='boss'?situation+':'+arenaKey:situation;
 if(mood!==audioMood){
  // Preserve the cleared cue clock across pause/resume, but restart a phrase.
  if(situation==='cleared'&&!audioClearAt)audioClearAt=a.currentTime+.01;
  if(situation!=='cleared')audioClearAt=0;
  audioMood=mood;audioStep=0;audioAt=a.currentTime+.06;newMusicPhrase();
  if(situation==='cleared'&&a.currentTime-audioClearAt<.1){
   for(let [i,n]of [60,64,67,72].entries())scoreNote(scorePitch(n),audioAt+i*.16,.8,.085,'triangle');
   audioAt+=1.2;
  }
  // Route → boss keeps pitch and identity. Only tempo/layers intensify.
  audioTempo=situation==='boss'?theme.bpm:0;
 }
 if(!audioAt||audioAt<a.currentTime-.2)audioAt=a.currentTime+.04;
 let tempo=situation==='boss'?theme.bpm*1.2:theme.bpm;
 while(audioAt<a.currentTime+.16){
  if(situation==='route'||situation==='boss'){
   audioTempo=audioTempo?Math.min(tempo,audioTempo+theme.bpm*.04):tempo;
   let eighth=30/audioTempo;scoreCombatStep(theme,audioStep,audioAt,eighth,situation==='boss');audioAt+=eighth;
  }else{
   // Existing calm town motif also plays throughout the restored walkout/chest.
   let suspense=situation==='suspense',beat=suspense?.8:.5;
   let melody=suspense?[0,1,7,1]:[0,4,7,4,2,5,9,7,4,7,12,11,9,7,4,2];
   scoreNote(261.6256*2**(melody[audioStep%melody.length]/12),audioAt,beat*.9,.065,'sine');
   if(audioStep%4===0)scoreNote(130.8128*2**((audioStep%16<8?0:5)/12),audioAt,beat*3.5,.045);
   audioAt+=beat;
  }
  audioStep++;
 }
}
addEventListener('pointerdown',initGameAudio,{passive:true});
if(typeof document.addEventListener==='function')document.addEventListener('visibilitychange',()=>{if(document.hidden){if(gameAudio)retireMusicPhrase();gameAudio?.suspend?.();audioAt=0;audioMood='';}});

function hitSound(){let a=gameAudio;if(!a||a.state!=='running')return;try{let o=a.createOscillator(),g=a.createGain(),at=a.currentTime;o.type='triangle';o.frequency.setValueAtTime(150,at);o.frequency.exponentialRampToValueAtTime(55,at+.09);g.gain.setValueAtTime(.06,at);g.gain.exponentialRampToValueAtTime(.001,at+.12);o.connect(g);g.connect(a.effects);o.start(at);o.stop(at+.13);o.onended=()=>{o.disconnect();g.disconnect();};}catch{}}

let iceCrackAt=-1,townCurseSoundAt=0;
function effectTone(freq,end,length,volume,type='triangle'){let a=gameAudio;if(!a||a.state!=='running'||document.hidden)return;try{let o=a.createOscillator(),g=a.createGain(),at=a.currentTime;o.type=type;o.frequency.setValueAtTime(freq,at);o.frequency.exponentialRampToValueAtTime(end,at+length);g.gain.setValueAtTime(volume,at);g.gain.exponentialRampToValueAtTime(.0001,at+length);o.connect(g);g.connect(a.effects);o.start(at);o.stop(at+length+.01);o.onended=()=>{o.disconnect();g.disconnect();};}catch{}}
function iceCrackSound(){if(!gameAudio||gameAudio.currentTime<iceCrackAt)return;iceCrackAt=gameAudio.currentTime+.08;effectTone(2600,420,.09,.045,'sawtooth');effectTone(1500,280,.14,.03,'triangle');}
function stepTownCurseSound(){if(!gameAudio||gameAudio.state!=='running'||hub.time<townCurseSoundAt)return;let key=recommendedStoryArea(),g=hub.portals.find(g=>g.key===key);if(!g||dist(p,g)>260)return;townCurseSoundAt=hub.time+10;let freq={rugby:75,chasewater:480,park:210,quarry:52,sankeys:340}[key];effectTone(freq,freq*.55,.35,.025);}
