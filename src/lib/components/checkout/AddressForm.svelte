<script>
	// @ts-nocheck
	import addressController from '../../../logic/addressController';
	import Button from '../utils/Button.svelte';
	import Input from '../utils/Input.svelte';
	import { notify } from '../utils/Notifications.svelte';

	export let address = {
		address: '',
		doorNumber: '',
		location: '',
		state: ''
	};

	export let isEdit = false;

	export let showModal;

	async function createAddress() {
		const addressValid = await addressController.validateAddress(address);
		if (!addressValid) return;

		const addressResult = await addressController.createAddress(address);
		if (addressResult?.error) return;

		// Close modal
		showModal = false;

		// Show notification
		notify({ text: 'Direccion agregada con exito', type: 'alert-success' });

		// Reset values
		address = {
			address: '',
			doorNumber: '',
			location: '',
			state: ''
		};
	}

	async function editAddress() {
		const addressValid = await addressController.validateAddress(address);
		if (!addressValid) return;

		const addressResult = await addressController.updateAddress(address);
		if (addressResult?.error) return;

		// Close modal
		showModal = false;

		// Show notification
		notify({ text: 'Direccion editada con exito', type: 'alert-sucess' });

		// Reset values
		address = {
			address: '',
			doorNumber: '',
			location: '',
			state: ''
		};
	}
</script>

<div class="w-full flex flex-col gap-4">
	<div class="flex flex-col items-center gap-10 pb-5">
		{#if isEdit}
			<h1 class="font-semibold text-[32px]">Editar direccion</h1>
		{:else}
			<h1 class="font-semibold text-[32px]">Nueva direccion</h1>
		{/if}
	</div>
	<Input bind:value={address.address} label={'Direccion'} props={'text-center'} />
	<div class="flex gap-10">
		<Input
			bind:value={address.doorNumber}
			type={'number'}
			label={'Nro. Puerta'}
			props={'text-center'}
		/>
		<Input bind:value={address.location} label={'Localidad'} props={'text-center'} />
	</div>
	<Input bind:value={address.state} label={'Departamento'} props={'text-center'} />

	{#if isEdit}
		<Button text={'Editar direccion'} type={'btn-primary w-full mt-7'} click={editAddress} />
	{:else}
		<Button text={'Agregar direccion'} type={'btn-primary w-full mt-7'} click={createAddress} />
	{/if}
</div>
