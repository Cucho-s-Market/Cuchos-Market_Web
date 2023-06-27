<script>
	// @ts-nocheck
	import Button from '$lib/components/utils/Button.svelte';
	import Link from '$lib/components/utils/Link.svelte';
	import Input from '$lib/components/utils/Input.svelte';
	import Svg from '$lib/components/utils/SVG.svelte';
	import sessionController from '../../../../logic/sessionController';
	import Notification from '$lib/components/utils/Notification.svelte';

	let screenSize;
	let errorMessage = '';
	let accountCreated = false;
	let customer = {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
			birthDate: null,
			phone: '',
			ci: '',
		};

	const registerCustomer = async () => {

		// Validate all fields are filled
		if (customer.firstName === '' || customer.lastName === '' || customer.email === '' || customer.password === '' || customer.confirmPassword === '' || customer.ci === '') {
			alert('Por favor, llene todos los campos');
			return;
		}

		// Validate email
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(customer.email)) {
			alert('Por favor, ingrese un email válido');
			return;
		}

		// Validate CI
		const ciRegex = /^[0-9]{8}$/;
		if (!ciRegex.test(customer.ci)) {
			alert('Por favor, ingrese un número de cédula válido');
			return;
		}

		// Validate phone
		const phoneRegex = /^[0-9]{7,9}$/;
		if (customer.phone != "" && !phoneRegex.test(customer.phone)) {
			alert('Por favor, ingrese un número de teléfono válido');
			return;
		}

		// Validate password and confirm password
		if (customer.password !== customer.confirmPassword) {
			alert('Las contraseñas no coinciden');
			return;
		}

		const response = await sessionController.register(customer);
		if(response == null || response.error) {
			errorMessage = response?.message; throw new Error('Error al registrar usuario');
		}

		errorMessage = '';
		accountCreated = true;

		setTimeout(() => {
			// Redirect to home
			window.location.href = './';
		}, 3000);
	};

</script>

<svelte:window bind:innerWidth={screenSize} />
<div class="w-full h-full bg-primary-content">
	<!-- Orange bar -->
	<div class="bg-primary w-[29px] h-full left-0 top-0 absolute" />
	<!--end rectangle-->

	<!--logo-->
	<a href="/">
		<div class="w-full pl-20 p-6">
			<Svg name={'cuchos-logo'} size={100}/>
		</div>
	</a>
	
	<div class="flex pl-[20%] w-full h-full {screenSize < 1110 ? 'pl-[0px] justify-center' : ''}">
		<!-- Form div -->
		<div class="w-[413px]">
			<div class="h-[48px] w-[400px] mb-14">
				<p class="text-[#000000] not-italic font-semibold text-[24px]">
					Bienvenidos a Cucho's Market!
				</p>
				<p class="text-[#000000] not-italic font-normal text-[14px]">
					Crea una cuenta o <Link text="inicia sesión" href="./" />
				</p>

				{#if errorMessage !== ''}
					<Notification type={"alert-error"} text={errorMessage} props={"absolute top-0 mt-[18px]"}/>
				{/if}

				{#if accountCreated}
					<Notification type={"alert-success"} text={"Cuenta creada con exito!"} props={"absolute top-0 mt-[18px]"}/>
				{/if}
			</div>

			<div class="gap-5 flex flex-col">
				<div class="flex justify-between w-full h-[70px]">
					<div class="w-[180px]">
						<Input bind:value={customer.firstName} props="h-10" label="Nombre"/>
					</div>
					<div class="w-[180px]">
						<Input bind:value={customer.lastName} props="h-10" label="Apellido" />
					</div>
				</div>

				<div class="w-full">
					<Input bind:value={customer.ci} props="h-10" type="number" label="C.I" />
				</div>
				<div class="w-full">
					<Input bind:value={customer.email} props="h-10" type="email" label="Email" />
				</div>
				<div class="w-full">
					<Input bind:value={customer.password} props="h-10" type="password" label="Contraseña" />
				</div>
				<div class="w-full">
					<Input bind:value={customer.confirmPassword} props="h-10" type="password" label="Repetir contraseña" />
				</div>
				<div class="w-full">
					<Input bind:value={customer.phone} props="h-10" type="number" label="Celular" mandatory={false}/>
				</div>
				<div class="w-full">
					<p class="text-[12px]">
						Al hacer clic en "Crear cuenta", estarás creando una cuenta en <br />Cucho´s Market y
						aceptando sus <Link text="politicas de privacidad" /> y <Link text="términos de uso" />
					</p>
				</div>
				<div class="w-full mt-3">
					<Button text="Crear cuenta" type={"btn-primary h-[36px] min-h-0 w-[219px]"} click={registerCustomer}/>
				</div>
				<!--end form-->
			</div>
		</div>

		{#if screenSize >= 1110}
			<div class="h-full w-[30%] bg-grey absolute top-0 right-0">
				<img
					class="h-full w-full object-cover"
					src="https://images.unsplash.com/photo-1604719312566-8912e9227c6a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
					alt="super"
				/>
			</div>
		{/if}
	</div>
</div>
