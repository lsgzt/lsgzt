// Monitor the sweep — poll every 200ms and record state
const samples = [];
const start = Date.now();
let started = false;

const poll = () => {
  const gs = document.querySelectorAll('g');
  const sweepG = gs[2];
  const lG = gs[0];
  if (!sweepG || !lG) {
    if (Date.now() - start < 20000) {
      setTimeout(poll, 200);
    } else {
      console.log('TIMEOUT - no sweep detected in 20s');
    }
    return;
  }
  const sweepOpacity = parseFloat(sweepG.style.opacity) || 0;
  const lOpacity = parseFloat(lG.style.opacity) || 0;
  const sweepTransform = sweepG.getAttribute('transform') || '';
  samples.push({
    t: Date.now() - start,
    sweepOpacity,
    lOpacity,
    transform: sweepTransform.substring(13, 25),
  });
  if (sweepOpacity > 0 && !started) {
    started = true;
    console.log('SWEEP STARTED at t=' + (Date.now() - start) + 'ms');
  }
  if (started && sweepOpacity === 0 && samples.length > 3) {
    console.log('SWEEP ENDED. Samples:');
    console.log(JSON.stringify(samples, null, 2));
    return;
  }
  if (Date.now() - start < 20000) {
    setTimeout(poll, 200);
  } else {
    console.log('TIMEOUT after 20s. Last samples:');
    console.log(JSON.stringify(samples.slice(-5), null, 2));
  }
};
poll();
