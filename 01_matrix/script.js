function cloneMatrix(matrix) {
	const matrixCopy = [];
	for (let i = 0; i < matrix.length; i++) {
		matrixCopy[i] = [];
		for (let j = 0; j < matrix[i].length; j++) {
			matrixCopy[i][j] = matrix[i][j];
		}
	}
	return matrixCopy;
}

function checkInstanceMatrix(exemplar, master) {
	if (!(exemplar instanceof master)) {
		throw new Error('Аргумент должен быть экземпляром класса Matrix');
	}
}

function checkSizeMatrix(matrixA, matrixB) {
	if (
		matrixA.length !== matrixB.length ||
		matrixA[0].length !== matrixB[0].length
	) {
		throw new Error('Матрицы должны быть одинакового размера');
	}
}

function Matrix(data, name = 'Matrix') {
	if (!Array.isArray(data) || !Array.isArray(data[0])) {
		throw new Error('Матрица должна быть двумерным массивом.');
	}

	if (data.length === 0 || data[0].length === 0) {
		throw new Error('Матрица не должна быть пустой.');
	}

	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data[i].length; j++) {
			if (typeof data[i][j] !== 'number' || !Number.isFinite(data[i][j])) {
				throw new Error('Все элементы матрицы должны быть числами.');
			}
		}
	}

	const rows = data.length;
	const cols = data[0].length;

	this.data = cloneMatrix(data);
	this.rows = rows;
	this.cols = cols;
	this.name = name;
}

Matrix.prototype.getData = function () {
	return cloneMatrix(this.data);
};

Matrix.prototype.getRows = function () {
	return this.rows;
};

Matrix.prototype.getCols = function () {
	return this.cols;
};

Matrix.prototype.getName = function () {
	return this.name;
};

Matrix.prototype.setName = function (value) {
	if (typeof value !== 'string') {
		throw new Error('Имя матрицы должно быть строкой.');
	}

	if (value.trim().length === 0) {
		throw new Error('Имя матрицы не должно быть пустой строкой.');
	}

	this.name = value;
};

Matrix.prototype.add = function (matrix) {
	checkInstanceMatrix(matrix, Matrix);

	const data = this.getData();
	const matrixData = matrix.getData();

	checkSizeMatrix(data, matrixData);

	const rows = this.getRows();
	const cols = this.getCols();

	const result = [];
	for (let i = 0; i < rows; i++) {
		result[i] = [];
		for (let j = 0; j < cols; j++) {
			result[i][j] = data[i][j] + matrixData[i][j];
		}
	}

	const dataName = this.getName();
	const matrixName = matrix.getName();

	return new Matrix(result, `${dataName} + ${matrixName}`);
};

Matrix.prototype.subtract = function (matrix) {
	checkInstanceMatrix(matrix, Matrix);

	const data = this.getData();
	const matrixData = matrix.getData();

	checkSizeMatrix(data, matrixData);

	const rows = this.getRows();
	const cols = this.getCols();

	const result = [];
	for (let i = 0; i < rows; i++) {
		result[i] = [];
		for (let j = 0; j < cols; j++) {
			result[i][j] = data[i][j] - matrixData[i][j];
		}
	}

	const dataName = this.getName();
	const matrixName = matrix.getName();

	return new Matrix(result, `${dataName} - ${matrixName}`);
};

Matrix.prototype.multiply = function (matrix) {
	checkInstanceMatrix(matrix, Matrix);

	if (this.getCols() !== matrix.getRows()) {
		throw new Error(
			'Количество столбцов первой матрицы должно быть равно количеству строк второй.'
		);
	}

	const data = this.getData();
	const dataRows = this.getRows();
	const dataCols = this.getCols();
	const matrixData = matrix.getData();
	const matrixCols = matrix.getCols();

	const result = [];
	for (let i = 0; i < dataRows; i++) {
		result[i] = [];
		for (let j = 0; j < matrixCols; j++) {
			let sum = 0;
			for (let k = 0; k < dataCols; k++) {
				sum += data[i][k] * matrixData[k][j];
			}
			result[i][j] = sum;
		}
	}

	const dataName = this.getName();
	const matrixName = matrix.getName();

	return new Matrix(result, `${dataName} * ${matrixName}`);
};

Matrix.prototype.transpose = function () {
	const data = this.getData();
	const rows = this.getRows();
	const cols = this.getCols();

	const result = [];
	for (let i = 0; i < cols; i++) {
		result[i] = [];
		for (let j = 0; j < rows; j++) {
			result[i][j] = data[j][i];
		}
	}

	const name = this.getName();

	return new Matrix(result, name);
};

Matrix.prototype.clone = function () {
	const data = this.getData();
	const name = this.getName();

	return new Matrix(data, name);
};

Matrix.prototype.toString = function () {
	const data = this.getData();
	const rows = this.getRows();
	const cols = this.getCols();

	let str = '';
	for (let i = 0; i < rows; i++) {
		for (let j = 0; j < cols; j++) {
			str += data[i][j];
			if (j < cols - 1) {
				str += ' ';
			}
		}
		if (i < rows - 1) {
			str += '\n';
		}
	}

	return str;
};

try {
	const matrixA = new Matrix(
		[
			[1, 2, 3],
			[4, 5, 6],
		],
		'A'
	);
	const matrixB = new Matrix(
		[
			[7, 8, 9],
			[1, 2, 3],
		],
		'B'
	);

	const matrixC = new Matrix(
		[
			[1, 4],
			[2, 5],
			[3, 6],
		],
		'C'
	);

	console.log(matrixA.toString());
	console.log('\n' + matrixB.toString());
	console.log('\n' + matrixC.toString());

	const sum = matrixA.add(matrixB);
	console.log('\nСложение:\n' + sum.toString());

	const sub = matrixA.subtract(matrixB);
	console.log('\nВычитание:\n' + sub.toString());

	const multipl = matrixA.multiply(matrixC);
	console.log('\nУмножение:\n' + multipl.toString());

	const transpose = matrixC.transpose();
	console.log('\nТраспонирование:\n' + transpose.toString());

	const clone = matrixB.clone();
	console.log('\nКлонирование:\n' + clone.toString());
} catch (error) {
	console.error('Ошибка:', error.message);
}
