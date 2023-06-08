<script>
	// @ts-nocheck
	import SectionFilters from '$lib/components/admin/utils/SectionFilters.svelte';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import SectionTable from '$lib/components/admin/utils/SectionTable.svelte';
	import FilterSelect from '$lib/components/admin/utils/filters/FilterSelect.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import { browser } from '$app/environment';

	export let data;

	let thead = ['Codigo', 'Nombre', 'Precio', 'Marca'];
	let tbody = [];

	const getProducts = async () => {
		const products = data.products;

		if (!products || products.error) {
			notify({ type: 'alert-error', text: `Ocurrio un error al cargar los productos` });
			return;
		}

		products.data.forEach((product) => {
			tbody.push({
				id: product.code,
				row: [product.code, product.name, product.price, product.brand],
			});
		});

		console.log(data.products);
	};

	let selects = [
		{ name: 'Estado', options: ['Habilitado', 'Deshabilitado'] },
		{ name: 'Rol', options: ['ADMIN', 'EMPLEADO', 'COMPRADOR'] }
	];

	//hay que cambiar
	getProducts();
</script>

<SectionHeader
	title={'Usuarios'}
	btn={{
		name: 'Agregar Producto',
		btnEvent: () => {
			if (browser) {
				window.location.href = '/admin/productos/nuevo';
			}
		}
	}}
/>

<SectionFilters labelSearch="Buscar por nombre o codigo">
	{#each selects as select}
		<FilterSelect name={select.name} options={select.options} />
	{/each}
</SectionFilters>

<SectionTable {thead} {tbody} buttons={{ toggle: true, edit: true }} />
