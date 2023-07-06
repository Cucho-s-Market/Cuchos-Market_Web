<script>
	// @ts-nocheck
	//con alguna función o criterio debo elegir qué categorias selecionar y mostrar.
	//Images es el objeto que entra, el cual se itera y del cual se almacena en un segundo objeto las propiedades de interés
	import Button from '$lib/components/utils/Button.svelte';
	import Input from '$lib/components/utils/Input.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import { onMount } from 'svelte';
	import sessionController from '../../../logic/sessionController';

	let user = null;
	let customerDetails = null;
	let message = '';
	let waiting = false;

	onMount(async () => {
		debugger;
		user = await sessionController.getUser();
		if (!user) return;

		customerDetails = {
			email: user?.email,
			nombre: user?.firstName,
			apellido: user?.lastName
		};
	});

	async function updateCustomer(customerDetails){
		debugger;
		waiting = true;
		message = '';

		// Validate all fields are filled
		if (customerDetails.nombre === '' || customerDetails.apellido === '' || customerDetails.email === '') {
			notify({ text: 'Por favor, llene todos los campos', type: 'alert-error' });
			waiting = false;
			return;
		}

		// Validate email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(customerDetails.email)) {
			notify({ text: 'Por favor, ingrese un mail valido', type: 'alert-error' });
			waiting = false;
			return;
		}

		// Update customer information in session storage
		let user = await sessionController.getUser();
		if (!user) return;

		user.firstName = customerDetails.nombre;
		user.lastName = customerDetails.apellido;
		user.email = customerDetails.email;

		// Update en el backend
		const updatedCustomer = sessionController.setUser(user);
		waiting = false;
		notify({ text: 'Información actualizada', type: 'alert-success' });
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
			<div class="w-[45%] px-16 h-[450px]">
				<div class=" m-[15px] h-[450px] border rounded-xl">
					<div class="px-4 mt-8 flex flex-col gap-6">
						<div class="flex flex-col gap-6">
							<Input
								bind:value={customerDetails.nombre}
								label={'Nombre'}
								props={'h-10'}
								type={'text'}
								mandatory={false}
							/>
						</div>
						<div class="flex flex-col gap-6">
							<Input
								bind:value={customerDetails.apellido}
								label={'Apellido'}
								props={'h-10'}
								type={'text'}
								mandatory={false}
							/>
						</div>
						<div class="flex flex-col gap-6">
							<Input
								bind:value={customerDetails.email}
								label={'Email'}
								props={'h-10'}
								type={'email'}
								mandatory={false}
							/>
						</div>
						<div class="flex flex-col items-center">
							{#if message}
								<p class="text-center text-[#409740] text-[14px]">{message}</p>
							{/if}
						</div>

						<div class="w-[200px]">
							{#if waiting}
								<Button text={"Guardar cambios"} type={"btn-primary loading loading-spinner"} props={"w-[300px] max-w-0 min-w-0 h-10 mt-4"}/>
							{:else}
								<Button text={"Guardar cambios"} type={"btn-primary"} props={"w-full h-10 mt-4"} click={() => {updateCustomer(customerDetails)}}/>
							{/if}
						</div>
					</div>
				</div>
			</div>
			<div class="w-[20%] h-[300px]" />
		</div>
	</div>
{/if}
