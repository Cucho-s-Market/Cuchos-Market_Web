<script>
	import { fly } from 'svelte/transition';
	import ProductList from '../products/ProductList.svelte';
	import CartFooter from './CartFooter.svelte';
	import CartHeader from './CartHeader.svelte';

    export let items = null;
    export let showCart = false;
</script>

{#if showCart}
    <div transition:fly="{{ x: -200, duration: 300 }}" class="fixed flex flex-col justify-between w-[580px] h-full border border-br-grey bg-bg-color z-[99]">
        <div class="flex flex-col gap-6 p-4 overflow-x-hidden overflow-auto">
            <CartHeader bind:showCart/>
            {#if items?.length}
                {#each items as item}
                    <ProductList item={item}/>
                {/each}
            {/if}
        </div>
        <CartFooter />
    </div>
{/if}

