// The selected hero stays unique: Jodie covers the shop when Mimi is playable.
const SHOPKEEPER={x:719,y:379,reach:100,phase:0};
function shopkeeperKey(){return selected==='mimi'?'jodie':'mimi';}
function shopkeeperName(){return CHARACTERS[shopkeeperKey()].name;}
function shopkeeperGreeting(){return selected==='mimi'?'Heyy Mimiiii… How can I help you save us all?':'Okay human, you’re in my world now. Allow me to help you.';}
function shopkeeperNear(){return serviceOpen('mimi')&&dist(p,SHOPKEEPER)<SHOPKEEPER.reach;}
function updateShopkeeper(dt){SHOPKEEPER.phase+=dt;}
function drawShopkeeper(){if(!serviceOpen('mimi'))return;drawTownHero(shopkeeperKey(),SHOPKEEPER.x,SHOPKEEPER.y,SHOPKEEPER.phase*.4);townName(SHOPKEEPER.x,SHOPKEEPER.y,shopkeeperName().toUpperCase()+' · SHOP');if(shopkeeperNear()){ctx.fillStyle='#fff1ce';ctx.font='bold 10px system-ui';ctx.textAlign='center';ctx.fillText('TAP TO TALK',SHOPKEEPER.x,SHOPKEEPER.y+38);}}
function interactShopkeeper(direct=false){if(state!=='hub'||!serviceOpen('mimi')||(!direct&&!shopkeeperNear()))return false;return openShopConversation();}

let shopConversation=false;
function openShopConversation(){$('openShopAfterTalk').onclick=openShopAfterTalk;if(state!=='hub'||!serviceOpen('mimi'))return false;workshopConversation=false;$('openWorkshopAfterTalk').style.display='none';shopConversation=true;state='dialogue';stopMovement();$('townPortrait').src=PORTRAITS[shopkeeperKey()];$('townPortrait').alt=shopkeeperName();$('townName').textContent=shopkeeperName().toUpperCase();$('townLine').textContent=shopkeeperGreeting();$('openShopAfterTalk').style.display='block';$('townDialogue').style.display='flex';return true;}
function openShopAfterTalk(){if(state!=='dialogue'||!shopConversation)return false;closeConversation();return openHubShop(true);}

// Ava's separate counter shares the safe hub shop shell, never Mimi's stock list.
const CHARM_SHOP={x:550,y:280,reach:78};
function charmShopKeeper(){return selected==='ava'?'evie':'ava';}
function charmShopNear(){return serviceOpen('ava')&&dist(p,CHARM_SHOP)<CHARM_SHOP.reach;}
function interactCharmShop(direct=false){if(state!=='hub'||!serviceOpen('ava')||(!direct&&!charmShopNear()))return false;shopConversation=false;workshopConversation=false;state='dialogue';stopMovement();$('townPortrait').src=PORTRAITS[charmShopKeeper()];$('townName').textContent=CHARACTERS[charmShopKeeper()].name.toUpperCase();$('townLine').textContent='A little charm can make a big difference. Have a look, or let me merge your matching treasures.';$('openWorkshopAfterTalk').style.display='none';$('openShopAfterTalk').style.display='block';$('openShopAfterTalk').onclick=()=>{if(state!=='dialogue')return;closeConversation();openCharmShop(true);};$('townDialogue').style.display='flex';return true;}
function openCharmShop(direct=false){if(state!=='hub'||!serviceOpen('ava')||(!direct&&!charmShopNear()))return false;if(!openHubShop(true))return false;run.shopService='charms';$('shopSpeaker').textContent=CHARACTERS[charmShopKeeper()].name.toUpperCase();$('shopGreeting').textContent='Pick an icon to inspect. Your gold is only spent when you press Buy.';renderHubShop();return true;}
