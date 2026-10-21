// Owned native illustration: map-informed landmarks, no third-party map imagery.
function drawBurntwoodPark(){
 ctx.fillStyle='#384f3b';ctx.fillRect(0,0,1600,2450);ctx.fillStyle='#6c8956';ctx.fillRect(180,160,1190,2060);
 // Surrounding roads frame the park without becoming playable shortcuts.
 line([[90,100],[90,2310],[1500,2310],[1500,100]],'#aaa98e',76);line([[90,100],[90,2310],[1500,2310],[1500,100]],'#657068',53);ctx.setLineDash([16,20]);line([[90,100],[90,2310],[1500,2310],[1500,100]],'#dfd4ae',3);ctx.setLineDash([]);
 // Northern pitches and event field, with generous space for the final fight.
 ctx.fillStyle='#7e955d';ctx.fillRect(260,220,1040,630);for(let y=240;y<840;y+=95){ctx.fillStyle=(y%190<95)?'#829b62':'#78945a';ctx.fillRect(275,y,1010,90);}ctx.strokeStyle='#d4dfb4';ctx.lineWidth=3;ctx.strokeRect(390,300,790,450);line([[785,300],[785,750]],'#d4dfb4',3);ctx.beginPath();ctx.arc(785,525,68,0,TAU);ctx.stroke();for(let x of [390,1180])line([[x,460],[x,590]],'#efdfb0',7);
 // Actual layout relationships: southern gardens, southeast woodland, central play.
 const paths=[[[1400,1880],[1160,1850],[1020,1610],[950,1440],[790,1120],[790,830]],[[300,2200],[380,1950],[520,1690],[790,1480],[790,1120]],[[280,1200],[790,1120],[1320,1150]],[[790,830],[300,830],[300,320],[1280,320],[1280,830],[790,830]]];
 for(let p of paths)line(p,'#5b744e',70);for(let p of paths)line(p,'#c5b48d',51);for(let p of paths)line(p,'#d4c7a4',35);
 // Ornamental garden loop and raised beds in the southwest.
 ctx.strokeStyle='#d4c7a4';ctx.lineWidth=24;ctx.beginPath();ctx.ellipse(455,1900,170,145,0,0,TAU);ctx.stroke();for(let [x,y]of [[380,1830],[530,1830],[380,1970],[530,1970]]){ellipse(x,y,48,35,'#446b43');for(let i=0;i<9;i++)ellipse(x+Math.cos(i*2.4)*32,y+Math.sin(i*2.4)*21,4,4,['#dca797','#e3cb78','#a9bfd3'][i%3]);}
 // Woodland belts; deliberate gaps leave the route and warnings readable.
 for(let i=0;i<55;i++){let x=870+(i*137)%480,y=1600+(i*193)%570;if(Math.abs(x-(y>1800?1180:1020))<80)continue;mapTree(x,y,21+i%4*4);}for(let i=0;i<24;i++){let x=220+(i*139)%1100;mapTree(x,190+i%3*24,23);}for(let y=350;y<2150;y+=125){mapTree(190,y,25);if(y<1700)mapTree(1360,y,25);}
 // Bike-track loops beside the playground.
 ctx.strokeStyle='#4e5945';ctx.lineWidth=35;ctx.beginPath();ctx.ellipse(1130,1510,145,95,-.25,0,TAU);ctx.stroke();ctx.strokeStyle='#a28f6c';ctx.lineWidth=22;ctx.stroke();for(let x of [1030,1140,1240]){ellipse(x,1505,24,12,'#8b7b58');line([[x-18,1505],[x+18,1505]],'#bfac7b',3);}
 ctx.fillStyle='#ad9d7b';ctx.fillRect(590,1200,550,230);ctx.fillStyle='#b9aa85';ctx.fillRect(602,1210,526,208);
 for(let b of PARK_ROUTE.solids){ellipse(b.x+b.w/2+5,b.y+b.h+7,b.w*.56,9,'#233d3244');if(b.type==='hut'){drawBuilding(b,0);line([[b.x,b.y-1],[b.x+b.w,b.y-1]],'#55725b',8);}else if(b.type==='climber'){ctx.fillStyle='#96714e';ctx.fillRect(b.x,b.y,b.w,b.h);for(let x=b.x+12;x<b.x+b.w;x+=25)line([[x,b.y-18],[x,b.y+42]],'#dfc887',5);line([[b.x+20,b.y-20],[b.x+b.w-20,b.y-20]],'#bd9659',8);line([[b.x+b.w-20,b.y],[b.x+b.w+40,b.y+40]],'#bdc6ac',15);}else if(b.type==='swing'){line([[b.x,b.y+b.h],[b.x+15,b.y-65],[b.x+b.w-15,b.y-65],[b.x+b.w,b.y+b.h]],'#8b6951',8);for(let x of [b.x+35,b.x+85]){line([[x,b.y-60],[x,b.y+10]],'#b6c6ba',2);line([[x-10,b.y+10],[x+10,b.y+10]],'#456d77',6);}}else{line([[b.x,b.y],[b.x+b.w,b.y]],'#92704d',10);for(let x of [b.x+8,b.x+b.w-8])line([[x,b.y],[x,b.y+22]],'#394e3d',4);}}
 // Elder Lane entrance pillars and a single attached destination plaque.
 for(let y of [1785,1970]){ctx.fillStyle='#a27353';ctx.fillRect(1390,y,30,46);ctx.fillStyle='#d1be98';ctx.fillRect(1385,y-5,40,9);}ctx.fillStyle='#254b37';ctx.fillRect(1380,1738,80,32);ctx.fillStyle='#f0d99f';ctx.font='bold 9px Georgia';ctx.textAlign='center';ctx.fillText('BURNTWOOD',1420,1750);ctx.fillText('PARK',1420,1763);
 // A visible bramble barrier marks the guard gate, opening after victory.
 if(!run.heroicRewarded&&!run.areaCleared){for(let x=200;x<1360;x+=32){line([[x,1015],[x+28,1040],[x+12,1000]],'#59643b',5);ellipse(x+14,1025,15,8,'#49683f');}}
 ctx.save();ctx.translate(1540,1700);ctx.rotate(-Math.PI/2);ctx.fillStyle='#d9d1b2';ctx.font='bold 16px system-ui';ctx.fillText('ELDER LANE',0,0);ctx.restore();ctx.fillStyle='#d9d1b2';ctx.font='bold 16px system-ui';ctx.textAlign='center';ctx.fillText('CANNOCK ROAD',800,2340);
}
