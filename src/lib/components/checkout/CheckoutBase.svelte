<script>
	// @ts-nocheck
	import ProductList from '../products/ProductList.svelte';
	import NavigationProgress from './NavigationProgress.svelte';
	import {currentStep} from '../../../routes/checkout/stores.js'
	import {cartStore} from '../../../logic/Stores/CartStore.js'

	export let titleSection = '';
	export let items = null;
</script>

<main class="w-full flex">
	<!-- Left side checkout -->
	<div class="w-[50%] totalHigh border-r border-br-grey pt-[30px]">
		<NavigationProgress currentStep = {$currentStep}/>
		<div class="flex flex-col justify-between my-8">
			<p class="font-bold text-[24px]">{titleSection}</p>
			<div class="my-10">
				<slot />
			</div>
		</div>
	</div>

	<!-- Right side checkout -->
	<div class="w-[50%] totalHigh py-4 pt-[30px] border-r border-br-grey">

		<div class="px-4 border-b border-br-grey">
			<p class="font-bold text-[24px]">Detalles de la compra</p>

			<!-- Buyed Products -->
			<div class="my-10 flex flex-col gap-4 min-h-[400px] max-h-[400px] {items?.length > 5 ? 'overflow-scroll' : ''} overflow-x-hidden">
				{#if items?.length > 0}
					{#each items as item}
						<ProductList {item} inCheckout={true}/>
					{/each}
				{/if}
			</div>
		</div>

		<!-- Total statistics -->
		<div class="w-full flex gap-6 justify-end px-4 my-10">
            <div>
                <p class="font-semibold text-[16px]">Subtotal:</p>
                <p class="font-semibold text-[16px]">Impuestos:</p>
                <p class="font-semibold text-[16px]">Descuentos:</p>
                <p class="font-semibold text-[16px]">Total:</p>
            </div>
            <div>
                <p class="font-medium text-[16px] text-neutral-grey">UYU $67</p>
                <p class="font-medium text-[16px] text-neutral-grey">UYU $67</p>
                <p class="font-medium text-[16px] text-neutral-grey">UYU $67</p>
                <p class="font-semibold text-[16px] text-neutral-grey">UYU {$cartStore?.total}</p>
            </div>
        </div>
	</div>
</main>

<style>
	.totalHigh{
		height: calc(100vh - 109px);
	}
</style>