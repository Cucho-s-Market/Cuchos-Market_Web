<script>
    // @ts-nocheck
	import CheckoutBase from "$lib/components/checkout/CheckoutBase.svelte";
	import CustomerDetails from "$lib/components/checkout/CustomerDetails.svelte";
    import HeaderCheckout from "$lib/components/checkout/HeaderCheckout.svelte";
	import PaymentMethods from "$lib/components/checkout/PaymentMethods.svelte";
	import ShipMethods from "$lib/components/checkout/ShipMethods.svelte";
	import { onMount } from "svelte";
    import {currentStep} from "./stores";
	import sessionController from "../../logic/sessionController";
	import cartController from "../../logic/cartController";

    let clientDetails = null;

    onMount(async() => {
        const userIsloggedIn = await sessionController.isUserLoggedIn();
        const cart = await cartController.getCart();

        // Redirect user to homepage if not logged in or cart is empty
        if((!userIsloggedIn || cart?.items.length <= 0)) window.location.href = '/';
    });

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
    let addressess = [
        {address: 'avenida siempre viva', doorNumber: '56', street: 'w y x', city: 'Springfield'},
        {address: 'colonia 1815', doorNumber: 'dd', street: '', city: ''},
        {address: 'fdsfs', doorNumber: '22', street: 'dd', city: 'ss'},
        {address: 'sss', doorNumber: '33', street: 'dd', city: 'ss'},
        {address: 'sss', doorNumber: '33', street: 'dd', city: 'ss'},
        {address: 'sss', doorNumber: '33', street: 'dd', city: 'ss'},
        {address: 'sss', doorNumber: '33', street: 'dd', city: 'ss'},
        {address: 'sss', doorNumber: '33', street: 'dd', city: 'ss'},
        {address: 'sss', doorNumber: '33', street: 'dd', city: 'ss'},
        {address: 'sss', doorNumber: '33', street: 'dd', city: 'ss'},
    ];

    let paymentMethods = [
        {id: '123', name: 'paypal', image: 'https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15.fit_scale.size_760x427.v1602794215.png'},
        {id: '453', name: 'mercadopago', image: 'https://ingenio.org.uy/wp-content/uploads/2023/03/mercadopago.jpg'},
    ]

</script>

<HeaderCheckout/>

<div class="w-[1200px] m-auto">
    {#if $currentStep == null && clientDetails}
        {#await itemsPromise then items}
            <!-- Step customer details -->
            <CheckoutBase titleSection='Detalles del cliente' items={items}>
                <CustomerDetails clientDetails={clientDetails}/>
            </CheckoutBase>
        {/await}
    {/if}

    {#if $currentStep == 2}
        {#await itemsPromise then items}
            <!-- Step shipping address -->
            <CheckoutBase titleSection='Metodos de envio' items={items}>
                <ShipMethods addressess={addressess}/>
            </CheckoutBase>
        {/await}
    {/if}

    {#if $currentStep == 3}
        {#await itemsPromise then items}
            <!-- Step payment details -->
            <CheckoutBase titleSection='Metodos de pago' items={items}>
                <PaymentMethods paymentMethods={paymentMethods}/>
            </CheckoutBase>
        {/await}
    {/if}
</div>