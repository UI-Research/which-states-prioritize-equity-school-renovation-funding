<script>
	import { statesLookup, currentState } from '$lib/stores/dataStore';
	import Select from 'svelte-select';
	import IconSearch from './IconSearch.svelte';
	import IconClose from './IconClose.svelte';

	// export let currentState;

	const handleSelect = (event) => {
		currentState.set(event.detail.value);
	};

	const handleClear = () => {
		currentState.set('');
	};

	// -- Custom Styles for Svelte Select
	let containerStyles = `
    width: 100%;
    padding: 8.5px 18px;
		width: 100%;
		height: 50px;
		border-radius: 0px;
  `;

	let inputStyles = `
    font-weight: 400;
		font-size: 2rem;
		font-family: "Lato", Helvetica, arial, sans-serif;
		color: var(--color-neutral-darkest);
  `;
</script>

<div class="search-wrapper">
	<div class="title">
		Explore School Construction Funding Practices <span style="white-space: nowrap;">by State</span>
	</div>
	<div class="search-bar-container theme-overrides">
		<Select
			items={$statesLookup.map((d) => d.name).sort()}
			on:select={handleSelect}
			on:clear={handleClear}
			placeholder="Search for your state"
			Icon={IconSearch}
			iconProps={{ showIcon: $currentState === '' }}
			ClearIcon={IconClose}
			listPlacement="bottom"
			{containerStyles}
			{inputStyles}
		/>
	</div>
</div>

<style lang="scss">
	.search-wrapper {
		padding: 30px 0px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 36px;
	}

	.title {
		font-size: 2.4rem;
		line-height: 137.5%;
		font-weight: 700;
	}

	.search-bar-container {
		width: 344px;
		position: relative;
		display: flex;
		font-size: 2rem;
		font-weight: 400;
		color: var(--color-neutral-darkest);
	}

	.theme-overrides {
		--placeholderColor: var(--color-neutral-darkest);
		--clearSelectWidth: 25px;
	}

	.icon {
		position: absolute;
		height: 25px;
		width: 25px;
		top: 50%;
		right: 12px;
		transform: translateY(-50%);
	}

	.close-icon {
		cursor: pointer;
	}

	@media screen and (max-width: 800px) {
		.search-wrapper {
			flex-direction: column;
			gap: 16px;
		}

		.title {
			font-size: 2rem;
			text-align: center;
		}

		.search-bar-container {
			width: 100%;
		}
	}
</style>
