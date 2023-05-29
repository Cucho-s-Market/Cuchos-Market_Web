<script>
    import Svg from "../utils/SVG.svelte";
	import Quantity from "../utils/quantity/Quantity.svelte";
    export let item = null;
    let screenSize;
</script>

<svelte:window bind:innerWidth={screenSize}/>

<!-- DESKTOP VERSION -->
{#if screenSize >=460}
    {#if item}
        <div class="max-w-[550px] flex items-center w-full border border-br-grey bg-bg-product-list rounded-md max-h-20">
            <!-- Product Image -->
            <div class="w-[80px] h-[80px] aspect-square border border-br-grey">
                <img class="h-full w-full" src="{item.image}" alt="">
            </div>
            <!-- Product description -->
            <div class="m-4 min-w-[10rem] max-w-[12rem]">
                <p class="text-[0.75rem] overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</p>
                <p class=" text-sku-grey text-[0.5rem] pt-2">SKU: {item.sku}</p>
            </div>
            <!-- Product Qty -->
            <Quantity btnProps={"min-w-0 w-[20px] h-[30px]"} inputProps={"pl-0 pr-0 w-[50px] h-[30px] min-w-[0px]"}/>
            <!-- Product total -->
            <div class="min-w-[4.5rem] mx-4">   
                <p class="text-[0.75rem] font-semibold">UYU ${item.price}</p>
            </div>

            <button class=""><Svg name={"trash"} size={25}/></button>
        </div>
    {/if}
{:else}
    {#if item}
        <!-- MOBILE VERSION -->
        <div class="flex gap-4 items-center w-full border border-br-grey bg-bg-product-list rounded-md">
            <!-- Product image -->
            <div class="w-[80px] h-[80px] aspect-square border border-br-grey">
                <img class="h-full w-full" src="{item.image}" alt="">
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

                        <Quantity btnProps={"min-w-[0px] w-[20px] h-[30px]"} inputProps={"pl-0 pr-0 w-[50px] h-[30px] min-w-[0px]"}/>
                    </div>

                    <button class="mr-4"><Svg name={"trash"} size={25}/></button>
                </div>
            </div>
        </div>
    {/if}
{/if}
