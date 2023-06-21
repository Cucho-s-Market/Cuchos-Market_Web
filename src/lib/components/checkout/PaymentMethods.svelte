<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { currentStep } from '../../../routes/checkout/stores';
	import Button from '../utils/Button.svelte';
	import ContentSelector from './ContentSelector.svelte';
	import { loadScript } from '@paypal/paypal-js';
	import PayPalController from '../../../logic/PayPalController';
	import cartController from '../../../logic/cartController';
	import orderController from '../../../logic/orderController';
	import { userStore } from '../../../logic/Stores/UserStore';
	import { cartStore } from '../../../logic/Stores/CartStore';
	import { branchStore } from '../../../logic/Stores/BranchStore';

	export let paymentMethods = null;

	const goToPreviousStep = () => {
		currentStep.set(2);
	};

	onMount(async () => {
		loadScript({
			'client-id':
				'AStj36A7uIpA8TJSs7ksWyfZbWS1i_hJHyXuTCWPe660YhEQdCU4rMjwOOY4BS2TbRAOyLned3vrx_ev'
		})
			.then((paypal) => {
				// start to use the PayPal JS SDK script
				paypal
					.Buttons({
						// Order is created on the server and the order id is returned
						async createOrder() {
							// const total = await PayPalController.convertUSDtoUYU(cart.total);
							const total = $cartStore.total / 39.15;
							if (total == null || !total) return null;

							const paymentObj = {
								intent: 'CAPTURE',
								purchase_units: [
									{
										amount: {
											currency_code: 'USD',
											value: String(Number(total).toFixed(2))
										}
									}
								]
							};

							const orderId = await PayPalController.createOrder(paymentObj);
							return orderId;
						},
						// Finalize the transaction on the server after payer approval
						async onApprove(data) {
							debugger;
							// TODO - Check if item is available


							const responseCapture = await PayPalController.capturePayment(data.orderID);
							if (responseCapture.status != 'COMPLETED') window.location.href = '/';

							// Create the order on the server
							var orderDetails = {
								branchId: $branchStore?.selected?.id,
								totalPrice: $cartStore?.total / 39.15,
								status: 'PENDING',
								addressId: ($userStore?.address?.isBranch) ? null : $userStore?.address?.id,
								type: ($userStore?.address?.isBranch) ? 'PICK_UP' : 'DELIVERY',
								products: $cartStore?.items.map((item) => {
									return {
										"name": item.name,
										"quantity": item.quantity
									};
								})
							};

							const orderCreated = await orderController.createOrder(orderDetails);

							cartController.clearCart();
							window.location.href = '/catalogo';
						}
					})
					.render('#paypal-button-container');
			})
			.catch((err) => {
				console.error('failed to load the PayPal JS SDK script', err);
			});
	});
</script>

{#if paymentMethods?.length > 0}
	<div class="w-full">
		<div>
			<div class="w-[400px]" id="paypal-button-container" />
		</div>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="flex gap-4">
			<Button
				click={goToPreviousStep}
				text={'Atras'}
				type={'w-[100px] h-[51px] text-primary-content'}
			/>
		</div>
	</div>
{/if}
