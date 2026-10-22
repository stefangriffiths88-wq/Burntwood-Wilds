// Native Canvas design candidates only. Not registered in the game manifest.
// Same primitives, world units and camera scale as the production game.
function bossShade(x,y,r,inside,outside){let g=ctx.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,inside);g.addColorStop(1,outside);return g;}
function sharpEye(x,y,s,color='#efae60'){
 catShape(`M${x-s*6} ${y-3}L${x+s*6} ${y-6}L${x+s*4} ${y+2}L${x-s*4} ${y+3}Z`,'#1c2529',null);
 ellipse(x,y,3.4,2.2,color);ellipse(x+s*.6,y,1.1,2.1,'#281e29');ellipse(x-1,y-.7,.7,.7,'#fff0bd');
}
function proposalUmbrella(e){
 let wind=e.monsterState==='warning',strike=e.monsterState==='attack';ctx.save();ctx.scale(1.7,1.7);ctx.rotate(strike?-.13:wind?.06:-.04);
 // Hunched street figure: long patched coat, narrow boots, crooked silhouette.
 for(let s of [-1,1]){catShape(`M${s*4} 22L${s*10} 22L${s*13} 40L${s*5} 41Z`,'#383b38','#202e2c',1);wildOval(s*11+3,42,9,3.6,'#272e2c','#6e776a');}
 catShape('M-15 -30Q-4 -40 9 -28L20 4 17 31 6 28-1 35-9 29-19 32-24 19-23 -3Z',bossShade(-10,-13,62,'#727868','#303e39'),'#24332e',1.6);
 catShape('M-9 -25 1 -12 8 -27 8 10-1 20-9 8Z','#b2a58b','#4b5548',.7);
 catShape('M-17 -28-5 -35-4 -19-10 -7-17 -11Z','#8c9180','#33453c',.8);catShape('M5 -31 15 -21 8 -9 1 -12Z','#535f4f','#2a3b32',.8);
 line([[-2,-9],[0,25]],'#c2b08a',.9);for(let y of [-2,8,18])ellipse(2,y,1.4,1.4,'#d7bf89');
 catShape('M-18 10-7 8-6 21-17 23Z','#6c6654','#c0ad82',.7);for(let x of [-16,-10])line([[x,11],[x+2,20]],'#c6b89a',.6);
 line([[-20,-17],[-29,-1],[-25,9]],'#3e4a40',9);line([[-21,-18],[-28,-3]],'#8a907b',2);
 wildOval(-25,9,4,5,'#b59a7b','#e4c6a0');
 // Tied rubbish bag keeps the local street identity without the trolley monster.
 catShape('M-28 12-21 11-17 18Q-5 42-24 44Q-43 46-38 29L-31 20Z','#393e40','#8a9685',1);
 line([[-29,17],[-21,16]],'#bdac8c',1.4);line([[-29,25],[-33,37]],'#67706b',1);catShape('M-35 30-27 26-24 35-32 38Z','#69766c',null);
 // Narrow human face: hooked nose, shadowed brow and stubble, no cute cat eyes.
 wildOval(0,-42,11,15,'#9f8870','#cfb594');catShape('M6 -45 16 -35 8 -31 5 -33Z','#bc9b7b','#534d40',.7);
 catShape('M-10 -44Q-14 -55-2 -58L11 -51 11 -43 3 -46-6 -40Z','#4a443d','#7d735f',.8);
 line([[-6,-44],[5,-46]],'#463c32',2.2);sharpEye(1,-41,1,'#dab86a');line([[-3,-29],[7,-29]],'#594a3e',1.1);
 for(let i=0;i<7;i++)line([[-8+i*2,-32+(i%2)*2],[-7+i*2,-29+(i%2)]],'#6f5b48',.7);
 // Large off-centre battered umbrella, open for a visible defensive tell.
 let ux=strike?36:38,uy=strike?-5:wind?-28:-18;
 line([[12,-20],[22,-12],[ux,uy]],'#65705e',8);line([[12,-22],[23,-14]],'#a1a68c',2);wildOval(ux,uy,4.2,4.5,'#b69a79','#e9caa3');
 ctx.save();ctx.translate(ux,uy);ctx.rotate(strike?.65:-.12);
 line([[0,14],[0,-49]],'#3c443f',3.7);line([[-.7,13],[-.7,-48]],'#c8bd9d',1.1);
 let open=wind||!strike;
 if(open){
  catShape('M-43 -31Q-20 -63 0 -64Q24 -63 43 -31L35 -27 23 -31 12 -25 0 -30-12 -25-24 -31-35 -27Z','#303d4b','#b6b6a0',1.1);
  let panels=[['M-43 -31Q-25 -57 0 -64Q-18 -49-24 -31Z','#52616b'],['M-24 -31Q-15 -54 0 -64L0 -30-12 -25Z','#3f505b'],['M0 -64Q21 -50 23 -31L12 -25 0 -30Z','#53626c'],['M0 -64Q28 -58 43 -31L35 -27 23 -31Z','#273541']];
  for(let [d,c]of panels)catShape(d,c,null);
  for(let x of [-43,-24,0,23,43])line([[0,-64],[x,-31]],'#b3bba077',.75);
  catShape('M-33 -41-24 -47-21 -39-29 -34Z','#8a8870','#bfb491',.6);line([[-30,-40],[-25,-42]],'#424d48',.6);
  line([[15,-48],[21,-44],[17,-38]],'#bec7ac',1);line([[0,-67],[0,-63]],'#c8c3ab',1.5);
 }else{catShape('M-7 -47 0 -70 8 -45 4 -8-4 -8Z','#41525f','#acb3a1',1.2);line([[0,-66],[0,-11]],'#b5bba3',1);}
 line([[0,14],[-2,20],[-7,20],[-9,16]],'#b9b69c',2.4);ctx.restore();ctx.restore();
}
function proposalGolem(e){
 let wind=e.monsterState==='warning',strike=e.monsterState==='attack';ctx.save();ctx.scale(1.65,1.65);ctx.translate(0,strike?8:0);
 // Heavy, asymmetrical quarried slabs and one genuinely oversized hammer fist.
 bossStone(-19,40,31,21,'#555e5a','#a8a68c');bossStone(22,39,35,24,'#626b63','#bab79a');
 for(let [x,y,w,h]of [[-18,23,25,28],[21,24,27,31]])bossStone(x,y,w,h,'#59655e','#9caa94');
 bossStone(-33,-20,36,34,'#616c66','#b7b8a1');bossStone(34,-12,35,35,'#626d68','#b2b6a1');
 let fy=wind?-31:strike?31:20;bossStone(-48,fy,39,43,'#606962','#c3bea5');bossStone(-43,fy+16,33,19,'#59615b','#a9aa90');
 for(let i=0;i<3;i++)line([[-57+i*9,fy+8],[-60+i*9,fy+20]],'#323f3a',2);
 bossStone(42,15,27,37,'#626e65','#a6b398');bossStone(45,31,30,22,'#62675d','#aaa68b');
 bossStone(0,1,65,60,'#5e6a61','#aeb49d');catShape('M-22 -16-8 -22 3 -15 16 -20 23 -4 13 23-4 27-24 10Z','#424e48','#818d76',1.2);
 // A split glowing seam is embedded in rock; it is not a floating crystal.
 line([[-3,-18],[3,-9],[-3,-1],[6,8],[0,23]],'#6e323b',7);line([[-3,-18],[3,-9],[-3,-1],[6,8],[0,23]],'#cb6b58',3.2);line([[-2,-16],[4,-9],[-2,0],[7,8]],'#f1bd78',1.1);
 line([[-1,-1],[-13,5],[-17,14]],'#d18a66',1.4);line([[5,8],[16,10],[20,17]],'#c16d5c',1.6);
 bossStone(0,-35,45,35,'#6c766c','#b4b9a0');bossStone(-12,-54,25,13,'#67736a','#b4b99e');bossStone(13,-50,23,16,'#5c695f','#9da88f');
 catShape('M-21 -41-3 -39 0 -34 4 -39 23 -42 20 -31 4 -30-2 -27-18 -30Z','#34423c',null);
 for(let s of [-1,1]){sharpEye(s*10,-33,s);bossStone(s*12,-43,23,9,'#4f5e54','#a4ac91');}
 catShape('M-6 -30 4 -31 7 -19-3 -18Z','#89917c','#3e4e42',1);catShape('M-13 -17 0 -14 14 -19 10 -9-9 -8Z','#293a33','#8a947b',.8);
 for(let x of [-7,0,7])line([[x,-14],[x,-10]],'#b9b69b',1.2);
 // Rusted quarry plate and chain provide location-specific detail.
 catShape('M20 -11 37 -7 33 13 19 7Z','#82704e','#393e36',1.2);line([[23,-6],[31,-3]],'#d3b476',1.8);for(let y of [-6,5])ellipse(22,y,1.1,1.1,'#d7c39b');
 for(let i=0;i<6;i++){ctx.save();ctx.translate(-32+i*7,13+Math.sin(i*.6)*4);ctx.rotate(i%2?.5:-.4);ctx.strokeStyle='#a19272';ctx.lineWidth=1.8;ctx.beginPath();ctx.ellipse(0,0,4,2.6,0,0,TAU);ctx.stroke();ctx.restore();}
 for(let [x,y]of [[-38,-35],[-12,-55],[21,-21],[25,30]]){ellipse(x,y,7,3,'#465d41');bossLeaf(x,y,5,-.5,'#788759');bossLeaf(x+5,y-1,4,.65,'#8f9b67');}
 ctx.restore();
}
function proposalBramble(e){
 let wind=e.monsterState==='warning',strike=e.monsterState==='attack';ctx.save();ctx.scale(1.55,1.55);ctx.translate(0,wind?5:0);
 // Four planted root paws, low shoulders and a huge bark-covered muzzle.
 line([[33,10],[54,0],[61,-18],[54,-29]],'#554f37',9);line([[34,8],[53,-2],[58,-18]],'#a39360',2);bossLeaf(56,-22,9,.6,'#71824d');
 for(let [x,y,far]of [[-24,27,true],[27,25,true],[-33,34,false],[28,35,false]]){
  catShape(`M${x-8} ${y-19}L${x+8} ${y-16}L${x+6} ${y}L${x+13} ${y+8}L${x+7} ${y+12}L${x-14} ${y+9}L${x-10} ${y+2}Z`,far?'#494d35':'#746b42','#293c2c',1.4);
  for(let i=0;i<3;i++)catShape(`M${x-11+i*8} ${y+6}L${x-7+i*8} ${y+6}L${x-12+i*8} ${y+13}Z`,'#d3c08c','#596140',.65);
 }
 catShape('M-40 -7Q-29 -32 1 -25Q33 -28 43 -6L37 22 14 32-16 29-40 13Z',bossShade(-12,-12,60,'#7c8250','#354c35'),'#263b2d',1.6);
 for(let [x,y,w,h]of [[-22,-1,18,30],[-2,1,17,36],[17,3,19,32]]){catShape(`M${x-9} ${y-17}L${x+8} ${y-20}L${x+11} ${y+8}L${x} ${y+18}L${x-10} ${y+10}Z`,'#746c43','#3b4b32',1);line([[x-3,y-11],[x+2,y],[x-2,y+10]],'#b3a06a',1);}
 // Thorny hedge mane varies in shape and direction, rather than repeated roots.
 for(let s of [-1,1]){
  catShape(`M${s*18} -27L${s*32} -37L${s*29} -21L${s*43} -21L${s*34} -9L${s*43} 0L${s*28} 5Z`,'#3b5735','#283d2c',1);
  for(let [x,y,a]of [[27,-28,.6],[35,-15,1],[31,0,1.7],[22,15,.9]])bossLeaf(s*x,y,9,s*a,'#73844b');
 }
 let hy=strike?7:0;ctx.save();ctx.translate(-7,hy);
 for(let s of [-1,1]){catShape(`M${s*17} -31L${s*28} -52L${s*34} -33L${s*27} -18Z`,'#605e3e','#2f4430',1.2);catShape(`M${s*22} -32L${s*27} -44L${s*29} -31Z`,'#92905b',null);}
 catShape('M-33 -26-19 -45 0 -39 19 -45 32 -26 26 -2 17 13-14 15-30 0Z',bossShade(-13,-28,54,'#90905b','#415236'),'#263d2b',1.6);
 catShape('M-30 -25-10 -33 0 -27 12 -34 29 -27 22 -13 4 -16-7 -14-23 -12Z','#3a4b31',null);
 sharpEye(-14,-19,-1,'#d5b862');sharpEye(14,-19,1,'#d5b862');
 for(let s of [-1,1])line([[s*6,-29],[s*25,-34]],'#b3aa73',3);
 catShape('M-20 -8-7 -16 9 -15 23 -5 19 9 6 15-13 12-24 2Z','#a69d68','#435232',1.3);
 catShape('M-8 -10 8 -11 12 -5 1 1-10 -4Z','#343f2b','#777c4f',.9);
 catShape('M-18 4Q0 13 20 1L14 15-12 18Z','#293529','#73794b',.9);
 for(let x of [-14,-5,5,15])catShape(`M${x-2} 5L${x+3} 5L${x} ${x===-14||x===15?17:11}Z`,'#e6ce93','#7a7c4d',.5);
 line([[-24,-4],[-27,4],[-20,11]],'#8c5e88',2.1);line([[25,-12],[19,-5],[23,1]],'#ae78a3',1.8);
 bossLeaf(-6,-44,10,-.7,'#a4a46b');bossLeaf(5,-43,8,.55,'#667e44');ctx.restore();ctx.restore();
}
function proposalOwl(e){
 let wind=e.monsterState==='warning',strike=e.monsterState==='attack';ctx.save();ctx.scale(1.7,1.7);
 for(let s of [-1,1]){ctx.save();ctx.translate(s*19,-7);ctx.rotate(s*(wind?-.45:strike?-.7:.05));
  catShape(`M0 -20Q${s*29} -48 ${s*62} -39L${s*71} -28 ${s*57} -24 ${s*67} -14 ${s*52} -10 ${s*59} 2 ${s*45} 1 ${s*49} 17 ${s*35} 13 ${s*36} 29 ${s*22} 21 0 15Z`,bossShade(s*17,-25,65,'#897762','#343c40'),'#243332',1.5);
  for(let i=0;i<6;i++){let x=s*(10+i*8),y=-7-i*4;catShape(`M${x} ${y-18}Q${x+s*13} ${y-16} ${x+s*8} ${y+9}L${x} ${y+18}L${x-s*5} ${y+7}Z`,i%2?'#8a785d':'#695e50','#3d4438',.9);line([[x,y-13],[x+s*3,y+8]],'#c6b48a',.8);catShape(`M${x-s*3} ${y+5}L${x+s*6} ${y+2}L${x+s*4} ${y+10}L${x} ${y+16}Z`,'#3e4540',null);}
  ctx.restore();}
 catShape('M-25 -7Q0 -30 25 -7L22 28 10 44-10 44-24 25Z','#675d4b','#303c32',1.3);
 catShape('M-18 -1Q0 -13 18 -1L15 29 0 40-15 28Z','#c0ab81','#776e51',1);
 for(let y=1;y<33;y+=8)for(let x of [-8,1,10])catShape(`M${x-3} ${y}L${x} ${y+5}L${x+3} ${y-1}L${x} ${y+1}Z`,'#786f5366',null);
 for(let s of [-1,1]){line([[s*10,34],[s*16,44]],'#9b7945',5);for(let i=-1;i<2;i++)catShape(`M${s*16+i*4} 41Q${s*16+i*4+4} 42 ${s*16+i*4+3} 50L${s*16+i*4} 47Z`,'#c9ab69','#3e4733',.8);}
 // Barn-owl heart disc, deep sockets and a long hooked beak.
 for(let s of [-1,1])catShape(`M${s*7} -31L${s*19} -56L${s*26} -36L${s*30} -27Z`,'#6d6252','#303e35',1.2);
 catShape('M-32 -29Q-30 -51-12 -49L0 -43Q12 -52 27 -44L33 -25Q30 -5 0 9Q-29 -4-32 -29Z','#8d7d62','#303b31',1.5);
 catShape('M0 -33Q-10 -49-25 -38Q-36 -18-15 -5L0 4 14 -6Q36 -20 24 -38Q11 -49 0 -33Z','#d8c9a3','#5b6250',1.5);
 for(let s of [-1,1]){catShape(`M${s*4} -30Q${s*22} -42 ${s*26} -25L${s*18} -11 ${s*5} -16Z`,'#555b4b','#9d9d79',.9);wildOval(s*14,-24,6,7,'#c58c3e','#e9ba62');ellipse(s*14,-23,2.6,5.5,'#172b28');ellipse(s*14-1,-23.5,.7,.8,'#fff0bc');catShape(`M${s*4} -34L${s*26} -39L${s*24} -29L${s*6} -22Z`,'#514b3d','#94856a',.8);}
 catShape('M-4 -19Q3 -23 6 -15L5 -5 0 1-1 -10Z','#b08a46','#514c34',1);line([[1,-17],[2,-8]],'#f0d295',1);
 line([[21,-38],[17,-29],[21,-19]],'#8e697f',1.7);for(let s of [-1,1])for(let i=0;i<5;i++)line([[s*(24-i),-31+i*5],[s*(27-i),-28+i*5]],'#f0dfb077',.7);
 ctx.restore();
}
const BOSS_PROPOSALS={sankeys:proposalUmbrella,quarry:proposalGolem,park:proposalBramble,chasewater:proposalOwl};
