types = ['LTL', 'PRA', 'WRK'];
days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
colors = [
	'DeepSkyBlue',
	'Blue',
	'LimeGreen',
	'DarkGreen',
	'IndianRed',
	'DarkRed',
];
timetable = [
	{
		name: 'Advanced Programming Techniques',
		type: types[0],
		times: [
			{ day: 1, time: 8 },
			{ day: 4, time: 14 },
		],
		duration: 2,
		color: colors[0],
	},
	{
		name: 'Advanced Programming Techniques',
		type: types[1],
		times: [
			{ day: 0, time: 9 },
			{ day: 0, time: 14 },
			{ day: 1, time: 10 },
			{ day: 1, time: 12 },
			{ day: 2, time: 8 },
			{ day: 3, time: 10 },
		],
		duration: 2,
		color: colors[1],
	},
	{
		name: 'Algorithms and Analysis',
		type: types[0],
		times: [
			{ day: 0, time: 11 },
			{ day: 3, time: 15 },
		],
		duration: 1,
		color: colors[2],
	},
	{
		name: 'Algorithms and Analysis',
		type: types[2],
		times: [
			{ day: 0, time: 9 },
			{ day: 0, time: 14 },
			{ day: 2, time: 10 },
			{ day: 3, time: 13 },
			{ day: 4, time: 12 },
			{ day: 4, time: 14 },
		],
		duration: 2,
		color: colors[3],
	},
	{
		name: 'Software Eng Fundamentals',
		type: types[0],
		times: [{ day: 3, time: 12 }],
		duration: 1,
		color: colors[4],
	},
	{
		name: 'Software Eng Fundamentals',
		type: types[1],
		times: [
			{ day: 1, time: 12 },
			{ day: 2, time: 12 },
			{ day: 4, time: 10 },
		],
		duration: 2,
		color: colors[5],
	},
];

/* 
 - Elem: The element to edit
 - Top: times.time
 - Left: times.day
 - Height: duration
*/

function setCSS(elem, currentInfo) {
	height = currentInfo.duration;
	top_ = currentInfo.time;
	left = currentInfo.day;
	color = currentInfo.color;
	setHeight = `calc((var(--table-height) + 3px) * ${height * 2})`;
	setLeft = `calc(10% + (var(--table-width) * ${left}))`;
	setTop = `calc((var(--table-height) + 3px) * ${2 * top_ - 15})`;
	elem.style.height = setHeight;
	elem.style.left = setLeft;
	elem.style.top = setTop;
	elem.style.background = color;
	elem.innerHTML = currentInfo.name;
}

function needSelections() {
	alert('Please select each class.');
}

function overlap() {
	alert('There is an overlap in the classes. Please try again.');
}

function checkParams(element, current_info) {
	if (element.day === current_info.day) {
		if (element.time === current_info.time) {
			return true;
		}

		if (
			current_info.time > element.time - current_info.duration &&
			element.time - current_info.duration > current_info.time
		) {
			return true;
		}

		if (
			element.time > current_info.time - element.duration &&
			current_info.time - element.duration > element.time
		) {
			return true;
		}

		return false;
	} else {
		return false;
	}
}

function submitForm(form) {
	let usedTimes = [];
	let formData = new FormData(form);
	for (let pair of formData.entries()) {
		if (!pair[0]) {
			needSelections();
			return;
		}

		one = parseInt(pair[0].substring(1));
		two = parseInt(pair[1]);

		class_ = timetable[one];
		time = class_.times[two];
		current_info = {
			day: time.day,
			time: time.time,
			duration: class_.duration,
			color: class_.color,
			name: class_.name + ' ' + class_.type,
		};

		if (usedTimes && usedTimes.some((el) => checkParams(el, current_info))) {
			overlap();
			return;
		}
		usedTimes.push(current_info);
	}

	for (let i = 0; i < usedTimes.length; i++) {
		console.log(i);
		let elem = document.getElementById(`d${i}`);
		console.log(elem);
		setCSS(elem, usedTimes[i]);
	}
}

function createFormElements() {
	let form = document.getElementById('timetable-form');
	let submitButton = document.getElementById('timetable-form').elements[0];

	for (let i = 0; i < timetable.length; i++) {
		let element1 = document.createElement('label');
		element1.for = 'text';
		element1.innerHTML = `${timetable[i].name} ${timetable[i].type}`;

		let element2 = document.createElement('select');
		element2.name = `d${i}`;

		let defaultOption = document.createElement('option');
		defaultOption.value = '';
		defaultOption.selected = true;
		defaultOption.disabled = true;
		defaultOption.hidden = true;
		defaultOption.text = 'Select an Option';
		element2.add(defaultOption);
		for (let j = 0; j < timetable[i].times.length; j++) {
			let option = document.createElement('option');
			option.value = `${j}`;
			option.text = `${days[timetable[i].times[j].day]} ${
				timetable[i].times[j].time
			}:30 - ${timetable[i].times[j].time + timetable[i].duration}:30`;
			console.log(option.text);

			element2.add(option);
		}

		form.insertBefore(element1, submitButton);
		form.insertBefore(document.createElement('br'), submitButton);
		form.insertBefore(element2, submitButton);
		form.insertBefore(document.createElement('br'), submitButton);
		form.insertBefore(document.createElement('br'), submitButton);
	}
	form.insertBefore(document.createElement('br'), submitButton);
	form.insertBefore(document.createElement('br'), submitButton);
}

createFormElements();
