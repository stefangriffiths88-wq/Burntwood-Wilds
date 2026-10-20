const CHARACTERS={};let selected='jackson',pendingShots=[],glitterTime=0;const isAva=()=>selected==='ava',stats=()=>effectiveStats();
const canvas=document.getElementById('game'),ctx=canvas.getContext('2d'),$=id=>document.getElementById(id);let W=390,H=844,DPR=1,scale=.85,cam={x:450,y:650};const WORLD={w:900,h:1300},TAU=Math.PI*2;
let seed=98721;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}const clamp=(v,a,b)=>Math.max(a,Math.min(b,v)),dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y),lerp=(a,b,t)=>a+(b-a)*t;
let state='menu',time=0,last=performance.now(),p,enemies=[],balls=[],gems=[],fx=[],warnings=[],id=0,kills=0,tier=0,xp=0,nextSpawn=0,bossSpawned=false,boss=null,shake=0,hitFlash=0,score=0;const stick={x:0,y:0},keys={},thresholds=[3,8,15,24,35],upgradeNames=['Rebound','Split Pass','Triple Pass','Heavy Hitters','Pinball Rugby'],upgradeText=['Your main ball bounces to a second enemy for 50% damage.','Its first hit also releases TWO smaller balls at 50% damage each.','Every split now releases THREE smaller balls.','Smaller balls now deal 75% damage each.','Each smaller ball can hit THREE different enemies in total.'];
const upgrades=['Main ball: 1 hit','Main ball: 2 hits','2 split balls · 50%','3 split balls · 50%','3 split balls · 75%','3 split balls · 75% · 3 hits each'];
addEventListener('resize',resize);resize();
const PROFILES={};
const maxTier=()=>5;
const ARENAS={};let arenaKey='rugby',enemyShots=[];
const atChasewater=()=>arenaKey==='chasewater',arena=()=>ARENAS[arenaKey],shore=y=>177+Math.sin(y/155)*23;
// Jodie: readable forward claws and bounded autonomous companion attacks.
// Evie's bounded duck lifecycle: impact -> one ally smash -> optional egg defender.
// Run progression is separate from weapon tier: three cards, four independent paths.



const SPECIALS={};
const DODGES={};
const STAT_NAMES={};
// Boss perk rolls use independent randomness; combat's deterministic visual seed is untouched.


// Journey orchestration. Arena content and character implementations are split at build time.
const BUILD_ID='10.28.0';




