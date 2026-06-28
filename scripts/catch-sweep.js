// Poll for sweep start, then immediately signal
const start = Date.now();
const poll = () => {
  const gs = document.querySelectorAll('g');
  const sweepG = gs[2];
  if (!sweepG) {
    if (Date.now() - start < 25000) setTimeout(poll, 100);
    else window.__sweepResult = 'TIMEOUT';
    return;
  }
  const sweepOpacity = parseFloat(sweepG.style.opacity) || 0;
  if (sweepOpacity > 0) {
    window.__sweepResult = 'SWEEP_ACTIVE at t=' + (Date.now() - start) + 'ms, opacity=' + sweepOpacity;
    return;
  }
  if (Date.now() - start < 25000) {
    setTimeout(poll, 100);
  } else {
    window.__sweepResult = 'TIMEOUT after 25s';
  }
};
poll();
