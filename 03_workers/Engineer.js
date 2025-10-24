import { Employee } from './Employee.js';
import { checkArgString } from './helpers.js';

function Engineer(
	id,
	name,
	department,
	position,
	dateOfEmployment,
	salary,
	isEmployed,
	engineeringField
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

	checkArgString('Engineering Field', engineeringField);

	this.engineeringField = engineeringField;
	this.certifications = [];
	this.assignedEquipment = [];
	this.projectInvolved = [];
	this.safetyLevel = false;
}

Engineer.prototype = Object.create(Employee.prototype);
Engineer.prototype.constructor = Engineer;

Engineer.prototype.getEngineeringField = function () {
	return this.engineeringField;
};

Engineer.prototype.getSafetyLevel = function () {
	return this.safetyLevel;
};

Engineer.prototype.perfomansEquipmentInspection = function (value) {
	if (typeof value !== 'number' || value < 0 || value > 1) {
		throw new Error('Inspection value must be between 0 and 1');
	}
	return value >= 0.7;
};

Engineer.prototype.toString = function () {
	return `Engineer:
	name: ${this.getName()}
	field: ${this.getEngineeringField()}
	safety: ${this.getSafetyLevel()}
	`;
};

export { Engineer };
