// Verify OTP
function verifyOTP(code) {
	return new Promise((resolve, reject) => {
		//Fetch Api
		fetch('/admin/otp/verify', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				OTP: code,
			}),
		})
			.then((response) => {
				if (response.status > 399) {
					reject(response);
				} else {
					resolve(response.json());
				}
			})
			.then((data) => resolve(data))
			.catch((err) => {
				reject(err);
			});
	});
}

function verifyMail(mail) {
	return new Promise((resolve, reject) => {
		//Fetch Api
		fetch('/admin/otp/generate', {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				mail,
			}),
		})
			.then((response) => {
				if (response.status > 399) {
					reject(response);
				} else {
					resolve(response.json());
				}
			})
			.then((data) => resolve(data))
			.catch((err) => {
				reject(err);
			});
	});
}

function formLoaderShow() {
	Array.from(document.querySelectorAll('.loading.hidden')).forEach(
		(element) => {
			element.classList = 'loading show';
		}
	);
}

function formLoaderHide() {
	Array.from(document.querySelectorAll('.loading.show')).forEach((element) => {
		element.classList = 'loading hidden';
	});
}

// formLoaderShow();
// formLoaderHide();
