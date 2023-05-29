<script>
	import ProductList from '../products/ProductList.svelte';
	import Button from '../utils/Button.svelte';
	import Svg from '../utils/SVG.svelte';
	import NavigationProgress from './NavigationProgress.svelte';
	export let titleSection = '';
	export let buttonText = '';
	export let items = null;
	export let currentStep = null;
</script>

<main class="w-full flex">
	<!-- Left side checkout -->
	<div class="w-[50%] border-r border-br-grey pt-[50px]">
		<NavigationProgress currentStep = {currentStep}/>
		<div class="flex flex-col justify-between my-8">
			<p class="font-bold text-[24px]">{titleSection}</p>
			<slot />
			<Button text={buttonText} type={'btn-primary w-[160px] h-[51px]'} />
		</div>
	</div>

	<!-- Right side checkout -->
	<div class="w-[50%] py-4 pt-[50px] border-r border-br-grey">

		<div class="px-4 border-b border-br-grey">
			<p class="font-bold text-[24px]">Detalles de la compra</p>

			<!-- Buyed Products -->
			<div class="my-10 flex flex-col gap-4 max-h-[400px] overflow-scroll overflow-x-hidden">
				{#if items?.length > 0}
					{#each items as item}
						<ProductList {item} />
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
                <p class="font-semibold text-[16px] text-neutral-grey">UYU $125000</p>
            </div>
        </div>
	</div>
</main>