<script>
	import Button from '$lib/components/utils/Button.svelte';
	import Link from '$lib/components/utils/Link.svelte';
	import Input from '$lib/components/utils/Input.svelte';
	import Svg from '$lib/components/utils/SVG.svelte';
	let screenSize;
</script>

<svelte:window bind:innerWidth={screenSize} />
<div class="w-full h-full bg-primary-content">
	<!-- Orange bar -->
	<div class="bg-primary w-[29px] h-full left-0 top-0 absolute" />
	<!--end rectangle-->

	<!--logo-->
	<div class="w-full pl-20 p-6">
		<Svg name={'cuchos-logo'} />
	</div>

	<div class="flex pl-[20%] w-full h-full {screenSize < 1100 ? 'pl-[0px] justify-center' : ''}">
		<!-- Form div -->
		<div class="w-[413px]">
			<div class="h-[48px] w-[400px] mb-20">
				<p class="text-[#000000] not-italic font-semibold text-[24px]">
					Bienvenidos a Cucho's Market!
				</p>
				<p class="text-[#000000] not-italic font-normal text-[14px]">
					Crea una cuenta o <Link text="inicia sesión" href="./" />
				</p>
			</div>

			<div class="gap-5 flex flex-col">
				<div class="flex justify-between w-full h-[70px]">
					<div class="w-[180px]">
						<Input props="h-10" label="Nombre" />
					</div>
					<div class="w-[180px]">
						<Input props="h-10" label="Apellido" />
					</div>
				</div>
	
				<div class="w-full">
					<Input props="h-10" type="email" label="Email" />
				</div>
				<div class="w-full">
					<Input props="h-10" type="password" label="Contraseña" />
				</div>
				<div class="w-full">
					<Input props="h-10" type="password" label="Repetir contraseña" />
				</div>
				<div class="w-full">
					<Input props="h-10" type="tel" label="Celular" mandatory={false}/>
				</div>
				<div class="w-full">
					<p class="text-[12px]">
						Al hacer clic en "Crear cuenta", estarás creando una cuenta en <br />Cucho´s Market y
						aceptando sus <Link text="politicas de privacidad" /> y <Link text="términos de uso" />
					</p>
				</div>
				<div class="w-full mt-3">
					<Button text="Crear cuenta" type={"btn-primary h-[36px] min-h-0 w-[219px]"}/>
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
