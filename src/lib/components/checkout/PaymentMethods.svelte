<script>
    // @ts-nocheck
	import { currentStep } from "../../../routes/checkout/stores";
	import Button from "../utils/Button.svelte";
	import ContentSelector from "./ContentSelector.svelte";

    export let paymentMethods = null;

    const goToPreviousStep = () => {
        currentStep.set(2);
    }

    const processPayment = () => {
   
    }
</script>

{#if paymentMethods?.length > 0}
    <div class="w-full">
        <div>
            {#each paymentMethods as payment}
                <div data-id={payment.id}>
                    <ContentSelector>
                        <img class="w-[180px] h-[70px] object-cover" src="{payment.image ? payment.image : ''}" alt="{payment.name ? payment.name : ''}">
                    </ContentSelector>
                </div>   
            {/each}
        </div>
        
         <!-- svelte-ignore a11y-click-events-have-key-events -->
         <div class="flex gap-4">
            <Button click={goToPreviousStep} text={"Atras"} type={"w-[100px] h-[51px] text-primary-content"}/>
            <Button click={processPayment} text={"Pagar"} type={"btn-primary w-[150px] h-[51px]"}/>
        </div>
    </div>
{/if}