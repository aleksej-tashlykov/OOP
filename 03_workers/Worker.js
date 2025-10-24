import { Employee } from './Employee.js';
import { checkArgNumber, checkArgString } from './helpers.js';

function Worker(
	id,
	name,
	department,
	position,
	dateOfEmployment,
	salary,
	isEmployed,
	workShift,
	workStation,
	skillLevel,
	assignedTask
) {
	Employee.call(
		this,
		id,
		name,
		department,
		position,
		dateOfEmployment,
		salary,
		isEmployed
	);

	checkArgString('Work Shift', workShift);
	checkArgString('Work Station', workStation);
	checkArgString('Assigned Task', assignedTask);
	checkArgNumber('Skill level', skillLevel, false, 0);

	this.workShift = workShift;
	this.workStation = workStation;
	this.skillLevel = skillLevel;
	this.assignedTask = assignedTask;
	this.advancedTrainingCourses = [];
}

Worker.prototype = Object.create(Employee.prototype);
Worker.prototype.constructor = Worker;

Worker.prototype.getWorkShift = function () {
	return this.workShift;
};

Worker.prototype.getWorkStation = function () {
	return this.workStation;
};

Worker.prototype.getSkillLevel = function () {
	return this.skillLevel;
};

Worker.prototype.getAssignedTask = function () {
	return this.assignedTask;
};

Worker.prototype.perfomTask = function () {
	return this.getSkillLevel() >= 3; // выполняет задачу, если уровень ≥ 3
};

Worker.prototype.worksAccordingInstructions = function () {
	return this.getSkillLevel() >= 2; // следует инструкциям, если уровень ≥ 2
};

Worker.prototype.adheresDailyRoutine = function () {
	return this.getIsEmployed() && this.getSkillLevel() >= 1;
};

Worker.prototype.passedAnnualExam = function () {
	return this.getSkillLevel() >= 3;
};

Worker.prototype.toString = function () {
	return `Worker:
	name: ${this.getName()}
	shift: ${this.getWorkShift()}
	station: ${this.getWorkStation()}
	skill: ${this.getSkillLevel()}`;
};

export { Worker };
