<script>
	// @ts-nocheck

	import Button from '$lib/components/utils/Button.svelte';
	import Input from '$lib/components/utils/Input.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import { onMount } from 'svelte';
	import adminController from '../../../../logic/adminController';
	import { User } from '../../../../logic/dtos/User';
	import formValidator from '../../../../logic/helpers/formValidator';
	import branchController from '../../../../logic/branchController';
	import Utils from '../../../../logic/helpers/Utils';
	import Modal from '$lib/components/utils/Modal.svelte';
	import sessionAdminController from '../../../../logic/sessionAdminController';

	let repeatPassword = '';

	let branch = null;
	let branches = [];
	let showModalDelete = false;

	export let user = new User();

	onMount(async () => {
		branches = await branchController.getBranches();

		branches = branches?.branches;

		
	});

	let register = async () => {
		let toValidate = [
			user.firstName,
			user.lastName
		];

		if(!Utils.isEditMode()) {
			toValidate.push(user.password);
			toValidate.push(repeatPassword);
		}

		let emptyValues = formValidator.emptyValues(toValidate);

		if (emptyValues || !formValidator.email(user.email)) {
			notify({ type: 'alert-error', text: 'Verifique los campos.' });
			return;
		}
		
		let response = await adminController.registerEmployee(user, branch);	

		debugger;
		if(!response) {
			response = await adminController.updateEmployee(user);
		}

		if (!response) {
			notify({ type: 'alert-error', text: 'Error en el servidor' });
			return;
		}

		if (response.error) {
			notify({ type: 'alert-error', text: response.message });
			return;
		}

		notify({ type: 'alert-success', text: response.message });
		setTimeout(() => {
			window.location.href = `/admin/usuarios`;
		}, 3000);
	};
</script>

<Modal bind:showModal={showModalDelete}>
	<div class="flex flex-col gap-10 p-10 w-full p-0 justify-center text-center">
		<p>Confirme la accion</p>
		<div class="flex justify-around">
			<Button
				text="Confirmar"
				type={'btn-error min-h-0 w-[100px]'}
				click={async () => {
					let res = await adminController.deleteEmployee(user.id);

					if (!res) {
						notify({ type: 'alert-error', text: 'Error en el servidor' });
						return;
					}

					if (res.error) {
						notify({ type: 'alert-error', text: res.message });
						return;
					}

					notify({ type: 'alert-success', text: res.message });
					setTimeout(() => {
						window.location.href = '/admin/usuarios';
					}, 3000);
				}}
			/>
			<Button
				text="Cancelar"
				type={'btn-neutral-grey min-h-0 w-[100px]'}
				click={() => {
					showModalDelete = false;
				}}
			/>
		</div>
	</div>
</Modal>

{#await branches then}
	{#if branches.length > 0}
		<div class="gap-5 flex flex-col max-w-[700px] m-auto shadow rounded-lg p-5">
			<div class="flex justify-between w-full h-[70px]">
				<div class="w-[48%]">
					<Input bind:value={user.firstName} props="h-10" label="Nombre" />
				</div>
				<div class="w-[48%]">
					<Input bind:value={user.lastName} props="h-10" label="Apellido" />
				</div>
			</div>
			<div class="w-full">
				<Input bind:value={user.email} props="h-10" type="email" label="Email" />
			</div>
			{#if !Utils.isEditMode()}
				<div class="w-full">
					<Input bind:value={user.password} props="h-10" type="password" label="Contraseña" />
				</div>
				<div class="w-full">
					<Input
						bind:value={repeatPassword}
						props="h-10"
						type="password"
						label="Repetir Contraseña"
					/>
				</div>
			{/if}

			<div class="flex flex-col w-full">
				<p class="label">
					<span class="label-text font-semibold"
						>Sucursal <span class="p-1 text-error">*</span></span
					>
				</p>
				<select
					bind:value={user.branch.id}
					name="branch"
					class="select select-primary w-full focus:border-none"
				>
					<option disabled selected>SUCURSAL</option>
					{#each branches as item (item.id)}
						<option value="{item.id}">{item.name}</option>
					{/each}
				</select>
			</div>
			<div class="w-full mt-3 flex justify-between">
				<Button
					text="{Utils.isEditMode() ? 'Actualizar' : 'Crear'} usuario"
					type={'btn-primary h-[36px] min-h-0 w-[219px]'}
					click={() => {
						register();
					}}
				/>

				<Button
						svg={{ name: 'trash' }}
						type={'btn-error h-[36px] min-h-0 w-[70px]'}
						click={() => {
							showModalDelete = true;
						}}
					/>
			</div>
		</div>
	{/if}
{/await}
