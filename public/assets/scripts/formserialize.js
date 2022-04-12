function serialize(formObjectId, formatType = 'string') {
	const form = document.querySelector(formObjectId);
	let inputs = Array.from(
		document.querySelectorAll(`${formObjectId} input[name]`)
	);
	let textareas = Array.from(
		document.querySelectorAll(`${formObjectId} textarea[name]`)
	);

	const inputsArray = [...inputs, ...textareas];

	let data;

	// run switch statement
	switch (formatType) {
		case 'string': //format to string
			data = '';
			inputsArray.forEach((input, index) => {
				let inputName = input.name;
				let inputValue = input.value.trim();
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
			break;
	}

	return data;
}
