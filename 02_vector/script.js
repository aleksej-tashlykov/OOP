function checkTypeCoord(coord) {
	if (typeof coord !== 'number' || !Number.isFinite(coord)) {
		throw new Error('Координаты точки должны быть числами.');
	}
}

function checkInstanceClass(exemplar, master) {
	if (!(exemplar instanceof master)) {
		throw new Error(`Аргумент должен быть экземпляром класса ${master}`);
	}
}

//-------Point---------------
function Point(x = 0, y = 0, name = '') {
	checkTypeCoord(x);
	checkTypeCoord(y);

	this.x = x;
	this.y = y;
	this.name = name;
}

Point.prototype.getX = function () {
	return this.x;
};

Point.prototype.getY = function () {
	return this.y;
};

Point.prototype.getName = function () {
	return this.name;
};

Point.prototype.getCoords = function () {
	const x = this.getX();
	const y = this.getY();
	const name = this.getName();
	return { x, y, name };
};

Point.prototype.setX = function (value) {
	checkTypeCoord(value);
	this.x = value;
};

Point.prototype.setY = function (value) {
	checkTypeCoord(value);
	this.y = value;
};

Point.prototype.setCoords = function (x, y) {
	checkTypeCoord(x);
	checkTypeCoord(y);

	this.x = x;
	this.y = y;
};

Point.prototype.toString = function () {
	const x = this.getX();
	const y = this.getY();
	const name = this.getName();
	return `Point ${name}: (${x}, ${y})`;
};

//-------------Vector-----------
function Vector(start, end) {
	checkInstanceClass(start, Point);
	checkInstanceClass(end, Point);

	this.start = start;
	this.end = end;
}

Vector.prototype.getStart = function () {
	return this.start;
};

Vector.prototype.getEnd = function () {
	return this.end;
};

Vector.prototype.getCoords = function () {
	const start = this.getStart().getCoords();
	const end = this.getEnd().getCoords();

	return { start, end };
};

Vector.prototype.add = function (vector) {
	checkInstanceClass(vector, Vector);

	const dataCoords = this.getCoords();
	const vectorCoords = vector.getCoords();

	const startX = dataCoords.start.x + vectorCoords.start.x;
	const startY = dataCoords.start.y + vectorCoords.start.y;
	const endX = dataCoords.end.x + vectorCoords.end.x;
	const endY = dataCoords.end.y + vectorCoords.end.y;
	const startName = `${dataCoords.start.name}${vectorCoords.start.name}`;
	const endName = `${dataCoords.end.name}${vectorCoords.end.name}`;

	const start = new Point(startX, startY, startName);
	const end = new Point(endX, endY, endName);

	return new Vector(start, end);
};

Vector.prototype.subtract = function (vector) {
	checkInstanceClass(vector, Vector);

	const dataCoords = this.getCoords();
	const vectorCoords = vector.getCoords();

	const startX = dataCoords.start.x - vectorCoords.start.x;
	const startY = dataCoords.start.y - vectorCoords.start.y;
	const endX = dataCoords.end.x - vectorCoords.end.x;
	const endY = dataCoords.end.y - vectorCoords.end.y;
	const startName = `${dataCoords.start.name}${vectorCoords.start.name}`;
	const endName = `${dataCoords.end.name}${vectorCoords.end.name}`;

	const start = new Point(startX, startY, startName);
	const end = new Point(endX, endY, endName);

	return new Vector(start, end);
};

Vector.prototype.multiply = function (value) {
	checkTypeCoord(value);

	const dataCoords = this.getCoords();

	const startX = dataCoords.start.x * value;
	const startY = dataCoords.start.y * value;
	const endX = dataCoords.end.x * value;
	const endY = dataCoords.end.y * value;
	const startName = `${dataCoords.start.name}×${value}`;
	const endName = `${dataCoords.end.name}×${value}`;

	const start = new Point(startX, startY, startName);
	const end = new Point(endX, endY, endName);

	return new Vector(start, end);
};

Vector.prototype.divide = function (value) {
	if (value === 0) {
		throw new Error('Делить на ноль нельзя.');
	}

	const dataCoords = this.getCoords();

	const startX = dataCoords.start.x / value;
	const startY = dataCoords.start.y / value;
	const endX = dataCoords.end.x / value;
	const endY = dataCoords.end.y / value;
	const startName = `${dataCoords.start.name}/${value}`;
	const endName = `${dataCoords.end.name}/${value}`;

	const start = new Point(startX, startY, startName);
	const end = new Point(endX, endY, endName);

	return new Vector(start, end);
};

Vector.prototype.toString = function () {
	const start = this.getStart();
	const end = this.getEnd();
	const name = `${start.getName()}${end.getName()}`;
	return `Vector ${name} { start: ${start.toString()}, end: ${this.end.toString()} }`;
};

try {
	const pointA = new Point(1, 2, 'A');
	const pointB = new Point(3, 4, 'B');
	const pointC = new Point(2, 1, 'C');
	const pointD = new Point(1, 3, 'D');

	console.log('Точка А:', pointA.toString());
	console.log('Точка B:', pointB.toString());
	console.log('Точка C:', pointC.toString());
	console.log('Точка D:', pointD.toString());

	const vectorA = new Vector(pointA, pointB);
	const vectorB = new Vector(pointC, pointD);

	console.log('Вектор А:', vectorA.toString());
	console.log('Вектор B:', vectorB.toString());

	const sum = vectorA.add(vectorB);
	console.log('Сложение:', sum.toString());

	const diff = vectorA.subtract(vectorB);
	console.log('Вычитание:', diff.toString());

	const multiplied = vectorA.multiply(2);
	console.log('Умножение на 2:', multiplied.toString());

	const divided = vectorA.divide(2);
	console.log('Деление на 2:', divided.toString());
} catch (error) {
	console.error('Ошибка:', error.message);
}
