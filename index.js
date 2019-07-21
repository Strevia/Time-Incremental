var clock = 0;

var timeDefault = {
	
	seconds: {
		
		current: 1,
		income: 0,
		cost: 1,
		
		manual: 0,
		
		max: [60, 'minutes'],
		
		gain: true,
		
		total : 0,
		
		entry : false
	},
	
	played: 0,
	
	printed: [],
	
	tick: 50,
	
	upgrades: {
  config : {
    cost : 0,
    bought : false,
  },
  calendar : {
    cost : 4,
    bought : false,
  },
  halfDay : {
    cost: 4,
    bought : false,
  },
  timer : {
    cost: 2,
    bought: false
  },
  limitIncrease :{
    cost: 2,
    bought : false,
  },
  //minuteAuto :{
    //cost: 3,
    //bought : false,
  //},
  //secondAuto :{
    //cost: 4,
    //bought : false,
  //},
  //hourAuto :{
    //cost: 2,
    //bought : false,
  //},
  multiplier: {
    cost: 1,
    bought : false,
  },
  doubleManualSecs : {
    cost: 4,
    bought: false,
  },
},
},
	time,

	sessionStart = Date.now(),
	
	runGame = true, // for debug
	version = [0, 3, 0],
	
		cache = {},
		
	UIUpdateList = [
		
		'seconds.current',
		'seconds.cost',
		'seconds.income',
		'seconds.manual',
		
		'minutes.current',
		'minutes.generators',
		'minutes.cost',
		
		'hours.current',
		'hours.generators',
		'hours.cost',
		
		'days.current',
		'days.generators',
		'days.cost',
		
		'years.current',
		'years.generators',
		
		'weeks.current',
		
		'upgrades.config',
		'upgrades.calendar',
		'upgrades.halfDay',
		'upgrades.timer',
		'upgrades.limitIncrease',
		//'upgrades.minuteAuto',
		//'upgrades.secondAuto',
		//'upgrades.hourAuto',
		'upgrades.multiplier',
    'upgrades.doubleManualSecs',
    
		'months.name',
		'months.cost',
		
		'decades.current',
		'decades.generators',
		'decades.cost',
		
		'centuries.current',
		'centuries.generators',
		'centuries.cost',
		
		'millenium.current',
		'millenium.generators',
		'millenium.cost',
		
		'cosmodecade.current',
		'cosmodecade.cost',
	],
	
	units = ['minutes', 'hours', 'days', 'years', 'decades', 'centuries', 'millenium', 'weeks', 'months', 'cosmodecade'];
	unitsComplete = ['seconds', ...units],
	timeUnits = ['seconds', 'minutes', 'hours', 'days'];
	unitsMax = { minutes: [60, 'hours'], hours: [24, 'days'], days: [365, 'years'], months: [12, 'years'], decades : [10, 'centuries'], centuries: [10, 'millenium']};

units.forEach(unit => timeDefault[unit] = {
	
	current: 0,
	generators: 0,
	cost: 1,
	
	manual: 0,
	
	max: unitsMax[unit],
  showing : false,
	
});

initialize();

function onTick () {
	now = Date.now();
	clock += time.tick;
	var dif = now - sessionStart - clock;
	
	save();
	
	time.played++;
	gameLogic();
	 while(dif >= time.tick) {
         gameLogic();
         clock += time.tick;
         dif -= time.tick;
    }
	updateUI();
	
};

// GAME FUNCTIONS

function initialize () {
	
	time = deepCopy(timeDefault);
	
	load();
	
	runGame && requestInterval(onTick, time.tick);
	
};

function save () {
	
	let timeSaveCopy = deepCopy(time);
	timeSaveCopy.version = version;
	timeSaveCopy.played += timeInSession();
	
	localStorage.setItem('savedata', JSON.stringify(timeSaveCopy));

};

function load () {
  
  document.getElementById("defaultTab").click()
	
	let saveData = JSON.parse(localStorage.getItem('savedata'));
	
	if (saveData !== null) {
		
		if (saveData.version[1] !== version[1] || saveData.version[0] !== version[0]) {
		
			console.log('Time Incremental includes breaking changes since your last save. Starting from scratch');
			
			return;
			
		}
		
		for (let key in saveData){
		  time[key] = saveData[key]
		}
		
	};
	
};

function removeSaveData () { localStorage.removeItem('savedata') };
	
function resetUnit (unit) { time[unit] = deepCopy(timeDefault[unit]) };

function resetGame () {
	
	if (confirm('Are you sure you want to reset all progress?')) {
		
		removeSaveData();
		
		initialize();
		
	};
	
};

function exportGame() {
  prompt('Save:', btoa(localStorage.getItem('savedata')));
}

function importGame() {
  Object.assign(time,JSON.parse(atob(prompt('Put save here (WILL OVERWRITE CURRENT SAVE):'))))
}

