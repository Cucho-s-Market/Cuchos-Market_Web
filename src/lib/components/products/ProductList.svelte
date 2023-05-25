<script>
    import Svg from "../utils/SVG.svelte";
    export let item;
    let screenSize;
</script>

<svelte:window bind:innerWidth={screenSize}/>

<!-- DESKTOP VERSION -->
{#if screenSize >=550}
<div class="max-w-[550px] flex items-center w-full border border-br-grey bg-bg-product-list rounded-md max-h-20">
    <!-- Product Image -->
    <div class="w-[80px] h-[80px] aspect-square border border-br-grey">
        <img class="h-full w-full" src="{item.image}" alt="">
    </div>
    <!-- Product description -->
    <div class="m-4 min-w-[12rem] max-w-[12rem]">
        <p class="text-[0.75rem] overflow-hidden whitespace-nowrap text-ellipsis">{item.name}</p>
        <p class="text-sku-grey text-[0.5rem] pt-2">SKU: {item.sku}</p>
    </div>
    <!-- Product Qty -->
    <div class="flex items-center justify-between w-40">
        <button class="bg-primary mr-2 rounded-lg" ><Svg name={"minus"} color={"#FDFFFC"} stroke={1.5} size={20}/></button>
        <p class="text-[0.75rem]">{item.qty}</p>
        <button class="bg-primary ml-2 rounded-lg"><Svg name={"plus"} color={"#FDFFFC"} stroke={1.5} size={20}/></button>
    </div>
    <!-- Product total -->
    <div class="min-w-[6rem] m-4">   
        <p class="text-[0.75rem] font-semibold">UYU ${item.total}</p>
    </div>
    
    <button class="mr-4"><Svg name={"trash"} size={25}/></button>
</div>
{:else}
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
            <div class="flex justify-between w-40">   
                <p class="text-[0.75rem] font-semibold">UYU ${item.total}</p>

                <div class="flex justify-between w-20">
                    <button class="bg-primary mr-2 rounded-lg" ><Svg name={"minus"} color={"#FDFFFC"} stroke={1.5} size={20}/></button>
                    <p class="text-[0.75rem]">{item.qty}</p>
                    <button class="bg-primary ml-2 rounded-lg"><Svg name={"plus"} color={"#FDFFFC"} stroke={1.5} size={20}/></button>
                </div>
            </div>

            <button class="mr-4"><Svg name={"trash"} size={25}/></button>
        </div>
    </div>
</div>
{/if}
