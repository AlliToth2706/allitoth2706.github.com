// Sets a bunch of the CSS for each element depending on the day, the time of day, and the duration of the class.
// Is also where the colour is added and the info in the block.
function setCSS(elem, currentInfo) {
	let height = currentInfo.duration;
	let top_ = currentInfo.time;
	let left = currentInfo.day;
	let color = currentInfo.color;
	let setHeight = `calc((var(--table-height) + 3px) * ${height * 2})`;
	let setLeft = `calc(10% + (var(--table-width) * ${left}))`;
	let setTop = `calc((var(--table-height) + 3px) * ${2 * top_ - 15})`;
	elem.style.height = setHeight;
	elem.style.left = setLeft;
	elem.style.top = setTop;
	elem.style.background = color;
	query = elem.querySelector('p');
	if (query) query.remove();
	let innerPara = document.createElement('p');
	innerPara.innerHTML = `${currentInfo.name}<br />${currentInfo.location}`;
	elem.appendChild(innerPara);
}

function resetCSS(elem) {
	elem.style.height = '';
	elem.style.left = '';
	elem.style.top = '';
	elem.style.background = '';
	query = elem.querySelector('p');
	if (query) query.remove();
}

// Function to create the hidden "Select an Option" option for the select elements.
function createDefaultOption() {
	let defaultOption = document.createElement('option');
	defaultOption.value = '';
	defaultOption.selected = true;
	defaultOption.disabled = true;
	defaultOption.hidden = true;
	defaultOption.text = 'Select an Option';
	return defaultOption;
}

// Information for the timetables' ObjectArrays to keep things clean.
let types = ['LTL', 'PRA', 'WRK'];
let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
let colors = [
	'DeepSkyBlue',
	'Blue',
	'LimeGreen',
	'DarkGreen',
	'IndianRed',
	'DarkRed',
	'Orange',
	'OrangeRed',
];

// This array is very important and used in some of the functions.
// Pretty much allows for the checkParams function to have something it can, well... check.
let usedTimes = [];

/*
 * Main classes.
 */

// Main timetable that shows all of the default options.
timetable = [
	{
		name: 'Advanced Programming Techniques',
		type: types[0],
		times: [
			{ day: 1, time: 14, location: 'Building 80 (80.10.17)' },
			{ day: 4, time: 8, location: 'Building 56 (56.6.82)' },
		],
		duration: 2,
		color: colors[0],
	},
	{
		name: 'Advanced Programming Techniques',
		type: types[1],
		times: [
			{ day: 0, time: 9, location: 'Building 14 (14.11.37)' },
			{ day: 0, time: 14, location: 'Building 10 (10.8.26)' },
			{ day: 1, time: 10, location: 'Building 14 (14.10.30)' },
			{ day: 1, time: 12, location: 'Building 14 (14.10.30)' },
			{ day: 2, time: 8, location: 'Building 14 (14.10.30)' },
			{ day: 3, time: 10, location: 'Building 56 (56.4.87)' },
		],
		duration: 2,
		color: colors[1],
	},
	{
		name: 'Algorithms and Analysis',
		type: types[0],
		times: [
			{ day: 0, time: 11, location: 'Online' },
			{ day: 3, time: 15, location: 'Online' },
		],
		duration: 1,
		color: colors[2],
	},
	{
		name: 'Algorithms and Analysis',
		type: types[2],
		times: [
			{ day: 0, time: 9, location: 'Online' },
			{ day: 0, time: 14, location: 'Online' },
			{ day: 2, time: 10, location: 'Online' },
			{ day: 3, time: 13, location: 'Online' },
			{ day: 4, time: 12, location: 'Online' },
			{ day: 4, time: 14, location: 'Online' },
		],
		duration: 2,
		color: colors[3],
	},
	{
		name: 'Software Eng Fundamentals',
		type: types[0],
		times: [{ day: 3, time: 12, location: 'Online' }],
		duration: 1,
		color: colors[4],
	},
	{
		name: 'Software Eng Fundamentals',
		type: types[1],
		times: [
			{ day: 1, time: 12, location: 'Building 14 (14.10.41)' },
			{ day: 2, time: 12, location: 'Building 10 (10.8.24)' },
			{ day: 4, time: 10, location: 'Building 14 (14.10.31)' },
		],
		duration: 2,
		color: colors[5],
	},
];

