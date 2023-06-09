<script>
	import Button from '$lib/components/utils/Button.svelte';
	import Quantity from '$lib/components/utils/quantity/Quantity.svelte';
	import ProductSpecs from './ProductSpecs.svelte';

	//item a traer del back: hardcoded
	export let item = {
		status: "Disponible",
		codigo: "H565GF3",
		nombre: "Notebook Dell Ultra Slim 15.6\" AMD Ryzen 7 3700U 512GB SSD 8GB",
		descripcion: "Gamer: NO\nRGB: NO\nWifi: 5G\nPantalla: IPS",
		precio: 1999,
		fechaIngreso: '2023-04-25',
		peso: 4.5,
		color: 'Gris',
		marca: 'Dell',
		imagenes: []
	}

    let description = item.descripcion? true : false;

    const showDescription = (option) => {
        description = option;
    }

</script>


<div class="flex flex-col max-w-[680px] font-poppins bg-base-200 rounded-[10px] border border-br-grey">
	<div class="flex flex-col p-5 justify-between min-h-[280px]">
		<div class="flex flex-col">
			<p class="text-xs text-success mb-5">{item.status}</p>
			<h1 class="text-xl text-neutral mb-0.75">
				{item.nombre}
			</h1>
			<p class="text-xs text-neutral-grey">SKU: {item.codigo}</p>
		</div>

		<div class="flex flex-col">
			<h4 class="text-base text-neutral-grey font-medium line-through">UYU {item.precio}</h4>
			<h4 class="text-2xl text-neutral font-bold">UYU {item.precio}</h4>
		</div>

		<div class="flex justify-between max-w-[400px]">
			<Quantity containerProps="w-[45%]" btnProps="h-[100%]" inputProps="h-[100%]"/>
			<Button type="btn-primary w-[45%]" text="Agregar al carrito" />
		</div>
	</div>

	<div class="flex flex-col">
		<div class="flex border-y border-br-grey">
			<Button
				text="Descripcion"
				type="bg-transparent border-none text-neutral hover:bg-transparent {description ? 'font-bold' : 'font-normal'}"
                click={() => {showDescription(true)}}
			/>
			<Button
				text="Informacion"
				type="bg-transparent border-none text-neutral hover:bg-transparent {!description ? 'font-bold' : 'font-normal'}"
                click={() => {showDescription(false)}}
			/>
		</div>

		<div class="flex p-5">
			{#if description}
                <p class="text-sm">
                    {item.descripcion}
                </p>
            {:else}
                <ProductSpecs/>
            {/if}
		</div>
	</div>
</div>
