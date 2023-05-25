<script>
// @ts-nocheck

	import SVG from "./SVG.svelte";

    export let text = '';
    export let type = 'btn-primary';
    export let svg = {};
    export let click = () => { return; };
</script>

<button on:click={click} class="btn {type}">
    {#if Object.keys(svg).length > 0}
         <SVG  name="{svg.name}" stroke={svg.stroke ?? 2} color={svg.stroke ?? '#FFF'} size={svg.stroke ?? 24}/>
    {:else}
         {text}
    {/if}
</button> 