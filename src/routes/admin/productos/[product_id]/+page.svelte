<script>
	// @ts-nocheck

	import ProductStock from '$lib/components/admin/products/ProductStock.svelte';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import ProductForm from '$lib/components/forms/admin/ProductForm.svelte';
	import branchController from '../../../../logic/branchController';
	import { Product } from '../../../../logic/dtos/Product';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import formValidator from '../../../../logic/helpers/formValidator';
	import Button from '$lib/components/utils/Button.svelte';
	import categoryController from '../../../../logic/categoryController';
	import Utils from '../../../../logic/helpers/Utils';
	import sessionAdminController from '../../../../logic/sessionAdminController';
	import productController from '../../../../logic/productController';

	let branches;
	let categories;
	let product;

	let create = async () => {
		let validationArray = [product.name, product.brand, product.price];

		let emptyValues = formValidator.emptyValues(validationArray);

		if (emptyValues || !formValidator.isNumber(product.price)) {
			notify({ type: 'alert-error', text: 'Verifique los campos.' });
			return;
		}

		product.entryDate = Utils.getDateNow();

		let res = null;
		debugger;
		if(res) {
			res = await productController.addProduct(product, sessionAdminController.getUserToken());
		} else {
			res = await productController.editProduct(product, sessionAdminController.getUserToken());
		}

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
		let path = window.location.href;

		path = path.split('/');
		path = path[path.length - 1];

		product = await productController.getProduct(path);
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

<SectionHeader title={'Agregar Producto'} back={true} />

<div class="flex justify-around">
	{#await getProduct()}
		<!-- promise is pending -->
	{:then}
		<ProductForm bind:product {categories} />
	{/await}

	<div class="flex flex-col w-fit">
		<ProductStock {branches} />

		<div class="flex">
			<div class="w-full mt-3">
				<Button
					text="Crear Producto"
					type={'btn-primary h-[36px] min-h-0 w-[219px]'}
					click={() => {
						create(product);
					}}
				/>
			</div>
		</div>
	</div>
</div>
