<script>
	import SectionFilters from '$lib/components/admin/utils/SectionFilters.svelte';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import SectionTable from '$lib/components/admin/utils/SectionTable.svelte';
	import FilterSelect from '$lib/components/admin/utils/filters/FilterSelect.svelte';

    let tableItems = {
		thead: ['Codigo', 'Nombre', 'Email', 'Tipo', 'FEcha de creacion'],
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
	title={'Usuarios'}
	btn={{
		name: 'Agregar Usuario',
		btnEvent: () => {
			alert('click action');
		}
	}}
/>

<SectionFilters labelSearch="Buscar por codigo o nombre">
	<FilterSelect name="{select.name}" options={select.options}/>
	<FilterSelect name="{select.name}" options={select.options}/>
	<FilterSelect name="{select.name}" options={select.options}/>
	<FilterSelect name="{select.name}" options={select.options}/>
</SectionFilters>

<SectionTable thead={tableItems.thead} tbody={tableItems.tbody} buttons={{toggle: true, edit: true}} />
