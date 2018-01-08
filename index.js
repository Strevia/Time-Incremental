var sec = 1;
var secPerSec = 0;
var secPrice = 1;
var tick = 1000/20;
var min = 0;
var minPrice = 1;
var minBuild = 0;
var hou = 0;
var houPrice = 1;
var houBuild = 0;
setInterval(function(){ 
  secPerSec = secPerSec + minBuild*2/tick
  sec = sec + secPerSec*2/tick;
  minBuild = minBuild + houBuild*2/tick
  document.getElementById("seconds").innerHTML = Math.round(sec);
  document.getElementById("secPerSecPrice").innerHTML = secPrice;
  document.getElementById("secPerSec").innerHTML = Math.round(secPerSec);
  document.getElementById("minutes").innerHTML = min;
  document.getElementById("minPerSecPrice").innerHTML = minPrice;
  document.getElementById("minBuilds").innerHTML = Math.round(minBuild);
  document.getElementById("hours").innerHTML = hou;
  document.getElementById("houPerSecPrice").innerHTML = houPrice;
  document.getElementById("houBuilds").innerHTML = Math.round(houBuild);
  if (sec >= 60){
    sec = 1;
    secPrice = 1;
    secPerSec = 0;
    min = min + 1;
  }
  if (min >= 60){
    min = 0
    minPrice = 1;
    minBuild = 0;
    hou = hou + 1
  }
}, tick);