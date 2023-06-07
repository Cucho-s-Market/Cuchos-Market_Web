<script>
	import Stock from "./Stock.svelte";

</script>

<div class="flex flex-col w-[400px] h-fit gap-5 p-5 rounded-lg my-10 bg-base-100 shadow">
    <p class="font-semibold text-md mb-5">Producto en Sucursal</p>

    <div class="flex flex-col gap-5">
        <Stock/>
        <Stock/>
        <Stock/>
        <Stock/>
    </div>
</div>