<script>
	// @ts-nocheck
	import CatalogoHeader from '$lib/components/catalogo/CatalogoHeader.svelte';
	import CatalogoSidebar from '$lib/components/catalogo/CatalogoSidebar.svelte';
	import ProductCatalogue from '$lib/components/products/ProductCatalogue.svelte';
	import Notifications from '$lib/components/utils/Notifications.svelte';
	import { onMount } from 'svelte';
	import productController from '../../logic/productController';

	let products = [];

	onMount(async () => {
		products = await productController.getProducts();
        if(products == null || products?.error) return null;

        products = products.data;
	});
</script>

<main class="w-[1200px] pt-[160px] m-auto">
	{#if products.length > 0}
		<CatalogoHeader qtyItems={products?.length || 0} />

		<div class="flex justify-between pt-[80px]">
			<!-- Side bar categories -->
			<sidebar>
				<CatalogoSidebar />
			</sidebar>
			<!-- Items catalog -->
			<div>
				<ProductCatalogue {products} />
			</div>
		</div>

		<Notifications />
	{/if}
</main>
