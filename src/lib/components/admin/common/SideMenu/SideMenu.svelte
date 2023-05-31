<script>
	import SideMenuOption from './SideMenuOption.svelte';
</script>

<div class="flex w-80 border-t-2 border-base-300 mt-20 min-h-screen bg-base-100">
	<ul class="menu p-4 w-full text-base-content">
		<SideMenuOption text="Estadisticas" svg="chart-bar" />
		<SideMenuOption href="/admin/ventas" text="Ventas" svg="coin" />
		<SideMenuOption text="Productos" svg="shopping-bag" />
		<SideMenuOption text="Marketing" svg="affiliate" />
		<SideMenuOption text="Logistica" svg="map-pin" />
		<SideMenuOption text="Sucursales" svg="building-store" />
		<SideMenuOption text="Configuracion" svg="settings" />
	</ul>
</div>
