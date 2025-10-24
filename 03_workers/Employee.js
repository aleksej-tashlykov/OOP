import {
	checkArgNumber,
	checkArgString,
	checkInstanceClass,
} from './helpers.js';

function Employee(
	id,
	name,
	department,
	position,
	dateOfEmployment,
	salary,
	isEmployed
) {
	checkArgNumber('Id', id, true, 1);
	checkArgString('Name', name);
	checkArgString('Department', department);
	checkArgString('Position', position);
	checkInstanceClass('Дата трудоустройства', dateOfEmployment, Date);
	checkArgNumber('Salary', salary, false, 0);

	if (typeof isEmployed !== 'boolean') {
		throw new Error('Аргумент должен быть булевым значением.');
	}

	this.id = id;
	this.name = name;
	this.department = department;
	this.position = position;

	if (!isNaN(dateOfEmployment.getTime())) {
		this.dateOfEmployment = new Date(dateOfEmployment.getTime());
	}

	this.salary = salary;
	this.isEmployed = isEmployed;
}

Employee.prototype.getId = function () {
	return this.id;
};

Employee.prototype.getName = function () {
	return this.name;
};

Employee.prototype.getDepartment = function () {
	return this.department;
};

Employee.prototype.getPosition = function () {
	return this.position;
};

Employee.prototype.getDateOfEmployment = function () {
	return this.dateOfEmployment;
};

Employee.prototype.getSalary = function () {
	return this.salary;
};

Employee.prototype.getIsEmployed = function () {
	return this.isEmployed;
};

Employee.prototype.getExperienceYears = function () {
	const currentYear = new Date();
	const employmentDate = this.getDateOfEmployment();

	if (employmentDate > currentYear) {
		return 0;
	}

	let years = currentYear.getFullYear() - employmentDate.getFullYear();
	const month = currentYear.getMonth() - employmentDate.getMonth();
	const day = currentYear.getDate() - employmentDate.getDate();

	if (month < 0 || (month === 0 && day < 0)) {
		years--;
	}

	return years > 0 ? years : 0;
};

Employee.prototype.toString = function () {
	return `Employee:
	name: ${this.getName()}
	department: ${this.getDepartment()}
	position: ${this.getPosition()}
	isEmployed: ${this.getIsEmployed()}
	`;
};

Employee.prototype.valueOf = function () {
	return this.getSalary();
};

export { Employee };
