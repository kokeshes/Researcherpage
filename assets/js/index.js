import { toast, startNoise, enableGlitchPulse, registerSW } from "./common.js";
registerSW();
const noise = document.getElementById("noise");
if(noise) startNoise(noise);
enableGlitchPulse(document);

const hiddenLink = document.getElementById("hidden-link");
if(localStorage.getItem("layer_unlocked")==="1" && hiddenLink) hiddenLink.style.display="block";

// Easier unlock: Tab x6 then Enter (within 6 seconds)
let tabCount = 0;
let windowStart = 0;
let primed = false;

window.addEventListener("keydown", (e)=>{
  const now = performance.now();

  if(e.key === "Tab"){
    if(now - windowStart > 6000){
      windowStart = now;
      tabCount = 0;
      primed = false;
    }
    tabCount++;

    if(tabCount === 3) toast("...signal detected");
    if(tabCount === 6){
      primed = true;
      toast("PRIMED — press Enter");
    }
  }

  if(e.key === "Enter" && primed){
    localStorage.setItem("layer_unlocked", "1");
    if(hiddenLink) hiddenLink.style.display = "block";
    toast("LAYER UNLOCKED");
    primed = false;
    tabCount = 0;
    windowStart = now;
  }
});
