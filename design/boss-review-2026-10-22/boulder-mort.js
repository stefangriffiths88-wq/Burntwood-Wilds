// Preview-only native Canvas renderer. Reference-guided proportions; original drawing.
function proposalGolem(e){
 const wind=e.monsterState==='warning',strike=e.monsterState==='attack';
 ctx.save();ctx.scale(1.65,1.65);ctx.translate(0,strike?5:0);
 // Dark gaps between independently shaped stone masses.
 catShape('M-28 -49 24 -50 35 -19 25 22 18 36-22 36-31 12-38 -18Z','#35443b','#293a32',1.4);
 // Substantial separated legs, knees, ankles and flat planted feet.
 for(const s of [-1,1]){
  rubbleBoulder(s*17,31,25,33,'#7b8172','#acb29b',s*.10);
  rubbleBoulder(s*18,48,24,24,'#727b6c','#b0b69f',s*-.09);
  rubbleBoulder(s*18,64,23,27,'#747b6d','#aab299',s*.07);
  rubbleBoulder(s*20+2,77,30,17,'#6e7768','#a8ad95',s*.04);
  catShape(`M${s*20-9} 72L${s*20+6} 70L${s*20+10} 76L${s*20-10} 78Z`,'#b4b8a033',null);
 }
 // Barrel chest built of a few large irregular slabs, not a round belly.
 rubbleBoulder(-17,-18,35,40,'#7d8675','#b9bfaa',-.10);
 rubbleBoulder(16,-19,34,39,'#727e6d','#adb8a0',.13);
 rubbleBoulder(-13,10,27,20,'#6b7967','#a0ae93',.07);
 rubbleBoulder(13,10,29,22,'#78836e','#b0b69c',-.1);
 rubbleBoulder(0,25,33,14,'#647360','#98a58b',.04);
 // Broad rounded shoulder boulders surround the small recessed head.
 rubbleBoulder(-31,-40,32,33,'#7b8572','#b6bca5',-.34);
 rubbleBoulder(32,-39,34,35,'#727e6b','#b0b99e',.31);
 rubbleBoulder(-15,-52,23,20,'#7e8873','#b8bfa6',-.3);
 rubbleBoulder(17,-51,24,21,'#73806b','#b0b99e',.24);
 // Small heavy stone face embedded below the shoulders, with no toothy grin.
 rubbleBoulder(0,-46,27,32,'#818b76','#b5bea6',-.05);
 catShape('M-11 -51-3 -53 0 -50-3 -47-11 -47Z','#34473a',null);
 catShape('M2 -50 10 -52 12 -48 4 -46Z','#34473a',null);
 ellipse(-6,-49,1.8,1.2,'#dfbd70');ellipse(7,-49,1.7,1.2,'#d8b065');
 catShape('M-2 -47 3 -47 5 -39-3 -39Z','#99a28b','#60745d',.6);
 line([[-7,-35],[0,-36],[7,-35]],'#3d4f3e',1.4);
 line([[-8,-57],[-3,-60],[5,-57]],'#d4d2b755',1);
 // Arms hang well below the waist, in three readable rock segments.
 for(const s of [-1,1]){
  ctx.save();ctx.translate(s*36,-26);ctx.rotate(s*(wind?-.58:strike?.10:.08));
  rubbleBoulder(s*6,9,26,33,'#74806e','#abb79d',s*.12);
  rubbleBoulder(s*13,31,27,28,'#697762','#a4b094',s*-.15);
  rubbleBoulder(s*15,49,29,30,'#74806b','#aab59a',s*.08);
  // Squared knuckles and low-hanging stone fingers, without oversized round fists.
  for(let i=0;i<3;i++)rubbleBoulder(s*15-9+i*9,64+(i===1?2:0),8.5,16,'#69765f','#a0ae90',-.03+i*.04);
  rubbleBoulder(s*15-s*16,48,10,18,'#77836c','#b5bda1',s*-.3);
  ctx.restore();
 }
 // Sparse roots and moss tie the body together without covering the silhouette.
 line([[-26,-35],[-11,-30],[-4,-17],[-7,-2],[2,12],[-3,24]],'#56563b',2.3);
 line([[-26,-36],[-11,-31],[-3,-18]],'#a59b68',.8);
 line([[27,-34],[16,-21],[21,-9],[13,5]],'#5c6141',1.8);
 line([[-3,27],[-16,38],[-14,53]],'#686945',1.7);
 for(const [x,y]of [[-25,-50],[24,-45],[-19,0],[19,44]]){
  ellipse(x,y,4,1.9,'#526b44');ellipse(x-1,y-.7,2.4,1.1,'#82945b');
 }
 ctx.restore();
}
