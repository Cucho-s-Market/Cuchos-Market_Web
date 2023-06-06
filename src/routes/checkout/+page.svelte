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
    import { cartStore } from "../../logic/Stores/CartStore";
	import addressController from "../../logic/addressController";

    let clientDetails = null;
    let addressess = [];

    onMount(async() => {
        const userIsloggedIn = await sessionController.isUserLoggedIn();
        const cart = await cartController.getCart();

        // Redirect user to homepage if not logged in or cart is empty
        if((!userIsloggedIn || cart?.items.length <= 0)) window.location.href = '/';

        clientDetails = await sessionController.getUser();
        addressess = await addressController.getAddresses();
    });

    let paymentMethods = [
        {id: '123', name: 'paypal', image: 'https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15.fit_scale.size_760x427.v1602794215.png'},
        {id: '453', name: 'mercadopago', image: 'https://ingenio.org.uy/wp-content/uploads/2023/03/mercadopago.jpg'},
    ]

</script>

<HeaderCheckout/>

<div class="w-[1200px] m-auto">
    {#if $currentStep == null && clientDetails}
        {#if $cartStore?.items}
            <!-- Step customer details -->
            <CheckoutBase titleSection='Detalles del cliente' items={$cartStore?.items}>
                <CustomerDetails clientDetails={clientDetails}/>
            </CheckoutBase>
        {/if}
    {/if}

    {#if $currentStep == 2}
        {#if $cartStore?.items}
            <!-- Step shipping address -->
            <CheckoutBase titleSection='Metodos de envio' items={$cartStore?.items}>
                <ShipMethods addressess={addressess}/>
            </CheckoutBase>
        {/if}
    {/if}

    {#if $currentStep == 3}
        {#if $cartStore?.items}
            <!-- Step payment details -->
            <CheckoutBase titleSection='Metodos de pago' items={$cartStore?.items}>
                <PaymentMethods paymentMethods={paymentMethods}/>
            </CheckoutBase>
        {/if}
    {/if}
</div>