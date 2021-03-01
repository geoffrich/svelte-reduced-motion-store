import { readable } from 'svelte/store';

const reducedMotionQuery = '(prefers-reduced-motion: no-preference)';

function getInitialMotionPreference() {
	const hasNoMotionPreference = window.matchMedia(reducedMotionQuery).matches;
	return !hasNoMotionPreference;
}

export default readable(false, (set) => {
	const mediaQueryList = window.matchMedia(reducedMotionQuery);

	const updateMotionPreference = (event) => {
		set(!event.matches);
	};

	mediaQueryList.addEventListener('change', updateMotionPreference);

	set(getInitialMotionPreference());

	return () => {
		mediaQueryList.removeEventListener('change', updateMotionPreference);
	};
});
