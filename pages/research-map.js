import { startNoise, enableGlitchPulse, registerSW, toast } from "../assets/js/common.js";
registerSW();
const noise=document.getElementById("noise"); if(noise) startNoise(noise);
enableGlitchPulse(document);

const canvas=document.getElementById("map");
const ctx=canvas.getContext("2d");
const nodes=[
  {id:"Exterity",x:0.18,y:0.30,r:18,tag:"meta-epistemology",text:"外部に開いた正当化/観測者効果/手の届かない確かさ。"},
  {id:"Epistemology",x:0.35,y:0.22,r:14,tag:"virtue epistemology",text:"Apt belief / animal-reflective knowledge / performance normativity。"},
  {id:"Dual-Process",x:0.55,y:0.20,r:16,tag:"cognitive science",text:"System 1 / System 2、well-trained System 1 と信頼性・価値。"},
  {id:"Logic",x:0.72,y:0.35,r:16,tag:"math foundations",text:"意味と形式が身体に触れる瞬間。"},
  {id:"WXK-Check",x:0.62,y:0.55,r:15,tag:"logging/PWA",text:"自己記録と診断の儀式。内面の『エラーコード』を可視化する。"},
  {id:"Typewriter",x:0.38,y:0.58,r:15,tag:"external mind",text:"打鍵は思考のクロック。詰まりはフィードバック。"},
  {id:"Denim",x:0.20,y:0.62,r:14,tag:"aesthetics",text:"生活の摩耗が意味になる。物語を縫う。"},
  {id:"Thunder",x:0.12,y:0.44,r:12,tag:"mythic frame",text:"Thunder"},
];
const edges = [
  ["Exterity","Dual-Process"],
  ["Dual-Process","Logic"],      // ★追加
  ["Logic","Typewriter"],        // ★追加
  ["Typewriter","WXK-Check"],
  ["WXK-Check","Denim"],
  ["Thunder","Exterity"],
  ["Thunder","Denim"],
];

function resize(){
  canvas.width=canvas.clientWidth*devicePixelRatio;
  canvas.height=canvas.clientHeight*devicePixelRatio;
}
addEventListener("resize",resize);
let hover=null;
function pos(n){return {x:n.x*canvas.clientWidth,y:n.y*canvas.clientHeight};}
function draw(){
  resize();
  const w=canvas.clientWidth,h=canvas.clientHeight;
  ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
  ctx.clearRect(0,0,w,h);

  ctx.globalAlpha=0.14; ctx.fillStyle="#9ef7ff";
  for(let i=0;i<40;i++){ const x=Math.random()*w,y=Math.random()*h,r=1+Math.random()*2; ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill(); }
  ctx.globalAlpha=1;

  ctx.lineWidth=1;
 for (const [a, b] of edges) {
  const na = nodes.find(n => n.id === a);
  const nb = nodes.find(n => n.id === b);
  if (!na || !nb) continue; // ★これが重要（存在しないIDはスキップ）

  const pa = pos(na), pb = pos(nb);
  ctx.strokeStyle = "rgba(216,244,255,.28)";
  ctx.beginPath();
  ctx.moveTo(pa.x, pa.y);
  ctx.lineTo(pb.x, pb.y);
  ctx.stroke();
}

  for(const n of nodes){
    const p=pos(n), isHover=(hover && hover.id===n.id);
    const rr=n.r+(isHover?5:0);
    ctx.fillStyle=isHover?"rgba(120,245,255,.22)":"rgba(120,245,255,.12)";
    ctx.beginPath(); ctx.arc(p.x,p.y, rr*2.1, 0, Math.PI*2); ctx.fill();
    ctx.fillStyle="rgba(0,0,0,.55)"; ctx.beginPath(); ctx.arc(p.x,p.y, rr, 0, Math.PI*2); ctx.fill();
    ctx.strokeStyle=isHover?"rgba(120,245,255,.75)":"rgba(216,244,255,.35)"; ctx.stroke();
    ctx.font="12px ui-monospace, Menlo, Consolas, monospace";
    ctx.fillStyle=isHover?"rgba(216,244,255,.95)":"rgba(216,244,255,.70)";
    ctx.fillText(n.id, p.x+rr+8, p.y+4);
  }
  requestAnimationFrame(draw);
}
requestAnimationFrame(draw);

function hit(mx,my){
  const r=canvas.getBoundingClientRect();
  const x=mx-r.left,y=my-r.top;
  for(const n of nodes){
    const nx=n.x*r.width, ny=n.y*r.height;
    const dx=x-nx, dy=y-ny;
    if(Math.sqrt(dx*dx+dy*dy)<n.r+10) return n;
  }
  return null;
}
canvas.addEventListener("pointermove",(e)=>{hover=hit(e.clientX,e.clientY);});
canvas.addEventListener("click",(e)=>{
  const n=hit(e.clientX,e.clientY); if(!n) return;
  const box=document.getElementById("detail");
  box.querySelector("[data-title]").textContent=n.id;
  box.querySelector("[data-tag]").textContent=n.tag;
  box.querySelector("[data-text]").textContent=n.text;
  box.style.display="block"; toast("NODE: "+n.id);
});
document.getElementById("closeDetail").addEventListener("click",()=>document.getElementById("detail").style.display="none");
