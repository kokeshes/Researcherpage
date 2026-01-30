import { toast, startNoise, enableGlitchPulse, registerSW } from "./common.js";
registerSW();
const noise = document.getElementById("noise");
if(noise) startNoise(noise);
enableGlitchPulse(document);

const hiddenLink = document.getElementById("hidden-link");
if(localStorage.getItem("layer_unlocked")==="1" && hiddenLink) hiddenLink.style.display="block";

let tabCount=0, windowStart=0;
addEventListener("keydown",(e)=>{
  if(e.key!=="Tab") return;
  const now=performance.now();
  if(now-windowStart>3000){ windowStart=now; tabCount=0; }
  tabCount++;
  if(tabCount===6) toast("...signal detected");
  if(tabCount===10) toast("...linking");
  if(tabCount>=12){
    localStorage.setItem("layer_unlocked","1");
    if(hiddenLink) hiddenLink.style.display="block";
    toast("LAYER UNLOCKED");
    tabCount=0; windowStart=now;
  }
});
