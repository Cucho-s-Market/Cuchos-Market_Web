<script>
	// @ts-nocheck
	//con alguna función o criterio debo elegir qué categorias selecionar y mostrar.
	//Images es el objeto que entra, el cual se itera y del cual se almacena en un segundo objeto las propiedades de interés
	import Button from '$lib/components/utils/Button.svelte';
	import Input from '$lib/components/utils/Input.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import { onMount } from 'svelte';
	import sessionController from '../../../logic/sessionController';
	import Utils from '../../../logic/helpers/Utils';

	let user = null;
	let customerDetails = null;
	let message = '';
	let waiting = false;

	onMount(async () => {
		const userIsLogged = await sessionController.isUserLoggedIn();
		if (!userIsLogged) window.location.href = '/';
		
		user = await sessionController.getUser();
		if (!user) return;

		customerDetails = {
			email: user?.email,
			firstName: user?.firstName,
			lastName: user?.lastName,
			dni: user?.dni,
			password: '',
		};
	});

	async function updateCustomer(customerDetails){
		
		waiting = true;
		message = '';

		// Validate all fields are filled less password
		if (!customerDetails.firstName || !customerDetails.lastName || !customerDetails.dni) {
			notify({ text: 'Por favor, llene todos los campos', type: 'alert-error' });
			waiting = false;
			return;
		}
		
		// Update customer information in session storage
		let user = await sessionController.getUser();
		if (!user){
			notify({ text: 'Hubo un error al actualizar la información', type: 'alert-error' });
			waiting = false;
			return;
		}

		customerDetails.email = user.email;
		customerDetails.telephone = user.telephone;
		customerDetails.birthDate = user.birthDate;

		const customerUpdated = await sessionController.updateCustomerInformation(customerDetails);
		if(!customerUpdated || customerUpdated.error){
			notify({ text: 'Hubo un error al actualizar la información', type: 'alert-error' });
			waiting = false;
			return;
		}
		

		user.firstName = customerDetails.firstName;
		user.lastName = customerDetails.lastName;
		user.dni = customerDetails.dni;

		// Update en el backend
		sessionController.setUser(user);
		waiting = false;
		notify({ text: 'Información actualizada', type: 'alert-success' });
	}

	async function disableCustomer(){
		
		Utils.showLoading();

		const customerDeleted = await sessionController.disableCustomer();
		if(!customerDeleted || customerDeleted.error){
			notify({ text: 'Hubo un error al eliminar la cuenta', type: 'alert-error' });
			Utils.removeLoading();
			return;
		}

		Utils.removeLoading();

		sessionController.logout();
	}

</script>

{#if customerDetails}
	<div class=" w-full flex flex-row">
		<div class="w-full flex flex-row my-[150px]">
			<div class="w-[20%] h-[300px] bg-gray-300" />
			<div class="w-[25%] h-[300px] bg-gray-400 text-left">
				<div class=" p-[15px] h-[600px]">
					<p class="text-2xl">Información del usuario</p>
					<p class="text-xl text-gray-900">Actualice la información de su cuenta</p>
				</div>
			</div>
			<div class="w-[45%] px-16">
				<div class=" m-[15px] h-full border rounded-xl">
					<div class="px-4 mt-8 flex flex-col gap-6">
						<div class="flex flex-col gap-6">
							<Input disabled={true}
								bind:value={customerDetails.dni}
								label={'C.I'}
								props={'h-10'}
								type={'number'}
								mandatory={true}
							/>
						</div>
						<div class="flex flex-col gap-6">
							<Input disabled={true}
								bind:value={customerDetails.email}
								label={'Email'}
								props={'h-10'}
								type={'email'}
								mandatory={true}
							/>
						</div>
						<div class="flex flex-col gap-6">
							<Input
								bind:value={customerDetails.firstName}
								label={'Nombre'}
								props={'h-10'}
								type={'text'}
								mandatory={true}
							/>
						</div>
						<div class="flex flex-col gap-6">
							<Input
								bind:value={customerDetails.lastName}
								label={'Apellido'}
								props={'h-10'}
								type={'text'}
								mandatory={true}
							/>
						</div>
						<div class="flex flex-col gap-6">
							<Input
								bind:value={customerDetails.password}
								label={'Contraseña'}
								props={'h-10'}
								type={'password'}
								mandatory={false}
							/>
						</div>
						<div class="flex flex-col items-center">
							{#if message}
								<p class="text-center text-[#409740] text-[14px]">{message}</p>
							{/if}
						</div>

						<div class="w-full flex justify-between">
							<div>
								{#if waiting}
									<Button text={"Guardar cambios"} type={"btn-primary loading loading-spinner"} props={"w-[300px] max-w-0 min-w-0 h-10 mt-4"}/>
								{:else}
									<Button text={"Guardar cambios"} type={"btn-primary"} props={"w-full h-10 mt-4"} click={() => {updateCustomer(customerDetails)}}/>
								{/if}
							</div>
	
							<div>
								<Button text={"Eliminar cuenta"} type={"btn-error"} props={"w-full h-10 mt-4"} click={disableCustomer}/>
							</div>
						</div>
						
					</div>
				</div>
			</div>
			<div class="w-[20%] h-[300px]" />
		</div>
	</div>
{/if}
