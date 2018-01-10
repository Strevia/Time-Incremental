function getCookieValue(a) {
    var b = document.cookie.match('(^|;)\\s*' + a + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
}
  var sec;
var secPerSec;
var secPrice;
var tick;
var min;
var minPrice;
var minBuild;
var hou;
var houPrice;
var houBuild;
var time;
var day;
var dayPrice;
var dayBuild;
var manualHou;
var secondGain;
var accelDouble;
var manualMin;
var manualSecIncrease;
function initialize(){
sec = 1;
secPerSec = 0;
secPrice = 1;
tick = 1000/20;
min = 0;
minPrice = 1;
minBuild = 0;
hou = 0;
houPrice = 1;
houBuild = 0;
time = 0;
day = 0;
dayPrice = 1;
dayBuild = 0;
manualHou = 0
secondGain = true;
accelDouble = true;
manualMin = 0;
}
var x = getCookieValue("everything").split(',');
if(x.length === 1){
  initialize()
}
else {
  var sec = parseFloat(x[0])
  var secPerSec = parseFloat(x[1]);
  var secPrice = parseFloat(x[2]);
  var tick = 1000/20;
  var min = parseFloat(x[3]);
  var minPrice = parseFloat(x[4]);
  var minBuild = parseFloat(x[5]);
  var hou = parseFloat(x[6]);
  var houPrice = parseFloat(x[7]);
  var houBuild = parseFloat(x[8]);
  var time = parseFloat(x[9]);
  var day = parseFloat(x[10]);
  var dayPrice = parseFloat(x[11]);
  var dayBuild = parseFloat(x[12]);
  var manualHou = parseFloat(x[13]);
  var secondGain = x[14] == 'true';
  var accelDouble = x[15] == 'true';
  var manualMin = parseFloat(x[16]);
}
setInterval(function(){
  document.cookie = "everything="+[sec, secPerSec,secPrice,min,minPrice,minBuild,hou,houPrice,houBuild,time,day,dayPrice,dayBuild,manualHou, secondGain, accelDouble, manualMin].toString();
  time++;
  secPerSec = secPerSec + minBuild*2/tick;
  sec = sec + secPerSec*2/tick;
  minBuild = minBuild + houBuild*2/tick;
  houBuild = houBuild +dayBuild*2/tick;
  manualSecIncrease = Math.floor((accelDouble+1)**(manualMin));
  document.getElementById("seconds").innerHTML = Math.round(sec);
  document.getElementById("secPerSecPrice").innerHTML = secPrice;
  document.getElementById("secPerSec").innerHTML = Math.round(secPerSec);
  document.getElementById("minutes").innerHTML = Math.round(min);
  document.getElementById("minPerSecPrice").innerHTML = Math.round(minPrice);
  document.getElementById("minBuilds").innerHTML = Math.round(minBuild);
  document.getElementById("hours").innerHTML = Math.round(hou);
  document.getElementById("houPerSecPrice").innerHTML = Math.round(houPrice);
  document.getElementById("houBuilds").innerHTML = Math.round(houBuild);
  document.getElementById("days").innerHTML = Math.round(day);
  document.getElementById("dayPerSecPrice").innerHTML = Math.round(dayPrice);
  document.getElementById("dayBuilds").innerHTML = Math.round(dayBuild);
  document.getElementById("dayTime").innerHTML = Math.floor(time/1728000);
  document.getElementById("hourTime").innerHTML = Math.floor(time/72000 % 24);
  document.getElementById("minTime").innerHTML = Math.floor(time/(1200) % 60);
  document.getElementById("secondTime").innerHTML = Math.floor(time/20 % 60);
  document.getElementById("manualSeconds").innerHTML = manualSecIncrease;
  if (!(sec >= 30 || minBuild > 0 || min > 0)){
    document.getElementById("numberMin").style.display = "none";
    document.getElementById("minButton").style.display = "none";
    //document.getElementById("minUpgrade").style.display = "none";
  }
  else{
    document.getElementById("numberMin").style.display = "block";
    document.getElementById("minButton").style.display = "block";
    if(!accelDouble){
      //document.getElementById("minUpgrade").style.display = "block"
    }
    else {
      //document.getElementById("minUpgrade").style.display = "none"
    }
  }
  if (!(min >= 30 || houBuild > 0 || hou > 0)){
    document.getElementById("numberHour").style.display = "none";
    document.getElementById("hourButton").style.display = "none";
    //document.getElementById("breakSeconds").style.display = "none";
  }
  else{
    document.getElementById("numberHour").style.display = "block";
    document.getElementById("hourButton").style.display = "block";
    if (!secondGain){
      //document.getElementById("breakSeconds").style.display = "block";
    }
    else{
      //document.getElementById("breakSeconds").style.display = "none";
    }
  }
  if (!(hou >= 24 || dayBuild > 0 || day > 0)){
    document.getElementById("numberDay").style.display = "none";
    document.getElementById("dayButton").style.display = "none";
  }
  else{
    document.getElementById("numberDay").style.display = "block";
    document.getElementById("dayButton").style.display = "block";
  }
  if (sec >= (60+manualHou*secondGain*60)){
    sec = 1;
    secPrice = 1;
    secPerSec = 0;
    min = min + manualHou*secondGain + 1;
  }
  if (min >= 60){
    min = 0
    minPrice = 1;
    minBuild = 0;
    hou = hou + 1;
    manualMin = 0;
  }
  if (hou >= 24){
    hou = 0;
    houPrice = 1;
    houBuild = 0;
      manualHou = 0;
    day++;
  }
}, tick);
