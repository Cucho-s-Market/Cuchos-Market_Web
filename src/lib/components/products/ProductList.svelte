<script>
    // @ts-nocheck
    import cartController from "../../../logic/cartController";
    import Svg from "../utils/SVG.svelte";
	import Quantity from "../utils/quantity/Quantity.svelte";
    export let item = null;
    export let inCheckout = false;
    let screenSize;

    function createSlug(str) {
        return str.toLowerCase().replace(/\s/g, '_');
    }
</script>

<svelte:window bind:innerWidth={screenSize}/>

<!-- DESKTOP VERSION -->
{#if screenSize >=460}
    {#if item}
        <div class="max-w-[550px] flex items-center w-full border border-br-grey bg-bg-product-list rounded-md max-h-20">
            <!-- Product Image -->
            <div class="w-[80px] h-[80px] aspect-square border border-br-grey">
                <img class="h-full w-full object-scale-down" src="{item?.images[0].url}" alt="">
            </div>
            <!-- Product description -->
            <div class="m-4 min-w-[10rem] max-w-[12rem]">
                <a href="/catalogo/{createSlug(item?.name || "")}">
                    <p class="text-[0.75rem] overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</p>
                </a>
                
                <p class=" text-sku-grey text-[0.5rem] pt-2">SKU: {item.sku ? item.sku : 'N/A'}</p>
            </div>
            <!-- Product Qty -->
            <Quantity btnProps={"min-w-0 w-[20px] h-[30px]"} inputProps={"pl-0 pr-0 w-[50px] h-[30px] min-w-[0px]"} inCart={true} item={item} value={item.quantity}/>
            <!-- Product total -->
            <div class="min-w-[4.5rem] mx-4">   
                <p class="text-[0.75rem] font-semibold">UYU ${item.price}</p>
            </div>

            {#if !inCheckout}
                <button class="" on:click={() => cartController.removeItem(item)}><Svg name={"trash"} size={25}/></button>
            {/if}
        </div>
    {/if}
{:else}
    {#if item}
        <!-- MOBILE VERSION -->
        <div class="flex gap-4 items-center w-full border border-br-grey bg-bg-product-list rounded-md">
            <!-- Product image -->
            <div class="w-[80px] h-[80px] aspect-square border border-br-grey">
                <img class="h-full w-full object-scale-down" src="{item?.images[0]}" alt="">
            </div>
            <!-- Product details -->
            <div class="w-full">
                <!-- Product name and sku -->
                <div class="w-full">
                    <p class="text-[0.75rem] overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</p>
                    <p class="text-sku-grey text-[0.5rem] pt-2">SKU: {item.sku}</p>
                </div>
                <!-- Product total, qty and delete -->
                <div class="flex items-center justify-between mt-2">
                    <div class="flex justify-between items-center">   
                        <div class="min-w-[86px]">
                            <p class="text-[0.75rem] font-semibold">UYU ${item.price}</p>
                        </div>

                        <Quantity btnProps={"min-w-[0px] w-[20px] h-[30px]"} inputProps={"pl-0 pr-0 w-[50px] h-[30px] min-w-[0px]"} value={item.quantity}/>
                    </div>

                    {#if !inCheckout}
                        <button class="mr-4" on:click={() => cartController.removeItem(item)}><Svg name={"trash"} size={25}/></button>
                    {/if}
                </div>
            </div>
        </div>
    {/if}
{/if}
