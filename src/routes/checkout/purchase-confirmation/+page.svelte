<script>
    // @ts-nocheck
	import HeaderCheckout from '$lib/components/checkout/HeaderCheckout.svelte';
	import { onMount } from 'svelte';
    import PurchaseConfirmation from '../../../lib/components/purchase-confirmation/PurchaseConfirmation.svelte';
	import sessionController from '../../../logic/sessionController';
	import { userStore } from '../../../logic/Stores/UserStore';

    onMount(async () => {
        let user = await sessionController.getUser();
        if (!user) window.location.href = '/';

        if(!user?.orderCreated) window.location.href = '/';

        // If order was created we are going to delete it so the user cannot go back to this page
        user.orderCreated = false;
        sessionController.setUser(user);
    });
</script>

{#if $userStore?.orderCreated}
    <HeaderCheckout/>
    <PurchaseConfirmation email={$userStore?.email}/>
{/if}


