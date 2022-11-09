<script>
	import searchIcon from '$lib/assets/searchIcon.png';
	import closeIcon from '$lib/assets/closeIcon.png';
	import { statesLookup } from '$lib/stores/dataStore';
	import Fuse from 'fuse.js';

	let currentState;
	let inputValue = '';

	const fuseData = new Fuse($statesLookup, {
		keys: ['name', 'abbrev'],
		includeScore: true,
		threshold: 0.0 // exact match on chars and location
	});

	const handleInput = (value) => {
		inputValue = value;
		let matches = fuseData.search(value).map((d) => d.item);
		console.log('matches', matches);
	};

	const clearSearch = () => {
		inputValue = '';
	};
</script>

<div class="search-wrapper">
	<div class="title">CTA title us elementum sagi</div>
	<div class="search-bar-container">
		<input
			class="search-input"
			type="text"
			placeholder="Search for your state"
			autocomplete="off"
			on:input={(e) => handleInput(e.target.value)}
			bind:value={inputValue}
		/>
		<span class="icon">
			{#if inputValue}
				<img
					class="close-icon"
					src={closeIcon}
					on:click={clearSearch}
					on:keypress={clearSearch}
					alt=""
				/>
			{:else}
				<img src={searchIcon} alt="" />
			{/if}
		</span>
	</div>
</div>

<style lang="scss">
	.search-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 36px;
		font-size: 2.4rem;
		line-height: 137.5%;
		font-weight: 700;
	}

	.search-bar-container {
		width: 344px;
		position: relative;
		display: flex;
	}

	.search-input {
		padding: 8.5px 18px;
		width: 100%;
		height: 50px;
		font-weight: 400;
		font-size: 2rem;
		color: var(--color-neutral-darkest);
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
</style>
