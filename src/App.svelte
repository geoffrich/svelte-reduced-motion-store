<script>
	import {
		reducedMotion,
		tweenedReducedMotion,
		transitionReducedMotion,
		flyReducedMotion
	} from './reducedMotion';
	import { typewriter } from './customTransitions';
	import { fly, fade } from 'svelte/transition';

	import Test from './Test.svelte';
	import Svg from './Svg.svelte';
	import Crossfade from './Crossfade.svelte';

	let showCards = false;
	const progress = tweenedReducedMotion(0);

	const customFade = (node, params) => fade(node, { duration: 300 });
	//$: cardTransition = $reducedMotion ? customFade : fly;
	const cardTransition = transitionReducedMotion(fly, customFade);

	function toggleCards() {
		showCards = !showCards;
	}

	function toggleProgress() {
		progress.update((current) => (current === 0 ? 100 : 0));
	}
</script>

<main>
	<p>reduced motion: {$reducedMotion}</p>

	<button on:click={toggleCards}>Toggle cards </button>
	<button on:click={toggleProgress}>Toggle progress</button>
	<div>
		Progress: <progress value={$progress} max="100" />
	</div>

	{#if showCards}
		<div class="card-container">
			{#each new Array(5) as _, i}
				<div
					transition:$cardTransition={{
						y: 300,
						delay: i * 100
					}}
					class="card"
				>
					Card {i + 1}
				</div>
			{/each}
		</div>
	{/if}
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	main > * + * {
		margin-top: 1em;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	.card-container {
		display: flex;
		gap: 2em;
		justify-content: center;
	}

	.card {
		height: 150px;
		width: 200px;
		border: 2px solid black;
		display: grid;
		place-content: center;
		background: lightskyblue;
	}
</style>
