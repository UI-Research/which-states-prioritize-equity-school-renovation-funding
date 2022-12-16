<script>
	import '$styles/app.css';
	import Main from '$components/Main.svelte';

	import { PymChild, pymChildStore } from '$components/helpers/PymChild';

	let height = null;
	const updateHeight = () => {
		$pymChildStore.sendHeight();
		// console.log('height', height);
	};

	$: height && updateHeight();
</script>

<PymChild />
<div class="content" bind:clientHeight={height}>
	<Main />
</div>

<style>
	.content {
		max-width: 1200px;
		min-height: 350px;
		margin: 0px auto;
		/* border: solid 1px red; */
	}
</style>
