<script>
	// @ts-nocheck

	import Button from '$lib/components/utils/Button.svelte';
	import Input from '$lib/components/utils/Input.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import sessionController from '../../../../logic/sessionController';
	import formValidator from '../../../../logic/helpers/formValidator';
	import { Product } from '../../../../logic/dtos/Product';
	import { bind } from 'svelte/internal';

	let fileUpload;

	let product = new Product();

	let create = async () => {
		if (showCustomer) {
			let customer = new Customer();
			customer = user;
			customer.ci = ci;
			let validationArray = [
				customer.ci,
				customer.firstName,
				customer.lastName,
				customer.password,
				repeatPassword
			];

			let emptyValues = formValidator.emptyValues(validationArray);

			if (emptyValues || !formValidator.ci(customer.ci) || !formValidator.email(customer.email)) {
				notify({ type: 'alert-error', text: 'Verifique los campos.' });
				return;
			}

			const res = await sessionController.register(customer);

			if (!res) {
				notify({ type: 'alert-error', text: 'Error en el servidor' });
				return;
			}

			if (res.error) {
				notify({ type: 'alert-error', text: res.message });
				return;
			}

			if (res.ok) {
				notify({ type: 'alert-success', text: res.message });
				formValidator.clear(validationArray);
			}
		}
	};
</script>

<div class="flex flex-col w-[400px]">
	<div class="flex flex-col w-full gap-5 p-5 rounded-lg my-10 bg-base-100 shadow">
		<div class="w-full">
			<Input bind:value={product.name} props="h-10" label="Nombre" />
		</div>

		<div class="w-full">
			<Input bind:value={product.price} props="h-10" label="Precio" />
		</div>

		<div class="flex flex-col w-full">
            <p class="label">
                <span class="label-text font-semibold">Categoria <span class="p-1 text-error">*</span></span>
            </p>
            <select bind:value={product.category} class="select select-primary w-full bg-light-grey focus:border-none">
                <option disabled selected>SUCURSAL</option>
                <option>Sucursal 1</option>
            </select>
        </div>

		<div class="w-full">
			<Input bind:value={product.brand} props="h-10" label="Marca" />
		</div>

		<div class="w-full">
			<label for="descripcion" class="label">
				<span class="label-text font-semibold">Descripcion<span class="p-1 text-error">*</span></span>
			</label>
			<textarea class="textarea textarea-primary w-full min-h-[200px] max-h-[200px] bg-light-grey" name="descripcion" placeholder="Descripcion" />
		</div>
	</div>

	<div class="flex flex-col w-full gap-5 p-5 rounded-lg bg-base-100 shadow">
		<p class="font-semibold text-md mb-5">Imagenes</p>
		<div class="flex">
			<input this:bind={fileUpload} class="hidden" type="file">
			<Button type="bg-base-300 border-none w-[70px] h-[70px] hover:bg-primary hover:text-base-100" svg={{name: "camera-plus"}} click={() => { console.log(fileUpload); }} />
		</div>
	</div>
</div>