// Can't put a class in the same place another one is.
function overlap() {
	alert('There is an overlap in the classes. Please try again.');
}

// Checks if there is an overlap. I've kept the unnecessary parts (albeit untested) in here to use in the future potentially
function checkParams(element, currentInfo) {
	if (element.day === currentInfo.day) {
		if (element.time === currentInfo.time) {
			return true;
		}

		if (
			currentInfo.time > element.time - currentInfo.duration &&
			element.time - currentInfo.duration > currentInfo.time
		) {
			return true;
		}

		if (
			element.time > currentInfo.time - element.duration &&
			currentInfo.time - element.duration > element.time
		) {
			return true;
		}

		return false;
	} else {
		return false;
	}
}

// Adds the information from the onChange event in createFormElements and basically makes sure that everything's ok.
function addInformation(e) {
	let class_ = timetable[parseInt(e.target.name)];
	let time = class_.times[parseInt(e.target.value)];
	let currentInfo = {
		day: time.day,
		time: time.time,
		duration: class_.duration,
		color: class_.color,
		name: class_.name + ' ' + class_.type,
		location: time.location,
	};

	foundItem = usedTimes.findIndex(
		(el) => el.name === `${class_.name} ${class_.type}`
	);
	if (usedTimes && foundItem + 1) {
		usedTimes.splice(foundItem, 1);
	}
	if (usedTimes && usedTimes.some((el) => checkParams(el, currentInfo))) {
		overlap();
		return;
	}
	usedTimes.push(currentInfo);

	let elem = document.getElementById(`d${e.target.name}`);
	setCSS(elem, currentInfo);
}

// Creates all of the form elements on the page.
function createClassElements() {
	let form = document.getElementById('timetable-form-1');

	for (let i = 0; i < timetable.length; i++) {
		let mainLabel = document.createElement('label');
		mainLabel.htmlFor = i;
		mainLabel.innerHTML = `${timetable[i].name} ${timetable[i].type}`;

		let mainSelect = document.createElement('select');
		mainSelect.name = i;
		mainSelect.value = i;
		mainSelect.addEventListener('change', addInformation);
		mainSelect.timetable = timetable;
		mainSelect.tof = false;

		mainSelect.add(createDefaultOption());
		for (let j = 0; j < timetable[i].times.length; j++) {
			let option = document.createElement('option');
			option.value = j;
			option.text = `${days[timetable[i].times[j].day]} ${
				timetable[i].times[j].time
			}:30 - ${timetable[i].times[j].time + timetable[i].duration}:30`;

			mainSelect.add(option);
		}

		form.appendChild(mainLabel);
		form.appendChild(document.createElement('br'));
		form.appendChild(mainSelect);
		form.appendChild(document.createElement('br'));
		form.appendChild(document.createElement('br'));
	}
}

createClassElements();

/*
 * Optional classes
 */

// Optional courses
timetableOptions = [
	{
		name: 'Games and AI Techniques',
		type: types[2],
		times: [
			{
				day: 0,
				time: 11,
				location: 'Building 14 (14.11.37)',
			},
			{
				day: 2,
				time: 13,
				location: 'Building 14 (14.11.37)',
			},
		],
		duration: 3,
		color: colors[6],
	},
	{
		name: 'Machine Learning',
		type: types[0],
		times: [{ day: 0, time: 9, location: 'Building 80 (80.4.6)' }],
		duration: 2,
		color: colors[6],
	},
	{
		name: 'Machine Learning',
		type: types[1],
		times: [
			{ day: 3, time: 10, location: 'Building 14 (14.10.30)' },
			{ day: 4, time: 9, location: 'Building 10 (10.8.26)' },
			{ day: 4, time: 14, location: 'Building 14 (14.11.37)' },
		],
		duration: 2,
		color: colors[7],
	},
];

// Generated list of the optional courses
let classOptions = [];
timetableOptions.forEach((e) => {
	if (classOptions.indexOf(e.name) === -1) classOptions.push(e.name);
});

