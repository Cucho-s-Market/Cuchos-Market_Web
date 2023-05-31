<script>
    // @ts-nocheck
	import { currentStep } from '../../../routes/checkout/stores';
	import Button from '../utils/Button.svelte';
    import AddressContent from './AddressContent.svelte';
    import ContentSelector from './ContentSelector.svelte';

    export let addressess = null;
    let takeAway = false;

    const goToPreviousStep = () => {
        currentStep.set(null);
    }

    const checkCurrentStep = () => {
        // Set current step to 3 and this makes payment methods show
        currentStep.set(3);
    }
</script>

{#if addressess?.length > 0}
	<div class="w-full">
		<p class="font-semibold text-neutral-grey">Envio a domicilio</p>
		<div class="h-[400px] mb-4 overflow-scroll overflow-x-hidden border-b border-b-light-grey {addressess.length <= 4 ? 'overflow-y-hidden' : ''}">
			{#each addressess as address}
				<ContentSelector bind:takeAway={takeAway}>
					<AddressContent {address} />
				</ContentSelector>
			{/each}
            
		</div>
        <div class="flex gap-4 mt-6 mb-20">
            <input type="checkbox" bind:checked={takeAway} class="checkbox checkbox-primary" />
            <p class="font-semibold text-neutral-grey">Retiro en sucursal</p>
        </div>

         <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div class="flex gap-4">
            <Button click={goToPreviousStep} text={"Atras"} type={"w-[100px] h-[51px] text-primary-content"}/>
            <Button click={checkCurrentStep} text={"Ir a pagos"} type={"btn-primary w-[150px] h-[51px]"}/>
        </div>
	</div>
{/if}
