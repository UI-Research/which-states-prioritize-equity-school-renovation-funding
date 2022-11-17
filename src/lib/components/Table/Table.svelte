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
	<table>
		{#each tableData as row}
			<tr>
				<td class="row-label">{row.label}</td>
				<td class="row-value">{row.value}</td>
			</tr>
		{/each}
	</table>
</div>

<style lang="scss">
	.table-container {
		width: 100%;
		height: 100%;
		font-size: 16px;
		line-height: 150%;
	}

	table {
		border-collapse: collapse;
	}

	tr {
		vertical-align: top;
		border-top: solid 1px var(--color-gray);

		&:first-of-type {
			border-top: none;
		}
	}

	td {
		padding: 15px 0px;
	}

	.row-label {
		font-weight: 700;
		width: 25%;
	}

	.row-value {
		padding-left: 16px;
	}
</style>
