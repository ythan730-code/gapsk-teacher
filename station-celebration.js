(function(root){
  const timing={fireworks:5200,pause:2000,lightning:800};
  function start(){
    if(document.querySelector('.station-celebration'))return;
    const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
    const overlay=document.createElement('section');
    overlay.className='station-celebration';overlay.setAttribute('role','dialog');overlay.setAttribute('aria-modal','true');overlay.setAttribute('aria-label','車站修復完成');
    overlay.innerHTML='<canvas aria-hidden="true"></canvas><div class="celebration-flash" aria-hidden="true"></div><div class="celebration-message" role="status"><h2 tabindex="-1">恭喜你成功修復車站廣播！</h2><div class="celebration-actions" hidden><button id="celebration-note">先到月台留言</button><a class="button primary" href="chapter-2.html#workshop">前往音樂盒工廠 →</a></div></div>';
    document.body.append(overlay);overlay.querySelector('h2').focus();
    const canvas=overlay.querySelector('canvas'),ctx=canvas.getContext('2d');
    const w=innerWidth,h=innerHeight,dpr=Math.min(devicePixelRatio||1,2);canvas.width=w*dpr;canvas.height=h*dpr;ctx.scale(dpr,dpr);
    const particles=[],colors=['#ffd98a','#ff98be','#9ee7ed','#c5a8ff','#fff5ce'];
    const begin=performance.now();let burst=-1;
    function draw(now){
      const elapsed=now-begin;ctx.clearRect(0,0,w,h);
      if(!reduced&&elapsed<3200&&Math.floor(elapsed/300)>burst){
        burst=Math.floor(elapsed/300);const x=w*(.15+Math.random()*.7),y=h*(.12+Math.random()*.4);
        for(let j=0;j<80;j++){const a=j/80*Math.PI*2,v=1.3+Math.random()*3.2;particles.push({x,y,vx:Math.cos(a)*v,vy:Math.sin(a)*v,life:1,color:colors[burst%colors.length]});}
      }
      for(const p of particles){if(p.life<=0)continue;const px=p.x,py=p.y;p.x+=p.vx;p.y+=p.vy;p.vy+=.025;p.life-=.012;ctx.globalAlpha=Math.max(0,p.life);ctx.strokeStyle=p.color;ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(p.x,p.y);ctx.stroke();ctx.fillStyle=p.color;ctx.beginPath();ctx.arc(p.x,p.y,1.8,0,Math.PI*2);ctx.fill();}
      ctx.globalAlpha=1;
      if(elapsed<timing.fireworks){requestAnimationFrame(draw);return;}
      canvas.remove();
      // Hold the success message for two seconds AFTER fireworks finish.
      setTimeout(()=>{overlay.classList.add(reduced?'quiet-fault':'lightning');
        setTimeout(()=>{overlay.classList.add('faulted');document.querySelector('.station-stage')?.classList.add('factory-fault');overlay.querySelector('h2').textContent='糟糕！音樂盒工廠出現故障！';overlay.querySelector('.celebration-actions').hidden=false;overlay.querySelector('#celebration-note').focus();},reduced?0:timing.lightning);
      },timing.pause);
    }
    requestAnimationFrame(draw);
    overlay.querySelector('#celebration-note').onclick=()=>{overlay.remove();openStationObject(6);};
  }
  root.StationCelebration={start,timing};
})(window);
