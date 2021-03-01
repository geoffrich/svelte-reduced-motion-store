import { readable } from 'svelte/store';
import { tweened } from 'svelte/motion';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

const getInitialMotionPreference = () =>
	window.matchMedia(reducedMotionQuery).matches;

export const reducedMotion = readable(false, (set) => {
	const mediaQueryList = window.matchMedia(reducedMotionQuery);

	const updateMotionPreference = (event) => {
		set(event.matches);
	};

	mediaQueryList.addEventListener('change', updateMotionPreference);

	set(getInitialMotionPreference());

	return () => {
		mediaQueryList.removeEventListener('change', updateMotionPreference);
	};
});

export const tweenedReducedMotion = function (value, options) {
	const _tweened = tweened(value, options);
	let prefersReducedMotion = false;
	const reducedMotionUnsubscribe = reducedMotion.subscribe((val) => {
		prefersReducedMotion = val;
	});

	const getOptions = (options) => {
		return prefersReducedMotion ? { ...options, duration: 0 } : options;
	};

	const customSet = (val, options) => {
		_tweened.set(val, getOptions(options));
	};

	const customUpdate = (updater, options) => {
		_tweened.update(updater, getOptions(options));
	};

	const customSubscribe = (run) => {
		const tweenedUnsubscribe = _tweened.subscribe(run);
		return () => {
			tweenedUnsubscribe();
			reducedMotionUnsubscribe();
		};
	};

	return {
		subscribe: customSubscribe,
		set: customSet,
		update: customUpdate
	};
};
