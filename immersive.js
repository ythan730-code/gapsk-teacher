/* Scene navigation is separate from the learning state and assessment rules. */
const sceneObjects=[
 {n:1,name:'廣播機',label:'調查故障廣播',x:73,y:40,icon:'◉'},
 {n:2,name:'聲音工作台',label:'校準前後鼻音',x:73,y:62,icon:'♬'},
 {n:3,name:'漢字資料室',label:'尋找判音線索',x:89,y:43,icon:'▤'},
 {n:4,name:'我的修復桌',label:'修復漢字資料',x:94,y:75,icon:'✎'},
 {n:5,name:'廣播重啟台',label:'修復整段廣播',x:62,y:40,icon:'◉'},
 {n:6,name:'月台留言',label:'分享今天的發現',x:48,y:66,icon:'✉'}
];
function renderImmersiveStation(){
 const entering=!document.querySelector('.station-stage');
 if(entering){app.innerHTML=`<section class="station-stage entering" aria-label="車站月台探索場景"><div class="scene-scroll" tabindex="0" aria-label="全景月台，可左右滑動探索"><div class="scene-world"><img class="platform-image" src="assets/station-platform-v1.png" alt="你站在木造車站月台，左邊停靠紅色列車，右邊有廣播機、聲音工作台和漢字資料室，前方通往森林與小鎮。" draggable="false"><div class="station-shade" aria-hidden="true"></div><div class="station-lights" aria-hidden="true"><i style="left:59%;top:18%"></i><i style="left:90%;top:27%"></i><i style="left:65%;top:46%"></i></div><div class="steam" aria-hidden="true"><i></i><i></i><i></i></div>${sceneObjects.map(o=>`<button class="object-hotspot object-${o.n}" style="left:${o.x}%;top:${o.y}%" data-object="${o.n}" aria-label="${o.name}：${o.label}"><span class="object-ring" aria-hidden="true">${o.icon}</span><span class="object-caption">${o.name}<small>${o.label}</small></span></button>`).join('')}</div></div><div class="scene-top"><button data-go="0" class="scene-back">← 離開車站</button><div class="location-plaque"><p>森林鐵路 · 第一章</p><h1 tabindex="-1">鼻音迷失車站</h1><span id="stationStateLabel"></span></div><div class="scene-tools"><button data-clear-learning>清除學習紀錄</button><button id="sceneLibrary">▤ 漢字庫</button><button id="sceneExpand" aria-label="切換全螢幕">⛶</button></div></div><div class="scene-directions"><button data-pan="left" aria-label="向左看月台">‹</button><span>左右滑動，看看月台</span><button data-pan="right" aria-label="向右看站房">›</button></div><details class="scene-route"><summary>☷ 課堂路線</summary><nav aria-label="車站六關路線">${sceneObjects.map(o=>`<button data-route="${o.n}"><small>0${o.n}</small><span>${labels[o.n-1]}<em>${times[o.n-1]}</em></span></button>`).join('')}</nav></details><section class="station-dialogue" aria-label="站長引導"><div class="portrait" aria-hidden="true">✉</div><div class="dialogue-copy"><span>站長的留言</span><p id="sceneSpeech"></p></div><button class="dialogue-action" id="investigate"></button><button class="dialogue-hide" id="hideDialogue" aria-label="收起站長留言">⌄</button></section><button id="showDialogue" class="show-dialogue" hidden>✉ 站長的留言</button><div class="arrival-title" aria-hidden="true"><small>THE FOREST RAILWAY</small><strong>你抵達了，鼻音迷失車站。</strong></div></section>`;
 // Start beside the train; native horizontal scrolling keeps all props reachable on portrait devices.
 const viewport=document.querySelector('.scene-scroll');viewport.scrollLeft=0;
 setTimeout(()=>document.querySelector('.station-stage')?.classList.remove('entering'),2200);
 }
 const stage=document.querySelector('.station-stage');stage.classList.toggle('is-repaired',state.restored);
 const o=sceneObjects.find(x=>x.n===step);
 document.querySelector('#sceneSpeech').textContent=state.restored?'廣播已經恢復，車站的燈也亮起來了。請到月台留言，分享今天的發現。':speeches[step-1];
 document.querySelector('#stationStateLabel').textContent=state.restored?'✧ 已修復・歡迎回來':'廣播故障・等待修復';
 document.querySelector('#investigate').textContent=state.restored?'留下今天的發現 →':'走近'+o.name+' →';
 document.querySelectorAll('[data-object]').forEach(b=>{b.classList.toggle('current',Number(b.dataset.object)===step);b.setAttribute('aria-current',Number(b.dataset.object)===step?'step':'false');});
 document.querySelectorAll('[data-route]').forEach(b=>b.classList.toggle('selected',Number(b.dataset.route)===step));
 const sheet=document.querySelector('#taskDialog');
 if(taskOpen){sheet.innerHTML=`<div class="task-sheet-header"><span>0${step} / ${o.name}</span><button id="closeTask" aria-label="收起任務，回到月台">✕ 回到月台</button></div><section class="panel" id="panel">${panel()}</section><div class="task-sheet-footer">${step<6?`<button data-task-go="${step+1}" class="primary">教師帶領 · 前往${sceneObjects[step].name} →</button>`:'<button id="closeTaskBottom">回到月台</button>'}</div>`;if(!sheet.open)sheet.showModal();if(step===4)bindNote();if(step===5)bindMission();if(step===6)bindExit();}
}
function openStationObject(n){if(n!==step)go(n);taskOpen=true;render();}
function closeStationTask(){taskOpen=false;stopAudio();leavePractice();const sheet=document.querySelector('#taskDialog');sheet.close();document.querySelector(`[data-object="${step}"]`)?.focus({preventScroll:true});}
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;
 if(b.dataset.object){openStationObject(Number(b.dataset.object));return;}
 if(b.dataset.route){const n=Number(b.dataset.route);go(n);document.querySelector('.scene-route').open=false;document.querySelector(`[data-object="${n}"]`).scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'nearest',inline:'center'});return;}
 if(b.dataset.taskGo){const n=Number(b.dataset.taskGo);closeStationTask();go(n);document.querySelector(`[data-object="${n}"]`).scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'});return;}
 if(b.dataset.pan){const v=document.querySelector('.scene-scroll');v.scrollBy({left:(b.dataset.pan==='left'?-1:1)*v.clientWidth*.65,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});return;}
 if(b.id==='closeTask'||b.id==='closeTaskBottom'){closeStationTask();return;}
 if(b.id==='investigate'){if(state.restored)openStationObject(6);else openStationObject(step);return;}
 if(b.id==='sceneLibrary'){library();return;}
 if(b.id==='hideDialogue'){document.querySelector('.station-dialogue').hidden=true;document.querySelector('#showDialogue').hidden=false;return;}
 if(b.id==='showDialogue'){document.querySelector('.station-dialogue').hidden=false;b.hidden=true;return;}
 if(b.id==='sceneExpand'){if(document.fullscreenElement)document.exitFullscreen?.();else if(document.querySelector('.station-stage').requestFullscreen)document.querySelector('.station-stage').requestFullscreen().catch(()=>toast('目前瀏覽器不支援全螢幕，可直接在此探索月台。'));else toast('目前瀏覽器不支援全螢幕，可直接在此探索月台。');}
});
document.addEventListener('DOMContentLoaded',()=>{
 document.querySelector('#taskDialog').addEventListener('cancel',e=>{e.preventDefault();closeStationTask();});
});
