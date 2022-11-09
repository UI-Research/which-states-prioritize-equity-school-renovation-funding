<script>
	import { stateFundingData } from '$lib/stores/dataStore';
	import SearchBar from './SearchBar/SearchBar.svelte';

	let currentState = '';

	let currentStateData;
	$: if (currentState !== '') {
		currentStateData = $stateFundingData.find((d) => d.State === currentState);
	}

	$: console.log('main', currentState);
	$: console.log('main', currentStateData);
</script>

<div class="container">
	<SearchBar bind:currentState />
</div>

<style>
	.container {
		width: 100%;
		padding: 30px;
		background-color: var(--color-neutral-lightest);
		border: solid 1px var(--color-gray);
	}
</style>
