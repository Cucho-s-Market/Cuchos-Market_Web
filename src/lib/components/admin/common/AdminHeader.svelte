<script>
	// @ts-nocheck
	
		import Link from '$lib/components/utils/Link.svelte';
		import Svg from '$lib/components/utils/SVG.svelte';
		import { onMount } from 'svelte';
		import sessionAdminController from '../../../../logic/sessionAdminController';
	
		let user = null;
		let username = '';
	
		onMount(async () => {
			user = await sessionAdminController.getUser();
			if(user) {
				username = `${user.firstName} ${user.lastName} (${user.role})`;
			}
		});
	
		function logout() {
			sessionAdminController.logout();
	
		}
	</script>
	
	<div class="absolute flex w-full justify-between bg-base-100">
		<div class="max-w-[320px] p-5">
			<Svg name="cuchos-logo" size={150} />
		</div>
		<div class="flex gap-7 mr-5 text-sm">
			<div class="dropdown dropdown-end">
				<div class="flex flex-col justify-center h-full">
					<label tabindex="0" class="bg-base-100 cursor-pointer">
						<Svg name="bell-filled" size={24} />
					</label>
				</div>
				<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
					<li><a>Item 1</a></li>
					<li><a>Item 2</a></li>
				</ul>
			</div>
	
			<Link
				href="/"
				text="Ir al sitio"
				type="flex flex-col justify-center text-neutral underline-none"
			/>
	
			<div class="dropdown dropdown-end">
				<div class="flex flex-col justify-center h-full">
					<label tabindex="0" class="flex gap-2 bg-base-100 m-1 cursor-pointer">
						<Svg name="user-circle" size={24} />
						<p class="flex flex-col justify-center">{username}</p>
					</label>
				</div>
				<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
					<li><a href="#" on:click={() => {logout()}}>Cerrar sesion</a></li>
				</ul>
			</div>
		</div>
	</div>
	