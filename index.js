var timeDefault = {
	
	seconds: {
		
		current: 1,
		income: 0,
		price: 1,
		
		manualIncrease: 0,
		
		gain: true
		
	},
	
	passed: 0,
	
	accelDouble: true,
	
	tick: 50 // ms
	
},
time,

saveDataKeys = ['seconds.current', 'seconds.income', 'seconds.price', 'minutes.current', 'minutes.price', 'minutes.built', 'hours.current', 'hours.price', 'hours.built', 'passed', 'days.current', 'days.price', 'days.built', 'hours.manual', 'seconds.gain', 'accelDouble', 'minutes.manual'],

units = ['minutes', 'hours', 'days'];

units.forEach(unit => timeDefault[unit] = { current: 0, built: 0, price: 1, manual: 0 });

requestInterval(() => {
	
	save();
	
	time.passed++;
	
	time.seconds.income += (time.minutes.built * 2) / time.tick;
	time.seconds.current += (time.seconds.income * 2) / time.tick;
	
	units.forEach((unit, index) => {
		
		if (index + 1 < units.length) { time[unit].built += (time[units[index + 1]] * 2) / time.tick }
		
	};
	
	time.seconds.manualIncrease = Math.floor((time.accelDouble + 1) ** time.minutes.manual);
	
	// ! TEMPORARY !
	
	document.getElementById("seconds").innerHTML = Math.round(time.seconds.current);
	document.getElementById("secPerSecPrice").innerHTML = time.seconds.price;
	document.getElementById("secPerSec").innerHTML = Math.round(time.seconds.income);
	
	document.getElementById("minutes").innerHTML = Math.round(time.minutes.current);
	document.getElementById("minPerSecPrice").innerHTML = Math.round(time.minutes.price);
	document.getElementById("minBuilds").innerHTML = Math.round(time.minutes.built);
	
	document.getElementById("hours").innerHTML = Math.round(time.hours.current);
	document.getElementById("houPerSecPrice").innerHTML = Math.round(time.hours.price);
	document.getElementById("houBuilds").innerHTML = Math.round(time.hours.built);
	
	document.getElementById("days").innerHTML = Math.round(time.days.current);
	document.getElementById("dayPerSecPrice").innerHTML = Math.round(time.days.price);
	document.getElementById("dayBuilds").innerHTML = Math.round(time.days.built);
	
	document.getElementById("dayTime").innerHTML = Math.floor(time.passed / 1728000);
	document.getElementById("hourTime").innerHTML = Math.floor(time.passed / 72000 % 24);
	document.getElementById("minTime").innerHTML = Math.floor(time.passed / 1200 % 60);
	document.getElementById("secondTime").innerHTML = Math.floor(time.passed / 20 % 60);
	
	document.getElementById("manualSeconds").innerHTML = time.seconds.manualIncrease;
	
	// ! TEMPORARY !
	
	if (!(time.seconds.current >= 30 || time.minutes.current + time.minutes.built > 0)) {
		
		setDisplay('#numberMin', 'none');
		setDisplay('#minButton', 'none');
		//setDisplay('#minUpgrade', 'none');
		
	} else {
	
		setDisplay('#numberMin', 'block');
		setDisplay('#minButton', 'block');
		//time.accelDouble ? setDisplay('#minUpgrade', 'none') : setDisplay('#minUpgrade', 'block');
		
	};
	
	if (!(time.minutes.current >= 30 || time.hours.current + time.hours.built > 0)) {
	
		setDisplay('#numberHour', 'none');
		setDisplay('#hourButton', 'none');
		//setDisplay('#breakSeconds', 'none');
		
	} else {
	
		setDisplay('#numberHour', 'block');
		setDisplay('#hourButton', 'block');
		//time.seconds.gain ? setDisplay('#breakSeconds', 'none') : setDisplay('#breakSeconds', 'block');
		
	};
	
	if (!(time.hours.current >= 24 || time.days.current + time.days.built > 0)) {
	
		setDisplay('#numberDay', 'none');
		setDisplay('#dayButton', 'none');
		
	} else {
	
		setDisplay('#numberDay', 'block');
		setDisplay('#dayButton', 'block');
		
	};
	
	// ! TEMPORARY ! end
	
	if (time.seconds.current >= (60 + time.hours.manual * time.seconds.gain * 60)) {
		
		time.seconds.current = 1;
		time.seconds.income = 0;
		time.seconds.price = 1;
		
		time.minutes.current += time.hours.manual * time.seconds.gain + 1;
		
	};
	
	units.forEach((unit, index) => {
		
		if (time[unit].current >= 60) {
			
			resetUnit(unit);
			
			if (index + 1 < units.length) { time[units[index + 1]].current++ };
		
		};
		
	});
	
}, time.tick);

// GAME FUNCTIONS

function initialize () {
	
	time = deepCopy(timeDefault);
	
	let saveData = getCookieValue("everything").split(',');
	
	if (saveData.length > 1) {
		
		saveDataKeys.forEach((prop, index) => { justSet(time, prop, saveData[index]) });
		
		time.secondGain = !!time.secondGain;
		time.accelDouble = !!time.accelDouble;
		
	};
	
};

function save () {

	let saveDataArray = saveDataKeys.map(prop => justGet(time, prop));
	
	document.cookie = 'everything=' + saveDataArray.toString();
	
};

function resetUnit (unit) {
	
	time[unit] = deepCopy(timeDefault[unit]);
	
};

// UTILITY FUNCTIONS

function getCookieValue (handle) {

    var b = document.cookie.match('(^|;)\\s*' + handle + '\\s*=\\s*([^;]+)');
    return b ? b.pop() : '';
    
};

function deepCopy (source) {
	
	return JSON.parse(JSON.stringify(source));
	
};

function justSet(object, props, value) {

	if (typeof props == 'string') { props = props.split('.') }
	if (typeof props == 'symbol') { props = [props] }

	var lastProp = props.pop();

	if (!lastProp) { return false }

	var thisProp;

	while ((thisProp = props.shift())) {
	
		if (typeof object[thisProp] == 'undefined') { object[thisProp] = {} };
		
		object = object[thisProp];
		
		if (!object || typeof object != 'object') { return false };
		
	};
	
	object[lastProp] = value;
	
	return true;
	
}

function justGet(obj, props) {
  if (typeof props == 'string') {
    props = props.split('.');
  }
  if (typeof props == 'symbol') {
    props = [props];
  }
  var prop;
  while ((prop = props.shift())) {
    obj = obj[prop];
    if (!obj) {
      return obj;
    }
  }
  return obj;
};

function setDisplay (element, value) {
	
	return document.querySelector(element).style.display = value;
	
};

function requestInterval (fn, delay) {
  let requestAnimFrame = (function () {
    return window.requestAnimationFrame || function (callback, element) {
      window.setTimeout(callback, 1000 / 60);
    };
  })(),
  start = new Date().getTime(),
  handle = {};
  function loop() {
    handle.value = requestAnimFrame(loop);
    let current = new Date().getTime(),
    delta = current - start;
    if (delta >= delay) {
      fn.call();
      start = new Date().getTime();
    }
  }
  handle.value = requestAnimFrame(loop);
  return handle;
};
