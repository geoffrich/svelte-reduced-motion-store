export function typewriter(node, { speed = 50 }) {
	const valid =
		node.childNodes.length === 1 &&
		node.childNodes[0].nodeType === Node.TEXT_NODE;

	if (!valid) {
		throw new Error(
			`This transition only works on elements with a single text node child`
		);
	}

	const text = node.textContent;
	const duration = text.length * speed;

	return {
		duration,
		tick: (t) => {
			const i = ~~(text.length * t);
			node.textContent = text.slice(0, i);
		}
	};
}

import { cubicOut } from 'svelte/easing';

export function expand(node, params) {
	const { delay = 0, duration = 400, easing = cubicOut } = params;

	const w = parseFloat(getComputedStyle(node).strokeWidth);

	return {
		delay,
		duration,
		easing,
		css: (t) => `opacity: ${t}; stroke-width: ${t * w}`
	};
}