function buy (unit) {
  
  if (!unit.includes('upgrades')) {
	
	if (time[unit].current >= time[unit].cost) {
		
		time[unit].current -= time[unit].cost;
		
		time[unit].cost *= 2;
		
		if (unit === 'seconds') {
		
			time.seconds.income += time.seconds.manual
			
		} else {
			
			time[unit].generators++;		
			
			time[unit].manual++;
			
			if (!time[unit].entryGen){
			  //addEntry("Extraordinary! The pieces are producing more and more!", true)
			  time[unit].entryGen = true;
			}
			
		};
		
	};
  }
  else {
    unit = unit.replace('upgrades.','')
    if (time.weeks.current >= time.upgrades[unit].cost && !time.upgrades[unit].bought){
      time.weeks.current -= time.upgrades[unit].cost;
      time.upgrades[unit].bought = true;
    }
  }
	
	
	
};

function updateUI () {
	
	UIUpdateList.forEach(element => { 
	  if (cache[element] !== get(time, element)){
	  if (!element.includes('upgrades')) {
	    if (!isNaN(parseInt(get(time, element)))){
	    query('.' + element).innerHTML = parseInt(get(time, element));
	      cache[element] = parseInt(get(time, element))
	    }
	    else {
	    query('.' + element).innerHTML = get(time, element)}
	    	    cache[element] = get(time, element)
	  }
	  else {
	    	    cache[element] = get(time, element) + ".bought"
	    if (!get(time, element + ".bought")){
	      query('.' + element).style.background = "#D0D0D0"
	    }
	    else {
	      query('.' + element).style.background = "#7F7F7F"
	    }
	    }
	  }
	}
	  );
	query('.months.block').style.display = time.upgrades.calendar.bought ? "block" : "none"
	
	query('.config').style.display = time.upgrades.config.bought ? 'inline-block' : 'none'
	
	query('.timer').style.display = time.upgrades.timer.bought ? 'inline-block' : 'none'
	
	query('.cosmoInfo').style.display = time.cosmodecade.current >= 1 ? 'none' : 'block'
	
	if (time.upgrades.timer.bought){
	  time.timerTime =  new Date(((time.seconds.current)+(time.minutes.current*60)+((time.hours.current+5)*3600)+((time.days.current)*3600*24)+(time.years.current*3600*24*365)+(time.weeks.current*3600*24*7)+(time.decades.current*3600*24*365*10)+(time.centuries.current*3600*24*365*100)+(time.millenium.current*3600*24*365*1000))*1000)
	  time.timerTime.setMonth(time.timerTime.getMonth()+time.months.current)
	  query('.realYear').innerHTML = time.timerTime.getYear()-70
	  query('.realMonth').innerHTML = (getMonth(time.timerTime.getMonth()))[0]
	  query('.realDate').innerHTML = time.timerTime.getDate()
	  query('.realHour').innerHTML = time.timerTime.getHours()
	  query('.realMinute').innerHTML = ('0' + time.timerTime.getMinutes()).slice(-2)
	  query('.realSecond').innerHTML = ('0' + time.timerTime.getSeconds()).slice(-2)
	}
	
	timeCache = deepCopy(time);
	
	query('.seconds.ending').innerHTML = time.seconds.manual > 1 ? 's' : '';
	
	//setUITimePlayed(); // includes plural endings
	
	unitsComplete.forEach((unit, index) => {
	  let unitMoreThanHalf;
	  try {
		unitMoreThanHalf = time[unit].current >= time[unit].max[0] / 2}
			  catch(e){unitMoreThanHalf = false;}	
			let nextUnit = units[index]
			let nextUnitPresent = nextUnit && time[nextUnit].current + time[nextUnit].generators > 0;
			get(time, unit).showing = unitMoreThanHalf || nextUnitPresent || get(time, unit).showing
		
		if (get(time, unit).showing) showUnitBlock(nextUnit);
	});
	
};

function setUITimePlayed () {
	
	let played = time.played + timeInSession(),
		
		timeParse = [
			
			Math.floor((played / (1000/time.tick)) % 60),		/* seconds */
			Math.floor(played / 20 / 60 % 60),		/* minutes */
			Math.floor(played / 20/ 3600 % 24),	/* hours */
			Math.floor(played / 20 / 3600 / 24)		/* days */
			
		];
	
	timeUnits.forEach((unit, index) => {
		
		query('.' + unit + '.played').innerHTML = timeParse[index];
		
		let ending = timeParse[index] > 1 || timeParse[index] === 0 ? 's' : '';
		
		query('.' + unit + '.played.ending').innerHTML = ending;
	});
	
	
};

// UTILITY FUNCTIONS

function deepCopy (source) { return JSON.parse(JSON.stringify(source)) };

