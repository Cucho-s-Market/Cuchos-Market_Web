<script>
	// @ts-nocheck
	import SectionFilters from '$lib/components/admin/utils/SectionFilters.svelte';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import SectionTable from '$lib/components/admin/utils/SectionTable.svelte';
	import FilterSelect from '$lib/components/admin/utils/filters/FilterSelect.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import Button from '$lib/components/utils/Button.svelte';
	import { onMount } from 'svelte';
	import Utils from '../../../logic/helpers/Utils.js';

	export let data;

	let search;
	let showClearFilters = false;

	let thead = ['ID', 'Estado', 'Tipo', 'Monto total', 'Creacion'];
	let tbody = [];
	let content = [];
	let contentFiltered = [];

	const STATUS = {"PENDING":"Pendiente","PREPARING":"Preparando","READY":"Listo","DELIVERED":"Entregado","CANCELLED":"Cancelado"};

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

		
		content.forEach((content) => {
			content.status = STATUS[String(content.status)]
			content.type = content.type == "PICK_UP" ? "Retiro en sucursal" : "Domicilio"
			tbody.push({
				id: content.id,
				row: [content.id, content.status, content.type, 'UYU ' + String(content.totalPrice), content.creationDate]
			});
		});	
	};

	onMount(async () => {
		Utils.showLoading();
		await getContent();
		Utils.removeLoading();
	});

	let selects = [
		{ name: 'Estado', data: 'status', options: ['Cancelado', 'Pendiente', 'Preparando', 'Entregado'] },
		{ name: 'Tipo', data: 'type', options: ['Retiro en sucursal', 'Domicilio'] },
	];

	let selectedOptions = {
		'status': '',
		'type': ''
	};

	$: {
		
		tbody = [];
		contentFiltered.forEach((content) => {
			tbody.push({
				id: content.id,
				row: [content.id, content.status, content.type, 'UYU ' + content.totalPrice, content.creationDate]
			});
		});

		

		showClearFilters = contentFiltered !== content ? true : false;
	}
</script>

<SectionHeader
	title={'Ventas'}
/>

<SectionFilters labelSearch="Buscar ID" bind:search={search} bind:elements={contentFiltered} inputFilters={['id']} selectedFilters={selectedOptions}>
	{#each selects as select}
		<FilterSelect bind:selectedOption={selectedOptions[select.data]} name={select.name} options={select.options} />
	{/each}
</SectionFilters>

{#if showClearFilters}
	<Button
	text="Limpiar filtros"
	type="btn-primary w-fit p-2 mt-5"
	click={() => {contentFiltered = content;}}
	/>
{/if}
	
{#if content}
	{#key tbody}
	<SectionTable {thead} {tbody} showStock={true} buttons={{ editOrder: true }} />
	{/key}
{/if}
