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

	let thead = ['Orden ID', 'Email de Usuario', 'Titulo de reclamo', 'Fecha'];
	let tbody = [];
	let content = [];
	let contentFiltered = [];

	const getContent = async () => {
		content = data;
        
		
		if (!content || data.content) {
			notify({ type: 'alert-error', text: `Ocurrio un error al cargar los reclamos` });
			return;
		}

		content = [];

		if(data.issues) {
			content = data.issues?.data?.content;
		}

		contentFiltered = content;

		
		content.forEach((content) => {
			tbody.push({
				id: content.orderId,
				row: [content.orderId, content.user, content.title, content.creationDate]
			});
		});

	};

	onMount(async () => {
		await getContent();
	});

	$: {
		
		tbody = [];
		contentFiltered.forEach((content) => {
			tbody.push({
				id: content.orderId,
				row: [content.orderId, content.user, content.title, content.creationDate]
			});
		});

		debugger;

		showClearFilters = contentFiltered !== content ? true : false;
	}
</script>

<SectionHeader
	title={'Ventas'}
/>

<SectionFilters labelSearch="Buscar Orden ID o Email de " bind:search={search} bind:elements={contentFiltered} inputFilters={['orderId', 'user']}>
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
