import { Employee } from './Employee.js';
import { Accountant } from './Accountant.js';
import { ChiefAccountant } from './ChiefAccountant.js';
import { Engineer } from './Engineer.js';
import { Worker } from './Worker.js';

const staff = [];

const employee = new Employee(
	1,
	'Рустам Д.',
	'Слесарь-ремонтник',
	'Ремонтная группа',
	new Date(2021, 11, 29),
	100_000,
	true
);
staff[staff.length] = employee;

const accountant = new Accountant(
	2,
	'Наталья К.',
	'Бухгалтерия',
	'Бухгалтер-расчетчик',
	new Date(2018, 3, 10),
	120_000,
	true,
	'Расчеты'
);
staff[staff.length] = accountant;

const chief = new ChiefAccountant(
	3,
	'Надежа Борисовна С.',
	'Бухгалтерия',
	'Главный бухгалтер',
	new Date(2012, 1, 20),
	500_000,
	true,
	'Руководство бухгалтерией'
);

chief.departmentSupervision[chief.departmentSupervision.length] =
	'Финансовое планирование';
chief.departmentSupervision[chief.departmentSupervision.length] = 'Налоги';
chief.subordinateAccountants[chief.subordinateAccountants.length] =
	'Мария Сидорова';
chief.subordinateAccountants[chief.subordinateAccountants.length] =
	'Андрей Петров';
staff[staff.length] = chief;

const engineer = new Engineer(
	4,
	'Михаил Л.',
	'ИТР',
	'Механик',
	new Date(2022, 4, 20),
	180_000,
	true,
	'Насосы'
);

engineer.certifications[engineer.certifications.length] = 'ISO 9001';
engineer.assignedEquipment[engineer.assignedEquipment.length] = 'Трикантер';
engineer.projectInvolved[engineer.projectInvolved.length] = 'ППР Н-21/1';
engineer.safetyLevel = true;
staff[staff.length] = engineer;

const worker = new Worker(
	5,
	'Андрей Викторович Ф.',
	'Ремонтная группа',
	'Слесарь-ремонтник',
	new Date(2005, 6, 30),
	120_000,
	true,
	'Дневная',
	'БОВ',
	5,
	'ТО БПН Флоттвег'
);
staff[staff.length] = worker;

try {
	//--------Employee------------
	console.log(employee.valueOf());
	console.log(employee.getExperienceYears());

	//--------Accountant----------
	console.log(accountant.calculateTax(accountant.getSalary()));
	console.log(accountant.getCertificationLevel());

	//------ChiefAccountant------------
	console.log(chief.approvePayroll());
	const report = chief.generateFinancialReport();
	console.log(report);

	//---------Engineer------------
	console.log(engineer.perfomansEquipmentInspection(0.85));

	//---------Worker------------
	console.log(worker.perfomTask());
	console.log(worker.passedAnnualExam());
} catch (error) {
	console.error('Ошибка:', error.message);
}

for (let i = 0; i < staff.length; i++) {
	console.log(`\n${i + 1}. ${staff[i].toString()}`);
}
