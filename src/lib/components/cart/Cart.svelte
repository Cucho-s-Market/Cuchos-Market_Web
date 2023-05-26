<script>
	import ProductList from '../products/ProductList.svelte';
	import CartFooter from './CartFooter.svelte';
	import CartHeader from './CartHeader.svelte';

    export let items = null;
</script>

<div class="absolute flex flex-col justify-between w-[580px] h-full border border-br-grey bg-bg-color">
    <div class="flex flex-col gap-6 p-4 overflow-x-hidden overflow-auto">
        <CartHeader/>
        {#if items?.length}
            {#each items as item}
                <ProductList item={item}/>
            {/each}
        {/if}
    </div>
    <CartFooter />
</div>

