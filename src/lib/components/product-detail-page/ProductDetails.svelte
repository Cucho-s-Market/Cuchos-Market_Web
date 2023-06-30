<script>
	// @ts-nocheck
	import Button from '$lib/components/utils/Button.svelte';
	import Quantity from '$lib/components/utils/quantity/Quantity.svelte';
	import { onMount } from 'svelte';
	import ProductSpecs from './ProductSpecs.svelte';
	import sessionController from '../../../logic/sessionController';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import cartController from '../../../logic/cartController';

	//item a traer del back: hardcoded
	export let item;

	let isLoggedIn = false;
    let description = false;

	let value = 1;

	onMount(async () => {
		isLoggedIn = await sessionController.isUserLoggedIn();
	});

	const addToCart = async () => {
		
		if(String(value) === '') {
			value = 1;
		}

		let strHa = value === 1 ? "ha" : "han";
		let strArticulo = value === 1 ? "articulo" : "articulos";
		let strCantidad = value === 1 ? "un" : String(value);

		// Add item to cart
		item.quantity = parseInt(value);
		const isAdded = await cartController.addItem(item);
		if(isAdded?.error) {
			notify({type: "alert-error", text: isAdded?.message});
			return;
		}

		notify({type: "alert-success", text: `Se ${strHa} agregado ${strCantidad} ${strArticulo} al carrito.`});
  }

</script>

{#if item}
	<div class="flex flex-col max-w-[680px] min-w-[450px] font-poppins bg-base-200 rounded-[10px] border border-br-grey">
		<div class="flex flex-col p-5 justify-between min-h-[280px]">
			<div class="flex flex-col">

				{#if item?.quantity > 0}
					<p class="text-xs text-success mb-5">Disponible</p>
				{:else}
					<p class="text-xs text-error mb-5">Sin stock</p>
				{/if}

				<h1 class="text-xl text-neutral mb-0.75">
					{item.name}
				</h1>
				<p class="text-xs text-neutral-grey">SKU: {item.code}</p>
			</div>

			<div class="flex flex-col">
				<h4 class="text-base text-neutral-grey font-medium line-through">UYU {item.price}</h4>
				<h4 class="text-2xl text-neutral font-bold">UYU {item.price}</h4>
			</div>

			{#if isLoggedIn && item?.quantity > 0}
				<div class="flex justify-between max-w-[400px]">
					<Quantity bind:value={value} containerProps="w-[45%]" btnProps="h-[100%]" inputProps="h-[100%]"/>
					<Button type="btn-primary w-[45%]" text="Agregar al carrito" click={addToCart}/>
				</div>
			{/if}
		</div>

		<div class="flex flex-col">
			<div class="flex border-y border-br-grey">
				<Button
					text="Descripcion"
					type="bg-transparent border-none text-neutral hover:bg-transparent {description ? 'font-bold' : 'font-normal'}"
					click={() => {description = true}}
				/>
				<Button
					text="Informacion"
					type="bg-transparent border-none text-neutral hover:bg-transparent {!description ? 'font-bold' : 'font-normal'}"
					click={() => {description = false}}
				/>
			</div>

			<div class="flex p-5">
				{#if description}
					<p class="text-sm">
						{item.description}
					</p>
				{:else}
					<ProductSpecs item = {item}/>
				{/if}
			</div>
		</div>
	</div>
{/if}
