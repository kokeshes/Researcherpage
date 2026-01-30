import { startNoise, enableGlitchPulse, registerSW, toast } from "../assets/js/common.js";

registerSW();
enableGlitchPulse(document);

const noise = document.getElementById("noise");
if (noise) startNoise(noise);

/* =========================
   TYPE STREAM (sequential)
========================= */
const stream = document.getElementById("stream");
if (!stream) throw new Error("#stream not found");

// take original text, then clear
const fullText = stream.textContent.replace(/\r\n/g, "\n");
stream.textContent = "";
stream.classList.add("is-typing");

let i = 0;
let timer = null;
let speed = 14;          // ms per char (faster = smaller)
let running = true;

function appendChar() {
  if (!running) return;
  if (i >= fullText.length) {
    stopTyping();
    return;
  }

  // append one char
  stream.append(fullText[i]);
  i++;

  // auto scroll
  stream.scrollTop = stream.scrollHeight;

  // little rhythm (newline / punctuation slowdowns)
  const ch = fullText[i - 1];
  let delay = speed;
  if (ch === "\n") delay = 40;
  else if ("。．.!?！？".includes(ch)) delay = 55;

  timer = setTimeout(appendChar, delay);
}

function stopTyping() {
  running = false;
  if (timer) clearTimeout(timer);
  timer = null;
  // keep final scroll
  stream.scrollTop = stream.scrollHeight;
  toast("STREAM: COMPLETE");
}

function revealAll() {
  // show instantly
  running = false;
  if (timer) clearTimeout(timer);
  timer = null;
  stream.textContent = fullText;
  stream.scrollTop = stream.scrollHeight;
  toast("STREAM: REVEAL");
}

/* start */
toast("STREAM: CONNECT");
setTimeout(appendChar, 250);

/* controls: click or Space/Enter to skip */
document.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Enter") {
    if (i < fullText.length) revealAll();
  } else if (e.key === "ArrowUp") {
    // slow
    speed = Math.min(40, speed + 3);
    toast("SPD: " + speed);
  } else if (e.key === "ArrowDown") {
    // fast
    speed = Math.max(4, speed - 3);
    toast("SPD: " + speed);
  }
});
stream.addEventListener("click", () => {
  if (i < fullText.length) revealAll();
});

/* =========================
   HOOD APPARITION (scroll)
========================= */
const hood = document.getElementById("hood-apparition");
if (hood) {
  let last = 0;
  let cooldown = 0;

  function flash() {
    hood.classList.add("show");
    hood.setAttribute("aria-hidden", "false");
    setTimeout(() => {
      hood.classList.remove("show");
      hood.setAttribute("aria-hidden", "true");
    }, 220);
  }

  addEventListener("scroll", () => {
    const y = scrollY || document.documentElement.scrollTop || 0;
    const dy = Math.abs(y - last);
    last = y;

    const now = performance.now();
    if (now < cooldown) return;

    // trigger occasionally when user scrolls a bit
    if (dy > 24 && Math.random() < 0.22) {
      cooldown = now + 700; // prevent spam
      flash();
    }
  }, { passive: true });
}
