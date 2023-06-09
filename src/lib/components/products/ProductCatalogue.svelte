<script>
    // @ts-nocheck
	import ProductCard from "./ProductCard.svelte";

    export let products = null;
</script>

{#if products != null}
    <div class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-fit gap-10 max-w-[1000px]">
        {#each products as product}
            <ProductCard item={product}/>
        {/each}
    </div>
{/if}