// Native canvas scenery follows the corrected route: railway terminus, no crossing.
function rugbyInView(x,y,m=140){return Math.abs(x-cam.x)<W/scale/2+m&&Math.abs(y-cam.y)<H/scale*.65+m;}
function rugbyTree(x,y,i=0){if(!rugbyInView(x,y))return;ellipse(x+7,y+13,38,17,'#1c42354a');line([[x,y+20],[x,y-13]],'#6a6447',8);wildOval(x,y-24,34,33,'#315c40',['#73935b','#5c844e','#628d50'][i%3]);ellipse(x-12,y-36,16,13,'#8ca36655');}
function rugbyBuilding(x,y,w,h,label){if(!rugbyInView(x+w/2,y+h/2,600))return;ctx.fillStyle='#23453455';ctx.fillRect(x+12,y+15,w,h);ctx.fillStyle='#a87454';ctx.fillRect(x,y,w,h);for(let i=22;i<w-20;i+=65){ctx.fillStyle='#e6d6af';ctx.fillRect(x+i,y+h-64,40,42);ctx.fillStyle='#82a9a3';ctx.fillRect(x+i+4,y+h-60,32,32);}catShape(`M${x-15} ${y+20}L${x+w/2} ${y-90}L${x+w+15} ${y+20}Z`,'#53605a','#2b4538',5);for(let k=0;k<4;k++)line([[x+k*12,y+15-k*14],[x+w-k*12,y+15-k*14]],'#81908766',3);ctx.fillStyle='#254b3c';ctx.fillRect(x+w*.16,y+30,w*.68,47);ctx.fillStyle='#f2e1ae';ctx.font='bold 22px system-ui';ctx.textAlign='center';ctx.fillText(label,x+w/2,y+61);}
function rugbyContainer(x,y,color){ctx.fillStyle='#173c2c55';ctx.fillRect(x+9,y+12,245,143);ctx.fillStyle=color;ctx.fillRect(x,y,240,140);for(let k=15;k<240;k+=22)line([[x+k,y+8],[x+k,y+134]],'#c8c6a744',4);line([[x,y],[x+240,y]],'#d5c9a0',6);line([[x+120,y+3],[x+120,y+136]],'#3d5145',3);ctx.fillStyle='#e8d8a6';ctx.font='bold 16px system-ui';ctx.textAlign='center';ctx.fillText('SPORTS EQUIPMENT',x+120,y+76);}
function rugbyCar(x,y,c){if(!rugbyInView(x,y))return;ellipse(x+6,y+9,34,59,'#163a2f66');wildOval(x,y,28,52,'#293f38',c);ctx.fillStyle='#bdd1c7';ctx.fillRect(x-21,y-25,42,20);ctx.fillStyle='#486965';ctx.fillRect(x-21,y+19,42,17);ctx.fillStyle=c;ctx.fillRect(x-22,y-3,44,19);line([[x-23,y-39],[x-23,y+40]],'#e7e2c266',2);for(let side of [-1,1]){line([[x+side*28,y-29],[x+side*28,y-12]],'#25312b',6);line([[x+side*28,y+25],[x+side*28,y+40]],'#25312b',6);line([[x+side*17,y-45],[x+side*23,y-42]],'#f3e4ad',5);line([[x+side*17,y+46],[x+side*23,y+43]],'#a74737',4);}line([[x-8,y+49],[x+8,y+49]],'#e8d79a',3);}
function drawRugbyRouteGround(){ctx.fillStyle='#4d7548';ctx.fillRect(0,0,WORLD.w,WORLD.h);
// Public road behind the eastern hedge; the player stays on the access lane.
ctx.fillStyle='#68736e';ctx.fillRect(2280,0,290,9000);for(let y=0;y<9000;y+=150)line([[2425,y],[2425,y+70]],'#dedcc2',6);for(let y of [900,2350,3900,5400])rugbyCar(2350,y,['#9b6553','#587b93'][y%2]);
// The railway ENDS north of the entrance; its buffer does not cross the path.
ctx.fillStyle='#77816e';ctx.fillRect(1440,0,115,8020);for(let y=0;y<8000;y+=36)if(rugbyInView(1500,y))line([[1445,y],[1550,y]],'#8d7960',10);for(let x of [1462,1535])line([[x,0],[x,7980]],'#bac2b5',7);line([[1445,7990],[1550,7990]],'#a7654e',18);for(let y=120;y<8050;y+=95)if(rugbyInView(1585,y)){line([[1585,y-55],[1585,y+35]],'#4e6451',4);line([[1585,y],[1585,y+65]],'#8d9e7c',2);}line([[1585,0],[1585,8050]],'#7f9475',2);
ctx.strokeStyle='#b5b29a';ctx.lineWidth=350;ctx.lineJoin='round';ctx.lineCap='butt';ctx.beginPath();for(let [i,q]of rugbyLanePoints().entries())i?ctx.lineTo(...q):ctx.moveTo(...q);ctx.stroke();ctx.strokeStyle='#777d6d';ctx.lineWidth=300;ctx.stroke();drawRugbyLaneDetails();line([[980,6370],[980,5860]],'#c2b38b',220);
// Bottom pitch, clubhouse and car park remain on the return side of the lane.
ctx.save();ctx.translate(0,3000);ctx.fillStyle='#587f4d';ctx.fillRect(220,1580,1080,1420);for(let y=1580;y<3000;y+=145){ctx.fillStyle=(Math.floor(y/145)%2)?'#5b844f':'#517a47';ctx.fillRect(220,y,1080,145);}ctx.strokeStyle='#e8e6bd';ctx.lineWidth=5;ctx.strokeRect(285,1700,950,1160);for(let y of [1950,2280,2610])line([[285,y],[1235,y]],'#eee8c0',4);for(let y of [1740,2820]){line([[645,y-70],[645,y+30]],'#e9e4c4',10);line([[875,y-70],[875,y+30]],'#e9e4c4',10);line([[645,y-30],[875,y-30]],'#e9e4c4',8);for(let x of [645,875])line([[x,y-5],[x,y+35]],'#b89059',19);}ctx.fillStyle='#e4d7a6';ctx.font='bold 26px system-ui';ctx.textAlign='center';if(state!=='cleared')ctx.fillText('BOTTOM PITCH',760,1645);
ctx.fillStyle='#818575';ctx.fillRect(740,3450,560,1850);rugbyBuilding(160,4740,600,350,'BURNTWOOD RUGBY CLUB');for(let y=3650;y<5300;y+=220){for(let x of [770,1130]){line([[x,y],[x+130,y]],'#d9d9ba',4);}}rugbyContainer(330,3160,'#8c6652');rugbyContainer(610,3160,'#577c8a');
ctx.restore();for(let car of RUGBY_PARKED_CARS){let q=rugbyParkedCarPosition(car);rugbyCar(q.x,q.y,car.c);}rugbyBuilding(1740,80,220,190,'RAILWAY CAFÉ');
// Tree belts also describe the impassable geometry; no invisible route shortcuts.
for(let y=280;y<8140;y+=110){rugbyTree(1350,y,Math.floor(y/110));rugbyTree(2080,y,Math.floor(y/110)+1);rugbyTree(2200,y+40,Math.floor(y/110)+2);}ctx.save();ctx.translate(0,3000);for(let x=100;x<1400;x+=110){rugbyTree(x,1450,Math.floor(x/110));if(x<800||x>1180)rugbyTree(x,3030,Math.floor(x/110));}for(let y=1650;y<4700;y+=125){rugbyTree(105,y,Math.floor(y/125));if(y>3450)rugbyTree(690,y,Math.floor(y/125));}ctx.fillStyle='#e9d69d';ctx.font='bold 24px system-ui';ctx.textAlign='center';ctx.fillText('CLUB ENTRANCE',1600,5580);line([[1280,5185],[1180,5185]],'#d6c28b',6);ctx.restore();drawRugbyBrickEntrance();}

