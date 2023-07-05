<script>
	// @ts-nocheck

	import Button from '$lib/components/utils/Button.svelte';
	import Input from '$lib/components/utils/Input.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import productController from '../../../../logic/productController';

	export let stock = 0;
	export let productId = null;
	let showUpdate = false;
	let currentStock = stock;

	let update = async () => {
		const res = await productController.updateStock(productId, stock);

		if (!res) {
			notify({ text: 'Ha ocurrido un error en el servidor', type: 'alert-error' });
			return;
		}

		if (res.error) {
			notify({ type: 'alert-error', text: res.message });
			return;
		}

		notify({ type: 'alert-success', text: res.message });

		showUpdate = false;
	};

	$: {
		showUpdate = stock > 0 && stock !== currentStock ? true : false;
	}
</script>

<div class="flex gap-10 w-[200px]">
	<div class="flex w-[100px]">
		<Input bind:value={stock} props="h-7 bg-base-100 text-center" label="Stock" mandatory={false} />
	</div>
	<div class="flex flex-col justify-end {showUpdate ? 'visible' : 'hidden'}">
		<div class="tooltip tooltip-primary" data-tip="Actualizar Stock">
			<Button
				svg={{ name: 'reload' }}
				type={'btn-primary h-[36px] min-h-0 w-[50px]'}
				click={() => {update()}}
			/>
		</div>
	</div>
</div>
