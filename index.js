// eslint-disable-next-line no-unused-vars
function openTab(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName('tabcontent');
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = 'none';
  }
  tablinks = document.getElementsByClassName('tablinks');
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(' active', '');
  }
  document.getElementById(cityName).style.display = 'block';
  evt.currentTarget.className += ' active';
}

const defaultTabEl = document.getElementById('defaultTab');
const secondsEl = document.getElementById('seconds');
const secPerSecPriceEl = document.getElementById('secPerSecPrice');
const secPerSecEl = document.getElementById('secPerSec');
const minutesEl = document.getElementById('minutes');
const minPerSecPriceEl = document.getElementById('minPerSecPrice');
const minBuildsEl = document.getElementById('minBuilds');
const hoursEl = document.getElementById('hours');
const houPerSecPriceEl = document.getElementById('houPerSecPrice');
const houBuildsEl = document.getElementById('houBuilds');
const daysEl = document.getElementById('days');
const dayPerSecPriceEl = document.getElementById('dayPerSecPrice');
const dayBuildsEl = document.getElementById('dayBuilds');
const dayTimeEl = document.getElementById('dayTime');
const hourTimeEl = document.getElementById('hourTime');
const minTimeEl = document.getElementById('minTime');
const secondTimeEl = document.getElementById('secondTime');
const manualSecondsEl = document.getElementById('manualSeconds');
const weeksEl = document.getElementById('weeks');
const yearCounterEl = document.getElementById('yearCounter');
const cal = document.getElementById('currentMonth');
const calD = document.getElementById('monthDays');
const numberMinEl = document.getElementById('numberMin');
const minButtonEl = document.getElementById('minButton');
const numberHourEl = document.getElementById('numberHour');
const hourButtonEl = document.getElementById('hourButton');
const numberDayEl = document.getElementById('numberDay');
const dayButtonEl = document.getElementById('dayButton');
const weekTabEl = document.getElementById('weekTab');
const calendarButtonEl = document.getElementById('calendarButton');
const monthBuyerEl = document.getElementById('monthBuyer');
const buyMultiplierEl = document.getElementById('buyMultiplier');
const configButtonEl = document.getElementById('configButton');
const configTabEl = document.getElementById('configTab');
const limitIncreaseButtonEl = document.getElementById('limitIncreaseButton');
const houAutoEl = document.getElementById('houAuto');
const minAutoEl = document.getElementById('minAuto');
const secAutoEl = document.getElementById('secAuto');
const halfDayBuyerEl = document.getElementById('halfDayBuyer');
const timerBuyerEl = document.getElementById('timerBuyer');
const realDateEl = document.getElementById('realDate');
const realYearEl = document.getElementById('realYear');
const realHourEl = document.getElementById('realHour');
const realMinuteEl = document.getElementById('realMinute');
const realSecondEl = document.getElementById('realSecond');
const realMonthEl = document.getElementById('realMonth');
const timerTabEl = document.getElementById('timerTab');
const yearTabEl = document.getElementById('yearTab');

let x;

defaultTabEl.click();

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
// var saveFile;
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

function initialize() {
  sec = 1;
  secPerSec = 0;
  secPrice = 1;
  tick = 1000 / 20;
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
  defaultTabEl.click();
}

function loadGame(saveInput) {
  x = saveInput;
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
  realTime = parseFloat(x[29]) || 0;
  halfDay = x[30] === 'true';
  yearsShown = x[31] === 'true';
  year = parseFloat(x[32]) || 0;
  manualDay = parseFloat(x[33]) || 0;
}
x = localStorage.getItem('everythin');
if (localStorage.getItem('everythin') === null) {
  initialize();
} else {
  loadGame((x.split(',')));
}

// eslint-disable-next-line no-unused-vars
function resetGame() {
  if (confirm('Are you sure you want to reset all progress?')) {
    initialize();
  }
}

function buySecondsGenerator() {
  if (sec >= secPrice) {
    sec = sec - secPrice;
    secPerSec += manualSecIncrease;
    secPrice = secPrice * 2;
  }
}

