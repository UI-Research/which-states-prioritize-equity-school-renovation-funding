<script>
	import { stateData, currentState } from '$stores/dataStore';
	import { draw, fade } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { scaleLinear } from 'd3-scale';
	import { min, max, extent } from 'd3-array';
	import { line, curveBasis } from 'd3-shape';

	import { color } from '$data/variables.json';

	export let footnoteTxt;
	export let sourceTxt;

	const width = 300;
	const height = 300;
	const margin = { top: 40, right: 35, bottom: 40, left: 35 };
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	// defaults
	const xScale = scaleLinear().domain([1997, 2015]).range([0, innerWidth]);
	const xTicks = [...Array(2016 - 1997)].map((_, i) => 1997 + i);
	const xTickLabels = [1997, 2000, 2005, 2010, 2015];
	let yScale = scaleLinear().domain([0.1, 1.9]).range([innerHeight, 0]);
	let yTicks = [1];
	let pathLine;
	let data = [];

	$: if ($currentState !== '') {
		data = $stateData.fundingData.filter((d) => d.value !== null);

		pathLine = line()
			.x((d) => xScale(d.year))
			.y((d) => yScale(d.value));
	}

	$: asterisk = [
		'Arizona',
		'Iowa',
		'Massachusetts',
		'New Jersey',
		'New Mexico',
		'New York',
		'Rhode Island'
	].includes($currentState)
		? '*'
		: '';
</script>

<div class="chart-container" style:width={`${width}px`}>
	<div class="chart-title">Changes in Capital Expenditures Progressivity</div>

	<!-- CHART SVG -->
	<svg {width} {height}>
		<g transform={`translate(${margin.left},${margin.top})`}>
			<!-- Background rects & Labels -->
			<rect x="0" y="0" width={innerWidth} height={innerHeight / 2} fill={color['blue-lightest']} />
			<rect
				x="0"
				y={yScale(1)}
				width={innerWidth}
				height={innerHeight / 2}
				fill={color['blue-light']}
			/>
			<line
				x1={xScale.range()[0]}
				x2={xScale.range()[1]}
				y1={yScale(1)}
				y2={yScale(1)}
				stroke-width="2"
				stroke-dasharray="4"
				stroke="#000000"
			/>
		</g>

		<!-- State Ratio Line -->
		<g transform={`translate(${margin.left},${margin.top})`}>
			{#key data}
				<path
					class="state-line"
					in:draw={{ duration: 1500, ease: cubicOut }}
					d={pathLine(data)}
					fill="none"
					stroke={color.blue}
					stroke-width="4"
				/>
				<text
					class="line-label"
					in:fade={{ delay: 1500 }}
					x={xScale(2015) + 3}
					y={yScale(data.slice(-1)[0].value)}
					dominant-baseline="middle"
					fill={color.blue}>{$stateData.abbrev}{asterisk}</text
				>
			{/key}
		</g>

		<!----- AXES ----->
		<!-- X -->
		<g transform={`translate(${margin.left},${margin.top + innerHeight})`}>
			<line x1={xScale(1997)} x2={xScale(2015)} y1={0} y2={0} stroke="#000000" />
			{#each xTicks as xTick}
				<line
					class="axis-tick"
					x1={xScale(xTick)}
					x2={xScale(xTick)}
					y1={0}
					y2={5}
					stroke="#000000"
				/>
			{/each}
			{#each xTickLabels as xTickLabel}
				<text
					class="axis-tick-label"
					x={xScale(xTickLabel)}
					y={10}
					text-anchor="middle"
					dominant-baseline="hanging">{xTickLabel}</text
				>
			{/each}
		</g>

		<!-- Y -->
		<g transform={`translate(${margin.left},${margin.top})`}>
			<text class="y-axis-label" x="-33" y="-10">Funding ratio</text>
			{#each yTicks as yTick}
				<line
					class="axis-tick"
					x1={-5}
					x2={0}
					y1={yScale(yTick)}
					y2={yScale(yTick)}
					stroke="#000000"
				/>
				<text
					class="axis-tick-label"
					x={-7}
					y={yScale(yTick)}
					text-anchor="end"
					dominant-baseline="middle">{yTick.toFixed(2)}</text
				>
			{/each}
		</g>

		<!-- PROGRESSIVE/REGRESSIVE LABELS -->
		<g transform={`translate(${margin.left},${margin.top})`}>
			<text
				class="bg-label"
				x={xScale.range()[1] * 0.95}
				y={yScale.range()[1] + 10}
				text-anchor="end"
				dominant-baseline="hanging">PROGRESSIVE</text
			>
			<text
				class="bg-label"
				x={xScale.range()[1] * 0.95}
				y={yScale.range()[0] - 10}
				text-anchor="end">REGRESSIVE</text
			>
		</g>
	</svg>
	<div class="chart-footnotes-area">{@html sourceTxt} <br /><br /> {@html footnoteTxt}</div>
</div>

<style lang="scss">
	.chart-container {
		margin-top: 16px;
		// border: solid 1px #ccc;
	}

	.chart-footnotes-area {
		width: 100%;
		font-size: 12px;
		line-height: 18px;
	}

	.chart-title {
		font-weight: 700;
	}

	.bg-label {
		font-size: 13px;
		fill: var(--color-neutral-darkest);
	}

	.line-label {
		font-weight: 700;
	}

	.axis-tick-label {
		font-size: 13px;
		fill: var(--color-neutral-darkest);
	}

	.y-axis-label {
		font-style: italic;
	}
</style>
