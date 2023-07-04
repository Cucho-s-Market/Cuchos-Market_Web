<<<<<<< HEAD
<script>
	import SectionFilters from '$lib/components/admin/utils/SectionFilters.svelte';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import SectionTable from '$lib/components/admin/utils/SectionTable.svelte';
	import FilterSelect from '$lib/components/admin/utils/filters/FilterSelect.svelte';

	let tableItems = {
		thead: ['Numero', 'Comprador', 'Fecha', 'Medio de pago', 'Estado'],
		tbody: [
			['Numero', 'Comprador', 'Fecha', 'Medio de pago', 'Estado'],
			['Numero', 'Comprador', 'Fecha', 'Medio de pago', 'Estado'],
			['Numero', 'Comprador', 'Fecha', 'Medio de pago', 'Estado'],
			['Numero', 'Comprador', 'Fecha', 'Medio de pago', 'Estado'],
			['Numero', 'Comprador', 'Fecha', 'Medio de pago', 'Estado'],
			['Numero', 'Comprador', 'Fecha', 'Medio de pago', 'Estado'],
			['Numero', 'Comprador', 'Fecha', 'Medio de pago', 'Estado'],
			['Numero', 'Comprador', 'Fecha', 'Medio de pago', 'Estado']
		]
	};

    let select = {name: "Estado", options: ['Habilitado', 'Deshabilitado']};
</script>

<SectionHeader
	title={'Ventas'}
/>

<SectionFilters>
	<FilterSelect name="{select.name}" options={select.options}/>
	<FilterSelect name="{select.name}" options={select.options}/>
	<FilterSelect name="{select.name}" options={select.options}/>
	<FilterSelect name="{select.name}" options={select.options}/>
</SectionFilters>

<SectionTable thead={tableItems.thead} tbody={tableItems.tbody} buttons={{info: true}} />
=======
<script>
	// @ts-nocheck
	import SectionFilters from '$lib/components/admin/utils/SectionFilters.svelte';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import SectionTable from '$lib/components/admin/utils/SectionTable.svelte';
	import FilterSelect from '$lib/components/admin/utils/filters/FilterSelect.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import Button from '$lib/components/utils/Button.svelte';

	export let data;

	let search;
	let showClearFilters = false;

	let thead = ['Codigo', 'Nombre', 'Precio', 'Marca'];
	let tbody = [];
	let content = [];
	let contentFiltered = [];

	const getContent = async () => {
		content = data;
		
		if (!content || data.content) {
			notify({ type: 'alert-error', text: `Ocurrio un error al cargar los contentos` });
			return;
		}

		content = [];

		if(data.orders) {
			content = data.orders?.content;
		}

		contentFiltered = content;

		debugger;

		content.forEach((content) => {
			tbody.push({
				id: content.code,
				row: [content.code, content.name, content.price, content.brand],
				stock: content.quantity
			});
		});
	};

	let selects = [
		{ name: 'Estado', options: ['Habilitado', 'Deshabilitado'] },
		{ name: 'Rol', options: ['ADMIN', 'EMPLEADO', 'COMPRADOR'] }
	];

	//hay que cambiar
	getContent();

	$: {
		tbody = [];
		contentFiltered.forEach((content) => {
			tbody.push({
				id: content.name.replace(' ', "_"),
				row: [content.code, content.name, content.price, content.brand],
				stock: content.quantity
			});
		});

		showClearFilters = contentFiltered !== content ? true : false;
	}
</script>

<SectionHeader
	title={'Ventas'}
/>

<SectionFilters labelSearch="Buscar codigo" bind:search={search} bind:elements={contentFiltered} inputFilters={['name', 'code']}>
	{#each selects as select}
		<FilterSelect name={select.name} options={select.options} />
	{/each}
</SectionFilters>

{#if showClearFilters}
	<Button
	text="Limpiar filtros"
	type="btn-primary w-fit p-2 mt-5"
	click={() => {contentFiltered = content;}}
	/>
{/if}
	
{#key tbody}
	<SectionTable {thead} {tbody} showStock={true} buttons={{ toggle: true, edit: true }} />
{/key}
>>>>>>> c0aeb8a1e854b15a8d3c70a0bcf313c9045601a4
