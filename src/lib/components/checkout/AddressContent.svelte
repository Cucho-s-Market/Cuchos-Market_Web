<script>
	// @ts-nocheck
	export let address = null;

	async function deleteAddress(address_id){
		debugger;
		const addressDeleted = await addressController.deleteAddress(address_id);
		(addressDeleted == null ||addressDeleted?.error) ? notify({text:"Ha ocurrido un error al eliminar la direccion", type:"alert-error"}) : notify({text:"Direccion eliminada con exito", type:"success"});
	}
</script>

{#if address}
	<div class="flex gap-4 max-w-[400px]">
		<!-- Columns -->
		<div>
			<p class="font-medium text-[14px]">Direccion:</p>
			<p class="font-medium text-[14px]">Nro de Puerta:</p>
			<p class="font-medium text-[14px]">Esquina:</p>
			<p class="font-medium text-[14px]">Departamento:</p>
		</div>
		<!-- Content -->
		<div>
			<p class="font-medium text-[14px] text-neutral-grey">{address.address ? address.address : 'N/A'}</p>
			<p class="font-medium text-[14px] text-neutral-grey">{address.doorNumber ? address.doorNumber : 'N/A'}</p>
			<p class="font-medium text-[14px] text-neutral-grey">{address.street ? address.street : 'N/A'}</p>
			<p class="font-medium text-[14px] text-neutral-grey">{address.city ? address.city : 'N/A'}</p>
		</div>
	</div>
{/if}
