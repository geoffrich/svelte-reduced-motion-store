<script>
	import reducedMotion from './reducedMotion';
	import { fly } from 'svelte/transition';
	import { tweened } from 'svelte/motion';

	let showCards = false;
	const progress = tweened(0);

	function toggleCards() {
		showCards = !showCards;
	}

	function toggleProgress() {
		progress.update((current) => (current === 0 ? 100 : 0), {
			duration: $reducedMotion ? 0 : 400
		});
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
					transition:fly={{ y: 100, delay: $reducedMotion ? 0 : i * 100 }}
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
