// Approved option2 Wild Form: a four-legged lynx, separate from Immy's upright body.
// Rendering only: no collision, damage, movement speed or timers change here.
function drawImmyLynx(x,y,phase=0,visual={}){
 ctx.save();ctx.translate(x,y);
 let dir=visual.dir||{x:0,y:1},back=dir.y<-.5,swipe=visual.cast?Math.sin(clamp(visual.cast/.26,0,1)*Math.PI):0;
 let facing=swipe?Math.cos(visual.aim||0):dir.x,flip=facing<-.15?-1:1,pace=clamp(visual.moving||0,0,1),stride=phase*4.6;
 ctx.scale(flip,1);if(visual.dead){ctx.translate(0,16);ctx.rotate(1.35);}
 let bob=Math.sin(stride*2)*pace*2;ctx.translate(0,bob);
 ellipse(-8,37,69,11,'#15382944');
 // Long bushy tail, cream tip and a serrated coat edge.
 let sway=Math.sin(phase*.7)*5;
 ctx.strokeStyle='#414b43';ctx.lineWidth=25;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(-44,4);ctx.bezierCurveTo(-72,4,-85,-12+sway,-78,-30+sway);ctx.stroke();
 ctx.strokeStyle='#777b76';ctx.lineWidth=22;ctx.stroke();line([[-78,-30+sway],[-80,-23+sway]],'#e8dfc6',20);
 catShape(`M-55 9L-66 8L-63 3L-74 -1L-68 -4L-80 -13L-72 -12L-83 -23L-75 -20L-72 -6L-60 0Z`,'#777b76','#414b43');
 function leg(ax,far,offset,front){
  let step=Math.sin(stride+offset)*pace*9,lift=Math.max(0,Math.cos(stride+offset))*pace*6,attack=front&&!far?swipe:0;
  let fx=ax+step+attack*22,fy=(far?26:37)-lift-attack*24,ink='#414b43',fur=far?'#626b65':'#858b82';
  catShape(`M${ax-8} 9Q${ax-11} 20 ${fx-7} ${fy-6}L${fx-9} ${fy+1}Q${fx+1} ${fy+6} ${fx+12} ${fy+1}L${fx+9} ${fy-6}Q${ax+7} 20 ${ax+8} 9Z`,fur,ink,1.1);
  catOval(fx+2,fy,far?8:10,far?4.5:6,far?'#c0bba5':'#ede2c7',ink);for(let n of [-3,2,7])line([[fx+n,fy],[fx+n,fy+3]],'#9c9b83',.75);
  if(attack)for(let n of [-4,1,6])line([[fx+7,fy+n*.4],[fx+13,fy-2+n*.4]],'#faf1d2',1.5);
 }
 // Far hind and far foreleg are attached behind the torso; two near legs draw below it.
 leg(-23,true,Math.PI,false);leg(8,true,0,true);
 catShape('M-49 0Q-44 -17 -22 -17Q-4 -20 18 -15Q35 -12 35 7Q27 25 5 23L-28 23Q-50 22 -49 0Z','#7d827b','#414b43',1.2);
 ellipse(-32,2,20,19,'#747c74');ellipse(-10,-9,30,8,'#989b8e');ellipse(16,3,20,23,'#858980');catShape('M-40 11Q-17 24 12 16L7 23L-28 23Z','#626e64',null);line([[-35,-9],[-25,-12],[-10,-12]],'#afb09e',2);line([[-41,7],[-36,13],[-30,14]],'#626d60',2);
 // Subtle lynx markings remain readable without noisy fur texture.
 for(let q of [[-35,-5],[-25,4],[-13,-7],[-3,8],[8,-7],[-37,13],[-14,15]])catOval(q[0],q[1],3,1.6,'#59675b',null);
 leg(-42,false,0,false);leg(29,false,Math.PI,true);
 // Neck/chest ruff joins the head to the horizontal body, not a floating torso.
 catShape('M9 -19L15 -28L23 -24L29 -31L36 -21L43 -18L37 -8L41 1L33 0L30 15L23 10L19 23L14 14L8 19L9 6L2 8L7 -5L2 -10Z','#bcb499','#555a49',1);
 catShape('M12 -4L20 1L29 -1L30 10L25 8L20 18L17 9L11 13Z','#ece2c9',null);
 line([[12,-7],[23,-3],[36,-9]],'#a83c3c',4);catOval(23,-4,2.3,2.6,'#d4ad63');
 ctx.save();ctx.translate(30,-12);
 // Broad feline head, tufted lynx ears, cream cheek fur and familiar glasses.
 for(let s of [-1,1]){
  catShape(`M${s*6} -22L${s*17} -44L${s*21} -18Z`,'#7b8179','#414b43',1.1);
  catShape(`M${s*10} -25L${s*16} -36L${s*17} -22Z`,'#cfaaa0',null);
  line([[s*17,-41],[s*20,-49]],'#414b43',2);line([[s*17,-42],[s*15,-48]],'#414b43',1.5);
 }
 catShape('M-20 -21Q0 -38 20 -21L24 -9L19 -10L24 -2L17 -3L16 5Q0 16 -16 5L-17 -3L-24 -2L-19 -10L-24 -9Z','#81867d','#414b43',1.2);
 if(back){catShape('M-19 -25Q0 -37 19 -25L21 -10L14 -13L17 -3L8 -7L5 0L-4 -6L-14 -1L-13 -12L-21 -8Z','#946c40');line([[-12,-17],[0,-10],[12,-17]],'#c29c5e',3);}
 else{
  catShape('M-19 -7L-12 -10Q0 -3 12 -10L19 -7L15 4Q0 13 -15 4Z','#eee0bd',null);
  for(let s of [-1,1]){catOval(s*8,-14,5.2,6,'#f5edcf');ellipse(s*8,-13.5,3.2,4.4,'#8e9b54');ellipse(s*8,-13.5,1.35,3.6,'#253a2d');ellipse(s*8-1,-15.5,1.1,1.2,'#fff');line([[s*4,-23],[s*15,-22]],'#4c5141',1.7);}
  ellipse(0,-4,2.4,1.7,'#bd8c80');line([[0,-2],[0,0],[-3,2]],'#555647',1);line([[0,0],[3,2]],'#555647',1);
  for(let s of [-1,1]){ctx.strokeStyle='#4d5147';ctx.lineWidth=3.6;ctx.beginPath();ctx.ellipse(s*8,-14,9.2,8.7,0,0,TAU);ctx.stroke();ctx.strokeStyle='#f3d4c7';ctx.lineWidth=2.2;ctx.stroke();line([[s*16,-17],[s*20,-19]],'#f3d4c7',2.1);line([[s*11,-2],[s*23,-4]],'#d8d3b8',.8);line([[s*12,1],[s*23,3]],'#d8d3b8',.8);}
  line([[-1,-15],[1,-15]],'#f3d4c7',2.2);
  catShape('M-19 -25L-10 -31L-5 -29L1 -36L6 -30L14 -32L12 -25L20 -23L10 -19L6 -23L2 -17L-2 -25L-12 -18L-10 -25Z','#a07845','#5f614c',.8);
  line([[-7,-28],[-2,-29],[2,-26]],'#d0aa68',1.6);
 }
 ctx.restore();ctx.restore();
}
