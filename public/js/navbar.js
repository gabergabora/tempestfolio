//navbar
//responsive
/**
 * if window isMobile => bg-white, nav-collapsed
 * on resize, on init => if window isMobile => bg-white, nav-collapsed
 * onscrollY  => if window scroll is > 30 bg=>white shadow
 * onscrollY  => if window scroll is < and isDesktop 30 bg=>white shadow
 *
 * window-scroll window-width, body-resize, navbar
 * isMobile =768px;
 *
 */

//##########
// Nav Scroll function

wn.addEventListener("scroll", function () {
	const isMoblie = wn.innerWidth <= 1024 ? true : false;
	const navbar = $("nav.navbar");
	navbar.style.transition = "all .5s ease-in-out";

	if (wn.scrollY < 30 && wn.innerWidth >= 1024) {
		if (!navbar.classList.contains("bg-transparent"))
			navbar.classList.add("bg-transparent");
		if (navbar.classList.contains("bg-light"))
			navbar.classList.remove("bg-light");
		navbar_height = "100px";
	}
	if (wn.scrollY > 30) {
		if (navbar.classList.contains("bg-transparent"))
			navbar.classList.remove("bg-transparent");
		if (!navbar.classList.contains("bg-light"))
			navbar.classList.add("bg-light");
		navbar_height = "7vh";
	}
});

//##########
// Nav Resize Media
function navResizeMedia() {
	const navbar = $("nav.navbar");
	if (wn.innerWidth < 1024) {
		//is mobile
		navbar.className = "navbar navbar-collapsed bg-light";
	} else if (wn.innerWidth > 1024 && wn.scrollY < 30) {
		//is desktop
		navbar.className = "navbar navbar-expanded bg-transparent";
	} else {
		navbar.className = "navbar navbar-expanded bg-light";
	}
}

//##########
// Navbar-Collapse Toggle
function navbarCollapseToggle() {
	const nav_links = $("ul.nav-links");
	const navbar = $("nav.navbar");

	if (nav_links.style.maxHeight == "") {
		nav_links.style.maxHeight = `${nav_links.scrollHeight}px`;
		if (!navbar.classList.contains("show")) {
			navbar.classList.add("show");
		}
	} else {
		nav_links.style.maxHeight = null;
		if (navbar.classList.contains("show")) {
			navbar.classList.remove("show");
		}
	}
}

//##########
// Window Init
(function init() {
	const navbar = $("nav.navbar");
	const isMoblie = wn.innerWidth <= 1024 ? true : false;
	if (isMoblie) {
		navbar.className = "navbar navbar-collapsed bg-light";
	} else {
		navbar.className = "navbar navbar-expanded bg-transparent";
	}
})();

//##########
// Window Resize Media
function resizeMedia() {
	navResizeMedia();
}
