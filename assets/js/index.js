import { toast, startNoise, enableGlitchPulse, registerSW } from "./common.js";

registerSW();

const noise = document.getElementById("noise");
if (noise) startNoise(noise);
enableGlitchPulse(document);

const hiddenLink = document.getElementById("hidden-link");

// すでに解除済みなら表示
if (localStorage.getItem("layer_unlocked") === "1" && hiddenLink) {
  hiddenLink.style.display = "block";
  toast("LAYER: AVAILABLE", 1200);
}

// ✅ 確実に動く解除方法：Ctrl + 0
// （Tabは環境依存が強いので採用しない）
window.addEventListener("keydown", (e) => {
  const isCtrlO = e.ctrlKey && (e.key === "0" || e.key === "0");

  if (!isCtrlO) return;

  e.preventDefault(); // ブラウザ既定動作を止める

  localStorage.setItem("layer_unlocked", "1");
  if (hiddenLink) hiddenLink.style.display = "block";

  toast("LAYER UNLOCKED", 1600);
});

// system clock
const clock = document.getElementById("sysclock");
if (clock) {
  const tick = () => {
    const d = new Date();
    clock.textContent = "SYS " + d.toISOString().replace("T", " ").slice(0, 19) + "Z";
  };
  tick();
  setInterval(tick, 1000);
}