function drawRugbyLaneDetails(){for(let y=550,i=0;y<8000;y+=170,i++){let x=rugbyLaneX(y);if(!rugbyInView(x,y))continue;
 // Broken tarmac, gravel shoulders, shallow puddles and muddy tyre tracks.
 for(let side of [-1,1]){line([[x+side*100,y-90],[x+side*96,y],[x+side*103,y+85]],'#5b655a55',9);for(let k=0;k<7;k++){let xx=x+side*(125+k%3*7),yy=y-70+k*23;ellipse(xx,yy,2+k%2,1.5,'#c3b69a');}}
 if(i%3===0){let px=x+(i%2?60:-55);catShape(`M${px-24} ${y-5}L${px-12} ${y-15}L${px+15} ${y-12}L${px+29} ${y+1}L${px+11} ${y+15}L${px-20} ${y+12}Z`,'#4d584e','#b3a98a',2);ellipse(px,y,19,7,'#718d88');line([[px-12,y-2],[px+7,y-2]],'#b4cbc044',2);}
 if(i%5===1){let sx=x+190;line([[sx,y+20],[sx,y-45]],'#655b43',6);ctx.fillStyle='#274f3c';ctx.fillRect(sx-45,y-70,90,30);ctx.fillStyle='#f4df9b';ctx.font='bold 12px system-ui';ctx.textAlign='center';ctx.fillText('CLUB ↓',sx,y-50);}
 for(let k=0;k<4;k++){let bx=x+(i%2?1:-1)*(167+k*8);ellipse(bx,y+k*14,8,5,'#9b8a61');line([[bx-3,y+k*14-3],[bx+2,y+k*14-5]],'#c9b27d',1);}
 if(i%4===2){let bx=x+177;line([[bx,y-10],[bx+18,y+2]],'#6a5a40',3);ellipse(bx-3,y-10,9,6,'#6b8250');ellipse(bx+13,y-5,7,5,'#8d9a5b');}
}}

