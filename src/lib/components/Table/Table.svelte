<script>
	import { currentState, stateData } from '$stores/dataStore';
	import Tooltip from '$components/Tooltip/Tooltip.svelte';
	export let showTooltips = true;

	const keys = [
		{
			name: 'State Funding Types',
			display: 'Funding Types',
			tooltipText:
				'States can fund school capital projects in various ways, such as through direct grant aid, subsidized loans, or debt reimbursement, if they fund capital projects at all'
		},
		{
			name: 'State Prioritization',
			display: 'State Priorities',
			tooltipText:
				'States often prioritize which projects get state support. These priorities can range from health and safety concerns in buildings to supporting low-wealth districts that struggle to raise local funds.'
		},
		{
			name: 'Facility Assessment Requirements',
			display: 'Facility Assessments',
			tooltipText:
				'A facility or conditions assessment can help states and school districts identify construction needs. Some states require such assessments, which can be conducted by either the districts or the state.'
		},
		{
			name: 'Equity Measures',
			display: 'Equity Measures',
			tooltipText:
				'Some states have enacted measures that prioritize funding districts with low property wealth or high shares of students from low-income backgrounds, or for other groups of students.'
		}
	];

	$: tableData =
		$currentState !== ''
			? keys.map((key) => ({
					label: key.display,
					value: $stateData.gridData[key.name],
					tooltipText: key.tooltipText
			  }))
			: [];
</script>

<div class="table-container">
	{#each tableData as row}
		<div class="row">
			<div class="row-label">
				{@html row.label}
				{#if showTooltips}
					<Tooltip tooltipText={row.tooltipText} />
				{/if}
			</div>
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
