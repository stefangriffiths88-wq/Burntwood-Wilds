// world/shopkeeper.js — NPC identity, movement, dialogue and shop interaction.
// Kept independent of arenas and character upgrades.
const SHOPKEEPER={name:'Mabel',x:719,y:379,reach:67,phase:0,chat:0};
function shopkeeperNear(){return dist(p,SHOPKEEPER)<SHOPKEEPER.reach;}
function updateShopkeeper(dt){SHOPKEEPER.phase+=dt;SHOPKEEPER.chat=Math.max(0,SHOPKEEPER.chat-dt);}
function drawShopkeeper(){
 const n=SHOPKEEPER,t=n.phase,bob=Math.sin(t*3)*1.7;
 ellipse(n.x,n.y+17,22,7,'#213b2b88');
 // Independent floating hands, apron, pointed bonnet, warm eyes and a waving greeting.
 ctx.fillStyle='#6b405e';ctx.beginPath();ctx.moveTo(n.x-16,n.y-8+bob);ctx.lineTo(n.x+16,n.y-8+bob);ctx.lineTo(n.x+20,n.y+17);ctx.lineTo(n.x-20,n.y+17);ctx.closePath();ctx.fill();
 ctx.fillStyle='#ead8a2';ctx.fillRect(n.x-9,n.y+2+bob,18,16);
 ellipse(n.x-22,n.y+Math.sin(t*4)*3,8,8,'#d7ad8d');
 ellipse(n.x+23,n.y-5+Math.sin(t*5)*6,8,8,'#d7ad8d');
 ellipse(n.x,n.y-24+bob,17,17,'#cda786');
 ellipse(n.x-7,n.y-25+bob,3.4,4.5,'#253f38');ellipse(n.x+7,n.y-25+bob,3.4,4.5,'#253f38');
 ctx.strokeStyle='#694b41';ctx.lineWidth=2;ctx.beginPath();ctx.arc(n.x,n.y-20+bob,5,.15,Math.PI-.15);ctx.stroke();
 ctx.fillStyle='#5e4a3e';ctx.beginPath();ctx.moveTo(n.x-22,n.y-34+bob);ctx.lineTo(n.x,n.y-65+bob);ctx.lineTo(n.x+20,n.y-34+bob);ctx.closePath();ctx.fill();
 ellipse(n.x,n.y-35+bob,24,5,'#9b7653');
 ctx.textAlign='center';ctx.font='bold 12px Georgia';ctx.fillStyle='#fff0bb';ctx.fillText('MABEL · TRADER',n.x,n.y-75+bob);
 if(shopkeeperNear()||n.chat>0){ctx.fillStyle='#fff5d8';ctx.fillRect(n.x-68,n.y-117,136,25);ctx.fillStyle='#2e4c39';ctx.font='bold 11px system-ui';ctx.fillText(n.chat>0?'Lovely to see you!':'TALK · SHOP',n.x,n.y-100);}
}
function interactShopkeeper(){if(state!=='hub'||!shopkeeperNear())return false;SHOPKEEPER.chat=2;return openHubShop();}
