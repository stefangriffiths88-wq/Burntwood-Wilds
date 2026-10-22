// Short resident conversations, changed only by victories in this journey.
const TOWN_CHAT={
 harvey:['I made a portal. Then I made a pickle. Science is going brilliantly.','Spore gun ready. What could possibly go wrong?'],
 immy:['The forest is listening. I think it wants us to fight back.','Small paws can still make a big difference.'],
 havannah:["I’m not scared. They should be scared of ME!","Told you. Tiny paws, massive attitude."],
 tom:["I’ve seen bigger monsters in the pub on a Friday night!","I’ve seen bigger monsters in the pub on a Friday night!"],
 joseph:["If those monsters think they’re getting past me, they’ve never seen my tackle!","If those monsters think they’re getting past me, they’ve never seen my tackle!"],
 ava:['I wished I could be a cat once… I didn’t mean everyone! You can fix this, can’t you?','You did it! I knew those paws were good for something.'],
 jackson:['Bruce has taken over the rugby club. Fancy helping me get our pitch back?','That’s one down. Reckon we’ve earned a victory lap?'],
 stef:['Right, we’re cats. Brilliant. Give me some essence and I’ll see what I can knock together.','Good work. Bring that essence over—let’s get you ready for the next one.'],
 jodie:['I’m trying to keep everyone together… but the cats keep wandering off. Including me.','You’re giving everyone hope. Just make sure you come back, alright?'],
 evie:['Everyone turned into cats, but the ducks stayed ducks. Suspicious, if you ask me.','The ducks are taking the credit. I’d argue, but there’s quite a few of them.'],
 zak:['Being a cat’s alright. Being trapped in Burntwood forever? Less alright.','That was actually pretty good. Don’t tell anyone I said that.'],
 mimi:['There you are, human. Whiskers suit you. Now let’s work on getting you out of here.','Feel that? The spell’s weakening. Keep going, human.']
};
function residentLine(key){if(key==='joseph'&&selected==='jodie')return 'Mum! Mum! Watch me take this monster down!';return curseResidentLine(key)||TOWN_CHAT[key][run.visited?.length?1:0];}
function openConversation(key){if(state!=='hub'||!townResidents().some(n=>n.key===key))return false;if(key===workshopKeeperKey()&&serviceOpen('stef'))return interactWorkshop(true);workshopConversation=false;$('openWorkshopAfterTalk').style.display='none';shopConversation=false;$('openShopAfterTalk').style.display='none';state='dialogue';stick.x=stick.y=0;p.vx=p.vy=0;$('townPortrait').src=PORTRAITS[key];$('townPortrait').alt=CHARACTERS[key].name;$('townName').textContent=CHARACTERS[key].name.toUpperCase();$('townLine').textContent=residentLine(key);$('townDialogue').style.display='flex';return true;}
function closeConversation(){if(state!=='dialogue')return;if(rescueDialogueResume){state=rescueDialogueResume;rescueDialogueResume=null;$('townDialogue').style.display='none';$('townClose').textContent='BACK TO TOWN';stopMovement();updateWorldActions();return;}state='hub';shopConversation=false;workshopConversation=false;$('openWorkshopAfterTalk').style.display='none';$('openShopAfterTalk').style.display='none';$('townDialogue').style.display='none';updateHubHud();}
function drawTalkBubble(x,y){ctx.save();ctx.translate(x+18,y-38);ellipse(0,0,9,7,'#f5e4b9');line([[-5,5],[-7,10],[0,6]],'#f5e4b9',2);for(let dx of [-4,0,4])ellipse(dx,0,1,1,'#34523e');ctx.restore();}
