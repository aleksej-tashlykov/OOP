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
	const startPoint = this.getStart();
	const endPoint = this.getEnd();

	const start = {
		x: startPoint.getX(),
		y: startPoint.getY(),
		name: startPoint.getName(),
	};

	const end = {
		x: endPoint.getX(),
		y: endPoint.getY(),
		name: endPoint.getName(),
	};

	return { start, end };
};

Vector.prototype.add = function (vector) {
	checkInstanceClass(vector, Vector);

	const dataCoordsStart = this.getStart();
	const vectorCoordsStart = vector.getStart();
	const dataCoordsEnd = this.getEnd();
	const vectorCoordsEnd = vector.getEnd();

	const startX = dataCoordsStart.getX() + vectorCoordsStart.getX();
	const startY = dataCoordsStart.getY() + vectorCoordsStart.getY();
	const endX = dataCoordsEnd.getX() + vectorCoordsEnd.getX();
	const endY = dataCoordsEnd.getY() + vectorCoordsEnd.getY();
	const startName = `${dataCoordsStart.getName()}${vectorCoordsStart.getName()}`;
	const endName = `${dataCoordsEnd.getName()}${vectorCoordsEnd.getName()}`;

	const start = new Point(startX, startY, startName);
	const end = new Point(endX, endY, endName);

	return new Vector(start, end);
};

Vector.prototype.subtract = function (vector) {
	checkInstanceClass(vector, Vector);

	const dataCoordsStart = this.getStart();
	const vectorCoordsStart = vector.getStart();
	const dataCoordsEnd = this.getEnd();
	const vectorCoordsEnd = vector.getEnd();

	const startX = dataCoordsStart.getX() - vectorCoordsStart.getX();
	const startY = dataCoordsStart.getY() - vectorCoordsStart.getY();
	const endX = dataCoordsEnd.getX() - vectorCoordsEnd.getX();
	const endY = dataCoordsEnd.getY() - vectorCoordsEnd.getY();
	const startName = `${dataCoordsStart.getName()}${vectorCoordsStart.getName()}`;
	const endName = `${dataCoordsEnd.getName()}${vectorCoordsEnd.getName()}`;

	const start = new Point(startX, startY, startName);
	const end = new Point(endX, endY, endName);

	return new Vector(start, end);
};

Vector.prototype.multiply = function (value) {
	checkTypeCoord(value);

	const dataCoordsStart = this.getStart();
	const dataCoordsEnd = this.getEnd();

	const startX = dataCoordsStart.getX() * value;
	const startY = dataCoordsStart.getY() * value;
	const endX = dataCoordsEnd.getX() * value;
	const endY = dataCoordsEnd.getY() * value;
	const startName = `${dataCoordsStart.getName()}×${value}`;
	const endName = `${dataCoordsEnd.getName()}×${value}`;

	const start = new Point(startX, startY, startName);
	const end = new Point(endX, endY, endName);

	return new Vector(start, end);
};

Vector.prototype.divide = function (value) {
	if (value === 0) {
		throw new Error('Делить на ноль нельзя.');
	}

	const dataCoordsStart = this.getStart();
	const dataCoordsEnd = this.getEnd();

	const startX = dataCoordsStart.getX() / value;
	const startY = dataCoordsStart.getY() / value;
	const endX = dataCoordsEnd.getX() / value;
	const endY = dataCoordsEnd.getY() / value;
	const startName = `${dataCoordsStart.getName()}/${value}`;
	const endName = `${dataCoordsEnd.getName()}/${value}`;

	const start = new Point(startX, startY, startName);
	const end = new Point(endX, endY, endName);

	return new Vector(start, end);
};

Vector.prototype.toString = function () {
	const start = this.getStart();
	const end = this.getEnd();
	const name = `${start.getName()}${end.getName()}`;
	return `Vector ${name} { start: ${start.toString()}, end: ${end.toString()} }`;
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
