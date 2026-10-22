// Approved native boss designs, 22 October 2026; presentation only.
function bossShade(x,y,r,inside,outside){let g=ctx.createRadialGradient(x,y,1,x,y,r);g.addColorStop(0,inside);g.addColorStop(1,outside);return g;}
function sharpEye(x,y,s,color='#efae60'){
 catShape(`M${x-s*6} ${y-3}L${x+s*6} ${y-6}L${x+s*4} ${y+2}L${x-s*4} ${y+3}Z`,'#1c2529',null);
 ellipse(x,y,3.4,2.2,color);ellipse(x+s*.6,y,1.1,2.1,'#281e29');ellipse(x-1,y-.7,.7,.7,'#fff0bd');
}
function drawApprovedUmbrella(e){
 let wind=e.monsterState==='warning',strike=e.monsterState==='attack';ctx.save();ctx.scale(1.7,1.7);ctx.rotate(strike?-.13:wind?.06:-.06);
 // Thin legs and narrow slouch; oversized shirt hangs loose over the trousers.
 for(let s of [-1,1]){catShape(`M${s*2} 13L${s*7} 13L${s*10} 40L${s*4} 41Z`,'#434741','#293b32',.9);wildOval(s*8+3,42,7.5,3,'#2d3530','#727869');}
 catShape('M-8 -25Q-1 -34 7 -27L11 -5 10 17 4 14 1 20-5 16-12 19-12 -6Z',bossShade(-5,-16,43,'#ccc4a5','#999b82'),'#485344',1.2);
 // Open collar, crooked placket, frayed hem and obvious dirt patches.
 catShape('M-6 -27 0 -18 6 -28 3 -13-2 -11Z','#8e7d61','#6c6c55',.6);
 catShape('M-7 -28-1 -29-1 -19-5 -17Z','#dcd4b7','#7a8068',.5);catShape('M2 -28 7 -28 8 -19 3 -20Z','#dbd3b3','#7a8068',.5);
 line([[1,-13],[3,15]],'#7b806a',.8);for(let y of [-8,0,8])ellipse(4,y,.8,.8,'#ddd5b4');
 for(let [x,y,rx,ry]of [[-6,1,3,6],[7,11,3,3],[-7,-14,2,3],[0,15,3,1.8]])ellipse(x,y,rx,ry,'#82795188');
 line([[-9,-5],[-4,-2],[-7,4]],'#8b896b',.7);line([[5,-5],[9,-1],[6,3]],'#e1d7b655',.8);
 for(let [x,y]of [[-10,18],[-4,17],[2,18],[8,17]])line([[x,y],[x-1,y+3]],'#dbd3ad',.6);
 // Thin sleeves, small bony hands, no coat or broad chest.
 line([[-9,-20],[-18,-7],[-18,6]],'#9da38a',4.6);line([[-9,-20],[-16,-8]],'#d3caab',1.2);line([[-18,0],[-18,8]],'#b49d7b',3);wildOval(-18,9,2.6,4,'#ad9373','#dac09a');
 catShape('M-21 13-16 12-13 18Q-3 38-20 41Q-37 40-30 25L-23 19Z','#3b4140','#8f9987',.8);line([[-23,18],[-16,17]],'#beb38e',1.1);line([[-24,25],[-26,34]],'#71776b',.8);
 // Gaunt face with scruffy hair, long nose, unshaven jaw and a dirty cheek.
 wildOval(-1,-42,8.6,15,'#aa9272','#d4b996');catShape('M4 -44 14 -34 6 -31 2 -33Z','#bea07f','#655543',.7);
 catShape('M-9 -43-11 -50-6 -49-4 -59 1 -55 6 -57 10 -48 8 -41 2 -46-5 -40Z','#655b47','#3b4234',.7);
 line([[-6,-44],[3,-45]],'#4f4535',1.7);sharpEye(-1,-41,1,'#bca36d');line([[-4,-29],[5,-29]],'#6b5942',1);
 ellipse(-6,-35,2.2,3,'#82715166');for(let i=0;i<7;i++)line([[-7+i*1.5,-31+(i%2)*2],[-6.4+i*1.5,-28+(i%2)]],'#746246',.7);
 let ux=strike?31:33,uy=strike?-7:wind?-28:-18;
 line([[8,-22],[19,-15],[ux,uy]],'#a2a88d',4.5);line([[9,-23],[19,-17]],'#dad0ae',1);line([[21,-15],[ux,uy]],'#baa17d',2.7);wildOval(ux,uy,2.8,4,'#b19775','#e0c39a');
 ctx.save();ctx.translate(ux,uy);ctx.rotate(strike?.65:-.12);
 line([[0,14],[0,-49]],'#41493f',3);line([[-.6,13],[-.6,-48]],'#c8bd9d',.9);
 if(!strike){
  catShape('M-43 -31Q-20 -63 0 -64Q24 -63 43 -31L35 -27 23 -31 12 -25 0 -30-12 -25-24 -31-35 -27Z','#303d4b','#b6b6a0',1.1);
  for(let [d,c]of [['M-43 -31Q-25 -57 0 -64Q-18 -49-24 -31Z','#52616b'],['M-24 -31Q-15 -54 0 -64L0 -30-12 -25Z','#3f505b'],['M0 -64Q21 -50 23 -31L12 -25 0 -30Z','#53626c']])catShape(d,c,null);
  for(let x of [-43,-24,0,23,43])line([[0,-64],[x,-31]],'#b3bba077',.75);
  catShape('M-33 -41-24 -47-21 -39-29 -34Z','#8a8870','#bfb491',.6);line([[15,-48],[21,-44],[17,-38]],'#bec7ac',1);line([[0,-67],[0,-63]],'#c8c3ab',1.5);
 }else{catShape('M-7 -47 0 -70 8 -45 4 -8-4 -8Z','#41525f','#acb3a1',1.2);line([[0,-66],[0,-11]],'#b5bba3',1);}
 line([[0,14],[-2,20],[-7,20],[-9,16]],'#b9b69c',2.4);ctx.restore();ctx.restore();
}
// Original native Canvas design candidate: compact limbs, individually drawn rock masses.
function drawBoulderMort(e){
 const wind=e.monsterState==='warning',strike=e.monsterState==='attack';
 ctx.save();ctx.scale(1.65,1.65);ctx.translate(0,strike?5:0);
 const stone=(d,light='#aab398',base='#77846e')=>catShape(d,bossShade(-22,-45,108,light,base),'#34483b',1.4);
 // Short planted legs: one irregular mass per leg with broad integral feet.
 stone('M-28 15-7 18-6 36-9 43-6 52-12 57-36 56-39 48-32 39-35 28Z','#aeb49a','#6f7d66');
 catShape('M-34 44-20 42-10 48-12 54-35 53Z','#a4ad8e','#53684f',.7);
 stone('M6 17 28 13 34 27 29 40 37 47 36 55 12 57 7 50 10 36Z','#b7bba0','#76816a');
 catShape('M11 43 26 42 34 49 33 53 12 54Z','#bbc0a133',null);
 line([[-27,25],[-23,33],[-28,39]],'#445c45',1.2);
 line([[20,26],[24,32],[20,38]],'#53674b',1);
 // One broad uneven trunk, two large chest faces and one broken lower ledge.
 stone('M-34 -43-15 -50 10 -48 32 -38 38 -12 29 17 17 29-20 27-32 12-39 -12Z','#a9b69a','#64765e');
 stone('M-33 -33-19 -42-3 -34 0 -12-8 1-27 -2-35 -15Z','#bac2a5','#7c8b71');
 stone('M5 -35 23 -40 34 -25 30 -7 14 0 1 -10Z','#b0b99b','#708067');
 catShape('M-25 6-8 3 5 8 23 4 25 16 13 25-12 24-28 16Z','#879478','#3d5540',1.2);
 line([[-8,5],[-3,12],[-8,21]],'#485d42',1.4);
 // Broad asymmetrical shoulders, no stack of identical pebble segments.
 stone('M-12 -44-24 -58-40 -55-48 -42-44 -24-28 -23-17 -31Z','#b5bda2','#74836b');
 catShape('M-39 -51-25 -53-19 -45-31 -39-42 -40Z','#c4c8ad44',null);
 stone('M12 -44 23 -55 39 -50 49 -36 42 -22 24 -24 15 -31Z','#aab79a','#6b7e65');
 // Small head recessed between the shoulders.
 stone('M-12 -58 2 -62 14 -54 12 -39 6 -32-7 -34-15 -45Z','#b2bba0','#7b8870');
 catShape('M-12 -50-3 -52 0 -48-4 -45-11 -46Z','#304735',null);
 catShape('M2 -48 11 -51 12 -46 5 -44Z','#304735',null);
 ellipse(-6,-48,1.8,1.1,'#ddbc72');ellipse(7,-47,1.7,1.1,'#d6b368');
 catShape('M-2 -46 3 -46 4 -39-3 -39Z','#9eaa8c','#607858',.6);
 line([[-7,-36],[0,-37],[7,-35]],'#40533c',1.2);
 // Short arms: distinct solid upper arms and angular fists with incised fingers.
 ctx.save();ctx.translate(-36,-24);ctx.rotate(wind?.65:strike?-.13:0);
 stone('M-6 -8-18 -3-23 12-18 22-3 20 5 9 3 -2Z','#b2bea0','#718269');
 stone('M-20 18-6 15 4 25 2 39-8 44-27 38-30 26Z','#b8c0a4','#78886e');
 line([[-24,28],[-19,31],[-18,38]],'#435e43',1.1);
 line([[-14,27],[-10,31],[-9,40]],'#435e43',1.1);
 line([[-4,27],[0,31],[-1,36]],'#435e43',1.1);
 ctx.restore();
 ctx.save();ctx.translate(35,-23);ctx.rotate(wind?-.5:strike?.18:0);
 stone('M1 -6 15 -9 24 5 20 19 7 23-3 12Z','#a7b597','#657b61');
 stone('M9 18 23 17 31 27 26 40 14 44 1 37 0 25Z','#aab89a','#708168');
 line([[9,27],[11,33],[9,39]],'#435b42',1.1);
 line([[19,26],[21,31],[19,41]],'#435b42',1.1);
 line([[26,28],[28,32],[25,37]],'#435b42',1.1);
 ctx.restore();
 // Few deliberate fractures and roots; no repeated dotted texture.
 line([[-29,-31],[-22,-26],[-26,-17]],'#4b6248',1.1);
 line([[22,-30],[17,-24],[23,-18]],'#455d43',1);
 line([[-24,-43],[-12,-30],[-7,-16],[-10,-3],[0,9]],'#686744',2.1);
 line([[29,-38],[21,-25],[25,-11],[18,2]],'#666945',1.7);
 ellipse(-29,-49,4,1.7,'#71874e');ellipse(26,-44,3,1.4,'#7d8c55');
 ctx.restore();
}
function drawApprovedOwl(e){
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
