function Matrix(data, name = 'Matrix') {
	if (data.length === 0 || data[0].length === 0) {
		throw new Error('Матрица не должна быть пустой.');
	}

	if (!Array.isArray(data) || !Array.isArray(data[0])) {
		throw new Error('Матрица должна быть двумерным массивом.');
	}

	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data[i].length; j++) {
			if (typeof data[i][j] !== 'number' || !Number.isFinite(data[i][j])) {
				throw new Error('Все элементы матрицы должны быть числами.');
			}
		}
	}

	this.data = [];
	for (let i = 0; i < data.length; i++) {
		this.data[i] = [];
		for (let j = 0; j < data[0].length; j++) {
			this.data[i][j] = data[i][j];
		}
	}

	this.rows = data.length;
	this.cols = data[0].length;
	this.name = name;
}

Matrix.prototype.getData = function () {
	return this.data;
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
	if (!(matrix instanceof Matrix)) {
		throw new Error('Аргумент должен быть экземпляром класса Matrix');
	}

	if (this.rows !== matrix.rows || this.cols !== matrix.cols) {
		throw new Error('Матрицы должны быть одинакового размера');
	}

	const result = [];
	for (let i = 0; i < this.rows; i++) {
		result[i] = [];
		for (let j = 0; j < this.cols; j++) {
			result[i][j] = this.data[i][j] + matrix.data[i][j];
		}
	}

	return new Matrix(result, this.name);
};

Matrix.prototype.subtract = function (matrix) {
	if (!(matrix instanceof Matrix)) {
		throw new Error('Аргумент должен быть экземпляром класса Matrix');
	}

	if (this.rows !== matrix.rows || this.cols !== matrix.cols) {
		throw new Error('Матрицы должны быть одинакового размера');
	}

	const result = [];
	for (let i = 0; i < this.rows; i++) {
		result[i] = [];
		for (let j = 0; j < this.cols; j++) {
			result[i][j] = this.data[i][j] - matrix.data[i][j];
		}
	}

	return new Matrix(result, this.name);
};

Matrix.prototype.multiply = function (matrix) {
	if (!(matrix instanceof Matrix)) {
		throw new Error('Аргумент должен быть экземпляром класса Matrix');
	}

	if (this.cols !== matrix.rows) {
		throw new Error(
			'Количество столбцов первой матрицы должно быть равно количеству строк второй.'
		);
	}

	const result = [];
	for (let i = 0; i < this.rows; i++) {
		result[i] = [];
		for (let j = 0; j < matrix.cols; j++) {
			let sum = 0;
			for (let k = 0; k < this.cols; k++) {
				sum += this.data[i][k] * matrix.data[k][j];
			}
			result[i][j] = sum;
		}
	}

	return new Matrix(result, this.name);
};

Matrix.prototype.transpose = function () {
	const result = [];

	for (let i = 0; i < this.cols; i++) {
		result[i] = [];
		for (let j = 0; j < this.rows; j++) {
			result[i][j] = this.data[j][i];
		}
	}

	return new Matrix(result, this.name);
};

Matrix.prototype.clone = function () {
	const copied = [];
	for (let i = 0; i < this.rows; i++) {
		copied[i] = [];
		for (let j = 0; j < this.cols; j++) {
			copied[i][j] = this.data[i][j];
		}
	}

	return new Matrix(copied, this.name);
};

Matrix.prototype.toString = function () {
	let str = '';
	for (let i = 0; i < this.rows; i++) {
		for (let j = 0; j < this.cols; j++) {
			str += this.data[i][j];
			if (j < this.cols - 1) {
				str += ' ';
			}
		}
		if (i < this.rows - 1) {
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
