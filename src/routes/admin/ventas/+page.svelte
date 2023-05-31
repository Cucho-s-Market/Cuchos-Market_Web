<script>
	import SectionFilters from '$lib/components/admin/utils/SectionFilters.svelte';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import SectionTable from '$lib/components/admin/utils/SectionTable.svelte';

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
</script>

<SectionHeader
	title={'Ventas'}
	btn={{
		name: 'Agregar',
		btnEvent: () => {
			alert('click action');
		}
	}}
/>

<SectionFilters />

<SectionTable thead={tableItems.thead} tbody={tableItems.tbody} />
