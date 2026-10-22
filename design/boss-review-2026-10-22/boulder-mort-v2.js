// Original native Canvas design candidate: compact limbs, individually drawn rock masses.
function proposalGolem(e){
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
