<script>
	import SearchBar from '$components/SearchBar/SearchBar.svelte';
	import Chart from '$components/Chart/Chart.svelte';
	import ChartSocial from '$components/Chart/ChartSocial.svelte';
	import Table from '$components/Table/Table.svelte';
	import downloadIcon from '$lib/assets/downloadIcon.svg';
	import domtoimage from 'dom-to-image';
	import { saveAs } from 'file-saver';
	import { currentState } from '$lib/stores/dataStore';
	import { slide } from 'svelte/transition';

	const handleSaveChart = () => {
		domtoimage.toBlob(document.getElementById('social-chart')).then((blob) => {
			saveAs(blob, `${$currentState}_K-12Funding_Social.png`);
		});
		domtoimage.toBlob(document.getElementById('screenshot')).then((blob) => {
			saveAs(blob, `${$currentState}_K-12Funding.png`);
		});
	};

	const sourceTxt = `<b>Source:</b> Urban Institute analysis of Common Core of Data and Small Area Income and Poverty Estimates data.`;
	const footnoteBase =
		'Five-year rolling averages are presented for the middle year (e.g., 2015 data are an average of data from 2013 to 2017). Data presented here are for geographic school districts only; see the <a href="https://www.urban.org/research/publication/assessing-national-landscape-capital-expenditures-public-school-districts" target="_blank">report</a> for additional context.';
	$: footnoteExtra = [
		'Arizona',
		'Iowa',
		'Massachusetts',
		'New Jersey',
		'New Mexico',
		'New York',
		'Rhode Island'
	].includes($currentState)
		? 'Asterisk denotes national data are substantially different than state-reported data and should be treated with caution. '
		: '';
	$: footnoteTxt = `<b>Notes:</b> ${footnoteExtra}${footnoteBase}`;
</script>

<div class="tool-container">
	<SearchBar />

	{#if $currentState !== ''}
		<div class="divider" />
		<div class="state-container col-12" transition:slide>
			<div class="chart-area">
				<h1 class="state-display">{$currentState}</h1>
				<div class="chart-wrapper">
					<Chart {footnoteTxt} {sourceTxt} />
				</div>
			</div>

			<div class="table-area">
				<Table />
			</div>
		</div>
	{/if}
</div>

{#if $currentState !== ''}
	<div class="button-container">
		<div class="save-button" on:click={handleSaveChart}>
			SAVE CHART <img src={downloadIcon} alt="" />
		</div>
	</div>
{/if}

<!-- OFFSCREEN CONTAINER FOR GENERATING DOWNLOADABLE IMAGES -->
<div class="offscreen-downloads-container">
	{#if $currentState !== ''}
		<!-- Social Chart -->
		<div id="social-chart">
			<ChartSocial
				{sourceTxt}
				footnoteTxt={footnoteTxt.replace(/<a href(.[^>]*)>/g, '').replace(/<\/a>/g, '')}
			/>
		</div>

		<!-- Full Tool -->
		<div id="screenshot">
			<div class="state-container col-12">
				<div class="chart-area">
					<h1 class="state-display">{$currentState}</h1>
					<div class="chart-wrapper">
						<Chart
							{sourceTxt}
							footnoteTxt={footnoteTxt.replace(/<a href(.[^>]*)>/g, '').replace(/<\/a>/g, '')}
						/>
					</div>
				</div>

				<div class="table-area">
					<Table showTooltips={false} />
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="scss">
	.tool-container {
		width: 100%;
		display: block;
		padding: 0px 30px;
		background-color: var(--color-neutral-lightest);
		border: solid 1px var(--color-gray);
	}

	.divider {
		border-top: solid 1px var(--color-gray);
		height: 1px;
	}

	.state-container {
		padding: 30px 0px;
	}

	.chart-area {
		grid-row: 1;
		grid-column: 1 / span 5;
		width: 100%;
		// border: solid 1px red;
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
		width: 100%;
		grid-row: 2;
		grid-column: 1/-1;
		margin-top: 36px;
		font-size: 12px;
		line-height: 18px;
	}

	.button-container {
		display: flex;
		justify-content: flex-end;
		margin: 16px 0;
		text-align: end;
	}

	.save-button {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
		font-size: 1.8rem;
		font-weight: 700;
		line-height: 2.2rem;
		padding: 12px 16px;
		color: white;
		background-color: var(--color-blue);
		cursor: pointer;

		img {
			width: 16px;
			height: 16px;
		}
	}

	// --- BREAKPOINTS -------------------
	@media screen and (max-width: 1200px) {
		.button-container {
			margin-right: 16px;
		}
	}

	@media screen and (max-width: 768px) {
		.tool-container {
			padding: 0px 16px;

			.chart-area {
				grid-row: 1;
				grid-column: 1 / -1;
			}

			.chart-wrapper {
				justify-content: flex-start;
			}

			.table-area {
				grid-row: 2;
				grid-column: 1 / -1;
			}

			.footnotes-area {
				grid-row: 3;
			}
		}
	}

	@media screen and (max-width: 550px) {
		.button-container {
			justify-content: flex-start;
			margin-left: 16px;
		}
	}

	// --- OFFSCREEN DOWNLOAD -----------------------
	.offscreen-downloads-container {
		width: 1200px;
		overflow: hidden;
		height: 0px;
	}

	#screenshot {
		padding: 0px 30px;
		background-color: var(--color-neutral-lightest);
	}
</style>
