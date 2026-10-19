// Shared drawing primitives only. Character modules own outfits and silhouettes.
// Numbers are world units; no combat state, collision or stats are changed here.
function catShape(path,color,ink='#33413c',width=.85){let shape=new Path2D(path);ctx.fillStyle=color;ctx.fill(shape);if(ink){ctx.strokeStyle=ink;ctx.lineWidth=width;ctx.stroke(shape);}}
function catOval(x,y,rx,ry,color,ink='#33413c'){ellipse(x,y,rx,ry,color);if(ink){ctx.strokeStyle=ink;ctx.lineWidth=.8;ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,TAU);ctx.stroke();}}
function catTail(fur,tip,width=6){ctx.lineWidth=width;ctx.strokeStyle=fur;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(9,12);ctx.bezierCurveTo(29,28,38,4+Math.sin(performance.now()/900)*3,26,Math.sin(performance.now()/900)*3);ctx.stroke();line([[26,0],[25,3]],tip,width-1);}
function catFace({fur,cream,eye,ink='#5a5548',wide=16,back=false}){
 for(let s of [-1,1]){catShape(`M ${s*5} -25 L ${s*13} -36 Q ${s*18} -29 ${s*15} -18 Z`,fur,ink);catShape(`M ${s*9} -26 L ${s*12} -31 L ${s*13} -22 Z`,'#d9a0a1',null);}
 catOval(0,-15,wide,15,fur,ink);ellipse(-4,-20,wide*.65,6,'#ffffff13');
 if(back){line([[-8,-22],[0,-25],[8,-22]],cream,2);return;}
 ellipse(0,-7,wide*.66,6,cream);let blink=performance.now()%4300>4140,hurtFace=!!(p&&p.inv>0&&hitFlash>0);for(let s of [-1,1]){if(blink||hurtFace){line([[s*6-3,-15],[s*6,-14],[s*6+3,-15]],ink,1.4);continue;}catOval(s*6,-15,3.8,4.7,'#fff5df',ink);ellipse(s*6,-14.8,2.3,3.6,eye);ellipse(s*6,-14.6,1,2.7,'#23372d');ellipse(s*6-1,-16.6,.9,1.1,'#fff');line([[s*3,-22],[s*10,-23]],ink,1.2);line([[s*(wide-1),-11],[s*(wide-4),-9]],ink,.8);}
 ellipse(0,-7,1.8,1.2,'#c58c8c');line([[0,-6],[0,-4],[-2,-3]],ink,.8);line([[0,-4],[3,-3]],ink,.8);for(let s of [-1,1])ellipse(s*10,-7,2.4,1,'#d58f8a44');
}
function catPaw(x,y,size,fur,pad='#cf9da8',angle=0){ctx.save();ctx.translate(x,y);ctx.rotate(angle);catOval(0,0,size,size*1.05,fur);ellipse(0,1,size*.43,size*.38,pad);for(let n of [-1,0,1])ellipse(n*size*.4,-size*.38,size*.16,size*.2,pad);ctx.restore();}
function catVisualScale(x,y,sx,sy,draw){ctx.save();try{ctx.translate(x,y);ctx.scale(sx,sy);ctx.translate(-x,-y);draw();}finally{ctx.restore();}}
