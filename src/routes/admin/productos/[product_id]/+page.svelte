<script>
	// @ts-nocheck

	import ProductStock from '$lib/components/admin/products/ProductStock.svelte';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import ProductForm from '$lib/components/forms/admin/ProductForm.svelte';
	import branchController from '../../../../logic/branchController';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import formValidator from '../../../../logic/helpers/formValidator';
	import Button from '$lib/components/utils/Button.svelte';
	import categoryController from '../../../../logic/categoryController';
	import Utils from '../../../../logic/helpers/Utils';
<<<<<<< HEAD
	import { redirect } from '@sveltejs/kit';
	import sessionAdminController from '../../../../logic/sessionAdminController';
=======
	import sessionAdminController from '../../../../logic/sessionAdminController';
	import productController from '../../../../logic/productController';
	import Modal from '$lib/components/utils/Modal.svelte';
	import { browser } from '$app/environment';
>>>>>>> a579048ec9fac24e15c12dccdb3f2bc1fa8d7fce

	let branches;
	let categories;
	let product;
	let showModalDelete = false;
	let path = '';

	if(browser) {
		path = window.location.href;
	}

	let execute = async () => {
		let validationArray = [product.name, product.brand, product.price];

		let emptyValues = formValidator.emptyValues(validationArray);

		if (emptyValues || !formValidator.isNumber(product.price)) {
			notify({ type: 'alert-error', text: 'Verifique los campos.' });
			return;
		}

		product.entryDate = Utils.getDateNow();
<<<<<<< HEAD
		
		sessionAdminController
		const res = await adminController.addProduct(product, sessionAdminController.getUserToken());
=======

		const token = await sessionAdminController.getUserToken();

		let res = await productController.addProduct(product, token);

		if (res && res.error) {
			res = await productController.editProduct(product, token);
		}
>>>>>>> a579048ec9fac24e15c12dccdb3f2bc1fa8d7fce

		if (!res) {
			notify({ type: 'alert-error', text: 'Error en el servidor' });
			return;
		}

		if (res.error) {
			notify({ type: 'alert-error', text: res.message });
			return;
		}

		notify({ type: 'alert-success', text: res.message });
		formValidator.clear(validationArray);
		setTimeout(() => {
			window.location.href = '/admin/productos';
		}, 3000);
	};

	async function getProduct() {
		let productUrl = path.split('/');
		productUrl = productUrl[productUrl.length - 1];

		product = await productController.getProduct(productUrl);
		debugger;
		if (product) {
			product = product.data.content[0];
		}
	}

	async function getBranches() {
		branches = await branchController.getBranches();
	}

	async function getCategories() {
		categories = await categoryController.getCategoriesSelect();
	}

	getCategories();
	getBranches();
</script>

<Modal bind:showModal={showModalDelete}>
	<div class="flex flex-col gap-10 p-10 w-full p-0 justify-center text-center">
		<p>Confirme la accion</p>
		<div class="flex justify-around">
			<Button
				text="Confirmar"
				type={'btn-error min-h-0 w-[100px]'}
				click={async () => {
					const token = await sessionAdminController.getUserToken();

					let res = await productController.deleteProduct(product, token);

					if (!res) {
						notify({ type: 'alert-error', text: 'Error en el servidor' });
						return;
					}

					if (res.error) {
						notify({ type: 'alert-error', text: res.message });
						return;
					}

					notify({ type: 'alert-success', text: res.message });
					setTimeout(() => {
						window.location.href = '/admin/productos';
					}, 3000);
				}}
			/>
			<Button
				text="Cancelar"
				type={'btn-neutral-grey min-h-0 w-[100px]'}
				click={() => {
					showModalDelete = false;
				}}
			/>
		</div>
	</div>
</Modal>

<SectionHeader title={'Agregar Producto'} back={true} />

<div class="flex justify-around">
	{#await getProduct()}
		<!-- promise is pending -->
	{:then}
		<ProductForm bind:product {categories} />

		<div class="flex flex-col w-fit">
			<ProductStock {branches} />

			<div class="flex gap-10">
				<div class="w-full mt-3">
					<Button
						text="{path.includes('/nuevo') ? 'Crear' : 'Actualizar'} Producto"
						type={'btn-primary h-[36px] min-h-0 w-[219px]'}
						click={() => {
							execute(product);
						}}
					/>
				</div>

				<div class="w-full mt-3">
					<Button
						svg={{ name: 'trash' }}
						type={'btn-error h-[36px] min-h-0 w-[70px]'}
						click={() => {
							showModalDelete = true;
						}}
					/>
				</div>
			</div>
		</div>
	{/await}
</div>
