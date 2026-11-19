(() => {
  const intro = document.querySelector('#book-cover-intro');
  const open = document.querySelector('#open-textbook');
  const skip = document.querySelector('#skip-intro');
  const enter = document.querySelector('#enter-intro');
  const radio = document.querySelector('#intro-radio');
  const next = document.querySelector('#next');
  const seenKey = 'gapsk-station-arrival-v1';
  function read(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  }
  const progress = read('language-town-six-v3');
  const preview = new URLSearchParams(location.search).get('preview') === 'opening';
  const repaired = !preview && progress?.restored === true;
  let timers = [];
  let context;
  let starting = false;
  function later(callback, delay) { timers.push(setTimeout(callback, delay)); }
  function clearSequence() {
    timers.forEach(clearTimeout);
    timers = [];
    if (context) { context.close().catch(() => {}); context = null; }
  }
  function staticMode() { return reduced || book.classList.contains('still'); }
  function applyFault() {
    if (repaired) return;
    intro.classList.add('planet-faulted');
    book.classList.remove('first-light');
    book.classList.add('faulted');
    radio.hidden = false;
    if (!preview) { try { localStorage.setItem(seenKey, 'true'); } catch {} }
  }
  function readyToEnter() {
    clearSequence();
    applyFault();
    intro.classList.remove('planet-strike');
    intro.classList.add('ready');
    skip.hidden = true;
    enter.hidden = false;
    document.querySelector('#intro-mission').hidden = repaired;
    enter.focus({preventScroll:true});
  }
  function closeBook() {
    clearSequence();
    intro.hidden = true;
    book.inert = false;
  }
  function crackle() {
    if (!context || context.state !== 'running') return;
    const noise = context.createBuffer(1, Math.ceil(context.sampleRate * .22), context.sampleRate);
    const samples = noise.getChannelData(0);
    for (let i=0; i<samples.length; i++) samples[i]=(Math.random()*2-1)*.055*(1-i/samples.length);
    const source = context.createBufferSource();
    source.buffer=noise; source.connect(context.destination); source.start();
  }
  function investigate() { location.assign('./?investigate=radio#chapter-1'); }
  // Visiting the station never replays the incident. Saved repairs stay intact.
  book.classList.toggle('station-lit', repaired);
  book.classList.toggle('faulted', !repaired);
  book.classList.toggle('first-light', repaired);
  radio.hidden = repaired;
  radio.onclick = investigate;
  if (scene === 'planet') {
    intro.hidden = false;
    book.inert = true;
    open.focus({preventScroll:true});
  }
  open.onclick = () => {
    if (starting) return;
    starting = true;
    open.hidden = true;
    intro.classList.add('opening');
    if (staticMode()) { intro.classList.add('instant'); readyToEnter(); return; }
    skip.hidden = false;
    skip.focus();
    if (repaired) { later(readyToEnter, 2800); return; }
    try {
      const AudioEngine = window.AudioContext || window.webkitAudioContext;
      context = new AudioEngine();
      context.resume().catch(() => {});
    } catch {}
    later(() => { intro.classList.add('planet-strike'); crackle(); }, 2800);
    later(applyFault, 3070);
    later(readyToEnter, 4800);
  };
  skip.onclick = () => {
    intro.classList.add('instant');
    readyToEnter();
  };
  enter.onclick = () => {
    closeBook();
    show('town');
    next.focus({preventScroll:true});
  };
  next.addEventListener('click', event => {
    if (scene !== 'station' || repaired) return;
    event.stopImmediatePropagation();
    investigate();
  }, true);
  addEventListener('hashchange', () => {
    if (!intro.hidden && scene !== 'planet') closeBook();
  });
  addEventListener('pagehide', () => {
    closeBook();
  });
})();
