<<<<<<< HEAD
<script>
	// @ts-nocheck
	import ProductDetails from "$lib/components/product-detail-page/ProductDetails.svelte";
	import ProductImages from "$lib/components/product-detail-page/ProductImages.svelte";
	import Breadcrumbs from "$lib/components/utils/Breadcrumbs.svelte";
	import { onMount } from "svelte";
	export let data;

	onMount(async () => {
		debugger;
		if(!data || data.status == 404) window.location.href = "/catalogo";
	});

</script>
{#if data?.product && data && data.status != "404"}
	<main class="max-w-[1200px] pt-[160px] m-auto">
		<div class="flex mb-10">
			<Breadcrumbs categoryId={data?.product?.categoryId}/>
		</div>
		<div class="flex justify-between">
			<ProductImages images={data?.product?.images}/>
			<ProductDetails item={data?.product}/>
		</div>
	</main>
=======
<script>
	// @ts-nocheck
	import ProductDetails from "$lib/components/product-detail-page/ProductDetails.svelte";
	import ProductImages from "$lib/components/product-detail-page/ProductImages.svelte";
	import Breadcrumbs from "$lib/components/utils/Breadcrumbs.svelte";
	import { onMount } from "svelte";
	export let data;

	onMount(async () => {
		
		if(!data || data.status == 404) window.location.href = "/catalogo";
	});

</script>
{#if data?.product && data && data.status != "404"}
	<main class="max-w-[1200px] pt-[160px] m-auto">
		<div class="flex mb-10">
			<Breadcrumbs categoryId={data?.product?.categoryId}/>
		</div>
		<div class="flex justify-between">
			<ProductImages images={data?.product?.images}/>
			<ProductDetails item={data?.product}/>
		</div>
	</main>
>>>>>>> c0aeb8a1e854b15a8d3c70a0bcf313c9045601a4
{/if}