function drawRugbyBrickEntrance(){
 for(let b of RUGBY_ENTRANCE_WALLS){if(!rugbyInView(b.x,b.y+b.h/2,350))continue;
  ctx.fillStyle='#263e3355';ctx.fillRect(b.x+9,b.y+7,b.w+5,b.h+5);
  ctx.fillStyle='#9a624a';ctx.fillRect(b.x,b.y,b.w,b.h);
  for(let y=b.y+4,i=0;y<b.y+b.h;y+=12,i++){line([[b.x,y],[b.x+b.w,y]],'#d1b08b',1.5);for(let x=b.x+(i%2?8:23);x<b.x+b.w;x+=25)line([[x,y],[x,y+11]],'#694d3e',1);}
  ctx.fillStyle='#c4b49a';ctx.fillRect(b.x-3,b.y,b.w+6,7);
  for(let y of [b.y,b.y+b.h-20]){ctx.fillStyle='#80523e';ctx.fillRect(b.x-7,y,b.w+14,24);ctx.fillStyle='#d6c8ac';ctx.fillRect(b.x-10,y-5,b.w+20,8);}
 }
 if(rugbyInView(1390,8290,300)){ctx.save();ctx.translate(1390,8162);ctx.rotate(-Math.PI/2);ctx.fillStyle='#244a38';ctx.fillRect(-72,-13,144,27);ctx.strokeStyle='#c9b58a';ctx.lineWidth=2;ctx.strokeRect(-72,-13,144,27);ctx.fillStyle='#f3dda6';ctx.font='bold 12px Georgia';ctx.textAlign='center';ctx.fillText('BURNTWOOD R.U.F.C.',0,4);ctx.restore();}
}
