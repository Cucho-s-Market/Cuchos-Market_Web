<script>
    import Svg from "../../utils/SVG.svelte";
    import BranchContainer from "./BranchContainer.svelte";

    export let branches;
</script>

{#if branches?.length}
<div class="w-[530px] h-[580px]">
    <div class="w-full flex flex-col items-center">
        <h1 class="font-semibold text-[30px]">Bienvenido!</h1>
        <p class="font-semibold text-[12px] mt-2">¿Donde quiere comprar?</p>
        
        <div class="flex flex-col gap-8 mt-10">
            {#each branches as branch}
                <BranchContainer branch={branch}/>
            {/each}
        </div>
    </div>
</div>
{/if}
