<script>
    // @ts-nocheck
	import CatalogoHeader from "$lib/components/catalogo/CatalogoHeader.svelte";
	import CatalogoSidebar from "$lib/components/catalogo/CatalogoSidebar.svelte";
	import ProductCatalogue from "$lib/components/products/ProductCatalogue.svelte";
	import Notifications from "$lib/components/utils/Notifications.svelte";

    const getProducts = async() => {
        let products = [];
        
        const res = await fetch('https://dummyjson.com/products');
        const data = await res.json();
        if(data.products) {
            // @ts-ignore
            data.products.forEach(element => {
                products.push({
                    name: element.title,
                    price: element.price,
                    discount: element.discountPercentage,
                    iso: "UYU",
                    image: element.images[0],
                });
            });
        }

        return products;
    }

    let productsPromise = getProducts();

</script>

<main class="w-[1200px] pt-[160px] m-auto">
    {#await productsPromise then products}
            <CatalogoHeader qtyItems = {products?.length || 0}/>

            <div class="flex justify-between pt-[80px]">
                <!-- Side bar categories -->
                <sidebar>
                    <CatalogoSidebar/>
                </sidebar>
                <!-- Items catalog -->
                <div>
                    <ProductCatalogue products={products}/>
                </div>
            </div>
        

        <Notifications/>
    {/await}
</main>
    