function getUnsplashImage(category, maxRange, callback) {
	const client_id = 'a3g57QeNjayYKXevIYJpnRJRMrd1P2YSmRqyOouKtrw';
	const random_index = Math.floor(Math.random() * maxRange);

	const url = `https://api.unsplash.com/search/photos/?query=${category}&per_page=${maxRange}&client_id=${client_id}`;
	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			/* Fetch only image that you want by using random */
			callback(data.results[random_index]['urls']['full']);
		});
}

window.addEventListener(
	'load',
	getUnsplashImage('admin', 20, (imageSrc) => {
		const unsplashBackground = document.getElementById('unsplash-background');
		unsplashBackground.style.backgroundImage = `url('${imageSrc}')`;
		console.log(unsplashBackground.style.backgroundImage);
	})
);
