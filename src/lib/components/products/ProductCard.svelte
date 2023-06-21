<script>
    // @ts-nocheck
	import { onMount } from "svelte";
	import sessionController from "../../../logic/sessionController";
    import Button from "../utils/Button.svelte";
	import Quantity from "../utils/quantity/Quantity.svelte";

    let showQty = false;
    
    let userIsloggedIn = false;

    onMount(async () => {
        userIsloggedIn = await sessionController.isUserLoggedIn();
    });

    let dummyImage = 'https://dummyimage.com/100/09f.png/fff';

    export let item = {};

    //methods
    const showQuantity = () => {
        showQty = !showQty;
    }

    function createSlug(str) {
        return str.toLowerCase().replace(/\s/g, '_');
    }

</script>
<a href="/catalogo/{createSlug(item?.name || "")}">
    <div class="card w-[220px] round-[10px] p-3 mb-2 border border-br-grey bg-base-100 font-poppins">
        {#if item?.quantity > 0}
            <p class="text-xs text-success mb-5">Disponible</p>
        {:else}
            <p class="text-xs text-error mb-5">Sin stock</p>
        {/if}
        
        <div class="flex w-[190px] mb-5 h-[190px]">
            <img class="rounded-[5px] object-scale-down" src="{item.images?.length > 0 ? item.images[0] : dummyImage}" alt="{item.name}" />
        </div>
        <div class="card-body p-0 gap-5 justify-center">
            <h3 class="flex justify-center font-medium text-sm text-center h-[2em]">{item.name}</h3>
            <div class="flex flex-col justify-center">
                <div class="flex flex-col text-center">
                    <p class="font-regular text-xs text-normal-grey font-medium line-through flex-grow-0">UYU {item.price}</p>
                    <p class="font-regular text-lg font-medium flex-grow-0">UYU {item.price}</p>
                </div>
    
                {#if item.discount > 0}
                     <div class="flex justify-center">
                         <p class="contents font-regular text-xs font-medium text-dark-green">{item?.discount ? item?.discount : 'N/A'}% off</p>
                     </div>
                {/if}
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div class="card-actions justify-center" on:click|preventDefault>
                {#if showQty}
                    <Quantity bind:showQty={showQty} card={true} item={item}/>
                {:else}
                    {#if userIsloggedIn}
                        <Button text="Agregar al carrito" type="btn-primary btn-block" click={() => {showQuantity()}}/>
                    {:else}
                        <Button text="Agregar al carrito" type="btn-disabled btn-block"/>
                    {/if}
                {/if}
            </div>
        </div>
    </div>
</a>
