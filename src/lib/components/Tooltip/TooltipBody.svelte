<script>
	export let tooltipText;
</script>

<div id="tooltip">
	{tooltipText}
	<div id="arrow" data-popper-arrow />
</div>

<style>
	#tooltip {
		background: black;
		color: white;
		max-width: 215px;
		padding: 12px;
		font-weight: 400;
		font-size: 14px;
		line-height: 150%;
	}

	#arrow,
	#arrow::before {
		position: absolute;
		width: 8px;
		height: 8px;
		z-index: -1;
	}

	#arrow::before {
		content: '';
		transform: rotate(45deg);
		background: black;
	}

	:global(#tooltip[data-popper-placement^='bottom'] > #arrow) {
		top: -4px;
	}

	:global(#tooltip[data-popper-placement^='top'] > #arrow) {
		bottom: -4px;
	}

	:global(#tooltip[data-popper-placement^='left'] > #arrow) {
		right: -4px;
	}

	:global(#tooltip[data-popper-placement^='right'] > #arrow) {
		left: -4px;
	}
</style>
