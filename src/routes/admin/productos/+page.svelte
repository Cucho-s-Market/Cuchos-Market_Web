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
	title={'Productos'}
	btn={{
		name: 'Agregar Producto',
		btnEvent: () => {
			alert('click action');
		}
	}}
/>

<SectionFilters labelSearch="Buscar por codigo o nombre">
	<FilterSelect name="{select.name}" options={select.options}/>
	<FilterSelect name="{select.name}" options={select.options}/>
	<FilterSelect name="{select.name}" options={select.options}/>
</SectionFilters>

<!-- <SectionTable thead={tableItems.thead} tbody={tableItems.tbody} buttons={{toggle: true, edit: true}} /> -->
