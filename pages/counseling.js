import { startNoise, enableGlitchPulse, registerSW, toast } from "../assets/js/common.js";
registerSW();
const noise=document.getElementById("noise"); if(noise) startNoise(noise);
enableGlitchPulse(document);

const PASS="Observe";
const gate=document.getElementById("gate");
const pass=document.getElementById("pass");
const enter=document.getElementById("enter");
const content=document.getElementById("content");

function unlock(){ gate.style.display="none"; content.style.display="block"; toast("ACCESS GRANTED"); }
function lock(){ gate.style.display="block"; content.style.display="none"; }

if(sessionStorage.getItem("counsel_unlocked")==="1") unlock(); else lock();

enter.addEventListener("click",()=>{
  if(pass.value===PASS){ sessionStorage.setItem("counsel_unlocked","1"); unlock(); }
  else{ toast("DENIED"); pass.value=""; pass.focus(); }
});
pass.addEventListener("keydown",(e)=>{ if(e.key==="Enter") enter.click(); });

const KEY="counsel_logs_v1";
const list=document.getElementById("logList");
const ta=document.getElementById("logText");
function load(){ try{return JSON.parse(localStorage.getItem(KEY)||"[]");}catch{return [];} }
function save(arr){ localStorage.setItem(KEY, JSON.stringify(arr)); }
function render(){
  const logs=load().slice().reverse();
  list.innerHTML="";
  if(!logs.length){ const p=document.createElement("div"); p.className="small"; p.textContent="No entries yet. Write one line. Observe it. Let it be logged."; list.appendChild(p); return; }
  for(const it of logs){
    const card=document.createElement("div"); card.className="card";
    const meta=document.createElement("div"); meta.className="small"; meta.textContent=it.at;
    const txt=document.createElement("div"); txt.style.marginTop="8px"; txt.style.whiteSpace="pre-wrap"; txt.textContent=it.text;
    card.append(meta,txt); list.appendChild(card);
  }
}
document.getElementById("add").addEventListener("click",()=>{
  const text=ta.value.trim(); if(!text){ toast("EMPTY"); return; }
  const at=new Date().toISOString().replace("T"," ").slice(0,19)+"Z";
  const logs=load(); logs.push({at,text}); save(logs);
  ta.value=""; toast("LOGGED"); render();
});
document.getElementById("export").addEventListener("click",()=>{
  const logs=load();
  const blob=new Blob([JSON.stringify(logs,null,2)],{type:"application/json"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a"); a.href=url; a.download="counseling_logs.json"; a.click();
  URL.revokeObjectURL(url); toast("EXPORTED");
});
document.getElementById("wipe").addEventListener("click",()=>{
  if(!confirm("Delete all local logs on this device?")) return;
  localStorage.removeItem(KEY); toast("WIPED"); render();
});
render();
