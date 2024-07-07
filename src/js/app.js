import * as webP from "./modules/webp.js";
import { menuBugFix, toggleMenu } from "./modules/menu.js";
import { startMask } from "./modules/mask.js";
import fslightbox from "fslightbox";
import { initMap } from "./modules/map.js";

webP.isWebp();
toggleMenu();
menuBugFix();
startMask();

ymaps3.ready.then(() => {
	initMap();
});