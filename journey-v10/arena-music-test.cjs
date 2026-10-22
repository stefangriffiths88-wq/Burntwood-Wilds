const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
// A timed Web Audio double checks scheduling and lifecycle, not sound quality.
let nodes=[],events={},buffers=0;
class Param{setValueAtTime(v){this.value=v;}linearRampToValueAtTime(v){this.value=v;}exponentialRampToValueAtTime(v){this.value=v;}setTargetAtTime(v){this.value=v;}cancelScheduledValues(){}}
class Node{constructor(){this.gain=new Param();this.frequency=new Param();this.Q=new Param();this.connected=true;nodes.push(this);}connect(){}disconnect(){this.connected=false;}start(at){assert(Number.isFinite(at));this.started=at;}stop(at){assert(Number.isFinite(at));this.stopAt=at;}}
class Audio{constructor(){this.state='running';this.currentTime=0;this.sampleRate=8000;this.destination={};}createGain(){return new Node();}createOscillator(){return new Node();}createBiquadFilter(){return new Node();}createBufferSource(){return new Node();}createBuffer(_,n){buffers++;return{getChannelData:()=>new Float32Array(n)};}resume(){this.state='running';return Promise.resolve();}suspend(){this.state='suspended';}}
const context={console,window:{AudioContext:Audio},document:{hidden:false,addEventListener:(k,fn)=>events[k]=fn},addEventListener(){},localStorage:{getItem(){return null;},setItem(){}},clamp:(v,a,b)=>Math.max(a,Math.min(b,v)),$:()=>({value:0}),state:'hub',run:{areaCleared:false},arenaKey:'rugby',boss:null,quiet:false,curseQuiet:()=>context.quiet,Math:Object.create(Math)};
context.Math.random=()=>{throw Error('Music consumed global randomness');};
vm.createContext(context);let ev=s=>vm.runInContext(s,context);vm.runInContext(fs.readFileSync('journey-v10/ui/audio.js','utf8'),context);ev('initGameAudio()');
function advance(sec){for(let i=0;i<Math.ceil(sec*60);i++){ev('gameAudio.currentTime+=1/60;stepMusic()');let now=ev('gameAudio.currentTime');for(let n of nodes)if(n.stopAt<=now&&!n.ended){n.ended=true;n.onended?.();}}}
ev('stepMusic()');assert.equal(ev('audioMood'),'town');
let identities=[];
for(let key of ['rugby','chasewater','quarry','park','sankeys']){
 ev(`arenaKey='${key}';state='playing';boss=null;run.areaCleared=false`);advance(2);
 assert.equal(ev('audioMood'),'route:'+key);let base=ev('ARENA_SCORES[arenaKey].bpm');assert.equal(ev('audioTempo'),base);
 identities.push(ev('JSON.stringify(ARENA_SCORES[arenaKey])'));
 ev('boss={hp:100}');advance(3);assert.equal(ev('audioMood'),'boss:'+key);assert(Math.abs(ev('audioTempo')-base*1.2)<.00001);
 // Boss remains stronger than scripted quiet beats.
 context.quiet=true;assert.equal(ev('musicSituation()'),'boss');context.quiet=false;
 ev('boss=null;run.areaCleared=true;state="cleared"');advance(.3);assert.equal(ev('audioMood'),'cleared');let clearAt=ev('audioClearAt');
 ev('state="charm"');advance(.3);assert.equal(ev('audioMood'),'cleared','boss treasure stays calm');
 ev('state="paused"');advance(.5);assert.equal(ev('audioPhrase'),null);assert.equal(ev('audioTarget'),0);
 ev('state="cleared"');advance(2);assert.equal(ev('audioClearAt'),clearAt,'no replayed victory cue after pause');
 ev('run.areaCleared=false;state="areaVictory"');advance(.2);assert.equal(ev('audioMood'),'cleared');
 ev('state="hub"');advance(.5);assert.equal(ev('audioMood'),'town');
}
assert.equal(new Set(identities).size,5);assert.equal(buffers,1,'percussion buffer is cached');
ev('state="playing";run.areaCleared=false;boss=null');context.quiet=true;advance(.3);assert.equal(ev('audioMood'),'suspense');context.quiet=false;
ev('setAudioVolume("music",0)');advance(.5);assert.equal(ev('audioPhrase'),null);assert.equal(ev('audioTarget'),0);
ev('setAudioVolume("music",28)');advance(90);assert(ev('audioPhrase.voices.size')<40,'voice count stays bounded over long combat');
context.document.hidden=true;events.visibilitychange();assert.equal(ev('gameAudio.state'),'suspended');assert.equal(ev('audioPhrase'),null);
context.document.hidden=false;ev('initGameAudio();state="paused"');advance(.5);assert.equal(nodes.filter(n=>n.connected&&n.started!==undefined&&!n.ended).length,0,'all sources stop after interruption');
ev('gameAudio=null;window.AudioContext=null;window.webkitAudioContext=null');assert.equal(ev('initGameAudio()'),null);ev('stepMusic()');
console.log('PASS five arena identities; boss +20% tempo; boss/quiet priority; clear/chest/return; single victory cue; pause/mute/background; bounded/disconnected voices; cached deterministic percussion; unsupported audio');
