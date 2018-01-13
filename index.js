function openTab(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}
 document.getElementById("defaultTab").click(); 
 var sec;
  var secPerSec;
  var secPrice;
  var tick = 50;
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
 var week;
 var weekShown;
 var monthsUnlocked;
 var month;
 var secondsEarned;
 var multiplier;
 var increased;
 var secLimit;
 var config;
 var saveFile;
 var secAutoOn;
 var minAutoOn;
 var houAutoOn;
 var timer;
 var realTime;
 var startingTime = -62167201199300;
 var halfDay;
 var yearsShown;
 var year;
 var manualDay;
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
 manualHou = 0;
 secondGain = true;
 accelDouble = true;
 manualMin = 0;
 week = 0;
 weekShown = false;
 monthsUnlocked = false;
 month = 0;
 secondsEarned = 0;
 multiplier = false;
 increased = false;
 config = false;
 secAutoOn = false;
 minAutoOn = false;
 houAutoOn = false;
 timer = false;
 realTime = -62167201199300;
 halfDay = false;
 yearsShown = false;
 year = 0;
 manualDay = 0;
 document.getElementById("defaultTab").click()
  }
function loadGame(saveInput){
   x = saveInput
   sec = parseFloat(x[0]) || 1;
   secPerSec = parseFloat(x[1]) || 0;
   secPrice = parseFloat(x[2]) || 1;
   min = parseFloat(x[3]) || 0;
   minPrice = parseFloat(x[4]) || 1;
   minBuild = parseFloat(x[5]) || 0;
   hou = parseFloat(x[6]) || 0;
   houPrice = parseFloat(x[7]) || 1;
   houBuild = parseFloat(x[8]) || 0;
   time = parseFloat(x[9]) || 0;
   day = parseFloat(x[10]) || 0;
   dayPrice = parseFloat(x[11]) || 1;
   dayBuild = parseFloat(x[12]) || 0;
   manualHou = parseFloat(x[13]) || 0;
   secondGain = x[14] === 'true';
    accelDouble = x[15] === 'true';
    manualMin = parseFloat(x[16]) || 0;
    week = parseFloat(x[17]) || 0;
    weekShown = x[18] === 'true';
    monthsUnlocked = x[19] === 'true';
    month = parseFloat(x[20]) || 0;
    secondsEarned = parseFloat(x[21]) || 0;
    multiplier = x[22] === 'true';
    increased = x[23] === 'true';
    config = x[24] === 'true';
    secAutoOn = x[25] === 'true';
    minAutoOn = x[26] === 'true';
    houAutoOn = x[27] === 'true';
    timer = x[28] === 'true';
    realTime = parseFloat(x[29]);
    halfDay = x[30] === 'true';
    yearsShown = x[31] === 'true';
    year = parseFloat(x[32]) || 0;
    manualDay = parseFloat(x[33]) || 0;
}
x = localStorage.getItem("everything");
if (localStorage.getItem("everything") === null){
initialize();
}
else {
  loadGame((x.split(',')));
}

 
 function resetGame() {
   if (confirm('Are you sure you want to reset all progress?')) {
     initialize();
   }
 }
 
 function buySecondsGenerator() {
   if (sec >= secPrice) {
     sec = sec - secPrice;
     secPerSec += manualSecIncrease;
    secPrice = secPrice*2;
   }
 }

 function buyMinutesGenerator() {
   if (min >= minPrice) {
     min -= minPrice;
     minBuild = minBuild+ 1;
     minPrice = minPrice*2;
     manualMin+=1;
   }
 }
 
 function buyHoursGenerator() {
   if (hou >= houPrice) {
     hou = hou - houPrice;
     houBuild = houBuild+ 1;
     houPrice = houPrice*2;
     manualHou++;
   }
 }
 
 function buyDaysGenerator() {
   if (day >= dayPrice){
     day = day - dayPrice;
     dayBuild = dayBuild+ 1;
     dayPrice = dayPrice*2;
     manualDay++;
   }
 }
  function buyCalendar() {
    if (week >= 4){
      week -= 4;
      monthsUnlocked = true;
    }
  }
  function buyMonth() {
    if (day >= parseFloat(calD.innerHTML)){
      day -= parseFloat(calD.innerHTML)
      month++;
    }
  }
  function multiplierBuy() {
    if (week >= 1 && !multiplier) {
      week-=1
      multiplier = true;
    }
  }
  function increaseLimit() {
    if (week >= 2 && !increased){
      week -= 2
      increased = true;
    }
  }
  function getConfig() {
    if (!config){
      config = true;
    }
  }
  function copySave(){
    prompt("Save Data:",saveFile)
    
  }
  function importSave(){
    try {
      importing = prompt("Put Save Data: ")
      importing = atob(importing)
      loadGame(importing.split(','))
    }
    catch(err){
      document.getElementById("defaultTab").click()
    }
  }
  function buyHouAuto(){
    if (week >= 2){
      week -= 2
      houAutoOn = true
    }
  }
  function buyMinAuto(){
    if (week >= 3){
      week -= 3
      minAutoOn = true
    }
  }
  function buySecAuto(){
    if (week >= 4){
      week -= 4;
      secAutoOn = true
    }
  }
  function buyTimer(){
    if (week >= 2){
      week -= 2;
      timer = true
    }
  }
  function halfDayBuy(){
    if (week >= 4){
      week -= 4
      halfDay = true
    }
  }
  setInterval(function(){
    localStorage.setItem("everything",[sec, secPerSec,secPrice,min,minPrice,minBuild,hou,houPrice,houBuild,time,day,dayPrice,dayBuild,manualHou, secondGain, accelDouble, manualMin, week, weekShown, monthsUnlocked, month, secondsEarned, multiplier, increased, config, secAutoOn, minAutoOn, houAutoOn, timer, realTime, halfDay, yearsShown, year, manualDay].toString());
    saveFile = btoa(localStorage.getItem("everything"))
    time++;
    realTime = new Date(secondsEarned*20+startingTime);
    secPerSec += (minBuild*2+(multiplier*Math.log(secondsEarned) || 0))/tick;
    secondsEarned += secPerSec
   sec += (secPerSec*2)/tick;
   minBuild = minBuild + houBuild*2/tick;
   houBuild +=(dayBuild*2*Math.pow(1.5,month))/tick;
   dayBuild += year*2/tick
   manualSecIncrease = Math.floor(Math.pow(2,manualMin));
   secLimit = 60 + (manualHou*secondGain*60) + (increased *manualMin * 60)+(60*halfDay)+(120*manualDay);
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
   document.getElementById("weeks").innerHTML = week;
   document.getElementById("yearCounter").innerHTML = year;
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
   if (!weekShown){
     document.getElementById("defaultTab").style.display = "none";
     document.getElementById("weekTab").style.display = "none";
   }
   else {
     document.getElementById("defaultTab").style.display = "inline-block"
     document.getElementById("weekTab").style.display = "inline-block"
   }
   if (monthsUnlocked){
     document.getElementById("calendarButton").style.background = "#7F7F7F"
     document.getElementById("monthBuyer").style.display = "block"
   }
   else {
     document.getElementById("monthBuyer").style.display = "none"
     document.getElementById("calendarButton").style.background = "#D0D0D0"
   }
   if (multiplier){
     document.getElementById("buyMultiplier").style.background = "#7F7F7F"
   }
   else {
     document.getElementById("buyMultiplier").style.background = "#D0D0D0"
   }
   if (!config){
     document.getElementById("configTab").style.display = "none"
     document.getElementById("configButton").style.background = "#D0D0D0"
   }
   else {
     document.getElementById("configTab").style.display = "inline-block"
     document.getElementById("configButton").style.background = "#7F7F7F"
   }
   if (increased){
     document.getElementById("limitIncreaseButton").style.background = "#7F7F7F"
   }
   else {
     document.getElementById("limitIncreaseButton").style.background = "#D0D0D0"
   }
   if (houAutoOn){
     document.getElementById("houAuto").style.background = "#7F7F7F"
     buyHoursGenerator()
   }
   else{
     document.getElementById("houAuto").style.background = "#D0D0D0"
   }
   if (minAutoOn){
     document.getElementById("minAuto").style.background = "#7F7F7F"
     buyMinutesGenerator()
   }
   else{
     document.getElementById("minAuto").style.background = "#D0D0D0"
   }
   if (secAutoOn){
     document.getElementById("secAuto").style.background = "#7F7F7F"
     buySecondsGenerator()
   }
   else {
     document.getElementById("secAuto").style.background = "#D0D0D0"
   }
   if (halfDay){
     document.getElementById("halfDayBuyer").style.background = "#7F7F7F"
   }
   else {
     document.getElementById("halfDayBuyer").style.background = "#D0D0D0"
   }
   if (timer){
     document.getElementById("timerBuyer").style.background = "#7F7F7F"
     cal = document.getElementById("realMonth")
     mon = realTime.getMonth()
     switch (mon){
    case 0:
      cal.innerHTML = "January"
      break;
    case 1:
      cal.innerHTML = "February"
      break;
    case 2:
      cal.innerHTML = "March"
      break;
    case 3:
      cal.innerHTML = "April"
      break;
    case 4:
      cal.innerHTML = "May"
      break;
    case 5:
      cal.innerHTML = "June"
      break;
    case 6:
      cal.innerHTML = "July"
      break;
    case 7:
      cal.innerHTML = "August"
      break;
    case 8:
      cal.innerHTML = "September"
      break;
    case 9:
      cal.innerHTML = "October"
      break;
    case 10:
      cal.innerHTML = "November"
    case 11:
      cal.innerHTML = "December"
   }
   document.getElementById("realDate").innerHTML = realTime.getDate()
   document.getElementById("realYear").innerHTML = "Year " + (realTime.getYear()+1900).toString()
   document.getElementById("realHour").innerHTML = ('0'+realTime.getHours()).slice(-2)
   document.getElementById("realMinute").innerHTML = ('0'+realTime.getMinutes()).slice(-2)
   document.getElementById("realSecond").innerHTML = ('0'+realTime.getSeconds()).slice(-2)
   document.getElementById("timerTab").style.display = "block"
   }
   else {
     document.getElementById("timerBuyer").style.background = "#D0D0D0"
     document.getElementById("timerTab").style.display = "none";
   }
   if (yearsShown){
     document.getElementById("yearTab").style.display = "inline-block"
   }
   else {
     document.getElementById("yearTab").style.display = "none"
   }
   cal = document.getElementById("currentMonth")
   calD = document.getElementById("monthDays")
   switch (month){
    case 0:
      cal.innerHTML = "January"
      calD.innerHTML = 31
      break;
    case 1:
      cal.innerHTML = "February"
      calD.innerHTML = 28
      break;
    case 2:
      cal.innerHTML = "March"
      calD.innerHTML = 31
      break;
    case 3:
      cal.innerHTML = "April"
      calD.innerHTML = 30
      break;
    case 4:
      cal.innerHTML = "May"
      calD.innerHTML = 31
      break;
    case 5:
      cal.innerHTML = "June"
      calD.innerHTML = 30
      break;
    case 6:
      cal.innerHTML = "July"
      calD.innerHTML = 31
      break;
    case 7:
      cal.innerHTML = "August"
      calD.innerHTML = 31
      break;
    case 8:
      cal.innerHTML = "September"
      calD.innerHTML = 30
      break;
    case 9:
      cal.innerHTML = "October"
      calD.innerHTML = 31
      break;
    case 10:
      cal.innerHTML = "November"
      calD.innerHTML = 30
    case 11:
      cal.innerHTML = "December"
      calD.innerHTML = 31
   }
   if (sec >= (secLimit)){
     sec = 1;
     secPrice = 1;
     secPerSec = 0;
     min += secLimit/60
   }
   if (min >= 60){
     min = 0
     minPrice = 1;
     minBuild = 0;
     hou = hou + 1;
     manualMin = 0;
   }
   if (hou >= 24/(halfDay+1)){
     hou = 0;
     houPrice = 1;
     houBuild = 0;
       manualHou = 0;
     day++;
   }
   if (month >= 12){
     month = 0;
     dayPrice = 1;
     dayBuild = 0;
     manualDay = 0;
     year++;
     yearsShown = true;
   }
   if (day >= 365){
     day = 0;
     dayPrice = 1;
     dayBuild = 0;
     manualDay = 0;
     year++;
     yearsShown = true;
   }
 }, tick);
