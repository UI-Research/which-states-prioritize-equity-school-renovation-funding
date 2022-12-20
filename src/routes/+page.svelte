<script>
	import '$styles/app.css';
	import Main from '$components/Main.svelte';

	import { PymChild, pymChildStore } from '$components/helpers/PymChild';

	let height = null;
	let width = null;
	const updateHeight = () => {
		$pymChildStore.sendHeight();
	};

	$: height && updateHeight();

	// set min height of content box so dropdown does not get cutoff in iframe
	$: minHeight = width < 800 ? '430px' : '350px';
</script>

<PymChild />
<div
	class="content"
	bind:clientHeight={height}
	bind:clientWidth={width}
	style:min-height={minHeight}
>
	<Main />
</div>

<style>
	.content {
		max-width: 1200px;
		margin: 0px auto;
		/* border: solid 1px red; */
	}
</style>
