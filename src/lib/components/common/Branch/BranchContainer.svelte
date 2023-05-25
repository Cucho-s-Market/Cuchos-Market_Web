<script>
	import Svg from "$lib/components/utils/SVG.svelte";
    export let branch = null;
</script>

{#if branch}
<div class="flex border items-center gap-7 w-[244px] h-[80px] rounded-[8px] pl-8 cursor-pointer {branch.selected ? 'bg-primary text-primary-content shadow-lg' : ''}">
    <div>
        {#if branch.selected}
            <Svg name={"building-store"} size={20} stroke={1.5} color={"#FDFFFC"}/>
        {:else}
            <Svg name={"building-store"} size={20} stroke={1.5}/>
        {/if}
    </div>
    <div>
        <p class="font-semibold text-[16px]">{branch.location}</p>
        <p class="text-[10px] text-neutral-grey {branch.selected ? 'text-primary-content' : ''}">{branch.address}</p>
        <p class="text-[10px] text-neutral-grey pt-2 {branch.selected ? 'text-primary-content' : ''}">{branch.schedule}</p>
    </div>
</div>
{/if}