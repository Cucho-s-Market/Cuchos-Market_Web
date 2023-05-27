<script>
	import ProductDetails from "$lib/components/product-detail-page/ProductDetails.svelte";
	import ProductImages from "$lib/components/product-detail-page/ProductImages.svelte";
	import Breadcrumbs from "$lib/components/utils/Breadcrumbs.svelte";

	
</script>

<main class="max-w-[1200px] pt-[160px] m-auto">
	<div class="flex mb-10">
		<Breadcrumbs/>
	</div>
	<div class="flex justify-between">
		<ProductImages/>
		<ProductDetails/>
	</div>
</main>