<script>
    // @ts-nocheck
	import HeaderCheckout from '$lib/components/checkout/HeaderCheckout.svelte';
	import { onMount } from 'svelte';
    import PurchaseConfirmation from '../../../lib/components/purchase-confirmation/PurchaseConfirmation.svelte';

    export let order = null;

    onMount(async () => {
        if(!order) window.location.href = '/';
    })

</script>

{#if order}
    <HeaderCheckout/>
    <PurchaseConfirmation/>
{/if}

