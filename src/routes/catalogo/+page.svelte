<script>
	// @ts-nocheck
	import CatalogoHeader from '$lib/components/catalogo/CatalogoHeader.svelte';
	import CatalogoSidebar from '$lib/components/catalogo/CatalogoSidebar.svelte';
	import ProductCatalogue from '$lib/components/products/ProductCatalogue.svelte';
	import Notifications from '$lib/components/utils/Notifications.svelte';
	import { onMount } from 'svelte';
	import productController from '../../logic/productController';
	import Utils from '../../logic/helpers/Utils';

	let products = [];

	onMount(async () => {
		products = await productController.getProducts();
		if (products == null || products?.error) return null;
		products = products?.data?.content;
	});
</script>

<main class="w-[1200px] pt-[160px] m-auto">
	<CatalogoHeader qtyItems={products?.length || 0} />

	<div class="flex justify-between pt-[80px]">
		<!-- Side bar categories -->
		<sidebar>
			<CatalogoSidebar bind:productsFiltered={products}/>
		</sidebar>
		<!-- Items catalog -->
		{#if products?.length > 0}
			<div>
				<ProductCatalogue {products} />
			</div>
		{:else}
			<div class="flex justify-center items-center">
				<p class="text-2xl">No hay productos disponibles</p>
			</div>
		{/if}
	</div>

	<Notifications />
</main>
