<script>
	import CatalogoHeader from "$lib/components/catalogo/CatalogoHeader.svelte";
	import CatalogoSidebar from "$lib/components/catalogo/CatalogoSidebar.svelte";
	import Footer from "$lib/components/common/Footer.svelte";
	import Header from "$lib/components/common/Header/Header.svelte";
	import ProductCard from "$lib/components/products/ProductCard.svelte";
	import ProductCatalogue from "$lib/components/products/ProductCatalogue.svelte";
	import Swiper from "$lib/components/third-party/Swiper.svelte";
	import Notifications from "$lib/components/utils/Notifications.svelte";
	import Svg from "$lib/components/utils/SVG.svelte";
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