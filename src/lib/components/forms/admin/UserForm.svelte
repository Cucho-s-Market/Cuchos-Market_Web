<script>
	// @ts-nocheck

	import Button from '$lib/components/utils/Button.svelte';
	import Input from '$lib/components/utils/Input.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import adminController from '../../../../logic/adminController';
	import { Customer } from '../../../../logic/dtos/Customer';
	import { User } from '../../../../logic/dtos/User';
	import sessionController from '../../../../logic/sessionController';
    import formValidator from '../../../../logic/helpers/formValidator';

	let showCustomer = false;
	let showEmployee = false;
    let repeatPassword = '';

	let role;
	let ci = '';
	let user = new User();

	$: {
		showCustomer = role === 'CLIENTE' ? true : false;
		showEmployee = role === 'EMPLEADO' ? true : false;
	}

	let register = async () => {
		if (showCustomer) {
			let customer = new Customer();
			customer = user;
			customer.ci = ci;
            let validationArray = [customer.ci, customer.firstName, customer.lastName, customer.password, repeatPassword];

            let emptyValues = formValidator.emptyValues(validationArray);

            if(emptyValues || !formValidator.ci(customer.ci) || !formValidator.email(customer.email)) {
                notify({ type: 'alert-error', text: "Verifique los campos." });
                return;
            }

			const res = await sessionController.register(customer);

            if(!res) {
                notify({ type: 'alert-error', text: "Error en el servidor"});
                return;
            }

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

			const response = await adminController.registerEmployee(user, 1);
            
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
		}
	};
</script>

<div class="gap-5 flex flex-col max-w-[700px] m-auto shadow rounded-lg p-5">
	<select bind:value={role} name="role" class="select select-primary w-full focus:border-none">
		<option disabled selected>ROL</option>
		<option>Sin asignar</option>
		<option>EMPLEADO</option>
		<option>CLIENTE</option>
	</select>

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

	{#if showCustomer}
		<div class="w-full">
			<Input bind:value={ci} props="h-10" type="number" label="C.I" />
		</div>
	{/if}

	{#if showEmployee}
		<div class="flex flex-col w-full">
            <p class="label">
                <span class="label-text font-semibold">Sucursal <span class="p-1 text-error">*</span></span>
            </p>
            <select bind:value={role} name="role" class="select select-primary w-full focus:border-none">
                <option disabled selected>SUCURSAL</option>
                <option>Sucursal 1</option>
            </select>
        </div>
	{/if}

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
