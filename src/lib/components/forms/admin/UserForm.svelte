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

	let repeatPassword = '';

	let branch = null;
	let branches = [];
	let user = new User();

	onMount(async () => {
		branches = await branchController.getBranches();

		branches = branches?.branches;

		console.log(branches);
	});

	let register = async () => {
		let emptyValues = formValidator.emptyValues([
			user.firstName,
			user.lastName,
			user.password,
			repeatPassword
		]);

		if (emptyValues || !formValidator.email(user.email)) {
			notify({ type: 'alert-error', text: 'Verifique los campos.' });
			return;
		}

		debugger;
		const response = await adminController.registerEmployee(user, branch);

		if (!response) {
			notify({ type: 'alert-error', text: 'Error en el servidor' });
			return;
		}

		if (response.error) {
			notify({ type: 'alert-error', text: response.message });
			return;
		}

		if (response.ok) {
			notify({ type: 'alert-success', text: response.message });
		}
	};
</script>

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

			<div class="flex flex-col w-full">
				<p class="label">
					<span class="label-text font-semibold"
						>Sucursal <span class="p-1 text-error">*</span></span
					>
				</p>
				<select
					bind:value={branch}
					name="branch"
					class="select select-primary w-full focus:border-none"
				>
					<option disabled selected>SUCURSAL</option>
					{#each branches as item (item.id)}
						<option value="{item.id}">{item.name}</option>
					{/each}
				</select>
			</div>
			<div class="w-full mt-3">
				<Button
					text="Crear usuario"
					type={'btn-primary h-[36px] min-h-0 w-[219px]'}
					click={() => {
						register();
					}}
				/>
			</div>
		</div>
	{/if}
{/await}
