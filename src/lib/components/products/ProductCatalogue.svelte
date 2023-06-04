<script>
    // @ts-nocheck
	import ProductCard from "./ProductCard.svelte";

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

<div class="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-fit gap-10 max-w-[1000px]">
    {#await productsPromise then products}
        {#each products as product}
            <ProductCard item={product}/>
        {/each}
    {/await}
</div>