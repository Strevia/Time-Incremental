var timeDefault = {
	
	seconds: {
		
		current: 1,
		income: 0,
		cost: 1,
		
		manual: 0,
		
		max: 60,
		
		gain: true
		
	},
	
	played: 0,
	
	accelDouble: true,
	
	tick: 50
	
},
	time,
	
	sessionStart = Date.now(),
	
	runGame = true, // for debug
	version = [0, 0, 5],
	
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
		'days.cost'
		
	],
	
	units = ['minutes', 'hours', 'days'],
	unitsComplete = ['seconds', ...units],
	unitsMax = { minutes: 60, hours: 24, days: 7 };

units.forEach(unit => timeDefault[unit] = {
	
	current: 0,
	generators: 0,
	cost: 1,
	
	manual: 0,
	
	max: unitsMax[unit]
	
});

initialize();

function onTick () {
	
	save();
	
	time.played++;
	
	time.seconds.income += time.minutes.generators * 2 / time.tick;
	time.seconds.current += time.seconds.income * 2 / time.tick;
	
	units.forEach((unit, index) => {
		
		if (index + 1 < units.length) { time[unit].generators += time[units[index + 1]].generators * 2 / time.tick; }
		
	});
	
	time.seconds.manual = Math.floor((time.accelDouble + 1) ** time.minutes.manual);
	
	updateUI();
	
	if (time.seconds.current >= (60 + time.hours.manual * time.seconds.gain * 60)) {
		
		time.seconds.current = 1;
		time.seconds.income = 0;
		time.seconds.cost = 1;
		
		time.minutes.current += time.hours.manual * time.seconds.gain + 1;
		
	};
	
	units.forEach((unit, index) => {
		
		if (time[unit].current >= time[unit].max) {
			
			resetUnit(unit);
			
			if (index + 1 < units.length) { time[units[index + 1]].current++ };
		
		};
		
	});
	
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
	
	let saveData = JSON.parse(localStorage.getItem('savedata'));
	
	if (saveData !== null) {
		
		if (saveData.version[1] !== version[1] || saveData.version[0] !== version[0]) {
		
			console.log('Time Incremental includes breaking changes since your last save. Starting from scratch');
			
			return;
			
		};
		
		Object.assign(time, saveData);
		
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

function buy (unit) {
	
	if (time[unit].current >= time[unit].cost) {
		
		time[unit].current -= time[unit].cost;
		
		time[unit].cost *= 2;
		
		if (unit === 'seconds') {
		
			time.seconds.income += time.seconds.manual
			
		} else {
			
			time[unit].generators++;		
			
			time[unit].manual++;
			
		};
		
	};
	
	
	
};

function updateUI () {
	
	UIUpdateList.forEach(element => { query('.' + element).innerHTML = parseInt(get(time, element)) });
	
	timeCache = deepCopy(time);
	
	query('.seconds.ending').innerHTML = time.seconds.manual > 1 ? 's' : '';
	
	setUITimePlayed(); // includes plural endings
	
	unitsComplete.forEach((unit, index) => {
		
		let unitMoreThanHalf = time[unit].current >= time[unit].max / 2,
			
			nextUnit = units[index],
			nextUnitPresent = nextUnit && time[nextUnit].current + time[nextUnit].generators > 0;
		
		if (unitMoreThanHalf || nextUnitPresent) showUnitBlock(nextUnit);
		
	});
	
};

function setUITimePlayed () {
	
	let played = time.played + timeInSession(),
		
		timeParse = [
			
			Math.floor(played / 20 % 60),		/* seconds */
			Math.floor(played / 1200 % 60),		/* minutes */
			Math.floor(played / 72000 % 24),	/* hours */
			Math.floor(played / 1728000)		/* days */
			
		];
	
	unitsComplete.forEach((unit, index) => {
		
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
