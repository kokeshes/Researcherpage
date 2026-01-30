import { startNoise, enableGlitchPulse } from "../assets/js/common.js";

const noise = document.getElementById("noise");
if (noise) startNoise(noise);
enableGlitchPulse(document);

// === Scroll apparition logic ===
const hood = document.getElementById("hood-apparition");

let hideTimer = null;
let lastShow = 0;

function flashHood() {
  if (!hood) return;

  const now = performance.now();

  // 連続スクロールでも“点滅しすぎない”ように間引き（Lainっぽく）
  if (now - lastShow < 450) return;
  lastShow = now;

  hood.classList.add("show");

  if (hideTimer) clearTimeout(hideTimer);
  hideTimer = setTimeout(() => {
    hood.classList.remove("show");
  }, 220); // “一瞬”の長さ
}

// wheel / touch / key scroll を拾う
window.addEventListener("wheel", flashHood, { passive: true });
window.addEventListener("touchmove", flashHood, { passive: true });
window.addEventListener("keydown", (e) => {
  // キーボードスクロール系
  const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "];
  if (keys.includes(e.key)) flashHood();
});

// 初回だけ「いる」感じ（任意）
setTimeout(() => {
  flashHood();
}, 600);
