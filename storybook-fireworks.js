/* Eight staged blooms, rendered only during the celebration. */
window.BookFireworks=(()=>{
 let canvas,ctx,raf=0,last=0,clock=0,bursts=[];
 const palette=['#ffc74b','#d68cff','#62e5ff','#ff83b0','#a6ed7a','#ffe68a'];
 function stop(){cancelAnimationFrame(raf);raf=0;canvas?.remove();canvas=null;}
 function start(){stop();if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
 canvas=document.createElement('canvas');canvas.setAttribute('aria-hidden','true');canvas.className='celebration-canvas';document.querySelector('#sparks').append(canvas);ctx=canvas.getContext('2d');if(!ctx){stop();return;}
 clock=0;last=0;const positions=[[.66,.30,.7],[.39,.26,1.35],[.80,.40,2],[.53,.20,2.7],[.24,.36,3.5],[.72,.24,4.3],[.43,.35,4.65],[.57,.22,5.1]];
 bursts=positions.map(([x,y,at],k)=>({x,y,at,color:palette[k%6],particles:Array.from({length:88},(_,i)=>{const ring=i<64,angle=(i/(ring?64:24))*Math.PI*2+(k*.31);return {angle,speed:(ring?1:.48)*(.82+Math.random()*.25),life:2.4+Math.random()*.8,gold:i%5===0};})}));
 raf=requestAnimationFrame(frame);
 }
 function frame(now){raf=requestAnimationFrame(frame);if(!last){last=now;return;}if(now-last<30)return;const dt=Math.min((now-last)/1000,.06);last=now;if(document.hidden||document.querySelector('#book').classList.contains('still'))return;clock+=dt;
 const w=innerWidth,h=innerHeight,dpr=Math.min(devicePixelRatio,1.5);if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);}
 ctx.clearRect(0,0,w,h);ctx.globalCompositeOperation='source-over';ctx.fillStyle='rgba(20,27,65,'+(.22*Math.min(1,clock/.6,Math.max(0,(8.5-clock)/1.5)))+')';ctx.fillRect(0,0,w,h);ctx.globalCompositeOperation='lighter';const radius=Math.min(w*.25,h*.25,190);
 for(const b of bursts){const t=clock-b.at,x=b.x*w,y=b.y*h;
 if(t<0&&t>-.65){const u=1+t/.65,py=y+(1-u)*h*.33;ctx.globalAlpha=.9;ctx.strokeStyle='#ffe5a1';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(x,py+25);ctx.lineTo(x,py);ctx.stroke();ctx.shadowBlur=12;ctx.shadowColor='#ffd479';ctx.fillStyle='#fff4d3';ctx.beginPath();ctx.arc(x,py,3,0,7);ctx.fill();ctx.shadowBlur=0;}
 if(t<0||t>3.3)continue;
 if(t<.5){const g=ctx.createRadialGradient(x,y,0,x,y,45);g.addColorStop(0,'#fff2cd');g.addColorStop(.2,b.color);g.addColorStop(1,'transparent');ctx.globalAlpha=(1-t/.5)*.5;ctx.fillStyle=g;ctx.fillRect(x-45,y-45,90,90);}
 for(const p of b.particles){if(t>p.life)continue;const fade=Math.pow(1-t/p.life,1.3);function point(a){const dist=radius*p.speed*(1-Math.exp(-a*1.6));return [x+Math.cos(p.angle)*dist,y+Math.sin(p.angle)*dist+a*a*14];}const q=point(t),tail=point(Math.max(0,t-.22));ctx.globalAlpha=fade;ctx.strokeStyle=p.gold?'#ffe0a0':b.color;ctx.lineWidth=p.gold?2.8:2;ctx.shadowColor=b.color;ctx.shadowBlur=5;ctx.beginPath();ctx.moveTo(...tail);ctx.lineTo(...q);ctx.stroke();ctx.fillStyle='#fff5dc';ctx.globalAlpha=fade*(.7+.3*Math.sin(t*8+p.angle));ctx.beginPath();ctx.arc(q[0],q[1],p.gold?2.6:1.9,0,7);ctx.fill();}
 }
 ctx.shadowBlur=0;ctx.globalAlpha=1;if(clock>8.5)stop();
 }
 addEventListener('pagehide',stop);return {start,stop};
})();
