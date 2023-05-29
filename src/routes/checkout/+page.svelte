<script>
	import CheckoutBase from "$lib/components/checkout/CheckoutBase.svelte";
    import HeaderCheckout from "$lib/components/checkout/HeaderCheckout.svelte";

    let currentStep = 2;

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

    let itemsPromise = getProducts();

</script>

<HeaderCheckout/>

<div class="w-[1200px] m-auto">
    {#if currentStep == null}
        {#await itemsPromise then items}
            <!-- Step customer details -->
            <CheckoutBase titleSection='Detalles del cliente' buttonText='Ir a envio' items={items} currentStep={null}>

            </CheckoutBase>
        {/await}
    {/if}

    {#if currentStep == 2}
        {#await itemsPromise then items}
            <!-- Step shipping address -->
            <CheckoutBase titleSection='Metodos de envio' buttonText='Ir a pagos' items={items} currentStep={2}>

            </CheckoutBase>
        {/await}
    {/if}

    {#if currentStep == 3}
        {#await itemsPromise then items}
            <!-- Step payment details -->
            <CheckoutBase titleSection='Metodos de pago' buttonText='Pagar' items={items} currentStep={3}>

            </CheckoutBase>
        {/await}
    {/if}
</div>