<script>
    import Svg from "../utils/SVG.svelte";
    import Button from "../utils/Button.svelte";

    export let total = 10;
</script>

<div class="flex justify-center border border-br-grey">
    <div class="flex flex-col gap-6 m-4">
        <p class="font-semibold">Importe total: UYU {total}</p>
        <Button text={"Finalizar compra"} type={"normal-case btn-primary w-40 block m-auto text-[16px]"}/>
    </div>
</div>
