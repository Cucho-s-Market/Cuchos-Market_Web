<script>
	// @ts-nocheck

	import SectionFilters from '$lib/components/admin/utils/SectionFilters.svelte';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import SectionTable from '$lib/components/admin/utils/SectionTable.svelte';
	import FilterSelect from '$lib/components/admin/utils/filters/FilterSelect.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import { browser } from '$app/environment';
	import Button from '$lib/components/utils/Button.svelte';
	import adminController from '../../../logic/adminController.js';
	import sessionAdminController from '../../../logic/sessionAdminController.js';

	export let data;

	let search;
	let showClearFilters = false;

	let thead = ['Email', 'Nombre', 'Apellido', 'Rol'];
	let tbody = [];
	let users = [];
	let usersFiltered = [];

	const getUser = async () => {
		const users = await adminController.getUsers(sessionAdminController.getUserToken());
		
		if (!users || users.error) {
			notify({ type: 'alert-error', text: `Ocurrio un error al cargar los usuarios` });
			return;
		}
		usersFiltered = users;
		
		usersFiltered.forEach((user) => {
			tbody.push({
				id: user.id,
				row: [user.email, user.firstName, user.lastName, user.role]
			});
		});
	};

	let selects = [
		{ name: 'Estado', options: ['Habilitado', 'Deshabilitado'] },
		{ name: 'Rol', options: ['ADMIN', 'EMPLEADO', 'COMPRADOR'] }
	];

	//hay que cambiar
	getUser();

	$: {
		usersFiltered.forEach((user) => {
			tbody.push({
				id: user.id,
				row: [user.email, user.firstName, user.lastName, user.role]
			});
		});
		
		showClearFilters = usersFiltered !== users.data ? true : false;

		console.log(usersFiltered);
	}
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

<SectionFilters labelSearch="Buscar por email o nombre" bind:search={search} bind:elements={usersFiltered} inputFilters={['email', 'firstName']}>
	{#each selects as select}
		<FilterSelect name={select.name} options={select.options} />
	{/each}
</SectionFilters>

{#if showClearFilters}
	<Button
	text="Limpiar filtros"
	type="btn-primary w-fit p-2 mt-5"
	click={() => {usersFiltered = users.data;}}
	/>
{/if}

{#key tbody}
	<SectionTable {thead} {tbody} buttons={{ toggle: true, edit: true }} />
{/key}