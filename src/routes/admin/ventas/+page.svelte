<script>
	// @ts-nocheck
	import SectionFilters from '$lib/components/admin/utils/SectionFilters.svelte';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import SectionTable from '$lib/components/admin/utils/SectionTable.svelte';
	import FilterSelect from '$lib/components/admin/utils/filters/FilterSelect.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import Button from '$lib/components/utils/Button.svelte';
	import { onMount } from 'svelte';

	export let data;

	let search;
	let showClearFilters = false;

	let thead = ['ID', 'Estado', 'Tipo', 'Monto total', 'Creacion'];
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

		content.forEach((content) => {
			tbody.push({
				id: content.id,
				row: [content.id, content.status, content.type, String(content.totalPrice), content.creationDate]
			});
		});

		;
	};

	onMount(async () => {
		await getContent();
	});

	let selects = [
		{ name: 'Estado', data: 'status', options: ['CANCELLED', 'PENDING', 'PREPARING', 'DELIVERED'] },
		{ name: 'Tipo', data: 'type', options: ['PICK_UP', 'DELIVERY'] },
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
				row: [content.id, content.status, content.type, content.totalPrice, content.creationDate]
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
