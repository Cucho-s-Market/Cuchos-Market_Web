<script>
	// @ts-nocheck

	import Button from '$lib/components/utils/Button.svelte';
	import Input from '$lib/components/utils/Input.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import adminController from '../../../../logic/adminController';
	import { Customer } from '../../../../logic/dtos/Customer';
	import { User } from '../../../../logic/dtos/User';
	import sessionController from '../../../../logic/sessionController';
<<<<<<< HEAD
    import formValidator from '../../../../logic/helpers/formValidator';
=======
	import formValidator from '../../../../logic/helpers/formValidator';
>>>>>>> a579048ec9fac24e15c12dccdb3f2bc1fa8d7fce
	import sessionAdminController from '../../../../logic/sessionAdminController';

	let showCustomer = false;
	let showEmployee = false;
	let repeatPassword = '';

	let role;
	let ci = '';
	let user = new User();
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

		const response = await adminController.registerEmployee(
			user,
			1,
			sessionAdminController.getUserToken()
		);

		if (!response) {
			notify({ type: 'alert-error', text: 'Error en el servidor' });
			return;
		}

		if (response.error) {
			notify({ type: 'alert-error', text: response.message });
			return;
		}

<<<<<<< HEAD
            if(res.error) {
                notify({ type: 'alert-error', text: res.message});
                return;
            }
            
			if (res.ok) {
                notify({ type: 'alert-success', text: res.message });
                formValidator.clear(validationArray);	
            }
				
		} else if (showEmployee) {
			let emptyValues = formValidator.emptyValues([user.firstName, user.lastName, user.password, repeatPassword]);

            if(emptyValues || !formValidator.email(user.email)) {
                notify({ type: 'alert-error', text: "Verifique los campos." });
                return;
            }

			const response = await adminController.registerEmployee(user, 1, sessionAdminController.getUserToken());
            
            if(!response) {
                notify({ type: 'alert-error', text: "Error en el servidor"});
                return;
            }

            if(response.error) {
                notify({ type: 'alert-error', text: response.message});
                return;
            }

			if (response.ok) {
                notify({ type: 'alert-success', text: response.message });
            }
=======
		if (response.ok) {
			notify({ type: 'alert-success', text: response.message });
>>>>>>> a579048ec9fac24e15c12dccdb3f2bc1fa8d7fce
		}
	};
</script>

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
		<Input bind:value={repeatPassword} props="h-10" type="password" label="Repetir Contraseña" />
	</div>

	<div class="flex flex-col w-full">
		<p class="label">
			<span class="label-text font-semibold">Sucursal <span class="p-1 text-error">*</span></span>
		</p>
		<select bind:value={role} name="role" class="select select-primary w-full focus:border-none">
			<option disabled selected>SUCURSAL</option>
			<option>Sucursal 1</option>
		</select>
	</div>

	<div class="w-full mt-3">
		<Button
			text="Crear Usuario Empleado"
			type={'btn-primary h-[36px] min-h-0 w-[219px]'}
			click={() => {
				register();
			}}
		/>
	</div>
</div>
