const header = document.querySelector(".header");
const burger = document.querySelector(".burger");
const body = document.body;

const classActive = "--active";
const classLocked = "--locked";

export const toggleMenu = () => {
	burger.addEventListener("click", () => {
		burger.classList.toggle(classActive);
		header.classList.toggle(classActive);
		body.classList.toggle(classLocked);
	});
}

export const menuBugFix = () => {
	window.addEventListener("resize", () => {
		if (window.innerWidth >= 1000) {
			burger.classList.remove(classActive);
			header.classList.remove(classActive);
			body.classList.remove(classLocked);
		}
	});
}