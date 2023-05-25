<script>
    import Svg from "../utils/SVG.svelte";
</script>

<div class="flex items-center justify-between">
    <div class="flex items-center gap-4">
        <Svg name={"shopping-cart"} stroke={2}/>
        <p class="font-bold text-[20px]">Carrito</p>
    </div>
    <div class="flex items-center gap-4">
        <p class="font-semibold text-[16px]">Seguir comprando</p>
        <Svg name={"arrow-narrow-right"} size={25}/>
    </div>
</div>