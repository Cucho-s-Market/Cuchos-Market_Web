<script>
	import CatalogoHeader from "$lib/components/catalogo/CatalogoHeader.svelte";
	import CatalogoSidebar from "$lib/components/catalogo/CatalogoSidebar.svelte";
	import ProductCatalogue from "$lib/components/products/ProductCatalogue.svelte";
	import Notifications from "$lib/components/utils/Notifications.svelte";
</script>

<main class="w-[1200px] pt-[160px] m-auto">
    <CatalogoHeader/>

    <div class="flex justify-between pt-[80px]">
        <!-- Side bar categories -->
        <sidebar>
            <CatalogoSidebar/>
        </sidebar>
        <!-- Items catalog -->
        <div>
            <ProductCatalogue/>
        </div>
    </div>
    
</main>

<Notifications/>