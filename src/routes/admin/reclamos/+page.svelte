<script>
	// @ts-nocheck
	import SectionFilters from '$lib/components/admin/utils/SectionFilters.svelte';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import SectionTable from '$lib/components/admin/utils/SectionTable.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import Button from '$lib/components/utils/Button.svelte';
	import { onMount } from 'svelte';
	import Modal from '$lib/components/utils/Modal.svelte';

	export let data;

	let search;
	let showClearFilters = false;

	let thead = ['Orden ID', 'Email de Usuario', 'Titulo de reclamo', 'Fecha'];
	let tbody = [];
	let content = [];
	let contentFiltered = [];
	let showForm = false;
	let selectedIssue = null;

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
				id: content.orderId + '-' + content.user,
				row: [content.orderId, content.user, content.title, content.creationDate]
			});
		});

	};

	const showIssueInfo = (target) => {
		
		const anchor = target.parentNode;
		
		let href = anchor.href?.split('/admin/')[1];
		href = href?.split('-');
		const orderId = href[0];
		const user = href[1];

		selectedIssue = contentFiltered.find((content) => content.orderId == orderId && content.user == user);
		
		showForm = true;
	};

	onMount(async () => {
		await getContent();
	});

	$: {
		
		tbody = [];
		contentFiltered.forEach((content) => {
			tbody.push({
				id: content.orderId + '-' + content.user,
				row: [content.orderId, content.user, content.title, content.creationDate]
			});
		});

		

		showClearFilters = contentFiltered !== content ? true : false;
	}
</script>

<Modal bind:showModal={showForm}>
	<div class="flex w-full justify-between mb-5">
		<p class="text-md mb-2">Orden #{selectedIssue?.orderId}</p>
		<p class="text-md mb-2">{selectedIssue?.creationDate}</p>
	</div>

	<div class="flex flex-col w-full h-full justify-between">
		<div class="flex flex-col w-full">
			<div class="flex w-full">
				<p class="text-xs mb-5">Usuario: {selectedIssue?.user}</p>
			</div>
			<div class="flex w-full items-center pb-2">
				<h3 class="font-semibold text-[20px]">{selectedIssue?.title}</h3>
			</div>
			<div class="flex w-full min-h-[100px]">
				<p class="text-md mb-2">{selectedIssue?.description}</p>
			</div>
		</div>
	</div>
</Modal>

<SectionHeader
	title={'Ventas'}
/>

<SectionFilters labelSearch="Buscar Orden ID o email de usuario" bind:search={search} bind:elements={contentFiltered} inputFilters={['orderId', 'user']}>
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
	<SectionTable {thead} {tbody} showStock={true} click={(e) => {e.preventDefault(); showIssueInfo(e.target)}} buttons={{ showInfo: true }} />
	{/key}
{/if}
