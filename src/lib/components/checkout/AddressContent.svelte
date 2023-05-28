<script>
	// @ts-nocheck
	export let address = null;
</script>

{#if address}
	<div class="flex gap-4 max-w-[400px]">
		<!-- Columns -->
		<div>
			<p class="font-medium text-[16px]">Direccion:</p>
			<p class="font-medium text-[16px]">Nro de Puerta:</p>
			<p class="font-medium text-[16px]">Esquina:</p>
			<p class="font-medium text-[16px]">Departamento:</p>
		</div>
		<!-- Content -->
		<div>
			<p class="font-medium text-[16px] text-neutral-grey">{address.address ? address.address : 'N/A'}</p>
			<p class="font-medium text-[16px] text-neutral-grey">{address.doorNumber ? address.doorNumber : 'N/A'}</p>
			<p class="font-medium text-[16px] text-neutral-grey">{address.street ? address.street : 'N/A'}</p>
			<p class="font-medium text-[16px] text-neutral-grey">{address.city ? address.city : 'N/A'}</p>
		</div>
	</div>
{/if}
