/* The illustrated entrance does not write to learning progress. */
function renderEntrance(){
 app.innerHTML=`<section class="planet-entry" aria-labelledby="planet-title"><div class="planet-art"><img src="assets/planet-entrance-a.png" width="1536" height="1024" fetchpriority="high" alt="藍紫天空中，綠色樹木、河流、石橋和木造車站環繞着一顆童話小星球。"></div><div class="planet-copy"><p class="planet-kicker">GAPSK PLANET</p><span class="planet-chapter">一段等待你開啟的修復旅程</span><h1 id="planet-title">GAPSK星球<span>重啟計劃</span></h1><p class="planet-story">小鎮的聲音亂了，<br>你願意幫忙找回來嗎？</p><a class="planet-enter" href="#town">進入小鎮 <span aria-hidden="true">→</span></a><p class="planet-footnote">小五普通話 · 從鼻音迷失車站出發</p></div><button class="planet-motion" aria-pressed="false">暫停浮動</button></section>`;
 const entry=app.querySelector('.planet-entry'),link=entry.querySelector('.planet-enter'),toggle=entry.querySelector('.planet-motion');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 if(reduced.matches){entry.classList.add('still');toggle.hidden=true;}
 toggle.onclick=()=>{const paused=entry.classList.toggle('still');toggle.setAttribute('aria-pressed',String(paused));toggle.textContent=paused?'開啟浮動':'暫停浮動';};
 link.onclick=e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();if(entry.classList.contains('departing'))return;entry.classList.add('departing');link.setAttribute('aria-disabled','true');link.innerHTML='正在靠近小鎮 <span aria-hidden="true">→</span>';setTimeout(()=>{if(entry.isConnected){location.hash='town';}},reduced.matches?0:1100);};
}
