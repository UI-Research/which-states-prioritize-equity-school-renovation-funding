<script>
	import SearchBar from '$components/SearchBar/SearchBar.svelte';
	import Chart from '$components/Chart/Chart.svelte';
	import Table from '$components/Table/Table.svelte';

	import { currentState } from '$lib/stores/dataStore';
	import { slide } from 'svelte/transition';
</script>

<div class="tool-container">
	<SearchBar />

	{#if $currentState !== ''}
		<div class="state-container col-12" transition:slide>
			<div class="chart-area">
				<h1 class="state-display">{$currentState}</h1>
				<div class="chart-wrapper">
					<Chart />
				</div>
			</div>

			<div class="table-area">
				<Table />
			</div>

			<div class="footnotes-area">
				<b>Notes:</b> Figures are for full-time students from families with incomes below $30,000 who
				received Pell grants at in-state public four-year institutions. Figures have been converted to
				constant 2020 dollars using the Personal Consumption Expenditures Price index.
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.tool-container {
		width: 100%;
		padding: 0px 30px;
		background-color: var(--color-neutral-lightest);
		border: solid 1px var(--color-gray);
	}

	.state-container {
		border-top: solid 1px var(--color-gray);
		padding: 30px 0px;
	}

	.chart-area {
		grid-row: 1;
		grid-column: 1 / span 5;
		width: 100%;
	}

	.state-display {
		text-transform: uppercase;
		font-weight: 300;
		font-size: 30px;
		line-height: 41.25px;
	}

	.chart-wrapper {
		display: flex;
		justify-content: center;
		align-items: flex-start;
		width: 100%;
	}

	.table-area {
		grid-row: 1;
		grid-column: 6 / -1;
		width: 100%;
	}

	.footnotes-area {
		grid-row: 2;
		grid-column: 1/-1;
		margin-top: 36px;
		font-size: 12px;
		line-height: 18px;
	}
</style>
