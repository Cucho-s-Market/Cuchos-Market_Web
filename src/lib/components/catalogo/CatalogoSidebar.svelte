<script>
	// @ts-nocheck
	import { onMount } from "svelte";
	import categoryController from "../../../logic/categoryController";

	let categories = [];

	onMount(async () => {
		categories = await categoryController.getCategories();
	});

</script>

{#if categories?.length > 0}
	<div class="sticky top-[120px] w-[130px]">
		<ul class="bg-base-100 w-full overflow-hidden whitespace-nowrap text-ellipsis">
			{#each categories as category}
				<div class="w-full my-2">
					<li class="w-full mb-2">
						<span class="text-base-neutral text-center font-medium not-italic">{category.name}</span>
					</li>
					{#each category.subcategories as subc}
						<li class="w-full py-[2px] max-w-[140px]">
							<a class="not-italic font-medium text-sm center text-neutral-grey hover:text-primary" href="./">{subc?.name}</a>
						</li>
					{/each}
				</div>
			{/each}
		</ul>
	</div>
{/if}
