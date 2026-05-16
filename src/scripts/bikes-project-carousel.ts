const SELECTOR_ROOT = '[data-bike-carousel]';

function initCarousel(root: HTMLElement): void {
	const imgs = [...root.querySelectorAll('img.bike-slide')] as HTMLImageElement[];
	const dots = [...root.querySelectorAll('button.bike-dot')] as HTMLButtonElement[];
	if (imgs.length === 0) return;

	let current = 0;

	function applyIndex(nextIdx: number): void {
		const len = imgs.length;
		const n = ((nextIdx % len) + len) % len;

		imgs[current].classList.remove('z-10', 'opacity-100');
		imgs[current].classList.add('z-0', 'opacity-0');

		const prevDot = dots[current];
		if (prevDot) {
			prevDot.classList.remove('w-6', 'bg-white');
			prevDot.classList.add('w-2', 'bg-white/50');
			prevDot.removeAttribute('aria-current');
		}

		current = n;

		imgs[current].classList.remove('z-0', 'opacity-0');
		imgs[current].classList.add('z-10', 'opacity-100');

		const nextDot = dots[current];
		if (nextDot) {
			nextDot.classList.remove('w-2', 'bg-white/50');
			nextDot.classList.add('w-6', 'bg-white');
			nextDot.setAttribute('aria-current', 'true');
		}
	}

	function go(delta: number): void {
		applyIndex(current + delta);
	}

	root.addEventListener('click', (e: MouseEvent) => {
		const el = e.target;
		if (!(el instanceof Element)) return;

		if (el.closest('.bike-prev')) {
			go(-1);
			return;
		}
		if (el.closest('.bike-next')) {
			go(1);
			return;
		}

		const dot = el.closest('.bike-dot');
		if (dot instanceof HTMLButtonElement) {
			const i = dots.indexOf(dot);
			if (i >= 0) applyIndex(i);
		}
	});
}

export function bootBikesProjectCarousels(): void {
	document.querySelectorAll(SELECTOR_ROOT).forEach((el) => {
		if (el instanceof HTMLElement) initCarousel(el);
	});
}
