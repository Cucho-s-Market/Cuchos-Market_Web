<script>
    // @ts-nocheck
	import Svg from "$lib/components/utils/SVG.svelte";
    export let branch = null;
</script>

{#if branch}
    <div class="flex border items-center gap-7 w-[244px] h-[80px] rounded-[8px] p-4 cursor-pointer bg-primary text-primary-content {branch.selected ? 'opacity-100 shadow-xl' : 'opacity-60'} hover:opacity-100 transition">
        <div>
            <Svg name={"building-store"} size={20} stroke={1.5} color={"#FDFFFC"}/>
        </div>
        <div class="overflow-hidden">
            <p class="font-semibold text-[16px]">{branch.name}</p>
            <p class="text-[10px] text-neutral-grey text-primary-content">{branch.address}</p>
        </div>
    </div>
{/if}