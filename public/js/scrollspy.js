let sections = $A("section");
let navlinks = $A("header nav ul.nav-links li");

window.addEventListener("scroll", () => {
	sections.forEach((sec) => {
		let top = wn.scrollY;
		let off = sec.offsetTop - 100;
		let height = sec.offsetHeight;
		let id = sec.getAttribute("id");

		if (top >= off && top < off + height) {
			navlinks.forEach((li) => {
				if (li.classList.contains("active")) li.classList.remove("active");
				let a = document.querySelector(
					`header nav ul.nav-links a[href*=${id}]`
				);
				if (a) {
					a.parentElement.classList.add("active");
				}
			});
		}
	});
});

sections.forEach((sec) => {
	let top = wn.scrollY;
	let off = sec.offsetTop;
	let height = sec.offsetHeight;
	let id = sec.getAttribute("id");
});
