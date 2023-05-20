<script>
	import Button from "../utils/Button.svelte";
	import Quantity from "../utils/Quantity.svelte";

    let showQty = false;

    export let data = {
        name: "Papel Higiénico ELITE Hoja Simple 12 Unidades x 30m",
        purchasePrice: 2000,
        listPrice: 1500,
        discount: 20,
        iso: "UYU",
        image: "https://dummyimage.com/200/000/fff"
    };

    //methods
    const showQuantity = () => {
        showQty = !showQty;
    }

</script>

<div class="card w-[250px] round-[10px] p-5 border border-br-grey bg-base-100 font-poppins">
    <img class="round-[5px] pb-5" src="{data.image}" alt="{data.name}" />
    <div class="card-body p-0 gap-5 justify-center">
        <h2 class="flex justify-center font-medium text-sm text-center">{data.name}</h2>
        <div class="flex flex-col justify-center">
            <div class="flex flex-col text-center">
                <p class="font-regular text-xs text-normal-grey font-medium line-through flex-grow-0">{data.iso} {data.purchasePrice}</p>
                <p class="font-regular text-lg font-medium flex-grow-0">{data.iso} {data.listPrice}</p>
            </div>

            {#if data.discount > 0}
                 <div class="flex justify-center">
                     <p class="contents font-regular text-xs font-medium text-dark-green">{data.discount}% off</p>
                 </div>
            {/if}
        </div>
        <div class="card-actions justify-center">
            {#if showQty}
                <Quantity bind:showQty={showQty}/>
            {:else}
                <Button text="Agregar al carrito" type="btn-primary btn-block" click={() => {showQuantity()}}/>
            {/if}
        </div>
    </div>
</div>