<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { currentStep } from '../../../routes/checkout/stores';
	import Button from '../utils/Button.svelte';
	import ContentSelector from './ContentSelector.svelte';
	import { loadScript } from '@paypal/paypal-js';
	import PayPalController from '../../../logic/PayPalController';
	import cartController from '../../../logic/cartController';

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
							debugger;
							const cart = await cartController.getCart();
							if (cart == null) return null;

                            const total = await PayPalController.convertUSDtoUYU(cart.total);
                            if(total == null || !total) return null;
							// const paymentObj = {
							// 	intent: 'CAPTURE',
							// 	purchase_units: [
							// 		{
							// 			items: cart.items.map((item) => {
							// 				return {
							// 					name: String(item.name),
                            //                     quantity: String(item.quantity),
							// 					unit_amount: {
							// 						currency_code: 'USD',
							// 						value: String(item.price)
							// 					}
												
							// 				};
							// 			}),
							// 			amount: {
							// 				currency_code: 'USD',
							// 				value: String(10)
							// 			}
							// 		}
							// 	]
							// };

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
							console.log('orderId', orderId);
							return orderId;
						},
						// Finalize the transaction on the server after payer approval
						async onApprove(data) {
							debugger;
							const responseCapture = await PayPalController.capturePayment(data.orderID);
							if (responseCapture.status != 'COMPLETED') window.location.href = '/';

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
