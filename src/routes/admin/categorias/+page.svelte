<script>
	// @ts-nocheck
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import Button from '$lib/components/utils/Button.svelte';
	import Input from '$lib/components/utils/Input.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import { onMount } from 'svelte';
	import categoryController from '../../../logic/categoryController.js';
	import { Category } from '../../../logic/dtos/Category.js';
	import formValidator from '../../../logic/helpers/formValidator.js';
	import sessionAdminController from '../../../logic/sessionAdminController.js';	
	import { nanoid } from 'nanoid';

	export let data;

	let category = new Category();
	let categories = [];
	let fileInput = null;

	onMount(async () => {
		categories = data.categories;
	});

	let create = async () => {
		let validationArray = [category.name, category.description];

		let emptyValues = formValidator.emptyValues(validationArray);

		if (emptyValues) {
			notify({ type: 'alert-error', text: 'Verifique los campos.' });
			return;
		}

		if (category.categoryParent === '-1') {
			category.categoryParent = null;
		}
		const token = await sessionAdminController.getUserToken();
		let res = null;

		try {
			res = await categoryController.addCategory(category, token);
		} catch (error) {
			notify({ type: 'alert-error', text: error.message });
			return;
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
			window.location.href = '/admin/categorias';
		}, 2000);
	};

	async function addImage(file) {
		debugger;
		const tempUrl = URL.createObjectURL(file);
		category.image = {file: file, url: tempUrl, name: nanoid(), new: true};
		fileInput.value = '';
	}
</script>

<SectionHeader title={'Categorias'} />

<div class="flex gap-20 mt-10">
	<div class="flex w-[200px]">
		<Input bind:value={category.name} label="Nombre" props="h-10" />
	</div>
	<div class="flex w-[200px]">
		<Input bind:value={category.description} label="Descripcion" props="h-10" />
	</div>
	<div class="flex flex-col w-[200px]">
		<p class="label">
			<span class="label-text font-semibold">Categoria Padre</span>
		</p>
		<select bind:value={category.categoryParent} class="select select-primary w-full h-1 bg-light-grey focus:border-none">
			<option value="-1" selected>Sin padre</option>
			{#each categories as category}
				<option value="{category.id}">{category.name}</option>
			{/each}
		</select>
	</div>
	<div class="flex flex-col w-[200px]">
		<p class="label">
			<span class="label-text font-semibold">Imagen</span>
		</p>
		<input bind:this={fileInput} class="file-input file-input-bordered file-input-primary" on:change={(event) => {addImage(event.target.files[0])}} type="file">
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

{#if categories && categories.length > 0}
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	{#each categories as item}
		<div tabindex="0" class="collapse {item?.subcategories.length > 0 ? 'collapse-arrow' : ''} border border-base-300 bg-base-200 max-w-[700px] mt-5 shadow rounded-lg">
			<div class="flex flex-col justify-center collapse-title text-xs font-medium">{item.name}</div>
			<div class="flex flex-col">
				{#if item?.subcategories.length > 0}
					{#each item?.subcategories as subitem}
						<div class="collapse-content text-xs">
							<p>{subitem.name}</p>
						</div>
					{/each}
				{/if}
			</div>
		</div>
	{/each}
{/if}