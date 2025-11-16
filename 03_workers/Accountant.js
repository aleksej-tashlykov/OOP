import { Employee } from './Employee.js';
import { checkArgNumber, checkArgString } from './helpers.js';

function Accountant(
	id,
	name,
	department,
	position,
	dateOfEmployment,
	salary,
	isEmployed,
	certificationLevel
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

	checkArgString('Certification Level', certificationLevel);

	this.certificationLevel = certificationLevel;
	this.specializations = [];
	this.assignedEmployees = [];
}

Accountant.prototype = Object.create(Employee.prototype);
Accountant.prototype.constructor = Accountant;

Accountant.prototype.getCertificationLevel = function () {
	return this.certificationLevel;
};

Accountant.prototype.calculateTax = function (income) {
	checkArgNumber('Income', income, false, 0);
	return income * 0.13;
};

Accountant.prototype.toString = function () {
	return `Accountant:
	name: ${this.getName()}
	position: ${this.getPosition()}
	level: ${this.getCertificationLevel()}`;
};

export { Accountant };
