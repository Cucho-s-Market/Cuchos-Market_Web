<script>
    // @ts-nocheck
    import { userStore } from '../../../logic/Stores/UserStore';
    import addressController from '../../../logic/addressController';
	import { currentStep } from '../../../routes/checkout/stores';
	import Button from '../utils/Button.svelte';
	import Modal from '../utils/Modal.svelte';
	import { notify } from '../utils/Notifications.svelte';
    import AddressContent from './AddressContent.svelte';
    import ContentSelector from './ContentSelector.svelte';
	import AddressForm from './AddressForm.svelte';
    
    export let addressess = null;
    let selectedAddress = null;
    let addressToEdit = null;
    const addressSucursal = {
        id: 23,
        address: 'Central',
        doorNumber: '4875',
        location: 'yaguaron',
        city: 'Montevideo'
    }

    let takeAway = false;
    let showAddressForm = false;
    let editForm = false;

    const goToPreviousStep = () => {
        currentStep.set(null);
    }

    const checkCurrentStep = async () => {
        debugger;
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
            const addressSelected = await addressController.setSelectedAddress(addressId, takeAway);
            if(addressSelected == null) {
                notify({text: "No se pudo seleccionar la direccion", type: 'alert-error'});
                return;
            }
            currentStep.set(3);
        } else {
            notify({text: "Debe seleccionar una dirección de envio o retiro en sucursal", type: 'alert-error'});
        }
    }
    
</script>

<Modal bind:showModal={showAddressForm}>
    <AddressForm bind:showModal={showAddressForm} bind:isEdit={editForm} address={addressToEdit}/>
</Modal>

<div class="w-full">
    <div class="w-[400px] flex justify-between">
        <p class="font-semibold text-neutral-grey">Envio a domicilio</p>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="cursor-pointer" on:click={() => {showAddressForm=!showAddressForm; editForm = false; addressToEdit={}}}>
            <p class="text-[14px] text-neutral-grey">Crear nueva direccion</p>
        </div>
    </div>
    
    <div class="w-[400px] h-[400px] mb-4 overflow-scroll overflow-x-hidden border-b border-b-light-grey {addressess?.length < 4 ? 'overflow-y-hidden' : ''}">
        {#if addressess?.length > 0}
            {#each addressess as address}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <div class="address-option" data-id={address.id} on:click={() =>{editForm = true; showAddressForm=!showAddressForm; addressToEdit = address}}>
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

