const pressure = document.getElementById("pressure");
const pval = document.getElementById("pval");
const dot = document.getElementById("dot");
const channel = document.getElementById("channel");

let y = 0;
let vy = 1.2;
let phase = 0;

function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }

function tick() {
  const p = Number(pressure.value);
  pval.textContent = String(p);

  const h = channel.clientHeight;
  const w = channel.clientWidth;

  // Thicket: "gravity" toward terrain + looping.
  // Higher pressure strengthens the pull downward and increases loopiness.
  const pull = 0.03 + (p / 100) * 0.09;
  const loop = 0.6 + (p / 100) * 1.4;

  phase += 0.06 * loop;

  // Keep the particle biased toward the lower third (near terrain)
  const target = (h * 0.78);
  const dy = target - y;
  vy += dy * pull;
  vy *= 0.92; // damping
  y += vy;

  // prevent leaving the channel: bounce softly
  if (y < 12) { y = 12; vy *= -0.35; }
  if (y > h - 12) { y = h - 12; vy *= -0.35; }

  // Tangled lateral motion (irregular)
  const mid = 0.5 + 0.5 * Math.sin(phase * 0.9);
  const amp = (w * 0.34) * mid;
  const x = (Math.sin(phase) + 0.35 * Math.sin(phase * 2.7)) * amp;

  dot.style.left = "50%";
  dot.style.transform = `translateX(calc(-50% + ${x}px)) translateY(${y}px)`;

  requestAnimationFrame(tick);
}

tick();
