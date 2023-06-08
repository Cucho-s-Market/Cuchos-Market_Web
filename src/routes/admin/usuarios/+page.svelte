<script>
	// @ts-nocheck

	import SectionFilters from '$lib/components/admin/utils/SectionFilters.svelte';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import SectionTable from '$lib/components/admin/utils/SectionTable.svelte';
	import FilterSelect from '$lib/components/admin/utils/filters/FilterSelect.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import { browser } from '$app/environment';

	export let data;

	let thead = ['Email', 'Nombre', 'Apellido', 'Rol'];
	let tbody = [];

	const getUser = async () => {
		const users = data.users;

		if (!users || users.error) {
			notify({ type: 'alert-error', text: `Ocurrio un error al cargar los usuarios` });
			return;
		}

		users.data.forEach((user) => {
			tbody.push({
				id: user.id,
				row: [user.email, user.firstName, user.lastName, user.role]
			});
		});

		console.log(data.users);
	};

	let selects = [
		{ name: 'Estado', options: ['Habilitado', 'Deshabilitado'] },
		{ name: 'Rol', options: ['ADMIN', 'EMPLEADO', 'COMPRADOR'] }
	];

	//hay que cambiar
	getUser();
</script>

<SectionHeader
	title={'Usuarios'}
	btn={{
		name: 'Agregar Usuario',
		btnEvent: () => {
			if (browser) {
				window.location.href = '/admin/usuarios/nuevo';
			}
		}
	}}
/>

<SectionFilters labelSearch="Buscar por email o nombre">
	{#each selects as select}
		<FilterSelect name={select.name} options={select.options} />
	{/each}
</SectionFilters>

<SectionTable {thead} {tbody} buttons={{ toggle: true, edit: true }} />
