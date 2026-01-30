import { startNoise, enableGlitchPulse, registerSW, toast } from "../assets/js/common.js";
registerSW();
const noise=document.getElementById("noise"); if(noise) startNoise(noise);
enableGlitchPulse(document);

const box=document.getElementById("stream");
const text=box.textContent;
box.textContent="";
let i=0;
function step(){
  i += Math.max(1, Math.floor(Math.random()*4));
  box.textContent = text.slice(0,i);
  box.scrollTop = box.scrollHeight;
  if(i<text.length) requestAnimationFrame(step);
  else toast("OBSERVE COMPLETE", 1800);
}
requestAnimationFrame(step);