function buyMinutesGenerator() {
  if (min >= minPrice) {
    min -= minPrice;
    minBuild = minBuild + 1;
    minPrice = minPrice * 2;
    manualMin += 1;
  }
}

function buyHoursGenerator() {
  if (hou >= houPrice) {
    hou = hou - houPrice;
    houBuild = houBuild + 1;
    houPrice = houPrice * 2;
    manualHou++;
  }
}

// eslint-disable-next-line no-unused-vars
function buyDaysGenerator() {
  if (day >= dayPrice) {
    day = day - dayPrice;
    dayBuild = dayBuild + 1;
    dayPrice = dayPrice * 2;
    manualDay++;
  }
}

// eslint-disable-next-line no-unused-vars
function buyCalendar() {
  if (week >= 4) {
    week -= 4;
    monthsUnlocked = true;
  }
}

// eslint-disable-next-line no-unused-vars
function buyMonth() {
  if (day >= parseFloat(calD.innerHTML)) {
    day -= parseFloat(calD.innerHTML);
    month++;
  }
}

// eslint-disable-next-line no-unused-vars
function multiplierBuy() {
  if (week >= 1 && !multiplier) {
    week -= 1;
    multiplier = true;
  }
}

// eslint-disable-next-line no-unused-vars
function increaseLimit() {
  if (week >= 2 && !increased) {
    week -= 2;
    increased = true;
  }
}

// eslint-disable-next-line no-unused-vars
function getConfig() {
  if (!config) {
    config = true;
  }
}

// eslint-disable-next-line no-unused-vars
function copySave() {
  const saveFile = btoa(localStorage.getItem('everything'));
  prompt('Save Data:', saveFile);
}

// eslint-disable-next-line no-unused-vars
function importSave() {
  try {
    let importing = prompt('Put Save Data: ');
    importing = atob(importing);
    loadGame(importing.split(','));
  } catch (err) {
    loadGame(localStorage.getItem("everythin").split(','));
  }
}

// eslint-disable-next-line no-unused-vars
function buyHouAuto() {
  if (week >= 2) {
    week -= 2;
    houAutoOn = true;
  }
}

// eslint-disable-next-line no-unused-vars
function buyMinAuto() {
  if (week >= 3) {
    week -= 3;
    minAutoOn = true;
  }
}

// eslint-disable-next-line no-unused-vars
function buySecAuto() {
  if (week >= 4) {
    week -= 4;
    secAutoOn = true;
  }
}

// eslint-disable-next-line no-unused-vars
function buyTimer() {
  if (week >= 2) {
    week -= 2;
    timer = true;
  }
}

