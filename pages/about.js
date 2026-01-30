import { startNoise, enableGlitchPulse, registerSW } from "../assets/js/common.js";
registerSW();
const noise=document.getElementById("noise"); if(noise) startNoise(noise);
enableGlitchPulse(document);
