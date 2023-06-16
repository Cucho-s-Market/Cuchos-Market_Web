<script>
	// @ts-nocheck

	import Button from '$lib/components/utils/Button.svelte';
	import { filters } from '../../../../../routes/checkout/stores';

	let container = {};
	export let elements = [];
	export let inputFilters = [];
	export let search;

</script>

<div bind:this={container} class="flex justify-left flex-wrap gap-10">
	<slot />
</div>
