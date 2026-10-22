// Revision two: skinny Umbrella Man, comic Rubble Trouble, cursed husky Loki.
// Preview-only renderers; no production registration or gameplay mutation.
function proposalUmbrella(e){
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
function rubbleBoulder(x,y,w,h,base='#777c70',light='#babba3',tilt=0){
 ctx.save();ctx.translate(x,y);ctx.rotate(tilt);let g=ctx.createLinearGradient(-w*.4,-h*.4,w*.5,h*.5);g.addColorStop(0,light);g.addColorStop(.4,base);g.addColorStop(1,'#48564b');
 catShape(`M${-w*.47} ${-h*.18}Q${-w*.5} ${-h*.48} ${-w*.14} ${-h*.5}L${w*.25} ${-h*.45}Q${w*.55} ${-h*.3} ${w*.48} ${h*.13}L${w*.28} ${h*.45}Q${-w*.02} ${h*.6} ${-w*.37} ${h*.34}Z`,g,'#34463b',1.3);
 catShape(`M${-w*.44} ${-h*.2}Q${-w*.41} ${-h*.46} ${-w*.12} ${-h*.46}L${w*.25} ${-h*.4}L${w*.1} ${-h*.19}L${-w*.22} ${-h*.06}Z`,'#e5dec332',null);
 line([[-w*.28,-h*.1],[-w*.04,h*.05],[-w*.13,h*.29]],'#3e5144',.9);
 for(let i=0;i<7;i++)ellipse(-w*.28+(i*7%Math.max(1,w*.6)),-h*.2+(i*13%Math.max(1,h*.55)),.65,.7,'#dfd6b766');ctx.restore();
}
function proposalGolem(e){
 let wind=e.monsterState==='warning',strike=e.monsterState==='attack';ctx.save();ctx.scale(1.65,1.65);ctx.translate(0,strike?7:0);
 // A hunchbacked heap of jagged quarry stone, with the face in the main rock.
 // No separate little head, button nose, ears or leaf hair from the old design.
 let fy=wind?-27:strike?37:20;
 rubbleBoulder(-18,41,34,25,'#797a70','#b5b4a1',-.16);rubbleBoulder(24,42,38,27,'#6f756b','#b5b7a4',.17);
 catShape('M-32 -15-23 -35 4 -40 30 -25 38 5 26 32 4 40-24 32-37 13Z',bossShade(-15,-20,73,'#a5a390','#5a6158'),'#323f38',1.7);
 rubbleBoulder(-35,-25,43,41,'#777d71','#c3c1ab',-.36);rubbleBoulder(31,-9,36,39,'#727a70','#b6bba8',.3);
 catShape('M-45 -39-40 -58-27 -51-18 -66 1 -51 15 -48 13 -24-9 -18-33 -21Z','#747d70','#35463a',1.3);
 catShape('M-39 -40-38 -52-28 -46-18 -59-2 -47-8 -37Z','#b6b9a1',null);
 // Three broad slabs interlock at the belly instead of forming a smooth chest.
 for(let [x,y,w,h,a]of [[-14,18,32,25,-.13],[14,12,30,27,.16],[6,32,27,16,-.2]])rubbleBoulder(x,y,w,h,'#7e8373','#aeb39b',a);
 line([[-7,-12],[-1,-3],[-9,5],[-1,14],[3,29]],'#4c4a3c',5);line([[-7,-12],[-1,-3],[-9,5],[-1,14],[3,29]],'#c79a68',1.5);
 // One massive broken-stone fist, one smaller fist; sparse big facets read on a phone.
 rubbleBoulder(-48,fy,51,46,'#7c8174','#bdbfac',-.2);rubbleBoulder(47,23,36,40,'#777f73','#b2b9a5',.3);
 for(let [x,y,w]of [[-63,fy+15,15],[-49,fy+18,16],[-35,fy+14,13],[38,36,11],[50,37,12],[59,31,10]])rubbleBoulder(x,y,w,17,'#767e70','#bec1aa',-.1);
 // A sloping stone brow shelters uneven amber eyes and a crooked chipped grin.
 catShape('M-28 -35-13 -44 8 -40 23 -31 18 -13-3 -9-25 -17Z','#687466','#34483b',1.4);
 catShape('M-24 -29-11 -34-5 -28-10 -20-22 -21Z','#293f32',null);catShape('M2 -30 16 -31 18 -23 6 -20Z','#293f32',null);
 ellipse(-15,-26,3.7,3.4,'#dfb866');ellipse(10,-25,3.4,2.7,'#d6ac58');ellipse(-14,-26,1.2,2.6,'#253a2e');ellipse(11,-25,1,2.1,'#253a2e');
 catShape('M-30 -36-15 -48-1 -38-5 -30-17 -34-26 -28Z','#939e87','#3d5140',1);
 catShape('M0 -38 20 -40 27 -29 15 -26 4 -30Z','#a1a98f','#3d5140',1);
 catShape('M-22 -10-5 -14 19 -18 18 -5 4 2-14 0Z','#2e4234','#a0ac8f',1.2);
 catShape('M-18 -10-10 -11-11 -4-17 -4Z','#d4c9a1','#879274',.7);catShape('M7 -15 15 -17 13 -10 8 -9Z','#bdc397','#879274',.7);
 line([[-12,-19],[-8,-16],[-11,-13]],'#526a50',1.2);
 // Chips and fractures reinforce a quarry guardian, with humour in the wonky face.
 for(let [x,y]of [[-26,-49],[26,-13],[-49,fy-7],[13,21]]){line([[x-4,y-5],[x,y],[x-3,y+7]],'#455746',1);line([[x+1,y],[x+5,y+1]],'#c2c5ae',.7);}
 ctx.restore();
}
function proposalLoki(e){
 let wind=e.monsterState==='warning',strike=e.monsterState==='attack',freed=e.monsterState==='freed';
 ctx.save();ctx.scale(1.65,1.65);ctx.translate(strike?-8:0,wind?3:0);
 // A broad white brush tail with a feathered silhouette, curled over his back.
 catShape('M31 8C52 17 79 -1 79 -24Q81 -33 77 -38L79 -42Q73 -42 71 -48L67 -46Q63 -53 57 -50L56 -46Q47 -50 42 -44L44 -41Q36 -41 38 -34L44 -33Q43 -27 49 -27L52 -31Q58 -28 63 -32Q68 -20 56 -10Q44 -1 31 -7Z','#faf9ed','#384c44',1.3);
 catShape('M29 7Q48 9 63 -2L59 -8 53 -3 48 -9 40 -7 32 -9Z','#151d20',null);
 ctx.strokeStyle='#bbc2b5';ctx.lineWidth=.75;for(let [x,y]of [[65,-39],[55,-43],[43,-37],[69,-20]]){ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+7,y+5,x+2,y+13);ctx.stroke();}
 for(let [x,y,far]of [[-18,25,true],[31,25,true],[-30,36,false],[25,36,false]]){
  catShape(`M${x-7} ${y-22}Q${x+8} ${y-23} ${x+8} ${y-10}L${x+3} ${y+3}L${x+9} ${y+8}L${x+4} ${y+13}L${x-13} ${y+11}L${x-12} ${y+3}L${x-9} ${y-8}Z`,far?'#11191c':'#222b2f','#253b36',1.1);
  catShape(`M${x-10} ${y}L${x+4} ${y-3}L${x+3} ${y+3}L${x+10} ${y+8}L${x+4} ${y+13}L${x-13} ${y+11}L${x-12} ${y+4}Z`,far?'#d7ddcf':'#f7f8eb','#91a093',.65);
  for(let i=0;i<3;i++)line([[x-7+i*5,y+7],[x-6+i*5,y+11]],'#82958b',.7);
 }
 catShape('M-38 -12Q-26 -33 6 -29Q38 -28 45 -8L40 12 26 26-5 29-30 20-42 5Z',bossShade(-10,-17,61,'#2e373a','#080f12'),'#233831',1.4);
 catShape('M-21 -24Q3 -38 33 -22L40 -7 18 -5-7 -13-28 -8Z','#10181c',null);
 catShape('M-33 -6-20 -13-13 -5-3 -8 0 9 13 21-1 30-24 23-39 6Z','#f4f5e8','#9baa9a',.9);
 for(let [x,y]of [[-23,7],[-13,13],[-28,-1]])line([[x,y],[x+5,y+3],[x+8,y+2]],'#b8c5b655',.8);
 for(let [x,y]of [[8,-16],[20,-13],[30,-6]])line([[x,y],[x+5,y+3],[x+8,y+2]],'#4a555755',.8);
 // Layered white ruff and dark saddle, without bark plates or root limbs.
 catShape('M-34 -24-22 -35-9 -31 1 -18 5 -6-1 -2 3 8-6 6-9 17-15 12-21 22-27 14-36 16-34 5-43 0-39 -10-46 -18Z','#f6f7eb','#9eaf9c',1);
 ctx.save();ctx.translate(-16,strike?2:-9);
 for(let s of [-1,1]){
  catShape(`M${s*9} -25L${s*21} -51Q${s*27} -53 ${s*29} -42L${s*31} -20Z`,'#151f24','#2a3c37',1.2);
  catShape(`M${s*15} -28L${s*22} -44L${s*25} -24Z`,'#c0a99e','#e6d5c3',.65);
 }
 catShape('M-29 -27Q-18 -42 0 -36Q19 -41 29 -26L33 -12 28 0 34 4 24 8 25 15 13 16 0 25-13 18-25 18-24 10-34 4-29 -4-34 -9Z',bossShade(-10,-22,51,'#2e383c','#0b1418'),'#2c423a',1.3);
 // Classic white husky mask: cheek patches join a narrow white forehead blaze.
 catShape('M0 -35 5 -23 4 -10 16 -23 27 -20 26 -4 31 2 22 7 24 13 11 13 0 23-12 16-24 15-23 8-31 3-26 -7-26 -20-16 -23-5 -11-5 -23Z','#faf9ed','#bac9b8',.8);
 catShape('M-28 -26-16 -31-5 -19-10 -12-22 -15Z','#101a1f',null);catShape('M5 -19 16 -31 28 -26 22 -15 10 -12Z','#101a1f',null);
 for(let s of [-1,1]){
  if(freed){line([[s*7,-14],[s*13,-12],[s*19,-16]],'#35505a',1.5);}
  else{catShape(`M${s*6} -16L${s*20} -20L${s*20} -13L${s*13} -8L${s*7} -10Z`,'#29464e',null);ellipse(s*14,-14,3.3,3.2,'#80c9e3');ellipse(s*14,-13.5,1.1,2.6,'#243c48');ellipse(s*14-1,-15,.8,.8,'#eaffee');line([[s*6,-22],[s*22,-26]],'#435f69',2);}
 }
 // A long canine muzzle and broad black dog nose, not a cat face.
 catShape('M-15 -3-8 -10 6 -10 17 -2 13 15 0 24-14 16-19 6Z','#f8f8e9','#9fb39e',1.1);
 catShape('M-9 -6Q0 -10 10 -6L9 0 1 5-8 0Z','#253d43','#708a83',.8);ellipse(-3,-5,3,1,'#6c868a');
 if(freed){catShape('M-10 9Q0 18 11 8L9 18Q0 27-8 18Z','#405047',null);catShape('M-2 15Q6 13 7 20L3 26Q-3 27-3 20Z','#c38282','#825d61',.5);}
 else{catShape('M-14 8Q0 13 13 6L10 18 0 21-11 17Z','#314246','#819c91',.7);for(let x of [-10,8])catShape(`M${x-2} 9L${x+2} 9L${x} 17Z`,'#f5efd9','#a8baaa',.5);line([[0,5],[0,10]],'#6b847c',.8);}
 for(let s of [-1,1])for(let i=0;i<2;i++)line([[s*10,i*3+2],[s*17,i*4+1]],'#8aa49a',.6);
 ctx.restore();
 // The Queen's violet restraint is visibly separate from Loki's natural body.
 ctx.save();ctx.translate(-14,13);ctx.rotate(-.08);
 if(!freed){
  line([[-24,-5],[-10,4],[8,2],[24,-6]],'#44284f',6);line([[-24,-5],[-10,4],[8,2],[24,-6]],'#a470bb',2.1);
  for(let [x,y]of [[-19,-2],[18,-2]])catShape(`M${x-3} ${y}L${x-6} ${y-10}L${x+3} ${y-3}Z`,'#62436d','#b78bc5',.7);
  wildOval(0,6,7,7,'#624371','#c292d2');catShape('M-4 4-5 0-2 2 0 -2 2 2 5 0 4 5Z','#dcb8de',null);
 }else{line([[-22,-5],[-10,3],[9,2],[22,-5]],'#467766',4);wildOval(0,5,4,5,'#b8aa69','#eee1a0');}
 ctx.restore();ctx.restore();
}
