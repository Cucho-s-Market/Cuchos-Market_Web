<script>
	import Button from "../utils/Button.svelte";
	import Quantity from "../utils/quantity/Quantity.svelte";

    let showQty = false;

    export let data = {
        name: "",
        purchasePrice: 0,
        price: 0,
        discount: 0,
        iso: "UYU",
        image: "https://dummyimage.com/200/000/fff"
    };

    //methods
    const showQuantity = () => {
        showQty = !showQty;
    }

</script>

<div class="card w-[220px] round-[10px] p-3 mb-2 border border-br-grey bg-base-100 font-poppins">
    <div class="flex w-[190px] mb-5 h-[190px]">
        <img class="rounded-[5px] object-cover" src="{data.image}" alt="{data.name}" />
    </div>
    <div class="card-body p-0 gap-5 justify-center">
        <h3 class="flex justify-center font-medium text-sm text-center h-[2em]">{data.name}</h3>
        <div class="flex flex-col justify-center">
            <div class="flex flex-col text-center">
                <p class="font-regular text-xs text-normal-grey font-medium line-through flex-grow-0">{data.iso} {data.price}</p>
                <p class="font-regular text-lg font-medium flex-grow-0">{data.iso} {data.price}</p>
            </div>

            {#if data.discount > 0}
                 <div class="flex justify-center">
                     <p class="contents font-regular text-xs font-medium text-dark-green">{data.discount}% off</p>
                 </div>
            {/if}
        </div>
        <div class="card-actions justify-center">
            {#if showQty}
                <Quantity bind:showQty={showQty} card={true}/>
            {:else}
                <Button text="Agregar al carrito" type="btn-primary btn-block" click={() => {showQuantity()}}/>
            {/if}
        </div>
    </div>
</div>