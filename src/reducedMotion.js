import { readable, derived } from 'svelte/store';
import { tweened } from 'svelte/motion';
import { fly } from 'svelte/transition';

const reducedMotionQuery = '(prefers-reduced-motion: reduce)';

const getInitialMotionPreference = () =>
	window.matchMedia(reducedMotionQuery).matches;

export const reducedMotion = readable(getInitialMotionPreference(), (set) => {
	const updateMotionPreference = (event) => {
		set(event.matches);
	};

	const mediaQueryList = window.matchMedia(reducedMotionQuery);
	mediaQueryList.addEventListener('change', updateMotionPreference);

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

const noOp = () => {};
export const transitionReducedMotion = (transition) =>
	derived(reducedMotion, ($reducedMotion, set) => {
		if ($reducedMotion) {
			set(noOp);
		} else {
			set(transition);
		}
	});

export const flyReducedMotion = transitionReducedMotion(fly);
