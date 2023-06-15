<script>
	// @ts-nocheck
	import addressController from "../../../logic/addressController";
	import { notify } from "../utils/Notifications.svelte";
	import Svg from "../utils/SVG.svelte";

	export let address = null;

	async function deleteAddress(address_id){
		debugger;
		const addressDeleted = await addressController.deleteAddress(address_id);
		addressDeleted?.error ? notify({text:"Ha ocurrido un error al eliminar la direccion", type:"alert-error"}) : notify({text:"Direccion eliminada con exito", type:"alert-success"});
	}
</script>

{#if address}
	<div class="flex gap-4 relative">
		<!-- Columns -->
		<div data-id={address.id}>
			<p class="font-medium text-[14px]">Direccion:</p>
			<p class="font-medium text-[14px]">Nro de Puerta:</p>
			<p class="font-medium text-[14px]">Estado:</p>
			<p class="font-medium text-[14px]">Departamento:</p>
		</div>
		<!-- Content -->
		<div>
			<p class="font-medium text-[14px] text-neutral-grey">{address.address ? address.address : 'N/A'}</p>
			<p class="font-medium text-[14px] text-neutral-grey">{address.doorNumber ? address.doorNumber : 'N/A'}</p>
			<p class="font-medium text-[14px] text-neutral-grey">{address.location ? address.location : 'N/A'}</p>
			<p class="font-medium text-[14px] text-neutral-grey">{address.state ? address.state : 'N/A'}</p>
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div class="flex justify-end items-end cursor-pointer absolute bottom-0 right-0" on:click|stopPropagation={() => {deleteAddress(address.id)}}>
			<Svg name={"trash"} size={20}/>
		</div>
	</div>
{/if}
