function checkArgNumber(name, value, isInteger, min) {
	if (typeof value !== 'number' || !Number.isFinite(value)) {
		throw new Error(`${name} должно быть числом.`);
	}

	if (isInteger && Math.floor(value) !== value) {
		throw new Error(`${name} должно быть целым числом`);
	}

	if (value < min) {
		throw new Error(`${name} не может быть меньше ${min}`);
	}
}

function checkArgString(name, value) {
	if (typeof value !== 'string' || value.trim().length === 0) {
		throw new Error(`${name} не может быть пустой строкой.`);
	}
}

function checkInstanceClass(name, exemplar, master) {
	if (!(exemplar instanceof master)) {
		throw new Error(`${name} должен быть экземпляром класса ${master}`);
	}
}

function dataCopy(data) {
	if (!Array.isArray(data)) {
		throw new Error('Аргумент должен быть массивом');
	}

	const arr = [];

	for (let i = 0; i < data.length; i++) {
		arr[arr.length] = data[i];
	}

	return arr;
}

export { checkArgNumber, checkArgString, checkInstanceClass, dataCopy };
