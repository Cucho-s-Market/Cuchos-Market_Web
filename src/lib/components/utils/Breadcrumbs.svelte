<script>
  let breadcrumbs = [
  { url: "/", label: "Home" },
  { url: "/", label: "Catalogo" },
  { label: "Alimentos" }
];

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