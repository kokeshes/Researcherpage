import { startNoise, enableGlitchPulse, registerSW, toast } from "../assets/js/common.js";
registerSW();
const noise=document.getElementById("noise"); if(noise) startNoise(noise);
enableGlitchPulse(document);

const items=[
  {title:"Ernest Sosa — overview", url:"https://en.wikipedia.org/wiki/Ernest_Sosa", tags:["Sosa","virtue","epistemology"]},
  {title:"Dual-process theory — overview", url:"https://en.wikipedia.org/wiki/Dual_process_theory", tags:["dual-process","cognitive"]},
  {title:"Zotero", url:"https://www.zotero.org/", tags:["tools","bibliography"]},
  {title:"PhilPapers", url:"https://philpapers.org/", tags:["search","philosophy"]},
];
const q=document.getElementById("q");
const out=document.getElementById("out");
function render(){
  const s=q.value.trim().toLowerCase();
  out.innerHTML="";
  const filtered=items.filter(it=>{
    const blob=(it.title+" "+it.url+" "+it.tags.join(" ")).toLowerCase();
    return !s || blob.includes(s);
  });
  if(!filtered.length){
    const p=document.createElement("div"); p.className="small"; p.textContent="No match. Try another keyword.";
    out.appendChild(p); return;
  }
  filtered.forEach((it,idx)=>{
    const card=document.createElement("div"); card.className="card";
    const a=document.createElement("a"); a.href=it.url; a.target="_blank"; a.rel="noopener"; a.style.textDecoration="none";
    a.innerHTML=`<div class="kicker">LINK ${String(idx+1).padStart(2,"0")}</div>
                 <div class="label" data-glitch="${it.title}">${it.title}</div>
                 <div class="small" style="margin-top:8px; opacity:.9">${it.url}</div>`;
    card.appendChild(a);
    const tags=document.createElement("div"); tags.style.marginTop="10px";
    it.tags.forEach(t=>{ const sp=document.createElement("span"); sp.className="tag"; sp.textContent=t; tags.appendChild(sp); });
    card.appendChild(tags);
    out.appendChild(card);
  });
}
q.addEventListener("input",render);
render(); toast("BIBLIO LOADED");
