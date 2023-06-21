<script>
	// @ts-nocheck
	import SectionFilters from '$lib/components/admin/utils/SectionFilters.svelte';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import SectionTable from '$lib/components/admin/utils/SectionTable.svelte';
	import FilterSelect from '$lib/components/admin/utils/filters/FilterSelect.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import { browser } from '$app/environment';
	import Button from '$lib/components/utils/Button.svelte';

	export let data;

	let search;
	let showClearFilters = false;

	let thead = ['Codigo', 'Nombre', 'Precio', 'Marca'];
	let tbody = [];
	let products = [];
	let productsFiltered = [];

	const getProducts = async () => {
		products = data;

		
		if (!products || products.error) {
			notify({ type: 'alert-error', text: `Ocurrio un error al cargar los productos` });
			return;
		}
		products = data.products.data.content;
		productsFiltered = products;

		products.forEach((product) => {
			tbody.push({
				id: product.code,
				row: [product.code, product.name, product.price, product.brand],
				stock: product.quantity
			});
		});
	};

	let selects = [
		{ name: 'Estado', options: ['Habilitado', 'Deshabilitado'] },
		{ name: 'Rol', options: ['ADMIN', 'EMPLEADO', 'COMPRADOR'] }
	];

	//hay que cambiar
	getProducts();

	$: {
		tbody = [];
		productsFiltered.forEach((product) => {
			tbody.push({
				id: product.name.replace(' ', "_"),
				row: [product.code, product.name, product.price, product.brand],
			});
		});

		showClearFilters = productsFiltered !== products ? true : false;
	}
</script>

<SectionHeader
	title={'Productos'}
	btn={{
		name: 'Agregar Producto',
		btnEvent: () => {
			if (browser) {
				window.location.href = '/admin/productos/nuevo';
			}
		}
	}}
/>

<SectionFilters labelSearch="Buscar por nombre o codigo" bind:search={search} bind:elements={productsFiltered} inputFilters={['name', 'code']}>
	{#each selects as select}
		<FilterSelect name={select.name} options={select.options} />
	{/each}
</SectionFilters>

{#if showClearFilters}
	<Button
	text="Limpiar filtros"
	type="btn-primary w-fit p-2 mt-5"
	click={() => {productsFiltered = products;}}
	/>
{/if}
	
{#key tbody}
	<SectionTable {thead} {tbody} showStock={true} buttons={{ toggle: true, edit: true }} />
{/key}
