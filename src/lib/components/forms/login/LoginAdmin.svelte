<script>
	// @ts-nocheck

	import { browser } from '$app/environment';
	import Button from '$lib/components/utils/Button.svelte';
	import Input from '$lib/components/utils/Input.svelte';
	import Link from '$lib/components/utils/Link.svelte';
	import { notify } from '$lib/components/utils/Notifications.svelte';
	import Svg from '$lib/components/utils/SVG.svelte';
	import sessionAdminController from '../../../../logic/sessionAdminController';

	let userDetails = {
		email: '',
		password: ''
	};

	async function login() {
		let res = await sessionAdminController.login(userDetails);
		if (!res) {
			notify({ type: 'alert-error', text: 'Verifique los campos.' });
            return
		}

		notify({ type: 'alert-success', text: 'Iniciando sesion.' });

		setTimeout(() => {
			if (browser) {
				window.location.href = '/admin';
			}
		}, 2000);
	}
</script>

<main class="w-[400px] h-[415px]">
	<!-- Logo -->
	<div class="flex flex-col justify-center items-center">
		<Svg name={'cuchos-logo'} size={200} />
		<p class="text-neutral-grey text-[12px]">Acceso a gestion de Cucho's Market</p>
	</div>
	<!-- Inputs and login -->
	<div class="mt-4 flex flex-col gap-10 justify-center">
		<div class="flex flex-col gap-2">
			<Input bind:value={userDetails.email} props="h-10" label="Email" />
			<Input type={'password'} bind:value={userDetails.password} props="h-10" label="Contraseña" />
		</div>
		<div class="flex justify-center w-full">
			<Button
				text="Iniciar sesion"
				type={'btn-primary h-[36px] min-h-0 w-[219px]'}
				click={() => {
					login();
				}}
			/>
		</div>
	</div>
	<!-- Links -->
	<div class="flex flex-col items-center mt-4 gap-2 text-xs">
		<Link text={'¿Olvidaste la contraseña?'} type={'link-black font-semibold'} />
		<p class="text-neutral-grey text-xs">@ 2023 Cucho's Market</p>
	</div>
</main>
