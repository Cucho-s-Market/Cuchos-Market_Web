<script>
    // @ts-nocheck
	import { currentStep } from "../../../routes/checkout/stores";
	import Login from "../forms/login/Login.svelte";
	import Button from "../utils/Button.svelte";
    import Link from "../utils/Link.svelte";
	import Modal from "../utils/Modal.svelte";

    export let clientDetails = null;
    
    let showModalLogin = false;

    const checkCurrentStep = () => {
        // Set current step to 2 and this makes ship content show
        currentStep.set(2);
    }
</script>

<Modal bind:showModal={showModalLogin}>
    <Login/>
</Modal>

{#if clientDetails}
<div>
    <div class="w-full flex gap-6 overflow-hidden">
        <div class="columnNames flex flex-col gap-1">
            <p>Nombre:</p>
            <p>Apellido:</p>
            <p>C.I:</p>
            <p>Email:</p>
            <p>Telefono:</p>
        </div>
        <div class="dataName flex flex-col gap-1">
            <p>{clientDetails.firstName ? clientDetails.firstName : 'N/A'}</p>
            <p>{clientDetails.lastName ? clientDetails.lastName : 'N/A'}</p>
            <p>{clientDetails.dni ? clientDetails.dni : 'N/A'}</p>
            <p>{clientDetails.email ? clientDetails.email : 'N/A'}</p>
            <p>{clientDetails.telephone ? clientDetails.telephone : 'N/A'}</p>
        </div>
    </div>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="mt-6 mb-20" on:click={() => {showModalLogin = !showModalLogin}}>
        <Link text={"Cambiar de cuenta"} type={"link-black"} target={false}/>
    </div>
    
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="flex gap-4">
        <!-- <Button click={goToPreviousStep} text={"Atras"} type={"w-[100px] h-[51px] text-primary-content"}/> -->
        <Button click={checkCurrentStep} text={"Ir a envio"} type={"btn-primary w-[150px] h-[51px]"}/>
    </div>
    

</div>
    
{/if}

<style>
    .columnNames p{
        /* semibold */
        font-weight: 600;
    }

    .dataName p{
        /* medium */
        font-weight: 500;
        color: #746F72;
    }
</style>