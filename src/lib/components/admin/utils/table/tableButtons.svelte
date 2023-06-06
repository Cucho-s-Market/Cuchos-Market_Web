<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import Svg from '$lib/components/utils/SVG.svelte';

	export let buttons = {};
    
    let currentPage;
	const { subscribe } = page;
	const unsubscribe = subscribe((value) => {
        currentPage = value;
	});
    
    export let itemId = itemId;

    const itemRoute = `${currentPage?.route?.id}/${itemId}`;

</script>

<div class="w-full flex gap-5 justify-end">
	{#if buttons.info}
		<a href="{itemRoute}"><Svg name="info-circle-filled" /></a>
	{/if}
	{#if buttons.toggle}
		<input type="checkbox" class="toggle toggle-primary" checked />
	{/if}
	{#if buttons.edit}
		<a href={itemRoute}><Svg name="edit-circle" color={'#F5793B'} /></a>
	{/if}
</div>
