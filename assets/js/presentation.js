import "reveal.js/dist/reset.css";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";
import "../css/reveal-custom.css";

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

// 포커스를 body로 복원하는 함수
function restoreFocus() {
	if (!isHandlingFocus) {
		document.body.focus({ preventScroll: true });
	}
}

// iframe에 포커스가 들어갈 때 감지
document.addEventListener("focusin", (e) => {
	if (e.target.tagName === "IFRAME" && !isHandlingFocus) {
		isHandlingFocus = true;
		queueMicrotask(() => {
			restoreFocus();
			isHandlingFocus = false;
		});
	}
});

// 페이지가 다시 보일 때 (다른 탭에서 돌아올 때)
document.addEventListener("visibilitychange", () => {
	if (!document.hidden) {
		restoreFocus();
	}
});

// 윈도우가 포커스를 받을 때
window.addEventListener("focus", restoreFocus);

// 뒤로가기로 돌아올 때
window.addEventListener("pageshow", restoreFocus);

// 사용자가 페이지를 클릭했을 때
document.addEventListener("click", restoreFocus);

// 초기 로드 시
Reveal.on("ready", restoreFocus);