// eslint-disable-next-line no-unused-vars
function halfDayBuy() {
  if (week >= 4) {
    week -= 4;
    halfDay = true;
  }
}
setInterval(function () {
  localStorage.setItem('everythin', [sec, secPerSec, secPrice, min, minPrice, minBuild, hou, houPrice, houBuild, time, day, dayPrice, dayBuild, manualHou, secondGain, accelDouble, manualMin, week, weekShown, monthsUnlocked, month, secondsEarned, multiplier, increased, config, secAutoOn, minAutoOn, houAutoOn, timer, realTime, halfDay, yearsShown, year, manualDay].toString());
  // No need to do this every tick, since saveFile is only used when you export. Makes more sense to just generate the string extemporaneously.
  // saveFile = btoa(localStorage.getItem('everything'));
  time++;
  realTime = new Date(secondsEarned * 20 + startingTime);
  secPerSec += (minBuild * 2 + (multiplier * Math.log(secondsEarned) || 0)) / tick;
  secondsEarned += secPerSec;
  sec += (secPerSec * 2) / tick;
  minBuild = minBuild + houBuild * 2 / tick;
  houBuild += (dayBuild * 2 * Math.pow(1.5, month)) / tick;
  dayBuild += year * 2 / tick;
  manualSecIncrease = Math.floor(Math.pow(2, manualMin));
  secLimit = 60 + (manualHou * secondGain * 60) + (increased * manualMin * 60) + (60 * halfDay) + (120 * manualDay);
  secondsEl.innerHTML = Math.round(sec);
  secPerSecPriceEl.innerHTML = secPrice;
  secPerSecEl.innerHTML = Math.round(secPerSec);
  minutesEl.innerHTML = Math.round(min);
  minPerSecPriceEl.innerHTML = Math.round(minPrice);
  minBuildsEl.innerHTML = Math.round(minBuild);
  hoursEl.innerHTML = Math.round(hou);
  houPerSecPriceEl.innerHTML = Math.round(houPrice);
  houBuildsEl.innerHTML = Math.round(houBuild);
  daysEl.innerHTML = Math.round(day);
  dayPerSecPriceEl.innerHTML = Math.round(dayPrice);
  dayBuildsEl.innerHTML = Math.round(dayBuild);
  dayTimeEl.innerHTML = Math.floor(time / 1728000);
  hourTimeEl.innerHTML = Math.floor(time / 72000 % 24);
  minTimeEl.innerHTML = Math.floor(time / (1200) % 60);
  secondTimeEl.innerHTML = Math.floor(time / 20 % 60);
  manualSecondsEl.innerHTML = manualSecIncrease;
  weeksEl.innerHTML = week;
  yearCounterEl.innerHTML = year;
  if (!(sec >= 30 || minBuild > 0 || min > 0)) {
    numberMinEl.style.display = 'none';
    minButtonEl.style.display = 'none';
    //document.getElementById("minUpgrade").style.display = "none";
  } else {
    numberMinEl.style.display = 'block';
    minButtonEl.style.display = 'block';
    if (!accelDouble) {
      //document.getElementById("minUpgrade").style.display = "block"
    } else {
      //document.getElementById("minUpgrade").style.display = "none"
    }
  }
  if (!(min >= 30 || houBuild > 0 || hou > 0)) {
    numberHourEl.style.display = 'none';
    hourButtonEl.style.display = 'none';
    //document.getElementById("breakSeconds").style.display = "none";
  } else {
    numberHourEl.style.display = 'block';
    hourButtonEl.style.display = 'block';
    if (!secondGain) {
      //document.getElementById("breakSeconds").style.display = "block";
    } else {
      //document.getElementById("breakSeconds").style.display = "none";
    }
  }
  if (!(hou >= 24 || dayBuild > 0 || day > 0)) {
    numberDayEl.style.display = 'none';
    dayButtonEl.style.display = 'none';
  } else {
    numberDayEl.style.display = 'block';
    dayButtonEl.style.display = 'block';
  }
  if (!weekShown) {
    defaultTabEl.style.display = 'none';
    weekTabEl.style.display = 'none';
  } else {
    defaultTabEl.style.display = 'inline-block';
    weekTabEl.style.display = 'inline-block';
  }
  if (monthsUnlocked) {
    calendarButtonEl.style.background = '#7F7F7F';
    monthBuyerEl.style.display = 'block';
  } else {
    monthBuyerEl.style.display = 'none';
    calendarButtonEl.style.background = '#D0D0D0';
  }
  if (multiplier) {
    buyMultiplierEl.style.background = '#7F7F7F';
  } else {
    buyMultiplierEl.style.background = '#D0D0D0';
  }
  if (!config) {
    configTabEl.style.display = 'none';
    configButtonEl.style.background = '#D0D0D0';
  } else {
    configTabEl.style.display = 'inline-block';
    configButtonEl.style.background = '#7F7F7F';
  }
  if (increased) {
    limitIncreaseButtonEl.style.background = '#7F7F7F';
  } else {
    limitIncreaseButtonEl.style.background = '#D0D0D0';
  }
  if (houAutoOn) {
    houAutoEl.style.background = '#7F7F7F';
    buyHoursGenerator();
  } else {
    houAutoEl.style.background = '#D0D0D0';
  }
  if (minAutoOn) {
    minAutoEl.style.background = '#7F7F7F';
    buyMinutesGenerator();
  } else {
    minAutoEl.style.background = '#D0D0D0';
  }
  if (secAutoOn) {
    secAutoEl.style.background = '#7F7F7F';
    buySecondsGenerator();
  } else {
    secAutoEl.style.background = '#D0D0D0';
  }
  if (halfDay) {
    halfDayBuyerEl.style.background = '#7F7F7F';
  } else {
    halfDayBuyerEl.style.background = '#D0D0D0';
  }
  if (timer) {
    timerBuyerEl.style.background = '#7F7F7F';
    // cal = document.getElementById('realMonth');
    let mon = realTime.getMonth();
    switch (mon) {
      case 0:
        realMonthEl.innerHTML = 'January';
        break;
      case 1:
        realMonthEl.innerHTML = 'February';
        break;
      case 2:
        realMonthEl.innerHTML = 'March';
        break;
      case 3:
        realMonthEl.innerHTML = 'April';
        break;
      case 4:
        realMonthEl.innerHTML = 'May';
        break;
      case 5:
        realMonthEl.innerHTML = 'June';
        break;
      case 6:
        realMonthEl.innerHTML = 'July';
        break;
      case 7:
        realMonthEl.innerHTML = 'August';
        break;
      case 8:
        realMonthEl.innerHTML = 'September';
        break;
      case 9:
        realMonthEl.innerHTML = 'October';
        break;
      case 10:
        realMonthEl.innerHTML = 'November';
        break;
      case 11:
        realMonthEl.innerHTML = 'December';
    }
    realDateEl.innerHTML = realTime.getDate();
    realYearEl.innerHTML = 'Year ' + (realTime.getYear() + 1900).toString();
    realHourEl.innerHTML = ('0' + realTime.getHours()).slice(-2);
    realMinuteEl.innerHTML = ('0' + realTime.getMinutes()).slice(-2);
    realSecondEl.innerHTML = ('0' + realTime.getSeconds()).slice(-2);
    timerTabEl.style.display = 'block';
  } else {
    timerBuyerEl.style.background = '#D0D0D0';
    timerTabEl.style.display = 'none';
  }
  if (yearsShown) {
    yearTabEl.style.display = 'inline-block';
  } else {
    yearTabEl.style.display = 'none';
  }
  // let cal = document.getElementById('currentMonth');
  // calD = document.getElementById('monthDays');
  switch (month) {
    case 0:
      cal.innerHTML = 'January';
      calD.innerHTML = 31;
      break;
    case 1:
      cal.innerHTML = 'February';
      calD.innerHTML = 28;
      break;
    case 2:
      cal.innerHTML = 'March';
      calD.innerHTML = 31;
      break;
    case 3:
      cal.innerHTML = 'April';
      calD.innerHTML = 30;
      break;
    case 4:
      cal.innerHTML = 'May';
      calD.innerHTML = 31;
      break;
    case 5:
      cal.innerHTML = 'June';
      calD.innerHTML = 30;
      break;
    case 6:
      cal.innerHTML = 'July';
      calD.innerHTML = 31;
      break;
    case 7:
      cal.innerHTML = 'August';
      calD.innerHTML = 31;
      break;
    case 8:
      cal.innerHTML = 'September';
      calD.innerHTML = 30;
      break;
    case 9:
      cal.innerHTML = 'October';
      calD.innerHTML = 31;
      break;
    case 10:
      cal.innerHTML = 'November';
      calD.innerHTML = 30;
      break;
    case 11:
      cal.innerHTML = 'December';
      calD.innerHTML = 31;
  }
  if (sec >= (secLimit)) {
    sec = 1;
    secPrice = 1;
    secPerSec = 0;
    min += secLimit / 60;
  }
  if (min >= 60) {
    min = 0;
    minPrice = 1;
    minBuild = 0;
    hou = hou + 1;
    manualMin = 0;
  }
  if (hou >= 24 / (halfDay + 1)) {
    hou = 0;
    houPrice = 1;
    houBuild = 0;
    manualHou = 0;
    day++;
  }
  if (month >= 12) {
    month = 0;
    dayPrice = 1;
    dayBuild = 0;
    manualDay = 0;
    year++;
    yearsShown = true;
  }
  if (day >= 365) {
    day = 0;
    dayPrice = 1;
    dayBuild = 0;
    manualDay = 0;
    year++;
    yearsShown = true;
  }
}, tick);
