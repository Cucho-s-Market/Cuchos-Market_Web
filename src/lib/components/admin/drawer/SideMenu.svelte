<script>
import SVG from "$lib/components/utils/SVG.svelte";
import SideMenuOption from "./SideMenuOption.svelte";

</script>

<div class="flex w-80 min-h-screen bg-base-100">
	<div class="flex w-full flex-col">
		<div class="p-5 border-b-2 border-light-grey">
			<SVG name="cuchos-logo" size={150}/>
		</div>
		<ul class="menu p-4 w-full text-base-content">
			<!-- Sidebar content here -->
			<SideMenuOption text="Estadisticas" svg="chart-bar"/>
			<SideMenuOption text="Ventas" svg="coin"/>
			<SideMenuOption text="Productos" svg="shopping-bag"/>
			<SideMenuOption text="Marketing" svg="affiliate"/>
			<SideMenuOption text="Logistica" svg="map-pin"/>
			<SideMenuOption text="Sucursales" svg="building-store"/>
			<SideMenuOption text="Configuracion" svg="settings"/>
		</ul>
	</div>
</div>
