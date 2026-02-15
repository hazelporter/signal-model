const pressure = document.getElementById("pressure");
const pval = document.getElementById("pval");
const dot = document.getElementById("dot");
const channel = document.getElementById("channel");

let t = 0;

function tick() {
  // Corridor: mostly straight + fast.
  // Pressure slightly increases speed (more "push"), but doesn't add complexity.
  const p = Number(pressure.value);
  pval.textContent = String(p);

  const h = channel.clientHeight;
  const speed = 2.6 + (p / 100) * 2.0;

  t += speed;
  const y = (t % (h - 24)) + 12;

  // almost no lateral drift
  dot.style.transform = `translateX(-50%) translateY(${y}px)`;

  requestAnimationFrame(tick);
}

tick();
