<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import sessionAdminController from '../../../../../logic/sessionAdminController';
	import SideMenuOption from './SideMenuOption.svelte';

	let user = null;

	onMount(async () => {
		user = await sessionAdminController.getUser();
	});
</script>

{#if user}
	<div class="flex w-80 border-t-2 border-base-300 mt-20 min-h-screen bg-base-100">
		<ul class="menu p-4 w-full text-base-content">
			<SideMenuOption text="Estadisticas" svg="chart-bar" />
			{#if user.role === 'EMPLOYEE'}
				<SideMenuOption href="/admin/ventas" text="Ventas" svg="coin" />
			{/if}
			{#if user.role === 'ADMIN'}
				<SideMenuOption href="/admin/categorias" text="Categorias" svg="shopping-bag" />
			{/if}
			<SideMenuOption href="/admin/productos" text="Productos" svg="shopping-bag" />
			{#if user.role === 'ADMIN'}
				<SideMenuOption href="/admin/usuarios" text="Usuarios" svg="users" />
			{/if}
			<SideMenuOption text="Marketing" svg="affiliate" />
		</ul>
	</div>
{/if}
