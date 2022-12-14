<!--
  Adapted from https://reuters-graphics.github.io/graphics-components/?path=/docs/utilities-PymChild--default
  For more info on Pym.js: https://blog.apps.npr.org/pym.js/

  This component will create a PymChild instance assisting with embedding your svelte app as an iFrame.
  The PymChild instance will allow you to send custom height/width properties to the iframe parent.  
  
  Usage:
  (top level of your app)
  <script>
    import { PymChild, pymChildStore } from "$components/helpers/PymChild";
    const updateHeight = () => {
      if ($pymChildStore){
        $pymChildStore.sendHeight();
      }
    }
  </script>

  <PymChild />
  <button on:click="{updateHeight}"> Update height </button>
-->
<script>
	export let polling = 500;
	import { onMount } from 'svelte';
	import pym from 'pym.js';
	import { pymChildStore } from './stores.js';
	let pymChild;
	onMount(() => {
		pymChild = new pym.Child({ polling });
		pymChildStore.set(pymChild);
	});
</script>
