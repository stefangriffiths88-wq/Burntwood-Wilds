// world/burntwood-details.js — independent overworld dressing.
// Decorative scenery is intentionally deterministic and does not alter hitboxes.
const BURNTWOOD_BUILDINGS=[
 {x:68,y:265,w:72,h:65,type:0},{x:156,y:248,w:78,h:70,type:1},
 {x:252,y:300,w:70,h:58,type:2},{x:83,y:428,w:83,h:75,type:0},
 {x:194,y:455,w:65,h:62,type:1},{x:668,y:478,w:78,h:74,type:2},
 {x:762,y:521,w:70,h:63,type:0},{x:84,y:621,w:75,h:67,type:1},
 {x:211,y:604,w:72,h:61,type:2},{x:689,y:655,w:76,h:68,type:0},
 {x:760,y:729,w:73,h:66,type:1},{x:552,y:1112,w:82,h:69,type:2},
 {x:130,y:1157,w:74,h:65,type:0},{x:424,y:1146,w:75,h:66,type:1},
 {x:590,y:96,w:50,h:60,type:0},{x:656,y:100,w:49,h:59,type:1},
 {x:719,y:100,w:54,h:58,type:2}
];
function drawBurntwoodDetails(){
 // Distinct clusters of houses and shops around the hub paths.
 for(let i=0;i<BURNTWOOD_BUILDINGS.length;i++){let b=BURNTWOOD_BUILDINGS[i];drawBuilding(b,b.type);ctx.fillStyle=['#b35b4d','#638b6a','#d7b06a'][i%3];ctx.fillRect(b.x+5,b.y+b.h-18,b.w-10,6);}
 // Individual hedges, small flowering gardens and fences make the streets feel inhabited.
 for(let i=0;i<76;i++){let x=35+(i*163+Math.floor(i/9)*29)%825,y=50+(i*241+Math.floor(i/13)*47)%1180;
 if((x>565&&x<850&&y<355)||(x<330&&y>785&&y<1120)||(x>350&&x<540&&y>830&&y<1050))continue;
 ellipse(x,y,9+i%7,5+i%4,i%2?'#3f7447':'#527f50');
 if(i%3===0){ellipse(x-3,y-4,2,2,'#edb9b2');ellipse(x+4,y+1,2,2,'#e7d28b');}
 }
 // Benches, bins, lampposts and road signs, all decorative.
 for(let i=0;i<12;i++){let x=75+(i*199)%750,y=170+(i*283)%980;ctx.fillStyle='#69513d';ctx.fillRect(x,y,26,5);ctx.fillRect(x+3,y+5,3,11);ctx.fillRect(x+20,y+5,3,11);}
 for(let i=0;i<9;i++){let x=95+(i*173)%720,y=160+(i*257)%960;line([[x,y+18],[x,y-24]],'#343f3d',3);ellipse(x,y-25,7,7,'#f3e2ad');}
 // Wildlife and reeds by Chasewater.
 for(let i=0;i<21;i++){let x=20+(i*29)%250,y=835+(i*37)%290;line([[x,y+8],[x-3,y-8]],'#6b9969',2);}
 for(let i=0;i<7;i++){let x=36+i*29,y=925+(i%3)*35;ellipse(x,y,7,4,'#e9e6d7');ellipse(x+5,y-4,3,3,'#e9e6d7');}
 // Quarry warning signs and scattered rocks.
 for(let i=0;i<20;i++){let x=654+(i*41)%205,y=970+(i*59)%200;ellipse(x,y,4+i%6,3+i%3,'#9e8c73');}
 ctx.fillStyle='#f4d16e';ctx.fillRect(646,975,48,24);ctx.fillStyle='#4d4433';ctx.textAlign='center';ctx.font='bold 9px system-ui';ctx.fillText('QUARRY',670,990);
}
