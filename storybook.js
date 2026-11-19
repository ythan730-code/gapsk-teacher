'use strict';
const book=document.querySelector('#book'),$=s=>document.querySelector(s),reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
let scene='planet',look=0,timer;const scenes={planet:['A LITTLE WORLD, WAITING FOR YOU','有一座小鎮，<br>正在等待你的聲音。','循着河流與燈光，開啟你的修復旅程。','進入小鎮'],town:['FOLLOW THE RIVER','沿着溪流，<br>尋找失落的聲音。','河邊的車站廣播出了故障。點擊車站，走進故事。','走近車站'],station:['CHAPTER ONE · THE NASAL STATION','你已抵達，鼻音迷失車站。','前方的廣播機出了故障。走近它，開始調查。','開始調查']};
function show(name){scene=name;book.dataset.scene=name;const s=scenes[name];$('#eyebrow').textContent=s[0];$('#title').innerHTML=s[1];$('#description').textContent=s[2];$('#next').innerHTML=s[3]+' <span>→</span>';document.querySelectorAll('[data-view]').forEach(b=>{if(b.dataset.view===name)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});$('.view-tools').hidden=name!=='station';look=0;pan(0);location.hash=name;}
function pan(delta){const limit=Math.max(0,($('.platform-camera').offsetWidth-innerWidth)/2);look=Math.max(-limit,Math.min(limit,look+delta));$('.platform-camera').style.setProperty('--look',look+'px');}
$('#next').onclick=()=>scene==='planet'?show('town'):scene==='town'?show('station'):location.assign('./#chapter-1');$('#station').onclick=()=>show('station');document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>show(b.dataset.view));
$('#lookLeft').onclick=()=>pan(140);$('#lookRight').onclick=()=>pan(-140);$('#recenter').onclick=()=>{look=0;pan(0);};
$('#motion').onclick=()=>{const paused=book.classList.toggle('still');$('#motion').textContent=paused?'開啟動態':'暫停動態';$('#motion').setAttribute('aria-pressed',String(paused));};if(reduced){book.classList.add('still');$('#motion').hidden=true;}
$('#repair').onclick=()=>{const on=book.classList.toggle('repaired');$('#repair').setAttribute('aria-pressed',String(on));$('#repair').textContent=on?'返回修復前的畫面':'試看修復後的燈光 ✧';$('#status').textContent=on?'修復效果試看 · 不會解鎖關卡':'畫面試看 · 不改變學習進度';BookFireworks.stop();$('#replayFireworks').hidden=!on||reduced;if(on&&!book.classList.contains('still'))BookFireworks.start();};
$('#replayFireworks').onclick=()=>{if(book.classList.contains('still'))$('#motion').click();BookFireworks.start();};
for(const img of document.images)img.addEventListener('error',()=>$('.error').hidden=false);
addEventListener('hashchange',()=>{const n=location.hash.slice(1);if(scenes[n]&&n!==scene)show(n);});if(scenes[location.hash.slice(1)])show(location.hash.slice(1));

addEventListener('resize',()=>pan(0));

// Animate only the masked water texture; no changes to the original illustration.
let waterClock=0,waterLast=0,waterFrame=0;
function animateWater(now){waterFrame=requestAnimationFrame(animateWater);if(!waterLast){waterLast=now;return;}if(now-waterLast<40)return;const elapsed=Math.min(now-waterLast,80);waterLast=now;if(reduced||book.classList.contains('still')||document.hidden||scene==='station')return;waterClock+=elapsed;const wave=Math.sin(waterClock/2300);$('#waterNoise').setAttribute('baseFrequency',(.023+wave*.0015).toFixed(4)+' '+(.075+Math.sin(waterClock/1800)*.004).toFixed(4));}
if(!reduced)waterFrame=requestAnimationFrame(animateWater);
addEventListener('pagehide',()=>cancelAnimationFrame(waterFrame));
addEventListener('pageshow',event=>{if(event.persisted&&!reduced){waterLast=0;waterFrame=requestAnimationFrame(animateWater);}});
