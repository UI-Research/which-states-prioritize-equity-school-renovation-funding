<script>
	import '$styles/app.css';
	import Main from '$components/Main.svelte';

	import { PymChild, pymChildStore } from '$components/helpers/PymChild';

	let height = null;
	const updateHeight = () => {
		console.log('new height', height);
		$pymChildStore.sendHeight();
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
		margin: 60px auto;
		border: solid 1px red;
	}
</style>
