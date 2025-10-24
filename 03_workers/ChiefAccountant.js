import { Accountant } from './Accountant.js';
import { dataCopy } from './helpers.js';

function ChiefAccountant(
	id,
	name,
	department,
	position,
	dateOfEmployment,
	salary,
	isEmployed,
	certificationLevel
) {
	Accountant.call(
		this,
		id,
		name,
		department,
		position,
		dateOfEmployment,
		salary,
		isEmployed,
		certificationLevel
	);

	this.departmentSupervision = [];
	this.subordinateAccountants = [];
}

ChiefAccountant.prototype = Object.create(Accountant.prototype);
ChiefAccountant.prototype.constructor = ChiefAccountant;

ChiefAccountant.prototype.getDepartmentSupervision = function () {
	return dataCopy(this.departmentSupervision);
};

ChiefAccountant.prototype.getSubordinateAccountants = function () {
	return dataCopy(this.subordinateAccountants);
};

ChiefAccountant.prototype.approvePayroll = function () {
	return this.getIsEmployed();
};

ChiefAccountant.prototype.generateFinancialReport = function () {
	return JSON.stringify({
		chief: this.getName(),
		level: this.getCertificationLevel(),
		departments: this.getDepartmentSupervision(),
		accountants: this.getSubordinateAccountants(),
		timestamp: new Date().toISOString(),
	});
};

ChiefAccountant.prototype.reviewTaxReport = function (taxReportJson) {
	if (typeof taxReportJson !== 'string') {
		return false;
	}
	try {
		const report = JSON.parse(taxReportJson);
		return typeof report.total === 'number' && report.total >= 0;
	} catch (error) {
		console.error('Ошибка:', error.message);
	}
};

ChiefAccountant.prototype.toString = function () {
	return `ChiefAccountant:
	name: ${this.getName()}
	level: ${this.getCertificationLevel()}
  departments: ${this.getDepartmentSupervision().length}
	accountants: ${this.getSubordinateAccountants().length}`;
};

export { ChiefAccountant };
