import { toast, startNoise, enableGlitchPulse, registerSW } from "./common.js";

registerSW();

const noise = document.getElementById("noise");
if (noise) startNoise(noise);
enableGlitchPulse(document);

const hiddenLink = document.getElementById("hidden-link");

// 解除済みなら表示
if (localStorage.getItem("layer_unlocked") === "1" && hiddenLink) {
  hiddenLink.style.display = "block";
}

// === Shift+L unlock with staged messages ===
// Shift+L を「5秒以内に3回」で解除（段階メッセージ付き）
let count = 0;
let start = 0;

window.addEventListener("keydown", (e) => {
  const isL = e.shiftKey && (e.key === "L" || e.key === "l");
  if (!isL) return;

  // 余計な挙動を抑制（まれにフォーカスが暴れるのを防ぐ）
  e.preventDefault();

  const now = performance.now();
  if (now - start > 5000) {   // 5秒を超えたらリセット
    start = now;
    count = 0;
  }

  count++;

  if (count === 1) toast("...signal detected", 1200);
  if (count === 2) toast("...linking", 1200);

  if (count >= 3) {
    localStorage.setItem("layer_unlocked", "1");
    if (hiddenLink) hiddenLink.style.display = "block";
    toast("LAYER UNLOCKED", 1600);

    count = 0;
    start = now;
  }
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

