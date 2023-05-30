<script>
	import SectionFilters from '$lib/components/admin/utils/SectionFilters.svelte';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import SectionTable from '$lib/components/admin/utils/SectionTable.svelte';
	import Svg from '$lib/components/utils/SVG.svelte';

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

<SectionTable>
	<thead slot="thead">
		<tr>
			{#each tableItems.thead as item}
				<th>{item}</th>
			{/each}
            <th></th>
		</tr>
	</thead>

	<tbody slot="tbody">
		{#each tableItems.tbody as tbody_item, index}
			{#if index % 2 === 0}
				<tr>
					{#each tbody_item as item}
						<td>{item}</td>
					{/each}
                    <td><a href="#"><Svg name="info-circle-filled"/></a></td>
				</tr>
			{:else}
				<tr class="active">
					{#each tbody_item as item}
						<td>{item}</td>
					{/each}
                    <td><a href="#"><Svg name="info-circle-filled"/></a></td>
				</tr>
			{/if}
		{/each}
	</tbody>
</SectionTable>
