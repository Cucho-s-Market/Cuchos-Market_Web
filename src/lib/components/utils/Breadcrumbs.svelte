<script>
  // @ts-nocheck
	import { onMount } from "svelte";
	import categoryController from "../../../logic/categoryController";
  let breadcrumbs = [
  { url: "/", label: "Home" },
  { url: "/catalogo", label: "Catalogo" },
  { label: "category" }
];

  export let categoryId;

  onMount(async () => {
    const category = await categoryController.findCategoryById(categoryId);
    breadcrumbs[2].label = category.name;
  });



</script>

<div class="text-sm font-medium breadcrumbs">
  <ul>
    {#each breadcrumbs as breadcrumb}
      {#if breadcrumb.url}
        <li>
          <a href={breadcrumb.url}>{breadcrumb.label}</a>
        </li>
      {:else}
        <li>{breadcrumb.label}</li>
      {/if} 
    {/each}
  </ul>
</div>