import "reveal.js/dist/reset.css";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import "./reveal-custom.css";

import Reveal from "reveal.js";
import RevealNotes from "reveal.js/plugin/notes/notes.esm.js";

Reveal.initialize({
	hash: true,
	controls: true,
	progress: true,
	center: false,
	transition: "slide",
	width: "100%",
	height: "100%",
	margin: 0,
	minScale: 1,
	maxScale: 1,
	plugins: [RevealNotes]
});

Reveal.on("slidechanged", (event) => {
	const iframe = event.currentSlide.querySelector("iframe");

	if (iframe) {
		const src = iframe.src;
		iframe.src = "";

		requestAnimationFrame(() => {
			iframe.src = src;
		});
	}
});

let isHandlingFocus = false;

function restoreFocus() {
	if (!isHandlingFocus) {
		document.body.focus({ preventScroll: true });
	}
}

document.addEventListener("focusin", (e) => {
	if (e.target.tagName === "IFRAME" && !isHandlingFocus) {
		isHandlingFocus = true;
		queueMicrotask(() => {
			restoreFocus();
			isHandlingFocus = false;
		});
	}
});

document.addEventListener("visibilitychange", () => {
	if (!document.hidden) {
		restoreFocus();
	}
});

window.addEventListener("focus", restoreFocus);
window.addEventListener("pageshow", restoreFocus);
document.addEventListener("click", restoreFocus);

Reveal.on("ready", restoreFocus);