function query (element) { return document.querySelector(element) };

function showUnitBlock (unit) { query('.' + unit + '.block').classList.add('shown') };

function requestInterval (fn, delay) {
	
	let requestAnimFrame = (function () {
		
		return window.requestAnimationFrame || function (callback, element) {
			
			window.setTimeout(callback, 1000 / 60);
			
    	};
		
	})(),
		
		start = Date.now(),
		handle = {};
	
	function loop() {
		
		handle.value = requestAnimFrame(loop);
		
		let current = Date.now(),
			delta = current - start;
		
		if (delta >= delay) {
			
			fn();
			
			start = Date.now();
			
		};
		
	};
	
	handle.value = requestAnimFrame(loop);
	
	return handle;
	
};

function get (obj, props) {
	
	if (typeof props == 'string') { props = props.split('.') };
	
	if (typeof props == 'symbol') { props = [props] };
	
	var prop;
	
	while ((prop = props.shift())) {
		
		obj = obj[prop];
		
		if (!obj) { return obj };
		
	};
	
	return obj;
	
};
function timeInSession () { return (Date.now() - sessionStart) / 1000 };

function getMonth(mon){
  switch (mon % 12) {
      case 0:
        return ['January', 31];
      case 1:
        return ['February', 28];
      case 2:
        return ['March', 31];
      case 3:
        return ['April', 30];
      case 4:
        return ['May', 31];
      case 5:
        return ['June', 30];
      case 6:
        return ['July', 31];
      case 7:
        return ['August', 31];
      case 8:
        return ['September', 30];
      case 9:
        return ['October', 31];
      case 10:
        return ['November', 30];
      case 11:
        return ['December', 31];
    }
}

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
function addEntry(text, printTime){
  let toPrint = text + '<br>' + '<br>' + query('.diaryContent').innerHTML
  if (printTime){
  toPrint = formatSeconds(time.played/20) + "&ensp;" + toPrint}
  query('.diaryContent').innerHTML =  toPrint
  if (printTime){
  time.printed = time.printed.concat(toPrint)}
}

function formatSeconds(seconds){
  let date = new Date(null);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8);
}
function inside(array, element){
  return element.indexOf(element) > -1
}
function gameLogic(){
	time.seconds.income += time.minutes.generators * 2 / time.tick;
	if (time.upgrades.multiplier.bought){
	  time.seconds.income += Math.log(time.seconds.total)
	}
	time.seconds.current += time.seconds.income * 2 / time.tick;
	time.seconds.total += time.seconds.income *2 / time.tick;
	[time.months.name,time.months.cost] = getMonth(time.months.current)
	
	units.forEach((unit, index) => {
		
		if (index + 1 < units.length) { time[unit].generators += (time[units[index + 1]].generators * 2 / time.tick)*(Math.pow(1.5,time.months.current)); }
		
	});
	time.seconds.manual = Math.floor(Math.pow(2*(1+time.upgrades.doubleManualSecs.bought), time.minutes.manual));
	
	time.seconds.max[0] = (60 * (time.hours.manual + 1 + (time.days.manual * 2)));
	time.hours.max[0] = 24/(time.upgrades.halfDay.bought+1)
	if (time.upgrades.limitIncrease.bought){
	  time.seconds.max[0] += 60 * time.minutes.manual;
	}
	if (time.seconds.current >= time.seconds.max[0]) {
		
		time.seconds.current = 1;
		time.seconds.income = 0;
		time.seconds.cost = 1;
		
		time.minutes.current += time.seconds.max[0]/60;
		
		if (!time.minutes.entryUnit){
		  //addEntry("Eureka! My new pieces all seemed to join together to form a bigger, more powerful piece. I wonder what will happen if I throw it on the ground...", true)
		  time.minutes.entryUnit = true;
		}
		
	};
	
	units.forEach((unit, index) => {
	  try {
		if (time[unit].current >= time[unit].max[0]) {
			//if (!time[units[index+1]].entryUnit){
			  //addEntry('The pieces have joined together. Interesting...', true)
			  //time[units[index+1]].entryUnit = true;
			//}
			time[unit].generators = 0;
			time[unit].current -= time[unit].max[0]
			time[unit].manual = 0;
			time[unit].cost = 1;
			get(time, time[unit].max[1]).current++;
			if (time[unit].max[1] === 'years'){ 
			  time.years.generators++ 
			  time.days.generators = 0;
			  time.days.price = 1;
			  
			};
			
			}
	  }
	  catch(e){}
	});
	
	Object.getOwnPropertyNames(time.upgrades).forEach(upgrade => {
	  if (upgrade.includes('Auto')){
	    if (get(time.upgrades, upgrade).bought) {
	      let temp = upgrade.replace('Auto','')+'s'
	      buy(temp)
	    }
	  }
	});
}
