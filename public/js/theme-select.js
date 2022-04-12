//on page load
getTheme();

// Get former theme on localstorage or set default = blue;
function getTheme() {
	let theme = "";
	//on fisrt visit
	if (!localStorage["user-theme"]) {
		localStorage.setItem("user-theme", " #007bff");
	}
	theme = localStorage.getItem("user-theme");
	document.documentElement.style.setProperty("--cl-primary", theme);
	//use theme
}

function setTheme(theme) {
	localStorage.setItem("user-theme", theme);
	getTheme();
}

//Theme select toggler
const themeSelectButton = $("button#theme-picker-toggle");

themeSelectButton.addEventListener("click", () => {
	themeSelectButton.parentElement.classList.toggle("active");
});
