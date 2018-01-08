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
var time = 0;
var day = 0;
var dayPrice = 1;
var dayBuild = 0;
var tempTime = 0;
setInterval(function(){
  time++;
  tempTime = time;
  secPerSec = secPerSec + minBuild*2/tick;
  sec = sec + secPerSec*2/tick;
  minBuild = minBuild + houBuild*2/tick;
  houBuild = houBuild +dayBuild*2/tick;
  minsPerMin = 60/((-1 + Math.sqrt(1-4*minBuild*-60))/(minBuild));
  document.getElementById("seconds").innerHTML = Math.round(sec);
  document.getElementById("secPerSecPrice").innerHTML = secPrice;
  document.getElementById("secPerSec").innerHTML = Math.round(secPerSec);
  document.getElementById("minutes").innerHTML = min;
  document.getElementById("minPerSecPrice").innerHTML = minPrice;
  document.getElementById("minBuilds").innerHTML = Math.round(minBuild);
  document.getElementById("hours").innerHTML = hou;
  document.getElementById("houPerSecPrice").innerHTML = houPrice;
  document.getElementById("houBuilds").innerHTML = Math.round(houBuild);
  document.getElementById("days").innerHTML = day;
  document.getElementById("dayPerSecPrice").innerHTML = dayPrice;
  document.getElementById("dayBuilds").innerHTML = Math.round(dayBuild);
  document.getElementById("dayTime").innerHTML = Math.floor(time/1728000);
  document.getElementById("hourTime").innerHTML = Math.floor(time/72000 % 24);
  document.getElementById("minTime").innerHTML = Math.floor(time/(1200) % 60);
  document.getElementById("secondTime").innerHTML = Math.floor(time/20 % 60);
  if (!(sec >= 30 || minBuild > 0 || min > 0)){
    document.getElementById("numberMin").style.display = "none";
    document.getElementById("minButton").style.display = "none";
  }
  else{
    document.getElementById("numberMin").style.display = "block";
    document.getElementById("minButton").style.display = "block";
  }
  if (!(min >= 30 || houBuild > 0 || hou > 0)){
    document.getElementById("numberHour").style.display = "none";
    document.getElementById("hourButton").style.display = "none";
  }
  else{
    document.getElementById("numberHour").style.display = "block";
    document.getElementById("hourButton").style.display = "block";
  }
  if (!(hou >= 24 || dayBuild > 0 || day > 0)){
    document.getElementById("numberDay").style.display = "none";
    document.getElementById("dayButton").style.display = "none";
  }
  else{
    document.getElementById("numberDay").style.display = "block";
    document.getElementById("dayButton").style.display = "block";
  }
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
  if (hou >= 24){
    hou = 0;
    houPrice = 1;
    houBuild = 0;
    day++;
  }
}, tick);