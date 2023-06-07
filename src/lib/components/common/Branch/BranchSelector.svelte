<script>
    // @ts-nocheck
    import BranchContainer from "./BranchContainer.svelte";

    export let branches = [];
</script>

{#if branches?.length > 0}
    <div class="w-full flex flex-col items-center">
        <h1 class="font-semibold text-[30px]">Bienvenido!</h1>
        <p class="font-semibold text-[12px] mt-2">¿Donde quiere comprar?</p>
        
        <div class="flex flex-col gap-8 mt-10">
            {#each branches as branch}
                <BranchContainer branch={branch}/>
            {/each}
        </div>
    </div>
{:else}
    <div class="w-full flex flex-col items-center">
        <h1 class="font-semibold text-[30px]">No hay sucursales disponibles</h1>
        <p class="font-semibold text-[12px] mt-2">Intente mas tarde</p>
    </div>
{/if}
