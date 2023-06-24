<script>
	// @ts-nocheck
	import { onMount } from "svelte";
	import categoryController from "../../../logic/categoryController";
	import productController from "../../../logic/productController";
	import Button from "../utils/Button.svelte";

	let activeCategory = null;
	let categories = [];
	export let productsFiltered = [];

	onMount(async () => {
		debugger;
		categories = await categoryController.getCategories();

		productsFiltered = await productController.getProducts();
		productsFiltered = productsFiltered?.data?.content;
	});

	async function getProductsByCategory(categoryId = "") {

		// If there is no category selected we are going to delete all filter colors
		if(!categoryId){
			const element = event.target;


		}

		var productsCategories = await productController.getProducts(categoryId);
		productsFiltered = productsCategories?.data?.content;
	}

</script>

{#if categories?.length > 0}
	<div class="sticky top-[120px] w-[130px]">
		<ul class="bg-base-100 w-full overflow-hidden whitespace-nowrap text-ellipsis">
			{#each categories as category}
				<div class="w-full my-2">
					<li class="w-full mb-2">
						<!-- svelte-ignore missing-declaration -->
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<span class="{activeCategory == category?.id ? 'text-primary' : 'text-base-neutral'} text-center font-medium not-italic cursor-pointer" on:click={() => {activeCategory = category?.id; getProductsByCategory(category?.id)}}>{category.name}</span>
					</li>
					{#each category.subcategories as subc}
						<li class="w-full py-[2px] max-w-[140px]">
							<!-- svelte-ignore a11y-click-events-have-key-events -->
							<span class="not-italic font-medium text-sm center {activeCategory == subc?.id ? 'text-primary' : 'text-neutral-grey'}  hover:text-primary cursor-pointer" on:click={() => {activeCategory = subc?.id; getProductsByCategory(subc?.id)}}>{subc?.name}</span>
						</li>
					{/each}
				</div>
			{/each}
		</ul>
		<Button text={"Borrar filtros"} type={"btn-primary w-[122px] h-[38px] min-h-0 my-4"} click={() => {activeCategory = null; getProductsByCategory()}}/>
	</div>
{/if}
