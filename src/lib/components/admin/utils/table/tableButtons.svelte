<script>
// @ts-nocheck
	import Svg from '$lib/components/utils/SVG.svelte';
    
    export let buttons = {};
</script>

<div class="w-full flex gap-5 justify-end">
    {#if buttons.info}
        <a href="/admin/productos/item_id"><Svg name="info-circle-filled" /></a>
    {/if}
    {#if buttons.toggle}
        <input type="checkbox" class="toggle toggle-primary" checked />
    {/if}
    {#if buttons.edit}
        <a href="/admin/productos/item_id"><Svg name="edit-circle" color={"#F5793B"} /></a>
    {/if}
</div>