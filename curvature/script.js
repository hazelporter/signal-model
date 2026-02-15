const pressure = document.getElementById("pressure");
const pval = document.getElementById("pval");
const dot = document.getElementById("dot");
const channel = document.getElementById("channel");

let t = 0;

function easeInOut(x) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

function tick() {
  const p = Number(pressure.value);
  pval.textContent = String(p);

  const h = channel.clientHeight;
  const w = channel.clientWidth;

  // Curvature: slower overall; "linger" in the middle.
  const base = 1.4 + (p / 100) * 1.0;
  t += base;

  // normalized vertical position 0..1
  const yRaw = (t % (h - 24)) / (h - 24);
  const y = yRaw * (h - 24) + 12;

  // middle-linger effect (slowdown around 0.5)
  const linger = 1 - 0.55 * Math.exp(-Math.pow((yRaw - 0.5) / 0.18, 2));
  t += base * (1 - linger); // subtle: reduces net movement near center

  // sideways gentle curve strongest near the middle
  const mid = Math.sin(Math.PI * yRaw); // 0 at ends, 1 at middle
  const amp = (w * 0.28) * (0.35 + (p / 100) * 0.65);
  const x = (mid * Math.sin(t / 14)) * amp;

  dot.style.left = "50%";
  dot.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;

  requestAnimationFrame(tick);
}

tick();
