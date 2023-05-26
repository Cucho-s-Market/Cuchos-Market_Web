<script>
    import Svg from "../utils/SVG.svelte";

    export let showCart = false;
</script>

<div class="flex items-center justify-between">
    <div class="flex items-center gap-4">
        <Svg name={"shopping-cart"} stroke={2}/>
        <p class="font-bold text-[20px]">Carrito</p>
    </div>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div on:click={() => { showCart = !showCart }} class="flex items-center gap-4 cursor-pointer">
        <p class="font-semibold text-[16px]">Seguir comprando</p>
        <Svg name={"arrow-narrow-right"} size={25}/>
    </div>
</div>