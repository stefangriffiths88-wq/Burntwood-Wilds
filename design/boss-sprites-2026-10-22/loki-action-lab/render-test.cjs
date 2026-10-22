const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const{createCanvas,Path2D,Image}=require(process.env.CODEX_PRIMARY_RUNTIME_NODE_MODULES+'/@napi-rs/canvas');
(async()=>{
 let canvas=createCanvas(780,840);canvas.listeners={};canvas.addEventListener=(k,f)=>canvas.listeners[k]=f;canvas.getBoundingClientRect=()=>({left:0,top:0,width:390,height:420});canvas.setPointerCapture=()=>{};
 let buttons=Object.fromEntries(['pounce','double','rescue','reset','dodge','pause'].map(a=>[a,{dataset:{action:a},addEventListener(_,fn){this.click=fn;}}])),status={},rootEvents={},windowEvents={},documentEvents={},queue=[],now=0;
 let root={querySelector:s=>s==='canvas'?canvas:s==='[data-status]'?status:buttons[s.match(/"([a-z]+)"/)[1]],querySelectorAll:()=>Object.values(buttons),addEventListener:(k,f)=>rootEvents[k]=f};
 let document={hidden:false,getElementById:()=>root,addEventListener:(k,f)=>documentEvents[k]=f};
 const c={console,document,window:{addEventListener:(k,f)=>windowEvents[k]=f},Image,Path2D,Math,Promise,performance:{now:()=>now},requestAnimationFrame:fn=>{queue.push(fn);return queue.length;},cancelAnimationFrame:()=>{queue=[];}};
 vm.createContext(c);const html=fs.readFileSync('/workspace/loki-action-test.html','utf8');vm.runInContext(html.match(/<script>([\s\S]*)<\/script>/)[1],c);for(let i=0;i<100&&Object.keys(root.actionLab.images).length<3;i++)await new Promise(r=>setTimeout(r,20));
 assert.equal(Object.keys(root.actionLab.images).length,3);root.actionLab.draw();fs.writeFileSync(__dirname+'/ready.png',canvas.toBuffer('image/png'));
 function frames(n){for(let i=0;i<n;i++){now+=1000/60;let q=queue;queue=[];for(let f of q)f(now);}}
 buttons.pounce.click();frames(65);assert.equal(root.actionLab.lab.phase,'crouch');fs.writeFileSync(__dirname+'/crouch.png',canvas.toBuffer('image/png'));
 frames(55);assert.equal(root.actionLab.lab.phase,'air');assert(root.actionLab.lab.height>0);fs.writeFileSync(__dirname+'/pounce.png',canvas.toBuffer('image/png'));
 frames(120);assert.equal(root.actionLab.lab.phase,'ready');assert.equal(root.actionLab.lab.player.hp,80);
 buttons.reset.click();buttons.double.click();frames(480);assert.equal(root.actionLab.lab.events.filter(e=>e.phase==='impact').length,2);
 buttons.reset.click();canvas.listeners.pointerdown({pointerId:1,clientX:90,clientY:300,preventDefault(){}});canvas.listeners.pointermove({pointerId:1,clientX:125,clientY:300,preventDefault(){}});frames(30);assert(root.actionLab.lab.player.x>150);canvas.listeners.pointercancel({pointerId:1});assert.equal(root.actionLab.input().x,0);
 buttons.pounce.click();frames(5);document.hidden=true;documentEvents.visibilitychange();let old=root.actionLab.lab.clock;frames(80);assert(root.actionLab.lab.paused);assert.equal(root.actionLab.lab.clock,old);document.hidden=false;buttons.pause.click();frames(10);assert(root.actionLab.lab.clock>old);
 buttons.reset.click();buttons.rescue.click();root.actionLab.draw();assert.equal(root.actionLab.lab.phase,'rescued');fs.writeFileSync(__dirname+'/rescued.png',canvas.toBuffer('image/png'));
 assert(html.length<1000000);assert(!/fetch\(|localStorage|sessionStorage|XMLHttpRequest/.test(html));
 console.log('PASS embedded alpha sprites decode; real Canvas scenes; pointer drag/cancel; pounce controls; two jumps; pause/background/resume; rescue; no storage/network dependencies');
})().catch(e=>{console.error(e);process.exit(1)});
