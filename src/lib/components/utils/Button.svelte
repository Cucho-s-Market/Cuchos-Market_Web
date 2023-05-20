<script>
	import SVG from "./SVG.svelte";

    export let text = '';
    export let type = 'btn-primary';
    export let svg = '';
    export let click = () => { return; };
</script>

<button on:click={click} class="btn {type}">
    {#if svg !== ''}
         <SVG  name="{svg}" stroke={2} color="#FFF" size={24}/>
    {:else}
         {text}
    {/if}
</button> 