(() => {
 const dialog=document.createElement('dialog');
 dialog.className='learning-reset-dialog';dialog.setAttribute('aria-labelledby','learning-reset-title');
 dialog.innerHTML='<h2 id="learning-reset-title">清除學習紀錄？</h2><p>將清除這部裝置的第一章作答紀錄、月台留言及修復進度，並返回開場。第二章紀錄不受影響。</p><p>清除後無法復原。</p><div class="reset-actions"><button type="button" data-reset-cancel autofocus>取消</button><button type="button" data-reset-confirm>確認清除</button></div><p class="reset-error" role="status"></p>';
 document.body.append(dialog);
 document.addEventListener('click',e=>{if(e.target.closest('[data-clear-learning]'))dialog.showModal();});
 dialog.querySelector('[data-reset-cancel]').onclick=()=>dialog.close();
 dialog.querySelector('[data-reset-confirm]').onclick=()=>{
  try{localStorage.removeItem('language-town-six-v3');localStorage.removeItem('gapsk-station-arrival-v1');}
  catch{dialog.querySelector('.reset-error').textContent='未能清除紀錄，請確認瀏覽器允許儲存網站資料後再試。';return;}
  const url=new URL('storybook.html#planet',location.href);
  if(location.pathname===url.pathname){history.replaceState(null,'',url.href);location.reload();}else location.replace(url.href);
 };
})();
