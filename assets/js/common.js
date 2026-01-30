export function toast(msg, ms=1400){
  let t = document.querySelector(".toast");
  if(!t){ t = document.createElement("div"); t.className="toast"; document.body.appendChild(t); }
  t.textContent = msg; t.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(()=>t.classList.remove("show"), ms);
}
export function startNoise(canvas){
  const ctx = canvas.getContext("2d");
  function resize(){ canvas.width=innerWidth; canvas.height=innerHeight; }
  resize(); addEventListener("resize", resize);
  let last=0;
  function frame(ts){
    if(ts-last>33){
      last=ts;
      const w=canvas.width,h=canvas.height;
      const img=ctx.createImageData(w,h);
      const d=img.data;
      for(let i=0;i<d.length;i+=4){
        const v=(Math.random()*255)|0;
        d[i]=v; d[i+1]=v; d[i+2]=v; d[i+3]=40;
      }
      ctx.putImageData(img,0,0);
    }
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
export function enableGlitchPulse(root=document){
  const el = root.querySelector(".panel") || document.body;
  function pulse(){ el.classList.add("glitch-run"); setTimeout(()=>el.classList.remove("glitch-run"), 420); }
  setInterval(()=>{ if(Math.random()<0.35) pulse(); }, 1200);
  root.querySelectorAll("[data-glitch]").forEach(n=>n.addEventListener("pointerenter", pulse));
}
export function registerSW(){
  if(!("serviceWorker" in navigator)) return;
  addEventListener("load", ()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}));
}
