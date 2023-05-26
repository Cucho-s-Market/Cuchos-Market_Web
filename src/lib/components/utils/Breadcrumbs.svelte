<script>
	import SVG from './SVG.svelte';

  let breadcrumbs = [
  { url: "/", label: "Home" },
  { url: "/", label: "Catalogo" },
  { label: "Alimentos" }
];

</script>

<div class="text-slate-400 font-semibold flex items-center">
  <ul class="inline-flex items-center">
    {#each breadcrumbs as breadcrumb, index}
      <li class="flex items-center text-[15px]">
        {#if breadcrumb.url}
          <a href={breadcrumb.url} class="inline text-[#9e9e9e]">{breadcrumb.label}</a>
        {:else}
          <span>{breadcrumb.label}</span>
        {/if}
        {#if index !== breadcrumbs.length - 1}
          <SVG name="chevron-right" color="#9e9e9e" size={15} stroke={3}/>
        {/if}
      </li>
    {/each}
  </ul>
</div>