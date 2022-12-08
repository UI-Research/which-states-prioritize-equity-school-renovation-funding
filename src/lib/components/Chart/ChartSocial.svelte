<script>
	import { stateData, currentState } from '$stores/dataStore';
	import { scaleLinear } from 'd3-scale';
	import { line } from 'd3-shape';
	import urbanLogo from '$assets/UrbanLogo.svg';

	import { color } from '$data/variables.json';

	export let footnoteTxt;
	export let sourceTxt;

	const width = 1200;
	const svgWidth = width - 60;
	const svgHeight = 500;
	const margin = { top: 30, right: 65, bottom: 30, left: 20 };
	const innerHeight = svgHeight - margin.top - margin.bottom;
	const innerWidth = svgWidth - margin.left - margin.right;

	// defaults
	const xScale = scaleLinear().domain([1995, 2015]).range([0, innerWidth]);
	const xTicks = [...Array(2016 - 1995)].map((_, i) => 1995 + i);
	const xTickLabels = [1995, 2000, 2005, 2010, 2015];
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
	<svg width={svgWidth} height={svgHeight}>
		<!-- <rect x="0" y="0" width={svgWidth} height={svgHeight} fill="#ff0000" /> -->

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
					d={pathLine(data)}
					fill="none"
					stroke={color.blue}
					stroke-width="5"
				/>
				<text
					class="line-label"
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
			<line x1={xScale(1995)} x2={xScale(2015)} y1={0} y2={0} stroke="#000000" />
			{#each xTicks as xTick}
				<line
					class="axis-tick"
					x1={xScale(xTick)}
					x2={xScale(xTick)}
					y1={0}
					y2={10}
					stroke="#000000"
				/>
			{/each}
			{#each xTickLabels as xTickLabel}
				<text
					class="axis-tick-label"
					x={xScale(xTickLabel)}
					y={15}
					text-anchor="middle"
					dominant-baseline="hanging">{xTickLabel}</text
				>
			{/each}
		</g>

		<!-- Y -->
		<g transform={`translate(${margin.left},${margin.top})`}>
			<text class="y-axis-label" x="-19" y="-10">Funding Ratio</text>
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
					dominant-baseline="middle">{yTick}</text
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
	<div class="logo-container">
		<img src={urbanLogo} alt="" />
	</div>
	<div class="footnote">{@html sourceTxt}<br />{@html footnoteTxt}</div>
</div>

<style lang="scss">
	.chart-container {
		padding: 20px 60px;
		border: solid 1px #ccc;
		background-color: white;
	}

	.chart-title {
		font-size: 30px;
		line-height: 41.25px;
		font-weight: 700;
		margin-bottom: 8px;
	}

	.bg-label {
		font-size: 18px;
		fill: var(--color-neutral-darkest);
	}

	.line-label {
		font-weight: 700;
		font-size: 26px;
	}

	.axis-tick-label {
		font-size: 18px;
		fill: var(--color-neutral-darkest);
	}

	.y-axis-label {
		font-style: italic;
		font-size: 20px;
	}

	.logo-container {
		margin: 8px 0px;
		text-align: right;

		img {
			height: 21px;
			width: 120px;
		}
	}

	.footnote {
		font-size: 12px;
	}
</style>
