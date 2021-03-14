<script>
	import { fly } from 'svelte/transition';
	import { readable } from 'svelte/store';

	const transitionStore = new readable(fly);
	const actionStore = new readable((node) => {
		console.log(node);
	});
</script>

<div transition:$transitionStore={{ y: 100 }} use:$actionStore>
	I'm some content
</div>
