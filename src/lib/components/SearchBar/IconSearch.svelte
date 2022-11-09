<script>
	import searchIcon from '$lib/assets/searchIcon.png';
	export let showIcon = false;
</script>

{#if showIcon}
	<img src={searchIcon} alt="" />
{/if}

<style>
	img {
		position: absolute;
		width: 25px;
		height: 25px;
		top: 50%;
		right: 12px;
		transform: translateY(-50%);
	}
</style>
