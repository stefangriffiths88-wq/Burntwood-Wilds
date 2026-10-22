// Standalone timing/interaction laboratory. No game globals, saves or network.
class LokiActionLab {
 constructor(){this.reset();}
 reset(){this.player={x:115,y:325,hp:100,inv:0,cooldown:0,dash:0,dx:1,dy:0};this.boss={x:275,y:235};this.phase='ready';this.elapsed=0;this.clock=0;this.target=null;this.locked=false;this.remaining=0;this.pounceIndex=0;this.particles=[];this.message='Choose a pounce test';this.paused=false;this.lastMove={x:0,y:-1};this.events=[];}
 start(count=1){if(!['ready','rescued'].includes(this.phase))return false;this.remaining=count===2?2:1;this.pounceIndex=0;this.target=null;this.locked=false;this.setPhase('guardian');return true;}
 setPhase(phase){this.phase=phase;this.elapsed=0;this.events.push({phase,time:this.clock});this.message={guardian:'Guardian stance · approaching',crouch:'Playful crouch · watch the landing marker',air:'Large pounce',recover:'Landing · opening to attack',ready:'Ready for another test',rescued:'Loki rescued · relaxed stance'}[phase]||phase;}
 rescue(){this.setPhase('rescued');this.remaining=0;this.target=null;this.locked=false;this.particles=[];}
 dodge(){let p=this.player;if(this.paused||p.cooldown>0)return false;p.cooldown=1.3;p.inv=.3;p.dash=.17;let q=this.lastMove,n=Math.hypot(q.x,q.y)||1;p.dx=q.x/n;p.dy=q.y/n;return true;}
 step(dt,input={x:0,y:0}){
  if(this.paused)return;dt=Math.min(.1,Math.max(0,dt));this.clock+=dt;this.elapsed+=dt;
  let p=this.player,n=Math.hypot(input.x,input.y),ux=n?input.x/Math.max(1,n):0,uy=n?input.y/Math.max(1,n):0;
  if(n>.05)this.lastMove={x:ux,y:uy};p.cooldown=Math.max(0,p.cooldown-dt);p.inv=Math.max(0,p.inv-dt);
  let speed=p.dash>0?450:125,mx=p.dash>0?p.dx:ux,my=p.dash>0?p.dy:uy;p.dash=Math.max(0,p.dash-dt);
  p.x=Math.max(24,Math.min(366,p.x+mx*speed*dt));p.y=Math.max(105,Math.min(394,p.y+my*speed*dt));
  for(let f of this.particles)f.life-=dt;this.particles=this.particles.filter(f=>f.life>0);
  let b=this.boss;
  if(this.phase==='guardian'){
   let dx=p.x-b.x,dy=p.y-b.y,d=Math.hypot(dx,dy)||1;if(d>160){b.x+=dx/d*28*dt;b.y+=dy/d*28*dt;}
   if(this.elapsed>=.75){this.pounceIndex++;this.locked=false;this.target={x:p.x,y:p.y};this.setPhase('crouch');}
  }else if(this.phase==='crouch'){
   let lockAt=this.pounceIndex>1?.5:.68,launchAt=this.pounceIndex>1?.9:1.1;
   if(!this.locked){this.target={x:p.x,y:p.y};if(this.elapsed>=lockAt){this.locked=true;this.message='Target locked · move or dodge';this.events.push({phase:'locked',time:this.clock,target:{...this.target}});}}
   if(this.elapsed>=launchAt){this.from={...b};this.airDuration=this.pounceIndex>1?.58:.68;this.setPhase('air');}
  }else if(this.phase==='air'){
   let u=Math.min(1,this.elapsed/this.airDuration);b.x=this.from.x+(this.target.x-this.from.x)*u;b.y=this.from.y+(this.target.y-this.from.y)*u;
   if(u>=1){let d=Math.hypot(p.x-b.x,p.y-b.y),hit=d<59&&p.inv<=0;if(hit)p.hp=Math.max(0,p.hp-20);this.events.push({phase:'impact',time:this.clock,hit,target:{...this.target}});this.particles.push({x:b.x,y:b.y,life:.5,hit});this.remaining--;this.setPhase('recover');this.message=hit?'Hit · −20 health':d<59?'Dodged · invulnerable at landing':'Missed · you cleared the landing';}
  }else if(this.phase==='recover'&&this.elapsed>=(this.remaining>0?.65:1.35)){
   if(this.remaining>0){this.pounceIndex++;this.target={x:p.x,y:p.y};this.locked=false;this.setPhase('crouch');}else{this.target=null;this.setPhase('ready');}
  }
 }
 get height(){return this.phase==='air'?Math.sin(Math.min(1,this.elapsed/this.airDuration)*Math.PI)*72:0;}
 get active(){return !this.paused&&(!['ready','rescued'].includes(this.phase)||this.player.cooldown>0||this.player.inv>0||this.particles.length>0);}
}
if(typeof module!=='undefined')module.exports={LokiActionLab};
