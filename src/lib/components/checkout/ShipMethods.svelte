<script>
    // @ts-nocheck
    import addressController from '../../../logic/addressController';
	import { currentStep } from '../../../routes/checkout/stores';
	import Button from '../utils/Button.svelte';
    import AddressContent from './AddressContent.svelte';
    import ContentSelector from './ContentSelector.svelte';

    export let addressess = null;
    let selectedAddress = null;

    const addressSucursal = {
        id: 23,
        address: 'Central',
        doorNumber: '4875',
        street: 'yaguaron',
        city: 'Montevideo'
    }

    let takeAway = false;
    
    const goToPreviousStep = () => {
        currentStep.set(null);
    }

    const checkCurrentStep = async () => {
        // Set current step to 3 and this makes payment methods show

        // Validate if addresses are selected
        let addressSelected = false;
        let addressId = null;
        const selectedAddress = document.querySelectorAll(".address-option input");
        selectedAddress.forEach((address) => {
            if(address.checked) {
                addressSelected = true;
                addressId = (!address.parentElement.dataset.id) ? address.parentElement.parentElement.dataset.id : address.parentElement.dataset.id;
            }
        });

        if(addressSelected) {
            const addressSelected = await addressController.setSelectedAddress(addressId);
            if(addressSelected == null) {
                alert("No se pudo seleccionar la dirección");
                return;
            }
            currentStep.set(3);
        } else {
            alert("Debe seleccionar una dirección de envio o retiro en sucursal");
        }
    }

</script>

<div class="w-full">
    <p class="font-semibold text-neutral-grey">Envio a domicilio</p>
    <div class="h-[400px] mb-4 overflow-scroll overflow-x-hidden border-b border-b-light-grey {addressess.length < 4 ? 'overflow-y-hidden' : ''}">
        {#if addressess?.length > 0}
            {#each addressess as address}
                <div class="address-option" data-id={address.id}>
                    <ContentSelector bind:takeAway={takeAway}>
                        <AddressContent {address} />
                    </ContentSelector>
                </div>
            {/each}
        {:else}
            <div class="flex justify-center items-center h-full">
                <p class="text-center text-neutral-grey">No hay direcciones registradas</p>
            </div>
        {/if}
    </div>
    <div class="flex gap-4 mt-6 mb-20">
        <div class="address-option" data-id={addressSucursal.id}>
            <input type="checkbox" bind:checked={takeAway} class="checkbox checkbox-primary" />
        </div>
        <p class="font-semibold text-neutral-grey">Retiro en sucursal</p>
    </div>

        <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="flex gap-4">
        <Button click={goToPreviousStep} text={"Atras"} type={"w-[100px] h-[51px] text-primary-content"}/>
        <Button click={checkCurrentStep} text={"Ir a pagos"} type={"btn-primary w-[150px] h-[51px]"}/>
    </div>
</div>

