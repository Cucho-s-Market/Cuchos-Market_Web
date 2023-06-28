<script>
    // @ts-nocheck
	import HeaderCheckout from "$lib/components/checkout/HeaderCheckout.svelte";
	import RecoverPassword from "$lib/components/forms/forgotPassword/RecoverPassword.svelte";
	import { onMount } from "svelte";
    export let data;

    onMount(() => {
        
        if(data.error) window.location.href = '/';
    });
</script>

{#if !data?.error}
    <HeaderCheckout/>
    <RecoverPassword token={data?.token}/>
{/if}