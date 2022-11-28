<script>
	import TooltipBody from './TooltipBody.svelte';
	import { tooltip } from '$actions/tooltip';
	import infoIcon from '$assets/infoIcon.svg';
	import infoIconHovered from '$assets/infoIcon_hovered.svg';

	export let tooltipText;

	let iconSrc = infoIcon;
	const handleIconMouseover = () => {
		iconSrc = infoIconHovered;
	};
	const handleIconMouseout = () => {
		iconSrc = infoIcon;
	};
</script>

<div
	class="tooltip-icon"
	use:tooltip={{
		component: TooltipBody,
		props: {
			tooltipText: tooltipText
		}
	}}
>
	<img
		src={iconSrc}
		alt=""
		on:mouseover={handleIconMouseover}
		on:focus={handleIconMouseover}
		on:mouseout={handleIconMouseout}
		on:blur={handleIconMouseover}
	/>
</div>

<style lang="scss">
	.tooltip-icon {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		transform: translateY(2px);
		cursor: pointer;
	}
</style>
