/**
 * serialize()
 * @param {string} formObjectId
 * @param {string} formatType
 * @returns {string || json}
 */
function serialize(formObjectId, formatType = 'json') {
	const form = document.querySelector(formObjectId);

	let inputsArray = Array.from(
		document.querySelectorAll(`${formObjectId} input[name]`)
	);
	let data;

	// run switch statement
	switch (formatType) {
		case 'string': //format to string
			data = '';
			inputsArray.forEach((input, index) => {
				let inputName = input.name;
				let inputValue = input.value;
				data += `${inputName}=${inputValue}`;

				if (index < inputsArray.length - 1) {
					data += '&';
				}
			});
			break;

		case 'json':
			data = {};
			inputsArray.forEach((input, index) => {
				let inputName = input.name;
				let inputValue = input.value;
				data[inputName] = inputValue;
			});
			data = JSON.stringify(data);
			break;
	}

	return data;
}
