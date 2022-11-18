<script>
	import { currentState, stateData } from '$stores/dataStore';

	const keys = [
		'State Funding Types',
		'State Prioritization',
		'Facility Assessment Requirements',
		'Equity Measures'
	];

	$: tableData =
		$currentState !== ''
			? keys.map((key) => ({ label: key, value: $stateData.gridData[key] }))
			: [];
</script>

<div class="table-container">
	{#each tableData as row}
		<div class="row">
			<div class="row-label">{row.label}</div>
			<div class="row-value">{row.value}</div>
		</div>
	{/each}
</div>

<style lang="scss">
	.table-container {
		width: 100%;
		height: 100%;
		font-size: 16px;
		line-height: 150%;
	}

	.row {
		width: 100%;
		display: flex;
		vertical-align: top;
		border-top: solid 1px var(--color-gray);
		padding: 15px 0px;

		&:first-of-type {
			border-top: none;
		}
	}

	.row-label {
		width: 200px;
		flex: 1 1 0;
		font-weight: 700;
	}

	.row-value {
		flex: 3 1 0;
		padding-left: 16px;
	}

	@media screen and (max-width: 550px) {
		.row {
			flex-direction: column;
		}

		.row-value {
			padding-left: 0px;
			padding-top: 8px;
		}
	}
</style>
