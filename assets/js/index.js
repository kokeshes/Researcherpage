window.addEventListener("keydown", (e)=>{
  const now = performance.now();

  if(e.key === "Tab"){
    e.preventDefault(); // ★重要：フォーカス移動を止める

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
    e.preventDefault(); // ★Enterによる誤クリック防止

    localStorage.setItem("layer_unlocked", "1");
    if(hiddenLink) hiddenLink.style.display = "block";
    toast("LAYER UNLOCKED");

    primed = false;
    tabCount = 0;
    windowStart = now;
  }
});