function addOptionalInformation(e) {
	console.log(e.target.name, e.target.value, e.target.num);
	let class_ = timetableOptions[parseInt(e.target.name) + e.target.num];
	let time = class_.times[parseInt(e.target.value)];
	let currentInfo = {
		day: time.day,
		time: time.time,
		duration: class_.duration,
		color: class_.color,
		name: class_.name + ' ' + class_.type,
		location: time.location,
	};

	foundItem = usedTimes.findIndex(
		(el) => el.name === `${class_.name} ${class_.type}`
	);
	if (usedTimes && foundItem + 1) {
		usedTimes.splice(foundItem, 1);
	}

	if (usedTimes && usedTimes.some((el) => checkParams(el, currentInfo))) {
		overlap();
		return;
	}
	usedTimes.push(currentInfo);

	let elem = document.getElementById(`d${6 + e.target.num}`);
	setCSS(elem, currentInfo);
}

// Basically adds a new select element to the website so people can choose their time for their optional class.
function addOptionalClass(e) {
	let currentClass = timetableOptions[parseInt(e.target.value)];

	let count = 0;
	timetableOptions.forEach((e) => {
		if (e.name === currentClass.name) count += 1;
	});

	for (let i = 0; i < 2; i++) {
		let query = e.target.aform.querySelector(`label[for='${i}']`);
		// console.log(query);
		if (query) {
			for (let j = 0; j < 4; j++) {
				let nextSibling = query.nextSibling;
				nextSibling.remove();
			}
			query.remove();
			resetCSS(document.getElementById(`d${6 + i}`));
		}
	}

	for (let i = 0; i < count; i++) {
		let element1 = document.createElement('label');
		element1.htmlFor = i;
		element1.innerHTML = `${
			timetableOptions[parseInt(e.target.value) + i].name
		} ${timetableOptions[parseInt(e.target.value) + i].type}`;

		let element2 = document.createElement('select');
		console.log(e.target.value);
		element2.name = e.target.value;
		element2.num = i;
		element2.addEventListener('change', addOptionalInformation);

		element2.add(createDefaultOption());
		for (
			let j = 0;
			j < timetableOptions[parseInt(e.target.value) + i].times.length;
			j++
		) {
			let option = document.createElement('option');
			option.value = j;
			option.text = `${
				days[timetableOptions[parseInt(e.target.value) + i].times[j].day]
			} ${timetableOptions[parseInt(e.target.value) + i].times[j].time}:30 - ${
				timetableOptions[parseInt(e.target.value) + i].times[j].time +
				timetableOptions[parseInt(e.target.value) + i].duration
			}:30`;

			element2.add(option);
		}

		e.target.aform.appendChild(element1);
		e.target.aform.appendChild(document.createElement('br'));
		e.target.aform.appendChild(element2);
		e.target.aform.appendChild(document.createElement('br'));
		e.target.aform.appendChild(document.createElement('br'));
	}
}

function createOptionElements() {
	let form = document.getElementById('timetable-form-2');

	let optionsLabel = document.createElement('label');
	optionsLabel.htmlFor = `opt`;
	optionsLabel.innerHTML = `Class options`;

	let optionsSelect = document.createElement('select');
	optionsSelect.name = `opt`;
	optionsSelect.value = `opt`;
	optionsSelect.addEventListener('change', addOptionalClass);
	optionsSelect.aform = form;

	optionsSelect.add(createDefaultOption());

	for (let i = 0; i < classOptions.length; i++) {
		let option = document.createElement('option');
		option.value = i;
		option.text = `${classOptions[i]}`;

		optionsSelect.add(option);
	}

	form.appendChild(optionsLabel);
	form.appendChild(document.createElement('br'));
	form.appendChild(optionsSelect);
	form.appendChild(document.createElement('br'));
	form.appendChild(document.createElement('br'));
}

createOptionElements();

/**
 * Reset button
 */

function buttonPress(e) {
	for (let i = 0; i < 8; i++) {
		resetCSS(document.getElementById(`d${i}`));
	}
	usedTimes = [];
}

function createResetButton() {
	const button = document.createElement('button');
	const optionArea = document.getElementsByClassName('options');
	button.type = 'button';
	button.innerHTML = 'Reset';
	button.addEventListener('click', buttonPress);

	optionArea[0].appendChild(button);
}

createResetButton();
