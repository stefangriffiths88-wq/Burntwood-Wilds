// The selected hero stays unique: Jodie covers the shop when Mimi is playable.
const SHOPKEEPER={x:719,y:379,reach:67,phase:0};
function shopkeeperKey(){return selected==='mimi'?'jodie':'mimi';}
function shopkeeperName(){return CHARACTERS[shopkeeperKey()].name;}
function shopkeeperGreeting(){return selected==='mimi'?'Heyy Mimiiii… How can I help you save us all?':'Okay human, you’re in my world now. Allow me to help you.';}
function shopkeeperNear(){return dist(p,SHOPKEEPER)<SHOPKEEPER.reach;}
function updateShopkeeper(dt){SHOPKEEPER.phase+=dt;}
function drawShopkeeper(){drawTownHero(shopkeeperKey(),SHOPKEEPER.x,SHOPKEEPER.y,SHOPKEEPER.phase*.4);townName(SHOPKEEPER.x,SHOPKEEPER.y,shopkeeperName().toUpperCase()+' · SHOP');if(shopkeeperNear()){ctx.fillStyle='#fff1ce';ctx.font='bold 10px system-ui';ctx.textAlign='center';ctx.fillText('TAP TO TALK',SHOPKEEPER.x,SHOPKEEPER.y+38);}}
function interactShopkeeper(direct=false){if(state!=='hub'||(!direct&&!shopkeeperNear()))return false;return openShopConversation();}

let shopConversation=false;
function openShopConversation(){if(state!=='hub')return false;shopConversation=true;state='dialogue';stopMovement();$('townPortrait').src=PORTRAITS[shopkeeperKey()];$('townPortrait').alt=shopkeeperName();$('townName').textContent=shopkeeperName().toUpperCase();$('townLine').textContent=shopkeeperGreeting();$('openShopAfterTalk').style.display='block';$('townDialogue').style.display='flex';return true;}
function openShopAfterTalk(){if(state!=='dialogue'||!shopConversation)return false;closeConversation();return openHubShop(true);}
