<script>
	// @ts-nocheck
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import SectionTable from '$lib/components/admin/utils/SectionTable.svelte';
	import Button from '$lib/components/utils/Button.svelte';
	import Input from '$lib/components/utils/Input.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import categoryController from '../../../logic/categoryController.js';
	import { Category } from '../../../logic/dtos/Category.js';
	import formValidator from '../../../logic/helpers/formValidator.js';
	import sessionAdminController from '../../../logic/sessionAdminController.js';

	export let data;

	let thead = ['Codigo', 'Nombre'];
	let tbody = [];
    let category = new Category();

	const getCategories = async () => {
		const categories = data.categories;

		if (!categories || categories.error) {
			notify({ type: 'alert-error', text: `Ocurrio un error al cargar los productos` });
			return;
		}

		categories.forEach((category) => {
			tbody.push({
				id: category.id,
				row: [category.id, category.name]
			});
		});

		console.log(data.categories);
	};

    let create = async () => {
		let validationArray = [
			category.name,
            category.description,
		];


		let emptyValues = formValidator.emptyValues(validationArray);
		
		if (emptyValues) {
			notify({ type: 'alert-error', text: 'Verifique los campos.' });
			return;
		}
		const token = await sessionAdminController.getUserToken();
		const res = await categoryController.addCategory(category, token);

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
            window.location.href = '/admin/categorias';
        }, 3000);
	};

	//hay que cambiar
	getCategories();
</script>

<SectionHeader title={'Categorias'} />

<div class="flex gap-20 mt-10">
	<div class="flex w-[200px]">
		<Input bind:value={category.name} label="Nombre" props="h-10" />
	</div>
    <div class="flex w-[200px]">
		<Input bind:value={category.description} label="Descripcion" props="h-10" />
	</div>
	<div class="flex flex-col justify-end">
		<Button
			text="Crear Categoria"
			type={'btn-primary h-[36px] min-h-0 w-[219px]'}
			click={() => {
				create();
			}}
		/>
	</div>
</div>

<SectionTable {thead} {tbody} />