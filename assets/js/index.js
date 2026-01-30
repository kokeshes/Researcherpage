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

/**
 * ✅ Unlock key: Shift + L
 * - OS / ブラウザと衝突しにくい
 * - 片手操作
 * - Lain 的（L）
 */
window.addEventListener("keydown", (e) => {
  const isUnlock =
    e.shiftKey &&
    (e.key === "L" || e.key === "l");

  if (!isUnlock) return;

  e.preventDefault();

  localStorage.setItem("layer_unlocked", "1");
  if (hiddenLink) hiddenLink.style.display = "block";

  toast("LAYER UNLOCKED", 1600);
});

// system clock
const clock = document.getElementById("sysclock");
if (clock) {
  const tick = () => {
    const d = new Date();
    clock.textContent =
      "SYS " + d.toISOString().replace("T", " ").slice(0, 19) + "Z";
  };
  tick();
  setInterval(tick, 1000);
}

